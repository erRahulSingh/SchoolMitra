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
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Search,
  MoreVertical,
  Users,
  SlidersHorizontal,
  User
} from 'lucide-react-native';

export default function StudentsListScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const students = [
    { id: '1', name: 'Aarav Sharma', roll: 'Roll No. 1', status: 'Present', color: '#16a34a', bg: '#ecfdf5' },
    { id: '2', name: 'Diya Verma', roll: 'Roll No. 2', status: 'Present', color: '#16a34a', bg: '#ecfdf5' },
    { id: '3', name: 'Rohan Singh', roll: 'Roll No. 3', status: 'Present', color: '#16a34a', bg: '#ecfdf5' },
    { id: '4', name: 'Ananya Gupta', roll: 'Roll No. 4', status: 'Absent', color: '#dc2626', bg: '#fef2f2' },
    { id: '5', name: 'Kunal Patel', roll: 'Roll No. 5', status: 'Present', color: '#16a34a', bg: '#ecfdf5' },
    { id: '6', name: 'Meera Joshi', roll: 'Roll No. 6', status: 'Present', color: '#16a34a', bg: '#ecfdf5' }
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
        <Text style={styles.headerTitle}>Students List</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.actionIconBtn}>
            <Search size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIconBtn} onPress={() => Alert.alert('Options', 'More actions...')}>
            <MoreVertical size={18} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PURPLE CLASS DETAIL CARD */}
        <View style={styles.classCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.classCardTitle}>Class 8 - A</Text>
            <Text style={styles.classCardSub}>Mathematics</Text>
          </View>
          <View style={styles.classIconBadge}>
            <Users size={16} color="#ffffff" style={{ marginRight: 6 }} />
            <Text style={styles.classIconBadgeText}>42</Text>
          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <SlidersHorizontal size={18} color="#94a3b8" />
        </View>

        {/* STUDENT ROSTER LIST */}
        <View style={styles.rosterList}>
          {filteredStudents.map((item, idx) => (
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
