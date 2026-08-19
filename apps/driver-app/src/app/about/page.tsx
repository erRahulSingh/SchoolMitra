"use client";

import React from "react";
import { 
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
  FileText,
  Award,
  Star,
  Info
} from "lucide-react";

interface AboutOptionProps {
  icon: any;
  label: string;
  sub?: string;
}

function AboutOption({ icon: Icon, label, sub }: AboutOptionProps) {
  return (
    <div 
      onClick={() => alert(`Opening details for ${label}...`)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.95rem 1.15rem",
        borderBottom: "1px solid #f1f5f9",
        background: "#ffffff",
        cursor: "pointer"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0 }}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>{label}</span>
          {sub && (
            <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 650 }}>{sub}</span>
          )}
        </div>
      </div>
      <ChevronRight size={16} color="#cbd5e1" />
    </div>
  );
}

export default function AboutAppPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  return (
    <div style={{
      padding: "1rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%"
    }}>



      {/* ════════════ CENTER VECTOR BUS GRAPHIC ════════════ */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        margin: "1rem 0",
        textAlign: "center"
      }}>
        {/* Landscape bus SVG frame */}
        <div style={{
          width: "120px",
          height: "80px",
          background: "#eff6ff",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2563eb",
          boxShadow: "0 6px 14px rgba(37, 99, 235, 0.05)"
        }}>
          {/* Blue Bus Icon */}
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "60px", height: "60px" }}>
            <rect x="2" y="8" width="28" height="16" rx="4" fill="#2563eb" />
            <rect x="4" y="10" width="24" height="6" fill="#1e293b" rx="1" />
            <circle cx="8" cy="11" r="1.5" fill="#38bdf8" />
            <circle cx="24" cy="11" r="1.5" fill="#38bdf8" />
            <circle cx="7" cy="20" r="2.5" fill="#1e293b" />
            <circle cx="25" cy="20" r="2.5" fill="#1e293b" />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0d3880", fontFamily: "'Outfit', sans-serif", margin: 0 }}>
            SchoolMitra Driver
          </h2>
          <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 700 }}>
            Version 1.0.0
          </span>
          <p style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500, maxWidth: "200px", margin: "2px 0 0 0", lineHeight: 1.4 }}>
            Your trusted partner for safe and smart student transport.
          </p>
        </div>
      </div>

      {/* ════════════ OPTIONS STACK LIST ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #cbd5e1",
        overflow: "hidden",
        boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
      }}>
        <AboutOption icon={ShieldAlert} label="Privacy Policy" />
        <AboutOption icon={FileText} label="Terms & Conditions" />
        <AboutOption icon={Award} label="Licenses" />
        <AboutOption icon={Star} label="Rate Us" sub="Share your feedback" />
        <AboutOption icon={Info} label="Developer Information" sub="SchoolMitra Technologies Pvt. Ltd." />
      </div>

    </div>
  );
}
