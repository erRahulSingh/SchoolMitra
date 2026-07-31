"use client";

import React, { useState } from "react";
import { 
  Building, 
  Users, 
  Bell, 
  Bus, 
  Calendar, 
  X, 
  Send, 
  Paperclip, 
  Search, 
  CheckCheck, 
  Sparkles, 
  Clock,
  ChevronRight,
  ShieldCheck,
  MessageSquare
} from "lucide-react";

interface MessagesPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function MessagesPage({ language = "en", onNavigate }: MessagesPageProps) {
  const isHi = language === "hi";

  // Filter state
  const [activeFilter, setActiveFilter] = useState<"all" | "school" | "teacher" | "class" | "system">("all");
  
  // Selected conversation for Chat Thread Modal
  const [selectedChat, setSelectedChat] = useState<any>(null);
  
  // Chat input state inside conversation modal
  const [replyInput, setReplyInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ [key: string]: Array<{ sender: "user" | "them"; text: string; time: string }> }>({
    "1": [
      { sender: "them", text: "Dear Parents, please note that School will remain closed on 15th May 2025 due to planned facility maintenance.", time: "10:30 AM" },
      { sender: "user", text: "Thank you for the notice!", time: "10:32 AM" }
    ],
    "2": [
      { sender: "them", text: "Dear Parent, PTM is scheduled on Saturday, 20th May 2025 from 09:00 AM to 12:30 PM. Please be present to discuss Rohan's academic progress.", time: "Yesterday" },
      { sender: "user", text: "Hello Priya Ma'am, we will definitely attend. What time slot is reserved for Rohan?", time: "Yesterday 05:15 PM" },
      { sender: "them", text: "Rohan's slot is at 10:15 AM in Room 102.", time: "Yesterday 05:20 PM" }
    ],
    "3": [
      { sender: "them", text: "Please find the details of upcoming Science Exhibition project guidelines attached in the portal.", time: "2 May" }
    ],
    "4": [
      { sender: "them", text: "Notice: Fee Reminder for 1st Term Academic Fees. Kindly pay before 10th May to avoid late fee charges.", time: "1 May" }
    ],
    "5": [
      { sender: "them", text: "Bus Route Update: Route #4 morning pickup timing changed to 07:15 AM starting from 5 May.", time: "30 Apr" }
    ],
    "6": [
      { sender: "them", text: "Join us for the Annual Sports Day on 25th May 2025 at Main Sports Stadium. Registration open!", time: "28 Apr" }
    ]
  });

  const t = {
    title: isHi ? "संदेश" : "Messages",
    all: isHi ? "सभी" : "All",
    school: isHi ? "स्कूल" : "School",
    teacher: isHi ? "शिक्षक" : "Teacher",
    class: isHi ? "कक्षा" : "Class",
    system: isHi ? "सिस्टम" : "System",
    typeMessage: isHi ? "संदेश लिखें..." : "Type a message...",
    send: isHi ? "भेजें" : "Send"
  };

