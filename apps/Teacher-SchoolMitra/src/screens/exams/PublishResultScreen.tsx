import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
  Platform,
  ActivityIndicator,
  FlatList,
  Modal
} from 'react-native';
import {
  ChevronLeft,
  Send,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Lock,
  Smartphone,
  FileCheck,
  X,
  ChevronDown,
  Check,
  AlertCircle
} from 'lucide-react-native';
import { teacherApi } from '../../services/apiService';

interface AssignedClass {
  id: string;
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  subject: string;
  subjectId: string;
  totalStudents: number;
}

export default function PublishResultScreen({ route, navigation }: any) {
  const exam = route?.params?.exam || {};
  const examId = exam?._id || exam?.id || '';
  const examName = exam?.examName || 'Exam';

  const [classes, setClasses] = useState<AssignedClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<AssignedClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState('');

  // Dropdown Modal
  const [classModalVisible, setClassModalVisible] = useState(false);

  // Status metrics from API
  const [totalStudents, setTotalStudents] = useState(0);
  const [submittedToAdmin, setSubmittedToAdmin] = useState(0);
  const [approvedByAdmin, setApprovedByAdmin] = useState(0);

  const [sendPushNotification, setSendPushNotification] = useState(true);
  const [sendSMS, setSendSMS] = useState(true);
  const [publishReportPDF, setPublishReportPDF] = useState(true);
  const [lockMarksEntry, setLockMarksEntry] = useState(true);
  const [publishing, setPublishing] = useState(false);

  // Load teacher assigned classes
  const loadAssignedClasses = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res: any = await teacherApi.getClasses();
      if (res?.success && res?.data?.classes) {
        const classesList = res.data.classes || [];
        setClasses(classesList);
        if (classesList.length > 0) {
          setSelectedClass(classesList[0]);
        }
      } else {
        setClasses([]);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load assigned classes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAssignedClasses();
  }, [loadAssignedClasses]);

  // Fetch Report Cards compilation status
  const fetchStatus = useCallback(async () => {
    if (!examId || !selectedClass) return;
    setLoadingStatus(true);
    try {
      const res: any = await teacherApi.getReportCards({
        classId: selectedClass.classId,
        sectionId: selectedClass.sectionId,
        examId: examId
      } as any);

      if (res?.success && res?.data) {
        setTotalStudents(res.data.totalStudents || 0);
        setSubmittedToAdmin(res.data.submittedToAdmin || 0);
        setApprovedByAdmin(res.data.approvedByAdmin || 0);
      }
    } catch (err: any) {
      console.warn('Failed to fetch status:', err);
    } finally {
      setLoadingStatus(false);
    }
  }, [examId, selectedClass]);

  useEffect(() => {
    if (selectedClass) {
      fetchStatus();
    }
  }, [selectedClass, fetchStatus]);

  const handlePublishResults = () => {
    if (!selectedClass) return;
    Alert.alert(
      'Publish Results Confirmation 🚀',
      `Are you sure you want to request publication for ${selectedClass.className} - ${examName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Publish Now',
          onPress: doPublish
        }
      ]
    );
  };

  const doPublish = async () => {
    if (!selectedClass) return;
    setPublishing(true);
    try {
      const res: any = await teacherApi.publishReportCards({
        classId: selectedClass.classId,
        term: examName
      });
      if (res?.success !== false) {
        Alert.alert(
          'Publication Requested 📋',
          res?.message || 'Request submitted successfully. Official results publication must be authorized by School Admin.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        throw new Error(res?.message || 'Failed to publish results');
      }
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Publication request failed');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Publish Results</Text>
        <Send size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HERO BANNER */}
        <View style={styles.heroCard}>
          <Text style={styles.heroClass}>{examName}</Text>
          <Text style={styles.heroTitle}>Official Declaration & Publication Control Room</Text>
        </View>

        {/* CLASS SELECTOR */}
        <Text style={styles.dropdownLabel}>Select Class & Subject</Text>
        <TouchableOpacity style={styles.dropdownField} onPress={() => setClassModalVisible(true)}>
          <Text style={styles.dropdownVal}>
            {selectedClass ? `${selectedClass.className} (${selectedClass.sectionName}) — ${selectedClass.subject}` : 'Select Class...'}
          </Text>
          <ChevronDown size={16} color="#64748b" />
        </TouchableOpacity>

        {/* VERIFICATION CHECKLIST */}
        {selectedClass && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <ShieldCheck size={20} color="#16a34a" />
              <Text style={styles.cardTitle}>Pre-Publication Verification Checklist</Text>
            </View>

            {loadingStatus ? (
              <ActivityIndicator size="small" color="#7c3aed" style={{ padding: 12 }} />
            ) : (
              <>
                <View style={styles.checkItem}>
                  <CheckCircle2 size={16} color={submittedToAdmin === totalStudents && totalStudents > 0 ? '#16a34a' : '#cbd5e1'} />
                  <Text style={styles.checkText}>
                    Report Cards Compiled: {submittedToAdmin} / {totalStudents} Student(s)
                  </Text>
                </View>

                <View style={styles.checkItem}>
                  <CheckCircle2 size={16} color={approvedByAdmin === totalStudents && totalStudents > 0 ? '#16a34a' : '#cbd5e1'} />
                  <Text style={styles.checkText}>
                    Approved by Admin: {approvedByAdmin} / {totalStudents} Student(s)
                  </Text>
                </View>
              </>
            )}
          </View>
        )}

        {/* NOTIFICATION & PUBLISHING SETTINGS */}
        <Text style={styles.sectionHeaderTitle}>Publication Settings</Text>

        <View style={styles.card}>
          {/* PUSH NOTIFICATIONS */}
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.settingLabelRow}>
                <Bell size={16} color="#7c3aed" />
                <Text style={styles.settingTitle}>Push Notification to Parent App</Text>
              </View>
              <Text style={styles.settingSub}>Instant push alert on SchoolMitra Parent App</Text>
            </View>
            <Switch
              value={sendPushNotification}
              onValueChange={setSendPushNotification}
              trackColor={{ false: '#cbd5e1', true: '#ddd6fe' }}
              thumbColor={sendPushNotification ? '#7c3aed' : '#f1f5f9'}
            />
          </View>

          {/* SMS ALERT */}
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.settingLabelRow}>
                <Smartphone size={16} color="#2563eb" />
                <Text style={styles.settingTitle}>SMS Notification to Parents</Text>
              </View>
              <Text style={styles.settingSub}>Send text message with total percentage & CGPA</Text>
            </View>
            <Switch
              value={sendSMS}
              onValueChange={setSendSMS}
              trackColor={{ false: '#cbd5e1', true: '#bfdbfe' }}
              thumbColor={sendSMS ? '#2563eb' : '#f1f5f9'}
            />
          </View>

          {/* REPORT CARD PDF */}
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.settingLabelRow}>
                <FileCheck size={16} color="#059669" />
                <Text style={styles.settingTitle}>Publish Marksheet PDF to Student Portal</Text>
              </View>
              <Text style={styles.settingSub}>Allow parents to view & download official PDF</Text>
            </View>
            <Switch
              value={publishReportPDF}
              onValueChange={setPublishReportPDF}
              trackColor={{ false: '#cbd5e1', true: '#a7f3d0' }}
              thumbColor={publishReportPDF ? '#059669' : '#f1f5f9'}
            />
          </View>

          {/* LOCK MARKS ENTRY */}
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={{ flex: 1 }}>
              <View style={styles.settingLabelRow}>
                <Lock size={16} color="#dc2626" />
                <Text style={styles.settingTitle}>Lock Marks Entry</Text>
              </View>
              <Text style={styles.settingSub}>Freeze marks sheet to prevent unapproved edits</Text>
            </View>
            <Switch
              value={lockMarksEntry}
              onValueChange={setLockMarksEntry}
              trackColor={{ false: '#cbd5e1', true: '#fecdd3' }}
              thumbColor={lockMarksEntry ? '#dc2626' : '#f1f5f9'}
            />
          </View>
        </View>

        {/* PUBLISH ACTION BUTTON */}
        <TouchableOpacity
          style={[styles.publishBtn, publishing && styles.disabledBtn]}
          onPress={handlePublishResults}
          disabled={publishing}
        >
          {publishing ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              <Send size={20} color="#ffffff" />
              <Text style={styles.publishBtnText}>Publish Official Results Now</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* CLASSES SELECTION MODAL */}
      <Modal visible={classModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainerSelection}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Assigned Class</Text>
              <TouchableOpacity onPress={() => setClassModalVisible(false)}>
                <X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={classes}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => {
                const isSelected = selectedClass?.id === item.id;
                return (
                  <TouchableOpacity
                    style={[styles.modalItem, isSelected && styles.modalItemActive]}
                    onPress={() => {
                      setSelectedClass(item);
                      setClassModalVisible(false);
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.modalItemTitle, isSelected && styles.modalItemTextActive]}>
                        {item.className} ({item.sectionName})
                      </Text>
                      <Text style={styles.modalItemSub}>{item.subject}</Text>
                    </View>
                    {isSelected && <Check size={18} color="#7c3aed" />}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => (
                <Text style={styles.modalEmptyText}>No assigned classes found</Text>
              )}
            />
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: Platform.OS === 'android' ? 64 + (StatusBar.currentHeight || 0) : 64
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  backBtn: {
    position: 'absolute',
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: {
    backgroundColor: '#6d28d9',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16
  },
  heroClass: { fontSize: 12, fontWeight: '800', color: '#e9d5ff' },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff', marginTop: 2, marginBottom: 4 },
  dropdownLabel: { fontSize: 11, fontWeight: '800', color: '#94a3b8', marginBottom: 6 },
  dropdownField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
  },
  dropdownVal: { fontSize: 13, fontWeight: '750', color: '#0f172a' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 6 },
  checkText: { fontSize: 13, color: '#334155', fontWeight: '700' },
  sectionHeaderTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 10 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  settingLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  settingTitle: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  settingSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
  publishBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#7c3aed',
    height: 52,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 20
  },
  publishBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 15 },
  disabledBtn: { opacity: 0.6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.5)', justifyContent: 'flex-end' },
  modalContainerSelection: { backgroundColor: '#ffffff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  modalItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingHorizontal: 18 },
  modalItemActive: { backgroundColor: '#f8fafc' },
  modalItemTitle: { fontSize: 14, fontWeight: '850', color: '#0f172a' },
  modalItemSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  modalItemTextActive: { color: '#7c3aed', fontWeight: '900' },
  modalEmptyText: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginVertical: 30 }
});
