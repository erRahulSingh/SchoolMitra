"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, Clock, BookOpen, Users, CheckCircle2, 
  MapPin, CheckSquare, Sparkles, ChevronRight, Plus 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function TeacherSchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Today (Fri)");
  const [attendanceDone, setAttendanceDone] = useState<Record<string, boolean>>({
    p1: true
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Today (Fri)", "Sat"];

  const periods = [
    { id: "p1", num: "Period 1", time: "09:00 AM - 09:45 AM", subject: "Mathematics", classRoom: "Class 10-A", room: "Room #204", status: "Active Now", active: true },
    { id: "p2", num: "Period 2", time: "09:45 AM - 10:30 AM", subject: "Physics Practical Lab", classRoom: "Class 9-B", room: "Physics Lab 1", status: "Upcoming", active: false },
    { id: "p3", num: "Period 3", time: "10:45 AM - 11:30 AM", subject: "Mathematics", classRoom: "Class 10-B", room: "Room #206", status: "Upcoming", active: false },
    { id: "p4", num: "Period 4", time: "11:30 AM - 12:15 PM", subject: "Free / Grading Hour", classRoom: "Staff Room", room: "Block B", status: "Break", active: false },
    { id: "p5", num: "Period 5", time: "01:00 PM - 01:45 PM", subject: "Science (Proxy Class)", classRoom: "Class 8-C", room: "Room #102", status: "Proxy Assignment", active: false },
    { id: "p6", num: "Period 6", time: "01:45 PM - 02:30 PM", subject: "Class Teacher Assembly", classRoom: "Class 10-A", room: "Room #204", status: "Upcoming", active: false }
  ];

  const handleMarkAttendance = (id: string) => {
    setAttendanceDone(prev => ({ ...prev, [id]: true }));
    alert(`Attendance marked successfully for ${id.toUpperCase()}! 38/42 Present.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
            <Sparkles size={12} /> Today's Teaching Schedule
          </div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
            Today's Classes & Timetable
          </h1>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            6 Periods Scheduled • Class 10-A (Class Teacher)
          </p>
        </div>

        {/* DAY SELECTOR TABS */}
        <div style={{
          display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.25rem"
        }}>
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={selectedDay === day ? "btn-primary" : "btn-secondary"}
              style={{
                padding: "0.45rem 0.85rem", fontSize: "0.78rem",
                borderRadius: "var(--radius-md)", whiteSpace: "nowrap", flexShrink: 0
              }}
            >
              {day}
            </button>
          ))}
        </div>

        {/* ════════════ PERIODS TIMETABLE LIST ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {periods.map((p) => {
            const isDone = attendanceDone[p.id];

            return (
              <div 
                key={p.id} 
                className="glass-card" 
                style={{ 
                  padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.75rem",
                  border: p.active ? "2px solid var(--primary)" : "1px solid rgba(255,255,255,0.08)",
                  position: "relative"
                }}
              >
                {p.active && (
                  <span style={{
                    position: "absolute", top: 12, right: 12,
                    fontSize: "0.68rem", fontWeight: 900, color: "#ffffff",
                    background: "var(--primary-gradient)", padding: "0.2rem 0.55rem", borderRadius: "99px"
                  }}>
                    LIVE NOW
                  </span>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>
                    {p.num} • {p.time}
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#ffffff" }}>
                    {p.subject}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 700, marginTop: 2, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <MapPin size={13} /> {p.classRoom} ({p.room})
                  </div>
                </div>

                {/* PERIOD ACTION BUTTONS */}
                {p.subject !== "Free / Grading Hour" && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.65rem", display: "flex", gap: "0.5rem" }}>
                    <button
                      type="button"
                      onClick={() => handleMarkAttendance(p.id)}
                      className={isDone ? "btn-secondary" : "btn-primary"}
                      style={{ flex: 1, padding: "0.5rem 0.75rem", fontSize: "0.78rem" }}
                    >
                      <CheckSquare size={14} /> {isDone ? "Attendance Marked (38/42)" : "Mark Attendance"}
                    </button>
                  </div>
                )}
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
