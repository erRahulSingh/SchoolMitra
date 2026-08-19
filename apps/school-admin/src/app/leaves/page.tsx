"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarOff, CheckCircle2, XCircle, Clock, Search, Filter,
  User, Users, Calendar, FileText, Send, AlertCircle, Eye,
  Sparkles, BarChart3, TrendingUp, Shield, GraduationCap, Briefcase
} from "lucide-react";

interface LeaveApplication {
  id: string;
  applicantName: string;
  applicantType: string;
  leaveType: string;
  reason: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  isHalfDay: boolean;
  halfDayType: string;
  status: string;
  approverName: string;
  approvedAt: string;
  rejectionReason: string;
  createdAt: string;
}

interface LeaveSummary {
  pending: number;
  approved: number;
  rejected: number;
  teacherLeaves: number;
  studentLeaves: number;
}

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", icon: <Clock size={14} /> },
  Approved: { color: "#22c55e", bg: "rgba(34,197,94,0.15)", icon: <CheckCircle2 size={14} /> },
  Rejected: { color: "#ef4444", bg: "rgba(239,68,68,0.15)", icon: <XCircle size={14} /> },
  Cancelled: { color: "#94a3b8", bg: "rgba(148,163,184,0.15)", icon: <CalendarOff size={14} /> },
};

