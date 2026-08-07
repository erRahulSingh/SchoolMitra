"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap, Check, Star, Send, Award, Shield, Bus, Users, CreditCard,
  FileText, Smartphone, ChevronDown, Sun, Moon, Sparkles, BarChart3, Headphones,
  ArrowRight, CheckCircle2, MessageSquare, HardDrive, Code2, Video, Minus, Plus
} from "lucide-react";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PricingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonialsList = [
    {
      quote: "SchoolMitra has simplified our entire school management process. The bus tracking and parent communication features are excellent!",
      name: "Dr. Priya Sharma",
      role: "Principal, Delhi Public School",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "The support team is amazing! Our experience with SchoolMitra has been outstanding. Fee recovery speed increased significantly.",
      name: "Mr. Rajesh Verma",
      role: "Administrator, Sunshine School",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "Everything we need in one platform - from attendance to fees to transport. Highly recommended for any school management!",
      name: "Ms. Anjali Mehta",
      role: "Director, Bright Future Academy",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "CBSE report card generation used to take weeks. With SchoolMitra, our teachers publish all grade sheets in under an hour!",
      name: "Mr. Vikram Malhotra",
      role: "Senior Vice Principal, St. Xavier School",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Auto-slide testimonials every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonialsList.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [testimonialsList.length]);

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

        <div className="pricing-hero-grid" style={{
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
              Choose the Perfect Plan <span style={{ color: "#f97316" }}>for Your School</span>
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

            <div className="pricing-hero-badges" style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
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

          {/* Right Column: Visual Showcase using AI Generated High-Res Image */}
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
                src="/images/hero-dashboard.png"
                alt="SchoolMitra ERP Dashboard & Mobile App Showcase"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover"
                }}
              />
            </div>

            {/* Floating Trusted Badge - Bottom Right */}
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
                <div style={{ fontSize: "0.75rem", fontWeight: 800 }}>Trusted by 500+ Schools</div>
                <div style={{ fontSize: "0.62rem", color: "#94a3b8", fontWeight: 600 }}>Simple & Transparent Pricing</div>
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
        <div className="pricing-plans-cards-grid" style={{
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

            <button onClick={() => window.location.href = "/auth?mode=signup"} style={{
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
              cursor: "pointer",
              transition: "all 0.25s ease"
            }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* ========== COMPARE PLANS TABLE SECTION (IMAGE 1) ========== */}
      <section className="pricing-compare-section" style={{ padding: "60px 4% 90px 4%", maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "2.4rem",
          fontWeight: 800,
          textAlign: "center",
          color: "var(--text-main)",
          marginBottom: "2.5rem",
          letterSpacing: "-0.02em"
        }}>
          Compare <span style={{ color: "#f97316" }}>Plans</span>
        </h2>

        <div className="pricing-compare-table-container" style={{
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
            Powerful <span style={{ color: "#f97316" }}>Add-ons</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", fontWeight: 500 }}>
            Add more power to your plan with our premium add-ons.
          </p>
        </div>

        <div className="pricing-addons-grid" style={{
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
            <div key={idx} className="pricing-addon-card" style={{
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
            Frequently Asked <span style={{ color: "#f97316" }}>Questions</span>
          </h2>

          <div className="pricing-faq-grid" style={{
            display: "grid",
            gridTemplateColumns: "340px 1fr",
            gap: "3.5rem",
            alignItems: "center"
          }}>
            {/* Left 3D Customer Support Illustration Graphic */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative"
            }}>
              {/* Glowing Backdrop Ambient Effect */}
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
                maxWidth: "340px",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
                background: "var(--bg-card)"
              }}>
                <img
                  src="/images/pricing-faq-illustration.png"
                  alt="SchoolMitra Pricing Help Desk Support 3D Illustration"
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                />
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

      {/* ========== WHAT SCHOOLS ARE SAYING (AUTOMATED 1-ROW SLIDING CAROUSEL) ========== */}
      <section style={{ padding: "80px 4%", maxWidth: "1280px", margin: "0 auto", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            What Schools <span style={{ color: "#f97316" }}>Are Saying</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.02rem", marginTop: "0.5rem" }}>
            Real reviews from principals, administrators, and directors across 500+ campuses
          </p>
        </div>

        {/* Outer Viewport Container (1 Row) */}
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "24px", padding: "0.5rem 0 1.5rem 0" }}>
          {/* Sliding Track - 1 Row Flex Container */}
          <div style={{
            display: "flex",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: `translateX(-${testimonialIndex * 100}%)`,
            width: "100%"
          }}>
            {testimonialsList.map((t, idx) => (
              <div key={idx} style={{
                minWidth: "100%",
                boxSizing: "border-box",
                padding: "0 0.5rem"
              }}>
                <div style={{
                  background: "var(--bg-card)",
                  borderRadius: "24px",
                  padding: "2.5rem 2rem",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  maxWidth: "800px",
                  margin: "0 auto",
                  minHeight: "220px"
                }}>
                  <div>
                    {/* 5 Yellow Stars */}
                    <div style={{ display: "flex", gap: "0.3rem", color: "#f59e0b", marginBottom: "1.2rem" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>

                    <p style={{
                      fontSize: "clamp(1rem, 2vw, 1.15rem)",
                      color: "var(--text-main)",
                      lineHeight: 1.65,
                      fontWeight: 500,
                      marginBottom: "1.8rem"
                    }}>
                      &quot;{t.quote}&quot;
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #3b82f6"
                      }}
                    />
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.15rem" }}>
                        {t.name}
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Interactive Pagination Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", alignItems: "center", marginTop: "1.5rem" }}>
          {testimonialsList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setTestimonialIndex(idx)}
              style={{
                width: testimonialIndex === idx ? 28 : 10,
                height: 10,
                borderRadius: "99px",
                background: testimonialIndex === idx ? "#3b82f6" : "var(--border-color)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ========== READY TO TRANSFORM YOUR SCHOOL CTA BANNER (IMAGE 2) ========== */}
      <section style={{ padding: "20px 4% 90px 4%", maxWidth: "1280px", margin: "0 auto" }}>
        <div className="pricing-cta-banner-box" style={{
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
              Ready to Transform <span style={{ color: "#f97316" }}>Your School?</span>
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
            <button onClick={() => window.location.href = "/auth?mode=signup"} style={{
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

          {/* Right 3D School Building Image Showcase */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1
          }}>
            {/* Glowing Backdrop Ambient Effect */}
            <div style={{
              position: "absolute",
              inset: "-10px",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "24px",
              filter: "blur(20px)",
              zIndex: 0
            }}></div>

            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "320px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 20px 45px rgba(0, 0, 0, 0.25)",
              background: "#ffffff"
            }}>
              <img
                src="/images/smart-school-cta.png"
                alt="SchoolMitra Modern Smart School 3D Portal Showcase"
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
