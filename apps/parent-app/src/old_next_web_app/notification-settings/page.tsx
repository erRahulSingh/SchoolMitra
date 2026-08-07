"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Bell, 
  GraduationCap, 
  Receipt, 
  Bus, 
  Calendar, 
  Tag, 
  ChevronRight,
  Info
} from "lucide-react";

interface NotificationSettingsPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function NotificationSettingsPage({ language = "en", onNavigate }: NotificationSettingsPageProps) {
  
  const [settings, setSettings] = useState({
    general: true,
    academic: true,
    fees: true,
    transport: true,
    events: true,
    promotions: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsItems = [
    {
      key: "general" as const,
      title: "General Announcements",
      desc: "Receive general updates",
      icon: Bell,
      bgColor: "#f5f3ff",
      iconColor: "#4f46e5"
    },
    {
      key: "academic" as const,
      title: "Academic Updates",
      desc: "Homework, assignments, exams",
      icon: GraduationCap,
      bgColor: "#eff6ff",
      iconColor: "#2563eb"
    },
    {
      key: "fees" as const,
      title: "Fee & Payments",
      desc: "Fee due, payments, receipts",
      icon: Receipt,
      bgColor: "#f0fdf4",
      iconColor: "#16a34a"
    },
    {
      key: "transport" as const,
      title: "Transport Updates",
      desc: "Bus delay, route changes",
      icon: Bus,
      bgColor: "#ecfdf5",
      iconColor: "#059669"
    },
    {
      key: "events" as const,
      title: "Events & Activities",
      desc: "School events and activities",
      icon: Calendar,
      bgColor: "#fff5f5",
      iconColor: "#e11d48"
    },
    {
      key: "promotions" as const,
      title: "Promotions & Offers",
      desc: "Promotions and offers",
      icon: Tag,
      bgColor: "#eff6ff",
      iconColor: "#1d4ed8"
    }
  ];

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
            onClick={() => onNavigate ? onNavigate("profile") : window.history.back()}
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
            Notification Settings
          </h1>
        </div>
      </div>

      {/* ════════════ PUSH NOTIFICATIONS ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{
          fontSize: "0.95rem",
          fontWeight: 800,
          color: "#1e3a8a",
          fontFamily: "'Outfit', sans-serif",
          margin: 0
        }}>
          Push Notifications
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
          overflow: "hidden"
        }}>
          {settingsItems.map((item, idx) => {
            const IconComp = item.icon;
            const isLast = idx === settingsItems.length - 1;
            const isActive = settings[item.key];
            return (
              <div
                key={item.key}
                style={{
                  padding: "0.9rem 1.15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                  gap: "1.5rem"
                }}
              >
                {/* Left Side: Icon & Details */}
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

                {/* Right Side: Toggle Switch */}
                <div 
                  onClick={() => toggleSetting(item.key)}
                  style={{
                    width: "48px",
                    height: "26px",
                    borderRadius: "99px",
                    background: isActive ? "#1d4ed8" : "#cbd5e1",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isActive ? "flex-end" : "flex-start",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                >
                  <div style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════ QUIET HOURS ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{
          fontSize: "0.95rem",
          fontWeight: 800,
          color: "#1e3a8a",
          fontFamily: "'Outfit', sans-serif",
          margin: 0
        }}>
          Quiet Hours
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
          {/* From dial */}
          <div 
            onClick={() => alert("Select Start Time...")}
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #cbd5e1",
              padding: "0.8rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 700 }}>From</span>
              <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>10:00 PM</span>
            </div>
            <ChevronRight size={18} color="#94a3b8" />
          </div>

          {/* To dial */}
          <div 
            onClick={() => alert("Select End Time...")}
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #cbd5e1",
              padding: "0.8rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 700 }}>To</span>
              <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>06:00 AM</span>
            </div>
            <ChevronRight size={18} color="#94a3b8" />
          </div>
        </div>

        {/* Info Banner */}
        <div style={{
          background: "#eff6ff",
          borderRadius: "14px",
          border: "1px solid #bfdbfe",
          padding: "0.85rem 1rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.65rem",
          marginTop: "0.25rem"
        }}>
          <Info size={18} color="#2563eb" style={{ marginTop: "2px", flexShrink: 0 }} />
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1d4ed8", lineHeight: 1.45 }}>
            You will not receive non-urgent notifications during quiet hours.
          </span>
        </div>
      </div>

    </div>
  );
}
