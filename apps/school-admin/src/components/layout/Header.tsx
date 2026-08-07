"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, Calendar, ChevronDown, Menu } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useTheme();
  const [user, setUser] = useState({ name: "Principal Office", email: "admin@dps.edu.in", schoolName: "Delhi Public School" });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser({
          name: parsed.name || "Principal Office",
          email: parsed.email || "admin@schoolmitra.com",
          schoolName: parsed.schoolName || "SchoolMitra Academy"
        });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const getInitials = (nameString: string) => {
    const parts = nameString.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return nameString.substring(0, 2).toUpperCase();
  };

  return (
    <header className="top-header">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border-color)",
            padding: "0.55rem",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-main)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none"
          }}
          title="Toggle Sidebar Collapse"
        >
          <Menu size={18} />
        </button>

        <div className="search-input-wrapper">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Search students, roll no, teachers, buses..." 
            className="search-input"
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Academic Year Switcher */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          padding: '0.4rem 0.8rem', 
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <Calendar size={14} color="var(--primary)" />
          <span>Session: <strong style={{ color: "var(--text-main)" }}>2026 - 2027</strong></span>
          <ChevronDown size={14} />
        </div>

        {/* Theme Toggle Component */}
        <ThemeToggle />

        {/* Quick Notification Bell */}
        <Link href="/notifications" style={{ 
          position: 'relative',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          padding: '0.55rem',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-main)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Bell size={18} />
          <span style={{ 
            position: 'absolute', 
            top: '4px', 
            right: '4px', 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: 'var(--primary)' 
          }}></span>
        </Link>

        {/* User Profile Pill */}
        <Link href="/profile" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          padding: '0.35rem 0.6rem 0.35rem 0.35rem',
          borderRadius: '99px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          textDecoration: 'none'
        }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            {getInitials(user.name)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
              {user.name}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {user.schoolName}
            </span>
          </div>
          <ChevronDown size={14} style={{ color: 'var(--text-muted)', marginLeft: '0.2rem' }} />
        </Link>
      </div>
    </header>
  );
}
