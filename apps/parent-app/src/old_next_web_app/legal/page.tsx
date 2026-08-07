"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, FileText, Info, Lock, CheckCircle2, 
  Sparkles, RefreshCw, Smartphone, Shield, ArrowUpRight
} from "lucide-react";

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms" | "version">("privacy");
  const [checkingUpdate, setCheckingUpdate] = useState(false);

  const handleCheckUpdate = () => {
    setCheckingUpdate(true);
    setTimeout(() => {
      setCheckingUpdate(false);
    }, 1200);
  };

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
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>Legal & App Info</h2>
            <span style={{ background: "rgba(16,185,129,0.2)", color: "#059669", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              ISO 27001
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Data Privacy • Terms of Use • System Build Details
          </p>
        </div>

        <ShieldCheck size={24} color="var(--primary)" />
      </div>

      {/* ════════════ SCREEN 1: PRIVACY POLICY ════════════ */}
      {activeTab === "privacy" && (
        <div className="card-ui" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
            <div className="text-title" style={{ fontSize: "0.95rem", fontWeight: 800 }}>Data Protection Policy</div>
            <span style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 800 }}>28 July 2026</span>
          </div>

          <div style={{ fontSize: "0.82rem", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p className="text-muted-custom">
              School Mitra is committed to protecting student academic records, parent financial transactions, and live GPS bus location telemetry under strict AES-256 encryption.
            </p>
            <div className="subbox-ui" style={{ padding: "0.85rem" }}>
              <strong className="text-title" style={{ display: "block", marginBottom: 3 }}>1. Student Data Encryption</strong>
              All RFID gate timestamps, report card marks, and medical records are stored in encrypted cloud clusters isolated per school tenant.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
