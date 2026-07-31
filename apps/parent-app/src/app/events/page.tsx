"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Search,
  X,
  CheckCircle2
} from "lucide-react";

interface EventsPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function EventsPage({ language = "en", onNavigate }: EventsPageProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "ongoing" | "past">("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [rsvpState, setRsvpState] = useState<Record<number, boolean>>({});

  const eventsList = [
    {
      id: 1,
      title: "Annual Sports Day 2025",
      date: "25 May 2025 • 09:00 AM",
      location: "School Ground",
      imgUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=150",
      btnColor: "#312e81",
      desc: "Inter-house sports competitions, track events, and march past. Parents are invited for the grand opening ceremony.",
      chiefGuest: "Mr. Rajeev Kumar (Former Olympian)"
    },
    {
      id: 2,
      title: "Science Exhibition 2025",
      date: "05 Jun 2025 • 11:00 AM",
      location: "Science Lab",
      imgUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=150",
      btnColor: "#1d4ed8",
      desc: "Working models and robotics projects displayed by students from Class 5th to 10th.",
      chiefGuest: "Dr. A. K. Sharma (ISRO Scientist)"
    },
    {
      id: 3,
      title: "Independence Day Celebration",
      date: "15 Aug 2025 • 08:00 AM",
      location: "School Campus",
      imgUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=150",
      btnColor: "#15803d",
      desc: "Flag hoisting ceremony followed by cultural dance performances and patriotic songs.",
      chiefGuest: "School Chairman & Principal"
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
        {/* Left Side: Back Arrow + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("home") : window.history.back()}
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
            School Events
          </h1>
        </div>

        {/* Right Side: Search Icon */}
        <button
          type="button"
          onClick={() => alert("Search Event requested...")}
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
          <Search size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ 3 TABS SWITCHER (UPCOMING, ONGOING, PAST) ════════════ */}
      <div style={{
        background: "#f1f5f9",
        borderRadius: "14px",
        padding: "0.3rem",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0.3rem"
      }}>
        {[
          { id: "upcoming", label: "Upcoming" },
          { id: "ongoing", label: "Ongoing" },
          { id: "past", label: "Past" }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "0.6rem 0.5rem",
              borderRadius: "10px",
              border: "none",
              background: activeTab === tab.id ? "#1d4ed8" : "transparent",
              color: activeTab === tab.id ? "#ffffff" : "#64748b",
              fontSize: "0.85rem",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ════════════ EVENTS CARDS LIST ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {eventsList.map(item => {
          return (
            <div
              key={item.id}
              style={{
                background: "#ffffff",
                borderRadius: "22px",
                border: "1px solid #e2e8f0",
                padding: "1.2rem 1.15rem",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
            >
              {/* Top details: Left image, Right details */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                {/* Illustration cover image */}
                <div style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0"
                }}>
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Text metadata */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
                  <h3 style={{
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: "#1e3a8a",
                    margin: 0,
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {item.title}
                  </h3>

                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b" }}>
                    {item.date}
                  </span>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>
                    <MapPin size={14} color="#64748b" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Bottom View Details full width button */}
              <button
                type="button"
                onClick={() => setSelectedEvent(item)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: item.btnColor,
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: `0 4px 12px rgba(15, 23, 42, 0.05)`
                }}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* ════════════ EVENT DETAIL MODAL ════════════ */}
      {selectedEvent && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div style={{
            width: "100%", maxWidth: "440px", background: "#ffffff",
            borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            padding: "1.25rem 1.25rem 2rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.1rem",
            boxShadow: "0 -8px 24px rgba(0,0,0,0.1)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                {selectedEvent.title}
              </h3>
              <button type="button" onClick={() => setSelectedEvent(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <div style={{ padding: "1rem", background: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ fontSize: "0.85rem", color: "#1d4ed8", fontWeight: 700 }}>📅 {selectedEvent.date}</div>
              <div style={{ fontSize: "0.85rem", color: "#334155", fontWeight: 700 }}>📍 Location: {selectedEvent.location}</div>
              <div style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.45, marginTop: "4px" }}>{selectedEvent.desc}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 700, marginTop: "4px" }}>Chief Guest: {selectedEvent.chiefGuest}</div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => {
                  setRsvpState(prev => ({ ...prev, [selectedEvent.id]: true }));
                  alert("RSVP Confirmed for " + selectedEvent.title + "!");
                }}
                style={{
                  flex: 1, padding: "0.75rem", background: rsvpState[selectedEvent.id] ? "#16a34a" : "#1d4ed8",
                  border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem"
                }}
              >
                <CheckCircle2 size={18} />
                <span>{rsvpState[selectedEvent.id] ? "RSVP Confirmed ✅" : "Confirm Attendance (RSVP)"}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                style={{ padding: "0.75rem 1rem", background: "#f1f5f9", border: "none", borderRadius: "14px", color: "#334155", fontWeight: 700, cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
