import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, ChevronRight } from 'lucide-react-native';

export default function HolidaysScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('List View');

  const holidaysList = [
    { dateDay: '15', dateMonth: 'MAY', title: 'Holiday on Buddha Purnima', subText: 'Thursday', color: '#2563eb', bg: '#e0f2fe' },
    { dateDay: '26', dateMonth: 'MAY', title: 'Summer Break', subText: 'Monday - Saturday', color: '#ef4444', bg: '#fee2e2' },
    { dateDay: '06', dateMonth: 'JUN', title: 'Eid-ul-Adha', subText: 'Friday', color: '#7c3aed', bg: '#f3e8ff' },
    { dateDay: '15', dateMonth: 'AUG', title: 'Independence Day', subText: 'Friday', color: '#16a34a', bg: '#dcfce7' },
    { dateDay: '05', dateMonth: 'SEP', title: 'Teachers Day', subText: 'Friday', color: '#2563eb', bg: '#e0f2fe' },
    { dateDay: '02', dateMonth: 'OCT', title: 'Gandhi Jayanti', subText: 'Thursday', color: '#ea580c', bg: '#ffedd5' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Holiday Calendar</Text>
        <TouchableOpacity style={styles.calBtn}>
          <CalendarIcon size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Month Switcher Bar */}
        <View style={styles.monthSwitcherBar}>
          <TouchableOpacity style={styles.arrowBtn}>
            <ChevronLeft size={18} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.monthTitleText}>May 2025</Text>
          <TouchableOpacity style={styles.arrowBtn}>
            <ChevronRight size={18} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* View Switch Pills */}
        <View style={styles.pillsRow}>
          <TouchableOpacity
            style={[styles.pillBtn, activeTab === 'List View' && styles.pillActive]}
            onPress={() => setActiveTab('List View')}
            activeOpacity={0.75}
          >
            <Text style={[styles.pillText, activeTab === 'List View' && styles.pillTextActive]}>List View</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pillBtn, activeTab === 'Calendar View' && styles.pillActive]}
            onPress={() => setActiveTab('Calendar View')}
            activeOpacity={0.75}
          >
            <Text style={[styles.pillText, activeTab === 'Calendar View' && styles.pillTextActive]}>Calendar View</Text>
          </TouchableOpacity>
        </View>

        {/* Holiday List Cards */}
        <View style={styles.listContainer}>
          {holidaysList.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.holidayCard} activeOpacity={0.8}>
              <View style={[styles.dateSquare, { backgroundColor: item.bg }]}>
                <Text style={[styles.dateDayText, { color: item.color }]}>{item.dateDay}</Text>
                <Text style={[styles.dateMonthText, { color: item.color }]}>{item.dateMonth}</Text>
              </View>

              <View style={styles.holidayInfoCol}>
                <Text style={styles.holidayTitleText}>{item.title}</Text>
                <Text style={styles.holidaySubText}>{item.subText}</Text>
              </View>

              <ChevronRight size={18} color="#94a3b8" />
            </TouchableOpacity>
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

  // Month Switcher
  monthSwitcherBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  arrowBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  monthTitleText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },

  // View Pills
  pillsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  pillBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  pillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  pillTextActive: { color: '#ffffff', fontWeight: '900' },

  // Holiday List
  listContainer: { gap: 12 },
  holidayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  dateSquare: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDayText: { fontSize: 16, fontWeight: '900' },
  dateMonthText: { fontSize: 9, fontWeight: '900', marginTop: 1 },
  holidayInfoCol: { flex: 1 },
  holidayTitleText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  holidaySubText: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 2 },
});
