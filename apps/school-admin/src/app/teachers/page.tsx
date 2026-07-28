"use client";

import React, { useState } from "react";
import { 
  UserCheck, BookOpen, DollarSign, CalendarCheck, Search, 
  Plus, X, Award, CheckCircle2, Clock, ShieldCheck, Mail, 
  Phone, Eye, Briefcase, ChevronRight, FileText, Check, AlertCircle 
} from "lucide-react";

export default function TeachersPage() {
  const [activeTab, setActiveTab] = useState<"teachers" | "staff" | "departments" | "leave">("teachers");

  const [teachers, setTeachers] = useState([
    { 
      id: "EMP-TCH-101", 
      name: "Sunita Rao", 
      department: "Mathematics", 
      subject: "Senior Mathematics (Class 9-12)", 
      classTeacher: "Class 10-A", 
      phone: "+91 98111 55667", 
      email: "sunita.rao@dps.edu.in",
      qualification: "M.Sc. Mathematics, B.Ed. (12 Yrs Exp)",
      salary: "₹65,000 / month", 
      attendance: "98.5%",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    { 
      id: "EMP-TCH-102", 
      name: "Vikram Malhotra", 
      department: "Science", 
      subject: "Physics & Chemistry", 
      classTeacher: "Class 9-B", 
      phone: "+91 98222 66778", 
      email: "vikram.malhotra@dps.edu.in",
      qualification: "M.Sc. Physics, Ph.D. (15 Yrs Exp)",
      salary: "₹72,000 / month", 
      attendance: "100%",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
    },
    { 
      id: "EMP-TCH-103", 
      name: "Ananya Deshmukh", 
      department: "Humanities & English", 
      subject: "English Literature & History", 
      classTeacher: "Class 8-C", 
      phone: "+91 98333 77889", 
      email: "ananya.d@dps.edu.in",
      qualification: "M.A. English Literature, B.Ed.",
      salary: "₹58,000 / month", 
      attendance: "96.2%",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    }
  ]);

  const [leaves, setLeaves] = useState([
    { id: "l1", teacherName: "Sunita Rao", type: "Casual Leave", dates: "02 Aug - 03 Aug (2 Days)", reason: "Family Function", status: "PENDING" },
    { id: "l2", teacherName: "Ananya Deshmukh", type: "Medical Leave", dates: "25 July (1 Day)", reason: "Doctor Appointment", status: "APPROVED ✅" }
  ]);

  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacherDossier, setSelectedTeacherDossier] = useState<any>(null);

  // Form State
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    department: "Mathematics",
    subject: "",
    classTeacher: "Class 10-A",
    phone: "",
    email: "",
    salary: "60000"
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.subject) return;

    const created = {
      id: `EMP-TCH-${100 + teachers.length + 1}`,
      name: newTeacher.name,
      department: newTeacher.department,
      subject: newTeacher.subject,
      classTeacher: newTeacher.classTeacher || "Class Teacher",
      phone: newTeacher.phone || "+91 98111 00000",
      email: newTeacher.email || "teacher@dps.edu.in",
      qualification: "M.Sc. / M.A., B.Ed.",
      salary: `₹${Number(newTeacher.salary).toLocaleString("en-IN")} / month`,
      attendance: "100%",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    };

    setTeachers([created, ...teachers]);
    setIsAddModalOpen(false);
    setNewTeacher({ name: "", department: "Mathematics", subject: "", classTeacher: "Class 10-A", phone: "", email: "", salary: "60000" });
  };

  const handleLeaveAction = (id: string, action: "APPROVED ✅" | "REJECTED ❌") => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: action } : l));
  };

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase()) ||
    t.department.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)",
        border: "1px solid var(--border-glow)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem 1.75rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Teachers & Staff Management (Phase 4) <UserCheck size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Faculty profiles, department breakdown, class assignments, salary payroll, and leave management.
          </p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <Plus size={18} />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* 4 SECTION TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setActiveTab("teachers")} className={`btn ${activeTab === 'teachers' ? 'btn-primary' : 'btn-secondary'}`}>
          <UserCheck size={16} /> Teachers Directory ({teachers.length})
        </button>
        <button onClick={() => setActiveTab("staff")} className={`btn ${activeTab === 'staff' ? 'btn-primary' : 'btn-secondary'}`}>
          <Briefcase size={16} /> Non-Teaching Staff (24)
        </button>
        <button onClick={() => setActiveTab("departments")} className={`btn ${activeTab === 'departments' ? 'btn-primary' : 'btn-secondary'}`}>
          <BookOpen size={16} /> Academic Departments (6)
        </button>
        <button onClick={() => setActiveTab("leave")} className={`btn ${activeTab === 'leave' ? 'btn-primary' : 'btn-secondary'}`}>
          <CalendarCheck size={16} /> Leave Ledger & Approvals
        </button>
      </div>

      {/* ════════════ TAB 1: TEACHERS DIRECTORY ════════════ */}
      {activeTab === "teachers" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Search Box */}
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 500 }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Teacher Name, Subject, Department..."
                style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
              />
            </div>

            <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Showing <strong>{filteredTeachers.length}</strong> Faculty Members
            </span>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Teacher & Staff ID</th>
                    <th>Department & Subject</th>
                    <th>Class Teacher</th>
                    <th>Contact Info</th>
                    <th>Attendance</th>
                    <th>Salary Grade</th>
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
                          style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border-color)" }} 
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: "#fff" }}>{t.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600 }}>{t.id}</div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: "#fff" }}>{t.subject}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Dept: {t.department}</div>
                      </td>
                      <td>
                        <span className="badge badge-info">{t.classTeacher}</span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{t.phone}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.email}</div>
                      </td>
                      <td style={{ fontWeight: 700, color: "var(--success)" }}>{t.attendance}</td>
                      <td style={{ fontWeight: 700, color: "#38bdf8" }}>{t.salary}</td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={() => setSelectedTeacherDossier(t)}
                          className="btn btn-secondary"
                          style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem" }}
                        >
                          <Eye size={14} /> Dossier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB 2: NON-TEACHING STAFF ════════════ */}
      {activeTab === "staff" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Non-Teaching & Operational Staff Directory</h3>
          
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Role / Designation</th>
                  <th>Department</th>
                  <th>Contact Number</th>
                  <th>Shift Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Ramesh Sharma", role: "Chief Accountant", dept: "Finance & Accounts", phone: "+91 98111 88990", status: "ON DUTY" },
                  { name: "Suresh Gupta", role: "Senior Transport Supervisor", dept: "Transport & GPS Fleet", phone: "+91 98222 77889", status: "ON DUTY" },
                  { name: "Kavita Verma", role: "Head Librarian", dept: "Library Services", phone: "+91 98333 66778", status: "ON DUTY" },
                  { name: "Mahesh Kumar", role: "Chief Security Officer", dept: "Campus Security", phone: "+91 98444 55667", status: "ON DUTY" }
                ].map((st, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{st.name}</td>
                    <td style={{ fontWeight: 600 }}>{st.role}</td>
                    <td style={{ color: "var(--primary)" }}>{st.dept}</td>
                    <td>{st.phone}</td>
                    <td>
                      <span className="badge badge-success">{st.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: DEPARTMENTS BREAKDOWN ════════════ */}
      {activeTab === "departments" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {[
            { name: "Department of Science", head: "Dr. Vikram Malhotra", teachersCount: 28, subjects: "Physics, Chem, Bio" },
            { name: "Department of Mathematics", head: "Sunita Rao", teachersCount: 24, subjects: "Pure Math, Applied Math" },
            { name: "Department of Humanities", head: "Ananya Deshmukh", teachersCount: 22, subjects: "English, History, Pol Sci" },
            { name: "Department of IT & CS", head: "Rajesh Kumar", teachersCount: 18, subjects: "Python, AI, IP, CS" },
            { name: "Department of Physical Ed", head: "Capt. Ranbir Singh", teachersCount: 12, subjects: "Sports, Yoga, Health" },
            { name: "Department of Fine Arts", head: "Meenakshi Sundaram", teachersCount: 10, subjects: "Music, Visual Art, Dance" }
          ].map((dept, idx) => (
            <div key={idx} className="glass-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{dept.name}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 700 }}>HOD: {dept.head}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Subjects: {dept.subjects}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                <span className="badge badge-info">{dept.teachersCount} Faculty Members</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ TAB 4: LEAVE LEDGER ════════════ */}
      {activeTab === "leave" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>Faculty & Staff Leave Applications Ledger</h3>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Faculty Name</th>
                  <th>Leave Category</th>
                  <th>Requested Dates</th>
                  <th>Reason</th>
                  <th>Current Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((l) => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{l.teacherName}</td>
                    <td>
                      <span className="badge badge-info">{l.type}</span>
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{l.dates}</td>
                    <td style={{ fontSize: "0.85rem" }}>{l.reason}</td>
                    <td>
                      <span className={`badge ${
                        l.status.includes("APPROVED") ? "badge-success" : l.status.includes("REJECTED") ? "badge-danger" : "badge-warning"
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {l.status === "PENDING" ? (
                        <div style={{ display: "flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                          <button
                            onClick={() => handleLeaveAction(l.id, "APPROVED ✅")}
                            className="btn btn-primary"
                            style={{ padding: "0.3rem 0.6rem", fontSize: "0.72rem" }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleLeaveAction(l.id, "REJECTED ❌")}
                            style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "0.3rem 0.6rem", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.72rem", fontWeight: 700 }}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ MODAL: 360° TEACHER PROFILE DOSSIER ════════════ */}
      {selectedTeacherDossier && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 640, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img 
                  src={selectedTeacherDossier.avatar} 
                  alt={selectedTeacherDossier.name} 
                  style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary)" }} 
                />
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>{selectedTeacherDossier.name}</h2>
                  <div style={{ fontSize: "0.825rem", color: "var(--primary)", fontWeight: 700, marginTop: 1 }}>
                    {selectedTeacherDossier.id} • {selectedTeacherDossier.department} Department
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTeacherDossier(null)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>SUBJECT & STREAM</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{selectedTeacherDossier.subject}</div>
              </div>

              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>CLASS TEACHER ASSIGNMENT</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary)", marginTop: 2 }}>{selectedTeacherDossier.classTeacher}</div>
              </div>

              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>QUALIFICATION</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{selectedTeacherDossier.qualification}</div>
              </div>

              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>SALARY PAYROLL GRADE</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#38bdf8", marginTop: 2 }}>{selectedTeacherDossier.salary}</div>
              </div>

              <div style={{ gridColumn: "span 2", padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>CONTACT & EMAIL</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{selectedTeacherDossier.phone} • {selectedTeacherDossier.email}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ MODAL: ADD NEW FACULTY ════════════ */}
      {isAddModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Add New Faculty Member</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddTeacher} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FULL NAME</label>
                <input 
                  type="text" 
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  placeholder="e.g. Dr. Sunita Rao"
                  required
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DEPARTMENT</label>
                  <select 
                    value={newTeacher.department}
                    onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  >
                    {["Mathematics", "Science", "Humanities", "IT & CS", "Physical Ed", "Fine Arts"].map(d => <option key={d} value={d} style={{ background: "#0b0f19" }}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CLASS TEACHER</label>
                  <input 
                    type="text" 
                    value={newTeacher.classTeacher}
                    onChange={(e) => setNewTeacher({ ...newTeacher, classTeacher: e.target.value })}
                    placeholder="e.g. Class 10-A"
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT TAUGHT</label>
                <input 
                  type="text" 
                  value={newTeacher.subject}
                  onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                  placeholder="e.g. Senior Mathematics (Class 9-12)"
                  required
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PHONE (+91)</label>
                  <input 
                    type="text" 
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    placeholder="+91 98111 55667"
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SALARY (₹ / MONTH)</label>
                  <input 
                    type="number" 
                    value={newTeacher.salary}
                    onChange={(e) => setNewTeacher({ ...newTeacher, salary: e.target.value })}
                    placeholder="65000"
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Register Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
