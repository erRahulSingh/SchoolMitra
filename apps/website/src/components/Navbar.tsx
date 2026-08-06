"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, ArrowRight, Sun, Moon, ChevronDown, FileText, Bus, Smartphone, Menu, X } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
    if (currentTheme) setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <>
      <nav className="site-nav">
        {/* Brand Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src="/images/resources/logo.png"
            alt="SchoolMitra Logo"
            style={{ height: "52px", width: "auto", objectFit: "contain", borderRadius: "8px" }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links desktop-only">
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <Link href="/features" className={`nav-link ${pathname === "/features" ? "active" : ""}`}>
            Features
          </Link>
          <div className="nav-dropdown">
            <Link
              href="/solutions"
              className={`nav-link ${pathname?.startsWith("/solutions") ||
                pathname === "/school-erp" ||
                pathname === "/transport" ||
                pathname === "/parent-app"
                ? "active"
                : ""
                }`}
            >
              Solutions <ChevronDown size={14} />
            </Link>
            <div className="nav-dropdown-menu">
              <Link href="/solutions" className="dropdown-item">
                <span style={{ color: "#4338ca", fontWeight: 800 }}>✨</span> All Solutions Overview
              </Link>
              <Link href="/solutions#school-erp" className="dropdown-item">
                <FileText size={16} color="#4338ca" /> School ERP
              </Link>
              <Link href="/solutions#transport" className="dropdown-item">
                <Bus size={16} color="#3b82f6" /> GPS Bus Tracking
              </Link>
              <Link href="/solutions#parent-app" className="dropdown-item">
                <Smartphone size={16} color="#8b5cf6" /> Parent Mobile App
              </Link>
            </div>
          </div>
          <Link href="/pricing" className={`nav-link ${pathname === "/pricing" ? "active" : ""}`}>
            Pricing
          </Link>
          <Link href="/resources" className={`nav-link ${pathname === "/resources" ? "active" : ""}`}>
            Resources
          </Link>
          <Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>
            About Us
          </Link>
        </div>

        {/* Right Nav Actions */}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link href="/login" className="btn-ghost-nav desktop-only">
            Login
          </Link>

          <Link href="/contact" className="btn-primary-nav desktop-only">
            Get Started <ArrowRight size={15} />
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger-btn"
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              padding: "0.5rem",
              borderRadius: "10px",
              cursor: "pointer",
              color: "var(--text-main)"
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay & Backdrop (50% Width Right Drawer) */}
      {mobileMenuOpen && (
        <>
          {/* Dark Backdrop Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(15, 23, 42, 0.45)",
              backdropFilter: "blur(6px)",
              zIndex: 98
            }}
          />

          {/* 50% Width Right-Aligned White Drawer */}
          <div
            style={{
              position: "fixed",
              top: "64px",
              right: 0,
              left: "auto",
              width: "55%",
              minWidth: "210px",
              maxWidth: "280px",
              background: "#ffffff",
              zIndex: 99,
              padding: "1.2rem 1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              borderRadius: "0 0 0 20px",
              boxShadow: "-10px 20px 40px rgba(15, 23, 42, 0.25)",
              overflowY: "auto",
              borderLeft: "1px solid #e2e8f0",
              borderBottom: "1px solid #e2e8f0"
            }}
          >
            {[
              { label: "Home", href: "/" },
              { label: "Features", href: "/features" },
              { label: "Solutions", href: "/solutions" },
              { label: "Pricing", href: "/pricing" },
              { label: "Resources", href: "/resources" },
              { label: "About Us", href: "/about" }
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "#0f172a",
                  padding: "0.55rem 0.75rem",
                  borderRadius: "8px",
                  background: pathname === link.href ? "#f1f5f9" : "transparent"
                }}
              >
                {link.label}
              </Link>
            ))}

            <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "0.85rem", marginTop: "0.35rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: "0.6rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  color: "#0f172a",
                  textDecoration: "none"
                }}
              >
                Login
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: "0.6rem",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #4338ca, #3b82f6)",
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  color: "#ffffff",
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(67, 56, 202, 0.3)"
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export { Navbar };
