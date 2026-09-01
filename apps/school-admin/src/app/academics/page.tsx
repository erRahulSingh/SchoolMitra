/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen, Plus, X, Clock, Calendar, Users, GraduationCap,
  FileText, ClipboardList, Upload, CheckCircle2, Edit3, Trash2,
  Search, Filter, ChevronRight, AlertTriangle, PlayCircle, Layers, CheckSquare, Settings,
  FolderPlus, Video, FileCheck, Save, RefreshCw, BarChart2, ArrowRight
} from "lucide-react";

// Types
interface AcademicSession {
  id: string;
  year: string;
  terms: string[];
  status: "Active" | "Completed" | "Upcoming";
}

interface SchoolClass {
  id: string;
  name: string;
  sections: number;
  totalStudents: number;
  classTeacher: string;
  capacity: number;
  roomNo?: string;
}

interface SubjectItem {
  id: string;
  name: string;
  code: string;
  type: "Theory" | "Practical" | "Elective";
  class: string;
  teacher: string;
}

interface TimetableSlot {
  id: string;
  period: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  room: string;
  conflict: boolean;
}

interface HomeworkItem {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  submissions: number;
  total: number;
  status: "Active" | "Completed" | "Pending";
}

interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  submissions: number;
  total: number;
}

interface StudyMaterial {
  id: string;
  title: string;
  type: "PDF Notes" | "Video Link" | "Document" | "Worksheet";
  class: string;
  subject: string;
  date: string;
}

