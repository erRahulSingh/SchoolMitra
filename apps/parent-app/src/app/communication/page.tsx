"use client";

import React, { useState } from "react";
import { 
  Megaphone, MessageSquare, FileCheck, Headphones, Send, 
  Sparkles, Calendar, Clock, CheckCircle2, User, Paperclip, 
  HelpCircle, AlertCircle, ArrowRight
} from "lucide-react";

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState<"announcements" | "chat" | "leave" | "support">("announcements");

  const [messages, setMessages] = useState([
    { sender: "teacher", text: "Hello Rajesh Ji! Aarav performed exceptionally well in yesterday's Physics lab experiment.", time: "09:30 AM" },
    { sender: "parent", text: "Thank you Sunita Ma'am! We appreciate your guidance.", time: "09:35 AM" }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages(prev => [...prev, { sender: "parent", text: inputMsg, time: "Just Now" }]);
    setInputMsg("");
  };

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>Communication Center</h2>
            <span style={{ background: "rgba(16,185,129,0.2)", color: "#059669", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              Live Desk
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Announcements • Teacher Chat • Leave • Support
          </p>
        </div>

        <MessageSquare size={24} color="var(--primary)" />
      </div>

      {/* ════════════ 4-TAB SUB-NAVIGATION BAR ════════════ */}
      <div className="subtab-bar" style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.35rem",
        padding: "0.35rem", borderRadius: 16
      }}>
        {[
          { id: "announcements", label: "Notice", icon: Megaphone },
          { id: "chat", label: "Chat", icon: MessageSquare },
          { id: "leave", label: "Leave", icon: FileCheck },
          { id: "support", label: "Support", icon: Headphones }
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: "0.55rem 0.35rem", borderRadius: 12, border: "none",
              background: activeTab === t.id ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent",
              color: activeTab === t.id ? "#fff" : "var(--card-subtext)",
              fontSize: "0.72rem", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem",
              cursor: "pointer",
              boxShadow: activeTab === t.id ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none"
            }}
          >
            <t.icon size={14} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ════════════ SCREEN 1: SCHOOL ANNOUNCEMENTS ════════════ */}
      {activeTab === "announcements" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div className="card-ui" style={{ padding: "1.1rem" }}>
            <div style={{ fontSize: "0.72rem", color: "#7c3aed", fontWeight: 800, textTransform: "uppercase" }}>HOLIDAY NOTICE</div>
            <div className="text-title" style={{ fontSize: "0.95rem", fontWeight: 800, marginTop: 2 }}>School Closure on 15th August for Independence Day</div>
            <p className="text-muted-custom" style={{ fontSize: "0.82rem", marginTop: 4, lineHeight: 1.5 }}>
              The school will remain closed on 15th August 2026. Flag hoisting ceremony starts at 08:00 AM for student representatives.
            </p>
            <div className="text-muted-custom" style={{ fontSize: "0.7rem", marginTop: 8 }}>Posted 2 hours ago • Principal Office</div>
          </div>
        </div>
      )}

      {/* ════════════ SCREEN 2: TEACHER CHAT ════════════ */}
      {activeTab === "chat" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div className="card-ui" style={{ padding: "1rem 1.1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800 }}>
              SM
            </div>
            <div>
              <div className="text-title" style={{ fontSize: "0.9rem", fontWeight: 800 }}>Sunita Mehta</div>
              <div style={{ fontSize: "0.72rem", color: "#059669", fontWeight: 700 }}>Class Teacher 10-A • Online</div>
            </div>
          </div>

          <div className="subbox-ui" style={{ padding: "1rem", minHeight: 180, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.sender === "parent" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                <div style={{
                  background: m.sender === "parent" ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "var(--card-bg)",
                  padding: "0.7rem 0.85rem", borderRadius: 14, color: m.sender === "parent" ? "#fff" : "var(--card-text)", fontSize: "0.82rem", lineHeight: 1.4,
                  border: m.sender === "parent" ? "none" : "1px solid var(--card-border)"
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Type message to class teacher..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              style={{ flex: 1, padding: "0.7rem 0.85rem", borderRadius: 12, border: "1px solid var(--border-card)", background: "var(--card-bg)", color: "var(--text-main)", outline: "none", fontSize: "0.85rem" }}
            />
            <button type="submit" style={{ padding: "0.7rem 1rem", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #4f46e5, #3b82f6)", color: "#fff", fontWeight: 800, cursor: "pointer" }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
