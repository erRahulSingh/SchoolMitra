"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, BarChart2, Award } from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ReportCardPage() {
  const [selectedTerm, setSelectedTerm] = useState("Final Term (2023-24)");

  const subjects = [
    { name: "Mathematics", grade: "A+", marks: "92/100", color: "#15803d", bg: "#dcfce7" },
    { name: "Science", grade: "A", marks: "85/100", color: "#15803d", bg: "#dcfce7" },
    { name: "English", grade: "A", marks: "82/100", color: "#15803d", bg: "#dcfce7" },
    { name: "Social Science", grade: "B+", marks: "78/100", color: "#c2410c", bg: "#ffedd5" },
    { name: "Hindi", grade: "A", marks: "88/100", color: "#15803d", bg: "#dcfce7" },
    { name: "Computer", grade: "A+", marks: "95/100", color: "#15803d", bg: "#dcfce7" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "100vh", overflow: "hidden", background: "var(--bg-shell)" }}>
      
      {/* 1. TOP HEADER */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 1.1rem 0.6rem 1.1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <Link href="/dashboard" style={{ color: "var(--card-text)" }}>
            <ArrowLeft size={22} strokeWidth={2.4} />
          </Link>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
            Report Card
          </h1>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>
        
        {/* 2. STUDENT PURPLE HEADER CARD */}
        <div style={{
          borderRadius: "22px",
          padding: "1.2rem 1.3rem",
          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          gap: "1.1rem",
          boxShadow: "0 10px 25px rgba(124, 58, 237, 0.3)"
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#ffffff",
            color: "#7c3aed",
            fontSize: "1.3rem",
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
          }}>
            AS
          </div>

          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, margin: 0 }}>
              Aarav Sharma
            </h2>
            <div style={{ fontSize: "0.78rem", opacity: 0.9, fontWeight: 600, marginTop: 2 }}>
              Class 8 - A
            </div>
            <div style={{ fontSize: "0.72rem", opacity: 0.8, fontWeight: 600, marginTop: 1 }}>
              Roll No. 1
            </div>
          </div>
        </div>

        {/* 3. TERM SELECT DROPDOWN */}
        <div className="card-white" style={{
          padding: "0.75rem 1.1rem",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer"
        }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--card-text)" }}>
            {selectedTerm}
          </span>
          <ChevronDown size={18} color="var(--card-subtext)" />
        </div>

        {/* 4. OVERALL PERFORMANCE SECTION */}
        <div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--card-text)", marginBottom: "0.75rem" }}>
            Overall Performance
          </h3>

          <div className="card-white" style={{
            padding: "1.1rem 1.25rem",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                border: "3px solid #10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                fontWeight: 900,
                color: "#10b981"
              }}>
                A
              </div>

              <div>
                <div style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)" }}>
                  Excellent
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--card-subtext)", fontWeight: 700, marginTop: 2 }}>
                  CGPA: 8.6/10
                </div>
              </div>
            </div>

            <div style={{ color: "#10b981" }}>
              <BarChart2 size={32} strokeWidth={2.2} />
            </div>
          </div>
        </div>

        {/* 5. SUBJECT WISE PERFORMANCE */}
        <div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--card-text)", marginBottom: "0.75rem" }}>
            Subject Wise Performance
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {subjects.map((sub, idx) => (
              <div key={idx} className="card-white" style={{
                padding: "0.9rem 1.1rem",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
              }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--card-text)" }}>
                  {sub.name}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <span style={{
                    padding: "0.25rem 0.65rem",
                    borderRadius: "99px",
                    background: sub.bg,
                    color: sub.color,
                    fontSize: "0.72rem",
                    fontWeight: 900
                  }}>
                    {sub.grade}
                  </span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--card-text)" }}>
                    {sub.marks}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. VIEW DETAILED REPORT BUTTON */}
        <button
          type="button"
          onClick={() => alert("Loading Detailed PDF Report...")}
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: "16px",
            background: "var(--card-bg)",
            border: "1.5px solid #7c3aed",
            color: "#7c3aed",
            fontSize: "0.88rem",
            fontWeight: 800,
            cursor: "pointer",
            marginTop: "0.5rem"
          }}
        >
          View Detailed Report
        </button>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