interface LessonPlan {
  id: string;
  chapter: string;
  topic: string;
  objectives: string;
  status: "Completed" | "In Progress" | "Pending";
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "Exams" | "Holidays" | "Events";
}

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState<
    "sessions" | "classes" | "subjects" | "timetable" | "homework" | 
    "assignments" | "materials" | "lesson_plans" | "syllabus" | "calendar"
  >("sessions");

  // ════════════ 1. SESSIONS STATE ════════════
  const [sessions, setSessions] = useState<AcademicSession[]>([
    { id: "SESS-01", year: "2026 - 2027", terms: ["Term 1 (April - Sept)", "Term 2 (Oct - March)"], status: "Active" },
    { id: "SESS-02", year: "2025 - 2026", terms: ["Term 1", "Term 2"], status: "Completed" }
  ]);
  const [activeSessionYear, setActiveSessionYear] = useState("2026 - 2027");
  const [activeTermName, setActiveTermName] = useState("First Term (April - September)");
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [newSessionForm, setNewSessionForm] = useState({ year: "2027 - 2028", status: "Upcoming" as const });

  // ════════════ 2. CLASSES STATE ════════════
  const [classes, setClasses] = useState<SchoolClass[]>([
    { id: "CLS-01", name: "Class 10", sections: 2, totalStudents: 78, classTeacher: "Mrs. Sunita Rao", capacity: 80, roomNo: "Room 301" },
    { id: "CLS-02", name: "Class 9", sections: 2, totalStudents: 82, classTeacher: "Mrs. Ananya Deshmukh", capacity: 90, roomNo: "Room 302" },
    { id: "CLS-03", name: "Class 8", sections: 3, totalStudents: 124, classTeacher: "Dr. Vikram Malhotra", capacity: 130, roomNo: "Room 201" }
  ]);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [classForm, setClassForm] = useState({ name: "", sections: 2, classTeacher: "Mrs. Sunita Rao", capacity: 40, roomNo: "Room 101" });

  // ════════════ 3. SUBJECTS STATE ════════════
  const [subjects, setSubjects] = useState<SubjectItem[]>([
    { id: "SUB-01", name: "Mathematics", code: "MATH-101", type: "Theory", class: "Class 10", teacher: "Sunita Rao" },
    { id: "SUB-02", name: "Physics Practicals", code: "PHY-LAB-1", type: "Practical", class: "Class 10", teacher: "Dr. Vikram Malhotra" },
    { id: "SUB-03", name: "English Lit", code: "ENG-101", type: "Theory", class: "Class 9", teacher: "Ananya Deshmukh" }
  ]);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [subjectForm, setSubjectForm] = useState({ name: "", code: "", type: "Theory" as const, class: "Class 10", teacher: "Sunita Rao" });

  // ════════════ 4. TIMETABLE STATE ════════════
  const [timetable, setTimetable] = useState<TimetableSlot[]>([
    { id: "TT-01", period: "1st (08:00–08:45)", monday: "Mathematics", tuesday: "Physics", wednesday: "English", thursday: "Chemistry", friday: "Mathematics", room: "Room 301", conflict: false },
    { id: "TT-02", period: "2nd (08:45–09:30)", monday: "Physics", tuesday: "Mathematics", wednesday: "Physics", thursday: "Mathematics", friday: "History", room: "Room 302", conflict: true },
    { id: "TT-03", period: "3rd (09:30–10:15)", monday: "English", tuesday: "Chemistry", wednesday: "Mathematics", thursday: "English", friday: "Computer Sci", room: "Room 301", conflict: false }
  ]);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [editingTimetableId, setEditingTimetableId] = useState<string | null>(null);
  const [timetableForm, setTimetableForm] = useState({ period: "4th (10:30–11:15)", monday: "Biology", tuesday: "English", wednesday: "History", thursday: "Physics", friday: "Chemistry", room: "Room 301", conflict: false });

  // ════════════ 5. HOMEWORK STATE ════════════
  const [homeworks, setHomeworks] = useState<HomeworkItem[]>([
    { id: "HW-001", title: "Physics Lab Experiment #4 — Reflection & Refraction", subject: "Physics", class: "Class 10-A", dueDate: "2026-08-10", submissions: 32, total: 38, status: "Active" },
    { id: "HW-002", title: "Quadratic Equations — Exercise 4.3 (NCERT Textbook)", subject: "Mathematics", class: "Class 10-A", dueDate: "2026-08-05", submissions: 38, total: 38, status: "Completed" }
  ]);
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const [editingHomeworkId, setEditingHomeworkId] = useState<string | null>(null);
  const [homeworkForm, setHomeworkForm] = useState({ title: "", subject: "Physics", class: "Class 10-A", dueDate: "2026-08-15", status: "Active" as const });

  // ════════════ 6. ASSIGNMENTS STATE ════════════
  const [assignments, setAssignments] = useState<AssignmentItem[]>([
    { id: "ASGN-001", title: "Science Project — Solar System Model", subject: "Science", class: "Class 8-C", dueDate: "2026-08-15", submissions: 35, total: 42 },
    { id: "ASGN-002", title: "English Essay — My Dream India (2000 Words)", subject: "English", class: "Class 10-A", dueDate: "2026-08-12", submissions: 28, total: 38 }
  ]);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [editingAssignmentId, setEditingAssignmentId] = useState<string | null>(null);
  const [assignmentForm, setAssignmentForm] = useState({ title: "", subject: "Science", class: "Class 10-A", dueDate: "2026-08-20" });

  // ════════════ 7. STUDY MATERIALS STATE ════════════
  const [materials, setMaterials] = useState<StudyMaterial[]>([
    { id: "MAT-01", title: "Trigonometry Basics PDF notes", type: "PDF Notes", class: "Class 10", subject: "Mathematics", date: "04 Aug 2026" },
    { id: "MAT-02", title: "Optics Animation Video Lecture", type: "Video Link", class: "Class 10", subject: "Physics", date: "05 Aug 2026" }
  ]);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);
  const [materialForm, setMaterialForm] = useState({ title: "", type: "PDF Notes" as const, class: "Class 10", subject: "Mathematics" });

  // ════════════ 8. LESSON PLANS STATE ════════════
  const [lessons, setLessons] = useState<LessonPlan[]>([
    { id: "L-01", chapter: "Chapter 1: Real Numbers", topic: "Euclid's Division Lemma & Fundamental Theorem of Arithmetic", objectives: "Understand divisibility algorithms", status: "Completed" },
    { id: "L-02", chapter: "Chapter 2: Polynomials", topic: "Geometrical meaning of zeroes & Relationship between coefficients", objectives: "Calculate polynomial intersections", status: "Completed" },
    { id: "L-03", chapter: "Chapter 3: Quadratic Equations", topic: "Roots calculation using quadratic formula & Discriminant logic", objectives: "Identify real and imaginary roots", status: "In Progress" }
  ]);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [lessonForm, setLessonForm] = useState({ chapter: "", topic: "", objectives: "", status: "In Progress" as const });

  // ════════════ 9. SYLLABUS TRACKER STATE ════════════
  const [syllabusProgress, setSyllabusProgress] = useState<Record<string, number>>({
    "Mathematics": 75,
    "Physics": 60,
    "Chemistry": 50,
    "English Lit": 85
  });

  // ════════════ 10. ACADEMIC CALENDAR STATE ════════════
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: "EV-1", title: "CBSE Mid-Term Exams Prep", date: "15 Sept 2026", type: "Exams" },
    { id: "EV-2", title: "Independence Day Assembly", date: "15 Aug 2026", type: "Holidays" },
    { id: "EV-3", title: "Parent-Teacher Assembly Meet", date: "05 Sept 2026", type: "Events" }
  ]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({ title: "", date: "2026-08-20", type: "Events" as const });

  // LocalStorage Persist Engine
  useEffect(() => {
    try {
      const cachedClasses = localStorage.getItem("sm_academics_classes");
      if (cachedClasses) setClasses(JSON.parse(cachedClasses));

      const cachedSubjects = localStorage.getItem("sm_academics_subjects");
      if (cachedSubjects) setSubjects(JSON.parse(cachedSubjects));

      const cachedTimetable = localStorage.getItem("sm_academics_timetable");
      if (cachedTimetable) setTimetable(JSON.parse(cachedTimetable));

      const cachedHomeworks = localStorage.getItem("sm_academics_homeworks");
      if (cachedHomeworks) setHomeworks(JSON.parse(cachedHomeworks));

      const cachedLessons = localStorage.getItem("sm_academics_lessons");
      if (cachedLessons) setLessons(JSON.parse(cachedLessons));
    } catch (e) {}
  }, []);

  const saveState = (key: string, val: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  };

  // ──────────────── CLASS HANDLERS ────────────────
  const handleOpenAddClass = () => {
    setEditingClassId(null);
    setClassForm({ name: "", sections: 2, classTeacher: "Mrs. Sunita Rao", capacity: 40, roomNo: "Room 101" });
    setIsClassModalOpen(true);
  };

  const handleOpenEditClass = (c: SchoolClass) => {
    setEditingClassId(c.id);
    setClassForm({ name: c.name, sections: c.sections, classTeacher: c.classTeacher, capacity: c.capacity, roomNo: c.roomNo || "Room 101" });
    setIsClassModalOpen(true);
  };

  const handleSaveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classForm.name) return;

    if (editingClassId) {
      const updated = classes.map(c => c.id === editingClassId ? { ...c, ...classForm } : c);
      setClasses(updated);
      saveState("sm_academics_classes", updated);
      alert(`Class details updated for ${classForm.name}!`);
    } else {
      const created: SchoolClass = {
        id: `CLS-${String(classes.length + 1).padStart(2, "0")}`,
        name: classForm.name,
        sections: Number(classForm.sections),
        totalStudents: 0,
        classTeacher: classForm.classTeacher,
        capacity: Number(classForm.capacity),
        roomNo: classForm.roomNo
      };
      const updated = [...classes, created];
      setClasses(updated);
      saveState("sm_academics_classes", updated);
      alert(`New Class ${classForm.name} created!`);
    }
    setIsClassModalOpen(false);
  };

  const handleDeleteClass = (id: string) => {
    if (confirm("Delete this Class record?")) {
      const updated = classes.filter(c => c.id !== id);
      setClasses(updated);
      saveState("sm_academics_classes", updated);
    }
  };

  // ──────────────── SUBJECT HANDLERS ────────────────
  const handleOpenAddSubject = () => {
    setEditingSubjectId(null);
    setSubjectForm({ name: "", code: "", type: "Theory", class: "Class 10", teacher: "Sunita Rao" });
    setIsSubjectModalOpen(true);
  };

  const handleOpenEditSubject = (s: SubjectItem) => {
    setEditingSubjectId(s.id);
    setSubjectForm({ name: s.name, code: s.code, type: s.type, class: s.class, teacher: s.teacher });
    setIsSubjectModalOpen(true);
  };

  const handleSaveSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectForm.name || !subjectForm.code) return;

    if (editingSubjectId) {
      const updated = subjects.map(s => s.id === editingSubjectId ? { ...s, ...subjectForm } : s);
      setSubjects(updated);
      saveState("sm_academics_subjects", updated);
    } else {
      const created: SubjectItem = {
        id: `SUB-${String(subjects.length + 1).padStart(2, "0")}`,
        ...subjectForm
      };
      const updated = [...subjects, created];
      setSubjects(updated);
      saveState("sm_academics_subjects", updated);
    }
    setIsSubjectModalOpen(false);
  };

  const handleDeleteSubject = (id: string) => {
    if (confirm("Delete subject definition?")) {
      const updated = subjects.filter(s => s.id !== id);
      setSubjects(updated);
      saveState("sm_academics_subjects", updated);
    }
  };

  // ──────────────── TIMETABLE HANDLERS ────────────────
  const handleOpenAddTimetable = () => {
    setEditingTimetableId(null);
    setTimetableForm({ period: "4th (10:30–11:15)", monday: "Biology", tuesday: "English", wednesday: "History", thursday: "Physics", friday: "Chemistry", room: "Room 301", conflict: false });
    setIsTimetableModalOpen(true);
  };

  const handleOpenEditTimetable = (t: TimetableSlot) => {
    setEditingTimetableId(t.id);
    setTimetableForm({ period: t.period, monday: t.monday, tuesday: t.tuesday, wednesday: t.wednesday, thursday: t.thursday, friday: t.friday, room: t.room, conflict: t.conflict });
    setIsTimetableModalOpen(true);
  };

  const handleSaveTimetable = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTimetableId) {
      const updated = timetable.map(t => t.id === editingTimetableId ? { ...t, ...timetableForm } : t);
      setTimetable(updated);
      saveState("sm_academics_timetable", updated);
    } else {
      const created: TimetableSlot = {
        id: `TT-${Date.now()}`,
        ...timetableForm
      };
      const updated = [...timetable, created];
      setTimetable(updated);
      saveState("sm_academics_timetable", updated);
    }
    setIsTimetableModalOpen(false);
  };

  const handleDeleteTimetable = (id: string) => {
    if (confirm("Delete period timetable slot?")) {
      const updated = timetable.filter(t => t.id !== id);
      setTimetable(updated);
      saveState("sm_academics_timetable", updated);
    }
  };

  // ──────────────── HOMEWORK HANDLERS ────────────────
  const handleSaveHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeworkForm.title) return;

    if (editingHomeworkId) {
      setHomeworks(homeworks.map(h => h.id === editingHomeworkId ? { ...h, ...homeworkForm } : h));
    } else {
      const created: HomeworkItem = {
        id: `HW-${Date.now()}`,
        title: homeworkForm.title,
        subject: homeworkForm.subject,
        class: homeworkForm.class,
        dueDate: homeworkForm.dueDate,
        submissions: 0,
        total: 38,
        status: homeworkForm.status
      };
      setHomeworks([created, ...homeworks]);
    }
    setIsHomeworkModalOpen(false);
  };

  const handleDeleteHomework = (id: string) => {
    if (confirm("Delete homework assignment?")) {
      setHomeworks(homeworks.filter(h => h.id !== id));
    }
  };

  // ──────────────── LESSON PLAN HANDLERS ────────────────
  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.chapter) return;

    if (editingLessonId) {
      setLessons(lessons.map(l => l.id === editingLessonId ? { ...l, ...lessonForm } : l));
    } else {
      const created: LessonPlan = {
        id: `L-${Date.now()}`,
        ...lessonForm
      };
      setLessons([...lessons, created]);
    }
    setIsLessonModalOpen(false);
  };

  const handleDeleteLesson = (id: string) => {
    if (confirm("Delete lesson plan?")) {
      setLessons(lessons.filter(l => l.id !== id));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* HEADER BANNER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Academics Module Hub <BookOpen size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0, fontSize: "0.85rem" }}>
            Manage curriculum sessions, core classes, subject maps, lecture timetables, homework, lesson plans, and study materials.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "classes") handleOpenAddClass();
            else if (activeTab === "subjects") handleOpenAddSubject();
            else if (activeTab === "timetable") handleOpenAddTimetable();
            else if (activeTab === "homework") { setEditingHomeworkId(null); setHomeworkForm({ title: "", subject: "Physics", class: "Class 10-A", dueDate: "2026-08-15", status: "Active" }); setIsHomeworkModalOpen(true); }
            else if (activeTab === "lesson_plans") { setEditingLessonId(null); setLessonForm({ chapter: "", topic: "", objectives: "", status: "In Progress" }); setIsLessonModalOpen(true); }
            else alert("Select a module section to quick add items!");
          }} 
          className="btn btn-primary" 
          style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}
        >
          <Plus size={16} /> Quick Add Item
        </button>
      </div>

      {/* SUB-TAB NAVIGATION BAR */}
      <div className="glass-card" style={{ padding: "0.6rem", display: "flex", gap: "0.5rem", overflowX: "auto", whiteSpace: "nowrap" }}>
        {[
          { id: "sessions", label: "Academic Sessions", icon: Calendar },
          { id: "classes", label: "Class Registry", icon: Layers },
          { id: "subjects", label: "Subject Manager", icon: GraduationCap },
          { id: "timetable", label: "Schedule Timetable", icon: Clock },
          { id: "homework", label: "Homework Center", icon: ClipboardList },
          { id: "assignments", label: "Assignments Console", icon: FileText },
          { id: "materials", label: "Study Materials", icon: FolderPlus },
          { id: "lesson_plans", label: "Lesson Plans", icon: CheckSquare },
          { id: "syllabus", label: "Syllabus Tracker", icon: BarChart2 },
          { id: "calendar", label: "Academic Calendar", icon: Calendar }
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

      {/* ════════════ 1. ACADEMIC SESSIONS ════════════ */}
      {activeTab === "sessions" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1rem 0", color: "var(--text-heading)" }}>Academic Term Configurations</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ACTIVE SYSTEM SESSION YEAR</label>
                <select 
                  value={activeSessionYear}
                  onChange={(e) => setActiveSessionYear(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontWeight: 700 }}
                >
                  {sessions.map(s => <option key={s.id} value={s.year}>{s.year} Session ({s.status})</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CURRENT ACTIVE TERM</label>
                <select 
                  value={activeTermName}
                  onChange={(e) => setActiveTermName(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
                >
                  <option value="First Term (April - September)">First Term (April - September)</option>
                  <option value="Second Term (October - March)">Second Term (October - March)</option>
                </select>
              </div>

              <button onClick={() => alert(`Session rollover rules applied for ${activeSessionYear}!`)} className="btn btn-primary" style={{ padding: "0.7rem", justifyContent: "center" }}>
                Apply Session Rollover Rules
              </button>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Academic Session Audit Log</h3>
              <button onClick={() => {
                const year = prompt("Enter new academic session year (e.g. 2027 - 2028):");
                if (year) {
                  setSessions([...sessions, { id: `SESS-${Date.now()}`, year, terms: ["Term 1", "Term 2"], status: "Upcoming" }]);
                }
              }} className="btn btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}>
                + Add Session
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {sessions.map(s => (
                <div key={s.id} style={{ padding: "1rem", background: "var(--bg-input)", borderRadius: 10, border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ fontSize: "0.95rem", color: "var(--text-heading)" }}>Session {s.year}</strong>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>Terms: {s.terms.join(" & ")}</div>
                  </div>
                  <span className={`badge ${s.status === "Active" ? "badge-success" : "badge-info"}`}>
                    {s.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ════════════ 2. CLASS REGISTRY ════════════ */}
      {activeTab === "classes" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Core School Classes &amp; Sections</h3>
            <button onClick={handleOpenAddClass} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add New Class
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>CLASS NAME</th>
                  <th>SECTIONS</th>
                  <th>TOTAL STUDENTS</th>
                  <th>CLASS TEACHER</th>
                  <th>ROOM NO</th>
                  <th>CAPACITY</th>
                  <th style={{ textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {classes.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{c.name}</td>
                    <td><span className="badge badge-info">{c.sections} Sections</span></td>
                    <td style={{ fontWeight: 700 }}>{c.totalStudents} Students</td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{c.classTeacher}</td>
                    <td style={{ fontFamily: "monospace" }}>{c.roomNo || "Room 101"}</td>
                    <td>{c.capacity} Max</td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button onClick={() => handleOpenEditClass(c)} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}>
                          <Edit3 size={13} /> Edit
                        </button>
                        <button onClick={() => handleDeleteClass(c.id)} className="btn btn-secondary" style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ 3. SUBJECT MANAGER ════════════ */}
      {activeTab === "subjects" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Academic Subject Mapping Matrix</h3>
            <button onClick={handleOpenAddSubject} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Subject Map
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>SUBJECT NAME</th>
                  <th>CODE</th>
                  <th>TYPE</th>
                  <th>CLASS ALLOCATION</th>
                  <th>ASSIGNED FACULTY</th>
                  <th style={{ textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{s.name}</td>
                    <td style={{ fontFamily: "monospace", fontWeight: 700 }}>{s.code}</td>
                    <td>
                      <span className={`badge ${s.type === "Practical" ? "badge-info" : "badge-success"}`}>
                        {s.type}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{s.class}</td>
                    <td style={{ fontWeight: 600 }}>{s.teacher}</td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button onClick={() => handleOpenEditSubject(s)} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}>
                          <Edit3 size={13} /> Edit
                        </button>
                        <button onClick={() => handleDeleteSubject(s.id)} className="btn btn-secondary" style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ 4. SCHEDULE TIMETABLE ════════════ */}
      {activeTab === "timetable" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Master Class Schedule &amp; Timetable Matrix</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>Conflict-free period allocations per class room.</p>
            </div>
            <button onClick={handleOpenAddTimetable} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Period Slot
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>PERIOD TIME</th>
                  <th>MONDAY</th>
                  <th>TUESDAY</th>
                  <th>WEDNESDAY</th>
                  <th>THURSDAY</th>
                  <th>FRIDAY</th>
                  <th>ROOM NO</th>
                  <th style={{ textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map(t => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)", whiteSpace: "nowrap" }}>{t.period}</td>
                    <td style={{ fontWeight: 600 }}>{t.monday}</td>
                    <td style={{ fontWeight: 600 }}>{t.tuesday}</td>
                    <td style={{ fontWeight: 600 }}>{t.wednesday}</td>
                    <td style={{ fontWeight: 600 }}>{t.thursday}</td>
                    <td style={{ fontWeight: 600 }}>{t.friday}</td>
                    <td style={{ fontFamily: "monospace" }}>{t.room}</td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button onClick={() => handleOpenEditTimetable(t)} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}>
                          <Edit3 size={13} /> Edit
                        </button>
                        <button onClick={() => handleDeleteTimetable(t.id)} className="btn btn-secondary" style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ 5. HOMEWORK CENTER ════════════ */}
      {activeTab === "homework" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Daily Homework Management Desk</h3>
            <button onClick={() => { setEditingHomeworkId(null); setHomeworkForm({ title: "", subject: "Physics", class: "Class 10-A", dueDate: "2026-08-15", status: "Active" }); setIsHomeworkModalOpen(true); }} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Create Homework
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>TITLE &amp; DESCRIPTION</th>
                  <th>SUBJECT</th>
                  <th>CLASS</th>
                  <th>DUE DATE</th>
                  <th>SUBMISSIONS</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {homeworks.map(h => (
                  <tr key={h.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{h.title}</td>
                    <td><span className="badge badge-info">{h.subject}</span></td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{h.class}</td>
                    <td style={{ fontSize: "0.82rem" }}>{h.dueDate}</td>
                    <td style={{ fontWeight: 700 }}>{h.submissions} / {h.total}</td>
                    <td><span className={`badge ${h.status === "Completed" ? "badge-success" : "badge-info"}`}>{h.status}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button onClick={() => { setEditingHomeworkId(h.id); setHomeworkForm({ title: h.title, subject: h.subject, class: h.class, dueDate: h.dueDate, status: h.status }); setIsHomeworkModalOpen(true); }} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}>
                          <Edit3 size={13} /> Edit
                        </button>
                        <button onClick={() => handleDeleteHomework(h.id)} className="btn btn-secondary" style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ 6. ASSIGNMENTS CONSOLE ════════════ */}
      {activeTab === "assignments" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Academic Assignments &amp; Projects</h3>
            <button onClick={() => { setEditingAssignmentId(null); setAssignmentForm({ title: "", subject: "Science", class: "Class 10-A", dueDate: "2026-08-20" }); setIsAssignmentModalOpen(true); }} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Create Assignment
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>PROJECT TITLE</th>
                  <th>SUBJECT</th>
                  <th>CLASS</th>
                  <th>DUE DATE</th>
                  <th>SUBMISSIONS</th>
                  <th style={{ textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{a.title}</td>
                    <td><span className="badge badge-info">{a.subject}</span></td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{a.class}</td>
                    <td style={{ fontSize: "0.82rem" }}>{a.dueDate}</td>
                    <td style={{ fontWeight: 700 }}>{a.submissions} / {a.total}</td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button onClick={() => { setEditingAssignmentId(a.id); setAssignmentForm({ title: a.title, subject: a.subject, class: a.class, dueDate: a.dueDate }); setIsAssignmentModalOpen(true); }} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}>
                          <Edit3 size={13} /> Edit
                        </button>
                        <button onClick={() => setAssignments(assignments.filter(x => x.id !== a.id))} className="btn btn-secondary" style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ 7. STUDY MATERIALS ════════════ */}
      {activeTab === "materials" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>E-Learning Study Resources &amp; Notes</h3>
            <button onClick={() => { setEditingMaterialId(null); setMaterialForm({ title: "", type: "PDF Notes", class: "Class 10", subject: "Mathematics" }); setIsMaterialModalOpen(true); }} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Upload size={15} /> Upload Resource
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {materials.map(m => (
              <div key={m.id} style={{ background: "var(--bg-input)", padding: "1.15rem", borderRadius: 12, border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="badge badge-info">{m.type}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{m.date}</span>
                </div>
                <strong style={{ fontSize: "0.92rem", color: "var(--text-heading)" }}>{m.title}</strong>
                <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700 }}>{m.class} &bull; {m.subject}</div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
                  <button onClick={() => alert(`Opening resource preview for ${m.title}`)} className="btn btn-primary" style={{ flex: 1, padding: "0.35rem", fontSize: "0.72rem", justifyContent: "center" }}>
                    View Material
                  </button>
                  <button onClick={() => setMaterials(materials.filter(x => x.id !== m.id))} className="btn btn-secondary" style={{ padding: "0.35rem 0.55rem", fontSize: "0.72rem", color: "#ef4444" }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════ 8. LESSON PLANS ════════════ */}
      {activeTab === "lesson_plans" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Curriculum Lesson Plans</h3>
            <button onClick={() => { setEditingLessonId(null); setLessonForm({ chapter: "", topic: "", objectives: "", status: "In Progress" }); setIsLessonModalOpen(true); }} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Lesson Plan
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>CHAPTER</th>
                  <th>TOPICS COVERED</th>
                  <th>LEARNING OBJECTIVES</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)", whiteSpace: "nowrap" }}>{l.chapter}</td>
                    <td style={{ fontSize: "0.82rem" }}>{l.topic}</td>
                    <td style={{ fontSize: "0.82rem" }}>{l.objectives}</td>
                    <td><span className={`badge ${l.status === "Completed" ? "badge-success" : "badge-info"}`}>{l.status}</span></td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button onClick={() => { setEditingLessonId(l.id); setLessonForm({ chapter: l.chapter, topic: l.topic, objectives: l.objectives, status: l.status }); setIsLessonModalOpen(true); }} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}>
                          <Edit3 size={13} /> Edit
                        </button>
                        <button onClick={() => handleDeleteLesson(l.id)} className="btn btn-secondary" style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ 9. SYLLABUS TRACKER ════════════ */}
      {activeTab === "syllabus" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1.25rem 0", color: "var(--text-heading)" }}>Subject-Wise Syllabus Completion Progress</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {Object.entries(syllabusProgress).map(([sub, pct]) => (
              <div key={sub} style={{ background: "var(--bg-input)", padding: "1.25rem", borderRadius: 12, border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.95rem", color: "var(--text-heading)" }}>{sub}</strong>
                  <strong style={{ fontSize: "1.1rem", color: "var(--primary)", fontWeight: 900 }}>{pct}% Completed</strong>
                </div>

                <div style={{ width: "100%", height: 10, background: "rgba(255,255,255,0.1)", borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "var(--primary)", borderRadius: 5, transition: "width 0.3s" }} />
                </div>

                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                  <button onClick={() => {
                    const newPct = prompt(`Enter updated completion percentage for ${sub}:`, String(pct));
                    if (newPct !== null) {
                      setSyllabusProgress({ ...syllabusProgress, [sub]: Math.min(100, Math.max(0, Number(newPct))) });
                    }
                  }} className="btn btn-secondary" style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem" }}>
                    <Edit3 size={13} /> Update Progress
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════ 10. ACADEMIC CALENDAR ════════════ */}
      {activeTab === "calendar" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Academic Events &amp; Exam Schedule</h3>
            <button onClick={() => {
              const title = prompt("Enter event title:");
              const date = prompt("Enter event date (e.g. 20 Aug 2026):");
              if (title && date) {
                setEvents([...events, { id: `EV-${Date.now()}`, title, date, type: "Events" }]);
              }
            }} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Event
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {events.map(ev => (
              <div key={ev.id} style={{ padding: "1rem 1.25rem", background: "var(--bg-input)", borderRadius: 10, border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: "0.95rem", color: "var(--text-heading)" }}>{ev.title}</strong>
                  <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700, marginTop: 2 }}>{ev.date}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="badge badge-info">{ev.type}</span>
                  <button onClick={() => setEvents(events.filter(x => x.id !== ev.id))} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════ ADD / EDIT CLASS MODAL ════════════ */}
      {isClassModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingClassId ? "Edit School Class" : "Add New School Class"}
              </h3>
              <button onClick={() => setIsClassModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveClass} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CLASS NAME</label>
                <input type="text" value={classForm.name} onChange={(e) => setClassForm({ ...classForm, name: e.target.value })} placeholder="e.g. Class 11" required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SECTIONS</label>
                  <input type="number" value={classForm.sections} onChange={(e) => setClassForm({ ...classForm, sections: Number(e.target.value) })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MAX CAPACITY</label>
                  <input type="number" value={classForm.capacity} onChange={(e) => setClassForm({ ...classForm, capacity: Number(e.target.value) })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CLASS TEACHER</label>
                <input type="text" value={classForm.classTeacher} onChange={(e) => setClassForm({ ...classForm, classTeacher: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsClassModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Class</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD / EDIT SUBJECT MODAL ════════════ */}
      {isSubjectModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingSubjectId ? "Edit Subject Mapping" : "Add Subject Mapping"}
              </h3>
              <button onClick={() => setIsSubjectModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveSubject} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT NAME</label>
                <input type="text" value={subjectForm.name} onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })} placeholder="e.g. Mathematics" required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT CODE</label>
                  <input type="text" value={subjectForm.code} onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })} placeholder="MATH-101" required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TYPE</label>
                  <select value={subjectForm.type} onChange={(e) => setSubjectForm({ ...subjectForm, type: e.target.value as any })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Theory">Theory</option>
                    <option value="Practical">Practical</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGNED FACULTY</label>
                <input type="text" value={subjectForm.teacher} onChange={(e) => setSubjectForm({ ...subjectForm, teacher: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsSubjectModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD / EDIT TIMETABLE MODAL ════════════ */}
      {isTimetableModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "560px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingTimetableId ? "Edit Period Timetable Slot" : "Add Period Timetable Slot"}
              </h3>
              <button onClick={() => setIsTimetableModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveTimetable} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PERIOD TIME</label>
                <input type="text" value={timetableForm.period} onChange={(e) => setTimetableForm({ ...timetableForm, period: e.target.value })} placeholder="e.g. 1st (08:00–08:45)" required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MONDAY</label>
                  <input type="text" value={timetableForm.monday} onChange={(e) => setTimetableForm({ ...timetableForm, monday: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TUESDAY</label>
                  <input type="text" value={timetableForm.tuesday} onChange={(e) => setTimetableForm({ ...timetableForm, tuesday: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>WEDNESDAY</label>
                  <input type="text" value={timetableForm.wednesday} onChange={(e) => setTimetableForm({ ...timetableForm, wednesday: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>THURSDAY</label>
                  <input type="text" value={timetableForm.thursday} onChange={(e) => setTimetableForm({ ...timetableForm, thursday: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FRIDAY</label>
                  <input type="text" value={timetableForm.friday} onChange={(e) => setTimetableForm({ ...timetableForm, friday: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsTimetableModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Timetable Slot</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD / EDIT HOMEWORK MODAL ════════════ */}
      {isHomeworkModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "520px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingHomeworkId ? "Edit Homework Assignment" : "Create New Homework"}
              </h3>
              <button onClick={() => setIsHomeworkModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveHomework} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>HOMEWORK TITLE</label>
                <input type="text" value={homeworkForm.title} onChange={(e) => setHomeworkForm({ ...homeworkForm, title: e.target.value })} placeholder="e.g. NCERT Ex 4.3" required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT</label>
                  <input type="text" value={homeworkForm.subject} onChange={(e) => setHomeworkForm({ ...homeworkForm, subject: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CLASS &amp; SECTION</label>
                  <input type="text" value={homeworkForm.class} onChange={(e) => setHomeworkForm({ ...homeworkForm, class: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DUE DATE</label>
                <input type="date" value={homeworkForm.dueDate} onChange={(e) => setHomeworkForm({ ...homeworkForm, dueDate: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsHomeworkModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Homework</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD / EDIT LESSON PLAN MODAL ════════════ */}
      {isLessonModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "520px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingLessonId ? "Edit Lesson Plan" : "Add Lesson Plan"}
              </h3>
              <button onClick={() => setIsLessonModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveLesson} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CHAPTER TITLE</label>
                <input type="text" value={lessonForm.chapter} onChange={(e) => setLessonForm({ ...lessonForm, chapter: e.target.value })} placeholder="e.g. Chapter 4: Quadratic Equations" required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TOPICS COVERED</label>
                <input type="text" value={lessonForm.topic} onChange={(e) => setLessonForm({ ...lessonForm, topic: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LEARNING OBJECTIVES</label>
                <textarea rows={2} value={lessonForm.objectives} onChange={(e) => setLessonForm({ ...lessonForm, objectives: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsLessonModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Lesson Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
