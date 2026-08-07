"use client";

import React from "react";
import { 
  ArrowLeft, 
  Droplet, 
  Ruler, 
  Weight, 
  ShieldAlert, 
  Activity, 
  User, 
  Phone,
  ShieldPlus,
  Info
} from "lucide-react";

interface MedicalDetailsPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function MedicalDetailsPage({ language = "en", onNavigate }: MedicalDetailsPageProps) {
  
  const studentInfo = {
    name: "Rohan Sharma",
    classSec: "Class 5th – A",
    rollNo: "Roll No. 12",
    bloodGroup: "B+",
    height: "142 cm",
    weight: "32 kg",
    allergies: "No Known Allergies",
    chronicConditions: "None",
    disabilities: "None",
    emergencyContact: "Anjali Sharma (Mother)",
    emergencyPhone: "+91 98765 43210"
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
            Health / Medical Details
          </h1>
        </div>
      </div>

      {/* ════════════ HERO CARD (BLUE/PURPLE GRADIENT) ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 50%, #312e81 100%)",
        borderRadius: "22px",
        padding: "1.25rem 1.2rem",
        color: "#ffffff",
        boxShadow: "0 10px 25px rgba(79, 70, 229, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
          {/* Student Avatar */}
          <div style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            flexShrink: 0,
            background: "#fef3c7"
          }}>
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300"
              alt={studentInfo.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <h2 style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "#ffffff",
              fontFamily: "'Outfit', sans-serif",
              margin: 0
            }}>
              {studentInfo.name}
            </h2>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#bfdbfe" }}>
              {studentInfo.classSec}
            </div>
            <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "#93c5fd" }}>
              {studentInfo.rollNo}
            </div>
          </div>
        </div>

        {/* Shield outline plus badge icon */}
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          <ShieldPlus size={26} color="#ffffff" strokeWidth={2} />
        </div>
      </div>

      {/* ════════════ MEDICAL INFORMATION ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
          Medical Information
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
          overflow: "hidden"
        }}>
          {[
            { label: "Blood Group", value: studentInfo.bloodGroup, icon: Droplet },
            { label: "Height", value: studentInfo.height, icon: Ruler },
            { label: "Weight", value: studentInfo.weight, icon: Weight },
            { label: "Allergies", value: studentInfo.allergies, icon: ShieldAlert },
            { label: "Chronic Conditions", value: studentInfo.chronicConditions, icon: Activity },
            { label: "Disabilities", value: studentInfo.disabilities, icon: User }
          ].map((row, idx, arr) => {
            const IconComp = row.icon;
            const isLast = idx === arr.length - 1;
            return (
              <div
                key={idx}
                style={{
                  padding: "0.95rem 1.15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                  fontSize: "0.88rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <IconComp size={18} color="#64748b" strokeWidth={2.2} />
                  <span style={{ fontWeight: 700, color: "#475569" }}>{row.label}</span>
                </div>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>{row.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════ EMERGENCY CONTACT ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
          Emergency Contact
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
          overflow: "hidden"
        }}>
          <div style={{
            padding: "0.95rem 1.15rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f1f5f9",
            fontSize: "0.88rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <User size={18} color="#64748b" strokeWidth={2.2} />
              <span style={{ fontWeight: 700, color: "#475569" }}>Name</span>
            </div>
            <span style={{ fontWeight: 800, color: "#0f172a" }}>{studentInfo.emergencyContact}</span>
          </div>

          <div style={{
            padding: "0.95rem 1.15rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.88rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <Phone size={18} color="#64748b" strokeWidth={2.2} />
              <span style={{ fontWeight: 700, color: "#475569" }}>Phone</span>
            </div>
            <span style={{ fontWeight: 800, color: "#0f172a" }}>{studentInfo.emergencyPhone}</span>
          </div>
        </div>
      </div>

      {/* ════════════ ADVICE BANNER ════════════ */}
      <div style={{
        background: "#eff6ff",
        borderRadius: "14px",
        border: "1px solid #bfdbfe",
        padding: "0.85rem 1rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.65rem",
        marginTop: "0.25rem"
      }}>
        <Info size={18} color="#2563eb" style={{ marginTop: "2px", flexShrink: 0 }} />
        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1d4ed8", lineHeight: 1.4 }}>
          Please inform the school about any changes in your child&apos;s health.
        </span>
      </div>

    </div>
  );
}
