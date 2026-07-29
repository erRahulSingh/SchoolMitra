"use client";

import React, { useState } from "react";
import { Sliders, Sparkles, Shield, ToggleLeft, ToggleRight } from "lucide-react";

export default function SaaSFeatureTogglesPage() {
  const [flags, setFlags] = useState([
    { id: "f1", name: "Live GPS Bus Telemetry Engine", key: "FEATURE_GPS_TRACKING", description: "Real-time 3-second Socket.IO vehicle tracking for Parent & Driver app", enabled: true },
    { id: "f2", name: "Student RFID Gate Boarding Taps", key: "FEATURE_RFID_INTEGRATION", description: "Hardware RFID card tap logging for student arrival & pickup", enabled: true },
    { id: "f3", name: "WhatsApp Notification Dispatch Gateway", key: "FEATURE_WHATSAPP_ALERTS", description: "Send automated WhatsApp alerts for fees, attendance, and SOS", enabled: true },
    { id: "f4", name: "Razorpay / UPI Instant Payment Gateway", key: "FEATURE_ONLINE_FEES", description: "Direct fee payment collection in Parent App via UPI, Cards, and NetBanking", enabled: true },
    { id: "f5", name: "AI Report Card Generator & Grade Analytics", key: "FEATURE_REPORT_CARD_AI", description: "Automated student performance insights & report card remark generation", enabled: false }
  ]);

  const toggleFlag = (id: string) => {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Platform Control Center
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Global Feature Toggles & Canary Flags
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Enable or disable platform features across all tenant portals instantly.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {flags.map((flag) => (
          <div key={flag.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", borderRadius: 12, background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-heading)" }}>{flag.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, fontFamily: "monospace", marginTop: 2 }}>{flag.key}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{flag.description}</div>
            </div>

            <button
              onClick={() => toggleFlag(flag.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: flag.enabled ? "var(--success)" : "var(--text-muted)"
              }}
            >
              {flag.enabled ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
