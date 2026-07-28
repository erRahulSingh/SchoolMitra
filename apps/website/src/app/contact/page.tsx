"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone, Mail, MapPin, Send, CheckCircle, Clock, Shield,
  Headphones, MessageCircle, ChevronDown, ChevronRight,
  Sun, Moon, Bus, Smartphone, FileText, ArrowRight, Globe,
  Building2, Calendar, GraduationCap
} from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [theme, setTheme] = useState("light");
  const [submitted, setSubmitted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqData = [
    { q: "How can I request a demo for my school?", a: "You can request a free demo by filling out the contact form above, or by directly contacting us via email at support@schoolmitra.com." },
    { q: "What is the pricing for SchoolMitra?", a: "Pricing depends on the number of active students and modules selected. Visit our Pricing page or contact our sales team for a custom quote." },
    { q: "Do you provide training and onboarding?", a: "Yes, we provide complete virtual and on-site training for administrators, teachers, and drivers during onboarding." },
    { q: "Can I integrate SchoolMitra with other tools?", a: "Yes, our developer friendly APIs support integrations with biometric devices, RFID scanners, SMS gateways, and GPS devices." },
    { q: "Is my school data secure with SchoolMitra?", a: "Absolutely. We use industry-standard encryption, secure cloud infrastructure, and regular automated backups to ensure your data is always protected." }
  ];

  return (
    <div style={{ background: "var(--bg-page)", minHeight: "100vh", color: "var(--text-main)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ═══════════ NAVBAR (Same to Same Mockup) ═══════════ */}
      <nav className="site-nav" style={{
        background: "var(--bg-card)", borderBottom: "1px solid var(--border-color)",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 72, padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#4338ca 0%,#3b82f6 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", boxShadow: "0 4px 14px rgba(67,56,202,.35)", transform: "rotate(-4deg)"
          }}><GraduationCap size={20} /></div>
          <span style={{ fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span style={{ color: "var(--text-main)" }}>School</span>
            <span style={{ color: "#3b82f6" }}>Mitra</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links" style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
          <Link href="/" className="nav-link" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.92rem", fontWeight: 600 }}>Home</Link>
          <Link href="/features" className="nav-link" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.92rem", fontWeight: 600 }}>Features</Link>
          <div className="nav-dropdown" style={{ position: "relative" }}>
            <span className="nav-link" style={{ color: "var(--text-muted)", cursor: "pointer", fontSize: "0.92rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              Solutions <ChevronDown size={14} />
            </span>
          </div>
          <Link href="/pricing" className="nav-link" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.92rem", fontWeight: 600 }}>Pricing</Link>
          <div className="nav-dropdown" style={{ position: "relative" }}>
            <span className="nav-link" style={{ color: "var(--text-muted)", cursor: "pointer", fontSize: "0.92rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              Resources <ChevronDown size={14} />
            </span>
          </div>
          <Link href="/about" className="nav-link active" style={{ color: "var(--primary)", textDecoration: "none", fontSize: "0.92rem", fontWeight: 700 }}>About Us</Link>
        </div>

        {/* Actions */}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle theme" style={{
            background: "var(--bg-subtle)", border: "1px solid var(--border-color)",
            padding: "0.45rem", borderRadius: "8px", cursor: "pointer",
            color: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "0.5rem"
          }}>{theme === "light" ? <Moon size={16} /> : <Sun size={16} />}</button>

          <Link href="/login" className="btn-ghost-nav" style={{
            padding: "0.55rem 1.25rem", borderRadius: "10px",
            border: "1px solid var(--border-color)", color: "var(--text-main)",
            textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", background: "var(--bg-card)"
          }}>Login</Link>

          <Link href="/contact" className="btn-primary-nav" style={{
            padding: "0.55rem 1.35rem", borderRadius: "10px",
            background: "#4f46e5", color: "#fff", border: "none",
            fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)", textDecoration: "none"
          }}>Get Started</Link>
        </div>
      </nav>

      {/* ═══════════ HERO: CONTACT FORM + INFO ═══════════ */}
      <section style={{
        paddingTop: 95, paddingBottom: 15, paddingLeft: "5%", paddingRight: "5%",
        background: "var(--bg-page)", position: "relative"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "2.5rem", alignItems: "flex-start" }}>

          {/* ── Left: Contact info ── */}
          <div>
            {/* Pill Badge */}
            <div className="resources-badge" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.35rem 0.95rem", borderRadius: 9999,
              background: "#eef2ff", color: "#4f46e5",
              fontSize: "0.82rem", fontWeight: 600, marginBottom: "1.5rem"
            }}>
              <Phone size={14} color="#4f46e5" /> We&apos;re Here to Help
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: "clamp(2.5rem,4.2vw,3.3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "0.65rem", color: "var(--text-main)" }}>
              Contact Us
            </h1>
            <h2 style={{ fontSize: "clamp(1.75rem,3.2vw,2.4rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "1.5rem", color: "var(--text-main)" }}>
              We would love to hear<br />from{" "}
              <span style={{ color: "#4f46e5" }}>you!</span>
            </h2>

            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 460, marginBottom: "2.2rem" }}>
              Have a question, need a demo, or want to know more about SchoolMitra? Our team is ready to assist you.
            </p>

            {/* Info items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem", marginBottom: "2.2rem" }}>
              {[
                { icon: <Headphones size={22} color="#4f46e5" />, bg: "#eef2ff", title: "Quick Support", desc: "Get fast and helpful responses from our support team." },
                { icon: <MessageCircle size={22} color="#10b981" />, bg: "#e6f4ea", title: "Expert Guidance", desc: "Talk to our experts to find the right solution for your school." },
                { icon: <Clock size={22} color="#f59e0b" />, bg: "#fef7e0", title: "We&apos;re Available", desc: "Mon – Sat, 9:00 AM to 7:00 PM (IST)" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, background: item.bg,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.15rem", color: "var(--text-main)" }}>{item.title}</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.45 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy alert box */}
            <div className="contact-privacy-box" style={{
              borderRadius: 16, padding: "1.2rem 1.4rem",
              display: "flex", alignItems: "center", gap: "1.1rem",
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Shield size={22} color="#0284c7" />
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.15rem", color: "#0369a1" }}>Your data is safe with us.</h4>
                <p style={{ fontSize: "0.82rem", color: "#0369a1", opacity: 0.9, lineHeight: 1.45 }}>We respect your privacy and never share your information with third parties.</p>
              </div>
              {/* Watermark */}
              <div style={{ position: "absolute", right: -10, bottom: -10, opacity: 0.05, transform: "rotate(15deg)" }}>
                <Shield size={90} color="#0284c7" />
              </div>
            </div>
          </div>

          {/* Right: Form Card */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border-color)",
            borderRadius: 20, padding: "2rem",
            boxShadow: "0 10px 30px rgba(15,23,42,0.04)"
          }}>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--text-main)" }}>Send us a Message</h3>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <CheckCircle size={52} color="#10b981" style={{ marginBottom: "1rem" }} />
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>We&apos;ll respond within 2-4 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {/* Full Name */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.35rem", color: "var(--text-main)" }}>Full Name</label>
                  <input type="text" placeholder="Enter your full name" required style={{
                    width: "100%", padding: "0.7rem 0.9rem", borderRadius: 10,
                    border: "1px solid var(--border-color)", background: "var(--bg-page)",
                    color: "var(--text-main)", fontSize: "0.88rem", fontFamily: "inherit", outline: "none"
                  }} />
                </div>

                {/* Work Email */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.35rem", color: "var(--text-main)" }}>Work Email</label>
                  <input type="email" placeholder="Enter your email address" required style={{
                    width: "100%", padding: "0.7rem 0.9rem", borderRadius: 10,
                    border: "1px solid var(--border-color)", background: "var(--bg-page)",
                    color: "var(--text-main)", fontSize: "0.88rem", fontFamily: "inherit", outline: "none"
                  }} />
                </div>

                {/* Phone Number */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.35rem", color: "var(--text-main)" }}>Phone Number</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "0.35rem",
                      padding: "0.7rem 0.75rem", borderRadius: 10,
                      border: "1px solid var(--border-color)", background: "var(--bg-page)",
                      fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)", minWidth: 85
                    }}>
                      🇮🇳 +91 <ChevronDown size={12} />
                    </div>
                    <input type="tel" placeholder="Enter your phone number" style={{
                      flex: 1, padding: "0.7rem 0.9rem", borderRadius: 10,
                      border: "1px solid var(--border-color)", background: "var(--bg-page)",
                      color: "var(--text-main)", fontSize: "0.88rem", fontFamily: "inherit", outline: "none"
                    }} />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.35rem", color: "var(--text-main)" }}>Subject</label>
                  <select style={{
                    width: "100%", padding: "0.7rem 0.9rem", borderRadius: 10,
                    border: "1px solid var(--border-color)", background: "var(--bg-page)",
                    color: "var(--text-muted)", fontSize: "0.88rem", fontFamily: "inherit", outline: "none",
                    appearance: "none", cursor: "pointer"
                  }}>
                    <option>What is this regarding?</option>
                    <option>School ERP Demo</option>
                    <option>GPS Bus Tracking</option>
                    <option>Pricing Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.35rem", color: "var(--text-main)" }}>Message</label>
                  <textarea placeholder="Tell us more about your query..." rows={3} style={{
                    width: "100%", padding: "0.7rem 0.9rem", borderRadius: 10,
                    border: "1px solid var(--border-color)", background: "var(--bg-page)",
                    color: "var(--text-main)", fontSize: "0.88rem", fontFamily: "inherit", outline: "none",
                    resize: "vertical"
                  }} />
                </div>

                {/* Checkbox */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <input type="checkbox" required style={{ width: 16, height: 16, accentColor: "#4f46e5" }} />
                  <span>I agree to the <Link href="/privacy" style={{ color: "#4f46e5", fontWeight: 600 }}>Privacy Policy</Link> and <Link href="/terms" style={{ color: "#4f46e5", fontWeight: 600 }}>Terms & Conditions</Link></span>
                </div>

                {/* Submit button */}
                <button type="submit" style={{
                  width: "100%", padding: "0.75rem",
                  borderRadius: 12, border: "none",
                  background: "#4f46e5",
                  color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  boxShadow: "0 4px 14px rgba(79,70,229,0.25)",
                  transition: "all 0.2s"
                }}>
                  Send Message <Send size={16} />
                </button>

                {/* Response time */}
                <div style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  Average response time: <Clock size={14} color="#10b981" /> <span style={{ fontWeight: 700, color: "#10b981" }}>2-4 Hours</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ OUR OFFICES ═══════════ */}
      <section style={{ paddingTop: 30, paddingBottom: 60, paddingLeft: "5%", paddingRight: "5%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Divider */}
          <div style={{ borderTop: "1px solid var(--border-color)", marginBottom: "2.5rem" }} />

          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div className="resources-badge" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.35rem 0.9rem", borderRadius: 9999,
              background: "#eef2ff", color: "#4f46e5",
              fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.75rem"
            }}>
              <Globe size={14} color="#4f46e5" /> Our Offices
            </div>
            <h2 style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.4rem", color: "var(--text-main)" }}>We Are Globally Connected</h2>
            <p style={{ fontSize: "0.92rem", color: "var(--text-muted)" }}>Visit our offices or connect with our team through any of the channels below.</p>
          </div>

          {/* Office cards + More Ways grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.2fr", gap: "1.5rem" }}>
            {/* Office cards */}
            {[
              { color: "#4f46e5", bg: "#eef2ff", title: "Head Office", line1: "123, Tech Park, Sector 62", line2: "Noida, Uttar Pradesh", line3: "India – 201309" },
              { color: "#10b981", bg: "#e6f4ea", title: "Corporate Office", line1: "45, Residency Road", line2: "Bengaluru, Karnataka", line3: "India – 560025" },
              { color: "#f59e0b", bg: "#fef7e0", title: "Support Office", line1: "1st Floor, Plot No. 12", line2: "Hitech City, Hyderabad", line3: "Telangana – 500081" },
            ].map((office, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", border: "1px solid var(--border-color)",
                borderRadius: 18, padding: "1.5rem",
                display: "flex", flexDirection: "column",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                transition: "all 0.25s ease"
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)"; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: office.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Building2 size={22} color={office.color} />
                </div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.85rem", color: "var(--text-main)" }}>{office.title}</h4>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6, flex: 1 }}>
                  {office.line1}<br />{office.line2}<br />{office.line3}
                </p>
                <button style={{
                  marginTop: "1.25rem", display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  background: "transparent", border: "none", padding: 0,
                  color: "#4f46e5", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer"
                }}>View on Map <ArrowRight size={13} /></button>
              </div>
            ))}

            {/* More Ways to Connect */}
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border-color)",
              borderRadius: 18, padding: "1.5rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
            }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--text-main)" }}>More Ways to Connect</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  { icon: <Mail size={18} />, bg: "#eef2ff", color: "#4f46e5", title: "Email Us", desc: "support@schoolmitra.com" },
                  { icon: <Phone size={18} />, bg: "#e6f4ea", color: "#10b981", title: "Call Us", desc: "+91 91234 56789" },
                  { icon: <MessageCircle size={18} />, bg: "#e6f4ea", color: "#22c55e", title: "WhatsApp Us", desc: "+91 91234 56789" },
                  { icon: <Calendar size={18} />, bg: "#e0f2fe", color: "#0284c7", title: "Request a Demo", desc: "Book a free demo with our experts" },
                ].map((c, j) => (
                  <div key={j} style={{
                    display: "flex", alignItems: "center", gap: "0.85rem",
                    padding: "0.65rem 0.75rem", borderRadius: 12,
                    cursor: "pointer", transition: "background 0.15s"
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "var(--bg-subtle)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", color: c.color, flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h5 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.15rem", color: "var(--text-main)" }}>{c.title}</h5>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{c.desc}</p>
                    </div>
                    <ChevronRight size={16} color="var(--text-light)" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQs & CHAT BOX SECTION ═══════════ */}
      <section style={{ padding: "0 5% 4rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "2.5rem" }}>
          {/* FAQ Accordion Box */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border-color)",
            borderRadius: 20, padding: "2rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column"
          }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--text-main)" }}>Frequently Asked Questions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1 }}>
              {faqData.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} style={{
                    borderBottom: "1px solid var(--border-color)",
                    paddingBottom: "0.85rem",
                    paddingTop: "0.45rem",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer"
                  }}
                    onClick={() => toggleFaq(idx)}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)" }}>{item.q}</span>
                      <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--text-light)" }}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                    {isOpen && (
                      <p style={{
                        marginTop: "0.55rem", fontSize: "0.82rem", color: "var(--text-muted)",
                        lineHeight: 1.5, animation: "fadeIn 0.2s ease-out"
                      }}>{item.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              padding: "0.55rem 1.25rem", borderRadius: 10,
              border: "1px solid #3b82f6", background: "transparent",
              color: "#3b82f6", fontWeight: 700, fontSize: "0.85rem",
              cursor: "pointer", transition: "all 0.2s", margin: "1.5rem auto 0",
              width: "fit-content", justifyContent: "center"
            }}>View All FAQs <ArrowRight size={14} /></button>
          </div>

          {/* Need Immediate Help Box */}
          <div className="contact-help-box" style={{
            borderRadius: 20, padding: "2rem",
            display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: "1rem", alignItems: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
          }}>
            <div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--text-main)" }}>Need Immediate Help?</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                Chat with our support team instantly for quick assistance.
              </p>
              <button className="contact-help-btn" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.6rem 1.35rem", borderRadius: 12,
                fontWeight: 800, fontSize: "0.88rem",
                cursor: "pointer", boxShadow: "0 4px 12px rgba(67,56,202,0.08)",
                transition: "all 0.2s"
              }}>
                Start Live Chat <MessageCircle size={16} />
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="/images/resources/chat-headphones.png" alt="Headphones illustration" style={{ width: "100%", maxWidth: 130, height: "auto", objectFit: "contain" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MAP PREVIEW SECTION ═══════════ */}
      <section style={{ padding: "0 5% 4rem" }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", position: "relative",
          borderRadius: 22, overflow: "hidden", height: 280,
          border: "1px solid var(--border-color)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
          backgroundImage: "radial-gradient(rgba(99,102,241,0.15) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px"
        }}>
          {/* Background Map Image */}
          <img 
            src="/images/resources/map-view.png" 
            alt="Office locations map" 
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, zIndex: 1 }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />

          {/* Fallback Vector Pin (Visible when image loads or fails) */}
          <div style={{
            position: "absolute", left: "62%", top: "45%", zIndex: 0,
            transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center"
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: "50%", background: "rgba(99,102,241,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite", position: "absolute"
            }} />
            <MapPin size={32} color="#4f46e5" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" }} />
          </div>

          {/* Overlay Card */}
          <div style={{
            position: "absolute", left: 40, top: "50%", transform: "translateY(-50%)",
            background: "var(--bg-card)", border: "1px solid var(--border-color)",
            borderRadius: 16, padding: "1.5rem 1.75rem", maxWidth: 300,
            boxShadow: "0 8px 30px rgba(15,23,42,0.12)", zIndex: 2
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.55rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={16} color="var(--primary)" />
              </div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)" }}>Finding us is easy!</h4>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
              Our offices are strategically located to serve you better.
            </p>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)", display: "inline-flex", alignItems: "center", gap: "0.3rem", cursor: "pointer" }}>
              Get Directions <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
