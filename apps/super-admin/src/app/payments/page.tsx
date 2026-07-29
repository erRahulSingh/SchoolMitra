"use client";

import React, { useState } from "react";
import { 
  CreditCard, DollarSign, Download, Filter, Search, FileText, 
  Receipt, RefreshCw, CheckCircle2, AlertCircle, X, Sparkles, 
  Trash2, Undo, Check, Eye 
} from "lucide-react";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<"transactions" | "invoices" | "refunds" | "gateway">("transactions");
  const [search, setSearch] = useState("");
  
  // Transaction Ledger State
  const [transactions, setTransactions] = useState([
    { id: "TXN-9010", school: "Delhi Public School (Dwarka)", amount: 540000, gst: 97200, total: 637200, date: "12 Dec 2025", method: "Razorpay (UPI)", status: "Success", refId: "pay_Op982Fas810x" },
    { id: "TXN-9011", school: "St. Xavier's Senior Secondary School", amount: 32000, gst: 5760, total: 37760, date: "15 Jul 2026", method: "Razorpay (Card)", status: "Success", refId: "pay_Op772Gas992m" },
    { id: "TXN-9012", school: "Modern School (Barakhamba Road)", amount: 75000, gst: 13500, total: 88500, date: "01 Jul 2026", method: "Stripe (Card)", status: "Success", refId: "ch_1Mop72Lks00a" },
    { id: "TXN-9013", school: "Kendriya Vidyalaya Sector 8", amount: 18000, gst: 3240, total: 21240, date: "20 Jun 2026", method: "Bank Transfer", status: "Success", refId: "IMPS-992810" },
    { id: "TXN-9014", school: "DAV Public School (Vasant Kunj)", amount: 45000, gst: 8100, total: 53100, date: "22 Jul 2026", method: "Razorpay (NetBanking)", status: "Failed", refId: "pay_Op551Fas810x" },
  ]);

  // Refund Modal State
  const [selectedTxnForRefund, setSelectedTxnForRefund] = useState<any>(null);
  const [refundReason, setRefundReason] = useState("");
  const [refundStatusMessage, setRefundStatusMessage] = useState("");

  const handleRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTxnForRefund) return;
    
    // Update status to refunded in the table
    setTransactions(prev => prev.map(t => 
      t.id === selectedTxnForRefund.id ? { ...t, status: "Refunded" } : t
    ));
    setRefundStatusMessage("Refund initiated successfully!");
    setTimeout(() => {
      setSelectedTxnForRefund(null);
      setRefundReason("");
      setRefundStatusMessage("");
    }, 1500);
  };

  const formatINR = (n: number) => `₹ ${n.toLocaleString("en-IN")}`;

  const filteredTransactions = transactions.filter(t =>
    t.school.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.refId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <DollarSign size={14} /> SaaS Financial Ledger & GST compliance
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Payments & Invoicing Management
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.875rem" }}>
            Track SaaS transactions, download GST Tax Invoices (18% GST auto-split), handle refunds, and review payment gateway logs.
          </p>
        </div>

        <button className="btn btn-primary">
          <Download size={16} /> Export Financial Ledger
        </button>
      </div>

      {/* 4 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        {[
          { id: "transactions", label: "Payment History Logs", icon: CreditCard },
          { id: "invoices", label: "GST Tax Invoices (18%)", icon: FileText },
          { id: "refunds", label: "Refund Management", icon: Undo },
          { id: "gateway", label: "Gateway Live Logs", icon: RefreshCw }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}>
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR */}
      {activeTab !== "gateway" && (
        <div className="glass-card" style={{ padding: "1.25rem 1.5rem" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "500px" }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by school tenant, transaction ID, reference ID..."
              style={{
                width: "100%",
                padding: "0.65rem 0.75rem 0.65rem 2.5rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                color: "#ffffff",
                fontSize: "0.85rem"
              }}
            />
          </div>
        </div>
      )}

      {/* ════════════ TAB 1: PAYMENT HISTORY LOGS ════════════ */}
      {activeTab === "transactions" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>School Tenant</th>
                  <th>Sub-Total</th>
                  <th>GST (18%)</th>
                  <th>Total Charged</th>
                  <th>Payment Date</th>
                  <th>Method</th>
                  <th>Gateway Ref</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{t.id}</td>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{t.school}</td>
                    <td style={{ fontWeight: 600 }}>{formatINR(t.amount)}</td>
                    <td style={{ color: "var(--text-muted)" }}>{formatINR(t.gst)}</td>
                    <td style={{ fontWeight: 900, color: "#34d399" }}>{formatINR(t.total)}</td>
                    <td style={{ color: "var(--text-muted)" }}>{t.date}</td>
                    <td style={{ fontSize: "0.825rem" }}>{t.method}</td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "var(--text-muted)" }}>{t.refId}</td>
                    <td>
                      <span className={`badge ${
                        t.status === "Success" ? "badge-success" : t.status === "Failed" ? "badge-danger" : "badge-warning"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: GST TAX INVOICES ════════════ */}
      {activeTab === "invoices" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Recipient School</th>
                  <th>HSN/SAC</th>
                  <th>Taxable Amount</th>
                  <th>CGST (9%)</th>
                  <th>SGST (9%)</th>
                  <th>IGST (18%)</th>
                  <th>Total Invoice Amount</th>
                  <th style={{ textAlign: "right" }}>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.filter(t => t.status === "Success").map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700, color: "#fff", fontFamily: "monospace" }}>INV-2026-{t.id.split("-")[1]}</td>
                    <td>
                      <div style={{ fontWeight: 800, color: "#fff" }}>{t.school}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>GSTIN: 07AAAAD2026A1Z0</div>
                    </td>
                    <td style={{ fontFamily: "monospace" }}>SAC-998413</td>
                    <td style={{ fontWeight: 600 }}>{formatINR(t.amount)}</td>
                    <td style={{ color: "var(--text-muted)" }}>{formatINR(t.gst / 2)}</td>
                    <td style={{ color: "var(--text-muted)" }}>{formatINR(t.gst / 2)}</td>
                    <td style={{ color: "var(--text-muted)" }}>—</td>
                    <td style={{ fontWeight: 900, color: "#34d399" }}>{formatINR(t.total)}</td>
                    <td style={{ textAlign: "right" }}>
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
      )}

      {/* ════════════ TAB 3: REFUND MANAGEMENT ════════════ */}
      {activeTab === "refunds" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "1.25rem" }}>Process Transaction Refunds</h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>School Tenant</th>
                  <th>Paid Amount</th>
                  <th>Payment Date</th>
                  <th>Gateway Ref</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Refund Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700, color: "var(--primary)", fontFamily: "monospace" }}>{t.id}</td>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{t.school}</td>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{formatINR(t.total)}</td>
                    <td style={{ color: "var(--text-muted)" }}>{t.date}</td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>{t.refId}</td>
                    <td>
                      <span className={`badge ${
                        t.status === "Success" ? "badge-success" : t.status === "Refunded" ? "badge-warning" : "badge-danger"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {t.status === "Success" ? (
                        <button onClick={() => setSelectedTxnForRefund(t)} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem", color: "#f87171", borderColor: "rgba(239, 68, 68, 0.3)" }}>
                          <Undo size={14} /> Process Refund
                        </button>
                      ) : (
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: GATEWAY LIVE LOGS ════════════ */}
      {activeTab === "gateway" && (
        <div className="glass-card" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>Razorpay Webhook events & API Dispatch Logs</h3>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.6rem", borderRadius: "99px", background: "rgba(16,185,129,0.15)", color: "var(--success)", fontSize: "0.72rem", fontWeight: 800 }}>
              Webhook Endpoint Connected
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {[
              { event: "payment.captured", desc: "SaaS Payment captured for STU ID count renewal (Delhi Public School)", ref: "pay_Op982Fas810x", status: "200 OK", time: "29 July 2026, 01:15:32 AM" },
              { event: "payment.failed", desc: "Insufficient balance at customer bank auth gateway (DAV Public School)", ref: "pay_Op551Fas810x", status: "200 OK", time: "28 July 2026, 11:42:15 PM" },
              { event: "order.created", desc: "Subscription billing invoice scheduled order created", ref: "order_Ksp901Aps", status: "200 OK", time: "28 July 2026, 09:00:00 AM" }
            ].map((lg, idx) => (
              <div key={idx} style={{
                padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontWeight: 800, color: "var(--primary)", fontFamily: "monospace", fontSize: "0.85rem" }}>{lg.event}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace" }}>Ref: {lg.ref}</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#fff", marginTop: 4 }}>{lg.desc}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: 4 }}>{lg.time}</div>
                </div>
                <span className="badge badge-success">{lg.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REFUND MODAL */}
      {selectedTxnForRefund && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Initiate Payment Refund</h3>
              <button onClick={() => setSelectedTxnForRefund(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleRefundSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TRANSACTION ID</label>
                <input type="text" value={selectedTxnForRefund.id} disabled style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>REFUND AMOUNT</label>
                <input type="text" value={formatINR(selectedTxnForRefund.total)} disabled style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>REASON FOR REFUND</label>
                <input 
                  type="text" 
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="e.g. Double charging / Client requested plan downgrade"
                  required
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              {refundStatusMessage && (
                <div style={{ color: "var(--success)", fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Check size={16} /> {refundStatusMessage}
                </div>
              )}

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setSelectedTxnForRefund(null)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Process Refund</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
