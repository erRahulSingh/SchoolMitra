import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
import {
  ChevronLeft,
  Calendar,
  MoreVertical,
  ClipboardList
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExamScheduleScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const tabs = ['Upcoming', 'Ongoing', 'Completed'];

  const exams = [
    {
      id: 'ex_1',
      day: '25',
      month: 'May',
      title: 'Unit Test - 1',
      class: 'Class 8 - A (Mathematics)',
      time: '25 May 2024  •  10:00 AM',
      students: 'Total Students: 36',
      status: 'Upcoming',
      statusColor: '#2563eb',
      statusBg: '#eff6ff'
    },
    {
      id: 'ex_2',
      day: '05',
      month: 'Jun',
      title: 'Half Yearly Exam',
      class: 'Class 9 - B (Science)',
      time: '05 Jun 2024  •  09:00 AM',
      students: 'Total Students: 34',
      status: 'Upcoming',
      statusColor: '#2563eb',
      statusBg: '#eff6ff'
    },
    {
      id: 'ex_3',
      day: '20',
      month: 'Jun',
      title: 'Unit Test - 2',
      class: 'Class 10 - A (English)',
      time: '20 Jun 2024  •  10:00 AM',
      students: 'Total Students: 32',
      status: 'Upcoming',
      statusColor: '#2563eb',
      statusBg: '#eff6ff'
    }
  ];

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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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

        {/* EXAM LIST */}
        <View style={styles.listContainer}>
          {exams.map((item) => (
            <View key={item.id} style={styles.examCard}>
              <View style={styles.dateCol}>
                <Text style={styles.dateDayText}>{item.day}</Text>
                <Text style={styles.dateMonthText}>{item.month}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.examTitle}>{item.title}</Text>
                <Text style={styles.examClass}>{item.class}</Text>
                <Text style={styles.examTime}>{item.time}</Text>
                <Text style={styles.examStudents}>{item.students}</Text>
              </View>

              <View style={styles.rightCol}>
                <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                  <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                </View>
                <TouchableOpacity onPress={() => Alert.alert('Options', 'Action triggers...')}>
                  <MoreVertical size={18} color="#94a3b8" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => Alert.alert('Create Exam', 'Open form to schedule a new exam...')}
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
  createBtnText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
