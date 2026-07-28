"use client";

import React, { useState } from "react";
import { 
  Settings, Shield, Bell, Globe, Database, Users, Lock, 
  Save, CheckCircle2, ClipboardList, ShieldAlert, Key, Download, RefreshCw, AlertTriangle 
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"school" | "roles" | "audit" | "backup">("school");
  const [saved, setSaved] = useState(false);

  // ── Role Permissions Matrix State ──
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({
    "Super Admin": { "Student Manage": true, "Fee Modify": true, "Transport Track": true, "Staff Hire": true, "Publish Results": true },
    "School Principal": { "Student Manage": true, "Fee Modify": true, "Transport Track": true, "Staff Hire": true, "Publish Results": true },
    "Chief Accountant": { "Student Manage": true, "Fee Modify": true, "Transport Track": false, "Staff Hire": false, "Publish Results": false },
    "Transport Manager": { "Student Manage": false, "Fee Modify": false, "Transport Track": true, "Staff Hire": false, "Publish Results": false },
    "Class Teacher": { "Student Manage": true, "Fee Modify": false, "Transport Track": false, "Staff Hire": false, "Publish Results": false }
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

  // ── Audit Logs State ──
  const [auditLogs] = useState([
    { id: "AUD-901", user: "Principal Office (admin@dps.edu.in)", action: "Published Unit Test 2 Results", module: "Exams & Results", ip: "192.168.1.42", timestamp: "29 July 2026, 01:15 AM" },
    { id: "AUD-902", user: "Ramesh Sharma (Accounts)", action: "Collected Fee ₹11,300 (Aarav Sharma)", module: "Fees Management", ip: "192.168.1.18", timestamp: "28 July 2026, 04:30 PM" },
    { id: "AUD-903", user: "Ram Singh (Bus Pilot)", action: "Started Morning Trip (Bus #01)", module: "Live Telemetry", ip: "10.0.4.12", timestamp: "28 July 2026, 07:15 AM" },
    { id: "AUD-904", user: "Sunita Rao (Teacher)", action: "Marked Class 10-A Attendance (38 Present)", module: "Daily Attendance", ip: "192.168.1.55", timestamp: "28 July 2026, 08:45 AM" }
  ]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(100, 116, 139, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
        border: "1px solid var(--border-glow)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem 1.75rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            School Settings & Governance (Phase 10) <Settings size={24} color="#94a3b8" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Configure school identity, role-based access permissions, view security audit logs, and trigger system backups.
          </p>
        </div>

        <button onClick={handleSave} className="btn btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
          {saved ? <><CheckCircle2 size={16} /> Changes Saved!</> : <><Save size={16} /> Save Governance Settings</>}
        </button>
      </div>

      {/* 4 SETTINGS TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setActiveTab("school")} className={`btn ${activeTab === "school" ? "btn-primary" : "btn-secondary"}`}>
          <Globe size={16} /> School Settings
        </button>
        <button onClick={() => setActiveTab("roles")} className={`btn ${activeTab === "roles" ? "btn-primary" : "btn-secondary"}`}>
          <Key size={16} /> Roles & Permissions
        </button>
        <button onClick={() => setActiveTab("audit")} className={`btn ${activeTab === "audit" ? "btn-primary" : "btn-secondary"}`}>
          <ClipboardList size={16} /> Audit Logs
        </button>
        <button onClick={() => setActiveTab("backup")} className={`btn ${activeTab === "backup" ? "btn-primary" : "btn-secondary"}`}>
          <Database size={16} /> Backup & Safety
        </button>
      </div>

      {/* ════════════ TAB 1: SCHOOL SETTINGS ════════════ */}
      {activeTab === "school" && (
        <div className="glass-card" style={{ padding: "1.5rem", maxWidth: 640 }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>School Institution Identity & CBSE Affiliation</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "SCHOOL OFFICIAL NAME", value: "Delhi Public School, New Delhi" },
              { label: "CBSE AFFILIATION CODE", value: "CBSE-AFF-2730001" },
              { label: "ESTABLISHMENT YEAR", value: "1949" },
              { label: "OFFICIATING PRINCIPAL", value: "Dr. Ashok Kumar (Ph.D. Education)" },
              { label: "OFFICIAL CONTACT EMAIL", value: "admin@dps.edu.in" },
              { label: "HEPLINE / TELEPHONE (+91)", value: "+91 11 2617 7777" },
              { label: "CAMPUS ADDRESS", value: "Sector 12, Dwarka, New Delhi - 110075" }
            ].map((field, idx) => (
              <div key={idx}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>{field.label}</label>
                <input 
                  type="text" 
                  defaultValue={field.value} 
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: ROLES & PERMISSIONS ════════════ */}
      {activeTab === "roles" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>Role-Based Access Control (RBAC) Permission Matrix</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
            Configure granular access permissions for Staff, Teachers, Accountants, and Transport Supervisors.
          </p>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>User Role</th>
                  {["Student Manage", "Fee Modify", "Transport Track", "Staff Hire", "Publish Results"].map((perm, pIdx) => (
                    <th key={pIdx} style={{ textAlign: "center" }}>{perm}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(permissions).map((role) => (
                  <tr key={role}>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{role}</td>
                    {["Student Manage", "Fee Modify", "Transport Track", "Staff Hire", "Publish Results"].map((perm) => {
                      const isAllowed = permissions[role]?.[perm] ?? false;
                      return (
                        <td key={perm} style={{ textAlign: "center" }}>
                          <input 
                            type="checkbox"
                            checked={isAllowed}
                            onChange={() => togglePermission(role, perm)}
                            style={{ width: 18, height: 18, cursor: "pointer", accentColor: "var(--primary)" }}
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

      {/* ════════════ TAB 3: AUDIT LOGS ════════════ */}
      {activeTab === "audit" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>System Operations Audit Log Trail</h3>
            <button className="btn btn-secondary" style={{ fontSize: "0.78rem" }}>
              <Download size={14} /> Export Audit Log
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Audit Ref ID</th>
                  <th>User Identity</th>
                  <th>Action Performed</th>
                  <th>Module</th>
                  <th>IP Address</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{log.id}</td>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{log.user}</td>
                    <td style={{ fontWeight: 600 }}>{log.action}</td>
                    <td>
                      <span className="badge badge-info">{log.module}</span>
                    </td>
                    <td style={{ fontFamily: "monospace", color: "var(--text-muted)" }}>{log.ip}</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: BACKUP & DANGER ZONE ════════════ */}
      {activeTab === "backup" && (
        <div className="glass-card" style={{ padding: "1.5rem", maxWidth: 640 }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>Data Backups & Recovery</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ padding: "1rem 1.25rem", background: "rgba(16,185,129,0.12)", borderRadius: "var(--radius-md)", border: "1px solid var(--success)" }}>
              <div style={{ fontWeight: 800, color: "var(--success)", fontSize: "0.9rem" }}>Automated Daily Backup Active ✅</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>
                Last automated snapshot recorded on 28 July 2026 at 11:30 PM IST. Secured with AES-256 Cloud Encryption.
              </div>
            </div>

            <button className="btn btn-primary" style={{ justifyContent: "center", padding: "0.85rem" }}>
              <Database size={18} /> Trigger Manual Cloud Backup Now
            </button>

            <button className="btn btn-secondary" style={{ justifyContent: "center", padding: "0.85rem" }}>
              <Download size={18} /> Export Full Database Dump (PostgreSQL SQL / CSV)
            </button>

            <div style={{ padding: "1.25rem", background: "rgba(239, 68, 68, 0.08)", borderRadius: "var(--radius-md)", border: "1px solid rgba(239, 68, 68, 0.3)", marginTop: "0.5rem" }}>
              <div style={{ fontWeight: 800, color: "#ef4444", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <AlertTriangle size={16} /> Danger Zone: Factory Reset ERP
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4, marginBottom: "1rem" }}>
                Irreversibly wipe all student rosters, attendance ledgers, fee records, and bus logs.
              </div>
              <button 
                onClick={() => { if (confirm("DANGER: Are you sure you want to reset all ERP data?")) alert("ERP Data Reset Blocked by Security Protocol."); }}
                style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "0.6rem 1.25rem", borderRadius: "var(--radius-sm)", fontWeight: 800, cursor: "pointer", fontSize: "0.82rem" }}
              >
                Factory Reset All ERP Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
