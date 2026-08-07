"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Search, Bell, Plus, MoreHorizontal, 
  FileText, BookOpen, GraduationCap 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function StudyMaterialPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const materials = [
    { id: 1, title: "Photosynthesis Notes", class: "Class 8 - Science", size: "2.4 MB", date: "20 May 2024", badge: "PDF", badgeBg: "#dcfce7", badgeColor: "#15803d" },
    { id: 2, title: "Linear Equations Short Notes", class: "Class 8 - Maths", size: "1.8 MB", date: "19 May 2024", badge: "PDF", badgeBg: "#dcfce7", badgeColor: "#15803d" },
    { id: 3, title: "The Human Digestive System", class: "Class 8 - Science", size: "5.2 MB", date: "18 May 2024", badge: "PPT", badgeBg: "#ffedd5", badgeColor: "#c2410c" },
    { id: 4, title: "Tenses in English Grammar", class: "Class 8 - English", size: "1.3 MB", date: "17 May 2024", badge: "PDF", badgeBg: "#dcfce7", badgeColor: "#15803d" },
    { id: 5, title: "Periodic Table Chart", class: "Class 8 - Science", size: "1.1 MB", date: "16 May 2024", badge: "Image", badgeBg: "#fce7f3", badgeColor: "#be185d" },
  ];

  const filtered = materials.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "100vh", overflow: "hidden", background: "var(--bg-shell)", position: "relative" }}>
      
      {/* 1. TOP HEADER */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 1.1rem 0.6rem 1.1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <Link href="/academics" style={{ color: "var(--card-text)" }}>
            <ArrowLeft size={22} strokeWidth={2.4} />
          </Link>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
            Study Materials
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button type="button" style={{ background: "none", border: "none", color: "var(--card-text)", cursor: "pointer", padding: 2 }}>
            <Search size={20} />
          </button>
          <button type="button" style={{ background: "none", border: "none", color: "var(--card-text)", cursor: "pointer", padding: 2 }}>
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 5rem 1.1rem" }}>
        
        {/* 2. PURPLE HERO BANNER */}
        <div style={{
          borderRadius: "22px",
          padding: "1.35rem 1.4rem",
          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #4f46e5 100%)",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 25px rgba(124, 58, 237, 0.35)"
        }}>
          <div style={{ maxWidth: "60%" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 900, lineHeight: 1.25, margin: 0 }}>
              Share Knowledge
            </h2>
            <p style={{ fontSize: "0.75rem", opacity: 0.9, fontWeight: 600, marginTop: "0.4rem" }}>
              Upload and share study materials with your students
            </p>
          </div>

          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)"
          }}>
            <GraduationCap size={40} color="#ffffff" strokeWidth={1.8} />
          </div>
        </div>

        {/* 3. CATEGORY PILLS */}
        <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}>
          {["All", "Notes", "PDF", "Video", "Links"].map((cat) => {
            const isSel = activeTab === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "99px",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  border: "none",
                  background: isSel ? "#7c3aed" : "var(--card-bg)",
                  color: isSel ? "#ffffff" : "var(--card-subtext)",
                  boxShadow: isSel ? "0 4px 14px rgba(124, 58, 237, 0.3)" : "0 2px 8px rgba(0,0,0,0.03)",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 4. MY MATERIALS SECTION */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", marginBottom: "0.85rem" }}>
            My Materials
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filtered.map((mat) => (
              <div key={mat.id} className="card-white" style={{
                padding: "0.95rem 1.1rem",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "14px",
                    background: "rgba(124, 58, 237, 0.1)",
                    color: "#7c3aed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <BookOpen size={22} strokeWidth={2.2} />
                  </div>

                  <div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 900, color: "var(--card-text)" }}>
                      {mat.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                      {mat.class}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)", fontWeight: 500, marginTop: 1 }}>
                      {mat.size} • {mat.date}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{
                    padding: "0.2rem 0.6rem",
                    borderRadius: "8px",
                    background: mat.badgeBg,
                    color: mat.badgeColor,
                    fontSize: "0.7rem",
                    fontWeight: 900
                  }}>
                    {mat.badge}
                  </span>
                  <button type="button" style={{ background: "none", border: "none", color: "var(--card-subtext)", cursor: "pointer" }}>
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FLOATING ACTION BUTTON (+) */}
      <button 
        type="button" 
        onClick={() => alert("Upload New Study Material")}
        style={{
          position: "fixed",
          bottom: 80,
          right: 20,
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
          color: "#ffffff",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(124, 58, 237, 0.45)",
          cursor: "pointer",
          zIndex: 99
        }}
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
