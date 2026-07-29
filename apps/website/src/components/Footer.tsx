"use client";

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
  Instagram 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            <img
              src="/images/resources/logo.png"
              alt="SchoolMitra Logo"
              style={{ height: "34px", width: "auto", objectFit: "contain", borderRadius: "6px" }}
            />
            <span style={{ fontSize: "1.25rem", fontWeight: 800 }}>
              <span style={{ color: "var(--text-main)" }}>School</span>
              <span style={{ color: "var(--primary)" }}>Mitra</span>
            </span>
          </Link>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 300, marginBottom: "1.5rem" }}>
            The complete SaaS platform for modern school administration, live bus GPS tracking, and seamless parent engagement.
          </p>
          <div style={{ display: "flex", gap: "1rem", color: "var(--text-muted)" }}>
            <Facebook size={18} style={{ cursor: "pointer" }} />
            <Twitter size={18} style={{ cursor: "pointer" }} />
            <Linkedin size={18} style={{ cursor: "pointer" }} />
            <Youtube size={18} style={{ cursor: "pointer" }} />
            <Instagram size={18} style={{ cursor: "pointer" }} />
          </div>
        </div>

        <div>
          <h4 className="footer-col-title">Product</h4>
          <ul className="footer-links">
            <li><Link href="/school-erp">School ERP</Link></li>
            <li><Link href="/transport">GPS Bus Tracking</Link></li>
            <li><Link href="/parent-app">Parent Mobile App</Link></li>
            <li><Link href="/features">All Features</Link></li>
            <li><Link href="/pricing">Pricing Plans</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Solutions</h4>
          <ul className="footer-links">
            <li><Link href="/solutions">For Principals</Link></li>
            <li><Link href="/solutions">For Teachers</Link></li>
            <li><Link href="/solutions">For Parents</Link></li>
            <li><Link href="/solutions">For Transport Managers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/blogs">Blog &amp; News</Link></li>
            <li><Link href="/contact">Contact Support</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Contact</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Phone size={15} color="var(--primary)" /> +91 98765 43210
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Mail size={15} color="var(--primary)" /> support@schoolmitra.com
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={15} color="var(--primary)" /> New Delhi, India
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} SchoolMitra Technologies Pvt. Ltd. All rights reserved.</div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/security">Security</Link>
        </div>
      </div>
    </footer>
  );
}
