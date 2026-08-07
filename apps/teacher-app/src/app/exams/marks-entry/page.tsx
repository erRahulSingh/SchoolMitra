"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, SlidersHorizontal, Search, Grid } from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function MarksEntryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([
    { id: 1, roll: "Roll No. 1", name: "Aarav Sharma", marks: "18", maxMarks: 20, avatar: "AS", bg: "#7c3aed" },
    { id: 2, roll: "Roll No. 2", name: "Diya Verma", marks: "16", maxMarks: 20, avatar: "DV", bg: "#ec4899" },
    { id: 3, roll: "Roll No. 3", name: "Rohan Singh", marks: "12", maxMarks: 20, avatar: "RS", bg: "#3b82f6" },
    { id: 4, roll: "Roll No. 4", name: "Ananya Gupta", marks: "19", maxMarks: 20, avatar: "AG", bg: "#10b981" },
    { id: 5, roll: "Roll No. 5", name: "Kunal Patel", marks: "15", maxMarks: 20, avatar: "KP", bg: "#f59e0b" },
    { id: 6, roll: "Roll No. 6", name: "Meera Joshi", marks: "17", maxMarks: 20, avatar: "MJ", bg: "#8b5cf6" },
  ]);

  const updateMarks = (id: number, val: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, marks: val } : s));
  };

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.roll.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Marks Entry
          </h1>
        </div>

        <button type="button" style={{ background: "none", border: "none", color: "var(--card-text)", cursor: "pointer", padding: 2 }}>
          <SlidersHorizontal size={20} />
        </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>
        
        {/* 2. PURPLE TEST CARD */}
        <div style={{
          borderRadius: "22px",
          padding: "1.25rem 1.3rem",
          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          boxShadow: "0 10px 25px rgba(124, 58, 237, 0.3)"
        }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 900, margin: 0 }}>
            Maths - Unit Test
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", opacity: 0.9, fontWeight: 600 }}>
            <span>Class 8 - A</span>
            <span>📅 24 May 2024</span>
          </div>
        </div>

        {/* 3. STATS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
          <div className="card-white" style={{ padding: "0.9rem", borderRadius: "18px", textAlign: "center" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#3b82f6" }}>42</div>
            <div style={{ fontSize: "0.72rem", color: "var(--card-subtext)", fontWeight: 700, marginTop: 2 }}>Total Students</div>
          </div>

          <div className="card-white" style={{ padding: "0.9rem", borderRadius: "18px", textAlign: "center" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#10b981" }}>16/20</div>
            <div style={{ fontSize: "0.72rem", color: "var(--card-subtext)", fontWeight: 700, marginTop: 2 }}>Average Marks</div>
          </div>
        </div>

        {/* 4. SEARCH BAR */}
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <div className="card-white" style={{
            flex: 1,
            padding: "0.65rem 0.9rem",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem"
          }}>
            <Search size={18} color="var(--card-subtext)" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student..." 
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                color: "var(--card-text)",
                fontSize: "0.85rem",
                width: "100%"
              }}
            />
          </div>
          <button type="button" className="card-white" style={{
            width: 44,
            height: 44,
            borderRadius: "16px",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--card-text)",
            cursor: "pointer"
          }}>
            <Grid size={18} />
          </button>
        </div>

        {/* 5. MARKS ENTRY LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {filtered.map((st) => (
            <div key={st.id} className="card-white" style={{
              padding: "0.85rem 1.1rem",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: st.bg,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 900
                }}>
                  {st.avatar}
                </div>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "var(--card-text)" }}>
                    {st.id}. {st.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 1 }}>
                    {st.roll}
                  </div>
                </div>
              </div>

              {/* Marks Input Box */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <input 
                  type="number" 
                  value={st.marks}
                  onChange={(e) => updateMarks(st.id, e.target.value)}
                  style={{
                    width: 48,
                    height: 38,
                    borderRadius: "12px",
                    border: "1.5px solid var(--card-border)",
                    background: "var(--bg-shell)",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    fontWeight: 900,
                    color: "var(--card-text)",
                    outline: "none"
                  }}
                />
                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--card-subtext)" }}>
                  /{st.maxMarks}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 6. SAVE MARKS BUTTON */}
        <button
          type="button"
          onClick={() => alert("Marks Saved Successfully!")}
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: "16px",
            background: "#7c3aed",
            border: "none",
            color: "#ffffff",
            fontSize: "0.9rem",
            fontWeight: 900,
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(124, 58, 237, 0.4)",
            marginTop: "0.5rem"
          }}
        >
          Save Marks
        </button>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
