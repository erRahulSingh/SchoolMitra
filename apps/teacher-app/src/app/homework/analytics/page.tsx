"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BarChart2, ArrowLeft, TrendingUp, Users, Award, 
  Sparkles, CheckCircle2, AlertCircle, Clock 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function HomeworkAnalyticsPage() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");

  const analytics = {
    submissionRate: "78.5%",
    onTime: 32,
    late: 4,
    pending: 6,
    avgScore: "8.4 / 10",
    topPerformers: [
      { name: "Ananya Patel", score: "10 / 10", streak: "5 Assignments" },
      { name: "Aarav Sharma", score: "9.5 / 10", streak: "4 Assignments" },
      { name: "Kavya Singh", score: "9.0 / 10", streak: "4 Assignments" }
    ],
    needsHelp: [
      { name: "Devansh Gupta", pendingCount: 3, lastSub: "25 Jul" },
      { name: "Rohan Kapoor", pendingCount: 2, lastSub: "01 Aug" }
    ]
  };

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
              Homework Analytics
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Submission Compliance & Grade Performance Insights
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
          <Link href="/homework/submissions" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Submissions
          </Link>
          <Link href="/homework/analytics" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Analytics
          </Link>
        </div>

        {/* SUMMARY STATS GAUGE */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase" }}>SUBMISSION RATE</span>
            <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 800 }}>CLASS AVERAGE: {analytics.avgScore}</span>
          </div>

          <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--primary)" }}>
            {analytics.submissionRate} <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>completion across 42 students</span>
          </div>

          <div style={{ width: "100%", height: 10, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <div style={{ width: analytics.submissionRate, height: "100%", background: "var(--primary-gradient)", borderRadius: 99 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginTop: 4 }}>
            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(16, 185, 129, 0.15)", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--success)", fontWeight: 800 }}>ON TIME</div>
              <div style={{ fontSize: "1rem", fontWeight: 900, color: "#fff" }}>{analytics.onTime}</div>
            </div>

            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(245, 158, 11, 0.15)", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--warning)", fontWeight: 800 }}>LATE</div>
              <div style={{ fontSize: "1rem", fontWeight: 900, color: "#fff" }}>{analytics.late}</div>
            </div>

            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(239, 68, 68, 0.15)", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--danger)", fontWeight: 800 }}>PENDING</div>
              <div style={{ fontSize: "1rem", fontWeight: 900, color: "#fff" }}>{analytics.pending}</div>
            </div>
          </div>
        </div>

        {/* TOP PERFORMERS ROSTER */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>Top Homework Performers</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {analytics.topPerformers.map((tp, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0.85rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.03)" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>#{idx + 1} {tp.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Streak: {tp.streak}</div>
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--success)" }}>{tp.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STUDENTS NEEDING ASSISTANCE */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--warning)" }}>Pending Homework Follow-Up</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {analytics.needsHelp.map((nh, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0.85rem", borderRadius: "var(--radius-md)", background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>{nh.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Pending: {nh.pendingCount} Homeworks</div>
                </div>
                <button type="button" style={{ padding: "0.35rem 0.65rem", borderRadius: 8, background: "var(--primary)", border: "none", color: "#fff", fontSize: "0.72rem", fontWeight: 800, cursor: "pointer" }}>
                  Send Alert
                </button>
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
