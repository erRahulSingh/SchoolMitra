"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Mail, 
  Briefcase, 
  Building, 
  GraduationCap, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  X, 
  Sparkles 
} from "lucide-react";

interface TeacherProfilePageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string, params?: any) => void;
}

export default function TeacherProfilePage({ language = "en", onNavigate }: TeacherProfilePageProps) {
  const isHi = language === "hi";

  const [chatOpened, setChatOpened] = useState(false);

  const t = {
    title: isHi ? "शिक्षक प्रोफ़ाइल" : "Teacher Profile",
    name: "Mrs. Priya Singh",
    role: isHi ? "गणित शिक्षिका" : "Mathematics Teacher",
    experienceStr: isHi ? "10+ वर्ष का अनुभव" : "10+ Years Experience",
    aboutTitle: isHi ? "शिक्षक के बारे में" : "About Teacher",
    aboutText: isHi 
      ? "श्रीमती प्रिया सिंह एक अनुभवी गणित शिक्षिका हैं जो पढ़ाने और छात्रों को उत्कृष्टता की ओर मार्गदर्शन करने के लिए उत्सुक हैं।"
      : "Mrs. Priya Singh is an experienced Mathematics teacher who is passionate about teaching and guiding students towards excellence.",
    subjects: isHi ? "विषय" : "Subjects",
    classes: isHi ? "कक्षाएं" : "Classes",
    qualification: isHi ? "योग्यता" : "Qualification",
    experience: isHi ? "अनुभव" : "Experience"
  };

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
            onClick={() => onNavigate ? onNavigate("chat") : window.history.back()}
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

        {/* Right Side: More Options Icon */}
        <button
          type="button"
          onClick={() => alert("Teacher Options: Share Contact, Report Issue")}
          aria-label="More Options"
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
          <MoreVertical size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ TEACHER HERO CARD (DEEP ROYAL BLUE GRADIENT) ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #092058 0%, #0d3880 55%, #071946 100%)",
        borderRadius: "22px",
        padding: "1.25rem 1.2rem",
        color: "#ffffff",
        boxShadow: "0 10px 25px -4px rgba(13, 56, 128, 0.4)",
        display: "flex",
        alignItems: "center",
        gap: "1.1rem"
      }}>
        {/* Big Circular Photo Frame */}
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid rgba(255, 255, 255, 0.85)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          flexShrink: 0,
          background: "#1e293b"
        }}>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300"
            alt={t.name}
            onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150"; }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Details & Action Buttons Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <h2 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.015em",
            lineHeight: 1.2
          }}>
            {t.name}
          </h2>

          <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#dbeafe", marginTop: "2px" }}>
            {t.role}
          </div>

          <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "#bfdbfe", marginTop: "1px" }}>
            {t.experienceStr}
          </div>

          {/* Call & Message Action Buttons Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginTop: "0.55rem" }}>
            {/* Phone Call Circle Button */}
            <button
              type="button"
              onClick={() => alert("Calling Mrs. Priya Singh (+91 98765 43210)...")}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#ffffff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 3px 10px rgba(0,0,0,0.18)"
              }}
            >
              <Phone size={20} color="#092058" strokeWidth={2.2} />
            </button>

            {/* Email / Chat Circle Button */}
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate("chat") : setChatOpened(true)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#ffffff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 3px 10px rgba(0,0,0,0.18)"
              }}
            >
              <Mail size={20} color="#092058" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>

      {/* ════════════ ABOUT TEACHER SECTION ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginTop: "0.2rem" }}>
        <h3 style={{
          fontSize: "0.92rem",
          fontWeight: 800,
          color: "#0f172a",
          fontFamily: "'Outfit', sans-serif"
        }}>
          {t.aboutTitle}
        </h3>

        <p style={{
          fontSize: "0.84rem",
          color: "#334155",
          lineHeight: 1.45,
          fontWeight: 500,
          margin: 0
        }}>
          {t.aboutText}
        </p>
      </div>

      {/* ════════════ TEACHER METADATA TABLE CARD ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
        overflow: "hidden"
      }}>
        {/* Row 1: Subjects */}
        <div style={{
          padding: "1rem 1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8fafc"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <Briefcase size={20} color="#1d4ed8" strokeWidth={2} />
            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
              {t.subjects}
            </span>
          </div>
          <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#334155" }}>
            Mathematics
          </span>
        </div>

        {/* Row 2: Classes */}
        <div style={{
          padding: "1rem 1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8fafc"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <Building size={20} color="#1d4ed8" strokeWidth={2} />
            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
              {t.classes}
            </span>
          </div>
          <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#334155" }}>
            5th – 8th
          </span>
        </div>

        {/* Row 3: Qualification */}
        <div style={{
          padding: "1rem 1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8fafc"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <GraduationCap size={20} color="#1d4ed8" strokeWidth={2} />
            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
              {t.qualification}
            </span>
          </div>
          <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#334155" }}>
            M.Sc, B.Ed
          </span>
        </div>

        {/* Row 4: Experience */}
        <div style={{
          padding: "1rem 1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <Phone size={20} color="#1d4ed8" strokeWidth={2} />
            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
              {t.experience}
            </span>
          </div>
          <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#334155" }}>
            10+ Years
          </span>
        </div>
      </div>

    </div>
  );
}
