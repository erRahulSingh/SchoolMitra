"use client";

import React, { useState } from "react";
import { 
  Users, UserCheck, Shield, Key, Plus, X, Search, 
  CheckCircle2, AlertCircle, RefreshCw, Sparkles, Mail, 
  Phone, Trash2, Edit3 
} from "lucide-react";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<"admins" | "support">("admins");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Users State
  const [users, setUsers] = useState([
    { id: "USR-001", name: "Rahul Singh", email: "rahul@schoolmitra.com", phone: "+91 99999 88888", role: "Company Admin", status: "Active", permissions: ["Billing Edit", "Tenant Control", "Deploy code"] },
    { id: "USR-002", name: "Amit Sharma", email: "amit.sharma@schoolmitra.com", phone: "+91 98888 77777", role: "Support Team L2", status: "Active", permissions: ["Ticket Resolve", "Telemetry Monitor"] },
    { id: "USR-003", name: "Sanjay Kumar", email: "sanjay@schoolmitra.com", phone: "+91 97777 66666", role: "Support Team L1", status: "Active", permissions: ["Telemetry Monitor"] }
  ]);

  // Form State
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Support Team L1");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const created = {
      id: `USR-00${users.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      phone: "+91 95555 44444",
      role: newUserRole,
      status: "Active",
      permissions: newUserRole === "Company Admin" ? ["Billing Edit", "Tenant Control"] : ["Telemetry Monitor"]
    };

    setUsers([...users, created]);
    setIsAddUserOpen(false);
    setNewUserName("");
    setNewUserEmail("");
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to revoke system credentials for this staff member?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "0.7rem", fontSize: "0.85rem" };
  const labelStyle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Users size={14} /> Company Staff & Credentials
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            User Management & Permissions
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.875rem" }}>
            Manage SchoolMitra corporate admins, support specialists, view active system access, and assign roles & permissions.
          </p>
        </div>

        <button onClick={() => setIsAddUserOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Add Corporate User
        </button>
      </div>

      {/* 2 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setActiveTab("admins")} className={`btn ${activeTab === "admins" ? 'btn-primary' : 'btn-secondary'}`}>
          <Shield size={16} /> Corporate Admins
        </button>
        <button onClick={() => setActiveTab("support")} className={`btn ${activeTab === "support" ? 'btn-primary' : 'btn-secondary'}`}>
          <UserCheck size={16} /> Helpdesk Support Team
        </button>
      </div>

      {/* ════════════ TAB 1 & 2: USERS LIST ════════════ */}
      <div className="glass-card" style={{ padding: "1.75rem" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Staff Name</th>
                <th>Corporate Email</th>
                <th>Contact Phone</th>
                <th>Assigned Role</th>
                <th>Access Permissions</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Revoke Access</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(u => activeTab === "admins" ? u.role === "Company Admin" : u.role.includes("Support"))
                .map((u) => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{u.id}</td>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{u.name}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 600 }}>{u.email}</td>
                    <td style={{ color: "var(--text-muted)" }}>{u.phone}</td>
                    <td><span className="badge badge-info">{u.role}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                        {u.permissions.map((p, pi) => (
                          <span key={pi} style={{ padding: "0.2rem 0.5rem", borderRadius: "4px", background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td><span className="badge badge-success">{u.status}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button onClick={() => handleDeleteUser(u.id)} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.3)" }}>
                        <Trash2 size={14} /> Revoke
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD USER MODAL */}
      {isAddUserOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-heading)" }}>Add Corporate User</h3>
              <button onClick={() => setIsAddUserOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddUser} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>STAFF FULL NAME</label>
                <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} placeholder="e.g. Anil Dev" required style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>CORPORATE EMAIL ADDRESS</label>
                <input type="email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} placeholder="anil@schoolmitra.com" required style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>ASSIGN CORPORATE ROLE</label>
                <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} style={inputStyle}>
                  <option>Company Admin</option>
                  <option>Support Team L2</option>
                  <option>Support Team L1</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsAddUserOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Create Credentials</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
