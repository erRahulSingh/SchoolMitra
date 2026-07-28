"use client";

import React, { useState } from "react";
import { 
  GraduationCap, Search, Filter, UserPlus, X, Phone, 
  Bus, CheckCircle2, FileText, AlertCircle, Eye, Edit3, 
  Trash2, ShieldCheck, Mail, MapPin, Award, Upload, User, 
  Calendar, CheckCircle, CreditCard, ChevronRight, Building2 
} from "lucide-react";
import { MOCK_STUDENTS, Student } from "@/lib/mockData";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudentDossier, setSelectedStudentDossier] = useState<Student | null>(null);
  const [dossierTab, setDossierTab] = useState<"academic" | "parent" | "transport" | "documents">("academic");

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "10",
    section: "A",
    parentName: "",
    phone: "",
    feeStatus: "Paid" as const,
    busAllocated: true,
    busRoute: "Route 1 - Dwarka Sector 12 Express"
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
                          s.id.toLowerCase().includes(search.toLowerCase());
    const matchesClass = selectedClass === "All" || s.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.parentName) return;

    const created: Student = {
      id: `STU-${1000 + students.length + 1}`,
      rollNo: `${newStudent.class}-${newStudent.section}-${String(students.length + 1).padStart(2, '0')}`,
      name: newStudent.name,
      class: newStudent.class,
      section: newStudent.section,
      parentName: newStudent.parentName,
      phone: newStudent.phone || "+91 98111 22334",
      attendance: "100%",
      feeStatus: newStudent.feeStatus,
      busAllocated: newStudent.busAllocated,
      busRoute: newStudent.busAllocated ? newStudent.busRoute : undefined,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    };

    setStudents([created, ...students]);
    setIsAddModalOpen(false);
    setNewStudent({
      name: "",
      class: "10",
      section: "A",
      parentName: "",
      phone: "",
      feeStatus: "Paid",
      busAllocated: true,
      busRoute: "Route 1 - Dwarka Sector 12 Express"
    });
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm("Are you sure you want to remove this student record from the ERP?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

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
            Student Directory & 360° Management <GraduationCap size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Manage enrolments, academic streams, parent mappings, bus routes, and compliance documents.
          </p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <UserPlus size={18} />
          <span>Add New Student</span>
        </button>
      </div>

      {/* SEARCH & FILTER CONTROLS BAR */}
      <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", flex: 1, maxWidth: 600 }}>
          {/* Search Box */}
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, roll no, STU-ID..."
              style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
            />
          </div>

          {/* Class Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{ padding: "0.65rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem", cursor: "pointer" }}
            >
              <option value="All" style={{ background: "#0b0f19" }}>All Classes</option>
              <option value="10" style={{ background: "#0b0f19" }}>Class 10</option>
              <option value="9" style={{ background: "#0b0f19" }}>Class 9</option>
              <option value="8" style={{ background: "#0b0f19" }}>Class 8</option>
              <option value="7" style={{ background: "#0b0f19" }}>Class 7</option>
            </select>
          </div>
        </div>

        <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 600 }}>
          Showing <strong>{filteredStudents.length}</strong> Enrolled Students
        </span>
      </div>

      {/* ════════════ STUDENT DIRECTORY TABLE ════════════ */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No & STU ID</th>
                <th>Class & Sec</th>
                <th>Parent Contact</th>
                <th>Attendance</th>
                <th>Fee Status</th>
                <th>Transport</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <img 
                      src={s.avatar} 
                      alt={s.name} 
                      style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border-color)" }} 
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff" }}>{s.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600 }}>{s.id}</div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{s.rollNo}</div>
                  </td>
                  <td>
                    <span className="badge badge-info">Class {s.class}-{s.section}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{s.parentName}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.phone}</div>
                  </td>
                  <td style={{ fontWeight: 700, color: "var(--success)" }}>{s.attendance}</td>
                  <td>
                    <span className={`badge ${
                      s.feeStatus === "Paid" ? "badge-success" : s.feeStatus === "Pending" ? "badge-warning" : "badge-danger"
                    }`}>
                      {s.feeStatus}
                    </span>
                  </td>
                  <td>
                    {s.busAllocated ? (
                      <span className="badge badge-success" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                        <Bus size={12} /> {s.busRoute || "Bus Allocated"}
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Self Transport</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.45rem", justifyContent: "flex-end" }}>
                      {/* 360° Profile Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedStudentDossier(s)}
                        className="btn btn-secondary"
                        style={{ padding: "0.4rem 0.65rem", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.3rem" }}
                      >
                        <Eye size={14} /> Profile
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteStudent(s.id)}
                        style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "0.4rem 0.55rem", borderRadius: "var(--radius-sm)", cursor: "pointer" }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ════════════ MODAL 1: 360° STUDENT PROFILE DOSSIER ════════════ */}
      {selectedStudentDossier && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 680, borderRadius: "var(--radius-lg)" }}>
            
            {/* Dossier Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img 
                  src={selectedStudentDossier.avatar} 
                  alt={selectedStudentDossier.name} 
                  style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary)" }} 
                />
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>{selectedStudentDossier.name}</h2>
                  <div style={{ fontSize: "0.825rem", color: "var(--primary)", fontWeight: 700, marginTop: 1 }}>
                    {selectedStudentDossier.id} • Class {selectedStudentDossier.class}-{selectedStudentDossier.section} (Roll #{selectedStudentDossier.rollNo})
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudentDossier(null)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={22} />
              </button>
            </div>

            {/* 4 DOSSIER TABS HEADER */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginBottom: "1.25rem" }}>
              {[
                { id: "academic", label: "Academic Details" },
                { id: "parent", label: "Parent Mapping" },
                { id: "transport", label: "Transport Details" },
                { id: "documents", label: "Documents Repository" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDossierTab(tab.id as any)}
                  style={{
                    padding: "0.6rem 0.4rem", borderRadius: "var(--radius-sm)", border: dossierTab === tab.id ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                    background: dossierTab === tab.id ? "var(--primary-glow)" : "rgba(255,255,255,0.03)",
                    color: dossierTab === tab.id ? "#fff" : "var(--text-muted)", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer", textAlign: "center"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* DOSSIER TAB CONTENT */}
            <div style={{ minHeight: 220 }}>
              
              {/* TAB 1: ACADEMIC DETAILS */}
              {dossierTab === "academic" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>CURRENT CLASS & SECTION</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>Class {selectedStudentDossier.class}-{selectedStudentDossier.section}</div>
                  </div>

                  <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ROLL NUMBER & ID</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary)", marginTop: 2 }}>{selectedStudentDossier.rollNo}</div>
                  </div>

                  <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ATTENDANCE RATE</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--success)", marginTop: 2 }}>{selectedStudentDossier.attendance} Present</div>
                  </div>

                  <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>HOUSE ALLOCATION</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f59e0b", marginTop: 2 }}>Emerald House</div>
                  </div>
                </div>
              )}

              {/* TAB 2: PARENT MAPPING */}
              {dossierTab === "parent" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>FATHER & GUARDIAN NAME</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{selectedStudentDossier.parentName}</div>
                  </div>

                  <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>PARENT CONTACT NUMBER</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary)", marginTop: 2 }}>{selectedStudentDossier.phone}</div>
                    </div>
                    <span className="badge badge-success">PARENT APP LINKED ✅</span>
                  </div>

                  <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>PARENT ACCOUNT ID</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#38bdf8", marginTop: 2 }}>PAR-99120 (Vikram Sharma)</div>
                  </div>
                </div>
              )}

              {/* TAB 3: TRANSPORT DETAILS */}
              {dossierTab === "transport" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {selectedStudentDossier.busAllocated ? (
                    <>
                      <div style={{ padding: "0.85rem", background: "rgba(16, 185, 129, 0.12)", borderRadius: "var(--radius-md)", border: "1px solid var(--success)" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 700 }}>TRANSPORT SERVICE ACTIVE</div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{selectedStudentDossier.busRoute}</div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                        <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ASSIGNED BUS</div>
                          <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>Bus #01 (DL 01 AB 4321)</div>
                        </div>

                        <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>PICKUP & DROP STOP</div>
                          <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>Sector 12 Market Gate</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--text-muted)" }}>
                      Student uses Self / Private Transport. No school bus allocated.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: DOCUMENTS REPOSITORY */}
              {dossierTab === "documents" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { name: "Aadhaar Card Copy", status: "VERIFIED ✅", date: "15 Jan 2026" },
                    { name: "Birth Certificate", status: "VERIFIED ✅", date: "15 Jan 2026" },
                    { name: "Transfer Certificate (TC)", status: "VERIFIED ✅", date: "16 Jan 2026" },
                    { name: "Passport Photo", status: "UPLOADED ✅", date: "15 Jan 2026" }
                  ].map((doc, idx) => (
                    <div key={idx} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "#fff" }}>{doc.name}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2 }}>Uploaded {doc.date}</div>
                      </div>
                      <span className="badge badge-success" style={{ fontSize: "0.68rem" }}>{doc.status}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ════════════ MODAL 2: ADD NEW STUDENT FORM ════════════ */}
      {isAddModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 520, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>New Student Registration & Onboarding</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddStudent} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FULL STUDENT NAME</label>
                <input 
                  type="text" 
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  required
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CLASS</label>
                  <select 
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  >
                    {["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"].map(c => <option key={c} value={c} style={{ background: "#0b0f19" }}>Class {c}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SECTION</label>
                  <select 
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  >
                    {["A", "B", "C", "D"].map(s => <option key={s} value={s} style={{ background: "#0b0f19" }}>Section {s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FATHER / PARENT NAME</label>
                <input 
                  type="text" 
                  value={newStudent.parentName}
                  onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                  placeholder="e.g. Vikram Sharma"
                  required
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PARENT CONTACT (+91)</label>
                <input 
                  type="text" 
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  placeholder="e.g. +91 98111 22334"
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", cursor: "pointer", color: "#fff" }}>
                  <input 
                    type="checkbox"
                    checked={newStudent.busAllocated}
                    onChange={(e) => setNewStudent({ ...newStudent, busAllocated: e.target.checked })}
                  />
                  Allocate School Bus Transport
                </label>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Complete Enrolment</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
