"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, CheckCircle2, Clock, AlertCircle, 
  GraduationCap, Users, Bus, DollarSign, TrendingUp, 
  LogIn, Activity, Plus, Search, Shield, Eye, Edit3, 
  Trash2, Ban, ChevronRight, Download, Server, Sparkles 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalSchools: 0,
    activeSchools: 0,
    trialSchools: 0,
    expiredSchools: 0,
    totalStudents: "0",
    totalParents: "0",
    totalDrivers: "0",
    totalRevenue: "₹ 0",
    monthlyRevenue: "₹ 0",
    todaysLogins: "0",
    activeSessions: "0"
  });

  const [recentSchools, setRecentSchools] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Super Admin Telemetry Metrics from DB
        const metricsRes = await superAdminApi.getSuperAdminMetrics();
        if (metricsRes.success && metricsRes.metrics) {
          setMetrics(metricsRes.metrics);
        }

        // 2. Fetch School Tenants from DB
        const schoolsRes = await superAdminApi.getSchools();
        if (schoolsRes.success && schoolsRes.data?.schools) {
          setRecentSchools(schoolsRes.data.schools);
        } else if (schoolsRes.success && (schoolsRes as any).schools) {
          setRecentSchools((schoolsRes as any).schools);
        }
      } catch (err) {
        console.error("SuperAdmin Dashboard Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* HERO BANNER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> SaaS HQ Master Command Center
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            SchoolMitra Enterprise Operations Dashboard
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.875rem" }}>
            Real-time multi-tenant telemetry, subscription revenue analytics, and server cluster activity.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.85rem" }}>
          <button className="btn" style={{ background: "rgba(255, 255, 255, 0.15)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.25)" }}>
            <Download size={16} /> Export Investor Report
          </button>
          <a href="/schools" className="btn btn-primary">
            <Plus size={16} /> Add School Tenant
          </a>
        </div>
      </div>

      {/* ════════════ 11 CORE METRICS GRID ════════════ */}

      {/* SECTION 1: SCHOOL TENANTS (4 CARDS) */}
      <div>
        <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Building2 size={16} color="var(--primary)" /> <span>School Tenant Subscriptions</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
          {[
            { label: "Total Schools", value: metrics.totalSchools, sub: "Registered Tenants", color: "var(--primary)", icon: Building2 },
            { label: "Active Schools", value: metrics.activeSchools, sub: "Paid Subscribers", color: "var(--success)", icon: CheckCircle2 },
            { label: "Trial Schools", value: metrics.trialSchools, sub: "14-Day Active Trial", color: "var(--warning)", icon: Clock },
            { label: "Expired Schools", value: metrics.expiredSchools, sub: "Action Required", color: "var(--danger)", icon: AlertCircle }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: "1.35rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700 }}>{item.label}</div>
                  <div style={{ fontSize: "1.9rem", fontWeight: 900, color: item.color, marginTop: 4 }}>{item.value}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: 4, fontWeight: 600 }}>{item.sub}</div>
                </div>
                <div style={{ width: 46, height: 46, borderRadius: "var(--radius-md)", background: `rgba(99, 102, 241, 0.12)`, border: `1px solid var(--border-color)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} color={item.color} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: END-USER ECOSYSTEM (3 CARDS) */}
      <div>
        <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Users size={16} color="var(--primary)" /> <span>End-User Ecosystem Load</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {[
            { label: "Total Active Students", value: metrics.totalStudents, sub: `Across ${metrics.totalSchools} schools`, color: "var(--primary)", icon: GraduationCap },
            { label: "Total Parent Accounts", value: metrics.totalParents, sub: "Mobile PWA Users", color: "var(--primary)", icon: Users },
            { label: "Total Bus Pilots", value: metrics.totalDrivers, sub: "Driver Cockpit App Users", color: "var(--primary)", icon: Bus }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: "1.35rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700 }}>{item.label}</div>
                  <div style={{ fontSize: "1.85rem", fontWeight: 900, color: item.color, marginTop: 4 }}>{item.value}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: 4, fontWeight: 600 }}>{item.sub}</div>
                </div>
                <div style={{ width: 46, height: 46, borderRadius: "var(--radius-md)", background: `rgba(99, 102, 241, 0.12)`, border: `1px solid var(--border-color)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} color={item.color} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: REVENUE & TRAFFIC (4 CARDS) */}
      <div>
        <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <DollarSign size={16} color="var(--success)" /> <span>Revenue & Live System Traffic</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
          {[
            { label: "Total SaaS Revenue", value: metrics.totalRevenue, sub: "ARR Billing", color: "var(--success)", icon: DollarSign },
            { label: "Monthly Revenue (MRR)", value: metrics.monthlyRevenue, sub: "+12.4% vs last month", color: "var(--primary)", icon: TrendingUp },
            { label: "Today's Auth Logins", value: metrics.todaysLogins, sub: "Auth Hits", color: "var(--warning)", icon: LogIn },
            { label: "Active WebSockets", value: metrics.activeSessions, sub: "Live Connections", color: "var(--success)", icon: Activity }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: "1.35rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700 }}>{item.label}</div>
                  <div style={{ fontSize: "1.85rem", fontWeight: 900, color: item.color, marginTop: 4 }}>{item.value}</div>
                  <div style={{ fontSize: "0.72rem", color: item.color, marginTop: 4, fontWeight: 700 }}>{item.sub}</div>
                </div>
                <div style={{ width: 46, height: 46, borderRadius: "var(--radius-md)", background: `rgba(99, 102, 241, 0.12)`, border: `1px solid var(--border-color)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} color={item.color} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT TENANTS TABLE */}
      <div className="glass-card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-heading)" }}>Recent School Tenant Accounts</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Overview of latest active, trial, and expired subscriptions.</p>
          </div>
          <a href="/schools" className="btn btn-secondary" style={{ fontSize: "0.8rem" }}>
            Manage All {metrics.totalSchools} Schools <ChevronRight size={16} />
          </a>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>School Tenant & ID</th>
                <th>SaaS Plan</th>
                <th>Ecosystem Users</th>
                <th>Monthly MRR</th>
                <th>Plan Expiry</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentSchools.map((sch) => (
                <tr key={sch.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: "var(--text-heading)", fontSize: "0.925rem" }}>{sch.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, marginTop: 2 }}>{sch.id}</div>
                  </td>
                  <td>
                    <span className="badge badge-info">{sch.plan}</span>
                  </td>
                  <td style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
                    <strong style={{ color: "var(--text-main)" }}>{sch.students}</strong> STU • <strong style={{ color: "var(--text-main)" }}>{sch.parents}</strong> PAR • <strong style={{ color: "var(--text-main)" }}>{sch.drivers}</strong> DRV
                  </td>
                  <td style={{ fontWeight: 900, color: "var(--success)", fontSize: "0.95rem" }}>{sch.mrr}</td>
                  <td style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>{sch.expiry}</td>
                  <td>
                    <span className={`badge ${
                      sch.status === "Active" ? "badge-success" : sch.status === "Trial" ? "badge-warning" : "badge-danger"
                    }`}>
                      {sch.status}
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
