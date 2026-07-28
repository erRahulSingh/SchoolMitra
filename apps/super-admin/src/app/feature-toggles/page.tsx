"use client";

import React, { useState } from "react";
import { 
  Sliders, Shield, RefreshCw, Sparkles, CheckCircle2, 
  AlertCircle, X, Search, Plus, Radio, Server, Database 
} from "lucide-react";

export default function FeatureTogglesPage() {
  const [activeTab, setActiveTab] = useState<"modules" | "flags" | "version">("modules");
  const [saved, setSaved] = useState(false);

  // Tenant Modules State
  const [modules, setModules] = useState([
    { name: "Live GPS Transport Tracking", code: "MOD-GPS", description: "Provides live bus tracking on map and ETA alerts", enabled: true, tier: "Growth & Enterprise" },
    { name: "Online Fees Payment Integration", code: "MOD-FEES", description: "Enables UPI/Card Razorpay gateway billing", enabled: true, tier: "All Plans" },
    { name: "WhatsApp Alerts Broadcast", code: "MOD-WHATSAPP", description: "Sends daily homework & announcements via WhatsApp API", enabled: false, tier: "Enterprise Pro only" },
    { name: "CBSE Report Card Generator", code: "MOD-REPORT", description: "Automated gradebook generation based on exam templates", enabled: true, tier: "Growth & Enterprise" }
  ]);

  // Feature Flags State
  const [flags, setFlags] = useState([
    { name: "Beta: Real-time Socket.IO chat telemetry", key: "ff_socket_chat", description: "Enables real-time websocket delivery protocol", active: true },
    { name: "Optimized PDF generation worker node", key: "ff_pdf_worker", description: "Delegates PDF report card compiling to Lambda server", active: false },
    { name: "Razorpay UPI Auto-Pay subscription", key: "ff_razorpay_autopay", description: "Recurring monthly auto-renew billing", active: true }
  ]);

  // Version Rollout State
  const [releases] = useState([
    { version: "v2.4.0 (Latest Stable)", status: "Active (Production)", date: "25 Jul 2026", rolloutRatio: "100% of schools", description: "Upgraded GPS polling and Daily Attendance marks table UI." },
    { version: "v2.3.5", status: "Deprecated", date: "10 Jun 2026", rolloutRatio: "0%", description: "Core performance tuning for Express API server." }
  ]);

  const toggleModule = (code: string) => {
    setModules(prev => prev.map(m => m.code === code ? { ...m, enabled: !m.enabled } : m));
  };

  const toggleFlag = (key: string) => {
    setFlags(prev => prev.map(f => f.key === key ? { ...f, active: !f.active } : f));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="glass-card" style={{
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(99, 102, 241, 0.12) 100%)",
        border: "1px solid var(--border-glow)",
        padding: "1.75rem 2rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(139, 92, 246, 0.2)", border: "1px solid rgba(139, 92, 246, 0.4)", color: "#c084fc", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sliders size={14} /> SaaS Feature Flags & Module Toggles
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Feature & Module Management
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: "0.875rem" }}>
            Enable or disable ERP modules globally for tenant tiers, configure real-time feature flags, and manage platform version rollouts.
          </p>
        </div>

        <button onClick={handleSave} className="btn btn-primary">
          {saved ? <><CheckCircle2 size={16} /> Saved!</> : <><Sliders size={16} /> Save Changes</>}
        </button>
      </div>

      {/* 3 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        {[
          { id: "modules", label: "Enable/Disable SaaS Modules", icon: Sliders },
          { id: "flags", label: "Feature Flags (A/B Test)", icon: Radio },
          { id: "version", label: "Version Control & Rollouts", icon: Server }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}>
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB 1: ENABLE/DISABLE MODULES ════════════ */}
      {activeTab === "modules" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {modules.map((m) => (
            <div key={m.code} className="glass-card" style={{
              padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontWeight: 800, color: "#fff", fontSize: "1.05rem" }}>{m.name}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--primary)", fontFamily: "monospace" }}>{m.code}</span>
                </div>
                <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: 4 }}>{m.description}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: 4, fontWeight: 700 }}>Tier Level: {m.tier}</div>
              </div>

              {/* Toggle Switch */}
              <div 
                onClick={() => toggleModule(m.code)}
                style={{
                  width: 50, height: 26, borderRadius: 99, cursor: "pointer",
                  background: m.enabled ? "var(--primary)" : "rgba(255,255,255,0.08)",
                  position: "relative", transition: "background 0.2s"
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", background: "#fff",
                  position: "absolute", top: 3,
                  left: m.enabled ? 27 : 3,
                  transition: "left 0.2s"
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ TAB 2: FEATURE FLAGS ════════════ */}
      {activeTab === "flags" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {flags.map((f) => (
            <div key={f.key} className="glass-card" style={{
              padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <div style={{ fontWeight: 800, color: "#fff", fontSize: "1.05rem" }}>{f.name}</div>
                <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: 4 }}>{f.description}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontFamily: "monospace", marginTop: 4 }}>{f.key}</div>
              </div>

              {/* Toggle Switch */}
              <div 
                onClick={() => toggleFlag(f.key)}
                style={{
                  width: 50, height: 26, borderRadius: 99, cursor: "pointer",
                  background: f.active ? "var(--success)" : "rgba(255,255,255,0.08)",
                  position: "relative", transition: "background 0.2s"
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", background: "#fff",
                  position: "absolute", top: 3,
                  left: f.active ? 27 : 3,
                  transition: "left 0.2s"
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ TAB 3: VERSION CONTROL ════════════ */}
      {activeTab === "version" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.25rem" }}>SaaS Platform Release Rollouts</h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>Version</th><th>Rollout Status</th><th>Release Date</th><th>Rollout Ratio</th><th>Description</th></tr>
              </thead>
              <tbody>
                {releases.map((rel, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 900, color: "var(--primary)", fontFamily: "monospace" }}>{rel.version}</td>
                    <td><span className={`badge ${rel.status.includes("Active") ? "badge-success" : "badge-secondary"}`}>{rel.status}</span></td>
                    <td style={{ color: "var(--text-muted)" }}>{rel.date}</td>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{rel.rolloutRatio}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.825rem" }}>{rel.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
