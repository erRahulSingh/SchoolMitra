"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UserPlus, 
  GraduationCap, 
  Users, 
  UserCheck, 
  BookOpen, 
  CalendarCheck, 
  FileText, 
  ClipboardList,
  Award, 
  CreditCard, 
  Bus, 
  Library, 
  Package,
  Briefcase, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Building2
} from "lucide-react";

const NAV_SECTIONS = [
  {
    section: "CORE ADMISSIONS & PEOPLE",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Admission Portal", href: "/admission", icon: UserPlus },
      { label: "Students Directory", href: "/students", icon: GraduationCap },
      { label: "Parents Directory", href: "/parents", icon: Users },
      { label: "Teachers & Staff", href: "/teachers", icon: UserCheck },
    ]
  },
  {
    section: "ACADEMICS & EXAMINATIONS",
    items: [
      { label: "Academics & Timetable", href: "/academics", icon: BookOpen },
      { label: "Daily Attendance", href: "/attendance", icon: CalendarCheck },
      { label: "Homework", href: "/homework", icon: FileText },
      { label: "Assignments", href: "/assignments", icon: ClipboardList },
      { label: "Exams & Report Cards", href: "/exams", icon: Award },
    ]
  },
  {
    section: "OPERATIONS, HR & FINANCE",
    items: [
      { label: "Fee Collection", href: "/fees", icon: CreditCard },
      { label: "Live Bus Transport", href: "/transport", icon: Bus },
      { label: "Support Requests", href: "/support", icon: MessageSquare },
      { label: "Notifications Hub", href: "/notifications", icon: MessageSquare },
      { label: "Activity Audit Logs", href: "/activity-logs", icon: ClipboardList },
      { label: "Reports & Analytics", href: "/reports", icon: BarChart3 },
      { label: "School Profile", href: "/profile", icon: Building2 },
      { label: "School Settings", href: "/settings", icon: Settings },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Building2 size={20} />
        </div>
        <div>
          <div className="brand-title">SchoolMitra</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ERP Admin Portal
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_SECTIONS.map((sec, idx) => (
          <div key={idx} style={{ marginBottom: '0.75rem' }}>
            <div className="nav-section-title">{sec.section}</div>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
