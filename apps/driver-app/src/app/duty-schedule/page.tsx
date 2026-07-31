"use client";

import React, { useState } from "react";
import { 
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Bus,
  Users
} from "lucide-react";

interface Shift {
  id: number;
  name: string;
  time: string;
  status: "In Progress" | "Scheduled";
  route: string;
  bus: string;
  students: number;
  reporting: string;
}

export default function DutySchedulePage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [selectedDay, setSelectedDay] = useState(15);

  const days = [
    { day: "Sun", date: 11 },
    { day: "Mon", date: 12 },
    { day: "Tue", date: 13 },
    { day: "Wed", date: 14 },
    { day: "Thu", date: 15 },
    { day: "Fri", date: 16 },
    { day: "Sat", date: 17 }
  ];

  const shifts: Shift[] = [
    {
      id: 1,
      name: "Morning Shift",
      time: "06:30 AM - 11:30 AM",
      status: "In Progress",
      route: "Route 01 - Morning",
      bus: "UP32 AB 1234",
      students: 42,
      reporting: "06:00 AM"
    },
    {
      id: 2,
      name: "Evening Shift",
      time: "12:00 PM - 04:30 PM",
      status: "Scheduled",
      route: "Route 02 - Evening",
      bus: "UP32 AB 1234",
      students: 38,
      reporting: "11:30 AM"
    }
  ];

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



      {/* ════════════ CALENDAR SCHEDULE ROW ════════════ */}
      <div style={{
        background: "#0d3880",
        borderRadius: "20px",
        padding: "1.2rem 1rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(13, 56, 128, 0.2)"
      }}>
        {/* Month Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", padding: "0 0.2rem" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>May 2025</span>
          <div style={{ display: "flex", gap: "0.55rem" }}>
            <ChevronLeft size={18} style={{ cursor: "pointer" }} />
            <ChevronRight size={18} style={{ cursor: "pointer" }} />
          </div>
        </div>

        {/* Days horizontally scrollable row */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {days.map((d) => {
            const isSelected = d.date === selectedDay;

            return (
              <div
                key={d.date}
                onClick={() => setSelectedDay(d.date)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.45rem",
                  cursor: "pointer",
                  padding: "0.5rem 0.25rem"
                }}
              >
                <span style={{ fontSize: "0.68rem", opacity: isSelected ? 1 : 0.7, fontWeight: 700 }}>{d.day}</span>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: isSelected ? "#ffffff" : "transparent",
                  color: isSelected ? "#0d3880" : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  boxShadow: isSelected ? "0 4px 10px rgba(0,0,0,0.15)" : "none",
                  transition: "all 0.15s"
                }}>
                  {d.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════ DATE HEADING ════════════ */}
      <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e3a8a", fontFamily: "'Outfit', sans-serif", margin: "0.2rem 0" }}>
        Thursday, 15 May 2025
      </h2>

      {/* ════════════ SHIFTS CARDS STACK ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {shifts.map((shift) => {
          const isActive = shift.status === "In Progress";

          return (
            <div
              key={shift.id}
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "20px",
                padding: "1.25rem",
                boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem"
              }}
            >
              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                  <span style={{ fontSize: "1rem", fontWeight: 850, color: "#1e293b", fontFamily: "'Outfit', sans-serif" }}>
                    {shift.name}
                  </span>
                  <span style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: 600, display: "flex", alignItems: "center", gap: "3px" }}>
                    <Clock size={13} />
                    {shift.time}
                  </span>
                </div>

                <span style={{
                  background: isActive ? "#dcfce7" : "#eff6ff",
                  color: isActive ? "#16a34a" : "#2563eb",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "8px",
                  fontSize: "0.7rem",
                  fontWeight: 800
                }}>
                  {isActive ? "Active" : "Upcoming"}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "#f1f5f9" }} />

              {/* Details table list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.82rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Route</span>
                  <span style={{ fontWeight: 800, color: "#1e293b" }}>{shift.route}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Bus</span>
                  <span style={{ fontWeight: 800, color: "#1e293b" }}>{shift.bus}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Total Students</span>
                  <span style={{ fontWeight: 800, color: "#1e293b" }}>{shift.students}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Reporting Time</span>
                  <span style={{ fontWeight: 800, color: "#1e293b" }}>{shift.reporting}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>Status</span>
                  <span style={{
                    fontWeight: 800,
                    color: isActive ? "#16a34a" : "#2563eb"
                  }}>
                    {isActive ? "In Progress" : "Scheduled"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
