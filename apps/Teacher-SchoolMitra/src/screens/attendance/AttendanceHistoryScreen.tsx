import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import {
  ChevronLeft,
  Calendar,
  ChevronRight,
  Search,
  ClipboardList
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AttendanceHistoryScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Daily');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Daily', 'Weekly', 'Monthly'];

  const students = [
    { id: '1', name: 'Aarav Sharma', status: 'Present', color: '#16a34a', bg: '#ecfdf5' },
    { id: '2', name: 'Diya Verma', status: 'Present', color: '#16a34a', bg: '#ecfdf5' },
    { id: '3', name: 'Rohan Singh', status: 'Absent', color: '#dc2626', bg: '#fef2f2' },
    { id: '4', name: 'Ananya Gupta', status: 'Present', color: '#16a34a', bg: '#ecfdf5' },
    { id: '5', name: 'Kunal Patel', status: 'Leave', color: '#ea580c', bg: '#fffbeb' },
    { id: '6', name: 'Pooja Yadav', status: 'Present', color: '#16a34a', bg: '#ecfdf5' }
  ];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance Report</Text>
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
            <Text style={styles.heroTitle}>Track student</Text>
            <Text style={styles.heroTitle}>attendance and</Text>
            <Text style={styles.heroTitleSub}>view detailed attendance reports.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <ClipboardList size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TABS PILLS */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabPill, activeTab === tab && styles.tabPillActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabPillText, activeTab === tab && styles.tabPillTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DATE SELECTOR ROW */}
        <View style={styles.dateSelectorRow}>
          <TouchableOpacity onPress={() => Alert.alert('Prev', 'Previous day...')}>
            <ChevronLeft size={20} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.dateSelectorText}>24 May 2024</Text>
          <TouchableOpacity onPress={() => Alert.alert('Next', 'Next day...')}>
            <ChevronRight size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* 4 STATS ROW */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#f1f5f9' }]}>
            <Text style={[styles.statVal, { color: '#2563eb' }]}>36</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#ecfdf5' }]}>
            <Text style={[styles.statVal, { color: '#16a34a' }]}>32</Text>
            <Text style={styles.statLabel}>Present</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fef2f2' }]}>
            <Text style={[styles.statVal, { color: '#dc2626' }]}>3</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fffbeb' }]}>
            <Text style={[styles.statVal, { color: '#ea580c' }]}>1</Text>
            <Text style={styles.statLabel}>Leave</Text>
          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Search size={18} color="#94a3b8" style={styles.searchIcon} />
        </View>

        {/* STUDENT ROSTER LIST */}
        <View style={styles.listContainer}>
          {filteredStudents.map((s) => (
            <View key={s.id} style={styles.studentCard}>
              <Text style={styles.studentName}>{s.name}</Text>
              <Text style={[styles.statusText, { color: s.color }]}>{s.status}</Text>
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
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tabPill: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabPillActive: { backgroundColor: '#7c3aed' },
  tabPillText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  tabPillTextActive: { color: '#ffffff' },
  dateSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10
  },
  dateSelectorText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statBox: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center'
  },
  statVal: { fontSize: 18, fontWeight: '950' },
  statLabel: { fontSize: 10, fontWeight: '800', color: '#64748b', marginTop: 2, textAlign: 'center' },
  searchBarContainer: {
    position: 'relative',
    marginBottom: 16
  },
  searchInput: {
    height: 46,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingLeft: 16,
    paddingRight: 40,
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600'
  },
  searchIcon: {
    position: 'absolute',
    right: 14,
    top: 14
  },
  listContainer: { gap: 10, marginBottom: 20 },
  studentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  studentName: { fontSize: 14, fontWeight: '800', color: '#334155' },
  statusText: { fontSize: 13, fontWeight: '900' }
});
