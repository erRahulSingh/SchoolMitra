import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar, Clock, MapPin, UserCheck, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react-native';

export default function TodayClassesScreen({ navigation }: any) {
  const classesList = [
    { id: 'c1', subject: 'Mathematics', grade: 'Class 8-A', time: '08:30 AM - 09:15 AM', room: 'Room 204', count: 42, marked: true },
    { id: 'c2', subject: 'Algebra & Geometry', grade: 'Class 9-B', time: '10:00 AM - 10:45 AM', room: 'Room 302', count: 38, marked: false },
    { id: 'c3', subject: 'Applied Mathematics', grade: 'Class 10-C', time: '11:30 AM - 12:15 PM', room: 'Lab 01', count: 40, marked: false }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Scheduled Classes</Text>
        <Calendar size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {classesList.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.card}
            onPress={() => navigation.navigate('Attendance', { classId: item.id })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.subjectTitle}>{item.subject}</Text>
              {item.marked ? (
                <View style={[styles.badge, { backgroundColor: '#dcfce7' }]}>
                  <CheckCircle2 size={14} color="#166534" />
                  <Text style={[styles.badgeText, { color: '#166534' }]}>Attendance Marked</Text>
                </View>
              ) : (
                <View style={[styles.badge, { backgroundColor: '#fef3c7' }]}>
                  <AlertCircle size={14} color="#92400e" />
                  <Text style={[styles.badgeText, { color: '#92400e' }]}>Pending Mark</Text>
                </View>
              )}
            </View>

            <Text style={styles.gradeText}>{item.grade}</Text>

            <View style={styles.cardFooter}>
              <View style={styles.metaRow}>
                <Clock size={14} color="#64748b" />
                <Text style={styles.metaText}>{item.time}</Text>
              </View>

              <View style={styles.metaRow}>
                <MapPin size={14} color="#7c3aed" />
                <Text style={styles.metaText}>{item.room}</Text>
              </View>

              <View style={styles.metaRow}>
                <UserCheck size={14} color="#10b981" />
                <Text style={styles.metaText}>{item.count} Students</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  card: { backgroundColor: '#ffffff', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subjectTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  gradeText: { fontSize: 14, color: '#64748b', marginTop: 4, fontWeight: '600' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12, color: '#475569', fontWeight: '600' }
});
