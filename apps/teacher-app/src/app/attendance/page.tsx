"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckSquare, Users, ArrowLeft, Check, X, Clock, 
  Sparkles, Send, CheckCircle2, MessageSquare, History, 
  Edit3, FileText, Calendar 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function MarkAttendancePage() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [notifyParents, setNotifyParents] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [students, setStudents] = useState([
    { roll: 101, name: "Aarav Sharma", status: "P" },
    { roll: 102, name: "Ananya Patel", status: "P" },
    { roll: 103, name: "Devansh Gupta", status: "A" },
    { roll: 104, name: "Ishaan Verma", status: "P" },
    { roll: 105, name: "Kavya Singh", status: "P" },
    { roll: 106, name: "Meera Reddy", status: "L" },
    { roll: 107, name: "Rohan Kapoor", status: "P" },
    { roll: 108, name: "Siddharth Joshi", status: "P" }
  ]);

  const setStudentStatus = (roll: number, status: "P" | "A" | "L") => {
    setStudents(prev => prev.map(s => s.roll === roll ? { ...s, status } : s));
  };

  const handleMarkAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, status: "P" })));
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

  const presentCount = students.filter(s => s.status === "P").length;
  const absentCount = students.filter(s => s.status === "A").length;
  const lateCount = students.filter(s => s.status === "L").length;

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
              Mark Attendance
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              1-Tap Daily Attendance Marking & WhatsApp Alert
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
          <Link href="/attendance" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
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
          <Link href="/attendance/monthly" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Monthly Overview
          </Link>
        </div>

        {/* CLASS SELECTOR & SUMMARY */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>SELECT CLASS & SECTION</label>
            <button type="button" onClick={handleMarkAllPresent} style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}>
              Mark All Present
            </button>
          </div>

          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.88rem", fontWeight: 700 }}
          >
            <option value="Class 10-A">Class 10-A (Mathematics)</option>
            <option value="Class 9-B">Class 9-B (Physics Lab)</option>
            <option value="Class 10-B">Class 10-B (Mathematics)</option>
          </select>

          {/* ATTENDANCE PILL STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginTop: 4 }}>
            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(16, 185, 129, 0.15)", textAlign: "center", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--success)" }}>PRESENT</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>{presentCount}</div>
            </div>

            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(239, 68, 68, 0.15)", textAlign: "center", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--danger)" }}>ABSENT</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>{absentCount}</div>
            </div>

            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(245, 158, 11, 0.15)", textAlign: "center", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--warning)" }}>LATE</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>{lateCount}</div>
            </div>
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
            <span>Attendance saved to database & WhatsApp alerts dispatched!</span>
          </div>
        )}

        {/* ════════════ STUDENT ROSTER LIST ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {students.map((s) => (
            <div 
              key={s.roll} 
              className="glass-card" 
              style={{ 
                padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", 
                alignItems: "center", borderRadius: "var(--radius-md)" 
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.78rem", fontWeight: 800, color: "var(--primary)"
                }}>
                  {s.roll}
                </span>

                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#ffffff" }}>{s.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Roll #{s.roll} • {selectedClass}</div>
                </div>
              </div>

              {/* P / A / L TOGGLE BUTTONS */}
              <div style={{ display: "flex", gap: "0.35rem" }}>
                <button
                  type="button"
                  onClick={() => setStudentStatus(s.roll, "P")}
                  style={{
                    padding: "0.4rem 0.65rem", borderRadius: 8, fontSize: "0.75rem", fontWeight: 900,
                    border: "none", cursor: "pointer",
                    background: s.status === "P" ? "var(--success)" : "rgba(255,255,255,0.06)",
                    color: s.status === "P" ? "#fff" : "var(--text-muted)"
                  }}
                >
                  P
                </button>

                <button
                  type="button"
                  onClick={() => setStudentStatus(s.roll, "A")}
                  style={{
                    padding: "0.4rem 0.65rem", borderRadius: 8, fontSize: "0.75rem", fontWeight: 900,
                    border: "none", cursor: "pointer",
                    background: s.status === "A" ? "var(--danger)" : "rgba(255,255,255,0.06)",
                    color: s.status === "A" ? "#fff" : "var(--text-muted)"
                  }}
                >
                  A
                </button>

                <button
                  type="button"
                  onClick={() => setStudentStatus(s.roll, "L")}
                  style={{
                    padding: "0.4rem 0.65rem", borderRadius: 8, fontSize: "0.75rem", fontWeight: 900,
                    border: "none", cursor: "pointer",
                    background: s.status === "L" ? "var(--warning)" : "rgba(255,255,255,0.06)",
                    color: s.status === "L" ? "#fff" : "var(--text-muted)"
                  }}
                >
                  L
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* WHATSAPP TOGGLE & SAVE BUTTON */}
        <form onSubmit={handleSaveAttendance} style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginTop: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input 
              type="checkbox" 
              id="notifyParents" 
              checked={notifyParents} 
              onChange={(e) => setNotifyParents(e.target.checked)} 
              style={{ width: 16, height: 16, accentColor: "var(--primary)", cursor: "pointer" }} 
            />
            <label htmlFor="notifyParents" style={{ fontSize: "0.8rem", color: "var(--text-muted)", cursor: "pointer" }}>
              Send automated WhatsApp SMS alert to absent student parents
            </label>
          </div>

          <button type="submit" className="btn-primary">
            <CheckCircle2 size={18} /> Confirm & Save Attendance
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
