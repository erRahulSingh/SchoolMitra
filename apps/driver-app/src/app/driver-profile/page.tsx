"use client";

import React, { useState } from "react";
import { 
  User, Phone, Globe, Lock, LogOut, ShieldCheck, 
  Award, CheckCircle2, ChevronRight, Bus, Key, Smartphone, 
  Star, ShieldAlert, BadgeCheck, Mail, Calendar, Sparkles, MapPin
} from "lucide-react";

export default function DriverProfilePage({ onLogout }: { onLogout?: () => void }) {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const driverProfile = {
    name: "Ram Singh",
    role: "Senior School Bus Pilot",
    phone: "+91 98111 22334",
    email: "driver@schoolmitra.com",
    empId: "EMP-DRV-104",
    licenseNo: "DL-04-2019-883012",
    rating: "4.9",
    totalTrips: "240+ Safe Trips",
    busAssigned: "Bus #DL 01 AB 4321",
    routeName: "Route 1 - Dwarka Sector 12 Express"
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
    }, 1500);
  };

  const handleUserLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("driverUser");
      window.location.reload();
    }
  };

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HERO DRIVER PROFILE CARD ════════════ */}
      <div className="card-ui" style={{
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
        borderRadius: 22
      }}>
        {/* Profile Avatar Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "1.4rem", color: "#fff",
            boxShadow: "0 8px 24px rgba(16, 185, 129, 0.35)",
            flexShrink: 0
          }}>
            RS
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 900 }} className="text-title">{driverProfile.name}</h2>
              <BadgeCheck size={20} color="#10b981" />
            </div>
            <div style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 800, marginTop: 1 }}>
              {driverProfile.role}
            </div>
            <div style={{ fontSize: "0.72rem", marginTop: 3 }} className="text-muted-custom">
              ID: <strong>{driverProfile.empId}</strong> • License: <strong>{driverProfile.licenseNo}</strong>
            </div>
          </div>
        </div>

        {/* Safety Rating & Experience Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
          <div className="subbox-ui" style={{ padding: "0.75rem", borderRadius: 14, display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#d97706" }}>
              <Star size={18} fill="#f59e0b" />
            </div>
            <div>
              <div style={{ fontSize: "0.65rem", fontWeight: 700 }} className="text-muted-custom">SAFETY RATING</div>
              <div style={{ fontSize: "1rem", fontWeight: 900, color: "#d97706" }}>{driverProfile.rating} ⭐</div>
            </div>
          </div>

          <div className="subbox-ui" style={{ padding: "0.75rem", borderRadius: 14, display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669" }}>
              <Award size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.65rem", fontWeight: 700 }} className="text-muted-custom">EXPERIENCE</div>
              <div style={{ fontSize: "0.92rem", fontWeight: 900, color: "#059669" }}>{driverProfile.totalTrips}</div>
            </div>
          </div>
        </div>

        {/* Current Assigned Vehicle & Route */}
        <div className="subbox-ui" style={{ padding: "0.85rem 1rem", borderRadius: 14, display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(2, 132, 199, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0284c7", flexShrink: 0 }}>
            <Bus size={20} />
          </div>
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", color: "#0284c7" }}>CURRENT ASSIGNED VEHICLE & ROUTE</div>
            <div style={{ fontSize: "0.88rem", fontWeight: 900, marginTop: 2 }} className="text-title">{driverProfile.busAssigned}</div>
            <div style={{ fontSize: "0.72rem", marginTop: 1 }} className="text-muted-custom">{driverProfile.routeName}</div>
          </div>
        </div>
      </div>

      {/* ════════════ DRIVER PERMISSIONS & SCOPE ════════════ */}
      <div className="card-ui" style={{ padding: "1.2rem", borderRadius: 22 }}>
        <div style={{ fontSize: "0.82rem", fontWeight: 900, color: "#059669", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <ShieldCheck size={18} /> Driver Role & Access Scope
        </div>

        {/* Permissions Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.55rem", marginBottom: "1rem" }}>
          {[
            "View Assigned Bus", "View Assigned Route", "View Assigned Students",
            "Start/End Trip", "Pickup/Drop Student", "Share Live GPS",
            "Report Emergency", "View Trip History", "Edit Basic Profile"
          ].map((perm, idx) => (
            <div key={idx} className="subbox-ui" style={{ padding: "0.5rem 0.65rem", borderRadius: 10, fontSize: "0.72rem", fontWeight: 800, color: "#059669", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <CheckCircle2 size={14} color="#10b981" />
              <span>{perm}</span>
            </div>
          ))}
        </div>

        {/* Restriction Banner */}
        <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.25)", borderRadius: 14, padding: "0.75rem 0.9rem", fontSize: "0.74rem", color: "#dc2626", fontWeight: 800, lineHeight: 1.45 }}>
          ❌ RESTRICTED: Driver cannot edit student profiles, fee ledgers, exam grades, attendance records, or school admin data.
        </div>
      </div>

      {/* ════════════ SETTINGS & OPTIONS LIST ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        
        {/* Contact Number Card */}
        <div className="card-ui" style={{ padding: "0.95rem 1.1rem", borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(2, 132, 199, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0284c7" }}>
              <Phone size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 700 }} className="text-muted-custom">REGISTERED PHONE</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 900, marginTop: 1 }} className="text-title">{driverProfile.phone}</div>
            </div>
          </div>
        </div>

        {/* Language Selector Card */}
        <div className="card-ui" style={{ padding: "0.95rem 1.1rem", borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(139, 92, 246, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6" }}>
              <Globe size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 700 }} className="text-muted-custom">APP LANGUAGE / भाषा</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 900, marginTop: 1 }} className="text-title">
                {language === "en" ? "English (US)" : "हिन्दी (Hindi)"}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            style={{ background: "rgba(139, 92, 246, 0.15)", border: "1px solid rgba(139, 92, 246, 0.3)", color: "#8b5cf6", padding: "0.4rem 0.75rem", borderRadius: 10, fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}
          >
            Switch to {language === "en" ? "हिन्दी" : "English"}
          </button>
        </div>

        {/* Change Password Card */}
        <button
          type="button"
          onClick={() => setShowPasswordModal(true)}
          className="card-ui"
          style={{ padding: "0.95rem 1.1rem", borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", cursor: "pointer", textAlign: "left" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(217, 119, 6, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#d97706" }}>
              <Lock size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 700 }} className="text-muted-custom">SECURITY</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 900, marginTop: 1 }} className="text-title">Change Account Password</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-muted-custom" />
        </button>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleUserLogout}
          style={{
            marginTop: "0.5rem",
            background: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: 16, padding: "0.95rem",
            display: "flex", justifyContent: "center", alignItems: "center", gap: "0.55rem",
            color: "#dc2626", fontWeight: 900, fontSize: "0.92rem", cursor: "pointer"
          }}
        >
          <LogOut size={18} /> Log Out from Driver Cockpit
        </button>

      </div>

      {/* ════════════ CHANGE PASSWORD MODAL ════════════ */}
      {showPasswordModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
          zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="card-ui" style={{ padding: "1.5rem", width: "100%", maxWidth: 360, borderRadius: 20 }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.35rem" }} className="text-title">Change Account Password</h3>
            <p style={{ fontSize: "0.78rem", marginBottom: "1.25rem" }} className="text-muted-custom">
              Update your Driver Cockpit portal password.
            </p>

            {passwordSuccess ? (
              <div style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "0.85rem", borderRadius: 12, color: "#059669", fontSize: "0.82rem", fontWeight: 800, textAlign: "center" }}>
                ✅ Password updated successfully!
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                  required
                  style={{ width: "100%", padding: "0.75rem", background: "var(--bg-subbox)", border: "1px solid var(--border-card)", borderRadius: 12, color: "var(--text-primary)", fontSize: "0.85rem" }}
                />

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                  style={{ width: "100%", padding: "0.75rem", background: "var(--bg-subbox)", border: "1px solid var(--border-card)", borderRadius: 12, color: "var(--text-primary)", fontSize: "0.85rem" }}
                />

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    style={{ flex: 1, padding: "0.7rem", background: "var(--bg-subbox)", border: "1px solid var(--border-card)", borderRadius: 10, color: "var(--text-primary)", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ flex: 1, padding: "0.7rem", background: "linear-gradient(135deg, #10b981, #059669)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 800, fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
