"use client";

import React, { useState, useEffect } from "react";
import DriverLoginPage from "./login/page";
import DriverDashboardPage from "./dashboard/page";
import MyBusPage from "./my-bus/page";
import RoutePage from "./route/page";
import LiveNavigationPage from "./live-navigation/page";
import StudentPickupPage from "./pickup/page";
import StudentDropPage from "./drop/page";
import ReturnTripPage from "./return-trip/page";
import TripTimelinePage from "./trip-timeline/page";
import TripSummaryPage from "./trip-summary/page";
import MessagesPage from "./messages/page";
import VehicleChecklistPage from "./vehicle-checklist/page";
import DriverDocumentsPage from "./driver-documents/page";
import DutySchedulePage from "./duty-schedule/page";
import StudentAttendancePage from "./student-attendance/page";
import AbsentStudentsPage from "./absent-students/page";
import DriverReportsPage from "./reports/page";
import ProfileSettingsPage from "./profile-settings/page";
import NotificationSettingsPage from "./notification-settings/page";
import HelpSupportPage from "./help/page";
import AboutAppPage from "./about/page";
import DeviceStatusPage from "./device-status/page";
import SosPage from "./sos/page";
import TripHistoryPage from "./history/page";
import DriverProfilePage from "./driver-profile/page";
import { driverDict, DriverLanguage } from "./i18n";
import { 
  Bus, Navigation, CheckSquare, AlertTriangle, FileText, 
  User, ShieldCheck, Radio, MapPin, Building, Home, Clock, 
  Menu, X, Compass, History, Settings, Sun, Moon, Globe, LogOut, ChevronRight, Bell, MessageSquare, Clipboard, FileCheck, Headphones, Info, Users, Calendar
} from "lucide-react";
import { driverApi } from "@/lib/api";

