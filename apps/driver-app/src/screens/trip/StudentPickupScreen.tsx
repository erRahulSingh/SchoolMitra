import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Filter, Search, CheckCircle2, UserX, SkipForward } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function StudentPickupScreen({ navigation }: any) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(3);

  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Sharma', class: 'Class 5 – A', roll: 'Roll No. 12', status: 'Picked', time: '07:10 AM', initials: 'AS' },
    { id: 2, name: 'Siya Patel', class: 'Class 5 – A', roll: 'Roll No. 15', status: 'Picked', time: '07:11 AM', initials: 'SP' },
    { id: 3, name: 'Vivaan Singh', class: 'Class 5 – A', roll: 'Roll No. 18', status: 'Pending', time: '', initials: 'VS' },
  ]);

  const handleMarkPicked = () => {
    if (!selectedStudentId) return;
    setStudents(prev => prev.map(s => s.id === selectedStudentId ? { ...s, status: 'Picked', time: '07:12 AM' } : s));
  };

  const handleMarkAbsent = () => {
    if (!selectedStudentId) return;
    setStudents(prev => prev.map(s => s.id === selectedStudentId ? { ...s, status: 'Absent', time: '' } : s));
  };

  const filteredStudents = students.filter(s => {
    const matchesFilter = activeFilter === 'All' || s.status === activeFilter;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Pickup</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={20} color="#0f172a" />
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
            <Text style={styles.stopNumberText}>Stop 3 of 12</Text>
            <View style={styles.onTimeBadge}>
              <Text style={styles.onTimeText}>On Time</Text>
            </View>
          </View>

          <Text style={styles.stopNameText}>Maple Park</Text>
          <Text style={styles.etaText}>ETA: 07:12 AM  •  3 Students</Text>
        </LinearGradient>

        {/* Search Field */}
        <View style={styles.searchBarWrapper}>
          <Search size={18} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Student"
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Pills Row */}
        <View style={styles.pillsRow}>
          {['All (3)', 'Picked (2)', 'Pending (1)', 'Absent (0)'].map((pill, idx) => {
            const key = idx === 0 ? 'All' : idx === 1 ? 'Picked' : idx === 2 ? 'Pending' : 'Absent';
            const isActive = activeFilter === key;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.pillBtn, isActive && styles.pillActive]}
                onPress={() => setActiveFilter(key)}
                activeOpacity={0.75}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{pill}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Students List */}
        <View style={styles.listContainer}>
          {filteredStudents.map((student) => {
            const isSelected = selectedStudentId === student.id;
            return (
              <TouchableOpacity
                key={student.id}
                style={[styles.studentCard, isSelected && styles.studentCardSelected]}
                onPress={() => setSelectedStudentId(student.id)}
                activeOpacity={0.8}
              >
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{student.initials}</Text>
                </View>

                <View style={styles.studentInfoCol}>
                  <Text style={styles.studentNameText}>{student.name}</Text>
                  <Text style={styles.studentClassText}>{student.class}</Text>
                  <Text style={styles.studentRollText}>{student.roll}</Text>
                </View>

                {student.status === 'Picked' && (
                  <View style={styles.statusPickedBox}>
                    <Text style={styles.statusPickedText}>Picked</Text>
                    <Text style={styles.timeText}>{student.time}</Text>
                  </View>
                )}

                {student.status === 'Pending' && (
                  <View style={styles.statusPendingBox}>
                    <Text style={styles.statusPendingText}>Pending</Text>
                  </View>
                )}

                {student.status === 'Absent' && (
                  <View style={styles.statusAbsentBox}>
                    <Text style={styles.statusAbsentText}>Absent</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Buttons Group */}
        <View style={styles.actionButtonsGroup}>
          <TouchableOpacity
            style={styles.markPickedBtn}
            onPress={handleMarkPicked}
            activeOpacity={0.85}
          >
            <CheckCircle2 size={18} color="#ffffff" />
            <Text style={styles.markPickedBtnText}>Mark as Picked</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.markAbsentBtn}
            onPress={handleMarkAbsent}
            activeOpacity={0.85}
          >
            <UserX size={18} color="#ef4444" />
            <Text style={styles.markAbsentBtnText}>Mark as Absent</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn} activeOpacity={0.75}>
            <SkipForward size={16} color="#64748b" />
            <Text style={styles.skipBtnText}>Not Picked (Skip)</Text>
          </TouchableOpacity>
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
  onTimeBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  onTimeText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },
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
  pillsRow: { flexDirection: 'row', gap: 6, marginBottom: 16 },
  pillBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  pillText: { fontSize: 11, fontWeight: '700', color: '#64748b' },
  pillTextActive: { color: '#ffffff', fontWeight: '900' },

  // List
  listContainer: { gap: 12, marginBottom: 20 },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  studentCardSelected: { borderColor: '#2563eb', backgroundColor: '#f0f7ff' },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#3b82f6', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
  studentInfoCol: { flex: 1 },
  studentNameText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  studentClassText: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 2 },
  studentRollText: { fontSize: 10, color: '#94a3b8', fontWeight: '500', marginTop: 1 },

  statusPickedBox: { alignItems: 'flex-end' },
  statusPickedText: { fontSize: 11, fontWeight: '800', color: '#16a34a', backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  timeText: { fontSize: 10, color: '#94a3b8', fontWeight: '500', marginTop: 4 },

  statusPendingBox: { backgroundColor: '#ffedd5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusPendingText: { fontSize: 11, fontWeight: '800', color: '#ea580c' },

  statusAbsentBox: { backgroundColor: '#fee2e2', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusAbsentText: { fontSize: 11, fontWeight: '800', color: '#ef4444' },

  // Buttons
  actionButtonsGroup: { gap: 10 },
  markPickedBtn: {
    backgroundColor: '#16a34a',
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
  },
  markPickedBtnText: { fontSize: 14, fontWeight: '900', color: '#ffffff' },

  markAbsentBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#fee2e2',
  },
  markAbsentBtnText: { fontSize: 14, fontWeight: '900', color: '#ef4444' },

  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  skipBtnText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
});
