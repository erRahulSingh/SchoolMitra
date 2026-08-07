import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Plus,
  ClipboardCheck,
  ChevronRight,
  Search,
  BookOpen
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AssignmentListScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Active', 'Submitted', 'Overdue'];

  const assignmentsList = [
    {
      id: 'as_1',
      title: 'Maths Assignment - 3',
      classSubject: 'Class 8 - A • Mathematics',
      due: 'Due: 25 May 2024',
      progress: '32 Submitted / 42',
      status: 'Active',
      statusColor: '#16a34a',
      statusBg: '#ecfdf5',
      iconColor: '#16a34a',
      iconBg: '#ecfdf5'
    },
    {
      id: 'as_2',
      title: 'Science Assignment - 2',
      classSubject: 'Class 8 - A • Science',
      due: 'Due: 27 May 2024',
      progress: '28 Submitted / 42',
      status: 'Active',
      statusColor: '#16a34a',
      statusBg: '#ecfdf5',
      iconColor: '#7c3aed',
      iconBg: '#f3e8ff'
    },
    {
      id: 'as_3',
      title: 'English Assignment - 1',
      classSubject: 'Class 8 - A • English',
      due: 'Due: 18 May 2024',
      progress: '42 Submitted / 42',
      status: 'Overdue',
      statusColor: '#dc2626',
      statusBg: '#fef2f2',
      iconColor: '#ea580c',
      iconBg: '#ffedd5'
    },
    {
      id: 'as_4',
      title: 'Social Science - Project',
      classSubject: 'Class 8 - A • S.St',
      due: 'Due: 02 Jun 2024',
      progress: '0 Submitted / 42',
      status: 'Draft',
      statusColor: '#ea580c',
      statusBg: '#ffedd5',
      iconColor: '#ef4444',
      iconBg: '#fef2f2'
    }
  ];

  const filtered = assignmentsList.filter(as =>
    activeTab === 'All' ? true : as.status === activeTab || (activeTab === 'Submitted' && as.status === 'Completed')
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assignments</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.actionIconBtn} onPress={() => Alert.alert('Search', 'Search assignments...')}>
            <Search size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIconBtn} onPress={() => navigation.navigate('CreateAssignment')}>
            <Plus size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PREMIUM GRADIENT HERO CARD */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Keep your students engaged</Text>
            <Text style={styles.heroTitleSub}>with assignments.</Text>
          </View>
          <View style={styles.heroIconCircle}>
            <BookOpen size={30} color="#7c3aed" />
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

        {/* ASSIGNMENTS LIST */}
        <View style={styles.listContainer}>
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.asCard}
              onPress={() => navigation.navigate('AssignmentReview', { assignment: item })}
            >
              <View style={styles.asTopRow}>
                <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                  <ClipboardCheck size={20} color={item.iconColor} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.subjectTitle}>{item.title}</Text>
                  <Text style={styles.classText}>{item.classSubject}</Text>
                  <Text style={styles.dueText}>{item.due}</Text>
                  <Text style={styles.progressText}>{item.progress}</Text>
                </View>

                <View style={styles.rightBadgeRow}>
                  <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                    <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                  </View>
                  <ChevronRight size={18} color="#cbd5e1" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  heroCard: {
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroTitleSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  asCard: {
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
  asTopRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subjectTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  classText: { fontSize: 12, color: '#64748b', marginTop: 3, fontWeight: '600' },
  dueText: { fontSize: 11, color: '#94a3b8', marginTop: 4, fontWeight: '700' },
  progressText: { fontSize: 12, fontWeight: '800', color: '#0f172a', marginTop: 4 },
  rightBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10
  },
  statusText: { fontSize: 11, fontWeight: '800' }
});
