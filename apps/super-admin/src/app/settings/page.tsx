"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, Globe, Mail, MessageSquare, Bell, Map, 
  CreditCard, Shield, Database, Save, CheckCircle2, 
  Upload, Key, Sliders, RefreshCw, AlertTriangle 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"branding" | "smtp" | "sms" | "push" | "maps" | "razorpay" | "security" | "backup">("branding");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Global Settings Form State
  const [form, setForm] = useState<any>({
    corporateName: "SchoolMitra SaaS Technologies",
    primaryColor: "#8b5cf6",
    accentColor: "#6366f1",
    supportEmail: "support@schoolmitra.in",
    smtpHost: "smtp.mailgun.org",
    smtpPort: "587",
    smtpUser: "postmaster@schoolmitra.in",
    smtpPass: "••••••••••••••••",
    twilioSid: "AC_7820194820194820194",
    twilioToken: "••••••••••••••••••••••••",
    firebaseServerKey: "AAAA_8920148190:APA91bF...",
    googleMapsApiKey: "AIzaSyD_8910481920...",
    razorpayKeyId: "rzp_live_8910481920",
    razorpayKeySecret: "••••••••••••••••••••",
    enforce2FA: true,
    sessionTimeoutMins: "30"
  });

  const fetchSettings = async () => {
    setLoading(true);
    const local = localStorage.getItem("saas_global_settings");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && typeof parsed === "object") setForm(prev => ({ ...prev, ...parsed }));
      } catch (e) {}
    }

    try {
      const res = await superAdminApi.getGlobalSettings();
      if (res.success && res.settings) {
        setForm(prev => ({ ...prev, ...res.settings }));
        localStorage.setItem("saas_global_settings", JSON.stringify(res.settings));
      }
    } catch (err) {
      console.error("Error fetching global settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaved(true);

    localStorage.setItem("saas_global_settings", JSON.stringify(form));

    try {
      const res = await superAdminApi.saveGlobalSettings(form);
      if (res.success && res.settings) {
        setForm(prev => ({ ...prev, ...res.settings }));
        localStorage.setItem("saas_global_settings", JSON.stringify(res.settings));
      }
    } catch (err) {
      console.error("Error saving global settings:", err);
    } finally {
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" };
  const labelStyle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Settings size={14} /> SaaS Platform Integrations Command
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            SaaS Platform Settings & Gateways
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.875rem" }}>
            Configure white-labeled branding, SMTP email protocols, Twilio SMS gateways, Firebase push tokens, map credentials, Razorpay API, and automated cloud backups.
          </p>
        </div>

        <button onClick={() => handleSave()} className="btn btn-primary">
          {saved ? <><CheckCircle2 size={16} /> Saved to Database!</> : <><Save size={16} /> Save Platform Settings</>}
        </button>
      </div>

      {/* 8 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {[
          { id: "branding", label: "Branding", icon: Globe },
          { id: "smtp", label: "SMTP Email", icon: Mail },
          { id: "sms", label: "SMS Gateway", icon: MessageSquare },
          { id: "push", label: "Push Notification", icon: Bell },
          { id: "maps", label: "Google Maps API", icon: Map },
          { id: "razorpay", label: "Payment Gateway", icon: CreditCard },
          { id: "security", label: "Security & Access", icon: Shield },
          { id: "backup", label: "Cloud Backups", icon: Database }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}>
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB 1: BRANDING ════════════ */}
      {activeTab === "branding" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Branding & White-Label Configuration</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>PLATFORM CORPORATE NAME</label>
              <input type="text" value={form.corporateName} onChange={(e) => handleChange("corporateName", e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>OFFICIAL SUPPORT EMAIL</label>
              <input type="email" value={form.supportEmail} onChange={(e) => handleChange("supportEmail", e.target.value)} style={inputStyle} />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>PRIMARY BRAND COLOR</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input type="color" value={form.primaryColor} onChange={(e) => handleChange("primaryColor", e.target.value)} style={{ width: 44, height: 40, border: "none", cursor: "pointer", background: "none" }} />
                  <input type="text" value={form.primaryColor} onChange={(e) => handleChange("primaryColor", e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>SECONDARY ACCENT COLOR</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input type="color" value={form.accentColor} onChange={(e) => handleChange("accentColor", e.target.value)} style={{ width: 44, height: 40, border: "none", cursor: "pointer", background: "none" }} />
                  <input type="text" value={form.accentColor} onChange={(e) => handleChange("accentColor", e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: SMTP EMAIL ════════════ */}
      {activeTab === "smtp" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>SMTP Transactional Email Gateway</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>SMTP HOST</label>
                <input type="text" value={form.smtpHost} onChange={(e) => handleChange("smtpHost", e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>PORT</label>
                <input type="text" value={form.smtpPort} onChange={(e) => handleChange("smtpPort", e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>SMTP USERNAME</label>
              <input type="text" value={form.smtpUser} onChange={(e) => handleChange("smtpUser", e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>SMTP PASSWORD</label>
              <input type="password" value={form.smtpPass} onChange={(e) => handleChange("smtpPass", e.target.value)} style={inputStyle} />
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: SMS GATEWAY ════════════ */}
      {activeTab === "sms" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Twilio / SMS Gateway Credentials</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>TWILIO ACCOUNT SID</label>
              <input type="text" value={form.twilioSid} onChange={(e) => handleChange("twilioSid", e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>TWILIO AUTH TOKEN</label>
              <input type="password" value={form.twilioToken} onChange={(e) => handleChange("twilioToken", e.target.value)} style={inputStyle} />
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: PUSH NOTIFICATIONS ════════════ */}
      {activeTab === "push" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Firebase FCM Push Notifications</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>FIREBASE FCM SERVER KEY</label>
              <input type="text" value={form.firebaseServerKey} onChange={(e) => handleChange("firebaseServerKey", e.target.value)} style={inputStyle} />
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 5: GOOGLE MAPS API ════════════ */}
      {activeTab === "maps" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Google Maps Telemetry API Key</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>GOOGLE MAPS JAVASCRIPT API KEY</label>
              <input type="text" value={form.googleMapsApiKey} onChange={(e) => handleChange("googleMapsApiKey", e.target.value)} style={inputStyle} />
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 6: RAZORPAY ════════════ */}
      {activeTab === "razorpay" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Razorpay Payment Gateway API</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>RAZORPAY KEY ID</label>
              <input type="text" value={form.razorpayKeyId} onChange={(e) => handleChange("razorpayKeyId", e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>RAZORPAY KEY SECRET</label>
              <input type="password" value={form.razorpayKeySecret} onChange={(e) => handleChange("razorpayKeySecret", e.target.value)} style={inputStyle} />
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 7: SECURITY & ACCESS ════════════ */}
      {activeTab === "security" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Platform Security & Access Controls</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <input 
                type="checkbox" 
                id="check2FA"
                checked={form.enforce2FA} 
                onChange={(e) => handleChange("enforce2FA", e.target.checked)} 
                style={{ width: 18, height: 18, accentColor: "var(--primary)", cursor: "pointer" }} 
              />
              <label htmlFor="check2FA" style={{ fontSize: "0.88rem", color: "#fff", cursor: "pointer" }}>
                Enforce Mandatory Two-Factor Authentication (2FA) for All Super Admins
              </label>
            </div>

            <div>
              <label style={labelStyle}>SESSION INACTIVITY TIMEOUT (MINUTES)</label>
              <input type="number" value={form.sessionTimeoutMins} onChange={(e) => handleChange("sessionTimeoutMins", e.target.value)} style={inputStyle} />
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 8: CLOUD BACKUPS ════════════ */}
      {activeTab === "backup" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Automated Cloud Backups Policy</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>SNAPSHOT FREQUENCY SCHEDULE</label>
              <select defaultValue="daily" style={inputStyle}>
                <option value="daily">Automated Daily Snapshot (02:00 AM IST)</option>
                <option value="hourly">Hourly Transaction Log Archival</option>
                <option value="weekly">Weekly Cold Storage Backup</option>
              </select>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
