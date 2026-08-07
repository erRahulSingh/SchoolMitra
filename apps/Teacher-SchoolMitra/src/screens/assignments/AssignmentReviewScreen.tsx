import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Modal
} from 'react-native';
import {
  ChevronLeft,
  Award,
  Save,
  FileText,
  CheckCircle2,
  Clock,
  User,
  Star,
  X,
  Eye,
  Send,
  Sparkles
} from 'lucide-react-native';

export default function AssignmentReviewScreen({ route, navigation }: any) {
  const assignmentParam = route?.params?.assignment || {
    id: 'as_1',
    title: 'Term 1 Geometry 3D Proof Model',
    class: 'Class 8-A',
    marks: 50,
    dueDate: '15 Aug 2026'
  };

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Form states for grading
  const [score, setScore] = useState('');
  const [conceptScore, setConceptScore] = useState('18');
  const [presentationScore, setPresentationScore] = useState('15');
  const [timelinessScore, setTimelinessScore] = useState('15');
  const [feedback, setFeedback] = useState('');

  const [students, setStudents] = useState([
    {
      id: 'st_1',
      rollNo: '01',
      name: 'Aarav Gupta',
      submittedAt: '14 Aug 2026, 04:15 PM',
      status: 'Graded',
      score: 48,
      isLate: false,
      fileName: 'Aarav_Geometry_Model_3D.pdf',
      feedback: 'Excellent work on the 3D geometry proof model!'
    },
    {
      id: 'st_2',
      rollNo: '02',
      name: 'Ananya Sharma',
      submittedAt: '15 Aug 2026, 08:30 PM',
      status: 'Pending',
      score: null,
      isLate: false,
      fileName: 'Ananya_Geometry_Assignment.pdf',
      feedback: ''
    },
    {
      id: 'st_3',
      rollNo: '03',
      name: 'Rohan Verma',
      submittedAt: '16 Aug 2026, 01:10 AM',
      status: 'Pending',
      score: null,
      isLate: true,
      fileName: 'Rohan_Proof_Model.docx',
      feedback: ''
    },
    {
      id: 'st_4',
      rollNo: '04',
      name: 'Priya Nair',
      submittedAt: '14 Aug 2026, 11:20 AM',
      status: 'Graded',
      score: 44,
      isLate: false,
      fileName: 'Priya_Nair_3D_Project.pdf',
      feedback: 'Good effort, neat calculations provided.'
    }
  ]);

  const filteredStudents = students.filter((s) => {
    if (activeFilter === 'Pending') return s.status === 'Pending';
    if (activeFilter === 'Graded') return s.status === 'Graded';
    if (activeFilter === 'Late') return s.isLate;
    return true;
  });

  const openGradingModal = (student: any) => {
    setSelectedStudent(student);
    setScore(student.score ? String(student.score) : '45');
    setFeedback(student.feedback || 'Great presentation and accurate calculations.');
    setIsModalVisible(true);
  };

  const handleSaveGrade = () => {
    if (!selectedStudent) return;
    const numScore = parseFloat(score);

    if (isNaN(numScore) || numScore < 0 || numScore > assignmentParam.marks) {
      Alert.alert('Invalid Score', `Please enter a score between 0 and ${assignmentParam.marks}.`);
      return;
    }

    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              status: 'Graded',
              score: numScore,
              feedback: feedback
            }
          : s
      )
    );

    setIsModalVisible(false);
    Alert.alert(
      'Score Saved ✅',
      `Graded ${selectedStudent.name}: ${numScore}/${assignmentParam.marks}. Notification sent!`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Evaluate Submissions</Text>
        <Award size={22} color="#7c3aed" />
      </View>

      {/* ASSIGNMENT HERO SUMMARY */}
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <Text style={styles.classTag}>{assignmentParam.class}</Text>
          <Text style={styles.maxMarksTag}>Max Marks: {assignmentParam.marks}</Text>
        </View>
        <Text style={styles.heroTitle}>{assignmentParam.title}</Text>
        <View style={styles.heroStatsRow}>
          <Text style={styles.heroStatItem}>
            Total: {students.length}
          </Text>
          <Text style={styles.heroStatItem}>
            Graded: {students.filter((s) => s.status === 'Graded').length}
          </Text>
          <Text style={styles.heroStatItem}>
            Pending: {students.filter((s) => s.status === 'Pending').length}
          </Text>
        </View>
      </View>

      {/* FILTER TABS */}
      <View style={styles.filterRow}>
        {['All', 'Pending', 'Graded', 'Late'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterPillText, activeFilter === f && styles.filterPillTextActive]}>
              {f} ({
                f === 'All'
                  ? students.length
                  : f === 'Pending'
                  ? students.filter((s) => s.status === 'Pending').length
                  : f === 'Graded'
                  ? students.filter((s) => s.status === 'Graded').length
                  : students.filter((s) => s.isLate).length
              })
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* STUDENTS SUBMISSION LIST */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredStudents.map((item) => (
          <View key={item.id} style={styles.studentCard}>
            <View style={styles.studentHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.substring(0, 2).toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.rollBadge}>Roll {item.rollNo}</Text>
                </View>
                <Text style={styles.submissionTime}>
                  Submitted: {item.submittedAt}
                </Text>
              </View>
              {item.isLate && (
                <View style={styles.lateTag}>
                  <Text style={styles.lateTagText}>LATE</Text>
                </View>
              )}
            </View>

            {/* ATTACHMENT preview bar */}
            <View style={styles.fileBox}>
              <FileText size={16} color="#7c3aed" />
              <Text style={styles.fileNameText}>{item.fileName}</Text>
              <TouchableOpacity
                onPress={() => Alert.alert('Preview File', `Simulating view of ${item.fileName}`)}
              >
                <Eye size={16} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* SCORE DISPLAY / GRADE BUTTON */}
            <View style={styles.studentFooter}>
              {item.status === 'Graded' ? (
                <View style={styles.gradedInfo}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <Text style={styles.scoreResult}>
                    Score: {item.score}/{assignmentParam.marks}
                  </Text>
                </View>
              ) : (
                <View style={styles.pendingInfo}>
                  <Clock size={16} color="#d97706" />
                  <Text style={styles.pendingText}>Evaluation Pending</Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.gradeActionBtn, item.status === 'Graded' && styles.regradeBtn]}
                onPress={() => openGradingModal(item)}
              >
                <Text style={[styles.gradeActionText, item.status === 'Graded' && styles.regradeText]}>
                  {item.status === 'Graded' ? 'Edit Grade' : 'Grade Student'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* GRADING MODAL */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* MODAL HEADER */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Grade Submission</Text>
                <Text style={styles.modalStudentName}>
                  {selectedStudent?.name} (Roll {selectedStudent?.rollNo})
                </Text>
              </View>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <Text style={styles.label}>
                Award Score (Out of {assignmentParam.marks})
              </Text>
              <TextInput
                style={styles.scoreInput}
                value={score}
                onChangeText={setScore}
                keyboardType="numeric"
                placeholder="Score"
              />

              <Text style={styles.label}>Rubric Criteria Ratings</Text>
              <View style={styles.rubricRow}>
                <Text style={styles.rubricLabel}>Concept Accuracy (20)</Text>
                <TextInput
                  style={styles.rubricScoreInput}
                  value={conceptScore}
                  onChangeText={setConceptScore}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.rubricRow}>
                <Text style={styles.rubricLabel}>Presentation (15)</Text>
                <TextInput
                  style={styles.rubricScoreInput}
                  value={presentationScore}
                  onChangeText={setPresentationScore}
                  keyboardType="numeric"
                />
              </View>

              <Text style={styles.label}>Educator Feedback & Comments</Text>
              <TextInput
                style={styles.feedbackInput}
                value={feedback}
                onChangeText={setFeedback}
                multiline
                numberOfLines={3}
                placeholder="Write specific feedback or guidance for student..."
              />

              <TouchableOpacity style={styles.saveGradeBtn} onPress={handleSaveGrade}>
                <Save size={18} color="#ffffff" />
                <Text style={styles.saveGradeText}>Publish Evaluation & Score</Text>
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
  heroCard: {
    backgroundColor: '#6d28d9',
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 18,
    padding: 16
  },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  classTag: { color: '#e9d5ff', fontWeight: '800', fontSize: 12 },
  maxMarksTag: { color: '#ffffff', fontWeight: '800', fontSize: 12 },
  heroTitle: { fontSize: 17, fontWeight: '900', color: '#ffffff', marginBottom: 10 },
  heroStatsRow: { flexDirection: 'row', gap: 16 },
  heroStatItem: { color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: '700' },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginTop: 14,
    marginBottom: 6
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  filterPillActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  filterPillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  filterPillTextActive: { color: '#ffffff' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 12 },
  studentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  studentHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3e8ff',
    justify: 'center',
    alignItems: 'center'
  },
  avatarText: { fontSize: 14, fontWeight: '800', color: '#7c3aed' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  studentName: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  rollBadge: { fontSize: 11, fontWeight: '700', color: '#64748b', backgroundColor: '#f1f5f9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  submissionTime: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  lateTag: { backgroundColor: '#fef2f2', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  lateTagText: { color: '#dc2626', fontSize: 10, fontWeight: '900' },
  fileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  fileNameText: { flex: 1, fontSize: 12, fontWeight: '700', color: '#334155' },
  studentFooter: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  gradedInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  scoreResult: { fontSize: 13, fontWeight: '800', color: '#16a34a' },
  pendingInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pendingText: { fontSize: 12, fontWeight: '700', color: '#d97706' },
  gradeActionBtn: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10
  },
  regradeBtn: { backgroundColor: '#f3e8ff' },
  gradeActionText: { fontSize: 12, fontWeight: '800', color: '#ffffff' },
  regradeText: { color: '#7c3aed' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  modalTitle: { fontSize: 17, fontWeight: '800', color: '#0f172a' },
  modalStudentName: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  modalBody: { padding: 20 },
  label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 6, marginTop: 10 },
  scoreInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a'
  },
  rubricRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  rubricLabel: { fontSize: 13, color: '#475569', fontWeight: '600' },
  rubricScoreInput: {
    width: 60,
    height: 36,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: '800'
  },
  feedbackInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0f172a',
    height: 80,
    textAlignVertical: 'top'
  },
  saveGradeBtn: {
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#7c3aed',
    height: 48,
    borderRadius: 12,
    marginTop: 20
  },
  saveGradeText: { color: '#ffffff', fontWeight: '800', fontSize: 14 }
});
