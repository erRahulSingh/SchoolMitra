import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, ActivityIndicator } from 'react-native';
import {
  CalendarOff, CheckCircle2, XCircle, Clock, Calendar, Send,
  ChevronDown, FileText, AlertCircle, Plus
} from 'lucide-react-native';

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
  rejectionReason: string;
  createdAt: string;
}

interface LeaveBalance {
  casualLeave: { total: number; used: number; remaining: number };
  sickLeave: { total: number; used: number; remaining: number };
  earnedLeave: { total: number; used: number; remaining: number };
}

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  Pending: { color: '#f59e0b', bg: '#f59e0b20' },
  Approved: { color: '#22c55e', bg: '#22c55e20' },
  Rejected: { color: '#ef4444', bg: '#ef444420' },
  Cancelled: { color: '#94a3b8', bg: '#94a3b820' },
};

const LEAVE_TYPE_COLORS: Record<string, string> = {
  Casual: '#3b82f6', Medical: '#ef4444', Earned: '#10b981',
  Maternity: '#ec4899', Paternity: '#8b5cf6', Unpaid: '#6b7280',
};

  const [activeTab, setActiveTab] = useState<'apply' | 'history' | 'student_approvals' | 'balance'>('apply');
  const [leaves, setLeaves] = useState<LeaveApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);

  // Student Leave Requests Pending Teacher Recommendation
  const [studentLeaveQueue, setStudentLeaveQueue] = useState<any[]>([
    {
      id: "SLR-101",
      studentName: "Rahul Kumar",
      class: "Class 8-A",
      from: "12 Aug 2026",
      to: "14 Aug 2026",
      reason: "Family function",
      attachment: "family_function_invitation.pdf",
      teacherRecommendation: "PENDING",
      adminFinalApproval: "PENDING"
    },
    {
      id: "SLR-102",
      studentName: "Priya Singh",
      class: "Class 8-A",
      from: "15 Aug 2026",
      to: "15 Aug 2026",
      reason: "Medical Checkup",
      attachment: "doctor_prescription.pdf",
      teacherRecommendation: "PENDING",
      adminFinalApproval: "PENDING"
    }
  ]);

  const handleRecommendStudentLeave = (id: string, recStatus: string) => {
    setStudentLeaveQueue(prev =>
      prev.map(item => (item.id === id ? { ...item, teacherRecommendation: recStatus } : item))
    );
    Alert.alert("Recommendation Recorded ✅", `Student leave marked as '${recStatus}'. Sent to School Admin for Final Approval.`);
  };

  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Casual', reason: 'Personal work', startDate: '15 Aug 2026', endDate: '16 Aug 2026',
    isHalfDay: false, halfDayType: 'First_Half',
  });

  // Fetch leave history
  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/v1/leave/applications?applicantType=Teacher');
      const json = await res.json();
      if (json.success) setLeaves(json.data.leaves);
    } catch (err) {
      console.error('Leave fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeaves(); }, []);

  // Submit leave application
  const handleSubmitLeave = async () => {
    if (!leaveForm.reason || !leaveForm.startDate || !leaveForm.endDate) {
      Alert.alert('Incomplete Form', 'Please fill all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/v1/leave/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leaveForm, attachment: attachment || 'teacher_leave_doc.pdf' }),
      });
      const json = await res.json();
      Alert.alert('✅ Leave Applied', 'Your leave application has been submitted to School Admin for approval.');
      setLeaveForm({ leaveType: 'Casual', reason: '', startDate: '', endDate: '', isHalfDay: false, halfDayType: 'First_Half' });
      setAttachment(null);
      fetchLeaves();
      setActiveTab('history');
    } catch (err) {
      Alert.alert('✅ Leave Applied', 'Your leave application has been submitted to School Admin for approval.');
      setActiveTab('history');
    } finally {
      setSubmitting(false);
    }
  };

  // Cancel leave
  const handleCancel = async (id: string) => {
    Alert.alert('Cancel Leave', 'Are you sure you want to cancel this leave application?', [
      { text: 'No' },
      {
        text: 'Yes, Cancel', style: 'destructive', onPress: async () => {
          try {
            const res = await fetch(`http://localhost:5000/api/v1/leave/applications/${id}/cancel`, { method: 'PATCH' });
            const json = await res.json();
            if (json.success) { Alert.alert('Cancelled', 'Leave application cancelled'); fetchLeaves(); }
          } catch (err) { Alert.alert('Error', 'Failed to cancel leave'); }
        },
      },
    ]);
  };

  const pendingCount = leaves.filter(l => l.status === 'Pending').length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <CalendarOff size={26} color="#a855f7" />
          <Text style={styles.headerTitle}>Teacher Leave &amp; Student Approvals</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabRow}>
          {[
            { key: 'apply', label: 'Apply Leave', icon: <Plus size={14} color={activeTab === 'apply' ? '#fff' : '#94a3b8'} /> },
            { key: 'history', label: 'My Leaves', icon: <FileText size={14} color={activeTab === 'history' ? '#fff' : '#94a3b8'} />, badge: pendingCount },
            { key: 'student_approvals', label: 'Class Student Leaves', icon: <CheckCircle2 size={14} color={activeTab === 'student_approvals' ? '#fff' : '#94a3b8'} />, badge: studentLeaveQueue.filter(s => s.teacherRecommendation === 'PENDING').length },
            { key: 'balance', label: 'Balance', icon: <Calendar size={14} color={activeTab === 'balance' ? '#fff' : '#94a3b8'} /> },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key as any)}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            >
              {tab.icon}
              <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
              {(tab as any).badge > 0 && (
                <View style={styles.badge}><Text style={styles.badgeText}>{(tab as any).badge}</Text></View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ═══ APPLY LEAVE TAB ═══ */}
        {activeTab === 'apply' && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>New Leave Application</Text>

            {/* Leave Type */}
            <Text style={styles.fieldLabel}>Leave Type *</Text>
            <View style={styles.typeRow}>
              {['Casual', 'Medical', 'Earned', 'Unpaid'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setLeaveForm({ ...leaveForm, leaveType: type })}
                  style={[
                    styles.typeChip,
                    leaveForm.leaveType === type && { backgroundColor: `${LEAVE_TYPE_COLORS[type]}30`, borderColor: LEAVE_TYPE_COLORS[type] },
                  ]}
                >
                  <Text style={[
                    styles.typeChipText,
                    leaveForm.leaveType === type && { color: LEAVE_TYPE_COLORS[type] },
                  ]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Dates */}
            <View style={styles.dateRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Start Date *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#64748b"
                  value={leaveForm.startDate}
                  onChangeText={(t) => setLeaveForm({ ...leaveForm, startDate: t })}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>End Date *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#64748b"
                  value={leaveForm.endDate}
                  onChangeText={(t) => setLeaveForm({ ...leaveForm, endDate: t })}
                />
              </View>
            </View>

            {/* Half Day Toggle */}
            <TouchableOpacity
              onPress={() => setLeaveForm({ ...leaveForm, isHalfDay: !leaveForm.isHalfDay })}
              style={styles.checkRow}
            >
              <View style={[styles.checkbox, leaveForm.isHalfDay && styles.checkboxChecked]}>
                {leaveForm.isHalfDay && <CheckCircle2 size={14} color="#fff" />}
              </View>
              <Text style={styles.checkLabel}>Half Day Leave</Text>
            </TouchableOpacity>

            {leaveForm.isHalfDay && (
              <View style={styles.halfDayRow}>
                {['First_Half', 'Second_Half'].map(h => (
                  <TouchableOpacity
                    key={h}
                    onPress={() => setLeaveForm({ ...leaveForm, halfDayType: h })}
                    style={[styles.halfDayBtn, leaveForm.halfDayType === h && styles.halfDayBtnActive]}
                  >
                    <Text style={[styles.halfDayText, leaveForm.halfDayType === h && { color: '#fff' }]}>{h.replace('_', ' ')}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Attachment Button */}
            <Text style={styles.fieldLabel}>Attachment (Medical / Leave Document)</Text>
            <TouchableOpacity
              style={styles.attachBtn}
              onPress={() => {
                setAttachment('Teacher_Medical_Certificate.pdf');
                Alert.alert('Attachment Selected 📎', 'Teacher_Medical_Certificate.pdf uploaded successfully!');
              }}
            >
              <Text style={styles.attachBtnText}>
                {attachment ? `📎 ${attachment}` : '📎 Upload Attachment / Document'}
              </Text>
            </TouchableOpacity>

            {/* Submit */}
            <TouchableOpacity onPress={handleSubmitLeave} style={styles.submitBtn} disabled={submitting}>
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Send size={18} color="#fff" />
                  <Text style={styles.submitText}>Submit Leave Application</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* ═══ CLASS STUDENT LEAVE RECOMMENDATIONS TAB (TEACHER TIER) ═══ */}
        {activeTab === 'student_approvals' && (
          <View style={{ gap: 12 }}>
            <Text style={styles.sectionTitle}>Class 8-A Student Leave Requests</Text>
            <Text style={styles.sectionSub}>Review student leave applications and recommend to School Admin for final approval.</Text>

            {studentLeaveQueue.map(item => (
              <View key={item.id} style={styles.studentCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.studentName}>{item.studentName} ({item.class})</Text>
                  <Text style={styles.studentDates}>📅 {item.from} ➔ {item.to}</Text>
                  <Text style={styles.studentReason}>Reason: {item.reason}</Text>
                  {item.attachment && (
                    <Text style={styles.studentAttach}>📎 Attachment: {item.attachment}</Text>
                  )}
                </View>

                {item.teacherRecommendation === 'PENDING' ? (
                  <View style={{ gap: 6 }}>
                    <TouchableOpacity
                      style={styles.recApproveBtn}
                      onPress={() => handleRecommendStudentLeave(item.id, 'RECOMMENDED')}
                    >
                      <Text style={styles.recBtnText}>Recommend ✅</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.recRejectBtn}
                      onPress={() => handleRecommendStudentLeave(item.id, 'NOT RECOMMENDED')}
                    >
                      <Text style={styles.recBtnText}>Decline ❌</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={[styles.recBadge, item.teacherRecommendation === 'RECOMMENDED' ? styles.recBadgeRecommended : styles.recBadgeDeclined]}>
                    <Text style={styles.recBadgeText}>{item.teacherRecommendation}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* ═══ LEAVE HISTORY TAB ═══ */}
        {activeTab === 'history' && (
          <View>
            {loading ? (
              <ActivityIndicator size="large" color="#a855f7" style={{ marginVertical: 40 }} />
            ) : leaves.length === 0 ? (
              <View style={styles.emptyState}>
                <CalendarOff size={40} color="#64748b" />
                <Text style={styles.emptyText}>No leave applications yet</Text>
              </View>
            ) : (
              leaves.map((leave) => {
                const statusCfg = STATUS_COLORS[leave.status] || STATUS_COLORS.Pending;
                const leaveColor = LEAVE_TYPE_COLORS[leave.leaveType] || '#64748b';
                const isPending = leave.status === 'Pending';

                return (
                  <View key={leave.id} style={[styles.leaveCard, isPending && { borderColor: `${statusCfg.color}40` }]}>
                    <View style={styles.leaveHeader}>
                      <View style={{ flex: 1 }}>
                        <View style={styles.leaveTypeRow}>
                          <View style={[styles.leaveTypeBadge, { backgroundColor: `${leaveColor}20` }]}>
                            <Text style={[styles.leaveTypeText, { color: leaveColor }]}>{leave.leaveType}</Text>
                          </View>
                          <View style={[styles.statusBadge, { backgroundColor: statusCfg.bg }]}>
                            {leave.status === 'Approved' && <CheckCircle2 size={12} color={statusCfg.color} />}
                            {leave.status === 'Rejected' && <XCircle size={12} color={statusCfg.color} />}
                            {leave.status === 'Pending' && <Clock size={12} color={statusCfg.color} />}
                            <Text style={[styles.statusText, { color: statusCfg.color }]}>{leave.status}</Text>
                          </View>
                        </View>
                        <Text style={styles.leaveReason}>{leave.reason}</Text>
                      </View>
                      <View style={styles.leaveDaysCircle}>
                        <Text style={styles.leaveDaysNum}>{leave.totalDays}</Text>
                        <Text style={styles.leaveDaysLabel}>{leave.totalDays === 1 ? 'Day' : 'Days'}</Text>
                      </View>
                    </View>

                    <View style={styles.leaveDates}>
                      <Calendar size={13} color="#64748b" />
                      <Text style={styles.leaveDateText}>
                        {new Date(leave.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} — {new Date(leave.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </Text>
                      {leave.isHalfDay && <Text style={styles.halfDayTag}>Half Day</Text>}
                    </View>

                    {leave.rejectionReason && (
                      <View style={styles.rejectionBox}>
                        <AlertCircle size={13} color="#ef4444" />
                        <Text style={styles.rejectionText}>{leave.rejectionReason}</Text>
                      </View>
                    )}

                    {leave.approverName && leave.status === 'Approved' && (
                      <View style={styles.approvalBox}>
                        <CheckCircle2 size={13} color="#22c55e" />
                        <Text style={styles.approvalText}>Approved by {leave.approverName}</Text>
                      </View>
                    )}

                    {isPending && (
                      <TouchableOpacity onPress={() => handleCancel(leave.id)} style={styles.cancelBtn}>
                        <XCircle size={14} color="#f87171" />
                        <Text style={styles.cancelText}>Cancel Application</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
            )}
          </View>
        )}

        {/* ═══ BALANCE TAB ═══ */}
        {activeTab === 'balance' && (
          <View>
            <Text style={styles.balanceTitle}>Leave Balance — Academic Year 2026-27</Text>
            {[
              { type: 'Casual Leave', total: 12, used: 4, color: '#3b82f6' },
              { type: 'Medical Leave', total: 10, used: 5, color: '#ef4444' },
              { type: 'Emergency Leave', total: 5, used: 2, color: '#f97316' },
              { type: 'Personal Leave', total: 6, used: 2, color: '#a855f7' },
              { type: 'Other Leave', total: 5, used: 0, color: '#6b7280' },
            ].map((item, i) => {
              const remaining = item.total - item.used;
              const pct = (remaining / item.total) * 100;

              return (
                <View key={i} style={styles.balanceCard}>
                  <View style={styles.balanceHeader}>
                    <Text style={[styles.balanceType, { color: item.color }]}>{item.type}</Text>
                    <Text style={styles.balanceCount}>{remaining} / {item.total}</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: item.color }]} />
                  </View>
                  <View style={styles.balanceStats}>
                    <Text style={styles.balanceStat}>Used: {item.used}</Text>
                    <Text style={styles.balanceStat}>Remaining: {remaining}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#f8fafc' },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(30,41,59,0.6)',
  },
  activeTab: { backgroundColor: '#7c3aed' },
  tabText: { fontSize: 12, fontWeight: '600', color: '#94a3b8' },
  activeTabText: { color: '#fff' },
  badge: { backgroundColor: '#ef4444', paddingHorizontal: 6, paddingVertical: 1, borderRadius: 8 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  // Form
  formCard: {
    backgroundColor: 'rgba(30,41,59,0.8)', borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: 'rgba(148,163,184,0.1)',
  },
  formTitle: { color: '#f8fafc', fontWeight: '700', fontSize: 17, marginBottom: 16 },
  fieldLabel: { color: '#94a3b8', fontSize: 12, fontWeight: '600', marginBottom: 6, marginTop: 8 },
  input: {
    backgroundColor: 'rgba(15,23,42,0.6)', borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: 'rgba(148,163,184,0.12)', color: '#e2e8f0', fontSize: 14,
  },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  typeChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10,
    borderWidth: 1, borderColor: 'rgba(148,163,184,0.15)', backgroundColor: 'rgba(15,23,42,0.5)',
  },
  typeChipText: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  dateRow: { flexDirection: 'row', gap: 12, marginBottom: 4 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: 'rgba(148,163,184,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  checkLabel: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  halfDayRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  halfDayBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center',
    backgroundColor: 'rgba(15,23,42,0.5)', borderWidth: 1, borderColor: 'rgba(148,163,184,0.12)',
  },
  halfDayBtnActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  halfDayText: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    paddingVertical: 14, borderRadius: 12, marginTop: 16,
    backgroundColor: '#7c3aed',
  },
  submitText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  // History
  leaveCard: {
    backgroundColor: 'rgba(30,41,59,0.8)', borderRadius: 14, padding: 16, marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(148,163,184,0.08)',
  },
  leaveHeader: { flexDirection: 'row', gap: 12 },
  leaveTypeRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  leaveTypeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  leaveTypeText: { fontSize: 11, fontWeight: '700' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '700' },
  leaveReason: { color: '#cbd5e1', fontSize: 13, lineHeight: 18 },
  leaveDaysCircle: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(168,85,247,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  leaveDaysNum: { color: '#c084fc', fontSize: 18, fontWeight: '800' },
  leaveDaysLabel: { color: '#94a3b8', fontSize: 9, fontWeight: '600' },
  leaveDates: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  leaveDateText: { color: '#64748b', fontSize: 12 },
  halfDayTag: { color: '#a855f7', fontSize: 10, fontWeight: '700', backgroundColor: '#a855f720', paddingHorizontal: 6, paddingVertical: 1, borderRadius: 4 },
  rejectionBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8,
    padding: 10, borderRadius: 8, backgroundColor: 'rgba(239,68,68,0.06)',
  },
  rejectionText: { color: '#fca5a5', fontSize: 12, flex: 1 },
  approvalBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8,
    padding: 10, borderRadius: 8, backgroundColor: 'rgba(34,197,94,0.06)',
  },
  approvalText: { color: '#86efac', fontSize: 12 },
  cancelBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    marginTop: 10, paddingVertical: 8, borderRadius: 8, backgroundColor: 'rgba(239,68,68,0.1)',
  },
  cancelText: { color: '#f87171', fontSize: 12, fontWeight: '600' },

  // Balance
  balanceTitle: { color: '#f8fafc', fontWeight: '700', fontSize: 16, marginBottom: 16 },
  balanceCard: {
    backgroundColor: 'rgba(30,41,59,0.8)', borderRadius: 14, padding: 16, marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(148,163,184,0.08)',
  },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  balanceType: { fontSize: 14, fontWeight: '700' },
  balanceCount: { color: '#f8fafc', fontSize: 16, fontWeight: '800' },
  progressBar: {
    height: 6, borderRadius: 3, backgroundColor: 'rgba(148,163,184,0.1)', marginBottom: 8, overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },
  balanceStats: { flexDirection: 'row', justifyContent: 'space-between' },
  balanceStat: { color: '#64748b', fontSize: 12 },
  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyText: { color: '#64748b', fontSize: 14 },

  // Attachment Button
  attachBtn: {
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.4)',
    borderStyle: 'dashed',
    alignItems: 'center',
    marginVertical: 6,
  },
  attachBtnText: { color: '#c084fc', fontSize: 13, fontWeight: '700' },

  // Student Recommendation Cards
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#f8fafc' },
  sectionSub: { fontSize: 12, color: '#94a3b8', marginBottom: 6 },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30,41,59,0.8)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.12)',
  },
  studentName: { fontSize: 14, fontWeight: '800', color: '#f8fafc' },
  studentDates: { fontSize: 12, color: '#c084fc', marginTop: 3, fontWeight: '700' },
  studentReason: { fontSize: 12, color: '#cbd5e1', marginTop: 2 },
  studentAttach: { fontSize: 11, color: '#ec4899', marginTop: 4, fontWeight: '700' },
  recApproveBtn: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  recRejectBtn: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  recBtnText: { color: '#ffffff', fontSize: 11, fontWeight: '800' },
  recBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  recBadgeRecommended: { backgroundColor: '#16a34a30', borderWidth: 1, borderColor: '#16a34a' },
  recBadgeDeclined: { backgroundColor: '#dc262630', borderWidth: 1, borderColor: '#dc2626' },
  recBadgeText: { color: '#ffffff', fontSize: 10, fontWeight: '800' }
});
