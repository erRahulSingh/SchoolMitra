import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Calendar,
  ChevronDown
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExamScheduleScreen({ navigation }: any) {
  const [selectedRange, setSelectedRange] = useState('May - June 2024');

  const exams = [
    {
      id: 'ex_1',
      month: 'MAY',
      day: '28',
      title: 'Unit Test - 1',
      classSubject: 'Class 8 - A  •  Mathematics',
      time: '10:00 AM - 12:00 PM',
      status: 'Upcoming',
      statusColor: '#7c3aed',
      statusBg: '#f3e8ff',
      isPast: false
    },
    {
      id: 'ex_2',
      month: 'MAY',
      day: '30',
      title: 'Unit Test - 1',
      classSubject: 'Class 8 - A  •  Science',
      time: '10:00 AM - 12:00 PM',
      status: 'Upcoming',
      statusColor: '#7c3aed',
      statusBg: '#f3e8ff',
      isPast: false
    },
    {
      id: 'ex_3',
      month: 'JUN',
      day: '03',
      title: 'Half Yearly Exam',
      classSubject: 'Class 8 - A  •  English',
      time: '09:00 AM - 12:00 PM',
      status: 'Upcoming',
      statusColor: '#7c3aed',
      statusBg: '#f3e8ff',
      isPast: false
    },
    {
      id: 'ex_4',
      month: 'MAY',
      day: '15',
      title: 'Weekly Test - 4',
      classSubject: 'Class 8 - A  •  Social Science',
      time: '10:00 AM - 11:30 AM',
      status: 'Completed',
      statusColor: '#16a34a',
      statusBg: '#ecfdf5',
      isPast: true
    }
  ];

  const upcomingExams = exams.filter(e => !e.isPast);
  const pastExams = exams.filter(e => e.isPast);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exam Schedule</Text>
        <TouchableOpacity style={styles.calendarBtn} onPress={() => Alert.alert('Add Exam', 'Add new schedule...')}>
          <Calendar size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO CARD */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Stay updated with</Text>
            <Text style={styles.heroTitleSub}>all upcoming exams.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Calendar size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* MONTH RANGE DROPDOWN */}
        <TouchableOpacity
          style={styles.dropdownField}
          onPress={() => Alert.alert('Date Range', 'Select date range...')}
        >
          <Text style={styles.dropdownVal}>{selectedRange}</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* UPCOMING EXAMS */}
        <Text style={styles.sectionTitle}>Upcoming Exams</Text>
        <View style={styles.listContainer}>
          {upcomingExams.map((ex) => (
            <View key={ex.id} style={styles.examCard}>
              <View style={styles.dateBlock}>
                <Text style={styles.dateMonth}>{ex.month}</Text>
                <Text style={styles.dateDay}>{ex.day}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.examTitle}>{ex.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: ex.statusBg }]}>
                    <Text style={[styles.statusText, { color: ex.statusColor }]}>{ex.status}</Text>
                  </View>
                </View>
                <Text style={styles.classSubject}>{ex.classSubject}</Text>
                <Text style={styles.timeText}>{ex.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* PAST EXAMS */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Past Exams</Text>
        <View style={styles.listContainer}>
          {pastExams.map((ex) => (
            <View key={ex.id} style={styles.examCard}>
              <View style={[styles.dateBlock, { backgroundColor: '#f1f5f9' }]}>
                <Text style={[styles.dateMonth, { color: '#64748b' }]}>{ex.month}</Text>
                <Text style={[styles.dateDay, { color: '#475569' }]}>{ex.day}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.examTitle}>{ex.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: ex.statusBg }]}>
                    <Text style={[styles.statusText, { color: ex.statusColor }]}>{ex.status}</Text>
                  </View>
                </View>
                <Text style={styles.classSubject}>{ex.classSubject}</Text>
                <Text style={styles.timeText}>{ex.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: 64
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  backBtn: {
    position: 'absolute',
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  calendarBtn: {
    position: 'absolute',
    right: 20,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: {
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroTitleSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdownField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
  },
  dropdownVal: { fontSize: 14, fontWeight: '700', color: '#475569' },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  listContainer: { gap: 12 },
  examCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  dateBlock: {
    width: 54,
    height: 58,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateMonth: { fontSize: 10, color: '#3b82f6', fontWeight: '800' },
  dateDay: { fontSize: 20, color: '#2563eb', fontWeight: '950', marginTop: 2 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  examTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  classSubject: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  timeText: { fontSize: 11, color: '#94a3b8', marginTop: 4, fontWeight: '700' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: { fontSize: 10, fontWeight: '900' }
});
