"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, Fingerprint, Clock, BarChart3, Bus, CreditCard, Sparkles, BookOpen } from "lucide-react";

export default function ParentLoginPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loginMethod, setLoginMethod] = useState<"password" | "otp" | "biometric">("password");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowSplash(false), 400);
          return 100;
        }
        return prev + 8;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="mobile-frame" style={{
        padding: "0",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 30%, #1e293b 0%, #0f172a 60%, #020617 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div className="mobile-notch" />

        {/* Full-screen Splash Background Image Fallback & Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/splash-logo.jpg'), url('/splash-logo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.95,
          zIndex: 1
        }} />

        {/* Soft Dark Vignette Gradient Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0.15) 40%, rgba(2,6,23,0.85) 100%)",
          zIndex: 2
        }} />

        {/* Content Container */}
        <div style={{
          position: "relative", zIndex: 10, height: "100%", width: "100%",
          padding: "3.5rem 1.5rem 2rem 1.5rem",
          display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center",
          textAlign: "center"
        }}>

          {/* Animated Gold Emblem Seal Header */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="splash-emblem" style={{
              width: 145, height: 145, borderRadius: "50%",
              border: "3px solid #f59e0b",
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(15, 23, 42, 0.92) 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "0.8rem", color: "#fbbf24"
            }}>
              <div className="splash-icon-float">
                <BookOpen size={42} color="#fbbf24" />
              </div>
              <div style={{ fontSize: "0.78rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#fff", marginTop: 4 }}>
                EDU-CARE PARENT
              </div>
              <div style={{ fontSize: "0.68rem", color: "#fcd34d", fontWeight: 800 }}>
                &lsquo;हर कदम साथ&rsquo;
              </div>
            </div>
          </div>

          {/* Animated Center Headline */}
          <div className="splash-headline" style={{ margin: "1.5rem 0" }}>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#f8fafc", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              Track. Understand. Engage.
            </h1>
            <h2 style={{ fontSize: "1.55rem", fontWeight: 900, color: "#fbbf24", marginTop: 4, textShadow: "0 2px 10px rgba(245, 158, 11, 0.4)" }}>
              Succeed Together.
            </h2>
          </div>

          {/* Progress Bar & Staggered Animated Feature Badges */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
            
            {/* Animated Loading Bar */}
            <div style={{ width: "85%", maxWidth: 260, height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #f59e0b, #fbbf24)", borderRadius: 99, transition: "width 0.12s ease" }} />
            </div>
            <div style={{ fontSize: "0.72rem", color: "#cbd5e1", fontWeight: 800 }}>
              Initializing Parental Portal... {progress}%
            </div>

            {/* Bottom 4 Feature Badges with Staggered Entrance */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem", width: "100%" }}>
              {[
                { icon: Clock, label: "Attendance", color: "#ef4444", bg: "rgba(239,68,68,0.2)", cls: "splash-badge-1" },
                { icon: BarChart3, label: "Report Cards", color: "#f59e0b", bg: "rgba(245,158,11,0.2)", cls: "splash-badge-2" },
                { icon: Bus, label: "Bus Tracking", color: "#10b981", bg: "rgba(16,185,129,0.2)", cls: "splash-badge-3" },
                { icon: CreditCard, label: "Fee Payments", color: "#8b5cf6", bg: "rgba(139,92,246,0.2)", cls: "splash-badge-4" }
              ].map((item, idx) => (
                <div key={idx} className={item.cls} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: item.bg, border: `1.5px solid ${item.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color, boxShadow: `0 4px 14px ${item.bg}` }}>
                    <item.icon size={20} />
                  </div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#e2e8f0" }}>{item.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="mobile-frame" style={{ justifyContent: "center", padding: "2rem" }}>
      <div className="mobile-notch" />

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 18,
          background: "linear-gradient(135deg, #6366f1, #3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", margin: "0 auto 1rem auto",
          boxShadow: "0 8px 24px rgba(99, 102, 241, 0.35)"
        }}>
          <Building2 size={30} />
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--text-main)" }}>SchoolMitra Parent Login</h2>
        <p style={{ color: "var(--card-subtext)", fontSize: "0.82rem", marginTop: 4 }}>Sign in to access live bus tracking, fees & attendance</p>
      </div>

      {/* Login Method Selector */}
      <div className="subbox-ui" style={{ display: "flex", padding: "0.3rem", borderRadius: 14, marginBottom: "1.5rem" }}>
        <button type="button" onClick={() => setLoginMethod("password")} style={{ flex: 1, padding: "0.55rem", border: "none", borderRadius: 10, background: loginMethod === "password" ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent", color: loginMethod === "password" ? "#fff" : "var(--card-subtext)", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}>Password</button>
        <button type="button" onClick={() => setLoginMethod("otp")} style={{ flex: 1, padding: "0.55rem", border: "none", borderRadius: 10, background: loginMethod === "otp" ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent", color: loginMethod === "otp" ? "#fff" : "var(--card-subtext)", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}>OTP Login</button>
        <button type="button" onClick={() => setLoginMethod("biometric")} style={{ flex: 1, padding: "0.55rem", border: "none", borderRadius: 10, background: loginMethod === "biometric" ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent", color: loginMethod === "biometric" ? "#fff" : "var(--card-subtext)", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}>Biometric</button>
      </div>

      {loginMethod === "password" && (
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input type="tel" placeholder="Mobile Number (+91 98765 43210)" style={{ width: "100%", padding: "0.8rem 1rem", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 12, color: "var(--text-main)", fontSize: "0.88rem" }} />
          <input type="password" placeholder="Password" style={{ width: "100%", padding: "0.8rem 1rem", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 12, color: "var(--text-main)", fontSize: "0.88rem" }} />
          <Link href="/" style={{ padding: "0.85rem", background: "linear-gradient(135deg, #4f46e5, #3b82f6)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 800, textAlign: "center", textDecoration: "none", fontSize: "0.9rem", boxShadow: "0 6px 20px rgba(79, 70, 229, 0.35)" }}>
            Login to Parent Portal
          </Link>
        </form>
      )}

      {loginMethod === "biometric" && (
        <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
          <Fingerprint size={64} color="var(--primary)" style={{ margin: "0 auto 1rem auto" }} />
          <div className="text-title" style={{ fontWeight: 800, fontSize: "1rem" }}>Touch Fingerprint Sensor</div>
          <div className="text-muted-custom" style={{ fontSize: "0.8rem", marginTop: 4 }}>Scan Face ID or Fingerprint to authenticate</div>
          <Link href="/" style={{ display: "block", marginTop: "1.5rem", padding: "0.85rem", background: "linear-gradient(135deg, #4f46e5, #3b82f6)", borderRadius: 12, color: "#fff", fontWeight: 800, textDecoration: "none", fontSize: "0.9rem" }}>
            Confirm Biometric Sign-in
          </Link>
        </div>
      )}
    </div>
  );
}
