"use client";

import React, { useState } from "react";
import { 
  Route, MapPin, Users, Clock, Navigation, Map, List, 
  Bus, CheckCircle2, ChevronRight, ArrowRight, ShieldCheck 
} from "lucide-react";

export default function RoutePage() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const routeSummary = {
    routeName: "Route 1 - Dwarka Sector 12 Express",
    totalStops: 12,
    totalStudents: 42,
    estimatedTime: "45 Mins Total Trip",
    distance: "14.2 km Total Distance",
    busNo: "DL 01 AB 4321"
  };

  const routeStops = [
    { no: 1, name: "Dwarka Sector 6 Metro Gate", time: "07:15 AM", students: 8, status: "Passed", done: true },
    { no: 2, name: "Dwarka Sector 10 Crossing", time: "07:25 AM", students: 10, status: "Passed", done: true },
    { no: 3, name: "Home Stop - Sector 12 Market", time: "07:35 AM", students: 16, status: "Current Stop 📍", done: false },
    { no: 4, name: "Vasant Kunj Flyover Junction", time: "07:45 AM", students: 5, status: "Next Stop (8 mins)", done: false },
    { no: 5, name: "DPS Main Campus Gate #1", time: "07:55 AM", students: 3, status: "Final Destination", done: false }
  ];

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* HEADER WITH VIEW MODE TOGGLE */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900 }} className="text-title">Today&apos;s Route & Map</h2>
          <p style={{ fontSize: "0.75rem", marginTop: 2 }} className="text-muted-custom">GPS Waypoints & Scheduled Bus Stops</p>
        </div>

        {/* MAP / LIST TOGGLE */}
        <div style={{ display: "flex", background: "var(--bg-subbox)", border: "1px solid var(--border-card)", padding: "0.2rem", borderRadius: 12 }}>
          <button
            type="button"
            onClick={() => setViewMode("map")}
            style={{
              padding: "0.4rem 0.65rem", borderRadius: 9, border: "none",
              background: viewMode === "map" ? "linear-gradient(135deg, #10b981, #059669)" : "transparent",
              color: viewMode === "map" ? "#fff" : "var(--text-secondary)",
              fontSize: "0.72rem", fontWeight: 800, cursor: "pointer",
              display: "flex", alignItems: "center", gap: "0.3rem"
            }}
          >
            <Map size={14} /> Map
          </button>

          <button
            type="button"
            onClick={() => setViewMode("list")}
            style={{
              padding: "0.4rem 0.65rem", borderRadius: 9, border: "none",
              background: viewMode === "list" ? "linear-gradient(135deg, #10b981, #059669)" : "transparent",
              color: viewMode === "list" ? "#fff" : "var(--text-secondary)",
              fontSize: "0.72rem", fontWeight: 800, cursor: "pointer",
              display: "flex", alignItems: "center", gap: "0.3rem"
            }}
          >
            <List size={14} /> List
          </button>
        </div>
      </div>

      {/* 5 ROUTE INFORMATION GRID CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
        
        {/* Route Name Card */}
        <div className="banner-card" style={{ gridColumn: "span 2", padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.68rem", color: "#059669", fontWeight: 800 }}>ROUTE NAME</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 900, marginTop: 1 }} className="text-title">{routeSummary.routeName}</div>
          </div>
          <span style={{ fontSize: "0.75rem", background: "rgba(16, 185, 129, 0.2)", color: "#059669", padding: "0.25rem 0.55rem", borderRadius: 8, fontWeight: 800 }}>{routeSummary.busNo}</span>
        </div>

        {/* Total Stops */}
        <div className="card-ui" style={{ padding: "0.75rem 0.85rem" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700 }} className="text-muted-custom">TOTAL STOPS</div>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0284c7", marginTop: 2 }}>{routeSummary.totalStops} Stops</div>
        </div>

        {/* Total Students */}
        <div className="card-ui" style={{ padding: "0.75rem 0.85rem" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700 }} className="text-muted-custom">TOTAL STUDENTS</div>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#8b5cf6", marginTop: 2 }}>{routeSummary.totalStudents} Students</div>
        </div>

        {/* Estimated Time */}
        <div className="card-ui" style={{ padding: "0.75rem 0.85rem" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700 }} className="text-muted-custom">ESTIMATED TIME</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#d97706", marginTop: 2 }}>45 Mins</div>
        </div>

        {/* Distance */}
        <div className="card-ui" style={{ padding: "0.75rem 0.85rem" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700 }} className="text-muted-custom">DISTANCE</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#059669", marginTop: 2 }}>14.2 km</div>
        </div>

      </div>

      {/* MAP VIEW DISPLAY */}
      {viewMode === "map" && (
        <div style={{
          height: 220,
          background: "var(--bg-subbox)",
          backgroundImage: "radial-gradient(rgba(100, 116, 139, 0.25) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          borderRadius: 20,
          border: "1px solid var(--border-card)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: "45%", left: 0, right: 0, height: 8, background: "rgba(100, 116, 139, 0.15)", borderTop: "1px dashed rgba(100, 116, 139, 0.3)", borderBottom: "1px dashed rgba(100, 116, 139, 0.3)" }} />
          <div style={{ position: "absolute", left: "48%", top: 0, bottom: 0, width: 8, background: "rgba(100, 116, 139, 0.15)", borderLeft: "1px dashed rgba(100, 116, 139, 0.3)", borderRight: "1px dashed rgba(100, 116, 139, 0.3)" }} />

          <div style={{ position: "absolute", top: "25%", left: "15%", textAlign: "center" }}>
            <MapPin size={20} color="#10b981" />
            <span style={{ fontSize: "0.6rem", background: "var(--bg-card)", color: "var(--text-primary)", padding: "1px 5px", borderRadius: 4 }} className="card-ui">Sec 6</span>
          </div>

          <div style={{ position: "absolute", top: "42%", left: "45%", textAlign: "center" }}>
            <Bus size={28} color="#0284c7" />
            <div style={{ fontSize: "0.65rem", background: "#0284c7", color: "#fff", padding: "2px 6px", borderRadius: 6, fontWeight: 800, marginTop: 2 }}>
              Bus #DL01AB4321
            </div>
          </div>

          <div style={{ position: "absolute", bottom: "20%", right: "15%", textAlign: "center" }}>
            <MapPin size={20} color="#8b5cf6" />
            <span style={{ fontSize: "0.6rem", background: "var(--bg-card)", color: "var(--text-primary)", padding: "1px 5px", borderRadius: 4 }} className="card-ui">DPS Gate</span>
          </div>
        </div>
      )}

      {/* SEQUENTIAL LIST VIEW DISPLAY */}
      {viewMode === "list" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {routeStops.map((st) => (
            <div key={st.no} className="card-ui" style={{ padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: st.done ? "rgba(16, 185, 129, 0.2)" : "var(--bg-subbox)",
                  color: st.done ? "#059669" : "var(--text-secondary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.78rem", fontWeight: 800
                }}>
                  {st.no}
                </div>

                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800 }} className="text-title">{st.name}</div>
                  <div style={{ fontSize: "0.7rem", marginTop: 2 }} className="text-muted-custom">Sched: {st.time} • {st.students} Students</div>
                </div>
              </div>

              <span style={{
                background: st.status.includes("Current") ? "rgba(251, 191, 36, 0.2)" : st.done ? "rgba(16, 185, 129, 0.15)" : "var(--bg-subbox)",
                color: st.status.includes("Current") ? "#d97706" : st.done ? "#059669" : "var(--text-secondary)",
                padding: "0.2rem 0.55rem", borderRadius: 8, fontSize: "0.68rem", fontWeight: 800
              }}>
                {st.status}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
