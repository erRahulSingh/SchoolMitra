"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Send
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer style={{
      background: "#090d16",
      color: "#f8fafc",
      position: "relative",
      overflow: "hidden",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      {/* Background Ambient Glow Accents */}
      <div style={{
        position: "absolute",
        top: "-100px",
        left: "20%",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(67, 56, 202, 0.15) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0
      }}></div>
      <div style={{
        position: "absolute",
        bottom: "-100px",
        right: "10%",
        width: "450px",
        height: "450px",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0
      }}></div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 5% 40px 5%", position: "relative", zIndex: 1 }}>

        {/* ════════════ TOP NEWSLETTER SUBSCRIBER BANNER ════════════ */}
        <div className="footer-newsletter-banner" style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
          borderRadius: "24px",
          padding: "2.8rem 3rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.3)",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "2.5rem",
          alignItems: "center",
          marginBottom: "4rem"
        }}>
          <div>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "99px",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#818cf8",
              fontSize: "0.78rem",
              fontWeight: 800,
              marginBottom: "0.8rem",
              border: "1px solid rgba(99, 102, 241, 0.3)"
            }}>
              ✨ Stay Ahead in EdTech
            </span>
            <h3 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              Subscribe to School Management Insights
            </h3>
            <p style={{ fontSize: "0.92rem", color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
              Get monthly updates on CBSE/ICSE compliance, school administration best practices, and new product features.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0.6rem" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                type="email"
                required
                placeholder="Enter your school email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 1.1rem",
                  borderRadius: "12px",
                  background: "#0f172a",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "0.85rem 1.5rem",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
                color: "#ffffff",
                border: "none",
                fontWeight: 800,
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(67, 56, 202, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                whiteSpace: "nowrap"
              }}
            >
              {subscribed ? <CheckCircle2 size={18} color="#4ade80" /> : <Send size={16} />}
              <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
            </button>
          </form>
        </div>

        {/* ════════════ MAIN 4-COLUMN FOOTER NAVIGATION GRID ════════════ */}
        <div className="footer-nav-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: "3.5rem",
          marginBottom: "4rem"
        }}>
          {/* Column 1: Brand & Mission */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.2rem" }}>
              <img
                src="/images/resources/logo.png"
                alt="SchoolMitra Logo"
                style={{ height: "62px", width: "auto", objectFit: "contain", borderRadius: "8px" }}
              />
            </Link>

            <p style={{ fontSize: "0.92rem", color: "#94a3b8", lineHeight: 1.65, marginBottom: "1.8rem", maxWidth: "320px" }}>
              Empowering 500+ K-12 institutions across India with automated ERP administration, real-time GPS bus tracking, and 1-click parent engagement.
            </p>

            {/* Live Operational Status Indicator */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.4rem 0.85rem",
              borderRadius: "99px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#34d399",
              fontSize: "0.78rem",
              fontWeight: 700,
              marginBottom: "1.8rem"
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }}></span>
              All Systems Operational • 99.99% Uptime
            </div>

            {/* Social Media Links Squircles */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {[
                { icon: <Facebook size={16} />, href: "#", name: "Facebook" },
                { icon: <Twitter size={16} />, href: "#", name: "Twitter" },
                { icon: <Linkedin size={16} />, href: "#", name: "LinkedIn" },
                { icon: <Youtube size={16} />, href: "#", name: "YouTube" },
                { icon: <Instagram size={16} />, href: "#", name: "Instagram" }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  aria-label={soc.name}
                  className={`footer-social-icon social-${soc.name.toLowerCase()}`}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform Features */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", marginBottom: "1.4rem", letterSpacing: "-0.01em" }}>
              Platform Features
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.9rem" }}>
              <li><Link href="/school-erp" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>School ERP Admin</Link></li>
              <li><Link href="/transport" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>GPS Bus Tracking</Link></li>
              <li><Link href="/parent-app" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>Parent Mobile App</Link></li>
              <li><Link href="/features#fees" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>Fee Gateway &amp; UPI</Link></li>
              <li><Link href="/features#exams" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>Report Cards &amp; Marks</Link></li>
              <li><Link href="/features#attendance" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>Digital Attendance &amp; SMS</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions & Stakeholders */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", marginBottom: "1.4rem", letterSpacing: "-0.01em" }}>
              Solutions
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.9rem" }}>
              <li><Link href="/pricing" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>For School Principals</Link></li>
              <li><Link href="/features" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>For Teachers &amp; Educators</Link></li>
              <li><Link href="/parent-app" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>For Parents &amp; Guardians</Link></li>
              <li><Link href="/transport" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>For Transport Managers</Link></li>
              <li><Link href="/resources" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>Resources &amp; Guides</Link></li>
              <li><Link href="/pricing" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none" }}>Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Support */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", marginBottom: "1.4rem", letterSpacing: "-0.01em" }}>
              Contact &amp; Support
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.9rem", color: "#94a3b8" }}>
              <div className="footer-contact-item" style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <Phone size={18} color="#3b82f6" className="footer-contact-icon" style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 700 }}>+91 98765 43210</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Mon-Sat (9:00 AM - 7:00 PM IST)</div>
                </div>
              </div>

              <div className="footer-contact-item" style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <Mail size={18} color="#3b82f6" className="footer-contact-icon" style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 700 }}>support@schoolmitra.com</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>24-hour response guarantee</div>
                </div>
              </div>

              <div className="footer-contact-item" style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <MapPin size={18} color="#3b82f6" className="footer-contact-icon" style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 700 }}>SchoolMitra EdTech HQ</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Cyber City, Sector 24, Gurugram, India</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════ BOTTOM COPYRIGHT BAR ════════════ */}
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.2rem",
          fontSize: "0.85rem",
          color: "#64748b"
        }}>
          <div>
            © {new Date().getFullYear()} SchoolMitra Technologies Pvt. Ltd. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", fontSize: "0.82rem" }}>
            <ShieldCheck size={16} color="#34d399" />
            <span>ISO 27001 Certified • 256-Bit SSL Encrypted</span>
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacy" style={{ color: "#94a3b8", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "#94a3b8", textDecoration: "none" }}>Terms of Service</Link>
            <Link href="/contact" style={{ color: "#94a3b8", textDecoration: "none" }}>Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
