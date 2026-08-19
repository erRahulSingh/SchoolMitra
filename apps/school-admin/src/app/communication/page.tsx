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
  const [activeTab, setActiveTab] = useState<
    "support" | "announcements" | "push_notifications" | "chat" | "circulars" | "events" | "holidays" | "feedback" | "polls" | "analytics"
  >("support");

  // ════════════ 1. SUPPORT TICKETS STATE ════════════
  const [tickets, setTickets] = useState<any[]>([]);
  const [ticketReplyText, setTicketReplyText] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [supportSearch, setSupportSearch] = useState("");
  const [supportFilterType, setSupportFilterType] = useState("All");

  // ════════════ 2. ANNOUNCEMENTS STATE ════════════
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isAddAnnOpen, setIsAddAnnOpen] = useState(false);
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);
  const [annForm, setAnnForm] = useState({
    title: "",
    message: "",
    attachment: "",
    targetAudience: "All Parents",
    classId: "",
    sectionId: "",
    teacherId: "",
    publishDate: "",
    expiryDate: "",
    priority: "Normal" as "Low" | "Normal" | "High" | "Urgent",
    status: "Published" as "Draft" | "Published"
  });

  const [dbClasses, setDbClasses] = useState<any[]>([]);
  const [dbSections, setDbSections] = useState<any[]>([]);
  const [dbTeachers, setDbTeachers] = useState<any[]>([]);

  // ════════════ 3. FCM PUSH NOTIFICATIONS STATE ════════════
  const [customPushTitle, setCustomPushTitle] = useState("");
  const [customPushBody, setCustomPushBody] = useState("");
  const [customPushTarget, setCustomPushTarget] = useState("Entire School");
  const [sentPushes, setSentPushes] = useState([
    { id: "PSH-01", title: "Holiday Notice", body: "School will remain closed on 15th August.", target: "Entire School", time: "2 hours ago", status: "Delivered (520 devices)" },
    { id: "PSH-02", title: "Mid-Term Results Out", body: "Check the results section in parent app.", target: "Class 10 Only", time: "1 day ago", status: "Delivered (142 devices)" }
  ]);

  // ════════════ 4. DIRECT CHATS STATE ════════════
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
    ],
    "CR-03": [
      { sender: "Driver", text: "Reached stop Dwarka Sector 12. Heavy traffic on bridge.", time: "11:20 AM" }
    ]
  });
  const [typedChatMsg, setTypedChatMsg] = useState("");

  // ════════════ 5. CIRCULARS STATE ════════════
  const [circulars, setCirculars] = useState<CircularRecord[]>([]);
  const [isCircularModalOpen, setIsCircularModalOpen] = useState(false);
  const [editingCircularId, setEditingCircularId] = useState<string | null>(null);
  const [circularForm, setCircularForm] = useState({ title: "", format: "PDF Document" });
  const [circularSearch, setCircularSearch] = useState("");

  // ════════════ 6. EVENTS STATE ════════════
  const [events, setEvents] = useState<EventRecord[]>([
    { id: "EVT-01", title: "Annual Independence Day Assembly", date: "2026-08-15", type: "School Event", registered: "450 Parents" },
    { id: "EVT-02", title: "Parent-Teacher Council Conference", date: "2026-09-05", type: "PTM", registered: "120 Parents" }
  ]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({ title: "", date: "2026-08-15", type: "School Event", registered: "100 Parents" });

  // ════════════ 7. HOLIDAYS STATE ════════════
  const [holidays, setHolidays] = useState<HolidayRecord[]>([
    { id: "HOL-01", name: "Independence Day Celebration", date: "2026-08-15", type: "National Holiday", status: "Synced with Parent App" },
    { id: "HOL-02", name: "Raksha Bandhan Holiday", date: "2026-08-31", type: "School Holiday", status: "Synced with Parent App" }
  ]);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [editingHolidayId, setEditingHolidayId] = useState<string | null>(null);
  const [holidayForm, setHolidayForm] = useState({ name: "", date: "2026-08-15", type: "School Holiday" });
  const [isSyncingHolidays, setIsSyncingHolidays] = useState(false);

  // ════════════ 8. FEEDBACKS STATE ════════════
  const [feedbacksList, setFeedbacksList] = useState([
    { id: "FDB-01", parent: "Parent of Aarav Sharma", rating: 5, category: "Teacher Performance", comments: "Sunita maam teaches algebra very well.", reply: "Thank you for your kind words! We appreciate your support." },
    { id: "FDB-02", parent: "Parent of Rohan Verma", rating: 3, category: "Bus Service", comments: "Route 1 has delay issues sometimes.", reply: null as string | null },
    { id: "FDB-03", parent: "Parent of Dev Malhotra", rating: 4, category: "Parent App", comments: "Notifications are delivered fast.", reply: null as string | null }
  ]);
  const [feedbackReplyText, setFeedbackReplyText] = useState("");
  const [replyingFeedbackId, setReplyingFeedbackId] = useState<string | null>(null);
  const [feedbackFilterRating, setFeedbackFilterRating] = useState<"All" | number>("All");

  // ════════════ 9. POLLS STATE ════════════
  const [polls, setPolls] = useState([
    { id: "POL-01", question: "Should Saturday remain a half day for secondary grades?", votesYes: 185, votesNo: 42, active: true },
    { id: "POL-02", question: "Adopt digital report cards from this semester?", votesYes: 245, votesNo: 15, active: true }
  ]);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState("");
  const [votedPolls, setVotedPolls] = useState<Record<string, "yes" | "no" | null>>({});

  // ════════════ 10. DELIVERY ANALYTICS STATE ════════════
  const [analyticsRange, setAnalyticsRange] = useState<"7days" | "30days">("7days");

  // Load from Express DB APIs
  const fetchCommunicationData = async () => {
    try {
      // 1. Fetch support tickets
      const tRes = await fetch("http://localhost:5000/api/v1/support/tickets");
      const tJson = await tRes.json();
      if (tJson.success) {
        const mapped = tJson.data.tickets.map((t: any) => ({
          id: t.id,
          _id: t._id,
          parent: t.parentName || "Vijay Sharma",
          type: t.category,
          subject: t.subject,
          date: t.createdAt,
          status: t.status === "In Progress" ? "In Progress" : t.status === "Closed" ? "Closed" : "Open",
          assignee: "Accounts Desk",
          replies: t.replies?.map((m: any) => ({
            sender: m.sender === "Admin Desk" || m.sender.includes("Admin") ? "Admin" : "Parent",
            message: m.text,
            time: m.date || "Just Now"
          })) || []
        }));
        setTickets(mapped);
        if (mapped.length > 0 && !selectedTicketId) {
          setSelectedTicketId(mapped[0].id);
        }
      }

      // 2. Fetch announcements & circulars
      const token = localStorage.getItem("accessToken");
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const aRes = await fetch("http://localhost:5000/api/v1/admin/announcements", { headers });
      const aJson = await aRes.json();
      if (aJson.success) {
        const list = aJson.data.announcements || [];
        
        // Map announcements
        const annMapped = list.map((a: any) => ({
          ...a,
          id: a._id || a.id,
          title: a.title,
          target: a.targetAudience,
          date: a.publishDate ? new Date(a.publishDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Just Now"
        }));
        setAnnouncements(annMapped);

        // Map circulars
        const circMapped = list.filter((x: any) => x.attachment).map((c: any) => ({
          id: c._id || c.id,
          title: c.title,
          format: c.attachment.toLowerCase().endsWith(".pdf") ? "PDF Document" : "Image Flyer",
          date: c.publishDate ? new Date(c.publishDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Just Now",
          seen: 142,
          downloads: 85
        }));
        setCirculars(circMapped);
      }

      // Fetch dynamic class, section, teacher filters
      const classesRes = await fetch("http://localhost:5000/api/v1/admin/classes", { headers });
      const classesJson = await classesRes.json();
      if (classesJson.success) {
        setDbClasses(classesJson.data.classes || []);
      }

      const sectionsRes = await fetch("http://localhost:5000/api/v1/admin/sections", { headers });
      const sectionsJson = await sectionsRes.json();
      if (sectionsJson.success) {
        setDbSections(sectionsJson.data.sections || []);
      }

      const teachersRes = await fetch("http://localhost:5000/api/v1/admin/teachers", { headers });
      const teachersJson = await teachersRes.json();
      if (teachersJson.success) {
        setDbTeachers(teachersJson.data.teachers || []);
      }
    } catch (e) {
      console.error("DB Sync error:", e);
    }
  };

  useEffect(() => {
    fetchCommunicationData();
  }, []);

  // Support Ticket Reply Handler
  const handleReplyTicket = async () => {
    if (!ticketReplyText.trim()) {
      alert("Please type a response first.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/v1/support/tickets/${selectedTicketId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replyText: ticketReplyText,
          status: "In Progress"
        })
      });
      const json = await res.json();
      if (json.success) {
        setTicketReplyText("");
        fetchCommunicationData();
      }
    } catch (e) {
      console.error(e);
      alert("Error replying to ticket.");
    }
  };

  // Announcements Handlers
  const handleOpenAddAnn = () => {
    setEditingAnnId(null);
    setAnnForm({
      title: "",
      message: "",
      attachment: "",
      targetAudience: "All Parents",
      classId: "",
      sectionId: "",
      teacherId: "",
      publishDate: new Date().toISOString().slice(0, 16),
      expiryDate: "",
      priority: "Normal",
      status: "Published"
    });
    setIsAddAnnOpen(true);
  };

  const handleOpenEditAnn = (ann: any) => {
    setEditingAnnId(ann.id || ann._id);
    
    let classId = "";
    let sectionId = "";
    let teacherId = "";

    if (ann.targetClasses && ann.targetClasses.length > 0) {
      classId = ann.targetClasses[0]._id || ann.targetClasses[0];
    }
    if (ann.targetSections && ann.targetSections.length > 0) {
      sectionId = ann.targetSections[0]._id || ann.targetSections[0];
    }
    if (ann.targetTeacher) {
      teacherId = ann.targetTeacher._id || ann.targetTeacher;
    }

    setAnnForm({
      title: ann.title || "",
      message: ann.content || "",
      attachment: ann.attachment || "",
      targetAudience: ann.targetAudience || "All Parents",
      classId: String(classId),
      sectionId: String(sectionId),
      teacherId: String(teacherId),
      publishDate: ann.publishDate ? new Date(ann.publishDate).toISOString().slice(0, 16) : "",
      expiryDate: ann.expiryDate ? new Date(ann.expiryDate).toISOString().slice(0, 16) : "",
      priority: ann.priority || "Normal",
      status: ann.status || "Published"
    });
    setIsAddAnnOpen(true);
  };

  const handleSaveAnn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annForm.title || !annForm.message) {
      alert("Title and message are required.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const payload = {
      title: annForm.title,
      message: annForm.message,
      attachment: annForm.attachment || undefined,
      targetAudience: annForm.targetAudience,
      classId: annForm.classId || undefined,
      sectionId: annForm.sectionId || undefined,
      teacherId: annForm.teacherId || undefined,
      publishDate: annForm.publishDate || undefined,
      expiryDate: annForm.expiryDate || undefined,
      priority: annForm.priority,
      status: annForm.status
    };

    try {
      const url = editingAnnId 
        ? `http://localhost:5000/api/v1/admin/announcements/${editingAnnId}`
        : "http://localhost:5000/api/v1/admin/announcements";
        
      const method = editingAnnId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload)
      });
      
      const json = await res.json();
      if (json.success) {
        alert(editingAnnId ? "Announcement updated successfully!" : "Announcement published successfully!");
        setIsAddAnnOpen(false);
        fetchCommunicationData();
      } else {
        alert(json.message || "Failed to save announcement.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save announcement.");
    }
  };

  const handleDeleteAnn = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    const token = localStorage.getItem("accessToken");
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/v1/admin/announcements/${id}`, {
        method: "DELETE",
        headers
      });
      const json = await res.json();
      if (json.success) {
        alert("Announcement deleted successfully!");
        fetchCommunicationData();
      } else {
        alert(json.message || "Failed to delete announcement.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting announcement.");
    }
  };

  const handlePublishAnn = async (id: string) => {
    const token = localStorage.getItem("accessToken");
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/v1/admin/announcements/${id}/publish`, {
        method: "PATCH",
        headers
      });
      const json = await res.json();
      if (json.success) {
        alert("Announcement published successfully!");
        fetchCommunicationData();
      } else {
        alert(json.message || "Failed to publish announcement.");
      }
    } catch (err) {
      console.error(err);
      alert("Error publishing announcement.");
    }
  };

  // FCM Dispatch Handler
  const handleDispatchPush = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPushTitle.trim() || !customPushBody.trim()) {
      alert("Please type title and body details first!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/v1/notifications/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: customPushTitle,
          body: customPushBody,
          targetUser: customPushTarget
        })
      });
      const json = await res.json();
      if (json.success) {
        const newPush = {
          id: `PSH-${Date.now()}`,
          title: customPushTitle,
          body: customPushBody,
          target: customPushTarget,
          time: "Just Now",
          status: "Delivered & Synced to DB ✅"
        };
        setSentPushes([newPush, ...sentPushes]);
        alert(`FCM push alert successfully broadcasted to ${customPushTarget}!`);
        setCustomPushTitle("");
        setCustomPushBody("");
      }
    } catch (e) {
      console.error(e);
      alert("FCM Push dispatch failed.");
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

  const handleSaveCircular = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!circularForm.title) return;
    try {
      const res = await fetch("http://localhost:5000/api/v1/notifications/circulars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          circularTitle: circularForm.title,
          targetClass: "All Classes",
          documentUrl: "https://schoolmitra.in/docs/circular_aug_2026.pdf"
        })
      });
      const json = await res.json();
      if (json.success) {
        alert("Circular published to DB!");
        setIsCircularModalOpen(false);
        fetchCommunicationData();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to publish circular.");
    }
  };

  const handleDeleteCircular = (id: string) => {
    alert("Circular deletion is locked for administrative audit.");
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
        status: "Pending Sync"
      };
      const updated = [created, ...holidays];
      saveHol(updated);
    }
    setIsHolidayModalOpen(false);
  };

  const handleSyncHolidays = () => {
    setIsSyncingHolidays(true);
    setTimeout(() => {
      setHolidays(holidays.map(h => ({ ...h, status: "Synced with Parent App" })));
      setIsSyncingHolidays(false);
      alert("All Holidays synced successfully with Parent Application!");
    }, 1200);
  };

  // Chat send with automated Auto-Reply simulation
  const handleSendChatMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedChatMsg.trim()) return;

    const userMsg = {
      sender: "Admin",
      text: typedChatMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentMsgs = chatMessages[activeChatRoomId] || [];
    setChatMessages({
      ...chatMessages,
      [activeChatRoomId]: [...currentMsgs, userMsg]
    });

    setChatRooms(chatRooms.map(r => r.id === activeChatRoomId ? { ...r, lastMsg: typedChatMsg } : r));
    const sentMsgText = typedChatMsg;
    setTypedChatMsg("");

    // Auto-Reply simulation after 1.5s
    setTimeout(() => {
      let replyText = "Received! Thank you for the update.";
      if (sentMsgText.toLowerCase().includes("pta") || sentMsgText.toLowerCase().includes("meeting")) {
        replyText = "Great, I will attend the PTA meeting. Will we get the meeting highlights via email?";
      } else if (sentMsgText.toLowerCase().includes("fee") || sentMsgText.toLowerCase().includes("pay") || sentMsgText.toLowerCase().includes("dues")) {
        replyText = "I have paid the pending fee dues. Please verify and sync my receipt.";
      } else if (sentMsgText.toLowerCase().includes("homework") || sentMsgText.toLowerCase().includes("algebra") || sentMsgText.toLowerCase().includes("study")) {
        replyText = "Thanks, I will check the homework diary and help him with algebra prep.";
      } else if (sentMsgText.toLowerCase().includes("route") || sentMsgText.toLowerCase().includes("bus") || sentMsgText.toLowerCase().includes("delay")) {
        replyText = "Okay, standing at stop Dwarka Sector 12 now. Please update if the delays exceed 15 mins.";
      }

      const senderName = activeChatRoomId === "CR-01" ? "Parent" : activeChatRoomId === "CR-02" ? "Parent" : "Driver";
      const systemReply = {
        sender: senderName,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => ({
        ...prev,
        [activeChatRoomId]: [...(prev[activeChatRoomId] || []), systemReply]
      }));

      setChatRooms(prevRooms => prevRooms.map(r => r.id === activeChatRoomId ? { ...r, lastMsg: replyText } : r));
    }, 1500);
  };

  // Feedback Reply handler
  const handleFeedbackReply = (id: string) => {
    if (!feedbackReplyText.trim()) return;
    setFeedbacksList(feedbacksList.map(f => f.id === id ? { ...f, reply: feedbackReplyText } : f));
    setFeedbackReplyText("");
    setReplyingFeedbackId(null);
  };

  // Poll Voting handler
  const handleVote = (id: string, option: "yes" | "no") => {
    if (votedPolls[id]) {
      alert("You have already voted on this poll!");
      return;
    }
    setPolls(polls.map(p => {
      if (p.id === id) {
        return {
          ...p,
          votesYes: option === "yes" ? p.votesYes + 1 : p.votesYes,
          votesNo: option === "no" ? p.votesNo + 1 : p.votesNo
        };
      }
      return p;
    }));
    setVotedPolls({ ...votedPolls, [id]: option });
  };

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPollQuestion.trim()) return;
    const created = {
      id: `POL-${Date.now()}`,
      question: newPollQuestion,
      votesYes: 0,
      votesNo: 0,
      active: true
    };
    setPolls([created, ...polls]);
    setNewPollQuestion("");
    setIsPollModalOpen(false);
  };

  // Filters and Computed State
  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(supportSearch.toLowerCase()) || 
                          t.parent.toLowerCase().includes(supportSearch.toLowerCase()) || 
                          t.subject.toLowerCase().includes(supportSearch.toLowerCase());
    const matchesType = supportFilterType === "All" || t.type === supportFilterType;
    return matchesSearch && matchesType;
  });

  const filteredCirculars = circulars.filter(c => 
    c.title.toLowerCase().includes(circularSearch.toLowerCase()) ||
    c.format.toLowerCase().includes(circularSearch.toLowerCase())
  );

  const filteredFeedbacks = feedbacksList.filter(f => 
    feedbackFilterRating === "All" || f.rating === feedbackFilterRating
  );

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
            else if (activeTab === "polls") setIsPollModalOpen(true);
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
        <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "1.5rem" }}>
          {/* Left Panel: Ticket List */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Support Tickets Desk</h3>
              
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input 
                  type="text" 
                  placeholder="Search parent/ticket..." 
                  value={supportSearch}
                  onChange={(e) => setSupportSearch(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem 0.65rem 0.5rem 2rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.8rem", outline: "none" }}
                />
              </div>

              <select 
                value={supportFilterType}
                onChange={(e) => setSupportFilterType(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.8rem", fontWeight: 600 }}
              >
                <option value="All">All Categories</option>
                <option value="Fee Issue">Fee Issue</option>
                <option value="Leave Application">Leave Application</option>
                <option value="Transport Complaint">Transport Complaint</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "450px", overflowY: "auto", paddingRight: "4px" }}>
              {filteredTickets.map(tk => (
                <div 
                  key={tk.id}
                  onClick={() => setSelectedTicketId(tk.id)}
                  style={{ 
                    padding: "0.85rem", 
                    background: selectedTicketId === tk.id ? "rgba(99, 102, 241, 0.08)" : "var(--bg-input)", 
                    border: `1.5px solid ${selectedTicketId === tk.id ? "var(--primary)" : "var(--border-color)"}`, 
                    borderRadius: 10,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ color: "var(--text-heading)", fontSize: "0.85rem" }}>{tk.id}</strong>
                    <span className={`badge ${tk.status === "Open" ? "badge-danger" : tk.status === "In Progress" ? "badge-warning" : "badge-success"}`} style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>
                      {tk.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-main)", marginTop: 4, fontWeight: 600 }}>{tk.type}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tk.subject}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 6 }}>
                    <span>By: {tk.parent.replace("Parent of ", "")}</span>
                    <span>{tk.date}</span>
                  </div>
                </div>
              ))}
              {filteredTickets.length === 0 && (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>No tickets found</div>
              )}
            </div>
          </div>

          {/* Right Panel: Conversation Details */}
          {selectedTicket && (
            <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.85rem" }}>
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Ticket Details — {selectedTicket.id}</h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Raised by {selectedTicket.parent}</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>Desk Assignee:</span>
                  <select 
                    value={selectedTicket.assignee}
                    onChange={(e) => {
                      setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, assignee: e.target.value } : t));
                    }}
                    style={{ padding: "0.35rem 0.5rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.75rem", fontWeight: 700 }}
                  >
                    <option value="Accounts Desk">Accounts Desk</option>
                    <option value="Class Teacher">Class Teacher</option>
                    <option value="Transport Admin">Transport Admin</option>
                  </select>
                </div>
              </div>

              {/* Chat Thread */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", background: "rgba(0,0,0,0.15)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "1rem", height: "240px", overflowY: "auto" }}>
                {(ticketThreads[selectedTicket.id] || []).map((msg, index) => {
                  const isAdmin = msg.sender === "Admin";
                  return (
                    <div 
                      key={index} 
                      style={{ 
                        alignSelf: isAdmin ? "flex-end" : "flex-start", 
                        background: isAdmin ? "var(--primary)" : "var(--bg-input)",
                        border: isAdmin ? "none" : "1px solid var(--border-color)",
                        padding: "0.6rem 0.85rem", 
                        borderRadius: 10,
                        color: isAdmin ? "#fff" : "var(--text-main)",
                        maxWidth: "80%",
                        boxShadow: "var(--shadow-sm)"
                      }}
                    >
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: 2 }}>{msg.sender === "Admin" ? "School Support" : "Parent"}</div>
                      <div style={{ fontSize: "0.8rem" }}>{msg.message}</div>
                      <div style={{ fontSize: "0.6rem", opacity: 0.8, textAlign: "right", marginTop: 4 }}>{msg.time}</div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Section */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>REPLY TO PARENT APP</span>
                <textarea 
                  value={ticketReplyText}
                  onChange={(e) => setTicketReplyText(e.target.value)}
                  placeholder="Type official response..."
                  style={{ width: "100%", height: 60, padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", outline: "none", resize: "none" }}
                />
                
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
          )}
        </div>
      )}

      {/* ════════════ 2. ANNOUNCEMENT CENTER ════════════ */}
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
                <th>Publish Date</th>
                <th>Expiry Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((ann) => {
                const getTargetDisplayText = (a: any) => {
                  if (a.targetAudience === "Specific Class" && a.targetClasses && a.targetClasses.length > 0) {
                    return `Class: ${a.targetClasses[0]?.className || "Class"}`;
                  }
                  if (a.targetAudience === "Specific Section" && a.targetClasses && a.targetClasses.length > 0) {
                    const clsName = a.targetClasses[0]?.className || "Class";
                    const secName = a.targetSections && a.targetSections.length > 0 ? a.targetSections[0]?.sectionName : "A";
                    return `Section: ${clsName}-${secName}`;
                  }
                  if (a.targetAudience === "Specific Teacher" && a.targetTeacher) {
                    return `Teacher: ${a.targetTeacher.name || "Teacher"}`;
                  }
                  return a.targetAudience || "All Parents";
                };

                const priorityColors: Record<string, string> = {
                  Low: "badge-secondary",
                  Normal: "badge-info",
                  High: "badge-warning",
                  Urgent: "badge-danger"
                };

                const statusColors: Record<string, string> = {
                  Draft: "badge-secondary",
                  Published: "badge-success",
                  Scheduled: "badge-warning",
                  Archived: "badge-danger"
                };

                return (
                  <tr key={ann.id}>
                    <td>
                      <div style={{ fontWeight: 800, color: "var(--text-heading)" }}>{ann.title}</div>
                      {ann.content && <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px" }}>{ann.content}</div>}
                    </td>
                    <td><span className="badge badge-info">{getTargetDisplayText(ann)}</span></td>
                    <td style={{ fontWeight: 700 }}>
                      {ann.publishDate ? new Date(ann.publishDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : ann.date || "Just Now"}
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>
                      {ann.expiryDate ? new Date(ann.expiryDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "--"}
                    </td>
                    <td>
                      <span className={`badge ${priorityColors[ann.priority] || "badge-info"}`}>
                        {ann.priority || "Normal"}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${statusColors[ann.status] || "badge-success"}`}>
                        {ann.status || "Published"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                        {(ann.status === "Draft" || ann.status === "Scheduled") && (
                          <button onClick={() => handlePublishAnn(ann.id)} title="Publish Now" className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "var(--success)" }}><CheckCircle2 size={13} /></button>
                        )}
                        <button onClick={() => handleOpenEditAnn(ann)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                        <button onClick={() => handleDeleteAnn(ann.id)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 3. FCM PUSH ALERTS ════════════ */}
      {activeTab === "push_notifications" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          {/* Dispatcher Form */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>FCM Push Notification Dispatcher</h3>
            
            <form onSubmit={handleDispatchPush} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>NOTIFICATION TITLE</label>
                <input 
                  type="text" 
                  value={customPushTitle}
                  onChange={(e) => setCustomPushTitle(e.target.value)}
                  placeholder="e.g. PTA Assembly Postponed"
                  required
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BODY TEXT MESSAGE</label>
                <textarea 
                  value={customPushBody}
                  onChange={(e) => setCustomPushBody(e.target.value)}
                  placeholder="Type push message details clearly..."
                  required
                  style={{ width: "100%", height: 70, padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", outline: "none", resize: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TARGET AUDIENCE</label>
                  <select 
                    value={customPushTarget} 
                    onChange={(e) => setCustomPushTarget(e.target.value)}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}
                  >
                    <option value="Entire School">Entire School</option>
                    <option value="Class 10 Only">Class 10 Only</option>
                    <option value="Class 9 Only">Class 9 Only</option>
                    <option value="Teachers &amp; Staff">Teachers &amp; Staff</option>
                    <option value="Bus Pilots">Bus Pilots</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%", height: 38, justifyContent: "center" }}>
                    <Send size={15} /> Trigger Broadcast Dispatch
                  </button>
                </div>
              </div>
            </form>

            <div style={{ marginTop: "0.5rem" }}>
              <strong style={{ fontSize: "0.85rem", color: "var(--text-heading)", display: "block", marginBottom: "0.5rem" }}>Recent Dispatch Logs:</strong>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "180px", overflowY: "auto" }}>
                {sentPushes.map(p => (
                  <div key={p.id} style={{ padding: "0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: "0.78rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "var(--text-heading)" }}>
                      <span>{p.title}</span>
                      <span style={{ color: "var(--primary)" }}>{p.target}</span>
                    </div>
                    <p style={{ margin: "2px 0", color: "var(--text-main)" }}>{p.body}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.7rem", marginTop: 4 }}>
                      <span>{p.time}</span>
                      <span style={{ color: "var(--success)", fontWeight: 700 }}>{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Mobile Notification Preview */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: 16, border: "1px solid var(--border-color)" }}>
            <div style={{ width: 260, height: 480, border: "8px solid #1f2937", borderRadius: 36, background: "#111827", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {/* Notch */}
              <div style={{ width: 100, height: 18, background: "#1f2937", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, margin: "0 auto", position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}></div>
              
              {/* Screen Content */}
              <div style={{ padding: "3rem 1rem 1rem 1rem", flex: 1, display: "flex", flexDirection: "column", gap: "1rem", backgroundImage: "linear-gradient(to bottom, #1e1b4b, #090514)" }}>
                {/* Status Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#9ca3af", position: "absolute", top: 8, left: 20, right: 20 }}>
                  <span>19:10</span>
                  <span>100% 🔋</span>
                </div>
                
                {/* Push Banner Mockup */}
                <div className="glass-card" style={{ padding: "0.75rem", borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(17, 24, 39, 0.85)", boxShadow: "0 10px 25px rgba(0,0,0,0.5)", transition: "all 0.3s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: "bold", color: "#fff" }}>M</div>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#fff" }}>SCHOOLMITRA</span>
                    <span style={{ fontSize: "0.6rem", color: "#9ca3af", marginLeft: "auto" }}>now</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff" }}>{customPushTitle || "Notification Title"}</div>
                  <div style={{ fontSize: "0.68rem", color: "#cbd5e1", marginTop: 2, lineHeight: "1.2" }}>{customPushBody || "Notification body text will be shown here as you type..."}</div>
                </div>
                
                {/* Lockscreen text */}
                <div style={{ marginTop: "auto", marginBottom: "2rem", textAlign: "center", color: "#9ca3af" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 300, color: "#fff" }}>19:10</div>
                  <div style={{ fontSize: "0.7rem", marginTop: 4 }}>Thursday, August 6</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--primary)", marginTop: "2rem" }}>Swipe up to open</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ 4. DIRECT CHAT MODULE ════════════ */}
      {activeTab === "chat" && (
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.5rem", height: 450 }}>
          {/* Active Chats Rooms */}
          <div className="glass-card" style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.45rem", overflowY: "auto" }}>
            <span style={{ padding: "0.5rem 0.75rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)" }}>ACTIVE CHAT ROOMS</span>
            {chatRooms.map(room => {
              const isSelected = activeChatRoomId === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveChatRoomId(room.id)}
                  className={`btn ${isSelected ? "btn-primary" : "btn-secondary"}`}
                  style={{ 
                    justifyContent: "flex-start", 
                    padding: "0.65rem 0.85rem", 
                    flexDirection: "column", 
                    alignItems: "flex-start", 
                    gap: 2,
                    border: isSelected ? "none" : "1px solid var(--border-color)",
                    transition: "all 0.25s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: room.id === "CR-03" ? "var(--accent)" : "var(--success)" }}></div>
                    <span style={{ fontSize: "0.825rem", fontWeight: 700, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{room.title.split(" ↔ ")[0]}</span>
                  </div>
                  <span style={{ fontSize: "0.68rem", opacity: 0.85, fontWeight: 400, maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "left" }}>
                    {room.lastMsg}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Chat Messenger Panel */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ fontWeight: 800, color: "var(--text-heading)", fontSize: "0.95rem" }}>
                  {chatRooms.find(r => r.id === activeChatRoomId)?.title}
                </strong>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  {activeChatRoomId === "CR-03" ? "Away • Driver Terminal" : "Online • Parent Active Session"}
                </div>
              </div>
              <span className="badge badge-info" style={{ fontSize: "0.65rem" }}>
                {chatRooms.find(r => r.id === activeChatRoomId)?.type}
              </span>
            </div>

            {/* Message Body */}
            <div style={{ flex: 1, padding: "1rem 0", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
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
                      maxWidth: "70%",
                      boxShadow: "var(--shadow-sm)"
                    }}
                  >
                    <div style={{ fontSize: "0.825rem" }}>{msg.text}</div>
                    <div style={{ fontSize: "0.62rem", color: isAdmin ? "#fff" : "var(--text-muted)", opacity: 0.8, textAlign: "right", marginTop: 4 }}>{msg.time}</div>
                  </div>
                );
              })}
            </div>

            {/* Input field */}
            <form onSubmit={handleSendChatMsg} style={{ display: "flex", gap: "0.5rem" }}>
              <input 
                type="text" 
                value={typedChatMsg}
                onChange={(e) => setTypedChatMsg(e.target.value)}
                placeholder="Type message here (Simulates real parent responses)..."
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
          {/* Archives manager */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Circulars Archive</h3>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <div style={{ position: "relative" }}>
                  <Search size={14} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input 
                    type="text" 
                    placeholder="Search circulars..."
                    value={circularSearch}
                    onChange={(e) => setCircularSearch(e.target.value)}
                    style={{ padding: "0.35rem 0.5rem 0.35rem 1.6rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.75rem", outline: "none" }}
                  />
                </div>
                <button onClick={handleOpenAddCircular} className="btn btn-primary" style={{ padding: "0.4rem 0.85rem", fontSize: "0.78rem" }}>
                  <Plus size={14} /> Add Circular
                </button>
              </div>
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
                {filteredCirculars.map(c => (
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
                {filteredCirculars.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>No circular records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Quick Publish panel */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1.25rem", color: "var(--text-heading)" }}>Publish Circular Notice</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CIRCULAR HEADER TITLE</label>
                <input 
                  type="text" 
                  id="circularQuickTitle"
                  placeholder="e.g. CBSE Registration Schedule PDF"
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ border: "2px dashed var(--border-color)", padding: "1.5rem", borderRadius: 8, textAlign: "center", cursor: "pointer" }}>
                <Upload size={24} color="var(--primary)" style={{ margin: "0 auto 0.5rem" }} />
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block" }}>Upload circular PDF / Image flyer</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: 4, display: "block" }}>Maximum attachment size: 5MB</span>
              </div>

              <button 
                onClick={() => {
                  const titleInput = document.getElementById("circularQuickTitle") as HTMLInputElement;
                  if (titleInput && titleInput.value) {
                    const created: CircularRecord = {
                      id: `CIR-${Date.now()}`,
                      title: titleInput.value,
                      format: "PDF Document",
                      date: new Date().toISOString().split("T")[0],
                      seen: 0,
                      downloads: 0
                    };
                    saveCirc([created, ...circulars]);
                    titleInput.value = "";
                    alert("Circular mapped and published to archives!");
                  } else {
                    alert("Please type a header title first!");
                  }
                }} 
                className="btn btn-primary" 
                style={{ padding: "0.75rem", justifyContent: "center" }}
              >
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Mapped Holidays &amp; Closures</h3>
              <p style={{ margin: 2, fontSize: "0.8rem", color: "var(--text-muted)" }}>Schedule dates and sync calendar closures onto the parent app.</p>
            </div>
            
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button 
                onClick={handleSyncHolidays}
                disabled={isSyncingHolidays}
                className="btn btn-secondary" 
                style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", border: "1px dashed var(--border-color)" }}
              >
                {isSyncingHolidays ? "Syncing..." : "Sync to Parent App"}
              </button>
              <button onClick={handleOpenAddHoliday} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
                <Plus size={15} /> Add Holiday
              </button>
            </div>
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
                  <td>
                    <span className={`badge ${h.status === "Synced with Parent App" ? "badge-success" : "badge-warning"}`}>
                      {h.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button onClick={() => handleOpenEditHoliday(h)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                      <button 
                        onClick={() => {
                          if (confirm("Delete this holiday record?")) {
                            const updated = holidays.filter(x => x.id !== h.id);
                            saveHol(updated);
                          }
                        }} 
                        className="btn btn-secondary" 
                        style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 8. PARENT FEEDBACK BOARD ════════════ */}
      {activeTab === "feedback" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            <div className="glass-card" style={{ padding: "1.1rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>AVERAGE RATING</span>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 2 }}>4.3 / 5.0 ⭐</div>
            </div>
            <div className="glass-card" style={{ padding: "1.1rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>TOTAL REVIEW FEEDBACKS</span>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-main)", marginTop: 2 }}>{feedbacksList.length}</div>
            </div>
            <div className="glass-card" style={{ padding: "1.1rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>5-STAR RATING COUNT</span>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 2 }}>{feedbacksList.filter(f => f.rating === 5).length}</div>
            </div>
            <div className="glass-card" style={{ padding: "1.1rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>PENDING RESPONSE</span>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#f59e0b", marginTop: 2 }}>{feedbacksList.filter(f => !f.reply).length}</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Review Feedbacks from Parents</h3>
              
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", fontWeight: 700 }}>Filter:</span>
                <select 
                  value={feedbackFilterRating}
                  onChange={(e) => setFeedbackFilterRating(e.target.value === "All" ? "All" : Number(e.target.value))}
                  style={{ padding: "0.4rem 0.6rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.8rem", fontWeight: 600 }}
                >
                  <option value="All">All Ratings</option>
                  <option value="5">5 Stars only</option>
                  <option value="4">4 Stars only</option>
                  <option value="3">3 Stars only</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filteredFeedbacks.map(f => (
                <div key={f.id} className="glass-card" style={{ padding: "1.15rem", background: "rgba(255,255,255,0.01)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <strong style={{ color: "var(--text-heading)", fontSize: "0.9rem" }}>{f.parent}</strong>
                      <span className="badge badge-info" style={{ marginLeft: "0.5rem", fontSize: "0.68rem" }}>{f.category}</span>
                    </div>
                    <div style={{ color: "#f59e0b", fontSize: "0.85rem" }}>
                      {"⭐".repeat(f.rating)}
                    </div>
                  </div>
                  <p style={{ margin: "0.5rem 0", fontSize: "0.825rem", color: "var(--text-main)" }}>{f.comments}</p>
                  
                  {f.reply ? (
                    <div style={{ background: "rgba(99, 102, 241, 0.06)", borderLeft: "3px solid var(--primary)", padding: "0.6rem 0.85rem", borderRadius: 4, marginTop: "0.5rem", fontSize: "0.8rem" }}>
                      <strong style={{ color: "var(--text-heading)", display: "block", marginBottom: 2 }}>School Official Response:</strong>
                      <span style={{ color: "var(--text-main)" }}>{f.reply}</span>
                    </div>
                  ) : (
                    <div>
                      {replyingFeedbackId === f.id ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.75rem" }}>
                          <textarea 
                            value={feedbackReplyText}
                            onChange={(e) => setFeedbackReplyText(e.target.value)}
                            placeholder="Write acknowledgement reply to parent app..."
                            style={{ width: "100%", height: 50, padding: "0.5rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.8rem", outline: "none", resize: "none" }}
                          />
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button onClick={() => handleFeedbackReply(f.id)} className="btn btn-primary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}>Send Response</button>
                            <button onClick={() => setReplyingFeedbackId(null)} className="btn btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => { setReplyingFeedbackId(f.id); setFeedbackReplyText(""); }} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem", gap: "0.25rem", marginTop: "0.5rem" }}>
                          <Send size={12} /> Send Response Acknowledgement
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {filteredFeedbacks.length === 0 && (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>No feedback reviews match filters.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════════════ 9. DECISION POLLS ════════════ */}
      {activeTab === "polls" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Header toolbar */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Decision Surveys &amp; Active Polls</h3>
              <p style={{ margin: 2, fontSize: "0.8rem", color: "var(--text-muted)" }}>Gather quick parent inputs and aggregate vote metrics.</p>
            </div>
            <button onClick={() => setIsPollModalOpen(true)} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Create Decision Poll
            </button>
          </div>

          {/* Poll Cards list */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {polls.map(p => {
              const totalVotes = p.votesYes + p.votesNo;
              const yesPercent = totalVotes > 0 ? Math.round((p.votesYes / totalVotes) * 100) : 0;
              const noPercent = totalVotes > 0 ? Math.round((p.votesNo / totalVotes) * 100) : 0;
              
              return (
                <div key={p.id} className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", border: p.active ? "1px solid var(--primary)" : "1px solid var(--border-color)", opacity: p.active ? 1 : 0.8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className={`badge ${p.active ? "badge-success" : "badge-secondary"}`} style={{ fontSize: "0.65rem" }}>
                      {p.active ? "Active Survey" : "Closed"}
                    </span>
                    <strong style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ID: {p.id}</strong>
                  </div>

                  <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>{p.question}</h4>

                  {/* Results bars */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", margin: "0.5rem 0" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: 4, fontWeight: 700 }}>
                        <span style={{ color: "var(--text-main)" }}>Agree / YES</span>
                        <span>{p.votesYes} Votes ({yesPercent}%)</span>
                      </div>
                      <div style={{ width: "100%", height: 8, background: "var(--bg-input)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${yesPercent}%`, height: "100%", background: "var(--success)", transition: "width 0.5s ease" }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: 4, fontWeight: 700 }}>
                        <span style={{ color: "var(--text-main)" }}>Disagree / NO</span>
                        <span>{p.votesNo} Votes ({noPercent}%)</span>
                      </div>
                      <div style={{ width: "100%", height: 8, background: "var(--bg-input)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${noPercent}%`, height: "100%", background: "var(--danger)", transition: "width 0.5s ease" }}></div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem", marginTop: "auto" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button 
                        disabled={!p.active} 
                        onClick={() => handleVote(p.id, "yes")} 
                        className={`btn ${votedPolls[p.id] === "yes" ? "btn-primary" : "btn-secondary"}`} 
                        style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}
                      >
                        👍 Vote Yes
                      </button>
                      <button 
                        disabled={!p.active} 
                        onClick={() => handleVote(p.id, "no")} 
                        className={`btn ${votedPolls[p.id] === "no" ? "btn-primary" : "btn-secondary"}`} 
                        style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}
                      >
                        👎 Vote No
                      </button>
                    </div>
                    <button 
                      onClick={() => {
                        setPolls(polls.map(x => x.id === p.id ? { ...x, active: !x.active } : x));
                      }}
                      className="btn btn-secondary" 
                      style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", border: "1px dashed var(--border-color)" }}
                    >
                      {p.active ? "Stop Survey" : "Restart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ════════════ 10. DELIVERY ANALYTICS ════════════ */}
      {activeTab === "analytics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Stat Indicators */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            <div className="glass-card" style={{ padding: "1.1rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: 40, height: 40, background: "var(--primary-glow)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                <Bell size={20} />
              </div>
              <div>
                <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 800 }}>PUSH ALERTS SENT</span>
                <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 1 }}>98.6% <span style={{ fontSize: "0.7rem", color: "var(--success)", fontWeight: 700 }}>↑ 1.2%</span></div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: "1.1rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: 40, height: 40, background: "rgba(6, 182, 212, 0.12)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--secondary)" }}>
                <Send size={20} />
              </div>
              <div>
                <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 800 }}>SMS DISPATCH RATE</span>
                <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 1 }}>95.2% <span style={{ fontSize: "0.7rem", color: "var(--success)", fontWeight: 700 }}>↑ 0.4%</span></div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: "1.1rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: 40, height: 40, background: "rgba(245, 158, 11, 0.12)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                <FileText size={20} />
              </div>
              <div>
                <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 800 }}>EMAIL DELIVERED</span>
                <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 1 }}>99.1% <span style={{ fontSize: "0.7rem", color: "var(--success)", fontWeight: 700 }}>↑ 0.1%</span></div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: "1.1rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: 40, height: 40, background: "rgba(16, 185, 129, 0.12)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--success)" }}>
                <Users size={20} />
              </div>
              <div>
                <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 800 }}>PARENT VIEW RATE</span>
                <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 1 }}>82.4% <span style={{ fontSize: "0.7rem", color: "var(--danger)", fontWeight: 700 }}>↓ 2.1%</span></div>
              </div>
            </div>
          </div>

          {/* Graph Section */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Transmission Trend Over Days</h4>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>Blue Line: Dispatched Notices | Cyan Line: Click Open Rates</p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button 
                  onClick={() => setAnalyticsRange("7days")}
                  className={`btn ${analyticsRange === "7days" ? "btn-primary" : "btn-secondary"}`} 
                  style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}
                >
                  Last 7 Days
                </button>
                <button 
                  onClick={() => setAnalyticsRange("30days")}
                  className={`btn ${analyticsRange === "30days" ? "btn-primary" : "btn-secondary"}`} 
                  style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}
                >
                  Last 30 Days
                </button>
              </div>
            </div>

            {/* SVG Chart */}
            <div style={{ padding: "0.5rem", borderRadius: 10, background: "rgba(0,0,0,0.12)" }}>
              <svg viewBox="0 0 500 200" style={{ width: "100%", height: 200, padding: 10 }}>
                {/* Horizontal grid lines */}
                <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(255,255,255,0.06)" />
                <line x1="40" y1="80" x2="480" y2="80" stroke="rgba(255,255,255,0.06)" />
                <line x1="40" y1="130" x2="480" y2="130" stroke="rgba(255,255,255,0.06)" />
                <line x1="40" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.15)" />
                
                {analyticsRange === "7days" ? (
                  <>
                    {/* Dispatched line */}
                    <path 
                      d="M 40 140 L 110 110 L 180 150 L 250 80 L 320 60 L 390 120 L 480 40" 
                      fill="none" 
                      stroke="var(--primary)" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    {/* Open line */}
                    <path 
                      d="M 40 170 L 110 145 L 180 175 L 250 120 L 320 95 L 390 150 L 480 75" 
                      fill="none" 
                      stroke="var(--secondary)" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeDasharray="4 4"
                    />
                    
                    {/* Points */}
                    <circle cx="110" cy="110" r="4.5" fill="var(--primary)" />
                    <circle cx="250" cy="80" r="4.5" fill="var(--primary)" />
                    <circle cx="320" cy="60" r="4.5" fill="var(--primary)" />
                    <circle cx="480" cy="40" r="4.5" fill="var(--primary)" />
                    
                    {/* X Labels */}
                    <text x="35" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">Mon</text>
                    <text x="105" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">Tue</text>
                    <text x="175" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">Wed</text>
                    <text x="245" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">Thu</text>
                    <text x="315" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">Fri</text>
                    <text x="385" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">Sat</text>
                    <text x="465" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">Sun</text>
                  </>
                ) : (
                  <>
                    <path 
                      d="M 40 160 Q 150 70 260 120 T 480 30" 
                      fill="none" 
                      stroke="var(--primary)" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                    />
                    <path 
                      d="M 40 180 Q 150 110 260 150 T 480 65" 
                      fill="none" 
                      stroke="var(--secondary)" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeDasharray="4 4"
                    />
                    <text x="35" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">1 Aug</text>
                    <text x="145" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">10 Aug</text>
                    <text x="255" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">20 Aug</text>
                    <text x="445" y="195" fill="var(--text-muted)" fontSize="8.5" fontWeight="600">30 Aug</text>
                  </>
                )}
                
                {/* Y Labels */}
                <text x="12" y="34" fill="var(--text-muted)" fontSize="8">100%</text>
                <text x="12" y="84" fill="var(--text-muted)" fontSize="8">50%</text>
                <text x="12" y="134" fill="var(--text-muted)" fontSize="8">20%</text>
                <text x="12" y="184" fill="var(--text-muted)" fontSize="8">0%</text>
              </svg>
            </div>
          </div>

          {/* Delivery Log */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-heading)", margin: "0 0 1rem 0" }}>Recent Transmission Log</h4>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Recipient Module</th>
                    <th>Alert Type</th>
                    <th>Logged Date</th>
                    <th>Status</th>
                    <th>Failure Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { target: "Aarav Sharma (Parent)", type: "FCM Push Notification", date: "Today, 18:40", status: "Success", reason: "—" },
                    { target: "All Bus Pilots (SMS)", type: "SMS Broadcast Alert", date: "Today, 15:30", status: "Success", reason: "—" },
                    { target: "Rohan Verma (Parent)", type: "FCM Push Notification", date: "Yesterday, 10:12", status: "Failed", reason: "Device offline > 24h" },
                    { target: "Ananya Patel (Email)", type: "Email Notice Board", date: "2 Aug 2026", status: "Success", reason: "—" }
                  ].map((log, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 700 }}>{log.target}</td>
                      <td>{log.type}</td>
                      <td>{log.date}</td>
                      <td>
                        <span className={`badge ${log.status === "Success" ? "badge-success" : "badge-danger"}`}>
                          {log.status}
                        </span>
                      </td>
                      <td style={{ color: log.status === "Failed" ? "var(--danger)" : "var(--text-muted)" }}>{log.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ ADD/EDIT ANNOUNCEMENT MODAL ════════════ */}
      {isAddAnnOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
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

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MESSAGE BODY</label>
                <textarea value={annForm.message} onChange={(e) => setAnnForm({ ...annForm, message: e.target.value })} required rows={4} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", resize: "vertical" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ATTACHMENT LINK (Optional)</label>
                <input type="text" value={annForm.attachment} onChange={(e) => setAnnForm({ ...annForm, attachment: e.target.value })} placeholder="https://example.com/file.pdf" style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TARGET AUDIENCE</label>
                  <select value={annForm.targetAudience} onChange={(e) => setAnnForm({ ...annForm, targetAudience: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="All Parents">All Parents</option>
                    <option value="All Teachers">All Teachers</option>
                    <option value="Specific Class">Specific Class</option>
                    <option value="Specific Section">Specific Section</option>
                    <option value="Specific Teacher">Specific Teacher</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PRIORITY</label>
                  <select value={annForm.priority} onChange={(e) => setAnnForm({ ...annForm, priority: e.target.value as any })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Conditional targeting selectors */}
              {annForm.targetAudience === "Specific Class" && (
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT TARGET CLASS</label>
                  <select value={annForm.classId} onChange={(e) => setAnnForm({ ...annForm, classId: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="">-- Choose Class --</option>
                    {dbClasses.map(c => (
                      <option key={c._id || c.id} value={c._id || c.id}>{c.className || c.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {annForm.targetAudience === "Specific Section" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CLASS</label>
                    <select value={annForm.classId} onChange={(e) => setAnnForm({ ...annForm, classId: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                      <option value="">-- Class --</option>
                      {dbClasses.map(c => (
                        <option key={c._id || c.id} value={c._id || c.id}>{c.className || c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SECTION</label>
                    <select value={annForm.sectionId} onChange={(e) => setAnnForm({ ...annForm, sectionId: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                      <option value="">-- Section --</option>
                      {dbSections.filter(s => !annForm.classId || s.classId === annForm.classId).map(s => (
                        <option key={s._id || s.id} value={s._id || s.id}>{s.sectionName || s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {annForm.targetAudience === "Specific Teacher" && (
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT TARGET TEACHER</label>
                  <select value={annForm.teacherId} onChange={(e) => setAnnForm({ ...annForm, teacherId: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="">-- Choose Teacher --</option>
                    {dbTeachers.map(t => (
                      <option key={t._id || t.id} value={t._id || t.id}>{t.name} ({t.email})</option>
                    ))}
                  </select>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PUBLISH DATE & TIME</label>
                  <input type="datetime-local" value={annForm.publishDate} onChange={(e) => setAnnForm({ ...annForm, publishDate: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EXPIRY DATE & TIME</label>
                  <input type="datetime-local" value={annForm.expiryDate} onChange={(e) => setAnnForm({ ...annForm, expiryDate: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STATUS</label>
                <select value={annForm.status} onChange={(e) => setAnnForm({ ...annForm, status: e.target.value as any })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
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

      {/* ════════════ CREATE DECISION POLL MODAL ════════════ */}
      {isPollModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                Create New Parent Survey Poll
              </h3>
              <button onClick={() => setIsPollModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreatePoll} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>POLL QUESTION</label>
                <input 
                  type="text" 
                  value={newPollQuestion} 
                  onChange={(e) => setNewPollQuestion(e.target.value)} 
                  placeholder="e.g. Do you support shifting the school start time by 30 mins later?"
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} 
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsPollModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Publish Poll</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
