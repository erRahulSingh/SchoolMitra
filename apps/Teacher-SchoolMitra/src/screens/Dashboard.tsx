import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Calendar, Clock, CheckCircle2, AlertCircle, BookOpen, ChevronRight, UserCheck } from 'lucide-react-native';
import Logo from '../components/Logo';

const { width } = Dimensions.get('window');

export default function Dashboard({ navigation }: any) {
  const todayClasses = [
    { id: 'c1', subject: 'Mathematics', grade: 'Class 8-A', time: '08:30 AM - 09:15 AM', room: 'Room 204', attendanceMarked: true, count: 42 },
    { id: 'c2', subject: 'Algebra & Geometry', grade: 'Class 9-B', time: '10:00 AM - 10:45 AM', room: 'Room 302', attendanceMarked: false, count: 38 },
    { id: 'c3', subject: 'Applied Mathematics', grade: 'Class 10-C', time: '11:30 AM - 12:15 PM', room: 'Lab 01', attendanceMarked: false, count: 40 }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* TOP HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.teacherName}>Rahul Sharma</Text>
          </View>
        </View>

        {/* HERO BANNER CARD */}
        <View style={styles.heroCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>You have 3 classes today</Text>
            <Text style={styles.heroSub}>Keep going, you're doing great!</Text>
          </View>
          <View style={styles.heroBadge}>
            <Logo size={36} />
          </View>
        </View>

        {/* QUICK STATS METRICS */}
        <View style={styles.metricsRow}>
          <TouchableOpacity 
            style={[styles.metricCard, { borderLeftColor: '#10b981' }]}
            onPress={() => navigation.navigate('WeeklyTestList')}
          >
            <Text style={styles.metricVal}>Tests</Text>
            <Text style={styles.metricLabel}>Manage Weekly Tests</Text>
          </TouchableOpacity>
          <View style={[styles.metricCard, { borderLeftColor: '#6366f1' }]}>
            <Text style={styles.metricVal}>142</Text>
            <Text style={styles.metricLabel}>Enrolled Students</Text>
          </View>
        </View>

        {/* TODAY'S SCHEDULE SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Class Schedule</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Attendance')}>
            <Text style={styles.seeAll}>Mark Attendance</Text>
          </TouchableOpacity>
        </View>

        {todayClasses.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.classCard}
            onPress={() => navigation.navigate('Attendance', { classId: item.id })}
          >
            <View style={styles.classHeader}>
              <View>
                <Text style={styles.subjectName}>{item.subject}</Text>
                <Text style={styles.gradeText}>{item.grade} • {item.room}</Text>
              </View>
              {item.attendanceMarked ? (
                <View style={[styles.badge, { backgroundColor: '#dcfce7' }]}>
                  <CheckCircle2 size={14} color="#166534" />
                  <Text style={[styles.badgeText, { color: '#166534' }]}>Done</Text>
                </View>
              ) : (
                <View style={[styles.badge, { backgroundColor: '#fef3c7' }]}>
                  <AlertCircle size={14} color="#92400e" />
                  <Text style={[styles.badgeText, { color: '#92400e' }]}>Pending</Text>
                </View>
              )}
            </View>

            <View style={styles.classFooter}>
              <View style={styles.timeRow}>
                <Clock size={14} color="#64748b" />
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <View style={styles.studentCount}>
                <UserCheck size={14} color="#7c3aed" />
                <Text style={styles.countText}>{item.count} Students</Text>
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
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  teacherName: { fontSize: 22, fontWeight: '900', color: '#0f172a' },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#7c3aed', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#ffffff', fontWeight: '900', fontSize: 16 },
  heroCard: {
    backgroundColor: '#6d28d9',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4
  },
  heroTitle: { fontSize: 18, fontWeight: '800', color: '#ffffff' },
  heroSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4 },
  heroBadge: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
  metricsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  metricCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 16, borderLeftWidth: 4, elevation: 2 },
  metricVal: { fontSize: 22, fontWeight: '900', color: '#0f172a' },
  metricLabel: { fontSize: 12, color: '#64748b', marginTop: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#0f172a' },
  seeAll: { fontSize: 13, color: '#7c3aed', fontWeight: '700' },
  classCard: { backgroundColor: '#ffffff', borderRadius: 18, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  classHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  subjectName: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  gradeText: { fontSize: 13, color: '#64748b', marginTop: 2 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  classFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timeText: { fontSize: 13, color: '#64748b' },
  studentCount: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  countText: { fontSize: 13, color: '#7c3aed', fontWeight: '700' }
});
