import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import {
  ChevronLeft,
  Download,
  Send,
  Printer,
  AlertCircle
} from 'lucide-react-native';
import { teacherApi } from '../../services/apiService';

export default function ReportPreviewScreen({ route, navigation }: any) {
  const studentParam = route?.params?.student || {};
  const studentId = studentParam.studentId || studentParam.id || '';
  const studentName = studentParam.studentName || studentParam.name || 'Student';
  const classId = studentParam.classId || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rc, setRc] = useState<any>(null);
  const [publishing, setPublishing] = useState(false);

  const fetchReportCard = useCallback(async () => {
    if (!studentId) {
      setError('No student specified');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError('');
      const res: any = await teacherApi.getStudentReportCard(studentId);
      if (res?.success && res?.data?.reportCard) {
        setRc(res.data.reportCard);
      } else {
        throw new Error(res?.message || 'Report Card not generated yet');
      }
    } catch (err: any) {
      setError(err?.message || 'Report Card not generated yet');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchReportCard();
  }, [fetchReportCard]);

  const handleDownloadPDF = () => {
    Alert.alert(
      'Downloading Report Card 📄',
      `Downloading PDF Report Card for ${rc?.studentName || studentName}...`
    );
  };

  const handlePublishToParent = async () => {
    setPublishing(true);
    try {
      const res: any = await teacherApi.publishReportCards({
        classId: classId,
        term: rc?.examTitle || 'Mid-Term'
      });
      if (res?.success !== false) {
        Alert.alert(
          'Publication Requested 📋',
          res?.message || 'Report Card publication requested successfully! School Admin or Principal approval is required to publish.'
        );
      }
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Failed to request publication');
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
        <Text style={styles.headerTitle}>Report Card Preview</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={handleDownloadPDF}>
          <Download size={20} color="#7c3aed" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#7c3aed" />
          <Text style={styles.loadingText}>Fetching report card...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <AlertCircle size={40} color="#dc2626" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.backBtnText} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnLabel}>Go Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* REPORT CARD SHEET */}
          <View style={styles.paperSheet}>
            {/* SCHOOL HEADER */}
            <View style={styles.schoolHeader}>
              <Text style={styles.schoolName}>SCHOOLMITRA ACADEMIC CENTRE</Text>
              <Text style={styles.schoolSub}>Affiliated Board Progress Report Card</Text>
              <Text style={styles.reportTitle}>{rc?.examTitle || 'TERM COMPREHENSIVE REPORT'}</Text>
              <Text style={styles.sessionText}>Academic Session 2026-2027</Text>
            </View>

            <View style={styles.divider} />

            {/* STUDENT BIODATA */}
            <View style={styles.studentBioBox}>
              <View style={styles.bioRow}>
                <Text style={styles.bioLabel}>Student Name:</Text>
                <Text style={styles.bioVal}>{rc?.studentName || studentName}</Text>
              </View>

              <View style={styles.bioRow}>
                <Text style={styles.bioLabel}>Class & Section:</Text>
                <Text style={styles.bioVal}>{rc?.className || '—'}</Text>
              </View>

              <View style={styles.bioRow}>
                <Text style={styles.bioLabel}>Roll No:</Text>
                <Text style={styles.bioVal}>Roll {rc?.rollNo || '—'}</Text>
              </View>

              <View style={styles.bioRow}>
                <Text style={styles.bioLabel}>Report Status:</Text>
                <Text style={styles.bioVal}>{rc?.status || 'DRAFT'}</Text>
              </View>
            </View>

            {/* SCHOLASTIC PERFORMANCE TABLE */}
            <Text style={styles.tableCaption}>Part 1: Scholastic Performance</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.th, { flex: 2 }]}>Subject</Text>
              <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Score</Text>
              <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Grade</Text>
            </View>

            {(rc?.subjects || []).map((sub: any, idx: number) => (
              <View key={sub.subjectId || idx} style={styles.tableRow}>
                <Text style={[styles.td, { flex: 2 }]}>{sub.subjectName}</Text>
                <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>
                  {sub.obtainedMarks} / {sub.maxMarks}
                </Text>
                <Text style={[styles.td, { flex: 1, textAlign: 'center', fontWeight: '800', color: sub.isPassed ? '#16a34a' : '#dc2626' }]}>
                  {sub.grade || '—'}
                </Text>
              </View>
            ))}

            {/* OVERALL RESULT SUMMARY */}
            <View style={styles.summaryResultBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Grand Total Marks:</Text>
                <Text style={styles.summaryVal}>
                  {rc?.obtainedMarks} / {rc?.totalMarks} ({rc?.percentage})
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Cumulative Grade:</Text>
                <Text style={styles.summaryVal}>{rc?.grade || '—'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Result Status:</Text>
                <Text style={[styles.summaryVal, { color: '#16a34a', fontWeight: '900' }]}>
                  {rc?.status || 'PENDING'}
                </Text>
              </View>
            </View>

            {/* REMARKS & SIGNATURES */}
            {rc?.remarks && (
              <View style={styles.remarksBox}>
                <Text style={styles.remarksHeader}>Class Educator Remarks:</Text>
                <Text style={styles.remarksText}>{rc.remarks}</Text>
              </View>
            )}

            <View style={styles.sigRow}>
              <View style={styles.sigBlock}>
                <Text style={styles.sigTitle}>Class Teacher</Text>
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
              <Text style={styles.downloadBtnText}>Print / Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.publishBtn, publishing && styles.disabledBtn]}
              onPress={handlePublishToParent}
              disabled={publishing}
            >
              <Send size={18} color="#ffffff" />
              <Text style={styles.publishBtnText}>Request Publish</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
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
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#7c3aed',
    height: 50,
    borderRadius: 14
  },
  publishBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 14 },
  centerContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, gap: 12 },
  loadingText: { fontSize: 14, fontWeight: '700', color: '#64748b' },
  errorText: { fontSize: 14, fontWeight: '700', color: '#dc2626', textAlign: 'center' },
  backBtnText: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 12, backgroundColor: '#7c3aed', marginTop: 10 },
  backBtnLabel: { color: '#ffffff', fontWeight: '800' },
  disabledBtn: { opacity: 0.6 }
});
