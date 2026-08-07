"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, ArrowLeft, Plus, CheckCircle2, Sparkles, 
  Trash2, Edit, Save, Award 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function QuestionManagerPage() {
  const [questions, setQuestions] = useState([
    { id: "q1", num: 1, type: "MCQ (5 Marks)", text: "Find the distance between the points A(2, 3) and B(4, 1).", options: "A) 2√2, B) 4, C) √5, D) 3" },
    { id: "q2", num: 2, type: "Short Answer (5 Marks)", text: "Prove that sec²θ - tan²θ = 1 for all acute angles θ.", options: "Show step-by-step identity proof" },
    { id: "q3", num: 3, type: "Long Problem (10 Marks)", text: "Find the roots of 2x² - 7x + 3 = 0 using quadratic formula.", options: "Derive discriminant D = b² - 4ac first" }
  ]);

  const [newQText, setNewQText] = useState("");
  const [newQType, setNewQType] = useState("Short Answer (5 Marks)");
  const [added, setAdded] = useState(false);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText) return;
    const newQ = {
      id: `q_${Date.now()}`,
      num: questions.length + 1,
      type: newQType,
      text: newQText,
      options: "Subjective Solution"
    };

    setQuestions([...questions, newQ]);
    setNewQText("");
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleDelete = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

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
              Question Manager
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Manage Question Paper & Mark Weightage
            </p>
          </div>

          <Link href="/weekly-test" style={{
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
          <Link href="/weekly-test" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Test List
          </Link>
          <Link href="/weekly-test/create" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            + Create Test
          </Link>
          <Link href="/weekly-test/questions" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Questions
          </Link>
          <Link href="/weekly-test/results" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Result Entry
          </Link>
          <Link href="/weekly-test/analytics" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Analytics
          </Link>
        </div>

        {/* ADD QUESTION FORM */}
        <form onSubmit={handleAddQuestion} className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ fontSize: "0.88rem", fontWeight: 800, color: "#fff" }}>Add New Question to Paper</h3>
          
          <div className="input-group">
            <label style={{ fontSize: "0.68rem" }}>QUESTION TYPE & WEIGHTAGE</label>
            <select 
              value={newQType} 
              onChange={e => setNewQType(e.target.value)} 
              style={{ width: "100%", padding: "0.55rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: "0.8rem" }}
            >
              <option value="MCQ (5 Marks)">MCQ (5 Marks)</option>
              <option value="Short Answer (5 Marks)">Short Answer (5 Marks)</option>
              <option value="Long Problem (10 Marks)">Long Problem (10 Marks)</option>
            </select>
          </div>

          <div className="input-group">
            <label style={{ fontSize: "0.68rem" }}>QUESTION STATEMENT</label>
            <input 
              type="text" 
              value={newQText} 
              onChange={e => setNewQText(e.target.value)} 
              placeholder="Enter question text..." 
              required 
              style={{ width: "100%", padding: "0.55rem 0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: "0.82rem" }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ padding: "0.6rem", fontSize: "0.8rem" }}>
            <Plus size={15} /> Add Question
          </button>
        </form>

        {/* SUCCESS ALERT */}
        {added && (
          <div style={{
            padding: "0.75rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Question added to test paper!</span>
          </div>
        )}

        {/* ════════════ QUESTIONS LIST ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {questions.map((q) => (
            <div key={q.id} className="glass-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  Q{q.num} • {q.type}
                </span>

                <button type="button" onClick={() => handleDelete(q.id)} style={{ background: "none", border: "none", color: "var(--danger)", cursor: "pointer" }}>
                  <Trash2 size={15} />
                </button>
              </div>

              <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.35 }}>
                {q.text}
              </div>

              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                {q.options}
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
