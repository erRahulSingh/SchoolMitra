"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, DollarSign, ArrowUpRight, Building2, CreditCard, 
  Sparkles, Download, CheckCircle2, ShieldCheck, Zap, BarChart3, Receipt 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function RevenueAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const [revenueStats, setRevenueStats] = useState({
    mrr: "₹ 24,80,000",
    arr: "₹ 2,97,60,000",
    arpu: "₹ 1,14,750",
    mrrGrowth: "+18.4%",
    netRetention: "112.4%",
    paidSchoolsCount: 148
  });

  const [planBreakdown, setPlanBreakdown] = useState<any[]>([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoading(true);
      try {
        const res = await superAdminApi.getRevenueAnalytics();
        if (res.success) {
          if (res.revenueStats) setRevenueStats(res.revenueStats);
          if (res.planBreakdown) setPlanBreakdown(res.planBreakdown);
        }
      } catch (err) {
        console.error("Error loading revenue telemetry:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `MRR,${revenueStats.mrr}\n`
      + `ARR,${revenueStats.arr}\n`
      + `ARPU,${revenueStats.arpu}\n`
      + `Growth Rate,${revenueStats.mrrGrowth}\n`
      + `Paid Schools,${revenueStats.paidSchoolsCount}\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SchoolMitra_Financial_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pricingCards = [
    {
      id: "starter",
      name: "Starter Basic",
      monthlyPrice: "₹ 18,000 / mo",
      annualPrice: "₹ 1,80,000 / yr",
      savings: "Save ₹ 36,000 / yr",
      capacity: "Up to 500 Students",
      badge: "ESSENTIAL",
      badgeColor: "badge-info",
      features: [
        "Core ERP & Student Directory",
        "Staff & Attendance Management",
        "Notice Board & SMS Alerts",
        "Standard Support SLA (24 hrs)"
      ]
    },
    {
      id: "growth",
      name: "Growth Plan",
      monthlyPrice: "₹ 32,000 / mo",
      annualPrice: "₹ 3,20,000 / yr",
      savings: "Save ₹ 64,000 / yr",
      capacity: "Up to 1,500 Students",
      badge: "MOST POPULAR 🔥",
      badgeColor: "badge-success",
      features: [
        "Everything in Starter Basic",
        "Live Bus GPS Telemetry & Tracking",
        "Driver Cockpit & Parent App",
        "Exams, Report Cards & Fees Engine",
        "Priority Support SLA (4 hrs)"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise Pro",
      monthlyPrice: "₹ 45,000 / mo",
      annualPrice: "₹ 4,50,000 / yr",
      savings: "Save ₹ 90,000 / yr",
      capacity: "Unlimited Students & Campuses",
      badge: "UNLIMITED POWER",
      badgeColor: "badge-warning",
      features: [
        "Everything in Growth Plan",
        "Dedicated Multi-Tenant Server Cluster",
        "White-label Custom App & Subdomain",
        "Custom API Integrations & Payroll",
        "24/7 Dedicated Account Director"
      ]
    }
  ];

  const monthlyTrends = [
    { month: "May 2026", amount: "₹ 18.5L", percentage: 65 },
    { month: "Jun 2026", amount: "₹ 21.2L", percentage: 76 },
    { month: "Jul 2026", amount: "₹ 24.8L", percentage: 88 },
    { month: "Aug 2026 (Projected)", amount: "₹ 28.5L", percentage: 95 }
  ];

  const recentTransactions = [
    { ref: "INV-9920", school: "Delhi Public School (Dwarka)", plan: "Enterprise Pro", amount: "₹ 5,40,000", date: "04 Aug 2026", gateway: "Razorpay UPI", status: "Completed" },
    { ref: "INV-9921", school: "St. Xavier's Senior Secondary School", plan: "Growth Plan", amount: "₹ 3,20,000", date: "02 Aug 2026", gateway: "HDFC NetBanking", status: "Completed" },
    { ref: "INV-9922", school: "Modern School (Barakhamba Road)", plan: "Enterprise Pro", amount: "₹ 4,50,000", date: "28 Jul 2026", gateway: "Bank Wire Transfer", status: "Completed" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> SaaS Revenue Intelligence & Pricing Engine
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Revenue & Financial Analytics
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Live Monthly Recurring Revenue (MRR), Annual Run Rate (ARR), Tier Pricing Cards, and Financial Telemetry.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-primary">
          <Download size={16} /> Export Financial CSV Report
        </button>
      </div>

      {/* 4 STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Monthly Recurring (MRR)</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{revenueStats.mrr}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <TrendingUp size={14} /> {revenueStats.mrrGrowth} MoM Growth
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Annual Run Rate (ARR)</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>{revenueStats.arr}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>{revenueStats.paidSchoolsCount || 148} Active Paid Schools</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Avg Revenue Per School</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>{revenueStats.arpu}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>Highest retention rate (98.2%)</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Net Revenue Retention</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--secondary)", marginTop: 4 }}>{revenueStats.netRetention}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--secondary)", marginTop: 4 }}>Expansion from tier upgrades</div>
        </div>
      </div>

      {/* ════════════ INTERACTIVE PRICING CARDS ════════════ */}
      <div className="glass-card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-heading)" }}>SaaS Pricing Tiers & Subscription Matrix</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: 2 }}>Configure pricing models and review tier student quotas.</p>
          </div>

          {/* Monthly / Annual Toggle */}
          <div style={{ display: "flex", alignItems: "center", background: "var(--btn-secondary-bg)", padding: "0.3rem", borderRadius: "99px", border: "1px solid var(--border-color)" }}>
            <button 
              onClick={() => setBillingCycle("monthly")} 
              className={`btn ${billingCycle === "monthly" ? "btn-primary" : "btn-secondary"}`}
              style={{ borderRadius: "99px", padding: "0.35rem 1rem", fontSize: "0.78rem" }}
            >
              Monthly Billing
            </button>
            <button 
              onClick={() => setBillingCycle("annual")} 
              className={`btn ${billingCycle === "annual" ? "btn-primary" : "btn-secondary"}`}
              style={{ borderRadius: "99px", padding: "0.35rem 1rem", fontSize: "0.78rem" }}
            >
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {pricingCards.map((card) => (
            <div key={card.id} className="glass-card" style={{
              padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.1rem",
              border: card.id === "growth" ? "2px solid var(--primary)" : "1px solid var(--border-color)",
              position: "relative"
            }}>
              <span className={`badge ${card.badgeColor}`} style={{ position: "absolute", top: 16, right: 16 }}>{card.badge}</span>
              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--text-heading)" }}>{card.name}</div>
              
              <div>
                <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "var(--primary)" }}>
                  {billingCycle === "monthly" ? card.monthlyPrice : card.annualPrice}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 700, marginTop: 2 }}>
                  {billingCycle === "annual" ? card.savings : "Standard monthly billing"}
                </div>
              </div>

              <div style={{ fontSize: "0.825rem", color: "var(--secondary)", fontWeight: 800, padding: "0.4rem 0.75rem", borderRadius: "6px", background: "rgba(56, 189, 248, 0.1)", display: "inline-block" }}>
                {card.capacity}
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {card.features.map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.825rem", color: "var(--text-muted)" }}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary" style={{ marginTop: "0.5rem", justifyContent: "center" }}>
                Edit Tier Pricing
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2 COLUMNS: MONTHLY TRENDS & PAYMENT METHODS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
        
        {/* MONTHLY REVENUE PROGRESS BARS */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <BarChart3 size={18} color="var(--primary)" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>Monthly MRR Trajectory</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {monthlyTrends.map((t, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                  <span style={{ color: "var(--text-heading)" }}>{t.month}</span>
                  <span style={{ color: "var(--primary)" }}>{t.amount}</span>
                </div>
                <div style={{ height: "8px", width: "100%", background: "var(--btn-secondary-bg)", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${t.percentage}%`, background: "var(--hero-bg)", borderRadius: "99px", transition: "width 0.5s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAYMENT GATEWAY DISTRIBUTION */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <CreditCard size={18} color="var(--success)" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>Gateway & Channel Distribution</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", borderRadius: "8px", background: "var(--btn-secondary-bg)" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--text-heading)" }}>Razorpay UPI AutoPay</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Instant automated monthly renewals</div>
              </div>
              <span className="badge badge-success">58% Share</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", borderRadius: "8px", background: "var(--btn-secondary-bg)" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--text-heading)" }}>HDFC / ICICI Corporate NetBanking</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Direct annual wire transfers</div>
              </div>
              <span className="badge badge-info">24% Share</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", borderRadius: "8px", background: "var(--btn-secondary-bg)" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--text-heading)" }}>NEFT / RTGS Bank Wire</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Government school purchase orders</div>
              </div>
              <span className="badge badge-warning">18% Share</span>
            </div>
          </div>
        </div>

      </div>

      {/* PLAN BREAKDOWN TABLE */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.25rem", color: "var(--text-heading)" }}>
          Subscription Plan Tier Distribution
        </h3>

        <div style={{ overflowX: "auto" }}>
          <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>PLAN TIER</th>
                <th style={{ padding: "0.75rem" }}>ACTIVE TENANTS</th>
                <th style={{ padding: "0.75rem" }}>ANNUAL FEE</th>
                <th style={{ padding: "0.75rem" }}>TOTAL ARR CONTRIBUTION</th>
                <th style={{ padding: "0.75rem" }}>REVENUE SHARE</th>
              </tr>
            </thead>
            <tbody>
              {planBreakdown.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--text-heading)" }}>{row.plan}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{row.activeTenants} Schools</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{row.pricePerYear}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--primary)" }}>{row.totalARR}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--success)" }}>{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECENT SETTLEMENT TRANSACTIONS STREAM */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <Receipt size={18} color="var(--primary)" />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>Recent SaaS Settlement Invoices</h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Invoice Ref</th>
                <th>School Tenant</th>
                <th>Subscribed Tier</th>
                <th>Settlement Amount</th>
                <th>Paid Date</th>
                <th>Gateway Channel</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{tx.ref}</td>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{tx.school}</td>
                  <td><span className="badge badge-info">{tx.plan}</span></td>
                  <td style={{ fontWeight: 900, color: "var(--success)" }}>{tx.amount}</td>
                  <td style={{ color: "var(--text-muted)" }}>{tx.date}</td>
                  <td style={{ color: "var(--text-muted)" }}>{tx.gateway}</td>
                  <td><span className="badge badge-success">{tx.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
