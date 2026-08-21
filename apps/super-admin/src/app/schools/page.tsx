"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Building2, Plus, Search, Filter, Eye, Edit3, Trash2, 
  Ban, CheckCircle2, AlertCircle, X, Shield, Mail, Phone, 
  MapPin, Calendar, CreditCard, Users, GraduationCap, Bus, Clock, 
  Sparkles, Activity, RefreshCw, AlertTriangle, ArrowRight, Check,
  ShieldCheck, ShieldAlert, History, KeyRound, DollarSign, FileText
} from "lucide-react";
import { superAdminApi } from "@/lib/api";

type SchoolStatusType = "ACTIVE" | "TRIAL" | "SUSPENDED" | "EXPIRED" | "DEACTIVATED" | "PENDING_APPROVAL";

const STATUS_TABS = [
  { id: "ALL", label: "All Schools", icon: Building2 },
  { id: "ACTIVE", label: "Active", icon: CheckCircle2, color: "#10b981" },
  { id: "TRIAL", label: "Trial", icon: Sparkles, color: "#f59e0b" },
  { id: "SUSPENDED", label: "Suspended", icon: Ban, color: "#ef4444" },
  { id: "EXPIRED", label: "Expired", icon: AlertTriangle, color: "#f97316" },
  { id: "DEACTIVATED", label: "Deactivated", icon: ShieldAlert, color: "#64748b" },
  { id: "PENDING_APPROVAL", label: "Pending Approval", icon: Clock, color: "#8b5cf6" }
];

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatusTab, setActiveStatusTab] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingSchoolDossier, setViewingSchoolDossier] = useState<any>(null);
  const [viewingSubscriptionModal, setViewingSubscriptionModal] = useState<any>(null);
  const [viewingActivityModal, setViewingActivityModal] = useState<any>(null);
  const [statusHistoryLogs, setStatusHistoryLogs] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const openStatusHistoryModal = async (sch: any) => {
    setViewingActivityModal(sch);
    setLoadingHistory(true);
    try {
      const res = await superAdminApi.getSchoolStatusHistory(sch._id || sch.id);
      if (res.success && res.data?.history) {
        setStatusHistoryLogs(res.data.history);
      } else {
        setStatusHistoryLogs([]);
      }
    } catch {
      setStatusHistoryLogs([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const [reactivateModal, setReactivateModal] = useState<{
    school: any;
    reason: string;
  } | null>(null);
  const [suspendModal, setSuspendModal] = useState<{
    school: any;
    reason: string;
    confirmed: boolean;
  } | null>(null);
  const [statusChangeModal, setStatusChangeModal] = useState<{
    school: any;
    targetStatus: SchoolStatusType;
    reason: string;
    expiresAt?: string;
  } | null>(null);

  // Add School Form State
  const [newSchool, setNewSchool] = useState({
    name: "",
    code: "",
    city: "New Delhi",
    plan: "Enterprise Pro",
    adminName: "",
    email: "",
    phone: "",
    status: "ACTIVE" as SchoolStatusType
  });

  const fetchSchools = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  // Status Action Handlers
  const handleConfirmReactivate = async () => {
    if (!reactivateModal) return;
    const { school, reason } = reactivateModal;

    try {
      const res = await superAdminApi.toggleSchoolStatus(school._id || school.id, {
        status: "ACTIVE",
        statusReason: reason.trim() || "Reactivated by Super Admin. Full tenant access restored."
      });

      if (res.success) {
        setSchools(prev =>
          prev.map(s => {
            if ((s._id || s.id) === (school._id || school.id)) {
              return {
                ...s,
                status: "ACTIVE",
                statusReason: reason.trim() || "Reactivated by Super Admin.",
                reactivatedAt: new Date().toISOString(),
                lastActivity: "Just now"
              };
            }
            return s;
          })
        );
        setReactivateModal(null);
      } else {
        alert(res.message || "Failed to reactivate school.");
      }
    } catch (e: any) {
      alert(e.message || "Failed to reactivate school.");
    }
  };

  const handleConfirmSuspend = async () => {
    if (!suspendModal) return;
    const { school, reason, confirmed } = suspendModal;

    if (!confirmed) {
      alert("Please check the confirmation box to proceed with suspension.");
      return;
    }

    if (!reason.trim()) {
      alert("Please provide a reason for suspending this school.");
      return;
    }

    try {
      const res = await superAdminApi.toggleSchoolStatus(school._id || school.id, {
        status: "SUSPENDED",
        statusReason: reason.trim()
      });

      if (res.success) {
        setSchools(prev =>
          prev.map(s => {
            if ((s._id || s.id) === (school._id || school.id)) {
              return {
                ...s,
                status: "SUSPENDED",
                statusReason: reason.trim(),
                suspendedAt: new Date().toISOString(),
                lastActivity: "Just now"
              };
            }
            return s;
          })
        );
        setSuspendModal(null);
      } else {
        alert(res.message || "Failed to suspend school.");
      }
    } catch (e: any) {
      alert(e.message || "Failed to suspend school.");
    }
  };

  const handleApplyStatusChange = async () => {
    if (!statusChangeModal) return;
    const { school, targetStatus, reason, expiresAt } = statusChangeModal;

    try {
      const res = await superAdminApi.toggleSchoolStatus(school._id || school.id, {
        status: targetStatus,
        statusReason: reason || `Status updated to ${targetStatus} by Super Admin`,
        statusExpiresAt: expiresAt || undefined
      });

      if (res.success) {
        setSchools(prev =>
          prev.map(s => {
            if ((s._id || s.id) === (school._id || school.id)) {
              return {
                ...s,
                status: targetStatus,
                statusReason: reason,
                statusExpiresAt: expiresAt || s.statusExpiresAt,
                suspendedAt: targetStatus === "SUSPENDED" ? new Date().toISOString() : s.suspendedAt,
                reactivatedAt: targetStatus === "ACTIVE" ? new Date().toISOString() : s.reactivatedAt,
                lastActivity: "Just now"
              };
            }
            return s;
          })
        );
        setStatusChangeModal(null);
      } else {
        alert(res.message || "Failed to update school status.");
      }
    } catch (e: any) {
      alert(e.message || "Failed to execute status update.");
    }
  };

  const handleQuickActivate = (school: any) => {
    setReactivateModal({
      school,
      reason: "Account reactivated by Super Admin. Full ecosystem access restored."
    });
  };

  const handleQuickSuspend = (school: any) => {
    setSuspendModal({
      school,
      reason: "",
      confirmed: false
    });
  };

  const handleQuickDeactivate = (school: any) => {
    setStatusChangeModal({
      school,
      targetStatus: "DEACTIVATED",
      reason: "Deactivated by Super Admin."
    });
  };

  const handleAddSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchool.name || !newSchool.adminName || !newSchool.email) return;

    try {
      const res = await superAdminApi.createSchool(newSchool);
      if (res.success) {
        fetchSchools();
        setIsAddModalOpen(false);
        setNewSchool({
          name: "",
          code: "",
          city: "New Delhi",
          plan: "Enterprise Pro",
          adminName: "",
          email: "",
          phone: "",
          status: "ACTIVE"
        });
      } else {
        alert(res.message || "Could not provision school.");
      }
    } catch (e) {
      fetchSchools();
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteSchool = async (school: any) => {
    if (confirm(`DANGER ⚠️: Are you sure you want to PERMANENTLY delete ${school.name}? All tenant data will be erased.`)) {
      try {
        await superAdminApi.deleteSchool(school._id || school.id);
        setSchools(prev => prev.filter(s => (s._id || s.id) !== (school._id || school.id)));
      } catch (e) {
        setSchools(prev => prev.filter(s => (s._id || s.id) !== (school._id || school.id)));
      }
    }
  };

  // Filtered Schools
  const filteredSchools = schools.filter(s => {
    const rawStatus = (s.status || "ACTIVE").toUpperCase();
    const matchesTab = activeStatusTab === "ALL" || rawStatus === activeStatusTab;
    const matchesSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.code?.toLowerCase().includes(search.toLowerCase()) ||
      s.city?.toLowerCase().includes(search.toLowerCase()) ||
      s.id?.toLowerCase().includes(search.toLowerCase()) ||
      s.adminName?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getStatusBadgeStyle = (status: string) => {
    const st = (status || "").toUpperCase();
    switch (st) {
      case "ACTIVE":
        return { bg: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#34d399", label: "ACTIVE" };
      case "TRIAL":
        return { bg: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#fbbf24", label: "TRIAL" };
      case "SUSPENDED":
        return { bg: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#f87171", label: "SUSPENDED" };
      case "EXPIRED":
        return { bg: "rgba(249, 115, 22, 0.15)", border: "1px solid rgba(249, 115, 22, 0.3)", color: "#fb923c", label: "EXPIRED" };
      case "DEACTIVATED":
        return { bg: "rgba(100, 116, 139, 0.15)", border: "1px solid rgba(100, 116, 139, 0.3)", color: "#94a3b8", label: "DEACTIVATED" };
      case "PENDING_APPROVAL":
        return { bg: "rgba(139, 92, 246, 0.15)", border: "1px solid rgba(139, 92, 246, 0.3)", color: "#a78bfa", label: "PENDING APPROVAL" };
      default:
        return { bg: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#34d399", label: st || "ACTIVE" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* HERO BANNER */}
      <div className="hero-banner">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", borderRadius: "99px", background: "rgba(255, 255, 255, 0.18)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            <Building2 size={14} /> Multi-Tenant Central Operations &amp; Tenancy Control
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            School Tenant Management &amp; Status Control
          </h1>
          <p style={{ marginTop: 4, fontSize: "0.875rem" }}>
            Super Admin master console to monitor tenant accounts, switch operational status, enforce immediate suspensions, and audit ecosystem metrics.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={fetchSchools} className="btn btn-secondary" style={{ padding: "0.6rem 1rem", fontSize: "0.85rem", gap: "0.4rem" }}>
            <RefreshCw size={15} /> Refresh
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}>
            <Plus size={16} /> Onboard New School
          </button>
        </div>
      </div>

      {/* ════════════ STATUS FILTER TABS ════════════ */}
      <div className="glass-card" style={{ padding: "0.6rem", display: "flex", gap: "0.5rem", overflowX: "auto", whiteSpace: "nowrap" }}>
        {STATUS_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeStatusTab === tab.id;
          const count = tab.id === "ALL" 
            ? schools.length 
            : schools.filter(s => (s.status || "ACTIVE").toUpperCase() === tab.id).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveStatusTab(tab.id)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{
                padding: "0.55rem 0.95rem",
                fontSize: "0.82rem",
                gap: "0.45rem",
                borderRadius: 8,
                fontWeight: isActive ? 800 : 600
              }}
            >
              <Icon size={15} color={tab.color || (isActive ? "#ffffff" : "var(--text-muted)")} />
              <span>{tab.label}</span>
              <span style={{
                padding: "1px 6px",
                borderRadius: 99,
                fontSize: "0.72rem",
                background: isActive ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
                color: "#ffffff",
                fontWeight: 900
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR & COUNTER */}
      <div className="glass-card" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 540 }}>
          <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by school name, city, CBSE code, SCH-ID, or admin email..."
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

        <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 700 }}>
          Showing <strong style={{ color: "var(--primary)" }}>{filteredSchools.length}</strong> of {schools.length} Schools
        </span>
      </div>

      {/* ════════════ SCHOOL DIRECTORY TABLE (13 COLUMNS) ════════════ */}
      <div className="glass-card" style={{ padding: "1.25rem" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
            Loading multi-tenant school registers...
          </div>
        ) : filteredSchools.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
            No schools found matching the current tab and search criteria.
          </div>
        ) : (
          <div className="table-container" style={{ overflowX: "auto" }}>
            <table className="custom-table" style={{ width: "100%", minWidth: 1200 }}>
              <thead>
                <tr>
                  <th>SCHOOL NAME</th>
                  <th>SCHOOL ID</th>
                  <th>ADMIN / PRINCIPAL</th>
                  <th style={{ textAlign: "center" }}>STATUS</th>
                  <th>SUBSCRIPTION / PLAN</th>
                  <th>TRIAL / EXPIRY</th>
                  <th style={{ textAlign: "center" }}>STUDENTS</th>
                  <th style={{ textAlign: "center" }}>TEACHERS</th>
                  <th style={{ textAlign: "center" }}>PARENTS</th>
                  <th style={{ textAlign: "center" }}>DRIVERS</th>
                  <th style={{ textAlign: "center" }}>BUSES</th>
                  <th>CREATED</th>
                  <th>LAST ACTIVITY</th>
                  <th style={{ textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((sch) => {
                  const badge = getStatusBadgeStyle(sch.status);
                  const isSuspended = (sch.status || "").toUpperCase() === "SUSPENDED";
                  const isActive = (sch.status || "").toUpperCase() === "ACTIVE";

                  return (
                    <tr key={sch._id || sch.id}>
                      {/* 1. School Name */}
                      <td>
                        <div style={{ fontWeight: 800, color: "var(--text-heading)", fontSize: "0.9rem" }}>{sch.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                          {sch.city || "New Delhi"}
                        </div>
                      </td>

                      {/* 2. School ID */}
                      <td style={{ fontFamily: "monospace", color: "var(--primary)", fontSize: "0.78rem", fontWeight: 700 }}>
                        {sch.code || sch.id}
                      </td>

                      {/* 3. Admin */}
                      <td>
                        <div style={{ fontWeight: 700, color: "var(--text-heading)", fontSize: "0.82rem" }}>{sch.adminName || "Principal"}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{sch.email}</div>
                      </td>

                      {/* 4. Status Badge */}
                      <td style={{ textAlign: "center" }}>
                        <span style={{
                          padding: "3px 8px",
                          borderRadius: 6,
                          fontSize: "0.72rem",
                          fontWeight: 900,
                          background: badge.bg,
                          border: badge.border,
                          color: badge.color,
                          display: "inline-block"
                        }}>
                          {badge.label}
                        </span>
                      </td>

                      {/* 5. Plan */}
                      <td>
                        <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--text-heading)" }}>{sch.plan}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 800 }}>{sch.mrr}</div>
                      </td>

                      {/* 6. Trial/Expiry Date */}
                      <td style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                        {sch.expiry || sch.trialExpiresAt || "31 Dec 2027"}
                      </td>

                      {/* 7. Students */}
                      <td style={{ textAlign: "center", fontWeight: 800, color: "#38bdf8" }}>
                        {sch.studentsCount || sch.students || 0}
                      </td>

                      {/* 8. Teachers */}
                      <td style={{ textAlign: "center", fontWeight: 800, color: "#34d399" }}>
                        {sch.teachersCount || sch.teachers || 0}
                      </td>

                      {/* 9. Parents */}
                      <td style={{ textAlign: "center", fontWeight: 800, color: "#c084fc" }}>
                        {sch.parentsCount || sch.parents || 0}
                      </td>

                      {/* 10. Drivers */}
                      <td style={{ textAlign: "center", fontWeight: 800, color: "#f472b6" }}>
                        {sch.driversCount || sch.drivers || 0}
                      </td>

                      {/* 11. Buses */}
                      <td style={{ textAlign: "center", fontWeight: 800, color: "#fbbf24" }}>
                        {sch.busesCount || sch.buses || 0}
                      </td>

                      {/* 12. Created Date */}
                      <td style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                        {sch.createdAt || "Recently"}
                      </td>

                      {/* 13. Last Activity */}
                      <td style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                        {sch.lastActivity || "Just now"}
                      </td>

                      {/* 14. Actions */}
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.35rem", alignItems: "center" }}>
                          
                          {/* View Dossier */}
                          <button
                            type="button"
                            onClick={() => setViewingSchoolDossier(sch)}
                            className="btn btn-secondary"
                            style={{ padding: "0.35rem 0.55rem", fontSize: "0.72rem", gap: "0.25rem" }}
                            title="View 360° Tenant Dossier"
                          >
                            <Eye size={13} /> View
                          </button>

                          {/* Quick Activate / Reactivate */}
                          {!isActive ? (
                            <button
                              type="button"
                              onClick={() => handleQuickActivate(sch)}
                              className="btn btn-primary"
                              style={{ padding: "0.35rem 0.6rem", fontSize: "0.72rem", gap: "0.25rem", background: "#10b981", borderColor: "#10b981" }}
                              title={isSuspended ? "Reactivate School" : "Activate School"}
                            >
                              <CheckCircle2 size={13} /> {isSuspended ? "Reactivate" : "Activate"}
                            </button>
                          ) : (
                            /* Quick Suspend */
                            <button
                              type="button"
                              onClick={() => handleQuickSuspend(sch)}
                              style={{
                                padding: "0.35rem 0.6rem",
                                borderRadius: 6,
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                background: "rgba(239, 68, 68, 0.12)",
                                color: "#ef4444",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.25rem"
                              }}
                              title="Suspend School (Immediate Lock)"
                            >
                              <Ban size={13} /> Suspend
                            </button>
                          )}

                          {/* Change Status Modal */}
                          <button
                            type="button"
                            onClick={() => setStatusChangeModal({
                              school: sch,
                              targetStatus: (sch.status || "ACTIVE").toUpperCase() as SchoolStatusType,
                              reason: sch.statusReason || ""
                            })}
                            className="btn btn-secondary"
                            style={{ padding: "0.35rem 0.55rem", fontSize: "0.72rem" }}
                            title="Change Status (Custom modal)"
                          >
                            <Edit3 size={13} />
                          </button>

                          {/* View Status History (Step 31) */}
                          <button
                            type="button"
                            onClick={() => openStatusHistoryModal(sch)}
                            className="btn btn-secondary"
                            style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem" }}
                            title="View Status History (Immutable Trail)"
                          >
                            <History size={13} />
                          </button>

                          {/* View Subscription */}
                          <button
                            type="button"
                            onClick={() => setViewingSubscriptionModal(sch)}
                            className="btn btn-secondary"
                            style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem" }}
                            title="View Subscription & Modules"
                          >
                            <CreditCard size={13} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeleteSchool(sch)}
                            style={{
                              padding: "0.35rem 0.5rem",
                              borderRadius: 6,
                              border: "1px solid rgba(239, 68, 68, 0.3)",
                              background: "rgba(239, 68, 68, 0.1)",
                              color: "#f87171",
                              cursor: "pointer"
                            }}
                            title="Delete Tenant"
                          >
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
        )}
      </div>

      {/* ════════════ DEDICATED MODAL: REACTIVATE SCHOOL ════════════ */}
      {reactivateModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 450, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 540, borderRadius: "var(--radius-lg)", border: "1px solid rgba(16, 185, 129, 0.4)" }}>
            
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ padding: "8px", borderRadius: 8, background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                    Reactivate School Tenant
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>
                    Restore Full Ecosystem Access
                  </p>
                </div>
              </div>
              <button onClick={() => setReactivateModal(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              
              {/* School Details Card */}
              <div style={{ background: "var(--bg-input)", padding: "1rem", borderRadius: 10, border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>School:</span>
                  <strong style={{ fontSize: "0.9rem", color: "#fff" }}>{reactivateModal.school.name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Current Status:</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, padding: "2px 8px", borderRadius: 6, background: "rgba(239, 68, 68, 0.15)", color: "#f87171" }}>
                    {(reactivateModal.school.status || "SUSPENDED").toUpperCase()}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>New Status:</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 900, padding: "2px 8px", borderRadius: 6, background: "rgba(16, 185, 129, 0.2)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.4)" }}>
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Informational Box */}
              <div style={{
                padding: "0.95rem 1.1rem",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: 10,
                fontSize: "0.82rem",
                color: "#a7f3d0",
                lineHeight: 1.45,
                display: "flex",
                gap: "0.65rem",
                alignItems: "flex-start"
              }}>
                <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Access Restoration:</strong> All authorized users belonging to this school (<strong>School Admin</strong>, <strong>Teachers</strong>, <strong>Parents</strong>, <strong>Drivers</strong>) will immediately regain access to the system. <strong>No new accounts or re-registration required.</strong>
                </div>
              </div>

              {/* Optional Reason */}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>
                  REACTIVATION NOTE (OPTIONAL)
                </label>
                <textarea
                  value={reactivateModal.reason}
                  onChange={(e) => setReactivateModal({ ...reactivateModal, reason: e.target.value })}
                  placeholder="Enter audit note for reactivation (e.g. Invoices cleared, Renewal confirmed, Verification approved)..."
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    color: "#fff",
                    fontSize: "0.85rem",
                    lineHeight: 1.4
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.85rem", marginTop: "0.25rem" }}>
                <button
                  type="button"
                  onClick={() => setReactivateModal(null)}
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: "center", padding: "0.65rem" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReactivate}
                  className="btn btn-primary"
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    padding: "0.65rem",
                    fontWeight: 900,
                    fontSize: "0.85rem",
                    background: "#10b981",
                    borderColor: "#10b981"
                  }}
                >
                  <CheckCircle2 size={15} /> Reactivate School
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ════════════ DEDICATED MODAL: SUSPEND SCHOOL CONFIRMATION ════════════ */}
      {suspendModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 450, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 540, borderRadius: "var(--radius-lg)", border: "1px solid rgba(239, 68, 68, 0.4)" }}>
            
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ padding: "8px", borderRadius: 8, background: "rgba(239, 68, 68, 0.15)", color: "#ef4444" }}>
                  <Ban size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                    Suspend School Tenant
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>
                    Super Admin Enforcement Action
                  </p>
                </div>
              </div>
              <button onClick={() => setSuspendModal(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              
              {/* School Details Card */}
              <div style={{ background: "var(--bg-input)", padding: "1rem", borderRadius: 10, border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>School:</span>
                  <strong style={{ fontSize: "0.9rem", color: "#fff" }}>{suspendModal.school.name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Current Status:</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, padding: "2px 8px", borderRadius: 6, background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
                    {(suspendModal.school.status || "ACTIVE").toUpperCase()}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>New Status:</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 900, padding: "2px 8px", borderRadius: 6, background: "rgba(239, 68, 68, 0.2)", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.4)" }}>
                    SUSPENDED
                  </span>
                </div>
              </div>

              {/* Reason Textarea */}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>
                  REASON FOR SUSPENSION *
                </label>
                <textarea
                  value={suspendModal.reason}
                  onChange={(e) => setSuspendModal({ ...suspendModal, reason: e.target.value })}
                  placeholder="Enter mandatory reason for suspension (e.g. Non-payment of SaaS invoice, Compliance violation, Safety inquiry)..."
                  rows={3}
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    color: "#fff",
                    fontSize: "0.85rem",
                    lineHeight: 1.4
                  }}
                />
              </div>

              {/* High-Visibility Confirmation Alert */}
              <div style={{
                padding: "0.95rem 1.1rem",
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.35)",
                borderRadius: 10,
                fontSize: "0.82rem",
                color: "#fca5a5",
                lineHeight: 1.45,
                display: "flex",
                gap: "0.65rem",
                alignItems: "flex-start"
              }}>
                <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Confirmation Notice:</strong> Suspending this school will disable access for all users belonging to this school including <strong>School Admin</strong>, <strong>Teachers</strong>, <strong>Parents</strong> and <strong>Drivers</strong>.
                </div>
              </div>

              {/* Explicit Confirmation Checkbox */}
              <label style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.65rem",
                cursor: "pointer",
                padding: "0.75rem",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 8,
                border: "1px solid var(--border-color)"
              }}>
                <input
                  type="checkbox"
                  checked={suspendModal.confirmed}
                  onChange={(e) => setSuspendModal({ ...suspendModal, confirmed: e.target.checked })}
                  style={{ width: 18, height: 18, accentColor: "#ef4444", cursor: "pointer", marginTop: 2 }}
                />
                <span style={{ fontSize: "0.8rem", color: "var(--text-main)", lineHeight: 1.4 }}>
                  I explicitly confirm the immediate suspension and lockout of all tenant access for <strong style={{ color: "#fff" }}>{suspendModal.school.name}</strong>.
                </span>
              </label>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.85rem", marginTop: "0.25rem" }}>
                <button
                  type="button"
                  onClick={() => setSuspendModal(null)}
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: "center", padding: "0.65rem" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSuspend}
                  disabled={!suspendModal.confirmed || !suspendModal.reason.trim()}
                  className="btn btn-primary"
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    padding: "0.65rem",
                    fontWeight: 900,
                    fontSize: "0.85rem",
                    background: (!suspendModal.confirmed || !suspendModal.reason.trim()) ? "#7f1d1d" : "#ef4444",
                    borderColor: "#ef4444",
                    opacity: (!suspendModal.confirmed || !suspendModal.reason.trim()) ? 0.6 : 1,
                    cursor: (!suspendModal.confirmed || !suspendModal.reason.trim()) ? "not-allowed" : "pointer"
                  }}
                >
                  <Ban size={15} /> Suspend School
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ════════════ MODAL 1: CHANGE STATUS / SUSPEND DIALOG ════════════ */}
      {statusChangeModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 540, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.85rem" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Shield size={18} color="var(--primary)" /> Change Tenant Account Status
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "4px 0 0 0" }}>
                  School: <strong style={{ color: "#fff" }}>{statusChangeModal.school.name}</strong> ({statusChangeModal.school.code})
                </p>
              </div>
              <button onClick={() => setStatusChangeModal(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
              {/* TARGET STATUS SELECTOR */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>TARGET STATUS</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                  {(["ACTIVE", "TRIAL", "SUSPENDED", "EXPIRED", "DEACTIVATED", "PENDING_APPROVAL"] as const).map(st => {
                    const isSelected = statusChangeModal.targetStatus === st;
                    const b = getStatusBadgeStyle(st);
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusChangeModal({ ...statusChangeModal, targetStatus: st })}
                        style={{
                          padding: "0.6rem 0.5rem",
                          borderRadius: 8,
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          cursor: "pointer",
                          background: isSelected ? b.bg : "var(--bg-input)",
                          border: isSelected ? `2px solid ${b.color}` : "1px solid var(--border-color)",
                          color: isSelected ? b.color : "var(--text-muted)"
                        }}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* NOTICE BOX */}
              {statusChangeModal.targetStatus === "SUSPENDED" && (
                <div style={{ padding: "0.85rem", background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: 8, fontSize: "0.78rem", color: "#fca5a5", lineHeight: 1.4 }}>
                  <strong>⚠️ Immediate Effect:</strong> Suspending this school will block its School Admin portal, Teacher App, Parent App, Driver App, REST APIs, and Socket.IO connections immediately.
                </div>
              )}

              {/* REASON */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>REASON / AUDIT NOTE</label>
                <textarea
                  value={statusChangeModal.reason}
                  onChange={(e) => setStatusChangeModal({ ...statusChangeModal, reason: e.target.value })}
                  placeholder="Explain reason for status change (e.g. Non-payment, Annual audit, Trial extension)..."
                  rows={3}
                  style={{ width: "100%", padding: "0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              {/* EXPIRY DATE PICKER */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STATUS EXPIRY / RENEWAL DATE (OPTIONAL)</label>
                <input
                  type="date"
                  value={statusChangeModal.expiresAt || ""}
                  onChange={(e) => setStatusChangeModal({ ...statusChangeModal, expiresAt: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setStatusChangeModal(null)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button
                  type="button"
                  onClick={handleApplyStatusChange}
                  className="btn btn-primary"
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    fontWeight: 900,
                    background: statusChangeModal.targetStatus === "SUSPENDED" ? "#ef4444" : undefined
                  }}
                >
                  Apply Status ({statusChangeModal.targetStatus})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ MODAL 2: 360° TENANT DOSSIER ════════════ */}
      {viewingSchoolDossier && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 680, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-color)" }}>
              <div>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#fff" }}>{viewingSchoolDossier.name}</h2>
                <div style={{ fontSize: "0.82rem", color: "var(--primary)", fontWeight: 800, marginTop: 2 }}>
                  {viewingSchoolDossier.code} • {viewingSchoolDossier.city} • SCH-ID: {viewingSchoolDossier._id || viewingSchoolDossier.id}
                </div>
              </div>
              <button type="button" onClick={() => setViewingSchoolDossier(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={22} />
              </button>
            </div>

            {/* ECOSYSTEM METRICS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.65rem", marginBottom: "1.5rem" }}>
              <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border-color)", textAlign: "center" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#38bdf8" }}>{viewingSchoolDossier.studentsCount || 0}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2, fontWeight: 700 }}>Students</div>
              </div>
              <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border-color)", textAlign: "center" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#34d399" }}>{viewingSchoolDossier.teachersCount || 0}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2, fontWeight: 700 }}>Teachers</div>
              </div>
              <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border-color)", textAlign: "center" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#c084fc" }}>{viewingSchoolDossier.parentsCount || 0}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2, fontWeight: 700 }}>Parents</div>
              </div>
              <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border-color)", textAlign: "center" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#f472b6" }}>{viewingSchoolDossier.driversCount || 0}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2, fontWeight: 700 }}>Drivers</div>
              </div>
              <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border-color)", textAlign: "center" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fbbf24" }}>{viewingSchoolDossier.busesCount || 0}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2, fontWeight: 700 }}>Buses</div>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>ACCOUNT STATUS</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{viewingSchoolDossier.status}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{viewingSchoolDossier.statusReason || "Normal active status."}</div>
              </div>

              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>SUBSCRIPTION PLAN</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--success)", marginTop: 2 }}>{viewingSchoolDossier.plan} ({viewingSchoolDossier.mrr})</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>Expires: {viewingSchoolDossier.expiry}</div>
              </div>

              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>PRINCIPAL / ADMIN</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{viewingSchoolDossier.adminName}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{viewingSchoolDossier.email}</div>
              </div>

              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>TIMESTAMPS</div>
                <div style={{ fontSize: "0.75rem", color: "#fff", marginTop: 2 }}>Created: {viewingSchoolDossier.createdAt}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Last Activity: {viewingSchoolDossier.lastActivity}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ MODAL 3: IMMUTABLE STATUS HISTORY TIMELINE (STEP 31) ════════════ */}
      {viewingActivityModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 640, borderRadius: "var(--radius-lg)", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <History size={20} color="var(--primary)" /> Tenant Status History
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "4px 0 0 0" }}>
                  School: <strong style={{ color: "#fff" }}>{viewingActivityModal.name}</strong> • Code: <span style={{ color: "var(--primary)" }}>{viewingActivityModal.code}</span>
                </p>
              </div>
              <button onClick={() => setViewingActivityModal(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4 }}>
                <X size={22} />
              </button>
            </div>

            {/* IMMUTABLE NOTICE BANNER */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.75rem 1rem",
              background: "rgba(59, 130, 246, 0.08)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
              borderRadius: 8,
              fontSize: "0.75rem",
              color: "#93c5fd",
              marginBottom: "1.25rem"
            }}>
              <ShieldCheck size={18} color="#60a5fa" style={{ flexShrink: 0 }} />
              <div>
                <strong>Immutable Audit Trail:</strong> This history log is permanent, cryptographically recorded in the central database, and <strong>can never be edited, tampered with, or deleted</strong>.
              </div>
            </div>

            {/* TIMELINE LIST */}
            <div style={{ flex: 1, overflowY: "auto", paddingRight: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {loadingHistory ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  <RefreshCw size={20} className="animate-spin" style={{ margin: "0 auto 0.5rem" }} />
                  Loading immutable audit trail...
                </div>
              ) : statusHistoryLogs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  No prior status transitions found. Current status is <strong>{viewingActivityModal.status}</strong>.
                </div>
              ) : (
                statusHistoryLogs.map((log: any, index: number) => {
                  const isSuspension = log.newStatus === "SUSPENDED";
                  const isActivation = log.newStatus === "ACTIVE";
                  const isTrial = log.newStatus === "TRIAL";
                  const isExpired = log.newStatus === "EXPIRED";
                  const isDeactivated = log.newStatus === "DEACTIVATED";

                  const badgeColor = isSuspension ? "#ef4444" : isActivation ? "#10b981" : isTrial ? "#f59e0b" : isExpired ? "#f97316" : "#64748b";
                  const badgeBg = isSuspension ? "rgba(239, 68, 68, 0.15)" : isActivation ? "rgba(16, 185, 129, 0.15)" : isTrial ? "rgba(245, 158, 11, 0.15)" : "rgba(100, 116, 139, 0.15)";

                  return (
                    <React.Fragment key={log.id || index}>
                      {/* TIMELINE CARD */}
                      <div style={{
                        padding: "1rem",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--border-color)",
                        borderLeft: `4px solid ${badgeColor}`,
                        borderRadius: 8
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                          {/* STATUS TRANSITION */}
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", fontWeight: 800 }}>
                            <span style={{ padding: "0.2rem 0.5rem", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "var(--text-muted)" }}>
                              {log.previousStatus || "ACTIVE"}
                            </span>
                            <ArrowRight size={14} color="var(--text-muted)" />
                            <span style={{ padding: "0.2rem 0.55rem", borderRadius: 4, background: badgeBg, color: badgeColor, border: `1px solid ${badgeColor}33` }}>
                              {log.newStatus}
                            </span>
                          </div>

                          {/* DATE */}
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <Calendar size={12} />
                            {new Date(log.timestamp).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>

                        {/* REASON */}
                        <div style={{ fontSize: "0.8rem", color: "#e2e8f0", marginBottom: "0.4rem" }}>
                          <strong style={{ color: "var(--text-muted)" }}>Reason: </strong>
                          {log.reason || "Administrative status transition."}
                        </div>

                        {/* PERFORMED BY */}
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <Shield size={12} color="var(--primary)" />
                          By: <strong style={{ color: "#fff" }}>{log.performedBy || "Super Admin"}</strong>
                        </div>
                      </div>

                      {/* DOWNWARD CONNECTOR (↓) */}
                      {index < statusHistoryLogs.length - 1 && (
                        <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1, padding: "0.1rem 0" }}>
                          ↓
                        </div>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </div>

            {/* MODAL FOOTER */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.25rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem" }}>
              <button onClick={() => setViewingActivityModal(null)} className="btn btn-secondary" style={{ padding: "0.5rem 1.5rem" }}>
                Close History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ MODAL 4: SUBSCRIPTION & MODULES ════════════ */}
      {viewingSubscriptionModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: 580, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.85rem" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CreditCard size={18} color="var(--primary)" /> Subscription &amp; Tenant Entitlements
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "4px 0 0 0" }}>
                  {viewingSubscriptionModal.name}
                </p>
              </div>
              <button onClick={() => setViewingSubscriptionModal(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ padding: "0.75rem", background: "var(--bg-input)", borderRadius: 8 }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>PLAN LEVEL</div>
                  <strong style={{ fontSize: "0.95rem", color: "var(--primary)" }}>{viewingSubscriptionModal.plan}</strong>
                </div>
                <div style={{ padding: "0.75rem", background: "var(--bg-input)", borderRadius: 8 }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>RENEWAL / EXPIRY</div>
                  <strong style={{ fontSize: "0.95rem", color: "#fff" }}>{viewingSubscriptionModal.expiry}</strong>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", marginBottom: 6 }}>ENABLED MODULES</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {["Dashboard", "Students", "Attendance", "Exams & Marks", "Homework", "Fee Collection", "Transport GPS", "Parent App", "Teacher App", "Driver App"].map(mod => (
                    <span key={mod} style={{ padding: "4px 8px", borderRadius: 6, background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc", fontSize: "0.72rem", fontWeight: 700 }}>
                      ✓ {mod}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => setViewingSubscriptionModal(null)} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "1.25rem" }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ════════════ MODAL 5: ONBOARD NEW SCHOOL ════════════ */}
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
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SCHOOL OFFICIAL NAME *</label>
                <input 
                  type="text" 
                  value={newSchool.name}
                  onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                  placeholder="e.g. Delhi Public School (Dwarka)"
                  required
                  style={{ width: "100%", padding: "0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CBSE / TENANT CODE</label>
                  <input 
                    type="text" 
                    value={newSchool.code}
                    onChange={(e) => setNewSchool({ ...newSchool, code: e.target.value })}
                    placeholder="e.g. dps-dwr"
                    style={{ width: "100%", padding: "0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SaaS SUBSCRIPTION PLAN</label>
                  <select 
                    value={newSchool.plan}
                    onChange={(e) => setNewSchool({ ...newSchool, plan: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  >
                    {["Enterprise Pro", "Growth Plan", "Starter Plan", "Trial (14 Days)"].map(p => <option key={p} value={p} style={{ background: "#0b0f19" }}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PRINCIPAL / ADMIN NAME *</label>
                  <input 
                    type="text" 
                    value={newSchool.adminName}
                    onChange={(e) => setNewSchool({ ...newSchool, adminName: e.target.value })}
                    placeholder="e.g. Dr. Ashok Kumar"
                    required
                    style={{ width: "100%", padding: "0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CITY / LOCATION</label>
                  <input 
                    type="text" 
                    value={newSchool.city}
                    onChange={(e) => setNewSchool({ ...newSchool, city: e.target.value })}
                    placeholder="e.g. New Delhi"
                    style={{ width: "100%", padding: "0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ADMIN EMAIL ADDRESS *</label>
                  <input 
                    type="email" 
                    value={newSchool.email}
                    onChange={(e) => setNewSchool({ ...newSchool, email: e.target.value })}
                    placeholder="admin@school.edu.in"
                    required
                    style={{ width: "100%", padding: "0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>INITIAL STATUS</label>
                  <select
                    value={newSchool.status}
                    onChange={(e) => setNewSchool({ ...newSchool, status: e.target.value as SchoolStatusType })}
                    style={{ width: "100%", padding: "0.75rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  >
                    <option value="ACTIVE" style={{ background: "#0b0f19" }}>ACTIVE</option>
                    <option value="TRIAL" style={{ background: "#0b0f19" }}>TRIAL</option>
                    <option value="PENDING_APPROVAL" style={{ background: "#0b0f19" }}>PENDING APPROVAL</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.85rem", marginTop: "0.75rem" }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", fontWeight: 800 }}>Complete Onboarding</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
