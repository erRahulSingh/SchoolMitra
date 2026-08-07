"use client";

import React, { useState } from "react";
import { 
  IndianRupee, 
  Bus, 
  UserCheck, 
  Image, 
  Calendar, 
  Megaphone, 
  Download, 
  FileCheck, 
  Contact, 
  BookOpen, 
  Headphones, 
  Settings, 
  ChevronRight, 
  X, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Bell, 
  ShieldCheck, 
  Globe, 
  Sun, 
  Moon,
  QrCode,
  DownloadCloud,
  Award,
  Clock,
  BookOpenCheck,
  Folder,
  Layers,
  HeartPulse
} from "lucide-react";

interface MorePageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function MorePage({ language = "en", onNavigate }: MorePageProps) {
  const isHi = language === "hi";

  // Modal State for interactive utilities
  const [activeModal, setActiveModal] = useState<
    "idCard" | "leave" | "gallery" | "downloads" | "library" | "complaint" | "settings" | null
  >(null);

  // Form states for leave apply
  const [leaveReason, setLeaveReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // Complaint state
  const [complaintCategory, setComplaintCategory] = useState("Academic");
  const [complaintText, setComplaintText] = useState("");
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  const t = {
    title: isHi ? "सभी सेवाएं एवं सुविधाएं" : "All Services & Features",
    feePayments: isHi ? "फीस भुगतान" : "Fee Payments",
    busTracking: isHi ? "बस ट्रैकिंग" : "Bus Tracking",
    attendance: isHi ? "उपस्थिति" : "Attendance",
    reportCard: isHi ? "रिपोर्ट कार्ड" : "Report Card",
    timeTable: isHi ? "समय सारणी" : "Time Table",
    examination: isHi ? "परीक्षा" : "Examination",
    homework: isHi ? "गृहकार्य" : "Homework",
    assignments: isHi ? "असाइनमेंट" : "Assignments",
    studyMaterials: isHi ? "अध्ययन सामग्री" : "Study Materials",
    subjectDetails: isHi ? "विषय विवरण" : "Subject Details",
    gallery: isHi ? "फ़ोटो एलबम" : "Photo Album",
    events: isHi ? "कार्यक्रम" : "Events",
    noticeBoard: isHi ? "परिपत्र" : "Circulars",
    downloads: isHi ? "डाउनलोड" : "Downloads",
    leaveApply: isHi ? "छुट्टी का आवेदन" : "Leave Apply",
    idCard: isHi ? "आईडी कार्ड" : "ID Card",
    medicalDetails: isHi ? "स्वास्थ्य एवं चिकित्सा" : "Health & Medical",
    holidayCalendar: isHi ? "अवकाश कैलेंडर" : "Holiday Calendar",
    library: isHi ? "पुस्तकालय" : "Library",
    complaint: isHi ? "शिकायत व मदद" : "Help & Complaint",
    settings: isHi ? "सेटिंग्स" : "Settings",
    close: isHi ? "बंद करें" : "Close",
    submit: isHi ? "जमा करें" : "Submit",
    successMsg: isHi ? "आवेदन सफलतापूर्वक भेजा गया!" : "Application submitted successfully!"
  };

  // Complete List of All Feature Cards in More Page
  const gridItems = [
    {
      id: "fees",
      title: t.feePayments,
      icon: IndianRupee,
      bgColor: "#e6f7ed",
      iconColor: "#16a34a",
      action: () => onNavigate && onNavigate("fees")
    },
    {
      id: "bus",
      title: t.busTracking,
      icon: Bus,
      bgColor: "#e0f2fe",
      iconColor: "#0284c7",
      action: () => onNavigate && onNavigate("bus")
    },
    {
      id: "attendance",
      title: t.attendance,
      icon: UserCheck,
      bgColor: "#fff7ed",
      iconColor: "#ea580c",
      action: () => onNavigate && onNavigate("attendance")
    },
    {
      id: "reportCard",
      title: t.reportCard,
      icon: Award,
      bgColor: "#ecfdf5",
      iconColor: "#10b981",
      action: () => onNavigate && onNavigate("reportCard")
    },
    {
      id: "timeTable",
      title: t.timeTable,
      icon: Clock,
      bgColor: "#eff6ff",
      iconColor: "#1d4ed8",
      action: () => onNavigate && onNavigate("timeTable")
    },
    {
      id: "exams",
      title: t.examination,
      icon: FileText,
      bgColor: "#f3e8ff",
      iconColor: "#9333ea",
      action: () => onNavigate && onNavigate("exams")
    },
    {
      id: "homework",
      title: t.homework,
      icon: BookOpen,
      bgColor: "#fff7ed",
      iconColor: "#ea580c",
      action: () => onNavigate && onNavigate("homework")
    },
    {
      id: "assignments",
      title: t.assignments,
      icon: FileCheck,
      bgColor: "#e0f2fe",
      iconColor: "#0891b2",
      action: () => onNavigate && onNavigate("assignments")
    },
    {
      id: "studyMaterials",
      title: t.studyMaterials,
      icon: Folder,
      bgColor: "#e0f2fe",
      iconColor: "#0284c7",
      action: () => onNavigate && onNavigate("studyMaterials")
    },
    {
      id: "subjectDetails",
      title: t.subjectDetails,
      icon: Layers,
      bgColor: "#f3e8ff",
      iconColor: "#7c3aed",
      action: () => onNavigate && onNavigate("subjectDetails")
    },
    {
      id: "gallery",
      title: t.gallery,
      icon: Image,
      bgColor: "#f3e8ff",
      iconColor: "#9333ea",
      action: () => onNavigate && onNavigate("gallery")
    },
    {
      id: "events",
      title: t.events,
      icon: Calendar,
      bgColor: "#ffe4e6",
      iconColor: "#e11d48",
      action: () => onNavigate && onNavigate("events")
    },
    {
      id: "notice",
      title: t.noticeBoard,
      icon: Megaphone,
      bgColor: "#e0f2fe",
      iconColor: "#0891b2",
      action: () => onNavigate && onNavigate("noticeBoard")
    },
    {
      id: "leave",
      title: t.leaveApply,
      icon: FileCheck,
      bgColor: "#dcfce7",
      iconColor: "#059669",
      action: () => setActiveModal("leave")
    },
    {
      id: "idcard",
      title: t.idCard,
      icon: Contact,
      bgColor: "#e0f2fe",
      iconColor: "#1d4ed8",
      action: () => onNavigate && onNavigate("idCard")
    },
    {
      id: "medical",
      title: t.medicalDetails,
      icon: HeartPulse,
      bgColor: "#ffe4e6",
      iconColor: "#e11d48",
      action: () => onNavigate && onNavigate("medical")
    },
    {
      id: "holidays",
      title: t.holidayCalendar,
      icon: Calendar,
      bgColor: "#dcfce7",
      iconColor: "#16a34a",
      action: () => onNavigate && onNavigate("holidays")
    },
    {
      id: "downloads",
      title: t.downloads,
      icon: Download,
      bgColor: "#e0f2fe",
      iconColor: "#2563eb",
      action: () => setActiveModal("downloads")
    },
    {
      id: "library",
      title: t.library,
      icon: BookOpen,
      bgColor: "#fef3c7",
      iconColor: "#d97706",
      action: () => setActiveModal("library")
    },
    {
      id: "complaint",
      title: t.complaint,
      icon: Headphones,
      bgColor: "#ffe4e6",
      iconColor: "#dc2626",
      action: () => {
        localStorage.setItem("supportDefaultView", "dashboard");
        onNavigate && onNavigate("help");
      }
    },
    {
      id: "settings",
      title: t.settings,
      icon: Settings,
      bgColor: "#f1f5f9",
      iconColor: "#475569",
      action: () => setActiveModal("settings")
    }
  ];

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      setActiveModal(null);
      setLeaveReason("");
      setFromDate("");
      setToDate("");
    }, 1800);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComplaintSubmitted(true);
    setTimeout(() => {
      setComplaintSubmitted(false);
      setActiveModal(null);
      setComplaintText("");
    }, 1800);
  };

  return (
    <div style={{
      padding: "1rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ PAGE TITLE ════════════ */}
      <h1 style={{
        fontSize: "1.18rem",
        fontWeight: 800,
        color: "#0f172a",
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: "-0.015em",
        margin: "0.15rem 0 0.05rem 0"
      }}>
        {t.title}
      </h1>

      {/* ════════════ 4-COLUMN SQUIRCLE GRID OF UTILITY MODULES ════════════ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem 0.6rem"
      }}>
        {gridItems.map(item => {
          const IconComp = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.action}
              style={{
                background: "transparent",
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.4rem",
                cursor: "pointer",
                padding: "0"
              }}
            >
              {/* Squircle Icon Container */}
              <div style={{
                width: "54px",
                height: "54px",
                borderRadius: "18px",
                background: item.bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
                transition: "transform 0.2s ease"
              }}>
                <IconComp size={24} color={item.iconColor} strokeWidth={2} />
              </div>

              {/* Title Text */}
              <span style={{
                fontSize: "0.71rem",
                fontWeight: 700,
                color: "#334155",
                textAlign: "center",
                lineHeight: 1.2,
                maxWidth: "70px"
              }}>
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* ════════════ STUDENT ID CARD BANNER CARD ════════════ */}
      <div 
        onClick={() => setActiveModal("idCard")}
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #1e3a8a 100%)",
          borderRadius: "22px",
          padding: "1.1rem 1.2rem",
          color: "#ffffff",
          boxShadow: "0 8px 24px -4px rgba(37, 99, 235, 0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: "14px",
            background: "rgba(255, 255, 255, 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Contact size={24} color="#ffffff" strokeWidth={2} />
          </div>

          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
              Digital Student ID Card
            </div>
            <div style={{ fontSize: "0.74rem", color: "#bfdbfe", marginTop: "2px" }}>
              View & download Rohan Sharma's official ID
            </div>
          </div>
        </div>

        <ChevronRight size={20} color="#ffffff" strokeWidth={2.5} />
      </div>

      {/* ════════════ INTERACTIVE MODALS ════════════ */}

      {/* 1. Student ID Card Modal */}
      {activeModal === "idCard" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            width: "100%", maxWidth: "380px", background: "#ffffff",
            borderRadius: "24px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Student ID Card</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* ID Card Graphic */}
            <div style={{
              background: "linear-gradient(135deg, #092058 0%, #0d3880 100%)",
              borderRadius: "18px", padding: "1.2rem", color: "#fff", textAlign: "center"
            }}>
              <div style={{ fontSize: "0.72rem", color: "#93c5fd", fontWeight: 800, textTransform: "uppercase" }}>Green Valley Public School</div>
              <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300" alt="" onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150"; }} style={{ width: 70, height: 70, borderRadius: "50%", border: "3px solid #fff", margin: "0.75rem auto 0.4rem auto" }} />
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>Rohan Sharma</h2>
              <p style={{ fontSize: "0.8rem", color: "#bfdbfe", fontWeight: 600 }}>Class 5th - A • Roll No: 12</p>

              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "10px", padding: "0.6rem", marginTop: "0.8rem", display: "flex", justifyContent: "space-around", fontSize: "0.72rem" }}>
                <div><span style={{ color: "#93c5fd" }}>ADM NO:</span> GV-2024-88</div>
                <div><span style={{ color: "#93c5fd" }}>BLOOD:</span> O+</div>
              </div>
            </div>

            <button type="button" onClick={() => alert("Downloading ID Card PDF...")} style={{ width: "100%", padding: "0.75rem", background: "#1d4ed8", border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
              <DownloadCloud size={18} />
              <span>Download Digital ID Card</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Leave Application Modal */}
      {activeModal === "leave" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            width: "100%", maxWidth: "400px", background: "#ffffff",
            borderRadius: "24px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Apply Student Leave</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {leaveSubmitted ? (
              <div style={{ padding: "1.5rem", textAlign: "center", color: "#16a34a", fontWeight: 800 }}>
                <CheckCircle2 size={40} style={{ margin: "0 auto 0.5rem auto" }} />
                <div>{t.successMsg}</div>
              </div>
            ) : (
              <form onSubmit={handleLeaveSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div>
                  <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>From Date</label>
                  <input type="date" required value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>To Date</label>
                  <input type="date" required value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>Reason for Leave</label>
                  <textarea required rows={3} placeholder="Provide details for leave application..." value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px", fontSize: "0.82rem" }} />
                </div>

                <button type="submit" style={{ width: "100%", padding: "0.75rem", background: "#16a34a", border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer" }}>
                  Submit Leave Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. Downloads Modal */}
      {activeModal === "downloads" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            width: "100%", maxWidth: "400px", background: "#ffffff",
            borderRadius: "24px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>School Downloads & Prospectus</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { title: "Academic Calendar 2025-26", size: "2.4 MB PDF" },
                { title: "School Uniform & Discipline Guide", size: "1.1 MB PDF" },
                { title: "Bus Route & Transport Policy", size: "1.8 MB PDF" },
                { title: "Fee Structure & Payment Schedule", size: "950 KB PDF" }
              ].map((doc, i) => (
                <div key={i} style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>{doc.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{doc.size}</div>
                  </div>
                  <button type="button" onClick={() => alert("Downloading " + doc.title)} style={{ padding: "0.4rem 0.8rem", background: "#2563eb", border: "none", borderRadius: "10px", color: "#fff", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Digital Library Modal */}
      {activeModal === "library" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            width: "100%", maxWidth: "400px", background: "#ffffff",
            borderRadius: "24px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Library & E-Books</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <div style={{ fontSize: "0.82rem", color: "#475569" }}>
              Books currently issued to Rohan Sharma:
            </div>

            <div style={{ padding: "0.85rem", background: "#fffbe5", borderRadius: "14px", border: "1px solid #fef08a" }}>
              <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>The Secret Seven (Enid Blyton)</div>
              <div style={{ fontSize: "0.74rem", color: "#d97706", marginTop: "2px" }}>Issued on: 12 May 2025 • Due Date: 26 May 2025</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Help & Complaint Modal */}
      {activeModal === "complaint" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        }}>
          <div style={{
            width: "100%", maxWidth: "400px", background: "#ffffff",
            borderRadius: "24px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Submit Help Query / Feedback</h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {complaintSubmitted ? (
              <div style={{ padding: "1.5rem", textAlign: "center", color: "#16a34a", fontWeight: 800 }}>
                <CheckCircle2 size={40} style={{ margin: "0 auto 0.5rem auto" }} />
                <div>Complaint registered! Token #CMP-2025-99</div>
              </div>
            ) : (
              <form onSubmit={handleComplaintSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div>
                  <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>Category</label>
                  <select value={complaintCategory} onChange={(e) => setComplaintCategory(e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px" }}>
                    <option>Academic</option>
                    <option>Transport / Bus</option>
                    <option>Fee Payment</option>
                    <option>General Query</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.76rem", fontWeight: 700, color: "#475569" }}>Message</label>
                  <textarea required rows={3} placeholder="Describe your query or complaint..." value={complaintText} onChange={(e) => setComplaintText(e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "12px", border: "1px solid #cbd5e1", marginTop: "4px", fontSize: "0.82rem" }} />
                </div>

                <button type="submit" style={{ width: "100%", padding: "0.75rem", background: "#dc2626", border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer" }}>
                  Submit Complaint
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
