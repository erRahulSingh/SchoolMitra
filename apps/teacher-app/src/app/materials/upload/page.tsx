"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Upload, ArrowLeft, Calendar, FileText, CheckCircle2, 
  Sparkles, Video, Folder, Link as LinkIcon 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function UploadMaterialPage() {
  const router = useRouter();
  
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [subject, setSubject] = useState("Mathematics");
  const [title, setTitle] = useState("NCERT Class 10 Mathematics Formulae & Revision Mind Map");
  const [category, setCategory] = useState("Lecture Notes");
  const [videoUrl, setVideoUrl] = useState("");
  const [instructions, setInstructions] = useState("Comprehensive chapter revision notes covering Algebra, Geometry and Trigonometry formula cheat sheets.");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/materials");
    }, 1500);
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
              Upload Study Material
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Share E-Books, Notes & Video Lectures with Students
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
          <Link href="/materials/upload" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Upload Material
          </Link>
          <Link href="/materials/details" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Material Details
          </Link>
        </div>

        {/* SUCCESS ALERT */}
        {saved && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Study material uploaded & published to student portal!</span>
          </div>
        )}

        {/* UPLOAD FORM */}
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="input-group">
              <label>CLASS & SECTION</label>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
              >
                <option value="Class 10-A">Class 10-A</option>
                <option value="Class 9-B">Class 9-B</option>
              </select>
            </div>

            <div className="input-group">
              <label>SUBJECT</label>
              <select 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics Lab">Physics Lab</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>RESOURCE TITLE</label>
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
            <label>CATEGORY TYPE</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
            >
              <option value="Lecture Notes">Lecture Notes (PDF)</option>
              <option value="Question Bank">Question Bank / Sample Papers</option>
              <option value="Video Tutorial">Video Lecture (YouTube/Vimeo)</option>
            </select>
          </div>

          <div className="input-group">
            <label>DESCRIPTION & SUMMARY</label>
            <textarea 
              rows={3}
              value={instructions} 
              onChange={e => setInstructions(e.target.value)} 
              className="input-field" 
              style={{ paddingLeft: "1rem", resize: "none" }}
            />
          </div>

          <div className="input-group">
            <label>UPLOAD MATERIAL FILE (PDF/DOCX/PPT)</label>
            <div style={{ border: "2px dashed rgba(255,255,255,0.15)", padding: "1.1rem", borderRadius: "var(--radius-md)", textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>
              <Upload size={24} style={{ margin: "0 auto 0.4rem auto", color: "var(--primary)" }} />
              <span>Drag & drop study file or click to browse</span>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            <CheckCircle2 size={18} /> Upload & Share to Student Portal
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
