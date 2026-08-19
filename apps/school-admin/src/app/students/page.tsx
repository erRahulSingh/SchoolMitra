"use client";

import React, { useState } from "react";
import {
  GraduationCap, Search, Filter, UserPlus, X, Phone,
  Bus, CheckCircle2, FileText, AlertCircle, Eye, Edit3,
  Trash2, ShieldCheck, Mail, MapPin, Award, Upload, User,
  Calendar, CheckCircle, CreditCard, ChevronRight, Building2,
  CheckSquare, ShieldAlert, BookOpen, AlertOctagon, Send, FileSpreadsheet, Lock, Users, Printer, RefreshCw, BarChart2, Shield, QrCode, Settings
} from "lucide-react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSection, setSelectedSection] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [activeStudentTab, setActiveStudentTab] = useState("directory");
  const [dossierTab, setDossierTab] = useState("overview");
  const [selectedStudentDossier, setSelectedStudentDossier] = useState(null);

  const [addStep, setAddStep] = useState(1);
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "10",
    section: "A",
    rollNo: "",
    admissionNo: "",
    parentName: "",
    motherName: "",
    phone: "",
    email: "",
    address: "",
    prevSchool: "",
    prevMarks: "",
    feeStatus: "Paid",
    busAllocated: true,
    busRoute: "Route 1 - Dwarka Sector 12 Express",
    birthCert: false,
    aadhaarCert: false,
    tcCert: false
  });

  const [selectedStudentIds, setSelectedStudentIds] = useState({});

  const [documentApprovals, setDocumentApprovals] = useState({
    "STU-1001": { "Aadhaar Card": "Verified", "Birth Certificate": "Verified", "Transfer Certificate": "Pending", "Medical Certificate": "Verified" },
    "STU-1002": { "Aadhaar Card": "Verified", "Birth Certificate": "Verified", "Transfer Certificate": "Verified", "Medical Certificate": "Pending" },
    "STU-1003": { "Aadhaar Card": "Pending", "Birth Certificate": "Pending", "Transfer Certificate": "Pending", "Medical Certificate": "Pending" }
  });

  const [promoteSourceClass, setPromoteSourceClass] = useState("10");
  const [promoteTargetClass, setPromoteTargetClass] = useState("11");
  const [promoteAcademicYear, setPromoteAcademicYear] = useState("2026-2027");
  const [advSearchType, setAdvSearchType] = useState("name");
  const [advSearchQuery, setAdvSearchQuery] = useState("");
  const [rollNoFormat, setRollNoFormat] = useState("[YEAR]-[CLASS]-[ROLL]");
  const [admissionNoPattern, setAdmissionNoPattern] = useState("SM-2026-XXXX");
  const [idCardTheme, setIdCardTheme] = useState("classic-blue");
  const [mandateAadhaar, setMandateAadhaar] = useState(true);
  const [mandateBirth, setMandateBirth] = useState(true);

  // Student Document Vault State
  const [studentDocs, setStudentDocs] = useState([]);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [editingDocId, setEditingDocId] = useState(null);
  const [docForm, setDocForm] = useState({
    title: "",
    category: "Aadhaar / ID",
    fileUrl: "",
    notes: ""
  });

  const fetchStudentDocs = async (studentId: any) => {
    if (!studentId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/v1/documents/students/${studentId}`);
      const json = await res.json();
      if (json.success) {
        setStudentDocs(json.documents);
      }
    } catch (e) {
      console.error("Student docs fetch error:", e);
    }
  };

  React.useEffect(() => {
    if (selectedStudentDossier && dossierTab === "documents") {
      fetchStudentDocs(selectedStudentDossier.id);
    }
  }, [selectedStudentDossier, dossierTab]);

  React.useEffect(() => {
    var fetchStudents = function() {
      fetch("http://localhost:5000/api/v1/students")
        .then(function(res) { return res.json(); })
        .then(function(json) {
          if (json.success && (json.students || json.data)) {
            var list = Array.isArray(json.students) ? json.students : (Array.isArray(json.data) ? json.data : []);
            var mapped = list.map(function(s: any) {
              return {
                id: s.id || s._id || ("STU-" + Math.floor(1000 + Math.random() * 9000)),
                admissionNo: s.admissionNo || "ADM-2026-101",
                rollNo: s.rollNo || "10-A-01",
                name: s.name,
                class: s.class || "10",
                section: s.section || "A",
                parentName: s.parentName || "Parent",
                phone: s.phone || "+91 98765 43210",
                email: s.email || "parent@gmail.com",
                attendance: s.attendance || "96%",
                feeStatus: s.feeStatus || "Paid",
                status: s.status || "Active",
                avatar: s.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
              };
            });
            setStudents(mapped);
            if (mapped.length > 0) {
              setSelectedStudentDossier(mapped[0]);
            }
          } else {
            setStudents([]);
          }
        })
        .catch(function() {
          setStudents([]);
        });
    };
    fetchStudents();
  }, []);

  const [studentPerformance, setStudentPerformance] = useState<any>(null);
  const [loadingPerformance, setLoadingPerformance] = useState(false);

  React.useEffect(function() {
    if (selectedStudentDossier?.id) {
      setLoadingPerformance(true);
      fetch("http://localhost:5000/api/v1/admin/students/" + selectedStudentDossier.id + "/performance")
        .then(function(res) { return res.json(); })
        .then(function(json) {
          if (json.success && json.data) {
            setStudentPerformance(json.data);
          } else {
            setStudentPerformance(null);
          }
          setLoadingPerformance(false);
        })
        .catch(function() {
          setStudentPerformance(null);
          setLoadingPerformance(false);
        });
    }
  }, [selectedStudentDossier, dossierTab]);

  var filteredStudents = students.filter(function(s) {
    var matchesSearch = (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
                        (s.rollNo || "").toLowerCase().includes(search.toLowerCase()) ||
                        (s.id || "").toLowerCase().includes(search.toLowerCase());
    var matchesClass = selectedClass === "All" || s.class === selectedClass;
    var matchesSec = selectedSection === "All" || s.section === selectedSection;
    var matchesStatus = selectedStatus === "All" || (selectedStatus === "Paid" && s.feeStatus === "Paid") || (selectedStatus === "Pending" && s.feeStatus === "Pending");
    return matchesSearch && matchesClass && matchesSec && matchesStatus;
  });

  var toggleSelectStudent = function(id: any) {
    setSelectedStudentIds(function(prev: any) { return Object.assign({}, prev, { [id]: !prev[id] }); });
  };

  var toggleSelectAll = function() {
    var allFilteredIds = filteredStudents.map(function(s: any) { return s.id; });
    var someUnchecked = allFilteredIds.some(function(id: any) { return !selectedStudentIds[id]; });
    var updated = Object.assign({}, selectedStudentIds);
    allFilteredIds.forEach(function(id: any) { updated[id] = someUnchecked; });
    setSelectedStudentIds(updated);
  };

  var handleDocStatusChange = function(studentId: any, docName: any, status: any) {
    setDocumentApprovals(function(prev) {
      var updated = Object.assign({}, prev);
      updated[studentId] = Object.assign({}, (prev[studentId] || {}), { [docName]: status });
      return updated;
    });
  };

  var handleAddStudentSubmit = function(e) {
    e.preventDefault();
    if (!newStudent.name || !newStudent.parentName) {
      alert("Please complete the required details!");
      return;
    }
    var created = {
      id: "STU-" + (1000 + students.length + 1),
      rollNo: newStudent.rollNo || (newStudent.class + "-" + newStudent.section + "-" + String(students.length + 1).padStart(2, '0')),
      name: newStudent.name,
      class: newStudent.class,
      section: newStudent.section,
      parentName: newStudent.parentName,
      phone: newStudent.phone || "+91 98111 22334",
      attendance: "98.2%",
      feeStatus: newStudent.feeStatus,
      busAllocated: newStudent.busAllocated,
      busRoute: newStudent.busAllocated ? newStudent.busRoute : undefined,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    };
    setStudents([created].concat(students));
    setDocumentApprovals(function(prev) {
      var updated = Object.assign({}, prev);
      updated[created.id] = {
        "Aadhaar Card": newStudent.aadhaarCert ? "Verified" : "Pending",
        "Birth Certificate": newStudent.birthCert ? "Verified" : "Pending",
        "Transfer Certificate": newStudent.tcCert ? "Verified" : "Pending",
        "Medical Certificate": "Pending"
      };
      return updated;
    });
    setSelectedStudentDossier(created);
    setActiveStudentTab("profile");
    setAddStep(1);
    setNewStudent({
      name: "", class: "10", section: "A", rollNo: "", admissionNo: "",
      parentName: "", motherName: "", phone: "", email: "", address: "",
      prevSchool: "", prevMarks: "", feeStatus: "Paid", busAllocated: true,
      busRoute: "Route 1 - Dwarka Sector 12 Express",
      birthCert: false, aadhaarCert: false, tcCert: false
    });
    alert("New Student successfully enrolled and activated on SchoolMitra ERP!");
  };

  var handleDeleteStudent = function(id) {
    if (confirm("Are you sure you want to remove this student record from the ERP?")) {
      setStudents(students.filter(function(s) { return s.id !== id; }));
    }
  };

  var handleParentAlert = function(parentName, phone) {
    alert("Emergency broadcast SMS successfully dispatched to " + parentName + " (" + phone + ")!");
  };

  var handleBulkPromote = function() {
    var selectedIds = Object.keys(selectedStudentIds).filter(function(id) { return selectedStudentIds[id]; });
    if (selectedIds.length === 0) { alert("No students selected for promotion!"); return; }
    setStudents(function(prev) {
      return prev.map(function(s) {
        if (selectedStudentIds[s.id]) {
          var num = parseInt(s.class);
          return Object.assign({}, s, { class: isNaN(num) ? s.class : String(num + 1) });
        }
        return s;
      });
    });
    alert("Successfully promoted " + selectedIds.length + " students to the next class!");
    setSelectedStudentIds({});
  };

  var handleBulkSMS = function() {
    var selectedIds = Object.keys(selectedStudentIds).filter(function(id) { return selectedStudentIds[id]; });
    if (selectedIds.length === 0) { alert("No students selected!"); return; }
    alert("Successfully dispatched bulk notification SMS to " + selectedIds.length + " parents!");
    setSelectedStudentIds({});
  };

  var handlePromoteAllClass = function() {
    setStudents(function(prev) {
      return prev.map(function(s) {
        return s.class === promoteSourceClass ? Object.assign({}, s, { class: promoteTargetClass }) : s;
      });
    });
    alert("Class promotion run successful!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Student Management Console <GraduationCap size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Enterprise Student Information System (SIS) supporting admissions, stepped-onboarding, 360 dossiers, compliance vaults, bulk operations.
          </p>
        </div>

        <button
          onClick={function() { setActiveStudentTab("add"); }}
          className="btn btn-primary"
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <UserPlus size={18} />
          <span>New Admission Onboarding</span>
        </button>
      </div>

      {/* TAB SWITCHER */}
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
          { id: "directory", label: "Student Directory", icon: GraduationCap },
          { id: "add", label: "Stepped Admission Form", icon: UserPlus },
          { id: "profile", label: "360 Profile Dossier", icon: Eye },
          { id: "promotion", label: "Student Promotion Tool", icon: RefreshCw },
          { id: "transfer", label: "TC & Archive Center", icon: AlertOctagon },
          { id: "id_card", label: "Student ID Card Generator", icon: Printer },
          { id: "import_export", label: "Bulk Import & Export", icon: FileSpreadsheet },
          { id: "adv_search", label: "Advanced RFID/SIS Search", icon: Search },
          { id: "settings", label: "SIS Setup Settings", icon: Settings }
        ].map(function(tab) {
          var Icon = tab.icon;
          var isActive = activeStudentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={function() { setActiveStudentTab(tab.id); }}
              className={"btn " + (isActive ? "btn-primary" : "btn-secondary")}
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

      {/* SCREEN 11: STUDENT DIRECTORY */}
      {activeStudentTab === "directory" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Advanced Filters */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", flex: 1, maxWidth: 800 }}>
              <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  value={search}
                  onChange={function(e) { setSearch(e.target.value); }}
                  placeholder="Search by student name, roll number, STU-ID..."
                  style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <select value={selectedClass} onChange={function(e) { setSelectedClass(e.target.value); }} style={{ padding: "0.65rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", cursor: "pointer", outline: "none" }}>
                  <option value="All" style={{ background: "#0b0f19" }}>All Classes</option>
                  {["12", "11", "10", "9", "8", "7"].map(function(c) { return <option key={c} value={c} style={{ background: "#0b0f19" }}>Class {c}</option>; })}
                </select>
                <select value={selectedSection} onChange={function(e) { setSelectedSection(e.target.value); }} style={{ padding: "0.65rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", cursor: "pointer", outline: "none" }}>
                  <option value="All" style={{ background: "#0b0f19" }}>All Sections</option>
                  {["A", "B", "C", "D"].map(function(s) { return <option key={s} value={s} style={{ background: "#0b0f19" }}>Section {s}</option>; })}
                </select>
                <select value={selectedStatus} onChange={function(e) { setSelectedStatus(e.target.value); }} style={{ padding: "0.65rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", cursor: "pointer", outline: "none" }}>
                  <option value="All" style={{ background: "#0b0f19" }}>All Fee Statuses</option>
                  <option value="Paid" style={{ background: "#0b0f19" }}>Paid Only</option>
                  <option value="Pending" style={{ background: "#0b0f19" }}>Pending Only</option>
                </select>
              </div>
            </div>
            <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Showing <strong>{filteredStudents.length}</strong> Enrolled Students
            </span>
          </div>

          {/* Bulk Actions Console */}
          {Object.values(selectedStudentIds).some(Boolean) && (
            <div className="glass-card" style={{ padding: "0.95rem 1.25rem", background: "rgba(99,102,241,0.08)", border: "1px solid var(--primary-glow)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.825rem", color: "var(--primary)", fontWeight: 700 }}>
                {Object.values(selectedStudentIds).filter(Boolean).length} Students Selected for Bulk Processing
              </span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={handleBulkPromote} className="btn btn-secondary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem", gap: "0.4rem" }}>
                  <RefreshCw size={14} /> Promote Selection
                </button>
                <button onClick={handleBulkSMS} className="btn btn-secondary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem", gap: "0.4rem" }}>
                  <Send size={14} /> SMS Mapped Parents
                </button>
                <button onClick={function() { alert("Spooling selected student ID cards to local printer..."); }} className="btn btn-primary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem", gap: "0.4rem" }}>
                  <Printer size={14} /> Spool ID Cards
                </button>
              </div>
            </div>
          )}

          {/* Directory Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Enrolled Student Registry</h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={function() { alert("Exporting student list to Excel..."); }} className="btn btn-secondary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}>Export Excel</button>
                <button onClick={function() { alert("Exporting student list to CSV..."); }} className="btn btn-secondary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}>Export CSV</button>
              </div>
            </div>

            <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>
                    <input type="checkbox" checked={filteredStudents.length > 0 && filteredStudents.every(function(s) { return selectedStudentIds[s.id]; })} onChange={toggleSelectAll} />
                  </th>
                  <th>Student Name</th>
                  <th>Roll No &amp; STU ID</th>
                  <th>Class &amp; Sec</th>
                  <th>Parent Info</th>
                  <th>Attendance</th>
                  <th>Fee Status</th>
                  <th>Bus Mapped</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(function(s) {
                  return (
                    <tr key={s.id}>
                      <td><input type="checkbox" checked={!!selectedStudentIds[s.id]} onChange={function() { toggleSelectStudent(s.id); }} /></td>
                      <td style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <img src={s.avatar} alt={s.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
                        <div>
                          <div style={{ fontWeight: 700, color: "#fff" }}>{s.name}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 650 }}>{s.id}</div>
                        </div>
                      </td>
                      <td><div style={{ fontWeight: 600 }}>{s.rollNo}</div></td>
                      <td><span className="badge badge-info" style={{ color: "#38bdf8" }}>Class {s.class}-{s.section}</span></td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{s.parentName}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.phone}</div>
                      </td>
                      <td style={{ fontWeight: 700, color: "var(--success)" }}>{s.attendance}</td>
                      <td>
                        <span className={"badge " + (s.feeStatus === "Paid" ? "badge-success" : s.feeStatus === "Pending" ? "badge-warning" : "badge-danger")}>
                          {s.feeStatus}
                        </span>
                      </td>
                      <td>
                        {s.busAllocated ? (
                          <span className="badge badge-success" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.7rem" }}>
                            <Bus size={12} /> {s.busRoute ? s.busRoute.split(" - ")[0] : "Bus"}
                          </span>
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Self</span>
                        )}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", gap: "0.45rem", justifyContent: "flex-end" }}>
                          <button type="button" onClick={function() { setSelectedStudentDossier(s); setActiveStudentTab("profile"); }} className="btn btn-secondary" style={{ padding: "0.38rem 0.6rem", fontSize: "0.72rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <Eye size={13} /> Profile
                          </button>
                          <button type="button" onClick={function() { handleDeleteStudent(s.id); }} style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "0.35rem 0.5rem", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCREEN 12: ADD STUDENT (5-STEP ONBOARDING WIZARD) */}
      {activeStudentTab === "add" && (
        <div className="glass-card" style={{ padding: "1.75rem", maxWidth: 640, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>Stepped Student Onboarding Wizard</h3>
            <span style={{ fontSize: "0.75rem", background: "var(--primary-glow)", color: "var(--primary)", padding: "0.25rem 0.65rem", borderRadius: 6, fontWeight: 700 }}>
              Step {addStep} of 5
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {[1, 2, 3, 4, 5].map(function(step) { return <div key={step} style={{ flex: 1, height: 4, background: step <= addStep ? "var(--primary)" : "rgba(255,255,255,0.06)", borderRadius: 99, transition: "all 0.25s ease" }} />; })}
          </div>
          <form onSubmit={handleAddStudentSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {addStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>STUDENT FULL NAME</label>
                  <input type="text" value={newStudent.name} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { name: e.target.value })); }} placeholder="e.g. Rahul Sharma" required style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CLASS / GRADE</label>
                    <select value={newStudent.class} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { class: e.target.value })); }} style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}>
                      {["12", "11", "10", "9", "8", "7"].map(function(c) { return <option key={c} value={c} style={{ background: "#0b0f19" }}>Class {c}</option>; })}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SECTION</label>
                    <select value={newStudent.section} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { section: e.target.value })); }} style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}>
                      {["A", "B", "C", "D"].map(function(s) { return <option key={s} value={s} style={{ background: "#0b0f19" }}>Section {s}</option>; })}
                    </select>
                  </div>
                </div>
                <button type="button" onClick={function() { setAddStep(2); }} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "1rem" }}>Continue to Parent Details <ChevronRight size={16} /></button>
              </div>
            )}
            {addStep === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>FATHER NAME</label>
                  <input type="text" value={newStudent.parentName} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { parentName: e.target.value })); }} placeholder="e.g. Vikram Sharma" required style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>MOTHER NAME</label>
                  <input type="text" value={newStudent.motherName} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { motherName: e.target.value })); }} placeholder="e.g. Priya Sharma" style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>PARENT MOBILE (+91)</label>
                    <input type="text" value={newStudent.phone} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { phone: e.target.value })); }} placeholder="e.g. +91 98111 22334" required style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>PARENT EMAIL</label>
                    <input type="email" value={newStudent.email} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { email: e.target.value })); }} placeholder="e.g. parent@email.com" style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                  <button type="button" onClick={function() { setAddStep(1); }} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Back</button>
                  <button type="button" onClick={function() { setAddStep(3); }} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Next</button>
                </div>
              </div>
            )}
            {addStep === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>RESIDENTIAL ADDRESS</label>
                  <textarea rows={2} value={newStudent.address} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { address: e.target.value })); }} placeholder="Residential address details" style={{ width: "100%", padding: "0.6rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>PREVIOUS SCHOOL OFFICIAL NAME</label>
                  <input type="text" value={newStudent.prevSchool} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { prevSchool: e.target.value })); }} placeholder="Previous school name" style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>PREVIOUS GRADE / REPORT CARD MARKS (%)</label>
                  <input type="text" value={newStudent.prevMarks} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { prevMarks: e.target.value })); }} placeholder="e.g. 88.5%" style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                </div>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                  <button type="button" onClick={function() { setAddStep(2); }} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Back</button>
                  <button type="button" onClick={function() { setAddStep(4); }} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Next</button>
                </div>
              </div>
            )}
            {addStep === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.85rem", cursor: "pointer", color: "#fff", fontWeight: 700 }}>
                    <input type="checkbox" checked={newStudent.busAllocated} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { busAllocated: e.target.checked })); }} />
                    Map School Bus Route
                  </label>
                  {newStudent.busAllocated && (
                    <div style={{ marginTop: "0.75rem" }}>
                      <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BUS ROUTE &amp; STOP</label>
                      <select value={newStudent.busRoute} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { busRoute: e.target.value })); }} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.825rem", outline: "none" }}>
                        <option value="Route 1 - Dwarka Sector 12 Express" style={{ background: "#0b0f19" }}>Route 1 - Dwarka Sector 12</option>
                        <option value="Route 2 - Vasant Kunj & Fortis Belt" style={{ background: "#0b0f19" }}>Route 2 - Vasant Kunj</option>
                      </select>
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>FEE BILLING FREQUENCY PLAN</label>
                  <select value={newStudent.feeStatus} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { feeStatus: e.target.value })); }} style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}>
                    <option value="Paid" style={{ background: "#0b0f19" }}>Quarterly Paid (Standard)</option>
                    <option value="Pending" style={{ background: "#0b0f19" }}>Pending First Term Collections</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                  <button type="button" onClick={function() { setAddStep(3); }} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Back</button>
                  <button type="button" onClick={function() { setAddStep(5); }} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Next</button>
                </div>
              </div>
            )}
            {addStep === 5 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block" }}>COMPLIANCE DOCUMENT CHECKLIST</label>
                {[
                  { id: "aadhaarCert", name: "Aadhaar Card Copy" },
                  { id: "birthCert", name: "Official Birth Certificate" },
                  { id: "tcCert", name: "Transfer Certificate (TC)" }
                ].map(function(doc) {
                  return (
                    <label key={doc.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", cursor: "pointer", color: "var(--text-main)", padding: "0.45rem 0.75rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", borderRadius: 6 }}>
                      <input type="checkbox" checked={!!newStudent[doc.id]} onChange={function(e) { setNewStudent(Object.assign({}, newStudent, { [doc.id]: e.target.checked })); }} />
                      <span>{doc.name} Received &amp; Uploaded</span>
                    </label>
                  );
                })}
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                  <button type="button" onClick={function() { setAddStep(4); }} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Back</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Complete Enrolment</button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}

      {/* SCREEN 13: STUDENT PROFILE 360 DOSSIER CONSOLE */}
      {activeStudentTab === "profile" && (
        !selectedStudentDossier ? (
          <div className="glass-card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
            <GraduationCap size={40} style={{ opacity: 0.3, marginBottom: "0.75rem" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)" }}>No Student Selected</h3>
            <p style={{ fontSize: "0.85rem", marginTop: 4 }}>Select a student from the Student Directory tab to view their 360 dossier console.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="glass-card" style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <img src={selectedStudentDossier.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"} alt={selectedStudentDossier.name || "Student"} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary)" }} />
                <div>
                  <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff" }}>{selectedStudentDossier.name}</h2>
                  <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 700, marginTop: 2, display: "flex", gap: "0.75rem" }}>
                    <span>STU ID: <strong>{selectedStudentDossier.id}</strong></span>
                    <span>Class {selectedStudentDossier.class}-{selectedStudentDossier.section}</span>
                    <span>Roll No: <strong>{selectedStudentDossier.rollNo}</strong></span>
                  </div>
                </div>
              </div>
              <span className="badge badge-success" style={{ padding: "0.4rem 0.8rem", fontSize: "0.78rem" }}>STATUS: ENROLLED &amp; ACTIVE</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "1.5rem", alignItems: "flex-start" }}>
              <div className="glass-card" style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {[
                  { id: "overview", label: "Overview Info" },
                  { id: "academic", label: "Academic GPAs" },
                  { id: "attendance", label: "Attendance Logs" },
                  { id: "fees", label: "Fee Ledgers" },
                  { id: "transport", label: "Transport Details" },
                  { id: "documents", label: "Documents Vault" },
                  { id: "timeline", label: "SIS Log Timeline" }
                ].map(function(tab) {
                  return (
                    <button key={tab.id} type="button" onClick={function() { setDossierTab(tab.id); }} className={"btn " + (dossierTab === tab.id ? "btn-primary" : "btn-secondary")} style={{ padding: "0.65rem 0.85rem", justifyContent: "flex-start", fontSize: "0.78rem", fontWeight: 700 }}>
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="glass-card" style={{ padding: "1.5rem", minHeight: 300 }}>
                {dossierTab === "overview" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Student Overview &amp; Demographics</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      {[
                        { label: "BLOOD GROUP", value: "O+ Positive" },
                        { label: "HOUSE SYSTEM", value: "Emerald House" },
                        { label: "ADMISSION DATE", value: "15 April 2024" },
                        { label: "RFID ACCREDITATION", value: "RFID-TAG-882410" },
                        { label: "HEALTH ALERTS", value: "Mild Asthma (Inhaler with parent/school)" },
                        { label: "PARENT RELATIONSHIP", value: "Father: " + (selectedStudentDossier.parentName || "Parent") }
                      ].map(function(item, idx) {
                        return (
                          <div key={idx} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{item.label}</div>
                            <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{item.value}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {dossierTab === "academic" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                      Academic Performance Dossier — {selectedStudentDossier?.name || "Student"}
                    </h4>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      {/* Attendance indicator */}
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Attendance Rate</span>
                          <strong style={{ fontSize: "0.85rem", color: "#10b981" }}>{studentPerformance?.attendance || "94%"}</strong>
                        </div>
                        <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ width: studentPerformance?.attendance || "94%", height: "100%", background: "#10b981", borderRadius: 99 }} />
                        </div>
                      </div>

                      {/* Homework Rate */}
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Homework Completion</span>
                          <strong style={{ fontSize: "0.85rem", color: "#8b5cf6" }}>{studentPerformance?.homework || "87%"}</strong>
                        </div>
                        <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ width: studentPerformance?.homework || "87%", height: "100%", background: "#8b5cf6", borderRadius: 99 }} />
                        </div>
                      </div>

                      {/* Weekly Tests */}
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Weekly Tests Avg</span>
                          <strong style={{ fontSize: "0.85rem", color: "#f59e0b" }}>{studentPerformance?.weeklyTests || "82%"}</strong>
                        </div>
                        <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ width: studentPerformance?.weeklyTests || "82%", height: "100%", background: "#f59e0b", borderRadius: 99 }} />
                        </div>
                      </div>

                      {/* Half Yearly */}
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Half Yearly Evaluation</span>
                          <strong style={{ fontSize: "0.85rem", color: "var(--primary)" }}>{studentPerformance?.halfYearly || "78%"}</strong>
                        </div>
                        <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ width: studentPerformance?.halfYearly || "78%", height: "100%", background: "var(--primary)", borderRadius: 99 }} />
                        </div>
                      </div>

                      {/* Annual */}
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Annual Exam (Est)</span>
                          <strong style={{ fontSize: "0.85rem", color: "#f43f5e" }}>{studentPerformance?.annual || "85%"}</strong>
                        </div>
                        <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ width: studentPerformance?.annual || "85%", height: "100%", background: "#f43f5e", borderRadius: 99 }} />
                        </div>
                      </div>

                      {/* Overall */}
                      <div style={{ background: "rgba(67, 56, 202, 0.08)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(99, 102, 241, 0.3)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#fff" }}>Overall Performance Index</span>
                          <strong style={{ fontSize: "0.9rem", color: "#fff" }}>{studentPerformance?.overall || "82%"}</strong>
                        </div>
                        <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ width: studentPerformance?.overall || "82%", height: "100%", background: "#fff", borderRadius: 99 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {dossierTab === "attendance" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Attendance Analytics</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>TOTAL COMPLIANCE RATE</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 850, color: "var(--success)", marginTop: 4 }}>{selectedStudentDossier.attendance || "96%"}</div>
                      </div>
                      <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>WORKING DAYS LOG</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 850, color: "var(--primary)", marginTop: 4 }}>172 Days</div>
                      </div>
                    </div>
                  </div>
                )}
                {dossierTab === "fees" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Fee Ledger &amp; Payments</h4>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Total Fee: Rs 52,000 | Paid: Rs 52,000 | Balance: Rs 0</div>
                  </div>
                )}
                {dossierTab === "transport" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Transport Allocation</h4>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-main)" }}>{selectedStudentDossier.busAllocated ? ("Bus Route: " + (selectedStudentDossier.busRoute || "Default Route")) : "Self Transport. No school bus mapped."}</div>
                  </div>
                )}
                {dossierTab === "documents" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                      <div>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff" }}>Student Documents &amp; Certificates Vault</h4>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                          Manage Aadhaar, Birth Certificate, TC, Marksheets &amp; ID Proofs for <strong>{selectedStudentDossier?.name}</strong>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          setEditingDocId(null);
                          setDocForm({ title: "", category: "Aadhaar / ID", fileUrl: "", notes: "" });
                          setIsDocModalOpen(true);
                        }} 
                        className="btn btn-primary" 
                        style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
                      >
                        <Upload size={14} /> Upload Document
                      </button>
                    </div>

                    {/* Document Categories Checklist */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      {[
                        "Aadhaar / ID",
                        "Birth Certificate",
                        "Transfer Certificate",
                        "Previous Marksheet",
                        "Address Proof",
                        "Passport Photo",
                        "Other"
                      ].map((catName) => {
                        const existingDocs = studentDocs.filter(d => d.category === catName);
                        const hasDoc = existingDocs.length > 0;
                        return (
                          <div 
                            key={catName} 
                            style={{ 
                              padding: "1rem", 
                              background: hasDoc ? "rgba(16, 185, 129, 0.04)" : "rgba(255,255,255,0.02)", 
                              borderRadius: "12px", 
                              border: hasDoc ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid var(--border-color)",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.6rem"
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <FileText size={16} color={hasDoc ? "#10b981" : "#64748b"} />
                                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{catName}</span>
                              </div>
                              <span className={`badge ${hasDoc ? "badge-success" : "badge-warning"}`} style={{ fontSize: "0.65rem" }}>
                                {hasDoc ? "UPLOADED & VERIFIED" : "NOT SUBMITTED"}
                              </span>
                            </div>

                            {hasDoc ? (
                              existingDocs.map((docItem) => (
                                <div key={docItem._id || docItem.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.2)", padding: "0.5rem 0.75rem", borderRadius: "8px", marginTop: 4 }}>
                                  <div>
                                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#e2e8f0" }}>{docItem.title}</div>
                                    <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{docItem.fileSize || "1.2 MB"} • {docItem.documentType || "PDF"}</div>
                                  </div>
                                  <div style={{ display: "flex", gap: "0.4rem" }}>
                                    <a 
                                      href={docItem.fileUrl} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="btn btn-secondary" 
                                      style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem", display: "inline-flex", alignItems: "center", gap: "0.2rem" }}
                                    >
                                      <Eye size={12} /> View
                                    </a>
                                    <button 
                                      type="button" 
                                      onClick={() => {
                                        setEditingDocId(docItem._id || docItem.id);
                                        setDocForm({ title: docItem.title, category: docItem.category, fileUrl: docItem.fileUrl, notes: docItem.notes || "" });
                                        setIsDocModalOpen(true);
                                      }}
                                      style={{ background: "rgba(56, 189, 248, 0.15)", border: "1px solid rgba(56, 189, 248, 0.3)", color: "#38bdf8", padding: "0.25rem 0.5rem", borderRadius: 4, cursor: "pointer", fontSize: "0.7rem", display: "inline-flex", alignItems: "center", gap: "0.2rem" }}
                                    >
                                      <Edit3 size={12} /> Replace
                                    </button>
                                    <button 
                                      type="button" 
                                      onClick={async () => {
                                        if (confirm("Are you sure you want to delete this document?")) {
                                          try {
                                            await fetch(`http://localhost:5000/api/v1/documents/students/doc/${docItem._id || docItem.id}`, { method: "DELETE" });
                                            fetchStudentDocs(selectedStudentDossier.id);
                                          } catch (e) {}
                                        }
                                      }} 
                                      style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "0.25rem 0.5rem", borderRadius: 4, cursor: "pointer", fontSize: "0.7rem" }}
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic", marginTop: 2 }}>
                                No document uploaded for this category yet.
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Upload / Replace Document Modal */}
                    {isDocModalOpen && (
                      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: "1rem" }}>
                        <div className="glass-card" style={{ padding: "1.5rem", width: "100%", maxWidth: 480, background: "#0f172a", border: "1px solid #334155", borderRadius: 16 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>
                              {editingDocId ? "Replace Student Document" : "Upload Student Document"}
                            </h3>
                            <button type="button" onClick={() => setIsDocModalOpen(false)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                              <X size={20} />
                            </button>
                          </div>

                          <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (!docForm.title || !docForm.fileUrl) return alert("Title and File URL are required!");
                            try {
                              if (editingDocId) {
                                await fetch(`http://localhost:5000/api/v1/documents/students/doc/${editingDocId}`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify(docForm)
                                });
                              } else {
                                await fetch(`http://localhost:5000/api/v1/documents/students/${selectedStudentDossier.id}`, {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify(docForm)
                                });
                              }
                              setIsDocModalOpen(false);
                              fetchStudentDocs(selectedStudentDossier.id);
                            } catch (err) {
                              alert("Failed to save document.");
                            }
                          }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>
                              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: 4 }}>DOCUMENT TITLE</label>
                              <input 
                                type="text" 
                                value={docForm.title} 
                                onChange={(e) => setDocForm({ ...docForm, title: e.target.value })} 
                                placeholder="e.g. Student Aadhaar Card Scan" 
                                required 
                                style={{ width: "100%", padding: "0.65rem", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: "0.85rem" }} 
                              />
                            </div>

                            <div>
                              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: 4 }}>CATEGORY</label>
                              <select 
                                value={docForm.category} 
                                onChange={(e) => setDocForm({ ...docForm, category: e.target.value })} 
                                style={{ width: "100%", padding: "0.65rem", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: "0.85rem" }}
                              >
                                {[
                                  "Aadhaar / ID",
                                  "Birth Certificate",
                                  "Transfer Certificate",
                                  "Previous Marksheet",
                                  "Address Proof",
                                  "Passport Photo",
                                  "Other"
                                ].map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>

                            <div>
                              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: 4 }}>FILE URL / LINK</label>
                              <input 
                                type="text" 
                                value={docForm.fileUrl} 
                                onChange={(e) => setDocForm({ ...docForm, fileUrl: e.target.value })} 
                                placeholder="https://example.com/docs/aadhaar.pdf" 
                                required 
                                style={{ width: "100%", padding: "0.65rem", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: "0.85rem" }} 
                              />
                            </div>

                            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                              <button type="button" onClick={() => setIsDocModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                              <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                                {editingDocId ? "Update Document" : "Save Document"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {dossierTab === "timeline" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>SIS Activity Timeline</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {[
                        { text: "Boarded school Bus #01 at stop Sector 12 Gate", time: "Today, 07:35 AM", user: "Driver App Broadcast" },
                        { text: "Fee receipt REC-99401 generated", time: "Yesterday, 04:15 PM", user: "Finance Officer" },
                        { text: "Enrolled and mapped roll code", time: "18 June 2026", user: "Admissions Registrar" }
                      ].map(function(item, idx) {
                        return (
                          <div key={idx} style={{ paddingLeft: "0.75rem", borderLeft: "2.5px solid var(--primary)", display: "flex", flexDirection: "column", gap: "2px" }}>
                            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)" }}>{item.text}</div>
                            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{item.time} - {item.user}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      )}

      {/* SCREEN 19: STUDENT PROMOTION TOOL */}
      {activeStudentTab === "promotion" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <RefreshCw size={18} color="var(--primary)" /> Run Bulk Class Promotion
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SOURCE GRADE</label>
                <select value={promoteSourceClass} onChange={function(e) { setPromoteSourceClass(e.target.value); }} style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}>
                  {["11", "10", "9", "8", "7"].map(function(c) { return <option key={c} value={c} style={{ background: "#0b0f19" }}>Class {c}</option>; })}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>TARGET GRADE (PROMOTED TO)</label>
                <select value={promoteTargetClass} onChange={function(e) { setPromoteTargetClass(e.target.value); }} style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}>
                  {["12", "11", "10", "9", "8"].map(function(c) { return <option key={c} value={c} style={{ background: "#0b0f19" }}>Class {c}</option>; })}
                </select>
              </div>
              <div style={{ padding: "0.85rem", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.25)", borderRadius: 8, fontSize: "0.75rem", color: "var(--warning)" }}>
                <strong>WARNING:</strong> Run promotion operations ONLY at the end of the academic term.
              </div>
              <button onClick={handlePromoteAllClass} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center" }}>Run Academic Year Rollover</button>
            </div>
          </div>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>Class {promoteSourceClass} Students Pending Rollover</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {students.filter(function(s) { return s.class === promoteSourceClass; }).map(function(s) {
                return (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                      <img src={s.avatar} alt="" style={{ width: 28, height: 28, borderRadius: "50%" }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{s.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Roll No: {s.rollNo}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 700 }}>Promoting to Class {promoteTargetClass}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 20: TC & ARCHIVE CENTER */}
      {activeStudentTab === "transfer" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Student Clearance &amp; TC Dispatch Panel</h3>
          <table className="custom-table">
            <thead><tr><th>Student</th><th>Fee Clearance</th><th>Library</th><th>Generate TC</th></tr></thead>
            <tbody>
              {students.map(function(s) {
                return (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 700 }}>{s.name} ({s.id})</td>
                    <td><span className={"badge " + (s.feeStatus === "Paid" ? "badge-success" : "badge-danger")}>{s.feeStatus === "Paid" ? "CLEARED" : "DUE"}</span></td>
                    <td><span className="badge badge-success">RETURNED</span></td>
                    <td><button onClick={function() { alert("TC generated for " + s.name); }} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem" }}>Issue TC</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* SCREEN 21: STUDENT ID CARD GENERATOR */}
      {activeStudentTab === "id_card" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>School Identity Card Generator</h3>
          {selectedStudentDossier ? (
            <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SELECT TEMPLATE</label>
                  <select value={idCardTheme} onChange={function(e) { setIdCardTheme(e.target.value); }} style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}>
                    <option value="classic-blue" style={{ background: "#0b0f19" }}>Classic Deep Blue</option>
                    <option value="emerald-green" style={{ background: "#0b0f19" }}>Emerald Green</option>
                    <option value="royal-purple" style={{ background: "#0b0f19" }}>Royal Purple</option>
                  </select>
                </div>
                <button onClick={function() { window.print(); }} className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", gap: "0.45rem", marginTop: "1rem" }}>
                  <Printer size={16} /> Print ID Card
                </button>
              </div>
              <div style={{ width: 320, padding: "1.5rem", background: "var(--bg-card)", border: "2.5px solid var(--primary)", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>DELHI PUBLIC SCHOOL</div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 2 }}>CBSE Affiliated Main Campus</div>
                <img src={selectedStudentDossier.avatar} alt="" style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "3.5px solid var(--primary)", marginTop: "1rem" }} />
                <div style={{ fontSize: "1.2rem", fontWeight: 850, color: "#fff", marginTop: "0.75rem" }}>{selectedStudentDossier.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 700, marginTop: 4 }}>ID: {selectedStudentDossier.id}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-main)", marginTop: 2 }}>Class {selectedStudentDossier.class}-{selectedStudentDossier.section} | Roll: {selectedStudentDossier.rollNo}</div>
              </div>
            </div>
          ) : (
            <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Select a student first from the directory.</div>
          )}
        </div>
      )}

      {/* SCREEN 22: BULK IMPORT & EXPORT */}
      {activeStudentTab === "import_export" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Bulk Admission Excel/CSV Import</h3>
          <div style={{ border: "2px dashed var(--border-color)", borderRadius: "var(--radius-lg)", padding: "3rem 1.5rem", textAlign: "center", cursor: "pointer", background: "rgba(255,255,255,0.01)" }} onClick={function() { alert("Select student admission spreadsheet..."); }}>
            <Upload size={32} color="var(--primary)" style={{ marginBottom: "0.75rem" }} />
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>Drop Admission Spreadsheet Here</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>Supports .xlsx, .xls, .csv files only (Max 15MB)</div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
            <button onClick={function() { alert("Downloading template..."); }} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem" }}>Download Template (.xlsx)</button>
            <button onClick={function() { alert("Running validations..."); }} className="btn btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem" }}>Validate &amp; Process</button>
          </div>
        </div>
      )}

      {/* SCREEN 24: ADVANCED SEARCH */}
      {activeStudentTab === "adv_search" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Advanced Index Search</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 150px", gap: "1rem", alignItems: "flex-end" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SEARCH KEY</label>
                <select value={advSearchType} onChange={function(e) { setAdvSearchType(e.target.value); }} style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}>
                  <option value="name">Student Name</option>
                  <option value="admission">Admission Code</option>
                  <option value="rfid">RFID Tag Serial</option>
                  <option value="bus">School Bus Stop</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>ENTER VALUE</label>
                <input type="text" value={advSearchQuery} onChange={function(e) { setAdvSearchQuery(e.target.value); }} placeholder="Type query..." style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
              </div>
              <button onClick={function() { alert("Running search for: " + advSearchQuery); }} className="btn btn-primary" style={{ height: "38px", justifyContent: "center" }}>Run Search</button>
            </div>
          </div>
          {advSearchQuery && (
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Results for: &quot;{advSearchQuery}&quot;</h4>
              <table className="custom-table">
                <thead><tr><th>Student</th><th>ID</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {students.filter(function(st) {
                    if (advSearchType === "name") return (st.name || "").toLowerCase().includes(advSearchQuery.toLowerCase());
                    return (st.id || "").includes(advSearchQuery) || (st.rollNo || "").includes(advSearchQuery);
                  }).map(function(st) {
                    return (
                      <tr key={st.id}>
                        <td style={{ fontWeight: 700 }}>{st.name}</td>
                        <td style={{ fontWeight: 700, color: "var(--primary)" }}>{st.id}</td>
                        <td><span className="badge badge-success">ACTIVE</span></td>
                        <td><button onClick={function() { setSelectedStudentDossier(st); setActiveStudentTab("profile"); }} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem" }}>Dossier</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SCREEN 25: STUDENT SETTINGS */}
      {activeStudentTab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Roll &amp; Admission Auto-generators</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>ROLL NUMBER FORMAT</label>
                <input type="text" value={rollNoFormat} onChange={function(e) { setRollNoFormat(e.target.value); }} style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>ADMISSION NUMBER PATTERN</label>
                <input type="text" value={admissionNoPattern} onChange={function(e) { setAdmissionNoPattern(e.target.value); }} style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
              </div>
              <button onClick={function() { alert("Generator formats updated!"); }} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center" }}>Update Formats</button>
            </div>
          </div>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>SIS Admission Compliance Checklist</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { state: mandateAadhaar, set: setMandateAadhaar, label: "Mandate Aadhaar Card Copy for onboarding" },
                { state: mandateBirth, set: setMandateBirth, label: "Mandate Birth Certificate Copy for validation" }
              ].map(function(opt, idx) {
                return (
                  <label key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", cursor: "pointer", color: "var(--text-main)" }}>
                    <input type="checkbox" checked={opt.state} onChange={function(e) { opt.set(e.target.checked); }} />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
              <button onClick={function() { alert("SIS admissions compliance policy saved."); }} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "1rem" }}>Save Compliance Checklist</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
