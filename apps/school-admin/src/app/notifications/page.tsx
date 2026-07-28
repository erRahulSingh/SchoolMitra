"use client";

import React, { useState } from "react";
import { 
  Bell, Send, Users, ShieldAlert, Sparkles, CheckCircle2, 
  MessageSquare, Radio, Phone, Mail, Clock 
} from "lucide-react";

export default function NotificationsPage() {
  const [targetAudience, setTargetAudience] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const [sentHistory, setSentHistory] = useState([
    { id: "n1", title: "Mid-Term Examination Date Sheet Released", target: "All Parents & Students", sentAt: "Today at 09:30 AM", channel: "Push + App Alert", readRate: "94%" },
    { id: "n2", title: "School Transport Route 1 Delay Notice", target: "Route 1 Parents Only", sentAt: "Yesterday at 07:40 AM", channel: "SMS + Push Alert", readRate: "98%" },
    { id: "n3", title: "Staff Meeting at 03:00 PM in Conference Room", target: "Teachers Only", sentAt: "26 July 2026", channel: "App Notice", readRate: "100%" }
  ]);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    const newNotice = {
      id: "n_" + Date.now(),
      title,
      target: targetAudience === "all" ? "All School" : targetAudience === "parents" ? "Parents Only" : targetAudience === "teachers" ? "Teachers Only" : "Drivers Only",
      sentAt: "Just now",
      channel: "Push Alert + Socket.IO",
      readRate: "100%"
    };

    setSentHistory([newNotice, ...sentHistory]);
    setIsSent(true);
    setTitle("");
    setMessage("");
    setTimeout(() => setIsSent(false), 3500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Central Notifications & Broadcast Dispatch Hub</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2 }}>Broadcast real-time push announcements, emergency alerts, and circulars to Parents, Teachers, and Drivers.</p>
        </div>
      </div>

      {/* BROADCAST COMPOSER FORM */}
      <div className="glass-card" style={{ padding: "1.75rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Send size={18} color="var(--primary)" /> Compose & Dispatch Announcement
        </h3>

        {isSent && (
          <div style={{ padding: "0.85rem", background: "var(--success-bg)", border: "1px solid var(--success)", borderRadius: "var(--radius-md)", color: "var(--success)", fontSize: "0.85rem", fontWeight: 700, marginBottom: "1.25rem", textAlign: "center" }}>
            🚀 Announcement broadcasted successfully! Delivered to mobile apps and parent devices.
          </div>
        )}

        <form onSubmit={handleSendBroadcast} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {/* Target Audience Selector */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>TARGET RECIPIENT AUDIENCE</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }}>
              {[
                { id: "all", label: "All School (Parents & Staff)" },
                { id: "parents", label: "Parents Only" },
                { id: "teachers", label: "Teachers Only" },
                { id: "drivers", label: "Bus Drivers Only" }
              ].map((aud) => (
                <button
                  key={aud.id}
                  type="button"
                  onClick={() => setTargetAudience(aud.id)}
                  style={{
                    padding: "0.75rem", borderRadius: "var(--radius-md)", border: targetAudience === aud.id ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                    background: targetAudience === aud.id ? "var(--primary-glow)" : "rgba(255,255,255,0.03)",
                    color: targetAudience === aud.id ? "#fff" : "var(--text-muted)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer"
                  }}
                >
                  {aud.label}
                </button>
              ))}
            </div>
          </div>

          {/* Announcement Title */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>ANNOUNCEMENT TITLE</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mid-Term Examination Timetable 2026 Published"
              required
              style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}
            />
          </div>

          {/* Announcement Message Body */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>MESSAGE CONTENT & CIRCULAR DETAILS</label>
            <textarea 
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter detailed notice message to broadcast..."
              required
              style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}
            />
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-primary" style={{ padding: "0.8rem 1.75rem" }}>
              <Send size={18} />
              <span>Broadcast Now</span>
            </button>
          </div>
        </form>
      </div>

      {/* DISPATCH HISTORY TABLE */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", color: "#fff" }}>Recent Broadcast Dispatch History</h3>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Target Audience</th>
                <th>Sent Timestamp</th>
                <th>Delivery Channel</th>
                <th>Delivery Rate</th>
              </tr>
            </thead>
            <tbody>
              {sentHistory.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: "#fff" }}>{item.title}</td>
                  <td>
                    <span className="badge badge-info">{item.target}</span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.sentAt}</td>
                  <td style={{ fontSize: "0.8rem" }}>{item.channel}</td>
                  <td>
                    <span className="badge badge-success">{item.readRate} Delivered</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
