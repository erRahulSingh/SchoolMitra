"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, Shield, Bell, Globe, Database, Users, Lock, 
  Save, CheckCircle2, ClipboardList, ShieldAlert, Key, Download, RefreshCw, AlertTriangle,
  CreditCard, Cpu, Code, Activity, UserPlus, Trash2, Edit3, Eye, Smartphone, Zap, Check, X, Server
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "users" | "roles" | "integrations" | "audit" | "backup" | "security" | "saas" | "api" | "health"
  >("profile");
  const [saved, setSaved] = useState(false);

  // ── 1. School Profile State ──
  const [schoolProfile, setSchoolProfile] = useState({
    name: "Delhi Public School, New Delhi",
    affiliation: "CBSE-AFF-2730001",
    establishedYear: "1949",
    principal: "Dr. Ashok Kumar (Ph.D. Education)",
    email: "admin@dps.edu.in",
    phone: "+91 11 2617 7777",
    address: "Sector 12, RK Puram, New Delhi - 110022",
    session: "2026 - 2027",
    workingDays: "Monday to Saturday (Alternate)",
    brandTheme: "Classic Indigo & Cyan"
  });

  // ── 2. User Management State ──
  const [systemUsers, setSystemUsers] = useState([
    { id: "USR-001", name: "Dr. Ashok Kumar", email: "principal@dps.edu.in", role: "Principal", status: "Active", lastLogin: "Today, 10:45 AM" },
    { id: "USR-002", name: "Sunita Rao", email: "sunita.math@dps.edu.in", role: "Teacher", status: "Active", lastLogin: "Today, 09:12 AM" },
    { id: "USR-003", name: "Ramesh Sharma", email: "accounts@dps.edu.in", role: "Accountant", status: "Active", lastLogin: "Yesterday, 04:30 PM" },
    { id: "USR-004", name: "Kavita Verma", email: "library@dps.edu.in", role: "Librarian", status: "Active", lastLogin: "28 Jul 2026" },
    { id: "USR-005", name: "Suresh Gupta", email: "transport@dps.edu.in", role: "Transport Manager", status: "Active", lastLogin: "Today, 07:30 AM" }
  ]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Teacher" });
  const [editingUser, setEditingUser] = useState<{ id: string; name: string; email: string; role: string; status: string } | null>(null);

  // ── 3. Roles & Permissions RBAC Matrix State ──
  const rolesList = ["Principal", "Vice Principal", "Accountant", "Receptionist", "Librarian", "Teacher", "Transport Manager"];
  const permissionModules = [
    "Manage Students", "Modify Fees & Collect", "Track Transport GPS", 
    "Hire & Manage Staff", "Publish Exam Results", "Broadcast Notifications", 
    "View System Audit Logs", "Configure SaaS Settings"
  ];
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({
    "Principal": { "Manage Students": true, "Modify Fees & Collect": true, "Track Transport GPS": true, "Hire & Manage Staff": true, "Publish Exam Results": true, "Broadcast Notifications": true, "View System Audit Logs": true, "Configure SaaS Settings": true },
    "Vice Principal": { "Manage Students": true, "Modify Fees & Collect": false, "Track Transport GPS": true, "Hire & Manage Staff": true, "Publish Exam Results": true, "Broadcast Notifications": true, "View System Audit Logs": true, "Configure SaaS Settings": false },
    "Accountant": { "Manage Students": true, "Modify Fees & Collect": true, "Track Transport GPS": false, "Hire & Manage Staff": false, "Publish Exam Results": false, "Broadcast Notifications": false, "View System Audit Logs": false, "Configure SaaS Settings": false },
    "Receptionist": { "Manage Students": true, "Modify Fees & Collect": false, "Track Transport GPS": false, "Hire & Manage Staff": false, "Publish Exam Results": false, "Broadcast Notifications": true, "View System Audit Logs": false, "Configure SaaS Settings": false },
    "Librarian": { "Manage Students": true, "Modify Fees & Collect": false, "Track Transport GPS": false, "Hire & Manage Staff": false, "Publish Exam Results": false, "Broadcast Notifications": false, "View System Audit Logs": false, "Configure SaaS Settings": false },
    "Teacher": { "Manage Students": true, "Modify Fees & Collect": false, "Track Transport GPS": false, "Hire & Manage Staff": false, "Publish Exam Results": true, "Broadcast Notifications": true, "View System Audit Logs": false, "Configure SaaS Settings": false },
    "Transport Manager": { "Manage Students": false, "Modify Fees & Collect": false, "Track Transport GPS": true, "Hire & Manage Staff": false, "Publish Exam Results": false, "Broadcast Notifications": true, "View System Audit Logs": false, "Configure SaaS Settings": false }
  });

  const [rbacSaved, setRbacSaved] = useState(false);

  const [integrationsSaved, setIntegrationsSaved] = useState(false);
  const [auditSearch, setAuditSearch] = useState("");
  const [auditLogsList, setAuditLogsList] = useState([
    { id: "AUD-901", user: "Principal Office (admin@dps.edu.in)", action: "Published Unit Test 2 Results", module: "Exams & Results", ip: "192.168.1.42", timestamp: "29 July 2026, 01:15 AM" },
    { id: "AUD-902", user: "Ramesh Sharma (Accounts)", action: "Collected Fee ₹11,300 (Aarav Sharma)", module: "Fees Management", ip: "192.168.1.18", timestamp: "28 July 2026, 04:30 PM" },
    { id: "AUD-903", user: "Ram Singh (Bus Pilot)", action: "Started Morning Trip (Bus #01)", module: "Live Telemetry", ip: "10.0.4.12", timestamp: "28 July 2026, 07:15 AM" },
    { id: "AUD-904", user: "Sunita Rao (Teacher)", action: "Marked Class 10-A Attendance (38 Present)", module: "Daily Attendance", ip: "192.168.1.55", timestamp: "28 July 2026, 08:45 AM" },
    { id: "AUD-905", user: "Super Admin", action: "Updated RBAC permissions for Accountant role", module: "Settings & RBAC", ip: "182.73.91.4", timestamp: "27 July 2026, 11:20 AM" }
  ]);

  const [activeSessionsList, setActiveSessionsList] = useState([
    { id: "SES-001", device: "Chrome on macOS (MacBook Pro)", ip: "192.168.1.42", location: "New Delhi, IN", status: "ACTIVE (Current Session)" },
    { id: "SES-002", device: "Driver Mobile App (Android 14)", ip: "10.0.4.12", location: "New Delhi, IN", status: "ACTIVE" },
    { id: "SES-003", device: "Parent Mobile App (iOS 17)", ip: "49.36.12.80", location: "New Delhi, IN", status: "ACTIVE" }
  ]);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Load cached settings from localStorage & API on mount
  useEffect(() => {
    try {
      const cachedProfile = localStorage.getItem("sm_school_profile");
      if (cachedProfile) {
        setSchoolProfile(JSON.parse(cachedProfile));
      }
      const cachedIntegrations = localStorage.getItem("sm_integrations");
      if (cachedIntegrations) {
        setIntegrations(JSON.parse(cachedIntegrations));
      }
      const cachedUsers = localStorage.getItem("sm_system_users");
      if (cachedUsers) {
        setSystemUsers(JSON.parse(cachedUsers));
      }
      const cachedPermissions = localStorage.getItem("sm_permissions");
      if (cachedPermissions) {
        setPermissions(JSON.parse(cachedPermissions));
      }
      const cachedBackups = localStorage.getItem("sm_backups");
      if (cachedBackups) {
        setBackups(JSON.parse(cachedBackups));
      }
      const cachedSessions = localStorage.getItem("sm_sessions");
      if (cachedSessions) {
        setActiveSessionsList(JSON.parse(cachedSessions));
      }

      // Fetch RBAC Matrix from Backend API
      fetch("http://localhost:5000/api/v1/admin/rbac")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.permissions) {
            setPermissions(prev => ({ ...prev, ...data.permissions }));
          }
        })
        .catch(() => {});

      // Fetch Integrations Gateway from Backend API
      fetch("http://localhost:5000/api/v1/admin/integrations")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.integrations) {
            setIntegrations(prev => ({ ...prev, ...data.integrations }));
          }
        })
        .catch(() => {});

      // Fetch Audit Logs from Backend API
      fetch("http://localhost:5000/api/v1/admin/audit-logs")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.logs && data.logs.length > 0) {
            setAuditLogsList(data.logs);
          }
        })
        .catch(() => {});

      // Fetch Backups from Backend API
      fetch("http://localhost:5000/api/v1/admin/backups")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.backups && data.backups.length > 0) {
            setBackups(data.backups);
          }
        })
        .catch(() => {});

      // Fetch Sessions from Backend API
      fetch("http://localhost:5000/api/v1/admin/sessions")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.sessions && data.sessions.length > 0) {
            setActiveSessionsList(data.sessions);
          }
        })
        .catch(() => {});

      // Fetch Developer API Keys from Backend API
      fetch("http://localhost:5000/api/v1/admin/api-keys")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.apiKeys && data.apiKeys.length > 0) {
            setApiKeys(data.apiKeys);
          }
        })
        .catch(() => {});
    } catch (err) {
      console.error("Failed to load cached settings:", err);
    }
  }, []);

  const handleTerminateSession = async (id: string) => {
    const updated = activeSessionsList.filter(s => s.id !== id);
    setActiveSessionsList(updated);
    try {
      localStorage.setItem("sm_sessions", JSON.stringify(updated));
      fetch(`http://localhost:5000/api/v1/admin/sessions/${id}`, { method: "DELETE" }).catch(() => {});
    } catch (e) {}
  };

  const handleSaveRbac = async () => {
    try {
      localStorage.setItem("sm_permissions", JSON.stringify(permissions));
      await fetch("http://localhost:5000/api/v1/admin/rbac", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions })
      }).catch(() => {});
    } catch (e) {}

    setRbacSaved(true);
    setTimeout(() => setRbacSaved(false), 2500);
  };

  const handleSaveIntegrations = async () => {
    try {
      localStorage.setItem("sm_integrations", JSON.stringify(integrations));
      await fetch("http://localhost:5000/api/v1/admin/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ integrations })
      }).catch(() => {});
    } catch (e) {}

    setIntegrationsSaved(true);
    setTimeout(() => setIntegrationsSaved(false), 2500);
  };

  const togglePermission = (role: string, perm: string) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role]?.[perm]
      }
    }));
  };

  // ── 4. Integrations State ──
  const [integrations, setIntegrations] = useState({
    firebaseKey: "AIzaSyD-mockFirebaseKey99812",
    googleMapsKey: "AIzaSyB-mockGoogleMapsKey44512",
    razorpayKeyId: "rzp_live_8819231920",
    razorpaySecret: "••••••••••••••••",
    smtpHost: "smtp.sendgrid.net",
    smtpPort: "587",
    smsGatewaySenderId: "DPSDELHI"
  });

  // ── 6. Backups State ──
  const [backups, setBackups] = useState([
    { id: "BAK-20260731", size: "48.2 MB", type: "Automated Daily Cloud Backup", timestamp: "31 July 2026, 03:00 AM", status: "SUCCESS" },
    { id: "BAK-20260730", size: "47.8 MB", type: "Automated Daily Cloud Backup", timestamp: "30 July 2026, 03:00 AM", status: "SUCCESS" },
    { id: "BAK-20260729", size: "47.5 MB", type: "Manual Admin Snapshot", timestamp: "29 July 2026, 06:12 PM", status: "SUCCESS" }
  ]);

  // ── 7. Security & Login History State ──
  const [sessions] = useState([
    { device: "Chrome on macOS (MacBook Pro)", ip: "192.168.1.42", location: "New Delhi, IN", status: "ACTIVE (Current Session)" },
    { device: "Driver Mobile App (Android 14)", ip: "10.0.4.12", location: "New Delhi, IN", status: "ACTIVE" },
    { device: "Parent Mobile App (iOS 17)", ip: "49.36.12.80", location: "New Delhi, IN", status: "ACTIVE" }
  ]);

  // ── 8. SaaS Billing & Subscriptions State ──
  const [subscription] = useState({
    plan: "Enterprise SaaS Tier 3",
    status: "ACTIVE",
    billingCycle: "Annual",
    studentLimit: 2000,
    studentsUsed: 1420,
    storageLimit: "50 GB",
    storageUsed: "12.4 GB",
    renewalDate: "15 January 2027",
    monthlyAmount: "₹ 45,000 / month"
  });

  // ── 9. API Management & Webhooks State ──
  const [apiKeys, setApiKeys] = useState([
    { id: "KEY-01", name: "Parent Mobile App Client Key", key: "sk_live_schoolmitra_parent_8819231029", status: "ACTIVE", created: "15 Jan 2026" },
    { id: "KEY-02", name: "Driver GPS Telemetry Key", key: "sk_live_schoolmitra_driver_4412093123", status: "ACTIVE", created: "15 Jan 2026" }
  ]);

  const handleSave = () => {
    try {
      localStorage.setItem("sm_school_profile", JSON.stringify(schoolProfile));
      localStorage.setItem("sm_integrations", JSON.stringify(integrations));
      localStorage.setItem("sm_system_users", JSON.stringify(systemUsers));
      localStorage.setItem("sm_permissions", JSON.stringify(permissions));
    } catch (err) {
      console.error("Failed to persist settings:", err);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    
    const uId = `USR-${String(systemUsers.length + 1).padStart(3, "0")}`;
    const userObj = {
      id: uId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      lastLogin: "Just Now"
    };

    const updated = [userObj, ...systemUsers];
    setSystemUsers(updated);
    try {
      localStorage.setItem("sm_system_users", JSON.stringify(updated));
      fetch("http://localhost:5000/api/v1/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj)
      }).catch(() => {});
    } catch (e) {}

    setIsAddUserOpen(false);
    setNewUser({ name: "", email: "", role: "Teacher" });
  };

  const handleUpdateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const updated = systemUsers.map(u => u.id === editingUser.id ? { ...u, ...editingUser } : u);
    setSystemUsers(updated);
    try {
      localStorage.setItem("sm_system_users", JSON.stringify(updated));
      fetch(`http://localhost:5000/api/v1/admin/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser)
      }).catch(() => {});
    } catch (e) {}

    setEditingUser(null);
  };

  const handleDeleteUser = async (id: string) => {
    const updated = systemUsers.filter(usr => usr.id !== id);
    setSystemUsers(updated);
    try {
      localStorage.setItem("sm_system_users", JSON.stringify(updated));
      fetch(`http://localhost:5000/api/v1/admin/users/${id}`, {
        method: "DELETE"
      }).catch(() => {});
    } catch (e) {}
  };

  const handleCreateBackup = async () => {
    const newBak = {
      id: `BAK-${new Date().toISOString().slice(0,10).replace(/-/g,"")}`,
      size: "48.6 MB",
      type: "Manual Admin Snapshot",
      timestamp: "Just Now",
      status: "SUCCESS"
    };

    const updated = [newBak, ...backups];
    setBackups(updated);
    try {
      localStorage.setItem("sm_backups", JSON.stringify(updated));
      fetch("http://localhost:5000/api/v1/admin/backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backup: newBak })
      }).catch(() => {});
    } catch (e) {}
    alert("New encrypted database snapshot created and pushed to cloud vault!");
  };

  const handleGenerateApiKey = async () => {
    const newK = {
      id: `KEY-${String(apiKeys.length + 1).padStart(2, "0")}`,
      name: "Custom Integration Key",
      key: `sk_live_sm_${Math.random().toString(36).substring(2, 15)}`,
      status: "ACTIVE",
      created: "Just Now"
    };
    const updated = [newK, ...apiKeys];
    setApiKeys(updated);
    try {
      localStorage.setItem("sm_api_keys", JSON.stringify(updated));
      fetch("http://localhost:5000/api/v1/admin/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: newK })
      }).catch(() => {});
    } catch (e) {}
    alert("New Developer API Key generated successfully!");
  };

  const handleRevokeApiKey = async (id: string) => {
    const updated = apiKeys.filter(k => k.id !== id);
    setApiKeys(updated);
    try {
      localStorage.setItem("sm_api_keys", JSON.stringify(updated));
      fetch(`http://localhost:5000/api/v1/admin/api-keys/${id}`, { method: "DELETE" }).catch(() => {});
    } catch (e) {}
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            System Administration &amp; SaaS Settings <Settings size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Multi-tenant SaaS governance: institution profile, RBAC permissions matrix, API integrations, audit trails, and subscription management.
          </p>
        </div>

        <button onClick={handleSave} className="btn btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
          {saved ? <><CheckCircle2 size={16} /> Changes Saved!</> : <><Save size={16} /> Save Admin Settings</>}
        </button>
      </div>

      {/* ════════════ 10 TABS SWITCHER CONSOLE ════════════ */}
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
          { id: "profile", label: "School Profile", icon: Globe },
          { id: "users", label: "User Management", icon: Users },
          { id: "roles", label: "Roles & RBAC", icon: Key },
          { id: "integrations", label: "Integrations Gateway", icon: Zap },
          { id: "audit", label: "Audit Logs", icon: ClipboardList },
          { id: "backup", label: "Backup & Safety", icon: Database },
          { id: "security", label: "Security & Sessions", icon: Shield },
          { id: "saas", label: "SaaS & Subscription", icon: CreditCard },
          { id: "api", label: "API & Webhooks", icon: Code },
          { id: "health", label: "System Health", icon: Server }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* ════════════ TAB VIEWS ════════════ */}

      {/* MODULE 1: SCHOOL PROFILE & BRANDING */}
      {activeTab === "profile" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>School Institution Identity</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SCHOOL OFFICIAL NAME</label>
                <input 
                  type="text" 
                  value={schoolProfile.name}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, name: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CBSE AFFILIATION CODE</label>
                  <input 
                    type="text" 
                    value={schoolProfile.affiliation}
                    onChange={(e) => setSchoolProfile({ ...schoolProfile, affiliation: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ESTABLISHED YEAR</label>
                  <input 
                    type="text" 
                    value={schoolProfile.establishedYear}
                    onChange={(e) => setSchoolProfile({ ...schoolProfile, establishedYear: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>OFFICIATING PRINCIPAL</label>
                <input 
                  type="text" 
                  value={schoolProfile.principal}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, principal: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>OFFICIAL EMAIL</label>
                  <input 
                    type="email" 
                    value={schoolProfile.email}
                    onChange={(e) => setSchoolProfile({ ...schoolProfile, email: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TELEPHONE</label>
                  <input 
                    type="text" 
                    value={schoolProfile.phone}
                    onChange={(e) => setSchoolProfile({ ...schoolProfile, phone: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1.25rem" }}>Academic Session &amp; Branding</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ACTIVE ACADEMIC SESSION</label>
                <select 
                  value={schoolProfile.session}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, session: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                >
                  <option value="2026 - 2027">2026 - 2027 Session</option>
                  <option value="2025 - 2026">2025 - 2026 Session</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>WORKING DAYS POLICY</label>
                <input 
                  type="text" 
                  value={schoolProfile.workingDays}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, workingDays: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BRAND COLOR THEME</label>
                <select 
                  value={schoolProfile.brandTheme}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, brandTheme: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.85rem" }}
                >
                  <option value="Classic Indigo & Cyan">Classic Indigo &amp; Cyan</option>
                  <option value="Emerald Green">Emerald Green</option>
                  <option value="Royal Violet">Royal Violet</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: USER MANAGEMENT */}
      {activeTab === "users" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>System Administrators &amp; Staff Users</h3>
              <button 
                onClick={() => setIsAddUserOpen(true)} 
                className="btn btn-primary" 
                style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <UserPlus size={16} /> Add System User
              </button>
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
              {systemUsers.length} Active System Accounts
            </span>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email Address</th>
                <th>System Role</th>
                <th>Last Login</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {systemUsers.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 700, color: "var(--text-heading)" }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className="badge badge-info">{u.role}</span></td>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{u.lastLogin}</td>
                  <td>
                    <span className={`badge ${u.status === "Inactive" ? "badge-danger" : "badge-success"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => setEditingUser(u)}
                      className="btn btn-secondary" 
                      style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", marginRight: "0.4rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button 
                      onClick={() => alert(`Password reset link sent to ${u.email}`)}
                      className="btn btn-secondary" 
                      style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem", marginRight: "0.4rem" }}
                    >
                      Reset Password
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(u.id)}
                      style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "0.3rem 0.5rem", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.72rem" }}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 3: ROLES & RBAC MATRIX */}
      {activeTab === "roles" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Role-Based Access Control (RBAC) Matrix</h3>
            <button 
              onClick={handleSaveRbac} 
              className="btn btn-primary" 
              style={{ padding: "0.55rem 1.1rem", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
            >
              {rbacSaved ? <><CheckCircle2 size={16} /> Matrix Saved!</> : <><Save size={16} /> Save RBAC Matrix</>}
            </button>
          </div>
          
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Permission Module Scope</th>
                  {rolesList.map(r => <th key={r} style={{ textAlign: "center", fontSize: "0.75rem" }}>{r}</th>)}
                </tr>
              </thead>
              <tbody>
                {permissionModules.map(perm => (
                  <tr key={perm}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{perm}</td>
                    {rolesList.map(role => {
                      const isAllowed = !!permissions[role]?.[perm];
                      return (
                        <td key={role} style={{ textAlign: "center" }}>
                          <input 
                            type="checkbox"
                            checked={isAllowed}
                            onChange={() => togglePermission(role, perm)}
                            style={{ cursor: "pointer", width: 16, height: 16 }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 4: INTEGRATIONS GATEWAY */}
      {activeTab === "integrations" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Third-Party API Credentials &amp; Gateways</h3>
            <button 
              onClick={handleSaveIntegrations} 
              className="btn btn-primary" 
              style={{ padding: "0.55rem 1.1rem", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
            >
              {integrationsSaved ? <><CheckCircle2 size={16} /> Integrations Saved!</> : <><Save size={16} /> Save Integrations</>}
            </button>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-heading)" }}>Razorpay Payment Gateway</h4>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>RAZORPAY KEY ID</label>
                <input 
                  type="text" 
                  value={integrations.razorpayKeyId}
                  onChange={(e) => setIntegrations({ ...integrations, razorpayKeyId: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>

              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-heading)", marginTop: "0.5rem" }}>Firebase Push Notifications</h4>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>FCM SERVER KEY</label>
                <input 
                  type="text" 
                  value={integrations.firebaseKey}
                  onChange={(e) => setIntegrations({ ...integrations, firebaseKey: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-heading)" }}>Google Maps Telemetry API</h4>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>MAPS JAVASCRIPT API KEY</label>
                <input 
                  type="text" 
                  value={integrations.googleMapsKey}
                  onChange={(e) => setIntegrations({ ...integrations, googleMapsKey: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>

              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-heading)", marginTop: "0.5rem" }}>SMS Gateway Settings</h4>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>DLT SENDER ID</label>
                <input 
                  type="text" 
                  value={integrations.smsGatewaySenderId}
                  onChange={(e) => setIntegrations({ ...integrations, smsGatewaySenderId: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: AUDIT LOGS CENTER */}
      {activeTab === "audit" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Security &amp; Administrative Audit Trail</h3>
            
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input 
                type="text" 
                placeholder="Filter logs by user, action..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                style={{ padding: "0.45rem 0.8rem", borderRadius: 8, background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "0.82rem", width: 220 }}
              />
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 700 }}>
                {auditLogsList.filter(l => !auditSearch || l.user.toLowerCase().includes(auditSearch.toLowerCase()) || l.action.toLowerCase().includes(auditSearch.toLowerCase())).length} Logs
              </span>
            </div>
          </div>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap" }}>Audit ID</th>
                <th>Authenticated User</th>
                <th>Executed Action</th>
                <th style={{ whiteSpace: "nowrap" }}>Module Scope</th>
                <th style={{ whiteSpace: "nowrap" }}>Client IP</th>
                <th style={{ whiteSpace: "nowrap" }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditLogsList
                .filter(log => !auditSearch || log.user.toLowerCase().includes(auditSearch.toLowerCase()) || log.action.toLowerCase().includes(auditSearch.toLowerCase()) || log.module.toLowerCase().includes(auditSearch.toLowerCase()))
                .map((log) => (
                <tr key={log.id}>
                  <td style={{ fontWeight: 700, whiteSpace: "nowrap", color: "var(--primary)" }}>{log.id}</td>
                  <td style={{ color: "var(--text-heading)", fontWeight: 700 }}>{log.user}</td>
                  <td>{log.action}</td>
                  <td><span className="badge badge-info" style={{ whiteSpace: "nowrap" }}>{log.module}</span></td>
                  <td><code style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>{log.ip}</code></td>
                  <td style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 6: BACKUP & SAFETY */}
      {activeTab === "backup" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Database Backups &amp; Disaster Recovery</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2, margin: 0 }}>Automated daily snapshots stored in encrypted S3 vaults.</p>
            </div>

            <button onClick={handleCreateBackup} className="btn btn-primary" style={{ padding: "0.55rem 1.1rem", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
              <Database size={16} /> Create Backup Now
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap" }}>Backup ID</th>
                <th>Snapshot Type</th>
                <th style={{ whiteSpace: "nowrap" }}>File Size</th>
                <th style={{ whiteSpace: "nowrap" }}>Creation Date</th>
                <th style={{ whiteSpace: "nowrap" }}>Vault Status</th>
                <th style={{ textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((bak) => (
                <tr key={bak.id}>
                  <td style={{ fontWeight: 700, whiteSpace: "nowrap", color: "var(--primary)" }}>{bak.id}</td>
                  <td style={{ color: "var(--text-heading)", fontWeight: 700 }}>{bak.type}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{bak.size}</td>
                  <td style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{bak.timestamp}</td>
                  <td><span className="badge badge-success" style={{ whiteSpace: "nowrap" }}>ENCRYPTED ✅</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => alert(`Initiating database restoration from snapshot ${bak.id}...`)} className="btn btn-secondary" style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem" }}>
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 7: SECURITY & SESSIONS */}
      {activeTab === "security" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Active Authenticated Sessions</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
              {activeSessionsList.length} Active Connected Devices
            </span>
          </div>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Client Device / Browser</th>
                <th style={{ whiteSpace: "nowrap" }}>IP Address</th>
                <th>Location</th>
                <th style={{ whiteSpace: "nowrap" }}>Session State</th>
                <th style={{ textAlign: "right", whiteSpace: "nowrap" }}>Revoke</th>
              </tr>
            </thead>
            <tbody>
              {activeSessionsList.map((ses) => (
                <tr key={ses.id}>
                  <td style={{ fontWeight: 700, color: "var(--text-heading)" }}>{ses.device}</td>
                  <td><code style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>{ses.ip}</code></td>
                  <td>{ses.location}</td>
                  <td>
                    <span className="badge badge-success" style={{ whiteSpace: "nowrap" }}>
                      {ses.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => handleTerminateSession(ses.id)} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                      Terminate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 8: SAAS SUBSCRIPTION & BILLING */}
      {activeTab === "saas" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>SchoolMitra SaaS Plan Details</h3>
              <button 
                onClick={() => alert("Redirecting to Razorpay SaaS Plan Upgrade Portal...")} 
                className="btn btn-primary" 
                style={{ padding: "0.45rem 0.9rem", fontSize: "0.8rem" }}
              >
                Upgrade Plan
              </button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700 }}>CURRENT PLAN</span>
                  <div style={{ fontSize: "1.35rem", fontWeight: 850, color: "var(--text-heading)" }}>{subscription.plan}</div>
                </div>
                <span className="badge badge-success">{subscription.status}</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", background: "var(--bg-input)", padding: "1rem", borderRadius: 8, border: "1px solid var(--border-color)" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700 }}>STUDENT QUOTA</span>
                  <div style={{ fontWeight: 800, color: "var(--primary)", marginTop: 2 }}>{subscription.studentsUsed} / {subscription.studentLimit}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700 }}>STORAGE QUOTA</span>
                  <div style={{ fontWeight: 800, color: "var(--primary)", marginTop: 2 }}>{subscription.storageUsed} / {subscription.storageLimit}</div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700 }}>RENEWAL DATE</span>
                <div style={{ fontWeight: 700, color: "var(--text-heading)", marginTop: 2 }}>{subscription.renewalDate} ({subscription.monthlyAmount})</div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1.25rem" }}>SaaS Invoices</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { id: "INV-2026-01", date: "15 Jan 2026", amount: "₹ 5,40,000", status: "PAID" }
              ].map(inv => (
                <div key={inv.id} style={{ padding: "0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, display: "flex", justify: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-heading)" }}>{inv.id}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{inv.date} &bull; {inv.amount}</div>
                  </div>
                  <button onClick={() => alert("Downloading SaaS Tax Invoice PDF...")} className="btn btn-secondary" style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem" }}>
                    GST Invoice
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 9: API MANAGEMENT & WEBHOOKS */}
      {activeTab === "api" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Developer API Keys &amp; Webhooks</h3>
              <button 
                onClick={handleGenerateApiKey} 
                className="btn btn-primary" 
                style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <Code size={16} /> Generate API Key
              </button>
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
              {apiKeys.length} Active API Keys
            </span>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap" }}>Key Identifier</th>
                <th>API Key Secret</th>
                <th style={{ whiteSpace: "nowrap" }}>Created Date</th>
                <th style={{ whiteSpace: "nowrap" }}>Status</th>
                <th style={{ textAlign: "right", whiteSpace: "nowrap" }}>Revoke</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((k) => (
                <tr key={k.id}>
                  <td style={{ fontWeight: 700, color: "var(--text-heading)", whiteSpace: "nowrap" }}>{k.name}</td>
                  <td><code style={{ fontSize: "0.8rem" }}>{k.key}</code></td>
                  <td style={{ whiteSpace: "nowrap" }}>{k.created}</td>
                  <td><span className="badge badge-success" style={{ whiteSpace: "nowrap" }}>{k.status}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => handleRevokeApiKey(k.id)} 
                      style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "0.3rem 0.55rem", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.72rem" }}
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 10: SYSTEM HEALTH & STATUS */}
      {activeTab === "health" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
          {[
            { label: "MONGODB ATLAS DB PING", val: "14 ms", status: "Optimal", color: "var(--success)" },
            { label: "SOCKET.IO LIVE TELEMETRY", val: "Active (24 Connections)", status: "Optimal", color: "var(--primary)" },
            { label: "S3 STORAGE USAGE", val: "12.4 GB / 50 GB", status: "Healthy", color: "var(--success)" },
            { label: "NODE.JS WORKER MEMORY", val: "142 MB", status: "Healthy", color: "var(--success)" }
          ].map((h, idx) => (
            <div key={idx} className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{h.label}</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 850, color: h.color, marginTop: 4 }}>{h.val}</div>
              <span className="badge badge-success" style={{ fontSize: "0.65rem", marginTop: 6, display: "inline-block" }}>{h.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ QUICK ADD USER MODAL ════════════ */}
      {isAddUserOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: 420, borderRadius: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Add System User</h3>
              <button onClick={() => setIsAddUserOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddUserSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FULL NAME</label>
                <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="e.g. Ramesh Sharma" required style={{ width: "100%", padding: "0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EMAIL ADDRESS</label>
                <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="e.g. ramesh@dps.edu.in" required style={{ width: "100%", padding: "0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SYSTEM ROLE</label>
                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} style={{ width: "100%", padding: "0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)" }}>
                  {rolesList.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.7rem", justifyContent: "center", marginTop: "0.5rem" }}>Create User &amp; Send Invite</button>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ EDIT SYSTEM USER MODAL ════════════ */}
      {editingUser && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: 420, borderRadius: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Edit System User</h3>
              <button onClick={() => setEditingUser(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleUpdateUserSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FULL NAME</label>
                <input type="text" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} required style={{ width: "100%", padding: "0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EMAIL ADDRESS</label>
                <input type="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} required style={{ width: "100%", padding: "0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SYSTEM ROLE</label>
                  <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} style={{ width: "100%", padding: "0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)" }}>
                    {rolesList.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STATUS</label>
                  <select value={editingUser.status} onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })} style={{ width: "100%", padding: "0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)" }}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.7rem", justifyContent: "center", marginTop: "0.5rem" }}>Save User Changes</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
