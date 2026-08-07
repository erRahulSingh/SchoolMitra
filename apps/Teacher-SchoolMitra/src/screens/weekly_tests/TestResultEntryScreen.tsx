import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  StatusBar
} from 'react-native';
import {
  ChevronLeft,
  Calendar,
  User,
  ClipboardCheck
} from 'lucide-react-native';
import { socketService } from '../../services/socketService';

export default function TestResultEntryScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');
  const [students, setStudents] = useState([
    { id: '1', name: 'Aarav Sharma', roll: 'Roll No. 1', marks: '18' },
    { id: '2', name: 'Diya Verma', roll: 'Roll No. 2', marks: '16' },
    { id: '3', name: 'Rohan Singh', roll: 'Roll No. 3', marks: '15' },
    { id: '4', name: 'Ananya Gupta', roll: 'Roll No. 4', marks: '20' },
    { id: '5', name: 'Kunal Patel', roll: 'Roll No. 5', marks: '17' },
    { id: '6', name: 'Meera Joshi', roll: 'Roll No. 6', marks: '18' },
    { id: '7', name: 'Arjun Mehta', roll: 'Roll No. 7', marks: '14' },
    { id: '8', name: 'Pooja Yadav', roll: 'Roll No. 8', marks: '19' }
  ]);

  const updateStudentMarks = (id: string, val: string) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, marks: val } : s))
    );
  };

  const handleSaveDraft = () => {
    Alert.alert('Draft Saved 💾', 'Marks saved as draft locally.');
  };

  const handleSubmitMarks = () => {
    socketService.syncWeeklyTest('Unit Test - 1', 'Class 8 - A', 20);
    Alert.alert('Success ✅', 'Marks submitted & synchronized live via Socket.IO!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Marks Entry</Text>
        <TouchableOpacity style={styles.calendarBtn}>
          <ClipboardCheck size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PURPLE CLASS DETAIL CARD */}
        <View style={styles.classCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.classCardTitle}>Unit Test - 1</Text>
            <Text style={styles.classCardSub}>Class 8 - A  •  Mathematics</Text>
            <View style={styles.timeRow}>
              <Calendar size={12} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.timeText}>28 May 2024  -  10:00 AM - 12:00 PM</Text>
            </View>
          </View>
          <View style={styles.gradeBadge}>
            <Text style={styles.gradeBadgeText}>A+</Text>
          </View>
        </View>

        {/* STAT TABS PILLS */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabPill, activeTab === 'All' && styles.tabPillActive]}
            onPress={() => setActiveTab('All')}
          >
            <Text style={[styles.tabPillText, activeTab === 'All' && styles.tabPillTextActive]}>
              All Students (42)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabPill, activeTab === 'Pending' && styles.tabPillActive]}
            onPress={() => setActiveTab('Pending')}
          >
            <Text style={[styles.tabPillText, activeTab === 'Pending' && styles.tabPillTextActive]}>
              Not Entered (5)
            </Text>
          </TouchableOpacity>
        </View>

        {/* COLUMN HEADERS */}
        <View style={styles.columnHeaders}>
          <Text style={styles.colTitle}>Student Name</Text>
          <Text style={styles.colTitle}>Marks (out of 20)</Text>
        </View>

        {/* STUDENT ROSTER LIST */}
        <View style={styles.rosterList}>
          {students.map((item, idx) => (
            <View key={item.id} style={styles.studentRow}>
              <View style={styles.avatarCircle}>
                <User size={18} color="#7c3aed" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.studentName}>
                  {idx + 1}. {item.name}
                </Text>
              </View>

              {/* Score input box */}
              <TextInput
                style={styles.scoreInput}
                keyboardType="numeric"
                value={item.marks}
                onChangeText={(val) => updateStudentMarks(item.id, val)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM ACTION BUTTONS */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.draftBtn} onPress={handleSaveDraft}>
          <Text style={styles.draftBtnText}>Save as Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitMarks}>
          <Text style={styles.submitBtnText}>Submit Marks</Text>
        </TouchableOpacity>
      </View>
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
  classCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  classCardTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  classCardSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  timeText: { fontSize: 11, color: '#ffffff', fontWeight: '700' },
  gradeBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff'
  },
  gradeBadgeText: { fontSize: 16, fontWeight: '950', color: '#ffffff' },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
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
  columnHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  colTitle: { fontSize: 12, fontWeight: '800', color: '#94a3b8' },
  rosterList: { gap: 10, marginBottom: 20 },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 60,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  studentName: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  scoreInput: {
    width: 60,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a'
  },
  bottomBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  draftBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  draftBtnText: { fontSize: 14, fontWeight: '800', color: '#7c3aed' },
  submitBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
