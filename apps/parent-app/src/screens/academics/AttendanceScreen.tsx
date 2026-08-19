import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, ChevronDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AttendanceScreen({ navigation }: any) {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');

  const daysHeader = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Daily History Roster
  const dailyHistory = [
    { date: '12 Aug 2026', day: 'Wednesday', status: 'Present', color: '#16a34a', bg: '#dcfce7' },
    { date: '11 Aug 2026', day: 'Tuesday', status: 'Present', color: '#16a34a', bg: '#dcfce7' },
    { date: '10 Aug 2026', day: 'Monday', status: 'Absent', color: '#dc2626', bg: '#fee2e2' },
    { date: '09 Aug 2026', day: 'Sunday', status: 'Present', color: '#16a34a', bg: '#dcfce7' },
    { date: '08 Aug 2026', day: 'Saturday', status: 'Late', color: '#ca8a04', bg: '#fef9c3' },
    { date: '07 Aug 2026', day: 'Friday', status: 'Leave', color: '#9333ea', bg: '#f3e8ff' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance — August 2026</Text>
        <TouchableOpacity style={styles.calBtn}>
          <CalendarIcon size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Monthly Overview Card (Forest Green) */}
        <LinearGradient
          colors={['#064e3b', '#047857', '#0f766e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.greenBanner}
        >
          {/* Month Selector Dropdown */}
          <TouchableOpacity style={styles.monthDropdown} activeOpacity={0.8}>
            <Text style={styles.monthDropdownText}>{selectedMonth}</Text>
            <ChevronDown size={16} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.bannerBody}>
            {/* Circular Progress Ring 83.3% */}
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressRingOuter}>
                <Text style={styles.percentageText}>83.3%</Text>
              </View>
            </View>

            {/* Right Stats */}
            <View style={styles.bannerStats}>
              <Text style={styles.presentLabel}>Present Days</Text>
              <Text style={styles.presentVal}>20 / 24</Text>
              <Text style={styles.workingDaysSub}>Overall Attendance Rate: 83.3%</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Attendance Summary (4 Breakdown Cards: Present 20, Absent 2, Late 1, Leave 1) */}
        <Text style={styles.sectionTitle}>August 2026 Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: '#f0fdf4' }]}>
            <Text style={[styles.summaryNum, { color: '#16a34a' }]}>20</Text>
            <Text style={styles.summarySub}>Present</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#fef2f2' }]}>
            <Text style={[styles.summaryNum, { color: '#ef4444' }]}>2</Text>
            <Text style={styles.summarySub}>Absent</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#fffbeb' }]}>
            <Text style={[styles.summaryNum, { color: '#d97706' }]}>1</Text>
            <Text style={styles.summarySub}>Late</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#faf5ff' }]}>
            <Text style={[styles.summaryNum, { color: '#9333ea' }]}>1</Text>
            <Text style={styles.summarySub}>Leave</Text>
          </View>
        </View>

        {/* Daily Attendance History Timeline List */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Daily Attendance History</Text>
        <View style={styles.historyContainer}>
          {dailyHistory.map((item, idx) => (
            <View key={idx} style={styles.historyRow}>
              <View style={styles.historyLeft}>
                <CalendarIcon size={16} color="#64748b" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.historyDate}>{item.date}</Text>
                  <Text style={styles.historyDay}>{item.day}</Text>
                </View>
              </View>

              <View style={[styles.historyBadge, { backgroundColor: item.bg }]}>
                <Text style={[styles.historyStatusText, { color: item.color }]}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  calBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Green Banner
  greenBanner: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#047857',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  monthDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  monthDropdownText: { fontSize: 14, fontWeight: '800', color: '#ffffff' },
  bannerBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressCircleContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#34d399',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  progressRingOuter: { alignItems: 'center', justifyContent: 'center' },
  percentageText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  bannerStats: { flex: 1, marginLeft: 20 },
  presentLabel: { fontSize: 12, color: '#a7f3d0', fontWeight: '600' },
  presentVal: { fontSize: 24, fontWeight: '900', color: '#ffffff', marginVertical: 2 },
  workingDaysSub: { fontSize: 11, color: '#d1fae5', fontWeight: '500' },

  // Calendar Card
  calendarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  daysHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dayHeaderText: { flex: 1, textAlign: 'center', fontSize: 11, fontWeight: '800', color: '#64748b' },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
  },
  dateCell: {
    width: '14.28%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTextNormal: { fontSize: 13, fontWeight: '700', color: '#0f172a' },
  dateTextOtherMonth: { color: '#cbd5e1' },
  dateTextWhite: { fontSize: 13, fontWeight: '900', color: '#ffffff' },
  statusCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgPresent: { backgroundColor: '#22c55e' },
  bgAbsent: { backgroundColor: '#ef4444' },
  bgLeave: { backgroundColor: '#eab308' },
  bgHoliday: { backgroundColor: '#cbd5e1' },

  // Legend
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginTop: 6,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, fontWeight: '700', color: '#475569' },

  // Summary Grid
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  summaryGrid: { flexDirection: 'row', gap: 8 },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryNum: { fontSize: 18, fontWeight: '900' },
  summarySub: { fontSize: 10, fontWeight: '700', color: '#64748b', marginTop: 2 },

  // Daily History Timeline
  historyContainer: { gap: 10, marginTop: 4 },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  historyLeft: { flexDirection: 'row', alignItems: 'center' },
  historyDate: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  historyDay: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 1 },
  historyBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  historyStatusText: { fontSize: 12, fontWeight: '800' }
});
