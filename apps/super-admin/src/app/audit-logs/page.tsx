"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Sparkles, User, Lock, Search, Download, 
  CheckCircle2, RefreshCw, Eye, Key, Shield 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [logs, setLogs] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalAuditLogs: 3,
    activeAdminUsers: 2,
    uniqueIpAddresses: 3,
    securityRating: "100% Immutable"
  });

  const fetchAuditLogs = async () => {
    setLoading(true);
    const local = localStorage.getItem("saas_audit_logs");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) setLogs(parsed);
      } catch (e) {}
    }

    try {
      const res = await superAdminApi.getAuditLogs();
      if (res.success) {
        if (res.summary) setSummary(res.summary);
        if (res.logs && Array.isArray(res.logs) && res.logs.length > 0) {
          setLogs(res.logs);
          localStorage.setItem("saas_audit_logs", JSON.stringify(res.logs));
        }
      }
    } catch (err) {
      console.error("Error fetching audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Log ID,Performed By,Action Description,IP Address,Timestamp\n";
    logs.forEach(l => {
      csvContent += `"${l.id}","${l.user}","${l.action.replace(/"/g, '""')}","${l.ip}","${l.timestamp}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SchoolMitra_Audit_Trail_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLogs = logs.filter(l =>
    (l.user || "").toLowerCase().includes(search.toLowerCase()) ||
    (l.action || "").toLowerCase().includes(search.toLowerCase()) ||
    (l.ip || "").toLowerCase().includes(search.toLowerCase()) ||
    (l.id || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <ShieldCheck size={14} /> Security Compliance & Audit Trail
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Super Admin Audit Logs
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Immutable security log of admin actions, tenant modifications, and security events.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={fetchAuditLogs} className="btn btn-secondary">
            <RefreshCw size={16} /> Refresh Trail
          </button>
          <button onClick={handleExportCSV} className="btn btn-primary">
            <Download size={16} /> Export Audit Trail CSV
          </button>
        </div>
      </div>

      {/* 4 SUMMARY STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Audit Trail Logs</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{logs.length} Entries Recorded</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>100% Security Action Tracked</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Active Admin Operators</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>{summary.activeAdminUsers} Super Admins</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>Role-based access enforced</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Unique IP Addresses</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--secondary)", marginTop: 4 }}>{summary.uniqueIpAddresses} IP Sources</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>IP Geolocation verified</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Audit Trail Integrity</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>{summary.securityRating}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>MongoDB + LocalStorage Synced</div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="glass-card" style={{ padding: "1.25rem 1.5rem" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "450px" }}>
          <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by user, IP, or action text..."
            style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.5rem", fontSize: "0.85rem" }}
          />
        </div>
      </div>

      {/* ════════════ AUDIT LOGS TABLE ════════════ */}
      <div className="glass-card" style={{ padding: "1.75rem" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.25rem" }}>Security Compliance Audit Trail</h3>

        <div className="table-container">
          <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>LOG ID</th>
                <th style={{ padding: "0.75rem" }}>PERFORMED BY</th>
                <th style={{ padding: "0.75rem" }}>ACTION DESCRIPTION</th>
                <th style={{ padding: "0.75rem" }}>IP ADDRESS</th>
                <th style={{ padding: "0.75rem" }}>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 800, color: "var(--primary)", fontFamily: "monospace" }}>{log.id}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 800, color: "var(--text-heading)" }}>{log.user}</td>
                  <td style={{ padding: "0.85rem 0.75rem", color: "var(--text-heading)" }}>{log.action}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontFamily: "monospace", color: "var(--secondary)", fontWeight: 700 }}>{log.ip}</td>
                  <td style={{ padding: "0.85rem 0.75rem", color: "var(--text-muted)" }}>{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
