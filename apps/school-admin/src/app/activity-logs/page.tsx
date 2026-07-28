"use client";

import React, { useState } from "react";
import { 
  Clock, ShieldCheck, User, Search, Filter, 
  CheckCircle2, AlertTriangle, FileText, Lock, Globe 
} from "lucide-react";

export default function ActivityLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const [logs, setLogs] = useState([
    { id: "log_1", timestamp: "28 July 2026 07:35 AM", user: "Driver Ram Singh", role: "Driver", module: "Transport Telemetry", action: "Rahul Sharma (Class 5-A) marked as Picked at Sector 12 Market Gate", ip: "152.57.12.44", status: "SUCCESS" },
    { id: "log_2", timestamp: "28 July 2026 09:14 AM", user: "Accounts Office", role: "Admin", module: "Fee Collection", action: "Recorded ₹18,500 Term 2 Fee payment for Ananya Patel (Receipt #REC-99401)", ip: "10.0.4.12", status: "SUCCESS" },
    { id: "log_3", timestamp: "28 July 2026 09:45 AM", user: "Sunita Rao", role: "Teacher", module: "Homework & Assignments", action: "Uploaded Mathematics Chapter 4 Homework PDF for Class 8-B", ip: "10.0.2.88", status: "SUCCESS" },
    { id: "log_4", timestamp: "28 July 2026 10:15 AM", user: "Admissions Desk", role: "Admin", module: "Admissions", action: "Enrolled new student Aarav Gupta into Class 1-A (Roll #104)", ip: "10.0.4.15", status: "SUCCESS" },
    { id: "log_5", timestamp: "27 July 2026 04:30 PM", user: "Principal Office", role: "Admin", module: "System Security", action: "Updated School CBSE Affiliation & Institution Details", ip: "10.0.1.2", status: "SECURITY" },
    { id: "log_6", timestamp: "27 July 2026 06:12 PM", user: "Driver Suresh Kumar", role: "Driver", module: "Transport Telemetry", action: "Route 2 Vasant Kunj Evening Trip Completed & Logged", ip: "152.57.88.19", status: "SUCCESS" }
  ]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || log.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>System Operations Audit Trail & Activity Logs</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2 }}>Immutable real-time telemetry, fee transactions, student admissions, and security access logs.</p>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="glass-card" style={{ padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "1rem", flex: 1, maxWidth: 500 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by User, Action, Module, IP..."
              style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{ padding: "0.65rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", cursor: "pointer" }}
          >
            <option value="all" style={{ background: "#0b0f19" }}>All User Roles</option>
            <option value="admin" style={{ background: "#0b0f19" }}>Admin</option>
            <option value="teacher" style={{ background: "#0b0f19" }}>Teacher</option>
            <option value="driver" style={{ background: "#0b0f19" }}>Driver</option>
          </select>
        </div>

        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
          Showing {filteredLogs.length} Logged Entries
        </span>
      </div>

      {/* LOGS TABLE */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Performer User</th>
                <th>Role</th>
                <th>Module Area</th>
                <th>Action & Event Detail</th>
                <th>IP Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{log.timestamp}</td>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{log.user}</td>
                  <td>
                    <span className={`badge ${
                      log.role === "Admin" ? "badge-info" : log.role === "Teacher" ? "badge-warning" : "badge-success"
                    }`}>
                      {log.role}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: "var(--primary)" }}>{log.module}</td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-main)", maxWidth: 320 }}>{log.action}</td>
                  <td style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{log.ip}</td>
                  <td>
                    <span className={`badge ${
                      log.status === "SUCCESS" ? "badge-success" : log.status === "SECURITY" ? "badge-info" : "badge-danger"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
