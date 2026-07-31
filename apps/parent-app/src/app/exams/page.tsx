"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  CalendarDays, 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Clock, 
  X, 
  Download,
  BookOpen
} from "lucide-react";

interface ExamsPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function ExamsPage({ language = "en", onNavigate }: ExamsPageProps) {
  const isHi = language === "hi";

  const [activeTab, setActiveTab] = useState<"Schedule" | "Results" | "Syllabus">("Schedule");
  const [selectedExam, setSelectedExam] = useState<any>(null);

  const t = {
    title: isHi ? "परीक्षा" : "Examination",
    termTitle: "Term 1 (2024-25)",
    classStr: "Class 5th – A",
    schedule: isHi ? "समय सारणी" : "Schedule",
    results: isHi ? "परिणाम" : "Results",
    syllabus: isHi ? "पाठ्यक्रम" : "Syllabus",
    upcomingExams: isHi ? "आगामी परीक्षाएं" : "Upcoming Exams",
    pastExams: isHi ? "पिछली परीक्षाएं" : "Past Exams",
    completed: isHi ? "पूरा हुआ" : "Completed",
    close: isHi ? "बंद करें" : "Close",
    downloadSyllabus: isHi ? "परीक्षा सारणी डाउनलोड करें" : "Download Date Sheet (PDF)"
  };

  const upcomingList = [
    {
      id: 1,
      title: "Unit Test – 1",
      dateRange: "20 May 2025 – 24 May 2025",
      subjectsInfo: "4 Subjects",
      iconType: "purple",
      timetable: [
        { date: "20 May 2025", subject: "English", time: "09:00 AM - 10:30 AM", room: "Room 12" },
        { date: "21 May 2025", subject: "Mathematics", time: "09:00 AM - 10:30 AM", room: "Room 14" },
        { date: "22 May 2025", subject: "Science", time: "09:00 AM - 10:30 AM", room: "Room 16" },
        { date: "24 May 2025", subject: "Hindi", time: "09:00 AM - 10:30 AM", room: "Room 11" }
      ]
    },
    {
      id: 2,
      title: "Half Yearly Exam",
      dateRange: "15 Jun 2025 – 25 Jun 2025",
      subjectsInfo: "All Subjects",
      iconType: "green",
      timetable: [
        { date: "15 Jun 2025", subject: "English", time: "09:00 AM - 12:00 PM", room: "Hall A" },
        { date: "17 Jun 2025", subject: "Mathematics", time: "09:00 AM - 12:00 PM", room: "Hall A" },
        { date: "19 Jun 2025", subject: "Science", time: "09:00 AM - 12:00 PM", room: "Hall A" },
        { date: "21 Jun 2025", subject: "Social Studies", time: "09:00 AM - 12:00 PM", room: "Hall A" },
        { date: "23 Jun 2025", subject: "Hindi", time: "09:00 AM - 12:00 PM", room: "Hall A" },
        { date: "25 Jun 2025", subject: "Computer Science", time: "09:00 AM - 12:00 PM", room: "Hall A" }
      ]
    },
    {
      id: 3,
      title: "Unit Test – 2",
      dateRange: "20 Jul 2025 – 24 Jul 2025",
      subjectsInfo: "4 Subjects",
      iconType: "orange",
      timetable: [
        { date: "20 Jul 2025", subject: "English", time: "09:00 AM - 10:30 AM", room: "Room 12" },
        { date: "21 Jul 2025", subject: "Mathematics", time: "09:00 AM - 10:30 AM", room: "Room 14" },
        { date: "22 Jul 2025", subject: "Science", time: "09:00 AM - 10:30 AM", room: "Room 16" },
        { date: "24 Jul 2025", subject: "Social Studies", time: "09:00 AM - 10:30 AM", room: "Room 13" }
      ]
    }
  ];

