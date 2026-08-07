"use client";

import React from "react";
import Link from "next/link";
import { 
  Search, ClipboardCheck, Calendar, FileText, FileSpreadsheet, 
  BookOpen, Award, GraduationCap, PenTool, FileBarChart2, 
  TrendingUp, Clock 
} from "lucide-react";
import TeacherHeader from "@/components/TeacherHeader";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function AcademicsPage() {
  const tools = [
    { name: "Attendance", icon: Calendar, color: "#10b981", bg: "#dcfce7", href: "/attendance" },
    { name: "Homework", icon: FileText, color: "#3b82f6", bg: "#dbeafe", href: "/homework" },
    { name: "Assignments", icon: FileSpreadsheet, color: "#f59e0b", bg: "#fef3c7", href: "/assignments" },
    { name: "Study Material", icon: BookOpen, color: "#8b5cf6", bg: "#f3e8ff", href: "/study-material" },
    { name: "Weekly Test", icon: Award, color: "#ec4899", bg: "#fce7f3", href: "/weekly-test" },
    { name: "Exams", icon: GraduationCap, color: "#3b82f6", bg: "#dbeafe", href: "/exams" },
    { name: "Marks Entry", icon: PenTool, color: "#06b6d4", bg: "#cffafe", href: "/exams/marks-entry" },
    { name: "Report Cards", icon: FileBarChart2, color: "#10b981", bg: "#dcfce7", href: "/report-card" },
    { name: "Analytics", icon: TrendingUp, color: "#7c3aed", bg: "#f3e8ff", href: "/homework/analytics" },
  ];

  const recentActivities = [
    { title: "Homework uploaded", sub: "Class 8-A • Maths", time: "2h ago", icon: FileText, color: "#8b5cf6", bg: "#f3e8ff" },
    { title: "Attendance marked", sub: "Class 8-B • Science", time: "4h ago", icon: Calendar, color: "#10b981", bg: "#dcfce7" },
    { title: "Weekly test created", sub: "Class 9-A • Maths", time: "1d ago", icon: Award, color: "#ec4899", bg: "#fce7f3" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "100vh", overflow: "hidden", background: "var(--bg-shell)" }}>
      <TeacherHeader 
        title="Academics" 
        rightAction={
          <button type="button" style={{ background: "none", border: "none", color: "var(--card-text)", cursor: "pointer", padding: 4 }}>
            <Search size={20} />
          </button>
        } 
      />
      
      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>

        {/* 2. BANNER CARD */}
        <div style={{
          borderRadius: "22px",
          padding: "1.25rem 1.3rem",
          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 25px rgba(124, 58, 237, 0.3)"
        }}>
          <div style={{ maxWidth: "60%" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, lineHeight: 1.2, margin: 0 }}>
              Manage your classroom
            </h2>
            <p style={{ fontSize: "0.75rem", opacity: 0.9, fontWeight: 600, marginTop: 4 }}>
              activities efficiently
            </p>
          </div>

          <div style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <ClipboardCheck size={38} color="#ffffff" strokeWidth={1.8} />
          </div>
        </div>

        {/* 3. ACADEMIC TOOLS (3X3 GRID) */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", marginBottom: "0.85rem" }}>
            Academic Tools
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
            {tools.map((tool, idx) => {
              const IconC = tool.icon;
              return (
                <Link key={idx} href={tool.href} style={{ textDecoration: "none" }}>
                  <div className="card-white" style={{
                    padding: "1.1rem 0.5rem",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
                  }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: "16px",
                      background: tool.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: tool.color,
                      marginBottom: "0.55rem"
                    }}>
                      <IconC size={24} strokeWidth={2.2} />
                    </div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--card-text)", lineHeight: 1.1 }}>
                      {tool.name}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 4. RECENT ACTIVITIES FEED */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
              Recent Activities
            </h3>
            <Link href="/dashboard" style={{ fontSize: "0.78rem", fontWeight: 800, color: "#7c3aed", textDecoration: "none" }}>
              View All
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {recentActivities.map((act, idx) => {
              const ActIcon = act.icon;
              return (
                <div key={idx} className="card-white" style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "12px",
                      background: act.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: act.color
                    }}>
                      <ActIcon size={20} strokeWidth={2.2} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--card-text)" }}>
                        {act.title}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                        {act.sub}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: "0.7rem", color: "var(--card-subtext)", fontWeight: 700 }}>
                    {act.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
