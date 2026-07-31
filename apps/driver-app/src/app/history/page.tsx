"use client";

import React, { useState } from "react";
import { 
  ArrowLeft,
  Filter,
  CheckCircle2,
  Calendar,
  ChevronRight
} from "lucide-react";

interface HistoryTrip {
  id: number;
  date: string;
  duration: string;
  route: string;
  distance: string;
  students: number;
}

export default function TripHistoryPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [toggleTab, setToggleTab] = useState<"Completed" | "Cancelled">("Completed");

  const trips: HistoryTrip[] = [
    { id: 1, date: "15 May 2025", duration: "07:00 AM - 08:15 AM", route: "Route 01 - Morning", distance: "18.6 km", students: 42 },
    { id: 2, date: "14 May 2025", duration: "07:00 AM - 08:10 AM", route: "Route 01 - Morning", distance: "18.4 km", students: 41 },
    { id: 3, date: "13 May 2025", duration: "07:00 AM - 08:12 AM", route: "Route 01 - Morning", distance: "18.5 km", students: 43 },
    { id: 4, date: "12 May 2025", duration: "07:00 AM - 08:20 AM", route: "Route 02 - Evening", distance: "19.1 km", students: 38 },
    { id: 5, date: "11 May 2025", duration: "06:45 PM - 08:00 PM", route: "Route 02 - Evening", distance: "18.9 km", students: 37 }
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



      {/* ════════════ TOGGLE COMPLETED VS CANCELLED ════════════ */}
      <div style={{
        background: "#e2e8f0",
        borderRadius: "99px",
        padding: "0.22rem",
        display: "flex",
        alignItems: "center"
      }}>
        <button
          onClick={() => setToggleTab("Completed")}
          style={{
            flex: 1,
            padding: "0.55rem",
            borderRadius: "99px",
            border: "none",
            background: toggleTab === "Completed" ? "#0f52ba" : "transparent",
            color: toggleTab === "Completed" ? "#ffffff" : "#475569",
            fontSize: "0.78rem",
            fontWeight: 800,
            cursor: "pointer",
            transition: "all 0.15s"
          }}
        >
          Completed
        </button>
        <button
          onClick={() => setToggleTab("Cancelled")}
          style={{
            flex: 1,
            padding: "0.55rem",
            borderRadius: "99px",
            border: "none",
            background: toggleTab === "Cancelled" ? "#0f52ba" : "transparent",
            color: toggleTab === "Cancelled" ? "#ffffff" : "#475569",
            fontSize: "0.78rem",
            fontWeight: 800,
            cursor: "pointer",
            transition: "all 0.15s"
          }}
        >
          Cancelled
        </button>
      </div>

      {/* ════════════ HISTORY CARDS LIST ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {toggleTab === "Completed" ? (
          trips.map((trip) => (
            <div
              key={trip.id}
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "16px",
                padding: "1rem 1.15rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", maxWidth: "80%" }}>
                {/* Checked Status Node */}
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#dcfce7",
                  color: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px"
                }}>
                  <CheckCircle2 size={16} strokeWidth={3} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e293b" }}>{trip.date}</span>
                    <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>&bull; {trip.duration}</span>
                  </div>
                  <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0d3880" }}>{trip.route}</span>
                  <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>
                    {trip.distance} &bull; {trip.students} Students
                  </span>
                </div>
              </div>

              <ChevronRight size={18} color="#cbd5e1" />
            </div>
          ))
        ) : (
          <div style={{
            padding: "2rem",
            textAlign: "center",
            color: "#64748b",
            fontSize: "0.88rem",
            fontWeight: 650
          }}>
            No cancelled trips logged.
          </div>
        )}
      </div>

    </div>
  );
}
