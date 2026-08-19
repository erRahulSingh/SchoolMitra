"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, CheckCircle2, Users, Bus, FileText,
  TrendingUp, Clock, CreditCard, MessageSquare, Sparkles,
  ChevronDown, Shield, Award, Smartphone, Activity,
  MapPin, Star, BarChart3, Bell, Building2,
  Wallet, QrCode, CalendarCheck, ClipboardCheck, MessageCircle, Globe, BookOpen, Send,
  Zap, Compass, Lock, Check
} from "lucide-react";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeRole, setActiveRole] = useState("all");
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background: "var(--bg-page)",
      minHeight: "100vh",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      overflowX: "hidden",
      WebkitFontSmoothing: "antialiased"
    }}>
      {/* ========== TOP NAVBAR ========== */}
      <Navbar />

      {/* ========== HERO SECTION (COMPACT & SLEEK) ========== */}
      <section className="hero-wrapper" style={{
        paddingTop: "110px",
        paddingBottom: "35px",
        paddingLeft: "5%",
        paddingRight: "5%",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Ambient Glow Orbs */}
        <div className="anim-orb-1" style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0
        }} />
        <div className="anim-orb-2" style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(249, 115, 22, 0.1) 40%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0
        }} />

        <div className="hero-grid-container" style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "2.8rem",
          alignItems: "center",
          maxWidth: "1240px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1
        }}>
          {/* Left Column */}
          <div className="hero-left">
            <div className="shimmer-badge" style={{ marginBottom: "1rem", padding: "0.3rem 0.85rem" }}>
              <Sparkles size={14} color="#8b5cf6" />
              <span className="gradient-text-vibrant" style={{ fontWeight: 600, fontSize: "0.82rem" }}>#1 School ERP &amp; GPS Telemetry</span>
              <span style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 700,
                padding: "0.12rem 0.45rem",
                borderRadius: "99px"
              }}>
                v3.0 LIVE
              </span>
            </div>

            <h1 className="hero-title" style={{
              fontSize: "clamp(2.1rem, 3.4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.18,
              color: "var(--text-main)",
              letterSpacing: "-0.025em",
              marginBottom: "1rem"
            }}>
              Simplify School Operations &amp; <span className="gradient-text-sunset">Parent Engagement</span>
            </h1>

            <p className="hero-subtitle" style={{
              fontSize: "1.02rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: "500px",
              marginBottom: "1.4rem",
              fontWeight: 400
            }}>
              All-in-one cloud platform uniting automated administration, real-time bus tracking, instant fee collections, and dedicated mobile apps.
            </p>

            {/* Compact Feature Chips */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1.6rem"
            }}>
              {[
                { label: "Live GPS Telemetry", icon: "🚌", color: "#2563eb", bg: "rgba(59, 130, 246, 0.08)", border: "rgba(59, 130, 246, 0.25)" },
                { label: "1-Click UPI Fees", icon: "💳", color: "#d97706", bg: "rgba(245, 158, 11, 0.08)", border: "rgba(245, 158, 11, 0.25)" },
                { label: "Smart Attendance", icon: "📊", color: "#059669", bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.25)" },
                { label: "Parent Mobile App", icon: "📱", color: "#7c3aed", bg: "rgba(139, 92, 246, 0.08)", border: "rgba(139, 92, 246, 0.25)" }
              ].map((chip, idx) => (
                <span key={idx} style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "99px",
                  background: chip.bg,
                  border: `1px solid ${chip.border}`,
                  color: chip.color,
                  fontSize: "0.75rem",
                  fontWeight: 600
                }}>
                  <span>{chip.icon}</span> {chip.label}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hero-cta-group" style={{ display: "flex", gap: "0.85rem", alignItems: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-vibrant-gradient"
                style={{
                  padding: "0.85rem 1.8rem",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  fontWeight: 600
                }}
              >
                <Zap size={16} /> Request Free Demo
              </button>

              <Link
                href="#features"
                className="btn-colorful-outline"
                style={{
                  padding: "0.85rem 1.5rem",
                  borderRadius: "12px",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                <Compass size={16} color="#6366f1" /> Explore Platform
              </Link>
            </div>
          </div>

          {/* Right Column: Compact Visual Showcase */}
          <div className="showcase-container" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              position: "absolute",
              inset: "-15px",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(236, 72, 153, 0.2) 50%, rgba(6, 182, 212, 0.2) 100%)",
              borderRadius: "28px",
              filter: "blur(24px)",
              zIndex: 0
            }}></div>

            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "440px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.35)",
              boxShadow: "0 20px 50px -10px rgba(67, 56, 202, 0.25)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/hero-dashboard.png"
                alt="SchoolMitra ERP Dashboard"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover"
                }}
              />
            </div>

            {/* Floating Badge 1 - Top Right */}
            <div className="anim-float-badge-1" style={{
              position: "absolute",
              top: "-12px",
              right: "-12px",
              background: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              padding: "0.55rem 0.9rem",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#ffffff",
              zIndex: 3
            }}>
              <div className="radar-pulse-dot" style={{ width: 9, height: 9, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }}></div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#34d399" }}>Live ERP Sync</div>
                <div style={{ fontSize: "0.62rem", color: "#cbd5e1", fontWeight: 500 }}>Web + Mobile Active</div>
              </div>
            </div>

            {/* Floating Badge 2 - Bottom Left */}
            <div className="anim-float-badge-2" style={{
              position: "absolute",
              bottom: "-12px",
              left: "-12px",
              background: "var(--bg-card)",
              borderRadius: "12px",
              padding: "0.55rem 0.9rem",
              boxShadow: "0 12px 30px rgba(59, 130, 246, 0.2)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              zIndex: 3
            }}>
              <div style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "linear-gradient(135deg, #0284c7, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff"
              }}>
                <BarChart3 size={16} />
              </div>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-main)" }}>99.9% GPS Uptime</div>
                <div style={{ fontSize: "0.64rem", color: "#0284c7", fontWeight: 600 }}>Live Telemetry</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== METRICS & STATS SECTION ========== */}
      <section style={{
        padding: "45px 5%",
        textAlign: "center",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        background: "linear-gradient(180deg, var(--bg-subtle) 0%, var(--bg-page) 100%)"
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <span className="shimmer-badge" style={{ marginBottom: "0.6rem", padding: "0.25rem 0.75rem", fontSize: "0.76rem" }}>
              <Sparkles size={12} color="#f59e0b" /> TRUSTED BY 500+ SCHOOLS NATIONWIDE
            </span>

            <h2 style={{
              fontSize: "clamp(1.7rem, 2.6vw, 2.3rem)",
              fontWeight: 700,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem"
            }}>
              Empowering India&apos;s <span className="gradient-text-sunset">Leading Schools</span>
            </h2>
            <p style={{
              color: "var(--text-muted)",
              fontSize: "0.98rem",
              maxWidth: "580px",
              margin: "0 auto",
              lineHeight: 1.55,
              fontWeight: 400
            }}>
              Powers daily school administration, bus tracking, and parent communication with seamless reliability.
            </p>
          </div>

          {/* 4 Compact Stat Counters */}
          <div className="metrics-counter-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.2rem",
            marginBottom: "2.2rem"
          }}>
            {[
              { val: "500+", lbl: "Partner Schools", sub: "Across 28+ states", icon: <Building2 size={20} color="#ffffff" />, themeGrad: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#6366f1" },
              { val: "2,50,000+", lbl: "Active Users", sub: "Parents & Students", icon: <Users size={20} color="#ffffff" />, themeGrad: "linear-gradient(135deg, #059669, #10b981)", color: "#059669" },
              { val: "99.9%", lbl: "GPS & Cloud Uptime", sub: "Real-time satellite sync", icon: <Shield size={20} color="#ffffff" />, themeGrad: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#0284c7" },
              { val: "4.9 ★", lbl: "Parent App Rating", sub: "Play Store & iOS", icon: <Star size={20} color="#ffffff" />, themeGrad: "linear-gradient(135deg, #d97706, #f59e0b)", color: "#d97706" }
            ].map((m, idx) => (
              <div
                key={idx}
                className="colorful-card"
                style={{
                  background: "var(--bg-card)",
                  padding: "1.2rem 1.1rem",
                  borderRadius: "16px",
                  border: "1.5px solid var(--border-color)",
                  boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  textAlign: "left",
                  "--card-top-gradient": m.themeGrad,
                  "--card-glow-color": "rgba(99, 102, 241, 0.1)"
                } as React.CSSProperties}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: m.themeGrad,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 6px 14px rgba(0, 0, 0, 0.12)"
                }}>
                  {m.icon}
                </div>
                <div>
                  <div style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)", lineHeight: 1.1 }}>{m.val}</div>
                  <div style={{ fontSize: "0.8rem", color: m.color, fontWeight: 600, marginTop: "0.15rem" }}>{m.lbl}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 400 }}>{m.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 6 Clean Partner School Cards */}
          <div className="school-cards-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.4rem"
          }}>
            {[
              { name: "St. Xavier's International School", city: "New Delhi", students: "2,400+ Students", type: "CBSE", icon: <GraduationCap size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #4f46e5, #7c3aed)", tagColor: "#6366f1", tag: "ERP & GPS" },
              { name: "Delhi Public Academy", city: "Mumbai", students: "3,800+ Students", type: "ICSE", icon: <Building2 size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #059669, #10b981)", tagColor: "#10b981", tag: "Verified Partner" },
              { name: "Ryan Global Foundation", city: "Bengaluru", students: "5,200+ Students", type: "Multi-Branch", icon: <Globe size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #7c3aed, #ec4899)", tagColor: "#ec4899", tag: "Enterprise Suite" },
              { name: "Heritage World School", city: "Gurugram", students: "1,950+ Students", type: "IB World", icon: <Award size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #d97706, #f59e0b)", tagColor: "#f59e0b", tag: "Parent Top Pick" },
              { name: "Cambridge International", city: "Pune", students: "2,200+ Students", type: "IGCSE", icon: <Shield size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #0284c7, #06b6d4)", tagColor: "#0284c7", tag: "Auto Fees" },
              { name: "Apex Public Senior School", city: "Hyderabad", students: "3,100+ Students", type: "Central Board", icon: <Sparkles size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #db2777, #f43f5e)", tagColor: "#f43f5e", tag: "Live Attendance" }
            ].map((school, i) => (
              <div
                key={i}
                className="colorful-card"
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "18px",
                  padding: "1.3rem",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "left",
                  "--card-top-gradient": school.badgeBg,
                  "--card-glow-color": "rgba(99, 102, 241, 0.12)"
                } as React.CSSProperties}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    background: school.badgeBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.12)"
                  }}>
                    {school.icon}
                  </div>
                  <span style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: school.tagColor,
                    background: `${school.tagColor}12`,
                    padding: "0.22rem 0.6rem",
                    borderRadius: "99px"
                  }}>
                    {school.tag}
                  </span>
                </div>

                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.3rem" }}>
                    {school.name}
                  </h4>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500, marginBottom: "0.85rem" }}>
                    <span style={{ color: school.tagColor, fontWeight: 600 }}>📍 {school.city}</span> • <span>{school.type}</span>
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "0.75rem"
                }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-main)" }}>
                    👥 {school.students}
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#10b981", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <CheckCircle2 size={13} /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 12 FEATURES MODULES GRID ========== */}
      <section id="features" style={{ padding: "50px 5% 70px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Zap size={12} color="#3b82f6" /> 12+ ESSENTIAL ERP MODULES
          </span>

          <h2 style={{
            fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
            marginBottom: "0.6rem"
          }}>
            Powerful Features <span className="gradient-text-vibrant">for Every Role</span>
          </h2>
          <p style={{
            fontSize: "0.98rem",
            color: "var(--text-muted)",
            lineHeight: 1.55,
            fontWeight: 400
          }}>
            Purpose-built tools for school administrators, teachers, parents, students, and bus drivers.
          </p>
        </div>

        {/* Role Filter Tabs */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "2.2rem",
          flexWrap: "wrap"
        }}>
          {[
            { id: "all", label: "All 12 Features", grad: "linear-gradient(135deg, #4f46e5, #7c3aed)" },
            { id: "admin", label: "School Admin", grad: "linear-gradient(135deg, #0284c7, #06b6d4)" },
            { id: "teachers", label: "Teachers", grad: "linear-gradient(135deg, #059669, #10b981)" },
            { id: "parents", label: "Parents", grad: "linear-gradient(135deg, #db2777, #ec4899)" },
            { id: "students", label: "Students", grad: "linear-gradient(135deg, #d97706, #f59e0b)" },
            { id: "drivers", label: "Bus Drivers", grad: "linear-gradient(135deg, #0d9488, #14b8a6)" }
          ].map((tab) => {
            const isActive = activeRole === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveRole(tab.id)}
                style={{
                  padding: "0.55rem 1.25rem",
                  borderRadius: "10px",
                  border: isActive ? "none" : "1.5px solid var(--border-color)",
                  background: isActive ? tab.grad : "var(--bg-card)",
                  color: isActive ? "#ffffff" : "var(--text-main)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 4px 14px rgba(0, 0, 0, 0.15)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 4 Columns x 3 Rows Feature Cards */}
        <div className="features-role-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.4rem"
        }}>
          {[
            { id: "bus", roles: ["all", "parents", "drivers", "admin"], title: "Live GPS Bus Tracking", desc: "Real-time satellite tracking with ETA alerts and route playback.", icon: <Bus size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #2563eb, #38bdf8)", tagColor: "#2563eb", tag: "Telemetry" },
            { id: "attendance", roles: ["all", "admin", "teachers", "parents"], title: "Smart Attendance", desc: "1-tap mobile attendance, RFID sync, and instant SMS to parents.", icon: <CalendarCheck size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #7c3aed, #a855f7)", tagColor: "#7c3aed", tag: "SMS Alerts" },
            { id: "fees", roles: ["all", "admin", "parents"], title: "Automated Fee Engine", desc: "Online fee payments via UPI & Cards with automated GST receipts.", icon: <Wallet size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #d97706, #fbbf24)", tagColor: "#d97706", tag: "UPI Portal" },
            { id: "exams", roles: ["all", "admin", "teachers", "students", "parents"], title: "Exams & Report Cards", desc: "CBSE/ICSE grade formulas, rank sheets, and 1-click PDF marksheets.", icon: <FileText size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #059669, #34d399)", tagColor: "#059669", tag: "Academics" },
            { id: "reports", roles: ["all", "teachers", "parents", "students"], title: "Performance Analytics", desc: "Visual analytics, subject breakdown charts, and progress trends.", icon: <TrendingUp size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #e11d48, #fb7185)", tagColor: "#e11d48", tag: "Analytics" },
            { id: "homework", roles: ["all", "teachers", "students", "parents"], title: "Homework & Notes", desc: "Digital diary where teachers attach PDF materials and track submissions.", icon: <ClipboardCheck size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #4f46e5, #818cf8)", tagColor: "#4f46e5", tag: "Diary" },
            { id: "qr", roles: ["all", "admin", "drivers"], title: "QR Gate Check-In", desc: "QR identity badge scanning at gates and bus boarding for safety.", icon: <QrCode size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #0891b2, #22d3ee)", tagColor: "#0891b2", tag: "Security" },
            { id: "chat", roles: ["all", "teachers", "parents"], title: "Parent-Teacher Chat", desc: "Direct messaging between teachers and parents with circular channels.", icon: <MessageCircle size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #c026d3, #f472b6)", tagColor: "#c026d3", tag: "Chat" },
            { id: "notify", roles: ["all", "parents", "drivers", "teachers", "admin"], title: "WhatsApp Broadcasts", desc: "Instant push notifications and WhatsApp alerts for notices and dues.", icon: <Bell size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #ea580c, #fb923c)", tagColor: "#ea580c", tag: "Broadcast" },
            { id: "timetable", roles: ["all", "admin", "teachers", "students"], title: "Timetable Generator", desc: "Clash-free schedule creation and teacher substitution management.", icon: <Clock size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #0d9488, #2dd4bf)", tagColor: "#0d9488", tag: "Schedules" },
            { id: "events", roles: ["all", "admin", "students", "parents"], title: "Academic Calendar", desc: "Interactive calendar highlighting exams, holidays, and meetings.", icon: <Activity size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #65a30d, #a3e635)", tagColor: "#65a30d", tag: "Events" },
            { id: "library", roles: ["all", "admin", "students"], title: "Library Management", desc: "Barcode book issuing, inventory catalog, and automated overdue fines.", icon: <BookOpen size={20} color="#ffffff" />, badgeBg: "linear-gradient(135deg, #9333ea, #c084fc)", tagColor: "#9333ea", tag: "Library" }
          ]
            .filter((c) => activeRole === "all" || c.roles.includes(activeRole))
            .map((card, i) => (
              <div
                key={i}
                className="colorful-card feature-vibrant-card"
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "18px",
                  padding: "1.4rem 1.2rem",
                  textAlign: "left",
                  border: "1.5px solid var(--border-color)",
                  boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "200px",
                  cursor: "pointer",
                  "--card-top-gradient": card.badgeBg,
                  "--card-glow-color": "rgba(99, 102, 241, 0.1)"
                } as React.CSSProperties}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "12px",
                      background: card.badgeBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 14px rgba(0, 0, 0, 0.12)"
                    }}>
                      {card.icon}
                    </div>
                    <span style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: card.tagColor,
                      background: `${card.tagColor}12`,
                      padding: "0.2rem 0.55rem",
                      borderRadius: "99px"
                    }}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--text-main)",
                    marginBottom: "0.35rem",
                    letterSpacing: "-0.01em"
                  }}>
                    {card.title}
                  </h3>

                  <p style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                    marginBottom: "1rem"
                  }}>
                    {card.desc}
                  </p>
                </div>

                <div
                  className="learn-more-link"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: card.tagColor,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}
                >
                  Explore <ArrowRight size={13} />
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ========== FULL-SIZE DASHBOARD SHOWCASE SECTION (VIBRANT ERP CONTROL CENTER) ========== */}
      <section style={{
        padding: "70px 4%",
        background: "linear-gradient(180deg, var(--bg-page) 0%, var(--bg-subtle) 100%)",
        borderTop: "1px solid var(--border-color)",
        position: "relative"
      }}>
        <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 2.5rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "1rem" }}>
            <BarChart3 size={14} color="#6366f1" /> LIVE ERP CONTROL CENTER
          </span>
          <h2 style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", fontWeight: 800, color: "var(--text-main)", marginTop: "0.5rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Real-Time School ERP <span className="gradient-text-sunset">&amp; Analytics Dashboard</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.65 }}>
            Take complete control of school administration with live student attendance metrics, fee collection forecasting, route telematics, and automated parent communication.
          </p>
        </div>

        {/* Full-Size High Resolution App Window Frame */}
        <div className="dashboard-window-frame" style={{
          maxWidth: "1320px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 35px 80px -15px rgba(67, 56, 202, 0.25)",
          border: "2px solid rgba(99, 102, 241, 0.2)"
        }}>
          {/* Window macOS / Browser Top Bar */}
          <div className="dashboard-top-bar" style={{
            background: "linear-gradient(90deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
            padding: "0.85rem 1.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 8px #ef4444" }}></div>
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 8px #f59e0b" }}></div>
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }}></div>
            </div>

            <div className="dashboard-url-pill" style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              padding: "0.35rem 1.4rem",
              color: "#e2e8f0",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              minWidth: "340px",
              justifyContent: "center",
              fontWeight: 600
            }}>
              <Lock size={13} color="#10b981" /> https://app.schoolmitra.com/dashboard
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#34d399", fontSize: "0.82rem", fontWeight: 800 }}>
              <span className="radar-pulse-dot" style={{ width: 9, height: 9, borderRadius: "50%", background: "#10b981" }}></span> Live Satellite Telemetry
            </div>
          </div>

          {/* Inner Dashboard Body Layout */}
          <div className="dashboard-inner-body" style={{ display: "grid", gridTemplateColumns: "250px 1fr", minHeight: "680px" }}>
            {/* Left Sidebar */}
            <div className="dashboard-sidebar" style={{
              background: "#ffffff",
              borderRight: "1px solid #e2e8f0",
              padding: "1.6rem 1.2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.6rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #4f46e5, #ec4899)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)"
                }}>
                  <GraduationCap size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a" }}>SchoolMitra</div>
                  <div style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700 }}>PREMIUM ERP SUITE</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {[
                  { icon: <BarChart3 size={18} />, label: "Overview", active: true, color: "#4f46e5" },
                  { icon: <Users size={18} />, label: "Admissions & Students", active: false, color: "#059669" },
                  { icon: <FileText size={18} />, label: "Exams & Report Cards", active: false, color: "#7c3aed" },
                  { icon: <CreditCard size={18} />, label: "Fee Analytics", active: false, color: "#d97706" },
                  { icon: <Bus size={18} />, label: "Live Bus Telemetry", active: false, color: "#0284c7" },
                  { icon: <MessageSquare size={18} />, label: "Parent Mobile Feeds", active: false, color: "#db2777" },
                  { icon: <Clock size={18} />, label: "Timetable & Staff", active: false, color: "#0d9488" }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "12px",
                    fontWeight: item.active ? 800 : 600,
                    fontSize: "0.88rem",
                    color: item.active ? "#4f46e5" : "#64748b",
                    background: item.active ? "linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(99, 102, 241, 0.05))" : "transparent",
                    cursor: "pointer",
                    borderLeft: item.active ? "3px solid #4f46e5" : "3px solid transparent"
                  }}>
                    <span style={{ color: item.active ? "#4f46e5" : item.color }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Profile Summary */}
              <div style={{
                marginTop: "auto",
                padding: "0.9rem",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #f8fafc, #eff6ff)",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #06b6d4)", color: "#fff", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>R</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.88rem", color: "#0f172a" }}>Dr. Rajesh Sharma</div>
                  <div style={{ fontSize: "0.72rem", color: "#059669", fontWeight: 700 }}>● Principal Active</div>
                </div>
              </div>
            </div>

            {/* Dashboard Content Container */}
            <div className="dashboard-main-content" style={{ background: "#f8fafc", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.6rem" }}>
              {/* Header Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>Executive Dashboard</h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Live real-time school operations overview • Academic Year 2026-27</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <span style={{
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "#059669",
                    padding: "0.45rem 0.9rem",
                    borderRadius: "8px",
                    fontWeight: 800,
                    fontSize: "0.82rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }}></span> All Systems 100% Normal
                  </span>
                  <button
                    onClick={() => setModalOpen(true)}
                    style={{
                      padding: "0.6rem 1.3rem",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                      border: "none",
                      fontWeight: 800,
                      fontSize: "0.88rem",
                      color: "#ffffff",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)"
                    }}
                  >
                    + Quick Action
                  </button>
                </div>
              </div>

              {/* 4 Vibrant Stat Cards Row */}
              <div className="dashboard-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.4rem" }}>
                {[
                  {
                    label: "Total Students",
                    val: "2,450",
                    change: "+12% this month",
                    icon: <Users size={22} color="#ffffff" />,
                    grad: "linear-gradient(135deg, #4f46e5, #6366f1)",
                    border: "#818cf8"
                  },
                  {
                    label: "Today's Attendance",
                    val: "96.8%",
                    change: "2,371 Present Today",
                    icon: <CheckCircle2 size={22} color="#ffffff" />,
                    grad: "linear-gradient(135deg, #059669, #10b981)",
                    border: "#34d399"
                  },
                  {
                    label: "Fee Collection",
                    val: "₹18.4L",
                    change: "88% Target Reached",
                    icon: <CreditCard size={22} color="#ffffff" />,
                    grad: "linear-gradient(135deg, #d97706, #f59e0b)",
                    border: "#fbbf24"
                  },
                  {
                    label: "Active GPS Buses",
                    val: "18 / 18",
                    change: "All 18 On Schedule",
                    icon: <Bus size={22} color="#ffffff" />,
                    grad: "linear-gradient(135deg, #0284c7, #06b6d4)",
                    border: "#38bdf8"
                  }
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#ffffff",
                      padding: "1.2rem",
                      borderRadius: "16px",
                      border: "1px solid #e2e8f0",
                      borderTop: `4px solid ${stat.border}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 700 }}>{stat.label}</div>
                      <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "#0f172a", margin: "0.2rem 0" }}>{stat.val}</div>
                      <div style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 800 }}>{stat.change}</div>
                    </div>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: stat.grad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                      {stat.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row 1: Attendance Dual Bar Chart (65%) & Fee Analytics Donut (35%) */}
              <div className="dashboard-charts-row1" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "1.4rem" }}>
                {/* Attendance Colorful Dual Bar Chart */}
                <div style={{ background: "#ffffff", padding: "1.4rem", borderRadius: "18px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Weekly Attendance Trends</h4>
                      <p style={{ fontSize: "0.78rem", color: "#64748b" }}>Presence percentage compared with previous week</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.6rem", fontSize: "0.78rem" }}>
                      <span style={{ background: "rgba(79, 70, 229, 0.1)", color: "#4f46e5", padding: "0.3rem 0.7rem", borderRadius: "6px", fontWeight: 700 }}>● This Week</span>
                      <span style={{ background: "rgba(6, 182, 212, 0.1)", color: "#0891b2", padding: "0.3rem 0.7rem", borderRadius: "6px", fontWeight: 700 }}>● Last Week</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.9rem", height: "180px", paddingTop: "1rem" }}>
                    {[
                      { day: "Mon", thisW: 92, lastW: 85, grad: "linear-gradient(180deg, #4f46e5, #6366f1)" },
                      { day: "Tue", thisW: 95, lastW: 88, grad: "linear-gradient(180deg, #7c3aed, #a855f7)" },
                      { day: "Wed", thisW: 98, lastW: 90, grad: "linear-gradient(180deg, #059669, #10b981)" },
                      { day: "Thu", thisW: 91, lastW: 86, grad: "linear-gradient(180deg, #d97706, #fbbf24)" },
                      { day: "Fri", thisW: 96, lastW: 89, grad: "linear-gradient(180deg, #e11d48, #fb7185)" },
                      { day: "Sat", thisW: 88, lastW: 82, grad: "linear-gradient(180deg, #0284c7, #38bdf8)" }
                    ].map((item, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", height: "100%" }}>
                        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "4px", width: "100%" }}>
                          <div style={{ flex: 1, height: `${item.thisW}%`, background: item.grad, borderRadius: "6px 6px 0 0", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}></div>
                          <div style={{ flex: 1, height: `${item.lastW}%`, background: "#06b6d4", opacity: 0.6, borderRadius: "6px 6px 0 0" }}></div>
                        </div>
                        <span style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: 800 }}>{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fee Analytics Donut Chart */}
                <div style={{ background: "#ffffff", padding: "1.4rem", borderRadius: "18px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "100%", textAlign: "left", marginBottom: "0.5rem" }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Q3 Fee Collection</h4>
                    <p style={{ fontSize: "0.78rem", color: "#64748b" }}>Total Target: ₹21.0 Lakhs</p>
                  </div>
                  <div style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "50%",
                    background: "conic-gradient(#4f46e5 0% 55%, #10b981 55% 75%, #f59e0b 75% 90%, #06b6d4 90% 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0.8rem 0",
                    boxShadow: "0 8px 24px rgba(79, 70, 229, 0.25)"
                  }}>
                    <div style={{ width: "78px", height: "78px", background: "#ffffff", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>88%</span>
                      <span style={{ fontSize: "0.65rem", color: "#059669", fontWeight: 700 }}>Collected</span>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.76rem", width: "100%", marginTop: "0.4rem" }}>
                    <span style={{ background: "#f8fafc", padding: "0.3rem 0.5rem", borderRadius: "6px", fontWeight: 700 }}><span style={{ color: "#4f46e5" }}>●</span> Paid: ₹18.4L</span>
                    <span style={{ background: "#f8fafc", padding: "0.3rem 0.5rem", borderRadius: "6px", fontWeight: 700 }}><span style={{ color: "#10b981" }}>●</span> Online: 72%</span>
                    <span style={{ background: "#f8fafc", padding: "0.3rem 0.5rem", borderRadius: "6px", fontWeight: 700 }}><span style={{ color: "#f59e0b" }}>●</span> Dues: ₹2.6L</span>
                    <span style={{ background: "#f8fafc", padding: "0.3rem 0.5rem", borderRadius: "6px", fontWeight: 700 }}><span style={{ color: "#06b6d4" }}>●</span> Auto-SMS: On</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING SECTION (COLOURFUL TIERS) ========== */}
      <section id="pricing" style={{ padding: "60px 4%", background: "var(--bg-page)", fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
        {/* Header Badge & Title */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "1rem", fontSize: "0.78rem", fontWeight: 600 }}>
            <Wallet size={13} color="#f59e0b" /> TRANSPARENT &amp; PREDICTABLE PRICING
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 3.2vw, 2.6rem)",
            fontWeight: 700,
            color: "var(--text-main)",
            letterSpacing: "-0.025em",
            marginBottom: "0.75rem"
          }}>
            Choose the Perfect Plan <span className="gradient-text-sunset">for Your School</span>
          </h2>
          <p style={{
            fontSize: "1rem",
            color: "var(--text-muted)",
            lineHeight: 1.55,
            fontWeight: 400
          }}>
            Transparent pricing tailored for institutions of all sizes. Switch plans or cancel anytime with zero lock-in penalties.
          </p>
        </div>

        {/* Monthly vs Yearly Toggle Switch */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.4rem" }}>
          <div style={{
            background: "var(--bg-subtle)",
            padding: "0.35rem",
            borderRadius: "12px",
            border: "1.5px solid var(--border-color)",
            display: "inline-flex",
            gap: "0.4rem"
          }}>
            <button
              onClick={() => setIsYearly(false)}
              style={{
                padding: "0.55rem 1.5rem",
                borderRadius: "9px",
                border: "none",
                background: !isYearly ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "transparent",
                color: !isYearly ? "#ffffff" : "var(--text-muted)",
                fontWeight: 600,
                fontSize: "0.86rem",
                cursor: "pointer",
                boxShadow: !isYearly ? "0 3px 10px rgba(79, 70, 229, 0.25)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              style={{
                padding: "0.55rem 1.5rem",
                borderRadius: "9px",
                border: "none",
                background: isYearly ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "transparent",
                color: isYearly ? "#ffffff" : "var(--text-muted)",
                fontWeight: 600,
                fontSize: "0.86rem",
                cursor: "pointer",
                boxShadow: isYearly ? "0 3px 10px rgba(79, 70, 229, 0.25)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              Yearly (Save 20% 🎉)
            </button>
          </div>
        </div>

        {/* 3 Tiered Colorful Pricing Cards */}
        <div className="pricing-plans-cards-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          maxWidth: "1220px",
          margin: "0 auto",
          alignItems: "stretch"
        }}>
          {/* Card 1: Basic Plan (Purple Theme) */}
          <div className="colorful-card" style={{
            background: "var(--bg-card)",
            padding: "2.2rem 1.9rem",
            borderRadius: "24px",
            border: "1.5px solid rgba(139, 92, 246, 0.25)",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "--card-top-gradient": "linear-gradient(90deg, #7c3aed, #a855f7)",
            "--card-glow-color": "rgba(124, 58, 237, 0.15)"
          } as React.CSSProperties}>
            <div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "15px",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem",
                boxShadow: "0 6px 16px rgba(124, 58, 237, 0.25)"
              }}>
                <Send size={22} color="#ffffff" />
              </div>

              <h3 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.25rem" }}>
                Basic Starter
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "1.2rem", fontWeight: 400 }}>
                Ideal for growing single-campus primary schools
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
                  ₹{isYearly ? "3,999" : "4,999"}
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 500 }}>/month</span>
              </div>
              <div style={{ fontSize: "0.76rem", color: "#7c3aed", fontWeight: 600, marginBottom: "1.6rem" }}>
                {isYearly ? "Billed annually • Save ₹12,000/yr" : "Billed monthly"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.8rem" }}>
                {[
                  "Up to 250 Students Roster",
                  "15 Teacher & Staff Accounts",
                  "3 Live GPS Buses Tracking",
                  "Digital Attendance & SMS",
                  "Fee Collection Engine",
                  "Email & WhatsApp Support"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.86rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(124, 58, 237, 0.12)", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 }}>✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setModalOpen(true)} className="btn-colorful-outline" style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "0.9rem"
            }}>
              Start Free Trial
            </button>
          </div>

          {/* Card 2: Pro Plan (Featured Multi-Gradient & Glow) */}
          <div className="colorful-card" style={{
            background: "var(--bg-card)",
            padding: "2.4rem 1.9rem",
            borderRadius: "26px",
            border: "2px solid #6366f1",
            boxShadow: "0 20px 50px rgba(99, 102, 241, 0.22)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transform: "scale(1.02)",
            zIndex: 2,
            "--card-top-gradient": "linear-gradient(90deg, #4f46e5, #ec4899)",
            "--card-glow-color": "rgba(99, 102, 241, 0.25)"
          } as React.CSSProperties}>
            {/* Shimmering Badge */}
            <div style={{
              position: "absolute",
              top: -14,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)",
              color: "#ffffff",
              padding: "0.35rem 1.3rem",
              borderRadius: "99px",
              fontWeight: 700,
              fontSize: "0.75rem",
              boxShadow: "0 4px 14px rgba(236, 72, 153, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              letterSpacing: "0.02em"
            }}>
              <Star size={12} fill="#ffffff" /> MOST POPULAR SCHOOL CHOICE
            </div>

            <div>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: "16px",
                background: "linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem",
                boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)"
              }}>
                <Sparkles size={24} color="#ffffff" />
              </div>

              <h3 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.25rem" }}>
                Professional Suite
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "1.2rem", fontWeight: 400 }}>
                Complete platform for established K-12 institutes
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "2.6rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
                  ₹{isYearly ? "7,999" : "9,999"}
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 500 }}>/month</span>
              </div>
              <div style={{ fontSize: "0.76rem", color: "#ec4899", fontWeight: 700, marginBottom: "1.6rem" }}>
                {isYearly ? "Billed annually • Save ₹24,000/yr" : "Billed monthly"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.8rem" }}>
                {[
                  "Up to 1,200 Students Roster",
                  "Unlimited Teacher & Staff Accounts",
                  "12 Live GPS Buses Tracking",
                  "Parent Mobile App Full Access",
                  "Exams & Digital Report Cards",
                  "Automated WhatsApp Gateway",
                  "Priority 24/7 Dedicated Support"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.88rem", color: "var(--text-main)", fontWeight: 600 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #ec4899)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 }}>✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setModalOpen(true)} className="btn-vibrant-gradient" style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "14px",
              fontSize: "0.95rem",
              fontWeight: 600
            }}>
              Start 14-Day Free Pilot
            </button>
          </div>

          {/* Card 3: Enterprise Plan (Emerald & Cyan Theme) */}
          <div className="colorful-card" style={{
            background: "var(--bg-card)",
            padding: "2.2rem 1.9rem",
            borderRadius: "24px",
            border: "1.5px solid rgba(16, 185, 129, 0.25)",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "--card-top-gradient": "linear-gradient(90deg, #059669, #06b6d4)",
            "--card-glow-color": "rgba(16, 185, 129, 0.15)"
          } as React.CSSProperties}>
            <div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "15px",
                background: "linear-gradient(135deg, #059669, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem",
                boxShadow: "0 6px 16px rgba(16, 185, 129, 0.25)"
              }}>
                <Award size={22} color="#ffffff" />
              </div>

              <h3 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.25rem" }}>
                Enterprise Chains
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "1.2rem", fontWeight: 400 }}>
                For multi-branch schools &amp; education trusts
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
                  ₹{isYearly ? "15,999" : "19,999"}
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 500 }}>/month</span>
              </div>
              <div style={{ fontSize: "0.76rem", color: "#059669", fontWeight: 600, marginBottom: "1.6rem" }}>
                {isYearly ? "Billed annually • Save ₹48,000/yr" : "Billed monthly"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.8rem" }}>
                {[
                  "Unlimited Students & Branches",
                  "Unlimited Buses & GPS Devices",
                  "Multi-Campus Super Admin Portal",
                  "Custom ERP API Integrations",
                  "Dedicated Account Manager",
                  "Custom Branded Parent App",
                  "99.99% Enterprise SLA"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.86rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 }}>✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setModalOpen(true)} className="btn-colorful-outline" style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "0.9rem"
            }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* ========== SLIDING TESTIMONIALS SECTION ========== */}
      <section style={{
        padding: "50px 5%",
        background: "linear-gradient(180deg, var(--bg-subtle) 0%, var(--bg-page) 100%)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)"
      }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Star size={12} color="#f59e0b" /> DELIGHTED PRINCIPALS &amp; PARENTS
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            Stories from <span className="gradient-text-sunset">Real Educators</span>
          </h2>
        </div>

        {/* Carousel Slider */}
        <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", overflow: "hidden" }}>
          <div style={{
            display: "flex",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: `translateX(-${testimonialIndex * 100}%)`
          }}>
            {[
              [
                { quote: "SchoolMitra simplified our administration. Live GPS tracking gives parents peace of mind and fee collection is 95% automated.", name: "Dr. Rajesh Sharma", role: "School Administrator • New Delhi", avatar: "R", grad: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#6366f1" },
                { quote: "1-tap digital attendance and WhatsApp alerts saved our staff hundreds of paperwork hours every month. Highly recommended!", name: "Sunita Deshmukh", role: "Vice Principal • Mumbai", avatar: "S", grad: "linear-gradient(135deg, #059669, #10b981)", color: "#10b981" },
                { quote: "Managing 6 campuses was chaotic. Now I monitor cross-branch fee analytics and attendance from one central dashboard.", name: "Vikramaditya Rao", role: "School Director • Bengaluru", avatar: "V", grad: "linear-gradient(135deg, #d97706, #f59e0b)", color: "#f59e0b" }
              ],
              [
                { quote: "Report card generation used to take 2 weeks. With SchoolMitra, our teachers calculate grades and publish cards in minutes.", name: "Anil Kapoor", role: "Senior Administrator • Hyderabad", avatar: "A", grad: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#0284c7" },
                { quote: "Automated fee reminders reduced our pending dues by 80% in the very first quarter. Outstanding customer support!", name: "Meenakshi Sundaram", role: "Finance Director • Chennai", avatar: "M", grad: "linear-gradient(135deg, #7c3aed, #ec4899)", color: "#7c3aed" },
                { quote: "The parent mobile app eliminated front-desk phone inquiries by 70%. Parents love the real-time bus alerts and fee receipts.", name: "Kavita Reddy", role: "Headmistress • Pune", avatar: "K", grad: "linear-gradient(135deg, #ea580c, #fb923c)", color: "#ea580c" }
              ],
              [
                { quote: "Implementation was smooth and onboarding took under 48 hours. Our parents and teachers adapted instantly!", name: "Sanjay Singhania", role: "Trustee Member • Gurugram", avatar: "S", grad: "linear-gradient(135deg, #b45309, #d97706)", color: "#b45309" },
                { quote: "Live bus tracking route optimization cut our transportation fuel expenses by 22% in the first quarter itself.", name: "Ramesh Pathak", role: "Transport Manager • Noida", avatar: "R", grad: "linear-gradient(135deg, #15803d, #22c55e)", color: "#15803d" },
                { quote: "Multi-branch SaaS capability allows our central board to view real-time statistics across all 14 schools seamlessly.", name: "Dr. Shalini Gupta", role: "CEO Education Group • Kolkata", avatar: "S", grad: "linear-gradient(135deg, #6d28d9, #8b5cf6)", color: "#6d28d9" }
              ]
            ].map((slideGroup, groupIdx) => (
              <div key={groupIdx} style={{
                minWidth: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.4rem",
                padding: "0.5rem"
              }}>
                {slideGroup.map((card, cardIdx) => (
                  <div
                    key={cardIdx}
                    className="colorful-card"
                    style={{
                      background: "var(--bg-card)",
                      borderRadius: "20px",
                      padding: "1.6rem 1.4rem",
                      border: "1.5px solid var(--border-color)",
                      boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      "--card-top-gradient": card.grad,
                      "--card-glow-color": "rgba(99, 102, 241, 0.12)"
                    } as React.CSSProperties}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                        <div style={{ display: "flex", gap: "2px", color: "#f59e0b", fontSize: "0.9rem" }}>
                          {"★".repeat(5)}
                        </div>
                        <div style={{ fontSize: "1.6rem", fontWeight: 700, color: card.color, lineHeight: 0.8, opacity: 0.6 }}>
                          “
                        </div>
                      </div>

                      <p style={{
                        fontSize: "0.88rem",
                        color: "var(--text-main)",
                        lineHeight: 1.6,
                        fontStyle: "italic",
                        marginBottom: "1.2rem",
                        fontWeight: 400
                      }}>
                        &ldquo;{card.quote}&rdquo;
                      </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem" }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: card.grad,
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        {card.avatar}
                      </div>

                      <div style={{ overflow: "hidden" }}>
                        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {card.name}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: card.color, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {card.role}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Dots */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "1.8rem" }}>
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setTestimonialIndex(idx)}
              style={{
                width: testimonialIndex === idx ? 26 : 9,
                height: 9,
                borderRadius: "99px",
                background: testimonialIndex === idx ? "linear-gradient(135deg, #4f46e5, #ec4899)" : "var(--border-color)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            />
          ))}
        </div>
      </section>

      {/* ========== HOW IT WORKS (4 STEPS) ========== */}
      <section style={{ padding: "50px 5% 70px", background: "var(--bg-page)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Compass size={12} color="#06b6d4" /> 48-HOUR ONBOARDING
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            How It <span className="gradient-text-sunset">Works</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: 1.55, fontWeight: 400, marginTop: "0.4rem" }}>
            Get your school live within 48 hours with our seamless migration guarantee.
          </p>
        </div>

        <div className="how-it-works-pipeline-grid" style={{
          maxWidth: "1160px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.4rem"
        }}>
          {[
            { stepNum: "01", title: "Data Onboarding", desc: "1-click CSV import of students, classes, parents, and fee structures.", icon: <Wallet size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#6366f1" },
            { stepNum: "02", title: "Staff Training", desc: "Dedicated training sessions for teachers, admin staff, and bus drivers.", icon: <FileText size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#0284c7" },
            { stepNum: "03", title: "Parent App Launch", desc: "WhatsApp & SMS invites with login credentials & app download links.", icon: <Smartphone size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #d97706, #f59e0b)", color: "#d97706" },
            { stepNum: "04", title: "Live Operations", desc: "Live bus tracking, smart attendance, fee portal, and 24/7 support.", icon: <CheckCircle2 size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #059669, #10b981)", color: "#059669" }
          ].map((step, i) => (
            <div
              key={i}
              className="colorful-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: "18px",
                padding: "1.6rem 1.3rem",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                "--card-top-gradient": step.grad,
                "--card-glow-color": "rgba(99, 102, 241, 0.12)"
              } as React.CSSProperties}
            >
              <span style={{
                position: "absolute",
                top: 12,
                right: 12,
                fontSize: "0.72rem",
                fontWeight: 700,
                color: step.color,
                background: `${step.color}12`,
                padding: "0.15rem 0.5rem",
                borderRadius: "99px"
              }}>
                STEP {step.stepNum}
              </span>

              <div style={{
                width: 50,
                height: 50,
                borderRadius: "15px",
                background: step.grad,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                marginTop: "0.3rem",
                boxShadow: "0 6px 14px rgba(0, 0, 0, 0.12)"
              }}>
                {step.icon}
              </div>

              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.4rem" }}>
                {step.title}
              </h3>

              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, fontWeight: 400 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== LIVE GPS TRACKING SHOWCASE ========== */}
      <section style={{ padding: "50px 5% 70px", background: "var(--bg-page)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Bus size={12} color="#0284c7" /> SATELLITE GPS FLEET TELEMETRY
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            Live GPS <span className="gradient-text-ocean">Bus Telematics &amp; Safety</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: 1.55, fontWeight: 400, marginTop: "0.4rem" }}>
            Route tracking, driver speed monitoring, RFID boarding scans, and automated arrival alerts.
          </p>
        </div>

        <div className="gps-tracking-container" style={{
          maxWidth: "1160px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.8rem",
          alignItems: "stretch"
        }}>
          {/* LEFT: Route Map */}
          <div className="colorful-card" style={{
            background: "var(--bg-card)",
            borderRadius: "22px",
            padding: "1.5rem",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            border: "1.5px solid rgba(2, 132, 199, 0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
            "--card-top-gradient": "linear-gradient(90deg, #0284c7, #06b6d4)",
            "--card-glow-color": "rgba(2, 132, 199, 0.15)"
          } as React.CSSProperties}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>Live Telemetry Route Map</h3>
                  <span style={{ fontSize: "0.75rem", color: "#0284c7", fontWeight: 600 }}>Noida Sector 62 • Bus Route #12</span>
                </div>
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#059669", background: "rgba(16, 185, 129, 0.1)", padding: "0.25rem 0.65rem", borderRadius: "99px" }}>
                Live Active
              </span>
            </div>

            <div style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              position: "relative",
              height: "230px",
              background: "#0f172a"
            }}>
              <img
                src="/images/gps-map-tracking-3d.png"
                alt="Live GPS Bus Route Map"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                background: "rgba(15, 23, 42, 0.9)",
                color: "#ffffff",
                padding: "0.45rem 0.85rem",
                borderRadius: "10px",
                fontSize: "0.74rem",
                fontWeight: 600,
                display: "flex",
                gap: "0.5rem"
              }}>
                <span style={{ color: "#38bdf8" }}>Bus #12 Live</span>
                <span>•</span>
                <span style={{ color: "#34d399" }}>42 km/h</span>
              </div>
            </div>

            <div style={{
              background: "var(--bg-subtle)",
              borderRadius: 14,
              padding: "0.85rem 1rem",
              border: "1px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
              fontSize: "0.78rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                <span>Route Stops</span>
                <span style={{ color: "#0284c7" }}>ETA 99.4% Accurate</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>🚏 Main Gate Pickup (0.8 km)</span>
                <span style={{ fontWeight: 600, color: "#4f46e5" }}>8:44 AM (On Time)</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Fleet Telematics */}
          <div className="colorful-card" style={{
            background: "var(--bg-card)",
            borderRadius: "22px",
            padding: "1.5rem",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            border: "1.5px solid rgba(245, 158, 11, 0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
            justifyContent: "space-between",
            "--card-top-gradient": "linear-gradient(90deg, #d97706, #f59e0b)",
            "--card-glow-color": "rgba(245, 158, 11, 0.15)"
          } as React.CSSProperties}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #d97706, #fbbf24)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bus size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>Smart Bus Fleet Telemetry</h3>
                  <span style={{ fontSize: "0.75rem", color: "#d97706", fontWeight: 600 }}>RFID Boarding Scanner</span>
                </div>
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#4f46e5", background: "rgba(79, 70, 229, 0.1)", padding: "0.25rem 0.65rem", borderRadius: "99px" }}>
                18 / 18 Active
              </span>
            </div>

            <div style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              position: "relative",
              height: "230px",
              background: "#0f172a"
            }}>
              <img
                src="/images/gps-telemetry-bus-3d.png"
                alt="Bus Fleet"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            <div style={{
              background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
              borderRadius: 14,
              padding: "0.85rem 1rem",
              color: "#ffffff",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              fontSize: "0.78rem"
            }}>
              <div style={{ color: "#38bdf8", fontWeight: 700, marginBottom: "0.2rem" }}>📱 PARENT ALERT</div>
              <div style={{ color: "#e2e8f0" }}>&ldquo;Bus #12 approaching stop! Aarav has boarded safely.&rdquo;</div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="btn-vibrant-gradient"
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: 600
              }}
            >
              Test Live Fleet Telemetry <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section id="faq" style={{ padding: "50px 5% 70px", background: "var(--bg-page)", borderTop: "1px solid var(--border-color)" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Sparkles size={12} color="#8b5cf6" /> FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            Everything You Need <span className="gradient-text-sunset">to Know</span>
          </h2>
        </div>

        <div className="faq-container-grid" style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: "2.8rem",
          alignItems: "center"
        }}>
          {/* Left Illustration */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              position: "absolute",
              inset: "-12px",
              background: "linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(236, 72, 153, 0.15) 100%)",
              borderRadius: "26px",
              filter: "blur(24px)",
              zIndex: 0
            }}></div>

            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "360px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 15px 40px -10px rgba(15, 23, 42, 0.2)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/faq-illustration.png"
                alt="SchoolMitra Help Desk"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right Accordions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              {
                q: "What is SchoolMitra ERP and how does it benefit our school?",
                a: "SchoolMitra is a comprehensive School ERP platform designed to automate student admissions, attendance, online fee collection, examination report cards, and parent communications from a single dashboard."
              },
              {
                q: "How does real-time GPS bus tracking function for parents?",
                a: "GPS trackers in school buses stream real-time location to the parent mobile app. Parents receive automated SMS and push notifications when the bus approaches their designated pickup stop."
              },
              {
                q: "How long does onboarding and data migration take?",
                a: "Our onboarding specialist assists your school throughout setup. Most schools go live in under 48 hours with automated CSV roster imports and hands-on staff training."
              },
              {
                q: "How do parents receive fee reminders and pay online?",
                a: "SchoolMitra sends automated WhatsApp, SMS, and push reminders with direct payment gateway links, allowing 1-click UPI, Card, and Netbanking settlements with instant PDF receipts."
              },
              {
                q: "Is student data secure and compliant?",
                a: "Yes, SchoolMitra uses bank-grade 256-bit SSL encryption, role-based access controls, and daily automated cloud backups to keep institutional data 100% safe."
              }
            ].map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: "14px",
                    border: isOpen ? "1.5px solid #6366f1" : "1px solid var(--border-color)",
                    boxShadow: isOpen ? "0 6px 20px rgba(99, 102, 241, 0.1)" : "0 2px 6px rgba(0,0,0,0.02)",
                    transition: "all 0.2s ease",
                    overflow: "hidden"
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: "100%",
                      padding: "1rem 1.2rem",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: "left",
                      color: isOpen ? "#4f46e5" : "var(--text-main)",
                      fontWeight: 700,
                      fontSize: "0.95rem"
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: isOpen ? "linear-gradient(135deg, #4f46e5, #ec4899)" : "var(--bg-subtle)",
                        color: isOpen ? "#ffffff" : "var(--text-muted)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {idx + 1}
                      </span>
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      color={isOpen ? "#4f46e5" : "var(--text-muted)"}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                        flexShrink: 0
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: "0 1.2rem 1.1rem 2.8rem",
                      color: "var(--text-muted)",
                      fontSize: "0.88rem",
                      lineHeight: 1.55,
                      fontWeight: 400
                    }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA BANNER (COSMIC GRADIENT) ========== */}
      <section style={{ padding: "40px 5% 70px", background: "var(--bg-page)" }}>
        <div className="cta-banner-container" style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #311042 75%, #0f172a 100%)",
          borderRadius: "28px",
          padding: "3.8rem 2.5rem",
          textAlign: "center",
          border: "2px solid rgba(139, 92, 246, 0.3)",
          boxShadow: "0 25px 70px -15px rgba(0, 0, 0, 0.5)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "-40%",
            left: "-30%",
            width: "160%",
            height: "180%",
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(99, 102, 241, 0.2) 40%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0
          }}></div>

          <span style={{
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "#a5b4fc",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "0.85rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            position: "relative",
            zIndex: 1,
            background: "rgba(99, 102, 241, 0.15)",
            padding: "0.3rem 0.85rem",
            borderRadius: "99px",
            border: "1px solid rgba(99, 102, 241, 0.3)"
          }}>
            <Sparkles size={12} color="#ec4899" /> READY TO DIGITIZE YOUR CAMPUS?
          </span>

          <h2 style={{
            fontSize: "clamp(2rem, 3.4vw, 2.8rem)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "0.85rem",
            lineHeight: 1.2,
            position: "relative",
            zIndex: 1
          }}>
            Elevate Your School&apos;s <span className="gradient-text-sunset">Experience Today</span>
          </h2>

          <p style={{
            fontSize: "1.02rem",
            color: "#cbd5e1",
            maxWidth: "560px",
            margin: "0 auto 2rem auto",
            lineHeight: 1.6,
            fontWeight: 400,
            position: "relative",
            zIndex: 1
          }}>
            Join 500+ forward-thinking schools empowering over 2.5 Lakh students with real-time GPS bus tracking, seamless fee collection, and digital parent connectivity.
          </p>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1
          }}>
            {[
              "14-Day Free Pilot",
              "Zero Setup Fees",
              "24/7 Dedicated Support",
              "256-Bit SSL Security"
            ].map((b, i) => (
              <span key={i} style={{
                color: "#e2e8f0",
                fontSize: "0.82rem",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem"
              }}>
                <span style={{ color: "#34d399", fontWeight: 800 }}>✓</span> {b}
              </span>
            ))}
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-vibrant-gradient"
              style={{
                padding: "0.9rem 2.2rem",
                borderRadius: "14px",
                fontSize: "0.98rem",
                fontWeight: 600
              }}
            >
              <Zap size={17} /> Request Free Campus Demo
            </button>
          </div>
        </div>
      </section>

      {/* ========== SUPER PREMIUM FOOTER ========== */}
      <Footer />

      {/* Registration / Demo Modal */}
      {modalOpen && <SchoolRegistrationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
