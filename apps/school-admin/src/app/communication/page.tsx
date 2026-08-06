"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare, Send, AlertTriangle, Search, Filter, Plus, X,
  Calendar, FileText, Bell, Users, BarChart3, HelpCircle, UserCheck,
  CheckCircle2, Star, ThumbsUp, Trash2, ShieldAlert, Upload, Paperclip, Edit3, Save
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockData";

interface AnnouncementRecord {
  id: string;
  title: string;
  target: string;
  date: string;
  category: "Circular" | "Holiday" | "Emergency";
}

interface CircularRecord {
  id: string;
  title: string;
  format: string;
  date: string;
  seen: number;
  downloads: number;
}

interface EventRecord {
  id: string;
  title: string;
  date: string;
  type: string;
  registered: string;
}

interface HolidayRecord {
  id: string;
  name: string;
  date: string;
  type: string;
  status: string;
}

interface SupportTicketRecord {
  id: string;
  parent: string;
  type: string;
  subject: string;
  date: string;
  status: "Open" | "In Progress" | "Closed";
  assignee: string;
}

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState<"support" | "announcements" | "push_notifications" | "chat" | "circulars" | "events" | "holidays" | "feedback" | "polls" | "analytics">("support");

  // ════════════ 1. SUPPORT TICKETS STATE ════════════
  const [tickets, setTickets] = useState<SupportTicketRecord[]>([
    { id: "TCK-1021", parent: "Parent of Aarav Sharma", type: "Fee Issue", subject: "Double deduction in July fees", date: "Today", status: "Open", assignee: "Accounts Desk" },
    { id: "TCK-1022", parent: "Parent of Ananya Patel", type: "Leave Application", subject: "Ananya needs leave for family function", date: "Yesterday", status: "In Progress", assignee: "Class Teacher" },
    { id: "TCK-1023", parent: "Parent of Rohan Verma", type: "Transport Complaint", subject: "Route 1 Bus delayed by 25 mins", date: "28 Jul 2026", status: "Closed", assignee: "Transport Admin" }
  ]);
  const [ticketReplyText, setTicketReplyText] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState("TCK-1021");

  // ════════════ 2. ANNOUNCEMENTS STATE ════════════
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([
    { id: "ANN-01", title: "Independence Day Dress Code Announcement", target: "Entire School", date: "2026-08-01", category: "Holiday" },
    { id: "ANN-02", title: "Syllabus details for CBSE Mid-term Exams", target: "Class 10", date: "2026-07-28", category: "Circular" }
  ]);
  const [isAddAnnOpen, setIsAddAnnOpen] = useState(false);
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);
  const [annForm, setAnnForm] = useState({ title: "", target: "Entire School", category: "Circular" as const });

  // ════════════ 3. DIRECT CHATS STATE ════════════
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

  // ════════════ 4. CIRCULARS STATE ════════════
  const [circulars, setCirculars] = useState<CircularRecord[]>([
    { id: "CIR-01", title: "Monthly Academic Planner — August 2026", format: "PDF Document", date: "2026-08-01", seen: 142, downloads: 85 },
    { id: "CIR-02", title: "PTA Assembly guidelines & code of conduct", format: "Image Flyer", date: "2026-07-24", seen: 245, downloads: 120 }
  ]);
  const [isCircularModalOpen, setIsCircularModalOpen] = useState(false);
  const [editingCircularId, setEditingCircularId] = useState<string | null>(null);
  const [circularForm, setCircularForm] = useState({ title: "", format: "PDF Document" });

  // ════════════ 5. EVENTS STATE ════════════
  const [events, setEvents] = useState<EventRecord[]>([
    { id: "EVT-01", title: "Annual Independence Day Assembly", date: "2026-08-15", type: "School Event", registered: "450 Parents" },
    { id: "EVT-02", title: "Parent-Teacher Council Conference", date: "2026-09-05", type: "PTM", registered: "120 Parents" }
  ]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({ title: "", date: "2026-08-15", type: "School Event", registered: "100 Parents" });

  // ════════════ 6. HOLIDAYS STATE ════════════
  const [holidays, setHolidays] = useState<HolidayRecord[]>([
    { id: "HOL-01", name: "Independence Day Celebration", date: "2026-08-15", type: "National Holiday", status: "Synced with Parent App" },
    { id: "HOL-02", name: "Raksha Bandhan Holiday", date: "2026-08-31", type: "School Holiday", status: "Synced with Parent App" }
  ]);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [editingHolidayId, setEditingHolidayId] = useState<string | null>(null);
  const [holidayForm, setHolidayForm] = useState({ name: "", date: "2026-08-15", type: "School Holiday" });

  // ════════════ 7. FEEDBACKS STATE ════════════
  const [feedbacks] = useState([
    { id: "FDB-01", parent: "Parent of Aarav Sharma", rating: 5, category: "Teacher Performance", comments: "Sunita maam teaches algebra very well." },
    { id: "FDB-02", parent: "Parent of Rohan Verma", rating: 3, category: "Bus Service", comments: "Route 1 has delay issues sometimes." },
    { id: "FDB-03", parent: "Parent of Dev Malhotra", rating: 4, category: "Parent App", comments: "Notifications are delivered fast." }
  ]);

  // ════════════ 8. POLLS STATE ════════════
  const [polls, setPolls] = useState([
    { id: "POL-01", question: "Should Saturday remain a half day for secondary grades?", votesYes: 185, votesNo: 42, active: true }
  ]);

  // Persistent Cache Load
  useEffect(() => {
    try {
      const cachedAnn = localStorage.getItem("sm_comm_announcements");
      if (cachedAnn) setAnnouncements(JSON.parse(cachedAnn));

      const cachedCirc = localStorage.getItem("sm_comm_circulars");
      if (cachedCirc) setCirculars(JSON.parse(cachedCirc));

      const cachedEvt = localStorage.getItem("sm_comm_events");
      if (cachedEvt) setEvents(JSON.parse(cachedEvt));

      const cachedHol = localStorage.getItem("sm_comm_holidays");
      if (cachedHol) setHolidays(JSON.parse(cachedHol));
    } catch (e) {}
  }, []);

  const saveAnn = (list: AnnouncementRecord[]) => {
    setAnnouncements(list);
    try { localStorage.setItem("sm_comm_announcements", JSON.stringify(list)); } catch (e) {}
  };

  const saveCirc = (list: CircularRecord[]) => {
    setCirculars(list);
    try { localStorage.setItem("sm_comm_circulars", JSON.stringify(list)); } catch (e) {}
  };

  const saveEvt = (list: EventRecord[]) => {
    setEvents(list);
    try { localStorage.setItem("sm_comm_events", JSON.stringify(list)); } catch (e) {}
  };

  const saveHol = (list: HolidayRecord[]) => {
    setHolidays(list);
    try { localStorage.setItem("sm_comm_holidays", JSON.stringify(list)); } catch (e) {}
  };

  // Announcements Handlers
  const handleOpenAddAnn = () => {
    setEditingAnnId(null);
    setAnnForm({ title: "", target: "Entire School", category: "Circular" });
    setIsAddAnnOpen(true);
  };

  const handleOpenEditAnn = (ann: AnnouncementRecord) => {
    setEditingAnnId(ann.id);
    setAnnForm({ title: ann.title, target: ann.target, category: ann.category });
    setIsAddAnnOpen(true);
  };

  const handleSaveAnn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annForm.title) return;

    if (editingAnnId) {
      const updated = announcements.map(a => a.id === editingAnnId ? { ...a, ...annForm } : a);
      saveAnn(updated);
    } else {
      const created: AnnouncementRecord = {
        id: `ANN-${Date.now()}`,
        title: annForm.title,
        target: annForm.target,
        date: new Date().toISOString().split("T")[0],
        category: annForm.category
      };
      const updated = [created, ...announcements];
      saveAnn(updated);
    }
    setIsAddAnnOpen(false);
  };

  const handleDeleteAnn = (id: string) => {
    if (confirm("Delete this announcement?")) {
      const updated = announcements.filter(a => a.id !== id);
      saveAnn(updated);
    }
  };

  // Circulars Handlers
  const handleOpenAddCircular = () => {
    setEditingCircularId(null);
    setCircularForm({ title: "", format: "PDF Document" });
    setIsCircularModalOpen(true);
  };

  const handleOpenEditCircular = (c: CircularRecord) => {
    setEditingCircularId(c.id);
    setCircularForm({ title: c.title, format: c.format });
    setIsCircularModalOpen(true);
  };

  const handleSaveCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!circularForm.title) return;

    if (editingCircularId) {
      const updated = circulars.map(c => c.id === editingCircularId ? { ...c, title: circularForm.title, format: circularForm.format } : c);
      saveCirc(updated);
    } else {
      const created: CircularRecord = {
        id: `CIR-${Date.now()}`,
        title: circularForm.title,
        format: circularForm.format,
        date: new Date().toISOString().split("T")[0],
        seen: 0,
        downloads: 0
      };
      const updated = [created, ...circulars];
      saveCirc(updated);
    }
    setIsCircularModalOpen(false);
  };

  const handleDeleteCircular = (id: string) => {
    if (confirm("Delete this circular notice?")) {
      const updated = circulars.filter(c => c.id !== id);
      saveCirc(updated);
    }
  };

  // Events Handlers
  const handleOpenAddEvent = () => {
    setEditingEventId(null);
    setEventForm({ title: "", date: "2026-08-15", type: "School Event", registered: "100 Parents" });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (evt: EventRecord) => {
    setEditingEventId(evt.id);
    setEventForm({ title: evt.title, date: evt.date, type: evt.type, registered: evt.registered });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title) return;

    if (editingEventId) {
      const updated = events.map(ev => ev.id === editingEventId ? { ...ev, ...eventForm } : ev);
      saveEvt(updated);
    } else {
      const created: EventRecord = {
        id: `EVT-${Date.now()}`,
        ...eventForm
      };
      const updated = [created, ...events];
      saveEvt(updated);
    }
    setIsEventModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Delete scheduled event?")) {
      const updated = events.filter(e => e.id !== id);
      saveEvt(updated);
    }
  };

  // Holidays Handlers
  const handleOpenAddHoliday = () => {
    setEditingHolidayId(null);
    setHolidayForm({ name: "", date: "2026-08-15", type: "School Holiday" });
    setIsHolidayModalOpen(true);
  };

  const handleOpenEditHoliday = (hol: HolidayRecord) => {
    setEditingHolidayId(hol.id);
    setHolidayForm({ name: hol.name, date: hol.date, type: hol.type });
    setIsHolidayModalOpen(true);
  };

  const handleSaveHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!holidayForm.name) return;

    if (editingHolidayId) {
      const updated = holidays.map(h => h.id === editingHolidayId ? { ...h, name: holidayForm.name, date: holidayForm.date, type: holidayForm.type } : h);
      saveHol(updated);
    } else {
      const created: HolidayRecord = {
        id: `HOL-${Date.now()}`,
        name: holidayForm.name,
        date: holidayForm.date,
        type: holidayForm.type,
        status: "Synced with Parent App"
      };
      const updated = [created, ...holidays];
      saveHol(updated);
    }
    setIsHolidayModalOpen(false);
  };

  // Chat send
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

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Communication &amp; Engagement Hub <MessageSquare size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0, fontSize: "0.85rem" }}>
            Real-time chat modules, circular archives, event calendars, decision surveys, and push notifications.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "announcements") handleOpenAddAnn();
            else if (activeTab === "circulars") handleOpenAddCircular();
            else if (activeTab === "events") handleOpenAddEvent();
            else if (activeTab === "holidays") handleOpenAddHoliday();
            else alert("Select relevant tab to quick create broadcast items.");
          }}
          className="btn btn-primary" 
          style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}
        >
          <Plus size={16} /> Quick Broadcast Item
        </button>
      </div>

      {/* TABS SWITCHER CONSOLE */}
      <div className="glass-card" style={{ padding: "0.6rem", display: "flex", gap: "0.5rem", overflowX: "auto", whiteSpace: "nowrap" }}>
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
              style={{ padding: "0.55rem 0.95rem", fontSize: "0.82rem", gap: "0.4rem", borderRadius: 8, fontWeight: isActive ? 700 : 500 }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ════════════ 1. SUPPORT TICKETS ════════════ */}
      {activeTab === "support" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: "0 0 1rem 0" }}>Incoming Parent Support Tickets</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {tickets.map(tk => (
                <div 
                  key={tk.id}
                  onClick={() => setSelectedTicketId(tk.id)}
                  style={{ 
                    padding: "1rem", 
                    background: selectedTicketId === tk.id ? "rgba(99, 102, 241, 0.08)" : "var(--bg-input)", 
                    border: `1.5px solid ${selectedTicketId === tk.id ? "var(--primary)" : "var(--border-color)"}`, 
                    borderRadius: 10,
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ color: "var(--text-heading)" }}>{tk.type} ({tk.id})</strong>
                    <span className={`badge ${tk.status === "Open" ? "badge-danger" : tk.status === "In Progress" ? "badge-warning" : "badge-secondary"}`}>
                      {tk.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-main)", marginTop: 6 }}>{tk.subject}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 6 }}>
                    <span>By: {tk.parent}</span>
                    <span>Assignee: <strong>{tk.assignee}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: "0 0 1.25rem 0" }}>Resolve Ticket Desk</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>SUBJECT INQUIRY</span>
                <div style={{ fontSize: "0.85rem", color: "var(--text-heading)", fontWeight: 800, marginTop: 4 }}>{selectedTicket.subject}</div>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>ASSIGNEE DESK</span>
                <select 
                  value={selectedTicket.assignee}
                  onChange={(e) => {
                    setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, assignee: e.target.value } : t));
                  }}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", marginTop: 4, background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontWeight: 700 }}
                >
                  <option value="Accounts Desk">Accounts Desk</option>
                  <option value="Class Teacher">Class Teacher</option>
                  <option value="Transport Admin">Transport Admin</option>
                </select>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>REPLY TO PARENT APP</span>
                <textarea 
                  value={ticketReplyText}
                  onChange={(e) => setTicketReplyText(e.target.value)}
                  placeholder="Type official response..."
                  style={{ width: "100%", height: 80, padding: "0.65rem 0.85rem", marginTop: 4, background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", outline: "none", resize: "none" }}
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

      {/* ════════════ 2. ANNOUNCEMENTS ════════════ */}
      {activeTab === "announcements" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>School Circulars &amp; Announcements</h3>
            <button onClick={handleOpenAddAnn} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Announcement
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Announcement Name</th>
                <th>Target Audience</th>
                <th>Logged Date</th>
                <th>Category</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((ann) => (
                <tr key={ann.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{ann.title}</td>
                  <td><span className="badge badge-info">{ann.target}</span></td>
                  <td style={{ fontWeight: 700 }}>{ann.date}</td>
                  <td><span className="badge badge-secondary">{ann.category}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button onClick={() => handleOpenEditAnn(ann)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                      <button onClick={() => handleDeleteAnn(ann.id)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 3. FCM PUSH NOTIFICATIONS ════════════ */}
      {activeTab === "push_notifications" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1.25rem 0", color: "var(--text-heading)" }}>FCM Push Notification Dispatcher</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Attendance Push Alert", text: "Dispatches 'Student Absent today' push alert warning.", type: "attendance" },
              { label: "Homework Push Alert", text: "Dispatches 'New assignments uploaded' push notice.", type: "homework" },
              { label: "Fee Due Reminders", text: "Dispatches 'Fee bills pending' push warnings.", type: "feedues" },
              { label: "Bus Arrived Alert", text: "Dispatches 'School bus Dwarka arrived stop Dwarka Sector 12' alert.", type: "busarrived" },
              { label: "Results Published Alert", text: "Dispatches 'Mid-Term results compiled' check link notice.", type: "result" },
              { label: "Emergency Notice Warning", text: "Dispatches urgent notification closure alerts.", type: "emergency" }
            ].map((btn, idx) => (
              <div key={idx} style={{ padding: "1.15rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 12, display: "flex", flexDirection: "column", justify: "space-between" }}>
                <div>
                  <strong style={{ fontSize: "0.95rem", color: "var(--text-heading)" }}>{btn.label}</strong>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.35rem", minHeight: 34 }}>{btn.text}</p>
                </div>
                <button onClick={() => alert(`FCM Push Alert dispatched for ${btn.type}!`)} className="btn btn-primary" style={{ padding: "0.5rem", fontSize: "0.75rem", justifyContent: "center", width: "100%", marginTop: "1rem" }}>
                  Trigger Dispatch
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════ 4. DIRECT CHAT MODULE ════════════ */}
      {activeTab === "chat" && (
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.5rem", height: 420 }}>
          <div className="glass-card" style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.45rem", overflowY: "auto" }}>
            <span style={{ padding: "0.5rem 0.75rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)" }}>ACTIVE CHAT ROOMS</span>
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

          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <strong style={{ fontWeight: 800, color: "var(--text-heading)", fontSize: "0.95rem" }}>
                {chatRooms.find(r => r.id === activeChatRoomId)?.title}
              </strong>
            </div>

            <div style={{ flex: 1, padding: "1.05rem 0", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {(chatMessages[activeChatRoomId] || []).map((msg, idx) => {
                const isAdmin = msg.sender === "Admin" || msg.sender === "Teacher";
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      alignSelf: isAdmin ? "flex-end" : "flex-start", 
                      background: isAdmin ? "var(--primary)" : "var(--bg-input)",
                      border: isAdmin ? "none" : "1px solid var(--border-color)",
                      padding: "0.6rem 0.85rem", 
                      borderRadius: 10,
                      color: isAdmin ? "#fff" : "var(--text-main)",
                      maxWidth: "70%"
                    }}
                  >
                    <div style={{ fontSize: "0.85rem" }}>{msg.text}</div>
                    <div style={{ fontSize: "0.65rem", color: isAdmin ? "#fff" : "var(--text-muted)", opacity: 0.8, textAlign: "right", marginTop: 4 }}>{msg.time}</div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendChatMsg} style={{ display: "flex", gap: "0.5rem" }}>
              <input 
                type="text" 
                value={typedChatMsg}
                onChange={(e) => setTypedChatMsg(e.target.value)}
                placeholder="Type message here..."
                style={{ flex: 1, padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", outline: "none" }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem 1rem" }}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ 5. CIRCULARS ARCHIVE ════════════ */}
      {activeTab === "circulars" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Circulars Archive</h3>
              <button onClick={handleOpenAddCircular} className="btn btn-primary" style={{ padding: "0.4rem 0.85rem", fontSize: "0.78rem" }}>
                <Plus size={14} /> Add Circular
              </button>
            </div>

            <table className="custom-table">
              <thead>
                <tr>
                  <th>Circular Name</th>
                  <th>Format</th>
                  <th>Seen By</th>
                  <th>Downloads</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {circulars.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{c.title}</td>
                    <td><span className="badge badge-info">{c.format}</span></td>
                    <td style={{ fontWeight: 700 }}>{c.seen} Parents</td>
                    <td style={{ fontWeight: 600 }}>{c.downloads} downloads</td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                        <button onClick={() => handleOpenEditCircular(c)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                        <button onClick={() => handleDeleteCircular(c.id)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1.25rem", color: "var(--text-heading)" }}>Publish Circular Notice</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CIRCULAR HEADER TITLE</label>
                <input 
                  type="text" 
                  placeholder="e.g. CBSE Registration Schedule PDF"
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ border: "2px dashed var(--border-color)", padding: "1.5rem", borderRadius: 8, textAlign: "center", cursor: "pointer" }}>
                <Upload size={24} color="var(--primary)" style={{ margin: "0 auto 0.5rem" }} />
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Upload circular PDF / Image flyer</span>
              </div>

              <button onClick={() => alert("Circular mapped and published!")} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center" }}>
                Publish Circular Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ 6. EVENTS MANAGER ════════════ */}
      {activeTab === "events" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Scheduled Events &amp; PTA Assemblies</h3>
            <button onClick={handleOpenAddEvent} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Event
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Scheduled Date</th>
                <th>Category Type</th>
                <th>Parent Registrations</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{e.title}</td>
                  <td style={{ fontWeight: 700 }}>{e.date}</td>
                  <td><span className="badge badge-info">{e.type}</span></td>
                  <td style={{ fontWeight: 800, color: "var(--primary)" }}>{e.registered}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button onClick={() => handleOpenEditEvent(e)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                      <button onClick={() => handleDeleteEvent(e.id)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 7. HOLIDAY PLANNER ════════════ */}
      {activeTab === "holidays" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Mapped Holidays &amp; Closures</h3>
            <button onClick={handleOpenAddHoliday} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Holiday
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Holiday Description</th>
                <th>Calendar Date</th>
                <th>Category Type</th>
                <th>Sync Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map(h => (
                <tr key={h.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{h.name}</td>
                  <td style={{ fontWeight: 700 }}>{h.date}</td>
                  <td><span className="badge badge-info">{h.type}</span></td>
                  <td><span className="badge badge-success">{h.status}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button onClick={() => handleOpenEditHoliday(h)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                      <button onClick={() => setHolidays(holidays.filter(x => x.id !== h.id))} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ ADD/EDIT ANNOUNCEMENT MODAL ════════════ */}
      {isAddAnnOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingAnnId ? "Edit Announcement" : "Publish Announcement"}
              </h3>
              <button onClick={() => setIsAddAnnOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveAnn} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ANNOUNCEMENT TITLE</label>
                <input type="text" value={annForm.title} onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TARGET AUDIENCE</label>
                  <select value={annForm.target} onChange={(e) => setAnnForm({ ...annForm, target: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Entire School">Entire School</option>
                    <option value="Class 10">Class 10 Only</option>
                    <option value="Class 9">Class 9 Only</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CATEGORY</label>
                  <select value={annForm.category} onChange={(e) => setAnnForm({ ...annForm, category: e.target.value as any })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Circular">Circular</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsAddAnnOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Publish Broadcast</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD/EDIT CIRCULAR MODAL ════════════ */}
      {isCircularModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingCircularId ? "Edit Circular Details" : "Add Circular Archives Notice"}
              </h3>
              <button onClick={() => setIsCircularModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveCircular} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CIRCULAR NAME</label>
                <input type="text" value={circularForm.title} onChange={(e) => setCircularForm({ ...circularForm, title: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ATTACHMENT FORMAT</label>
                <select value={circularForm.format} onChange={(e) => setCircularForm({ ...circularForm, format: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="PDF Document">PDF Document</option>
                  <option value="Image Flyer">Image Flyer</option>
                  <option value="Excel Sheet">Excel Sheet</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsCircularModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Publish Circular</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD/EDIT EVENT MODAL ════════════ */}
      {isEventModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingEventId ? "Edit Event Details" : "Schedule New Event"}
              </h3>
              <button onClick={() => setIsEventModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveEvent} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EVENT NAME</label>
                <input type="text" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EVENT DATE</label>
                  <input type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CATEGORY TYPE</label>
                  <input type="text" value={eventForm.type} onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsEventModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Schedule Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD/EDIT HOLIDAY MODAL ════════════ */}
      {isHolidayModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingHolidayId ? "Edit Holiday Closure" : "Add Holiday Closure"}
              </h3>
              <button onClick={() => setIsHolidayModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveHoliday} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>HOLIDAY DESCRIPTION</label>
                <input type="text" value={holidayForm.name} onChange={(e) => setHolidayForm({ ...holidayForm, name: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>HOLIDAY DATE</label>
                  <input type="date" value={holidayForm.date} onChange={(e) => setHolidayForm({ ...holidayForm, date: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CATEGORY TYPE</label>
                  <input type="text" value={holidayForm.type} onChange={(e) => setHolidayForm({ ...holidayForm, type: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsHolidayModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Holiday</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
