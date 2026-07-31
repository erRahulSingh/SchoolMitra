"use client";

import React, { useState } from "react";
import {
  BookOpen, Plus, X, Clock, Calendar, Users, GraduationCap,
  FileText, ClipboardList, Upload, CheckCircle2, Edit3, Trash2,
  Search, Filter, ChevronRight, AlertTriangle, PlayCircle, Layers, CheckSquare, Settings
} from "lucide-react";

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState<"sessions" | "classes" | "subjects" | "timetable" | "homework" | "assignments" | "materials" | "lesson_plans" | "syllabus" | "calendar">("sessions");

  // ── Session Management (Module 1) ──
  const [sessions, setSessions] = useState([
    { id: "SESS-01", year: "2026 - 2027", terms: ["Term 1 (April - Sept)", "Term 2 (Oct - March)"], status: "Active" },
    { id: "SESS-02", year: "2025 - 2026", terms: ["Term 1", "Term 2"], status: "Completed" }
  ]);
  const [activeSession, setActiveSession] = useState("2026 - 2027");

  // ── Classes (Module 2) ──
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [classes, setClasses] = useState([
    { id: "CLS-01", name: "Class 10", sections: 2, totalStudents: 78, classTeacher: "Mrs. Sunita Rao", capacity: 80 },
    { id: "CLS-02", name: "Class 9", sections: 2, totalStudents: 82, classTeacher: "Mrs. Ananya Deshmukh", capacity: 90 },
    { id: "CLS-03", name: "Class 8", sections: 3, totalStudents: 124, classTeacher: "Dr. Vikram Malhotra", capacity: 130 }
  ]);
  const [newClass, setNewClass] = useState({ name: "", sections: 2, classTeacher: "Mrs. Sunita Rao", capacity: 40 });

  // ── Subjects (Module 3) ──
  const [subjects, setSubjects] = useState([
    { id: "SUB-01", name: "Mathematics", code: "MATH-101", type: "Theory", class: "Class 10", teacher: "Sunita Rao" },
    { id: "SUB-02", name: "Physics Practicals", code: "PHY-LAB-1", type: "Practical", class: "Class 10", teacher: "Dr. Vikram Malhotra" },
    { id: "SUB-03", name: "English Lit", code: "ENG-101", type: "Theory", class: "Class 9", teacher: "Ananya Deshmukh" }
  ]);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", code: "", type: "Theory", class: "Class 10", teacher: "Sunita Rao" });

  // ── Timetable (Module 4) ──
  const [timetable, setTimetable] = useState([
    { period: "1st (08:00–08:45)", monday: "Mathematics", tuesday: "Physics", wednesday: "English", thursday: "Chemistry", friday: "Mathematics", room: "Room 301", conflict: false },
    { period: "2nd (08:45–09:30)", monday: "Physics", tuesday: "Mathematics", wednesday: "Physics", thursday: "Mathematics", friday: "History", room: "Room 302", conflict: true }, // Teacher overlapping mapping trigger
    { period: "3rd (09:30–10:15)", monday: "English", tuesday: "Chemistry", wednesday: "Mathematics", thursday: "English", friday: "Computer Sci", room: "Room 301", conflict: false }
  ]);
  const [classroomAssignment, setClassroomAssignment] = useState("Room 301");

  // ── Homework (Module 5) ──
  const [isCreateHWOpen, setIsCreateHWOpen] = useState(false);
  const [homeworks, setHomeworks] = useState([
    { id: "HW-001", title: "Physics Lab Experiment #4 — Reflection & Refraction", subject: "Physics", class: "Class 10-A", dueDate: "31 Jul 2026", submissions: 32, total: 38, status: "Active" },
    { id: "HW-002", title: "Quadratic Equations — Exercise 4.3 (NCERT Textbook)", subject: "Mathematics", class: "Class 10-A", dueDate: "28 Jul 2026", submissions: 38, total: 38, status: "Completed" }
  ]);
  const [newHW, setNewHW] = useState({ title: "", subject: "Physics", class: "Class 10-A", dueDate: "", attachName: "" });

  // ── Assignments (Module 6) ──
  const [assignments, setAssignments] = useState([
    { id: "ASGN-001", title: "Science Project — Solar System Model", subject: "Science", class: "Class 8-C", dueDate: "05 Aug 2026", submissions: 35, total: 42 },
    { id: "ASGN-002", title: "English Essay — My Dream India (2000 Words)", subject: "English", class: "Class 10-A", dueDate: "02 Aug 2026", submissions: 28, total: 38 }
  ]);

  // ── Study Materials (Module 7) ──
  const [materials, setMaterials] = useState([
    { id: "MAT-01", title: "Trigonometry Basics PDF notes", type: "PDF Notes", class: "Class 10", subject: "Mathematics", date: "24 July 2026" },
    { id: "MAT-02", title: "Optics Animation Video Lecture", type: "Video Link", class: "Class 10", subject: "Physics", date: "25 July 2026" }
  ]);

  // ── Lesson Plans & Syllabus Tracker (Modules 8 & 9) ──
  const [lessons, setLessons] = useState([
    { id: "L-01", chapter: "Chapter 1: Real Numbers", topic: "Euclid's Division Lemma & Fundamental Theorem of Arithmetic", objectives: "Understand divisibility algorithms", status: "Completed" },
    { id: "L-02", chapter: "Chapter 2: Polynomials", topic: "Geometrical meaning of zeroes & Relationship between coefficients", objectives: "Calculate polynomial intersections", status: "Completed" },
    { id: "L-03", chapter: "Chapter 3: Quadratic Equations", topic: "Roots calculation using quadratic formula & Discriminant logic", objectives: "Identify real and imaginary roots", status: "Pending" }
  ]);

  // Syllabus progress variables
  const syllabusProgress = {
    "Mathematics": 75,
    "Physics": 60,
    "Chemistry": 50,
    "English Lit": 85
  };

  // ── Academic Calendar (Module 10) ──
  const [events, setEvents] = useState([
    { title: "CBSE Mid-Term Exams Prep", date: "15 Sept 2026", type: "Exams" },
    { title: "Independence Day Holiday", date: "15 Aug 2026", type: "Holidays" },
    { title: "Parent-Teacher Assembly Meet", date: "05 Sept 2026", type: "Events" }
  ]);

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name) return;
    setClasses([...classes, {
      id: `CLS-${String(classes.length + 1).padStart(2, "0")}`,
      name: newClass.name,
      sections: Number(newClass.sections),
      totalStudents: 0,
      classTeacher: newClass.classTeacher,
      capacity: Number(newClass.capacity)
    }]);
    setIsAddClassOpen(false);
    setNewClass({ name: "", sections: 2, classTeacher: "Mrs. Sunita Rao", capacity: 40 });
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.name || !newSubject.code) return;
    setSubjects([...subjects, {
      id: `SUB-${String(subjects.length + 1).padStart(2, "0")}`,
      name: newSubject.name,
      code: newSubject.code,
      type: newSubject.type,
      class: newSubject.class,
      teacher: newSubject.teacher
    }]);
    setIsAddSubjectOpen(false);
    setNewSubject({ name: "", code: "", type: "Theory", class: "Class 10", teacher: "Sunita Rao" });
  };

  const handleCreateHWSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHW.title) return;
    setHomeworks([{
      id: `HW-${String(homeworks.length + 1).padStart(3, "0")}`,
      title: newHW.title,
      subject: newHW.subject,
      class: newHW.class,
      dueDate: newHW.dueDate || "05 Aug 2026",
      submissions: 0,
      total: 38,
      status: "Active"
    }, ...homeworks]);
    setIsCreateHWOpen(false);
    setNewHW({ title: "", subject: "Physics", class: "Class 10-A", dueDate: "", attachName: "" });
    alert("Homework successfully assigned! Push alerts dispatched to all mapped Parent apps.");
  };

  const toggleLessonStatus = (id: string) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, status: l.status === "Completed" ? "Pending" : "Completed" } : l));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Academics Module Hub <BookOpen size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Manage curriculum sessions, core classes, subject maps, lecture timetables, and assign homework or study resources.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "classes") setIsAddClassOpen(true);
            else if (activeTab === "subjects") setIsAddSubjectOpen(true);
            else setIsCreateHWOpen(true);
          }}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <Plus size={18} />
          <span>Quick Add Item</span>
        </button>
      </div>

      {/* ════════════ 10 MODULES TAB SWITCHER ════════════ */}
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
          { id: "sessions", label: "Academic Sessions", icon: Calendar },
          { id: "classes", label: "Class Registry", icon: GraduationCap },
          { id: "subjects", label: "Subject Manager", icon: Layers },
          { id: "timetable", label: "Schedule Timetable", icon: Clock },
          { id: "homework", label: "Homework Center", icon: FileText },
          { id: "assignments", label: "Assignments Console", icon: ClipboardList },
          { id: "materials", label: "Study Materials", icon: Upload },
          { id: "lesson_plans", label: "Lesson Roadmap", icon: CheckSquare },
          { id: "syllabus", label: "Syllabus Progress", icon: PlayCircle },
          { id: "calendar", label: "Academics Calendar", icon: Calendar }
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

      {/* MODULE 1: ACADEMIC SESSIONS */}
      {activeTab === "sessions" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "1.5rem" }}>
          
          {/* Configure active session */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Academic Term Configurations</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>ACTIVE SYSTEM SESSION YEAR</label>
                <select 
                  value={activeSession} 
                  onChange={(e) => setActiveSession(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                >
                  <option value="2026 - 2027" style={{ background: "#0b0f19" }}>2026 - 2027 Session</option>
                  <option value="2025 - 2026" style={{ background: "#0b0f19" }}>2025 - 2026 Session</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CURRENT ACTIVE TERM</label>
                <select 
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                >
                  <option value="term1" style={{ background: "#0b0f19" }}>First Term (April - September)</option>
                  <option value="term2" style={{ background: "#0b0f19" }}>Second Term (October - March)</option>
                </select>
              </div>

              <button onClick={() => alert("Session configurations saved!")} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center" }}>
                Apply Session Rollover Rules
              </button>
            </div>
          </div>

          {/* Session logs */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>Academic Session Audit Log</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {sessions.map((sess) => (
                <div key={sess.id} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8, display: "flex", justify: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#fff" }}>Session {sess.year}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>Terms: {sess.terms.join(" & ")}</div>
                  </div>
                  <span className={`badge ${sess.status === "Active" ? "badge-success" : "badge-secondary"}`}>
                    {sess.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODULE 2: CLASS MANAGEMENT */}
      {activeTab === "classes" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Grade &amp; Class Enrolments</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Sections count</th>
                <th>Capacity Limit</th>
                <th>Class Teacher</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{cls.name}</td>
                  <td><span className="badge badge-info">{cls.sections} Sections</span></td>
                  <td><strong>{cls.totalStudents}</strong> / {cls.capacity} Students</td>
                  <td style={{ fontWeight: 650, color: "var(--primary)" }}>{cls.classTeacher}</td>
                  <td><span className="badge badge-success">ACTIVE</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => setClasses(classes.filter(c => c.id !== cls.id))}
                      style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "0.35rem 0.5rem", borderRadius: "var(--radius-sm)", cursor: "pointer" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 3: SUBJECT MANAGEMENT */}
      {activeTab === "subjects" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Core &amp; Elective Subjects</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Class Mapping</th>
                <th>Type</th>
                <th>Assigned Teacher</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub) => (
                <tr key={sub.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{sub.name}</td>
                  <td style={{ fontWeight: 650, color: "var(--secondary)" }}>{sub.code}</td>
                  <td>{sub.class}</td>
                  <td>
                    <span className={`badge ${sub.type === "Theory" ? "badge-info" : "badge-warning"}`}>
                      {sub.type}
                    </span>
                  </td>
                  <td>{sub.teacher}</td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => setSubjects(subjects.filter(s => s.id !== sub.id))}
                      style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "0.35rem 0.5rem", borderRadius: "var(--radius-sm)", cursor: "pointer" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 4: TIMETABLE MANAGEMENT */}
      {activeTab === "timetable" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Weekly Lectures timetable Schedule</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Automated scheduler with conflict detector.</p>
            </div>
            
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <select 
                value={classroomAssignment}
                onChange={(e) => setClassroomAssignment(e.target.value)}
                style={{ padding: "0.5rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
              >
                <option value="Room 301" style={{ background: "#0b0f19" }}>Lecture Room 301</option>
                <option value="Room 302" style={{ background: "#0b0f19" }}>Lecture Room 302</option>
              </select>
            </div>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Period / Hour</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Assigned Room</th>
                <th style={{ textAlign: "right" }}>Conflicts</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((slot, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700 }}>{slot.period}</td>
                  <td>{slot.monday}</td>
                  <td>{slot.tuesday}</td>
                  <td>{slot.wednesday}</td>
                  <td>{slot.thursday}</td>
                  <td>{slot.friday}</td>
                  <td><span className="badge badge-info">{slot.room || classroomAssignment}</span></td>
                  <td style={{ textAlign: "right" }}>
                    {slot.conflict ? (
                      <span className="badge badge-danger" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                        <AlertTriangle size={12} /> TEACHER OVERLAP
                      </span>
                    ) : (
                      <span className="badge badge-success">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 5: HOMEWORK CENTER */}
      {activeTab === "homework" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Assigned Daily Homework logs</h3>
            <button onClick={() => setIsCreateHWOpen(true)} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>Create Homework Entry</button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Homework Topic / Details</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Due Date</th>
                <th>Submissions Mapped</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {homeworks.map((hw) => (
                <tr key={hw.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{hw.title}</td>
                  <td>{hw.class}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{hw.subject}</td>
                  <td style={{ fontWeight: 650 }}>{hw.dueDate}</td>
                  <td><strong>{hw.submissions}</strong> / {hw.total} Submits</td>
                  <td>
                    <span className={`badge ${hw.status === "Active" ? "badge-success" : "badge-secondary"}`}>
                      {hw.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 6: ASSIGNMENT CONSOLE */}
      {activeTab === "assignments" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Assignments &amp; Term Worksheets</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Assignment Project Name</th>
                <th>Subject</th>
                <th>Mapped Class</th>
                <th>Submission Deadline</th>
                <th>Received Submissions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((asgn) => (
                <tr key={asgn.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{asgn.title}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{asgn.subject}</td>
                  <td>{asgn.class}</td>
                  <td style={{ fontWeight: 650 }}>{asgn.dueDate}</td>
                  <td><strong>{asgn.submissions}</strong> / {asgn.total} Submits</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 7: STUDY MATERIALS */}
      {activeTab === "materials" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* Materials Registry */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Study Resources Repository</h3>
            
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Topic Resource</th>
                  <th>Type</th>
                  <th>Class</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((mat) => (
                  <tr key={mat.id}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{mat.title}</td>
                    <td><span className="badge badge-info">{mat.type}</span></td>
                    <td>{mat.class}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 700 }}>{mat.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Upload notes */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1.25rem" }}>Share Lecture Note / Video Link</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>RESOURCE HEADER TITLE</label>
                <input 
                  type="text" 
                  placeholder="e.g. Chapter 4 Optics Notes PDF"
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CLASS</label>
                  <select style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}>
                    <option value="Class 10" style={{ background: "#0b0f19" }}>Class 10</option>
                    <option value="Class 9" style={{ background: "#0b0f19" }}>Class 9</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>RESOURCE TYPE</label>
                  <select style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}>
                    <option value="pdf" style={{ background: "#0b0f19" }}>PDF Document</option>
                    <option value="video" style={{ background: "#0b0f19" }}>YouTube Video Link</option>
                  </select>
                </div>
              </div>

              <div style={{ border: "2px dashed var(--border-color)", padding: "1.5rem", borderRadius: 8, textAlign: "center", cursor: "pointer" }} onClick={() => alert("Select file...")}>
                <Upload size={24} color="var(--primary)" style={{ margin: "0 auto 0.5rem" }} />
                <span style={{ fontSize: "0.85rem" }}>Click to upload notes (.pdf, .ppt)</span>
              </div>

              <button onClick={() => alert("Study resource mapped and published!")} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center" }}>
                Publish Study Resource
              </button>
            </div>
          </div>

        </div>
      )}

      {/* MODULE 8: LESSON ROADMAPPING */}
      {activeTab === "lesson_plans" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Curriculum Chapters Lesson Roadmap</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Chapter Name</th>
                <th>Daily Topics / Lectures Mapped</th>
                <th>Learning Objectives</th>
                <th style={{ textAlign: "right" }}>Mark Completion</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{lesson.chapter}</td>
                  <td>{lesson.topic}</td>
                  <td>{lesson.objectives}</td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => toggleLessonStatus(lesson.id)}
                      className={`btn ${lesson.status === "Completed" ? "btn-primary" : "btn-secondary"}`}
                      style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.3rem" }}
                    >
                      {lesson.status === "Completed" ? "COMPLETED ✅" : "PENDING ⏳"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 9: SYLLABUS PROGRESS TRACKER */}
      {activeTab === "syllabus" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Subject-wise Syllabus Progress Indicators</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {Object.entries(syllabusProgress).map(([subj, pct]) => (
              <div key={subj} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", justify: "space-between", fontSize: "0.85rem", fontWeight: 700 }}>
                  <span style={{ color: "#fff" }}>{subj} Syllabus (Class 10)</span>
                  <span style={{ color: "var(--primary)" }}>{pct}% Completed</span>
                </div>
                
                <div style={{ width: "100%", height: 10, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)", borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 10: ACADEMIC CALENDAR */}
      {activeTab === "calendar" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Academic Calendar &amp; Holiday logs</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {events.map((e, idx) => (
              <div key={idx} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", borderRadius: 10 }}>
                <span className={`badge ${e.type === "Exams" ? "badge-danger" : e.type === "Holidays" ? "badge-secondary" : "badge-info"}`} style={{ fontSize: "0.68rem" }}>
                  {e.type.toUpperCase()}
                </span>
                
                <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: "0.5rem" }}>{e.title}</h4>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Calendar size={12} /> {e.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════ QUICK ADD CLASS MODAL ════════════ */}
      {isAddClassOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 400 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add New Class</h3>
              <button onClick={() => setIsAddClassOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddClass} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>CLASS NAME</label>
                <input type="text" value={newClass.name} onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} placeholder="e.g. Class 11 (Commerce)" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SECTIONS COUNT</label>
                  <input type="number" value={newClass.sections} onChange={(e) => setNewClass({ ...newClass, sections: Number(e.target.value) })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>CAPACITY LIMIT</label>
                  <input type="number" value={newClass.capacity} onChange={(e) => setNewClass({ ...newClass, capacity: Number(e.target.value) })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Create Class</button>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ QUICK ADD SUBJECT MODAL ════════════ */}
      {isAddSubjectOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 400 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add New Subject</h3>
              <button onClick={() => setIsAddSubjectOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubject} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SUBJECT NAME</label>
                <input type="text" value={newSubject.name} onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })} placeholder="e.g. Chemistry" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SUBJECT CODE</label>
                <input type="text" value={newSubject.code} onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })} placeholder="e.g. CHEM-201" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SUBJECT TYPE</label>
                <select value={newSubject.type} onChange={(e) => setNewSubject({ ...newSubject, type: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                  <option value="Theory">Theory Lecture</option>
                  <option value="Practical">Practical Lab</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Create Subject</button>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ QUICK CREATE HOMEWORK MODAL ════════════ */}
      {isCreateHWOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 450 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Assign Daily Homework</h3>
              <button onClick={() => setIsCreateHWOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateHWSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>HOMEWORK DETAILS / TOPIC</label>
                <input type="text" value={newHW.title} onChange={(e) => setNewHW({ ...newHW, title: e.target.value })} placeholder="e.g. Solve Trigonometry Worksheet #2" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SUBJECT</label>
                  <select value={newHW.subject} onChange={(e) => setNewHW({ ...newHW, subject: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>CLASS</label>
                  <select value={newHW.class} onChange={(e) => setNewHW({ ...newHW, class: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                    <option value="Class 10-A">Class 10-A</option>
                    <option value="Class 9-B">Class 9-B</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>DUE DATE</label>
                <input type="date" value={newHW.dueDate} onChange={(e) => setNewHW({ ...newHW, dueDate: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Publish &amp; Notify Parents</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
