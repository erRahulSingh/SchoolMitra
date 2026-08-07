"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, Calendar, FileText, Award, FileBarChart2, 
  ArrowRight, Sparkles, ShieldCheck 
} from "lucide-react";

export default function SplashScreenPage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      maxHeight: "100vh",
      overflow: "hidden",
      background: "radial-gradient(circle at 50% 25%, #4f46e5 0%, #1e1b4b 50%, #0f172a 100%)",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "3.5rem 1.5rem 2rem 1.5rem",
      alignItems: "center",
      textAlign: "center"
    }}>
      
      {/* BACKGROUND DECORATIVE GLOW ORBS */}
      <div style={{
        position: "absolute",
        top: "-10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 320,
        height: 320,
        borderRadius: "50%",
        background: "rgba(124, 58, 237, 0.35)",
        filter: "blur(70px)",
        pointerEvents: "none"
      }} />

      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "-20%",
        width: 250,
        height: 250,
        borderRadius: "50%",
        background: "rgba(59, 130, 246, 0.25)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      {/* 1. ANIMATED GOLD & INDIGO EMBLEM SEAL */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          border: "3px solid #38bdf8",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(30, 27, 75, 0.95) 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.8rem",
          boxShadow: "0 12px 35px rgba(56, 189, 248, 0.35)"
        }}>
          <div style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #38bdf8 0%, #4f46e5 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(56, 189, 248, 0.4)",
            marginBottom: 4
          }}>
            <GraduationCap size={32} color="#ffffff" strokeWidth={2.2} />
          </div>

          <div style={{ fontSize: "0.75rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff", marginTop: 4 }}>
            TEACHER PORTAL
          </div>
          <div style={{ fontSize: "0.62rem", color: "#38bdf8", fontWeight: 800, marginTop: 1 }}>
            Educate • Empower • Inspire
          </div>
        </div>
      </div>

      {/* 2. CENTER HEADLINE & SUBTITLE */}
      <div style={{ position: "relative", zIndex: 10, margin: "1rem 0" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.35rem 0.85rem",
          borderRadius: "99px",
          background: "rgba(255, 255, 255, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          fontSize: "0.72rem",
          fontWeight: 800,
          color: "#38bdf8",
          marginBottom: "0.85rem",
          backdropFilter: "blur(4px)"
        }}>
          <Sparkles size={13} /> SchoolMitra SaaS ERP v2.4
        </div>

        <h1 style={{ fontSize: "1.65rem", fontWeight: 900, color: "#ffffff", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
          Teach. Manage. Empower.
        </h1>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#38bdf8", marginTop: 4, textShadow: "0 2px 10px rgba(56, 189, 248, 0.3)" }}>
          Succeed Together.
        </h2>
      </div>

      {/* 3. PROGRESS BAR & 4 FEATURE BADGES */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
        
        {/* Animated Loading Progress Bar */}
        <div style={{ width: "85%", maxWidth: 260, height: 6, background: "rgba(255, 255, 255, 0.15)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #38bdf8, #818cf8)", borderRadius: 99, transition: "width 0.1s ease" }} />
        </div>
        <div style={{ fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.8)", fontWeight: 800 }}>
          Initializing Educator Workspace... {progress}%
        </div>

        {/* 4 Feature Badges Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem", width: "100%", marginTop: "0.25rem" }}>
          {[
            { icon: Calendar, label: "Attendance", color: "#10b981", bg: "rgba(16, 185, 129, 0.2)" },
            { icon: FileText, label: "Homework", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.2)" },
            { icon: Award, label: "Weekly Tests", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.2)" },
            { icon: FileBarChart2, label: "Report Cards", color: "#ec4899", bg: "rgba(236, 72, 153, 0.2)" }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: item.bg,
                  border: `1.5px solid ${item.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.color,
                  boxShadow: `0 4px 14px ${item.bg}`
                }}>
                  <IconComp size={20} strokeWidth={2.2} />
                </div>
                <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "rgba(255, 255, 255, 0.9)" }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BOTTOM ACTION BUTTON */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", flexDirection: "column", gap: "0.85rem", marginTop: "1rem" }}>
        <Link href="/login" style={{
          width: "100%",
          padding: "0.9rem 1.25rem",
          background: "linear-gradient(135deg, #38bdf8 0%, #4f46e5 100%)",
          color: "#ffffff",
          fontSize: "0.95rem",
          fontWeight: 900,
          borderRadius: "16px",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          boxShadow: "0 8px 24px rgba(56, 189, 248, 0.4)"
        }}>
          <span>Continue to Educator Portal</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </Link>

        <div style={{ fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.65)", fontWeight: 700 }}>
          Powered by <strong style={{ color: "#ffffff" }}>SchoolMitra SaaS ERP</strong>
        </div>
      </div>

    </div>
  );
}
