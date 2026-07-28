"use client";

import React, { useState } from "react";
import { 
  FileText, Award, TrendingUp, Calendar, Download, 
  Sparkles, CheckCircle2, Clock, MapPin, ChevronRight, 
  BarChart3, ShieldCheck, UserCheck, Star, Brain
} from "lucide-react";

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<"schedule" | "marks" | "reportCard" | "analytics">("schedule");

  const examSchedules = [
    { id: 1, subject: "Physics", name: "Mid-Term Physics Theory & Lab", date: "14 Aug 2026", time: "09:30 AM - 12:30 PM", room: "Hall B (10-A)", totalMarks: 100, syllabus: "Chapters 1 to 5" },
    { id: 2, subject: "Mathematics", name: "Mid-Term Advanced Mathematics", date: "17 Aug 2026", time: "09:30 AM - 12:30 PM", room: "Hall B (10-A)", totalMarks: 100, syllabus: "Algebra & Calculus" }
  ];

  const marksData = [
    { subject: "Mathematics", marks: 95, maxMarks: 100, grade: "A+", classAvg: 78.4, teacher: "Rakesh Verma" },
    { subject: "Computer Science", marks: 98, maxMarks: 100, grade: "A+", classAvg: 81.2, teacher: "Vikram Malhotra" },
    { subject: "Physics", marks: 92, maxMarks: 100, grade: "A", classAvg: 74.5, teacher: "Sunita Mehta" }
  ];

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>Exams & Marksheets</h2>
            <span style={{ background: "rgba(16,185,129,0.2)", color: "#059669", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              Rank #3 / 42
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Aarav Sharma • Class 10-A • Session 2026
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="banner-sub" style={{ fontSize: "0.68rem", fontWeight: 700 }}>GPA SCORE</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#059669", marginTop: 1 }}>94.2%</div>
        </div>
      </div>

      {/* ════════════ 4-TAB SUB-NAVIGATION BAR ════════════ */}
      <div className="subtab-bar" style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.35rem",
        padding: "0.35rem", borderRadius: 16
      }}>
        {[
          { id: "schedule", label: "Schedule", icon: Calendar },
          { id: "marks", label: "Marks", icon: FileText },
          { id: "reportCard", label: "Report", icon: Award },
          { id: "analytics", label: "Analytics", icon: TrendingUp }
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: "0.55rem 0.35rem", borderRadius: 12, border: "none",
              background: activeTab === t.id ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent",
              color: activeTab === t.id ? "#fff" : "var(--card-subtext)",
              fontSize: "0.72rem", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem",
              cursor: "pointer",
              boxShadow: activeTab === t.id ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none"
            }}
          >
            <t.icon size={14} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ════════════ SCREEN 1: EXAM SCHEDULE ════════════ */}
      {activeTab === "schedule" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {examSchedules.map((ex) => (
            <div key={ex.id} className="card-ui" style={{ padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ background: "rgba(99,102,241,0.15)", color: "var(--primary)", padding: "0.15rem 0.55rem", borderRadius: 6, fontSize: "0.68rem", fontWeight: 800 }}>
                    {ex.subject}
                  </span>
                  <div className="text-title" style={{ fontSize: "0.95rem", fontWeight: 800, marginTop: 4 }}>
                    {ex.name}
                  </div>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#0284c7", fontWeight: 800 }}>
                  {ex.totalMarks} Marks
                </span>
              </div>

              <div className="subbox-ui" style={{ padding: "0.75rem 0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="text-muted-custom" style={{ fontSize: "0.7rem" }}>DATE & TIME</div>
                  <div className="text-title" style={{ fontSize: "0.82rem", fontWeight: 800 }}>{ex.date} • {ex.time}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="text-muted-custom" style={{ fontSize: "0.7rem" }}>EXAM HALL</div>
                  <div className="text-title" style={{ fontSize: "0.82rem", fontWeight: 700 }}>{ex.room}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ SCREEN 2: MARKS ════════════ */}
      {activeTab === "marks" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {marksData.map((m, i) => (
            <div key={i} className="card-ui" style={{ padding: "0.95rem 1.1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="text-title" style={{ fontSize: "0.9rem", fontWeight: 800 }}>{m.subject}</div>
                <div className="text-muted-custom" style={{ fontSize: "0.7rem", marginTop: 2 }}>Class Avg: {m.classAvg}</div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div className="text-title" style={{ fontSize: "1.1rem", fontWeight: 900 }}>{m.marks} / {m.maxMarks}</div>
                <span style={{ background: "rgba(16,185,129,0.15)", color: "#059669", padding: "0.1rem 0.5rem", borderRadius: 6, fontSize: "0.68rem", fontWeight: 800, marginTop: 2, display: "inline-block" }}>
                  Grade {m.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
