"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award, ArrowLeft, Save, CheckCircle2, Sparkles, 
  Layers, Check 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function WeeklyTestResultsPage() {
  const [selectedTest, setSelectedTest] = useState("Weekly Test #04 (Math)");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [studentResults, setStudentResults] = useState([
    { roll: 101, name: "Aarav Sharma", score: 23, max: 25, grade: "A1" },
    { roll: 102, name: "Ananya Patel", score: 25, max: 25, grade: "A1" },
    { roll: 103, name: "Devansh Gupta", score: 17, max: 25, grade: "B1" },
    { roll: 104, name: "Ishaan Verma", score: 21, max: 25, grade: "A2" },
    { roll: 105, name: "Kavya Singh", score: 24, max: 25, grade: "A1" }
  ]);

  const handleScoreChange = (roll: number, val: string) => {
    const num = Math.min(25, Math.max(0, parseInt(val) || 0));
    setStudentResults(prev => prev.map(s => {
      if (s.roll === roll) {
        let grade = "A1";
        if (num < 23 && num >= 20) grade = "A2";
        else if (num < 20 && num >= 17) grade = "B1";
        else if (num < 17 && num >= 14) grade = "B2";
        else if (num < 14) grade = "C1";
        return { ...s, score: num, grade };
      }
      return s;
    }));
  };

  const handleSaveResults = (e: React.FormEvent) => {
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
              <Sparkles size={12} /> Module 8: Weekly Tests
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Result Entry
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Weekly Test Evaluation & Score Roster
            </p>
          </div>

          <Link href="/weekly-test" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 8 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/weekly-test" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Test List
          </Link>
          <Link href="/weekly-test/create" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Create Test
          </Link>
          <Link href="/weekly-test/questions" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Questions
          </Link>
          <Link href="/weekly-test/results" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Result Entry
          </Link>
          <Link href="/weekly-test/analytics" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Analytics
          </Link>
        </div>

        {/* SELECT TEST */}
        <div className="glass-card" style={{ padding: "1.1rem" }}>
          <label style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>SELECT WEEKLY TEST</label>
          <select 
            value={selectedTest} 
            onChange={(e) => setSelectedTest(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", fontWeight: 800 }}
          >
            <option value="Weekly Test #04 (Math)">Weekly Test #04 — Coordinate Geometry (25 Marks)</option>
            <option value="Weekly Test #03 (Math)">Weekly Test #03 — Trigonometry (25 Marks)</option>
          </select>
        </div>

        {/* SUCCESS ALERT */}
        {savedSuccess && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Weekly test results saved and calculated!</span>
          </div>
        )}

        {/* ════════════ RESULT ENTRY ROSTER ════════════ */}
        <form onSubmit={handleSaveResults} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {studentResults.map((s) => (
              <div key={s.roll} className="glass-card" style={{ padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Grade: <strong style={{ color: "var(--primary)" }}>{s.grade}</strong></div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <input 
                    type="number" 
                    value={s.score}
                    onChange={(e) => handleScoreChange(s.roll, e.target.value)}
                    style={{
                      width: 58, height: 38, borderRadius: 10, textAlign: "center",
                      background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.15)",
                      color: "#fff", fontSize: "0.95rem", fontWeight: 900, outline: "none"
                    }}
                  />
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 700 }}>/ {s.max}</span>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            <Save size={18} /> Save & Calculate Test Results
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
