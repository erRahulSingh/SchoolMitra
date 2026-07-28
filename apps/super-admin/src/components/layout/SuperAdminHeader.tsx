"use client";

import React from "react";
import { Search, Bell, ShieldCheck, Activity, Sparkles } from "lucide-react";

export default function SuperAdminHeader() {
  return (
    <header style={{
      height: "70px",
      background: "rgba(10, 13, 22, 0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border-color)",
      position: "sticky",
      top: 0,
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2rem"
    }}>
      {/* Search Input */}
      <div style={{ position: "relative", width: "360px" }}>
        <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} size={16} />
        <input 
          type="text" 
          placeholder="Search school tenants, subscriptions, servers..." 
          style={{
            width: "100%",
            padding: "0.55rem 1rem 0.55rem 2.4rem",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            color: "#ffffff",
            fontSize: "0.85rem"
          }} 
        />
      </div>

      {/* Right User & Cluster Status */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        
        {/* Cluster Status Pill */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: "0.35rem 0.85rem",
          borderRadius: "99px",
          background: "rgba(16, 185, 129, 0.12)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          color: "#34d399",
          fontSize: "0.75rem",
          fontWeight: 800
        }}>
          <Activity size={14} />
          <span>Cluster Alpha Online</span>
        </div>

        {/* User Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border-color)", padding: "0.35rem 0.75rem 0.35rem 0.5rem", borderRadius: "99px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", color: "#fff", boxShadow: "0 0 12px var(--primary-glow)" }}>
            HQ
          </div>
          <div>
            <div style={{ fontSize: "0.825rem", fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>Company HQ Admin</div>
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 1 }}>Super Administrator</div>
          </div>
        </div>

      </div>
    </header>
  );
}
