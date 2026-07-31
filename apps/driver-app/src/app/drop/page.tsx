"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Filter, 
  Search, 
  Check, 
  ArrowRight,
  UserCheck
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  class: string;
  rollNo: string;
  status: "Dropped" | "Pending";
  avatarUrl: string;
}

interface StudentDropPageProps {
  language?: string;
  onNavigate?: (tab: string) => void;
}

export default function StudentDropPage({ onNavigate }: StudentDropPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"All" | "Dropped" | "Pending">("All");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("s3");

  const [students, setStudents] = useState<Student[]>([
    {
      id: "s1",
      name: "Aarav Sharma",
      class: "Class 5 - A",
      rollNo: "Roll No. 12",
      status: "Pending",
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"
    },
    {
      id: "s2",
      name: "Siya Patel",
      class: "Class 5 - A",
      rollNo: "Roll No. 15",
      status: "Pending",
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"
    },
    {
      id: "s3",
      name: "Vivaan Singh",
      class: "Class 5 - A",
      rollNo: "Roll No. 18",
      status: "Pending",
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"
    },
    {
      id: "s4",
      name: "Ananya Verma",
      class: "Class 5 - B",
      rollNo: "Roll No. 21",
      status: "Pending",
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"
    },
    {
      id: "s5",
      name: "Rohan Mehta",
      class: "Class 5 - B",
      rollNo: "Roll No. 24",
      status: "Pending",
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"
    }
  ]);

  const handleMarkDropped = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: "Dropped" } : s));
  };

  const handleDropAll = () => {
    setStudents(prev => prev.map(s => ({ ...s, status: "Dropped" })));
    setTimeout(() => {
      if (onNavigate) {
        onNavigate("triptimeline");
      }
    }, 800);
  };

  const droppedCount = students.filter(s => s.status === "Dropped").length;
  const pendingCount = students.filter(s => s.status === "Pending").length;

  const filteredStudents = students.filter(s => {
    if (filterTab === "Dropped" && s.status !== "Dropped") return false;
    if (filterTab === "Pending" && s.status !== "Pending") return false;
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{
      padding: "1rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%"
    }}>



      {/* ════════════ TOP CURRENT STOP INFORMATION CARD ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0b2265 0%, #0d3880 55%, #081a4b 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(11, 34, 101, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "0.72rem", color: "#93c5fd", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Stop 12 of 12
          </span>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff", fontFamily: "'Outfit', sans-serif" }}>
            Green Valley School
          </span>
          <span style={{ fontSize: "0.74rem", color: "#bfdbfe", marginTop: "1px", fontWeight: 500 }}>
            ETA: 07:45 AM &bull; 22 Students
          </span>
        </div>

        {/* Status indicator badge */}
        <span style={{
          background: "#22c55e",
          color: "#ffffff",
          padding: "0.38rem 0.8rem",
          borderRadius: "99px",
          fontSize: "0.72rem",
          fontWeight: 800
        }}>
          Last Stop
        </span>
      </div>

      {/* ════════════ SEARCH STUDENT INPUT ════════════ */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Student"
          style={{
            width: "100%",
            padding: "0.75rem 2.5rem 0.75rem 1rem",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "14px",
            fontSize: "0.85rem",
            fontWeight: 600,
            outline: "none",
            color: "#0f172a"
          }}
        />
        <Search size={18} color="#94a3b8" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }} />
      </div>

      {/* ════════════ FILTER PILLS ROW ════════════ */}
      <div style={{ display: "flex", gap: "0.45rem", overflowX: "auto" }}>
        {/* All Pill */}
        <button
          onClick={() => setFilterTab("All")}
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "99px",
            border: filterTab === "All" ? "none" : "1px solid #cbd5e1",
            background: filterTab === "All" ? "#2563eb" : "#ffffff",
            color: filterTab === "All" ? "#ffffff" : "#64748b",
            fontSize: "0.74rem",
            fontWeight: 800,
            cursor: "pointer"
          }}
        >
          All ({students.length})
        </button>

        {/* Dropped Pill */}
        <button
          onClick={() => setFilterTab("Dropped")}
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "99px",
            border: filterTab === "Dropped" ? "none" : "1px solid #cbd5e1",
            background: filterTab === "Dropped" ? "#2563eb" : "#ffffff",
            color: filterTab === "Dropped" ? "#ffffff" : "#64748b",
            fontSize: "0.74rem",
            fontWeight: 800,
            cursor: "pointer"
          }}
        >
          Dropped ({droppedCount})
        </button>

        {/* Pending Pill */}
        <button
          onClick={() => setFilterTab("Pending")}
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "99px",
            border: filterTab === "Pending" ? "none" : "1px solid #cbd5e1",
            background: filterTab === "Pending" ? "#2563eb" : "#ffffff",
            color: filterTab === "Pending" ? "#ffffff" : "#64748b",
            fontSize: "0.74rem",
            fontWeight: 800,
            cursor: "pointer"
          }}
        >
          Pending ({pendingCount})
        </button>
      </div>

      {/* ════════════ STUDENT CARDS LIST ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filteredStudents.map((st) => {
          const isSelected = selectedStudentId === st.id;

          return (
            <div
              key={st.id}
              onClick={() => setSelectedStudentId(st.id)}
              style={{
                background: "#ffffff",
                border: isSelected ? "2px solid #2563eb" : "1px solid #cbd5e1",
                borderRadius: "16px",
                padding: "1rem 1.15rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <img
                  src={st.avatarUrl}
                  alt={st.name}
                  onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"; }}
                  style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                  <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1e293b" }}>{st.name}</span>
                  <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>{st.class} &bull; {st.rollNo}</span>
                </div>
              </div>

              {/* Status Action / Label */}
              <div>
                {st.status === "Dropped" ? (
                  <span style={{
                    background: "#dcfce7",
                    color: "#16a34a",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "10px",
                    fontSize: "0.75rem",
                    fontWeight: 800
                  }}>
                    Dropped
                  </span>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkDropped(st.id);
                    }}
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                      borderRadius: "10px",
                      padding: "0.35rem 0.85rem",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      cursor: "pointer"
                    }}
                  >
                    Drop
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ════════════ BOTTOM GLOBAL DROP ACTION ════════════ */}
      <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
        <button
          onClick={handleDropAll}
          style={{
            width: "100%",
            padding: "1.05rem",
            background: "#16a34a",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            fontSize: "0.95rem",
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.55rem",
            boxShadow: "0 4px 14px rgba(22, 163, 74, 0.2)"
          }}
        >
          <UserCheck size={18} fill="#ffffff" color="#ffffff" />
          <span>Drop All Students</span>
        </button>
      </div>

    </div>
  );
}
