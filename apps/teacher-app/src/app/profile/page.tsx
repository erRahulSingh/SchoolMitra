"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  User, ArrowLeft, Mail, Phone, BookOpen, Calendar, 
  Sparkles, Award, ShieldCheck, Edit, FileText, CheckCircle2, Sun, Moon
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";
import TeacherHeader from "@/components/TeacherHeader";
import { useTheme } from "@/components/ThemeProvider";

export default function TeacherProfilePage() {
  const { theme, toggleTheme, setTheme } = useTheme();

  const [profile, setProfile] = useState<any>({
    name: "Anil Dev Sharma",
    empId: "TCH-2024-884",
    role: "Senior Educator & Class Teacher 10-A",
    school: "Delhi Public School (Dwarka)",
    email: "anil.sharma@dpsdwarka.edu.in",
    phone: "+91 98765 43210",
    qualification: "M.Sc. Mathematics, B.Ed (Delhi University)",
    doj: "15 July 2018",
    assigned: "Class 10-A (Class Teacher), Class 9-B (Physics Lab)"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("teacher_profile");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.name) setProfile((prev: any) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }
    }
  }, []);

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
              My Profile
            </h1>
          </div>

          <Link href="/dashboard" style={{
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
          <Link href="/profile" style={{ flex: 1, textAlign: "center", padding: "0.5rem", borderRadius: "12px", background: "#1d4ed8", color: "#fff", fontSize: "0.78rem", fontWeight: 800, textDecoration: "none" }}>
            Profile
          </Link>
          <Link href="/profile/leave" style={{ flex: 1, textAlign: "center", padding: "0.5rem", borderRadius: "12px", background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--card-text)", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}>
            Leave
          </Link>
          <Link href="/profile/settings" style={{ flex: 1, textAlign: "center", padding: "0.5rem", borderRadius: "12px", background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--card-text)", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}>
            Settings
          </Link>
        </div>

        {/* ════════════ PROFILE HERO CARD ════════════ */}
        <div className="card-white" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", alignItems: "center", textAlignment: "center", gap: "0.75rem" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)", color: "#ffffff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.8rem", fontWeight: 900, boxShadow: "0 8px 20px rgba(29, 78, 216, 0.3)"
          }}>
            {profile.name[0]}
          </div>

          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "var(--card-text)" }}>{profile.name}</h2>
            <div style={{ fontSize: "0.78rem", color: "#1d4ed8", fontWeight: 800, marginTop: 2 }}>{profile.role}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--card-subtext)", marginTop: 2 }}>EMP ID: <strong>{profile.empId}</strong></div>
          </div>
        </div>

        {/* ════════════ THEME TOGGLE SWITCH CARD (LIGHT MODE DEFAULT) ════════════ */}
        <div className="card-white" style={{ padding: "1rem 1.1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "12px",
              background: theme === "dark" ? "#1e293b" : "#fef3c7",
              color: theme === "dark" ? "#3b82f6" : "#d97706",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </div>

            <div>
              <div style={{ fontSize: "0.88rem", fontWeight: 900, color: "var(--card-text)" }}>
                App Theme ({theme === "dark" ? "Dark Mode 🌙" : "Light Mode ☀️"})
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)", marginTop: 1 }}>
                App opens in Light Mode by default
              </div>
            </div>
          </div>

          {/* TOGGLE BUTTON */}
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "99px",
              background: theme === "dark" ? "#3b82f6" : "#f1f5f9",
              color: theme === "dark" ? "#ffffff" : "#0f172a",
              border: "1px solid var(--card-border)",
              fontWeight: 800,
              fontSize: "0.75rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >
            {theme === "dark" ? (
              <>
                <Moon size={14} /> Dark
              </>
            ) : (
              <>
                <Sun size={14} color="#d97706" /> Light
              </>
            )}
          </button>
        </div>

        {/* DETAILS LIST */}
        <div className="card-white" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.88rem", fontWeight: 900, color: "var(--card-text)" }}>Official Credentials</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.78rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.4rem" }}>
              <span style={{ color: "var(--card-subtext)" }}>School</span>
              <strong style={{ color: "var(--card-text)" }}>{profile.school}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.4rem" }}>
              <span style={{ color: "var(--card-subtext)" }}>Email</span>
              <strong style={{ color: "var(--card-text)" }}>{profile.email}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.4rem" }}>
              <span style={{ color: "var(--card-subtext)" }}>Mobile</span>
              <strong style={{ color: "var(--card-text)" }}>{profile.phone}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.4rem" }}>
              <span style={{ color: "var(--card-subtext)" }}>Qualification</span>
              <strong style={{ color: "var(--card-text)", textAlign: "right", maxWidth: "190px" }}>{profile.qualification}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--card-subtext)" }}>Assigned Classes</span>
              <strong style={{ color: "var(--card-text)", textAlign: "right", maxWidth: "190px" }}>{profile.assigned}</strong>
            </div>
          </div>
        </div>

      </div>

      <TeacherBottomNav />

    </div>
  );
}
