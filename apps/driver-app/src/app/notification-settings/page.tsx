"use client";

import React, { useState } from "react";
import { 
  ArrowLeft,
  Navigation,
  Milestone,
  Users,
  AlertTriangle,
  Bell,
  CheckCircle,
  Volume2,
  Activity,
  ChevronRight
} from "lucide-react";

interface ToggleItem {
  id: string;
  name: string;
  desc: string;
  checked: boolean;
  icon: any;
  color: string;
  bg: string;
}

export default function NotificationSettingsPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [toggles, setToggles] = useState<ToggleItem[]>([
    { id: "trip", name: "Trip Alerts", desc: "Alerts for trip start, end & changes", checked: true, icon: Milestone, color: "#0891b2", bg: "#ecfeff" },
    { id: "route", name: "Route Change Alerts", desc: "Get notified for any route changes", checked: true, icon: Navigation, color: "#ea580c", bg: "#fff7ed" },
    { id: "pickup", name: "Student Pickup/Drop Alerts", desc: "Get notified on pickup/drop", checked: true, icon: Users, color: "#9333ea", bg: "#faf5ff" },
    { id: "emergency", name: "Emergency Alerts", desc: "SOS and emergency notifications", checked: true, icon: AlertTriangle, color: "#dc2626", bg: "#fef2f2" },
    { id: "school", name: "School Announcements", desc: "Important announcements", checked: true, icon: Bell, color: "#2563eb", bg: "#eff6ff" },
    { id: "general", name: "General Notifications", desc: "General app notifications", checked: true, icon: CheckCircle, color: "#16a34a", bg: "#f0fdf4" }
  ]);

  const [vibration, setVibration] = useState(true);

  const handleToggle = (id: string) => {
    setToggles(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <div style={{
      padding: "1rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%"
    }}>



      {/* ════════════ PUSH NOTIFICATIONS TOGGLE SECTION ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>
          Push Notifications
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {toggles.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "16px",
                padding: "0.95rem 1.15rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", maxWidth: "80%" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.color,
                  flexShrink: 0
                }}>
                  <item.icon size={16} strokeWidth={2.2} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", overflow: "hidden" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e293b" }}>{item.name}</span>
                  <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 500 }}>{item.desc}</span>
                </div>
              </div>

              {/* iOS style toggle switch */}
              <div style={{
                width: "40px",
                height: "22px",
                borderRadius: "99px",
                background: item.checked ? "#2563eb" : "#cbd5e1",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: item.checked ? "flex-end" : "flex-start",
                transition: "all 0.2s"
              }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#ffffff" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ ALERT PREFERENCES SECTION ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>
          Alert Preferences
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
        }}>
          {/* Sound */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.95rem 1.15rem", borderBottom: "1px solid #f1f5f9" }}>
            <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>Sound</span>
            <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 650 }}>Default</span>
          </div>

          {/* Vibration */}
          <div 
            onClick={() => setVibration(!vibration)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.95rem 1.15rem", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
          >
            <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>Vibration</span>
            <div style={{
              width: "40px",
              height: "22px",
              borderRadius: "99px",
              background: vibration ? "#2563eb" : "#cbd5e1",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: vibration ? "flex-end" : "flex-start",
              transition: "all 0.2s"
            }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#ffffff" }} />
            </div>
          </div>

          {/* Do Not Disturb */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.95rem 1.15rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>Do Not Disturb</span>
            <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 650 }}>10:00 PM - 6:00 AM</span>
          </div>
        </div>
      </div>

    </div>
  );
}
