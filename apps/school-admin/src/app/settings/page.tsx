"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, Shield, Bell, Globe, Database, Users, Lock, 
  Save, CheckCircle2, ClipboardList, ShieldAlert, Key, Download, RefreshCw, AlertTriangle,
  CreditCard, Cpu, Code, Activity, UserPlus, Trash2, Edit3, Eye, Smartphone, Zap, Check, X, Server, ChevronRight
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

  // ── 3b. Granular Teacher Role Permissions State ──
  interface PermModule {
    module: string;
    actions: { key: string; action: string; description: string }[];
  }
  const [permModules, setPermModules] = useState<PermModule[]>([]);
  const [teacherPerms, setTeacherPerms] = useState<Record<string, boolean>>({});
  const [permLoading, setPermLoading] = useState(false);
  const [permSaving, setPermSaving] = useState(false);
  const [permSaved, setPermSaved] = useState(false);

  // ── 3c. Individual Teacher Permission Overrides State ──
  interface TeacherForPerms {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    status?: string;
    avatar?: string;
  }
  const [teachersList, setTeachersList] = useState<TeacherForPerms[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherForPerms | null>(null);
  const [teacherOverrides, setTeacherOverrides] = useState<Record<string, "ALLOW" | "DENY" | "DEFAULT">>({});
  const [overrideSaving, setOverrideSaving] = useState(false);
  const [overrideSaved, setOverrideSaved] = useState(false);
  const [permSubTab, setPermSubTab] = useState<"role" | "individual">("role");
  const [teacherSearch, setTeacherSearch] = useState("");

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

      // Load Granular Permissions Registry + Teacher Role Permissions
      loadPermissionsData();

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

  // ── Granular Permissions Handlers ──
  const loadPermissionsData = async () => {
    setPermLoading(true);
    try {
      // Load permissions registry
      const regRes = await fetch("http://localhost:5000/api/v1/permissions/registry").then(r => r.json()).catch(() => null);
      if (regRes?.success && regRes.data?.modules) {
        setPermModules(regRes.data.modules);
      } else {
        // Fallback hardcoded modules
        setPermModules([
          { module: "students", actions: [
            { key: "students.view", action: "View", description: "View student profiles" },
            { key: "students.create", action: "Create", description: "Add students" },
            { key: "students.update", action: "Edit", description: "Edit student info" },
            { key: "students.delete", action: "Delete", description: "Remove students" }
          ]},
          { module: "attendance", actions: [
            { key: "attendance.view", action: "View", description: "View attendance" },
            { key: "attendance.create", action: "Mark", description: "Mark attendance" },
            { key: "attendance.update", action: "Edit", description: "Update attendance" },
            { key: "attendance.delete", action: "Delete", description: "Delete attendance" }
          ]},
          { module: "homework", actions: [
            { key: "homework.view", action: "View", description: "View homework" },
            { key: "homework.create", action: "Create", description: "Create homework" },
            { key: "homework.update", action: "Edit", description: "Edit homework" },
            { key: "homework.delete", action: "Delete", description: "Delete homework" },
            { key: "homework.publish", action: "Publish", description: "Publish to parents" }
          ]},
          { module: "assignments", actions: [
            { key: "assignments.view", action: "View", description: "View assignments" },
            { key: "assignments.create", action: "Create", description: "Create assignments" },
            { key: "assignments.update", action: "Edit", description: "Edit assignments" },
            { key: "assignments.delete", action: "Delete", description: "Delete assignments" }
          ]},
          { module: "exams", actions: [
            { key: "exams.view", action: "View", description: "View exams" },
            { key: "exams.create", action: "Create", description: "Create exams" },
            { key: "exams.update", action: "Edit", description: "Edit exams" },
            { key: "exams.delete", action: "Delete", description: "Delete exams" }
          ]},
          { module: "marks", actions: [
            { key: "marks.view", action: "View", description: "View marks" },
            { key: "marks.create", action: "Add", description: "Enter marks" },
            { key: "marks.update", action: "Edit", description: "Edit marks" },
            { key: "marks.delete", action: "Delete", description: "Delete marks" },
            { key: "marks.publish", action: "Publish", description: "Publish marks" }
          ]},
          { module: "reports", actions: [
            { key: "reports.view", action: "View", description: "View reports" },
            { key: "reports.create", action: "Create", description: "Create reports" },
            { key: "reports.update", action: "Edit", description: "Edit reports" },
            { key: "reports.delete", action: "Delete", description: "Delete reports" },
            { key: "reports.publish", action: "Publish", description: "Publish to parents" }
          ]},
          { module: "materials", actions: [
            { key: "materials.view", action: "View", description: "View materials" },
            { key: "materials.create", action: "Create", description: "Upload materials" },
            { key: "materials.update", action: "Edit", description: "Edit materials" },
            { key: "materials.delete", action: "Delete", description: "Delete materials" }
          ]},
          { module: "messages", actions: [
            { key: "messages.view", action: "View", description: "View messages" },
            { key: "messages.create", action: "Send", description: "Send messages" },
            { key: "announcements.create", action: "Broadcast", description: "Announcements" }
          ]},
          { module: "leave", actions: [
            { key: "leave.view", action: "View", description: "View leave" },
            { key: "leave.create", action: "Apply", description: "Apply leave" },
            { key: "leave.cancel", action: "Cancel", description: "Cancel leave" }
          ]}
        ]);
      }

      // Load teacher role permissions
      const roleRes = await fetch("http://localhost:5000/api/v1/permissions/teacher-role").then(r => r.json()).catch(() => null);
      if (roleRes?.success && roleRes.data?.permissions) {
        const map: Record<string, boolean> = {};
        roleRes.data.permissions.forEach((k: string) => { map[k] = true; });
        setTeacherPerms(map);
      } else {
        // Fallback defaults
        const defaults: Record<string, boolean> = {};
        ["students.view","attendance.view","attendance.create","homework.view","homework.create","assignments.view","assignments.create","marks.view","marks.create","reports.view","materials.view","materials.create"].forEach(k => { defaults[k] = true; });
        setTeacherPerms(defaults);
      }

      // Load teachers list for individual overrides
      const tchRes = await fetch("http://localhost:5000/api/v1/permissions/teachers").then(r => r.json()).catch(() => null);
      if (tchRes?.success && tchRes.data?.teachers) {
        setTeachersList(tchRes.data.teachers);
      } else {
        // Fallback demo teachers
        setTeachersList([
          { _id: "t1", name: "Sunita Rao", email: "sunita.rao@schoolmitra.edu.in", role: "Teacher", status: "Active" },
          { _id: "t2", name: "Vikram Malhotra", email: "vikram.sci@schoolmitra.edu.in", role: "Teacher", status: "Active" },
          { _id: "t3", name: "Priya Reddy", email: "priya.eng@schoolmitra.edu.in", role: "Teacher", status: "Active" },
          { _id: "t4", name: "Anjali Deshpande", email: "anjali.hin@schoolmitra.edu.in", role: "Teacher", status: "Active" },
          { _id: "t5", name: "Rahul Kushwaha", email: "rahul@schoolmitra.edu.in", phone: "7870391245", role: "Teacher", status: "Active" }
        ]);
      }
    } catch (err) {
      console.error("Failed to load permissions data:", err);
    } finally {
      setPermLoading(false);
    }
  };

  const handleToggleTeacherPerm = (key: string) => {
    setTeacherPerms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveTeacherRolePerms = async () => {
    setPermSaving(true);
    const enabledKeys = Object.entries(teacherPerms).filter(([, v]) => v).map(([k]) => k);
    try {
      await fetch("http://localhost:5000/api/v1/permissions/teacher-role", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions: enabledKeys })
      });
      localStorage.setItem("sm_teacher_role_perms", JSON.stringify(enabledKeys));
    } catch (e) {}
    setPermSaving(false);
    setPermSaved(true);
    setTimeout(() => setPermSaved(false), 3000);
  };

  const handleSelectTeacher = async (teacher: TeacherForPerms) => {
    setSelectedTeacher(teacher);
    // Load existing overrides
    try {
      const res = await fetch(`http://localhost:5000/api/v1/permissions/user/${teacher._id}`).then(r => r.json()).catch(() => null);
      if (res?.success && res.data?.overrides) {
        const map: Record<string, "ALLOW" | "DENY" | "DEFAULT"> = {};
        // Init all as DEFAULT (inherit from role)
        permModules.forEach(m => m.actions.forEach(a => { map[a.key] = "DEFAULT"; }));
        // Apply stored overrides
        res.data.overrides.forEach((o: any) => { map[o.permissionKey] = o.effect; });
        setTeacherOverrides(map);
      } else {
        // Init as all DEFAULT
        const map: Record<string, "ALLOW" | "DENY" | "DEFAULT"> = {};
        permModules.forEach(m => m.actions.forEach(a => { map[a.key] = "DEFAULT"; }));
        setTeacherOverrides(map);
      }
    } catch (err) {
      const map: Record<string, "ALLOW" | "DENY" | "DEFAULT"> = {};
      permModules.forEach(m => m.actions.forEach(a => { map[a.key] = "DEFAULT"; }));
      setTeacherOverrides(map);
    }
  };

  const cycleOverride = (key: string) => {
    setTeacherOverrides(prev => {
      const current = prev[key] || "DEFAULT";
      const next = current === "DEFAULT" ? "ALLOW" : current === "ALLOW" ? "DENY" : "DEFAULT";
      return { ...prev, [key]: next };
    });
  };

  const handleSaveTeacherOverrides = async () => {
    if (!selectedTeacher) return;
    setOverrideSaving(true);
    const overridesArr = Object.entries(teacherOverrides).map(([key, effect]) => ({ permissionKey: key, effect }));
    try {
      await fetch(`http://localhost:5000/api/v1/permissions/user/${selectedTeacher._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overrides: overridesArr })
      });
    } catch (e) {}
    setOverrideSaving(false);
    setOverrideSaved(true);
    setTimeout(() => setOverrideSaved(false), 3000);
  };

  const getEffectivePermission = (key: string): boolean => {
    const override = teacherOverrides[key];
    if (override === "ALLOW") return true;
    if (override === "DENY") return false;
    return !!teacherPerms[key]; // DEFAULT = inherit from role
  };

  const moduleDisplayNames: Record<string, string> = {
    students: "Students",
    attendance: "Attendance",
    homework: "Homework",
    assignments: "Assignments",
    exams: "Examinations",
    marks: "Marks & Grades",
    reports: "Report Cards",
    materials: "Study Material",
    messages: "Communication",
    announcements: "Announcements",
    leave: "Leave Management"
  };

  const moduleIcons: Record<string, string> = {
    students: "👨‍🎓",
    attendance: "📋",
    homework: "📝",
    assignments: "📊",
    exams: "📄",
    marks: "🏆",
    reports: "📑",
    materials: "📚",
    messages: "💬",
    announcements: "📢",
    leave: "🏖️"
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

      {/* MODULE 3: ROLES & PERMISSIONS — GRANULAR TEACHER RBAC */}
      {activeTab === "roles" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Sub-tab Switcher: Role Permissions vs Individual Teacher */}
          <div className="glass-card" style={{ padding: "0.5rem", display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setPermSubTab("role")}
              className={`btn ${permSubTab === "role" ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem", fontWeight: permSubTab === "role" ? 700 : 500 }}
            >
              <Shield size={16} /> Teacher Role Permissions
            </button>
            <button
              onClick={() => setPermSubTab("individual")}
              className={`btn ${permSubTab === "individual" ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem", fontWeight: permSubTab === "individual" ? 700 : 500 }}
            >
              <Users size={16} /> Individual Teacher Permissions
            </button>
          </div>

          {/* ═══════ SUB-TAB A: Teacher Role Default Permissions Matrix ═══════ */}
          {permSubTab === "role" && (
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Shield size={20} color="var(--primary)" /> Teacher Role — Default Permissions Matrix
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: 4 }}>
                    These permissions apply to ALL teachers by default. Individual overrides can be set per teacher.
                  </p>
                </div>
                <button
                  onClick={handleSaveTeacherRolePerms}
                  className="btn btn-primary"
                  disabled={permSaving}
                  style={{ padding: "0.6rem 1.25rem", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
                >
                  {permSaved ? <><CheckCircle2 size={16} /> Permissions Saved!</> : permSaving ? <><RefreshCw size={16} className="spin" /> Saving...</> : <><Save size={16} /> Save Role Permissions</>}
                </button>
              </div>

              {permLoading ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  <RefreshCw size={24} className="spin" />
                  <p style={{ marginTop: "0.5rem" }}>Loading permissions registry...</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
                  {permModules.map((mod) => (
                    <div key={mod.module} style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "var(--radius-md)",
                      padding: "1rem",
                      transition: "border-color 0.2s"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <span style={{ fontSize: "1.2rem" }}>{moduleIcons[mod.module] || "📦"}</span>
                        <h4 style={{ fontSize: "0.9rem", fontWeight: 700, margin: 0, color: "var(--text-heading)" }}>
                          {moduleDisplayNames[mod.module] || mod.module}
                        </h4>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        {mod.actions.map((action) => {
                          const isEnabled = !!teacherPerms[action.key];
                          return (
                            <label
                              key={action.key}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.6rem",
                                padding: "0.4rem 0.5rem",
                                borderRadius: "var(--radius-sm)",
                                cursor: "pointer",
                                transition: "background 0.15s",
                                background: isEnabled ? "rgba(34, 197, 94, 0.06)" : "transparent"
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = isEnabled ? "rgba(34, 197, 94, 0.1)" : "rgba(255,255,255,0.04)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = isEnabled ? "rgba(34, 197, 94, 0.06)" : "transparent")}
                            >
                              <div
                                onClick={() => handleToggleTeacherPerm(action.key)}
                                style={{
                                  width: 20, height: 20,
                                  borderRadius: 4,
                                  border: isEnabled ? "2px solid #22c55e" : "2px solid rgba(255,255,255,0.2)",
                                  background: isEnabled ? "#22c55e" : "transparent",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  transition: "all 0.2s",
                                  flexShrink: 0,
                                  cursor: "pointer"
                                }}
                              >
                                {isEnabled && <Check size={14} color="#fff" strokeWidth={3} />}
                              </div>
                              <div style={{ flex: 1 }}>
                                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: isEnabled ? "#fff" : "var(--text-muted)" }}>
                                  {action.action}
                                </span>
                                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "0.5rem" }}>
                                  — {action.description}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════ SUB-TAB B: Individual Teacher Permission Overrides ═══════ */}
          {permSubTab === "individual" && (
            <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "1rem" }}>
              
              {/* Left: Teachers List */}
              <div className="glass-card" style={{ padding: "1rem" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Users size={16} color="var(--primary)" /> Select Teacher
                </h4>
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  style={{
                    width: "100%", padding: "0.5rem 0.75rem",
                    background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)",
                    borderRadius: 6, color: "#fff", fontSize: "0.8rem", marginBottom: "0.75rem"
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", maxHeight: "450px", overflowY: "auto" }}>
                  {teachersList
                    .filter(t => t.name.toLowerCase().includes(teacherSearch.toLowerCase()) || t.email.toLowerCase().includes(teacherSearch.toLowerCase()))
                    .map(t => {
                      const isSelected = selectedTeacher?._id === t._id;
                      const initials = t.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
                      return (
                        <button
                          key={t._id}
                          onClick={() => handleSelectTeacher(t)}
                          style={{
                            display: "flex", alignItems: "center", gap: "0.6rem",
                            padding: "0.6rem 0.75rem",
                            background: isSelected ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.02)",
                            border: isSelected ? "1px solid rgba(99,102,241,0.4)" : "1px solid transparent",
                            borderRadius: "var(--radius-sm)",
                            cursor: "pointer",
                            textAlign: "left",
                            color: "#fff",
                            transition: "all 0.15s",
                            width: "100%"
                          }}
                        >
                          <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: isSelected ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "linear-gradient(135deg, #374151, #4b5563)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "0.72rem", fontWeight: 800, color: "#fff", flexShrink: 0
                          }}>
                            {initials}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.email}</div>
                          </div>
                          {isSelected && <ChevronRight size={16} color="var(--primary)" />}
                        </button>
                      );
                    })}
                  {teachersList.length === 0 && (
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", textAlign: "center", padding: "1rem" }}>No teachers found.</p>
                  )}
                </div>
              </div>

              {/* Right: Permission Overrides Panel */}
              <div className="glass-card" style={{ padding: "1.25rem" }}>
                {!selectedTeacher ? (
                  <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
                    <Lock size={40} style={{ marginBottom: "1rem", opacity: 0.4 }} />
                    <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>Select a Teacher</h4>
                    <p style={{ fontSize: "0.82rem" }}>Choose a teacher from the list to configure their individual permission overrides.</p>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: "50%",
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.85rem", fontWeight: 800, color: "#fff"
                        }}>
                          {selectedTeacher.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>{selectedTeacher.name}</h3>
                          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>{selectedTeacher.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleSaveTeacherOverrides}
                        className="btn btn-primary"
                        disabled={overrideSaving}
                        style={{ padding: "0.55rem 1.1rem", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
                      >
                        {overrideSaved ? <><CheckCircle2 size={16} /> Overrides Saved!</> : overrideSaving ? <><RefreshCw size={16} className="spin" /> Saving...</> : <><Save size={16} /> Save Overrides</>}
                      </button>
                    </div>

                    <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "var(--radius-sm)", padding: "0.6rem 0.85rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <AlertTriangle size={15} color="#a78bfa" />
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        <strong style={{ color: "#a78bfa" }}>DEFAULT</strong> = inherits from Teacher role &nbsp;|&nbsp;
                        <strong style={{ color: "#22c55e" }}>ALLOW</strong> = explicitly granted &nbsp;|&nbsp;
                        <strong style={{ color: "#ef4444" }}>DENY</strong> = explicitly blocked. Click to cycle.
                      </span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.85rem" }}>
                      {permModules.map((mod) => (
                        <div key={mod.module} style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid var(--border-color)",
                          borderRadius: "var(--radius-md)",
                          padding: "0.85rem"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.6rem", paddingBottom: "0.4rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <span style={{ fontSize: "1.1rem" }}>{moduleIcons[mod.module] || "📦"}</span>
                            <h5 style={{ fontSize: "0.82rem", fontWeight: 700, margin: 0 }}>
                              {moduleDisplayNames[mod.module] || mod.module}
                            </h5>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            {mod.actions.map((action) => {
                              const override = teacherOverrides[action.key] || "DEFAULT";
                              const effective = getEffectivePermission(action.key);
                              const bgColor = override === "ALLOW" ? "rgba(34,197,94,0.08)" : override === "DENY" ? "rgba(239,68,68,0.08)" : "transparent";
                              const borderColor = override === "ALLOW" ? "rgba(34,197,94,0.25)" : override === "DENY" ? "rgba(239,68,68,0.25)" : "transparent";
                              return (
                                <div
                                  key={action.key}
                                  onClick={() => cycleOverride(action.key)}
                                  style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    padding: "0.35rem 0.5rem",
                                    borderRadius: "var(--radius-sm)",
                                    cursor: "pointer",
                                    background: bgColor,
                                    border: `1px solid ${borderColor}`,
                                    transition: "all 0.15s"
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: effective ? "#fff" : "var(--text-muted)" }}>
                                      {action.action}
                                    </span>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    {effective ? (
                                      <Check size={14} color="#22c55e" strokeWidth={3} />
                                    ) : (
                                      <X size={14} color="#ef4444" strokeWidth={3} />
                                    )}
                                    <span style={{
                                      fontSize: "0.65rem",
                                      fontWeight: 700,
                                      padding: "0.15rem 0.4rem",
                                      borderRadius: 4,
                                      background: override === "ALLOW" ? "rgba(34,197,94,0.15)" : override === "DENY" ? "rgba(239,68,68,0.15)" : "rgba(148,163,184,0.12)",
                                      color: override === "ALLOW" ? "#22c55e" : override === "DENY" ? "#ef4444" : "#94a3b8"
                                    }}>
                                      {override}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
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
