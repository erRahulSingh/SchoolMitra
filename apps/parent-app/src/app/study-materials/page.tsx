"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Search, 
  Folder, 
  ChevronRight, 
  FileText, 
  Video, 
  Download, 
  X, 
  BookOpen, 
  Sparkles 
} from "lucide-react";

interface StudyMaterialsPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string, params?: any) => void;
}

export default function StudyMaterialsPage({ language = "en", onNavigate }: StudyMaterialsPageProps) {
  const isHi = language === "hi";

  const [activeTab, setActiveTab] = useState<"All" | "Subjects" | "Documents" | "Videos">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const t = {
    title: isHi ? "अध्ययन सामग्री" : "Study Materials",
    all: isHi ? "सभी" : "All",
    subjects: isHi ? "विषय" : "Subjects",
    documents: isHi ? "दस्तावेज़" : "Documents",
    videos: isHi ? "वीडियो" : "Videos",
    materialsStr: isHi ? "सामग्री" : "Materials"
  };

  // 6 Folder Cards matching Screenshot 2
  const foldersList = [
    {
      id: "math",
      subject: "Mathematics",
      count: "12 Materials",
      iconType: "purple",
      bgColor: "#f3e8ff",
      iconColor: "#9333ea"
    },
    {
      id: "science",
      subject: "Science",
      count: "15 Materials",
      iconType: "green",
      bgColor: "#dcfce7",
      iconColor: "#16a34a"
    },
    {
      id: "english",
      subject: "English",
      count: "10 Materials",
      iconType: "orange",
      bgColor: "#ffedd5",
      iconColor: "#ea580c"
    },
    {
      id: "sst",
      subject: "Social Studies",
      count: "8 Materials",
      iconType: "blue",
      bgColor: "#e0f2fe",
      iconColor: "#0284c7"
    },
    {
      id: "hindi",
      subject: "Hindi",
      count: "7 Materials",
      iconType: "amber",
      bgColor: "#fef3c7",
      iconColor: "#d97706"
    },
    {
      id: "computer",
      subject: "Computer",
      count: "9 Materials",
      iconType: "indigo",
      bgColor: "#f3e8ff",
      iconColor: "#7c3aed"
    }
  ];

  const filteredFolders = foldersList.filter(f => 
    f.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ TOP HEADER BAR (EXACT MATCH REFERENCE SCREENSHOT 2) ════════════ */}
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
            onClick={() => onNavigate ? onNavigate("academics") : window.history.back()}
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

        {/* Right Side: Search Icon Button */}
        <button
          type="button"
          onClick={() => setShowSearchInput(!showSearchInput)}
          aria-label="Search Materials"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.2rem",
            color: "#0f172a"
          }}
        >
          <Search size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* Search Bar Input */}
      {showSearchInput && (
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search study materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.65rem 0.9rem",
              borderRadius: "14px",
              border: "1.5px solid #cbd5e1",
              fontSize: "0.85rem",
              outline: "none"
            }}
          />
        </div>
      )}

      {/* ════════════ 4 CAPSULE FILTER TABS (ALL, SUBJECTS, DOCUMENTS, VIDEOS) ════════════ */}
      <div style={{
        background: "#f8fafc",
        borderRadius: "99px",
        padding: "0.3rem",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "0.3rem",
        border: "1px solid #f1f5f9"
      }}>
        {[
          { id: "All", label: t.all },
          { id: "Subjects", label: t.subjects },
          { id: "Documents", label: t.documents },
          { id: "Videos", label: t.videos }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "0.55rem 0.2rem",
              borderRadius: "99px",
              border: "none",
              background: activeTab === tab.id ? "#1d4ed8" : "transparent",
              color: activeTab === tab.id ? "#ffffff" : "#475569",
              fontSize: "0.82rem",
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

      {/* ════════════ 6 FOLDER CARDS CONTAINER BOX ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
        overflow: "hidden"
      }}>
        {filteredFolders.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onNavigate && onNavigate("subjectDetails")}
            style={{
              padding: "1rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: idx < filteredFolders.length - 1 ? "1px solid #f8fafc" : "none",
              cursor: "pointer"
            }}
          >
            {/* Left Side: Folder Icon + Details */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.95rem" }}>
              {/* Colored Squircle Folder Box */}
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "16px",
                background: item.bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <Folder size={24} color={item.iconColor} strokeWidth={2.2} fill={item.iconColor} opacity={0.85} />
              </div>

              {/* Text Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <h3 style={{
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  color: "#0f172a",
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  {item.subject}
                </h3>

                <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "#64748b" }}>
                  {item.count}
                </div>
              </div>
            </div>

            {/* Right Side: Chevron Arrow */}
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2.2} />
          </div>
        ))}
      </div>

    </div>
  );
}
