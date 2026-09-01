/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import {
  Award, FileText, Printer, Download, Plus, Search, Filter,
  CheckCircle2, RefreshCw, Eye, Sparkles, Shield, User, Calendar,
  Building2, Edit3, Trash2, X, ChevronRight, Copy
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  parentName: string;
}

interface Template {
  _id: string;
  templateName: string;
  certificateType: string;
  headerTitle: string;
  bodyContent: string;
  footerText: string;
  borderStyle: string;
}

interface IssuedCertificate {
  _id: string;
  certificateNo: string;
  studentName: string;
  fatherName: string;
  className: string;
  section: string;
  rollNumber: string;
  certificateType: string;
  issueDate: string;
  populatedContent: string;
  status: string;
}

export default function CertificatesPage() {
  const [activeTab, setActiveTab] = useState<"generate" | "templates" | "issued">("generate");
  const [students, setStudents] = useState<Student[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [issuedCerts, setIssuedCerts] = useState<IssuedCertificate[]>([]);
  const [loading, setLoading] = useState(false);

  // Generation Wizard State
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedCertType, setSelectedCertType] = useState<string>("Bonafide Certificate");
  const [autoCertNo, setAutoCertNo] = useState<string>("SM-2026-00001");
  const [templateForm, setTemplateForm] = useState({
    headerTitle: "BONAFIDE CERTIFICATE",
    bodyContent: "This is to certify that {{studentName}}, Son/Daughter of Shri {{fatherName}}, is a bonafide student of {{schoolName}}, studying in Class {{className}} Section {{section}}, Roll No {{rollNumber}} for the Academic Session {{academicYear}}.\n\nHe/She bears a good moral character and has been regular in attending classes at {{schoolAddress}}.",
    footerText: "Principal / Authorized Registrar",
    borderStyle: "Classic Gold",
    academicYear: "2026-2027",
    date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  });

  // Custom Variables Override
  const [customVars, setCustomVars] = useState({
    studentName: "",
    fatherName: "",
    className: "10",
    section: "A",
    rollNumber: "10-A-01",
    schoolName: "ABC PUBLIC SCHOOL",
    schoolAddress: "Sector 12, Dwarka, New Delhi - 110075"
  });

  // Template Designer Modal
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    templateName: "",
    certificateType: "Custom Certificate",
    headerTitle: "CUSTOM CERTIFICATE",
    bodyContent: "This is to certify that {{studentName}}...",
    footerText: "Principal Signature",
    borderStyle: "Classic Gold"
  });

  // Print Preview Certificate Modal
  const [previewCert, setPreviewCert] = useState<any | null>(null);
  const [searchIssued, setSearchIssued] = useState("");

  const certificateTypes = [
    "Transfer Certificate",
    "Bonafide Certificate",
    "Character Certificate",
    "Study Certificate",
    "Migration Certificate",
    "Leaving Certificate",
    "Achievement Certificate",
    "Custom Certificate"
  ];

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Students
      const stuRes = await fetch("http://localhost:5000/api/v1/students");
      const stuJson = await stuRes.json();
      if (stuJson.success && stuJson.students) {
        setStudents(stuJson.students);
        if (stuJson.students.length > 0) {
          const s = stuJson.students[0];
          setSelectedStudent(s);
          setCustomVars(prev => ({
            ...prev,
            studentName: s.name,
            fatherName: s.parentName || "Shri Parent",
            className: s.class || "10",
            section: s.section || "A",
            rollNumber: s.rollNo || "10-A-01"
          }));
        }
      }

      // 2. Fetch Templates
      const tplRes = await fetch("http://localhost:5000/api/v1/certificates/templates");
      const tplJson = await tplRes.json();
      if (tplJson.success) {
        setTemplates(tplJson.templates);
      }

      // 3. Fetch Next Certificate Number
      const noRes = await fetch("http://localhost:5000/api/v1/certificates/next-no");
      const noJson = await noRes.json();
      if (noJson.success) {
        setAutoCertNo(noJson.certificateNo);
      }

      // 4. Fetch Issued Certificates
      const certRes = await fetch("http://localhost:5000/api/v1/certificates/issued");
      const certJson = await certRes.json();
      if (certJson.success) {
        setIssuedCerts(certJson.certificates);
      }
    } catch (err) {
      console.error("Certificate data sync error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update variables when student selection changes
  const handleStudentSelect = (studentId: string) => {
    const s = students.find(item => item.id === studentId);
    if (s) {
      setSelectedStudent(s);
      setCustomVars(prev => ({
        ...prev,
        studentName: s.name,
        fatherName: s.parentName || "Shri Parent Name",
        className: s.class || "10",
        section: s.section || "A",
        rollNumber: s.rollNo || "10-A-01"
      }));
    }
  };

  // Interpolate body text for preview
  const getInterpolatedBody = () => {
    let text = templateForm.bodyContent || "";
    const map: Record<string, string> = {
      "{{studentName}}": customVars.studentName || "Student Name",
      "{{fatherName}}": customVars.fatherName || "Father Name",
      "{{className}}": customVars.className || "10",
      "{{section}}": customVars.section || "A",
      "{{rollNumber}}": customVars.rollNumber || "10-A-01",
      "{{academicYear}}": templateForm.academicYear,
      "{{date}}": templateForm.date,
      "{{schoolName}}": customVars.schoolName,
      "{{schoolAddress}}": customVars.schoolAddress
    };

    Object.entries(map).forEach(([key, val]) => {
      text = text.replaceAll(key, val);
    });
    return text;
  };

  // Issue Certificate Handler
  const handleIssueCertificate = async () => {
    try {
      const payload = {
        studentId: selectedStudent?.id || "s1",
        studentName: customVars.studentName,
        fatherName: customVars.fatherName,
        className: customVars.className,
        section: customVars.section,
        rollNumber: customVars.rollNumber,
        academicYear: templateForm.academicYear,
        certificateType: selectedCertType,
        headerTitle: templateForm.headerTitle,
        bodyContent: templateForm.bodyContent,
        footerText: templateForm.footerText,
        borderStyle: templateForm.borderStyle
      };

      const res = await fetch("http://localhost:5000/api/v1/certificates/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (json.success) {
        alert(`Certificate ${json.certificate.certificateNo} Generated Successfully!`);
        setPreviewCert(json.certificate);
        fetchData();
      }
    } catch (err) {
      alert("Failed to issue certificate.");
    }
  };

  const insertVariableIntoTemplate = (variableToken: string) => {
    setNewTemplate(prev => ({
      ...prev,
      bodyContent: prev.bodyContent + " " + variableToken
    }));
  };

  const filteredIssuedCerts = issuedCerts.filter(c => 
    c.certificateNo.toLowerCase().includes(searchIssued.toLowerCase()) ||
    c.studentName.toLowerCase().includes(searchIssued.toLowerCase()) ||
    c.certificateType.toLowerCase().includes(searchIssued.toLowerCase())
  );

  return (
    <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* HEADER BAR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Award size={28} color="var(--primary)" /> Certificate Generation &amp; Templates Console
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>
            Dynamic Template Engine, Auto-Increment Serial Numbers (SM-2026-00001) &amp; Instant PDF Printing
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={fetchData} className="btn btn-secondary" style={{ padding: "0.55rem 0.95rem", fontSize: "0.82rem", gap: "0.4rem" }}>
            <RefreshCw size={15} /> Refresh
          </button>
          <button onClick={() => setIsTemplateModalOpen(true)} className="btn btn-primary" style={{ padding: "0.55rem 1.15rem", fontSize: "0.82rem", gap: "0.45rem" }}>
            <Plus size={16} /> + New Custom Template
          </button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="glass-card" style={{ padding: "0.5rem", display: "flex", gap: "0.5rem" }}>
        {[
          { id: "generate", label: "Generate Certificate Wizard", icon: Award },
          { id: "templates", label: "Dynamic Template Library", icon: FileText },
          { id: "issued", label: "Issued Certificates Register", icon: CheckCircle2 }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "0.6rem 1rem", fontSize: "0.83rem", gap: "0.45rem", borderRadius: 8, fontWeight: isActive ? 700 : 500 }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GENERATE CERTIFICATE WIZARD */}
      {activeTab === "generate" && (
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "1.5rem", alignItems: "flex-start" }}>
          
          {/* LEFT: FORM WIZARD CONTROLS */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.6rem" }}>
              Certificate Issue Form
            </h3>

            {/* Auto Certificate Number Badge */}
            <div style={{ padding: "0.75rem", background: "rgba(139, 92, 246, 0.12)", border: "1px solid rgba(139, 92, 246, 0.3)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#a78bfa" }}>UNIQUE CERTIFICATE NUMBER</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff", marginTop: 2 }}>{autoCertNo}</div>
              </div>
              <span className="badge badge-success" style={{ fontSize: "0.65rem" }}>STRICT UNIQUE</span>
            </div>

            {/* Select Certificate Type */}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CERTIFICATE TYPE</label>
              <select
                value={selectedCertType}
                onChange={(e) => {
                  const type = e.target.value;
                  setSelectedCertType(type);
                  const matched = templates.find(t => t.certificateType === type);
                  if (matched) {
                    setTemplateForm(prev => ({
                      ...prev,
                      headerTitle: matched.headerTitle,
                      bodyContent: matched.bodyContent,
                      footerText: matched.footerText,
                      borderStyle: matched.borderStyle
                    }));
                  } else {
                    setTemplateForm(prev => ({
                      ...prev,
                      headerTitle: type.toUpperCase(),
                      bodyContent: "This is to certify that {{studentName}}, Son/Daughter of Shri {{fatherName}}, is a student of {{schoolName}} studying in Class {{className}}-{{section}}.",
                    }));
                  }
                }}
                style={{ width: "100%", padding: "0.65rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", borderRadius: 8, color: "#fff", fontSize: "0.85rem", outline: "none" }}
              >
                {certificateTypes.map(ct => <option key={ct} value={ct} style={{ background: "#0b0f19" }}>{ct}</option>)}
              </select>
            </div>

            {/* Select Student */}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT TARGET STUDENT</label>
              <select
                value={selectedStudent?.id || ""}
                onChange={(e) => handleStudentSelect(e.target.value)}
                style={{ width: "100%", padding: "0.65rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", borderRadius: 8, color: "#fff", fontSize: "0.85rem", outline: "none" }}
              >
                {students.map(s => (
                  <option key={s.id} value={s.id} style={{ background: "#0b0f19" }}>
                    {s.name} (Class {s.class}-{s.section}) • Roll {s.rollNo}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Variable Overrides */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: 10, border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--primary)" }}>DYNAMIC VARIABLES OVERRIDE</div>
              
              <div>
                <label style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>STUDENT NAME (&#123;&#123;studentName&#125;&#125;)</label>
                <input type="text" value={customVars.studentName} onChange={(e) => setCustomVars({ ...customVars, studentName: e.target.value })} style={{ width: "100%", padding: "0.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.8rem" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>FATHER NAME (&#123;&#123;fatherName&#125;&#125;)</label>
                <input type="text" value={customVars.fatherName} onChange={(e) => setCustomVars({ ...customVars, fatherName: e.target.value })} style={{ width: "100%", padding: "0.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.8rem" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <div>
                  <label style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>CLASS</label>
                  <input type="text" value={customVars.className} onChange={(e) => setCustomVars({ ...customVars, className: e.target.value })} style={{ width: "100%", padding: "0.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.8rem" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>SECTION</label>
                  <input type="text" value={customVars.section} onChange={(e) => setCustomVars({ ...customVars, section: e.target.value })} style={{ width: "100%", padding: "0.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff", fontSize: "0.8rem" }} />
                </div>
              </div>
            </div>

            <button onClick={handleIssueCertificate} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", fontWeight: 800 }}>
              <Award size={18} /> Issue &amp; Generate Certificate
            </button>
          </div>

          {/* RIGHT: LIVE CANVAS PREVIEW CARD */}
          <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "#0f172a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>Live Certificate Canvas Preview</h3>
              <button onClick={() => window.print()} className="btn btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", gap: "0.4rem" }}>
                <Printer size={14} /> Print Certificate
              </button>
            </div>

            {/* DYNAMIC CANVAS BOARD */}
            <div style={{
              background: "#fff",
              color: "#0f172a",
              padding: "3rem 2.5rem",
              borderRadius: "16px",
              border: templateForm.borderStyle === "Classic Gold" ? "12px double #d97706" :
                      templateForm.borderStyle === "Royal Blue" ? "12px double #2563eb" :
                      templateForm.borderStyle === "Emerald Minimal" ? "8px solid #059669" : "10px dashed #7c3aed",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative"
            }}>
              
              {/* LOGO & SCHOOL NAME */}
              <div style={{ width: 64, height: 64, background: "#8b5cf6", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontWeight: 900, fontSize: "1.5rem", marginBottom: "0.75rem" }}>
                SM
              </div>

              <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#1e1b4b", tracking: "0.05em", textTransform: "uppercase" }}>
                {customVars.schoolName}
              </h2>
              <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>
                {customVars.schoolAddress}
              </div>

              <div style={{ width: "80%", height: "2px", background: "#e2e8f0", margin: "1.25rem 0" }} />

              {/* CERTIFICATE HEADER TITLE */}
              <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#b45309", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                {templateForm.headerTitle}
              </div>

              {/* SERIAL NUMBER & ISSUE DATE BADGES */}
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#475569", fontWeight: 700, marginBottom: "1.75rem", padding: "0 1rem" }}>
                <span>CERTIFICATE NO: <strong>{autoCertNo}</strong></span>
                <span>DATE: <strong>{templateForm.date}</strong></span>
              </div>

              {/* INTERPOLATED BODY CONTENT TEXT */}
              <div style={{ fontSize: "1rem", color: "#334155", lineHeight: "1.8", whiteSpace: "pre-line", maxWidth: "90%", fontWeight: 500 }}>
                {getInterpolatedBody()}
              </div>

              {/* FOOTER SIGNATURE & QR CODE VERIFICATION */}
              <div style={{ width: "100%", marginTop: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", textAlign: "left" }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=http://localhost:5000/verify/${autoCertNo}`} 
                    alt="QR" 
                    style={{ width: 64, height: 64, borderRadius: 6, border: "1px solid #cbd5e1" }} 
                  />
                  <div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#10b981" }}>✓ VERIFIED CERTIFICATE</div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#0f172a" }}>Certificate ID: {autoCertNo}</div>
                    <div style={{ fontSize: "0.65rem", color: "#64748b" }}>schoolmitra.com/verify/{autoCertNo}</div>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 140, borderBottom: "2px solid #0f172a", marginBottom: 6 }} />
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a" }}>{templateForm.footerText}</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Principal Signature</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: DYNAMIC TEMPLATE LIBRARY */}
      {activeTab === "templates" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {templates.map(tpl => (
              <div key={tpl._id} className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{tpl.templateName}</h4>
                  <span className="badge badge-info" style={{ fontSize: "0.68rem" }}>{tpl.borderStyle}</span>
                </div>

                <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700 }}>
                  TYPE: {tpl.certificateType}
                </div>

                <div style={{ background: "rgba(0,0,0,0.3)", padding: "0.85rem", borderRadius: 8, fontSize: "0.78rem", color: "var(--text-muted)", maxHeight: 100, overflowY: "auto", whiteSpace: "pre-line" }}>
                  {tpl.bodyContent}
                </div>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                  <button onClick={() => {
                    setSelectedCertType(tpl.certificateType);
                    setTemplateForm(prev => ({
                      ...prev,
                      headerTitle: tpl.headerTitle,
                      bodyContent: tpl.bodyContent,
                      footerText: tpl.footerText,
                      borderStyle: tpl.borderStyle
                    }));
                    setActiveTab("generate");
                  }} className="btn btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "0.78rem", padding: "0.5rem" }}>
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ISSUED CERTIFICATES REGISTER */}
      {activeTab === "issued" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>Official Issued Certificates Audit Register</h3>
            
            <div style={{ position: "relative", width: 280 }}>
              <Search size={16} style={{ position: "absolute", left: 10, top: 10, color: "var(--text-muted)" }} />
              <input
                type="text"
                value={searchIssued}
                onChange={(e) => setSearchIssued(e.target.value)}
                placeholder="Search Cert No or Student..."
                style={{ width: "100%", padding: "0.55rem 0.75rem 0.55rem 2.2rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", borderRadius: 8, color: "#fff", fontSize: "0.82rem" }}
              />
            </div>
          </div>

          <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)", textAlign: "left", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <th style={{ padding: "0.75rem" }}>CERTIFICATE NO</th>
                <th style={{ padding: "0.75rem" }}>STUDENT NAME</th>
                <th style={{ padding: "0.75rem" }}>CLASS &amp; ROLL</th>
                <th style={{ padding: "0.75rem" }}>TYPE</th>
                <th style={{ padding: "0.75rem" }}>ISSUE DATE</th>
                <th style={{ padding: "0.75rem" }}>STATUS</th>
                <th style={{ padding: "0.75rem", textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssuedCerts.map((c) => (
                <tr key={c._id} style={{ borderBottom: "1px solid var(--border-color)", fontSize: "0.82rem" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 800, color: "var(--primary)" }}>{c.certificateNo}</td>
                  <td style={{ padding: "0.75rem", fontWeight: 700, color: "#fff" }}>{c.studentName}</td>
                  <td style={{ padding: "0.75rem" }}>Class {c.className}-{c.section} ({c.rollNumber})</td>
                  <td style={{ padding: "0.75rem" }}>{c.certificateType}</td>
                  <td style={{ padding: "0.75rem", color: "var(--text-muted)" }}>{new Date(c.issueDate).toLocaleDateString("en-IN")}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <span className="badge badge-success" style={{ fontSize: "0.68rem" }}>{c.status}</span>
                  </td>
                  <td style={{ padding: "0.75rem", textAlign: "right" }}>
                    <button onClick={() => setPreviewCert(c)} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.3rem" }}>
                      <Eye size={13} /> View &amp; Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* NEW CUSTOM TEMPLATE MODAL */}
      {isTemplateModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: "1rem" }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 540, background: "#0f172a", border: "1px solid #334155", borderRadius: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>Create Dynamic Certificate Template</h3>
              <button onClick={() => setIsTemplateModalOpen(false)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await fetch("http://localhost:5000/api/v1/certificates/templates", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(newTemplate)
                });
                setIsTemplateModalOpen(false);
                fetchData();
              } catch (err) {
                alert("Failed to save template.");
              }
            }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: 4 }}>TEMPLATE NAME</label>
                <input type="text" value={newTemplate.templateName} onChange={(e) => setNewTemplate({ ...newTemplate, templateName: e.target.value })} placeholder="e.g. Science Fair Merit Certificate" required style={{ width: "100%", padding: "0.65rem", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: "0.85rem" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: 4 }}>INSERT DYNAMIC VARIABLE TOKENS</label>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {[
                    "{{studentName}}",
                    "{{fatherName}}",
                    "{{className}}",
                    "{{section}}",
                    "{{rollNumber}}",
                    "{{academicYear}}",
                    "{{date}}",
                    "{{schoolName}}"
                  ].map(varToken => (
                    <button
                      key={varToken}
                      type="button"
                      onClick={() => insertVariableIntoTemplate(varToken)}
                      style={{ padding: "0.25rem 0.5rem", background: "rgba(139, 92, 246, 0.2)", border: "1px solid rgba(139, 92, 246, 0.4)", color: "#c4b5fd", borderRadius: 6, fontSize: "0.7rem", cursor: "pointer" }}
                    >
                      + {varToken}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: 4 }}>BODY CONTENT TEMPLATE</label>
                <textarea rows={4} value={newTemplate.bodyContent} onChange={(e) => setNewTemplate({ ...newTemplate, bodyContent: e.target.value })} required style={{ width: "100%", padding: "0.65rem", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: "0.85rem" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsTemplateModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Template</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW & PRINT CERTIFICATE MODAL */}
      {previewCert && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: "1rem" }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 680, background: "#fff", color: "#0f172a", borderRadius: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", color: "#0f172a" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 900 }}>Issued Certificate Preview</h3>
              <button onClick={() => setPreviewCert(null)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}>
                <X size={22} />
              </button>
            </div>

            <div style={{
              padding: "2.5rem 2rem",
              border: "10px double #d97706",
              borderRadius: 12,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1e1b4b" }}>ABC PUBLIC SCHOOL</h2>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Sector 12, Dwarka, New Delhi - 110075</div>
              
              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#b45309", margin: "1rem 0" }}>
                {previewCert.certificateType || "CERTIFICATE"}
              </div>

              <div style={{ width: "100%", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#475569", fontWeight: 700, marginBottom: "1rem" }}>
                <span>CERT NO: {previewCert.certificateNo}</span>
                <span>DATE: {new Date(previewCert.issueDate).toLocaleDateString("en-IN")}</span>
              </div>

              <div style={{ fontSize: "0.95rem", color: "#334155", lineHeight: "1.7", whiteSpace: "pre-line" }}>
                {previewCert.populatedContent}
              </div>

              <div style={{ width: "100%", marginTop: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Issued By: {previewCert.issuedBy}</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 120, borderBottom: "2px solid #0f172a", marginBottom: 4 }} />
                  <div style={{ fontSize: "0.8rem", fontWeight: 800 }}>Principal Signature</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.25rem" }}>
              <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: "0.55rem 1.25rem" }}>
                <Printer size={16} /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
