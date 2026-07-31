"use client";

import React, { useState } from "react";
import {
  CalendarCheck, CheckCircle2, XCircle, Clock, Search, Filter,
  Users, BarChart3, Download, AlertCircle, UserCheck, Briefcase,
  TrendingUp, FileText, Calendar, Settings, AlertOctagon, Send, PlayCircle, Star
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockData";

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<"student" | "teacher" | "leaves" | "calendar" | "reports" | "analytics" | "notifications" | "settings">("student");

  // ── Student Attendance State (Module 1) ──
  const [selectedDate, setSelectedDate] = useState("2026-07-31");
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [studentAttendance, setStudentAttendance] = useState<Record<string, "Present" | "Absent" | "Leave" | "Half Day">>(() => {
    const initial: Record<string, "Present" | "Absent" | "Leave" | "Half Day"> = {};
    MOCK_STUDENTS.forEach(s => { initial[s.id] = "Present"; });
    return initial;
  });

  const toggleStudentStatus = (id: string, status: "Present" | "Absent" | "Leave" | "Half Day") => {
    setStudentAttendance(prev => ({
      ...prev,
      [id]: status
    }));
  };

  const markAllStudents = (status: "Present" | "Absent" | "Leave" | "Half Day") => {
    const updated = { ...studentAttendance };
    MOCK_STUDENTS.forEach(s => {
      updated[s.id] = status;
    });
    setStudentAttendance(updated);
  };

  const stuPresent = Object.values(studentAttendance).filter(v => v === "Present").length;
  const stuAbsent = Object.values(studentAttendance).filter(v => v === "Absent").length;
  const stuLeave = Object.values(studentAttendance).filter(v => v === "Leave").length;
  const stuHalfDay = Object.values(studentAttendance).filter(v => v === "Half Day").length;
  const stuTotal = Object.keys(studentAttendance).length;
  const stuRate = stuTotal > 0 ? (((stuPresent + stuHalfDay * 0.5) / stuTotal) * 100).toFixed(1) : "0";

  // ── Teacher Attendance State (Module 2) ──
  const [teachers] = useState([
    { id: "TCH-01", name: "Sunita Rao", department: "Mathematics", checkIn: "07:52 AM", checkOut: "02:30 PM", status: "Present" },
    { id: "TCH-02", name: "Dr. Vikram Malhotra", department: "Science", checkIn: "07:55 AM", checkOut: "02:30 PM", status: "Present" },
    { id: "TCH-03", name: "Ananya Deshmukh", department: "Humanities", checkIn: "08:12 AM", checkOut: "02:30 PM", status: "Late Entry" },
    { id: "TCH-04", name: "Rajesh Kumar", department: "IT & CS", checkIn: "—", checkOut: "—", status: "Leave" }
  ]);
  const [teacherLogs, setTeacherLogs] = useState<Record<string, { checkIn: string, checkOut: string, status: string }>>(() => {
    const initial: Record<string, { checkIn: string, checkOut: string, status: string }> = {};
    teachers.forEach(t => {
      initial[t.id] = { checkIn: t.checkIn, checkOut: t.checkOut, status: t.status };
    });
    return initial;
  });

  // ── Leave Management State (Module 3) ──
  const [studentLeaves, setStudentLeaves] = useState([
    { id: "SL-01", studentName: "Rahul Verma", class: "10-A", reason: "Severe Typhoid fever", dates: "01 Aug - 05 Aug", status: "PENDING", parentAppLinked: true },
    { id: "SL-02", studentName: "Neha Sharma", class: "9-B", reason: "Family travel outside Delhi", dates: "29 July (1 Day)", status: "APPROVED", parentAppLinked: true }
  ]);

  const [teacherLeaves, setTeacherLeaves] = useState([
    { id: "TL-01", name: "Sunita Rao", type: "Casual Leave", balance: "12 Days", dates: "04 Aug - 05 Aug", status: "PENDING", reason: "Brother's wedding ceremonies" }
  ]);

  const [leaveComments, setLeaveComments] = useState<Record<string, string>>({});

  const handleStudentLeaveAction = (id: string, action: "APPROVED" | "REJECTED") => {
    const comment = leaveComments[id] || "";
    setStudentLeaves(studentLeaves.map(l => l.id === id ? { ...l, status: action } : l));
    alert(`Leave application has been ${action.toLowerCase()}! Alert dispatched to Parent App.`);
  };

  const handleTeacherLeaveAction = (id: string, action: "APPROVED" | "REJECTED") => {
    setTeacherLeaves(teacherLeaves.map(l => l.id === id ? { ...l, status: action } : l));
    alert(`Teacher leave application has been ${action.toLowerCase()}!`);
  };

  // ── Calendar View selection (Module 4) ──
  const [calendarTargetId, setCalendarTargetId] = useState("STU-1001");
  const calendarDays = Array.from({ length: 28 }, (_, i) => {
    if (i === 4 || i === 12) return "Absent";
    if (i === 18) return "Leave";
    if (i === 22) return "Half Day";
    return "Present";
  });

  // ── Report configurations (Module 5) ──
  const [reportType, setReportType] = useState("student");
  const [reportRange, setReportRange] = useState("2026-07");

  // ── Notification Broadcast variables (Module 7) ──
  const [autoSmsOnAbsence, setAutoSmsOnAbsence] = useState(true);
  const [autoWhatsAppOnLate, setAutoWhatsAppOnLate] = useState(true);
  const [smsLogs, setSmsLogs] = useState([
    { id: "SMS-101", target: "Parent of Rahul Verma", text: "Alert: Rahul was marked ABSENT today from Class 10-A.", time: "Today, 08:35 AM", status: "Delivered" },
    { id: "SMS-102", target: "Parent of Neha Sharma", text: "Alert: Neha was marked LATE today. Entry logged at 08:12 AM.", time: "Today, 08:15 AM", status: "Delivered" }
  ]);

  // ── Settings (Module 8) ──
  const [schoolStartTime, setSchoolStartTime] = useState("08:00 AM");
  const [lateThreshold, setLateThreshold] = useState("08:15 AM");
  const [minHoursForHalfDay, setMinHoursForHalfDay] = useState(3.5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Attendance &amp; Leave Control <CalendarCheck size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Daily attendance rosters, RFID punch monitoring, student/teacher leaves workflow, calendar matrix, analytics.
          </p>
        </div>
      </div>

      {/* ════════════ 8 TABS SWITCHER CONSOLE ════════════ */}
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
          { id: "student", label: "Student Attendance", icon: Users },
          { id: "teacher", label: "Teacher Attendance", icon: UserCheck },
          { id: "leaves", label: "Leave Requests Hub", icon: AlertCircle },
          { id: "calendar", label: "Attendance Calendar", icon: Calendar },
          { id: "reports", label: "Attendance Reports", icon: FileText },
          { id: "analytics", label: "Analytics Charts", icon: BarChart3 },
          { id: "notifications", label: "Alert Dispatcher", icon: Send },
          { id: "settings", label: "Roster Settings", icon: Settings }
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

      {/* MODULE 1: STUDENT ATTENDANCE */}
      {activeTab === "student" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Stats widgets */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            <div className="glass-card" style={{ padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>PRESENCE RATE</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 850, color: "var(--success)", marginTop: 4 }}>{stuRate}%</div>
            </div>
            <div className="glass-card" style={{ padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>PRESENT STUDENTS</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 850, color: "#fff", marginTop: 4 }}>{stuPresent}</div>
            </div>
            <div className="glass-card" style={{ padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ABSENT STUDENTS</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 850, color: "#ef4444", marginTop: 4 }}>{stuAbsent}</div>
            </div>
            <div className="glass-card" style={{ padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ON APPROVED LEAVE</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 850, color: "var(--primary)", marginTop: 4 }}>{stuLeave}</div>
            </div>
            <div className="glass-card" style={{ padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>HALF DAY STUDENTS</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 850, color: "#f59e0b", marginTop: 4 }}>{stuHalfDay}</div>
            </div>
          </div>

          {/* Filters and bulk controls */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justify: "space-between", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "0.75rem", flex: 1, maxWidth: 650 }}>
              <input 
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ padding: "0.65rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
              />

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{ padding: "0.65rem 1.25rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", cursor: "pointer", outline: "none" }}
              >
                <option value="10" style={{ background: "#0b0f19" }}>Class 10</option>
                <option value="9" style={{ background: "#0b0f19" }}>Class 9</option>
              </select>

              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                style={{ padding: "0.65rem 1.25rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", cursor: "pointer", outline: "none" }}
              >
                <option value="A" style={{ background: "#0b0f19" }}>Section A</option>
                <option value="B" style={{ background: "#0b0f19" }}>Section B</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => markAllStudents("Present")} className="btn btn-secondary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}>Mark All Present</button>
              <button onClick={() => markAllStudents("Absent")} className="btn btn-secondary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem", color: "#ef4444" }}>Mark All Absent</button>
            </div>
          </div>

          {/* Student Roster list */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Class &amp; Section</th>
                  <th>RFID Tag Info</th>
                  <th>Presence status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_STUDENTS.map((s) => {
                  const currentStatus = studentAttendance[s.id] || "Present";
                  return (
                    <tr key={s.id}>
                      <td style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <img src={s.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
                        <div>
                          <div style={{ fontWeight: 700, color: "#fff" }}>{s.name}</div>
                          <div style={{ fontSize: "0.7rem", color: "var(--primary)" }}>{s.id}</div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{s.rollNo}</td>
                      <td><span className="badge badge-info" style={{ color: "#38bdf8" }}>Class {s.class}-{s.section}</span></td>
                      <td><span className="badge badge-success">RFID SCAN OK ✅</span></td>
                      <td>
                        <div style={{ display: "flex", gap: "0.35rem" }}>
                          {(["Present", "Absent", "Leave", "Half Day"] as const).map(status => (
                            <button
                              key={status}
                              onClick={() => toggleStudentStatus(s.id, status)}
                              className={`btn ${currentStatus === status ? "btn-primary" : "btn-secondary"}`}
                              style={{ 
                                padding: "0.3rem 0.6rem", 
                                fontSize: "0.7rem",
                                borderRadius: "var(--radius-sm)"
                              }}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* MODULE 2: TEACHER ATTENDANCE */}
      {activeTab === "teacher" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Faculty Presence &amp; Shift times</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Department</th>
                <th>Check In Punch</th>
                <th>Check Out Punch</th>
                <th>Logged Status</th>
                <th style={{ textAlign: "right" }}>Manual Adjustment</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(teacherLogs).map(([id, log]) => {
                const tInfo = teachers.find(t => t.id === id);
                return (
                  <tr key={id}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{tInfo?.name}</td>
                    <td><span className="badge badge-info">{tInfo?.department}</span></td>
                    <td style={{ fontWeight: 700, color: "var(--success)" }}>{log.checkIn}</td>
                    <td>{log.checkOut}</td>
                    <td>
                      <span className={`badge ${
                        log.status === "Present" ? "badge-success" : log.status === "Late Entry" ? "badge-warning" : "badge-danger"
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button 
                        onClick={() => {
                          const newIn = prompt("Enter new Check In time:", log.checkIn);
                          if (newIn !== null) {
                            setTeacherLogs(prev => ({
                              ...prev,
                              [id]: { ...prev[id], checkIn: newIn }
                            }));
                          }
                        }}
                        className="btn btn-secondary" 
                        style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem" }}
                      >
                        Adjust punch
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 3: LEAVE MANAGEMENT PORTAL */}
      {activeTab === "leaves" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          
          {/* Student Leaves */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1rem" }}>Parent Leave Requests (Student)</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {studentLeaves.map((l) => (
                <div key={l.id} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8 }}>
                  <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 700, color: "#fff" }}>{l.studentName} ({l.class})</div>
                    <span className={`badge ${l.status === "APPROVED" ? "badge-success" : l.status === "PENDING" ? "badge-warning" : "badge-danger"}`}>
                      {l.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Dates: <strong>{l.dates}</strong></div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-main)", marginTop: 2 }}>Reason: {l.reason}</div>
                  
                  {l.status === "PENDING" && (
                    <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.75rem", justifyContent: "flex-end" }}>
                      <button onClick={() => handleStudentLeaveAction(l.id, "APPROVED")} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}>Approve</button>
                      <button onClick={() => handleStudentLeaveAction(l.id, "REJECTED")} style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.25)", color: "#ef4444", padding: "0.35rem 0.65rem", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.72rem" }}>Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Leaves */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1rem" }}>Faculty Leave Applications</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {teacherLeaves.map((l) => (
                <div key={l.id} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8 }}>
                  <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 700, color: "#fff" }}>{l.name} ({l.type})</div>
                    <span className={`badge ${l.status === "APPROVED" ? "badge-success" : l.status === "PENDING" ? "badge-warning" : "badge-danger"}`}>
                      {l.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>Leave Balance: <strong>{l.balance}</strong></div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Dates: <strong>{l.dates}</strong></div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-main)", marginTop: 2 }}>Reason: {l.reason}</div>
                  
                  {l.status === "PENDING" && (
                    <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.75rem", justifyContent: "flex-end" }}>
                      <button onClick={() => handleTeacherLeaveAction(l.id, "APPROVED")} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}>Approve</button>
                      <button onClick={() => handleTeacherLeaveAction(l.id, "REJECTED")} style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.25)", color: "#ef4444", padding: "0.35rem 0.65rem", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.72rem" }}>Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODULE 4: ATTENDANCE CALENDAR */}
      {activeTab === "calendar" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Monthly Visual Presence Calendar</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Select target student ID to see calendar heatmaps.</p>
            </div>
            
            <select
              value={calendarTargetId}
              onChange={(e) => setCalendarTargetId(e.target.value)}
              style={{ padding: "0.5rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
            >
              {MOCK_STUDENTS.map(s => <option key={s.id} value={s.id} style={{ background: "#0b0f19" }}>{s.name} ({s.id})</option>)}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.75rem" }}>
            {calendarDays.map((dayStatus, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: "1rem", 
                  borderRadius: 8, 
                  background: dayStatus === "Present" ? "var(--success-bg)" : dayStatus === "Absent" ? "var(--danger-bg)" : dayStatus === "Leave" ? "rgba(99, 102, 241, 0.12)" : "rgba(245, 158, 11, 0.12)",
                  border: `1px solid ${
                    dayStatus === "Present" ? "var(--success)" : dayStatus === "Absent" ? "var(--danger)" : dayStatus === "Leave" ? "var(--primary)" : "var(--warning)"
                  }`,
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Day {idx+1}</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 850, marginTop: 4, color: "#fff" }}>
                  {dayStatus === "Present" ? "P" : dayStatus === "Absent" ? "A" : dayStatus === "Leave" ? "L" : "H"}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", marginTop: 2 }}>{dayStatus}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 5: ATTENDANCE REPORTS */}
      {activeTab === "reports" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={{ padding: "0.5rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
              >
                <option value="student" style={{ background: "#0b0f19" }}>Student-wise attendance Report</option>
                <option value="class" style={{ background: "#0b0f19" }}>Class-wise summary report</option>
                <option value="teacher" style={{ background: "#0b0f19" }}>Teacher roster report</option>
              </select>

              <input 
                type="month" 
                value={reportRange}
                onChange={(e) => setReportRange(e.target.value)}
                style={{ padding: "0.5rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
              />
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => alert("Downloading PDF Attendance Report...")} className="btn btn-secondary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}>Export PDF</button>
              <button onClick={() => alert("Downloading Excel Attendance report...")} className="btn btn-secondary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}>Export Excel</button>
            </div>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Entity Name</th>
                <th>Working Days</th>
                <th>Present Days</th>
                <th>Absent Days</th>
                <th>Late Entries</th>
                <th>Overall Presence %</th>
              </tr>
            </thead>
            <tbody>
              {reportType === "student" ? (
                MOCK_STUDENTS.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 700 }}>{s.name}</td>
                    <td>22 Days</td>
                    <td>20 Days</td>
                    <td>2 Days</td>
                    <td>0 Days</td>
                    <td style={{ fontWeight: 800, color: "var(--success)" }}>{s.attendance}</td>
                  </tr>
                ))
              ) : (
                teachers.map(t => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700 }}>{t.name}</td>
                    <td>22 Days</td>
                    <td>21 Days</td>
                    <td>0 Days</td>
                    <td>1 Day</td>
                    <td style={{ fontWeight: 800, color: "var(--success)" }}>98.5%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 6: ATTENDANCE ANALYTICS */}
      {activeTab === "analytics" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* Presence trend benchmarks */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Attendance Analytics &amp; Monthly Trends</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { label: "Class 10 Overall Presence Index", pct: 94 },
                { label: "Class 9 Overall Presence Index", pct: 96 },
                { label: "Class 8 Overall Presence Index", pct: 91 },
                { label: "Faculty Presence Index", pct: 98.2 }
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", justify: "space-between", fontSize: "0.85rem", fontWeight: 700 }}>
                    <span style={{ color: "#fff" }}>{item.label}</span>
                    <span style={{ color: "var(--primary)" }}>{item.pct}%</span>
                  </div>
                  <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ width: `${item.pct}%`, height: "100%", background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)", borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chronic Absentees */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>Chronic Absentees Checklist</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { name: "Rahul Verma", rate: "72.4% (Below 75%)", class: "Class 10-A", daysAbsent: "6 Days" },
                { name: "Suresh Gupta", rate: "74.0% (Below 75%)", class: "Class 9-B", daysAbsent: "5 Days" }
              ].map((student, idx) => (
                <div key={idx} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8, display: "flex", justify: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff" }}>{student.name} ({student.class})</div>
                    <div style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: 2 }}>Presence rate: {student.rate}</div>
                  </div>
                  <span className="badge badge-danger" style={{ fontSize: "0.68rem" }}>{student.daysAbsent} Absent</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODULE 7: ATTENDANCE NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "1.5rem" }}>
          
          {/* Notification toggles */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Automated Parent Broadcasts</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.85rem", cursor: "pointer", color: "var(--text-main)" }}>
                <input 
                  type="checkbox"
                  checked={autoSmsOnAbsence}
                  onChange={(e) => setAutoSmsOnAbsence(e.target.checked)}
                />
                <span>Auto-dispatch SMS to parents instantly on student absence</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.85rem", cursor: "pointer", color: "var(--text-main)" }}>
                <input 
                  type="checkbox"
                  checked={autoWhatsAppOnLate}
                  onChange={(e) => setAutoWhatsAppOnLate(e.target.checked)}
                />
                <span>Auto-dispatch WhatsApp alert to parents on student late entries</span>
              </label>

              <button onClick={() => alert("Broadcast rules configured!")} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "1rem" }}>
                Update Broadcast Rules
              </button>
            </div>
          </div>

          {/* Broadcast SMS logs */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>Real-time Broadcast SMS logs</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {smsLogs.map((log) => (
                <div key={log.id} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", borderRadius: 8 }}>
                  <div style={{ display: "flex", justify: "space-between", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    <span>To: <strong>{log.target}</strong></span>
                    <span>{log.time}</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#fff", marginTop: 4 }}>{log.text}</div>
                  <span className="badge badge-success" style={{ fontSize: "0.65rem", marginTop: 6, display: "inline-block" }}>{log.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODULE 8: ATTENDANCE SETTINGS */}
      {activeTab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          
          {/* Institutional Hours */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Institution Timing Configuration</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>DAILY ASSEMBLY START TIME</label>
                <input 
                  type="text" 
                  value={schoolStartTime}
                  onChange={(e) => setSchoolStartTime(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>LATE CUTOFF THRESHOLD</label>
                <input 
                  type="text" 
                  value={lateThreshold}
                  onChange={(e) => setLateThreshold(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                />
              </div>

              <button onClick={() => alert("Institution Timing settings saved!")} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center" }}>
                Save Timings Policy
              </button>
            </div>
          </div>

          {/* Half day criteria */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Half Day Attendance Rules</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>MINIMUM WORKING HOURS FOR FULL DAY</label>
                <input 
                  type="number" 
                  step="0.5"
                  value={minHoursForHalfDay}
                  onChange={(e) => setMinHoursForHalfDay(Number(e.target.value))}
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                />
              </div>

              <button onClick={() => alert("Attendance criteria updated successfully!")} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "1rem" }}>
                Update Attendance Criteria
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
