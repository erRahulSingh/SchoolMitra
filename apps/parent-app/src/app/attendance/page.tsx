"use client";

import React, { useState } from "react";
import { 
  CalendarCheck, Calendar, BarChart3, Clock, CheckCircle2, 
  XCircle, AlertCircle, Download, ChevronRight, UserCheck, 
  Sparkles, Filter, FileText, TrendingUp, ShieldCheck
} from "lucide-react";
import { Language, translations } from "../i18n";

export default function AttendancePage({ language = "en" }: { language?: Language }) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<"daily" | "monthly" | "report">("daily");
  const [selectedMonth, setSelectedMonth] = useState("August 2026");

  const dailyLogs = [
    { date: "Today, 28 Aug 2026", day: "Friday", inTime: "07:42 AM", outTime: "02:15 PM", gate: "Main Gate #1", room: "10-A", status: t.present, teacher: "Sunita Mehta" },
    { date: "27 Aug 2026", day: "Thursday", inTime: "07:45 AM", outTime: "02:15 PM", gate: "Main Gate #1", room: "10-A", status: t.present, teacher: "Sunita Mehta" },
    { date: "26 Aug 2026", day: "Wednesday", inTime: "08:05 AM", outTime: "02:15 PM", gate: "Main Gate #2", room: "10-A", status: t.late, teacher: "Sunita Mehta" },
    { date: "25 Aug 2026", day: "Tuesday", inTime: "07:40 AM", outTime: "02:15 PM", gate: "Main Gate #1", room: "10-A", status: t.present, teacher: "Sunita Mehta" },
    { date: "24 Aug 2026", day: "Monday", inTime: "-", outTime: "-", gate: "-", room: "-", status: t.absent, teacher: "Sunita Mehta (Sick Leave)" }
  ];

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
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>{t.attendanceTracker}</h2>
            <span style={{ background: "rgba(16,185,129,0.2)", color: "#059669", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              Term 2026
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Aarav Sharma • {t.classStr} • RFID Gate Telemetry
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="banner-sub" style={{ fontSize: "0.68rem", fontWeight: 700 }}>{t.overallRate}</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#059669", marginTop: 1 }}>96.2%</div>
        </div>
      </div>

      {/* ════════════ 3-TAB SUB-NAVIGATION BAR ════════════ */}
      <div className="subtab-bar" style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.45rem",
        padding: "0.35rem", borderRadius: 16
      }}>
        {[
          { id: "daily", label: t.dailyLogs, icon: Clock },
          { id: "monthly", label: t.monthly, icon: Calendar },
          { id: "report", label: t.analytics, icon: BarChart3 }
        ].map(tb => (
          <button
            key={tb.id}
            type="button"
            onClick={() => setActiveTab(tb.id as any)}
            style={{
              padding: "0.6rem 0.5rem", borderRadius: 12, border: "none",
              background: activeTab === tb.id ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent",
              color: activeTab === tb.id ? "#fff" : "var(--card-subtext)",
              fontSize: "0.78rem", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              cursor: "pointer",
              boxShadow: activeTab === tb.id ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none"
            }}
          >
            <tb.icon size={15} />
            <span>{tb.label}</span>
          </button>
        ))}
      </div>

      {/* ════════════ SCREEN 1: DAILY ATTENDANCE ════════════ */}
      {activeTab === "daily" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="text-title" style={{ fontSize: "0.85rem", fontWeight: 800 }}>{t.recentGateLogs}</div>
            <div style={{ fontSize: "0.72rem", color: "#0284c7", fontWeight: 700 }}>5 Days Shown</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {dailyLogs.map((log, i) => (
              <div key={i} className="card-ui" style={{ padding: "1rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div className="text-title" style={{ fontSize: "0.88rem", fontWeight: 800 }}>{log.date}</div>
                    <div className="text-muted-custom" style={{ fontSize: "0.72rem" }}>{log.day} • {log.room}</div>
                  </div>

                  <span style={{
                    background: log.status === t.present ? "rgba(16,185,129,0.2)" : log.status === t.late ? "rgba(251,191,36,0.2)" : "rgba(239,68,68,0.2)",
                    color: log.status === t.present ? "#059669" : log.status === t.late ? "#d97706" : "#dc2626",
                    padding: "0.2rem 0.65rem", borderRadius: 99, fontSize: "0.72rem", fontWeight: 800
                  }}>
                    {log.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
