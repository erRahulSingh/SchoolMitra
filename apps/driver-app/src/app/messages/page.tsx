"use client";

import React, { useState } from "react";
import { 
  Menu, 
  Search, 
  Phone, 
  Users, 
  AlertCircle,
  MessageSquare
} from "lucide-react";

interface ChatItem {
  id: number;
  name: string;
  desc: string;
  time: string;
  unreadCount?: number;
  icon?: any;
  color?: string;
  bg?: string;
  isCustomIcon?: boolean;
}

interface MessagesPageProps {
  language?: string;
  onNavigate?: (tab: string) => void;
}

export default function MessagesPage({ onNavigate }: MessagesPageProps) {
  const [toggleTab, setToggleTab] = useState<"Chats" | "Channels">("Chats");
  const [searchQuery, setSearchQuery] = useState("");

  const chats: ChatItem[] = [
    {
      id: 1,
      name: "School Admin",
      desc: "Tomorrow there is a holiday on account of Republic Day.",
      time: "10:30 AM",
      unreadCount: 2,
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    } as any,
    {
      id: 2,
      name: "Transport Coordinator",
      desc: "Please start from Stop 3 today.",
      time: "9:45 AM",
      unreadCount: 1,
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100"
    } as any,
    {
      id: 3,
      name: "Maintenance Team",
      desc: "Your bus service is scheduled on 18 May 2025.",
      time: "Yesterday",
      icon: Phone,
      color: "#16a34a",
      bg: "#dcfce7",
      isCustomIcon: true
    },
    {
      id: 4,
      name: "Route Group - Morning",
      desc: "New student added at Stop 5.",
      time: "Yesterday",
      icon: Users,
      color: "#8b5cf6",
      bg: "#f3e8ff",
      isCustomIcon: true
    },
    {
      id: 5,
      name: "Driver Support Team",
      desc: "Any issue? We are here to help.",
      time: "2 Days Ago",
      icon: AlertCircle,
      color: "#2563eb",
      bg: "#dbeafe",
      isCustomIcon: true
    }
  ];

  const filteredChats = chats.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      padding: "1rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%"
    }}>



      {/* ════════════ TOGGLE BAR (CHATS VS CHANNELS) ════════════ */}
      <div style={{
        background: "#e2e8f0",
        borderRadius: "99px",
        padding: "0.22rem",
        display: "flex",
        alignItems: "center"
      }}>
        <button
          onClick={() => setToggleTab("Chats")}
          style={{
            flex: 1,
            padding: "0.55rem",
            borderRadius: "99px",
            border: "none",
            background: toggleTab === "Chats" ? "#0f52ba" : "transparent",
            color: toggleTab === "Chats" ? "#ffffff" : "#475569",
            fontSize: "0.78rem",
            fontWeight: 800,
            cursor: "pointer",
            transition: "all 0.15s"
          }}
        >
          Chats
        </button>
        <button
          onClick={() => setToggleTab("Channels")}
          style={{
            flex: 1,
            padding: "0.55rem",
            borderRadius: "99px",
            border: "none",
            background: toggleTab === "Channels" ? "#0f52ba" : "transparent",
            color: toggleTab === "Channels" ? "#ffffff" : "#475569",
            fontSize: "0.78rem",
            fontWeight: 800,
            cursor: "pointer",
            transition: "all 0.15s"
          }}
        >
          Channels
        </button>
      </div>

      {/* ════════════ SEARCH CHAT INPUT ════════════ */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Messages"
          style={{
            width: "100%",
            padding: "0.75rem 2.5rem 0.75rem 1rem",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "14px",
            fontSize: "0.85rem",
            fontWeight: 600,
            outline: "none",
            color: "#0f172a"
          }}
        />
        <Search size={18} color="#94a3b8" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }} />
      </div>

      {/* ════════════ CHATS LIST STACK ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => alert(`Opening chat window with ${chat.name}...`)}
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "1rem 1.15rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", maxWidth: "80%" }}>
              {/* Avatar circle */}
              {chat.isCustomIcon ? (
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: chat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: chat.color,
                  flexShrink: 0
                }}>
                  <chat.icon size={18} strokeWidth={2.2} />
                </div>
              ) : (
                <img
                  src={(chat as any).avatarUrl}
                  alt={chat.name}
                  onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"; }}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                />
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", overflow: "hidden" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>{chat.name}</span>
                <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                  {chat.desc}
                </span>
              </div>
            </div>

            {/* Right side status badge count and time */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem", flexShrink: 0 }}>
              <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 600 }}>{chat.time}</span>
              {chat.unreadCount && (
                <span style={{
                  background: "#22c55e",
                  color: "#ffffff",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
