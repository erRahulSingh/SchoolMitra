"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck, FileText, Lock, Globe, Scale, AlertCircle,
  CheckCircle2, Clock, Mail, Phone, ArrowRight, Building2,
  Sparkles, HelpCircle, Compass, Zap, UserCheck, Shield
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchoolRegistrationModal from "@/components/SchoolRegistrationModal";

export default function TermsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "services", title: "2. Cloud Services & Scope" },
    { id: "user-accounts", title: "3. Account Security & Roles" },
    { id: "data-ownership", title: "4. Student Data & Privacy" },
    { id: "fees-billing", title: "5. Subscription & Payment Terms" },
    { id: "gps-telematics", title: "6. Bus GPS & Safety Telemetry" },
    { id: "sla-uptime", title: "7. Uptime SLA & Maintenance" },
    { id: "intellectual-property", title: "8. Intellectual Property" },
    { id: "liability", title: "9. Limitation of Liability" },
    { id: "termination", title: "10. Termination & Data Export" },
    { id: "governing-law", title: "11. Governing Law & Disputes" },
    { id: "contact-legal", title: "12. Legal Inquiries & Contact" }
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
          position: "relative",
          zIndex: 1,
          textAlign: "center"
        }}>
          <div className="shimmer-badge" style={{ marginBottom: "1rem", padding: "0.3rem 0.85rem", display: "inline-flex" }}>
            <Scale size={14} color="#8b5cf6" />
            <span className="gradient-text-vibrant" style={{ fontWeight: 600, fontSize: "0.82rem" }}>Legal Agreement &amp; Operating Policies</span>
            <span style={{
              background: "linear-gradient(135deg, #10b981, #06b6d4)",
              color: "#ffffff",
              fontSize: "0.65rem",
              fontWeight: 700,
              padding: "0.12rem 0.45rem",
              borderRadius: "99px"
            }}>
              UPDATED 2026
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
            Terms and <span className="gradient-text-sunset">Conditions of Service</span>
          </h1>

          <p style={{
            fontSize: "1.02rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            maxWidth: 620,
            margin: "0 auto 1.4rem auto",
            fontWeight: 400
          }}>
            Please review these terms carefully. They govern the use of SchoolMitra&apos;s cloud ERP platform, mobile applications, and IoT telematics services by partner schools, administrators, teachers, and parents.
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
              <Clock size={14} color="#4f46e5" /> Effective Date: January 1, 2026
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Building2 size={14} color="#0284c7" /> SchoolMitra Technologies Pvt. Ltd.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <ShieldCheck size={14} color="#10b981" /> ISO-27001 Certified Security
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MAIN CONTENT GRID (TOC + CLAUSES) ═══════════ */}
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
              color: "#4f46e5",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem"
            }}>
              <FileText size={14} /> Quick Navigation
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
                    color: activeSection === sec.id ? "#4f46e5" : "var(--text-muted)",
                    background: activeSection === sec.id ? "rgba(79, 70, 229, 0.08)" : "transparent",
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
                Need legal clarification?
              </p>
              <a
                href="mailto:legal@schoolmitra.com"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#4f46e5",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <Mail size={13} /> legal@schoolmitra.com
              </a>
            </div>
          </div>

          {/* Right Column: Structured Legal Clauses */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Clause 1: Acceptance */}
            <div id="acceptance" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #4f46e5, #7c3aed)",
              "--card-glow-color": "rgba(99, 102, 241, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                1. Acceptance of Terms
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                By signing an institutional subscription agreement, logging into the SchoolMitra Portal, or authorizing staff and parents to access the SchoolMitra Mobile Applications, your institution (&quot;School&quot;, &quot;Customer&quot;, or &quot;Subscriber&quot;) agrees to be bound by these Terms and Conditions (&quot;Terms&quot;) and our Privacy Policy.
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                If you are entering into these Terms on behalf of an educational trust, school society, or chain of campuses, you represent and warrant that you possess full legal authority to bind that entity to these provisions.
              </p>
            </div>

            {/* Clause 2: Services & Scope */}
            <div id="services" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #0284c7, #06b6d4)",
              "--card-glow-color": "rgba(2, 132, 199, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                2. Cloud Services &amp; Scope of License
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                SchoolMitra grants the subscriber a non-exclusive, non-transferable, revocable subscription license to access our cloud-hosted school management platform. Services include student records administration, automated fee collection engine, CBSE/ICSE marksheet generators, parent mobile apps, and driver GPS telematics.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "Subscriber shall not reverse-engineer, decompile, or copy proprietary source code.",
                  "Subscriber shall not resell, lease, or sub-license platform access to unauthorized third parties.",
                  "SchoolMitra reserves the right to deploy automated feature updates and security patches."
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <CheckCircle2 size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clause 3: Account Security & Roles */}
            <div id="user-accounts" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #059669, #10b981)",
              "--card-glow-color": "rgba(5, 150, 105, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                3. Account Security &amp; Role-Based Privileges
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                School administrators are responsible for designating authorized staff roles (Principal, Accountant, Class Teacher, Transport Coordinator). The school is solely responsible for maintaining the confidentiality of administrative credentials and immediately notifying SchoolMitra of any unauthorized access.
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                SchoolMitra enforces multi-factor authentication (MFA) options and encrypted password hashing to protect against breach attempts.
              </p>
            </div>

            {/* Clause 4: Student Data & Privacy */}
            <div id="data-ownership" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #d97706, #f59e0b)",
              "--card-glow-color": "rgba(217, 119, 6, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                4. Student Data Ownership &amp; Privacy Protection
              </h2>
              <div style={{
                background: "rgba(217, 119, 6, 0.08)",
                border: "1px solid rgba(217, 119, 6, 0.25)",
                borderRadius: 12,
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                gap: "0.6rem"
              }}>
                <Shield size={20} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: "0.85rem", color: "#92400e", lineHeight: 1.5, fontWeight: 600 }}>
                  Customer retains 100% ownership of all student rosters, examination marks, fee records, and guardian contact databases uploaded to SchoolMitra.
                </div>
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                SchoolMitra processes student information solely on behalf of the customer under the Indian Information Technology Act, 2000 and applicable Digital Personal Data Protection (DPDP) standards. We never sell, monetize, or share student records with external advertising networks.
              </p>
            </div>

            {/* Clause 5: Fees & Billing */}
            <div id="fees-billing" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #7c3aed, #a855f7)",
              "--card-glow-color": "rgba(124, 58, 237, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                5. Subscription Pricing &amp; Payment Terms
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                Subscription fees are billed monthly or annually as outlined in the active service order. All listed fees are in Indian Rupees (INR) and are subject to applicable GST rates.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "Invoices are payable within 15 calendar days from the date of issue.",
                  "Yearly subscription plans include a 20% commitment discount.",
                  "Parent online fee payment processing fees (UPI, Cards) adhere to standard RBI payment aggregator guidelines."
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <CheckCircle2 size={16} color="#7c3aed" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clause 6: GPS & Telemetry */}
            <div id="gps-telematics" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #0284c7, #38bdf8)",
              "--card-glow-color": "rgba(2, 132, 199, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                6. Bus GPS Telemetry &amp; Transit Safety
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                Live GPS bus telemetry requires functional hardware devices and continuous mobile telecommunication coverage. While SchoolMitra provides high-frequency satellite telemetry (2-second refresh rates), telemetry accuracy may occasionally be affected by cellular network dead zones or hardware power disruptions.
              </p>
            </div>

            {/* Clause 7: SLA & Uptime */}
            <div id="sla-uptime" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #059669, #34d399)",
              "--card-glow-color": "rgba(5, 150, 105, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                7. Service Level Agreement (SLA) &amp; Uptime
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                SchoolMitra commits to maintaining a 99.9% uptime for core portal services (excluding scheduled maintenance windows communicated 48 hours in advance). Redundant cloud data centers in Mumbai and Hyderabad ensure high-availability failover.
              </p>
            </div>

            {/* Clause 8: Intellectual Property */}
            <div id="intellectual-property" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #db2777, #ec4899)",
              "--card-glow-color": "rgba(219, 39, 119, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                8. Intellectual Property Rights
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                All trademarks, algorithms, UI components, report card layout engines, and documentation created by SchoolMitra remain the exclusive intellectual property of SchoolMitra Technologies Pvt. Ltd.
              </p>
            </div>

            {/* Clause 9: Limitation of Liability */}
            <div id="liability" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #6366f1, #818cf8)",
              "--card-glow-color": "rgba(99, 102, 241, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                9. Limitation of Liability
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                To the maximum extent permitted by applicable law, SchoolMitra shall not be liable for indirect, incidental, or consequential damages resulting from school hardware malfunctions, local internet outages, or third-party bank server downtimes. In all cases, SchoolMitra&apos;s aggregate liability is limited to the subscription amount paid by the school in the preceding 3 months.
              </p>
            </div>

            {/* Clause 10: Termination & Data Export */}
            <div id="termination" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #ea580c, #f97316)",
              "--card-glow-color": "rgba(234, 88, 12, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                10. Termination &amp; Seamless Data Export
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "0.85rem", fontWeight: 400 }}>
                Either party may terminate the subscription with 30 days prior written notice. Upon termination:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "Customer receives complete student & fee data export in standard CSV / Excel format within 7 business days.",
                  "All customer data is permanently and securely purged from active production servers after 30 days.",
                  "Zero lock-in exit penalties are charged."
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 500 }}>
                    <CheckCircle2 size={16} color="#ea580c" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clause 11: Governing Law */}
            <div id="governing-law" className="colorful-card" style={{
              background: "var(--bg-card)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              "--card-top-gradient": "linear-gradient(90deg, #4f46e5, #06b6d4)",
              "--card-glow-color": "rgba(79, 70, 229, 0.12)"
            } as React.CSSProperties}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                11. Governing Law &amp; Dispute Resolution
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the competent courts in Gautam Buddha Nagar (Noida / Uttar Pradesh), India.
              </p>
            </div>

            {/* Clause 12: Legal Contact */}
            <div id="contact-legal" className="colorful-card" style={{
              background: "var(--bg-subtle)",
              borderRadius: 20,
              padding: "2rem",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)"
            }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.75rem" }}>
                12. Legal Inquiries &amp; Official Communications
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.2rem", fontWeight: 400 }}>
                For any formal notices, contract clarifications, or data privacy requests under these Terms, please contact our legal compliance team:
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
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4f46e5", marginBottom: "0.2rem" }}>LEGAL COMPLIANCE OFFICER</div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-main)" }}>legal@schoolmitra.com</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>SchoolMitra Technologies Pvt. Ltd.</div>
                </div>

                <div style={{
                  padding: "1rem",
                  borderRadius: 12,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)"
                }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669", marginBottom: "0.2rem" }}>CORPORATE HEADQUARTERS</div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-main)" }}>Sector 62, Noida, UP 201309</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Phone: +91 91234 56789</div>
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
              <Sparkles size={12} color="#ec4899" /> TRUSTED ACROSS INDIA
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