const LEAVE_TYPE_COLORS: Record<string, string> = {
  Casual: "#3b82f6",
  Medical: "#ef4444",
  Earned: "#10b981",
  Maternity: "#ec4899",
  Paternity: "#8b5cf6",
  Unpaid: "#6b7280",
  Family_Emergency: "#f97316",
  Personal: "#06b6d4",
  Religious: "#a855f7",
  Other: "#64748b",
};

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<LeaveApplication[]>([]);
  const [summary, setSummary] = useState<LeaveSummary>({ pending: 0, approved: 0, rejected: 0, teacherLeaves: 0, studentLeaves: 0 });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "all" | "teacher" | "student">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [rejectModalId, setRejectModalId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [viewingLeave, setViewingLeave] = useState<LeaveApplication | null>(null);

  // Fetch leave applications
  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab === "pending") params.set("status", "Pending");
      if (activeTab === "teacher") params.set("applicantType", "Teacher");
      if (activeTab === "student") params.set("applicantType", "Student");
      if (typeFilter !== "All") params.set("type", typeFilter);

      const res = await fetch(`http://localhost:5000/api/v1/leave/applications?${params}`);
      const json = await res.json();
      if (json.success) {
        setLeaves(json.data.leaves);
        setSummary(json.data.summary);
      }
    } catch (err) {
      console.error("Leaves fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeaves(); }, [activeTab, typeFilter]);

  // Approve leave
  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/leave/applications/${id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json.success) { alert("Leave approved! Notification sent to applicant."); fetchLeaves(); }
    } catch (err) { alert("Error approving leave"); }
  };

  // Reject leave
  const handleReject = async () => {
    if (!rejectModalId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/v1/leave/applications/${rejectModalId}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejectionReason: rejectionReason || "Not approved by administration" }),
      });
      const json = await res.json();
      if (json.success) {
        alert("Leave rejected. Notification sent to applicant.");
        setRejectModalId(null);
        setRejectionReason("");
        fetchLeaves();
      }
    } catch (err) { alert("Error rejecting leave"); }
  };

  // Filter by search
  const filteredLeaves = leaves.filter(l =>
    !searchQuery || l.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#f8fafc", display: "flex", alignItems: "center", gap: "12px" }}>
            <CalendarOff size={32} color="#a855f7" />
            Leave Management
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "4px", fontSize: "14px" }}>
            Review, approve, and manage leave applications
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Pending", value: summary.pending, icon: <Clock size={22} />, color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
          { label: "Approved", value: summary.approved, icon: <CheckCircle2 size={22} />, color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
          { label: "Rejected", value: summary.rejected, icon: <XCircle size={22} />, color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
          { label: "Teacher Leaves", value: summary.teacherLeaves, icon: <Briefcase size={22} />, color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
          { label: "Student Leaves", value: summary.studentLeaves, icon: <GraduationCap size={22} />, color: "#a855f7", bg: "rgba(168,85,247,0.15)" },
        ].map((stat, i) => (
          <div key={i} style={{
            background: "rgba(30,41,59,0.8)", borderRadius: "16px", padding: "18px",
            border: "1px solid rgba(148,163,184,0.1)", backdropFilter: "blur(8px)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "4px" }}>{stat.label}</p>
                <p style={{ color: "#f8fafc", fontSize: "26px", fontWeight: 800 }}>{stat.value}</p>
              </div>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {[
          { key: "pending", label: "Pending Approval", icon: <Clock size={15} />, badge: summary.pending },
          { key: "all", label: "All Leaves", icon: <CalendarOff size={15} /> },
          { key: "teacher", label: "Teacher Leaves", icon: <Briefcase size={15} /> },
          { key: "student", label: "Student Leaves", icon: <GraduationCap size={15} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px",
              borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "13px",
              background: activeTab === tab.key ? "linear-gradient(135deg, #a855f7, #7c3aed)" : "rgba(30,41,59,0.6)",
              color: activeTab === tab.key ? "#fff" : "#94a3b8",
              transition: "all 0.2s ease", position: "relative",
            }}
          >
            {tab.icon} {tab.label}
            {(tab as any).badge > 0 && (
              <span style={{
                padding: "1px 7px", borderRadius: "10px", fontSize: "11px", fontWeight: 700,
                background: "rgba(239,68,68,0.8)", color: "#fff", marginLeft: "4px",
              }}>
                {(tab as any).badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
          <input
            placeholder="Search by name or reason..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px 10px 38px", borderRadius: "10px",
              background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.15)",
              color: "#e2e8f0", fontSize: "13px", outline: "none",
            }}
          />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.15)", color: "#e2e8f0", fontSize: "13px", cursor: "pointer", outline: "none" }}>
          <option value="All">All Leave Types</option>
          {Object.keys(LEAVE_TYPE_COLORS).map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
        </select>
      </div>

      {/* Leave Applications List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          <Sparkles size={40} style={{ opacity: 0.3, marginBottom: "12px" }} />
          <p>Loading leave applications...</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredLeaves.map((leave) => {
            const statusCfg = STATUS_CONFIG[leave.status] || STATUS_CONFIG.Pending;
            const leaveColor = LEAVE_TYPE_COLORS[leave.leaveType] || "#64748b";
            const isPending = leave.status === "Pending";
            const isTeacher = leave.applicantType === "Teacher";

            return (
              <div key={leave.id} style={{
                background: "rgba(30,41,59,0.8)", borderRadius: "16px", padding: "20px",
                border: isPending ? `1px solid ${statusCfg.color}30` : "1px solid rgba(148,163,184,0.08)",
                backdropFilter: "blur(8px)", transition: "all 0.2s ease",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  {/* Left - Applicant Info */}
                  <div style={{ display: "flex", gap: "14px", flex: 1 }}>
                    <div style={{
                      width: "46px", height: "46px", borderRadius: "12px",
                      background: isTeacher ? "rgba(59,130,246,0.15)" : "rgba(168,85,247,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: isTeacher ? "#60a5fa" : "#c084fc",
                      flexShrink: 0,
                    }}>
                      {isTeacher ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <h3 style={{ color: "#f8fafc", fontWeight: 700, fontSize: "15px" }}>{leave.applicantName}</h3>
                        <span style={{
                          padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600,
                          background: isTeacher ? "rgba(59,130,246,0.12)" : "rgba(168,85,247,0.12)",
                          color: isTeacher ? "#60a5fa" : "#c084fc",
                        }}>
                          {leave.applicantType}
                        </span>
                        <span style={{
                          padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600,
                          background: `${leaveColor}20`, color: leaveColor,
                        }}>
                          {leave.leaveType.replace(/_/g, " ")}
                        </span>
                      </div>

                      <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "8px", lineHeight: "1.4" }}>
                        {leave.reason}
                      </p>

                      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#64748b" }}>
                          <Calendar size={13} color="#60a5fa" />
                          {new Date(leave.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          {" — "}
                          {new Date(leave.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#64748b" }}>
                          <Clock size={13} color="#f59e0b" />
                          {leave.totalDays} {leave.totalDays === 1 ? "Day" : "Days"}
                          {leave.isHalfDay && ` (${leave.halfDayType?.replace(/_/g, " ")})`}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#64748b" }}>
                          <FileText size={13} color="#94a3b8" />
                          Applied {new Date(leave.createdAt).toLocaleDateString("en-IN")}
                        </span>
                      </div>

                      {/* Rejection reason */}
                      {leave.rejectionReason && (
                        <div style={{ marginTop: "8px", padding: "8px 12px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", gap: "8px" }}>
                          <AlertCircle size={14} color="#ef4444" />
                          <span style={{ color: "#fca5a5", fontSize: "12px" }}>Rejected: {leave.rejectionReason}</span>
                        </div>
                      )}

                      {/* Approval info */}
                      {leave.approverName && leave.status === "Approved" && (
                        <div style={{ marginTop: "8px", padding: "8px 12px", borderRadius: "8px", background: "rgba(34,197,94,0.08)", display: "flex", alignItems: "center", gap: "8px" }}>
                          <CheckCircle2 size={14} color="#22c55e" />
                          <span style={{ color: "#86efac", fontSize: "12px" }}>Approved by {leave.approverName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right - Status & Actions */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px", minWidth: "140px" }}>
                    <span style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "5px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 700,
                      background: statusCfg.bg, color: statusCfg.color,
                    }}>
                      {statusCfg.icon} {leave.status}
                    </span>

                    {isPending && (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => handleApprove(leave.id)}
                          style={{
                            display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px",
                            borderRadius: "8px", border: "none", cursor: "pointer",
                            background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff",
                            fontSize: "12px", fontWeight: 700,
                          }}
                        >
                          <CheckCircle2 size={14} /> Approve
                        </button>
                        <button
                          onClick={() => { setRejectModalId(leave.id); setRejectionReason(""); }}
                          style={{
                            display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px",
                            borderRadius: "8px", border: "none", cursor: "pointer",
                            background: "rgba(239,68,68,0.15)", color: "#f87171",
                            fontSize: "12px", fontWeight: 700,
                          }}
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredLeaves.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
          <CalendarOff size={48} style={{ opacity: 0.2, marginBottom: "16px" }} />
          <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>No leave applications found</p>
          <p style={{ fontSize: "13px" }}>
            {activeTab === "pending" ? "All caught up! No pending approvals." : "No applications match the current filters."}
          </p>
        </div>
      )}

      {/* ═══ REJECTION REASON MODAL ═══ */}
      {rejectModalId && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        }}>
          <div style={{
            background: "#1e293b", borderRadius: "20px", padding: "28px",
            width: "440px", maxWidth: "90vw", border: "1px solid rgba(148,163,184,0.15)",
          }}>
            <h3 style={{ color: "#f8fafc", fontWeight: 700, fontSize: "18px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <XCircle size={22} color="#ef4444" /> Reject Leave Application
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                Reason for Rejection
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
                placeholder="Enter reason for rejecting this leave..."
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: "10px",
                  background: "rgba(15,23,42,0.6)", border: "1px solid rgba(148,163,184,0.15)",
                  color: "#e2e8f0", fontSize: "13px", outline: "none", resize: "vertical",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => { setRejectModalId(null); setRejectionReason(""); }}
                style={{
                  flex: 1, padding: "10px", borderRadius: "10px", border: "none", cursor: "pointer",
                  background: "rgba(148,163,184,0.15)", color: "#94a3b8", fontWeight: 600, fontSize: "13px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                style={{
                  flex: 1, padding: "10px", borderRadius: "10px", border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff",
                  fontWeight: 700, fontSize: "13px",
                }}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
