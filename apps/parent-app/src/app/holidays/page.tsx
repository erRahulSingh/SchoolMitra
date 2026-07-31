"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  CalendarDays,
  ChevronRight as ChevronIcon
} from "lucide-react";

interface HolidaysPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function HolidaysPage({ language = "en", onNavigate }: HolidaysPageProps) {
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  const [currentMonth, setCurrentMonth] = useState("May 2025");

  const holidayList = [
    {
      id: 1,
      dateNum: "15",
      dateMonth: "MAY",
      title: "Holiday on Buddha Purnima",
      dayName: "Thursday",
      color: "#1d4ed8",
      bgColor: "#eff6ff"
    },
    {
      id: 2,
      dateNum: "26",
      dateMonth: "MAY",
      title: "Summer Break",
      dayName: "Monday – Saturday",
      color: "#dc2626",
      bgColor: "#fef2f2"
    },
    {
      id: 3,
      dateNum: "06",
      dateMonth: "JUN",
      title: "Eid-ul-Adha",
      dayName: "Friday",
      color: "#9333ea",
      bgColor: "#f3e8ff"
    },
    {
      id: 4,
      dateNum: "15",
      dateMonth: "AUG",
      title: "Independence Day",
      dayName: "Friday",
      color: "#16a34a",
      bgColor: "#ecfdf5"
    },
    {
      id: 5,
      dateNum: "05",
      dateMonth: "SEP",
      title: "Teachers Day",
      dayName: "Friday",
      color: "#1d4ed8",
      bgColor: "#eff6ff"
    },
    {
      id: 6,
      dateNum: "02",
      dateMonth: "OCT",
      title: "Gandhi Jayanti",
      dayName: "Thursday",
      color: "#ea580c",
      bgColor: "#fff7ed"
    }
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
      minHeight: "100%",
      width: "100%"
    }}>

      {/* ════════════ TOP HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem",
        borderBottom: "1px solid #f1f5f9"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("more") : window.history.back()}
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
            fontFamily: "'Outfit', sans-serif"
          }}>
            Holiday Calendar
          </h1>
        </div>

        <button
          type="button"
          onClick={() => alert("Calendar View request triggered...")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.2rem",
            color: "#0f172a"
          }}
        >
          <CalendarDays size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ MONTH NAVIGATION ROW ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.02)"
      }}>
        <button
          onClick={() => setCurrentMonth(currentMonth === "May 2025" ? "April 2025" : "May 2025")}
          style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <ChevronLeft size={20} color="#0f172a" strokeWidth={2.2} />
        </button>

        <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#1e3a8a", fontFamily: "'Outfit', sans-serif" }}>
          {currentMonth}
        </span>

        <button
          onClick={() => setCurrentMonth(currentMonth === "May 2025" ? "June 2025" : "May 2025")}
          style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <ChevronRight size={20} color="#0f172a" strokeWidth={2.2} />
        </button>
      </div>

      {/* ════════════ VIEW TOGGLE PILLS ════════════ */}
      <div style={{
        background: "#f1f5f9",
        borderRadius: "14px",
        padding: "0.3rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.3rem"
      }}>
        <button
          onClick={() => setActiveView("list")}
          style={{
            padding: "0.6rem",
            borderRadius: "10px",
            border: "none",
            background: activeView === "list" ? "#1d4ed8" : "transparent",
            color: activeView === "list" ? "#ffffff" : "#64748b",
            fontSize: "0.85rem",
            fontWeight: 800,
            cursor: "pointer"
          }}
        >
          List View
        </button>
        <button
          onClick={() => {
            setActiveView("calendar");
            alert("Switching to Calendar Grid...");
          }}
          style={{
            padding: "0.6rem",
            borderRadius: "10px",
            border: "none",
            background: activeView === "calendar" ? "#1d4ed8" : "transparent",
            color: activeView === "calendar" ? "#ffffff" : "#64748b",
            fontSize: "0.85rem",
            fontWeight: 800,
            cursor: "pointer"
          }}
        >
          Calendar View
        </button>
      </div>

      {/* ════════════ HOLIDAY LIST ITEMS STACK ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
        overflow: "hidden"
      }}>
        {holidayList.map((item, idx) => {
          const isLast = idx === holidayList.length - 1;
          return (
            <div
              key={item.id}
              onClick={() => alert(`Details of ${item.title}`)}
              style={{
                padding: "0.9rem 1.15rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {/* Left side Date Box */}
                <div style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "14px",
                  background: item.bgColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: "1.15rem", fontWeight: 900, color: item.color, fontFamily: "'Outfit', sans-serif" }}>
                    {item.dateNum}
                  </span>
                  <span style={{ fontSize: "0.65rem", fontWeight: 800, color: item.color, letterSpacing: "0.04em", marginTop: "1px" }}>
                    {item.dateMonth}
                  </span>
                </div>

                {/* Title & Day */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e3a8a" }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#64748b" }}>
                    {item.dayName}
                  </span>
                </div>
              </div>

              {/* Right chevron */}
              <ChevronIcon size={18} color="#94a3b8" />
            </div>
          );
        })}
      </div>

    </div>
  );
}
