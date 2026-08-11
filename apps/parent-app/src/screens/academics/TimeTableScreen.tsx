import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, ChevronDown, Coffee, FileEdit } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TimeTableScreen({ navigation }: any) {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const periodsList = [
    { period: 1, time: '08:00 AM –\n08:45 AM', subject: 'English', teacher: 'Mrs. Priya', room: '12' },
    { period: 2, time: '08:45 AM –\n09:30 AM', subject: 'Mathematics', teacher: 'Mr. Rajesh', room: '14' },
    { isBreak: true, time: '09:30 AM – 09:45 AM', label: 'Break' },
    { period: 3, time: '09:45 AM –\n10:30 AM', subject: 'Science', teacher: 'Mrs. Neha', room: '16' },
    { period: 4, time: '10:30 AM –\n11:15 AM', subject: 'Social Studies', teacher: 'Mr. Amit', room: '13' },
    { isBreak: true, time: '11:15 AM – 11:30 AM', label: 'Break' },
    { period: 5, time: '11:30 AM –\n12:15 PM', subject: 'Hindi', teacher: 'Mrs. Kavita', room: '11' },
    { period: 6, time: '12:15 PM –\n01:00 PM', subject: 'Computer', teacher: 'Mr. Sandeep', room: '15' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Time Table</Text>
        <TouchableOpacity style={styles.calBtn}>
          <CalendarIcon size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Class & Term Header Card (Blue Banner) */}
        <LinearGradient
          colors={['#1d4ed8', '#2563eb', '#3b82f6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.blueBanner}
        >
          <View style={styles.bannerLeft}>
            <Text style={styles.classTitle}>Class 5th – A</Text>
            <TouchableOpacity style={styles.termDropdownRow} activeOpacity={0.8}>
              <Text style={styles.termText}>Term 1 (2024-25)</Text>
              <ChevronDown size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* 3D Timetable Graphic Box */}
          <View style={styles.graphicBox}>
            <CalendarIcon size={38} color="#ffffff" strokeWidth={1.8} />
          </View>
        </LinearGradient>

        {/* Day Selector Tabs Row */}
        <View style={styles.daysRow}>
          {days.map((day, idx) => {
            const isActive = selectedDay === day;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.dayPill, isActive && styles.dayPillActive]}
                onPress={() => setSelectedDay(day)}
                activeOpacity={0.75}
              >
                <Text style={[styles.dayPillText, isActive && styles.dayPillTextActive]}>{day}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Period Schedule Table Card */}
        <View style={styles.tableCard}>
          {/* Table Header Row */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.thCell, { width: 42, textAlign: 'center' }]}>Period</Text>
            <Text style={[styles.thCell, { width: 85 }]}>Time</Text>
            <Text style={[styles.thCell, { flex: 1 }]}>Subject</Text>
            <Text style={[styles.thCell, { flex: 1 }]}>Teacher</Text>
            <Text style={[styles.thCell, { width: 40, textAlign: 'center' }]}>Room</Text>
          </View>

          {/* Table Body Rows */}
          {periodsList.map((item, idx) => {
            if (item.isBreak) {
              return (
                <View key={idx} style={styles.breakRow}>
                  <Text style={styles.breakTimeText}>{item.time}</Text>
                  <View style={styles.breakCenterGroup}>
                    <Coffee size={14} color="#7c3aed" />
                    <Text style={styles.breakLabelText}>{item.label}</Text>
                  </View>
                </View>
              );
            }

            return (
              <View key={idx} style={[styles.trRow, idx < periodsList.length - 1 && styles.rowBorder]}>
                <Text style={styles.tdPeriod}>{item.period}</Text>
                <Text style={styles.tdTime}>{item.time}</Text>
                <Text style={styles.tdSubject}>{item.subject}</Text>
                <Text style={styles.tdTeacher}>{item.teacher}</Text>
                <Text style={styles.tdRoom}>{item.room}</Text>
              </View>
            );
          })}
        </View>

        {/* Bottom Note Card */}
        <View style={styles.noteCard}>
          <View style={styles.noteIconBox}>
            <FileEdit size={16} color="#d97706" />
          </View>
          <View style={styles.noteRightCol}>
            <Text style={styles.noteTitle}>Note</Text>
            <Text style={styles.noteSub}>
              Time table is subject to change. Please check the notice board for updates.
            </Text>
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

  // Blue Banner
  blueBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  bannerLeft: { flex: 1 },
  classTitle: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  termDropdownRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  termText: { fontSize: 13, color: '#bfdbfe', fontWeight: '600' },
  graphicBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Days Row
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  dayPill: {
    flex: 1,
    marginHorizontal: 2,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dayPillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  dayPillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  dayPillTextActive: { color: '#ffffff', fontWeight: '900' },

  // Table Card
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: '#fafafa',
  },
  thCell: { fontSize: 11, fontWeight: '800', color: '#94a3b8' },

  trRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  tdPeriod: { width: 42, textAlign: 'center', fontSize: 13, fontWeight: '900', color: '#0f172a' },
  tdTime: { width: 85, fontSize: 10, fontWeight: '700', color: '#2563eb', lineHeight: 14 },
  tdSubject: { flex: 1, fontSize: 12, fontWeight: '800', color: '#0f172a' },
  tdTeacher: { flex: 1, fontSize: 11, color: '#64748b', fontWeight: '600' },
  tdRoom: { width: 40, textAlign: 'center', fontSize: 12, fontWeight: '800', color: '#475569' },

  // Break Row
  breakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fdf2f8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fce7f3',
  },
  breakTimeText: { fontSize: 11, fontWeight: '700', color: '#7c3aed' },
  breakCenterGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  breakLabelText: { fontSize: 12, fontWeight: '900', color: '#7c3aed' },

  // Note Card
  noteCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  noteIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteRightCol: { flex: 1 },
  noteTitle: { fontSize: 13, fontWeight: '900', color: '#d97706' },
  noteSub: { fontSize: 11, color: '#1e40af', lineHeight: 16, fontWeight: '500', marginTop: 2 },
});
