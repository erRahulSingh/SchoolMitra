"use client";

import React, { useState } from "react";
import { 
  User, Users, Settings, Globe, LogOut, Phone, 
  Mail, MapPin, Check, Bell, Shield, Moon, Smartphone, 
  ChevronRight, Sparkles, CheckCircle2
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "family" | "settings" | "language" | "logout">("profile");
  const [lang, setLang] = useState<"en" | "hi" | "pa" | "gu" | "mr">("en");
  const [parent, setParent] = useState<any>({ name: "Rajesh Sharma", email: "parent@schoolmitra.com", phone: "+91 98765 43210", address: "Sector 12, Dwarka, New Delhi" });

  const [pushNotifs, setPushNotifs] = useState(true);
  const [biometric, setBiometric] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("parentUser");
    window.location.reload();
  };

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>{parent.name}</h2>
            <span style={{ background: "rgba(16,185,129,0.2)", color: "#059669", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              VERIFIED PARENT
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Parent ID: PAR-7501 • Delhi Public School
          </p>
        </div>

        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900
        }}>
          RS
        </div>
      </div>

      {/* ════════════ 5-TAB SUB-NAVIGATION BAR ════════════ */}
      <div className="subtab-bar" style={{
        display: "flex", gap: "0.35rem", overflowX: "auto", padding: "0.35rem", borderRadius: 16,
        scrollbarWidth: "none"
      }}>
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "family", label: "Family", icon: Users },
          { id: "settings", label: "Settings", icon: Settings },
          { id: "language", label: "Language", icon: Globe },
          { id: "logout", label: "Logout", icon: LogOut }
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: "0.55rem 0.75rem", borderRadius: 12, border: "none",
              background: activeTab === t.id ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent",
              color: activeTab === t.id ? "#fff" : "var(--card-subtext)",
              fontSize: "0.75rem", fontWeight: 700,
              display: "flex", alignItems: "center", gap: "0.35rem",
              cursor: "pointer", whitespace: "nowrap",
              boxShadow: activeTab === t.id ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none"
            }}
          >
            <t.icon size={14} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ════════════ SCREEN 1: PARENT PROFILE ════════════ */}
      {activeTab === "profile" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card-ui" style={{ padding: "1.25rem" }}>
            <div className="text-title" style={{ fontSize: "0.85rem", fontWeight: 800, marginBottom: "0.85rem" }}>Personal Contact Information</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div className="subbox-ui" style={{ padding: "0.85rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Phone size={18} color="#0284c7" />
                <div>
                  <div className="text-muted-custom" style={{ fontSize: "0.7rem" }}>PRIMARY PHONE NUMBER</div>
                  <div className="text-title" style={{ fontSize: "0.88rem", fontWeight: 800 }}>{parent.phone}</div>
                </div>
              </div>

              <div className="subbox-ui" style={{ padding: "0.85rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Mail size={18} color="#059669" />
                <div>
                  <div className="text-muted-custom" style={{ fontSize: "0.7rem" }}>EMAIL ADDRESS</div>
                  <div className="text-title" style={{ fontSize: "0.88rem", fontWeight: 800 }}>{parent.email}</div>
                </div>
              </div>

              <div className="subbox-ui" style={{ padding: "0.85rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <MapPin size={18} color="#db2777" />
                <div>
                  <div className="text-muted-custom" style={{ fontSize: "0.7rem" }}>RESIDENTIAL ADDRESS</div>
                  <div className="text-title" style={{ fontSize: "0.88rem", fontWeight: 800 }}>{parent.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ SCREEN 4: LANGUAGE ════════════ */}
      {activeTab === "language" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {[
            { id: "en", label: "English", native: "English" },
            { id: "hi", label: "Hindi", native: "हिन्दी" },
            { id: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
            { id: "gu", label: "Gujarati", native: "ગુજરાતી" },
            { id: "mr", label: "Marathi", native: "मराठी" }
          ].map(l => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLang(l.id as any)}
              className="card-ui"
              style={{
                borderRadius: 16, padding: "0.85rem 1.1rem", display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer", border: lang === l.id ? "1.5px solid var(--primary)" : "1px solid var(--card-border)"
              }}
            >
              <div className="text-title" style={{ fontSize: "0.88rem", fontWeight: 800 }}>
                {l.label} <span className="text-muted-custom">({l.native})</span>
              </div>
              {lang === l.id && <Check size={18} color="#059669" />}
            </button>
          ))}
        </div>
      )}

      {/* ════════════ SCREEN 5: LOGOUT ════════════ */}
      {activeTab === "logout" && (
        <div className="card-ui" style={{ padding: "1.25rem", textAlign: "center", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#dc2626", marginBottom: "0.4rem" }}>Log Out Parent Account?</div>
          <p className="text-muted-custom" style={{ fontSize: "0.82rem", lineHeight: 1.5, marginBottom: "1.25rem" }}>
            Are you sure you want to end your current session?
          </p>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: "100%", padding: "0.8rem", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff",
              fontWeight: 800, fontSize: "0.88rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
              boxShadow: "0 6px 20px rgba(239, 68, 68, 0.3)"
            }}
          >
            <LogOut size={18} /> Confirm Logout Session
          </button>
        </div>
      )}

    </div>
  );
}
