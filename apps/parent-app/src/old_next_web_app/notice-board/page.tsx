"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Filter, 
  FileText, 
  FolderLock,
  X,
  Download
} from "lucide-react";

interface NoticeBoardPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function NoticeBoardPage({ language = "en", onNavigate }: NoticeBoardPageProps) {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedCircular, setSelectedCircular] = useState<any>(null);

  const circularsList = [
    {
      id: 1,
      title: "Fee Submission Reminder",
      category: "General",
      body: "Dear Parents, this is a reminder to submit the pending fee before 15th May 2025 to avoid late fee.",
      date: "12 May 2025",
      isNew: true,
      icon: FileText,
      iconColor: "#4f46e5",
      iconBg: "#f5f3ff"
    },
    {
      id: 2,
      title: "Summer Camp Registration",
      category: "Academics",
      body: "Registrations are open for the Summer Camp 2025. Last date to register is 20th May 2025.",
      date: "10 May 2025",
      isNew: false,
      icon: FileText,
      iconColor: "#4f46e5",
      iconBg: "#f5f3ff"
    },
    {
      id: 3,
      title: "Uniform Update",
      category: "General",
      body: "New summer uniform will be applicable from 1st June 2025.",
      date: "08 May 2025",
      isNew: false,
      icon: FolderLock,
      iconColor: "#2563eb",
      iconBg: "#eff6ff"
    }
  ];

  const filteredCirculars = activeTab === "All"
    ? circularsList
    : circularsList.filter(c => c.category.toLowerCase() === activeTab.toLowerCase() || (activeTab === "Transport" && c.category === "Transport"));

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%",
      width: "100%"
    }}>

      {/* ════════════ TOP HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem",
        borderBottom: "1px solid #f1f5f9"
      }}>
        {/* Left Side: Back Arrow + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("home") : window.history.back()}
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
            fontFamily: "'Outfit', sans-serif"
          }}>
            Circulars
          </h1>
        </div>

        {/* Right Side: Filter Icon */}
        <button
          type="button"
          onClick={() => alert("Filters Circulars requested...")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.2rem"
          }}
        >
          <Filter size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ CATEGORY PILLS ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        overflowX: "auto",
        scrollbarWidth: "none",
        paddingBottom: "2px"
      }}>
        {[
          { id: "All", label: "All" },
          { id: "General", label: "General" },
          { id: "Academics", label: "Academics" },
          { id: "Transport", label: "Transport" }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.55rem 1.15rem",
              borderRadius: "99px",
              border: "none",
              background: activeTab === tab.id ? "#1d4ed8" : "#f1f5f9",
              color: activeTab === tab.id ? "#ffffff" : "#475569",
              fontSize: "0.85rem",
              fontWeight: 800,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ════════════ CIRCULARS LIST STACK ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredCirculars.map(c => {
          const IconComp = c.icon;
          return (
            <div
              key={c.id}
              onClick={() => setSelectedCircular(c)}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                border: "1px solid #e2e8f0",
                padding: "1.2rem 1.1rem",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
                display: "flex",
                gap: "1.1rem",
                position: "relative",
                cursor: "pointer"
              }}
            >
              {/* Left Side: Document Icon */}
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: c.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <IconComp size={22} color={c.iconColor} strokeWidth={2} />
              </div>

              {/* Right Side: Text Dues */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem" }}>
                  <h3 style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#1e3a8a",
                    margin: 0,
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {c.title}
                  </h3>

                  {c.isNew && (
                    <span style={{
                      background: "#16a34a",
                      color: "#ffffff",
                      borderRadius: "6px",
                      padding: "0.15rem 0.45rem",
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      New
                    </span>
                  )}
                </div>

                <p style={{
                  fontSize: "0.78rem",
                  color: "#475569",
                  lineHeight: 1.45,
                  margin: 0,
                  fontWeight: 500
                }}>
                  {c.body}
                </p>

                <span style={{ fontSize: "0.74rem", color: "#94a3b8", fontWeight: 700, marginTop: "2px" }}>
                  {c.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Button */}
      <button
        onClick={() => alert("Loading more circulars...")}
        style={{
          width: "100%",
          padding: "0.85rem",
          background: "#eff6ff",
          border: "none",
          borderRadius: "14px",
          color: "#1d4ed8",
          fontWeight: 800,
          fontSize: "0.88rem",
          cursor: "pointer",
          marginTop: "0.5rem"
        }}
      >
        View All Circulars
      </button>

      {/* ════════════ DETAIL MODAL ════════════ */}
      {selectedCircular && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div style={{
            width: "100%", maxWidth: "440px", background: "#ffffff",
            borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            padding: "1.25rem 1.25rem 2rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                {selectedCircular.title}
              </h3>
              <button type="button" onClick={() => setSelectedCircular(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <div style={{ padding: "1rem", background: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ fontSize: "0.76rem", color: "#64748b" }}>Date Issued: {selectedCircular.date}</div>
              <div style={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.5, marginTop: "4px" }}>
                {selectedCircular.body}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => {
                  alert("Downloading official Circular PDF...");
                  setSelectedCircular(null);
                }}
                style={{
                  flex: 1, padding: "0.75rem", background: "#1d4ed8",
                  border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem"
                }}
              >
                <Download size={18} />
                <span>Download PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCircular(null)}
                style={{ padding: "0.75rem 1rem", background: "#f1f5f9", border: "none", borderRadius: "14px", color: "#334155", fontWeight: 700, cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
