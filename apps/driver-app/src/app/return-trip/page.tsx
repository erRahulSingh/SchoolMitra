"use client";

import React, { useState } from "react";
import { 
  Navigation, Home, Building, Bell, CheckCircle2, Clock, 
  MapPin, Send, AlertTriangle, ShieldCheck 
} from "lucide-react";

export default function ReturnTripPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [students, setStudents] = useState([
    { id: "r1", name: "Rahul Sharma", class: "Class 5-A", stopName: "Sector 12 Market Gate", status: "Onboard" as "Left School" | "Near Home" | "Reached Home" | "Onboard" },
    { id: "r2", name: "Ananya Patel", class: "Class 4-B", stopName: "Sector 10 Metro Gate", status: "Reached Home" as "Left School" | "Near Home" | "Reached Home" | "Onboard" },
    { id: "r3", name: "Aarav Gupta", class: "Class 6-C", stopName: "Sector 6 Market", status: "Near Home" as "Left School" | "Near Home" | "Reached Home" | "Onboard" },
    { id: "r4", name: "Kavya Singh", class: "Class 5-B", stopName: "Vasant Kunj Crossing", status: "Onboard" as "Left School" | "Near Home" | "Reached Home" | "Onboard" }
  ]);

  const triggerNotification = (type: "left" | "near" | "reached", studentName?: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let msg = "";
    
    if (type === "left") {
      msg = `📢 Broadcast Sent: "Bus #DL01AB4321 left school campus at ${nowTime}."`;
    } else if (type === "near") {
      msg = `🔔 Notification Sent: "Bus is 5 mins away from home stops."`;
    } else if (type === "reached") {
      msg = `✅ Notification Sent: "${studentName?.split(" ")[0] || "Student"} safely reached home at ${nowTime}."`;
    }

    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const handleStudentStatus = (id: string, status: "Left School" | "Near Home" | "Reached Home") => {
    setStudents(prev => prev.map(st => st.id === id ? { ...st, status } : st));
    const student = students.find(st => st.id === id);
    if (status === "Reached Home") {
      triggerNotification("reached", student?.name);
    } else if (status === "Near Home") {
      triggerNotification("near");
    }
  };

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#f8fafc",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* HEADER BANNER */}
      <div style={{
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(6, 182, 212, 0.12) 100%)",
        border: "1px solid rgba(139, 92, 246, 0.3)",
        borderRadius: 20,
        padding: "1.1rem 1.25rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", boxShadow: "0 4px 14px rgba(139, 92, 246, 0.35)"
          }}>
            <Home size={24} />
          </div>
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>Afternoon Return Trip 🚍</div>
            <div style={{ fontSize: "0.72rem", color: "#c4b5fd", fontWeight: 800, marginTop: 1 }}>
              School to Home Drop Workflow
            </div>
          </div>
        </div>

        <span style={{
          background: "rgba(139, 92, 246, 0.2)", border: "1px solid rgba(139, 92, 246, 0.4)",
          color: "#c4b5fd", padding: "0.3rem 0.65rem", borderRadius: 99,
          fontSize: "0.72rem", fontWeight: 800
        }}>
          ACTIVE RETURN
        </span>
      </div>

      {/* QUICK BROADCAST ACTION BUTTONS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
        <button
          type="button"
          onClick={() => triggerNotification("left")}
          style={{
            padding: "0.75rem", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "#fff",
            fontWeight: 800, fontSize: "0.78rem", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)"
          }}
        >
          <Building size={16} /> Broadcast &lsquo;Left School&rsquo;
        </button>

        <button
          type="button"
          onClick={() => triggerNotification("near")}
          style={{
            padding: "0.75rem", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff",
            fontWeight: 800, fontSize: "0.78rem", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
            boxShadow: "0 4px 14px rgba(245, 158, 11, 0.3)"
          }}
        >
          <Navigation size={16} /> Broadcast &lsquo;Near Home&rsquo;
        </button>
      </div>

      {/* LIVE NOTIFICATION TOAST BANNER */}
      {toastMessage && (
        <div style={{
          background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
          border: "1px solid #c4b5fd",
          borderRadius: 14,
          padding: "0.85rem 1rem",
          color: "#fff",
          fontSize: "0.78rem",
          fontWeight: 800,
          boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)",
          animation: "fadeIn 0.3s ease"
        }}>
          {toastMessage}
        </div>
      )}

      {/* STUDENT RETURN DROP CARDS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {students.map((st) => (
          <div key={st.id} style={{
            background: "rgba(15, 23, 42, 0.85)",
            border: st.status === "Reached Home" ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 18,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "#fff" }}>{st.name}</div>
                <div style={{ fontSize: "0.72rem", color: "#c4b5fd", fontWeight: 800, marginTop: 1 }}>{st.class}</div>
                <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: 2 }}>Stop: {st.stopName}</div>
              </div>

              <span style={{
                background: st.status === "Reached Home" ? "rgba(16, 185, 129, 0.2)" : st.status === "Near Home" ? "rgba(251, 191, 36, 0.2)" : "rgba(139, 92, 246, 0.2)",
                color: st.status === "Reached Home" ? "#34d399" : st.status === "Near Home" ? "#fbbf24" : "#c4b5fd",
                padding: "0.25rem 0.6rem", borderRadius: 8, fontSize: "0.72rem", fontWeight: 800
              }}>
                {st.status}
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.45rem" }}>
              <button
                type="button"
                onClick={() => handleStudentStatus(st.id, "Left School")}
                style={{ padding: "0.5rem 0.2rem", borderRadius: 8, border: "none", background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", fontSize: "0.68rem", fontWeight: 800, cursor: "pointer" }}
              >
                Left School
              </button>
              <button
                type="button"
                onClick={() => handleStudentStatus(st.id, "Near Home")}
                style={{ padding: "0.5rem 0.2rem", borderRadius: 8, border: "none", background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24", fontSize: "0.68rem", fontWeight: 800, cursor: "pointer" }}
              >
                Near Home
              </button>
              <button
                type="button"
                onClick={() => handleStudentStatus(st.id, "Reached Home")}
                style={{ padding: "0.5rem 0.2rem", borderRadius: 8, border: "none", background: st.status === "Reached Home" ? "#10b981" : "rgba(16, 185, 129, 0.15)", color: st.status === "Reached Home" ? "#fff" : "#34d399", fontSize: "0.68rem", fontWeight: 800, cursor: "pointer" }}
              >
                Reached Home
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
