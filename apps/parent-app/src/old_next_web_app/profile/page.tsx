"use client";

import React, { useState } from "react";
import { 
  ArrowLeft,
  Settings,
  User, 
  Lock, 
  Bell, 
  MapPin,
  Link2, 
  HelpCircle, 
  Mail, 
  LogOut, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Save, 
  Phone, 
  Briefcase, 
  ShieldCheck, 
  Smartphone,
  Eye,
  EyeOff,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Globe,
  Sun,
  Moon
} from "lucide-react";

interface ProfilePageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
  theme?: "light" | "dark";
  setTheme?: (theme: "light" | "dark") => void;
  setLanguage?: (lang: "en" | "hi") => void;
}

export default function ProfilePage({ language = "en", onNavigate, theme = "light", setTheme, setLanguage }: ProfilePageProps) {
  const isHi = language === "hi";

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [parentInfo, setParentInfo] = useState({
    name: "Anjali Sharma",
    relation: "Mother of Rohan Sharma (Class 5th – A)",
    phone: "+91 98765 43210",
    email: "anjali.sharma@email.com",
    address: "Sector 12, Dwarka, New Delhi - 110075",
    occupation: "Senior Software Architect"
  });

  const [passForm, setPassForm] = useState({ current: "", newPass: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [notifState, setNotifState] = useState({
    attendance: true,
    fees: true,
    exams: true,
    announcements: true,
    busTracking: true
  });

  const t = {
    title: isHi ? "मेरी प्रोफ़ाइल" : "My Profile",
    myChildren: isHi ? "मेरे बच्चे" : "My Children",
    accountSettings: isHi ? "खाता सेटिंग्स" : "Account Settings",
    supportHelp: isHi ? "सहायता और मदद" : "Support & Help",
    personalInfo: isHi ? "व्यक्तिगत जानकारी" : "Personal Information",
    changePassword: isHi ? "पासवर्ड बदलें" : "Change Password",
    notificationSettings: isHi ? "सूचना सेटिंग्स" : "Notification Settings",
    manageAddresses: isHi ? "पते प्रबंधित करें" : "Manage Addresses",
    linkedAccounts: isHi ? "लिंक किए गए खाते" : "Linked Accounts",
    schoolGallery: isHi ? "फ़ोटो एलबम" : "Photo Album",
    helpCenter: isHi ? "सहायता केंद्र" : "Help Center",
    faqs: isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "FAQs",
    sendFeedback: isHi ? "प्रतिक्रिया भेजें" : "Send Feedback",
    logout: isHi ? "लॉग आउट" : "Logout",
    saveChanges: isHi ? "परिवर्तन सहेजें" : "Save Changes",
    close: isHi ? "बंद करें" : "Close"
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal(null);
    alert("Profile details updated successfully!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.newPass !== passForm.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }
    setActiveModal(null);
    setPassForm({ current: "", newPass: "", confirm: "" });
    alert("Password changed successfully!");
  };

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ TOP HEADER BAR (EXACT MATCH REFERENCE SCREENSHOT) ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem"
      }}>
        {/* Left Side: Back Arrow + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("home") : window.history.back()}
            aria-label="Go Back"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0",
              color: "#0f172a"
            }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>

          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.015em"
          }}>
            {t.title}
          </h1>
        </div>

        {/* Right Side: Settings Gear Icon */}
        <button
          type="button"
          onClick={() => setActiveModal("settings")}
          aria-label="Profile Settings"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.2rem",
            color: "#0f172a"
          }}
        >
          <Settings size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ 1. PARENT PROFILE HERO CARD (DEEP ROYAL BLUE GRADIENT) ════════════ */}
      <div 
        onClick={() => setActiveModal("personal")}
        style={{
          background: "linear-gradient(135deg, #092058 0%, #0d3880 55%, #071946 100%)",
          borderRadius: "22px",
          padding: "1.25rem 1.2rem",
          color: "#ffffff",
          boxShadow: "0 10px 25px -4px rgba(13, 56, 128, 0.4)",
          display: "flex",
          alignItems: "center",
          gap: "1.1rem",
          cursor: "pointer"
        }}
      >
        {/* Big Circular Avatar Photo Frame */}
        <div style={{
          width: "82px",
          height: "82px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid rgba(255, 255, 255, 0.85)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          flexShrink: 0,
          background: "#1e293b"
        }}>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300"
            alt={parentInfo.name}
            onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=180"; }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Details Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <h2 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.015em",
            lineHeight: 1.2
          }}>
            {parentInfo.name}
          </h2>

          <div style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#dbeafe"
          }}>
            {parentInfo.relation}
          </div>

          <div style={{
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "#bfdbfe",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            marginTop: "4px"
          }}>
            <Phone size={13} color="#bfdbfe" strokeWidth={2} />
            <span>{parentInfo.phone}</span>
          </div>

          <div style={{
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "#bfdbfe",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            marginTop: "2px"
          }}>
            <Mail size={13} color="#bfdbfe" strokeWidth={2} />
            <span>{parentInfo.email}</span>
          </div>
        </div>
      </div>

      {/* ════════════ 2. MY CHILDREN SECTION ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{
          fontSize: "0.92rem",
          fontWeight: 800,
          color: "#0f172a",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "-0.01em"
        }}>
          {t.myChildren}
        </h2>

        {/* Student Card */}
        <div 
          onClick={() => onNavigate ? onNavigate("child") : setActiveModal("personal")}
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "1rem 1.1rem",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}
        >
          {/* Left: Avatar + Details */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.95rem" }}>
            <div style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              overflow: "hidden",
              background: "#fef3c7",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
              flexShrink: 0
            }}>
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300"
                alt="Rohan Sharma"
                onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150"; }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              <div style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: "#0f172a",
                fontFamily: "'Outfit', sans-serif"
              }}>
                Rohan Sharma
              </div>
              <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "#64748b" }}>
                Class 5th – A
              </div>
              <div style={{ fontSize: "0.74rem", fontWeight: 500, color: "#64748b" }}>
                Roll No. 12
              </div>
            </div>
          </div>

          {/* Right: Chevron Arrow */}
          <ChevronRight size={18} color="#0f172a" strokeWidth={2.2} />
        </div>
      </div>

      {/* ════════════ 3. ACCOUNT SETTINGS SECTION (5 ITEMS) ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{
          fontSize: "0.92rem",
          fontWeight: 800,
          color: "#0f172a",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "-0.01em"
        }}>
          {t.accountSettings}
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
          overflow: "hidden"
        }}>
          {/* Item 1: Personal Information */}
          <div
            onClick={() => setActiveModal("personal")}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <User size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {t.personalInfo}
              </span>
            </div>
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2} />
          </div>

          {/* Item 2: Change Password */}
          <div
            onClick={() => setActiveModal("password")}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <Lock size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {t.changePassword}
              </span>
            </div>
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2} />
          </div>

          {/* Item 3: Notification Settings */}
          <div
            onClick={() => onNavigate && onNavigate("notificationSettings")}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <Bell size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {t.notificationSettings}
              </span>
            </div>
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2} />
          </div>

          {/* Item 3.5: Privacy & Security */}
          <div
            onClick={() => onNavigate && onNavigate("privacySecurity")}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <ShieldCheck size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                Privacy & Security
              </span>
            </div>
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2} />
          </div>

          {/* Item 3.6: Change Language */}
          <div
            onClick={() => setLanguage && setLanguage(language === "en" ? "hi" : "en")}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <Globe size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {isHi ? "भाषा बदलें" : "Change Language"}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1d4ed8" }}>
                {language === "en" ? "English" : "हिन्दी"}
              </span>
              <ChevronRight size={18} color="#94a3b8" />
            </div>
          </div>

          {/* Item 3.7: Dark Mode Switch */}
          <div
            onClick={() => setTheme && setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              {theme === "dark" ? (
                <Sun size={20} color="#fbbf24" strokeWidth={2} />
              ) : (
                <Moon size={20} color="#0f172a" strokeWidth={2} />
              )}
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {isHi ? "डार्क मोड" : "Dark Mode"}
              </span>
            </div>
            {/* Toggle switch */}
            <div style={{
              width: "48px",
              height: "26px",
              borderRadius: "99px",
              background: theme === "dark" ? "#1d4ed8" : "#cbd5e1",
              padding: "3px",
              display: "flex",
              alignItems: "center",
              justifyContent: theme === "dark" ? "flex-end" : "flex-start",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}>
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#ffffff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
              }} />
            </div>
          </div>

          {/* Item 4: Manage Addresses */}
          <div
            onClick={() => setActiveModal("address")}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <MapPin size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {t.manageAddresses}
              </span>
            </div>
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2} />
          </div>

          {/* Item 5: Linked Accounts */}
          <div
            onClick={() => setActiveModal("linked")}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <Link2 size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {t.linkedAccounts}
              </span>
            </div>
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2} />
          </div>

          {/* Item 6: School Gallery */}
          <div
            onClick={() => onNavigate && onNavigate("gallery")}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <ImageIcon size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {t.schoolGallery}
              </span>
            </div>
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* ════════════ 4. SUPPORT & HELP SECTION (2 ITEMS) ════════════ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <h2 style={{
          fontSize: "0.92rem",
          fontWeight: 800,
          color: "#0f172a",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "-0.01em"
        }}>
          {t.supportHelp}
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
          overflow: "hidden"
        }}>
          {/* Item 1: Help Center */}
          <div
            onClick={() => {
              localStorage.setItem("supportDefaultView", "dashboard");
              onNavigate && onNavigate("help");
            }}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <HelpCircle size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {t.helpCenter}
              </span>
            </div>
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2} />
          </div>

          {/* Item 2: FAQs */}
          <div
            onClick={() => {
              localStorage.setItem("supportDefaultView", "faqs");
              onNavigate && onNavigate("help");
            }}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <MessageSquare size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {t.faqs}
              </span>
            </div>
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2} />
          </div>

          {/* Item 3: Send Feedback */}
          <div
            onClick={() => setActiveModal("feedback")}
            style={{
              padding: "0.95rem 1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <Mail size={20} color="#0f172a" strokeWidth={2} />
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>
                {t.sendFeedback}
              </span>
            </div>
            <ChevronRight size={18} color="#94a3b8" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* ════════════ 5. LOGOUT BUTTON ════════════ */}
      <button
        type="button"
        onClick={() => setActiveModal("logout")}
        style={{
          width: "100%",
          padding: "0.85rem",
          borderRadius: "18px",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#dc2626",
          fontSize: "0.92rem",
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          cursor: "pointer"
        }}
      >
        <LogOut size={18} strokeWidth={2.2} />
        <span>{t.logout}</span>
      </button>

      {/* ════════════ INTERACTIVE MODALS ════════════ */}

      {/* Modal 1: Personal Information Edit */}
      {activeModal === "personal" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            width: "100%", maxWidth: "420px", background: "#ffffff",
            borderRadius: "24px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>{t.personalInfo}</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>Full Name</label>
                <input type="text" value={parentInfo.name} onChange={(e) => setParentInfo({ ...parentInfo, name: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px", fontSize: "0.85rem", fontWeight: 600 }} />
              </div>

              <div>
                <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>Mobile Phone</label>
                <input type="text" value={parentInfo.phone} onChange={(e) => setParentInfo({ ...parentInfo, phone: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px", fontSize: "0.85rem", fontWeight: 600 }} />
              </div>

              <div>
                <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>Email Address</label>
                <input type="email" value={parentInfo.email} onChange={(e) => setParentInfo({ ...parentInfo, email: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px", fontSize: "0.85rem", fontWeight: 600 }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="submit" style={{ flex: 1, padding: "0.75rem", background: "#1d4ed8", border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer" }}>
                  {t.saveChanges}
                </button>
                <button type="button" onClick={() => setActiveModal(null)} style={{ padding: "0.75rem 1rem", background: "#f1f5f9", border: "none", borderRadius: "14px", color: "#334155", fontWeight: 700, cursor: "pointer" }}>
                  {t.close}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Change Password */}
      {activeModal === "password" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            width: "100%", maxWidth: "420px", background: "#ffffff",
            borderRadius: "24px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>{t.changePassword}</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>Current Password</label>
                <input type="password" required value={passForm.current} onChange={(e) => setPassForm({ ...passForm, current: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px", fontSize: "0.85rem" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>New Password</label>
                <input type="password" required value={passForm.newPass} onChange={(e) => setPassForm({ ...passForm, newPass: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px", fontSize: "0.85rem" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>Confirm New Password</label>
                <input type="password" required value={passForm.confirm} onChange={(e) => setPassForm({ ...passForm, confirm: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px", fontSize: "0.85rem" }} />
              </div>

              <button type="submit" style={{ width: "100%", marginTop: "0.5rem", padding: "0.75rem", background: "#1d4ed8", border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer" }}>
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Logout Confirmation */}
      {activeModal === "logout" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            width: "100%", maxWidth: "380px", background: "#ffffff",
            borderRadius: "24px", padding: "1.5rem", textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem"
          }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#fef2f2", color: "#dc2626", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LogOut size={24} />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a" }}>Confirm Logout?</h3>
            <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0 }}>Are you sure you want to log out of SchoolMitra Parent App?</p>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <button type="button" onClick={() => { alert("Logged out successfully"); window.location.reload(); }} style={{ flex: 1, padding: "0.75rem", background: "#dc2626", border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer" }}>
                Yes, Logout
              </button>
              <button type="button" onClick={() => setActiveModal(null)} style={{ flex: 1, padding: "0.75rem", background: "#f1f5f9", border: "none", borderRadius: "14px", color: "#334155", fontWeight: 700, cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal 4: Settings Menu options */}
      {activeModal === "settings" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            width: "100%", maxWidth: "380px", background: "#ffffff",
            borderRadius: "24px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Settings</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  onNavigate && onNavigate("notificationSettings");
                }}
                style={{
                  width: "100%", padding: "0.85rem", background: "#f8fafc",
                  border: "1px solid #e2e8f0", borderRadius: "14px", color: "#0f172a",
                  fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", textAlign: "left"
                }}
              >
                🔔 Notification Settings
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  onNavigate && onNavigate("privacySecurity");
                }}
                style={{
                  width: "100%", padding: "0.85rem", background: "#f8fafc",
                  border: "1px solid #e2e8f0", borderRadius: "14px", color: "#0f172a",
                  fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", textAlign: "left"
                }}
              >
                🔒 Privacy & Security
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveModal("password");
                }}
                style={{
                  width: "100%", padding: "0.85rem", background: "#f8fafc",
                  border: "1px solid #e2e8f0", borderRadius: "14px", color: "#0f172a",
                  fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", textAlign: "left"
                }}
              >
                🔑 Change Password
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