export default function DriverCockpitShell() {
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [language, setLanguage] = useState<DriverLanguage>("en");
  const [showSidebar, setShowSidebar] = useState(false);

  type TabType = "dashboard" | "mybus" | "route" | "livenav" | "pickup" | "drop" | "returntrip" | "sos" | "history" | "profile" | "triptimeline" | "tripsummary" | "messages" | "checklist" | "driverdocuments" | "dutyschedule" | "studentattendance" | "absentstudents" | "reports" | "profilesettings" | "notificationsettings" | "help" | "about" | "devicestatus";
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [user, setUser] = useState<any>(null);

  const t = driverDict[language];

  // Splash Progress Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowSplash(false), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Check Session
  useEffect(() => {
    try {
      const stored = localStorage.getItem("driverUser");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("driverUser");
    setUser(null);
    setActiveTab("dashboard");
    setShowSidebar(false);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "hi" : "en");
  };

  // 1. DRIVER COCKPIT ANIMATED SPLASH SCREEN
  if (showSplash) {
    return (
      <div className="driver-frame" data-theme={theme} style={{
        padding: "0",
        position: "relative",
        overflow: "hidden",
        background: "#020617",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div className="mobile-notch" />

        {/* Crisp Full-Screen Splash Graphic */}
        <img
          src="/splash.png"
          alt="SchoolMitra Driver Cockpit Splash"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", zIndex: 1
          }}
        />

        {/* Minimal Bottom GPS Satellites Progress Overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "1.5rem 1.5rem 2.25rem 1.5rem",
          background: "linear-gradient(0deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.4) 70%, transparent 100%)",
          backdropFilter: "blur(6px)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.65rem",
          zIndex: 10
        }}>
          <div style={{ width: "75%", maxWidth: 260, height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #10b981, #34d399)", borderRadius: 99, transition: "width 0.15s ease" }} />
          </div>
          <div style={{ fontSize: "0.72rem", color: "#e2e8f0", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Radio size={14} color="#10b981" /> Connecting GPS Satellites... {progress}%
          </div>
        </div>
      </div>
    );
  }

  // 2. RENDER DRIVER LOGIN MODULE IF NOT AUTHENTICATED
  if (!user) {
    return <DriverLoginPage onLoginSuccess={(u) => setUser(u)} />;
  }

  // 3. MAIN AUTHENTICATED DRIVER COCKPIT SHELL
  return (
    <div className="driver-frame" data-theme={theme}>
      <div className="mobile-notch" />

      {/* DRIVER TOP HEADER BAR WITH THEME & LANGUAGE SWITCHER */}
      <div style={{
        background: "#ffffff",
        padding: "2.8rem 1rem 0.85rem 1rem",
        borderBottom: "1px solid #e2e8f0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        zIndex: 10,
        position: "relative"
      }}>
        {/* Left Side: Hamburger Menu + Brand Logo Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setShowSidebar(true)}
            style={{
              background: "none", border: "none", color: "#1e293b",
              cursor: "pointer", display: "flex", alignItems: "center", padding: "0.2rem"
            }}
          >
            <Menu size={22} strokeWidth={2.2} />
          </button>

          {/* SchoolMitra Brand Logo with Driver Subtitle */}
          <div 
            onClick={() => setActiveTab("dashboard")}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <svg width="24" height="24" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="20" stroke="#1d4ed8" strokeWidth="2.5" fill="#eff6ff"/>
                <circle cx="22" cy="18" r="4.5" fill="#1d4ed8"/>
                <path d="M14 30C14 25.5 17.5 24 22 24C26.5 24 30 25.5 30 30" stroke="#1d4ed8" strokeWidth="2.8" strokeLinecap="round"/>
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.05rem', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
                <span style={{ color: '#1e3a8a' }}>School</span>
                <span style={{ color: '#1e3a8a' }}>Mitra</span>
              </div>
            </div>
            <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '1px', paddingLeft: '28px' }}>
              Driver
            </span>
          </div>
        </div>

        {/* Right: Notification Bell Icon */}
        <button
          type="button"
          onClick={() => setActiveTab("messages")}
          style={{
            background: 'transparent', border: 'none', padding: '0.2rem',
            color: '#1e293b', position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center'
          }}
        >
          <Bell size={22} strokeWidth={2.2} color="#1e293b" />
          {/* Notification Red Badge */}
          <span style={{
            position: 'absolute', top: '1px', right: '1px',
            width: '14px', height: '14px', borderRadius: '50%',
            background: '#ef4444', color: '#ffffff',
            fontSize: '0.55rem', fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2.2px solid #ffffff', boxShadow: '0 2px 6px rgba(239, 68, 68, 0.35)'
          }}>
            1
          </span>
        </button>
      </div>

      {/* ════════════ SLIDE-OUT SIDEBAR NAVIGATION DRAWER ════════════ */}
      {showSidebar && (
        <>
          <div className="sidebar-overlay" onClick={() => setShowSidebar(false)} />
          <div className="sidebar-drawer" data-theme={theme} style={{ padding: "3rem 1.25rem 1.5rem 1.25rem" }}>
            
            {/* Sidebar Driver Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "1rem" }}>
                  {user.name ? user.name.split(" ").map((n: string) => n[0]).join("") : "RK"}
                </div>
                <div>
                  <div style={{ fontSize: "1rem", fontWeight: 900 }} className="text-title">{user.name}</div>
                  <div style={{ fontSize: "0.72rem" }} className="text-muted-custom">Senior Bus Pilot • Route 1</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSidebar(false)}
                style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Controls inside Sidebar */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <button
                type="button"
                onClick={toggleTheme}
                style={{ padding: "0.5rem", borderRadius: 10, border: "1px solid var(--border-card)", background: "var(--bg-subbox)", color: "var(--text-primary)", fontSize: "0.72rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}
              >
                {theme === "dark" ? <Sun size={14} color="#fbbf24" /> : <Moon size={14} color="#6366f1" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <button
                type="button"
                onClick={toggleLanguage}
                style={{ padding: "0.5rem", borderRadius: 10, border: "1px solid var(--border-card)", background: "var(--bg-subbox)", color: "var(--text-primary)", fontSize: "0.72rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}
              >
                <Globe size={14} color="#10b981" />
                <span>{language === "en" ? "हिन्दी Mode" : "EN Mode"}</span>
              </button>
            </div>

            {/* Menu Header */}
            <div style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.65rem" }} className="text-muted-custom">
              {t.navigation} (12 Modules)
            </div>

            {/* Sidebar Navigation Item List */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {[
                { id: "dashboard", label: t.home, icon: Home },
                { id: "mybus", label: t.myBus, icon: ShieldCheck },
                { id: "route", label: t.route, icon: Navigation },
                { id: "livenav", label: t.liveNav, icon: Compass },
                { id: "pickup", label: t.pickup, icon: CheckSquare },
                { id: "drop", label: t.drop, icon: Building },
                { id: "returntrip", label: t.returnTrip, icon: Home },
                { id: "sos", label: t.sos, icon: AlertTriangle },
                { id: "messages", label: "Messages", icon: MessageSquare },
                { id: "checklist", label: "Vehicle Checklist", icon: Clipboard },
                { id: "dutyschedule", label: "Duty Schedule", icon: Calendar },
                { id: "studentattendance", label: "Student Attendance", icon: CheckSquare },
                { id: "absentstudents", label: "Absent Students", icon: Users },
                { id: "reports", label: "Incident Report", icon: AlertTriangle },
                { id: "profilesettings", label: "Profile Settings", icon: Settings },
                { id: "notificationsettings", label: "Notification Settings", icon: Bell },
                { id: "help", label: "Help & Support", icon: Headphones },
                { id: "about", label: "About App", icon: Info },
                { id: "devicestatus", label: "Device Status", icon: ShieldCheck },
                { id: "history", label: t.history, icon: History },
                { id: "profile", label: t.profile, icon: User }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    setShowSidebar(false);
                  }}
                  style={{
                    background: activeTab === item.id ? "linear-gradient(135deg, #10b981, #059669)" : "var(--bg-subbox)",
                    border: "1px solid var(--border-card)", borderRadius: 12, padding: "0.7rem 0.85rem",
                    color: activeTab === item.id ? "#fff" : "var(--text-primary)", fontWeight: 800, fontSize: "0.8rem", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <item.icon size={16} color={activeTab === item.id ? "#fff" : "#10b981"} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={14} color={activeTab === item.id ? "#fff" : "var(--text-secondary)"} />
                </button>
              ))}
            </div>

            {/* Logout Footer */}
            <button
              type="button"
              onClick={handleLogout}
              style={{
                marginTop: "1rem", padding: "0.75rem", borderRadius: 12, border: "1px solid rgba(239,68,68,0.3)",
                background: "rgba(239,68,68,0.12)", color: "#f87171", fontWeight: 800, fontSize: "0.8rem",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem"
              }}
            >
              <LogOut size={16} /> {t.logout}
            </button>

          </div>
        </>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: "70px" }}>
        {activeTab === "dashboard" && <DriverDashboardPage language={language} onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "mybus" && <MyBusPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "route" && <RoutePage />}
        {activeTab === "livenav" && <LiveNavigationPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "pickup" && <StudentPickupPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "drop" && <StudentDropPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "returntrip" && <ReturnTripPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "sos" && <SosPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "triptimeline" && <TripTimelinePage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "tripsummary" && <TripSummaryPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "messages" && <MessagesPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "checklist" && <VehicleChecklistPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "driverdocuments" && <DriverDocumentsPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "dutyschedule" && <DutySchedulePage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "studentattendance" && <StudentAttendancePage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "absentstudents" && <AbsentStudentsPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "reports" && <DriverReportsPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "history" && <TripHistoryPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "profile" && <DriverProfilePage onNavigate={(tab: any) => setActiveTab(tab)} onLogout={handleLogout} />}
        {activeTab === "profilesettings" && <ProfileSettingsPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "notificationsettings" && <NotificationSettingsPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "help" && <HelpSupportPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "about" && <AboutAppPage onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === "devicestatus" && <DeviceStatusPage onNavigate={(tab: any) => setActiveTab(tab)} />}
      </div>

      {/* ELEVATED PREMIUM DRIVER TAB BAR (MATCHING SCREENSHOT) */}
      <div className="bottom-nav">
        {/* Tab 1: Home */}
        <button 
          type="button"
          onClick={() => setActiveTab("dashboard")} 
          className={`driver-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
        >
          <Home size={22} fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} />
          <span>{language === "hi" ? "होम" : "Home"}</span>
        </button>

        {/* Tab 2: Route */}
        <button 
          type="button"
          onClick={() => setActiveTab("route")} 
          className={`driver-tab ${activeTab === 'route' ? 'active' : ''}`}
        >
          <Navigation size={22} fill={activeTab === 'route' ? 'currentColor' : 'none'} strokeWidth={activeTab === 'route' ? 2.5 : 2} />
          <span>{language === "hi" ? "मार्ग" : "Route"}</span>
        </button>

        {/* Tab 3: Center Elevated Floating Circular Button (Trip) */}
        <div 
          className="nav-center-btn-container"
          onClick={() => setActiveTab("pickup")}
          style={{ cursor: "pointer" }}
        >
          <div className="nav-center-btn" style={{
            background: activeTab === 'pickup' ? 'linear-gradient(135deg, #1d4ed8, #1e3a8a)' : undefined,
            boxShadow: activeTab === 'pickup' ? '0 6px 16px rgba(29, 78, 216, 0.45)' : undefined
          }}>
            <Bus size={24} color="#ffffff" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: activeTab === 'pickup' ? '#1d4ed8' : '#64748b', marginTop: '2px' }}>
            {language === "hi" ? "यात्रा" : "Trip"}
          </span>
        </div>

        {/* Tab 4: Messages */}
        <button 
          type="button"
          onClick={() => setActiveTab("messages")} 
          className={`driver-tab ${activeTab === 'messages' ? 'active' : ''}`}
        >
          <MessageSquare size={22} fill={activeTab === 'messages' ? 'currentColor' : 'none'} strokeWidth={activeTab === 'messages' ? 2.5 : 2} />
          <span>{language === "hi" ? "संदेश" : "Messages"}</span>
        </button>

        {/* Tab 5: Profile */}
        <button 
          type="button"
          onClick={() => setActiveTab("profile")} 
          className={`driver-tab ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <User size={22} fill={activeTab === 'profile' ? 'currentColor' : 'none'} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span>{language === "hi" ? "प्रोफ़ाइल" : "Profile"}</span>
        </button>
      </div>

    </div>
  );
}
