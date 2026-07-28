"use client";

import React, { useState } from "react";
import {
  BookOpen, Plus, X, Clock, Calendar, Users, GraduationCap,
  FileText, ClipboardList, Upload, CheckCircle2, Edit3, Trash2,
  Search, Filter, ChevronRight
} from "lucide-react";

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState<"classes" | "sections" | "subjects" | "timetable" | "homework" | "assignments">("classes");

  // ── Classes ──
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [classes, setClasses] = useState([
    { id: "CLS-01", name: "Class 1", sections: 3, totalStudents: 105, classTeacher: "Mrs. Meena Kumari", status: "Active" },
    { id: "CLS-02", name: "Class 2", sections: 3, totalStudents: 112, classTeacher: "Mrs. Kavita Verma", status: "Active" },
    { id: "CLS-03", name: "Class 3", sections: 3, totalStudents: 98, classTeacher: "Mr. Ramesh Gupta", status: "Active" },
    { id: "CLS-04", name: "Class 4", sections: 2, totalStudents: 78, classTeacher: "Mrs. Sunita Rao", status: "Active" },
    { id: "CLS-05", name: "Class 5", sections: 3, totalStudents: 110, classTeacher: "Mr. Anil Sharma", status: "Active" },
    { id: "CLS-06", name: "Class 6", sections: 3, totalStudents: 126, classTeacher: "Mrs. Priya Joshi", status: "Active" },
    { id: "CLS-07", name: "Class 7", sections: 3, totalStudents: 118, classTeacher: "Mr. Dinesh Yadav", status: "Active" },
    { id: "CLS-08", name: "Class 8", sections: 3, totalStudents: 124, classTeacher: "Dr. Vikram Malhotra", status: "Active" },
    { id: "CLS-09", name: "Class 9", sections: 2, totalStudents: 82, classTeacher: "Mrs. Ananya Deshmukh", status: "Active" },
    { id: "CLS-10", name: "Class 10", sections: 2, totalStudents: 78, classTeacher: "Mrs. Sunita Rao", status: "Active" },
    { id: "CLS-11", name: "Class 11 (Science)", sections: 2, totalStudents: 72, classTeacher: "Dr. Vikram Malhotra", status: "Active" },
    { id: "CLS-12", name: "Class 12 (Science)", sections: 2, totalStudents: 68, classTeacher: "Dr. Vikram Malhotra", status: "Active" },
  ]);

  // ── Sections ──
  const [sections] = useState([
    { id: "SEC-01", class: "Class 10", section: "A", students: 38, classTeacher: "Mrs. Sunita Rao", room: "Room 301" },
    { id: "SEC-02", class: "Class 10", section: "B", students: 40, classTeacher: "Mr. Ravi Kumar", room: "Room 302" },
    { id: "SEC-03", class: "Class 9", section: "A", students: 42, classTeacher: "Mrs. Ananya Deshmukh", room: "Room 201" },
    { id: "SEC-04", class: "Class 9", section: "B", students: 40, classTeacher: "Mr. Suresh Patel", room: "Room 202" },
    { id: "SEC-05", class: "Class 8", section: "A", students: 42, classTeacher: "Mr. Arun Mehta", room: "Room 101" },
    { id: "SEC-06", class: "Class 8", section: "B", students: 40, classTeacher: "Mrs. Pooja Singh", room: "Room 102" },
    { id: "SEC-07", class: "Class 8", section: "C", students: 42, classTeacher: "Dr. Vikram Malhotra", room: "Room 103" },
  ]);

  // ── Subjects ──
  const [subjects] = useState([
    { id: "SUB-01", name: "Mathematics", code: "MATH-101", department: "Mathematics", teacher: "Sunita Rao", periodsPerWeek: 6, classes: "1-12", type: "Core" },
    { id: "SUB-02", name: "Physics", code: "PHY-201", department: "Science", teacher: "Dr. Vikram Malhotra", periodsPerWeek: 5, classes: "9-12", type: "Core" },
    { id: "SUB-03", name: "Chemistry", code: "CHEM-201", department: "Science", teacher: "Dr. Vikram Malhotra", periodsPerWeek: 5, classes: "9-12", type: "Core" },
    { id: "SUB-04", name: "Biology", code: "BIO-201", department: "Science", teacher: "Mrs. Neha Kapoor", periodsPerWeek: 5, classes: "9-12", type: "Core" },
    { id: "SUB-05", name: "English Literature", code: "ENG-101", department: "Humanities", teacher: "Ananya Deshmukh", periodsPerWeek: 5, classes: "1-12", type: "Core" },
    { id: "SUB-06", name: "Hindi", code: "HIN-101", department: "Languages", teacher: "Mr. Ramesh Gupta", periodsPerWeek: 4, classes: "1-10", type: "Core" },
    { id: "SUB-07", name: "History & Civics", code: "HIST-101", department: "Humanities", teacher: "Ananya Deshmukh", periodsPerWeek: 4, classes: "6-12", type: "Core" },
    { id: "SUB-08", name: "Computer Science", code: "CS-301", department: "IT & CS", teacher: "Rajesh Kumar", periodsPerWeek: 4, classes: "6-12", type: "Elective" },
    { id: "SUB-09", name: "Physical Education", code: "PE-101", department: "Physical Ed", teacher: "Capt. Ranbir Singh", periodsPerWeek: 3, classes: "1-12", type: "Core" },
    { id: "SUB-10", name: "Art & Craft", code: "ART-101", department: "Fine Arts", teacher: "Meenakshi Sundaram", periodsPerWeek: 2, classes: "1-8", type: "Elective" },
  ]);

  // ── Timetable ──
  const timetable = [
    { period: "1st (08:00–08:45)", monday: "Mathematics", tuesday: "Physics", wednesday: "English", thursday: "Chemistry", friday: "Mathematics", saturday: "Hindi" },
    { period: "2nd (08:45–09:30)", monday: "English", tuesday: "Mathematics", wednesday: "Physics", thursday: "Mathematics", friday: "History", saturday: "Computer Sci" },
    { period: "3rd (09:30–10:15)", monday: "Physics", tuesday: "Chemistry", wednesday: "Mathematics", thursday: "English", friday: "Computer Sci", saturday: "Physical Ed" },
    { period: "BREAK (10:15–10:45)", monday: "—", tuesday: "—", wednesday: "—", thursday: "—", friday: "—", saturday: "—" },
    { period: "4th (10:45–11:30)", monday: "History", tuesday: "English", wednesday: "Chemistry", thursday: "Physical Ed", friday: "Physics", saturday: "Art & Craft" },
    { period: "5th (11:30–12:15)", monday: "Computer Sci", tuesday: "Physical Ed", wednesday: "History", thursday: "Physics", friday: "Chemistry", saturday: "—" },
    { period: "6th (12:15–01:00)", monday: "Chemistry", tuesday: "Hindi", wednesday: "Computer Sci", thursday: "Art & Craft", friday: "English", saturday: "—" },
    { period: "LUNCH (01:00–01:45)", monday: "—", tuesday: "—", wednesday: "—", thursday: "—", friday: "—", saturday: "—" },
    { period: "7th (01:45–02:30)", monday: "Hindi", tuesday: "History", wednesday: "Hindi", thursday: "Hindi", friday: "Hindi", saturday: "—" },
  ];

  // ── Homework ──
  const [isCreateHWOpen, setIsCreateHWOpen] = useState(false);
  const [homeworks, setHomeworks] = useState([
    { id: "HW-001", title: "Physics Lab Experiment #4 — Reflection & Refraction", subject: "Physics", class: "Class 10-A", teacher: "Dr. Vikram Malhotra", assignedDate: "28 Jul 2026", dueDate: "31 Jul 2026", submissions: 32, totalStudents: 38, status: "Active" },
    { id: "HW-002", title: "Essay Writing — India's Freedom Movement (1200 Words)", subject: "History", class: "Class 9-B", teacher: "Ananya Deshmukh", assignedDate: "27 Jul 2026", dueDate: "30 Jul 2026", submissions: 28, totalStudents: 35, status: "Active" },
    { id: "HW-003", title: "Quadratic Equations — Exercise 4.3 (NCERT Textbook)", subject: "Mathematics", class: "Class 10-A", teacher: "Sunita Rao", assignedDate: "26 Jul 2026", dueDate: "28 Jul 2026", submissions: 38, totalStudents: 38, status: "Completed" },
    { id: "HW-004", title: "Python Programming — Build a Simple Calculator App", subject: "Computer Science", class: "Class 8-C", teacher: "Rajesh Kumar", assignedDate: "25 Jul 2026", dueDate: "29 Jul 2026", submissions: 18, totalStudents: 42, status: "Active" },
  ]);
  const [newHW, setNewHW] = useState({ title: "", subject: "Physics", class: "Class 10-A", dueDate: "" });
  const handleCreateHW = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHW.title) return;
    setHomeworks([{ id: `HW-${String(homeworks.length + 1).padStart(3, "0")}`, title: newHW.title, subject: newHW.subject, class: newHW.class, teacher: "You (Admin)", assignedDate: "29 Jul 2026", dueDate: newHW.dueDate || "02 Aug 2026", submissions: 0, totalStudents: 38, status: "Active" }, ...homeworks]);
    setIsCreateHWOpen(false);
    setNewHW({ title: "", subject: "Physics", class: "Class 10-A", dueDate: "" });
  };

  // ── Assignments ──
  const [isCreateASGNOpen, setIsCreateASGNOpen] = useState(false);
  const assignments = [
    { id: "ASGN-001", title: "Science Project — Solar System Model", subject: "Science", class: "Class 8-C", teacher: "Dr. Vikram Malhotra", dueDate: "05 Aug 2026", submissions: 35, total: 42, type: "Project" },
    { id: "ASGN-002", title: "English Essay — My Dream India (2000 Words)", subject: "English", class: "Class 10-A", teacher: "Ananya Deshmukh", dueDate: "02 Aug 2026", submissions: 28, total: 38, type: "Writing" },
    { id: "ASGN-003", title: "Mathematics — Trigonometry Worksheet #6", subject: "Mathematics", class: "Class 10-A", teacher: "Sunita Rao", dueDate: "01 Aug 2026", submissions: 38, total: 38, type: "Worksheet" },
    { id: "ASGN-004", title: "Python — Build a Weather App (Mini Project)", subject: "Computer Science", class: "Class 9-A", teacher: "Rajesh Kumar", dueDate: "08 Aug 2026", submissions: 12, total: 40, type: "Coding" },
  ];

  // ── Filter state ──
  const [classFilter, setClassFilter] = useState("All");
  const [sectionClassFilter, setSectionClassFilter] = useState("All");

  const inputStyle: React.CSSProperties = { width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" };
  const labelStyle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* PAGE HEADER */}
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
        border: "1px solid var(--border-glow)", borderRadius: "var(--radius-lg)", padding: "1.5rem 1.75rem",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Academics & Curriculum Engine <BookOpen size={24} color="#3b82f6" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Manage classes, sections, subjects, weekly timetables, homework, and project assignments.
          </p>
        </div>
      </div>

      {/* 6 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {[
          { id: "classes", label: "Classes", icon: GraduationCap },
          { id: "sections", label: "Sections", icon: Users },
          { id: "subjects", label: "Subjects", icon: BookOpen },
          { id: "timetable", label: "Timetable", icon: Clock },
          { id: "homework", label: "Homework", icon: FileText },
          { id: "assignments", label: "Assignments", icon: ClipboardList },
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
          TAB 1: CLASSES
      ═══════════════════════════════════════════════════ */}
      {activeTab === "classes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Total <strong>{classes.length}</strong> Classes Configured</span>
            <button onClick={() => setIsAddClassOpen(true)} className="btn btn-primary" style={{ padding: "0.6rem 1rem" }}>
              <Plus size={16} /> Add New Class
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {classes.map((cls) => (
              <div key={cls.id} className="glass-card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>{cls.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600 }}>{cls.id}</div>
                  </div>
                  <span className="badge badge-success">{cls.status}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.78rem" }}>
                  <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                    <div style={{ color: "var(--text-muted)" }}>Sections</div>
                    <div style={{ fontWeight: 800, color: "#fff" }}>{cls.sections} Sections</div>
                  </div>
                  <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                    <div style={{ color: "var(--text-muted)" }}>Students</div>
                    <div style={{ fontWeight: 800, color: "var(--primary)" }}>{cls.totalStudents}</div>
                  </div>
                </div>

                <div style={{ marginTop: "0.75rem", paddingTop: "0.6rem", borderTop: "1px solid var(--border-color)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Class Teacher: <strong style={{ color: "#fff" }}>{cls.classTeacher}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Add Class Modal */}
          {isAddClassOpen && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
              <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 460, borderRadius: "var(--radius-lg)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Add New Class</h3>
                  <button onClick={() => setIsAddClassOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div><label style={labelStyle}>CLASS NAME</label><input type="text" placeholder="e.g. Class 11 (Commerce)" style={inputStyle} /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div><label style={labelStyle}>NUMBER OF SECTIONS</label><input type="number" defaultValue={3} style={inputStyle} /></div>
                    <div><label style={labelStyle}>CLASS TEACHER</label><input type="text" placeholder="e.g. Mrs. Sunita Rao" style={inputStyle} /></div>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                    <button onClick={() => setIsAddClassOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                    <button onClick={() => setIsAddClassOpen(false)} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Create Class</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB 2: SECTIONS
      ═══════════════════════════════════════════════════ */}
      {activeTab === "sections" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Filter size={16} color="var(--text-muted)" />
              <select value={sectionClassFilter} onChange={(e) => setSectionClassFilter(e.target.value)}
                style={{ padding: "0.6rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}>
                <option value="All" style={{ background: "#0b0f19" }}>All Classes</option>
                {["Class 8", "Class 9", "Class 10"].map(c => <option key={c} value={c} style={{ background: "#0b0f19" }}>{c}</option>)}
              </select>
            </div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>{sections.filter(s => sectionClassFilter === "All" || s.class === sectionClassFilter).length} Sections</span>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>Section ID</th><th>Class</th><th>Section</th><th>Students</th><th>Class Teacher</th><th>Room No</th></tr>
                </thead>
                <tbody>
                  {sections.filter(s => sectionClassFilter === "All" || s.class === sectionClassFilter).map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 600, color: "var(--primary)" }}>{s.id}</td>
                      <td style={{ fontWeight: 700, color: "#fff" }}>{s.class}</td>
                      <td><span className="badge badge-info">Section {s.section}</span></td>
                      <td style={{ fontWeight: 800 }}>{s.students} Students</td>
                      <td style={{ fontWeight: 600 }}>{s.classTeacher}</td>
                      <td style={{ color: "var(--text-muted)" }}>{s.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB 3: SUBJECTS
      ═══════════════════════════════════════════════════ */}
      {activeTab === "subjects" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>CBSE Subject Master Register ({subjects.length} Subjects)</h3>
            <button className="btn btn-primary" style={{ padding: "0.6rem 1rem" }}><Plus size={16} /> Add Subject</button>
          </div>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>Subject Name</th><th>Code</th><th>Department</th><th>Faculty Assigned</th><th>Periods / Week</th><th>Classes</th><th>Type</th></tr>
              </thead>
              <tbody>
                {subjects.map((s) => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{s.name}</td>
                    <td style={{ fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{s.code}</td>
                    <td style={{ color: "var(--text-muted)" }}>{s.department}</td>
                    <td style={{ fontWeight: 600 }}>{s.teacher}</td>
                    <td style={{ fontWeight: 800, color: "#38bdf8" }}>{s.periodsPerWeek}</td>
                    <td style={{ color: "var(--text-muted)" }}>{s.classes}</td>
                    <td><span className={`badge ${s.type === "Core" ? "badge-success" : "badge-info"}`}>{s.type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB 4: TIMETABLE
      ═══════════════════════════════════════════════════ */}
      {activeTab === "timetable" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Filter size={16} color="var(--text-muted)" />
              <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
                style={{ padding: "0.6rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}>
                {["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B", "Class 8-C"].map(c => <option key={c} value={c} style={{ background: "#0b0f19" }}>{c}</option>)}
              </select>
            </div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Academic Session 2026-27 • 6-Day Week</span>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Weekly Timetable — {classFilter === "All" ? "Class 10-A" : classFilter}</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr><th>Period</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr>
                </thead>
                <tbody>
                  {timetable.map((row, idx) => {
                    const isBreak = row.period.includes("BREAK") || row.period.includes("LUNCH");
                    return (
                      <tr key={idx} style={{ background: isBreak ? "rgba(245,158,11,0.06)" : undefined }}>
                        <td style={{ fontWeight: 700, color: isBreak ? "#f59e0b" : "#fff", fontSize: "0.78rem", whiteSpace: "nowrap" }}>{row.period}</td>
                        <td style={{ color: row.monday === "—" ? "var(--text-muted)" : "var(--text-main)" }}>{row.monday}</td>
                        <td style={{ color: row.tuesday === "—" ? "var(--text-muted)" : "var(--text-main)" }}>{row.tuesday}</td>
                        <td style={{ color: row.wednesday === "—" ? "var(--text-muted)" : "var(--text-main)" }}>{row.wednesday}</td>
                        <td style={{ color: row.thursday === "—" ? "var(--text-muted)" : "var(--text-main)" }}>{row.thursday}</td>
                        <td style={{ color: row.friday === "—" ? "var(--text-muted)" : "var(--text-main)" }}>{row.friday}</td>
                        <td style={{ color: row.saturday === "—" ? "var(--text-muted)" : "var(--text-main)" }}>{row.saturday}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB 5: HOMEWORK
      ═══════════════════════════════════════════════════ */}
      {activeTab === "homework" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Stats Strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Total Assigned", value: homeworks.length, color: "#6366f1" },
              { label: "Active (Pending)", value: homeworks.filter(h => h.status === "Active").length, color: "#f59e0b" },
              { label: "Completed", value: homeworks.filter(h => h.status === "Completed").length, color: "#10b981" },
              { label: "Avg Submission Rate", value: "87%", color: "#38bdf8" }
            ].map((st, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 900, color: st.color }}>{st.value}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, marginTop: 2 }}>{st.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setIsCreateHWOpen(true)} className="btn btn-primary" style={{ padding: "0.6rem 1rem" }}>
              <Plus size={16} /> Create Homework
            </button>
          </div>

          {/* Homework Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
            {homeworks.map((hw) => (
              <div key={hw.id} className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{hw.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600, marginTop: 2 }}>{hw.subject} • {hw.class} • By {hw.teacher}</div>
                  </div>
                  <span className={`badge ${hw.status === "Active" ? "badge-warning" : "badge-success"}`}>{hw.status}</span>
                </div>
                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <div><Calendar size={13} style={{ verticalAlign: "middle", marginRight: 4 }} />Assigned: {hw.assignedDate}</div>
                  <div><Clock size={13} style={{ verticalAlign: "middle", marginRight: 4 }} />Due: <strong style={{ color: "#f59e0b" }}>{hw.dueDate}</strong></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
                  <div><span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Submissions:</span> <strong style={{ color: "#fff" }}>{hw.submissions}/{hw.totalStudents}</strong></div>
                  <div style={{ width: 120, height: 8, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{ width: `${Math.round(hw.submissions / hw.totalStudents * 100)}%`, height: "100%", borderRadius: 99, background: hw.submissions === hw.totalStudents ? "var(--success)" : "var(--primary)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create HW Modal */}
          {isCreateHWOpen && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
              <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 520, borderRadius: "var(--radius-lg)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Create New Homework</h3>
                  <button onClick={() => setIsCreateHWOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
                </div>
                <form onSubmit={handleCreateHW} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div><label style={labelStyle}>HOMEWORK TITLE</label><input type="text" value={newHW.title} onChange={(e) => setNewHW({ ...newHW, title: e.target.value })} placeholder="e.g. NCERT Ex 4.3" required style={inputStyle} /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div><label style={labelStyle}>SUBJECT</label>
                      <select value={newHW.subject} onChange={(e) => setNewHW({ ...newHW, subject: e.target.value })} style={inputStyle}>
                        {["Physics", "Chemistry", "Mathematics", "English", "History", "Computer Science"].map(s => <option key={s} value={s} style={{ background: "#0b0f19" }}>{s}</option>)}
                      </select></div>
                    <div><label style={labelStyle}>CLASS</label>
                      <select value={newHW.class} onChange={(e) => setNewHW({ ...newHW, class: e.target.value })} style={inputStyle}>
                        {["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B", "Class 8-C"].map(c => <option key={c} value={c} style={{ background: "#0b0f19" }}>{c}</option>)}
                      </select></div>
                  </div>
                  <div><label style={labelStyle}>DUE DATE</label><input type="date" value={newHW.dueDate} onChange={(e) => setNewHW({ ...newHW, dueDate: e.target.value })} style={inputStyle} /></div>
                  <div style={{ border: "2px dashed var(--border-color)", padding: "1.25rem", borderRadius: "var(--radius-md)", textAlign: "center", color: "var(--text-muted)" }}>
                    <Upload size={28} style={{ margin: "0 auto 0.4rem auto", color: "var(--primary)" }} /><div style={{ fontSize: "0.82rem" }}>Drag & drop PDF / Image attachments here</div>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                    <button type="button" onClick={() => setIsCreateHWOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Assign Homework</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          TAB 6: ASSIGNMENTS
      ═══════════════════════════════════════════════════ */}
      {activeTab === "assignments" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setIsCreateASGNOpen(true)} className="btn btn-primary" style={{ padding: "0.6rem 1rem" }}>
              <Plus size={16} /> Create Assignment
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
            {assignments.map((a) => (
              <div key={a.id} className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{a.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600, marginTop: 2 }}>{a.subject} • {a.class} • By {a.teacher}</div>
                  </div>
                  <span className="badge badge-info">{a.type}</span>
                </div>
                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <div><Calendar size={13} style={{ verticalAlign: "middle", marginRight: 4 }} />Due: <strong style={{ color: "#f59e0b" }}>{a.dueDate}</strong></div>
                  <div><CheckCircle2 size={13} style={{ verticalAlign: "middle", marginRight: 4 }} />{a.submissions}/{a.total} Submitted</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
                  <div style={{ width: 180, height: 8, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{ width: `${Math.round(a.submissions / a.total * 100)}%`, height: "100%", borderRadius: 99, background: a.submissions === a.total ? "var(--success)" : "var(--primary)" }} />
                  </div>
                  <span style={{ fontWeight: 800, color: "#fff", fontSize: "0.85rem" }}>{Math.round(a.submissions / a.total * 100)}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Create ASGN Modal */}
          {isCreateASGNOpen && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
              <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Create New Assignment</h3>
                  <button onClick={() => setIsCreateASGNOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <input type="text" placeholder="Assignment Title" style={inputStyle} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <select style={inputStyle}>
                      {["Project", "Worksheet", "Coding", "Writing"].map(t => <option key={t} style={{ background: "#0b0f19" }}>{t}</option>)}
                    </select>
                    <input type="date" style={inputStyle} />
                  </div>
                  <div style={{ border: "2px dashed var(--border-color)", padding: "1.25rem", borderRadius: "var(--radius-md)", textAlign: "center", color: "var(--text-muted)" }}>
                    <Upload size={28} style={{ margin: "0 auto 0.4rem auto", color: "var(--primary)" }} /><div style={{ fontSize: "0.82rem" }}>Upload reference files</div>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button onClick={() => setIsCreateASGNOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                    <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Publish Assignment</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
