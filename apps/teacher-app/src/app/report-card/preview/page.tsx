"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, ArrowLeft, Download, Send, CheckCircle2, 
  Sparkles, Award, Star, User 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ReportCardPreviewPage() {
  const [downloaded, setDownloaded] = useState(false);

  const reportCard = {
    school: "Delhi Public School (Dwarka)",
    term: "CBSE Mid-Term Board Examination 2026",
    studentName: "Aarav Sharma",
    rollNo: "101",
    classSec: "Class 10-A",
    attendance: "96.5% (180/186 Days)",
    result: "PASSED WITH DISTINCTION",
    overallGrade: "A1 (92.5%)",
    remarks: "Aarav displays outstanding mathematical aptitude and consistent academic discipline. Keep up the brilliant performance!",
    marks: [
      { subject: "Mathematics", th: 74, pr: 19, tot: 93, gr: "A1" },
      { subject: "Science / Physics", th: 76, pr: 19, tot: 95, gr: "A1" },
      { subject: "Social Studies", th: 72, pr: 18, tot: 90, gr: "A1" },
      { subject: "English Lit", th: 74, pr: 18, tot: 92, gr: "A1" }
    ]
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`Delhi Public School Report Card\nStudent: ${reportCard.studentName}\nRoll: ${reportCard.rollNo}\nGrade: ${reportCard.overallGrade}\nResult: ${reportCard.result}`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `CBSE_ReportCard_${reportCard.studentName.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 10: Report Cards
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Report Card Preview
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Official CBSE 360° Comprehensive Student Report
            </p>
          </div>

          <Link href="/report-card" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 10 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/report-card" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Report Generator
          </Link>
          <Link href="/report-card/performance" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Student Performance
          </Link>
          <Link href="/report-card/preview" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Report Preview
          </Link>
        </div>

        {/* DOWNLOAD SUCCESS ALERT */}
        {downloaded && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Official Report Card PDF downloaded!</span>
          </div>
        )}

        {/* ════════════ OFFICIAL REPORT CARD DOCUMENT PREVIEW ════════════ */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.9rem", border: "2px solid var(--primary)" }}>
          {/* SCHOOL HEADER */}
          <div style={{ textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.75rem" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#ffffff" }}>{reportCard.school}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 800, marginTop: 2 }}>{reportCard.term}</div>
          </div>

          {/* STUDENT INFO */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#ffffff" }}>{reportCard.studentName}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Roll #{reportCard.rollNo} • {reportCard.classSec}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.88rem", fontWeight: 900, color: "var(--success)" }}>{reportCard.overallGrade}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Attendance: {reportCard.attendance}</div>
            </div>
          </div>

          {/* MARKS TABLE */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", fontSize: "0.68rem", fontWeight: 800, color: "var(--text-muted)", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 4 }}>
              <span>SUBJECT</span><span>TH</span><span>PR</span><span>TOT</span><span>GR</span>
            </div>

            {reportCard.marks.map((m, idx) => (
              <div key={idx} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", fontSize: "0.78rem", color: "#fff", fontWeight: 700 }}>
                <span>{m.subject}</span>
                <span>{m.th}</span>
                <span>{m.pr}</span>
                <span style={{ color: "var(--primary)", fontWeight: 900 }}>{m.tot}</span>
                <span style={{ color: "var(--success)" }}>{m.gr}</span>
              </div>
            ))}
          </div>

          {/* TEACHER REMARKS */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "0.75rem" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>CLASS TEACHER REMARKS</div>
            <div style={{ fontSize: "0.8rem", color: "#ffffff", fontStyle: "italic", marginTop: 2, lineHeight: 1.4 }}>
              "{reportCard.remarks}"
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <button type="button" onClick={handleDownload} className="btn-primary">
          <Download size={18} /> Download Official PDF Report
        </button>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
