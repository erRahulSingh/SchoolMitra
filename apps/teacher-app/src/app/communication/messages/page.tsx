"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, SquarePen, Search, Grid, ChevronRight, MessageSquare 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ParentMessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const chats = [
    { id: 1, name: "Neha Singh", relation: "Aarav's Mother", lastMsg: "Thank you teacher for the update on Aarav's performance.", time: "10:30 AM", unread: 1, avatar: "NS", bg: "#7c3aed" },
    { id: 2, name: "Rohan Verma", relation: "Diya's Father", lastMsg: "Will there be a test next week?", time: "Yesterday", unread: 0, avatar: "RV", bg: "#3b82f6" },
    { id: 3, name: "Anjali Sharma", relation: "Parent", lastMsg: "Please share the study material for Science.", time: "18 May", unread: 0, avatar: "AS", bg: "#ec4899" },
    { id: 4, name: "Meera Joshi", relation: "Parent", lastMsg: "Requesting a meeting regarding Meera's result.", time: "17 May", unread: 0, avatar: "MJ", bg: "#10b981" },
    { id: 5, name: "Vikas Patel", relation: "Parent", lastMsg: "Thank you for your guidance.", time: "16 May", unread: 0, avatar: "VP", bg: "#f59e0b" },
  ];

  const quickReplies = [
    "Thank you for your message.",
    "I will get back to you soon.",
    "Please contact the school office."
  ];

  const filtered = chats.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.relation.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Link href="/dashboard" style={{ color: "var(--card-text)" }}>
            <ArrowLeft size={22} strokeWidth={2.4} />
          </Link>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
            Parent Messages
          </h1>
        </div>

        <button type="button" style={{ background: "none", border: "none", color: "var(--card-text)", cursor: "pointer", padding: 2 }}>
          <SquarePen size={20} />
        </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>
        
        {/* 2. SEARCH BAR */}
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <div className="card-white" style={{
            flex: 1,
            padding: "0.65rem 0.9rem",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem"
          }}>
            <Search size={18} color="var(--card-subtext)" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parent..." 
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                color: "var(--card-text)",
                fontSize: "0.85rem",
                width: "100%"
              }}
            />
          </div>
          <button type="button" className="card-white" style={{
            width: 44,
            height: 44,
            borderRadius: "16px",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--card-text)",
            cursor: "pointer"
          }}>
            <Grid size={18} />
          </button>
        </div>

        {/* 3. CHAT LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {filtered.map((chat) => (
            <div key={chat.id} className="card-white" style={{
              padding: "0.95rem 1.1rem",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
              cursor: "pointer"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flex: 1, overflow: "hidden" }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: chat.bg,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  fontWeight: 900,
                  flexShrink: 0
                }}>
                  {chat.avatar}
                </div>

                <div style={{ overflow: "hidden", paddingRight: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <span style={{ fontSize: "0.92rem", fontWeight: 900, color: "var(--card-text)" }}>
                      {chat.name}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--card-subtext)", fontWeight: 600 }}>
                      ({chat.relation})
                    </span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--card-subtext)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 2 }}>
                    {chat.lastMsg}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem", flexShrink: 0 }}>
                <span style={{ fontSize: "0.7rem", color: "var(--card-subtext)", fontWeight: 700 }}>
                  {chat.time}
                </span>
                {chat.unread > 0 && (
                  <span style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#7c3aed",
                    color: "#ffffff",
                    fontSize: "0.68rem",
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 4. QUICK REPLIES SECTION */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", marginBottom: "0.85rem" }}>
            Quick Replies
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {quickReplies.map((reply, idx) => (
              <div key={idx} className="card-white" style={{
                padding: "0.85rem 1.1rem",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#7c3aed",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer"
              }}>
                <span>{reply}</span>
                <ChevronRight size={18} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
