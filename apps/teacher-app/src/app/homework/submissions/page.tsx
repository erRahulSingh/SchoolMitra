"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, ArrowLeft, Save, CheckCircle2, Sparkles, 
  Download, Eye, Send, Clock, AlertCircle, Check 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function HomeworkSubmissionsPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [submissions, setSubmissions] = useState([
    { roll: 101, name: "Aarav Sharma", status: "Submitted", file: "aarav_math_hw.pdf", date: "05 Aug 09:30 PM", grade: "9", max: "10", feedback: "Excellent formula proofs!" },
    { roll: 102, name: "Ananya Patel", status: "Submitted", file: "ananya_hw.jpg", date: "06 Aug 07:15 AM", grade: "10", max: "10", feedback: "Flawless step-by-step working" },
    { roll: 103, name: "Devansh Gupta", status: "Overdue", file: "No File", date: "Pending", grade: "0", max: "10", feedback: "Assignment pending" },
    { roll: 104, name: "Ishaan Verma", status: "Submitted", file: "ishaan_hw.pdf", date: "06 Aug 10:45 AM", grade: "8", max: "10", feedback: "Good effort" },
    { roll: 105, name: "Kavya Singh", status: "Submitted", file: "kavya_math.pdf", date: "06 Aug 11:20 AM", grade: "9", max: "10", feedback: "Very neat solution" }
  ]);

  const handleGradeChange = (roll: number, val: string) => {
    setSubmissions(prev => prev.map(s => s.roll === roll ? { ...s, grade: val } : s));
  };

  const handleFeedbackChange = (roll: number, val: string) => {
    setSubmissions(prev => prev.map(s => s.roll === roll ? { ...s, feedback: val } : s));
  };

  const handleSaveGrades = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const submittedCount = submissions.filter(s => s.status === "Submitted").length;
  const pendingCount = submissions.filter(s => s.status === "Overdue").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 5: Homework
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Homework Submissions
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Student Submissions & Evaluation Roster
            </p>
          </div>

          <Link href="/homework" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 5 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/homework" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Homework List
          </Link>
          <Link href="/homework/create" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Create Homework
          </Link>
          <Link href="/homework/details" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Details
          </Link>
          <Link href="/homework/submissions" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Submissions
          </Link>
          <Link href="/homework/analytics" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Analytics
          </Link>
        </div>

        {/* SUBMISSION STATS PILLS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div className="glass-card" style={{ padding: "0.85rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>SUBMITTED</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--success)" }}>{submittedCount} Students</div>
          </div>

          <div className="glass-card" style={{ padding: "0.85rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>OVERDUE / PENDING</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--warning)" }}>{pendingCount} Students</div>
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
            <span>Homework grades & teacher remarks saved to database!</span>
          </div>
        )}

        {/* ════════════ SUBMISSIONS ROSTER ════════════ */}
        <form onSubmit={handleSaveGrades} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {submissions.map((s) => (
            <div key={s.roll} className="glass-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#ffffff" }}>Roll #{s.roll} — {s.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Submitted: {s.date}</div>
                </div>

                <span style={{
                  fontSize: "0.72rem", fontWeight: 800,
                  color: s.status === "Submitted" ? "var(--success)" : "var(--danger)",
                  background: s.status === "Submitted" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                  padding: "0.2rem 0.55rem", borderRadius: 6
                }}>
                  {s.status}
                </span>
              </div>

              {s.status === "Submitted" ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.4rem 0.65rem", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700 }}>📄 {s.file}</span>
                    <button type="button" style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.72rem", cursor: "pointer" }}>
                      Preview File
                    </button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem" }}>
                    <div className="input-group">
                      <label style={{ fontSize: "0.68rem" }}>GRADE MARKS (/10)</label>
                      <input 
                        type="number" 
                        value={s.grade}
                        onChange={e => handleGradeChange(s.roll, e.target.value)}
                        style={{ padding: "0.45rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff", fontSize: "0.85rem", fontWeight: 800, textAlign: "center" }}
                      />
                    </div>

                    <div className="input-group">
                      <label style={{ fontSize: "0.68rem" }}>TEACHER REMARK</label>
                      <input 
                        type="text" 
                        value={s.feedback}
                        onChange={e => handleFeedbackChange(s.roll, e.target.value)}
                        style={{ padding: "0.45rem 0.65rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: "0.78rem" }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: "0.75rem", color: "var(--warning)", fontStyle: "italic" }}>
                  Student has not submitted homework worksheet yet.
                </div>
              )}
            </div>
          ))}

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            <Save size={18} /> Save Evaluation & Grades
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
