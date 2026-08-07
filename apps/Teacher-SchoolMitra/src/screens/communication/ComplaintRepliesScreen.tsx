import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  Alert,
  StatusBar
} from 'react-native';
import {
  ChevronLeft,
  AlertCircle,
  MessageSquare,
  CheckCircle2,
  Send,
  X,
  User,
  Clock,
  Sparkles
} from 'lucide-react-native';

export default function ComplaintRepliesScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [replyText, setReplyText] = useState('');

  const [complaints, setComplaints] = useState([
    {
      id: 'cmp_1',
      studentName: 'Rohan Verma',
      parentName: 'Mr. Suresh Verma',
      class: 'Class 8-A',
      category: 'Academics',
      date: '06 Aug 2026',
      status: 'Pending',
      issueText: 'Rohan is struggling with polynomial factoring concepts in homework #3. Requesting additional guidance or practice sheets.',
      educatorReply: ''
    },
    {
      id: 'cmp_2',
      studentName: 'Ananya Sharma',
      parentName: 'Mrs. Sunita Sharma',
      class: 'Class 8-A',
      category: 'Discipline',
      date: '04 Aug 2026',
      status: 'Resolved',
      issueText: 'Discrepancy in attendance marked for Monday 03 Aug when Ananya was present.',
      educatorReply: 'Attendance corrected in portal after verifying morning register. Apologies for the error!'
    }
  ]);

  const filteredComplaints = complaints.filter((c) => {
    if (activeTab === 'Pending') return c.status === 'Pending';
    if (activeTab === 'Resolved') return c.status === 'Resolved';
    return true;
  });

  const openReplyModal = (cmp: any) => {
    setSelectedComplaint(cmp);
    setReplyText(cmp.educatorReply || 'Dear Parent, thank you for reaching out. ');
    setIsReplyModalVisible(true);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedComplaint) return;

    setComplaints(
      complaints.map((c) =>
        c.id === selectedComplaint.id
          ? { ...c, status: 'Resolved', educatorReply: replyText }
          : c
      )
    );

    setIsReplyModalVisible(false);
    Alert.alert(
      'Reply Sent & Resolved ✅',
      `Your reply has been sent to ${selectedComplaint.parentName}. Complaint marked as resolved.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grievances & Inquiries</Text>
        <AlertCircle size={22} color="#7c3aed" />
      </View>

      {/* TABS */}
      <View style={styles.tabsRow}>
        {['Pending', 'Resolved', 'All'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab} (
              {
                tab === 'All'
                  ? complaints.length
                  : complaints.filter((c) => c.status === tab).length
              }
              )
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredComplaints.length === 0 ? (
          <View style={styles.emptyState}>
            <CheckCircle2 size={48} color="#cbd5e1" />
            <Text style={styles.emptyTitle}>No Complaints Found</Text>
            <Text style={styles.emptySub}>All parent inquiries in this category have been addressed.</Text>
          </View>
        ) : (
          filteredComplaints.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.catBadge}>
                  <Text style={styles.catBadgeText}>{item.category}</Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    item.status === 'Resolved' ? styles.resolvedBadge : styles.pendingBadge
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      item.status === 'Resolved' ? styles.resolvedText : styles.pendingText
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.parentName}>{item.parentName}</Text>
              <Text style={styles.studentSub}>Student: {item.studentName} ({item.class}) • {item.date}</Text>

              <Text style={styles.issueText}>{item.issueText}</Text>

              {item.educatorReply ? (
                <View style={styles.replyBox}>
                  <Text style={styles.replyTitle}>Educator Response:</Text>
                  <Text style={styles.replyContent}>{item.educatorReply}</Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={[styles.actionBtn, item.status === 'Resolved' && styles.resolvedBtn]}
                onPress={() => openReplyModal(item)}
              >
                <MessageSquare size={16} color={item.status === 'Resolved' ? '#7c3aed' : '#ffffff'} />
                <Text style={[styles.actionBtnText, item.status === 'Resolved' && styles.resolvedBtnText]}>
                  {item.status === 'Resolved' ? 'Edit Response' : 'Reply & Resolve'}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* REPLY MODAL */}
      <Modal visible={isReplyModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Reply to Parent Inquiry</Text>
                <Text style={styles.modalSub}>{selectedComplaint?.parentName} ({selectedComplaint?.studentName})</Text>
              </View>
              <TouchableOpacity onPress={() => setIsReplyModalVisible(false)}>
                <X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <Text style={styles.label}>Parent Grievance Statement</Text>
              <View style={styles.complaintSummaryBox}>
                <Text style={styles.complaintSummaryText}>{selectedComplaint?.issueText}</Text>
              </View>

              <Text style={styles.label}>Educator Official Reply *</Text>
              <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                placeholder="Write resolution steps, guidance, or clarifications for the parent..."
                placeholderTextColor="#94a3b8"
                value={replyText}
                onChangeText={setReplyText}
              />

              <TouchableOpacity style={styles.sendReplyBtn} onPress={handleSendReply}>
                <Send size={18} color="#ffffff" />
                <Text style={styles.sendReplyBtnText}>Send Reply & Mark Resolved</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justify: 'center',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#ffffff'
  },
  tabItem: { paddingVertical: 12, marginRight: 20, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabItemActive: { borderBottomColor: '#7c3aed' },
  tabText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  tabTextActive: { color: '#7c3aed' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 60, paddingHorizontal: 20 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginTop: 12 },
  emptySub: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 4 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  catBadge: { backgroundColor: '#f3e8ff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  catBadgeText: { fontSize: 11, fontWeight: '800', color: '#7c3aed' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  resolvedBadge: { backgroundColor: '#dcfce7' },
  pendingBadge: { backgroundColor: '#fef3c7' },
  statusText: { fontSize: 11, fontWeight: '800' },
  resolvedText: { color: '#166534' },
  pendingText: { color: '#92400e' },
  parentName: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  studentSub: { fontSize: 12, color: '#64748b', marginTop: 2, marginBottom: 10 },
  issueText: { fontSize: 13, color: '#334155', lineHeight: 18, marginBottom: 12 },
  replyBox: { backgroundColor: '#f8fafc', borderRadius: 10, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  replyTitle: { fontSize: 11, fontWeight: '800', color: '#7c3aed', marginBottom: 2 },
  replyContent: { fontSize: 12, color: '#334155', lineHeight: 16 },
  actionBtn: {
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#7c3aed',
    height: 42,
    borderRadius: 12
  },
  resolvedBtn: { backgroundColor: '#f3e8ff' },
  actionBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 13 },
  resolvedBtnText: { color: '#7c3aed' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#ffffff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  modalTitle: { fontSize: 17, fontWeight: '800', color: '#0f172a' },
  modalSub: { fontSize: 12, color: '#64748b' },
  modalBody: { padding: 20 },
  label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 6, marginTop: 10 },
  complaintSummaryBox: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  complaintSummaryText: { fontSize: 13, color: '#475569', lineHeight: 18 },
  input: { backgroundColor: '#f8fafc', borderWidth: 1.5, borderColor: '#cbd5e1', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: '#0f172a', height: 90, textAlignVertical: 'top' },
  sendReplyBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#7c3aed', height: 48, borderRadius: 12, marginTop: 20 },
  sendReplyBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 14 }
});
