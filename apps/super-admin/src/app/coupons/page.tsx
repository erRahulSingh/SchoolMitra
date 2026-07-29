"use client";

import React, { useState } from "react";
import { Ticket, Plus, CheckCircle2, Clock, Sparkles } from "lucide-react";

export default function SaaSDiscountCouponsPage() {
  const [coupons] = useState([
    { code: "EARLYBIRD20", discount: "20% OFF", planTarget: "All Annual Plans", redemptions: "34 / 50", status: "Active", expiry: "31 Dec 2026" },
    { code: "CBSE2026", discount: "15% OFF", planTarget: "Enterprise Pro", redemptions: "18 / 100", status: "Active", expiry: "30 Nov 2026" },
    { code: "FREETRIAL30", discount: "30 Days Free", planTarget: "Growth Plan", redemptions: "82 / 100", status: "Active", expiry: "15 Oct 2026" }
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> SaaS Promotional Engine
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Discount Coupons & Promo Codes
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Create promotional coupon codes for school tenant onboarding discounts.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>Active Promotional Codes</h3>
          <button className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
            <Plus size={16} />
            <span>Create Promo Coupon</span>
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>COUPON CODE</th>
                <th style={{ padding: "0.75rem" }}>DISCOUNT</th>
                <th style={{ padding: "0.75rem" }}>TARGET PLAN</th>
                <th style={{ padding: "0.75rem" }}>REDEMPTIONS</th>
                <th style={{ padding: "0.75rem" }}>EXPIRY</th>
                <th style={{ padding: "0.75rem" }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((cpn, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "0.04em" }}>{cpn.code}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--success)" }}>{cpn.discount}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{cpn.planTarget}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{cpn.redemptions}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{cpn.expiry}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>
                    <span style={{ background: "var(--success-bg)", color: "var(--success)", padding: "0.2rem 0.55rem", borderRadius: 6, fontSize: "0.75rem", fontWeight: 800 }}>
                      {cpn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
