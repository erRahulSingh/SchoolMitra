"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp, Users, Building2, Sparkles } from "lucide-react";

export default function AnalyticsCohortsPage() {
  const [cohortStats] = useState({
    dau: "48,920 Active Users Today",
    mau: "2,10,400 Monthly Users",
    retention: "98.2%",
    churn: "0.8%"
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Usage & Retention Intelligence
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Platform Analytics & User Cohorts
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            DAU/MAU activity ratios, tenant churn metrics, and module adoption rates.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Daily Active Users (DAU)</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>48,920</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>High engagement in Parent & Driver Apps</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Monthly Active Users (MAU)</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>2,10,400</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Across 148 school tenants</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Tenant Retention Rate</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>{cohortStats.retention}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>Industry leading SaaS retention</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Monthly Churn Rate</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--secondary)", marginTop: 4 }}>{cohortStats.churn}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Low annual tenant churn</div>
        </div>
      </div>

    </div>
  );
}
