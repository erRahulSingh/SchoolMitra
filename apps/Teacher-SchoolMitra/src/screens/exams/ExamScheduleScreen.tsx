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
  RefreshControl
} from 'react-native';
import {
  ChevronLeft,
  Calendar,
  MoreVertical,
  ClipboardList,
  AlertCircle
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { teacherApi } from '../../services/apiService';

interface ExamItem {
  _id: string;
  examName: string;
  examType: string;
  startDate: string;
  endDate: string;
  status: string;
  classes?: any[];
  sections?: any[];
  subjects?: any[];
  maxMarks?: number;
  passingMarks?: number;
  schedule?: any[];
}

export default function ExamScheduleScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const tabs = ['Upcoming', 'Ongoing', 'Completed'];

  const fetchExams = useCallback(async () => {
    try {
      setError('');
      const res: any = await teacherApi.getExams();
      if (res?.success !== false && (res?.data?.exams || res?.data || res?.exams)) {
        const examsList = res?.data?.exams || res?.data || res?.exams || [];
        setExams(Array.isArray(examsList) ? examsList : []);
      } else {
        setExams([]);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load exams');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchExams();
  };

  // Filter exams by tab
  const getFilteredExams = () => {
    const now = new Date();
    return exams.filter((exam) => {
      const start = new Date(exam.startDate);
      const end = new Date(exam.endDate);
      const status = (exam.status || '').toUpperCase();

      if (activeTab === 'Upcoming') {
        return status === 'DRAFT' || status === 'PUBLISHED' || start > now;
      } else if (activeTab === 'Ongoing') {
        return (start <= now && end >= now) || status === 'ONGOING';
      } else {
        return status === 'CLOSED' || status === 'COMPLETED' || end < now;
      }
    });
  };

  const getStatusDisplay = (exam: ExamItem) => {
    const status = (exam.status || '').toUpperCase();
    if (status === 'PUBLISHED') return { label: 'Published', color: '#16a34a', bg: '#ecfdf5' };
    if (status === 'CLOSED' || status === 'COMPLETED') return { label: 'Completed', color: '#64748b', bg: '#f1f5f9' };
    if (status === 'DRAFT') return { label: 'Draft', color: '#d97706', bg: '#fffbeb' };
    return { label: 'Upcoming', color: '#2563eb', bg: '#eff6ff' };
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = d.getHours();
    const mins = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    return { day, month, full: `${day} ${month} ${year}  •  ${h12}:${mins} ${ampm}` };
  };

  const filteredExams = getFilteredExams();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exam Management</Text>
        <TouchableOpacity style={styles.calendarBtn}>
          <Calendar size={18} color="#0f172a" />
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
            <Text style={styles.heroTitle}>Manage exams</Text>
            <Text style={styles.heroTitle}>efficiently and</Text>
            <Text style={styles.heroTitleSub}>track results.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <ClipboardList size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TABS PILLS */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
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

        {/* LOADING STATE */}
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#7c3aed" />
            <Text style={styles.loadingText}>Loading exams...</Text>
          </View>
        )}

        {/* ERROR STATE */}
        {!loading && error ? (
          <View style={styles.centerContainer}>
            <AlertCircle size={40} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={fetchExams}>
              <Text style={styles.retryBtnText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* EMPTY STATE */}
        {!loading && !error && filteredExams.length === 0 && (
          <View style={styles.centerContainer}>
            <ClipboardList size={40} color="#94a3b8" />
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} exams found</Text>
          </View>
        )}

        {/* EXAM LIST */}
        {!loading && !error && filteredExams.length > 0 && (
          <View style={styles.listContainer}>
            {filteredExams.map((item) => {
              const dateInfo = formatDate(item.startDate);
              const statusInfo = getStatusDisplay(item);
              return (
                <TouchableOpacity
                  key={item._id}
                  style={styles.examCard}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('ExamMarksEntry', { exam: item })}
                >
                  <View style={styles.dateCol}>
                    <Text style={styles.dateDayText}>{dateInfo.day}</Text>
                    <Text style={styles.dateMonthText}>{dateInfo.month}</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.examTitle}>{item.examName}</Text>
                    <Text style={styles.examClass}>{item.examType || 'Exam'}</Text>
                    <Text style={styles.examTime}>{dateInfo.full}</Text>
                    <Text style={styles.examStudents}>Max Marks: {item.maxMarks || '—'}</Text>
                  </View>

                  <View style={styles.rightCol}>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                      <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.label}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                      Alert.alert('Options', 'What would you like to do?', [
                        { text: 'View Schedule', onPress: () => navigation.navigate('ExamMarksEntry', { exam: item }) },
                        { text: 'View Grade Sheet', onPress: () => navigation.navigate('GradeSheet', { exam: item }) },
                        { text: 'View Results', onPress: () => navigation.navigate('ExamReport', { exam: item }) },
                        { text: 'Cancel', style: 'cancel' }
                      ]);
                    }}>
                      <MoreVertical size={18} color="#94a3b8" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => Alert.alert('Create Exam', 'Only School Admin can create exams from the Admin Panel.')}
        >
          <Text style={styles.createBtnText}>+ Create New Exam</Text>
        </TouchableOpacity>
      </View>
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
  calendarBtn: {
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
  listContainer: { gap: 12, marginBottom: 80 },
  examCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  dateCol: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f1f5f9',
    paddingRight: 10
  },
  dateDayText: { fontSize: 20, fontWeight: '950', color: '#7c3aed' },
  dateMonthText: { fontSize: 12, color: '#64748b', fontWeight: '800', marginTop: 2 },
  examTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginBottom: 4 },
  examClass: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  examTime: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 3 },
  examStudents: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 3 },
  rightCol: { alignItems: 'flex-end', gap: 12 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: { fontSize: 10, fontWeight: '900' },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  createBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createBtnText: { fontSize: 14, fontWeight: '800', color: '#ffffff' },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12
  },
  loadingText: { fontSize: 14, fontWeight: '700', color: '#64748b', marginTop: 8 },
  errorText: { fontSize: 14, fontWeight: '700', color: '#dc2626', textAlign: 'center' },
  emptyText: { fontSize: 14, fontWeight: '700', color: '#94a3b8' },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#7c3aed'
  },
  retryBtnText: { fontSize: 13, fontWeight: '800', color: '#ffffff' }
});
