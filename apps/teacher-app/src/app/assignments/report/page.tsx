"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BarChart2, ArrowLeft, TrendingUp, Users, Award, 
  Sparkles, CheckCircle2, AlertCircle 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function AssignmentReportPage() {
  const analytics = {
    submissionRate: "83.3%",
    avgScore: "18.2 / 20",
    submitted: 35,
    pending: 7,
    topProjects: [
      { name: "Ananya Patel", title: "Solar Dual Axis Tracking System", score: "20 / 20" },
      { name: "Aarav Sharma", title: "Hydraulic Arm Renewable Energy Report", score: "19 / 20" },
      { name: "Kavya Singh", title: "Wind Turbine Electric Generator Model", score: "19 / 20" }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 6: Assignments
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Assignment Report
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Project Compliance & Rubric Scoring Metrics
            </p>
          </div>

          <Link href="/assignments" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 6 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/assignments" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Assignment List
          </Link>
          <Link href="/assignments/create" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Create Assignment
          </Link>
          <Link href="/assignments/review" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Review Submissions
          </Link>
          <Link href="/assignments/report" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Assignment Report
          </Link>
        </div>

        {/* SUMMARY STATS GAUGE */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase" }}>PROJECT COMPLETION RATE</span>
            <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 800 }}>AVG SCORE: {analytics.avgScore}</span>
          </div>

          <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--primary)" }}>
            {analytics.submissionRate} <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>({analytics.submitted} / 42 Projects Turned In)</span>
          </div>

          <div style={{ width: "100%", height: 10, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <div style={{ width: analytics.submissionRate, height: "100%", background: "var(--primary-gradient)", borderRadius: 99 }} />
          </div>
        </div>

        {/* TOP PROJECTS SHOWCASE */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>Top Rated Projects</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {analytics.topProjects.map((tp, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0.85rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.03)" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>#{idx + 1} {tp.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{tp.title}</div>
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--success)" }}>{tp.score}</span>
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
