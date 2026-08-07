import React from 'react';
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
  Download,
  ChevronDown,
  Trophy,
  BarChart3
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExamReportScreen({ navigation }: any) {
  const toppers = [
    { rank: '1', name: 'Aarav Sharma', score: '95%', color: '#d97706' },
    { rank: '2', name: 'Diya Verma', score: '92%', color: '#64748b' },
    { rank: '3', name: 'Rohan Singh', score: '90%', color: '#b45309' }
  ];

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

        {/* DROPDOWN SELECTORS ROW */}
        <View style={styles.dropdownRow}>
          <TouchableOpacity style={styles.dropdownField} onPress={() => Alert.alert('Class', 'Select Class...')}>
            <Text style={styles.dropdownVal}>Class 8 - A</Text>
            <ChevronDown size={16} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.dropdownField} onPress={() => Alert.alert('Exam', 'Select Exam...')}>
            <Text style={styles.dropdownVal}>Unit Test - 1</Text>
            <ChevronDown size={16} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* 3 STATS BOXES */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { borderColor: '#e2e8f0' }]}>
            <Text style={[styles.statVal, { color: '#7c3aed' }]}>36</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <View style={[styles.statBox, { borderColor: '#e2e8f0' }]}>
            <Text style={[styles.statVal, { color: '#16a34a' }]}>28</Text>
            <Text style={styles.statLabel}>Passed</Text>
          </View>
          <View style={[styles.statBox, { borderColor: '#e2e8f0' }]}>
            <Text style={[styles.statVal, { color: '#dc2626' }]}>8</Text>
            <Text style={styles.statLabel}>Failed</Text>
          </View>
        </View>

        {/* PERFORMANCE OVERVIEW */}
        <Text style={styles.sectionTitle}>Performance Overview</Text>
        <View style={styles.overviewCard}>
          {/* Mock Donut Chart */}
          <View style={styles.donutContainer}>
            <View style={styles.donutCircle}>
              <Text style={styles.donutPercent}>78%</Text>
              <Text style={styles.donutSub}>Pass Rate</Text>
            </View>
          </View>

          {/* Chart Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#16a34a' }]} />
              <Text style={styles.legendText}>Passed: 28 (78%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#dc2626' }]} />
              <Text style={styles.legendText}>Failed: 8 (22%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#94a3b8' }]} />
              <Text style={styles.legendText}>Absent: 0 (0%)</Text>
            </View>
          </View>
        </View>

        {/* TOP PERFORMERS */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Top Performers</Text>
          <TouchableOpacity onPress={() => Alert.alert('View All', 'Showing all class performers...')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* TOP PERFORMERS LIST */}
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
  dropdownRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  dropdownField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  dropdownVal: { fontSize: 13, fontWeight: '700', color: '#475569' },
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
  topperScore: { fontSize: 13, fontWeight: '900', color: '#7c3aed' }
});
