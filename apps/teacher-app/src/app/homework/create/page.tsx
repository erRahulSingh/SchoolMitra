"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Calendar, Upload, CheckCircle2, 
  Sparkles, FileText, BookOpen, Clock, FileUp, 
  Paperclip, Send, Bell 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function CreateHomeworkPage() {
  const router = useRouter();
  
  const [selectedClass, setSelectedClass] = useState("Class 8 - A");
  const [subject, setSubject] = useState("Mathematics");
  const [title, setTitle] = useState("Chapter 5 - Quadratic Equations & Proofs Worksheet");
  const [dueDate, setDueDate] = useState("2026-08-12");
  const [maxMarks, setMaxMarks] = useState("20");
  const [instructions, setInstructions] = useState("Solve Questions 1 to 20 from Chapter 5. Show step-by-step proofs for algebraic identities in notebook.");
  const [notifyParents, setNotifyParents] = useState(true);
  const [fileName, setFileName] = useState("Chapter5_Worksheet_Maths.pdf");
  const [saved, setSaved] = useState(false);

  const classes = ["Class 8 - A", "Class 8 - B", "Class 9 - A", "Class 10 - A"];
  const subjects = ["Mathematics", "Science", "English", "Social Science", "Hindi"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/homework");
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "100vh", overflow: "hidden", background: "var(--bg-shell)" }}>
      
      {/* 1. TOP HEADER */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 1.1rem 0.6rem 1.1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <Link href="/homework" style={{ color: "var(--card-text)" }}>
            <ArrowLeft size={22} strokeWidth={2.4} />
          </Link>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
            Create Homework
          </h1>
        </div>

        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.3rem 0.7rem",
          borderRadius: "99px",
          background: "rgba(124, 58, 237, 0.12)",
          color: "#7c3aed",
          fontSize: "0.72rem",
          fontWeight: 800
        }}>
          <Sparkles size={13} /> Class 8-A
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>
        
        {/* SUCCESS NOTIFICATION */}
        {saved && (
          <div style={{
            padding: "0.85rem 1rem",
            borderRadius: "16px",
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#10b981",
            fontSize: "0.82rem",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: "0.55rem"
          }}>
            <CheckCircle2 size={18} />
            <span>Homework created & alert dispatched to Parent App!</span>
          </div>
        )}

        {/* 2. PURPLE HERO HEADER BANNER */}
        <div style={{
          borderRadius: "22px",
          padding: "1.2rem 1.3rem",
          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 25px rgba(124, 58, 237, 0.3)"
        }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, margin: 0 }}>
              Assign New Homework
            </h2>
            <p style={{ fontSize: "0.75rem", opacity: 0.9, fontWeight: 600, marginTop: 3 }}>
              Publish worksheets & push alerts to parents
            </p>
          </div>

          <div style={{
            width: 48,
            height: 48,
            borderRadius: "16px",
            background: "rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <FileText size={24} color="#ffffff" />
          </div>
        </div>

        {/* 3. CLASS SELECTOR ROW */}
        <div>
          <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--card-subtext)", marginBottom: "0.5rem", display: "block", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            Select Class
          </label>
          <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
            {classes.map((cls) => {
              const isSel = selectedClass === cls;
              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  style={{
                    padding: "0.45rem 1rem",
                    borderRadius: "99px",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    border: "none",
                    background: isSel ? "#7c3aed" : "var(--card-bg)",
                    color: isSel ? "#ffffff" : "var(--card-subtext)",
                    boxShadow: isSel ? "0 4px 14px rgba(124, 58, 237, 0.3)" : "0 2px 8px rgba(0,0,0,0.03)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease"
                  }}
                >
                  {cls}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. SUBJECT SELECTOR ROW */}
        <div>
          <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--card-subtext)", marginBottom: "0.5rem", display: "block", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            Select Subject
          </label>
          <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
            {subjects.map((sub) => {
              const isSel = subject === sub;
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSubject(sub)}
                  style={{
                    padding: "0.45rem 1rem",
                    borderRadius: "99px",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    border: "none",
                    background: isSel ? "#3b82f6" : "var(--card-bg)",
                    color: isSel ? "#ffffff" : "var(--card-subtext)",
                    boxShadow: isSel ? "0 4px 14px rgba(59, 130, 246, 0.3)" : "0 2px 8px rgba(0,0,0,0.03)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease"
                  }}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. FORM CARD */}
        <form onSubmit={handleSubmit} className="card-white" style={{
          padding: "1.25rem",
          borderRadius: "22px",
          display: "flex",
          flexDirection: "column",
          gap: "1.1rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
        }}>
          
          {/* ASSIGNMENT TITLE */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--card-subtext)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Assignment Title
            </label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chapter 5 - Linear Equations"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "14px",
                border: "1.5px solid var(--card-border)",
                background: "var(--bg-shell)",
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "var(--card-text)",
                outline: "none"
              }}
            />
          </div>

          {/* DUE DATE & MAX MARKS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--card-subtext)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                Due Date
              </label>
              <input 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 0.8rem",
                  borderRadius: "14px",
                  border: "1.5px solid var(--card-border)",
                  background: "var(--bg-shell)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--card-text)",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--card-subtext)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                Max Marks
              </label>
              <input 
                type="number" 
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 0.8rem",
                  borderRadius: "14px",
                  border: "1.5px solid var(--card-border)",
                  background: "var(--bg-shell)",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: "var(--card-text)",
                  outline: "none"
                }}
              />
            </div>
          </div>

          {/* INSTRUCTIONS & TASK DETAILS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--card-subtext)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Task Instructions
            </label>
            <textarea 
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter instructions for students..."
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "14px",
                border: "1.5px solid var(--card-border)",
                background: "var(--bg-shell)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--card-text)",
                outline: "none",
                resize: "none",
                lineHeight: 1.4
              }}
            />
          </div>

          {/* ATTACHMENT CARD */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--card-subtext)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Attachment Worksheet
            </label>
            <div style={{
              border: "2px dashed rgba(124, 58, 237, 0.3)",
              background: "rgba(124, 58, 237, 0.04)",
              padding: "1rem",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: "10px",
                  background: "#7c3aed",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Paperclip size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--card-text)" }}>
                    {fileName}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--card-subtext)", fontWeight: 600 }}>
                    PDF • 1.4 MB (Attached)
                  </div>
                </div>
              </div>

              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#7c3aed" }}>
                Change
              </span>
            </div>
          </div>

          {/* NOTIFY PARENTS SWITCH */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.3rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
              <Bell size={18} color="#7c3aed" />
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--card-text)" }}>
                Push Alert to Parent App
              </span>
            </div>

            <input 
              type="checkbox" 
              checked={notifyParents}
              onChange={(e) => setNotifyParents(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: "#7c3aed", cursor: "pointer" }}
            />
          </div>

          {/* SUBMIT ACTION BUTTONS */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              type="button"
              onClick={() => router.push("/homework")}
              style={{
                flex: 1,
                padding: "0.85rem",
                borderRadius: "16px",
                background: "var(--card-bg)",
                border: "1.5px solid var(--card-border)",
                color: "var(--card-text)",
                fontSize: "0.85rem",
                fontWeight: 800,
                cursor: "pointer"
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                flex: 1.5,
                padding: "0.85rem",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                border: "none",
                color: "#ffffff",
                fontSize: "0.88rem",
                fontWeight: 900,
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(124, 58, 237, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem"
              }}
            >
              <Send size={16} />
              <span>Publish Homework</span>
            </button>
          </div>

        </form>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
