"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BarChart2, ArrowLeft, TrendingUp, Users, Award, 
  Sparkles, CheckCircle2, AlertCircle 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ExamReportPage() {
  const report = {
    passRate: "97.6%",
    distinctionRate: "42.5%",
    classAvg: "86.4 / 100",
    toppers: [
      { rank: 1, name: "Ananya Patel", score: "383 / 400", percent: "95.75%" },
      { rank: 2, name: "Aarav Sharma", score: "370 / 400", percent: "92.50%" },
      { rank: 3, name: "Kavya Singh", score: "365 / 400", percent: "91.25%" }
    ],
    subjectAvg: [
      { subject: "Mathematics", avg: "88.2%" },
      { subject: "Physics", avg: "85.6%" },
      { subject: "Chemistry", avg: "84.0%" },
      { subject: "English", avg: "89.5%" }
    ]
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
              Exam Analytics Report
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Overall Class Performance & Subject Averages
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
          <Link href="/exams/marks-entry" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Marks Entry
          </Link>
          <Link href="/exams/grade-sheet" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Grade Sheet
          </Link>
          <Link href="/exams/publish" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Publish Result
          </Link>
          <Link href="/exams/report" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Exam Report
          </Link>
        </div>

        {/* SUMMARY GAUGE */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase" }}>CLASS PASS RATE</span>
            <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 800 }}>DISTINCTION: {report.distinctionRate}</span>
          </div>

          <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--primary)" }}>
            {report.passRate} <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>(Class Average: {report.classAvg})</span>
          </div>
        </div>

        {/* TOPPERS SHOWCASE */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>Board Exam Toppers Roster</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {report.toppers.map((t) => (
              <div key={t.rank} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0.85rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.03)" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>#{t.rank} {t.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{t.score}</div>
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--success)" }}>{t.percent}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SUBJECT-WISE AVERAGES */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>Subject-Wise Class Performance</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            {report.subjectAvg.map((sa, idx) => (
              <div key={idx} style={{ padding: "0.65rem 0.85rem", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{sa.subject}</div>
                <div style={{ fontSize: "1rem", fontWeight: 900, color: "var(--primary)", marginTop: 2 }}>{sa.avg}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