  // List of all messages matching the exact reference screenshot
  const allMessages = [
    {
      id: "1",
      category: "school",
      title: "Green Valley Public School",
      subject: "Holiday on 15th May 2025",
      preview: "School will remain closed on 15th May",
      time: "10:30 AM",
      unread: true,
      type: "icon",
      icon: Building,
      iconBg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      subtitle: "Official Announcement • Administration"
    },
    {
      id: "2",
      category: "teacher",
      title: "Mrs. Priya Singh",
      subject: "Regarding PTM",
      preview: "Dear Parent, PTM is scheduled on",
      time: "Yesterday",
      unread: true,
      type: "avatar",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      subtitle: "Class Teacher • Class 5th - A"
    },
    {
      id: "3",
      category: "class",
      title: "Class 5th – A",
      subject: "Class Activity",
      preview: "Please find the details of upcoming",
      time: "2 May",
      unread: false,
      type: "icon",
      icon: Users,
      iconBg: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
      subtitle: "Class Group • 38 Members"
    },
    {
      id: "4",
      category: "system",
      title: "School System",
      subject: "Notice: Fee Reminder",
      preview: "This is a reminder for pending fee",
      time: "1 May",
      unread: false,
      type: "icon",
      icon: Bell,
      iconBg: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
      subtitle: "Automated Alert • Accounts Dept"
    },
    {
      id: "5",
      category: "school",
      title: "Transport Dept.",
      subject: "Bus Route Update",
      preview: "Route timings changed from 5 May",
      time: "30 Apr",
      unread: false,
      type: "icon",
      icon: Bus,
      iconBg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      subtitle: "Bus Route #4 • GPS Alert"
    },
    {
      id: "6",
      category: "school",
      title: "Events & Activities",
      subject: "Annual Sports Day",
      preview: "Join us for the Annual Sports Day on",
      time: "28 Apr",
      unread: false,
      type: "icon",
      icon: Calendar,
      iconBg: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
      subtitle: "Sports Committee • Annual Fest"
    }
  ];

  // Filter messages based on active filter tab
  const filteredMessages = allMessages.filter(msg => {
    if (activeFilter === "all") return true;
    return msg.category === activeFilter;
  });

