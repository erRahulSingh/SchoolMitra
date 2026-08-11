import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList
} from 'react-native';
import {
  ChevronLeft,
  Download,
  ChevronDown,
  Award,
  X,
  Check,
  AlertCircle
} from 'lucide-react-native';
import { teacherApi } from '../../services/apiService';

interface ExamItem {
  id: string;
  examName: string;
}

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

interface StudentItem {
  studentId: string;
  studentName: string;
  rollNo: string;
  status: string;
}

interface SubjectScore {
  name: string;
  grade: string;
  score: string;
  color: string;
  bg: string;
}

export default function ReportCardGeneratorScreen({ navigation }: any) {
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null);

  const [classes, setClasses] = useState<AssignedClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<AssignedClass | null>(null);

  const [students, setStudents] = useState<StudentItem[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentItem | null>(null);

  const [subjects, setSubjects] = useState<SubjectScore[]>([]);
  const [rcDetails, setRcDetails] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  // Dropdown Visibility
  const [examModalVisible, setExamModalVisible] = useState(false);
  const [classModalVisible, setClassModalVisible] = useState(false);
  const [studentModalVisible, setStudentModalVisible] = useState(false);

  // Load initial data (exams + classes)
  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const examRes: any = await teacherApi.getExams();
      const classRes: any = await teacherApi.getClasses();

      const examsList = examRes?.data?.exams || examRes?.data || [];
      const classesList = classRes?.data?.classes || classRes?.data || [];

      setExams(examsList);
      setClasses(classesList);

      if (examsList.length > 0) setSelectedExam(examsList[0]);
      if (classesList.length > 0) setSelectedClass(classesList[0]);
    } catch (err: any) {
      setError(err?.message || 'Failed to initialize report card builder');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Load students roster for chosen Class + Exam
  const loadStudentsRoster = useCallback(async () => {
    if (!selectedExam || !selectedClass) return;
    setLoadingRoster(true);
    try {
      const res: any = await teacherApi.getReportCards({
        classId: selectedClass.classId,
        sectionId: selectedClass.sectionId,
        examId: selectedExam.id
      } as any);

      if (res?.success && res?.data?.reportCardsRoster) {
        const roster = res.data.reportCardsRoster || [];
        setStudents(roster);
        if (roster.length > 0) {
          setSelectedStudent(roster[0]);
        } else {
          setSelectedStudent(null);
          setSubjects([]);
          setRcDetails(null);
        }
      }
    } catch (err: any) {
      console.warn('Failed to load roster:', err);
    } finally {
      setLoadingRoster(false);
    }
  }, [selectedExam, selectedClass]);

  useEffect(() => {
    loadStudentsRoster();
  }, [selectedExam, selectedClass, loadStudentsRoster]);

  // Fetch report card details for selected Student
  const fetchReportCardDetails = useCallback(async () => {
    if (!selectedStudent || !selectedExam) return;
    try {
      const res: any = await teacherApi.getStudentReportCard(selectedStudent.studentId);
      if (res?.success && res?.data?.reportCard) {
        const rc = res.data.reportCard;
        setRcDetails(rc);

        const mappedSubjects = (rc.subjects || []).map((sub: any) => {
          const isPassed = sub.isPassed !== false;
          return {
            name: sub.subjectName || 'Subject',
            grade: sub.grade || '—',
            score: `${sub.obtainedMarks}/${sub.maxMarks}`,
            color: isPassed ? '#16a34a' : '#dc2626',
            bg: isPassed ? '#ecfdf5' : '#fef2f2'
          };
        });
        setSubjects(mappedSubjects);
      } else {
        setSubjects([]);
        setRcDetails(null);
      }
    } catch (err) {
      setSubjects([]);
      setRcDetails(null);
    }
  }, [selectedStudent, selectedExam]);

  useEffect(() => {
    if (selectedStudent) {
      fetchReportCardDetails();
    }
  }, [selectedStudent, fetchReportCardDetails]);

  const handleGenerate = async () => {
    if (!selectedStudent || !selectedExam) {
      Alert.alert('Selection Required', 'Please select a student and exam first.');
      return;
    }

    setGenerating(true);
    try {
      const res: any = await teacherApi.submitReportCard(selectedStudent.studentId, {
        examId: selectedExam.id,
        remarks: 'Excellent academic performance and active classroom participation!'
      });

      if (res?.success !== false) {
        Alert.alert(
          'Report Card Generated ✅',
          `Successfully compiled and submitted report card for ${selectedStudent.studentName} to School Admin for verification!`
        );
        fetchReportCardDetails();
        loadStudentsRoster();
      } else {
        throw new Error(res?.message || 'Verification Failed');
      }
    } catch (err: any) {
      Alert.alert('Compilation Failed ❌', err?.message || 'Please make sure all student marks are submitted first.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!rcDetails) {
      Alert.alert('Error', 'Please generate or fetch report card details first.');
      return;
    }
    Alert.alert('Download Started 📥', `Downloading official PDF report for ${selectedStudent?.studentName}...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Card Generator</Text>
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
          <Download size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PURPLE HERO BANNER */}
        <View style={styles.heroCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>{selectedExam?.examName || 'Report Card compilation'}</Text>
            <Text style={styles.heroSub}>Official Scorecard Compilation Desk</Text>
          </View>
          <View style={styles.heroIconCircle}>
            <Award size={30} color="#7c3aed" />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#7c3aed" style={{ marginVertical: 40 }} />
        ) : error ? (
          <View style={styles.centerContainer}>
            <AlertCircle size={40} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            {/* EXAM SELECTOR */}
            <Text style={styles.selectLabel}>Select Examination Term</Text>
            <TouchableOpacity style={styles.dropdownSelector} onPress={() => setExamModalVisible(true)}>
              <Text style={styles.dropdownVal}>{selectedExam ? selectedExam.examName : 'Select Exam...'}</Text>
              <ChevronDown size={18} color="#64748b" />
            </TouchableOpacity>

            {/* CLASS SELECTOR */}
            <Text style={styles.selectLabel}>Select Assigned Class</Text>
            <TouchableOpacity style={styles.dropdownSelector} onPress={() => setClassModalVisible(true)}>
              <Text style={styles.dropdownVal}>
                {selectedClass ? `${selectedClass.className} (${selectedClass.sectionName})` : 'Select Class...'}
              </Text>
              <ChevronDown size={18} color="#64748b" />
            </TouchableOpacity>

            {/* STUDENT SELECTOR */}
            <Text style={styles.selectLabel}>Select Student</Text>
            <TouchableOpacity style={styles.dropdownSelector} onPress={() => setStudentModalVisible(true)}>
              <Text style={styles.dropdownVal}>
                {selectedStudent ? `${selectedStudent.studentName} (${selectedStudent.status})` : 'Select Student...'}
              </Text>
              <ChevronDown size={18} color="#64748b" />
            </TouchableOpacity>

            {/* ACADEMIC PERFORMANCE */}
            {subjects.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Academic Performance Summary</Text>
                <View style={styles.subjectsCard}>
                  {subjects.map((sub, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.subjectRow,
                        idx === subjects.length - 1 && { borderBottomWidth: 0 }
                      ]}
                    >
                      <Text style={styles.subjectName}>{sub.name}</Text>
                      
                      <View style={styles.subjectRight}>
                        <View style={[styles.gradeBadge, { backgroundColor: sub.bg }]}>
                          <Text style={[styles.gradeText, { color: sub.color }]}>{sub.grade}</Text>
                        </View>
                        <Text style={styles.scoreText}>{sub.score}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* OVERALL PERCENTAGE / GRADE */}
                {rcDetails && (
                  <View style={styles.overallBox}>
                    <Text style={styles.overallText}>Overall: {rcDetails.percentage} ({rcDetails.grade} Grade)</Text>
                    <Text style={styles.overallText}>Status: {rcDetails.status}</Text>
                  </View>
                )}
              </>
            )}
          </>
        )}
      </ScrollView>

      {/* BOTTOM ACTION */}
      {selectedStudent && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.generateBtn, generating && styles.disabledBtn]}
            onPress={handleGenerate}
            disabled={generating}
          >
            {generating ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.generateText}>Compile & Submit Report Card</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* EXAMS SELECTION MODAL */}
      <Modal visible={examModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Exam Term</Text>
              <TouchableOpacity onPress={() => setExamModalVisible(false)}>
                <X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={exams}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => {
                const isSelected = selectedExam?.id === item.id;
                return (
                  <TouchableOpacity
                    style={[styles.modalItem, isSelected && styles.modalItemActive]}
                    onPress={() => {
                      setSelectedExam(item);
                      setExamModalVisible(false);
                    }}
                  >
                    <Text style={[styles.modalItemTitle, isSelected && styles.modalItemTextActive]}>{item.examName}</Text>
                    {isSelected && <Check size={18} color="#7c3aed" />}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>

      {/* CLASSES SELECTION MODAL */}
      <Modal visible={classModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Class</Text>
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
            />
          </View>
        </View>
      </Modal>

      {/* STUDENT SELECTION MODAL */}
      <Modal visible={studentModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Student</Text>
              <TouchableOpacity onPress={() => setStudentModalVisible(false)}>
                <X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={students}
              keyExtractor={(item) => item.studentId}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => {
                const isSelected = selectedStudent?.studentId === item.studentId;
                return (
                  <TouchableOpacity
                    style={[styles.modalItem, isSelected && styles.modalItemActive]}
                    onPress={() => {
                      setSelectedStudent(item);
                      setStudentModalVisible(false);
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.modalItemTitle, isSelected && styles.modalItemTextActive]}>{item.studentName}</Text>
                      <Text style={styles.modalItemSub}>Roll {item.rollNo} • Status: {item.status}</Text>
                    </View>
                    {isSelected && <Check size={18} color="#7c3aed" />}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => (
                <Text style={styles.modalEmptyText}>No student roster compiled yet</Text>
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
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: 64
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
  downloadBtn: {
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
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectLabel: { fontSize: 13, fontWeight: '800', color: '#475569', marginBottom: 8, marginTop: 10 },
  dropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12
  },
  dropdownVal: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 14, marginTop: 16 },
  subjectsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  subjectName: { fontSize: 14, fontWeight: '700', color: '#334155' },
  subjectRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  gradeText: { fontSize: 12, fontWeight: '950' },
  scoreText: { fontSize: 13, fontWeight: '800', color: '#475569', width: 60, textAlign: 'right' },
  overallBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 12, marginBottom: 20, gap: 4 },
  overallText: { fontSize: 13, fontWeight: '800', color: '#475569' },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  generateBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  generateText: { fontSize: 14, fontWeight: '800', color: '#ffffff' },
  disabledBtn: { opacity: 0.6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#ffffff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  modalItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingHorizontal: 18 },
  modalItemActive: { backgroundColor: '#f8fafc' },
  modalItemTitle: { fontSize: 14, fontWeight: '850', color: '#0f172a' },
  modalItemSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  modalItemTextActive: { color: '#7c3aed', fontWeight: '900' },
  modalEmptyText: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginVertical: 30 },
  centerContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, gap: 12 },
  errorText: { fontSize: 14, fontWeight: '700', color: '#dc2626' }
});
