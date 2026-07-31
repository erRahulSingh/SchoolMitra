"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Compass, 
  Navigation,
  Activity,
  Milestone,
  CheckCircle2,
  Bus
} from "lucide-react";

export default function LiveNavigationPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [speed, setSpeed] = useState(35);

  // Simulate speed shifts slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next > 40 ? 38 : next < 30 ? 32 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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



      {/* ════════════ TOP WORKFLOW STEPPER CARD ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0b2265 0%, #0d3880 55%, #081a4b 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(11, 34, 101, 0.2)"
      }}>
        {/* Route labels */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, margin: 0, fontFamily: "'Outfit', sans-serif" }}>Route 01 - Morning</h2>
            <p style={{ fontSize: "0.78rem", color: "#93c5fd", fontWeight: 500, margin: "2px 0 0 0" }}>Green Valley Route</p>
          </div>
          <span style={{
            background: "#22c55e",
            color: "#ffffff",
            padding: "0.35rem 0.75rem",
            borderRadius: "99px",
            fontSize: "0.7rem",
            fontWeight: 800
          }}>
            In Progress
          </span>
        </div>

        {/* Stepper Timeline Progress Bar */}
        <div style={{ position: "relative", padding: "0.5rem 0.2rem" }}>
          {/* Connecting Line */}
          <div style={{
            position: "absolute", top: "18px", left: "5%", right: "5%", height: "3px",
            background: "linear-gradient(90deg, #22c55e 30%, rgba(255,255,255,0.2) 30%)", zIndex: 1
          }} />

          {/* Stepper Nodes */}
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
            {/* Node 1 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e", border: "3px solid #0d3880" }} />
              <span style={{ fontSize: "0.62rem", color: "#ffffff", fontWeight: 700 }}>Started</span>
              <span style={{ fontSize: "0.52rem", color: "#93c5fd", fontWeight: 500 }}>07:00 AM</span>
            </div>

            {/* Node 2 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e", border: "3px solid #0d3880" }} />
              <span style={{ fontSize: "0.62rem", color: "#ffffff", fontWeight: 700 }}>In Progress</span>
            </div>

            {/* Node 3 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", border: "3px solid #0d3880" }} />
              <span style={{ fontSize: "0.62rem", color: "#bfdbfe", fontWeight: 700 }}>12 Stops Left</span>
            </div>

            {/* Node 4 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", border: "3px solid #0d3880" }} />
              <span style={{ fontSize: "0.62rem", color: "#bfdbfe", fontWeight: 700 }}>End</span>
              <span style={{ fontSize: "0.52rem", color: "#93c5fd", fontWeight: 500 }}>07:45 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ MAP SECTION (REALISTIC VECTOR GRAPHIC) ════════════ */}
      <div style={{
        height: "220px",
        background: "#e0f2fe",
        borderRadius: "20px",
        border: "1px solid #cbd5e1",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
      }}>
        {/* Draw a realistic vector navigation pathway grid */}
        <svg viewBox="0 0 100 50" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {/* Roads */}
          <path d="M-10 25 C30 20, 60 45, 110 30" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          <path d="M-10 25 C30 20, 60 45, 110 30" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="1.5 1" strokeLinecap="round" />
          
          <path d="M30 -10 L45 60" fill="none" stroke="#ffffff" strokeWidth="6" />
          <path d="M75 -10 L60 60" fill="none" stroke="#ffffff" strokeWidth="6" />
          
          {/* Markers */}
          <circle cx="15" cy="27" r="2.5" fill="#ef4444" />
          <circle cx="92" cy="32" r="2.5" fill="#10b981" />

          {/* Current Bus Pin on the path */}
          <g transform="translate(52, 33)">
            <circle cx="0" cy="0" r="7" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M-3 -3 L3 -3 L3 3 L-3 3 Z" fill="#ffffff" />
          </g>
        </svg>

        {/* Floating Center-Location Compass Button */}
        <button style={{
          position: "absolute", bottom: "12px", right: "12px",
          width: "36px", height: "36px", borderRadius: "50%",
          background: "#ffffff", border: "1px solid #cbd5e1",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)", cursor: "pointer"
        }}>
          <Compass size={18} color="#2563eb" strokeWidth={2.5} />
        </button>
      </div>

      {/* ════════════ 4 METRICS TELEMETRY GRID ════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        {/* Speed */}
        <div style={{
          background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "16px",
          padding: "0.95rem 1.15rem", display: "flex", alignItems: "center", gap: "0.75rem",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
        }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0 }}>
            <Activity size={16} strokeWidth={2.5} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>Current Speed</span>
            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1e293b", marginTop: "1px" }}>{speed} km/h</span>
          </div>
        </div>

        {/* Distance Covered */}
        <div style={{
          background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "16px",
          padding: "0.95rem 1.15rem", display: "flex", alignItems: "center", gap: "0.75rem",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
        }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", flexShrink: 0 }}>
            <Milestone size={16} strokeWidth={2.5} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>Distance Covered</span>
            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1e293b", marginTop: "1px" }}>6.8 km</span>
          </div>
        </div>

        {/* ETA */}
        <div style={{
          background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "16px",
          padding: "0.95rem 1.15rem", display: "flex", alignItems: "center", gap: "0.75rem",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
        }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center", color: "#d97706", flexShrink: 0 }}>
            <Clock size={16} strokeWidth={2.5} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>ETA Next Stop</span>
            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1e293b", marginTop: "1px" }}>5 min</span>
          </div>
        </div>

        {/* Total Distance */}
        <div style={{
          background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "16px",
          padding: "0.95rem 1.15rem", display: "flex", alignItems: "center", gap: "0.75rem",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
        }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#faf5ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#9333ea", flexShrink: 0 }}>
            <MapPin size={16} strokeWidth={2.5} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>Total Distance</span>
            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1e293b", marginTop: "1px" }}>18.6 km</span>
          </div>
        </div>
      </div>

      {/* ════════════ 5. NEXT STOP ROW BAR ════════════ */}
      <div style={{
        background: "#ffffff",
        border: "1px solid #cbd5e1",
        borderRadius: "20px",
        padding: "1.1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
        marginTop: "0.2rem"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>Next Stop</span>
          <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1e293b" }}>Maple Park</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.2rem" }}>
            <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>ETA</span>
            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#2563eb" }}>07:12 AM</span>
          </div>

          {/* Action icon button */}
          <button 
            onClick={() => onNavigate && onNavigate("pickup")}
            style={{
              width: "36px", height: "36px", borderRadius: "50%", background: "#2563eb", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff",
              boxShadow: "0 4px 10px rgba(37, 99, 235, 0.25)", cursor: "pointer"
            }}
          >
            <Navigation size={16} fill="#ffffff" />
          </button>
        </div>
      </div>

    </div>
  );
}
