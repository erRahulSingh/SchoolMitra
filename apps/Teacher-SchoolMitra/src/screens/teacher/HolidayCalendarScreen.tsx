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
  ChevronRight,
  Sun,
  Flag,
  Award
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HolidayCalendarScreen({ navigation }: any) {
  const [currentMonth, setCurrentMonth] = useState('May 2024');

  const calendarDays = [
    { day: '', isHoliday: false }, { day: '', isHoliday: false }, { day: '1', isHoliday: false }, { day: '2', isHoliday: false }, { day: '3', isHoliday: false }, { day: '4', isHoliday: true }, { day: '5', isHoliday: true },
    { day: '6', isHoliday: false }, { day: '7', isHoliday: false }, { day: '8', isHoliday: false }, { day: '9', isHoliday: false }, { day: '10', isHoliday: false }, { day: '11', isHoliday: true }, { day: '12', isHoliday: true },
    { day: '13', isHoliday: false }, { day: '14', isHoliday: false }, { day: '15', isHoliday: false, isToday: true }, { day: '16', isHoliday: false }, { day: '17', isHoliday: false }, { day: '18', isHoliday: true }, { day: '19', isHoliday: true },
    { day: '20', isHoliday: false }, { day: '21', isHoliday: false }, { day: '22', isHoliday: false }, { day: '23', isHoliday: false }, { day: '24', isHoliday: false }, { day: '25', isHoliday: true, highlight: true }, { day: '26', isHoliday: true },
    { day: '27', isHoliday: true }, { day: '28', isHoliday: true }, { day: '29', isHoliday: true }, { day: '30', isHoliday: true }, { day: '31', isHoliday: true }
  ];

  const holidays = [
    {
      id: 'h_1',
      title: 'Summer Break',
      type: 'School Holiday',
      date: '25 May 2024 to 10 Jun 2024',
      icon: Sun,
      iconColor: '#ea580c',
      iconBg: '#ffedd5'
    },
    {
      id: 'h_2',
      title: 'Independence Day',
      type: 'National Holiday',
      date: '15 Aug 2024',
      icon: Flag,
      iconColor: '#16a34a',
      iconBg: '#ecfdf5'
    },
    {
      id: 'h_3',
      title: "Teachers' Day",
      type: 'School Holiday',
      date: '05 Sep 2024',
      icon: Award,
      iconColor: '#7c3aed',
      iconBg: '#f3e8ff'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Holiday Calendar</Text>
        <TouchableOpacity style={styles.calendarBtn}>
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
            <Text style={styles.heroTitle}>Plan ahead with</Text>
            <Text style={styles.heroTitleSub}>upcoming holidays and events.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Calendar size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* MONTH SWITCHER */}
        <View style={styles.monthHeaderRow}>
          <TouchableOpacity onPress={() => Alert.alert('Prev', 'Previous month...')}>
            <ChevronLeft size={20} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.monthTitleText}>{currentMonth}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Next', 'Next month...')}>
            <ChevronRight size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* CALENDAR CARD */}
        <View style={styles.calendarContainerCard}>
          <View style={styles.weekHeaderRow}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w) => (
              <Text key={w} style={styles.weekHeaderText}>{w}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.dayCell,
                  item.isToday && styles.todayCell,
                  item.highlight && styles.highlightCell
                ]}
              >
                <Text
                  style={[
                    styles.dayCellText,
                    item.isHoliday && { color: '#ea580c', fontWeight: '900' },
                    item.isToday && { color: '#7c3aed' },
                    item.highlight && { color: '#ffffff' }
                  ]}
                >
                  {item.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* UPCOMING HOLIDAYS */}
        <Text style={styles.sectionTitle}>Upcoming Holidays</Text>
        <View style={styles.listContainer}>
          {holidays.map((h) => {
            const IconComp = h.icon;
            return (
              <View key={h.id} style={styles.holidayCard}>
                <View style={[styles.iconBox, { backgroundColor: h.iconBg }]}>
                  <IconComp size={20} color={h.iconColor} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.holidayTitle}>{h.title}</Text>
                  <Text style={styles.holidayType}>{h.type}</Text>
                  <Text style={styles.holidayDate}>{h.date}</Text>
                </View>
              </View>
            );
          })}
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
    marginBottom: 20
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
  monthHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10
  },
  monthTitleText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  calendarContainerCard: {
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
  weekHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  weekHeaderText: { width: '13%', textAlign: 'center', fontSize: 11, fontWeight: '700', color: '#94a3b8' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8, justifyContent: 'space-between' },
  dayCell: {
    width: '13%',
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center'
  },
  todayCell: {
    borderWidth: 1.5,
    borderColor: '#7c3aed'
  },
  highlightCell: {
    backgroundColor: '#7c3aed'
  },
  dayCellText: { fontSize: 12, fontWeight: '800' },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  listContainer: { gap: 12, marginBottom: 20 },
  holidayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
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
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  holidayTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  holidayType: { fontSize: 12, color: '#64748b', marginTop: 3, fontWeight: '700' },
  holidayDate: { fontSize: 11, color: '#94a3b8', marginTop: 4, fontWeight: '600' }
});
