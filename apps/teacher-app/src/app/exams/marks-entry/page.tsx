"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, ArrowLeft, Save, CheckCircle2, Sparkles, 
  Award, Lock 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ExamMarksEntryPage() {
  const [selectedTerm, setSelectedTerm] = useState("Mid-Term Board Exam 2026");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [studentMarks, setStudentMarks] = useState([
    { roll: 101, name: "Aarav Sharma", theory: 74, practical: 19, total: 93, grade: "A1" },
    { roll: 102, name: "Ananya Patel", theory: 78, practical: 20, total: 98, grade: "A1" },
    { roll: 103, name: "Devansh Gupta", theory: 62, practical: 16, total: 78, grade: "B1" },
    { roll: 104, name: "Ishaan Verma", theory: 68, practical: 18, total: 86, grade: "A2" },
    { roll: 105, name: "Kavya Singh", theory: 75, practical: 19, total: 94, grade: "A1" }
  ]);

  const handleTheoryChange = (roll: number, val: string) => {
    const th = Math.min(80, Math.max(0, parseInt(val) || 0));
    setStudentMarks(prev => prev.map(s => {
      if (s.roll === roll) {
        const tot = th + s.practical;
        let gr = "A1";
        if (tot < 91 && tot >= 81) gr = "A2";
        else if (tot < 81 && tot >= 71) gr = "B1";
        else if (tot < 71 && tot >= 61) gr = "B2";
        else if (tot < 61) gr = "C1";
        return { ...s, theory: th, total: tot, grade: gr };
      }
      return s;
    }));
  };

  const handlePracticalChange = (roll: number, val: string) => {
    const pr = Math.min(20, Math.max(0, parseInt(val) || 0));
    setStudentMarks(prev => prev.map(s => {
      if (s.roll === roll) {
        const tot = s.theory + pr;
        let gr = "A1";
        if (tot < 91 && tot >= 81) gr = "A2";
        else if (tot < 81 && tot >= 71) gr = "B1";
        else if (tot < 71 && tot >= 61) gr = "B2";
        else if (tot < 61) gr = "C1";
        return { ...s, practical: pr, total: tot, grade: gr };
      }
      return s;
    }));
  };

  const handleSaveMarks = (e: React.FormEvent) => {
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
              <Sparkles size={12} /> Module 9: Examinations
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              CBSE Marks Entry
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Theory (/80) & Practical (/20) Marks Roster
            </p>
          </div>

          <Link href="/exams" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 9 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/exams" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Exam Schedule
          </Link>
          <Link href="/exams/marks-entry" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Marks Entry
          </Link>
          <Link href="/exams/grade-sheet" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Grade Sheet
          </Link>
          <Link href="/exams/publish" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Publish Result
          </Link>
          <Link href="/exams/report" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Exam Report
          </Link>
        </div>

        {/* SELECT EXAM & SUBJECT */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div className="input-group">
            <label style={{ fontSize: "0.68rem" }}>EXAM TERM</label>
            <select 
              value={selectedTerm} 
              onChange={(e) => setSelectedTerm(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: "0.78rem" }}
            >
              <option value="Mid-Term Board Exam 2026">CBSE Mid-Term 2026</option>
              <option value="Annual Term Exam 2026">Annual Term 2026</option>
            </select>
          </div>

          <div className="input-group">
            <label style={{ fontSize: "0.68rem" }}>SUBJECT</label>
            <select 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: "0.78rem" }}
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
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
            <span>CBSE Exam marks saved & total grades calculated!</span>
          </div>
        )}

        {/* ════════════ MARKS ROSTER GRID ════════════ */}
        <form onSubmit={handleSaveMarks} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {studentMarks.map((s) => (
              <div key={s.roll} className="glass-card" style={{ padding: "0.85rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#ffffff" }}>Roll #{s.roll} — {s.name}</div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "var(--success)" }}>
                    Total: {s.total}/100 ({s.grade})
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <div className="input-group">
                    <label style={{ fontSize: "0.65rem" }}>THEORY (/80)</label>
                    <input 
                      type="number" 
                      value={s.theory}
                      onChange={e => handleTheoryChange(s.roll, e.target.value)}
                      style={{ padding: "0.45rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff", fontSize: "0.85rem", fontWeight: 800, textAlign: "center" }}
                    />
                  </div>

                  <div className="input-group">
                    <label style={{ fontSize: "0.65rem" }}>PRACTICAL (/20)</label>
                    <input 
                      type="number" 
                      value={s.practical}
                      onChange={e => handlePracticalChange(s.roll, e.target.value)}
                      style={{ padding: "0.45rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff", fontSize: "0.85rem", fontWeight: 800, textAlign: "center" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            <Save size={18} /> Save & Lock Term Marks
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
