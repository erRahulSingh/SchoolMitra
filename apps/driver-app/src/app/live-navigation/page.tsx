"use client";

import React, { useState, useEffect } from "react";
import { 
  Navigation, MapPin, Volume2, VolumeX, Clock, Activity, 
  Bus, ShieldAlert, ArrowUpRight, CheckCircle2, RotateCw 
} from "lucide-react";

export default function LiveNavigationPage() {
  const [speed, setSpeed] = useState(38);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [nextStop, setNextStop] = useState("Dwarka Sector 12 Market Gate");
  const [etaMins, setEtaMins] = useState(8);
  const [distanceKm, setDistanceKm] = useState(1.4);

  // Speed Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSpeed((prev) => {
        const delta = Math.random() > 0.5 ? 2 : -2;
        const next = prev + delta;
        return next > 48 ? 42 : next < 24 ? 30 : next;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#f8fafc",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* HEADER WITH VOICE NAVIGATION TOGGLE */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900 }}>Live GPS Turn Navigation</h2>
          <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 2 }}>Google Maps Turn-by-Turn Guidance</p>
        </div>

        {/* VOICE NAVIGATION TOGGLE BUTTON */}
        <button
          type="button"
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          style={{
            background: voiceEnabled ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
            border: voiceEnabled ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid rgba(239, 68, 68, 0.4)",
            color: voiceEnabled ? "#34d399" : "#f87171",
            padding: "0.45rem 0.75rem", borderRadius: 12,
            fontSize: "0.75rem", fontWeight: 800, cursor: "pointer",
            display: "flex", alignItems: "center", gap: "0.4rem"
          }}
        >
          {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{voiceEnabled ? "Voice ON" : "Voice MUTED"}</span>
        </button>
      </div>

      {/* FLOATING NEXT STOP BANNER */}
      <div style={{
        background: "linear-gradient(135deg, #10b981, #059669)",
        borderRadius: 18,
        padding: "1rem 1.15rem",
        color: "#fff",
        boxShadow: "0 8px 24px rgba(16, 185, 129, 0.35)",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Navigation size={24} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 800, opacity: 0.9, textTransform: "uppercase" }}>NEXT STOP (IN {distanceKm} KM)</div>
            <div style={{ fontSize: "1rem", fontWeight: 900, marginTop: 1 }}>{nextStop}</div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 800, opacity: 0.9 }}>ETA</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 900 }}>{etaMins} Mins</div>
        </div>
      </div>

      {/* FULL-SCREEN STYLE VECTOR NAVIGATION MAP */}
      <div style={{
        height: 250,
        background: "#090d16",
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        borderRadius: 22,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 12px 30px rgba(0,0,0,0.5)"
      }}>
        {/* Route Line Polyline */}
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 10, background: "linear-gradient(90deg, #38bdf8, #10b981)", borderTop: "2px dashed #0284c7", borderBottom: "2px dashed #0284c7" }} />
        <div style={{ position: "absolute", left: "45%", top: 0, bottom: 0, width: 10, background: "linear-gradient(180deg, #38bdf8, #10b981)", borderLeft: "2px dashed #0284c7", borderRight: "2px dashed #0284c7" }} />

        {/* Current Location GPS Pulse Beacon */}
        <div style={{ position: "absolute", top: "44%", left: "42%", textAlign: "center" }}>
          <div className="driver-emblem" style={{ width: 44, height: 44, borderRadius: "50%", background: "#0284c7", border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", margin: "0 auto" }}>
            <Bus size={22} />
          </div>
          <div style={{ fontSize: "0.62rem", background: "rgba(15,23,42,0.9)", color: "#fff", padding: "2px 8px", borderRadius: 6, fontWeight: 800, marginTop: 4, whiteSpace: "nowrap" }}>
            Current Location • Bus #DL01AB4321
          </div>
        </div>

        {/* Next Stop Waypoint Pin */}
        <div style={{ position: "absolute", top: "15%", right: "15%", textAlign: "center" }}>
          <MapPin size={26} color="#10b981" />
          <div style={{ fontSize: "0.6rem", background: "#10b981", color: "#fff", padding: "2px 6px", borderRadius: 4, fontWeight: 800 }}>
            Next Stop Pin
          </div>
        </div>
      </div>

      {/* SPEED DISPLAY & TELEMETRY GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        
        {/* Speedometer Display */}
        <div style={{ background: "rgba(15, 23, 42, 0.85)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 18, padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 700 }}>SPEED DISPLAY</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#34d399", marginTop: 2 }}>
              {speed} <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>KM/H</span>
            </div>
            <div style={{ fontSize: "0.65rem", color: "#38bdf8", fontWeight: 800, marginTop: 2 }}>Limit: 50 km/h</div>
          </div>
          <Activity size={32} color="#34d399" />
        </div>

        {/* Current Location Telemetry */}
        <div style={{ background: "rgba(15, 23, 42, 0.85)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 18, padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 700 }}>CURRENT LOCATION</div>
          <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>Dwarka Sector 12 Flyover</div>
          <div style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, marginTop: 2 }}>GPS: 28.5821° N, 77.0500° E</div>
        </div>

      </div>

    </div>
  );
}
