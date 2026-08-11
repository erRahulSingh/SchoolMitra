"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, CheckCircle2, Users, Bus, FileText,
  TrendingUp, Clock, CreditCard, MessageSquare, Play, Sparkles,
  ChevronDown, Sun, Moon, Shield, Award, Smartphone, Activity,
  Phone, Mail, MapPin, Check, Star, BarChart3, PieChart, Bell, ChevronRight, Building2,
  Wallet, QrCode, CalendarCheck, ClipboardCheck, MessageCircle, Globe, Headphones, BookOpen,
  Quote
} from "lucide-react";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function FeaturesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeRole, setActiveRole] = useState("all");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const featureCards = [
    {
      id: "bus",
      roles: ["all", "parents", "drivers", "admin"],
      title: "Live Bus Tracking",
      desc: "Real-time GPS tracking of school buses with ETA and route updates.",
      icon: <Bus size={24} color="#3b82f6" />,
      bg: "rgba(59, 130, 246, 0.1)"
    },
    {
      id: "attendance",
      roles: ["all", "admin", "teachers", "parents"],
      title: "Student Attendance",
      desc: "Smart attendance management with reports and analytics.",
      icon: <CalendarCheck size={24} color="#8b5cf6" />,
      bg: "rgba(139, 92, 246, 0.1)"
    },
    {
      id: "fees",
      roles: ["all", "admin", "parents"],
      title: "Fees Management",
      desc: "Manage fees, payments, dues and generate receipts.",
      icon: <Wallet size={24} color="#f59e0b" />,
      bg: "rgba(245, 158, 11, 0.1)"
    },
    {
      id: "exams",
      roles: ["all", "admin", "teachers", "students", "parents"],
      title: "Exams & Results",
      desc: "Create exams, publish results and performance analytics.",
      icon: <FileText size={24} color="#2563eb" />,
      bg: "rgba(37, 99, 235, 0.1)"
    },
    {
      id: "reports",
      roles: ["all", "teachers", "parents", "students"],
      title: "Report Cards",
      desc: "Digital report cards with detailed student performance.",
      icon: <TrendingUp size={24} color="#f43f5e" />,
      bg: "rgba(244, 63, 94, 0.1)"
    },
    {
      id: "homework",
      roles: ["all", "teachers", "students", "parents"],
      title: "Homework & Assignments",
      desc: "Assign homework & assignments and track submissions.",
      icon: <ClipboardCheck size={24} color="#a855f7" />,
      bg: "rgba(168, 85, 247, 0.1)"
    },
    {
      id: "qr",
      roles: ["all", "admin", "drivers"],
      title: "QR Check-In / Check-Out",
      desc: "QR / NFC based attendance for students on transport & gate.",
      icon: <QrCode size={24} color="#06b6d4" />,
      bg: "rgba(6, 182, 212, 0.1)"
    },
    {
      id: "chat",
      roles: ["all", "teachers", "parents"],
      title: "Parent Communication",
      desc: "Instant communication between teachers and parents.",
      icon: <MessageCircle size={24} color="#f43f5e" />,
      bg: "rgba(244, 63, 94, 0.1)"
    },
    {
      id: "notify",
      roles: ["all", "parents", "drivers", "teachers", "admin"],
      title: "Notifications",
      desc: "Real-time notifications & alerts for important updates.",
      icon: <Bell size={24} color="#10b981" />,
      bg: "rgba(16, 185, 129, 0.1)"
    },
    {
      id: "timetable",
      roles: ["all", "admin", "teachers", "students"],
      title: "Timetable Management",
      desc: "Create and manage class timetables effortlessly.",
      icon: <Clock size={24} color="#6366f1" />,
      bg: "rgba(99, 102, 241, 0.1)"
    },
    {
      id: "events",
      roles: ["all", "admin", "students", "parents"],
      title: "Events & Calendar",
      desc: "Manage events, holidays and academic calendar.",
      icon: <CalendarCheck size={24} color="#10b981" />,
      bg: "rgba(16, 185, 129, 0.1)"
    },
    {
      id: "library",
      roles: ["all", "admin", "students"],
      title: "Library Management",
      desc: "Manage books, issue/return and library inventory.",
      icon: <BookOpen size={24} color="#8b5cf6" />,
      bg: "rgba(139, 92, 246, 0.1)"
    },
    {
      id: "transport_mgmt",
      roles: ["all", "admin", "drivers"],
      title: "Transport Management",
      desc: "Manage routes, stops, drivers, vehicles and trips.",
      icon: <Bus size={24} color="#f59e0b" />,
      bg: "rgba(245, 158, 11, 0.1)"
    },
    {
      id: "id_cards",
      roles: ["all", "admin", "students"],
      title: "ID Cards & Certificates",
      desc: "Generate ID cards, certificates and documents.",
      icon: <CreditCard size={24} color="#3b82f6" />,
      bg: "rgba(59, 130, 246, 0.1)"
    },
    {
      id: "analytics",
      roles: ["all", "admin", "teachers"],
      title: "Analytics & Reports",
      desc: "Advanced analytics and custom reports for better decisions.",
      icon: <PieChart size={24} color="#10b981" />,
      bg: "rgba(16, 185, 129, 0.1)"
    },
    {
      id: "multi_saas",
      roles: ["all", "admin"],
      title: "Multi-School SaaS",
      desc: "Manage multiple schools in a single, powerful platform.",
      icon: <Building2 size={24} color="#8b5cf6" />,
      bg: "rgba(139, 92, 246, 0.1)"
    }
  ];

  const filteredCards = activeRole === "all"
    ? featureCards
    : featureCards.filter((card) => card.roles.includes(activeRole));

  return (
    <div style={{ background: "var(--bg-page)", minHeight: "100vh", color: "var(--text-main)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ========== TOP NAVBAR ========== */}
      <Navbar />

      {/* ========== HERO SECTION (EXACT MATCH REFERENCE MOCKUP) ========== */}
      <section className="hero-wrapper" style={{
        paddingTop: "140px",
        paddingBottom: "50px",
        paddingLeft: "5%",
        paddingRight: "5%",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.14) 0%, rgba(67, 56, 202, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0
        }}></div>

        <div className="hero-grid-container" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: "3rem",
          alignItems: "center",
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1
        }}>
          {/* Left Hero Column */}
          <div className="hero-left">
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.4rem 1rem",
              borderRadius: "99px",
              background: "rgba(67, 56, 202, 0.08)",
              border: "1px solid rgba(67, 56, 202, 0.18)",
              color: "#4338ca",
              fontSize: "0.85rem",
              fontWeight: 800,
              marginBottom: "1.5rem"
            }}>
              ❖ Powerful Features
            </span>

            <h1 style={{
              fontSize: "clamp(2.5rem, 4.2vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              color: "var(--text-main)",
              letterSpacing: "-0.03em",
              marginBottom: "1.4rem"
            }}>
              Everything You Need to Run a <span style={{ color: "#f97316" }}>Smarter School</span>
            </h1>

            <p style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              lineHeight: 1.65,
              maxWidth: "540px",
              marginBottom: "2.4rem",
              fontWeight: 500
            }}>
              SchoolMitra brings all the essential tools together in one powerful platform to simplify school management, improve communication, and ensure student safety.
            </p>

            <div className="hero-cta-group" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button onClick={() => window.location.href = "/auth?mode=signup"} className="btn-interactive-glow" style={{
                padding: "0.9rem 2rem",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
                color: "#ffffff",
                border: "none",
                fontWeight: 800,
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(67, 56, 202, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                Request a Demo
              </button>

              <a href="#features" style={{
                padding: "0.9rem 2rem",
                borderRadius: "12px",
                background: "var(--bg-card)",
                color: "var(--text-main)",
                border: "1px solid var(--border-color)",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
              }}>
                <Play size={16} color="#4338ca" /> Explore Solutions
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase using AI Generated ERP & Live Tracking Image */}
          <div className="showcase-container" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Glowing Backdrop Ambient Effect */}
            <div style={{
              position: "absolute",
              inset: "-15px",
              background: "linear-gradient(135deg, rgba(67, 56, 202, 0.25) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(139, 92, 246, 0.25) 100%)",
              borderRadius: "32px",
              filter: "blur(24px)",
              zIndex: 0
            }}></div>

            {/* Image Container Card */}
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "600px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 60px -10px rgba(15, 23, 42, 0.35)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/erp-live-tracking.png"
                alt="SchoolMitra ERP Dashboard & Live GPS Bus Tracking Showcase"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover"
                }}
              />
            </div>

            {/* Floating Live Tracking Badge - Bottom Right */}
            <div style={{
              position: "absolute",
              bottom: "-15px",
              right: "-15px",
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(12px)",
              borderRadius: "14px",
              padding: "0.65rem 1rem",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              color: "#ffffff",
              zIndex: 3
            }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }}></div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800 }}>Live Tracking - Bus #12</div>
                <div style={{ fontSize: "0.62rem", color: "#94a3b8", fontWeight: 600 }}>UP 16 CT 2345 • On Route</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5 STATS METRICS BANNER (EXACT MATCH BOTTOM BAR) ========== */}
      <section style={{ padding: "0 5% 70px 5%" }}>
        <div className="features-stats-banner" style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "1.75rem 2rem",
          border: "1px solid var(--border-color)",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1.5rem",
          alignItems: "center"
        }}>
          {/* Stat 1: 500+ Schools Trust Us */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
            <div style={{ width: 46, height: 46, borderRadius: "12px", background: "rgba(67, 56, 202, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Building2 size={24} color="#4338ca" />
            </div>
            <div>
              <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.1 }}>500+</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "0.15rem" }}>Schools Trust Us</div>
            </div>
          </div>

          {/* Stat 2: 50K+ Active Users */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
            <div style={{ width: 46, height: 46, borderRadius: "12px", background: "rgba(59, 130, 246, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={24} color="#3b82f6" />
            </div>
            <div>
              <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.1 }}>50K+</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "0.15rem" }}>Active Users</div>
            </div>
          </div>

          {/* Stat 3: 25K+ Students Managed */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
            <div style={{ width: 46, height: 46, borderRadius: "12px", background: "rgba(139, 92, 246, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={24} color="#8b5cf6" />
            </div>
            <div>
              <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.1 }}>25K+</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "0.15rem" }}>Students Managed</div>
            </div>
          </div>

          {/* Stat 4: 99.9% Uptime & Reliability */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
            <div style={{ width: 46, height: 46, borderRadius: "12px", background: "rgba(16, 185, 129, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={24} color="#10b981" />
            </div>
            <div>
              <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.1 }}>99.9%</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "0.15rem" }}>Uptime &amp; Reliability</div>
            </div>
          </div>

          {/* Stat 5: 24/7 Customer Support */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
            <div style={{ width: 46, height: 46, borderRadius: "12px", background: "rgba(245, 158, 11, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Headphones size={24} color="#f59e0b" />
            </div>
            <div>
              <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.1 }}>24/7</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "0.15rem" }}>Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 1: POWERFUL FEATURES FOR EVERY ROLE ========== */}
      <section id="features" style={{ paddingTop: "20px", paddingBottom: "70px", paddingLeft: "4%", paddingRight: "4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3rem auto" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.82rem",
            fontWeight: 800,
            color: "#4338ca",
            background: "rgba(67, 56, 202, 0.08)",
            padding: "0.4rem 1rem",
            borderRadius: "99px",
            border: "1px solid rgba(67, 56, 202, 0.18)",
            marginBottom: "1.2rem"
          }}>
            ☖ Features
          </span>
          <h1 style={{
            fontSize: "clamp(2.5rem, 4vw, 3.4rem)",
            fontWeight: 800,
            color: "var(--text-main)",
            letterSpacing: "-0.03em",
            marginBottom: "1rem"
          }}>
            Powerful Features <span style={{ color: "#f97316" }}>for Every Role</span>
          </h1>
          <p style={{
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            Designed to simplify operations, improve communication, and ensure safety for students, parents, and schools.
          </p>
        </div>

        {/* Role Filter Tabs Row */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "3.5rem",
          flexWrap: "wrap"
        }}>
          {[
            { id: "all", label: "All Features" },
            { id: "admin", label: "School Admin" },
            { id: "teachers", label: "Teachers" },
            { id: "parents", label: "Parents" },
            { id: "students", label: "Students" },
            { id: "drivers", label: "Drivers" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRole(tab.id)}
              style={{
                padding: "0.65rem 1.4rem",
                borderRadius: "10px",
                border: activeRole === tab.id ? "none" : "1px solid var(--border-color)",
                background: activeRole === tab.id ? "#3b82f6" : "var(--bg-card)",
                color: activeRole === tab.id ? "#ffffff" : "var(--text-main)",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow: activeRole === tab.id ? "0 4px 14px rgba(59, 130, 246, 0.3)" : "0 2px 6px rgba(0,0,0,0.02)",
                transition: "all 0.25s ease"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4 Columns Grid Layout (Exact Match Screenshot Cards) */}
        <div className="features-grid-cards" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.75rem"
        }}>
          {filteredCards.map((card, i) => (
            <div key={i} className="feature-card-item" style={{
              background: "var(--bg-card)",
              borderRadius: "22px",
              padding: "2rem 1.6rem",
              textAlign: "left",
              border: "1px solid var(--border-color)",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "220px",
              cursor: "pointer"
            }}>
              <div>
                <div className="feature-icon-badge" style={{
                  width: 48,
                  height: 48,
                  borderRadius: "14px",
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.2rem"
                }}>
                  {card.icon}
                </div>

                <h3 style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "var(--text-main)",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.01em"
                }}>
                  {card.title}
                </h3>

                <p style={{
                  fontSize: "0.88rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.55,
                  marginBottom: "1.4rem"
                }}>
                  {card.desc}
                </p>
              </div>

              <div style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#3b82f6",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem"
              }}>
                Learn More <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 2: REAL-TIME TRACKING FOR PEACE OF MIND (EXACT MATCH SCREENSHOT 1 ROW 2) ========== */}
      <section style={{ padding: "40px 4% 80px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="realtime-tracking-section-grid" style={{
          background: "linear-gradient(135deg, rgba(238, 242, 255, 0.95) 0%, rgba(243, 244, 255, 0.85) 100%)",
          borderRadius: "28px",
          padding: "3.5rem 3rem",
          border: "1px solid rgba(199, 210, 254, 0.6)",
          boxShadow: "0 15px 40px rgba(99, 102, 241, 0.08)",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "3rem",
          alignItems: "center"
        }}>
          {/* Left Visual: 3D GPS Bus Tracking Map Image Showcase */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Glowing Backdrop Ambient Effect */}
            <div style={{
              position: "absolute",
              inset: "-15px",
              background: "linear-gradient(135deg, rgba(67, 56, 202, 0.2) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(139, 92, 246, 0.2) 100%)",
              borderRadius: "32px",
              filter: "blur(24px)",
              zIndex: 0
            }}></div>

            {/* Image Container Card */}
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "520px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 50px -10px rgba(15, 23, 42, 0.25)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/gps-map-tracking-3d.png"
                alt="SchoolMitra Real-time 3D GPS Bus Tracking Map Showcase"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover"
                }}
              />
            </div>
          </div>

          {/* Right Text Details */}
          <div>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.8rem",
              fontWeight: 800,
              color: "#4338ca",
              background: "rgba(67, 56, 202, 0.08)",
              padding: "0.35rem 0.85rem",
              borderRadius: "99px",
              border: "1px solid rgba(67, 56, 202, 0.15)",
              marginBottom: "1.2rem"
            }}>
              ❖ Student Safety First
            </span>

            <h2 style={{
              fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              lineHeight: 1.2
            }}>
              Real-time Tracking for <span style={{ color: "#f97316" }}>Peace of Mind</span>
            </h2>

            <p style={{
              fontSize: "1.05rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: "1.8rem"
            }}>
              Our live tracking system ensures parents always know where the bus is and when their child will reach.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "2.2rem" }}>
              {[
                "Live bus location on map",
                "Real-time alerts for pickup & drop",
                "ETA & route updates",
                "Geo-fencing & safe zones"
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid #3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#3b82f6" }}>⊙</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button onClick={() => window.location.href = "/auth?mode=signup"} className="btn-interactive-glow" style={{
              padding: "0.85rem 2.2rem",
              borderRadius: "12px",
              background: "#3b82f6",
              color: "#ffffff",
              border: "none",
              fontWeight: 800,
              fontSize: "0.98rem",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(59, 130, 246, 0.35)"
            }}>
              Explore Tracking Features
            </button>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: WHY SCHOOLS LOVE SCHOOLMITRA + TESTIMONIAL (EXACT MATCH SCREENSHOT 1 ROW 3) ========== */}
      <section style={{ padding: "0 4% 90px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="why-schools-love-grid" style={{
          background: "var(--bg-card)",
          borderRadius: "28px",
          padding: "3.5rem 3rem",
          border: "1px solid var(--border-color)",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "3.5rem",
          alignItems: "center"
        }}>
          {/* Left Column: Why Schools Love SchoolMitra */}
          <div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem"
            }}>
              Why Schools Love <span style={{ color: "#f97316" }}>SchoolMitra</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.95rem", marginBottom: "2.2rem" }}>
              {[
                "All-in-one platform for complete school management",
                "Easy to use with modern & intuitive interface",
                "Reliable support and regular updates",
                "Secure, scalable and future-ready"
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.98rem", fontWeight: 700, color: "var(--text-main)" }}>
                  <CheckCircle2 size={20} color="#3b82f6" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="hero-cta-group" style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <button onClick={() => window.location.href = "/auth?mode=signup"} className="btn-interactive-glow" style={{
                padding: "0.85rem 2rem",
                borderRadius: "12px",
                background: "#3b82f6",
                color: "#ffffff",
                border: "none",
                fontWeight: 800,
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(59, 130, 246, 0.3)"
              }}>
                Request a Demo
              </button>

              <Link href="/contact" style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: "#3b82f6",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem"
              }}>
                Contact Sales <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: School Leader Testimonial Box */}
          <div style={{
            background: "var(--bg-subtle)",
            borderRadius: "22px",
            padding: "2.2rem 2rem",
            border: "1px solid var(--border-color)",
            position: "relative"
          }}>
            <Quote size={36} color="#3b82f6" style={{ opacity: 0.3, marginBottom: "1rem" }} />
            
            <p style={{
              fontSize: "1.02rem",
              color: "var(--text-main)",
              lineHeight: 1.65,
              fontWeight: 500,
              marginBottom: "1.8rem"
            }}>
              &ldquo;SchoolMitra has transformed the way we manage our school. From bus tracking to fee management, everything is now automated and transparent. Communication with parents has never been easier!&rdquo;
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4338ca, #3b82f6)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1rem"
              }}>
                PS
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-main)" }}>Dr. Priya Sharma</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Principal, Greenwood International School</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: FULL-WIDTH SOLID BLUE CTA BANNER (EXACT MATCH SCREENSHOT 2) ========== */}
      <section style={{ padding: "0 4% 90px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="features-cta-banner-box" style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
          borderRadius: "24px",
          padding: "3.5rem 3.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 20px 50px rgba(37, 99, 235, 0.3)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Edge decorative dots */}
          <div style={{ position: "absolute", left: "20px", top: "20px", opacity: 0.15, color: "#fff", fontSize: "1.5rem" }}>•••••<br />•••••</div>

          <div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              marginBottom: "0.6rem"
            }}>
              Ready to Experience <span style={{ color: "#f97316" }}>These Powerful Features?</span>
            </h2>
            <p style={{
              fontSize: "1.05rem",
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 500
            }}>
              Join 500+ schools that trust SchoolMitra to simplify their operations and enhance student safety.
            </p>
          </div>

          <button onClick={() => window.location.href = "/auth?mode=signup"} style={{
            padding: "0.95rem 2.2rem",
            borderRadius: "14px",
            background: "#ffffff",
            color: "#2563eb",
            border: "none",
            fontWeight: 800,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            whiteSpace: "nowrap"
          }}>
            Get Started Now <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ========== SUPER PREMIUM FOOTER ========== */}
      <Footer />

      {/* Registration / Demo Modal */}
      {modalOpen && <SchoolRegistrationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
