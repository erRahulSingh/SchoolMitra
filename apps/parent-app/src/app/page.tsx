"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ParentHomePage from "./home/page";
import MyChildPage from "./child/page";
import AttendancePage from "./attendance/page";
import HomeworkPage from "./homework/page";
import ExamsPage from "./exams/page";
import AcademicsPage from "./academics/page";
import MorePage from "./more/page";
import TransportPage from "./transport/page";
import FeesPage from "./fees/page";
import NotificationsPage from "./notifications/page";
import CommunicationPage from "./communication/page";
import CalendarPage from "./calendar/page";
import ProfilePage from "./profile/page";
import HelpPage from "./help/page";
import AboutSchoolPage from "./about-school/page";
import LegalPage from "./legal/page";
import ReportCardPage from "./report-card/page";
import EventsPage from "./events/page";
import NoticeBoardPage from "./notice-board/page";
import TimeTablePage from "./time-table/page";
import GalleryPage from "./gallery/page";
import AssignmentsPage from "./assignments/page";
import StudyMaterialsPage from "./study-materials/page";
import SubjectDetailsPage from "./subject-details/page";
import TeacherProfilePage from "./teacher-profile/page";
import MedicalDetailsPage from "./medical/page";
import DigitalIdCardPage from "./id-card/page";
import HolidaysPage from "./holidays/page";
import NotificationSettingsPage from "./notification-settings/page";
import PrivacySecurityPage from "./privacy-security/page";
import OfflinePage from "./offline/page";
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

import { parentApi } from "@/lib/api";

