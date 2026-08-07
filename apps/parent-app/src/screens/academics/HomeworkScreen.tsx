import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, BookOpen, Clock, CheckCircle2, AlertCircle } from 'lucide-react-native';

export default function HomeworkScreen({ navigation }: any) {
  const homework = [
    { id: 1, subject: 'Mathematics', title: 'Exercise 8.2: Algebraic Expressions', teacher: 'Rahul Sharma', dueDate: 'Tomorrow', status: 'Pending', color: '#ef4444' },
    { id: 2, subject: 'Science', title: 'Chapter 5: Light & Reflection Notes', teacher: 'Priya Singh', dueDate: 'In 3 days', status: 'Pending', color: '#d97706' },
    { id: 3, subject: 'English', title: 'Essay: My Favorite Festival', teacher: 'Neha Gupta', dueDate: '05 Aug', status: 'Submitted', color: '#16a34a' },
    { id: 4, subject: 'Hindi', title: 'Chapter 4: Poem Summary', teacher: 'Kavita Devi', dueDate: '03 Aug', status: 'Submitted', color: '#16a34a' },
    { id: 5, subject: 'Social Science', title: 'Map Work: Indian States', teacher: 'Anil Kumar', dueDate: '01 Aug', status: 'Late', color: '#ef4444' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Homework</Text>
        <BookOpen size={20} color="#4f46e5" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {homework.map((hw) => (
          <View key={hw.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={[styles.subjectTag, { color: hw.status === 'Submitted' ? '#16a34a' : '#4f46e5' }]}>{hw.subject}</Text>
              <View style={[styles.statusBadge, { backgroundColor: hw.color + '15' }]}>
                {hw.status === 'Submitted' ? <CheckCircle2 size={12} color={hw.color} /> : hw.status === 'Late' ? <AlertCircle size={12} color={hw.color} /> : <Clock size={12} color={hw.color} />}
                <Text style={[styles.statusText, { color: hw.color }]}>{hw.status}</Text>
              </View>
            </View>
            <Text style={styles.hwTitle}>{hw.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.teacher}>By {hw.teacher}</Text>
              <Text style={styles.due}>Due: {hw.dueDate}</Text>
            </View>
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
  subjectTag: { fontSize: 12, fontWeight: '800' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '800' },
  hwTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  teacher: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  due: { fontSize: 12, color: '#ef4444', fontWeight: '700' }
});
