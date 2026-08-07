"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Megaphone, ArrowLeft, Send, Sparkles, CheckCircle2, 
  Clock, Plus, Users 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ClassAnnouncementsPage() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [title, setTitle] = useState("Science Exhibition Model Submission Extended");
  const [body, setBody] = useState("Dear parents, please note that the working model submission date has been extended to 20th August. Ensure students bring circuit diagrams.");
  const [sentSuccess, setSentSuccess] = useState(false);

  const [announcements, setAnnouncements] = useState([
    { id: "a1", title: "Mathematics Unit Test #04 Date Sheet", class: "Class 10-A", time: "Today 09:15 AM", body: "Unit test will cover Coordinate Geometry distance formula and section formula." },
    { id: "a2", title: "Parent Teacher Meeting (PTM) Invitation", class: "Class 10-A", time: "02 Aug 2026", body: "PTM scheduled for Saturday 10:00 AM to discuss Mid-Term Board Exam preparation." }
  ]);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    const newA = {
      id: `a_${Date.now()}`,
      title,
      class: selectedClass,
      time: "Just Now",
      body
    };

    setAnnouncements([newA, ...announcements]);
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 11: Communication
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Class Announcements
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Broadcast Instant Notices to Parent Portal
            </p>
          </div>

          <Link href="/dashboard" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 11 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/communication/messages" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Parent Messages
          </Link>
          <Link href="/communication/announcements" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Class Announcements
          </Link>
          <Link href="/communication/complaints" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Complaint Replies
          </Link>
          <Link href="/communication/notifications" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Notifications
          </Link>
        </div>

        {/* SUCCESS ALERT */}
        {sentSuccess && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Class announcement broadcasted to 42 parents!</span>
          </div>
        )}

        {/* BROADCAST FORM */}
        <form onSubmit={handleBroadcast} className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          <div className="input-group">
            <label>TARGET CLASS</label>
            <select 
              value={selectedClass} 
              onChange={e => setSelectedClass(e.target.value)}
              style={{ width: "100%", padding: "0.7rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: "0.85rem" }}
            >
              <option value="Class 10-A">Class 10-A (42 Parents)</option>
              <option value="Class 9-B">Class 9-B (35 Parents)</option>
            </select>
          </div>

          <div className="input-group">
            <label>NOTICE TITLE</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              className="input-field" 
              style={{ paddingLeft: "1rem" }}
            />
          </div>

          <div className="input-group">
            <label>ANNOUNCEMENT BODY</label>
            <textarea 
              rows={3}
              value={body} 
              onChange={e => setBody(e.target.value)} 
              required 
              className="input-field" 
              style={{ paddingLeft: "1rem", resize: "none" }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "0.4rem" }}>
            <Send size={18} /> Broadcast Announcement
          </button>
        </form>

        {/* ════════════ RECENT BROADCASTS ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>Broadcast History</h3>
          {announcements.map((a) => (
            <div key={a.id} className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  {a.class}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  {a.time}
                </span>
              </div>

              <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>
                {a.title}
              </div>

              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                {a.body}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
