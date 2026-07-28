"use client";

import React, { useState } from "react";
import { 
  Settings, Globe, Mail, MessageSquare, Bell, Map, 
  CreditCard, Shield, Database, Save, CheckCircle2, 
  Upload, Key, Sliders, RefreshCw, AlertTriangle 
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"branding" | "smtp" | "sms" | "push" | "maps" | "razorpay" | "security" | "backup">("branding");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" };
  const labelStyle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="glass-card" style={{
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.12) 100%)",
        border: "1px solid var(--border-glow)",
        padding: "1.75rem 2rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(139, 92, 246, 0.2)", border: "1px solid rgba(139, 92, 246, 0.4)", color: "#c084fc", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Settings size={14} /> SaaS Platform Integrations Command
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
            SaaS Platform Settings & Gateways
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: "0.875rem" }}>
            Configure white-labeled branding, SMTP email protocols, Twilio SMS gateways, Firebase push tokens, map credentials, Razorpay API, and automated cloud backups.
          </p>
        </div>

        <button onClick={handleSave} className="btn btn-primary">
          {saved ? <><CheckCircle2 size={16} /> Saved!</> : <><Save size={16} /> Save Platform Settings</>}
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
              <input type="text" defaultValue="SchoolMitra SaaS Technologies" style={inputStyle} />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>SaaS CUSTOM BRAND COLOR</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input type="color" defaultValue="#8b5cf6" style={{ width: 44, height: 40, border: "none", cursor: "pointer", background: "none" }} />
                  <input type="text" defaultValue="#8b5cf6" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>SECONDARY ACCENT COLOR</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input type="color" defaultValue="#6366f1" style={{ width: 44, height: 40, border: "none", cursor: "pointer", background: "none" }} />
                  <input type="text" defaultValue="#6366f1" style={inputStyle} />
                </div>
              </div>
            </div>

            <div>
              <label style={labelStyle}>UPLOAD PLATFORM LOGO (PNG/SVG)</label>
              <div style={{ border: "2px dashed var(--border-color)", padding: "1.5rem", borderRadius: "var(--radius-md)", textAlign: "center", color: "var(--text-muted)" }}>
                <Upload size={32} style={{ margin: "0 auto 0.5rem auto", color: "var(--primary)" }} />
                <div style={{ fontSize: "0.85rem" }}>Drag & drop logo file here or click to browse</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: SMTP EMAIL ════════════ */}
      {activeTab === "smtp" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>SMTP Outgoing Email Protocol Settings</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>SMTP HOST</label>
                <input type="text" defaultValue="smtp.sendgrid.net" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>SMTP PORT</label>
                <input type="text" defaultValue="587" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>SMTP USERNAME</label>
                <input type="text" defaultValue="apikey" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>SMTP PASSWORD</label>
                <input type="password" defaultValue="SG.xxxxxxxxxxxxx" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>SENDER EMAIL ADDRESS</label>
                <input type="email" defaultValue="noreply@schoolmitra.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>SENDER NAME</label>
                <input type="text" defaultValue="SchoolMitra Alerts" style={inputStyle} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: SMS GATEWAY ════════════ */}
      {activeTab === "sms" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Twilio / Msg91 SMS Gateway Credentials</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>SMS GATEWAY PROVIDER</label>
              <select style={inputStyle}>
                <option style={{ background: "#0b0f19" }}>Twilio SMS Service</option>
                <option style={{ background: "#0b0f19" }}>Msg91 SMS Hub</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>ACCOUNT SID / API KEY</label>
              <input type="text" defaultValue="AC882a1708ksp9012f" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>AUTH TOKEN / SECRET KEY</label>
              <input type="password" defaultValue="xxxxxxxxxxxxxxxxxxxx" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>DEFAULT SENDER ID / NUMBER</label>
              <input type="text" defaultValue="+18559021234" style={inputStyle} />
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: PUSH NOTIFICATION ════════════ */}
      {activeTab === "push" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Firebase Cloud Messaging (FCM) Credentials</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>FIREBASE PROJECT ID</label>
              <input type="text" defaultValue="schoolmitra-fcm" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>FCM SERVER KEY (V1 API)</label>
              <textarea rows={4} defaultValue="AIzaSyA88fks8102-as810x992as..." style={{ ...inputStyle, resize: "none", fontFamily: "monospace" }} />
            </div>

            <div>
              <label style={labelStyle}>FIREBASE APP ID</label>
              <input type="text" defaultValue="1:982012019:web:as9012as" style={inputStyle} />
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 5: GOOGLE MAPS API ════════════ */}
      {activeTab === "maps" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Google Maps Platform Credentials</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>GOOGLE MAPS JAVASCRIPT API KEY</label>
              <input type="password" defaultValue="AIzaSyA82fks902Fas..." style={inputStyle} />
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: 4 }}>Used for rendering client maps on dashboards and tracking maps.</div>
            </div>

            <div>
              <label style={labelStyle}>DIRECTIONS & DISTANCE MATRIX API KEY</label>
              <input type="password" defaultValue="AIzaSyA55fks801Fas..." style={inputStyle} />
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: 4 }}>Used for calculating driver telemetry ETA and school bus routing.</div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 6: RAZORPAY / PAYMENT GATEWAY ════════════ */}
      {activeTab === "razorpay" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Razorpay Gateway Integration Credentials</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>RAZORPAY KEY ID</label>
              <input type="text" defaultValue="rzp_live_Op9921as00x" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>RAZORPAY KEY SECRET</label>
              <input type="password" defaultValue="xxxxxxxxxxxxxxxxxxxx" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>WEBHOOK SECRET KEY</label>
              <input type="password" defaultValue="xxxxxxxxxxxxxxxxxxxx" style={inputStyle} />
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 7: SECURITY & ACCESS ════════════ */}
      {activeTab === "security" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Access & Platform Security Settings</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { title: "Enforce 2-Factor Authentication (2FA)", desc: "Require OTP verification for all Super Admins and School Admin Logins", enabled: true },
              { title: "Restrict logins by IP Whitelist", desc: "Allow console logins only from whitelisted CIDR blocks", enabled: false },
              { title: "IP Rate Limiting (Brute Force Block)", desc: "Enforce rate limit of 60 requests/minute per client IP", enabled: true }
            ].map((opt, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)" }}>
                <div>
                  <div style={{ fontWeight: 800, color: "#fff", fontSize: "0.9rem" }}>{opt.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>{opt.desc}</div>
                </div>
                <div style={{
                  width: 48, height: 26, borderRadius: 99, cursor: "pointer",
                  background: opt.enabled ? "var(--primary)" : "rgba(255,255,255,0.08)",
                  position: "relative", transition: "background 0.2s"
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", background: "#fff",
                    position: "absolute", top: 3, left: opt.enabled ? 25 : 3, transition: "left 0.2s"
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════ TAB 8: CLOUD BACKUPS ════════════ */}
      {activeTab === "backup" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "680px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.5rem" }}>Cloud Backup Configurations</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>AUTOMATED BACKUP FREQUENCY</label>
              <select style={inputStyle}>
                <option style={{ background: "#0b0f19" }}>Every 12 Hours</option>
                <option style={{ background: "#0b0f19" }}>Daily at 11:30 PM (Recommended)</option>
                <option style={{ background: "#0b0f19" }}>Weekly on Sundays</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>AWS S3 DEPLOYMENT BUCKET NAME</label>
              <input type="text" defaultValue="s3://schoolmitra-db-snapshots" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>RETENTION PERIOD (DAYS)</label>
              <input type="number" defaultValue={30} style={inputStyle} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
