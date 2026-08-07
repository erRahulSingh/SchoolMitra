"use client";

import React, { useState, useEffect } from "react";
import { 
  CreditCard, Tag, Ticket, Clock, TrendingUp, Plus, X, 
  Search, CheckCircle2, AlertCircle, RefreshCw, Sparkles, 
  ArrowUpRight, DollarSign, Calendar, ChevronRight 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState<"subscriptions" | "plans" | "trials" | "coupons">("subscriptions");
  const [loading, setLoading] = useState(true);

  // Subscriptions List
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const res = await superAdminApi.getSubscriptionsData();
      if (res.success) {
        if (res.subscriptions) setSubscriptions(res.subscriptions);
        if (res.plans) setPlans(res.plans);
        if (res.coupons) setCoupons(res.coupons);
      }
    } catch (err) {
      console.error("Error fetching subscriptions telemetry:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedSubForUpgrade, setSelectedSubForUpgrade] = useState<any>(null);

  // Coupon Modal Form State
  const [isCreateCouponOpen, setIsCreateCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [validTill, setValidTill] = useState("31 Dec 2026");
  const [maxUses, setMaxUses] = useState("50");

  const handleRenew = async (id: string, schoolId?: string) => {
    setSubscriptions(prev => prev.map(s => (s.id === id || s.schoolId === schoolId) ? { ...s, status: "Active", expiryDate: "31 Dec 2027" } : s));
    try {
      await superAdminApi.renewSubscription(schoolId || id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode || !discountRate) return;

    const formattedCode = couponCode.toUpperCase().trim();
    const formattedDiscount = discountRate.includes("%") || discountRate.includes("₹") ? discountRate : `${discountRate}% OFF`;

    const created = {
      code: formattedCode,
      discount: formattedDiscount,
      validTill: validTill || "31 Dec 2026",
      maxUses: Number(maxUses) || 50,
      usedCount: 0,
      status: "Active"
    };

    setCoupons((prev) => [created, ...prev.filter(c => c.code !== formattedCode)]);
    setIsCreateCouponOpen(false);
    setActiveTab("coupons");
    setCouponCode("");
    setDiscountRate("");
    setValidTill("31 Dec 2026");
    setMaxUses("50");

    try {
      const res = await superAdminApi.createCoupon(created);
      if (res.success && res.coupons) {
        setCoupons(res.coupons);
      }
    } catch (err) {
      console.error("Error creating coupon:", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <CreditCard size={14} /> SaaS Billing & Subscriptions Engine
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Subscription Plans, Trials & Renewals
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.875rem" }}>
            Manage SaaS tier plans, monitor active 14-day trials, trigger plan upgrades, manage renewals, and configure discount promo codes.
          </p>
        </div>

        <button onClick={() => setIsCreateCouponOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Create Discount Coupon
        </button>
      </div>

      {/* 4 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        {[
          { id: "subscriptions", label: "Active Subscriptions", icon: CreditCard },
          { id: "plans", label: "SaaS Tiers & Plans", icon: Tag },
          { id: "trials", label: "14-Day Trial Tracker", icon: Clock },
          { id: "coupons", label: "Discount Coupons", icon: Ticket }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}>
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB 1: ACTIVE SUBSCRIPTIONS ════════════ */}
      {activeTab === "subscriptions" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Subscription Ref</th>
                  <th>School Tenant</th>
                  <th>Plan Tier</th>
                  <th>Billing Cycle</th>
                  <th>Billing Amount</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{sub.id}</td>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{sub.school}</td>
                    <td><span className="badge badge-info">{sub.plan}</span></td>
                    <td style={{ color: "var(--text-muted)" }}>{sub.billingCycle}</td>
                    <td style={{ fontWeight: 900, color: "var(--success)" }}>{sub.amount}</td>
                    <td style={{ color: "var(--text-muted)" }}>{sub.expiryDate}</td>
                    <td>
                      <span className={`badge ${sub.status === "Active" ? "badge-success" : sub.status === "Trial" ? "badge-warning" : "badge-danger"}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.45rem", justifyContent: "flex-end" }}>
                        <button onClick={() => setSelectedSubForUpgrade(sub)} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>
                          <ArrowUpRight size={14} /> Upgrade
                        </button>
                        <button onClick={() => handleRenew(sub.id, sub.schoolId)} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>
                          <RefreshCw size={14} /> Renew
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: SAAS PLANS ════════════ */}
      {activeTab === "plans" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {plans.map((pln) => (
            <div key={pln.id} className="glass-card" style={{
              padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem",
              border: pln.popular ? "2px solid var(--primary)" : "1px solid var(--border-color)",
              position: "relative"
            }}>
              {pln.popular && (
                <span className="badge badge-success" style={{ position: "absolute", top: 16, right: 16 }}>MOST POPULAR 🔥</span>
              )}
              <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--text-heading)" }}>{pln.name}</div>
              <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "var(--primary)" }}>{pln.price}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--secondary)", fontWeight: 700 }}>{pln.maxStudents}</div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {(pln.features || []).map((feat: string, idx: number) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.825rem", color: "var(--text-muted)" }}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary" style={{ marginTop: "0.5rem", justifyContent: "center" }}>
                Edit Plan Features
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ TAB 3: TRIAL TRACKER ════════════ */}
      {activeTab === "trials" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.25rem" }}>Active 14-Day Free Trial Accounts</h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>School Tenant</th><th>Trial Start Date</th><th>Trial Expiry Date</th><th>Days Left</th><th>Conversion Status</th><th style={{ textAlign: "right" }}>Action</th></tr>
              </thead>
              <tbody>
                {subscriptions.filter(s => s.status === "Trial").map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{t.school}</td>
                    <td style={{ color: "var(--text-muted)" }}>{t.startDate}</td>
                    <td style={{ color: "var(--warning)", fontWeight: 700 }}>{t.expiryDate}</td>
                    <td style={{ fontWeight: 800, color: "var(--primary)" }}>7 Days Remaining</td>
                    <td><span className="badge badge-warning">Trial Active</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button onClick={() => handleRenew(t.id, t.schoolId)} className="btn btn-primary" style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem" }}>
                        Convert to Paid Plan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: COUPONS ════════════ */}
      {activeTab === "coupons" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.25rem" }}>Active Promo Discount Codes</h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>Coupon Code</th><th>Discount Rate</th><th>Valid Till</th><th>Usage Ratio</th><th>Status</th></tr>
              </thead>
              <tbody>
                {coupons.map((c, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 900, color: "var(--primary)", fontFamily: "monospace", fontSize: "0.95rem" }}>{c.code}</td>
                    <td style={{ fontWeight: 800, color: "var(--success)" }}>{c.discount}</td>
                    <td style={{ color: "var(--text-muted)" }}>{c.validTill}</td>
                    <td style={{ fontWeight: 700, color: "var(--text-heading)" }}>{c.usedCount} / {c.maxUses} Used</td>
                    <td><span className="badge badge-success">{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PLAN UPGRADE MODAL */}
      {selectedSubForUpgrade && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Upgrade SaaS Subscription Tier</h3>
              <button onClick={() => setSelectedSubForUpgrade(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SCHOOL TENANT</label>
                <input type="text" value={selectedSubForUpgrade.school} disabled style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT NEW TIER PLAN</label>
                <select style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}>
                  <option style={{ background: "#0b0f19" }}>Enterprise Pro (₹ 45,000 / mo)</option>
                  <option style={{ background: "#0b0f19" }}>Growth Plan (₹ 32,000 / mo)</option>
                  <option style={{ background: "#0b0f19" }}>Starter Plan (₹ 18,000 / mo)</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button onClick={() => setSelectedSubForUpgrade(null)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button onClick={() => { handleRenew(selectedSubForUpgrade.id); setSelectedSubForUpgrade(null); }} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Confirm Upgrade</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE DISCOUNT COUPON MODAL */}
      {isCreateCouponOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-heading)" }}>Create Promo Discount Code</h3>
              <button onClick={() => setIsCreateCouponOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateCoupon} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>COUPON CODE NAME</label>
                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="e.g. FESTIVE25" required style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem", textTransform: "uppercase" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DISCOUNT VALUE / PERCENTAGE</label>
                <input type="text" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} placeholder="e.g. 25% OFF or Flat ₹ 5,000 OFF" required style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EXPIRY / VALID UNTIL</label>
                <input type="text" value={validTill} onChange={(e) => setValidTill(e.target.value)} placeholder="31 Dec 2026" style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MAXIMUM USAGE LIMIT</label>
                <input type="number" value={maxUses} onChange={(e) => setMaxUses(e.target.value)} placeholder="50" style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsCreateCouponOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Publish Promo Code</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
