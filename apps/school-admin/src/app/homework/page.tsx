"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, Plus, X, Paperclip, Calendar, Clock, 
  CheckCircle2, AlertCircle, Eye, BookOpen, Download, Upload,
  Search, Filter, Edit3, Trash2, Save, Send, RefreshCw, BarChart2, CheckSquare, Award
} from "lucide-react";

interface HomeworkRecord {
  id: string;
  title: string;
  subject: string;
  class: string;
  teacher: string;
  assignedDate: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: "Active" | "Completed" | "Overdue";
  instructions?: string;
  attachmentName?: string;
  maxMarks?: number;
}

interface SubmissionRecord {
  id: string;
  studentName: string;
  rollNo: string;
  submittedAt: string;
  status: "Submitted" | "Evaluated" | "Late";
  marks: string;
  remarks: string;
  fileLink: string;
}

export default function HomeworkPage() {
  const [activeTab, setActiveTab] = useState<"directory" | "create" | "submissions" | "analytics">("directory");

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");

  // Default Homework Data
  const defaultHomeworks: HomeworkRecord[] = [
    {
      id: "HW-001",
      title: "Physics Lab Experiment #4 — Reflection & Refraction",
      subject: "Physics",
      class: "Class 10-A",
      teacher: "Dr. Vikram Malhotra",
      assignedDate: "2026-08-01",
      dueDate: "2026-08-10",
      submissions: 32,
      totalStudents: 38,
      status: "Active",
      instructions: "Complete Ray Diagrams in your lab notebook.",
      maxMarks: 20
    },
    {
      id: "HW-002",
      title: "Essay Writing — India's Freedom Movement (1200 Words)",
      subject: "History",
      class: "Class 9-B",
      teacher: "Ananya Deshmukh",
      assignedDate: "2026-07-28",
      dueDate: "2026-08-05",
      submissions: 35,
      totalStudents: 35,
      status: "Completed",
      instructions: "Focus on Salt Satyagraha and Quit India Movement.",
      maxMarks: 15
    },
    {
      id: "HW-003",
      title: "Quadratic Equations — Exercise 4.3 (NCERT Textbook)",
      subject: "Mathematics",
      class: "Class 10-A",
      teacher: "Sunita Rao",
      assignedDate: "2026-08-02",
      dueDate: "2026-08-08",
      submissions: 38,
      totalStudents: 38,
      status: "Completed",
      instructions: "Solve Question 1 to 10 step-by-step.",
      maxMarks: 10
    }
  ];

  const [homeworks, setHomeworks] = useState<HomeworkRecord[]>(defaultHomeworks);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingHomework, setEditingHomework] = useState<HomeworkRecord | null>(null);

  // Selected Submissions View State
  const [selectedHomeworkForSubmissions, setSelectedHomeworkForSubmissions] = useState<HomeworkRecord>(defaultHomeworks[0]);
  const [submissionsList, setSubmissionsList] = useState<SubmissionRecord[]>([
    { id: "SUB-1", studentName: "Aarav Sharma", rollNo: "10-A-01", submittedAt: "04 Aug, 04:30 PM", status: "Evaluated", marks: "18 / 20", remarks: "Excellent ray diagrams!", fileLink: "physics_lab_aarav.pdf" },
    { id: "SUB-2", studentName: "Ananya Patel", rollNo: "10-A-02", submittedAt: "05 Aug, 09:15 AM", status: "Submitted", marks: "Pending", remarks: "Awaiting evaluation", fileLink: "physics_lab_ananya.pdf" }
  ]);

  // Create Homework Form State
  const [createForm, setCreateForm] = useState({
    title: "",
    subject: "Physics",
    class: "Class 10-A",
    dueDate: "2026-08-15",
    instructions: "",
    maxMarks: "20"
  });

  const [homeworkAnalytics, setHomeworkAnalytics] = useState<any>({
    overview: { published: 342, completed: 289, pending: 53 },
    classWise: [
      { className: "8-A", rate: 91 },
      { className: "8-B", rate: 87 },
      { className: "9-A", rate: 94 }
    ]
  });

  useEffect(() => {
    if (activeTab === "analytics") {
      fetch("http://localhost:5000/api/v1/admin/analytics/homework-details")
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data) {
            setHomeworkAnalytics(json.data);
          }
        })
        .catch(err => console.warn("Homework details fetch failed:", err));
    }
  }, [activeTab]);

  // LocalStorage Persist Load
  useEffect(() => {
    try {
      const cached = localStorage.getItem("sm_homework_list");
      if (cached) setHomeworks(JSON.parse(cached));
    } catch (e) {}
  }, []);

  const saveHomeworks = (newList: HomeworkRecord[]) => {
    setHomeworks(newList);
    try { localStorage.setItem("sm_homework_list", JSON.stringify(newList)); } catch (e) {}
  };

  // Handlers
  const handleOpenEdit = (hw: HomeworkRecord) => {
    setEditingHomework({ ...hw });
    setIsEditModalOpen(true);
  };

  const handleSaveEditHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHomework) return;
    const updated = homeworks.map(h => h.id === editingHomework.id ? editingHomework : h);
    saveHomeworks(updated);
    setIsEditModalOpen(false);
    alert(`Homework assignment "${editingHomework.title}" updated!`);
  };

  const handleDeleteHomework = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete homework "${title}"?`)) {
      const updated = homeworks.filter(h => h.id !== id);
      saveHomeworks(updated);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.title) return;

    const created: HomeworkRecord = {
      id: `HW-${String(homeworks.length + 1).padStart(3, "0")}`,
      title: createForm.title,
      subject: createForm.subject,
      class: createForm.class,
      teacher: "Principal Office / Admin",
      assignedDate: new Date().toISOString().split("T")[0],
      dueDate: createForm.dueDate,
      submissions: 0,
      totalStudents: 38,
      status: "Active",
      instructions: createForm.instructions,
      maxMarks: Number(createForm.maxMarks)
    };

    const updated = [created, ...homeworks];
    saveHomeworks(updated);
    alert(`New Homework "${created.title}" assigned successfully!`);
    setActiveTab("directory");
  };

  // Filtered List
  const filteredHomeworks = homeworks.filter(h => {
    const matchesSearch = h.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          h.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || h.class.toLowerCase().includes(filterClass.toLowerCase());
    const matchesSubject = filterSubject === "all" || h.subject.toLowerCase() === filterSubject.toLowerCase();
    return matchesSearch && matchesClass && matchesSubject;
  });

  const handleExportReport = (type: string, format: string) => {
    window.open(`http://localhost:5000/api/v1/admin/analytics/export?type=${type}&format=${format}`, '_blank');
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Homework &amp; Assignment Desk <FileText size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0, fontSize: "0.85rem" }}>
            Assign homework with PDF/Image attachments, evaluate student submissions, track deadlines, and dispatch parent alerts.
          </p>
        </div>

        <button onClick={() => setActiveTab("create")} className="btn btn-primary" style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}>
          <Plus size={16} /> Create Homework Assignment
        </button>
      </div>

      {/* SUB-TABS NAVIGATION BAR */}
      <div className="glass-card" style={{ padding: "0.6rem", display: "flex", gap: "0.5rem", overflowX: "auto", whiteSpace: "nowrap" }}>
        {[
          { id: "directory", label: "Homework Directory", icon: FileText },
          { id: "create", label: "Assign Homework Desk", icon: Plus },
          { id: "submissions", label: "Submission Evaluations", icon: Award },
          { id: "analytics", label: "Homework Analytics", icon: BarChart2 }
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

      {/* STATS STRIP */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        <div className="glass-card" style={{ padding: "1.15rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>TOTAL ASSIGNED</span>
          <strong style={{ fontSize: "1.6rem", color: "var(--primary)", display: "block", marginTop: 2 }}>{homeworks.length}</strong>
        </div>

        <div className="glass-card" style={{ padding: "1.15rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>ACTIVE (PENDING)</span>
          <strong style={{ fontSize: "1.6rem", color: "#f59e0b", display: "block", marginTop: 2 }}>
            {homeworks.filter(h => h.status === "Active").length}
          </strong>
        </div>

        <div className="glass-card" style={{ padding: "1.15rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>COMPLETED</span>
          <strong style={{ fontSize: "1.6rem", color: "var(--success)", display: "block", marginTop: 2 }}>
            {homeworks.filter(h => h.status === "Completed").length}
          </strong>
        </div>

        <div className="glass-card" style={{ padding: "1.15rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>AVG SUBMISSION RATE</span>
          <strong style={{ fontSize: "1.6rem", color: "#38bdf8", display: "block", marginTop: 2 }}>91.5%</strong>
        </div>
      </div>

      {/* ════════════ MODULE 1: HOMEWORK DIRECTORY ════════════ */}
      {activeTab === "directory" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {/* Toolbar */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "1rem", flex: 1, maxWidth: 560, flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by homework title or subject..."
                  style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>

              <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} style={{ padding: "0.65rem 0.9rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem" }}>
                <option value="all">All Classes</option>
                <option value="10">Class 10</option>
                <option value="9">Class 9</option>
                <option value="8">Class 8</option>
              </select>

              <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} style={{ padding: "0.65rem 0.9rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem" }}>
                <option value="all">All Subjects</option>
                <option value="physics">Physics</option>
                <option value="mathematics">Mathematics</option>
                <option value="history">History</option>
              </select>
            </div>
          </div>

          {/* Homework Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ASSIGNMENT TITLE</th>
                    <th>SUBJECT</th>
                    <th>TARGET CLASS</th>
                    <th>FACULTY ASSIGNED</th>
                    <th>DUE DATE</th>
                    <th>SUBMISSIONS</th>
                    <th>STATUS</th>
                    <th style={{ textAlign: "right" }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHomeworks.map(h => (
                    <tr key={h.id}>
                      <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{h.title}</td>
                      <td><span className="badge badge-info">{h.subject}</span></td>
                      <td style={{ fontWeight: 700, color: "var(--primary)" }}>{h.class}</td>
                      <td style={{ fontSize: "0.82rem" }}>{h.teacher}</td>
                      <td style={{ fontSize: "0.82rem", fontWeight: 700 }}>{h.dueDate}</td>
                      <td style={{ fontWeight: 800 }}>{h.submissions} / {h.totalStudents}</td>
                      <td>
                        <span className={`badge ${h.status === "Completed" ? "badge-success" : "badge-warning"}`}>
                          {h.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                        <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                          <button 
                            onClick={() => { setSelectedHomeworkForSubmissions(h); setActiveTab("submissions"); }}
                            className="btn btn-secondary" 
                            style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                          >
                            <Eye size={13} /> Submissions
                          </button>
                          <button 
                            onClick={() => handleOpenEdit(h)}
                            className="btn btn-primary" 
                            style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                          >
                            <Edit3 size={13} /> Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteHomework(h.id, h.title)}
                            className="btn btn-secondary" 
                            style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}
                          >
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

        </div>
      )}

      {/* ════════════ MODULE 2: CREATE HOMEWORK DESK ════════════ */}
      {activeTab === "create" && (
        <div className="glass-card" style={{ padding: "1.75rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 1.25rem 0", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Plus size={20} color="var(--primary)" /> Assign New Homework Task
          </h3>

          <form onSubmit={handleCreateSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>HOMEWORK TASK TITLE</label>
              <input 
                type="text" 
                value={createForm.title}
                onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                placeholder="e.g. Physics Lab Experiment #5" 
                required 
                style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT</label>
                <select 
                  value={createForm.subject}
                  onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
                >
                  <option value="Physics">Physics</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="History">History</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TARGET CLASS &amp; SECTION</label>
                <select 
                  value={createForm.class}
                  onChange={(e) => setCreateForm({ ...createForm, class: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
                >
                  <option value="Class 10-A">Class 10-A</option>
                  <option value="Class 9-B">Class 9-B</option>
                  <option value="Class 8-C">Class 8-C</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DUE DATE</label>
                <input 
                  type="date" 
                  value={createForm.dueDate}
                  onChange={(e) => setCreateForm({ ...createForm, dueDate: e.target.value })}
                  required
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MAXIMUM MARKS</label>
                <input 
                  type="number" 
                  value={createForm.maxMarks}
                  onChange={(e) => setCreateForm({ ...createForm, maxMarks: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DETAILED INSTRUCTIONS &amp; GUIDELINES</label>
              <textarea 
                rows={3} 
                value={createForm.instructions}
                onChange={(e) => setCreateForm({ ...createForm, instructions: e.target.value })}
                placeholder="Write step-by-step instructions for students..."
                style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "0.5rem" }}>
              Assign Homework Task
            </button>
          </form>
        </div>
      )}

      {/* ════════════ MODULE 3: SUBMISSION EVALUATIONS ════════════ */}
      {activeTab === "submissions" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                Submissions for: <span style={{ color: "var(--primary)" }}>{selectedHomeworkForSubmissions.title}</span>
              </h3>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>
                Class: {selectedHomeworkForSubmissions.class} &bull; Max Marks: {selectedHomeworkForSubmissions.maxMarks || 20}
              </div>
            </div>

            <button onClick={() => alert("Downloading bulk PDF submissions package...")} className="btn btn-secondary" style={{ padding: "0.4rem 0.85rem", fontSize: "0.78rem" }}>
              <Download size={14} /> Export Submissions ZIP
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>STUDENT NAME</th>
                  <th>ROLL NUMBER</th>
                  <th>SUBMITTED TIME</th>
                  <th>STATUS</th>
                  <th>MARKS OBTAINED</th>
                  <th>FACULTY REMARKS</th>
                  <th style={{ textAlign: "right" }}>EVALUATE</th>
                </tr>
              </thead>
              <tbody>
                {submissionsList.map(sub => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{sub.studentName}</td>
                    <td style={{ fontFamily: "monospace", fontWeight: 700 }}>{sub.rollNo}</td>
                    <td style={{ fontSize: "0.82rem" }}>{sub.submittedAt}</td>
                    <td><span className="badge badge-success">{sub.status}</span></td>
                    <td style={{ fontWeight: 900, color: "var(--primary)" }}>{sub.marks}</td>
                    <td style={{ fontSize: "0.82rem" }}>{sub.remarks}</td>
                    <td style={{ textAlign: "right" }}>
                      <button onClick={() => {
                        const newMarks = prompt(`Enter marks for ${sub.studentName} (out of 20):`, "19");
                        if (newMarks) {
                          setSubmissionsList(submissionsList.map(s => s.id === sub.id ? { ...s, marks: `${newMarks} / 20`, status: "Evaluated" } : s));
                        }
                      }} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}>
                        Evaluate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ MODULE 4: ANALYTICS ════════════ */}
      {activeTab === "analytics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* EXPORTS CONTROL BAR */}
          <div className="glass-card" style={{ padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Homework Performance &amp; Operations Exporter</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>Download consolidated class assignments and evaluation logs in enterprise formats.</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handleExportReport("homework", "csv")} className="btn btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", gap: "0.3rem" }}>
                Export CSV
              </button>
              <button onClick={() => handleExportReport("homework", "excel")} className="btn btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", gap: "0.3rem" }}>
                Export Excel
              </button>
              <button onClick={() => handleExportReport("homework", "pdf")} className="btn btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", gap: "0.3rem" }}>
                Export PDF
              </button>
            </div>
          </div>

          {/* Overview Cards Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            <div className="glass-card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Published Tasks</span>
              <strong style={{ fontSize: "1.85rem", fontWeight: 900, color: "var(--text-heading)", display: "block", marginTop: 4 }}>
                {homeworkAnalytics?.overview?.published || 342}
              </strong>
              <span style={{ fontSize: "0.75rem", color: "var(--text-light)", display: "block", marginTop: 4 }}>Total Assigned Tasks</span>
            </div>

            <div className="glass-card" style={{ padding: "1.5rem", borderLeft: "4px solid #10b981" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Completed Tasks</span>
              <strong style={{ fontSize: "1.85rem", fontWeight: 900, color: "#10b981", display: "block", marginTop: 4 }}>
                {homeworkAnalytics?.overview?.completed || 289}
              </strong>
              <span style={{ fontSize: "0.75rem", color: "var(--text-light)", display: "block", marginTop: 4 }}>Evaluated & Closed</span>
            </div>

            <div className="glass-card" style={{ padding: "1.5rem", borderLeft: "4px solid #f59e0b" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Pending Evaluation</span>
              <strong style={{ fontSize: "1.85rem", fontWeight: 900, color: "#f59e0b", display: "block", marginTop: 4 }}>
                {homeworkAnalytics?.overview?.pending || 53}
              </strong>
              <span style={{ fontSize: "0.75rem", color: "var(--text-light)", display: "block", marginTop: 4 }}>Awaiting Teacher Action</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* Class-wise submission rate list */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1.25rem 0", color: "var(--text-heading)" }}>Class-Wise Homework Performance</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {(homeworkAnalytics?.classWise || [
                  { className: "8-A", rate: 91 },
                  { className: "8-B", rate: 87 },
                  { className: "9-A", rate: 94 }
                ]).map((c: any) => (
                  <div key={c.className} style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                      <strong style={{ color: "var(--text-heading)" }}>Class {c.className}</strong>
                      <strong style={{ color: "var(--primary)" }}>{c.rate}% Completion</strong>
                    </div>
                    <div style={{ width: "100%", height: 8, background: "rgba(0,0,0,0.05)", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: `${c.rate}%`, height: "100%", background: "linear-gradient(90deg, var(--primary) 0%, #8b5cf6 100%)", borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overdue Task Reminders */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1.25rem 0", color: "var(--text-heading)" }}>Defaulters Escalation Panel</h3>
              <div style={{ padding: "1.25rem", background: "rgba(245, 158, 11, 0.08)", borderRadius: 12, border: "1px solid rgba(245, 158, 11, 0.25)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ fontWeight: 800, color: "#f59e0b", fontSize: "0.9rem" }}>⚠️ High Volume Pending Actions Detected</div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
                  There are currently <strong>53 tasks</strong> awaiting submission across all sections. 8-B has the highest default rate.
                </p>
                <button onClick={() => alert("WhatsApp alert notifications dispatched to parents!")} className="btn btn-primary" style={{ padding: "0.55rem 1rem", fontSize: "0.8rem", width: "fit-content", fontWeight: 700 }}>
                  Notify Parent Accounts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ EDIT HOMEWORK MODAL ════════════ */}
      {isEditModalOpen && editingHomework && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "520px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Edit Homework Task</h3>
              <button onClick={() => setIsEditModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveEditHomework} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGNMENT TITLE</label>
                <input type="text" value={editingHomework.title} onChange={(e) => setEditingHomework({ ...editingHomework, title: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT</label>
                  <input type="text" value={editingHomework.subject} onChange={(e) => setEditingHomework({ ...editingHomework, subject: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DUE DATE</label>
                  <input type="date" value={editingHomework.dueDate} onChange={(e) => setEditingHomework({ ...editingHomework, dueDate: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STATUS</label>
                <select value={editingHomework.status} onChange={(e) => setEditingHomework({ ...editingHomework, status: e.target.value as any })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
