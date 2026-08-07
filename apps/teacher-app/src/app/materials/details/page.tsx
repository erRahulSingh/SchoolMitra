"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, ArrowLeft, Download, Share2, Sparkles, 
  CheckCircle2, BookOpen, User, Eye, Copy 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function MaterialDetailsPage() {
  const [copied, setCopied] = useState(false);

  const materialDetails = {
    title: "NCERT Class 10 Mathematics Formulae & Mind Map",
    class: "Class 10-A",
    subject: "Mathematics",
    author: "Anil Dev Sharma",
    uploaded: "02 Aug 2026",
    size: "2.8 MB",
    downloads: 142,
    filename: "Class10_Math_Formula_MindMap.pdf",
    summary: "Comprehensive chapter revision notes covering Quadratic Equations, Arithmetic Progressions, Coordinate Geometry, Trigonometry, and Circles. Includes quick formula cheat sheets and solved CBSE board sample questions."
  };

  const handleShareLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`SchoolMitra Study Resource\nTitle: ${materialDetails.title}\nSubject: ${materialDetails.subject}\nAuthor: ${materialDetails.author}`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = materialDetails.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 7: Study Materials
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Material Details
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Resource Preview, Download & WhatsApp Share
            </p>
          </div>

          <Link href="/materials" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* MODULE 7 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/materials" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Material Library
          </Link>
          <Link href="/materials/upload" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Upload Material
          </Link>
          <Link href="/materials/details" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Material Details
          </Link>
        </div>

        {/* COPIED LINK ALERT */}
        {copied && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Resource link copied to clipboard for WhatsApp sharing!</span>
          </div>
        )}

        {/* ════════════ RESOURCE OVERVIEW CARD ════════════ */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
              {materialDetails.class} • {materialDetails.subject}
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 800 }}>
              {materialDetails.downloads} Downloads
            </span>
          </div>

          <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#ffffff", lineHeight: 1.35 }}>
            {materialDetails.title}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: 2 }}>
            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>AUTHOR TEACHER</div>
              <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff" }}>{materialDetails.author}</div>
            </div>

            <div style={{ padding: "0.5rem", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>FILE SIZE</div>
              <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--primary)" }}>{materialDetails.size}</div>
            </div>
          </div>
        </div>

        {/* CHAPTER OUTLINE & PDF PREVIEW CARD */}
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff" }}>Resource Summary & Topics Covered</h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.45 }}>
            {materialDetails.summary}
          </p>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.75rem" }}>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--text-muted)", marginBottom: "0.5rem" }}>FILE PREVIEW</h4>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0.9rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <FileText size={22} color="var(--primary)" />
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff" }}>{materialDetails.filename}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>PDF Document • {materialDetails.size}</div>
                </div>
              </div>

              <Download size={18} color="var(--primary)" style={{ cursor: "pointer" }} onClick={handleDownload} />
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "0.65rem" }}>
          <button type="button" onClick={handleShareLink} className="btn-secondary" style={{ flex: 1, fontSize: "0.78rem" }}>
            <Share2 size={15} /> Share Link
          </button>

          <button type="button" onClick={handleDownload} className="btn-primary" style={{ flex: 1, fontSize: "0.78rem" }}>
            <Download size={15} /> Download PDF
          </button>
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
