"use client";

import React from "react";
import Link from "next/link";
import { Menu, Bell } from "lucide-react";

interface TeacherHeaderProps {
  unreadCount?: number;
  onMenuClick?: () => void;
}

export default function TeacherHeader({ unreadCount = 3, onMenuClick }: TeacherHeaderProps) {
  return (
    <header style={{
      height: 60,
      background: "var(--header-bg)",
      borderBottom: "1px solid var(--header-border)",
      display: "flex",
      alignItems: "center",
      justify: "space-between",
      padding: "0 1.2rem",
      position: "sticky",
      top: 0,
      zIndex: 50,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      transition: "background 0.3s ease, border-color 0.3s ease"
    }}>
      {/* LEFT: HAMBURGER MENU */}
      <button 
        type="button" 
        onClick={onMenuClick}
        style={{
          background: "none",
          border: "none",
          color: "var(--card-text)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4
        }}
      >
        <Menu size={24} strokeWidth={2.2} />
      </button>

      {/* CENTER: SCHOOLMITRA BRANDING LOGO */}
      <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #10b981, #3b82f6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontWeight: 900,
          fontSize: "1.1rem",
          boxShadow: "0 4px 10px rgba(16, 185, 129, 0.25)"
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--header-text)", lineHeight: 1, letterSpacing: "-0.02em" }}>
            School<span style={{ color: "#10b981" }}>Mitra</span>
          </div>
          <div style={{ fontSize: "0.58rem", color: "var(--card-subtext)", fontWeight: 700, letterSpacing: "-0.01em", marginTop: 2 }}>
            Manage. Connect. Empower.
          </div>
        </div>
      </Link>

      {/* RIGHT: NOTIFICATION BELL WITH COUNTER */}
      <Link href="/communication/notifications" style={{ position: "relative", textDecoration: "none", display: "flex", alignItems: "center" }}>
        <div style={{
          width: 38,
          height: 38,
          borderRadius: "12px",
          background: "rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--card-text)",
          border: "1px solid var(--header-border)"
        }}>
          <Bell size={20} strokeWidth={2.2} />
        </div>

        {unreadCount > 0 && (
          <span style={{
            position: "absolute",
            top: -2,
            right: -2,
            background: "#ef4444",
            color: "#ffffff",
            fontSize: "0.65rem",
            fontWeight: 900,
            width: 18,
            height: 18,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid var(--header-bg)",
            boxShadow: "0 2px 6px rgba(239, 68, 68, 0.4)"
          }}>
            {unreadCount}
          </span>
        )}
      </Link>
    </header>
  );
}
