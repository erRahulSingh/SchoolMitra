"use client";

import React, { useState } from "react";
import { 
  MessageSquare, Send, CheckCircle2, Clock, Filter, Search, Sparkles, 
  User, FileText, Upload, AlertTriangle, ShieldCheck, UserCheck, Check,
  Paperclip, ArrowRight, Bell, ChevronRight, FileCheck, CreditCard
} from "lucide-react";

export default function SchoolAdminRequestManagementPage() {
  const [stats] = useState({
    total: 142,
    pending: 18,
    inProgress: 12,
    resolved: 112,
    highPriority: 4
  });

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [replyText, setReplyText] = useState("");
  const [uploadType, setUploadType] = useState("Receipt");
  const [officialAttachment, setOfficialAttachment] = useState("");
  const [assignedTeacher, setAssignedTeacher] = useState("Sunita Rao (Class 5-A Teacher)");

  const [requests, setRequests] = useState([
    {
      id: "REQ-2026-901",
      studentName: "Rahul Sharma",
      className: "Class 5-A",
      admissionNo: "ADM-2026-101",
      parentName: "Vijay Sharma",
      parentPhone: "+91 98111 22334",
      category: "Fee Issue",
      subject: "Fee payment receipt verification for Q1 Fee (₹ 18,500)",
      status: "In Progress",
      priority: "High",
      createdDate: "28 Jul 2026",
      assignedTo: "Accounts Office",
      attachments: ["UPI_Payment_Proof_Screenshot.png"],
      messages: [
        { sender: "Vijay Sharma (Parent)", role: "Parent", text: "Paid ₹ 18,500 via UPI yesterday. Invoice #INV-2026-9901.", time: "08:15 AM" },
        { sender: "Accounts Office", role: "SchoolAdmin", text: "Your fee payment has been verified.\nReceipt attached.\nThank you.", time: "09:30 AM" }
      ]
    },
    {
      id: "REQ-2026-844",
      studentName: "Ananya Patel",
      className: "Class 5-A",
      admissionNo: "ADM-2026-102",
      parentName: "Suresh Patel",
      parentPhone: "+91 98222 33445",
      category: "Leave Application",
      subject: "Sick leave application for Ananya Patel (24-25 Jul)",
      status: "Submitted",
      priority: "Urgent",
      createdDate: "Today, 09:00 AM",
      assignedTo: "Sunita Rao (Class 5-A Teacher)",
      attachments: ["Medical_Certificate_Doctor_Note.pdf"],
      messages: [
        { sender: "Suresh Patel (Parent)", role: "Parent", text: "Ananya has viral fever and doctor advised 2 days rest. Doctor note attached.", time: "09:00 AM" }
      ]
    }
  ]);

  const handleAdminReply = () => {
    if (!replyText || !selectedTicket) return;
    const formattedReply = `${replyText} ${officialAttachment ? `\n[Official ${uploadType} Attached: ${officialAttachment}]` : ""}`;
    
    const updated = requests.map(r => {
      if (r.id === selectedTicket.id) {
        return {
          ...r,
          status: "Waiting For Parent",
          messages: [
            ...r.messages,
            {
              sender: `School Administration (${assignedTeacher})`,
              role: "SchoolAdmin",
              text: formattedReply,
              time: "Just now"
            }
          ]
        };
      }
      return r;
    });
    setRequests(updated);
    setSelectedTicket(updated.find(r => r.id === selectedTicket.id));
    setReplyText("");
    setOfficialAttachment("");
  };

  const handleStatusChange = (newStatus: string) => {
    if (!selectedTicket) return;
    const updated = requests.map(r => r.id === selectedTicket.id ? { ...r, status: newStatus } : r);
    setRequests(updated);
    setSelectedTicket((prev: any) => prev ? { ...prev, status: newStatus } : null);
  };

  const handleAssignTeacher = (teacher: string) => {
    if (!selectedTicket) return;
    setAssignedTeacher(teacher);
    const updated = requests.map(r => r.id === selectedTicket.id ? { ...r, assignedTo: teacher } : r);
    setRequests(updated);
    setSelectedTicket((prev: any) => prev ? { ...prev, assignedTo: teacher } : null);
  };

  const filteredRequests = requests.filter(r => {
    if (filterCategory !== "All" && r.category !== filterCategory) return false;
    if (filterStatus !== "All" && r.status !== filterStatus) return false;
    if (filterClass !== "All" && r.className !== filterClass) return false;
    if (filterPriority !== "All" && r.priority !== filterPriority) return false;
    if (searchQuery && !r.subject.toLowerCase().includes(searchQuery.toLowerCase()) && !r.studentName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Parent Support Requests &amp; Ticket Management <Sparkles size={22} color="var(--primary)" />
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Review parent applications, upload official receipts &amp; report cards, and send automatic push notifications.
          </p>
        </div>
      </div>

      {/* 5 WIDGETS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "rgba(99, 102, 241, 0.15)", color: "var(--primary)" }}>
            <MessageSquare size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Total Requests</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, margin: "2px 0" }}>{stats.total}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>All Time Parent Tickets</div>
          </div>
        </div>

        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
            <Clock size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Pending</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f59e0b", margin: "2px 0" }}>{stats.pending}</div>
            <div style={{ fontSize: "0.72rem", color: "#f59e0b", fontWeight: 700 }}>Needs Review</div>
          </div>
        </div>

        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "rgba(6, 182, 212, 0.15)", color: "var(--secondary)" }}>
            <UserCheck size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)" }}>In Progress</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--secondary)", margin: "2px 0" }}>{stats.inProgress}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--secondary)" }}>Assigned to Teachers</div>
          </div>
        </div>

        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "var(--success-bg)", color: "var(--success)" }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Resolved</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--success)", margin: "2px 0" }}>{stats.resolved}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--success)" }}>Completed &amp; Closed</div>
          </div>
        </div>

        <div className="glass-card stat-card" style={{ padding: "1.1rem 1.25rem" }}>
          <div className="stat-icon" style={{ background: "rgba(239, 68, 68, 0.15)", color: "#ef4444" }}>
            <AlertTriangle size={22} />
          </div>
          <div className="stat-info">
            <h4 style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "var(--text-muted)" }}>Urgent / High</h4>
            <div className="stat-value" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ef4444", margin: "2px 0" }}>{stats.highPriority}</div>
            <div style={{ fontSize: "0.72rem", color: "#ef4444", fontWeight: 700 }}>Urgent Action Needed</div>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="glass-card" style={{ padding: "1rem 1.25rem", display: "flex", gap: "0.85rem", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: "200px", background: "var(--bg-input)", padding: "0.45rem 0.75rem", borderRadius: 8, border: "1px solid var(--border-color)" }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search student or ticket..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ border: "none", background: "transparent", outline: "none", color: "var(--text-heading)", width: "100%", fontSize: "0.85rem" }}
          />
        </div>

        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)" }}>
          <option value="All">All Categories</option>
          <option value="Attendance Issue">Attendance Issue</option>
          <option value="Leave Application">Leave Application</option>
          <option value="Fee Issue">Fee Issue</option>
          <option value="Exam &amp; Report Card">Exam &amp; Report Card</option>
          <option value="Bus / Transport">Bus / Transport</option>
        </select>

        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)" }}>
          <option value="All">All Statuses</option>
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="In Progress">In Progress</option>
          <option value="Waiting For Parent">Waiting For Parent</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)" }}>
          <option value="All">All Priorities</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* REQUEST DETAILS & CONSOLE */}
      <div style={{ display: "grid", gridTemplateColumns: selectedTicket ? "380px 1fr" : "1fr", gap: "1.5rem" }}>
        
        <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-heading)" }}>Parent Requests ({filteredRequests.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "600px", overflowY: "auto" }}>
            {filteredRequests.map(req => (
              <div
                key={req.id}
                onClick={() => setSelectedTicket(req)}
                style={{
                  padding: "0.95rem 1rem", borderRadius: 10, cursor: "pointer",
                  background: selectedTicket?.id === req.id ? "rgba(99, 102, 241, 0.12)" : "var(--btn-secondary-bg)",
                  border: selectedTicket?.id === req.id ? "1px solid var(--primary)" : "1px solid var(--border-color)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 800 }}>{req.id} &bull; {req.category}</span>
                  <span style={{
                    padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 800,
                    background: req.priority === "Urgent" || req.priority === "High" ? "rgba(239, 68, 68, 0.15)" : "var(--btn-secondary-bg)",
                    color: req.priority === "Urgent" || req.priority === "High" ? "#ef4444" : "var(--text-muted)"
                  }}>
                    {req.priority}
                  </span>
                </div>
                <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text-heading)", marginTop: 4 }}>{req.subject}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>{req.studentName} &bull; {req.parentName}</div>
              </div>
            ))}
          </div>
        </div>

        {selectedTicket ? (
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary)" }}>{selectedTicket.id} &bull; {selectedTicket.category}</span>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-heading)", marginTop: 2 }}>{selectedTicket.subject}</h2>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
                  Student: <strong>{selectedTicket.studentName} ({selectedTicket.className})</strong> | Parent: <strong>{selectedTicket.parentName} ({selectedTicket.parentPhone})</strong>
                </div>
              </div>

              <button
                onClick={() => handleStatusChange("Resolved")}
                className="btn btn-primary"
                style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", background: "var(--success)", border: "none" }}
              >
                <CheckCircle2 size={16} />
                <span>Resolve &amp; Send Push Alert</span>
              </button>
            </div>

            {/* STATUS LIFECYCLE & ASSIGNMENT */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", background: "var(--btn-secondary-bg)", padding: "1rem", borderRadius: 12, border: "1px solid var(--border-color)" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Status Lifecycle</label>
                <select
                  value={selectedTicket.status}
                  onChange={e => handleStatusChange(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)", fontWeight: 700, marginTop: 4 }}
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
                  value={selectedTicket.assignedTo}
                  onChange={e => handleAssignTeacher(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)", fontWeight: 700, marginTop: 4 }}
                >
                  <option value="Sunita Rao (Class 5-A Teacher)">Sunita Rao (Class 5-A Teacher)</option>
                  <option value="Ram Singh (Driver Bus #01)">Ram Singh (Driver Bus #01)</option>
                  <option value="Accounts Office">Accounts Office</option>
                </select>
              </div>
            </div>

            {/* CONVERSATION MESSAGES */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxHeight: "350px", overflowY: "auto", padding: "1rem", borderRadius: 12, background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)" }}>
              {selectedTicket.messages.map((msg: any, idx: number) => {
                const isAdmin = msg.role === "SchoolAdmin";
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

            {/* ADMIN REPLY & OFFICIAL UPLOAD OPTIONS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem" }}>
              <textarea
                rows={3}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Example: Your fee payment has been verified. Receipt attached. Thank you."
                style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: 8, border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)", fontSize: "0.88rem" }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <select value={uploadType} onChange={e => setUploadType(e.target.value)} style={{ padding: "0.35rem 0.65rem", borderRadius: 6, fontSize: "0.75rem", border: "1px solid var(--border-color)", background: "var(--bg-input)" }}>
                    <option value="Receipt">Upload Receipt</option>
                    <option value="Report Card">Upload Report Card</option>
                    <option value="PDF">Upload PDF</option>
                    <option value="Image">Upload Image</option>
                  </select>

                  <input type="file" onChange={e => e.target.files && setOfficialAttachment(e.target.files[0].name)} id="admin-file-upload" style={{ display: "none" }} />
                  <label htmlFor="admin-file-upload" className="btn btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}>
                    <Upload size={14} />
                    <span>{officialAttachment || `Upload ${uploadType}`}</span>
                  </label>
                </div>

                <button onClick={handleAdminReply} className="btn btn-primary" style={{ padding: "0.55rem 1.1rem" }}>
                  <Send size={16} />
                  <span>Send Reply &amp; Push Alert</span>
                </button>
              </div>
            </div>

          </div>
        ) : null}

      </div>

    </div>
  );
}
