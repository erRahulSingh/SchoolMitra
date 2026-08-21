"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AlertOctagon, ShieldAlert, Mail, LogOut, RefreshCw } from "lucide-react";

export interface SchoolBlockedState {
  isBlocked: boolean;
  schoolStatus: "SUSPENDED" | "EXPIRED" | "DEACTIVATED" | "PENDING_APPROVAL" | string;
  code: string;
  message: string;
  schoolName?: string;
  schoolCode?: string;
}

interface SchoolStatusContextType {
  blockedState: SchoolBlockedState | null;
  setBlockedState: (state: SchoolBlockedState | null) => void;
  checkSchoolStatus: () => Promise<void>;
}

const SchoolStatusContext = createContext<SchoolStatusContextType>({
  blockedState: null,
  setBlockedState: () => {},
  checkSchoolStatus: async () => {},
});

export const useSchoolStatus = () => useContext(SchoolStatusContext);

// ─── STEP 34: CACHE SECURITY PURGE HELPER ───
export const purgeTenantCaches = () => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.clear();
    const preserved = ["theme", "color-theme", "accessToken", "refreshToken", "user", "schoolId", "schoolName"];
    const allKeys = Object.keys(localStorage);
    for (const key of allKeys) {
      if (!preserved.includes(key)) {
        localStorage.removeItem(key);
      }
    }
    window.dispatchEvent(new CustomEvent("tenant_cache_purged"));
  } catch (err) {
    console.warn("[Cache Purge Warning]:", err);
  }
};

