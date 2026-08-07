"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MessageSquare, ArrowLeft, Send, User, Sparkles, 
  CheckCircle2, Clock, Search 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ParentMessagesPage() {
  const [selectedParent, setSelectedParent] = useState("Mr. Rajesh Kumar (Aarav's Father)");
  const [replyText, setReplyText] = useState("");

  const [chatMessages, setChatMessages] = useState([
    { id: "m1", sender: "parent", text: "Good morning Sir, regarding Aarav's math weekly test score, can we discuss his section formula revision?", time: "08:15 AM" },
    { id: "m2", sender: "teacher", text: "Good morning Mr. Rajesh! Aarav performed very well in trigonometry (23/25). I have assigned extra practice problems for section formula.", time: "08:42 AM" },
    { id: "m3", sender: "parent", text: "Thank you so much Sir! We will make sure he completes the worksheet today.", time: "09:05 AM" }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      id: `m_${Date.now()}`,
      sender: "teacher",
      text: replyText,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages([...chatMessages, newMsg]);
    setReplyText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Module 11: Communication
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Parent Messages
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              1-on-1 Educator Parent Chat Stream
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
          <Link href="/communication/messages" className="btn-primary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Parent Messages
          </Link>
          <Link href="/communication/announcements" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Class Announcements
          </Link>
          <Link href="/communication/complaints" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Complaint Replies
          </Link>
          <Link href="/communication/notifications" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", textDecoration: "none", whiteSpace: "nowrap" }}>
            Notifications
          </Link>
        </div>

        {/* SELECT PARENT */}
        <div className="glass-card" style={{ padding: "0.85rem" }}>
          <select 
            value={selectedParent} 
            onChange={e => setSelectedParent(e.target.value)}
            style={{ width: "100%", padding: "0.65rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: "0.82rem", fontWeight: 800 }}
          >
            <option value="Mr. Rajesh Kumar (Aarav's Father)">Mr. Rajesh Kumar (Aarav Sharma's Father)</option>
            <option value="Mrs. Sunita Patel (Ananya's Mother)">Mrs. Sunita Patel (Ananya Patel's Mother)</option>
          </select>
        </div>

        {/* ════════════ CHAT STREAM ════════════ */}
        <div className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem", minHeight: 260 }}>
          {chatMessages.map((msg) => (
            <div 
              key={msg.id}
              style={{
                alignSelf: msg.sender === "teacher" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "0.75rem 0.9rem",
                borderRadius: msg.sender === "teacher" ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                background: msg.sender === "teacher" ? "var(--primary-gradient)" : "rgba(255,255,255,0.06)",
                border: msg.sender === "teacher" ? "none" : "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff"
              }}
            >
              <div style={{ fontSize: "0.82rem", lineHeight: 1.4 }}>{msg.text}</div>
              <div style={{ fontSize: "0.65rem", opacity: 0.8, textAlign: "right", marginTop: 3 }}>{msg.time}</div>
            </div>
          ))}
        </div>

        {/* INPUT BOX */}
        <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "0.5rem" }}>
          <input 
            type="text" 
            value={replyText} 
            onChange={e => setReplyText(e.target.value)} 
            placeholder="Type parent reply..." 
            className="input-field" 
            style={{ paddingLeft: "1rem", flex: 1 }}
          />
          <button type="submit" className="btn-primary" style={{ width: "auto", padding: "0.85rem 1.1rem" }}>
            <Send size={18} />
          </button>
        </form>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
