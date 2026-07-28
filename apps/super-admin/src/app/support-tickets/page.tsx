"use client";

import React, { useState } from "react";
import { 
  LifeBuoy, MessageSquare, AlertOctagon, Heart, Send, CheckCircle2, 
  Clock, AlertCircle, X, Search, Filter, Plus, ShieldCheck, ChevronRight 
} from "lucide-react";

export default function SupportTicketsPage() {
  const [activeTab, setActiveTab] = useState<"tickets" | "chat" | "complaints" | "feedback">("tickets");
  
  // Support Tickets State
  const [tickets, setTickets] = useState([
    { id: "TCK-8021", school: "Delhi Public School (Dwarka)", subject: "Bus GPS telemetry updates lagging by 10s", priority: "High", status: "Open", assignee: "Sanjay Kumar", date: "28 Jul 2026" },
    { id: "TCK-8022", school: "St. Xavier's Senior Secondary School", subject: "Unable to print GST Fee receipt in Parent App", priority: "Medium", status: "In Progress", assignee: "Anil Dev", date: "27 Jul 2026" },
    { id: "TCK-8023", school: "DAV Public School (Vasant Kunj)", subject: "Requesting custom database backup dump", priority: "Low", status: "Resolved", assignee: "Sanjay Kumar", date: "25 Jul 2026" },
    { id: "TCK-8024", school: "Kendriya Vidyalaya Sector 8", subject: "Principal login OTP authentication failing", priority: "High", status: "Open", assignee: "Anil Dev", date: "28 Jul 2026" }
  ]);

  // Complaints Ledger State
  const [complaints] = useState([
    { id: "CMP-401", school: "Kendriya Vidyalaya Sector 8", title: "SaaS server downtime during morning attendance marking", severity: "Critical", status: "Investigating", date: "28 Jul 2026" },
    { id: "CMP-402", school: "DAV Public School (Vasant Kunj)", title: "Slight lag in WhatsApp notification delivery", severity: "Low", status: "Closed", date: "24 Jul 2026" }
  ]);

  // Feedback CSAT State
  const [feedback] = useState([
    { id: "FDB-101", school: "Delhi Public School (Dwarka)", user: "Dr. Ashok Kumar (Principal)", score: "5/5 ★", comment: "Excellent ERP update! The live bus telemetry tracking works perfectly. Parent response has been great.", date: "28 Jul 2026" },
    { id: "FDB-102", school: "St. Xavier's Senior Secondary School", user: "Fr. Thomas D'Souza", score: "4/5 ★", comment: "The daily attendance marking toggle is super fast. Marks gradebook features are highly appreciated.", date: "27 Jul 2026" }
  ]);

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: "School Admin (DPS Dwarka)", text: "Hi, our morning bus telemetry is showing a lag of about 10 seconds. Is there a server update in progress?", time: "09:12 AM" },
    { sender: "SaaS Support Agent", text: "Hi! Yes, we are performing routine indexing on Cluster Alpha. The telemetry updates will be real-time within 2 minutes.", time: "09:13 AM" }
  ]);
  const [newChatText, setNewChatText] = useState("");

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText) return;
    setChatMessages([...chatMessages, { sender: "SaaS Support Agent (You)", text: newChatText, time: "Now" }]);
    setNewChatText("");
  };

  const handleResolveTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "Resolved" } : t));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="glass-card" style={{
        background: "linear-gradient(135deg, rgba(168, 85, 247, 0.22) 0%, rgba(99, 102, 241, 0.12) 100%)",
        border: "1px solid var(--border-glow)",
        padding: "1.75rem 2rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(168, 85, 247, 0.2)", border: "1px solid rgba(168, 85, 247, 0.4)", color: "#c084fc", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <LifeBuoy size={14} /> SaaS Client Support & Helpdesk
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Support Tickets, Live Chat & Feedback
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: "0.875rem" }}>
            Resolve school administration helpdesk tickets, respond to live chat requests, address critical complaints, and review CSAT feedback.
          </p>
        </div>
      </div>

      {/* 4 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        {[
          { id: "tickets", label: "Support Tickets Queue", icon: LifeBuoy },
          { id: "chat", label: "Live Support Chat", icon: MessageSquare },
          { id: "complaints", label: "Critical Complaints", icon: AlertOctagon },
          { id: "feedback", label: "CSAT Feedback Reviews", icon: Heart }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}>
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB 1: SUPPORT TICKETS QUEUE ════════════ */}
      {activeTab === "tickets" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>School Tenant</th>
                  <th>Ticket Subject</th>
                  <th>Priority</th>
                  <th>Assigned Agent</th>
                  <th>Date Opened</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{t.id}</td>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{t.school}</td>
                    <td style={{ fontWeight: 600 }}>{t.subject}</td>
                    <td>
                      <span className={`badge ${
                        t.priority === "High" ? "badge-danger" : t.priority === "Medium" ? "badge-warning" : "badge-info"
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{t.assignee}</td>
                    <td style={{ color: "var(--text-muted)" }}>{t.date}</td>
                    <td>
                      <span className={`badge ${
                        t.status === "Open" ? "badge-danger" : t.status === "In Progress" ? "badge-warning" : "badge-success"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {t.status !== "Resolved" ? (
                        <button onClick={() => handleResolveTicket(t.id)} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>
                          <CheckCircle2 size={14} /> Resolve Ticket
                        </button>
                      ) : (
                        <span className="badge badge-success">Closed ✅</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: LIVE SUPPORT CHAT ════════════ */}
      {activeTab === "chat" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "1.5rem" }}>
          
          {/* Chat Panel */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", height: "450px" }}>
            <div style={{ paddingBottom: "1rem", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 800, color: "#fff" }}>Live Chat Session — Delhi Public School</div>
              <span className="badge badge-success">Live Status Online</span>
            </div>

            {/* Message Area */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {chatMessages.map((m, idx) => (
                <div key={idx} style={{
                  alignSelf: m.sender.includes("You") || m.sender.includes("SaaS") ? "flex-end" : "flex-start",
                  maxWidth: "75%"
                }}>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginBottom: 2 }}>{m.sender}</div>
                  <div style={{
                    padding: "0.65rem 1rem",
                    borderRadius: "var(--radius-md)",
                    background: m.sender.includes("You") || m.sender.includes("SaaS") ? "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)" : "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-color)",
                    color: "#fff",
                    fontSize: "0.825rem"
                  }}>
                    {m.text}
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", textAlign: "right", marginTop: 2 }}>{m.time}</div>
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendChat} style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", display: "flex", gap: "0.75rem" }}>
              <input 
                type="text" 
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                placeholder="Type your response to school admin..."
                style={{ flex: 1, padding: "0.65rem", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
              />
              <button type="submit" className="btn btn-primary">
                <Send size={16} /> Send
              </button>
            </form>
          </div>

          {/* Active Chats Sidebar */}
          <div className="glass-card" style={{ padding: "1.25rem" }}>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Active Chats (1)
            </h3>
            <div style={{ padding: "0.75rem", borderRadius: "var(--radius-md)", background: "rgba(139,92,246,0.1)", border: "1px solid var(--primary)", cursor: "pointer" }}>
              <div style={{ fontWeight: 800, color: "#fff", fontSize: "0.825rem" }}>Delhi Public School</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>GPS telemetry lagging...</div>
            </div>
          </div>

        </div>
      )}

      {/* ════════════ TAB 3: CRITICAL COMPLAINTS ════════════ */}
      {activeTab === "complaints" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.25rem" }}>Platform Critical Complaints Ledger</h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>School Tenant</th>
                  <th>Complaint Description</th>
                  <th>Severity</th>
                  <th>Date Logged</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{c.id}</td>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{c.school}</td>
                    <td style={{ fontWeight: 600 }}>{c.title}</td>
                    <td>
                      <span className={`badge ${
                        c.severity === "Critical" ? "badge-danger" : "badge-warning"
                      }`}>
                        {c.severity}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{c.date}</td>
                    <td>
                      <span className="badge badge-info">{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: CSAT FEEDBACK ════════════ */}
      {activeTab === "feedback" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {feedback.map((f) => (
            <div key={f.id} className="glass-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <div>
                  <div style={{ fontWeight: 800, color: "#fff", fontSize: "1rem" }}>{f.school}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, marginTop: 2 }}>
                    Submitted by: {f.user} • {f.date}
                  </div>
                </div>
                <span className="badge badge-success" style={{ fontSize: "0.9rem", fontWeight: 900 }}>{f.score}</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                "{f.comment}"
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
