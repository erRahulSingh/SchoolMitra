"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Download, 
  ChevronRight, 
  X, 
  Check, 
  AlertTriangle, 
  MoreVertical,
  Filter,
  CheckCircle2,
  Smartphone,
  CreditCard,
  Building
} from "lucide-react";

interface FeesPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

interface Invoice {
  id: string;
  dueDate: string;
  feeType: string;
  amount: number;
  lateFee: number;
  total: number;
}

interface Receipt {
  id: string;
  date: string;
  feeType: string;
  amount: number;
  mode: string;
  txnId: string;
}

export default function FeesPage({ language = "en", onNavigate }: FeesPageProps) {
  const isHi = language === "hi";

  // Navigation sub-view: "invoices" | "history" | "receipt"
  const [view, setView] = useState<"invoices" | "history" | "receipt">("invoices");

  // Options popover menu trigger
  const [showOptions, setShowOptions] = useState(false);

  // checkout modals state
  const [showCheckout, setShowCheckout] = useState(false);
  const [payMethod, setPayMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  // Selected receipt detail reference
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  // Active Dues state
  const [dueInvoices, setDueInvoices] = useState<Invoice[]>([
    {
      id: "#INV12560",
      dueDate: "15 Jun 2025",
      feeType: "Tuition Fee (Jun 2025)",
      amount: 8000,
      lateFee: 0,
      total: 8000
    }
  ]);

  // Payment history items matching reference screenshot
  const [paymentHistory, setPaymentHistory] = useState<Receipt[]>([
    { id: "#RCP12580", date: "15 May 2025", feeType: "Tuition Fee (May)", amount: 8000, mode: "UPI", txnId: "UPI1234567890" },
    { id: "#RCP12410", date: "15 Apr 2025", feeType: "Tuition Fee (Apr)", amount: 8000, mode: "Card", txnId: "CRD9876543210" },
    { id: "#RCP12250", date: "15 Mar 2025", feeType: "Tuition Fee (Mar)", amount: 8000, mode: "Net Banking", txnId: "NBK4561237890" },
    { id: "#RCP12030", date: "15 Feb 2025", feeType: "Tuition Fee (Feb)", amount: 8000, mode: "UPI", txnId: "UPI2583691470" },
    { id: "#RCP11890", date: "15 Jan 2025", feeType: "Tuition Fee (Jan)", amount: 8000, mode: "UPI", txnId: "UPI3691472580" },
    { id: "#RCP11720", date: "15 Dec 2024", feeType: "Tuition Fee (Dec)", amount: 8000, mode: "Card", txnId: "CRD1472583690" }
  ]);

  const handlePayNowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowCheckout(false);

      // Create newly paid receipt details
      const targetInvoice = dueInvoices[0] || { id: "#INV12560", feeType: "Tuition Fee (Jun 2025)", amount: 8000 };
      const newReceipt: Receipt = {
        id: `#RCP${Math.floor(12581 + Math.random() * 999)}`,
        date: new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
        feeType: targetInvoice.feeType.replace(" (Jun 2025)", " (Jun)"),
        amount: targetInvoice.amount,
        mode: payMethod.toUpperCase(),
        txnId: `${payMethod.toUpperCase()}${Math.floor(1000000000 + Math.random() * 9000000000)}`
      };

      // Add to paid history and clear active dues
      setPaymentHistory([newReceipt, ...paymentHistory]);
      setDueInvoices([]);

      // Auto route to this newly paid receipt
      setSelectedReceipt(newReceipt);
      setView("receipt");
    }, 1500);
  };

  const handleReceiptRowClick = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setView("receipt");
  };

  // Calculations
  const activeDueSum = dueInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaidSum = paymentHistory.reduce((sum, rec) => sum + rec.amount, 0);

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%",
      width: "100%"
    }}>

      {/* ══════════════ VIEW 1: DUE INVOICES ══════════════ */}
      {view === "invoices" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", width: "100%" }}>
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.2rem 0.1rem 0.4rem 0.1rem",
            borderBottom: "1px solid #f1f5f9",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate("home") : window.history.back()}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0", color: "#0f172a" }}
              >
                <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
              </button>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
                Due Invoices
              </h1>
            </div>

            <button
              onClick={() => setShowOptions(!showOptions)}
              style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0.2rem" }}
            >
              <MoreVertical size={22} color="#0f172a" strokeWidth={2} />
            </button>

            {/* Dropdown Options Popover */}
            {showOptions && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: 0,
                background: "#ffffff",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                boxShadow: "0 4px 14px rgba(15,23,42,0.06)",
                zIndex: 30,
                minWidth: "150px"
              }}>
                <button
                  onClick={() => {
                    setView("history");
                    setShowOptions(false);
                  }}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    padding: "0.7rem 0.9rem",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#1d4ed8",
                    cursor: "pointer"
                  }}
                >
                  Payment History
                </button>
              </div>
            )}
          </div>

          {/* Red Total Due Card */}
          <div style={{
            background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 55%, #be123c 100%)",
            borderRadius: "22px",
            padding: "1.35rem 1.25rem",
            color: "#ffffff",
            boxShadow: "0 10px 25px -4px rgba(225, 29, 72, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#ffe4e6" }}>Total Due</span>
              <span style={{ fontSize: "1.9rem", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
                ₹ {activeDueSum.toLocaleString("en-IN")}
              </span>
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#ffe4e6", marginTop: "2px" }}>
                {dueInvoices.length} {dueInvoices.length === 1 ? "Invoice Pending" : "Invoices Pending"}
              </span>
            </div>

            {activeDueSum > 0 && (
              <button
                onClick={() => setShowCheckout(true)}
                style={{
                  background: "#ffffff",
                  color: "#e11d48",
                  border: "none",
                  borderRadius: "99px",
                  padding: "0.6rem 1.3rem",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  whiteSpace: "nowrap"
                }}
              >
                Pay Now
              </button>
            )}
          </div>

          {/* Due Invoices List */}
          {dueInvoices.length === 0 ? (
            <div style={{
              padding: "3rem 1rem",
              textAlign: "center",
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              color: "#64748b",
              fontSize: "0.88rem"
            }}>
              No outstanding dues left. All invoices are paid!
            </div>
          ) : (
            dueInvoices.map((inv) => (
              <div
                key={inv.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  padding: "1.25rem",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.1rem"
                }}
              >
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#1e3a8a", fontFamily: "'Outfit', sans-serif" }}>
                  Invoice {inv.id}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1.1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span style={{ color: "#64748b", fontWeight: 500 }}>Due Date</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>{inv.dueDate}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span style={{ color: "#64748b", fontWeight: 500 }}>Fee Type</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>{inv.feeType}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span style={{ color: "#64748b", fontWeight: 500 }}>Amount</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>₹ {inv.amount.toLocaleString("en-IN")}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span style={{ color: "#64748b", fontWeight: 500 }}>Late Fee</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>₹ {inv.lateFee}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", paddingTop: "0.4rem", borderTop: "1px dashed #cbd5e1" }}>
                    <span style={{ color: "#64748b", fontWeight: 700 }}>Total Amount</span>
                    <span style={{ fontWeight: 800, color: "#1e3a8a" }}>₹ {inv.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <button
                    onClick={() => alert(`Previewing invoice ${inv.id}...`)}
                    style={{
                      background: "#eff6ff",
                      color: "#1d4ed8",
                      border: "none",
                      borderRadius: "12px",
                      padding: "0.75rem",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      cursor: "pointer"
                    }}
                  >
                    View Invoice
                  </button>
                  <button
                    onClick={() => setShowCheckout(true)}
                    style={{
                      background: "#1d4ed8",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "12px",
                      padding: "0.75rem",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(29, 78, 216, 0.2)"
                    }}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Warning Alert banner */}
          {dueInvoices.length > 0 && (
            <div style={{
              background: "#fff7ed",
              borderRadius: "12px",
              border: "1px solid #ffedd5",
              padding: "0.8rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem"
            }}>
              <AlertTriangle size={18} color="#ea580c" />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#9a3412" }}>
                Pay before due date to avoid late fee.
              </span>
            </div>
          )}
        </div>
      )}

      {/* ══════════════ VIEW 2: PAYMENT HISTORY ══════════════ */}
      {view === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", width: "100%" }}>
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.2rem 0.1rem 0.4rem 0.1rem",
            borderBottom: "1px solid #f1f5f9"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <button
                type="button"
                onClick={() => setView("invoices")}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0", color: "#0f172a" }}
              >
                <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
              </button>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
                Payment History
              </h1>
            </div>

            <button
              onClick={() => alert("Funnel Filters Triggered")}
              style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0.2rem" }}
            >
              <Filter size={22} color="#0f172a" strokeWidth={2} />
            </button>
          </div>

          {/* Stats boxes row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            <div style={{
              background: "#f1f5f9",
              borderRadius: "14px",
              padding: "0.85rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700 }}>Total Paid</div>
              <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginTop: "3px", fontFamily: "'Outfit', sans-serif" }}>
                ₹{totalPaidSum.toLocaleString("en-IN")}
              </div>
            </div>

            <div style={{
              background: "#f1f5f9",
              borderRadius: "14px",
              padding: "0.85rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700 }}>Total Transactions</div>
              <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginTop: "3px", fontFamily: "'Outfit', sans-serif" }}>
                {paymentHistory.length}
              </div>
            </div>
          </div>

          {/* History items card stack */}
          <div style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
            overflow: "hidden"
          }}>
            {paymentHistory.map((rec, idx) => {
              const isLast = idx === paymentHistory.length - 1;
              return (
                <div
                  key={rec.id}
                  onClick={() => handleReceiptRowClick(rec)}
                  style={{
                    padding: "1rem 1.15rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                    cursor: "pointer"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#475569" }}>
                      {rec.date}
                    </div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>
                      {rec.feeType}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px", fontWeight: 500 }}>
                      Receipt {rec.id}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginRight: "3px" }}>
                      ₹{rec.amount.toLocaleString("en-IN")}
                    </span>

                    <span style={{
                      background: "#dcfce7",
                      color: "#15803d",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "99px",
                      fontSize: "0.7rem",
                      fontWeight: 800
                    }}>
                      Paid
                    </span>

                    <ChevronRight size={18} color="#cbd5e1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════ VIEW 3: FEE RECEIPT ══════════════ */}
      {view === "receipt" && selectedReceipt && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", width: "100%" }}>
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.2rem 0.1rem 0.4rem 0.1rem",
            borderBottom: "1px solid #f1f5f9"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <button
                type="button"
                onClick={() => setView("history")}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0", color: "#0f172a" }}
              >
                <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
              </button>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
                Fee Receipt
              </h1>
            </div>

            <button
              onClick={() => alert("Downloading receipt copy...")}
              style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0.2rem" }}
            >
              <Download size={22} color="#0f172a" strokeWidth={2} />
            </button>
          </div>

          {/* Success Card banner */}
          <div style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            borderRadius: "22px",
            padding: "1.25rem",
            color: "#ffffff",
            boxShadow: "0 10px 25px rgba(5, 150, 105, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: "1.1rem"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <CheckCircle2 size={28} color="#ffffff" strokeWidth={2.5} />
            </div>

            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0 }}>Payment Successful</h3>
              <p style={{ fontSize: "0.78rem", opacity: 0.95, margin: "2px 0 0 0", fontWeight: 600 }}>
                Receipt No. {selectedReceipt.id}
              </p>
              <p style={{ fontSize: "0.72rem", opacity: 0.85, margin: "2px 0 0 0", fontWeight: 500 }}>
                {selectedReceipt.date}, 10:30 AM
              </p>
            </div>
          </div>

          {/* Payment Details card panel */}
          <div style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            padding: "1.25rem",
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", margin: 0 }}>
              Payment Details
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#64748b", fontWeight: 500 }}>Student Name</span>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>Rohan Sharma</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#64748b", fontWeight: 500 }}>Class</span>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>5th – A</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#64748b", fontWeight: 500 }}>Academic Year</span>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>2024-25</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#64748b", fontWeight: 500 }}>Fee Type</span>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>{selectedReceipt.feeType.includes("Tuition Fee") ? `Tuition Fee (${selectedReceipt.date.split(" ")[1]} 2025)` : selectedReceipt.feeType}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#64748b", fontWeight: 500 }}>Amount</span>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>₹ {selectedReceipt.amount.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#64748b", fontWeight: 500 }}>Payment Mode</span>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>{selectedReceipt.mode}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#64748b", fontWeight: 500 }}>Transaction ID</span>
                <span style={{ fontWeight: 800, color: "#1e3a8a" }}>{selectedReceipt.txnId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#64748b", fontWeight: 500 }}>Status</span>
                <span style={{
                  background: "#dcfce7",
                  color: "#15803d",
                  padding: "0.15rem 0.55rem",
                  borderRadius: "99px",
                  fontSize: "0.7rem",
                  fontWeight: 800
                }}>
                  Paid
                </span>
              </div>
            </div>
          </div>

          {/* Download Receipt Full width button */}
          <button
            onClick={() => alert("Downloading receipt document...")}
            style={{
              width: "100%",
              padding: "0.9rem",
              background: "#1d4ed8",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontSize: "0.92rem",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)"
            }}
          >
            Download Receipt
          </button>
        </div>
      )}

      {/* ════════════ CHECKOUT MODAL POPUP ════════════ */}
      {showCheckout && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div style={{
            width: "100%", maxWidth: "440px", background: "#ffffff",
            borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            padding: "1.25rem 1.25rem 2rem 1.25rem", maxHeight: "85vh", overflowY: "auto",
            animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CreditCard size={22} color="#1d4ed8" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Select Payment Method</h3>
              </div>
              <button type="button" onClick={() => setShowCheckout(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Payable Summary Box */}
            <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "16px", padding: "1rem", color: "#fff", marginBottom: "1.2rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>AMOUNT PAYABLE</div>
              <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#fff", margin: "2px 0" }}>₹ 8,000</div>
              <div style={{ fontSize: "0.74rem", color: "#cbd5e1" }}>Rohan Sharma • Class 5th - A</div>
            </div>

            {/* Payment Method Selector */}
            <form onSubmit={handlePayNowSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { id: "upi", title: "UPI (Google Pay / PhonePe / Paytm)", icon: Smartphone },
                { id: "card", title: "Credit / Debit Card", icon: CreditCard },
                { id: "netbanking", title: "Net Banking", icon: Building }
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setPayMethod(m.id as any)}
                  style={{
                    padding: "0.85rem 1rem", borderRadius: "14px",
                    border: payMethod === m.id ? "2px solid #1d4ed8" : "1px solid #cbd5e1",
                    background: payMethod === m.id ? "#eff6ff" : "#ffffff",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <m.icon size={20} color={payMethod === m.id ? "#1d4ed8" : "#64748b"} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>{m.title}</span>
                  </div>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: payMethod === m.id ? "5px solid #1d4ed8" : "2px solid #cbd5e1", background: "#fff" }} />
                </div>
              ))}

              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  width: "100%", marginTop: "1rem", padding: "0.85rem",
                  background: "linear-gradient(135deg, #1d4ed8, #1e3a8a)",
                  border: "none", borderRadius: "14px", color: "#fff",
                  fontWeight: 800, fontSize: "0.88rem", cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(29, 78, 216, 0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem"
                }}
              >
                <span>{isProcessing ? "Processing Secure Payment..." : "Pay ₹ 8,000 Now"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
