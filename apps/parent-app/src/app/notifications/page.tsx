"use client";

import React, { useState } from "react";
import { 
  Bell, CheckCircle2, AlertCircle, Bus, CreditCard, 
  BookOpen, Calendar, ArrowRight, ShieldAlert, Info, ChevronRight, ArrowLeft,
  CheckCheck, Filter, Clock, Sparkles, MessageSquare
} from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"feed" | "details">("feed");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedNotif, setSelectedNotif] = useState<any>(null);

  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      title: "Child Picked Up - Bus #01",
      category: "Transport",
      time: "07:35 AM",
      date: "Today",
      unread: true,
      icon: Bus,
      color: "#06b6d4",
      bg: "rgba(6, 182, 212, 0.12)",
      details: "Aarav Sharma has safely boarded Bus #01 at Sector 12 stop. Driver Ram Singh is en-route to School Main Gate.",
      actionUrl: "/transport",
      actionLabel: "Track Live GPS"
    },
    {
      id: 2,
      title: "Morning Attendance Marked PRESENT",
      category: "Attendance",
      time: "07:42 AM",
      date: "Today",
      unread: true,
      icon: CheckCircle2,
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.12)",
      details: "Aarav Sharma was logged as PRESENT at Class 10-A via RFID Gate Entry at 07:42 AM by Class Teacher Sunita Mehta.",
      actionUrl: "/attendance",
      actionLabel: "View Attendance Log"
    },
    {
      id: 3,
      title: "Support Request REQ-2026-901 Replied",
      category: "Support",
      time: "09:30 AM",
      date: "Today",
      unread: true,
      icon: MessageSquare,
      color: "#6366f1",
      bg: "rgba(99, 102, 241, 0.12)",
      details: "Accounts Office replied to your ticket 'Fee payment receipt verification'. Official receipt attached.",
      actionUrl: "/support",
      actionLabel: "Open Ticket Thread"
    },
    {
      id: 4,
      title: "Quarter 2 Fee Invoice Generated",
      category: "Fees",
      time: "Yesterday",
      date: "27 Aug",
      unread: false,
      icon: CreditCard,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.12)",
      details: "Quarter 2 Tuition & Transport Fee invoice of ₹ 18,500 is due on 10 August 2026.",
      actionUrl: "/fees",
      actionLabel: "Pay Fee Online"
    }
  ]);

  const unreadCount = notificationsList.filter(n => n.unread).length;

  const handleOpenDetails = (notif: any) => {
    setSelectedNotif(notif);
    // Mark as read
    setNotificationsList(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
    setActiveTab("details");
  };

  const handleMarkAllRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const filteredList = notificationsList.filter(n => {
    if (categoryFilter !== "All" && n.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }}>Push Notifications</h2>
            {unreadCount > 0 && (
              <span style={{ background: "rgba(99,102,241,0.25)", color: "#6366f1", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
                {unreadCount} New Unread
              </span>
            )}
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Real-Time Push Alerts &amp; School Broadcast Stream
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            style={{ background: "rgba(99,102,241,0.15)", border: "none", color: "#6366f1", padding: "0.4rem 0.65rem", borderRadius: 10, fontSize: "0.72rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
          >
            <CheckCheck size={14} />
            <span>Mark Read</span>
          </button>
        )}
      </div>

      {/* ════════════ CATEGORY FILTER CHIPS ════════════ */}
      {activeTab === "feed" && (
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem", scrollbarWidth: "none" }}>
          {["All", "Transport", "Attendance", "Support", "Fees"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: "0.45rem 0.85rem", borderRadius: 12, fontSize: "0.75rem", fontWeight: 800,
                background: categoryFilter === cat ? "linear-gradient(135deg, #4f46e5, #06b6d4)" : "var(--btn-secondary-bg)",
                color: categoryFilter === cat ? "#ffffff" : "var(--card-subtext)",
                border: categoryFilter === cat ? "none" : "1px solid var(--border-color)",
                cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ════════════ SCREEN 1: NOTIFICATIONS FEED ════════════ */}
      {activeTab === "feed" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {filteredList.map((n) => (
            <div
              key={n.id}
              onClick={() => handleOpenDetails(n)}
              className="card-ui"
              style={{
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                position: "relative",
                borderLeft: n.unread ? `4px solid ${n.color}` : "1px solid var(--card-border)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, background: n.bg,
                  display: "flex", alignItems: "center", justifyContent: "center", color: n.color, flexShrink: 0
                }}>
                  <n.icon size={20} />
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <div className="text-title" style={{ fontSize: "0.88rem", fontWeight: 800 }}>{n.title}</div>
                    {n.unread && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1" }} />}
                  </div>
                  <div className="text-muted-custom" style={{ fontSize: "0.72rem", marginTop: 3 }}>
                    {n.date} at {n.time} &bull; <strong style={{ color: n.color }}>{n.category}</strong>
                  </div>
                </div>
              </div>

              <ChevronRight size={18} color="var(--card-subtext)" />
            </div>
          ))}
        </div>
      )}

      {/* ════════════ SCREEN 2: NOTIFICATION DETAILS MODAL ════════════ */}
      {activeTab === "details" && selectedNotif && (
        <div className="card-ui" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.85rem" }}>
            <button
              onClick={() => setActiveTab("feed")}
              style={{ background: "var(--btn-secondary-bg)", border: "none", color: "var(--text-main)", padding: "0.4rem 0.75rem", borderRadius: 10, fontSize: "0.78rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
            >
              <ArrowLeft size={16} /> Back to Feed
            </button>
            <span style={{ fontSize: "0.72rem", color: "var(--card-subtext)", fontWeight: 700 }}>{selectedNotif.date} at {selectedNotif.time}</span>
          </div>

          <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: selectedNotif.bg, color: selectedNotif.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <selectedNotif.icon size={22} />
            </div>
            <div>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: selectedNotif.color, textTransform: "uppercase" }}>{selectedNotif.category} Alert</span>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--card-text)", margin: 0, marginTop: 2 }}>{selectedNotif.title}</h3>
            </div>
          </div>

          <div className="subbox-ui" style={{ padding: "1rem", lineHeight: 1.5, fontSize: "0.85rem" }}>
            {selectedNotif.details}
          </div>

          {selectedNotif.actionLabel && (
            <a
              href={selectedNotif.actionUrl}
              style={{
                padding: "0.7rem 1.1rem", borderRadius: 12, background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
                color: "#ffffff", fontWeight: 800, fontSize: "0.82rem", textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem"
              }}
            >
              <span>{selectedNotif.actionLabel}</span>
              <ArrowRight size={16} />
            </a>
          )}
        </div>
      )}

    </div>
  );
}
