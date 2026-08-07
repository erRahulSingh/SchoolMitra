import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, FileText, Clock, CheckCircle2 } from 'lucide-react-native';

export default function AssignmentsScreen({ navigation }: any) {
  const assignments = [
    { id: 1, subject: 'Mathematics', title: 'Algebraic Expressions Term Project', maxMarks: 20, dueDate: '15 Aug 2025', status: 'Pending' },
    { id: 2, subject: 'Science', title: 'Working Model: Solar System', maxMarks: 25, dueDate: '20 Aug 2025', status: 'Pending' },
    { id: 3, subject: 'English', title: 'Book Report: The Secret Garden', maxMarks: 15, dueDate: '10 Aug 2025', status: 'Submitted', score: 14 },
    { id: 4, subject: 'Social Science', title: 'Project: Indian Freedom Fighters', maxMarks: 20, dueDate: '01 Aug 2025', status: 'Graded', score: 18 }
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity><Text style={styles.headerTitle}>Assignments</Text><FileText size={20} color="#4f46e5" /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {assignments.map((a) => (
          <View key={a.id} style={styles.card}>
            <View style={styles.cardTop}><Text style={styles.subjectTag}>{a.subject}</Text><View style={[styles.badge, { backgroundColor: a.status === 'Pending' ? '#fef3c7' : '#dcfce7' }]}>{a.status === 'Pending' ? <Clock size={12} color="#d97706" /> : <CheckCircle2 size={12} color="#16a34a" />}<Text style={{ fontSize: 11, fontWeight: '800', color: a.status === 'Pending' ? '#d97706' : '#16a34a' }}>{a.status}</Text></View></View>
            <Text style={styles.title}>{a.title}</Text>
            <View style={styles.metaRow}><Text style={styles.meta}>Max Marks: {a.maxMarks}</Text>{a.score !== undefined && <Text style={styles.score}>Score: {a.score}/{a.maxMarks}</Text>}<Text style={styles.meta}>Due: {a.dueDate}</Text></View>
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
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  subjectTag: { fontSize: 12, fontWeight: '800', color: '#4f46e5' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  title: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  meta: { fontSize: 11, color: '#64748b', fontWeight: '600' },
  score: { fontSize: 12, color: '#16a34a', fontWeight: '800' }
});
