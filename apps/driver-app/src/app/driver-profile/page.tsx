"use client";

import React from "react";
import { 
  ArrowLeft,
  Edit2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Calendar,
  ShieldCheck,
  CreditCard,
  Star
} from "lucide-react";

interface ProfileItemProps {
  icon: any;
  label: string;
  value: string;
  color?: string;
  bg?: string;
}

function ProfileItem({ icon: Icon, label, value, color = "#2563eb", bg = "#eff6ff" }: ProfileItemProps) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.95rem 1rem",
      borderBottom: "1px solid #f1f5f9"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          flexShrink: 0
        }}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700 }}>{label}</span>
          <span style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 800 }}>{value}</span>
        </div>
      </div>
    </div>
  );
}

export default function DriverProfilePage({ onNavigate, onLogout }: { onNavigate?: (tab: string) => void; onLogout?: () => void }) {
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



      {/* ════════════ TOP HERO ACCOUNT PANEL ════════════ */}
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
        {/* Profile Avatar Image */}
        <div style={{
          position: "relative",
          width: "68px",
          height: "68px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2.5px solid rgba(255, 255, 255, 0.2)",
          flexShrink: 0
        }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"
            alt="Rajesh Kumar"
            onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100"; }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Name and active badges details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", fontFamily: "'Outfit', sans-serif" }}>
            Rajesh Kumar
          </span>
          <span style={{ fontSize: "0.78rem", color: "#93c5fd", fontWeight: 600 }}>
            Driver ID: DRV00125
          </span>
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginTop: "2px" }}>
            <span style={{
              background: "#22c55e",
              color: "#ffffff",
              padding: "0.15rem 0.5rem",
              borderRadius: "6px",
              fontSize: "0.62rem",
              fontWeight: 800
            }}>
              Active
            </span>

            {/* Stars row rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "0.68rem", color: "#fde047" }}>
              <Star size={11} fill="#fde047" color="#fde047" />
              <span style={{ fontWeight: 800, color: "#ffffff" }}>4.8 (120)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ CONTACT INFORMATION BLOCK ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif" }}>
          Contact Information
        </h2>
        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
        }}>
          <ProfileItem icon={Phone} label="Phone" value="+91 98765 43210" color="#2563eb" bg="#eff6ff" />
          <ProfileItem icon={Mail} label="Email" value="rajesh.driver@schoolmitra.com" color="#2563eb" bg="#eff6ff" />
          <ProfileItem icon={MapPin} label="Address" value="Lucknow, Uttar Pradesh" color="#2563eb" bg="#eff6ff" />
        </div>
      </div>

      {/* ════════════ LICENSE INFORMATION BLOCK ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif" }}>
          License Information
        </h2>
        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
        }}>
          <ProfileItem icon={FileText} label="License No." value="UP32 2015 0001234" color="#16a34a" bg="#f0fdf4" />
          <ProfileItem icon={Calendar} label="Issue Date" value="12 Jan 2015" color="#16a34a" bg="#f0fdf4" />
          <ProfileItem icon={Calendar} label="Valid Upto" value="11 Jan 2030" color="#16a34a" bg="#f0fdf4" />
        </div>
      </div>

      {/* ════════════ BANK DETAILS BLOCK ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif" }}>
          Bank Details
        </h2>
        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
        }}>
          <ProfileItem icon={CreditCard} label="Bank Name" value="State Bank of India" color="#ea580c" bg="#fff7ed" />
          <ProfileItem icon={CreditCard} label="Account No." value="XXXX XXXX 5678" color="#ea580c" bg="#fff7ed" />
        </div>
      </div>

    </div>
  );
}
