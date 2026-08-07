"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, ArrowLeft, Save, CheckCircle2, Sparkles, 
  Download, Eye, Check, X, Award, AlertCircle 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function AssignmentReviewPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [reviews, setReviews] = useState([
    { roll: 101, name: "Aarav Sharma", project: "Hydraulic Arm Renewable Energy Report", file: "hydraulic_arm_report.pdf", score: "19", max: "20", status: "Approved", feedback: "Impressive fluid mechanics working model!" },
    { roll: 102, name: "Ananya Patel", project: "Solar Dual Axis Tracking System", file: "solar_tracker_project.pdf", score: "20", max: "20", status: "Approved", feedback: "Outstanding execution and circuit diagram." },
    { roll: 103, name: "Devansh Gupta", project: "Not Submitted Yet", file: "No File", score: "0", max: "20", status: "Pending", feedback: "Overdue" }
  ]);

  const handleScoreChange = (roll: number, val: string) => {
    setReviews(prev => prev.map(r => r.roll === roll ? { ...r, score: val } : r));
  };

  const handleSaveReviews = (e: React.FormEvent) => {
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
              <Sparkles size={12} /> Module 6: Assignments
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Assignment Review
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Project Evaluation & Rubrics Scoring
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
          <Link href="/assignments/review" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Review Submissions
          </Link>
          <Link href="/assignments/report" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Assignment Report
          </Link>
        </div>

        {/* SUCCESS ALERT */}
        {savedSuccess && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Project rubrics scores & feedback saved to database!</span>
          </div>
        )}

        {/* ════════════ REVIEWS ROSTER ════════════ */}
        <form onSubmit={handleSaveReviews} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {reviews.map((r) => (
            <div key={r.roll} className="glass-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#ffffff" }}>Roll #{r.roll} — {r.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 700 }}>{r.project}</div>
                </div>

                <span style={{
                  fontSize: "0.72rem", fontWeight: 800,
                  color: r.status === "Approved" ? "var(--success)" : "var(--warning)",
                  background: r.status === "Approved" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                  padding: "0.2rem 0.55rem", borderRadius: 6
                }}>
                  {r.status}
                </span>
              </div>

              {r.status === "Approved" ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem", marginTop: 2 }}>
                  <div className="input-group">
                    <label style={{ fontSize: "0.68rem" }}>RUBRIC SCORE (/20)</label>
                    <input 
                      type="number" 
                      value={r.score}
                      onChange={e => handleScoreChange(r.roll, e.target.value)}
                      style={{ padding: "0.45rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff", fontSize: "0.85rem", fontWeight: 800, textAlign: "center" }}
                    />
                  </div>

                  <div className="input-group">
                    <label style={{ fontSize: "0.68rem" }}>TEACHER FEEDBACK</label>
                    <input 
                      type="text" 
                      value={r.feedback}
                      style={{ padding: "0.45rem 0.65rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: "0.78rem" }}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: "0.75rem", color: "var(--warning)", fontStyle: "italic" }}>
                  Project submission pending from student.
                </div>
              )}
            </div>
          ))}

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            <Save size={18} /> Save Project Evaluation
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
