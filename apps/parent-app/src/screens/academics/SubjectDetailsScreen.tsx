import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, FileText, CheckCircle2, MoreVertical } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SubjectDetailsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Syllabus', 'Teachers', 'Materials'];

  const topicsCovered = [
    'Large Numbers',
    'Addition & Subtraction',
    'Multiplication & Division',
    'Fractions',
    'Measurement',
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4338ca" />

      {/* Top Header Banner (Purple Gradient) */}
      <LinearGradient
        colors={['#4338ca', '#6366f1', '#4f46e5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.purpleHeaderBanner}
      >
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.backBtnWhite} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <ChevronLeft size={22} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitleWhite}>Subject Details</Text>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.subjectHeroRow}>
          <View style={styles.whiteIconCircle}>
            <FileText size={26} color="#4338ca" strokeWidth={2.2} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.subjectTitleText}>Mathematics</Text>
            <Text style={styles.subjectSubText}>Class 5th – A</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Switch Pills Row */}
        <View style={styles.pillsRow}>
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.pillBtn, isActive && styles.pillActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.75}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Overview Content */}
        <View style={styles.overviewCard}>
          <Text style={styles.descriptionText}>
            Mathematics helps us develop logical thinking and problem solving skills.
          </Text>

          {/* 2-Column Stats Cards */}
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: '#f5f3ff' }]}>
              <View style={styles.statTopRow}>
                <Text style={styles.statLabelText}>Total Chapters</Text>
                <MoreVertical size={14} color="#7c3aed" />
              </View>
              <Text style={[styles.statNumText, { color: '#7c3aed' }]}>12</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: '#f0f9ff' }]}>
              <View style={styles.statTopRow}>
                <Text style={styles.statLabelText}>Assessments</Text>
                <MoreVertical size={14} color="#0284c7" />
              </View>
              <Text style={[styles.statNumText, { color: '#0284c7' }]}>5</Text>
            </View>
          </View>
        </View>

        {/* Topics Covered Section */}
        <View style={styles.topicsCard}>
          <Text style={styles.topicsTitle}>Topics Covered</Text>

          {topicsCovered.map((topic, idx) => (
            <View key={idx} style={styles.topicRow}>
              <CheckCircle2 size={18} color="#16a34a" fill="#dcfce7" />
              <Text style={styles.topicNameText}>{topic}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  purpleHeaderBanner: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backBtnWhite: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitleWhite: { fontSize: 17, fontWeight: '900', color: '#ffffff' },
  subjectHeroRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  whiteIconCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
  subjectTitleText: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  subjectSubText: { fontSize: 12, color: '#c7d2fe', fontWeight: '600', marginTop: 2 },

  scrollContent: { padding: 16, paddingBottom: 100 },

  // Pills Row
  pillsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  pillBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  pillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  pillTextActive: { color: '#ffffff', fontWeight: '900' },

  // Overview Card
  overviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  descriptionText: { fontSize: 13, color: '#334155', lineHeight: 18, fontWeight: '600', marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statBox: { flex: 1, borderRadius: 16, padding: 12 },
  statTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statLabelText: { fontSize: 11, fontWeight: '700', color: '#64748b' },
  statNumText: { fontSize: 22, fontWeight: '900', marginTop: 4 },

  // Topics Card
  topicsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  topicsTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  topicRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  topicNameText: { fontSize: 13, fontWeight: '800', color: '#334155' },
});
