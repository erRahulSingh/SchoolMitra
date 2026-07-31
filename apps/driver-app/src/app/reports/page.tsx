"use client";

import React, { useState } from "react";
import { 
  ArrowLeft,
  ShieldAlert,
  Camera,
  Car,
  Wrench,
  Clock,
  HelpCircle,
  FileText
} from "lucide-react";

interface IncidentCategory {
  id: string;
  label: string;
  desc: string;
  icon: any;
  color: string;
  bg: string;
}

export default function DriverReportsPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [selectedType, setSelectedType] = useState<string>("traffic");
  const [details, setDetails] = useState("");

  const categories: IncidentCategory[] = [
    { id: "accident", label: "Accident", desc: "Any accident or collision", icon: Car, color: "#ef4444", bg: "#fef2f2" },
    { id: "breakdown", label: "Breakdown", desc: "Vehicle breakdown issue", icon: Wrench, color: "#f59e0b", bg: "#fff7ed" },
    { id: "traffic", label: "Traffic / Delay", desc: "Traffic jam or route delay", icon: Clock, color: "#2563eb", bg: "#eff6ff" },
    { id: "other", label: "Other Issue", desc: "Any other issue", icon: HelpCircle, color: "#64748b", bg: "#f1f5f9" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Incident Report Submitted successfully! \nType: ${selectedType} \nDetails: ${details || "None"}`);
    setDetails("");
    if (onNavigate) {
      onNavigate("dashboard");
    }
  };

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



      {/* ════════════ TOP CONGRATS PANEL ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0b2265 0%, #0d3880 55%, #081a4b 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(11, 34, 101, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", maxWidth: "70%" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
            Report an Incident
          </h2>
          <p style={{ fontSize: "0.76rem", color: "#bfdbfe", margin: 0, fontWeight: 500, lineHeight: 1.45 }}>
            Help us keep students safe by reporting any incidents on the trip.
          </p>
        </div>

        {/* Shield graphic frame */}
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "rgba(255, 255, 255, 0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f59e0b",
          flexShrink: 0
        }}>
          <ShieldAlert size={26} />
        </div>
      </div>

      {/* ════════════ INCIDENT TYPE SELECTOR ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>
          Incident Type
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {categories.map((category) => {
            const isSelected = selectedType === category.id;

            return (
              <div
                key={category.id}
                onClick={() => setSelectedType(category.id)}
                style={{
                  background: "#ffffff",
                  border: isSelected ? "2px solid #2563eb" : "1px solid #cbd5e1",
                  borderRadius: "16px",
                  padding: "0.95rem 1.15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: category.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: category.color,
                    flexShrink: 0
                  }}>
                    <category.icon size={16} strokeWidth={2.5} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>{category.label}</span>
                    <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>{category.desc}</span>
                  </div>
                </div>

                {/* Radio check circle */}
                <div style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: isSelected ? "none" : "2px solid #cbd5e1",
                  background: isSelected ? "#2563eb" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {isSelected && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffffff" }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════ DETAILS TEXTAREA box ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e3a8a" }}>Incident Details</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Describe the incident..."
          maxLength={300}
          style={{
            width: "100%",
            height: "80px",
            padding: "0.75rem 1rem",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "14px",
            fontSize: "0.85rem",
            outline: "none",
            resize: "none",
            color: "#0f172a",
            fontWeight: 600
          }}
        />
        <span style={{ fontSize: "0.68rem", color: "#94a3b8", textAlign: "right", fontWeight: 600 }}>
          {details.length}/300
        </span>
      </div>

      {/* ════════════ UPLOAD PHOTOS BUTTON ════════════ */}
      <button
        onClick={() => alert("Open Camera / File Uploader")}
        style={{
          width: "100%",
          padding: "0.95rem",
          background: "#ffffff",
          color: "#475569",
          border: "1px solid #cbd5e1",
          borderRadius: "14px",
          fontSize: "0.88rem",
          fontWeight: 800,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.45rem"
        }}
      >
        <Camera size={16} strokeWidth={2.5} />
        <span>Upload Photos / Videos</span>
      </button>

      {/* ════════════ SUBMIT ACTION BUTTON ════════════ */}
      <div style={{ marginTop: "auto", paddingTop: "0.4rem" }}>
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "1.05rem",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            fontSize: "0.95rem",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)"
          }}
        >
          Submit Report
        </button>
      </div>

    </div>
  );
}
