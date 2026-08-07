"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, ArrowLeft, Calendar, Download, Send, 
  CheckCircle2, Sparkles, Clock, AlertCircle, Edit, Bell 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function HomeworkDetailsPage() {
  const [remindSuccess, setRemindSuccess] = useState(false);

  const hwDetails = {
    title: "Quadratic Equations & Formula Proofs Worksheet",
    class: "Class 10-A",
    subject: "Mathematics",
    assigned: "04 Aug 2026",
    due: "10 Aug 2026 (11:59 PM)",
    maxMarks: "10 Marks",
    submitted: 28,
    pending: 14,
    instructions: "Solve Exercise 4.2 Questions 1 to 15 in notebook. Show step-by-step proofs for quadratic formula derivation and discriminant tests for real vs complex roots.",
    filename: "Quadratic_Equations_Worksheet_Class10A.pdf",
    filesize: "1.4 MB"
  };

  const handleSendReminder = () => {
    setRemindSuccess(true);
    setTimeout(() => setRemindSuccess(false), 2000);
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
              Homework Details
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Assignment Overview & Attached Reference PDF
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
          <Link href="/homework/create" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Create Homework
          </Link>
          <Link href="/homework/details" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
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
        {remindSuccess && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Reminder push alert dispatched to 14 pending students!</span>
          </div>
        )}

        {/* ════════════ OVERVIEW CARD ════════════ */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
              {hwDetails.class} • {hwDetails.subject}
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 800 }}>
              Max: {hwDetails.maxMarks}
            </span>
          </div>

          <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#ffffff", lineHeight: 1.35 }}>
            {hwDetails.title}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: 2 }}>
            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>ASSIGNED DATE</div>
              <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff" }}>{hwDetails.assigned}</div>
            </div>

            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>DUE DATE</div>
              <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--warning)" }}>{hwDetails.due}</div>
            </div>
          </div>
        </div>

        {/* INSTRUCTIONS & ATTACHMENT CARD */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>Instructions & Guidelines</h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
            {hwDetails.instructions}
          </p>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.75rem" }}>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--text-muted)", marginBottom: "0.5rem" }}>ATTACHED WORKSHEET FILE</h4>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0.9rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <FileText size={22} color="var(--primary)" />
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff" }}>{hwDetails.filename}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>PDF Document • {hwDetails.filesize}</div>
                </div>
              </div>

              <Download size={18} color="var(--primary)" style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "0.65rem" }}>
          <button type="button" onClick={handleSendReminder} className="btn-secondary" style={{ flex: 1, fontSize: "0.78rem" }}>
            <Bell size={15} /> Send Remind Alert ({hwDetails.pending})
          </button>

          <Link href="/homework/submissions" className="btn-primary" style={{ flex: 1, textDecoration: "none", fontSize: "0.78rem" }}>
            <FileText size={15} /> View Submissions
          </Link>
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
