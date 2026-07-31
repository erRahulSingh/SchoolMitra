"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Filter, 
  Search, 
  Check, 
  UserMinus, 
  CornerUpRight,
  UserCheck
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  class: string;
  rollNo: string;
  status: "Picked" | "Absent" | "Pending";
  time?: string;
  avatarUrl: string;
}

interface StudentPickupPageProps {
  language?: string;
  onNavigate?: (tab: string) => void;
}

export default function StudentPickupPage({ onNavigate }: StudentPickupPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"All" | "Picked" | "Pending" | "Absent">("All");
  
  // Selected student state for bottom marking actions sheet ( Vivaan Singh selected by default)
  const [selectedStudentId, setSelectedStudentId] = useState<string>("s3");

  const [students, setStudents] = useState<Student[]>([
    {
      id: "s1",
      name: "Aarav Sharma",
      class: "Class 5 - A",
      rollNo: "Roll No. 12",
      status: "Picked",
      time: "07:10 AM",
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"
    },
    {
      id: "s2",
      name: "Siya Patel",
      class: "Class 5 - A",
      rollNo: "Roll No. 15",
      status: "Picked",
      time: "07:11 AM",
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"
    },
    {
      id: "s3",
      name: "Vivaan Singh",
      class: "Class 5 - A",
      rollNo: "Roll No. 18",
      status: "Pending",
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"
    }
  ]);

  const handleMarkStatus = (id: string, newStatus: "Picked" | "Absent" | "Pending") => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: newStatus,
          time: newStatus === "Pending" ? undefined : nowTime
        };
      }
      return s;
    }));
  };

  // Filter count labels
  const pickedCount = students.filter(s => s.status === "Picked").length;
  const pendingCount = students.filter(s => s.status === "Pending").length;
  const absentCount = students.filter(s => s.status === "Absent").length;

  const filteredStudents = students.filter(s => {
    // Tab filter
    if (filterTab === "Picked" && s.status !== "Picked") return false;
    if (filterTab === "Pending" && s.status !== "Pending") return false;
    if (filterTab === "Absent" && s.status !== "Absent") return false;

    // Search query filter
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
            Stop 3 of 12
          </span>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff", fontFamily: "'Outfit', sans-serif" }}>
            Maple Park
          </span>
          <span style={{ fontSize: "0.74rem", color: "#bfdbfe", marginTop: "1px", fontWeight: 500 }}>
            ETA: 07:12 AM &bull; 3 Students
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
          On Time
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

        {/* Picked Pill */}
        <button
          onClick={() => setFilterTab("Picked")}
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "99px",
            border: filterTab === "Picked" ? "none" : "1px solid #cbd5e1",
            background: filterTab === "Picked" ? "#2563eb" : "#ffffff",
            color: filterTab === "Picked" ? "#ffffff" : "#64748b",
            fontSize: "0.74rem",
            fontWeight: 800,
            cursor: "pointer"
          }}
        >
          Picked ({pickedCount})
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

        {/* Absent Pill */}
        <button
          onClick={() => setFilterTab("Absent")}
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "99px",
            border: filterTab === "Absent" ? "none" : "1px solid #cbd5e1",
            background: filterTab === "Absent" ? "#2563eb" : "#ffffff",
            color: filterTab === "Absent" ? "#ffffff" : "#64748b",
            fontSize: "0.74rem",
            fontWeight: 800,
            cursor: "pointer"
          }}
        >
          Absent ({absentCount})
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

              {/* Status Badge */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.15rem" }}>
                <span style={{
                  background: st.status === "Picked" ? "#dcfce7" : st.status === "Absent" ? "#fcd5d5" : "#fff9db",
                  color: st.status === "Picked" ? "#16a34a" : st.status === "Absent" ? "#ef4444" : "#d97706",
                  padding: "0.25rem 0.55rem",
                  borderRadius: "8px",
                  fontSize: "0.7rem",
                  fontWeight: 800
                }}>
                  {st.status}
                </span>
                {st.time && (
                  <span style={{ fontSize: "0.65rem", color: "#94a3b8", fontWeight: 600 }}>{st.time}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ════════════ SELECT STUDENT BOTTOM MARKING ACTIONS (MATCHING SCREENSHOT) ════════════ */}
      {selectedStudentId && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.65rem",
          marginTop: "auto",
          paddingTop: "0.5rem"
        }}>
          {/* Mark as Picked Button */}
          <button
            onClick={() => handleMarkStatus(selectedStudentId, "Picked")}
            style={{
              width: "100%",
              padding: "0.95rem",
              background: "#16a34a",
              color: "#ffffff",
              border: "none",
              borderRadius: "14px",
              fontSize: "0.9rem",
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.45rem",
              boxShadow: "0 4px 14px rgba(22, 163, 74, 0.2)"
            }}
          >
            <Check size={16} strokeWidth={3} />
            <span>Mark as Picked</span>
          </button>

          {/* Mark as Absent Button */}
          <button
            onClick={() => handleMarkStatus(selectedStudentId, "Absent")}
            style={{
              width: "100%",
              padding: "0.95rem",
              background: "#fee2e2",
              color: "#ef4444",
              border: "1px solid #fca5a5",
              borderRadius: "14px",
              fontSize: "0.9rem",
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.45rem"
            }}
          >
            <UserMinus size={16} strokeWidth={2.5} />
            <span>Mark as Absent</span>
          </button>

          <button
            onClick={() => {
              handleMarkStatus(selectedStudentId, "Pending");
              if (onNavigate) onNavigate("drop");
            }}
            style={{
              width: "100%",
              padding: "0.95rem",
              background: "#ffffff",
              color: "#64748b",
              border: "1px solid #cbd5e1",
              borderRadius: "14px",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.45rem"
            }}
          >
            <CornerUpRight size={16} />
            <span>Not Picked (Skip)</span>
          </button>
        </div>
      )}

    </div>
  );
}
