"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Search, 
  MoreVertical, 
  Users, 
  Building, 
  Bus, 
  Calendar, 
  Send, 
  X, 
  Paperclip, 
  CheckCheck,
  Sparkles
} from "lucide-react";

interface CommunicationPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string, params?: any) => void;
}

export default function CommunicationPage({ language = "en", onNavigate }: CommunicationPageProps) {
  const isHi = language === "hi";

  const [activeTab, setActiveTab] = useState<"All" | "School" | "Teachers" | "Class" | "Groups">("All");
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, sender: "Mrs. Priya Singh", text: "Dear Parent, please remind Rohan to complete the maths homework.", time: "10:30 AM", isMe: false }
  ]);

  const t = {
    title: isHi ? "संदेश" : "Messages",
    all: isHi ? "सभी" : "All",
    school: isHi ? "स्कूल" : "School",
    teachers: isHi ? "शिक्षक" : "Teachers",
    class: isHi ? "कक्षा" : "Class",
    groups: isHi ? "समूह" : "Groups",
    typePlaceholder: isHi ? "एक संदेश लिखें..." : "Type a message...",
    send: isHi ? "भेजें" : "Send",
    close: isHi ? "बंद करें" : "Close"
  };

  // 5 Chat Threads matching Screenshot 1
  const threadsList = [
    {
      id: 1,
      name: "Mrs. Priya Singh",
      subtext: "Dear Parent, please remind Rohan to complete the maths homework.",
      time: "10:30 AM",
      unread: 2,
      type: "teacher",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=180"
    },
    {
      id: 2,
      name: "Class 5th – A",
      subtext: "Reminder: PTM will be held on 20th May 2025.",
      time: "Yesterday",
      unread: 0,
      type: "class",
      bgColor: "#f43f5e",
      icon: Users
    },
    {
      id: 3,
      name: "School Admin",
      subtext: "Holiday on 15th May 2025 on account of Buddha Purnima.",
      time: "2 May",
      unread: 0,
      type: "school",
      bgColor: "#0284c7",
      icon: Building
    },
    {
      id: 4,
      name: "Transport Dept.",
      subtext: "Bus route timing changed from 5th May. Please check.",
      time: "30 Apr",
      unread: 0,
      type: "school",
      bgColor: "#16a34a",
      icon: Bus
    },
    {
      id: 5,
      name: "Events & Activities",
      subtext: "Annual Sports Day on 25th May 2025. Join us!",
      time: "28 Apr",
      unread: 0,
      type: "groups",
      bgColor: "#ea580c",
      icon: Calendar
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), sender: "You", text: inputText, time: "Just now", isMe: true }
    ]);
    setInputText("");
  };

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ TOP HEADER BAR (EXACT MATCH REFERENCE SCREENSHOT 1) ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem"
      }}>
        {/* Left Side: Back Arrow + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("home") : window.history.back()}
            aria-label="Go Back"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0",
              color: "#0f172a"
            }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>

          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.015em"
          }}>
            {t.title}
          </h1>
        </div>

        {/* Right Side: Search & More Options Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={() => alert("Search messages...")}
            aria-label="Search Messages"
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "0.1rem", color: "#0f172a" }}
          >
            <Search size={22} color="#0f172a" strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={() => alert("Message Settings: Mark all as read")}
            aria-label="More Options"
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "0.1rem", color: "#0f172a" }}
          >
            <MoreVertical size={22} color="#0f172a" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ════════════ 5 CAPSULE FILTER TABS (ALL, SCHOOL, TEACHERS, CLASS, GROUPS) ════════════ */}
      <div style={{
        background: "#f8fafc",
        borderRadius: "99px",
        padding: "0.3rem",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "0.25rem",
        border: "1px solid #f1f5f9"
      }}>
        {[
          { id: "All", label: t.all },
          { id: "School", label: t.school },
          { id: "Teachers", label: t.teachers },
          { id: "Class", label: t.class },
          { id: "Groups", label: t.groups }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "0.55rem 0.1rem",
              borderRadius: "99px",
              border: "none",
              background: activeTab === tab.id ? "#1d4ed8" : "transparent",
              color: activeTab === tab.id ? "#ffffff" : "#475569",
              fontSize: "0.8rem",
              fontWeight: activeTab === tab.id ? 800 : 600,
              cursor: "pointer",
              boxShadow: activeTab === tab.id ? "0 4px 12px rgba(29, 78, 216, 0.25)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ════════════ CHAT THREADS CONTAINER BOX ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
        overflow: "hidden"
      }}>
        {threadsList.map((item, idx) => {
          const IconComp = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === "teacher" && onNavigate) {
                  onNavigate("teacherProfile");
                } else {
                  setSelectedChat(item);
                }
              }}
              style={{
                padding: "1.05rem 1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: idx < threadsList.length - 1 ? "1px solid #f8fafc" : "none",
                cursor: "pointer"
              }}
            >
              {/* Left Side: Avatar Photo/Icon + Message Details */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.95rem" }}>
                {/* Circular Avatar */}
                {item.avatar ? (
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.12)"
                  }}>
                    <img src={item.avatar} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: item.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.12)"
                  }}>
                    {IconComp && <IconComp size={24} color="#ffffff" strokeWidth={2.2} />}
                  </div>
                )}

                {/* Name & Subtext Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", maxWidth: "190px" }}>
                  <h3 style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#0f172a",
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {item.name}
                  </h3>

                  <p style={{
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "#64748b",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    margin: 0
                  }}>
                    {item.subtext}
                  </p>
                </div>
              </div>

              {/* Right Side: Timestamp + Unread Badge */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem" }}>
                <span style={{ fontSize: "0.74rem", fontWeight: 600, color: "#94a3b8" }}>
                  {item.time}
                </span>

                {item.unread > 0 && (
                  <span style={{
                    background: "#ef4444",
                    color: "#ffffff",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    boxShadow: "0 2px 6px rgba(239, 68, 68, 0.35)"
                  }}>
                    {item.unread}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ════════════ LIVE CHAT THREAD MODAL DRAWER ════════════ */}
      {selectedChat && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div style={{
            width: "100%", maxWidth: "440px", height: "82vh", background: "#ffffff",
            borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            padding: "1.25rem 1.25rem 1rem 1.25rem", display: "flex", flexDirection: "column"
          }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.85rem", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>
                  {selectedChat.name}
                </h3>
              </div>

              <button type="button" onClick={() => setSelectedChat(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 0", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {chatMessages.map(msg => (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.isMe ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "80%",
                    background: msg.isMe ? "#1d4ed8" : "#f1f5f9",
                    color: msg.isMe ? "#ffffff" : "#0f172a",
                    padding: "0.7rem 0.95rem",
                    borderRadius: msg.isMe ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                    fontSize: "0.84rem",
                    fontWeight: 500,
                    lineHeight: 1.4
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: "3px" }}>{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Message Input Bar */}
            <form onSubmit={handleSendMessage} style={{ display: "flex", alignItems: "center", gap: "0.6rem", paddingTop: "0.6rem", borderTop: "1px solid #f1f5f9" }}>
              <input
                type="text"
                placeholder={t.typePlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{
                  flex: 1, padding: "0.7rem 1rem", borderRadius: "99px",
                  border: "1px solid #cbd5e1", fontSize: "0.84rem", outline: "none"
                }}
              />
              <button
                type="submit"
                style={{
                  width: "42px", height: "42px", borderRadius: "50%",
                  background: "#1d4ed8", border: "none", color: "#ffffff",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                }}
              >
                <Send size={18} color="#ffffff" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
