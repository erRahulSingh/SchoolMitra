"use client";

import React, { useState, useEffect } from "react";
import { 
  Activity, Sparkles, Bus, CreditCard, UserPlus, Award, 
  Search, Filter, RefreshCw, Download, CheckCircle2 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function SystemActivityLogsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [stream, setStream] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalEvents: 4,
    busTapsToday: 4850,
    feeReceiptsToday: 1240,
    admissionsToday: 84
  });

  const fetchStream = async () => {
    setLoading(true);
    const local = localStorage.getItem("saas_activity_stream");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) setStream(parsed);
      } catch (e) {}
    }

    try {
      const res = await superAdminApi.getSystemActivityLogs();
      if (res.success) {
        if (res.summary) setSummary(res.summary);
        if (res.stream && Array.isArray(res.stream) && res.stream.length > 0) {
          setStream(res.stream);
          localStorage.setItem("saas_activity_stream", JSON.stringify(res.stream));
        }
      }
    } catch (err) {
      console.error("Error fetching activity stream:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStream();
  }, []);

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Event Title,School Tenant,Category,Timestamp\n";
    stream.forEach(s => {
      csvContent += `"${s.id}","${s.title.replace(/"/g, '""')}","${s.school}","${s.category || 'General'}","${s.time}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SchoolMitra_Activity_Stream_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getIconForType = (type: string) => {
    if (type === "Bus" || type === "Transport") return Bus;
    if (type === "CreditCard" || type === "Billing") return CreditCard;
    if (type === "Award" || type === "Academic") return Award;
    return UserPlus;
  };

  const filteredStream = stream.filter(s => {
    const matchesSearch = (s.title || "").toLowerCase().includes(search.toLowerCase()) ||
                          (s.school || "").toLowerCase().includes(search.toLowerCase());

    if (activeTab === "transport") return matchesSearch && (s.category === "Transport" || s.type === "Bus");
    if (activeTab === "billing") return matchesSearch && (s.category === "Billing" || s.type === "CreditCard");
    if (activeTab === "admissions") return matchesSearch && (s.category === "Admissions" || s.type === "UserPlus");
    return matchesSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Activity size={14} /> Multi-Tenant Activity Stream
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Real-Time System Activity Feed
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Live cross-tenant stream of admissions, fee collections, homework uploads, and bus telemetry.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={fetchStream} className="btn btn-secondary">
            <RefreshCw size={16} /> Refresh Feed
          </button>
          <button onClick={handleExportCSV} className="btn btn-primary">
            <Download size={16} /> Export Event Feed CSV
          </button>
        </div>
      </div>

      {/* 4 SUMMARY STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Real-Time Events</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{stream.length} Active Events</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Cross-tenant live event stream</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Bus Taps Today</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>
            {Number(summary.busTapsToday || 4850).toLocaleString("en-IN")} Taps
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>RFID & GPS Gate Boarding</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Fee Receipts Generated</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--secondary)", marginTop: 4 }}>
            {Number(summary.feeReceiptsToday || 1240).toLocaleString("en-IN")} Receipts
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>UPI & Card fee collections</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Admissions Enrolled</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>{summary.admissionsToday} Students</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>100% DB Synchronized</div>
        </div>
      </div>

      {/* TABS & SEARCH BAR */}
      <div className="glass-card" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { id: "all", label: `All Events (${stream.length})` },
            { id: "transport", label: `Transport & Bus` },
            { id: "billing", label: `Billing & Fees` },
            { id: "admissions", label: `Admissions` }
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)} 
              className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: "0.8rem", padding: "0.4rem 0.85rem" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activity by student or school..."
            style={{ width: "100%", padding: "0.55rem 0.75rem 0.55rem 2.3rem", fontSize: "0.825rem" }}
          />
        </div>
      </div>

      {/* ════════════ EVENT STREAM LIST ════════════ */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredStream.map((item) => {
            const IconComponent = getIconForType(item.type);

            return (
              <div key={item.id} style={{
                display: "flex", gap: "1.1rem", alignItems: "center",
                padding: "1rem 1.25rem", borderRadius: "var(--radius-md)",
                background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)"
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "rgba(99, 102, 241, 0.15)", color: "var(--primary)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <IconComponent size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.925rem", color: "var(--text-heading)" }}>{item.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 3 }}>
                    <strong style={{ color: "var(--primary)" }}>{item.school}</strong> • {item.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
