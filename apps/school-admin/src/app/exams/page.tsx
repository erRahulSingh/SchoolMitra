"use client";

import React, { useState, useEffect } from "react";
import {
  Award, Plus, X, Download, Calendar, FileText, BarChart3,
  CheckCircle2, AlertCircle, Eye, Printer, Settings, Send,
  ChevronDown, Edit3, Save, Lock, Unlock, Users, PlayCircle, BarChart2, Star, CheckSquare, Trash2, QrCode
} from "lucide-react";

interface ExamType {
  id: string;
  name: string;
  weightage: string;
  description: string;
}

interface ExamSchedule {
  id: string;
  class: string;
  section: string;
  subject: string;
  date: string;
  time: string;
  room: string;
  invigilator: string;
}

interface StudentMarks {
  id: string;
  rollNo: string;
  name: string;
  theory: number;
  practical: number;
  internal: number;
  remarks: string;
}

interface GradePolicy {
  grade: string;
  minPercent: number;
  maxPercent: number;
  gpa: string;
  remark: string;
}

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "types" | "schedule" | "marks" | "grades" | "results" | "report_cards" | "publish" | "analytics" | "hall_tickets"
  >("dashboard");

  // ════════════ 1. EXAM TYPES STATE ════════════
  const [examTypes, setExamTypes] = useState<ExamType[]>([
    { id: "TYP-01", name: "Unit Test", weightage: "10%", description: "Formative evaluation cycles" },
    { id: "TYP-02", name: "Half Yearly", weightage: "40%", description: "Mid-session comprehensive evaluations" },
    { id: "TYP-03", name: "Annual Final", weightage: "50%", description: "End-of-term promotion examinations" }
  ]);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [editingTypeId, setEditingTypeId] = useState<string | null>(null);
  const [typeForm, setTypeForm] = useState({ name: "", weightage: "10%", description: "" });

  // ════════════ 2. EXAM TIMETABLES STATE ════════════
  const [schedules, setSchedules] = useState<ExamSchedule[]>([
    { id: "SCH-01", class: "Class 10", section: "A", subject: "Mathematics", date: "2026-08-15", time: "09:00 AM – 12:00 PM", room: "Room 301", invigilator: "Mr. Ravi Kumar" },
    { id: "SCH-02", class: "Class 10", section: "A", subject: "Physics", date: "2026-08-17", time: "09:00 AM – 12:00 PM", room: "Room 302", invigilator: "Mrs. Ananya Deshmukh" },
    { id: "SCH-03", class: "Class 9", section: "B", subject: "English Lit", date: "2026-08-15", time: "01:00 PM – 04:00 PM", room: "Room 201", invigilator: "Sunita Rao" }
  ]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const [scheduleForm, setScheduleForm] = useState({ class: "Class 10", section: "A", subject: "Mathematics", date: "2026-08-15", time: "09:00 AM – 12:00 PM", room: "Room 301", invigilator: "Mr. Ravi Kumar" });

  // ════════════ 3. SCHOLASTIC MARKS STATE ════════════
  const [selectedMarkStudentId, setSelectedMarkStudentId] = useState("10-A-01");
  const [marksEditable, setMarksEditable] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("Saved to Cloud ✅");
  const [marksData, setMarksData] = useState<StudentMarks[]>([
    { id: "10-A-01", rollNo: "10-A-01", name: "Aarav Sharma", theory: 64, practical: 28, internal: 8, remarks: "Excellent Analytical Skills" },
    { id: "10-A-02", rollNo: "10-A-02", name: "Ananya Patel", theory: 62, practical: 26, internal: 9, remarks: "Outstanding Concept Clarity" },
    { id: "10-A-03", rollNo: "10-A-03", name: "Rohan Verma", theory: 55, practical: 22, internal: 7, remarks: "Good, needs revision in trigonometry" }
  ]);

  // ════════════ 4. GRADING SYSTEM STATE ════════════
  const [gradeSetup, setGradeSetup] = useState<GradePolicy[]>([
    { grade: "A+", minPercent: 90, maxPercent: 100, gpa: "10.0", remark: "Outstanding Performance" },
    { grade: "A", minPercent: 80, maxPercent: 89, gpa: "9.0", remark: "Excellent Performance" },
    { grade: "B+", minPercent: 70, maxPercent: 79, gpa: "8.0", remark: "Very Good Performance" },
    { grade: "B", minPercent: 60, maxPercent: 69, gpa: "7.0", remark: "Good Performance" },
    { grade: "C", minPercent: 50, maxPercent: 59, gpa: "6.0", remark: "Above Average" },
    { grade: "D", minPercent: 33, maxPercent: 49, gpa: "5.0", remark: "Pass" },
    { grade: "E (Fail)", minPercent: 0, maxPercent: 32, gpa: "0.0", remark: "Needs Improvement" }
  ]);

  // ════════════ 5. PUBLISHED STATE ════════════
  const [publishedExams, setPublishedExams] = useState<Record<string, boolean>>({ "SCH-01": true });

  // ════════════ 6. ANALYTICS OVERVIEW STATE ════════════
  const [analyticsOverview, setAnalyticsOverview] = useState<any>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const [selectedClassId, setSelectedClassId] = useState("class8");
  const [selectedSectionId, setSelectedSectionId] = useState("sectionA");
  const [classPerformance, setClassPerformance] = useState<any>({
    students: 42,
    attendance: "95%",
    averageMarks: "78%",
    highest: "96%",
    lowest: "42%",
    passPercentage: "92%",
    subjectWise: [
      { subject: "Mathematics", score: "81%" },
      { subject: "Science", score: "76%" },
      { subject: "English", score: "84%" },
      { subject: "Hindi", score: "79%" }
    ]
  });

  // Fetch from Real APIs
  useEffect(() => {
    // Fetch Exams
    fetch("http://localhost:5000/api/v1/exams")
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.data.exams) {
          const formattedExams = data.data.exams.map((ex: any) => ({
            id: ex._id,
            class: ex.classId?.className || "Class 10",
            section: "A",
            subject: ex.examName,
            date: new Date(ex.startDate).toLocaleDateString(),
            time: "09:00 AM",
            room: "Hall A",
            invigilator: "Admin"
          }));
          if (formattedExams.length > 0) setSchedules(formattedExams);
        }
      })
      .catch(e => console.warn(e));

    // Fallback load for types & grades
    try {
      const cachedTypes = localStorage.getItem("sm_exam_types");
      if (cachedTypes) setExamTypes(JSON.parse(cachedTypes));

      const cachedMarks = localStorage.getItem("sm_exam_marks");
      if (cachedMarks) setMarksData(JSON.parse(cachedMarks));
    } catch (e) {}
  }, []);

  const [selectedExamTermId, setSelectedExamTermId] = useState("annual");
  const [activeReportCard, setActiveReportCard] = useState<any>(null);

  useEffect(() => {
    if (activeTab === "report_cards" && selectedMarkStudentId) {
      // In a real app we'd use the real DB student ID, but here we'll map the UI dummy ID to our fallback
      const sid = selectedMarkStudentId === "10-A-01" ? "64d2f8e1234567890abcdef1" : "64d2f8e1234567890abcdef1"; 
      fetch(`http://localhost:5000/api/v1/exams/report-card/${sid}`)
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data.reportCard) {
            setActiveReportCard(json.data.reportCard);
          }
        })
        .catch(err => console.warn(err));
    }
  }, [activeTab, selectedMarkStudentId]);

  const [examTermAnalytics, setExamTermAnalytics] = useState<any>({
    term: "Annual Examination",
    students: 240,
    appeared: 236,
    passed: 218,
    failed: 18,
    passPercentage: "92.37%",
    average: "76.4%",
    subjectAnalysis: [
      { subject: "Mathematics", score: "72%" },
      { subject: "Science", score: "79%" },
      { subject: "English", score: "84%" },
      { subject: "Hindi", score: "88%" }
    ]
  });

  useEffect(() => {
    if (activeTab === "analytics") {
      fetch(`http://localhost:5000/api/v1/admin/analytics/exam-term?examId=${selectedExamTermId}`)
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data) {
            setExamTermAnalytics(json.data);
          }
        })
        .catch(err => console.warn("Exam Term Analytics fetch error:", err));
    }
  }, [activeTab, selectedExamTermId]);

  // Fetch live Admin Analytics
  useEffect(() => {
    if (activeTab === "analytics") {
      setLoadingAnalytics(true);
      fetch("http://localhost:5000/api/v1/admin/analytics/overview")
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data) {
            setAnalyticsOverview(json.data);
          }
          setLoadingAnalytics(false);
        })
        .catch(err => {
          console.warn("Analytics API call error:", err);
          setLoadingAnalytics(false);
        });
    }
  }, [activeTab]);

  // Fetch Class Performance Analytics
  useEffect(() => {
    if (activeTab === "analytics") {
      fetch(`http://localhost:5000/api/v1/admin/analytics/class-performance?classId=${selectedClassId}&sectionId=${selectedSectionId}`)
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data) {
            setClassPerformance(json.data);
          }
        })
        .catch(err => console.warn("Class Performance API call error:", err));
    }
  }, [activeTab, selectedClassId, selectedSectionId]);

  const saveTypes = (list: ExamType[]) => {
    setExamTypes(list);
    try { localStorage.setItem("sm_exam_types", JSON.stringify(list)); } catch (e) {}
  };

  const saveSchedules = (list: ExamSchedule[]) => {
    setSchedules(list);
    try { localStorage.setItem("sm_exam_schedules", JSON.stringify(list)); } catch (e) {}
  };

  const saveMarks = (list: StudentMarks[]) => {
    setMarksData(list);
    try { localStorage.setItem("sm_exam_marks", JSON.stringify(list)); } catch (e) {}
  };

  // Exam Types Handlers
  const handleOpenAddType = () => {
    setEditingTypeId(null);
    setTypeForm({ name: "", weightage: "10%", description: "" });
    setIsTypeModalOpen(true);
  };

  const handleOpenEditType = (t: ExamType) => {
    setEditingTypeId(t.id);
    setTypeForm({ name: t.name, weightage: t.weightage, description: t.description });
    setIsTypeModalOpen(true);
  };

  const handleSaveType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typeForm.name) return;

    if (editingTypeId) {
      const updated = examTypes.map(t => t.id === editingTypeId ? { ...t, ...typeForm } : t);
      saveTypes(updated);
    } else {
      const created: ExamType = {
        id: `TYP-${Date.now()}`,
        ...typeForm
      };
      const updated = [...examTypes, created];
      saveTypes(updated);
    }
    setIsTypeModalOpen(false);
  };

  const handleDeleteType = (id: string) => {
    if (confirm("Delete this evaluation format?")) {
      const updated = examTypes.filter(t => t.id !== id);
      saveTypes(updated);
    }
  };

  // Timetables Handlers
  const handleOpenAddSchedule = () => {
    setEditingScheduleId(null);
    setScheduleForm({ class: "Class 10", section: "A", subject: "Mathematics", date: "2026-08-15", time: "09:00 AM – 12:00 PM", room: "Room 301", invigilator: "Mr. Ravi Kumar" });
    setIsScheduleModalOpen(true);
  };

  const handleOpenEditSchedule = (s: ExamSchedule) => {
    setEditingScheduleId(s.id);
    setScheduleForm({ class: s.class, section: s.section, subject: s.subject, date: s.date, time: s.time, room: s.room, invigilator: s.invigilator });
    setIsScheduleModalOpen(true);
  };

  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingScheduleId) {
      const updated = schedules.map(s => s.id === editingScheduleId ? { ...s, ...scheduleForm } : s);
      saveSchedules(updated);
      setIsScheduleModalOpen(false);
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/v1/exams/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            examName: scheduleForm.subject,
            classId: "650000000000000000000001", // Dummy class for demo
            academicYearId: "650000000000000000000010",
            startDate: scheduleForm.date
          })
        });
        const json = await res.json();
        if (json.success && json.data.exam) {
          const ex = json.data.exam;
          const created: ExamSchedule = {
            id: ex._id,
            class: scheduleForm.class,
            section: scheduleForm.section,
            subject: scheduleForm.subject,
            date: new Date(ex.startDate).toLocaleDateString(),
            time: scheduleForm.time,
            room: scheduleForm.room,
            invigilator: scheduleForm.invigilator
          };
          const updated = [...schedules, created];
          setSchedules(updated);
        }
      } catch (err) {
        console.warn("Exam create failed", err);
      }
      setIsScheduleModalOpen(false);
    }
  };

  const handleDeleteSchedule = (id: string) => {
    if (confirm("Delete scheduled paper?")) {
      const updated = schedules.filter(s => s.id !== id);
      saveSchedules(updated);
    }
  };

  // Marks Handlers
  const handleMarksChange = (id: string, field: 'theory' | 'practical' | 'internal', value: number) => {
    setAutoSaveStatus("Saving changes...");
    const updated = marksData.map(m => m.id === id ? { ...m, [field]: value } : m);
    saveMarks(updated);
    setTimeout(() => setAutoSaveStatus("Saved to Cloud ✅"), 500);
  };

  // Compiler Ranks
  const generatedResults = marksData.map((m, idx) => {
    const total = m.theory + m.practical + m.internal;
    const pct = total;
    let grade = "D";
    if (pct >= 90) grade = "A+";
    else if (pct >= 80) grade = "A";
    else if (pct >= 70) grade = "B+";
    else if (pct >= 60) grade = "B";
    else if (pct >= 50) grade = "C";
    
    return {
      name: m.name,
      rollNo: m.rollNo,
      total,
      percentage: `${pct}%`,
      grade,
      rank: idx + 1
    };
  });

  const selectedDossierStudent = marksData.find(m => m.id === selectedMarkStudentId) || marksData[0];

  const handleExportReport = (type: string, format: string) => {
    window.open(`http://localhost:5000/api/v1/admin/analytics/export?type=${type}&format=${format}`, '_blank');
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Examination &amp; Grade Engine <Award size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0, fontSize: "0.85rem" }}>
            Schedule school board/term exams, define grading indices, compilation report cards, and publish results live.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "types") handleOpenAddType();
            else handleOpenAddSchedule();
          }}
          className="btn btn-primary" 
          style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}
        >
          <Plus size={16} /> Quick Create Item
        </button>
      </div>

      {/* 10 TABS CONSOLE SWITCHER */}
      <div className="glass-card" style={{ padding: "0.6rem", display: "flex", gap: "0.5rem", overflowX: "auto", whiteSpace: "nowrap" }}>
        {[
          { id: "dashboard", label: "Exam Dashboard", icon: Award },
          { id: "types", label: "Assessment Formats", icon: Users },
          { id: "schedule", label: "Exam Timetables", icon: Calendar },
          { id: "marks", label: "Scholastic Marks Entry", icon: Edit3 },
          { id: "grades", label: "Grading Indices", icon: Settings },
          { id: "results", label: "Result Generation", icon: PlayCircle },
          { id: "report_cards", label: "Report Card Builder", icon: Printer },
          { id: "publish", label: "Publish Results", icon: Send },
          { id: "analytics", label: "Result Analytics", icon: BarChart2 },
          { id: "hall_tickets", label: "Admission Hall Tickets", icon: FileText }
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

      {/* ════════════ 1. EXAM DASHBOARD ════════════ */}
      {activeTab === "dashboard" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
          <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>TOTAL SCHEDULINGS</span>
            <strong style={{ fontSize: "1.6rem", color: "var(--primary)", display: "block", marginTop: 4 }}>12</strong>
          </div>
          <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>UPCOMING EXAMS</span>
            <strong style={{ fontSize: "1.6rem", color: "#f59e0b", display: "block", marginTop: 4 }}>2</strong>
          </div>
          <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>ONGOING PAPERS</span>
            <strong style={{ fontSize: "1.6rem", color: "var(--success)", display: "block", marginTop: 4 }}>1</strong>
          </div>
          <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>COMPLETED EXAMS</span>
            <strong style={{ fontSize: "1.6rem", color: "var(--text-muted)", display: "block", marginTop: 4 }}>9</strong>
          </div>
          <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>STUDENT PASS RATE</span>
            <strong style={{ fontSize: "1.6rem", color: "var(--success)", display: "block", marginTop: 4 }}>94.6%</strong>
          </div>
        </div>
      )}

      {/* ════════════ 2. ASSESSMENT FORMATS ════════════ */}
      {activeTab === "types" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Define Evaluation Formats</h3>
            <button onClick={handleOpenAddType} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Format
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Format Name</th>
                <th>Final CGPA Weightage</th>
                <th>Format Description</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {examTypes.map((typ) => (
                <tr key={typ.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{typ.name}</td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{typ.weightage}</td>
                  <td>{typ.description}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button onClick={() => handleOpenEditType(typ)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                      <button onClick={() => handleDeleteType(typ.id)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 3. EXAM TIMETABLES ════════════ */}
      {activeTab === "schedule" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Scheduled Papers &amp; Invigilators</h3>
            <button onClick={handleOpenAddSchedule} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Schedule Paper
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Class &amp; Section</th>
                <th>Subject Paper</th>
                <th>Date Scheduled</th>
                <th>Time Hours</th>
                <th>Exam Center</th>
                <th>Invigilator</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((sch) => (
                <tr key={sch.id}>
                  <td style={{ fontWeight: 800 }}>{sch.class}-{sch.section}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{sch.subject}</td>
                  <td style={{ fontWeight: 700 }}>{sch.date}</td>
                  <td style={{ fontSize: "0.82rem" }}>{sch.time}</td>
                  <td><span className="badge badge-info">{sch.room}</span></td>
                  <td style={{ fontWeight: 600 }}>{sch.invigilator}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button onClick={() => handleOpenEditSchedule(sch)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                      <button onClick={() => handleDeleteSchedule(sch.id)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 4. SCHOLASTIC MARKS ENTRY ════════════ */}
      {activeTab === "marks" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Class Term Scholastic Marks Sheet</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Edit student scores. Changes auto-save instantly.</p>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: 700 }}>{autoSaveStatus}</span>
              <button 
                onClick={() => setMarksEditable(!marksEditable)} 
                className={`btn ${marksEditable ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem" }}
              >
                {marksEditable ? "Lock Sheet" : "Edit Marks"}
              </button>
            </div>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll Number</th>
                <th>Theory Marks (Max 70)</th>
                <th>Practical Marks (Max 20)</th>
                <th>Internal Assessment (Max 10)</th>
                <th>Registrar Comments</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{m.name}</td>
                  <td style={{ fontFamily: "monospace", fontWeight: 700 }}>{m.rollNo}</td>
                  <td>
                    {marksEditable ? (
                      <input 
                        type="number"
                        value={m.theory}
                        onChange={(e) => handleMarksChange(m.id, 'theory', Number(e.target.value))}
                        style={{ width: 70, padding: "0.35rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)" }}
                      />
                    ) : (
                      <strong>{m.theory}</strong>
                    )}
                  </td>
                  <td>
                    {marksEditable ? (
                      <input 
                        type="number"
                        value={m.practical}
                        onChange={(e) => handleMarksChange(m.id, 'practical', Number(e.target.value))}
                        style={{ width: 70, padding: "0.35rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)" }}
                      />
                    ) : (
                      <strong>{m.practical}</strong>
                    )}
                  </td>
                  <td>
                    {marksEditable ? (
                      <input 
                        type="number"
                        value={m.internal}
                        onChange={(e) => handleMarksChange(m.id, 'internal', Number(e.target.value))}
                        style={{ width: 70, padding: "0.35rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)" }}
                      />
                    ) : (
                      <strong>{m.internal}</strong>
                    )}
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{m.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 5. GRADING SYSTEM ════════════ */}
      {activeTab === "grades" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1rem 0", color: "var(--text-heading)" }}>Define Class Grading Index Policy</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Grade Code</th>
                <th>Percentage Bracket</th>
                <th>GPA Score</th>
                <th>Evaluation Remarks</th>
              </tr>
            </thead>
            <tbody>
              {gradeSetup.map((g, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{g.grade}</td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{g.minPercent}% – {g.maxPercent}%</td>
                  <td><strong>{g.gpa}</strong></td>
                  <td style={{ fontSize: "0.85rem" }}>{g.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 6. RESULT GENERATION ════════════ */}
      {activeTab === "results" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1rem 0", color: "var(--text-heading)" }}>Auto-Compiled Student Rankings</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Class Rank</th>
                <th>Student Name</th>
                <th>Roll Number</th>
                <th>Total Score (100)</th>
                <th>Percentage Ratio</th>
                <th>Awarded Grade</th>
              </tr>
            </thead>
            <tbody>
              {generatedResults.map((r, idx) => (
                <tr key={idx}>
                  <td><span className="badge badge-success">Rank {r.rank}</span></td>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{r.name}</td>
                  <td style={{ fontFamily: "monospace" }}>{r.rollNo}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{r.total} / 100</td>
                  <td style={{ fontWeight: 700 }}>{r.percentage}</td>
                  <td><span className="badge badge-info">{r.grade}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 7. REPORT CARD BUILDER ════════════ */}
      {activeTab === "report_cards" && (
        <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "1.5rem", alignItems: "flex-start" }}>
          <div className="glass-card" style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <span style={{ padding: "0.5rem 0.75rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)" }}>SELECT TARGET STUDENT</span>
            {marksData.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMarkStudentId(m.id)}
                className={`btn ${selectedMarkStudentId === m.id ? "btn-primary" : "btn-secondary"}`}
                style={{ justifyContent: "flex-start", fontSize: "0.78rem", padding: "0.6rem 0.85rem" }}
              >
                {m.name}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="glass-card" style={{ width: "100%", maxWidth: 580, padding: "2rem", border: "2px solid var(--primary)", borderRadius: 16 }}>
              <div style={{ textAlign: "center", borderBottom: "1.5px solid var(--border-color)", paddingBottom: "1rem" }}>
                <strong style={{ fontSize: "1.35rem", color: "var(--text-heading)" }}>DELHI PUBLIC SCHOOL</strong>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>OFFICIAL PROGRESS INDEX REPORT</div>
                <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, marginTop: 4 }}>Academic Term Session: 2026 - 2027</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1rem 0", fontSize: "0.85rem", background: "var(--bg-input)", padding: "0.75rem", borderRadius: 8, border: "1px solid var(--border-color)" }}>
                <div>Student: <strong>{selectedDossierStudent.name}</strong></div>
                <div>Roll Code: <strong>{selectedDossierStudent.rollNo}</strong></div>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem", margin: "1.25rem 0" }}>
                <thead>
                  <tr style={{ borderBottom: "1.5px solid var(--border-color)", textTransform: "uppercase" }}>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Scholastic Stream</th>
                    <th style={{ padding: "0.5rem" }}>Theory / Ext</th>
                    <th style={{ padding: "0.5rem" }}>Prac / Int</th>
                    <th style={{ padding: "0.5rem" }}>Grade</th>
                    <th style={{ textAlign: "right", padding: "0.5rem" }}>Total Score</th>
                  </tr>
                </thead>
                <tbody>
                  {activeReportCard ? (
                    activeReportCard.subjects?.map((sub: any, idx: number) => (
                      <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "0.5rem", fontWeight: 700 }}>{sub.subjectId?.subjectName || "Subject"}</td>
                        <td style={{ textAlign: "center" }}>-</td>
                        <td style={{ textAlign: "center" }}>-</td>
                        <td style={{ textAlign: "center", color: "var(--primary)" }}>{sub.grade}</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", fontWeight: 700, color: "var(--primary)" }}>{sub.obtainedMarks} / {sub.maxMarks}</td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "0.5rem", fontWeight: 700 }}>Physics Paper</td>
                      <td style={{ textAlign: "center" }}>{selectedDossierStudent.theory}</td>
                      <td style={{ textAlign: "center" }}>{selectedDossierStudent.practical}</td>
                      <td style={{ textAlign: "center" }}>B+</td>
                      <td style={{ textAlign: "right", padding: "0.5rem", fontWeight: 700, color: "var(--primary)" }}>{selectedDossierStudent.theory + selectedDossierStudent.practical + selectedDossierStudent.internal}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div style={{ borderTop: "1.5px solid var(--border-color)", paddingTop: "1rem", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>REGISTRAR RECOLLECTION REMARKS</div>
                  <div style={{ fontSize: "0.825rem", color: "var(--text-main)", marginTop: 4 }}>&quot;{selectedDossierStudent.remarks}&quot;</div>
                </div>
                
                <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: "0.5rem", gap: "0.3rem" }}>
                  <Printer size={14} /> Print Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ 8. PUBLISH RESULTS ════════════ */}
      {activeTab === "publish" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1rem 0", color: "var(--text-heading)" }}>Result Publication Board</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Paper Code</th>
                <th>Class Mapping</th>
                <th>Subject Paper</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((sch) => {
                const isPub = publishedExams[sch.id];
                return (
                  <tr key={sch.id}>
                    <td style={{ fontWeight: 800 }}>{sch.id}</td>
                    <td>{sch.class}-{sch.section}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 700 }}>{sch.subject}</td>
                    <td>
                      <span className={`badge ${isPub ? "badge-success" : "badge-secondary"}`}>
                        {isPub ? "PUBLISHED TO PORTALS" : "DRAFT"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button 
                        onClick={() => {
                          setPublishedExams({ ...publishedExams, [sch.id]: !isPub });
                          alert(`Publish status toggled for ${sch.subject}!`);
                        }}
                        className={`btn ${isPub ? "btn-secondary" : "btn-primary"}`}
                        style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}
                      >
                        {isPub ? "Unpublish & Retract" : "Publish Ranks & Notify"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 9. RESULT ANALYTICS DASHBOARD ════════════ */}
      {activeTab === "analytics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* EXPORTS CONTROL BAR */}
          <div className="glass-card" style={{ padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Results Analytics &amp; Reports Exporter</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>Download consolidated scholastic grades ledger in enterprise spreadsheet formats.</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handleExportReport("exams", "csv")} className="btn btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", gap: "0.3rem" }}>
                <Download size={14} /> Export CSV
              </button>
              <button onClick={() => handleExportReport("exams", "excel")} className="btn btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", gap: "0.3rem" }}>
                <Download size={14} /> Export Excel
              </button>
              <button onClick={() => handleExportReport("exams", "pdf")} className="btn btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", gap: "0.3rem" }}>
                <FileText size={14} /> Export PDF
              </button>
            </div>
          </div>

          {/* KPI METRICS ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            <div className="glass-card" style={{ padding: "1.5rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 120, borderLeft: "4px solid var(--primary)" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Total Students</span>
                <strong style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-heading)", display: "block", marginTop: 4 }}>
                  {analyticsOverview?.students || "1,250"}
                </strong>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 700 }}>Active Enrollment</span>
            </div>

            <div className="glass-card" style={{ padding: "1.5rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 120, borderLeft: "4px solid #10b981" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Active Teachers</span>
                <strong style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-heading)", display: "block", marginTop: 4 }}>
                  {analyticsOverview?.teachers || "68"}
                </strong>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 700 }}>Staff Assigned</span>
            </div>

            <div className="glass-card" style={{ padding: "1.5rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 120, borderLeft: "4px solid #f59e0b" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Today's Attendance</span>
                <strong style={{ fontSize: "1.8rem", fontWeight: 900, color: "#f59e0b", display: "block", marginTop: 4 }}>
                  {analyticsOverview?.todayAttendance || "94.2%"}
                </strong>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Daily Live Ratio</span>
            </div>

            <div className="glass-card" style={{ padding: "1.5rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 120, borderLeft: "4px solid #f43f5e" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Average Result</span>
                <strong style={{ fontSize: "1.8rem", fontWeight: 900, color: "#f43f5e", display: "block", marginTop: 4 }}>
                  {analyticsOverview?.averageResult || "78.6%"}
                </strong>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Scholastic Aggregate</span>
            </div>
          </div>

          {/* WORKFLOW PENDING ACTIONS LIST & DOUBLE CHARTS ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem" }}>
            {/* PENDING STATS CHECKLIST */}
            <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-heading)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.6rem" }}>
                Academic Workflow Checklist
              </h3>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Homework Pending</span>
                <span className="badge badge-warning" style={{ fontSize: "0.78rem" }}>{analyticsOverview?.homeworkPending || 42} Active</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Exams Completed</span>
                <span className="badge badge-success" style={{ fontSize: "0.78rem" }}>{analyticsOverview?.examsCompleted || 8} Term(s)</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Results Pending</span>
                <span className="badge badge-danger" style={{ fontSize: "0.78rem" }}>{analyticsOverview?.resultsPending || 6} Class Roster</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Report Cards Pending</span>
                <span className="badge badge-secondary" style={{ fontSize: "0.78rem" }}>{analyticsOverview?.reportCardsPending || 18} Student(s)</span>
              </div>
            </div>

            {/* PRESET SVG ATTENDANCE GRAPH CARD */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1rem" }}>
                Weekly School Attendance Analytics & Trends
              </h3>
              <div style={{ padding: "0.5rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "rgba(0,0,0,0.02)" }}>
                <svg viewBox="0 0 500 180" style={{ width: "100%", height: "auto", display: "block" }}>
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(0,0,0,0.05)" />
                  <line x1="40" y1="60" x2="480" y2="60" stroke="rgba(0,0,0,0.05)" />
                  <line x1="40" y1="100" x2="480" y2="100" stroke="rgba(0,0,0,0.05)" />
                  <line x1="40" y1="140" x2="480" y2="140" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />

                  {/* Bezier Curve Trend Line */}
                  <path
                    d="M 60 110 C 130 90, 200 40, 270 55 S 390 100, 460 70"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Data Point Dots */}
                  <circle cx="60" cy="110" r="5" fill="var(--primary)" stroke="#fff" strokeWidth="2" />
                  <circle cx="160" cy="80" r="5" fill="var(--primary)" stroke="#fff" strokeWidth="2" />
                  <circle cx="260" cy="50" r="5" fill="var(--primary)" stroke="#fff" strokeWidth="2" />
                  <circle cx="360" cy="95" r="5" fill="var(--primary)" stroke="#fff" strokeWidth="2" />
                  <circle cx="460" cy="70" r="5" fill="var(--primary)" stroke="#fff" strokeWidth="2" />

                  {/* Labels */}
                  <text x="60" y="160" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Monday</text>
                  <text x="160" y="160" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Tuesday</text>
                  <text x="260" y="160" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Wednesday</text>
                  <text x="360" y="160" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Thursday</text>
                  <text x="460" y="160" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Friday</text>

                  <text x="30" y="24" fill="var(--text-muted)" fontSize="9" textAnchor="end">100%</text>
                  <text x="30" y="84" fill="var(--text-muted)" fontSize="9" textAnchor="end">95%</text>
                  <text x="30" y="144" fill="var(--text-muted)" fontSize="9" textAnchor="end">90%</text>
                </svg>
              </div>
            </div>
          </div>

          {/* DYNAMIC ACADEMIC SUBJECT AVERAGE BAR CHART */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1rem" }}>
              Scholastic Performance — Class Subject Averages
            </h3>
            <div style={{ padding: "0.5rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "rgba(0,0,0,0.02)" }}>
              <svg viewBox="0 0 500 180" style={{ width: "100%", height: "auto", display: "block" }}>
                {/* Y grids */}
                <line x1="50" y1="20" x2="480" y2="20" stroke="rgba(0,0,0,0.05)" />
                <line x1="50" y1="70" x2="480" y2="70" stroke="rgba(0,0,0,0.05)" />
                <line x1="50" y1="120" x2="480" y2="120" stroke="rgba(0,0,0,0.05)" />
                <line x1="50" y1="150" x2="480" y2="150" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />

                {/* Bars */}
                {/* Mathematics (76%) */}
                <rect x="75" y="50" width="30" height="100" fill="var(--primary)" rx="4" />
                {/* Science (81%) */}
                <rect x="155" y="42" width="30" height="108" fill="#10b981" rx="4" />
                {/* English (84%) */}
                <rect x="235" y="38" width="30" height="112" fill="#7c3aed" rx="4" />
                {/* Social Sci (74%) */}
                <rect x="315" y="55" width="30" height="95" fill="#f59e0b" rx="4" />
                {/* Hindi (76%) */}
                <rect x="395" y="50" width="30" height="100" fill="#f43f5e" rx="4" />

                {/* Labels */}
                <text x="90" y="165" fill="var(--text-muted)" fontSize="8.5" textAnchor="middle">Mathematics</text>
                <text x="170" y="165" fill="var(--text-muted)" fontSize="8.5" textAnchor="middle">Science</text>
                <text x="250" y="165" fill="var(--text-muted)" fontSize="8.5" textAnchor="middle">English</text>
                <text x="330" y="165" fill="var(--text-muted)" fontSize="8.5" textAnchor="middle">Social Sci</text>
                <text x="410" y="165" fill="var(--text-muted)" fontSize="8.5" textAnchor="middle">Hindi</text>

                <text x="40" y="24" fill="var(--text-muted)" fontSize="9" textAnchor="end">100</text>
                <text x="40" y="74" fill="var(--text-muted)" fontSize="9" textAnchor="end">75</text>
                <text x="40" y="124" fill="var(--text-muted)" fontSize="9" textAnchor="end">50</text>
              </svg>
            </div>
          </div>

          {/* CLASS PERFORMANCE ANALYTICS SECTION */}
          <div className="glass-card" style={{ padding: "1.75rem", borderLeft: "4px solid #8b5cf6" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Class Section Performance</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>Select academic division to view specific grades distribution and performance metrics.</p>
              </div>

              {/* Class & Section dropdown selectors */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  style={{ padding: "0.5rem 1rem", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-main)", fontWeight: 700, fontSize: "0.85rem" }}
                >
                  <option value="class8">Class 8</option>
                  <option value="class9">Class 9</option>
                  <option value="class10">Class 10</option>
                </select>

                <select
                  value={selectedSectionId}
                  onChange={(e) => setSelectedSectionId(e.target.value)}
                  style={{ padding: "0.5rem 1rem", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-main)", fontWeight: 700, fontSize: "0.85rem" }}
                >
                  <option value="sectionA">Section A</option>
                  <option value="sectionB">Section B</option>
                </select>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Students</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--text-heading)", display: "block", marginTop: 4 }}>
                  {classPerformance?.students || 42}
                </strong>
              </div>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Attendance</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--primary)", display: "block", marginTop: 4 }}>
                  {classPerformance?.attendance || "95%"}
                </strong>
              </div>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Average Marks</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "#10b981", display: "block", marginTop: 4 }}>
                  {classPerformance?.averageMarks || "78%"}
                </strong>
              </div>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Highest</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "#8b5cf6", display: "block", marginTop: 4 }}>
                  {classPerformance?.highest || "96%"}
                </strong>
              </div>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Lowest</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "#f43f5e", display: "block", marginTop: 4 }}>
                  {classPerformance?.lowest || "42%"}
                </strong>
              </div>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Pass Percentage</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "#10b981", display: "block", marginTop: 4 }}>
                  {classPerformance?.passPercentage || "92%"}
                </strong>
              </div>
            </div>

            {/* Subject-wise averages progress indicators */}
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "0.75rem" }}>Subject-wise Averages</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {(classPerformance?.subjectWise || [
                { subject: "Mathematics", score: "81%" },
                { subject: "Science", score: "76%" },
                { subject: "English", score: "84%" },
                { subject: "Hindi", score: "79%" }
              ]).map((subObj: any, index: number) => {
                const percentVal = parseInt(subObj.score) || 80;
                return (
                  <div key={index} style={{ background: "rgba(0,0,0,0.015)", padding: "0.85rem 1.1rem", borderRadius: "10px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)" }}>{subObj.subject}</span>
                      <strong style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)" }}>{subObj.score}</strong>
                    </div>
                    {/* Progress Bar Track */}
                    <div style={{ width: "100%", height: 6, background: "rgba(0,0,0,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ width: `${percentVal}%`, height: "100%", background: "linear-gradient(90deg, var(--primary) 0%, #8b5cf6 100%)", borderRadius: "99px" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TERM EXAM ANALYTICS SECTION */}
          <div className="glass-card" style={{ padding: "1.75rem", borderLeft: "4px solid #f43f5e" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Term Exam Analytics</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>Overview of participation rates, promotion percentages, and grades per exam session.</p>
              </div>

              {/* Term selector dropdown */}
              <div>
                <select
                  value={selectedExamTermId}
                  onChange={(e) => setSelectedExamTermId(e.target.value)}
                  style={{ padding: "0.5rem 1rem", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-main)", fontWeight: 700, fontSize: "0.85rem" }}
                >
                  <option value="annual">Annual Examination</option>
                  <option value="midterm">Mid-Term Examination</option>
                </select>
              </div>
            </div>

            {/* Exam metrics cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Students</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--text-heading)", display: "block", marginTop: 4 }}>
                  {examTermAnalytics?.students || 240}
                </strong>
              </div>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Appeared</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--primary)", display: "block", marginTop: 4 }}>
                  {examTermAnalytics?.appeared || 236}
                </strong>
              </div>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Passed</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "#10b981", display: "block", marginTop: 4 }}>
                  {examTermAnalytics?.passed || 218}
                </strong>
              </div>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Failed</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "#f43f5e", display: "block", marginTop: 4 }}>
                  {examTermAnalytics?.failed || 18}
                </strong>
              </div>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Pass %</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "#10b981", display: "block", marginTop: 4 }}>
                  {examTermAnalytics?.passPercentage || "92.37%"}
                </strong>
              </div>
              <div style={{ background: "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", display: "block" }}>Average Score</span>
                <strong style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--primary)", display: "block", marginTop: 4 }}>
                  {examTermAnalytics?.average || "76.4%"}
                </strong>
              </div>
            </div>

            {/* Subject performance averages */}
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "0.75rem" }}>Subject-wise Analysis</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {(examTermAnalytics?.subjectAnalysis || [
                { subject: "Mathematics", score: "72%" },
                { subject: "Science", score: "79%" },
                { subject: "English", score: "84%" },
                { subject: "Hindi", score: "88%" }
              ]).map((subObj: any, index: number) => {
                const percentVal = parseInt(subObj.score) || 75;
                return (
                  <div key={index} style={{ background: "rgba(0,0,0,0.015)", padding: "0.85rem 1.1rem", borderRadius: "10px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)" }}>{subObj.subject}</span>
                      <strong style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)" }}>{subObj.score}</strong>
                    </div>
                    {/* Progress Bar Track */}
                    <div style={{ width: "100%", height: 6, background: "rgba(0,0,0,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ width: `${percentVal}%`, height: "100%", background: "linear-gradient(90deg, #f43f5e 0%, #ef4444 100%)", borderRadius: "99px" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ════════════ 10. ADMISSION HALL TICKETS ════════════ */}
      {activeTab === "hall_tickets" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1rem 0", color: "var(--text-heading)" }}>
            Admission Hall Ticket Generation Console
          </h3>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Registration No</th>
                <th>Candidate Name</th>
                <th>Target Class</th>
                <th>Center Room</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 800 }}>REG-2026-081</td>
                <td>Abhinav Swamy</td>
                <td>Class 8 - Section A</td>
                <td>Room 301</td>
                <td style={{ textAlign: "right" }}>
                  <button onClick={() => alert("Printing Hall Ticket PDF...")} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}>
                    Print Admit Card
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800 }}>REG-2026-092</td>
                <td>Gautami Joshi</td>
                <td>Class 9 - Section B</td>
                <td>Room 302</td>
                <td style={{ textAlign: "right" }}>
                  <button onClick={() => alert("Printing Hall Ticket PDF...")} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}>
                    Print Admit Card
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ EDIT TYPES MODAL ════════════ */}
      {isTypeModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingTypeId ? "Edit Assessment Format" : "Add Assessment Format"}
              </h3>
              <button onClick={() => setIsTypeModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveType} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FORMAT NAME</label>
                <input type="text" value={typeForm.name} onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FINAL CGPA WEIGHTAGE</label>
                <input type="text" value={typeForm.weightage} onChange={(e) => setTypeForm({ ...typeForm, weightage: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FORMAT DESCRIPTION</label>
                <input type="text" value={typeForm.description} onChange={(e) => setTypeForm({ ...typeForm, description: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsTypeModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Format</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ EDIT SCHEDULE MODAL ════════════ */}
      {isScheduleModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "520px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingScheduleId ? "Edit Scheduled Exam Paper" : "Schedule Exam Paper"}
              </h3>
              <button onClick={() => setIsScheduleModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveSchedule} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CLASS NAME</label>
                  <input type="text" value={scheduleForm.class} onChange={(e) => setScheduleForm({ ...scheduleForm, class: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SECTION</label>
                  <input type="text" value={scheduleForm.section} onChange={(e) => setScheduleForm({ ...scheduleForm, section: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT PAPER</label>
                <input type="text" value={scheduleForm.subject} onChange={(e) => setScheduleForm({ ...scheduleForm, subject: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DATE SCHEDULED</label>
                  <input type="date" value={scheduleForm.date} onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TIME HOURS</label>
                  <input type="text" value={scheduleForm.time} onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EXAM CENTER ROOM</label>
                  <input type="text" value={scheduleForm.room} onChange={(e) => setScheduleForm({ ...scheduleForm, room: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>INVIGILATOR</label>
                  <input type="text" value={scheduleForm.invigilator} onChange={(e) => setScheduleForm({ ...scheduleForm, invigilator: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsScheduleModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Schedule Exam</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
