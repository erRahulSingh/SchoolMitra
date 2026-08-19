import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, StatusBar, Alert } from 'react-native';
import { ChevronLeft, Filter, Search, CheckCircle2, Flag } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

export default function StudentDropScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [studentsList, setStudentsList] = useState([
    { id: 1, name: 'Aarav Sharma', class: 'Class 5 – A', roll: 'Roll No. 12', dropped: false, initials: 'AS' },
    { id: 2, name: 'Siya Patel', class: 'Class 5 – A', roll: 'Roll No. 15', dropped: false, initials: 'SP' },
    { id: 3, name: 'Vivaan Singh', class: 'Class 5 – A', roll: 'Roll No. 18', dropped: false, initials: 'VS' },
    { id: 4, name: 'Ananya Verma', class: 'Class 5 – B', roll: 'Roll No. 21', dropped: false, initials: 'AV' },
    { id: 5, name: 'Rohan Mehta', class: 'Class 5 – B', roll: 'Roll No. 24', dropped: false, initials: 'RM' },
  ]);

  const handleDropSingle = async (id: number) => {
    const student = studentsList.find(s => s.id === id);
    if (student) {
      try {
        await fetch("http://localhost:5000/api/v1/driver/student/drop", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: id, studentName: student.name, status: "Dropped" })
        });
      } catch (e) {
        console.warn("Offline or backend unreachable, dropping student locally.");
      }
    }
    setStudentsList(prev => prev.map(s => s.id === id ? { ...s, dropped: true } : s));
  };

  const handleDropAll = () => {
    setStudentsList(prev => prev.map(s => ({ ...s, dropped: true })));
    Alert.alert('Drop Completed 🎉', 'All 22 students safely dropped at Green Valley School!', [
      { text: 'OK', onPress: () => navigation.navigate('EndTripSummary') }
    ]);
  };

  const droppedCount = studentsList.filter(s => s.dropped).length;
  const pendingCount = studentsList.length - droppedCount;

  const filteredStudents = studentsList.filter(s => {
    const matchesFilter = activeFilter === 'All' || (activeFilter === 'Dropped' ? s.dropped : !s.dropped);
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.card} />
      
      {/* Header Bar */}
      <View style={[styles.headerBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Student Drop</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Stop Banner */}
        <LinearGradient
          colors={['#1e3a8a', '#2563eb', '#1d4ed8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.stopBanner}
        >
          <View style={styles.stopHeaderRow}>
            <Text style={styles.stopNumberText}>Stop 12 of 12</Text>
            <View style={styles.lastStopBadge}>
              <Flag size={10} color="#ffffff" style={{ marginRight: 4 }} />
              <Text style={styles.lastStopText}>Last Stop</Text>
            </View>
          </View>

          <Text style={styles.stopNameText}>Green Valley School</Text>
          <Text style={styles.etaText}>ETA: 07:45 AM  •  22 Students</Text>
        </LinearGradient>

        {/* Search Field */}
        <View style={[styles.searchBarWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Search size={18} color="#94a3b8" />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search Student"
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Pills Row */}
        <View style={styles.pillsRow}>
          {[
            { label: 'All (22)', key: 'All' },
            { label: `Dropped (${droppedCount})`, key: 'Dropped' },
            { label: `Pending (${pendingCount})`, key: 'Pending' },
          ].map((pill, idx) => {
            const isActive = activeFilter === pill.key;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.pillBtn, 
                  { backgroundColor: colors.card, borderColor: colors.border },
                  isActive && styles.pillActive
                ]}
                onPress={() => setActiveFilter(pill.key)}
                activeOpacity={0.75}
              >
                <Text style={[
                  styles.pillText, 
                  { color: colors.textSecondary },
                  isActive && styles.pillTextActive
                ]}>{pill.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Students List */}
        <View style={styles.listContainer}>
          {filteredStudents.map((student) => (
            <View key={student.id} style={[styles.studentCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{student.initials}</Text>
              </View>

              <View style={styles.studentInfoCol}>
                <Text style={[styles.studentNameText, { color: colors.text }]}>{student.name}</Text>
                <Text style={[styles.studentMetaText, { color: colors.textSecondary }]}>{student.class}  •  {student.roll}</Text>
              </View>

              {student.dropped ? (
                <View style={styles.droppedBadge}>
                  <Text style={styles.droppedBadgeText}>Dropped</Text>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.dropBtnOutline}
                  onPress={() => handleDropSingle(student.id)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.dropBtnText}>Drop</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Drop All Students Button */}
        <TouchableOpacity
          style={styles.dropAllBtn}
          onPress={handleDropAll}
          activeOpacity={0.85}
        >
          <CheckCircle2 size={20} color="#ffffff" fill="#ffffff" />
          <Text style={styles.dropAllBtnText}>Drop All Students</Text>
        </TouchableOpacity>

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
  filterBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Stop Banner
  stopBanner: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  stopHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  stopNumberText: { fontSize: 12, color: '#bfdbfe', fontWeight: '700' },
  lastStopBadge: { backgroundColor: '#ef4444', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, flexDirection: 'row', alignItems: 'center' },
  lastStopText: { fontSize: 11, fontWeight: '800', color: '#ffffff' },
  stopNameText: { fontSize: 22, fontWeight: '900', color: '#ffffff' },
  etaText: { fontSize: 12, color: '#93c5fd', fontWeight: '600', marginTop: 4 },

  // Search
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
    marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 13, color: '#0f172a', fontWeight: '600' },

  // Pills
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

  // List
  listContainer: { gap: 12, marginBottom: 24 },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#3b82f6', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
  studentInfoCol: { flex: 1 },
  studentNameText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  studentMetaText: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 2 },

  dropBtnOutline: {
    borderWidth: 1.5,
    borderColor: '#2563eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  dropBtnText: { fontSize: 12, fontWeight: '800', color: '#2563eb' },
  droppedBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  droppedBadgeText: { fontSize: 12, fontWeight: '800', color: '#16a34a' },

  // Drop All Btn
  dropAllBtn: {
    backgroundColor: '#16a34a',
    borderRadius: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  dropAllBtnText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
});
