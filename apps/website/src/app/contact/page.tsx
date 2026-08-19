"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone, Mail, MapPin, Send, CheckCircle, Clock, Shield,
  Headphones, MessageCircle, ChevronDown, ChevronRight,
  Bus, Smartphone, FileText, ArrowRight, Globe,
  Building2, Calendar, GraduationCap, Sparkles, Zap, Compass, CheckCircle2
} from "lucide-react";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqData = [
    {
      q: "How can I request a live demo for my school?",
      a: "You can request a free demo by filling out our contact form below, or by calling our onboarding team at +91 91234 56789. We arrange virtual or on-campus walk-throughs within 24 hours."
    },
    {
      q: "What is the onboarding timeline for a new school?",
      a: "Complete student data migration, staff account creation, and RFID/GPS hardware syncing are completed in 3 to 5 business days with zero campus downtime."
    },
    {
      q: "Do you provide on-site teacher and driver training?",
      a: "Yes! We conduct interactive training sessions for teachers, administrators, and bus drivers, supplemented with step-by-step video guides in English and Hindi."
    },
    {
      q: "Can SchoolMitra integrate with our existing RFID gates & biometrics?",
      a: "Yes, our developer-friendly cloud APIs support integrations with standard biometric devices, RFID turnstiles, SMS gateways, and GPS hardware."
    },
    {
      q: "How secure is student and financial data?",
      a: "We maintain bank-grade 256-bit SSL encryption, ISO-27001 data governance, and automated daily off-site cloud backups to ensure total protection."
    }
  ];

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

      {/* ═══════════ HERO SECTION (ENGAGING & COLOURFUL) ═══════════ */}
      <section className="contact-hero-section" style={{
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

        <div style={{
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
              <Headphones size={14} color="#8b5cf6" />
              <span className="gradient-text-vibrant" style={{ fontWeight: 600, fontSize: "0.82rem" }}>24/7 Dedicated Support &amp; Onboarding</span>
              <span style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 700,
                padding: "0.12rem 0.45rem",
                borderRadius: "99px"
              }}>
                PAN-INDIA
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
              Let&apos;s Build a Smarter <span className="gradient-text-sunset">Campus Together</span>
            </h1>

            <p style={{
              fontSize: "1.02rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: 520,
              marginBottom: "1.6rem",
              fontWeight: 400
            }}>
              Have questions about our School ERP, live bus GPS telematics, or custom fee reconciliation? Our engineering and support team is here to assist you.
            </p>

            {/* Quick Action Chips */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1.8rem"
            }}>
              {[
                { label: "+91 91234 56789", icon: <Phone size={13} />, color: "#4f46e5", bg: "rgba(79, 70, 229, 0.08)" },
                { label: "support@schoolmitra.com", icon: <Mail size={13} />, color: "#0284c7", bg: "rgba(2, 132, 199, 0.08)" },
                { label: "2-4 Hr Response SLA", icon: <Clock size={13} />, color: "#059669", bg: "rgba(16, 185, 129, 0.08)" },
                { label: "Mon-Sat, 9AM-7PM IST", icon: <Calendar size={13} />, color: "#d97706", bg: "rgba(217, 119, 6, 0.08)" }
              ].map((chip, idx) => (
                <div key={idx} style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "99px",
                  background: chip.bg,
                  color: chip.color,
                  fontWeight: 600,
                  fontSize: "0.76rem"
                }}>
                  {chip.icon} {chip.label}
                </div>
              ))}
            </div>

            {/* CTA Group */}
            <div style={{ display: "flex", gap: "0.85rem", alignItems: "center", flexWrap: "wrap" }}>
              <a
                href="#message-form"
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
                <Send size={16} /> Send Us a Message
              </a>

              <button
                onClick={() => setModalOpen(true)}
                className="btn-colorful-outline"
                style={{
                  padding: "0.85rem 1.5rem",
                  borderRadius: 12,
                  fontSize: "0.92rem",
                  fontWeight: 600
                }}
              >
                <Zap size={16} color="#6366f1" /> Book Campus Demo
              </button>
            </div>
          </div>

          {/* Right Visual Showcase */}
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
              maxWidth: "420px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.35)",
              boxShadow: "0 20px 50px -10px rgba(67, 56, 202, 0.25)",
              background: "var(--bg-card)"
            }}>
              <img
                src="/images/smart-school-cta.png"
                alt="SchoolMitra Support & Campus Connectivity"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>

            {/* Floating Live Badge 1 */}
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
              <Headphones size={16} />
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700 }}>2-4 Hr Response</div>
                <div style={{ fontSize: "0.62rem", opacity: 0.9 }}>Priority WhatsApp Support</div>
              </div>
            </div>

            {/* Floating Live Badge 2 */}
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
              <Shield size={16} color="#059669" />
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669" }}>100% Data Security</div>
                <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 500 }}>ISO-27001 Certified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 3 QUICK CONTACT CHANNELS STRIP ═══════════ */}
      <section style={{ padding: "0 5% 45px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.4rem"
        }}>
          {[
            {
              title: "Direct Phone & WhatsApp",
              desc: "Speak with our education specialists for immediate campus assistance.",
              val: "+91 91234 56789",
              link: "tel:+919123456789",
              icon: <Phone size={22} color="#ffffff" />,
              grad: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#4f46e5"
            },
            {
              title: "Email Helpdesk",
              desc: "Send us your RFP, queries, or student data migration requirements.",
              val: "support@schoolmitra.com",
              link: "mailto:support@schoolmitra.com",
              icon: <Mail size={22} color="#ffffff" />,
              grad: "linear-gradient(135deg, #0284c7, #06b6d4)",
              color: "#0284c7"
            },
            {
              title: "Corporate Headquarters",
              desc: "Visit our technology campus in NCR for in-person consultation.",
              val: "Sector 62, Noida, UP 201309",
              link: "#offices",
              icon: <Building2 size={22} color="#ffffff" />,
              grad: "linear-gradient(135deg, #059669, #10b981)",
              color: "#059669"
            }
          ].map((ch, i) => (
            <div
              key={i}
              className="colorful-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: 18,
                padding: "1.6rem 1.4rem",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
                "--card-top-gradient": ch.grad,
                "--card-glow-color": "rgba(99, 102, 241, 0.12)"
              } as React.CSSProperties}
            >
              <div>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: ch.grad,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.12)"
                }}>
                  {ch.icon}
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.3rem" }}>
                  {ch.title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "0.85rem", fontWeight: 400 }}>
                  {ch.desc}
                </p>
              </div>

              <a
                href={ch.link}
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: ch.color,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                {ch.val} <ArrowRight size={13} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ MIDDLE DEDICATED SECTION: SEND US A MESSAGE FORM ═══════════ */}
      <section id="message-form" style={{ padding: "40px 5% 70px 5%", background: "var(--bg-subtle)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 2.5rem auto" }}>
            <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
              <Send size={12} color="#4f46e5" /> DIRECT INQUIRY DESK
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
              Send Us a <span className="gradient-text-sunset">Message</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.55, fontWeight: 400, marginTop: "0.4rem" }}>
              Fill out the details below and our team will get in touch with you within 2-4 business hours.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "2.5rem",
            alignItems: "stretch"
          }}>
            {/* Left Context Column */}
            <div style={{
              background: "var(--bg-card)",
              borderRadius: 22,
              padding: "2.4rem 2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 8px 25px rgba(15, 23, 42, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.06em", display: "inline-block", marginBottom: "0.5rem" }}>
                  WHY SCHOOLS TRUST US
                </span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.85rem", lineHeight: 1.25 }}>
                  Fast Support, Zero Setup Friction
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.4rem", fontWeight: 400 }}>
                  Whether you manage a primary school or an education trust with multiple campuses, our dedicated specialists provide customized guidance.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.6rem" }}>
                  {[
                    "Dedicated engineer assigned for complete data migration",
                    "Customized demo matching CBSE, ICSE, or State board workflows",
                    "Transparent pricing with zero hidden implementation charges",
                    "24/7 phone, WhatsApp, and email assistance"
                  ].map((pt, pIdx) => (
                    <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 500 }}>
                      <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Notice Box */}
              <div style={{
                borderRadius: 14,
                padding: "1rem 1.2rem",
                background: "rgba(2, 132, 199, 0.08)",
                border: "1px solid rgba(2, 132, 199, 0.2)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <Shield size={20} color="#0284c7" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0369a1" }}>Your data is 100% confidential</div>
                  <div style={{ fontSize: "0.72rem", color: "#0284c7", opacity: 0.9 }}>We never share school details with third parties.</div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div style={{
              background: "var(--bg-card)",
              borderRadius: 22,
              padding: "2.4rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 8px 25px rgba(15, 23, 42, 0.03)"
            }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <CheckCircle size={48} color="#10b981" style={{ marginBottom: "1rem" }} />
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.4rem", color: "var(--text-main)" }}>Message Received!</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", fontWeight: 400 }}>Our specialist will contact you within 2-4 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.3rem", color: "var(--text-main)" }}>Your Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Rajesh Sharma"
                        required
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: 10,
                          border: "1.5px solid var(--border-color)",
                          background: "var(--bg-page)",
                          color: "var(--text-main)",
                          fontSize: "0.85rem",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.3rem", color: "var(--text-main)" }}>School Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Greenwood Public School"
                        required
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: 10,
                          border: "1.5px solid var(--border-color)",
                          background: "var(--bg-page)",
                          color: "var(--text-main)",
                          fontSize: "0.85rem",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.3rem", color: "var(--text-main)" }}>Official Email *</label>
                      <input
                        type="email"
                        placeholder="principal@school.com"
                        required
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: 10,
                          border: "1.5px solid var(--border-color)",
                          background: "var(--bg-page)",
                          color: "var(--text-main)",
                          fontSize: "0.85rem",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.3rem", color: "var(--text-main)" }}>Phone Number *</label>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.65rem 0.65rem",
                          borderRadius: 10,
                          border: "1.5px solid var(--border-color)",
                          background: "var(--bg-page)",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "var(--text-main)"
                        }}>
                          🇮🇳 +91
                        </div>
                        <input
                          type="tel"
                          placeholder="9876543210"
                          required
                          style={{
                            flex: 1,
                            padding: "0.65rem 0.85rem",
                            borderRadius: 10,
                            border: "1.5px solid var(--border-color)",
                            background: "var(--bg-page)",
                            color: "var(--text-main)",
                            fontSize: "0.85rem",
                            outline: "none"
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.3rem", color: "var(--text-main)" }}>What is this regarding?</label>
                    <select style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: 10,
                      border: "1.5px solid var(--border-color)",
                      background: "var(--bg-page)",
                      color: "var(--text-main)",
                      fontSize: "0.85rem",
                      outline: "none",
                      cursor: "pointer"
                    }}>
                      <option>School ERP Demo &amp; Pricing</option>
                      <option>Live GPS Bus Tracking Solution</option>
                      <option>Automated Fee Collection Engine</option>
                      <option>Multi-Branch Trust Governance</option>
                      <option>Hardware RFID / API Integration</option>
                      <option>Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.3rem", color: "var(--text-main)" }}>Message or Specific Requirements</label>
                    <textarea
                      placeholder="Please share number of students, branches, or modules you need..."
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: 10,
                        border: "1.5px solid var(--border-color)",
                        background: "var(--bg-page)",
                        color: "var(--text-main)",
                        fontSize: "0.85rem",
                        outline: "none",
                        resize: "vertical"
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.76rem", color: "var(--text-muted)" }}>
                    <input type="checkbox" required style={{ width: 15, height: 15, accentColor: "#4f46e5" }} />
                    <span>I agree to the <Link href="/privacy" style={{ color: "#4f46e5", fontWeight: 600 }}>Privacy Policy</Link> and <Link href="/terms" style={{ color: "#4f46e5", fontWeight: 600 }}>Terms &amp; Conditions</Link></span>
                  </div>

                  <button
                    type="submit"
                    className="btn-vibrant-gradient"
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      borderRadius: 12,
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem"
                    }}
                  >
                    Send Message <Send size={15} />
                  </button>

                  <div style={{ textAlign: "center", fontSize: "0.76rem", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                    Average response time: <Clock size={13} color="#10b981" /> <span style={{ fontWeight: 700, color: "#10b981" }}>2-4 Business Hours</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ OUR NATIONWIDE OFFICES ═══════════ */}
      <section id="offices" style={{ padding: "50px 5% 60px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Globe size={12} color="#10b981" /> NATIONWIDE PRESENCE
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            Our Offices &amp; <span className="gradient-text-sunset">Support Hubs</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: 560, margin: "0.3rem auto 0 auto", lineHeight: 1.55, fontWeight: 400 }}>
            Dedicated engineering, deployment, and customer success centers across India.
          </p>
        </div>

        <div style={{
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

      {/* ═══════════ FREQUENTLY ASKED QUESTIONS ═══════════ */}
      <section id="faq" style={{ padding: "40px 5% 60px 5%", background: "var(--bg-page)" }}>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 2rem auto" }}>
          <span className="shimmer-badge" style={{ marginBottom: "0.6rem", fontSize: "0.76rem" }}>
            <Sparkles size={12} color="#8b5cf6" /> COMMON QUESTIONS
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            Frequently Asked <span className="gradient-text-sunset">Questions</span>
          </h2>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: 14,
                  border: isOpen ? "1.5px solid #6366f1" : "1px solid var(--border-color)",
                  boxShadow: isOpen ? "0 6px 20px rgba(99, 102, 241, 0.1)" : "0 2px 6px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease",
                  overflow: "hidden"
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
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

      {/* ═══════════ COSMIC READY TO DIGITIZE CTA BANNER ═══════════ */}
      <section style={{ padding: "0 5% 70px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div className="features-cta-banner-box" style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
          borderRadius: 26,
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
          }} />

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
              <Sparkles size={12} color="#ec4899" /> EXPERIENCE SCHOOLMITRA LIVE
            </span>

            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              marginBottom: "0.85rem",
              lineHeight: 1.2
            }}>
              Ready to Modernize Your <span className="gradient-text-sunset">School Campus?</span>
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

            <button
              onClick={() => setModalOpen(true)}
              className="btn-vibrant-gradient"
              style={{
                padding: "0.85rem 2.2rem",
                borderRadius: 14,
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
              maxWidth: 280,
              borderRadius: 18,
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

      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />

      {/* Demo Booking Modal */}
      {modalOpen && <SchoolRegistrationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
