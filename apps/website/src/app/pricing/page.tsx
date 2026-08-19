"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap, Check, Star, Send, Award, Shield, Bus, Users, CreditCard,
  FileText, Smartphone, ChevronDown, Sparkles, BarChart3, Headphones,
  ArrowRight, CheckCircle2, MessageSquare, HardDrive, Code2, Video, Minus, Plus,
  Zap, Lock, Compass, HelpCircle
} from "lucide-react";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PricingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonialSlideGroups = [
    [
      {
        quote: "SchoolMitra has completely simplified our school management process. Live bus GPS tracking gives peace of mind to parents, and fee collections are now 95% automated!",
        name: "Dr. Priya Sharma",
        role: "Principal, Delhi Public Academy",
        city: "New Delhi",
        grad: "linear-gradient(135deg, #4f46e5, #7c3aed)",
        quoteColor: "#6366f1",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
      },
      {
        quote: "The customer onboarding and support team is outstanding! Fee recovery speed increased by 80% within the very first month of launching automated WhatsApp alerts.",
        name: "Mr. Rajesh Verma",
        role: "Administrator, Sunshine International",
        city: "Mumbai",
        grad: "linear-gradient(135deg, #059669, #10b981)",
        quoteColor: "#059669",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
      },
      {
        quote: "Everything we need in one single ecosystem—from smart RFID attendance to online fees and transport telematics. Highly recommended for all modern Indian schools!",
        name: "Ms. Anjali Mehta",
        role: "Director, Bright Future Global School",
        city: "Bengaluru",
        grad: "linear-gradient(135deg, #d97706, #f59e0b)",
        quoteColor: "#d97706",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
      }
    ],
    [
      {
        quote: "CBSE report card generation used to take weeks. With SchoolMitra, our teachers calculate grades and publish digital marksheet PDFs in under 15 minutes!",
        name: "Mr. Vikram Malhotra",
        role: "Senior Vice Principal, St. Xavier School",
        city: "Hyderabad",
        grad: "linear-gradient(135deg, #db2777, #ec4899)",
        quoteColor: "#db2777",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      {
        quote: "Managing multiple school branches was chaotic before SchoolMitra. Now our central trust board monitors cross-campus fee analytics from one single dashboard.",
        name: "Dr. Sanjay Singhania",
        role: "Chairman, Heritage Education Trust",
        city: "Gurugram",
        grad: "linear-gradient(135deg, #0284c7, #06b6d4)",
        quoteColor: "#0284c7",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
      },
      {
        quote: "The parent mobile app has eliminated front-office phone inquiries by 70%. Parents love the real-time bus alerts and 1-tap instant fee receipts.",
        name: "Mrs. Kavita Reddy",
        role: "Headmistress, Cambridge International",
        city: "Pune",
        grad: "linear-gradient(135deg, #0d9488, #14b8a6)",
        quoteColor: "#0d9488",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
      }
    ]
  ];

  // Auto-slide testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonialSlideGroups.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonialSlideGroups.length]);

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

        <div className="pricing-hero-grid" style={{
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
              <span className="gradient-text-vibrant" style={{ fontWeight: 600, fontSize: "0.82rem" }}>100% Transparent &amp; Predictable Pricing</span>
              <span style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 700,
                padding: "0.12rem 0.45rem",
                borderRadius: "99px"
              }}>
                ZERO HIDDEN FEES
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
              Choose the Perfect Plan <span className="gradient-text-sunset">for Your School</span>
            </h1>

            <p style={{
              fontSize: "1.02rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: "500px",
              marginBottom: "1.4rem",
              fontWeight: 400
            }}>
              Affordable, all-inclusive pricing tiers for institutions of all sizes. Switch plans or cancel anytime with zero lock-in penalties.
            </p>

            {/* Benefit Chips */}
            <div className="pricing-hero-badges" style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1.6rem"
            }}>
              {[
                { label: "Zero Setup Fees", icon: "✓", color: "#059669", bg: "rgba(16, 185, 129, 0.08)" },
                { label: "14-Day Free Pilot", icon: "⚡", color: "#4f46e5", bg: "rgba(79, 70, 229, 0.08)" },
                { label: "Cancel Anytime", icon: "🛡️", color: "#0284c7", bg: "rgba(2, 132, 199, 0.08)" },
                { label: "24/7 Support", icon: "💬", color: "#d97706", bg: "rgba(245, 158, 11, 0.08)" }
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

            {/* Action Buttons */}
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
                <Zap size={16} /> Request Free 14-Day Trial
              </button>

              <Link
                href="#compare"
                className="btn-colorful-outline"
                style={{
                  padding: "0.85rem 1.5rem",
                  borderRadius: 12,
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                <Compass size={16} color="#6366f1" /> Compare All Plans
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Showcase (Compact) */}
          <div className="showcase-container" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              position: "absolute",
              inset: "-12px",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(236, 72, 153, 0.18) 50%, rgba(6, 182, 212, 0.18) 100%)",
              borderRadius: "24px",
              filter: "blur(20px)",
              zIndex: 0
            }}></div>

            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "350px",
              borderRadius: "18px",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.35)",
              boxShadow: "0 15px 40px -8px rgba(67, 56, 202, 0.22)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/pricing-plans-mockup.png"
                alt="SchoolMitra Pricing Plans Showcase"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover"
                }}
              />
            </div>

            {/* Floating Live Badge */}
            <div className="anim-float-badge-1" style={{
              position: "absolute",
              bottom: "-10px",
              right: "-10px",
              background: "linear-gradient(135deg, #10b981, #06b6d4)",
              borderRadius: "10px",
              padding: "0.45rem 0.8rem",
              boxShadow: "0 8px 20px rgba(16, 185, 129, 0.25)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              zIndex: 3
            }}>
              <Sparkles size={14} />
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700 }}>Flat Predictable Rate</div>
                <div style={{ fontSize: "0.58rem", opacity: 0.9 }}>No Hidden Student Fees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BILLING TOGGLE SWITCH ========== */}
      <section style={{ padding: "10px 5% 40px 5%", background: "var(--bg-page)" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <div style={{
            background: "var(--bg-subtle)",
            padding: "0.35rem",
            borderRadius: "12px",
            border: "1.5px solid var(--border-color)",
            display: "inline-flex",
            gap: "0.4rem"
          }}>
            <button
              onClick={() => setIsYearly(false)}
              style={{
                padding: "0.55rem 1.5rem",
                borderRadius: "9px",
                border: "none",
                background: !isYearly ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "transparent",
                color: !isYearly ? "#ffffff" : "var(--text-muted)",
                fontWeight: 600,
                fontSize: "0.86rem",
                cursor: "pointer",
                boxShadow: !isYearly ? "0 3px 10px rgba(79, 70, 229, 0.25)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              style={{
                padding: "0.55rem 1.5rem",
                borderRadius: "9px",
                border: "none",
                background: isYearly ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "transparent",
                color: isYearly ? "#ffffff" : "var(--text-muted)",
                fontWeight: 600,
                fontSize: "0.86rem",
                cursor: "pointer",
                boxShadow: isYearly ? "0 3px 10px rgba(79, 70, 229, 0.25)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              Yearly (Save 20% 🎉)
            </button>
          </div>
        </div>
      </section>

      {/* ========== 3 TIERED COLORFUL PRICING CARDS ========== */}
      <section style={{ padding: "0 5% 60px 5%", maxWidth: "1220px", margin: "0 auto" }}>
        <div className="pricing-plans-cards-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          alignItems: "stretch"
        }}>
          {/* Card 1: Basic Plan (Purple Theme) */}
          <div className="colorful-card" style={{
            background: "var(--bg-card)",
            padding: "2.2rem 1.9rem",
            borderRadius: "24px",
            border: "1.5px solid rgba(139, 92, 246, 0.25)",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "--card-top-gradient": "linear-gradient(90deg, #7c3aed, #a855f7)",
            "--card-glow-color": "rgba(124, 58, 237, 0.15)"
          } as React.CSSProperties}>
            <div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "15px",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem",
                boxShadow: "0 6px 16px rgba(124, 58, 237, 0.25)"
              }}>
                <Send size={22} color="#ffffff" />
              </div>

              <h3 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.25rem" }}>
                Basic Starter
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "1.2rem", fontWeight: 400 }}>
                Ideal for growing single-campus primary schools
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
                  ₹{isYearly ? "3,999" : "4,999"}
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 500 }}>/month</span>
              </div>
              <div style={{ fontSize: "0.76rem", color: "#7c3aed", fontWeight: 600, marginBottom: "1.6rem" }}>
                {isYearly ? "Billed annually • Save ₹12,000/yr" : "Billed monthly"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.8rem" }}>
                {[
                  "Up to 250 Students Roster",
                  "15 Teacher & Staff Accounts",
                  "3 Live GPS Buses Tracking",
                  "Digital Attendance & SMS",
                  "Fee Collection Engine",
                  "Email & WhatsApp Support"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.86rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(124, 58, 237, 0.12)", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 }}>✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setModalOpen(true)} className="btn-colorful-outline" style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "0.9rem"
            }}>
              Start Free Trial
            </button>
          </div>

          {/* Card 2: Pro Plan (Featured Multi-Gradient & Glow) */}
          <div className="colorful-card" style={{
            background: "var(--bg-card)",
            padding: "2.4rem 1.9rem",
            borderRadius: "26px",
            border: "2px solid #6366f1",
            boxShadow: "0 20px 50px rgba(99, 102, 241, 0.22)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transform: "scale(1.02)",
            zIndex: 2,
            "--card-top-gradient": "linear-gradient(90deg, #4f46e5, #ec4899)",
            "--card-glow-color": "rgba(99, 102, 241, 0.25)"
          } as React.CSSProperties}>
            {/* Shimmering Badge */}
            <div style={{
              position: "absolute",
              top: -14,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)",
              color: "#ffffff",
              padding: "0.35rem 1.3rem",
              borderRadius: "99px",
              fontWeight: 700,
              fontSize: "0.75rem",
              boxShadow: "0 4px 14px rgba(236, 72, 153, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              letterSpacing: "0.02em"
            }}>
              <Star size={12} fill="#ffffff" /> MOST POPULAR SCHOOL CHOICE
            </div>

            <div>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: "16px",
                background: "linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem",
                boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)"
              }}>
                <Sparkles size={24} color="#ffffff" />
              </div>

              <h3 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.25rem" }}>
                Professional Suite
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "1.2rem", fontWeight: 400 }}>
                Complete platform for established K-12 institutes
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "2.6rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
                  ₹{isYearly ? "7,999" : "9,999"}
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 500 }}>/month</span>
              </div>
              <div style={{ fontSize: "0.76rem", color: "#ec4899", fontWeight: 700, marginBottom: "1.6rem" }}>
                {isYearly ? "Billed annually • Save ₹24,000/yr" : "Billed monthly"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.8rem" }}>
                {[
                  "Up to 1,200 Students Roster",
                  "Unlimited Teacher & Staff Accounts",
                  "12 Live GPS Buses Tracking",
                  "Parent Mobile App Full Access",
                  "Exams & Digital Report Cards",
                  "Automated WhatsApp Gateway",
                  "Priority 24/7 Dedicated Support"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.88rem", color: "var(--text-main)", fontWeight: 600 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #ec4899)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 }}>✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setModalOpen(true)} className="btn-vibrant-gradient" style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "14px",
              fontSize: "0.95rem",
              fontWeight: 600
            }}>
              Start 14-Day Free Pilot
            </button>
          </div>

          {/* Card 3: Enterprise Plan (Emerald & Cyan Theme) */}
          <div className="colorful-card" style={{
            background: "var(--bg-card)",
            padding: "2.2rem 1.9rem",
            borderRadius: "24px",
            border: "1.5px solid rgba(16, 185, 129, 0.25)",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "--card-top-gradient": "linear-gradient(90deg, #059669, #06b6d4)",
            "--card-glow-color": "rgba(16, 185, 129, 0.15)"
          } as React.CSSProperties}>
            <div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "15px",
                background: "linear-gradient(135deg, #059669, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.2rem",
                boxShadow: "0 6px 16px rgba(16, 185, 129, 0.25)"
              }}>
                <Award size={22} color="#ffffff" />
              </div>

              <h3 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.25rem" }}>
                Enterprise Chains
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "1.2rem", fontWeight: 400 }}>
                For multi-branch schools &amp; education trusts
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
                  ₹{isYearly ? "15,999" : "19,999"}
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 500 }}>/month</span>
              </div>
              <div style={{ fontSize: "0.76rem", color: "#059669", fontWeight: 600, marginBottom: "1.6rem" }}>
                {isYearly ? "Billed annually • Save ₹48,000/yr" : "Billed monthly"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.8rem" }}>
                {[
                  "Unlimited Students & Branches",
                  "Unlimited Buses & GPS Devices",
                  "Multi-Campus Super Admin Portal",
                  "Custom ERP API Integrations",
                  "Dedicated Account Manager",
                  "Custom Branded Parent App",
                  "99.99% Enterprise SLA"
                ].map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.86rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700 }}>✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setModalOpen(true)} className="btn-colorful-outline" style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "0.9rem"
            }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* ========== DETAILED FEATURE COMPARISON TABLE ========== */}
      <section id="compare" style={{ padding: "40px 5% 70px 5%", background: "var(--bg-page)", maxWidth: "1220px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2.2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Sparkles size={12} color="#8b5cf6" /> COMPLETE TRANSPARENCY
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
            fontWeight: 700,
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
            marginBottom: "0.6rem"
          }}>
            Compare Detailed Plan <span className="gradient-text-sunset">Features</span>
          </h2>
          <p style={{
            fontSize: "0.95rem",
            color: "var(--text-muted)",
            lineHeight: 1.55,
            fontWeight: 400
          }}>
            Explore every module and technical capability included in each tier.
          </p>
        </div>

        <div style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          border: "1.5px solid var(--border-color)",
          boxShadow: "0 6px 25px rgba(15, 23, 42, 0.03)",
          overflow: "hidden"
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ background: "var(--bg-subtle)", borderBottom: "1.5px solid var(--border-color)" }}>
                  <th style={{ padding: "1.1rem 1.4rem", fontWeight: 700, color: "var(--text-main)", width: "40%" }}>Feature Modules</th>
                  <th style={{ padding: "1.1rem 1rem", fontWeight: 700, color: "#7c3aed", textAlign: "center", width: "20%" }}>Basic Starter</th>
                  <th style={{ padding: "1.1rem 1rem", fontWeight: 700, color: "#4f46e5", textAlign: "center", width: "20%", background: "rgba(99, 102, 241, 0.06)" }}>Professional</th>
                  <th style={{ padding: "1.1rem 1rem", fontWeight: 700, color: "#059669", textAlign: "center", width: "20%" }}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: "Core Operations & Roster", items: [
                    { name: "Student Roster Capacity", b: "Up to 250", p: "Up to 1,200", e: "Unlimited" },
                    { name: "Teacher & Staff Logins", b: "15 Accounts", p: "Unlimited", e: "Unlimited" },
                    { name: "Parent Mobile App Access", b: "Limited", p: "Full Access", e: "Custom Branded" },
                    { name: "Digital Attendance & RFID", b: "✓", p: "✓", e: "✓" }
                  ]},
                  { cat: "Transport & Fleet Telematics", items: [
                    { name: "Live GPS Tracked Buses", b: "3 Buses", p: "12 Buses", e: "Unlimited" },
                    { name: "Turn-by-Turn Driver Navigation", b: "✓", p: "✓", e: "✓" },
                    { name: "Geofencing & SOS Alarms", b: "—", p: "✓", e: "✓" }
                  ]},
                  { cat: "Finance & Fee Automation", items: [
                    { name: "UPI, Cards & Netbanking Engine", b: "✓", p: "✓", e: "✓" },
                    { name: "WhatsApp Fee Receipts", b: "✓", p: "✓", e: "✓" },
                    { name: "Custom Installment Slabs", b: "—", p: "✓", e: "✓" }
                  ]},
                  { cat: "Academics & Examination", items: [
                    { name: "CBSE / ICSE Report Cards", b: "Standard", p: "Custom Templates", e: "Multi-Board Suite" },
                    { name: "Digital Marksheet PDF Generator", b: "✓", p: "✓", e: "✓" },
                    { name: "Homework & Timetable Engine", b: "✓", p: "✓", e: "✓" }
                  ]},
                  { cat: "Security & Enterprise Support", items: [
                    { name: "Support Channels", b: "Email & WhatsApp", p: "Priority 24/7", e: "Dedicated Manager" },
                    { name: "Multi-Campus Trust Super Admin", b: "—", p: "—", e: "✓" },
                    { name: "Service Level Agreement (SLA)", b: "99.5%", p: "99.9%", e: "99.99%" }
                  ]}
                ].map((section, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <tr style={{ background: "var(--bg-subtle)" }}>
                      <td colSpan={4} style={{ padding: "0.75rem 1.4rem", fontWeight: 700, fontSize: "0.82rem", color: "var(--text-main)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {section.cat}
                      </td>
                    </tr>
                    {section.items.map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "0.85rem 1.4rem", color: "var(--text-main)", fontWeight: 500 }}>{row.name}</td>
                        <td style={{ padding: "0.85rem 1rem", textAlign: "center", color: "var(--text-muted)", fontWeight: 500 }}>{row.b}</td>
                        <td style={{ padding: "0.85rem 1rem", textAlign: "center", color: "#4f46e5", fontWeight: 600, background: "rgba(99, 102, 241, 0.03)" }}>{row.p}</td>
                        <td style={{ padding: "0.85rem 1rem", textAlign: "center", color: "#059669", fontWeight: 600 }}>{row.e}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== 3-CARD SLIDING TESTIMONIALS CAROUSEL ========== */}
      <section style={{ padding: "30px 5% 70px 5%", maxWidth: "1220px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2.5rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Star size={12} color="#f59e0b" /> TRUSTED BY EDUCATORS
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
            fontWeight: 700,
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
            marginBottom: "0.6rem"
          }}>
            Loved by 500+ Indian School <span className="gradient-text-sunset">Principals &amp; Trusts</span>
          </h2>
          <p style={{
            fontSize: "0.95rem",
            color: "var(--text-muted)",
            lineHeight: 1.55,
            fontWeight: 400
          }}>
            Hear what school leaders and administrators say about SchoolMitra.
          </p>
        </div>

        {/* 3 Testimonials in Active Group */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.8rem",
          alignItems: "stretch"
        }}>
          {testimonialSlideGroups[testimonialIndex].map((t, idx) => (
            <div
              key={idx}
              className="colorful-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: "20px",
                padding: "1.8rem 1.6rem",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                "--card-top-gradient": t.grad,
                "--card-glow-color": "rgba(99, 102, 241, 0.12)"
              } as React.CSSProperties}
            >
              <div>
                <div style={{ display: "flex", gap: "0.2rem", color: "#f59e0b", marginBottom: "0.85rem" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <p style={{
                  fontSize: "0.88rem",
                  color: "var(--text-main)",
                  lineHeight: 1.6,
                  fontWeight: 400,
                  fontStyle: "italic",
                  marginBottom: "1.4rem"
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.95rem" }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${t.quoteColor}`
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-main)" }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>{t.role} • {t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.8rem" }}>
          {testimonialSlideGroups.map((_, i) => (
            <button
              key={i}
              onClick={() => setTestimonialIndex(i)}
              style={{
                width: testimonialIndex === i ? 24 : 8,
                height: 8,
                borderRadius: "4px",
                border: "none",
                background: testimonialIndex === i ? "linear-gradient(135deg, #4f46e5, #ec4899)" : "var(--border-color)",
                cursor: "pointer",
                transition: "all 0.25s ease"
              }}
            />
          ))}
        </div>
      </section>

      {/* ========== FREQUENTLY ASKED QUESTIONS ========== */}
      <section id="faq" style={{ padding: "40px 5% 70px 5%", background: "var(--bg-page)" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <HelpCircle size={12} color="#8b5cf6" /> COMMON PRICING QUESTIONS
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
            fontWeight: 700,
            color: "var(--text-main)",
            letterSpacing: "-0.02em"
          }}>
            Frequently Asked <span className="gradient-text-sunset">Questions</span>
          </h2>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              q: "Are there any hidden setup or data onboarding charges?",
              a: "Zero hidden charges. Setup, student database migration from CSV/Excel, and full staff onboarding workshops are 100% included in all our plans."
            },
            {
              q: "How does the 14-day free pilot work?",
              a: "You get full access to the complete Professional Suite. Our onboarding engineer uploads your sample student rosters so your staff and transport team can experience live operations."
            },
            {
              q: "Can we upgrade or downgrade our plan mid-session?",
              a: "Yes! You can upgrade your student capacity or change tiers anytime. Your invoice will be automatically pro-rated with zero cancellation penalties."
            },
            {
              q: "Do you offer multi-branch discounts for education trusts?",
              a: "Yes, our Enterprise Chains tier offers customized volume pricing, multi-branch consolidated billing, and dedicated account support for trusts operating 2 or more campuses."
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

      {/* ========== COSMIC CTA BANNER ========== */}
      <section style={{ padding: "0 5% 70px", maxWidth: "1220px", margin: "0 auto" }}>
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
              <Sparkles size={12} color="#ec4899" /> START YOUR TRANSFORMATION
            </span>

            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              marginBottom: "0.85rem",
              lineHeight: 1.2
            }}>
              Ready to Upgrade Your <span className="gradient-text-sunset">School Experience?</span>
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
              <Zap size={17} /> Start 14-Day Free Pilot
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
                alt="SchoolMitra Modern Campus"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <Footer />

      {/* Registration / Demo Modal */}
      {modalOpen && <SchoolRegistrationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
