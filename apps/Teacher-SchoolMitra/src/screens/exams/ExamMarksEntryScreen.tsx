import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
  RefreshControl,
  Modal,
  FlatList
} from 'react-native';
import {
  ChevronLeft,
  ChevronDown,
  FileText,
  User,
  ClipboardList,
  AlertCircle,
  X,
  Check
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

interface StudentMark {
  _id: string;
  studentId: string;
  name: string;
  rollNo: string;
  marks: string;
  maxMarks: number;
  grade?: string;
  remarks?: string;
}

export default function ExamMarksEntryScreen({ route, navigation }: any) {
  const exam = route?.params?.exam || {};
  const examId = exam?._id || exam?.id || '';
  const examName = exam?.examName || 'Exam';

  const [activeTab, setActiveTab] = useState('Mark Entry');
  const [classes, setClasses] = useState<AssignedClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<AssignedClass | null>(null);
  const [students, setStudents] = useState<StudentMark[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  
  // Dropdown Modal states
  const [classModalVisible, setClassModalVisible] = useState(false);
  const [maxMarks, setMaxMarks] = useState(100);

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

  // Load roster once class selector changes
  const fetchRoster = useCallback(async () => {
    if (!examId || !selectedClass) return;
    setLoadingRoster(true);
    try {
      const res: any = await teacherApi.getExamStudents(
        examId,
        selectedClass.classId,
        selectedClass.sectionId,
        selectedClass.subjectId
      );
      if (res?.success && res?.data) {
        const roster = res.data.studentsMarksRoster || res.data.students || [];
        setMaxMarks(res.data.maximumMarks || 100);
        
        const mapped = roster.map((s: any, idx: number) => ({
          _id: s.studentId || `st_${idx}`,
          studentId: s.studentId || `st_${idx}`,
          name: s.name || `Student ${idx + 1}`,
          rollNo: s.rollNo || `Roll ${idx + 1}`,
          marks: s.obtainedMarks !== null && s.obtainedMarks !== undefined ? String(s.obtainedMarks) : '',
          maxMarks: s.maximumMarks || res.data.maximumMarks || 100,
          grade: s.grade || '',
          remarks: s.remarks || ''
        }));
        setStudents(mapped);
      } else {
        setStudents([]);
      }
    } catch (err: any) {
      Alert.alert('Roster Error', err?.message || 'Failed to load marks roster');
    } finally {
      setLoadingRoster(false);
      setRefreshing(false);
    }
  }, [examId, selectedClass]);

  useEffect(() => {
    if (selectedClass) {
      fetchRoster();
    }
  }, [selectedClass, fetchRoster]);

  const onRefresh = () => {
    setRefreshing(true);
    if (selectedClass) {
      fetchRoster();
    } else {
      loadAssignedClasses();
    }
  };

  const updateMarks = (id: string, val: string) => {
    setStudents(prev =>
      prev.map(s => (s._id === id ? { ...s, marks: val } : s))
    );
  };

  const validateMarks = (): boolean => {
    for (const s of students) {
      if (s.marks === '') continue;
      const numMarks = Number(s.marks);
      if (isNaN(numMarks) || numMarks < 0 || numMarks > maxMarks) {
        Alert.alert('Validation Error ❌', `${s.name}: Marks must be between 0 and ${maxMarks}`);
        return false;
      }
    }
    return true;
  };

  const handleSaveMarks = async (status: 'DRAFT' | 'SUBMITTED') => {
    if (!selectedClass) return;
    if (!validateMarks()) return;

    setSaving(true);
    try {
      const marksPayload = students
        .filter(s => s.marks !== '')
        .map(s => ({
          studentId: s.studentId,
          obtainedMarks: Number(s.marks),
          maxMarks: maxMarks,
          grade: s.grade || '',
          remarks: s.remarks || ''
        }));

      const payload = {
        classId: selectedClass.classId,
        sectionId: selectedClass.sectionId,
        subjectId: selectedClass.subjectId,
        status: status,
        marksRoster: marksPayload
      };

      const res: any = await teacherApi.saveExamMarks(examId, payload);
      if (res?.success !== false) {
        Alert.alert(
          status === 'SUBMITTED' ? 'Marks Submitted 🎉' : 'Draft Saved ✅',
          status === 'SUBMITTED' 
            ? `Marks roster for ${selectedClass.className} - ${selectedClass.subject} has been submitted for approval.`
            : `Marks roster for ${selectedClass.className} - ${selectedClass.subject} saved as draft.`
        );
        fetchRoster();
      } else {
        throw new Error(res?.message || 'Failed to update marks');
      }
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Server returned an error');
    } finally {
      setSaving(false);
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
        <Text style={styles.headerTitle}>Exam & Marks</Text>
        <TouchableOpacity style={styles.sheetBtn} onPress={() => {
          if (examId) navigation.navigate('GradeSheet', { exam });
        }}>
          <FileText size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#7c3aed']} />}
      >
        {/* HERO CARD */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Create exams,</Text>
            <Text style={styles.heroTitle}>enter marks and analyze</Text>
            <Text style={styles.heroTitleSub}>student performance.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <ClipboardList size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TABS ROW */}
        <View style={styles.tabRow}>
          {['Upcoming Exams', 'Mark Entry', 'Results'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
              onPress={() => {
                setActiveTab(tab);
                if (tab === 'Upcoming Exams') navigation.navigate('ExamSchedule');
                if (tab === 'Results') navigation.navigate('ExamReport', { exam });
              }}
            >
              <Text style={[styles.tabItemText, activeTab === tab && styles.tabItemTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* EXAM FIELD */}
        <Text style={styles.dropdownLabel}>Selected Exam</Text>
        <View style={styles.readOnlyField}>
          <Text style={styles.dropdownVal}>{examName}</Text>
        </View>

        {/* DYNAMIC CLASS SELECTOR DROPDOWN */}
        <Text style={styles.dropdownLabel}>Select Assigned Class & Subject</Text>
        <TouchableOpacity style={styles.dropdownField} onPress={() => setClassModalVisible(true)}>
          <Text style={styles.dropdownVal}>
            {selectedClass ? `${selectedClass.className} (${selectedClass.sectionName}) — ${selectedClass.subject}` : 'Select Class...'}
          </Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* ROSTER HEADER */}
        {selectedClass && !loadingRoster && (
          <View style={styles.listHeaderRow}>
            <Text style={styles.sectionTitle}>Student Marks Roster</Text>
            <Text style={styles.totalMarksLabel}>Max Marks: {maxMarks}</Text>
          </View>
        )}

        {/* ROSTER SECTION */}
        {loadingRoster ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#7c3aed" />
            <Text style={styles.loadingText}>Fetching roster...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <AlertCircle size={40} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={loadAssignedClasses}>
              <Text style={styles.retryBtnText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : students.length === 0 ? (
          <View style={styles.centerContainer}>
            <User size={40} color="#94a3b8" />
            <Text style={styles.emptyText}>No students in this class section</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {students.map((s) => {
              const numMarks = Number(s.marks);
              const isInvalid = s.marks !== '' && (isNaN(numMarks) || numMarks < 0 || numMarks > maxMarks);
              return (
                <View key={s._id} style={[styles.studentCard, isInvalid && styles.studentCardError]}>
                  <View style={styles.avatarCircle}>
                    <User size={18} color="#7c3aed" />
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.studentName}>{s.name}</Text>
                    <Text style={styles.studentRoll}>Roll: {s.rollNo}</Text>
                    {s.grade ? <Text style={styles.gradeLabel}>Grade: {s.grade}</Text> : null}
                  </View>

                  <View style={styles.marksInputContainer}>
                    <TextInput
                      style={[styles.marksInput, isInvalid && styles.marksInputError]}
                      keyboardType="numeric"
                      value={s.marks}
                      onChangeText={(val) => updateMarks(s._id, val)}
                      placeholder="—"
                      placeholderTextColor="#94a3b8"
                      maxLength={4}
                    />
                    <Text style={styles.outOfLabel}>/ {maxMarks}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      {selectedClass && students.length > 0 && !loadingRoster && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.draftBtn, saving && styles.disabledBtn]}
            onPress={() => handleSaveMarks('DRAFT')}
            disabled={saving}
          >
            <Text style={styles.draftBtnText}>{saving ? 'Saving...' : 'Save as Draft'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitBtn, saving && styles.disabledBtn]}
            onPress={() => handleSaveMarks('SUBMITTED')}
            disabled={saving}
          >
            <Text style={styles.submitBtnText}>{saving ? 'Submitting...' : 'Submit Marks'}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* CLASSES SELECTION MODAL */}
      <Modal visible={classModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
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
  sheetBtn: {
    position: 'absolute',
    right: 20,
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
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroTitleSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', marginBottom: 20 },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabItemActive: { borderBottomWidth: 2, borderBottomColor: '#7c3aed' },
  tabItemText: { fontSize: 13, fontWeight: '750', color: '#94a3b8' },
  tabItemTextActive: { color: '#7c3aed', fontWeight: '900' },
  dropdownLabel: { fontSize: 11, fontWeight: '800', color: '#94a3b8', marginBottom: 6 },
  readOnlyField: {
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16
  },
  dropdownField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#7c3aed',
    marginBottom: 20
  },
  dropdownVal: { fontSize: 14, fontWeight: '750', color: '#0f172a' },
  rowDropdowns: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  dropdownFieldSmall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  dropdownValSmall: { fontSize: 13, fontWeight: '750', color: '#475569' },
  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  totalMarksLabel: { fontSize: 12, fontWeight: '800', color: '#7c3aed' },
  listContainer: { gap: 12, marginBottom: 40 },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  studentCardError: {
    borderColor: '#fca5a5',
    backgroundColor: '#fef2f2'
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  studentName: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  studentRoll: { fontSize: 11, color: '#94a3b8', fontWeight: '750', marginTop: 2 },
  gradeLabel: { fontSize: 10, color: '#7c3aed', fontWeight: '800', marginTop: 2 },
  marksInputContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  marksInput: {
    width: 55,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a'
  },
  marksInputError: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2'
  },
  outOfLabel: { fontSize: 13, color: '#94a3b8', fontWeight: '700' },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 12
  },
  draftBtn: {
    flex: 2,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  draftBtnText: { fontSize: 14, fontWeight: '800', color: '#7c3aed' },
  submitBtn: {
    flex: 3,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: { fontSize: 14, fontWeight: '800', color: '#ffffff' },
  disabledBtn: { opacity: 0.6 },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12
  },
  loadingText: { fontSize: 14, fontWeight: '700', color: '#64748b' },
  errorText: { fontSize: 14, fontWeight: '700', color: '#dc2626', textAlign: 'center' },
  emptyText: { fontSize: 14, fontWeight: '700', color: '#94a3b8' },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#7c3aed'
  },
  retryBtnText: { fontSize: 13, fontWeight: '800', color: '#ffffff' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#ffffff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  modalItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalItemActive: { backgroundColor: '#f8fafc' },
  modalItemTitle: { fontSize: 14, fontWeight: '850', color: '#0f172a' },
  modalItemSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  modalItemTextActive: { color: '#7c3aed', fontWeight: '900' },
  modalEmptyText: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginVertical: 30 }
});
