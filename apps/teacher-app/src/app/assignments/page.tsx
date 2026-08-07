"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, Plus, ArrowLeft, Calendar, BookOpen, 
  CheckCircle2, Sparkles, ChevronRight, Award, 
  Users, Search, Filter 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function AssignmentListPage() {
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [search, setSearch] = useState("");

  const assignmentList = [
    { id: "asg101", title: "CBSE Science Exhibition Model & Project Report", class: "Class 10-A", subject: "Science / Physics", assigned: "01 Aug 2026", due: "15 Aug 2026", submitted: 35, total: 42, percent: "83.3%", status: "Active Project" },
    { id: "asg102", title: "Indian Economic Development Presentation Slides", class: "Class 10-B", subject: "Social Studies", assigned: "28 Jul 2026", due: "10 Aug 2026", submitted: 26, total: 40, percent: "65.0%", status: "Active Project" },
    { id: "asg103", title: "English Creative Writing Portfolio", class: "Class 9-B", subject: "English Lit", assigned: "20 Jul 2026", due: "01 Aug 2026", submitted: 35, total: 35, percent: "100%", status: "Evaluated" }
  ];

  const filtered = assignmentList.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.subject.toLowerCase().includes(search.toLowerCase());
    if (selectedClass === "All Classes") return matchesSearch;
    return matchesSearch && a.class === selectedClass;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 6: Assignments
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Class Projects & Assignments
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Term Projects, Exhibition Models & Portfolios
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

        {/* MODULE 6 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/assignments" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Assignment List
          </Link>
          <Link href="/assignments/create" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Create Assignment
          </Link>
          <Link href="/assignments/review" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Review Submissions
          </Link>
          <Link href="/assignments/report" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Assignment Report
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
              placeholder="Search assignments..." 
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

        {/* ════════════ ASSIGNMENTS LIST CARDS ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {filtered.map((a) => (
            <div key={a.id} className="glass-card" style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  {a.class} • {a.subject}
                </span>
                <span style={{ fontSize: "0.72rem", color: a.status === "Evaluated" ? "var(--success)" : "var(--warning)", fontWeight: 800 }}>
                  {a.status}
                </span>
              </div>

              <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.35 }}>
                {a.title}
              </div>

              {/* PROGRESS BAR */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 4 }}>
                  <span>Projects Turned In ({a.submitted}/{a.total})</span>
                  <strong style={{ color: "var(--primary)" }}>{a.percent}</strong>
                </div>
                <div style={{ width: "100%", height: 6, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <div style={{ width: a.percent, height: "100%", background: "var(--primary-gradient)", borderRadius: 99 }} />
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Due Date: <strong style={{ color: "#fff" }}>{a.due}</strong></span>
                
                <Link href="/assignments/review" style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: 800, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                  Review Projects <ChevronRight size={14} />
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
