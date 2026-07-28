"use client";

import React, { useState } from "react";
import { 
  Bell, CheckCircle2, AlertCircle, Bus, CreditCard, 
  BookOpen, Calendar, ArrowRight, ShieldAlert, Info, ChevronRight, ArrowLeft
} from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"feed" | "details">("feed");
  const [selectedNotif, setSelectedNotif] = useState<any>(null);

  const notificationsList = [
    {
      id: 1,
      title: "🚌 Child Picked Up - Bus #DL01AB4321",
      category: "Transport",
      time: "07:35 AM",
      date: "Today",
      unread: true,
      icon: Bus,
      color: "#0284c7",
      bg: "rgba(56, 189, 248, 0.15)",
      details: "Aarav Sharma has safely boarded Bus #DL01AB4321 at Stop Sector 12. Driver Ramesh Kumar is en-route to DPS Main Campus."
    },
    {
      id: 2,
      title: "📅 Morning Attendance Marked PRESENT",
      category: "Attendance",
      time: "07:42 AM",
      date: "Today",
      unread: true,
      icon: CheckCircle2,
      color: "#059669",
      bg: "rgba(52, 211, 153, 0.15)",
      details: "Aarav Sharma was logged as PRESENT at Classroom 10-A via RFID Gate Entry at 07:42 AM."
    },
    {
      id: 3,
      title: "💰 Quarter 2 Fee Reminder Alert",
      category: "Fees",
      time: "Yesterday",
      date: "27 Aug",
      unread: false,
      icon: CreditCard,
      color: "#d97706",
      bg: "rgba(251, 191, 36, 0.15)",
      details: "Quarter 2 Tuition & Transport Fee invoice of ₹ 18,500 is due on 10 August 2026."
    }
  ];

  const handleOpenDetails = (notif: any) => {
    setSelectedNotif(notif);
    setActiveTab("details");
  };

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>Push Notifications</h2>
            <span style={{ background: "rgba(99,102,241,0.25)", color: "var(--primary)", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              2 New Unread
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Real-time FCM Alert Broadcast Stream
          </p>
        </div>

        <Bell size={24} color="var(--primary)" />
      </div>

      {/* ════════════ SCREEN 1: NOTIFICATIONS FEED ════════════ */}
      {activeTab === "feed" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {notificationsList.map((n) => (
            <div
              key={n.id}
              onClick={() => handleOpenDetails(n)}
              className="card-ui"
              style={{
                padding: "1rem 1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 12, background: n.bg,
                  display: "flex", alignItems: "center", justifyContent: "center", color: n.color
                }}>
                  <n.icon size={20} />
                </div>

                <div>
                  <div className="text-title" style={{ fontSize: "0.88rem", fontWeight: 800 }}>{n.title}</div>
                  <div className="text-muted-custom" style={{ fontSize: "0.72rem", marginTop: 2 }}>
                    {n.date} at {n.time} • <strong style={{ color: n.color }}>{n.category}</strong>
                  </div>
                </div>
              </div>

              <ChevronRight size={18} color="var(--card-subtext)" />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
