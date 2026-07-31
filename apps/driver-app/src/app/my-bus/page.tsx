"use client";

import React from "react";
import { 
  ArrowLeft,
  FileText,
  ChevronRight,
  Edit2
} from "lucide-react";

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.95rem 1rem",
      borderBottom: "1px solid #f1f5f9"
    }}>
      <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>{value}</span>
    </div>
  );
}

export default function MyBusPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
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



      {/* ════════════ TOP VEHICLE BANNER CARD ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        border: "1px solid #cbd5e1",
        boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)",
        display: "flex",
        alignItems: "center",
        gap: "1.15rem"
      }}>
        {/* Cartoon Bus Avatar Frame */}
        <div style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "#e0f2fe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          {/* Yellow Bus Icon */}
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "42px", height: "42px" }}>
            <rect x="4" y="8" width="24" height="16" rx="4" fill="#f59e0b" />
            <rect x="6" y="10" width="20" height="6" fill="#1e293b" rx="1" />
            <circle cx="10" cy="11" r="1.5" fill="#38bdf8" />
            <circle cx="22" cy="11" r="1.5" fill="#38bdf8" />
            <rect x="7" y="24" width="4" height="3" fill="#64748b" />
            <rect x="21" y="24" width="4" height="3" fill="#64748b" />
            <circle cx="9" cy="20" r="2" fill="#1e293b" />
            <circle cx="23" cy="20" r="2" fill="#1e293b" />
          </svg>
        </div>

        {/* Labels details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span style={{ fontSize: "1.2rem", fontWeight: 850, color: "#1e293b", letterSpacing: "-0.01em", fontFamily: "'Outfit', sans-serif" }}>
            UP32 AB 1234
          </span>
          <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>
            Green Valley School Bus
          </span>
          <span style={{
            background: "#dcfce7",
            color: "#16a34a",
            padding: "0.25rem 0.6rem",
            borderRadius: "8px",
            fontSize: "0.68rem",
            fontWeight: 800,
            width: "fit-content",
            marginTop: "2px"
          }}>
            Active
          </span>
        </div>
      </div>

      {/* ════════════ INFORMATION LIST STACK ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #cbd5e1",
        overflow: "hidden",
        boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
      }}>
        <InfoItem label="Bus Type" value="School Bus (52 Seater)" />
        <InfoItem label="Fuel Type" value="Diesel" />
        <InfoItem label="Registration No." value="UP32 AB 1234" />
        <InfoItem label="Fitness Valid Upto" value="15 Aug 2025" />
        <InfoItem label="Insurance Valid Upto" value="10 Dec 2025" />
        <InfoItem label="Pollution Valid Upto" value="05 Oct 2025" />
        <InfoItem label="Owner" value="Green Valley School" />
        <InfoItem label="Garage" value="Green Valley Transport" />
      </div>

      {/* ════════════ VIEW DOCUMENTS FOOTER BUTTON ════════════ */}
      <button
        onClick={() => onNavigate && onNavigate("driverdocuments")}
        style={{
          background: "#ffffff",
          border: "1px solid #cbd5e1",
          borderRadius: "16px",
          padding: "1.05rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)",
          cursor: "pointer",
          textAlign: "left"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
            <FileText size={16} strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>View Documents</span>
        </div>
        <ChevronRight size={18} color="#94a3b8" />
      </button>

    </div>
  );
}
