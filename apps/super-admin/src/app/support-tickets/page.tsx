"use client";

import React, { useState, useEffect } from "react";
import { 
  LifeBuoy, MessageSquare, AlertOctagon, Heart, Send, CheckCircle2, 
  Clock, AlertCircle, X, Search, Filter, Plus, ShieldCheck, ChevronRight, Check, Star 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function SupportTicketsPage() {
  const [activeTab, setActiveTab] = useState<"tickets" | "chat" | "complaints" | "feedback">("tickets");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Helpdesk State
  const [tickets, setTickets] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalTickets: 4,
    openCount: 2,
    inProgressCount: 1,
    resolvedCount: 1,
    csatScore: "4.9 / 5 ★",
    avgSlaResponse: "8 Mins"
  });

  // Modal & Chat State
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newPriority, setNewPriority] = useState("High");
  const [newCategory, setNewCategory] = useState("Transport Telemetry");

  const [newChatText, setNewChatText] = useState("");

  const fetchSupportData = async () => {
    setLoading(true);
    // Load local storage fallback immediately
    const local = localStorage.getItem("saas_support_tickets");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) setTickets(parsed);
      } catch (e) {}
    }

    try {
      const res = await superAdminApi.getSupportTickets();
      if (res.success) {
        if (res.summary) setSummary(res.summary);
        if (res.tickets && Array.isArray(res.tickets)) {
          setTickets(res.tickets);
          localStorage.setItem("saas_support_tickets", JSON.stringify(res.tickets));
        }
        if (res.chatMessages && Array.isArray(res.chatMessages)) setChatMessages(res.chatMessages);
        if (res.complaints && Array.isArray(res.complaints)) setComplaints(res.complaints);
        if (res.feedback && Array.isArray(res.feedback)) setFeedback(res.feedback);
      }
    } catch (err) {
      console.error("Error fetching support tickets data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportData();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName || !newSubject) return;

    const optimisticTicket = {
      id: `TCK-${Math.floor(8025 + Math.random() * 90)}`,
      school: newSchoolName,
      subject: newSubject,
      priority: newPriority,
      status: "Open",
      assignee: "Sanjay Kumar",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      category: newCategory
    };

    setTickets(prev => {
      const updated = [optimisticTicket, ...prev];
      localStorage.setItem("saas_support_tickets", JSON.stringify(updated));
      return updated;
    });

    setIsTicketModalOpen(false);
    setNewSchoolName("");
    setNewSubject("");

    try {
      const res = await superAdminApi.createSupportTicket(optimisticTicket);
      if (res.success && res.tickets) {
        setTickets(res.tickets);
        localStorage.setItem("saas_support_tickets", JSON.stringify(res.tickets));
      }
    } catch (err) {
      console.error("Error creating support ticket:", err);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setTickets(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, status } : t);
      localStorage.setItem("saas_support_tickets", JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await superAdminApi.updateSupportTicket(id, { status });
      if (res.success && res.tickets) {
        setTickets(res.tickets);
        localStorage.setItem("saas_support_tickets", JSON.stringify(res.tickets));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText) return;

    const msgText = newChatText;
    setNewChatText("");

    const newMsg = {
      sender: "SaaS Support Agent (You)",
      text: msgText,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages(prev => [...prev, newMsg]);

    try {
      const res = await superAdminApi.sendSupportChatMessage({ text: msgText, sender: "SaaS Support Agent (You)" });
      if (res.success && res.chatMessages) {
        setChatMessages(res.chatMessages);
      }
    } catch (err) {
      console.error("Error sending chat message:", err);
    }
  };

  const filteredTickets = tickets.filter(t =>
    (t.school || "").toLowerCase().includes(search.toLowerCase()) ||
    (t.id || "").toLowerCase().includes(search.toLowerCase()) ||
    (t.subject || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <LifeBuoy size={14} /> SaaS Client Support & Helpdesk
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Support Tickets, Live Chat & Feedback
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.875rem" }}>
            Resolve school administration helpdesk tickets, respond to live chat requests, address critical complaints, and review CSAT feedback.
          </p>
        </div>

        <button onClick={() => setIsTicketModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Log New Support Ticket
        </button>
      </div>

      {/* 4 SUMMARY STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Open Tickets Queue</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--danger)", marginTop: 4 }}>{tickets.filter(t => t.status === "Open").length} Tickets Active</div>
          <div style={{ fontSize: "0.75rem", color: "var(--danger)", fontWeight: 700, marginTop: 4 }}>Awaiting Helpdesk Agent Response</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Average SLA Response Time</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{summary.avgSlaResponse}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>High SLA Compliance Guaranteed</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>CSAT Satisfaction Rating</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>{summary.csatScore}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>Principal & Admin Satisfaction</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Tickets Resolved Today</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>{tickets.filter(t => t.status === "Resolved").length} Closed</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>100% DB Synchronized</div>
        </div>
      </div>

      {/* 4 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        {[
          { id: "tickets", label: `Support Tickets Queue (${tickets.length})`, icon: LifeBuoy },
          { id: "chat", label: `Live Support Chat (${chatMessages.length})`, icon: MessageSquare },
          { id: "complaints", label: `Critical Complaints (${complaints.length})`, icon: AlertOctagon },
          { id: "feedback", label: `CSAT Feedback (${feedback.length})`, icon: Heart }
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
      {activeTab === "tickets" && (
        <div className="glass-card" style={{ padding: "1.25rem 1.5rem" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "450px" }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tickets by ID, school, or subject..."
              style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.5rem", fontSize: "0.85rem" }}
            />
          </div>
        </div>
      )}

      {/* ════════════ TAB 1: SUPPORT TICKETS QUEUE ════════════ */}
      {activeTab === "tickets" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div className="table-container">
            <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <th style={{ padding: "0.75rem" }}>TICKET ID</th>
                  <th style={{ padding: "0.75rem" }}>SCHOOL TENANT</th>
                  <th style={{ padding: "0.75rem" }}>SUBJECT / QUERY</th>
                  <th style={{ padding: "0.75rem" }}>PRIORITY</th>
                  <th style={{ padding: "0.75rem" }}>ASSIGNED AGENT</th>
                  <th style={{ padding: "0.75rem" }}>DATE OPENED</th>
                  <th style={{ padding: "0.75rem" }}>STATUS</th>
                  <th style={{ padding: "0.75rem", textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((t) => (
                  <tr key={t.id} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                    <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{t.id}</td>
                    <td style={{ padding: "0.85rem 0.75rem", fontWeight: 800, color: "var(--text-heading)" }}>{t.school}</td>
                    <td style={{ padding: "0.85rem 0.75rem", color: "var(--text-heading)" }}>{t.subject}</td>
                    <td style={{ padding: "0.85rem 0.75rem" }}>
                      <span className={`badge ${
                        t.priority === "High" ? "badge-danger" : t.priority === "Medium" ? "badge-warning" : "badge-info"
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td style={{ padding: "0.85rem 0.75rem", color: "var(--text-muted)" }}>{t.assignee}</td>
                    <td style={{ padding: "0.85rem 0.75rem", color: "var(--text-muted)" }}>{t.date}</td>
                    <td style={{ padding: "0.85rem 0.75rem" }}>
                      <span className={`badge ${
                        t.status === "Open" ? "badge-danger" : t.status === "In Progress" ? "badge-warning" : "badge-success"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.85rem 0.75rem", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                        {t.status !== "Resolved" && (
                          <button onClick={() => handleUpdateStatus(t.id, "Resolved")} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>
                            <Check size={14} /> Mark Resolved
                          </button>
                        )}
                        {t.status === "Open" && (
                          <button onClick={() => handleUpdateStatus(t.id, "In Progress")} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>
                            In Progress
                          </button>
                        )}
                      </div>
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
        <div className="glass-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem", minHeight: "450px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>Live Client Support Chat Stream</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Direct messaging channel with subscriber school principals & IT admins.</p>
            </div>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.35rem 0.65rem", borderRadius: "99px", background: "rgba(16,185,129,0.15)", color: "var(--success)", fontSize: "0.72rem", fontWeight: 800 }}>
              Agent Active Online
            </span>
          </div>

          {/* CHAT MESSAGES STREAM */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1, overflowY: "auto", padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(0,0,0,0.15)", border: "1px solid var(--border-color)", maxHeight: "350px" }}>
            {chatMessages.map((msg, idx) => {
              const isMe = msg.sender.includes("Agent") || msg.sender.includes("You");
              return (
                <div key={idx} style={{
                  display: "flex", flexDirection: "column",
                  alignItems: isMe ? "flex-end" : "flex-start"
                }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, marginBottom: 2 }}>
                    {msg.sender} • {msg.time}
                  </div>
                  <div style={{
                    padding: "0.75rem 1rem", borderRadius: "14px",
                    background: isMe ? "var(--primary)" : "var(--btn-secondary-bg)",
                    color: isMe ? "#ffffff" : "var(--text-heading)",
                    maxWidth: "70%", fontSize: "0.85rem", lineHeight: 1.4,
                    border: isMe ? "none" : "1px solid var(--border-color)"
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* INPUT FORM */}
          <form onSubmit={handleSendChat} style={{ display: "flex", gap: "0.75rem" }}>
            <input 
              type="text" 
              value={newChatText}
              onChange={(e) => setNewChatText(e.target.value)}
              placeholder="Type your response to school administrator..."
              style={{ flex: 1, padding: "0.75rem 1rem", fontSize: "0.85rem" }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
              <Send size={16} /> Send Reply
            </button>
          </form>
        </div>
      )}

      {/* ════════════ TAB 3: CRITICAL COMPLAINTS ════════════ */}
      {activeTab === "complaints" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.25rem" }}>Critical Client Complaints Ledger</h3>
          <div className="table-container">
            <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <th style={{ padding: "0.75rem" }}>COMPLAINT ID</th>
                  <th style={{ padding: "0.75rem" }}>SCHOOL TENANT</th>
                  <th style={{ padding: "0.75rem" }}>COMPLAINT TITLE</th>
                  <th style={{ padding: "0.75rem" }}>SEVERITY</th>
                  <th style={{ padding: "0.75rem" }}>DATE</th>
                  <th style={{ padding: "0.75rem" }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                    <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{c.id}</td>
                    <td style={{ padding: "0.85rem 0.75rem", fontWeight: 800, color: "var(--text-heading)" }}>{c.school}</td>
                    <td style={{ padding: "0.85rem 0.75rem", color: "var(--text-heading)" }}>{c.title}</td>
                    <td style={{ padding: "0.85rem 0.75rem" }}>
                      <span className={`badge ${c.severity === "Critical" ? "badge-danger" : "badge-info"}`}>
                        {c.severity}
                      </span>
                    </td>
                    <td style={{ padding: "0.85rem 0.75rem", color: "var(--text-muted)" }}>{c.date}</td>
                    <td style={{ padding: "0.85rem 0.75rem" }}>
                      <span className={`badge ${c.status === "Investigating" ? "badge-warning" : "badge-success"}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: CSAT FEEDBACK REVIEWS ════════════ */}
      {activeTab === "feedback" && (
        <div className="glass-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>Subscriber Principal & CSAT Feedback Reviews</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {feedback.map((f) => (
              <div key={f.id} style={{
                padding: "1.25rem", borderRadius: "var(--radius-md)", background: "var(--btn-secondary-bg)",
                border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.75rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 800, color: "var(--text-heading)", fontSize: "0.95rem" }}>{f.school}</div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#f59e0b" }}>{f.score}</span>
                </div>
                <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.4 }}>"{f.comment}"</div>
                <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.5rem", fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700 }}>
                  Reviewer: {f.user} • {f.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE SUPPORT TICKET MODAL */}
      {isTicketModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-heading)" }}>Log New Support Ticket</h3>
              <button onClick={() => setIsTicketModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateTicket} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SCHOOL TENANT NAME</label>
                <input 
                  type="text" 
                  value={newSchoolName} 
                  onChange={(e) => setNewSchoolName(e.target.value)} 
                  placeholder="e.g. Delhi Public School (Dwarka)" 
                  required 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TICKET SUBJECT / ISSUE SUMMARY</label>
                <input 
                  type="text" 
                  value={newSubject} 
                  onChange={(e) => setNewSubject(e.target.value)} 
                  placeholder="e.g. Bus GPS telemetry update delay" 
                  required 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TICKET PRIORITY</label>
                  <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }}>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CATEGORY</label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }}>
                    <option value="Transport Telemetry">Transport Telemetry</option>
                    <option value="Fee Billing & GST">Fee Billing & GST</option>
                    <option value="Authentication & Security">Authentication & Security</option>
                    <option value="Database Dump Request">Database Dump Request</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsTicketModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Publish Ticket to DB</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
