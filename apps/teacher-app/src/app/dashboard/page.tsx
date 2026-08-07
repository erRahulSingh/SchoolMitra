"use client";

import React from "react";
import Link from "next/link";
import { 
  Bell, BookOpen, FlaskConical, Languages, Users, 
  UserCheck, UserX, UserMinus, Calendar, FileText, 
  Award, GraduationCap, ChevronRight, Clock, AlertCircle, 
  Megaphone, TrendingUp, CheckCircle2 
} from "lucide-react";
import TeacherHeader from "@/components/TeacherHeader";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function TeacherDashboardPage() {
  const classesToday = [
    { time: "08:00 AM", subject: "Maths", class: "Class 8 - A", icon: BookOpen, color: "#8b5cf6", bg: "#f3e8ff" },
    { time: "09:30 AM", subject: "Science", class: "Class 8 - A", icon: FlaskConical, color: "#10b981", bg: "#dcfce7" },
    { time: "11:00 AM", subject: "English", class: "Class 8 - A", icon: Languages, color: "#f59e0b", bg: "#fef3c7" },
  ];

  const overviewStats = [
    { label: "Total Students", value: 142, icon: Users, color: "#3b82f6", bg: "#eff6ff" },
    { label: "Present", value: 136, icon: UserCheck, color: "#10b981", bg: "#ecfdf5" },
    { label: "Absent", value: 6, icon: UserX, color: "#ef4444", bg: "#fef2f2" },
    { label: "Leave", value: 5, icon: UserMinus, color: "#f59e0b", bg: "#fffbeb" },
  ];

  const quickActions = [
    { name: "Attendance", icon: Calendar, href: "/attendance", color: "#8b5cf6", bg: "#f3e8ff" },
    { name: "Homework", icon: FileText, href: "/homework", color: "#3b82f6", bg: "#dbeafe" },
    { name: "Weekly Test", icon: Award, href: "/weekly-test", color: "#06b6d4", bg: "#cffafe" },
    { name: "Marks Entry", icon: GraduationCap, href: "/exams/marks-entry", color: "#f59e0b", bg: "#fef3c7" },
  ];

  const pendingSubmissions = [
    { title: "Maths Chapter 5 Worksheet", class: "Class 8 - A", pendingCount: 14, dueDate: "Today, 5:00 PM", color: "#7c3aed" },
    { title: "Science Digestive System Notes", class: "Class 8 - B", pendingCount: 8, dueDate: "Tomorrow", color: "#10b981" },
  ];

  const announcements = [
    { title: "Annual Sports Day Registration", date: "25 May 2024", desc: "Collect participation forms from Class 8-A & 8-B students.", tag: "Event" },
    { title: "Parent Teacher Meeting (PTM)", date: "30 May 2024", desc: "Quarterly progress card distribution for Class 8 to 10.", tag: "Notice" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "100vh", overflow: "hidden", background: "var(--bg-shell)" }}>
      
      {/* TOP HEADER WITH SIDEBAR MENU BUTTON & NOTIFICATION BELL */}
      <TeacherHeader unreadCount={3} />

      {/* MAIN SCROLLABLE CONTENT AREA */}
      <div className="mobile-content" style={{
        flex: 1,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        padding: "0.5rem 1.1rem 3rem 1.1rem"
      }}>

        {/* 1. HERO BANNER CARD */}
        <div style={{
          borderRadius: "22px",
          padding: "1.25rem 1.3rem",
          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #4f46e5 100%)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 10px 25px rgba(124, 58, 237, 0.35)",
          flexShrink: 0,
          minHeight: "96px"
        }}>
          <div style={{ flex: 1, paddingRight: "0.5rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, lineHeight: 1.3, margin: 0, color: "#ffffff" }}>
              You have 3 classes today
            </h2>
            <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.9)", fontWeight: 600, marginTop: "0.35rem", margin: "4px 0 0 0" }}>
              Keep going, you&apos;re doing great!
            </p>
          </div>

          <div style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            flexShrink: 0
          }}>
            <GraduationCap size={32} color="#ffffff" strokeWidth={2} />
          </div>
        </div>

        {/* 2. TODAY'S CLASSES SECTION */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
              Today's Classes
            </h3>
            <Link href="/classes" style={{ fontSize: "0.78rem", fontWeight: 800, color: "#7c3aed", textDecoration: "none" }}>
              View All
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {classesToday.map((cls, idx) => {
              const IconComp = cls.icon;
              return (
                <div key={idx} className="card-white" style={{
                  padding: "0.9rem 1.1rem",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: "14px",
                      background: cls.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: cls.color
                    }}>
                      <IconComp size={22} strokeWidth={2.2} />
                    </div>

                    <div>
                      <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--card-subtext)" }}>
                        {cls.time}
                      </div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--card-text)", marginTop: 1 }}>
                        {cls.subject}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "var(--card-subtext)",
                    background: "var(--bg-shell)",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "99px",
                    border: "1px solid var(--card-border)"
                  }}>
                    {cls.class}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. TODAY'S OVERVIEW SECTION */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", marginBottom: "0.75rem" }}>
            Today's Overview
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.6rem" }}>
            {overviewStats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div key={idx} className="card-white" style={{
                  padding: "0.85rem 0.4rem",
                  borderRadius: "18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
                }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: "12px",
                    background: stat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                    marginBottom: "0.45rem"
                  }}>
                    <IconComponent size={20} strokeWidth={2.2} />
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--card-text)", lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--card-subtext)", marginTop: 4, lineHeight: 1.1 }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. QUICK ACTIONS SECTION */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
              Quick Actions
            </h3>
            <Link href="/academics" style={{ fontSize: "0.78rem", fontWeight: 800, color: "#7c3aed", textDecoration: "none" }}>
              View All
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.6rem" }}>
            {quickActions.map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <Link key={idx} href={action.href} style={{ textDecoration: "none" }}>
                  <div className="card-white" style={{
                    padding: "0.85rem 0.4rem",
                    borderRadius: "18px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
                  }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: "14px",
                      background: action.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: action.color,
                      marginBottom: "0.45rem"
                    }}>
                      <ActionIcon size={22} strokeWidth={2.2} />
                    </div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--card-text)", lineHeight: 1.1 }}>
                      {action.name}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 5. NEW SECTION: PENDING EVALUATIONS & SUBMISSIONS */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
              Pending Evaluations
            </h3>
            <Link href="/homework" style={{ fontSize: "0.78rem", fontWeight: 800, color: "#7c3aed", textDecoration: "none" }}>
              Evaluate
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {pendingSubmissions.map((item, idx) => (
              <div key={idx} className="card-white" style={{
                padding: "0.95rem 1.1rem",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
              }}>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "var(--card-text)" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                    {item.class} • Due {item.dueDate}
                  </div>
                </div>

                <div style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "99px",
                  background: "rgba(124, 58, 237, 0.12)",
                  color: "#7c3aed",
                  fontSize: "0.75rem",
                  fontWeight: 900
                }}>
                  {item.pendingCount} Submissions
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. NEW SECTION: RECENT SCHOOL ANNOUNCEMENTS */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
              Recent Announcements
            </h3>
            <Link href="/communication/messages" style={{ fontSize: "0.78rem", fontWeight: 800, color: "#7c3aed", textDecoration: "none" }}>
              View All
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {announcements.map((anc, idx) => (
              <div key={idx} className="card-white" style={{
                padding: "1rem 1.1rem",
                borderRadius: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Megaphone size={16} color="#7c3aed" />
                    <span style={{ fontSize: "0.88rem", fontWeight: 900, color: "var(--card-text)" }}>
                      {anc.title}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "#7c3aed", background: "rgba(124, 58, 237, 0.1)", padding: "0.2rem 0.6rem", borderRadius: "99px" }}>
                    {anc.tag}
                  </span>
                </div>

                <p style={{ fontSize: "0.78rem", color: "var(--card-subtext)", fontWeight: 500, margin: 0, lineHeight: 1.35 }}>
                  {anc.desc}
                </p>

                <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)", fontWeight: 700, marginTop: 2 }}>
                  📅 {anc.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. PERFORMANCE TREND SUMMARY CARD */}
        <div style={{
          borderRadius: "20px",
          padding: "1.1rem 1.25rem",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: "14px",
              background: "#10b981",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <TrendingUp size={22} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "var(--card-text)" }}>
                Class 8-A Average: 96%
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                Highest attendance & marks retention this month
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
