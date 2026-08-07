"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  LayoutGrid, Clock, Users, BookOpen, Award, Bell, 
  Megaphone, Calendar, ArrowLeft, Check, Sparkles, Sliders, ToggleRight, ToggleLeft 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function TeacherWidgetsPage() {
  const [widgets, setWidgets] = useState([
    { id: "w1", title: "Today's Classes", icon: Clock, enabled: true, category: "Timetable", desc: "Shows next upcoming period and room number" },
    { id: "w2", title: "Today's Attendance Gauge", icon: Users, enabled: true, category: "Attendance", desc: "Real-time present vs absent ratio for Class 10-A" },
    { id: "w3", title: "Pending Homework Reviews", icon: BookOpen, enabled: true, category: "Academic", desc: "List of student homework submissions to evaluate" },
    { id: "w4", title: "Pending Marks Entry", icon: Award, enabled: true, category: "Gradebook", desc: "Unit Test & Term Exam marks upload shortcuts" },
    { id: "w5", title: "Notifications & Alerts", icon: Bell, enabled: true, category: "Alerts", desc: "Parent messages & school administrative notices" },
    { id: "w6", title: "Full Timetable Schedule", icon: Calendar, enabled: true, category: "Timetable", desc: "Full day 8-period teaching schedule grid" },
    { id: "w7", title: "Principal Announcements", icon: Megaphone, enabled: true, category: "Broadcast", desc: "Official school circulars and staff notices" }
  ]);

  const toggleWidget = (id: string) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Custom Dashboard Center
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Teacher Widgets
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Customize and re-arrange active cards on your mobile dashboard.
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

        {/* 7 WIDGET CARDS TOGGLE LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {widgets.map((w) => {
            const Icon = w.icon;

            return (
              <div 
                key={w.id} 
                className="glass-card" 
                style={{ 
                  padding: "1.1rem", display: "flex", justifyContent: "space-between", 
                  alignItems: "center", border: w.enabled ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(255, 255, 255, 0.08)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "14px",
                    background: w.enabled ? "rgba(16, 185, 129, 0.15)" : "rgba(255,255,255,0.04)",
                    color: w.enabled ? "var(--primary)" : "var(--text-muted)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <Icon size={20} />
                  </div>

                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#ffffff" }}>{w.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{w.desc}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleWidget(w.id)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: w.enabled ? "var(--success)" : "var(--text-muted)",
                    display: "flex", alignItems: "center"
                  }}
                >
                  {w.enabled ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                </button>
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
