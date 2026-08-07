"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Calendar, SlidersHorizontal, Users, 
  ChevronLeft, ChevronRight, Search, Grid, CheckCircle2, 
  XCircle, Clock, Check 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([
    { id: 1, roll: "Roll No. 1", name: "Aarav Sharma", status: "Present", avatar: "AS", bg: "#7c3aed" },
    { id: 2, roll: "Roll No. 2", name: "Diya Verma", status: "Present", avatar: "DV", bg: "#ec4899" },
    { id: 3, roll: "Roll No. 3", name: "Rohan Singh", status: "Absent", avatar: "RS", bg: "#3b82f6" },
    { id: 4, roll: "Roll No. 4", name: "Ananya Gupta", status: "Present", avatar: "AG", bg: "#10b981" },
    { id: 5, roll: "Roll No. 5", name: "Kunal Patel", status: "Present", avatar: "KP", bg: "#f59e0b" },
    { id: 6, roll: "Roll No. 6", name: "Meera Joshi", status: "Present", avatar: "MJ", bg: "#8b5cf6" },
  ]);

  const toggleStatus = (id: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === "Present" ? "Absent" : "Present";
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleMarkAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, status: "Present" })));
  };

  const totalCount = students.length;
  const presentCount = students.filter(s => s.status === "Present").length;
  const absentCount = students.filter(s => s.status === "Absent").length;

  const filteredStudents = students.filter(s => 
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
            Attendance
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button type="button" style={{ background: "none", border: "none", color: "var(--card-text)", cursor: "pointer", padding: 2 }}>
            <Calendar size={20} />
          </button>
          <button type="button" style={{ background: "none", border: "none", color: "var(--card-text)", cursor: "pointer", padding: 2 }}>
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>
        
        {/* 2. PURPLE CLASS BANNER */}
        <div style={{
          borderRadius: "22px",
          padding: "1.2rem 1.3rem",
          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 25px rgba(124, 58, 237, 0.3)"
        }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 900, margin: 0 }}>
              Class 8 - A
            </h2>
            <p style={{ fontSize: "0.82rem", opacity: 0.9, fontWeight: 600, marginTop: 2 }}>
              Mathematics
            </p>
          </div>

          <div style={{
            width: 44,
            height: 44,
            borderRadius: "14px",
            background: "rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Users size={22} color="#ffffff" />
          </div>
        </div>

        {/* 3. DATE NAVIGATOR */}
        <div className="card-white" style={{
          padding: "0.75rem 1rem",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <button type="button" style={{ background: "none", border: "none", color: "var(--card-subtext)", cursor: "pointer" }}>
            <ChevronLeft size={20} />
          </button>

          <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--card-text)" }}>
            Today, 20 May 2024
          </div>

          <button type="button" style={{ background: "none", border: "none", color: "var(--card-subtext)", cursor: "pointer" }}>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* 4. STAT SUMMARY BOXES */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
          <div className="card-white" style={{ padding: "0.85rem 0.5rem", borderRadius: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#3b82f6" }}>{totalCount}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)", fontWeight: 700, marginTop: 2 }}>Total</div>
          </div>
          <div className="card-white" style={{ padding: "0.85rem 0.5rem", borderRadius: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#10b981" }}>{presentCount}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)", fontWeight: 700, marginTop: 2 }}>Present</div>
          </div>
          <div className="card-white" style={{ padding: "0.85rem 0.5rem", borderRadius: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#ef4444" }}>{absentCount}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)", fontWeight: 700, marginTop: 2 }}>Absent</div>
          </div>
        </div>

        {/* 5. SEARCH BAR */}
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

        {/* 6. STUDENT ATTENDANCE LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {filteredStudents.map((st) => {
            const isPresent = st.status === "Present";
            return (
              <div 
                key={st.id} 
                onClick={() => toggleStatus(st.id)}
                className="card-white" 
                style={{
                  padding: "0.9rem 1.1rem",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
                }}
              >
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

                {/* Status Badge */}
                <div style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "99px",
                  background: isPresent ? "#dcfce7" : "#fee2e2",
                  color: isPresent ? "#15803d" : "#b91c1c",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem"
                }}>
                  <span>{st.status}</span>
                  {isPresent ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* 7. BOTTOM ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
          <button
            type="button"
            onClick={handleMarkAllPresent}
            style={{
              flex: 1,
              padding: "0.85rem",
              borderRadius: "16px",
              background: "var(--card-bg)",
              border: "1.5px solid #7c3aed",
              color: "#7c3aed",
              fontSize: "0.82rem",
              fontWeight: 800,
              cursor: "pointer"
            }}
          >
            Mark All Present
          </button>

          <button
            type="button"
            onClick={() => alert("Attendance Saved Successfully!")}
            style={{
              flex: 1,
              padding: "0.85rem",
              borderRadius: "16px",
              background: "#7c3aed",
              border: "none",
              color: "#ffffff",
              fontSize: "0.82rem",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(124, 58, 237, 0.35)"
            }}
          >
            Save Attendance
          </button>
        </div>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
