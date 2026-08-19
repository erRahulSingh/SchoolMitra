"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  PartyPopper, Plus, X, Edit3, Trash2, Search, Filter, Eye,
  Send, Calendar, Clock, MapPin, Users, Star, Sparkles,
  CheckCircle2, AlertCircle, Award, BookOpen, Flag, Megaphone,
  Trophy, GraduationCap, Palette, Briefcase, Target
} from "lucide-react";

interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  organizer: string;
  targetAudience: string;
  status: string;
  isRecurring: boolean;
  notificationSent: boolean;
  publishedAt: string;
  createdAt: string;
}

const EVENT_TYPE_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  Annual_Day: { icon: <PartyPopper size={16} />, color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  Sports_Day: { icon: <Trophy size={16} />, color: "#10b981", bg: "rgba(16,185,129,0.15)" },
  PTM: { icon: <Users size={16} />, color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  Cultural: { icon: <Palette size={16} />, color: "#a855f7", bg: "rgba(168,85,247,0.15)" },
  Workshop: { icon: <Briefcase size={16} />, color: "#06b6d4", bg: "rgba(6,182,212,0.15)" },
  Competition: { icon: <Award size={16} />, color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
  Field_Trip: { icon: <MapPin size={16} />, color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
  Examination: { icon: <BookOpen size={16} />, color: "#f97316", bg: "rgba(249,115,22,0.15)" },
  Orientation: { icon: <GraduationCap size={16} />, color: "#8b5cf6", bg: "rgba(139,92,246,0.15)" },
  Farewell: { icon: <Star size={16} />, color: "#ec4899", bg: "rgba(236,72,153,0.15)" },
  Custom: { icon: <Target size={16} />, color: "#64748b", bg: "rgba(100,116,139,0.15)" },
};

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  Draft: { color: "#94a3b8", bg: "rgba(148,163,184,0.15)" },
  Published: { color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
  Ongoing: { color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  Completed: { color: "#10b981", bg: "rgba(16,185,129,0.15)" },
  Cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
};

export default function EventsPage() {
  const { resolvedTheme } = useTheme();
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SchoolEvent | null>(null);
  const [viewingEvent, setViewingEvent] = useState<SchoolEvent | null>(null);

  const [eventForm, setEventForm] = useState({
    title: "", description: "", eventType: "Custom", startDate: "", endDate: "",
    startTime: "", endTime: "", venue: "", organizer: "", targetAudience: "All",
    isRecurring: false,
  });

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter !== "All") params.set("type", typeFilter);
      if (statusFilter !== "All") params.set("status", statusFilter);

      const res = await fetch(`http://localhost:5000/api/v1/events?${params}`);
      const json = await res.json();
      if (json.success) setEvents(json.data.events);
    } catch (err) {
      console.error("Events fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, [typeFilter, statusFilter]);

  // Create/Update event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.startDate || !eventForm.endDate) return;

    try {
      const isEdit = !!editingEvent;
      const url = isEdit
        ? `http://localhost:5000/api/v1/events/${editingEvent!.id}`
        : `http://localhost:5000/api/v1/events`;

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventForm),
      });
      const json = await res.json();
      if (json.success) {
        alert(isEdit ? "Event updated!" : "Event created successfully!");
        setIsModalOpen(false);
        setEditingEvent(null);
        setEventForm({ title: "", description: "", eventType: "Custom", startDate: "", endDate: "", startTime: "", endTime: "", venue: "", organizer: "", targetAudience: "All", isRecurring: false });
        fetchEvents();
      } else {
        alert(`Failed to save event: ${json.message || "Unknown error"}`);
      }
    } catch (err: any) {
      alert(`Error saving event: ${err.message || err}`);
    }
  };

  // Delete event
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete event "${title}"?`)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/v1/events/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) { alert("Event deleted"); fetchEvents(); }
    } catch (err) { alert("Error deleting event"); }
  };

  // Publish event
  const handlePublish = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/events/${id}/publish`, { method: "PATCH" });
      const json = await res.json();
      if (json.success) {
        alert(`Event published! ${json.data.notifiedCount} notifications sent.`);
        fetchEvents();
      }
    } catch (err) { alert("Error publishing event"); }
  };

  // Filter events by search
  const filteredEvents = events.filter(e =>
    !searchQuery || e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.venue?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats
  const totalEvents = events.length;
  const publishedEvents = events.filter(e => e.status === "Published").length;
  const draftEvents = events.filter(e => e.status === "Draft").length;
  const upcomingEvents = events.filter(e => new Date(e.startDate) > new Date()).length;

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "var(--bg-dark)", transition: "background 0.3s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "12px" }}>
            <PartyPopper size={32} color="#f59e0b" />
            Events Management
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: "4px", fontSize: "14px" }}>
            Create, manage, and publish school events
          </p>
        </div>
        <button
          onClick={() => {
            setEditingEvent(null);
            setEventForm({ title: "", description: "", eventType: "Custom", startDate: "", endDate: "", startTime: "", endTime: "", venue: "", organizer: "", targetAudience: "All", isRecurring: false });
            setIsModalOpen(true);
          }}
          style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
            background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff",
            borderRadius: "12px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "14px",
          }}
        >
          <Plus size={18} /> Create Event
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Events", value: totalEvents, icon: <PartyPopper size={22} />, color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
          { label: "Published", value: publishedEvents, icon: <CheckCircle2 size={22} />, color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
          { label: "Drafts", value: draftEvents, icon: <Edit3 size={22} />, color: "#94a3b8", bg: "rgba(148,163,184,0.15)" },
          { label: "Upcoming", value: upcomingEvents, icon: <Calendar size={22} />, color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
        ].map((stat, i) => (
          <div key={i} style={{
            background: "var(--bg-card)", borderRadius: "16px", padding: "20px",
            border: "1px solid var(--border-color)", transition: "all 0.3s ease",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "4px" }}>{stat.label}</p>
                <p style={{ color: "var(--text-heading)", fontSize: "28px", fontWeight: 800 }}>{stat.value}</p>
              </div>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "200px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px 10px 38px", borderRadius: "10px",
              background: "var(--bg-input)", border: "1px solid var(--border-color)",
              color: "var(--text-main)", fontSize: "13px", outline: "none",
            }}
          />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", cursor: "pointer", outline: "none" }}>
          <option value="All">All Types</option>
          {Object.keys(EVENT_TYPE_CONFIG).map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", cursor: "pointer", outline: "none" }}>
          <option value="All">All Status</option>
          {["Draft", "Published", "Ongoing", "Completed", "Cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <Sparkles size={40} style={{ opacity: 0.3, marginBottom: "12px" }} />
          <p>Loading events...</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "16px" }}>
          {filteredEvents.map((event) => {
            const config = EVENT_TYPE_CONFIG[event.eventType] || EVENT_TYPE_CONFIG.Custom;
            const statusCfg = STATUS_CONFIG[event.status] || STATUS_CONFIG.Draft;
            const isUpcoming = new Date(event.startDate) > new Date();

            return (
              <div key={event.id} style={{
                background: "var(--bg-card)", borderRadius: "18px", padding: "22px",
                border: "1px solid var(--border-color)", transition: "all 0.2s ease", position: "relative", overflow: "hidden",
              }}>
                {/* Accent bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: `linear-gradient(90deg, ${config.color}, ${config.color}50)`,
                }} />

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "12px", background: config.bg,
                      display: "flex", alignItems: "center", justifyContent: "center", color: config.color,
                    }}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 style={{ color: "var(--text-heading)", fontWeight: 700, fontSize: "15px", marginBottom: "2px" }}>{event.title}</h3>
                      <span style={{
                        padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600,
                        background: statusCfg.bg, color: statusCfg.color,
                      }}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    padding: "3px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 600,
                    background: config.bg, color: config.color,
                  }}>
                    {event.eventType.replace(/_/g, " ")}
                  </span>
                </div>

                {/* Description */}
                {event.description && (
                  <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "14px", lineHeight: "1.5",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any, overflow: "hidden" }}>
                    {event.description}
                  </p>
                )}

                {/* Details Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                    <Calendar size={13} color="var(--primary)" />
                    {new Date(event.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    {event.endDate !== event.startDate && ` — ${new Date(event.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`}
                  </div>
                  {event.startTime && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                      <Clock size={13} color="#f59e0b" />
                      {event.startTime}{event.endTime ? ` — ${event.endTime}` : ""}
                    </div>
                  )}
                  {event.venue && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                      <MapPin size={13} color="#10b981" />
                      {event.venue}
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                    <Users size={13} color="#a855f7" />
                    {event.targetAudience}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "8px", borderTop: "1px solid var(--border-color)", paddingTop: "14px" }}>
                  <button onClick={() => setViewingEvent(event)}
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer", background: "var(--primary-glow)", color: "var(--primary)", fontSize: "12px", fontWeight: 600 }}>
                    <Eye size={14} /> View
                  </button>
                  <button onClick={() => {
                    setEditingEvent(event);
                    setEventForm({
                      title: event.title, description: event.description, eventType: event.eventType,
                      startDate: event.startDate.split("T")[0], endDate: event.endDate.split("T")[0],
                      startTime: event.startTime || "", endTime: event.endTime || "",
                      venue: event.venue || "", organizer: event.organizer || "",
                      targetAudience: event.targetAudience, isRecurring: event.isRecurring,
                    });
                    setIsModalOpen(true);
                  }}
                    style={{ padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer", background: "rgba(245,158,11,0.1)", color: "#fbbf24", fontSize: "12px" }}>
                    <Edit3 size={14} />
                  </button>
                  {event.status === "Draft" && (
                    <button onClick={() => handlePublish(event.id)}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer", background: "rgba(34,197,94,0.1)", color: "#4ade80", fontSize: "12px", fontWeight: 600 }}>
                      <Send size={14} /> Publish
                    </button>
                  )}
                  <button onClick={() => handleDelete(event.id, event.title)}
                    style={{ padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer", background: "rgba(239,68,68,0.1)", color: "#f87171", fontSize: "12px" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredEvents.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
          <PartyPopper size={48} style={{ opacity: 0.2, marginBottom: "16px" }} />
          <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px", color: "var(--text-heading)" }}>No events found</p>
          <p style={{ fontSize: "13px" }}>Create your first event to get started</p>
        </div>
      )}

      {/* ═══ EVENT DETAIL MODAL ═══ */}
      {viewingEvent && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        }}>
          <div style={{
            background: "var(--bg-modal)", borderRadius: "20px", padding: "28px",
            width: "520px", maxWidth: "90vw", maxHeight: "80vh", overflowY: "auto",
            border: "1px solid var(--border-color)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ color: "var(--text-heading)", fontWeight: 700, fontSize: "20px" }}>{viewingEvent.title}</h3>
              <button onClick={() => setViewingEvent(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <span style={{
                padding: "4px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                background: (EVENT_TYPE_CONFIG[viewingEvent.eventType] || EVENT_TYPE_CONFIG.Custom).bg,
                color: (EVENT_TYPE_CONFIG[viewingEvent.eventType] || EVENT_TYPE_CONFIG.Custom).color,
              }}>
                {viewingEvent.eventType.replace(/_/g, " ")}
              </span>
              <span style={{
                padding: "4px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                background: (STATUS_CONFIG[viewingEvent.status] || STATUS_CONFIG.Draft).bg,
                color: (STATUS_CONFIG[viewingEvent.status] || STATUS_CONFIG.Draft).color,
              }}>
                {viewingEvent.status}
              </span>
            </div>

            {viewingEvent.description && (
              <p style={{ color: "var(--text-main)", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>{viewingEvent.description}</p>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { icon: <Calendar size={16} color="var(--primary)" />, label: "Date", value: `${new Date(viewingEvent.startDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}${viewingEvent.endDate !== viewingEvent.startDate ? ` — ${new Date(viewingEvent.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}` : ""}` },
                { icon: <Clock size={16} color="#f59e0b" />, label: "Time", value: viewingEvent.startTime ? `${viewingEvent.startTime}${viewingEvent.endTime ? ` — ${viewingEvent.endTime}` : ""}` : "All Day" },
                { icon: <MapPin size={16} color="#10b981" />, label: "Venue", value: viewingEvent.venue || "Not specified" },
                { icon: <Users size={16} color="#a855f7" />, label: "Audience", value: viewingEvent.targetAudience },
              ].map((info, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px", borderRadius: "10px", background: "var(--bg-input)" }}>
                  {info.icon}
                  <div>
                    <p style={{ color: "var(--text-muted)", fontSize: "11px", marginBottom: "2px" }}>{info.label}</p>
                    <p style={{ color: "var(--text-heading)", fontSize: "13px", fontWeight: 600 }}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {viewingEvent.organizer && (
              <div style={{ marginTop: "16px", padding: "12px", borderRadius: "10px", background: "var(--bg-input)" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "11px", marginBottom: "2px" }}>Organizer</p>
                <p style={{ color: "var(--text-heading)", fontSize: "13px", fontWeight: 600 }}>{viewingEvent.organizer}</p>
              </div>
            )}

            {viewingEvent.notificationSent && (
              <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px", color: "var(--success)", fontSize: "13px" }}>
                <CheckCircle2 size={16} /> Notifications sent to {viewingEvent.targetAudience}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ CREATE/EDIT EVENT MODAL ═══ */}
      {isModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        }}>
          <div style={{
            background: "var(--bg-modal)", borderRadius: "20px", padding: "28px",
            width: "540px", maxWidth: "90vw", maxHeight: "85vh", overflowY: "auto",
            border: "1px solid var(--border-color)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ color: "var(--text-heading)", fontWeight: 700, fontSize: "18px" }}>
                {editingEvent ? "Edit Event" : "Create New Event"}
              </h3>
              <button onClick={() => { setIsModalOpen(false); setEditingEvent(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                  Event Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", outline: "none" }}
                  placeholder="e.g., Annual Day Celebration" />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Description</label>
                <textarea value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} rows={3}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", outline: "none", resize: "vertical" }}
                  placeholder="Event details..." />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Event Type</label>
                  <select value={eventForm.eventType} onChange={(e) => setEventForm({ ...eventForm, eventType: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    {Object.keys(EVENT_TYPE_CONFIG).map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Target Audience</label>
                  <select value={eventForm.targetAudience} onChange={(e) => setEventForm({ ...eventForm, targetAudience: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                    {["All", "Students", "Teachers", "Parents", "Staff", "Class_Specific"].map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                    Start Date <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input type="date" value={eventForm.startDate} onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })} required
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                    End Date <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input type="date" value={eventForm.endDate} onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })} required
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", outline: "none" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Start Time</label>
                  <input value={eventForm.startTime} onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })} placeholder="09:00 AM"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>End Time</label>
                  <input value={eventForm.endTime} onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })} placeholder="02:00 PM"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", outline: "none" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Venue</label>
                  <input value={eventForm.venue} onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })} placeholder="School Auditorium"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Organizer</label>
                  <input value={eventForm.organizer} onChange={(e) => setEventForm({ ...eventForm, organizer: e.target.value })} placeholder="Cultural Committee"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "13px", outline: "none" }} />
                </div>
              </div>

              <button type="submit"
                style={{
                  width: "100%", padding: "12px", borderRadius: "12px", border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff",
                  fontWeight: 700, fontSize: "14px",
                }}>
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
