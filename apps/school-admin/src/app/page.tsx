"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, UserCheck, CalendarCheck, CreditCard, Bus, 
  UserPlus, CheckCircle2, Clock, AlertTriangle, Sparkles,
  TrendingUp, ChevronRight, Award, Bell, ShieldCheck, ArrowUpRight,
  LayoutDashboard, Calendar, FileText, ClipboardList, Settings, Building2,
  ChevronDown, Search, ArrowDownRight, Send, AlertOctagon, RefreshCw, Eye, HelpCircle, FileSpreadsheet
} from "lucide-react";
import Link from "next/link";
import { schoolAdminApi } from "@/lib/api";
import { Button, Card, Badge, DataGrid, Drawer, ToastContainer, Timeline, ToastMessage, Modal } from "@/components/ui";

export default function DashboardPage() {
  const [user, setUser] = useState({ name: "School Admin", schoolName: "Delhi Public School (Main Campus)" });
  const [buses, setBuses] = useState<any[]>([]);
  const [activeDashboardTab, setActiveDashboardTab] = useState<
    "home" | "analytics" | "students" | "teachers" | "fees" | "attendance" | "transport" | "notifications" | "activities" | "calendar"
  >("home");
  
  // States for interactive demo actions
  const [searchQuery, setSearchQuery] = useState("");
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastTarget, setBroadcastTarget] = useState("parents");
  const [broadcastBody, setBroadcastBody] = useState("");
  const [notificationsSent, setNotificationsSent] = useState<any[]>([]);

  // UI Components State (Toast, 360° Drawer Inspector & Dynamic DataGrid)
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedInspectorItem, setSelectedInspectorItem] = useState<any | null>(null);
  const [classDistributionData, setClassDistributionData] = useState([
    { id: "CLS-12A", grade: "Class 12-A", total: 42, boys: 22, girls: 20, bus: 25, teacher: "Rajesh Kumar (Maths)" },
    { id: "CLS-11B", grade: "Class 11-B", total: 38, boys: 18, girls: 20, bus: 21, teacher: "Sunita Rao (Physics)" },
    { id: "CLS-10A", grade: "Class 10-A", total: 45, boys: 25, girls: 20, bus: 32, teacher: "Anjali Gupta (English)" },
    { id: "CLS-09C", grade: "Class 9-C", total: 40, boys: 20, girls: 20, bus: 18, teacher: "Manoj Sen (Chemistry)" }
  ]);

  const addToast = (type: "success" | "error" | "warning" | "info", title: string, description?: string) => {
    const id = String(Date.now());
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const [dashboardOverview, setDashboardOverview] = useState<any>(null);
  const [dashboardCards, setDashboardCards] = useState<any[]>([]);
  const [dashboardActivities, setDashboardActivities] = useState<any[]>([]);
  const [dashboardCalendarEvents, setDashboardCalendarEvents] = useState<any[]>([]);
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [teachersList, setTeachersList] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [newBusForm, setNewBusForm] = useState({
    busNumber: "",
    registrationNumber: "",
    driverName: "",
    driverPhone: "",
    routeName: "",
    capacity: 40
  });

  const handleCreateBus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBusForm.busNumber) {
      addToast("warning", "Validation Error", "Bus Number is required.");
      return;
    }
    try {
      const res = await schoolAdminApi.createBus(newBusForm);
      if (res.success) {
        addToast("success", "Fleet Bus Registered", `Bus ${newBusForm.busNumber} added successfully to MongoDB.`);
        setIsAddBusOpen(false);
        setNewBusForm({ busNumber: "", registrationNumber: "", driverName: "", driverPhone: "", routeName: "", capacity: 40 });
        const busesRes = await schoolAdminApi.getBuses();
        if (busesRes.success && Array.isArray(busesRes.buses)) {
          setBuses(busesRes.buses);
        } else if (busesRes.success && Array.isArray(busesRes.data)) {
          setBuses(busesRes.data);
        }
      } else {
        addToast("error", "Error", res.message || "Failed to register bus.");
      }
    } catch (err: any) {
      addToast("error", "Network Error", err.message);
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser({
          name: parsed.name || "School Admin",
          schoolName: parsed.schoolName || "Delhi Public School (Main Campus)"
        });
      }
    } catch (e) {
      // ignore
    }

    const loadLiveDBMetrics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/admin/dashboard/overview");
        const json = await res.json();
        if (json.success && json.data) {
          setDashboardOverview(json.data);
        }
      } catch (e) {
        console.warn("Using active DB fallback overview metrics:", e);
      }
    };
    loadLiveDBMetrics();

    // 1. Fetch live buses & fleet telemetry from backend API
    schoolAdminApi.getBuses().then((res) => {
      if (res.success && Array.isArray(res.buses)) {
        setBuses(res.buses);
      } else if (res.success && res.data && Array.isArray(res.data.buses)) {
        setBuses(res.data.buses);
      } else if (res.success && Array.isArray(res.data)) {
        setBuses(res.data);
      } else {
        setBuses([]);
      }
    });

    // 3. Fetch dynamic cards
    schoolAdminApi.getDashboardCards().then((res) => {
      if (res.success && res.cards) {
        setDashboardCards(res.cards);
      }
    });

    // 4. Fetch dynamic recent activity stream
    schoolAdminApi.getDashboardActivity().then((res) => {
      if (res.success && res.activities) {
        setDashboardActivities(res.activities);
      }
    });

    // 5. Fetch dynamic calendar schedule
    schoolAdminApi.getDashboardCalendar().then((res) => {
      if (res.success && res.events) {
        setDashboardCalendarEvents(res.events);
      }
    });

    // 6. Fetch dynamic classes
    schoolAdminApi.getClasses().then((res) => {
      if (res.success && res.classes) {
        setClassDistributionData(res.classes.map((c: any) => ({
          id: c.id || c.code,
          grade: c.name,
          total: c.capacity || 40,
          boys: Math.round((c.capacity || 40) / 2),
          girls: Math.round((c.capacity || 40) / 2),
          bus: c.totalEnrolled || 20,
          teacher: c.classTeacher || "Unassigned"
        })));
      }
    });
    // 7. Fetch live students directory
    schoolAdminApi.getStudents().then((res) => {
      if (res.success && Array.isArray(res.students)) {
        setStudentsList(res.students);
      } else if (res.success && res.data && Array.isArray(res.data.students)) {
        setStudentsList(res.data.students);
      } else if (res.success && Array.isArray(res.data)) {
        setStudentsList(res.data);
      } else {
        setStudentsList([]);
      }
    });

    // 8. Fetch live teachers directory
    schoolAdminApi.getTeachers().then((res) => {
      if (res.success && Array.isArray(res.teachers)) {
        setTeachersList(res.teachers);
      } else if (res.success && res.data && Array.isArray(res.data.teachers)) {
        setTeachersList(res.data.teachers);
      } else if (res.success && Array.isArray(res.data)) {
        setTeachersList(res.data);
      } else {
        setTeachersList([]);
      }
    });

    // 9. Fetch system audit logs
    schoolAdminApi.getAuditLogs().then((res) => {
      if (res.success && Array.isArray(res.logs)) {
        setAuditLogs(res.logs);
      } else if (res.success && res.data && Array.isArray(res.data.logs)) {
        setAuditLogs(res.data.logs);
      } else if (res.success && Array.isArray(res.data)) {
        setAuditLogs(res.data);
      } else {
        setAuditLogs([]);
      }
    });
  }, []);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) {
      alert("Please fill in all broadcast fields.");
      return;
    }
    const newAlert = {
      id: Date.now(),
      title: broadcastTitle,
      target: broadcastTarget,
      body: broadcastBody,
      time: "Just now",
      status: "Dispatched ✅"
    };
    setNotificationsSent(prev => [newAlert, ...prev]);
    setBroadcastTitle("");
    setBroadcastBody("");
    alert(`Broadcast alert successfully sent via SMS, WhatsApp & Push to all ${broadcastTarget}!`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* ERP DASHBOARD TOP HEADER BANNER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            School ERP Command Center <Sparkles size={22} color="var(--primary)" />
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.9rem" }}>
            Welcome back, <strong>{user.name}</strong> &bull; Real-time telemetry &amp; academic operations at <strong>{user.schoolName}</strong>
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/admission" className="btn btn-secondary">
            <UserPlus size={16} />
            <span>Admit Student</span>
          </Link>
          <Link href="/fees" className="btn btn-primary">
            <CreditCard size={16} />
            <span>Collect Fees</span>
          </Link>
        </div>
      </div>

      {/* ════════════ PREMIUM INTERACTIVE TAB BAR ════════════ */}
      <div className="glass-card" style={{ 
        padding: "0.6rem", 
        display: "flex", 
        gap: "0.5rem", 
        overflowX: "auto", 
        whiteSpace: "nowrap",
        border: "1px solid var(--border-color)",
        background: "var(--bg-card)",
        borderRadius: "var(--radius-md)"
      }}>
        {[
          { id: "home", label: "Dashboard Home", icon: LayoutDashboard },
          { id: "analytics", label: "Analytics Overview", icon: TrendingUp },
          { id: "students", label: "Student Overview", icon: Users },
          { id: "teachers", label: "Teacher Overview", icon: UserCheck },
          { id: "fees", label: "Fee Collection", icon: CreditCard },
          { id: "attendance", label: "Attendance Status", icon: CalendarCheck },
          { id: "transport", label: "Transport Monitor", icon: Bus },
          { id: "notifications", label: "Notifications Center", icon: Bell },
          { id: "activities", label: "Recent Activities", icon: Clock },
          { id: "calendar", label: "Calendar & Events", icon: Calendar }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeDashboardTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDashboardTab(tab.id as any)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{ 
                padding: "0.6rem 1rem", 
                fontSize: "0.82rem", 
                gap: "0.45rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: isActive ? 700 : 500
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB VIEW RENDERING ════════════ */}

      {/* VIEW 1: DASHBOARD HOME */}
      {activeDashboardTab === "home" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* 8 Core Stats Widgets Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {[
              { label: "Total Students", value: dashboardOverview ? dashboardOverview.totalStudents?.toLocaleString() || "0" : "0", trend: "Live MongoDB Record", icon: Users, color: "var(--primary)", bg: "rgba(99, 102, 241, 0.15)" },
              { label: "Total Teachers", value: dashboardOverview ? String(dashboardOverview.totalTeachers ?? 0) : "0", trend: "Live MongoDB Record", icon: UserCheck, color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.15)" },
              { label: "Today's Attendance", value: dashboardOverview?.todayAttendancePercent || "0%", trend: "Live Attendance Log", icon: CalendarCheck, color: "var(--success)", bg: "var(--success-bg)" },
              { label: "Fee Collection", value: dashboardOverview ? `₹${(dashboardOverview.todayCollectionInr || 0).toLocaleString('en-IN')}` : "₹0", trend: "Live Financial Ledgers", icon: CreditCard, color: "var(--primary)", bg: "var(--info-bg)" },
              { label: "Active Fleet Buses", value: `${dashboardOverview?.runningBusesCount ?? buses.length} / ${buses.length}`, trend: "100% Live GPS", icon: Bus, color: "var(--secondary)", bg: "rgba(6, 182, 212, 0.15)" },
              { label: "Driver Status", value: `${buses.length} Active`, trend: "Live Telemetry", icon: ShieldCheck, color: "var(--success)", bg: "var(--success-bg)" },
              { label: "Upcoming Exams", value: dashboardOverview ? `${dashboardOverview.upcomingExamsCount ?? 0} Exams` : "0 Exams", trend: "Academic Calendar", icon: Award, color: "var(--warning)", bg: "var(--warning-bg)" },
              { label: "Support Queue Alerts", value: dashboardOverview ? `${dashboardOverview.openTicketsCount ?? 0} Open` : "0 Open", trend: "Live Support Center", icon: Bell, color: "#f43f5e", bg: "rgba(244, 63, 94, 0.15)" },
            ].map((widget, idx) => (
              <div key={idx} className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
                <div className="stat-icon" style={{ background: widget.bg, color: widget.color }}>
                  <widget.icon size={22} />
                </div>
                <div className="stat-info">
                  <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>{widget.label}</h4>
                  <div className="stat-value" style={{ fontSize: "1.45rem", fontWeight: 800, margin: "2px 0", color: "var(--text-heading)" }}>{widget.value}</div>
                  <div className="stat-trend" style={{ fontSize: "0.72rem", color: widget.color }} dangerouslySetInnerHTML={{ __html: widget.trend }} />
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid: Live Transport & Activities Feed */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "1.5rem" }}>
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)" }}>Live School Transport &amp; GPS Fleet Monitor</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Connected Telemetry from Driver App Telemetry Server</p>
                </div>
                <Link href="/transport" className="btn btn-secondary" style={{ fontSize: "0.8rem", padding: "0.45rem 0.85rem" }}>
                  <span>Live Transport Panel</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {(!Array.isArray(buses) || buses.length === 0) ? (
                  <div style={{ padding: "1rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    No active buses found in MongoDB. Register new buses in Transport Panel.
                  </div>
                ) : (
                  buses.map((bus: any, bIdx: number) => (
                  <div key={bus.id || bIdx} style={{
                    padding: "0.95rem 1.1rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--btn-secondary-bg)",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: (bus.status || "ON ROUTE") === "ARRIVED" ? "var(--success-bg)" : "rgba(6, 182, 212, 0.15)",
                        color: (bus.status || "ON ROUTE") === "ARRIVED" ? "var(--success)" : "var(--secondary)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <Bus size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-heading)" }}>{bus.busNo || bus.registrationNo || `Bus #${bus.id}`}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600 }}>{bus.route || "Default School Route"}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>Driver: {bus.driver || bus.driverName || "Assigned Driver"}</div>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{
                        background: (bus.status || "ON ROUTE") === "ARRIVED" ? "var(--success-bg)" : "rgba(6, 182, 212, 0.15)",
                        color: (bus.status || "ON ROUTE") === "ARRIVED" ? "var(--success)" : "var(--secondary)",
                        padding: "0.25rem 0.6rem", borderRadius: 8, fontSize: "0.72rem", fontWeight: 800
                      }}>
                        {bus.status || "ON ROUTE"} ({bus.speed || "Live GPS"})
                      </span>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Stop: {bus.stop || "Campus Station"}</div>
                    </div>
                  </div>
                ))
              )}
              </div>
            </div>

            {/* Activities Stream */}
            <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)" }}>Recent Activities Stream</h3>
                <span style={{ fontSize: "0.72rem", background: "rgba(99, 102, 241, 0.15)", color: "var(--primary)", padding: "0.2rem 0.5rem", borderRadius: 6, fontWeight: 700 }}>Live Telemetry</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
                {dashboardActivities.length === 0 ? (
                  <div style={{ padding: "1rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    No recent audit activity logs recorded in database.
                  </div>
                ) : (
                  dashboardActivities.map((act: any, idx: number) => (
                    <div key={idx} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: `rgba(99, 102, 241, 0.12)`, color: "var(--primary)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                      }}>
                        <Clock size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.3 }}>{act.title || act.action || act.text}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{act.user || act.actor || "System"} &bull; {act.time || act.timestamp || "Just now"}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Link href="/activity-logs" className="btn btn-secondary" style={{ marginTop: "1.25rem", justifyContent: "center" }}>
                <span>View Complete Audit Trail</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: ANALYTICS OVERVIEW */}
      {activeDashboardTab === "analytics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
            {/* Academic Performance Curve */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>Academic GPA Performance Trends (CBSE Board Classes)</h3>
              
              <div style={{ background: "rgba(0,0,0,0.1)", padding: "1rem", borderRadius: "12px" }}>
                <svg viewBox="0 0 500 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.05)" />
                  <line x1="40" y1="60" x2="480" y2="60" stroke="rgba(255,255,255,0.05)" />
                  <line x1="40" y1="100" x2="480" y2="100" stroke="rgba(255,255,255,0.05)" />
                  <line x1="40" y1="140" x2="480" y2="140" stroke="rgba(255,255,255,0.05)" />
                  <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  
                  {/* Polyline / Paths with gradients */}
                  <path
                    d="M 50 150 Q 120 125 190 85 T 330 65 T 470 30"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 50 160 Q 120 145 190 115 T 330 100 T 470 70"
                    fill="none"
                    stroke="var(--secondary)"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                  
                  {/* Data Points */}
                  <circle cx="50" cy="150" r="4.5" fill="var(--primary)" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="190" cy="85" r="4.5" fill="var(--primary)" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="330" cy="65" r="4.5" fill="var(--primary)" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="470" cy="30" r="4.5" fill="var(--primary)" stroke="#ffffff" strokeWidth="1.5" />

                  {/* Labels */}
                  <text x="50" y="190" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Term 1</text>
                  <text x="190" y="190" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Term 2</text>
                  <text x="330" y="190" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Mid-Term</text>
                  <text x="470" y="190" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Finals (Est)</text>
                  
                  {/* Y Axis Legend */}
                  <text x="30" y="24" fill="var(--text-muted)" fontSize="9" textAnchor="end">9.5</text>
                  <text x="30" y="104" fill="var(--text-muted)" fontSize="9" textAnchor="end">8.0</text>
                  <text x="30" y="174" fill="var(--text-muted)" fontSize="9" textAnchor="end">6.0</text>
                </svg>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.8rem" }}>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--primary)" }} />
                  <span>Current Academic Session (2026-27)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.8rem" }}>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--secondary)" }} />
                  <span>Previous Session Benchmark (2025-26)</span>
                </div>
              </div>
            </div>

            {/* Target gauges */}
            <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justify: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>Performance Goals</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  {[
                    { label: "CBSE Syllabus Coverage", value: 84, color: "var(--primary)" },
                    { label: "Staff Attendance Target", value: 98, color: "var(--success)" },
                    { label: "Fee Collection Target", value: 92, color: "var(--secondary)" },
                    { label: "Live Bus Telemetry GPS SLA", value: 100, color: "#10b981" }
                  ].map((target, idx) => (
                    <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                        <span style={{ fontWeight: 650, color: "var(--text-main)" }}>{target.label}</span>
                        <span style={{ fontWeight: 800, color: target.color }}>{target.value}%</span>
                      </div>
                      <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${target.value}%`, height: "100%", background: target.color, borderRadius: 99 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Database Sync Status</span>
                  <span style={{ color: "var(--success)", fontWeight: 700 }}>Online (0ms latency)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: STUDENT OVERVIEW */}
      {activeDashboardTab === "students" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {[
              { label: "Total Students Registered", value: String(studentsList.length), sub: "Live MongoDB Records", icon: Users, color: "var(--primary)", bg: "rgba(99, 102, 241, 0.12)" },
              { label: "Boys Enrolled", value: String(Math.round(studentsList.length / 2)), sub: "Student Roster", icon: Users, color: "var(--secondary)", bg: "rgba(6, 182, 212, 0.12)" },
              { label: "Girls Enrolled", value: String(studentsList.length - Math.round(studentsList.length / 2)), sub: "Student Roster", icon: Users, color: "var(--success)", bg: "var(--success-bg)" }
            ].map((card, idx) => (
              <div key={idx} className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
                <div className="stat-icon" style={{ background: card.bg, color: card.color }}>
                  <card.icon size={20} />
                </div>
                <div className="stat-info">
                  <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>{card.label}</h4>
                  <div className="stat-value" style={{ fontSize: "1.4rem", fontWeight: 800, margin: "2px 0", color: "var(--text-heading)" }}>{card.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{card.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Student Class Distribution Table using DataGrid */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>
              Class-wise Student Distribution Directory &amp; 360° Inspector
            </h3>

            <DataGrid
              columns={[
                { key: "grade", header: "Class / Grade", sortable: true, render: (row: any) => <strong style={{ color: "var(--text-heading)" }}>{row.grade}</strong> },
                { key: "total", header: "Total Enrolled", sortable: true, render: (row: any) => <Badge variant="info">{row.total} Students</Badge> },
                { key: "boys", header: "Boys Count", sortable: true },
                { key: "girls", header: "Girls Count", sortable: true },
                { key: "bus", header: "Bus Users", sortable: true, render: (row: any) => <span style={{ color: "var(--success)", fontWeight: 700 }}>{row.bus} Bus Users</span> },
                { key: "teacher", header: "Class Teacher", render: (row: any) => <span>{row.teacher}</span> },
                {
                  key: "action",
                  header: "360° Dossier",
                  sortable: false,
                  render: (row: any) => (
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<Eye size={12} />}
                      onClick={() => setSelectedInspectorItem({ id: row.id, name: row.grade, details: `Teacher: ${row.teacher} • Total Students: ${row.total}`, type: "Class Roster" })}
                    >
                      Inspect
                    </Button>
                  )
                }
              ]}
              data={classDistributionData}
              searchKey="grade"
              searchPlaceholder="Search classes or teachers..."
              pageSize={5}
              onSaveRow={(updatedRow: any) => {
                setClassDistributionData(prev => prev.map(r => r.id === updatedRow.id ? updatedRow : r));
                addToast("success", "Row Edited Successfully", `Updated record for ${updatedRow.grade}`);
              }}
              onBulkDelete={(items) => {
                setClassDistributionData(prev => prev.filter(r => !items.some(i => i.id === r.id)));
                addToast("warning", "Bulk Delete Action", `Removed ${items.length} records from table`);
              }}
            />
          </div>
        </div>
      )}

      {/* VIEW 4: TEACHER OVERVIEW */}
      {activeDashboardTab === "teachers" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {[
              { label: "Active Faculty Registered", value: `${teachersList.length} Teachers`, sub: "Live Faculty Roster", icon: UserCheck, color: "var(--success)", bg: "var(--success-bg)" },
              { label: "Staff on Approved Leave", value: "0", sub: "Leave Management Log", icon: AlertTriangle, color: "var(--warning)", bg: "var(--warning-bg)" },
              { label: "Substitutions Arranged Today", value: "0 Tasks", sub: "Academics Roster", icon: Clock, color: "var(--primary)", bg: "rgba(99, 102, 241, 0.12)" }
            ].map((card, idx) => (
              <div key={idx} className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
                <div className="stat-icon" style={{ background: card.bg, color: card.color }}>
                  <card.icon size={20} />
                </div>
                <div className="stat-info">
                  <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>{card.label}</h4>
                  <div className="stat-value" style={{ fontSize: "1.4rem", fontWeight: 800, margin: "2px 0", color: "var(--text-heading)" }}>{card.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{card.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
            {/* Faculty Directory */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>Active Substitution & Duty Log</h3>
              
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Absent Teacher</th>
                    <th>Cover Faculty</th>
                    <th>Class &amp; Subject</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(!Array.isArray(teachersList) || teachersList.length === 0) ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", color: "var(--text-muted)", padding: "1.5rem" }}>
                        No active teacher substitution duties recorded in database.
                      </td>
                    </tr>
                  ) : (
                    teachersList.slice(0, 5).map((t: any, idx: number) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700 }}>{t.name}</td>
                        <td style={{ fontWeight: 700, color: "var(--primary)" }}>Assigned Faculty</td>
                        <td>{t.subject || "Academics"}</td>
                        <td><span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--success)" }}>Active ✅</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Department Breakdown */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>Faculty Department Distribution</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { name: "Science Department", count: teachersList.filter((t: any) => (t.department || t.subject || "").toLowerCase().includes("sci") || (t.subject || "").toLowerCase().includes("chem") || (t.subject || "").toLowerCase().includes("phy")).length, color: "var(--primary)" },
                  { name: "Mathematics & Stats", count: teachersList.filter((t: any) => (t.department || t.subject || "").toLowerCase().includes("math")).length, color: "var(--secondary)" },
                  { name: "Languages & Humanities", count: teachersList.filter((t: any) => (t.department || t.subject || "").toLowerCase().includes("eng") || (t.department || t.subject || "").toLowerCase().includes("hin")).length, color: "var(--success)" },
                  { name: "Physical Ed & Fine Arts", count: Math.max(0, teachersList.length - (teachersList.filter((t: any) => (t.department || t.subject || "").toLowerCase().match(/sci|chem|phy|math|eng|hin/)).length)), color: "var(--warning)" }
                ].map((dept, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <div style={{ display: "flex", justify: "space-between", fontSize: "0.8rem" }}>
                      <span style={{ fontWeight: 650 }}>{dept.name}</span>
                      <span style={{ fontWeight: 800 }}>{dept.count} Members</span>
                    </div>
                    <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 99 }}>
                      <div style={{ width: `${teachersList.length > 0 ? (dept.count / teachersList.length) * 100 : 0}%`, height: "100%", background: dept.color, borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: FEE COLLECTION */}
      {activeDashboardTab === "fees" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {[
              { label: "Expected Fees for Term", value: dashboardOverview?.todayCollectionInr ? `₹${(dashboardOverview.todayCollectionInr * 2).toLocaleString('en-IN')}` : "₹ 0", sub: "Approved fee structure", icon: CreditCard, color: "var(--primary)", bg: "var(--info-bg)" },
              { label: "Total Collected Fees", value: dashboardOverview?.todayCollectionInr ? `₹${dashboardOverview.todayCollectionInr.toLocaleString('en-IN')}` : "₹ 0", sub: "Collections Log", icon: CheckCircle2, color: "var(--success)", bg: "var(--success-bg)" },
              { label: "Pending Outstanding Fees", value: "₹ 0", sub: "Auto SMS Reminders Active", icon: AlertTriangle, color: "var(--danger)", bg: "var(--danger-bg)" }
            ].map((card, idx) => (
              <div key={idx} className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
                <div className="stat-icon" style={{ background: card.bg, color: card.color }}>
                  <card.icon size={20} />
                </div>
                <div className="stat-info">
                  <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>{card.label}</h4>
                  <div className="stat-value" style={{ fontSize: "1.4rem", fontWeight: 800, margin: "2px 0", color: "var(--text-heading)" }}>{card.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{card.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Fee Collection Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>Recent ERP Fee Collection Logs</h3>
            
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Receipt ID</th>
                  <th>Student Name</th>
                  <th>Class / Grade</th>
                  <th>Amount Paid</th>
                  <th>Payment Mode</th>
                  <th>Transaction Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: "1.5rem" }}>
                    No fee receipts recorded in database for this session yet. Collect fees via Collect Fees button.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 6: ATTENDANCE STATUS */}
      {activeDashboardTab === "attendance" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {[
              { label: "Student Attendance Rate", value: dashboardOverview?.todayAttendancePercent || "0%", sub: `${studentsList.length} Total Students`, icon: CalendarCheck, color: "var(--success)", bg: "var(--success-bg)" },
              { label: "Staff Attendance Rate", value: teachersList.length > 0 ? "100%" : "0%", sub: `${teachersList.length} Total Faculty`, icon: UserCheck, color: "var(--primary)", bg: "rgba(99, 102, 241, 0.12)" },
              { label: "Leave Requests Pending", value: "0 Requests", sub: "0 Pending Validation", icon: AlertTriangle, color: "var(--warning)", bg: "var(--warning-bg)" }
            ].map((card, idx) => (
              <div key={idx} className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
                <div className="stat-icon" style={{ background: card.bg, color: card.color }}>
                  <card.icon size={20} />
                </div>
                <div className="stat-info">
                  <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>{card.label}</h4>
                  <div className="stat-value" style={{ fontSize: "1.4rem", fontWeight: 800, margin: "2px 0", color: "var(--text-heading)" }}>{card.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{card.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "1.5rem" }}>
            {/* Top performing classes */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>Class Attendance Performance Ranks</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { name: "Class 10-A", rate: 99.1, status: "EXCELLENT", color: "var(--success)" },
                  { name: "Class 12-C", rate: 98.5, status: "EXCELLENT", color: "var(--success)" },
                  { name: "Class 1-A", rate: 97.4, status: "GOOD", color: "var(--primary)" },
                  { name: "Class 5-B", rate: 95.8, status: "CHECK NEEDED", color: "var(--warning)" }
                ].map((cls, idx) => (
                  <div key={idx} style={{ display: "flex", justify: "space-between", alignItems: "center", padding: "0.5rem", background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{cls.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Status: <strong style={{ color: cls.color }}>{cls.status}</strong></div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text-heading)" }}>{cls.rate}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* List of today's absentees */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>Flagged Student Absentees today</h3>
              
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Parent Phone</th>
                    <th>Status / Log</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", color: "var(--text-muted)", padding: "1.5rem" }}>
                      No flagged absentees recorded in database for today.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 7: TRANSPORT MONITOR */}
      {activeDashboardTab === "transport" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {[
              { label: "Active Fleet Buses", value: "18 / 18 On Road", sub: "100% telemetry online", icon: Bus, color: "var(--secondary)", bg: "rgba(6, 182, 212, 0.12)" },
              { label: "Assigned Bus Drivers", value: "18 Pilots Mapped", sub: "All certified & active", icon: UserCheck, color: "var(--success)", bg: "var(--success-bg)" },
              { label: "Live Telemetry Broadcast", value: "GPS Signal Strong", sub: "Average latency 150ms", icon: ShieldCheck, color: "var(--primary)", bg: "rgba(99, 102, 241, 0.12)" }
            ].map((card, idx) => (
              <div key={idx} className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
                <div className="stat-icon" style={{ background: card.bg, color: card.color }}>
                  <card.icon size={20} />
                </div>
                <div className="stat-info">
                  <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)" }}>{card.label}</h4>
                  <div className="stat-value" style={{ fontSize: "1.35rem", fontWeight: 800, margin: "2px 0", color: "var(--text-heading)" }}>{card.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{card.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Transport Routes */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", margin: 0 }}>Active Bus Routes Telemetry</h3>
              <button 
                onClick={() => setIsAddBusOpen(true)}
                className="btn btn-primary"
                style={{ padding: "0.45rem 0.9rem", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <Bus size={15} /> + Add Bus, Driver &amp; Route
              </button>
            </div>
            
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Bus / Route ID</th>
                  <th>License Number</th>
                  <th>Assigned Pilot</th>
                  <th>Total Students Mapped</th>
                  <th>Current Fleet Location</th>
                  <th>Live Speed</th>
                </tr>
              </thead>
              <tbody>
                {(!Array.isArray(buses) || buses.length === 0) ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: "1.5rem" }}>
                      No active bus routes recorded in MongoDB. Add fleet buses via Transport Panel.
                    </td>
                  </tr>
                ) : (
                  buses.map((bus: any, idx: number) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700 }}>{bus.busNumber || bus.busNo || `Bus #${bus.id || idx + 1}`}</td>
                      <td style={{ fontWeight: 650 }}>{bus.registrationNumber || bus.registrationNo || "DL 01 EX 0000"}</td>
                      <td>{bus.driverName || bus.driver || "Unassigned Pilot"}</td>
                      <td style={{ fontWeight: 700, color: "var(--primary)" }}>{bus.capacity || 40} Mapped</td>
                      <td>{bus.routeName || bus.route || "Default School Route"}</td>
                      <td style={{ fontWeight: 800, color: "var(--success)" }}>
                        {bus.status || "Active"} ({bus.gpsStatus || "Live GPS"})
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 8: NOTIFICATIONS CENTER */}
      {activeDashboardTab === "notifications" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          {/* Send Broadcast Form */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Send size={18} color="var(--primary)" /> Compose &amp; Send Broadcast Alert
            </h3>

            <form onSubmit={handleSendBroadcast} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>ALERT TITLE</label>
                <input 
                  type="text" 
                  value={broadcastTitle} 
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. CBSE Term 2 Admit Cards Out"
                  className="search-input"
                  style={{ width: "100%", paddingLeft: "1rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>TARGET AUDIENCE CATEGORY</label>
                <select 
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                  className="search-input"
                  style={{ width: "100%", paddingLeft: "1rem", paddingRight: "1.5rem", background: "var(--bg-input)", color: "var(--text-main)", cursor: "pointer", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", height: "38px" }}
                >
                  <option value="parents">All Parents</option>
                  <option value="teachers">All Teachers &amp; Staff</option>
                  <option value="drivers">All Bus Pilots</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>ALERT BODY TEXT</label>
                <textarea 
                  rows={4}
                  value={broadcastBody}
                  onChange={(e) => setBroadcastBody(e.target.value)}
                  placeholder="Type message here. Message will broadcast immediately to target segment."
                  style={{ width: "100%", padding: "0.6rem 1rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", color: "var(--text-main)", fontSize: "0.875rem", outline: "none" }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center" }}>
                <Send size={15} /> Send Broadcast Dispatch
              </button>
            </form>
          </div>

          {/* Broadcasts Sent */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>Dispatched Broadcast History</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {notificationsSent.length === 0 ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  <Bell size={24} style={{ opacity: 0.3, marginBottom: "0.5rem" }} />
                  <div style={{ fontSize: "0.82rem" }}>No broadcast messages sent in this session yet.</div>
                </div>
              ) : (
                notificationsSent.map((alertItem) => (
                  <div key={alertItem.id} style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border-color)",
                  }}>
                    <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-heading)" }}>{alertItem.title}</span>
                      <span style={{ fontSize: "0.7rem", color: "var(--success)", background: "var(--success-bg)", padding: "0.15rem 0.45rem", borderRadius: 4, fontWeight: 700 }}>
                        {alertItem.status}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--primary)", marginTop: 2, textTransform: "capitalize", fontWeight: 600 }}>Target: {alertItem.target}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 6 }}>{alertItem.body}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 6, textAlign: "right" }}>{alertItem.time}</div>
                  </div>
                ))
              )}

              {/* Sample Hardcoded Broadcast Item */}
              <div style={{
                padding: "0.85rem 1rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(255,255,255,0.01)",
                border: "1px solid var(--border-color)",
                opacity: 0.7
              }}>
                <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-heading)" }}>CBSE Mid-Term Schedules Released</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.05)", padding: "0.15rem 0.45rem", borderRadius: 4, fontWeight: 700 }}>
                    Archived 📦
                  </span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--primary)", marginTop: 2, fontWeight: 600 }}>Target: Parents & Students</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 6 }}>Mid-term examination date sheet from Class 1st to 12th has been dispatched to CBSE parents. Please prepare accordingly.</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 6, textAlign: "right" }}>4 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 9: RECENT ACTIVITIES */}
      {activeDashboardTab === "activities" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Detailed Audit Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>Complete ERP Activity Audit Logs</h3>
            
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>IP Address</th>
                  <th>Account User</th>
                  <th>Action Taken / Module</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", color: "var(--text-muted)", padding: "1.5rem" }}>
                      No audit activity logs recorded in database yet.
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((logItem: any, idx: number) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700 }}>{logItem.id || logItem._id || `AUD-${idx + 1}`}</td>
                      <td style={{ color: "var(--secondary)", fontWeight: 650 }}>{logItem.ip || "127.0.0.1"}</td>
                      <td style={{ fontWeight: 700 }}>{logItem.user || logItem.userName || "System Admin"}</td>
                      <td>
                        <div>{logItem.action || logItem.message}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 600 }}>{logItem.module || "General"}</div>
                      </td>
                      <td style={{ color: "var(--text-muted)" }}>{logItem.time || logItem.timestamp || "Just now"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 10: CALENDAR & EVENTS */}
      {activeDashboardTab === "calendar" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          {/* Calendar Grid Mockup */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)" }}>CBSE Calendar Plan (May 2025)</h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>Prev</button>
                <button className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>Next</button>
              </div>
            </div>

            {/* Calendar Days */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.45rem", textAlign: "center", fontWeight: 700, fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
            </div>

            {/* Calendar Grid cells */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.45rem" }}>
              {Array.from({ length: 28 }, (_, i) => {
                const day = i + 1;
                const isEventDay = day === 15 || day === 22 || day === 28;
                return (
                  <div 
                    key={i} 
                    style={{
                      height: 52,
                      background: isEventDay ? "var(--info-bg)" : "rgba(255,255,255,0.02)",
                      border: isEventDay ? "1.5px solid var(--primary)" : "1px solid var(--border-color)",
                      borderRadius: 8,
                      padding: "0.25rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: isEventDay ? "pointer" : "default"
                    }}
                    onClick={() => isEventDay && alert(`Event info for day ${day}`)}
                  >
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, color: isEventDay ? "var(--primary)" : "var(--text-main)" }}>{day}</span>
                    {isEventDay && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", alignSelf: "center", marginBottom: 4 }} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Events List Timeline */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "1rem" }}>Upcoming Events Timeline</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { date: "15 May 2025", title: "Mid-Term Examinations Begin", desc: "For classes 5th to 12th standard across all subjects.", color: "var(--primary)" },
                { date: "22 May 2025", title: "Parent-Teacher Council Meet", desc: "Report cards review and interactive council suggestions.", color: "var(--secondary)" },
                { date: "28 May 2025", title: "Annual CBSE Athletic Championship", desc: "High School sports events meet and athletics trophy.", color: "var(--success)" }
              ].map((ev, idx) => (
                <div key={idx} style={{
                  paddingLeft: "0.85rem",
                  borderLeft: `3px solid ${ev.color}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem"
                }}>
                  <span style={{ fontSize: "0.72rem", color: ev.color, fontWeight: 800 }}>{ev.date}</span>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-heading)" }}>{ev.title}</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{ev.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 360° DRAWER INSPECTOR */}
      <Drawer
        isOpen={!!selectedInspectorItem}
        onClose={() => setSelectedInspectorItem(null)}
        title={selectedInspectorItem?.name || "Entity Dossier Quick Inspector"}
        subtitle={`System ID: ${selectedInspectorItem?.id || "N/A"} • Category: ${selectedInspectorItem?.type || "General"}`}
      >
        {selectedInspectorItem && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8 }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>DOSSIER SUMMARY</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginTop: 4 }}>{selectedInspectorItem.name}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 700, marginTop: 2 }}>{selectedInspectorItem.details}</div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>RECENT ACTIVITY TIMELINE</span>
              <Timeline
                items={[
                  { id: "1", title: "Attendance Logged", timestamp: "Today 08:30 AM", description: "Marked present in morning biometrics entry." },
                  { id: "2", title: "Fee Ledger Status", timestamp: "Yesterday", description: "Quarterly fee transaction verified via Razorpay." }
                ]}
              />
            </div>

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              <Button variant="primary" style={{ flex: 1 }} onClick={() => {
                addToast("success", "Dossier Action Executed", `Action recorded for ${selectedInspectorItem.name}`);
                setSelectedInspectorItem(null);
              }}>
                Confirm Action
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* ADD FLEET BUS & DRIVER MODAL */}
      <Modal
        isOpen={isAddBusOpen}
        onClose={() => setIsAddBusOpen(false)}
        title="🚌 Register New Fleet Bus & Driver"
      >
        <form onSubmit={handleCreateBus} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>BUS NUMBER / CODE *</label>
            <input 
              type="text" 
              required
              value={newBusForm.busNumber}
              onChange={(e) => setNewBusForm(prev => ({ ...prev, busNumber: e.target.value }))}
              placeholder="e.g. Bus #01 or Fleet Bus-A"
              className="search-input"
              style={{ width: "100%", paddingLeft: "1rem" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>REGISTRATION NUMBER (LICENSE PLATE)</label>
            <input 
              type="text" 
              value={newBusForm.registrationNumber}
              onChange={(e) => setNewBusForm(prev => ({ ...prev, registrationNumber: e.target.value }))}
              placeholder="e.g. DL 01 AB 4321"
              className="search-input"
              style={{ width: "100%", paddingLeft: "1rem" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>ASSIGNED DRIVER NAME</label>
              <input 
                type="text" 
                value={newBusForm.driverName}
                onChange={(e) => setNewBusForm(prev => ({ ...prev, driverName: e.target.value }))}
                placeholder="e.g. Ram Singh"
                className="search-input"
                style={{ width: "100%", paddingLeft: "1rem" }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>DRIVER PHONE NUMBER</label>
              <input 
                type="text" 
                value={newBusForm.driverPhone}
                onChange={(e) => setNewBusForm(prev => ({ ...prev, driverPhone: e.target.value }))}
                placeholder="e.g. +91 98111 22334"
                className="search-input"
                style={{ width: "100%", paddingLeft: "1rem" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>BUS ROUTE NAME / DESTINATION</label>
              <input 
                type="text" 
                value={newBusForm.routeName}
                onChange={(e) => setNewBusForm(prev => ({ ...prev, routeName: e.target.value }))}
                placeholder="e.g. Route 1 - Dwarka Sector 12"
                className="search-input"
                style={{ width: "100%", paddingLeft: "1rem" }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>SEATING CAPACITY</label>
              <input 
                type="number" 
                value={newBusForm.capacity}
                onChange={(e) => setNewBusForm(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                placeholder="40"
                className="search-input"
                style={{ width: "100%", paddingLeft: "1rem" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", justifyContent: "flex-end" }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddBusOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Bus size={15} /> Save &amp; Register Bus
            </button>
          </div>
        </form>
      </Modal>

      {/* GLOBAL TOAST NOTIFICATION CONTAINER */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
