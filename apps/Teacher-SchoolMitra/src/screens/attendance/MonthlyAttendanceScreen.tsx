import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar, ChevronLeft } from 'lucide-react-native';

export default function MonthlyAttendanceScreen({ navigation }: any) {
  const dates = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    status: i === 3 || i === 10 || i === 17 || i === 24 ? 'Sunday' : i === 5 ? 'Absent' : i === 12 ? 'Leave' : 'Present'
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Monthly Attendance Grid</Text>
        <Calendar size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.monthHeader}>
          <Text style={styles.monthTitle}>August 2026</Text>
          <Text style={styles.subText}>Class 8-A Monthly Overview</Text>
        </View>

        <View style={styles.grid}>
          {dates.map((d) => (
            <View 
              key={d.day} 
              style={[
                styles.dayBox, 
                d.status === 'Present' && styles.presentBox,
                d.status === 'Absent' && styles.absentBox,
                d.status === 'Leave' && styles.leaveBox,
                d.status === 'Sunday' && styles.sundayBox
              ]}
            >
              <Text style={styles.dayNum}>{d.day}</Text>
              <Text style={styles.statusLabel}>{d.status[0]}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  monthHeader: { backgroundColor: '#6d28d9', borderRadius: 18, padding: 18, marginBottom: 16 },
  monthTitle: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  subText: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  dayBox: { width: '12.5%', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0' },
  presentBox: { backgroundColor: '#dcfce7', borderColor: '#86efac' },
  absentBox: { backgroundColor: '#fee2e2', borderColor: '#fca5a5' },
  leaveBox: { backgroundColor: '#fef3c7', borderColor: '#fde68a' },
  sundayBox: { backgroundColor: '#f1f5f9', borderColor: '#cbd5e1' },
  dayNum: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  statusLabel: { fontSize: 10, fontWeight: '700', color: '#475569', marginTop: 1 }
});
