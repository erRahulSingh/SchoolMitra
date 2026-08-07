import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Award, Calendar } from 'lucide-react-native';

export default function ExamsScreen({ navigation }: any) {
  const exams = [
    { id: 1, name: 'Unit Test - 1', subject: 'Mathematics', date: '25 Aug 2025', time: '09:00 AM', maxMarks: 50, status: 'Upcoming' },
    { id: 2, name: 'Unit Test - 1', subject: 'Science', date: '26 Aug 2025', time: '09:00 AM', maxMarks: 50, status: 'Upcoming' },
    { id: 3, name: 'Unit Test - 1', subject: 'English', date: '27 Aug 2025', time: '09:00 AM', maxMarks: 50, status: 'Upcoming' },
    { id: 4, name: 'Weekly Test', subject: 'Hindi', date: '08 Aug 2025', time: '10:00 AM', maxMarks: 30, status: 'Completed', score: 28 },
    { id: 5, name: 'Weekly Test', subject: 'Maths', date: '01 Aug 2025', time: '10:00 AM', maxMarks: 30, status: 'Completed', score: 29 }
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity><Text style={styles.headerTitle}>Exams & Tests</Text><Award size={20} color="#4f46e5" /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {exams.map((e) => (
          <View key={e.id} style={styles.card}>
            <View style={styles.cardTop}><View style={[styles.badge, { backgroundColor: e.status === 'Upcoming' ? '#fef3c7' : '#dcfce7' }]}><Text style={{ fontSize: 10, fontWeight: '800', color: e.status === 'Upcoming' ? '#d97706' : '#16a34a' }}>{e.status}</Text></View></View>
            <Text style={styles.examName}>{e.name}</Text>
            <Text style={styles.subject}>{e.subject}</Text>
            <View style={styles.metaRow}><View style={styles.dateRow}><Calendar size={12} color="#94a3b8" /><Text style={styles.meta}>{e.date} • {e.time}</Text></View><Text style={styles.meta}>Max: {e.maxMarks}</Text></View>
            {(e as any).score !== undefined && <View style={styles.scoreRow}><Text style={styles.scoreLabel}>Score:</Text><Text style={styles.scoreVal}>{(e as any).score}/{e.maxMarks}</Text></View>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 10 },
  card: { backgroundColor: '#ffffff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTop: { marginBottom: 6 },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, alignSelf: 'flex-start' },
  examName: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  subject: { fontSize: 13, color: '#4f46e5', fontWeight: '700', marginTop: 2 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  meta: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, backgroundColor: '#f0fdf4', padding: 8, borderRadius: 10 },
  scoreLabel: { fontSize: 12, color: '#64748b', fontWeight: '700' },
  scoreVal: { fontSize: 16, fontWeight: '900', color: '#16a34a' }
});
