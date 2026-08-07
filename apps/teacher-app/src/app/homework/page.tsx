"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, BookOpen, FlaskConical, Languages, Calendar } from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function HomeworkPage() {
  const [activeTab, setActiveTab] = useState("Active");

  const homeworkList = [
    {
      id: 1,
      title: "Maths Homework",
      class: "Class 8 - A",
      status: "Active",
      statusColor: "#15803d",
      statusBg: "#dcfce7",
      desc: "Solve questions 1 to 20 from Chapter 5 - Linear Equations.",
      dueDate: "25 May 2024, 11:59 PM",
      submitted: 32,
      total: 42,
      icon: BookOpen,
      iconColor: "#7c3aed",
      iconBg: "#f3e8ff"
    },
    {
      id: 2,
      title: "Science Homework",
      class: "Class 8 - A",
      status: "Active",
      statusColor: "#15803d",
      statusBg: "#dcfce7",
      desc: "Write short notes on the Human Digestive System.",
      dueDate: "27 May 2024, 11:59 PM",
      submitted: 18,
      total: 42,
      icon: FlaskConical,
      iconColor: "#3b82f6",
      iconBg: "#dbeafe"
    },
    {
      id: 3,
      title: "English Homework",
      class: "Class 8 - A",
      status: "Draft",
      statusColor: "#c2410c",
      statusBg: "#ffedd5",
      desc: 'Write a paragraph on "My Favourite Teacher".',
      dueDate: "Not set",
      submitted: 0,
      total: 42,
      icon: Languages,
      iconColor: "#ec4899",
      iconBg: "#fce7f3"
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
            Homework
          </h1>
        </div>

        <Link href="/homework/create" style={{
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
          <Plus size={22} strokeWidth={2.5} />
        </Link>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>
        
        {/* 2. FILTER PILLS */}
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {["All", "Active", "Submitted", "Draft"].map((tab) => {
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

        {/* 3. HOMEWORK CARDS LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {homeworkList.map((hw) => {
            const IconC = hw.icon;
            return (
              <div key={hw.id} className="card-white" style={{
                padding: "1.1rem 1.2rem",
                borderRadius: "22px",
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
              }}>
                {/* Top Row: Icon, Title, Status & Progress */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: "14px",
                      background: hw.iconBg,
                      color: hw.iconColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <IconC size={22} strokeWidth={2.2} />
                    </div>

                    <div>
                      <h3 style={{ fontSize: "0.98rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
                        {hw.title}
                      </h3>
                      <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                        {hw.class}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{
                      padding: "0.25rem 0.65rem",
                      borderRadius: "99px",
                      background: hw.statusBg,
                      color: hw.statusColor,
                      fontSize: "0.68rem",
                      fontWeight: 800
                    }}>
                      {hw.status}
                    </span>

                    {/* Progress Circle Badge */}
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "3px solid #7c3aed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.72rem",
                      fontWeight: 900,
                      color: "var(--card-text)"
                    }}>
                      {hw.submitted}/{hw.total}
                    </div>
                  </div>
                </div>

                {/* Description Body */}
                <p style={{ fontSize: "0.82rem", color: "var(--card-text)", fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                  {hw.desc}
                </p>

                {/* Footer Due Date */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "0.6rem",
                  borderTop: "1px solid var(--card-border)",
                  fontSize: "0.75rem",
                  color: "var(--card-subtext)",
                  fontWeight: 600
                }}>
                  <span>Due Date</span>
                  <span style={{ fontWeight: 800, color: "var(--card-text)" }}>{hw.dueDate}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