export default function MobileAppShell() {
  const [activeTab, setActiveTab] = useState<
    "home" | "academics" | "more" | "child" | "attendance" | "homework" | "exams" | 
    "bus" | "fees" | "notifications" | "chat" | "calendar" | 
    "profile" | "help" | "aboutSchool" | "legal"
  >("home");

  const [showSplash, setShowSplash] = useState(true);
  const [inboxCount, setInboxCount] = useState(3);

  useEffect(() => {
    // Fetch live inbox count from backend API
    parentApi.getInbox().then((res) => {
      if (res.success && res.unreadCount !== undefined) {
        setInboxCount(res.unreadCount);
      }
    });
  }, []);
  const [theme, setTheme] = useState<"dark" | "light">("light");
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
      } else {
        // Auto demo user for seamless preview
        const demoUser = { name: "Anjali Sharma", email: "parent@schoolmitra.com", role: "PARENT" };
        setUser(demoUser);
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
        const parentData = { name: "Anjali Sharma", email: "parent@schoolmitra.com", role: "PARENT" };
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
      appName: "SchoolMitra",
      tagline: "Manage. Connect. Empower.",
      welcome: "Good Morning,",
      parentName: "Anjali Sharma",
      studentName: "Rohan Sharma",
      studentClass: "Class 5th - A",
      schoolName: "Green Valley Public School",
      home: "Home",
      academics: "Academics",
      more: "More",
      messages: "Messages",
      profile: "Profile",
      child: "My Child",
      attendance: "Attendance",
      homework: "Homework",
      exams: "Exams & Results",
      bus: "Live Bus",
      fees: "Fees & Pay",
      notifications: "Notifications",
      chat: "Messages",
      calendar: "Time Table",
      help: "Help & Support",
      aboutSchool: "About School",
      legal: "Legal & Terms",
      logout: "Log Out"
    },
    hi: {
      appName: "स्कूलमित्र",
      tagline: "प्रबंधन. जुड़ाव. सशक्तिकरण.",
      welcome: "शुभ प्रभात,",
      parentName: "अंजलि शर्मा",
      studentName: "रोहन शर्मा",
      studentClass: "कक्षा 5वीं - अ",
      schoolName: "ग्रीन वैली पब्लिक स्कूल",
      home: "होम",
      academics: "अकादमिक",
      more: "और भी",
      messages: "संदेश",
      profile: "प्रोफ़ाइल",
      child: "मेरा बच्चा",
      attendance: "उपस्थिति",
      homework: "गृहकार्य",
      exams: "परीक्षाएं",
      bus: "लाइव बस",
      fees: "शुल्क",
      notifications: "सूचनाएं",
      chat: "संदेश",
      calendar: "समय सारणी",
      help: "सहायता",
      aboutSchool: "स्कूल परिचय",
      legal: "नियम",
      logout: "लॉगआउट"
    }
  };

  const t = dict[language];

  // 1. Splash Screen
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

        <img
          src="/splash.png"
          alt="SchoolMitra Parent Splash"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", zIndex: 1
          }}
        />

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "1.5rem 1.5rem 2.25rem 1.5rem",
          background: "linear-gradient(0deg, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.4) 70%, transparent 100%)",
          backdropFilter: "blur(6px)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.65rem",
          zIndex: 10
        }}>
          <div style={{ width: "70%", maxWidth: 240, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, #38bdf8, #6366f1, #f59e0b)", borderRadius: 99, animation: "fadeIn 0.5s ease" }} />
          </div>
          <div style={{ fontSize: "0.72rem", color: "#e2e8f0", fontWeight: 800, letterSpacing: "0.02em" }}>
            Loading SchoolMitra Parent Portal...
          </div>
        </div>
      </div>
    );
  }

  // 2. Login Screen
  if (!user) {
    return (
      <div className="mobile-frame" data-theme={theme} style={{ background: '#ffffff', padding: '2.8rem 1.5rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div className="mobile-notch" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
            <img src="/logo.png" alt="SchoolMitra Logo" style={{ height: '52px', maxWidth: '220px', objectFit: 'contain' }} />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', textAlign: 'center' }}>Parent App Login</h2>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', marginBottom: '1.75rem', textAlign: 'center' }}>
            Access Rohan Sharma's school updates
          </p>

          {errorMsg && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: '12px', color: '#dc2626', fontSize: '0.75rem', marginBottom: '1rem', fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Email Address / Mobile</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@schoolmitra.com"
                  required
                  style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.3rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', color: '#0f172a', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.3rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', color: '#0f172a', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.85rem',
                background: 'linear-gradient(135deg, #1d4ed8, #1e3a8a)',
                border: 'none', borderRadius: '12px', color: '#fff',
                fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(29, 78, 216, 0.35)', marginTop: '0.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
              }}
            >
              <span>{loading ? "Authenticating..." : "Sign In to Parent Portal"}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Navigation Items array for Sidebar
  const navigationMenuItems = [
    { id: "home", label: t.home, icon: Home },
    { id: "academics", label: t.academics, icon: GraduationCap },
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

      {/* ════════════ TOP HEADER BAR (HIDDEN ON DEDICATED PAGE VIEWS) ════════════ */}
      {activeTab !== "fees" && activeTab !== "attendance" && activeTab !== "bus" && activeTab !== "reportCard" && activeTab !== "events" && activeTab !== "noticeBoard" && activeTab !== "timeTable" && activeTab !== "exams" && activeTab !== "gallery" && activeTab !== "profile" && activeTab !== "homework" && activeTab !== "assignments" && activeTab !== "studyMaterials" && activeTab !== "subjectDetails" && activeTab !== "chat" && activeTab !== "teacherProfile" && activeTab !== "help" && (
        <div style={{
          padding: '2.4rem 1rem 0.6rem 1rem',
        background: theme === 'dark' ? '#0f172a' : '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #f1f5f9',
        transition: 'background 0.3s ease',
        zIndex: 10
      }}>
        {/* Left Side: Hamburger Button + Logo Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open Navigation Menu"
            style={{
              background: 'transparent', border: 'none', padding: '0.15rem',
              color: theme === 'dark' ? '#f8fafc' : '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center'
            }}
          >
            <Menu size={24} strokeWidth={2} />
          </button>

          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab("home")}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
          >
            <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22" cy="22" r="20" stroke="#16a34a" strokeWidth="2.5" fill="#f0fdf4"/>
              <path d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="22" cy="18" r="4.5" fill="#1d4ed8"/>
              <path d="M14 30C14 25.5 17.5 24 22 24C26.5 24 30 25.5 30 30" stroke="#1d4ed8" strokeWidth="2.8" strokeLinecap="round"/>
              <circle cx="27" cy="13" r="2.5" fill="#16a34a"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.15rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                <span style={{ color: '#1e3a8a' }}>School</span>
                <span style={{ color: '#1e3a8a' }}>Mitra</span>
              </div>
              <span style={{ fontSize: '0.48rem', fontWeight: 500, color: '#64748b', letterSpacing: '0.03em', marginTop: '1px' }}>
                Manage. Connect. Empower.
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Notification Bell Icon (Pushed to far right edge) */}
        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          aria-label="View Notifications"
          style={{
            background: 'transparent', border: 'none', padding: '0.15rem',
            color: theme === 'dark' ? '#f8fafc' : '#1e293b', position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center'
          }}
        >
          <Bell size={22} strokeWidth={2} />
          {/* Notification Red Badge */}
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            width: '16px', height: '16px', borderRadius: '50%',
            background: '#ef4444', color: '#ffffff',
            fontSize: '0.58rem', fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #ffffff', boxShadow: '0 2px 6px rgba(239, 68, 68, 0.35)'
          }}>
            {inboxCount}
          </span>
        </button>
      </div>
      )}

      {/* ════════════ SLIDE-OUT NAVIGATION SIDEBAR DRAWER ════════════ */}
      {isSidebarOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />

          <div className="sidebar-drawer">
            {/* Sidebar Top Header */}
            <div style={{ padding: "2.4rem 1.25rem 1.25rem 1.25rem", borderBottom: "1px solid var(--border-card)", background: "rgba(2, 6, 23, 0.03)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300"
                  alt="Student Avatar"
                  onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150"; }}
                  style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #1d4ed8", objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-main)" }}>Anjali Sharma</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{t.studentName} • {t.studentClass}</div>
                </div>
              </div>

              <button type="button" onClick={() => setIsSidebarOpen(false)} style={{ background: "rgba(0,0,0,0.06)", border: "none", color: "var(--text-main)", padding: "0.35rem", borderRadius: "50%", cursor: "pointer" }}>
                <X size={18} />
              </button>
            </div>

            {/* Quick Theme/Lang Controls inside Sidebar */}
            <div style={{ padding: "0.85rem 1.25rem", borderBottom: "1px solid var(--border-card)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                style={{
                  padding: "0.45rem", borderRadius: 10, border: "1px solid var(--border-card)",
                  background: "rgba(0,0,0,0.03)", color: "var(--text-main)", fontSize: "0.72rem", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem", cursor: "pointer"
                }}
              >
                {theme === "dark" ? <Sun size={14} color="#fbbf24" /> : <Moon size={14} color="#1d4ed8" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <button
                type="button"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                style={{
                  padding: "0.45rem", borderRadius: 10, border: "1px solid var(--border-card)",
                  background: "rgba(0,0,0,0.03)", color: "var(--text-main)", fontSize: "0.72rem", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem", cursor: "pointer"
                }}
              >
                <Globe size={14} color="#16a34a" />
                <span>{language === "en" ? "हिन्दी" : "English"}</span>
              </button>
            </div>

            {/* Complete Navigation List */}
            <div style={{ flex: 1, padding: "0.85rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", overflowY: "auto" }}>
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
                    background: activeTab === item.id ? "rgba(29, 78, 216, 0.1)" : "transparent",
                    color: activeTab === item.id ? "#1d4ed8" : "var(--text-main)",
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
            <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border-card)", background: "rgba(239, 68, 68, 0.05)" }}>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  width: "100%", padding: "0.65rem", borderRadius: 10, border: "none",
                  background: "rgba(239, 68, 68, 0.12)", color: "#dc2626", fontWeight: 800, fontSize: "0.8rem",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", cursor: "pointer"
                }}
              >
                <LogOut size={16} /> {t.logout}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ════════════ MAIN SCREEN CONTENT AREA ════════════ */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingBottom: '76px' }}>
        {activeTab === "home" && <ParentHomePage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "academics" && <AcademicsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "more" && <MorePage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "child" && <MyChildPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "attendance" && <AttendancePage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "homework" && <HomeworkPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "assignments" && <AssignmentsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "exams" && <ExamsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "timeTable" && <TimeTablePage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "bus" && <TransportPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "fees" && <FeesPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "notifications" && <NotificationsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "chat" && <CommunicationPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "teacherProfile" && <TeacherProfilePage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "calendar" && <CalendarPage language={language} />}
        {activeTab === "profile" && (
          <ProfilePage 
            language={language} 
            onNavigate={(tab: any) => setActiveTab(tab)} 
            theme={theme}
            setTheme={setTheme}
            setLanguage={setLanguage}
          />
        )}
        {activeTab === "help" && <HelpPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "aboutSchool" && <AboutSchoolPage language={language} />}
        {activeTab === "legal" && <LegalPage language={language} />}
        {activeTab === "reportCard" && <ReportCardPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "events" && <EventsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "noticeBoard" && <NoticeBoardPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "gallery" && <GalleryPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "studyMaterials" && <StudyMaterialsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "subjectDetails" && <SubjectDetailsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "medical" && <MedicalDetailsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "idCard" && <DigitalIdCardPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "holidays" && <HolidaysPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "notificationSettings" && <NotificationSettingsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "privacySecurity" && <PrivacySecurityPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "homework" && <HomeworkPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "assignments" && <AssignmentsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "exams" && <ExamsPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "teacherProfile" && <TeacherProfilePage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "offline" && <OfflinePage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
      </div>

      {/* ════════════ MOBILE BOTTOM TAB BAR (MATCHING SCREENSHOT) ════════════ */}
      <div className="bottom-nav">
        {/* Tab 1: Home */}
        <button 
          type="button"
          onClick={() => setActiveTab("home")} 
          className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}
        >
          <Home size={22} fill={activeTab === 'home' ? '#1d4ed8' : 'none'} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span>{t.home}</span>
        </button>

        {/* Tab 2: Academics */}
        <button 
          type="button"
          onClick={() => setActiveTab("academics")} 
          className={`nav-tab ${activeTab === 'academics' || activeTab === 'help' ? 'active' : ''}`}
        >
          <GraduationCap size={22} fill={activeTab === 'academics' || activeTab === 'help' ? '#1d4ed8' : 'none'} strokeWidth={activeTab === 'academics' || activeTab === 'help' ? 2.5 : 2} />
          <span>{t.academics}</span>
        </button>

        {/* Tab 3: Center Elevated Floating Circular Button (+) */}
        <div 
          className="nav-center-btn-container"
          onClick={() => setActiveTab("more")}
          style={{ cursor: "pointer" }}
        >
          <div className="nav-center-btn" style={{
            background: activeTab === 'more' ? 'linear-gradient(135deg, #1d4ed8, #1e3a8a)' : undefined,
            boxShadow: activeTab === 'more' ? '0 6px 16px rgba(29, 78, 216, 0.45)' : undefined
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: activeTab === 'more' ? '#1d4ed8' : '#64748b', marginTop: '2px' }}>
            {t.more}
          </span>
        </div>

        {/* Tab 4: Messages */}
        <button 
          type="button"
          onClick={() => setActiveTab("chat")} 
          className={`nav-tab ${activeTab === 'chat' ? 'active' : ''}`}
        >
          <MessageSquare size={22} fill={activeTab === 'chat' ? '#1d4ed8' : 'none'} strokeWidth={activeTab === 'chat' ? 2.5 : 2} />
          <span>{t.messages}</span>
        </button>

        {/* Tab 5: Profile */}
        <button 
          type="button"
          onClick={() => setActiveTab("profile")} 
          className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <User size={22} fill={activeTab === 'profile' ? '#1d4ed8' : 'none'} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span>{t.profile}</span>
        </button>
      </div>
    </div>
  );
}

