"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  DollarSign, 
  FileText, 
  LifeBuoy, 
  Megaphone, 
  Sliders, 
  Tag, 
  Ticket, 
  BarChart3, 
  ShieldCheck, 
  Bell, 
  Settings, 
  TrendingUp, 
  Users, 
  Activity, 
  HardDrive, 
  Server, 
  Database
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
      { label: "Audit Trail Logs", href: "/audit-logs", icon: ShieldCheck },
      { label: "User Activity Logs", href: "/activity-logs", icon: Activity },
      { label: "Storage & Atlas Usage", href: "/storage-usage", icon: HardDrive },
      { label: "Server Health Telemetry", href: "/server-health", icon: Server },
      { label: "Database Backups", href: "/backups", icon: Database },
      { label: "Platform Settings", href: "/settings", icon: Settings },
    ]
  }
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: '260px',
      background: '#090d16',
      borderRight: '1px solid var(--border-color)',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      zIndex: 50
    }}>
      <div style={{ height: '70px', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <ShieldCheck size={22} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>SchoolMitra</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Super Admin Portal</div>
        </div>
      </div>

      <nav style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {NAV_SECTIONS.map((sec, idx) => (
          <div key={idx}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '0 0.75rem 0.4rem 0.75rem' }}>
              {sec.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      color: isActive ? '#fff' : 'var(--text-muted)',
                      background: isActive ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.85rem',
                      textDecoration: 'none'
                    }}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
