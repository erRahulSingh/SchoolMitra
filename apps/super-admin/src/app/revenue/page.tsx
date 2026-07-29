"use client";

import React, { useState } from "react";
import { TrendingUp, DollarSign, ArrowUpRight, Building2, CreditCard, Sparkles, Download } from "lucide-react";

export default function RevenueAnalyticsPage() {
  const [revenueStats] = useState({
    mrr: "₹ 24,80,000",
    arr: "₹ 2,97,60,000",
    arpu: "₹ 1,14,750",
    mrrGrowth: "+18.4%"
  });

  const [planBreakdown] = useState([
    { plan: "Enterprise Pro", activeTenants: 48, pricePerYear: "₹ 75,000", totalARR: "₹ 36,00,000", share: "45%" },
    { plan: "Growth Plan", activeTenants: 58, pricePerYear: "₹ 45,000", totalARR: "₹ 26,10,000", share: "35%" },
    { plan: "Starter Basic", activeTenants: 42, pricePerYear: "₹ 25,000", totalARR: "₹ 10,50,000", share: "20%" }
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> SaaS Revenue Intelligence
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Revenue & Financial Analytics
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Monthly Recurring Revenue (MRR), Annual Run Rate (ARR), and Tier Monetization Breakdown.
          </p>
        </div>
      </div>

      {/* 4 STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Monthly Recurring (MRR)</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{revenueStats.mrr}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <TrendingUp size={14} /> {revenueStats.mrrGrowth} MoM Growth
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Annual Run Rate (ARR)</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>{revenueStats.arr}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>148 Active Paid Schools</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Avg Revenue Per School</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>{revenueStats.arpu}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>Highest retention rate (98.2%)</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Net Revenue Retention</div>
          <div style={{ fontSize: "1.6rem", fontWeight 900, color: "var(--secondary)", marginTop: 4 }}>112.4%</div>
          <div style={{ fontSize: "0.75rem", color: "var(--secondary)", marginTop: 4 }}>Expansion from tier upgrades</div>
        </div>
      </div>

      {/* PLAN BREAKDOWN TABLE */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.25rem", color: "var(--text-heading)" }}>
          Subscription Plan Tier Distribution
        </h3>

        <div style={{ overflowX: "auto" }}>
          <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>PLAN TIER</th>
                <th style={{ padding: "0.75rem" }}>ACTIVE TENANTS</th>
                <th style={{ padding: "0.75rem" }}>ANNUAL FEE</th>
                <th style={{ padding: "0.75rem" }}>TOTAL ARR CONTRIBUTION</th>
                <th style={{ padding: "0.75rem" }}>REVENUE SHARE</th>
              </tr>
            </thead>
            <tbody>
              {planBreakdown.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--text-heading)" }}>{row.plan}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{row.activeTenants} Schools</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{row.pricePerYear}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--primary)" }}>{row.totalARR}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--success)" }}>{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
