"use client";

import React, { useState } from "react";
import { FileText, Download, CheckCircle2, Clock, Sparkles, Search, Filter } from "lucide-react";

export default function SaaSInvoicesPage() {
  const [invoices] = useState([
    { id: "INV-2026-9901", school: "Delhi Public School (Dwarka)", plan: "Enterprise Pro", amount: "₹ 75,000", gst: "₹ 13,500", total: "₹ 88,500", date: "28 Jul 2026", status: "Paid" },
    { id: "INV-2026-9902", school: "St. Xavier's Senior Secondary", plan: "Growth Plan", amount: "₹ 45,000", gst: "₹ 8,100", total: "₹ 53,100", date: "25 Jul 2026", status: "Paid" },
    { id: "INV-2026-9903", school: "DAV Public School (Vasant Kunj)", plan: "Starter Basic", amount: "₹ 25,000", gst: "₹ 4,500", total: "₹ 29,500", date: "20 Jul 2026", status: "Pending" },
    { id: "INV-2026-9904", school: "Modern School (Barakhamba Road)", plan: "Enterprise Pro", amount: "₹ 75,000", gst: "₹ 13,500", total: "₹ 88,500", date: "15 Jul 2026", status: "Paid" }
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Sparkles size={14} /> SaaS GST Invoices Ledger
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Tax Invoices & Billing Receipts
          </h1>
          <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Generate & download 18% GST tax invoices issued to subscriber schools.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>Recent B2B Invoices</h3>
          <button className="btn btn-primary" style={{ fontSize: "0.82rem" }}>
            <FileText size={16} />
            <span>Generate New B2B Invoice</span>
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>INVOICE #</th>
                <th style={{ padding: "0.75rem" }}>SCHOOL TENANT</th>
                <th style={{ padding: "0.75rem" }}>PLAN</th>
                <th style={{ padding: "0.75rem" }}>BASE + GST (18%)</th>
                <th style={{ padding: "0.75rem" }}>TOTAL</th>
                <th style={{ padding: "0.75rem" }}>DATE</th>
                <th style={{ padding: "0.75rem" }}>STATUS</th>
                <th style={{ padding: "0.75rem" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.88rem" }}>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--primary)" }}>{inv.id}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "var(--text-heading)" }}>{inv.school}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{inv.plan}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{inv.amount} + {inv.gst}</td>
                  <td style={{ padding: "0.85rem 0.75rem", fontWeight: 800, color: "var(--text-heading)" }}>{inv.total}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>{inv.date}</td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>
                    <span style={{
                      background: inv.status === "Paid" ? "var(--success-bg)" : "rgba(245, 158, 11, 0.15)",
                      color: inv.status === "Paid" ? "var(--success)" : "#f59e0b",
                      padding: "0.2rem 0.55rem", borderRadius: 6, fontSize: "0.75rem", fontWeight: 800
                    }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.85rem 0.75rem" }}>
                    <button className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}>
                      <Download size={14} /> PDF
                    </button>
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
