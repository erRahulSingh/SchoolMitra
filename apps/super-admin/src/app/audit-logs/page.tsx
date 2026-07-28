"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, LogIn, Activity, AlertOctagon, Search, 
  Filter, Download, ChevronRight, X, Clock, Terminal, Globe, Monitor 
} from "lucide-react";

export default function AuditLogsPage() {
  const [activeTab, setActiveTab] = useState<"audit" | "logins" | "activity" | "errors">("audit");
  const [search, setSearch] = useState("");

  // Audit Logs State
  const [auditLogs] = useState([
    { id: "AUD-109", actor: "Company Admin (rahul@schoolmitra.com)", action: "Onboarded Delhi Public School (Dwarka)", ip: "192.168.1.10", time: "29 Jul 2026, 01:15 AM", module: "Tenant Provision" },
    { id: "AUD-110", actor: "Support Team L2 (amit.sharma@schoolmitra.com)", action: "Enabled ff_socket_chat feature flag", ip: "192.168.1.15", time: "28 Jul 2026, 11:42 PM", module: "Feature Toggles" },
    { id: "AUD-111", actor: "Company Admin (rahul@schoolmitra.com)", action: "Modified Enterprise Pro SaaS slab price to ₹45,000", ip: "192.168.1.10", time: "28 Jul 2026, 09:00 AM", module: "SaaS Plans" }
  ]);

  // Login Logs State
  const [loginLogs] = useState([
    { id: "LGN-801", user: "admin@dpsdwarka.edu.in", role: "School Admin", client: "Web Chrome / Windows", ip: "103.45.12.99", location: "New Delhi, India", time: "29 Jul 2026, 01:10 AM" },
    { id: "LGN-802", user: "driver.ramsinger@dpsdwarka.edu.in", role: "Bus Pilot", client: "Driver App v2.1 (Android)", ip: "27.12.90.14", location: "New Delhi, India", time: "29 Jul 2026, 01:05 AM" },
    { id: "LGN-803", user: "parent.aaravsharma@gmail.com", role: "Parent User", client: "Parent Mobile PWA (iOS)", ip: "182.90.41.22", location: "Gurugram, India", time: "29 Jul 2026, 12:58 AM" }
  ]);

  // Activity Logs State
  const [activityLogs] = useState([
    { id: "ACT-5501", user: "admin@dpsdwarka.edu.in", detail: "Modified Class 10-A marks data", status: "Success", time: "29 Jul 2026, 01:15 AM" },
    { id: "ACT-5502", user: "admin@dpsdwarka.edu.in", detail: "Triggered Daily Attendance submission", status: "Success", time: "29 Jul 2026, 08:45 AM" },
    { id: "ACT-5503", user: "principal@davvk.edu.in", detail: "Triggered database dump manual export", status: "Access Denied", time: "28 Jul 2026, 04:30 PM" }
  ]);

  // Error Logs State
  const [errorLogs, setErrorLogs] = useState([
    { id: "ERR-9001", server: "API-Worker-Node-Alpha", error: "Error: listen EADDRINUSE: address already in use :::3001", route: "Server Bootup", time: "29 Jul 2026, 01:42 AM", code: 500, trace: "at Server.setupListenHandle [as _listen2] (node:net:1940:16)\n   at listenInCluster (node:net:1997:12)\n   at Server.listen (node:net:2102:7)" },
    { id: "ERR-9002", server: "GPS-Telemetry-Ingest", error: "ReferenceError: Link is not defined", route: "GET /api/v1/telemetry/live", time: "29 Jul 2026, 01:12 AM", code: 500, trace: "at TelemetryPage (d:\\SchoolMitra\\apps\\school-admin\\src\\components\\layout\\Header.tsx:61:10)\n   at renderWithHooks (react-dom:15482)" }
  ]);

  const [selectedErrorTrace, setSelectedErrorTrace] = useState<any>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="glass-card" style={{
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.12) 100%)",
        border: "1px solid var(--border-glow)",
        padding: "1.75rem 2rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(139, 92, 246, 0.2)", border: "1px solid rgba(139, 92, 246, 0.4)", color: "#c084fc", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <ShieldCheck size={14} /> SaaS Security & Systems Logs Audit Center
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
            SaaS Platform System Logs & Audit Trails
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: "0.875rem" }}>
            Review administrator audit trails, active user login sessions, granular API activity logs, and system error stack traces.
          </p>
        </div>

        <button className="btn btn-primary">
          <Download size={16} /> Export Systems Logs
        </button>
      </div>

      {/* 4 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        {[
          { id: "audit", label: "Admin Audit Logs", icon: ShieldCheck },
          { id: "logins", label: "User Login Logs", icon: LogIn },
          { id: "activity", label: "Tenant Activity Logs", icon: Activity },
          { id: "errors", label: "Server Error Logs", icon: AlertOctagon }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}>
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR */}
      <div className="glass-card" style={{ padding: "1.25rem 1.5rem" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "500px" }}>
          <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter logs by keyword, IP address, user..."
            style={{
              width: "100%",
              padding: "0.65rem 0.75rem 0.65rem 2.5rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              color: "#ffffff",
              fontSize: "0.85rem"
            }}
          />
        </div>
      </div>

      {/* ════════════ TAB 1: ADMIN AUDIT LOGS ════════════ */}
      {activeTab === "audit" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>Log Ref</th><th>Actor</th><th>Module</th><th>Operation Executed</th><th>IP Address</th><th>Timestamp</th></tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{log.id}</td>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{log.actor}</td>
                    <td><span className="badge badge-info">{log.module}</span></td>
                    <td style={{ fontWeight: 600 }}>{log.action}</td>
                    <td style={{ fontFamily: "monospace" }}>{log.ip}</td>
                    <td style={{ color: "var(--text-muted)" }}>{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: USER LOGIN LOGS ════════════ */}
      {activeTab === "logins" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>User Identity</th><th>Role</th><th>Client Device / OS</th><th>IP Address</th><th>Geographic Location</th><th>Login Timestamp</th></tr>
              </thead>
              <tbody>
                {loginLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{log.user}</td>
                    <td><span className="badge badge-info">{log.role}</span></td>
                    <td>{log.client}</td>
                    <td style={{ fontFamily: "monospace" }}>{log.ip}</td>
                    <td style={{ fontWeight: 600 }}><Globe size={13} style={{ verticalAlign: "middle", marginRight: 4 }} />{log.location}</td>
                    <td style={{ color: "var(--text-muted)" }}>{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: TENANT ACTIVITY LOGS ════════════ */}
      {activeTab === "activity" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>User</th><th>Action Detail</th><th>API Status</th><th>Timestamp</th></tr>
              </thead>
              <tbody>
                {activityLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{log.user}</td>
                    <td style={{ fontWeight: 600 }}>{log.detail}</td>
                    <td>
                      <span className={`badge ${log.status.includes("Success") ? "badge-success" : "badge-danger"}`}>
                        {log.status}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: SERVER ERROR LOGS ════════════ */}
      {activeTab === "errors" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>Node</th><th>Exception Error Message</th><th>SaaS Route</th><th>HTTP Status</th><th>Timestamp</th><th style={{ textAlign: "right" }}>Inspect Stack</th></tr>
              </thead>
              <tbody>
                {errorLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{log.server}</td>
                    <td style={{ color: "#f87171", fontWeight: 700 }}>{log.error}</td>
                    <td style={{ fontFamily: "monospace" }}>{log.route}</td>
                    <td style={{ fontWeight: 800, color: "#f87171" }}>{log.code}</td>
                    <td style={{ color: "var(--text-muted)" }}>{log.time}</td>
                    <td style={{ textAlign: "right" }}>
                      <button onClick={() => setSelectedErrorTrace(log)} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>
                        <Terminal size={14} /> View Trace
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ERROR STACK TRACE MODAL */}
      {selectedErrorTrace && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 640, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>SaaS Server Exception Stack Trace</h3>
              <button onClick={() => setSelectedErrorTrace(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700 }}>EXCEPTION MESSAGE</label>
                <div style={{ color: "#f87171", fontWeight: 700, marginTop: 4 }}>{selectedErrorTrace.error}</div>
              </div>

              <div>
                <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700 }}>STACK TRACE DETAILED LOG</label>
                <pre style={{
                  padding: "1rem", borderRadius: "var(--radius-md)", background: "#0b0f19", border: "1px solid var(--border-color)",
                  color: "#e2e8f0", fontSize: "0.8rem", whiteSpace: "pre-wrap", overflowX: "auto", fontFamily: "monospace", marginTop: 4
                }}>
                  {selectedErrorTrace.trace}
                </pre>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setSelectedErrorTrace(null)} className="btn btn-secondary">Close Trace</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
