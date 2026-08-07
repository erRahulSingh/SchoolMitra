"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, Settings, ChevronRight, Calendar, FileText, 
  Lock, Bell, HelpCircle, LogOut 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function ProfilePage() {
  const teacherInfo = {
    name: "Rahul Sharma",
    role: "Mathematics Teacher",
    employeeId: "TCH-2024-125",
    phone: "+91 98765 43210",
    email: "rahul.sharma@school.com",
    department: "Mathematics",
    qualification: "M.Sc, B.Ed",
    experience: "5 Years"
  };

  const menuItems = [
    { label: "Attendance History", icon: Calendar, href: "/profile/attendance-history" },
    { label: "Leave Applications", icon: FileText, href: "/profile/leave-applications" },
    { label: "Change Password", icon: Lock, href: "/profile/change-password" },
    { label: "Notification Settings", icon: Bell, href: "/profile/notifications" },
    { label: "Help & Support", icon: HelpCircle, href: "/profile/help" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "100vh", overflow: "hidden", background: "var(--bg-shell)" }}>
      
      {/* 1. TOP HEADER */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 1.1rem 0.6rem 1.1rem"
      }}>
        <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
          Profile
        </h1>

        <button type="button" style={{ background: "none", border: "none", color: "var(--card-text)", cursor: "pointer", padding: 2 }}>
          <Settings size={20} />
        </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>
        
        {/* 2. PURPLE HERO PROFILE BANNER */}
        <div style={{
          borderRadius: "22px",
          padding: "1.3rem 1.4rem",
          background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          gap: "1.1rem",
          boxShadow: "0 10px 25px rgba(124, 58, 237, 0.3)"
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#ffffff",
            color: "#7c3aed",
            fontSize: "1.35rem",
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            flexShrink: 0
          }}>
            RS
          </div>

          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 900, margin: 0 }}>
              {teacherInfo.name}
            </h2>
            <div style={{ fontSize: "0.82rem", opacity: 0.9, fontWeight: 600, marginTop: 2 }}>
              {teacherInfo.role}
            </div>
            <div style={{ fontSize: "0.72rem", opacity: 0.8, fontWeight: 600, marginTop: 2 }}>
              Employee ID: {teacherInfo.employeeId}
            </div>
          </div>
        </div>

        {/* 3. MY INFORMATION SECTION */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", marginBottom: "0.85rem" }}>
            My Information
          </h3>

          <div className="card-white" style={{
            padding: "1.1rem 1.2rem",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
              <span style={{ color: "var(--card-subtext)", fontWeight: 600 }}>Phone Number</span>
              <span style={{ fontWeight: 800, color: "var(--card-text)" }}>{teacherInfo.phone}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
              <span style={{ color: "var(--card-subtext)", fontWeight: 600 }}>Email</span>
              <span style={{ fontWeight: 800, color: "var(--card-text)" }}>{teacherInfo.email}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
              <span style={{ color: "var(--card-subtext)", fontWeight: 600 }}>Department</span>
              <span style={{ fontWeight: 800, color: "var(--card-text)" }}>{teacherInfo.department}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
              <span style={{ color: "var(--card-subtext)", fontWeight: 600 }}>Qualification</span>
              <span style={{ fontWeight: 800, color: "var(--card-text)" }}>{teacherInfo.qualification}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
              <span style={{ color: "var(--card-subtext)", fontWeight: 600 }}>Experience</span>
              <span style={{ fontWeight: 800, color: "var(--card-text)" }}>{teacherInfo.experience}</span>
            </div>
          </div>
        </div>

        {/* 4. MENU ITEMS LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {menuItems.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <Link key={idx} href={item.href} style={{ textDecoration: "none" }}>
                <div className="card-white" style={{
                  padding: "0.9rem 1.1rem",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <ItemIcon size={18} color="var(--card-text)" strokeWidth={2.2} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--card-text)" }}>
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight size={18} color="var(--card-subtext)" />
                </div>
              </Link>
            );
          })}

          {/* LOGOUT ITEM */}
          <button 
            type="button" 
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("teacher_access_token");
              }
              window.location.href = "/login";
            }}
            className="card-white" 
            style={{
              width: "100%",
              padding: "0.9rem 1.1rem",
              borderRadius: "18px",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
            }}
          >
            <LogOut size={18} color="#ef4444" strokeWidth={2.2} />
            <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#ef4444" }}>
              Logout
            </span>
          </button>
        </div>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
