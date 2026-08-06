"use client";

import React, { useState, useEffect } from "react";
import { 
  UserPlus, Upload, CreditCard, FileCheck, BadgeCheck, ArrowRight, UserCheck, 
  Printer, Download, CheckCircle2, QrCode, ShieldCheck, Sparkles, AlertCircle, FileText,
  RotateCw, Layers, Phone, MapPin, Mail, Calendar, HeartPulse, Award, ShieldAlert
} from "lucide-react";

interface StudentRecord {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  className: string;
  section: string;
  rollNo: string;
  gender: string;
  bloodGroup: string;
  dob?: string;
  emergencyPhone?: string;
  fatherName?: string;
  motherName?: string;
  parentPhone?: string;
  parentEmail?: string;
  address?: string;
  photoUrl?: string;
  documentsUploaded?: {
    aadhaar?: boolean;
    birthCert?: boolean;
    tc?: boolean;
    photo?: boolean;
  };
  idStatus?: string;
}

export default function AdmissionPage() {
  const [activeTab, setActiveTab] = useState<"reg" | "parent" | "docs" | "id">("reg");
  const [cardSide, setCardSide] = useState<"front" | "back" | "both">("both");
  const [cardTheme, setCardTheme] = useState<"navy" | "emerald" | "crimson" | "dark">("navy");

  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: "STU-001",
      studentId: "STU-1001-2026",
      firstName: "Aarav",
      lastName: "Sharma",
      fullName: "Aarav Sharma",
      className: "Class 10",
      section: "Section A",
      rollNo: "01",
      gender: "Male",
      bloodGroup: "B+",
      dob: "2010-05-14",
      fatherName: "Ramesh Sharma",
      motherName: "Sunita Sharma",
      parentPhone: "+91 98765 43210",
      parentEmail: "ramesh.sharma@gmail.com",
      address: "Plot 42, Sector 12, Dwarka, New Delhi - 110075",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      documentsUploaded: { aadhaar: true, birthCert: true, tc: true, photo: true },
      idStatus: "ISSUED"
    },
    {
      id: "STU-002",
      studentId: "STU-1002-2026",
      firstName: "Ananya",
      lastName: "Patel",
      fullName: "Ananya Patel",
      className: "Class 9",
      section: "Section B",
      rollNo: "12",
      gender: "Female",
      bloodGroup: "O+",
      dob: "2011-08-22",
      fatherName: "Vikram Patel",
      motherName: "Pooja Patel",
      parentPhone: "+91 98123 45678",
      parentEmail: "vikram.patel@gmail.com",
      address: "House 18, Block C, Vasant Kunj, New Delhi - 110070",
      photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
      documentsUploaded: { aadhaar: true, birthCert: true, tc: false, photo: true },
      idStatus: "PENDING"
    }
  ]);

  const [selectedStudentId, setSelectedStudentId] = useState<string>("STU-001");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form States (With Real-Time Sync)
  const [regForm, setRegForm] = useState({
    firstName: "Aarav",
    lastName: "Sharma",
    className: "Class 10",
    section: "Section A",
    gender: "Male",
    dob: "2011-05-14",
    bloodGroup: "B+",
    emergencyPhone: "+91 98765 43210"
  });

  const [parentForm, setParentForm] = useState({
    fatherName: "Ramesh Sharma",
    motherName: "Sunita Sharma",
    parentPhone: "+91 98765 43210",
    parentEmail: "ramesh.sharma@gmail.com",
    address: "Plot 42, Sector 12, Dwarka, New Delhi - 110075"
  });

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, { name: string; size: string }>>({});
  const [docState, setDocState] = useState({
    aadhaar: false,
    birthCert: false,
    tc: false,
    photo: false
  });

  // Fetch Students from Backend API on Mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem("sm_admissions_students");
      if (cached) {
        setStudents(JSON.parse(cached));
      }

      fetch("http://localhost:5000/api/v1/admin/students")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.students && data.students.length > 0) {
            setStudents(data.students);
            if (!selectedStudentId) {
              setSelectedStudentId(data.students[0].id);
            }
          }
        })
        .catch(() => {});
    } catch (e) {
      console.error("Failed to load student admissions:", e);
    }
  }, []);

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Sync Form when current student changes
  useEffect(() => {
    if (currentStudent) {
      setRegForm({
        firstName: currentStudent.firstName || "",
        lastName: currentStudent.lastName || "",
        className: currentStudent.className || "Class 10",
        section: currentStudent.section || "Section A",
        gender: currentStudent.gender || "Male",
        dob: currentStudent.dob || "2011-01-01",
        bloodGroup: currentStudent.bloodGroup || "B+",
        emergencyPhone: currentStudent.parentPhone || ""
      });

      setParentForm({
        fatherName: currentStudent.fatherName || "",
        motherName: currentStudent.motherName || "",
        parentPhone: currentStudent.parentPhone || "",
        parentEmail: currentStudent.parentEmail || "",
        address: currentStudent.address || ""
      });
    }
  }, [selectedStudentId]);

  // Submit Student Registration
  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.firstName || !regForm.lastName) return;

    const newId = `STU-${String(students.length + 1).padStart(3, "0")}`;
    const newStudentId = `STU-${Math.floor(1000 + Math.random() * 9000)}-2026`;

    const newStudent: StudentRecord = {
      id: newId,
      studentId: newStudentId,
      firstName: regForm.firstName,
      lastName: regForm.lastName,
      fullName: `${regForm.firstName} ${regForm.lastName}`,
      className: regForm.className,
      section: regForm.section,
      rollNo: String(students.length + 1).padStart(2, "0"),
      gender: regForm.gender,
      bloodGroup: regForm.bloodGroup,
      dob: regForm.dob,
      emergencyPhone: regForm.emergencyPhone,
      fatherName: parentForm.fatherName,
      motherName: parentForm.motherName,
      parentPhone: parentForm.parentPhone,
      parentEmail: parentForm.parentEmail,
      address: parentForm.address,
      photoUrl: regForm.gender === "Female" 
        ? "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
      documentsUploaded: { aadhaar: false, birthCert: false, tc: false, photo: false },
      idStatus: "PENDING"
    };

    const updatedList = [newStudent, ...students];
    setStudents(updatedList);
    setSelectedStudentId(newId);

    try {
      localStorage.setItem("sm_admissions_students", JSON.stringify(updatedList));
      fetch("http://localhost:5000/api/v1/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student: newStudent })
      }).catch(() => {});
    } catch (err) {}

    setSuccessMessage(`Student ${newStudent.fullName} registered successfully! ID Card generated for ${newStudentId}!`);
    setTimeout(() => {
      setSuccessMessage(null);
      setActiveTab("parent");
    }, 1400);
  };

  // Submit Parent Linkage
  const handleParentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent) return;

    const updatedList = students.map(s => {
      if (s.id === currentStudent.id) {
        return {
          ...s,
          fatherName: parentForm.fatherName || s.fatherName,
          motherName: parentForm.motherName || s.motherName,
          parentPhone: parentForm.parentPhone || s.parentPhone,
          parentEmail: parentForm.parentEmail || s.parentEmail,
          address: parentForm.address || s.address
        };
      }
      return s;
    });

    setStudents(updatedList);
    try {
      localStorage.setItem("sm_admissions_students", JSON.stringify(updatedList));
    } catch (e) {}

    setSuccessMessage(`Parent details linked & ID Card updated for ${currentStudent.fullName}!`);
    setTimeout(() => {
      setSuccessMessage(null);
      setActiveTab("docs");
    }, 1200);
  };

  // Real File Upload Handler
  const handleRealFileChange = (docKey: "aadhaar" | "birthCert" | "tc" | "photo", event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      setUploadedFiles(prev => ({
        ...prev,
        [docKey]: { name: file.name, size: fileSize }
      }));
      handleDocUpload(docKey);
    }
  };

  // Document Upload Action
  const handleDocUpload = (docKey: "aadhaar" | "birthCert" | "tc" | "photo") => {
    setDocState(prev => ({ ...prev, [docKey]: true }));
    if (!currentStudent) return;

    const updatedList = students.map(s => {
      if (s.id === currentStudent.id) {
        return {
          ...s,
          documentsUploaded: {
            ...s.documentsUploaded,
            [docKey]: true
          }
        };
      }
      return s;
    });

    setStudents(updatedList);
    try {
      localStorage.setItem("sm_admissions_students", JSON.stringify(updatedList));
    } catch (e) {}
  };

  // Issue ID Card Action
  const handleIssueIdCard = () => {
    if (!currentStudent) return;
    const updatedList = students.map(s => {
      if (s.id === currentStudent.id) {
        return { ...s, idStatus: "ISSUED" };
      }
      return s;
    });

    setStudents(updatedList);
    try {
      localStorage.setItem("sm_admissions_students", JSON.stringify(updatedList));
    } catch (e) {}

    alert(`Physical Lanyard ID Card issued & activated for ${currentStudent.fullName} (${currentStudent.studentId})!`);
  };

  // Theme Config Maps
  const themeStyles = {
    navy: {
      headerBg: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)",
      accent: "#2563eb",
      badgeBg: "#eff6ff",
      badgeText: "#1d4ed8",
      cardBorder: "#cbd5e1"
    },
    emerald: {
      headerBg: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)",
      accent: "#059669",
      badgeBg: "#ecfdf5",
      badgeText: "#047857",
      cardBorder: "#a7f3d0"
    },
    crimson: {
      headerBg: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)",
      accent: "#dc2626",
      badgeBg: "#fef2f2",
      badgeText: "#b91c1c",
      cardBorder: "#fecaca"
    },
    dark: {
      headerBg: "linear-gradient(135deg, #090d16 0%, #1e293b 50%, #334155 100%)",
      accent: "#d97706",
      badgeBg: "#fffbeb",
      badgeText: "#b45309",
      cardBorder: "#fde68a"
    }
  };

  const selectedTheme = themeStyles[cardTheme];

  // Dynamic Derived Values for ID Card
  const liveStudentName = `${regForm.firstName || "Student"} ${regForm.lastName || ""}`.trim();
  const liveClassInfo = `${regForm.className || "Class 10"} • ${regForm.section || "Section A"}`;
  const liveBloodGroup = regForm.bloodGroup || "B+";
  const liveParentContact = parentForm.parentPhone || regForm.emergencyPhone || "+91 98765 43210";
  const liveFatherName = parentForm.fatherName || "Parent";
  const liveAddress = parentForm.address || "Plot 42, Sector 12, Dwarka, New Delhi - 110075";
  const livePhotoUrl = regForm.gender === "Female" 
    ? "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80"
    : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Student Admission &amp; Onboarding Portal</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0 }}>Register new students, link parent details, upload documents, and auto-generate live smart ID cards.</p>
        </div>

        {/* Student Selector Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700 }}>Select Student:</span>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            style={{ padding: "0.55rem 0.9rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.fullName} ({s.studentId}) — {s.className}</option>
            ))}
          </select>
        </div>
      </div>

      {/* SUCCESS NOTIFICATION BANNER */}
      {successMessage && (
        <div className="glass-card" style={{ padding: "1rem 1.25rem", background: "rgba(34, 197, 94, 0.15)", border: "1px solid rgba(34, 197, 94, 0.3)", color: "var(--success)", display: "flex", alignItems: "center", gap: "0.75rem", borderRadius: 12 }}>
          <CheckCircle2 size={20} />
          <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{successMessage}</span>
        </div>
      )}

      {/* STEP TABS HEADER */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button onClick={() => setActiveTab("reg")} className={`btn ${activeTab === 'reg' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem" }}>
          <UserPlus size={16} /> 1. Student Registration
        </button>
        <button onClick={() => setActiveTab("parent")} className={`btn ${activeTab === 'parent' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem" }}>
          <UserCheck size={16} /> 2. Parent Linkage
        </button>
        <button onClick={() => setActiveTab("docs")} className={`btn ${activeTab === 'docs' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem" }}>
          <Upload size={16} /> 3. Document Upload
        </button>
        <button onClick={() => setActiveTab("id")} className={`btn ${activeTab === 'id' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem" }}>
          <BadgeCheck size={16} /> 4. Physical Smart ID Generator
        </button>
      </div>

      {/* MAIN LAYOUT split with LIVE PREVIEW */}
      <div style={{ display: "grid", gridTemplateColumns: activeTab === "id" ? "1fr" : "1fr 340px", gap: "1.5rem" }}>
        
        {/* FORM CONTENT BODY */}
        <div className="glass-card" style={{ padding: "2rem" }}>

          {/* ════════════ TAB 1: STUDENT REGISTRATION ════════════ */}
          {activeTab === "reg" && (
            <form onSubmit={handleRegSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>New Student Admission Form</h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>ID Card auto-updates live as you fill this form.</p>
                </div>
                <span className="badge badge-info">Step 1 of 4</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FIRST NAME</label>
                  <input 
                    type="text" 
                    value={regForm.firstName}
                    onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                    placeholder="e.g. Aarav" 
                    required 
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }} 
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LAST NAME</label>
                  <input 
                    type="text" 
                    value={regForm.lastName}
                    onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                    placeholder="e.g. Sharma" 
                    required 
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }} 
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CLASS ADMISSION</label>
                  <select 
                    value={regForm.className}
                    onChange={(e) => setRegForm({ ...regForm, className: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }}
                  >
                    {["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SECTION</label>
                  <select 
                    value={regForm.section}
                    onChange={(e) => setRegForm({ ...regForm, section: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }}
                  >
                    {["Section A", "Section B", "Section C", "Section D"].map(sec => (
                      <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>GENDER</label>
                  <select 
                    value={regForm.gender}
                    onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BLOOD GROUP</label>
                  <select 
                    value={regForm.bloodGroup}
                    onChange={(e) => setRegForm({ ...regForm, bloodGroup: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }}
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DATE OF BIRTH</label>
                  <input 
                    type="date" 
                    value={regForm.dob}
                    onChange={(e) => setRegForm({ ...regForm, dob: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", justifyContent: "center", marginTop: "0.75rem", fontSize: "0.9rem", gap: "0.5rem" }}>
                Save Admission Registration &amp; Proceed <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* ════════════ TAB 2: PARENT LINKAGE ════════════ */}
          {activeTab === "parent" && (
            <form onSubmit={handleParentSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Parent &amp; Guardian Linkage</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>Linking parent records for student: <strong style={{ color: "var(--primary)" }}>{liveStudentName}</strong></p>
                </div>
                <span className="badge badge-info">Step 2 of 4</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FATHER'S FULL NAME</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ramesh Sharma" 
                    value={parentForm.fatherName}
                    onChange={(e) => setParentForm({ ...parentForm, fatherName: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }} 
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MOTHER'S FULL NAME</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sunita Sharma" 
                    value={parentForm.motherName}
                    onChange={(e) => setParentForm({ ...parentForm, motherName: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }} 
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PARENT CONTACT PHONE (+91)</label>
                  <input 
                    type="text" 
                    placeholder="+91 98765 43210" 
                    value={parentForm.parentPhone}
                    onChange={(e) => setParentForm({ ...parentForm, parentPhone: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }} 
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PARENT EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    placeholder="parent@email.com" 
                    value={parentForm.parentEmail}
                    onChange={(e) => setParentForm({ ...parentForm, parentEmail: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>RESIDENTIAL ADDRESS</label>
                <textarea 
                  rows={3} 
                  placeholder="Complete postal address..." 
                  value={parentForm.address}
                  onChange={(e) => setParentForm({ ...parentForm, address: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem", resize: "none" }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", justifyContent: "center", marginTop: "0.5rem", fontSize: "0.9rem", gap: "0.5rem" }}>
                Link Parent Account &amp; Proceed to Uploads <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* ════════════ TAB 3: DOCUMENT UPLOAD ════════════ */}
          {activeTab === "docs" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Document Verification &amp; Uploads</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>Uploading verification files for: <strong style={{ color: "var(--primary)" }}>{liveStudentName}</strong></p>
                </div>
                <span className="badge badge-info">Step 3 of 4</span>
              </div>

              {/* CENTRAL DRAG AND DROP ZONE */}
              <div 
                onClick={() => document.getElementById("file-input-photo")?.click()}
                style={{ border: "2px dashed var(--primary)", padding: "1.5rem", borderRadius: 12, background: "rgba(99, 102, 241, 0.05)", textAlign: "center", cursor: "pointer", transition: "all 0.2s ease" }}
              >
                <Upload size={36} style={{ color: "var(--primary)", margin: "0 auto 0.5rem auto" }} />
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-heading)" }}>Click to Select File or Drag &amp; Drop Documents</div>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "4px 0 0 0" }}>Supports PDF, JPG, PNG files (Aadhaar, Birth Certificate, TC, Photo)</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {[
                  { title: "Birth Certificate", key: "birthCert" as const, desc: "PDF or JPEG copy" },
                  { title: "Aadhaar Card Copy", key: "aadhaar" as const, desc: "Government UIDAI PDF" },
                  { title: "Transfer Certificate (TC)", key: "tc" as const, desc: "Previous School TC" },
                  { title: "Passport Size Photograph", key: "photo" as const, desc: "High-resolution portrait photo" }
                ].map((doc) => {
                  const isUploaded = docState[doc.key] || !!currentStudent?.documentsUploaded?.[doc.key];
                  const fileInfo = uploadedFiles[doc.key];
                  return (
                    <div 
                      key={doc.key} 
                      onClick={() => document.getElementById(`file-input-${doc.key}`)?.click()}
                      style={{ 
                        border: `2px ${isUploaded ? "solid var(--success)" : "dashed var(--border-color)"}`, 
                        padding: "1.25rem", 
                        borderRadius: 12, 
                        background: isUploaded ? "rgba(34, 197, 94, 0.06)" : "var(--bg-input)", 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        textAlign: "center", 
                        gap: "0.5rem", 
                        position: "relative",
                        cursor: "pointer"
                      }}
                    >
                      <input 
                        type="file" 
                        id={`file-input-${doc.key}`}
                        accept="image/*,application/pdf"
                        style={{ display: "none" }}
                        onChange={(e) => handleRealFileChange(doc.key, e)}
                      />

                      {isUploaded ? <CheckCircle2 size={32} style={{ color: "var(--success)" }} /> : <Upload size={32} style={{ color: "var(--primary)" }} />}
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-heading)" }}>{doc.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                          {fileInfo ? `${fileInfo.name} (${fileInfo.size})` : doc.desc}
                        </div>
                      </div>
                      
                      <div style={{ marginTop: 4, display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        {isUploaded && (
                          <span className="badge badge-success" style={{ fontSize: "0.7rem" }}>Uploaded &amp; Verified ✅</span>
                        )}
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById(`file-input-${doc.key}`)?.click();
                          }} 
                          className={`btn ${isUploaded ? 'btn-secondary' : 'btn-primary'}`}
                          style={{ padding: "0.4rem 0.85rem", fontSize: "0.75rem", cursor: "pointer" }}
                        >
                          {isUploaded ? "Re-upload / Change File" : "Choose File to Upload"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button onClick={() => setActiveTab("id")} className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", justifyContent: "center", marginTop: "1rem", fontSize: "0.9rem", gap: "0.5rem" }}>
                Proceed to Generate Physical ID Card <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* ════════════ TAB 4: WORLD-CLASS PHYSICAL SMART ID CARD SHOWCASE ════════════ */}
          {activeTab === "id" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
              
              {/* Header Toolbar Controls */}
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 850, margin: 0, color: "var(--text-heading)" }}>Official Physical Smart Lanyard ID Badge Generator</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>High-resolution CR80 smartcard with RFID gate telemetry &amp; dual-side verification.</p>
                </div>

                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
                  {/* View Side Selector */}
                  <div style={{ display: "flex", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, padding: 3 }}>
                    <button onClick={() => setCardSide("both")} style={{ padding: "0.35rem 0.7rem", fontSize: "0.75rem", borderRadius: 6, border: "none", background: cardSide === "both" ? "var(--primary)" : "transparent", color: cardSide === "both" ? "#fff" : "var(--text-muted)", cursor: "pointer", fontWeight: 700 }}>
                      Dual Side
                    </button>
                    <button onClick={() => setCardSide("front")} style={{ padding: "0.35rem 0.7rem", fontSize: "0.75rem", borderRadius: 6, border: "none", background: cardSide === "front" ? "var(--primary)" : "transparent", color: cardSide === "front" ? "#fff" : "var(--text-muted)", cursor: "pointer", fontWeight: 700 }}>
                      Front Side
                    </button>
                    <button onClick={() => setCardSide("back")} style={{ padding: "0.35rem 0.7rem", fontSize: "0.75rem", borderRadius: 6, border: "none", background: cardSide === "back" ? "var(--primary)" : "transparent", color: cardSide === "back" ? "#fff" : "var(--text-muted)", cursor: "pointer", fontWeight: 700 }}>
                      Back Side
                    </button>
                  </div>

                  {/* Color Theme Selector */}
                  <select 
                    value={cardTheme}
                    onChange={(e) => setCardTheme(e.target.value as any)}
                    style={{ padding: "0.45rem 0.75rem", borderRadius: 8, background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-main)", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    <option value="navy">Theme: Royal Navy Gold</option>
                    <option value="emerald">Theme: Emerald Prestige</option>
                    <option value="crimson">Theme: Crimson Elite</option>
                    <option value="dark">Theme: Obsidian Gold</option>
                  </select>

                  <button onClick={() => window.print()} className="btn btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                    <Printer size={15} /> Print Card
                  </button>
                  <button onClick={handleIssueIdCard} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                    <CheckCircle2 size={15} /> Issue Card
                  </button>
                </div>
              </div>

              {/* REALISTIC PHYSICAL FABRIC LANYARD & BADGE SHOWCASE CONTAINER */}
              <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap", padding: "1.5rem 0" }}>

                {/* ════════════ FRONT SIDE CARD MOCKUP ════════════ */}
                {(cardSide === "front" || cardSide === "both") && (
                  <div style={{ position: "relative", paddingTop: "50px" }}>
                    
                    {/* Fabric Lanyard Strap & Metal Clasp */}
                    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 80, height: 60, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 20 }}>
                      <div style={{ width: 26, height: 35, background: selectedTheme.headerBg, borderRadius: "4px 4px 0 0", boxShadow: "0 3px 6px rgba(0,0,0,0.35)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <span style={{ fontSize: "0.45rem", color: "#fff", fontWeight: 900, writingMode: "vertical-rl", letterSpacing: "1px" }}>DPS SMART</span>
                      </div>
                      <div style={{ width: 36, height: 18, background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #64748b 100%)", borderRadius: 4, border: "1px solid #475569", boxShadow: "0 4px 10px rgba(0,0,0,0.4)" }}></div>
                    </div>

                    {/* CR80 Physical Plastic Card (FRONT) */}
                    <div 
                      style={{ 
                        width: "340px", 
                        minHeight: "510px",
                        background: "#ffffff", 
                        border: `2px solid ${selectedTheme.cardBorder}`, 
                        borderRadius: "20px", 
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(37, 99, 235, 0.12)",
                        color: "#0f172a",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      {/* Holographic Ribbon Top Border */}
                      <div style={{ width: "100%", height: 6, background: "linear-gradient(90deg, #f59e0b, #ec4899, #6366f1, #10b981)" }}></div>

                      {/* School Header Banner */}
                      <div style={{ width: "100%", background: selectedTheme.headerBg, padding: "1.2rem 1rem 0.85rem 1rem", textAlign: "center", position: "relative" }}>
                        <div style={{ width: 44, height: 8, background: "#0b0f19", borderRadius: 10, margin: "0 auto 0.6rem auto", border: "1px solid rgba(255,255,255,0.4)" }}></div>

                        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.62rem", fontWeight: 800, color: "#fbbf24", letterSpacing: "1px", textTransform: "uppercase", background: "rgba(0,0,0,0.35)", padding: "0.2rem 0.65rem", borderRadius: 20, marginBottom: 6, border: "1px solid rgba(251, 191, 36, 0.4)" }}>
                          <ShieldCheck size={13} style={{ color: "#fbbf24" }} /> <span style={{ color: "#fbbf24" }}>OFFICIAL STUDENT IDENTIFICATION</span>
                        </div>

                        <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#ffffff", margin: 0, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                          DELHI PUBLIC SCHOOL
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "#f1f5f9", margin: "3px 0 0 0", fontWeight: 700, letterSpacing: "0.3px" }}>
                          CBSE AFFILIATED &bull; ACADEMIC SESSION 2026&ndash;2027
                        </div>
                      </div>

                      {/* Student Photo Frame & Status Tag */}
                      <div style={{ marginTop: "-22px", position: "relative", marginBottom: "0.75rem" }}>
                        <img 
                          src={livePhotoUrl} 
                          alt={liveStudentName}
                          style={{ 
                            width: "105px", 
                            height: "105px", 
                            borderRadius: "50%", 
                            objectFit: "cover",
                            border: "4px solid #ffffff",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
                          }}
                        />

                        <span 
                          style={{ 
                            position: "absolute", 
                            bottom: -6, 
                            left: "50%", 
                            transform: "translateX(-50%)", 
                            background: currentStudent?.idStatus === "ISSUED" ? "#16a34a" : "#ea580c", 
                            color: "#ffffff", 
                            fontSize: "0.58rem", 
                            fontWeight: 800, 
                            padding: "0.15rem 0.6rem", 
                            borderRadius: 10,
                            whiteSpace: "nowrap",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                          }}
                        >
                          {currentStudent?.idStatus === "ISSUED" ? "ACTIVE STUDENT" : "PENDING ISSUE"}
                        </span>
                      </div>

                      {/* Student Main Details */}
                      <div style={{ textAlign: "center", width: "100%", padding: "0 1.25rem", marginBottom: "0.75rem" }}>
                        <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>
                          {liveStudentName}
                        </h3>
                        <div style={{ display: "inline-block", background: selectedTheme.badgeBg, color: selectedTheme.badgeText, fontWeight: 800, fontSize: "0.82rem", padding: "0.25rem 0.85rem", borderRadius: 14, marginTop: 4, border: `1px solid ${selectedTheme.cardBorder}` }}>
                          {liveClassInfo} &bull; Roll #{currentStudent?.rollNo || "01"}
                        </div>
                      </div>

                      {/* Metadata Specs Grid */}
                      <div style={{ width: "calc(100% - 2.5rem)", background: "#f8fafc", padding: "0.75rem", borderRadius: 12, border: "1px solid #e2e8f0", marginBottom: "0.85rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.75rem" }}>
                          <div>
                            <span style={{ color: "#64748b", fontSize: "0.62rem", fontWeight: 700, display: "block" }}>ADMISSION NO</span>
                            <strong style={{ color: "#0f172a", fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 800 }}>{currentStudent?.studentId || "STU-1001-2026"}</strong>
                          </div>
                          <div>
                            <span style={{ color: "#64748b", fontSize: "0.62rem", fontWeight: 700, display: "block" }}>BLOOD GROUP</span>
                            <strong style={{ color: "#dc2626", fontSize: "0.85rem", fontWeight: 900 }}>{liveBloodGroup}</strong>
                          </div>
                          <div style={{ gridColumn: "span 2", paddingTop: 4, borderTop: "1px solid #e2e8f0" }}>
                            <span style={{ color: "#64748b", fontSize: "0.62rem", fontWeight: 700, display: "block" }}>EMERGENCY PARENT CONTACT</span>
                            <strong style={{ color: "#0f172a", fontSize: "0.8rem", fontWeight: 800 }}>{liveParentContact} ({liveFatherName})</strong>
                          </div>
                        </div>
                      </div>

                      {/* Barcode & Hologram Seal Footer */}
                      <div style={{ width: "calc(100% - 2.5rem)", background: "#ffffff", border: "1px solid #e2e8f0", padding: "0.5rem", borderRadius: 8, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <div style={{ width: "100%", height: "26px", background: "repeating-linear-gradient(90deg, #000 0px, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 7px, #fff 7px, #fff 9px)" }}></div>
                          <span style={{ fontSize: "0.6rem", color: "#0f172a", fontFamily: "monospace", fontWeight: 900, marginTop: 2 }}>*{currentStudent?.studentId || "STU-1001-2026"}*</span>
                        </div>
                        
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.2)", border: "1px solid #ffffff" }}>
                          <Award size={20} />
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ════════════ BACK SIDE CARD MOCKUP ════════════ */}
                {(cardSide === "back" || cardSide === "both") && (
                  <div style={{ position: "relative", paddingTop: "50px" }}>
                    
                    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 60, height: 45, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 20 }}>
                      <div style={{ width: 22, height: 35, background: selectedTheme.headerBg, borderRadius: "4px 4px 0 0", boxShadow: "0 3px 6px rgba(0,0,0,0.35)" }}></div>
                      <div style={{ width: 36, height: 18, background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #64748b 100%)", borderRadius: 4, border: "1px solid #475569" }}></div>
                    </div>

                    <div 
                      style={{ 
                        width: "340px", 
                        minHeight: "510px",
                        background: "#ffffff", 
                        border: `2px solid ${selectedTheme.cardBorder}`, 
                        borderRadius: "20px", 
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(37, 99, 235, 0.12)",
                        color: "#0f172a",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        overflow: "hidden",
                        padding: "1.25rem"
                      }}
                    >
                      <div style={{ width: "calc(100% + 2.5rem)", marginLeft: "-1.25rem", height: 42, background: "#1e293b", marginBottom: "1rem", display: "flex", alignItems: "center", padding: "0 1.25rem" }}>
                        <div style={{ width: "100%", height: 16, background: "repeating-linear-gradient(90deg, #334155 0px, #334155 10px, #1e293b 10px, #1e293b 20px)" }}></div>
                      </div>

                      <div style={{ fontSize: "0.75rem", marginBottom: "1rem" }}>
                        <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: selectedTheme.accent, margin: "0 0 0.4rem 0" }}>INSTITUTION TERMS &amp; ADDRESS</h4>
                        <div style={{ color: "#475569", lineHeight: 1.45, fontSize: "0.72rem" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", marginBottom: 4 }}>
                            <MapPin size={14} style={{ color: selectedTheme.accent, flexShrink: 0, marginTop: 2 }} />
                            <span>{liveAddress}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: 3 }}>
                            <Phone size={13} style={{ color: selectedTheme.accent }} /> Admin Helpline: +91 (011) 2803-9900
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            <Mail size={13} style={{ color: selectedTheme.accent }} /> info@dpsdwarka.edu.in &bull; www.dpsdwarka.edu.in
                          </div>
                        </div>
                      </div>

                      <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: "0.68rem", color: "#475569", marginBottom: "1rem", lineHeight: 1.4 }}>
                        <strong style={{ color: "#dc2626", display: "block", marginBottom: 2 }}>IN CASE OF EMERGENCY / LOSS:</strong>
                        If found, please return immediately to Delhi Public School administration office or call helpline. Card remains property of DPS.
                      </div>

                      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "0.75rem", borderTop: "1px solid #e2e8f0" }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ padding: 4, background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 6, display: "inline-block" }}>
                            <QrCode size={40} style={{ color: "#0f172a" }} />
                          </div>
                          <div style={{ fontSize: "0.58rem", color: "#64748b", fontWeight: 700, marginTop: 2 }}>SCAN TO VERIFY</div>
                        </div>

                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontFamily: "cursive", fontSize: "1.1rem", fontWeight: 700, color: "#1e3a8a", fontStyle: "italic", marginBottom: 2 }}>
                            R. K. Sharma
                          </div>
                          <div style={{ fontSize: "0.62rem", color: "#0f172a", fontWeight: 800, borderTop: "1px dashed #94a3b8", paddingTop: 2 }}>
                            ISSUING AUTHORITY / PRINCIPAL
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>

        {/* RIGHT SIDE PANEL: LIVE CARD PREVIEW (Visible during Tab 1 & Tab 2 & Tab 3) */}
        {activeTab !== "id" && (
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", position: "sticky", top: "1.5rem", height: "fit-content" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--primary)", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <Sparkles size={14} /> LIVE ID CARD PREVIEW
              </span>
              <span className="badge badge-success" style={{ fontSize: "0.65rem" }}>Real-time Sync</span>
            </div>

            {/* MINI LIVE ID CARD CONTAINER */}
            <div 
              style={{ 
                width: "100%", 
                background: "#ffffff", 
                border: `2px solid ${selectedTheme.cardBorder}`, 
                borderRadius: "16px", 
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                color: "#0f172a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "hidden"
              }}
            >
              {/* School Header */}
              <div style={{ width: "100%", background: selectedTheme.headerBg, padding: "0.8rem 0.75rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "#ffffff", letterSpacing: "0.5px" }}>
                  DELHI PUBLIC SCHOOL
                </div>
                <div style={{ fontSize: "0.58rem", color: "#f1f5f9", fontWeight: 700 }}>
                  CBSE AFFILIATED &bull; 2026&ndash;2027
                </div>
              </div>

              {/* Live Photo Image */}
              <div style={{ marginTop: "-16px", marginBottom: "0.5rem" }}>
                <img 
                  src={livePhotoUrl} 
                  alt={liveStudentName}
                  style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover", border: "3px solid #ffffff", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }} 
                />
              </div>

              {/* Live Student Details */}
              <div style={{ textAlign: "center", padding: "0 0.75rem", marginBottom: "0.6rem" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>
                  {liveStudentName}
                </h4>
                <div style={{ fontSize: "0.72rem", color: "#2563eb", fontWeight: 800, marginTop: 2 }}>
                  {liveClassInfo}
                </div>
              </div>

              {/* Data Table */}
              <div style={{ width: "calc(100% - 1.5rem)", background: "#f8fafc", padding: "0.55rem", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.68rem", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ color: "#64748b" }}>Blood Group:</span>
                  <strong style={{ color: "#dc2626" }}>{liveBloodGroup}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ color: "#64748b" }}>Admission:</span>
                  <strong style={{ fontFamily: "monospace", color: "#0f172a" }}>{currentStudent?.studentId || "STU-1001-2026"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#64748b" }}>Parent:</span>
                  <strong style={{ color: "#0f172a" }}>{liveFatherName}</strong>
                </div>
              </div>
            </div>

            <button onClick={() => setActiveTab("id")} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.55rem", fontSize: "0.8rem", gap: "0.4rem" }}>
              View Full Size Lanyard Card <ArrowRight size={14} />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
