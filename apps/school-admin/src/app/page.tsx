"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, UserCheck, CalendarCheck, CreditCard, Bus, 
  UserPlus, CheckCircle2, Clock, AlertTriangle, Sparkles,
  TrendingUp, ChevronRight, Award, Bell, ShieldCheck, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { schoolAdminApi } from "@/lib/api";

export default function DashboardPage() {
  const [user, setUser] = useState({ name: "School Admin", schoolName: "Delhi Public School (Main Campus)" });
  const [buses, setBuses] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser({
          name: parsed.name || "School Admin",
          schoolName: parsed.schoolName || "Delhi Public School (Main Campus)"
        });
      }
    } catch (e) {
      // ignore
    }

    // Fetch live buses & telemetry from backend API
    schoolAdminApi.getBuses().then((res) => {
      if (res.success && (res.buses || res.data)) {
        setBuses(res.buses || res.data);
      }
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* ERP DASHBOARD TOP HEADER BANNER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            School ERP Command Center <Sparkles size={22} color="var(--primary)" />
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.9rem" }}>
            Welcome back, <strong>{user.name}</strong> &bull; Real-time telemetry &amp; academic operations at <strong>{user.schoolName}</strong>
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/admission" className="btn btn-secondary">
            <UserPlus size={16} />
            <span>Admit Student</span>
          </Link>
          <Link href="/fees" className="btn btn-primary">
            <CreditCard size={16} />
            <span>Collect Fees</span>
          </Link>
        </div>
      </div>

      {/* ════════════ 8 CORE DASHBOARD WIDGETS GRID ════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        
        {/* WIDGET 1: TOTAL STUDENTS */}
        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "rgba(99, 102, 241, 0.15)", color: "var(--primary)" }}>
            <Users size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Total Students</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, margin: "2px 0" }}>2,840</div>
            <div className="stat-trend" style={{ color: "var(--success)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <TrendingUp size={13} />
              <span>+12% Enrolled this Term</span>
            </div>
          </div>
        </div>

        {/* WIDGET 2: TOTAL TEACHERS */}
        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "rgba(139, 92, 246, 0.15)", color: "#8b5cf6" }}>
            <UserCheck size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Total Teachers</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, margin: "2px 0" }}>142</div>
            <div className="stat-trend" style={{ color: "#8b5cf6", fontSize: "0.75rem" }}>
              <span>98% Staff Attendance</span>
            </div>
          </div>
        </div>

        {/* WIDGET 3: TODAY'S ATTENDANCE */}
        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "var(--success-bg)", color: "var(--success)" }}>
            <CalendarCheck size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Today&apos;s Attendance</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--success)", margin: "2px 0" }}>96.4%</div>
            <div className="stat-trend" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
              <span>2,738 / 2,840 Present</span>
            </div>
          </div>
        </div>

        {/* WIDGET 4: FEE COLLECTION */}
        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "var(--info-bg)", color: "var(--info)" }}>
            <CreditCard size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Fee Collection</h4>
            <div className="stat-value" style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)", margin: "2px 0" }}>₹48,92,400</div>
            <div className="stat-trend" style={{ color: "var(--success)", fontSize: "0.75rem" }}>
              <span>92% Clearance Rate</span>
            </div>
          </div>
        </div>

        {/* WIDGET 5: ACTIVE BUSES */}
        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "rgba(6, 182, 212, 0.15)", color: "var(--secondary)" }}>
            <Bus size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Active Fleet Buses</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--secondary)", margin: "2px 0" }}>18 / 18</div>
            <div className="stat-trend" style={{ color: "var(--secondary)", fontSize: "0.75rem" }}>
              <span>100% Live GPS Broadcasting</span>
            </div>
          </div>
        </div>

        {/* WIDGET 6: DRIVER STATUS */}
        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "var(--success-bg)", color: "var(--success)" }}>
            <ShieldCheck size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Driver Status</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--success)", margin: "2px 0" }}>18 Active</div>
            <div className="stat-trend" style={{ color: "var(--success)", fontSize: "0.75rem" }}>
              <span>0 Violations &bull; On Time</span>
            </div>
          </div>
        </div>

        {/* WIDGET 7: UPCOMING EXAMS */}
        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "var(--warning-bg)", color: "var(--warning)" }}>
            <Award size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Upcoming Exams</h4>
            <div className="stat-value" style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--warning)", margin: "2px 0" }}>Mid-Term 2026</div>
            <div className="stat-trend" style={{ color: "var(--warning)", fontSize: "0.75rem" }}>
              <span>Starts in 4 Days (Class 1-12)</span>
            </div>
          </div>
        </div>

        {/* WIDGET 8: NOTIFICATIONS DISPATCH */}
        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" }}>
            <Bell size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Parent Alerts</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f43f5e", margin: "2px 0" }}>1,420</div>
            <div className="stat-trend" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
              <span>Push SMS Delivered Today</span>
            </div>
          </div>
        </div>

      </div>

      {/* ════════════ MAIN GRID: LIVE TRANSPORT & RECENT ACTIVITIES ════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "1.5rem" }}>
        
        {/* BUS TRANSPORTation REALTIME MONITOR */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)" }}>Live School Transport &amp; GPS Fleet Monitor</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Connected Telemetry from Driver App Telemetry Server</p>
            </div>
            <Link href="/transport" className="btn btn-secondary" style={{ fontSize: "0.8rem", padding: "0.45rem 0.85rem" }}>
              <span>Live Transport Panel</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {[
              { id: "b1", busNo: "Bus #01 (DL 01 AB 4321)", driver: "Ram Singh (+91 98111 22334)", route: "Route 1 - Dwarka Sector 12", stop: "Sector 12 Market Gate", status: "ON ROUTE", speed: "38 km/h" },
              { id: "b2", busNo: "Bus #02 (DL 01 CD 5678)", driver: "Suresh Kumar (+91 98222 33445)", route: "Route 2 - Vasant Kunj Express", stop: "DPS Gate #1 Arrival", status: "ARRIVED", speed: "0 km/h" },
              { id: "b3", busNo: "Bus #03 (DL 01 EF 9012)", driver: "Mohan Verma (+91 98333 44556)", route: "Route 3 - Janakpuri Line", stop: "Janakpuri Block B Crossing", status: "ON ROUTE", speed: "42 km/h" }
            ].map((bus) => (
              <div key={bus.id} style={{
                padding: "0.95rem 1.1rem",
                borderRadius: "var(--radius-md)",
                background: "var(--btn-secondary-bg)",
                border: "1px solid var(--border-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: bus.status === "ARRIVED" ? "var(--success-bg)" : "rgba(6, 182, 212, 0.15)",
                    color: bus.status === "ARRIVED" ? "var(--success)" : "var(--secondary)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Bus size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-heading)" }}>{bus.busNo}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600 }}>{bus.route}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>Driver: {bus.driver}</div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{
                    background: bus.status === "ARRIVED" ? "var(--success-bg)" : "rgba(6, 182, 212, 0.15)",
                    color: bus.status === "ARRIVED" ? "var(--success)" : "var(--secondary)",
                    padding: "0.25rem 0.6rem", borderRadius: 8, fontSize: "0.72rem", fontWeight: 800
                  }}>
                    {bus.status} ({bus.speed})
                  </span>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Stop: {bus.stop}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITIES REAL-TIME FEED */}
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)" }}>Recent Activities Stream</h3>
            <span style={{ fontSize: "0.72rem", background: "rgba(99, 102, 241, 0.15)", color: "var(--primary)", padding: "0.2rem 0.5rem", borderRadius: 6, fontWeight: 700 }}>Live Telemetry</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
            {[
              { title: "Rahul Sharma (Class 5-A) boarded Bus #01 at 07:35 AM", user: "Driver Ram Singh", time: "5 mins ago", icon: Bus, color: "var(--success)" },
              { title: "Fee Receipt #REC-99401 generated for Ananya Patel (₹18,500)", user: "Accounts Office", time: "14 mins ago", icon: CreditCard, color: "var(--primary)" },
              { title: "Mathematics Homework uploaded for Class 8-B", user: "Sunita Rao (Teacher)", time: "28 mins ago", icon: Award, color: "var(--primary)" },
              { title: "New Student Admission: Aarav Gupta enrolled in Class 1-A", user: "Admissions Desk", time: "42 mins ago", icon: UserPlus, color: "var(--warning)" }
            ].map((act, idx) => (
              <div key={idx} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: `rgba(99, 102, 241, 0.12)`, color: act.color,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <act.icon size={16} />
                </div>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.3 }}>{act.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{act.user} &bull; {act.time}</div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/activity-logs" className="btn btn-secondary" style={{ marginTop: "1.25rem", justifyContent: "center" }}>
            <span>View Complete Audit Trail</span>
            <ChevronRight size={16} />
          </Link>
        </div>

      </div>

    </div>
  );
}
