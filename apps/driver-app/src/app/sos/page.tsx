"use client";

import React, { useState } from "react";
import { 
  AlertTriangle, ShieldAlert, Car, Wrench, TrafficCone, 
  Stethoscope, Bell, Radio, CheckCircle2 
} from "lucide-react";

export default function SosPage() {
  const [triggeredAlert, setTriggeredAlert] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const emergencyCategories = [
    { id: "accident", label: "Accident Alert", desc: "Vehicle Collision / Crash", icon: Car, color: "#ef4444", bg: "rgba(239, 68, 68, 0.18)" },
    { id: "breakdown", label: "Vehicle Breakdown", desc: "Engine Failure / Flat Tyre", icon: Wrench, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.18)" },
    { id: "traffic", label: "Traffic Delay", desc: "Severe Jam / Route Block", icon: TrafficCone, color: "#38bdf8", bg: "rgba(56, 189, 248, 0.18)" },
    { id: "medical", label: "Medical Emergency", desc: "Student / Driver Health Crisis", icon: Stethoscope, color: "#ec4899", bg: "rgba(236, 72, 153, 0.18)" }
  ];

  const handleBroadcastSOS = (id: string, label: string) => {
    setActiveTab(id);
    const msg = `🚨 EMERGENCY BROADCAST: "${label.toUpperCase()}" alert dispatched! School Admin Console & All Parents have been notified with live GPS coordinates.`;
    setTriggeredAlert(msg);
  };

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#f8fafc",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* HEADER BANNER */}
      <div style={{
        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.22) 0%, rgba(15, 23, 42, 0.9) 100%)",
        border: "1px solid rgba(239, 68, 68, 0.4)",
        borderRadius: 20,
        padding: "1.1rem 1.25rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: "linear-gradient(135deg, #ef4444, #b91c1c)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)"
          }}>
            <ShieldAlert size={26} />
          </div>
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>SOS Emergency Dispatch</div>
            <div style={{ fontSize: "0.72rem", color: "#f87171", fontWeight: 800, marginTop: 1 }}>
              Instant Admin & Parent Alert Center
            </div>
          </div>
        </div>

        <span className="driver-emblem" style={{
          background: "rgba(239, 68, 68, 0.25)", border: "1px solid rgba(239, 68, 68, 0.5)",
          color: "#f87171", padding: "0.3rem 0.65rem", borderRadius: 99,
          fontSize: "0.72rem", fontWeight: 800
        }}>
          CRITICAL HOTLINE
        </span>
      </div>

      {/* BROADCASTED ALERT BANNER */}
      {triggeredAlert && (
        <div style={{
          background: "linear-gradient(135deg, #ef4444, #991b1b)",
          border: "2px solid #f87171",
          borderRadius: 16,
          padding: "1rem",
          color: "#fff",
          fontSize: "0.82rem",
          fontWeight: 800,
          lineHeight: 1.45,
          boxShadow: "0 8px 30px rgba(239, 68, 68, 0.5)",
          animation: "fadeIn 0.3s ease"
        }}>
          {triggeredAlert}
        </div>
      )}

      {/* 4 SPECIFIC EMERGENCY CATEGORY BUTTONS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Select Emergency Incident Type
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {emergencyCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleBroadcastSOS(item.id, item.label)}
              style={{
                background: activeTab === item.id ? item.color : "rgba(15, 23, 42, 0.85)",
                border: `1.5px solid ${item.color}`,
                borderRadius: 18,
                padding: "1rem 0.85rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.45rem",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: activeTab === item.id ? `0 6px 20px ${item.color}60` : "none"
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 12, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", color: item.color }}>
                <item.icon size={20} />
              </div>

              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 900, color: activeTab === item.id ? "#fff" : "#f8fafc" }}>{item.label}</div>
                <div style={{ fontSize: "0.68rem", color: activeTab === item.id ? "rgba(255,255,255,0.8)" : "#94a3b8", marginTop: 2 }}>{item.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* TARGET BROADCAST BADGES */}
      <div style={{ background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "0.85rem 1rem" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#cbd5e1", marginBottom: "0.5rem" }}>Alert Broadcast Targets:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.72rem", color: "#94a3b8" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <CheckCircle2 size={14} color="#10b981" /> 🚨 <strong>School Admin Command Center Console</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <CheckCircle2 size={14} color="#10b981" /> 📱 <strong>All Route 1 Parents via Push Notification</strong>
          </div>
        </div>
      </div>

    </div>
  );
}
