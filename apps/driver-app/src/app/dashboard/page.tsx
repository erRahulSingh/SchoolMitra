"use client";

import React, { useState, useEffect } from "react";
import { 
  Bus, Navigation, Users, CheckCircle2, Clock, Play, Square, 
  Radio, ShieldAlert, Sparkles, MapPin, Activity, ArrowRight, RefreshCw, Check
} from "lucide-react";
import { driverDict, DriverLanguage } from "../i18n";

export default function DriverDashboardPage({ language = "en" }: { language?: DriverLanguage }) {
  const [isTripActive, setIsTripActive] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [pickedCount, setPickedCount] = useState(34);
  const totalStudents = 42;
  const remainingCount = totalStudents - pickedCount;

  const t = driverDict[language];

  useEffect(() => {
    let interval: any;
    if (isTripActive) {
      setSpeed(34);
      interval = setInterval(() => {
        setSpeed((prev) => {
          const delta = Math.random() > 0.5 ? 2 : -2;
          const next = prev + delta;
          return next > 45 ? 40 : next < 25 ? 28 : next;
        });
      }, 2500);
    } else {
      setSpeed(0);
    }
    return () => clearInterval(interval);
  }, [isTripActive]);

  const handleStartTrip = () => {
    setIsTripActive(true);
  };

  const handleEndTrip = () => {
    setIsTripActive(false);
  };

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* DASHBOARD HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }} className="text-title">{t.dutyDashboard}</h2>
          <p style={{ fontSize: "0.76rem", marginTop: 2, margin: 0 }} className="text-muted-custom">{t.summarySubtitle}</p>
        </div>

        <div style={{
          background: isTripActive ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.12)",
          border: isTripActive ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(245, 158, 11, 0.3)",
          color: isTripActive ? "#10b981" : "#f59e0b",
          padding: "0.3rem 0.65rem", borderRadius: 99,
          fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.35rem",
          whiteSpace: "nowrap"
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: isTripActive ? "#10b981" : "#f59e0b" }} />
          {isTripActive ? "TRIP IN PROGRESS" : "READY ON STANDBY"}
        </div>
      </div>

      {/* ════════════ STEPPER CARD ════════════ */}
      <div className="card-ui" style={{ padding: "1rem 1.1rem", borderRadius: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.02em" }}>
            {t.stepperTitle}
          </div>
          <span style={{ fontSize: "0.7rem", background: "rgba(16,185,129,0.12)", color: "#10b981", padding: "0.15rem 0.55rem", borderRadius: 8, fontWeight: 700 }}>
            Step 6 of 15 Active
          </span>
        </div>

        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem", scrollbarWidth: "none" }}>
          {[
            "Login ✅", "Dashboard ✅", "Start Trip ✅", "GPS ON ✅", "Navigate Stop 1 ✅",
            "Pickup Students 📍", "Navigate Stop 2", "Pickup Students", "School Arrival",
            "Drop Students", "End Morning Trip", "Afternoon Trip", "Pickup From School", "Drop Home", "End Trip"
          ].map((step, idx) => (
            <div key={idx} style={{
              background: idx < 5 ? "rgba(16, 185, 129, 0.12)" : idx === 5 ? "#10b981" : "var(--bg-subbox)",
              color: idx < 5 ? "#10b981" : idx === 5 ? "#fff" : "var(--text-secondary)",
              border: idx === 5 ? "1px solid #10b981" : "1px solid var(--border-card)",
              padding: "0.35rem 0.65rem", borderRadius: 8,
              fontSize: "0.7rem", fontWeight: 700, whiteSpace: "nowrap"
            }}>
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ ASSIGNED BUS CARD ════════════ */}
      <div className="card-ui" style={{ padding: "1rem 1.15rem", borderRadius: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: "rgba(16, 185, 129, 0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.25)", flexShrink: 0
          }}>
            <Bus size={24} />
          </div>
          <div>
            <div style={{ fontSize: "0.68rem", color: "#10b981", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.03em" }}>{t.assignedBus}</div>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, marginTop: 1, margin: 0 }} className="text-title">Bus #DL 01 AB 4321</div>
            <div style={{ fontSize: "0.72rem", marginTop: 2, margin: 0 }} className="text-muted-custom">Tata Starbus &bull; 42 Seater &bull; AC GPS</div>
          </div>
        </div>
      </div>

      {/* ════════════ TODAY'S ROUTE CARD ════════════ */}
      <div className="card-ui" style={{ padding: "1rem 1.15rem", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: 42, height: 42, borderRadius: 14, background: "rgba(6, 182, 212, 0.12)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#06b6d4", border: "1px solid rgba(6, 182, 212, 0.25)", flexShrink: 0
          }}>
            <Navigation size={20} />
          </div>
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.03em", color: "#06b6d4" }}>{t.todaysRoute}</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 800, marginTop: 1, margin: 0 }} className="text-title">Route 1 - Dwarka Sector 12 Express</div>
            <div style={{ fontSize: "0.72rem", color: "#06b6d4", fontWeight: 700, marginTop: 2, margin: 0 }}>14.2 km &bull; 12 Bus Stops</div>
          </div>
        </div>
      </div>

      {/* ════════════ 3 METRIC CARDS GRID ════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" }}>
        
        {/* Total Students Card */}
        <div className="card-ui" style={{ padding: "0.85rem 0.5rem", textAlign: "center", borderRadius: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(139, 92, 246, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6", margin: "0 auto 4px auto" }}>
            <Users size={16} />
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#8b5cf6" }}>{totalStudents}</div>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, marginTop: 2 }} className="text-muted-custom">{t.totalStudents}</div>
        </div>

        {/* Picked Students Card */}
        <div className="card-ui" style={{ padding: "0.85rem 0.5rem", textAlign: "center", borderRadius: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(16, 185, 129, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", margin: "0 auto 4px auto" }}>
            <CheckCircle2 size={16} />
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#10b981" }}>{pickedCount}</div>
          <div style={{ fontSize: "0.68rem", color: "#10b981", fontWeight: 700, marginTop: 2 }}>{t.pickedStudents}</div>
        </div>

        {/* Remaining Students Card */}
        <div className="card-ui" style={{ padding: "0.85rem 0.5rem", textAlign: "center", borderRadius: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(245, 158, 11, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b", margin: "0 auto 4px auto" }}>
            <Clock size={16} />
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#f59e0b" }}>{remainingCount}</div>
          <div style={{ fontSize: "0.68rem", color: "#f59e0b", fontWeight: 700, marginTop: 2 }}>{t.remainingStudents}</div>
        </div>

      </div>

      {/* ════════════ TRIP TELEMETRY STATUS ════════════ */}
      <div className="card-ui" style={{ padding: "1rem", borderRadius: 18, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 700 }} className="text-muted-custom">{t.tripStatus}</div>
            <div style={{ fontSize: "0.92rem", fontWeight: 800, marginTop: 2 }} className="text-title">
              {isTripActive ? "ON ROUTE - TRANSMITTING GPS" : "STANDBY AT DEPOT"}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700 }} className="text-muted-custom">{t.speedDisplay}</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 800, color: isTripActive ? "#10b981" : "var(--text-secondary)" }}>
              {speed} <span style={{ fontSize: "0.72rem" }}>km/h</span>
            </div>
          </div>
        </div>

        <div className="subbox-ui" style={{ padding: "0.65rem 0.85rem", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
          <span className="text-muted-custom">Next Scheduled Stop:</span>
          <strong className="text-title" style={{ fontWeight: 800 }}>Dwarka Sector 12 Gate</strong>
        </div>
      </div>

      {/* ════════════ START / END TRIP BUTTON ════════════ */}
      <div style={{ marginTop: "0.25rem" }}>
        {isTripActive ? (
          <button
            type="button"
            onClick={handleEndTrip}
            style={{
              width: "100%", padding: "1rem", borderRadius: 16, border: "none",
              background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff",
              fontWeight: 800, fontSize: "0.95rem", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(239, 68, 68, 0.35)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.55rem"
            }}
          >
            <Square size={18} fill="#fff" />
            <span>{t.endTrip}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStartTrip}
            style={{
              width: "100%", padding: "1rem", borderRadius: 16, border: "none",
              background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff",
              fontWeight: 800, fontSize: "0.95rem", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.35)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.55rem"
            }}
          >
            <Play size={18} fill="#fff" />
            <span>{t.startTrip}</span>
          </button>
        )}
      </div>

    </div>
  );
}
