"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  ChevronDown, 
  MessageSquare,
  Filter
} from "lucide-react";

interface ReportCardPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function ReportCardPage({ language = "en", onNavigate }: ReportCardPageProps) {
  const [selectedTerm, setSelectedTerm] = useState("Term 1 (2024-25)");
  const [showTermDropdown, setShowTermDropdown] = useState(false);

  const subjectScores = [
    { name: "Mathematics", score: "92 / 100", grade: "A+", color: "#16a34a" },
    { name: "Science", score: "88 / 100", grade: "A", color: "#16a34a" },
    { name: "English", score: "85 / 100", grade: "A", color: "#16a34a" },
    { name: "Social Studies", score: "78 / 100", grade: "B+", color: "#ea580c" },
    { name: "Hindi", score: "84 / 100", grade: "A", color: "#16a34a" },
    { name: "Computer", score: "90 / 100", grade: "A+", color: "#16a34a" }
  ];

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%",
      width: "100%"
    }}>

      {/* ════════════ TOP HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem",
        borderBottom: "1px solid #f1f5f9"
      }}>
        {/* Left Side: Back Arrow + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("academics") : window.history.back()}
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
            fontFamily: "'Outfit', sans-serif"
          }}>
            Academic Performance
          </h1>
        </div>

        {/* Right Side: Funnel Filter Icon */}
        <button
          type="button"
          onClick={() => alert("Filter trigger...")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.2rem",
            color: "#0f172a"
          }}
        >
          <Filter size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ TERM SELECTOR DROPDOWN ════════════ */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowTermDropdown(!showTermDropdown)}
          style={{
            width: "100%",
            background: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            padding: "0.8rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "#1e3a8a",
            cursor: "pointer"
          }}
        >
          <span>{selectedTerm}</span>
          <ChevronDown size={18} color="#64748b" style={{ transform: showTermDropdown ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
        </button>

        {showTermDropdown && (
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #cbd5e1",
            boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
            marginTop: "0.4rem",
            zIndex: 20,
            overflow: "hidden"
          }}>
            {["Term 1 (2024-25)", "Term 2 (2024-25)", "Final Annual (2024-25)"].map((term) => (
              <div
                key={term}
                onClick={() => {
                  setSelectedTerm(term);
                  setShowTermDropdown(false);
                }}
                style={{
                  padding: "0.8rem 1.1rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: selectedTerm === term ? "#1d4ed8" : "#475569",
                  background: selectedTerm === term ? "#f8fafc" : "#ffffff",
                  cursor: "pointer"
                }}
              >
                {term}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ════════════ OVERALL SUMMARY CARDS GRID ════════════ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.85rem"
      }}>
        {/* Left Box: Overall Grade */}
        <div style={{
          background: "#faf5ff",
          borderRadius: "18px",
          padding: "1.1rem 0.85rem",
          border: "1px solid #e9d5ff",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#6b21a8" }}>
            Overall Grade
          </span>
          <span style={{
            fontSize: "2.1rem",
            fontWeight: 800,
            color: "#16a34a",
            margin: "0.35rem 0",
            fontFamily: "'Outfit', sans-serif"
          }}>
            A
          </span>
          <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#16a34a" }}>
            Excellent
          </span>
        </div>

        {/* Right Box: Percentage */}
        <div style={{
          background: "#eff6ff",
          borderRadius: "18px",
          padding: "1.1rem 0.85rem",
          border: "1px solid #bfdbfe",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1e40af" }}>
            Percentage
          </span>
          <span style={{
            fontSize: "2.1rem",
            fontWeight: 800,
            color: "#1e3a8a",
            margin: "0.35rem 0",
            fontFamily: "'Outfit', sans-serif"
          }}>
            86.4<span style={{ fontSize: "1.2rem", fontWeight: 700 }}>%</span>
          </span>
        </div>
      </div>

      {/* ════════════ SUBJECT WISE PERFORMANCE TABLE ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{
          fontSize: "0.95rem",
          fontWeight: 800,
          color: "#0f172a",
          fontFamily: "'Outfit', sans-serif"
        }}>
          Subject Wise Performance
        </h2>

        {/* List table */}
        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
          overflow: "hidden"
        }}>
          {/* Table Header */}
          <div style={{
            background: "#f8fafc",
            padding: "0.75rem 1.1rem",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#64748b"
          }}>
            <span style={{ width: "40%" }}>Subject</span>
            <span style={{ width: "35%", textAlign: "center" }}>Marks</span>
            <span style={{ width: "25%", textAlign: "right" }}>Grade</span>
          </div>

          {/* Table Rows */}
          {subjectScores.map((sub, idx) => {
            const isLast = idx === subjectScores.length - 1;
            return (
              <div
                key={idx}
                style={{
                  padding: "0.95rem 1.1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                  fontSize: "0.85rem"
                }}
              >
                <span style={{ width: "40%", fontWeight: 700, color: "#334155" }}>
                  {sub.name}
                </span>
                <span style={{ width: "35%", textAlign: "center", fontWeight: 700, color: "#475569" }}>
                  {sub.score}
                </span>
                <span style={{
                  width: "25%",
                  textAlign: "right",
                  fontWeight: 800,
                  color: sub.color,
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  {sub.grade}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════ TEACHER'S REMARKS CARD ════════════ */}
      <div style={{
        background: "#f1f5f9",
        borderRadius: "20px",
        padding: "1.1rem 1.15rem",
        border: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.85rem",
        marginTop: "0.25rem"
      }}>
        {/* Soft Blue Speech Bubble Circle */}
        <div style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: "#e0f2fe",
          color: "#2563eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          <MessageSquare size={20} strokeWidth={2.2} fill="#e0f2fe" />
        </div>

        {/* Remarks Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <h3 style={{
            fontSize: "0.88rem",
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "'Outfit', sans-serif",
            margin: 0
          }}>
            Teacher's Remarks
          </h3>
          <p style={{
            fontSize: "0.8rem",
            color: "#475569",
            lineHeight: 1.45,
            fontWeight: 500,
            margin: 0
          }}>
            Rohan is a bright student with excellent understanding and consistent performance.
          </p>
        </div>
      </div>

    </div>
  );
}
