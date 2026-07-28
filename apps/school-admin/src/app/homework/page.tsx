"use client";

import React, { useState } from "react";
import { 
  FileText, Plus, X, Paperclip, Calendar, Clock, 
  CheckCircle2, AlertCircle, Eye, BookOpen, Download, Upload 
} from "lucide-react";

export default function HomeworkPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [homeworks, setHomeworks] = useState([
    {
      id: "HW-001",
      title: "Physics Lab Experiment #4 — Reflection & Refraction",
      subject: "Physics",
      class: "Class 10-A",
      teacher: "Dr. Vikram Malhotra",
      assignedDate: "28 Jul 2026",
      dueDate: "31 Jul 2026",
      submissions: 32,
      totalStudents: 38,
      status: "Active"
    },
    {
      id: "HW-002",
      title: "Essay Writing — India's Freedom Movement (1200 Words)",
      subject: "History",
      class: "Class 9-B",
      teacher: "Ananya Deshmukh",
      assignedDate: "27 Jul 2026",
      dueDate: "30 Jul 2026",
      submissions: 28,
      totalStudents: 35,
      status: "Active"
    },
    {
      id: "HW-003",
      title: "Quadratic Equations — Exercise 4.3 (NCERT Textbook)",
      subject: "Mathematics",
      class: "Class 10-A",
      teacher: "Sunita Rao",
      assignedDate: "26 Jul 2026",
      dueDate: "28 Jul 2026",
      submissions: 38,
      totalStudents: 38,
      status: "Completed"
    },
    {
      id: "HW-004",
      title: "Python Programming — Build a Simple Calculator App",
      subject: "Computer Science",
      class: "Class 8-C",
      teacher: "Rajesh Kumar",
      assignedDate: "25 Jul 2026",
      dueDate: "29 Jul 2026",
      submissions: 18,
      totalStudents: 42,
      status: "Active"
    }
  ]);

  // Form State
  const [newHW, setNewHW] = useState({ title: "", subject: "Physics", class: "Class 10-A", dueDate: "" });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHW.title) return;
    const created = {
      id: `HW-${String(homeworks.length + 1).padStart(3, "0")}`,
      title: newHW.title,
      subject: newHW.subject,
      class: newHW.class,
      teacher: "You (Admin)",
      assignedDate: "29 Jul 2026",
      dueDate: newHW.dueDate || "02 Aug 2026",
      submissions: 0,
      totalStudents: 38,
      status: "Active"
    };
    setHomeworks([created, ...homeworks]);
    setIsCreateOpen(false);
    setNewHW({ title: "", subject: "Physics", class: "Class 10-A", dueDate: "" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
        border: "1px solid var(--border-glow)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem 1.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Homework & Daily Assignments <FileText size={24} color="#f59e0b" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Assign homework with PDF/Image attachments, track submission rates, and manage deadlines.
          </p>
        </div>
        <button onClick={() => setIsCreateOpen(true)} className="btn btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
          <Plus size={18} /> Create Homework
        </button>
      </div>

      {/* STATS STRIP */}
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

      {/* HOMEWORK CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
        {homeworks.map((hw) => (
          <div key={hw.id} className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{hw.title}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600, marginTop: 2 }}>
                  {hw.subject} • {hw.class} • By {hw.teacher}
                </div>
              </div>
              <span className={`badge ${hw.status === "Active" ? "badge-warning" : "badge-success"}`}>{hw.status}</span>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
              <div><Calendar size={13} style={{ verticalAlign: "middle", marginRight: 4 }} />Assigned: {hw.assignedDate}</div>
              <div><Clock size={13} style={{ verticalAlign: "middle", marginRight: 4 }} />Due: <strong style={{ color: "#f59e0b" }}>{hw.dueDate}</strong></div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Submissions</div>
                <div style={{ fontWeight: 800, color: "#fff" }}>
                  {hw.submissions} / {hw.totalStudents}
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: 6 }}>
                    ({Math.round(hw.submissions / hw.totalStudents * 100)}%)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ width: 120, height: 8, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{
                  width: `${Math.round(hw.submissions / hw.totalStudents * 100)}%`,
                  height: "100%",
                  borderRadius: 99,
                  background: hw.submissions === hw.totalStudents ? "var(--success)" : "var(--primary)"
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE HOMEWORK MODAL */}
      {isCreateOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 520, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Create New Homework Assignment</h3>
              <button onClick={() => setIsCreateOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>HOMEWORK TITLE</label>
                <input type="text" value={newHW.title} onChange={(e) => setNewHW({ ...newHW, title: e.target.value })} placeholder="e.g. NCERT Exercise 4.3 — Quadratic Equations" required
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT</label>
                  <select value={newHW.subject} onChange={(e) => setNewHW({ ...newHW, subject: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}>
                    {["Physics", "Chemistry", "Biology", "Mathematics", "English", "History", "Computer Science"].map(s => <option key={s} value={s} style={{ background: "#0b0f19" }}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CLASS</label>
                  <select value={newHW.class} onChange={(e) => setNewHW({ ...newHW, class: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}>
                    {["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B", "Class 8-C"].map(c => <option key={c} value={c} style={{ background: "#0b0f19" }}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DUE DATE</label>
                <input type="date" value={newHW.dueDate} onChange={(e) => setNewHW({ ...newHW, dueDate: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} />
              </div>

              {/* Upload Area */}
              <div style={{ border: "2px dashed var(--border-color)", padding: "1.25rem", borderRadius: "var(--radius-md)", textAlign: "center", color: "var(--text-muted)" }}>
                <Upload size={28} style={{ margin: "0 auto 0.4rem auto", color: "var(--primary)" }} />
                <div style={{ fontSize: "0.82rem" }}>Drag & drop PDF / Image attachments here</div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsCreateOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Assign Homework</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