export function SchoolStatusGuard({ children }: { children: React.ReactNode }) {
  const [blockedState, setBlockedState] = useState<SchoolBlockedState | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("schoolId");
      localStorage.removeItem("schoolName");
      window.location.href = "/login";
    }
  };

  const checkSchoolStatus = async () => {
    setIsChecking(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      if (!token) {
        setIsChecking(false);
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      
      // Step 33: Startup check against /auth/session endpoint
      let res = await fetch(`${apiUrl}/auth/session`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      let data = await res.json().catch(() => ({}));

      if (!res.ok && res.status !== 403) {
        res = await fetch(`${apiUrl}/tenant/status`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        data = await res.json().catch(() => ({}));
      }

      const schoolInfo = data.school || {};
      const effectiveStatus = (schoolInfo.status || data.schoolStatus || "").toUpperCase();

      if (
        res.status === 403 ||
        data.code === "SCHOOL_ACCESS_SUSPENDED" ||
        data.code === "SCHOOL_ACCOUNT_EXPIRED" ||
        data.code === "SCHOOL_ACCOUNT_DEACTIVATED" ||
        data.code === "SESSION_INVALIDATED" ||
        effectiveStatus === "SUSPENDED" ||
        effectiveStatus === "EXPIRED" ||
        effectiveStatus === "DEACTIVATED"
      ) {
        purgeTenantCaches();
        const schoolName = schoolInfo.name || data.schoolName || (typeof window !== "undefined" ? localStorage.getItem("schoolName") : null) || "ABC Public School";
        setBlockedState({
          isBlocked: true,
          schoolStatus: effectiveStatus || "SUSPENDED",
          code: data.code || "SCHOOL_ACCESS_SUSPENDED",
          message: data.message || "Your school account is currently inactive.",
          schoolName,
          schoolCode: schoolInfo.code || data.schoolCode || "sch-main"
        });
      } else if (res.ok && (data.success || data.authenticated)) {
        setBlockedState(null);
      }
    } catch (e) {
      // Ignore network errors in initial check
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // 1. Initial status validation
    checkSchoolStatus();

    // 2. Global event listener from api.ts interceptor
    const handleBlockedEvent = (event: any) => {
      purgeTenantCaches();
      const detail = event.detail || {};
      const schoolName = detail.schoolName || (typeof window !== "undefined" ? localStorage.getItem("schoolName") : null) || "ABC Public School";
      setBlockedState({
        isBlocked: true,
        schoolStatus: detail.schoolStatus || "SUSPENDED",
        code: detail.code || "SCHOOL_ACCESS_SUSPENDED",
        message: detail.message || "Your school account is currently inactive.",
        schoolName,
        schoolCode: detail.schoolCode || ""
      });
    };

    window.addEventListener("school_status_blocked", handleBlockedEvent);

    // 3. STEP 15: Real-time Socket.IO status broadcast listener
    let socket: any = null;
    try {
      const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";
      // Lazy load socket.io-client
      import("socket.io-client").then(({ io }) => {
        const storedSchoolId = typeof window !== "undefined" ? localStorage.getItem("schoolId") : null;
        socket = io(socketUrl, {
          transports: ["websocket", "polling"],
          auth: { schoolId: storedSchoolId }
        });

        socket.on("school:status_changed", (payload: any) => {
          if (!payload) return;
          const currentSchoolId = typeof window !== "undefined" ? localStorage.getItem("schoolId") : null;
          if (!currentSchoolId || String(payload.schoolId) === String(currentSchoolId)) {
            if (payload.status === "SUSPENDED" || payload.status === "EXPIRED" || payload.status === "DEACTIVATED") {
              setBlockedState({
                isBlocked: true,
                schoolStatus: payload.status,
                code: payload.code || "SCHOOL_ACCESS_SUSPENDED",
                message: payload.reason || "Your school account is currently inactive.",
                schoolName: payload.schoolName || localStorage.getItem("schoolName") || "ABC Public School",
                schoolCode: payload.schoolCode || ""
              });
            } else if (payload.status === "ACTIVE") {
              setBlockedState(null);
            }
          }
        });
      }).catch(() => {});
    } catch {}

    return () => {
      window.removeEventListener("school_status_blocked", handleBlockedEvent);
      if (socket && typeof socket.disconnect === "function") {
        socket.disconnect();
      }
    };
  }, []);

  // If school is blocked, render FULL-SCREEN BLOCK PAGE and DO NOT SHOW NORMAL DASHBOARD
  if (blockedState?.isBlocked) {
    const isSuspended = blockedState.schoolStatus === "SUSPENDED";
    const isExpired = blockedState.schoolStatus === "EXPIRED";

    return (
      <SchoolStatusContext.Provider value={{ blockedState, setBlockedState, checkSchoolStatus }}>
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999,
          background: "radial-gradient(ellipse at center, #111827 0%, #030712 100%)",
          color: "#f9fafb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
          {/* Ambient glow */}
          <div style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: isSuspended ? "rgba(239, 68, 68, 0.08)" : "rgba(245, 158, 11, 0.08)",
            filter: "blur(120px)",
            pointerEvents: "none"
          }} />

          <div style={{
            width: "100%",
            maxWidth: 520,
            background: "rgba(17, 24, 39, 0.85)",
            backdropFilter: "blur(24px)",
            border: `1px solid ${isSuspended ? "rgba(239, 68, 68, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
            borderRadius: 24,
            padding: "2.5rem 2rem",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)",
            position: "relative",
            zIndex: 10
          }}>
            
            {/* Header Icon */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: isSuspended ? "rgba(239, 68, 68, 0.15)" : "rgba(245, 158, 11, 0.15)",
              border: `2px solid ${isSuspended ? "#ef4444" : "#f59e0b"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem auto",
              color: isSuspended ? "#ef4444" : "#f59e0b"
            }}>
              {isSuspended ? <ShieldAlert size={36} /> : <AlertOctagon size={36} />}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: "1.65rem",
              fontWeight: 900,
              color: "#ffffff",
              margin: "0 0 0.5rem 0",
              letterSpacing: "-0.02em"
            }}>
              {isSuspended ? "Account Suspended" : isExpired ? "Subscription Expired" : "Account Inactive"}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: "0.95rem",
              color: "#9ca3af",
              lineHeight: 1.5,
              margin: "0 0 1.75rem 0"
            }}>
              Your school account is currently <strong>inactive</strong>.<br />
              Please contact the Super Admin to reactivate your account.
            </p>

            {/* School Info Dossier Box */}
            <div style={{
              background: "rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 14,
              padding: "1.1rem 1.25rem",
              marginBottom: "1.75rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "0.65rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>School</span>
                <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#f3f4f6" }}>
                  {blockedState.schoolName || "ABC Public School"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>Status</span>
                <span style={{
                  fontSize: "0.78rem",
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                  padding: "3px 10px",
                  borderRadius: 6,
                  background: isSuspended ? "rgba(239, 68, 68, 0.2)" : "rgba(245, 158, 11, 0.2)",
                  color: isSuspended ? "#f87171" : "#fbbf24",
                  border: `1px solid ${isSuspended ? "rgba(239, 68, 68, 0.4)" : "rgba(245, 158, 11, 0.4)"}`
                }}>
                  {blockedState.schoolStatus}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href="mailto:support@schoolmitra.com?subject=Reactivation%20Request%20for%20School%20Account"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  background: "#4f46e5",
                  color: "#ffffff",
                  padding: "0.85rem 1.25rem",
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
                  transition: "all 0.2s ease"
                }}
              >
                <Mail size={18} /> Contact Super Admin
              </a>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                <button
                  type="button"
                  onClick={checkSchoolStatus}
                  disabled={isChecking}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.45rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#d1d5db",
                    padding: "0.75rem 1rem",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: isChecking ? "not-allowed" : "pointer"
                  }}
                >
                  <RefreshCw size={14} className={isChecking ? "spin" : ""} />
                  {isChecking ? "Verifying..." : "Check Status"}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.45rem",
                    background: "rgba(239, 68, 68, 0.08)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    color: "#f87171",
                    padding: "0.75rem 1rem",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer"
                  }}
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            </div>

            {/* Footer Notice */}
            <p style={{
              fontSize: "0.75rem",
              color: "#6b7280",
              marginTop: "1.75rem",
              marginBottom: 0,
              lineHeight: 1.4
            }}>
              🔒 All write operations, attendance, marks submission, fees collection, and administrative data modifications are locked until reactivated by the Super Admin.
            </p>
          </div>
        </div>
      </SchoolStatusContext.Provider>
    );
  }

  return (
    <SchoolStatusContext.Provider value={{ blockedState, setBlockedState, checkSchoolStatus }}>
      {children}
    </SchoolStatusContext.Provider>
  );
}
