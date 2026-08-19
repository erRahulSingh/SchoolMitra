"use client";

import React from "react";
import { 
  ArrowLeft,
  Phone,
  MessageCircle,
  FileText,
  HelpCircle,
  Video,
  ChevronRight,
  Headphones
} from "lucide-react";

interface SupportLinkProps {
  icon: any;
  title: string;
  desc: string;
  action: string;
  phone?: string;
  isWhatsapp?: boolean;
}

function SupportLink({ icon: Icon, title, desc, action, phone, isWhatsapp }: SupportLinkProps) {
  const handleCall = () => {
    if (phone) {
      window.open(`tel:${phone}`);
    } else if (isWhatsapp) {
      alert("Redirecting to WhatsApp support chat...");
    } else {
      alert(`Triggering support ticket callback: ${action}`);
    }
  };

  return (
    <div 
      onClick={handleCall}
      style={{
        background: "#ffffff",
        border: "1px solid #cbd5e1",
        borderRadius: "16px",
        padding: "1rem 1.15rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01)",
        cursor: "pointer"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <div style={{
          width: "34px",
          height: "34px",
          borderRadius: "8px",
          background: isWhatsapp ? "#e8fcf0" : "#eff6ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isWhatsapp ? "#10b981" : "#2563eb",
          flexShrink: 0
        }}>
          <Icon size={16} strokeWidth={2.5} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1e293b" }}>{title}</span>
          <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 600 }}>{desc}</span>
        </div>
      </div>

      {phone || isWhatsapp ? (
        <button style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "#f1f5f9",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isWhatsapp ? "#10b981" : "#2563eb",
          cursor: "pointer"
        }}>
          {isWhatsapp ? <MessageCircle size={14} fill="#10b981" /> : <Phone size={14} fill="#2563eb" />}
        </button>
      ) : (
        <ChevronRight size={18} color="#cbd5e1" />
      )}
    </div>
  );
}

export default function HelpSupportPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
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



      {/* ════════════ TOP CONGRATS PANEL ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #0b2265 0%, #0d3880 55%, #081a4b 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(11, 34, 101, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "1.15rem"
      }}>
        {/* Graphic headpiece circle */}
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          flexShrink: 0
        }}>
          <Headphones size={24} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 800, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
            We're Here to Help!
          </h2>
          <p style={{ fontSize: "0.78rem", color: "#bfdbfe", margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
            Get support for any issue related to your trips.
          </p>
        </div>
      </div>

      {/* ════════════ CONTACT SUPPORT BLOCK ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif" }}>
          Contact Support
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          <SupportLink icon={Headphones} title="Contact School" desc="Talk to school admin" action="school" phone="+91 98765 43210" />
          <SupportLink icon={Phone} title="Call Transport Manager" desc="+91 87654 32109" action="manager" phone="+91 87654 32109" />
          <SupportLink icon={MessageCircle} title="WhatsApp Support" desc="Chat on WhatsApp" action="whatsapp" isWhatsapp />
          <SupportLink icon={FileText} title="Raise a Support Ticket" desc="Create a new support request" action="ticket" />
        </div>
      </div>

      {/* ════════════ FAQS BLOCK ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif" }}>
          FAQs
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
        }}>
          {/* FAQ link */}
          <div 
            onClick={() => alert("Redirecting to FAQs portal...")}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.95rem 1.15rem", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                <HelpCircle size={16} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>View Frequently Asked Questions</span>
            </div>
            <ChevronRight size={16} color="#cbd5e1" />
          </div>

          {/* Videos link */}
          <div 
            onClick={() => alert("Opening Video Guides gallery...")}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.95rem 1.15rem", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#fdf4ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#d946ef" }}>
                <Video size={16} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>Video Guides</span>
            </div>
            <ChevronRight size={16} color="#cbd5e1" />
          </div>
        </div>
      </div>

    </div>
  );
}
