"use client";

import React, { useState } from "react";
import { Server, Activity, Cpu, HardDrive, CheckCircle2, Sparkles, RefreshCw } from "lucide-react";

export default function ServerHealthPage() {
  const [health] = useState({
    apiStatus: "Healthy (200 OK)",
    uptime: "99.98%",
    cpuLoad: "18.4%",
    memoryUsed: "1.42 GB / 4.00 GB",
    database: "MongoDB Atlas Connected",
    socketConnections: "8,450 Live Sockets"
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Infrastructure Telemetry
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Server Health & Infrastructure Telemetry
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Live status of Node.js API clusters, Socket.IO connections, and MongoDB Atlas database.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>REST API Status</div>
          <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--success)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <CheckCircle2 size={18} /> {health.apiStatus}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Avg Response Time: 42ms</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Cluster Uptime</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{health.uptime}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>Zero downtime in last 90 days</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>CPU & Memory Usage</div>
          <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>CPU: {health.cpuLoad}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>RAM: {health.memoryUsed}</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Live Socket.IO Pools</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--secondary)", marginTop: 4 }}>8,450</div>
          <div style={{ fontSize: "0.75rem", color: "var(--secondary)", marginTop: 4 }}>Active GPS bus & parent sockets</div>
        </div>
      </div>

    </div>
  );
}
