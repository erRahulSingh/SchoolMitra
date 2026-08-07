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
  Award,
  ChevronLeft,
  Download,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Send,
  Users,
  Star
} from 'lucide-react-native';

export default function AssignmentReportScreen({ navigation }: any) {
  const reportData = {
    className: 'Class 8-A',
    subject: 'Mathematics',
    assignmentTitle: 'Term 1 Geometry 3D Proof Model',
    totalStudents: 42,
    submittedCount: 40,
    evaluatedCount: 30,
    avgScore: 44.5,
    maxScore: 50,
    completionRate: 95,
    onTimeRate: 90
  };

  const scoreDistribution = [
    { grade: 'A+ (45-50)', count: 18, color: '#10b981', percent: 60 },
    { grade: 'A (40-44)', count: 8, color: '#3b82f6', percent: 27 },
    { grade: 'B (35-39)', count: 3, color: '#f59e0b', percent: 10 },
    { grade: 'Needs Help (<35)', count: 1, color: '#ef4444', percent: 3 }
  ];

  const topStudents = [
    { roll: '01', name: 'Aarav Gupta', score: 48, grade: 'A+' },
    { roll: '04', name: 'Priya Nair', score: 47, grade: 'A+' },
    { roll: '12', name: 'Kabir Mehta', score: 46, grade: 'A+' }
  ];

  const pendingStudents = [
    { roll: '18', name: 'Vikram Singh', status: 'Not Submitted' },
    { roll: '24', name: 'Sneha Patel', status: 'Not Submitted' }
  ];

  const handleExport = () => {
    Alert.alert('Export Report 📄', 'Downloading Class 8-A Assignment Analytics PDF report...');
  };

  const handleSendReminders = () => {
    Alert.alert('Reminders Sent 🔔', 'Push notifications sent to 2 students with pending submissions!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assignment Report</Text>
        <TouchableOpacity style={styles.exportBtn} onPress={handleExport}>
          <Download size={20} color="#7c3aed" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HERO METRICS BANNER */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <Text style={styles.heroClass}>{reportData.className} • {reportData.subject}</Text>
            <View style={styles.badgeCompletion}>
              <Text style={styles.badgeText}>{reportData.completionRate}% Submitted</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>{reportData.assignmentTitle}</Text>

          <View style={styles.heroStatRow}>
            <View>
              <Text style={styles.heroVal}>{reportData.avgScore} / {reportData.maxScore}</Text>
              <Text style={styles.heroLabel}>Class Avg Score (89%)</Text>
            </View>

            <View style={styles.divider} />

            <View>
              <Text style={styles.heroVal}>{reportData.onTimeRate}%</Text>
              <Text style={styles.heroLabel}>On-Time Submissions</Text>
            </View>
          </View>
        </View>

        {/* 2x2 METRICS GRID */}
        <View style={styles.grid}>
          <View style={[styles.box, { borderLeftColor: '#7c3aed' }]}>
            <Text style={styles.val}>{reportData.submittedCount}</Text>
            <Text style={styles.boxLabel}>Total Submissions</Text>
          </View>

          <View style={[styles.box, { borderLeftColor: '#10b981' }]}>
            <Text style={[styles.val, { color: '#10b981' }]}>{reportData.evaluatedCount}</Text>
            <Text style={styles.boxLabel}>Evaluated Projects</Text>
          </View>

          <View style={[styles.box, { borderLeftColor: '#f59e0b' }]}>
            <Text style={[styles.val, { color: '#f59e0b' }]}>
              {reportData.submittedCount - reportData.evaluatedCount}
            </Text>
            <Text style={styles.boxLabel}>Pending Review</Text>
          </View>

          <View style={[styles.box, { borderLeftColor: '#ef4444' }]}>
            <Text style={[styles.val, { color: '#ef4444' }]}>
              {reportData.totalStudents - reportData.submittedCount}
            </Text>
            <Text style={styles.boxLabel}>Unsubmitted</Text>
          </View>
        </View>

        {/* SCORE DISTRIBUTION */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={18} color="#7c3aed" />
            <Text style={styles.sectionTitle}>Grade & Score Distribution</Text>
          </View>

          {scoreDistribution.map((item, idx) => (
            <View key={idx} style={styles.distRow}>
              <View style={styles.distLabelRow}>
                <Text style={styles.distGradeText}>{item.grade}</Text>
                <Text style={styles.distCountText}>{item.count} Students ({item.percent}%)</Text>
              </View>
              <View style={styles.distBarBg}>
                <View style={[styles.distBarFill, { width: `${item.percent}%`, backgroundColor: item.color }]} />
              </View>
            </View>
          ))}
        </View>

        {/* TOP PERFORMERS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Star size={18} color="#f59e0b" />
            <Text style={styles.sectionTitle}>Top Performers</Text>
          </View>

          {topStudents.map((st, i) => (
            <View key={i} style={styles.performerRow}>
              <View style={styles.rankCircle}>
                <Text style={styles.rankText}>#{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.performerName}>{st.name}</Text>
                <Text style={styles.performerRoll}>Roll {st.roll}</Text>
              </View>
              <View style={styles.scoreTag}>
                <Text style={styles.scoreTagText}>{st.score}/50 ({st.grade})</Text>
              </View>
            </View>
          ))}
        </View>

        {/* PENDING SUBMISSIONS ALERT CARD */}
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <AlertTriangle size={18} color="#dc2626" />
            <Text style={styles.alertTitle}>Missing Submissions ({pendingStudents.length})</Text>
          </View>

          {pendingStudents.map((ps, index) => (
            <View key={index} style={styles.pendingRow}>
              <Text style={styles.pendingName}>{ps.name} (Roll {ps.roll})</Text>
              <Text style={styles.pendingStatus}>{ps.status}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.reminderBtn} onPress={handleSendReminders}>
            <Send size={16} color="#ffffff" />
            <Text style={styles.reminderBtnText}>Send Reminder Alert to Pending</Text>
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
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  heroClass: { fontSize: 13, fontWeight: '800', color: '#e9d5ff' },
  badgeCompletion: { backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 11, fontWeight: '800', color: '#ffffff' },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff', marginBottom: 16 },
  heroStatRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  heroVal: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
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
  distRow: { marginBottom: 12 },
  distLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  distGradeText: { fontSize: 12, fontWeight: '700', color: '#334155' },
  distCountText: { fontSize: 12, fontWeight: '800', color: '#64748b' },
  distBarBg: { height: 8, backgroundColor: '#f1f5f9', borderRadius: 4, overflow: 'hidden' },
  distBarFill: { height: '100%', borderRadius: 4 },
  performerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  rankCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fef3c7',
    justify: 'center',
    alignItems: 'center'
  },
  rankText: { fontSize: 12, fontWeight: '900', color: '#d97706' },
  performerName: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  performerRoll: { fontSize: 11, color: '#94a3b8' },
  scoreTag: { backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  scoreTagText: { fontSize: 12, fontWeight: '800', color: '#15803d' },
  alertCard: {
    backgroundColor: '#fff1f2',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fecdd3',
    marginBottom: 20
  },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  alertTitle: { fontSize: 15, fontWeight: '800', color: '#991b1b' },
  pendingRow: {
    flexDirection: 'row',
    justify: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ffe4e6'
  },
  pendingName: { fontSize: 13, fontWeight: '700', color: '#7f1d1d' },
  pendingStatus: { fontSize: 12, color: '#dc2626', fontWeight: '800' },
  reminderBtn: {
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#dc2626',
    height: 44,
    borderRadius: 12,
    marginTop: 14
  },
  reminderBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 13 }
});
