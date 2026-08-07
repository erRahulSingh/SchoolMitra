"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, ArrowLeft, Clock, MapPin, Sparkles, 
  ChevronRight, BookOpen, CheckCircle2, Award, FileText 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ExamSchedulePage() {
  const [selectedTerm, setSelectedTerm] = useState("Mid-Term Board Exam 2026");

  const dateSheet = [
    { id: "e101", date: "15 Sep 2026", time: "09:00 AM - 12:00 PM", subject: "Mathematics Theory", class: "Class 10-A", max: "80 Marks", room: "Exam Hall B-102", status: "Scheduled" },
    { id: "e102", date: "17 Sep 2026", time: "09:00 AM - 12:00 PM", subject: "Science (Physics/Chemistry/Bio)", class: "Class 10-A", max: "80 Marks", room: "Exam Hall B-104", status: "Scheduled" },
    { id: "e103", date: "20 Sep 2026", time: "09:00 AM - 12:00 PM", subject: "Social Studies", class: "Class 10-A", max: "80 Marks", room: "Exam Hall B-102", status: "Scheduled" },
    { id: "e104", date: "22 Sep 2026", time: "09:00 AM - 12:00 PM", subject: "English Language & Literature", class: "Class 10-A", max: "80 Marks", room: "Exam Hall B-102", status: "Scheduled" }
  ];

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
              Exam Schedule
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Master Date Sheet & Invigilation Duties
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

        {/* MODULE 9 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/exams" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
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
          <Link href="/exams/report" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Exam Report
          </Link>
        </div>

        {/* TERM SELECTOR */}
        <div className="glass-card" style={{ padding: "1.1rem" }}>
          <label style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>SELECT EXAM TERM</label>
          <select 
            value={selectedTerm} 
            onChange={(e) => setSelectedTerm(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.88rem", fontWeight: 800 }}
          >
            <option value="Mid-Term Board Exam 2026">CBSE Mid-Term Board Exam 2026</option>
            <option value="Annual Term Exam 2026">Annual Term Exam 2026</option>
          </select>
        </div>

        {/* ════════════ DATE SHEET LIST ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {dateSheet.map((ds) => (
            <div key={ds.id} className="glass-card" style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  {ds.date} • {ds.max}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 800 }}>
                  {ds.status}
                </span>
              </div>

              <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#ffffff" }}>
                {ds.subject}
              </div>

              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span><Clock size={13} style={{ display: "inline", marginRight: 3 }} /> {ds.time}</span>
                <span><MapPin size={13} style={{ display: "inline", marginRight: 3 }} /> {ds.room}</span>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.6rem", display: "flex", justifyContent: "flex-end" }}>
                <Link href="/exams/marks-entry" style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: 800, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                  Enter Term Marks <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
