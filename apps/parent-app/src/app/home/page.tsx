"use client";

import React, { useState } from "react";
import { 
  CalendarCheck, Bus, CreditCard, Award, Bell, BookOpen, 
  FileText, MessageSquare, Clock, Sparkles, TrendingUp, 
  CheckCircle2, AlertCircle, Calendar, ChevronRight, UserCheck, 
  MapPin, Activity, PhoneCall, ArrowUpRight, Megaphone, HelpCircle,
  FileCheck, ShieldAlert
} from "lucide-react";
import { Language, translations } from "../i18n";

export default function ParentHomePage({ language = "en" }: { language?: Language }) {
  const t = translations[language];

  const [homeworkList, setHomeworkList] = useState([
    { id: 1, subject: "Physics", title: "Lab Experiment #4 - Reflection & Refraction", dueDate: "Tomorrow, 09:00 AM", teacher: "Sunita Mehta", done: false },
    { id: 2, subject: "Mathematics", title: "Quadratic Equations Exercise 4.2 (Q1 to Q15)", dueDate: "10 Aug 2026", teacher: "Rakesh Verma", done: true },
    { id: 3, subject: "English", title: "Essay Writing on Modern Renewable Energy", dueDate: "12 Aug 2026", teacher: "Anjali Gupta", done: false }
  ]);

  const toggleHomework = (id: number) => {
    setHomeworkList(prev => prev.map(hw => hw.id === id ? { ...hw, done: !hw.done } : hw));
  };

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ 1. GREETING & CHILD PROFILE HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: "linear-gradient(135deg, #6366f1, #3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: "1.2rem",
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)"
          }}>
            AS
          </div>
          <div>
            <div className="banner-title" style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
              Aarav Sharma
            </div>
            <div className="banner-sub" style={{ fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.35rem", marginTop: 2 }}>
              <span style={{ fontWeight: 700 }}>{t.classStr}</span> • <span>{t.rollNoStr}</span> • <span>{t.dpsDelhi}</span>
            </div>
          </div>
        </div>

        <div style={{
          background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
          color: "#059669", padding: "0.3rem 0.65rem", borderRadius: 99,
          fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.3rem"
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          {t.activeStudent}
        </div>
      </div>

      {/* ════════════ 2. QUICK ACTIONS GRID ════════════ */}
      <div>
        <div style={{ fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Sparkles size={14} /> {t.quickShortcuts}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.65rem" }}>
          {[
            { icon: Bus, label: t.bus, color: "#0284c7", bg: "rgba(56, 189, 248, 0.15)" },
            { icon: CreditCard, label: t.payFees, color: "#059669", bg: "rgba(52, 211, 153, 0.15)" },
            { icon: CalendarCheck, label: t.attendance, color: "#7c3aed", bg: "rgba(167, 139, 250, 0.15)" },
            { icon: BookOpen, label: t.homework, color: "#d97706", bg: "rgba(251, 191, 36, 0.15)" },
            { icon: FileText, label: t.exams, color: "#dc2626", bg: "rgba(248, 113, 113, 0.15)" },
            { icon: MessageSquare, label: t.teacherChat, color: "#4f46e5", bg: "rgba(129, 140, 248, 0.15)" },
            { icon: Award, label: t.reportCard, color: "#db2777", bg: "rgba(244, 114, 182, 0.15)" },
            { icon: FileCheck, label: t.applyLeave, color: "#0284c7", bg: "rgba(56, 189, 248, 0.15)" }
          ].map((act, i) => (
            <button key={i} type="button" className="shortcut-btn">
              <div style={{
                width: 38, height: 38, borderRadius: 12, background: act.bg,
                display: "flex", alignItems: "center", justifyContent: "center", color: act.color
              }}>
                <act.icon size={20} />
              </div>
              <span className="shortcut-text">{act.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ════════════ 3. TODAY'S ATTENDANCE WIDGET ════════════ */}
      <div className="card-ui" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669" }}>
              <UserCheck size={18} />
            </div>
            <div>
              <div className="text-title" style={{ fontSize: "0.9rem", fontWeight: 800 }}>{t.todayGateAttendance}</div>
              <div className="text-muted-custom" style={{ fontSize: "0.72rem" }}>{t.rfidEntryLog}</div>
            </div>
          </div>

          <span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#059669", padding: "0.2rem 0.65rem", borderRadius: 99, fontSize: "0.72rem", fontWeight: 800 }}>
            {t.present}
          </span>
        </div>

        <div className="subbox-ui" style={{ padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="text-muted-custom" style={{ fontSize: "0.68rem", fontWeight: 700 }}>{t.inTime}</div>
            <div className="text-title" style={{ fontSize: "1.1rem", fontWeight: 800, marginTop: 2 }}>07:42 AM</div>
          </div>
          <div style={{ height: 28, width: 1, background: "var(--border-card)" }} />
          <div>
            <div className="text-muted-custom" style={{ fontSize: "0.68rem", fontWeight: 700 }}>{t.gateRoom}</div>
            <div className="text-title" style={{ fontSize: "0.82rem", fontWeight: 700, marginTop: 2 }}>{t.mainGate}</div>
          </div>
          <div style={{ height: 28, width: 1, background: "var(--border-card)" }} />
          <div>
            <div className="text-muted-custom" style={{ fontSize: "0.68rem", fontWeight: 700 }}>{t.thisMonth}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#059669", marginTop: 2 }}>96.2%</div>
          </div>
        </div>
      </div>

      {/* ════════════ 4. LIVE BUS TELEMETRY WIDGET ════════════ */}
      <div className="card-ui" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(56, 189, 248, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0284c7" }}>
              <Bus size={18} />
            </div>
            <div>
              <div className="text-title" style={{ fontSize: "0.9rem", fontWeight: 800 }}>{t.liveBusTelemetry}</div>
              <div className="text-muted-custom" style={{ fontSize: "0.72rem" }}>Bus #DL01AB4321 • Route 1 (Dwarka)</div>
            </div>
          </div>

          <div style={{ background: "rgba(56, 189, 248, 0.15)", color: "#0284c7", padding: "0.2rem 0.65rem", borderRadius: 99, fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0284c7" }} />
            {t.onRoute}
          </div>
        </div>

        <div className="subbox-ui" style={{ padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="text-muted-custom" style={{ fontSize: "0.68rem", fontWeight: 700 }}>{t.estimatedArrival}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0284c7", marginTop: 2 }}>{t.minsAway}</div>
          </div>
          <div style={{ height: 28, width: 1, background: "var(--border-card)" }} />
          <div>
            <div className="text-muted-custom" style={{ fontSize: "0.68rem", fontWeight: 700 }}>{t.nextStop}</div>
            <div className="text-title" style={{ fontSize: "0.82rem", fontWeight: 700, marginTop: 2 }}>{t.dwarkaSec12}</div>
          </div>
        </div>
      </div>

    </div>
  );
}
