"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, School, MessageSquare, User, Plus 
} from "lucide-react";

export default function TeacherBottomNav() {
  const pathname = usePathname();

  const isHome = pathname === "/dashboard";
  const isClasses = pathname.startsWith("/attendance") || pathname.startsWith("/students");
  const isActionActive = pathname.startsWith("/homework/create") || pathname.startsWith("/weekly-test/create") || pathname.startsWith("/assignments/create");
  const isMessages = pathname.startsWith("/communication");
  const isProfile = pathname.startsWith("/profile");

  const activeBlue = "var(--nav-active)";
  const inactiveGray = "var(--nav-text)";

  return (
    <div style={{
      height: 70,
      background: "var(--nav-bg)",
      borderTop: "1px solid var(--nav-border)",
      display: "flex",
      justify: "space-around",
      alignItems: "center",
      padding: "0 0.5rem",
      position: "relative",
      zIndex: 100,
      flexShrink: 0,
      boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)",
      transition: "background 0.3s ease, border-color 0.3s ease"
    }}>
      
      {/* TAB 1: TEACHER HOME */}
      <Link
        href="/dashboard"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textDecoration: "none",
          color: isHome ? activeBlue : inactiveGray,
          transition: "all 0.2s ease"
        }}
      >
        <Home 
          size={22} 
          color={isHome ? activeBlue : inactiveGray} 
          fill={isHome ? activeBlue : "none"} 
          strokeWidth={isHome ? 2.5 : 2} 
        />
        <span style={{ fontSize: "0.68rem", fontWeight: isHome ? 900 : 700 }}>
          Home
        </span>
      </Link>

      {/* TAB 2: TEACHER CLASSES */}
      <Link
        href="/attendance"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textDecoration: "none",
          color: isClasses ? activeBlue : inactiveGray,
          transition: "all 0.2s ease"
        }}
      >
        <School 
          size={22} 
          color={isClasses ? activeBlue : inactiveGray} 
          fill={isClasses ? activeBlue : "none"} 
          strokeWidth={isClasses ? 2.5 : 2} 
        />
        <span style={{ fontSize: "0.68rem", fontWeight: isClasses ? 900 : 700 }}>
          Classes
        </span>
      </Link>

      {/* TAB 3: CENTER ELEVATED FLOATING CIRCULAR BUTTON (+) - QUICK CREATE / ACTION */}
      <Link
        href="/homework/create"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-28px",
          zIndex: 110,
          textDecoration: "none",
          cursor: "pointer"
        }}
      >
        <div style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)",
          border: "4px solid var(--nav-bg)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isActionActive 
            ? "0 8px 24px rgba(29, 78, 216, 0.55)" 
            : "0 6px 18px rgba(29, 78, 216, 0.38)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease"
        }}>
          <Plus size={26} strokeWidth={3} />
        </div>
        <span style={{ fontSize: "0.68rem", fontWeight: 800, color: isActionActive ? activeBlue : inactiveGray, marginTop: 2 }}>
          Create
        </span>
      </Link>

      {/* TAB 4: TEACHER MESSAGES & PARENT COMMUNICATIONS */}
      <Link
        href="/communication/messages"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textDecoration: "none",
          color: isMessages ? activeBlue : inactiveGray,
          transition: "all 0.2s ease"
        }}
      >
        <MessageSquare 
          size={22} 
          color={isMessages ? activeBlue : inactiveGray} 
          fill={isMessages ? activeBlue : "none"} 
          strokeWidth={isMessages ? 2.5 : 2} 
        />
        <span style={{ fontSize: "0.68rem", fontWeight: isMessages ? 900 : 700 }}>
          Messages
        </span>
      </Link>

      {/* TAB 5: TEACHER PROFILE */}
      <Link
        href="/profile"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textDecoration: "none",
          color: isProfile ? activeBlue : inactiveGray,
          transition: "all 0.2s ease"
        }}
      >
        <User 
          size={22} 
          color={isProfile ? activeBlue : inactiveGray} 
          fill={isProfile ? activeBlue : "none"} 
          strokeWidth={isProfile ? 2.5 : 2} 
        />
        <span style={{ fontSize: "0.68rem", fontWeight: isProfile ? 900 : 700 }}>
          Profile
        </span>
      </Link>

    </div>
  );
}
