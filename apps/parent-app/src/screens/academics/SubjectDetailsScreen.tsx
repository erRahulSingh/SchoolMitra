import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, BookOpen, TrendingUp, Award } from 'lucide-react-native';

export default function SubjectDetailsScreen({ navigation }: any) {
  const subjects = [
    { name: 'Mathematics', teacher: 'Rahul Sharma', avgScore: '96%', grade: 'A+', color: '#4f46e5', bg: '#eef2ff' },
    { name: 'Science', teacher: 'Priya Singh', avgScore: '90%', grade: 'A+', color: '#16a34a', bg: '#f0fdf4' },
    { name: 'English', teacher: 'Neha Gupta', avgScore: '84%', grade: 'A', color: '#d97706', bg: '#fffbeb' },
    { name: 'Hindi', teacher: 'Kavita Devi', avgScore: '88%', grade: 'A+', color: '#e11d48', bg: '#fce7f3' },
    { name: 'Social Science', teacher: 'Anil Kumar', avgScore: '80%', grade: 'A', color: '#0284c7', bg: '#ecfeff' },
    { name: 'Computer Science', teacher: 'Vikash Yadav', avgScore: '92%', grade: 'A+', color: '#9333ea', bg: '#f5f3ff' }
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity><Text style={styles.headerTitle}>Subject Details</Text><BookOpen size={20} color="#4f46e5" /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {subjects.map((s, idx) => (
          <TouchableOpacity key={idx} style={styles.card} activeOpacity={0.7}>
            <View style={[styles.iconBox, { backgroundColor: s.bg }]}><BookOpen size={20} color={s.color} /></View>
            <View style={{ flex: 1 }}><Text style={styles.subjectName}>{s.name}</Text><Text style={styles.teacher}>Teacher: {s.teacher}</Text></View>
            <View style={styles.scoreCol}><Text style={[styles.avgScore, { color: s.color }]}>{s.avgScore}</Text><View style={[styles.gradeBadge, { backgroundColor: s.bg }]}><Text style={[styles.gradeText, { color: s.color }]}>{s.grade}</Text></View></View>
          </TouchableOpacity>
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
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#ffffff', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  iconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  subjectName: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  teacher: { fontSize: 12, color: '#64748b', fontWeight: '600', marginTop: 2 },
  scoreCol: { alignItems: 'center' },
  avgScore: { fontSize: 16, fontWeight: '900' },
  gradeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 3 },
  gradeText: { fontSize: 11, fontWeight: '900' }
});
