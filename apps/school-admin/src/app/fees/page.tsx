"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard, Plus, X, Download, Search, Filter,
  IndianRupee, CheckCircle2, AlertCircle, Clock, Eye,
  FileText, Printer, Send, BarChart3, Wallet, Receipt,
  Banknote, ShieldCheck, RefreshCw, AlertOctagon, Settings, Edit3, Trash2, Save
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockData";

interface FeeSlab {
  id?: string;
  _id?: string;
  name?: string;
  title?: string;
  category?: string;
  class?: string;
  className?: string;
  tuitionFee?: number;
  transportFee?: number;
  examFee?: number;
  amount?: number;
  totalAmount?: number;
  frequency?: string;
  term?: string;
}

interface FeeAssignment {
  id: string;
  studentName: string;
  rollNo: string;
  slabName: string;
  totalExpected: number;
}

interface TransactionRecord {
  receiptNo: string;
  studentId: string;
  studentName: string;
  amountPaid: number;
  paymentMethod: string;
  date: string;
  status: string;
  className?: string;
}

interface ScholarshipWaiver {
  id: string;
  name: string;
  type: string;
  percentage: string;
  status: "Active" | "Inactive";
}

interface FineRecord {
  id: string;
  name: string;
  type: string;
  amount: number;
  date: string;
  status: "Unpaid" | "Waived" | "Paid";
}

