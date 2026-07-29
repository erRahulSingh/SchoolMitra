"use client";

import React, { useState } from "react";
import { ShieldCheck, Sparkles, User, Lock, Search } from "lucide-react";

export default function AuditLogsPage() {
  const [logs] = useState([
    { id: "aud_101", user: "Rahul Singh (Super Admin)", action: "Status Toggle: SCH-104 changed to Active", ip: "49.36.14.210", timestamp: "Today, 10:14 AM" },
    { id: "aud_102", user: "System Automator", action: "Subscription Renewal: SCH-101 renewed Enterprise Pro", ip: "Internal Service", timestamp: "Yesterday, 11:30 PM" },
    { id: "aud_103", user: "Rahul Singh (Super Admin)", action: "Feature Flag Update: FEATURE_ONLINE_FEES Enabled", ip: "49.36.14.210", timestamp: "27 Jul 2026, 04:15 PM" }
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Security Compliance & Audit Trail
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Super Admin Audit Logs
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Immutable security log of admin actions, tenant modifications, and security events.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.25rem", color: "var(--text-heading)" }}>Security Audit Trail</h3>

        <div style={{ overflowX: "auto" }}>
          <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>LOG ID</th>
                <th style={{ padding: "0.75rem" }}>PERFORMED BY</th>
                <th style={{ padding: "0.75rem" }}>ACTION DESCRIPTION</th>
                <th style={{ padding: "0.75rem" }}>IP ADDRESS</th>
                <th style={{ padding: "0.75rem" }}>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{log.id}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--text-heading)" }}>{log.user}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{log.action}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontFamily: "monospace" }}>{log.ip}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
