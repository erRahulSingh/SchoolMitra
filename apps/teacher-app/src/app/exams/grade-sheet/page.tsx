"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award, ArrowLeft, Download, Sparkles, CheckCircle2, 
  Layers, FileText, ChevronRight 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ExamGradeSheetPage() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");

  const gradeSheet = [
    { roll: 101, name: "Aarav Sharma", math: "93 (A1)", sci: "95 (A1)", sst: "90 (A1)", eng: "92 (A1)", total: "370/400", percent: "92.5%", result: "DISTINCTION" },
    { roll: 102, name: "Ananya Patel", math: "98 (A1)", sci: "96 (A1)", sst: "94 (A1)", eng: "95 (A1)", total: "383/400", percent: "95.75%", result: "TOPPER (DISTINCTION)" },
    { roll: 103, name: "Devansh Gupta", math: "78 (B1)", sci: "80 (B1)", sst: "82 (A2)", eng: "81 (A2)", total: "321/400", percent: "80.25%", result: "PASSED FIRST DIV" }
  ];

  const handleExportCSV = () => {
    let csv = "data:text/csv;charset=utf-8,Roll,Name,Math,Science,SST,English,Total,Percent,Result\n";
    gradeSheet.forEach(g => {
      csv += `"${g.roll}","${g.name}","${g.math}","${g.sci}","${g.sst}","${g.eng}","${g.total}","${g.percent}","${g.result}"\n`;
    });
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `Broad_Grade_Sheet_${selectedClass.replace(/\s+/g, "_")}.csv`;
    link.click();
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
              Class Grade Sheet
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Broad Grade Sheet & CBSE Performance Ledger
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
          <Link href="/exams/grade-sheet" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Grade Sheet
          </Link>
          <Link href="/exams/publish" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Publish Result
          </Link>
          <Link href="/exams/report" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Exam Report
          </Link>
        </div>

        {/* EXPORT BUTTON & SELECTOR */}
        <div className="glass-card" style={{ padding: "0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#fff" }}>Broad Sheet: Class 10-A</span>
          <button type="button" onClick={handleExportCSV} className="btn-primary" style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", width: "auto" }}>
            <Download size={14} /> Export CSV
          </button>
        </div>

        {/* ════════════ GRADE SHEET ROSTER ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {gradeSheet.map((g) => (
            <div key={g.roll} className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "#ffffff" }}>Roll #{g.roll} — {g.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 700 }}>Total: {g.total} ({g.percent})</div>
                </div>

                <span style={{ fontSize: "0.7rem", fontWeight: 900, color: "var(--success)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  {g.result}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.35rem", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.5rem" }}>
                <div style={{ padding: "0.35rem", borderRadius: 6, background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>MATH</div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff" }}>{g.math}</div>
                </div>
                <div style={{ padding: "0.35rem", borderRadius: 6, background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>SCIENCE</div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff" }}>{g.sci}</div>
                </div>
                <div style={{ padding: "0.35rem", borderRadius: 6, background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>SST</div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff" }}>{g.sst}</div>
                </div>
                <div style={{ padding: "0.35rem", borderRadius: 6, background: "rgba(255,255,255,0.03)" }}>
                  <div style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>ENGLISH</div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff" }}>{g.eng}</div>
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
