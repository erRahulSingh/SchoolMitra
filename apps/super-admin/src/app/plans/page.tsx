"use client";

import React, { useState } from "react";
import { Tag, Check, Sparkles, Plus, Edit3 } from "lucide-react";

export default function SaaSPlansPage() {
  const [plans] = useState([
    { name: "Starter Basic", price: "₹ 25,000 / yr", maxStudents: "500 Students", features: ["Core Student ERP", "Attendance & Marksheet", "Parent PWA App", "Email Support"], activeCount: 42, color: "var(--primary)" },
    { name: "Growth Plan", price: "₹ 45,000 / yr", maxStudents: "1,500 Students", features: ["Everything in Starter", "GPS Bus Telemetry", "Driver Cockpit App", "Fee Collection & GST", "Priority Phone Support"], activeCount: 58, color: "var(--secondary)" },
    { name: "Enterprise Pro", price: "₹ 75,000 / yr", maxStudents: "Unlimited Students", features: ["Everything in Growth", "RFID Gate Integration", "WhatsApp Notification Gateway", "Custom Domain & Branding", "24/7 Dedicated Account Manager"], activeCount: 48, color: "var(--success)" }
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Subscription Tier Architecture
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            SaaS Monetization & Feature Plans
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Configure subscription tiers, student capacity caps, and feature entitlements.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {plans.map((p, idx) => (
          <div key={idx} className="glass-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", color: p.color }}>{p.maxStudents}</span>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 900, marginTop: 2, color: "var(--text-heading)" }}>{p.name}</h3>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 6 }}>{p.price}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {p.features.map((feat, fidx) => (
                <div key={fidx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-main)" }}>
                  <Check size={16} color={p.color} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{p.activeCount} Active Schools</span>
              <button className="btn btn-secondary" style={{ padding: "0.4rem 0.75rem", fontSize: "0.78rem" }}>
                <Edit3 size={14} /> Edit Tier
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
