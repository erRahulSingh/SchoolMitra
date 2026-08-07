import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Download,
  BarChart2,
  TrendingUp,
  Award,
  AlertCircle,
  Send,
  Users,
  CheckCircle2
} from 'lucide-react-native';

export default function WeeklyTestAnalyticsScreen({ navigation }: any) {
  const analyticsData = {
    className: 'Class 8-A',
    subject: 'Mathematics',
    totalTestsConducted: 5,
    classAverage: '85.6%',
    passRate: '92.8%',
    highestScore: '25 / 25',
    lowestScore: '08 / 25'
  };

  const testTrends = [
    { title: 'Test #1', score: 18.2, percent: 72 },
    { title: 'Test #2', score: 19.5, percent: 78 },
    { title: 'Test #3', score: 20.8, percent: 83 },
    { title: 'Test #4', score: 21.4, percent: 85 },
    { title: 'Test #5', score: 22.1, percent: 88 }
  ];

  const remedialStudents = [
    { roll: '03', name: 'Rohan Verma', score: '08/25', status: 'Needs Practice' },
    { roll: '14', name: 'Siddharth Rao', score: '09/25', status: 'Needs Practice' }
  ];

  const handleExportPDF = () => {
    Alert.alert('Exporting Report 📄', 'Downloading Weekly Test Performance Analytics PDF...');
  };

  const handleSendRemedialNotes = () => {
    Alert.alert('Study Material Shared 📚', 'Remedial worksheets & practice links sent to parents of low-scoring students.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weekly Test Analytics</Text>
        <TouchableOpacity style={styles.exportBtn} onPress={handleExportPDF}>
          <Download size={20} color="#7c3aed" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HERO CARD */}
        <View style={styles.heroCard}>
          <Text style={styles.heroClass}>{analyticsData.className} • {analyticsData.subject}</Text>
          <Text style={styles.heroTitle}>Performance Overview ({analyticsData.totalTestsConducted} Tests)</Text>

          <View style={styles.heroStatsRow}>
            <View>
              <Text style={styles.heroVal}>{analyticsData.classAverage}</Text>
              <Text style={styles.heroLabel}>Class Avg %</Text>
            </View>
            <View style={styles.divider} />
            <View>
              <Text style={styles.heroVal}>{analyticsData.passRate}</Text>
              <Text style={styles.heroLabel}>Pass Rate</Text>
            </View>
          </View>
        </View>

        {/* 2x2 METRIC GRID */}
        <View style={styles.grid}>
          <View style={[styles.box, { borderLeftColor: '#7c3aed' }]}>
            <Text style={styles.val}>{analyticsData.classAverage}</Text>
            <Text style={styles.boxLabel}>Average Score</Text>
          </View>

          <View style={[styles.box, { borderLeftColor: '#10b981' }]}>
            <Text style={[styles.val, { color: '#10b981' }]}>{analyticsData.highestScore}</Text>
            <Text style={styles.boxLabel}>Highest Score</Text>
          </View>

          <View style={[styles.box, { borderLeftColor: '#3b82f6' }]}>
            <Text style={[styles.val, { color: '#3b82f6' }]}>{analyticsData.passRate}</Text>
            <Text style={styles.boxLabel}>Overall Pass %</Text>
          </View>

          <View style={[styles.box, { borderLeftColor: '#ef4444' }]}>
            <Text style={[styles.val, { color: '#ef4444' }]}>{remedialStudents.length}</Text>
            <Text style={styles.boxLabel}>Remedial Cases</Text>
          </View>
        </View>

        {/* SCORE PROGRESSION BARS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={18} color="#7c3aed" />
            <Text style={styles.sectionTitle}>Weekly Test Score Trend</Text>
          </View>

          {testTrends.map((t, index) => (
            <View key={index} style={styles.trendRow}>
              <View style={styles.trendLabelRow}>
                <Text style={styles.trendTitle}>{t.title}</Text>
                <Text style={styles.trendVal}>{t.score} pts ({t.percent}%)</Text>
              </View>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${t.percent}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* REMEDIAL STUDENTS LIST */}
        <View style={styles.remedialCard}>
          <View style={styles.remedialHeader}>
            <AlertCircle size={18} color="#dc2626" />
            <Text style={styles.remedialTitle}>Remedial Attention Needed ({remedialStudents.length})</Text>
          </View>

          {remedialStudents.map((rs, i) => (
            <View key={i} style={styles.remedialRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.remedialName}>{rs.name} (Roll {rs.roll})</Text>
                <Text style={styles.remedialSub}>Latest Score: {rs.score}</Text>
              </View>
              <View style={styles.remedialBadge}>
                <Text style={styles.remedialBadgeText}>{rs.status}</Text>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.remedialBtn} onPress={handleSendRemedialNotes}>
            <Send size={16} color="#ffffff" />
            <Text style={styles.remedialBtnText}>Send Practice Notes to Parents</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justify: 'center',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  exportBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3e8ff',
    justify: 'center',
    alignItems: 'center'
  },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: {
    backgroundColor: '#6d28d9',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16
  },
  heroClass: { fontSize: 13, fontWeight: '800', color: '#e9d5ff' },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff', marginTop: 4, marginBottom: 14 },
  heroStatsRow: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  heroVal: { fontSize: 22, fontWeight: '900', color: '#ffffff' },
  heroLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  divider: { width: 1, height: 32, backgroundColor: 'rgba(255, 255, 255, 0.3)' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  box: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  val: { fontSize: 22, fontWeight: '900', color: '#0f172a' },
  boxLabel: { fontSize: 12, color: '#64748b', marginTop: 4, fontWeight: '600' },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  trendRow: { marginBottom: 12 },
  trendLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  trendTitle: { fontSize: 12, fontWeight: '700', color: '#334155' },
  trendVal: { fontSize: 12, fontWeight: '800', color: '#7c3aed' },
  barBg: { height: 8, backgroundColor: '#f1f5f9', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#7c3aed', borderRadius: 4 },
  remedialCard: {
    backgroundColor: '#fff1f2',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fecdd3',
    marginBottom: 20
  },
  remedialHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  remedialTitle: { fontSize: 15, fontWeight: '800', color: '#991b1b' },
  remedialRow: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ffe4e6'
  },
  remedialName: { fontSize: 13, fontWeight: '800', color: '#7f1d1d' },
  remedialSub: { fontSize: 11, color: '#991b1b', marginTop: 2 },
  remedialBadge: { backgroundColor: '#fecdd3', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  remedialBadgeText: { fontSize: 10, fontWeight: '900', color: '#991b1b' },
  remedialBtn: {
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#dc2626',
    height: 44,
    borderRadius: 12,
    marginTop: 14
  },
  remedialBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 13 }
});
