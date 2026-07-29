"use client";

import React, { useState } from "react";
import { 
  UserCheck, UserX, Clock, Bell, CheckCircle2, XCircle, 
  User, MapPin, Search, Filter, PhoneCall, Sparkles 
} from "lucide-react";

import { createSocketConnection } from "@/lib/socketClient";

export default function StudentPickupPage() {
  const [selectedStopFilter, setSelectedStopFilter] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [students, setStudents] = useState([
    { id: "s1", name: "Rahul Sharma", class: "Class 5-A", parentName: "Vikram Sharma", stopName: "Sector 12 Market Gate", status: "Waiting" as "Picked" | "Absent" | "Waiting", avatarColor: "#6366f1" },
    { id: "s2", name: "Ananya Patel", class: "Class 4-B", parentName: "Rajesh Patel", stopName: "Sector 10 Metro Gate", status: "Picked" as "Picked" | "Absent" | "Waiting", avatarColor: "#10b981" },
    { id: "s3", name: "Aarav Gupta", class: "Class 6-C", parentName: "Sunil Gupta", stopName: "Sector 6 Market", status: "Waiting" as "Picked" | "Absent" | "Waiting", avatarColor: "#f59e0b" },
    { id: "s4", name: "Riya Verma", class: "Class 3-A", parentName: "Amit Verma", stopName: "Sector 12 Market Gate", status: "Absent" as "Picked" | "Absent" | "Waiting", avatarColor: "#ef4444" },
    { id: "s5", name: "Kavya Singh", class: "Class 5-B", parentName: "Mahesh Singh", stopName: "Vasant Kunj Crossing", status: "Waiting" as "Picked" | "Absent" | "Waiting", avatarColor: "#8b5cf6" }
  ]);

  const handleStatusChange = (id: string, newStatus: "Picked" | "Absent" | "Waiting") => {
    setStudents(prev => prev.map(st => st.id === id ? { ...st, status: newStatus } : st));

    const targetStudent = students.find(st => st.id === id);
    if (targetStudent) {
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (newStatus === "Picked") {
        const msg = `🔔 Notification Sent: "${targetStudent.name.split(" ")[0]} boarded the bus at ${nowTime}."`;
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
      }

      // Socket.IO Real-Time Broadcast to Parent App
      try {
        const socket = createSocketConnection("http://localhost:5000");
        socket.emit("driver:student_status_changed", {
          studentId: id,
          studentName: targetStudent.name,
          status: newStatus,
          timestamp: nowTime
        });
        setTimeout(() => socket.disconnect(), 1000);
      } catch (err) {
        console.warn("Socket emission error:", err);
      }
    }
  };

  const filteredStudents = selectedStopFilter === "all" 
    ? students 
    : students.filter(st => st.stopName === selectedStopFilter);

  const pickedCount = students.filter(st => st.status === "Picked").length;
  const absentCount = students.filter(st => st.status === "Absent").length;
  const waitingCount = students.filter(st => st.status === "Waiting").length;

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* HEADER & SUMMARY BAR */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 900 }} className="text-title">Morning Pickup Roster ⭐</h2>
            <p style={{ fontSize: "0.75rem", marginTop: 2 }} className="text-muted-custom">Mark Boarding Status per Stop</p>
          </div>

          <div style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#059669", padding: "0.3rem 0.65rem", borderRadius: 99, fontSize: "0.72rem", fontWeight: 800 }}>
            {pickedCount}/{students.length} Boarded
          </div>
        </div>

        {/* 3 STAT METRICS BADGES */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.55rem", marginTop: "0.85rem" }}>
          <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: 12, padding: "0.5rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.65rem", color: "#059669", fontWeight: 800 }}>✅ PICKED</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#059669" }}>{pickedCount}</div>
          </div>
          <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.25)", borderRadius: 12, padding: "0.5rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.65rem", color: "#dc2626", fontWeight: 800 }}>❌ ABSENT</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#dc2626" }}>{absentCount}</div>
          </div>
          <div style={{ background: "rgba(251, 191, 36, 0.12)", border: "1px solid rgba(251, 191, 36, 0.25)", borderRadius: 12, padding: "0.5rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.65rem", color: "#d97706", fontWeight: 800 }}>⏳ WAITING</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#d97706" }}>{waitingCount}</div>
          </div>
        </div>
      </div>

      {/* LIVE PARENT NOTIFICATION TOAST */}
      {toastMessage && (
        <div style={{
          background: "linear-gradient(135deg, #059669, #10b981)",
          border: "1px solid #34d399",
          borderRadius: 14,
          padding: "0.85rem 1rem",
          color: "#fff",
          fontSize: "0.78rem",
          fontWeight: 800,
          boxShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
          animation: "fadeIn 0.3s ease"
        }}>
          {toastMessage}
        </div>
      )}

      {/* STOP FILTER SELECTOR */}
      <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
        {["all", "Sector 12 Market Gate", "Sector 10 Metro Gate", "Sector 6 Market", "Vasant Kunj Crossing"].map((stop) => (
          <button
            key={stop}
            type="button"
            onClick={() => setSelectedStopFilter(stop)}
            style={{
              padding: "0.4rem 0.75rem", borderRadius: 99, border: "none",
              background: selectedStopFilter === stop ? "linear-gradient(135deg, #10b981, #059669)" : "var(--bg-card)",
              color: selectedStopFilter === stop ? "#fff" : "var(--text-secondary)",
              border: selectedStopFilter === stop ? "none" : "1px solid var(--border-card)",
              fontSize: "0.72rem", fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap"
            }}
          >
            {stop === "all" ? "All Bus Stops" : stop}
          </button>
        ))}
      </div>

      {/* STUDENT CARDS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {filteredStudents.map((st) => (
          <div key={st.id} className="card-ui" style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}>
            
            {/* Top Row: Photo Avatar, Name, Class & Status Pill */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `radial-gradient(circle, ${st.avatarColor} 0%, rgba(15, 23, 42, 0.7) 100%)`,
                  border: `2px solid ${st.avatarColor}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 900, fontSize: "1rem",
                  boxShadow: `0 4px 12px ${st.avatarColor}40`
                }}>
                  {st.name.charAt(0)}
                </div>

                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 900 }} className="text-title">{st.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "#8b5cf6", fontWeight: 800, marginTop: 1 }}>{st.class}</div>
                  <div style={{ fontSize: "0.7rem", marginTop: 2 }} className="text-muted-custom">Parent: {st.parentName}</div>
                </div>
              </div>

              {/* Status Pill */}
              <span style={{
                background: st.status === "Picked" ? "rgba(16, 185, 129, 0.2)" : st.status === "Absent" ? "rgba(239, 68, 68, 0.2)" : "rgba(251, 191, 36, 0.2)",
                color: st.status === "Picked" ? "#059669" : st.status === "Absent" ? "#dc2626" : "#d97706",
                padding: "0.25rem 0.6rem", borderRadius: 8, fontSize: "0.72rem", fontWeight: 800
              }}>
                {st.status === "Picked" ? "✅ Boarded" : st.status === "Absent" ? "❌ Absent" : "⏳ Waiting"}
              </span>
            </div>

            {/* Middle Row: Stop Name */}
            <div style={{ fontSize: "0.72rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.35rem" }} className="text-muted-custom">
              <MapPin size={14} color="#0284c7" /> Stop: <strong className="text-title">{st.stopName}</strong>
            </div>

            {/* Bottom Row: 3 Interactive Action Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.45rem", marginTop: "0.2rem" }}>
              <button
                type="button"
                onClick={() => handleStatusChange(st.id, "Picked")}
                style={{
                  padding: "0.55rem 0.35rem", borderRadius: 10, border: "none",
                  background: st.status === "Picked" ? "#10b981" : "rgba(16, 185, 129, 0.15)",
                  color: st.status === "Picked" ? "#fff" : "#059669",
                  fontWeight: 800, fontSize: "0.72rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem"
                }}
              >
                <CheckCircle2 size={14} /> Picked
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange(st.id, "Absent")}
                style={{
                  padding: "0.55rem 0.35rem", borderRadius: 10, border: "none",
                  background: st.status === "Absent" ? "#ef4444" : "rgba(239, 68, 68, 0.15)",
                  color: st.status === "Absent" ? "#fff" : "#dc2626",
                  fontWeight: 800, fontSize: "0.72rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem"
                }}
              >
                <XCircle size={14} /> Absent
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange(st.id, "Waiting")}
                style={{
                  padding: "0.55rem 0.35rem", borderRadius: 10, border: "none",
                  background: st.status === "Waiting" ? "#f59e0b" : "rgba(251, 191, 36, 0.15)",
                  color: st.status === "Waiting" ? "#fff" : "#d97706",
                  fontWeight: 800, fontSize: "0.72rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem"
                }}
              >
                <Clock size={14} /> Waiting
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
