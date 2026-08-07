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
  User,
  ChevronDown
} from 'lucide-react-native';

export default function StudentAttendanceReportScreen({ navigation }: any) {
  const [selectedPeriod, setSelectedPeriod] = useState('May 2024');

  const calendarDays = [
    { day: '', status: '' }, { day: '', status: '' }, { day: '1', status: '' }, { day: '2', status: '' }, { day: '3', status: '' }, { day: '4', status: 'H' }, { day: '5', status: 'H' },
    { day: '6', status: 'P' }, { day: '7', status: 'P' }, { day: '8', status: 'P' }, { day: '9', status: 'P' }, { day: '10', status: 'L' }, { day: '11', status: 'H' }, { day: '12', status: 'H' },
    { day: '13', status: 'P' }, { day: '14', status: 'P' }, { day: '15', status: 'LV' }, { day: '16', status: 'P' }, { day: '17', status: 'P' }, { day: '18', status: 'H' }, { day: '19', status: 'H' },
    { day: '20', status: 'P' }, { day: '21', status: 'P' }, { day: '22', status: 'P' }, { day: '23', status: 'P' }, { day: '24', status: 'P' }, { day: '25', status: 'H' }, { day: '26', status: 'H' },
    { day: '27', status: 'P' }, { day: '28', status: 'P' }, { day: '29', status: 'A' }, { day: '30', status: 'P' }, { day: '31', status: 'P' }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'P': return { bg: '#ecfdf5', border: '#16a34a', text: '#16a34a' };
      case 'A': return { bg: '#fef2f2', border: '#dc2626', text: '#dc2626' };
      case 'L': return { bg: '#fffbeb', border: '#ea580c', text: '#ea580c' };
      case 'LV': return { bg: '#f3e8ff', border: '#7c3aed', text: '#7c3aed' };
      case 'H': return { bg: '#f1f5f9', border: '#94a3b8', text: '#64748b' };
      default: return { bg: 'transparent', border: 'transparent', text: '#0f172a' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance Report</Text>
        <TouchableOpacity style={styles.reportBtn}>
          <Calendar size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* STUDENT PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <User size={28} color="#7c3aed" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.studentName}>Aarav Sharma</Text>
            <Text style={styles.studentInfo}>Roll No. 1  •  Class 8 - A</Text>
          </View>
        </View>

        {/* SELECT PERIOD dropdown */}
        <Text style={styles.selectLabel}>Select Period</Text>
        <TouchableOpacity
          style={styles.dropdownField}
          onPress={() => Alert.alert('Period', 'Select Period...')}
        >
          <Text style={styles.dropdownVal}>{selectedPeriod}</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* 4 STATS ROW */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#ecfdf5' }]}>
            <Text style={[styles.statVal, { color: '#16a34a' }]}>22</Text>
            <Text style={[styles.statLabel, { color: '#16a34a' }]}>Present</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fef2f2' }]}>
            <Text style={[styles.statVal, { color: '#dc2626' }]}>3</Text>
            <Text style={[styles.statLabel, { color: '#dc2626' }]}>Absent</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fffbeb' }]}>
            <Text style={[styles.statVal, { color: '#ea580c' }]}>1</Text>
            <Text style={[styles.statLabel, { color: '#ea580c' }]}>Late</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#f3e8ff' }]}>
            <Text style={[styles.statVal, { color: '#7c3aed' }]}>0</Text>
            <Text style={[styles.statLabel, { color: '#7c3aed' }]}>Leave</Text>
          </View>
        </View>

        <Text style={styles.workingDaysText}>Total Working Days: 26</Text>

        {/* ATTENDANCE CALENDAR */}
        <Text style={styles.sectionTitle}>Attendance Calendar</Text>
        <View style={styles.calendarCard}>
          <View style={styles.weekHeader}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(w => (
              <Text key={w} style={styles.weekText}>{w}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((item, idx) => {
              const stylesVal = getStatusStyle(item.status);
              return (
                <View
                  key={idx}
                  style={[
                    styles.dayCell,
                    item.day !== '' && {
                      backgroundColor: stylesVal.bg,
                      borderColor: stylesVal.border,
                      borderWidth: item.status !== '' ? 1 : 0
                    }
                  ]}
                >
                  <Text style={[styles.dayText, { color: stylesVal.text }]}>{item.day}</Text>
                </View>
              );
            })}
          </View>

          {/* Color legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#16a34a' }]} />
              <Text style={styles.legendLabel}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#dc2626' }]} />
              <Text style={styles.legendLabel}>Absent</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#ea580c' }]} />
              <Text style={styles.legendLabel}>Late</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#7c3aed' }]} />
              <Text style={styles.legendLabel}>Leave</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#94a3b8' }]} />
              <Text style={styles.legendLabel}>Holiday</Text>
            </View>
          </View>
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
  reportBtn: {
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
  profileCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  studentName: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  studentInfo: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 2, fontWeight: '600' },
  selectLabel: { fontSize: 13, fontWeight: '800', color: '#475569', marginBottom: 8, marginTop: 10 },
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
    marginBottom: 16
  },
  dropdownVal: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statBox: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center'
  },
  statVal: { fontSize: 18, fontWeight: '900' },
  statLabel: { fontSize: 10, fontWeight: '700', marginTop: 2, textAlign: 'center' },
  workingDaysText: { fontSize: 13, fontWeight: '800', color: '#0f172a', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  calendarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
  },
  weekHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  weekText: { width: '13%', textAlign: 'center', fontSize: 11, fontWeight: '700', color: '#94a3b8' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, justifyContent: 'space-between' },
  dayCell: {
    width: '13%',
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayText: { fontSize: 12, fontWeight: '800' },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 14,
    marginTop: 16,
    justifyContent: 'center'
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { fontSize: 11, color: '#64748b', fontWeight: '700' }
});
