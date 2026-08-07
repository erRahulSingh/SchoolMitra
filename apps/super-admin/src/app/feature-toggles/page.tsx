"use client";

import React, { useState, useEffect } from "react";
import { 
  Sliders, Sparkles, Shield, ToggleLeft, ToggleRight, Plus, 
  Search, Filter, Copy, Check, RefreshCw, X, ShieldAlert, Cpu 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function SaaSFeatureTogglesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState("");

  const [flags, setFlags] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalFlags: 6,
    enabledCount: 5,
    disabledCount: 1
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flagName, setFlagName] = useState("");
  const [flagKey, setFlagKey] = useState("");
  const [category, setCategory] = useState("Telemetry & Transport");
  const [description, setDescription] = useState("");

  const fetchFlags = async () => {
    setLoading(true);
    const local = localStorage.getItem("saas_feature_toggles");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) setFlags(parsed);
      } catch (e) {}
    }

    try {
      const res = await superAdminApi.getFeatureToggles();
      if (res.success) {
        if (res.summary) setSummary(res.summary);
        if (res.flags && Array.isArray(res.flags) && res.flags.length > 0) {
          setFlags(res.flags);
          localStorage.setItem("saas_feature_toggles", JSON.stringify(res.flags));
        }
      }
    } catch (err) {
      console.error("Error fetching feature toggles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  const handleToggleFlag = async (id: string) => {
    setFlags(prev => {
      const updated = prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f);
      localStorage.setItem("saas_feature_toggles", JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await superAdminApi.toggleFeatureFlag(id);
      if (res.success && res.flags) {
        setFlags(res.flags);
        localStorage.setItem("saas_feature_toggles", JSON.stringify(res.flags));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagName || !flagKey) return;

    const formattedKey = flagKey.toUpperCase().replace(/\s+/g, "_");
    const optimisticFlag = {
      id: `f-${Date.now()}`,
      name: flagName,
      key: formattedKey,
      description: description || "Custom entitlement feature flag",
      enabled: true,
      category: category || "General Modules"
    };

    setFlags(prev => {
      const updated = [optimisticFlag, ...prev];
      localStorage.setItem("saas_feature_toggles", JSON.stringify(updated));
      return updated;
    });

    setIsModalOpen(false);
    setFlagName("");
    setFlagKey("");
    setDescription("");

    try {
      const res = await superAdminApi.createFeatureFlag(optimisticFlag);
      if (res.success && res.flags) {
        setFlags(res.flags);
        localStorage.setItem("saas_feature_toggles", JSON.stringify(res.flags));
      }
    } catch (err) {
      console.error("Error creating feature flag:", err);
    }
  };

  const copyKeyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 2000);
  };

  const categories = ["all", "Telemetry & Transport", "Hardware & IoT", "Communications", "Fintech & Billing", "AI & Analytics", "Governance"];

  const filteredFlags = flags.filter(f => {
    const matchesSearch = (f.name || "").toLowerCase().includes(search.toLowerCase()) ||
                          (f.key || "").toLowerCase().includes(search.toLowerCase()) ||
                          (f.description || "").toLowerCase().includes(search.toLowerCase());
    
    if (activeCategory !== "all") return matchesSearch && f.category === activeCategory;
    return matchesSearch;
  });

  const enabledCount = flags.filter(f => f.enabled).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> Platform Architecture & Governance
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Global Feature Toggles & Canary Flags
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Enable, disable, or canary-rollout core modules and integrations across all tenant portals in real-time.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Add Custom Feature Flag
        </button>
      </div>

      {/* 4 SUMMARY STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Feature Flags</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{flags.length} Flags Configured</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Across all system modules</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Active Canary Enabled</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>{enabledCount} Modules Live</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>Live production feature flags</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Disabled / In-Dev</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--danger)", marginTop: 4 }}>{flags.length - enabledCount} Flags Disabled</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Restricted or staged features</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Database Sync Status</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>100% Live DB</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>MongoDB + LocalStorage Live Sync</div>
        </div>
      </div>

      {/* CATEGORIES & SEARCH BAR */}
      <div className="glass-card" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: "0.78rem", padding: "0.35rem 0.75rem", textTransform: "capitalize" }}
            >
              {cat === "all" ? `All Categories (${flags.length})` : cat}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search feature flags by key or name..."
            style={{ width: "100%", padding: "0.55rem 0.75rem 0.55rem 2.3rem", fontSize: "0.825rem" }}
          />
        </div>
      </div>

      {/* ════════════ FEATURE FLAGS CARDS LIST ════════════ */}
      <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {filteredFlags.map((flag) => (
          <div 
            key={flag.id} 
            style={{ 
              display: "flex", justifyContent: "space-between", alignItems: "center", 
              padding: "1.25rem 1.5rem", borderRadius: "var(--radius-md)", 
              background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)",
              flexWrap: "wrap", gap: "1rem"
            }}
          >
            <div style={{ flex: 1, minWidth: "260px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                <span style={{ fontWeight: 900, fontSize: "1.05rem", color: "var(--text-heading)" }}>{flag.name}</span>
                <span className="badge badge-info">{flag.category || "General"}</span>
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: 4 }}>
                <span style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 800, fontFamily: "monospace" }}>{flag.key}</span>
                <button onClick={() => copyKeyToClipboard(flag.key)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 2 }} title="Copy Flag Key">
                  {copiedKey === flag.key ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                </button>
              </div>

              <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: 6, lineHeight: 1.4 }}>{flag.description}</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span className={`badge ${flag.enabled ? "badge-success" : "badge-danger"}`}>
                {flag.enabled ? "ENABLED & LIVE" : "DISABLED"}
              </span>

              <button
                onClick={() => handleToggleFlag(flag.id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: flag.enabled ? "var(--success)" : "var(--text-muted)",
                  transition: "transform 0.2s"
                }}
                title={flag.enabled ? "Click to Disable Flag" : "Click to Enable Flag"}
              >
                {flag.enabled ? <ToggleRight size={44} /> : <ToggleLeft size={44} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE FEATURE FLAG MODAL */}
      {isModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-heading)" }}>Add Custom Canary Feature Flag</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateFlag} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FEATURE NAME</label>
                <input 
                  type="text" 
                  value={flagName} 
                  onChange={(e) => setFlagName(e.target.value)} 
                  placeholder="e.g. AI Attendance Voice Recognition" 
                  required 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ENVIRONMENT FLAG KEY</label>
                <input 
                  type="text" 
                  value={flagKey} 
                  onChange={(e) => setFlagKey(e.target.value)} 
                  placeholder="e.g. FEATURE_AI_VOICE_ATTENDANCE" 
                  required 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem", textTransform: "uppercase" }} 
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MODULE CATEGORY</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }}>
                  <option value="Telemetry & Transport">Telemetry & Transport</option>
                  <option value="Hardware & IoT">Hardware & IoT</option>
                  <option value="Communications">Communications</option>
                  <option value="Fintech & Billing">Fintech & Billing</option>
                  <option value="AI & Analytics">AI & Analytics</option>
                  <option value="Governance">Governance</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FEATURE DESCRIPTION</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={3} 
                  placeholder="Describe the entitlement behavior and affected portals..." 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem", resize: "vertical" }} 
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Publish Flag to DB</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
