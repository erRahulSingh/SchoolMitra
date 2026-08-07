"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Info, 
  FolderLock, 
  User, 
  CreditCard, 
  Settings, 
  ChevronRight,
  Headphones
} from "lucide-react";
import ParentSupportRequestsPage from "../support/page";

interface HelpPageProps {
  language?: string;
  onNavigate?: (tab: string) => void;
}

export default function HelpPage({ language = "en", onNavigate }: HelpPageProps) {
  const [view, setView] = useState<"topics" | "dashboard">("topics");

  const helpTopicsList = [
    { title: "Getting Started", desc: "Learn how to use the app", icon: Info, bgColor: "#f5f3ff", iconColor: "#4f46e5" },
    { title: "Using Features", desc: "Know more about features", icon: FolderLock, bgColor: "#eff6ff", iconColor: "#2563eb" },
    { title: "Account & Profile", desc: "Manage your account and profile", icon: User, bgColor: "#f0fdf4", iconColor: "#16a34a" },
    { title: "Payments & Fees", desc: "All your payment related queries", icon: CreditCard, bgColor: "#fff5f5", iconColor: "#e11d48" },
    { title: "Technical Issues", desc: "Facing technical difficulties?", icon: Settings, bgColor: "#f8fafc", iconColor: "#475569" }
  ];

  if (view === "dashboard") {
    return <ParentSupportRequestsPage onBack={() => setView("topics")} />;
  }

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%",
      width: "100%"
    }}>

      {/* ════════════ TOP HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem",
        borderBottom: "1px solid #f1f5f9"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("home") : window.history.back()}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0",
              color: "#0f172a"
            }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>

          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "'Outfit', sans-serif"
          }}>
            Help & Support
          </h1>
        </div>
      </div>

      {/* ════════════ AGENT HERO BANNER CARD ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%)",
        borderRadius: "22px",
        padding: "1.35rem 1.25rem",
        color: "#ffffff",
        boxShadow: "0 10px 25px rgba(30, 58, 138, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", maxWidth: "65%", zIndex: 2 }}>
          <span style={{ fontSize: "1.2rem", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            How can we help you?
          </span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#bfdbfe", lineHeight: 1.4 }}>
            Find answers or contact our support team for assistance.
          </span>
        </div>

        {/* Headset agent drawing SVG illustration */}
        <div style={{
          width: "75px",
          height: "75px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          zIndex: 2
        }}>
          <Headphones size={36} color="#ffffff" strokeWidth={1.8} />
        </div>
      </div>

      {/* ════════════ HELP TOPICS ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{
          fontSize: "0.95rem",
          fontWeight: 800,
          color: "#1e3a8a",
          fontFamily: "'Outfit', sans-serif",
          margin: 0
        }}>
          Help Topics
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
          overflow: "hidden"
        }}>
          {helpTopicsList.map((item, idx) => {
            const IconComp = item.icon;
            const isLast = idx === helpTopicsList.length - 1;
            return (
              <div
                key={idx}
                onClick={() => setView("dashboard")}
                style={{
                  padding: "0.95rem 1.15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                  cursor: "pointer",
                  gap: "1rem"
                }}
              >
                {/* Left side: Icon & Label details */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: item.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <IconComp size={18} color={item.iconColor} strokeWidth={2.2} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>
                      {item.desc}
                    </span>
                  </div>
                </div>

                {/* Right side: Chevron */}
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Support button */}
      <button
        onClick={() => setView("dashboard")}
        style={{
          width: "100%",
          padding: "0.9rem",
          background: "#1d4ed8",
          color: "#ffffff",
          border: "none",
          borderRadius: "12px",
          fontSize: "0.92rem",
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)"
        }}
      >
        Contact Support
      </button>

    </div>
  );
}
