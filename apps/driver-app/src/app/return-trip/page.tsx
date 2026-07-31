"use client";

import React, { useState } from "react";
import { 
  Bus, 
  Check, 
  Info, 
  Play,
  ArrowLeft
} from "lucide-react";

export default function ReturnTripPage({ language = "en" }: { language?: string }) {
  // Selection states
  const [selectedRoute, setSelectedRoute] = useState<"r1" | "r2">("r1");
  const [selectedShift, setSelectedShift] = useState<"s1" | "s2">("s1");

  const handleStartTrip = () => {
    alert(`Starting trip! \nRoute: ${selectedRoute === "r1" ? "Route 01" : "Route 02"} \nShift: ${selectedShift === "s1" ? "Morning" : "Afternoon"}`);
  };

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



      {/* ════════════ 1. TOP BUS BANNER (EXACT GRAPHIC) ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0b2265 0%, #0d3880 55%, #081a4b 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem 1.15rem 1.15rem",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(11, 34, 101, 0.25)"
      }}>
        {/* Info label details */}
        <div style={{ maxWidth: "60%", zIndex: 2, position: "relative" }}>
          <h1 style={{
            fontSize: "1.35rem",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Outfit', sans-serif",
            margin: 0,
            letterSpacing: "-0.015em"
          }}>
            UP32 AB 1234
          </h1>
          <p style={{
            fontSize: "0.85rem",
            color: "#93c5fd",
            fontWeight: 500,
            marginTop: "3px",
            margin: 0
          }}>
            Green Valley School Bus
          </p>
        </div>

        {/* Bus Illustration Overlay */}
        <div style={{
          position: "absolute",
          right: "10px",
          top: "15%",
          width: "110px",
          height: "60px",
          pointerEvents: "none",
          zIndex: 1
        }}>
          <svg viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <rect x="1" y="2" width="28" height="13" rx="3" fill="#f59e0b" />
            <rect x="2" y="3" width="26" height="5" fill="#fde047" />
            <rect x="21" y="4" width="7" height="4" rx="0.5" fill="#1e293b" />
            <rect x="4" y="4" width="5" height="4" rx="0.5" fill="#1e293b" />
            <rect x="10" y="4" width="5" height="4" rx="0.5" fill="#1e293b" />
            <rect x="16" y="4" width="4" height="4" rx="0.5" fill="#1e293b" />
            <circle cx="7" cy="15" r="2.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
            <circle cx="23" cy="15" r="2.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
            <rect x="0.5" y="9.5" width="1" height="2" fill="#cbd5e1" />
            <rect x="29" y="9.5" width="0.8" height="2" fill="#cbd5e1" />
          </svg>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.12)", margin: "1rem 0 0.85rem 0" }} />

        {/* Bottom stats stack */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.25rem", textAlign: "center" }}>
          <div>
            <div style={{ fontSize: "0.68rem", color: "#93c5fd", fontWeight: 600 }}>Capacity</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ffffff", marginTop: "2px" }}>52 Seats</div>
          </div>
          <div style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.12)", borderRight: "1px solid rgba(255, 255, 255, 0.12)" }}>
            <div style={{ fontSize: "0.68rem", color: "#93c5fd", fontWeight: 600 }}>Driver</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ffffff", marginTop: "2px", whiteSpace: "nowrap" }}>Rajesh Kumar</div>
          </div>
          <div>
            <div style={{ fontSize: "0.68rem", color: "#93c5fd", fontWeight: 600 }}>Status</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ffffff", marginTop: "2px", display: "flex", alignItems: "center", justifyContent: "center", gap: "3px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
              <span>Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ 2. SELECT ROUTE ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>
          Select Route
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {/* Route 01 */}
          <div
            onClick={() => setSelectedRoute("r1")}
            style={{
              background: selectedRoute === "r1" ? "#f0f9ff" : "#ffffff",
              border: selectedRoute === "r1" ? "2px solid #2563eb" : "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "1.1rem 1.15rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1e293b" }}>Route 01 - Morning</span>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Green Valley Route</span>
              <span style={{ fontSize: "0.74rem", color: "#94a3b8", fontWeight: 500, marginTop: "1px" }}>12 Stops &bull; 18.6 km</span>
            </div>

            {/* Checkmark indicator */}
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: selectedRoute === "r1" ? "none" : "2px solid #cbd5e1",
              background: selectedRoute === "r1" ? "#2563eb" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}>
              {selectedRoute === "r1" && <Check size={14} strokeWidth={3} />}
            </div>
          </div>

          {/* Route 02 */}
          <div
            onClick={() => setSelectedRoute("r2")}
            style={{
              background: selectedRoute === "r2" ? "#f0f9ff" : "#ffffff",
              border: selectedRoute === "r2" ? "2px solid #2563eb" : "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "1.1rem 1.15rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1e293b" }}>Route 02 - Evening</span>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>City Center Route</span>
              <span style={{ fontSize: "0.74rem", color: "#94a3b8", fontWeight: 500, marginTop: "1px" }}>10 Stops &bull; 16.2 km</span>
            </div>

            {/* Checkmark indicator */}
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: selectedRoute === "r2" ? "none" : "2px solid #cbd5e1",
              background: selectedRoute === "r2" ? "#2563eb" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}>
              {selectedRoute === "r2" && <Check size={14} strokeWidth={3} />}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ 3. SELECT SHIFT ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>
          Select Shift
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {/* Shift 01 */}
          <div
            onClick={() => setSelectedShift("s1")}
            style={{
              background: selectedShift === "s1" ? "#f0f9ff" : "#ffffff",
              border: selectedShift === "s1" ? "2px solid #2563eb" : "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "1.1rem 1.15rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1e293b" }}>Morning Shift</span>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>06:30 AM - 11:30 AM</span>
            </div>

            {/* Checkmark indicator */}
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: selectedShift === "s1" ? "none" : "2px solid #cbd5e1",
              background: selectedShift === "s1" ? "#2563eb" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}>
              {selectedShift === "s1" && <Check size={14} strokeWidth={3} />}
            </div>
          </div>

          {/* Shift 02 */}
          <div
            onClick={() => setSelectedShift("s2")}
            style={{
              background: selectedShift === "s2" ? "#f0f9ff" : "#ffffff",
              border: selectedShift === "s2" ? "2px solid #2563eb" : "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "1.1rem 1.15rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1e293b" }}>Afternoon Shift</span>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>12:00 PM - 04:30 PM</span>
            </div>

            {/* Checkmark indicator */}
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: selectedShift === "s2" ? "none" : "2px solid #cbd5e1",
              background: selectedShift === "s2" ? "#2563eb" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}>
              {selectedShift === "s2" && <Check size={14} strokeWidth={3} />}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ 4. NOTE CALLOUT CARD ════════════ */}
      <div style={{
        background: "#eff6ff",
        borderRadius: "16px",
        padding: "1.15rem 1.15rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.85rem",
        marginTop: "0.2rem"
      }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "#dbeafe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2563eb",
          flexShrink: 0
        }}>
          <Info size={18} strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e3a8a" }}>Note</span>
          <span style={{ fontSize: "0.76rem", color: "#2563eb", lineHeight: 1.45, fontWeight: 600 }}>
            Please ensure all safety checklist items are checked before starting the trip.
          </span>
        </div>
      </div>

      {/* ════════════ 5. START TRIP BUTTON ════════════ */}
      <div style={{ marginTop: "0.4rem" }}>
        <button
          onClick={handleStartTrip}
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
            boxShadow: "0 4px 14px rgba(22, 163, 74, 0.25)"
          }}
        >
          <Play size={18} fill="#ffffff" color="#ffffff" />
          <span>Start Trip</span>
        </button>
      </div>

    </div>
  );
}
