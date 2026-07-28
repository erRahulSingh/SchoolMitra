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
          <h2 style={{ fontSize: "1.2rem", fontWeight: 900, letterSpacing: "-0.01em" }} className="text-title">{t.dutyDashboard}</h2>
          <p style={{ fontSize: "0.75rem", marginTop: 2 }} className="text-muted-custom">{t.summarySubtitle}</p>
        </div>

        <div style={{
          background: isTripActive ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
          border: isTripActive ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(245, 158, 11, 0.3)",
          color: isTripActive ? "#059669" : "#d97706",
          padding: "0.35rem 0.75rem", borderRadius: 99,
          fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.35rem"
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: isTripActive ? "#10b981" : "#f59e0b" }} />
          {isTripActive ? "TRIP IN PROGRESS" : "READY ON STANDBY"}
        </div>
      </div>

      {/* ════════════ STEPPER CARD ════════════ */}
      <div className="card-ui" style={{ padding: "1.1rem", borderRadius: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 900, color: "#059669", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            {t.stepperTitle}
          </div>
          <span style={{ fontSize: "0.72rem", background: "rgba(16,185,129,0.12)", color: "#059669", padding: "0.2rem 0.65rem", borderRadius: 8, fontWeight: 800 }}>
            Step 6 of 15 Active
          </span>
        </div>

        <div style={{ display: "flex", gap: "0.45rem", overflowX: "auto", paddingBottom: "0.3rem" }}>
          {[
            "Login ✅", "Dashboard ✅", "Start Trip ✅", "GPS ON ✅", "Navigate Stop 1 ✅",
            "Pickup Students 📍", "Navigate Stop 2", "Pickup Students", "School Arrival",
            "Drop Students", "End Morning Trip", "Afternoon Trip", "Pickup From School", "Drop Home", "End Trip"
          ].map((step, idx) => (
            <div key={idx} style={{
              background: idx < 5 ? "rgba(16, 185, 129, 0.12)" : idx === 5 ? "#10b981" : "var(--bg-subbox)",
              color: idx < 5 ? "#059669" : idx === 5 ? "#fff" : "var(--text-secondary)",
              border: idx === 5 ? "1px solid #059669" : "1px solid var(--border-card)",
              padding: "0.4rem 0.75rem", borderRadius: 10,
              fontSize: "0.7rem", fontWeight: 800, whiteSpace: "nowrap"
            }}>
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ ASSIGNED BUS CARD ════════════ */}
      <div className="card-ui" style={{ padding: "1.1rem 1.25rem", borderRadius: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            background: "rgba(16, 185, 129, 0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#059669", border: "1px solid rgba(16, 185, 129, 0.2)"
          }}>
            <Bus size={26} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.03em" }}>{t.assignedBus}</div>
            <div style={{ fontSize: "1.15rem", fontWeight: 900, marginTop: 1 }} className="text-title">Bus #DL 01 AB 4321</div>
            <div style={{ fontSize: "0.72rem", marginTop: 2 }} className="text-muted-custom">Tata Starbus • 42 Seater • AC GPS</div>
          </div>
        </div>
      </div>

      {/* ════════════ TODAY'S ROUTE CARD ════════════ */}
      <div className="card-ui" style={{ padding: "1.1rem 1.25rem", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14, background: "rgba(2, 132, 199, 0.12)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#0284c7", border: "1px solid rgba(2, 132, 199, 0.2)"
          }}>
            <Navigation size={22} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.03em", color: "#0284c7" }}>{t.todaysRoute}</div>
            <div style={{ fontSize: "0.98rem", fontWeight: 900, marginTop: 1 }} className="text-title">Route 1 - Dwarka Sector 12 Express</div>
            <div style={{ fontSize: "0.72rem", color: "#0284c7", fontWeight: 800, marginTop: 2 }}>14.2 km • 12 Bus Stops</div>
          </div>
        </div>
      </div>

      {/* ════════════ 3 METRIC CARDS GRID ════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.65rem" }}>
        
        {/* Total Students Card */}
        <div className="card-ui" style={{ padding: "0.95rem 0.6rem", textAlign: "center", borderRadius: 18 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(139, 92, 246, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6", margin: "0 auto 6px auto" }}>
            <Users size={18} />
          </div>
          <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#8b5cf6" }}>{totalStudents}</div>
          <div style={{ fontSize: "0.68rem", fontWeight: 800, marginTop: 2 }} className="text-muted-custom">{t.totalStudents}</div>
        </div>

        {/* Picked Students Card */}
        <div className="card-ui" style={{ padding: "0.95rem 0.6rem", textAlign: "center", borderRadius: 18 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(16, 185, 129, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669", margin: "0 auto 6px auto" }}>
            <CheckCircle2 size={18} />
          </div>
          <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#059669" }}>{pickedCount}</div>
          <div style={{ fontSize: "0.68rem", color: "#059669", fontWeight: 800, marginTop: 2 }}>{t.pickedStudents}</div>
        </div>

        {/* Remaining Students Card */}
        <div className="card-ui" style={{ padding: "0.95rem 0.6rem", textAlign: "center", borderRadius: 18 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(245, 158, 11, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#d97706", margin: "0 auto 6px auto" }}>
            <Clock size={18} />
          </div>
          <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#d97706" }}>{remainingCount}</div>
          <div style={{ fontSize: "0.68rem", color: "#d97706", fontWeight: 800, marginTop: 2 }}>{t.remainingStudents}</div>
        </div>

      </div>

      {/* ════════════ TRIP TELEMETRY STATUS ════════════ */}
      <div className="card-ui" style={{ padding: "1.1rem", borderRadius: 20, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700 }} className="text-muted-custom">{t.tripStatus}</div>
            <div style={{ fontSize: "0.98rem", fontWeight: 900, marginTop: 2 }} className="text-title">
              {isTripActive ? "ON ROUTE - TRANSMITTING GPS" : "STANDBY AT DEPOT"}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700 }} className="text-muted-custom">{t.speedDisplay}</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 900, color: isTripActive ? "#059669" : "var(--text-secondary)" }}>
              {speed} <span style={{ fontSize: "0.75rem" }}>km/h</span>
            </div>
          </div>
        </div>

        <div className="subbox-ui" style={{ padding: "0.75rem 0.9rem", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem" }}>
          <span className="text-muted-custom">Next Scheduled Stop:</span>
          <strong className="text-title">Dwarka Sector 12 Gate</strong>
        </div>
      </div>

      {/* ════════════ START / END TRIP BUTTON ════════════ */}
      <div style={{ marginTop: "0.5rem" }}>
        {isTripActive ? (
          <button
            type="button"
            onClick={handleEndTrip}
            style={{
              width: "100%", padding: "1.15rem", borderRadius: 18, border: "none",
              background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff",
              fontWeight: 900, fontSize: "1.02rem", cursor: "pointer",
              boxShadow: "0 8px 25px rgba(239, 68, 68, 0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.65rem"
            }}
          >
            <Square size={20} fill="#fff" />
            <span>{t.endTrip}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStartTrip}
            style={{
              width: "100%", padding: "1.15rem", borderRadius: 18, border: "none",
              background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff",
              fontWeight: 900, fontSize: "1.02rem", cursor: "pointer",
              boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.65rem"
            }}
          >
            <Play size={20} fill="#fff" />
            <span>{t.startTrip}</span>
          </button>
        )}
      </div>

    </div>
  );
}
