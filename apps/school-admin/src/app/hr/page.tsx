"use client";

import React, { useState, useEffect } from "react";
import { 
  Briefcase, DollarSign, Calendar, FileText, Download, Printer, 
  CheckCircle2, AlertCircle, Users, Plus, X, Search, Filter, Shield, Award, Receipt, Building2, Edit3, Trash2, Save
} from "lucide-react";

interface PayrollRecord {
  id: string;
  name: string;
  role: string;
  dept: string;
  base: number;
  hra: number;
  ta: number;
  pf: number;
  net: number;
}

export default function HrPage() {
  const [activeTab, setActiveTab] = useState<"payroll" | "leaves" | "pf_compliance" | "claims">("payroll");
  const [selectedStaffPayslip, setSelectedStaffPayslip] = useState<string | null>(null);

  // ── 1. Dynamic Payroll Ledger State ──
  const [staffPayroll, setStaffPayroll] = useState<PayrollRecord[]>([
    { id: "EMP-101", name: "Sunita Rao", role: "Senior Mathematics Faculty", dept: "Academics", base: 45000, hra: 12000, ta: 3000, pf: 5400, net: 54600 },
    { id: "EMP-102", name: "Dr. Vikram Malhotra", role: "Head of Science Dept", dept: "Academics", base: 55000, hra: 15000, ta: 4000, pf: 6600, net: 67400 },
    { id: "EMP-103", name: "Ramesh Sharma", role: "Chief Accountant", dept: "Finance", base: 40000, hra: 10000, ta: 2500, pf: 4800, net: 47700 },
    { id: "EMP-104", name: "Ram Singh", role: "Senior Bus Pilot", dept: "Transport", base: 25000, hra: 6000, ta: 2000, pf: 3000, net: 30000 },
    { id: "EMP-105", name: "Kavita Verma", role: "Head Librarian", dept: "Library", base: 35000, hra: 8000, ta: 2000, pf: 4200, net: 40800 }
  ]);

  // Load / Save Payroll LocalStorage Persistence
  useEffect(() => {
    try {
      const cached = localStorage.getItem("sm_hr_payroll");
      if (cached) {
        setStaffPayroll(JSON.parse(cached));
      }
    } catch (e) {}
  }, []);

  const savePayrollState = (updatedList: PayrollRecord[]) => {
    setStaffPayroll(updatedList);
    try {
      localStorage.setItem("sm_hr_payroll", JSON.stringify(updatedList));
    } catch (e) {}
  };

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmpId, setEditingEmpId] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    name: "",
    role: "Teacher / Faculty",
    dept: "Academics",
    base: 40000,
    hra: 10000,
    ta: 3000,
    pf: 4800
  });

  // Open Modal for Add New
  const handleOpenAddModal = () => {
    setEditingEmpId(null);
    setFormState({
      name: "",
      role: "Senior Faculty",
      dept: "Academics",
      base: 45000,
      hra: 10000,
      ta: 3000,
      pf: 5400
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
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

  // Auto-calculate Net Salary
  const calculatedNet = Math.max(0, (Number(formState.base) || 0) + (Number(formState.hra) || 0) + (Number(formState.ta) || 0) - (Number(formState.pf) || 0));

  // Submit Add / Edit Form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name) return;

    if (editingEmpId) {
      // Edit existing staff payroll
      const updated = staffPayroll.map(emp => {
        if (emp.id === editingEmpId) {
          return {
            ...emp,
            name: formState.name,
            role: formState.role,
            dept: formState.dept,
            base: Number(formState.base),
            hra: Number(formState.hra),
            ta: Number(formState.ta),
            pf: Number(formState.pf),
            net: calculatedNet
          };
        }
        return emp;
      });
      savePayrollState(updated);
      alert(`Salary record updated successfully for ${formState.name}!`);
    } else {
      // Add new staff payroll
      const newEmpId = `EMP-${Math.floor(100 + Math.random() * 900)}`;
      const newRecord: PayrollRecord = {
        id: newEmpId,
        name: formState.name,
        role: formState.role,
        dept: formState.dept,
        base: Number(formState.base),
        hra: Number(formState.hra),
        ta: Number(formState.ta),
        pf: Number(formState.pf),
        net: calculatedNet
      };
      const updated = [newRecord, ...staffPayroll];
      savePayrollState(updated);
      alert(`New staff salary record added for ${formState.name} (${newEmpId})!`);
    }

    setIsModalOpen(false);
  };

  // Delete Salary Record
  const handleDeletePayroll = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove salary record for ${name}?`)) {
      const updated = staffPayroll.filter(s => s.id !== id);
      savePayrollState(updated);
    }
  };

  // ── 2. Staff Leave Balance Ledgers State ──
  const [leaveBalances] = useState([
    { id: "EMP-101", name: "Sunita Rao", dept: "Academics", casualLeave: "10 / 12 Days", sickLeave: "7 / 8 Days", earnedLeave: "14 / 15 Days", totalTaken: "4 Days" },
    { id: "EMP-102", name: "Dr. Vikram Malhotra", dept: "Academics", casualLeave: "11 / 12 Days", sickLeave: "8 / 8 Days", earnedLeave: "15 / 15 Days", totalTaken: "1 Day" },
    { id: "EMP-103", name: "Ramesh Sharma", dept: "Finance", casualLeave: "9 / 12 Days", sickLeave: "6 / 8 Days", earnedLeave: "12 / 15 Days", totalTaken: "6 Days" },
    { id: "EMP-104", name: "Ram Singh", dept: "Transport", casualLeave: "8 / 12 Days", sickLeave: "5 / 8 Days", earnedLeave: "10 / 15 Days", totalTaken: "9 Days" }
  ]);

  // ── 3. PF & ESI Compliance State ──
  const [pfLedger] = useState([
    { id: "EMP-101", name: "Sunita Rao", uan: "100988123019", empPf: 5400, employerPf: 5400, esi: 0, status: "REMITTED ✅" },
    { id: "EMP-102", name: "Dr. Vikram Malhotra", uan: "100988123020", empPf: 6600, employerPf: 6600, esi: 0, status: "REMITTED ✅" },
    { id: "EMP-103", name: "Ramesh Sharma", uan: "100988123021", empPf: 4800, employerPf: 4800, esi: 0, status: "REMITTED ✅" },
    { id: "EMP-104", name: "Ram Singh", uan: "100988123022", empPf: 3000, employerPf: 3000, esi: 975, status: "REMITTED ✅" }
  ]);

  // ── 4. Claims & Reimbursements State ──
  const [claims, setClaims] = useState([
    { id: "CLM-801", name: "Sunita Rao", category: "Science Exhibition Supplies", amount: 4500, date: "24 July 2026", status: "PENDING" },
    { id: "CLM-802", name: "Ram Singh", category: "Emergency Bus Fuel Fill", amount: 2800, date: "26 July 2026", status: "APPROVED" }
  ]);

  const handleClaimAction = (id: string, action: "APPROVED" | "REJECTED") => {
    setClaims(claims.map(c => c.id === id ? { ...c, status: action } : c));
    alert(`Expense claim has been ${action.toLowerCase()}!`);
  };

  const selectedPayslipData = staffPayroll.find(s => s.id === selectedStaffPayslip) || staffPayroll[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
            HR &amp; Payroll Engine <Briefcase size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem", margin: 0 }}>
            Manage staff salary structure, add/edit payroll records, automated PF (12%) calculations, and printable payslip downloads.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button onClick={handleOpenAddModal} className="btn btn-primary" style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem", gap: "0.4rem" }}>
            <Plus size={16} /> <span>Add Staff Payroll</span>
          </button>
          <button onClick={() => alert("Executing monthly payroll disbursement run...")} className="btn btn-secondary" style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem", gap: "0.4rem" }}>
            <DollarSign size={16} /> <span>Execute Monthly Disbursement</span>
          </button>
        </div>
      </div>

      {/* ════════════ 4 TABS SWITCHER CONSOLE ════════════ */}
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
          { id: "claims", label: "Expense Claims & Reimbursements", icon: Receipt }
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

      {/* MODULE 1: PAYROLL LEDGER & SALARY SLIPS */}
      {activeTab === "payroll" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Staff Monthly Salary Ledger — Session 2026</h3>
            
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <button onClick={handleOpenAddModal} className="btn btn-primary" style={{ padding: "0.45rem 0.9rem", fontSize: "0.78rem", gap: "0.35rem" }}>
                <Plus size={14} /> Add New Salary Record
              </button>
              <button onClick={() => alert("Exporting salary ledger to CSV Excel...")} className="btn btn-secondary" style={{ padding: "0.45rem 0.9rem", fontSize: "0.78rem", gap: "0.35rem" }}>
                <Download size={14} /> Export Payroll Ledger
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap" }}>Employee Name</th>
                  <th style={{ whiteSpace: "nowrap" }}>Role &amp; Department</th>
                  <th style={{ whiteSpace: "nowrap" }}>Base Salary</th>
                  <th style={{ whiteSpace: "nowrap" }}>HRA + TA Allowances</th>
                  <th style={{ whiteSpace: "nowrap" }}>PF Deduction (12%)</th>
                  <th style={{ whiteSpace: "nowrap" }}>Net Payable</th>
                  <th style={{ textAlign: "right", whiteSpace: "nowrap" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffPayroll.map((emp) => (
                  <tr key={emp.id}>
                    <td style={{ fontWeight: 700, color: "var(--text-heading)", whiteSpace: "nowrap" }}>
                      {emp.name}
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{emp.id}</div>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <div style={{ fontWeight: 600 }}>{emp.role}</div>
                      <span className="badge badge-info" style={{ fontSize: "0.68rem" }}>{emp.dept}</span>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>₹ {emp.base.toLocaleString("en-IN")}</td>
                    <td style={{ whiteSpace: "nowrap" }}>₹ {(emp.hra + emp.ta).toLocaleString("en-IN")}</td>
                    <td style={{ color: "#ef4444", fontWeight: 700, whiteSpace: "nowrap" }}>- ₹ {emp.pf.toLocaleString("en-IN")}</td>
                    <td style={{ color: "var(--success)", fontWeight: 900, whiteSpace: "nowrap", fontSize: "0.95rem" }}>₹ {emp.net.toLocaleString("en-IN")}</td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button 
                          onClick={() => handleOpenEditModal(emp)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                          title="Edit Salary Structure"
                        >
                          <Edit3 size={13} /> Edit
                        </button>

                        <button 
                          onClick={() => setSelectedStaffPayslip(emp.id)}
                          className="btn btn-primary"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                        >
                          <Printer size={12} /> Payslip
                        </button>

                        <button 
                          onClick={() => handleDeletePayroll(emp.id, emp.name)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}
                          title="Delete Salary Record"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 2: LEAVE BALANCE LEDGERS */}
      {activeTab === "leaves" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Staff Leave Entitlement &amp; Balance Ledgers</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Department</th>
                <th>Casual Leave (CL) Balance</th>
                <th>Sick Leave (SL) Balance</th>
                <th>Earned Leave (EL) Balance</th>
                <th>Total Leaves Taken</th>
              </tr>
            </thead>
            <tbody>
              {leaveBalances.map((l) => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 700, color: "var(--text-heading)" }}>{l.name}</td>
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
      )}

      {/* MODULE 3: PF & ESI COMPLIANCE */}
      {activeTab === "pf_compliance" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>EPF &amp; ESI Statutory Compliance Register</h3>
            <button onClick={() => alert("Generating EPFO ECR Return text file...")} className="btn btn-primary" style={{ padding: "0.4rem 0.88rem", fontSize: "0.78rem" }}>
              Generate EPF Return File
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Staff Member</th>
                <th>UAN Number</th>
                <th>Employee PF (12%)</th>
                <th>Employer PF (12%)</th>
                <th>ESI Contribution</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pfLedger.map((pf) => (
                <tr key={pf.id}>
                  <td style={{ fontWeight: 700, color: "var(--text-heading)" }}>{pf.name}</td>
                  <td style={{ fontFamily: "monospace" }}>{pf.uan}</td>
                  <td>₹ {pf.empPf.toLocaleString("en-IN")}</td>
                  <td>₹ {pf.employerPf.toLocaleString("en-IN")}</td>
                  <td>{pf.esi ? `₹ ${pf.esi}` : "N/A"}</td>
                  <td><span className="badge badge-success">{pf.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 4: CLAIMS & REIMBURSEMENTS */}
      {activeTab === "claims" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Expense Claims &amp; Staff Reimbursement Desk</h3>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Staff Member</th>
                <th>Category / Purpose</th>
                <th>Claim Amount</th>
                <th>Submission Date</th>
                <th>Approval Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: "monospace", fontWeight: 700 }}>{c.id}</td>
                  <td style={{ fontWeight: 700, color: "var(--text-heading)" }}>{c.name}</td>
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
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ ADD / EDIT SALARY PAYROLL MODAL ════════════ */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "540px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <DollarSign size={20} color="var(--primary)" />
                {editingEmpId ? "Edit Staff Salary Structure" : "Add New Staff Salary Record"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STAFF MEMBER FULL NAME</label>
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
                    <option value="Administration">Administration</option>
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
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TRAVEL / OTHER ALLOWANCE (₹)</label>
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
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "#ef4444", fontSize: "0.88rem", fontWeight: 700 }}
                  />
                </div>
              </div>

              {/* Calculated Net Salary Highlight */}
              <div style={{ background: "rgba(34, 197, 94, 0.12)", padding: "0.85rem", borderRadius: 8, border: "1px solid rgba(34, 197, 94, 0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>CALCULATED NET SALARY:</span>
                <strong style={{ fontSize: "1.2rem", color: "var(--success)", fontWeight: 900 }}>₹ {calculatedNet.toLocaleString("en-IN")}</strong>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: "0.4rem" }}>
                  <Save size={16} /> {editingEmpId ? "Update Salary" : "Save Salary Record"}
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
                <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#000", margin: 0 }}>DELHI PUBLIC SCHOOL</h2>
                <div style={{ fontSize: "0.75rem", color: "#555" }}>CONFIDENTIAL MONTHLY PAYSLIP &bull; SESSION 2026</div>
              </div>
              <button onClick={() => setSelectedStaffPayslip(null)} style={{ background: "#eee", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontWeight: 900 }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.82rem", marginBottom: "1rem" }}>
              <div>Employee Name: <strong>{selectedPayslipData.name}</strong></div>
              <div>Employee ID: <strong>{selectedPayslipData.id}</strong></div>
              <div>Designation: <strong>{selectedPayslipData.role}</strong></div>
              <div>Department: <strong>{selectedPayslipData.dept}</strong></div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", marginBottom: "1rem" }}>
              <thead>
                <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
                  <th style={{ padding: "0.4rem", border: "1px solid #ccc" }}>EARNINGS</th>
                  <th style={{ padding: "0.4rem", border: "1px solid #ccc" }}>AMOUNT</th>
                  <th style={{ padding: "0.4rem", border: "1px solid #ccc" }}>DEDUCTIONS</th>
                  <th style={{ padding: "0.4rem", border: "1px solid #ccc" }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>Basic Pay</td>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>₹ {selectedPayslipData.base.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>EPF (12%)</td>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>₹ {selectedPayslipData.pf.toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>HRA Allowance</td>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>₹ {selectedPayslipData.hra.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>Income Tax (TDS)</td>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>₹ 0</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>Travel Allowance</td>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>₹ {selectedPayslipData.ta.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>-</td>
                  <td style={{ padding: "0.4rem", border: "1px solid #ccc" }}>-</td>
                </tr>
              </tbody>
            </table>

            <div style={{ background: "#e0f2fe", padding: "0.75rem", borderRadius: 6, display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "0.95rem" }}>
              <span>NET PAYABLE AMOUNT:</span>
              <span style={{ color: "#0284c7" }}>₹ {selectedPayslipData.net.toLocaleString("en-IN")}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
              <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: "0.45rem 1rem", fontSize: "0.8rem" }}>
                <Printer size={14} /> Print Official Payslip
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
