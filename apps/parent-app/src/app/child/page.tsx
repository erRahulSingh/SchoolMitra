"use client";

import React, { useState } from "react";
import { 
  User, Award, HeartPulse, FileText, CheckCircle2, 
  Sparkles, Calendar, ShieldCheck, Mail, Phone, MapPin, 
  Download, FileCheck, Stethoscope, Activity, Star
} from "lucide-react";
import { Language, translations } from "../i18n";

export default function MyChildPage({ language = "en" }: { language?: Language }) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<"profile" | "personal" | "academic" | "medical" | "documents">("profile");

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }}>Aarav Sharma</h2>
            <span style={{ background: "rgba(16,185,129,0.2)", color: "#059669", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              {t.classStr}
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 3 }}>
            {t.rollNoStr} &bull; Adm #DPS-2021-9921
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="banner-sub" style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>ACADEMIC RANK</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#6366f1", marginTop: 2, background: "rgba(99, 102, 241, 0.15)", padding: "0.2rem 0.6rem", borderRadius: "10px", whiteSpace: "nowrap" }}>
            Rank #3 of 42
          </div>
        </div>
      </div>

      {/* ════════════ 5-TAB SUB-NAVIGATION BAR ════════════ */}
      <div className="subtab-bar" style={{
        display: "flex", gap: "0.4rem", overflowX: "auto", padding: "0.35rem", borderRadius: 16,
        scrollbarWidth: "none"
      }}>
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "personal", label: "Personal", icon: FileText },
          { id: "academic", label: "Academics", icon: Award },
          { id: "medical", label: "Medical", icon: HeartPulse },
          { id: "documents", label: "Documents", icon: FileCheck }
        ].map(tb => (
          <button
            key={tb.id}
            type="button"
            onClick={() => setActiveTab(tb.id as any)}
            style={{
              padding: "0.55rem 0.85rem", borderRadius: 12, border: "none",
              background: activeTab === tb.id ? "linear-gradient(135deg, #4f46e5, #06b6d4)" : "transparent",
              color: activeTab === tb.id ? "#fff" : "var(--card-subtext)",
              fontSize: "0.78rem", fontWeight: 800,
              display: "flex", alignItems: "center", gap: "0.35rem",
              cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              boxShadow: activeTab === tb.id ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none"
            }}
          >
            <tb.icon size={15} />
            <span>{tb.label}</span>
          </button>
        ))}
      </div>

      {/* ════════════ SCREEN 1: CHILD PROFILE ════════════ */}
      {activeTab === "profile" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card-ui" style={{ padding: "1.25rem" }}>
            <div className="text-title" style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "0.85rem" }}>{t.generalProfile}</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <div className="subbox-ui" style={{ padding: "0.75rem 0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="text-muted-custom" style={{ fontSize: "0.78rem" }}>{t.fullName}</span>
                <span className="text-title" style={{ fontSize: "0.85rem", fontWeight: 800 }}>Aarav Sharma</span>
              </div>
              <div className="subbox-ui" style={{ padding: "0.75rem 0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="text-muted-custom" style={{ fontSize: "0.78rem" }}>{t.classSection}</span>
                <span className="text-title" style={{ fontSize: "0.85rem", fontWeight: 800 }}>Grade 10 - Section A</span>
              </div>
              <div className="subbox-ui" style={{ padding: "0.75rem 0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="text-muted-custom" style={{ fontSize: "0.78rem" }}>{t.classTeacher}</span>
                <span className="text-title" style={{ fontSize: "0.85rem", fontWeight: 800 }}>Sunita Mehta</span>
              </div>
              <div className="subbox-ui" style={{ padding: "0.75rem 0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="text-muted-custom" style={{ fontSize: "0.78rem" }}>{t.schoolTransport}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#06b6d4" }}>Route 1 - Bus #DL01AB4321</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
