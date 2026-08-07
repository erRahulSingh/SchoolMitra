"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, ShieldCheck, Sparkles, BookOpen, Users, CheckCircle2 } from "lucide-react";

export default function SplashScreenPage() {
  return (
    <div className="mobile-content" style={{ justifyContent: "space-between", padding: "2rem 1.5rem 2.5rem 1.5rem" }}>
      
      {/* TOP HEADER BADGE */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          padding: "0.4rem 0.9rem", borderRadius: "99px",
          background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
          color: "var(--primary)", fontSize: "0.78rem", fontWeight: 800
        }}>
          <Sparkles size={14} /> SchoolMitra Educator Portal
        </div>
      </div>

      {/* CENTER HERO LOGO & TITLE */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
        <div className="pulse-logo" style={{
          width: 96, height: 96, borderRadius: "28px",
          background: "var(--primary-gradient)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 20px 50px rgba(16, 185, 129, 0.4)",
          border: "2px solid rgba(255, 255, 255, 0.2)"
        }}>
          <GraduationCap size={52} color="#ffffff" />
        </div>

        <div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.03em" }}>
            Teacher App
          </h1>
          <p style={{ marginTop: "0.4rem", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.45, maxWidth: "300px" }}>
            Smart Attendance, CBSE Gradebook, Homework & Parent Connect for Educators.
          </p>
        </div>

        {/* 3 FEATURE CHIPS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", width: "100%", marginTop: "0.5rem" }}>
          {[
            { icon: CheckCircle2, text: "1-Tap Attendance & Marksheet Entry" },
            { icon: BookOpen, text: "CBSE Report Card Remarks & Analytics" },
            { icon: Users, text: "Instant WhatsApp Parent Notices" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} style={{
                display: "flex", alignItems: "center", gap: "0.65rem",
                padding: "0.65rem 0.9rem", borderRadius: "var(--radius-md)",
                background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "0.82rem", color: "#e2e8f0"
              }}>
                <Icon size={16} color="var(--primary)" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM ACTION BUTTONS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", width: "100%" }}>
        <Link href="/login" className="btn-primary" style={{ textDecoration: "none" }}>
          <span>Continue to Teacher Login</span>
          <ArrowRight size={18} />
        </Link>

        <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
          Powered by <strong style={{ color: "#ffffff" }}>SchoolMitra SaaS ERP</strong> • Version 2.4.0
        </div>
      </div>

    </div>
  );
}
