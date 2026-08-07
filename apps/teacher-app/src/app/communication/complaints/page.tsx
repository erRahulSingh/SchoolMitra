"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MessageSquare, ArrowLeft, Send, Sparkles, CheckCircle2, 
  AlertCircle, Clock, Check 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ComplaintRepliesPage() {
  const [repliedSuccess, setRepliedSuccess] = useState(false);

  const [complaints, setComplaints] = useState([
    { id: "c1", parent: "Mrs. Sunita Patel (Ananya's Mother)", topic: "Homework Difficulty in Trigonometry Q12", date: "Today 07:30 AM", status: "Pending", text: "Ananya is facing difficulty in proving identity #4. Could you please explain in class today?", reply: "" },
    { id: "c2", parent: "Mr. Rajesh Kumar (Aarav's Father)", topic: "Bus #01 Morning Delay", date: "Yesterday", status: "Resolved", text: "Bus #01 arrived 10 mins late today.", reply: "Notified transport manager. Bus route adjusted." }
  ]);

  const handleReplyChange = (id: string, val: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, reply: val } : c));
  };

  const handleSendReply = (id: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: "Resolved" } : c));
    setRepliedSuccess(true);
    setTimeout(() => setRepliedSuccess(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 11: Communication
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Complaint Replies
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Parent Concerns & Resolution Desk
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

        {/* MODULE 11 SUB-PAGES NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
          <Link href="/communication/messages" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Parent Messages
          </Link>
          <Link href="/communication/announcements" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Class Announcements
          </Link>
          <Link href="/communication/complaints" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Complaint Replies
          </Link>
          <Link href="/communication/notifications" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Notifications
          </Link>
        </div>

        {/* SUCCESS ALERT */}
        {repliedSuccess && (
          <div style={{
            padding: "0.85rem 1rem", borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6ee7b7", fontSize: "0.825rem", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle2 size={16} />
            <span>Resolution response sent to parent via WhatsApp SMS!</span>
          </div>
        )}

        {/* ════════════ COMPLAINTS LIST ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {complaints.map((c) => (
            <div key={c.id} className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff" }}>
                  {c.parent}
                </span>
                <span style={{
                  fontSize: "0.72rem", fontWeight: 800,
                  color: c.status === "Resolved" ? "var(--success)" : "var(--warning)",
                  background: c.status === "Resolved" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                  padding: "0.2rem 0.55rem", borderRadius: 6
                }}>
                  {c.status}
                </span>
              </div>

              <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--primary)" }}>
                {c.topic}
              </div>

              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                "{c.text}"
              </p>

              {c.status === "Pending" ? (
                <div style={{ display: "flex", gap: "0.5rem", marginTop: 4 }}>
                  <input 
                    type="text" 
                    value={c.reply}
                    onChange={e => handleReplyChange(c.id, e.target.value)}
                    placeholder="Type resolution reply..." 
                    style={{ flex: 1, padding: "0.5rem 0.75rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: "0.8rem" }}
                  />
                  <button 
                    type="button" 
                    onClick={() => handleSendReply(c.id)}
                    className="btn-primary" 
                    style={{ width: "auto", padding: "0.5rem 0.85rem", fontSize: "0.78rem" }}
                  >
                    Reply
                  </button>
                </div>
              ) : (
                <div style={{ fontSize: "0.75rem", color: "var(--success)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.4rem" }}>
                  <strong>Resolved Note:</strong> {c.reply}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
