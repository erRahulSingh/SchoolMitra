"use client";

import React from "react";
import { 
  ArrowLeft, 
  Share2 
} from "lucide-react";

interface DigitalIdCardPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function DigitalIdCardPage({ language = "en", onNavigate }: DigitalIdCardPageProps) {
  
  const studentInfo = {
    name: "Rohan Sharma",
    classSec: "Class 5th – A",
    rollNo: "Roll No. 12",
    admissionCode: "GVPS2024/0512",
    dob: "12 Aug 2014",
    bloodGroup: "B+",
    address: "123, Green Park, Lucknow, UP – 226001",
    phone: "+91 98765 43210"
  };

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
            onClick={() => onNavigate ? onNavigate("more") : window.history.back()}
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
            Digital ID Card
          </h1>
        </div>

        <button
          type="button"
          onClick={() => alert("Sharing ID Card copy...")}
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
          <Share2 size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ DIGITAL ID CARD CONTAINER ════════════ */}
      <div style={{
        width: "100%",
        maxWidth: "380px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "24px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column"
      }}>

        {/* Diagonal Wave accents */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "12px",
          background: "linear-gradient(90deg, #1d4ed8 0%, #10b981 100%)"
        }} />

        {/* Wave corners overlay */}
        <div style={{
          position: "absolute",
          top: "12px",
          left: 0,
          width: "48px",
          height: "48px",
          background: "#1d4ed8",
          borderBottomRightRadius: "50%",
          opacity: 0.1
        }} />
        <div style={{
          position: "absolute",
          top: "12px",
          right: 0,
          width: "48px",
          height: "48px",
          background: "#10b981",
          borderBottomLeftRadius: "50%",
          opacity: 0.1
        }} />

        {/* Card Header Content */}
        <div style={{
          padding: "1.5rem 1.25rem 0.5rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.35rem"
        }}>
          {/* Logo Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            {/* mini logo graphic */}
            <div style={{
              width: "22px",
              height: "22px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #1d4ed8, #10b981)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 900
            }}>
              M
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#10b981" }}>
              School<span style={{ color: "#1d4ed8" }}>Mitra</span>
            </span>
          </div>

          {/* School Name */}
          <h2 style={{
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "#1e3a8a",
            margin: 0,
            fontFamily: "'Outfit', sans-serif"
          }}>
            Green Valley Public School
          </h2>
        </div>

        {/* Profile Avatar Frame */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0.75rem 0"
        }}>
          <div style={{
            width: "82px",
            height: "82px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid #1e3a8a",
            boxShadow: "0 4px 10px rgba(30, 58, 138, 0.15)"
          }}>
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300"
              alt={studentInfo.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <h3 style={{
            fontSize: "1.05rem",
            fontWeight: 800,
            color: "#1e3a8a",
            marginTop: "0.6rem",
            marginBottom: "0.15rem",
            fontFamily: "'Outfit', sans-serif"
          }}>
            {studentInfo.name}
          </h3>

          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2563eb" }}>
            {studentInfo.classSec}
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", marginTop: "1px" }}>
            {studentInfo.rollNo}
          </span>
        </div>

        {/* Barcode Frame */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0.4rem 0 0.8rem 0"
        }}>
          <svg width="220" height="38" viewBox="0 0 220 38" style={{ display: "block" }}>
            <path d="M10,0 h2 v38 h-2 z M15,0 h4 v38 h-4 z M22,0 h2 v38 h-2 z M27,0 h6 v38 h-6 z M36,0 h2 v38 h-2 z M41,0 h4 v38 h-4 z M48,0 h2 v38 h-2 z M53,0 h2 v38 h-2 z M58,0 h4 v38 h-4 z M65,0 h6 v38 h-6 z M74,0 h2 v38 h-2 z M79,0 h2 v38 h-2 z M84,0 h4 v38 h-4 z M91,0 h2 v38 h-2 z M96,0 h6 v38 h-6 z M105,0 h2 v38 h-2 z M110,0 h4 v38 h-4 z M117,0 h2 v38 h-2 z M122,0 h2 v38 h-2 z M127,0 h4 v38 h-4 z M134,0 h6 v38 h-6 z M143,0 h2 v38 h-2 z M148,0 h2 v38 h-2 z M153,0 h4 v38 h-4 z M160,0 h2 v38 h-2 z M165,0 h6 v38 h-6 z M174,0 h2 v38 h-2 z M179,0 h4 v38 h-4 z M186,0 h2 v38 h-2 z M191,0 h2 v38 h-2 z M196,0 h4 v38 h-4 z M203,0 h6 v38 h-6 z M212,0 h2 v38 h-2 z" fill="#0f172a" />
          </svg>
          <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#1e3a8a", marginTop: "4px", letterSpacing: "0.03em" }}>
            {studentInfo.admissionCode}
          </span>
        </div>

        {/* Separator line */}
        <div style={{ height: "1px", background: "#f1f5f9", margin: "0 1.25rem" }} />

        {/* Card Meta Details rows */}
        <div style={{
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600 }}>D.O.B</span>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>{studentInfo.dob}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600 }}>Blood Group</span>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>{studentInfo.bloodGroup}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", gap: "1rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600, flexShrink: 0 }}>Address</span>
            <span style={{ fontWeight: 700, color: "#0f172a", textAlign: "right", lineHeight: 1.35 }}>
              {studentInfo.address}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
            <span style={{ color: "#64748b", fontWeight: 600 }}>Phone</span>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>{studentInfo.phone}</span>
          </div>
        </div>

        {/* Card Footer signatures decoration */}
        <div style={{
          padding: "0.75rem 1.5rem 1.25rem 1.5rem",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #f1f5f9"
        }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 500 }}>This ID card is valid for</span>
            <span style={{ fontSize: "0.72rem", color: "#1e3a8a", fontWeight: 700, marginTop: "1px" }}>Academic Year 2024-25</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* principal script signature drawing */}
            <span style={{
              fontFamily: "'Brush Script MT', cursive, sans-serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#475569",
              transform: "rotate(-4deg)",
              letterSpacing: "0.03em"
            }}>
              A.K. Singh
            </span>
            <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, borderTop: "1px dashed #cbd5e1", paddingTop: "2px", marginTop: "2px" }}>
              Principal
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
