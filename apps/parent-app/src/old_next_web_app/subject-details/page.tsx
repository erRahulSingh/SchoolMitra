"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  MoreVertical, 
  BookOpen, 
  UserCheck, 
  Download, 
  X, 
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  DownloadCloud
} from "lucide-react";

interface SubjectDetailsPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function SubjectDetailsPage({ language = "en", onNavigate }: SubjectDetailsPageProps) {
  const isHi = language === "hi";

  const [activeTab, setActiveTab] = useState<"Overview" | "Syllabus" | "Teachers" | "Materials">("Overview");

  const t = {
    title: isHi ? "विषय विवरण" : "Subject Details",
    subjectName: "Mathematics",
    classStr: "Class 5th – A",
    overview: isHi ? "अवलोकन" : "Overview",
    syllabus: isHi ? "पाठ्यक्रम" : "Syllabus",
    teachers: isHi ? "शिक्षक" : "Teachers",
    materials: isHi ? "सामग्री" : "Materials",
    descText: isHi 
      ? "गणित हमें तार्किक सोच और समस्या निवारण कौशल विकसित करने में मदद करता है।" 
      : "Mathematics helps us develop logical thinking and problem solving skills.",
    totalChapters: isHi ? "कुल अध्याय" : "Total Chapters",
    assessments: isHi ? "मूल्यांकन" : "Assessments",
    topicsCovered: isHi ? "कवर किए गए विषय" : "Topics Covered"
  };

  const topicsList = [
    "Large Numbers",
    "Addition & Subtraction",
    "Multiplication & Division",
    "Fractions",
    "Measurement"
  ];

  const syllabusList = [
    { name: "Chapter 1: Large Numbers", completed: true, status: "Completed" },
    { name: "Chapter 2: Addition & Subtraction", completed: true, status: "Completed" },
    { name: "Chapter 3: Multiplication & Division", completed: true, status: "Completed" },
    { name: "Chapter 4: Fractions", completed: true, status: "Completed" },
    { name: "Chapter 5: Decimals", completed: false, status: "In Progress" },
    { name: "Chapter 6: Geometry", completed: false, status: "Pending" }
  ];

