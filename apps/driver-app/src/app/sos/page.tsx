"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Phone,
  AlertCircle
} from "lucide-react";

interface Contact {
  id: number;
  name: string;
  phone: string;
  color: string;
  bg: string;
}

interface SosPageProps {
  language?: string;
  onNavigate?: (tab: string) => void;
}

export default function SosPage({ onNavigate }: SosPageProps) {
  const [holding, setHolding] = useState(false);

  const contacts: Contact[] = [
    { id: 1, name: "School Control Room", phone: "+91 98765 43210", color: "#2563eb", bg: "#eff6ff" },
    { id: 2, name: "Police Control Room", phone: "100", color: "#ea580c", bg: "#fff7ed" },
    { id: 3, name: "Driver Support Team", phone: "+91 87654 32109", color: "#16a34a", bg: "#f0fdf4" },
    { id: 4, name: "Ambulance", phone: "108", color: "#dc2626", bg: "#fef2f2" }
  ];

  const handleTriggerSos = () => {
    alert("🚨 EMERGENCY SOS BROADCAST SENT IMMEDIATELY! \nSchool administration & dispatch control rooms have been notified with your current GPS coordinates.");
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



      {/* ════════════ GIANT CIRCULAR SOS ALARM BUTTON ════════════ */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        margin: "1.5rem 0"
      }}>
        {/* Outer Pulsing Ring */}
        <div 
          onClick={handleTriggerSos}
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "#fee2e2",
            border: "6px solid #fca5a5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(239, 68, 68, 0.15)",
            transition: "all 0.15s"
          }}
        >
          <div style={{
            width: "108px",
            height: "108px",
            borderRadius: "50%",
            background: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "1.9rem",
            fontWeight: 900,
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.02em",
            boxShadow: "0 6px 20px rgba(239, 68, 68, 0.3)"
          }}>
            SOS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem" }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ef4444", fontFamily: "'Outfit', sans-serif" }}>
            Emergency Alert
          </span>
          <span style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: 600 }}>
            Press and hold to send alert
          </span>
        </div>
      </div>

      {/* ════════════ QUICK CONTACT HOTLINES list ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>
          Quick Contacts
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "16px",
                padding: "0.95rem 1.15rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {/* Colored circle placeholder */}
                <div style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: contact.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: contact.color,
                  flexShrink: 0
                }}>
                  <Phone size={16} strokeWidth={2.5} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>{contact.name}</span>
                  <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>{contact.phone}</span>
                </div>
              </div>

              {/* Call button trigger */}
              <a
                href={`tel:${contact.phone}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#334155",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
                }}
              >
                <Phone size={15} fill="#334155" color="#334155" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ HOW SOS WORKS WARNING BOX ════════════ */}
      <div style={{
        background: "#fef2f2",
        border: "1px solid #fca5a5",
        borderRadius: "16px",
        padding: "1.15rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.85rem",
        marginTop: "0.2rem"
      }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "#fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ef4444",
          flexShrink: 0
        }}>
          <AlertCircle size={18} strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#991b1b" }}>How SOS Works?</span>
          <span style={{ fontSize: "0.76rem", color: "#ef4444", lineHeight: 1.45, fontWeight: 600 }}>
            Your location will be shared with selected contacts and school admin immediately.
          </span>
        </div>
      </div>

    </div>
  );
}
