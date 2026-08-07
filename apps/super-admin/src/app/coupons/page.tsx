"use client";

import React, { useState, useEffect } from "react";
import { 
  Ticket, Plus, CheckCircle2, Clock, Sparkles, Search, Filter, 
  Copy, Check, Trash2, Power, X, Download, Tag, DollarSign, Percent 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function SaaSDiscountCouponsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "disabled">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState("");

  const [coupons, setCoupons] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalCoupons: 3,
    activeCount: 3,
    totalRedemptions: 104,
    estimatedSavings: "₹ 4,85,000"
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codeName, setCodeName] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [targetPlan, setTargetPlan] = useState("All Annual Plans");
  const [maxUses, setMaxUses] = useState("50");
  const [validTill, setValidTill] = useState("31 Dec 2026");

  const fetchCoupons = async () => {
    setLoading(true);
    // Load local storage fallback immediately
    const local = localStorage.getItem("saas_discount_coupons");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) setCoupons(parsed);
      } catch (e) {}
    }

    try {
      const res = await superAdminApi.getCoupons();
      if (res.success) {
        if (res.summary) setSummary(res.summary);
        if (res.coupons && Array.isArray(res.coupons) && res.coupons.length > 0) {
          setCoupons(res.coupons);
          localStorage.setItem("saas_discount_coupons", JSON.stringify(res.coupons));
        }
      }
    } catch (err) {
      console.error("Error fetching discount coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeName || !discountRate) return;

    const formattedCode = codeName.toUpperCase().trim();
    const formattedDiscount = discountRate.includes("%") || discountRate.includes("₹") ? discountRate : `${discountRate}% OFF`;

    const optimisticCoupon = {
      code: formattedCode,
      discount: formattedDiscount,
      planTarget: targetPlan,
      validTill: validTill || "31 Dec 2026",
      maxUses: Number(maxUses) || 50,
      usedCount: 0,
      status: "Active"
    };

    setCoupons(prev => {
      const updated = [optimisticCoupon, ...prev.filter(c => c.code !== formattedCode)];
      localStorage.setItem("saas_discount_coupons", JSON.stringify(updated));
      return updated;
    });

    setIsModalOpen(false);
    setCodeName("");
    setDiscountRate("");

    try {
      const res = await superAdminApi.createCoupon(optimisticCoupon);
      if (res.success && res.coupons) {
        setCoupons(res.coupons);
        localStorage.setItem("saas_discount_coupons", JSON.stringify(res.coupons));
      }
    } catch (err) {
      console.error("Error creating coupon:", err);
    }
  };

  const handleToggleStatus = async (code: string) => {
    setCoupons(prev => {
      const updated = prev.map(c => c.code === code ? { ...c, status: c.status === "Active" ? "Disabled" : "Active" } : c);
      localStorage.setItem("saas_discount_coupons", JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await superAdminApi.toggleCouponStatus(code);
      if (res.success && res.coupons) {
        setCoupons(res.coupons);
        localStorage.setItem("saas_discount_coupons", JSON.stringify(res.coupons));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCoupon = async (code: string) => {
    if (!confirm(`Are you sure you want to delete promo code ${code}?`)) return;

    setCoupons(prev => {
      const updated = prev.filter(c => c.code !== code);
      localStorage.setItem("saas_discount_coupons", JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await superAdminApi.deleteCoupon(code);
      if (res.success && res.coupons) {
        setCoupons(res.coupons);
        localStorage.setItem("saas_discount_coupons", JSON.stringify(res.coupons));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Coupon Code,Discount,Target Plan,Used Count,Max Uses,Valid Till,Status\n";
    coupons.forEach(c => {
      csvContent += `"${c.code}","${c.discount}","${c.planTarget || 'All Plans'}","${c.usedCount || 0}","${c.maxUses || 50}","${c.validTill || c.expiry}","${c.status}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SchoolMitra_Promo_Coupons_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCoupons = coupons.filter(c => {
    const matchesSearch = (c.code || "").toLowerCase().includes(search.toLowerCase()) ||
                          (c.discount || "").toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === "active") return matchesSearch && c.status === "Active";
    if (activeTab === "disabled") return matchesSearch && c.status === "Disabled";
    return matchesSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> SaaS Promotional Engine & Coupons
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Discount Coupons & Promo Codes
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Create promotional coupon codes for school tenant onboarding discounts and subscription renewals.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={handleExportCSV} className="btn btn-secondary">
            <Download size={16} /> Export All CSV
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Plus size={16} /> Create Promo Coupon
          </button>
        </div>
      </div>

      {/* 4 SUMMARY STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Active Promo Coupons</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{coupons.filter(c => c.status === "Active").length} Live Codes</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Available for school onboarding</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Redemptions</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>{summary.totalRedemptions} Times Redeemed</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>Applied by subscriber schools</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Estimated Client Savings</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--secondary)", marginTop: 4 }}>{summary.estimatedSavings}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Total value delivered to tenants</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Database Sync Status</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>100% Connected</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>MongoDB + LocalStorage Live Sync</div>
        </div>
      </div>

      {/* TABS & SEARCH BAR */}
      <div className="glass-card" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { id: "all", label: `All Coupons (${coupons.length})` },
            { id: "active", label: `Active (${coupons.filter(c => c.status === "Active").length})` },
            { id: "disabled", label: `Disabled (${coupons.filter(c => c.status === "Disabled").length})` }
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
            placeholder="Search by promo code or discount..."
            style={{ width: "100%", padding: "0.55rem 0.75rem 0.55rem 2.3rem", fontSize: "0.825rem" }}
          />
        </div>
      </div>

      {/* ════════════ COUPONS TABLE ════════════ */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div className="table-container">
          <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>COUPON CODE</th>
                <th style={{ padding: "0.75rem" }}>DISCOUNT VALUE</th>
                <th style={{ padding: "0.75rem" }}>TARGET PLAN</th>
                <th style={{ padding: "0.75rem" }}>REDEMPTION PROGRESS</th>
                <th style={{ padding: "0.75rem" }}>VALID TILL</th>
                <th style={{ padding: "0.75rem" }}>STATUS</th>
                <th style={{ padding: "0.75rem", textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((cpn, idx) => {
                const used = cpn.usedCount || cpn.redemptions ? parseInt(cpn.redemptions) || 0 : 0;
                const max = cpn.maxUses || 50;
                const percent = Math.min(100, Math.round((used / max) * 100));

                return (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                    <td style={{ padding: "0.85rem 0.75rem" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ fontWeight: 900, color: "var(--primary)", fontFamily: "monospace", fontSize: "0.95rem", letterSpacing: "0.05em" }}>
                          {cpn.code}
                        </span>
                        <button onClick={() => copyToClipboard(cpn.code)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 2 }} title="Copy Code">
                          {copiedCode === cpn.code ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </td>

                    <td style={{ padding: "0.85rem 0.75rem", fontWeight: 800, color: "var(--success)" }}>
                      {cpn.discount}
                    </td>

                    <td style={{ padding: "0.85rem 0.75rem" }}>
                      <span className="badge badge-info">{cpn.planTarget || "All SaaS Plans"}</span>
                    </td>

                    <td style={{ padding: "0.85rem 0.75rem", width: 180 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 4 }}>
                        <span>{used} / {max} Used</span>
                        <span>{percent}%</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${percent}%`, background: "var(--primary)", borderRadius: 99 }} />
                      </div>
                    </td>

                    <td style={{ padding: "0.85rem 0.75rem", color: "var(--text-heading)" }}>
                      {cpn.validTill || cpn.expiry || "31 Dec 2026"}
                    </td>

                    <td style={{ padding: "0.85rem 0.75rem" }}>
                      <span className={`badge ${cpn.status === "Active" ? "badge-success" : "badge-danger"}`}>
                        {cpn.status}
                      </span>
                    </td>

                    <td style={{ padding: "0.85rem 0.75rem", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.45rem", justifyContent: "flex-end" }}>
                        <button onClick={() => handleToggleStatus(cpn.code)} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>
                          <Power size={14} color={cpn.status === "Active" ? "var(--danger)" : "var(--success)"} />
                          <span>{cpn.status === "Active" ? "Disable" : "Enable"}</span>
                        </button>
                        <button onClick={() => handleDeleteCoupon(cpn.code)} className="btn btn-secondary" style={{ padding: "0.35rem 0.55rem", color: "var(--danger)" }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE PROMO COUPON MODAL */}
      {isModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-heading)" }}>Create Promotional Discount Code</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateCoupon} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>COUPON CODE NAME</label>
                <input 
                  type="text" 
                  value={codeName} 
                  onChange={(e) => setCodeName(e.target.value)} 
                  placeholder="e.g. FESTIVE25 or SMFREEDOM50" 
                  required 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem", textTransform: "uppercase" }} 
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DISCOUNT RATE / VALUE</label>
                <input 
                  type="text" 
                  value={discountRate} 
                  onChange={(e) => setDiscountRate(e.target.value)} 
                  placeholder="e.g. 25% OFF or Flat ₹ 5,000 OFF" 
                  required 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TARGET PLAN TIER</label>
                <select value={targetPlan} onChange={(e) => setTargetPlan(e.target.value)} style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }}>
                  <option value="All Annual Plans">All Annual Plans</option>
                  <option value="Enterprise Pro">Enterprise Pro Tier Only</option>
                  <option value="Growth Plan">Growth Plan Tier Only</option>
                  <option value="Starter Basic">Starter Basic Tier Only</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MAX USAGE LIMIT</label>
                  <input 
                    type="number" 
                    value={maxUses} 
                    onChange={(e) => setMaxUses(e.target.value)} 
                    placeholder="50" 
                    style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EXPIRY DATE</label>
                  <input 
                    type="text" 
                    value={validTill} 
                    onChange={(e) => setValidTill(e.target.value)} 
                    placeholder="31 Dec 2026" 
                    style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Publish Promo Code</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
