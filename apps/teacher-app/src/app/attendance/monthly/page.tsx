"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, ArrowLeft, ChevronLeft, ChevronRight, 
  Sparkles, CheckCircle2, Award, Users 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function MonthlyAttendancePage() {
  const [currentMonth, setCurrentMonth] = useState("August 2026");

  // Mock Calendar Days for August 2026 (31 Days)
  const calendarDays = [
    { day: 1, status: "green", percent: "95%" },
    { day: 2, status: "sun", percent: "Sunday" },
    { day: 3, status: "green", percent: "92%" },
    { day: 4, status: "green", percent: "94%" },
    { day: 5, status: "green", percent: "95%" },
    { day: 6, status: "green", percent: "90%" },
    { day: 7, status: "yellow", percent: "88%" },
    { day: 8, status: "green", percent: "96%" },
    { day: 9, status: "sun", percent: "Sunday" },
    { day: 10, status: "green", percent: "98%" },
    { day: 11, status: "green", percent: "91%" },
    { day: 12, status: "green", percent: "94%" },
    { day: 13, status: "green", percent: "95%" },
    { day: 14, status: "yellow", percent: "85%" },
    { day: 15, status: "holiday", percent: "Independence Day" },
    { day: 16, status: "sun", percent: "Sunday" },
    { day: 17, status: "green", percent: "93%" },
    { day: 18, status: "green", percent: "97%" },
    { day: 19, status: "green", percent: "90%" },
    { day: 20, status: "green", percent: "94%" },
    { day: 21, status: "green", percent: "95%" },
    { day: 22, status: "green", percent: "92%" },
    { day: 23, status: "sun", percent: "Sunday" },
    { day: 24, status: "green", percent: "96%" },
    { day: 25, status: "green", percent: "94%" },
    { day: 26, status: "green", percent: "91%" },
    { day: 27, status: "green", percent: "95%" },
    { day: 28, status: "green", percent: "93%" },
    { day: 29, status: "green", percent: "92%" },
    { day: 30, status: "sun", percent: "Sunday" },
    { day: 31, status: "green", percent: "96%" }
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
              Monthly Attendance
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Month Calendar Grid & Class Aggregate Rates
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
          <Link href="/attendance/student-report" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Student Report
          </Link>
          <Link href="/attendance/monthly" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Monthly Overview
          </Link>
        </div>

        {/* MONTHLY SUMMARY STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
          <div className="glass-card" style={{ padding: "0.75rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>TOTAL DAYS</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--primary)" }}>24 Days</div>
          </div>

          <div className="glass-card" style={{ padding: "0.75rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>AVG RATE</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--success)" }}>93.4%</div>
          </div>

          <div className="glass-card" style={{ padding: "0.75rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>HOLIDAYS</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--secondary)" }}>6 Days</div>
          </div>
        </div>

        {/* ════════════ MONTH CALENDAR GRID ════════════ */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button type="button" style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>
              <ChevronLeft size={20} />
            </button>
            <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "#ffffff" }}>{currentMonth}</span>
            <button type="button" style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* WEEKDAY HEADERS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.3rem", textAlign: "center", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)" }}>
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>

          {/* CALENDAR DAYS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.35rem" }}>
            {calendarDays.map((d) => {
              let bg = "rgba(16, 185, 129, 0.2)";
              let border = "rgba(16, 185, 129, 0.4)";
              let color = "#6ee7b7";

              if (d.status === "yellow") {
                bg = "rgba(245, 158, 11, 0.2)";
                border = "rgba(245, 158, 11, 0.4)";
                color = "#fcd34d";
              } else if (d.status === "sun") {
                bg = "rgba(255, 255, 255, 0.04)";
                border = "rgba(255, 255, 255, 0.08)";
                color = "var(--text-muted)";
              } else if (d.status === "holiday") {
                bg = "rgba(99, 102, 241, 0.25)";
                border = "rgba(99, 102, 241, 0.5)";
                color = "#a5b4fc";
              }

              return (
                <div 
                  key={d.day} 
                  style={{
                    padding: "0.5rem 0.2rem", borderRadius: 8, background: bg, border: `1px solid ${border}`,
                    textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center"
                  }}
                >
                  <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#ffffff" }}>{d.day}</span>
                  <span style={{ fontSize: "0.58rem", fontWeight: 700, color, marginTop: 1 }}>
                    {d.status === "sun" ? "SUN" : d.status === "holiday" ? "HOL" : d.percent}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