  const pastList = [
    {
      id: 4,
      title: "Periodic Test – 2",
      dateRange: "10 Mar 2025 – 14 Mar 2025",
      subjectsInfo: "All Subjects",
      status: "Completed",
      iconType: "blue"
    },
    {
      id: 5,
      title: "Periodic Test – 1",
      dateRange: "20 Jan 2025 – 24 Jan 2025",
      subjectsInfo: "All Subjects",
      status: "Completed",
      iconType: "purple"
    }
  ];

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ TOP HEADER BAR (EXACT MATCH REFERENCE SCREENSHOT) ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem"
      }}>
        {/* Left Side: Back Arrow + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("academics") : window.history.back()}
            aria-label="Go Back"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0",
              color: "#0f172a"
            }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>

          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.015em"
          }}>
            {t.title}
          </h1>
        </div>

        {/* Right Side: Calendar Action Squircle Button */}
        <button
          type="button"
          onClick={() => onNavigate && onNavigate("calendar")}
          aria-label="Calendar View"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "12px",
            background: "#f0f6ff",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)"
          }}
        >
          <CalendarDays size={20} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ TERM & CLASS HERO BANNER CARD (PURPLE GRADIENT) ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 55%, #3b0764 100%)",
        borderRadius: "22px",
        padding: "1.2rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 10px 25px -4px rgba(109, 40, 217, 0.4)",
        display: "flex",
        alignItems: "center",
        gap: "1rem"
      }}>
        {/* Left White Squircle Icon Container Frame */}
        <div style={{
          width: "50px",
          height: "50px",
          borderRadius: "16px",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}>
          {/* Exam Paper Document Wrench Icon SVG */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M12 18v-4"/>
            <path d="M9 15h6"/>
          </svg>
        </div>

        {/* Text Details Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <h2 style={{
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.015em",
            lineHeight: 1.2
          }}>
            {t.termTitle}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#ddd6fe" }}>
              {t.classStr}
            </span>
            <ChevronDown size={16} color="#ddd6fe" strokeWidth={2.2} />
          </div>
        </div>
      </div>

      {/* ════════════ 3 CAPSULE FILTER TABS (SCHEDULE, RESULTS, SYLLABUS) ════════════ */}
      <div style={{
        background: "#f8fafc",
        borderRadius: "99px",
        padding: "0.3rem",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0.3rem",
        border: "1px solid #f1f5f9"
      }}>
        {[
          { id: "Schedule", label: t.schedule },
          { id: "Results", label: t.results },
          { id: "Syllabus", label: t.syllabus }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              if (tab.id === "Results") {
                if (onNavigate) onNavigate("reportCard");
              } else {
                setActiveTab(tab.id as any);
              }
            }}
            style={{
              padding: "0.55rem 0.5rem",
              borderRadius: "99px",
              border: "none",
              background: activeTab === tab.id ? "#ffffff" : "transparent",
              color: activeTab === tab.id ? "#0f172a" : "#64748b",
              fontSize: "0.82rem",
              fontWeight: activeTab === tab.id ? 800 : 600,
              cursor: "pointer",
              boxShadow: activeTab === tab.id ? "0 2px 8px rgba(15, 23, 42, 0.06)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ════════════ UPCOMING EXAMS SECTION ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        <h2 style={{
          fontSize: "0.92rem",
          fontWeight: 800,
          color: "#0f172a",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "-0.01em"
        }}>
          {t.upcomingExams}
        </h2>

        {/* 3 Upcoming Exam Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {upcomingList.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedExam(item)}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "1rem 1.1rem",
                border: "1px solid #f1f5f9",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer"
              }}
            >
              {/* Left Side: Icon + Details */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.95rem" }}>
                {/* Colored Squircle Icon Container */}
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  background: item.iconType === "purple" 
                    ? "#f3e8ff" 
                    : item.iconType === "green" 
                      ? "#dcfce7" 
                      : "#ffedd5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  {item.iconType === "purple" && (
                    <FileText size={24} color="#9333ea" strokeWidth={2} />
                  )}
                  {item.iconType === "green" && (
                    <Calendar size={24} color="#16a34a" strokeWidth={2} />
                  )}
                  {item.iconType === "orange" && (
                    <Calendar size={24} color="#ea580c" strokeWidth={2} />
                  )}
                </div>

                {/* Text Info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                  <h3 style={{
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    color: "#0f172a",
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {item.title}
                  </h3>

                  <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "#64748b" }}>
                    {item.dateRange}
                  </div>

                  <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "#64748b" }}>
                    {item.subjectsInfo}
                  </div>
                </div>
              </div>

              {/* Right Side: Chevron Icon */}
              <ChevronRight size={18} color="#0f172a" strokeWidth={2.2} />
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ PAST EXAMS SECTION ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginTop: "0.2rem" }}>
        <h2 style={{
          fontSize: "0.92rem",
          fontWeight: 800,
          color: "#0f172a",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "-0.01em"
        }}>
          {t.pastExams}
        </h2>

        {/* 2 Past Exam Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {pastList.map(item => (
            <div
              key={item.id}
              onClick={() => {
                if (onNavigate) onNavigate("reportCard");
              }}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "1rem 1.1rem",
                border: "1px solid #f1f5f9",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer"
              }}
            >
              {/* Left Side: Icon + Details */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.95rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  background: item.iconType === "blue" ? "#e0f2fe" : "#f3e8ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <FileText size={24} color={item.iconType === "blue" ? "#0284c7" : "#9333ea"} strokeWidth={2} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                  <h3 style={{
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    color: "#0f172a",
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {item.title}
                  </h3>

                  <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "#64748b" }}>
                    {item.dateRange}
                  </div>

                  <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "#64748b" }}>
                    {item.subjectsInfo}
                  </div>
                </div>
              </div>

              {/* Right Side: Completed Green Tag */}
              <span style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#15803d"
              }}>
                {t.completed}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ EXAM TIMETABLE DETAIL MODAL DRAWER ════════════ */}
      {selectedExam && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div style={{
            width: "100%", maxWidth: "440px", background: "#ffffff",
            borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            padding: "1.25rem 1.25rem 2rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>
                {selectedExam.title} - Date Sheet
              </h3>
              <button type="button" onClick={() => setSelectedExam(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Date Sheet Table */}
            <div style={{ padding: "0.85rem", background: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {selectedExam.timetable ? (
                selectedExam.timetable.map((row: any, i: number) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", paddingBottom: "0.4rem", borderBottom: i < selectedExam.timetable.length - 1 ? "1px solid #e2e8f0" : "none" }}>
                    <div>
                      <div style={{ fontWeight: 800, color: "#0f172a" }}>{row.subject}</div>
                      <div style={{ color: "#64748b", fontSize: "0.72rem" }}>{row.date} • {row.room}</div>
                    </div>
                    <span style={{ fontWeight: 700, color: "#1d4ed8" }}>{row.time}</span>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: "0.8rem", color: "#64748b", textAlign: "center" }}>Date sheet will be uploaded soon.</div>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => {
                  alert("Downloading official Exam Date Sheet PDF...");
                  setSelectedExam(null);
                }}
                style={{
                  flex: 1, padding: "0.75rem", background: "#1d4ed8",
                  border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem"
                }}
              >
                <Download size={18} />
                <span>{t.downloadSyllabus}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedExam(null)}
                style={{ padding: "0.75rem 1rem", background: "#f1f5f9", border: "none", borderRadius: "14px", color: "#334155", fontWeight: 700, cursor: "pointer" }}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
