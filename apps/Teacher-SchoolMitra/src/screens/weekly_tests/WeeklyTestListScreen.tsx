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
  RefreshControl
} from 'react-native';
import {
  ChevronLeft,
  Plus,
  Clock,
  ClipboardList
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { teacherApi } from '../../services/apiService';
import { useIsFocused } from '@react-navigation/native';

export default function WeeklyTestListScreen({ navigation }: any) {
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState('All Tests');
  const [allTests, setAllTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const tabs = ['All Tests', 'Upcoming', 'Completed', 'Drafts'];

  const fetchTests = useCallback(async () => {
    try {
      const res = await teacherApi.getTests().catch(() => null);
      if (res && (Array.isArray(res.tests) || Array.isArray(res))) {
        const raw = Array.isArray(res.tests) ? res.tests : res;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const mapped = raw.map((t: any, idx: number) => {
          const d = t.date ? new Date(t.date) : new Date();
          const day = String(d.getDate()).padStart(2, '0');
          const month = months[d.getMonth()] || 'Aug';
          const isCompleted = t.status === 'Completed' || (t.results && t.results.length > 0);
          const status = isCompleted ? 'Completed' : (t.status || 'Upcoming');

          return {
            id: t.id || t._id || String(idx + 1),
            day,
            month,
            title: t.title || t.name || 'Subject Test',
            class: t.className || t.targetClass || 'Class 8-A',
            details: `${t.time || '10:00 AM'} • ${t.totalMarks || 30} Marks`,
            status,
            color: status === 'Completed' ? '#2563eb' : (status === 'Upcoming' ? '#16a34a' : '#d97706'),
            bg: status === 'Completed' ? '#eff6ff' : (status === 'Upcoming' ? '#ecfdf5' : '#fef3c7')
          };
        });
        setAllTests(mapped);
      } else {
        setAllTests([]);
      }
    } catch (e) {
      console.warn('Tests fetch error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchTests();
    }
  }, [isFocused, fetchTests]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTests();
  };

  const filteredTests = allTests.filter(t => {
    if (activeTab === 'All Tests') return true;
    return t.status.toLowerCase() === activeTab.toLowerCase();
  });

  const upcomingTests = filteredTests.filter(t => t.status === 'Upcoming');
  const completedTests = filteredTests.filter(t => t.status === 'Completed');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test / Quiz</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('CreateWeeklyTest')}>
          <Plus size={20} color="#0f172a" />
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
            <Text style={styles.heroTitle}>Create tests, conduct</Text>
            <Text style={styles.heroTitle}>quizzes and evaluate</Text>
            <Text style={styles.heroTitleSub}>student performance.</Text>
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

        {/* TESTS LIST */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>{activeTab}</Text>
          <Text style={styles.viewAllText}>{filteredTests.length} Tests</Text>
        </View>

        <View style={styles.listContainer}>
          {loading ? (
            <View style={{ padding: 30, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#7c3aed" />
            </View>
          ) : filteredTests.length === 0 ? (
            <View style={{ padding: 24, alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16 }}>
              <Text style={{ fontSize: 13, color: '#94a3b8', fontWeight: '600' }}>
                No weekly tests found in this category.
              </Text>
            </View>
          ) : (
            filteredTests.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.testCard}
                onPress={() => navigation.navigate('TestResultEntry', { test: item, testId: item.id })}
              >
                <View style={styles.dateCol}>
                  <Text style={[styles.dateDayText, { color: item.color }]}>{item.day}</Text>
                  <Text style={styles.dateMonthText}>{item.month}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.testTitle}>{item.title}</Text>
                  <Text style={styles.testClass}>{item.class}</Text>
                  <View style={styles.timeRow}>
                    <Clock size={12} color="#94a3b8" style={{ marginRight: 6 }} />
                    <Text style={styles.timeText}>{item.details}</Text>
                  </View>
                </View>

                <View style={[styles.statusBadge, { backgroundColor: item.bg }]}>
                  <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
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
  addBtn: {
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
  tabRow: { flexDirection: 'row', gap: 6, marginBottom: 20 },
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
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  viewAllText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  listContainer: { gap: 12, marginBottom: 16 },
  testCard: {
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
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f1f5f9',
    paddingRight: 10
  },
  dateDayText: { fontSize: 20, fontWeight: '950', color: '#7c3aed' },
  dateMonthText: { fontSize: 12, color: '#64748b', fontWeight: '800', marginTop: 2 },
  testTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginBottom: 4 },
  testClass: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  timeText: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: { fontSize: 10, fontWeight: '900' }
});
