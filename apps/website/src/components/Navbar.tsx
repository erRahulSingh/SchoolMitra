"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, ArrowRight, Sun, Moon, ChevronDown, FileText, Bus, Smartphone } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
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
    <nav className="site-nav">
      {/* Brand Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.65rem" }}>
        <img
          src="/images/resources/logo.png"
          alt="SchoolMitra Logo"
          style={{ height: "38px", width: "auto", objectFit: "contain", borderRadius: "8px" }}
        />
        <span style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
          <span style={{ color: "var(--text-main)" }}>School</span>
          <span style={{ color: "var(--primary)" }}>Mitra</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link href="/features" className={`nav-link ${pathname === "/features" ? "active" : ""}`}>
          Features
        </Link>
        <div className="nav-dropdown">
          <span
            className={`nav-link ${
              pathname?.startsWith("/solutions") ||
              pathname === "/school-erp" ||
              pathname === "/transport" ||
              pathname === "/parent-app"
                ? "active"
                : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            Solutions <ChevronDown size={14} />
          </span>
          <div className="nav-dropdown-menu">
            <Link href="/school-erp" className="dropdown-item">
              <FileText size={16} color="#4338ca" /> School ERP
            </Link>
            <Link href="/transport" className="dropdown-item">
              <Bus size={16} color="#3b82f6" /> GPS Bus Tracking
            </Link>
            <Link href="/parent-app" className="dropdown-item">
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
      <div className="nav-actions">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <Link href="/login" className="btn-ghost-nav">
          Login
        </Link>

        <Link href="/contact" className="btn-primary-nav">
          Get Started <ArrowRight size={15} />
        </Link>
      </div>
    </nav>
  );
}

export { Navbar };

