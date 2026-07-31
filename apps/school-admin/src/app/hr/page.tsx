"use client";

import React, { useState } from "react";
import { 
  Briefcase, DollarSign, Calendar, FileText, Download, Printer, 
  CheckCircle2, AlertCircle, Users, Plus, X, Search, Filter, Shield, Award, Receipt, Building2
} from "lucide-react";

export default function HrPage() {
  const [activeTab, setActiveTab] = useState<"payroll" | "leaves" | "pf_compliance" | "claims">("payroll");
  const [selectedStaffPayslip, setSelectedStaffPayslip] = useState<string | null>(null);

  // ── 1. Payroll Ledger State ──
  const [staffPayroll] = useState([
    { id: "EMP-101", name: "Sunita Rao", role: "Senior Mathematics Faculty", dept: "Academics", base: 45000, hra: 12000, ta: 3000, pf: 5400, net: 54600 },
    { id: "EMP-102", name: "Dr. Vikram Malhotra", role: "Head of Science Dept", dept: "Academics", base: 55000, hra: 15000, ta: 4000, pf: 6600, net: 67400 },
    { id: "EMP-103", name: "Ramesh Sharma", role: "Chief Accountant", dept: "Finance", base: 40000, hra: 10000, ta: 2500, pf: 4800, net: 47700 },
    { id: "EMP-104", name: "Ram Singh", role: "Senior Bus Pilot", dept: "Transport", base: 25000, hra: 6000, ta: 2000, pf: 3000, net: 30000 },
    { id: "EMP-105", name: "Kavita Verma", role: "Head Librarian", dept: "Library", base: 35000, hra: 8000, ta: 2000, pf: 4200, net: 40800 }
  ]);

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
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            HR &amp; Payroll Engine <Briefcase size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Staff payroll ledgers, automated Provident Fund (PF 12%) calculations, leave balance tracking, and printable payslip downloads.
          </p>
        </div>

        <button onClick={() => alert("Executing monthly payroll disbursement run...")} className="btn btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
          <DollarSign size={18} />
          <span>Execute Monthly Payroll</span>
        </button>
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
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Staff Monthly Salary Ledger — July 2026</h3>
            <button onClick={() => alert("Downloading bulk salary ledger excel sheet...")} className="btn btn-secondary" style={{ padding: "0.4rem 0.88rem", fontSize: "0.78rem" }}>
              <Download size={14} /> Export Payroll Ledger
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Designation Role</th>
                <th>Base Salary</th>
                <th>HRA + Allowances</th>
                <th>PF Deduction (12%)</th>
                <th>Net Payable</th>
                <th style={{ textAlign: "right" }}>Payslip Card</th>
              </tr>
            </thead>
            <tbody>
              {staffPayroll.map((emp) => (
                <tr key={emp.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>₹ {emp.base.toLocaleString("en-IN")}</td>
                  <td>₹ {(emp.hra + emp.ta).toLocaleString("en-IN")}</td>
                  <td style={{ color: "#ef4444", fontWeight: 650 }}>- ₹ {emp.pf.toLocaleString("en-IN")}</td>
                  <td style={{ color: "var(--success)", fontWeight: 800 }}>₹ {emp.net.toLocaleString("en-IN")}</td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => setSelectedStaffPayslip(emp.id)}
                      className="btn btn-primary"
                      style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}
                    >
                      <Printer size={12} /> View Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  <td style={{ fontWeight: 700, color: "#fff" }}>{l.name}</td>
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
                <th>Employee Name</th>
                <th>UAN Number</th>
                <th>Employee PF (12%)</th>
                <th>Employer PF (12%)</th>
                <th>ESI Contribution</th>
                <th>Remittance Status</th>
              </tr>
            </thead>
            <tbody>
              {pfLedger.map((pf) => (
                <tr key={pf.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{pf.name}</td>
                  <td><code style={{ fontSize: "0.85rem" }}>{pf.uan}</code></td>
                  <td style={{ fontWeight: 700 }}>₹ {pf.empPf.toLocaleString("en-IN")}</td>
                  <td style={{ fontWeight: 700 }}>₹ {pf.employerPf.toLocaleString("en-IN")}</td>
                  <td>{pf.esi > 0 ? `₹ ${pf.esi.toLocaleString("en-IN")}` : "N/A"}</td>
                  <td><span className="badge badge-success">{pf.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 4: EXPENSE CLAIMS & REIMBURSEMENTS */}
      {activeTab === "claims" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Staff Expense Reimbursement Claims</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Claim Code</th>
                <th>Staff Name</th>
                <th>Expense Category</th>
                <th>Claim Amount</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700 }}>{c.id}</td>
                  <td style={{ color: "#fff", fontWeight: 700 }}>{c.name}</td>
                  <td>{c.category}</td>
                  <td style={{ fontWeight: 700, color: "var(--success)" }}>₹ {c.amount.toLocaleString("en-IN")}</td>
                  <td>{c.date}</td>
                  <td>
                    <span className={`badge ${
                      c.status === "APPROVED" ? "badge-success" : c.status === "PENDING" ? "badge-warning" : "badge-danger"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {c.status === "PENDING" ? (
                      <div style={{ display: "flex", gap: "0.35rem", justifyContent: "flex-end" }}>
                        <button onClick={() => handleClaimAction(c.id, "APPROVED")} className="btn btn-primary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem" }}>Approve</button>
                        <button onClick={() => handleClaimAction(c.id, "REJECTED")} style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "0.3rem 0.6rem", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.72rem" }}>Reject</button>
                      </div>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ PAYSLIP MODAL / CARD ════════════ */}
      {selectedStaffPayslip && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: 520, color: "#fff", border: "2px solid var(--primary)", boxShadow: "var(--shadow-glow)" }}>
            
            {/* Header */}
            <div style={{ display: "flex", justify: "space-between", alignItems: "flex-start", borderBottom: "1.5px solid var(--border-color)", paddingBottom: "1rem" }}>
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: 850 }}>DELHI PUBLIC SCHOOL MAIN CAMPUS</div>
                <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, marginTop: 2 }}>Official Staff Salary Payslip — July 2026</div>
              </div>
              <button onClick={() => setSelectedStaffPayslip(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            {/* Employee Details */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", margin: "1rem 0", fontSize: "0.825rem", background: "rgba(255,255,255,0.01)", padding: "0.75rem", borderRadius: 8, border: "1px solid var(--border-color)" }}>
              <div>
                <div>Employee: <strong>{selectedPayslipData.name}</strong></div>
                <div style={{ marginTop: 2 }}>ID: {selectedPayslipData.id}</div>
              </div>
              <div>
                <div>Role: <strong>{selectedPayslipData.role}</strong></div>
                <div style={{ marginTop: 2 }}>Dept: {selectedPayslipData.dept}</div>
              </div>
            </div>

            {/* Breakdown table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem", margin: "1rem 0" }}>
              <thead>
                <tr style={{ borderBottom: "1.5px solid var(--border-color)", textTransform: "uppercase" }}>
                  <th style={{ textAlign: "left", padding: "0.4rem" }}>Earnings Component</th>
                  <th style={{ textAlign: "right", padding: "0.4rem" }}>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "0.4rem" }}>Basic Pay Scale</td>
                  <td style={{ textAlign: "right", padding: "0.4rem", fontWeight: 700 }}>₹ {selectedPayslipData.base.toLocaleString("en-IN")}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "0.4rem" }}>House Rent Allowance (HRA)</td>
                  <td style={{ textAlign: "right", padding: "0.4rem", fontWeight: 700 }}>₹ {selectedPayslipData.hra.toLocaleString("en-IN")}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "0.4rem" }}>Transport Allowance</td>
                  <td style={{ textAlign: "right", padding: "0.4rem", fontWeight: 700 }}>₹ {selectedPayslipData.ta.toLocaleString("en-IN")}</td>
                </tr>
                <tr style={{ borderBottom: "1.5px solid var(--border-color)", color: "#ef4444" }}>
                  <td style={{ padding: "0.4rem" }}>Provident Fund Deduction (PF 12%)</td>
                  <td style={{ textAlign: "right", padding: "0.4rem", fontWeight: 700 }}>- ₹ {selectedPayslipData.pf.toLocaleString("en-IN")}</td>
                </tr>
              </tbody>
            </table>

            {/* Total */}
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", borderTop: "1.5px solid var(--border-color)", paddingTop: "0.85rem" }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 800 }}>NET SALARY DISBURSED</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--success)" }}>₹ {selectedPayslipData.net.toLocaleString("en-IN")}</div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem" }}>
              <button onClick={() => window.print()} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                <Printer size={16} /> Print Payslip
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
