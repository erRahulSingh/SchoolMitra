"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Check, 
  Info,
  Calendar,
  CheckCircle2
} from "lucide-react";

interface ChecklistItem {
  id: string;
  name: string;
  status: string;
  checked: boolean;
}

interface VehicleChecklistPageProps {
  language?: string;
  onNavigate?: (tab: string) => void;
}

export default function VehicleChecklistPage({ onNavigate }: VehicleChecklistPageProps) {
  const [safetyItems, setSafetyItems] = useState<ChecklistItem[]>([
    { id: "s1", name: "Brakes", status: "Good", checked: true },
    { id: "s2", name: "Lights (Head, Tail, Indicator)", status: "Good", checked: true },
    { id: "s3", name: "Horn", status: "Good", checked: true },
    { id: "s4", name: "Wipers", status: "Good", checked: true },
    { id: "s5", name: "Mirrors", status: "Good", checked: true },
    { id: "s6", name: "Tyres", status: "Good", checked: true },
    { id: "s7", name: "Seat Belts", status: "Good", checked: true }
  ]);

  const [otherItems, setOtherItems] = useState<ChecklistItem[]>([
    { id: "o1", name: "First Aid Box", status: "Available", checked: true },
    { id: "o2", name: "Fire Extinguisher", status: "Available", checked: true },
    { id: "o3", name: "Fuel Level", status: "Sufficient", checked: true }
  ]);

  const handleToggleSafety = (id: string) => {
    setSafetyItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleToggleOther = (id: string) => {
    setOtherItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleComplete = () => {
    alert("Pre-Trip Vehicle Checklist Completed! All systems certified.");
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



      {/* ════════════ TOP TIMESTAMPS OVERVIEW CARD ════════════ */}
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
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "1rem", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            Pre-Trip Checklist
          </span>
          <span style={{ fontSize: "0.74rem", color: "#bfdbfe", fontWeight: 500, display: "flex", alignItems: "center", gap: "3px" }}>
            <Calendar size={12} />
            <span>15 May 2025 &bull; 06:30 AM</span>
          </span>
        </div>

        {/* All Good Status Badge */}
        <span style={{
          background: "#22c55e",
          color: "#ffffff",
          padding: "0.38rem 0.8rem",
          borderRadius: "99px",
          fontSize: "0.72rem",
          fontWeight: 800
        }}>
          All Good
        </span>
      </div>

      {/* ════════════ SAFETY ITEMS CHECKLIST ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>
          Safety Items
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
        }}>
          {safetyItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleSafety(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.9rem 1.15rem",
                borderBottom: "1px solid #f1f5f9",
                cursor: "pointer"
              }}
            >
              <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 700 }}>{item.name}</span>
              
              <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                <span style={{ fontSize: "0.78rem", color: item.checked ? "#16a34a" : "#dc2626", fontWeight: 800 }}>
                  {item.checked ? item.status : "Needs Attention"}
                </span>
                <div style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: item.checked ? "#16a34a" : "transparent",
                  border: item.checked ? "none" : "2px solid #cbd5e1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff"
                }}>
                  {item.checked && <Check size={11} strokeWidth={3} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ OTHER ITEMS CHECKLIST ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>
          Other Items
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
        }}>
          {otherItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleOther(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.9rem 1.15rem",
                borderBottom: "1px solid #f1f5f9",
                cursor: "pointer"
              }}
            >
              <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 700 }}>{item.name}</span>
              
              <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                <span style={{ fontSize: "0.78rem", color: item.checked ? "#16a34a" : "#dc2626", fontWeight: 800 }}>
                  {item.checked ? item.status : "Missing/Low"}
                </span>
                <div style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: item.checked ? "#16a34a" : "transparent",
                  border: item.checked ? "none" : "2px solid #cbd5e1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff"
                }}>
                  {item.checked && <Check size={11} strokeWidth={3} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ CHECKLIST COMPLETE ACTION BUTTON ════════════ */}
      <div style={{ marginTop: "0.4rem" }}>
        <button
          onClick={handleComplete}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.55rem",
            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)"
          }}
        >
          <CheckCircle2 size={18} fill="#ffffff" color="#2563eb" />
          <span>Checklist Completed</span>
        </button>
      </div>

    </div>
  );
}
