"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  MoreVertical, 
  Bus, 
  CreditCard, 
  Calendar, 
  Users, 
  BookOpen 
} from "lucide-react";

interface NotificationItem {
  id: number;
  title: string;
  body: string;
  category: "Transport" | "Alerts" | "Academics";
  time: string;
  unread: boolean;
  icon: React.ComponentType<any>;
  iconColor: string;
  iconBg: string;
}

export default function NotificationsPage({ 
  language = "en", 
  onNavigate 
}: { 
  language?: string; 
  onNavigate?: (tab: string) => void; 
}) {
  const [filter, setFilter] = useState<"All" | "Alerts" | "Transport" | "Academics">("All");
  const [showOptions, setShowOptions] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "Bus Delay Alert",
      body: "Bus No. UP32 AB 1234 is delayed by 10 minutes today.",
      category: "Transport",
      time: "10:15 AM",
      unread: true,
      icon: Bus,
      iconColor: "#dc2626",
      iconBg: "#fee2e2"
    },
    {
      id: 2,
      title: "Fee Reminder",
      body: "Your May month fee is due. Please pay to avoid late fee.",
      category: "Alerts",
      time: "Yesterday",
      unread: true,
      icon: CreditCard,
      iconColor: "#ea580c",
      iconBg: "#ffedd5"
    },
    {
      id: 3,
      title: "Holiday Notice",
      body: "School will remain closed on 15th May 2025.",
      category: "Alerts",
      time: "2 May",
      unread: true,
      icon: Calendar,
      iconColor: "#16a34a",
      iconBg: "#dcfce7"
    },
    {
      id: 4,
      title: "PTM Schedule",
      body: "PTM is scheduled on 20th May 2025.",
      category: "Academics",
      time: "28 Apr",
      unread: true,
      icon: Users,
      iconColor: "#9333ea",
      iconBg: "#f3e8ff"
    },
    {
      id: 5,
      title: "New Assignment",
      body: "New Mathematics assignment has been posted.",
      category: "Academics",
      time: "25 Apr",
      unread: true,
      icon: BookOpen,
      iconColor: "#2563eb",
      iconBg: "#e0f2fe"
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setShowOptions(false);
  };

  const handleItemClick = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const filteredNotifs = notifications.filter(n => {
    if (filter === "All") return true;
    return n.category === filter;
  });

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
        borderBottom: "1px solid #f1f5f9",
        position: "relative"
      }}>
        {/* Left Side: Back Arrow + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("home") : window.history.back()}
            aria-label="Go Back"
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
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.015em"
          }}>
            Notifications
          </h1>
        </div>

        {/* Right Side: Options Icon */}
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          aria-label="More options"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.2rem"
          }}
        >
          <MoreVertical size={22} color="#0f172a" strokeWidth={2} />
        </button>

        {/* Options Popover */}
        {showOptions && (
          <div style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(15,23,42,0.06)",
            zIndex: 30,
            minWidth: "140px"
          }}>
            <button
              onClick={handleMarkAllRead}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                textAlign: "left",
                padding: "0.65rem 0.85rem",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#1d4ed8",
                cursor: "pointer"
              }}
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>

      {/* ════════════ CATEGORY FILTER TABS ════════════ */}
      <div style={{
        display: "flex",
        background: "#e2e8f0",
        borderRadius: "14px",
        padding: "0.25rem",
        gap: "0.25rem",
        marginTop: "-0.25rem"
      }}>
        {["All", "Alerts", "Transport", "Academics"].map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              style={{
                flex: 1,
                padding: "0.6rem 0.4rem",
                borderRadius: "10px",
                border: "none",
                background: isActive ? "#3b82f6" : "transparent",
                color: isActive ? "#ffffff" : "#475569",
                fontWeight: 800,
                fontSize: "0.78rem",
                cursor: "pointer",
                boxShadow: isActive ? "0 2px 8px rgba(59, 130, 246, 0.15)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ════════════ NOTIFICATIONS LIST ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {filteredNotifs.length === 0 ? (
          <div style={{
            padding: "3rem 1rem",
            textAlign: "center",
            background: "#ffffff",
            borderRadius: "20px",
            color: "#64748b",
            fontSize: "0.88rem",
            border: "1px solid #e2e8f0"
          }}>
            No notifications in this category.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {filteredNotifs.map((n) => {
              const IconComp = n.icon;
              return (
                <div
                  key={n.id}
                  onClick={() => handleItemClick(n.id)}
                  style={{
                    background: "#ffffff",
                    borderRadius: "20px",
                    padding: "1rem 1.1rem",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.15s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {/* Circle Icon Container */}
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: n.iconBg,
                      color: n.iconColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <IconComp size={22} strokeWidth={2.2} />
                    </div>

                    {/* Text Details */}
                    <div>
                      <h3 style={{
                        fontSize: "0.92rem",
                        fontWeight: 800,
                        color: "#0f172a",
                        margin: 0
                      }}>
                        {n.title}
                      </h3>
                      <p style={{
                        fontSize: "0.82rem",
                        color: "#475569",
                        fontWeight: 500,
                        margin: "4px 0 0 0",
                        lineHeight: 1.45
                      }}>
                        {n.body}
                      </p>
                      <span style={{
                        fontSize: "0.72rem",
                        color: "#94a3b8",
                        fontWeight: 600,
                        display: "block",
                        marginTop: "5px"
                      }}>
                        {n.time}
                      </span>
                    </div>
                  </div>

                  {/* Unread Red Dot */}
                  {n.unread && (
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#ef4444",
                      flexShrink: 0,
                      marginLeft: "10px"
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
