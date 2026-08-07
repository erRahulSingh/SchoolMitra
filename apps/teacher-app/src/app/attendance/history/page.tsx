"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  History, ArrowLeft, Calendar, Download, Sparkles, 
  ChevronRight, CheckCircle2, Filter 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function AttendanceHistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState("August 2026");
  
  const historyList = [
    { id: "h1", date: "06 Aug 2026", class: "Class 10-A", present: 38, total: 42, percent: "90.4%", status: "Verified & Synced", absentList: ["Devansh Gupta", "Rohan Kapoor"] },
    { id: "h2", date: "05 Aug 2026", class: "Class 10-A", present: 40, total: 42, percent: "95.2%", status: "Verified & Synced", absentList: ["Kavya Singh"] },
    { id: "h3", date: "04 Aug 2026", class: "Class 10-A", present: 39, total: 42, percent: "92.8%", status: "Verified & Synced", absentList: ["Ishaan Verma", "Aarav Sharma"] },
    { id: "h4", date: "03 Aug 2026", class: "Class 10-A", present: 41, total: 42, percent: "97.6%", status: "Verified & Synced", absentList: ["Meera Reddy"] }
  ];

  const handleExportCSV = (date: string) => {
    const element = document.createElement("a");
    const file = new Blob([`SchoolMitra Attendance Ledger\nDate: ${date}\nClass: Class 10-A\nTotal Present: 38\nTotal Absent: 4`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Attendance_${date.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
              Attendance History
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Historical Daily Attendance Logs & Absence Ledger
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
          <Link href="/attendance/history" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            History
          </Link>
          <Link href="/attendance/edit" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Edit Attendance
          </Link>
          <Link href="/attendance/student-report" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Student Report
          </Link>
          <Link href="/attendance/monthly" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Monthly Overview
          </Link>
        </div>

        {/* MONTH SELECTOR */}
        <div className="glass-card" style={{ padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#fff" }}>FILTER MONTH</span>
            <select 
              value={selectedMonth} 
              onChange={e => setSelectedMonth(e.target.value)}
              style={{ padding: "0.4rem 0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: "0.8rem", fontWeight: 700 }}
            >
              <option value="August 2026">August 2026</option>
              <option value="July 2026">July 2026</option>
              <option value="June 2026">June 2026</option>
            </select>
          </div>
        </div>

        {/* ════════════ HISTORY LIST ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {historyList.map((h) => (
            <div key={h.id} className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  {h.date} • {h.class}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 800 }}>
                  {h.status}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#ffffff" }}>
                    {h.present} / {h.total} Present
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                    Absentees: {h.absentList.join(", ")}
                  </div>
                </div>

                <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--primary)" }}>
                  {h.percent}
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button type="button" onClick={() => handleExportCSV(h.date)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Download size={14} /> Export CSV
                </button>
                
                <Link href="/attendance/edit" style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: 800, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                  Edit Roster <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
