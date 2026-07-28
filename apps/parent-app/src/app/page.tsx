"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ParentHomePage from "./home/page";
import MyChildPage from "./child/page";
import AttendancePage from "./attendance/page";
import HomeworkPage from "./homework/page";
import ExamsPage from "./exams/page";
import TransportPage from "./transport/page";
import FeesPage from "./fees/page";
import NotificationsPage from "./notifications/page";
import CommunicationPage from "./communication/page";
import CalendarPage from "./calendar/page";
import ProfilePage from "./profile/page";
import HelpPage from "./help/page";
import AboutSchoolPage from "./about-school/page";
import LegalPage from "./legal/page";
import { 
  Home, 
  Bus, 
  User, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  GraduationCap, 
  Lock, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  Menu,
  Sun,
  Moon,
  Globe,
  Calendar,
  BookOpen,
  FileText,
  HelpCircle,
  Building,
  LogOut,
  X,
  Sparkles,
  ChevronRight,
  UserCheck,
  Award,
  TrendingUp,
  MapPin,
  Phone,
  Clock,
  BarChart3
} from "lucide-react";

export default function MobileAppShell() {
  const [activeTab, setActiveTab] = useState<
    "home" | "child" | "attendance" | "homework" | "exams" | 
    "bus" | "fees" | "notifications" | "chat" | "calendar" | 
    "profile" | "help" | "aboutSchool" | "legal"
  >("home");

  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 1. Splash Delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 2. Check Auth
  useEffect(() => {
    try {
      const stored = localStorage.getItem("parentUser");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      if (email === "parent@schoolmitra.com" && password === "parent123") {
        const parentData = { name: "Rajesh Sharma", email: "parent@schoolmitra.com", role: "PARENT" };
        localStorage.setItem("parentUser", JSON.stringify(parentData));
        setUser(parentData);
      } else {
        setErrorMsg("Invalid credentials. Use demo: parent@schoolmitra.com / parent123");
      }
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("parentUser");
    setUser(null);
    setIsSidebarOpen(false);
  };

  // Language Dictionaries
  const dict = {
    en: {
      appName: "SchoolMitra Parent",
      welcome: "Welcome,",
      studentName: "Aarav Sharma",
      studentClass: "Class 10-A • Delhi Public School",
      home: "Home",
      child: "My Child",
      attendance: "Attendance",
      homework: "Homework",
      exams: "Exams & Results",
      bus: "Live Bus",
      fees: "Fees & Pay",
      notifications: "Notifications",
      chat: "Communication",
      calendar: "Calendar",
      profile: "Profile Settings",
      help: "Help & Support",
      aboutSchool: "About School",
      legal: "Legal & Terms",
      logout: "Log Out Session"
    },
    hi: {
      appName: "स्कूलमित्र पेरेंट ऐप",
      welcome: "नमस्ते,",
      studentName: "आरव शर्मा",
      studentClass: "कक्षा 10-A • दिल्ली पब्लिक स्कूल",
      home: "होम डैशबोर्ड",
      child: "मेरा बच्चा",
      attendance: "उपस्थिति (Attendance)",
      homework: "गृहकार्य (Homework)",
      exams: "परीक्षा एवं परिणाम",
      bus: "लाइव बस ट्रैकिंग",
      fees: "शुल्क एवं भुगतान",
      notifications: "सूचनाएं (Notifications)",
      chat: "शिक्षक संवाद & चैट",
      calendar: "स्कूल कैलेंडर",
      profile: "प्रोफ़ाइल सेटिंग्स",
      help: "सहायता एवं सपोर्ट",
      aboutSchool: "स्कूल के बारे में",
      legal: "नियम एवं गोपनीयता",
      logout: "लॉगआउट करें"
    }
  };

  const t = dict[language];

  // 1. Splash Screen (EDU-CARE PARENT Animated Poster)
  if (showSplash) {
    return (
      <div className="mobile-frame" data-theme={theme} style={{
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
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, #f59e0b, #fbbf24)", borderRadius: 99, animation: "fadeIn 0.5s ease" }} />
            </div>
            <div style={{ fontSize: "0.72rem", color: "#cbd5e1", fontWeight: 800 }}>
              Initializing Parental Portal...
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

  // 2. Login Screen
  if (!user) {
    return (
      <div className="mobile-frame" data-theme={theme} style={{ background: '#020617', padding: '2.8rem 1.5rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div className="mobile-notch" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)',
            marginBottom: '1.25rem'
          }}>
            <GraduationCap size={30} color="#fff" />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>Parent Portal Login</h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem', marginBottom: '1.75rem' }}>
            Enter your registered mobile number or email
          </p>

          {errorMsg && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem', borderRadius: '12px', color: '#f87171', fontSize: '0.75rem', marginBottom: '1rem', fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Email Address / Mobile</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@schoolmitra.com"
                  required
                  style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.85rem',
                background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
                border: 'none', borderRadius: '12px', color: '#fff',
                fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)', marginTop: '0.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
              }}
            >
              <span>{loading ? "Authenticating..." : "Sign In to Parent Portal"}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px dashed rgba(99, 102, 241, 0.3)', borderRadius: '12px', fontSize: '0.72rem', color: '#a5b4fc' }}>
            <strong>Demo Parent Credentials:</strong><br />
            Email: <code>parent@schoolmitra.com</code><br />
            Password: <code>parent123</code>
          </div>

          <div style={{ textAlign: "center", fontSize: "0.75rem", color: "#64748b", marginTop: "1rem" }}>
            Need login credentials? <Link href="/contact" style={{ color: "#3b82f6", fontWeight: 700, textDecoration: "none" }}>Contact School Admin</Link>
          </div>
        </div>
      </div>
    );
  }

  // Navigation Items array for Sidebar
  const navigationMenuItems = [
    { id: "home", label: t.home, icon: Home },
    { id: "child", label: t.child, icon: User },
    { id: "attendance", label: t.attendance, icon: UserCheck },
    { id: "homework", label: t.homework, icon: BookOpen },
    { id: "exams", label: t.exams, icon: Award },
    { id: "bus", label: t.bus, icon: Bus },
    { id: "fees", label: t.fees, icon: CreditCard },
    { id: "notifications", label: t.notifications, icon: Bell },
    { id: "chat", label: t.chat, icon: MessageSquare },
    { id: "calendar", label: t.calendar, icon: Calendar },
    { id: "profile", label: t.profile, icon: User },
    { id: "help", label: t.help, icon: HelpCircle },
    { id: "aboutSchool", label: t.aboutSchool, icon: Building },
    { id: "legal", label: t.legal, icon: ShieldCheck }
  ];

  return (
    <div className="mobile-frame" data-theme={theme}>
      <div className="mobile-notch" />

      {/* ════════════ TOP HEADER BAR ════════════ */}
      <div style={{
        padding: '2.8rem 1rem 0.85rem 1rem',
        background: 'var(--bg-header)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-card)',
        transition: 'background 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            style={{
              background: 'rgba(99, 102, 241, 0.15)', border: 'none', padding: '0.45rem',
              borderRadius: 10, color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center'
            }}
          >
            <Menu size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.8rem'
            }}>
              AS
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>{t.studentName}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{t.studentClass}</div>
            </div>
          </div>
        </div>

        {/* Right Header Action Icons */}
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              background: 'rgba(255,255,255,0.08)', border: 'none', padding: '0.45rem',
              borderRadius: '50%', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center'
            }}
          >
            {theme === "dark" ? <Sun size={16} color="#fbbf24" /> : <Moon size={16} color="#6366f1" />}
          </button>

          {/* Language Toggle Button */}
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            style={{
              background: 'rgba(99, 102, 241, 0.2)', border: 'none', padding: '0.3rem 0.55rem',
              borderRadius: 99, color: 'var(--primary)', fontSize: '0.68rem', fontWeight: 800,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem'
            }}
          >
            <Globe size={13} />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Notification Bell */}
          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            style={{
              background: 'rgba(255,255,255,0.08)', border: 'none', padding: '0.45rem',
              borderRadius: '50%', color: 'var(--text-main)', position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center'
            }}
          >
            <Bell size={16} />
            <span style={{ position: 'absolute', top: '2px', right: '2px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
          </button>
        </div>
      </div>

      {/* ════════════ SLIDE-OUT NAVIGATION SIDEBAR DRAWER ════════════ */}
      {isSidebarOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />

          <div className="sidebar-drawer">
            {/* Sidebar Top Header */}
            <div style={{ padding: "2.8rem 1.25rem 1.25rem 1.25rem", borderBottom: "1px solid var(--border-card)", background: "rgba(2, 6, 23, 0.4)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "1.1rem" }}>
                  RS
                </div>
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-main)" }}>Rajesh Sharma</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{t.studentName} • Class 10-A</div>
                </div>
              </div>

              <button type="button" onClick={() => setIsSidebarOpen(false)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "var(--text-main)", padding: "0.35rem", borderRadius: "50%", cursor: "pointer" }}>
                <X size={18} />
              </button>
            </div>

            {/* Quick Controls inside Sidebar */}
            <div style={{ padding: "0.85rem 1.25rem", borderBottom: "1px solid var(--border-card)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                style={{
                  padding: "0.45rem", borderRadius: 10, border: "1px solid var(--border-card)",
                  background: "rgba(255,255,255,0.05)", color: "var(--text-main)", fontSize: "0.72rem", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem", cursor: "pointer"
                }}
              >
                {theme === "dark" ? <Sun size={14} color="#fbbf24" /> : <Moon size={14} color="#6366f1" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <button
                type="button"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                style={{
                  padding: "0.45rem", borderRadius: 10, border: "1px solid var(--border-card)",
                  background: "rgba(255,255,255,0.05)", color: "var(--text-main)", fontSize: "0.72rem", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem", cursor: "pointer"
                }}
              >
                <Globe size={14} color="#38bdf8" />
                <span>{language === "en" ? "हिन्दी" : "English"}</span>
              </button>
            </div>

            {/* Complete Navigation List */}
            <div style={{ flex: 1, padding: "0.85rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--text-muted)", padding: "0.35rem 0.6rem", textTransform: "uppercase" }}>
                Main Navigation
              </div>

              {navigationMenuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsSidebarOpen(false);
                  }}
                  style={{
                    padding: "0.65rem 0.75rem", borderRadius: 12, border: "none",
                    background: activeTab === item.id ? "rgba(99, 102, 241, 0.18)" : "transparent",
                    color: activeTab === item.id ? "var(--primary)" : "var(--text-main)",
                    fontWeight: activeTab === item.id ? 800 : 600,
                    fontSize: "0.82rem",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <item.icon size={17} />
                    <span>{item.label}</span>
                  </div>

                  <ChevronRight size={14} color="var(--text-muted)" />
                </button>
              ))}
            </div>

            {/* Sidebar Bottom Logout */}
            <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border-card)", background: "rgba(239, 68, 68, 0.08)" }}>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  width: "100%", padding: "0.65rem", borderRadius: 10, border: "none",
                  background: "rgba(239, 68, 68, 0.18)", color: "#f87171", fontWeight: 800, fontSize: "0.8rem",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", cursor: "pointer"
                }}
              >
                <LogOut size={16} /> {t.logout}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ════════════ MAIN SCREEN CONTENT ════════════ */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingBottom: '75px' }}>
        {activeTab === "home" && <ParentHomePage language={language} />}
        {activeTab === "child" && <MyChildPage language={language} />}
        {activeTab === "attendance" && <AttendancePage language={language} />}
        {activeTab === "homework" && <HomeworkPage language={language} />}
        {activeTab === "exams" && <ExamsPage language={language} />}
        {activeTab === "bus" && <TransportPage language={language} />}
        {activeTab === "fees" && <FeesPage language={language} />}
        {activeTab === "notifications" && <NotificationsPage language={language} />}
        {activeTab === "chat" && <CommunicationPage language={language} />}
        {activeTab === "calendar" && <CalendarPage language={language} />}
        {activeTab === "profile" && <ProfilePage language={language} />}
        {activeTab === "help" && <HelpPage language={language} />}
        {activeTab === "aboutSchool" && <AboutSchoolPage language={language} />}
        {activeTab === "legal" && <LegalPage language={language} />}
      </div>

      {/* ════════════ MOBILE BOTTOM NAVIGATION BAR (5 TABS) ════════════ */}
      <div className="bottom-nav">
        <button onClick={() => setActiveTab("home")} className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}>
          <Home size={20} />
          <span>{t.home}</span>
        </button>
        <button onClick={() => setActiveTab("bus")} className={`nav-tab ${activeTab === 'bus' ? 'active' : ''}`}>
          <Bus size={20} />
          <span>{t.bus}</span>
        </button>
        <button onClick={() => setActiveTab("child")} className={`nav-tab ${activeTab === 'child' ? 'active' : ''}`}>
          <User size={20} />
          <span>{t.child}</span>
        </button>
        <button onClick={() => setActiveTab("notifications")} className={`nav-tab ${activeTab === 'notifications' ? 'active' : ''}`}>
          <Bell size={20} />
          <span>{t.notifications}</span>
        </button>
        <button onClick={() => setActiveTab("profile")} className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}>
          <UserCheck size={20} />
          <span>{t.profile}</span>
        </button>
      </div>
    </div>
  );
}
