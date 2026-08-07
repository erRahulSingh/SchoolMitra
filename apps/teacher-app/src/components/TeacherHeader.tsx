"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Menu, X, Bell, Home, School, Calendar, FileText, 
  Award, GraduationCap, BookOpen, MessageSquare, 
  FileSpreadsheet, Settings, HelpCircle, LogOut, 
  ChevronRight, Moon, Sun 
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface TeacherHeaderProps {
  unreadCount?: number;
  title?: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export default function TeacherHeader({ unreadCount = 3, title, subtitle, rightAction }: TeacherHeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const sidebarOptions = [
    { label: "Dashboard", href: "/dashboard", icon: Home, color: "#7c3aed" },
    { label: "My Classes", href: "/classes", icon: School, color: "#3b82f6" },
    { label: "Mark Attendance", href: "/attendance", icon: Calendar, color: "#10b981" },
    { label: "Homework & Assignments", href: "/homework", icon: FileText, color: "#f59e0b" },
    { label: "Weekly Tests & Exams", href: "/weekly-test", icon: Award, color: "#ec4899" },
    { label: "Marks Entry & Gradebook", href: "/exams/marks-entry", icon: GraduationCap, color: "#06b6d4" },
    { label: "Report Cards", href: "/report-card", icon: FileSpreadsheet, color: "#10b981" },
    { label: "Study Material", href: "/study-material", icon: BookOpen, color: "#7c3aed" },
    { label: "Messages & Notices", href: "/communication/messages", icon: MessageSquare, color: "#3b82f6" },
    { label: "Leave Application", href: "/profile/leave", icon: Calendar, color: "#f59e0b" },
    { label: "Settings", href: "/settings", icon: Settings, color: "#64748b" },
    { label: "Help & Support", href: "/support", icon: HelpCircle, color: "#06b6d4" },
  ];

  return (
    <>
      {/* ════════════ CLEAN ORIGINAL HEADER BAR ════════════ */}
      <header style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 1.1rem 0.5rem 1.1rem",
        background: "transparent"
      }}>
        {/* LEFT: SIDEBAR HAMBURGER MENU + TITLE / GREETING */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button 
            type="button" 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open Sidebar Menu"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "14px",
              color: "var(--card-text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)"
            }}
          >
            <Menu size={22} strokeWidth={2.4} color="#7c3aed" />
          </button>

          {title ? (
            <div>
              <h1 style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
                {title}
              </h1>
              {subtitle && (
                <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                  {subtitle}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--card-subtext)", fontWeight: 600 }}>
                Good Morning
              </div>
              <h1 style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--card-text)", display: "flex", alignItems: "center", gap: "0.3rem", margin: "2px 0" }}>
                Rahul Sharma <span style={{ fontSize: "1.2rem" }}>👋</span>
              </h1>
            </div>
          )}
        </div>

        {/* RIGHT: CUSTOM RIGHT ACTION OR NOTIFICATION BELL */}
        {rightAction ? (
          rightAction
        ) : (
          <Link href="/communication/notifications" style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            textDecoration: "none"
          }}>
            <Bell size={20} color="var(--card-text)" strokeWidth={2.2} />
            {unreadCount > 0 && (
              <span style={{
                position: "absolute",
                top: 3,
                right: 3,
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#ef4444",
                border: "2px solid var(--card-bg)"
              }} />
            )}
          </Link>
        )}
      </header>

      {/* ════════════ SLIDE-OUT SIDEBAR DRAWER OVERLAY ════════════ */}
      {isSidebarOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex"
        }}>
          {/* Backdrop Blur */}
          <div 
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(6px)",
              transition: "opacity 0.3s ease"
            }}
          />

          {/* Drawer Content Container */}
          <div style={{
            position: "relative",
            width: "82%",
            maxWidth: "320px",
            height: "100%",
            background: "var(--card-bg)",
            color: "var(--card-text)",
            boxShadow: "10px 0 30px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
            overflowY: "auto"
          }}>
            {/* Drawer Header */}
            <div style={{
              padding: "1.5rem 1.25rem 1.25rem 1.25rem",
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              position: "relative"
            }}>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  borderRadius: "50%",
                  color: "#ffffff",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              {/* Profile Summary inside Drawer */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "#ffffff",
                  color: "#7c3aed",
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}>
                  RS
                </div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#ffffff", margin: 0 }}>
                    Rahul Sharma
                  </h3>
                  <div style={{ fontSize: "0.75rem", opacity: 0.9, fontWeight: 600, marginTop: 2 }}>
                    Mathematics Teacher
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#38bdf8", fontWeight: 800, marginTop: 3 }}>
                    TCH-2024-125
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Menu Options */}
            <div style={{ flex: 1, padding: "0.75rem 0.5rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--card-subtext)", padding: "0.5rem 0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Navigation Menu
              </div>

              {sidebarOptions.map((opt, idx) => {
                const OptIcon = opt.icon;
                return (
                  <Link
                    key={idx}
                    href={opt.href}
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                      padding: "0.75rem 0.85rem",
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textDecoration: "none",
                      color: "var(--card-text)",
                      transition: "background 0.15s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                      <div style={{
                        width: 34,
                        height: 34,
                        borderRadius: "10px",
                        background: `${opt.color}15`,
                        color: opt.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <OptIcon size={18} strokeWidth={2.2} />
                      </div>
                      <span style={{ fontSize: "0.88rem", fontWeight: 700 }}>
                        {opt.label}
                      </span>
                    </div>

                    <ChevronRight size={16} color="var(--card-subtext)" />
                  </Link>
                );
              })}

              <div style={{ height: 1, background: "var(--card-border)", margin: "0.5rem 0.5rem" }} />

              {/* Theme Switcher Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                style={{
                  padding: "0.75rem 0.85rem",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "none",
                  border: "none",
                  width: "100%",
                  color: "var(--card-text)",
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: 34,
                    height: 34,
                    borderRadius: "10px",
                    background: "rgba(124, 58, 237, 0.12)",
                    color: "#7c3aed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </div>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700 }}>
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#7c3aed" }}>
                  {theme === "dark" ? "Switch Light" : "Switch Dark"}
                </span>
              </button>

              {/* Logout */}
              <Link
                href="/login"
                onClick={() => setIsSidebarOpen(false)}
                style={{
                  padding: "0.75rem 0.85rem",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  textDecoration: "none",
                  color: "#ef4444",
                  marginTop: "0.25rem"
                }}
              >
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  background: "#fef2f2",
                  color: "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <LogOut size={18} strokeWidth={2.2} />
                </div>
                <span style={{ fontSize: "0.88rem", fontWeight: 800 }}>
                  Logout
                </span>
              </Link>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