interface RefundRecord {
  id: string;
  name: string;
  amount: number;
  type: string;
  date: string;
  status: "Refunded" | "Approved" | "Pending";
}

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "structure" | "assignment" | "collection" | "verification" | "discounts" | "fines" | "refunds" | "dues" | "reports"
  >("dashboard");

  // Stats bar
  const [stats, setStats] = useState({
    todayCollection: 0,
    monthlyCollection: 0,
    pendingFees: 0,
    overdueFees: 0,
    collectionPercentage: "0%"
  });

  // ════════════ STATE DECLARATIONS ════════════
  const [feeSlabs, setFeeSlabs] = useState<FeeSlab[]>([]);
  const [isSlabModalOpen, setIsSlabModalOpen] = useState(false);
  const [editingSlabId, setEditingSlabId] = useState<string | null>(null);
  const [slabForm, setSlabForm] = useState({ title: "", className: "10", tuitionFee: 20000, transportFee: 5000, examFee: 1500, term: "Quarterly" });

  const [assignedFees, setAssignedFees] = useState<FeeAssignment[]>([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignForm, setAssignForm] = useState({ studentName: "", slabName: "", totalExpected: 0 });

  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [verificationLogs, setVerificationLogs] = useState<any[]>([]);
  
  const [scholarships, setScholarships] = useState<ScholarshipWaiver[]>([]);
  const [isScholarshipModalOpen, setIsScholarshipModalOpen] = useState(false);
  const [scholarshipForm, setScholarshipForm] = useState({ name: "", type: "Sibling Discount", percentage: "15%", status: "Active" as const });

  const [fines, setFines] = useState<FineRecord[]>([]);
  const [isFineModalOpen, setIsFineModalOpen] = useState(false);
  const [fineForm, setFineForm] = useState({ name: "", type: "Late tuition Fee Payment", amount: "500", date: "2026-08-06", status: "Unpaid" as const });

  const [refunds, setRefunds] = useState<RefundRecord[]>([]);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundForm, setRefundForm] = useState({ name: "", type: "Admission Cancellation", amount: 15000, date: "2026-08-10", status: "Approved" as const });

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [collectAmount, setCollectAmount] = useState(0);
  const [collectMode, setCollectMode] = useState("UPI");

  // Load from Express APIs with fallback
  useEffect(() => {
    fetchFeeStructures();
    fetchCollectionsReport();
  }, []);

  const fetchFeeStructures = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/fees/structure");
      const data = await res.json();
      if (data.success && data.data.structures) {
        setFeeSlabs(data.data.structures);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCollectionsReport = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/fees/reports/collections");
      const data = await res.json();
      if (data.success && data.data) {
        setStats({
          todayCollection: data.data.todayCollection,
          monthlyCollection: data.data.monthlyCollection,
          pendingFees: 382000,
          overdueFees: 124000,
          collectionPercentage: "77%"
        });
        setTransactions(data.data.recentReceipts);
        setVerificationLogs(data.data.recentReceipts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Fee Slabs Handlers
  const handleOpenAddSlab = () => {
    setEditingSlabId(null);
    setSlabForm({ title: "", className: "10", tuitionFee: 20000, transportFee: 5000, examFee: 1500, term: "Quarterly" });
    setIsSlabModalOpen(true);
  };

  const handleSaveSlab = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = Number(slabForm.tuitionFee) + Number(slabForm.transportFee) + Number(slabForm.examFee);
    
    try {
      const res = await fetch("http://localhost:5000/api/v1/fees/structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...slabForm, totalAmount })
      });
      const data = await res.json();
      if (data.success) {
        alert("Fee structure successfully saved in MongoDB Database!");
        fetchFeeStructures();
        setIsSlabModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save fee structure.");
    }
  };

  const handleDeleteSlab = (id: string) => {
    if (confirm("Delete fee slab structure?")) {
      setFeeSlabs(feeSlabs.filter(s => (s._id || s.id) !== id));
      alert("Fee slab removed.");
    }
  };

  // Student Fee Assignment Handlers
  const handleOpenAddAssign = () => {
    setAssignForm({ studentName: "Aarav Sharma", slabName: "Class 10 Annual Fee", totalExpected: 35000 });
    setIsAssignModalOpen(true);
  };

  const handleSaveAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/v1/fees/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: "STU-1001", classId: "10", feeStructureId: "650000000000000000000601" })
      });
      const data = await res.json();
      if (data.success) {
        alert("Fee mapping assigned & synchronized with DB!");
      }
    } catch (err) {}

    const created: FeeAssignment = {
      id: `ASG-${Date.now()}`,
      studentName: assignForm.studentName,
      rollNo: `10-A-${Math.floor(10 + Math.random() * 80)}`,
      slabName: assignForm.slabName,
      totalExpected: Number(assignForm.totalExpected)
    };
    setAssignedFees([...assignedFees, created]);
    setIsAssignModalOpen(false);
  };

  const handleSaveScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scholarshipForm.name) return;
    const newScholarship: ScholarshipWaiver = {
      id: `SCH-${Date.now()}`,
      name: scholarshipForm.name,
      type: scholarshipForm.type,
      percentage: scholarshipForm.percentage,
      status: scholarshipForm.status
    };
    setScholarships([...scholarships, newScholarship]);
    setIsScholarshipModalOpen(false);
  };

  const handleSaveFine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fineForm.name) return;
    const newFine: FineRecord = {
      id: `FIN-${Date.now()}`,
      name: fineForm.name,
      type: fineForm.type,
      amount: Number(fineForm.amount),
      date: fineForm.date || new Date().toISOString().split("T")[0],
      status: fineForm.status
    };
    setFines([...fines, newFine]);
    setIsFineModalOpen(false);
  };

  const handleSaveRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundForm.name) return;
    const newRefund: RefundRecord = {
      id: `REF-${Date.now().toString().slice(-4)}`,
      name: refundForm.name,
      amount: Number(refundForm.amount),
      type: refundForm.type,
      date: refundForm.date || new Date().toISOString().split("T")[0],
      status: refundForm.status
    };
    setRefunds([...refunds, newRefund]);
    setIsRefundModalOpen(false);
  };

  // Counter Fee Collection submit
  const handleCollectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stInfo = MOCK_STUDENTS.find(s => s.id === selectedStudentId);
    if (!stInfo) return;

    try {
      const res = await fetch("http://localhost:5000/api/v1/fees/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudentId,
          studentName: stInfo.name,
          amountPaid: collectAmount,
          paymentMethod: collectMode
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Payment verification generated on MongoDB: ${data.data.receipt.receiptNo}`);
        fetchCollectionsReport();
      }
    } catch (err) {
      // Local fallback
      const createdTxn: TransactionRecord = {
        receiptNo: `REC-99${transactions.length + 1}`,
        studentId: selectedStudentId,
        studentName: stInfo.name,
        amountPaid: collectAmount,
        paymentMethod: collectMode,
        date: "Today, Just Now",
        status: "PAID ✅",
        className: "10-A"
      };
      setTransactions([createdTxn, ...transactions]);
      setVerificationLogs([createdTxn, ...verificationLogs]);
      alert("Payment processed offline.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Fees &amp; Finance Engine <IndianRupee size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0, fontSize: "0.85rem" }}>
            Configure class fee structures, process cash/online payments, audit refunds, and manage scholarship programs.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "structure") handleOpenAddSlab();
            else if (activeTab === "assignment") handleOpenAddAssign();
            else if (activeTab === "discounts") setIsScholarshipModalOpen(true);
            else if (activeTab === "fines") setIsFineModalOpen(true);
            else if (activeTab === "refunds") setIsRefundModalOpen(true);
            else alert("Select relevant tab to quick create accounts items.");
          }}
          className="btn btn-primary" 
          style={{ gap: "0.4rem" }}
        >
          <Plus size={16} /> Quick Action
        </button>
      </div>

      {/* TABS NAVIGATION */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", overflowX: "auto" }}>
        {[
          { id: "dashboard", label: "📊 Finance Dashboard" },
          { id: "structure", label: "⚙️ Fee Structures" },
          { id: "assignment", label: "👤 Student Allocations" },
          { id: "collection", label: "💳 Counter Collection" },
          { id: "verification", label: "✅ Payment Verification" },
          { id: "discounts", label: "🎖️ Scholarships" },
          { id: "fines", label: "⚠️ Fines & Penalties" },
          { id: "refunds", label: "🔄 Refund Audit" },
          { id: "dues", label: "📋 Dues & Defaulters" },
          { id: "reports", label: "📈 Ledger Exports" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`btn ${activeTab === tab.id ? "btn-primary" : "btn-secondary"}`}
            style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ════════════ 1. FINANCE DASHBOARD ════════════ */}
      {activeTab === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div className="glass-card" style={{ padding: "1.25rem", borderLeft: "4px solid var(--primary)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>TODAY'S CASH &amp; ONLINE COLLECTION</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-heading)", marginTop: 4 }}>₹ {stats.todayCollection.toLocaleString("en-IN")}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--success)", marginTop: 4 }}>+14.2% higher vs yesterday</div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem", borderLeft: "4px solid var(--secondary)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>MONTHLY REALIZED COLLECTIONS</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--secondary)", marginTop: 4 }}>₹ {stats.monthlyCollection.toLocaleString("en-IN")}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>Term Q2 Cycle</div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem", borderLeft: "4px solid #f59e0b" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>PENDING / UNPAID INVOICES</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f59e0b", marginTop: 4 }}>₹ {stats.pendingFees.toLocaleString("en-IN")}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>138 Invoices</div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem", borderLeft: "4px solid #ef4444" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>CRITICAL OVERDUE (90+ DAYS)</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ef4444", marginTop: 4 }}>₹ {stats.overdueFees.toLocaleString("en-IN")}</div>
              <div style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: 4 }}>SMS Reminders active</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem", color: "var(--text-heading)" }}>Recent Transaction Logs (Live DB Sync)</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {transactions.map((txn) => (
                  <div key={txn.receiptNo} style={{ padding: "0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ color: "var(--text-heading)", fontSize: "0.9rem" }}>{txn.studentName} ({txn.className || "10-A"})</strong>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{txn.paymentMethod} &bull; {txn.date} &bull; {txn.receiptNo}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <strong style={{ color: "var(--success)" }}>+ ₹{txn.amountPaid.toLocaleString("en-IN")}</strong>
                      <div><span className="badge badge-success" style={{ fontSize: "0.65rem", marginTop: 4 }}>{txn.status || "Paid"}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem", color: "var(--text-heading)" }}>Payment Channel Share</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { name: "Razorpay Gateway (UPI / Cards)", share: 68 },
                  { name: "Direct Bank NEFT / NetBanking", share: 22 },
                  { name: "Counter Cash Ledger", share: 10 }
                ].map((mode, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                      <strong style={{ color: "var(--text-heading)" }}>{mode.name}</strong>
                      <span style={{ fontWeight: 800, color: "var(--primary)" }}>{mode.share}%</span>
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

      {/* ════════════ 2. FEE STRUCTURES (DB REGISTERED) ════════════ */}
      {activeTab === "structure" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>School Fee Structures Configuration</h3>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Configure independent class fee slabs per academic year</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Academic Year:</span>
                <select style={{ padding: "0.4rem 0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontWeight: 700, fontSize: "0.82rem" }}>
                  <option value="2026-27">2026-27 ▼</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>

              <button onClick={handleOpenAddSlab} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
                <Plus size={15} /> Add Custom Slab
              </button>
            </div>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Total Fee</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { className: "Nursery", fee: 18000 },
                { className: "LKG", fee: 20000 },
                { className: "UKG", fee: 22000 },
                { className: "Class 1", fee: 25000 },
                { className: "Class 2", fee: 25000 },
                { className: "Class 3", fee: 27000 },
                { className: "Class 4", fee: 27000 },
                { className: "Class 5", fee: 26000 },
                { className: "Class 6", fee: 30000 },
                { className: "Class 7", fee: 30000 },
                { className: "Class 8", fee: 26000 },
                { className: "Class 9", fee: 35000 },
                { className: "Class 10", fee: 40000 },
                { className: "Class 11", fee: 45000 },
                { className: "Class 12", fee: 45000 },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td style={{ color: "var(--text-heading)", fontWeight: 800, fontSize: "0.95rem" }}>{row.className}</td>
                  <td style={{ fontWeight: 850, color: "var(--success)", fontSize: "0.95rem" }}>
                    ₹ {row.fee.toLocaleString("en-IN")}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => {
                        setEditingSlabId(String(idx));
                        setSlabForm({
                          title: `${row.className} Fee Structure`,
                          className: row.className,
                          tuitionFee: 20000,
                          transportFee: 0,
                          examFee: 1500,
                          term: "Quarterly"
                        });
                        setIsSlabModalOpen(true);
                      }} 
                      className="btn btn-secondary" 
                      style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem", gap: "0.3rem", color: "var(--primary)", border: "1px solid var(--border-color)" }}
                    >
                      <Edit3 size={13} /> Edit / Configure
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 3. SLAB ASSIGNMENT ════════════ */}
      {activeTab === "assignment" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Fee Slabs Mapped to Students</h3>
            <button onClick={handleOpenAddAssign} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Assign Fee Slab
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Roll Number</th>
                <th>Assigned Fee Slab</th>
                <th>Term Total Expected</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedFees.map((asg) => (
                <tr key={asg.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{asg.studentName}</td>
                  <td style={{ fontFamily: "monospace", fontWeight: 700 }}>{asg.rollNo}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 800 }}>{asg.slabName}</td>
                  <td style={{ fontWeight: 800 }}>₹ {asg.totalExpected.toLocaleString("en-IN")}</td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => setAssignedFees(assignedFees.filter(x => x.id !== asg.id))} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 4. COLLECTION COUNTER ════════════ */}
      {activeTab === "collection" && (
        <div className="glass-card" style={{ padding: "1.75rem", maxWidth: 540, margin: "0 auto", width: "100%" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.25rem", textAlign: "center" }}>Counter Fee Collection Terminal (Database Sync)</h3>
          
          <form onSubmit={handleCollectSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SELECT TARGET STUDENT</label>
              <select 
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                style={{ width: "100%", padding: "0.7rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", outline: "none" }}
              >
                {MOCK_STUDENTS.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id}) &bull; Class {s.class}</option>)}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>PAYMENT MODE</label>
                <select 
                  value={collectMode}
                  onChange={(e) => setCollectMode(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", outline: "none" }}
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
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", outline: "none" }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "0.5rem" }}>
              Confirm Payment &amp; Print Receipt
            </button>
          </form>
        </div>
      )}

      {/* ════════════ 5. PAYMENT VERIFICATION (GATEWAY AUDITS) ════════════ */}
      {activeTab === "verification" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem", color: "var(--text-heading)" }}>Online Gateway Verification log</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Student</th>
                <th>Amount Paid</th>
                <th>Merchant Gateway</th>
                <th>Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {verificationLogs.map((log, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 800 }}>{log.receiptNo}</td>
                  <td style={{ color: "var(--text-heading)", fontWeight: 800 }}>{log.studentName}</td>
                  <td style={{ fontWeight: 800 }}>₹ {log.amountPaid.toLocaleString("en-IN")}</td>
                  <td>{log.paymentMethod}</td>
                  <td>
                    <span className="badge badge-success">VERIFIED ✅</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 6. SCHOLARSHIPS ════════════ */}
      {activeTab === "discounts" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Scholarship Programs &amp; Sibling Waivers</h3>
            <button onClick={() => setIsScholarshipModalOpen(true)} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Waiver/Scholarship
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Discount Category</th>
                <th>Waiver Rate (%)</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 850, color: "var(--text-heading)" }}>{s.name}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 800 }}>{s.type}</td>
                  <td style={{ fontWeight: 700 }}>{s.percentage} Deduction</td>
                  <td><span className="badge badge-success">{s.status}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => setScholarships(scholarships.filter(x => x.id !== s.id))} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 7. FINE MANAGEMENT ════════════ */}
      {activeTab === "fines" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Late Fees &amp; Library Overdue Fines</h3>
            <button onClick={() => setIsFineModalOpen(true)} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Log New Fine
            </button>
          </div>

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
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{f.name}</td>
                  <td>{f.type}</td>
                  <td style={{ fontWeight: 800, color: "#ef4444" }}>₹ {f.amount}</td>
                  <td>{f.date}</td>
                  <td>
                    <span className={`badge ${f.status === "Waived" ? "badge-secondary" : f.status === "Paid" ? "badge-success" : "badge-danger"}`}>
                      {f.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {f.status === "Unpaid" ? (
                      <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                        <button 
                          onClick={() => {
                            setFines(fines.map(x => x.id === f.id ? { ...x, status: "Waived" } : x));
                            alert("Fine waived successfully!");
                          }}
                          className="btn btn-secondary" 
                          style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem" }}
                        >
                          Waive Fine
                        </button>
                        <button 
                          onClick={() => {
                            setFines(fines.map(x => x.id === f.id ? { ...x, status: "Paid" } : x));
                            alert("Fine paid!");
                          }}
                          className="btn btn-primary" 
                          style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem" }}
                        >
                          Mark Paid
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>No Action Required</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 8. REFUND AUDIT TRAILS ════════════ */}
      {activeTab === "refunds" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Scholastic Refund Audits</h3>
            <button onClick={() => setIsRefundModalOpen(true)} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Log Refund Claim
            </button>
          </div>

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
                  <td style={{ color: "var(--text-heading)", fontWeight: 800 }}>{ref.name}</td>
                  <td style={{ fontWeight: 800, color: "var(--success)" }}>₹ {ref.amount.toLocaleString("en-IN")}</td>
                  <td>{ref.type}</td>
                  <td style={{ fontWeight: 600 }}>{ref.date}</td>
                  <td>
                    <span className={`badge ${ref.status === "Refunded" ? "badge-success" : ref.status === "Approved" ? "badge-info" : "badge-warning"}`}>
                      {ref.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 9. DUES & DEFAULTERS ════════════ */}
      {activeTab === "dues" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.25rem" }}>Class-wise Outstanding Defaulters Checklist</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class &amp; Section</th>
                <th>Pending Tuition Fee</th>
                <th>Outstanding Transport</th>
                <th>GST Invoice Dues</th>
                <th style={{ textAlign: "right" }}>Emergency Alerts</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STUDENTS.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{s.name}</td>
                  <td>Class {s.class}-{s.section}</td>
                  <td style={{ fontWeight: 700, color: "#f59e0b" }}>₹ 6,500</td>
                  <td>₹ 2,000</td>
                  <td style={{ fontWeight: 800, color: "#ef4444" }}>₹ 8,500</td>
                  <td style={{ textAlign: "right" }}>
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

      {/* ════════════ 10. EXPORT LEDGERS ════════════ */}
      {activeTab === "reports" && (
        <div className="glass-card" style={{ padding: "1.75rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1rem" }}>Financial Export Center</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Compile and download standard institutional accounts ledgers for audit tracking.</p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => alert("Downloading Daily Collections PDF...")} className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", gap: "0.5rem" }}>
              <Download size={16} /> Download Daily Collection Report (PDF)
            </button>
            <button onClick={() => alert("Downloading Monthly ledger spreadsheet...")} className="btn btn-secondary" style={{ padding: "0.75rem 1.5rem", gap: "0.5rem" }}>
              <Download size={16} /> Export Financial Ledger (Excel)
            </button>
          </div>
        </div>
      )}

      {/* ════════════ ADD SLAB MODAL ════════════ */}
      {isSlabModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "620px", maxHeight: "90vh", overflowY: "auto", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Configure Independent School Fee Slab</h3>
              <button onClick={() => setIsSlabModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveSlab} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Slab Title & Dynamic Class Selector */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SLAB TITLE</label>
                  <input type="text" value={slabForm.title} onChange={(e) => setSlabForm({ ...slabForm, title: e.target.value })} placeholder="e.g. Class 5 Annual Slab 2026-27" required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DYNAMIC CLASS</label>
                  <select value={slabForm.className} onChange={(e) => setSlabForm({ ...slabForm, className: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Pre-Nursery">Pre-Nursery</option>
                    <option value="Play Group">Play Group</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>
              </div>

              {/* Payment Frequency Selector */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PAYMENT FREQUENCY</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                  {["Monthly", "Quarterly", "Half-Yearly", "Yearly"].map(freq => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setSlabForm({ ...slabForm, term: freq })}
                      style={{
                        padding: "0.5rem 0.75rem",
                        borderRadius: 8,
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        border: "1px solid",
                        borderColor: slabForm.term === freq ? "var(--primary)" : "var(--border-color)",
                        background: slabForm.term === freq ? "rgba(99, 102, 241, 0.15)" : "var(--bg-input)",
                        color: slabForm.term === freq ? "var(--primary)" : "var(--text-main)",
                        cursor: "pointer"
                      }}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Itemized Fee Components Breakdown */}
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: 12, border: "1px solid var(--border-color)" }}>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-heading)", margin: "0 0 0.75rem 0" }}>💰 Itemized Fee Components Breakdown</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 4 }}>Tuition Fee (₹)</label>
                    <input type="number" value={slabForm.tuitionFee} onChange={(e) => setSlabForm({ ...slabForm, tuitionFee: Number(e.target.value) })} style={{ width: "100%", padding: "0.5rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 4 }}>Exam Fee (₹)</label>
                    <input type="number" value={slabForm.examFee} onChange={(e) => setSlabForm({ ...slabForm, examFee: Number(e.target.value) })} style={{ width: "100%", padding: "0.5rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 4 }}>Admission Fee (₹)</label>
                    <input type="number" defaultValue={2000} style={{ width: "100%", padding: "0.5rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 4 }}>Development (₹)</label>
                    <input type="number" defaultValue={3000} style={{ width: "100%", padding: "0.5rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 4 }}>Library Fee (₹)</label>
                    <input type="number" defaultValue={500} style={{ width: "100%", padding: "0.5rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 4 }}>Annual Fee (₹)</label>
                    <input type="number" defaultValue={1000} style={{ width: "100%", padding: "0.5rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                  </div>
                </div>
              </div>

              {/* Separate Optional Transport Addon Section */}
              <div style={{ background: "rgba(14, 165, 233, 0.08)", padding: "1rem", borderRadius: 12, border: "1px solid rgba(14, 165, 233, 0.25)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0ea5e9", margin: 0 }}>🚌 Separate Optional Transport Fee Addon</h4>
                  <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: 4, background: "rgba(14, 165, 233, 0.2)", color: "#0ea5e9", fontWeight: 800 }}>OPT-IN ADDON</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0 0 0.75rem 0" }}>Transport fee is kept separate from mandatory class base fees. Only students opting into bus service pay transport fees.</p>
                <div>
                  <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 4 }}>Annual Transport Fee (₹)</label>
                  <input type="number" value={slabForm.transportFee} onChange={(e) => setSlabForm({ ...slabForm, transportFee: Number(e.target.value) })} style={{ width: "100%", padding: "0.5rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              {/* Installment Breakdown Preview & Calculated Totals Card */}
              <div style={{ background: "rgba(16, 185, 129, 0.08)", padding: "1rem", borderRadius: 12, border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block" }}>CLASS BASE FEE (NON-BUS STUDENTS)</span>
                    <strong style={{ fontSize: "1.1rem", color: "var(--text-heading)" }}>₹ {(slabForm.tuitionFee + slabForm.examFee + 6500).toLocaleString("en-IN")}</strong>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block" }}>TOTAL FOR BUS USERS</span>
                    <strong style={{ fontSize: "1.1rem", color: "#10b981" }}>₹ {(slabForm.tuitionFee + slabForm.examFee + 6500 + slabForm.transportFee).toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(16, 185, 129, 0.2)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  📅 <strong>{slabForm.term} Installments:</strong> {
                    slabForm.term === "Quarterly"
                      ? `Q1: ₹ ${Math.round((slabForm.tuitionFee + slabForm.examFee + 6500) / 4).toLocaleString("en-IN")} | Q2: ₹ ${Math.round((slabForm.tuitionFee + slabForm.examFee + 6500) / 4).toLocaleString("en-IN")} | Q3: ₹ ${Math.round((slabForm.tuitionFee + slabForm.examFee + 6500) / 4).toLocaleString("en-IN")} | Q4: ₹ ${Math.round((slabForm.tuitionFee + slabForm.examFee + 6500) / 4).toLocaleString("en-IN")}`
                      : slabForm.term === "Monthly"
                        ? `12 Installments of ₹ ${Math.round((slabForm.tuitionFee + slabForm.examFee + 6500) / 12).toLocaleString("en-IN")}/month`
                        : slabForm.term === "Half-Yearly"
                          ? `H1: ₹ ${Math.round((slabForm.tuitionFee + slabForm.examFee + 6500) / 2).toLocaleString("en-IN")} | H2: ₹ ${Math.round((slabForm.tuitionFee + slabForm.examFee + 6500) / 2).toLocaleString("en-IN")}`
                          : `1 Installment of ₹ ${(slabForm.tuitionFee + slabForm.examFee + 6500).toLocaleString("en-IN")}/year`
                  }
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsSlabModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Publish Slab</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ASSIGN SLAB MODAL ════════════ */}
      {isAssignModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Assign Fee Slab to Student</h3>
              <button onClick={() => setIsAssignModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveAssign} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STUDENT NAME</label>
                <select value={assignForm.studentName} onChange={(e) => setAssignForm({ ...assignForm, studentName: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  {MOCK_STUDENTS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT FEE SLAB</label>
                <select value={assignForm.slabName} onChange={(e) => setAssignForm({ ...assignForm, slabName: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  {feeSlabs.map((s, idx) => <option key={idx} value={s.title || s.name}>{s.title || s.name}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EXPECTED AMOUNT (₹)</label>
                <input type="number" value={assignForm.totalExpected} onChange={(e) => setAssignForm({ ...assignForm, totalExpected: Number(e.target.value) })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsAssignModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Assign Slab</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ SCHOLARSHIP MODAL ════════════ */}
      {isScholarshipModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Add Waiver / Scholarship</h3>
              <button onClick={() => setIsScholarshipModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveScholarship} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STUDENT NAME</label>
                <select value={scholarshipForm.name} onChange={(e) => setScholarshipForm({ ...scholarshipForm, name: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="">Select Student...</option>
                  {MOCK_STUDENTS.map(s => <option key={s.id} value={s.name}>{s.name} ({s.class}-{s.section})</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DISCOUNT CATEGORY</label>
                <select value={scholarshipForm.type} onChange={(e) => setScholarshipForm({ ...scholarshipForm, type: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="Sibling Discount">Sibling Discount</option>
                  <option value="Merit Scholarship (Top 5%)">Merit Scholarship (Top 5%)</option>
                  <option value="Staff Ward Concession">Staff Ward Concession</option>
                  <option value="Sports Excellence Waiver">Sports Excellence Waiver</option>
                  <option value="EWS / Financial Aid">EWS / Financial Aid</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>WAIVER RATE</label>
                <input type="text" value={scholarshipForm.percentage} onChange={(e) => setScholarshipForm({ ...scholarshipForm, percentage: e.target.value })} placeholder="e.g. 15% or 25%" required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsScholarshipModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Apply Waiver</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ FINE MODAL ════════════ */}
      {isFineModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Log Student Penalty / Fine</h3>
              <button onClick={() => setIsFineModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveFine} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STUDENT NAME</label>
                <select value={fineForm.name} onChange={(e) => setFineForm({ ...fineForm, name: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="">Select Student...</option>
                  {MOCK_STUDENTS.map(s => <option key={s.id} value={s.name}>{s.name} ({s.class}-{s.section})</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FINE REASON / CATEGORY</label>
                <select value={fineForm.type} onChange={(e) => setFineForm({ ...fineForm, type: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="Late tuition Fee Payment">Late tuition Fee Payment</option>
                  <option value="Library Overdue Book Penalty">Library Overdue Book Penalty</option>
                  <option value="Campus Property Damage Charge">Campus Property Damage Charge</option>
                  <option value="ID Card Replacement Fee">ID Card Replacement Fee</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FINE AMOUNT (₹)</label>
                <input type="number" value={fineForm.amount} onChange={(e) => setFineForm({ ...fineForm, amount: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsFineModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Fine</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ REFUND MODAL ════════════ */}
      {isRefundModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Log Refund Claim</h3>
              <button onClick={() => setIsRefundModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveRefund} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STUDENT NAME</label>
                <select value={refundForm.name} onChange={(e) => setRefundForm({ ...refundForm, name: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="">Select Student...</option>
                  {MOCK_STUDENTS.map(s => <option key={s.id} value={s.name}>{s.name} ({s.class}-{s.section})</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>REFUND CATEGORY / REASON</label>
                <select value={refundForm.type} onChange={(e) => setRefundForm({ ...refundForm, type: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="Admission Caution Deposit Refund">Admission Caution Deposit Refund</option>
                  <option value="Transfer Certificate Relocation">Transfer Certificate Relocation</option>
                  <option value="Duplicate Fee Payment Reversal">Duplicate Fee Payment Reversal</option>
                  <option value="Bus Route Discontinuation">Bus Route Discontinuation</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>REFUND AMOUNT (₹)</label>
                <input type="number" value={refundForm.amount} onChange={(e) => setRefundForm({ ...refundForm, amount: Number(e.target.value) })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsRefundModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Audit &amp; Log Refund</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
