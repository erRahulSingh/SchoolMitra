"use client";

import React, { useState } from "react";
import { 
  BarChart3, TrendingUp, Users, Bus, DollarSign, Calendar, 
  Download, ArrowUpRight, CheckCircle2, RefreshCw, LineChart, 
  MapPin, LogIn, Activity, Sparkles 
} from "lucide-react";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"growth" | "revenue" | "app_usage" | "transport">("growth");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="glass-card" style={{
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.12) 100%)",
        border: "1px solid var(--border-glow)",
        padding: "1.75rem 2rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(139, 92, 246, 0.2)", border: "1px solid rgba(139, 92, 246, 0.4)", color: "#c084fc", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <BarChart3 size={14} /> SaaS Platform Analytics HQ
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Platform Analytics & Metrics
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: "0.875rem" }}>
            Monitor school onboarding growth, SaaS subscription MRR, client app engagement levels, and transport telemetry load.
          </p>
        </div>

        <button className="btn btn-primary">
          <Download size={16} /> Export Analytics Data
        </button>
      </div>

      {/* 4 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        {[
          { id: "growth", label: "School Growth", icon: TrendingUp },
          { id: "revenue", label: "SaaS Revenue Analytics", icon: DollarSign },
          { id: "app_usage", label: "App Usage & Logins", icon: LogIn },
          { id: "transport", label: "Transport Usage", icon: Bus }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}>
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB 1: SCHOOL GROWTH ════════════ */}
      {activeTab === "growth" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Trend chart */}
          <div className="glass-card" style={{ padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.25rem" }}>Monthly School Onboarding Growth (2026)</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", height: 220, paddingTop: "1rem" }}>
              {[
                { month: "Jan", count: 82 }, { month: "Feb", count: 96 }, { month: "Mar", count: 110 },
                { month: "Apr", count: 122 }, { month: "May", count: 130 }, { month: "Jun", count: 140 },
                { month: "Jul", count: 148 }
              ].map((m, idx) => (
                <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.725rem", fontWeight: 800, color: "#fff" }}>{m.count}</span>
                  <div style={{
                    width: "100%", height: `${m.count * 1.2}px`, borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
                    background: "linear-gradient(180deg, var(--primary) 0%, rgba(99,102,241,0.25) 100%)"
                  }} />
                  <span style={{ fontSize: "0.725rem", color: "var(--text-muted)", fontWeight: 700 }}>{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>New School Onboarding Registrations (Recent)</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>School Tenant</th><th>City</th><th>Plan Selected</th><th>Students Count</th><th>Onboarded Date</th></tr>
                </thead>
                <tbody>
                  {[
                    { name: "DAV Public School (Vasant Kunj)", city: "New Delhi", plan: "Trial (14 Days)", students: 1100, date: "22 Jul 2026" },
                    { name: "Delhi Public School (Dwarka)", city: "New Delhi", plan: "Enterprise Pro", students: 1420, date: "15 Jan 2026" },
                    { name: "St. Xavier's Senior Secondary School", city: "Mumbai", plan: "Growth Plan", students: 980, date: "10 Mar 2026" }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 800, color: "#fff" }}>{row.name}</td>
                      <td>{row.city}</td>
                      <td><span className="badge badge-info">{row.plan}</span></td>
                      <td style={{ fontWeight: 700, color: "var(--primary)" }}>{row.students}</td>
                      <td style={{ color: "var(--text-muted)" }}>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: SAAS REVENUE ANALYTICS ════════════ */}
      {activeTab === "revenue" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Monthly Recurring Revenue (MRR)", value: "₹ 24.80 Lakhs", sub: "+12.4% vs last month", color: "#6366f1" },
              { label: "Annual Recurring Revenue (ARR)", value: "₹ 2.97 Crores", sub: "Based on current billing", color: "#10b981" },
              { label: "Average Revenue Per Account (ARPU)", value: "₹ 16,750 / mo", sub: "Across all paid tiers", color: "#f59e0b" }
            ].map((st, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1.35rem" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 700 }}>{st.label}</div>
                <div style={{ fontSize: "1.65rem", fontWeight: 900, color: st.color, marginTop: 4 }}>{st.value}</div>
                <div style={{ fontSize: "0.725rem", color: "var(--success)", marginTop: 4, fontWeight: 700 }}>{st.sub}</div>
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.25rem" }}>Revenue Generation by Plan Tier</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { name: "Enterprise Pro Plan (₹ 45k/mo)", percentage: 65, total: "₹ 16.12 Lakhs" },
                { name: "Growth Plan (₹ 32k/mo)", percentage: 25, total: "₹ 6.20 Lakhs" },
                { name: "Starter Plan (₹ 18k/mo)", percentage: 10, total: "₹ 2.48 Lakhs" }
              ].map((p, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ width: 220, fontWeight: 700, fontSize: "0.85rem", color: "#fff" }}>{p.name}</span>
                  <div style={{ flex: 1, height: 12, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{ width: `${p.percentage}%`, height: "100%", borderRadius: 99, background: "var(--primary)" }} />
                  </div>
                  <span style={{ fontWeight: 800, color: "#fff", minWidth: 40, textAlign: "right" }}>{p.percentage}%</span>
                  <span style={{ fontWeight: 800, color: "#34d399", minWidth: 120, textAlign: "right" }}>{p.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: APP USAGE & LOGINS ════════════ */}
      {activeTab === "app_usage" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Active logins */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>Daily Login Statistics & Platform Traffic Hits</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>Date</th><th>Student Web Portal Hits</th><th>Parent App API Requests</th><th>Driver Cockpit GPS Syncs</th><th>Total Traffic Requests</th></tr>
                </thead>
                <tbody>
                  {[
                    { date: "28 Jul 2026", web: "1,22,450", mobile: "8,92,400", driver: "3,24,000", total: "1.33 Million" },
                    { date: "27 Jul 2026", web: "1,18,900", mobile: "8,65,000", driver: "3,18,000", total: "1.30 Million" },
                    { date: "26 Jul 2026", web: "24,500 (Sunday)", mobile: "98,000", driver: "—", total: "122,500" }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 800, color: "#fff" }}>{row.date}</td>
                      <td>{row.web}</td>
                      <td style={{ color: "var(--primary)", fontWeight: 700 }}>{row.mobile}</td>
                      <td>{row.driver}</td>
                      <td style={{ fontWeight: 900, color: "#34d399" }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: TRANSPORT USAGE ════════════ */}
      {activeTab === "transport" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.25rem" }}>School Fleet Utilization & GPS coverage</h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>School Tenant</th><th>Active Buses</th><th>Total Fleet Capacity</th><th>Avg Daily Kilometers Run</th><th>GPS Uptime</th></tr>
              </thead>
              <tbody>
                {[
                  { school: "Delhi Public School (Dwarka)", buses: 18, capacity: "720 Seats", km: "2,240 KM", uptime: "99.98%" },
                  { school: "St. Xavier's Senior Secondary School", buses: 12, capacity: "480 Seats", km: "1,450 KM", uptime: "99.95%" },
                  { school: "DAV Public School (Vasant Kunj)", buses: 14, capacity: "560 Seats", km: "1,850 KM", uptime: "99.99%" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{row.school}</td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{row.buses} Buses active</td>
                    <td>{row.capacity}</td>
                    <td>{row.km}</td>
                    <td style={{ fontWeight: 800, color: "var(--success)" }}>{row.uptime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
