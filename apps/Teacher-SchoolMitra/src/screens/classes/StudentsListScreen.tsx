import React, { useState, useEffect, useCallback } from 'react';
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
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import {
  ChevronLeft,
  Search,
  MoreVertical,
  Users,
  SlidersHorizontal,
  User
} from 'lucide-react-native';
import { teacherApi } from '../../services/apiService';

export default function StudentsListScreen({ navigation, route }: any) {
  const classId = route?.params?.classId || '';
  const classNameParam = route?.params?.className || 'Class Students';

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStudents = useCallback(async () => {
    try {
      const res = await teacherApi.getStudents(classId).catch(() => null);
      if (res && (Array.isArray(res.students) || Array.isArray(res))) {
        const raw = Array.isArray(res.students) ? res.students : res;
        const mapped = raw.map((s: any, idx: number) => ({
          id: s.id || s._id || String(idx + 1),
          name: s.name || s.studentName || `Student ${idx + 1}`,
          roll: s.rollNo ? `Roll No. ${s.rollNo}` : (s.rollNumber ? `Roll No. ${s.rollNumber}` : `Roll No. ${idx + 1}`),
          status: s.status || 'Active',
          color: s.status === 'Absent' ? '#dc2626' : '#16a34a',
          bg: s.status === 'Absent' ? '#fef2f2' : '#ecfdf5',
          email: s.email || '',
          phone: s.phone || s.guardianPhone || '',
          parentName: s.parentName || s.fatherName || '',
          attendanceRate: s.attendanceRate || '95%'
        }));
        setStudents(mapped);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.warn('Students fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [classId]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStudents();
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.roll.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Students List</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.actionIconBtn}>
            <Search size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIconBtn} onPress={() => Alert.alert('Options', `${filteredStudents.length} students enrolled`)}>
            <MoreVertical size={18} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#7c3aed']} />}
      >
        {/* PURPLE CLASS DETAIL CARD */}
        <View style={styles.classCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.classCardTitle}>{classNameParam}</Text>
            <Text style={styles.classCardSub}>Enrolled Students Register</Text>
          </View>
          <View style={styles.classIconBadge}>
            <Users size={16} color="#ffffff" style={{ marginRight: 6 }} />
            <Text style={styles.classIconBadgeText}>{students.length}</Text>
          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search students by name or roll..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <SlidersHorizontal size={18} color="#94a3b8" />
        </View>

        {/* STUDENT ROSTER LIST */}
        <View style={styles.rosterList}>
          {loading ? (
            <View style={{ padding: 30, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#7c3aed" />
            </View>
          ) : filteredStudents.length === 0 ? (
            <View style={{ padding: 24, alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 12 }}>
              <Text style={{ fontSize: 13, color: '#94a3b8', fontWeight: '600' }}>
                {searchQuery ? 'No matching students found.' : 'No students registered in this class.'}
              </Text>
            </View>
          ) : (
            filteredStudents.map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                style={styles.studentCard}
                onPress={() => navigation.navigate('StudentProfile', { student: item })}
              >
                <View style={styles.avatarCircle}>
                  <User size={18} color="#7c3aed" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.studentName}>
                    {idx + 1}. {item.name}
                  </Text>
                  <Text style={styles.studentRoll}>{item.roll}</Text>
                </View>

                <View style={[styles.statusBadge, { backgroundColor: item.bg }]}>
                  <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
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
  headerRight: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    gap: 8
  },
  actionIconBtn: {
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
  classCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  classCardTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  classCardSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  classIconBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  classIconBadgeText: { fontSize: 13, color: '#ffffff', fontWeight: '900' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    height: 48
  },
  searchInput: { flex: 1, color: '#0f172a', fontWeight: '600', fontSize: 13 },
  rosterList: { gap: 10, marginBottom: 20 },
  studentCard: {
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
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  studentName: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  studentRoll: { fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: '600' },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10
  },
  statusText: { fontSize: 11, fontWeight: '900' }
});
