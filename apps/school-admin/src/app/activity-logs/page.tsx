"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, ShieldCheck, User, Search, Filter, 
  CheckCircle2, AlertTriangle, FileText, Lock, Globe, RefreshCw, Download 
} from "lucide-react";

export default function ActivityLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(false);

  const [logs, setLogs] = useState([
    { id: "log_1", timestamp: "28 July 2026 07:35 AM", user: "Driver Ram Singh", role: "Driver", module: "Transport Telemetry", action: "Rahul Sharma (Class 5-A) marked as Picked at Sector 12 Market Gate", ip: "152.57.12.44", status: "SUCCESS" },
    { id: "log_2", timestamp: "28 July 2026 09:14 AM", user: "Accounts Office", role: "Admin", module: "Fee Collection", action: "Recorded ₹18,500 Term 2 Fee payment for Ananya Patel (Receipt #REC-99401)", ip: "10.0.4.12", status: "SUCCESS" },
    { id: "log_3", timestamp: "28 July 2026 09:45 AM", user: "Sunita Rao", role: "Teacher", module: "Homework & Assignments", action: "Uploaded Mathematics Chapter 4 Homework PDF for Class 8-B", ip: "10.0.2.88", status: "SUCCESS" },
    { id: "log_4", timestamp: "28 July 2026 10:15 AM", user: "Admissions Desk", role: "Admin", module: "Admissions", action: "Enrolled new student Aarav Gupta into Class 1-A (Roll #104)", ip: "10.0.4.15", status: "SUCCESS" },
    { id: "log_5", timestamp: "27 July 2026 04:30 PM", user: "Principal Office", role: "Admin", module: "System Security", action: "Updated School CBSE Affiliation & Institution Details", ip: "10.0.1.2", status: "SECURITY" },
    { id: "log_6", timestamp: "27 July 2026 06:12 PM", user: "Driver Suresh Kumar", role: "Driver", module: "Transport Telemetry", action: "Route 2 Vasant Kunj Evening Trip Completed & Logged", ip: "152.57.88.19", status: "SUCCESS" }
  ]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/admin/audit-logs");
      const data = await res.json();
      if (data.success && data.logs && data.logs.length > 0) {
        const formatted = data.logs.map((l: any, idx: number) => ({
          id: `log_${idx + 1}`,
          timestamp: l.timestamp,
          user: l.user,
          role: l.user.includes("Driver") ? "Driver" : l.user.includes("Teacher") ? "Teacher" : "Admin",
          module: l.module,
          action: l.action,
          ip: l.ip,
          status: "SUCCESS"
        }));
        setLogs(formatted);
      }
    } catch (e) {
      console.error("Failed to fetch audit logs:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleExportCsv = () => {
    const headers = "Timestamp,Performer User,Role,Module Area,Action,IP Address,Status\n";
    const rows = filteredLogs.map(l => `"${l.timestamp}","${l.user}","${l.role}","${l.module}","${l.action.replace(/"/g, '""')}","${l.ip}","${l.status}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SchoolMitra_AuditLogs_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.ip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || log.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>System Operations Audit Trail &amp; Activity Logs</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0 }}>Immutable real-time telemetry, fee transactions, student admissions, and security access logs.</p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button 
            onClick={fetchLogs} 
            className="btn btn-secondary"
            style={{ padding: "0.55rem 0.95rem", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button 
            onClick={handleExportCsv}
            className="btn btn-primary"
            style={{ padding: "0.55rem 1rem", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
          >
            <Download size={16} /> Export Log CSV
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="glass-card" style={{ padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "1rem", flex: 1, maxWidth: 520, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by User, Action, Module, IP..."
              style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "var(--text-main)", fontSize: "0.85rem" }}
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{ padding: "0.65rem 1rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "var(--text-main)", fontSize: "0.85rem", cursor: "pointer" }}
          >
            <option value="all">All User Roles</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="driver">Driver</option>
          </select>
        </div>

        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 700 }}>
          Showing {filteredLogs.length} Logged Entries
        </span>
      </div>

      {/* LOGS TABLE */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap" }}>Timestamp</th>
                <th style={{ whiteSpace: "nowrap" }}>Performer User</th>
                <th style={{ whiteSpace: "nowrap" }}>Role</th>
                <th style={{ whiteSpace: "nowrap" }}>Module Area</th>
                <th>Action &amp; Event Detail</th>
                <th style={{ whiteSpace: "nowrap" }}>IP Address</th>
                <th style={{ whiteSpace: "nowrap" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{log.timestamp}</td>
                  <td style={{ fontWeight: 700, color: "var(--text-heading)", whiteSpace: "nowrap" }}>{log.user}</td>
                  <td>
                    <span className={`badge ${
                      log.role === "Admin" ? "badge-info" : log.role === "Teacher" ? "badge-warning" : "badge-success"
                    }`} style={{ whiteSpace: "nowrap" }}>
                      {log.role}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: "var(--primary)", whiteSpace: "nowrap" }}>{log.module}</td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-main)", maxWidth: 360 }}>{log.action}</td>
                  <td style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "monospace", whiteSpace: "nowrap" }}>{log.ip}</td>
                  <td>
                    <span className={`badge ${
                      log.status === "SUCCESS" ? "badge-success" : log.status === "SECURITY" ? "badge-info" : "badge-danger"
                    }`} style={{ whiteSpace: "nowrap" }}>
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
