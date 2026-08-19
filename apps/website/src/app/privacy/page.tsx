"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck, Lock, Eye, FileText, Database, Server,
  CheckCircle2, Clock, Mail, Phone, ArrowRight, Building2,
  Sparkles, Shield, UserCheck, Zap, Key, RefreshCw
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";

export default function PrivacyPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("collection");

  const sections = [
    { id: "commitments", title: "1. Core Privacy Commitments" },
    { id: "collection", title: "2. Information We Collect" },
    { id: "usage", title: "3. How We Use Collected Data" },
    { id: "ownership", title: "4. School Data Ownership" },
    { id: "security", title: "5. Encryption & Security Architecture" },
    { id: "telematics", title: "6. Bus GPS & Telemetry Privacy" },
    { id: "payments", title: "7. Payment & Fee Gateway Privacy" },
    { id: "sharing", title: "8. Third-Party Sub-Processors" },
    { id: "retention", title: "9. Data Retention & Secure Purging" },
    { id: "rights", title: "10. Rights Under DPDP Act 2023" },
    { id: "contact-dpo", title: "11. Data Protection Officer (DPO)" }
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

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section style={{
        position: "relative",
        paddingTop: 110,
        paddingBottom: 40,
        paddingLeft: "5%",
        paddingRight: "5%",
        overflow: "hidden"
      }}>
        {/* Animated Mesh Glow Orbs */}
        <div className="anim-orb-1" style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)",
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
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(236, 72, 153, 0.1) 40%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0
        }} />

        <div style={{
          maxWidth: 1240,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "center"
        }}>
          <div className="shimmer-badge" style={{ marginBottom: "1rem", padding: "0.3rem 0.85rem", display: "inline-flex" }}>
            <Lock size={14} color="#10b981" />
            <span className="gradient-text-vibrant" style={{ fontWeight: 600, fontSize: "0.82rem" }}>ISO 27001 &amp; DPDP Act 2023 Compliant</span>
            <span style={{
              background: "linear-gradient(135deg, #10b981, #06b6d4)",
              color: "#ffffff",
              fontSize: "0.65rem",
              fontWeight: 700,
              padding: "0.12rem 0.45rem",
              borderRadius: "99px"
            }}>
              DATA SANCTITY
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.1rem, 3.4vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: "-0.025em",
            marginBottom: "0.8rem",
            color: "var(--text-main)"
          }}>
            Privacy Policy &amp; <span className="gradient-text-sunset">Data Protection Charter</span>
          </h1>

          <p style={{
            fontSize: "1.02rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            maxWidth: 640,
            margin: "0 auto 1.4rem auto",
            fontWeight: 400
          }}>
            At SchoolMitra, we believe student records and family privacy are sacred. This policy explains how we safeguard institutional data with bank-grade cloud encryption and zero advertiser monetization.
          </p>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            fontWeight: 500
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Clock size={14} color="#10b981" /> Last Revised: January 1, 2026
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Building2 size={14} color="#4f46e5" /> SchoolMitra Technologies Pvt. Ltd.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Server size={14} color="#0284c7" /> Hosted in India (AWS Mumbai / Hyderabad)
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 4 CORE PRIVACY PILLARS RIBBON ═══════════ */}
      <section style={{ padding: "10px 5% 35px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.2rem"
        }}>
          {[
            {
              title: "100% School Ownership",
              desc: "You retain full legal ownership of all student, teacher, and fee databases.",
              icon: "🏫",
              grad: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#4f46e5"
            },
            {
              title: "Zero Ad Monetization",
              desc: "We never sell, rent, or monetize student or guardian data with advertisers.",
              icon: "🚫",
              grad: "linear-gradient(135deg, #059669, #10b981)",
              color: "#059669"
            },
            {
              title: "256-Bit SSL Encryption",
              desc: "All data in transit and at rest is protected by bank-level cryptography.",
              icon: "🔒",
              grad: "linear-gradient(135deg, #0284c7, #06b6d4)",
              color: "#0284c7"
            },
            {
              title: "Indian Data Residency",
              desc: "All primary and backup servers are strictly hosted inside the Republic of India.",
              icon: "🇮🇳",
              grad: "linear-gradient(135deg, #d97706, #f59e0b)",
              color: "#d97706"
            }
          ].map((pill, idx) => (
            <div
              key={idx}
              className="colorful-card"
              style={{
                background: "var(--bg-card)",
                borderRadius: 16,
                padding: "1.3rem 1.1rem",
                border: "1.5px solid var(--border-color)",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                "--card-top-gradient": pill.grad,
                "--card-glow-color": "rgba(99, 102, 241, 0.12)"
              } as React.CSSProperties}
            >
              <div style={{ fontSize: "1.5rem" }}>{pill.icon}</div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                {pill.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                {pill.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ MAIN CONTENT GRID (TOC + PRIVACY CLAUSES) ═══════════ */}
      <section style={{ padding: "10px 5% 70px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "2.5rem",
          alignItems: "flex-start"
        }}>
          {/* Left Column: Sticky Table of Contents */}
          <div style={{
            position: "sticky",
            top: 100,
            background: "var(--bg-card)",
            borderRadius: 18,
            padding: "1.5rem 1.2rem",
            border: "1.5px solid var(--border-color)",
            boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)"
          }}>
            <div style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#10b981",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem"
            }}>
              <FileText size={14} /> Policy Sections
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setActiveSection(sec.id)}
                  style={{
                    padding: "0.45rem 0.75rem",
                    borderRadius: 8,
                    fontSize: "0.82rem",
                    fontWeight: activeSection === sec.id ? 700 : 500,
                    color: activeSection === sec.id ? "#059669" : "var(--text-muted)",
                    background: activeSection === sec.id ? "rgba(16, 185, 129, 0.08)" : "transparent",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                    display: "block",
                    lineHeight: 1.4
                  }}
                >
                  {sec.title}
                </a>
              ))}
            </div>

            <div style={{
              marginTop: "1.5rem",
              paddingTop: "1.2rem",
              borderTop: "1px solid var(--border-color)",
              textAlign: "center"
            }}>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.75rem", fontWeight: 400 }}>
                Privacy officer contact:
              </p>
              <a
                href="mailto:privacy@schoolmitra.com"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#059669",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <Mail size={13} /> privacy@schoolmitra.com
              </a>
            </div>
          </div>

          {/* Right Column: Structured Privacy Clauses */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Clause 1: Core Commitments */}
            <div id="commitments" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #10b981, #06b6d4)",
              "--card-glow-color": "rgba(16, 185, 129, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                1. Core Privacy Commitments
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                SchoolMitra operates strictly as a secure Software-as-a-Service (SaaS) technology processor for partner schools. We process institutional data solely to enable digital attendance, fee collections, report card generation, and live GPS bus tracking.
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                We strictly comply with the **Digital Personal Data Protection (DPDP) Act, 2023** and the **Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011**.
              </p>
            </div>

            {/* Clause 2: Information We Collect */}
            <div id="collection" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #4f46e5, #7c3aed)",
              "--card-glow-color": "rgba(99, 102, 241, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                2. Information We Collect
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem", fontWeight: 400 }}>
                To provide comprehensive school administration tools, we process data uploaded by school administrators and generated through portal interactions:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  { title: "Student Records", desc: "Full name, roll number, class/section, date of birth, blood group, examination marks, and attendance logs." },
                  { title: "Guardian Contact Details", desc: "Parent names, phone numbers, email addresses, residential emergency contacts for automated SMS/app notices." },
                  { title: "Staff & Teacher Profiles", desc: "Official school email, designation, role permissions, and timetable assignments." },
                  { title: "Transit Telemetry", desc: "Live satellite GPS coordinates of registered school buses, vehicle speeds, route stops, and driver contact info." },
                  { title: "Fee Transaction Records", desc: "Payment receipt numbers, transaction dates, fee heads, and tokenized UPI/banking gateway reference IDs (no raw card CVVs stored)." }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: "0.75rem 1rem",
                    borderRadius: 10,
                    background: "var(--bg-page)",
                    border: "1px solid var(--border-color)"
                  }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)" }}>{item.title}: </span>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, fontWeight: 400 }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clause 3: How We Use Collected Data */}
            <div id="usage" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #0284c7, #06b6d4)",
              "--card-glow-color": "rgba(2, 132, 199, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                3. How We Use Collected Data
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                Data processed by SchoolMitra is used exclusively for educational and administrative functions requested by the subscribing institution:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "Generating CBSE, ICSE, and State Board formatted report cards and academic marksheets.",
                  "Dispatching instant push notifications and SMS alerts for child attendance and circulars.",
                  "Facilitating online fee reconciliation and automated digital PDF receipt generation.",
                  "Broadcasting live GPS bus location telemetry to authorized parents and transport managers.",
                  "Ensuring system security, error diagnosis, and preventing unauthorized account logins."
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <CheckCircle2 size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clause 4: School Data Ownership */}
            <div id="ownership" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #059669, #10b981)",
              "--card-glow-color": "rgba(5, 150, 105, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                4. School Data Ownership &amp; Custodianship
              </h2>
              <div style={{
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                borderRadius: 12,
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                gap: "0.6rem"
              }}>
                <ShieldCheck size={20} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: "0.85rem", color: "#065f46", lineHeight: 1.5, fontWeight: 600 }}>
                  The subscribing School Institution remains the sole &quot;Data Fiduciary&quot; under Indian Law. SchoolMitra operates strictly as the authorized &quot;Data Processor&quot;.
                </div>
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                Schools possess unrestricted rights to extract, export, update, or request the complete deletion of their student rosters and fee ledgers at any time during or upon conclusion of their active contract.
              </p>
            </div>

            {/* Clause 5: Security Architecture */}
            <div id="security" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #7c3aed, #a855f7)",
              "--card-glow-color": "rgba(124, 58, 237, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                5. Encryption &amp; Security Architecture
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                We deploy defense-in-depth security measures to protect school infrastructure against unauthorized access:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "TLS 1.3 encryption with 256-bit SSL certificates for all web portal and mobile app communications.",
                  "AES-256 database-level encryption for stored student personal identifiers and password hashes.",
                  "Granular role-based access control (RBAC) ensuring teachers only view assigned classes.",
                  "Automated daily encrypted off-site cloud backups with instant point-in-time disaster recovery.",
                  "Continuous vulnerability testing and ISO-27001 information security compliance reviews."
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <Key size={15} color="#7c3aed" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clause 6: GPS Telematics */}
            <div id="telematics" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #0284c7, #38bdf8)",
              "--card-glow-color": "rgba(2, 132, 199, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                6. Bus GPS Telemetry &amp; Transit Safety Privacy
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                Real-time satellite GPS coordinates transmitted by school bus IoT hardware are strictly restricted. Only authenticated guardians whose children are assigned to that specific route, alongside authorized school transport administrators, can view the bus telemetry stream.
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                Historical route telemetry is archived for 90 calendar days for safety compliance and auditing, after which route logs are automatically purged.
              </p>
            </div>

            {/* Clause 7: Payment Gateways */}
            <div id="payments" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #059669, #34d399)",
              "--card-glow-color": "rgba(5, 150, 105, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                7. Payment &amp; Fee Gateway Privacy
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                All digital fee payments made through the SchoolMitra Parent App or Web Portal are processed directly via RBI-authorized payment aggregators (e.g., Razorpay, Cashfree, PayU). SchoolMitra **never** stores debit card numbers, CVVs, net banking credentials, or UPI PINs on our servers.
              </p>
            </div>

            {/* Clause 8: Sub-Processors */}
            <div id="sharing" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #d97706, #fb923c)",
              "--card-glow-color": "rgba(217, 119, 6, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                8. Third-Party Infrastructure Sub-Processors
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                We engage select, certified cloud and telecommunication sub-processors bound by rigorous Data Protection Agreements (DPAs):
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "Cloud Server Infrastructure: Amazon Web Services (AWS) Asia-Pacific (Mumbai & Hyderabad).",
                  "Transactional SMS & OTP Delivery: DLT-registered telecom gateways in compliance with TRAI regulations.",
                  "Push Notifications: Google Firebase Cloud Messaging (FCM) & Apple Push Notification service (APNs)."
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <Server size={15} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clause 9: Retention & Purging */}
            <div id="retention" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #ea580c, #f97316)",
              "--card-glow-color": "rgba(234, 88, 12, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                9. Data Retention &amp; Secure Purging
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                School data is retained only for the duration of the institution&apos;s active subscription. Upon formal contract termination, the school receives a complete CSV/Excel export within 7 days.
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                Following a 30-day grace period, all institutional databases, student marks, and backups are permanently and cryptographically purged from all production servers.
              </p>
            </div>

            {/* Clause 10: Rights Under DPDP */}
            <div id="rights" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #4f46e5, #06b6d4)",
              "--card-glow-color": "rgba(79, 70, 229, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                10. Rights Under DPDP Act 2023
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                Institutions, staff, and guardians have statutory rights regarding their personal information:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "Right to Access: Review summaries of personal data processed by SchoolMitra.",
                  "Right to Correction: Request immediate rectification of inaccurate or outdated information.",
                  "Right to Erasure: Request deletion of data no longer required for regulatory school records.",
                  "Right to Grievance Redressal: Direct escalation to our designated Data Protection Officer."
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <CheckCircle2 size={16} color="#4f46e5" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clause 11: DPO Contact */}
            <div id="contact-dpo" className="colorful-card" style={{
              background: "var(--bg-subtle)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)"
            }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                11. Data Protection Officer (DPO) &amp; Privacy Desk
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.2rem", fontWeight: 400 }}>
                For data privacy requests, audit inquiries, or DPDP Act compliance clarifications, please contact our dedicated Data Protection Officer:
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem"
              }}>
                <div style={{
                  padding: "1rem",
                  borderRadius: 12,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)"
                }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10b981", marginBottom: "0.2rem" }}>DATA PROTECTION OFFICER</div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-main)" }}>dpo@schoolmitra.com</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>SchoolMitra Technologies Pvt. Ltd.</div>
                </div>

                <div style={{
                  padding: "1rem",
                  borderRadius: 12,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)"
                }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4f46e5", marginBottom: "0.2rem" }}>PRIVACY GRIEVANCE HELPDESK</div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-main)" }}>privacy@schoolmitra.com</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Response SLA: Within 48 Business Hours</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ COSMIC CTA BANNER ═══════════ */}
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
              <Sparkles size={12} color="#ec4899" /> BANK-GRADE DATA SANCTITY
            </span>

            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              marginBottom: "0.85rem",
              lineHeight: 1.2
            }}>
              Trusted by 500+ Schools <span className="gradient-text-sunset">Across India</span>
            </h2>

            <p style={{
              fontSize: "0.98rem",
              color: "#cbd5e1",
              fontWeight: 400,
              marginBottom: "1.8rem",
              maxWidth: 500,
              lineHeight: 1.55
            }}>
              Discover how SchoolMitra protects your student records and powers seamless campus operations. Book a personalized consultation today.
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
