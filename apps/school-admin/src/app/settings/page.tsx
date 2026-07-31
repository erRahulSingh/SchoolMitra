"use client";

import React, { useState } from "react";
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

  // ── 5. Audit Logs State ──
  const [auditLogs] = useState([
    { id: "AUD-901", user: "Principal Office (admin@dps.edu.in)", action: "Published Unit Test 2 Results", module: "Exams & Results", ip: "192.168.1.42", timestamp: "29 July 2026, 01:15 AM" },
    { id: "AUD-902", user: "Ramesh Sharma (Accounts)", action: "Collected Fee ₹11,300 (Aarav Sharma)", module: "Fees Management", ip: "192.168.1.18", timestamp: "28 July 2026, 04:30 PM" },
    { id: "AUD-903", user: "Ram Singh (Bus Pilot)", action: "Started Morning Trip (Bus #01)", module: "Live Telemetry", ip: "10.0.4.12", timestamp: "28 July 2026, 07:15 AM" },
    { id: "AUD-904", user: "Sunita Rao (Teacher)", action: "Marked Class 10-A Attendance (38 Present)", module: "Daily Attendance", ip: "192.168.1.55", timestamp: "28 July 2026, 08:45 AM" },
    { id: "AUD-905", user: "Super Admin", action: "Updated RBAC permissions for Accountant role", module: "Settings & RBAC", ip: "182.73.91.4", timestamp: "27 July 2026, 11:20 AM" }
  ]);

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
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setSystemUsers([...systemUsers, {
      id: `USR-${String(systemUsers.length + 1).padStart(3, "0")}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      lastLogin: "Never"
    }]);
    setIsAddUserOpen(false);
    setNewUser({ name: "", email: "", role: "Teacher" });
    alert("New system user created and invite email sent!");
  };

  const handleCreateBackup = () => {
    const newBak = {
      id: `BAK-${new Date().toISOString().slice(0,10).replace(/-/g,"")}`,
      size: "48.6 MB",
      type: "Manual Admin Snapshot",
      timestamp: "Just Now",
      status: "SUCCESS"
    };
    setBackups([newBak, ...backups]);
    alert("System backup snapshot created successfully!");
  };

  const handleGenerateApiKey = () => {
    const newK = {
      id: `KEY-${String(apiKeys.length + 1).padStart(2, "0")}`,
      name: "Custom Integration Key",
      key: `sk_live_sm_${Math.random().toString(36).substring(2, 15)}`,
      status: "ACTIVE",
      created: "Just Now"
    };
    setApiKeys([...apiKeys, newK]);
    alert("New API Key generated successfully!");
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
                  <option value="2026 - 2027" style={{ background: "#0b0f19" }}>2026 - 2027 Session</option>
                  <option value="2025 - 2026" style={{ background: "#0b0f19" }}>2025 - 2026 Session</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>WORKING DAYS POLICY</label>
                <input 
                  type="text" 
                  value={schoolProfile.workingDays}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, workingDays: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BRAND COLOR THEME</label>
                <select 
                  value={schoolProfile.brandTheme}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, brandTheme: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                >
                  <option value="Classic Indigo & Cyan" style={{ background: "#0b0f19" }}>Classic Indigo &amp; Cyan</option>
                  <option value="Emerald Green" style={{ background: "#0b0f19" }}>Emerald Green</option>
                  <option value="Royal Violet" style={{ background: "#0b0f19" }}>Royal Violet</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: USER MANAGEMENT */}
      {activeTab === "users" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>System Administrators &amp; Staff Users</h3>
            <button onClick={() => setIsAddUserOpen(true)} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
              <UserPlus size={16} /> Add System User
            </button>
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
                  <td style={{ fontWeight: 700, color: "#fff" }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className="badge badge-info">{u.role}</span></td>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{u.lastLogin}</td>
                  <td><span className="badge badge-success">{u.status}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => alert(`Password reset link sent to ${u.email}`)}
                      className="btn btn-secondary" 
                      style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem", marginRight: "0.4rem" }}
                    >
                      Reset Password
                    </button>
                    <button 
                      onClick={() => setSystemUsers(systemUsers.filter(usr => usr.id !== u.id))}
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
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Role-Based Access Control (RBAC) Matrix</h3>
          
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
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Third-Party API Credentials &amp; Gateways</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>Razorpay Payment Gateway</h4>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>RAZORPAY KEY ID</label>
                <input 
                  type="text" 
                  value={integrations.razorpayKeyId}
                  onChange={(e) => setIntegrations({ ...integrations, razorpayKeyId: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: "0.5rem" }}>Firebase Push Notifications</h4>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>FCM SERVER KEY</label>
                <input 
                  type="text" 
                  value={integrations.firebaseKey}
                  onChange={(e) => setIntegrations({ ...integrations, firebaseKey: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>Google Maps Telemetry API</h4>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>MAPS JAVASCRIPT API KEY</label>
                <input 
                  type="text" 
                  value={integrations.googleMapsKey}
                  onChange={(e) => setIntegrations({ ...integrations, googleMapsKey: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: "0.5rem" }}>SMS Gateway Settings</h4>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>DLT SENDER ID</label>
                <input 
                  type="text" 
                  value={integrations.smsGatewaySenderId}
                  onChange={(e) => setIntegrations({ ...integrations, smsGatewaySenderId: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: AUDIT LOGS CENTER */}
      {activeTab === "audit" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Security &amp; Administrative Audit Trail</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Audit ID</th>
                <th>Authenticated User</th>
                <th>Executed Action</th>
                <th>Module Scope</th>
                <th>Client IP</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontWeight: 700 }}>{log.id}</td>
                  <td style={{ color: "#fff", fontWeight: 700 }}>{log.user}</td>
                  <td>{log.action}</td>
                  <td><span className="badge badge-info">{log.module}</span></td>
                  <td><code style={{ fontSize: "0.8rem" }}>{log.ip}</code></td>
                  <td style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 6: BACKUP & SAFETY */}
      {activeTab === "backup" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Database Backups &amp; Disaster Recovery</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Automated daily snapshots stored in encrypted S3 vaults.</p>
            </div>

            <button onClick={handleCreateBackup} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
              <Database size={16} /> Create Backup Now
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Backup ID</th>
                <th>Snapshot Type</th>
                <th>File Size</th>
                <th>Creation Date</th>
                <th>Vault Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((bak) => (
                <tr key={bak.id}>
                  <td style={{ fontWeight: 700 }}>{bak.id}</td>
                  <td style={{ color: "#fff", fontWeight: 700 }}>{bak.type}</td>
                  <td>{bak.size}</td>
                  <td style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{bak.timestamp}</td>
                  <td><span className="badge badge-success">ENCRYPTED ✅</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => alert(`Initiating database restoration from ${bak.id}...`)} className="btn btn-secondary" style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem" }}>
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
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Active Authenticated Sessions</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Client Device / Browser</th>
                <th>IP Address</th>
                <th>Location</th>
                <th>Session State</th>
                <th style={{ textAlign: "right" }}>Revoke</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((ses, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{ses.device}</td>
                  <td><code>{ses.ip}</code></td>
                  <td>{ses.location}</td>
                  <td><span className="badge badge-success">{ses.status}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => alert("Session revoked.")} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem", color: "#ef4444" }}>
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
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>SchoolMitra SaaS Plan Details</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>CURRENT PLAN</span>
                  <div style={{ fontSize: "1.35rem", fontWeight: 850, color: "#fff" }}>{subscription.plan}</div>
                </div>
                <span className="badge badge-success">{subscription.status}</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", background: "rgba(255,255,255,0.01)", padding: "1rem", borderRadius: 8, border: "1px solid var(--border-color)" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>STUDENT QUOTA</span>
                  <div style={{ fontWeight: 800, color: "var(--primary)", marginTop: 2 }}>{subscription.studentsUsed} / {subscription.studentLimit}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>STORAGE QUOTA</span>
                  <div style={{ fontWeight: 800, color: "var(--primary)", marginTop: 2 }}>{subscription.storageUsed} / {subscription.storageLimit}</div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>RENEWAL DATE</span>
                <div style={{ fontWeight: 700, color: "#fff", marginTop: 2 }}>{subscription.renewalDate} ({subscription.monthlyAmount})</div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1.25rem" }}>SaaS Invoices</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { id: "INV-2026-01", date: "15 Jan 2026", amount: "₹ 5,40,000", status: "PAID" }
              ].map(inv => (
                <div key={inv.id} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8, display: "flex", justify: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff" }}>{inv.id}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{inv.date} &bull; {inv.amount}</div>
                  </div>
                  <button onClick={() => alert("Downloading SaaS Tax Invoice...")} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem" }}>
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
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Developer API Keys &amp; Webhooks</h3>
            <button onClick={handleGenerateApiKey} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
              <Code size={16} /> Generate API Key
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Key Identifier</th>
                <th>API Key Secret</th>
                <th>Created Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Revoke</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((k) => (
                <tr key={k.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{k.name}</td>
                  <td><code>{k.key}</code></td>
                  <td>{k.created}</td>
                  <td><span className="badge badge-success">{k.status}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => setApiKeys(apiKeys.filter(key => key.id !== k.id))} style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "0.3rem 0.5rem", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.72rem" }}>
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
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 400 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add System User</h3>
              <button onClick={() => setIsAddUserOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddUserSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>FULL NAME</label>
                <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="e.g. Ramesh Sharma" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>EMAIL ADDRESS</label>
                <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="e.g. ramesh@dps.edu.in" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SYSTEM ROLE</label>
                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                  {rolesList.map(r => <option key={r} value={r} style={{ background: "#0b0f19" }}>{r}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Create User &amp; Send Invite</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
