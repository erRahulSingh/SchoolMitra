"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bell, ArrowLeft, Check, Sparkles, CheckCircle2, 
  Megaphone, Calendar, Award, MessageSquare 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function TeacherNotificationsCenterPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [readIds, setReadIds] = useState<Record<string, boolean>>({});

  const notifications = [
    { id: "n101", title: "CBSE Term 1 Marks Upload SLA Extended to 15th August", category: "Principal Office", time: "Today 08:30 AM", body: "All senior class teachers are requested to complete student internal assessment marks entries before 05:00 PM today.", unread: true },
    { id: "n102", title: "Emergency Staff Meeting at 03:00 PM in Conference Room B", category: "Staff Circular", time: "Yesterday 04:15 PM", body: "Agenda: Discussion regarding upcoming Independence Day Cultural Performance & Transport Routing.", unread: true },
    { id: "n103", title: "Parent Inquiry from Mr. Rajesh Kumar (Class 10-A)", category: "Parent Message", time: "28 Jul 2026", body: "Requesting appointment regarding Mathematics unit test marks performance.", unread: true },
    { id: "n104", title: "Science Exhibition Project Submission Deadline", category: "Exam Cell", time: "25 Jul 2026", body: "Final project models to be verified by science department instructors by Friday.", unread: false }
  ];

  const handleMarkAllRead = () => {
    const newReads: Record<string, boolean> = {};
    notifications.forEach(n => newReads[n.id] = true);
    setReadIds(newReads);
  };

  const filteredNotices = notifications.filter(n => {
    if (activeTab === "principal") return n.category.includes("Principal");
    if (activeTab === "staff") return n.category.includes("Staff");
    if (activeTab === "parent") return n.category.includes("Parent");
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 11: Communication
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Notifications Center
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              System Alerts & Administrative Broadcasts
            </p>
          </div>

          <Link href="/dashboard" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 11 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/communication/messages" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Parent Messages
          </Link>
          <Link href="/communication/announcements" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Class Announcements
          </Link>
          <Link href="/communication/complaints" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Complaint Replies
          </Link>
          <Link href="/communication/notifications" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Notifications
          </Link>
        </div>

        {/* TOP ACTION BAR */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Recent Alerts</span>
          <button type="button" onClick={handleMarkAllRead} style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}>
            Mark All as Read
          </button>
        </div>

        {/* ════════════ NOTIFICATIONS LIST ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {filteredNotices.map((n) => {
            const isRead = readIds[n.id] || !n.unread;

            return (
              <div 
                key={n.id} 
                className="glass-card" 
                style={{ 
                  padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem",
                  border: isRead ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--primary)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                    {n.category}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    {n.time}
                  </span>
                </div>

                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.35 }}>
                  {n.title}
                </div>

                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                  {n.body}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
