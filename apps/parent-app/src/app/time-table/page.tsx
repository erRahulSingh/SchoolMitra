"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  CalendarDays, 
  ChevronDown, 
  Coffee, 
  NotebookPen, 
  Clock, 
  User, 
  MapPin, 
  Download, 
  X, 
  Utensils, 
  Sparkles, 
  BookOpen, 
  MessageSquare,
  ShieldCheck
} from "lucide-react";

interface TimeTablePageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function TimeTablePage({ language = "en", onNavigate }: TimeTablePageProps) {
  const isHi = language === "hi";

  const [activeDay, setActiveDay] = useState<"Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat">("Mon");
  const [selectedTerm, setSelectedTerm] = useState("Term 1 (2024–25)");
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null);

  const t = {
    title: isHi ? "समय सारणी" : "Time Table",
    classStr: "Class 5th – A",
    breakStr: isHi ? "ब्रेक" : "Recess Break",
    lunchBreak: isHi ? "लंच ब्रेक" : "Lunch Break",
    noteTitle: isHi ? "नोट" : "Important Note",
    noteText: isHi 
      ? "समय सारणी परिवर्तन के अधीन है। कृपया किसी भी बदलाव के लिए नोटिस बोर्ड देखें।" 
      : "Time table is subject to change. Please check the notice board for real-time updates.",
    downloadPDF: isHi ? "समय सारणी डाउनलोड करें" : "Download Time Table (PDF)",
    close: isHi ? "बंद करें" : "Close"
  };

  // Ultra-premium structured period schedules for Class 5th - A
  const scheduleData = {
    Mon: [
      {
        period: "1",
        subject: "English Literature",
        teacher: "Mrs. Priya Singh",
        time: "08:00 AM – 08:45 AM",
        room: "Room 12",
        topic: "Chapter 4: The Golden Bird - Reading & Q/A",
        color: "#2563eb",
        bgColor: "#eff6ff"
      },
      {
        period: "2",
        subject: "Mathematics",
        teacher: "Mr. Rajesh Kumar",
        time: "08:45 AM – 09:30 AM",
        room: "Room 14",
        topic: "Fractions & Decimals - Practice Set 4.2",
        color: "#7c3aed",
        bgColor: "#f3e8ff"
      },
      {
        isBreak: true,
        type: "recess",
        time: "09:30 AM – 09:45 AM",
        label: "Recess Break ☕",
        sub: "15 mins snack break"
      },
      {
        period: "3",
        subject: "Science",
        teacher: "Mrs. Neha Gupta",
        time: "09:45 AM – 10:30 AM",
        room: "Room 16",
        topic: "Plant Physiology & Photosynthesis",
        color: "#16a34a",
        bgColor: "#ecfdf5"
      },
      {
        period: "4",
        subject: "Social Studies",
        teacher: "Mr. Amit Verma",
        time: "10:30 AM – 11:15 AM",
        room: "Room 13",
        topic: "Our Earth & Solar System Globe Studies",
        color: "#0891b2",
        bgColor: "#e0f2fe"
      },
      {
        isBreak: true,
        type: "lunch",
        time: "11:15 AM – 11:30 AM",
        label: "Lunch Break 🍱",
        sub: "15 mins main lunch time"
      },
      {
        period: "5",
        subject: "Hindi",
        teacher: "Mrs. Kavita Mehta",
        time: "11:30 AM – 12:15 PM",
        room: "Room 11",
        topic: "व्याकरण - संज्ञा और सर्वनाम",
        color: "#ea580c",
        bgColor: "#fff7ed"
      },
      {
        period: "6",
        subject: "Computer Science",
        teacher: "Mr. Sandeep Sharma",
        time: "12:15 PM – 01:00 PM",
        room: "Lab #2",
        topic: "Introduction to Scratch Programming",
        color: "#d97706",
        bgColor: "#fffbeb"
      }
    ],
    Tue: [
      {
        period: "1",
        subject: "Mathematics",
        teacher: "Mr. Rajesh Kumar",
        time: "08:00 AM – 08:45 AM",
        room: "Room 14",
        topic: "Word Problems on Long Division",
        color: "#7c3aed",
        bgColor: "#f3e8ff"
      },
      {
        period: "2",
        subject: "English Grammar",
        teacher: "Mrs. Priya Singh",
        time: "08:45 AM – 09:30 AM",
        room: "Room 12",
        topic: "Tenses & Active Passive Voice",
        color: "#2563eb",
        bgColor: "#eff6ff"
      },
      {
        isBreak: true,
        type: "recess",
        time: "09:30 AM – 09:45 AM",
        label: "Recess Break ☕",
        sub: "15 mins snack break"
      },
      {
        period: "3",
        subject: "Social Studies",
        teacher: "Mr. Amit Verma",
        time: "09:45 AM – 10:30 AM",
        room: "Room 13",
        topic: "Indian Freedom Movement History",
        color: "#0891b2",
        bgColor: "#e0f2fe"
      },
      {
        period: "4",
        subject: "Science Lab",
        teacher: "Mrs. Neha Gupta",
        time: "10:30 AM – 11:15 AM",
        room: "Lab #1",
        topic: "Microscope & Cell Structure Demonstration",
        color: "#16a34a",
        bgColor: "#ecfdf5"
      },
      {
        isBreak: true,
        type: "lunch",
        time: "11:15 AM – 11:30 AM",
        label: "Lunch Break 🍱",
        sub: "15 mins main lunch time"
      },
      {
        period: "5",
        subject: "Art & Craft",
        teacher: "Mrs. Ananya Roy",
        time: "11:30 AM – 12:15 PM",
        room: "Art Room",
        topic: "Water Color Landscape Painting",
        color: "#e11d48",
        bgColor: "#ffe4e6"
      },
      {
        period: "6",
        subject: "Hindi",
        teacher: "Mrs. Kavita Mehta",
        time: "12:15 PM – 01:00 PM",
        room: "Room 11",
        topic: "कविता पाठ - हम पंछी उन्मुक्त गगन के",
        color: "#ea580c",
        bgColor: "#fff7ed"
      }
    ],
    Wed: [
      {
        period: "1",
        subject: "Science",
        teacher: "Mrs. Neha Gupta",
        time: "08:00 AM – 08:45 AM",
        room: "Room 16",
        topic: "States of Matter & Phase Change",
        color: "#16a34a",
        bgColor: "#ecfdf5"
      },
      {
        period: "2",
        subject: "Hindi Literature",
        teacher: "Mrs. Kavita Mehta",
        time: "08:45 AM – 09:30 AM",
        room: "Room 11",
        topic: "अध्याय 5 - पंच परमेश्वर कहानी",
        color: "#ea580c",
        bgColor: "#fff7ed"
      },
      {
        isBreak: true,
        type: "recess",
        time: "09:30 AM – 09:45 AM",
        label: "Recess Break ☕",
        sub: "15 mins snack break"
      },
      {
        period: "3",
        subject: "Mathematics",
        teacher: "Mr. Rajesh Kumar",
        time: "09:45 AM – 10:30 AM",
        room: "Room 14",
        topic: "Geometry - Angles & Triangles",
        color: "#7c3aed",
        bgColor: "#f3e8ff"
      },
      {
        period: "4",
        subject: "Computer Practical",
        teacher: "Mr. Sandeep Sharma",
        time: "10:30 AM – 11:15 AM",
        room: "Lab #2",
        topic: "MS PowerPoint Slide Presentation",
        color: "#d97706",
        bgColor: "#fffbeb"
      },
      {
        isBreak: true,
        type: "lunch",
        time: "11:15 AM – 11:30 AM",
        label: "Lunch Break 🍱",
        sub: "15 mins main lunch time"
      },
      {
        period: "5",
        subject: "English",
        teacher: "Mrs. Priya Singh",
        time: "11:30 AM – 12:15 PM",
        room: "Room 12",
        topic: "Essay Writing & Vocabulary Test",
        color: "#2563eb",
        bgColor: "#eff6ff"
      },
      {
        period: "6",
        subject: "Physical Education",
        teacher: "Mr. Vikram Singh",
        time: "12:15 PM – 01:00 PM",
        room: "Ground",
        topic: "Basketball & Outdoor Track Drills",
        color: "#16a34a",
        bgColor: "#ecfdf5"
      }
    ],
    Thu: [
      {
        period: "1",
        subject: "English Literature",
        teacher: "Mrs. Priya Singh",
        time: "08:00 AM – 08:45 AM",
        room: "Room 12",
        topic: "Poem Recitation - Daffodils",
        color: "#2563eb",
        bgColor: "#eff6ff"
      },
      {
        period: "2",
        subject: "Mathematics",
        teacher: "Mr. Rajesh Kumar",
        time: "08:45 AM – 09:30 AM",
        room: "Room 14",
        topic: "Perimeter & Area Calculations",
        color: "#7c3aed",
        bgColor: "#f3e8ff"
      },
      {
        isBreak: true,
        type: "recess",
        time: "09:30 AM – 09:45 AM",
        label: "Recess Break ☕",
        sub: "15 mins snack break"
      },
      {
        period: "3",
        subject: "Science",
        teacher: "Mrs. Neha Gupta",
        time: "09:45 AM – 10:30 AM",
        room: "Room 16",
        topic: "Human Digestive System Diagram",
        color: "#16a34a",
        bgColor: "#ecfdf5"
      },
      {
        period: "4",
        subject: "Social Studies",
        teacher: "Mr. Amit Verma",
        time: "10:30 AM – 11:15 AM",
        room: "Room 13",
        topic: "Maps, Latitudes & Longitudes",
        color: "#0891b2",
        bgColor: "#e0f2fe"
      },
      {
        isBreak: true,
        type: "lunch",
        time: "11:15 AM – 11:30 AM",
        label: "Lunch Break 🍱",
        sub: "15 mins main lunch time"
      },
      {
        period: "5",
        subject: "Hindi",
        teacher: "Mrs. Kavita Mehta",
        time: "11:30 AM – 12:15 PM",
        room: "Room 11",
        topic: "अनेक शब्दों के लिए एक शब्द",
        color: "#ea580c",
        bgColor: "#fff7ed"
      },
      {
        period: "6",
        subject: "Library Period",
        teacher: "Mrs. Sunita Paul",
        time: "12:15 PM – 01:00 PM",
        room: "Library",
        topic: "Book Reading & Issue Session",
        color: "#9333ea",
        bgColor: "#f3e8ff"
      }
    ],
    Fri: [
      {
        period: "1",
        subject: "Mathematics Test",
        teacher: "Mr. Rajesh Kumar",
        time: "08:00 AM – 08:45 AM",
        room: "Room 14",
        topic: "Weekly Speed Test on Multiplication",
        color: "#7c3aed",
        bgColor: "#f3e8ff"
      },
      {
        period: "2",
        subject: "Science",
        teacher: "Mrs. Neha Gupta",
        time: "08:45 AM – 09:30 AM",
        room: "Room 16",
        topic: "Friction & Force Physics Concept",
        color: "#16a34a",
        bgColor: "#ecfdf5"
      },
      {
        isBreak: true,
        type: "recess",
        time: "09:30 AM – 09:45 AM",
        label: "Recess Break ☕",
        sub: "15 mins snack break"
      },
      {
        period: "3",
        subject: "English",
        teacher: "Mrs. Priya Singh",
        time: "09:45 AM – 10:30 AM",
        room: "Room 12",
        topic: "Story Writing Competition Practice",
        color: "#2563eb",
        bgColor: "#eff6ff"
      },
      {
        period: "4",
        subject: "Hindi",
        teacher: "Mrs. Kavita Mehta",
        time: "10:30 AM – 11:15 AM",
        room: "Room 11",
        topic: "पत्र लेखन - औपचारिक और अनौपचारिक",
        color: "#ea580c",
        bgColor: "#fff7ed"
      },
      {
        isBreak: true,
        type: "lunch",
        time: "11:15 AM – 11:30 AM",
        label: "Lunch Break 🍱",
        sub: "15 mins main lunch time"
      },
      {
        period: "5",
        subject: "Computer Lab",
        teacher: "Mr. Sandeep Sharma",
        time: "11:30 AM – 12:15 PM",
        room: "Lab #2",
        topic: "Internet Safety & Cyber Etiquettes",
        color: "#d97706",
        bgColor: "#fffbeb"
      },
      {
        period: "6",
        subject: "Music & Drama",
        teacher: "Mrs. Meenakshi Iyer",
        time: "12:15 PM – 01:00 PM",
        room: "Music Room",
        topic: "Vocal Singing & Tabla Practice",
        color: "#e11d48",
        bgColor: "#ffe4e6"
      }
    ],
    Sat: [
      {
        period: "1",
        subject: "Moral Science & Values",
        teacher: "Mrs. Priya Singh",
        time: "08:00 AM – 08:45 AM",
        room: "Room 12",
        topic: "Honesty & Team Ethics Discussion",
        color: "#2563eb",
        bgColor: "#eff6ff"
      },
      {
        period: "2",
        subject: "General Knowledge Quiz",
        teacher: "Mr. Amit Verma",
        time: "08:45 AM – 09:30 AM",
        room: "Room 13",
        topic: "Current Affairs & Science Quiz",
        color: "#0891b2",
        bgColor: "#e0f2fe"
      },
      {
        isBreak: true,
        type: "recess",
        time: "09:30 AM – 09:45 AM",
        label: "Recess Break ☕",
        sub: "15 mins snack break"
      },
      {
        period: "3",
        subject: "Club Activity",
        teacher: "Faculty Team",
        time: "09:45 AM – 10:30 AM",
        room: "Activity Hall",
        topic: "Robotics / Eco Club Activity",
        color: "#16a34a",
        bgColor: "#ecfdf5"
      },
      {
        period: "4",
        subject: "House Assembly",
        teacher: "House Masters",
        time: "10:30 AM – 11:15 AM",
        room: "Main Ground",
        topic: "Inter-House March Past & Awards",
        color: "#7c3aed",
        bgColor: "#f3e8ff"
      }
    ]
  };

  const currentPeriods = scheduleData[activeDay] || scheduleData["Mon"];

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ TOP HEADER BAR (EXACT MATCH REFERENCE SCREENSHOT) ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem"
      }}>
        {/* Left Side: Back Arrow + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("academics") : window.history.back()}
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
            {t.title}
          </h1>
        </div>

        {/* Right Side: Calendar Action Squircle Button */}
        <button
          type="button"
          onClick={() => alert("Downloading official Time Table PDF...")}
          aria-label="Download Time Table"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "12px",
            background: "#f0f6ff",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)"
          }}
        >
          <CalendarDays size={20} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ CLASS & TERM HERO BANNER CARD (DEEP ROYAL BLUE GRADIENT) ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #092058 0%, #0d3880 55%, #071946 100%)",
        borderRadius: "22px",
        padding: "1.25rem 1.2rem",
        color: "#ffffff",
        boxShadow: "0 10px 25px -4px rgba(13, 56, 128, 0.4)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Left Text Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", zIndex: 2 }}>
          <h2 style={{
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.015em",
            lineHeight: 1.2
          }}>
            {t.classStr}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(6px)",
              padding: "0.2rem 0.65rem",
              borderRadius: "8px",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#93c5fd"
            }}>
              {selectedTerm}
            </span>
            <ChevronDown size={16} color="#93c5fd" strokeWidth={2.2} />
          </div>
        </div>

        {/* Right 3D Schedule Clipboard Vector Graphic */}
        <div style={{ position: "relative", width: "85px", height: "85px", flexShrink: 0, zIndex: 2 }}>
          <svg width="85" height="85" viewBox="0 0 100 100" fill="none">
            {/* Clipboard Frame */}
            <rect x="20" y="16" width="60" height="72" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="35" y="10" width="30" height="12" rx="4" fill="#f59e0b" />
            <circle cx="50" cy="14" r="3" fill="#ffffff" />

            {/* Grid Schedule Blocks */}
            <rect x="28" y="28" width="20" height="14" rx="3" fill="#3b82f6" opacity="0.8" />
            <rect x="52" y="28" width="20" height="14" rx="3" fill="#60a5fa" opacity="0.6" />
            <rect x="28" y="46" width="20" height="14" rx="3" fill="#60a5fa" opacity="0.6" />
            <rect x="52" y="46" width="20" height="14" rx="3" fill="#3b82f6" opacity="0.8" />
            <rect x="28" y="64" width="44" height="12" rx="3" fill="#93c5fd" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* ════════════ 6 DAY CAPSULE FILTER TABS (MON, TUE, WED, THU, FRI, SAT) ════════════ */}
      <div style={{
        background: "#f8fafc",
        borderRadius: "99px",
        padding: "0.3rem",
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "0.25rem",
        border: "1px solid #f1f5f9"
      }}>
        {(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const).map(day => (
          <button
            key={day}
            type="button"
            onClick={() => setActiveDay(day)}
            style={{
              padding: "0.55rem 0.2rem",
              borderRadius: "99px",
              border: "none",
              background: activeDay === day ? "#ffffff" : "transparent",
              color: activeDay === day ? "#1d4ed8" : "#64748b",
              fontSize: "0.82rem",
              fontWeight: activeDay === day ? 800 : 600,
              cursor: "pointer",
              boxShadow: activeDay === day ? "0 2px 8px rgba(15, 23, 42, 0.08)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            {day}
          </button>
        ))}
      </div>

      {/* ════════════ PERIOD SCHEDULE TIMELINE CARDS (NO OVERFLOW, ULTRA-PREMIUM) ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {currentPeriods.map((row: any, idx: number) => {
          if (row.isBreak) {
            return (
              <div
                key={idx}
                style={{
                  background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
                  borderRadius: "16px",
                  padding: "0.75rem 1rem",
                  border: "1px stroke #e9d5ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 10px rgba(147, 51, 234, 0.05)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <div style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(147, 51, 234, 0.12)"
                  }}>
                    {row.type === "lunch" ? (
                      <Utensils size={18} color="#9333ea" strokeWidth={2.2} />
                    ) : (
                      <Coffee size={18} color="#9333ea" strokeWidth={2.2} />
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#6b21a8", fontFamily: "'Outfit', sans-serif" }}>
                      {row.label}
                    </span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9333ea" }}>
                      {row.sub}
                    </span>
                  </div>
                </div>

                <div style={{
                  background: "#ffffff",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "8px",
                  fontSize: "0.74rem",
                  fontWeight: 800,
                  color: "#6b21a8",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
                }}>
                  {row.time}
                </div>
              </div>
            );
          }

          return (
            <div
              key={idx}
              onClick={() => setSelectedPeriod(row)}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "0.95rem 1rem",
                border: "1px solid #f1f5f9",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "transform 0.15s ease, boxShadow 0.15s ease"
              }}
            >
              {/* Left Side: Period Number Badge + Details */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                {/* Squircle Period Badge */}
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: row.bgColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: "0.55rem", fontWeight: 700, color: row.color, lineHeight: 1 }}>
                    PERIOD
                  </span>
                  <span style={{ fontSize: "1.1rem", fontWeight: 800, color: row.color, fontFamily: "'Outfit', sans-serif", lineHeight: 1, marginTop: "2px" }}>
                    {row.period}
                  </span>
                </div>

                {/* Subject & Teacher Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  <h3 style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#0f172a",
                    fontFamily: "'Outfit', sans-serif",
                    lineHeight: 1.2
                  }}>
                    {row.subject}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.76rem", color: "#64748b", fontWeight: 600 }}>
                    <span>👩‍🏫 {row.teacher}</span>
                  </div>

                  {/* Time Range Pill */}
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: row.color,
                    marginTop: "2px"
                  }}>
                    <Clock size={12} color={row.color} strokeWidth={2.2} />
                    <span>{row.time}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Room Location Capsule Badge */}
              <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: "0.35rem 0.65rem",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.74rem",
                fontWeight: 800,
                color: "#334155"
              }}>
                <MapPin size={12} color="#64748b" />
                <span>{row.room}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ════════════ NOTE CARD ════════════ */}
      <div style={{
        background: "#fffbeb",
        borderRadius: "18px",
        padding: "1rem 1.15rem",
        border: "1px solid #fef3c7",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.85rem",
        marginTop: "0.2rem"
      }}>
        {/* Orange Memo Icon Box */}
        <div style={{
          width: "38px",
          height: "38px",
          borderRadius: "12px",
          background: "#fef08a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          <NotebookPen size={20} color="#d97706" strokeWidth={2.2} />
        </div>

        {/* Text Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <h3 style={{
            fontSize: "0.88rem",
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "'Outfit', sans-serif"
          }}>
            {t.noteTitle}
          </h3>

          <p style={{
            fontSize: "0.78rem",
            color: "#475569",
            lineHeight: 1.45,
            fontWeight: 500,
            margin: 0
          }}>
            {t.noteText}
          </p>
        </div>
      </div>

      {/* ════════════ PERIOD DETAIL MODAL DRAWER ════════════ */}
      {selectedPeriod && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div style={{
            width: "100%", maxWidth: "440px", background: "#ffffff",
            borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            padding: "1.25rem 1.25rem 2rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <BookOpen size={20} color={selectedPeriod.color} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>
                  Period {selectedPeriod.period} - {selectedPeriod.subject}
                </h3>
              </div>
              <button type="button" onClick={() => setSelectedPeriod(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <div style={{ padding: "1rem", background: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ fontSize: "0.82rem", color: selectedPeriod.color, fontWeight: 700 }}>🕒 Time: {selectedPeriod.time}</div>
              <div style={{ fontSize: "0.82rem", color: "#334155", fontWeight: 700 }}>👩‍🏫 Teacher: {selectedPeriod.teacher}</div>
              <div style={{ fontSize: "0.82rem", color: "#334155", fontWeight: 700 }}>🚪 Location: {selectedPeriod.room}</div>
              <div style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.4, marginTop: "6px", paddingTop: "6px", borderTop: "1px solid #e2e8f0" }}>
                <strong>Today's Chapter Topic:</strong> {selectedPeriod.topic}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => {
                  setSelectedPeriod(null);
                  if (onNavigate) onNavigate("chat");
                  else alert("Opening message thread with " + selectedPeriod.teacher);
                }}
                style={{
                  flex: 1, padding: "0.75rem", background: selectedPeriod.color,
                  border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem"
                }}
              >
                <MessageSquare size={18} />
                <span>Message Teacher</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPeriod(null)}
                style={{ padding: "0.75rem 1rem", background: "#f1f5f9", border: "none", borderRadius: "14px", color: "#334155", fontWeight: 700, cursor: "pointer" }}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
