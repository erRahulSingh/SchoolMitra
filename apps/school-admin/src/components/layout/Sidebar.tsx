"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UserPlus, 
  GraduationCap, 
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
  Building2,
  Radio
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Students Directory", href: "/students", icon: GraduationCap },
  { label: "Admission Portal", href: "/admission", icon: UserPlus },
  { label: "Teachers & Staff", href: "/teachers", icon: UserCheck },
  { label: "Academics & Timetable", href: "/academics", icon: BookOpen },
  { label: "Daily Attendance", href: "/attendance", icon: CalendarCheck },
  { label: "Homework Hub", href: "/homework", icon: FileText },
  { label: "Assignments Desk", href: "/assignments", icon: ClipboardList },
  { label: "Exams & Report Cards", href: "/exams", icon: Award },
  { label: "Fee Collection", href: "/fees", icon: CreditCard },
  { label: "Live Bus Transport", href: "/transport", icon: Bus },
  { label: "Support Requests", href: "/support", icon: MessageSquare },
  { label: "Communication Broadcast", href: "/communication", icon: Radio },
  { label: "Notifications Hub", href: "/notifications", icon: MessageSquare },
  { label: "Reports & Analytics", href: "/reports", icon: BarChart3 },
  { label: "School Settings", href: "/settings", icon: Settings },
  { label: "School Profile", href: "/profile", icon: Building2 },
  { label: "Activity Audit Logs", href: "/activity-logs", icon: ClipboardList },
  { label: "HR & Staff Payroll", href: "/hr", icon: Briefcase },
  { label: "Library Catalog", href: "/library", icon: Library },
  { label: "Inventory & Assets", href: "/inventory", icon: Package }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand" style={{ justifyContent: 'center' }}>
        <img 
          src="/logo.png" 
          alt="SchoolMitra Logo" 
          style={{ height: '50px', maxWidth: '100%', objectFit: 'contain' }} 
        />
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
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
      </nav>
    </aside>
  );
}
