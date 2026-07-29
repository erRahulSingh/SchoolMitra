"use client";

import React, { useState } from "react";
import { Activity, Sparkles, Bus, CreditCard, UserPlus, Award } from "lucide-react";

export default function SystemActivityLogsPage() {
  const [stream] = useState([
    { id: "act_1", title: "Rahul Sharma (Class 5-A) boarded Bus #01 at 07:35 AM", school: "Delhi Public School (Dwarka)", time: "5 mins ago", icon: Bus, color: "var(--success)" },
    { id: "act_2", title: "Fee Receipt #REC-99401 generated for Ananya Patel (₹18,500)", school: "St. Xavier's Senior Secondary", time: "14 mins ago", icon: CreditCard, color: "var(--primary)" },
    { id: "act_3", title: "Mathematics Homework uploaded for Class 8-B", school: "DAV Public School (Vasant Kunj)", time: "28 mins ago", icon: Award, color: "var(--primary)" },
    { id: "act_4", title: "New Student Admission: Aarav Gupta enrolled in Class 1-A", school: "Modern School (Barakhamba Road)", time: "42 mins ago", icon: UserPlus, color: "var(--warning)" }
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Multi-Tenant Activity Feed
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Real-Time System Activity Stream
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Live cross-tenant stream of admissions, fee collections, homework uploads, and bus telemetry.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.25rem", color: "var(--text-heading)" }}>Live Event Stream</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {stream.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.85rem 1rem", borderRadius: 12, background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(99, 102, 241, 0.15)", color: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <item.icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-heading)" }}>{item.title}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{item.school} &bull; {item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
