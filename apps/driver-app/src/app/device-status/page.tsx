"use client";

import React from "react";
import { 
  ArrowLeft,
  CheckCircle,
  MapPin,
  Camera,
  FolderOpen,
  Phone,
  Bell,
  Wifi,
  Compass,
  BatteryCharging,
  Play,
  Info
} from "lucide-react";

interface StatusRowProps {
  icon: any;
  label: string;
  value: string;
  color?: string;
  bg?: string;
}

function StatusRow({ icon: Icon, label, value, color = "#16a34a", bg = "#dcfce7" }: StatusRowProps) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.95rem 1.15rem",
      borderBottom: "1px solid #f1f5f9",
      background: "#ffffff"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", flexShrink: 0 }}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
        <span style={{ fontSize: "0.88rem", color: "#1e293b", fontWeight: 800 }}>{label}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
        <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 650 }}>{value}</span>
        {/* Checked green checkmark node */}
        <div style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: bg,
          color: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <CheckCircle size={12} fill={color} color="#ffffff" />
        </div>
      </div>
    </div>
  );
}

export default function DeviceStatusPage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
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
        background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(34, 197, 94, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "1.15rem"
      }}>
        {/* Checked shield circle icon */}
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
          <CheckCircle size={26} fill="#ffffff" color="#16a34a" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 800, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
            All Good!
          </h2>
          <p style={{ fontSize: "0.78rem", color: "#dcfce7", margin: 0, fontWeight: 500 }}>
            Your device is ready for safe driving.
          </p>
        </div>
      </div>

      {/* ════════════ PERMISSIONS LIST STACK ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif" }}>
          Permissions
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
        }}>
          <StatusRow icon={MapPin} label="Location (GPS)" value="Always Allow" />
          <StatusRow icon={Camera} label="Camera" value="Allow" />
          <StatusRow icon={FolderOpen} label="Storage" value="Allow" />
          <StatusRow icon={Phone} label="Phone" value="Allow" />
          <StatusRow icon={Bell} label="Notifications" value="Allow" />
        </div>
      </div>

      {/* ════════════ DEVICE STATUS LIST STACK ════════════ */}
      <div>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif" }}>
          Device Status
        </h2>

        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.02)"
        }}>
          <StatusRow icon={Wifi} label="Internet Connection" value="Good" />
          <StatusRow icon={Compass} label="GPS Accuracy" value="High (15 m)" />
          <StatusRow icon={BatteryCharging} label="Battery Optimization" value="Optimized" />
          <StatusRow icon={Play} label="Background Location" value="Running" />
        </div>
      </div>

      {/* ════════════ BOTTOM CALLOUT WARNING BLUE BOX ════════════ */}
      <div style={{
        background: "#eff6ff",
        border: "1px solid #bfdbfe",
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
          background: "#dbeafe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2563eb",
          flexShrink: 0
        }}>
          <Info size={18} strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "0.76rem", color: "#2563eb", lineHeight: 1.45, fontWeight: 700 }}>
            For best experience, keep location permission always allowed.
          </span>
        </div>
      </div>

    </div>
  );
}
