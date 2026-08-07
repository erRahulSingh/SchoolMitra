"use client";

import React from "react";
import { 
  ArrowLeft, 
  Calendar,
  CheckCircle2,
  MoreVertical,
  ArrowRight
} from "lucide-react";

interface Milestone {
  id: number;
  time: string;
  title: string;
  desc: string;
  done: boolean;
}

interface TripTimelinePageProps {
  language?: string;
  onNavigate?: (tab: string) => void;
}

export default function TripTimelinePage({ onNavigate }: TripTimelinePageProps) {
  const milestones: Milestone[] = [
    { id: 1, time: "07:00 AM", title: "Trip Started", desc: "Bus started from Maple Park", done: true },
    { id: 2, time: "07:05 AM", title: "First Stop Reached", desc: "Maple Park", done: true },
    { id: 3, time: "07:25 AM", title: "Pickup Completed", desc: "All students picked up", done: true },
    { id: 4, time: "07:40 AM", title: "School Reached", desc: "Green Valley School", done: true },
    { id: 5, time: "01:15 PM", title: "School Left", desc: "Starting drop route", done: true },
    { id: 6, time: "01:45 PM", title: "Drop Completed", desc: "All students dropped", done: true },
    { id: 7, time: "01:55 PM", title: "Trip Ended", desc: "Thank you for your service", done: true }
  ];

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

      {/* ════════════ HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("drop")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0" }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            Trip Timeline
          </h1>
        </div>

        <button
          type="button"
          onClick={() => alert("Trip Options")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0.2rem" }}
        >
          <MoreVertical size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ TOP ROUTE OVERVIEW CARD ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0b2265 0%, #0d3880 55%, #081a4b 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(11, 34, 101, 0.2)",
        position: "relative",
        overflow: "hidden"
      }}>
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
            Completed
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.12)", margin: "0.75rem 0" }} />

        {/* Start/End Time and Calendar stats */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ffffff" }}>07:00 AM - 07:55 AM</span>
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "rgba(255, 255, 255, 0.08)", padding: "0.3rem 0.6rem", borderRadius: "8px" }}>
            <Calendar size={13} color="#bfdbfe" />
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ffffff" }}>15 May 2025</span>
          </div>
        </div>
      </div>

      {/* ════════════ TIMELINE LIST GRID STACK ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        border: "1px solid #cbd5e1",
        boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
        position: "relative"
      }}>
        {/* Left connecting vertical line */}
        <div style={{
          position: "absolute",
          top: "2.3rem",
          bottom: "2.3rem",
          left: "2.25rem",
          width: "2.5px",
          background: "#22c55e",
          zIndex: 1
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem", position: "relative", zIndex: 2 }}>
          {milestones.map((st) => (
            <div key={st.id} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.1rem" }}>
                {/* Node */}
                <div style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(34, 197, 94, 0.25)",
                  flexShrink: 0,
                  marginTop: "3px"
                }}>
                  <CheckCircle2 size={13} strokeWidth={2.5} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                  <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700 }}>{st.time}</span>
                  <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>{st.title}</span>
                  <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500 }}>{st.desc}</span>
                </div>
              </div>

              {/* Status Circle badge */}
              <div style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#dcfce7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#16a34a",
                flexShrink: 0
              }}>
                <CheckCircle2 size={11} strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ NEXT STEP TRIGGER ACTION ════════════ */}
      <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
        <button
          onClick={() => onNavigate && onNavigate("tripsummary")}
          style={{
            width: "100%",
            padding: "1.05rem",
            background: "#1e3a8a",
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
            boxShadow: "0 4px 14px rgba(30, 58, 138, 0.25)"
          }}
        >
          <span>View Trip Summary</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
