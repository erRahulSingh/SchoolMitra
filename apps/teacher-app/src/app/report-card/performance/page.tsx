"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award, ArrowLeft, TrendingUp, Users, Sparkles, 
  CheckCircle2, BookOpen, Star 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function StudentPerformancePage() {
  const [selectedStudent, setSelectedStudent] = useState("101");

  const students = [
    { id: "101", roll: 101, name: "Aarav Sharma", class: "Class 10-A", rank: "#2 in Class", gpa: "92.5%", attendance: "96.5%", math: 93, sci: 95, sst: 90, eng: 92 },
    { id: "102", roll: 102, name: "Ananya Patel", class: "Class 10-A", rank: "#1 in Class (Topper)", gpa: "95.75%", attendance: "94.2%", math: 98, sci: 96, sst: 94, eng: 95 }
  ];

  const current = students.find(s => s.id === selectedStudent) || students[0];

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
              Student Performance
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Individual Subject Marks & Rank Analysis
            </p>
          </div>

          <Link href="/report-card" style={{
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
          <Link href="/report-card" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Report Generator
          </Link>
          <Link href="/report-card/performance" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Student Performance
          </Link>
          <Link href="/report-card/preview" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Report Preview
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
                Roll #{s.roll} — {s.name} ({s.gpa})
              </option>
            ))}
          </select>
        </div>

        {/* PERFORMANCE CARD GAUGE */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#ffffff" }}>{current.name}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Roll #{current.roll} • {current.class}</div>
            </div>

            <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.25rem 0.6rem", borderRadius: 6 }}>
              {current.rank}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: 4 }}>
            <div style={{ padding: "0.6rem", borderRadius: 8, background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>AGGREGATE PERCENTAGE</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--primary)" }}>{current.gpa}</div>
            </div>

            <div style={{ padding: "0.6rem", borderRadius: 8, background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>ATTENDANCE RATE</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--success)" }}>{current.attendance}</div>
            </div>
          </div>
        </div>

        {/* SUBJECT BREAKDOWN CARDS */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff" }}>Subject Marks Breakdown</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <div style={{ padding: "0.65rem 0.85rem", borderRadius: 8, background: "rgba(255,255,255,0.03)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Mathematics</span>
              <strong style={{ fontSize: "0.88rem", color: "#fff" }}>{current.math}/100</strong>
            </div>

            <div style={{ padding: "0.65rem 0.85rem", borderRadius: 8, background: "rgba(255,255,255,0.03)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Science</span>
              <strong style={{ fontSize: "0.88rem", color: "#fff" }}>{current.sci}/100</strong>
            </div>

            <div style={{ padding: "0.65rem 0.85rem", borderRadius: 8, background: "rgba(255,255,255,0.03)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Social Studies</span>
              <strong style={{ fontSize: "0.88rem", color: "#fff" }}>{current.sst}/100</strong>
            </div>

            <div style={{ padding: "0.65rem 0.85rem", borderRadius: 8, background: "rgba(255,255,255,0.03)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>English</span>
              <strong style={{ fontSize: "0.88rem", color: "#fff" }}>{current.eng}/100</strong>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
