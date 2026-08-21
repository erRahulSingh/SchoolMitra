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
  ClipboardList,
  ChevronRight,
  Search,
  FileCheck,
  Users
} from 'lucide-react-native';
import { teacherApi } from '../../services/apiService';
import { useIsFocused } from '@react-navigation/native';

export default function HomeworkListScreen({ navigation }: any) {
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState('All');
  const [homeworkList, setHomeworkList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const tabs = ['All', 'Active', 'Submitted', 'Overdue'];

  const fetchHomework = useCallback(async () => {
    try {
      const res = await teacherApi.getHomework().catch(() => null);
      if (res && (Array.isArray(res.homework) || Array.isArray(res))) {
        const raw = Array.isArray(res.homework) ? res.homework : res;
        const colorPalette = [
          { iconColor: '#7c3aed', iconBg: '#f3e8ff' },
          { iconColor: '#ea580c', iconBg: '#ffedd5' },
          { iconColor: '#2563eb', iconBg: '#eff6ff' }
        ];

        const mapped = raw.map((hw: any, idx: number) => {
          const theme = colorPalette[idx % colorPalette.length];
          const isOverdue = hw.dueDate && new Date(hw.dueDate) < new Date();
          const status = hw.status || (isOverdue ? 'Overdue' : 'Active');
          const submittedCount = hw.submittedCount || (hw.submissions ? hw.submissions.length : 0);
          const totalCount = hw.totalCount || hw.totalStudents || 40;

          return {
            id: hw.id || hw._id || String(idx + 1),
            title: hw.title || 'Subject Homework',
            meta: `${hw.className || hw.targetClass || 'Class 8-A'} • Due: ${hw.dueDate ? new Date(hw.dueDate).toLocaleDateString('en-GB') : 'Upcoming'}`,
            status,
            statusColor: status === 'Overdue' ? '#dc2626' : (status === 'Submitted' ? '#2563eb' : '#16a34a'),
            statusBg: status === 'Overdue' ? '#fef2f2' : (status === 'Submitted' ? '#eff6ff' : '#ecfdf5'),
            desc: hw.description || hw.instructions || 'Complete homework assignments.',
            submitted: submittedCount,
            total: totalCount,
            iconColor: theme.iconColor,
            iconBg: theme.iconBg
          };
        });
        setHomeworkList(mapped);
      } else {
        setHomeworkList([]);
      }
    } catch (e) {
      console.warn('Homework fetch error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchHomework();
    }
  }, [isFocused, fetchHomework]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHomework();
  };

  const filteredList = homeworkList.filter(hw =>
    activeTab === 'All' ? true : hw.status === activeTab || (activeTab === 'Submitted' && hw.submitted > 0)
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Homework List</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.actionIconBtn} onPress={() => Alert.alert('Search', 'Search homework...')}>
            <Search size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIconBtn} onPress={() => navigation.navigate('CreateHomework')}>
            <Plus size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#7c3aed']} />}
      >
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

        {/* HOMEWORK LIST CARDS */}
        <View style={styles.listContainer}>
          {loading ? (
            <View style={{ padding: 30, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#7c3aed" />
            </View>
          ) : filteredList.length === 0 ? (
            <View style={{ padding: 24, alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16 }}>
              <Text style={{ fontSize: 13, color: '#94a3b8', fontWeight: '600' }}>
                No homework items found in this section.
              </Text>
            </View>
          ) : (
            filteredList.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.hwCard}
                onPress={() => navigation.navigate('HomeworkDetails', { homework: item, homeworkId: item.id })}
              >
                <View style={styles.hwCardTop}>
                  <View style={[styles.hwIconCircle, { backgroundColor: item.iconBg }]}>
                    <ClipboardList size={20} color={item.iconColor} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.hwTitle}>{item.title}</Text>
                    <Text style={styles.hwMeta}>{item.meta}</Text>
                  </View>

                  <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                    <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                  </View>
                </View>

                <Text style={styles.hwDesc} numberOfLines={2}>{item.desc}</Text>

                <View style={styles.hwCardFooter}>
                  <View style={styles.subCountBadge}>
                    <FileCheck size={14} color="#7c3aed" style={{ marginRight: 4 }} />
                    <Text style={styles.subCountText}>
                      Submissions: {item.submitted}/{item.total}
                    </Text>
                  </View>

                  <ChevronRight size={18} color="#cbd5e1" />
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
  headerRight: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    gap: 8
  },
  actionIconBtn: {
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
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  tabPillActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  tabPillText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  tabPillTextActive: { color: '#ffffff' },
  listContainer: { gap: 12 },
  hwCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hwTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  metaText: { fontSize: 12, color: '#64748b', marginTop: 3, fontWeight: '600' },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  },
  statusText: { fontSize: 11, fontWeight: '800' },
  descText: { fontSize: 13, color: '#475569', lineHeight: 18, marginBottom: 16 },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12
  },
  metaStat: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  metaStatText: { fontSize: 12, fontWeight: '800', color: '#475569' }
});
