"use client";

import React from "react";
import { 
  ArrowLeft,
  FileCheck,
  CheckCircle,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

interface DocItemProps {
  name: string;
  sub: string;
  validity?: string;
}

function DocumentItem({ name, sub, validity }: DocItemProps) {
  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #cbd5e1",
      borderRadius: "16px",
      padding: "1rem 1.15rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        {/* Document Icon Box */}
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          background: "#eff6ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2563eb",
          flexShrink: 0
        }}>
          <FileCheck size={18} strokeWidth={2.5} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>{name}</span>
          <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>{sub}</span>
          {validity && (
            <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 500, marginTop: "1px" }}>{validity}</span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
        <span style={{
          color: "#16a34a",
          fontSize: "0.72rem",
          fontWeight: 800,
          background: "#dcfce7",
          padding: "0.2rem 0.5rem",
          borderRadius: "6px"
        }}>
          Verified
        </span>
        <ChevronRight size={16} color="#cbd5e1" />
      </div>
    </div>
  );
}

export default function DriverDocumentsPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
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

      {/* ════════════ HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("mybus") : window.history.back()}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0" }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            Driver Documents
          </h1>
        </div>

        <button
          type="button"
          onClick={() => alert("Upload Document")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0.2rem" }}
        >
          <FileCheck size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ TOP HERO PROFILE CARD ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0b2265 0%, #0d3880 55%, #081a4b 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(11, 34, 101, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "1.15rem"
      }}>
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          flexShrink: 0
        }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"
            alt="Rajesh Kumar"
            onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"; }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", fontFamily: "'Outfit', sans-serif" }}>
            Rajesh Kumar
          </span>
          <span style={{ fontSize: "0.78rem", color: "#93c5fd", fontWeight: 600 }}>
            Driver ID: DRV00125
          </span>
          <span style={{
            background: "#22c55e",
            color: "#ffffff",
            padding: "0.15rem 0.5rem",
            borderRadius: "6px",
            fontSize: "0.62rem",
            fontWeight: 800,
            width: "fit-content",
            marginTop: "2px"
          }}>
            Verified
          </span>
        </div>
      </div>

      {/* ════════════ DOCUMENTS CALLOUT CARD ════════════ */}
      <div style={{
        background: "#eafaf1",
        border: "1px solid #a7f3d0",
        borderRadius: "16px",
        padding: "1rem 1.15rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem"
      }}>
        <div style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "#d1fae5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#10b981",
          flexShrink: 0
        }}>
          <ShieldCheck size={16} strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#065f46" }}>All documents are verified</span>
          <span style={{ fontSize: "0.74rem", color: "#059669", fontWeight: 600 }}>Valid till 30 Aug 2025</span>
        </div>
      </div>

      {/* ════════════ DOCUMENTS STACK LIST ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>
          Documents
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <DocumentItem name="Driving License" sub="UP32 2015 0001234" validity="Valid till 11 Jan 2030" />
          <DocumentItem name="Aadhaar Card" sub="XXXX XXXX 5678" />
          <DocumentItem name="Medical Certificate" sub="MC/2024/1256" validity="Valid till 15 Dec 2025" />
          <DocumentItem name="Police Verification" sub="PV/2024/3345" validity="Valid till 20 Nov 2025" />
          <DocumentItem name="Insurance Certificate" sub="INS/2024/7788" validity="Valid till 10 Apr 2026" />
        </div>
      </div>

    </div>
  );
}
