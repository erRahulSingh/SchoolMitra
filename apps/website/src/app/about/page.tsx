"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, CheckCircle2, Users, Bus, Shield,
  Award, Clock, CreditCard, MessageSquare, Sparkles, Globe,
  Building2, Target, Heart, Zap, TrendingUp, Lock, Smartphone,
  Check, Star, FileText, Headphones, Phone, Mail, MapPin
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
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      {/* ═══════════ NAVBAR ═══════════ */}
      <Navbar />

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="about-hero-section" style={{
        position: "relative",
        paddingTop: 130,
        paddingBottom: 70,
        paddingLeft: "5%",
        paddingRight: "5%",
        overflow: "hidden"
      }}>
        {/* Background Ambient Glow Blobs */}
        <div style={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(67,56,202,0.12) 0%, rgba(59,130,246,0.04) 60%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          bottom: "5%",
          left: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none"
        }} />

        <div className="about-hero-grid" style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "3.5rem",
          alignItems: "center"
        }}>
          {/* Left Copy */}
          <div>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.45rem 1rem",
              borderRadius: 99,
              background: "rgba(67, 56, 202, 0.08)",
              color: "#4338ca",
              fontSize: "0.85rem",
              fontWeight: 800,
              marginBottom: "1.5rem",
              border: "1px solid rgba(67, 56, 202, 0.2)"
            }}>
              ❖ Empowering Indian Education
            </span>

            <h1 style={{
              fontSize: "clamp(2.5rem, 4.2vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              marginBottom: "1.4rem",
              color: "var(--text-main)"
            }}>
              Pioneering Next-Gen <span style={{ color: "#f97316" }}>Digital Campuses</span>
            </h1>

            <p style={{
              fontSize: "1.12rem",
              color: "var(--text-muted)",
              lineHeight: 1.65,
              maxWidth: 560,
              marginBottom: "2.2rem",
              fontWeight: 500
            }}>
              SchoolMitra is on a mission to simplify campus management for 10,000+ schools across India—combining AI-powered ERP, live GPS bus telemetry, instant UPI fee gateways, and real-time parent engagement in one secure cloud platform.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => window.location.href = "/auth?mode=signup"}
                style={{
                  padding: "0.95rem 2.2rem",
                  borderRadius: 12,
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
                Book a Free Campus Demo <ArrowRight size={18} />
              </button>

              <Link
                href="/solutions"
                style={{
                  padding: "0.95rem 1.8rem",
                  borderRadius: 12,
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
                Explore Solutions ↓
              </Link>
            </div>
          </div>

          {/* Right Visual: 3D Connected Campus Image */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              position: "absolute",
              inset: "-20px",
              background: "linear-gradient(135deg, rgba(67, 56, 202, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)",
              borderRadius: "36px",
              filter: "blur(28px)",
              zIndex: 0
            }} />

            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "520px",
              borderRadius: "26px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 60px -10px rgba(15, 23, 42, 0.35)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/smart-school-cta.png"
                alt="SchoolMitra Modern Connected Campus Showcase"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* ── Impact Stats Ribbon ── */}
        <div className="about-stats-ribbon" style={{
          maxWidth: 1280,
          margin: "3.5rem auto 0 auto",
          display: "flex",
          justifyContent: "center"
        }}>
          <div className="about-stats-grid" style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            background: "var(--bg-card)",
            padding: "1.8rem 2rem",
            borderRadius: 24,
            border: "1px solid var(--border-color)",
            boxShadow: "0 15px 40px rgba(15, 23, 42, 0.04)"
          }}>
            {[
              { val: "500+", lbl: "Active School Campuses", color: "#4338ca", icon: "🏫" },
              { val: "2.5L+", lbl: "Students & Parents", color: "#3b82f6", icon: "👨‍👩‍👧" },
              { val: "99.8%", lbl: "On-Time Fee Recovery", color: "#10b981", icon: "💳" },
              { val: "15+ hrs", lbl: "Saved/Teacher Each Week", color: "#8b5cf6", icon: "⚡" },
            ].map((st, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `${st.color}15`,
                  fontSize: "1.4rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  {st.icon}
                </div>
                <div>
                  <div style={{ fontSize: "1.45rem", fontWeight: 800, color: st.color, fontFamily: "'Outfit', sans-serif" }}>{st.val}</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)", marginTop: "0.15rem" }}>{st.lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MISSION & VISION SECTION ═══════════ */}
      <section style={{ padding: "60px 4%", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#4338ca", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            OUR PURPOSE &amp; VISION
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "var(--text-main)", marginTop: "0.4rem" }}>
            Driven by a Commitment <span style={{ color: "#f97316" }}>to Educational Innovation</span>
          </h2>
        </div>

        <div className="about-mission-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem"
        }}>
          {/* Mission Card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(238, 242, 255, 0.95) 0%, rgba(243, 244, 255, 0.85) 100%)",
            borderRadius: 24,
            padding: "2.5rem 2rem",
            border: "1px solid rgba(199, 210, 254, 0.8)",
            boxShadow: "0 10px 30px rgba(67, 56, 202, 0.05)"
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: "#4338ca",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              boxShadow: "0 8px 20px rgba(67, 56, 202, 0.3)"
            }}>
              <Target size={26} color="#ffffff" />
            </div>

            <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1e1b4b", marginBottom: "0.8rem" }}>
              Our Mission
            </h3>
            <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
              To eliminate paper-based administrative friction and hardware barriers—providing every Indian school, from independent K-12 institutes to multi-branch educational trusts, with bank-grade cloud tools that enhance child safety, financial transparency, and academic excellence.
            </p>
          </div>

          {/* Vision Card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(236, 253, 245, 0.95) 0%, rgba(209, 250, 229, 0.85) 100%)",
            borderRadius: 24,
            padding: "2.5rem 2rem",
            border: "1px solid rgba(167, 243, 208, 0.8)",
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.05)"
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: "#10b981",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)"
            }}>
              <Sparkles size={26} color="#ffffff" />
            </div>

            <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#064e3b", marginBottom: "0.8rem" }}>
              Our Vision
            </h3>
            <p style={{ color: "#334155", fontSize: "1rem", lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
              To build the most intuitive, secure, and accessible EdTech operating system in Asia—where principals, teachers, parents, and transport drivers collaborate effortlessly in real-time, empowering students to achieve their highest potential.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 4 CORE PILLARS SECTION ═══════════ */}
      <section style={{ padding: "60px 4%", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            WHY SCHOOLS TRUST SCHOOLMITRA
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "var(--text-main)", marginTop: "0.4rem" }}>
            Built on 4 Pillars <span style={{ color: "#f97316" }}>of Excellence</span>
          </h2>
        </div>

        <div className="about-pillars-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem"
        }}>
          {[
            {
              icon: <Bus size={24} color="#3b82f6" />,
              bg: "rgba(59, 130, 246, 0.1)",
              title: "Child Safety & Fleet GPS",
              desc: "Live route tracking, driver speed enforcement, geofence safe zones, and 1-tap emergency panic dispatch."
            },
            {
              icon: <CreditCard size={24} color="#10b981" />,
              bg: "rgba(16, 185, 129, 0.1)",
              title: "Zero Cash Leakage",
              desc: "Multi-gateway UPI (Google Pay, PhonePe, Paytm), instant digital PDF receipts, and automated bank reconciliation."
            },
            {
              icon: <GraduationCap size={24} color="#8b5cf6" />,
              bg: "rgba(139, 92, 246, 0.1)",
              title: "CBSE & ICSE Report Cards",
              desc: "Automated subject grade calculations, rank generation, and 1-click batch report card printing Al-aligned."
            },
            {
              icon: <Smartphone size={24} color="#ec4899" />,
              bg: "rgba(236, 72, 153, 0.1)",
              title: "4.9★ Parent Mobile App",
              desc: "Instant attendance alerts, homework attachments, circular notice boards, and direct teacher messaging."
            }
          ].map((pil, idx) => (
            <div key={idx} style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "1.8rem 1.4rem",
              border: "1px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: pil.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {pil.icon}
              </div>
              <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-main)" }}>
                {pil.title}
              </h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55, margin: 0 }}>
                {pil.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ COMPANY TIMELINE & MILESTONES ═══════════ */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        color: "#ffffff",
        padding: "80px 4%",
        margin: "4rem 0"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              OUR JOURNEY
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "#ffffff", marginTop: "0.4rem" }}>
              How SchoolMitra Transformed <span style={{ color: "#f97316" }}>School ERP</span>
            </h2>
          </div>

          <div className="about-timeline-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem"
          }}>
            {[
              { year: "2022", title: "Founded in Noida", desc: "Started with a vision to revolutionize school bus GPS safety for parents." },
              { year: "2023", title: "Smart ERP Launch", desc: "Introduced 1-click CBSE report card engine & UPI fee payment receipts." },
              { year: "2024", title: "250+ Schools Milestone", desc: "Expanded to 15+ states with Parent & Driver mobile app ecosystem." },
              { year: "2026", title: "500+ Active Campuses", desc: "Serving 2.5L+ users with bank-grade security and AI performance analytics." }
            ].map((m, idx) => (
              <div key={idx} style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 20,
                padding: "1.8rem 1.4rem",
                position: "relative"
              }}>
                <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#60a5fa", fontFamily: "'Outfit', sans-serif", marginBottom: "0.5rem" }}>
                  {m.year}
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.4rem" }}>
                  {m.title}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ LEADERSHIP & CORE TEAM ═══════════ */}
      <section style={{ padding: "60px 4%", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#4338ca", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            THE MINDS BEHIND SCHOOLMITRA
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "var(--text-main)", marginTop: "0.4rem" }}>
            Meet Our <span style={{ color: "#f97316" }}>Leadership Team</span>
          </h2>
        </div>

        <div className="about-team-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem"
        }}>
          {[
            {
              name: "Rahul Singh",
              role: "Founder & CEO",
              desc: "10+ yrs in EdTech engineering & campus digitization.",
              avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=250&auto=format&fit=crop&q=80"
            },
            {
              name: "Rahul Yadav",
              role: "Co-founder & CTO",
              desc: "Former education consultant & curriculum architect.",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80"
            },
            {
              name: "Vikramaditya Sharma",
              role: "Head of Customer Success",
              desc: "Ensures 24/7 dedicated onboarding & support for schools.",
              avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=250&auto=format&fit=crop&q=80"
            },
            {
              name: "Priya Deshmukh",
              role: "Lead Cloud Architect",
              desc: "Specialist in ISO-27001 compliance & SSL security.",
              avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&auto=format&fit=crop&q=80"
            }
          ].map((tm, idx) => (
            <div key={idx} style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ width: "100%", height: 220, overflow: "hidden", background: "#eef2ff" }}>
                <img
                  src={tm.avatar}
                  alt={tm.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.2rem" }}>
                  {tm.name}
                </h4>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#4338ca", marginBottom: "0.6rem" }}>
                  {tm.role}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.45, margin: 0 }}>
                  {tm.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ OUR OFFICES & CONNECT ═══════════ */}
      <section style={{ padding: "60px 4% 90px 4%", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            OUR PRESENCE
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "var(--text-main)", marginTop: "0.4rem" }}>
            Our Offices <span style={{ color: "#f97316" }}>&amp; Support Hubs</span>
          </h2>
        </div>

        <div className="about-offices-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem"
        }}>
          {[
            {
              city: "Noida (Headquarters)",
              addr: "123, Tech Park, Sector 62, Noida, Uttar Pradesh 201309",
              phone: "+91 91234 56789",
              email: "support@schoolmitra.com"
            },
            {
              city: "Bengaluru (Tech Hub)",
              addr: "45, Residency Road, Bengaluru, Karnataka 560025",
              phone: "+91 98765 43210",
              email: "bengaluru@schoolmitra.com"
            },
            {
              city: "Hyderabad (Support Hub)",
              addr: "1st Floor, Plot 12, Hitech City, Hyderabad, Telangana 500081",
              phone: "+91 95555 12345",
              email: "hyderabad@schoolmitra.com"
            }
          ].map((off, idx) => (
            <div key={idx} style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "1.8rem 1.4rem",
              border: "1px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(67, 56, 202, 0.08)",
                color: "#4338ca",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Building2 size={22} />
              </div>

              <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.2rem" }}>
                {off.city}
              </h4>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <MapPin size={16} color="#4338ca" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{off.addr}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <Phone size={16} color="#10b981" style={{ flexShrink: 0 }} />
                <span>{off.phone}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <Mail size={16} color="#3b82f6" style={{ flexShrink: 0 }} />
                <span>{off.email}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />

      {/* Demo Booking Modal */}
      {modalOpen && <SchoolRegistrationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
