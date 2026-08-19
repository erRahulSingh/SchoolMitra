"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search, BookOpen, FileText, Newspaper, Award, Video,
  LifeBuoy, Code, Monitor, Sparkles, ArrowRight, X,
  CheckCircle2, Download, Clock, GraduationCap,
  Bus, Smartphone, Compass, Shield, Zap, Calendar, Users, Eye, Check
} from "lucide-react";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/* ── Category filter data with vibrant themes ── */
const CATEGORIES = [
  { id: "all",             label: "All Resources",    icon: BookOpen,   grad: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#4f46e5", bg: "rgba(79,70,229,0.08)",   border: "rgba(79,70,229,0.25)" },
  { id: "guides",          label: "Guides & SOPs",    icon: FileText,   grad: "linear-gradient(135deg, #d97706, #f59e0b)", color: "#d97706", bg: "rgba(217,119,6,0.08)",   border: "rgba(217,119,6,0.25)" },
  { id: "blog",            label: "EdTech Blog",      icon: Newspaper,  grad: "linear-gradient(135deg, #059669, #10b981)", color: "#059669", bg: "rgba(5,150,105,0.08)",  border: "rgba(5,150,105,0.25)" },
  { id: "case-studies",    label: "Case Studies",     icon: Award,      grad: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.25)"},
  { id: "video-tutorials", label: "Video Tutorials", icon: Video,      grad: "linear-gradient(135deg, #e11d48, #fb7185)", color: "#e11d48", bg: "rgba(225,29,72,0.08)",  border: "rgba(225,29,72,0.25)" },
  { id: "help-center",     label: "Help Center",      icon: LifeBuoy,   grad: "linear-gradient(135deg, #0891b2, #06b6d4)", color: "#0891b2", bg: "rgba(8,145,178,0.08)",  border: "rgba(8,145,178,0.25)" },
  { id: "api-docs",        label: "API Docs",         icon: Code,       grad: "linear-gradient(135deg, #6366f1, #818cf8)", color: "#6366f1", bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.25)" },
  { id: "webinars",        label: "Webinars",         icon: Monitor,    grad: "linear-gradient(135deg, #0284c7, #38bdf8)", color: "#0284c7", bg: "rgba(2,132,199,0.08)",  border: "rgba(2,132,199,0.25)" },
  { id: "updates",         label: "Release Notes",    icon: Sparkles,   grad: "linear-gradient(135deg, #db2777, #ec4899)", color: "#db2777", bg: "rgba(219,39,119,0.08)", border: "rgba(219,39,119,0.25)" },
];

/* ── Featured Resource cards ── */
const FEATURED_RESOURCES = [
  {
    id: "f1",
    type: "Guide & SOP",
    tagClass: "guide",
    categoryId: "guides",
    title: "School ERP Implementation Blueprint 2026",
    desc: "A step-by-step masterplan to digitize school operations from day one without downtime.",
    btn: "Read Complete Guide",
    image: "/images/resources/card-erp.png",
    readTime: "8 min read",
    author: "Rahul Sharma, Principal Architect",
    date: "July 24, 2026",
    grad: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    tagBg: "rgba(79, 70, 229, 0.12)",
    tagColor: "#4f46e5",
    summary: [
      "Assessing current paper workflows and identifying bottlenecks in fee & attendance collection.",
      "Data migration blueprint for student records, staff directories, and fee logs with zero loss.",
      "Staff onboarding schedule with hands-on module-by-module training plans.",
      "Parent engagement strategies for 98%+ mobile app adoption rate across all grades.",
    ],
  },
  {
    id: "f2",
    type: "EdTech Insights",
    tagClass: "blog",
    categoryId: "blog",
    title: "Why 500+ Indian Schools Switch to Unified ERP",
    desc: "How integrated ERP, GPS bus telematics, and digital report cards modernize campuses.",
    btn: "Read In-Depth Article",
    image: "/images/resources/card-school.png",
    readTime: "5 min read",
    author: "Dr. Ananya Roy, Consultant",
    date: "July 20, 2026",
    grad: "linear-gradient(135deg, #059669, #10b981)",
    tagBg: "rgba(5, 150, 105, 0.12)",
    tagColor: "#059669",
    summary: [
      "Eliminating fragmented software tools (separate attendance, transport, fee systems).",
      "Unified student 360-degree profiles accessible securely to administrators and parents.",
      "Automated WhatsApp & Push notifications reducing missed fee payments by 85%.",
      "Real-time GPS tracking integration providing total safety for school transport.",
    ],
  },
  {
    id: "f3",
    type: "Case Study",
    tagClass: "case-study",
    categoryId: "case-studies",
    title: "Success Story: Sunshine International School",
    desc: "How a 3,500-student campus cut admin workload by 40% and reached 99.4% fee recovery.",
    btn: "View Full Case Study",
    image: "/images/resources/card-success.png",
    readTime: "6 min read",
    author: "SchoolMitra Research Team",
    date: "July 18, 2026",
    grad: "linear-gradient(135deg, #d97706, #f59e0b)",
    tagBg: "rgba(217, 119, 6, 0.12)",
    tagColor: "#d97706",
    summary: [
      "3,500+ students digitized across K-12 campus within 14 business days.",
      "Fee collection efficiency improved from 65% to 99.4% with automated digital receipts.",
      "Zero bus delay complaints after introducing live GPS parent tracking alerts.",
      "Teacher administrative paperwork reduced by 4.5 hours per week.",
    ],
  },
];

const MORE_RESOURCES = [
  {
    id: "r4", type: "API Docs", tagClass: "guide", categoryId: "api-docs",
    title: "Biometric & RFID Attendance REST API Documentation",
    desc: "Connect biometric hardware terminals directly with SchoolMitra via secure webhooks.",
    btn: "Explore API Docs", readTime: "12 min read",
    grad: "linear-gradient(135deg, #6366f1, #818cf8)",
    tagBg: "rgba(99, 102, 241, 0.12)", tagColor: "#4f46e5",
    summary: ["Webhook payloads for real-time attendance punching.", "OAuth 2.0 authentication endpoints and API security keys.", "SDKs available for Node.js, Python, Java, and C# integrations."],
  },
  {
    id: "r5", type: "Video Tutorial", tagClass: "blog", categoryId: "video-tutorials",
    title: "10-Minute School Bus Fleet Setup & GPS Pairing",
    desc: "Watch how to add buses, assign drivers, calibrate geofences, and launch parent tracking.",
    btn: "Watch Video Tutorial", readTime: "10 min video",
    grad: "linear-gradient(135deg, #e11d48, #fb7185)",
    tagBg: "rgba(225, 29, 72, 0.12)", tagColor: "#e11d48",
    summary: ["Step 1: Registering hardware GPS IMEI numbers in Admin Portal.", "Step 2: Defining bus routes, pickup points, and speed alert thresholds.", "Step 3: Pairing driver smartphone app for emergency broadcast alerts."],
  },
  {
    id: "r6", type: "Help Center", tagClass: "case-study", categoryId: "help-center",
    title: "Parent App Troubleshooting & Login Master FAQ",
    desc: "Step-by-step solutions for parents joining the SchoolMitra mobile application.",
    btn: "Open Knowledge Base", readTime: "4 min read",
    grad: "linear-gradient(135deg, #0891b2, #06b6d4)",
    tagBg: "rgba(8, 145, 178, 0.12)", tagColor: "#0891b2",
    summary: ["How to reset forgotten Parent App password or change registered phone number.", "Enabling push notifications for homework and fee reminder alerts.", "Linking multiple siblings under a single parent account."],
  },
  {
    id: "r7", type: "Webinar", tagClass: "guide", categoryId: "webinars",
    title: "Webinar: Future of Digital School Administration",
    desc: "Leading educationists share strategies on AI reporting, automated grading, and parent trust.",
    btn: "Watch Full Recording", readTime: "45 min watch",
    grad: "linear-gradient(135deg, #0284c7, #38bdf8)",
    tagBg: "rgba(2, 132, 199, 0.12)", tagColor: "#0284c7",
    summary: ["Keynote speeches from top school principals and tech innovators.", "Predictive student performance analytics overview.", "Q&A session covering cyber security and data privacy standards."],
  },
  {
    id: "r8", type: "Release Notes", tagClass: "blog", categoryId: "updates",
    title: "SchoolMitra v4.2 Release: AI Report Cards & Alerts",
    desc: "Discover all new features shipped in our major mid-year system upgrade.",
    btn: "Read Release Notes", readTime: "3 min read",
    grad: "linear-gradient(135deg, #db2777, #ec4899)",
    tagBg: "rgba(219, 39, 119, 0.12)", tagColor: "#db2777",
    summary: ["Customizable report card templates with CBSE & ICSE grading scales.", "Direct WhatsApp Business API gateway integration.", "Enhanced driver speed tracking and brake event diagnostics."],
  },
];

const ALL = [...FEATURED_RESOURCES, ...MORE_RESOURCES];

export default function ResourcesPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");
  const [reader, setReader] = useState<(typeof ALL)[0] | null>(null);

  /* Filter logic */
  const filtered = ALL.filter((r) => {
    const cat = selectedCat === "all" || r.categoryId === selectedCat;
    const q  = search.trim() === "" || r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
    return cat && q;
  });

  const featured = filtered.slice(0, 3);

  return (
    <div style={{
      background: "var(--bg-page)",
      minHeight: "100vh",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      overflowX: "hidden",
      WebkitFontSmoothing: "antialiased"
    }}>

      {/* ═══════════ NAVBAR ═══════════ */}
      <Navbar />

      {/* ═══════════ HERO SECTION (COMPACT & SLEEK) ═══════════ */}
      <section className="resources-hero-section" style={{
        position: "relative",
        paddingTop: 110,
        paddingBottom: 35,
        paddingLeft: "5%",
        paddingRight: "5%",
        overflow: "hidden"
      }}>
        {/* Animated Orbs */}
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

        <div className="resources-hero-grid" style={{
          maxWidth: 1240,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "2.8rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1
        }}>
          {/* Left Copy */}
          <div>
            <div className="shimmer-badge" style={{ marginBottom: "1rem", padding: "0.3rem 0.85rem" }}>
              <BookOpen size={14} color="#8b5cf6" />
              <span className="gradient-text-vibrant" style={{ fontWeight: 600, fontSize: "0.82rem" }}>Free EdTech Knowledge Base &amp; Growth Hub</span>
              <span style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 700,
                padding: "0.12rem 0.45rem",
                borderRadius: "99px"
              }}>
                500+ RESOURCES
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2.1rem, 3.4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: "-0.025em",
              marginBottom: "1rem",
              color: "var(--text-main)"
            }}>
              Learning Center for <span className="gradient-text-sunset">Modern Schools</span>
            </h1>

            <p style={{
              fontSize: "1.02rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: 500,
              marginBottom: "1.8rem",
              fontWeight: 400
            }}>
              Access expert-written guides, CBSE/ICSE compliance templates, video tutorials, and ERP case studies to help Indian schools excel.
            </p>

            <div style={{ display: "flex", gap: "0.85rem", alignItems: "center", flexWrap: "wrap" }}>
              <a
                href="#publications"
                className="btn-vibrant-gradient"
                style={{
                  padding: "0.85rem 1.8rem",
                  borderRadius: 12,
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <Compass size={16} /> Explore Knowledge Base
              </a>

              <Link
                href="/contact"
                className="btn-colorful-outline"
                style={{
                  padding: "0.85rem 1.5rem",
                  borderRadius: 12,
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                Request Custom Toolkit
              </Link>
            </div>
          </div>

          {/* Right: 3D Illustration Showcase */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div style={{
              position: "absolute",
              inset: "-15px",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(236, 72, 153, 0.2) 50%, rgba(6, 182, 212, 0.2) 100%)",
              borderRadius: "28px",
              filter: "blur(24px)",
              zIndex: 0
            }} />

            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 440,
              borderRadius: "20px",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.35)",
              boxShadow: "0 20px 50px -10px rgba(67, 56, 202, 0.25)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/resources/hero-3d.png"
                alt="Learning center 3D illustration"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>

            {/* Floating Badge */}
            <div className="anim-float-badge-1" style={{
              position: "absolute",
              top: "-12px",
              right: "-12px",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              borderRadius: "12px",
              padding: "0.55rem 0.9rem",
              boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              zIndex: 3
            }}>
              <Sparkles size={16} />
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700 }}>50+ Free Toolkits</div>
                <div style={{ fontSize: "0.62rem", opacity: 0.9 }}>Updated for 2026 Session</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ HERO HIGHLIGHTS STRIP (JUST BELOW HERO) ═══════════ */}
      <section style={{ padding: "10px 5% 25px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2.5rem",
          flexWrap: "wrap",
          padding: "1rem 2rem",
          borderRadius: "16px",
          background: "var(--bg-card)",
          border: "1.5px solid var(--border-color)",
          boxShadow: "0 4px 15px rgba(15, 23, 42, 0.02)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.92rem", fontWeight: 600, color: "var(--text-main)" }}>
            <CheckCircle2 size={18} color="#10b981" /> 100% Free Guides
          </div>
          <div style={{ width: "1px", height: "18px", background: "var(--border-color)" }} className="hide-mobile" />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.92rem", fontWeight: 600, color: "var(--text-main)" }}>
            <CheckCircle2 size={18} color="#06b6d4" /> CBSE &amp; ICSE Templates
          </div>
          <div style={{ width: "1px", height: "18px", background: "var(--border-color)" }} className="hide-mobile" />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.92rem", fontWeight: 600, color: "var(--text-main)" }}>
            <CheckCircle2 size={18} color="#8b5cf6" /> Video Walkthroughs
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORY FILTER ROW ═══════════ */}
      <section style={{ padding: "0 5% 30px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.5rem",
          scrollbarWidth: "none"
        }}>
          {CATEGORIES.map(cat => {
            const active = selectedCat === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "10px",
                  border: active ? "none" : "1.5px solid var(--border-color)",
                  background: active ? cat.grad : "var(--bg-card)",
                  color: active ? "#ffffff" : "var(--text-main)",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: active ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                <Icon size={15} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ═══════════ FEATURED PUBLICATIONS & SOPS (WITH SEARCH BAR) ═══════════ */}
      <section id="publications" style={{ padding: "0 5% 50px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.8rem", gap: "1.5rem", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
              Featured <span className="gradient-text-sunset">Publications &amp; SOPs</span>
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.2rem", fontWeight: 400 }}>
              Curated masterplans designed by top education consultants.
            </p>
          </div>

          {/* Search Box in Featured Section Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            background: "var(--bg-card)",
            border: "1.5px solid var(--border-color)",
            borderRadius: 12,
            padding: "0.4rem 0.9rem",
            width: "100%",
            maxWidth: 320,
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
          }}>
            <Search size={16} color="#6366f1" style={{ flexShrink: 0, marginRight: "0.5rem" }} />
            <input
              type="text"
              placeholder="Search publications &amp; SOPs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "0.85rem",
                color: "var(--text-main)",
                fontFamily: "inherit",
                fontWeight: 500
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  padding: 0,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.8rem"
        }}>
          {featured.map(item => (
            <div
              key={item.id}
              className="colorful-card"
              onClick={() => setReader(item)}
              style={{
                background: "var(--bg-card)",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                "--card-top-gradient": item.grad,
                "--card-glow-color": "rgba(99, 102, 241, 0.12)"
              } as React.CSSProperties}
            >
              <div>
                {/* Card Header Image */}
                <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: item.tagBg,
                    color: item.tagColor,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "6px",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${item.tagColor}35`
                  }}>
                    {item.type}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: "1.3rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                    <Clock size={13} /> {item.readTime} • {item.date}
                  </div>

                  <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.45rem", lineHeight: 1.35 }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, fontWeight: 400 }}>
                    {item.desc}
                  </p>
                </div>
              </div>

              <div style={{ padding: "0 1.3rem 1.3rem 1.3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: item.tagColor, display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  {item.btn} <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ MORE RESOURCES GRID ═══════════ */}
      <section style={{ padding: "0 5% 50px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            More Guides, <span className="gradient-text-sunset">Tutorials &amp; APIs</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.4rem"
        }}>
          {MORE_RESOURCES.map(item => (
            <div
              key={item.id}
              className="colorful-card"
              onClick={() => setReader(item)}
              style={{
                background: "var(--bg-card)",
                borderRadius: "16px",
                padding: "1.4rem",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                "--card-top-gradient": item.grad,
                "--card-glow-color": "rgba(99, 102, 241, 0.1)"
              } as React.CSSProperties}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{
                    background: item.tagBg,
                    color: item.tagColor,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.18rem 0.55rem",
                    borderRadius: "6px"
                  }}>
                    {item.type}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{item.readTime}</span>
                </div>

                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.4rem", lineHeight: 1.35 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5, fontWeight: 400, marginBottom: "1rem" }}>
                  {item.desc}
                </p>
              </div>

              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: item.tagColor, display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                {item.btn} <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ DOWNLOAD CENTER / TOOLKITS ═══════════ */}
      <section style={{ padding: "30px 5% 60px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{
          background: "var(--bg-card)",
          borderRadius: "22px",
          padding: "2.4rem",
          border: "1.5px solid var(--border-color)",
          boxShadow: "0 6px 25px rgba(15, 23, 42, 0.03)"
        }}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 2rem auto" }}>
            <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
              <Download size={12} color="#059669" /> INSTANT DOWNLOADS
            </span>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
              Download Free School <span className="gradient-text-sunset">Admin Toolkits</span>
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.3rem", fontWeight: 400 }}>
              Ready-to-use checklists and spreadsheet templates for your school office.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.4rem" }}>
            {[
              {
                title: "School ERP Migration Checklist 2026",
                desc: "Complete 40-point verification checklist before rolling out new software.",
                fileSize: "PDF • 2.4 MB",
                color: "#4f46e5"
              },
              {
                title: "Bus Route Safety & Driver SOP Template",
                desc: "Comprehensive safety policy draft with driver emergency contact protocols.",
                fileSize: "DOCX • 1.8 MB",
                color: "#0284c7"
              },
              {
                title: "Parent WhatsApp Circulars Script Kit",
                desc: "50+ pre-approved copy-paste WhatsApp templates for fee dues & school closures.",
                fileSize: "PDF • 1.2 MB",
                color: "#059669"
              }
            ].map((kit, kIdx) => (
              <div
                key={kIdx}
                style={{
                  background: "var(--bg-subtle)",
                  borderRadius: "14px",
                  padding: "1.4rem",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ width: 36, height: 36, borderRadius: "10px", background: `${kit.color}15`, color: kit.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.85rem" }}>
                    <Download size={18} />
                  </div>
                  <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.35rem" }}>{kit.title}</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5, fontWeight: 400, marginBottom: "1rem" }}>{kit.desc}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>{kit.fileSize}</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: kit.color, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                    Download <Download size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COSMIC CTA BANNER ═══════════ */}
      <section style={{ padding: "0 5% 70px", maxWidth: 1240, margin: "0 auto" }}>
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
              <Sparkles size={12} color="#ec4899" /> JOIN 500+ MODERN SCHOOLS
            </span>

            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              marginBottom: "0.85rem",
              lineHeight: 1.2
            }}>
              Ready to Upgrade Your <span className="gradient-text-sunset">School Operations?</span>
            </h2>

            <p style={{
              fontSize: "0.98rem",
              color: "#cbd5e1",
              fontWeight: 400,
              marginBottom: "1.8rem",
              maxWidth: 500,
              lineHeight: 1.55
            }}>
              Join 500+ top Indian schools running smarter admissions, live bus safety, and automated fee collections with SchoolMitra.
            </p>

            <Link
              href="/contact"
              className="btn-vibrant-gradient"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.85rem 2.2rem",
                borderRadius: "14px",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              <Zap size={17} /> Schedule Campus Demo
            </Link>
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
                alt="SchoolMitra Modern Campus"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ READER MODAL ═══════════ */}
      {reader && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "1rem"
        }}>
          <div style={{
            background: "var(--bg-card)",
            borderRadius: "20px",
            maxWidth: 600,
            width: "100%",
            padding: "2rem",
            border: "1.5px solid var(--border-color)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            position: "relative"
          }}>
            <button
              onClick={() => setReader(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "var(--bg-subtle)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <X size={18} />
            </button>

            <span style={{
              background: reader.tagBg,
              color: reader.tagColor,
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "0.2rem 0.6rem",
              borderRadius: "6px",
              display: "inline-block",
              marginBottom: "0.75rem"
            }}>
              {reader.type}
            </span>

            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
              {reader.title}
            </h3>

            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.2rem", fontWeight: 400 }}>
              {reader.desc}
            </p>

            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginBottom: "1.4rem" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.6rem" }}>
                Key Summary Points:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {reader.summary.map((pt, pIdx) => (
                  <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.84rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setReader(null)}
              className="btn-vibrant-gradient"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: 600
              }}
            >
              Close Reader
            </button>
          </div>
        </div>
      )}

      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />
    </div>
  );
}
