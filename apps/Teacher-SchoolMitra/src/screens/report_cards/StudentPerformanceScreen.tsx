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
  SlidersHorizontal,
  User,
  ChevronRight
} from 'lucide-react-native';

export default function StudentPerformanceScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Overview');

  const subjects = [
    { name: 'Mathematics', grade: 'A', score: '18/20', color: '#16a34a', bg: '#ecfdf5' },
    { name: 'Science', grade: 'A-', color: '#16a34a', bg: '#ecfdf5', score: '17/20' },
    { name: 'English', grade: 'B+', color: '#ea580c', bg: '#ffedd5', score: '15/20' },
    { name: 'Social Science', grade: 'A', color: '#16a34a', bg: '#ecfdf5', score: '17/20' },
    { name: 'Hindi', grade: 'B', color: '#ea580c', bg: '#ffedd5', score: '14/20' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Performance</Text>
        <TouchableOpacity style={styles.filterBtn} onPress={() => Alert.alert('Filter', 'Filter subjects...')}>
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
            <Text style={styles.studentName}>Aarav Sharma</Text>
            <Text style={styles.studentInfo}>Class 8 - A</Text>
            <Text style={styles.studentInfo}>Roll No. 1</Text>
          </View>
        </View>

        {/* TAB SELECTORS */}
        <View style={styles.tabRow}>
          {['Overview', 'Subject Wise', 'Test Wise'].map((tab) => (
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

        {/* OVERALL PERFORMANCE */}
        {activeTab === 'Overview' && (
          <View>
            <Text style={styles.sectionTitle}>Overall Performance</Text>
            <View style={styles.overallCard}>
              {/* Circular green ring */}
              <View style={styles.progressCircle}>
                <Text style={styles.progressVal}>82%</Text>
                <Text style={styles.progressLabel}>Overall Score</Text>
              </View>

              <View style={styles.statsCol}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Total Tests</Text>
                  <Text style={styles.statValRight}>12</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Average Score</Text>
                  <Text style={[styles.statValRight, { color: '#0f172a' }]}>16.4/20</Text>
                </View>
                <View style={[styles.statItem, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                  <Text style={styles.statLabel}>Rank</Text>
                  <Text style={[styles.statValRight, { color: '#7c3aed' }]}>3 / 42</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* SUBJECT WISE PERFORMANCE */}
        {(activeTab === 'Overview' || activeTab === 'Subject Wise') && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sectionTitle}>Subject Wise Performance</Text>
            <View style={styles.subjectsCard}>
              {subjects.map((sub, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.subjectRow,
                    idx === subjects.length - 1 && { borderBottomWidth: 0 }
                  ]}
                >
                  <Text style={styles.subjectName}>{sub.name}</Text>
                  
                  <View style={styles.subjectRight}>
                    <View style={[styles.gradeBadge, { backgroundColor: sub.bg }]}>
                      <Text style={[styles.gradeText, { color: sub.color }]}>{sub.grade}</Text>
                    </View>
                    <Text style={styles.scoreText}>{sub.score}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* RECENT TESTS */}
        {(activeTab === 'Overview' || activeTab === 'Test Wise') && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sectionTitle}>Recent Tests</Text>
            <View style={styles.recentCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.recentTitle}>Unit Test - 1 (Mathematics)</Text>
                <Text style={styles.recentDate}>28 May 2024</Text>
              </View>
              <Text style={styles.recentScore}>18/20</Text>
            </View>
          </View>
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
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  gradeText: { fontSize: 12, fontWeight: '950' },
  scoreText: { fontSize: 13, fontWeight: '800', color: '#475569', width: 60, textAlign: 'right' },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 30
  },
  recentTitle: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  recentDate: { fontSize: 12, color: '#94a3b8', marginTop: 4, fontWeight: '600' },
  recentScore: { fontSize: 15, fontWeight: '900', color: '#7c3aed' }
});
