"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, School, LayoutGrid, MessageSquare, User 
} from "lucide-react";

export default function TeacherBottomNav() {
  const pathname = usePathname();

  const isHome = pathname === "/dashboard";
  const isClasses = pathname.startsWith("/classes") || pathname.startsWith("/students");
  const isAcademics = pathname.startsWith("/academics") || pathname.startsWith("/homework") || pathname.startsWith("/weekly-test") || pathname.startsWith("/attendance") || pathname.startsWith("/exams") || pathname.startsWith("/report-card");
  const isMessages = pathname.startsWith("/communication") || pathname.startsWith("/messages");
  const isProfile = pathname.startsWith("/profile");

  const activePurple = "#7c3aed";
  const inactiveGray = "#94a3b8";

  return (
    <div className="teacher-bottom-nav" style={{
      height: 68,
      background: "var(--nav-bg)",
      borderTop: "1px solid var(--nav-border)",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "0 0.5rem",
      position: "sticky",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      flexShrink: 0,
      boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.08)",
      transition: "background 0.3s ease, border-color 0.3s ease"
    }}>
      
      {/* TAB 1: HOME */}
      <Link
        href="/dashboard"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          textDecoration: "none",
          color: isHome ? activePurple : inactiveGray,
          transition: "all 0.2s ease"
        }}
      >
        <Home 
          size={22} 
          color={isHome ? activePurple : inactiveGray} 
          fill={isHome ? "rgba(124, 58, 237, 0.15)" : "none"} 
          strokeWidth={isHome ? 2.4 : 2} 
        />
        <span style={{ fontSize: "0.68rem", fontWeight: isHome ? 800 : 600 }}>
          Home
        </span>
      </Link>

      {/* TAB 2: CLASSES */}
      <Link
        href="/classes"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          textDecoration: "none",
          color: isClasses ? activePurple : inactiveGray,
          transition: "all 0.2s ease"
        }}
      >
        <School 
          size={22} 
          color={isClasses ? activePurple : inactiveGray} 
          fill={isClasses ? "rgba(124, 58, 237, 0.15)" : "none"} 
          strokeWidth={isClasses ? 2.4 : 2} 
        />
        <span style={{ fontSize: "0.68rem", fontWeight: isClasses ? 800 : 600 }}>
          Classes
        </span>
      </Link>

      {/* TAB 3: ACADEMICS (CENTER ELEVATED TAB) */}
      <Link
        href="/academics"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          textDecoration: "none",
          color: isAcademics ? activePurple : inactiveGray,
          transition: "all 0.2s ease"
        }}
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: "14px",
          background: isAcademics 
            ? "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" 
            : "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-16px",
          boxShadow: isAcademics 
            ? "0 8px 20px rgba(124, 58, 237, 0.4)" 
            : "0 6px 16px rgba(139, 92, 246, 0.25)",
          transition: "all 0.2s ease"
        }}>
          <LayoutGrid size={22} strokeWidth={2.5} color="#ffffff" />
        </div>
        <span style={{ fontSize: "0.68rem", fontWeight: isAcademics ? 800 : 600, color: isAcademics ? activePurple : inactiveGray }}>
          Academics
        </span>
      </Link>

      {/* TAB 4: MESSAGES */}
      <Link
        href="/communication/messages"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          textDecoration: "none",
          color: isMessages ? activePurple : inactiveGray,
          transition: "all 0.2s ease"
        }}
      >
        <MessageSquare 
          size={22} 
          color={isMessages ? activePurple : inactiveGray} 
          fill={isMessages ? "rgba(124, 58, 237, 0.15)" : "none"} 
          strokeWidth={isMessages ? 2.4 : 2} 
        />
        <span style={{ fontSize: "0.68rem", fontWeight: isMessages ? 800 : 600 }}>
          Messages
        </span>
      </Link>

      {/* TAB 5: PROFILE */}
      <Link
        href="/profile"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          textDecoration: "none",
          color: isProfile ? activePurple : inactiveGray,
          transition: "all 0.2s ease"
        }}
      >
        <User 
          size={22} 
          color={isProfile ? activePurple : inactiveGray} 
          fill={isProfile ? "rgba(124, 58, 237, 0.15)" : "none"} 
          strokeWidth={isProfile ? 2.4 : 2} 
        />
        <span style={{ fontSize: "0.68rem", fontWeight: isProfile ? 800 : 600 }}>
          Profile
        </span>
      </Link>

    </div>
  );
}
