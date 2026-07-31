"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Bus, 
  Clipboard, 
  Calendar, 
  ShieldAlert, 
  CheckCircle, 
  MessageSquare,
  ChevronRight
} from "lucide-react";

interface NotificationItem {
  id: number;
  category: "Alert" | "Message" | "Info";
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  icon: any;
  color: string;
  bg: string;
}

interface NotificationsPageProps {
  language?: string;
  onNavigate?: (tab: string) => void;
}

export default function NotificationsPage({ onNavigate }: NotificationsPageProps) {
  const [filterTab, setFilterTab] = useState<"All" | "Alerts" | "Messages">("All");

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      category: "Alert",
      title: "Route Change",
      desc: "Your route has been updated for tomorrow.",
      time: "09:30 AM",
      unread: true,
      icon: Bus,
      color: "#ef4444",
      bg: "#fef2f2"
    },
    {
      id: 2,
      category: "Alert",
      title: "Bus Inspection",
      desc: "Please complete bus inspection before starting trip.",
      time: "08:15 AM",
      unread: true,
      icon: Clipboard,
      color: "#f59e0b",
      bg: "#fff7ed"
    },
    {
      id: 3,
      category: "Info",
      title: "School Announcement",
      desc: "Annual day on 20 May 2025.",
      time: "Yesterday",
      unread: false,
      icon: Calendar,
      color: "#2563eb",
      bg: "#eff6ff"
    },
    {
      id: 4,
      category: "Alert",
      title: "Emergency Drill",
      desc: "Emergency drill scheduled on 18 May 2025.",
      time: "2 Days Ago",
      unread: false,
      icon: ShieldAlert,
      color: "#9333ea",
      bg: "#faf5ff"
    },
    {
      id: 5,
      category: "Info",
      title: "Trip Completed",
      desc: "You have completed Route 02 - Evening.",
      time: "2 Days Ago",
      unread: false,
      icon: CheckCircle,
      color: "#16a34a",
      bg: "#f0fdf4"
    },
    {
      id: 6,
      category: "Message",
      title: "New Message",
      desc: "You have a new message from school admin.",
      time: "3 Days Ago",
      unread: false,
      icon: MessageSquare,
      color: "#0891b2",
      bg: "#ecfeff"
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filterTab === "Alerts" && n.category !== "Alert") return false;
    if (filterTab === "Messages" && n.category !== "Message") return false;
    return true;
  });

  return (
    <div style={{
      padding: "1rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%"
    }}>

      {/* ════════════ HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("dashboard")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0" }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            Notifications
          </h1>
        </div>

        <button
          onClick={handleMarkAllRead}
          style={{ background: "none", border: "none", color: "#2563eb", fontSize: "0.78rem", fontWeight: 800, cursor: "pointer" }}
        >
          Mark all as read
        </button>
      </div>

      {/* ════════════ FILTER PILLS ROW ════════════ */}
      <div style={{ display: "flex", gap: "0.45rem" }}>
        {/* All Pill */}
        <button
          onClick={() => setFilterTab("All")}
          style={{
            flex: 1,
            padding: "0.45rem 1rem",
            borderRadius: "99px",
            border: filterTab === "All" ? "none" : "1px solid #cbd5e1",
            background: filterTab === "All" ? "#2563eb" : "#ffffff",
            color: filterTab === "All" ? "#ffffff" : "#64748b",
            fontSize: "0.74rem",
            fontWeight: 800,
            cursor: "pointer"
          }}
        >
          All
        </button>

        {/* Alerts Pill */}
        <button
          onClick={() => setFilterTab("Alerts")}
          style={{
            flex: 1,
            padding: "0.45rem 1rem",
            borderRadius: "99px",
            border: filterTab === "Alerts" ? "none" : "1px solid #cbd5e1",
            background: filterTab === "Alerts" ? "#2563eb" : "#ffffff",
            color: filterTab === "Alerts" ? "#ffffff" : "#64748b",
            fontSize: "0.74rem",
            fontWeight: 800,
            cursor: "pointer"
          }}
        >
          Alerts
        </button>

        {/* Messages Pill */}
        <button
          onClick={() => setFilterTab("Messages")}
          style={{
            flex: 1,
            padding: "0.45rem 1rem",
            borderRadius: "99px",
            border: filterTab === "Messages" ? "none" : "1px solid #cbd5e1",
            background: filterTab === "Messages" ? "#2563eb" : "#ffffff",
            color: filterTab === "Messages" ? "#ffffff" : "#64748b",
            fontSize: "0.74rem",
            fontWeight: 800,
            cursor: "pointer"
          }}
        >
          Messages
        </button>
      </div>

      {/* ════════════ NOTIFICATIONS STACK LIST ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {filteredNotifications.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "1rem 1.15rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              {/* Category circular icon box */}
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: item.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: item.color,
                flexShrink: 0
              }}>
                <item.icon size={18} strokeWidth={2.2} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>{item.title}</span>
                <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500 }}>{item.desc}</span>
              </div>
            </div>

            {/* Right side: Time indicator & status badge dot */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexShrink: 0 }}>
              <span style={{ fontSize: "0.74rem", color: "#94a3b8", fontWeight: 600 }}>{item.time}</span>
              {item.unread && (
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444" }} />
              )}
              <ChevronRight size={16} color="#cbd5e1" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
