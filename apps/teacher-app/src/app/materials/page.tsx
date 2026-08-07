"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Folder, Plus, ArrowLeft, Download, FileText, 
  Sparkles, ChevronRight, BookOpen, Video, Share2, 
  Search, Filter 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function MaterialLibraryPage() {
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [search, setSearch] = useState("");

  const materials = [
    { id: "mat1", title: "NCERT Class 10 Mathematics Formulae & Mind Map", class: "Class 10-A", subject: "Mathematics", type: "PDF Document", size: "2.8 MB", downloads: 142, date: "02 Aug 2026" },
    { id: "mat2", title: "Optics & Ray Diagrams Physics Practical Guide", class: "Class 9-B", subject: "Physics Lab", type: "PDF Document", size: "4.5 MB", downloads: 98, date: "29 Jul 2026" },
    { id: "mat3", title: "Trigonometric Identities Video Lecture & Proofs", class: "Class 10-A", subject: "Mathematics", type: "Video Tutorial", size: "Link", downloads: 210, date: "25 Jul 2026" }
  ];

  const filtered = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase());
    if (selectedClass === "All Classes") return matchesSearch;
    return matchesSearch && m.class === selectedClass;
  });

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
              Material Library
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Digital E-Books, Notes & Video Lectures
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

        {/* MODULE 7 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/materials" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Material Library
          </Link>
          <Link href="/materials/upload" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Upload Material
          </Link>
          <Link href="/materials/details" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Material Details
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
              placeholder="Search study materials..." 
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

        {/* ════════════ MATERIALS LIST ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {filtered.map((m) => (
            <div key={m.id} className="glass-card" style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  {m.class} • {m.subject}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  {m.downloads} Downloads
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "12px",
                  background: "rgba(99,102,241,0.15)", color: "var(--secondary)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  {m.type.includes("Video") ? <Video size={20} /> : <FileText size={20} />}
                </div>

                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.35 }}>
                    {m.title}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {m.type} • {m.size} • Uploaded {m.date}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button type="button" style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Download size={14} /> Download File
                </button>
                
                <Link href="/materials/details" style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                  View Details <ChevronRight size={14} />
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
