"use client";

import React, { useState } from "react";
import {
  CalendarCheck, CheckCircle2, XCircle, Clock, Search, Filter,
  Users, BarChart3, Download, AlertCircle, UserCheck, Briefcase,
  TrendingUp, FileText
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockData";

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<"student" | "teacher" | "staff" | "reports">("student");

  // ── Student Attendance State ──
  const [selectedDate, setSelectedDate] = useState("2026-07-29");
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [studentAttendance, setStudentAttendance] = useState<Record<string, "present" | "absent" | "late">>(() => {
    const initial: Record<string, "present" | "absent" | "late"> = {};
    MOCK_STUDENTS.forEach(s => { initial[s.id] = "present"; });
    return initial;
  });

  const toggleStudentStatus = (id: string) => {
    setStudentAttendance(prev => {
      const current = prev[id];
      const next = current === "present" ? "absent" : current === "absent" ? "late" : "present";
      return { ...prev, [id]: next };
    });
  };

  const stuPresent = Object.values(studentAttendance).filter(v => v === "present").length;
  const stuAbsent = Object.values(studentAttendance).filter(v => v === "absent").length;
  const stuLate = Object.values(studentAttendance).filter(v => v === "late").length;
  const stuTotal = Object.keys(studentAttendance).length;
  const stuRate = stuTotal > 0 ? ((stuPresent + stuLate) / stuTotal * 100).toFixed(1) : "0";

  // ── Teacher Attendance State ──
  const [teachers] = useState([
    { id: "TCH-01", name: "Sunita Rao", department: "Mathematics", phone: "+91 98111 55667" },
    { id: "TCH-02", name: "Dr. Vikram Malhotra", department: "Science", phone: "+91 98222 66778" },
    { id: "TCH-03", name: "Ananya Deshmukh", department: "Humanities", phone: "+91 98333 77889" },
    { id: "TCH-04", name: "Rajesh Kumar", department: "IT & CS", phone: "+91 98444 88990" },
    { id: "TCH-05", name: "Capt. Ranbir Singh", department: "Physical Ed", phone: "+91 98555 99001" },
    { id: "TCH-06", name: "Meenakshi Sundaram", department: "Fine Arts", phone: "+91 98666 00112" },
    { id: "TCH-07", name: "Mrs. Neha Kapoor", department: "Biology", phone: "+91 98777 11223" },
    { id: "TCH-08", name: "Mr. Ramesh Gupta", department: "Hindi", phone: "+91 98888 22334" },
  ]);
  const [teacherAttendance, setTeacherAttendance] = useState<Record<string, "present" | "absent" | "leave">>(() => {
    const initial: Record<string, "present" | "absent" | "leave"> = {};
    teachers.forEach(t => { initial[t.id] = "present"; });
    initial["TCH-06"] = "leave";
    return initial;
  });

  const toggleTeacherStatus = (id: string) => {
    setTeacherAttendance(prev => {
      const current = prev[id];
      const next = current === "present" ? "absent" : current === "absent" ? "leave" : "present";
      return { ...prev, [id]: next };
    });
  };

  const tchPresent = Object.values(teacherAttendance).filter(v => v === "present").length;
  const tchAbsent = Object.values(teacherAttendance).filter(v => v === "absent").length;
  const tchLeave = Object.values(teacherAttendance).filter(v => v === "leave").length;

  // ── Staff Attendance State ──
  const [staffMembers] = useState([
    { id: "STF-01", name: "Ramesh Sharma", role: "Chief Accountant", dept: "Finance" },
    { id: "STF-02", name: "Suresh Gupta", role: "Transport Supervisor", dept: "Transport" },
    { id: "STF-03", name: "Kavita Verma", role: "Head Librarian", dept: "Library" },
    { id: "STF-04", name: "Mahesh Kumar", role: "Chief Security Officer", dept: "Security" },
    { id: "STF-05", name: "Rajan Pillai", role: "IT Support Engineer", dept: "IT Infra" },
    { id: "STF-06", name: "Geeta Devi", role: "Front Office Executive", dept: "Administration" },
  ]);
  const [staffAttendance, setStaffAttendance] = useState<Record<string, "present" | "absent" | "leave">>(() => {
    const initial: Record<string, "present" | "absent" | "leave"> = {};
    staffMembers.forEach(s => { initial[s.id] = "present"; });
    return initial;
  });

  const toggleStaffStatus = (id: string) => {
    setStaffAttendance(prev => {
      const current = prev[id];
      const next = current === "present" ? "absent" : current === "absent" ? "leave" : "present";
      return { ...prev, [id]: next };
    });
  };

  const stfPresent = Object.values(staffAttendance).filter(v => v === "present").length;
  const stfAbsent = Object.values(staffAttendance).filter(v => v === "absent").length;
  const stfLeave = Object.values(staffAttendance).filter(v => v === "leave").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* PAGE HEADER */}
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)",
        border: "1px solid var(--border-glow)", borderRadius: "var(--radius-lg)", padding: "1.5rem 1.75rem",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Daily Attendance Management Engine <CalendarCheck size={24} color="var(--success)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Mark and track daily attendance for Students, Teachers, and Non-Teaching Staff with reports.
          </p>
        </div>
        <button className="btn btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
          <Download size={16} /> Export Attendance Report
        </button>
      </div>

      {/* 4 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        {[
          { id: "student", label: "Student Attendance", icon: Users },
          { id: "teacher", label: "Teacher Attendance", icon: UserCheck },
          { id: "staff", label: "Staff Attendance", icon: Briefcase },
          { id: "reports", label: "Attendance Reports", icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`btn ${activeTab === tab.id ? "btn-primary" : "btn-secondary"}`}>
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════
          TAB 1: STUDENT ATTENDANCE
      ═══════════════════════════════════════════════════ */}
      {activeTab === "student" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Stats Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Present Today", value: stuPresent, color: "#10b981", icon: CheckCircle2 },
              { label: "Absent Today", value: stuAbsent, color: "#ef4444", icon: XCircle },
              { label: "Late Arrivals", value: stuLate, color: "#f59e0b", icon: Clock },
              { label: "Attendance Rate", value: `${stuRate}%`, color: "#6366f1", icon: BarChart3 }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: `${stat.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={22} color={stat.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 900, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter Bar */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CalendarCheck size={16} color="var(--text-muted)" />
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                style={{ padding: "0.6rem 0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Filter size={16} color="var(--text-muted)" />
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
                style={{ padding: "0.6rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}>
                {["10-A", "10-B", "9-A", "9-B", "8-A", "8-B", "8-C"].map(c => <option key={c} value={c} style={{ background: "#0b0f19" }}>Class {c}</option>)}
              </select>
            </div>
            <div style={{ marginLeft: "auto", fontSize: "0.825rem", color: "var(--text-muted)" }}>
              <strong>{stuTotal}</strong> Students in Class {selectedClass} • Tap cells to toggle
            </div>
          </div>

          {/* Student Marking Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div className="table-container">
              <table className="custom-table">
                <thead><tr><th>Roll No</th><th>Student Name</th><th>STU ID</th><th style={{ textAlign: "center" }}>Status (Tap to Toggle)</th></tr></thead>
                <tbody>
                  {MOCK_STUDENTS.map((s) => {
                    const status = studentAttendance[s.id] || "present";
                    return (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 700 }}>{s.rollNo}</td>
                        <td style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <img src={s.avatar} alt={s.name} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border-color)" }} />
                          <span style={{ fontWeight: 700, color: "#fff" }}>{s.name}</span>
                        </td>
                        <td style={{ color: "var(--primary)", fontWeight: 600 }}>{s.id}</td>
                        <td style={{ textAlign: "center" }}>
                          <button type="button" onClick={() => toggleStudentStatus(s.id)} style={{
                            padding: "0.45rem 1.25rem", borderRadius: "var(--radius-sm)", border: "none", fontWeight: 800, fontSize: "0.78rem", cursor: "pointer", minWidth: 110, color: "#fff",
                            background: status === "present" ? "rgba(16, 185, 129, 0.85)" : status === "absent" ? "rgba(239, 68, 68, 0.85)" : "rgba(245, 158, 11, 0.85)"
                          }}>
                            {status === "present" ? "✅ PRESENT" : status === "absent" ? "❌ ABSENT" : "⏰ LATE"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem", gap: "0.75rem" }}>
              <button className="btn btn-secondary" onClick={() => {
                const reset: Record<string, "present" | "absent" | "late"> = {};
                MOCK_STUDENTS.forEach(s => { reset[s.id] = "present"; });
                setStudentAttendance(reset);
              }}>Reset All to Present</button>
              <button className="btn btn-primary">Submit Attendance for {selectedDate}</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB 2: TEACHER ATTENDANCE
      ═══════════════════════════════════════════════════ */}
      {activeTab === "teacher" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Present", value: tchPresent, color: "#10b981", icon: CheckCircle2 },
              { label: "Absent", value: tchAbsent, color: "#ef4444", icon: XCircle },
              { label: "On Leave", value: tchLeave, color: "#f59e0b", icon: Clock },
              { label: "Attendance Rate", value: `${teachers.length > 0 ? ((tchPresent / teachers.length) * 100).toFixed(1) : 0}%`, color: "#6366f1", icon: BarChart3 }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: `${stat.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={22} color={stat.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 900, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Teacher Marking Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Faculty Attendance — {selectedDate}</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead><tr><th>Staff ID</th><th>Teacher Name</th><th>Department</th><th>Contact</th><th style={{ textAlign: "center" }}>Status (Tap to Toggle)</th></tr></thead>
                <tbody>
                  {teachers.map((t) => {
                    const status = teacherAttendance[t.id] || "present";
                    return (
                      <tr key={t.id}>
                        <td style={{ fontWeight: 600, color: "var(--primary)" }}>{t.id}</td>
                        <td style={{ fontWeight: 700, color: "#fff" }}>{t.name}</td>
                        <td style={{ color: "var(--text-muted)" }}>{t.department}</td>
                        <td style={{ fontSize: "0.82rem" }}>{t.phone}</td>
                        <td style={{ textAlign: "center" }}>
                          <button type="button" onClick={() => toggleTeacherStatus(t.id)} style={{
                            padding: "0.45rem 1.25rem", borderRadius: "var(--radius-sm)", border: "none", fontWeight: 800, fontSize: "0.78rem", cursor: "pointer", minWidth: 120, color: "#fff",
                            background: status === "present" ? "rgba(16, 185, 129, 0.85)" : status === "absent" ? "rgba(239, 68, 68, 0.85)" : "rgba(245, 158, 11, 0.85)"
                          }}>
                            {status === "present" ? "✅ PRESENT" : status === "absent" ? "❌ ABSENT" : "📋 ON LEAVE"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <button className="btn btn-primary">Submit Teacher Attendance</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB 3: STAFF ATTENDANCE
      ═══════════════════════════════════════════════════ */}
      {activeTab === "staff" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Present", value: stfPresent, color: "#10b981", icon: CheckCircle2 },
              { label: "Absent", value: stfAbsent, color: "#ef4444", icon: XCircle },
              { label: "On Leave", value: stfLeave, color: "#f59e0b", icon: Clock },
              { label: "Attendance Rate", value: `${staffMembers.length > 0 ? ((stfPresent / staffMembers.length) * 100).toFixed(1) : 0}%`, color: "#6366f1", icon: BarChart3 }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: `${stat.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={22} color={stat.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 900, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Staff Marking Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Non-Teaching Staff Attendance — {selectedDate}</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead><tr><th>Staff ID</th><th>Name</th><th>Role / Designation</th><th>Department</th><th style={{ textAlign: "center" }}>Status (Tap to Toggle)</th></tr></thead>
                <tbody>
                  {staffMembers.map((s) => {
                    const status = staffAttendance[s.id] || "present";
                    return (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 600, color: "var(--primary)" }}>{s.id}</td>
                        <td style={{ fontWeight: 700, color: "#fff" }}>{s.name}</td>
                        <td style={{ color: "var(--text-muted)" }}>{s.role}</td>
                        <td style={{ color: "var(--text-muted)" }}>{s.dept}</td>
                        <td style={{ textAlign: "center" }}>
                          <button type="button" onClick={() => toggleStaffStatus(s.id)} style={{
                            padding: "0.45rem 1.25rem", borderRadius: "var(--radius-sm)", border: "none", fontWeight: 800, fontSize: "0.78rem", cursor: "pointer", minWidth: 120, color: "#fff",
                            background: status === "present" ? "rgba(16, 185, 129, 0.85)" : status === "absent" ? "rgba(239, 68, 68, 0.85)" : "rgba(245, 158, 11, 0.85)"
                          }}>
                            {status === "present" ? "✅ PRESENT" : status === "absent" ? "❌ ABSENT" : "📋 ON LEAVE"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <button className="btn btn-primary">Submit Staff Attendance</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB 4: ATTENDANCE REPORTS
      ═══════════════════════════════════════════════════ */}
      {activeTab === "reports" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Monthly Attendance Bar Chart */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Monthly Student Attendance Trend (2026)</h3>
              <button className="btn btn-secondary" style={{ fontSize: "0.78rem" }}><Download size={14} /> Export CSV</button>
            </div>
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
                    background: `linear-gradient(180deg, ${m.rate >= 95 ? "#10b981" : m.rate >= 90 ? "#6366f1" : "#f59e0b"} 0%, rgba(99,102,241,0.2) 100%)`
                  }} />
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Class-wise Attendance Summary */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Class-wise Attendance Summary (July 2026)</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead><tr><th>Class</th><th>Total Students</th><th>Avg Attendance</th><th>Highest</th><th>Lowest</th><th>Days Marked</th></tr></thead>
                <tbody>
                  {[
                    { cls: "Class 10-A", total: 38, avg: "96.4%", high: "100%", low: "82%", days: 22 },
                    { cls: "Class 10-B", total: 40, avg: "94.2%", high: "100%", low: "78%", days: 22 },
                    { cls: "Class 9-A", total: 42, avg: "95.8%", high: "100%", low: "85%", days: 22 },
                    { cls: "Class 9-B", total: 35, avg: "93.1%", high: "98%", low: "76%", days: 22 },
                    { cls: "Class 8-A", total: 42, avg: "97.0%", high: "100%", low: "90%", days: 22 },
                    { cls: "Class 8-B", total: 40, avg: "95.5%", high: "100%", low: "88%", days: 22 },
                    { cls: "Class 8-C", total: 42, avg: "96.8%", high: "100%", low: "91%", days: 22 },
                  ].map((r, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700, color: "#fff" }}>{r.cls}</td>
                      <td>{r.total}</td>
                      <td style={{ fontWeight: 800, color: "var(--success)" }}>{r.avg}</td>
                      <td style={{ color: "var(--success)" }}>{r.high}</td>
                      <td style={{ color: "#ef4444" }}>{r.low}</td>
                      <td style={{ color: "var(--text-muted)" }}>{r.days} / 22</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teacher & Staff Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Teacher Attendance Summary (July)</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  { label: "Total Faculty", value: "86", color: "#6366f1" },
                  { label: "Avg Present / Day", value: "82.4", color: "#10b981" },
                  { label: "Total Leave Days Taken", value: "18", color: "#f59e0b" },
                  { label: "Attendance Rate", value: "98.5%", color: "#38bdf8" }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{item.label}</span>
                    <span style={{ fontWeight: 800, color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Non-Teaching Staff Summary (July)</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  { label: "Total Staff", value: "24", color: "#6366f1" },
                  { label: "Avg Present / Day", value: "22.8", color: "#10b981" },
                  { label: "Total Leave Days Taken", value: "6", color: "#f59e0b" },
                  { label: "Attendance Rate", value: "97.2%", color: "#38bdf8" }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{item.label}</span>
                    <span style={{ fontWeight: 800, color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
