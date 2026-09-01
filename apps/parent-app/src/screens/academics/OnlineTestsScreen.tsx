import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, FileText, ChevronRight, CheckCircle2, AlertCircle, Clock, Award, Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function OnlineTestsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Available');

  const tabs = ['Available', 'Completed', 'Analytics'];

  const availableTests = [
    { id: '1', title: 'Science Weekly Test 4', subject: 'Science • Ch-5 Plant Physiology', date: 'Due Tomorrow, 5:00 PM', duration: '30 Mins', questions: '15 MCQs', icon: FileText, color: '#2563eb', bg: '#dbeafe', badgeColor: '#ea580c', badgeBg: '#ffedd5', badgeText: 'Pending' },
    { id: '2', title: 'Math Algebra Quiz', subject: 'Mathematics • Quadratic Equations', date: 'Due 05 Sep, 11:59 PM', duration: '45 Mins', questions: '20 MCQs', icon: Award, color: '#7c3aed', bg: '#f3e8ff', badgeColor: '#ea580c', badgeBg: '#ffedd5', badgeText: 'Pending' },
  ];

  const completedTests = [
    { id: '3', title: 'English Grammar Test', subject: 'English • Tenses & Verbs', date: '28 Aug 2026', score: '18/20 (90%)', icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7', badgeColor: '#16a34a', badgeBg: '#dcfce7', badgeText: 'Passed' },
    { id: '4', title: 'History Mid-Term Quiz', subject: 'Social Studies • Ancient India', date: '20 Aug 2026', score: '15/20 (75%)', icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7', badgeColor: '#16a34a', badgeBg: '#dcfce7', badgeText: 'Passed' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Online Tests & Quizzes</Text>
        <TouchableOpacity style={styles.calBtn}>
          <CalendarIcon size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero Gradient Banner */}
        <LinearGradient
          colors={['#1e3a8a', '#2563eb', '#3b82f6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.bannerIconCircle}>
            <Award size={26} color="#ffffff" strokeWidth={2.2} />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={styles.heroTitle}>Weekly Online Assessment</Text>
            <Text style={styles.heroSub}>Test your conceptual understanding & track live ranks</Text>
          </View>
        </LinearGradient>

        {/* Switch Tabs Bar */}
        <View style={styles.switchTabsBar}>
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.switchTabBtn, isActive && styles.switchTabActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text style={[styles.switchTabText, isActive && styles.switchTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Main Content List */}
        {activeTab === 'Available' && (
          <>
            <Text style={styles.sectionTitle}>Active & Upcoming Tests ({availableTests.length})</Text>
            <View style={styles.cardList}>
              {availableTests.map((item) => {
                const IconComp = item.icon;
                return (
                  <View key={item.id} style={styles.testCard}>
                    <View style={styles.cardHeaderRow}>
                      <View style={[styles.iconSquare, { backgroundColor: item.bg }]}>
                        <IconComp size={20} color={item.color} strokeWidth={2.2} />
                      </View>

                      <View style={styles.testInfoCol}>
                        <Text style={styles.testTitleText}>{item.title}</Text>
                        <Text style={styles.testSubjectText}>{item.subject}</Text>
                      </View>

                      <View style={[styles.statusBadge, { backgroundColor: item.badgeBg }]}>
                        <AlertCircle size={12} color={item.badgeColor} />
                        <Text style={[styles.statusBadgeText, { color: item.badgeColor }]}>{item.badgeText}</Text>
                      </View>
                    </View>

                    <View style={styles.cardMetaRow}>
                      <View style={styles.metaItem}>
                        <Clock size={14} color="#64748b" />
                        <Text style={styles.metaText}>{item.duration}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <FileText size={14} color="#64748b" />
                        <Text style={styles.metaText}>{item.questions}</Text>
                      </View>
                      <Text style={styles.dueDateText}>{item.date}</Text>
                    </View>

                    <TouchableOpacity 
                      style={styles.startBtnWrapper} 
                      activeOpacity={0.85}
                      onPress={() => navigation.navigate('TestTaking', { testId: item.id, title: item.title })}
                    >
                      <LinearGradient
                        colors={['#2563eb', '#1d4ed8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.startGradientBtn}
                      >
                        <Play size={16} color="#ffffff" fill="#ffffff" />
                        <Text style={styles.startBtnText}>Start Test Now</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </>
        )}

        {activeTab === 'Completed' && (
          <>
            <Text style={styles.sectionTitle}>Attempted Assessments</Text>
            <View style={styles.cardList}>
              {completedTests.map((item) => (
                <View key={item.id} style={styles.completedCard}>
                  <View style={styles.cardHeaderRow}>
                    <View style={[styles.iconSquare, { backgroundColor: item.bg }]}>
                      <CheckCircle2 size={20} color={item.color} strokeWidth={2.2} />
                    </View>

                    <View style={styles.testInfoCol}>
                      <Text style={styles.testTitleText}>{item.title}</Text>
                      <Text style={styles.testSubjectText}>{item.subject}</Text>
                    </View>

                    <Text style={styles.scoreText}>{item.score}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {activeTab === 'Analytics' && (
          <View style={styles.analyticsPlaceholder}>
            <Award size={40} color="#3b82f6" />
            <Text style={styles.analyticsTitle}>Performance Overview</Text>
            <Text style={styles.analyticsSub}>Your average accuracy rate across online tests is 85%.</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  calBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  heroBanner: {
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  bannerIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTextCol: { flex: 1 },
  heroTitle: { fontSize: 17, fontWeight: '900', color: '#ffffff' },
  heroSub: { fontSize: 12, color: '#bfdbfe', fontWeight: '500', marginTop: 4 },

  switchTabsBar: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  switchTabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  switchTabActive: { backgroundColor: '#ffffff', elevation: 2 },
  switchTabText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  switchTextActive: { fontSize: 12, fontWeight: '900', color: '#2563eb' },

  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  cardList: { gap: 14 },
  testCard: {
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
  completedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconSquare: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  testInfoCol: { flex: 1 },
  testTitleText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  testSubjectText: { fontSize: 12, color: '#64748b', fontWeight: '500', marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, gap: 4 },
  statusBadgeText: { fontSize: 11, fontWeight: '800' },
  scoreText: { fontSize: 14, fontWeight: '900', color: '#16a34a' },
  cardMetaRow: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 12, marginTop: 12, gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12, fontWeight: '600', color: '#64748b' },
  dueDateText: { fontSize: 11, fontWeight: '700', color: '#ef4444', marginLeft: 'auto' },
  startBtnWrapper: { marginTop: 14 },
  startGradientBtn: { height: 44, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  startBtnText: { color: '#ffffff', fontSize: 14, fontWeight: '800' },
  analyticsPlaceholder: { padding: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', borderRadius: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  analyticsTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginTop: 12 },
  analyticsSub: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 6 }
});
