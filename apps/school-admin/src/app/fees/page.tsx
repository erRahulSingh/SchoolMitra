"use client";

import React, { useState } from "react";
import {
  CreditCard, Plus, X, Download, Search, Filter,
  IndianRupee, CheckCircle2, AlertCircle, Clock, Eye,
  FileText, Printer, Send, BarChart3, Wallet, Receipt,
  Banknote, ShieldCheck, RefreshCw, AlertOctagon, Settings
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockData";

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "structure" | "assignment" | "collection" | "verification" | "discounts" | "fines" | "refunds" | "dues" | "reports">("dashboard");

  // ── Finance Dashboard (Module 1) ──
  const [stats, setStats] = useState({
    todayCollection: 48500,
    monthlyCollection: 1245000,
    pendingFees: 382000,
    overdueFees: 124000,
    collectionPercentage: "77%"
  });

  const [transactions, setTransactions] = useState([
    { id: "TXN-99101", studentName: "Aarav Sharma", class: "10-A", amount: 11300, mode: "Online (UPI)", time: "Today, 10:15 AM", status: "Paid" },
    { id: "TXN-99102", studentName: "Kabir Singh", class: "8-A", amount: 9300, mode: "Cash", time: "Today, 09:30 AM", status: "Paid" },
    { id: "TXN-99103", studentName: "Neha Sharma", class: "9-B", amount: 11300, mode: "Credit Card", time: "Yesterday, 04:15 PM", status: "Paid" }
  ]);

  // ── Fee Structure & Categories (Modules 2 & 3) ──
  const [feeSlabs, setFeeSlabs] = useState([
    { id: "SLAB-01", name: "Secondary tuition Slab", category: "Tuition", amount: 6500, frequency: "Monthly" },
    { id: "SLAB-02", name: "Hostel Fee Quarter", category: "Hostel", amount: 18000, frequency: "Quarterly" },
    { id: "SLAB-03", name: "Annual Development fee", category: "Miscellaneous", amount: 12000, frequency: "Yearly" }
  ]);
  const [isAddSlabOpen, setIsAddSlabOpen] = useState(false);
  const [newSlab, setNewSlab] = useState({ name: "", category: "Tuition", amount: "5000", frequency: "Monthly" });

  // ── Student Fee Assignment (Module 4) ──
  const [assignedFees, setAssignedFees] = useState([
    { id: "ASG-01", studentName: "Aarav Sharma", rollNo: "10-A-01", slabName: "Secondary tuition Slab", totalExpected: 6500 },
    { id: "ASG-02", studentName: "Ananya Patel", rollNo: "10-A-02", slabName: "Secondary tuition Slab", totalExpected: 6500 }
  ]);
  const [newAssign, setNewAssign] = useState({ studentName: "Aarav Sharma", slabName: "Secondary tuition Slab", totalExpected: 6500 });
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  // ── Fee Collection Counter (Module 5) ──
  const [selectedStudentId, setSelectedStudentId] = useState("STU-1001");
  const [collectAmount, setCollectAmount] = useState(11300);
  const [collectMode, setCollectMode] = useState("UPI");

  // ── Payment Verification (Module 6) ──
  const [verificationLogs, setVerificationLogs] = useState([
    { id: "TXN-99101", studentName: "Aarav Sharma", amount: 11300, gateway: "Razorpay UPI", status: "Paid", refId: "pay_xyz123" },
    { id: "TXN-99104", studentName: "Dev Malhotra", amount: 11300, gateway: "Razorpay Card", status: "Failed", refId: "pay_failed_456" },
    { id: "TXN-99105", studentName: "Rohan Verma", amount: 9300, gateway: "Net Banking", status: "Pending", refId: "pay_pending_789" }
  ]);

  // ── Discounts & Scholarships (Module 8) ──
  const [scholarships, setScholarships] = useState([
    { id: "DSC-01", name: "Aarav Sharma", type: "Sibling Discount", percentage: "15%", status: "Active" },
    { id: "DSC-02", name: "Ananya Patel", type: "Merit Scholarship", percentage: "50%", status: "Active" }
  ]);

  // ── Fine Management (Module 9) ──
  const [fines, setFines] = useState([
    { id: "FIN-01", name: "Rohan Verma", type: "Late tuition Fee Payment", amount: 500, date: "25 Jul 2026", status: "Unpaid" },
    { id: "FIN-02", name: "Dev Malhotra", type: "Library Book Overdue", amount: 120, date: "22 Jul 2026", status: "Waived" }
  ]);

  // ── Refund Management (Module 10) ──
  const [refunds, setRefunds] = useState([
    { id: "REF-01", name: "Priya Singh", amount: 4500, type: "Excess Tuition Paid", date: "28 Jul 2026", status: "Refunded" }
  ]);

  const handleCollectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stInfo = MOCK_STUDENTS.find(s => s.id === selectedStudentId);
    if (!stInfo) return;

    const newTxn = {
      id: `TXN-${99000 + transactions.length + 1}`,
      studentName: stInfo.name,
      class: `${stInfo.class}-${stInfo.section}`,
      amount: collectAmount,
      mode: collectMode,
      time: "Just Now",
      status: "Paid"
    };

    setTransactions([newTxn, ...transactions]);
    
    // Add to verification logs
    setVerificationLogs([
      {
        id: newTxn.id,
        studentName: newTxn.studentName,
        amount: newTxn.amount,
        gateway: `Manual (${collectMode})`,
        status: "Paid",
        refId: `pay_manual_${Date.now()}`
      },
      ...verificationLogs
    ]);

    setStats(prev => ({
      ...prev,
      todayCollection: prev.todayCollection + collectAmount,
      monthlyCollection: prev.monthlyCollection + collectAmount
    }));

    alert(`Fee payment of ₹${collectAmount.toLocaleString("en-IN")} successfully processed! Receipt spooled.`);
  };

  const handleWaiveFine = (id: string) => {
    setFines(fines.map(f => f.id === id ? { ...f, status: "Waived" } : f));
    alert("Fine waived successfully!");
  };

  const handleAddSlabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlab.name) return;
    setFeeSlabs([...feeSlabs, {
      id: `SLAB-${String(feeSlabs.length + 1).padStart(2, "0")}`,
      name: newSlab.name,
      category: newSlab.category,
      amount: Number(newSlab.amount),
      frequency: newSlab.frequency
    }]);
    setIsAddSlabOpen(false);
    setNewSlab({ name: "", category: "Tuition", amount: "5000", frequency: "Monthly" });
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignedFees([...assignedFees, {
      id: `ASG-${Date.now()}`,
      studentName: newAssign.studentName,
      rollNo: "10-A-03",
      slabName: newAssign.slabName,
      totalExpected: newAssign.totalExpected
    }]);
    setIsAssignOpen(false);
    alert("Fee structure assigned successfully!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Fees &amp; Finance Engine <IndianRupee size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Real-time accounts desk to configure class fee structures, process cash/online payments, audit refunds, and manage scholarship programs.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "structure") setIsAddSlabOpen(true);
            else if (activeTab === "assignment") setIsAssignOpen(true);
            else alert("Generating daily audit ledger...");
          }}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <Plus size={18} />
          <span>Quick Accounts Item</span>
        </button>
      </div>

      {/* ════════════ 10 TABS SWITCHER CONSOLE ════════════ */}
      <div className="glass-card" style={{ 
        padding: "0.6rem", 
        display: "flex", 
        gap: "0.5rem", 
        overflowX: "auto", 
        whiteSpace: "nowrap",
        border: "1px solid var(--border-color)",
        background: "var(--bg-card)",
        borderRadius: "var(--radius-md)"
      }}>
        {[
          { id: "dashboard", label: "Finance Dashboard", icon: BarChart3 },
          { id: "structure", label: "Fee Structures", icon: FileText },
          { id: "assignment", label: "Slab Assignment", icon: Settings },
          { id: "collection", label: "Collection Counter", icon: Banknote },
          { id: "verification", label: "Payment Verification", icon: Wallet },
          { id: "discounts", label: "Waivers & Scholarships", icon: Receipt },
          { id: "fines", label: "Fine Management", icon: AlertCircle },
          { id: "refunds", label: "Refund Audits", icon: AlertOctagon },
          { id: "dues", label: "Dues & Defaulters", icon: Clock },
          { id: "reports", label: "Export Ledgers", icon: Download }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{ 
                padding: "0.6rem 1rem", 
                fontSize: "0.82rem", 
                gap: "0.45rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: isActive ? 700 : 500
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB VIEWS ════════════ */}

      {/* MODULE 1: FINANCE DASHBOARD */}
      {activeTab === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Stats Widgets */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            {[
              { label: "TODAY'S COLLECTION", val: `₹${stats.todayCollection.toLocaleString("en-IN")}`, color: "var(--success)" },
              { label: "MONTHLY TOTALS", val: `₹${stats.monthlyCollection.toLocaleString("en-IN")}`, color: "#fff" },
              { label: "PENDING ACCRUALS", val: `₹${stats.pendingFees.toLocaleString("en-IN")}`, color: "#f59e0b" },
              { label: "OVERDUE DEFAULTS", val: `₹${stats.overdueFees.toLocaleString("en-IN")}`, color: "#ef4444" },
              { label: "COLLECTION RATE", val: stats.collectionPercentage, color: "var(--success)" }
            ].map((card, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{card.label}</div>
                <div style={{ fontSize: "1.35rem", fontWeight: 850, color: card.color, marginTop: 4 }}>{card.val}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* Recent Transaction Log */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1rem" }}>Recent Transaction logs</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {transactions.map((txn) => (
                  <div key={txn.id} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8, display: "flex", justify: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff" }}>{txn.studentName} ({txn.class})</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{txn.mode} &bull; {txn.time}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 800, color: "var(--success)" }}>+ ₹{txn.amount.toLocaleString("en-IN")}</div>
                      <span className="badge badge-success" style={{ fontSize: "0.65rem", marginTop: 4 }}>{txn.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method distribution */}
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1.25rem" }}>Payment Mode Breakdown</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { name: "UPI / Net Banking", share: 55 },
                  { name: "Credit / Debit Cards", share: 25 },
                  { name: "Direct Cash Deposits", share: 20 }
                ].map((mode, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div style={{ display: "flex", justify: "space-between", fontSize: "0.85rem" }}>
                      <span>{mode.name}</span>
                      <span style={{ fontWeight: 700, color: "var(--primary)" }}>{mode.share}%</span>
                    </div>
                    <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: `${mode.share}%`, height: "100%", background: "var(--primary)", borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULES 2 & 3: FEE STRUCTURE & CATEGORIES */}
      {activeTab === "structure" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Class Fee Slabs Configuration</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Slab ID</th>
                <th>Slab Description Name</th>
                <th>Fee Category</th>
                <th>Slab Amount</th>
                <th>Billing Period</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feeSlabs.map((slab) => (
                <tr key={slab.id}>
                  <td style={{ fontWeight: 700 }}>{slab.id}</td>
                  <td style={{ color: "#fff", fontWeight: 700 }}>{slab.name}</td>
                  <td><span className="badge badge-info">{slab.category}</span></td>
                  <td style={{ fontWeight: 700, color: "var(--success)" }}>₹ {slab.amount.toLocaleString("en-IN")}</td>
                  <td>{slab.frequency}</td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => setFeeSlabs(feeSlabs.filter(s => s.id !== slab.id))}
                      style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "0.35rem 0.5rem", borderRadius: "var(--radius-sm)", cursor: "pointer" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 4: STUDENT FEE ASSIGNMENT */}
      {activeTab === "assignment" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Fee Slabs Mapped to Students</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Roll Number</th>
                <th>Assigned Fee Slab</th>
                <th>Term Total Expected</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assignedFees.map((asg) => (
                <tr key={asg.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{asg.studentName}</td>
                  <td>{asg.rollNo}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{asg.slabName}</td>
                  <td style={{ fontWeight: 700 }}>₹ {asg.totalExpected.toLocaleString("en-IN")}</td>
                  <td><span className="badge badge-success">ACTIVE MAPPING ✅</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 5: FEE COLLECTION COUNTER */}
      {activeTab === "collection" && (
        <div className="glass-card" style={{ padding: "1.75rem", maxWidth: 540, margin: "0 auto", width: "100%" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginBottom: "1.25rem", textAlign: "center" }}>Counter Fee Collection Terminal</h3>
          
          <form onSubmit={handleCollectSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SELECT TARGET STUDENT</label>
              <select 
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
              >
                {MOCK_STUDENTS.map(s => <option key={s.id} value={s.id} style={{ background: "#0b0f19" }}>{s.name} ({s.id}) &bull; Class {s.class}</option>)}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>PAYMENT MODE</label>
                <select 
                  value={collectMode}
                  onChange={(e) => setCollectMode(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                >
                  <option value="Cash">Cash Deposit</option>
                  <option value="UPI">UPI Payment</option>
                  <option value="Credit Card">Credit / Debit Card</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>COLLECT AMOUNT (INR)</label>
                <input 
                  type="number"
                  value={collectAmount}
                  onChange={(e) => setCollectAmount(Number(e.target.value))}
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "0.5rem" }}>
              Confirm Payment &amp; Print Receipt
            </button>
          </form>
        </div>
      )}

      {/* MODULE 6: PAYMENT VERIFICATION */}
      {activeTab === "verification" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Online Gateway Verification log</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Student</th>
                <th>Amount Paid</th>
                <th>Merchant Gateway</th>
                <th>Gateway Reference</th>
                <th>Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {verificationLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontWeight: 700 }}>{log.id}</td>
                  <td style={{ color: "#fff", fontWeight: 700 }}>{log.studentName}</td>
                  <td style={{ fontWeight: 650 }}>₹ {log.amount.toLocaleString("en-IN")}</td>
                  <td>{log.gateway}</td>
                  <td><code style={{ fontSize: "0.78rem" }}>{log.refId}</code></td>
                  <td>
                    <span className={`badge ${
                      log.status === "Paid" ? "badge-success" : log.status === "Failed" ? "badge-danger" : "badge-warning"
                    }`}>
                      {log.status === "Paid" ? "VERIFIED ✅" : log.status === "Failed" ? "FAILED ❌" : "PENDING ⏳"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 8: WAIVERS & SCHOLARSHIPS */}
      {activeTab === "discounts" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Active Scholarship Programs & Sibling Waivers</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Discount Waiver Category</th>
                <th>Waiver Rate (%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{s.name}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{s.type}</td>
                  <td style={{ fontWeight: 700 }}>{s.percentage} Deduction</td>
                  <td><span className="badge badge-success">{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 9: FINE MANAGEMENT */}
      {activeTab === "fines" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Late Fees &amp; Library Overdue Fines</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Fine Description</th>
                <th>Fine Amount</th>
                <th>Fine Logged Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fines.map((f) => (
                <tr key={f.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{f.name}</td>
                  <td>{f.type}</td>
                  <td style={{ fontWeight: 700, color: "#ef4444" }}>₹ {f.amount}</td>
                  <td>{f.date}</td>
                  <td>
                    <span className={`badge ${f.status === "Waived" ? "badge-secondary" : "badge-danger"}`}>
                      {f.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {f.status === "Unpaid" ? (
                      <button 
                        onClick={() => handleWaiveFine(f.id)}
                        className="btn btn-secondary" 
                        style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}
                      >
                        Waive Fine
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>No Actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 10: REFUND AUDIT TRAILS */}
      {activeTab === "refunds" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Scholastic Refund audits</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Refund Code</th>
                <th>Student Name</th>
                <th>Refunded Amount</th>
                <th>Refund Category</th>
                <th>Transaction Date</th>
                <th>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((ref) => (
                <tr key={ref.id}>
                  <td style={{ fontWeight: 700 }}>{ref.id}</td>
                  <td style={{ color: "#fff", fontWeight: 700 }}>{ref.name}</td>
                  <td style={{ fontWeight: 700, color: "var(--success)" }}>₹ {ref.amount.toLocaleString("en-IN")}</td>
                  <td>{ref.type}</td>
                  <td>{ref.date}</td>
                  <td><span className="badge badge-success">COMPLETED AUDIT TRAIL ✅</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 11: DUES & DEFAULTERS */}
      {activeTab === "dues" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Class-wise Outstanding Defaulters Checklist</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class &amp; Section</th>
                <th>Pending tuition fee</th>
                <th>Outstanding transport</th>
                <th>GST invoice dues</th>
                <th>Emergency Alerts</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STUDENTS.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{s.name}</td>
                  <td>Class {s.class}-{s.section}</td>
                  <td style={{ fontWeight: 700, color: "#f59e0b" }}>₹ 6,500</td>
                  <td>₹ 2,000</td>
                  <td style={{ fontWeight: 700, color: "#ef4444" }}>₹ 8,500</td>
                  <td>
                    <button 
                      onClick={() => alert(`Outstanding due reminder successfully broadcast to parent of ${s.name}`)}
                      className="btn btn-secondary" 
                      style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", background: "rgba(244, 63, 94, 0.12)", border: "1px solid rgba(244, 63, 94, 0.25)", color: "#f43f5e" }}
                    >
                      Remind Parent SMS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 12: EXPORT LEDGERS */}
      {activeTab === "reports" && (
        <div className="glass-card" style={{ padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Financial Export Center</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Compile and download standard institutional accounts ledgers for audit audits.</p>
          
          <div style={{ display: "flex", justify: "center", gap: "1rem" }}>
            <button onClick={() => alert("Downloading Daily Collections PDF...")} className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", gap: "0.5rem" }}>
              <Download size={16} /> Download Daily Collection Report (PDF)
            </button>
            <button onClick={() => alert("Downloading Monthly ledger spreadsheet...")} className="btn btn-secondary" style={{ padding: "0.75rem 1.5rem", gap: "0.5rem" }}>
              <Download size={16} /> Export Financial Ledger (Excel)
            </button>
          </div>
        </div>
      )}

      {/* ════════════ QUICK ADD SLAB MODAL ════════════ */}
      {isAddSlabOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 400 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add Fee Slab</h3>
              <button onClick={() => setIsAddSlabOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSlabSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SLAB NAME</label>
                <input type="text" value={newSlab.name} onChange={(e) => setNewSlab({ ...newSlab, name: e.target.value })} placeholder="e.g. Class 10 Tuition Slab" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>AMOUNT (INR)</label>
                  <input type="number" value={newSlab.amount} onChange={(e) => setNewSlab({ ...newSlab, amount: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>FREQUENCY</label>
                  <select value={newSlab.frequency} onChange={(e) => setNewSlab({ ...newSlab, frequency: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Create Slab</button>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ QUICK ASSIGN MODAL ════════════ */}
      {isAssignOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 400 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Assign Fee Slab</h3>
              <button onClick={() => setIsAssignOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAssignSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SELECT STUDENT</label>
                <select value={newAssign.studentName} onChange={(e) => setNewAssign({ ...newAssign, studentName: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                  {MOCK_STUDENTS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SELECT SLAB</label>
                <select value={newAssign.slabName} onChange={(e) => setNewAssign({ ...newAssign, slabName: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                  {feeSlabs.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Map Structure</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
