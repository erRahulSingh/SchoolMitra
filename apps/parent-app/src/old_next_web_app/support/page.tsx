"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, Camera, Upload, ChevronDown, FileText, 
  CreditCard, Bus, MapPin, FileCheck, CheckCircle2, 
  Clock, Send, Paperclip, XCircle, ChevronRight, X,
  Download, Search, Smile, Building
} from "lucide-react";

interface Message {
  sender: string;
  role: "Parent" | "SchoolAdmin";
  text: string;
  time: string;
}

interface Ticket {
  id: string;
  category: string;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  createdDate: string;
  lastReply: string;
  messages: Message[];
  attachment?: {
    name: string;
    size: string;
  } | null;
}

const FAQS_DATA = [
  {
    q: "How can I check my child's attendance?",
    a: "Go to the Attendance tab in the app to view daily and monthly attendance reports."
  },
  {
    q: "How can I make fee payment?",
    a: "You can pay online via UPI, Debit Card, or Net Banking under the Fees tab."
  },
  {
    q: "How can I track the school bus?",
    a: "Open the Live Bus tab to track the real-time GPS location and ETA of your child's bus."
  },
  {
    q: "How can I apply for TC?",
    a: "Go to support requests, raise a request under the 'TC Request' category, and the admin office will process it."
  },
  {
    q: "How can I contact the class teacher?",
    a: "You can initiate a direct chat with class or subject teachers from the Messages tab."
  },
  {
    q: "How can I update my profile?",
    a: "Open the Profile tab to view and request updates to your mobile number, address, or email."
  },
  {
    q: "What should I do if I forget password?",
    a: "Use the 'Forgot Password' link on the login screen or contact the school administration to reset it."
  }
];

