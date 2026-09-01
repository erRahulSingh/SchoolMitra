"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageSquare, Send, CheckCircle2, Clock, Filter, Search, Sparkles, 
  User, FileText, Upload, AlertTriangle, ShieldCheck, UserCheck, Check,
  Paperclip, ArrowRight, Bell, ChevronRight, FileCheck, CreditCard, Trash2, Edit3, Plus, X
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockData";

interface TicketMessage {
  sender: string;
  role?: string;
  text: string;
  time: string;
}

interface SupportTicket {
  id: string;
  _id?: string;
  studentName: string;
  className?: string;
  admissionNo?: string;
  parentName: string;
  parentPhone?: string;
  category: string;
  subject: string;
  status: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  createdDate: string;
  assignedTo?: string;
  attachments?: string[];
  messages?: TicketMessage[];
  replies?: TicketMessage[];
}

export default function SchoolAdminRequestManagementPage() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState("");
  const [uploadType, setUploadType] = useState("Receipt");
  const [officialAttachment, setOfficialAttachment] = useState("");
  const [assignedTeacher, setAssignedTeacher] = useState("Sunita Rao (Class 5-A Teacher)");

  // Tickets state
  const [requests, setRequests] = useState<SupportTicket[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    studentName: "Aarav Sharma",
    category: "Attendance Issue",
    subject: "Incorrect marked absent count",
    priority: "High" as const,
    parentMessage: "Aarav was present yesterday but marked absent in portal."
  });

  // Load from Express DB Sync
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/support/tickets");
      const data = await res.json();
      if (data.success && data.data.tickets) {
        setRequests(data.data.tickets);
      }
    } catch (e) {
      // Local fallback in case server is offline
      const cached = localStorage.getItem("sm_support_tickets");
      if (cached) {
        setRequests(JSON.parse(cached));
      } else {
        setRequests([
          {
            id: "REQ-2026-901",
            studentName: "Rahul Sharma",
            className: "Class 5-A",
            parentName: "Vijay Sharma",
            parentPhone: "+91 98111 22334",
            category: "Fee Issue",
            subject: "Fee payment receipt verification for Q1 Fee (₹ 18,500)",
            status: "In Progress",
            priority: "High",
            createdDate: "2026-07-28",
            assignedTo: "Accounts Office",
            replies: [
              { sender: "Vijay Sharma (Parent)", text: "Paid ₹ 18,500 via UPI yesterday. Invoice #INV-2026-9901.", time: "08:15 AM" },
              { sender: "Accounts Office", text: "Your fee payment has been verified. Receipt attached.", time: "09:30 AM" }
            ]
          },
          {
            id: "REQ-2026-844",
            studentName: "Ananya Patel",
            className: "Class 5-A",
            parentName: "Suresh Patel",
            parentPhone: "+91 98222 33445",
            category: "Leave Application",
            subject: "Sick leave application for Ananya Patel (24-25 Jul)",
            status: "Submitted",
            priority: "Urgent",
            createdDate: "Today, 09:00 AM",
            assignedTo: "Sunita Rao (Class 5-A Teacher)",
            replies: [
              { sender: "Suresh Patel (Parent)", text: "Ananya has viral fever and doctor advised 2 days rest. Doctor note attached.", time: "09:00 AM" }
            ]
          }
        ]);
      }
    }
  };

  const handleAdminReply = async () => {
    if (!replyText || !selectedTicket) return;
    const formattedReply = `${replyText} ${officialAttachment ? `\n[Official ${uploadType} Attached: ${officialAttachment}]` : ""}`;
    
    try {
      const res = await fetch(`http://localhost:5000/api/v1/support/tickets/${selectedTicket.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyText: formattedReply, status: selectedTicket.status })
      });
      const data = await res.json();
      if (data.success) {
        alert("Reply successfully logged in MongoDB database!");
        fetchTickets();
        setReplyText("");
        setOfficialAttachment("");
        setSelectedTicket(null);
      }
    } catch (err) {
      // Local fallback updates
      const updated = requests.map(r => {
        if (r.id === selectedTicket.id) {
          const currentReplies = r.replies || r.messages || [];
          return {
            ...r,
            status: "Waiting For Parent",
            replies: [
              ...currentReplies,
              {
                sender: `School Administration (${r.assignedTo || "Admin Desk"})`,
                text: formattedReply,
                time: "Just now"
              }
            ]
          };
        }
        return r;
      });
      setRequests(updated);
      try { localStorage.setItem("sm_support_tickets", JSON.stringify(updated)); } catch (e) {}
      setReplyText("");
      setOfficialAttachment("");
      setSelectedTicket(null);
      alert("Reply saved locally (offline mode).");
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedTicket) return;
    try {
      const res = await fetch(`http://localhost:5000/api/v1/support/tickets/${selectedTicket.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchTickets();
        setSelectedTicket(null);
      }
    } catch (err) {
      const updated = requests.map(r => r.id === selectedTicket.id ? { ...r, status: newStatus } : r);
      setRequests(updated);
      try { localStorage.setItem("sm_support_tickets", JSON.stringify(updated)); } catch (e) {}
      setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleAssignTeacher = (teacher: string) => {
    if (!selectedTicket) return;
    setAssignedTeacher(teacher);
    const updated = requests.map(r => r.id === selectedTicket.id ? { ...r, assignedTo: teacher } : r);
    setRequests(updated);
    try { localStorage.setItem("sm_support_tickets", JSON.stringify(updated)); } catch (e) {}
    setSelectedTicket(prev => prev ? { ...prev, assignedTo: teacher } : null);
  };

  const handleDeleteTicket = (id: string) => {
    if (confirm("Are you sure you want to delete this support request?")) {
      const updated = requests.filter(r => r.id !== id);
      setRequests(updated);
      try { localStorage.setItem("sm_support_tickets", JSON.stringify(updated)); } catch (e) {}
      setSelectedTicket(null);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.subject) return;

    try {
      const res = await fetch("http://localhost:5000/api/v1/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: "Guardian Parent",
          studentName: createForm.studentName,
          category: createForm.category,
          subject: createForm.subject,
          description: createForm.parentMessage,
          priority: createForm.priority
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Request ticket logged in MongoDB database: ${data.data.ticket.ticketNo}`);
        fetchTickets();
        setIsCreateOpen(false);
      }
    } catch (err) {
      const created: SupportTicket = {
        id: `REQ-${Date.now().toString().slice(-4)}`,
        studentName: createForm.studentName,
        className: "Class 10-A",
        parentName: "Guardian Parent",
        parentPhone: "+91 99999 88888",
        category: createForm.category,
        subject: createForm.subject,
        status: "Submitted",
        priority: createForm.priority,
        createdDate: "Just Now",
        assignedTo: "Accounts Office",
        replies: [
          { sender: "Guardian Parent", text: createForm.parentMessage, time: "Just Now" }
        ]
      };
      const updated = [created, ...requests];
      setRequests(updated);
      try { localStorage.setItem("sm_support_tickets", JSON.stringify(updated)); } catch (e) {}
      setIsCreateOpen(false);
      alert(`Support request ticket "${created.id}" created offline!`);
    }
  };

  const filteredRequests = requests.filter(r => {
    if (filterCategory !== "All" && r.category !== filterCategory) return false;
    if (filterStatus !== "All" && r.status !== filterStatus) return false;
    if (filterPriority !== "All" && r.priority !== filterPriority) return false;
    if (searchQuery && !r.subject.toLowerCase().includes(searchQuery.toLowerCase()) && !r.studentName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Stats recalculations
  const totalCount = requests.length;
  const pendingCount = requests.filter(r => r.status === "Submitted" || r.status === "Under Review" || r.status === "Open" || r.status === "OPEN").length;
  const progressCount = requests.filter(r => r.status === "In Progress" || r.status === "Waiting For Parent" || r.status === "InProgress").length;
  const resolvedCount = requests.filter(r => r.status === "Resolved" || r.status === "Closed").length;
  const urgentCount = requests.filter(r => r.priority === "Urgent" || r.priority === "High" || (r.priority as any) === "Critical").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Parent Support Requests &amp; Ticket Management <Sparkles size={22} color="var(--primary)" />
          </h1>
          <p style={{ marginTop: 4, margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Review parent applications, upload official receipts &amp; report cards, and send automatic push notifications.
          </p>
        </div>

        <button onClick={() => setIsCreateOpen(true)} className="btn btn-primary" style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}>
          <Plus size={16} /> Log Support Ticket
        </button>
      </div>

      {/* 5 WIDGETS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
        <div className="glass-card" style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 850 }}>TOTAL REQUESTS</span>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, margin: "2px 0", color: "var(--primary)" }}>{totalCount}</div>
        </div>

        <div className="glass-card" style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 850 }}>PENDING</span>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f59e0b", margin: "2px 0" }}>{pendingCount}</div>
        </div>

        <div className="glass-card" style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 850 }}>IN PROGRESS</span>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--secondary)", margin: "2px 0" }}>{progressCount}</div>
        </div>

        <div className="glass-card" style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 850 }}>RESOLVED</span>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--success)", margin: "2px 0" }}>{resolvedCount}</div>
        </div>

        <div className="glass-card" style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 850 }}>URGENT / HIGH</span>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#ef4444", margin: "2px 0" }}>{urgentCount}</div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="glass-card" style={{ padding: "1rem 1.25rem", display: "flex", gap: "0.85rem", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search student or ticket..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", outline: "none" }}
          />
        </div>

        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-main)", fontWeight: 700 }}>
          <option value="All">All Categories</option>
          <option value="Attendance Issue">Attendance Issue</option>
          <option value="Leave Application">Leave Application</option>
          <option value="Fee Issue">Fee Issue</option>
          <option value="Exam &amp; Report Card">Exam &amp; Report Card</option>
          <option value="Bus / Transport">Bus / Transport</option>
        </select>

        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-main)", fontWeight: 700 }}>
          <option value="All">All Statuses</option>
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="In Progress">In Progress</option>
          <option value="Waiting For Parent">Waiting For Parent</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-main)", fontWeight: 700 }}>
          <option value="All">All Priorities</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* TICKET DETAILS AND CONSOLE */}
      <div style={{ display: "grid", gridTemplateColumns: selectedTicket ? "380px 1fr" : "1fr", gap: "1.5rem" }}>
        
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Parent Support Requests ({filteredRequests.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "600px", overflowY: "auto" }}>
            {filteredRequests.map(req => (
              <div
                key={req.id}
                onClick={() => setSelectedTicket(req)}
                style={{
                  padding: "0.95rem 1rem", borderRadius: 10, cursor: "pointer",
                  background: selectedTicket?.id === req.id ? "rgba(99, 102, 241, 0.12)" : "var(--bg-input)",
                  border: selectedTicket?.id === req.id ? "1.5px solid var(--primary)" : "1px solid var(--border-color)",
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 800 }}>{req.id} &bull; {req.category}</span>
                  <span style={{
                    padding: "0.2rem 0.55rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 800,
                    background: req.priority === "Urgent" || req.priority === "High" ? "rgba(239, 68, 68, 0.15)" : "var(--border-color)",
                    color: req.priority === "Urgent" || req.priority === "High" ? "#ef4444" : "var(--text-muted)"
                  }}>
                    {req.priority}
                  </span>
                </div>
                <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text-heading)", marginTop: 5 }}>{req.subject}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>{req.studentName} &bull; {req.parentName}</div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteTicket(req.id); }} 
                  style={{ position: "absolute", right: 10, bottom: 10, background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedTicket ? (
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary)" }}>{selectedTicket.id} &bull; {selectedTicket.category}</span>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-heading)", marginTop: 2, margin: 0 }}>{selectedTicket.subject}</h2>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
                  Student: <strong>{selectedTicket.studentName} ({selectedTicket.className || "Class 10-A"})</strong> | Parent: <strong>{selectedTicket.parentName} ({selectedTicket.parentPhone || "+91 98111 22334"})</strong>
                </div>
              </div>

              <button
                onClick={() => handleStatusChange("Resolved")}
                className="btn btn-primary"
                style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", background: "var(--success)", border: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <CheckCircle2 size={16} /> Resolve &amp; Close Ticket
              </button>
            </div>

            {/* STATUS LIFECYCLE & ASSIGNMENT */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", background: "var(--bg-input)", padding: "1rem", borderRadius: 12, border: "1px solid var(--border-color)" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Status Lifecycle</label>
                <select
                  value={selectedTicket.status}
                  onChange={e => handleStatusChange(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-main)", fontWeight: 700, marginTop: 4 }}
                >
                  <option value="Submitted">1. Submitted</option>
                  <option value="Under Review">2. Under Review</option>
                  <option value="In Progress">3. In Progress</option>
                  <option value="Waiting For Parent">4. Waiting For Parent</option>
                  <option value="Resolved">5. Resolved</option>
                  <option value="Closed">6. Closed</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Assign Staff / Teacher</label>
                <select
                  value={selectedTicket.assignedTo || "Accounts Office"}
                  onChange={e => handleAssignTeacher(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-main)", fontWeight: 700, marginTop: 4 }}
                >
                  <option value="Sunita Rao (Class 5-A Teacher)">Sunita Rao (Class 5-A Teacher)</option>
                  <option value="Ram Singh (Driver Bus #01)">Ram Singh (Driver Bus #01)</option>
                  <option value="Accounts Office">Accounts Office</option>
                </select>
              </div>
            </div>

            {/* CONVERSATION MESSAGES */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxHeight: "350px", overflowY: "auto", padding: "1rem", borderRadius: 12, background: "var(--bg-input)", border: "1px solid var(--border-color)" }}>
              {(selectedTicket.replies || selectedTicket.messages || []).map((msg, idx) => {
                const isAdmin = msg.sender?.includes("School") || msg.sender?.includes("Admin") || msg.sender?.includes("Office");
                return (
                  <div key={idx} style={{
                    padding: "0.85rem 1rem", borderRadius: 12,
                    alignSelf: isAdmin ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    background: isAdmin ? "var(--primary)" : "var(--bg-card)",
                    color: isAdmin ? "#ffffff" : "var(--text-heading)",
                    border: isAdmin ? "none" : "1px solid var(--border-color)"
                  }}>
                    <div style={{ fontSize: "0.72rem", opacity: 0.8, fontWeight: 700 }}>{msg.sender} &bull; {msg.time}</div>
                    <div style={{ fontSize: "0.88rem", marginTop: 4, lineHeight: 1.4, whiteSpace: "pre-line" }}>{msg.text}</div>
                  </div>
                );
              })}
            </div>

            {/* REPLY BOX */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem" }}>
              <textarea
                rows={3}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Example: Your leave application has been approved. Thank you."
                style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: 8, border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-main)", fontSize: "0.88rem" }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <select value={uploadType} onChange={e => setUploadType(e.target.value)} style={{ padding: "0.35rem 0.65rem", borderRadius: 6, fontSize: "0.75rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-main)", fontWeight: 700 }}>
                    <option value="Receipt">Upload Receipt</option>
                    <option value="Report Card">Upload Report Card</option>
                    <option value="PDF">Upload PDF</option>
                  </select>

                  <input type="file" onChange={e => e.target.files && setOfficialAttachment(e.target.files[0].name)} id="admin-file-upload" style={{ display: "none" }} />
                  <label htmlFor="admin-file-upload" className="btn btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer" }}>
                    <Upload size={14} />
                    <span>{officialAttachment || `Upload ${uploadType}`}</span>
                  </label>
                </div>

                <button onClick={handleAdminReply} className="btn btn-primary" style={{ padding: "0.55rem 1.1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Send size={16} /> Send Reply &amp; Notify
                </button>
              </div>
            </div>

          </div>
        ) : null}

      </div>

      {/* ════════════ CREATE SUPPORT TICKET MODAL ════════════ */}
      {isCreateOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Log New Support Ticket</h3>
              <button onClick={() => setIsCreateOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STUDENT NAME</label>
                <select value={createForm.studentName} onChange={(e) => setCreateForm({ ...createForm, studentName: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  {MOCK_STUDENTS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CATEGORY</label>
                  <select value={createForm.category} onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Attendance Issue">Attendance Issue</option>
                    <option value="Leave Application">Leave Application</option>
                    <option value="Fee Issue">Fee Issue</option>
                    <option value="Bus / Transport">Bus / Transport</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PRIORITY</label>
                  <select value={createForm.priority} onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value as any })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT / BRIEF DESCRIPTION</label>
                <input type="text" value={createForm.subject} onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PARENT STATEMENT MESSAGE</label>
                <textarea rows={2} value={createForm.parentMessage} onChange={(e) => setCreateForm({ ...createForm, parentMessage: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsCreateOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Log Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
