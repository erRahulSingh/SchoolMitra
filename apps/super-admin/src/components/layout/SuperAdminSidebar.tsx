"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Building2, CreditCard, DollarSign, FileText, 
  LifeBuoy, Megaphone, Sliders, Tag, Ticket, BarChart3, 
  ShieldCheck, Bell, Settings, TrendingUp, Users, Activity, 
  HardDrive, Server, Database 
} from "lucide-react";

const NAV_SECTIONS = [
  {
    title: "OVERVIEW & SCHOOLS",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Schools Directory", href: "/schools", icon: Building2 },
      { label: "Super Admin Users", href: "/users", icon: Users },
    ]
  },
  {
    title: "BILLING & REVENUE",
    items: [
      { label: "Revenue Analytics", href: "/revenue", icon: TrendingUp },
      { label: "Subscriptions", href: "/subscriptions", icon: CreditCard },
      { label: "Payments", href: "/payments", icon: DollarSign },
      { label: "Invoices", href: "/invoices", icon: FileText },
      { label: "SaaS Plans", href: "/plans", icon: Tag },
      { label: "Discount Coupons", href: "/coupons", icon: Ticket },
    ]
  },
  {
    title: "PLATFORM & GOVERNANCE",
    items: [
      { label: "Feature Toggles", href: "/feature-toggles", icon: Sliders },
      { label: "Support Tickets", href: "/support-tickets", icon: LifeBuoy },
      { label: "System Announcements", href: "/announcements", icon: Megaphone },
      { label: "Analytics & Cohorts", href: "/analytics", icon: BarChart3 },
      { label: "Notifications Alert", href: "/notifications", icon: Bell },
    ]
  },
  {
    title: "SYSTEM & INFRASTRUCTURE",
    items: [
      { label: "Server Health", href: "/server-health", icon: Server },
      { label: "Storage Usage", href: "/storage-usage", icon: HardDrive },
      { label: "Backups", href: "/backups", icon: Database },
      { label: "Audit Logs", href: "/audit-logs", icon: ShieldCheck },
      { label: "System Activity", href: "/activity-logs", icon: Activity },
      { label: "Global Settings", href: "/settings", icon: Settings },
    ]
  }
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "260px",
      minHeight: "100vh",
      background: "var(--bg-sidebar)",
      backdropFilter: "blur(20px)",
      borderRight: "1px solid var(--border-color)",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 50,
      transition: "background 0.25s ease, border-color 0.25s ease"
    }}>
      {/* Brand Header */}
      <div style={{
        height: "70px",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0 1.5rem",
        borderBottom: "1px solid var(--border-color)"
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "linear-gradient(135deg, var(--primary), var(--secondary))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", boxShadow: "0 0 16px var(--primary-glow)"
        }}>
          <ShieldCheck size={20} />
        </div>
        <div>
          <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
            SchoolMitra
          </div>
          <div style={{ fontSize: "0.65rem", color: "var(--primary)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            SaaS HQ Admin
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1rem" }}>
        {NAV_SECTIONS.map((sec, idx) => (
          <div key={idx} style={{ marginBottom: "1.25rem" }}>
            <div style={{
              fontSize: "0.68rem", fontWeight: 800, color: "var(--text-dim)",
              textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 0.65rem", marginBottom: "0.4rem"
            }}>
              {sec.title}
            </div>

            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.825rem",
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? "var(--text-main)" : "var(--text-muted)",
                    background: isActive ? "linear-gradient(90deg, rgba(139, 92, 246, 0.22) 0%, rgba(99, 102, 241, 0.08) 100%)" : "transparent",
                    borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                    marginBottom: 2
                  }}
                >
                  <Icon size={17} color={isActive ? "var(--primary)" : "var(--text-muted)"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer info */}
      <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border-color)", fontSize: "0.72rem", color: "var(--text-dim)" }}>
        SchoolMitra SaaS v2.4.0 • Enterprise
      </div>
    </aside>
  );
}
