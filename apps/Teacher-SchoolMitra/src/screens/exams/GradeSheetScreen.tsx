import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Award,
  FileText,
  X,
  Star,
  Download,
  CheckCircle2,
  Sparkles
} from 'lucide-react-native';

export default function GradeSheetScreen({ route, navigation }: any) {
  const exam = route?.params?.exam || {
    id: 'ex_1',
    title: 'CBSE Mid-Term Examination 2026',
    class: 'Class 8-A'
  };

  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const gradeSheetData = [
    {
      id: 'st_1',
      roll: '01',
      name: 'Aarav Gupta',
      rank: 1,
      maths: 94,
      science: 92,
      english: 88,
      social: 91,
      total: 365,
      maxTotal: 400,
      percentage: '91.25%',
      cgpa: '9.4',
      overallGrade: 'A1'
    },
    {
      id: 'st_2',
      roll: '04',
      name: 'Priya Nair',
      rank: 2,
      maths: 98,
      science: 89,
      english: 90,
      social: 86,
      total: 363,
      maxTotal: 400,
      percentage: '90.75%',
      cgpa: '9.2',
      overallGrade: 'A1'
    },
    {
      id: 'st_3',
      roll: '02',
      name: 'Ananya Sharma',
      rank: 3,
      maths: 89,
      science: 88,
      english: 85,
      social: 87,
      total: 349,
      maxTotal: 400,
      percentage: '87.25%',
      cgpa: '8.8',
      overallGrade: 'A2'
    },
    {
      id: 'st_4',
      roll: '05',
      name: 'Kabir Mehta',
      rank: 4,
      maths: 84,
      science: 82,
      english: 80,
      social: 85,
      total: 331,
      maxTotal: 400,
      percentage: '82.75%',
      cgpa: '8.4',
      overallGrade: 'A2'
    }
  ];

  const openReportCardModal = (student: any) => {
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
        <Text style={styles.heroClass}>{exam.class} • {exam.title}</Text>
        <Text style={styles.heroTitle}>Master Marksheet & CGPA Matrix</Text>

        <View style={styles.heroStatsRow}>
          <View>
            <Text style={styles.heroVal}>88.0%</Text>
            <Text style={styles.heroLabel}>Class Average</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.heroVal}>8.95</Text>
            <Text style={styles.heroLabel}>Mean CGPA</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.heroVal}>100%</Text>
            <Text style={styles.heroLabel}>Pass Rate</Text>
          </View>
        </View>
      </View>

      {/* GRADE SHEET LIST */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {gradeSheetData.map((st) => (
          <TouchableOpacity
            key={st.id}
            style={styles.sheetCard}
            onPress={() => openReportCardModal(st)}
          >
            {/* TOP ROW */}
            <View style={styles.cardTopRow}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>#{st.rank}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.studentName}>{st.name}</Text>
                <Text style={styles.rollText}>Roll {st.roll}</Text>
              </View>
              <View style={styles.cgpaBadge}>
                <Text style={styles.cgpaText}>{st.cgpa} CGPA ({st.overallGrade})</Text>
              </View>
            </View>

            {/* SUBJECT SCORES GRID */}
            <View style={styles.scoresRow}>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Maths</Text>
                <Text style={styles.scoreVal}>{st.maths}</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Science</Text>
                <Text style={styles.scoreVal}>{st.science}</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>English</Text>
                <Text style={styles.scoreVal}>{st.english}</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Social</Text>
                <Text style={styles.scoreVal}>{st.social}</Text>
              </View>
            </View>

            {/* CARD FOOTER */}
            <View style={styles.cardFooter}>
              <Text style={styles.totalText}>
                Total: {st.total} / {st.maxTotal} ({st.percentage})
              </Text>
              <View style={styles.viewReportBtn}>
                <FileText size={14} color="#7c3aed" />
                <Text style={styles.viewReportText}>Report Card</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* REPORT CARD PREVIEW MODAL */}
      <Modal visible={isReportModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Official Report Card</Text>
                <Text style={styles.modalSub}>{selectedStudent?.name} • Roll {selectedStudent?.roll}</Text>
              </View>
              <TouchableOpacity onPress={() => setIsReportModalVisible(false)}>
                <X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              {/* REPORT PREVIEW PAPER */}
              <View style={styles.reportPaper}>
                <Text style={styles.schoolTitle}>ST. MARY HIGHER SECONDARY SCHOOL</Text>
                <Text style={styles.reportSub}>CBSE Mid-Term Progress Report 2026-27</Text>

                <View style={styles.studentInfoBox}>
                  <Text style={styles.infoText}>Student Name: {selectedStudent?.name}</Text>
                  <Text style={styles.infoText}>Class: {exam.class} | Roll No: {selectedStudent?.roll}</Text>
                  <Text style={styles.infoText}>Academic Rank: #{selectedStudent?.rank} in Class</Text>
                </View>

                {/* SUBJECT BREAKDOWN TABLE */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.thText, { flex: 2 }]}>Subject</Text>
                  <Text style={[styles.thText, { flex: 1, textAlign: 'center' }]}>Marks</Text>
                  <Text style={[styles.thText, { flex: 1, textAlign: 'center' }]}>Grade</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.tdText, { flex: 2 }]}>Mathematics</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>{selectedStudent?.maths}</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>A1</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.tdText, { flex: 2 }]}>Science</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>{selectedStudent?.science}</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>A1</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.tdText, { flex: 2 }]}>English</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>{selectedStudent?.english}</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>A2</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.tdText, { flex: 2 }]}>Social Studies</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>{selectedStudent?.social}</Text>
                  <Text style={[styles.tdText, { flex: 1, textAlign: 'center' }]}>A1</Text>
                </View>

                <View style={styles.reportSummaryBox}>
                  <Text style={styles.summaryVal}>Grand Total: {selectedStudent?.total}/400 ({selectedStudent?.percentage})</Text>
                  <Text style={styles.summaryCgpa}>Final CGPA: {selectedStudent?.cgpa} ({selectedStudent?.overallGrade})</Text>
                </View>

                <Text style={styles.remarksText}>
                  Teacher Remarks: Excellent academic performance and active classroom participation!
                </Text>
              </View>

              <TouchableOpacity style={styles.downloadReportBtn} onPress={handleDownloadSingleReport}>
                <Download size={18} color="#ffffff" />
                <Text style={styles.downloadReportText}>Download Report Card PDF</Text>
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
  heroClass: { fontSize: 12, fontWeight: '800', color: '#e9d5ff' },
  heroTitle: { fontSize: 16, fontWeight: '900', color: '#ffffff', marginTop: 2, marginBottom: 12 },
  heroStatsRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  heroVal: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  divider: { width: 1, height: 28, backgroundColor: 'rgba(255, 255, 255, 0.3)' },
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
    justify: 'center',
    alignItems: 'center'
  },
  rankText: { fontSize: 13, fontWeight: '900', color: '#d97706' },
  studentName: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  rollText: { fontSize: 11, color: '#64748b' },
  cgpaBadge: { backgroundColor: '#f3e8ff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  cgpaText: { fontSize: 12, fontWeight: '900', color: '#7c3aed' },
  scoresRow: { flexDirection: 'row', backgroundColor: '#f8fafc', padding: 10, borderRadius: 12, gap: 8, marginBottom: 10 },
  scoreItem: { flex: 1, alignItems: 'center' },
  scoreLabel: { fontSize: 10, fontWeight: '700', color: '#64748b' },
  scoreVal: { fontSize: 14, fontWeight: '800', color: '#0f172a', marginTop: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalText: { fontSize: 12, fontWeight: '800', color: '#16a34a' },
  viewReportBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewReportText: { fontSize: 12, fontWeight: '800', color: '#7c3aed' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#ffffff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '88%' },
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
  downloadReportBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#7c3aed', height: 48, borderRadius: 12 },
  downloadReportText: { color: '#ffffff', fontWeight: '800', fontSize: 14 }
});
