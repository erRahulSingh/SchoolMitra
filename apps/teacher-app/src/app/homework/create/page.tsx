"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plus, ArrowLeft, Calendar, Upload, CheckCircle2, 
  Sparkles, FileText, Bell, BookOpen 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function CreateHomeworkPage() {
  const router = useRouter();
  
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [subject, setSubject] = useState("Mathematics");
  const [title, setTitle] = useState("Quadratic Equations & Formula Proofs Worksheet");
  const [dueDate, setDueDate] = useState("2026-08-12");
  const [maxMarks, setMaxMarks] = useState("10");
  const [instructions, setInstructions] = useState("Solve Exercise 4.2 Questions 1 to 15 in notebook. Show step-by-step proofs for identities.");
  const [notifyParents, setNotifyParents] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/homework");
    }, 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 5: Homework
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Create Homework
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Assign New Worksheet or Task to Students
            </p>
          </div>

          <Link href="/homework" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 5 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/homework" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Homework List
          </Link>
          <Link href="/homework/create" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Create Homework
          </Link>
          <Link href="/homework/details" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Details
          </Link>
          <Link href="/homework/submissions" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Submissions
          </Link>
          <Link href="/homework/analytics" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Analytics
          </Link>
        </div>

        {/* SUCCESS ALERT */}
        {saved && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Homework created & push notification dispatched to Parent App!</span>
          </div>
        )}

        {/* ════════════ CREATE HOMEWORK FORM ════════════ */}
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="input-group">
              <label>CLASS & SECTION</label>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
              >
                <option value="Class 10-A">Class 10-A</option>
                <option value="Class 9-B">Class 9-B</option>
                <option value="Class 10-B">Class 10-B</option>
              </select>
            </div>

            <div className="input-group">
              <label>SUBJECT</label>
              <select 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics Lab">Physics Lab</option>
                <option value="Chemistry">Chemistry</option>
                <option value="English Lit">English Lit</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>ASSIGNMENT TITLE</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              className="input-field" 
              style={{ paddingLeft: "1rem" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="input-group">
              <label>DUE SUBMISSION DATE</label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={e => setDueDate(e.target.value)} 
                required 
                className="input-field" 
                style={{ paddingLeft: "1rem" }}
              />
            </div>

            <div className="input-group">
              <label>MAX MARKS</label>
              <input 
                type="number" 
                value={maxMarks} 
                onChange={e => setMaxMarks(e.target.value)} 
                required 
                className="input-field" 
                style={{ paddingLeft: "1rem" }}
              />
            </div>
          </div>

          <div className="input-group">
            <label>INSTRUCTIONS & TASK DETAILS</label>
            <textarea 
              rows={3}
              value={instructions} 
              onChange={e => setInstructions(e.target.value)} 
              className="input-field" 
              style={{ paddingLeft: "1rem", resize: "none" }}
            />
          </div>

          <div className="input-group">
            <label>ATTACH REFERENCE WORKSHEET (PDF/IMAGE)</label>
            <div style={{ border: "2px dashed rgba(255,255,255,0.15)", padding: "1.1rem", borderRadius: "var(--radius-md)", textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>
              <Upload size={24} style={{ margin: "0 auto 0.4rem auto", color: "var(--primary)" }} />
              <span>Tap to attach PDF or Photo file</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input 
              type="checkbox" 
              id="notifyParents" 
              checked={notifyParents} 
              onChange={(e) => setNotifyParents(e.target.checked)} 
              style={{ width: 16, height: 16, accentColor: "var(--primary)", cursor: "pointer" }} 
            />
            <label htmlFor="notifyParents" style={{ fontSize: "0.8rem", color: "var(--text-muted)", cursor: "pointer" }}>
              Push instant notification to Parent App
            </label>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            <CheckCircle2 size={18} /> Publish Homework Assignment
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
