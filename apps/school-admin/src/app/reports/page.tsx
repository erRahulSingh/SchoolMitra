"use client";

import React, { useState } from "react";
import { 
  BarChart3, Download, TrendingUp, Users, CreditCard, 
  GraduationCap, CalendarCheck, Award, Bus, Clock, FileText,
  UserCheck, Bell, MessageSquare, IndianRupee, ShieldAlert, Sparkles, Filter, ChevronRight
} from "lucide-react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"executive" | "student" | "attendance" | "exams" | "fees" | "transport" | "teacher" | "communication" | "finance" | "custom">("executive");

  // ── Executive Dashboard KPIs (Module 1) ──
  const [kpis] = useState({
    totalStudents: 1420,
    presentToday: 1352,
    absentToday: 68,
    totalTeachers: 74,
    todayCollection: 48500,
    pendingFees: 382000,
    activeBuses: 8,
    todayEvents: 2,
    openTickets: 4,
    newAdmissions: 185
  });

  // ── Custom Report Builder State (Module 10) ──
  const [customModule, setCustomModule] = useState("students");
  const [customClass, setCustomClass] = useState("Class 10");
  const [customCriteria, setCustomCriteria] = useState("attendance_90");
  const [customDataPreview, setCustomDataPreview] = useState([
    { col1: "STU-1001", col2: "Aarav Sharma", col3: "Class 10-A", col4: "94.6% Presence", col5: "Fees Paid" },
    { col1: "STU-1002", col2: "Ananya Patel", col3: "Class 10-A", col4: "98.2% Presence", col5: "Fees Paid" },
    { col1: "STU-1004", col2: "Diya Gupta", col3: "Class 12-C", col4: "95.0% Presence", col5: "Fees Paid" }
  ]);

  const handleBuildCustomReport = () => {
    if (customModule === "students" && customCriteria === "attendance_90") {
      setCustomDataPreview([
        { col1: "STU-1001", col2: "Aarav Sharma", col3: "Class 10-A", col4: "94.6% Presence", col5: "Fees Paid" },
        { col1: "STU-1002", col2: "Ananya Patel", col3: "Class 10-A", col4: "98.2% Presence", col5: "Fees Paid" },
        { col1: "STU-1004", col2: "Diya Gupta", col3: "Class 12-C", col4: "95.0% Presence", col5: "Fees Paid" }
      ]);
    } else {
      setCustomDataPreview([
        { col1: "TCH-01", col2: "Sunita Rao", col3: "Math Dept", col4: "100% Homework Checked", col5: "Active" },
        { col1: "TCH-02", col2: "Vikram Malhotra", col3: "Science Dept", col4: "98% Homework Checked", col5: "Active" }
      ]);
    }
    alert("Custom filters applied successfully! Compilation results updated in grid.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Reports &amp; Analytics Engine <BarChart3 size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Comprehensive institutional intelligence: demographic distributions, cash flow indices, and academic performance graphs.
          </p>
        </div>

        <button 
          onClick={() => alert(" spooling executive PDF summary package...")}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <Download size={18} />
          <span>Export Executive PDF</span>
        </button>
      </div>

      {/* ════════════ 10 TABS SWITCHER CONSOLE ════════════ */}
      <div className="glass-card" style={{ 
        padding: "0.6rem", 
        display: "flex", 
        gap: "0.5rem", 
        overflowX: "auto", 
        whiteSpace: "nowrap",
        border: "1px solid var(--border-color)",
        background: "var(--bg-card)",
        borderRadius: "var(--radius-md)"
      }}>
        {[
          { id: "executive", label: "Executive Dashboard", icon: Sparkles },
          { id: "student", label: "Student Master", icon: GraduationCap },
          { id: "attendance", label: "Attendance Trends", icon: CalendarCheck },
          { id: "exams", label: "Exam performance", icon: Award },
          { id: "fees", label: "Fee Collections", icon: CreditCard },
          { id: "transport", label: "Fleet Transport", icon: Bus },
          { id: "teacher", label: "Faculty Compliance", icon: UserCheck },
          { id: "communication", label: "Communication stats", icon: Bell },
          { id: "finance", label: "Financial Analytics", icon: IndianRupee },
          { id: "custom", label: "Custom Report Builder", icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{ 
                padding: "0.6rem 1rem", 
                fontSize: "0.82rem", 
                gap: "0.45rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: isActive ? 700 : 500
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB VIEWS ════════════ */}

      {/* MODULE 1: EXECUTIVE DASHBOARD */}
      {activeTab === "executive" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* KPI grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            {[
              { label: "TOTAL STUDENTS", val: kpis.totalStudents, change: "+82 New", color: "var(--primary)" },
              { label: "ATTENDANCE RATE", val: `${Math.round((kpis.presentToday/kpis.totalStudents)*100)}%`, change: `${kpis.presentToday} Present`, color: "var(--success)" },
              { label: "FACULTY COUNT", val: kpis.totalTeachers, change: "0 Vacancies", color: "#fff" },
              { label: "TODAY COLLECTION", val: `₹${kpis.todayCollection.toLocaleString("en-IN")}`, change: "UPI Preferred", color: "var(--success)" },
              { label: "PENDING ACCRUALS", val: `₹${kpis.pendingFees.toLocaleString("en-IN")}`, change: "18% Overdue", color: "#ef4444" }
            ].map((k, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1.25rem" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{k.label}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: k.color, marginTop: 4 }}>{k.val}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: 4 }}>{k.change}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ACTIVE BUS RUNS</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 850, color: "var(--primary)", marginTop: 6 }}>{kpis.activeBuses} / 8</div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>OPEN SUPPORT TICKETS</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 850, color: "#ef4444", marginTop: 6 }}>{kpis.openTickets} tickets</div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>PTM / MEETINGS TODAY</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 850, color: "var(--success)", marginTop: 6 }}>{kpis.todayEvents} events</div>
            </div>
          </div>

        </div>
      )}

      {/* MODULE 2: STUDENT MASTER REPORTS */}
      {activeTab === "student" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Demographics Master Distribution</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Class level</th>
                <th>Sections count</th>
                <th>Boys Count</th>
                <th>Girls Count</th>
                <th>Total Enrolled</th>
                <th>Admissions State</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cls: "Class 10", sec: 2, boys: 42, girls: 36, total: 78, status: "Admissions Closed" },
                { cls: "Class 9", sec: 2, boys: 45, girls: 37, total: 82, status: "Admissions Closed" },
                { cls: "Class 8", sec: 3, boys: 64, girls: 60, total: 124, status: "Admissions Closed" }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{row.cls}</td>
                  <td>{row.sec} Sections</td>
                  <td>{row.boys}</td>
                  <td>{row.girls}</td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{row.total} Students</td>
                  <td><span className="badge badge-success">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 3: ATTENDANCE TRENDS */}
      {activeTab === "attendance" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* low attendance warnings */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Attendance Alerts (&lt; 75%)</h3>
            
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Presence Rate</th>
                  <th>Status Warning</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Rahul Verma", class: "Class 10-A", rate: "72.4%", status: "Defaulter list" },
                  { name: "Suresh Gupta", class: "Class 9-B", rate: "74.0%", status: "Defaulter list" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{row.name}</td>
                    <td>{row.class}</td>
                    <td style={{ fontWeight: 700, color: "#ef4444" }}>{row.rate}</td>
                    <td>
                      <span className="badge badge-danger" style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                        <ShieldAlert size={12} /> CRITICAL WARNING
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Monthly stats */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1.25rem" }}>Monthly Presence Averages</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { month: "July 2026", rate: 95 },
                { month: "June 2026", rate: 94 },
                { month: "May 2026", rate: 92 }
              ].map((m, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", justify: "space-between", fontSize: "0.85rem" }}>
                    <span>{m.month}</span>
                    <span style={{ fontWeight: 700, color: "var(--primary)" }}>{m.rate}%</span>
                  </div>
                  <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ width: `${m.rate}%`, height: "100%", background: "var(--primary)", borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODULE 4: EXAM PERFORMANCE */}
      {activeTab === "exams" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Term Scholastic Rankings</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Subject Paper</th>
                <th>Class Level</th>
                <th>Top Performer</th>
                <th>Top Score</th>
                <th>Class average</th>
                <th>Pass Percentage</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sub: "Mathematics", level: "Class 10", topper: "Aarav Sharma", score: "98/100", avg: "82.4/100", passRate: "96.5%" },
                { sub: "Physics Practicals", level: "Class 10", topper: "Priya Singh", score: "20/20", avg: "18.2/20", passRate: "100%" },
                { sub: "English Lit", level: "Class 9", topper: "Kabir Singh", score: "94/100", avg: "78.0/100", passRate: "94.2%" }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{row.sub}</td>
                  <td>{row.level}</td>
                  <td style={{ fontWeight: 650, color: "var(--primary)" }}>{row.topper}</td>
                  <td style={{ fontWeight: 700 }}>{row.score}</td>
                  <td>{row.avg}</td>
                  <td><span className="badge badge-success">{row.passRate} Passed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 5: FEE COLLECTIONS */}
      {activeTab === "fees" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Fee Collections &amp; Outstanding summary</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Class level</th>
                <th>Total Expected Collections</th>
                <th>Collected amount</th>
                <th>Discounts Applied</th>
                <th>Scholarship Waivers</th>
                <th>Pending default</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cls: "Class 10", expected: 881400, collected: 650000, discounts: 22000, scholarships: 45000, pending: 164400 },
                { cls: "Class 9", expected: 762600, collected: 540000, discounts: 18000, scholarships: 30000, pending: 174600 }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{row.cls}</td>
                  <td>₹ {row.expected.toLocaleString("en-IN")}</td>
                  <td style={{ color: "var(--success)", fontWeight: 700 }}>₹ {row.collected.toLocaleString("en-IN")}</td>
                  <td>₹ {row.discounts.toLocaleString("en-IN")}</td>
                  <td>₹ {row.scholarships.toLocaleString("en-IN")}</td>
                  <td style={{ color: "#ef4444", fontWeight: 700 }}>₹ {row.pending.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 6: FLEET TRANSPORT */}
      {activeTab === "transport" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Route Utilization Indices</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Route Name</th>
                <th>Assigned Bus</th>
                <th>Driver Name</th>
                <th>Capacity utilization</th>
                <th>Average Delay Times</th>
                <th>GPS logs</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Route 1 Dwarka Belt", bus: "Bus #01", driver: "Ram Singh", utilization: "38/42 Seats (90%)", delay: "4 Mins", gps: "ONLINE ✅" },
                { name: "Route 2 Vasant Kunj Belt", bus: "Bus #02", driver: "Vikram Jeet", utilization: "32/38 Seats (84%)", delay: "8 Mins", gps: "ONLINE ✅" }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{row.name}</td>
                  <td>{row.bus}</td>
                  <td>{row.driver}</td>
                  <td style={{ fontWeight: 700 }}>{row.utilization}</td>
                  <td style={{ color: "#f59e0b" }}>{row.delay}</td>
                  <td><span className="badge badge-success">{row.gps}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 7: FACULTY COMPLIANCE */}
      {activeTab === "teacher" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Teacher Academic &amp; Homework Audit</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Assigned Dept</th>
                <th>Classes Taken</th>
                <th>Homework Correction rate</th>
                <th>Leaves Taken</th>
                <th>Performance Index</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Sunita Rao", dept: "Math", classes: "18 Lectures", homework: "100% Completed", leaves: "2 Days", rating: "4.9 ★" },
                { name: "Dr. Vikram Malhotra", dept: "Science", classes: "20 Lectures", homework: "98% Completed", leaves: "1 Day", rating: "5.0 ★" }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{row.name}</td>
                  <td>{row.dept}</td>
                  <td>{row.classes}</td>
                  <td style={{ color: "var(--success)", fontWeight: 700 }}>{row.homework}</td>
                  <td>{row.leaves}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{row.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 8: COMMUNICATION STATS */}
      {activeTab === "communication" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* logs */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Notification read indices</h3>
            
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Dispatch Channel</th>
                  <th>Delivery rate</th>
                  <th>Seen read rate</th>
                  <th>Parent replies logged</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { channel: "FCM Push Notifications", deliver: "99.8%", read: "86.5%", replies: "Not Applicable" },
                  { channel: "SMS Text Broadcasts", deliver: "98.2%", read: "95.0%", replies: "Not Applicable" },
                  { channel: "Direct chat requests", deliver: "100%", read: "92.0%", replies: "142 Replies Today" }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{row.channel}</td>
                    <td>{row.deliver}</td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{row.read}</td>
                    <td>{row.replies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resolution time index */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>Ticket Resolution stats</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>AVERAGE REPLY LATENCY</span>
                <div style={{ fontSize: "1.35rem", fontWeight: 850, color: "#fff", marginTop: 2 }}>22 Mins</div>
              </div>
              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>TICKET RESOLUTION RATE</span>
                <div style={{ fontSize: "1.35rem", fontWeight: 850, color: "var(--success)", marginTop: 2 }}>94.2% Closed</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* MODULE 9: FINANCIAL ANALYTICS */}
      {activeTab === "finance" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* revenue chart bar */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Monthly Revenue accruals</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { month: "July 2026", rev: 1245000, target: 1500000 },
                { month: "June 2026", rev: 1120000, target: 1500000 },
                { month: "May 2026", rev: 980000, target: 1500000 }
              ].map((r, idx) => {
                const pct = Math.round((r.rev / r.target) * 100);
                return (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justify: "space-between", fontSize: "0.85rem" }}>
                      <span>{r.month} &bull; <strong>₹ {r.rev.toLocaleString("en-IN")}</strong></span>
                      <span style={{ fontWeight: 700, color: "var(--primary)" }}>{pct}% Target</span>
                    </div>
                    <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)", borderRadius: 99 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cash flow indicators */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>GST Invoice Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8 }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>CGST OUTWARD LIABILITY (9%)</span>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>₹ 1,12,050</div>
              </div>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8 }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>SGST OUTWARD LIABILITY (9%)</span>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>₹ 1,12,050</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* MODULE 10: CUSTOM REPORT BUILDER */}
      {activeTab === "custom" && (
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "1.5rem" }}>
          
          {/* Builder parameters */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 850 }}>Build Custom Report</h3>
            
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SELECT TARGET MODULE</label>
              <select 
                value={customModule}
                onChange={(e) => setCustomModule(e.target.value)}
                style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
              >
                <option value="students" style={{ background: "#0b0f19" }}>Student Directory module</option>
                <option value="teachers" style={{ background: "#0b0f19" }}>Teachers compliance module</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>FILTER BY GRADE / CLASS</label>
              <select 
                value={customClass}
                onChange={(e) => setCustomClass(e.target.value)}
                style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
              >
                <option value="Class 10" style={{ background: "#0b0f19" }}>Class 10</option>
                <option value="Class 9" style={{ background: "#0b0f19" }}>Class 9</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CRITERIA RULES</label>
              <select 
                value={customCriteria}
                onChange={(e) => setCustomCriteria(e.target.value)}
                style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
              >
                <option value="attendance_90" style={{ background: "#0b0f19" }}>Attendance Rate &gt; 90%</option>
                <option value="homework_100" style={{ background: "#0b0f19" }}>Homework Completion = 100%</option>
              </select>
            </div>

            <button onClick={handleBuildCustomReport} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "0.5rem" }}>
              Compile Report Grid
            </button>
          </div>

          {/* Compiled grid preview */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800 }}>Compiled Results Preview</h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => alert("Downloading CSV custom ledger...")} className="btn btn-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}>Export CSV</button>
                <button onClick={() => alert("Downloading Excel custom ledger...")} className="btn btn-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}>Export Excel</button>
              </div>
            </div>

            <table className="custom-table">
              <thead>
                <tr>
                  <th>Field 1</th>
                  <th>Field 2</th>
                  <th>Field 3</th>
                  <th>Field 4</th>
                  <th>Field 5</th>
                </tr>
              </thead>
              <tbody>
                {customDataPreview.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700 }}>{row.col1}</td>
                    <td style={{ color: "#fff", fontWeight: 700 }}>{row.col2}</td>
                    <td>{row.col3}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 700 }}>{row.col4}</td>
                    <td><span className="badge badge-success">{row.col5}</span></td>
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
