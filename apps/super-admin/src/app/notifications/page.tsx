"use client";

import React, { useState } from "react";
import { Bell, Send, Sparkles } from "lucide-react";

export default function GlobalNotificationsAlertPage() {
  const [logs] = useState([
    { id: "n1", title: "Emergency SOS Alert Test", recipient: "All Transport Supervisors", type: "Push", date: "28 Jul 2026", status: "Delivered" },
    { id: "n2", title: "Quarter 2 Fee Clearance Notice", recipient: "Parent Accounts", type: "SMS + Push", date: "25 Jul 2026", status: "Delivered" }
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Global Alert Dispatcher
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Notifications & Broadcast Logs
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Dispatch push notifications and SMS broadcasts across user groups.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>Notification Dispatch Log</h3>
          <button className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
            <Send size={16} />
            <span>Send Global Notification</span>
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>ALERT TITLE</th>
                <th style={{ padding: "0.75rem" }}>RECIPIENTS</th>
                <th style={{ padding: "0.75rem" }}>CHANNEL</th>
                <th style={{ padding: "0.75rem" }}>DISPATCH DATE</th>
                <th style={{ padding: "0.75rem" }}>DELIVERY STATUS</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--text-heading)" }}>{log.title}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{log.recipient}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--primary)" }}>{log.type}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{log.date}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>
                    <span style={{ background: "var(--success-bg)", color: "var(--success)", padding: "0.2rem 0.55rem", borderRadius: 6, fontSize: "0.75rem", fontWeight: 800 }}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
