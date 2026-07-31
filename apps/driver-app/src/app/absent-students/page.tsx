"use client";

import React, { useState } from "react";
import { 
  ArrowLeft,
  Filter,
  Search,
  Users,
  AlertCircle
} from "lucide-react";

interface AbsentStudent {
  id: string;
  name: string;
  class: string;
  rollNo: string;
  reason: string;
  avatarUrl: string;
  reasonColor: string;
}

export default function AbsentStudentsPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  const absentees: AbsentStudent[] = [
    { id: "a1", name: "Ananya Verma", class: "Class 5 - B", rollNo: "Roll No. 21", reason: "Sick", reasonColor: "#dc2626", avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100" },
    { id: "a2", name: "Kartik Yadav", class: "Class 4 - A", rollNo: "Roll No. 07", reason: "Not Specified", reasonColor: "#d97706", avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100" },
    { id: "a3", name: "Meera Joshi", class: "Class 4 - B", rollNo: "Roll No. 11", reason: "Family Function", reasonColor: "#dc2626", avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100" }
  ];

  const filteredAbsentees = absentees.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      padding: "1rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%"
    }}>



      {/* ════════════ TOP RED HERO CARD BANNER ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(220, 38, 38, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "1.15rem", fontWeight: 850, fontFamily: "'Outfit', sans-serif" }}>
            3 Absent Students
          </span>
          <span style={{ fontSize: "0.78rem", color: "#fca5a5", fontWeight: 600 }}>
            Route 01 - Morning
          </span>
        </div>

        {/* Group graphic frame */}
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "rgba(255, 255, 255, 0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff"
        }}>
          <Users size={24} />
        </div>
      </div>

      {/* ════════════ DATE SUBSECTION LABEL ════════════ */}
      <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 800, margin: "0.1rem 0" }}>
        Date: 15 May 2025
      </div>

      {/* ════════════ SEARCH student INPUT ════════════ */}
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

      {/* ════════════ ABSENT STUDENTS ROSTER ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filteredAbsentees.map((st) => (
          <div
            key={st.id}
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "0.95rem 1.15rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <img
                src={st.avatarUrl}
                alt={st.name}
                onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"; }}
                style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>{st.name}</span>
                <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>{st.class} &bull; {st.rollNo}</span>
              </div>
            </div>

            {/* Reason details */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.15rem" }}>
              <span style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 700 }}>Reason</span>
              <span style={{ fontSize: "0.82rem", fontWeight: 800, color: st.reasonColor }}>
                {st.reason}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════ NOTE CALLOUT CARD ════════════ */}
      <div style={{
        background: "#fff5f5",
        border: "1px solid #fecaca",
        borderRadius: "16px",
        padding: "1.15rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.85rem",
        marginTop: "0.2rem"
      }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "#fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ef4444",
          flexShrink: 0
        }}>
          <AlertCircle size={18} strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#991b1b" }}>Note</span>
          <span style={{ fontSize: "0.76rem", color: "#ef4444", lineHeight: 1.45, fontWeight: 600 }}>
            Please inform school office if any student will be absent for multiple days.
          </span>
        </div>
      </div>

    </div>
  );
}
