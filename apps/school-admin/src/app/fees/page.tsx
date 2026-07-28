"use client";

import { useState } from "react";
import { CreditCard, DollarSign, CheckCircle2, Clock, AlertCircle, Plus, Search, Download } from "lucide-react";
import { MOCK_FEES, FeeRecord } from "@/lib/mockData";

export default function FeesPage() {
  const [fees, setFees] = useState<FeeRecord[]>(MOCK_FEES);
  const [filterTab, setFilterTab] = useState<"All" | "Paid" | "Pending" | "Overdue">("All");
  const [search, setSearch] = useState("");

  const filteredFees = fees.filter((f) => {
    const matchesTab = filterTab === "All" || f.status === filterTab;
    const matchesSearch = f.studentName.toLowerCase().includes(search.toLowerCase()) || 
                          f.rollNo.toLowerCase().includes(search.toLowerCase()) ||
                          f.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalCollected = fees.filter(f => f.status === 'Paid').reduce((acc, f) => acc + f.amount, 0);
  const totalPending = fees.filter(f => f.status === 'Pending').reduce((acc, f) => acc + f.amount, 0);
  const totalOverdue = fees.filter(f => f.status === 'Overdue').reduce((acc, f) => acc + f.amount, 0);

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Fee Collection & Invoicing</h1>
          <p>Track school fee structures, due invoices, online payments, and instant receipts.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          <span>Generate New Invoice</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <h4>Total Fees Collected</h4>
            <div className="stat-value">₹ {totalCollected.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h4>Pending Dues (This Quarter)</h4>
            <div className="stat-value">₹ {totalPending.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <h4>Overdue Payments</h4>
            <div className="stat-value">₹ {totalOverdue.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(["All", "Paid", "Pending", "Overdue"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: filterTab === tab ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                color: filterTab === tab ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Search invoice or student..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Student</th>
                <th>Class</th>
                <th>Fee Details</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.map((fee) => (
                <tr key={fee.id}>
                  <td style={{ fontWeight: 600, fontFamily: 'monospace' }}>{fee.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{fee.studentName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Roll: {fee.rollNo}</div>
                  </td>
                  <td>
                    <span className="badge badge-info">{fee.class}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{fee.type}</td>
                  <td style={{ fontWeight: 700, fontSize: '0.95rem' }}>₹ {fee.amount.toLocaleString('en-IN')}</td>
                  <td>{fee.dueDate}</td>
                  <td>
                    <span className={`badge ${
                      fee.status === 'Paid' ? 'badge-success' : fee.status === 'Pending' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                      <Download size={12} />
                      <span>Receipt</span>
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
