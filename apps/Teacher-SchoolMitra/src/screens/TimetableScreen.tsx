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
  Clock
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TimetableScreen({ navigation }: any) {
  const [activeView, setActiveView] = useState('Day View');
  const [selectedDate, setSelectedDate] = useState('Monday, 20 May 2024');

  const schedule = [
    { id: '1', time: '08:00 AM\n- 08:45 AM', title: 'Period 1\nMathematics', info: 'Class 8 - A', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { id: '2', time: '08:45 AM\n- 09:30 AM', title: 'Period 2\nScience', info: 'Class 8 - A', color: '#16a34a', bg: '#ecfdf5', border: '#bbf7d0' },
    { id: '3', time: '09:30 AM\n- 09:45 AM', title: 'Break Time', info: '', color: '#d97706', bg: '#fff7ed', border: '#fed7aa', isBreak: true },
    { id: '4', time: '09:45 AM\n- 10:30 AM', title: 'Period 3\nMathematics', info: 'Class 9 - B', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { id: '5', time: '10:30 AM\n- 11:15 AM', title: 'Period 4\nMathematics', info: 'Class 8 - A', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { id: '6', time: '11:15 AM\n- 12:00 PM', title: 'Period 5\nScience', info: 'Class 9 - B', color: '#16a34a', bg: '#ecfdf5', border: '#bbf7d0' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Time Table</Text>
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
            <Text style={styles.heroTitle}>View and manage</Text>
            <Text style={styles.heroTitle}>your teaching schedule</Text>
            <Text style={styles.heroTitleSub}>effortlessly.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Calendar size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* SWITCH TABS VIEW */}
        <View style={styles.switchTabsContainer}>
          <TouchableOpacity
            style={[styles.switchTab, activeView === 'Day View' && styles.switchTabActive]}
            onPress={() => setActiveView('Day View')}
          >
            <Text style={[styles.switchTabText, activeView === 'Day View' && styles.switchTabTextActive]}>
              Day View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.switchTab, activeView === 'Week View' && styles.switchTabActive]}
            onPress={() => setActiveView('Week View')}
          >
            <Text style={[styles.switchTabText, activeView === 'Week View' && styles.switchTabTextActive]}>
              Week View
            </Text>
          </TouchableOpacity>
        </View>

        {/* DATE PICKER PAGER */}
        <View style={styles.datePagerRow}>
          <TouchableOpacity>
            <ChevronLeft size={20} color="#64748b" />
          </TouchableOpacity>
          <Text style={styles.dateText}>{selectedDate}</Text>
          <TouchableOpacity>
            <ChevronRight size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* SCHEDULE SLOTS LIST */}
        <View style={styles.slotsContainer}>
          {schedule.map((slot) => (
            <View key={slot.id} style={styles.slotRow}>
              {/* TIME COLUMN */}
              <View style={styles.timeCol}>
                <Text style={styles.timeVal}>{slot.time}</Text>
              </View>

              {/* CARD BLOCK */}
              <View
                style={[
                  styles.slotCard,
                  { backgroundColor: slot.bg, borderColor: slot.border }
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.slotTitle, { color: slot.color }]}>{slot.title}</Text>
                  {slot.info !== '' && (
                    <Text style={styles.slotInfo}>{slot.info}</Text>
                  )}
                </View>
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
  switchTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20
  },
  switchTab: { flex: 1, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  switchTabActive: { backgroundColor: '#ffffff' },
  switchTabText: { fontSize: 13, fontWeight: '750', color: '#64748b' },
  switchTabTextActive: { color: '#7c3aed', fontWeight: '900' },
  datePagerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  dateText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  slotsContainer: { gap: 14, marginBottom: 20 },
  slotRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  timeCol: { width: 90 },
  timeVal: { fontSize: 11, fontWeight: '800', color: '#94a3b8', lineHeight: 16 },
  slotCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center'
  },
  slotTitle: { fontSize: 13, fontWeight: '900', lineHeight: 18 },
  slotInfo: { fontSize: 11, color: '#64748b', fontWeight: '750', marginTop: 4 }
});
