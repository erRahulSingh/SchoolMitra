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
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      WebkitFontSmoothing: "antialiased"
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

      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "60px 5% 30px 5%", position: "relative", zIndex: 1 }}>

        {/* ════════════ TOP NEWSLETTER SUBSCRIBER BANNER ════════════ */}
        <div className="footer-newsletter-banner" style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
          borderRadius: "18px",
          padding: "2rem 2.2rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "2rem",
          alignItems: "center",
          marginBottom: "3rem"
        }}>
          <div>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.25rem 0.65rem",
              borderRadius: "99px",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#818cf8",
              fontSize: "0.72rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              border: "1px solid rgba(99, 102, 241, 0.3)"
            }}>
              ✨ Stay Ahead in EdTech
            </span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.015em", marginBottom: "0.3rem" }}>
              Subscribe to School Management Insights
            </h3>
            <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
              Get monthly updates on CBSE/ICSE compliance, administration best practices, and new product releases.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                type="email"
                required
                placeholder="Enter your school email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.9rem",
                  borderRadius: "10px",
                  background: "#0f172a",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  fontSize: "0.82rem",
                  outline: "none"
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "0.65rem 1.25rem",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
                color: "#ffffff",
                border: "none",
                fontWeight: 600,
                fontSize: "0.82rem",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(67, 56, 202, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                whiteSpace: "nowrap"
              }}
            >
              {subscribed ? <CheckCircle2 size={15} color="#4ade80" /> : <Send size={14} />}
              <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
            </button>
          </form>
        </div>

        {/* ════════════ MAIN 4-COLUMN FOOTER NAVIGATION GRID ════════════ */}
        <div className="footer-nav-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: "2.8rem",
          marginBottom: "3rem"
        }}>
          {/* Column 1: Brand & Mission */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.95rem" }}>
              <img
                src="/images/resources/logo.png"
                alt="SchoolMitra Logo"
                style={{ height: "48px", width: "auto", objectFit: "contain", borderRadius: "6px" }}
              />
            </Link>

            <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.55, marginBottom: "1.2rem", maxWidth: "290px", fontWeight: 400 }}>
              Empowering 500+ K-12 institutions across India with automated ERP administration, real-time GPS bus tracking, and parent engagement.
            </p>

            {/* Live Operational Status Indicator */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.28rem 0.7rem",
              borderRadius: "99px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#34d399",
              fontSize: "0.72rem",
              fontWeight: 500,
              marginBottom: "1.3rem"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }}></span>
              All Systems Operational • 99.99% Uptime
            </div>

            {/* Social Media Links */}
            <div style={{ display: "flex", gap: "0.45rem" }}>
              {[
                { icon: <Facebook size={14} />, href: "#", name: "Facebook" },
                { icon: <Twitter size={14} />, href: "#", name: "Twitter" },
                { icon: <Linkedin size={14} />, href: "#", name: "LinkedIn" },
                { icon: <Youtube size={14} />, href: "#", name: "YouTube" },
                { icon: <Instagram size={14} />, href: "#", name: "Instagram" }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  aria-label={soc.name}
                  className={`footer-social-icon social-${soc.name.toLowerCase()}`}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    textDecoration: "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform Features */}
          <div>
            <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.01em" }}>
              Platform Features
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.8rem" }}>
              <li><Link href="/school-erp" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>School ERP Admin</Link></li>
              <li><Link href="/transport" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>GPS Bus Tracking</Link></li>
              <li><Link href="/parent-app" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>Parent Mobile App</Link></li>
              <li><Link href="/features#fees" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>Fee Gateway &amp; UPI</Link></li>
              <li><Link href="/features#exams" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>Report Cards &amp; Marks</Link></li>
              <li><Link href="/features#attendance" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>Digital Attendance &amp; SMS</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions & Company */}
          <div>
            <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.01em" }}>
              Solutions &amp; Company
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.8rem" }}>
              <li><Link href="/about" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>About SchoolMitra</Link></li>
              <li><Link href="/solutions" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>Stakeholder Solutions</Link></li>
              <li><Link href="/pricing" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>Pricing Plans</Link></li>
              <li><Link href="/resources" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>Resources &amp; SOPs</Link></li>
              <li><Link href="/terms" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" className="footer-link-hover" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 400 }}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Support */}
          <div>
            <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.01em" }}>
              Contact &amp; Support
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.8rem", color: "#94a3b8" }}>
              <div className="footer-contact-item" style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
                <Phone size={15} color="#3b82f6" className="footer-contact-icon" style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 500, fontSize: "0.8rem" }}>+91 91234 56789</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Mon-Sat (9:00 AM - 7:00 PM IST)</div>
                </div>
              </div>

              <div className="footer-contact-item" style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
                <Mail size={15} color="#3b82f6" className="footer-contact-icon" style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 500, fontSize: "0.8rem" }}>support@schoolmitra.com</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>2-4 hour response guarantee</div>
                </div>
              </div>

              <div className="footer-contact-item" style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
                <MapPin size={15} color="#3b82f6" className="footer-contact-icon" style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 500, fontSize: "0.8rem" }}>Corporate HQ (Noida)</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Tech Park, Sector 62, Noida, UP</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════ BOTTOM COPYRIGHT BAR ════════════ */}
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: "1.4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.85rem",
          fontSize: "0.76rem",
          color: "#64748b"
        }}>
          <div>
            © {new Date().getFullYear()} SchoolMitra Technologies Pvt. Ltd. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#94a3b8", fontSize: "0.76rem" }}>
            <ShieldCheck size={14} color="#34d399" />
            <span>ISO 27001 Certified • 256-Bit SSL Encrypted</span>
          </div>

          <div style={{ display: "flex", gap: "1.2rem" }}>
            <Link href="/privacy" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 500 }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 500 }}>Terms &amp; Conditions</Link>
            <Link href="/contact" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 500 }}>Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
