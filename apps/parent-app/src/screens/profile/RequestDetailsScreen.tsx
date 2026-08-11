import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, StatusBar, Alert } from 'react-native';
import { ChevronLeft, CreditCard, Download, Building2, Smile, Send } from 'lucide-react-native';

export default function RequestDetailsScreen({ route, navigation }: any) {
  const { requestId = '#SR1234', title = 'ID Card Issue', status = 'Open' } = route.params || {};
  const [replyText, setReplyText] = useState('');

  const handleSend = () => {
    if (!replyText.trim()) return;
    Alert.alert('Message Sent', 'Your reply has been sent to School Admin.');
    setReplyText('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Details</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Request Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconSquare}>
              <CreditCard size={20} color="#7c3aed" />
            </View>
            <View style={styles.headerTextCol}>
              <Text style={styles.requestTitleText}>{title}</Text>
              <Text style={styles.requestIdText}>Request ID: {requestId}</Text>
            </View>
            <View style={styles.statusBadgeOpen}>
              <Text style={styles.statusTextOpen}>{status}</Text>
            </View>
          </View>

          <View style={styles.dividerLine} />

          <View style={styles.metaRow}>
            <Text style={styles.metaLabelText}>Raised On</Text>
            <Text style={styles.metaValText}>12 May 2025, 10:30 AM</Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabelText}>Category</Text>
            <Text style={styles.metaValText}>ID Card</Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabelText}>Description</Text>
            <Text style={styles.metaValTextDesc}>My child's ID card is lost. Please help to issue a new one.</Text>
          </View>

          {/* Attachments Card */}
          <Text style={styles.attachmentsLabel}>Attachments</Text>
          <View style={styles.attachmentBox}>
            <View style={styles.pdfIconCircle}>
              <Text style={styles.pdfIconText}>PDF</Text>
            </View>
            <View style={styles.pdfTextCol}>
              <Text style={styles.pdfNameText}>IMG_20250512_1030.pdf</Text>
              <Text style={styles.pdfSizeText}>1.2 MB</Text>
            </View>
            <TouchableOpacity style={styles.dlBtn}>
              <Download size={18} color="#2563eb" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Conversation Section */}
        <Text style={styles.sectionTitle}>Conversation</Text>
        <View style={styles.msgCard}>
          <View style={styles.msgHeaderRow}>
            <View style={styles.adminAvatar}>
              <Building2 size={16} color="#16a34a" />
            </View>
            <Text style={styles.adminNameText}>School Admin</Text>
            <Text style={styles.msgTimeText}>12 May 2025, 11:00 AM</Text>
          </View>
          <Text style={styles.msgBodyText}>
            Dear Parent, we have received your request. We will get back to you soon.
          </Text>
        </View>

      </ScrollView>

      {/* Bottom Reply Bar */}
      <View style={styles.bottomReplyBar}>
        <TouchableOpacity style={styles.smileBtn}>
          <Smile size={22} color="#94a3b8" />
        </TouchableOpacity>

        <TextInput
          style={styles.replyInput}
          placeholder="Type your message..."
          placeholderTextColor="#94a3b8"
          value={replyText}
          onChangeText={setReplyText}
        />

        <TouchableOpacity style={styles.sendCircleBtn} onPress={handleSend} activeOpacity={0.85}>
          <Send size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 120 },

  // Details Card
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconSquare: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#f3e8ff', alignItems: 'center', justifyContent: 'center' },
  headerTextCol: { flex: 1 },
  requestTitleText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  requestIdText: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 2 },
  statusBadgeOpen: { backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusTextOpen: { fontSize: 11, fontWeight: '800', color: '#16a34a' },

  dividerLine: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 14 },
  metaRow: { flexDirection: 'row', marginVertical: 4 },
  metaLabelText: { width: 100, fontSize: 12, fontWeight: '700', color: '#64748b' },
  metaValText: { fontSize: 12, fontWeight: '800', color: '#0f172a' },
  metaValTextDesc: { flex: 1, fontSize: 12, fontWeight: '500', color: '#334155', lineHeight: 18 },

  attachmentsLabel: { fontSize: 12, fontWeight: '700', color: '#64748b', marginTop: 14, marginBottom: 8 },
  attachmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    gap: 12,
  },
  pdfIconCircle: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center' },
  pdfIconText: { fontSize: 10, fontWeight: '900', color: '#1d4ed8' },
  pdfTextCol: { flex: 1 },
  pdfNameText: { fontSize: 12, fontWeight: '800', color: '#0f172a' },
  pdfSizeText: { fontSize: 10, color: '#64748b', fontWeight: '500', marginTop: 2 },
  dlBtn: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },

  // Conversation Section
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  msgCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  msgHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  adminAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#dcfce7', alignItems: 'center', justifyContent: 'center' },
  adminNameText: { fontSize: 13, fontWeight: '900', color: '#0f172a', flex: 1 },
  msgTimeText: { fontSize: 10, color: '#94a3b8', fontWeight: '500' },
  msgBodyText: { fontSize: 12, color: '#475569', lineHeight: 18, fontWeight: '500' },

  // Bottom Reply Bar
  bottomReplyBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  smileBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  replyInput: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    fontSize: 13,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sendCircleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
