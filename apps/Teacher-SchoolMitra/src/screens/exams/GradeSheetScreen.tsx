import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  ActivityIndicator,
  FlatList,
  RefreshControl
} from 'react-native';
import {
  ChevronLeft,
  Award,
  FileText,
  X,
  Star,
  Download,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  ChevronDown,
  Check
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

interface StudentGrade {
  studentId: string;
  rollNo: string;
  name: string;
  obtainedMarks: number | null;
  maximumMarks: number;
  grade: string;
  isPassed: boolean | null;
  percentage?: number;
  rank?: number;
}

export default function GradeSheetScreen({ route, navigation }: any) {
  const exam = route?.params?.exam || {};
  const examId = exam?._id || exam?.id || '';
  const examName = exam?.examName || 'Exam';

  const [classes, setClasses] = useState<AssignedClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<AssignedClass | null>(null);
  const [students, setStudents] = useState<StudentGrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  
  // Stats
  const [classAverage, setClassAverage] = useState('0.0%');
  const [passRate, setPassRate] = useState('0%');
  const [meanGrade, setMeanGrade] = useState('—');

  // Modal
  const [classModalVisible, setClassModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentGrade | null>(null);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  // Fetch assigned classes
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

  // Load Grade Sheet Roster
  const fetchGradeSheet = useCallback(async () => {
    if (!examId || !selectedClass) return;
    setLoadingSheet(true);
    try {
      const res: any = await teacherApi.getExamStudents(
        examId,
        selectedClass.classId,
        selectedClass.sectionId,
        selectedClass.subjectId
      );
      if (res?.success && res?.data) {
        const roster = res.data.studentsMarksRoster || res.data.students || [];
        const maxMarks = res.data.maximumMarks || 100;

        // Process students and calculate percentages
        const processed: StudentGrade[] = roster.map((s: any) => {
          const obtained = s.obtainedMarks !== null ? Number(s.obtainedMarks) : 0;
          const pct = maxMarks > 0 ? (obtained / maxMarks) * 100 : 0;
          return {
            studentId: s.studentId,
            rollNo: s.rollNo || 'N/A',
            name: s.name,
            obtainedMarks: s.obtainedMarks,
            maximumMarks: maxMarks,
            grade: s.grade || (s.obtainedMarks !== null ? 'F' : '—'),
            isPassed: s.isPassed,
            percentage: Math.round(pct * 100) / 100
          };
        });

        // Calculate Rank based on obtainedMarks descending
        const sorted = [...processed].sort((a, b) => {
          const aMarks = a.obtainedMarks !== null ? a.obtainedMarks : -1;
          const bMarks = b.obtainedMarks !== null ? b.obtainedMarks : -1;
          return bMarks - aMarks;
        });

        const ranked = processed.map(s => {
          const rankIdx = sorted.findIndex(item => item.studentId === s.studentId);
          return {
            ...s,
            rank: s.obtainedMarks !== null ? rankIdx + 1 : undefined
          };
        });

        setStudents(ranked);

        // Stats calculation
        const evaluated = processed.filter(s => s.obtainedMarks !== null);
        if (evaluated.length > 0) {
          const avgPct = evaluated.reduce((sum, s) => sum + (s.percentage || 0), 0) / evaluated.length;
          const passedCount = evaluated.filter(s => s.isPassed).length;
          const pRate = (passedCount / evaluated.length) * 100;

          setClassAverage(`${avgPct.toFixed(1)}%`);
          setPassRate(`${pRate.toFixed(0)}%`);
          
          // Rough estimation of mean grade
          const grades = evaluated.map(s => s.grade).filter(Boolean);
          const modeGrade = grades.sort((a,b) =>
            grades.filter(v => v===a).length - grades.filter(v => v===b).length
          ).pop();
          setMeanGrade(modeGrade || '—');
        } else {
          setClassAverage('0.0%');
          setPassRate('0%');
          setMeanGrade('—');
        }
      } else {
        setStudents([]);
      }
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Failed to fetch grade sheet');
    } finally {
      setLoadingSheet(false);
      setRefreshing(false);
    }
  }, [examId, selectedClass]);

  useEffect(() => {
    if (selectedClass) {
      fetchGradeSheet();
    }
  }, [selectedClass, fetchGradeSheet]);

  const onRefresh = () => {
    setRefreshing(true);
    if (selectedClass) {
      fetchGradeSheet();
    } else {
      loadAssignedClasses();
    }
  };

  const openReportCardModal = (student: StudentGrade) => {
    setSelectedStudent(student);
    setIsReportModalVisible(true);
  };

  const handleDownloadSingleReport = () => {
    Alert.alert(
      'Download Report Card 📄',
      `Downloading official Report Card PDF for ${selectedStudent?.name}...`
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
        <Text style={styles.headerTitle}>Class Grade Sheet</Text>
        <Award size={22} color="#7c3aed" />
      </View>

      {/* HERO SUMMARY BANNER */}
      <View style={styles.heroCard}>
        <Text style={styles.heroClass}>{examName}</Text>
        <Text style={styles.heroTitle}>Master Marksheet & Rank Matrix</Text>

        <View style={styles.heroStatsRow}>
          <View>
            <Text style={styles.heroVal}>{classAverage}</Text>
            <Text style={styles.heroLabel}>Class Average</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.heroVal}>{meanGrade}</Text>
            <Text style={styles.heroLabel}>Mean Grade</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.heroVal}>{passRate}</Text>
            <Text style={styles.heroLabel}>Pass Rate</Text>
          </View>
        </View>
      </View>

      {/* CLASS SELECTOR */}
      <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
        <Text style={styles.dropdownLabel}>Select Assigned Class & Subject</Text>
        <TouchableOpacity style={styles.dropdownField} onPress={() => setClassModalVisible(true)}>
          <Text style={styles.dropdownVal}>
            {selectedClass ? `${selectedClass.className} (${selectedClass.sectionName}) — ${selectedClass.subject}` : 'Select Class...'}
          </Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* GRADE SHEET LIST */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#7c3aed']} />}
      >
        {loadingSheet ? (
          <ActivityIndicator size="large" color="#7c3aed" style={{ marginTop: 40 }} />
        ) : error ? (
          <View style={styles.centerContainer}>
            <AlertCircle size={40} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : students.length === 0 ? (
          <View style={styles.centerContainer}>
            <FileText size={40} color="#94a3b8" />
            <Text style={styles.emptyText}>No data available for this class</Text>
          </View>
        ) : (
          students.map((st) => (
            <TouchableOpacity
              key={st.studentId}
              style={styles.sheetCard}
              onPress={() => openReportCardModal(st)}
            >
              {/* TOP ROW */}
              <View style={styles.cardTopRow}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>{st.rank ? `#${st.rank}` : '—'}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.studentName}>{st.name}</Text>
                  <Text style={styles.rollText}>Roll {st.rollNo}</Text>
                </View>
                <View style={styles.cgpaBadge}>
                  <Text style={styles.cgpaText}>{st.grade || '—'}</Text>
                </View>
              </View>

              {/* CARD FOOTER */}
              <View style={styles.cardFooter}>
                <Text style={st.isPassed ? styles.totalText : styles.failText}>
                  Score: {st.obtainedMarks !== null ? `${st.obtainedMarks} / ${st.maximumMarks}` : 'Absent'} ({st.percentage}%)
                </Text>
                <View style={styles.viewReportBtn}>
                  <FileText size={14} color="#7c3aed" />
                  <Text style={styles.viewReportText}>Report Card</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* REPORT CARD PREVIEW MODAL */}
      <Modal visible={isReportModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Official Marksheet Preview</Text>
                <Text style={styles.modalSub}>{selectedStudent?.name} • Roll {selectedStudent?.rollNo}</Text>
              </View>
              <TouchableOpacity onPress={() => setIsReportModalVisible(false)}>
                <X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              {/* REPORT PREVIEW PAPER */}
              <View style={styles.reportPaper}>
                <Text style={styles.schoolTitle}>SCHOOLMITRA ACADEMIC RECORD</Text>
                <Text style={styles.reportSub}>Examination Grade Sheet</Text>

                <View style={styles.studentInfoBox}>
                  <Text style={styles.infoText}>Student Name: {selectedStudent?.name}</Text>
                  <Text style={styles.infoText}>Class: {selectedClass?.className} ({selectedClass?.sectionName}) | Roll No: {selectedStudent?.rollNo}</Text>
                  <Text style={styles.infoText}>Subject: {selectedClass?.subject}</Text>
                </View>

                {/* BREAKDOWN */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.thText, { flex: 2 }]}>Evaluation Parameter</Text>
                  <Text style={[styles.thText, { flex: 1, textAlign: 'center' }]}>Marks</Text>
                  <Text style={[styles.thText, { flex: 1, textAlign: 'center' }]}>Grade</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.tdText, { flex: 2 }]}>Marks Obtained</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>
                    {selectedStudent?.obtainedMarks !== null ? selectedStudent?.obtainedMarks : 'Absent'}
                  </Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>{selectedStudent?.grade}</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.tdText, { flex: 2 }]}>Maximum Marks</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>{selectedStudent?.maximumMarks}</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>—</Text>
                </View>

                <View style={styles.reportSummaryBox}>
                  <Text style={styles.summaryVal}>Percentage: {selectedStudent?.percentage}%</Text>
                  <Text style={styles.summaryCgpa}>Result Status: {selectedStudent?.isPassed ? 'PASSED ✅' : 'FAILED / ABSENT ❌'}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.downloadReportBtn} onPress={handleDownloadSingleReport}>
                <Download size={18} color="#ffffff" />
                <Text style={styles.downloadReportText}>Download Marksheet PDF</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
    justifyContent: 'space-between',
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  heroCard: {
    backgroundColor: '#6d28d9',
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 18,
    padding: 16
  },
  heroClass: { fontSize: 12, fontWeight: '800', color: '#e9d5ff' },
  heroTitle: { fontSize: 16, fontWeight: '900', color: '#ffffff', marginTop: 2, marginBottom: 12 },
  heroStatsRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  heroVal: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  divider: { width: 1, height: 28, backgroundColor: 'rgba(255, 255, 255, 0.3)' },
  dropdownLabel: { fontSize: 11, fontWeight: '800', color: '#94a3b8', marginBottom: 6 },
  dropdownField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 10
  },
  dropdownVal: { fontSize: 14, fontWeight: '750', color: '#0f172a' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 14 },
  sheetCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  rankBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rankText: { fontSize: 13, fontWeight: '900', color: '#d97706' },
  studentName: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  rollText: { fontSize: 11, color: '#64748b' },
  cgpaBadge: { backgroundColor: '#f3e8ff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  cgpaText: { fontSize: 12, fontWeight: '900', color: '#7c3aed' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalText: { fontSize: 12, fontWeight: '800', color: '#16a34a' },
  failText: { fontSize: 12, fontWeight: '800', color: '#dc2626' },
  viewReportBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewReportText: { fontSize: 12, fontWeight: '800', color: '#7c3aed' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#ffffff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '88%' },
  modalContainerSelection: { backgroundColor: '#ffffff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  modalTitle: { fontSize: 17, fontWeight: '800', color: '#0f172a' },
  modalSub: { fontSize: 12, color: '#64748b' },
  modalBody: { padding: 20 },
  reportPaper: { backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#cbd5e1', borderRadius: 16, padding: 16, marginBottom: 16 },
  schoolTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', textAlign: 'center' },
  reportSub: { fontSize: 11, color: '#7c3aed', fontWeight: '800', textAlign: 'center', marginTop: 2, marginBottom: 12 },
  studentInfoBox: { backgroundColor: '#f8fafc', padding: 10, borderRadius: 8, marginBottom: 12 },
  infoText: { fontSize: 11, fontWeight: '700', color: '#334155', marginBottom: 2 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f1f5f9', padding: 8, borderRadius: 6, marginBottom: 4 },
  thText: { fontSize: 11, fontWeight: '800', color: '#0f172a' },
  tableRow: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  tdText: { fontSize: 11, color: '#475569', fontWeight: '600' },
  reportSummaryBox: { backgroundColor: '#dcfce7', padding: 10, borderRadius: 8, marginTop: 12 },
  summaryVal: { fontSize: 12, fontWeight: '800', color: '#166534' },
  summaryCgpa: { fontSize: 12, fontWeight: '900', color: '#15803d', marginTop: 2 },
  remarksText: { fontSize: 11, color: '#64748b', fontStyle: 'italic', marginTop: 10 },
  downloadReportBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#7c3aed', height: 48, borderRadius: 12, marginBottom: 30 },
  downloadReportText: { color: '#ffffff', fontWeight: '800', fontSize: 14 },
  modalItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalItemActive: { backgroundColor: '#f8fafc' },
  modalItemTitle: { fontSize: 14, fontWeight: '850', color: '#0f172a' },
  modalItemSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  modalItemTextActive: { color: '#7c3aed', fontWeight: '900' },
  modalEmptyText: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginVertical: 30 },
  centerContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, gap: 12 },
  errorText: { fontSize: 14, fontWeight: '700', color: '#dc2626', textAlign: 'center' },
  emptyText: { fontSize: 14, fontWeight: '700', color: '#94a3b8' }
});
