"use client";

import React, { useState, useEffect } from "react";
import { 
  Megaphone, Plus, Sparkles, Send, Search, Filter, Trash2, 
  X, Check, Download, Users, Bell, AlertTriangle, Radio 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function SystemAnnouncementsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalBroadcasts: 3,
    scheduledCount: 1,
    publishedCount: 2,
    reachableSchools: 148,
    deliveryRate: "99.8%"
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState("All School Tenants");
  const [type, setType] = useState("Feature Update");
  const [status, setStatus] = useState("Published");
  const [content, setContent] = useState("");

  const fetchAnnouncements = async () => {
    setLoading(true);
    const local = localStorage.getItem("saas_system_announcements");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) setAnnouncements(parsed);
      } catch (e) {}
    }

    try {
      const res = await superAdminApi.getAnnouncements();
      if (res.success) {
        if (res.summary) setSummary(res.summary);
        if (res.announcements && Array.isArray(res.announcements) && res.announcements.length > 0) {
          setAnnouncements(res.announcements);
          localStorage.setItem("saas_system_announcements", JSON.stringify(res.announcements));
        }
      }
    } catch (err) {
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const optimisticObj = {
      id: `a-${Date.now()}`,
      title,
      audience,
      type,
      status,
      content,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    };

    setAnnouncements(prev => {
      const updated = [optimisticObj, ...prev];
      localStorage.setItem("saas_system_announcements", JSON.stringify(updated));
      return updated;
    });

    setIsModalOpen(false);
    setTitle("");
    setContent("");

    try {
      const res = await superAdminApi.createAnnouncement(optimisticObj);
      if (res.success && res.announcements) {
        setAnnouncements(res.announcements);
        localStorage.setItem("saas_system_announcements", JSON.stringify(res.announcements));
      }
    } catch (err) {
      console.error("Error creating announcement:", err);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this system broadcast log?")) return;

    setAnnouncements(prev => {
      const updated = prev.filter(a => a.id !== id);
      localStorage.setItem("saas_system_announcements", JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await superAdminApi.deleteAnnouncement(id);
      if (res.success && res.announcements) {
        setAnnouncements(res.announcements);
        localStorage.setItem("saas_system_announcements", JSON.stringify(res.announcements));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Title,Audience,Type,Status,Published Date,Content\n";
    announcements.forEach(a => {
      csvContent += `"${a.id}","${a.title}","${a.audience}","${a.type}","${a.status}","${a.date}","${a.content.replace(/"/g, '""')}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SchoolMitra_Broadcasts_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = (a.title || "").toLowerCase().includes(search.toLowerCase()) ||
                          (a.content || "").toLowerCase().includes(search.toLowerCase()) ||
                          (a.audience || "").toLowerCase().includes(search.toLowerCase());

    if (activeFilter === "published") return matchesSearch && a.status === "Published";
    if (activeFilter === "scheduled") return matchesSearch && a.status === "Scheduled";
    return matchesSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Radio size={14} /> Global Notice Broadcasting Engine
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Platform System Announcements & Notices
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Publish maintenance windows, platform updates, SLA advisories, and critical alerts across all subscriber portals.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={handleExportCSV} className="btn btn-secondary">
            <Download size={16} /> Export Logs CSV
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Send size={16} /> New System Broadcast
          </button>
        </div>
      </div>

      {/* 4 SUMMARY STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Broadcasts Logged</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{announcements.length} Notices Published</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Across system history</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Scheduled Future Notices</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--warning)", marginTop: 4 }}>{announcements.filter(a => a.status === "Scheduled").length} Scheduled</div>
          <div style={{ fontSize: "0.75rem", color: "var(--warning)", fontWeight: 700, marginTop: 4 }}>Upcoming maintenance windows</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Reachable School Tenants</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>{summary.reachableSchools} Schools</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>2.1+ Lakh Active Portal Users</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Broadcast Delivery SLA</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>{summary.deliveryRate}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>100% DB Synchronized</div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH BAR */}
      <div className="glass-card" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { id: "all", label: `All Notices (${announcements.length})` },
            { id: "published", label: `Published (${announcements.filter(a => a.status === "Published").length})` },
            { id: "scheduled", label: `Scheduled (${announcements.filter(a => a.status === "Scheduled").length})` }
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveFilter(tab.id as any)} 
              className={`btn ${activeFilter === tab.id ? 'btn-primary' : 'btn-secondary'}`}
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
            placeholder="Search broadcasts by title or text..."
            style={{ width: "100%", padding: "0.55rem 0.75rem 0.55rem 2.3rem", fontSize: "0.825rem" }}
          />
        </div>
      </div>

      {/* ════════════ ANNOUNCEMENTS LIST ════════════ */}
      <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {filteredAnnouncements.map((anc) => (
          <div key={anc.id} style={{
            padding: "1.35rem 1.5rem", borderRadius: "var(--radius-md)",
            background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)",
            display: "flex", flexDirection: "column", gap: "0.75rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <h4 style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text-heading)" }}>{anc.title}</h4>
                <span className={`badge ${anc.type === 'Maintenance' ? 'badge-danger' : 'badge-info'}`}>
                  {anc.type || "Notice"}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span className={`badge ${anc.status === 'Published' ? 'badge-success' : 'badge-warning'}`}>
                  {anc.status}
                </span>
                <button onClick={() => handleDeleteAnnouncement(anc.id)} className="btn btn-secondary" style={{ padding: "0.35rem 0.55rem", color: "var(--danger)" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <p style={{ fontSize: "0.88rem", color: "var(--text-main)", lineHeight: 1.5 }}>{anc.content}</p>

            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.6rem", fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <span>Target Audience: <strong style={{ color: "var(--primary)" }}>{anc.audience}</strong></span>
              <span>Published Date: {anc.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE ANNOUNCEMENT MODAL */}
      {isModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 520, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-heading)" }}>Publish System Broadcast Notice</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateAnnouncement} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BROADCAST TITLE</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Platform Scheduled Maintenance Window v2.5" 
                  required 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TARGET AUDIENCE</label>
                  <select value={audience} onChange={(e) => setAudience(e.target.value)} style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }}>
                    <option value="All School Tenants">All School Tenants</option>
                    <option value="School Admin & Principals">School Admin & Principals</option>
                    <option value="Teachers & Staff">Teachers & Staff</option>
                    <option value="Parents & Students">Parents & Students</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BROADCAST TYPE</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }}>
                    <option value="Feature Update">Feature Update</option>
                    <option value="Maintenance">Maintenance Window</option>
                    <option value="Alert Notice">Critical Alert Notice</option>
                    <option value="General Notice">General Announcement</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ANNOUNCEMENT CONTENT BODY</label>
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  rows={4} 
                  placeholder="Write the full broadcast notice details..." 
                  required
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem", resize: "vertical" }} 
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Broadcast Notice to DB</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
