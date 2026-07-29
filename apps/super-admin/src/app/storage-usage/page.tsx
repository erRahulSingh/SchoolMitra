"use client";

import React, { useState } from "react";
import { HardDrive, Sparkles, Folder, File } from "lucide-react";

export default function StorageUsagePage() {
  const [usage] = useState({
    totalUsed: "42.8 GB",
    totalAllocated: "500 GB",
    percent: "8.5%",
    studentPhotos: "14.2 GB",
    reportCardPdfs: "18.4 GB",
    homeworkAttachments: "10.2 GB"
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Cloud Media & Document Storage
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            S3 Bucket Media Storage Consumption
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Track document storage, PDF report cards, and student photos across school tenants.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem", color: "var(--text-heading)" }}>Storage Capacity Utilization</h3>
        <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--primary)" }}>{usage.totalUsed} <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 500 }}>of {usage.totalAllocated} ({usage.percent})</span></div>
        
        <div style={{ width: "100%", height: 12, borderRadius: 99, background: "var(--btn-secondary-bg)", marginTop: "1rem", overflow: "hidden" }}>
          <div style={{ width: usage.percent, height: "100%", background: "linear-gradient(90deg, var(--primary), var(--secondary))" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Report Card PDFs</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>{usage.reportCardPdfs}</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Student & Staff Avatars</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>{usage.studentPhotos}</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Homework Attachments</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>{usage.homeworkAttachments}</div>
        </div>
      </div>

    </div>
  );
}
