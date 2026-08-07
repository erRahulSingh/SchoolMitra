"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, ArrowLeft, Users, Calendar, Award, 
  Sparkles, CheckCircle2, AlertCircle, MessageSquare 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function StudentAttendanceReportPage() {
  const [selectedStudent, setSelectedStudent] = useState("101");

  const students = [
    { id: "101", roll: 101, name: "Aarav Sharma", class: "Class 10-A", percent: "96.5%", present: 180, absent: 5, late: 2, streak: "14 Days" },
    { id: "102", roll: 102, name: "Ananya Patel", class: "Class 10-A", percent: "94.2%", present: 175, absent: 8, late: 4, streak: "8 Days" },
    { id: "103", roll: 103, name: "Devansh Gupta", class: "Class 10-A", percent: "81.0%", present: 150, absent: 25, late: 12, streak: "0 Days" }
  ];

  const current = students.find(s => s.id === selectedStudent) || students[0];

  const timeline = [
    { date: "06 Aug 2026", status: "Present", remark: "On Time (07:35 AM)" },
    { date: "05 Aug 2026", status: "Present", remark: "On Time (07:32 AM)" },
    { date: "04 Aug 2026", status: "Absent", remark: "WhatsApp Notification Sent to Parent" },
    { date: "03 Aug 2026", status: "Present", remark: "On Time (07:38 AM)" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 4: Attendance
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Student Attendance Report
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Individual Student Analytics & Streak Tracking
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

        {/* MODULE 4 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/attendance" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Mark Attendance
          </Link>
          <Link href="/attendance/history" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            History
          </Link>
          <Link href="/attendance/edit" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Edit Attendance
          </Link>
          <Link href="/attendance/student-report" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Student Report
          </Link>
          <Link href="/attendance/monthly" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Monthly Overview
          </Link>
        </div>

        {/* SELECT STUDENT */}
        <div className="glass-card" style={{ padding: "1.1rem" }}>
          <label style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>SELECT STUDENT</label>
          <select 
            value={selectedStudent} 
            onChange={e => setSelectedStudent(e.target.value)} 
            style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.88rem", fontWeight: 800 }}
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                Roll #{s.roll} — {s.name} ({s.percent})
              </option>
            ))}
          </select>
        </div>

        {/* ════════════ STUDENT STATS GAUGE CARD ════════════ */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#ffffff" }}>{current.name}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Roll #{current.roll} • {current.class}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--primary)" }}>{current.percent}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 800 }}>ATTENDANCE</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.4rem" }}>
            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>PRESENT</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--success)" }}>{current.present}</div>
            </div>

            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>ABSENT</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--danger)" }}>{current.absent}</div>
            </div>

            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>LATE</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--warning)" }}>{current.late}</div>
            </div>

            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>STREAK</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--primary)" }}>{current.streak}</div>
            </div>
          </div>
        </div>

        {/* ════════════ DAY-BY-DAY TIMELINE ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#ffffff" }}>Attendance Timeline</h3>
          {timeline.map((t, idx) => (
            <div key={idx} className="glass-card" style={{ padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#ffffff" }}>{t.date}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{t.remark}</div>
              </div>

              <span style={{
                fontSize: "0.75rem", fontWeight: 900,
                color: t.status === "Present" ? "var(--success)" : "var(--danger)",
                background: t.status === "Present" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                padding: "0.25rem 0.6rem", borderRadius: 6
              }}>
                {t.status}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
