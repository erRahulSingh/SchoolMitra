"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Bell, 
  Bus, 
  Clock, 
  ClipboardList, 
  MapPin, 
  Building, 
  CheckCircle2, 
  Circle, 
  Phone, 
  ShieldAlert, 
  X, 
  Navigation,
  Calendar,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { createSocketConnection } from "@/lib/socketClient";

interface TransportPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function TransportPage({ language = "en", onNavigate }: TransportPageProps) {
  const isHi = language === "hi";

  // Navigation tab view state: "live" | "timeline" | "route-details" | "trip-history"
  const [subTab, setSubTab] = useState<"live" | "timeline" | "route-details" | "trip-history">("live");

  // Telemetry state
  const [liveSpeed, setLiveSpeed] = useState<number>(32);
  const [liveEta, setLiveEta] = useState<string>("08:05 AM");
  const [liveStatus, setLiveStatus] = useState<string>("En Route to School");
  const [activeModal, setActiveModal] = useState<"driver" | "sos" | null>(null);

  // Month filter dropdown state
  const [selectedMonth, setSelectedMonth] = useState("This Month");
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  // Connect Socket.IO Telemetry Listener
  useEffect(() => {
    let socket: any = null;
    try {
      socket = createSocketConnection("http://localhost:5000");

      socket.on("connect", () => {
        socket.emit("bus:join_room", { routeId: "Green Valley Route" });
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

  const t = {
    title: isHi ? "बस ट्रैकिंग" : "Bus Tracking",
    busNo: "Bus No. UP32 AB 1234",
    route: isHi ? "मार्ग: ग्रीन वैली रूट" : "Route: Green Valley Route",
    liveLocation: isHi ? "लाइव लोकेशन" : "Live Location",
    live: isHi ? "• लाइव" : "• Live",
    estimatedArrival: isHi ? "अनुमानित आगमन" : "Estimated Arrival",
    minToSchool: isHi ? "स्कूल से 5 मिनट दूर" : "5 min to school",
    currentStop: isHi ? "वर्तमान स्टॉप" : "Current Stop",
    nextSchool: isHi ? "अगला: स्कूल" : "Next: School",
    routeStops: isHi ? "रूट स्टॉप्स" : "Route Stops",
    completed: isHi ? "पूरा हुआ" : "Completed",
    upcoming: isHi ? "आगामी" : "Upcoming",
    close: isHi ? "बंद करें" : "Close"
  };

  const routeStopsList = [
    { id: 1, name: "Maple Park", time: "07:50 AM", status: "Completed", isDone: true },
    { id: 2, name: "City Center", time: "07:58 AM", status: "Completed", isDone: true },
    { id: 3, name: "Sector 52", time: "08:03 AM", status: "Upcoming", isCurrent: true, isDone: false },
    { id: 4, name: "Green Valley School", time: "08:05 AM", status: "Upcoming", isSchool: true, isDone: false }
  ];

  // Route Details mockup stop list
  const routeStopsDetailed = [
    { id: 1, name: "Maple Park", time: "7:05 AM", type: "Pickup" },
    { id: 2, name: "City Center", time: "7:12 AM", type: "Pickup" },
    { id: 3, name: "Sector 52", time: "7:25 AM", type: "Pickup" },
    { id: 4, name: "Green Valley School", time: "7:50 AM", type: "Dropoff" }
  ];

  // Trip History data
  const tripHistoryData = [
    { date: "15 May 2025", busNo: "UP32 AB 1234", route: "Green Valley Route", duration: "07:05 AM - 07:50 AM", status: "Completed" },
    { date: "14 May 2025", busNo: "UP32 AB 1234", route: "Green Valley Route", duration: "07:05 AM - 07:50 AM", status: "Completed" },
    { date: "13 May 2025", busNo: "UP32 AB 1234", route: "Green Valley Route", duration: "07:05 AM - 07:50 AM", status: "Completed" },
    { date: "12 May 2025", busNo: "UP32 AB 1234", route: "Green Valley Route", duration: "Reason: Maintenance", status: "Cancelled" }
  ];

  // Pickup & Drop Timeline data matching reference screenshot
  const timelineEvents = [
    { id: 1, time: "07:05 AM", title: "Picked Up", subtitle: "Maple Park", status: "completed", color: "#22c55e", segmentColor: "#22c55e", badge: "checkmark" },
    { id: 2, time: "07:12 AM", title: "Reached", subtitle: "City Center", status: "completed", color: "#22c55e", segmentColor: "#22c55e", badge: "checkmark" },
    { id: 3, time: "07:25 AM", title: "Reached", subtitle: "Sector 52", status: "completed", color: "#22c55e", segmentColor: "#22c55e", badge: "checkmark" },
    { id: 4, time: "07:45 AM", title: "Reached School", subtitle: "Green Valley Public School", status: "completed", color: "#22c55e", segmentColor: "#f97316", badge: "checkmark" },
    { id: 5, time: "03:15 PM", title: "Departed School", subtitle: "On the way", status: "active", color: "#f97316", segmentColor: "#cbd5e1", badge: "orange-dot" },
    { id: 6, time: "03:55 PM", title: "Dropped", subtitle: "Maple Park", status: "pending", color: "#94a3b8", segmentColor: "#cbd5e1", badge: "none" }
  ];

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%"
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
            aria-label="Go Back"
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
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.015em"
          }}>
            {subTab === "live" && t.title}
            {subTab === "timeline" && "Pickup & Drop Timeline"}
            {subTab === "route-details" && "Route Details"}
            {subTab === "trip-history" && "Trip History"}
          </h1>
        </div>

        {/* Right Side Icon */}
        {subTab === "live" || subTab === "route-details" ? (
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("notifications")}
            aria-label="View Notifications"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0.2rem"
            }}
          >
            <Bell size={22} color="#0f172a" strokeWidth={2} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => alert("Calendar Filter Clicked")}
            aria-label="Calendar View"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0.2rem"
            }}
          >
            <Calendar size={22} color="#0f172a" strokeWidth={2} />
          </button>
        )}
      </div>

      {/* ════════════ SUB-TAB VIEW SELECTOR PILLS (SCROLLABLE BAR) ════════════ */}
      <div style={{
        display: "flex",
        background: "#e2e8f0",
        borderRadius: "14px",
        padding: "0.25rem",
        gap: "0.25rem",
        marginTop: "-0.25rem",
        overflowX: "auto",
        scrollbarWidth: "none"
      }}>
        <button
          onClick={() => setSubTab("live")}
          style={{
            padding: "0.6rem 0.95rem",
            borderRadius: "10px",
            border: "none",
            background: subTab === "live" ? "#ffffff" : "transparent",
            color: subTab === "live" ? "#1d4ed8" : "#475569",
            fontWeight: 800,
            fontSize: "0.78rem",
            cursor: "pointer",
            boxShadow: subTab === "live" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap"
          }}
        >
          Live Track
        </button>
        <button
          onClick={() => setSubTab("timeline")}
          style={{
            padding: "0.6rem 0.95rem",
            borderRadius: "10px",
            border: "none",
            background: subTab === "timeline" ? "#ffffff" : "transparent",
            color: subTab === "timeline" ? "#1d4ed8" : "#475569",
            fontWeight: 800,
            fontSize: "0.78rem",
            cursor: "pointer",
            boxShadow: subTab === "timeline" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap"
          }}
        >
          Timeline
        </button>
        <button
          onClick={() => setSubTab("route-details")}
          style={{
            padding: "0.6rem 0.95rem",
            borderRadius: "10px",
            border: "none",
            background: subTab === "route-details" ? "#ffffff" : "transparent",
            color: subTab === "route-details" ? "#1d4ed8" : "#475569",
            fontWeight: 800,
            fontSize: "0.78rem",
            cursor: "pointer",
            boxShadow: subTab === "route-details" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap"
          }}
        >
          Route Details
        </button>
        <button
          onClick={() => setSubTab("trip-history")}
          style={{
            padding: "0.6rem 0.95rem",
            borderRadius: "10px",
            border: "none",
            background: subTab === "trip-history" ? "#ffffff" : "transparent",
            color: subTab === "trip-history" ? "#1d4ed8" : "#475569",
            fontWeight: 800,
            fontSize: "0.78rem",
            cursor: "pointer",
            boxShadow: subTab === "trip-history" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap"
          }}
        >
          Trip History
        </button>
      </div>

      {/* ══════════════ TAB 1: LIVE TRACKING VIEW ══════════════ */}
      {subTab === "live" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", width: "100%" }}>
          {/* BUS INFORMATION HERO BANNER CARD */}
          <div 
            onClick={() => setActiveModal("driver")}
            style={{
              background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 55%, #3b0764 100%)",
              borderRadius: "22px",
              padding: "1.2rem 1.15rem",
              color: "#ffffff",
              boxShadow: "0 10px 25px -4px rgba(109, 40, 217, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer"
            }}
          >
            <div style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}>
              <Bus size={26} color="#6d28d9" strokeWidth={2.2} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              <h2 style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#ffffff",
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "-0.01em",
                lineHeight: 1.25
              }}>
                {t.busNo}
              </h2>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#ddd6fe" }}>
                {t.route}
              </div>
            </div>
          </div>

          {/* LIVE LOCATION MAP SECTION */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
                {t.liveLocation}
              </h2>
              <span style={{
                background: "#dcfce7",
                color: "#15803d",
                padding: "0.2rem 0.65rem",
                borderRadius: "99px",
                fontSize: "0.72rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "0.25rem"
              }}>
                {t.live}
              </span>
            </div>

            <div style={{
              position: "relative",
              width: "100%",
              height: "210px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)",
              background: "#eef2f6"
            }}>
              <svg width="100%" height="100%" viewBox="0 0 400 220" preserveAspectRatio="none" fill="none">
                <rect width="400" height="220" fill="#f1f5f9" />
                <path d="M20 20 H180 V100 H20 Z" fill="#e2e8f0" opacity="0.6" />
                <path d="M240 10 H380 V90 H240 Z" fill="#dcfce7" opacity="0.5" />
                <path d="M220 120 H390 V200 H220 Z" fill="#e0f2fe" opacity="0.5" />
                <path d="M0 160 Q 150 140, 400 180" stroke="#cbd5e1" strokeWidth="12" />
                <path d="M120 0 V220" stroke="#cbd5e1" strokeWidth="10" />
                <path d="M280 0 V220" stroke="#fef08a" strokeWidth="10" />
                <path d="M 20 80 Q 90 120, 200 110 T 310 180" stroke="#2563eb" strokeWidth="5" fill="none" strokeLinecap="round" />
                <circle cx="70" cy="98" r="7" fill="#ffffff" stroke="#2563eb" strokeWidth="4" />
                <text x="70" y="85" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="700">Sector 52</text>
                <circle cx="310" cy="180" r="7" fill="#ffffff" stroke="#7c3aed" strokeWidth="4" />
                <text x="310" y="166" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="700">Maple Park</text>
                <g transform="translate(320, 175)">
                  <path d="M12 0C5.37 0 0 5.37 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.37 18.63 0 12 0Z" fill="#7c3aed" />
                  <circle cx="12" cy="12" r="5" fill="#ffffff" />
                </g>
                <text x="320" y="215" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="800">Green Valley School</text>
                <g transform="translate(180, 85)">
                  <circle cx="20" cy="20" r="26" fill="rgba(37, 99, 235, 0.2)">
                    <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="20" cy="20" r="18" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
                </g>
              </svg>

              <div style={{ position: "absolute", left: "187px", top: "92px", pointerEvents: "none" }}>
                <Bus size={22} color="#1d4ed8" strokeWidth={2.5} />
              </div>
              <div style={{
                position: "absolute", left: "140px", top: "132px",
                background: "#ffffff", padding: "0.2rem 0.65rem", borderRadius: "99px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)", fontSize: "0.72rem", fontWeight: 800,
                color: "#0f172a", pointerEvents: "none"
              }}>
                City Center
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={{
              background: "#fff7ed", borderRadius: "18px", padding: "1rem 0.95rem",
              border: "1px solid #fed7aa", display: "flex", alignItems: "flex-start", justifyContent: "space-between"
            }}>
              <div>
                <div style={{ color: "#78350f", fontWeight: 700, fontSize: "0.78rem" }}>{t.estimatedArrival}</div>
                <div style={{ color: "#0f172a", fontWeight: 800, fontSize: "1.1rem", fontFamily: "'Outfit', sans-serif", margin: "3px 0 1px 0" }}>{liveEta}</div>
                <div style={{ color: "#64748b", fontSize: "0.72rem", fontWeight: 500 }}>{t.minToSchool}</div>
              </div>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(234, 88, 12, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Clock size={20} color="#ea580c" strokeWidth={2.2} />
              </div>
            </div>

            <div style={{
              background: "#faf5ff", borderRadius: "18px", padding: "1rem 0.95rem",
              border: "1px solid #e9d5ff", display: "flex", alignItems: "flex-start", justifyContent: "space-between"
            }}>
              <div>
                <div style={{ color: "#6b21a8", fontWeight: 700, fontSize: "0.78rem" }}>{t.currentStop}</div>
                <div style={{ color: "#581c87", fontWeight: 800, fontSize: "1.1rem", fontFamily: "'Outfit', sans-serif", margin: "3px 0 1px 0" }}>Maple Park</div>
                <div style={{ color: "#64748b", fontSize: "0.72rem", fontWeight: 500 }}>{t.nextSchool}</div>
              </div>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(147, 51, 234, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ClipboardList size={20} color="#9333ea" strokeWidth={2.2} />
              </div>
            </div>
          </div>

          {/* ROUTE STOPS LIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <h2 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
              {t.routeStops}
            </h2>

            <div style={{
              background: "#ffffff", borderRadius: "20px", padding: "1rem 1.1rem",
              border: "1px solid #f1f5f9", boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)", position: "relative"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {routeStopsList.map((stop, index) => {
                  const isLast = index === routeStopsList.length - 1;
                  return (
                    <div key={stop.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", zIndex: 2 }}>
                        {stop.isSchool ? (
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Building size={16} color="#1d4ed8" strokeWidth={2.2} />
                          </div>
                        ) : (
                          <div style={{ width: "22px", height: "22px", borderRadius: "50%", border: stop.isDone ? "4px solid #22c55e" : "4px solid #1d4ed8", background: "#ffffff", margin: "0 3px" }} />
                        )}

                        <div>
                          <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a" }}>{stop.name}</div>
                          <div style={{ fontSize: "0.74rem", fontWeight: 500, color: "#64748b", marginTop: "2px" }}>{stop.time}</div>
                        </div>
                      </div>

                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: stop.isDone ? "#15803d" : "#94a3b8" }}>
                        {stop.isDone ? t.completed : t.upcoming}
                      </span>

                      {!isLast && (
                        <div style={{
                          position: "absolute", left: "13px", top: "24px", width: "2px", height: "32px",
                          background: stop.isDone ? "#22c55e" : "#cbd5e1", borderStyle: stop.isDone ? "solid" : "dashed", zIndex: 1
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ TAB 2: PICKUP & DROP TIMELINE VIEW ══════════════ */}
      {subTab === "timeline" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", width: "100%" }}>
          {/* Student Info Card */}
          <div style={{
            background: "#ffffff",
            borderRadius: "22px",
            padding: "1.1rem 1.25rem",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.95rem" }}>
              <div style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#fef3c7",
                boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
                flexShrink: 0
              }}>
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300"
                  alt="Rohan Sharma"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#1e3a8a",
                  margin: 0,
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  Rohan Sharma
                </h3>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#64748b" }}>
                  Class 5th – A
                </div>
                <div style={{ fontSize: "0.74rem", fontWeight: 500, color: "#64748b" }}>
                  Bus No. UP32 AB 1234
                </div>
              </div>
            </div>

            <span style={{
              background: "#4f46e5",
              color: "#ffffff",
              padding: "0.35rem 0.8rem",
              borderRadius: "10px",
              fontSize: "0.76rem",
              fontWeight: 800,
              boxShadow: "0 2px 8px rgba(79, 70, 229, 0.15)"
            }}>
              Today
            </span>
          </div>

          {/* Connected timeline list */}
          <div style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            padding: "1.25rem 1.15rem",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.02)",
            position: "relative"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.65rem" }}>
              {timelineEvents.map((evt, idx) => {
                const isLast = idx === timelineEvents.length - 1;
                return (
                  <div key={evt.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                    
                    {/* Left node, time and text */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", zIndex: 2 }}>
                      {/* Timeline circle node */}
                      <div style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        border: `3px solid ${evt.color}`,
                        background: "#ffffff",
                        flexShrink: 0,
                        marginLeft: "4px"
                      }} />

                      {/* Time marker */}
                      <span style={{
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#475569",
                        minWidth: "75px"
                      }}>
                        {evt.time}
                      </span>

                      {/* Name details */}
                      <div>
                        <div style={{
                          fontSize: "0.85rem",
                          fontWeight: 800,
                          color: "#1e293b"
                        }}>
                          {evt.title}
                        </div>
                        <div style={{
                          fontSize: "0.74rem",
                          color: "#64748b",
                          fontWeight: 500,
                          marginTop: "2px"
                        }}>
                          {evt.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Right side check badge */}
                    {evt.badge === "checkmark" && (
                      <div style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#22c55e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff"
                      }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4.5 L3.5 7 L9 1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    {evt.badge === "orange-dot" && (
                      <div style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#f97316",
                        marginRight: "5px"
                      }} />
                    )}

                    {/* Segment connector vertical line */}
                    {!isLast && (
                      <div style={{
                        position: "absolute",
                        left: "12px",
                        top: "18px",
                        width: "2px",
                        height: "40px",
                        background: evt.segmentColor,
                        zIndex: 1
                      }} />
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ TAB 3: ROUTE DETAILS VIEW ══════════════ */}
      {subTab === "route-details" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", width: "100%" }}>
          {/* Hero Card */}
          <div style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
            borderRadius: "22px",
            padding: "1.2rem 1.25rem",
            color: "#ffffff",
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden"
          }}>
            <div>
              <h2 style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                color: "#ffffff",
                fontFamily: "'Outfit', sans-serif",
                margin: 0
              }}>
                Bus No. UP32 AB 1234
              </h2>
              <p style={{
                fontSize: "0.85rem",
                opacity: 0.95,
                margin: "4px 0 0 0",
                fontWeight: 500
              }}>
                Green Valley Route
              </p>
            </div>
            
            {/* Cute yellow bus SVG */}
            <div style={{ flexShrink: 0, marginRight: "-5px" }}>
              <svg width="85" height="52" viewBox="0 0 100 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="10" width="70" height="28" rx="6" fill="#fbbf24" />
                <path d="M75 16 H86 A3 3 0 0 1 89 19 V38 H75 Z" fill="#fbbf24" />
                <path d="M77 15 L84 15 L82 25 L77 25 Z" fill="#cbd5e1" opacity="0.9" />
                <rect x="12" y="15" width="10" height="10" fill="#a5f3fc" rx="2" />
                <rect x="26" y="15" width="10" height="10" fill="#a5f3fc" rx="2" />
                <rect x="40" y="15" width="10" height="10" fill="#a5f3fc" rx="2" />
                <rect x="54" y="15" width="10" height="10" fill="#a5f3fc" rx="2" />
                <circle cx="22" cy="38" r="8" fill="#1f2937" />
                <circle cx="22" cy="38" r="3.5" fill="#9ca3af" />
                <circle cx="62" cy="38" r="8" fill="#1f2937" />
                <circle cx="62" cy="38" r="3.5" fill="#9ca3af" />
                <circle cx="87" cy="28" r="2.5" fill="#fef08a" />
                <path d="M89 28 L94 26 L94 30 Z" fill="#fef08a" opacity="0.6" />
                <rect x="5" y="28" width="70" height="2" fill="#111827" />
                <rect x="86" y="34" width="4" height="4" rx="1" fill="#374151" />
              </svg>
            </div>
          </div>

          {/* Key Metrics statistics card row */}
          <div style={{
            background: "#ffffff",
            borderRadius: "18px",
            border: "1px solid #e2e8f0",
            padding: "1rem",
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
            alignItems: "center",
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>Total Stops</div>
              <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginTop: "4px", fontFamily: "'Outfit', sans-serif" }}>12</div>
            </div>
            <div style={{ height: "30px", width: "1px", background: "#cbd5e1" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>Distance</div>
              <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginTop: "4px", fontFamily: "'Outfit', sans-serif" }}>18.6 km</div>
            </div>
            <div style={{ height: "30px", width: "1px", background: "#cbd5e1" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>Duration</div>
              <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginTop: "4px", fontFamily: "'Outfit', sans-serif" }}>45 min</div>
            </div>
          </div>

          {/* Route Map */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <h2 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
              Route Map
            </h2>

            <div style={{
              position: "relative",
              width: "100%",
              height: "230px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)"
            }}>
              <svg width="100%" height="100%" viewBox="0 0 360 160" preserveAspectRatio="none" fill="none">
                <rect width="360" height="160" fill="#f8fafc" />
                <path d="M0 40 H360" stroke="#f1f5f9" strokeWidth="6" />
                <path d="M0 120 H360" stroke="#f1f5f9" strokeWidth="6" />
                <path d="M60 0 V160" stroke="#f1f5f9" strokeWidth="6" />
                <path d="M180 0 V160" stroke="#f1f5f9" strokeWidth="6" />
                <path d="M300 0 V160" stroke="#f1f5f9" strokeWidth="6" />
                <path d="M 40 120 L 100 40 L 220 80 L 320 30" stroke="#4f46e5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                
                {/* Purple Map Pin */}
                <g transform="translate(30, 95)">
                  <path d="M10 0C4.5 0 0 4.5 0 10C0 17.5 10 25 10 25C10 25 20 17.5 20 10C20 4.5 15.5 0 10 0Z" fill="#8b5cf6" />
                  <circle cx="10" cy="10" r="4" fill="#ffffff" />
                </g>
                
                {/* Red Map Pin */}
                <g transform="translate(210, 55)">
                  <path d="M10 0C4.5 0 0 4.5 0 10C0 17.5 10 25 10 25C10 25 20 17.5 20 10C20 4.5 15.5 0 10 0Z" fill="#ef4444" />
                  <circle cx="10" cy="10" r="4" fill="#ffffff" />
                </g>
                
                {/* Green Map Pin */}
                <g transform="translate(310, 5)">
                  <path d="M10 0C4.5 0 0 4.5 0 10C0 17.5 10 25 10 25C10 25 20 17.5 20 10C20 4.5 15.5 0 10 0Z" fill="#22c55e" />
                  <circle cx="10" cy="10" r="4" fill="#ffffff" />
                </g>
              </svg>

              {/* Start & End Overlay boxes */}
              <div style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                right: "10px",
                display: "flex",
                gap: "0.5rem"
              }}>
                <div style={{
                  flex: 1,
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "0.6rem",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={14} color="#2e7d32" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}>Start</div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0f172a" }}>7:05 AM</div>
                    <div style={{ fontSize: "0.65rem", color: "#64748b" }}>Maple Park</div>
                  </div>
                </div>

                <div style={{
                  flex: 1,
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "0.6rem",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#ffebee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={14} color="#c62828" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}>End</div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0f172a" }}>7:50 AM</div>
                    <div style={{ fontSize: "0.65rem", color: "#64748b" }}>Green Valley School</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Route Stops List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <h2 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
              Route Stops
            </h2>

            <div style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #f1f5f9",
              boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
              overflow: "hidden"
            }}>
              {routeStopsDetailed.map((stop) => (
                <div key={stop.id} style={{
                  padding: "0.85rem 1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: stop.id === routeStopsDetailed.length ? "none" : "1px solid #f1f5f9"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.76rem",
                      fontWeight: 800,
                      color: "#64748b"
                    }}>
                      {stop.id}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>{stop.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px", fontWeight: 500 }}>{stop.time}</div>
                    </div>
                  </div>

                  <span style={{
                    padding: "0.2rem 0.55rem",
                    borderRadius: "99px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    background: stop.type === "Pickup" ? "#e8f5e9" : "#e3f2fd",
                    color: stop.type === "Pickup" ? "#2e7d32" : "#1565c0"
                  }}>
                    {stop.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ TAB 4: TRIP HISTORY VIEW ══════════════ */}
      {subTab === "trip-history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", width: "100%" }}>
          
          {/* Dropdown month selector */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              style={{
                width: "100%",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "0.85rem 1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "#1e3a8a",
                cursor: "pointer"
              }}
            >
              <span>{selectedMonth}</span>
              <ChevronDown size={18} color="#64748b" style={{ transform: showMonthDropdown ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
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
                {["This Month", "Previous Month", "May 2025"].map((month) => (
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

          {/* Trip Summary statistics Row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0.6rem"
          }}>
            <div style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "14px",
              padding: "0.75rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "0.72rem", color: "#1e40af", fontWeight: 700 }}>Total Trips</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1e40af", marginTop: "3px", fontFamily: "'Outfit', sans-serif" }}>22</div>
            </div>
            
            <div style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "14px",
              padding: "0.75rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "0.72rem", color: "#166534", fontWeight: 700 }}>Completed</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#166534", marginTop: "3px", fontFamily: "'Outfit', sans-serif" }}>20</div>
            </div>
            
            <div style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "14px",
              padding: "0.75rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "0.72rem", color: "#991b1b", fontWeight: 700 }}>Cancelled</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#991b1b", marginTop: "3px", fontFamily: "'Outfit', sans-serif" }}>2</div>
            </div>
          </div>

          {/* Daily trips cards list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {tripHistoryData.map((trip, idx) => {
              const isCompleted = trip.status === "Completed";
              return (
                <div
                  key={idx}
                  onClick={() => alert(`Showing details for trip on ${trip.date}`)}
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "1rem",
                    border: "1px solid #f1f5f9",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(109, 40, 217, 0.08)",
                      color: "#6d28d9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <Bus size={22} strokeWidth={2} />
                    </div>

                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a", display: "flex", gap: "6px", alignItems: "center" }}>
                        <span>{trip.date}</span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569" }}>• {trip.busNo}</span>
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#64748b", marginTop: "2px", fontWeight: 500 }}>
                        {trip.route}
                      </div>
                      <div style={{
                        fontSize: "0.72rem",
                        color: isCompleted ? "#64748b" : "#dc2626",
                        marginTop: "2px",
                        fontWeight: 600
                      }}>
                        {trip.duration}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{
                      fontSize: "0.74rem",
                      fontWeight: 800,
                      color: isCompleted ? "#15803d" : "#ef4444"
                    }}>
                      {trip.status}
                    </span>
                    <ChevronRight size={18} color="#94a3b8" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
