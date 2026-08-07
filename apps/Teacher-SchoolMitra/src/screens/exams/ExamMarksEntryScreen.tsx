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
  ChevronDown,
  FileText,
  User,
  ClipboardList
} from 'lucide-react-native';
import { socketService } from '../../services/socketService';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExamMarksEntryScreen({ route, navigation }: any) {
  const [activeTab, setActiveTab] = useState('Mark Entry');

  const [students, setStudents] = useState([
    { id: '1', name: 'Aarav Sharma', roll: 'Roll No. 01', marks: '42' },
    { id: '2', name: 'Diya Verma', roll: 'Roll No. 02', marks: '38' },
    { id: '3', name: 'Rohan Singh', roll: 'Roll No. 03', marks: '45' },
    { id: '4', name: 'Ananya Gupta', roll: 'Roll No. 04', marks: '40' },
    { id: '5', name: 'Kunal Patel', roll: 'Roll No. 05', marks: '33' }
  ]);

  const updateMarks = (id: string, val: string) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, marks: val } : s))
    );
  };

  const handleSaveMarks = () => {
    socketService.syncMarks('Unit Test - 1', 'Class 8-A');
    Alert.alert(
      'Exam Marks Saved ✅',
      'Marks for Class 8-A — Mathematics saved & broadcasted live via Socket.IO to Parent App!'
    );
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
        <Text style={styles.headerTitle}>Exam & Marks</Text>
        <TouchableOpacity style={styles.sheetBtn}>
          <FileText size={18} color="#0f172a" />
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
            <Text style={styles.heroTitle}>Create exams,</Text>
            <Text style={styles.heroTitle}>enter marks and analyze</Text>
            <Text style={styles.heroTitleSub}>student performance.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <ClipboardList size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TABS ROW */}
        <View style={styles.tabRow}>
          {['Upcoming Exams', 'Mark Entry', 'Results'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabItemText, activeTab === tab && styles.tabItemTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* EXAM SELECTOR DROPDOWN */}
        <Text style={styles.dropdownLabel}>Select Exam</Text>
        <TouchableOpacity style={styles.dropdownField} onPress={() => Alert.alert('Exam', 'Select exam...')}>
          <Text style={styles.dropdownVal}>Unit Test - 1</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* ROW OF 2 DROPDOWNS */}
        <View style={styles.rowDropdowns}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dropdownLabel}>Class</Text>
            <TouchableOpacity style={styles.dropdownFieldSmall} onPress={() => Alert.alert('Class', 'Select class...')}>
              <Text style={styles.dropdownValSmall}>Class 8 - A</Text>
              <ChevronDown size={16} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.dropdownLabel}>Subject</Text>
            <TouchableOpacity style={styles.dropdownFieldSmall} onPress={() => Alert.alert('Subject', 'Select subject...')}>
              <Text style={styles.dropdownValSmall}>Mathematics</Text>
              <ChevronDown size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* LIST HEADER */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.sectionTitle}>Student Marks</Text>
          <Text style={styles.totalMarksLabel}>Total Marks: 50</Text>
        </View>

        {/* MARKS ENTRIES LIST */}
        <View style={styles.listContainer}>
          {students.map((s) => (
            <View key={s.id} style={styles.studentCard}>
              <View style={styles.avatarCircle}>
                <User size={18} color="#7c3aed" />
              </View>

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.studentName}>{s.name}</Text>
                <Text style={styles.studentRoll}>{s.roll}</Text>
              </View>

              <View style={styles.marksInputContainer}>
                <TextInput
                  style={styles.marksInput}
                  keyboardType="numeric"
                  value={s.marks}
                  onChangeText={(val) => updateMarks(s.id, val)}
                />
                <Text style={styles.outOfLabel}>/ 50</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM BUTTONS ROW */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.draftBtn}
          onPress={() => Alert.alert('Saved', 'Marks draft saved locally.')}
        >
          <Text style={styles.draftBtnText}>Save as Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSaveMarks}>
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
  sheetBtn: {
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
  tabRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', marginBottom: 20 },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabItemActive: { borderBottomWidth: 2, borderBottomColor: '#7c3aed' },
  tabItemText: { fontSize: 13, fontWeight: '750', color: '#94a3b8' },
  tabItemTextActive: { color: '#7c3aed', fontWeight: '900' },
  dropdownLabel: { fontSize: 11, fontWeight: '800', color: '#94a3b8', marginBottom: 6 },
  dropdownField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16
  },
  dropdownVal: { fontSize: 14, fontWeight: '750', color: '#0f172a' },
  rowDropdowns: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  dropdownFieldSmall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  dropdownValSmall: { fontSize: 13, fontWeight: '750', color: '#0f172a' },
  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  totalMarksLabel: { fontSize: 12, fontWeight: '800', color: '#64748b' },
  listContainer: { gap: 12, marginBottom: 40 },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  studentName: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  studentRoll: { fontSize: 11, color: '#94a3b8', fontWeight: '750', marginTop: 2 },
  marksInputContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  marksInput: {
    width: 50,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a'
  },
  outOfLabel: { fontSize: 13, color: '#94a3b8', fontWeight: '700' },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 12
  },
  draftBtn: {
    flex: 2,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  draftBtnText: { fontSize: 14, fontWeight: '800', color: '#7c3aed' },
  submitBtn: {
    flex: 3,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
