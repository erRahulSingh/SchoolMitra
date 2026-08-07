import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AttendanceScreen({ navigation }: any) {
  const [selectedMonth] = useState('August 2025');
  const summary = { present: 22, absent: 1, late: 1, total: 24, percentage: '91.7%' };
  const records = [
    { date: '07 Aug', day: 'Thu', status: 'Present', time: '08:35 AM', teacher: 'Rahul Sharma' },
    { date: '06 Aug', day: 'Wed', status: 'Present', time: '08:30 AM', teacher: 'Rahul Sharma' },
    { date: '05 Aug', day: 'Tue', status: 'Absent', time: '-', teacher: '-' },
    { date: '04 Aug', day: 'Mon', status: 'Present', time: '08:32 AM', teacher: 'Rahul Sharma' },
    { date: '01 Aug', day: 'Fri', status: 'Late', time: '09:15 AM', teacher: 'Priya Singh' },
    { date: '31 Jul', day: 'Thu', status: 'Present', time: '08:28 AM', teacher: 'Rahul Sharma' }
  ];

  const getStatusStyle = (status: string) => {
    if (status === 'Present') return { color: '#16a34a', bg: '#dcfce7', icon: CheckCircle2 };
    if (status === 'Absent') return { color: '#ef4444', bg: '#fef2f2', icon: XCircle };
    return { color: '#d97706', bg: '#fef3c7', icon: Clock };
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#4f46e5', '#6366f1']} style={styles.heroHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#ffffff" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Attendance Analytics</Text>
          <Calendar size={20} color="#ffffff" />
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}><Text style={styles.summaryVal}>{summary.present}</Text><Text style={styles.summaryLabel}>Present</Text></View>
          <View style={styles.summaryItem}><Text style={[styles.summaryVal, { color: '#fca5a5' }]}>{summary.absent}</Text><Text style={styles.summaryLabel}>Absent</Text></View>
          <View style={styles.summaryItem}><Text style={[styles.summaryVal, { color: '#fde68a' }]}>{summary.late}</Text><Text style={styles.summaryLabel}>Late</Text></View>
          <View style={styles.summaryItem}><Text style={styles.summaryVal}>{summary.percentage}</Text><Text style={styles.summaryLabel}>Overall</Text></View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.monthPill}><Calendar size={14} color="#4f46e5" /><Text style={styles.monthText}>{selectedMonth}</Text></View>
        {records.map((r, idx) => {
          const s = getStatusStyle(r.status);
          const IconComp = s.icon;
          return (
            <View key={idx} style={styles.recordCard}>
              <View style={styles.dateCol}><Text style={styles.dateText}>{r.date}</Text><Text style={styles.dayText}>{r.day}</Text></View>
              <View style={{ flex: 1 }}>
                <View style={[styles.statusBadge, { backgroundColor: s.bg }]}><IconComp size={14} color={s.color} /><Text style={[styles.statusText, { color: s.color }]}>{r.status}</Text></View>
                {r.time !== '-' && <Text style={styles.timeText}>Marked at {r.time} by {r.teacher}</Text>}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  heroHeader: { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 24, paddingHorizontal: 16, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryVal: { fontSize: 22, fontWeight: '900', color: '#ffffff' },
  summaryLabel: { fontSize: 11, color: '#c7d2fe', fontWeight: '700', marginTop: 2 },
  scrollContent: { padding: 16, gap: 8 },
  monthPill: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: '#eef2ff', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, marginBottom: 12 },
  monthText: { fontSize: 13, fontWeight: '800', color: '#4f46e5' },
  recordCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#ffffff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  dateCol: { alignItems: 'center', width: 50 },
  dateText: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  dayText: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  statusText: { fontSize: 12, fontWeight: '800' },
  timeText: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 4 }
});
