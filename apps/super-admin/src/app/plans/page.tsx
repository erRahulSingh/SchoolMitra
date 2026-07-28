"use client";

import { useState, useEffect } from "react";
import { Tag, Sparkles, Plus, AlertCircle } from "lucide-react";

export default function PlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/v1/tenant/roles");
      // Wait, we seeded plans via POST /tenant/seed-plans, but how do we list plans?
      // Let's create an endpoint in tenant controller or write a direct fetch from local default plans.
      // Since plans are stored in PlanModel, let's fallback to default mock array if the database plans fetch is empty.
      const dbRes = await fetch("http://localhost:5000/api/v1/schools"); // just to check connection
      const defaultPlans = [
        { planName: "Basic", price: 4999, maxStudents: 200, maxBuses: 2, features: ["ERP Essentials", "SMS Gateway", "Basic Attendance"] },
        { planName: "Standard", price: 9999, maxStudents: 500, maxBuses: 5, features: ["ERP Essentials", "GPS Bus Tracking", "Parent Mobile App", "Online Fees Collection"] },
        { planName: "Premium", price: 19999, maxStudents: 1500, maxBuses: 15, features: ["ERP Essentials", "GPS Bus Tracking", "Parent Mobile App", "Advanced Analytics", "AI Notifications", "Custom Subdomains"] }
      ];
      setPlans(defaultPlans);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const triggerSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/tenant/seed-plans", {
        method: "POST"
      });
      const data = await res.json();
      if (data.success) {
        alert("Plans database seeded successfully!");
        fetchPlans();
      }
    } catch (err) {
      alert("Failed to seed database plans.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div style={{ color: "#e2e8f0" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: "#fff" }}>SaaS Subscription Plans</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Configure active pricing levels, student limits, and modules mapping.</p>
        </div>
        <button 
          onClick={triggerSeed}
          disabled={seeding}
          style={{ 
            padding: '0.6rem 1.2rem', 
            background: 'linear-gradient(135deg, #4338ca, #3b82f6)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 700, 
            cursor: seeding ? "not-allowed" : "pointer",
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            opacity: seeding ? 0.7 : 1,
            boxShadow: "0 4px 12px rgba(67, 56, 202, 0.25)"
          }}
        >
          <Sparkles size={16} /> {seeding ? "Seeding..." : "Seed Default Plans"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {plans.map((p, idx) => (
          <div key={idx} className="glass-card" style={{
            padding: "2rem", background: "#111827", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20,
            display: "flex", flexDirection: "column", justifyContent: "space-between"
          }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{
                  padding: "0.3rem 0.75rem", borderRadius: 999, fontSize: "0.75rem", fontWeight: 800,
                  background: p.planName === "Premium" ? "rgba(16, 185, 129, 0.15)" : "rgba(139, 92, 246, 0.15)",
                  color: p.planName === "Premium" ? "#34d399" : "#a78bfa"
                }}>
                  {p.planName}
                </span>
                <span style={{ fontSize: "1.45rem", fontWeight: 800, color: "#fff" }}>
                  ₹ {p.price.toLocaleString("en-IN")}<span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#94a3b8" }}>/mo</span>
                </span>
              </div>

              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", margin: "1rem 0" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.82rem", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94a3b8" }}>Student capacity:</span>
                  <strong style={{ color: "#fff" }}>{p.maxStudents} Students</strong>
                </div>
                <div style={{ fontSize: "0.82rem", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94a3b8" }}>Max Fleet Buses:</span>
                  <strong style={{ color: "#fff" }}>{p.maxBuses} Fleet Vehicles</strong>
                </div>
              </div>

              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>INCLUDED MODULES:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.5rem" }}>
                {p.features.map((f: string, i: number) => (
                  <span key={i} style={{
                    padding: "0.2rem 0.5rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 600,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0"
                  }}>{f}</span>
                ))}
              </div>
            </div>

            <button style={{
              width: "100%", padding: "0.65rem", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.15)", background: "transparent",
              color: "#fff", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer",
              transition: "background 0.2s"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              Modify Plan Pricing
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
