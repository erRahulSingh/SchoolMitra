import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
import {
  ChevronLeft,
  Calendar,
  ChevronRight,
  Bell
} from 'lucide-react-native';

export default function CalendarScreen({ navigation }: any) {
  const [selectedMonth, setSelectedMonth] = useState('May 2024');

  const calendarDays = [
    { day: '28', isPrevMonth: true }, { day: '29', isPrevMonth: true }, { day: '30', isPrevMonth: true },
    { day: '1', isHoliday: false }, { day: '2', isHoliday: false }, { day: '3', isHoliday: false }, { day: '4', isHoliday: false },
    { day: '5', isHoliday: false }, { day: '6', isHoliday: false }, { day: '7', isHoliday: false }, { day: '8', isHoliday: false },
    { day: '9', isHoliday: false }, { day: '10', isHoliday: false }, { day: '11', isHoliday: false }, { day: '12', isHoliday: false },
    { day: '13', isHoliday: false }, { day: '14', isHoliday: false }, { day: '15', isToday: true }, { day: '16', isHoliday: false },
    { day: '17', isHoliday: false }, { day: '18', isHoliday: false }, { day: '19', isHoliday: false }, { day: '20', isSpecial: true },
    { day: '21', isHoliday: false }, { day: '22', isHoliday: false }, { day: '23', isHoliday: false }, { day: '24', isHoliday: false },
    { day: '25', isHoliday: false }, { day: '26', isHoliday: false }, { day: '27', isHoliday: false }, { day: '28', isHoliday: false },
    { day: '29', isHoliday: false }, { day: '30', isHoliday: false }, { day: '31', isHoliday: false }, { day: '1', isNextMonth: true }
  ];

  const events = [
    { id: '1', day: '20', month: 'May', title: 'Staff Meeting', time: '03:00 PM - 04:00 PM', venue: 'Staff Room' },
    { id: '2', day: '25', month: 'May', title: 'Parents Meeting', time: '10:00 AM - 12:00 PM', venue: 'Seminar Hall' },
    { id: '3', day: '31', month: 'May', title: 'Science Exhibition', time: '09:00 AM - 02:00 PM', venue: 'School Auditorium' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity style={styles.calendarBtn}>
          <Calendar size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* MONTH SWITCHER */}
        <View style={styles.monthHeaderRow}>
          <TouchableOpacity onPress={() => Alert.alert('Prev', 'Previous month...')}>
            <ChevronLeft size={20} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.monthTitleText}>{selectedMonth}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Next', 'Next month...')}>
            <ChevronRight size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* CALENDAR CONTAINER CARD */}
        <View style={styles.calendarCard}>
          <View style={styles.weekHeader}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w) => (
              <Text key={w} style={styles.weekText}>{w}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.dayCell,
                  item.isToday && styles.todayCell,
                  item.isSpecial && styles.specialCell
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    (item.isPrevMonth || item.isNextMonth) && { color: '#cbd5e1' },
                    item.isToday && { color: '#ffffff' },
                    item.isSpecial && { color: '#ea580c' }
                  ]}
                >
                  {item.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* UPCOMING EVENTS */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => Alert.alert('View All', 'Showing all upcoming school events...')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* EVENTS LIST */}
        <View style={styles.listContainer}>
          {events.map((e) => (
            <View key={e.id} style={styles.eventCard}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateDay}>{e.day}</Text>
                <Text style={styles.dateMonth}>{e.month}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{e.title}</Text>
                <Text style={styles.eventTime}>{e.time}</Text>
                <Text style={styles.eventVenue}>{e.venue}</Text>
              </View>

              <TouchableOpacity
                style={styles.bellBtnInside}
                onPress={() => Alert.alert('Reminder', `Set reminder alarm for ${e.title}...`)}
              >
                <Bell size={18} color="#94a3b8" />
              </TouchableOpacity>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: Platform.OS === 'android' ? 64 + (StatusBar.currentHeight || 0) : 64
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
  monthHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10
  },
  monthTitleText: { fontSize: 15, fontWeight: '950', color: '#0f172a' },
  calendarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
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
  todayCell: {
    backgroundColor: '#2563eb'
  },
  specialCell: {
    borderWidth: 1.5,
    borderColor: '#ea580c',
    borderStyle: 'dashed'
  },
  dayText: { fontSize: 12, fontWeight: '800', color: '#0f172a' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  viewAllText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  listContainer: { gap: 12, marginBottom: 20 },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  dateBadge: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f1f5f9',
    paddingRight: 10
  },
  dateDay: { fontSize: 20, fontWeight: '950', color: '#7c3aed' },
  dateMonth: { fontSize: 11, color: '#94a3b8', fontWeight: '800', marginTop: 2 },
  eventTitle: { fontSize: 14, fontWeight: '900', color: '#334155', marginBottom: 4 },
  eventTime: { fontSize: 11, color: '#64748b', fontWeight: '650' },
  eventVenue: { fontSize: 11, color: '#94a3b8', fontWeight: '700', marginTop: 3 },
  bellBtnInside: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
