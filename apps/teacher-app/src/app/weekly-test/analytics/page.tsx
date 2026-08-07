"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BarChart2, ArrowLeft, TrendingUp, Users, Award, 
  Sparkles, CheckCircle2, AlertCircle 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function WeeklyTestAnalyticsPage() {
  const analytics = {
    avgScore: "19.4 / 25",
    passRate: "95.2%",
    highestScore: "25 / 25",
    lowestScore: "14 / 25",
    topRankers: [
      { rank: 1, name: "Ananya Patel", score: "25 / 25", percent: "100%" },
      { rank: 2, name: "Kavya Singh", score: "24 / 25", percent: "96.0%" },
      { rank: 3, name: "Aarav Sharma", score: "23 / 25", percent: "92.0%" }
    ],
    weakTopics: [
      { topic: "Section Formula & Ratio Division", mastery: "68%" },
      { topic: "Area of Triangle Coordinates", mastery: "74%" }
    ]
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
              Weekly Test Analytics
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Score Distribution & Concept Mastery
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
          <Link href="/weekly-test/results" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Result Entry
          </Link>
          <Link href="/weekly-test/analytics" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Analytics
          </Link>
        </div>

        {/* SUMMARY STATS GAUGE */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase" }}>CLASS AVERAGE SCORE</span>
            <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 800 }}>PASS RATE: {analytics.passRate}</span>
          </div>

          <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--primary)" }}>
            {analytics.avgScore} <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>(77.6% class performance)</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: 4 }}>
            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(16, 185, 129, 0.15)", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--success)", fontWeight: 800 }}>HIGHEST SCORE</div>
              <div style={{ fontSize: "1rem", fontWeight: 900, color: "#fff" }}>{analytics.highestScore}</div>
            </div>

            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(245, 158, 11, 0.15)", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--warning)", fontWeight 800 }}>LOWEST SCORE</div>
              <div style={{ fontSize: "1rem", fontWeight 900, color: "#fff" }}>{analytics.lowestScore}</div>
            </div>
          </div>
        </div>

        {/* TOP RANKERS SHOWCASE */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>Top Test Rankers</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {analytics.topRankers.map((tr) => (
              <div key={tr.rank} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0.85rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.03)" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>#{tr.rank} {tr.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Percentage: {tr.percent}</div>
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--success)" }}>{tr.score}</span>
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
