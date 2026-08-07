"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, ArrowLeft, Send, CheckCircle2, Sparkles, 
  Clock, AlertCircle, Plus 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function LeaveApplicationPage() {
  const [leaveType, setLeaveType] = useState("Casual Leave");
  const [startDate, setStartDate] = useState("2026-08-25");
  const [endDate, setEndDate] = useState("2026-08-26");
  const [substitute, setSubstitute] = useState("Priya Sharma (Physics Teacher)");
  const [reason, setReason] = useState("Family function and urgent personal work.");
  const [submitted, setSubmitted] = useState(false);

  const [leaveHistory, setLeaveHistory] = useState([
    { id: "l1", type: "Casual Leave", dates: "25 Aug - 26 Aug 2026", days: "2 Days", status: "Pending Principal Approval", sub: "Priya Sharma" },
    { id: "l2", type: "Medical Leave", dates: "12 Jul - 13 Jul 2026", days: "2 Days", status: "Approved", sub: "Rajesh Verma" }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newL = {
      id: `l_${Date.now()}`,
      type: leaveType,
      dates: `${startDate} - ${endDate}`,
      days: "1-2 Days",
      status: "Pending Principal Approval",
      sub: substitute
    };

    setLeaveHistory([newL, ...leaveHistory]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 12: Teacher Self-Service
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Leave Application
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Apply for Leave & Assign Substitute Teacher
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

        {/* MODULE 12 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/profile" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            My Profile
          </Link>
          <Link href="/profile/leave" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Leave Application
          </Link>
          <Link href="/profile/settings" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            App Settings
          </Link>
        </div>

        {/* LEAVE BALANCE PILLS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
          <div className="glass-card" style={{ padding: "0.75rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 700 }}>CASUAL LEAVE</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--primary)" }}>8 Days Left</div>
          </div>

          <div className="glass-card" style={{ padding: "0.75rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 700 }}>MEDICAL LEAVE</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--success)" }}>10 Days Left</div>
          </div>

          <div className="glass-card" style={{ padding: "0.75rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 700 }}>EARNED LEAVE</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--warning)" }}>12 Days Left</div>
          </div>
        </div>

        {/* SUCCESS ALERT */}
        {submitted && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Leave request submitted to Principal for approval!</span>
          </div>
        )}

        {/* LEAVE FORM */}
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="input-group">
            <label>LEAVE TYPE</label>
            <select 
              value={leaveType} 
              onChange={e => setLeaveType(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
            >
              <option value="Casual Leave">Casual Leave (CL)</option>
              <option value="Medical Leave">Medical Leave (ML)</option>
              <option value="Earned Leave">Earned Leave (EL)</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="input-group">
              <label>START DATE</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)} 
                required 
                className="input-field" 
                style={{ paddingLeft: "0.75rem" }}
              />
            </div>

            <div className="input-group">
              <label>END DATE</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)} 
                required 
                className="input-field" 
                style={{ paddingLeft: "0.75rem" }}
              />
            </div>
          </div>

          <div className="input-group">
            <label>SUBSTITUTE PROXY TEACHER</label>
            <select 
              value={substitute} 
              onChange={e => setSubstitute(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
            >
              <option value="Priya Sharma (Physics Teacher)">Priya Sharma (Physics Teacher)</option>
              <option value="Rajesh Verma (Chemistry Teacher)">Rajesh Verma (Chemistry Teacher)</option>
            </select>
          </div>

          <div className="input-group">
            <label>REASON FOR LEAVE</label>
            <textarea 
              rows={2}
              value={reason} 
              onChange={e => setReason(e.target.value)} 
              required 
              className="input-field" 
              style={{ paddingLeft: "1rem", resize: "none" }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "0.4rem" }}>
            <Send size={18} /> Submit Leave Request
          </button>
        </form>

        {/* ════════════ LEAVE HISTORY ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>Past Leave Applications</h3>
          {leaveHistory.map((l) => (
            <div key={l.id} className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  {l.type}
                </span>
                <span style={{
                  fontSize: "0.72rem", fontWeight: 800,
                  color: l.status === "Approved" ? "var(--success)" : "var(--warning)",
                  background: l.status === "Approved" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                  padding: "0.2rem 0.55rem", borderRadius: 6
                }}>
                  {l.status}
                </span>
              </div>

              <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#ffffff" }}>
                {l.dates} ({l.days})
              </div>

              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Proxy Substitute: <strong style={{ color: "#fff" }}>{l.sub}</strong>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
