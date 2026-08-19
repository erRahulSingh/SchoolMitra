"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, CheckCircle2, Users, Bus, FileText,
  TrendingUp, Clock, CreditCard, Sparkles, Shield, Award,
  MapPin, Star, BarChart3, PieChart, Bell, Building2,
  Wallet, QrCode, CalendarCheck, ClipboardCheck, MessageCircle, Globe, Headphones, BookOpen,
  Zap, Compass, ShieldCheck
} from "lucide-react";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function FeaturesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState("all");

  const featureCards = [
    {
      id: "bus",
      roles: ["all", "parents", "drivers", "admin"],
      title: "Live GPS Bus Tracking",
      desc: "Real-time satellite GPS tracking with live ETA and geofencing updates.",
      icon: <Bus size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #0284c7, #38bdf8)",
      color: "#0284c7",
      tag: "Transport"
    },
    {
      id: "attendance",
      roles: ["all", "admin", "teachers", "parents"],
      title: "Smart Attendance & RFID",
      desc: "1-tap roll-call, RFID scan, and instant WhatsApp absence notifications.",
      icon: <CalendarCheck size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #4f46e5, #7c3aed)",
      color: "#4f46e5",
      tag: "Operations"
    },
    {
      id: "fees",
      roles: ["all", "admin", "parents"],
      title: "Automated Fee Engine",
      desc: "UPI, Cards & Netbanking with automated GST receipts on WhatsApp.",
      icon: <Wallet size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #d97706, #f59e0b)",
      color: "#d97706",
      tag: "Finance"
    },
    {
      id: "exams",
      roles: ["all", "admin", "teachers", "students", "parents"],
      title: "Exams & Report Cards",
      desc: "CBSE/ICSE grade formulas, rank sheets, and 1-click digital marksheets.",
      icon: <FileText size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #2563eb, #60a5fa)",
      color: "#2563eb",
      tag: "Academics"
    },
    {
      id: "reports",
      roles: ["all", "teachers", "parents", "students"],
      title: "Student Growth Analytics",
      desc: "Visual charts mapping academic milestones, attendance, and strengths.",
      icon: <TrendingUp size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #e11d48, #fb7185)",
      color: "#e11d48",
      tag: "Analytics"
    },
    {
      id: "homework",
      roles: ["all", "teachers", "students", "parents"],
      title: "Homework & Assignments",
      desc: "Attach PDF assignments, track submissions, and give instant feedback.",
      icon: <ClipboardCheck size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #7c3aed, #a855f7)",
      color: "#7c3aed",
      tag: "Classroom"
    },
    {
      id: "qr",
      roles: ["all", "admin", "drivers"],
      title: "QR / NFC Gate Security",
      desc: "Fast QR code scanning at the school gate and bus doors for child safety.",
      icon: <QrCode size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #0891b2, #06b6d4)",
      color: "#0891b2",
      tag: "Security"
    },
    {
      id: "chat",
      roles: ["all", "teachers", "parents"],
      title: "Parent-Teacher Chat",
      desc: "Encrypted 1-on-1 messaging between parents and class teachers.",
      icon: <MessageCircle size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #db2777, #ec4899)",
      color: "#db2777",
      tag: "Engagement"
    },
    {
      id: "notify",
      roles: ["all", "parents", "drivers", "teachers", "admin"],
      title: "WhatsApp & SMS Alerts",
      desc: "Broadcast circulars, school closure notices, and fee dues instantly.",
      icon: <Bell size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #059669, #10b981)",
      color: "#059669",
      tag: "Broadcasting"
    },
    {
      id: "timetable",
      roles: ["all", "admin", "teachers", "students"],
      title: "Timetable & Substitutions",
      desc: "Clash-free schedule generator and 1-click teacher substitutions.",
      icon: <Clock size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #6366f1, #818cf8)",
      color: "#6366f1",
      tag: "Scheduling"
    },
    {
      id: "events",
      roles: ["all", "admin", "students", "parents"],
      title: "Events & Calendar",
      desc: "Share holiday calendars, sports schedules, and PTM meetings.",
      icon: <CalendarCheck size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #10b981, #34d399)",
      color: "#10b981",
      tag: "Calendar"
    },
    {
      id: "library",
      roles: ["all", "admin", "students"],
      title: "Digital Library Barcode",
      desc: "Book cataloguing, barcode issue/return, and overdue fine tracking.",
      icon: <BookOpen size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #8b5cf6, #c084fc)",
      color: "#8b5cf6",
      tag: "Library"
    },
    {
      id: "transport_mgmt",
      roles: ["all", "admin", "drivers"],
      title: "Fleet & Driver Telematics",
      desc: "Manage vehicles, driver licenses, fuel logs, and speed alert thresholds.",
      icon: <Bus size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #f59e0b, #fbbf24)",
      color: "#f59e0b",
      tag: "Fleet Control"
    },
    {
      id: "id_cards",
      roles: ["all", "admin", "students"],
      title: "Digital ID Cards & TC",
      desc: "Generate student & staff ID cards with barcodes and transfer certificates.",
      icon: <CreditCard size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #0284c7, #38bdf8)",
      color: "#0284c7",
      tag: "Documentation"
    },
    {
      id: "analytics",
      roles: ["all", "admin", "teachers"],
      title: "Executive Dashboards",
      desc: "School financial trends, fee recovery forecasting, and workload metrics.",
      icon: <PieChart size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #059669, #34d399)",
      color: "#059669",
      tag: "Intelligence"
    },
    {
      id: "multi_saas",
      roles: ["all", "admin"],
      title: "Multi-Branch Governance",
      desc: "Manage multiple school campuses and compare branch revenues centrally.",
      icon: <Building2 size={20} color="#ffffff" />,
      grad: "linear-gradient(135deg, #7c3aed, #ec4899)",
      color: "#7c3aed",
      tag: "Multi-School"
    }
  ];

  const filteredCards = activeRole === "all"
    ? featureCards
    : featureCards.filter((card) => card.roles.includes(activeRole));

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
              <span className="gradient-text-vibrant" style={{ fontWeight: 600, fontSize: "0.82rem" }}>16+ Enterprise School Modules</span>
              <span style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 700,
                padding: "0.12rem 0.45rem",
                borderRadius: "99px"
              }}>
                ZERO SETUP FEES
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2.1rem, 3.4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.18,
              color: "var(--text-main)",
              letterSpacing: "-0.025em",
              marginBottom: "1rem"
            }}>
              Everything You Need to Run a <span className="gradient-text-sunset">Smarter School</span>
            </h1>

            <p style={{
              fontSize: "1.02rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: "500px",
              marginBottom: "1.4rem",
              fontWeight: 400
            }}>
              SchoolMitra brings all essential operations together into one unified platform to simplify management, delight parents, and ensure student safety.
            </p>

            {/* Benefit Chips */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.6rem" }}>
              {[
                { label: "CBSE & ICSE Ready", icon: "🏅", color: "#4f46e5", bg: "rgba(79, 70, 229, 0.08)" },
                { label: "Live GPS Telematics", icon: "🚌", color: "#0284c7", bg: "rgba(2, 132, 199, 0.08)" },
                { label: "1-Click UPI Fees", icon: "💳", color: "#d97706", bg: "rgba(217, 119, 6, 0.08)" },
                { label: "24/7 Support", icon: "💬", color: "#059669", bg: "rgba(5, 150, 105, 0.08)" }
              ].map((b, idx) => (
                <div key={idx} style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "99px",
                  background: b.bg,
                  color: b.color,
                  fontWeight: 600,
                  fontSize: "0.75rem"
                }}>
                  <span>{b.icon}</span> {b.label}
                </div>
              ))}
            </div>

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
                <Zap size={16} /> Request Free Campus Demo
              </button>

              <a
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
                <Compass size={16} color="#6366f1" /> Explore 16+ Modules ↓
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
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
                src="/images/erp-live-tracking.png"
                alt="SchoolMitra ERP Dashboard & GPS Bus Tracking Showcase"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover"
                }}
              />
            </div>

            {/* Floating Live Tracking Badge */}
            <div className="anim-float-badge-1" style={{
              position: "absolute",
              bottom: "-12px",
              right: "-12px",
              background: "linear-gradient(135deg, #0284c7, #38bdf8)",
              borderRadius: "12px",
              padding: "0.55rem 0.9rem",
              boxShadow: "0 10px 25px rgba(2, 132, 199, 0.3)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              zIndex: 3
            }}>
              <div className="radar-pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffffff" }}></div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700 }}>Live Tracking • Bus #12</div>
                <div style={{ fontSize: "0.62rem", opacity: 0.9 }}>UP 16 CT 2345 • On Route</div>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="anim-float-badge-2" style={{
              position: "absolute",
              top: "-12px",
              left: "-12px",
              background: "var(--bg-card)",
              borderRadius: "12px",
              padding: "0.55rem 0.9rem",
              boxShadow: "0 12px 30px rgba(79, 70, 229, 0.2)",
              border: "1px solid rgba(79, 70, 229, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              zIndex: 3
            }}>
              <ShieldCheck size={16} color="#4f46e5" />
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4f46e5" }}>500+ Schools Trust Us</div>
                <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 500 }}>All-in-One Cloud Suite</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5 STATS METRICS BANNER ========== */}
      <section style={{ padding: "0 5% 40px 5%", maxWidth: "1240px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1rem"
        }}>
          {[
            { v: "500+", l: "Schools Trust Us", icon: <Building2 size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#4f46e5" },
            { v: "50K+", l: "Active Users Daily", icon: <Users size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#0284c7" },
            { v: "25K+", l: "Students Managed", icon: <GraduationCap size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#7c3aed" },
            { v: "99.9%", l: "Uptime & Reliability", icon: <Shield size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #059669, #10b981)", color: "#059669" },
            { v: "24/7", l: "Dedicated Support", icon: <Headphones size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #d97706, #f59e0b)", color: "#d97706" }
          ].map((st, i) => (
            <div
              key={i}
              className="colorful-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: "16px",
                padding: "1.1rem 1rem",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                "--card-top-gradient": st.grad,
                "--card-glow-color": "rgba(99, 102, 241, 0.1)"
              } as React.CSSProperties}
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: "11px",
                background: st.grad,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}>
                {st.icon}
              </div>
              <div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-main)", lineHeight: 1.1 }}>{st.v}</div>
                <div style={{ fontSize: "0.74rem", color: st.color, fontWeight: 600, marginTop: "0.1rem" }}>{st.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 1: 16 FEATURES GRID ========== */}
      <section id="features" style={{ paddingTop: "20px", paddingBottom: "60px", paddingLeft: "5%", paddingRight: "5%", maxWidth: "1240px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2.2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Sparkles size={12} color="#8b5cf6" /> COMPLETE MODULAR SUITE
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
            marginBottom: "0.6rem"
          }}>
            Powerful Features <span className="gradient-text-sunset">for Every Role</span>
          </h2>
          <p style={{
            fontSize: "0.98rem",
            color: "var(--text-muted)",
            lineHeight: 1.55,
            fontWeight: 400
          }}>
            Designed to simplify operations, automate fee collections, and ensure safety across your campus.
          </p>
        </div>

        {/* Role Filter Tabs Row */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "2.4rem",
          flexWrap: "wrap"
        }}>
          {[
            { id: "all", label: "All Features", grad: "linear-gradient(135deg, #4f46e5, #7c3aed)" },
            { id: "admin", label: "School Admin", grad: "linear-gradient(135deg, #d97706, #f59e0b)" },
            { id: "teachers", label: "Teachers", grad: "linear-gradient(135deg, #059669, #10b981)" },
            { id: "parents", label: "Parents", grad: "linear-gradient(135deg, #0284c7, #06b6d4)" },
            { id: "students", label: "Students", grad: "linear-gradient(135deg, #7c3aed, #a855f7)" },
            { id: "drivers", label: "Drivers", grad: "linear-gradient(135deg, #db2777, #ec4899)" }
          ].map((tab) => {
            const active = activeRole === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveRole(tab.id)}
                style={{
                  padding: "0.55rem 1.3rem",
                  borderRadius: "10px",
                  border: active ? "none" : "1.5px solid var(--border-color)",
                  background: active ? tab.grad : "var(--bg-card)",
                  color: active ? "#ffffff" : "var(--text-main)",
                  fontWeight: 600,
                  fontSize: "0.86rem",
                  cursor: "pointer",
                  boxShadow: active ? "0 4px 14px rgba(0,0,0,0.15)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 4 Columns Grid Layout (16 Cards) */}
        <div className="features-grid-cards" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.4rem"
        }}>
          {filteredCards.map((card, i) => (
            <div
              key={i}
              className="colorful-card feature-vibrant-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: "18px",
                padding: "1.5rem 1.3rem",
                textAlign: "left",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "200px",
                cursor: "pointer",
                "--card-top-gradient": card.grad,
                "--card-glow-color": "rgba(99, 102, 241, 0.1)"
              } as React.CSSProperties}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    background: card.grad,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.12)"
                  }}>
                    {card.icon}
                  </div>
                  <span style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    padding: "0.2rem 0.55rem",
                    borderRadius: "8px",
                    background: `${card.color}15`,
                    color: card.color
                  }}>
                    {card.tag}
                  </span>
                </div>

                <h3 style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text-main)",
                  marginBottom: "0.35rem",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.35
                }}>
                  {card.title}
                </h3>

                <p style={{
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                  marginBottom: "1rem",
                  fontWeight: 400
                }}>
                  {card.desc}
                </p>
              </div>

              <div className="learn-more-link" style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: card.color,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem"
              }}>
                Learn More <ArrowRight size={13} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 2: REAL-TIME TRACKING (COMPACT) ========== */}
      <section style={{ padding: "30px 5% 60px", maxWidth: "1240px", margin: "0 auto" }}>
        <div className="colorful-card realtime-tracking-section-grid" style={{
          background: "var(--bg-card)",
          borderRadius: "24px",
          padding: "2.5rem 2.2rem",
          border: "1.5px solid rgba(2, 132, 199, 0.2)",
          boxShadow: "0 10px 35px rgba(2, 132, 199, 0.06)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2.5rem",
          alignItems: "center",
          "--card-top-gradient": "linear-gradient(90deg, #0284c7, #38bdf8)",
          "--card-glow-color": "rgba(2, 132, 199, 0.15)"
        } as React.CSSProperties}>
          {/* Left Visual: 3D GPS Map */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              position: "absolute",
              inset: "-12px",
              background: "linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)",
              borderRadius: "24px",
              filter: "blur(20px)",
              zIndex: 0
            }}></div>

            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "440px",
              borderRadius: "18px",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 15px 40px -10px rgba(15, 23, 42, 0.2)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/gps-map-tracking-3d.png"
                alt="SchoolMitra Real-time GPS Tracking Map Showcase"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover"
                }}
              />
            </div>
          </div>

          {/* Right Details */}
          <div>
            <span className="shimmer-badge" style={{ marginBottom: "0.85rem", fontSize: "0.76rem" }}>
              <Bus size={12} color="#0284c7" /> SATELLITE TELEMATICS SUITE
            </span>

            <h2 style={{
              fontSize: "clamp(1.7rem, 2.6vw, 2.3rem)",
              fontWeight: 700,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
              lineHeight: 1.25
            }}>
              Real-Time Tracking for <span className="gradient-text-sunset">Peace of Mind</span>
            </h2>

            <p style={{
              fontSize: "0.98rem",
              color: "var(--text-muted)",
              lineHeight: 1.55,
              marginBottom: "1.4rem",
              fontWeight: 400
            }}>
              Live GPS telemetry ensures parents and school authorities always know live bus locations and arrival ETAs.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.6rem" }}>
              {[
                "Live satellite bus location on smartphone map",
                "WhatsApp & Push alerts for pickup/drop events",
                "Speed alerts & emergency SOS driver trigger",
                "Custom safe-zone geofencing around campus"
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.86rem", fontWeight: 600, color: "var(--text-main)" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(2, 132, 199, 0.12)", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 }}>✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="btn-vibrant-gradient"
              style={{
                padding: "0.75rem 1.8rem",
                borderRadius: "12px",
                fontSize: "0.92rem",
                fontWeight: 600
              }}
            >
              Explore GPS Tracking Demo
            </button>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: WHY SCHOOLS LOVE SCHOOLMITRA ========== */}
      <section style={{ padding: "0 5% 60px", maxWidth: "1240px", margin: "0 auto" }}>
        <div className="why-schools-love-grid" style={{
          background: "var(--bg-card)",
          borderRadius: "24px",
          padding: "2.5rem 2.2rem",
          border: "1.5px solid var(--border-color)",
          boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "2.5rem",
          alignItems: "center"
        }}>
          {/* Left Column */}
          <div>
            <span className="shimmer-badge" style={{ marginBottom: "0.85rem", fontSize: "0.76rem" }}>
              <Award size={12} color="#f59e0b" /> TRUSTED BY 500+ CAMPUSES
            </span>

            <h2 style={{
              fontSize: "clamp(1.7rem, 2.6vw, 2.3rem)",
              fontWeight: 700,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "1.2rem"
            }}>
              Why Schools Love <span className="gradient-text-sunset">SchoolMitra</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.6rem" }}>
              {[
                "All-in-one platform for complete school administration",
                "Modern, high-speed, and intuitive user interface",
                "24/7 support with dedicated engineer assistance",
                "Bank-grade 256-bit SSL security & daily backups"
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem", fontWeight: 600, color: "var(--text-main)" }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="hero-cta-group" style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-vibrant-gradient"
                style={{
                  padding: "0.75rem 1.6rem",
                  borderRadius: "12px",
                  fontSize: "0.9rem",
                  fontWeight: 600
                }}
              >
                Request Free Demo
              </button>

              <Link href="/contact" className="btn-colorful-outline" style={{
                padding: "0.75rem 1.4rem",
                borderRadius: "12px",
                fontSize: "0.88rem",
                textDecoration: "none",
                fontWeight: 600
              }}>
                Contact Sales <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Testimonial Card */}
          <div
            className="colorful-card"
            style={{
              background: "var(--bg-subtle)",
              borderRadius: "20px",
              padding: "1.8rem 1.6rem",
              border: "1.5px solid var(--border-color)",
              position: "relative",
              "--card-top-gradient": "linear-gradient(90deg, #4f46e5, #ec4899)",
              "--card-glow-color": "rgba(99, 102, 241, 0.15)"
            } as React.CSSProperties}
          >
            <div style={{ display: "flex", gap: "0.2rem", color: "#f59e0b", marginBottom: "0.85rem", fontSize: "0.85rem" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>

            <p style={{
              fontSize: "0.92rem",
              color: "var(--text-main)",
              lineHeight: 1.6,
              fontWeight: 400,
              fontStyle: "italic",
              marginBottom: "1.4rem"
            }}>
              &ldquo;SchoolMitra transformed our school administration. From live bus tracking to automated UPI fees, everything is smooth. Communication with parents has never been easier!&rdquo;
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.95rem" }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5, #ec4899)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.95rem"
              }}>
                PS
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-main)" }}>Dr. Priya Sharma</div>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontWeight: 500 }}>Principal, Greenwood International School</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: COSMIC CTA BANNER ========== */}
      <section style={{ padding: "0 5% 70px", maxWidth: "1240px", margin: "0 auto" }}>
        <div className="features-cta-banner-box" style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
          borderRadius: "26px",
          padding: "3.2rem 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          alignItems: "center",
          gap: "2.5rem",
          border: "2px solid rgba(139, 92, 246, 0.3)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
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

          <div style={{ position: "relative", zIndex: 2 }}>
            <span style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#a5b4fc",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.75rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem"
            }}>
              <Sparkles size={12} color="#ec4899" /> ELEVATE YOUR INSTITUTION
            </span>

            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              marginBottom: "0.85rem",
              lineHeight: 1.2
            }}>
              Ready to Experience <span className="gradient-text-sunset">These Features?</span>
            </h2>

            <p style={{
              fontSize: "0.98rem",
              color: "#cbd5e1",
              fontWeight: 400,
              marginBottom: "1.8rem",
              maxWidth: "500px",
              lineHeight: 1.55
            }}>
              Join 500+ schools that trust SchoolMitra to automate administrative workflows, ensure bus safety, and engage parents.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="btn-vibrant-gradient"
              style={{
                padding: "0.85rem 2.2rem",
                borderRadius: "14px",
                fontSize: "0.95rem",
                fontWeight: 600
              }}
            >
              <Zap size={17} /> Schedule Free Demo
            </button>
          </div>

          {/* Right Visual */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1
          }}>
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "280px",
              borderRadius: "18px",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
              background: "#ffffff"
            }}>
              <img
                src="/images/smart-school-cta.png"
                alt="SchoolMitra Modern Smart School"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
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
