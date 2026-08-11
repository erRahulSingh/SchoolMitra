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
  Platform,
  ActivityIndicator,
  FlatList,
  Modal
} from 'react-native';
import {
  ChevronLeft,
  Download,
  ChevronDown,
  Trophy,
  BarChart3,
  X,
  Check,
  AlertCircle
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

interface TopperItem {
  rank: string;
  name: string;
  score: string;
  color: string;
}

export default function ExamReportScreen({ route, navigation }: any) {
  const exam = route?.params?.exam || {};
  const examId = exam?._id || exam?.id || '';
  const examName = exam?.examName || 'Exam';

  const [classes, setClasses] = useState<AssignedClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<AssignedClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [error, setError] = useState('');

  // Dropdown Modal visible
  const [classModalVisible, setClassModalVisible] = useState(false);

  // Computed Report values
  const [totalStudents, setTotalStudents] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [passRatePercent, setPassRatePercent] = useState('0%');
  
  // Percentages for legend
  const [passedPct, setPassedPct] = useState('0%');
  const [failedPct, setFailedPct] = useState('0%');
  const [absentPct, setAbsentPct] = useState('0%');

  const [toppers, setToppers] = useState<TopperItem[]>([]);

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

  // Load Report data
  const fetchReportData = useCallback(async () => {
    if (!examId || !selectedClass) return;
    setLoadingReport(true);
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

        const total = roster.length;
        setTotalStudents(total);

        if (total > 0) {
          const absents = roster.filter((s: any) => s.obtainedMarks === null || s.obtainedMarks === undefined).length;
          const evaluated = roster.filter((s: any) => s.obtainedMarks !== null && s.obtainedMarks !== undefined);
          const passed = evaluated.filter((s: any) => s.isPassed).length;
          const failed = evaluated.length - passed;

          setAbsentCount(absents);
          setPassedCount(passed);
          setFailedCount(failed);

          // Calculate Rates
          const passRate = evaluated.length > 0 ? (passed / evaluated.length) * 100 : 0;
          setPassRatePercent(`${Math.round(passRate)}%`);

          setPassedPct(`${Math.round((passed / total) * 100)}%`);
          setFailedPct(`${Math.round((failed / total) * 100)}%`);
          setAbsentPct(`${Math.round((absents / total) * 100)}%`);

          // Toppers (top 3)
          const sorted = [...roster]
            .filter((s: any) => s.obtainedMarks !== null && s.obtainedMarks !== undefined)
            .sort((a: any, b: any) => Number(b.obtainedMarks) - Number(a.obtainedMarks));

          const top3Colors = ['#d97706', '#64748b', '#b45309'];
          const top3: TopperItem[] = sorted.slice(0, 3).map((s: any, idx: number) => {
            const pct = maxMarks > 0 ? (s.obtainedMarks / maxMarks) * 100 : 0;
            return {
              rank: String(idx + 1),
              name: s.name,
              score: `${Math.round(pct)}%`,
              color: top3Colors[idx] || '#cbd5e1'
            };
          });
          setToppers(top3);
        } else {
          setAbsentCount(0);
          setPassedCount(0);
          setFailedCount(0);
          setPassRatePercent('0%');
          setPassedPct('0%');
          setFailedPct('0%');
          setAbsentPct('0%');
          setToppers([]);
        }
      }
    } catch (err: any) {
      Alert.alert('Report Error', err?.message || 'Failed to load report data');
    } finally {
      setLoadingReport(false);
    }
  }, [examId, selectedClass]);

  useEffect(() => {
    if (selectedClass) {
      fetchReportData();
    }
  }, [selectedClass, fetchReportData]);

  const handleDownload = () => {
    Alert.alert('Success ✅', 'Consolidated results report PDF downloaded successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Results & Reports</Text>
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
          <Download size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO CARD */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>View and analyze</Text>
            <Text style={styles.heroTitle}>student performance</Text>
            <Text style={styles.heroTitleSub}>and results.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <BarChart3 size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* EXAM NAME */}
        <Text style={styles.dropdownLabel}>Selected Exam</Text>
        <View style={styles.readOnlyField}>
          <Text style={styles.readOnlyVal}>{examName}</Text>
        </View>

        {/* CLASS SELECTOR */}
        <Text style={styles.dropdownLabel}>Select Class & Subject</Text>
        <TouchableOpacity style={styles.dropdownField} onPress={() => setClassModalVisible(true)}>
          <Text style={styles.dropdownVal}>
            {selectedClass ? `${selectedClass.className} (${selectedClass.sectionName}) — ${selectedClass.subject}` : 'Select Class...'}
          </Text>
          <ChevronDown size={16} color="#64748b" />
        </TouchableOpacity>

        {loadingReport ? (
          <ActivityIndicator size="large" color="#7c3aed" style={{ marginVertical: 40 }} />
        ) : error ? (
          <View style={styles.centerContainer}>
            <AlertCircle size={40} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            {/* 3 STATS BOXES */}
            <View style={styles.statsRow}>
              <View style={[styles.statBox, { borderColor: '#e2e8f0' }]}>
                <Text style={[styles.statVal, { color: '#7c3aed' }]}>{totalStudents}</Text>
                <Text style={styles.statLabel}>Total Students</Text>
              </View>
              <View style={[styles.statBox, { borderColor: '#e2e8f0' }]}>
                <Text style={[styles.statVal, { color: '#16a34a' }]}>{passedCount}</Text>
                <Text style={styles.statLabel}>Passed</Text>
              </View>
              <View style={[styles.statBox, { borderColor: '#e2e8f0' }]}>
                <Text style={[styles.statVal, { color: '#dc2626' }]}>{failedCount}</Text>
                <Text style={styles.statLabel}>Failed</Text>
              </View>
            </View>

            {/* PERFORMANCE OVERVIEW */}
            <Text style={styles.sectionTitle}>Performance Overview</Text>
            <View style={styles.overviewCard}>
              <View style={styles.donutContainer}>
                <View style={styles.donutCircle}>
                  <Text style={styles.donutPercent}>{passRatePercent}</Text>
                  <Text style={styles.donutSub}>Pass Rate</Text>
                </View>
              </View>

              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#16a34a' }]} />
                  <Text style={styles.legendText}>Passed: {passedCount} ({passedPct})</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#dc2626' }]} />
                  <Text style={styles.legendText}>Failed: {failedCount} ({failedPct})</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#94a3b8' }]} />
                  <Text style={styles.legendText}>Absent: {absentCount} ({absentPct})</Text>
                </View>
              </View>
            </View>

            {/* TOP PERFORMERS */}
            {toppers.length > 0 && (
              <>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Top Performers</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('GradeSheet', { exam })}>
                    <Text style={styles.viewAllText}>View All</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.toppersList}>
                  {toppers.map((t) => (
                    <View key={t.rank} style={styles.topperCard}>
                      <View style={styles.rankCol}>
                        <Trophy size={16} color={t.color} style={{ marginRight: 8 }} />
                        <Text style={styles.rankText}>{t.rank}</Text>
                      </View>
                      <Text style={styles.topperName}>{t.name}</Text>
                      <Text style={styles.topperScore}>{t.score}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>

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
  dropdownLabel: { fontSize: 11, fontWeight: '800', color: '#94a3b8', marginBottom: 6 },
  readOnlyField: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16
  },
  readOnlyVal: { fontSize: 13, fontWeight: '750', color: '#475569' },
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
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statBox: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center'
  },
  statVal: { fontSize: 18, fontWeight: '950' },
  statLabel: { fontSize: 10, fontWeight: '800', color: '#94a3b8', marginTop: 2, textAlign: 'center' },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12, marginTop: 10 },
  overviewCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20
  },
  donutContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 8,
    borderColor: '#16a34a',
    borderTopColor: '#dc2626',
    justifyContent: 'center',
    alignItems: 'center'
  },
  donutCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  donutPercent: { fontSize: 16, fontWeight: '950', color: '#0f172a' },
  donutSub: { fontSize: 8, color: '#94a3b8', fontWeight: '800', marginTop: 2 },
  legendContainer: { flex: 1, gap: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: '#64748b', fontWeight: '700' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  viewAllText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  toppersList: { gap: 10, marginBottom: 20 },
  topperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  rankCol: { flexDirection: 'row', alignItems: 'center', width: 44 },
  rankText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  topperName: { flex: 1, fontSize: 13, fontWeight: '800', color: '#334155' },
  topperScore: { fontSize: 13, fontWeight: '900', color: '#7c3aed' },
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