  // Handle sending a new message in thread
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim() || !selectedChat) return;

    const newMsg = {
      sender: "user" as const,
      text: replyInput.trim(),
      time: "Just now"
    };

    setChatHistory(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg]
    }));

    setReplyInput("");
  };

  return (
    <div style={{
      padding: "1rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ PAGE TITLE ════════════ */}
      <h1 style={{
        fontSize: "1.18rem",
        fontWeight: 800,
        color: "#0f172a",
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: "-0.015em",
        margin: "0.15rem 0 0.05rem 0"
      }}>
        {t.title}
      </h1>

      {/* ════════════ CAPSULE FILTER TABS BAR ════════════ */}
      <div style={{
        background: "#f1f5f9",
        borderRadius: "16px",
        padding: "0.3rem",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "0.25rem",
        alignItems: "center"
      }}>
        {[
          { id: "all", label: t.all },
          { id: "school", label: t.school },
          { id: "teacher", label: t.teacher },
          { id: "class", label: t.class },
          { id: "system", label: t.system }
        ].map(filter => {
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id as any)}
              style={{
                padding: "0.55rem 0.2rem",
                borderRadius: "12px",
                border: isActive ? "1.5px solid #bfdbfe" : "none",
                background: isActive ? "#ffffff" : "transparent",
                color: isActive ? "#1d4ed8" : "#64748b",
                fontWeight: isActive ? 800 : 600,
                fontSize: "0.82rem",
                cursor: "pointer",
                boxShadow: isActive ? "0 2px 8px rgba(15, 23, 42, 0.06)" : "none",
                transition: "all 0.2s ease",
                textAlign: "center"
              }}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* ════════════ MESSAGES LIST ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filteredMessages.map(msg => {
          const IconComponent = msg.icon;

          return (
            <div
              key={msg.id}
              onClick={() => setSelectedChat(msg)}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "1.05rem 1rem",
                border: "1px solid #f1f5f9",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.95rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative"
              }}
            >
              {/* Left Avatar (Photo or Gradient Icon Circle) */}
              {msg.type === "avatar" ? (
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img
                    src={msg.avatarUrl}
                    alt={msg.title}
                    onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150"; }}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 3px 10px rgba(0, 0, 0, 0.12)"
                    }}
                  />
                </div>
              ) : (
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: msg.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}>
                  {IconComponent && <IconComponent size={24} color="#ffffff" strokeWidth={2.2} />}
                </div>
              )}

              {/* Message Details Column */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Top Row: Title + Timestamp + Red Unread Dot */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.15rem" }}>
                  <h3 style={{
                    fontSize: "0.98rem",
                    fontWeight: 800,
                    color: "#0f172a",
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {msg.title}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
                    <span style={{
                      fontSize: "0.74rem",
                      fontWeight: 500,
                      color: "#64748b"
                    }}>
                      {msg.time}
                    </span>

                    {/* Red Unread Indicator Dot */}
                    {msg.unread && (
                      <span style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#ef4444",
                        display: "inline-block"
                      }} />
                    )}
                  </div>
                </div>

                {/* Middle Row: Subject Line */}
                <div style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "0.15rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {msg.subject}
                </div>

                {/* Bottom Row: Preview Snippet */}
                <div style={{
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: "#64748b",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {msg.preview}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ════════════ INTERACTIVE CHAT THREAD MODAL ════════════ */}
      {selectedChat && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(5px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div style={{
            width: "100%", maxWidth: "440px", height: "90vh",
            background: "#ffffff",
            borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
            animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "1rem 1.2rem",
              background: "#0f172a",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                {selectedChat.type === "avatar" ? (
                  <img src={selectedChat.avatarUrl} alt="" style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "2px solid #3b82f6" }} />
                ) : (
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: selectedChat.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {selectedChat.icon && <selectedChat.icon size={22} color="#fff" />}
                  </div>
                )}
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff" }}>{selectedChat.title}</h3>
                  <p style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{selectedChat.subtitle}</p>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => setSelectedChat(null)} 
                style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", padding: "0.45rem", color: "#ffffff", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Conversation Messages Scroll Area */}
            <div style={{
              flex: 1,
              padding: "1.1rem 1rem",
              background: "#f8fafc",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem"
            }}>
              {/* Subject Banner Box inside thread */}
              <div style={{
                background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)",
                borderRadius: "14px",
                padding: "0.75rem 0.9rem",
                border: "1px solid #bae6fd",
                textAlign: "center",
                marginBottom: "0.5rem"
              }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e3a8a" }}>
                  {selectedChat.subject}
                </div>
                <div style={{ fontSize: "0.68rem", color: "#475569", marginTop: "2px" }}>
                  Official School Notification Thread
                </div>
              </div>

              {/* Chat Messages */}
              {(chatHistory[selectedChat.id] || []).map((msgItem, idx) => {
                const isUser = msgItem.sender === "user";

                return (
                  <div
                    key={idx}
                    style={{
                      alignSelf: isUser ? "flex-end" : "flex-start",
                      maxWidth: "82%"
                    }}
                  >
                    <div style={{
                      padding: "0.75rem 0.95rem",
                      borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: isUser ? "linear-gradient(135deg, #1d4ed8, #1e3a8a)" : "#ffffff",
                      color: isUser ? "#ffffff" : "#0f172a",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      lineHeight: 1.4,
                      boxShadow: isUser ? "0 4px 14px rgba(29, 78, 216, 0.25)" : "0 2px 10px rgba(0,0,0,0.05)",
                      border: isUser ? "none" : "1px solid #e2e8f0"
                    }}>
                      {msgItem.text}
                    </div>

                    <div style={{
                      fontSize: "0.65rem",
                      color: "#94a3b8",
                      fontWeight: 600,
                      marginTop: "3px",
                      textAlign: isUser ? "right" : "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isUser ? "flex-end" : "flex-start",
                      gap: "3px"
                    }}>
                      <span>{msgItem.time}</span>
                      {isUser && <CheckCheck size={13} color="#2563eb" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar Form */}
            <form
              onSubmit={handleSendReply}
              style={{
                padding: "0.85rem 1rem",
                background: "#ffffff",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem"
              }}
            >
              <button
                type="button"
                style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.5rem", color: "#64748b", cursor: "pointer" }}
              >
                <Paperclip size={18} />
              </button>

              <input
                type="text"
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                placeholder={t.typeMessage}
                style={{
                  flex: 1,
                  padding: "0.7rem 0.9rem",
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  color: "#0f172a",
                  outline: "none"
                }}
              />

              <button
                type="submit"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1d4ed8, #1e3a8a)",
                  border: "none",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(29, 78, 216, 0.3)"
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
