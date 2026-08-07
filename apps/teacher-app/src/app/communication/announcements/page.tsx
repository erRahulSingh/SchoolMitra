"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, SlidersHorizontal, Megaphone, Calendar, 
  MoreHorizontal, Users, ShieldAlert, Sparkles 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const announcements = [
    {
      id: 1,
      title: "Annual Sports Day",
      desc: "All classes are informed that the Annual Sports Day will be held on 26th May 2024.",
      date: "19 May 2024 • By Admin",
      icon: Calendar,
      iconBg: "#fef3c7",
      iconColor: "#d97706"
    },
    {
      id: 2,
      title: "Exam Schedule Released",
      desc: "The exam schedule for the upcoming term has been released.",
      date: "18 May 2024 • By Admin",
      icon: Megaphone,
      iconBg: "#dbeafe",
      iconColor: "#2563eb"
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      desc: "PTM will be held on 30th May 2024. Timings: 10:00 AM - 2:00 PM",
      date: "17 May 2024 • By Admin",
      icon: Users,
      iconBg: "#dcfce7",
      iconColor: "#16a34a"
    },
    {
      id: 4,
      title: "Holiday Notice",
      desc: "The school will remain closed on Sunday, 26 May 2024.",
      date: "16 May 2024 • By Admin",
      icon: ShieldAlert,
      iconBg: "#fee2e2",
      iconColor: "#dc2626"
    }
  ];

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
          <Link href="/communication/messages" style={{ color: "var(--card-text)" }}>
            <ArrowLeft size={22} strokeWidth={2.4} />
          </Link>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
            Announcements
          </h1>
        </div>

        <button type="button" style={{ background: "none", border: "none", color: "var(--card-text)", cursor: "pointer", padding: 2 }}>
          <SlidersHorizontal size={20} />
        </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>
        
        {/* 2. FILTER PILLS */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["All", "School", "Class", "Important"].map((tab) => {
            const isSel = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "99px",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  border: "none",
                  background: isSel ? "#7c3aed" : "var(--card-bg)",
                  color: isSel ? "#ffffff" : "var(--card-subtext)",
                  boxShadow: isSel ? "0 4px 14px rgba(124, 58, 237, 0.3)" : "0 2px 8px rgba(0,0,0,0.03)",
                  cursor: "pointer"
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 3. FEATURED IMPORTANT ANNOUNCEMENT CARD */}
        <div style={{
          borderRadius: "22px",
          padding: "1.2rem 1.25rem",
          background: "linear-gradient(135deg, rgba(254, 242, 242, 0.9) 0%, rgba(243, 232, 255, 0.9) 100%)",
          border: "1.5px solid rgba(239, 68, 68, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          boxShadow: "0 6px 20px rgba(124, 58, 237, 0.08)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: "14px",
                background: "#fef3c7",
                color: "#d97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Megaphone size={20} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 900, color: "#1e1b4b", margin: 0 }}>
                Important Announcement
              </h3>
            </div>

            <span style={{ padding: "0.2rem 0.65rem", borderRadius: "99px", background: "#fef08a", color: "#854d0e", fontSize: "0.68rem", fontWeight: 900 }}>
              New
            </span>
          </div>

          <p style={{ fontSize: "0.82rem", color: "#334155", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
            School will remain closed on 25 May 2024 due to maintenance.
          </p>

          <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}>
            20 May 2024 • By Admin
          </div>
        </div>

        {/* 4. ANNOUNCEMENTS LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {announcements.map((anc) => {
            const IconC = anc.icon;
            return (
              <div key={anc.id} className="card-white" style={{
                padding: "1rem 1.1rem",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "12px",
                      background: anc.iconBg,
                      color: anc.iconColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <IconC size={20} strokeWidth={2.2} />
                    </div>

                    <h3 style={{ fontSize: "0.92rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
                      {anc.title}
                    </h3>
                  </div>

                  <button type="button" style={{ background: "none", border: "none", color: "var(--card-subtext)", cursor: "pointer" }}>
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <p style={{ fontSize: "0.8rem", color: "var(--card-text)", fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                  {anc.desc}
                </p>

                <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)", fontWeight: 700 }}>
                  {anc.date}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
