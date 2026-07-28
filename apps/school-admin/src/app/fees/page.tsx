"use client";

import React, { useState } from "react";
import {
  CreditCard, Plus, X, Download, Search, Filter,
  IndianRupee, CheckCircle2, AlertCircle, Clock, Eye,
  FileText, Printer, Send, BarChart3, Wallet, Receipt,
  Banknote, ShieldCheck
} from "lucide-react";

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState<"structure" | "collection" | "dues" | "receipts" | "online">("structure");

  // ── Fee Structure ──
  const [feeStructure] = useState([
    { id: "FS-01", class: "Class 1–5", tuition: 4500, transport: 2000, lab: 0, sports: 500, library: 300, misc: 200, total: 7500, frequency: "Monthly" },
    { id: "FS-02", class: "Class 6–8", tuition: 5500, transport: 2000, lab: 800, sports: 500, library: 300, misc: 200, total: 9300, frequency: "Monthly" },
    { id: "FS-03", class: "Class 9–10", tuition: 6500, transport: 2500, lab: 1200, sports: 500, library: 300, misc: 300, total: 11300, frequency: "Monthly" },
    { id: "FS-04", class: "Class 11–12 (Sci)", tuition: 7500, transport: 2500, lab: 1800, sports: 500, library: 300, misc: 300, total: 12900, frequency: "Monthly" },
  ]);

  // ── Fee Collection ──
  const [searchFee, setSearchFee] = useState("");
  const [feeRecords, setFeeRecords] = useState([
    { id: "FEE-2601", stuId: "STU-1001", name: "Aarav Sharma", class: "10-A", amount: 11300, month: "July 2026", paidDate: "15 Jul 2026", mode: "Online (UPI)", status: "Paid" },
    { id: "FEE-2602", stuId: "STU-1002", name: "Ananya Patel", class: "10-A", amount: 11300, month: "July 2026", paidDate: "—", mode: "—", status: "Pending" },
    { id: "FEE-2603", stuId: "STU-1003", name: "Rohan Verma", class: "9-B", amount: 11300, month: "July 2026", paidDate: "—", mode: "—", status: "Overdue" },
    { id: "FEE-2604", stuId: "STU-1004", name: "Diya Gupta", class: "12-C", amount: 12900, month: "July 2026", paidDate: "10 Jul 2026", mode: "Bank Transfer", status: "Paid" },
    { id: "FEE-2605", stuId: "STU-1005", name: "Kabir Singh", class: "8-A", amount: 9300, month: "July 2026", paidDate: "18 Jul 2026", mode: "Cash", status: "Paid" },
    { id: "FEE-2606", stuId: "STU-1006", name: "Priya Singh", class: "10-A", amount: 11300, month: "July 2026", paidDate: "—", mode: "—", status: "Pending" },
    { id: "FEE-2607", stuId: "STU-1007", name: "Dev Malhotra", class: "10-A", amount: 11300, month: "June 2026", paidDate: "—", mode: "—", status: "Overdue" },
    { id: "FEE-2608", stuId: "STU-1008", name: "Kavya Nair", class: "9-A", amount: 11300, month: "July 2026", paidDate: "12 Jul 2026", mode: "Online (Card)", status: "Paid" },
  ]);

  const handleMarkPaid = (id: string) => {
    setFeeRecords(prev => prev.map(r => r.id === id ? { ...r, status: "Paid", paidDate: "29 Jul 2026", mode: "Cash (Manual)" } : r));
  };

  // ── Receipts ──
  const paidRecords = feeRecords.filter(r => r.status === "Paid");

  // ── Online Payment Summary ──
  const onlinePayments = feeRecords.filter(r => r.mode.includes("Online") || r.mode.includes("Bank") || r.mode.includes("Card"));

  const filteredFees = feeRecords.filter(r =>
    r.name.toLowerCase().includes(searchFee.toLowerCase()) ||
    r.stuId.toLowerCase().includes(searchFee.toLowerCase()) ||
    r.id.toLowerCase().includes(searchFee.toLowerCase())
  );

  const totalCollected = feeRecords.filter(r => r.status === "Paid").reduce((sum, r) => sum + r.amount, 0);
  const totalPending = feeRecords.filter(r => r.status === "Pending").reduce((sum, r) => sum + r.amount, 0);
  const totalOverdue = feeRecords.filter(r => r.status === "Overdue").reduce((sum, r) => sum + r.amount, 0);

  const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* PAGE HEADER */}
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)",
        border: "1px solid var(--border-glow)", borderRadius: "var(--radius-lg)", padding: "1.5rem 1.75rem",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Fee Management & Collections Engine <CreditCard size={24} color="#10b981" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>Fee structure configuration, collections tracking, due list management, receipts, and online payments.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
          <Download size={16} /> Export Fee Report
        </button>
      </div>

      {/* 5 TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {[
          { id: "structure", label: "Fee Structure", icon: FileText },
          { id: "collection", label: "Fee Collection", icon: Banknote },
          { id: "dues", label: "Due List", icon: AlertCircle },
          { id: "receipts", label: "Receipts", icon: Receipt },
          { id: "online", label: "Online Payments", icon: Wallet },
        ].map((tab) => {
          const Icon = tab.icon;
          return (<button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`btn ${activeTab === tab.id ? "btn-primary" : "btn-secondary"}`}><Icon size={16} /> {tab.label}</button>);
        })}
      </div>

      {/* ═══ TAB 1: FEE STRUCTURE ═══ */}
      {activeTab === "structure" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Fee Structure — Academic Session 2026-27</h3>
            <button className="btn btn-primary" style={{ padding: "0.6rem 1rem" }}><Plus size={16} /> Add Fee Slab</button>
          </div>
          <div className="table-container">
            <table className="custom-table">
              <thead><tr><th>Class Range</th><th style={{ textAlign: "right" }}>Tuition</th><th style={{ textAlign: "right" }}>Transport</th><th style={{ textAlign: "right" }}>Lab</th><th style={{ textAlign: "right" }}>Sports</th><th style={{ textAlign: "right" }}>Library</th><th style={{ textAlign: "right" }}>Misc</th><th style={{ textAlign: "right" }}>Total / Month</th><th>Billing</th></tr></thead>
              <tbody>
                {feeStructure.map((fs) => (
                  <tr key={fs.id}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{fs.class}</td>
                    <td style={{ textAlign: "right", fontWeight: 600 }}>{formatINR(fs.tuition)}</td>
                    <td style={{ textAlign: "right" }}>{formatINR(fs.transport)}</td>
                    <td style={{ textAlign: "right" }}>{fs.lab > 0 ? formatINR(fs.lab) : "—"}</td>
                    <td style={{ textAlign: "right" }}>{formatINR(fs.sports)}</td>
                    <td style={{ textAlign: "right" }}>{formatINR(fs.library)}</td>
                    <td style={{ textAlign: "right" }}>{formatINR(fs.misc)}</td>
                    <td style={{ textAlign: "right", fontWeight: 900, color: "var(--primary)", fontSize: "1rem" }}>{formatINR(fs.total)}</td>
                    <td><span className="badge badge-info">{fs.frequency}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══ TAB 2: FEE COLLECTION ═══ */}
      {activeTab === "collection" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Total Collected", value: formatINR(totalCollected), color: "#10b981", icon: CheckCircle2 },
              { label: "Pending", value: formatINR(totalPending), color: "#f59e0b", icon: Clock },
              { label: "Overdue", value: formatINR(totalOverdue), color: "#ef4444", icon: AlertCircle },
              { label: "Collection Rate", value: `${feeRecords.length > 0 ? Math.round(feeRecords.filter(r => r.status === "Paid").length / feeRecords.length * 100) : 0}%`, color: "#6366f1", icon: BarChart3 }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: `${stat.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={22} color={stat.color} /></div>
                  <div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 900, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Search */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 500 }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input type="text" value={searchFee} onChange={(e) => setSearchFee(e.target.value)} placeholder="Search by student name, STU-ID, FEE-ID..."
                style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} />
            </div>
            <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 600 }}>{filteredFees.length} Records</span>
          </div>

          {/* Collection Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div className="table-container">
              <table className="custom-table">
                <thead><tr><th>FEE ID</th><th>Student</th><th>Class</th><th style={{ textAlign: "right" }}>Amount</th><th>Month</th><th>Paid Date</th><th>Mode</th><th>Status</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
                <tbody>
                  {filteredFees.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{r.id}</td>
                      <td><div style={{ fontWeight: 700, color: "#fff" }}>{r.name}</div><div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{r.stuId}</div></td>
                      <td><span className="badge badge-info">{r.class}</span></td>
                      <td style={{ textAlign: "right", fontWeight: 800, color: "#fff" }}>{formatINR(r.amount)}</td>
                      <td style={{ color: "var(--text-muted)" }}>{r.month}</td>
                      <td style={{ color: r.paidDate === "—" ? "var(--text-muted)" : "var(--success)" }}>{r.paidDate}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{r.mode}</td>
                      <td><span className={`badge ${r.status === "Paid" ? "badge-success" : r.status === "Pending" ? "badge-warning" : "badge-danger"}`}>{r.status}</span></td>
                      <td style={{ textAlign: "right" }}>
                        {r.status !== "Paid" ? (
                          <button onClick={() => handleMarkPaid(r.id)} className="btn btn-primary" style={{ padding: "0.35rem 0.7rem", fontSize: "0.72rem" }}>Mark Paid</button>
                        ) : (
                          <button className="btn btn-secondary" style={{ padding: "0.35rem 0.7rem", fontSize: "0.72rem" }}><Printer size={12} /> Receipt</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 3: DUE LIST ═══ */}
      {activeTab === "dues" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div className="glass-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(245,158,11,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}><Clock size={22} color="#f59e0b" /></div>
              <div>
                <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#f59e0b" }}>{feeRecords.filter(r => r.status === "Pending").length} Students</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Payment Pending (Current Month)</div>
              </div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(239,68,68,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}><AlertCircle size={22} color="#ef4444" /></div>
              <div>
                <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#ef4444" }}>{feeRecords.filter(r => r.status === "Overdue").length} Students</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>Overdue (Past Due Date)</div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Students with Outstanding Dues</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead><tr><th>Student</th><th>Class</th><th>Month</th><th style={{ textAlign: "right" }}>Amount Due</th><th>Status</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
                <tbody>
                  {feeRecords.filter(r => r.status !== "Paid").map((r) => (
                    <tr key={r.id}>
                      <td><div style={{ fontWeight: 700, color: "#fff" }}>{r.name}</div><div style={{ fontSize: "0.72rem", color: "var(--primary)" }}>{r.stuId}</div></td>
                      <td><span className="badge badge-info">{r.class}</span></td>
                      <td style={{ color: "var(--text-muted)" }}>{r.month}</td>
                      <td style={{ textAlign: "right", fontWeight: 900, color: r.status === "Overdue" ? "#ef4444" : "#f59e0b" }}>{formatINR(r.amount)}</td>
                      <td><span className={`badge ${r.status === "Pending" ? "badge-warning" : "badge-danger"}`}>{r.status}</span></td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                          <button onClick={() => handleMarkPaid(r.id)} className="btn btn-primary" style={{ padding: "0.35rem 0.7rem", fontSize: "0.72rem" }}>Mark Paid</button>
                          <button className="btn btn-secondary" style={{ padding: "0.35rem 0.7rem", fontSize: "0.72rem" }}><Send size={12} /> Send Reminder</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 4: RECEIPTS ═══ */}
      {activeTab === "receipts" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
          {paidRecords.map((r) => (
            <div key={r.id} className="glass-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#fff" }}>{r.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600 }}>{r.stuId} • Class {r.class}</div>
                </div>
                <span className="badge badge-success">PAID ✅</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Receipt No</div>
                  <div style={{ fontWeight: 800, color: "var(--primary)", fontFamily: "monospace" }}>{r.id}</div>
                </div>
                <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Amount</div>
                  <div style={{ fontWeight: 900, color: "#10b981" }}>{formatINR(r.amount)}</div>
                </div>
                <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Paid Date</div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{r.paidDate}</div>
                </div>
                <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Payment Mode</div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{r.mode}</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "0.6rem", borderTop: "1px solid var(--border-color)" }}>
                <button className="btn btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}><Printer size={14} /> Print Receipt</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ TAB 5: ONLINE PAYMENTS ═══ */}
      {activeTab === "online" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Gateway Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Online Payments Received", value: onlinePayments.length, color: "#10b981" },
              { label: "Total Online Amount", value: formatINR(onlinePayments.reduce((s, r) => s + r.amount, 0)), color: "#6366f1" },
              { label: "Payment Gateway", value: "Razorpay", color: "#38bdf8" }
            ].map((st, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: st.color }}>{st.value}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, marginTop: 2 }}>{st.label}</div>
              </div>
            ))}
          </div>

          {/* Gateway Config */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>Payment Gateway Configuration</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>GATEWAY PROVIDER</div>
                <div style={{ fontWeight: 800, color: "#fff", marginTop: 2 }}>Razorpay Business</div>
              </div>
              <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>MERCHANT ID</div>
                <div style={{ fontWeight: 800, color: "var(--primary)", fontFamily: "monospace", marginTop: 2 }}>rzp_live_DPS2026xxxx</div>
              </div>
              <div style={{ padding: "1rem", background: "rgba(16,185,129,0.1)", borderRadius: "var(--radius-md)", border: "1px solid var(--success)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 700 }}>STATUS</div>
                <div style={{ fontWeight: 800, color: "#fff", marginTop: 2 }}>✅ Active & Accepting Payments</div>
              </div>
              <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ACCEPTED METHODS</div>
                <div style={{ fontWeight: 800, color: "#fff", marginTop: 2 }}>UPI, Debit/Credit Card, Net Banking</div>
              </div>
            </div>
          </div>

          {/* Online Transaction Log */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Online Transaction Log</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead><tr><th>Transaction ID</th><th>Student</th><th>Class</th><th style={{ textAlign: "right" }}>Amount</th><th>Payment Mode</th><th>Date</th><th>Gateway Status</th></tr></thead>
                <tbody>
                  {onlinePayments.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{r.id}</td>
                      <td style={{ fontWeight: 700, color: "#fff" }}>{r.name}</td>
                      <td><span className="badge badge-info">{r.class}</span></td>
                      <td style={{ textAlign: "right", fontWeight: 900, color: "var(--success)" }}>{formatINR(r.amount)}</td>
                      <td style={{ color: "var(--text-muted)" }}>{r.mode}</td>
                      <td style={{ color: "var(--text-muted)" }}>{r.paidDate}</td>
                      <td><span className="badge badge-success"><ShieldCheck size={12} style={{ marginRight: 4 }} />Verified</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
