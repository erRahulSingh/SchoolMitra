"use client";

import React, { useState } from "react";
import { Database, Sparkles, Download, RefreshCw, CheckCircle2 } from "lucide-react";

export default function DatabaseBackupsPage() {
  const [backups] = useState([
    { id: "bak_20260729_020000", filename: "schoolmitra_db_snapshot_20260729.tar.gz", size: "1.82 GB", date: "Today, 02:00 AM IST", type: "Automated Daily", status: "Verified" },
    { id: "bak_20260728_020000", filename: "schoolmitra_db_snapshot_20260728.tar.gz", size: "1.79 GB", date: "Yesterday, 02:00 AM IST", type: "Automated Daily", status: "Verified" },
    { id: "bak_20260727_020000", filename: "schoolmitra_db_snapshot_20260727.tar.gz", size: "1.76 GB", date: "27 Jul 2026", type: "Automated Daily", status: "Verified" }
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Database Disaster Recovery
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            MongoDB Atlas Backups & Snapshots
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Automated daily snapshots and one-click database restore triggers.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>Daily Database Snapshots</h3>
          <button className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
            <Database size={16} />
            <span>Trigger On-Demand Snapshot</span>
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>SNAPSHOT FILENAME</th>
                <th style={{ padding: "0.75rem" }}>SIZE</th>
                <th style={{ padding: "0.75rem" }}>TIMESTAMP</th>
                <th style={{ padding: "0.75rem" }}>TYPE</th>
                <th style={{ padding: "0.75rem" }}>STATUS</th>
                <th style={{ padding: "0.75rem" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((bak) => (
                <tr key={bak.id} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{bak.filename}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{bak.size}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{bak.date}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{bak.type}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>
                    <span style={{ background: "var(--success-bg)", color: "var(--success)", padding: "0.2rem 0.55rem", borderRadius: 6, fontSize: "0.75rem", fontWeight: 800 }}>
                      {bak.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>
                    <button className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>
                      <Download size={14} /> Download
                    </button>
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
