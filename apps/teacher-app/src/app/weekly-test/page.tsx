"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Award } from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function WeeklyTestPage() {
  const [activeTab, setActiveTab] = useState("All");

  const testList = [
    {
      id: 1,
      title: "Weekly Test - 05",
      class: "Class 8 - A",
      status: "Upcoming",
      statusColor: "#15803d",
      statusBg: "#dcfce7",
      topic: "Linear Equations",
      date: "24 May 2024",
      totalMarks: 20
    },
    {
      id: 2,
      title: "Weekly Test - 04",
      class: "Class 8 - A",
      status: "Completed",
      statusColor: "#1d4ed8",
      statusBg: "#dbeafe",
      topic: "Lines and Angles",
      date: "17 May 2024",
      score: "16/20",
      percent: 80,
      ringColor: "#10b981"
    },
    {
      id: 3,
      title: "Weekly Test - 03",
      class: "Class 8 - A",
      status: "Completed",
      statusColor: "#1d4ed8",
      statusBg: "#dbeafe",
      topic: "Rational Numbers",
      date: "10 May 2024",
      score: "14/20",
      percent: 70,
      ringColor: "#f59e0b"
    },
    {
      id: 4,
      title: "Weekly Test - 06",
      class: "Class 8 - A",
      status: "Draft",
      statusColor: "#c2410c",
      statusBg: "#ffedd5",
      topic: "Triangles",
      date: "Not set",
      totalMarks: 20
    }
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
            Weekly Test
          </h1>
        </div>

        <Link href="/weekly-test/create" style={{
          width: 38,
          height: 38,
          borderRadius: "12px",
          background: "#7c3aed",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          boxShadow: "0 4px 14px rgba(124, 58, 237, 0.35)"
        }}>
          <Sparkles size={20} />
        </Link>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>
        
        {/* 2. FILTER PILLS */}
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {["All", "Upcoming", "Completed", "Draft"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "99px",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  border: "none",
                  background: isActive ? "#7c3aed" : "var(--card-bg)",
                  color: isActive ? "#ffffff" : "var(--card-subtext)",
                  boxShadow: isActive ? "0 4px 14px rgba(124, 58, 237, 0.3)" : "0 2px 8px rgba(0,0,0,0.03)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 3. TEST CARDS LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {testList.map((test) => (
            <div key={test.id} className="card-white" style={{
              padding: "1.1rem 1.2rem",
              borderRadius: "22px",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
            }}>
              {/* Header Row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "14px",
                    background: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Award size={22} strokeWidth={2.2} />
                  </div>

                  <div>
                    <h3 style={{ fontSize: "0.98rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
                      {test.title}
                    </h3>
                    <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                      {test.class}
                    </div>
                  </div>
                </div>

                <span style={{
                  padding: "0.25rem 0.65rem",
                  borderRadius: "99px",
                  background: test.statusBg,
                  color: test.statusColor,
                  fontSize: "0.68rem",
                  fontWeight: 800
                }}>
                  {test.status}
                </span>
              </div>

              {/* Topic Subtitle */}
              <div style={{ fontSize: "0.85rem", color: "var(--card-text)", fontWeight: 700 }}>
                Topic: <span style={{ fontWeight: 600 }}>{test.topic}</span>
              </div>

              {/* Bottom Row Stats & Progress */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.6rem",
                borderTop: "1px solid var(--card-border)",
                fontSize: "0.75rem"
              }}>
                <div>
                  <div style={{ color: "var(--card-subtext)", fontWeight: 600 }}>Date</div>
                  <div style={{ fontWeight: 800, color: "var(--card-text)", marginTop: 2 }}>{test.date}</div>
                </div>

                {test.percent ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div>
                      <div style={{ color: "var(--card-subtext)", fontWeight: 600, textAlign: "right" }}>Avg. Score</div>
                      <div style={{ fontWeight: 800, color: "var(--card-text)", marginTop: 2, textAlign: "right" }}>{test.score}</div>
                    </div>
                    
                    <div style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      border: `3px solid ${test.ringColor}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.72rem",
                      fontWeight: 900,
                      color: "var(--card-text)"
                    }}>
                      {test.percent}%
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ color: "var(--card-subtext)", fontWeight: 600, textAlign: "right" }}>Total Marks</div>
                    <div style={{ fontWeight: 800, color: "var(--card-text)", marginTop: 2, textAlign: "right" }}>{test.totalMarks}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
