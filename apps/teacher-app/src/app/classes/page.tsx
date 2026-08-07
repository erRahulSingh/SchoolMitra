"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoreVertical, BookOpen, Clock, Users, ChevronRight } from "lucide-react";
import TeacherHeader from "@/components/TeacherHeader";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function MyClassesPage() {
  const [activeFilter, setActiveFilter] = useState("All Classes");

  const classes = [
    { title: "Class 8 - A", subject: "Mathematics", students: 42, progress: 75, color: "#3b82f6" },
    { title: "Class 8 - B", subject: "Mathematics", students: 38, progress: 68, color: "#10b981" },
    { title: "Class 9 - A", subject: "Mathematics", students: 40, progress: 80, color: "#f59e0b" },
    { title: "Class 10 - A", subject: "Mathematics", students: 36, progress: 72, color: "#ec4899" },
  ];

  const schedule = [
    { time: "08:00 AM", subject: "Mathematics", class: "Class 8 - A" },
    { time: "09:30 AM", subject: "Mathematics", class: "Class 8 - B" },
    { time: "11:00 AM", subject: "Mathematics", class: "Class 9 - A" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "100vh", overflow: "hidden", background: "var(--bg-shell)" }}>
      <TeacherHeader 
        title="My Classes" 
        rightAction={
          <button type="button" style={{ background: "none", border: "none", color: "var(--card-text)", cursor: "pointer", padding: 4 }}>
            <MoreVertical size={20} />
          </button>
        } 
      />
      
      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>

        {/* 2. FILTER PILLS */}
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {["All Classes", "Subjects", "Timetable"].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
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
                {filter}
              </button>
            );
          })}
        </div>

        {/* 3. CLASS CARDS WITH PROGRESS CIRCLE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {classes.map((cls, idx) => (
            <div key={idx} className="card-white" style={{
              padding: "1.1rem 1.2rem",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "16px",
                  background: "rgba(124, 58, 237, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7c3aed"
                }}>
                  <BookOpen size={24} strokeWidth={2} />
                </div>

                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
                    {cls.title}
                  </h3>
                  <div style={{ fontSize: "0.78rem", color: "var(--card-subtext)", fontWeight: 700, marginTop: 2 }}>
                    {cls.subject}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                    Students: {cls.students}
                  </div>
                </div>
              </div>

              {/* Circular Progress Badge */}
              <div style={{
                position: "relative",
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: `conic-gradient(${cls.color} ${cls.progress}%, #e2e8f0 0)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "var(--card-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  color: "var(--card-text)"
                }}>
                  {cls.progress}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. TODAY'S SCHEDULE SECTION */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
              Today's Schedule
            </h3>
            <Link href="/schedule" style={{ fontSize: "0.78rem", fontWeight: 800, color: "#7c3aed", textDecoration: "none" }}>
              View All
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {schedule.map((item, idx) => (
              <div key={idx} className="card-white" style={{
                padding: "0.9rem 1.1rem",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--card-text)" }}>
                  {item.time}
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--card-text)", textAlign: "right" }}>
                    {item.subject}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--card-subtext)", fontWeight: 600, textAlign: "right", marginTop: 2 }}>
                    {item.class}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
