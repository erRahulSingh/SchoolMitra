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
  ActivityIndicator
} from 'react-native';
import {
  ChevronLeft,
  SlidersHorizontal,
  User,
  AlertCircle
} from 'lucide-react-native';
import { teacherApi } from '../../services/apiService';

export default function StudentPerformanceScreen({ route, navigation }: any) {
  const studentParam = route?.params?.student || {};
  const studentId = studentParam.studentId || studentParam.id || 'st_101';
  const studentNameParam = studentParam.studentName || studentParam.name || 'Aarav Sharma';
  const rollNoParam = studentParam.rollNo || studentParam.roll || 'N/A';
  const classNameParam = studentParam.className || 'Class 8-A';

  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [perfData, setPerfData] = useState<any>(null);

  const fetchPerformance = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res: any = await teacherApi.getStudentPerformance(studentId);
      if (res?.success && res?.data) {
        setPerfData(res.data);
      } else {
        throw new Error(res?.message || 'Failed to load performance analytics');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load performance analytics');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchPerformance();
  }, [fetchPerformance]);

  const studentInfo = perfData?.studentInfo || {
    name: studentNameParam,
    rollNo: rollNoParam,
    className: classNameParam,
    overallRank: '—',
    gpa: '—'
  };

  const attendance = perfData?.attendanceAnalytics?.overallPercentage || '—';
  const homework = perfData?.homeworkAnalytics?.completionRate || '—';
  const weeklyTests = perfData?.weeklyTestsAnalytics?.averageTestScore || '—';
  const examMarks = perfData?.examMarksAnalytics || { overallPercentage: '—', grade: '—' };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Performance</Text>
        <TouchableOpacity style={styles.filterBtn} onPress={() => Alert.alert('Filter', 'Filter parameters...')}>
          <SlidersHorizontal size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* STUDENT PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <User size={28} color="#7c3aed" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.studentName}>{studentInfo.name || studentNameParam}</Text>
            <Text style={styles.studentInfo}>{studentInfo.className || classNameParam}</Text>
            <Text style={styles.studentInfo}>Roll No. {studentInfo.rollNo || rollNoParam}</Text>
          </View>
        </View>

        {/* TAB SELECTORS */}
        <View style={styles.tabRow}>
          {['Overview', 'Details'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabPill, activeTab === tab && styles.tabPillActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabPillText, activeTab === tab && styles.tabPillTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#7c3aed" style={{ marginTop: 40 }} />
        ) : error ? (
          <View style={styles.centerContainer}>
            <AlertCircle size={40} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            {/* OVERVIEW PERFORMANCE */}
            {activeTab === 'Overview' && (
              <View>
                <Text style={styles.sectionTitle}>Overall Performance</Text>
                <View style={styles.overallCard}>
                  {/* Circular green ring */}
                  <View style={styles.progressCircle}>
                    <Text style={styles.progressVal}>{examMarks.overallPercentage}</Text>
                    <Text style={styles.progressLabel}>Overall Score</Text>
                  </View>

                  <View style={styles.statsCol}>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Attendance Rate</Text>
                      <Text style={styles.statValRight}>{attendance}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Homework Done</Text>
                      <Text style={[styles.statValRight, { color: '#0f172a' }]}>{homework}</Text>
                    </View>
                    <View style={[styles.statItem, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                      <Text style={styles.statLabel}>Academic Grade</Text>
                      <Text style={[styles.statValRight, { color: '#7c3aed' }]}>{examMarks.grade}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* DETAILS WISE PERFORMANCE */}
            {activeTab === 'Details' && (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.sectionTitle}>Module Wise Breakdown</Text>
                <View style={styles.subjectsCard}>
                  <View style={styles.subjectRow}>
                    <Text style={styles.subjectName}>Exams & Terms</Text>
                    <View style={styles.subjectRight}>
                      <Text style={styles.scoreText}>{examMarks.overallPercentage}</Text>
                    </View>
                  </View>

                  <View style={styles.subjectRow}>
                    <Text style={styles.subjectName}>Weekly Tests</Text>
                    <View style={styles.subjectRight}>
                      <Text style={styles.scoreText}>{weeklyTests}</Text>
                    </View>
                  </View>

                  <View style={styles.subjectRow}>
                    <Text style={styles.subjectName}>Homework Completion</Text>
                    <View style={styles.subjectRight}>
                      <Text style={styles.scoreText}>{homework}</Text>
                    </View>
                  </View>

                  <View style={[styles.subjectRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.subjectName}>Attendance Record</Text>
                    <View style={styles.subjectRight}>
                      <Text style={styles.scoreText}>{attendance}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
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
  filterBtn: {
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
  profileCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  studentName: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  studentInfo: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 2, fontWeight: '600' },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tabPill: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabPillActive: { backgroundColor: '#7c3aed' },
  tabPillText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  tabPillTextActive: { color: '#ffffff' },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  overallCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    marginBottom: 20
  },
  progressCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 6,
    borderColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  progressVal: { fontSize: 20, fontWeight: '950', color: '#16a34a' },
  progressLabel: { fontSize: 9, color: '#94a3b8', fontWeight: '800', marginTop: 2 },
  statsCol: { flex: 1, gap: 10 },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 6
  },
  statLabel: { fontSize: 12, color: '#64748b', fontWeight: '700' },
  statValRight: { fontSize: 13, fontWeight: '900', color: '#475569' },
  subjectsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
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
  scoreText: { fontSize: 13, fontWeight: '900', color: '#475569', textAlign: 'right' },
  centerContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, gap: 12 },
  errorText: { fontSize: 14, fontWeight: '700', color: '#dc2626' }
});
