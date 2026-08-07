"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, ArrowLeft, Save, CheckCircle2, Sparkles, 
  Award, Layers, Check 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function MarksEntryPage() {
  const [selectedExam, setSelectedExam] = useState("Unit Test II (Math)");
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [studentMarks, setStudentMarks] = useState([
    { roll: 101, name: "Aarav Sharma", marks: 23, max: 25, grade: "A1" },
    { roll: 102, name: "Ananya Patel", marks: 24, max: 25, grade: "A1" },
    { roll: 103, name: "Devansh Gupta", marks: 18, max: 25, grade: "B1" },
    { roll: 104, name: "Ishaan Verma", marks: 21, max: 25, grade: "A2" },
    { roll: 105, name: "Kavya Singh", marks: 25, max: 25, grade: "A1" },
    { roll: 106, name: "Meera Reddy", marks: 16, max: 25, grade: "B2" },
    { roll: 107, name: "Rohan Kapoor", status: "Absent", marks: 0, max: 25, grade: "AB" }
  ]);

  const handleMarkChange = (roll: number, val: string) => {
    const num = Math.min(25, Math.max(0, parseInt(val) || 0));
    setStudentMarks(prev => prev.map(s => {
      if (s.roll === roll) {
        let grade = "A1";
        if (num < 23 && num >= 20) grade = "A2";
        else if (num < 20 && num >= 17) grade = "B1";
        else if (num < 17 && num >= 14) grade = "B2";
        else if (num < 14) grade = "C1";
        return { ...s, marks: num, grade };
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
              <Sparkles size={12} /> Quick Action
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Marks Gradebook
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              CBSE Exam Marks Entry & Grade Calculation
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

        {/* SELECT EXAM & CLASS */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div className="input-group">
            <label>EXAMINATION / TEST</label>
            <select 
              value={selectedExam} 
              onChange={(e) => setSelectedExam(e.target.value)}
              style={{ width: "100%", padding: "0.7rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
            >
              <option value="Unit Test II (Math)">Unit Test II — Mathematics (25 Marks)</option>
              <option value="Half Yearly Exam">Half Yearly Exam — Mathematics (80 Marks)</option>
              <option value="Physics Lab Practical">Physics Lab Practical (20 Marks)</option>
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
            <span>Gradebook marks saved & calculated successfully!</span>
          </div>
        )}

        {/* ════════════ MARKS ENTRY ROSTER ════════════ */}
        <form onSubmit={handleSaveMarks} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {studentMarks.map((s) => (
              <div 
                key={s.roll} 
                className="glass-card" 
                style={{ 
                  padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", 
                  alignItems: "center" 
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
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Grade: <strong style={{ color: "var(--primary)" }}>{s.grade}</strong></div>
                  </div>
                </div>

                {/* MARKS INPUT */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <input 
                    type="number" 
                    value={s.marks}
                    onChange={(e) => handleMarkChange(s.roll, e.target.value)}
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
            <Save size={18} /> Save & Calculate Final Grades
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
