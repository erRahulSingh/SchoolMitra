import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar, Clock } from 'lucide-react-native';

export default function TimeTableScreen({ navigation }: any) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timetable: Record<string, Array<{ period: number; subject: string; teacher: string; time: string; color: string }>> = {
    Monday: [
      { period: 1, subject: 'Mathematics', teacher: 'Rahul Sharma', time: '08:30 - 09:15', color: '#4f46e5' },
      { period: 2, subject: 'Science', teacher: 'Priya Singh', time: '09:15 - 10:00', color: '#16a34a' },
      { period: 3, subject: 'English', teacher: 'Neha Gupta', time: '10:15 - 11:00', color: '#d97706' },
      { period: 4, subject: 'Hindi', teacher: 'Kavita Devi', time: '11:00 - 11:45', color: '#e11d48' },
      { period: 5, subject: 'Social Science', teacher: 'Anil Kumar', time: '12:00 - 12:45', color: '#0284c7' },
      { period: 6, subject: 'Computer', teacher: 'Vikash Yadav', time: '12:45 - 01:30', color: '#9333ea' }
    ],
    Tuesday: [{ period: 1, subject: 'Science', teacher: 'Priya Singh', time: '08:30 - 09:15', color: '#16a34a' }, { period: 2, subject: 'Mathematics', teacher: 'Rahul Sharma', time: '09:15 - 10:00', color: '#4f46e5' }, { period: 3, subject: 'Hindi', teacher: 'Kavita Devi', time: '10:15 - 11:00', color: '#e11d48' }, { period: 4, subject: 'English', teacher: 'Neha Gupta', time: '11:00 - 11:45', color: '#d97706' }, { period: 5, subject: 'Art', teacher: 'Meena Das', time: '12:00 - 12:45', color: '#ec4899' }, { period: 6, subject: 'Physical Ed.', teacher: 'Sunil Rao', time: '12:45 - 01:30', color: '#10b981' }],
    Wednesday: [{ period: 1, subject: 'English', teacher: 'Neha Gupta', time: '08:30 - 09:15', color: '#d97706' }, { period: 2, subject: 'Mathematics', teacher: 'Rahul Sharma', time: '09:15 - 10:00', color: '#4f46e5' }, { period: 3, subject: 'Science', teacher: 'Priya Singh', time: '10:15 - 11:00', color: '#16a34a' }, { period: 4, subject: 'Computer', teacher: 'Vikash Yadav', time: '11:00 - 11:45', color: '#9333ea' }, { period: 5, subject: 'Social Science', teacher: 'Anil Kumar', time: '12:00 - 12:45', color: '#0284c7' }, { period: 6, subject: 'Hindi', teacher: 'Kavita Devi', time: '12:45 - 01:30', color: '#e11d48' }],
    Thursday: [{ period: 1, subject: 'Hindi', teacher: 'Kavita Devi', time: '08:30 - 09:15', color: '#e11d48' }, { period: 2, subject: 'Science', teacher: 'Priya Singh', time: '09:15 - 10:00', color: '#16a34a' }, { period: 3, subject: 'Mathematics', teacher: 'Rahul Sharma', time: '10:15 - 11:00', color: '#4f46e5' }, { period: 4, subject: 'English', teacher: 'Neha Gupta', time: '11:00 - 11:45', color: '#d97706' }, { period: 5, subject: 'Music', teacher: 'Geeta Rani', time: '12:00 - 12:45', color: '#f43f5e' }, { period: 6, subject: 'Social Science', teacher: 'Anil Kumar', time: '12:45 - 01:30', color: '#0284c7' }],
    Friday: [{ period: 1, subject: 'Mathematics', teacher: 'Rahul Sharma', time: '08:30 - 09:15', color: '#4f46e5' }, { period: 2, subject: 'English', teacher: 'Neha Gupta', time: '09:15 - 10:00', color: '#d97706' }, { period: 3, subject: 'Science', teacher: 'Priya Singh', time: '10:15 - 11:00', color: '#16a34a' }, { period: 4, subject: 'Hindi', teacher: 'Kavita Devi', time: '11:00 - 11:45', color: '#e11d48' }, { period: 5, subject: 'Computer', teacher: 'Vikash Yadav', time: '12:00 - 12:45', color: '#9333ea' }, { period: 6, subject: 'Library', teacher: 'Anita Verma', time: '12:45 - 01:30', color: '#64748b' }],
    Saturday: [{ period: 1, subject: 'Physical Ed.', teacher: 'Sunil Rao', time: '08:30 - 09:15', color: '#10b981' }, { period: 2, subject: 'Art', teacher: 'Meena Das', time: '09:15 - 10:00', color: '#ec4899' }, { period: 3, subject: 'Mathematics', teacher: 'Rahul Sharma', time: '10:15 - 11:00', color: '#4f46e5' }]
  };
  const currentPeriods = timetable[selectedDay] || [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity><Text style={styles.headerTitle}>Time Table</Text><Calendar size={20} color="#4f46e5" /></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayScroll} contentContainerStyle={styles.dayRow}>
        {days.map((day) => (
          <TouchableOpacity key={day} style={[styles.dayPill, selectedDay === day && styles.dayPillActive]} onPress={() => setSelectedDay(day)}>
            <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>{day.slice(0, 3)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {currentPeriods.map((p, idx) => (
          <View key={idx} style={styles.periodCard}>
            <View style={[styles.periodBadge, { backgroundColor: p.color + '15' }]}><Text style={[styles.periodNum, { color: p.color }]}>{p.period}</Text></View>
            <View style={{ flex: 1 }}><Text style={styles.subjectName}>{p.subject}</Text><Text style={styles.teacherName}>{p.teacher}</Text></View>
            <View style={styles.timeCol}><Clock size={12} color="#94a3b8" /><Text style={styles.timeText}>{p.time}</Text></View>
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
  dayScroll: { maxHeight: 50, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  dayRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, paddingVertical: 8 },
  dayPill: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 12, backgroundColor: '#f8fafc' },
  dayPillActive: { backgroundColor: '#4f46e5' },
  dayText: { fontSize: 13, fontWeight: '800', color: '#64748b' },
  dayTextActive: { color: '#ffffff' },
  scrollContent: { padding: 16, gap: 8 },
  periodCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#ffffff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  periodBadge: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  periodNum: { fontSize: 16, fontWeight: '900' },
  subjectName: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  teacherName: { fontSize: 12, color: '#64748b', fontWeight: '600', marginTop: 2 },
  timeCol: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 11, color: '#94a3b8', fontWeight: '600' }
});
