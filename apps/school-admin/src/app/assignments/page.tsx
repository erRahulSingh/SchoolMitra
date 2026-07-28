"use client";

import React, { useState } from "react";
import { ClipboardList, Plus, X, CheckCircle2, Clock, Eye, Calendar, Upload } from "lucide-react";

export default function AssignmentsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const assignments = [
    { id: "ASGN-001", title: "Science Project — Solar System Model", subject: "Science", class: "Class 8-C", teacher: "Dr. Vikram Malhotra", dueDate: "05 Aug 2026", submissions: 35, total: 42, type: "Project" },
    { id: "ASGN-002", title: "English Essay — My Dream India (2000 Words)", subject: "English", class: "Class 10-A", teacher: "Ananya Deshmukh", dueDate: "02 Aug 2026", submissions: 28, total: 38, type: "Writing" },
    { id: "ASGN-003", title: "Mathematics — Trigonometry Worksheet #6", subject: "Mathematics", class: "Class 10-A", teacher: "Sunita Rao", dueDate: "01 Aug 2026", submissions: 38, total: 38, type: "Worksheet" },
    { id: "ASGN-004", title: "Python — Build a Weather App (Mini Project)", subject: "Computer Science", class: "Class 9-A", teacher: "Rajesh Kumar", dueDate: "08 Aug 2026", submissions: 12, total: 40, type: "Coding" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
        border: "1px solid var(--border-glow)", borderRadius: "var(--radius-lg)", padding: "1.5rem 1.75rem",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Assignments & Projects Hub <ClipboardList size={24} color="#06b6d4" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>Long-form projects, worksheets, and coding assignments with submission tracking.</p>
        </div>
        <button onClick={() => setIsCreateOpen(true)} className="btn btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
          <Plus size={18} /> Create Assignment
        </button>
      </div>

      {/* ASSIGNMENT CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
        {assignments.map((a) => (
          <div key={a.id} className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{a.title}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600, marginTop: 2 }}>
                  {a.subject} • {a.class} • By {a.teacher}
                </div>
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

      {/* CREATE ASSIGNMENT MODAL */}
      {isCreateOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Create New Assignment</h3>
              <button onClick={() => setIsCreateOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input type="text" placeholder="Assignment Title" style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <select style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}>
                  <option style={{ background: "#0b0f19" }}>Project</option>
                  <option style={{ background: "#0b0f19" }}>Worksheet</option>
                  <option style={{ background: "#0b0f19" }}>Coding</option>
                  <option style={{ background: "#0b0f19" }}>Writing</option>
                </select>
                <input type="date" style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} />
              </div>
              <div style={{ border: "2px dashed var(--border-color)", padding: "1.25rem", borderRadius: "var(--radius-md)", textAlign: "center", color: "var(--text-muted)" }}>
                <Upload size={28} style={{ margin: "0 auto 0.4rem auto", color: "var(--primary)" }} />
                <div style={{ fontSize: "0.82rem" }}>Upload assignment reference files</div>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => setIsCreateOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Publish Assignment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
