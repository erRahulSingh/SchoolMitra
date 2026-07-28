"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap, Check, Star, Send, Award, Shield, Bus, Users, CreditCard,
  FileText, Smartphone, ChevronDown, Sun, Moon, Sparkles, BarChart3, Headphones,
  ArrowRight, CheckCircle2, MessageSquare, HardDrive, Code2, Video, Minus, Plus
} from "lucide-react";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";

export default function PricingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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
          <Link href="/features" className="nav-link">Features</Link>
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
          <Link href="/pricing" className="nav-link" style={{ color: "var(--primary)", fontWeight: 800 }}>Pricing</Link>
          <Link href="/resources" className="nav-link">Resources</Link>
          <Link href="/about" className="nav-link">About Us</Link>
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

      {/* ========== HERO SECTION ========== */}
      <section className="hero-wrapper" style={{
        paddingTop: "140px",
        paddingBottom: "40px",
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
              ❖ Simple &amp; Transparent Pricing
            </span>

            <h1 style={{
              fontSize: "clamp(2.5rem, 4.2vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              color: "var(--text-main)",
              letterSpacing: "-0.03em",
              marginBottom: "1.4rem"
            }}>
              Choose the Perfect Plan <span style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #4338ca 60%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>for Your School</span>
            </h1>

            <p style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              lineHeight: 1.65,
              maxWidth: "540px",
              marginBottom: "2rem",
              fontWeight: 500
            }}>
              Affordable pricing plans for schools of all sizes. Upgrade or downgrade anytime.
            </p>

            <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, color: "var(--text-main)", fontSize: "0.95rem" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 800 }}>✓</div>
                No Setup Fees
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, color: "var(--text-main)", fontSize: "0.95rem" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 800 }}>✓</div>
                Cancel Anytime
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Mockup */}
          <div className="showcase-container" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
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
              <div style={{
                background: "#f1f5f9",
                borderRadius: "10px 10px 0 0",
                height: "350px",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "135px 1fr",
                fontSize: "0.6rem"
              }}>
                <div style={{ background: "#ffffff", borderRight: "1px solid #e2e8f0", padding: "0.6rem 0.5rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.68rem", display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.4rem" }}>
                    <div style={{ width: 14, height: 14, borderRadius: 4, background: "linear-gradient(135deg, #4338ca, #3b82f6)" }}></div>
                    SchoolMitra
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

                <div style={{ padding: "0.6rem 0.8rem", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.75rem", color: "#0f172a" }}>Dashboard</span>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "linear-gradient(135deg, #4338ca, #3b82f6)", color: "#fff", fontSize: "0.45rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>A</div>
                  </div>

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

                  <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "0.4rem", flex: 1 }}>
                    <div style={{ background: "#ffffff", padding: "0.45rem", borderRadius: "7px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: "0.48rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.2rem" }}>Attendance Overview</div>
                      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "3px", paddingTop: "0.2rem" }}>
                        {[60, 45, 80, 55, 90, 70, 85].map((h, idx) => (
                          <div key={idx} style={{ flex: 1, height: `${h}%`, background: "#3b82f6", borderRadius: "2px 2px 0 0" }}></div>
                        ))}
                      </div>
                    </div>

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

            {/* Smartphone Mockup */}
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

                <div style={{ flex: 1, background: "#e8ede6", borderRadius: "8px", position: "relative", overflow: "hidden" }}>
                  <svg width="100%" height="100%">
                    <path d="M 10 160 Q 60 100, 110 40" fill="none" stroke="#3b82f6" strokeWidth="4" />
                    <circle cx="110" cy="40" r="4" fill="#2563eb" />
                  </svg>
                  <div style={{ position: "absolute", top: "70px", left: "45px", background: "#f59e0b", color: "#fff", padding: "0.15rem 0.3rem", borderRadius: "4px", fontSize: "0.35rem", fontWeight: 800 }}>
                    🚌 Bus #12
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.2rem", textAlign: "center", background: "#f8fafc", padding: "0.25rem", borderRadius: "6px" }}>
                  <div><div style={{ color: "#94a3b8", fontSize: "0.35rem" }}>ETA</div><div style={{ fontWeight: 800, color: "#0f172a" }}>06 min</div></div>
                  <div><div style={{ color: "#94a3b8", fontSize: "0.35rem" }}>Distance</div><div style={{ fontWeight: 800, color: "#0f172a" }}>2.4 km</div></div>
                  <div><div style={{ color: "#94a3b8", fontSize: "0.35rem" }}>Speed</div><div style={{ fontWeight: 800, color: "#0f172a" }}>40 km/h</div></div>
                </div>
              </div>
            </div>

            {/* Floating Trusted Badge */}
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
              <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#4338ca", display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.4rem" }}>
                🛡️ Trusted by 500+ Schools
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#4338ca", color: "#fff", fontSize: "0.5rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>DPS</div>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#10b981", color: "#fff", fontSize: "0.5rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>STX</div>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#8b5cf6", color: "#fff", fontSize: "0.5rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>RYN</div>
                <div style={{ width: 26, height: 22, borderRadius: "99px", background: "#0f172a", color: "#fff", fontSize: "0.5rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>+500</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BILLING TOGGLE SWITCH & PRICING CARDS ========== */}
      <section id="pricing" style={{ padding: "20px 4% 70px 4%", maxWidth: "1280px", margin: "0 auto" }}>
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
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
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

            <button onClick={() => setModalOpen(true)} style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1.5px solid #3b82f6",
              color: "#3b82f6",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "all 0.2s ease"
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

            <button onClick={() => setModalOpen(true)} className="btn-interactive-glow" style={{
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

            <button onClick={() => setModalOpen(true)} style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1.5px solid #3b82f6",
              color: "#3b82f6",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "all 0.25s ease"
            }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* ========== COMPARE PLANS TABLE SECTION (IMAGE 1) ========== */}
      <section style={{ padding: "60px 4% 90px 4%", maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "2.4rem",
          fontWeight: 800,
          textAlign: "center",
          color: "var(--text-main)",
          marginBottom: "2.5rem",
          letterSpacing: "-0.02em"
        }}>
          Compare Plans
        </h2>

        <div style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          border: "1px solid var(--border-color)",
          boxShadow: "0 10px 35px rgba(0,0,0,0.03)",
          overflow: "hidden"
        }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "0.93rem"
          }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", background: "var(--bg-subtle)" }}>
                <th style={{ padding: "1.3rem 1.8rem", fontWeight: 800, color: "var(--text-main)", width: "32%", fontSize: "1rem" }}>
                  Features
                </th>
                <th style={{ padding: "1.3rem 1.2rem", fontWeight: 800, color: "var(--text-main)", textAlign: "center", width: "22%", fontSize: "1rem" }}>
                  Basic
                </th>
                <th style={{
                  padding: "1.3rem 1.2rem",
                  fontWeight: 800,
                  color: "#2563eb",
                  textAlign: "center",
                  width: "23%",
                  background: "rgba(59, 130, 246, 0.07)",
                  position: "relative"
                }}>
                  <div style={{
                    position: "absolute",
                    top: "-1px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#2563eb",
                    color: "#ffffff",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    padding: "0.2rem 0.8rem",
                    borderRadius: "0 0 8px 8px"
                  }}>
                    Most Popular
                  </div>
                  <div style={{ marginTop: "0.6rem", fontSize: "1rem" }}>Pro</div>
                </th>
                <th style={{ padding: "1.3rem 1.2rem", fontWeight: 800, color: "var(--text-main)", textAlign: "center", width: "23%", fontSize: "1rem" }}>
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { feat: "Students", b: "Up to 200", p: "Up to 1000", e: "Unlimited" },
                { feat: "Teacher Accounts", b: "5", p: "25", e: "Unlimited" },
                { feat: "Buses Tracking", b: "2 Buses", p: "10 Buses", e: "Unlimited" },
                { feat: "Parent App", b: true, p: true, e: true },
                { feat: "Live Bus Tracking", b: true, p: true, e: true },
                { feat: "Attendance Management", b: true, p: true, e: true },
                { feat: "Exams & Report Cards", b: true, p: true, e: true },
                { feat: "Fees & Payments", b: true, p: true, e: true },
                { feat: "Advanced Reports", b: "Basic", p: "Advanced", e: "Advanced + Analytics" },
                { feat: "Multi-Branch Management", b: false, p: true, e: true },
                { feat: "Priority Support", b: false, p: true, e: true },
                { feat: "Dedicated Account Manager", b: false, p: false, e: true },
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "1.05rem 1.8rem", fontWeight: 700, color: "var(--text-main)" }}>
                    {row.feat}
                  </td>
                  <td style={{ padding: "1.05rem 1.2rem", textAlign: "center", color: "var(--text-muted)", fontWeight: 600 }}>
                    {typeof row.b === "boolean" ? (
                      row.b ? <span style={{ color: "#16a34a", fontWeight: 800, fontSize: "1.1rem" }}>✓</span> : <span style={{ color: "#94a3b8" }}>—</span>
                    ) : (
                      row.b
                    )}
                  </td>
                  <td style={{ padding: "1.05rem 1.2rem", textAlign: "center", background: "rgba(59, 130, 246, 0.04)", fontWeight: 700, color: "#1e3a8a" }}>
                    {typeof row.p === "boolean" ? (
                      row.p ? <span style={{ color: "#16a34a", fontWeight: 800, fontSize: "1.1rem" }}>✓</span> : <span style={{ color: "#94a3b8" }}>—</span>
                    ) : (
                      row.p
                    )}
                  </td>
                  <td style={{ padding: "1.05rem 1.2rem", textAlign: "center", color: "var(--text-muted)", fontWeight: 600 }}>
                    {typeof row.e === "boolean" ? (
                      row.e ? <span style={{ color: "#16a34a", fontWeight: 800, fontSize: "1.1rem" }}>✓</span> : <span style={{ color: "#94a3b8" }}>—</span>
                    ) : (
                      row.e
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========== POWERFUL ADD-ONS SECTION (IMAGE 1) ========== */}
      <section style={{ padding: "20px 4% 90px 4%", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.6rem", letterSpacing: "-0.02em" }}>
            Powerful Add-ons
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", fontWeight: 500 }}>
            Add more power to your plan with our premium add-ons.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.8rem"
        }}>
          {[
            {
              title: "SMS Pack",
              desc: "Send instant SMS alerts to parents and staff.",
              price: "₹999",
              unit: "/month",
              bgColor: "#f3e8ff",
              iconColor: "#9333ea",
              icon: <MessageSquare size={22} color="#9333ea" />
            },
            {
              title: "Extra Storage",
              desc: "Add additional storage for documents and media.",
              price: "₹499",
              unit: "/month",
              bgColor: "#ffedd5",
              iconColor: "#ea580c",
              icon: <HardDrive size={22} color="#ea580c" />
            },
            {
              title: "API Access",
              desc: "Integrate with third-party software and tools.",
              price: "₹1,499",
              unit: "/month",
              bgColor: "#dcfce7",
              iconColor: "#16a34a",
              icon: <Code2 size={22} color="#16a34a" />
            },
            {
              title: "Video Classes",
              desc: "Enable live classes and recorded sessions.",
              price: "₹2,499",
              unit: "/month",
              bgColor: "#dbeafe",
              iconColor: "#2563eb",
              icon: <Video size={22} color="#2563eb" />
            }
          ].map((addon, idx) => (
            <div key={idx} style={{
              background: "var(--bg-card)",
              borderRadius: "18px",
              padding: "1.6rem",
              border: "1px solid var(--border-color)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.03)",
              display: "flex",
              gap: "1.2rem",
              alignItems: "flex-start",
              transition: "transform 0.2s ease, boxShadow 0.2s ease"
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                background: addon.bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                {addon.icon}
              </div>

              <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.4rem" }}>
                    {addon.title}
                  </h3>
                  <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1.2rem", fontWeight: 500 }}>
                    {addon.desc}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                  <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
                    {addon.price}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    {addon.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== FAQ SECTION WITH 3D GIRL ILLUSTRATION (IMAGE 2) ========== */}
      <section id="faq" style={{ padding: "90px 4%", background: "var(--bg-subtle)", borderTop: "1px solid var(--border-color)" }}>
        <div style={{ maxWidth: "1250px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            textAlign: "center",
            color: "var(--text-main)",
            marginBottom: "3.5rem",
            letterSpacing: "-0.02em"
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "340px 1fr",
            gap: "3.5rem",
            alignItems: "center"
          }}>
            {/* Left 3D Girl Illustration Graphic */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative"
            }}>
              <div style={{
                width: "280px",
                height: "320px",
                borderRadius: "32px",
                background: "linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxShadow: "0 20px 40px rgba(124, 58, 237, 0.12)"
              }}>
                {/* 3D Girl Avatar Graphic */}
                <svg width="220" height="260" viewBox="0 0 220 260" fill="none">
                  {/* Outer glow aura */}
                  <circle cx="110" cy="130" r="90" fill="#a78bfa" fillOpacity="0.25" />
                  
                  {/* Floating Question Bubble */}
                  <g transform="translate(145, 30)">
                    <circle cx="24" cy="24" r="22" fill="#8b5cf6" />
                    <text x="24" y="32" fill="#ffffff" fontSize="24" fontWeight="800" textAnchor="middle">?</text>
                  </g>
                  
                  {/* Head / Hair */}
                  <path d="M 60 120 C 60 60, 160 60, 160 120 C 160 135, 150 145, 140 145 L 80 145 C 70 145, 60 135, 60 120 Z" fill="#1e1b4b" />
                  
                  {/* Face */}
                  <circle cx="110" cy="115" r="38" fill="#fdba74" />
                  
                  {/* Eyes */}
                  <ellipse cx="98" cy="112" rx="4" ry="5" fill="#1e1b4b" />
                  <ellipse cx="122" cy="112" rx="4" ry="5" fill="#1e1b4b" />
                  
                  {/* Smile */}
                  <path d="M 103 125 Q 110 132 117 125" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  
                  {/* Hair Fringe */}
                  <path d="M 72 100 Q 110 75 148 100 Q 110 90 72 100 Z" fill="#1e1b4b" />

                  {/* Body - Purple Sweater (as in image) */}
                  <path d="M 55 240 C 55 170, 165 170, 165 240 Z" fill="#4c1d95" />
                  <path d="M 70 175 L 150 175 L 160 250 L 60 250 Z" fill="#6d28d9" />
                  
                  {/* Pointing Arm / Hand */}
                  <path d="M 145 190 Q 170 150 165 95" stroke="#fdba74" strokeWidth="12" strokeLinecap="round" fill="none" />
                  <circle cx="165" cy="90" r="7" fill="#fdba74" />
                </svg>
              </div>
            </div>

            {/* Right Accordion Questions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  q: "Can I upgrade or downgrade my plan anytime?",
                  a: "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                },
                {
                  q: "Is there a setup fee or hidden charges?",
                  a: "Zero hidden costs! All SchoolMitra plans include free student roster onboarding, data migration, and staff training."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), and direct bank transfers."
                },
                {
                  q: "Is my school data secure?",
                  a: "Yes, we use bank-grade 256-bit SSL encryption, automated daily backups, and ISO-27001 certified cloud infrastructure."
                },
                {
                  q: "Do you provide training and support?",
                  a: "Absolutely! We provide free live online training for your administrative and teaching staff, along with dedicated phone & email support."
                }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: "var(--bg-card)",
                  borderRadius: "14px",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  overflow: "hidden"
                }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    style={{
                      width: "100%",
                      padding: "1.25rem 1.5rem",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "var(--text-main)",
                      fontWeight: 700,
                      fontSize: "1.08rem"
                    }}
                  >
                    <span>{item.q}</span>
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: openFaq === idx ? "rgba(59, 130, 246, 0.12)" : "var(--bg-subtle)",
                      color: openFaq === idx ? "#3b82f6" : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1rem"
                    }}>
                      {openFaq === idx ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  {openFaq === idx && (
                    <div style={{
                      padding: "0 1.5rem 1.4rem 1.5rem",
                      color: "var(--text-muted)",
                      fontSize: "0.96rem",
                      lineHeight: 1.65,
                      fontWeight: 500
                    }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT SCHOOLS ARE SAYING (IMAGE 2) ========== */}
      <section style={{ padding: "90px 4%", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            What Schools Are Saying
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "2.5rem"
        }}>
          {[
            {
              quote: "EduTrack Pro has simplified our entire school management process. The bus tracking and parent communication features are excellent!",
              name: "Dr. Priya Sharma",
              role: "Principal, Delhi Public School",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
            },
            {
              quote: "The support team is amazing! Our experience with EduTrack Pro has been outstanding.",
              name: "Mr. Rajesh Verma",
              role: "Administrator, Sunshine School",
              avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
            },
            {
              quote: "Everything we need in one platform - from attendance to fees to transport. Highly recommended!",
              name: "Ms. Anjali Mehta",
              role: "Director, Bright Future Academy",
              avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
            }
          ].map((t, idx) => (
            <div key={idx} style={{
              background: "var(--bg-card)",
              borderRadius: "20px",
              padding: "2rem",
              border: "1px solid var(--border-color)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                {/* 5 Yellow Stars */}
                <div style={{ display: "flex", gap: "0.25rem", color: "#f59e0b", marginBottom: "1.2rem" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <p style={{
                  fontSize: "0.98rem",
                  color: "var(--text-main)",
                  lineHeight: 1.65,
                  fontWeight: 500,
                  marginBottom: "1.8rem"
                }}>
                  &quot;{t.quote}&quot;
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #3b82f6"
                  }}
                />
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.15rem" }}>
                    {t.name}
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#cbd5e1" }}></div>
          <div style={{ width: 22, height: 8, borderRadius: "99px", background: "#3b82f6" }}></div>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#cbd5e1" }}></div>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#cbd5e1" }}></div>
        </div>
      </section>

      {/* ========== READY TO TRANSFORM YOUR SCHOOL CTA BANNER (IMAGE 2) ========== */}
      <section style={{ padding: "20px 4% 90px 4%", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          borderRadius: "24px",
          padding: "3.5rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          alignItems: "center",
          gap: "2.5rem",
          boxShadow: "0 20px 50px rgba(37, 99, 235, 0.35)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{
              fontSize: "clamp(2rem, 3.2vw, 2.7rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              lineHeight: 1.2
            }}>
              Ready to Transform Your School?
            </h2>
            <p style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 500,
              marginBottom: "2rem",
              maxWidth: "540px",
              lineHeight: 1.6
            }}>
              Join 500+ schools already using EduTrack Pro to manage and grow better.
            </p>
            <button onClick={() => setModalOpen(true)} style={{
              padding: "0.9rem 2.2rem",
              borderRadius: "12px",
              background: "#ffffff",
              color: "#1d4ed8",
              border: "none",
              fontWeight: 800,
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              Get Started Now <ArrowRight size={18} />
            </button>
          </div>

          {/* Right 3D School Graphic Visual */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1
          }}>
            <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
              {/* Background Cloud / Glow */}
              <ellipse cx="140" cy="150" rx="120" ry="30" fill="#60a5fa" fillOpacity="0.4" />
              
              {/* School Main Building Base */}
              <rect x="50" y="80" width="180" height="90" rx="6" fill="#ffffff" />
              
              {/* Roof */}
              <path d="M 40 80 L 140 25 L 240 80 Z" fill="#1e40af" />
              <path d="M 50 80 L 140 32 L 230 80 Z" fill="#3b82f6" />
              
              {/* Pillars */}
              <rect x="75" y="100" width="16" height="70" fill="#93c5fd" />
              <rect x="110" y="100" width="16" height="70" fill="#93c5fd" />
              <rect x="154" y="100" width="16" height="70" fill="#93c5fd" />
              <rect x="189" y="100" width="16" height="70" fill="#93c5fd" />
              
              {/* Entrance Door */}
              <path d="M 125 170 L 125 130 C 125 120, 155 120, 155 130 L 155 170 Z" fill="#1e3a8a" />
              
              {/* Dome / Clock Tower */}
              <rect x="120" y="30" width="40" height="35" fill="#ffffff" />
              <path d="M 120 30 Q 140 10 160 30 Z" fill="#1d4ed8" />
              <circle cx="140" cy="48" r="8" fill="#3b82f6" />

              {/* Flag Pole on top */}
              <line x1="140" y1="10" x2="140" y2="25" stroke="#ffffff" strokeWidth="3" />
              <path d="M 140 10 L 158 15 L 140 20 Z" fill="#ef4444" />
              
              {/* Green Bushes */}
              <circle cx="35" cy="165" r="20" fill="#10b981" />
              <circle cx="245" cy="165" r="20" fill="#10b981" />
            </svg>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
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
