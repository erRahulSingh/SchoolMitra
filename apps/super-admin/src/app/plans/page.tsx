"use client";

import React, { useState, useEffect } from "react";
import { 
  Tag, Check, Sparkles, Plus, Edit3, Trash2, CheckCircle2, 
  Layers, Users, ShieldCheck, DollarSign, X, CheckSquare, RefreshCw, 
  Calculator, Sliders, ArrowRight, UserCheck, CheckCircle
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function SaaSPlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalPlans: 3,
    totalSubscribers: 148,
    popularPlan: "Growth Plan",
    avgArpu: "₹ 35,400 / yr"
  });

  // Modal State for Edit / Create Plan
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  
  // Form fields for Edit / Create Plan
  const [planName, setPlanName] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [annualPrice, setAnnualPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  // Custom Enterprise Calculator State
  const [calcStudents, setCalcStudents] = useState(1200);
  const [hasGPS, setHasGPS] = useState(true);
  const [hasWhatsApp, setHasWhatsApp] = useState(true);
  const [hasAppBranding, setHasAppBranding] = useState(false);
  const [hasDedicatedSLA, setHasDedicatedSLA] = useState(true);

  // Assign Plan Modal State
  const [assigningPlan, setAssigningPlan] = useState<any>(null);
  const [selectedSchool, setSelectedSchool] = useState("Delhi Public School (Dwarka)");
  const [assignSuccessMsg, setAssignSuccessMsg] = useState("");

  const fetchPlans = async () => {
    setLoading(true);
    // Load local storage fallback immediately
    const local = localStorage.getItem("saas_monetization_plans");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) setPlans(parsed);
      } catch (e) {}
    }

    try {
      const res = await superAdminApi.getSaaSPlans();
      if (res.success) {
        if (res.summary) setSummary(res.summary);
        if (res.plans && Array.isArray(res.plans) && res.plans.length > 0) {
          setPlans(res.plans);
          localStorage.setItem("saas_monetization_plans", JSON.stringify(res.plans));
        }
      }
    } catch (err) {
      console.error("Error fetching SaaS monetization plans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const openCreateModal = () => {
    setEditingPlan(null);
    setPlanName("");
    setBadgeText("NEW TIER");
    setMonthlyPrice("25,000");
    setAnnualPrice("2,50,000");
    setCapacity("Up to 1,000 Active Students");
    setFeaturesText("Core ERP Access\nAttendance & Marksheet\nParent Mobile PWA App\nEmail Support (24h SLA)");
    setIsPopular(false);
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingPlan(p);
    setPlanName(p.name || "");
    setBadgeText(p.badge || "");
    setMonthlyPrice(p.monthlyPrice || "");
    setAnnualPrice(p.annualPrice || "");
    setCapacity(p.capacity || "");
    setFeaturesText(Array.isArray(p.features) ? p.features.join("\n") : p.features || "");
    setIsPopular(Boolean(p.popular));
    setIsModalOpen(true);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!planName || !monthlyPrice) return;

    const featureList = featuresText
      .split("\n")
      .map(f => f.trim())
      .filter(Boolean);

    const payload = {
      ...(editingPlan ? { id: editingPlan.id } : {}),
      name: planName,
      badge: badgeText || (isPopular ? "MOST POPULAR 🔥" : "TIER PLAN"),
      badgeColor: isPopular ? "badge-success" : "badge-info",
      monthlyPrice: monthlyPrice.includes("₹") ? monthlyPrice : `₹ ${monthlyPrice} / mo`,
      annualPrice: annualPrice ? (annualPrice.includes("₹") ? annualPrice : `₹ ${annualPrice} / yr`) : `₹ ${monthlyPrice}0 / yr`,
      savings: "Save 20% on annual billing",
      capacity: capacity || "Up to 1,000 Active Students",
      features: featureList,
      popular: isPopular,
      activeCount: editingPlan ? editingPlan.activeCount : 0
    };

    setPlans(prev => {
      let updated;
      if (editingPlan) {
        updated = prev.map(p => p.id === editingPlan.id ? { ...p, ...payload } : p);
      } else {
        updated = [...prev, { ...payload, id: `pln-${Date.now()}` }];
      }
      localStorage.setItem("saas_monetization_plans", JSON.stringify(updated));
      return updated;
    });

    setIsModalOpen(false);

    try {
      const res = await superAdminApi.saveSaaSPlan(payload);
      if (res.success && res.plans) {
        setPlans(res.plans);
        localStorage.setItem("saas_monetization_plans", JSON.stringify(res.plans));
      }
    } catch (err) {
      console.error("Error saving SaaS plan:", err);
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (!confirm("Are you sure you want to remove this plan tier?")) return;

    setPlans(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem("saas_monetization_plans", JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await superAdminApi.deleteSaaSPlan(id);
      if (res.success && res.plans) {
        setPlans(res.plans);
        localStorage.setItem("saas_monetization_plans", JSON.stringify(res.plans));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Live calculation for Custom Enterprise Pricing Calculator Card
  const calcBaseMonthly = calcStudents * 20;
  const calcAddonsMonthly = (hasGPS ? 5000 : 0) + (hasWhatsApp ? 4000 : 0) + (hasAppBranding ? 10000 : 0) + (hasDedicatedSLA ? 8000 : 0);
  const calcTotalMonthly = calcBaseMonthly + calcAddonsMonthly;
  const calcTotalAnnual = calcTotalMonthly * 10;

  const handlePublishCalculatorAsCard = async () => {
    const featureList = [
      `Capacity: Up to ${calcStudents} Students`,
      ...(hasGPS ? ["Real-time GPS Bus Telemetry & Live Tracking"] : []),
      ...(hasWhatsApp ? ["WhatsApp Notification Gateway (10k SMS/mo)"] : []),
      ...(hasAppBranding ? ["Custom Subdomain & Mobile App Branding"] : []),
      ...(hasDedicatedSLA ? ["24/7 SLA Guarantee & Dedicated Account Manager"] : [])
    ];

    const payload = {
      name: `Custom Tier (${calcStudents} Students)`,
      badge: "CUSTOM CALCULATED",
      badgeColor: "badge-info",
      monthlyPrice: `₹ ${calcTotalMonthly.toLocaleString("en-IN")} / mo`,
      annualPrice: `₹ ${calcTotalAnnual.toLocaleString("en-IN")} / yr`,
      savings: "Save 20% on annual billing",
      capacity: `Up to ${calcStudents} Students`,
      features: featureList,
      popular: false,
      activeCount: 1
    };

    setPlans(prev => {
      const updated = [...prev, { ...payload, id: `pln-${Date.now()}` }];
      localStorage.setItem("saas_monetization_plans", JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await superAdminApi.saveSaaSPlan(payload);
      if (res.success && res.plans) {
        setPlans(res.plans);
        localStorage.setItem("saas_monetization_plans", JSON.stringify(res.plans));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignPlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAssignSuccessMsg(`Plan "${assigningPlan?.name}" assigned successfully to ${selectedSchool}!`);
    setTimeout(() => {
      setAssigningPlan(null);
      setAssignSuccessMsg("");
    }, 1800);
  };

  const formatINR = (n: number) => `₹ ${Number(n || 0).toLocaleString("en-IN")}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> SaaS Monetization & Pricing Engine
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Subscription Tiers & Monetization Matrix
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Configure subscription tiers, student capacity quotas, feature entitlements, and pricing models.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {/* Monthly / Annual Switch */}
          <div style={{ display: "flex", alignItems: "center", background: "rgba(0,0,0,0.25)", padding: "0.3rem", borderRadius: "99px", border: "1px solid rgba(255,255,255,0.2)" }}>
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
              Annual Billing (20% OFF)
            </button>
          </div>

          <button onClick={openCreateModal} className="btn btn-primary">
            <Plus size={16} /> Add New SaaS Pricing Card
          </button>
        </div>
      </div>

      {/* 4 SUMMARY STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Active Monetization Tiers</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{plans.length} Tiers Configured</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Starter, Growth & Enterprise Tiers</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Subscribed Schools</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>{summary.totalSubscribers} Campuses</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>Active SaaS Tenants Onboarded</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Average ARPU (Per School)</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--secondary)", marginTop: 4 }}>{summary.avgArpu}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Annual Recurring Revenue Yield</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Most Popular Tier</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-heading)", marginTop: 4 }}>{summary.popularPlan}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--success)", marginTop: 4 }}>58 Subscribed School Campuses</div>
        </div>
      </div>

      {/* ════════════ PRICING CARDS GRID ════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {plans.map((pln) => (
          <div key={pln.id} className="glass-card" style={{
            padding: "1.85rem", display: "flex", flexDirection: "column", gap: "1.2rem",
            border: pln.popular ? "2px solid var(--primary)" : "1px solid var(--border-color)",
            position: "relative", borderRadius: "var(--radius-lg)"
          }}>
            {pln.badge && (
              <span className={`badge ${pln.popular ? "badge-success" : "badge-info"}`} style={{ position: "absolute", top: 18, right: 18 }}>
                {pln.badge}
              </span>
            )}

            <div>
              <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--text-heading)" }}>{pln.name}</div>
              
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--primary)" }}>
                  {billingCycle === "monthly" ? pln.monthlyPrice : pln.annualPrice}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 700, marginTop: 2 }}>
                  {billingCycle === "annual" ? (pln.savings || "20% Discounted Rate") : "Standard Monthly Billing"}
                </div>
              </div>
            </div>

            {/* CAPACITY CAP PILL */}
            <div style={{
              fontSize: "0.8rem", color: "var(--secondary)", fontWeight: 800,
              padding: "0.45rem 0.85rem", borderRadius: "8px", background: "rgba(56, 189, 248, 0.1)",
              display: "inline-flex", alignItems: "center", gap: "0.4rem"
            }}>
              <Users size={14} /> {pln.capacity}
            </div>

            {/* FEATURES CHECKLIST */}
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Plan Entitlements & Features</div>
              {(pln.features || []).map((feat: string, idx: number) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", fontSize: "0.835rem", color: "var(--text-heading)", lineHeight: 1.4 }}>
                  <CheckCircle2 size={16} color="var(--success)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* ASSIGN TO SCHOOL BUTTON */}
            <button onClick={() => setAssigningPlan(pln)} className="btn btn-primary" style={{ justifyContent: "center" }}>
              <UserCheck size={16} /> Assign Plan to School Tenant
            </button>

            {/* FOOTER BAR */}
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700 }}>
                {pln.activeCount || 0} Subscribed Schools
              </span>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button onClick={() => openEditModal(pln)} className="btn btn-secondary" style={{ padding: "0.38rem 0.65rem", fontSize: "0.75rem" }}>
                  <Edit3 size={14} /> Edit Tier
                </button>
                <button onClick={() => handleDeletePlan(pln.id)} className="btn btn-secondary" style={{ padding: "0.38rem 0.55rem", color: "var(--danger)" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════ INTERACTIVE CUSTOM ENTERPRISE PRICING CALCULATOR CARD ════════════ */}
      <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", border: "2px dashed var(--primary)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(99, 102, 241, 0.15)", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.4rem" }}>
              <Calculator size={14} /> Custom Tier Calculator
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--text-heading)" }}>Interactive Custom Enterprise Plan Calculator</h3>
            <p style={{ fontSize: "0.835rem", color: "var(--text-muted)", marginTop: 2 }}>Dynamically configure student quotas and module add-ons to calculate custom SaaS pricing quotes.</p>
          </div>

          <button onClick={handlePublishCalculatorAsCard} className="btn btn-primary">
            <Plus size={16} /> Save as New Pricing Card
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.75rem" }}>
          {/* SLIDER & TOGGLES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: 8 }}>
                <span>Student Capacity Quota:</span>
                <span style={{ color: "var(--primary)" }}>{calcStudents.toLocaleString("en-IN")} Students</span>
              </div>
              <input 
                type="range" 
                min={200} 
                max={5000} 
                step={100} 
                value={calcStudents} 
                onChange={(e) => setCalcStudents(Number(e.target.value))} 
                style={{ width: "100%", accentColor: "var(--primary)", cursor: "pointer" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Enterprise Module Add-ons</div>
              
              {[
                { label: "Real-time GPS Bus Telemetry & Live Tracking (+ ₹ 5,000/mo)", state: hasGPS, setter: setHasGPS },
                { label: "WhatsApp Notification Gateway (+ ₹ 4,000/mo)", state: hasWhatsApp, setter: setHasWhatsApp },
                { label: "Custom iOS / Android App Branding (+ ₹ 10,000/mo)", state: hasAppBranding, setter: setHasAppBranding },
                { label: "24/7 SLA Guarantee & Dedicated Account Manager (+ ₹ 8,000/mo)", state: hasDedicatedSLA, setter: setHasDedicatedSLA },
              ].map((item, idx) => (
                <label key={idx} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.835rem", color: "var(--text-heading)", cursor: "pointer" }}>
                  <input 
                    type="checkbox" 
                    checked={item.state} 
                    onChange={(e) => item.setter(e.target.checked)} 
                    style={{ width: 16, height: 16, accentColor: "var(--primary)", cursor: "pointer" }} 
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* CALCULATED PRICING SUMMARY BOX */}
          <div style={{
            padding: "1.5rem", borderRadius: "var(--radius-md)", background: "var(--btn-secondary-bg)",
            border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem"
          }}>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Estimated SaaS Subscription Quote</div>
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--success)", marginTop: 6 }}>
                {billingCycle === "monthly" ? formatINR(calcTotalMonthly) + " / mo" : formatINR(calcTotalAnnual) + " / yr"}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--success)", fontWeight: 700, marginTop: 4 }}>
                {billingCycle === "annual" ? "Includes 2 Months Free Annual Discount" : "Billed Monthly under SLA Terms"}
              </div>
            </div>

            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <div>Base ERP Quota: {formatINR(calcBaseMonthly)} / mo</div>
              <div>Add-ons Total: {formatINR(calcAddonsMonthly)} / mo</div>
            </div>

            <button onClick={handlePublishCalculatorAsCard} className="btn btn-primary" style={{ justifyContent: "center" }}>
              <Plus size={16} /> Publish as New Pricing Card
            </button>
          </div>
        </div>
      </div>

      {/* CREATE / EDIT SAAS PLAN TIER MODAL */}
      {isModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 540, borderRadius: "var(--radius-lg)", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-heading)" }}>
                {editingPlan ? "Edit SaaS Plan Entitlements" : "Create New SaaS Pricing Card"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSavePlan} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PLAN TIER NAME</label>
                <input 
                  type="text" 
                  value={planName} 
                  onChange={(e) => setPlanName(e.target.value)} 
                  placeholder="e.g. Growth Plan / Custom Enterprise" 
                  required 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MONTHLY PRICE</label>
                  <input 
                    type="text" 
                    value={monthlyPrice} 
                    onChange={(e) => setMonthlyPrice(e.target.value)} 
                    placeholder="₹ 32,000 / mo" 
                    required 
                    style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ANNUAL PRICE (20% OFF)</label>
                  <input 
                    type="text" 
                    value={annualPrice} 
                    onChange={(e) => setAnnualPrice(e.target.value)} 
                    placeholder="₹ 3,20,000 / yr" 
                    style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STUDENT CAPACITY QUOTA</label>
                <input 
                  type="text" 
                  value={capacity} 
                  onChange={(e) => setCapacity(e.target.value)} 
                  placeholder="e.g. Up to 1,500 Active Students" 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }} 
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FEATURE ENTITLEMENTS (ONE PER LINE)</label>
                <textarea 
                  value={featuresText} 
                  onChange={(e) => setFeaturesText(e.target.value)} 
                  rows={5} 
                  placeholder={"Core Student & Staff ERP\nGPS Bus Live Tracking\nDriver Cockpit App\nPriority SLA Support"} 
                  style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem", resize: "vertical" }} 
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input 
                  type="checkbox" 
                  id="popularCheck" 
                  checked={isPopular} 
                  onChange={(e) => setIsPopular(e.target.checked)} 
                  style={{ width: 16, height: 16, cursor: "pointer" }} 
                />
                <label htmlFor="popularCheck" style={{ fontSize: "0.85rem", color: "var(--text-heading)", cursor: "pointer" }}>
                  Mark as "MOST POPULAR 🔥" Highlighted Tier
                </label>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  {editingPlan ? "Save Plan Changes" : "Publish Pricing Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ASSIGN PLAN TO SCHOOL MODAL */}
      {assigningPlan && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 480, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-heading)" }}>Assign {assigningPlan.name} to School</h3>
              <button onClick={() => setAssigningPlan(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleAssignPlanSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECTED PLAN TIER</label>
                <input type="text" value={`${assigningPlan.name} (${assigningPlan.monthlyPrice})`} disabled style={{ width: "100%", padding: "0.7rem", background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "var(--text-heading)", fontSize: "0.85rem" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT SCHOOL TENANT</label>
                <select value={selectedSchool} onChange={(e) => setSelectedSchool(e.target.value)} style={{ width: "100%", padding: "0.7rem", fontSize: "0.85rem" }}>
                  <option value="Delhi Public School (Dwarka)">Delhi Public School (Dwarka)</option>
                  <option value="St. Xavier's Senior Secondary School">St. Xavier's Senior Secondary School</option>
                  <option value="DAV Public School (Vasant Kunj)">DAV Public School (Vasant Kunj)</option>
                  <option value="Kendriya Vidyalaya Sector 8">Kendriya Vidyalaya Sector 8</option>
                  <option value="Modern School (Barakhamba Road)">Modern School (Barakhamba Road)</option>
                </select>
              </div>

              {assignSuccessMsg && (
                <div style={{ color: "var(--success)", fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <CheckCircle size={16} /> {assignSuccessMsg}
                </div>
              )}

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setAssigningPlan(null)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Confirm Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
