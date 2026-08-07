"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, Plus, ArrowLeft, Calendar, FileText, 
  CheckCircle2, Sparkles, ChevronRight, BarChart2, 
  Users, Search, Filter, AlertCircle 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function HomeworkListPage() {
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [search, setSearch] = useState("");

  const homeworkList = [
    { id: "hw101", title: "Quadratic Equations & Formula Proofs Worksheet", class: "Class 10-A", subject: "Mathematics", assigned: "04 Aug 2026", due: "10 Aug 2026", submitted: 28, total: 42, percent: "66.7%", status: "Active" },
    { id: "hw102", title: "Vernier Caliper & Error Measurement Lab Record", class: "Class 9-B", subject: "Physics Lab", assigned: "02 Aug 2026", due: "08 Aug 2026", submitted: 30, total: 35, percent: "85.7%", status: "Active" },
    { id: "hw103", title: "Shakespeare's Julius Caesar Act II Summary", class: "Class 10-B", subject: "English Lit", assigned: "28 Jul 2026", due: "03 Aug 2026", submitted: 40, total: 40, percent: "100%", status: "Evaluated" }
  ];

  const filtered = homeworkList.filter(h => {
    const matchesSearch = h.title.toLowerCase().includes(search.toLowerCase()) || h.subject.toLowerCase().includes(search.toLowerCase());
    if (selectedClass === "All Classes") return matchesSearch;
    return matchesSearch && h.class === selectedClass;
  });

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
              Homework Assignments
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Manage Classwork, Submissions & Evaluation
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

        {/* MODULE 5 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/homework" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Homework List
          </Link>
          <Link href="/homework/create" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
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

        {/* SEARCH & FILTER */}
        <div className="glass-card" style={{ padding: "0.85rem", display: "flex", gap: "0.5rem" }}>
          <div className="input-box-wrapper" style={{ flex: 1 }}>
            <Search size={15} className="input-icon" />
            <input 
              type="text" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search homework..." 
              className="input-field" 
              style={{ padding: "0.55rem 0.55rem 0.55rem 2.2rem", fontSize: "0.8rem" }}
            />
          </div>

          <select 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
            style={{ padding: "0.55rem 0.65rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#fff", fontSize: "0.78rem", fontWeight: 700 }}
          >
            <option value="All Classes">All Classes</option>
            <option value="Class 10-A">Class 10-A</option>
            <option value="Class 10-B">Class 10-B</option>
            <option value="Class 9-B">Class 9-B</option>
          </select>
        </div>

        {/* ════════════ HOMEWORK LIST CARDS ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {filtered.map((h) => (
            <div key={h.id} className="glass-card" style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  {h.class} • {h.subject}
                </span>
                <span style={{ fontSize: "0.72rem", color: h.status === "Evaluated" ? "var(--success)" : "var(--warning)", fontWeight: 800 }}>
                  {h.status}
                </span>
              </div>

              <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.35 }}>
                {h.title}
              </div>

              {/* PROGRESS BAR */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 4 }}>
                  <span>Submissions ({h.submitted}/{h.total})</span>
                  <strong style={{ color: "var(--primary)" }}>{h.percent}</strong>
                </div>
                <div style={{ width: "100%", height: 6, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <div style={{ width: h.percent, height: "100%", background: "var(--primary-gradient)", borderRadius: 99 }} />
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Due: <strong style={{ color: "#fff" }}>{h.due}</strong></span>
                
                <Link href="/homework/submissions" style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: 800, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                  View Submissions <ChevronRight size={14} />
                </Link>
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
