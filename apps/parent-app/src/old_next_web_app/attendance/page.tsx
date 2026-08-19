"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  ChevronDown 
} from "lucide-react";

interface AttendancePageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function AttendancePage({ language = "en", onNavigate }: AttendancePageProps) {
  const [selectedMonth, setSelectedMonth] = useState("This Month");
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%",
      width: "100%"
    }}>

      {/* ════════════ TOP HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem",
        borderBottom: "1px solid #f1f5f9"
      }}>
        {/* Left Side: Back Arrow + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("home") : window.history.back()}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0",
              color: "#0f172a"
            }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>

          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "'Outfit', sans-serif"
          }}>
            Attendance Analytics
          </h1>
        </div>

        {/* Right Side: Calendar Icon */}
        <button
          type="button"
          onClick={() => alert("Open Calendar Agenda...")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.2rem",
            color: "#0f172a"
          }}
        >
          <Calendar size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ MONTH FILTER SELECTOR ════════════ */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowMonthDropdown(!showMonthDropdown)}
          style={{
            width: "100%",
            background: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            padding: "0.8rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <span style={{ fontWeight: 700, color: "#1e3a8a", outline: "none", width: "100%", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{selectedMonth}</span>
            <ChevronDown size={18} color="#64748b" style={{ transform: showMonthDropdown ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </span>
        </button>

        {showMonthDropdown && (
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #cbd5e1",
            boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
            marginTop: "0.4rem",
            zIndex: 20,
            overflow: "hidden"
          }}>
            {["This Month", "Previous Month", "April 2025"].map((month) => (
              <div
                key={month}
                onClick={() => {
                  setSelectedMonth(month);
                  setShowMonthDropdown(false);
                }}
                style={{
                  padding: "0.8rem 1.1rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: selectedMonth === month ? "#1d4ed8" : "#475569",
                  background: selectedMonth === month ? "#f8fafc" : "#ffffff",
                  cursor: "pointer"
                }}
              >
                {month}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ════════════ OVERALL ATTENDANCE CARD ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
        borderRadius: "22px",
        padding: "1.35rem 1.25rem",
        color: "#ffffff",
        boxShadow: "0 10px 25px rgba(29, 78, 216, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Left Side Overall stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", width: "100%" }}>
          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#bfdbfe" }}>
            Overall Attendance
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {/* Circle Progress Gauge */}
            <div style={{ position: "relative", width: "82px", height: "82px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="82" height="82" viewBox="0 0 84 84">
                <circle cx="42" cy="42" r="34" stroke="rgba(255,255,255,0.15)" strokeWidth="8" fill="none" />
                <circle cx="42" cy="42" r="34" stroke="#22c55e" strokeWidth="8" strokeDasharray="213" strokeDashoffset={213 - (213 * 92) / 100} fill="none" strokeLinecap="round" transform="rotate(-90 42 42)" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontWeight: 800 }}>
                92%
              </div>
            </div>

            {/* Attendance Legends */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", fontWeight: 700 }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
                  <span>Present</span>
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>22 Days</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", fontWeight: 700 }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
                  <span>Absent</span>
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>2 Days</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", fontWeight: 700 }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308" }} />
                  <span>Leave</span>
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>1 Day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ MONTHLY OVERVIEW BAR CHART ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
          Monthly Overview
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          padding: "1.25rem 1.15rem 1.6rem 2rem",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <svg width="100%" height="120" viewBox="0 0 320 120" style={{ overflow: "visible" }}>
            <line x1="0" y1="20" x2="320" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="65" x2="320" y2="65" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="110" x2="320" y2="110" stroke="#f1f5f9" strokeWidth="1" />
            
            <text x="-8" y="24" textAnchor="end" fill="#94a3b8" fontSize="8.5" fontWeight="700">100%</text>
            <text x="-8" y="69" textAnchor="end" fill="#94a3b8" fontSize="8.5" fontWeight="700">50%</text>
            <text x="-8" y="114" textAnchor="end" fill="#94a3b8" fontSize="8.5" fontWeight="700">0%</text>
            
            {/* Days bars */}
            <rect x="15" y="30" width="8" height="80" rx="2.5" fill="#22c55e" />
            <rect x="35" y="55" width="8" height="55" rx="2.5" fill="#22c55e" />
            <rect x="55" y="20" width="8" height="90" rx="2.5" fill="#22c55e" />
            <rect x="75" y="80" width="8" height="30" rx="2.5" fill="#ef4444" />
            <rect x="95" y="20" width="8" height="90" rx="2.5" fill="#22c55e" />
            <rect x="115" y="60" width="8" height="50" rx="2.5" fill="#22c55e" />
            <rect x="135" y="90" width="8" height="20" rx="2.5" fill="#eab308" />
            <rect x="155" y="45" width="8" height="65" rx="2.5" fill="#22c55e" />
            <rect x="175" y="30" width="8" height="80" rx="2.5" fill="#22c55e" />
            <rect x="195" y="20" width="8" height="90" rx="2.5" fill="#22c55e" />
            <rect x="215" y="50" width="8" height="60" rx="2.5" fill="#22c55e" />
            <rect x="235" y="35" width="8" height="75" rx="2.5" fill="#22c55e" />
            <rect x="255" y="100" width="8" height="10" rx="2.5" fill="#eab308" />
            <rect x="275" y="45" width="8" height="65" rx="2.5" fill="#22c55e" />
            <rect x="295" y="60" width="8" height="50" rx="2.5" fill="#22c55e" />

            <text x="19" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="700">1</text>
            <text x="59" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="700">5</text>
            <text x="99" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="700">10</text>
            <text x="139" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="700">15</text>
            <text x="179" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="700">20</text>
            <text x="219" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="700">25</text>
            <text x="259" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="700">30</text>
          </svg>
        </div>
      </div>

      {/* ════════════ ATTENDANCE SUMMARY SECTION ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
          Attendance Summary
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
          <div style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "14px",
            padding: "0.85rem",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#15803d", fontFamily: "'Outfit', sans-serif" }}>22</div>
            <div style={{ fontSize: "0.72rem", color: "#166534", fontWeight: 700, marginTop: "2px" }}>Present</div>
          </div>

          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "14px",
            padding: "0.85rem",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#dc2626", fontFamily: "'Outfit', sans-serif" }}>2</div>
            <div style={{ fontSize: "0.72rem", color: "#991b1b", fontWeight: 700, marginTop: "2px" }}>Absent</div>
          </div>

          <div style={{
            background: "#fffbeb",
            border: "1px solid #fef3c7",
            borderRadius: "14px",
            padding: "0.85rem",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#d97706", fontFamily: "'Outfit', sans-serif" }}>1</div>
            <div style={{ fontSize: "0.72rem", color: "#92400e", fontWeight: 700, marginTop: "2px" }}>Leave</div>
          </div>
        </div>
      </div>

    </div>
  );
}
