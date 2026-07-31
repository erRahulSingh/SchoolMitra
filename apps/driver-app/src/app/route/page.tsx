"use client";

import React, { useState } from "react";
import { 
  ArrowLeft,
  MapPin,
  Clock,
  Compass,
  Navigation,
  Activity,
  Layers,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  CheckCircle2
} from "lucide-react";

interface RouteStop {
  id: number;
  name: string;
  time: string;
  students: string;
}

export default function RoutePage() {
  const [view, setView] = useState<"details" | "navigation">("details");
  const [voiceGuidance, setVoiceGuidance] = useState(true);

  const stops: RouteStop[] = [
    { id: 1, name: "Maple Park", time: "07:00 AM", students: "3 Students" },
    { id: 2, name: "City Center", time: "07:08 AM", students: "4 Students" },
    { id: 3, name: "Green Valley School", time: "07:15 AM", students: "All Students" }
  ];

  if (view === "navigation") {
    // ════════════ SCREEN 3: NAVIGATION MAP VIEW ════════════
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        color: "#0f172a",
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        background: "#f8fafc",
        position: "relative"
      }}>
        {/* MAP BACKGROUND CONTAINER (FULL VIEWPORT) */}
        <div style={{
          flex: 1,
          background: "#e0f2fe",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Mockup Roads polyline */}
          <svg viewBox="0 0 100 80" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {/* White broad roads */}
            <path d="M10 0 L10 80 M50 0 L50 80 M90 0 L90 80" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
            <path d="M0 20 L100 20 M0 60 L100 60" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
            
            {/* Active Navigation Polyline Route (Blue) */}
            <path d="M50 80 L50 40 L90 40 L90 10" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.5 0.5" />
            
            {/* Destination Pin */}
            <circle cx="90" cy="10" r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
            
            {/* Bus position avatar */}
            <g transform="translate(50, 52)">
              <circle cx="0" cy="0" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
              {/* Little windshield detail */}
              <rect x="-3" y="-3" width="6" height="6" fill="#1e293b" rx="0.5" />
            </g>
          </svg>

          {/* ════════════ TOP NAVIGATION GUIDANCE CARD ════════════ */}
          <div style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            right: "12px",
            background: "#15803d",
            borderRadius: "16px",
            padding: "1rem 1.15rem",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            boxShadow: "0 8px 24px rgba(21, 128, 61, 0.25)",
            zIndex: 10
          }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Navigation size={20} fill="#ffffff" transform="rotate(-90)" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 800 }}>350 m</span>
              <span style={{ fontSize: "0.78rem", color: "#dcfce7", fontWeight: 600 }}>Turn left onto Green Street</span>
            </div>
          </div>

          {/* ════════════ RIGHT OVERLAY ACTION BUTTONS ════════════ */}
          <div style={{
            position: "absolute",
            right: "12px",
            top: "100px",
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            zIndex: 10
          }}>
            {/* Audio Toggle */}
            <button
              onClick={() => setVoiceGuidance(!voiceGuidance)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                cursor: "pointer",
                color: "#475569"
              }}
            >
              {voiceGuidance ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Layers */}
            <button
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                cursor: "pointer",
                color: "#475569"
              }}
            >
              <Layers size={16} />
            </button>

            {/* Plus zoom */}
            <button
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                cursor: "pointer",
                color: "#475569"
              }}
            >
              <Plus size={16} />
            </button>

            {/* Minus zoom */}
            <button
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                cursor: "pointer",
                color: "#475569"
              }}
            >
              <Minus size={16} />
            </button>
          </div>

          {/* ════════════ BOTTOM GUIDANCE INFORMATION PANEL ════════════ */}
          <div style={{
            position: "absolute",
            bottom: "76px",
            left: "12px",
            right: "12px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "1.1rem 1.25rem",
            border: "1px solid #cbd5e1",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            zIndex: 10
          }}>
            {/* Destination Name row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Next Stop</span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b" }}>City Center</span>
                <span style={{ fontSize: "0.74rem", color: "#94a3b8", fontWeight: 500 }}>450 m away</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.15rem" }}>
                <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>ETA</span>
                <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#2563eb" }}>07:08 AM</span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "#f1f5f9" }} />

            {/* Speed & telemetry specs */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700 }}>Speed</span>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b" }}>32 km/h</div>
              </div>

              {/* Speed limit badge circle */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "3px solid #16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.82rem",
                  fontWeight: 900,
                  color: "#1e293b"
                }}>
                  40
                </div>
                <span style={{ fontSize: "0.55rem", color: "#64748b", fontWeight: 700, marginTop: "2px" }}>Speed Limit</span>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700 }}>Distance Left</span>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b" }}>6.2 km</div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════ BOTTOM END NAVIGATION BUTTON ════════════ */}
        <div style={{ padding: "0.85rem 1rem", background: "#ffffff", borderTop: "1px solid #cbd5e1" }}>
          <button
            onClick={() => setView("details")}
            style={{
              width: "100%",
              padding: "0.95rem",
              background: "#ffffff",
              color: "#dc2626",
              border: "1.5px solid #fca5a5",
              borderRadius: "14px",
              fontSize: "0.95rem",
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            End Navigation
          </button>
        </div>
      </div>
    );
  }

  // ════════════ SCREEN 2: ROUTE DETAILS TIMELINE VIEW ════════════
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



      {/* ════════════ TOP ROUTE OVERVIEW CARD ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0b2265 0%, #0d3880 55%, #081a4b 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(11, 34, 101, 0.2)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justify: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, margin: 0, fontFamily: "'Outfit', sans-serif" }}>Route 01 - Morning</h2>
            <p style={{ fontSize: "0.78rem", color: "#93c5fd", fontWeight: 500, margin: "2px 0 0 0" }}>Green Valley Route</p>
          </div>
          <span style={{
            background: "rgba(255, 255, 255, 0.15)",
            color: "#ffffff",
            padding: "0.35rem 0.75rem",
            borderRadius: "99px",
            fontSize: "0.72rem",
            fontWeight: 800
          }}>
            12 Stops
          </span>
        </div>
      </div>

      {/* ════════════ MIDDLE ROAD POLYLINE MINI MAP ════════════ */}
      <div style={{
        height: "150px",
        background: "#e2e8f0",
        borderRadius: "20px",
        border: "1px solid #cbd5e1",
        position: "relative",
        overflow: "hidden"
      }}>
        <svg viewBox="0 0 100 40" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <path d="M5 20 C25 5, 45 35, 75 10 C85 5, 95 30, 95 30" fill="none" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
          <path d="M5 20 C25 5, 45 35, 75 10 C85 5, 95 30, 95 30" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="1.5 1" strokeLinecap="round" />
          
          {/* Pins */}
          <circle cx="5" cy="20" r="2" fill="#16a34a" />
          <circle cx="45" cy="23" r="2.5" fill="#2563eb" />
          <circle cx="75" cy="10" r="2" fill="#ef4444" />
        </svg>
      </div>

      {/* ════════════ ROUTE INFORMATION CARD ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "1.15rem",
        border: "1px solid #cbd5e1",
        boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
      }}>
        <h2 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.85rem" }}>
          Route Information
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600 }}>Total Distance</span>
            <span style={{ fontWeight: 800, color: "#1e293b" }}>18.6 km</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600 }}>Estimated Duration</span>
            <span style={{ fontWeight: 800, color: "#1e293b" }}>45 min</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600 }}>Total Students</span>
            <span style={{ fontWeight: 800, color: "#1e293b" }}>42</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600 }}>Stops</span>
            <span style={{ fontWeight: 800, color: "#1e293b" }}>12</span>
          </div>
        </div>
      </div>

      {/* ════════════ ROUTE STOPS timeline ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "1.15rem",
        border: "1px solid #cbd5e1",
        boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)",
        position: "relative"
      }}>
        <h2 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "1rem" }}>
          Route Stops
        </h2>

        {/* Vertical line connector */}
        <div style={{
          position: "absolute",
          top: "3.2rem",
          bottom: "1.8rem",
          left: "2.1rem",
          width: "2px",
          background: "#e2e8f0"
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative" }}>
          {stops.map((stop) => (
            <div key={stop.id} style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#16a34a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 900,
                zIndex: 2
              }}>
                {stop.id}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>{stop.name}</span>
                <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>{stop.time} &bull; {stop.students}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ START NAVIGATION ACTION ════════════ */}
      <div style={{ marginTop: "0.4rem" }}>
        <button
          onClick={() => setView("navigation")}
          style={{
            width: "100%",
            padding: "1.05rem",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            fontSize: "0.95rem",
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)"
          }}
        >
          <span>Start Navigation</span>
        </button>
      </div>

    </div>
  );
}
