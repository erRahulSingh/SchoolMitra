"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, CheckCircle2, Users, Bus, Shield,
  Award, Clock, CreditCard, MessageSquare, Sparkles, Globe,
  Building2, Target, Heart, Zap, TrendingUp, Lock, Smartphone,
  Check, Star, FileText, Headphones, Phone, Mail, MapPin, Compass,
  Eye, CheckCircle, Flame, Rocket, Cpu
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

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
      <section className="about-hero-section" style={{
        position: "relative",
        paddingTop: 110,
        paddingBottom: 40,
        paddingLeft: "5%",
        paddingRight: "5%",
        overflow: "hidden"
      }}>
        {/* Animated Mesh Orbs */}
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

        <div className="about-hero-grid" style={{
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
              <Sparkles size={14} color="#8b5cf6" />
              <span className="gradient-text-vibrant" style={{ fontWeight: 600, fontSize: "0.82rem" }}>Pioneering Educational Intelligence</span>
              <span style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 700,
                padding: "0.12rem 0.45rem",
                borderRadius: "99px"
              }}>
                EST. 2022
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
              Pioneering Next-Gen <span className="gradient-text-sunset">Digital Campuses</span>
            </h1>

            <p style={{
              fontSize: "1.02rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: 520,
              marginBottom: "1.4rem",
              fontWeight: 400
            }}>
              SchoolMitra is digitizing campus operations for schools across India—combining intelligent ERP, live satellite GPS bus telemetry, instant UPI fee gateways, and real-time parent engagement.
            </p>

            {/* Core Values Strip */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.45rem",
              marginBottom: "1.6rem"
            }}>
              {[
                { label: "AI-Powered ERP", icon: "⚡", bg: "rgba(99, 102, 241, 0.08)", border: "rgba(99, 102, 241, 0.25)", color: "#4f46e5" },
                { label: "Live Bus Telemetry", icon: "🚌", bg: "rgba(6, 182, 212, 0.08)", border: "rgba(6, 182, 212, 0.25)", color: "#0284c7" },
                { label: "100% Cashless Fees", icon: "💳", bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.25)", color: "#059669" },
                { label: "4.9★ Parent App", icon: "📱", bg: "rgba(236, 72, 153, 0.08)", border: "rgba(236, 72, 153, 0.25)", color: "#db2777" },
                { label: "ISO-27001 Security", icon: "🛡️", bg: "rgba(245, 158, 11, 0.08)", border: "rgba(245, 158, 11, 0.25)", color: "#d97706" }
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

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "0.85rem", alignItems: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-vibrant-gradient"
                style={{
                  padding: "0.85rem 1.8rem",
                  borderRadius: 12,
                  fontSize: "0.95rem",
                  fontWeight: 600
                }}
              >
                <Zap size={16} /> Book a Campus Demo
              </button>

              <Link
                href="/solutions"
                className="btn-colorful-outline"
                style={{
                  padding: "0.85rem 1.5rem",
                  borderRadius: 12,
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                <Compass size={16} color="#6366f1" /> Explore Solutions
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
              maxWidth: "440px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.35)",
              boxShadow: "0 20px 50px -10px rgba(67, 56, 202, 0.25)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/smart-school-cta.png"
                alt="SchoolMitra Modern Connected Campus Showcase"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>

            {/* Floating Badge 1 */}
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
              <Building2 size={16} />
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700 }}>500+ Campuses</div>
                <div style={{ fontSize: "0.62rem", opacity: 0.9 }}>Across 28+ States</div>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="anim-float-badge-2" style={{
              position: "absolute",
              bottom: "-12px",
              left: "-12px",
              background: "var(--bg-card)",
              borderRadius: "12px",
              padding: "0.55rem 0.9rem",
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.2)",
              border: "1.5px solid rgba(16, 185, 129, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              zIndex: 3
            }}>
              <div className="radar-pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }}></div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669" }}>99.9% Uptime SLA</div>
                <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 500 }}>Bank-Grade Cloud Hosting</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Impact Stats Ribbon (4 Vibrant Stat Cards) ── */}
        <div className="about-stats-ribbon" style={{
          maxWidth: 1240,
          margin: "3rem auto 0 auto",
          display: "flex",
          justifyContent: "center"
        }}>
          <div className="about-stats-grid" style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.2rem"
          }}>
            {[
              {
                val: "500+",
                lbl: "Active School Campuses",
                sub: "Pan-India footprint",
                icon: "🏫",
                grad: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                badgeBg: "rgba(79, 70, 229, 0.1)",
                color: "#4f46e5"
              },
              {
                val: "2.5L+",
                lbl: "Students & Parents",
                sub: "Active daily users",
                icon: "👨‍👩‍👧",
                grad: "linear-gradient(135deg, #0284c7, #06b6d4)",
                badgeBg: "rgba(2, 132, 199, 0.1)",
                color: "#0284c7"
              },
              {
                val: "99.8%",
                lbl: "On-Time Fee Recovery",
                sub: "Zero cash leakage",
                icon: "💳",
                grad: "linear-gradient(135deg, #059669, #10b981)",
                badgeBg: "rgba(16, 185, 129, 0.1)",
                color: "#059669"
              },
              {
                val: "15+ hrs",
                lbl: "Saved/Teacher Each Week",
                sub: "Automated paperwork",
                icon: "⚡",
                grad: "linear-gradient(135deg, #d97706, #f59e0b)",
                badgeBg: "rgba(245, 158, 11, 0.1)",
                color: "#d97706"
              },
            ].map((st, idx) => (
              <div
                key={idx}
                className="colorful-card"
                style={{
                  background: "var(--bg-card)",
                  borderRadius: 16,
                  padding: "1.2rem 1.1rem",
                  border: "1.5px solid var(--border-color)",
                  boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  textAlign: "left",
                  "--card-top-gradient": st.grad,
                  "--card-glow-color": st.badgeBg
                } as React.CSSProperties}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: st.grad,
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                  color: "#ffffff"
                }}>
                  {st.icon}
                </div>
                <div>
                  <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main)", lineHeight: 1.1 }}>{st.val}</div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: st.color, marginTop: "0.15rem" }}>{st.lbl}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 400 }}>{st.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MISSION, VISION & VALUES SECTION ═══════════ */}
      <section style={{ padding: "50px 4% 60px 4%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Compass size={12} color="#6366f1" /> OUR GUIDING PURPOSE
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", marginTop: "0.3rem" }}>
            Driven by a Commitment <span className="gradient-text-sunset">to Educational Innovation</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", maxWidth: 600, margin: "0.5rem auto 0 auto", lineHeight: 1.55, fontWeight: 400 }}>
            Our foundational pillars shape every module we build, ensuring schools operate with safety, clarity, and speed.
          </p>
        </div>

        <div className="about-mission-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.8rem"
        }}>
          {/* Card 1: Our Mission */}
          <div
            className="colorful-card"
            style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem 1.6rem",
              border: "1.5px solid rgba(99, 102, 241, 0.2)",
              boxShadow: "0 6px 20px rgba(99, 102, 241, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "--card-top-gradient": "linear-gradient(90deg, #4f46e5, #7c3aed)",
              "--card-glow-color": "rgba(99, 102, 241, 0.15)"
            } as React.CSSProperties}
          >
            <div>
              <div style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem",
                boxShadow: "0 6px 16px rgba(79, 70, 229, 0.25)"
              }}>
                <Target size={22} color="#ffffff" />
              </div>

              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                CORE PURPOSE
              </span>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main)", marginTop: "0.2rem", marginBottom: "0.6rem" }}>
                Our Mission
              </h3>

              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.55, marginBottom: "1.2rem", fontWeight: 400 }}>
                To eliminate administrative friction—providing every school with bank-grade cloud tools that guarantee child transit safety, fee transparency, and academic excellence.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {["Zero paper friction", "100% child transit safety", "Instant fee recovery"].map((pt, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", fontWeight: 600, color: "#4f46e5" }}>
                  <CheckCircle size={14} color="#4f46e5" /> {pt}
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Our Vision */}
          <div
            className="colorful-card"
            style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem 1.6rem",
              border: "1.5px solid rgba(16, 185, 129, 0.2)",
              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "--card-top-gradient": "linear-gradient(90deg, #059669, #10b981)",
              "--card-glow-color": "rgba(16, 185, 129, 0.15)"
            } as React.CSSProperties}
          >
            <div>
              <div style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: "linear-gradient(135deg, #059669, #10b981)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem",
                boxShadow: "0 6px 16px rgba(16, 185, 129, 0.25)"
              }}>
                <Eye size={22} color="#ffffff" />
              </div>

              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                LONG-TERM HORIZON
              </span>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main)", marginTop: "0.2rem", marginBottom: "0.6rem" }}>
                Our Vision
              </h3>

              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.55, marginBottom: "1.2rem", fontWeight: 400 }}>
                To build the most intuitive and secure EdTech operating system in Asia—where principals, teachers, parents, and drivers connect seamlessly in real-time.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {["Asia's #1 School OS", "Real-time stakeholder synergy", "Empowering 10M+ students"].map((pt, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", fontWeight: 600, color: "#059669" }}>
                  <CheckCircle size={14} color="#059669" /> {pt}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Core Values */}
          <div
            className="colorful-card"
            style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem 1.6rem",
              border: "1.5px solid rgba(249, 115, 22, 0.2)",
              boxShadow: "0 6px 20px rgba(249, 115, 22, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "--card-top-gradient": "linear-gradient(90deg, #ea580c, #f97316)",
              "--card-glow-color": "rgba(249, 115, 22, 0.15)"
            } as React.CSSProperties}
          >
            <div>
              <div style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: "linear-gradient(135deg, #ea580c, #f97316)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem",
                boxShadow: "0 6px 16px rgba(234, 88, 12, 0.25)"
              }}>
                <Heart size={22} color="#ffffff" />
              </div>

              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                CORE VALUES
              </span>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-main)", marginTop: "0.2rem", marginBottom: "0.6rem" }}>
                Our Values
              </h3>

              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.55, marginBottom: "1.2rem", fontWeight: 400 }}>
                We believe technology should feel invisible and empowering. We treat school data with bank-level security, build with empathy for educators, and focus on child safety.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {["Uncompromising integrity", "Educator-first empathy", "Relentless safety focus"].map((pt, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", fontWeight: 600, color: "#ea580c" }}>
                  <CheckCircle size={14} color="#ea580c" /> {pt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 4 CORE PILLARS SECTION ═══════════ */}
      <section style={{ padding: "40px 4% 60px 4%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Award size={12} color="#f59e0b" /> WHY SCHOOLS TRUST SCHOOLMITRA
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", marginTop: "0.3rem" }}>
            Built on 4 Pillars <span className="gradient-text-sunset">of Excellence</span>
          </h2>
        </div>

        <div className="about-pillars-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.4rem"
        }}>
          {[
            {
              icon: <Bus size={22} color="#ffffff" />,
              grad: "linear-gradient(135deg, #0284c7, #06b6d4)",
              tagColor: "#0284c7",
              title: "Child Safety & Fleet GPS",
              desc: "Live route tracking, driver speed alerts, geofence zones, and emergency dispatch.",
              glow: "rgba(2, 132, 199, 0.15)"
            },
            {
              icon: <CreditCard size={22} color="#ffffff" />,
              grad: "linear-gradient(135deg, #059669, #10b981)",
              tagColor: "#059669",
              title: "Zero Cash Leakage",
              desc: "Multi-gateway UPI, instant PDF receipts, and automated bank fee reconciliation.",
              glow: "rgba(5, 150, 105, 0.15)"
            },
            {
              icon: <GraduationCap size={22} color="#ffffff" />,
              grad: "linear-gradient(135deg, #7c3aed, #a855f7)",
              tagColor: "#7c3aed",
              title: "CBSE & ICSE Reports",
              desc: "Automated grade calculations, rank sheets, and 1-click batch report cards.",
              glow: "rgba(124, 58, 237, 0.15)"
            },
            {
              icon: <Smartphone size={22} color="#ffffff" />,
              grad: "linear-gradient(135deg, #db2777, #ec4899)",
              tagColor: "#db2777",
              title: "4.9★ Parent Mobile App",
              desc: "Attendance alerts, homework attachments, circulars, and direct teacher messaging.",
              glow: "rgba(219, 39, 119, 0.15)"
            }
          ].map((pil, idx) => (
            <div
              key={idx}
              className="colorful-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: 18,
                padding: "1.6rem 1.3rem",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
                "--card-top-gradient": pil.grad,
                "--card-glow-color": pil.glow
              } as React.CSSProperties}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: pil.grad,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 14px rgba(0,0,0,0.12)"
              }}>
                {pil.icon}
              </div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                {pil.title}
              </h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                {pil.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ COMPANY TIMELINE & MILESTONES ═══════════ */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
        color: "#ffffff",
        padding: "65px 4%",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "-30%",
          left: "-20%",
          width: "140%",
          height: "160%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0
        }} />

        <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <Rocket size={14} color="#ec4899" /> OUR EVOLUTION &amp; MILESTONES
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "#ffffff", marginTop: "0.4rem" }}>
              How SchoolMitra Transformed <span className="gradient-text-sunset">School Operations</span>
            </h2>
          </div>

          <div className="about-timeline-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.4rem"
          }}>
            {[
              {
                year: "2022",
                title: "Founded in Noida",
                desc: "Started to revolutionize school bus GPS safety and live telemetry for parents.",
                tag: "Seed Phase",
                color: "#60a5fa"
              },
              {
                year: "2023",
                title: "Smart ERP Launch",
                desc: "Introduced 1-click CBSE report cards, attendance sync, and UPI fee receipts.",
                tag: "ERP Suite v1",
                color: "#c084fc"
              },
              {
                year: "2024",
                title: "250+ Schools Milestone",
                desc: "Expanded across 15+ states with Parent, Teacher, and Driver mobile applications.",
                tag: "Mobile Ecosystem",
                color: "#fb923c"
              },
              {
                year: "2026",
                title: "500+ Active Campuses",
                desc: "Serving 2.5L+ users with bank-grade cloud security and multi-branch analytics.",
                tag: "National Leader",
                color: "#34d399"
              }
            ].map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1.5px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: 18,
                  padding: "1.6rem 1.3rem",
                  position: "relative",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                }}
              >
                <span style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: m.color,
                  background: "rgba(255,255,255,0.08)",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "99px",
                  border: `1px solid ${m.color}40`,
                  display: "inline-block",
                  marginBottom: "0.75rem"
                }}>
                  {m.tag}
                </span>

                <div style={{ fontSize: "2.2rem", fontWeight: 700, color: m.color, marginBottom: "0.3rem", lineHeight: 1 }}>
                  {m.year}
                </div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.45rem" }}>
                  {m.title}
                </h4>
                <p style={{ fontSize: "0.82rem", color: "#cbd5e1", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ LEADERSHIP TEAM ═══════════ */}
      <section style={{ padding: "50px 4% 60px 4%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Users size={12} color="#8b5cf6" /> THE MINDS BEHIND SCHOOLMITRA
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", marginTop: "0.3rem" }}>
            Meet Our <span className="gradient-text-sunset">Leadership Team</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: 540, margin: "0.4rem auto 0 auto", lineHeight: 1.55, fontWeight: 400 }}>
            Passionate technologists and education leaders building India&apos;s most reliable school infrastructure.
          </p>
        </div>

        <div className="about-team-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.4rem"
        }}>
          {[
            {
              name: "Rahul Singh",
              role: "Founder & CEO",
              desc: "10+ yrs in EdTech engineering & campus digitization across India.",
              avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
              grad: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              tagColor: "#4f46e5"
            },
            {
              name: "Rahul Yadav",
              role: "Co-founder & CTO",
              desc: "Former education consultant & scalable cloud infrastructure architect.",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
              grad: "linear-gradient(135deg, #0284c7, #06b6d4)",
              tagColor: "#0284c7"
            },
            {
              name: "Vikramaditya Sharma",
              role: "Head of Customer Success",
              desc: "Ensures 24/7 seamless onboarding and dedicated training for schools.",
              avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
              grad: "linear-gradient(135deg, #059669, #10b981)",
              tagColor: "#059669"
            },
            {
              name: "Priya Deshmukh",
              role: "Lead Cloud Architect",
              desc: "Specialist in ISO-27001 data compliance & banking grade SSL security.",
              avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
              grad: "linear-gradient(135deg, #db2777, #ec4899)",
              tagColor: "#db2777"
            }
          ].map((tm, idx) => (
            <div
              key={idx}
              className="colorful-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: 18,
                overflow: "hidden",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                "--card-top-gradient": tm.grad,
                "--card-glow-color": "rgba(99, 102, 241, 0.12)"
              } as React.CSSProperties}
            >
              <div style={{ width: "100%", height: 180, overflow: "hidden", background: "#eef2ff", position: "relative" }}>
                <img
                  src={tm.avatar}
                  alt={tm.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "1.2rem 1.1rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.2rem" }}>
                  {tm.name}
                </h4>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: tm.tagColor, marginBottom: "0.5rem" }}>
                  {tm.role}
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                  {tm.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ OUR OFFICES & CONNECT ═══════════ */}
      <section style={{ padding: "40px 4% 70px 4%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <MapPin size={12} color="#10b981" /> NATIONWIDE PRESENCE
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", marginTop: "0.3rem" }}>
            Our Offices <span className="gradient-text-sunset">&amp; Support Hubs</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: 540, margin: "0.4rem auto 0 auto", lineHeight: 1.55, fontWeight: 400 }}>
            Dedicated engineering, support, and deployment centers powering educational harmony.
          </p>
        </div>

        <div className="about-offices-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.6rem"
        }}>
          {[
            {
              city: "Noida (Corporate HQ)",
              badge: "HQ & Engineering",
              addr: "123, Tech Park, Sector 62, Noida, UP 201309",
              phone: "+91 91234 56789",
              email: "support@schoolmitra.com",
              grad: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              tagColor: "#4f46e5",
              glow: "rgba(79, 70, 229, 0.15)"
            },
            {
              city: "Bengaluru (Tech Hub)",
              badge: "Cloud R&D Lab",
              addr: "45, Residency Road, Bengaluru, KA 560025",
              phone: "+91 98765 43210",
              email: "bengaluru@schoolmitra.com",
              grad: "linear-gradient(135deg, #0284c7, #06b6d4)",
              tagColor: "#0284c7",
              glow: "rgba(2, 132, 199, 0.15)"
            },
            {
              city: "Hyderabad (Support Hub)",
              badge: "24/7 Operations",
              addr: "Plot 12, Hitech City, Hyderabad, TS 500081",
              phone: "+91 95555 12345",
              email: "hyderabad@schoolmitra.com",
              grad: "linear-gradient(135deg, #059669, #10b981)",
              tagColor: "#059669",
              glow: "rgba(16, 185, 129, 0.15)"
            }
          ].map((off, idx) => (
            <div
              key={idx}
              className="colorful-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: 18,
                padding: "1.6rem 1.4rem",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
                "--card-top-gradient": off.grad,
                "--card-glow-color": off.glow
              } as React.CSSProperties}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: off.grad,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.12)"
                }}>
                  <Building2 size={20} />
                </div>
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: off.tagColor,
                  background: `${off.glow}`,
                  padding: "0.25rem 0.65rem",
                  borderRadius: "99px"
                }}>
                  {off.badge}
                </span>
              </div>

              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                {off.city}
              </h4>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, fontWeight: 400 }}>
                <MapPin size={16} color={off.tagColor} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{off.addr}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 500 }}>
                <Phone size={15} color="#10b981" style={{ flexShrink: 0 }} />
                <span>{off.phone}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 500 }}>
                <Mail size={15} color="#3b82f6" style={{ flexShrink: 0 }} />
                <span>{off.email}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ FINAL JOIN US CTA BANNER ═══════════ */}
      <section style={{ padding: "0 4% 70px 4%", background: "var(--bg-page)" }}>
        <div className="cta-banner-container" style={{
          maxWidth: 1200,
          margin: "0 auto",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #311042 75%, #0f172a 100%)",
          borderRadius: "26px",
          padding: "3.5rem 2rem",
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
          }} />

          <span style={{
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "#a5b4fc",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "1rem",
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
            <Sparkles size={13} color="#ec4899" /> JOIN 500+ FORWARD-THINKING SCHOOLS
          </span>

          <h2 style={{
            fontSize: "clamp(2rem, 3.4vw, 3rem)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "1rem",
            lineHeight: 1.2,
            position: "relative",
            zIndex: 1
          }}>
            Ready to Digitize Your <span className="gradient-text-sunset">School Campus?</span>
          </h2>

          <p style={{
            fontSize: "1rem",
            color: "#cbd5e1",
            maxWidth: 580,
            margin: "0 auto 2.2rem auto",
            lineHeight: 1.6,
            fontWeight: 400,
            position: "relative",
            zIndex: 1
          }}>
            Partner with SchoolMitra today. Get full onboarding assistance, hands-on staff training, and a 14-day zero-risk trial.
          </p>

          <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-vibrant-gradient"
              style={{
                padding: "0.9rem 2.4rem",
                borderRadius: "14px",
                fontSize: "0.98rem",
                fontWeight: 600
              }}
            >
              <Zap size={18} /> Request Campus Walkthrough
            </button>

            <Link
              href="/contact"
              style={{
                padding: "0.9rem 2rem",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.95rem",
                border: "1.5px solid rgba(255, 255, 255, 0.25)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              Contact Support <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />

      {/* Demo Booking Modal */}
      {modalOpen && <SchoolRegistrationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
