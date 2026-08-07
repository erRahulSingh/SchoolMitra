"use client";

import React, { useState } from "react";
import { 
  Building, MapPin, Phone, Mail, Globe, Award, 
  Sparkles, CheckCircle2, Navigation, Info, ExternalLink
} from "lucide-react";

export default function AboutSchoolPage() {
  const [activeTab, setActiveTab] = useState<"about" | "contactMap">("about");

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>Delhi Public School</h2>
            <span style={{ background: "rgba(16,185,129,0.2)", color: "#059669", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              ESTD 1995
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            CBSE Affiliation #103042 • Dwarka Campus
          </p>
        </div>

        <Building size={24} color="var(--primary)" />
      </div>

      {/* ════════════ SCREEN 1: ABOUT SCHOOL ════════════ */}
      <div className="card-ui" style={{ padding: "1.25rem" }}>
        <div className="text-title" style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "0.65rem" }}>School Overview & Heritage</div>
        <p className="text-muted-custom" style={{ fontSize: "0.82rem", lineHeight: 1.6 }}>
          Delhi Public School Dwarka is a premier educational institution committed to holistic academic excellence, modern AI & Robotics STEM labs, and sports leadership development since 1995.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1rem" }}>
          <div className="subbox-ui" style={{ padding: "0.75rem", display: "flex", justifyContent: "space-between" }}>
            <span className="text-muted-custom" style={{ fontSize: "0.75rem" }}>Principal</span>
            <span className="text-title" style={{ fontSize: "0.82rem", fontWeight: 800 }}>Dr. S. K. Roy</span>
          </div>
          <div className="subbox-ui" style={{ padding: "0.75rem", display: "flex", justifyContent: "space-between" }}>
            <span className="text-muted-custom" style={{ fontSize: "0.75rem" }}>CBSE Affiliation Code</span>
            <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0284c7" }}>#103042</span>
          </div>
        </div>
      </div>

    </div>
  );
}
