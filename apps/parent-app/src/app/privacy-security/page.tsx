"use client";

import React from "react";
import { 
  ArrowLeft, 
  Lock, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Shield, 
  Users, 
  Download,
  ChevronRight
} from "lucide-react";

interface PrivacySecurityPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function PrivacySecurityPage({ language = "en", onNavigate }: PrivacySecurityPageProps) {
  
  const handleOptionClick = (title: string) => {
    alert(`Option "${title}" triggered...`);
  };

  const securityItems = [
    { title: "Change Password", desc: "", icon: Lock, status: "" },
    { title: "Two-Factor Authentication", desc: "", icon: ShieldCheck, status: "Enabled" },
    { title: "Login Activity", desc: "View recent login activity", icon: Smartphone, status: "" },
    { title: "Active Sessions", desc: "Manage your active sessions", icon: Laptop, status: "" }
  ];

  const privacyItems = [
    { title: "Data Privacy", desc: "How your data is used", icon: Shield },
    { title: "Manage Permissions", desc: "Control app permissions", icon: Users },
    { title: "Download My Data", desc: "Request a copy of your data", icon: Download }
  ];

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
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("profile") : window.history.back()}
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
            Privacy & Security
          </h1>
        </div>
      </div>

      {/* ════════════ SECURITY SECTION ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{
          fontSize: "0.95rem",
          fontWeight: 800,
          color: "#1e3a8a",
          fontFamily: "'Outfit', sans-serif",
          margin: 0
        }}>
          Security
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
          overflow: "hidden"
        }}>
          {securityItems.map((item, idx) => {
            const IconComp = item.icon;
            const isLast = idx === securityItems.length - 1;
            return (
              <div
                key={idx}
                onClick={() => handleOptionClick(item.title)}
                style={{
                  padding: "1rem 1.15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                  cursor: "pointer",
                  gap: "1rem"
                }}
              >
                {/* Left details */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <IconComp size={20} color="#64748b" strokeWidth={2} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>
                      {item.title}
                    </span>
                    {item.desc && (
                      <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>
                        {item.desc}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right details */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  {item.status && (
                    <span style={{
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      color: "#16a34a",
                      marginRight: "4px"
                    }}>
                      {item.status}
                    </span>
                  )}
                  <ChevronRight size={18} color="#94a3b8" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════ PRIVACY SECTION ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{
          fontSize: "0.95rem",
          fontWeight: 800,
          color: "#1e3a8a",
          fontFamily: "'Outfit', sans-serif",
          margin: 0
        }}>
          Privacy
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
          overflow: "hidden"
        }}>
          {privacyItems.map((item, idx) => {
            const IconComp = item.icon;
            const isLast = idx === privacyItems.length - 1;
            return (
              <div
                key={idx}
                onClick={() => handleOptionClick(item.title)}
                style={{
                  padding: "1rem 1.15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                  cursor: "pointer",
                  gap: "1rem"
                }}
              >
                {/* Left details */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <IconComp size={20} color="#64748b" strokeWidth={2} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>
                      {item.desc}
                    </span>
                  </div>
                </div>

                {/* Right details */}
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
