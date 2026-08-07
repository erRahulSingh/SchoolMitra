"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, CheckCircle2, Users, Bus, FileText,
  TrendingUp, Clock, CreditCard, MessageSquare, Play, Sparkles,
  ChevronDown, Sun, Moon, Shield, Award, Smartphone, Activity,
  Phone, Mail, MapPin, Check, Star, BarChart3, PieChart, Bell, ChevronRight, Building2,
  Wallet, QrCode, CalendarCheck, ClipboardCheck, MessageCircle, Globe, BookOpen, Send
} from "lucide-react";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeRole, setActiveRole] = useState("all");
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div style={{ background: "var(--bg-page)", minHeight: "100vh", color: "var(--text-main)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ========== TOP NAVBAR ========== */}
      <Navbar />

      {/* ========== HERO SECTION ========== */}
      <section className="hero-wrapper" style={{
        paddingTop: "140px",
        paddingBottom: "80px",
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
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(67, 56, 202, 0.05) 50%, transparent 70%)",
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
          {/* Left Column */}
          <div className="hero-left">
            <h1 className="hero-title" style={{
              fontSize: "clamp(2.5rem, 4vw, 3.6rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "var(--text-main)",
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem"
            }}>
              Simplify School Management <span style={{ color: "#f97316" }}>&amp; Enhance Parent Connection</span>
            </h1>

            <p className="hero-subtitle" style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: "520px",
              marginBottom: "2.2rem",
              fontWeight: 500
            }}>
              Comprehensive School ERP, Bus Tracking, and Parent Engagement platform
            </p>

            <div className="hero-cta-group" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button onClick={() => window.location.href = "/auth?mode=signup"} style={{
                padding: "0.85rem 1.8rem",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
                color: "#ffffff",
                border: "none",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(67, 56, 202, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                Request a Demo
              </button>

              <Link href="#features" style={{
                padding: "0.85rem 1.8rem",
                borderRadius: "12px",
                background: "var(--bg-card)",
                color: "var(--text-main)",
                border: "1px solid var(--border-color)",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
              }}>
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Showcase using AI Generated Hero Image */}
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
              maxWidth: "500px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 60px -10px rgba(15, 23, 42, 0.35)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/hero-dashboard.png"
                alt="SchoolMitra ERP Dashboard and Mobile App Showcase"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover"
                }}
              />
            </div>

            {/* Floating Live Status Badge - Top Right */}
            <div style={{
              position: "absolute",
              top: "-15px",
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
                <div style={{ fontSize: "0.75rem", fontWeight: 800 }}>Live ERP Sync</div>
                <div style={{ fontSize: "0.62rem", color: "#94a3b8", fontWeight: 600 }}>Web + Parent App</div>
              </div>
            </div>

            {/* Floating Badge - Bottom Left */}
            <div style={{
              position: "absolute",
              bottom: "-15px",
              left: "-15px",
              background: "#ffffff",
              borderRadius: "14px",
              padding: "0.65rem 1rem",
              boxShadow: "0 15px 35px rgba(15, 23, 42, 0.15)",
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              zIndex: 3
            }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, #4338ca, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff"
              }}>
                <BarChart3 size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0f172a" }}>99.9% Attendance</div>
                <div style={{ fontSize: "0.65rem", color: "#16a34a", fontWeight: 700 }}>Real-time GPS Tracking</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRUSTED BY SCHOOLS SECTION ========== */}
      <section style={{
        padding: "85px 4%",
        textAlign: "center",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        background: "var(--bg-subtle)"
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Top Badge & Header */}
          <div style={{ marginBottom: "3rem" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.4rem 1rem",
              borderRadius: "99px",
              background: "rgba(67, 56, 202, 0.08)",
              border: "1px solid rgba(67, 56, 202, 0.18)",
              color: "var(--primary)",
              fontWeight: 800,
              fontSize: "0.82rem",
              marginBottom: "1rem"
            }}>
              <Sparkles size={14} /> TRUSTED BY 500+ EDUCATIONAL INSTITUTIONS
            </span>
            <h2 style={{
              fontSize: "clamp(2rem, 3vw, 2.7rem)",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem"
            }}>
              Empowering India&apos;s <span style={{ color: "#f97316" }}>Most Prestigious Schools</span>
            </h2>
            <p style={{
              color: "var(--text-muted)",
              fontSize: "1.05rem",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: 1.6
            }}>
              From single K-12 campuses to multi-city school chains, SchoolMitra powers daily administration, transport safety, and parent communication.
            </p>
          </div>

          {/* Quick Metrics Counter Row */}
          <div className="metrics-counter-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            marginBottom: "3.5rem"
          }}>
            {[
              { val: "500+", lbl: "Partner Schools", icon: <Building2 size={22} color="#4338ca" /> },
              { val: "2,50,000+", lbl: "Active Students & Parents", icon: <Users size={22} color="#10b981" /> },
              { val: "99.9%", lbl: "GPS & System Uptime", icon: <Shield size={22} color="#06b6d4" /> },
              { val: "4.9 ★", lbl: "Parent App Rating", icon: <Star size={22} color="#f59e0b" /> }
            ].map((m, idx) => (
              <div key={idx} style={{
                background: "var(--bg-card)",
                padding: "1.25rem 1rem",
                borderRadius: "18px",
                border: "1px solid var(--border-color)",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                justifyContent: "center"
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: "var(--bg-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {m.icon}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.1 }}>{m.val}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "0.2rem" }}>{m.lbl}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium School Cards Grid (6 Premium Cards) */}
          <div className="school-cards-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.75rem"
          }}>
            {[
              {
                name: "St. Xavier's International School",
                city: "New Delhi",
                students: "2,400+ Students",
                type: "CBSE Affiliated",
                icon: <GraduationCap size={24} color="#ffffff" />,
                badgeBg: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
                tag: "ERP & GPS Active"
              },
              {
                name: "Delhi Public Academy",
                city: "Mumbai",
                students: "3,800+ Students",
                type: "ICSE Board",
                icon: <Building2 size={24} color="#ffffff" />,
                badgeBg: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                tag: "Verified Partner ✓"
              },
              {
                name: "Ryan Global Foundation",
                city: "Bengaluru",
                students: "5,200+ Students",
                type: "Multi-Branch SaaS",
                icon: <Globe size={24} color="#ffffff" />,
                badgeBg: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
                tag: "Full Suite Enterprise"
              },
              {
                name: "Heritage World School",
                city: "Gurugram",
                students: "1,950+ Students",
                type: "IB World School",
                icon: <Award size={24} color="#ffffff" />,
                badgeBg: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                tag: "Parent App Top Pick"
              },
              {
                name: "Cambridge International Academy",
                city: "Pune",
                students: "2,200+ Students",
                type: "K-12 Day Boarding",
                icon: <Shield size={24} color="#ffffff" />,
                badgeBg: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
                tag: "Automated Fees Active"
              },
              {
                name: "Apex Public Senior School",
                city: "Hyderabad",
                students: "3,100+ Students",
                type: "State & Central Board",
                icon: <Sparkles size={24} color="#ffffff" />,
                badgeBg: "linear-gradient(135deg, #db2777 0%, #ec4899 100%)",
                tag: "Live Attendance"
              }
            ].map((school, i) => (
              <div key={i} className="trust-card-item" style={{
                background: "var(--bg-card)",
                borderRadius: "22px",
                padding: "1.75rem 1.5rem",
                border: "1px solid var(--border-color)",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "left",
                cursor: "pointer",
                position: "relative"
              }}>
                {/* Top Badge Pill */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
                  <div className="trust-card-icon-box" style={{
                    width: 48,
                    height: 48,
                    borderRadius: "14px",
                    background: school.badgeBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.15)"
                  }}>
                    {school.icon}
                  </div>
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#4338ca",
                    background: "rgba(67, 56, 202, 0.08)",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "99px",
                    border: "1px solid rgba(67, 56, 202, 0.15)"
                  }}>
                    {school.tag}
                  </span>
                </div>

                {/* School Information */}
                <div>
                  <h4 style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "var(--text-main)",
                    marginBottom: "0.4rem",
                    lineHeight: 1.3
                  }}>
                    {school.name}
                  </h4>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    marginBottom: "1rem"
                  }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                      <MapPin size={13} color="#4338ca" /> {school.city}
                    </span>
                    <span>•</span>
                    <span>{school.type}</span>
                  </div>
                </div>

                {/* Card Footer Roster Count */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "0.9rem",
                  marginTop: "0.5rem"
                }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-main)" }}>
                    {school.students}
                  </span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#10b981", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <CheckCircle2 size={13} /> Active Client
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURE GRID SECTION (POWERFUL FEATURES FOR EVERY ROLE) ========== */}
      <section id="features" style={{ padding: "90px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        {/* Top Header Badge & Title */}
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
          <h2 style={{
            fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
            fontWeight: 800,
            color: "var(--text-main)",
            letterSpacing: "-0.03em",
            marginBottom: "1rem"
          }}>
            Powerful Features <span style={{ color: "#f97316" }}>for Every Role</span>
          </h2>
          <p style={{
            fontSize: "1.08rem",
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

        {/* 4 Columns x 3 Rows Grid Layout (Exact Match Screenshot Cards) */}
        <div className="features-role-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.75rem"
        }}>
          {[
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
            }
          ]
            .filter((c) => activeRole === "all" || c.roles.includes(activeRole))
            .map((card, i) => (
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
                  {/* Soft Rounded Pastel Icon Box */}
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

                {/* Learn More Button Link */}
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

      {/* ========== FULL-SIZE DASHBOARD SHOWCASE SECTION ========== */}
      <section style={{ padding: "90px 4%", background: "linear-gradient(180deg, var(--bg-page) 0%, var(--bg-subtle) 100%)", borderTop: "1px solid var(--border-color)" }}>
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem auto" }}>
          <span style={{
            fontSize: "0.85rem",
            fontWeight: 800,
            color: "#4338ca",
            background: "rgba(67, 56, 202, 0.1)",
            padding: "0.35rem 0.9rem",
            borderRadius: "99px",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Live ERP Control Center
          </span>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 800, color: "var(--text-main)", marginTop: "0.8rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Powerful School ERP <span style={{ color: "#f97316" }}>&amp; Analytics Dashboard</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Take complete control of school administration with real-time attendance tracking, fee collection analytics, student performance statistics, and automated reporting.
          </p>
        </div>

        {/* Full-Size High Resolution App Window Frame */}
        <div className="dashboard-window-frame" style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 30px 70px -15px rgba(15, 23, 42, 0.18)",
          border: "1px solid var(--border-color)"
        }}>
          {/* Window macOS / Browser Top Bar */}
          <div className="dashboard-top-bar" style={{
            background: "#0f172a",
            padding: "0.75rem 1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }}></div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }}></div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }}></div>
            </div>

            <div className="dashboard-url-pill" style={{
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: "8px",
              padding: "0.3rem 1.2rem",
              color: "#94a3b8",
              fontSize: "0.82rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              minWidth: "320px",
              justifyContent: "center"
            }}>
              <Shield size={13} color="#10b981" /> https://app.schoolmitra.com/dashboard
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#10b981", fontSize: "0.8rem", fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }}></span> Live Sync
            </div>
          </div>

          {/* Inner Dashboard Body Layout */}
          <div className="dashboard-inner-body" style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "680px" }}>
            {/* Left Sidebar */}
            <div className="dashboard-sidebar" style={{
              background: "#ffffff",
              borderRight: "1px solid #e2e8f0",
              padding: "1.5rem 1.2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #4338ca, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff"
                }}>
                  <GraduationCap size={18} />
                </div>
                <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>SchoolMitra</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {[
                  { icon: <BarChart3 size={18} />, label: "Dashboard", active: true },
                  { icon: <Users size={18} />, label: "Admissions & Students", active: false },
                  { icon: <FileText size={18} />, label: "Exams & Report Cards", active: false },
                  { icon: <CreditCard size={18} />, label: "Fee Analytics", active: false },
                  { icon: <Bus size={18} />, label: "Live Bus Tracking", active: false },
                  { icon: <MessageSquare size={18} />, label: "Parent App Feeds", active: false },
                  { icon: <Clock size={18} />, label: "System Settings", active: false }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "10px",
                    fontWeight: item.active ? 800 : 600,
                    fontSize: "0.9rem",
                    color: item.active ? "#3b82f6" : "#64748b",
                    background: item.active ? "#eff6ff" : "transparent",
                    cursor: "pointer"
                  }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Profile Summary */}
              <div style={{
                marginTop: "auto",
                padding: "0.85rem",
                borderRadius: "12px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem"
              }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #4338ca, #3b82f6)", color: "#fff", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>R</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "#0f172a" }}>Dr. Rajesh Sharma</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>School Principal</div>
                </div>
              </div>
            </div>

            {/* Dashboard Content Container */}
            <div className="dashboard-main-content" style={{ background: "#f8fafc", padding: "1.8rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Header Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>Dashboard</h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b" }}>Welcome back! Here is today&apos;s real-time school overview.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <button style={{ padding: "0.55rem 1rem", borderRadius: "8px", background: "#ffffff", border: "1px solid #e2e8f0", fontWeight: 700, fontSize: "0.85rem", color: "#334155", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    ↻ Refresh Data
                  </button>
                  <button onClick={() => window.location.href = "/auth?mode=signup"} style={{ padding: "0.55rem 1.2rem", borderRadius: "8px", background: "linear-gradient(135deg, #4338ca, #3b82f6)", border: "none", fontWeight: 700, fontSize: "0.85rem", color: "#ffffff", cursor: "pointer" }}>
                    + Quick Action
                  </button>
                </div>
              </div>

              {/* 4 Stat Cards Row */}
              <div className="dashboard-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.2rem" }}>
                {[
                  { label: "Total Students", val: "2,450", change: "+12% this month", icon: <Users size={20} color="#4338ca" />, bg: "rgba(67, 56, 202, 0.1)" },
                  { label: "Today Attendance", val: "96.8%", change: "2,371 Present", icon: <CheckCircle2 size={20} color="#10b981" />, bg: "rgba(16, 185, 129, 0.1)" },
                  { label: "Fee Collected", val: "₹18.4L", change: "88% total target", icon: <CreditCard size={20} color="#f97316" />, bg: "rgba(249, 115, 22, 0.1)" },
                  { label: "Active Buses", val: "18 / 18", change: "All GPS live", icon: <Bus size={20} color="#06b6d4" />, bg: "rgba(6, 182, 212, 0.1)" }
                ].map((stat, i) => (
                  <div key={i} className="stat-card-item" style={{ background: "#ffffff", padding: "1.1rem", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer" }}>
                    <div>
                      <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>{stat.label}</div>
                      <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: "0.2rem 0" }}>{stat.val}</div>
                      <div style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700 }}>{stat.change}</div>
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {stat.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row 1: Attendance Dual Bar Chart (65%) & Fee Analytics Donut (35%) */}
              <div className="dashboard-charts-row1" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "1.2rem" }}>
                {/* Attendance Dual Bar Chart */}
                <div style={{ background: "#ffffff", padding: "1.2rem", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>Attendance</h4>
                      <p style={{ fontSize: "0.78rem", color: "#64748b" }}>Weekly student presence across all grades</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.78rem" }}>
                      <span style={{ background: "#f1f5f9", padding: "0.3rem 0.6rem", borderRadius: "6px", fontWeight: 600 }}>All Classes</span>
                      <span style={{ background: "#f1f5f9", padding: "0.3rem 0.6rem", borderRadius: "6px", fontWeight: 600 }}>All Grades ▾</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.8rem", height: "180px", paddingTop: "1rem" }}>
                    {[
                      { day: "Sun", indigo: 60, cyan: 48 },
                      { day: "Mon", indigo: 65, cyan: 45 },
                      { day: "Tue", indigo: 58, cyan: 48 },
                      { day: "Wed", indigo: 78, cyan: 60 },
                      { day: "Thu", indigo: 40, cyan: 28 },
                      { day: "Fri", indigo: 55, cyan: 40 },
                      { day: "Sat", indigo: 70, cyan: 40 },
                      { day: "Sun", indigo: 88, cyan: 68 }
                    ].map((item, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", height: "100%" }}>
                        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "3px", width: "100%" }}>
                          <div style={{ flex: 1, height: `${item.indigo}%`, background: "#4338ca", borderRadius: "4px 4px 0 0" }}></div>
                          <div style={{ flex: 1, height: `${item.cyan}%`, background: "#06b6d4", borderRadius: "4px 4px 0 0" }}></div>
                        </div>
                        <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700 }}>{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fee Analytics Donut Chart */}
                <div style={{ background: "#ffffff", padding: "1.2rem", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "100%", textAlign: "left", marginBottom: "0.5rem" }}>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>Fee Analytics</h4>
                    <p style={{ fontSize: "0.78rem", color: "#64748b" }}>Collection status Q3</p>
                  </div>
                  <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "conic-gradient(#4338ca 0% 40%, #10b981 40% 60%, #f97316 60% 75%, #06b6d4 75% 100%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "1rem 0" }}>
                    <div style={{ width: "70px", height: "70px", background: "#ffffff", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a" }}>88%</span>
                      <span style={{ fontSize: "0.62rem", color: "#64748b" }}>Collected</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.78rem", color: "#64748b" }}>
                    <span><span style={{ color: "#4338ca" }}>●</span> Paid ₹18.4L</span>
                    <span><span style={{ color: "#10b981" }}>●</span> Pending ₹2.2L</span>
                  </div>
                </div>
              </div>

              {/* Charts Row 2: Student Statistic (55%) & Student Statistics Leaderboard (45%) */}
              <div className="dashboard-charts-row2" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.2rem" }}>
                {/* Student Statistic Dual Bar Chart */}
                <div style={{ background: "#ffffff", padding: "1.2rem", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>Student Statistic</h4>
                    <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.78rem" }}>
                      <span style={{ background: "#f1f5f9", padding: "0.3rem 0.6rem", borderRadius: "6px", fontWeight: 600 }}>All Modules</span>
                      <span style={{ background: "#f1f5f9", padding: "0.3rem 0.6rem", borderRadius: "6px", fontWeight: 600 }}>50 Students ▾</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", height: "140px", paddingTop: "0.5rem" }}>
                    {[
                      { day: "Mon", indigo: 76, cyan: 62 },
                      { day: "Tue", indigo: 50, cyan: 40 },
                      { day: "Wed", indigo: 58, cyan: 74 },
                      { day: "Thu", indigo: 42, cyan: 64 },
                      { day: "Fri", indigo: 80, cyan: 90 },
                      { day: "Sat", indigo: 36, cyan: 54 }
                    ].map((item, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", height: "100%" }}>
                        <div style={{ flex: 1, height: `${item.indigo}%`, background: "#4338ca", borderRadius: "3px 3px 0 0" }}></div>
                        <div style={{ flex: 1, height: `${item.cyan}%`, background: "#06b6d4", borderRadius: "3px 3px 0 0" }}></div>
                      </div>
                        ))}
                  </div>
                </div>

                {/* Student Statistics List */}
                <div style={{ background: "#ffffff", padding: "1.2rem", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.2rem" }}>Student Statistics</h4>
                  {[
                    { avatar: "R", name: "Riya Sharma", detail: "Class X-A • Roll 24", val: "955.00", stroke: "#8b5cf6" },
                    { avatar: "A", name: "Aarav Kumar", detail: "Class VIII-B • Roll 12", val: "514.14", stroke: "#ef4444" },
                    { avatar: "S", name: "Sia Vance", detail: "Class VI-C • Roll 08", val: "106.70", stroke: "#10b981" },
                    { avatar: "K", name: "Kabir Singh", detail: "Class V-A • Roll 15", val: "165.70", stroke: "#06b6d4" }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.3rem 0", borderBottom: idx < 3 ? "1px solid #f1f5f9" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#eff6ff", color: "#3b82f6", fontWeight: 800, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.82rem" }}>{item.name}</div>
                          <div style={{ color: "#94a3b8", fontSize: "0.72rem" }}>{item.detail}</div>
                        </div>
                      </div>
                      <svg width="45" height="18" viewBox="0 0 45 18">
                        <path d="M0 14 Q 10 4, 22 10 T 45 5" fill="none" stroke={item.stroke} strokeWidth="2.5" />
                      </svg>
                      <span style={{ fontWeight: 800, color: "var(--text-main)", fontSize: "0.85rem" }}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING SECTION ========== */}
      <section id="pricing" style={{ padding: "90px 4%", background: "var(--bg-page)" }}>
        {/* Header Badge & Title */}
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3rem auto" }}>
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
            marginBottom: "1.2rem"
          }}>
            ❖ Simple &amp; Transparent Pricing
          </span>
          <h2 style={{
            fontSize: "clamp(2.4rem, 3.8vw, 3.2rem)",
            fontWeight: 800,
            color: "var(--text-main)",
            letterSpacing: "-0.03em",
            marginBottom: "1rem"
          }}>
            Choose the Perfect Plan <span style={{ color: "#f97316" }}>for Your School</span>
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            Affordable pricing plans for schools of all sizes. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Monthly vs Yearly Toggle Switch */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3.5rem" }}>
          <div style={{
            background: "var(--bg-subtle)",
            padding: "0.35rem",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            display: "inline-flex",
            gap: "0.4rem"
          }}>
            <button
              onClick={() => setIsYearly(false)}
              style={{
                padding: "0.6rem 1.6rem",
                borderRadius: "9px",
                border: "none",
                background: !isYearly ? "#3b82f6" : "transparent",
                color: !isYearly ? "#ffffff" : "var(--text-muted)",
                fontWeight: 800,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              style={{
                padding: "0.6rem 1.6rem",
                borderRadius: "9px",
                border: "none",
                background: isYearly ? "#3b82f6" : "transparent",
                color: isYearly ? "#ffffff" : "var(--text-muted)",
                fontWeight: 800,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* 3 Tiered Pricing Cards Grid */}
        <div className="pricing-plans-cards-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          maxWidth: "1240px",
          margin: "0 auto",
          alignItems: "stretch"
        }}>
          {/* Card 1: Basic Plan */}
          <div className="pricing-card-item" style={{
            background: "var(--bg-card)",
            padding: "2.5rem 2rem",
            borderRadius: "24px",
            border: "1px solid var(--border-color)",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
            <div>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(139, 92, 246, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem"
              }}>
                <Send size={24} color="#8b5cf6" />
              </div>

              <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.3rem" }}>
                Basic
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Perfect for small schools
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.03em" }}>
                  ₹{isYearly ? "3,999" : "4,999"}
                </span>
                <span style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>/month</span>
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: "2rem" }}>
                {isYearly ? "Billed annually (Save 20%)" : "Billed monthly"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                {[
                  "Up to 200 Students",
                  "5 Teacher Accounts",
                  "2 Buses Tracking",
                  "Basic Reports",
                  "Email Support"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "var(--text-main)", fontWeight: 600 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800 }}>✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => window.location.href = "/auth?mode=signup"} style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1.5px solid #3b82f6",
              color: "#3b82f6",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: "pointer"
            }}>
              Get Started
            </button>
          </div>

          {/* Card 2: Pro Plan (Featured "Most Popular") */}
          <div className="pricing-card-item pricing-featured" style={{
            background: "var(--bg-card)",
            padding: "2.5rem 2rem",
            borderRadius: "24px",
            border: "2px solid #3b82f6",
            boxShadow: "0 20px 45px rgba(59, 130, 246, 0.18)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
            <div style={{
              position: "absolute",
              top: -15,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#3b82f6",
              color: "#ffffff",
              padding: "0.35rem 1.4rem",
              borderRadius: "99px",
              fontWeight: 800,
              fontSize: "0.8rem",
              boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem"
            }}>
              ❖ Most Popular
            </div>

            <div>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                boxShadow: "0 6px 16px rgba(59, 130, 246, 0.3)"
              }}>
                <Star size={24} color="#ffffff" fill="#ffffff" />
              </div>

              <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.3rem" }}>
                Pro
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Ideal for growing schools
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.03em" }}>
                  ₹{isYearly ? "7,999" : "9,999"}
                </span>
                <span style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>/month</span>
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: "2rem" }}>
                {isYearly ? "Billed annually (Save 20%)" : "Billed monthly"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                {[
                  "Up to 1000 Students",
                  "25 Teacher Accounts",
                  "10 Buses Tracking",
                  "Advanced Reports",
                  "Parent App Access",
                  "Priority Support",
                  "Custom Notifications"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "var(--text-main)", fontWeight: 700 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#3b82f6", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800 }}>✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => window.location.href = "/auth?mode=signup"} className="btn-interactive-glow" style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "12px",
              background: "#3b82f6",
              border: "none",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(59, 130, 246, 0.35)"
            }}>
              Get Started
            </button>
          </div>

          {/* Card 3: Enterprise Plan */}
          <div className="pricing-card-item" style={{
            background: "var(--bg-card)",
            padding: "2.5rem 2rem",
            borderRadius: "24px",
            border: "1px solid var(--border-color)",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
            <div>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem"
              }}>
                <Award size={24} color="#10b981" />
              </div>

              <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.3rem" }}>
                Enterprise
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                For large schools &amp; groups
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.03em" }}>
                  ₹{isYearly ? "15,999" : "19,999"}
                </span>
                <span style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 600 }}>/month</span>
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: "2rem" }}>
                {isYearly ? "Billed annually (Save 20%)" : "Billed monthly"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                {[
                  "Unlimited Students",
                  "Unlimited Teachers",
                  "Unlimited Buses",
                  "Advanced Reports & Analytics",
                  "Multi-Branch Management",
                  "Dedicated Account Manager",
                  "24/7 Priority Support",
                  "Custom Integrations"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "var(--text-main)", fontWeight: 600 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800 }}>✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => window.location.href = "/auth?mode=signup"} style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1.5px solid #3b82f6",
              color: "#3b82f6",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: "pointer"
            }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* ========== SLIDING TESTIMONIALS SECTION (4 CARDS PER ROW) ========== */}
      <section style={{ padding: "90px 4%", background: "var(--bg-subtle)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem auto" }}>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            Testimonials <span style={{ color: "#f97316" }}>cards</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, marginTop: "0.6rem" }}>
            Authentic stories with satisfied schools and parents.
          </p>
        </div>

        {/* Carousel Slider Outer Viewport Container (Expanded to 1400px for 4 cards per row) */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", overflow: "hidden" }}>
          {/* Sliding Track */}
          <div style={{
            display: "flex",
            transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: `translateX(-${testimonialIndex * 100}%)`
          }}>
            {[
              // Slide Group 0 (4 Cards per row)
              [
                {
                  quote: "SchoolMitra has completely transformed our school management. The GPS bus tracking gives peace of mind to parents, and fee collections are now 95% automated.",
                  name: "Dr. Rajesh Sharma",
                  role: "School Administrator",
                  avatar: "R",
                  bg: "linear-gradient(135deg, #4338ca, #3b82f6)"
                },
                {
                  quote: "The digital attendance and instant WhatsApp notification feature saved our administrative staff hundreds of hours every month. Highly recommended for modern schools!",
                  name: "Sunita Deshmukh",
                  role: "Vice Principal",
                  avatar: "S",
                  bg: "linear-gradient(135deg, #059669, #10b981)"
                },
                {
                  quote: "Managing multiple school branches was a nightmare before SchoolMitra. Now, I can monitor real-time attendance, fee analytics, and staff performance from one place.",
                  name: "Vikramaditya Rao",
                  role: "School Director",
                  avatar: "V",
                  bg: "linear-gradient(135deg, #d97706, #f59e0b)"
                },
                {
                  quote: "The parent mobile app is super intuitive. I get live updates when my daughter boards the school bus and can view her report cards instantly on my phone.",
                  name: "Priya Nair",
                  role: "Parent of Grade VIII",
                  avatar: "P",
                  bg: "linear-gradient(135deg, #7c3aed, #8b5cf6)"
                }
              ],
              // Slide Group 1 (4 Cards per row)
              [
                {
                  quote: "Exam management and report card generation used to take 2 weeks. With SchoolMitra, teachers publish report cards with 1-click grade calculation in minutes!",
                  name: "Anil Kapoor",
                  role: "Senior Administrator",
                  avatar: "A",
                  bg: "linear-gradient(135deg, #0284c7, #38bdf8)"
                },
                {
                  quote: "Online fee collection with automated SMS reminders reduced our pending dues by 80% within the very first trimester. Fantastic platform and support!",
                  name: "Meenakshi Sundaram",
                  role: "Finance Director",
                  avatar: "M",
                  bg: "linear-gradient(135deg, #db2777, #ec4899)"
                },
                {
                  quote: "QR check-in for visitors and biometric staff attendance transformed our school campus security into a modern fortress. Seamless integration!",
                  name: "Capt. Arvind Verma",
                  role: "Security & Ops Head",
                  avatar: "A",
                  bg: "linear-gradient(135deg, #475569, #64748b)"
                },
                {
                  quote: "Teachers love the digital homework feed. Parents submit questions directly in the app, eliminating miscommunication completely.",
                  name: "Kavita Reddy",
                  role: "Headmistress Primary",
                  avatar: "K",
                  bg: "linear-gradient(135deg, #4338ca, #6366f1)"
                }
              ],
              // Slide Group 2 (4 Cards per row)
              [
                {
                  quote: "The AI Analytics dashboard alerts us about student attendance drops early, enabling proactive counselor intervention before exams.",
                  name: "David Smith",
                  role: "Academic Coordinator",
                  avatar: "D",
                  bg: "linear-gradient(135deg, #0d9488, #14b8a6)"
                },
                {
                  quote: "Implementation was smooth and onboarding took less than 48 hours. Our parents and teachers adapted to the mobile app instantly!",
                  name: "Sanjay Singhania",
                  role: "Trustee Member",
                  avatar: "S",
                  bg: "linear-gradient(135deg, #b45309, #d97706)"
                },
                {
                  quote: "The live bus tracking route optimization cut our transportation fuel expenses by 22% in the first quarter itself.",
                  name: "Ramesh Pathak",
                  role: "Transport Manager",
                  avatar: "R",
                  bg: "linear-gradient(135deg, #15803d, #22c55e)"
                },
                {
                  quote: "Multi-branch SaaS capability allows our central board to view real-time statistics across all 14 schools seamlessly.",
                  name: "Dr. Shalini Gupta",
                  role: "CEO Education Group",
                  avatar: "S",
                  bg: "linear-gradient(135deg, #6d28d9, #8b5cf6)"
                }
              ]
            ].map((slideGroup, groupIdx) => (
              <div key={groupIdx} style={{
                minWidth: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.5rem",
                padding: "0.5rem"
              }}>
                {slideGroup.map((card, cardIdx) => (
                  <div key={cardIdx} className="testimonial-card-item" style={{
                    background: "var(--bg-card)",
                    borderRadius: "24px",
                    padding: "1.8rem 1.4rem",
                    border: "1px solid var(--border-color)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer"
                  }}>
                    <div>
                      {/* Large Quotation Mark Icon Header */}
                      <div className="testimonial-quote-icon" style={{
                        fontSize: "2.4rem",
                        fontWeight: 900,
                        color: "#4338ca",
                        lineHeight: 1,
                        marginBottom: "0.8rem",
                        fontFamily: "Georgia, serif",
                        opacity: 0.85
                      }}>
                        ““
                      </div>

                      <p style={{
                        fontSize: "0.88rem",
                        color: "var(--text-main)",
                        lineHeight: 1.6,
                        fontStyle: "italic",
                        marginBottom: "1.5rem"
                      }}>
                        &ldquo;{card.quote}&rdquo;
                      </p>
                    </div>

                    {/* Author Profile Footer */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                      <div className="testimonial-avatar" style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: card.bg,
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                      }}>
                        {card.avatar}
                      </div>

                      <div style={{ overflow: "hidden" }}>
                        <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {card.name}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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

        {/* Carousel Pagination Control Dots */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.6rem", marginTop: "2.5rem" }}>
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setTestimonialIndex(idx)}
              title={`Go to slide group ${idx + 1}`}
              style={{
                width: testimonialIndex === idx ? 28 : 10,
                height: 10,
                borderRadius: "99px",
                background: testimonialIndex === idx ? "#4338ca" : "#cbd5e1",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            />
          ))}
        </div>
      </section>

      {/* ========== HOW IT WORKS SECTION (MATCHING UI REFERENCE) ========== */}
      <section style={{ padding: "90px 4%", background: "var(--bg-page)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 4rem auto" }}>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            How It <span style={{ color: "#f97316" }}>Works</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, marginTop: "0.8rem" }}>
            Onboarding &amp; implementation process made simple and seamless for your school.
          </p>
        </div>

        {/* 4 Connected Process Steps Pipeline */}
        <div className="how-it-works-pipeline-grid" style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          position: "relative"
        }}>
          {[
            {
              stepNum: 1,
              title: "Step 1: Onboarding",
              desc: "Easy data import & initial student and staff roster configuration.",
              icon: <Wallet size={24} color="#4338ca" />
            },
            {
              stepNum: 2,
              title: "Step 2: Training",
              desc: "Comprehensive training for teachers, admin staff & bus drivers.",
              icon: <FileText size={24} color="#4338ca" />
            },
            {
              stepNum: 3,
              title: "Step 3: Implementation",
              desc: "Go live with parent app credentials & automated fee setup.",
              icon: <CheckCircle2 size={24} color="#4338ca" />
            },
            {
              stepNum: 4,
              title: "Step 4: Live Management",
              desc: "Real-time GPS tracking, attendance & continuous dedicated support.",
              icon: <TrendingUp size={24} color="#4338ca" />
            }
          ].map((step, i) => (
            <div key={i} className="step-item-box" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              cursor: "pointer"
            }}>
              {/* Connecting Line between step icons */}
              {i < 3 && (
                <div style={{
                  position: "absolute",
                  top: "32px",
                  left: "55%",
                  width: "90%",
                  height: "2px",
                  background: "var(--border-color)",
                  zIndex: 0
                }}></div>
              )}

              {/* Icon Badge */}
              <div className="step-icon-badge" style={{
                width: 64,
                height: 64,
                borderRadius: "20px",
                background: "var(--bg-card)",
                border: "1.5px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 8px 20px rgba(67, 56, 202, 0.08)"
              }}>
                {step.icon}
              </div>

              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.6rem" }}>
                {step.title}
              </h3>

              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55, maxWidth: "240px" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== LIVE GPS TRACKING SHOWCASE SECTION (3D IMAGE DUAL PANEL) ========== */}
      <section style={{ padding: "90px 4%", background: "var(--bg-page)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem auto" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            color: "#0284c7",
            background: "rgba(2, 132, 199, 0.08)",
            padding: "0.35rem 0.9rem",
            borderRadius: "99px",
            fontSize: "0.82rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.8rem",
            border: "1px solid rgba(2, 132, 199, 0.2)"
          }}>
            <Bus size={15} color="#0284c7" /> Real-time Fleet Telemetry
          </span>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            Live GPS <span style={{ color: "#f97316" }}>Bus Tracking</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, marginTop: "0.6rem" }}>
            Real-time bus route telemetry, live driver location streaming, and automated instant ETA alerts for parents.
          </p>
        </div>

        {/* Dual Side-by-Side 3D Image Showcase Container */}
        <div className="gps-tracking-container" style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          alignItems: "stretch"
        }}>

          {/* ── LEFT CARD: 3D GPS ROUTE MAP IMAGE ── */}
          <div className="gps-map-side" style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            padding: "1.5rem",
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
            border: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(2, 132, 199, 0.1)", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>Interactive GPS Route Map</h3>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Live Telemetry • Noida Sector 62</span>
                </div>
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#10b981", background: "#e6f4ea", padding: "0.2rem 0.6rem", borderRadius: "99px" }}>● Live Signal 100%</span>
            </div>

            {/* 3D Map Image Frame */}
            <div style={{
              borderRadius: "18px",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              position: "relative",
              height: "320px",
              background: "#0f172a"
            }}>
              <img
                src="/images/gps-map-tracking-3d.png"
                alt="SchoolMitra Real-Time Live GPS Bus Route Map Showcase"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                background: "rgba(15, 23, 42, 0.85)",
                color: "#ffffff",
                backdropFilter: "blur(8px)",
                padding: "0.45rem 0.85rem",
                borderRadius: "10px",
                fontSize: "0.75rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <span style={{ color: "#38bdf8" }}>● Live Bus #12</span>
                <span>•</span>
                <span>42 km/h</span>
              </div>
            </div>

            {/* Route Stops Breakdown */}
            <div style={{
              background: "var(--bg-page)",
              borderRadius: 14,
              padding: "0.9rem 1rem",
              border: "1px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--text-main)" }}>Live ETA Route Stops</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem" }}>
                <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>St. Xavier&apos;s Gate (0.8 km)</span>
                <span style={{ fontWeight: 800, color: "#4338ca" }}>8:44 min</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem" }}>
                <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Green Park Pickup Stop</span>
                <span style={{ fontWeight: 800, color: "#10b981" }}>7:03 min</span>
              </div>
            </div>
          </div>


          {/* ── RIGHT CARD: 3D BUS FLEET & PARENT ALERT IMAGE ── */}
          <div className="gps-tracking-panel" style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            padding: "1.5rem",
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
            border: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(245, 158, 11, 0.12)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bus size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>Smart Bus Fleet Telemetry</h3>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Driver App &amp; RFID Boarding Scans</span>
                </div>
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#4338ca", background: "#eef2ff", padding: "0.2rem 0.6rem", borderRadius: "99px" }}>18 / 18 Buses Active</span>
            </div>

            {/* 3D Bus Image Frame */}
            <div style={{
              borderRadius: "18px",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              position: "relative",
              height: "320px",
              background: "#0f172a"
            }}>
              <img
                src="/images/gps-telemetry-bus-3d.png"
                alt="SchoolMitra Smart Yellow School Bus Fleet & Telemetry Showcase"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                background: "rgba(15, 23, 42, 0.85)",
                color: "#ffffff",
                backdropFilter: "blur(8px)",
                padding: "0.45rem 0.85rem",
                borderRadius: "10px",
                fontSize: "0.75rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <span style={{ color: "#10b981" }}>✓ RFID Boarding Scanned</span>
              </div>
            </div>

            {/* Parent Notification Lockscreen Preview */}
            <div style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              borderRadius: 14,
              padding: "0.85rem 1rem",
              color: "#ffffff"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#38bdf8" }}>📱 PARENT APP NOTIFICATION</span>
                <span style={{ fontSize: "0.62rem", color: "#94a3b8" }}>Just now</span>
              </div>
              <div style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>
                &ldquo;Bus #12 approaching stop! Your child Aarav is on board. Expected arrival in 4 mins.&rdquo;
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => window.location.href = "/auth?mode=signup"}
              style={{
                width: "100%",
                padding: "0.85rem",
                borderRadius: 14,
                background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
                color: "#ffffff",
                border: "none",
                fontWeight: 800,
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 8px 22px rgba(67, 56, 202, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.55rem"
              }}
            >
              Test Live Fleet Telemetry <ArrowRight size={16} />
            </button>

          </div>
        </div>
      </section>

      {/* ========== PARENT MOBILE APP SHOWCASE SECTION ========== */}
      <section style={{ padding: "90px 4%", background: "var(--bg-page)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 4rem auto" }}>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            Parent <span style={{ color: "#f97316" }}>Mobile App</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, marginTop: "0.8rem" }}>
            Dedicated parent mobile app for instant notifications, fee payments, attendance tracking, and transport personnel.
          </p>
        </div>

        {/* 3 Smartphone Mockups Showcase */}
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2.5rem",
          flexWrap: "wrap"
        }}>
          {/* Phone 1: Left Phone (Student Attendance & Profiles) */}
          <div style={{
            width: "260px",
            background: "#0f172a",
            borderRadius: "36px",
            padding: "10px",
            boxShadow: "0 25px 50px rgba(15, 23, 42, 0.22)",
            border: "3px solid #334155"
          }}>
            {/* Phone Notch */}
            <div style={{ width: "60px", height: "12px", background: "#1e293b", borderRadius: "99px", margin: "0 auto 10px auto" }}></div>
            <div style={{
              background: "#f8fafc",
              borderRadius: "26px",
              padding: "0.8rem",
              height: "440px",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              fontSize: "0.62rem"
            }}>
              {/* Top Banner */}
              <div style={{ background: "linear-gradient(135deg, #4338ca, #3b82f6)", padding: "0.8rem", borderRadius: "14px", color: "#ffffff" }}>
                <div style={{ fontWeight: 800, fontSize: "0.75rem" }}>Riya Sharma</div>
                <div style={{ fontSize: "0.6rem", opacity: 0.9 }}>Class V-A • Roll #24</div>
              </div>

              {/* Module Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.3rem", textAlign: "center" }}>
                {[
                  { label: "Attendance", color: "#eff6ff", iconColor: "#3b82f6" },
                  { label: "Fees", color: "#ecfdf5", iconColor: "#10b981" },
                  { label: "Exams", color: "#fff7ed", iconColor: "#f97316" },
                  { label: "Bus", color: "#f5f3ff", iconColor: "#8b5cf6" }
                ].map((m, i) => (
                  <div key={i} style={{ background: m.color, padding: "0.4rem 0.2rem", borderRadius: "8px", fontWeight: 700, fontSize: "0.48rem", color: m.iconColor }}>
                    {m.label}
                  </div>
                ))}
              </div>

              {/* Student Activity Feed */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: "0.65rem", color: "#0f172a" }}>Recent Records</div>
                {[
                  { name: "Aarav Kumar", detail: "Present today", status: "Checked", color: "#10b981" },
                  { name: "Ananya Sharma", detail: "Homework Submitted", status: "Submitted", color: "#3b82f6" },
                  { name: "Rohan Verma", detail: "Bus Boarded 07:45 AM", status: "On Bus", color: "#8b5cf6" },
                  { name: "Sia Vance", detail: "Fee Receipt Downloaded", status: "Paid", color: "#06b6d4" }
                ].map((row, idx) => (
                  <div key={idx} style={{ background: "#ffffff", padding: "0.45rem", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.58rem" }}>{row.name}</div>
                      <div style={{ color: "#64748b", fontSize: "0.5rem" }}>{row.detail}</div>
                    </div>
                    <span style={{ background: "#eff6ff", color: row.color, padding: "0.1rem 0.3rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.48rem" }}>{row.status}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Nav Bar */}
              <div style={{ background: "#ffffff", padding: "0.4rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-around", color: "#64748b", fontSize: "0.6rem" }}>
                <span>🏠</span><span>📋</span><span style={{ color: "#4338ca", fontWeight: 800 }}>➕</span><span>💬</span><span>👤</span>
              </div>
            </div>
          </div>

          {/* Phone 2: Center Phone (Main Dashboard - Slightly Larger & Highlighted) */}
          <div style={{
            width: "290px",
            background: "#0f172a",
            borderRadius: "42px",
            padding: "12px",
            boxShadow: "0 30px 70px rgba(67, 56, 202, 0.3)",
            border: "3.5px solid #334155",
            transform: "scale(1.04)",
            zIndex: 2
          }}>
            {/* Dynamic Island */}
            <div style={{ width: "80px", height: "16px", background: "#000000", borderRadius: "99px", margin: "0 auto 12px auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1e293b" }}></div>
            </div>
            <div style={{
              background: "#ffffff",
              borderRadius: "30px",
              padding: "1rem",
              height: "490px",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              fontSize: "0.68rem"
            }}>
              {/* Parent Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #4338ca, #3b82f6)", color: "#fff", fontWeight: 800, fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center" }}>A</div>
                  <div>
                    <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.72rem" }}>Ananya Sharma</div>
                    <div style={{ color: "#64748b", fontSize: "0.55rem" }}>Parent Account • Verified</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.3rem" }}>
                  <span style={{ background: "#f1f5f9", padding: "0.2rem 0.4rem", borderRadius: "6px" }}>🔔</span>
                </div>
              </div>

              {/* Search Bar */}
              <div style={{ background: "#f1f5f9", padding: "0.45rem 0.7rem", borderRadius: "10px", color: "#94a3b8", fontSize: "0.58rem" }}>
                🔍 Search fees, exams, bus tracking...
              </div>

              {/* Quick Modules */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.4rem", textAlign: "center" }}>
                {[
                  { name: "Campus", color: "#eff6ff", icon: "🏫" },
                  { name: "Attendance", color: "#ecfdf5", icon: "📅" },
                  { name: "Bus Track", color: "#f5f3ff", icon: "🚌" },
                  { name: "Report Card", color: "#fff7ed", icon: "📑" }
                ].map((m, i) => (
                  <div key={i} style={{ background: m.color, padding: "0.5rem 0.2rem", borderRadius: "10px" }}>
                    <div style={{ fontSize: "0.9rem" }}>{m.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.5rem", color: "#334155", marginTop: "0.2rem" }}>{m.name}</div>
                  </div>
                ))}
              </div>

              {/* Notification Updates Feed */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.68rem", color: "#0f172a" }}>School Updates</span>
                  <span style={{ fontSize: "0.52rem", color: "#3b82f6", fontWeight: 700 }}>View All</span>
                </div>

                {[
                  { name: "Fee Payment Success", time: "₹5,250 Paid • Today", status: "Receipt #4021" },
                  { name: "Bus #12 En Route", time: "ETA 8 mins to Stop", status: "Live GPS" },
                  { name: "Physics Assignment", time: "Due tomorrow 10:00 AM", status: "Homework" }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: "#f8fafc", padding: "0.5rem", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.6rem" }}>{item.name}</div>
                      <div style={{ color: "#64748b", fontSize: "0.52rem" }}>{item.time}</div>
                    </div>
                    <span style={{ background: "#4338ca", color: "#ffffff", padding: "0.15rem 0.35rem", borderRadius: "5px", fontWeight: 700, fontSize: "0.48rem" }}>{item.status}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Nav Bar with Floating Action Button */}
              <div style={{ background: "#ffffff", padding: "0.5rem", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-around", alignItems: "center", color: "#64748b" }}>
                <span>🏠</span>
                <span>🛡️</span>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #4338ca, #3b82f6)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem", boxShadow: "0 4px 10px rgba(67, 56, 202, 0.4)" }}>+</div>
                <span>💬</span>
                <span>📍</span>
              </div>
            </div>
          </div>

          {/* Phone 3: Right Phone (Fee Payment & Teacher Connect) */}
          <div style={{
            width: "260px",
            background: "#0f172a",
            borderRadius: "36px",
            padding: "10px",
            boxShadow: "0 25px 50px rgba(15, 23, 42, 0.22)",
            border: "3px solid #334155"
          }}>
            {/* Phone Notch */}
            <div style={{ width: "60px", height: "12px", background: "#1e293b", borderRadius: "99px", margin: "0 auto 10px auto" }}></div>
            <div style={{
              background: "#f8fafc",
              borderRadius: "26px",
              padding: "0.8rem",
              height: "440px",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              fontSize: "0.62rem"
            }}>
              {/* Header Title */}
              <div style={{ fontWeight: 800, fontSize: "0.75rem", color: "#0f172a" }}>Fee Portal</div>

              {/* Fee Cards */}
              <div style={{ background: "#ffffff", padding: "0.7rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <div style={{ fontSize: "0.58rem", color: "#64748b" }}>Q3 Tuition &amp; Bus Transport Fee</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>₹5,250.00</div>
                <div style={{ fontSize: "0.52rem", color: "#ef4444", fontWeight: 700 }}>Due by 15th Aug 2026</div>
                <button style={{ background: "linear-gradient(135deg, #4338ca, #3b82f6)", color: "#fff", border: "none", padding: "0.45rem", borderRadius: "8px", fontWeight: 800, fontSize: "0.6rem", cursor: "pointer" }}>
                  Pay Fee Now
                </button>
              </div>

              {/* Quick Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: "0.65rem", color: "#0f172a" }}>Quick Downloads</div>
                {[
                  { name: "Fee Receipt #2026-03", type: "PDF Download" },
                  { name: "Bus Transport Pass", type: "Digital Pass" },
                  { name: "Q2 Exam Marksheet", type: "Verified PDF" }
                ].map((doc, idx) => (
                  <div key={idx} style={{ background: "#ffffff", padding: "0.45rem", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.58rem" }}>{doc.name}</div>
                      <div style={{ color: "#64748b", fontSize: "0.5rem" }}>{doc.type}</div>
                    </div>
                    <span style={{ color: "#3b82f6", fontWeight: 800, fontSize: "0.6rem" }}>📥</span>
                  </div>
                ))}
              </div>

              {/* Bottom Nav Bar */}
              <div style={{ background: "#ffffff", padding: "0.4rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-around", color: "#64748b", fontSize: "0.6rem" }}>
                <span>🏠</span><span>📋</span><span style={{ color: "#4338ca", fontWeight: 800 }}>➕</span><span>💬</span><span>👤</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TEACHER & DRIVER APP SHOWCASE SECTION ========== */}
      <section style={{ padding: "90px 4%", background: "var(--bg-page)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 4rem auto" }}>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            Teacher &amp; <span style={{ color: "#f97316" }}>Driver App</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, marginTop: "0.8rem" }}>
            Specialized mobile apps designed for educators, school staff, and transport personnel.
          </p>
        </div>

        {/* 3 App Cards Grid Layout */}
        <div className="teacher-driver-apps-grid" style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem"
        }}>
          {/* Card 1: Parent App */}
          <div className="app-card-item" style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            padding: "2.2rem 2rem",
            border: "1px solid var(--border-color)",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
            <div>
              <div style={{
                width: 54,
                height: 54,
                borderRadius: "16px",
                background: "var(--bg-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem"
              }}>
                <Smartphone size={26} color="#4338ca" />
              </div>

              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.6rem" }}>
                Parent Mobile App
              </h3>

              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.8rem" }}>
                Seamless engagement app for parents with instant bus alerts, digital diary, online fee payments, and direct teacher messaging.
              </p>
            </div>

            {/* Testimonial Footer */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.2rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #4338ca, #3b82f6)", color: "#fff", fontWeight: 800, fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center" }}>S</div>
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--text-main)" }}>Sunita Sharma</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Parent &amp; Educator</div>
              </div>
            </div>
          </div>

          {/* Card 2: Teacher & Driver App */}
          <div className="app-card-item" style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            padding: "2.2rem 2rem",
            border: "1px solid var(--border-color)",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
            <div>
              <div style={{
                width: 54,
                height: 54,
                borderRadius: "16px",
                background: "var(--bg-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem"
              }}>
                <GraduationCap size={26} color="#2563eb" />
              </div>

              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.6rem" }}>
                Teacher &amp; Staff App
              </h3>

              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.8rem" }}>
                Empower teachers with 1-tap attendance marking, digital homework publishing, exam mark entries, and instant classroom notifications.
              </p>
            </div>

            {/* Testimonial Footer */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.2rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #059669, #10b981)", color: "#fff", fontWeight: 800, fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center" }}>A</div>
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--text-main)" }}>Anish Verma</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Senior Academic Teacher</div>
              </div>
            </div>
          </div>

          {/* Card 3: Driver & Transport App */}
          <div className="app-card-item" style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            padding: "2.2rem 2rem",
            border: "1px solid var(--border-color)",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
            <div>
              <div style={{
                width: 54,
                height: 54,
                borderRadius: "16px",
                background: "var(--bg-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem"
              }}>
                <Bus size={26} color="#10b981" />
              </div>

              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.6rem" }}>
                Driver &amp; Transport App
              </h3>

              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.8rem" }}>
                Dedicated driver app with automatic GPS location streaming, RFID student boarding scans, route navigation, and emergency SOS alerts.
              </p>
            </div>

            {/* Testimonial Footer */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.2rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #d97706, #f59e0b)", color: "#fff", fontWeight: 800, fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center" }}>R</div>
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--text-main)" }}>Rohan Ganesh</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Transport Coordinator</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION WITH 3D ILLUSTRATION ========== */}
      <section id="faq" style={{ padding: "90px 4%", background: "var(--bg-page)", borderTop: "1px solid var(--border-color)" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem auto" }}>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            F<span style={{ color: "#f97316" }}>AQ</span>
          </h2>
        </div>

        {/* 2-Column Container: Left 3D Image Illustration + Right Accordions */}
        <div className="faq-container-grid" style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.25fr",
          gap: "3.5rem",
          alignItems: "center"
        }}>
          {/* Left Column: 3D Support Illustration Card */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            {/* Ambient Background Glow */}
            <div style={{
              position: "absolute",
              inset: "-15px",
              background: "linear-gradient(135deg, rgba(67, 56, 202, 0.2) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(139, 92, 246, 0.2) 100%)",
              borderRadius: "32px",
              filter: "blur(24px)",
              zIndex: 0
            }}></div>

            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "480px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/faq-illustration.png"
                alt="SchoolMitra Help Desk & Support Illustration"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right Column: Accordions List Container */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              {
                q: "What is SchoolMitra ERP and how does it work?",
                a: "SchoolMitra is a comprehensive, cloud-based School ERP platform designed to automate student admissions, attendance, online fee collection, examination report cards, and parent communications from a unified dashboard."
              },
              {
                q: "How does real-time GPS bus tracking function?",
                a: "GPS trackers fitted in school buses stream real-time location coordinates directly to the parent mobile app and admin dashboard. Parents receive automated SMS and app alerts when the bus is approaching their designated stop."
              },
              {
                q: "How many questions arise during onboarding?",
                a: "Our dedicated onboarding specialist assists your team throughout setup. Onboarding takes under 48 hours with automated CSV roster imports and hands-on staff training."
              },
              {
                q: "How do parents receive fee reminders and notifications?",
                a: "SchoolMitra sends automated WhatsApp, SMS, and push notifications to parents with direct payment gateway links, allowing 1-click fee settlements with instant PDF receipt downloads."
              },
              {
                q: "Is student data secure and compliant with data privacy standards?",
                a: "Yes, SchoolMitra uses enterprise-grade SSL encryption, role-based access control, daily cloud backups, and strictly adheres to data protection and privacy compliance guidelines."
              },
              {
                q: "Can multiple branches or schools be managed from a single admin account?",
                a: "Absolutely! SchoolMitra Super Admin dashboard supports multi-branch management, allowing group institutions to monitor cross-campus attendance, fee collections, and staff reports from one central portal."
              }
            ].map((item, idx) => (
              <div key={idx} className="faq-card-item" style={{ borderBottom: "1px solid var(--border-color)", margin: "0.2rem 0" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  style={{
                    width: "100%",
                    padding: "1.3rem 0.5rem",
                    background: "transparent",
                    border: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--text-main)",
                    fontWeight: 700,
                    fontSize: "1.15rem"
                  }}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={20}
                    color="var(--text-muted)"
                    style={{
                      transform: openFaq === idx ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease"
                    }}
                  />
                </button>

                {openFaq === idx && (
                  <div style={{
                    padding: "0 0.5rem 1.5rem 0.5rem",
                    color: "var(--text-muted)",
                    fontSize: "0.98rem",
                    lineHeight: 1.65
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA BANNER SECTION ========== */}
      <section style={{ padding: "60px 4% 90px 4%", background: "var(--bg-page)" }}>
        <div className="cta-banner-container" style={{
          maxWidth: "1150px",
          margin: "0 auto",
          background: "linear-gradient(135deg, rgba(238, 242, 255, 0.95) 0%, rgba(224, 231, 255, 0.85) 50%, rgba(243, 232, 255, 0.9) 100%)",
          borderRadius: "28px",
          padding: "4.5rem 2rem",
          textAlign: "center",
          border: "1px solid rgba(199, 210, 254, 0.6)",
          boxShadow: "0 20px 50px rgba(99, 102, 241, 0.12)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Subtle Sparkle Shapes */}
          <div style={{
            position: "absolute",
            bottom: "-30px",
            right: "15%",
            width: "120px",
            height: "120px",
            opacity: 0.15,
            border: "2px dashed #4338ca",
            transform: "rotate(45deg)",
            pointerEvents: "none"
          }}></div>

          <span style={{
            fontSize: "0.9rem",
            fontWeight: 800,
            color: "#4338ca",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.8rem",
            display: "block"
          }}>
            Final CTA banner
          </span>

          <h2 style={{
            fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
            fontWeight: 800,
            color: "var(--text-main)",
            letterSpacing: "-0.03em",
            marginBottom: "1.2rem",
            lineHeight: 1.2
          }}>
            Elevate Your School&apos;s <span style={{ color: "#f97316" }}>Experience Today</span>
          </h2>

          <p style={{
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            maxWidth: "600px",
            margin: "0 auto 2.5rem auto",
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            Elevate your school&apos;s experience today with real-time bus tracking, automated fee collection, and seamless parent engagement.
          </p>

          <Link href="/login" className="btn-interactive-glow" style={{
            padding: "0.95rem 2.5rem",
            borderRadius: "14px",
            background: "#4338ca",
            color: "#ffffff",
            border: "none",
            fontWeight: 800,
            fontSize: "1.05rem",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(67, 56, 202, 0.35)",
            transition: "transform 0.2s ease",
            textDecoration: "none",
            display: "inline-block"
          }}>
            Signup Now
          </Link>
        </div>
      </section>

      {/* ========== SUPER PREMIUM FOOTER ========== */}
      <Footer />

      {/* Registration / Demo Modal */}
      {modalOpen && <SchoolRegistrationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
