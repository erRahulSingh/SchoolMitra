"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, CheckCircle2, Users, Bus, FileText,
  TrendingUp, Clock, CreditCard, Sparkles, ChevronDown, Shield, Award,
  Smartphone, Activity, MapPin, Star, BarChart3, PieChart, Bell,
  Building2, Wallet, QrCode, CalendarCheck, ClipboardCheck, MessageCircle,
  Globe, Headphones, BookOpen, Calculator, ShieldCheck, Zap, Compass, Lock, Layers
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";

export default function SolutionsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"admin" | "parents" | "transport" | "teachers" | "trust">("admin");
  const [studentCount, setStudentCount] = useState(1000);
  const [openFaq, setOpenFaq] = useState(0);

  // ROI Calculator Calculations
  const hoursSavedPerMonth = Math.round(studentCount * 0.12);
  const feeRecoverySpeed = "3.5x Faster";
  const EstimatedCostSavedPerYear = (studentCount * 180).toLocaleString("en-IN");

  return (
    <div style={{
      background: "var(--bg-page)",
      color: "var(--text-main)",
      minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      overflowX: "hidden",
      WebkitFontSmoothing: "antialiased"
    }}>
      {/* ========== NAVBAR ========== */}
      <Navbar />

      {/* ========== HERO SECTION (COMPACT & SLEEK) ========== */}
      <section className="hero-wrapper solutions-hero-wrapper" style={{
        paddingTop: "110px",
        paddingBottom: "35px",
        paddingLeft: "5%",
        paddingRight: "5%",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated Glow Orbs */}
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

        <div style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "2.8rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1
        }}>
          <div className="solutions-hero-content">
            <div className="shimmer-badge" style={{ marginBottom: "1rem", padding: "0.3rem 0.85rem" }}>
              <Sparkles size={14} color="#8b5cf6" />
              <span className="gradient-text-vibrant" style={{ fontWeight: 600, fontSize: "0.82rem" }}>Tailored EdTech Solutions for Indian Schools</span>
              <span style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 700,
                padding: "0.12rem 0.45rem",
                borderRadius: "99px"
              }}>
                500+ CAMPUSES
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
              Complete Digital Ecosystem <span className="gradient-text-sunset">for Every Stakeholder</span>
            </h1>

            <p style={{
              fontSize: "1.02rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: "520px",
              marginBottom: "1.4rem",
              fontWeight: 400
            }}>
              From automated school ERP and online fee collection to real-time parent apps and live GPS bus tracking—SchoolMitra unifies campus operations in one secure cloud platform.
            </p>

            {/* Key Benefit Badges */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.6rem" }}>
              {[
                { label: "Zero Hardware Setup", icon: "✓", color: "#059669", bg: "rgba(16, 185, 129, 0.08)" },
                { label: "24/7 Dedicated Support", icon: "💬", color: "#4f46e5", bg: "rgba(79, 70, 229, 0.08)" },
                { label: "CBSE & ICSE Compliant", icon: "🏅", color: "#d97706", bg: "rgba(217, 119, 6, 0.08)" },
                { label: "Multi-Campus Ready", icon: "🌐", color: "#0284c7", bg: "rgba(2, 132, 199, 0.08)" }
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
                <Zap size={16} /> Request Custom School Pilot
              </button>

              <a
                href="#stakeholders"
                className="btn-colorful-outline"
                style={{
                  padding: "0.85rem 1.5rem",
                  borderRadius: "12px",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                <Compass size={16} color="#6366f1" /> Explore Stakeholder Portals ↓
              </a>
            </div>
          </div>

          {/* Right Hero Image Showcase */}
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
                src="/images/solutions-ecosystem-3d.png"
                alt="SchoolMitra Ecosystem"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>

            {/* Floating Badge */}
            <div className="anim-float-badge-1" style={{
              position: "absolute",
              bottom: "-12px",
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
              <ShieldCheck size={16} />
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700 }}>100% Unified Cloud</div>
                <div style={{ fontSize: "0.62rem", opacity: 0.9 }}>Web + Parent + Driver Apps</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== IMPACT & RELIABILITY METRICS STRIP ========== */}
      <section style={{ padding: "0 5% 40px 5%", maxWidth: "1240px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem"
        }}>
          {[
            { v: "500+", l: "Campuses Modernized", sub: "CBSE, ICSE, IB & State", icon: <Building2 size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#4f46e5" },
            { v: "99.8%", l: "On-Time Fee Recovery", sub: "Via automated WhatsApp SMS", icon: <Wallet size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #0284c7, #06b6d4)", color: "#0284c7" },
            { v: "2,50,000+", l: "Daily Active Parents", sub: "4.9 ★ Rating on Play Store", icon: <Users size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #d97706, #f59e0b)", color: "#d97706" },
            { v: "100%", l: "Zero Data Loss Guarantee", sub: "Bank-grade 256-bit SSL", icon: <Shield size={20} color="#ffffff" />, grad: "linear-gradient(135deg, #059669, #10b981)", color: "#059669" }
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
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 400 }}>{st.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 1: 5 DEDICATED STAKEHOLDER TABS ========== */}
      <section id="stakeholders" style={{ padding: "30px 5% 60px", maxWidth: "1240px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2.2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Users size={12} color="#8b5cf6" /> MULTI-STAKEHOLDER PORTAL
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
            marginBottom: "0.6rem"
          }}>
            Solutions Crafted <span className="gradient-text-sunset">for Every Role</span>
          </h2>
          <p style={{
            fontSize: "0.98rem",
            color: "var(--text-muted)",
            lineHeight: 1.55,
            fontWeight: 400
          }}>
            Click any stakeholder below to see tailored features and day-to-day workflow benefits.
          </p>
        </div>

        {/* 5 Tabs Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "2.4rem",
          flexWrap: "wrap"
        }}>
          {[
            { id: "admin", label: "For Principals & Admin", icon: <Building2 size={16} />, grad: "linear-gradient(135deg, #4f46e5, #7c3aed)" },
            { id: "parents", label: "For Parents & Guardians", icon: <Users size={16} />, grad: "linear-gradient(135deg, #0284c7, #06b6d4)" },
            { id: "transport", label: "For Transport & Fleet", icon: <Bus size={16} />, grad: "linear-gradient(135deg, #d97706, #f59e0b)" },
            { id: "teachers", label: "For Teachers & Faculty", icon: <GraduationCap size={16} />, grad: "linear-gradient(135deg, #059669, #10b981)" },
            { id: "trust", label: "For Education Trusts", icon: <Globe size={16} />, grad: "linear-gradient(135deg, #db2777, #ec4899)" }
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "0.55rem 1.3rem",
                  borderRadius: "10px",
                  border: active ? "none" : "1.5px solid var(--border-color)",
                  background: active ? tab.grad : "var(--bg-card)",
                  color: active ? "#ffffff" : "var(--text-main)",
                  fontWeight: 600,
                  fontSize: "0.86rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  boxShadow: active ? "0 4px 14px rgba(0,0,0,0.15)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>

        {/* Stakeholder Details Card */}
        <div className="colorful-card" style={{
          background: "var(--bg-card)",
          borderRadius: "24px",
          padding: "2.5rem",
          border: "1.5px solid var(--border-color)",
          boxShadow: "0 10px 35px rgba(15, 23, 42, 0.04)",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "2.8rem",
          alignItems: "center"
        }}>
          {activeTab === "admin" && (
            <>
              <div>
                <span className="shimmer-badge" style={{ marginBottom: "0.85rem", fontSize: "0.76rem" }}>
                  <Building2 size={12} color="#4f46e5" /> EXECUTIVE COMMAND CENTER
                </span>
                <h3 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem", lineHeight: 1.25 }}>
                  Total Administrative Control &amp; Zero Paperwork
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.4rem", fontWeight: 400 }}>
                  Automate student admissions, staff attendance, fee reconciliations, and academic compliance from a centralized dashboard.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.8rem" }}>
                  {[
                    "Automated fee collection with instant GST invoices & WhatsApp receipts",
                    "CBSE & ICSE grading calculation with 1-click digital marksheets",
                    "Teacher timetable allocation & automated staff substitution engine",
                    "Role-based permission security for accounts, front desk, and academic heads"
                  ].map((p, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.86rem", fontWeight: 600, color: "var(--text-main)" }}>
                      <CheckCircle2 size={16} color="#4f46e5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setModalOpen(true)} className="btn-vibrant-gradient" style={{ padding: "0.75rem 1.8rem", borderRadius: "12px", fontSize: "0.92rem", fontWeight: 600 }}>
                  Schedule Admin Portal Demo
                </button>
              </div>
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: "420px", borderRadius: "18px", overflow: "hidden", border: "1.5px solid var(--border-color)", boxShadow: "0 15px 40px rgba(0,0,0,0.12)" }}>
                  <img src="/images/hero-dashboard.png" alt="Admin Dashboard" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </>
          )}

          {activeTab === "parents" && (
            <>
              <div>
                <span className="shimmer-badge" style={{ marginBottom: "0.85rem", fontSize: "0.76rem" }}>
                  <Smartphone size={12} color="#0284c7" /> NATIVE MOBILE APPLICATION
                </span>
                <h3 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem", lineHeight: 1.25 }}>
                  Delight Parents with Live Updates &amp; Instant Fees
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.4rem", fontWeight: 400 }}>
                  Provide parents with live GPS bus tracking, instant fee settlements via UPI, and digital homework diary notifications.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.8rem" }}>
                  {[
                    "Live GPS bus location on map with automated pickup and drop alerts",
                    "1-click UPI and Netbanking fee payments with zero convenience fees",
                    "Daily homework feeds, exam datesheets, and digital report cards",
                    "Direct 1-on-1 teacher chat and school circular announcement feed"
                  ].map((p, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.86rem", fontWeight: 600, color: "var(--text-main)" }}>
                      <CheckCircle2 size={16} color="#0284c7" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setModalOpen(true)} className="btn-vibrant-gradient" style={{ padding: "0.75rem 1.8rem", borderRadius: "12px", fontSize: "0.92rem", fontWeight: 600 }}>
                  Try Parent App Showcase
                </button>
              </div>
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: "420px", borderRadius: "18px", overflow: "hidden", border: "1.5px solid var(--border-color)", boxShadow: "0 15px 40px rgba(0,0,0,0.12)" }}>
                  <img src="/images/parent-app-showcase.png" alt="Parent App" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </>
          )}

          {activeTab === "transport" && (
            <>
              <div>
                <span className="shimmer-badge" style={{ marginBottom: "0.85rem", fontSize: "0.76rem" }}>
                  <Bus size={12} color="#d97706" /> SATELLITE GPS &amp; FLEET TELEMETRY
                </span>
                <h3 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem", lineHeight: 1.25 }}>
                  Unmatched Student Safety &amp; Fuel Optimization
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.4rem", fontWeight: 400 }}>
                  Complete telemetry portal for fleet managers and bus drivers with automated route navigation and student RFID boarding logs.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.8rem" }}>
                  {[
                    "Driver navigation app with turn-by-turn route waypoint voice guidance",
                    "RFID boarding card scanning with instant parent arrival notification",
                    "Automated overspeed alerts and driver emergency SOS trigger",
                    "Fuel consumption logs and vehicle maintenance insurance trackers"
                  ].map((p, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.86rem", fontWeight: 600, color: "var(--text-main)" }}>
                      <CheckCircle2 size={16} color="#d97706" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setModalOpen(true)} className="btn-vibrant-gradient" style={{ padding: "0.75rem 1.8rem", borderRadius: "12px", fontSize: "0.92rem", fontWeight: 600 }}>
                  Schedule Transport Demo
                </button>
              </div>
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: "420px", borderRadius: "18px", overflow: "hidden", border: "1.5px solid var(--border-color)", boxShadow: "0 15px 40px rgba(0,0,0,0.12)" }}>
                  <img src="/images/gps-telemetry-bus-3d.png" alt="Fleet Telematics" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </>
          )}

          {activeTab === "teachers" && (
            <>
              <div>
                <span className="shimmer-badge" style={{ marginBottom: "0.85rem", fontSize: "0.76rem" }}>
                  <GraduationCap size={12} color="#059669" /> FACULTY EMPOWERMENT PORTAL
                </span>
                <h3 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem", lineHeight: 1.25 }}>
                  Save 15+ Hours Every Month on Paperwork
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.4rem", fontWeight: 400 }}>
                  Teachers take 1-tap roll-call attendance, attach PDF homework, grade exams with automated rank calculations, and publish report cards.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.8rem" }}>
                  {[
                    "10-second mobile attendance roll-call with automated absentee SMS",
                    "Digital homework assignments with PDF study material attachments",
                    "Automated grade calculation following CBSE and ICSE guidelines",
                    "Private parent messaging without sharing personal mobile numbers"
                  ].map((p, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.86rem", fontWeight: 600, color: "var(--text-main)" }}>
                      <CheckCircle2 size={16} color="#059669" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setModalOpen(true)} className="btn-vibrant-gradient" style={{ padding: "0.75rem 1.8rem", borderRadius: "12px", fontSize: "0.92rem", fontWeight: 600 }}>
                  Explore Teacher Suite
                </button>
              </div>
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: "420px", borderRadius: "18px", overflow: "hidden", border: "1.5px solid var(--border-color)", boxShadow: "0 15px 40px rgba(0,0,0,0.12)" }}>
                  <img src="/images/report-card-engine-3d.png" alt="Teacher Portal" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </>
          )}

          {activeTab === "trust" && (
            <>
              <div>
                <span className="shimmer-badge" style={{ marginBottom: "0.85rem", fontSize: "0.76rem" }}>
                  <Globe size={12} color="#db2777" /> MULTI-BRANCH ENTERPRISE GOVERNANCE
                </span>
                <h3 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem", lineHeight: 1.25 }}>
                  Consolidated Insights Across All School Campuses
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.4rem", fontWeight: 400 }}>
                  Manage multiple school chains under one central dashboard with branch financial comparison, consolidated fee collection, and central audit reports.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.8rem" }}>
                  {[
                    "Multi-campus cross-branch fee collection and revenue analytics",
                    "Centralized staff payroll and teacher reallocation management",
                    "Campus-wide student admissions tracking and conversion funnel",
                    "Enterprise SLA guarantee with dedicated account management team"
                  ].map((p, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.86rem", fontWeight: 600, color: "var(--text-main)" }}>
                      <CheckCircle2 size={16} color="#db2777" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setModalOpen(true)} className="btn-vibrant-gradient" style={{ padding: "0.75rem 1.8rem", borderRadius: "12px", fontSize: "0.92rem", fontWeight: 600 }}>
                  Contact Trust Governance Team
                </button>
              </div>
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: "420px", borderRadius: "18px", overflow: "hidden", border: "1.5px solid var(--border-color)", boxShadow: "0 15px 40px rgba(0,0,0,0.12)" }}>
                  <img src="/images/solutions-ecosystem-3d.png" alt="Multi-Branch Trust" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ========== SECTION 2: 8 DEEP ARCHITECTURE & WORKFLOW SHOWCASES ========== */}
      <section style={{ padding: "40px 5% 70px", maxWidth: "1240px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Layers size={12} color="#4f46e5" /> ARCHITECTURAL DEEP DIVE
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
            marginBottom: "0.6rem"
          }}>
            How SchoolMitra Powers <span className="gradient-text-sunset">Every Operation</span>
          </h2>
          <p style={{
            fontSize: "0.98rem",
            color: "var(--text-muted)",
            lineHeight: 1.55,
            fontWeight: 400
          }}>
            Explore our core technology frameworks designed to automate and simplify day-to-day campus tasks.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {[
            {
              num: "01",
              title: "4-Step Rapid Campus Onboarding",
              desc: "Migrate entire student and staff records in under 48 hours with automated CSV parsing and zero data loss.",
              bullets: ["Automated student roster & parent contact parsing", "Pre-configured fee slab structures & class sections", "Staff training webinars & video tutorials", "Dedicated onboarding specialist assigned"],
              img: "/images/workflow-onboarding-3d.png",
              tag: "Migration Suite",
              grad: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#4f46e5",
              reverse: false
            },
            {
              num: "02",
              title: "Smart UPI & Card Fee Engine",
              desc: "Automate fee collections with instant GST receipts, automated payment reminders, and zero reconciliation overhead.",
              bullets: ["Instant settlements via UPI, GPay, Paytm & Cards", "Custom installment plans & fine calculation rules", "WhatsApp reminder alerts with 1-click payment links", "Real-time fee collection & dues recovery dashboard"],
              img: "/images/fee-payment-engine-3d.png",
              tag: "Finance Automation",
              grad: "linear-gradient(135deg, #d97706, #f59e0b)",
              color: "#d97706",
              reverse: true
            },
            {
              num: "03",
              title: "Live GPS Bus Fleet Telematics",
              desc: "Real-time satellite GPS tracking with speed monitoring, RFID boarding check-ins, and accurate arrival ETAs.",
              bullets: ["Real-time satellite bus tracking on live maps", "Automated proximity alerts when bus approaches stop", "Emergency driver SOS triggers & speed notifications", "Fuel optimization & route playback analytics"],
              img: "/images/gps-telemetry-bus-3d.png",
              tag: "Transport Safety",
              grad: "linear-gradient(135deg, #0284c7, #06b6d4)",
              color: "#0284c7",
              reverse: false
            },
            {
              num: "04",
              title: "Exam & Report Card Generation",
              desc: "CBSE and ICSE grading formulas, rank list calculations, and 1-click marksheet printing.",
              bullets: ["Pre-configured CBSE, ICSE, and State Board formulas", "1-click bulk marksheet PDF generation with school crest", "Subject-wise performance analytics & class averages", "Secure digital report card publishing to Parent App"],
              img: "/images/report-card-engine-3d.png",
              tag: "Academic Engine",
              grad: "linear-gradient(135deg, #059669, #10b981)",
              color: "#059669",
              reverse: true
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="colorful-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: "22px",
                padding: "2.4rem",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 6px 25px rgba(15, 23, 42, 0.03)",
                display: "grid",
                gridTemplateColumns: item.reverse ? "1fr 1.15fr" : "1.15fr 1fr",
                gap: "2.5rem",
                alignItems: "center",
                "--card-top-gradient": item.grad,
                "--card-glow-color": "rgba(99, 102, 241, 0.12)"
              } as React.CSSProperties}
            >
              {item.reverse ? (
                <>
                  <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "100%", maxWidth: "420px", borderRadius: "16px", overflow: "hidden", border: "1.5px solid var(--border-color)", boxShadow: "0 12px 35px rgba(0,0,0,0.1)" }}>
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "auto", display: "block" }} />
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", padding: "0.2rem 0.55rem", borderRadius: "8px", background: `${item.color}15`, color: item.color, marginBottom: "0.75rem", display: "inline-block" }}>
                      STEP {item.num} • {item.tag}
                    </span>
                    <h3 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.65rem", lineHeight: 1.25 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.2rem", fontWeight: 400 }}>
                      {item.desc}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.4rem" }}>
                      {item.bullets.map((b, bIdx) => (
                        <div key={bIdx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)" }}>
                          <CheckCircle2 size={16} color={item.color} />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setModalOpen(true)} className="btn-vibrant-gradient" style={{ padding: "0.65rem 1.5rem", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600 }}>
                      Explore Module
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", padding: "0.2rem 0.55rem", borderRadius: "8px", background: `${item.color}15`, color: item.color, marginBottom: "0.75rem", display: "inline-block" }}>
                      STEP {item.num} • {item.tag}
                    </span>
                    <h3 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.65rem", lineHeight: 1.25 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.2rem", fontWeight: 400 }}>
                      {item.desc}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.4rem" }}>
                      {item.bullets.map((b, bIdx) => (
                        <div key={bIdx} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)" }}>
                          <CheckCircle2 size={16} color={item.color} />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setModalOpen(true)} className="btn-vibrant-gradient" style={{ padding: "0.65rem 1.5rem", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 600 }}>
                      Explore Module
                    </button>
                  </div>
                  <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "100%", maxWidth: "420px", borderRadius: "16px", overflow: "hidden", border: "1.5px solid var(--border-color)", boxShadow: "0 12px 35px rgba(0,0,0,0.1)" }}>
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "auto", display: "block" }} />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 3: INTERACTIVE ROI CALCULATOR ========== */}
      <section style={{ padding: "50px 5% 70px", background: "linear-gradient(180deg, var(--bg-subtle) 0%, var(--bg-page) 100%)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
              <Calculator size={12} color="#059669" /> INSTANT ROI ESTIMATOR
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
              Calculate Your School&apos;s <span className="gradient-text-sunset">Time &amp; Cost Savings</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.55, fontWeight: 400, marginTop: "0.4rem" }}>
              Slide to adjust your school strength and see estimated administrative hours and operational costs saved.
            </p>
          </div>

          <div className="colorful-card" style={{
            background: "var(--bg-card)",
            borderRadius: "22px",
            padding: "2.4rem",
            border: "1.5px solid var(--border-color)",
            boxShadow: "0 10px 35px rgba(15, 23, 42, 0.04)",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "2.5rem",
            alignItems: "center"
          }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)" }}>Total Enrolled Students:</span>
                <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", background: "rgba(79, 70, 229, 0.1)", padding: "0.2rem 0.75rem", borderRadius: "8px" }}>
                  {studentCount} Students
                </span>
              </div>

              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: "8px",
                  borderRadius: "5px",
                  background: "linear-gradient(90deg, #4f46e5, #ec4899)",
                  outline: "none",
                  cursor: "pointer",
                  marginBottom: "1.8rem"
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                  <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>Admin Hours Saved:</span>
                  <span style={{ fontWeight: 700, color: "#059669" }}>~{hoursSavedPerMonth} Hours / Month</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                  <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>Fee Recovery Acceleration:</span>
                  <span style={{ fontWeight: 700, color: "#0284c7" }}>{feeRecoverySpeed}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                  <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>Transport Efficiency Gain:</span>
                  <span style={{ fontWeight: 700, color: "#d97706" }}>+22% Fuel Savings</span>
                </div>
              </div>
            </div>

            <div style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
              borderRadius: "18px",
              padding: "1.8rem",
              color: "#ffffff",
              textAlign: "center",
              border: "1.5px solid rgba(139, 92, 246, 0.3)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
                ESTIMATED ANNUAL VALUE
              </div>
              <div style={{ fontSize: "2.4rem", fontWeight: 700, color: "#34d399", letterSpacing: "-0.02em", margin: "0.3rem 0" }}>
                ₹{EstimatedCostSavedPerYear}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#cbd5e1", fontWeight: 400, marginBottom: "1.4rem" }}>
                In saved admin overhead, paperless circulars &amp; automated dues recovery
              </div>
              <button onClick={() => setModalOpen(true)} className="btn-vibrant-gradient" style={{ width: "100%", padding: "0.75rem", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 600 }}>
                Get Detailed ROI Breakdown
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: FREQUENTLY ASKED QUESTIONS ========== */}
      <section id="faq" style={{ padding: "50px 5% 70px", background: "var(--bg-page)" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Sparkles size={12} color="#8b5cf6" /> FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            Frequently Asked <span className="gradient-text-sunset">Questions</span>
          </h2>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              q: "How does SchoolMitra integrate with existing school hardware and RFID gates?",
              a: "SchoolMitra provides seamless cloud API connectors that link directly with standard biometric devices, RFID gate scanners, and GPS vehicle tracking units with zero complex setup."
            },
            {
              q: "Can fee collection rules be customized for partial payments and scholarships?",
              a: "Yes! SchoolMitra fee engine allows custom fee installment slabs, sibling discounts, merit scholarships, and late fee fine rules with automated WhatsApp reminders."
            },
            {
              q: "What training and ongoing assistance is provided during onboarding?",
              a: "We provide complete onboarding support including teacher training workshops, administrative staff webinars, and 24/7 priority support via dedicated phone and WhatsApp channels."
            },
            {
              q: "Is SchoolMitra compliant with CBSE, ICSE, and State Board academic formats?",
              a: "Yes, our academic marksheet and exam management engine supports all CBSE, ICSE, IB, and State Board grading systems with automated rank list calculations."
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
                  <span>{item.q}</span>
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
                    padding: "0 1.2rem 1.1rem 1.2rem",
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
      </section>

      {/* ========== SECTION 5: COSMIC CTA BANNER ========== */}
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
              <Sparkles size={12} color="#ec4899" /> MODERN CAMPUS TRANSFORMATION
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
              maxWidth: "500px",
              lineHeight: 1.55
            }}>
              Join 500+ top Indian schools running smarter admissions, live bus safety, and automated fee collections with SchoolMitra.
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
                alt="SchoolMitra Campus"
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
