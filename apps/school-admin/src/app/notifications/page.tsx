"use client";

import React, { useState, useEffect } from "react";
import { 
  Bell, Send, Users, ShieldAlert, Sparkles, CheckCircle2, 
  MessageSquare, Radio, Phone, Mail, Clock, Trash2, X, Plus, Search, Calendar, FileText
} from "lucide-react";

interface SentNotification {
  id: string;
  title: string;
  body: string;
  target: string;
  sentAt: string;
  channels: string[];
  readRate: string;
}

interface ScheduledNotification {
  id: string;
  title: string;
  body: string;
  target: string;
  scheduleAt: string;
  channels: string[];
}

export default function NotificationsPage() {
  const [targetAudience, setTargetAudience] = useState("all");
  const [deliveryChannels, setDeliveryChannels] = useState<string[]>(["push", "board"]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);

  const [historySearch, setHistorySearch] = useState("");
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<SentNotification | null>(null);

  // Sent Notifications History
  const [sentHistory, setSentHistory] = useState<SentNotification[]>([]);
  const [loading, setLoading] = useState(false);

  // Scheduled Queue Notifications (kept local for simulator)
  const [scheduledQueue, setScheduledQueue] = useState<ScheduledNotification[]>([
    { 
      id: "s1", 
      title: "Independence Day Dress Rehearsal Notice", 
      body: "Students must attend in full ceremonial uniform tomorrow for the final rehearsal parade.",
      target: "All School", 
      scheduleAt: "2026-08-14T08:00", 
      channels: ["push", "board"] 
    }
  ]);

  const toggleChannel = (channel: string) => {
    if (deliveryChannels.includes(channel)) {
      setDeliveryChannels(deliveryChannels.filter(c => c !== channel));
    } else {
      setDeliveryChannels([...deliveryChannels, channel]);
    }
  };

  // Sync with DB
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/notifications/history");
      const json = await res.json();
      if (json.success) {
        setSentHistory(json.data.history);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    if (isScheduled) {
      if (!scheduleTime) {
        alert("Please select a date and time for the schedule!");
        return;
      }
      const newScheduled: ScheduledNotification = {
        id: "s_" + Date.now(),
        title,
        body: message,
        target: targetAudience === "all" ? "All School" : targetAudience === "parents" ? "Parents Only" : targetAudience === "teachers" ? "Teachers Only" : "Drivers Only",
        scheduleAt: scheduleTime,
        channels: deliveryChannels
      };
      setScheduledQueue([newScheduled, ...scheduledQueue]);
      alert("Notification scheduled successfully!");
    } else {
      setLoading(true);
      try {
        const targetStr = targetAudience === "all" ? "All School" : targetAudience === "parents" ? "Parents Only" : targetAudience === "teachers" ? "Teachers Only" : "Drivers Only";
        const res = await fetch("http://localhost:5000/api/v1/notifications/broadcast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            body: message,
            target: targetStr
          })
        });
        const json = await res.json();
        if (json.success) {
          setIsSuccessAlert(true);
          setTimeout(() => setIsSuccessAlert(false), 4000);
          fetchHistory();
        }
      } catch (err) {
        console.error(err);
        alert("Failed to send broadcast.");
      } finally {
        setLoading(false);
      }
    }

    setTitle("");
    setMessage("");
    setScheduleTime("");
    setIsScheduled(false);
  };

  const handleDeleteHistory = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this broadcast log from database?")) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/notifications/history/${id}`, {
        method: "DELETE"
      });
      const json = await res.json();
      if (json.success) {
        fetchHistory();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete log.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScheduled = (id: string) => {
    if (confirm("Cancel this scheduled broadcast?")) {
      setScheduledQueue(scheduledQueue.filter(s => s.id !== id));
    }
  };

  const templates = [
    { title: "🏫 School Holiday Alert", body: "Dear parents, school will remain closed tomorrow on account of Raksha Bandhan. Classes resume on Tuesday.", audience: "all", channels: ["push", "board"] },
    { title: "🚌 Route Delay Alert", body: "School bus on Route 4 is running late by 15 minutes due to engine overheating. Replacements are active.", audience: "parents", channels: ["push", "sms"] },
    { title: "💳 Fee Reminder Notice", body: "Kindly note that Second Quarter school fees are due by 15th August. Please ignore if already paid.", audience: "parents", channels: ["push", "email", "board"] },
    { title: "📝 Urgent Faculty Assembly", body: "Mid-Term result compile sheets need checks today. Assembly in Main Lounge at 3:15 PM.", audience: "teachers", channels: ["board", "email"] }
  ];

  const applyTemplate = (t: typeof templates[0]) => {
    setTitle(t.title);
    setMessage(t.body);
    setTargetAudience(t.audience);
    setDeliveryChannels(t.channels);
  };

  const filteredHistory = sentHistory.filter(h => 
    h.title.toLowerCase().includes(historySearch.toLowerCase()) ||
    h.body.toLowerCase().includes(historySearch.toLowerCase()) ||
    h.target.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
            Notifications &amp; Dispatch Console <Bell size={22} style={{ display: "inline-block", color: "var(--primary)", verticalAlign: "middle", marginLeft: 4 }} />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0, fontSize: "0.85rem" }}>
            Broadcast real-time push announcements, SMS alerts, system cards, and circular emails to the school network.
          </p>
        </div>
      </div>

      {/* STATISTICS OVERVIEW BAR */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        <div className="glass-card" style={{ padding: "1.1rem" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>TOTAL BROADCASTS</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 2 }}>{sentHistory.length}</div>
        </div>
        <div className="glass-card" style={{ padding: "1.1rem" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>AVG DELIVERY RATE</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 2 }}>97.3%</div>
        </div>
        <div className="glass-card" style={{ padding: "1.1rem" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>SCHEDULED QUEUE</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--accent)", marginTop: 2 }}>{scheduledQueue.length}</div>
        </div>
        <div className="glass-card" style={{ padding: "1.1rem" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>CHANNELS CONNECTED</span>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 2 }}>4 / 4</div>
        </div>
      </div>

      {/* COMPOSER & PREVIEW DUAL DIVISION */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.5rem" }}>
        
        {/* Left Column: composer */}
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Compose Broadcast Alert</h3>
          
          {isSuccessAlert && (
            <div style={{ padding: "0.85rem", background: "var(--success-bg)", border: "1px solid var(--success)", borderRadius: "var(--radius-sm)", color: "var(--success)", fontSize: "0.825rem", fontWeight: 700, textAlign: "center" }}>
              🚀 Notification dispatched successfully! Sent to target channels.
            </div>
          )}

          <form onSubmit={handleSendBroadcast} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Recipient Audience */}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>TARGET RECIPIENT AUDIENCE</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                {[
                  { id: "all", label: "All School", icon: Users },
                  { id: "parents", label: "Parents", icon: Users },
                  { id: "teachers", label: "Teachers", icon: Users },
                  { id: "drivers", label: "Drivers", icon: Users }
                ].map((aud) => {
                  const AudIcon = aud.icon;
                  const isSelected = targetAudience === aud.id;
                  return (
                    <button
                      key={aud.id}
                      type="button"
                      onClick={() => setTargetAudience(aud.id)}
                      style={{
                        padding: "0.6rem 0.5rem", borderRadius: 8, border: isSelected ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                        background: isSelected ? "var(--primary-glow)" : "var(--bg-input)",
                        color: isSelected ? "var(--text-heading)" : "var(--text-muted)", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem", transition: "all 0.2s ease"
                      }}
                    >
                      <AudIcon size={14} /> {aud.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Channels */}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>DELIVERY CHANNELS</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                {[
                  { id: "push", label: "Push Notification", icon: Bell },
                  { id: "sms", label: "SMS Alert", icon: Phone },
                  { id: "email", label: "Email Copy", icon: Mail },
                  { id: "board", label: "System Board", icon: Radio }
                ].map(chan => {
                  const ChanIcon = chan.icon;
                  const isActive = deliveryChannels.includes(chan.id);
                  return (
                    <button
                      key={chan.id}
                      type="button"
                      onClick={() => toggleChannel(chan.id)}
                      style={{
                        padding: "0.6rem 0.5rem", borderRadius: 8, border: isActive ? "1px solid var(--secondary)" : "1px solid var(--border-color)",
                        background: isActive ? "rgba(6, 182, 212, 0.15)" : "var(--bg-input)",
                        color: isActive ? "var(--text-heading)" : "var(--text-muted)", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem", transition: "all 0.2s ease"
                      }}
                    >
                      <ChanIcon size={14} /> {chan.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>ANNOUNCEMENT TITLE</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mid-Term Examination Timetable 2026 Published"
                  required
                  style={{ width: "100%", padding: "0.65rem 0.8rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>MESSAGE CONTENT &amp; NOTIFICATION BODY</label>
                <textarea 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter detailed notice message to broadcast..."
                  required
                  style={{ width: "100%", padding: "0.65rem 0.8rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", resize: "none", outline: "none" }}
                />
              </div>
            </div>

            {/* Scheduling option */}
            <div className="glass-card" style={{ padding: "0.85rem", background: "rgba(255,255,255,0.01)", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-heading)", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  <Clock size={15} color="var(--primary)" /> Schedule broadcast dispatch?
                </span>
                <input 
                  type="checkbox" 
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  style={{ cursor: "pointer", width: 16, height: 16 }}
                />
              </div>
              {isScheduled && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Target Time:</span>
                  <input 
                    type="datetime-local" 
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    required
                    style={{ padding: "0.35rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.75rem" }}
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.6rem 1.5rem", gap: "0.45rem" }}>
                <Send size={16} />
                <span>{isScheduled ? "Schedule Dispatch Queue" : "Broadcast Dispatch Now"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Preview & Templates */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Live Mobile notification preview mockup */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1.25rem", background: "rgba(0,0,0,0.3)", borderRadius: 16, border: "1px solid var(--border-color)" }}>
            <div style={{ width: 260, height: 350, border: "8px solid #1f2937", borderRadius: 32, background: "#111827", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {/* Notch */}
              <div style={{ width: 80, height: 14, background: "#1f2937", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, margin: "0 auto", position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}></div>
              
              {/* Wallpaper Screen */}
              <div style={{ padding: "2.5rem 0.85rem 0.85rem 0.85rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.85rem", backgroundImage: "linear-gradient(to bottom, #0f172a, #030712)" }}>
                
                {/* Channel Preview Banner */}
                {deliveryChannels.includes("push") && (
                  <div className="glass-card" style={{ padding: "0.6rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(17, 24, 39, 0.9)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justify: "center", fontSize: "0.55rem", fontWeight: "bold", color: "#fff" }}>SM</div>
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#fff" }}>Push Notification</span>
                      <span style={{ fontSize: "0.55rem", color: "var(--text-muted)", marginLeft: "auto" }}>now</span>
                    </div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#fff", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{title || "PTA General Meet"}</div>
                    <div style={{ fontSize: "0.65rem", color: "#d1d5db", marginTop: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.2" }}>
                      {message || "Compose details on the left to see live preview in push alert format."}
                    </div>
                  </div>
                )}

                {deliveryChannels.includes("sms") && (
                  <div className="glass-card" style={{ padding: "0.6rem", borderRadius: 10, border: "1px solid rgba(6, 182, 212, 0.3)", background: "rgba(16, 185, 129, 0.08)", marginTop: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--secondary)" }}>SMS Alert [Sender ID: SCHMTR]</span>
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "#fff", fontFamily: "monospace", wordBreak: "break-word" }}>
                      SM_SMS: {title ? `[${title}] ` : ""}{message || "SMS message body preview..."}
                    </div>
                  </div>
                )}

                {deliveryChannels.includes("email") && (
                  <div className="glass-card" style={{ padding: "0.6rem", borderRadius: 10, border: "1px solid var(--border-color)", background: "rgba(17, 24, 39, 0.95)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, borderBottom: "1px solid var(--border-color)", paddingBottom: 2, marginBottom: 4 }}>
                      <Mail size={10} color="var(--accent)" />
                      <span style={{ fontSize: "0.58rem", color: "var(--text-muted)" }}>To: parent@schoolmitra.com</span>
                    </div>
                    <strong style={{ fontSize: "0.65rem", color: "#fff", display: "block" }}>Sub: {title || "School Newsletter"}</strong>
                    <div style={{ fontSize: "0.6rem", color: "#cbd5e1", marginTop: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {message || "Email body copy representation..."}
                    </div>
                  </div>
                )}

                {deliveryChannels.includes("board") && (
                  <div className="glass-card" style={{ padding: "0.6rem", borderRadius: 10, background: "rgba(99, 102, 241, 0.07)", borderLeft: "3.5px solid var(--primary)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                      <Radio size={10} color="var(--primary)" />
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--text-heading)" }}>Notice Board Announcement</span>
                    </div>
                    <strong style={{ fontSize: "0.68rem", color: "#fff", display: "block" }}>{title || "Notice Header"}</strong>
                  </div>
                )}
                
                {deliveryChannels.length === 0 && (
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.7rem", textAlign: "center", border: "1px dashed var(--border-color)", borderRadius: 10 }}>
                    Select delivery channels to display device previews.
                  </div>
                )}

                {/* Clock wallpaper */}
                <div style={{ marginTop: "auto", textAlign: "center", color: "#6b7280", fontSize: "0.6rem" }}>
                  Lock Screen Preview
                </div>
              </div>
            </div>
          </div>

          {/* Quick Templates Panel */}
          <div className="glass-card" style={{ padding: "1.15rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>QUICK NOTICE TEMPLATES</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "170px", overflowY: "auto" }}>
              {templates.map((tpl, idx) => (
                <button
                  key={idx}
                  onClick={() => applyTemplate(tpl)}
                  className="btn btn-secondary"
                  style={{
                    padding: "0.5rem 0.75rem", fontSize: "0.75rem", justifyContent: "flex-start", textAlign: "left",
                    flexDirection: "column", alignItems: "flex-start", gap: 2, border: "1px solid var(--border-color)"
                  }}
                >
                  <strong style={{ fontSize: "0.78rem", color: "var(--text-heading)" }}>{tpl.title}</strong>
                  <span style={{ fontSize: "0.68rem", opacity: 0.8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>{tpl.body}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* SCHEDULED QUEUE QUEUE */}
      {scheduledQueue.length > 0 && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: "0 0 1rem 0" }}>Pending Scheduled Broadcasts Queue</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {scheduledQueue.map((s) => (
              <div key={s.id} className="glass-card" style={{ padding: "1.15rem", border: "1px solid var(--border-color)", background: "rgba(255,255,255,0.01)", display: "flex", flexDirection: "column", justify: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="badge badge-warning" style={{ fontSize: "0.65rem" }}>Pending Schedule</span>
                    <button onClick={() => handleDeleteScheduled(s.id)} style={{ background: "none", border: "none", color: "var(--danger)", cursor: "pointer" }} title="Cancel schedule">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <strong style={{ fontSize: "0.85rem", color: "var(--text-heading)", display: "block", marginTop: 8 }}>{s.title}</strong>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "4px 0", lineHeight: "1.3" }}>{s.body}</p>
                </div>
                <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: 8, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.68rem" }}>
                  <span style={{ color: "var(--text-dim)" }}>Channels: <strong>{s.channels.join(", ")}</strong></span>
                  <span style={{ color: "var(--accent)" }}>⏰ {s.scheduleAt.replace("T", " ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BROADCAST HISTORY LOGS */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Recent Broadcast Dispatch History</h3>
          
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input 
              type="text" 
              placeholder="Search historical logs..."
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              style={{ padding: "0.4rem 0.6rem 0.4rem 2rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, color: "var(--text-main)", fontSize: "0.8rem", outline: "none" }}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Broadcast Title</th>
                <th>Target Recipient</th>
                <th>Dispatched Timestamp</th>
                <th>Active Channels</th>
                <th>Delivery Rate</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => setSelectedHistoryItem(item)} 
                  style={{ cursor: "pointer" }}
                  title="Click to view detailed log summary"
                >
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{item.title}</td>
                  <td>
                    <span className="badge badge-info">{item.target}</span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.sentAt}</td>
                  <td style={{ fontSize: "0.78rem", textTransform: "capitalize" }}>{item.channels.join(", ")}</td>
                  <td>
                    <span className="badge badge-success">{item.readRate} Delivered</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={(e) => handleDeleteHistory(item.id, e)} 
                      className="btn btn-secondary" 
                      style={{ padding: "0.3rem 0.5rem", color: "var(--danger)" }}
                      title="Delete log"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>No broadcasts found in history logs.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL DRAWER */}
      {selectedHistoryItem && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "520px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                Broadcast Log Details
              </h3>
              <button onClick={() => setSelectedHistoryItem(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, display: "block" }}>BROADCAST HEADER TITLE</span>
                <strong style={{ fontSize: "1.05rem", color: "var(--text-heading)", display: "block", marginTop: 3 }}>{selectedHistoryItem.title}</strong>
              </div>

              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, display: "block" }}>MESSAGE CONTENT DETAIL</span>
                <p style={{ fontSize: "0.85rem", color: "var(--text-main)", margin: "4px 0", lineHeight: "1.4" }}>{selectedHistoryItem.body}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, display: "block" }}>TARGET RECIPIENT</span>
                  <span className="badge badge-info" style={{ marginTop: 4 }}>{selectedHistoryItem.target}</span>
                </div>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, display: "block" }}>SENT TIMESTAMP</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-main)", display: "block", marginTop: 4, fontWeight: 700 }}>{selectedHistoryItem.sentAt}</span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, display: "block" }}>ACTIVE DISPATCH CHANNELS</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-main)", display: "block", marginTop: 4, textTransform: "capitalize", fontWeight: 700 }}>
                    {selectedHistoryItem.channels.join(", ")}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, display: "block" }}>OPEN/DELIVERY RATE</span>
                  <span className="badge badge-success" style={{ marginTop: 4 }}>{selectedHistoryItem.readRate} Delivered</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                <button onClick={() => setSelectedHistoryItem(null)} className="btn btn-secondary" style={{ padding: "0.55rem 1.5rem" }}>Close Log Panel</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
