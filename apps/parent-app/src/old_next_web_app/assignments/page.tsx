"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  CalendarDays, 
  FileText, 
  FlaskConical, 
  Lightbulb, 
  Monitor, 
  X, 
  Upload, 
  Download, 
  CheckCircle2, 
  Clock 
} from "lucide-react";

interface AssignmentsPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function AssignmentsPage({ language = "en", onNavigate }: AssignmentsPageProps) {
  const isHi = language === "hi";

  const [activeTab, setActiveTab] = useState<"All" | "Upcoming" | "Submitted" | "Graded">("All");
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const t = {
    title: isHi ? "असाइनमेंट" : "Assignments",
    all: isHi ? "सभी" : "All",
    upcoming: isHi ? "आगामी" : "Upcoming",
    submitted: isHi ? "जमा किया" : "Submitted",
    graded: isHi ? "मूल्यांकन किया" : "Graded",
    dueDate: isHi ? "अंतिम तिथि" : "Due Date",
    close: isHi ? "बंद करें" : "Close",
    submitOnline: isHi ? "ऑनलाइन असाइनमेंट जमा करें" : "Submit Assignment"
  };

  // 4 items matching Screenshot 1
  const assignmentsList = [
    {
      id: 1,
      subject: "Mathematics Project",
      description: "Create a model on 'Types of Triangles'",
      dueDate: "25 May 2025",
      status: "Upcoming",
      iconType: "purple",
      details: "Construct 3D geometrical models of Equilateral, Isosceles, Right-angled and Scalene triangles using chart paper or cardboard."
    },
    {
      id: 2,
      subject: "Science Activity",
      description: "Prepare a working model of Volcano",
      dueDate: "28 May 2025",
      status: "Upcoming",
      iconType: "green",
      details: "Use baking soda, vinegar, and red food coloring to demonstrate volcanic eruption in classroom science lab exhibition."
    },
    {
      id: 3,
      subject: "English Presentation",
      description: "Prepare a presentation on 'The Nation Builders'",
      dueDate: "30 May 2025",
      status: "Upcoming",
      iconType: "orange",
      details: "Create a 5-minute speech and poster chart highlighting contributions of Dr. APJ Abdul Kalam or Rabindranath Tagore."
    },
    {
      id: 4,
      subject: "Computer",
      description: "Make a PPT on 'Uses of Internet'",
      dueDate: "02 Jun 2025",
      status: "Submitted",
      iconType: "blue",
      details: "Design a 5-slide presentation on Web Browsers, E-learning, Online Safety, Email Communication, and Cloud Services."
    }
  ];

  const filteredList = activeTab === "All" 
    ? assignmentsList 
    : assignmentsList.filter(a => a.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ TOP HEADER BAR (EXACT MATCH REFERENCE SCREENSHOT 1) ════════════ */}
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
          aria-label="Calendar Action"
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

      {/* ════════════ 4 CAPSULE FILTER TABS (ALL, UPCOMING, SUBMITTED, GRADED) ════════════ */}
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
          { id: "All", label: t.all },
          { id: "Upcoming", label: t.upcoming },
          { id: "Submitted", label: t.submitted },
          { id: "Graded", label: t.graded }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "0.55rem 0.2rem",
              borderRadius: "99px",
              border: "none",
              background: activeTab === tab.id ? "#1d4ed8" : "transparent",
              color: activeTab === tab.id ? "#ffffff" : "#475569",
              fontSize: "0.82rem",
              fontWeight: activeTab === tab.id ? 800 : 600,
              cursor: "pointer",
              boxShadow: activeTab === tab.id ? "0 4px 12px rgba(29, 78, 216, 0.25)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ════════════ ASSIGNMENT LIST CARDS ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {filteredList.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedAssignment(item)}
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "1.1rem 1.1rem",
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
                    : item.iconType === "orange"
                      ? "#ffedd5"
                      : "#e0f2fe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                {item.iconType === "purple" && (
                  <FileText size={24} color="#9333ea" strokeWidth={2} />
                )}
                {item.iconType === "green" && (
                  <FlaskConical size={24} color="#16a34a" strokeWidth={2} />
                )}
                {item.iconType === "orange" && (
                  <Lightbulb size={24} color="#ea580c" strokeWidth={2} />
                )}
                {item.iconType === "blue" && (
                  <Monitor size={24} color="#0284c7" strokeWidth={2} />
                )}
              </div>

              {/* Text Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                <h3 style={{
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  color: "#0f172a",
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  {item.subject}
                </h3>

                <div style={{ fontSize: "0.82rem", fontWeight: 500, color: "#475569" }}>
                  {item.description}
                </div>

                <div style={{ fontSize: "0.76rem", fontWeight: 500, color: "#64748b", marginTop: "2px" }}>
                  Due Date: {item.dueDate}
                </div>
              </div>
            </div>

            {/* Right Side: Status Badge */}
            <span style={{
              padding: "0.3rem 0.8rem",
              borderRadius: "99px",
              fontSize: "0.75rem",
              fontWeight: 700,
              background: item.status === "Submitted" ? "#e0f2fe" : item.iconType === "purple" ? "#f3e8ff" : item.iconType === "green" ? "#dcfce7" : "#ffedd5",
              color: item.status === "Submitted" ? "#0284c7" : item.iconType === "purple" ? "#9333ea" : item.iconType === "green" ? "#16a34a" : "#ea580c",
              whiteSpace: "nowrap"
            }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* ════════════ ASSIGNMENT DETAIL MODAL DRAWER ════════════ */}
      {selectedAssignment && (
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
                {selectedAssignment.subject}
              </h3>
              <button type="button" onClick={() => setSelectedAssignment(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <div style={{ padding: "1rem", background: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>{selectedAssignment.description}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Due Date: {selectedAssignment.dueDate}</div>
              <div style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.45, marginTop: "6px", paddingTop: "6px", borderTop: "1px solid #e2e8f0" }}>
                <strong>Instructions:</strong> {selectedAssignment.details}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => {
                  alert("Uploading assignment submission file...");
                  setSelectedAssignment(null);
                }}
                style={{
                  flex: 1, padding: "0.75rem", background: "#1d4ed8",
                  border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem"
                }}
              >
                <Upload size={18} />
                <span>{t.submitOnline}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAssignment(null)}
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
