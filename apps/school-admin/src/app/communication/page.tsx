"use client";

import React, { useState } from "react";
import {
  MessageSquare, Send, AlertTriangle, Search, Filter, Plus, X,
  Calendar, FileText, Bell, Users, BarChart3, HelpCircle, UserCheck,
  CheckCircle2, Star, ThumbsUp, Trash2, ShieldAlert, Upload, Paperclip
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockData";

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState<"support" | "announcements" | "push_notifications" | "chat" | "circulars" | "events" | "holidays" | "feedback" | "polls" | "analytics">("support");

  // ── Support Tickets (Module 1) ──
  const [tickets, setTickets] = useState([
    { id: "TCK-1021", parent: "Parent of Aarav Sharma", type: "Fee Issue", subject: "Double deduction in July fees", date: "Today", status: "Open", assignee: "Accounts Desk" },
    { id: "TCK-1022", parent: "Parent of Ananya Patel", type: "Leave Application", subject: "Ananya needs leave for family function", date: "Yesterday", status: "In Progress", assignee: "Class Teacher" },
    { id: "TCK-1023", parent: "Parent of Rohan Verma", type: "Transport Complaint", subject: "Route 1 Bus delayed by 25 mins", date: "28 Jul 2026", status: "Closed", assignee: "Transport Admin" }
  ]);
  const [ticketReplyText, setTicketReplyText] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState("TCK-1021");

  // ── Announcements (Module 2) ──
  const [announcements, setAnnouncements] = useState([
    { id: "ANN-01", title: "Independence Day Dress Code Announcement", target: "Entire School", date: "Today", category: "Holiday" },
    { id: "ANN-02", title: "Syllabus details for CBSE Mid-term Exams", target: "Class 10", date: "Yesterday", category: "Circular" }
  ]);
  const [newAnn, setNewAnn] = useState({ title: "", target: "Entire School", category: "Circular" });
  const [isAddAnnOpen, setIsAddAnnOpen] = useState(false);

  // ── FCM Push Notifications (Module 3) ──
  const triggerPushAlert = (type: string) => {
    alert(`FCM push notification broadcast dispatched successfully: [Category: ${type}]`);
  };

  // ── Chat Module (Module 4) ──
  const [chatRooms, setChatRooms] = useState([
    { id: "CR-01", title: "Parent of Aarav Sharma ↔ Principal", type: "Parent-Admin", lastMsg: "Please share the circular link." },
    { id: "CR-02", title: "Sunita Rao ↔ Parent of Kabir Singh", type: "Teacher-Parent", lastMsg: "Kabir is doing well in algebra." },
    { id: "CR-03", title: "Driver Ram Singh ↔ Transport Desk", type: "Driver-Admin", lastMsg: "Reached stop Dwarka Sector 12." }
  ]);
  const [activeChatRoomId, setActiveChatRoomId] = useState("CR-01");
  const [chatMessages, setChatMessages] = useState<Record<string, { sender: string, text: string, time: string }[]>>({
    "CR-01": [
      { sender: "Parent", text: "Hello, when is the next PTA meeting scheduled?", time: "09:42 AM" },
      { sender: "Admin", text: "Hello! It is scheduled for Saturday, 5th September. Details have been spooled to the Events board.", time: "09:45 AM" }
    ],
    "CR-02": [
      { sender: "Teacher", text: "Please ensure Kabir submits the algebra homework by tomorrow.", time: "Yesterday" }
    ]
  });
  const [typedChatMsg, setTypedChatMsg] = useState("");

  const handleSendChatMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedChatMsg) return;
    const currentMsgs = chatMessages[activeChatRoomId] || [];
    setChatMessages({
      ...chatMessages,
      [activeChatRoomId]: [...currentMsgs, { sender: "Admin", text: typedChatMsg, time: "Just Now" }]
    });
    setTypedChatMsg("");
  };

  // ── Circulars (Module 5) ──
  const [circulars, setCirculars] = useState([
    { id: "CIR-01", title: "Monthly Academic Planner — August 2026", format: "PDF Document", date: "Today", seen: 142, downloads: 85 },
    { id: "CIR-02", title: "PTA Assembly guidelines & code of conduct", format: "Image Flyer", date: "24 July 2026", seen: 245, downloads: 120 }
  ]);

  // ── Events Planner (Module 6) ──
  const [events, setEvents] = useState([
    { id: "EVT-01", title: "Annual Independence Day Assembly", date: "15 Aug 2026", type: "School Event", registered: "450 Parents" },
    { id: "EVT-02", title: "Parent-Teacher Council Conference", date: "05 Sept 2026", type: "PTM", registered: "120 Parents" }
  ]);

  // ── Holiday Mappings (Module 7) ──
  const [holidays, setHolidays] = useState([
    { id: "HOL-01", name: "Independence Day Celebration", date: "15 Aug 2026", type: "National Holiday", status: "Synced with Parent App" },
    { id: "HOL-02", name: "Raksha Bandhan Holiday", date: "31 Aug 2026", type: "School Holiday", status: "Synced with Parent App" }
  ]);

  // ── Feedback Star reviews (Module 8) ──
  const [feedbacks] = useState([
    { id: "FDB-01", parent: "Parent of Aarav Sharma", rating: 5, category: "Teacher Performance", comments: "Sunita maam teaches algebra very well." },
    { id: "FDB-02", parent: "Parent of Rohan Verma", rating: 3, category: "Bus Service", comments: "Route 1 has delay issues sometimes." },
    { id: "FDB-03", parent: "Parent of Dev Malhotra", rating: 4, category: "Parent App", comments: "Notifications are delivered fast." }
  ]);

  // ── Decision Polls (Module 9) ──
  const [polls, setPolls] = useState([
    { id: "POL-01", question: "Should Saturday remain a half day for secondary grades?", votesYes: 185, votesNo: 42, active: true }
  ]);

  const handleVotePoll = (id: string, option: 'yes' | 'no') => {
    setPolls(polls.map(p => {
      if (p.id === id) {
        return {
          ...p,
          votesYes: option === 'yes' ? p.votesYes + 1 : p.votesYes,
          votesNo: option === 'no' ? p.votesNo + 1 : p.votesNo
        };
      }
      return p;
    }));
    alert("Mock vote logged! Visual percentages updated.");
  };

  const handleAddAnnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnn.title) return;
    setAnnouncements([{
      id: `ANN-${String(announcements.length + 1).padStart(2, "0")}`,
      title: newAnn.title,
      target: newAnn.target,
      date: "Just Now",
      category: newAnn.category
    }, ...announcements]);
    setIsAddAnnOpen(false);
    setNewAnn({ title: "", target: "Entire School", category: "Circular" });
    alert("Announcement published and target push alerts dispatched!");
  };

  const handleReplyTicket = () => {
    if (!ticketReplyText) return;
    setTickets(tickets.map(t => t.id === selectedTicketId ? { ...t, status: "In Progress" } : t));
    setTicketReplyText("");
    alert("Reply successfully sent and push alert routed to Parent app!");
  };

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Communication &amp; Engagement Hub <MessageSquare size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Real-time chat modules, parent support ticket centers, circular archives, event calendars, decision surveys, and push notifications.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "announcements") setIsAddAnnOpen(true);
            else alert("Configuring circular layout...");
          }}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <Plus size={18} />
          <span>Quick Broadcast Item</span>
        </button>
      </div>

      {/* ════════════ 10 TABS SWITCHER CONSOLE ════════════ */}
      <div className="glass-card" style={{ 
        padding: "0.6rem", 
        display: "flex", 
        gap: "0.5rem", 
        overflowX: "auto", 
        whiteSpace: "nowrap",
        border: "1px solid var(--border-color)",
        background: "var(--bg-card)",
        borderRadius: "var(--radius-md)"
      }}>
        {[
          { id: "support", label: "Support Tickets Desk", icon: HelpCircle },
          { id: "announcements", label: "Announcement Center", icon: Bell },
          { id: "push_notifications", label: "FCM Push Alerts", icon: Send },
          { id: "chat", label: "Direct School Chat", icon: MessageSquare },
          { id: "circulars", label: "Circular Archives", icon: FileText },
          { id: "events", label: "Events Manager", icon: Calendar },
          { id: "holidays", label: "Holiday Planner", icon: Calendar },
          { id: "feedback", label: "Parent Feedback Board", icon: Star },
          { id: "polls", label: "Decision Polls", icon: ThumbsUp },
          { id: "analytics", label: "Delivery Analytics", icon: BarChart3 }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{ 
                padding: "0.6rem 1rem", 
                fontSize: "0.82rem", 
                gap: "0.45rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: isActive ? 700 : 500
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB VIEWS ════════════ */}

      {/* MODULE 1: SUPPORT TICKETS DESK */}
      {activeTab === "support" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* Tickets lists */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Incoming Parent Support Tickets</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {tickets.map(tk => (
                <div 
                  key={tk.id}
                  onClick={() => setSelectedTicketId(tk.id)}
                  style={{ 
                    padding: "1rem", 
                    background: selectedTicketId === tk.id ? "rgba(16, 185, 129, 0.05)" : "rgba(255,255,255,0.02)", 
                    border: `1px solid ${selectedTicketId === tk.id ? "var(--primary)" : "var(--border-color)"}`, 
                    borderRadius: 8,
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, color: "#fff" }}>{tk.type} ({tk.id})</span>
                    <span className={`badge ${
                      tk.status === "Open" ? "badge-danger" : tk.status === "In Progress" ? "badge-warning" : "badge-secondary"
                    }`}>
                      {tk.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-main)", marginTop: 6 }}>{tk.subject}</div>
                  <div style={{ display: "flex", justify: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 6 }}>
                    <span>By: {tk.parent}</span>
                    <span>Assignee: <strong>{tk.assignee}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process selected ticket */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1.25rem" }}>Resolve Ticket Desk</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>SUBJECT INQUIRY</span>
                <div style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 700, marginTop: 4 }}>{selectedTicket.subject}</div>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ASSIGNEE DESK</span>
                <select 
                  value={selectedTicket.assignee}
                  onChange={(e) => {
                    setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, assignee: e.target.value } : t));
                  }}
                  style={{ width: "100%", padding: "0.7rem", marginTop: 4, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem" }}
                >
                  <option value="Accounts Desk">Accounts Desk</option>
                  <option value="Class Teacher">Class Teacher</option>
                  <option value="Transport Admin">Transport Admin</option>
                </select>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>REPLY TO PARENT APP</span>
                <textarea 
                  value={ticketReplyText}
                  onChange={(e) => setTicketReplyText(e.target.value)}
                  placeholder="Type official response..."
                  style={{ width: "100%", height: 80, padding: "0.7rem", marginTop: 4, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.85rem", outline: "none", resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={handleReplyTicket} className="btn btn-primary" style={{ flex: 1, padding: "0.65rem", justifyContent: "center" }}>Send Reply</button>
                <button 
                  onClick={() => {
                    setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: "Closed" } : t));
                    alert("Ticket closed!");
                  }} 
                  className="btn btn-secondary" 
                  style={{ padding: "0.65rem" }}
                >
                  Close Ticket
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* MODULE 2: ANNOUNCEMENT CENTER */}
      {activeTab === "announcements" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>School Circulars & Announcements</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Announcement Name</th>
                <th>Target Audience</th>
                <th>Logged Date</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((ann) => (
                <tr key={ann.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{ann.title}</td>
                  <td><span className="badge badge-info">{ann.target}</span></td>
                  <td>{ann.date}</td>
                  <td><span className="badge badge-secondary">{ann.category}</span></td>
                  <td><span className="badge badge-success">DISPATCHED</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 3: FCM PUSH NOTIFICATIONS CENTER */}
      {activeTab === "push_notifications" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>FCM Push Notification Dispatcher</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Attendance Push Alert", text: "Dispatches 'Student Absent today' push alert warning.", type: "attendance" },
              { label: "Homework Push Alert", text: "Dispatches 'New assignments uploaded' push notice.", type: "homework" },
              { label: "Fee Due Reminders", text: "Dispatches 'Fee bills pending' push warnings.", type: "feedues" },
              { label: "Bus Arrived Alert", text: "Dispatches 'School bus Dwarka arrived stop Dwarka Sector 12' alert.", type: "busarrived" },
              { label: "Results Published Alert", text: "Dispatches 'Mid-Term results compiled' check link notice.", type: "result" },
              { label: "Emergency Notice Warning", text: "Dispatches urgent notification closure alerts.", type: "emergency" }
            ].map((btn, idx) => (
              <div key={idx} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", borderRadius: 10, display: "flex", flexDirection: "column", justify: "space-between" }}>
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>{btn.label}</h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", minHeight: 34 }}>{btn.text}</p>
                </div>
                <button onClick={() => triggerPushAlert(btn.type)} className="btn btn-primary" style={{ padding: "0.5rem", fontSize: "0.75rem", justifyContent: "center", width: "100%", marginTop: "1rem" }}>
                  Trigger Dispatch
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 4: DIRECT SCHOOL CHAT */}
      {activeTab === "chat" && (
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.5rem", height: 420 }}>
          
          {/* Chat threads */}
          <div className="glass-card" style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.45rem", overflowY: "auto" }}>
            <div style={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>ACTIVE CHAT ROOMS</div>
            {chatRooms.map(room => (
              <button
                key={room.id}
                onClick={() => setActiveChatRoomId(room.id)}
                className={`btn ${activeChatRoomId === room.id ? "btn-primary" : "btn-secondary"}`}
                style={{ justifyContent: "flex-start", padding: "0.6rem 0.85rem", flexDirection: "column", alignItems: "flex-start", gap: 2 }}
              >
                <span style={{ fontSize: "0.825rem", fontWeight: 700 }}>{room.title}</span>
                <span style={{ fontSize: "0.68rem", opacity: 0.8, fontWeight: 400, maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>{room.lastMsg}</span>
              </button>
            ))}
          </div>

          {/* Active Chat box */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justify: "space-between" }}>
            
            {/* Header */}
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <div style={{ fontWeight: 800, color: "#fff", fontSize: "0.95rem" }}>
                {chatRooms.find(r => r.id === activeChatRoomId)?.title}
              </div>
            </div>

            {/* Message Area */}
            <div style={{ flex: 1, padding: "1rem 0", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {(chatMessages[activeChatRoomId] || []).map((msg, idx) => {
                const isAdmin = msg.sender === "Admin" || msg.sender === "Teacher";
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      alignSelf: isAdmin ? "flex-end" : "flex-start", 
                      background: isAdmin ? "var(--primary-bg)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isAdmin ? "var(--primary)" : "var(--border-color)"}`,
                      padding: "0.6rem 0.85rem", 
                      borderRadius: 10,
                      maxWidth: "70%"
                    }}
                  >
                    <div style={{ fontSize: "0.825rem", color: "#fff" }}>{msg.text}</div>
                    <div style={{ fontSize: "0.62rem", color: "var(--text-dim)", textAlign: "right", marginTop: 4 }}>{msg.time}</div>
                  </div>
                );
              })}
            </div>

            {/* Input Box */}
            <form onSubmit={handleSendChatMsg} style={{ display: "flex", gap: "0.5rem" }}>
              <input 
                type="text" 
                value={typedChatMsg}
                onChange={(e) => setTypedChatMsg(e.target.value)}
                placeholder="Type your message..."
                style={{ flex: 1, padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 8, color: "#fff", fontSize: "0.85rem", outline: "none" }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem 1rem" }}>
                <Send size={16} />
              </button>
            </form>

          </div>

        </div>
      )}

      {/* MODULE 5: CIRCULAR MANAGEMENT */}
      {activeTab === "circulars" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* Circular list */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Circulars Archive</h3>
            
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Circular Name</th>
                  <th>Format</th>
                  <th>Seen By</th>
                  <th>Downloads</th>
                </tr>
              </thead>
              <tbody>
                {circulars.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{c.title}</td>
                    <td><span className="badge badge-info">{c.format}</span></td>
                    <td style={{ fontWeight: 700 }}>{c.seen} Parents</td>
                    <td><strong>{c.downloads}</strong> Downloads</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Upload circular */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1.25rem" }}>Publish Circular Notice</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CIRCULAR HEADER TITLE</label>
                <input 
                  type="text" 
                  placeholder="e.g. CBSE Registration Schedule PDF"
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                />
              </div>

              <div style={{ border: "2px dashed var(--border-color)", padding: "1.5rem", borderRadius: 8, textAlign: "center", cursor: "pointer" }} onClick={() => alert("Select file...")}>
                <Upload size={24} color="var(--primary)" style={{ margin: "0 auto 0.5rem" }} />
                <span style={{ fontSize: "0.85rem" }}>Upload circular PDF / Image flyer</span>
              </div>

              <button onClick={() => alert("Circular mapped and published!")} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center" }}>
                Publish Circular Notice
              </button>
            </div>
          </div>

        </div>
      )}

      {/* MODULE 6: EVENTS MANAGER */}
      {activeTab === "events" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Scheduled Events &amp; PTA Assemblies</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Scheduled Date</th>
                <th>Category Type</th>
                <th>Parent Registrations</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{e.title}</td>
                  <td>{e.date}</td>
                  <td><span className="badge badge-info">{e.type}</span></td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{e.registered}</td>
                  <td><span className="badge badge-success">ACTIVE EVENT</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 7: HOLIDAY PLANNER */}
      {activeTab === "holidays" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Mapped Holidays &amp; Closures</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Holiday Description</th>
                <th>Calendar Date</th>
                <th>Category Type</th>
                <th>Sync Status</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map(h => (
                <tr key={h.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{h.name}</td>
                  <td>{h.date}</td>
                  <td><span className="badge badge-info">{h.type}</span></td>
                  <td><span className="badge badge-success">{h.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 8: PARENT FEEDBACK BOARD */}
      {activeTab === "feedback" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Parent Feedback reviews</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Parent ID</th>
                <th>Category Scope</th>
                <th>Rating Scale</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(f => (
                <tr key={f.id}>
                  <td style={{ fontWeight: 700 }}>{f.parent}</td>
                  <td><span className="badge badge-info">{f.category}</span></td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{f.rating} / 5 Stars</td>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{f.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 9: DECISION POLLS */}
      {activeTab === "polls" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Decision Polls &amp; Surveys</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {polls.map(p => {
              const tot = p.votesYes + p.votesNo;
              const yesPct = tot > 0 ? Math.round((p.votesYes / tot) * 100) : 0;
              const noPct = tot > 0 ? Math.round((p.votesNo / tot) * 100) : 0;
              
              return (
                <div key={p.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.25rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", borderRadius: 10 }}>
                  <div style={{ fontWeight: 800, color: "#fff", fontSize: "0.95rem" }}>{p.question}</div>
                  
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => handleVotePoll(p.id, 'yes')} className="btn btn-secondary" style={{ fontSize: "0.78rem" }}>Vote YES</button>
                    <button onClick={() => handleVotePoll(p.id, 'no')} className="btn btn-secondary" style={{ fontSize: "0.78rem" }}>Vote NO</button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                    <div style={{ display: "flex", justify: "space-between", fontSize: "0.825rem" }}>
                      <span>Yes (Votes: {p.votesYes})</span>
                      <span style={{ fontWeight: 700, color: "var(--primary)" }}>{yesPct}%</span>
                    </div>
                    <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: `${yesPct}%`, height: "100%", background: "var(--primary)", borderRadius: 99 }} />
                    </div>

                    <div style={{ display: "flex", justify: "space-between", fontSize: "0.825rem", marginTop: 4 }}>
                      <span>No (Votes: {p.votesNo})</span>
                      <span style={{ fontWeight: 700, color: "var(--text-muted)" }}>{noPct}%</span>
                    </div>
                    <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: `${noPct}%`, height: "100%", background: "rgba(255,255,255,0.12)", borderRadius: 99 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODULE 10: DELIVERY ANALYTICS */}
      {activeTab === "analytics" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* open rates trend */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Delivery &amp; Open Rate Benchmarks</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { label: "SMS Messages Delivered", pct: 98 },
                { label: "FCM Push Notifications Open Rate", pct: 86 },
                { label: "Circulars Seen Index", pct: 74 },
                { label: "Email Open Ratios", pct: 62 }
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", justify: "space-between", fontSize: "0.85rem", fontWeight: 700 }}>
                    <span style={{ color: "#fff" }}>{item.label}</span>
                    <span style={{ color: "var(--primary)" }}>{item.pct}%</span>
                  </div>
                  <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ width: `${item.pct}%`, height: "100%", background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)", borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Average response times */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>Support Desk response indexes</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { dept: "Accounts Desk Support", time: "18 Mins" },
                { dept: "Transport Desk Support", time: "24 Mins" },
                { dept: "Class Teacher General Queries", time: "42 Mins" }
              ].map((row, idx) => (
                <div key={idx} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8, display: "flex", justify: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff" }}>{row.dept}</div>
                  <span className="badge badge-success" style={{ fontSize: "0.68rem" }}>{row.time} avg</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ════════════ QUICK ADD ANNOUNCEMENT MODAL ════════════ */}
      {isAddAnnOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 420 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Publish Announcement</h3>
              <button onClick={() => setIsAddAnnOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddAnnSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ANNOUNCEMENT TITLE</label>
                <input type="text" value={newAnn.title} onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })} placeholder="e.g. CBSE Syllabus Details" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>TARGET AUDIENCE</label>
                  <select value={newAnn.target} onChange={(e) => setNewAnn({ ...newAnn, target: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                    <option value="Entire School">Entire School</option>
                    <option value="Class 10">Class 10 Only</option>
                    <option value="Class 9">Class 9 Only</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>CATEGORY</label>
                  <select value={newAnn.category} onChange={(e) => setNewAnn({ ...newAnn, category: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                    <option value="Circular">Circular</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Broadcast Announcement</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
