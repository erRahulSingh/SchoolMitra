"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  FileCheck, 
  FileText, 
  Calendar, 
  Clock, 
  ChevronRight, 
  FlaskConical, 
  Globe, 
  BookOpen, 
  Award, 
  X, 
  Sparkles, 
  Download, 
  Calculator, 
  Languages,
  BookOpenCheck,
  CheckCircle2,
  AlertCircle,
  FileBadge
} from "lucide-react";

interface AcademicsPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function AcademicsPage({ language = "en", onNavigate }: AcademicsPageProps) {
  // Modal states for interactive detail views
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<"syllabus" | "reportCard" | "timetable" | null>(null);

  // Internationalization content
  const isHi = language === "hi";

  const t = {
    title: isHi ? "अकादमिक" : "Academics",
    studentName: "Rohan Sharma",
    studentClass: isHi ? "कक्षा 5वीं - अ" : "Class 5th – A",
    academicYear: isHi ? "शैक्षणिक वर्ष 2024-25" : "Academic Year 2024-25",
    
    // Cards
    reportCard: isHi ? "रिपोर्ट कार्ड" : "Report Card",
    reportCardSub: isHi ? "अकादमिक प्रदर्शन देखें" : "View academic performance",
    
    assignments: isHi ? "असाइनमेंट" : "Assignments",
    assignmentsSub: isHi ? "असाइनमेंट देखें और जमा करें" : "View and submit assignments",
    
    timeTable: isHi ? "समय सारणी" : "Time Table",
    timeTableSub: isHi ? "कक्षा दिनचर्या और शेड्यूल" : "Class routine and schedule",
    
    syllabus: isHi ? "पाठ्यक्रम" : "Syllabus",
    syllabusSub: isHi ? "विषयवार पाठ्यक्रम" : "Subject wise syllabus",
    
    // Exam Schedule
    examSchedule: isHi ? "परीक्षा सारणी" : "Exam Schedule",
    examScheduleSub: isHi ? "आगामी परीक्षाएं देखें" : "View upcoming exams",
    
    // Subjects
    subjects: isHi ? "विषय" : "Subjects",
    close: isHi ? "बंद करें" : "Close",
    downloadPDF: isHi ? "पीडीएफ डाउनलोड करें" : "Download PDF"
  };

  // Subjects data matching screenshot
  const subjectsList = [
    {
      id: "maths",
      name: "Mathematics",
      teacher: "Mrs. Neha Gupta",
      icon: Calculator,
      bgColor: "#f3e8ff",
      iconColor: "#7e22ce",
      progress: 82,
      topicsCompleted: 14,
      totalTopics: 18,
      nextExam: "14 Aug 2026",
      recentGrade: "A+ (95%)",
      chapters: [
        { title: "Chapter 1: Fractions & Decimals", status: "Completed" },
        { title: "Chapter 2: Geometry & Angles", status: "Completed" },
        { title: "Chapter 3: Perimeter & Area", status: "In Progress" },
        { title: "Chapter 4: Data Handling", status: "Upcoming" }
      ]
    },
    {
      id: "science",
      name: "Science",
      teacher: "Mr. Rajesh Kumar",
      icon: FlaskConical,
      bgColor: "#ffedd5",
      iconColor: "#ea580c",
      progress: 78,
      topicsCompleted: 11,
      totalTopics: 15,
      nextExam: "18 Aug 2026",
      recentGrade: "A (88%)",
      chapters: [
        { title: "Chapter 1: Plants & Photosynthesis", status: "Completed" },
        { title: "Chapter 2: Animal Habitats & Adaptations", status: "Completed" },
        { title: "Chapter 3: Human Digestive System", status: "In Progress" },
        { title: "Chapter 4: States of Matter", status: "Upcoming" }
      ]
    },
    {
      id: "english",
      name: "English",
      teacher: "Mrs. Priya Singh",
      icon: Languages,
      bgColor: "#dbeafe",
      iconColor: "#1d4ed8",
      progress: 90,
      topicsCompleted: 18,
      totalTopics: 20,
      nextExam: "21 Aug 2026",
      recentGrade: "A+ (92%)",
      chapters: [
        { title: "Unit 1: Prose & Reading Comprehension", status: "Completed" },
        { title: "Unit 2: English Grammar & Tenses", status: "Completed" },
        { title: "Unit 3: Creative Essay Writing", status: "In Progress" },
        { title: "Unit 4: Poetry & Literature", status: "Upcoming" }
      ]
    },
    {
      id: "social",
      name: "Social Studies",
      teacher: "Mr. Amit Verma",
      icon: Globe,
      bgColor: "#dcfce7",
      iconColor: "#16a34a",
      progress: 85,
      topicsCompleted: 12,
      totalTopics: 14,
      nextExam: "25 Aug 2026",
      recentGrade: "A (90%)",
      chapters: [
        { title: "Chapter 1: Our Earth & Solar System", status: "Completed" },
        { title: "Chapter 2: Indian Freedom Movement", status: "Completed" },
        { title: "Chapter 3: Maps & Globe Studies", status: "In Progress" },
        { title: "Chapter 4: Civic Rights & Governance", status: "Upcoming" }
      ]
    }
  ];

