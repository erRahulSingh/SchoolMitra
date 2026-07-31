"use client";

import React, { useState } from "react";
import { 
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  Globe,
  Sun,
  LogOut,
  ChevronRight
} from "lucide-react";

interface InfoFieldProps {
  icon: any;
  label: string;
  value: string;
}

function InfoField({ icon: Icon, label, value }: InfoFieldProps) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.95rem 1.15rem",
      borderBottom: "1px solid #f1f5f9",
      background: "#ffffff"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justify: "center", color: "#2563eb", flexShrink: 0 }}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700 }}>{label}</span>
          <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>{value}</span>
        </div>
      </div>
      <ChevronRight size={16} color="#cbd5e1" />
    </div>
  );
}

export default function ProfileSettingsPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [themeMode, setThemeMode] = useState<"Light" | "Dark">("Light");

  return (
    <div style={{
      padding: "1rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%"
    }}>



      {/* ════════════ TOP HERO CARD PANEL ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0b2265 0%, #0d3880 55%, #081a4b 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(11, 34, 101, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "1.15rem"
      }}>
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          flexShrink: 0
        }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"
            alt="Rajesh Kumar"
            onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"; }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", fontFamily: "'Outfit', sans-serif" }}>
            Rajesh Kumar
          </span>
          <span style={{ fontSize: "0.78rem", color: "#93c5fd", fontWeight: 600 }}>
            Driver ID: DRV00125
          </span>
          <span style={{
            background: "#22c55e",
            color: "#ffffff",
            padding: "0.15rem 0.5rem",
            borderRadius: "6px",
            fontSize: "0.62rem",
            fontWeight: 800,
            width: "fit-content",
            marginTop: "2px"
          }}>
            Verified
          </span>
        </div>
      </div>

      {/* ════════════ PERSONAL INFORMATION ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif" }}>
          Personal Information
        </h2>
        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
        }}>
          <InfoField icon={User} label="Full Name" value="Rajesh Kumar" />
          <InfoField icon={Phone} label="Mobile Number" value="+91 98765 43210" />
          <InfoField icon={Mail} label="Email Address" value="rajesh.driver@schoolmitra.com" />
          <InfoField icon={MapPin} label="Address" value="Lucknow, Uttar Pradesh" />
        </div>
      </div>

      {/* ════════════ APP SETTINGS ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif" }}>
          App Settings
        </h2>
        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
        }}>
          {/* Change Password */}
          <div
            onClick={() => alert("Change Password Form")}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.95rem 1.15rem", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#fef2f2", display: "flex", alignItems: "center", justify: "center", color: "#ef4444" }}>
                <Lock size={16} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>Change Password</span>
            </div>
            <ChevronRight size={16} color="#cbd5e1" />
          </div>

          {/* Language */}
          <div
            onClick={() => alert("Select App Language")}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.95rem 1.15rem", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ecfdf5", display: "flex", alignItems: "center", justify: "center", color: "#10b981" }}>
                <Globe size={16} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>Language</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 650 }}>English</span>
              <ChevronRight size={16} color="#cbd5e1" />
            </div>
          </div>

          {/* Theme */}
          <div
            onClick={() => setThemeMode(themeMode === "Light" ? "Dark" : "Light")}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.95rem 1.15rem", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#fffbeb", display: "flex", alignItems: "center", justify: "center", color: "#f59e0b" }}>
                <Sun size={16} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>Theme</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 650 }}>{themeMode} Mode</span>
              <ChevronRight size={16} color="#cbd5e1" />
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ LOGOUT RED OUTLINE BUTTON ════════════ */}
      <div style={{ marginTop: "auto", paddingTop: "0.85rem" }}>
        <button
          onClick={() => {
            alert("Logging out...");
            if (onNavigate) onNavigate("dashboard");
          }}
          style={{
            width: "100%",
            padding: "1rem",
            background: "transparent",
            color: "#ef4444",
            border: "1.5px solid #fca5a5",
            borderRadius: "14px",
            fontSize: "0.92rem",
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.55rem"
          }}
        >
          <LogOut size={16} strokeWidth={2.5} />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}
