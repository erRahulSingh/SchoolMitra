"use client";

import React, { useState } from "react";
import { 
  HelpCircle, PlusCircle, Clock, CheckCircle2, MessageSquare, 
  FileText, Send, ChevronRight, AlertCircle, Calendar, 
  CreditCard, Bus, Award, User, Sparkles, Upload,
  Check, Download, XCircle, ArrowLeft, Paperclip, Search, ChevronDown
} from "lucide-react";

export default function ParentSupportRequestsPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "select-category" | "new-request" | "my-requests" | "faqs">("dashboard");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  // COMMON FORM FIELDS
  const [selectedStudent, setSelectedStudent] = useState("Rahul Sharma (Class 5-A)");
  const [priority, setPriority] = useState("Medium");
  const [attachmentName, setAttachmentName] = useState("");
  const [fileSizeError, setFileSizeError] = useState("");
  const [replyText, setReplyText] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  // EXAMPLE DYNAMIC FORM FIELDS
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("Marked Absent By Mistake");
  const [attendanceRemarks, setAttendanceRemarks] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [feeAmount, setFeeAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [feeDescription, setFeeDescription] = useState("");
  const [examName, setExamName] = useState("Mid-Term 2026");
  const [subjectName, setSubjectName] = useState("Mathematics");
  const [examIssueType, setExamIssueType] = useState("Marksheet Correction");
  const [reportDescription, setReportDescription] = useState("");
  const [busNo, setBusNo] = useState("Bus #01 (DL 01 AB 4321)");
  const [busRoute, setBusRoute] = useState("Route 1 - Dwarka Sector 12");
  const [busDate, setBusDate] = useState("");
  const [busTime, setBusTime] = useState("");
  const [busIssueDescription, setBusIssueDescription] = useState("");
  const [generalSubject, setGeneralSubject] = useState("");
  const [generalDescription, setGeneralDescription] = useState("");

  const CATEGORIES = [
    { id: "cat1", title: "Attendance Issue", icon: Calendar, color: "#6366f1", bg: "rgba(99, 102, 241, 0.12)", desc: "Attendance discrepancy or absence correction" },
    { id: "cat2", title: "Leave Application", icon: FileText, color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.12)", desc: "Sick leave or planned absence request" },
    { id: "cat3", title: "Fee & Payment Issue", icon: CreditCard, color: "#10b981", bg: "rgba(16, 185, 129, 0.12)", desc: "Payment receipt or fee breakdown query" },
    { id: "cat4", title: "Exam & Report Card", icon: Award, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)", desc: "Marksheet correction or grade re-evaluation" },
    { id: "cat5", title: "Homework", icon: HelpCircle, color: "#ec4899", bg: "rgba(236, 72, 153, 0.12)", desc: "Homework assignments & subject queries" },
    { id: "cat6", title: "Bus / Transport", icon: Bus, color: "#06b6d4", bg: "rgba(6, 182, 212, 0.12)", desc: "Bus stop change, route delay, or driver feedback" },
    { id: "cat7", title: "Student Information", icon: User, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.12)", desc: "Update parent phone, address, or profile info" },
    { id: "cat8", title: "Complaint", icon: AlertCircle, color: "#ef4444", bg: "rgba(239, 68, 68, 0.12)", desc: "Escalate concerns to school management" },
    { id: "cat9", title: "Suggestion", icon: Sparkles, color: "#14b8a6", bg: "rgba(20, 184, 166, 0.12)", desc: "Share feedback to improve school operations" },
    { id: "cat10", title: "General Inquiry", icon: MessageSquare, color: "#64748b", bg: "rgba(100, 116, 139, 0.12)", desc: "General administrative questions" }
  ];

  const [requests, setRequests] = useState([
    {
      id: "REQ-2026-901",
      category: "Fee & Payment Issue",
      subject: "Fee payment receipt verification for Q1 Fee (₹ 18,500)",
      status: "In Progress",
      priority: "High",
      createdDate: "28 Jul 2026, 08:15 AM",
      lastReply: "Today, 09:30 AM by Accounts Office",
      currentStep: 3,
      files: [
        { name: "UPI_Payment_Proof.png", size: "1.4 MB", type: "PNG", url: "#" },
        { name: "Official_Fee_Receipt_REC99401.pdf", size: "450 KB", type: "PDF", url: "#", uploadedBy: "School" }
      ],
      messages: [
        { sender: "Parent (Vijay Sharma)", role: "Parent", text: "Paid ₹ 18,500 via UPI yesterday. Invoice #INV-2026-9901.", time: "08:15 AM" },
        { sender: "Accounts Office", role: "SchoolAdmin", text: "Your fee payment has been verified.\nReceipt attached below.\nThank you.", time: "09:30 AM" }
      ]
    },
    {
      id: "REQ-2026-844",
      category: "Leave Application",
      subject: "Sick leave application for Rahul Sharma (24-25 Jul)",
      status: "Resolved",
      priority: "Urgent",
      createdDate: "24 Jul 2026, 09:00 AM",
      lastReply: "25 Jul 2026, 10:15 AM by Class Teacher",
      currentStep: 5,
      files: [
        { name: "Doctor_Medical_Note.pdf", size: "2.1 MB", type: "PDF", url: "#" }
      ],
      messages: [
        { sender: "Parent (Vijay Sharma)", role: "Parent", text: "Rahul is suffering from viral fever and doctor advised 2 days rest (24-25 Jul). Doctor note attached.", time: "24 Jul, 09:00 AM" },
        { sender: "Class Teacher (Sunita Rao)", role: "Teacher", text: "Leave application approved. Get well soon Rahul!", time: "25 Jul, 10:15 AM" }
      ]
    }
  ]);

  const handleStartNewRequest = (catTitle: string) => {
    setSelectedCategory(catTitle);
    setActiveTab("new-request");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileSizeError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ["application/pdf", "image/jpeg", "image/png", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!validTypes.includes(file.type)) {
        setFileSizeError("Only PDF, JPG, PNG, DOCX files allowed!");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setFileSizeError("File size exceeds 10 MB limit!");
        return;
      }
      setAttachmentName(file.name);
    }
  };

  const handleSubmitDynamicForm = (e: React.FormEvent) => {
    e.preventDefault();

    let generatedSubject = `[${selectedCategory}] Request for ${selectedStudent}`;
    let generatedDetails = "";

    if (selectedCategory === "Leave Application") {
      generatedSubject = `Leave Application: ${selectedStudent} (${leaveFrom} to ${leaveTo})`;
      generatedDetails = `Student: ${selectedStudent}\nLeave From: ${leaveFrom}\nLeave To: ${leaveTo}\nReason: ${leaveReason}\nPriority: ${priority}`;
    } else if (selectedCategory === "Fee & Payment Issue") {
      generatedSubject = `Fee Issue: Invoice #${invoiceNo || "INV-9901"}`;
      generatedDetails = `Invoice Number: ${invoiceNo}\nPayment Date: ${paymentDate}\nAmount: ₹${feeAmount}\nTransaction ID: ${transactionId}\nDescription: ${feeDescription}`;
    } else {
      generatedSubject = `${selectedCategory}: ${generalSubject || selectedStudent}`;
      generatedDetails = `Category: ${selectedCategory}\nStudent: ${selectedStudent}\nMessage: ${generalDescription}`;
    }

    const newReq = {
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      category: selectedCategory,
      subject: generatedSubject,
      status: "Submitted",
      priority,
      createdDate: "Just now",
      lastReply: "Just now by Parent",
      currentStep: 1,
      files: attachmentName ? [{ name: attachmentName, size: "1.2 MB", type: attachmentName.endsWith(".pdf") ? "PDF" : "PNG", url: "#" }] : [],
      messages: [
        { sender: "Parent (Vijay Sharma)", role: "Parent", text: generatedDetails, time: "Just now" }
      ]
    };

    setRequests([newReq, ...requests]);
    setSelectedTicket(newReq);
    setActiveTab("my-requests");
  };

  const handleParentChatReply = () => {
    if (!replyText || !selectedTicket) return;
    const updated = requests.map(r => {
      if (r.id === selectedTicket.id) {
        return {
          ...r,
          status: "In Progress",
          currentStep: 4,
          lastReply: `Just now by Parent`,
          messages: [...r.messages, { sender: "Parent (Vijay Sharma)", role: "Parent", text: replyText, time: "Just now" }]
        };
      }
      return r;
    });
    setRequests(updated);
    setSelectedTicket(updated.find(r => r.id === selectedTicket.id));
    setReplyText("");
  };

  const handleCloseTicket = (id: string) => {
    const updated = requests.map(r => r.id === id ? { ...r, status: "Closed", currentStep: 5 } : r);
    setRequests(updated);
    if (selectedTicket?.id === id) {
      setSelectedTicket((prev: any) => prev ? { ...prev, status: "Closed", currentStep: 5 } : null);
    }
  };

  return (
    <div style={{
      maxWidth: "480px",
      margin: "0 auto",
      padding: "0.75rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>
      
      {/* ════════════ ELEGANT MOBILE APP HEADER ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
        borderRadius: "20px",
        padding: "1.25rem",
        color: "#ffffff",
        boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(255,255,255,0.2)", padding: "0.2rem 0.6rem", borderRadius: "99px" }}>
              Parent Support Portal
            </span>

            {activeTab !== "dashboard" && (
              <button
                onClick={() => setActiveTab("dashboard")}
                style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#ffffff", borderRadius: "50%", padding: "0.3rem", display: "flex", cursor: "pointer" }}
              >
                <ArrowLeft size={16} />
              </button>
            )}
          </div>

          <h1 style={{ fontSize: "1.35rem", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
            Help &amp; Requests Center
          </h1>
          <p style={{ fontSize: "0.78rem", opacity: 0.9, marginTop: 4, lineHeight: 1.3 }}>
            Submit queries, leave notes &amp; track real-time resolution from school.
          </p>

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <button
              onClick={() => setActiveTab("select-category")}
              style={{
                flex: 1, padding: "0.6rem", borderRadius: "12px", background: "#ffffff",
                color: "#4f46e5", fontWeight: 800, fontSize: "0.8rem", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)", cursor: "pointer"
              }}
            >
              <PlusCircle size={16} />
              <span>Raise Request</span>
            </button>

            <button
              onClick={() => setActiveTab("my-requests")}
              style={{
                padding: "0.6rem 1rem", borderRadius: "12px", background: "rgba(255,255,255,0.2)",
                color: "#ffffff", fontWeight: 800, fontSize: "0.8rem", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem",
                cursor: "pointer"
              }}
            >
              <Clock size={16} />
              <span>History ({requests.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ════════════ SCREEN 1: SUPPORT DASHBOARD ════════════ */}
      {activeTab === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-heading)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Quick Actions
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            
            {/* ACTION CARD 1: NEW REQUEST */}
            <div
              onClick={() => setActiveTab("select-category")}
              style={{
                padding: "1.1rem", borderRadius: "16px", background: "var(--btn-secondary-bg)",
                border: "1px solid var(--border-color)", cursor: "pointer", display: "flex",
                flexDirection: "column", gap: "0.5rem", transition: "transform 0.2s ease"
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: "12px", background: "rgba(99, 102, 241, 0.15)", color: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PlusCircle size={22} />
              </div>
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--text-heading)" }}>New Request</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>Leave, Fees, Bus, Exam queries</div>
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#6366f1", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: 2 }}>
                <span>Select Category</span> <ChevronRight size={14} />
              </div>
            </div>

            {/* ACTION CARD 2: MY REQUESTS */}
            <div
              onClick={() => setActiveTab("my-requests")}
              style={{
                padding: "1.1rem", borderRadius: "16px", background: "var(--btn-secondary-bg)",
                border: "1px solid var(--border-color)", cursor: "pointer", display: "flex",
                flexDirection: "column", gap: "0.5rem", transition: "transform 0.2s ease"
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: "12px", background: "rgba(6, 182, 212, 0.15)", color: "#06b6d4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Clock size={22} />
              </div>
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--text-heading)" }}>My Requests</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{requests.length} active request threads</div>
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#06b6d4", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: 2 }}>
                <span>Track Progress</span> <ChevronRight size={14} />
              </div>
            </div>

          </div>

          {/* RECENT REQUEST HIGHLIGHT */}
          <div style={{ padding: "1.1rem", borderRadius: "16px", background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--text-heading)" }}>Recent Support Tickets</span>
              <button onClick={() => setActiveTab("my-requests")} style={{ background: "none", border: "none", color: "#6366f1", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}>
                View All
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {requests.slice(0, 2).map(req => (
                <div
                  key={req.id}
                  onClick={() => { setSelectedTicket(req); setActiveTab("my-requests"); }}
                  style={{ padding: "0.75rem 0.85rem", borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--border-color)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "#6366f1", fontWeight: 800 }}>{req.id} &bull; {req.category}</div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)", marginTop: 2 }}>{req.subject}</div>
                  </div>
                  <span style={{ padding: "0.15rem 0.45rem", borderRadius: 6, fontSize: "0.68rem", fontWeight: 800, background: req.status === "Resolved" ? "var(--success-bg)" : "rgba(99, 102, 241, 0.15)", color: req.status === "Resolved" ? "var(--success)" : "#6366f1" }}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ════════════ SCREEN 2: SELECT CATEGORY ════════════ */}
      {activeTab === "select-category" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Select Category</h2>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>Choose a category below to open a specialized form.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                onClick={() => handleStartNewRequest(cat.title)}
                style={{
                  padding: "0.85rem 1rem", borderRadius: "14px", background: "var(--btn-secondary-bg)",
                  border: "1px solid var(--border-color)", cursor: "pointer", display: "flex",
                  gap: "0.75rem", alignItems: "center", transition: "all 0.2s ease"
                }}
              >
                <div style={{ width: 38, height: 38, borderRadius: "12px", background: cat.bg, color: cat.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <cat.icon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>{cat.title}</h4>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2, lineHeight: 1.3 }}>{cat.desc}</p>
                </div>
                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════ SCREEN 3: DYNAMIC FORM ════════════ */}
      {activeTab === "new-request" && (
        <div style={{ padding: "1.25rem", borderRadius: "18px", background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)" }}>
          <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#6366f1", textTransform: "uppercase" }}>Category Form</span>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-heading)", marginTop: 2, margin: 0 }}>
              {selectedCategory}
            </h2>
          </div>

          <form onSubmit={handleSubmitDynamicForm} style={{ display: "flex", flexDirection: "column", gap: "0.95rem" }}>
            
            {/* STUDENT */}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)" }}>STUDENT</label>
              <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: 10, border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)", marginTop: 4, fontSize: "0.85rem", fontWeight: 700 }}>
                <option value="Rahul Sharma (Class 5-A)">Rahul Sharma (Class 5-A)</option>
              </select>
            </div>

            {/* PRIORITY LEVEL */}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)" }}>PRIORITY LEVEL</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: 10, border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)", marginTop: 4, fontSize: "0.85rem", fontWeight: 700 }}>
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
                <option value="Urgent">Urgent Priority (Escalated Alert)</option>
              </select>
            </div>

            {/* ATTACHMENT */}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)" }}>ATTACHMENT (PDF, JPG, PNG, DOCX &bull; MAX 10 MB)</label>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginTop: 4 }}>
                <input type="file" onChange={handleFileChange} id="req-attachment" accept=".pdf,.jpg,.jpeg,.png,.docx" style={{ display: "none" }} />
                <label htmlFor="req-attachment" style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: 10, border: "1px dashed #6366f1", background: "rgba(99, 102, 241, 0.08)", color: "#6366f1", fontWeight: 800, fontSize: "0.78rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <Upload size={15} />
                  <span>{attachmentName || "Choose File Attachment"}</span>
                </label>
              </div>
              {fileSizeError && <span style={{ fontSize: "0.72rem", color: "#ef4444", fontWeight: 700, marginTop: 4, display: "block" }}>{fileSizeError}</span>}
            </div>

            {/* DYNAMIC LEAVE FIELDS */}
            {selectedCategory === "Leave Application" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)" }}>LEAVE FROM</label>
                    <input type="date" value={leaveFrom} onChange={e => setLeaveFrom(e.target.value)} required style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: 10, border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)", marginTop: 4, fontSize: "0.85rem" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)" }}>LEAVE TO</label>
                    <input type="date" value={leaveTo} onChange={e => setLeaveTo(e.target.value)} required style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: 10, border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)", marginTop: 4, fontSize: "0.85rem" }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)" }}>REASON FOR LEAVE</label>
                  <textarea rows={3} value={leaveReason} onChange={e => setLeaveReason(e.target.value)} placeholder="Specify reason..." required style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: 10, border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)", marginTop: 4, fontSize: "0.85rem" }} />
                </div>
              </>
            )}

            {!["Leave Application"].includes(selectedCategory) && (
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)" }}>DETAILS &amp; DESCRIPTION</label>
                <textarea rows={4} value={generalDescription} onChange={e => setGeneralDescription(e.target.value)} placeholder="Provide full details..." required style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: 10, border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)", marginTop: 4, fontSize: "0.85rem" }} />
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <button type="submit" style={{ flex: 1, padding: "0.65rem", borderRadius: "12px", background: "linear-gradient(135deg, #4f46e5, #06b6d4)", color: "#ffffff", fontWeight: 800, fontSize: "0.85rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                <Send size={15} />
                <span>Submit Request</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ════════════ SCREEN 4 & 5: MY REQUESTS & CHAT THREAD ════════════ */}
      {activeTab === "my-requests" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          <div style={{ padding: "1.1rem", borderRadius: "18px", background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-heading)", margin: 0, marginBottom: "0.75rem" }}>
              My Support Tickets
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {requests.map(req => (
                <div
                  key={req.id}
                  onClick={() => setSelectedTicket(req)}
                  style={{
                    padding: "0.85rem 1rem", borderRadius: "14px", cursor: "pointer",
                    background: selectedTicket?.id === req.id ? "rgba(99, 102, 241, 0.15)" : "var(--bg-card)",
                    border: selectedTicket?.id === req.id ? "1.5px solid #6366f1" : "1px solid var(--border-color)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.7rem", color: "#6366f1", fontWeight: 800 }}>{req.id} &bull; {req.category}</span>
                    <span style={{ padding: "0.15rem 0.5rem", borderRadius: 6, fontSize: "0.68rem", fontWeight: 800, background: req.status === "Resolved" ? "var(--success-bg)" : "rgba(99, 102, 241, 0.15)", color: req.status === "Resolved" ? "var(--success)" : "#6366f1" }}>
                      {req.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-heading)", marginTop: 4 }}>{req.subject}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 4 }}>Last update: {req.lastReply}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SCREEN 5: CHAT THREAD & TIMELINE */}
          {selectedTicket && (
            <div style={{ padding: "1.25rem", borderRadius: "18px", background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "1rem" }}>
              
              <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#6366f1" }}>{selectedTicket.id} &bull; {selectedTicket.category}</span>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-heading)", marginTop: 2, margin: 0 }}>{selectedTicket.subject}</h3>
                </div>

                {selectedTicket.status !== "Closed" && (
                  <button onClick={() => handleCloseTicket(selectedTicket.id)} style={{ background: "rgba(239,68,68,0.12)", border: "none", color: "#ef4444", borderRadius: "8px", padding: "0.3rem 0.6rem", fontSize: "0.72rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
                    <XCircle size={13} />
                    <span>Close</span>
                  </button>
                )}
              </div>

              {/* 5-STEP TIMELINE TRACKER */}
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Timeline Progress
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0.5rem", borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--border-color)", overflowX: "auto" }}>
                  {[
                    { step: 1, label: "Submitted" },
                    { step: 2, label: "Viewed" },
                    { step: 3, label: "Replied" },
                    { step: 4, label: "Parent Replied" },
                    { step: 5, label: "Resolved" }
                  ].map((st, idx, arr) => {
                    const isDone = selectedTicket.currentStep >= st.step;
                    return (
                      <React.Fragment key={st.step}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textAlign: "center", minWidth: "50px" }}>
                          <div style={{
                            width: 22, height: 22, borderRadius: "50%",
                            background: isDone ? "var(--success)" : "var(--border-color)",
                            color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "0.68rem", fontWeight: 800
                          }}>
                            {isDone ? <Check size={13} /> : st.step}
                          </div>
                          <span style={{ fontSize: "0.65rem", fontWeight: isDone ? 700 : 500, color: isDone ? "var(--text-heading)" : "var(--text-muted)", whiteSpace: "nowrap" }}>
                            {st.label}
                          </span>
                        </div>
                        {idx < arr.length - 1 && (
                          <div style={{ flex: 1, minWidth: "10px", height: 2, background: selectedTicket.currentStep > st.step ? "var(--success)" : "var(--border-color)", margin: "0 2px", marginBottom: "10px" }} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* FILES DOWNLOAD */}
              {selectedTicket.files && selectedTicket.files.length > 0 && (
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    Attached Files &amp; Receipts
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {selectedTicket.files.map((file: any, idx: number) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0.75rem", borderRadius: "10px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <Paperclip size={14} color="#6366f1" />
                          <div>
                            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-heading)" }}>{file.name}</div>
                            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{file.size} &bull; {file.type}</div>
                          </div>
                        </div>
                        <a href="#" download style={{ padding: "0.3rem 0.6rem", borderRadius: "8px", background: "rgba(99, 102, 241, 0.15)", color: "#6366f1", fontSize: "0.72rem", fontWeight: 800, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                          <Download size={12} /> Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CHAT BUBBLES */}
              <div style={{
                display: "flex", flexDirection: "column", gap: "0.65rem",
                padding: "0.85rem", borderRadius: "14px", background: "var(--bg-card)",
                border: "1px solid var(--border-color)", maxHeight: "280px", overflowY: "auto"
              }}>
                {selectedTicket.messages.map((msg: any, idx: number) => {
                  const isParent = msg.role === "Parent";
                  return (
                    <div key={idx} style={{ display: "flex", flexDirection: "column", alignSelf: isParent ? "flex-end" : "flex-start", maxWidth: "90%" }}>
                      <div style={{
                        padding: "0.7rem 0.9rem", borderRadius: "12px",
                        background: isParent ? "linear-gradient(135deg, #4f46e5, #06b6d4)" : "var(--btn-secondary-bg)",
                        color: isParent ? "#ffffff" : "var(--text-heading)",
                        border: isParent ? "none" : "1px solid var(--border-color)"
                      }}>
                        <div style={{ fontSize: "0.68rem", opacity: 0.85, fontWeight: 800, display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                          <span>{msg.sender}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p style={{ fontSize: "0.82rem", marginTop: 3, lineHeight: 1.4, whiteSpace: "pre-line", margin: 0 }}>
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CHAT INPUT */}
              {selectedTicket.status !== "Closed" && (
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <input
                    type="text"
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Reply to school admin..."
                    style={{ flex: 1, padding: "0.6rem 0.85rem", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-input)", color: "var(--text-heading)", fontSize: "0.82rem" }}
                  />
                  <button onClick={handleParentChatReply} style={{ padding: "0.6rem 0.9rem", borderRadius: "10px", background: "linear-gradient(135deg, #4f46e5, #06b6d4)", color: "#ffffff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Send size={15} />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
}