  return (
    <div style={{
      padding: "1rem 1rem 2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ PAGE TITLE ════════════ */}
      <h1 style={{
        fontSize: "1.18rem",
        fontWeight: 800,
        color: "#0f172a",
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: "-0.015em",
        margin: "0.15rem 0 0.05rem 0"
      }}>
        {t.title}
      </h1>

      {/* ════════════ STUDENT PROFILE GRADIENT CARD ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #092058 0%, #0d3880 55%, #071946 100%)",
        borderRadius: "20px",
        padding: "1.2rem 1.25rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 10px 25px -5px rgba(13, 56, 128, 0.4)",
        display: "flex",
        alignItems: "center",
        gap: "1rem"
      }}>
        {/* Background Watermark Graduation Cap Icon */}
        <GraduationCap 
          size={120} 
          style={{
            position: "absolute",
            right: "-15px",
            top: "-15px",
            color: "rgba(255, 255, 255, 0.08)",
            transform: "rotate(-12deg)",
            pointerEvents: "none"
          }}
        />

        {/* Avatar Image Frame */}
        <div style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          border: "2.5px solid #ffffff",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          background: "#1e293b"
        }}>
          <img 
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300" 
            alt={t.studentName}
            onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150"; }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Student Details Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.18rem", zIndex: 2 }}>
          <h2 style={{
            color: "#ffffff",
            fontSize: "1.18rem",
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: "-0.01em"
          }}>
            {t.studentName}
          </h2>
          
          <div style={{
            color: "#93c5fd",
            fontSize: "0.85rem",
            fontWeight: 600
          }}>
            {t.studentClass}
          </div>

          <div style={{
            color: "#bfdbfe",
            fontSize: "0.78rem",
            fontWeight: 500,
            marginTop: "1px"
          }}>
            {t.academicYear}
          </div>
        </div>
      </div>

      {/* ════════════ 2x2 FEATURE GRID CARDS ════════════ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.8rem"
      }}>
        {/* Card 1: Report Card */}
        <div 
          onClick={() => {
            if (onNavigate) onNavigate("reportCard");
            else setActiveModal("reportCard");
          }}
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "1rem 0.9rem",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.04)",
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            transition: "all 0.2s ease"
          }}
        >
          {/* Icon Box */}
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background: "#e6f7ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <FileCheck size={22} color="#16a34a" strokeWidth={2.2} />
          </div>

          <div>
            <div style={{
              color: "#16a34a",
              fontWeight: 800,
              fontSize: "0.92rem",
              lineHeight: 1.25
            }}>
              {t.reportCard}
            </div>
            <div style={{
              color: "#64748b",
              fontSize: "0.71rem",
              marginTop: "4px",
              lineHeight: 1.3
            }}>
              {t.reportCardSub}
            </div>
          </div>
        </div>

        {/* Card 2: Assignments */}
        <div 
          onClick={() => {
            if (onNavigate) onNavigate("assignments");
          }}
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "1rem 0.9rem",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.04)",
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            transition: "all 0.2s ease"
          }}
        >
          {/* Icon Box */}
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background: "#f3e8ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <FileText size={22} color="#7e22ce" strokeWidth={2.2} />
          </div>

          <div>
            <div style={{
              color: "#7e22ce",
              fontWeight: 800,
              fontSize: "0.92rem",
              lineHeight: 1.25
            }}>
              {t.assignments}
            </div>
            <div style={{
              color: "#64748b",
              fontSize: "0.71rem",
              marginTop: "4px",
              lineHeight: 1.3
            }}>
              {t.assignmentsSub}
            </div>
          </div>
        </div>

        {/* Card 3: Time Table */}
        <div 
          onClick={() => {
            if (onNavigate) onNavigate("timeTable");
            else setActiveModal("timetable");
          }}
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "1rem 0.9rem",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.04)",
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            transition: "all 0.2s ease"
          }}
        >
          {/* Icon Box */}
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background: "#fff7ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <Calendar size={22} color="#ea580c" strokeWidth={2.2} />
          </div>

          <div>
            <div style={{
              color: "#ea580c",
              fontWeight: 800,
              fontSize: "0.92rem",
              lineHeight: 1.25
            }}>
              {t.timeTable}
            </div>
            <div style={{
              color: "#64748b",
              fontSize: "0.71rem",
              marginTop: "4px",
              lineHeight: 1.3
            }}>
              {t.timeTableSub}
            </div>
          </div>
        </div>

        {/* Card 4: Syllabus */}
        <div 
          onClick={() => {
            if (onNavigate) onNavigate("studyMaterials");
            else setActiveModal("syllabus");
          }}
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "1rem 0.9rem",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.04)",
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            transition: "all 0.2s ease"
          }}
        >
          {/* Icon Box */}
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background: "#ccfbf1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <BookOpenCheck size={22} color="#0d9488" strokeWidth={2.2} />
          </div>

          <div>
            <div style={{
              color: "#0d9488",
              fontWeight: 800,
              fontSize: "0.92rem",
              lineHeight: 1.25
            }}>
              {t.syllabus}
            </div>
            <div style={{
              color: "#64748b",
              fontSize: "0.71rem",
              marginTop: "4px",
              lineHeight: 1.3
            }}>
              {t.syllabusSub}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ EXAM SCHEDULE BANNER CARD ════════════ */}
      <div 
        onClick={() => {
          if (onNavigate) onNavigate("exams");
        }}
        style={{
          background: "linear-gradient(135deg, #e8f2ff 0%, #dbeafe 100%)",
          borderRadius: "20px",
          padding: "1.1rem 1.15rem",
          border: "1px solid #bfdbfe",
          boxShadow: "0 6px 20px rgba(59, 130, 246, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Left Section: Icon + Text */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", zIndex: 2 }}>
          <div style={{
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.12)",
            flexShrink: 0
          }}>
            <FileBadge size={24} color="#1d4ed8" strokeWidth={2.2} />
          </div>

          <div>
            <div style={{
              color: "#1e3a8a",
              fontWeight: 800,
              fontSize: "1.02rem",
              letterSpacing: "-0.01em"
            }}>
              {t.examSchedule}
            </div>
            <div style={{
              color: "#475569",
              fontSize: "0.76rem",
              marginTop: "2px",
              fontWeight: 500
            }}>
              {t.examScheduleSub}
            </div>
          </div>
        </div>

        {/* Right Section: 3D Calendar & Clock Graphics + Chevron */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", zIndex: 2 }}>
          {/* Custom SVG Graphic of Blue Calendar with Clock */}
          <div style={{ position: "relative", width: 50, height: 46 }}>
            <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Calendar Body */}
              <rect x="2" y="8" width="40" height="32" rx="8" fill="#3b82f6" />
              <path d="M2 16H42" stroke="#60a5fa" strokeWidth="2" />
              {/* Binder Rings */}
              <rect x="10" y="3" width="4" height="8" rx="2" fill="#1d4ed8" />
              <rect x="30" y="3" width="4" height="8" rx="2" fill="#1d4ed8" />
              {/* Calendar Dots */}
              <circle cx="10" cy="23" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="18" cy="23" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="26" cy="23" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="34" cy="23" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="10" cy="30" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="18" cy="30" r="2" fill="#ffffff" opacity="0.9" />
            </svg>
            {/* Clock Overlay Badge */}
            <div style={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#60a5fa",
              border: "2px solid #ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
            }}>
              <Clock size={12} color="#ffffff" strokeWidth={3} />
            </div>
          </div>

          <ChevronRight size={22} color="#1d4ed8" strokeWidth={2.5} />
        </div>
      </div>

      {/* ════════════ SUBJECTS SECTION ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.2rem" }}>
        <h2 style={{
          fontSize: "1.1rem",
          fontWeight: 800,
          color: "#0f172a",
          fontFamily: "'Outfit', sans-serif"
        }}>
          {t.subjects}
        </h2>

        {/* Subjects Card List */}
        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
          overflow: "hidden"
        }}>
          {subjectsList.map((sub, index) => {
            const IconComp = sub.icon;
            const isLast = index === subjectsList.length - 1;

            return (
              <div
                key={sub.id}
                onClick={() => {
                  if (onNavigate) onNavigate("subjectDetails");
                  else setSelectedSubject(sub);
                }}
                style={{
                  padding: "0.95rem 1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                  cursor: "pointer",
                  transition: "background 0.2s ease"
                }}
              >
                {/* Left Side: Circular Icon + Subject Info */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                  {/* Subject Icon Badge */}
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: sub.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <IconComp size={22} color={sub.iconColor} strokeWidth={2.2} />
                  </div>

                  {/* Subject Title & Teacher Subtitle */}
                  <div>
                    <div style={{
                      color: "#0f172a",
                      fontWeight: 800,
                      fontSize: "0.95rem"
                    }}>
                      {sub.name}
                    </div>
                    <div style={{
                      color: "#64748b",
                      fontSize: "0.76rem",
                      marginTop: "2px",
                      fontWeight: 500
                    }}>
                      {sub.teacher}
                    </div>
                  </div>
                </div>

                {/* Right Side: Chevron */}
                <ChevronRight size={20} color="#94a3b8" strokeWidth={2} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════ MODAL: SUBJECT DETAILS ════════════ */}
      {selectedSubject && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div style={{
            width: "100%", maxWidth: "440px",
            background: "#ffffff",
            borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            padding: "1.25rem 1.25rem 2rem 1.25rem",
            maxHeight: "85vh", overflowY: "auto",
            animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: selectedSubject.bgColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <selectedSubject.icon size={20} color={selectedSubject.iconColor} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>{selectedSubject.name}</h3>
                  <p style={{ fontSize: "0.75rem", color: "#64748b" }}>{selectedSubject.teacher}</p>
                </div>
              </div>

              <button type="button" onClick={() => setSelectedSubject(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Quick Stats Banner */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", marginBottom: "1rem" }}>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.75rem", borderRadius: "14px" }}>
                <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>RECENT GRADE</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: selectedSubject.iconColor, marginTop: "2px" }}>
                  {selectedSubject.recentGrade}
                </div>
              </div>

              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.75rem", borderRadius: "14px" }}>
                <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>NEXT MID-TERM EXAM</div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>
                  {selectedSubject.nextExam}
                </div>
              </div>
            </div>

            {/* Chapters Progress */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                <span>Syllabus Completed</span>
                <span style={{ color: selectedSubject.iconColor }}>{selectedSubject.progress}%</span>
              </div>
              <div style={{ height: 8, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: `${selectedSubject.progress}%`, height: "100%", background: selectedSubject.iconColor, borderRadius: 99 }} />
              </div>
            </div>

            {/* Chapter List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>Chapter Breakdown</div>
              {selectedSubject.chapters.map((ch: any, idx: number) => (
                <div key={idx} style={{ padding: "0.65rem 0.75rem", background: "#f8fafc", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155" }}>{ch.title}</span>
                  <span style={{
                    fontSize: "0.68rem", fontWeight: 800, padding: "0.15rem 0.5rem", borderRadius: "6px",
                    background: ch.status === "Completed" ? "#dcfce7" : ch.status === "In Progress" ? "#fef3c7" : "#f1f5f9",
                    color: ch.status === "Completed" ? "#15803d" : ch.status === "In Progress" ? "#d97706" : "#64748b"
                  }}>
                    {ch.status}
                  </span>
                </div>
              ))}
            </div>

            <button 
              type="button" 
              onClick={() => setSelectedSubject(null)}
              style={{
                width: "100%", marginTop: "1.25rem", padding: "0.8rem",
                background: "linear-gradient(135deg, #1d4ed8, #1e3a8a)",
                border: "none", borderRadius: "14px", color: "#fff",
                fontWeight: 800, fontSize: "0.85rem", cursor: "pointer"
              }}
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* ════════════ MODAL: SYLLABUS OVERVIEW ════════════ */}
      {activeModal === "syllabus" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div style={{
            width: "100%", maxWidth: "440px",
            background: "#ffffff",
            borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            padding: "1.25rem 1.25rem 2rem 1.25rem",
            maxHeight: "85vh", overflowY: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <BookOpenCheck size={22} color="#0d9488" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Class 5th - Complete Syllabus</h3>
              </div>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "1rem" }}>
              Term 1 & Term 2 syllabus breakdown for Academic Session 2024-25.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {subjectsList.map((s) => (
                <div key={s.id} style={{ border: "1px solid #e2e8f0", borderRadius: "14px", padding: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.9rem", color: s.iconColor }}>{s.name}</span>
                    <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700 }}>{s.topicsCompleted}/{s.totalTopics} Topics</span>
                  </div>
                  <div style={{ height: 6, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ width: `${s.progress}%`, height: "100%", background: s.iconColor }} />
                  </div>
                </div>
              ))}
            </div>

            <button 
              type="button"
              onClick={() => setActiveModal(null)}
              style={{
                width: "100%", marginTop: "1.25rem", padding: "0.8rem",
                background: "#0d9488", border: "none", borderRadius: "14px", color: "#fff",
                fontWeight: 800, fontSize: "0.85rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem"
              }}
            >
              <Download size={16} /> {t.downloadPDF}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
