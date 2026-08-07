"use client";

import React, { useState, useEffect } from "react";
import { 
  Bell, Send, Sparkles, Search, Filter, Trash2, X, Download, 
  CheckCircle2, Radio, Smartphone, MessageSquare, ShieldCheck 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function GlobalNotificationsAlertPage() {
  const [activeChannel, setActiveChannel] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [logs, setLogs] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalDispatched: 3,
    deliveryRate: "99.6%",
    totalCreditsUsed: "45,180",
    gatewayStatus: "FCM / Twilio Active Live"
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("All School Tenants");
  const [type, setType] = useState("Push Notification");
  const [message, setMessage] = useState("");

  const fetchNotifications = async () => {
    setLoading(true);
    const local = localStorage.getItem("saas_global_notifications");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) setLogs(parsed);
      } catch (e) {}
    }

    try {
      const res = await superAdminApi.getGlobalNotifications();
      if (res.success) {
        if (res.summary) setSummary(res.summary);
        if (res.logs && Array.isArray(res.logs) && res.logs.length > 0) {
          setLogs(res.logs);
          localStorage.setItem("saas_global_notifications", JSON.stringify(res.logs));
        }
      }
    } catch (err) {
      console.error("Error fetching global notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !recipient) return;

    const optimisticObj = {
      id: `n-${Date.now()}`,
      title,
      recipient,
      type,
      message: message || title,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Delivered",
      creditsUsed: Math.floor(1200 + Math.random() * 3000)
    };

    setLogs(prev => {
      const updated = [optimisticObj, ...prev];
      localStorage.setItem("saas_global_notifications", JSON.stringify(updated));
      return updated;
    });

    setIsModalOpen(false);
    setTitle("");
    setMessage("");

    try {
      const res = await superAdminApi.createGlobalNotification(optimisticObj);
      if (res.success && res.logs) {
        setLogs(res.logs);
        localStorage.setItem("saas_global_notifications", JSON.stringify(res.logs));
      }
    } catch (err) {
      console.error("Error dispatching notification:", err);
    }
  };

  const handleDeleteLog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notification dispatch record?")) return;

    setLogs(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem("saas_global_notifications", JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await superAdminApi.deleteGlobalNotification(id);
      if (res.success && res.logs) {
        setLogs(res.logs);
        localStorage.setItem("saas_global_notifications", JSON.stringify(res.logs));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Alert Title,Recipient Group,Channel,Dispatch Date,Status,Credits Used\n";
    logs.forEach(l => {
      csvContent += `"${l.id}","${l.title}","${l.recipient}","${l.type}","${l.date}","${l.status}","${l.creditsUsed || 1000}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SchoolMitra_Notification_Logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLogs = logs.filter(l => {
    const matchesSearch = (l.title || "").toLowerCase().includes(search.toLowerCase()) ||
                          (l.recipient || "").toLowerCase().includes(search.toLowerCase()) ||
                          (l.type || "").toLowerCase().includes(search.toLowerCase());

    if (activeChannel === "push") return matchesSearch && l.type.includes("Push");
    if (activeChannel === "sms") return matchesSearch && l.type.includes("SMS");
    if (activeChannel === "whatsapp") return matchesSearch && l.type.includes("WhatsApp");
    return matchesSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Bell size={14} /> Multi-Channel Alert Dispatcher
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Notifications & Broadcast Logs
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Dispatch push notifications, SMS alerts, and WhatsApp broadcasts across all user roles and tenant portals.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={handleExportCSV} className="btn btn-secondary">
            <Download size={16} /> Export Logs CSV
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Send size={16} /> Send Global Notification
          </button>
        </div>
      </div>

      {/* 4 SUMMARY STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Dispatched Alerts</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{logs.length} Broadcast Logs</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Across FCM, SMS & WhatsApp</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Delivery Success Rate</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>{summary.deliveryRate}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>Near 100% Delivery SLA</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Gateway Credits Used</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--secondary)", marginTop: 4 }}>{summary.totalCreditsUsed} Credits</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Twilio / WhatsApp API Quota</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Gateway Status</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>FCM / Twilio Live</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>MongoDB + Gateway Connected</div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH BAR */}
      <div className="glass-card" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { id: "all", label: `All Alerts (${logs.length})` },
            { id: "push", label: `Push Notifications` },
            { id: "sms", label: `SMS Alerts` },
            { id: "whatsapp", label: `WhatsApp` }
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveChannel(tab.id as any)} 
              className={`btn ${activeChannel === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: "0.8rem", padding: "0.4rem 0.85rem" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notification logs by title..."
            style={{ width: "100%", padding: "0.55rem 0.75rem 0.55rem 2.3rem", fontSize: "0.825rem" }}
          />
        </div>
      </div>

      {/* ════════════ NOTIFICATION LOGS TABLE ════════════ */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div className="table-container">
          <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>ALERT TITLE</th>
                <th style={{ padding: "0.75rem" }}>TARGET RECIPIENTS</th>
                <th style={{ padding: "0.75rem" }}>CHANNEL</th>
                <th style={{ padding: "0.75rem" }}>DISPATCH DATE</th>
                <th style={{ padding: "0.75rem" }}>CREDITS</th>
                <th style={{ padding: "0.75rem" }}>DELIVERY STATUS</th>
                <th style={{ padding: "0.75rem", textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 800, color: "var(--text-heading)" }}>{log.title}</td>
                  <td style={{ padding: "0.85rem 0.75rem", color: "var(--text-heading)" }}>{log.recipient}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>
                    <span className="badge badge-info">{log.type}</span>
                  </td>
                  <td style={{ padding: "0.85rem 0.75rem", color: "var(--text-muted)" }}>{log.date}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--secondary)" }}>
                    {log.creditsUsed ? log.creditsUsed.toLocaleString("en-IN") : "1,200"}
                  </td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>
                    <span className="badge badge-success">{log.status}</span>
                  </td>
                  <td style={{ padding: "0.85rem 0.75rem", textAlign: "right" }}>
                    <button onClick={() => handleDeleteLog(log.id)} className="btn btn-secondary" style={{ padding: "0.35rem 0.55rem", color: "var(--danger)" }}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEND GLOBAL NOTIFICATION MODAL */}
      {isModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-heading)" }}>Dispatch Global Notification Alert</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSendNotification} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ALERT TITLE</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Urgent SOS Transport Advisory / Fee Reminder" 
                  required 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TARGET RECIPIENT GROUP</label>
                <select value={recipient} onChange={(e) => setRecipient(e.target.value)} style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }}>
                  <option value="All School Tenants">All School Tenants</option>
                  <option value="All Transport Supervisors">All Transport Supervisors & Drivers</option>
                  <option value="Parent Accounts">Parent Accounts</option>
                  <option value="School Principals & IT Admins">School Principals & IT Admins</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>NOTIFICATION CHANNEL</label>
                <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }}>
                  <option value="Push Notification">Push Notification (FCM PWA)</option>
                  <option value="SMS + Push">SMS + Push Notification Dual</option>
                  <option value="WhatsApp Broadcast">WhatsApp Official Gateway Broadcast</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>NOTIFICATION MESSAGE BODY</label>
                <textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  rows={3} 
                  placeholder="Enter the alert message body text..." 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem", resize: "vertical" }} 
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Dispatch Alert to DB</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
