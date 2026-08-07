"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, CheckCircle2, Users, Bus, FileText,
  TrendingUp, Clock, CreditCard, MessageSquare, Play, Sparkles,
  ChevronDown, Sun, Moon, Shield, Award, Smartphone, Activity,
  Phone, Mail, MapPin, Check, Star, BarChart3, PieChart, Bell,
  ChevronRight, Building2, Wallet, QrCode, CalendarCheck,
  ClipboardCheck, MessageCircle, Globe, Headphones, BookOpen,
  Calculator, ShieldCheck, Zap, Layers, RefreshCw, Lock, Cpu
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
      background: "var(--bg-main)",
      color: "var(--text-main)",
      minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      {/* ========== NAVBAR ========== */}
      <Navbar />

      {/* ========== HERO SECTION ========== */}
      <section className="hero-wrapper solutions-hero-wrapper" style={{
        padding: "130px 4% 80px 4%",
        maxWidth: "1320px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: "4rem",
        alignItems: "center"
      }}>
        <div className="hero-grid-container solutions-hero-content">
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.45rem 1rem",
            borderRadius: "99px",
            background: "rgba(67, 56, 202, 0.08)",
            color: "#4338ca",
            fontSize: "0.85rem",
            fontWeight: 800,
            marginBottom: "1.5rem",
            border: "1px solid rgba(67, 56, 202, 0.2)"
          }}>
            ❖ Tailored EdTech Solutions for Indian Schools
          </span>

          <h1 style={{
            fontSize: "clamp(2.5rem, 4.2vw, 3.8rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            color: "var(--text-main)",
            letterSpacing: "-0.03em",
            marginBottom: "1.4rem"
          }}>
            Complete Digital Ecosystem <span style={{ color: "#f97316" }}>for Every Stakeholder</span>
          </h1>

          <p style={{
            fontSize: "1.15rem",
            color: "var(--text-muted)",
            lineHeight: 1.65,
            maxWidth: "560px",
            marginBottom: "2.2rem",
            fontWeight: 500
          }}>
            From automated school ERP &amp; online fee collection to real-time parent apps and live GPS bus tracking—SchoolMitra unifies your entire campus operations in one secure cloud platform.
          </p>

          <div className="hero-cta-group" style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => window.location.href = "/auth?mode=signup"}
              style={{
                padding: "0.95rem 2.2rem",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
                color: "#ffffff",
                border: "none",
                fontWeight: 800,
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 12px 28px rgba(67, 56, 202, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem"
              }}
            >
              Book a Live Demo <ArrowRight size={18} />
            </button>

            <a
              href="#how-it-works"
              style={{
                padding: "0.95rem 1.8rem",
                borderRadius: "12px",
                background: "var(--bg-card)",
                color: "var(--text-main)",
                border: "1px solid var(--border-color)",
                fontWeight: 700,
                fontSize: "0.98rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              How It Works ↓
            </a>
          </div>

          {/* Key Quick Badges */}
          <div className="solutions-hero-badges" style={{ display: "flex", gap: "1.8rem", marginTop: "2.5rem", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-main)" }}>
              <CheckCircle2 size={18} color="#10b981" /> Zero Hardware Setup
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-main)" }}>
              <CheckCircle2 size={18} color="#10b981" /> 24/7 Dedicated Support
            </div>
          </div>
        </div>

        {/* Right Visual: 3D Solutions Ecosystem Image Showcase */}
        <div className="solutions-hero-image" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{
            position: "absolute",
            inset: "-20px",
            background: "linear-gradient(135deg, rgba(67, 56, 202, 0.25) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(139, 92, 246, 0.25) 100%)",
            borderRadius: "36px",
            filter: "blur(28px)",
            zIndex: 0
          }}></div>

          <div style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "580px",
            borderRadius: "26px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 60px -10px rgba(15, 23, 42, 0.35)",
            background: "var(--bg-card)"
          }}>
            <img
              src="/images/solutions-ecosystem-3d.png"
              alt="SchoolMitra Connected 3D Solutions Ecosystem Showcase"
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* ========== IMPACT METRICS RIBBON ========== */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        color: "#ffffff",
        padding: "2.5rem 4%",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div className="solutions-ribbon-grid" style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          textAlign: "center"
        }}>
          <div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#60a5fa" }}>500+</div>
            <div style={{ fontSize: "0.88rem", color: "#94a3b8", fontWeight: 600, marginTop: "0.2rem" }}>Schools Onboarded</div>
          </div>
          <div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#34d399" }}>2.5L+</div>
            <div style={{ fontSize: "0.88rem", color: "#94a3b8", fontWeight: 600, marginTop: "0.2rem" }}>Active Parents &amp; Students</div>
          </div>
          <div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#a78bfa" }}>60%</div>
            <div style={{ fontSize: "0.88rem", color: "#94a3b8", fontWeight: 600, marginTop: "0.2rem" }}>Administrative Time Saved</div>
          </div>
          <div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#f472b6" }}>₹15 Cr+</div>
            <div style={{ fontSize: "0.88rem", color: "#94a3b8", fontWeight: 600, marginTop: "0.2rem" }}>Automated Fee Collected</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8 DETAILED ARCHITECTURE & WORKFLOW SECTIONS WITH AI 3D ILLUSTRATIONS      */}
      {/* ========================================================================= */}

      {/* 📍 SECTION 1: HOW SCHOOLMITRA WORKS (4-STEP ONBOARDING PIPELINE) */}
      <section id="how-it-works" style={{ padding: "90px 4% 60px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#4338ca", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            SECTION 1 • STEP-BY-STEP WORKFLOW
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "var(--text-main)", marginTop: "0.4rem" }}>
            How SchoolMitra Operates <span style={{ color: "#f97316" }}>in Your Campus</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: "640px", margin: "0.5rem auto 0 auto" }}>
            Get your school fully digitalized in 4 seamless steps without disrupting daily classes or administration.
          </p>
        </div>

        <div className="solutions-section-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "4rem", alignItems: "center" }}>
          {/* Left Image Showcase */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              position: "absolute",
              inset: "-15px",
              background: "linear-gradient(135deg, rgba(67, 56, 202, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)",
              borderRadius: "32px",
              filter: "blur(24px)",
              zIndex: 0
            }}></div>
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
                src="/images/workflow-onboarding-3d.png"
                alt="SchoolMitra 4-Step Onboarding Workflow 3D Illustration"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right 4-Step Process List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              {
                num: "01",
                title: "Instant Cloud Data Import",
                desc: "Upload existing student rosters, staff accounts, and fee structures from Excel/CSV in under 15 minutes."
              },
              {
                num: "02",
                title: "Configure School Rules & Modules",
                desc: "Set up CBSE/ICSE exam grade scales, automated fee due dates, bus route stops, and staff permissions."
              },
              {
                num: "03",
                title: "Distribute Parent & Driver Mobile Apps",
                desc: "Send automated SMS & WhatsApp links with QR credentials to parents, teachers, and transport drivers."
              },
              {
                num: "04",
                title: "Live Campus Operation & Automation",
                desc: "Experience automated attendance, live GPS bus tracking, instant UPI fee receipts, and real-time alerts."
              }
            ].map((st, idx) => (
              <div key={idx} style={{
                background: "var(--bg-card)",
                borderRadius: "18px",
                padding: "1.2rem 1.5rem",
                border: "1px solid var(--border-color)",
                display: "flex",
                gap: "1.2rem",
                alignItems: "flex-start",
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)"
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #4338ca, #3b82f6)",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  {st.num}
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.2rem" }}>{st.title}</h4>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📍 SECTION 2: AUTOMATED SMART FEE ENGINE & UPI PAYMENT GATEWAY */}
      <section id="fee-engine" style={{ padding: "60px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="solutions-section-grid" style={{
          background: "linear-gradient(135deg, rgba(238, 242, 255, 0.95) 0%, rgba(243, 244, 255, 0.85) 100%)",
          borderRadius: "28px",
          padding: "3.5rem 3rem",
          border: "1px solid rgba(199, 210, 254, 0.6)",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "4rem",
          alignItems: "center"
        }}>
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#4338ca", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              SECTION 2 • FINANCIAL AUTOMATION
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0f172a", marginTop: "0.4rem", marginBottom: "1rem" }}>
              Smart Fee Collection <span style={{ color: "#f97316" }}>&amp; Instant UPI Receipts</span>
            </h2>
            <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "1.8rem" }}>
              Eliminate manual fee register maintenance and cash handling errors. Parents pay via Google Pay, PhonePe, UPI QR code, or Cards with instant PDF receipts sent to WhatsApp.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 800, color: "#4338ca", fontSize: "0.95rem" }}>💳 Multi-Gateway UPI</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.25rem" }}>Paytm, PhonePe, GPay, Credit/Debit cards &amp; NetBanking.</div>
              </div>
              <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 800, color: "#10b981", fontSize: "0.95rem" }}>💬 WhatsApp Reminders</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.25rem" }}>Automated due date alerts to parents before late fee applies.</div>
              </div>
              <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 800, color: "#3b82f6", fontSize: "0.95rem" }}>📊 Auto Reconciliation</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.25rem" }}>Bank statement matching with zero manual audit entries needed.</div>
              </div>
              <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 800, color: "#8b5cf6", fontSize: "0.95rem" }}>🧾 Instant PDF Receipts</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.25rem" }}>Downloadable tax &amp; fee receipts with unique digital signature.</div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "500px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 25px 50px -10px rgba(15, 23, 42, 0.2)",
              background: "#ffffff"
            }}>
              <img
                src="/images/fee-payment-engine-3d.png"
                alt="SchoolMitra Automated Fee Engine 3D Illustration"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 📍 SECTION 3: LIVE GPS TELEMETRY & SMART SCHOOL BUS SAFETY NETWORK */}
      <section id="transport" style={{ padding: "60px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="solutions-section-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "4rem", alignItems: "center" }}>
          {/* Left Image Showcase */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "500px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 50px -10px rgba(15, 23, 42, 0.25)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/gps-telemetry-bus-3d.png"
                alt="SchoolMitra GPS Bus Telemetry 3D Illustration"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right Details */}
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              SECTION 3 • TRANSPORT TELEMETRY
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "var(--text-main)", marginTop: "0.4rem", marginBottom: "1rem" }}>
              Real-Time GPS Bus Telemetry <span style={{ color: "#f97316" }}>&amp; Driver Safety App</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "1.8rem" }}>
              Keep parents informed and students safe with live route tracking, driver speed enforcement, geofence safe zones, and 1-tap emergency panic dispatch.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>📍</div>
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-main)" }}>Live Bus Map &amp; ETA for Parents</h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>Parents view exact bus location on smartphone map with precise arrival ETA.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(239, 68, 68, 0.12)", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>🚨</div>
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-main)" }}>Driver Emergency Panic SOS</h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>1-tap driver alert notifies school admin and parents immediately during traffic or breakdown.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>🛡️</div>
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-main)" }}>Speed Violation &amp; Geofence Alerts</h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>Instant alerts if driver exceeds safe speed limits or veers off authorized route.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📍 SECTION 4: CBSE & ICSE AUTOMATED REPORT CARD ENGINE */}
      <section id="report-cards" style={{ padding: "60px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="solutions-section-grid" style={{
          background: "linear-gradient(135deg, rgba(245, 243, 255, 0.95) 0%, rgba(238, 242, 255, 0.85) 100%)",
          borderRadius: "28px",
          padding: "3.5rem 3rem",
          border: "1px solid rgba(221, 214, 254, 0.6)",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "4rem",
          alignItems: "center"
        }}>
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              SECTION 4 • ACADEMIC EVALUATION
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#1e1b4b", marginTop: "0.4rem", marginBottom: "1rem" }}>
              CBSE &amp; ICSE Automated <span style={{ color: "#f97316" }}>Report Card Engine</span>
            </h2>
            <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "1.8rem" }}>
              Teachers upload subject marks; SchoolMitra automatically calculates total grades, rank, percentage, and generates beautiful PDF report cards aligned with board standards.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 800, color: "#8b5cf6" }}>🏅 Grade &amp; Rank Rules</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.2rem" }}>Configure custom grade scale percentages &amp; pass criteria.</div>
              </div>
              <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 800, color: "#3b82f6" }}>📄 1-Click PDF Generation</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.2rem" }}>Generate 1,000+ report cards simultaneously with school logo.</div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "500px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 25px 50px -10px rgba(15, 23, 42, 0.2)",
              background: "#ffffff"
            }}>
              <img
                src="/images/report-card-engine-3d.png"
                alt="SchoolMitra CBSE Report Card Engine 3D Illustration"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 📍 SECTION 5: DIGITAL ATTENDANCE & GATE SECURITY */}
      <section id="school-erp" style={{ padding: "60px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="solutions-section-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "4rem", alignItems: "center" }}>
          {/* Left Image Showcase */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "500px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 50px -10px rgba(15, 23, 42, 0.25)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/parent-app-showcase.png"
                alt="SchoolMitra Digital Attendance Showcase"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right Details */}
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              SECTION 5 • GATE SECURITY &amp; ATTENDANCE
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "var(--text-main)", marginTop: "0.4rem", marginBottom: "1rem" }}>
              Biometric, RFID &amp; <span style={{ color: "#f97316" }}>Digital Attendance Network</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "1.8rem" }}>
              When a student taps their RFID card or a teacher marks roll call, an instant SMS &amp; App alert is delivered to parents guaranteeing child safety.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "var(--bg-card)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <div style={{ fontWeight: 800, color: "#3b82f6" }}>📲 Instant SMS &amp; App Push</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Parent receives alert at 08:15 AM: &quot;Child reached school&quot;.</div>
              </div>
              <div style={{ background: "var(--bg-card)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <div style={{ fontWeight: 800, color: "#10b981" }}>📅 Teacher Leave Portal</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Digital leave applications with principal approval workflow.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📍 SECTION 6: PARENT-TEACHER COMMUNICATION & HOMEWORK PORTAL */}
      <section id="parent-app" style={{ padding: "60px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="solutions-section-grid" style={{
          background: "linear-gradient(135deg, rgba(236, 253, 245, 0.95) 0%, rgba(209, 250, 229, 0.85) 100%)",
          borderRadius: "28px",
          padding: "3.5rem 3rem",
          border: "1px solid rgba(167, 243, 208, 0.6)",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "4rem",
          alignItems: "center"
        }}>
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#059669", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              SECTION 6 • PARENT ENGAGEMENT
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#064e3b", marginTop: "0.4rem", marginBottom: "1rem" }}>
              Seamless Parent-Teacher <span style={{ color: "#f97316" }}>Collaboration</span>
            </h2>
            <p style={{ color: "#334155", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "1.8rem" }}>
              Teachers publish daily homework with PDF attachments, class circulars, and exam timetables. Parents can send direct queries to class teachers.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 800, color: "#059669" }}>📚 Daily Homework Files</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.2rem" }}>Subject-wise assignment attachments &amp; submission tracker.</div>
              </div>
              <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 800, color: "#3b82f6" }}>📢 Digital Notice Board</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.2rem" }}>Broadcast school holidays, PTM dates, &amp; sports day updates.</div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "480px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 25px 50px -10px rgba(15, 23, 42, 0.2)",
              background: "#ffffff"
            }}>
              <img
                src="/images/faq-illustration.png"
                alt="SchoolMitra Parent Teacher Communication 3D Illustration"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 📍 SECTION 7: BANK-GRADE SECURITY & CLOUD COMPLIANCE */}
      <section id="security" style={{ padding: "60px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="solutions-section-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "4rem", alignItems: "center" }}>
          {/* Left Image Showcase */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "480px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 50px -10px rgba(15, 23, 42, 0.25)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/pricing-faq-illustration.png"
                alt="SchoolMitra Security & Cloud Compliance 3D Illustration"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right Details */}
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ec4899", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              SECTION 7 • CLOUD &amp; DATA SECURITY
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "var(--text-main)", marginTop: "0.4rem", marginBottom: "1rem" }}>
              Bank-Grade Encryption <span style={{ color: "#f97316" }}>&amp; ISO-27001 Certified Security</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "1.8rem" }}>
              Your school data is encrypted at rest and in transit. Automated daily off-site backups ensure your records are never lost.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "var(--bg-card)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <div style={{ fontWeight: 800, color: "#ec4899" }}>🔒 256-Bit SSL Encryption</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Same cryptographic security as global banking apps.</div>
              </div>
              <div style={{ background: "var(--bg-card)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <div style={{ fontWeight: 800, color: "#10b981" }}>☁️ Daily Offsite Backups</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Automated daily snapshots stored across isolated cloud regions.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📍 SECTION 8: MULTI-BRANCH TRUST GOVERNANCE & CENTRAL DASHBOARD */}
      <section id="multi-branch" style={{ padding: "60px 4% 90px 4%", maxWidth: "1320px", margin: "0 auto" }}>
        <div className="solutions-section-grid" style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          color: "#ffffff",
          borderRadius: "28px",
          padding: "3.5rem 3rem",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "4rem",
          alignItems: "center"
        }}>
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              SECTION 8 • TRUST &amp; MULTI-BRANCH GOVERNANCE
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#ffffff", marginTop: "0.4rem", marginBottom: "1rem" }}>
              Multi-Branch Command Center <span style={{ color: "#f97316" }}>for Educational Trusts</span>
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "1.8rem" }}>
              Super Admin panel enables trust chairmen and directors to manage 2 to 50+ school campuses, compare branch revenues, and reallocate staff instantly.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <div style={{ fontWeight: 800, color: "#a78bfa" }}>🌐 Multi-School Dashboard</div>
                <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: "0.2rem" }}>Switch between branch campuses in 1-click.</div>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <div style={{ fontWeight: 800, color: "#34d399" }}>📈 Consolidated Financials</div>
                <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: "0.2rem" }}>Unified P&amp;L, pending fee audits, &amp; expense reports.</div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "480px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 50px -10px rgba(0, 0, 0, 0.5)",
              background: "#0f172a"
            }}>
              <img
                src="/images/smart-school-cta.png"
                alt="SchoolMitra Multi Branch Trust Dashboard 3D Illustration"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== STAKEHOLDER TAB SWITCHER MATRIX SECTION ========== */}
      <section id="solutions-matrix" style={{ padding: "30px 4% 60px 4%", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "var(--text-main)" }}>
            Solutions Designed <span style={{ color: "#f97316" }}>for Every Stakeholder</span>
          </h2>
        </div>

        {/* Tab Buttons Bar */}
        <div className="solutions-tab-buttons" style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.8rem",
          flexWrap: "wrap",
          marginBottom: "3rem"
        }}>
          {[
            { id: "admin", label: "🏫 School Principals & Admin", color: "#4338ca" },
            { id: "parents", label: "👨‍👩‍👧 Parents & Guardians", color: "#3b82f6" },
            { id: "transport", label: "🚌 Fleet & Transport Managers", color: "#10b981" },
            { id: "teachers", label: "🎓 Teachers & Staff", color: "#8b5cf6" },
            { id: "trust", label: "👑 School Trusts & Super Admin", color: "#ec4899" }
          ].map((tb) => (
            <button
              key={tb.id}
              onClick={() => setActiveTab(tb.id as any)}
              style={{
                padding: "0.85rem 1.6rem",
                borderRadius: "14px",
                border: activeTab === tb.id ? `2px solid ${tb.color}` : "1px solid var(--border-color)",
                background: activeTab === tb.id ? tb.color : "var(--bg-card)",
                color: activeTab === tb.id ? "#ffffff" : "var(--text-main)",
                fontWeight: 800,
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: activeTab === tb.id ? `0 10px 25px ${tb.color}40` : "none",
                transition: "all 0.2s ease"
              }}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="solutions-tab-content-box" style={{
          background: "var(--bg-card)",
          borderRadius: "28px",
          padding: "3.5rem 3rem",
          border: "1px solid var(--border-color)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.04)"
        }}>
          {activeTab === "admin" && (
            <div className="solutions-tab-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3.5rem", alignItems: "center" }}>
              <div>
                <span style={{ color: "#4338ca", fontWeight: 800, fontSize: "0.88rem" }}>FOR SCHOOL PRINCIPALS &amp; MANAGEMENT</span>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", margin: "0.4rem 0 1.2rem 0" }}>
                  Automate Campus Governance &amp; Administrative Workflows
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "2rem" }}>
                  Streamline student admissions, fee collection, staff payroll, CBSE/ICSE report cards, and digital attendance with zero paperwork.
                </p>

                <div className="solutions-tab-features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    "1-Click CBSE Grade Cards",
                    "Automated Fee Receipts & UPI",
                    "Student Attendance & SMS Alerts",
                    "Teacher Payroll & Leave Tracker",
                    "Digital ID Cards & QR Scanner",
                    "Real-Time Revenue Analytics"
                  ].map((ft, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.92rem", fontWeight: 700, color: "var(--text-main)" }}>
                      <CheckCircle2 size={18} color="#4338ca" /> {ft}
                    </div>
                  ))}
                </div>
              </div>

              <div className="solutions-tab-side-card" style={{ background: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)", borderRadius: "20px", padding: "2rem", border: "1px solid #c7d2fe" }}>
                <div style={{ fontWeight: 800, color: "#1e1b4b", fontSize: "1.1rem", marginBottom: "1rem" }}>⚡ Key Principal Benefits</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight: 800, color: "#4338ca" }}>Zero Cash Leakage</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.2rem" }}>Instant UPI gateway reconciliation ensures 100% transparent fee collection.</div>
                  </div>
                  <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight: 800, color: "#10b981" }}>95% Faster Report Cards</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.2rem" }}>Auto-calculate marks, grades, and remarks based on CBSE/ICSE patterns.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "parents" && (
            <div className="solutions-tab-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3.5rem", alignItems: "center" }}>
              <div>
                <span style={{ color: "#3b82f6", fontWeight: 800, fontSize: "0.88rem" }}>FOR PARENTS &amp; GUARDIANS</span>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", margin: "0.4rem 0 1.2rem 0" }}>
                  Complete Peace of Mind on Your Smartphone
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "2rem" }}>
                  Parents get real-time bus location tracking, instant fee payment, homework updates, exam schedules, and direct teacher communication.
                </p>

                <div className="solutions-tab-features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    "Live Bus Location on Map",
                    "Pickup & Drop Notifications",
                    "Online Fee Payment & History",
                    "Daily Homework & Assignments",
                    "Online Leave Application",
                    "Teacher Direct Messaging"
                  ].map((ft, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.92rem", fontWeight: 700, color: "var(--text-main)" }}>
                      <CheckCircle2 size={18} color="#3b82f6" /> {ft}
                    </div>
                  ))}
                </div>
              </div>

              <div className="solutions-tab-side-card" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", borderRadius: "20px", padding: "2rem", border: "1px solid #bae6fd" }}>
                <div style={{ fontWeight: 800, color: "#0369a1", fontSize: "1.1rem", marginBottom: "1rem" }}>📱 Mobile App Highlights</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight: 800, color: "#3b82f6" }}>4.9★ Parent Rating</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.2rem" }}>Loved by 2,50,000+ parents for clean UI and real-time push alerts.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "transport" && (
            <div className="solutions-tab-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3.5rem", alignItems: "center" }}>
              <div>
                <span style={{ color: "#10b981", fontWeight: 800, fontSize: "0.88rem" }}>FOR TRANSPORT IN-CHARGES &amp; DRIVERS</span>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", margin: "0.4rem 0 1.2rem 0" }}>
                  Smart Fleet GPS Telemetry &amp; Student Bus Safety
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "2rem" }}>
                  Dedicated Driver App for live navigation, automatic student boarding check-in, speed alerts, and emergency SOS dispatch.
                </p>
              </div>

              <div className="solutions-tab-side-card" style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", borderRadius: "20px", padding: "2rem", border: "1px solid #a7f3d0" }}>
                <div style={{ fontWeight: 800, color: "#065f46", fontSize: "1.1rem", marginBottom: "1rem" }}>🚌 Fleet Control</div>
                <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "12px" }}>
                  <div style={{ fontWeight: 800, color: "#10b981" }}>Instant Panic Button</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.2rem" }}>1-tap driver SOS alerts school admin &amp; parents.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "teachers" && (
            <div className="solutions-tab-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3.5rem", alignItems: "center" }}>
              <div>
                <span style={{ color: "#8b5cf6", fontWeight: 800, fontSize: "0.88rem" }}>FOR TEACHERS &amp; EDUCATORS</span>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", margin: "0.4rem 0 1.2rem 0" }}>
                  Save 15+ Hours Every Week on Routine Tasks
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.65, marginBottom: "2rem" }}>
                  Empower educators to focus on teaching rather than administrative paperwork.
                </p>
              </div>
              <div className="solutions-tab-side-card" style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)", borderRadius: "20px", padding: "2rem" }}>
                <div style={{ fontWeight: 800, color: "#5b21b6" }}>🎓 Fast Marks Entry</div>
                <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.2rem" }}>Automatic grade calculation.</div>
              </div>
            </div>
          )}

          {activeTab === "trust" && (
            <div className="solutions-tab-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3.5rem", alignItems: "center" }}>
              <div>
                <span style={{ color: "#ec4899", fontWeight: 800, fontSize: "0.88rem" }}>FOR SCHOOL TRUSTS</span>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", margin: "0.4rem 0 1.2rem 0" }}>
                  Multi-Branch Command Center
                </h3>
              </div>
              <div className="solutions-tab-side-card" style={{ background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)", borderRadius: "20px", padding: "2rem" }}>
                <div style={{ fontWeight: 800, color: "#9d174d" }}>👑 Global Analytics</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========== INTERACTIVE ROI CALCULATOR WIDGET ========== */}
      <section style={{ padding: "40px 4% 90px 4%", maxWidth: "1280px", margin: "0 auto" }}>
        <div className="solutions-roi-calculator-box" style={{
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)",
          borderRadius: "28px",
          padding: "4rem 3.5rem",
          color: "#ffffff",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: "4rem",
          alignItems: "center"
        }}>
          <div>
            <span style={{
              padding: "0.35rem 0.85rem",
              borderRadius: "99px",
              background: "rgba(59, 130, 246, 0.2)",
              color: "#60a5fa",
              fontSize: "0.8rem",
              fontWeight: 800,
              border: "1px solid rgba(59, 130, 246, 0.3)"
            }}>
              🧮 Interactive ROI Calculator
            </span>

            <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "#ffffff", marginTop: "1rem", marginBottom: "1rem", lineHeight: 1.2 }}>
              Calculate Your School&apos;s <span style={{ color: "#f97316" }}>Estimated Savings</span>
            </h2>

            <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2.2rem" }}>
              Drag the slider below to select your school&apos;s total student strength and discover how much time and money SchoolMitra can save your campus every month.
            </p>

            {/* Slider Control */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "0.8rem" }}>
                <span>Student Strength:</span>
                <span style={{ color: "#60a5fa", fontSize: "1.2rem", fontWeight: 800 }}>{studentCount} Students</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={studentCount}
                onChange={(e) => setStudentCount(parseInt(e.target.value))}
                style={{
                  width: "100%",
                  height: "8px",
                  borderRadius: "4px",
                  background: "#334155",
                  outline: "none",
                  cursor: "pointer"
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b", marginTop: "0.4rem" }}>
                <span>200 Students</span>
                <span>2,500</span>
                <span>5,000+ Students</span>
              </div>
            </div>
          </div>

          {/* Calculator Output Display Box */}
          <div style={{
            background: "rgba(255, 255, 255, 0.06)",
            borderRadius: "24px",
            padding: "2.5rem",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem"
          }}>
            <div style={{ background: "#0f172a", padding: "1.4rem", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <Clock size={24} color="#60a5fa" style={{ marginBottom: "0.5rem" }} />
              <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 700 }}>Admin Hours Saved</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", marginTop: "0.2rem" }}>{hoursSavedPerMonth} hrs/mo</div>
            </div>

            <div style={{ background: "#0f172a", padding: "1.4rem", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <Zap size={24} color="#34d399" style={{ marginBottom: "0.5rem" }} />
              <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 700 }}>Fee Recovery Speed</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#34d399", marginTop: "0.2rem" }}>{feeRecoverySpeed}</div>
            </div>

            <div style={{ background: "#0f172a", padding: "1.4rem", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)", gridColumn: "span 2" }}>
              <ShieldCheck size={24} color="#a78bfa" style={{ marginBottom: "0.5rem" }} />
              <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 700 }}>Estimated Annual Administrative Cost Saved</div>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#a78bfa", marginTop: "0.2rem" }}>₹{EstimatedCostSavedPerYear} / year</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.4rem" }}>*Calculated based on average paper, SMS, and manual labor savings across 500+ schools.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section style={{ padding: "40px 4% 90px 4%", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "var(--text-main)" }}>Frequently Asked <span style={{ color: "#f97316" }}>Questions</span></h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            {
              q: "How long does it take to implement SchoolMitra in our school?",
              a: "Most schools go live within 24 to 48 hours! Our dedicated onboarding team handles student roster imports, class setup, fee structure configuration, and staff training at zero extra cost."
            },
            {
              q: "Do we need to buy extra hardware for GPS bus tracking?",
              a: "Not necessarily! Drivers can simply use our SchoolMitra Driver App on any standard Android smartphone. Alternatively, if your buses already have hardware GPS trackers, we can integrate directly via API."
            },
            {
              q: "Is our school data secure and compliant?",
              a: "Yes! SchoolMitra uses bank-grade 256-bit SSL encryption, ISO-27001 certified cloud infrastructure, and automated daily data backups."
            },
            {
              q: "Can parents pay school fees online using UPI & Debit Cards?",
              a: "Yes! Parents can pay instantly via UPI (Google Pay, PhonePe, Paytm), Net Banking, or Credit/Debit Cards directly inside the Parent App, with instant digital receipts."
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: "var(--bg-card)",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              overflow: "hidden"
            }}>
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                style={{
                  width: "100%",
                  padding: "1.25rem 1.6rem",
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "var(--text-main)",
                  fontWeight: 700,
                  fontSize: "1.05rem"
                }}
              >
                <span>{item.q}</span>
                <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#3b82f6" }}>
                  {openFaq === idx ? "−" : "+"}
                </span>
              </button>
              {openFaq === idx && (
                <div style={{ padding: "0 1.6rem 1.4rem 1.6rem", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.65 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========== FINAL CTA BANNER ========== */}
      <section style={{ padding: "20px 4% 90px 4%", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          borderRadius: "28px",
          padding: "4rem",
          textAlign: "center",
          color: "#ffffff",
          boxShadow: "0 25px 60px rgba(37, 99, 235, 0.35)"
        }}>
          <h2 style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 800, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Ready to Digitalize <span style={{ color: "#f97316" }}>Your School Campus?</span>
          </h2>
          <p style={{ fontSize: "1.15rem", color: "rgba(255, 255, 255, 0.9)", maxWidth: "620px", margin: "0 auto 2.2rem auto", lineHeight: 1.65 }}>
            Join 500+ leading K-12 schools leveraging SchoolMitra. Book a 1-on-1 personalized demo tailored to your school&apos;s requirements.
          </p>
          <button
            onClick={() => window.location.href = "/auth?mode=signup"}
            style={{
              padding: "1.05rem 2.6rem",
              borderRadius: "14px",
              background: "#ffffff",
              color: "#1d4ed8",
              border: "none",
              fontWeight: 800,
              fontSize: "1.05rem",
              cursor: "pointer",
              boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem"
            }}
          >
            Schedule Free Demo <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ========== SUPER PREMIUM FOOTER ========== */}
      <Footer />

      {/* Demo Modal */}
      {modalOpen && <SchoolRegistrationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
