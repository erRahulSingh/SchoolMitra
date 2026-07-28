"use client";

import React, { useState } from "react";
import { 
  BarChart3, Download, TrendingUp, Users, CreditCard, 
  GraduationCap, CalendarCheck, Award, Bus, Fuel, MapPin, 
  CheckCircle2, AlertCircle, FileText 
} from "lucide-react";

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<"student" | "attendance" | "fees" | "transport">("student");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)",
        border: "1px solid var(--border-glow)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem 1.75rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Reports & Analytics Center (Phase 10) <BarChart3 size={24} color="#ec4899" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Comprehensive institutional reporting: Student demographics, attendance trends, fee collection ledgers, and fleet telemetry.
          </p>
        </div>
        <button className="btn btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
          <Download size={16} /> Export All Reports (PDF)
        </button>
      </div>

      {/* 4 REPORT SECTION TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setActiveReport("student")} className={`btn ${activeReport === "student" ? "btn-primary" : "btn-secondary"}`}>
          <GraduationCap size={16} /> Student Reports
        </button>
        <button onClick={() => setActiveReport("attendance")} className={`btn ${activeReport === "attendance" ? "btn-primary" : "btn-secondary"}`}>
          <CalendarCheck size={16} /> Attendance Reports
        </button>
        <button onClick={() => setActiveReport("fees")} className={`btn ${activeReport === "fees" ? "btn-primary" : "btn-secondary"}`}>
          <CreditCard size={16} /> Fee Reports
        </button>
        <button onClick={() => setActiveReport("transport")} className={`btn ${activeReport === "transport" ? "btn-primary" : "btn-secondary"}`}>
          <Bus size={16} /> Transport Reports
        </button>
      </div>

      {/* ════════════ REPORT 1: STUDENT REPORTS ════════════ */}
      {activeReport === "student" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Total Enrolled", value: "1,420", change: "+82 this year", color: "#6366f1" },
              { label: "Boys / Girls Ratio", value: "54% / 46%", change: "766 Boys / 654 Girls", color: "#10b981" },
              { label: "New Admissions 2026", value: "185", change: "Target 200", color: "#38bdf8" },
              { label: "Retention Rate", value: "98.4%", change: "+0.8% YoY", color: "#f59e0b" }
            ].map((s, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1.25rem" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: s.color, marginTop: 2 }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--success)", marginTop: 4 }}>{s.change}</div>
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Class-wise Student Distribution Report</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Total Sections</th>
                    <th>Boys Count</th>
                    <th>Girls Count</th>
                    <th>Total Enrolled</th>
                    <th>Average Class Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cls: "Class 10", sec: 3, boys: 62, girls: 56, total: 118, avg: "96.4%" },
                    { cls: "Class 9", sec: 3, boys: 65, girls: 55, total: 120, avg: "95.2%" },
                    { cls: "Class 8", sec: 3, boys: 60, girls: 64, total: 124, avg: "97.0%" },
                    { cls: "Class 7", sec: 3, boys: 58, girls: 60, total: 118, avg: "94.8%" },
                    { cls: "Class 6", sec: 3, boys: 66, girls: 60, total: 126, avg: "96.1%" }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700, color: "#fff" }}>{row.cls}</td>
                      <td>{row.sec} Sections</td>
                      <td>{row.boys}</td>
                      <td>{row.girls}</td>
                      <td style={{ fontWeight: 800, color: "var(--primary)" }}>{row.total} Students</td>
                      <td style={{ fontWeight: 800, color: "var(--success)" }}>{row.avg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ REPORT 2: ATTENDANCE REPORTS ════════════ */}
      {activeReport === "attendance" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Monthly Trend Visual */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>Monthly School Attendance Rate Trend (2026)</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem", height: 200 }}>
              {[
                { month: "Jan", rate: 92 }, { month: "Feb", rate: 94 }, { month: "Mar", rate: 96 },
                { month: "Apr", rate: 91 }, { month: "May", rate: 88 }, { month: "Jun", rate: 93 },
                { month: "Jul", rate: 95 }
              ].map((m, idx) => (
                <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#fff" }}>{m.rate}%</span>
                  <div style={{
                    width: "100%", height: `${m.rate * 1.8}px`, borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
                    background: "linear-gradient(180deg, var(--primary) 0%, rgba(99,102,241,0.3) 100%)"
                  }} />
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Attendance Summary Breakdown (July 2026)</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>Category</th><th>Total Strength</th><th>Avg Daily Present</th><th>Avg Daily Absent</th><th>Attendance Rate</th></tr>
                </thead>
                <tbody>
                  {[
                    { cat: "Students (Classes 1-12)", strength: "1,420", present: "1,346", absent: "74", rate: "94.8%" },
                    { cat: "Teaching Faculty", strength: "86", present: "84.7", absent: "1.3", rate: "98.5%" },
                    { cat: "Non-Teaching Staff", strength: "24", present: "23.2", absent: "0.8", rate: "96.7%" },
                    { cat: "Bus Pilots & Support", strength: "18", present: "18.0", absent: "0.0", rate: "100.0%" }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700, color: "#fff" }}>{row.cat}</td>
                      <td style={{ fontWeight: 600 }}>{row.strength}</td>
                      <td style={{ color: "var(--success)", fontWeight: 700 }}>{row.present}</td>
                      <td style={{ color: "#ef4444" }}>{row.absent}</td>
                      <td style={{ fontWeight: 800, color: "var(--primary)" }}>{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ REPORT 3: FEE REPORTS ════════════ */}
      {activeReport === "fees" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Quarterly Fee Collection & Collection Rate Report</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>Financial Quarter</th><th>Target Collection</th><th>Actual Collected</th><th>Outstanding Dues</th><th>Collection Rate</th></tr>
                </thead>
                <tbody>
                  {[
                    { q: "Q1 (Apr - Jun 2026)", target: "₹ 42.50 Lakhs", actual: "₹ 38.80 Lakhs", dues: "₹ 3.70 Lakhs", rate: "91.3%" },
                    { q: "Q2 (Jul - Sep 2026)", target: "₹ 42.50 Lakhs", actual: "₹ 24.80 Lakhs", dues: "₹ 17.70 Lakhs", rate: "58.4%" },
                    { q: "Q3 (Oct - Dec 2026)", target: "₹ 42.50 Lakhs", actual: "₹ 0.00", dues: "₹ 42.50 Lakhs", rate: "0.0%" },
                    { q: "Q4 (Jan - Mar 2027)", target: "₹ 42.50 Lakhs", actual: "₹ 0.00", dues: "₹ 42.50 Lakhs", rate: "0.0%" }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700, color: "#fff" }}>{row.q}</td>
                      <td style={{ color: "var(--text-muted)" }}>{row.target}</td>
                      <td style={{ fontWeight: 800, color: "var(--success)" }}>{row.actual}</td>
                      <td style={{ color: "#ef4444", fontWeight: 700 }}>{row.dues}</td>
                      <td style={{ fontWeight: 800, color: "var(--primary)" }}>{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ REPORT 4: TRANSPORT REPORTS ════════════ */}
      {activeReport === "transport" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Fleet Telemetry, Fuel Efficiency & Coverage Report</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>Vehicle Name & Plate</th><th>Assigned Route</th><th>Mapped Students</th><th>Total Monthly KM</th><th>Fuel Consumed</th><th>Avg Efficiency</th></tr>
                </thead>
                <tbody>
                  {[
                    { bus: "Bus #01 (DL 01 AB 4321)", route: "Route 1 (Dwarka Express)", students: 38, km: "1,240 KM", fuel: "215 Liters", eff: "5.77 KM/L" },
                    { bus: "Bus #02 (DL 01 CD 8765)", route: "Route 2 (Vasant Kunj)", students: 32, km: "980 KM", fuel: "180 Liters", eff: "5.44 KM/L" },
                    { bus: "Bus #03 (DL 01 EF 2468)", route: "Route 3 (Janakpuri)", students: 41, km: "1,450 KM", fuel: "260 Liters", eff: "5.58 KM/L" },
                    { bus: "Bus #04 (DL 01 GH 1357)", route: "Route 4 (Green Park)", students: 35, km: "1,100 KM", fuel: "200 Liters", eff: "5.50 KM/L" }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700, color: "#fff" }}>{row.bus}</td>
                      <td style={{ color: "var(--text-muted)" }}>{row.route}</td>
                      <td style={{ fontWeight: 700, color: "#38bdf8" }}>{row.students} Students</td>
                      <td style={{ fontWeight: 600 }}>{row.km}</td>
                      <td>{row.fuel}</td>
                      <td style={{ fontWeight: 800, color: "var(--success)" }}>{row.eff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
