"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  MoreVertical,
  Trophy,
  Milestone,
  Clock,
  Users,
  CheckCircle2,
  FileText
} from "lucide-react";

interface TripSummaryPageProps {
  language?: string;
  onNavigate?: (tab: string) => void;
}

export default function TripSummaryPage({ onNavigate }: TripSummaryPageProps) {
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    alert("Trip details submitted successfully! Back to duty dashboard.");
    if (onNavigate) {
      onNavigate("dashboard");
    }
  };

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

      {/* ════════════ HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("triptimeline")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0" }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            End Trip Summary
          </h1>
        </div>

        <button
          type="button"
          onClick={() => alert("Summary Options")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0.2rem" }}
        >
          <MoreVertical size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ TOP CONGRATS PANEL ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
        borderRadius: "20px",
        padding: "1.45rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(34, 197, 94, 0.25)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.65rem"
      }}>
        {/* Trophy icon container */}
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fde047"
        }}>
          <Trophy size={30} fill="#fde047" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
            Trip Completed!
          </h2>
          <p style={{ fontSize: "0.78rem", color: "#dcfce7", margin: 0, fontWeight: 500 }}>
            Great job! You completed the trip successfully.
          </p>
        </div>
      </div>

      {/* ════════════ TRIP INFORMATION STACK ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #cbd5e1",
        padding: "1.15rem",
        boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
        display: "flex",
        flexDirection: "column",
        gap: "0.95rem"
      }}>
        {/* Route Header */}
        <div>
          <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1e3a8a" }}>Route 01 - Morning</span>
          <div style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600, marginTop: "1px" }}>Green Valley Route</div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#f1f5f9" }} />

        {/* Grid Stats 2x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
          {/* Stat 1: Total Distance */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0 }}>
              <Milestone size={15} strokeWidth={2.5} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700 }}>Total Distance</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1e293b" }}>18.6 km</span>
            </div>
          </div>

          {/* Stat 2: Total Duration */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", flexShrink: 0 }}>
              <Clock size={15} strokeWidth={2.5} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700 }}>Total Duration</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1e293b" }}>55 min</span>
            </div>
          </div>

          {/* Stat 3: Students Picked */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0 }}>
              <Users size={15} strokeWidth={2.5} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700 }}>Students Picked</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1e293b" }}>42</span>
            </div>
          </div>

          {/* Stat 4: Students Dropped */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", flexShrink: 0 }}>
              <Users size={15} strokeWidth={2.5} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700 }}>Students Dropped</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1e293b" }}>42</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#f1f5f9" }} />

        {/* Details list rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {/* Row 1 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600 }}>Stops Covered</span>
            <span style={{ fontWeight: 800, color: "#1e293b" }}>12 / 12</span>
          </div>

          {/* Row 2 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600 }}>On Time Performance</span>
            <span style={{ fontWeight: 800, color: "#16a34a", display: "flex", alignItems: "center", gap: "2px" }}>
              <CheckCircle2 size={12} fill="#16a34a" color="#ffffff" />
              <span>100%</span>
            </span>
          </div>

          {/* Row 3 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600 }}>Average Speed</span>
            <span style={{ fontWeight: 800, color: "#1e293b" }}>28 km/h</span>
          </div>
        </div>
      </div>

      {/* ════════════ ADD NOTE TEXTAREA box ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        <label style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1e3a8a" }}>Add Note (Optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write any note about the trip..."
          style={{
            width: "100%",
            height: "80px",
            padding: "0.75rem 1rem",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "14px",
            fontSize: "0.85rem",
            outline: "none",
            resize: "none",
            color: "#0f172a",
            fontWeight: 600
          }}
        />
      </div>

      {/* ════════════ SUBMIT ACTION BUTTON ════════════ */}
      <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "1.05rem",
            background: "#1e3a8a",
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
            boxShadow: "0 4px 14px rgba(30, 58, 138, 0.25)"
          }}
        >
          <CheckCircle2 size={18} fill="#ffffff" color="#1e3a8a" />
          <span>End Trip & Submit</span>
        </button>
      </div>

    </div>
  );
}
