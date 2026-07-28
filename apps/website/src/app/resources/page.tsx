"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, BookOpen, FileText, Newspaper, Award, Video,
  LifeBuoy, Code, Monitor, Sparkles, ArrowRight, X,
  CheckCircle2, Download, Clock, GraduationCap,
  ChevronDown, Sun, Moon, Bus, Smartphone
} from "lucide-react";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

/* ── Category filter data ── */
const CATEGORIES = [
  { id: "all",              label: "All",              icon: BookOpen,  color: "#4338ca", bg: "rgba(67,56,202,0.08)"  },
  { id: "guides",           label: "Guides",           icon: FileText,  color: "#d97706", bg: "rgba(217,119,6,0.08)" },
  { id: "blog",             label: "Blog",             icon: Newspaper, color: "#059669", bg: "rgba(5,150,105,0.08)" },
  { id: "case-studies",     label: "Case Studies",     icon: Award,     color: "#7c3aed", bg: "rgba(124,58,237,0.08)"},
  { id: "video-tutorials",  label: "Video Tutorials",  icon: Video,     color: "#e11d48", bg: "rgba(225,29,72,0.08)" },
  { id: "help-center",      label: "Help Center",      icon: LifeBuoy,  color: "#0891b2", bg: "rgba(8,145,178,0.08)" },
  { id: "api-docs",         label: "API Docs",         icon: Code,      color: "#4f46e5", bg: "rgba(79,70,229,0.08)" },
  { id: "webinars",         label: "Webinars",         icon: Monitor,   color: "#2563eb", bg: "rgba(37,99,235,0.08)" },
  { id: "updates",          label: "Updates",          icon: Sparkles,  color: "#0284c7", bg: "rgba(2,132,199,0.08)" },
];

