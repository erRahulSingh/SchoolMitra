"use client";

import React, { useState } from "react";
import {
  Award, Plus, X, Download, Calendar, FileText, BarChart3,
  CheckCircle2, AlertCircle, Eye, Printer, Settings, Send,
  ChevronDown, Edit3, Save, Lock, Unlock, Users, PlayCircle, BarChart2, Star, CheckSquare, Trash2, QrCode
} from "lucide-react";

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "types" | "schedule" | "marks" | "grades" | "results" | "report_cards" | "publish" | "analytics" | "hall_tickets">("dashboard");

  // ── Exam Dashboard (Module 1) ──
  const [stats] = useState({
    totalExams: 12,
    upcomingExams: 2,
    ongoingExams: 1,
    completedExams: 9,
    overallPassRate: "94.6%"
  });

  // ── Exam Types (Module 2) ──
  const [examTypes, setExamTypes] = useState([
    { id: "TYP-01", name: "Unit Test", weightage: "10%", description: "Formative evaluation cycles" },
    { id: "TYP-02", name: "Half Yearly", weightage: "40%", description: "Mid-session comprehensive evaluations" },
    { id: "TYP-03", name: "Annual Final", weightage: "50%", description: "End-of-term promotion examinations" }
  ]);
  const [newType, setNewType] = useState({ name: "", weightage: "", description: "" });
  const [isAddTypeOpen, setIsAddTypeOpen] = useState(false);

  // ── Exam Schedule (Module 3) ──
  const [schedules, setSchedules] = useState([
    { id: "SCH-01", class: "Class 10", section: "A", subject: "Mathematics", date: "04 Aug 2026", time: "09:00 AM – 12:00 PM", room: "Room 301", invigilator: "Mr. Ravi Kumar" },
    { id: "SCH-02", class: "Class 10", section: "A", subject: "Physics", date: "06 Aug 2026", time: "09:00 AM – 12:00 PM", room: "Room 302", invigilator: "Mrs. Ananya Deshmukh" },
    { id: "SCH-03", class: "Class 9", section: "B", subject: "English Lit", date: "04 Aug 2026", time: "01:00 PM – 04:00 PM", room: "Room 201", invigilator: "Sunita Rao" }
  ]);
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [newSch, setNewSch] = useState({ class: "10", section: "A", subject: "Mathematics", date: "", time: "", room: "Room 301", invigilator: "Mr. Ravi Kumar" });

  // ── Marks Entry (Module 4) ──
  const [selectedMarkStudentId, setSelectedMarkStudentId] = useState("10-A-01");
  const [marksEditable, setMarksEditable] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("Saved to Cloud ✅");
  const [marksData, setMarksData] = useState([
    { id: "10-A-01", rollNo: "10-A-01", name: "Aarav Sharma", theory: 64, practical: 28, internal: 8, remarks: "Excellent Analytical Skills" },
    { id: "10-A-02", rollNo: "10-A-02", name: "Ananya Patel", theory: 62, practical: 26, internal: 9, remarks: "Outstanding Concept Clarity" },
    { id: "10-A-03", rollNo: "10-A-03", name: "Rohan Verma", theory: 55, practical: 22, internal: 7, remarks: "Good, needs revision in trigonometry" }
  ]);

  const handleMarksChange = (id: string, field: 'theory' | 'practical' | 'internal', value: number) => {
    setAutoSaveStatus("Saving changes...");
    setMarksData(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    }));
    setTimeout(() => {
      setAutoSaveStatus("Saved to Cloud ✅");
    }, 800);
  };

  // ── Grade System (Module 5) ──
  const [gradeSetup] = useState([
    { grade: "A+", minPercent: 90, maxPercent: 100, gpa: "10.0", remark: "Outstanding Performance" },
    { grade: "A", minPercent: 80, maxPercent: 89, gpa: "9.0", remark: "Excellent Performance" },
    { grade: "B+", minPercent: 70, maxPercent: 79, gpa: "8.0", remark: "Very Good Performance" },
    { grade: "B", minPercent: 60, maxPercent: 69, gpa: "7.0", remark: "Good Performance" },
    { grade: "C", minPercent: 50, maxPercent: 59, gpa: "6.0", remark: "Above Average" },
    { grade: "D", minPercent: 33, maxPercent: 49, gpa: "5.0", remark: "Pass" },
    { grade: "E (Fail)", minPercent: 0, maxPercent: 32, gpa: "0.0", remark: "Needs Improvement" }
  ]);

  // ── Result Generation (Module 6) ──
  const generatedResults = marksData.map((m, idx) => {
    const total = m.theory + m.practical + m.internal;
    const pct = total; // Assumed max 100
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

  // ── Result Publish Control (Module 8) ──
  const [publishedExams, setPublishedExams] = useState<Record<string, boolean>>({ "SCH-01": true });

  const togglePublishResult = (id: string) => {
    setPublishedExams(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    alert(`Results published state toggled. Parent notification push dispatches completed.`);
  };

  const handleAddType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newType.name) return;
    setExamTypes([...examTypes, {
      id: `TYP-${String(examTypes.length + 1).padStart(2, "0")}`,
      name: newType.name,
      weightage: newType.weightage || "10%",
      description: newType.description || "School internal assessment cycle"
    }]);
    setIsAddTypeOpen(false);
    setNewType({ name: "", weightage: "", description: "" });
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSch.subject || !newSch.date) return;
    setSchedules([...schedules, {
      id: `SCH-${String(schedules.length + 1).padStart(2, "0")}`,
      class: `Class ${newSch.class}`,
      section: newSch.section,
      subject: newSch.subject,
      date: newSch.date,
      time: newSch.time || "09:00 AM – 12:00 PM",
      room: newSch.room,
      invigilator: newSch.invigilator
    }]);
    setIsAddScheduleOpen(false);
    setNewSch({ class: "10", section: "A", subject: "Mathematics", date: "", time: "", room: "Room 301", invigilator: "Mr. Ravi Kumar" });
  };

  const selectedDossierStudent = marksData.find(m => m.id === selectedMarkStudentId) || marksData[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Examination &amp; Grade Engine <Award size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Schedule school board/term exams, input scholastic performance marks, define grading indices, build report cards, publish results.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "types") setIsAddTypeOpen(true);
            else setIsAddScheduleOpen(true);
          }}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <Plus size={18} />
          <span>Quick Create Item</span>
        </button>
      </div>

      {/* ════════════ 10 TABS SWITCHER CONSOLE ════════════ */}
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

      {/* MODULE 1: EXAM DASHBOARD */}
      {activeTab === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>TOTAL SCHEDULINGS</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 850, color: "var(--primary)", marginTop: 4 }}>{stats.totalExams}</div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>UPCOMING EXAMS</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 850, color: "#f59e0b", marginTop: 4 }}>{stats.upcomingExams}</div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ONGOING PAPERS</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 850, color: "var(--success)", marginTop: 4 }}>{stats.ongoingExams}</div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>COMPLETED EXAMS</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 850, color: "var(--text-muted)", marginTop: 4 }}>{stats.completedExams}</div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>STUDENT PASS RATE</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 850, color: "var(--success)", marginTop: 4 }}>{stats.overallPassRate}</div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: ASSESSMENT FORMATS (EXAM TYPES) */}
      {activeTab === "types" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Define Evaluation Formats</h3>
          
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
                  <td style={{ fontWeight: 700, color: "#fff" }}>{typ.name}</td>
                  <td style={{ fontWeight: 650, color: "var(--primary)" }}>{typ.weightage}</td>
                  <td>{typ.description}</td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => setExamTypes(examTypes.filter(t => t.id !== typ.id))}
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

      {/* MODULE 3: EXAM TIMETABLES */}
      {activeTab === "schedule" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Scheduled Papers & Invigilators</h3>
          
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
                  <td style={{ fontWeight: 700 }}>{sch.class}-{sch.section}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{sch.subject}</td>
                  <td style={{ fontWeight: 600 }}>{sch.date}</td>
                  <td>{sch.time}</td>
                  <td><span className="badge badge-info">{sch.room}</span></td>
                  <td>{sch.invigilator}</td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => setSchedules(schedules.filter(s => s.id !== sch.id))}
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

      {/* MODULE 4: SCHOLASTIC MARKS ENTRY */}
      {activeTab === "marks" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Class Term Scholastic Marks sheet</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Edit student scores. Changes auto-save to cloud instantly.</p>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.825rem", color: "var(--success)", fontWeight: 700 }}>{autoSaveStatus}</span>
              <button 
                onClick={() => setMarksEditable(!marksEditable)} 
                className={`btn ${marksEditable ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
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
                  <td style={{ fontWeight: 700, color: "#fff" }}>{m.name}</td>
                  <td>{m.rollNo}</td>
                  <td>
                    {marksEditable ? (
                      <input 
                        type="number"
                        value={m.theory}
                        onChange={(e) => handleMarksChange(m.id, 'theory', Number(e.target.value))}
                        style={{ width: 70, padding: "0.3rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 4, color: "#fff" }}
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
                        style={{ width: 70, padding: "0.3rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 4, color: "#fff" }}
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
                        style={{ width: 70, padding: "0.3rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 4, color: "#fff" }}
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

      {/* MODULE 5: GRADING INDICES */}
      {activeTab === "grades" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Define Class grading Index Policy</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Grade Code</th>
                <th>Percentage bracket</th>
                <th>GPA Score</th>
                <th>Evaluation remarks</th>
              </tr>
            </thead>
            <tbody>
              {gradeSetup.map((g, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{g.grade}</td>
                  <td style={{ fontWeight: 650, color: "var(--primary)" }}>{g.minPercent}% – {g.maxPercent}%</td>
                  <td><strong>{g.gpa}</strong></td>
                  <td>{g.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 6: RESULT GENERATION */}
      {activeTab === "results" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Auto-compiled Student Rankings</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Class Rank</th>
                <th>Student Name</th>
                <th>Roll Number</th>
                <th>Total score (100)</th>
                <th>Percentage Ratio</th>
                <th>Awarded Grade</th>
              </tr>
            </thead>
            <tbody>
              {generatedResults.map((r, idx) => (
                <tr key={idx}>
                  <td><span className="badge badge-success" style={{ padding: "0.3rem 0.5rem" }}>Rank {r.rank}</span></td>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{r.name}</td>
                  <td>{r.rollNo}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{r.total} / 100</td>
                  <td style={{ fontWeight: 600 }}>{r.percentage}</td>
                  <td><span className="badge badge-info">{r.grade}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 7: REPORT CARD BUILDER */}
      {activeTab === "report_cards" && (
        <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "1.5rem", alignItems: "flex-start" }}>
          
          {/* Select student */}
          <div className="glass-card" style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <div style={{ padding: "0.5rem 0.75rem", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>SELECT STUDENT FOR CARD</div>
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

          {/* Printable Report Card Template */}
          <div style={{ display: "flex", justify: "center" }}>
            <div style={{
              width: "100%",
              maxWidth: 580,
              background: "var(--bg-card)",
              border: "2.5px solid var(--primary)",
              borderRadius: "var(--radius-lg)",
              padding: "2rem",
              boxShadow: "var(--shadow-glow)",
              color: "#fff"
            }}>
              
              {/* Header */}
              <div style={{ textAlign: "center", borderBottom: "1.5px solid var(--border-color)", paddingBottom: "1rem" }}>
                <div style={{ fontSize: "1.35rem", fontWeight: 850 }}>DELHI PUBLIC SCHOOL MAIN CAMPUS</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>Official Student Progress Index Report</div>
                <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700, marginTop: 4 }}>Academic Term Session: 2026 - 2027</div>
              </div>

              {/* Student info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1rem 0", fontSize: "0.85rem", background: "rgba(255,255,255,0.01)", padding: "0.75rem", borderRadius: 8, border: "1px solid var(--border-color)" }}>
                <div>
                  <div>Student: <strong>{selectedDossierStudent.name}</strong></div>
                  <div style={{ marginTop: 2 }}>Admission Roll Code: {selectedDossierStudent.rollNo}</div>
                </div>
                <div>
                  <div>Mapped Class: <strong>Class 10-A</strong></div>
                  <div style={{ marginTop: 2 }}>CBSE Status: Enrolled</div>
                </div>
              </div>

              {/* Marks table */}
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem", margin: "1.25rem 0" }}>
                <thead>
                  <tr style={{ borderBottom: "1.5px solid var(--border-color)", textTransform: "uppercase" }}>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Scholastic Stream</th>
                    <th style={{ padding: "0.5rem" }}>Theory (70)</th>
                    <th style={{ padding: "0.5rem" }}>Practical (20)</th>
                    <th style={{ padding: "0.5rem" }}>Internal (10)</th>
                    <th style={{ textAlign: "right", padding: "0.5rem" }}>Total Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.5rem", fontWeight: 700 }}>Physics Paper</td>
                    <td style={{ textAlign: "center" }}>{selectedDossierStudent.theory}</td>
                    <td style={{ textAlign: "center" }}>{selectedDossierStudent.practical}</td>
                    <td style={{ textAlign: "center" }}>{selectedDossierStudent.internal}</td>
                    <td style={{ textAlign: "right", padding: "0.5rem", fontWeight: 700, color: "var(--primary)" }}>{selectedDossierStudent.theory + selectedDossierStudent.practical + selectedDossierStudent.internal}</td>
                  </tr>
                </tbody>
              </table>

              {/* Remarks and sign */}
              <div style={{ borderTop: "1.5px solid var(--border-color)", paddingTop: "1rem", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>REGISTRAR RECOLLECTION REMARKS</div>
                  <div style={{ fontSize: "0.825rem", color: "var(--text-main)", marginTop: 4 }}>&quot;{selectedDossierStudent.remarks}&quot;</div>
                </div>
                
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ background: "#fff", padding: "0.25rem", borderRadius: 4 }}>
                    <QrCode size={46} color="#000" />
                  </div>
                  <span style={{ fontSize: "0.6rem", color: "var(--text-dim)" }}>Verify QR Code</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* MODULE 8: PUBLISH RESULTS */}
      {activeTab === "publish" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Result Publication Board</h3>
          
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
                    <td style={{ fontWeight: 700 }}>{sch.id}</td>
                    <td>{sch.class}-{sch.section}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 700 }}>{sch.subject}</td>
                    <td>
                      <span className={`badge ${isPub ? "badge-success" : "badge-secondary"}`}>
                        {isPub ? "PUBLISHED TO PORTALS" : "DRAFT"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button 
                        onClick={() => togglePublishResult(sch.id)}
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

      {/* MODULE 9: RESULT ANALYTICS */}
      {activeTab === "analytics" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* Averages chart */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Class Scholastic performance Trend</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { label: "Physics Paper Average Index", pct: 86 },
                { label: "Chemistry Paper Average Index", pct: 82 },
                { label: "Mathematics Paper Average Index", pct: 91 },
                { label: "English Lit Average Index", pct: 88 }
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", justify: "space-between", fontSize: "0.85rem", fontWeight: 700 }}>
                    <span style={{ color: "#fff" }}>{item.label}</span>
                    <span style={{ color: "var(--primary)" }}>{item.pct}/100</span>
                  </div>
                  <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ width: `${item.pct}%`, height: "100%", background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)", borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>Top Scholastic Performers</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {generatedResults.map((std, idx) => (
                <div key={idx} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8, display: "flex", justify: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff" }}>{std.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--primary)", marginTop: 2 }}>Rank: {std.rank} &bull; Score: {std.total}/100</div>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: "0.68rem" }}>Grade {std.grade}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODULE 10: ADMISSION HALL TICKETS */}
      {activeTab === "hall_tickets" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "1.5rem" }}>
          
          {/* Card selection config */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Hall Admission Ticket Generator</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SELECT TARGET STUDENT</label>
                <select 
                  value={selectedMarkStudentId} 
                  onChange={(e) => setSelectedMarkStudentId(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                >
                  {marksData.map(st => <option key={st.id} value={st.id} style={{ background: "#0b0f19" }}>{st.name} ({st.rollNo})</option>)}
                </select>
              </div>
            </div>

            <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", gap: "0.45rem" }}>
              <Printer size={16} /> Print Hall Ticket
            </button>
          </div>

          {/* Ticket preview card */}
          <div style={{ display: "flex", justify: "center" }}>
            <div style={{
              width: "100%",
              height: 380,
              background: "var(--bg-card)",
              border: "2px solid var(--primary)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "var(--shadow-glow)",
              textAlign: "center"
            }}>
              
              <div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>DELHI PUBLIC SCHOOL</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>EXAMINATION ADMISSION CARD</div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", width: "100%", padding: "1rem 0" }}>
                <div style={{ fontSize: "1.15rem", fontWeight: 850, color: "#fff" }}>{selectedDossierStudent.name}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700, marginTop: 4 }}>Roll No: {selectedDossierStudent.rollNo}</div>
                
                <div style={{ fontSize: "0.8rem", color: "var(--text-main)", marginTop: "0.5rem" }}>
                  Exam Room Center: <strong>Hall #3 (First Floor)</strong>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>Seating Row: Row 4 &bull; Seat 12</div>
              </div>

              <div style={{ padding: "0.25rem", background: "#fff", borderRadius: 4 }}>
                <QrCode size={40} color="#000" />
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ════════════ QUICK ADD TYPE MODAL ════════════ */}
      {isAddTypeOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 400 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add Assessment Format</h3>
              <button onClick={() => setIsAddTypeOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddType} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>FORMAT NAME</label>
                <input type="text" value={newType.name} onChange={(e) => setNewType({ ...newType, name: e.target.value })} placeholder="e.g. Unit Test 3" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>WEIGHTAGE (%)</label>
                <input type="text" value={newType.weightage} onChange={(e) => setNewType({ ...newType, weightage: e.target.value })} placeholder="e.g. 15%" style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Create Format</button>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ QUICK ADD SCHEDULE MODAL ════════════ */}
      {isAddScheduleOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 450 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Schedule Exam Paper</h3>
              <button onClick={() => setIsAddScheduleOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSchedule} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>CLASS</label>
                  <select value={newSch.class} onChange={(e) => setNewSch({ ...newSch, class: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                    <option value="10">Class 10</option>
                    <option value="9">Class 9</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SECTION</label>
                  <select value={newSch.section} onChange={(e) => setNewSch({ ...newSch, section: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SUBJECT PAPER</label>
                <input type="text" value={newSch.subject} onChange={(e) => setNewSch({ ...newSch, subject: e.target.value })} placeholder="e.g. Mathematics" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>DATE</label>
                <input type="date" value={newSch.date} onChange={(e) => setNewSch({ ...newSch, date: e.target.value })} required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Schedule Paper</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
