import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, ChevronDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AttendanceScreen({ navigation }: any) {
  const [selectedMonth, setSelectedMonth] = useState('April 2025');

  const daysHeader = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calendar days setup
  const calendarDays = [
    { day: 30, isOtherMonth: true },
    { day: 31, isOtherMonth: true },
    { day: 1, status: 'normal' },
    { day: 2, status: 'normal' },
    { day: 3, status: 'normal' },
    { day: 4, status: 'normal' },
    { day: 5, status: 'normal' },
    { day: 6, status: 'normal' },
    { day: 7, status: 'normal' },
    { day: 8, status: 'absent' }, // Red 🔴
    { day: 9, status: 'normal' },
    { day: 10, status: 'normal' },
    { day: 11, status: 'normal' },
    { day: 12, status: 'normal' },
    { day: 13, status: 'normal' },
    { day: 14, status: 'normal' },
    { day: 15, status: 'normal' },
    { day: 16, status: 'normal' },
    { day: 17, status: 'normal' },
    { day: 18, status: 'leave' }, // Yellow 🟡
    { day: 19, status: 'normal' },
    { day: 20, status: 'normal' },
    { day: 21, status: 'present' }, // Green 🟢
    { day: 22, status: 'present' }, // Green 🟢
    { day: 23, status: 'normal' },
    { day: 24, status: 'normal' },
    { day: 25, status: 'normal' },
    { day: 26, status: 'normal' },
    { day: 27, status: 'normal' },
    { day: 28, status: 'normal' },
    { day: 29, status: 'normal' },
    { day: 30, status: 'normal' },
    { day: 1, isOtherMonth: true },
    { day: 2, isOtherMonth: true },
    { day: 3, isOtherMonth: true },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance</Text>
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
            {/* Circular Progress Ring 92% */}
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressRingOuter}>
                <Text style={styles.percentageText}>92%</Text>
              </View>
            </View>

            {/* Right Stats */}
            <View style={styles.bannerStats}>
              <Text style={styles.presentLabel}>Present Days</Text>
              <Text style={styles.presentVal}>22 / 24</Text>
              <Text style={styles.workingDaysSub}>Total Working Days</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Calendar Grid Card */}
        <View style={styles.calendarCard}>
          {/* Days Header Row */}
          <View style={styles.daysHeaderRow}>
            {daysHeader.map((d, i) => (
              <Text key={i} style={styles.dayHeaderText}>{d}</Text>
            ))}
          </View>

          {/* Dates Grid */}
          <View style={styles.datesGrid}>
            {calendarDays.map((item, idx) => {
              let circleStyle = styles.dateTextNormal;
              let bgStyle = null;

              if (item.status === 'absent') {
                circleStyle = styles.dateTextWhite;
                bgStyle = styles.bgAbsent;
              } else if (item.status === 'leave') {
                circleStyle = styles.dateTextWhite;
                bgStyle = styles.bgLeave;
              } else if (item.status === 'present') {
                circleStyle = styles.dateTextWhite;
                bgStyle = styles.bgPresent;
              }

              return (
                <View key={idx} style={styles.dateCell}>
                  {bgStyle ? (
                    <View style={[styles.statusCircle, bgStyle]}>
                      <Text style={circleStyle}>{item.day}</Text>
                    </View>
                  ) : (
                    <Text style={[
                      styles.dateTextNormal, 
                      item.isOtherMonth && styles.dateTextOtherMonth
                    ]}>
                      {item.day}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>

          {/* Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, styles.bgPresent]} />
              <Text style={styles.legendText}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, styles.bgAbsent]} />
              <Text style={styles.legendText}>Absent</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, styles.bgLeave]} />
              <Text style={styles.legendText}>Leave</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, styles.bgHoliday]} />
              <Text style={styles.legendText}>Holiday</Text>
            </View>
          </View>
        </View>

        {/* Attendance Summary (4-Column Cards) */}
        <Text style={styles.sectionTitle}>Attendance Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: '#f0fdf4' }]}>
            <Text style={[styles.summaryNum, { color: '#16a34a' }]}>22</Text>
            <Text style={styles.summarySub}>Present</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#fef2f2' }]}>
            <Text style={[styles.summaryNum, { color: '#ef4444' }]}>1</Text>
            <Text style={styles.summarySub}>Absent</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#fffbeb' }]}>
            <Text style={[styles.summaryNum, { color: '#d97706' }]}>1</Text>
            <Text style={styles.summarySub}>Leave</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#f1f5f9' }]}>
            <Text style={[styles.summaryNum, { color: '#475569' }]}>2</Text>
            <Text style={styles.summarySub}>Holiday</Text>
          </View>
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
});
