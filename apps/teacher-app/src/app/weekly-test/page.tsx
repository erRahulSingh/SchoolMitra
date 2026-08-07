"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award, Plus, ArrowLeft, Calendar, HelpCircle, 
  CheckCircle2, Sparkles, ChevronRight, BarChart2, 
  Users, Search, Filter 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function WeeklyTestListPage() {
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [search, setSearch] = useState("");

  const testList = [
    { id: "wt101", title: "Weekly Test #04 — Coordinate Geometry & Distance Formula", class: "Class 10-A", subject: "Mathematics", date: "14 Aug 2026", max: "25 Marks", status: "Scheduled" },
    { id: "wt102", title: "Weekly Test #03 — Trigonometric Identities & Proofs", class: "Class 10-A", subject: "Mathematics", date: "05 Aug 2026", max: "25 Marks", status: "Evaluated (Avg: 19.4/25)" },
    { id: "wt103", title: "Weekly Test #02 — Kinematics & Laws of Motion", class: "Class 9-B", subject: "Physics", date: "02 Aug 2026", max: "20 Marks", status: "Evaluated (Avg: 16.2/20)" }
  ];

  const filtered = testList.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase());
    if (selectedClass === "All Classes") return matchesSearch;
    return matchesSearch && t.class === selectedClass;
  });

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
              Weekly Class Tests
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Weekly Evaluation, Question Paper & Results
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

        {/* MODULE 8 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/weekly-test" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Test List
          </Link>
          <Link href="/weekly-test/create" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
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

        {/* SEARCH & FILTER */}
        <div className="glass-card" style={{ padding: "0.85rem", display: "flex", gap: "0.5rem" }}>
          <div className="input-box-wrapper" style={{ flex: 1 }}>
            <Search size={15} className="input-icon" />
            <input 
              type="text" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search weekly tests..." 
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
            <option value="Class 9-B">Class 9-B</option>
          </select>
        </div>

        {/* ════════════ TESTS LIST CARDS ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {filtered.map((t) => (
            <div key={t.id} className="glass-card" style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  {t.class} • {t.max}
                </span>
                <span style={{ fontSize: "0.72rem", color: t.status.includes("Evaluated") ? "var(--success)" : "var(--warning)", fontWeight: 800 }}>
                  {t.status}
                </span>
              </div>

              <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.35 }}>
                {t.title}
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Date: <strong style={{ color: "#fff" }}>{t.date}</strong></span>
                
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link href="/weekly-test/questions" style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, textDecoration: "none" }}>
                    Questions
                  </Link>
                  <Link href="/weekly-test/results" style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: 800, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                    Results <ChevronRight size={14} />
                  </Link>
                </div>
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