/* ── Resource cards ── */
const FEATURED_RESOURCES = [
  {
    id: "f1",
    type: "Guide",
    tagClass: "guide",
    categoryId: "guides",
    title: "Complete School ERP Implementation Guide 2026",
    desc: "Step-by-step guide to digitize your school operations from day one.",
    btn: "Read Guide",
    image: "/images/resources/card-erp.png",
    readTime: "8 min read",
    author: "Rahul Sharma, Tech Lead",
    date: "July 24, 2026",
    summary: [
      "Assessing current paper workflows and identifying bottleneck processes.",
      "Data migration blueprint for student records, staff directories, and fee logs.",
      "Staff onboarding schedule with module-by-module training plans.",
      "Parent engagement strategies for 98%+ mobile app adoption rate.",
    ],
  },
  {
    id: "f2",
    type: "Blog",
    tagClass: "blog",
    categoryId: "blog",
    title: "Why Smart Schools Are Switching to Integrated Platforms",
    desc: "Discover how technology is transforming education across India.",
    btn: "Read Article",
    image: "/images/resources/card-school.png",
    readTime: "5 min read",
    author: "Dr. Ananya Roy, Education Consultant",
    date: "July 20, 2026",
    summary: [
      "Eliminating fragmented software tools (separate attendance, transport, fee systems).",
      "Unified student 360-degree profiles accessible to administrators and parents.",
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
    desc: "40% less workload  |  100% parent satisfaction",
    btn: "View Case Study",
    image: "/images/resources/card-success.png",
    readTime: "6 min read",
    author: "SchoolMitra Research Team",
    date: "July 18, 2026",
    summary: [
      "3,500+ students digitized across K-12 campus within 14 business days.",
      "Fee collection efficiency improved from 65% to 99.4% with automated receipts.",
      "Zero bus delay complaints after introducing live GPS parent tracking alerts.",
      "Teacher administrative workload reduced by 4.5 hours per week.",
    ],
  },
];

const MORE_RESOURCES = [
  {
    id: "r4", type: "API Docs", tagClass: "guide", categoryId: "api-docs",
    title: "Biometric & RFID Attendance REST API Documentation",
    desc: "Connect your hardware attendance terminals directly with SchoolMitra server.",
    btn: "Explore Docs", readTime: "12 min read",
    summary: ["Webhook payloads for real-time attendance punching.", "OAuth 2.0 authentication endpoints and API security keys.", "SDKs available for Node.js, Python, Java, and C# integrations."],
  },
  {
    id: "r5", type: "Video Tutorial", tagClass: "blog", categoryId: "video-tutorials",
    title: "10-Minute School Bus Fleet Setup & GPS Sensor Pairing",
    desc: "Watch how easy it is to add buses, assign drivers, and calibrate geofences.",
    btn: "Watch Video", readTime: "10 min video",
    summary: ["Step 1: Registering hardware GPS IMEI numbers in Admin Portal.", "Step 2: Defining bus routes, pickup points, and speed alert thresholds.", "Step 3: Pairing driver smartphone app for emergency broadcast alerts."],
  },
  {
    id: "r6", type: "Help Center", tagClass: "case-study", categoryId: "help-center",
    title: "Parent App Troubleshooting & Login FAQ",
    desc: "Comprehensive step-by-step solutions for parents joining SchoolMitra.",
    btn: "Get Help", readTime: "4 min read",
    summary: ["How to reset forgotten Parent App password or change registered phone number.", "Enabling push notifications for homework and fee reminder alerts.", "Linking multiple siblings under a single parent account."],
  },
  {
    id: "r7", type: "Webinar", tagClass: "guide", categoryId: "webinars",
    title: "Webinar Recording: Future of Digital School Administration 2027",
    desc: "Industry leaders share strategies on AI reporting and automated grading.",
    btn: "Watch Webinar", readTime: "45 min watch",
    summary: ["Keynote speeches from top school principals and tech innovators.", "Predictive student performance analytics overview.", "Q&A session covering cyber security and data privacy standards."],
  },
  {
    id: "r8", type: "Update", tagClass: "blog", categoryId: "updates",
    title: "SchoolMitra v4.2 Release: AI Report Cards & Auto WhatsApp Alerts",
    desc: "Discover all new features shipped in our major mid-year system upgrade.",
    btn: "Read Release Notes", readTime: "3 min read",
    summary: ["Customizable report card templates with CBSE & ICSE grading scales.", "Direct WhatsApp Business API gateway integration.", "Enhanced driver speed tracking and brake event diagnostics."],
  },
];

const ALL = [...FEATURED_RESOURCES, ...MORE_RESOURCES];

/* ───────────────────────── PAGE COMPONENT ───────────────────────── */

export default function ResourcesPage() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");
  const [reader, setReader] = useState<(typeof ALL)[0] | null>(null);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  /* filter logic */
  const filtered = ALL.filter((r) => {
    const cat = selectedCat === "all" || r.categoryId === selectedCat;
    const q  = search.trim() === "" || r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
    return cat && q;
  });

  const featured = filtered.slice(0, 3);

  return (
    <div style={{ background: "var(--bg-page)", minHeight: "100vh", color: "var(--text-main)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ═══════════ NAVBAR (inline – matching landing page exactly) ═══════════ */}
      <nav className="site-nav">
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#4338ca 0%,#3b82f6 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", boxShadow: "0 4px 14px rgba(67,56,202,.35)", transform: "rotate(-4deg)"
          }}><GraduationCap size={20} /></div>
          <span style={{ fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span style={{ color: "var(--text-main)" }}>School</span>
            <span style={{ color: "#3b82f6" }}>Mitra</span>
          </span>
        </Link>

        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/features" className="nav-link">Features</Link>
          <div className="nav-dropdown">
            <span className="nav-link" style={{ cursor: "pointer" }}>Solutions <ChevronDown size={14} /></span>
            <div className="nav-dropdown-menu">
              <Link href="/school-erp" className="dropdown-item"><FileText size={16} color="#4338ca" /> School ERP</Link>
              <Link href="/transport" className="dropdown-item"><Bus size={16} color="#3b82f6" /> GPS Bus Tracking</Link>
              <Link href="/parent-app" className="dropdown-item"><Smartphone size={16} color="#8b5cf6" /> Parent Mobile App</Link>
            </div>
          </div>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="/resources" className="nav-link active">Resources</Link>
          <Link href="/about" className="nav-link">About Us</Link>
        </div>

        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle theme" style={{
            background: "var(--bg-subtle)", border: "1px solid var(--border-color)",
            padding: "0.45rem", borderRadius: "8px", cursor: "pointer",
            color: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "center"
          }}>{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button>

          <Link href="/login" className="btn-ghost-nav" style={{
            padding: "0.55rem 1.25rem", borderRadius: "10px",
            border: "1px solid var(--border-color)", color: "var(--text-main)",
            textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", background: "var(--bg-card)"
          }}>Login</Link>

          <Link href="/contact" className="btn-primary-nav" style={{
            padding: "0.55rem 1.35rem", borderRadius: "10px",
            background: "linear-gradient(135deg,#4338ca 0%,#3b82f6 100%)",
            color: "#fff", border: "none", fontWeight: 700, fontSize: "0.9rem",
            cursor: "pointer", boxShadow: "0 4px 14px rgba(67,56,202,.25)", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: "0.35rem"
          }}>Get Started</Link>
        </div>
      </nav>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="resources-hero-section" style={{
        position: "relative", paddingTop: 120, paddingBottom: 30,
        paddingLeft: "5%", paddingRight: "5%",
        overflow: "hidden"
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "10%", right: "20%", width: 300, height: 300, borderRadius: "50%", background: "rgba(99,102,241,0.08)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "10%", width: 200, height: 200, borderRadius: "50%", background: "rgba(59,130,246,0.06)", filter: "blur(40px)" }} />

        {/* ── Floating stats badge (top-right) ── */}
        <div className="resources-stats-badge" style={{
          position: "absolute", top: 100, right: "5%", zIndex: 10,
          display: "flex", alignItems: "center", gap: "1.25rem",
          borderRadius: 14, padding: "0.6rem 1.2rem",
          backdropFilter: "blur(8px)"
        }}>
          {[
            { v: "500+", l: "Resources" },
            { v: "50K+", l: "Schools Learn" },
            { v: "24/7", l: "Help Center" },
          ].map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ width: 1, height: 32, background: "var(--border-color)" }} />}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)", fontFamily: "'Outfit',sans-serif" }}>{s.v}</span>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)" }}>{s.l}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Hero grid: text + illustration */}
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center" }}>

          {/* Left copy */}
          <div>
            {/* Badge pill */}
            <div className="resources-badge" style={{
              display: "inline-flex", alignItems: "center", gap: "0.45rem",
              padding: "0.35rem 0.95rem", borderRadius: 9999,
              fontSize: "0.85rem", fontWeight: 600, marginBottom: "1.25rem"
            }}>
              <BookOpen size={15} color="var(--primary)" /> Resources
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: "clamp(2.2rem,3.8vw,3.2rem)", fontWeight: 800,
              lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "1rem"
            }}>
              Learning Center<br />
              for{" "}
              <span style={{
                background: "linear-gradient(135deg,#4338ca 0%,#3b82f6 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Modern Schools</span>
            </h1>

            {/* Sub-text */}
            <p style={{ fontSize: "0.98rem", color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 460, marginBottom: "1.5rem" }}>
              Explore guides, articles, case studies, and helpful resources to make your school smarter, safer and more efficient.
            </p>

            {/* Search bar */}
            <div style={{
              display: "flex", alignItems: "center",
              background: "var(--bg-card)", border: "1px solid var(--border-color)",
              borderRadius: 14, padding: "0.3rem 0.3rem 0.3rem 1.1rem",
              maxWidth: 480, boxShadow: "0 8px 24px rgba(15,23,42,0.06)"
            }}>
              <input
                type="text" placeholder="Search articles, guides, videos..."
                value={search} onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: "0.92rem", color: "var(--text-main)", fontFamily: "inherit" }}
              />
              <button style={{
                width: 44, height: 44, borderRadius: 10,
                background: "linear-gradient(135deg,#4338ca,#3b82f6)", color: "#fff",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", boxShadow: "0 4px 12px rgba(67,56,202,0.3)"
              }}><Search size={20} /></button>
            </div>
          </div>

          {/* Right: 3D illustration */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <img
              src="/images/resources/hero-3d.png"
              alt="Learning center illustration"
              style={{ width: "100%", maxWidth: 560, maxHeight: 380, height: "auto", objectFit: "contain", filter: "drop-shadow(0 16px 32px rgba(67,56,202,0.15))" }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORY FILTER BAR ═══════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 5% 0" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(9,1fr)", gap: "0.85rem"
        }}>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const active = selectedCat === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "0.55rem", padding: "1.15rem 0.6rem",
                  background: active ? "rgba(99,102,241,0.06)" : "var(--bg-card)",
                  border: `1.5px solid ${active ? "#4338ca" : "var(--border-color)"}`,
                  borderRadius: 16, cursor: "pointer",
                  boxShadow: active ? "0 6px 20px rgba(67,56,202,0.12)" : "0 2px 8px rgba(0,0,0,0.03)",
                  transition: "all 0.25s ease"
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 13,
                  background: active ? cat.color : cat.bg,
                  color: active ? "#fff" : cat.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s"
                }}><Icon size={22} /></div>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: active ? "var(--primary)" : "var(--text-main)", textAlign: "center" }}>
                  {cat.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ FEATURED RESOURCES ═══════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "3.5rem 5% 4.5rem" }}>
        {/* Heading row */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Featured Resources
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
            Handpicked content to help you get the most out of SchoolMitra
          </p>

          {/* View All button (right-aligned) */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-1.6rem" }}>
            <button onClick={() => setSelectedCat("all")} style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              padding: "0.5rem 1.1rem", borderRadius: 10,
              border: "1px solid var(--border-color)", background: "var(--bg-card)",
              color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem",
              cursor: "pointer", transition: "all 0.2s", textDecoration: "none"
            }}>View All <ArrowRight size={14} /></button>
          </div>
        </div>

        {/* 3-column card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.75rem" }}>
          {featured.map(card => (
            <div key={card.id} style={{
              background: "var(--bg-card)", border: "1px solid var(--border-color)",
              borderRadius: 20, overflow: "hidden",
              boxShadow: "0 8px 28px rgba(15,23,42,0.06)",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              display: "flex", flexDirection: "column"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 18px 40px rgba(15,23,42,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(15,23,42,0.06)"; }}
            >
              {/* Card image */}
              <div style={{
                position: "relative", width: "100%", height: 210,
                background: "linear-gradient(135deg,#eef2ff 0%,#e0e7ff 100%)",
                overflow: "hidden"
              }}>
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : null}
              </div>

              {/* Card body */}
              <div style={{ padding: "1.35rem 1.35rem 1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                {/* Tag */}
                <span style={{
                  display: "inline-block", padding: "0.22rem 0.7rem", borderRadius: 6,
                  fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.04em", marginBottom: "0.75rem", width: "fit-content",
                  ...(card.tagClass === "guide"      ? { background: "#fee2e2", color: "#dc2626" } :
                     card.tagClass === "blog"        ? { background: "#dcfce7", color: "#15803d" } :
                     card.tagClass === "case-study"  ? { background: "#fef3c7", color: "#b45309" } :
                                                       { background: "#e0e7ff", color: "#4338ca" })
                }}>{card.type}</span>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.35, marginBottom: "0.5rem", color: "var(--text-main)" }}>
                  {card.title}
                </h3>

                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.25rem", flex: 1 }}>
                  {card.desc}
                </p>

                <button onClick={() => setReader(card)} style={{
                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.5rem 1rem", borderRadius: 10,
                  border: "1px solid var(--border-color)", background: "transparent",
                  color: "var(--text-main)", fontWeight: 700, fontSize: "0.82rem",
                  cursor: "pointer", width: "fit-content", transition: "all 0.2s"
                }}>{card.btn} <ArrowRight size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ ALL RESOURCES (below featured) ═══════════ */}
      {filtered.length > 3 && (
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 5% 4.5rem" }}>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            More Resources ({filtered.length - 3})
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "1.5rem" }}>
            {filtered.slice(3).map(r => (
              <div key={r.id} style={{
                background: "var(--bg-card)", border: "1px solid var(--border-color)",
                borderRadius: 16, padding: "1.25rem",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                transition: "all 0.25s ease"
              }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.7rem" }}>
                    <span style={{
                      padding: "0.2rem 0.65rem", borderRadius: 6,
                      fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                      ...(r.tagClass === "guide"      ? { background: "#fee2e2", color: "#dc2626" } :
                         r.tagClass === "blog"        ? { background: "#dcfce7", color: "#15803d" } :
                                                        { background: "#fef3c7", color: "#b45309" })
                    }}>{r.type}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {r.readTime}</span>
                  </div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.45rem" }}>{r.title}</h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1rem" }}>{r.desc}</p>
                </div>
                <button onClick={() => setReader(r)} style={{
                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.45rem 0.9rem", borderRadius: 10,
                  border: "1px solid var(--border-color)", background: "transparent",
                  color: "var(--primary)", fontWeight: 700, fontSize: "0.8rem",
                  cursor: "pointer", width: "fit-content"
                }}>{r.btn} <ArrowRight size={13} /></button>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* ═══════════ LATEST ARTICLES ═══════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 5% 4rem" }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Latest Articles</h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>Insights, tips and trends from the world of school management</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["Latest", "Popular", "Most Viewed"].map((tab, i) => (
              <button key={tab} style={{
                padding: "0.45rem 1rem", borderRadius: 10,
                border: "1px solid var(--border-color)",
                background: i === 0 ? "var(--primary)" : "var(--bg-card)",
                color: i === 0 ? "#fff" : "var(--text-main)",
                fontWeight: 600, fontSize: "0.82rem", cursor: "pointer"
              }}>{tab}</button>
            ))}
          </div>
        </div>

        {/* 4-column article grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
          {[
            { img: "/images/resources/article-bus.png", tag: "Transport", tagBg: "#e0e7ff", tagColor: "#4338ca", time: "5 min read", title: "How GPS Bus Tracking Improves Student Safety", desc: "Real-time tracking is changing school transport for the better." },
            { img: "/images/resources/article-parent.png", tag: "Parent Engagement", tagBg: "#ede9fe", tagColor: "#7c3aed", time: "5 min read", title: "10 Ways to Build Stronger Parent-School Communication", desc: "Modern tools to keep parents involved in their child's learning." },
            { img: "/images/resources/article-digital.png", tag: "Digital Transformation", tagBg: "#fef3c7", tagColor: "#b45309", time: "8 min read", title: "School Digitization: A Complete Beginner's Guide", desc: "Cut paperwork and streamline operations with EdTech." },
            { img: "/images/resources/article-attendance.png", tag: "Academics", tagBg: "#e0e7ff", tagColor: "#4338ca", time: "5 min read", title: "Smart Attendance Systems for Modern Schools", desc: "From QR check-in to live reports." },
          ].map((a, i) => (
            <div key={i} style={{
              background: "var(--bg-card)", border: "1px solid var(--border-color)",
              borderRadius: 18, overflow: "hidden",
              boxShadow: "0 4px 16px rgba(15,23,42,0.05)",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              display: "flex", flexDirection: "column"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 30px rgba(15,23,42,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(15,23,42,0.05)"; }}
            >
              <div style={{ width: "100%", height: 170, overflow: "hidden", background: "#eef2ff" }}>
                <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1.1rem 1.15rem 1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
                  <span style={{ padding: "0.18rem 0.6rem", borderRadius: 6, fontSize: "0.68rem", fontWeight: 700, background: a.tagBg, color: a.tagColor }}>{a.tag}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 3 }}><Clock size={11} /> {a.time}</span>
                </div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.35, marginBottom: "0.4rem", color: "var(--text-main)" }}>{a.title}</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1rem", flex: 1 }}>{a.desc}</p>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: "0.3rem",
                  background: "transparent", border: "none", padding: 0,
                  color: "var(--primary)", fontWeight: 700, fontSize: "0.82rem",
                  cursor: "pointer"
                }}>✓ Read More <ArrowRight size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ HELPFUL GUIDES & DOWNLOADS ═══════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 5% 4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem" }}>
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Helpful Guides & Downloads</h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>Free resources to get you started</p>
          </div>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "0.35rem",
            padding: "0.5rem 1.1rem", borderRadius: 10,
            border: "1px solid var(--border-color)", background: "var(--bg-card)",
            color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer"
          }}>View All <ArrowRight size={14} /></button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1.25rem" }}>
          {[
            { icon: "📋", iconBg: "#fee2e2", iconColor: "#dc2626", title: "School ERP\nSetup Checklist", size: "2.4 MB" },
            { icon: "📱", iconBg: "#fef3c7", iconColor: "#b45309", title: "Parent App\nUser Manual", size: "3.2 MB" },
            { icon: "🚌", iconBg: "#dcfce7", iconColor: "#15803d", title: "Bus Tracking\nImplementation Guide", size: "4.1 MB" },
            { icon: "🛡️", iconBg: "#e0f2fe", iconColor: "#0284c7", title: "Data Security &\nPrivacy Policy", size: "4.1 MB" },
            { icon: "💻", iconBg: "#e0e7ff", iconColor: "#4338ca", title: "API Documentation\n", size: "2.6 MB" },
          ].map((g, i) => (
            <div key={i} style={{
              background: "var(--bg-card)", border: "1px solid var(--border-color)",
              borderRadius: 16, padding: "1.25rem 1rem",
              display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.6rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              transition: "all 0.25s ease"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: g.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                {g.icon}
              </div>
              <div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, lineHeight: 1.35, whiteSpace: "pre-line", color: "var(--text-main)" }}>{g.title}</h4>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>PDF  {g.size}</span>
              </div>
              <button style={{
                padding: "0.4rem 1rem", borderRadius: 10,
                border: "1px solid var(--primary)", background: "transparent",
                color: "var(--primary)", fontWeight: 700, fontSize: "0.8rem",
                cursor: "pointer", transition: "all 0.2s", marginTop: "auto"
              }}>Download</button>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ UPCOMING WEBINARS & EVENTS ═══════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 5% 4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem" }}>
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Upcoming Webinars & Events</h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>Learn from our education experts and industry leaders</p>
          </div>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "0.35rem",
            padding: "0.5rem 1.1rem", borderRadius: 10,
            border: "1px solid var(--border-color)", background: "var(--bg-card)",
            color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer"
          }}>View Calendar <ArrowRight size={14} /></button>
        </div>

        {/* Webinar banner card */}
        <div style={{
          background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 60%, #6366f1 100%)",
          borderRadius: 22, padding: "2rem 2.5rem", color: "#fff",
          display: "grid", gridTemplateColumns: "1fr 0.6fr 0.4fr", gap: "1.5rem",
          alignItems: "center", position: "relative", overflow: "hidden",
          boxShadow: "0 16px 40px rgba(67,56,202,0.25)"
        }}>
          {/* Left content */}
          <div>
            <span style={{
              display: "inline-block", padding: "0.25rem 0.7rem", borderRadius: 6,
              background: "#ef4444", color: "#fff", fontSize: "0.72rem",
              fontWeight: 700, textTransform: "uppercase", marginBottom: "0.85rem"
            }}>Live Webinar</span>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, lineHeight: 1.3, marginBottom: "0.85rem" }}>
              Building a Smarter, Safer School with SchoolMitra
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", opacity: 0.9, marginBottom: "0.75rem" }}>
              <span>📅 25 Aug 2026</span>
              <span>•</span>
              <span>11:00 AM IST</span>
            </div>
            {/* Avatars + count */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ display: "flex" }}>
                {[0, 1, 2, 3, 4].map(j => (
                  <div key={j} style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: `hsl(${220 + j * 30}, 60%, ${55 + j * 5}%)`,
                    border: "2px solid rgba(255,255,255,0.8)",
                    marginLeft: j > 0 ? -8 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.55rem", fontWeight: 700, color: "#fff"
                  }}>{String.fromCharCode(65 + j)}</div>
                ))}
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.9 }}>500+ Registered</span>
            </div>
          </div>

          {/* Middle: bullet points */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {["Live Demo", "Expert Session", "Q&A with Team", "Certificate"].map((item, k) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.88rem", fontWeight: 600 }}>
                <CheckCircle2 size={16} color="#10b981" /> {item}
              </div>
            ))}
          </div>

          {/* Right: image + button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: 120, height: 120, borderRadius: 16, overflow: "hidden",
              border: "3px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
            }}>
              <img src="/images/resources/webinar-presenter.png" alt="Webinar presenter" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <button style={{
              padding: "0.6rem 1.4rem", borderRadius: 12,
              background: "#fff", color: "#4338ca", border: "none",
              fontWeight: 800, fontSize: "0.88rem", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}>Register Now</button>
          </div>
        </div>
      </section>

      {/* ═══════════ BOTTOM SUPPORT CARDS ═══════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 5% 4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {[
            { icon: "🎯", iconBg: "#e0e7ff", title: "Help Center", desc: "Find instant answers to common questions.", link: "Visit Help Center" },
            { icon: "▶️", iconBg: "#fee2e2", title: "Video Tutorials", desc: "Step-by-step videos to learn all features.", link: "Watch Now" },
            { icon: "💬", iconBg: "#dcfce7", title: "Contact Support", desc: "Need help? We're here for you.", link: "Contact Us" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "var(--bg-card)", border: "1px solid var(--border-color)",
              borderRadius: 18, padding: "1.5rem",
              display: "flex", alignItems: "center", gap: "1rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              transition: "all 0.25s ease"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)"; }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 14, background: s.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", flexShrink: 0
              }}>{s.icon}</div>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.2rem" }}>{s.title}</h4>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.45, marginBottom: "0.35rem" }}>{s.desc}</p>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)", display: "inline-flex", alignItems: "center", gap: "0.3rem", cursor: "pointer" }}>{s.link} <ArrowRight size={13} /></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ NEWSLETTER CTA ═══════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto 4rem", padding: "0 5%" }}>
        <div style={{
          background: "linear-gradient(135deg,#4338ca 0%,#3b82f6 100%)",
          borderRadius: 24, padding: "3rem 2.5rem", color: "#fff",
          display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "2rem",
          alignItems: "center", boxShadow: "0 20px 40px rgba(67,56,202,0.25)"
        }}>
          <div>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.9 }}>Never Miss an Update</span>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0 1rem" }}>Join 50,000+ Educators & Administrators</h2>
            <p style={{ fontSize: "1rem", opacity: 0.9, lineHeight: 1.6, maxWidth: 500 }}>Get weekly guides, ERP tips, compliance checklists, and exclusive school technology insights delivered directly to your inbox.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", background: "rgba(255,255,255,0.15)", padding: "6px 6px 6px 16px", borderRadius: 14, backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}>
              <input type="email" placeholder="Enter your school email..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", color: "#fff", fontSize: "0.9rem" }} />
              <button style={{ background: "#fff", color: "#4338ca", border: "none", padding: "0.6rem 1.2rem", borderRadius: 10, fontWeight: 800, fontSize: "0.88rem", cursor: "pointer" }}>Subscribe</button>
            </div>
            <span style={{ fontSize: "0.72rem", opacity: 0.8, textAlign: "center" }}>No spam. Unsubscribe anytime with 1-click.</span>
          </div>
        </div>
      </section>

      {/* ═══════════ READER MODAL ═══════════ */}
      {reader && (
        <div
          onClick={() => setReader(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(15,23,42,0.6)", backdropFilter: "blur(6px)",
            zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{
            background: "var(--bg-card)", border: "1px solid var(--border-color)",
            borderRadius: 24, maxWidth: 660, width: "100%", maxHeight: "85vh",
            overflowY: "auto", boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
            padding: "2rem", position: "relative"
          }}>
            <button onClick={() => setReader(null)} style={{
              position: "absolute", top: 16, right: 16,
              background: "var(--bg-subtle)", border: "none",
              width: 36, height: 36, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text-main)"
            }}><X size={18} /></button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{
                padding: "0.22rem 0.7rem", borderRadius: 6,
                fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                ...(reader.tagClass === "guide"      ? { background: "#fee2e2", color: "#dc2626" } :
                   reader.tagClass === "blog"        ? { background: "#dcfce7", color: "#15803d" } :
                                                       { background: "#fef3c7", color: "#b45309" })
              }}>{reader.type}</span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{reader.readTime}</span>
              {"date" in reader && <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>• {(reader as any).date}</span>}
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1.3, marginBottom: "1rem" }}>{reader.title}</h2>

            {"author" in reader && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-color)" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#3b82f6)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 }}>{(reader as any).author[0]}</div>
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>By {(reader as any).author}</span>
              </div>
            )}

            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem" }}>Key Insights & Takeaways:</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "2rem" }}>
              {reader.summary.map((pt, i) => (
                <div key={i} style={{ display: "flex", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                  <CheckCircle2 size={17} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} /> <span>{pt}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1.2rem", borderRadius: 12, border: "1px solid var(--border-color)", background: "var(--bg-subtle)", color: "var(--text-main)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}><Download size={15} /> Download PDF</button>
              <button onClick={() => setReader(null)} style={{ padding: "0.6rem 1.3rem", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#4338ca,#3b82f6)", color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>Close Preview</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />
    </div>
  );
}
