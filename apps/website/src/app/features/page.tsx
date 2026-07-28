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
      <nav className="site-nav">
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 4px 14px rgba(67, 56, 202, 0.35)",
            transform: "rotate(-4deg)"
          }}>
            <GraduationCap size={20} />
          </div>
          <span style={{ fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span style={{ color: "var(--text-main)" }}>School</span>
            <span style={{ color: "#3b82f6" }}>Mitra</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/features" className="nav-link" style={{ color: "var(--primary)", fontWeight: 800 }}>
            Features
          </Link>
          <div className="nav-dropdown">
            <span className="nav-link" style={{ cursor: "pointer" }}>
              Solutions <ChevronDown size={14} />
            </span>
            <div className="nav-dropdown-menu">
              <Link href="/features" className="dropdown-item">
                <Sparkles size={16} color="#4338ca" /> All Features
              </Link>
              <Link href="/school-erp" className="dropdown-item">
                <FileText size={16} color="#4338ca" /> School ERP
              </Link>
              <Link href="/transport" className="dropdown-item">
                <Bus size={16} color="#3b82f6" /> GPS Bus Tracking
              </Link>
              <Link href="/parent-app" className="dropdown-item">
                <Smartphone size={16} color="#8b5cf6" /> Parent Mobile App
              </Link>
            </div>
          </div>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Right Nav Actions */}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{
              background: "var(--bg-subtle)",
              border: "1px solid var(--border-color)",
              padding: "0.45rem",
              borderRadius: "8px",
              cursor: "pointer",
              color: "var(--text-main)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link href="/login" className="btn-ghost-nav" style={{
            padding: "0.55rem 1.25rem",
            borderRadius: "10px",
            border: "1px solid var(--border-color)",
            color: "var(--text-main)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            background: "var(--bg-card)"
          }}>
            Login
          </Link>
          
          <button onClick={() => setModalOpen(true)} className="btn-primary-nav" style={{
            padding: "0.55rem 1.35rem",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
            color: "#ffffff",
            border: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(67, 56, 202, 0.25)"
          }}>
            Get Started
          </button>
        </div>
      </nav>

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

        <div style={{
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
              Everything You Need to Run a <span style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #4338ca 60%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Smarter School</span>
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

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button onClick={() => setModalOpen(true)} className="btn-interactive-glow" style={{
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

          {/* Right Column: Exact Match Laptop & Smartphone Visual Mockup */}
          <div className="showcase-container" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            {/* Laptop Frame (EduTrack Pro Dashboard Mockup) */}
            <div style={{
              width: "100%",
              maxWidth: "560px",
              background: "#0f172a",
              borderRadius: "18px",
              padding: "10px 10px 0 10px",
              boxShadow: "0 30px 65px -12px rgba(15, 23, 42, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              position: "relative"
            }}>
              {/* Window Bar */}
              <div style={{
                background: "#f1f5f9",
                borderRadius: "10px 10px 0 0",
                height: "350px",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "135px 1fr",
                fontSize: "0.6rem"
              }}>
                {/* Left Mini Sidebar Menu */}
                <div style={{ background: "#ffffff", borderRight: "1px solid #e2e8f0", padding: "0.6rem 0.5rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.68rem", display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.4rem" }}>
                    <div style={{ width: 14, height: 14, borderRadius: 4, background: "linear-gradient(135deg, #4338ca, #3b82f6)" }}></div>
                    EduTrack Pro
                  </div>

                  <div style={{ background: "#eff6ff", color: "#3b82f6", padding: "0.3rem 0.5rem", borderRadius: "6px", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <BarChart3 size={10} /> Dashboard
                  </div>
                  <div style={{ color: "#64748b", padding: "0.3rem 0.5rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Users size={10} /> Admissions
                  </div>
                  <div style={{ color: "#64748b", padding: "0.3rem 0.5rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <FileText size={10} /> Exams &amp; Marks
                  </div>
                  <div style={{ color: "#64748b", padding: "0.3rem 0.5rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <CreditCard size={10} /> Fee Collection
                  </div>
                  <div style={{ color: "#64748b", padding: "0.3rem 0.5rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Bus size={10} /> Live Bus Track
                  </div>
                </div>

                {/* Main Dashboard Panel */}
                <div style={{ padding: "0.6rem 0.8rem", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.75rem", color: "#0f172a" }}>Dashboard</span>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "linear-gradient(135deg, #4338ca, #3b82f6)", color: "#fff", fontSize: "0.45rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>A</div>
                  </div>

                  {/* 4 Counter Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.35rem" }}>
                    {[
                      { lbl: "Total Students", val: "12,645", color: "#4338ca" },
                      { lbl: "Total Teachers", val: "1,256", color: "#8b5cf6" },
                      { lbl: "Total Parents", val: "9,845", color: "#3b82f6" },
                      { lbl: "Attendance Rate", val: "92.6%", color: "#10b981" }
                    ].map((st, i) => (
                      <div key={i} style={{ background: "#ffffff", padding: "0.35rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <div style={{ fontSize: "0.38rem", color: "#64748b", fontWeight: 600 }}>{st.lbl}</div>
                        <div style={{ fontSize: "0.62rem", fontWeight: 800, color: st.color, marginTop: "0.1rem" }}>{st.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Charts Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "0.4rem", flex: 1 }}>
                    {/* Attendance Overview Bar Chart */}
                    <div style={{ background: "#ffffff", padding: "0.45rem", borderRadius: "7px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: "0.48rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.2rem" }}>Attendance Overview</div>
                      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "3px", paddingTop: "0.2rem" }}>
                        {[60, 45, 80, 55, 90, 70, 85].map((h, idx) => (
                          <div key={idx} style={{ flex: 1, height: `${h}%`, background: "#3b82f6", borderRadius: "2px 2px 0 0" }}></div>
                        ))}
                      </div>
                    </div>

                    {/* Fee Collection Donut Chart */}
                    <div style={{ background: "#ffffff", padding: "0.45rem", borderRadius: "7px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontSize: "0.48rem", fontWeight: 800, color: "#0f172a", width: "100%", textAlign: "left" }}>Fee Collection</div>
                      <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "conic-gradient(#10b981 0% 75%, #e2e8f0 75% 100%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0.2rem 0" }}>
                        <div style={{ width: "24px", height: "24px", background: "#ffffff", borderRadius: "50%" }}></div>
                      </div>
                      <div style={{ fontSize: "0.5rem", fontWeight: 800, color: "#0f172a" }}>₹12,45,000</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ background: "#0f172a", height: "12px", borderRadius: "0 0 12px 12px" }}></div>
            </div>

            {/* Smartphone Mockup (Overlapping Left Screen) */}
            <div style={{
              position: "absolute",
              left: "-35px",
              bottom: "-25px",
              width: "155px",
              background: "#0f172a",
              borderRadius: "26px",
              padding: "6px",
              boxShadow: "0 25px 50px rgba(15, 23, 42, 0.35)",
              border: "3px solid #334155",
              zIndex: 3
            }}>
              <div style={{ width: "40px", height: "8px", background: "#1e293b", borderRadius: "99px", margin: "0 auto 4px auto" }}></div>
              <div style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "0.4rem",
                height: "230px",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
                fontSize: "0.45rem",
                overflow: "hidden"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 800, color: "#0f172a", fontSize: "0.5rem" }}>
                  <span>← Live Tracking</span>
                  <span>⚙</span>
                </div>

                {/* Simulated Map */}
                <div style={{ flex: 1, background: "#e8ede6", borderRadius: "8px", position: "relative", overflow: "hidden" }}>
                  <svg width="100%" height="100%">
                    <path d="M 10 160 Q 60 100, 110 40" fill="none" stroke="#3b82f6" strokeWidth="4" />
                    <circle cx="110" cy="40" r="4" fill="#2563eb" />
                  </svg>
                  <div style={{ position: "absolute", top: "70px", left: "45px", background: "#f59e0b", color: "#fff", padding: "0.15rem 0.3rem", borderRadius: "4px", fontSize: "0.35rem", fontWeight: 800 }}>
                    🚌 Bus #12
                  </div>
                </div>

                {/* Telemetry Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.2rem", textAlign: "center", background: "#f8fafc", padding: "0.25rem", borderRadius: "6px" }}>
                  <div><div style={{ color: "#94a3b8", fontSize: "0.35rem" }}>ETA</div><div style={{ fontWeight: 800, color: "#0f172a" }}>06 min</div></div>
                  <div><div style={{ color: "#94a3b8", fontSize: "0.35rem" }}>Distance</div><div style={{ fontWeight: 800, color: "#0f172a" }}>2.4 km</div></div>
                  <div><div style={{ color: "#94a3b8", fontSize: "0.35rem" }}>Speed</div><div style={{ fontWeight: 800, color: "#0f172a" }}>40 km/h</div></div>
                </div>
              </div>
            </div>

            {/* Floating Live Tracking Card (Exact Match Right Widget from Screenshot) */}
            <div style={{
              position: "absolute",
              bottom: "10px",
              right: "-30px",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "0.85rem 1.1rem",
              boxShadow: "0 20px 45px rgba(15, 23, 42, 0.16)",
              border: "1px solid #e2e8f0",
              width: "210px",
              zIndex: 4
            }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#4338ca", display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.3rem" }}>
                ❖ Live Tracking
              </div>
              <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.4rem" }}>
                Bus No. UP 16 CT 2345
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.62rem", color: "#10b981", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }}></span> On Route
                </span>
                <span style={{ fontSize: "1.2rem" }}>🚌</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== 5 STATS METRICS BANNER (EXACT MATCH BOTTOM BAR) ========== */}
      <section style={{ padding: "0 5% 70px 5%" }}>
        <div style={{
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
            Powerful Features for Every Role
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
        <div style={{
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
        <div style={{
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
          {/* Left Visual: 3D Yellow Bus Map Illustration + Floating Cards */}
          <div style={{ position: "relative", minHeight: "340px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Background 3D Road Base Grid */}
            <div style={{
              width: "280px",
              height: "180px",
              background: "#ffffff",
              borderRadius: "20px",
              transform: "rotateX(55deg) rotateZ(-30deg)",
              boxShadow: "0 25px 50px rgba(67, 56, 202, 0.15)",
              border: "2px solid #e2e8f0",
              position: "relative"
            }}>
              {/* Route line */}
              <div style={{ position: "absolute", top: "50%", left: "10%", width: "80%", height: "6px", background: "linear-gradient(90deg, #3b82f6, #6366f1)", borderRadius: "99px" }}></div>
            </div>

            {/* 3D Yellow Bus Icon Badge Centered */}
            <div style={{
              position: "absolute",
              top: "40%",
              left: "42%",
              transform: "translate(-50%, -50%)",
              fontSize: "3.8rem",
              filter: "drop-shadow(0 15px 25px rgba(245, 158, 11, 0.4))",
              zIndex: 3
            }}>
              🚌
            </div>

            {/* Overlapping Floating Card 1 (Left Timeline) */}
            <div style={{
              position: "absolute",
              left: "-10px",
              top: "10px",
              background: "#ffffff",
              borderRadius: "18px",
              padding: "1rem 1.2rem",
              boxShadow: "0 15px 35px rgba(15, 23, 42, 0.12)",
              border: "1px solid #e2e8f0",
              width: "210px",
              fontSize: "0.75rem",
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={16} color="#10b981" />
                <div>
                  <div style={{ fontWeight: 800, color: "#0f172a" }}>Pickup Completed</div>
                  <div style={{ color: "#64748b", fontSize: "0.65rem" }}>Emma picked up at <b>07:45 AM</b></div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={16} color="#3b82f6" />
                <div>
                  <div style={{ fontWeight: 800, color: "#0f172a" }}>Reached School</div>
                  <div style={{ color: "#64748b", fontSize: "0.65rem" }}>Emma reached school at <b>08:05 AM</b></div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#ef4444", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800 }}>✕</div>
                <div>
                  <div style={{ fontWeight: 800, color: "#0f172a" }}>Attendance Marked</div>
                  <div style={{ color: "#64748b", fontSize: "0.65rem" }}>Present at <b>08:15 AM</b></div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#f59e0b", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800 }}>⏰</div>
                <div>
                  <div style={{ fontWeight: 800, color: "#0f172a" }}>Live Tracking</div>
                  <div style={{ color: "#64748b", fontSize: "0.65rem" }}>Bus is on the <b>way</b></div>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Card 2 (Student Card Right) */}
            <div style={{
              position: "absolute",
              right: "0px",
              bottom: "10px",
              background: "#ffffff",
              borderRadius: "18px",
              padding: "1rem 1.2rem",
              boxShadow: "0 15px 35px rgba(15, 23, 42, 0.12)",
              border: "1px solid #e2e8f0",
              width: "200px",
              zIndex: 4
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #f472b6, #ec4899)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem" }}>
                  EJ
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>Emma Johnson</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Class 5 - A</div>
                </div>
              </div>
              <div style={{ background: "#f8fafc", padding: "0.5rem 0.6rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={16} color="#10b981" />
                <div>
                  <div style={{ fontSize: "0.65rem", color: "#64748b" }}>Live Location</div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#0f172a" }}><b>2.4 km away</b> from School</div>
                </div>
              </div>
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
              color: "#0f172a",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              lineHeight: 1.2
            }}>
              Real-time Tracking for <span style={{ color: "#3b82f6" }}>Peace of Mind</span>
            </h2>

            <p style={{
              fontSize: "1.05rem",
              color: "#475569",
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
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.95rem", fontWeight: 700, color: "#1e293b" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid #3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#3b82f6" }}>⊙</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setModalOpen(true)} className="btn-interactive-glow" style={{
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
        <div style={{
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
              Why Schools Love SchoolMitra
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

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <button onClick={() => setModalOpen(true)} className="btn-interactive-glow" style={{
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
        <div style={{
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
              Ready to Experience These Powerful Features?
            </h2>
            <p style={{
              fontSize: "1.05rem",
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 500
            }}>
              Join 500+ schools that trust SchoolMitra to simplify their operations and enhance student safety.
            </p>
          </div>

          <button onClick={() => setModalOpen(true)} style={{
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

      {/* ========== FULL WEBSITE FOOTER ========== */}
      <footer style={{
        background: "var(--bg-card)",
        padding: "80px 5% 40px 5%",
        borderTop: "1px solid var(--border-color)"
      }}>
        <div style={{
          maxWidth: "1250px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: "3.5rem",
          marginBottom: "4rem"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.2rem" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #4338ca, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <GraduationCap size={18} />
              </div>
              <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-main)" }}>SchoolMitra</span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6, maxWidth: "300px" }}>
              India&apos;s leading School ERP &amp; GPS Bus Tracking platform empowering 500+ schools and 2.5L+ families.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "1.2rem" }}>Solutions</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", fontSize: "0.9rem" }}>
              <li><Link href="/school-erp" style={{ textDecoration: "none", color: "var(--text-muted)" }}>School ERP Suite</Link></li>
              <li><Link href="/transport" style={{ textDecoration: "none", color: "var(--text-muted)" }}>GPS Bus Telemetry</Link></li>
              <li><Link href="/parent-app" style={{ textDecoration: "none", color: "var(--text-muted)" }}>Parent Mobile App</Link></li>
              <li><Link href="/features" style={{ textDecoration: "none", color: "var(--text-muted)" }}>All Features</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "1.2rem" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", fontSize: "0.9rem" }}>
              <li><Link href="/pricing" style={{ textDecoration: "none", color: "var(--text-muted)" }}>Pricing Plans</Link></li>
              <li><Link href="/contact" style={{ textDecoration: "none", color: "var(--text-muted)" }}>Contact Support</Link></li>
              <li><Link href="/login" style={{ textDecoration: "none", color: "var(--text-muted)" }}>Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "1.2rem" }}>Headquarters</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>
              SchoolMitra Tech Park, Sector 62, Noida, Uttar Pradesh 201309
            </p>
            <div style={{ marginTop: "1rem", fontSize: "0.88rem", color: "#4338ca", fontWeight: 700 }}>
              ✉ support@schoolmitra.com
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: "1250px",
          margin: "0 auto",
          borderTop: "1px solid var(--border-color)",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.88rem",
          color: "var(--text-muted)"
        }}>
          <div>© {new Date().getFullYear()} SchoolMitra Technologies Pvt. Ltd. All rights reserved.</div>
          <div style={{ display: "flex", gap: "1.8rem", fontWeight: 600 }}>
            <Link href="/privacy" style={{ textDecoration: "none", color: "inherit" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ textDecoration: "none", color: "inherit" }}>Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Registration / Demo Modal */}
      {modalOpen && <SchoolRegistrationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
