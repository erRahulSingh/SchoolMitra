"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Edit3, ArrowLeft, Calendar, Save, CheckCircle2, 
  Sparkles, AlertCircle, RefreshCw 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function EditAttendancePage() {
  const [selectedDate, setSelectedDate] = useState("2026-08-05");
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [students, setStudents] = useState([
    { roll: 101, name: "Aarav Sharma", status: "P", reason: "" },
    { roll: 102, name: "Ananya Patel", status: "P", reason: "" },
    { roll: 103, name: "Devansh Gupta", status: "A", reason: "Medical Leave Approved" },
    { roll: 104, name: "Ishaan Verma", status: "P", reason: "" },
    { roll: 105, name: "Kavya Singh", status: "L", reason: "Bus delayed by 15 mins" }
  ]);

  const setStudentStatus = (roll: number, status: "P" | "A" | "L") => {
    setStudents(prev => prev.map(s => s.roll === roll ? { ...s, status } : s));
  };

  const handleReasonChange = (roll: number, reason: string) => {
    setStudents(prev => prev.map(s => s.roll === roll ? { ...s, reason } : s));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
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
              Edit Attendance Record
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Modify Past Attendance & Attach Approval Notes
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
          <Link href="/attendance/edit" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Edit Attendance
          </Link>
          <Link href="/attendance/student-report" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Student Report
          </Link>
          <Link href="/attendance/monthly" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Monthly Overview
          </Link>
        </div>

        {/* SELECT DATE & CLASS */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div className="input-group">
            <label>SELECT DATE</label>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={e => setSelectedDate(e.target.value)} 
              className="input-field" 
              style={{ paddingLeft: "0.75rem" }}
            />
          </div>

          <div className="input-group">
            <label>CLASS</label>
            <select 
              value={selectedClass} 
              onChange={e => setSelectedClass(e.target.value)} 
              className="input-field" 
              style={{ paddingLeft: "0.75rem" }}
            >
              <option value="Class 10-A">Class 10-A</option>
              <option value="Class 9-B">Class 9-B</option>
            </select>
          </div>
        </div>

        {/* SUCCESS ALERT */}
        {savedSuccess && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Attendance record updated in database with audit note!</span>
          </div>
        )}

        {/* ════════════ EDIT ROSTER FORM ════════════ */}
        <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {students.map((s) => (
            <div key={s.roll} className="glass-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#ffffff" }}>Roll #{s.roll} — {s.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Current Status: <strong style={{ color: "var(--primary)" }}>{s.status === 'P' ? 'Present' : s.status === 'A' ? 'Absent' : 'Late'}</strong></div>
                </div>

                <div style={{ display: "flex", gap: "0.35rem" }}>
                  <button
                    type="button"
                    onClick={() => setStudentStatus(s.roll, "P")}
                    style={{
                      padding: "0.35rem 0.65rem", borderRadius: 8, fontSize: "0.75rem", fontWeight: 900, border: "none", cursor: "pointer",
                      background: s.status === "P" ? "var(--success)" : "rgba(255,255,255,0.06)", color: s.status === "P" ? "#fff" : "var(--text-muted)"
                    }}
                  >
                    P
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentStatus(s.roll, "A")}
                    style={{
                      padding: "0.35rem 0.65rem", borderRadius: 8, fontSize: "0.75rem", fontWeight: 900, border: "none", cursor: "pointer",
                      background: s.status === "A" ? "var(--danger)" : "rgba(255,255,255,0.06)", color: s.status === "A" ? "#fff" : "var(--text-muted)"
                    }}
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentStatus(s.roll, "L")}
                    style={{
                      padding: "0.35rem 0.65rem", borderRadius: 8, fontSize: "0.75rem", fontWeight: 900, border: "none", cursor: "pointer",
                      background: s.status === "L" ? "var(--warning)" : "rgba(255,255,255,0.06)", color: s.status === "L" ? "#fff" : "var(--text-muted)"
                    }}
                  >
                    L
                  </button>
                </div>
              </div>

              <input 
                type="text" 
                value={s.reason} 
                onChange={e => handleReasonChange(s.roll, e.target.value)} 
                placeholder="Reason note for correction (optional)..." 
                style={{ width: "100%", padding: "0.55rem 0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: "0.78rem" }}
              />
            </div>
          ))}

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            <Save size={18} /> Save Attendance Corrections
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
