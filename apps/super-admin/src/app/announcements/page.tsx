"use client";

import React, { useState } from "react";
import { Megaphone, Plus, Sparkles, Send } from "lucide-react";

export default function SystemAnnouncementsPage() {
  const [announcements] = useState([
    { id: "a1", title: "SchoolMitra v2.4 Platform Maintenance Window", date: "30 Jul 2026", audience: "All School Tenants", status: "Scheduled", content: "Scheduled server upgrade between 02:00 AM - 04:00 AM IST. API endpoints will remain online." },
    { id: "a2", title: "New Feature Alert: CBSE Digital Gradebook Generator", date: "24 Jul 2026", audience: "School Admin & Teachers", status: "Published", content: "Teachers can now export CBSE compliant PDF gradebooks directly from teacher dashboard." }
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Global Notice Broadcasting
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Platform System Announcements
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Publish maintenance notices and platform updates to all school tenants.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>Broadcast Logs</h3>
          <button className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
            <Send size={16} />
            <span>New System Broadcast</span>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {announcements.map((anc) => (
            <div key={anc.id} style={{ padding: "1.1rem 1.25rem", borderRadius: 12, background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-heading)" }}>{anc.title}</h4>
                <span style={{ background: "var(--primary-glow)", color: "var(--primary)", padding: "0.2rem 0.55rem", borderRadius: 6, fontSize: "0.75rem", fontWeight: 800 }}>
                  {anc.status}
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-main)", marginTop: "0.5rem" }}>{anc.content}</p>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.6rem" }}>
                Target: <strong>{anc.audience}</strong> &bull; Published Date: {anc.date}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
