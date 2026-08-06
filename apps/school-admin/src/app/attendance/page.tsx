"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck, CheckCircle2, XCircle, Clock, Search, Filter,
  Users, BarChart3, Download, AlertCircle, UserCheck, Briefcase,
  TrendingUp, FileText, Calendar, Settings, AlertOctagon, Send, PlayCircle, Star,
  Plus, Edit3, Trash2, Save, X, RefreshCw, Radio, FileSpreadsheet, ShieldAlert, Check
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockData";

interface StudentRecord {
  id: string;
  name: string;
  rollNo: string;
  classSection: string;
  rfidTag: string;
  avatar: string;
  status: "Present" | "Absent" | "Leave" | "Half Day";
  checkInTime?: string;
}

interface TeacherPunch {
  id: string;
  name: string;
  department: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent" | "Late Entry" | "Half Day";
  rfidCode: string;
}

interface LeaveRecord {
  id: string;
  name: string;
  targetType: "Student" | "Teacher";
  classOrDept: string;
  dates: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  comment: string;
}

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<
    "student" | "teacher" | "leaves" | "calendar" | "reports" | "analytics" | "notifications" | "settings"
  >("student");

  // Filter States
  const [selectedDate, setSelectedDate] = useState("2026-08-06");
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [selectedSection, setSelectedSection] = useState("Section A");

  // ════════════ 1. STUDENT ATTENDANCE STATE ════════════
  const initialStudentList: StudentRecord[] = MOCK_STUDENTS.map((s, idx) => ({
    id: s.id,
    name: s.name,
    rollNo: `10-A-${String(idx + 1).padStart(2, "0")}`,
    classSection: `${s.class}-${s.section}`,
    rfidTag: `RFID-OK-${s.id}`,
    avatar: s.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
    status: "Present",
    checkInTime: "07:50 AM"
  }));

  const [students, setStudents] = useState<StudentRecord[]>(initialStudentList);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);

  // ════════════ 2. TEACHER PUNCH STATE ════════════
  const [teachers, setTeachers] = useState<TeacherPunch[]>([
    { id: "TCH-01", name: "Sunita Rao", department: "Mathematics", checkIn: "07:52 AM", checkOut: "02:30 PM", status: "Present", rfidCode: "RFID-FAC-101" },
    { id: "TCH-02", name: "Dr. Vikram Malhotra", department: "Science", checkIn: "07:55 AM", checkOut: "02:30 PM", status: "Present", rfidCode: "RFID-FAC-102" },
    { id: "TCH-03", name: "Ananya Deshmukh", department: "English", checkIn: "08:12 AM", checkOut: "02:30 PM", status: "Late Entry", rfidCode: "RFID-FAC-103" }
  ]);
  const [isTeacherPunchModalOpen, setIsTeacherPunchModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherPunch | null>(null);

  // ════════════ 3. LEAVE RECORDS STATE ════════════
  const [leaves, setLeaves] = useState<LeaveRecord[]>([
    { id: "LV-01", name: "Aarav Sharma", targetType: "Student", classOrDept: "Class 10-A", dates: "01 Aug - 05 Aug", reason: "Severe Typhoid fever", status: "PENDING", comment: "" },
    { id: "LV-02", name: "Sunita Rao", targetType: "Teacher", classOrDept: "Mathematics", dates: "10 Aug (1 Day)", reason: "Family Function", status: "APPROVED", comment: "Approved against duty leave pool" }
  ]);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ name: "Aarav Sharma", targetType: "Student" as const, classOrDept: "Class 10-A", dates: "12 Aug - 14 Aug", reason: "Personal Reason" });

  // ════════════ 4. CALENDAR STATE ════════════
  const [selectedCalendarTarget, setSelectedCalendarTarget] = useState("Aarav Sharma");

  // ════════════ 5. SETTINGS STATE ════════════
  const [settingsForm, setSettingsForm] = useState({
    schoolStartTime: "08:00 AM",
    lateThreshold: "08:15 AM",
    halfDayMinHours: "3.5",
    autoSmsAbsent: true,
    autoWhatsappLate: true,
    weekendHoliday: "Sunday Only"
  });

  // Persistent Cache Load
  useEffect(() => {
    try {
      const cached = localStorage.getItem("sm_attendance_students");
      if (cached) setStudents(JSON.parse(cached));

      const cachedTeachers = localStorage.getItem("sm_attendance_teachers");
      if (cachedTeachers) setTeachers(JSON.parse(cachedTeachers));
    } catch (e) {}
  }, []);

  const saveStudents = (list: StudentRecord[]) => {
    setStudents(list);
    try { localStorage.setItem("sm_attendance_students", JSON.stringify(list)); } catch (e) {}
  };

  const saveTeachers = (list: TeacherPunch[]) => {
    setTeachers(list);
    try { localStorage.setItem("sm_attendance_teachers", JSON.stringify(list)); } catch (e) {}
  };

  // KPI Computations
  const stuPresent = students.filter(s => s.status === "Present").length;
  const stuAbsent = students.filter(s => s.status === "Absent").length;
  const stuLeave = students.filter(s => s.status === "Leave").length;
  const stuHalfDay = students.filter(s => s.status === "Half Day").length;
  const stuTotal = students.length;
  const stuRate = stuTotal > 0 ? (((stuPresent + stuHalfDay * 0.5) / stuTotal) * 100).toFixed(1) : "0";

  // Actions
  const handleToggleStatus = (id: string, status: "Present" | "Absent" | "Leave" | "Half Day") => {
    const updated = students.map(s => s.id === id ? { ...s, status } : s);
    saveStudents(updated);
  };

  const handleMarkAll = (status: "Present" | "Absent" | "Leave" | "Half Day") => {
    const updated = students.map(s => ({ ...s, status }));
    saveStudents(updated);
  };

  const handleSaveEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    const updated = students.map(s => s.id === editingStudent.id ? editingStudent : s);
    saveStudents(updated);
    setIsEditStudentModalOpen(false);
    alert(`Student record updated for ${editingStudent.name}!`);
  };

  const handleSaveEditTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;
    const updated = teachers.map(t => t.id === editingTeacher.id ? editingTeacher : t);
    saveTeachers(updated);
    setIsTeacherPunchModalOpen(false);
    alert(`Faculty punch record updated for ${editingTeacher.name}!`);
  };

  const handleProcessLeave = (id: string, status: "APPROVED" | "REJECTED") => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
    alert(`Leave application has been ${status.toLowerCase()}!`);
  };

  const handleApplyLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: LeaveRecord = {
      id: `LV-${Date.now()}`,
      name: leaveForm.name,
      targetType: leaveForm.targetType,
      classOrDept: leaveForm.classOrDept,
      dates: leaveForm.dates,
      reason: leaveForm.reason,
      status: "PENDING",
      comment: ""
    };
    setLeaves([created, ...leaves]);
    setIsLeaveModalOpen(false);
    alert(`Leave application filed for ${leaveForm.name}!`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Attendance &amp; Leave Control <CalendarCheck size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0, fontSize: "0.85rem" }}>
            Daily attendance rosters, RFID punch monitoring, student/teacher leaves workflow, calendar matrix, and automated notifications.
          </p>
        </div>

        <button onClick={() => alert("Daily Attendance Roster synchronized with central cloud database!")} className="btn btn-primary" style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}>
          <RefreshCw size={16} /> Sync RFID Gateway
        </button>
      </div>

      {/* SUB-TABS NAVIGATION BAR */}
      <div className="glass-card" style={{ padding: "0.6rem", display: "flex", gap: "0.5rem", overflowX: "auto", whiteSpace: "nowrap" }}>
        {[
          { id: "student", label: "Student Attendance", icon: Users },
          { id: "teacher", label: "Teacher Attendance", icon: UserCheck },
          { id: "leaves", label: "Leave Requests Hub", icon: Clock },
          { id: "calendar", label: "Attendance Calendar", icon: Calendar },
          { id: "reports", label: "Attendance Reports", icon: FileText },
          { id: "analytics", label: "Analytics Charts", icon: BarChart3 },
          { id: "notifications", label: "Alert Dispatcher", icon: Send },
          { id: "settings", label: "Attendance Settings", icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "0.55rem 0.95rem", fontSize: "0.82rem", gap: "0.4rem", borderRadius: 8, fontWeight: isActive ? 700 : 500 }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ════════════ MODULE 1: STUDENT ATTENDANCE ════════════ */}
      {activeTab === "student" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {/* KPI Stat Cards Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            <div className="glass-card" style={{ padding: "1.15rem", display: "flex", flexDirection: "column", gap: "0.35rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase" }}>PRESENCE RATE</span>
              <strong style={{ fontSize: "1.6rem", color: "var(--primary)", fontWeight: 900 }}>{stuRate}%</strong>
            </div>

            <div className="glass-card" style={{ padding: "1.15rem", display: "flex", flexDirection: "column", gap: "0.35rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase" }}>PRESENT (P)</span>
              <strong style={{ fontSize: "1.6rem", color: "var(--success)", fontWeight: 900 }}>{stuPresent}</strong>
            </div>

            <div className="glass-card" style={{ padding: "1.15rem", display: "flex", flexDirection: "column", gap: "0.35rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase" }}>ABSENT (A)</span>
              <strong style={{ fontSize: "1.6rem", color: "#ef4444", fontWeight: 900 }}>{stuAbsent}</strong>
            </div>

            <div className="glass-card" style={{ padding: "1.15rem", display: "flex", flexDirection: "column", gap: "0.35rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase" }}>ON LEAVE (L)</span>
              <strong style={{ fontSize: "1.6rem", color: "#3b82f6", fontWeight: 900 }}>{stuLeave}</strong>
            </div>

            <div className="glass-card" style={{ padding: "1.15rem", display: "flex", flexDirection: "column", gap: "0.35rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase" }}>HALF DAY (HD)</span>
              <strong style={{ fontSize: "1.6rem", color: "#f59e0b", fontWeight: 900 }}>{stuHalfDay}</strong>
            </div>
          </div>

          {/* Date & Class Toolbar */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ padding: "0.6rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontWeight: 700 }}
              />

              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={{ padding: "0.6rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontWeight: 700 }}>
                <option value="Class 10">Class 10</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 8">Class 8</option>
              </select>

              <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} style={{ padding: "0.6rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontWeight: 700 }}>
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handleMarkAll("Present")} className="btn btn-primary" style={{ padding: "0.45rem 0.9rem", fontSize: "0.78rem" }}>
                Mark All P
              </button>
              <button onClick={() => handleMarkAll("Absent")} className="btn btn-secondary" style={{ padding: "0.45rem 0.9rem", fontSize: "0.78rem", color: "#ef4444" }}>
                Mark All A
              </button>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>STUDENT NAME</th>
                    <th>ROLL NUMBER</th>
                    <th>CLASS &amp; SECTION</th>
                    <th>RFID TAG INFO</th>
                    <th>PRESENCE STATUS</th>
                    <th style={{ textAlign: "right" }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <img src={s.avatar} alt={s.name} style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }} />
                          <div>
                            <strong style={{ color: "var(--text-heading)" }}>{s.name}</strong>
                            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{s.id}</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ fontWeight: 800, fontFamily: "monospace" }}>{s.rollNo}</td>
                      <td><span className="badge badge-info">{s.classSection}</span></td>
                      <td><span className="badge badge-success">RFID SCAN OK ✅</span></td>

                      {/* CONCISE STATUS BUTTONS: P, A, L, HD */}
                      <td>
                        <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                          {[
                            { key: "Present" as const, code: "P", color: "#22c55e", title: "Present" },
                            { key: "Absent" as const, code: "A", color: "#ef4444", title: "Absent" },
                            { key: "Leave" as const, code: "L", color: "#3b82f6", title: "Leave" },
                            { key: "Half Day" as const, code: "HD", color: "#f59e0b", title: "Half Day" }
                          ].map(st => (
                            <button
                              key={st.key}
                              onClick={() => handleToggleStatus(s.id, st.key)}
                              className="btn btn-secondary"
                              title={st.title}
                              style={{ 
                                padding: "0.35rem 0.75rem", 
                                fontSize: "0.8rem",
                                fontWeight: 900,
                                background: s.status === st.key ? st.color : "var(--bg-input)",
                                color: s.status === st.key ? "#fff" : "var(--text-muted)",
                                border: s.status === st.key ? "none" : "1px solid var(--border-color)",
                                borderRadius: 6
                              }}
                            >
                              {st.code}
                            </button>
                          ))}
                        </div>
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <button 
                          onClick={() => { setEditingStudent({ ...s }); setIsEditStudentModalOpen(true); }} 
                          className="btn btn-primary" 
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ════════════ MODULE 2: TEACHER ATTENDANCE ════════════ */}
      {activeTab === "teacher" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Faculty &amp; Staff Attendance Roster</h3>
            <button onClick={() => alert("Exporting teacher punch logs...")} className="btn btn-secondary" style={{ padding: "0.45rem 0.9rem", fontSize: "0.78rem" }}>
              Export Punch Logs
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>FACULTY MEMBER</th>
                  <th>DEPARTMENT</th>
                  <th>CHECK-IN TIME</th>
                  <th>CHECK-OUT TIME</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(t => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{t.name}</td>
                    <td><span className="badge badge-info">{t.department}</span></td>
                    <td style={{ fontWeight: 700, fontFamily: "monospace" }}>{t.checkIn}</td>
                    <td style={{ fontWeight: 700, fontFamily: "monospace" }}>{t.checkOut}</td>
                    <td>
                      <span className={`badge ${t.status === "Present" ? "badge-success" : t.status === "Late Entry" ? "badge-warning" : "badge-danger"}`}>
                        {t.status === "Present" ? "P" : t.status === "Absent" ? "A" : t.status === "Late Entry" ? "LATE" : "HD"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button onClick={() => { setEditingTeacher({ ...t }); setIsTeacherPunchModalOpen(true); }} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}>
                        <Edit3 size={13} /> Edit Punch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ MODULE 3: LEAVE REQUESTS HUB ════════════ */}
      {activeTab === "leaves" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Leave Applications &amp; Approval Desk</h3>
            <button onClick={() => setIsLeaveModalOpen(true)} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Apply Leave Request
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>APPLICANT NAME</th>
                  <th>TARGET TYPE</th>
                  <th>CLASS / DEPT</th>
                  <th>LEAVE DATES</th>
                  <th>REASON FOR ABSENCE</th>
                  <th>PROCESS REQUEST</th>
                  <th style={{ textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{l.name}</td>
                    <td><span className="badge badge-info">{l.targetType}</span></td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{l.classOrDept}</td>
                    <td style={{ fontSize: "0.82rem" }}>{l.dates}</td>
                    <td style={{ fontSize: "0.82rem" }}>{l.reason}</td>
                    <td>
                      {l.status === "PENDING" ? (
                        <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                          <button onClick={() => handleProcessLeave(l.id, "APPROVED")} className="btn btn-primary" style={{ padding: "0.3rem 0.75rem", fontSize: "0.72rem", background: "#22c55e", border: "none" }}>Approve</button>
                          <button onClick={() => handleProcessLeave(l.id, "REJECTED")} className="btn btn-secondary" style={{ padding: "0.3rem 0.75rem", fontSize: "0.72rem", color: "#ef4444" }}>Reject</button>
                        </div>
                      ) : (
                        <span className={`badge ${l.status === "APPROVED" ? "badge-success" : "badge-danger"}`}>{l.status} ✅</span>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button onClick={() => setLeaves(leaves.filter(x => x.id !== l.id))} className="btn btn-secondary" style={{ padding: "0.35rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ MODULE 4: ATTENDANCE CALENDAR (P, A, L, HD BADGES) ════════════ */}
      {activeTab === "calendar" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Monthly Presence Calendar Grid</h3>
            <select value={selectedCalendarTarget} onChange={(e) => setSelectedCalendarTarget(e.target.value)} style={{ padding: "0.5rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontWeight: 700 }}>
              {students.map(s => <option key={s.id} value={s.name}>{s.name} ({s.classSection})</option>)}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.75rem" }}>
            {Array.from({ length: 31 }, (_, i) => {
              const dayNum = i + 1;
              const isAbsent = dayNum === 5 || dayNum === 18;
              const isLeave = dayNum === 12;
              const code = isAbsent ? "A" : isLeave ? "L" : "P";
              const color = isAbsent ? "#ef4444" : isLeave ? "#3b82f6" : "#22c55e";

              return (
                <div key={dayNum} style={{ background: "var(--bg-input)", padding: "0.85rem", borderRadius: 10, border: "1px solid var(--border-color)", textAlign: "center", display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "center" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700 }}>AUG {dayNum}</span>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.95rem", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                    {code}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ════════════ MODULE 5: ATTENDANCE REPORTS ════════════ */}
      {activeTab === "reports" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Attendance Master Reports Generator</h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => alert("Downloading Monthly Defaulters CSV...")} className="btn btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", gap: "0.3rem" }}>
                <Download size={14} /> Export CSV
              </button>
              <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", gap: "0.3rem" }}>
                <FileText size={14} /> Print PDF Ledger
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>STUDENT NAME</th>
                  <th>CLASS</th>
                  <th>TOTAL WORKING DAYS</th>
                  <th>PRESENT (P)</th>
                  <th>ABSENT (A)</th>
                  <th>LEAVE (L)</th>
                  <th>ATTENDANCE %</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{s.name}</td>
                    <td style={{ fontWeight: 700 }}>{s.classSection}</td>
                    <td style={{ fontWeight: 700 }}>24 Days</td>
                    <td style={{ fontWeight: 900, color: "#22c55e" }}>22 Days</td>
                    <td style={{ fontWeight: 900, color: "#ef4444" }}>1 Day</td>
                    <td style={{ fontWeight: 900, color: "#3b82f6" }}>1 Day</td>
                    <td style={{ fontWeight: 900, color: "var(--primary)" }}>95.8%</td>
                    <td><span className="badge badge-success">REGULAR ✅</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ MODULE 6: ANALYTICS CHARTS ════════════ */}
      {activeTab === "analytics" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1.25rem 0", color: "var(--text-heading)" }}>Class-Wise Presence Comparison</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { class: "Class 10-A", rate: 96.5 },
                { class: "Class 9-B", rate: 92.0 },
                { class: "Class 8-C", rate: 98.2 },
                { class: "Class 7-A", rate: 94.1 }
              ].map(c => (
                <div key={c.class} style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <strong style={{ color: "var(--text-heading)" }}>{c.class}</strong>
                    <strong style={{ color: "var(--primary)" }}>{c.rate}%</strong>
                  </div>
                  <div style={{ width: "100%", height: 10, background: "rgba(255,255,255,0.1)", borderRadius: 5, overflow: "hidden" }}>
                    <div style={{ width: `${c.rate}%`, height: "100%", background: "var(--primary)", borderRadius: 5 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1.25rem 0", color: "var(--text-heading)" }}>Defaulter Risk Analysis</h3>
            
            <div style={{ padding: "1.25rem", background: "rgba(239, 68, 68, 0.1)", borderRadius: 12, border: "1px solid rgba(239, 68, 68, 0.3)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#ef4444", fontWeight: 800 }}>
                <AlertTriangle size={20} /> Low Attendance Defaulter Warnings (&lt; 75%)
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>
                Currently <strong>0 students</strong> are below the mandatory 75% CBSE attendance threshold for Class 10 board exams.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ════════════ MODULE 7: ALERT DISPATCHER ════════════ */}
      {activeTab === "notifications" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1.25rem 0", color: "var(--text-heading)" }}>Automated Absence Alert Logs</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {alertLogs.map(alt => (
              <div key={alt.id} style={{ padding: "1rem", background: "var(--bg-input)", borderRadius: 10, border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ color: "var(--text-heading)" }}>{alt.target}</strong>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>{alt.text}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className="badge badge-success">{alt.status}</span>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{alt.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════ MODULE 8: ATTENDANCE SETTINGS ════════════ */}
      {activeTab === "settings" && (
        <div className="glass-card" style={{ padding: "1.75rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 1.25rem 0", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Settings size={20} color="var(--primary)" /> Attendance Rules &amp; Timing Configurations
          </h3>

          <form onSubmit={(e) => { e.preventDefault(); alert("Attendance settings updated!"); }} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SCHOOL START TIME</label>
                <input type="text" value={settingsForm.schoolStartTime} onChange={(e) => setSettingsForm({ ...settingsForm, schoolStartTime: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LATE ENTRY THRESHOLD</label>
                <input type="text" value={settingsForm.lateThreshold} onChange={(e) => setSettingsForm({ ...settingsForm, lateThreshold: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MINIMUM HOURS FOR HALF DAY</label>
              <input type="text" value={settingsForm.halfDayMinHours} onChange={(e) => setSettingsForm({ ...settingsForm, halfDayMinHours: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", cursor: "pointer" }}>
                <input type="checkbox" checked={settingsForm.autoSmsAbsent} onChange={(e) => setSettingsForm({ ...settingsForm, autoSmsAbsent: e.target.checked })} style={{ width: 16, height: 16, accentColor: "var(--primary)" }} />
                <span>Auto-dispatch SMS to parents at 08:30 AM when student marked <strong>A (Absent)</strong></span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", cursor: "pointer" }}>
                <input type="checkbox" checked={settingsForm.autoWhatsappLate} onChange={(e) => setSettingsForm({ ...settingsForm, autoWhatsappLate: e.target.checked })} style={{ width: 16, height: 16, accentColor: "var(--primary)" }} />
                <span>Auto-dispatch WhatsApp notification when student enters late</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: "0.7rem", justifyContent: "center", marginTop: "0.5rem" }}>
              Save Attendance Settings
            </button>
          </form>
        </div>
      )}

      {/* ════════════ EDIT STUDENT MODAL ════════════ */}
      {isEditStudentModalOpen && editingStudent && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Edit Student Attendance Details</h3>
              <button onClick={() => setIsEditStudentModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveEditStudent} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STUDENT NAME</label>
                <input type="text" value={editingStudent.name} onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ROLL NUMBER</label>
                  <input type="text" value={editingStudent.rollNo} onChange={(e) => setEditingStudent({ ...editingStudent, rollNo: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STATUS</label>
                  <select value={editingStudent.status} onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value as any })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Present">P (Present)</option>
                    <option value="Absent">A (Absent)</option>
                    <option value="Leave">L (Leave)</option>
                    <option value="Half Day">HD (Half Day)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsEditStudentModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Student Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ EDIT TEACHER PUNCH MODAL ════════════ */}
      {isTeacherPunchModalOpen && editingTeacher && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Edit Faculty Punch Entry</h3>
              <button onClick={() => setIsTeacherPunchModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveEditTeacher} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CHECK-IN TIME</label>
                  <input type="text" value={editingTeacher.checkIn} onChange={(e) => setEditingTeacher({ ...editingTeacher, checkIn: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CHECK-OUT TIME</label>
                  <input type="text" value={editingTeacher.checkOut} onChange={(e) => setEditingTeacher({ ...editingTeacher, checkOut: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsTeacherPunchModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Punch Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ APPLY LEAVE MODAL ════════════ */}
      {isLeaveModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Apply Leave Application</h3>
              <button onClick={() => setIsLeaveModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleApplyLeaveSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>APPLICANT NAME</label>
                <input type="text" value={leaveForm.name} onChange={(e) => setLeaveForm({ ...leaveForm, name: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LEAVE DATES</label>
                <input type="text" value={leaveForm.dates} onChange={(e) => setLeaveForm({ ...leaveForm, dates: e.target.value })} placeholder="12 Aug - 14 Aug" required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>REASON FOR ABSENCE</label>
                <textarea rows={2} value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsLeaveModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Submit Leave</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
