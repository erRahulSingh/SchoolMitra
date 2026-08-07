"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, CheckCircle2, XCircle, Calendar, BookOpen, 
  FileText, Award, GraduationCap, ChevronRight, 
  Bell, Clock, Sparkles, MessageSquare, AlertCircle
} from "lucide-react";
import TeacherHeader from "@/components/TeacherHeader";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function TeacherDashboardPage() {
  const [userName, setUserName] = useState("Rahul");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("teacher_profile");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.name) {
            const firstName = parsed.name.split(" ")[0];
            setUserName(firstName);
          }
        } catch (e) {}
      }
    }
  }, []);

  const todayClasses = [
    { time: "8:00 AM", subject: "Maths", class: "Class 10-A", room: "Room 204", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
    { time: "9:00 AM", subject: "Science", class: "Class 9-B", room: "Science Lab 2", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
    { time: "10:30 AM", subject: "English", class: "Class 10-B", room: "Room 108", color: "#9333ea", bg: "#faf5ff", border: "#e9d5ff" }
  ];

  const quickActions = [
    { name: "Attendance", icon: Calendar, href: "/attendance", bg: "#f3e8ff", iconColor: "#8b5cf6" },
    { name: "Homework", icon: FileText, href: "/homework", bg: "#dcfce7", iconColor: "#10b981" },
    { name: "Weekly Test", icon: Award, href: "/weekly-test", bg: "#fef3c7", iconColor: "#f59e0b" },
    { name: "Marks", icon: GraduationCap, href: "/exams/marks-entry", bg: "#e0f2fe", iconColor: "#0284c7" },
    { name: "Report", icon: FileText, href: "/report-card", bg: "#fae8ff", iconColor: "#d946ef" }
  ];

  const notifications = [
    { title: "Homework Pending", desc: "14 Submissions awaiting evaluation for Class 10-A Maths", time: "10m ago", icon: BookOpen, color: "#d97706", bg: "#fef3c7", href: "/homework/submissions" },
    { title: "Exam Tomorrow", desc: "Unit Test Physics for Class 9-B scheduled at 9:00 AM", time: "1h ago", icon: AlertCircle, color: "#dc2626", bg: "#fee2e2", href: "/weekly-test" },
    { title: "Parent Message", desc: "Mrs. Sunita Sharma sent an inquiry regarding Rohan's progress", time: "2h ago", icon: MessageSquare, color: "#2563eb", bg: "#e0f2fe", href: "/communication/messages" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f8fafc" }}>
      
      {/* 1. TOP HEADER (HAMBURGER, SCHOOLMITRA BRANDING, NOTIFICATION BELL) */}
      <TeacherHeader unreadCount={3} />

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, gap: "1.1rem", padding: "0.9rem" }}>
        
        {/* ════════════ 2. HERO GREETING BANNER CARD ════════════ */}
        <div style={{
          borderRadius: "20px",
          padding: "1.2rem 1.25rem",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)",
          color: "#ffffff",
          display: "flex",
          justify: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.28)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ flex: 1, paddingRight: "0.5rem" }}>
            <div style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.35rem", 
              padding: "0.2rem 0.55rem", 
              borderRadius: "99px", 
              background: "rgba(255, 255, 255, 0.2)", 
              fontSize: "0.7rem", 
              fontWeight: 800,
              marginBottom: 4 
            }}>
              <Clock size={12} /> Today • Monday
            </div>
            
            <h1 style={{ fontSize: "1.35rem", fontWeight: 900, marginTop: 2, color: "#ffffff", letterSpacing: "-0.01em" }}>
              Good Morning {userName} 👋
            </h1>
            <p style={{ fontSize: "0.73rem", opacity: 0.9, marginTop: 3, lineHeight: 1.3 }}>
              Class 10-A • Senior Educator
            </p>
          </div>

          {/* FIXED AVATAR BADGE */}
          <div style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.22)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            flexShrink: 0
          }}>
            👨‍🏫
          </div>
        </div>

        {/* ════════════ 3. SECTION 1: TODAY'S CLASSES ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "0.92rem", fontWeight: 900, color: "#1e3a8a", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              📚 Today's Classes
            </h3>
            <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 800, background: "#e2e8f0", padding: "0.15rem 0.55rem", borderRadius: "99px" }}>
              3 Scheduled
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {todayClasses.map((cls, idx) => (
              <div 
                key={idx} 
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "0.8rem 0.95rem",
                  border: `1px solid ${cls.border}`,
                  display: "flex",
                  alignItems: "center",
                  justify: "space-between",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: 46,
                    height: 46,
                    borderRadius: "12px",
                    background: cls.bg,
                    color: cls.color,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justify: "center",
                    fontWeight: 900,
                    fontSize: "0.7rem",
                    flexShrink: 0
                  }}>
                    <Clock size={14} style={{ marginBottom: 1 }} />
                    {cls.time.split(" ")[0]}
                  </div>

                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "#0f172a" }}>
                      {cls.subject}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700, marginTop: 1 }}>
                      {cls.class} • {cls.room}
                    </div>
                  </div>
                </div>

                <Link href="/attendance" style={{
                  padding: "0.4rem 0.7rem",
                  borderRadius: "99px",
                  background: cls.bg,
                  color: cls.color,
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  textDecoration: "none",
                  border: `1px solid ${cls.border}`
                }}>
                  Attendance
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════ 4. SECTION 2: TODAY'S STATISTICS ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <h3 style={{ fontSize: "0.92rem", fontWeight: 900, color: "#1e3a8a" }}>
            Today's Statistics
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
            {/* TOTAL STUDENTS */}
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "16px", padding: "0.75rem 0.4rem", textAlign: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#dbeafe", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px auto" }}>
                <Users size={16} />
              </div>
              <div style={{ fontSize: "0.65rem", color: "#475569", fontWeight: 800 }}>👨 Students</div>
              <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#1e40af", marginTop: 2 }}>142</div>
            </div>

            {/* PRESENT */}
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", padding: "0.75rem 0.4rem", textAlign: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px auto" }}>
                <CheckCircle2 size={16} />
              </div>
              <div style={{ fontSize: "0.65rem", color: "#475569", fontWeight: 800 }}>✅ Present</div>
              <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#15803d", marginTop: 2 }}>136</div>
            </div>

            {/* ABSENT */}
            <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: "16px", padding: "0.75rem 0.4rem", textAlign: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#ffe4e6", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px auto" }}>
                <XCircle size={16} />
              </div>
              <div style={{ fontSize: "0.65rem", color: "#475569", fontWeight: 800 }}>❌ Absent</div>
              <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#b91c1c", marginTop: 2 }}>6</div>
            </div>
          </div>
        </div>

        {/* ════════════ 5. SECTION 3: QUICK ACTIONS ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "0.92rem", fontWeight: 900, color: "#1e3a8a" }}>
              Quick Actions
            </h3>
            <Link href="/homework" style={{ fontSize: "0.72rem", color: "#1d4ed8", fontWeight: 800, textDecoration: "none" }}>
              View All &gt;
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.4rem" }}>
            {quickActions.map((qa, idx) => {
              const IconComp = qa.icon;
              return (
                <Link
                  key={idx}
                  href={qa.href}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    padding: "0.75rem 0.2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.4rem",
                    textDecoration: "none",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.02)"
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: qa.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: qa.iconColor
                  }}>
                    <IconComp size={17} />
                  </div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#1e293b", textAlign: "center", lineHeight: 1.1 }}>
                    {qa.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ════════════ 6. SECTION 4: NOTIFICATIONS ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "0.92rem", fontWeight: 900, color: "#1e3a8a", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Bell size={15} color="#1d4ed8" /> Notifications
            </h3>
            <Link href="/communication/notifications" style={{ fontSize: "0.72rem", color: "#1d4ed8", fontWeight: 800, textDecoration: "none" }}>
              See All
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {notifications.map((n, idx) => {
              const IconComp = n.icon;
              return (
                <Link
                  key={idx}
                  href={n.href}
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "0.8rem 0.95rem",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    textDecoration: "none",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                  }}
                >
                  <div style={{
                    width: 34,
                    height: 34,
                    borderRadius: "10px",
                    background: n.bg,
                    color: n.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <IconComp size={16} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#0f172a" }}>
                        {n.title}
                      </span>
                      <span style={{ fontSize: "0.62rem", color: "#94a3b8", fontWeight: 700 }}>
                        {n.time}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.72rem", color: "#64748b", marginTop: 2, lineHeight: 1.3 }}>
                      {n.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>

      {/* 7. BOTTOM TABBAR (TEACHER OPTIONS WITH ELEVATED (+) BUTTON DESIGN) */}
      <TeacherBottomNav />

    </div>
  );
}
