"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Send, ArrowLeft, Lock, CheckCircle2, Sparkles, 
  ShieldCheck, Bell, AlertCircle 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function PublishResultPage() {
  const [selectedTerm, setSelectedTerm] = useState("Mid-Term Board Exam 2026");
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [lockMarks, setLockMarks] = useState(true);
  const [sendSms, setSendSms] = useState(true);
  const [published, setPublished] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setPublished(true);
    setTimeout(() => setPublished(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 9: Examinations
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Publish Result
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Publish Report Cards to Parent App & SMS Broadcast
            </p>
          </div>

          <Link href="/exams" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 9 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/exams" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Exam Schedule
          </Link>
          <Link href="/exams/marks-entry" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Marks Entry
          </Link>
          <Link href="/exams/grade-sheet" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Grade Sheet
          </Link>
          <Link href="/exams/publish" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Publish Result
          </Link>
          <Link href="/exams/report" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Exam Report
          </Link>
        </div>

        {/* SUCCESS ALERT */}
        {published && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Result published to Parent App & SMS Broadcast sent to 42 parents!</span>
          </div>
        )}

        {/* PUBLISH CONTROL PANEL FORM */}
        <form onSubmit={handlePublish} className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="input-group">
            <label>EXAM TERM TO PUBLISH</label>
            <select 
              value={selectedTerm} 
              onChange={(e) => setSelectedTerm(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.88rem", fontWeight: 800 }}
            >
              <option value="Mid-Term Board Exam 2026">CBSE Mid-Term Board Exam 2026</option>
            </select>
          </div>

          <div className="input-group">
            <label>TARGET CLASS & SECTION</label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.88rem", fontWeight: 800 }}
            >
              <option value="Class 10-A">Class 10-A (42 Students)</option>
              <option value="Class 9-B">Class 9-B (35 Students)</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: 4 }}>
            <input 
              type="checkbox" 
              id="lockCheck"
              checked={lockMarks} 
              onChange={(e) => setLockMarks(e.target.checked)} 
              style={{ width: 16, height: 16, accentColor: "var(--primary)", cursor: "pointer" }} 
            />
            <label htmlFor="lockCheck" style={{ fontSize: "0.8rem", color: "#fff", cursor: "pointer" }}>
              Lock marks ledger from further edits
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input 
              type="checkbox" 
              id="smsCheck"
              checked={sendSms} 
              onChange={(e) => setSendSms(e.target.checked)} 
              style={{ width: 16, height: 16, accentColor: "var(--primary)", cursor: "pointer" }} 
            />
            <label htmlFor="smsCheck" style={{ fontSize: "0.8rem", color: "#fff", cursor: "pointer" }}>
              Send automated result SMS & push alert to all parents
            </label>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            <Send size={18} /> Publish Results to Parent Portal
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
