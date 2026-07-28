"use client";

import React, { useState } from "react";
import { 
  CreditCard, Tag, Ticket, Clock, TrendingUp, Plus, X, 
  Search, CheckCircle2, AlertCircle, RefreshCw, Sparkles, 
  ArrowUpRight, DollarSign, Calendar, ChevronRight 
} from "lucide-react";

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState<"subscriptions" | "plans" | "trials" | "coupons">("subscriptions");

  // Subscriptions List
  const [subscriptions, setSubscriptions] = useState([
    { id: "SUB-801", school: "Delhi Public School (Dwarka)", plan: "Enterprise Pro", billingCycle: "Annual", amount: "₹ 5,40,000 / yr", startDate: "12 Dec 2024", expiryDate: "12 Dec 2027", status: "Active", autoRenew: true },
    { id: "SUB-802", school: "St. Xavier's Senior Secondary School", plan: "Growth Plan", billingCycle: "Monthly", amount: "₹ 32,000 / mo", startDate: "15 Oct 2024", expiryDate: "15 Oct 2026", status: "Active", autoRenew: true },
    { id: "SUB-803", school: "DAV Public School (Vasant Kunj)", plan: "Trial (14 Days)", billingCycle: "Trial", amount: "₹ 0", startDate: "22 Jul 2026", expiryDate: "05 Aug 2026", status: "Trial", autoRenew: false },
    { id: "SUB-804", school: "Kendriya Vidyalaya Sector 8", plan: "Starter Plan", billingCycle: "Monthly", amount: "₹ 18,000 / mo", startDate: "05 Feb 2025", expiryDate: "20 Jul 2026", status: "Expired", autoRenew: false }
  ]);

  // SaaS Plans
  const [plans] = useState([
    { id: "PLN-01", name: "Starter Plan", price: "₹ 18,000 / mo", maxStudents: "Up to 500 Students", features: ["Core ERP Dashboard", "Student & Parent Roster", "Basic Attendance", "Email Alerts"], popular: false },
    { id: "PLN-02", name: "Growth Plan", price: "₹ 32,000 / mo", maxStudents: "Up to 1,500 Students", features: ["Everything in Starter", "Live Bus GPS Telemetry", "Exams & Gradebook", "Driver Cockpit App", "WhatsApp Alerts"], popular: true },
    { id: "PLN-03", name: "Enterprise Pro", price: "₹ 45,000 / mo", maxStudents: "Unlimited Students", features: ["Everything in Growth", "Dedicated Server Cluster", "Custom Subdomain & App Branding", "24/7 SLA Support", "Custom API Integrations"], popular: false }
  ]);

  // Coupons
  const [coupons, setCoupons] = useState([
    { code: "SMFREEDOM50", discount: "50% OFF", validTill: "15 Aug 2026", maxUses: 50, usedCount: 22, status: "Active" },
    { code: "WELCOME20", discount: "20% OFF", validTill: "31 Dec 2026", maxUses: 100, usedCount: 64, status: "Active" },
    { code: "CBSEPROMO", discount: "Flat ₹ 10,000 OFF", validTill: "30 Sep 2026", maxUses: 25, usedCount: 18, status: "Active" }
  ]);

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedSubForUpgrade, setSelectedSubForUpgrade] = useState<any>(null);

  const handleRenew = (id: string) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: "Active", expiryDate: "29 Jul 2027" } : s));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="glass-card" style={{
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(99, 102, 241, 0.12) 100%)",
        border: "1px solid var(--border-glow)",
        padding: "1.75rem 2rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(139, 92, 246, 0.2)", border: "1px solid rgba(139, 92, 246, 0.4)", color: "#c084fc", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <CreditCard size={14} /> SaaS Billing & Subscriptions Engine
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Subscription Plans, Trials & Renewals
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: "0.875rem" }}>
            Manage SaaS tier plans, monitor active 14-day trials, trigger plan upgrades, manage renewals, and configure discount promo codes.
          </p>
        </div>

        <button onClick={() => setIsUpgradeModalOpen(true)} className="btn btn-primary">
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
                    <td style={{ fontWeight: 800, color: "#fff" }}>{sub.school}</td>
                    <td><span className="badge badge-info">{sub.plan}</span></td>
                    <td style={{ color: "var(--text-muted)" }}>{sub.billingCycle}</td>
                    <td style={{ fontWeight: 900, color: "#34d399" }}>{sub.amount}</td>
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
                        <button onClick={() => handleRenew(sub.id)} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {plans.map((pln) => (
            <div key={pln.id} className="glass-card" style={{
              padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem",
              border: pln.popular ? "2px solid var(--primary)" : "1px solid var(--border-color)",
              position: "relative"
            }}>
              {pln.popular && (
                <span className="badge badge-success" style={{ position: "absolute", top: 16, right: 16 }}>MOST POPULAR 🔥</span>
              )}
              <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fff" }}>{pln.name}</div>
              <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "var(--primary)" }}>{pln.price}</div>
              <div style={{ fontSize: "0.8rem", color: "#38bdf8", fontWeight: 700 }}>{pln.maxStudents}</div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {pln.features.map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.825rem", color: "var(--text-muted)" }}>
                    <CheckCircle2 size={16} color="#34d399" />
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
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.25rem" }}>Active 14-Day Free Trial Accounts</h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>School Tenant</th><th>Trial Start Date</th><th>Trial Expiry Date</th><th>Days Left</th><th>Conversion Status</th><th style={{ textAlign: "right" }}>Action</th></tr>
              </thead>
              <tbody>
                {subscriptions.filter(s => s.status === "Trial").map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{t.school}</td>
                    <td style={{ color: "var(--text-muted)" }}>{t.startDate}</td>
                    <td style={{ color: "#fbbf24", fontWeight: 700 }}>{t.expiryDate}</td>
                    <td style={{ fontWeight: 800, color: "var(--primary)" }}>7 Days Remaining</td>
                    <td><span className="badge badge-warning">Trial Active</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button onClick={() => handleRenew(t.id)} className="btn btn-primary" style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem" }}>
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
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.25rem" }}>Active Promo Discount Codes</h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr><th>Coupon Code</th><th>Discount Rate</th><th>Valid Till</th><th>Usage Ratio</th><th>Status</th></tr>
              </thead>
              <tbody>
                {coupons.map((c, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 900, color: "var(--primary)", fontFamily: "monospace", fontSize: "0.95rem" }}>{c.code}</td>
                    <td style={{ fontWeight: 800, color: "#34d399" }}>{c.discount}</td>
                    <td style={{ color: "var(--text-muted)" }}>{c.validTill}</td>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{c.usedCount} / {c.maxUses} Used</td>
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

    </div>
  );
}
