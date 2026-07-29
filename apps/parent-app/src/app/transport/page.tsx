"use client";

import React, { useState } from "react";
import { 
  Bus, Navigation, MapPin, Clock, Phone, AlertTriangle, 
  CheckCircle2, ShieldAlert, User, Star, ChevronRight, 
  Sparkles, History, Route, Info, ArrowUpRight, ShieldCheck
} from "lucide-react";

import { createSocketConnection } from "@/lib/socketClient";

export default function TransportPage() {
  const [activeTab, setActiveTab] = useState<"liveBus" | "route" | "stops" | "trips" | "driver" | "emergency">("liveBus");
  const [liveSpeed, setLiveSpeed] = useState<number>(34);
  const [liveEta, setLiveEta] = useState<string>("8 mins");
  const [liveStatus, setLiveStatus] = useState<string>("Broadcasting");

  // Connect Socket.IO Telemetry Listener
  React.useEffect(() => {
    let socket: any = null;
    try {
      socket = createSocketConnection("http://localhost:5000");

      socket.on("connect", () => {
        socket.emit("bus:join_room", { routeId: "Route 1" });
      });

      socket.on("bus:location_changed", (data: any) => {
        if (data.speed !== undefined) setLiveSpeed(data.speed);
        if (data.eta !== undefined) setLiveEta(data.eta);
        if (data.status !== undefined) setLiveStatus(data.status);
      });
    } catch (e) {
      console.warn("Parent App Socket error:", e);
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const busStops = [
    { no: 1, name: "Dwarka Sector 6 Metro Station", time: "07:15 AM", status: "Passed", done: true },
    { no: 2, name: "Dwarka Sector 10 Crossing", time: "07:25 AM", status: "Passed", done: true },
    { no: 3, name: "Home Stop - Sector 12 Market", time: "07:35 AM", status: "Student Boarded ✅", done: true },
    { no: 4, name: "Vasant Kunj Flyover Junction", time: "07:45 AM", status: "Next Stop (8 mins)", done: false },
    { no: 5, name: "DPS Main Campus Gate #1", time: "07:55 AM", status: "Final Destination", done: false }
  ];

  const tripHistory = [
    { date: "Today, 28 Aug 2026", type: "Morning Pickup", boardedTime: "07:35 AM", arrivedSchoolTime: "07:48 AM", status: "Completed" },
    { date: "Yesterday, 27 Aug 2026", type: "Evening Drop", boardedSchoolTime: "02:15 PM", droppedHomeTime: "02:32 PM", status: "Completed" }
  ];

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>GPS Transport Cockpit</h2>
            <span style={{ background: "rgba(56,189,248,0.2)", color: "#0284c7", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              Bus #DL01AB4321
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Route #1 • Dwarka to DPS Main Campus
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="banner-sub" style={{ fontSize: "0.68rem", fontWeight: 700 }}>LIVE SPEED • ETA {liveEta}</div>
          <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0284c7", marginTop: 1 }}>{liveSpeed} km/h</div>
        </div>
      </div>

      {/* ════════════ 6-TAB SUB-NAVIGATION BAR ════════════ */}
      <div className="subtab-bar" style={{
        display: "flex", gap: "0.35rem", overflowX: "auto", padding: "0.35rem", borderRadius: 16,
        scrollbarWidth: "none"
      }}>
        {[
          { id: "liveBus", label: "Live Bus", icon: Bus },
          { id: "route", label: "Route", icon: Route },
          { id: "stops", label: "Stops", icon: MapPin },
          { id: "trips", label: "Trips", icon: History },
          { id: "driver", label: "Driver", icon: User },
          { id: "emergency", label: "SOS Alert", icon: ShieldAlert }
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: "0.55rem 0.75rem", borderRadius: 12, border: "none",
              background: activeTab === t.id ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent",
              color: activeTab === t.id ? "#fff" : "var(--card-subtext)",
              fontSize: "0.75rem", fontWeight: 700,
              display: "flex", alignItems: "center", gap: "0.35rem",
              cursor: "pointer", whitespace: "nowrap",
              boxShadow: activeTab === t.id ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none"
            }}
          >
            <t.icon size={14} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ════════════ SCREEN 1: LIVE BUS TRACKING ════════════ */}
      {activeTab === "liveBus" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          {/* HIGH-TECH VECTOR GPS MAP */}
          <div className="gps-map-container">
            <div className="gps-road-h" />
            <div className="gps-road-v" />

            {/* School Gate Pin */}
            <div style={{ position: "absolute", top: "22%", left: "38%", textAlign: "center" }}>
              <MapPin size={22} color="#059669" />
              <div style={{ fontSize: "0.6rem", background: "rgba(15,23,42,0.9)", color: "#fff", padding: "2px 6px", borderRadius: 4, marginTop: 2, whiteSpace: "nowrap" }}>DPS Campus</div>
            </div>

            {/* Bus Live Beacon Pin */}
            <div style={{ position: "absolute", top: "48%", left: "45%", textAlign: "center" }}>
              <Bus size={28} color="#0284c7" />
              <div style={{ fontSize: "0.65rem", background: "#0284c7", color: "#fff", padding: "2px 8px", borderRadius: 6, marginTop: 2, whiteSpace: "nowrap", fontWeight: 800, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                Bus #DL01AB4321
              </div>
            </div>

            {/* Speed Telemetry Pill */}
            <div className="gps-telemetry-badge">
              <Navigation size={14} color="#0284c7" />
              <span>Moving north-west at 34 km/h</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="card-ui" style={{ padding: "0.85rem" }}>
              <span className="text-muted-custom" style={{ fontSize: "0.68rem", fontWeight: 700 }}>ESTIMATED ARRIVAL</span>
              <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0284c7", marginTop: 2 }}>12 Mins</div>
            </div>
            <div className="card-ui" style={{ padding: "0.85rem" }}>
              <span className="text-muted-custom" style={{ fontSize: "0.68rem", fontWeight: 700 }}>DISTANCE TO HOME</span>
              <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#059669", marginTop: 2 }}>4.2 km</div>
            </div>
          </div>

        </div>
      )}

      {/* ════════════ SCREEN 2: ROUTE DETAILS ════════════ */}
      {activeTab === "route" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card-ui" style={{ padding: "1.25rem" }}>
            <div className="text-title" style={{ fontSize: "0.85rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Route size={16} color="#0284c7" /> Route 1 Specification
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div className="subbox-ui" style={{ padding: "0.85rem", display: "flex", justifyContent: "space-between" }}>
                <span className="text-muted-custom" style={{ fontSize: "0.78rem" }}>Route Name</span>
                <span className="text-title" style={{ fontSize: "0.85rem", fontWeight: 800 }}>Route #1 - Dwarka Express</span>
              </div>
              <div className="subbox-ui" style={{ padding: "0.85rem", display: "flex", justifyContent: "space-between" }}>
                <span className="text-muted-custom" style={{ fontSize: "0.78rem" }}>Total Distance</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0284c7" }}>14.2 Kilometers</span>
              </div>
              <div className="subbox-ui" style={{ padding: "0.85rem", display: "flex", justifyContent: "space-between" }}>
                <span className="text-muted-custom" style={{ fontSize: "0.78rem" }}>Total Stops</span>
                <span className="text-title" style={{ fontSize: "0.85rem", fontWeight: 800 }}>12 Stops</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ SCREEN 3: BUS STOPS ════════════ */}
      {activeTab === "stops" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {busStops.map((st) => (
            <div key={st.no} className="card-ui" style={{ padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: st.done ? "rgba(16, 185, 129, 0.2)" : "var(--subbox-bg)",
                  color: st.done ? "#059669" : "var(--card-subtext)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.78rem", fontWeight: 800
                }}>
                  {st.no}
                </div>

                <div>
                  <div className="text-title" style={{ fontSize: "0.85rem", fontWeight: 800 }}>{st.name}</div>
                  <div className="text-muted-custom" style={{ fontSize: "0.7rem", marginTop: 2 }}>Est. Time: {st.time}</div>
                </div>
              </div>

              <span style={{
                background: st.status.includes("Boarded") ? "rgba(16,185,129,0.15)" : "var(--subbox-bg)",
                color: st.status.includes("Boarded") ? "#059669" : "var(--card-subtext)",
                padding: "0.2rem 0.55rem", borderRadius: 8, fontSize: "0.68rem", fontWeight: 800
              }}>
                {st.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ SCREEN 5: DRIVER INFORMATION ════════════ */}
      {activeTab === "driver" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card-ui" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "1.3rem" }}>
                RK
              </div>
              <div>
                <div className="text-title" style={{ fontSize: "1.05rem", fontWeight: 800 }}>Ramesh Kumar</div>
                <div className="text-muted-custom" style={{ fontSize: "0.75rem", marginTop: 2 }}>Senior Transport Driver • Route 1</div>
                <div style={{ fontSize: "0.72rem", color: "#d97706", fontWeight: 800, marginTop: 2 }}>Rating: 4.9 ⭐ (8 Years Experience)</div>
              </div>
            </div>

            <button
              type="button"
              style={{
                width: "100%", padding: "0.75rem", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #4f46e5, #3b82f6)", color: "#fff",
                fontWeight: 800, fontSize: "0.85rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem"
              }}
            >
              <Phone size={16} /> Direct Call Driver (+91 98111 22334)
            </button>
          </div>
        </div>
      )}

      {/* ════════════ SCREEN 6: EMERGENCY CONTACT ════════════ */}
      {activeTab === "emergency" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card-ui" style={{ padding: "1.25rem", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#dc2626", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <ShieldAlert size={18} /> 24x7 Transport Control Room
            </div>

            <div className="text-muted-custom" style={{ fontSize: "0.82rem", lineHeight: 1.5, marginBottom: "1rem" }}>
              For urgent queries, route detours, or transport delays, contact our 24x7 emergency helpline team immediately.
            </div>

            <button
              type="button"
              style={{
                width: "100%", padding: "0.8rem", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff",
                fontWeight: 800, fontSize: "0.88rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
                boxShadow: "0 6px 20px rgba(239, 68, 68, 0.3)"
              }}
            >
              <AlertTriangle size={18} /> Trigger Instant Emergency SOS Broadcast
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
