"use client";

import React, { useState } from "react";
import { 
  ArrowLeft,
  Filter,
  Search,
  CheckCircle2,
  XCircle,
  Calendar,
  Activity
} from "lucide-react";

interface StudentAttendanceRecord {
  id: string;
  name: string;
  class: string;
  rollNo: string;
  pickedTime?: string;
  droppedTime?: string;
  status: "Present" | "Absent";
}

export default function StudentAttendancePage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  const records: StudentAttendanceRecord[] = [
    { id: "1", name: "Aarav Sharma", class: "Class 5 - A", rollNo: "Roll No. 12", pickedTime: "07:10 AM", droppedTime: "07:50 AM", status: "Present" },
    { id: "2", name: "Siya Patel", class: "Class 5 - A", rollNo: "Roll No. 15", pickedTime: "07:11 AM", droppedTime: "07:51 AM", status: "Present" },
    { id: "3", name: "Vivaan Singh", class: "Class 5 - A", rollNo: "Roll No. 18", pickedTime: "07:12 AM", droppedTime: "07:52 AM", status: "Present" },
    { id: "4", name: "Ananya Verma", class: "Class 5 - B", rollNo: "Roll No. 21", pickedTime: "07:13 AM", status: "Absent" },
    { id: "5", name: "Rohan Mehta", class: "Class 5 - B", rollNo: "Roll No. 24", pickedTime: "07:14 AM", status: "Absent" }
  ];

  const filteredRecords = records.filter(s => 
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



      {/* ════════════ DATE NAVIGATOR ROW ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        background: "#ffffff",
        border: "1px solid #cbd5e1",
        borderRadius: "14px",
        padding: "0.75rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.02)"
      }}>
        <Calendar size={16} color="#64748b" />
        <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>15 May 2025</span>
      </div>

      {/* ════════════ COUNTERS GRID ROW ════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.55rem" }}>
        {/* Total */}
        <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "14px", padding: "0.65rem 0.25rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.6rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Total</span>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1e3a8a", marginTop: "2px" }}>42</div>
        </div>
        {/* Picked */}
        <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "14px", padding: "0.65rem 0.25rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.6rem", color: "#059669", fontWeight: 700, textTransform: "uppercase" }}>Picked</span>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#065f46", marginTop: "2px" }}>42</div>
        </div>
        {/* Dropped */}
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "14px", padding: "0.65rem 0.25rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.6rem", color: "#2563eb", fontWeight: 700, textTransform: "uppercase" }}>Dropped</span>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1d4ed8", marginTop: "2px" }}>40</div>
        </div>
        {/* Absent */}
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "14px", padding: "0.65rem 0.25rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.6rem", color: "#ef4444", fontWeight: 700, textTransform: "uppercase" }}>Absent</span>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#991b1b", marginTop: "2px" }}>2</div>
        </div>
      </div>

      {/* ════════════ ROUTE SUB-HEADER ════════════ */}
      <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 800, margin: "0.1rem 0" }}>
        Route: Route 01 - Morning
      </div>

      {/* ════════════ SEARCH INPUT ════════════ */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search student"
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

      {/* ════════════ ATTENDANCE ROSTER DETAILS ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filteredRecords.map((rec) => (
          <div
            key={rec.id}
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "1rem 1.15rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1e293b" }}>{rec.name}</span>
                <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>{rec.class} &bull; {rec.rollNo}</span>
              </div>
            </div>

            {/* Status logs block */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              {rec.status === "Present" ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.15rem", fontSize: "0.72rem" }}>
                  <span style={{ color: "#16a34a", fontWeight: 800, background: "#dcfce7", padding: "0.15rem 0.45rem", borderRadius: "6px" }}>
                    Picked: {rec.pickedTime}
                  </span>
                  {rec.droppedTime && (
                    <span style={{ color: "#2563eb", fontWeight: 800, background: "#eff6ff", padding: "0.15rem 0.45rem", borderRadius: "6px" }}>
                      Dropped: {rec.droppedTime}
                    </span>
                  )}
                </div>
              ) : (
                <span style={{
                  background: "#fee2e2",
                  color: "#ef4444",
                  padding: "0.3rem 0.65rem",
                  borderRadius: "8px",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "3px"
                }}>
                  <XCircle size={12} fill="#ef4444" color="#ffffff" />
                  Absent
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ════════════ ATTENDANCE STATS RATE CARD (MATCHING SCREENSHOT) ════════════ */}
      <div style={{
        background: "#ffffff",
        border: "1px solid #cbd5e1",
        borderRadius: "20px",
        padding: "1.15rem",
        boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        marginTop: "auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.85rem", fontWeight: 800, color: "#0d3880" }}>
          <Activity size={16} strokeWidth={2.5} />
          <span>Attendance Summary</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", textAlign: "center" }}>
          <div style={{ borderRight: "1px solid #f1f5f9" }}>
            <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#16a34a" }}>100%</div>
            <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 650 }}>Pickup Rate</span>
          </div>
          <div>
            <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#2563eb" }}>95.2%</div>
            <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 650 }}>Drop Rate</span>
          </div>
        </div>
      </div>

    </div>
  );
}