  const materialsList = [
    { title: "Mathematics Class Notes - Term 1", type: "PDF Document", size: "1.4 MB" },
    { title: "Algebraic Formulas Formula Sheet", type: "PDF Document", size: "820 KB" },
    { title: "Volumetric Shapes Homework Guide", type: "PDF Document", size: "2.1 MB" }
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

      {/* ════════════ TOP PURPLE HERO HEADER BANNER (EXACT MATCH REFERENCE SCREENSHOT 1) ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 55%, #3b0764 100%)",
        borderRadius: "24px",
        padding: "1.2rem 1.15rem 1.4rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 10px 25px -4px rgba(109, 40, 217, 0.4)",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Top Header Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("studyMaterials") : window.history.back()}
            aria-label="Go Back"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0",
              color: "#ffffff"
            }}
          >
            <ArrowLeft size={22} color="#ffffff" strokeWidth={2.2} />
          </button>

          <h1 style={{
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.015em"
          }}>
            {t.title}
          </h1>
        </div>

        {/* Hero Subject Info Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Circular White Icon Box */}
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 14px rgba(0,0,0,0.18)"
          }}>
            <FileText size={28} color="#6d28d9" strokeWidth={2.2} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <h2 style={{
              fontSize: "1.35rem",
              fontWeight: 800,
              color: "#ffffff",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "-0.015em",
              lineHeight: 1.2
            }}>
              {t.subjectName}
            </h2>

            <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#ddd6fe" }}>
              {t.classStr}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ 4 CAPSULE FILTER TABS (OVERVIEW, SYLLABUS, TEACHERS, MATERIALS) ════════════ */}
      <div style={{
        background: "#f8fafc",
        borderRadius: "99px",
        padding: "0.3rem",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "0.3rem",
        border: "1px solid #f1f5f9"
      }}>
        {[
          { id: "Overview", label: t.overview },
          { id: "Syllabus", label: t.syllabus },
          { id: "Teachers", label: t.teachers },
          { id: "Materials", label: t.materials }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "0.55rem 0.2rem",
              borderRadius: "99px",
              border: activeTab === tab.id ? "1.5px solid #1d4ed8" : "none",
              background: activeTab === tab.id ? "#ffffff" : "transparent",
              color: activeTab === tab.id ? "#1d4ed8" : "#475569",
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

      {/* ════════════ OVERVIEW TAB CONTENT ════════════ */}
      {activeTab === "Overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <p style={{
            fontSize: "0.85rem",
            color: "#334155",
            lineHeight: 1.45,
            fontWeight: 500,
            margin: "0.2rem 0"
          }}>
            {t.descText}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            <div style={{
              background: "#f3e8ff",
              borderRadius: "18px",
              padding: "1rem 1.1rem",
              border: "1px solid #e9d5ff",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#6b21a8" }}>
                  {t.totalChapters}
                </span>
                <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "#6b21a8", fontFamily: "'Outfit', sans-serif" }}>
                  12
                </span>
              </div>
              <MoreVertical size={18} color="#9333ea" />
            </div>

            <div style={{
              background: "#eff6ff",
              borderRadius: "18px",
              padding: "1rem 1.1rem",
              border: "1px solid #dbeafe",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1e4ed8" }}>
                  {t.assessments}
                </span>
                <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1e4ed8", fontFamily: "'Outfit', sans-serif" }}>
                  5
                </span>
              </div>
              <MoreVertical size={18} color="#2563eb" />
            </div>
          </div>

          <div style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "1.15rem 1.15rem",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}>
            <h3 style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
              {t.topicsCovered}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", position: "relative" }}>
              <div style={{ position: "absolute", left: "10px", top: "12px", bottom: "12px", width: "2px", background: "#bbf7d0", zIndex: 1 }} />

              {topicsList.map((topic, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.85rem", zIndex: 2 }}>
                  <CheckCircle2 size={22} color="#16a34a" fill="#22c55e" stroke="#ffffff" strokeWidth={2} />
                  <span style={{ fontSize: "0.84rem", fontWeight: 700, color: "#334155" }}>
                    {topic}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════════ SYLLABUS TAB CONTENT ════════════ */}
      {activeTab === "Syllabus" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {syllabusList.map((ch, idx) => (
            <div key={idx} style={{
              background: "#ffffff", borderRadius: "16px", padding: "0.9rem 1.1rem",
              border: "1px solid #f1f5f9", boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <span style={{ fontSize: "0.88rem", fontWeight: 700, color: ch.completed ? "#0f172a" : "#475569" }}>
                {ch.name}
              </span>
              <span style={{
                fontSize: "0.74rem", fontWeight: 700,
                color: ch.status === "Completed" ? "#16a34a" : ch.status === "In Progress" ? "#ea580c" : "#64748b",
                background: ch.status === "Completed" ? "#ecfdf5" : ch.status === "In Progress" ? "#fff7ed" : "#f1f5f9",
                padding: "0.25rem 0.65rem", borderRadius: "8px"
              }}>
                {ch.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ TEACHERS TAB CONTENT (LINKS TO TEACHER PROFILE) ════════════ */}
      {activeTab === "Teachers" && (
        <div 
          onClick={() => onNavigate && onNavigate("teacherProfile")}
          style={{
            background: "#ffffff", borderRadius: "20px", padding: "1.1rem",
            border: "1px solid #f1f5f9", boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
            display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.95rem" }}>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
              alt="Mrs. Priya Singh"
              style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "2px solid #6d28d9" }}
            />
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
                Mrs. Priya Singh
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 500, marginTop: "2px" }}>
                Mathematics Teacher • 10+ Years Exp.
              </div>
            </div>
          </div>
          <ChevronRight size={18} color="#6d28d9" strokeWidth={2.5} />
        </div>
      )}

      {/* ════════════ MATERIALS TAB CONTENT ════════════ */}
      {activeTab === "Materials" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {materialsList.map((doc, idx) => (
            <div key={idx} style={{
              background: "#ffffff", borderRadius: "16px", padding: "0.9rem 1.1rem",
              border: "1px solid #f1f5f9", boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a" }}>{doc.title}</div>
                <div style={{ fontSize: "0.74rem", color: "#64748b", marginTop: "2px" }}>{doc.type} • {doc.size}</div>
              </div>
              <button 
                type="button" 
                onClick={() => alert("Downloading " + doc.title)}
                style={{
                  width: "36px", height: "36px", borderRadius: "10px", background: "#f0fdf4",
                  border: "none", display: "flex", alignItems: "center", justifyOrigin: "center",
                  justifyContent: "center", cursor: "pointer"
                }}
              >
                <DownloadCloud size={18} color="#16a34a" />
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
