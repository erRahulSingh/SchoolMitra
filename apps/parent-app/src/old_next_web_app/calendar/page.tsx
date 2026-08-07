"use client";

import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, Clock, MapPin, Download, 
  Sparkles, CheckCircle2, Star, Info, ArrowLeft, Plus
} from "lucide-react";

export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "details">("calendar");

  const eventsList = [
    {
      id: 1,
      title: "Science & Innovation Fair 2026",
      date: "18 Aug 2026",
      time: "09:00 AM - 02:00 PM",
      location: "Main School Auditorium",
      category: "Academic Exhibition",
      color: "#0284c7",
      bg: "rgba(56, 189, 248, 0.15)",
      description: "Annual STEM exhibition featuring 120 student science projects and robotics models."
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting (Term 1 Review)",
      date: "24 Aug 2026",
      time: "08:30 AM - 12:30 PM",
      location: "Classroom 10-A",
      category: "Parent Meeting",
      color: "#059669",
      bg: "rgba(52, 211, 153, 0.15)",
      description: "One-on-one progress discussion with Class Teacher Sunita Mehta."
    }
  ];

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
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>School Calendar</h2>
            <span style={{ background: "rgba(56,189,248,0.2)", color: "#0284c7", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              Academic 2026
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Events • Holidays • PTM Meetings
          </p>
        </div>

        <CalendarIcon size={24} color="#0284c7" />
      </div>

      {/* ════════════ EVENTS LIST ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {eventsList.map((ev) => (
          <div key={ev.id} className="card-ui" style={{ padding: "1rem 1.1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ background: ev.bg, borderRadius: 14, padding: "0.6rem 0.85rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 900, color: ev.color }}>{ev.date.split(" ")[0]}</div>
                <div style={{ fontSize: "0.68rem", fontWeight: 800, color: ev.color }}>{ev.date.split(" ")[1]}</div>
              </div>

              <div>
                <div className="text-title" style={{ fontSize: "0.88rem", fontWeight: 800 }}>{ev.title}</div>
                <div className="text-muted-custom" style={{ fontSize: "0.72rem", marginTop: 2 }}>{ev.time} • {ev.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
