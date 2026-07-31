"use client";

import React, { useState } from "react";
import { 
  UserCheck, BookOpen, DollarSign, CalendarCheck, Search, 
  Plus, X, Award, CheckCircle2, Clock, ShieldCheck, Mail, 
  Phone, Eye, Briefcase, ChevronRight, FileText, Check, AlertCircle,
  Users, UserPlus, Send, RefreshCw, BarChart2, Star, Calendar, Settings, Lock, Shield, Printer
} from "lucide-react";

export default function TeachersPage() {
  // Navigation tabs for 12 Teacher & Staff modules
  const [activeTeacherTab, setActiveTeacherTab] = useState<"directory" | "add" | "profile" | "assignments" | "attendance" | "leaves" | "payroll" | "timetable" | "performance" | "settings">("directory");

  // Dossier sub-tabs
  const [dossierTab, setDossierTab] = useState<"overview" | "classes" | "attendance" | "leaves" | "salary" | "documents" | "activity">("overview");

  // Database State with Live DB Wiring
  const [teachers, setTeachers] = useState<any[]>([]);

  React.useEffect(() => {
    // Fetch live teacher list from backend API
    const fetchTeachers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/teachers");
        const json = await res.json();
        if (json.success && (json.teachers || json.data)) {
          const list = Array.isArray(json.teachers) ? json.teachers : (Array.isArray(json.data) ? json.data : []);
          const mapped = list.map((t: any) => ({
            id: t.id || t._id || `EMP-TCH-${Math.floor(100 + Math.random() * 900)}`,
            name: t.name,
            department: t.subject || "Academics",
            subject: t.subject || "General",
            classTeacher: (t.assignedClasses && t.assignedClasses[0]) || "Class 10-A",
            phone: t.phone || "+91 98111 22334",
            email: t.email,
            qualification: "M.Sc., B.Ed. (10 Yrs Exp)",
            salary: t.salary || "₹65,000 / month",
            baseSalary: 60000,
            allowance: 5000,
            attendance: "98.5%",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
            status: t.status || "Active",
            rating: 4.8,
            homeworkRate: "95%"
          }));
          setTeachers(mapped);
        } else {
          setTeachers([]);
        }
      } catch (e) {
        setTeachers([]);
      }
    };
    fetchTeachers();
  }, []);

  const [selectedTeacherDossier, setSelectedTeacherDossier] = useState<any>(teachers[0]);

  // Stepped Registration Wizard Form State (Module 2)
  const [addStep, setAddStep] = useState(1);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    department: "Mathematics",
    subject: "",
    classTeacher: "Class 10-A",
    phone: "",
    email: "",
    qualification: "",
    experience: "",
    joiningDate: "",
    salary: "60000",
    allowance: "5000",
    aadhaarCert: false,
    degreeCert: false,
    joiningLetter: false
  });

  // Leaves database state (Module 7)
  const [leaves, setLeaves] = useState([
    { id: "l1", teacherName: "Sunita Rao", type: "Casual Leave", dates: "02 Aug - 03 Aug (2 Days)", reason: "Family Function", status: "PENDING", comment: "" },
    { id: "l2", teacherName: "Ananya Deshmukh", type: "Medical Leave", dates: "25 July (1 Day)", reason: "Doctor Appointment", status: "APPROVED", comment: "Approved against medical certificates" }
  ]);

  const [leaveComments, setLeaveComments] = useState<Record<string, string>>({});

  // Subject and Class Teacher Mappings state (Modules 4 & 5)
  const [mappings, setMappings] = useState([
    { id: "m1", teacherName: "Sunita Rao", class: "10", section: "A", subject: "Mathematics" },
    { id: "m2", teacherName: "Vikram Malhotra", class: "9", section: "B", subject: "Physics" }
  ]);

  const [newMapping, setNewMapping] = useState({
    teacherName: "Sunita Rao",
    class: "10",
    section: "A",
    subject: "Mathematics"
  });

  const [classTeachers, setClassTeachers] = useState<Record<string, string>>({
    "10-A": "Sunita Rao",
    "9-B": "Vikram Malhotra",
    "8-C": "Ananya Deshmukh"
  });

  const [newClassTeacher, setNewClassTeacher] = useState({
    class: "10",
    section: "B",
    teacherName: "Ananya Deshmukh"
  });

  // Daily attendance register state (Module 6)
  const [attendanceLogs, setAttendanceLogs] = useState<Record<string, 'Present' | 'Absent' | 'Late Entry' | 'Half Day'>>({
    "EMP-TCH-101": "Present",
    "EMP-TCH-102": "Present",
    "EMP-TCH-103": "Late Entry"
  });

  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === "All" || t.department === selectedDept;
    const matchesStatus = selectedStatus === "All" || t.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleAddTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.subject) {
      alert("Please fill in Teacher Name and Subject!");
      return;
    }

    const created = {
      id: `EMP-TCH-${100 + teachers.length + 1}`,
      name: newTeacher.name,
      department: newTeacher.department,
      subject: newTeacher.subject,
      classTeacher: newTeacher.classTeacher || "None Assigned",
      phone: newTeacher.phone || "+91 98111 00000",
      email: newTeacher.email || "teacher@dps.edu.in",
      qualification: newTeacher.qualification || "M.A. / M.Sc., B.Ed.",
      salary: `₹${Number(newTeacher.salary).toLocaleString("en-IN")} / month`,
      baseSalary: Number(newTeacher.salary),
      allowance: Number(newTeacher.allowance),
      attendance: "100%",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      status: "Active",
      rating: 4.5,
      homeworkRate: "90%"
    };

    setTeachers([created, ...teachers]);
    setSelectedTeacherDossier(created);
    setActiveTeacherTab("profile");
    setAddStep(1);

    // Reset Form
    setNewTeacher({
      name: "",
      department: "Mathematics",
      subject: "",
      classTeacher: "Class 10-A",
      phone: "",
      email: "",
      qualification: "",
      experience: "",
      joiningDate: "",
      salary: "60000",
      allowance: "5000",
      aadhaarCert: false,
      degreeCert: false,
      joiningLetter: false
    });
    alert("New Teacher Profile onboarded successfully!");
  };

  const handleLeaveAction = (id: string, action: "APPROVED" | "REJECTED") => {
    const comment = leaveComments[id] || "";
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: action, comment } : l));
    alert(`Leave request has been ${action.toLowerCase()}!`);
  };

  const handleAddMapping = (e: React.FormEvent) => {
    e.preventDefault();
    setMappings([
      ...mappings,
      {
        id: `m-${Date.now()}`,
        teacherName: newMapping.teacherName,
        class: newMapping.class,
        section: newMapping.section,
        subject: newMapping.subject
      }
    ]);
    alert("Subject Assignment successfully registered!");
  };

  const handleAssignClassTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const key = `${newClassTeacher.class}-${newClassTeacher.section}`;
    if (classTeachers[key]) {
      const confirmOverride = confirm(`Warning: Class ${key} is already assigned to ${classTeachers[key]}. Do you want to override and assign it to ${newClassTeacher.teacherName}?`);
      if (!confirmOverride) return;
    }
    setClassTeachers(prev => ({
      ...prev,
      [key]: newClassTeacher.teacherName
    }));
    alert(`Class Teacher mapped successfully!`);
  };

  const toggleTeacherStatus = (id: string) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" } : t));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Teacher &amp; Staff Console <UserCheck size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Core administrative panel to manage faculty registers, academic assignments, leaves, class allocations, and performance trends.
          </p>
        </div>

        <button 
          onClick={() => setActiveTeacherTab("add")}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <UserPlus size={18} />
          <span>Onboard New Teacher</span>
        </button>
      </div>

      {/* ════════════ 12 MODULES TAB SWITCHER CONSOLE ════════════ */}
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
          { id: "directory", label: "Faculty Directory", icon: Users },
          { id: "add", label: "Add Faculty", icon: UserPlus },
          { id: "profile", label: "360° Profile Dossier", icon: Eye },
          { id: "assignments", label: "Academic Assignments", icon: RefreshCw },
          { id: "attendance", label: "Daily Attendance", icon: CalendarCheck },
          { id: "leaves", label: "Leave Approvals", icon: AlertCircle },
          { id: "payroll", label: "Salary & Payroll", icon: DollarSign },
          { id: "timetable", label: "Weekly Timetables", icon: Calendar },
          { id: "performance", label: "Performance Metrics", icon: BarChart2 },
          { id: "settings", label: "Access & Settings", icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTeacherTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTeacherTab(tab.id as any)}
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

      {/* MODULE 1: TEACHER DIRECTORY */}
      {activeTeacherTab === "directory" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Filters */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "1rem", flex: 1, maxWidth: 650 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by faculty name or EMP-ID..."
                  style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  style={{ padding: "0.65rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", cursor: "pointer", outline: "none" }}
                >
                  <option value="All" style={{ background: "#0b0f19" }}>All Departments</option>
                  <option value="Mathematics" style={{ background: "#0b0f19" }}>Mathematics</option>
                  <option value="Science" style={{ background: "#0b0f19" }}>Science</option>
                  <option value="Humanities & English" style={{ background: "#0b0f19" }}>Humanities</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{ padding: "0.65rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", cursor: "pointer", outline: "none" }}
                >
                  <option value="All" style={{ background: "#0b0f19" }}>All Statuses</option>
                  <option value="Active" style={{ background: "#0b0f19" }}>Active</option>
                  <option value="Inactive" style={{ background: "#0b0f19" }}>Inactive</option>
                </select>
              </div>
            </div>
            
            <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Faculty Members: <strong>{filteredTeachers.length}</strong> Active
            </span>
          </div>

          {/* Directory Table */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <table className="custom-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Department</th>
                  <th>Primary Subjects</th>
                  <th>Contact Info</th>
                  <th>Class Teacher</th>
                  <th>Daily Presence</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((t) => (
                  <tr key={t.id}>
                    <td style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} 
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: "#fff" }}>{t.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 650 }}>{t.id}</div>
                      </div>
                    </td>
                    <td><span className="badge badge-info" style={{ color: "#38bdf8" }}>{t.department}</span></td>
                    <td><div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{t.subject}</div></td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{t.phone}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{t.email}</div>
                    </td>
                    <td style={{ fontWeight: 700, color: "var(--secondary)" }}>{t.classTeacher}</td>
                    <td style={{ fontWeight: 700, color: "var(--success)" }}>{t.attendance}</td>
                    <td>
                      <button 
                        onClick={() => toggleTeacherStatus(t.id)}
                        className={`badge ${t.status === "Active" ? "badge-success" : "badge-danger"}`}
                        style={{ border: "none", cursor: "pointer", fontSize: "0.68rem" }}
                      >
                        {t.status === "Active" ? "ACTIVE ✅" : "INACTIVE ❌"}
                      </button>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.45rem", justifyContent: "flex-end" }}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTeacherDossier(t);
                            setActiveTeacherTab("profile");
                          }}
                          className="btn btn-secondary"
                          style={{ padding: "0.38rem 0.6rem", fontSize: "0.72rem", display: "flex", alignItems: "center", gap: "0.3rem" }}
                        >
                          <Eye size={13} /> Profile
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* MODULE 2: ADD TEACHER (STEPPED ONBOARDING) */}
      {activeTeacherTab === "add" && (
        <div className="glass-card" style={{ padding: "1.75rem", maxWidth: 640, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>Stepped Faculty Onboarding Wizard</h3>
            <span style={{ fontSize: "0.75rem", background: "var(--primary-glow)", color: "var(--primary)", padding: "0.25rem 0.65rem", borderRadius: 6, fontWeight: 700 }}>
              Step {addStep} of 3
            </span>
          </div>

          {/* Progress Indicators */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {[1, 2, 3].map(step => (
              <div 
                key={step} 
                style={{ 
                  flex: 1, 
                  height: 4, 
                  background: step <= addStep ? "var(--primary)" : "rgba(255,255,255,0.06)", 
                  borderRadius: 99,
                  transition: "all 0.25s ease" 
                }} 
              />
            ))}
          </div>

          <form onSubmit={handleAddTeacherSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Step 1: Personal & Contact */}
            {addStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>FULL TEACHER NAME</label>
                  <input 
                    type="text" 
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    placeholder="e.g. Sunita Rao"
                    required
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>DEPARTMENT</label>
                    <select 
                      value={newTeacher.department}
                      onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                    >
                      <option value="Mathematics" style={{ background: "#0b0f19" }}>Mathematics</option>
                      <option value="Science" style={{ background: "#0b0f19" }}>Science</option>
                      <option value="Humanities & English" style={{ background: "#0b0f19" }}>Humanities</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>PRIMARY SUBJECT STREAM</label>
                    <input 
                      type="text" 
                      value={newTeacher.subject}
                      onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                      placeholder="e.g. Physics & Chemistry"
                      required
                      style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>MOBILE NUMBER</label>
                    <input 
                      type="text" 
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                      placeholder="e.g. +91 98111 55667"
                      style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                      placeholder="e.g. teacher@dps.edu.in"
                      style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                    />
                  </div>
                </div>

                <button type="button" onClick={() => setAddStep(2)} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "1rem" }}>
                  Continue to Qualifications &amp; Onboarding <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2: Qualification & Experience */}
            {addStep === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>ACADEMIC QUALIFICATIONS</label>
                  <input 
                    type="text" 
                    value={newTeacher.qualification}
                    onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                    placeholder="e.g. M.Sc. Physics, Ph.D."
                    style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>YEARS OF EXPERIENCE</label>
                    <input 
                      type="text" 
                      value={newTeacher.experience}
                      onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                      placeholder="e.g. 10 Years"
                      style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>DATE OF JOINING</label>
                    <input 
                      type="date" 
                      value={newTeacher.joiningDate}
                      onChange={(e) => setNewTeacher({ ...newTeacher, joiningDate: e.target.value })}
                      style={{ width: "100%", padding: "0.65rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                  <button type="button" onClick={() => setAddStep(1)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Back</button>
                  <button type="button" onClick={() => setAddStep(3)} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Next</button>
                </div>
              </div>
            )}

            {/* Step 3: Salary & Compliance Checklists */}
            {addStep === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>BASE MONTHLY SALARY (INR)</label>
                    <input 
                      type="number" 
                      value={newTeacher.salary}
                      onChange={(e) => setNewTeacher({ ...newTeacher, salary: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>MONTHLY TRANSPORT ALLOWANCE</label>
                    <input 
                      type="number" 
                      value={newTeacher.allowance}
                      onChange={(e) => setNewTeacher({ ...newTeacher, allowance: e.target.value })}
                      style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block" }}>COMPLIANCE DOCUMENT CHECKLIST</label>
                  {[
                    { id: "aadhaarCert", name: "Aadhaar Card Copy" },
                    { id: "degreeCert", name: "Degree / Qualification Cert" },
                    { id: "joiningLetter", name: "Joining Letter signed copy" }
                  ].map(doc => (
                    <label key={doc.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", cursor: "pointer", color: "var(--text-main)", padding: "0.45rem 0.75rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", borderRadius: 6 }}>
                      <input 
                        type="checkbox"
                        checked={(newTeacher as any)[doc.id]}
                        onChange={(e) => setNewTeacher({ ...newTeacher, [doc.id]: e.target.checked })}
                      />
                      <span>Mark <strong>{doc.name}</strong> as Collected &amp; Verified</span>
                    </label>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                  <button type="button" onClick={() => setAddStep(2)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Back</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Complete Onboarding</button>
                </div>
              </div>
            )}

          </form>
        </div>
      )}

      {/* MODULE 3: TEACHER PROFILE (360° VIEW) */}
      {activeTeacherTab === "profile" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Header Card */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <img 
                src={selectedTeacherDossier.avatar} 
                alt={selectedTeacherDossier.name} 
                style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary)" }} 
              />
              <div>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff" }}>{selectedTeacherDossier.name}</h2>
                <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 700, marginTop: 2, display: "flex", gap: "0.75rem" }}>
                  <span>EMP ID: <strong>{selectedTeacherDossier.id}</strong></span>
                  <span>&bull;</span>
                  <span>Dept: <strong>{selectedTeacherDossier.department}</strong></span>
                  <span>&bull;</span>
                  <span>Class Teacher: <strong>{selectedTeacherDossier.classTeacher}</strong></span>
                </div>
              </div>
            </div>

            <span className="badge badge-success" style={{ padding: "0.4rem 0.8rem", fontSize: "0.78rem" }}>
              STATUS: {selectedTeacherDossier.status?.toUpperCase() || "ACTIVE"}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "1.5rem", alignItems: "flex-start" }}>
            
            {/* Dossier Tabs */}
            <div className="glass-card" style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {[
                { id: "overview", label: "Overview Info" },
                { id: "classes", label: "Assigned Classes" },
                { id: "attendance", label: "Presence logs" },
                { id: "leaves", label: "Leave requested" },
                { id: "salary", label: "Salary structure" },
                { id: "documents", label: "Documents Vault" },
                { id: "activity", label: "Activity Timelines" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDossierTab(tab.id as any)}
                  className={`btn ${dossierTab === tab.id ? "btn-primary" : "btn-secondary"}`}
                  style={{
                    padding: "0.65rem 0.85rem",
                    justifyContent: "flex-start",
                    fontSize: "0.78rem",
                    fontWeight: 700
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dossier Content */}
            <div className="glass-card" style={{ padding: "1.5rem", minHeight: 300 }}>
              
              {/* Overview */}
              {dossierTab === "overview" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Faculty Qualifications &amp; Details</h4>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {[
                      { label: "QUALIFICATIONS", value: selectedTeacherDossier.qualification },
                      { label: "PRIMARY STREAM", value: selectedTeacherDossier.subject },
                      { label: "CONTACT PHONE", value: selectedTeacherDossier.phone },
                      { label: "CONTACT EMAIL", value: selectedTeacherDossier.email },
                      { label: "JOINING TENURE", value: "Since 12 July 2021" },
                      { label: "RFID ATTENDANCE BADGE", value: "RFID-EMP-" + selectedTeacherDossier.id.split("-")[2] }
                    ].map((item, idx) => (
                      <div key={idx} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{item.label}</div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assigned Classes */}
              {dossierTab === "classes" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Assigned Classes &amp; Subject Mappings</h4>
                  
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Class &amp; Sec</th>
                        <th>Subject Assigned</th>
                        <th>Lecture Hours / Week</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mappings.filter(m => m.teacherName === selectedTeacherDossier.name).map((m, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>Class {m.class}-{m.section}</td>
                          <td style={{ color: "var(--primary)", fontWeight: 700 }}>{m.subject}</td>
                          <td>6 Hours / Week</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Presence logs */}
              {dossierTab === "attendance" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Faculty Attendance History</h4>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>PRESENCE RATE</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 850, color: "var(--success)", marginTop: 4 }}>{selectedTeacherDossier.attendance}</div>
                    </div>

                    <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>WORKING DAYS LOG</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 850, color: "var(--primary)", marginTop: 4 }}>160 Working Days</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Leaves */}
              {dossierTab === "leaves" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Leave Requests History</h4>
                  
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Leave Type</th>
                        <th>Dates Mapped</th>
                        <th>Reason for Absence</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaves.filter(l => l.teacherName === selectedTeacherDossier.name).map((l, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>{l.type}</td>
                          <td>{l.dates}</td>
                          <td>{l.reason}</td>
                          <td>
                            <span className={`badge ${l.status === "APPROVED" ? "badge-success" : l.status === "PENDING" ? "badge-warning" : "badge-danger"}`}>
                              {l.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Salary */}
              {dossierTab === "salary" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Salary Structure Ledger</h4>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                    <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>BASE SCALE</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginTop: 4 }}>₹ {selectedTeacherDossier.baseSalary?.toLocaleString("en-IN")}</div>
                    </div>
                    <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ALLOWANCES MAPPED</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)", marginTop: 4 }}>₹ {selectedTeacherDossier.allowance?.toLocaleString("en-IN")}</div>
                    </div>
                    <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>GROSS SALARY PACKAGE</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--success)", marginTop: 4 }}>₹ {(selectedTeacherDossier.baseSalary + selectedTeacherDossier.allowance)?.toLocaleString("en-IN")}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Documents */}
              {dossierTab === "documents" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Documents Compliance Status</h4>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                    {["Aadhaar Card Copy", "PAN Card Copy", "Post-Graduation Degree Certificate", "Previous Experience Letter"].map((docName, idx) => (
                      <div key={idx} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "#fff" }}>{docName}</div>
                          <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>Compliance Verified</div>
                        </div>
                        <span className="badge badge-success">VERIFIED ✅</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity Logs */}
              {dossierTab === "activity" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Faculty Activity Logs</h4>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {[
                      { text: "Marked attendance via RFID portal", time: "Today, 08:15 AM" },
                      { text: "Uploaded Class 10 Homework Assignment", time: "Yesterday, 02:30 PM" },
                      { text: "Submitted Casual Leave Request", time: "2 days ago" }
                    ].map((log, idx) => (
                      <div key={idx} style={{ paddingLeft: "0.75rem", borderLeft: "2.5px solid var(--primary)", display: "flex", flexDirection: "column", gap: "2px" }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{log.text}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{log.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* MODULES 4 & 5: ACADEMIC ASSIGNMENTS */}
      {activeTeacherTab === "assignments" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "1.5rem" }}>
          
          {/* Subject assignment */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BookOpen size={18} color="var(--primary)" /> Assign Class Subject Teacher
            </h3>

            <form onSubmit={handleAddMapping} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SELECT FACULTY</label>
                <select 
                  value={newMapping.teacherName}
                  onChange={(e) => setNewMapping({ ...newMapping, teacherName: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                >
                  {teachers.map(t => <option key={t.id} value={t.name} style={{ background: "#0b0f19" }}>{t.name}</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CLASS</label>
                  <select 
                    value={newMapping.class}
                    onChange={(e) => setNewMapping({ ...newMapping, class: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                  >
                    {["12", "11", "10", "9", "8"].map(c => <option key={c} value={c} style={{ background: "#0b0f19" }}>Class {c}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SECTION</label>
                  <select 
                    value={newMapping.section}
                    onChange={(e) => setNewMapping({ ...newMapping, section: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                  >
                    {["A", "B", "C", "D"].map(s => <option key={s} value={s} style={{ background: "#0b0f19" }}>Section {s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SUBJECT</label>
                <input 
                  type="text" 
                  value={newMapping.subject}
                  onChange={(e) => setNewMapping({ ...newMapping, subject: e.target.value })}
                  placeholder="e.g. Mathematics"
                  required
                  style={{ width: "100%", padding: "0.7rem 0.85rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center" }}>
                Add Subject Mapping
              </button>
            </form>
          </div>

          {/* Class Teacher Mappings */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <UserCheck size={18} color="var(--secondary)" /> Class Teacher Allocations
            </h3>

            <form onSubmit={handleAssignClassTeacher} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CLASS</label>
                  <select 
                    value={newClassTeacher.class}
                    onChange={(e) => setNewClassTeacher({ ...newClassTeacher, class: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                  >
                    {["12", "11", "10", "9", "8"].map(c => <option key={c} value={c} style={{ background: "#0b0f19" }}>Class {c}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SECTION</label>
                  <select 
                    value={newClassTeacher.section}
                    onChange={(e) => setNewClassTeacher({ ...newClassTeacher, section: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                  >
                    {["A", "B", "C", "D"].map(s => <option key={s} value={s} style={{ background: "#0b0f19" }}>Section {s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SELECT CLASS TEACHER</label>
                <select 
                  value={newClassTeacher.teacherName}
                  onChange={(e) => setNewClassTeacher({ ...newClassTeacher, teacherName: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                >
                  {teachers.map(t => <option key={t.id} value={t.name} style={{ background: "#0b0f19" }}>{t.name}</option>)}
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center" }}>
                Establish Class Teacher Link
              </button>
            </form>

            {/* Mapped view */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>ACTIVE CLASS TEACHERS MATRIX</div>
              {Object.entries(classTeachers).map(([cls, name]) => (
                <div key={cls} style={{ display: "flex", justify: "space-between", padding: "0.55rem 0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 6, fontSize: "0.825rem" }}>
                  <span style={{ fontWeight: 700 }}>Class {cls}</span>
                  <span style={{ color: "var(--primary)", fontWeight: 750 }}>{name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODULE 6: DAILY ATTENDANCE MONITOR */}
      {activeTeacherTab === "attendance" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Daily Faculty Attendance Roster</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Mark present, late entry, half day, or sick leave records for teachers today.</p>
            </div>
            <button onClick={() => alert("Daily presence reports exported.")} className="btn btn-secondary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}>Export Daily Roster</button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>RFID Status</th>
                <th>Mark Presence</th>
                <th style={{ textAlign: "right" }}>Logs</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => {
                const currentStatus = attendanceLogs[t.id] || "Present";
                return (
                  <tr key={t.id}>
                    <td style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img src={t.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%" }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>{t.name}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{t.id}</div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-success">RFID ACTIVE ✅</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.35rem" }}>
                        {['Present', 'Absent', 'Late Entry', 'Half Day'].map(status => (
                          <button
                            key={status}
                            onClick={() => setAttendanceLogs(prev => ({ ...prev, [t.id]: status as any }))}
                            className={`btn ${currentStatus === status ? "btn-primary" : "btn-secondary"}`}
                            style={{ 
                              padding: "0.3rem 0.6rem", 
                              fontSize: "0.7rem",
                              borderRadius: "var(--radius-sm)"
                            }}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td style={{ textAlign: "right", fontSize: "0.75rem", color: "var(--text-dim)" }}>
                      Updated at 08:30 AM
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 7: LEAVE MANAGEMENT */}
      {activeTeacherTab === "leaves" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Faculty Leave Management &amp; Approvals</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Leave Type</th>
                <th>Requested Dates</th>
                <th>Reason for Absence</th>
                <th>Action Comments</th>
                <th style={{ textAlign: "right" }}>Process Request</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{l.teacherName}</td>
                  <td><span className="badge badge-info">{l.type}</span></td>
                  <td style={{ fontWeight: 600 }}>{l.dates}</td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-main)" }}>{l.reason}</td>
                  <td>
                    {l.status === "PENDING" ? (
                      <input 
                        type="text" 
                        placeholder="Add review comment..."
                        value={leaveComments[l.id] || ""}
                        onChange={(e) => setLeaveComments({ ...leaveComments, [l.id]: e.target.value })}
                        style={{ padding: "0.4rem 0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 4, color: "#fff", fontSize: "0.78rem" }}
                      />
                    ) : (
                      <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{l.comment || "No comments"}</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {l.status === "PENDING" ? (
                      <div style={{ display: "flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                        <button 
                          onClick={() => handleLeaveAction(l.id, "APPROVED")}
                          className="btn btn-primary" 
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem" }}
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleLeaveAction(l.id, "REJECTED")}
                          style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.25)", color: "#ef4444", padding: "0.35rem 0.65rem", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.72rem" }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className={`badge ${l.status === "APPROVED" ? "badge-success" : "badge-danger"}`} style={{ fontSize: "0.72rem" }}>
                        {l.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 8: SALARY & PAYROLL */}
      {activeTeacherTab === "payroll" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* Payroll structure list */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Monthly Payroll & Payslips</h3>
            
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Gross Salary</th>
                  <th>Deductions (PF/TDS)</th>
                  <th>Net Payable</th>
                  <th style={{ textAlign: "right" }}>Payslip</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t) => {
                  const gross = t.baseSalary + t.allowance;
                  const deductions = Math.floor(gross * 0.10); // 10% PF/Tax mockup
                  const net = gross - deductions;
                  return (
                    <tr key={t.id}>
                      <td style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                        <img src={t.avatar} alt="" style={{ width: 28, height: 28, borderRadius: "50%" }} />
                        <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{t.name}</div>
                      </td>
                      <td style={{ fontWeight: 650 }}>₹ {gross.toLocaleString("en-IN")}</td>
                      <td style={{ color: "#ef4444" }}>- ₹ {deductions.toLocaleString("en-IN")}</td>
                      <td style={{ fontWeight: 700, color: "var(--success)" }}>₹ {net.toLocaleString("en-IN")}</td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          onClick={() => {
                            setSelectedTeacherDossier(t);
                            alert(`Payslip for ${t.name} generated successfully. Ready to download.`);
                          }}
                          className="btn btn-secondary" 
                          style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem", gap: "0.3rem" }}
                        >
                          <Printer size={12} /> View Payslip
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Payslip preview */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justify: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Payslip Preview Ledger</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", justify: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>FACULTY NAME</span>
                  <span style={{ fontWeight: 700, color: "#fff" }}>{selectedTeacherDossier.name}</span>
                </div>
                <div style={{ display: "flex", justify: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>DESIGNATION</span>
                  <span style={{ fontWeight: 700, color: "#fff" }}>{selectedTeacherDossier.department} Teacher</span>
                </div>
                <div style={{ display: "flex", justify: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>SALARY MONTH</span>
                  <span style={{ fontWeight: 700, color: "var(--primary)" }}>July 2026</span>
                </div>
                
                <div style={{ borderTop: "1px solid var(--border-color)", margin: "0.5rem 0" }} />
                
                <div style={{ display: "flex", justify: "space-between" }}>
                  <span>Base Scale Salary</span>
                  <span style={{ fontWeight: 700 }}>₹ {selectedTeacherDossier.baseSalary?.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justify: "space-between" }}>
                  <span>Transport Allowance</span>
                  <span style={{ fontWeight: 700 }}>₹ {selectedTeacherDossier.allowance?.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justify: "space-between", color: "#ef4444" }}>
                  <span>Provident Fund (PF) Deductions</span>
                  <span style={{ fontWeight: 700 }}>- ₹ {(selectedTeacherDossier.baseSalary * 0.08)?.toLocaleString("en-IN")}</span>
                </div>

                <div style={{ borderTop: "1px solid var(--border-color)", margin: "0.5rem 0" }} />

                <div style={{ display: "flex", justify: "space-between", fontSize: "1.05rem", fontWeight: 800 }}>
                  <span style={{ color: "var(--success)" }}>NET PAYABLE OUT</span>
                  <span style={{ color: "var(--success)" }}>₹ {(selectedTeacherDossier.baseSalary + selectedTeacherDossier.allowance - selectedTeacherDossier.baseSalary * 0.08)?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <button onClick={() => alert("Downloading PDF Payslip...")} className="btn btn-primary" style={{ marginTop: "1.5rem", justifyContent: "center", width: "100%" }}>
              Download PDF Invoice
            </button>
          </div>

        </div>
      )}

      {/* MODULE 10: TEACHER TIMETABLE */}
      {activeTeacherTab === "timetable" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Faculty Weekly Timetable Slots</h3>
            <select 
              value={selectedTeacherDossier.id}
              onChange={(e) => {
                const match = teachers.find(t => t.id === e.target.value);
                if (match) setSelectedTeacherDossier(match);
              }}
              style={{ padding: "0.5rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
            >
              {teachers.map(t => <option key={t.id} value={t.id} style={{ background: "#0b0f19" }}>{t.name}</option>)}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, idx) => (
              <div key={idx} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", borderRadius: 10 }}>
                <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "var(--primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.4rem", marginBottom: "0.75rem", textTransform: "uppercase" }}>{day}</div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <div style={{ padding: "0.55rem", background: "rgba(255,255,255,0.03)", borderRadius: 6, fontSize: "0.75rem" }}>
                    <div style={{ fontWeight: 700, color: "#fff" }}>08:30 – 09:15</div>
                    <div style={{ color: "var(--text-muted)" }}>Class 10-A (Math)</div>
                  </div>
                  <div style={{ padding: "0.55rem", background: "rgba(255,255,255,0.03)", borderRadius: 6, fontSize: "0.75rem" }}>
                    <div style={{ fontWeight: 700, color: "#fff" }}>10:00 – 10:45</div>
                    <div style={{ color: "var(--text-muted)" }}>Class 9-B (Physics)</div>
                  </div>
                  <div style={{ padding: "0.55rem", background: "rgba(255,255,255,0.03)", borderRadius: 6, fontSize: "0.75rem" }}>
                    <div style={{ fontWeight: 700, color: "#fff" }}>11:30 – 12:15</div>
                    <div style={{ color: "var(--text-muted)" }}>Class 8-C (Science)</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 11: PERFORMANCE RATINGS */}
      {activeTeacherTab === "performance" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Faculty Annual Performance Ratings</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Annual Attendance</th>
                <th>Homework Completion</th>
                <th>Feedback Rating</th>
                <th>Status Index</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id}>
                  <td style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <img src={t.avatar} alt="" style={{ width: 28, height: 28, borderRadius: "50%" }} />
                    <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{t.name}</div>
                  </td>
                  <td style={{ fontWeight: 700, color: "var(--success)" }}>{t.attendance} Present</td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{t.homeworkRate} Submissions</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Star size={14} color="#f59e0b" fill="#f59e0b" />
                      <span style={{ fontWeight: 800 }}>{t.rating} / 5</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-success">EXCELLENT PERFORMANCE ✅</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 12: TEACHER SETTINGS */}
      {activeTeacherTab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          
          {/* Access Rules */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Faculty ERP Roles &amp; Permissions</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Allow Homework uploads & assignment creation", checked: true },
                { label: "Allow student grade sheet edits & results entry", checked: true },
                { label: "Allow teacher-to-parent direct messaging access", checked: true },
                { label: "Allow payroll/payslip billing overview logs access", checked: false }
              ].map((perm, idx) => (
                <label key={idx} style={{ display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.85rem", cursor: "pointer", color: "var(--text-main)" }}>
                  <input type="checkbox" defaultChecked={perm.checked} />
                  <span>{perm.label}</span>
                </label>
              ))}

              <button onClick={() => alert("ERP Permissions updated.")} className="btn btn-primary" style={{ padding: "0.75rem", justifyContent: "center", marginTop: "1rem" }}>
                Update Permission Matrix
              </button>
            </div>
          </div>

          {/* Login Access / Password Reset */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Faculty Portal Login &amp; Credentials</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SELECT FACULTY MEMBER</label>
                <select 
                  value={selectedTeacherDossier.id}
                  onChange={(e) => {
                    const match = teachers.find(t => t.id === e.target.value);
                    if (match) setSelectedTeacherDossier(match);
                  }}
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                >
                  {teachers.map(t => <option key={t.id} value={t.id} style={{ background: "#0b0f19" }}>{t.name}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => alert(`ERP login access disabled for ${selectedTeacherDossier.name}`)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444" }}>
                  Disable ERP Access
                </button>
                <button onClick={() => alert(`Password reset link sent to ${selectedTeacherDossier.email}`)} className="btn btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem" }}>
                  Send Password Reset
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
