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
  ChevronRight,
  User,
  FolderOpen
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeworkSubmissionsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Pending');

  const tabs = ['Pending (12)', 'Reviewed', 'All'];

  const submissions = [
    {
      id: 'sub_1',
      student: 'Aarav Sharma',
      class: 'Class 8 - A',
      title: 'Algebra Worksheet',
      time: 'Submitted on 22 May 2024, 06:30 PM',
      status: 'Pending',
      statusColor: '#ea580c',
      statusBg: '#fffbeb'
    },
    {
      id: 'sub_2',
      student: 'Diya Verma',
      class: 'Class 8 - A',
      title: 'Geometry Problems',
      time: 'Submitted on 22 May 2024, 05:45 PM',
      status: 'Pending',
      statusColor: '#ea580c',
      statusBg: '#fffbeb'
    },
    {
      id: 'sub_3',
      student: 'Rohan Singh',
      class: 'Class 8 - A',
      title: 'Trigonometry Questions',
      time: 'Submitted on 22 May 2024, 04:20 PM',
      status: 'Pending',
      statusColor: '#ea580c',
      statusBg: '#fffbeb'
    },
    {
      id: 'sub_4',
      student: 'Ananya Gupta',
      class: 'Class 8 - A',
      title: 'Algebra Worksheet',
      time: 'Submitted on 22 May 2024, 03:10 PM',
      status: 'Pending',
      statusColor: '#ea580c',
      statusBg: '#fffbeb'
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
        <Text style={styles.headerTitle}>Homework Review</Text>
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
            <Text style={styles.heroTitle}>Review homework</Text>
            <Text style={styles.heroTitle}>submissions and</Text>
            <Text style={styles.heroTitleSub}>provide feedback.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <FolderOpen size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TABS PILLS */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabPill, (activeTab === tab || (activeTab === 'Pending' && tab.startsWith('Pending'))) && styles.tabPillActive]}
              onPress={() => setActiveTab(tab.startsWith('Pending') ? 'Pending' : tab)}
            >
              <Text style={[styles.tabPillText, (activeTab === tab || (activeTab === 'Pending' && tab.startsWith('Pending'))) && styles.tabPillTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SUBMISSION LIST */}
        <View style={styles.listContainer}>
          {submissions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.submissionCard}
              onPress={() => Alert.alert('Review Submission', `Open detail review panel for ${item.student}...`)}
            >
              <View style={styles.studentInfoRow}>
                <View style={styles.avatarCircle}>
                  <User size={16} color="#7c3aed" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.studentName}>{item.student}</Text>
                  <Text style={styles.className}>{item.class}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                  <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.homeworkInfoRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.homeworkTitle}>{item.title}</Text>
                  <Text style={styles.homeworkTime}>{item.time}</Text>
                </View>
                <ChevronRight size={18} color="#94a3b8" />
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
  listContainer: { gap: 12, marginBottom: 20 },
  submissionCard: {
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
  studentInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  studentName: { fontSize: 14, fontWeight: '850', color: '#0f172a' },
  className: { fontSize: 11, color: '#64748b', fontWeight: '700', marginTop: 1 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: { fontSize: 10, fontWeight: '900' },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 12 },
  homeworkInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  homeworkTitle: { fontSize: 13, fontWeight: '900', color: '#334155' },
  homeworkTime: { fontSize: 11, color: '#94a3b8', fontWeight: '750', marginTop: 3 }
});
