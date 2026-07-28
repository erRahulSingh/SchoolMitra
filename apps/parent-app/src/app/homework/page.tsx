"use client";

import React, { useState } from "react";
import { 
  BookOpen, FileText, CheckCircle2, Clock, Download, 
  Sparkles, Calendar, Award, MessageSquare, Paperclip, 
  ArrowUpRight, AlertCircle, Check, FileCheck
} from "lucide-react";

export default function HomeworkPage() {
  const [activeTab, setActiveTab] = useState<"homework" | "assignments">("homework");
  const [filterSubject, setFilterSubject] = useState("All");

  const [homeworkList, setHomeworkList] = useState([
    {
      id: 1,
      subject: "Physics",
      title: "Lab Experiment #4 - Reflection & Refraction",
      description: "Complete ray diagram exercises from page 142 to 148 in laboratory manual. Draw incident & refracted rays accurately.",
      assignedDate: "27 Aug 2026",
      dueDate: "Tomorrow, 09:00 AM",
      teacher: "Sunita Mehta",
      done: false,
      hasAttachment: true,
      fileName: "Physics_Lab_Worksheet_4.pdf"
    },
    {
      id: 2,
      subject: "Mathematics",
      title: "Quadratic Equations Exercise 4.2",
      description: "Solve questions 1 through 15 on factorization and completing the square methods.",
      assignedDate: "26 Aug 2026",
      dueDate: "30 Aug 2026",
      teacher: "Rakesh Verma",
      done: true,
      hasAttachment: false
    },
    {
      id: 3,
      subject: "English",
      title: "Essay Writing on Modern Renewable Energy",
      description: "Write a 500-word argumentative essay on Solar vs Wind energy adoption in urban India.",
      assignedDate: "25 Aug 2026",
      dueDate: "31 Aug 2026",
      teacher: "Anjali Gupta",
      done: false,
      hasAttachment: true,
      fileName: "Essay_Guidelines_Rubric.pdf"
    }
  ]);

  const assignmentsList = [
    {
      id: 101,
      subject: "Computer Science",
      title: "Python Data Analysis Mini-Project",
      description: "Build a dataset parser analyzing student grade trends using Pandas and Matplotlib.",
      assignedDate: "15 Aug 2026",
      dueDate: "25 Aug 2026",
      submittedDate: "24 Aug 2026",
      status: "Graded",
      marksScored: 24,
      maxMarks: 25,
      grade: "A+",
      teacher: "Vikram Malhotra",
      feedback: "Exceptional code structure and clean visualization plots!"
    }
  ];

  const toggleHomework = (id: number) => {
    setHomeworkList(prev => prev.map(hw => hw.id === id ? { ...hw, done: !hw.done } : hw));
  };

  const filteredHomework = homeworkList.filter(hw => filterSubject === "All" || hw.subject === filterSubject);

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
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>Academic Work & Projects</h2>
            <span style={{ background: "rgba(251,191,36,0.2)", color: "#d97706", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              Active Term
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Aarav Sharma • Class 10-A • Track & Submit
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="banner-sub" style={{ fontSize: "0.68rem", fontWeight: 700 }}>COMPLETED TASKS</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#059669", marginTop: 1 }}>
            {homeworkList.filter(h => h.done).length} / {homeworkList.length}
          </div>
        </div>
      </div>

      {/* ════════════ 2-TAB SUB-NAVIGATION BAR ════════════ */}
      <div className="subtab-bar" style={{
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.45rem",
        padding: "0.35rem", borderRadius: 16
      }}>
        <button
          type="button"
          onClick={() => setActiveTab("homework")}
          style={{
            padding: "0.65rem 0.5rem", borderRadius: 12, border: "none",
            background: activeTab === "homework" ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent",
            color: activeTab === "homework" ? "#fff" : "var(--card-subtext)",
            fontSize: "0.82rem", fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
            cursor: "pointer",
            boxShadow: activeTab === "homework" ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none"
          }}
        >
          <BookOpen size={16} />
          <span>Daily Homework</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("assignments")}
          style={{
            padding: "0.65rem 0.5rem", borderRadius: 12, border: "none",
            background: activeTab === "assignments" ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent",
            color: activeTab === "assignments" ? "#fff" : "var(--card-subtext)",
            fontSize: "0.82rem", fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
            cursor: "pointer",
            boxShadow: activeTab === "assignments" ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none"
          }}
        >
          <FileText size={16} />
          <span>Term Assignments</span>
        </button>
      </div>

      {/* ════════════ SCREEN 1: DAILY HOMEWORK ════════════ */}
      {activeTab === "homework" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filteredHomework.map((hw) => (
              <div key={hw.id} className="card-ui" style={{ padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", opacity: hw.done ? 0.8 : 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button
                      type="button"
                      onClick={() => toggleHomework(hw.id)}
                      style={{
                        width: 24, height: 24, borderRadius: 8,
                        border: hw.done ? "none" : "2px solid var(--card-subtext)",
                        background: hw.done ? "#059669" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", cursor: "pointer"
                      }}
                    >
                      {hw.done && <Check size={16} />}
                    </button>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                        <span style={{ background: "rgba(99,102,241,0.15)", color: "var(--primary)", padding: "0.15rem 0.55rem", borderRadius: 6, fontSize: "0.68rem", fontWeight: 800 }}>
                          {hw.subject}
                        </span>
                        <span style={{ fontSize: "0.72rem", color: "#d97706", fontWeight: 700 }}>
                          Due: {hw.dueDate}
                        </span>
                      </div>
                      <div className="text-title" style={{ fontSize: "0.95rem", fontWeight: 800, marginTop: 4, textDecoration: hw.done ? "line-through" : "none" }}>
                        {hw.title}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="subbox-ui" style={{ fontSize: "0.82rem", lineHeight: 1.5, padding: "0.65rem 0.85rem" }}>
                  {hw.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════ SCREEN 2: TERM ASSIGNMENTS ════════════ */}
      {activeTab === "assignments" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {assignmentsList.map((asg) => (
            <div key={asg.id} className="card-ui" style={{ padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="text-title" style={{ fontSize: "0.95rem", fontWeight: 800 }}>{asg.title}</div>
                  <div className="text-muted-custom" style={{ fontSize: "0.72rem", marginTop: 2 }}>{asg.subject} • Due: {asg.dueDate}</div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#059669" }}>{asg.marksScored} / {asg.maxMarks}</div>
                  <span style={{ background: "rgba(16,185,129,0.15)", color: "#059669", padding: "0.1rem 0.5rem", borderRadius: 6, fontSize: "0.68rem", fontWeight: 800 }}>
                    Grade {asg.grade}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
