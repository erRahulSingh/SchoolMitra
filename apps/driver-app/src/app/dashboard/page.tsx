"use client";

import React, { useState } from "react";
import { 
  Bus, 
  Navigation, 
  Users, 
  CheckCircle2, 
  Clock, 
  Play, 
  Square, 
  Radio, 
  ShieldAlert, 
  Sparkles, 
  MapPin, 
  Activity, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  ChevronRight,
  Map
} from "lucide-react";
import { driverDict, DriverLanguage } from "../i18n";

export default function DriverDashboardPage({ language = "en", onNavigate }: { language?: DriverLanguage; onNavigate?: (tab: string) => void }) {
  const isHi = language === "hi";
  const [isTripActive, setIsTripActive] = useState(false);

  const handleStartTrip = () => {
    setIsTripActive(true);
    alert("Starting trip... Transmitting live GPS.");
  };

  const handleEndTrip = () => {
    setIsTripActive(false);
    alert("Trip ended. GPS transmission stopped.");
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

      {/* ════════════ 1. GREETING BANNER WITH DRIVER PROFILE AVATAR ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #0f172a 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem 1.15rem 1.15rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(30, 58, 138, 0.25)",
        color: "#ffffff"
      }}>
        {/* Decorative background shapes */}
        <div style={{
          position: "absolute", top: "15%", left: "45%", width: "8px", height: "8px",
          background: "rgba(255,255,255,0.15)", transform: "rotate(45deg)", borderRadius: "2px"
        }} />
        <div style={{
          position: "absolute", bottom: "20%", left: "55%", width: "10px", height: "10px",
          background: "rgba(255,255,255,0.08)", borderRadius: "50%"
        }} />

        {/* Left Driver Greeting */}
        <div style={{ maxWidth: "60%", zIndex: 2, position: "relative" }}>
          <div style={{ fontSize: "0.78rem", color: "#93c5fd", fontWeight: 600, letterSpacing: "0.02em" }}>
            {isHi ? "शुभ प्रभात," : "Good Morning,"}
          </div>
          <div style={{
            fontSize: "1.35rem",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Outfit', sans-serif",
            marginTop: "3px",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            letterSpacing: "-0.015em"
          }}>
            Rajesh Kumar <span style={{ fontSize: "1.15rem" }}>👋</span>
          </div>
          <div style={{
            fontSize: "0.74rem",
            color: "#bfdbfe",
            marginTop: "6px",
            lineHeight: 1.4,
            fontWeight: 500
          }}>
            {isHi ? "सुरक्षित ड्राइव करें, छात्र आपकी प्रतीक्षा कर रहे हैं।" : "Drive Safe, Students are waiting for you."}
          </div>
        </div>

        {/* Right High-Quality Driver Pilot SVG illustration */}
        <div style={{
          position: "absolute",
          right: "5px",
          bottom: "0px",
          width: "120px",
          height: "105px",
          pointerEvents: "none",
          zIndex: 1
        }}>
          <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <circle cx="50" cy="50" r="35" fill="rgba(255, 255, 255, 0.08)" />
            {/* Driver Avatar Profile */}
            <path d="M50 78C62 78 72 73 72 64C72 56 65 52 50 52C35 52 28 56 28 64C28 73 38 78 50 78Z" fill="#3b82f6" />
            <circle cx="50" cy="38" r="14" fill="#fed7aa" />
            {/* Cap */}
            <path d="M35 30C35 24 40 20 50 20C60 20 65 24 65 30L68 34H32L35 30Z" fill="#1e3a8a" />
            <path d="M30 33H70V36H30V33Z" fill="#1d4ed8" />
            {/* Mustache */}
            <path d="M44 44C46 44 48 42 50 42C52 42 54 44 56 44" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="23" r="2.5" fill="#fde047" />
          </svg>
        </div>
      </div>

      {/* ════════════ 2. ASSIGNED VEHICLE BUS CARD ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "1.1rem 1.15rem",
        border: "1px solid #cbd5e1",
        boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          {/* Yellow School Bus Graphic */}
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "#fffbeb",
            border: "1px solid #fef08a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="10" width="24" height="12" rx="3" fill="#f59e0b" />
              <rect x="20" y="12" width="6" height="5" rx="1" fill="#334155" />
              <rect x="6" y="12" width="6" height="5" rx="1" fill="#334155" />
              <rect x="13" y="12" width="6" height="5" rx="1" fill="#334155" />
              <circle cx="8" cy="24" r="3.5" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
              <circle cx="24" cy="24" r="3.5" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
              <rect x="3" y="17" width="1.5" height="3" fill="#cbd5e1" />
              <rect x="27.5" y="17" width="1.5" height="3" fill="#cbd5e1" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1e3a8a", letterSpacing: "-0.015em", fontFamily: "'Outfit', sans-serif" }}>
              UP32 AB 1234
            </div>
            <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>
              Green Valley School Bus
            </div>
          </div>
        </div>

        {/* Active Pill Badge */}
        <span style={{
          background: "#dcfce7",
          color: "#16a34a",
          padding: "0.38rem 0.8rem",
          borderRadius: "99px",
          fontSize: "0.72rem",
          fontWeight: 800,
          letterSpacing: "0.02em"
        }}>
          {isHi ? "सक्रिय" : "Active"}
        </span>
      </div>

      {/* ════════════ 3. TODAY'S OVERVIEW METRICS GRID ════════════ */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.015em" }}>
            {isHi ? "आज का अवलोकन" : "Today's Overview"}
          </span>
          <button 
            type="button"
            onClick={() => alert("Redirecting to detailed trip metrics...")}
            style={{ background: "none", border: "none", color: "#2563eb", fontSize: "0.74rem", fontWeight: 700, cursor: "pointer" }}
          >
            {isHi ? "सभी देखें" : "View All"}
          </button>
        </div>

        {/* 2x2 Grid Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          
          {/* Box 1: Today's Trips */}
          <div style={{
            background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "16px",
            padding: "1rem 1.15rem", display: "flex", flexDirection: "column", gap: "0.25rem",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
          }}>
            <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 700 }}>Today's Trips</span>
            <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#2563eb", fontFamily: "'Outfit', sans-serif" }}>2</span>
            <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>Trips</span>
          </div>

          {/* Box 2: Total Students */}
          <div style={{
            background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "16px",
            padding: "1rem 1.15rem", display: "flex", flexDirection: "column", gap: "0.25rem",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
          }}>
            <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 700 }}>Total Students</span>
            <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e293b", fontFamily: "'Outfit', sans-serif" }}>42</span>
            <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>Students</span>
          </div>

          {/* Box 3: Upcoming Stops */}
          <div style={{
            background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "16px",
            padding: "1rem 1.15rem", display: "flex", flexDirection: "column", gap: "0.25rem",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
          }}>
            <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 700 }}>Upcoming Stops</span>
            <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#2563eb", fontFamily: "'Outfit', sans-serif" }}>12</span>
            <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>Stops</span>
          </div>

          {/* Box 4: Distance to Cover */}
          <div style={{
            background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "16px",
            padding: "1rem 1.15rem", display: "flex", flexDirection: "column", gap: "0.25rem",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
          }}>
            <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 700 }}>Distance to Cover</span>
            <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e3a8a", fontFamily: "'Outfit', sans-serif" }}>28.6</span>
            <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>km</span>
          </div>

        </div>
      </div>

      {/* ════════════ 4. TODAY'S FIRST TRIP CARD ════════════ */}
      <div>
        <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.015em" }}>
          {isHi ? "आज की पहली यात्रा" : "Today's First Trip"}
        </div>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          padding: "1.2rem 1.15rem",
          boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem"
        }}>
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a" }}>Route 01 - Morning</span>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Green Valley Route</span>
            </div>
            {/* Status Badge */}
            <span style={{
              background: "#eff6ff",
              color: "#2563eb",
              padding: "0.35rem 0.75rem",
              borderRadius: "99px",
              fontSize: "0.7rem",
              fontWeight: 800
            }}>
              {isHi ? "आगामी" : "Upcoming"}
            </span>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "#f1f5f9" }} />

          {/* Start Time & First Stop Details */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Start Time</span>
              <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1e293b" }}>07:00 AM</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>First Stop</span>
              <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1e293b" }}>Maple Park</span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ 5. QUICK ACTIONS GRID (MATCHING SCREENSHOT) ════════════ */}
      <div>
        <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.015em" }}>
          Quick Actions
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
          
          {/* Button 1: Start Trip */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("returntrip")}
            style={{
              background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "18px", padding: "0.75rem 0.2rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981"
            }}>
              <Play size={18} fill="#10b981" />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#334155", whiteSpace: "nowrap" }}>
              Start Trip
            </span>
          </button>

          {/* Button 2: Route Details */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("route")}
            style={{
              background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "18px", padding: "0.75rem 0.2rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb"
            }}>
              <Map size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#334155", whiteSpace: "nowrap" }}>Route Details</span>
          </button>

          {/* Button 3: SOS Siren */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("sos")}
            style={{
              background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "18px", padding: "0.75rem 0.2rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444"
            }}>
              <ShieldAlert size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#334155", whiteSpace: "nowrap" }}>SOS</span>
          </button>

          {/* Button 4: Messages */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("notifications")}
            style={{
              background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "18px", padding: "0.75rem 0.2rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#faf5ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#9333ea"
            }}>
              <MessageSquare size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#334155", whiteSpace: "nowrap" }}>Messages</span>
          </button>

        </div>
      </div>

      {/* ════════════ 6. SAFETY FIRST BLUE BANNER ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
        borderRadius: "20px",
        padding: "1.15rem 1.15rem",
        boxShadow: "0 6px 20px rgba(30, 58, 138, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#ffffff"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", maxWidth: "75%" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            Safety First
          </span>
          <span style={{ fontSize: "0.74rem", color: "#bfdbfe", lineHeight: 1.45, fontWeight: 500 }}>
            {isHi 
              ? "हमेशा सीट बेल्ट पहनें और यातायात नियमों का पालन करें।"
              : "Always wear seat belt and follow traffic rules."
            }
          </span>
        </div>
        <div style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          <ShieldCheck size={22} color="#ffffff" strokeWidth={2} />
        </div>
      </div>

    </div>
  );
}
