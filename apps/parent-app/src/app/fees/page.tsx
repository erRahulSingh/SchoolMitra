"use client";

import React, { useState } from "react";
import { 
  CreditCard, Wallet, Download, CheckCircle2, AlertCircle, 
  Sparkles, ArrowRight, ShieldCheck, FileText, QrCode, 
  Smartphone, Building, RefreshCw, Check, ArrowUpRight
} from "lucide-react";

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "history" | "onlinePay" | "receipts">("dashboard");
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);

  const pastTransactions = [
    { id: "TXN-2026-0812", name: "Quarter 1 Academic Tuition & GPS", amount: 18500, date: "10 April 2026", method: "UPI / PhonePe", status: "Success" },
    { id: "TXN-2026-0341", name: "Annual Admission & Registration", amount: 5000, date: "15 March 2026", method: "HDFC Net Banking", status: "Success" }
  ];

  const handleOnlinePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaid(true);
      setPaying(false);
      setActiveTab("dashboard");
    }, 1200);
  };

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>Fees & Payments</h2>
            <span style={{ background: paid ? "rgba(16,185,129,0.2)" : "rgba(251,191,36,0.2)", color: paid ? "#059669" : "#d97706", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              {paid ? "ALL CLEAR" : "DUE SOON"}
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Aarav Sharma • Class 10-A • Session 2026
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="banner-sub" style={{ fontSize: "0.68rem", fontWeight: 700 }}>PENDING BALANCE</div>
          <div style={{ fontSize: "1.35rem", fontWeight: 900, color: paid ? "#059669" : "#dc2626", marginTop: 1 }}>
            {paid ? "₹ 0" : "₹ 18,500"}
          </div>
        </div>
      </div>

      {/* ════════════ 4-TAB SUB-NAVIGATION BAR ════════════ */}
      <div className="subtab-bar" style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.35rem",
        padding: "0.35rem", borderRadius: 16
      }}>
        {[
          { id: "dashboard", label: "Dashboard", icon: CreditCard },
          { id: "history", label: "History", icon: Wallet },
          { id: "onlinePay", label: "Pay Online", icon: Smartphone },
          { id: "receipts", label: "Receipts", icon: FileText }
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: "0.55rem 0.35rem", borderRadius: 12, border: "none",
              background: activeTab === t.id ? "linear-gradient(135deg, #4f46e5, #3b82f6)" : "transparent",
              color: activeTab === t.id ? "#fff" : "var(--card-subtext)",
              fontSize: "0.72rem", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem",
              cursor: "pointer",
              boxShadow: activeTab === t.id ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none"
            }}
          >
            <t.icon size={14} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ════════════ SCREEN 1: FEE DASHBOARD ════════════ */}
      {activeTab === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card-ui" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: paid ? "#059669" : "#dc2626", textTransform: "uppercase" }}>
                {paid ? "INVOICE PAID IN FULL" : "QUARTER 2 INVOICE DUE"}
              </div>
              {!paid && (
                <span style={{ fontSize: "0.72rem", color: "#d97706", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <AlertCircle size={14} /> Due 10 Aug 2026
                </span>
              )}
            </div>

            <div className="text-title" style={{ fontSize: "1.8rem", fontWeight: 900 }}>
              {paid ? "₹ 0.00" : "₹ 18,500.00"}
            </div>
            <div className="text-muted-custom" style={{ fontSize: "0.75rem", marginTop: 2 }}>
              {paid ? "Paid on 28 July 2026 via UPI Gateway" : "Includes Tuition, GPS Bus Transport & Lab Fees"}
            </div>

            <div className="subbox-ui" style={{ padding: "0.85rem", margin: "1rem 0 0.85rem 0", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                <span className="text-muted-custom">Quarter 2 Academic Tuition</span>
                <span className="text-title" style={{ fontWeight: 700 }}>₹ 14,500</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                <span className="text-muted-custom">GPS Bus Transport (Route 1)</span>
                <span className="text-title" style={{ fontWeight: 700 }}>₹ 3,000</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                <span className="text-muted-custom">Physics & Computer Lab Fee</span>
                <span className="text-title" style={{ fontWeight: 700 }}>₹ 1,000</span>
              </div>
            </div>

            {!paid && (
              <button
                type="button"
                onClick={() => setActiveTab("onlinePay")}
                style={{
                  width: "100%", padding: "0.8rem", borderRadius: 12, border: "none",
                  background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff",
                  fontWeight: 800, fontSize: "0.88rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
                  boxShadow: "0 6px 20px rgba(16, 185, 129, 0.35)"
                }}
              >
                <span>Proceed to Pay ₹ 18,500 Online</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ════════════ SCREEN 2: FEE HISTORY ════════════ */}
      {activeTab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {pastTransactions.map((txn, i) => (
            <div key={i} className="card-ui" style={{ padding: "1rem 1.1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="text-title" style={{ fontSize: "0.88rem", fontWeight: 800 }}>{txn.name}</div>
                <div className="text-muted-custom" style={{ fontSize: "0.72rem", marginTop: 2 }}>Paid on {txn.date} • {txn.method}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#059669" }}>₹ {txn.amount.toLocaleString("en-IN")}</div>
                <span style={{ background: "rgba(16,185,129,0.15)", color: "#059669", padding: "0.1rem 0.5rem", borderRadius: 6, fontSize: "0.68rem", fontWeight: 800, marginTop: 2, display: "inline-block" }}>
                  SUCCESS
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
