"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Settings, ArrowLeft, Bell, Lock, Shield, 
  Sparkles, CheckCircle2, Moon, Sun, Smartphone 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";
import TeacherHeader from "@/components/TeacherHeader";
import { useTheme } from "@/components/ThemeProvider";

export default function TeacherSettingsPage() {
  const { theme, toggleTheme, setTheme } = useTheme();

  const [pushNotifs, setPushNotifs] = useState(true);
  const [parentSync, setParentSync] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--bg-mobile)" }}>
      
      <TeacherHeader unreadCount={3} />

      <div className="mobile-content" style={{ flex: 1, gap: "1.1rem", padding: "0.9rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.2rem 0.6rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Profile & Settings
            </div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--card-text)", marginTop: 4 }}>
              App Settings
            </h1>
          </div>

          <Link href="/profile" style={{
            padding: "0.45rem 0.8rem", borderRadius: "12px",
            background: "var(--card-bg)", border: "1px solid var(--card-border)",
            color: "var(--card-text)", fontSize: "0.75rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* SUB-PAGES TABS */}
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <Link href="/profile" style={{ flex: 1, textAlign: "center", padding: "0.5rem", borderRadius: "12px", background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--card-text)", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}>
            Profile
          </Link>
          <Link href="/profile/leave" style={{ flex: 1, textAlign: "center", padding: "0.5rem", borderRadius: "12px", background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--card-text)", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}>
            Leave
          </Link>
          <Link href="/profile/settings" style={{ flex: 1, textAlign: "center", padding: "0.5rem", borderRadius: "12px", background: "#1d4ed8", color: "#fff", fontSize: "0.78rem", fontWeight: 800, textDecoration: "none" }}>
            Settings
          </Link>
        </div>

        {saved && (
          <div style={{ padding: "0.75rem 1rem", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", borderRadius: 12, color: "#10b981", fontSize: "0.78rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <CheckCircle2 size={16} /> Settings Saved Successfully!
          </div>
        )}

        {/* ════════════ 1. APPEARANCE / THEME CONTROL CARD ════════════ */}
        <div className="card-white" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <h3 style={{ fontSize: "0.88rem", fontWeight: 900, color: "var(--card-text)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            {theme === "dark" ? <Moon size={16} color="#3b82f6" /> : <Sun size={16} color="#d97706" />} Theme & Appearance
          </h3>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--card-border)", paddingTop: "0.75rem" }}>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--card-text)" }}>
                Display Mode ({theme === "dark" ? "Dark Mode 🌙" : "Light Mode ☀️"})
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)", marginTop: 2 }}>
                App defaults to Light Mode when opened.
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.35rem", background: "var(--bg-mobile)", padding: "0.2rem", borderRadius: "99px", border: "1px solid var(--card-border)" }}>
              <button
                type="button"
                onClick={() => setTheme("light")}
                style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: "99px",
                  background: theme === "light" ? "#ffffff" : "transparent",
                  color: theme === "light" ? "#1d4ed8" : "var(--card-subtext)",
                  border: "none",
                  fontWeight: 900,
                  fontSize: "0.72rem",
                  cursor: "pointer",
                  boxShadow: theme === "light" ? "0 2px 6px rgba(0,0,0,0.1)" : "none"
                }}
              >
                ☀️ Light
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: "99px",
                  background: theme === "dark" ? "#3b82f6" : "transparent",
                  color: theme === "dark" ? "#ffffff" : "var(--card-subtext)",
                  border: "none",
                  fontWeight: 900,
                  fontSize: "0.72rem",
                  cursor: "pointer",
                  boxShadow: theme === "dark" ? "0 2px 6px rgba(0,0,0,0.2)" : "none"
                }}
              >
                🌙 Dark
              </button>
            </div>
          </div>
        </div>

        {/* ════════════ 2. NOTIFICATIONS & PREFERENCES ════════════ */}
        <form onSubmit={handleSave} className="card-white" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <h3 style={{ fontSize: "0.88rem", fontWeight: 900, color: "var(--card-text)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Bell size={16} color="#1d4ed8" /> Notifications & Sync
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", borderTop: "1px solid var(--card-border)", paddingTop: "0.75rem" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--card-text)" }}>Push Notifications</div>
                <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)" }}>Receive instant alerts for parent messages</div>
              </div>
              <input 
                type="checkbox" 
                checked={pushNotifs} 
                onChange={e => setPushNotifs(e.target.checked)} 
                style={{ width: 18, height: 18, accentColor: "#1d4ed8", cursor: "pointer" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--card-text)" }}>Parent Sync Engine</div>
                <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)" }}>Real-time Socket.IO broadcasts on marks save</div>
              </div>
              <input 
                type="checkbox" 
                checked={parentSync} 
                onChange={e => setParentSync(e.target.checked)} 
                style={{ width: 18, height: 18, accentColor: "#1d4ed8", cursor: "pointer" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--card-text)" }}>SMS Broadcast Alerts</div>
                <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)" }}>Send automated SMS for absent students</div>
              </div>
              <input 
                type="checkbox" 
                checked={smsAlerts} 
                onChange={e => setSmsAlerts(e.target.checked)} 
                style={{ width: 18, height: 18, accentColor: "#1d4ed8", cursor: "pointer" }}
              />
            </div>

          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            Save Preferences
          </button>
        </form>

      </div>

      <TeacherBottomNav />

    </div>
  );
}
