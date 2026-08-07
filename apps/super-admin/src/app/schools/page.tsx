"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, Plus, Search, Filter, Eye, Edit3, Trash2, 
  Ban, CheckCircle2, AlertCircle, X, Shield, Mail, Phone, 
  MapPin, Calendar, CreditCard, Users, GraduationCap, Bus, Clock, Sparkles 
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      try {
        const res = await superAdminApi.getSchools();
        if (res.success && res.data?.schools) {
          setSchools(res.data.schools);
        } else if (res.success && (res as any).schools) {
          setSchools((res as any).schools);
        }
      } catch (err) {
        console.error("Error fetching schools directory:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<any>(null);
  const [viewingSchoolDossier, setViewingSchoolDossier] = useState<any>(null);

  // Add School Form State
  const [newSchool, setNewSchool] = useState({
    name: "",
    code: "",
    city: "New Delhi",
    plan: "Enterprise Pro",
    adminName: "",
    email: "",
    phone: ""
  });

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchool.name || !newSchool.adminName || !newSchool.email) return;

    const created = {
      id: `SCH-${1000 + schools.length + 1}`,
      code: newSchool.code || `CBSE-AFF-${Math.floor(1000000 + Math.random() * 9000000)}`,
      name: newSchool.name,
      city: newSchool.city,
      plan: newSchool.plan,
      adminName: newSchool.adminName,
      email: newSchool.email,
      phone: newSchool.phone || "+91 98111 00000",
      status: "Active",
      studentsCount: 0,
      teachersCount: 0,
      parentsCount: 0,
      driversCount: 0,
      mrr: newSchool.plan === "Enterprise Pro" ? "₹ 45,000" : "₹ 25,000",
      expiry: "29 Jul 2027",
      onboardedDate: "29 Jul 2026"
    };

    setSchools([created, ...schools]);
    setIsAddModalOpen(false);
    setNewSchool({ name: "", code: "", city: "New Delhi", plan: "Enterprise Pro", adminName: "", email: "", phone: "" });
  };

  const handleUpdateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchool) return;

    setSchools(schools.map(s => s.id === editingSchool.id ? editingSchool : s));
    setEditingSchool(null);
  };

  const toggleSuspendSchool = (id: string) => {
    setSchools(schools.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === "Suspended" ? "Active" : "Suspended";
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleDeleteSchool = (id: string) => {
    if (confirm("DANGER: Are you sure you want to permanently delete this School Tenant Account?")) {
      setSchools(schools.filter(s => s.id !== id));
    }
  };

  const filteredSchools = schools.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.code.toLowerCase().includes(search.toLowerCase()) ||
                          s.city.toLowerCase().includes(search.toLowerCase()) ||
                          s.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      
      {/* PAGE HEADER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Building2 size={14} /> Multi-Tenant Provisioning Engine
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            School Tenant Management Module
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.875rem" }}>
            Onboard new schools, manage SaaS subscriptions, view tenant 360° dossiers, suspend accounts, and configure permissions.
          </p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary"
        >
          <Plus size={18} />
          <span>Add New School Tenant</span>
        </button>
      </div>

      {/* SEARCH & STATUS FILTER BAR */}
      <div className="glass-card" style={{ padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", flex: 1, maxWidth: 680 }}>
          {/* Search Input */}
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by school name, city, CBSE code, SCH-ID..."
              style={{
                width: "100%",
                padding: "0.65rem 0.75rem 0.65rem 2.5rem",
                background: "var(--bg-input)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                color: "var(--text-main)",
                fontSize: "0.85rem"
              }}
            />
          </div>

          {/* Status Filter Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "0.65rem 1rem",
                background: "var(--bg-input)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                color: "var(--text-main)",
                fontSize: "0.85rem",
                cursor: "pointer"
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Suspended">Suspended</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 700 }}>
          Showing <strong style={{ color: "var(--text-heading)" }}>{filteredSchools.length}</strong> Registered Schools
        </span>
      </div>

      {/* ════════════ 1. SCHOOL LIST DIRECTORY TABLE ════════════ */}
      <div className="glass-card" style={{ padding: "1.25rem" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>School Tenant & ID</th>
                <th>CBSE Affiliation</th>
                <th>SaaS Plan</th>
                <th>Principal / Admin</th>
                <th>Ecosystem Users</th>
                <th>Monthly MRR</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchools.map((sch) => (
                <tr key={sch.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: "var(--text-heading)", fontSize: "0.925rem" }}>{sch.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, marginTop: 2 }}>
                      {sch.id} • {sch.city}
                    </div>
                  </td>
                  <td style={{ fontFamily: "monospace", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600 }}>
                    {sch.code}
                  </td>
                  <td>
                    <span className="badge badge-info">{sch.plan}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: "var(--text-heading)" }}>{sch.adminName}</div>
                    <div style={{ fontSize: "0.725rem", color: "var(--text-muted)", marginTop: 1 }}>{sch.email}</div>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                    <strong style={{ color: "var(--text-heading)" }}>{sch.studentsCount || sch.students || 0}</strong> STU • <strong style={{ color: "var(--text-heading)" }}>{sch.parentsCount || sch.parents || 0}</strong> PAR • <strong style={{ color: "var(--text-heading)" }}>{sch.driversCount || sch.drivers || 0}</strong> DRV
                  </td>
                  <td style={{ fontWeight: 900, color: "var(--success)", fontSize: "0.925rem", whiteSpace: "nowrap" }}>
                    {sch.mrr}
                  </td>
                  <td>
                    <span className={`badge ${
                      sch.status === "Active" ? "badge-success" : sch.status === "Trial" ? "badge-warning" : "badge-danger"
                    }`}>
                      {sch.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.45rem", justifyContent: "flex-end" }}>
                      {/* 6. View School Details Dossier */}
                      <button
                        type="button"
                        onClick={() => setViewingSchoolDossier(sch)}
                        className="btn btn-secondary"
                        style={{ padding: "0.4rem 0.7rem", fontSize: "0.78rem" }}
                      >
                        <Eye size={14} /> View
                      </button>

                      {/* 3. Edit School Details */}
                      <button
                        type="button"
                        onClick={() => setEditingSchool(sch)}
                        className="btn btn-secondary"
                        style={{ padding: "0.4rem 0.7rem", fontSize: "0.78rem" }}
                      >
                        <Edit3 size={14} /> Edit
                      </button>

                      {/* 4. Suspend School Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleSuspendSchool(sch.id)}
                        style={{
                          padding: "0.4rem 0.65rem",
                          borderRadius: "var(--radius-md)",
                          cursor: "pointer",
                          fontWeight: 800,
                          fontSize: "0.78rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          background: sch.status === "Suspended" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                          border: sch.status === "Suspended" ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(245, 158, 11, 0.3)",
                          color: sch.status === "Suspended" ? "#34d399" : "#fbbf24"
                        }}
                      >
                        <Ban size={14} />
                      </button>

                      {/* 5. Delete School Action */}
                      <button
                        type="button"
                        onClick={() => handleDeleteSchool(sch.id)}
                        style={{
                          padding: "0.4rem 0.65rem",
                          borderRadius: "var(--radius-md)",
                          cursor: "pointer",
                          background: "rgba(239, 68, 68, 0.15)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          color: "#f87171"
                        }}
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

      {/* ════════════ 2. ADD SCHOOL MODAL ════════════ */}
      {isAddModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 560, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>Onboard New School Tenant</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSchool} style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SCHOOL OFFICIAL NAME</label>
                <input 
                  type="text" 
                  value={newSchool.name}
                  onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                  placeholder="e.g. Delhi Public School (Dwarka)"
                  required
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CBSE / STATE CODE</label>
                  <input 
                    type="text" 
                    value={newSchool.code}
                    onChange={(e) => setNewSchool({ ...newSchool, code: e.target.value })}
                    placeholder="e.g. CBSE-AFF-2730001"
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SaaS SUBSCRIPTION PLAN</label>
                  <select 
                    value={newSchool.plan}
                    onChange={(e) => setNewSchool({ ...newSchool, plan: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  >
                    {["Enterprise Pro", "Growth Plan", "Starter Plan", "Trial (14 Days)"].map(p => <option key={p} value={p} style={{ background: "#0b0f19" }}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PRINCIPAL / ADMIN NAME</label>
                  <input 
                    type="text" 
                    value={newSchool.adminName}
                    onChange={(e) => setNewSchool({ ...newSchool, adminName: e.target.value })}
                    placeholder="e.g. Dr. Ashok Kumar"
                    required
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CITY / LOCATION</label>
                  <input 
                    type="text" 
                    value={newSchool.city}
                    onChange={(e) => setNewSchool({ ...newSchool, city: e.target.value })}
                    placeholder="e.g. New Delhi"
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ADMIN EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    value={newSchool.email}
                    onChange={(e) => setNewSchool({ ...newSchool, email: e.target.value })}
                    placeholder="admin@school.edu.in"
                    required
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>HELPLINE PHONE (+91)</label>
                  <input 
                    type="text" 
                    value={newSchool.phone}
                    onChange={(e) => setNewSchool({ ...newSchool, phone: e.target.value })}
                    placeholder="+91 11 2617 7777"
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.85rem", marginTop: "0.75rem" }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Complete Onboarding</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ 3. EDIT SCHOOL MODAL ════════════ */}
      {editingSchool && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 560, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>Edit School Tenant Details</h3>
              <button onClick={() => setEditingSchool(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateSchool} style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SCHOOL NAME</label>
                <input 
                  type="text" 
                  value={editingSchool.name}
                  onChange={(e) => setEditingSchool({ ...editingSchool, name: e.target.value })}
                  required
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SaaS PLAN</label>
                  <select 
                    value={editingSchool.plan}
                    onChange={(e) => setEditingSchool({ ...editingSchool, plan: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  >
                    {["Enterprise Pro", "Growth Plan", "Starter Plan", "Trial (14 Days)"].map(p => <option key={p} value={p} style={{ background: "#0b0f19" }}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBSCRIPTION STATUS</label>
                  <select 
                    value={editingSchool.status}
                    onChange={(e) => setEditingSchool({ ...editingSchool, status: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  >
                    {["Active", "Trial", "Suspended", "Expired"].map(st => <option key={st} value={st} style={{ background: "#0b0f19" }}>{st}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PRINCIPAL NAME</label>
                  <input 
                    type="text" 
                    value={editingSchool.adminName}
                    onChange={(e) => setEditingSchool({ ...editingSchool, adminName: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ADMIN EMAIL</label>
                  <input 
                    type="email" 
                    value={editingSchool.email}
                    onChange={(e) => setEditingSchool({ ...editingSchool, email: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.85rem", marginTop: "0.75rem" }}>
                <button type="button" onClick={() => setEditingSchool(null)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ 6. VIEW SCHOOL DETAILS 360° DOSSIER MODAL ════════════ */}
      {viewingSchoolDossier && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 660, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-color)" }}>
              <div>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#fff" }}>{viewingSchoolDossier.name}</h2>
                <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 800, marginTop: 2 }}>
                  {viewingSchoolDossier.id} • {viewingSchoolDossier.code} • {viewingSchoolDossier.city}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingSchoolDossier(null)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={22} />
              </button>
            </div>

            {/* ECOSYSTEM METRICS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.85rem", marginBottom: "1.5rem" }}>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#38bdf8" }}>{viewingSchoolDossier.studentsCount}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2, fontWeight: 700 }}>Students</div>
              </div>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#34d399" }}>{viewingSchoolDossier.teachersCount}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2, fontWeight: 700 }}>Faculty</div>
              </div>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#c084fc" }}>{viewingSchoolDossier.parentsCount}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2, fontWeight: 700 }}>Parents</div>
              </div>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#f472b6" }}>{viewingSchoolDossier.driversCount}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2, fontWeight: 700 }}>Bus Pilots</div>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <div style={{ padding: "0.85rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>SaaS PLAN & STATUS</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>
                  {viewingSchoolDossier.plan} • <span style={{ color: "#34d399" }}>{viewingSchoolDossier.status}</span>
                </div>
              </div>

              <div style={{ padding: "0.85rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>MONTHLY BILLING (MRR)</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "#34d399", marginTop: 2 }}>{viewingSchoolDossier.mrr}</div>
              </div>

              <div style={{ padding: "0.85rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ADMIN / PRINCIPAL</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{viewingSchoolDossier.adminName}</div>
              </div>

              <div style={{ padding: "0.85rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>CONTACT & HELPLINE</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#38bdf8", marginTop: 2 }}>{viewingSchoolDossier.email}</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
