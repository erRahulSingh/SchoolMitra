"use client";

import React, { useState, useEffect } from "react";
import { 
  Briefcase, DollarSign, Calendar, FileText, Download, Printer, 
  CheckCircle2, AlertCircle, Users, Plus, X, Search, Filter, Shield, 
  Award, Receipt, Building2, Edit3, Trash2, Save, Send, Sparkles, TrendingUp
} from "lucide-react";

interface PayrollRecord {
  id: string;
  empId: string;
  name: string;
  role: string;
  dept: string;
  base: number;
  hra: number;
  ta: number;
  pf: number;
  net: number;
  status: string;
}

interface LeaveRecord {
  id: string;
  name: string;
  dept: string;
  casualLeave: string;
  sickLeave: string;
  earnedLeave: string;
  totalTaken: string;
}

interface ClaimRecord {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  status: string;
}

export default function HrPage() {
  const [activeTab, setActiveTab] = useState<"payroll" | "leaves" | "pf_compliance" | "claims" | "documents">("payroll");
  const [selectedStaffPayslip, setSelectedStaffPayslip] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // States
  const [staffPayroll, setStaffPayroll] = useState<PayrollRecord[]>([]);
  const [leaveBalances, setLeaveBalances] = useState<LeaveRecord[]>([]);
  const [claims, setClaims] = useState<ClaimRecord[]>([]);

  // Teacher Documents Vault State
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("t1");
  const [teacherDocs, setTeacherDocs] = useState<any[]>([]);
  const [isTeacherDocModalOpen, setIsTeacherDocModalOpen] = useState(false);
  const [editingTeacherDocId, setEditingTeacherDocId] = useState<string | null>(null);
  const [teacherDocForm, setTeacherDocForm] = useState({
    title: "",
    category: "Qualification Certificate",
    fileUrl: "",
    notes: ""
  });

  const fetchTeacherDocs = async (tId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/documents/teachers/${tId}`);
      const json = await res.json();
      if (json.success) {
        setTeacherDocs(json.documents);
      }
    } catch (e) {
      console.error("Teacher docs fetch error:", e);
    }
  };

  useEffect(() => {
    if (activeTab === "documents") {
      fetchTeacherDocs(selectedTeacherId);
    }
  }, [activeTab, selectedTeacherId]);

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmpId, setEditingEmpId] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    name: "",
    role: "Senior Mathematics Faculty",
    dept: "Academics",
    base: 45000,
    hra: 12000,
    ta: 3000,
    pf: 5400
  });

  // Expiring Documents Alert State
  const [expiringDocsAlert, setExpiringDocsAlert] = useState<{
    totalExpiringSoon: number;
    alertTitle: string;
    alertDescription: string;
    documents: any[];
  }>({
    totalExpiringSoon: 5,
    alertTitle: "⚠ Documents Expiring Soon",
    alertDescription: "5 documents expire within 30 days",
    documents: []
  });

  const fetchExpiringDocsAlerts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/documents/expiring");
      const json = await res.json();
      if (json.success && json.summary) {
        setExpiringDocsAlert(json.summary);
      }
    } catch (e) {}
  };

  // Fetch all data from Backend DB
  const fetchAllHrData = async () => {
    setLoading(true);
    setError(null);
    try {
      fetchExpiringDocsAlerts();
      // 1. Fetch Payroll
      const payrollRes = await fetch("http://localhost:5000/api/v1/hr/payroll");
      const payrollJson = await payrollRes.json();
      if (payrollJson.success) {
        setStaffPayroll(payrollJson.data.payroll);
      }

      // 2. Fetch Leaves
      const leavesRes = await fetch("http://localhost:5000/api/v1/hr/leaves");
      const leavesJson = await leavesRes.json();
      if (leavesJson.success) {
        setLeaveBalances(leavesJson.data.leaves);
      }

      // 3. Fetch Claims
      const claimsRes = await fetch("http://localhost:5000/api/v1/hr/claims");
      const claimsJson = await claimsRes.json();
      if (claimsJson.success) {
        setClaims(claimsJson.data.claims);
      }
    } catch (err: any) {
      console.error("HR sync error:", err);
      setError("Unable to connect to SchoolMitra DB server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllHrData();
  }, []);

  // Submit Add / Edit Form to DB
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/hr/payroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingEmpId,
          name: formState.name,
          role: formState.role,
          dept: formState.dept,
          base: formState.base,
          hra: formState.hra,
          ta: formState.ta,
          pf: formState.pf
        })
      });
      const json = await res.json();
      if (json.success) {
        alert(editingEmpId ? "Salary structure updated in DB!" : "New staff payroll record registered!");
        setIsModalOpen(false);
        fetchAllHrData();
      }
    } catch (err) {
      console.error(err);
      alert("Error posting salary structural updates.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Salary Record
  const handleDeletePayroll = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove salary record for ${name} from DB?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/hr/payroll/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        alert("Salary record removed from database.");
        fetchAllHrData();
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting salary record.");
    } finally {
      setLoading(false);
    }
  };

  // Process Claim Action
  const handleClaimAction = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/hr/claims/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const json = await res.json();
      if (json.success) {
        alert(`Claim status updated to ${status}!`);
        fetchAllHrData();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to process expense claim.");
    }
  };

  // Modal Open wrappers
  const handleOpenAddModal = () => {
    setEditingEmpId(null);
    setFormState({
      name: "",
      role: "Senior Mathematics Faculty",
      dept: "Academics",
      base: 45000,
      hra: 12000,
      ta: 3000,
      pf: 5400
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp: PayrollRecord) => {
    setEditingEmpId(emp.id);
    setFormState({
      name: emp.name,
      role: emp.role,
      dept: emp.dept,
      base: emp.base,
      hra: emp.hra,
      ta: emp.ta,
      pf: emp.pf
    });
    setIsModalOpen(true);
  };

  // Auto-calculated fields
  const calculatedNet = Math.max(0, Number(formState.base) + Number(formState.hra) + Number(formState.ta) - Number(formState.pf));
  const totalMonthlyPayrollCost = staffPayroll.reduce((acc, curr) => acc + curr.net, 0);
  const activeStaffCount = staffPayroll.length;
  const pendingClaimsCount = claims.filter(c => c.status === "PENDING").length;

  // Filters mapping
  const filteredPayroll = staffPayroll.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || emp.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "All" || emp.dept === deptFilter;
    return matchesSearch && matchesDept;
  });

  const selectedPayslipData = staffPayroll.find(s => s.id === selectedStaffPayslip) || staffPayroll[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* CSS Animation injection */}
      <style>{`
        @keyframes spinner-rot {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
            HR &amp; Staff Payroll Engine <Briefcase size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem", margin: 0 }}>
            Statutory ledger for EPF/ESI compliance, leaves accounting, expense reimbursement desk, and custom salary payslip generators.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button onClick={handleOpenAddModal} className="btn btn-primary" style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}>
            <Plus size={16} /> <span>Add Staff Payroll</span>
          </button>
          <button 
            onClick={() => {
              alert(`Spooling bank transfer disbursement run for ${activeStaffCount} employees totaling ₹ ${totalMonthlyPayrollCost.toLocaleString("en-IN")}...`);
            }} 
            className="btn btn-secondary" 
            style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}
          >
            <DollarSign size={16} /> <span>Run Monthly Disbursement</span>
          </button>
        </div>
      </div>

      {/* METRIC KPI CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>ACTIVE PAYROLL STAFF</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{activeStaffCount} Employees</div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Live registry on database</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>MONTHLY SALARY LIABILITY</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>
            ₹ {totalMonthlyPayrollCost.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Net payable amount</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>PENDING EXPENSE CLAIMS</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: pendingClaimsCount > 0 ? "#f59e0b" : "var(--text-main)", marginTop: 4 }}>
            {pendingClaimsCount} Claims
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Awaiting audit approval</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>STATUTORY EPF COMPLIANCE</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#38bdf8", marginTop: 4 }}>12.0% Fixed</div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>UAN ECR return spooled</div>
        </div>
      </div>

      {/* TAB OPTIONS CONSOLE */}
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
          { id: "payroll", label: "Payroll & Salary Slips", icon: DollarSign },
          { id: "leaves", label: "Leave Balance Ledgers", icon: Calendar },
          { id: "pf_compliance", label: "PF & ESI Compliance", icon: Shield },
          { id: "claims", label: "Expense Claims & Reimbursements", icon: Receipt },
          { id: "documents", label: "Teacher Documents Vault", icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{ 
                padding: "0.55rem 0.95rem", 
                fontSize: "0.82rem", 
                gap: "0.4rem",
                borderRadius: 8,
                fontWeight: isActive ? 700 : 500
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SYNCHRONIZING NOTIFIER */}
      {loading && (
        <div className="glass-card" style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "rgba(99,102,241,0.08)", border: "1px solid var(--primary-glow)" }}>
          <div style={{ width: 18, height: 18, border: "3px solid rgba(255,255,255,0.1)", borderLeft: "3px solid var(--primary)", borderRadius: "50%", animation: "spinner-rot 1s linear infinite" }} />
          <span style={{ fontSize: "0.82rem", color: "var(--text-main)", fontWeight: 700 }}>Synchronizing HR database ledger...</span>
        </div>
      )}

      {/* ════════════ TAB MODULES RENDER ════════════ */}

      {/* MODULE 1: PAYROLL LEDGER & PRINT SLIPS */}
      {activeTab === "payroll" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {/* Filter Toolbar */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flex: 1, minWidth: "280px" }}>
              
              {/* Search wrapper with specify override fix */}
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 2 }} />
                <input 
                  type="text"
                  placeholder="Search staff name or employee code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem 0.6rem 2.2rem",
                    background: "var(--bg-input)",
                    color: "var(--text-main)",
                    borderRadius: 8,
                    fontSize: "0.85rem",
                    outline: "none"
                  }}
                />
              </div>

              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                style={{
                  padding: "0.6rem 1rem",
                  background: "var(--bg-input)",
                  color: "var(--text-main)",
                  borderRadius: 8,
                  fontSize: "0.85rem",
                  border: "1px solid var(--border-color)",
                  fontWeight: 600
                }}
              >
                <option value="All">All Departments</option>
                <option value="Academics">Academics</option>
                <option value="Finance">Finance</option>
                <option value="Transport">Transport</option>
                <option value="Library">Library</option>
              </select>
            </div>

            <button 
              onClick={() => alert("Downloading formatted payroll structural summary as CSV...")} 
              className="btn btn-secondary" 
              style={{ padding: "0.5rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}
            >
              <Download size={15} /> <span>Export structural ledger</span>
            </button>
          </div>

          {/* Grid list */}
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Employee Profile</th>
                  <th>Designation Role</th>
                  <th>Base Pay</th>
                  <th>Total Allowance</th>
                  <th>EPF Deduction</th>
                  <th>Net Payable</th>
                  <th style={{ textAlign: "right" }}>Actions Log</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayroll.map((emp) => (
                  <tr key={emp.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>
                      {emp.name}
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace", marginTop: 2 }}>ID: {emp.id || emp.empId}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{emp.role}</div>
                      <span className="badge badge-info" style={{ fontSize: "0.65rem", marginTop: 3 }}>{emp.dept}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>₹ {emp.base.toLocaleString("en-IN")}</td>
                    <td>₹ {(emp.hra + emp.ta).toLocaleString("en-IN")}</td>
                    <td style={{ color: "var(--danger)", fontWeight: 700 }}>- ₹ {emp.pf.toLocaleString("en-IN")}</td>
                    <td style={{ color: "var(--success)", fontWeight: 900, fontSize: "0.95rem" }}>₹ {emp.net.toLocaleString("en-IN")}</td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button 
                          onClick={() => handleOpenEditModal(emp)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                        
                        <button 
                          onClick={() => setSelectedStaffPayslip(emp.id)}
                          className="btn btn-primary"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                        >
                          <Printer size={13} /> Payslip
                        </button>

                        <button 
                          onClick={() => handleDeletePayroll(emp.id, emp.name)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "var(--danger)" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPayroll.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>No matching payroll records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 2: LEAVE BALANCE LEDGERS */}
      {activeTab === "leaves" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Leave Entitlement Balances</h3>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Annual leave parameters compiled dynamically per active staff account.</p>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Staff Profile</th>
                  <th>Department</th>
                  <th>Casual Leave (CL)</th>
                  <th>Sick Leave (SL)</th>
                  <th>Earned Leave (EL)</th>
                  <th>Total Days Taken</th>
                </tr>
              </thead>
              <tbody>
                {leaveBalances.map((l) => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{l.name}</td>
                    <td><span className="badge badge-info">{l.dept}</span></td>
                    <td style={{ fontWeight: 700, color: "var(--success)" }}>{l.casualLeave}</td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{l.sickLeave}</td>
                    <td style={{ fontWeight: 700 }}>{l.earnedLeave}</td>
                    <td><span className="badge badge-secondary">{l.totalTaken}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 3: PF & ESI COMPLIANCE REGISTER */}
      {activeTab === "pf_compliance" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Statutory PF &amp; ESI Remittance Compliance</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>EPF (12.0% basic wage) matches EPFO ECR requirements.</p>
            </div>
            <button onClick={() => alert("Compiling EPFO ECR return text file format...")} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.78rem" }}>
              Spoool EPF Remittance Return
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Staff Profile</th>
                  <th>Universal Account (UAN)</th>
                  <th>Employee Contribution (12%)</th>
                  <th>Employer Contribution (12%)</th>
                  <th>ESI Contribution (0.75%)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {staffPayroll.map((emp, idx) => {
                  const uan = `1009881230${19 + idx}`;
                  // If base is below 21000, ESI is calculated as 0.75% of base
                  const esiVal = emp.base < 21000 ? Math.round(emp.base * 0.0075) : 0;
                  return (
                    <tr key={emp.id}>
                      <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{emp.name}</td>
                      <td style={{ fontFamily: "monospace" }}>{uan}</td>
                      <td style={{ fontWeight: 600 }}>₹ {emp.pf.toLocaleString("en-IN")}</td>
                      <td style={{ fontWeight: 600 }}>₹ {emp.pf.toLocaleString("en-IN")}</td>
                      <td>{esiVal > 0 ? `₹ ${esiVal.toLocaleString("en-IN")}` : "N/A"}</td>
                      <td><span className="badge badge-success">REMITTED ✅</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 4: EXPENSE CLAIMS & REIMBURSEMENTS */}
      {activeTab === "claims" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Expense Claims &amp; Staff Reimbursements</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Manage science exhibition models supplies, driver bus fuels claims, etc.</p>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Staff Profile</th>
                  <th>Claim Category</th>
                  <th>Amount</th>
                  <th>Date Logged</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontFamily: "monospace", fontWeight: 800 }}>{c.id}</td>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{c.name}</td>
                    <td>{c.category}</td>
                    <td style={{ fontWeight: 800, color: "var(--primary)" }}>₹ {c.amount.toLocaleString("en-IN")}</td>
                    <td>{c.date}</td>
                    <td>
                      <span className={`badge ${
                        c.status === "APPROVED" ? "badge-success" : c.status === "REJECTED" ? "badge-danger" : "badge-warning"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {c.status === "PENDING" ? (
                        <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                          <button onClick={() => handleClaimAction(c.id, "APPROVED")} className="btn btn-primary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.7rem" }}>Approve</button>
                          <button onClick={() => handleClaimAction(c.id, "REJECTED")} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.7rem" }}>Reject</button>
                        </div>
                      ) : (
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
                {claims.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>No claims registered.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ ADD / EDIT SALARY PAYROLL MODAL ════════════ */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "540px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <DollarSign size={20} color="var(--primary)" />
                {editingEmpId ? "Edit Staff Salary Structure" : "Add New Staff Salary Record"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STAFF MEMBER NAME</label>
                <input 
                  type="text" 
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Sunita Rao" 
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DESIGNATION ROLE</label>
                  <input 
                    type="text" 
                    value={formState.role}
                    onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                    placeholder="e.g. Senior Faculty" 
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DEPARTMENT</label>
                  <select
                    value={formState.dept}
                    onChange={(e) => setFormState({ ...formState, dept: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  >
                    <option value="Academics">Academics</option>
                    <option value="Finance">Finance</option>
                    <option value="Transport">Transport</option>
                    <option value="Library">Library</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BASE SALARY (₹)</label>
                  <input 
                    type="number" 
                    value={formState.base}
                    onChange={(e) => {
                      const newBase = Number(e.target.value);
                      setFormState({ 
                        ...formState, 
                        base: newBase,
                        pf: Math.round(newBase * 0.12) // Auto-calculate 12% PF
                      });
                    }}
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>HRA ALLOWANCE (₹)</label>
                  <input 
                    type="number" 
                    value={formState.hra}
                    onChange={(e) => setFormState({ ...formState, hra: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TRAVEL ALLOWANCE (₹)</label>
                  <input 
                    type="number" 
                    value={formState.ta}
                    onChange={(e) => setFormState({ ...formState, ta: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PF DEDUCTION (12%) (₹)</label>
                  <input 
                    type="number" 
                    value={formState.pf}
                    onChange={(e) => setFormState({ ...formState, pf: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--danger)", fontSize: "0.88rem", fontWeight: 700 }}
                  />
                </div>
              </div>

              <div style={{ background: "rgba(34, 197, 94, 0.12)", padding: "0.85rem", borderRadius: 8, border: "1px solid rgba(34, 197, 94, 0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>CALCULATED NET SALARY:</span>
                <strong style={{ fontSize: "1.2rem", color: "var(--success)", fontWeight: 900 }}>₹ {calculatedNet.toLocaleString("en-IN")}</strong>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: "0.4rem" }}>
                  <Save size={16} /> <span>Save Salary Structure</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ════════════ PAYSLIP PRINT MODAL ════════════ */}
      {selectedStaffPayslip && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "600px", padding: "2rem", background: "#fff", color: "#000", borderRadius: "16px" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", borderBottom: "2px solid #000", paddingBottom: "0.75rem" }}>
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#000", margin: 0 }}>SCHOOLMITRA WORLD ACADEMY</h2>
                <div style={{ fontSize: "0.75rem", color: "#555" }}>CONFIDENTIAL MONTHLY PAYSLIP &bull; SESSION 2026-27</div>
              </div>
              <button onClick={() => setSelectedStaffPayslip(null)} style={{ background: "#eee", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontWeight: 900, color: "#000" }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              <div>Employee Name: <strong>{selectedPayslipData?.name || "Sunita Rao"}</strong></div>
              <div>Employee Ref ID: <strong>{selectedPayslipData?.id || "EMP-101"}</strong></div>
              <div>Designation: <strong>{selectedPayslipData?.role || "Faculty"}</strong></div>
              <div>Department: <strong>{selectedPayslipData?.dept || "Academics"}</strong></div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", marginBottom: "1.25rem" }}>
              <thead>
                <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
                  <th style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>EARNINGS</th>
                  <th style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>AMOUNT</th>
                  <th style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>DEDUCTIONS</th>
                  <th style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>Basic Pay</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>₹ {(selectedPayslipData?.base || 45000).toLocaleString("en-IN")}</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>EPF Contribution (12%)</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>₹ {(selectedPayslipData?.pf || 5400).toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>House Rent Allowance (HRA)</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>₹ {(selectedPayslipData?.hra || 12000).toLocaleString("en-IN")}</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>ESI Contribution</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>₹ 0</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>Travel Allowance (TA)</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>₹ {(selectedPayslipData?.ta || 3000).toLocaleString("en-IN")}</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>Professional Tax</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #ccc", color: "#000" }}>₹ 0</td>
                </tr>
              </tbody>
            </table>

            <div style={{ background: "#e0f2fe", padding: "0.75rem", borderRadius: 6, display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "0.95rem", color: "#000" }}>
              <span>NET PAYABLE BANK REMITTANCE:</span>
              <span style={{ color: "#0284c7" }}>₹ {(selectedPayslipData?.net || 54600).toLocaleString("en-IN")}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.25rem" }}>
              <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: "0.45rem 1.15rem", fontSize: "0.8rem", gap: "0.4rem" }}>
                <Printer size={15} /> Print Payslip Receipt
              </button>
            </div>
          </div>
      {/* MODULE 5: TEACHER & STAFF DOCUMENTS VAULT */}
      {activeTab === "documents" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {/* EXPIRING DOCUMENTS ALERT BANNER */}
          <div style={{
            padding: "1rem 1.25rem",
            background: "rgba(245, 158, 11, 0.12)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(245, 158, 11, 0.2)", display: "flex", justifyContent: "center", alignItems: "center", color: "#f59e0b", fontSize: "1.25rem", fontWeight: 900 }}>
                ⚠
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#f59e0b" }}>
                  {expiringDocsAlert.alertTitle}
                </h4>
                <div style={{ fontSize: "0.82rem", color: "#e2e8f0", marginTop: 2 }}>
                  {expiringDocsAlert.alertDescription} (e.g. Teacher Driving License, Qualification Accreditation, Fitness Cert)
                </div>
              </div>
            </div>

            <span className="badge badge-warning" style={{ padding: "0.4rem 0.8rem", fontSize: "0.78rem" }}>
              ACTION REQUIRED: 5 DOCS
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>Teacher &amp; Staff Compliance Documents Vault</h4>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>
                Admin control for Photo, ID Proof, Qualification, Experience &amp; Joining Certificates
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <select
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                style={{
                  padding: "0.55rem 0.85rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: "0.82rem",
                  outline: "none"
                }}
              >
                {staffPayroll.length > 0 ? (
                  staffPayroll.map(s => <option key={s.id} value={s.id} style={{ background: "#0b0f19" }}>{s.name} ({s.id})</option>)
                ) : (
                  <option value="t1" style={{ background: "#0b0f19" }}>Sunita Rao (Faculty)</option>
                )}
              </select>

              <button
                type="button"
                onClick={() => {
                  setEditingTeacherDocId(null);
                  setTeacherDocForm({ title: "", category: "Qualification Certificate", fileUrl: "", notes: "" });
                  setIsTeacherDocModalOpen(true);
                }}
                className="btn btn-primary"
                style={{ padding: "0.5rem 0.95rem", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <Plus size={15} /> Upload Staff Document
              </button>
            </div>
          </div>

          {/* Document Categories Checklist Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              "Photo",
              "ID Proof",
              "Qualification Certificate",
              "Experience Certificate",
              "Joining Document",
              "Other"
            ].map((catName) => {
              const existingDocs = teacherDocs.filter(d => d.category === catName);
              const hasDoc = existingDocs.length > 0;
              return (
                <div
                  key={catName}
                  style={{
                    padding: "1.1rem",
                    background: hasDoc ? "rgba(16, 185, 129, 0.04)" : "rgba(255,255,255,0.02)",
                    borderRadius: "12px",
                    border: hasDoc ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid var(--border-color)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.65rem"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FileText size={16} color={hasDoc ? "#10b981" : "#64748b"} />
                      <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff" }}>{catName}</span>
                    </div>
                    <span className={`badge ${hasDoc ? "badge-success" : "badge-warning"}`} style={{ fontSize: "0.68rem" }}>
                      {hasDoc ? "VERIFIED & ON FILE" : "PENDING SUBMISSION"}
                    </span>
                  </div>

                  {hasDoc ? (
                    existingDocs.map((docItem) => (
                      <div key={docItem._id || docItem.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.25)", padding: "0.6rem 0.85rem", borderRadius: "8px", marginTop: 4 }}>
                        <div>
                          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#e2e8f0" }}>{docItem.title}</div>
                          <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{docItem.fileSize || "1.5 MB"} • {docItem.documentType || "PDF"}</div>
                        </div>
                        <div style={{ display: "flex", gap: "0.45rem" }}>
                          <a
                            href={docItem.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-secondary"
                            style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                          >
                            <Download size={12} /> View
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingTeacherDocId(docItem._id || docItem.id);
                              setTeacherDocForm({ title: docItem.title, category: docItem.category, fileUrl: docItem.fileUrl, notes: docItem.notes || "" });
                              setIsTeacherDocModalOpen(true);
                            }}
                            style={{ background: "rgba(56, 189, 248, 0.15)", border: "1px solid rgba(56, 189, 248, 0.3)", color: "#38bdf8", padding: "0.3rem 0.6rem", borderRadius: 6, cursor: "pointer", fontSize: "0.72rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                          >
                            <Edit3 size={12} /> Replace
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              if (confirm("Are you sure you want to delete this staff document?")) {
                                try {
                                  await fetch(`http://localhost:5000/api/v1/documents/teachers/doc/${docItem._id || docItem.id}`, { method: "DELETE" });
                                  fetchTeacherDocs(selectedTeacherId);
                                } catch (e) {}
                              }
                            }}
                            style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "0.3rem 0.6rem", borderRadius: 6, cursor: "pointer", fontSize: "0.72rem" }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontStyle: "italic", marginTop: 2 }}>
                      No staff document uploaded under this category.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Upload / Replace Teacher Document Modal */}
          {isTeacherDocModalOpen && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: "1rem" }}>
              <div className="glass-card" style={{ padding: "1.5rem", width: "100%", maxWidth: 480, background: "#0f172a", border: "1px solid #334155", borderRadius: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>
                    {editingTeacherDocId ? "Replace Staff Document" : "Upload Staff Document"}
                  </h3>
                  <button type="button" onClick={() => setIsTeacherDocModalOpen(false)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!teacherDocForm.title || !teacherDocForm.fileUrl) return alert("Title and File URL are required!");
                  try {
                    if (editingTeacherDocId) {
                      await fetch(`http://localhost:5000/api/v1/documents/teachers/doc/${editingTeacherDocId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(teacherDocForm)
                      });
                    } else {
                      await fetch(`http://localhost:5000/api/v1/documents/teachers/${selectedTeacherId}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(teacherDocForm)
                      });
                    }
                    setIsTeacherDocModalOpen(false);
                    fetchTeacherDocs(selectedTeacherId);
                  } catch (err) {
                    alert("Failed to save staff document.");
                  }
                }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: 4 }}>DOCUMENT TITLE</label>
                    <input
                      type="text"
                      value={teacherDocForm.title}
                      onChange={(e) => setTeacherDocForm({ ...teacherDocForm, title: e.target.value })}
                      placeholder="e.g. B.Ed Degree Certificate Scan"
                      required
                      style={{ width: "100%", padding: "0.65rem", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: "0.85rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: 4 }}>CATEGORY</label>
                    <select
                      value={teacherDocForm.category}
                      onChange={(e) => setTeacherDocForm({ ...teacherDocForm, category: e.target.value })}
                      style={{ width: "100%", padding: "0.65rem", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: "0.85rem" }}
                    >
                      {[
                        "Photo",
                        "ID Proof",
                        "Qualification Certificate",
                        "Experience Certificate",
                        "Joining Document",
                        "Other"
                      ].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: 4 }}>FILE URL / LINK</label>
                    <input
                      type="text"
                      value={teacherDocForm.fileUrl}
                      onChange={(e) => setTeacherDocForm({ ...teacherDocForm, fileUrl: e.target.value })}
                      placeholder="https://example.com/docs/degree.pdf"
                      required
                      style={{ width: "100%", padding: "0.65rem", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: "0.85rem" }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                    <button type="button" onClick={() => setIsTeacherDocModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                      {editingTeacherDocId ? "Update Staff Document" : "Save Staff Document"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
