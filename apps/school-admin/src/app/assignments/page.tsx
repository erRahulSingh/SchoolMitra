"use client";

import React, { useState, useEffect } from "react";
import { 
  ClipboardList, Plus, X, CheckCircle2, Clock, Eye, 
  Calendar, Upload, Search, Filter, Edit3, Trash2, Save,
  FileText, BarChart2, BookOpen, User, Check, Download, Info
} from "lucide-react";

interface AssignmentRecord {
  id: string;
  title: string;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
  submissions: number;
  total: number;
  type: "Project" | "Worksheet" | "Coding" | "Writing";
  instructions?: string;
  maxMarks?: number;
}

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<"directory" | "create" | "evaluations">("directory");

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Default Assignments Data
  const defaultAssignments: AssignmentRecord[] = [
    { 
      id: "ASGN-001", 
      title: "Science Project — Solar System Model", 
      subject: "Science", 
      class: "Class 8-C", 
      teacher: "Dr. Vikram Malhotra", 
      dueDate: "2026-08-15", 
      submissions: 35, 
      total: 42, 
      type: "Project",
      instructions: "Construct a 3D model of the solar system using foam spheres.",
      maxMarks: 50
    },
    { 
      id: "ASGN-002", 
      title: "English Essay — My Dream India (2000 Words)", 
      subject: "English", 
      class: "Class 10-A", 
      teacher: "Ananya Deshmukh", 
      dueDate: "2026-08-12", 
      submissions: 28, 
      total: 38, 
      type: "Writing",
      instructions: "Focus on economic growth and youth empowerment.",
      maxMarks: 20
    },
    { 
      id: "ASGN-003", 
      title: "Mathematics — Trigonometry Worksheet #6", 
      subject: "Mathematics", 
      class: "Class 10-A", 
      teacher: "Sunita Rao", 
      dueDate: "2026-08-08", 
      submissions: 38, 
      total: 38, 
      type: "Worksheet",
      instructions: "Solve all trigonometric identity equations.",
      maxMarks: 10
    },
    { 
      id: "ASGN-004", 
      title: "Python — Build a Weather App (Mini Project)", 
      subject: "Computer Science", 
      class: "Class 9-A", 
      teacher: "Rajesh Kumar", 
      dueDate: "2026-08-20", 
      submissions: 12, 
      total: 40, 
      type: "Coding",
      instructions: "Integrate weather JSON API and show forecast.",
      maxMarks: 30
    }
  ];

  const [assignments, setAssignments] = useState<AssignmentRecord[]>(defaultAssignments);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<AssignmentRecord | null>(null);

  // Selected Assignment for detailed view / submissions
  const [selectedAssignmentForReview, setSelectedAssignmentForReview] = useState<AssignmentRecord>(defaultAssignments[0]);

  // Create Assignment Form State
  const [createForm, setCreateForm] = useState({
    title: "",
    subject: "Science",
    class: "Class 10-A",
    dueDate: "2026-08-15",
    type: "Project" as const,
    instructions: "",
    maxMarks: "30"
  });

  // LocalStorage Persist Load
  useEffect(() => {
    try {
      const cached = localStorage.getItem("sm_assignments_list");
      if (cached) setAssignments(JSON.parse(cached));
    } catch (e) {}
  }, []);

  const saveAssignments = (newList: AssignmentRecord[]) => {
    setAssignments(newList);
    try { localStorage.setItem("sm_assignments_list", JSON.stringify(newList)); } catch (e) {}
  };

  // Handlers
  const handleOpenEdit = (asgn: AssignmentRecord) => {
    setEditingAssignment({ ...asgn });
    setIsEditModalOpen(true);
  };

  const handleSaveEditAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAssignment) return;
    const updated = assignments.map(a => a.id === editingAssignment.id ? editingAssignment : a);
    saveAssignments(updated);
    setIsEditModalOpen(false);
    alert(`Assignment details updated for "${editingAssignment.title}"!`);
  };

  const handleDeleteAssignment = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete assignment "${title}"?`)) {
      const updated = assignments.filter(a => a.id !== id);
      saveAssignments(updated);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.title) return;

    const created: AssignmentRecord = {
      id: `ASGN-${String(assignments.length + 1).padStart(3, "0")}`,
      title: createForm.title,
      subject: createForm.subject,
      class: createForm.class,
      teacher: "You (Admin)",
      dueDate: createForm.dueDate,
      submissions: 0,
      total: 40,
      type: createForm.type,
      instructions: createForm.instructions,
      maxMarks: Number(createForm.maxMarks)
    };

    const updated = [created, ...assignments];
    saveAssignments(updated);
    alert(`Assignment "${created.title}" published successfully!`);
    setActiveTab("directory");
  };

  // Filtered List
  const filteredAssignments = assignments.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || a.class.toLowerCase().includes(filterClass.toLowerCase());
    const matchesType = filterType === "all" || a.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesClass && matchesType;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Assignments &amp; Projects Hub <ClipboardList size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0, fontSize: "0.85rem" }}>
            Create and track long-form projects, writing logs, coding tasks, and worksheets.
          </p>
        </div>

        <button onClick={() => setActiveTab("create")} className="btn btn-primary" style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}>
          <Plus size={16} /> Create Assignment Task
        </button>
      </div>

      {/* SUB-TABS NAVIGATION BAR */}
      <div className="glass-card" style={{ padding: "0.6rem", display: "flex", gap: "0.5rem", overflowX: "auto", whiteSpace: "nowrap" }}>
        {[
          { id: "directory", label: "Assignments Dashboard", icon: ClipboardList },
          { id: "create", label: "Publish New Assignment", icon: Plus },
          { id: "evaluations", label: "Project Evaluations", icon: Eye }
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

      {/* ════════════ MODULE 1: ASSIGNMENTS DIRECTORY ════════════ */}
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
                  placeholder="Search by assignment title or subject..."
                  style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>

              <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} style={{ padding: "0.65rem 0.9rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem" }}>
                <option value="all">All Classes</option>
                <option value="10">Class 10</option>
                <option value="9">Class 9</option>
                <option value="8">Class 8</option>
              </select>

              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: "0.65rem 0.9rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem" }}>
                <option value="all">All Types</option>
                <option value="project">Project</option>
                <option value="worksheet">Worksheet</option>
                <option value="coding">Coding</option>
                <option value="writing">Writing</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
            {filteredAssignments.map((a) => {
              const pct = Math.round((a.submissions / a.total) * 100);
              return (
                <div key={a.id} className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-heading)" }}>{a.title}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700, marginTop: 3 }}>
                        {a.subject} &bull; {a.class} &bull; By {a.teacher}
                      </div>
                    </div>
                    <span className="badge badge-info">{a.type}</span>
                  </div>

                  <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Calendar size={14} color="#f59e0b" /> Due: <strong style={{ color: "#f59e0b" }}>{a.dueDate}</strong>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <CheckCircle2 size={14} color="var(--success)" /> <strong>{a.submissions}/{a.total}</strong> Submitted
                    </div>
                  </div>

                  {/* Submission Progress Bar */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)", marginTop: 4 }}>
                    <div style={{ width: "80%", height: 8, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: pct === 100 ? "var(--success)" : "var(--primary)" }} />
                    </div>
                    <span style={{ fontWeight: 800, color: "var(--text-heading)", fontSize: "0.85rem" }}>{pct}%</span>
                  </div>

                  {/* Actions Area */}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: 4 }}>
                    <button 
                      onClick={() => { setSelectedAssignmentForReview(a); setActiveTab("evaluations"); }}
                      className="btn btn-secondary" 
                      style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                    >
                      <Eye size={13} /> Submissions
                    </button>

                    <button 
                      onClick={() => handleOpenEdit(a)}
                      className="btn btn-primary" 
                      style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                    >
                      <Edit3 size={13} /> Edit
                    </button>

                    <button 
                      onClick={() => handleDeleteAssignment(a.id, a.title)}
                      className="btn btn-secondary" 
                      style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ════════════ MODULE 2: CREATE ASSIGNMENT DESK ════════════ */}
      {activeTab === "create" && (
        <div className="glass-card" style={{ padding: "1.75rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 1.25rem 0", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Plus size={20} color="var(--primary)" /> Publish Long-Form Project / Assignment
          </h3>

          <form onSubmit={handleCreateSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGNMENT TITLE</label>
              <input 
                type="text" 
                value={createForm.title}
                onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                placeholder="e.g. Science Project — Solar System Model" 
                required 
                style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGNMENT TYPE</label>
                <select 
                  value={createForm.type}
                  onChange={(e) => setCreateForm({ ...createForm, type: e.target.value as any })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
                >
                  <option value="Project">Project</option>
                  <option value="Worksheet">Worksheet</option>
                  <option value="Coding">Coding</option>
                  <option value="Writing">Writing</option>
                </select>
              </div>

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
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT</label>
                <input 
                  type="text" 
                  value={createForm.subject}
                  onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TARGET CLASS</label>
                <input 
                  type="text" 
                  value={createForm.class}
                  onChange={(e) => setCreateForm({ ...createForm, class: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PROJECT GUIDELINES &amp; DESCRIPTION</label>
              <textarea 
                rows={3} 
                value={createForm.instructions}
                onChange={(e) => setCreateForm({ ...createForm, instructions: e.target.value })}
                placeholder="Detail the grading rubric, format requirements, and guidelines..."
                style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "0.5rem" }}>
              Publish Assignment Task
            </button>
          </form>
        </div>
      )}

      {/* ════════════ MODULE 3: EVALUATIONS DESK ════════════ */}
      {activeTab === "evaluations" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1rem 0", color: "var(--text-heading)" }}>
            Project Submission Evaluation: <span style={{ color: "var(--primary)" }}>{selectedAssignmentForReview.title}</span>
          </h3>

          <div style={{ background: "var(--bg-input)", padding: "1rem", borderRadius: 10, border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <div>SUBJECT: <strong style={{ color: "var(--text-heading)" }}>{selectedAssignmentForReview.subject}</strong></div>
            <div>CLASS ALLOCATION: <strong>{selectedAssignmentForReview.class}</strong></div>
            <div>MAXIMUM MARKS: <strong>{selectedAssignmentForReview.maxMarks || 30} Marks</strong></div>
            <div>GUIDELINES: <span style={{ color: "var(--text-muted)" }}>{selectedAssignmentForReview.instructions || "Construct model using recyclable materials."}</span></div>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>STUDENT NAME</th>
                  <th>SUBMITTED FILE</th>
                  <th>MARKS OBTAINED</th>
                  <th>EVALUATION REMARKS</th>
                  <th style={{ textAlign: "right" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Rahul Verma", file: "solar_system_project_rahul.pdf", marks: "45 / 50", remarks: "Great choice of sphere sizes!" },
                  { name: "Neha Sharma", file: "solar_system_project_neha.pdf", marks: "42 / 50", remarks: "Nicely colored model." }
                ].map((s, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{s.name}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 700, cursor: "pointer" }}>{s.file}</td>
                    <td style={{ fontWeight: 900, color: "var(--success)" }}>{s.marks}</td>
                    <td style={{ fontSize: "0.82rem" }}>{s.remarks}</td>
                    <td style={{ textAlign: "right" }}>
                      <button onClick={() => alert("Marks evaluated and sent to Student report card database!")} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}>
                        Re-evaluate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ EDIT ASSIGNMENT MODAL ════════════ */}
      {isEditModalOpen && editingAssignment && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "520px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Edit Assignment Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveEditAssignment} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGNMENT TITLE</label>
                <input type="text" value={editingAssignment.title} onChange={(e) => setEditingAssignment({ ...editingAssignment, title: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT</label>
                  <input type="text" value={editingAssignment.subject} onChange={(e) => setEditingAssignment({ ...editingAssignment, subject: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DUE DATE</label>
                  <input type="date" value={editingAssignment.dueDate} onChange={(e) => setEditingAssignment({ ...editingAssignment, dueDate: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
