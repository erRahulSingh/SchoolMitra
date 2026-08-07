import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Download,
  Share2,
  FileText,
  CheckCircle2,
  Award,
  Send,
  Printer
} from 'lucide-react-native';

export default function ReportPreviewScreen({ route, navigation }: any) {
  const student = route?.params?.student || {
    name: 'Aarav Gupta',
    roll: '01',
    class: 'Class 8-A',
    cgpa: '9.4',
    grade: 'A1',
    attendance: '96%'
  };

  const handleDownloadPDF = () => {
    Alert.alert(
      'Downloading Report Card 📄',
      `Downloading PDF Report Card for ${student.name} (${student.class})...`
    );
  };

  const handlePublishToParent = () => {
    Alert.alert(
      'Report Published 🚀',
      `Report Card for ${student.name} sent to Parent App portal!`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Card Preview</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={handleDownloadPDF}>
          <Download size={20} color="#7c3aed" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* REPORT CARD SHEET */}
        <View style={styles.paperSheet}>
          {/* SCHOOL HEADER */}
          <View style={styles.schoolHeader}>
            <Text style={styles.schoolName}>ST. MARY HIGHER SECONDARY SCHOOL</Text>
            <Text style={styles.schoolSub}>Affiliated to CBSE, New Delhi (Affiliation No. 1030452)</Text>
            <Text style={styles.reportTitle}>ANNUAL STUDENT PROGRESS REPORT</Text>
            <Text style={styles.sessionText}>Academic Session 2026-2027</Text>
          </View>

          <View style={styles.divider} />

          {/* STUDENT BIODATA */}
          <View style={styles.studentBioBox}>
            <View style={styles.bioRow}>
              <Text style={styles.bioLabel}>Student Name:</Text>
              <Text style={styles.bioVal}>{student.name}</Text>
            </View>

            <View style={styles.bioRow}>
              <Text style={styles.bioLabel}>Class & Section:</Text>
              <Text style={styles.bioVal}>{student.class || 'Class 8-A'}</Text>
            </View>

            <View style={styles.bioRow}>
              <Text style={styles.bioLabel}>Roll No / Adm No:</Text>
              <Text style={styles.bioVal}>Roll {student.roll} • ADM-8024</Text>
            </View>

            <View style={styles.bioRow}>
              <Text style={styles.bioLabel}>Attendance:</Text>
              <Text style={styles.bioVal}>{student.attendance || '96%'} (182/190 Days)</Text>
            </View>
          </View>

          {/* SCHOLASTIC PERFORMANCE TABLE */}
          <Text style={styles.tableCaption}>Part 1: Scholastic Performance</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 2 }]}>Subject</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Term 1</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Term 2</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Grade</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.td, { flex: 2 }]}>Mathematics</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>94</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>96</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center', fontWeight: '800', color: '#16a34a' }]}>A1</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.td, { flex: 2 }]}>Science</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>92</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>90</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center', fontWeight: '800', color: '#16a34a' }]}>A1</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.td, { flex: 2 }]}>English Literature</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>88</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>89</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center', fontWeight: '800', color: '#2563eb' }]}>A2</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.td, { flex: 2 }]}>Social Studies</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>91</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>93</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'center', fontWeight: '800', color: '#16a34a' }]}>A1</Text>
          </View>

          {/* OVERALL RESULT SUMMARY */}
          <View style={styles.summaryResultBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTitle}>Grand Total Marks:</Text>
              <Text style={styles.summaryVal}>365 / 400 (91.25%)</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTitle}>Cumulative GPA (CGPA):</Text>
              <Text style={styles.summaryVal}>{student.cgpa || '9.4'} (Grade {student.grade || 'A1'})</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTitle}>Result Status:</Text>
              <Text style={[styles.summaryVal, { color: '#16a34a', fontWeight: '900' }]}>PASSED WITH DISTINCTION</Text>
            </View>
          </View>

          {/* REMARKS & SIGNATURES */}
          <View style={styles.remarksBox}>
            <Text style={styles.remarksHeader}>Class Educator Remarks:</Text>
            <Text style={styles.remarksText}>
              Aarav is an outstanding student with exceptional mathematical aptitude. Highly disciplined and helpful.
            </Text>
          </View>

          <View style={styles.sigRow}>
            <View style={styles.sigBlock}>
              <Text style={styles.sigTitle}>Class Teacher Signature</Text>
              <Text style={styles.sigSub}>Rahul Sharma</Text>
            </View>

            <View style={styles.sigBlock}>
              <Text style={styles.sigTitle}>Principal Signature & Stamp</Text>
              <Text style={styles.sigSub}>Dr. A. K. Banerjee</Text>
            </View>
          </View>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.downloadBtn} onPress={handleDownloadPDF}>
            <Printer size={18} color="#ffffff" />
            <Text style={styles.downloadBtnText}>Download PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.publishBtn} onPress={handlePublishToParent}>
            <Send size={18} color="#ffffff" />
            <Text style={styles.publishBtnText}>Publish to Parent App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3e8ff',
    justify: 'center',
    alignItems: 'center'
  },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  paperSheet: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16
  },
  schoolHeader: { alignItems: 'center' },
  schoolName: { fontSize: 15, fontWeight: '900', color: '#0f172a', textAlign: 'center' },
  schoolSub: { fontSize: 10, color: '#64748b', textAlign: 'center', marginTop: 2 },
  reportTitle: { fontSize: 13, fontWeight: '900', color: '#7c3aed', marginTop: 8, letterSpacing: 0.5 },
  sessionText: { fontSize: 11, fontWeight: '700', color: '#475569', marginTop: 2 },
  divider: { height: 1.5, backgroundColor: '#e2e8f0', marginVertical: 12 },
  studentBioBox: { backgroundColor: '#f8fafc', borderRadius: 10, padding: 10, gap: 4, marginBottom: 12 },
  bioRow: { flexDirection: 'row', justifyContent: 'space-between' },
  bioLabel: { fontSize: 11, fontWeight: '700', color: '#64748b' },
  bioVal: { fontSize: 11, fontWeight: '800', color: '#0f172a' },
  tableCaption: { fontSize: 12, fontWeight: '800', color: '#0f172a', marginBottom: 6 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f1f5f9', padding: 8, borderRadius: 6, marginBottom: 4 },
  th: { fontSize: 11, fontWeight: '800', color: '#0f172a' },
  tableRow: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  td: { fontSize: 11, color: '#334155', fontWeight: '600' },
  summaryResultBox: { backgroundColor: '#dcfce7', padding: 12, borderRadius: 10, marginTop: 14, gap: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryTitle: { fontSize: 12, fontWeight: '700', color: '#166534' },
  summaryVal: { fontSize: 12, fontWeight: '800', color: '#15803d' },
  remarksBox: { backgroundColor: '#f1f5f9', padding: 10, borderRadius: 10, marginTop: 12 },
  remarksHeader: { fontSize: 11, fontWeight: '800', color: '#475569', marginBottom: 2 },
  remarksText: { fontSize: 11, color: '#334155', fontStyle: 'italic', lineHeight: 16 },
  sigRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  sigBlock: { alignItems: 'center' },
  sigTitle: { fontSize: 10, color: '#64748b', fontWeight: '700' },
  sigSub: { fontSize: 11, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  downloadBtn: {
    flex: 1,
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#475569',
    height: 50,
    borderRadius: 14
  },
  downloadBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 14 },
  publishBtn: {
    flex: 1,
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#7c3aed',
    height: 50,
    borderRadius: 14
  },
  publishBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 14 }
});
