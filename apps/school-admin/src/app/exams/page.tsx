"use client";

import React, { useState } from "react";
import {
  Award, Plus, X, Download, Calendar, FileText, BarChart3,
  CheckCircle2, AlertCircle, Eye, Printer, Settings, Send,
  ChevronDown, Edit3, Save, Lock, Unlock
} from "lucide-react";

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<"schedule" | "marks" | "grades" | "reports" | "publish">("schedule");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // ── Exam Schedule ──
  const [exams, setExams] = useState([
    { id: "EX-001", name: "Mid-Term Examination 2026", type: "Summative", startDate: "04 Aug 2026", endDate: "14 Aug 2026", classes: "Class 1–12", subjects: 8, status: "UPCOMING" },
    { id: "EX-002", name: "Unit Test — 2 (July 2026)", type: "Formative", startDate: "15 Jul 2026", endDate: "17 Jul 2026", classes: "Class 6–12", subjects: 5, status: "COMPLETED" },
    { id: "EX-003", name: "Pre-Board Examination (XII)", type: "Board Prep", startDate: "20 Jan 2027", endDate: "05 Feb 2027", classes: "Class 12", subjects: 5, status: "SCHEDULED" },
    { id: "EX-004", name: "Annual Final Examination 2027", type: "Summative", startDate: "01 Mar 2027", endDate: "18 Mar 2027", classes: "Class 1–12", subjects: 8, status: "SCHEDULED" },
  ]);

  // ── Marks Entry ──
  const [marksEditable, setMarksEditable] = useState(false);
  const [marksData, setMarksData] = useState([
    { rollNo: "10-A-01", name: "Aarav Sharma", physics: 92, chemistry: 88, maths: 95, english: 78, hindi: 82, cs: 96, total: 531, percent: "88.5%", grade: "A+" },
    { rollNo: "10-A-02", name: "Ananya Patel", physics: 85, chemistry: 90, maths: 82, english: 91, hindi: 88, cs: 90, total: 526, percent: "87.7%", grade: "A+" },
    { rollNo: "10-A-03", name: "Rohan Verma", physics: 78, chemistry: 72, maths: 88, english: 85, hindi: 76, cs: 82, total: 481, percent: "80.2%", grade: "A" },
    { rollNo: "10-A-04", name: "Priya Singh", physics: 91, chemistry: 86, maths: 90, english: 94, hindi: 92, cs: 88, total: 541, percent: "90.2%", grade: "A+" },
    { rollNo: "10-A-05", name: "Dev Malhotra", physics: 65, chemistry: 58, maths: 72, english: 68, hindi: 70, cs: 74, total: 407, percent: "67.8%", grade: "B" },
    { rollNo: "10-A-06", name: "Kavya Nair", physics: 88, chemistry: 82, maths: 94, english: 76, hindi: 80, cs: 92, total: 512, percent: "85.3%", grade: "A+" },
  ]);

  // ── Grade Setup ──
  const [gradeSetup] = useState([
    { grade: "A+", minPercent: 90, maxPercent: 100, gpa: "10.0", remark: "Outstanding Performance" },
    { grade: "A", minPercent: 80, maxPercent: 89, gpa: "9.0", remark: "Excellent Performance" },
    { grade: "B+", minPercent: 70, maxPercent: 79, gpa: "8.0", remark: "Very Good Performance" },
    { grade: "B", minPercent: 60, maxPercent: 69, gpa: "7.0", remark: "Good Performance" },
    { grade: "C", minPercent: 50, maxPercent: 59, gpa: "6.0", remark: "Above Average" },
    { grade: "D", minPercent: 33, maxPercent: 49, gpa: "5.0", remark: "Pass" },
    { grade: "E (Fail)", minPercent: 0, maxPercent: 32, gpa: "0.0", remark: "Needs Improvement" },
  ]);

  // ── Result Publish ──
  const [publishedResults, setPublishedResults] = useState<Record<string, boolean>>({ "EX-002": true });

  const [newExam, setNewExam] = useState({ name: "", type: "Summative", startDate: "", endDate: "" });
  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExam.name) return;
    setExams([{ id: `EX-${String(exams.length + 1).padStart(3, "0")}`, name: newExam.name, type: newExam.type, startDate: newExam.startDate || "TBD", endDate: newExam.endDate || "TBD", classes: "Class 1–12", subjects: 5, status: "SCHEDULED" }, ...exams]);
    setIsScheduleOpen(false);
    setNewExam({ name: "", type: "Summative", startDate: "", endDate: "" });
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" };
  const labelStyle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* PAGE HEADER */}
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)",
        border: "1px solid var(--border-glow)", borderRadius: "var(--radius-lg)", padding: "1.5rem 1.75rem",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Examinations & Results Engine <Award size={24} color="#a855f7" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>Schedule exams, enter marks, configure grading, generate report cards, and publish results.</p>
        </div>
        <button onClick={() => setIsScheduleOpen(true)} className="btn btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
          <Plus size={18} /> Schedule New Exam
        </button>
      </div>

      {/* 5 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {[
          { id: "schedule", label: "Exam Schedule", icon: Calendar },
          { id: "marks", label: "Marks Entry", icon: Edit3 },
          { id: "grades", label: "Grade Setup", icon: Settings },
          { id: "reports", label: "Report Cards", icon: Printer },
          { id: "publish", label: "Result Publish", icon: Send },
        ].map((tab) => {
          const Icon = tab.icon;
          return (<button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`btn ${activeTab === tab.id ? "btn-primary" : "btn-secondary"}`}><Icon size={16} /> {tab.label}</button>);
        })}
      </div>

      {/* ═══ TAB 1: EXAM SCHEDULE ═══ */}
      {activeTab === "schedule" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div className="table-container">
            <table className="custom-table">
              <thead><tr><th>Examination Name</th><th>Type</th><th>Start Date</th><th>End Date</th><th>Classes</th><th>Papers</th><th>Status</th></tr></thead>
              <tbody>
                {exams.map((ex) => (
                  <tr key={ex.id}>
                    <td><div style={{ fontWeight: 700, color: "#fff" }}>{ex.name}</div><div style={{ fontSize: "0.72rem", color: "var(--primary)" }}>{ex.id}</div></td>
                    <td><span className="badge badge-info">{ex.type}</span></td>
                    <td style={{ color: "var(--text-muted)" }}>{ex.startDate}</td>
                    <td style={{ color: "var(--text-muted)" }}>{ex.endDate}</td>
                    <td style={{ fontWeight: 600 }}>{ex.classes}</td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{ex.subjects} Papers</td>
                    <td><span className={`badge ${ex.status === "UPCOMING" ? "badge-warning" : ex.status === "COMPLETED" ? "badge-success" : "badge-info"}`}>{ex.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══ TAB 2: MARKS ENTRY ═══ */}
      {activeTab === "marks" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Gradebook — Unit Test 2 (Class 10-A) • Max Marks: 100 per Subject</h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => setMarksEditable(!marksEditable)} className="btn btn-secondary" style={{ fontSize: "0.78rem" }}>
                {marksEditable ? <><Lock size={14} /> Lock Marks</> : <><Unlock size={14} /> Edit Marks</>}
              </button>
              <button className="btn btn-secondary" style={{ fontSize: "0.78rem" }}><Download size={14} /> Export CSV</button>
            </div>
          </div>
          <div className="table-container">
            <table className="custom-table">
              <thead><tr><th>Roll No</th><th>Student Name</th><th style={{ textAlign: "center" }}>Physics</th><th style={{ textAlign: "center" }}>Chemistry</th><th style={{ textAlign: "center" }}>Maths</th><th style={{ textAlign: "center" }}>English</th><th style={{ textAlign: "center" }}>Hindi</th><th style={{ textAlign: "center" }}>CS</th><th style={{ textAlign: "center" }}>Total (600)</th><th style={{ textAlign: "center" }}>%</th><th style={{ textAlign: "center" }}>Grade</th></tr></thead>
              <tbody>
                {marksData.map((m, idx) => {
                  const colorFor = (v: number) => v >= 80 ? "var(--success)" : v >= 60 ? "#f59e0b" : "#ef4444";
                  return (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700 }}>{m.rollNo}</td>
                      <td style={{ fontWeight: 700, color: "#fff" }}>{m.name}</td>
                      {[m.physics, m.chemistry, m.maths, m.english, m.hindi, m.cs].map((v, i) => (
                        <td key={i} style={{ textAlign: "center" }}>
                          {marksEditable ? (
                            <input type="number" defaultValue={v} style={{ width: 50, padding: "0.3rem", background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-color)", borderRadius: 4, color: "#fff", textAlign: "center", fontSize: "0.82rem" }} />
                          ) : (
                            <span style={{ fontWeight: 700, color: colorFor(v) }}>{v}</span>
                          )}
                        </td>
                      ))}
                      <td style={{ textAlign: "center", fontWeight: 900, color: "#fff" }}>{m.total}</td>
                      <td style={{ textAlign: "center", fontWeight: 800, color: "var(--primary)" }}>{m.percent}</td>
                      <td style={{ textAlign: "center" }}><span className={`badge ${m.grade === "A+" ? "badge-success" : m.grade === "A" ? "badge-info" : "badge-warning"}`}>{m.grade}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {marksEditable && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.25rem" }}>
              <button className="btn btn-primary"><Save size={16} /> Save All Marks</button>
            </div>
          )}
        </div>
      )}

      {/* ═══ TAB 3: GRADE SETUP ═══ */}
      {activeTab === "grades" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>CBSE Grading Scale Configuration (2026-27 Session)</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead><tr><th>Grade</th><th>Min %</th><th>Max %</th><th>GPA Points</th><th>Remark / Description</th></tr></thead>
                <tbody>
                  {gradeSetup.map((g, idx) => (
                    <tr key={idx}>
                      <td><span className={`badge ${g.grade.includes("A+") ? "badge-success" : g.grade.includes("A") ? "badge-info" : g.grade.includes("B") ? "badge-warning" : g.grade.includes("Fail") ? "badge-danger" : "badge-secondary"}`} style={{ fontSize: "0.85rem", fontWeight: 900, minWidth: 50, textAlign: "center", display: "inline-block" }}>{g.grade}</span></td>
                      <td style={{ fontWeight: 700 }}>{g.minPercent}%</td>
                      <td style={{ fontWeight: 700 }}>{g.maxPercent}%</td>
                      <td style={{ fontWeight: 800, color: "var(--primary)" }}>{g.gpa}</td>
                      <td style={{ color: "var(--text-muted)" }}>{g.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Class Toppers */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Class Toppers — Unit Test 2 (Auto-Ranked)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {marksData.sort((a, b) => b.total - a.total).slice(0, 3).map((m, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "1.25rem", textAlign: "center", border: idx === 0 ? "1px solid #f59e0b" : "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div>
                  <div style={{ fontWeight: 800, color: "#fff", fontSize: "1.05rem" }}>{m.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600, marginTop: 2 }}>{m.rollNo}</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: idx === 0 ? "#f59e0b" : "var(--primary)", marginTop: "0.5rem" }}>{m.percent}</div>
                  <span className="badge badge-success" style={{ marginTop: "0.5rem" }}>{m.grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 4: REPORT CARDS ═══ */}
      {activeTab === "reports" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
          {marksData.map((m, idx) => (
            <div key={idx} className="glass-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#fff" }}>{m.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600 }}>{m.rollNo} • Class 10-A • Delhi Public School</div>
                </div>
                <span className={`badge ${m.grade === "A+" ? "badge-success" : m.grade === "A" ? "badge-info" : "badge-warning"}`} style={{ fontSize: "1rem", fontWeight: 900 }}>{m.grade}</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "1rem" }}>
                {[
                  { sub: "Physics", marks: m.physics },
                  { sub: "Chemistry", marks: m.chemistry },
                  { sub: "Maths", marks: m.maths },
                  { sub: "English", marks: m.english },
                  { sub: "Hindi", marks: m.hindi },
                  { sub: "Comp Sci", marks: m.cs }
                ].map((s, si) => (
                  <div key={si} style={{ padding: "0.5rem 0.6rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{s.sub}</span>
                    <span style={{ fontWeight: 800, color: s.marks >= 80 ? "var(--success)" : s.marks >= 60 ? "#f59e0b" : "#ef4444" }}>{s.marks}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
                <div>
                  <span style={{ fontWeight: 800, color: "#fff" }}>Total: {m.total}/600</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--primary)", marginLeft: "0.75rem" }}>{m.percent}</span>
                </div>
                <button className="btn btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}><Printer size={14} /> Print</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ TAB 5: RESULT PUBLISH ═══ */}
      {activeTab === "publish" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>Result Publication Control Panel</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>Published results are visible to Parents on the Parent App and on the school website.</p>
          <div className="table-container">
            <table className="custom-table">
              <thead><tr><th>Examination</th><th>Classes</th><th>Status</th><th>Published</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
              <tbody>
                {exams.map((ex) => (
                  <tr key={ex.id}>
                    <td><div style={{ fontWeight: 700, color: "#fff" }}>{ex.name}</div><div style={{ fontSize: "0.72rem", color: "var(--primary)" }}>{ex.id}</div></td>
                    <td style={{ fontWeight: 600 }}>{ex.classes}</td>
                    <td><span className={`badge ${ex.status === "COMPLETED" ? "badge-success" : "badge-warning"}`}>{ex.status}</span></td>
                    <td>
                      {publishedResults[ex.id] ? (
                        <span className="badge badge-success">✅ PUBLISHED</span>
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Not Published</span>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {ex.status === "COMPLETED" && !publishedResults[ex.id] ? (
                        <button onClick={() => setPublishedResults(prev => ({ ...prev, [ex.id]: true }))} className="btn btn-primary" style={{ padding: "0.4rem 0.85rem", fontSize: "0.78rem" }}>
                          <Send size={14} /> Publish Results
                        </button>
                      ) : publishedResults[ex.id] ? (
                        <button onClick={() => setPublishedResults(prev => { const n = { ...prev }; delete n[ex.id]; return n; })} style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "0.4rem 0.85rem", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700 }}>
                          Unpublish
                        </button>
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>Exam not completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCHEDULE EXAM MODAL */}
      {isScheduleOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Schedule New Examination</h3>
              <button onClick={() => setIsScheduleOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSchedule} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div><label style={labelStyle}>EXAMINATION NAME</label><input type="text" value={newExam.name} onChange={(e) => setNewExam({ ...newExam, name: e.target.value })} placeholder="e.g. Final Term Examination 2026" required style={inputStyle} /></div>
              <div><label style={labelStyle}>EXAM TYPE</label>
                <select value={newExam.type} onChange={(e) => setNewExam({ ...newExam, type: e.target.value })} style={inputStyle}>
                  {["Summative", "Formative", "Board Prep", "Unit Test"].map(t => <option key={t} value={t} style={{ background: "#0b0f19" }}>{t}</option>)}
                </select></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div><label style={labelStyle}>START DATE</label><input type="date" value={newExam.startDate} onChange={(e) => setNewExam({ ...newExam, startDate: e.target.value })} style={inputStyle} /></div>
                <div><label style={labelStyle}>END DATE</label><input type="date" value={newExam.endDate} onChange={(e) => setNewExam({ ...newExam, endDate: e.target.value })} style={inputStyle} /></div>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsScheduleOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Schedule Examination</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
