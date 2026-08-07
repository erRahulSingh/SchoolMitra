"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Layers, ArrowLeft, Download, Send, CheckCircle2, 
  Sparkles, Award, Star, User, BookOpen, RefreshCw 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ReportCardGeneratorPage() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [selectedTerm, setSelectedTerm] = useState("Mid-Term Board Exam 2026");
  const [generated, setGenerated] = useState(false);

  const students = [
    { id: "101", roll: 101, name: "Aarav Sharma", gpa: "92.5%", grade: "A1 (Distinction)", status: "Ready to Publish" },
    { id: "102", roll: 102, name: "Ananya Patel", gpa: "95.7%", grade: "A1 (Topper)", status: "Ready to Publish" },
    { id: "103", roll: 103, name: "Devansh Gupta", gpa: "80.2%", grade: "A2", status: "Pending Remarks" }
  ];

  const handleGenerateAll = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
    setTimeout(() => setGenerated(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 10: Report Cards
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Report Card Generator
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Automated CBSE 360° Report Card Compilation
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

        {/* MODULE 10 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/report-card" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Report Generator
          </Link>
          <Link href="/report-card/performance" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Student Performance
          </Link>
          <Link href="/report-card/preview" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Report Preview
          </Link>
        </div>

        {/* GENERATOR CONFIG */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div className="input-group">
            <label style={{ fontSize: "0.68rem" }}>TARGET CLASS</label>
            <select 
              value={selectedClass} 
              onChange={e => setSelectedClass(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: "0.78rem", fontWeight: 800 }}
            >
              <option value="Class 10-A">Class 10-A</option>
              <option value="Class 9-B">Class 9-B</option>
            </select>
          </div>

          <div className="input-group">
            <label style={{ fontSize: "0.68rem" }}>EXAM TERM</label>
            <select 
              value={selectedTerm} 
              onChange={e => setSelectedTerm(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: "0.78rem", fontWeight: 800 }}
            >
              <option value="Mid-Term Board Exam 2026">Mid-Term 2026</option>
            </select>
          </div>
        </div>

        {/* SUCCESS ALERT */}
        {generated && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Report cards compiled for all 42 students in Class 10-A!</span>
          </div>
        )}

        {/* ════════════ REPORT CARDS LIST ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {students.map((s) => (
            <div key={s.id} className="glass-card" style={{ padding: "1.1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>Roll #{s.roll} — {s.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, marginTop: 2 }}>{s.gpa} • {s.grade}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--success)" }}>{s.status}</span>
                <Link href="/report-card/preview" style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 800, textDecoration: "none" }}>
                  Preview Card
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button type="button" onClick={handleGenerateAll} className="btn-primary">
          <RefreshCw size={18} /> Batch Generate Class Report Cards
        </button>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
