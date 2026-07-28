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
import SosPage from "./sos/page";
import TripHistoryPage from "./history/page";
import DriverProfilePage from "./driver-profile/page";
import { driverDict, DriverLanguage } from "./i18n";
import { 
  Bus, Navigation, CheckSquare, AlertTriangle, FileText, 
  User, ShieldCheck, Radio, MapPin, Building, Home, Clock, 
  Menu, X, Compass, History, Settings, Sun, Moon, Globe, LogOut, ChevronRight 
} from "lucide-react";

export default function DriverCockpitShell() {
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [language, setLanguage] = useState<DriverLanguage>("en");
  const [showSidebar, setShowSidebar] = useState(false);

  type TabType = "dashboard" | "mybus" | "route" | "livenav" | "pickup" | "drop" | "returntrip" | "sos" | "history" | "profile";
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
        background: "radial-gradient(circle at 50% 30%, #064e3b 0%, #090d16 65%, #020617 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "3.5rem 1.5rem 2.5rem 1.5rem",
        textAlign: "center"
      }}>
        <div className="mobile-notch" />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
          <div className="driver-emblem" style={{
            width: 130, height: 130, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(9, 13, 22, 0.95) 100%)",
            border: "3px solid #10b981",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)"
          }}>
            <Bus size={48} color="#10b981" />
            <span style={{ fontSize: "0.68rem", color: "#34d399", fontWeight: 800, textTransform: "uppercase", marginTop: 4 }}>
              GPS COCKPIT
            </span>
          </div>
        </div>

        <div>
          <h1 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.01em" }}>
            {t.appTitle}
          </h1>
          <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: 4, fontWeight: 700 }}>
            {t.subtitle}
          </p>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
          <div style={{ width: "85%", maxWidth: 260, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #10b981, #34d399)", borderRadius: 99, transition: "width 0.15s ease" }} />
          </div>
          <div style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Radio size={14} color="#10b981" /> Connecting GPS Satellites... {progress}%
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", width: "100%" }}>
          {[
            { icon: Navigation, label: "Live GPS", color: "#38bdf8" },
            { icon: Bus, label: "Stops", color: "#10b981" },
            { icon: CheckSquare, label: "Roster", color: "#a78bfa" },
            { icon: AlertTriangle, label: "SOS Alert", color: "#ef4444" }
          ].map((item, idx) => (
            <div key={idx} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "0.6rem 0.3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
              <item.icon size={18} color={item.color} />
              <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#cbd5e1" }}>{item.label}</span>
            </div>
          ))}
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
        background: "var(--header-bg)",
        padding: "2.8rem 1rem 0.85rem 1rem",
        borderBottom: "1px solid var(--border-card)",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        {/* Left: Sidebar Toggle & Driver Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <button
            type="button"
            onClick={() => setShowSidebar(true)}
            style={{
              background: "none", border: "none", color: "var(--text-primary)",
              cursor: "pointer", display: "flex", alignItems: "center"
            }}
          >
            <Menu size={22} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: "0.85rem" }}>
              RS
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 900 }} className="text-title">{user.name}</div>
              <div style={{ fontSize: "0.68rem", fontWeight: 700 }} className="text-muted-custom">Bus #DL01AB4321</div>
            </div>
          </div>
        </div>

        {/* Right: Theme Switcher & Language Converter */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          {/* Language Switcher Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            style={{
              background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "var(--text-accent)", padding: "0.3rem 0.55rem", borderRadius: 8,
              fontSize: "0.72rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem"
            }}
          >
            <Globe size={13} />
            <span>{language === "en" ? "EN" : "हिन्दी"}</span>
          </button>

          {/* Theme Toggle Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              background: "rgba(255, 255, 255, 0.08)", border: "1px solid var(--border-card)",
              color: "var(--text-primary)", padding: "0.35rem", borderRadius: 8,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            {theme === "dark" ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#6366f1" />}
          </button>
        </div>
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
                  RS
                </div>
                <div>
                  <div style={{ fontSize: "1rem", fontWeight: 900 }} className="text-title">Ram Singh</div>
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
        {activeTab === "dashboard" && <DriverDashboardPage language={language} />}
        {activeTab === "mybus" && <MyBusPage language={language} />}
        {activeTab === "route" && <RoutePage language={language} />}
        {activeTab === "livenav" && <LiveNavigationPage language={language} />}
        {activeTab === "pickup" && <StudentPickupPage language={language} />}
        {activeTab === "drop" && <StudentDropPage language={language} />}
        {activeTab === "returntrip" && <ReturnTripPage language={language} />}
        {activeTab === "sos" && <SosPage language={language} />}
        {activeTab === "history" && <TripHistoryPage language={language} />}
        {activeTab === "profile" && <DriverProfilePage language={language} onLogout={handleLogout} />}
      </div>

      {/* BOTTOM DRIVER NAVIGATION BAR (5 EXACT TABS) */}
      <div style={{
        height: 65, background: "var(--header-bg)", borderTop: "1px solid var(--border-card)",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        position: "absolute", bottom: 0, left: 0, right: 0
      }}>
        <button onClick={() => setActiveTab("dashboard")} style={{ background: "none", border: "none", color: activeTab === "dashboard" ? "#10b981" : "var(--text-secondary)", fontSize: "0.7rem", fontWeight: 800, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer" }}>
          <Home size={18} />
          <span>Home</span>
        </button>
        <button onClick={() => setActiveTab("route")} style={{ background: "none", border: "none", color: activeTab === "route" ? "#10b981" : "var(--text-secondary)", fontSize: "0.7rem", fontWeight: 800, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer" }}>
          <Navigation size={18} />
          <span>Route</span>
        </button>
        <button onClick={() => setActiveTab("pickup")} style={{ background: "none", border: "none", color: activeTab === "pickup" ? "#10b981" : "var(--text-secondary)", fontSize: "0.7rem", fontWeight: 800, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer" }}>
          <CheckSquare size={18} />
          <span>Pickup</span>
        </button>
        <button onClick={() => setActiveTab("history")} style={{ background: "none", border: "none", color: activeTab === "history" ? "#10b981" : "var(--text-secondary)", fontSize: "0.7rem", fontWeight: 800, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer" }}>
          <History size={18} />
          <span>History</span>
        </button>
        <button onClick={() => setActiveTab("profile")} style={{ background: "none", border: "none", color: activeTab === "profile" ? "#10b981" : "var(--text-secondary)", fontSize: "0.7rem", fontWeight: 800, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer" }}>
          <User size={18} />
          <span>Profile</span>
        </button>
      </div>

    </div>
  );
}
