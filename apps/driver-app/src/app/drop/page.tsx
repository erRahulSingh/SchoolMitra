"use client";

import React, { useState } from "react";
import { 
  Building, CheckCircle2, XCircle, Clock, Bell, MapPin, 
  User, ShieldCheck, Sparkles, Navigation, AlertTriangle 
} from "lucide-react";

export default function StudentDropPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [students, setStudents] = useState([
    { id: "d1", name: "Rahul Sharma", class: "Class 5-A", parentName: "Vikram Sharma", dropStatus: "Not Dropped" as "Arrived" | "Absent" | "Not Dropped", avatarColor: "#6366f1" },
    { id: "d2", name: "Ananya Patel", class: "Class 4-B", parentName: "Rajesh Patel", dropStatus: "Arrived" as "Arrived" | "Absent" | "Not Dropped", avatarColor: "#10b981" },
    { id: "d3", name: "Aarav Gupta", class: "Class 6-C", parentName: "Sunil Gupta", dropStatus: "Arrived" as "Arrived" | "Absent" | "Not Dropped", avatarColor: "#f59e0b" },
    { id: "d4", name: "Riya Verma", class: "Class 3-A", parentName: "Amit Verma", dropStatus: "Absent" as "Arrived" | "Absent" | "Not Dropped", avatarColor: "#ef4444" },
    { id: "d5", name: "Kavya Singh", class: "Class 5-B", parentName: "Mahesh Singh", dropStatus: "Not Dropped" as "Arrived" | "Absent" | "Not Dropped", avatarColor: "#8b5cf6" }
  ]);

  const handleDropStatusChange = (id: string, newStatus: "Arrived" | "Absent" | "Not Dropped") => {
    setStudents(prev => prev.map(st => st.id === id ? { ...st, dropStatus: newStatus } : st));

    const targetStudent = students.find(st => st.id === id);
    if (targetStudent && newStatus === "Arrived") {
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const msg = `🔔 Notification Sent: "${targetStudent.name.split(" ")[0]} reached school at ${nowTime}."`;
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const arrivedCount = students.filter(st => st.dropStatus === "Arrived").length;
  const absentCount = students.filter(st => st.dropStatus === "Absent").length;
  const notDroppedCount = students.filter(st => st.dropStatus === "Not Dropped").length;

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* HEADER BANNER */}
      <div className="banner-card" style={{
        padding: "1.1rem 1.25rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: "linear-gradient(135deg, #0284c7, #0369a1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", boxShadow: "0 4px 14px rgba(2, 132, 199, 0.35)"
          }}>
            <Building size={24} />
          </div>
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900 }} className="text-title">Drop Screen ⭐</div>
            <div style={{ fontSize: "0.72rem", color: "#0284c7", fontWeight: 800, marginTop: 1 }}>
              DPS Campus Gate #1 • Morning Arrival
            </div>
          </div>
        </div>

        <span style={{
          background: "rgba(56, 189, 248, 0.2)", border: "1px solid rgba(56, 189, 248, 0.4)",
          color: "#0284c7", padding: "0.3rem 0.65rem", borderRadius: 99,
          fontSize: "0.72rem", fontWeight: 800
        }}>
          {arrivedCount}/{students.length} Arrived
        </span>
      </div>

      {/* 3 STAT METRICS BADGES */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.55rem" }}>
        <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: 14, padding: "0.55rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.65rem", color: "#059669", fontWeight: 800 }}>ARRIVED AT SCHOOL</span>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#059669", marginTop: 2 }}>{arrivedCount}</div>
        </div>
        <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.25)", borderRadius: 14, padding: "0.55rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.65rem", color: "#dc2626", fontWeight: 800 }}>ABSENT</span>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#dc2626", marginTop: 2 }}>{absentCount}</div>
        </div>
        <div style={{ background: "rgba(251, 191, 36, 0.12)", border: "1px solid rgba(251, 191, 36, 0.25)", borderRadius: 14, padding: "0.55rem", textAlign: "center" }}>
          <span style={{ fontSize: "0.65rem", color: "#d97706", fontWeight: 800 }}>NOT DROPPED</span>
          <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#d97706", marginTop: 2 }}>{notDroppedCount}</div>
        </div>
      </div>

      {/* LIVE PARENT NOTIFICATION TOAST */}
      {toastMessage && (
        <div style={{
          background: "linear-gradient(135deg, #0284c7, #0369a1)",
          border: "1px solid #38bdf8",
          borderRadius: 14,
          padding: "0.85rem 1rem",
          color: "#fff",
          fontSize: "0.78rem",
          fontWeight: 800,
          boxShadow: "0 6px 20px rgba(56, 189, 248, 0.4)",
          animation: "fadeIn 0.3s ease"
        }}>
          {toastMessage}
        </div>
      )}

      {/* STUDENT DROP CARDS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {students.map((st) => (
          <div key={st.id} className="card-ui" style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}>
            
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
                background: st.dropStatus === "Arrived" ? "rgba(16, 185, 129, 0.2)" : st.dropStatus === "Absent" ? "rgba(239, 68, 68, 0.2)" : "rgba(251, 191, 36, 0.2)",
                color: st.dropStatus === "Arrived" ? "#059669" : st.dropStatus === "Absent" ? "#dc2626" : "#d97706",
                padding: "0.25rem 0.6rem", borderRadius: 8, fontSize: "0.72rem", fontWeight: 800
              }}>
                {st.dropStatus === "Arrived" ? "🏫 Arrived at School" : st.dropStatus === "Absent" ? "❌ Absent" : "⏳ Not Dropped"}
              </span>
            </div>

            {/* Bottom Row: 3 Interactive Drop Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.45rem", marginTop: "0.2rem" }}>
              <button
                type="button"
                onClick={() => handleDropStatusChange(st.id, "Arrived")}
                style={{
                  padding: "0.55rem 0.25rem", borderRadius: 10, border: "none",
                  background: st.dropStatus === "Arrived" ? "#10b981" : "rgba(16, 185, 129, 0.15)",
                  color: st.dropStatus === "Arrived" ? "#fff" : "#059669",
                  fontWeight: 800, fontSize: "0.68rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.2rem"
                }}
              >
                <CheckCircle2 size={13} /> Arrived at School
              </button>

              <button
                type="button"
                onClick={() => handleDropStatusChange(st.id, "Absent")}
                style={{
                  padding: "0.55rem 0.25rem", borderRadius: 10, border: "none",
                  background: st.dropStatus === "Absent" ? "#ef4444" : "rgba(239, 68, 68, 0.15)",
                  color: st.dropStatus === "Absent" ? "#fff" : "#dc2626",
                  fontWeight: 800, fontSize: "0.68rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.2rem"
                }}
              >
                <XCircle size={13} /> Absent
              </button>

              <button
                type="button"
                onClick={() => handleDropStatusChange(st.id, "Not Dropped")}
                style={{
                  padding: "0.55rem 0.25rem", borderRadius: 10, border: "none",
                  background: st.dropStatus === "Not Dropped" ? "#f59e0b" : "rgba(251, 191, 36, 0.15)",
                  color: st.dropStatus === "Not Dropped" ? "#fff" : "#d97706",
                  fontWeight: 800, fontSize: "0.68rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.2rem"
                }}
              >
                <Clock size={13} /> Not Dropped
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
