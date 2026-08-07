"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plus, ArrowLeft, Calendar, CheckCircle2, Sparkles, 
  Award, Clock, FileText 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function CreateWeeklyTestPage() {
  const router = useRouter();
  
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [subject, setSubject] = useState("Mathematics");
  const [testTitle, setTestTitle] = useState("Weekly Test #05 — Arithmetic Progression & Sum of Terms");
  const [maxMarks, setMaxMarks] = useState("25");
  const [duration, setDuration] = useState("45");
  const [testDate, setTestDate] = useState("2026-08-21");
  const [syllabus, setSyllabus] = useState("Nth term formula, Sum of first N natural numbers and word problem applications.");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/weekly-test");
    }, 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 8: Weekly Tests
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Create Weekly Test
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Schedule New Class Evaluation & Syllabus
            </p>
          </div>

          <Link href="/weekly-test" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 8 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/weekly-test" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Test List
          </Link>
          <Link href="/weekly-test/create" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Create Test
          </Link>
          <Link href="/weekly-test/questions" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Questions
          </Link>
          <Link href="/weekly-test/results" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Result Entry
          </Link>
          <Link href="/weekly-test/analytics" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
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
            <span>Weekly Test scheduled and added to class calendar!</span>
          </div>
        )}

        {/* FORM */}
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
                <option value="Physics">Physics</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>TEST TITLE</label>
            <input 
              type="text" 
              value={testTitle} 
              onChange={e => setTestTitle(e.target.value)} 
              required 
              className="input-field" 
              style={{ paddingLeft: "1rem" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
            <div className="input-group">
              <label style={{ fontSize: "0.68rem" }}>MAX MARKS</label>
              <input 
                type="number" 
                value={maxMarks} 
                onChange={e => setMaxMarks(e.target.value)} 
                required 
                className="input-field" 
                style={{ paddingLeft: "0.75rem" }}
              />
            </div>

            <div className="input-group">
              <label style={{ fontSize: "0.68rem" }}>DURATION (MINS)</label>
              <input 
                type="number" 
                value={duration} 
                onChange={e => setDuration(e.target.value)} 
                required 
                className="input-field" 
                style={{ paddingLeft: "0.75rem" }}
              />
            </div>

            <div className="input-group">
              <label style={{ fontSize: "0.68rem" }}>TEST DATE</label>
              <input 
                type="date" 
                value={testDate} 
                onChange={e => setTestDate(e.target.value)} 
                required 
                className="input-field" 
                style={{ paddingLeft: "0.5rem" }}
              />
            </div>
          </div>

          <div className="input-group">
            <label>SYLLABUS COVERED</label>
            <textarea 
              rows={3}
              value={syllabus} 
              onChange={e => setSyllabus(e.target.value)} 
              className="input-field" 
              style={{ paddingLeft: "1rem", resize: "none" }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            <CheckCircle2 size={18} /> Schedule Weekly Class Test
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