export default function ParentSupportRequestsPage({ onBack }: { onBack?: () => void }) {
  const [view, setView] = useState<"dashboard" | "new-request" | "ticket-detail" | "faqs">("dashboard");
  const [requests, setRequests] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Form Fields
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<{ name: string; size: string } | null>(null);

  // Chat Field
  const [replyText, setReplyText] = useState("");
  
  // FAQ Search
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Hidden file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load support requests from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("supportRequests");
    if (saved) {
      setRequests(JSON.parse(saved));
    } else {
      const initial: Ticket[] = [
        {
          id: "#SR1234",
          category: "ID Card",
          subject: "ID Card Issue",
          description: "My child's ID card is lost. Please help to issue a new one.",
          status: "Open",
          createdDate: "12 May 2025, 10:30 AM",
          lastReply: "Open ticket",
          messages: [
            { sender: "School Admin", role: "SchoolAdmin", text: "Dear Parent, we have received your request. We will get back to you soon.", time: "12 May 2025, 11:00 AM" }
          ],
          attachment: {
            name: "IMG_20250512_1030.pdf",
            size: "1.2 MB"
          }
        },
        {
          id: "#SR1233",
          category: "Fee Receipt",
          subject: "Fee Receipt Request",
          description: "Please provide the invoice receipt for Term 1 fee paid online yesterday.",
          status: "In Progress",
          createdDate: "11 May 2025, 09:15 AM",
          lastReply: "Today, 09:30 AM by Accounts Office",
          messages: [
            { sender: "Parent (Anjali Sharma)", role: "Parent", text: "Please provide the invoice receipt for Term 1 fee paid online yesterday.", time: "11 May 2025, 09:15 AM" },
            { sender: "School Admin", role: "SchoolAdmin", text: "We have received the payment verification. Our accounts department is generating the PDF receipt.", time: "11 May 2025, 11:00 AM" }
          ],
          attachment: {
            name: "Fee_Receipt_Proof.pdf",
            size: "850 KB"
          }
        },
        {
          id: "#SR1232",
          category: "Bus Route Change",
          subject: "Change route to Dwarka Sec 15",
          description: "We are relocating to Sec 15. Please update Rohan's pickup stop.",
          status: "Resolved",
          createdDate: "10 May 2025, 08:30 AM",
          lastReply: "10 May 2025, 04:30 PM by Transport Team",
          messages: [
            { sender: "Parent (Anjali Sharma)", role: "Parent", text: "We are relocating to Dwarka Sector 15. Please change the bus route.", time: "10 May 2025, 08:30 AM" },
            { sender: "School Admin", role: "SchoolAdmin", text: "Route updated to Route #4. The bus will pick up from Sector 15 metro station gate 2.", time: "10 May 2025, 04:30 PM" }
          ]
        },
        {
          id: "#SR1231",
          category: "TC Request",
          subject: "Transfer Certificate request",
          description: "Relocating to Bangalore. Need transfer certificate issued.",
          status: "Closed",
          createdDate: "08 May 2025, 02:00 PM",
          lastReply: "09 May 2025, 11:30 AM by Admin Office",
          messages: [
            { sender: "Parent (Anjali Sharma)", role: "Parent", text: "We are relocating to Bangalore. Please issue the Transfer Certificate.", time: "08 May 2025, 02:00 PM" },
            { sender: "School Admin", role: "SchoolAdmin", text: "TC has been generated and dispatched. You can download the copy from the attachment.", time: "09 May 2025, 11:30 AM" }
          ],
          attachment: {
            name: "Transfer_Certificate_Draft.pdf",
            size: "1.5 MB"
          }
        }
      ];
      setRequests(initial);
      localStorage.setItem("supportRequests", JSON.stringify(initial));
    }
  }, []);

  const saveRequests = (updated: Ticket[]) => {
    setRequests(updated);
    localStorage.setItem("supportRequests", JSON.stringify(updated));
  };

  const getRequestIcon = (cat: string) => {
    switch (cat) {
      case "ID Card Issue":
      case "ID Card":
        return FileText;
      case "Fee Receipt":
        return CreditCard;
      case "Bus Route Change":
        return MapPin;
      case "TC Request":
        return FileCheck;
      default:
        return FileText;
    }
  };

  const getRequestColors = (cat: string) => {
    switch (cat) {
      case "ID Card Issue":
      case "ID Card":
        return { bg: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" };
      case "Fee Receipt":
        return { bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" };
      case "Bus Route Change":
        return { bg: "rgba(6, 182, 212, 0.1)", color: "#06b6d4" };
      case "TC Request":
        return { bg: "rgba(100, 116, 139, 0.1)", color: "#64748b" };
      default:
        return { bg: "rgba(99, 102, 241, 0.1)", color: "#6366f1" };
    }
  };

  const getStatusStyle = (status: Ticket["status"]) => {
    switch (status) {
      case "Open":
        return { bg: "#e8f5e9", color: "#2e7d32" };
      case "In Progress":
        return { bg: "#fff3e0", color: "#ef6c00" };
      case "Resolved":
        return { bg: "#e3f2fd", color: "#1565c0" };
      case "Closed":
        return { bg: "#f5f5f5", color: "#616161" };
    }
  };

  // Form Submissions & Simulations
  const handleCameraCapture = () => {
    alert("Simulating camera capture...");
    setAttachment({
      name: `IMG_${Math.floor(1000 + Math.random() * 9000)}.JPG`,
      size: "1.4 MB"
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(0)} KB`;
      setAttachment({
        name: file.name,
        size: sizeStr
      });
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !subject || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    const currentMaxId = requests.reduce((max, r) => {
      const num = parseInt(r.id.replace("#SR", ""), 10);
      return num > max ? num : max;
    }, 1230);
    const nextId = `#SR${currentMaxId + 1}`;

    const newTicket: Ticket = {
      id: nextId,
      category,
      subject,
      description,
      status: "Open",
      createdDate: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }),
      lastReply: "Open ticket",
      messages: [
        { sender: "Parent (Anjali Sharma)", role: "Parent", text: description, time: "Just now" }
      ],
      attachment: attachment ? { name: attachment.name, size: attachment.size } : null
    };

    const updated = [newTicket, ...requests];
    saveRequests(updated);

    // Reset fields
    setCategory("");
    setSubject("");
    setDescription("");
    setAttachment(null);

    // Back to dashboard
    setView("dashboard");
  };

  // Chat Actions
  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;

    const newMessage: Message = {
      sender: "Parent (Anjali Sharma)",
      role: "Parent",
      text: replyText.trim(),
      time: "Just now"
    };

    const updatedTickets = requests.map((t) => {
      if (t.id === selectedTicket.id) {
        const ticketCopy = {
          ...t,
          status: "Open" as const,
          lastReply: "Parent Replied",
          messages: [...t.messages, newMessage]
        };
        setSelectedTicket(ticketCopy);
        return ticketCopy;
      }
      return t;
    });

    saveRequests(updatedTickets);
    setReplyText("");

    // Simulate auto school admin reply after 2 seconds
    setTimeout(() => {
      const adminMessage: Message = {
        sender: "School Admin",
        role: "SchoolAdmin",
        text: "Thank you for your reply. Our support desk has logged this response and will get back to you shortly.",
        time: "Just now"
      };

      const finalTickets = updatedTickets.map((t) => {
        if (t.id === selectedTicket.id) {
          const ticketCopy = {
            ...t,
            status: "In Progress" as const,
            lastReply: "Today, by Support Staff",
            messages: [...t.messages, adminMessage]
          };
          setSelectedTicket(ticketCopy);
          return ticketCopy;
        }
        return t;
      });
      saveRequests(finalTickets);
    }, 2000);
  };

  const handleCloseTicket = (id: string) => {
    if (!confirm("Are you sure you want to close this ticket?")) return;

    const updated = requests.map((t) => {
      if (t.id === id) {
        const closedTicket = { ...t, status: "Closed" as const, lastReply: "Ticket Closed" };
        if (selectedTicket?.id === id) {
          setSelectedTicket(closedTicket);
        }
        return closedTicket;
      }
      return t;
    });
    saveRequests(updated);
  };

  // Filter FAQs
  const filteredFaqs = FAQS_DATA.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      background: "#f8fafc",
      minHeight: "100%",
      width: "100%",
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      
      {/* ══════════════ 1. DASHBOARD VIEW ══════════════ */}
      {view === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {/* Header */}
          <div style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            padding: "2.4rem 1rem 0.8rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <button
              onClick={onBack}
              style={{
                background: "transparent",
                border: "none",
                color: "#1e293b",
                cursor: "pointer",
                padding: "0.2rem",
                display: "flex",
                alignItems: "center"
              }}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 style={{
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "#1e293b",
              margin: 0,
              fontFamily: "'Outfit', sans-serif"
            }}>
              Support &amp; Requests
            </h1>
            <button
              onClick={() => setView("faqs")}
              style={{
                background: "transparent",
                border: "none",
                color: "#1d4ed8",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                padding: "0.2rem"
              }}
            >
              FAQs
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Hero Card */}
            <div style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
              borderRadius: "24px",
              padding: "1.25rem",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 10px 25px rgba(79, 70, 229, 0.25)",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Left Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", zIndex: 2, maxWidth: "60%" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "#ffffff", lineHeight: 1.2 }}>
                  We are here to help you!
                </h2>
                <p style={{ fontSize: "0.78rem", opacity: 0.9, margin: 0, lineHeight: 1.35 }}>
                  Raise a request or track previous requests.
                </p>
                <button
                  onClick={() => setView("new-request")}
                  style={{
                    alignSelf: "flex-start",
                    marginTop: "0.4rem",
                    padding: "0.55rem 1.1rem",
                    borderRadius: "99px",
                    background: "#ffffff",
                    color: "#4f46e5",
                    fontWeight: 800,
                    fontSize: "0.78rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    transition: "transform 0.15s ease"
                  }}
                >
                  Raise New Request
                </button>
              </div>

              {/* Right Illustration */}
              <div style={{ flexShrink: 0, zIndex: 1, marginRight: "-10px", marginBottom: "-15px" }}>
                <svg width="110" height="110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="rgba(255, 255, 255, 0.15)" />
                  
                  {/* Body/Shirt */}
                  <path d="M22 95 C22 75 32 65 50 65 C68 65 78 75 78 95 Z" fill="#2d3748" />
                  {/* Collar */}
                  <path d="M42 66 L50 74 L58 66 L53 66 L50 70 L47 66 Z" fill="#ffffff" />
                  
                  {/* Neck */}
                  <rect x="45" y="56" width="10" height="12" fill="#ffeedd" rx="2" />
                  
                  {/* Ears */}
                  <circle cx="34" cy="45" r="4" fill="#ffeedd" />
                  <circle cx="66" cy="45" r="4" fill="#ffeedd" />
                  
                  {/* Face */}
                  <circle cx="50" cy="44" r="16" fill="#ffeedd" />
                  
                  {/* Hair */}
                  <path d="M34,42 C34,26 66,26 66,42 C66,42 60,30 50,30 C40,30 34,42 34,42 Z" fill="#1a202c" />
                  
                  {/* Eyes */}
                  <circle cx="44" cy="42" r="1.5" fill="#1a202c" />
                  <circle cx="56" cy="42" r="1.5" fill="#1a202c" />
                  
                  {/* Smile */}
                  <path d="M46 50 Q50 53 54 50" stroke="#1a202c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  
                  {/* Headset Arc */}
                  <path d="M32 44 C32 24 38 18 50 18 C62 18 68 24 68 44" stroke="#1a202c" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  
                  {/* Earcups */}
                  <rect x="29" y="38" width="6" height="13" rx="3" fill="#1a202c" />
                  <rect x="65" y="38" width="6" height="13" rx="3" fill="#1a202c" />
                  
                  {/* Microphone Boom */}
                  <path d="M33 46 L45 52" stroke="#1a202c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <circle cx="45" cy="52" r="2.5" fill="#1a202c" />
                </svg>
              </div>
            </div>

            {/* My Requests Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginTop: "0.25rem" }}>
              <h3 style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: "#1e293b",
                margin: 0,
                fontFamily: "'Outfit', sans-serif"
              }}>
                My Requests
              </h3>

              {requests.length === 0 ? (
                <div style={{
                  padding: "2rem 1rem",
                  textAlign: "center",
                  background: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  color: "#64748b",
                  fontSize: "0.85rem"
                }}>
                  No support tickets raised yet.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {requests.map((req) => {
                    const IconComp = getRequestIcon(req.category);
                    const colors = getRequestColors(req.category);
                    const statusStyle = getStatusStyle(req.status);
                    return (
                      <div
                        key={req.id}
                        onClick={() => {
                          setSelectedTicket(req);
                          setView("ticket-detail");
                        }}
                        style={{
                          background: "#ffffff",
                          borderRadius: "16px",
                          padding: "1rem",
                          border: "1px solid #f1f5f9",
                          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                          {/* Icon container */}
                          <div style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "12px",
                            background: colors.bg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                          }}>
                            <IconComp size={22} color={colors.color} strokeWidth={2} />
                          </div>

                          {/* Ticket Text Info */}
                          <div>
                            <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a" }}>
                              {req.category === "ID Card" ? "ID Card Issue" : req.category}
                            </div>
                            <div style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500, marginTop: "2px" }}>
                              Request ID: {req.id}
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span style={{
                          padding: "0.22rem 0.6rem",
                          borderRadius: "99px",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          background: statusStyle.bg,
                          color: statusStyle.color
                        }}>
                          {req.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ══════════════ 2. NEW REQUEST VIEW ══════════════ */}
      {view === "new-request" && (
        <form onSubmit={handleSubmitRequest} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {/* Header */}
          <div style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            padding: "2.4rem 1rem 0.8rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <button
              type="button"
              onClick={() => setView("dashboard")}
              style={{
                background: "transparent",
                border: "none",
                color: "#1e293b",
                cursor: "pointer",
                padding: "0.2rem",
                display: "flex",
                alignItems: "center"
              }}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 style={{
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "#1e293b",
              margin: 0,
              fontFamily: "'Outfit', sans-serif"
            }}>
              New Request
            </h1>
            <div style={{ width: 24 }} /> {/* alignment placeholder */}
          </div>

          {/* Form Content */}
          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            
            {/* Category Dropdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e3a8a" }}>
                Request Category
              </label>
              <div style={{ position: "relative" }}>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "100%",
                    appearance: "none",
                    padding: "0.85rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    color: category ? "#0f172a" : "#94a3b8",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="" disabled hidden>Select Category</option>
                  <option value="ID Card Issue">ID Card Issue</option>
                  <option value="Fee Receipt">Fee Receipt</option>
                  <option value="Bus Route Change">Bus Route Change</option>
                  <option value="TC Request">TC Request</option>
                  <option value="Other">Other Query / Help</option>
                </select>
                <ChevronDown size={18} color="#64748b" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
            </div>

            {/* Subject Input */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e3a8a" }}>
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.88rem",
                  outline: "none",
                  color: "#0f172a"
                }}
              />
            </div>

            {/* Description Textarea */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e3a8a" }}>
                Description
              </label>
              <div style={{ position: "relative" }}>
                <textarea
                  required
                  value={description}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setDescription(e.target.value);
                    }
                  }}
                  placeholder="Enter detailed description..."
                  rows={5}
                  maxLength={500}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem 2.2rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.88rem",
                    outline: "none",
                    color: "#0f172a",
                    resize: "none"
                  }}
                />
                <div style={{
                  position: "absolute",
                  right: "12px",
                  bottom: "8px",
                  fontSize: "0.72rem",
                  color: "#94a3b8",
                  fontWeight: 600
                }}>
                  {description.length}/500
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e3a8a" }}>
                Attachments (Optional)
              </label>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                {/* Camera Button */}
                <button
                  type="button"
                  onClick={handleCameraCapture}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#1d4ed8"
                  }}
                >
                  <Camera size={22} />
                </button>

                {/* File Upload Button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    flex: 1,
                    height: "50px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    color: "#1d4ed8",
                    fontSize: "0.88rem",
                    fontWeight: 700
                  }}
                >
                  <Upload size={18} />
                  <span>Upload File</span>
                </button>
              </div>

              {/* Selected file info */}
              {attachment && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "8px",
                  background: "#f1f5f9",
                  marginTop: "0.4rem",
                  fontSize: "0.8rem",
                  color: "#334155"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Paperclip size={14} color="#4f46e5" />
                    <span style={{ fontWeight: 600 }}>{attachment.name}</span>
                    <span style={{ fontSize: "0.7rem", color: "#64748b" }}>({attachment.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", display: "flex" }}
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.95rem",
                background: "#1d4ed8",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(29, 78, 216, 0.3)",
                marginTop: "1.5rem"
              }}
            >
              Submit Request
            </button>

          </div>
        </form>
      )}

      {/* ══════════════ 3. REQUEST DETAILS VIEW ══════════════ */}
      {view === "ticket-detail" && selectedTicket && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {/* Header */}
          <div style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            padding: "2.4rem 1rem 0.8rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <button
              onClick={() => setView("dashboard")}
              style={{
                background: "transparent",
                border: "none",
                color: "#1e293b",
                cursor: "pointer",
                padding: "0.2rem",
                display: "flex",
                alignItems: "center"
              }}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 style={{
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "#1e293b",
              margin: 0,
              fontFamily: "'Outfit', sans-serif"
            }}>
              Request Details
            </h1>
            <div style={{ width: 24 }} /> {/* alignment placeholder */}
          </div>

          {/* Ticket Detail Content */}
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            
            {/* Top Summary Card */}
            <div style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "1rem 1.15rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: getRequestColors(selectedTicket.category).bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  {React.createElement(getRequestIcon(selectedTicket.category), {
                    size: 22,
                    color: getRequestColors(selectedTicket.category).color
                  })}
                </div>
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    {selectedTicket.category === "ID Card" ? "ID Card Issue" : selectedTicket.category}
                  </h3>
                  <p style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: 500, margin: "2px 0 0 0" }}>
                    Request ID: {selectedTicket.id}
                  </p>
                </div>
              </div>

              <span style={{
                padding: "0.22rem 0.65rem",
                borderRadius: "99px",
                fontSize: "0.72rem",
                fontWeight: 700,
                border: selectedTicket.status === "Open" ? "1px solid rgba(46, 125, 50, 0.25)" : undefined,
                background: getStatusStyle(selectedTicket.status).bg,
                color: getStatusStyle(selectedTicket.status).color
              }}>
                {selectedTicket.status}
              </span>
            </div>

            {/* Details Box */}
            <div style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "1.25rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem"
            }}>
              
              {/* Metadata rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div style={{ width: "105px", fontSize: "0.85rem", fontWeight: 700, color: "#334155" }}>Raised On</div>
                  <div style={{ flex: 1, fontSize: "0.85rem", fontWeight: 500, color: "#475569" }}>
                    {selectedTicket.createdDate}
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div style={{ width: "105px", fontSize: "0.85rem", fontWeight: 700, color: "#334155" }}>Category</div>
                  <div style={{ flex: 1, fontSize: "0.85rem", fontWeight: 500, color: "#475569" }}>
                    {selectedTicket.category === "ID Card" ? "ID Card" : selectedTicket.category}
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div style={{ width: "105px", fontSize: "0.85rem", fontWeight: 700, color: "#334155" }}>Description</div>
                  <div style={{ flex: 1, fontSize: "0.85rem", fontWeight: 500, color: "#475569", lineHeight: 1.45 }}>
                    {selectedTicket.description}
                  </div>
                </div>
              </div>

              {/* Attachments Section */}
              {selectedTicket.attachment && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", borderTop: "1px solid #f1f5f9", paddingTop: "0.9rem" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>
                    Attachments
                  </div>
                  <div style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    padding: "0.85rem 1rem",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: "rgba(59, 130, 246, 0.1)",
                        color: "#1d4ed8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f172a" }}>
                          {selectedTicket.attachment.name}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>
                          {selectedTicket.attachment.size}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => alert("Downloading attachment...")}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#1d4ed8",
                        cursor: "pointer",
                        display: "flex",
                        padding: "0.4rem"
                      }}
                    >
                      <Download size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Conversation List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.25rem" }}>
              <h3 style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: "#1e293b",
                margin: 0,
                fontFamily: "'Outfit', sans-serif"
              }}>
                Conversation
              </h3>

              <div style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "1.1rem",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
                maxHeight: "320px",
                overflowY: "auto"
              }}>
                {selectedTicket.messages.map((msg, index) => {
                  const isAdmin = msg.role === "SchoolAdmin";
                  return (
                    <div key={index} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      {isAdmin ? (
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "#22c55e",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}>
                          <Building size={18} />
                        </div>
                      ) : (
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "#1d4ed8",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          flexShrink: 0
                        }}>
                          P
                        </div>
                      )}

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e293b" }}>
                            {isAdmin ? "School Admin" : msg.sender}
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                            {msg.time}
                          </span>
                        </div>
                        <p style={{
                          margin: 0,
                          fontSize: "0.85rem",
                          color: "#475569",
                          lineHeight: 1.45,
                          whiteSpace: "pre-line"
                        }}>
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chat Input Bar */}
            {selectedTicket.status !== "Closed" ? (
              <div style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
                marginTop: "0.25rem",
                marginBottom: "1rem"
              }}>
                <div style={{
                  flex: 1,
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "99px",
                  padding: "0.25rem 0.25rem 0.25rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <Smile size={20} color="#94a3b8" style={{ cursor: "pointer" }} />
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      fontSize: "0.85rem",
                      color: "#0f172a",
                      background: "transparent"
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendReply();
                    }}
                  />
                </div>
                
                <button
                  onClick={handleSendReply}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#1d4ed8",
                    color: "#ffffff",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(29, 78, 216, 0.3)",
                    flexShrink: 0
                  }}
                >
                  <Send size={18} fill="#ffffff" style={{ marginLeft: "2px" }} />
                </button>
              </div>
            ) : (
              <div style={{
                padding: "0.85rem",
                textAlign: "center",
                background: "#f1f5f9",
                borderRadius: "12px",
                color: "#64748b",
                fontSize: "0.82rem",
                fontWeight: 600,
                marginTop: "0.25rem",
                marginBottom: "1rem"
              }}>
                This ticket has been closed.
              </div>
            )}

          </div>
        </div>
      )}

      {/* ══════════════ 4. FAQS VIEW ══════════════ */}
      {view === "faqs" && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {/* Header */}
          <div style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            padding: "2.4rem 1rem 0.8rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <button
              onClick={() => setView("dashboard")}
              style={{
                background: "transparent",
                border: "none",
                color: "#1e293b",
                cursor: "pointer",
                padding: "0.2rem",
                display: "flex",
                alignItems: "center"
              }}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 style={{
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "#1e293b",
              margin: 0,
              fontFamily: "'Outfit', sans-serif"
            }}>
              FAQs
            </h1>
            <div style={{ width: 24 }} /> {/* alignment placeholder */}
          </div>

          {/* FAQ Content */}
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            
            {/* Search Input */}
            <div style={{
              background: "#f1f5f9",
              borderRadius: "99px",
              padding: "0.65rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <Search size={18} color="#64748b" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "0.88rem",
                  color: "#0f172a"
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", display: "flex" }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Accordion Card Container */}
            <div style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
              overflow: "hidden"
            }}>
              {filteredFaqs.length === 0 ? (
                <div style={{ padding: "2rem 1rem", textAlign: "center", color: "#64748b", fontSize: "0.85rem" }}>
                  No FAQs matching your search criteria.
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const originalIndex = FAQS_DATA.findIndex(f => f.q === faq.q);
                  const isExpanded = expandedFaqIndex === originalIndex;
                  const isLast = idx === filteredFaqs.length - 1;

                  return (
                    <div
                      key={idx}
                      style={{
                        borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      {/* Accordion Trigger Question */}
                      <button
                        onClick={() => setExpandedFaqIndex(isExpanded ? null : originalIndex)}
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          padding: "1.1rem 1.2rem",
                          textAlign: "left",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "1rem",
                          outline: "none"
                        }}
                      >
                        <span style={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#1e3a8a",
                          lineHeight: 1.3
                        }}>
                          {faq.q}
                        </span>
                        
                        <ChevronDown
                          size={18}
                          color="#64748b"
                          style={{
                            transform: isExpanded ? "rotate(180deg)" : "none",
                            transition: "transform 0.2s ease",
                            flexShrink: 0
                          }}
                        />
                      </button>

                      {/* Accordion Answer Content */}
                      {isExpanded && (
                        <div style={{
                          padding: "0 1.25rem 1.1rem 1.25rem",
                          fontSize: "0.82rem",
                          color: "#475569",
                          lineHeight: 1.45
                        }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Contact support banner */}
            <div style={{
              background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)",
              borderRadius: "20px",
              padding: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              border: "1px solid #bae6fd",
              marginTop: "0.5rem"
            }}>
              {/* Left text and button */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", zIndex: 2, maxWidth: "60%" }}>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    Still have questions?
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "#475569", margin: "2px 0 0 0" }}>
                    Contact our support team.
                  </p>
                </div>

                <button
                  onClick={() => setView("dashboard")}
                  style={{
                    alignSelf: "flex-start",
                    background: "#1d4ed8",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.76rem",
                    border: "none",
                    padding: "0.55rem 1.1rem",
                    borderRadius: "99px",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(29, 78, 216, 0.2)",
                    transition: "transform 0.15s ease"
                  }}
                >
                  Contact Support
                </button>
              </div>

              {/* Right representative SVG illustration */}
              <div style={{ flexShrink: 0, zIndex: 1, marginRight: "-12px", marginBottom: "-15px" }}>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="rgba(255, 255, 255, 0.25)" />
                  
                  {/* Body/Shirt */}
                  <path d="M22 95 C22 75 32 65 50 65 C68 65 78 75 78 95 Z" fill="#2d3748" />
                  {/* Collar */}
                  <path d="M42 66 L50 74 L58 66 L53 66 L50 70 L47 66 Z" fill="#ffffff" />
                  
                  {/* Neck */}
                  <rect x="45" y="56" width="10" height="12" fill="#ffeedd" rx="2" />
                  
                  {/* Ears */}
                  <circle cx="34" cy="45" r="4" fill="#ffeedd" />
                  <circle cx="66" cy="45" r="4" fill="#ffeedd" />
                  
                  {/* Face */}
                  <circle cx="50" cy="44" r="16" fill="#ffeedd" />
                  
                  {/* Hair */}
                  <path d="M34,42 C34,26 66,26 66,42 C66,42 60,30 50,30 C40,30 34,42 34,42 Z" fill="#1a202c" />
                  
                  {/* Eyes */}
                  <circle cx="44" cy="42" r="1.5" fill="#1a202c" />
                  <circle cx="56" cy="42" r="1.5" fill="#1a202c" />
                  
                  {/* Smile */}
                  <path d="M46 50 Q50 53 54 50" stroke="#1a202c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  
                  {/* Headset Arc */}
                  <path d="M32 44 C32 24 38 18 50 18 C62 18 68 24 68 44" stroke="#1a202c" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  
                  {/* Earcups */}
                  <rect x="29" y="38" width="6" height="13" rx="3" fill="#1a202c" />
                  <rect x="65" y="38" width="6" height="13" rx="3" fill="#1a202c" />
                  
                  {/* Microphone Boom */}
                  <path d="M33 46 L45 52" stroke="#1a202c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <circle cx="45" cy="52" r="2.5" fill="#1a202c" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
