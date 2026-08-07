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
  Download,
  ChevronDown,
  Award
} from 'lucide-react-native';
import { socketService } from '../../services/socketService';

export default function ReportCardGeneratorScreen({ navigation }: any) {
  const [selectedClass, setSelectedClass] = useState('Class 8 - A');
  const [selectedStudent, setSelectedStudent] = useState('Aarav Sharma');

  const subjects = [
    { name: 'Mathematics', grade: 'A', score: '85/100', color: '#16a34a', bg: '#ecfdf5' },
    { name: 'Science', grade: 'A', score: '88/100', color: '#16a34a', bg: '#ecfdf5' },
    { name: 'English', grade: 'B+', score: '78/100', color: '#ea580c', bg: '#ffedd5' },
    { name: 'Social Science', grade: 'A-', score: '82/100', color: '#16a34a', bg: '#ecfdf5' },
    { name: 'Hindi', grade: 'B+', score: '76/100', color: '#ea580c', bg: '#ffedd5' },
    { name: 'Computer', grade: 'A', score: '90/100', color: '#16a34a', bg: '#ecfdf5' }
  ];

  const handleGenerate = () => {
    socketService.syncReportCard(selectedClass);
    Alert.alert('Report Card Generated ✅', `Successfully compiled & broadcasted Term 1 Report Card for ${selectedStudent}!`);
  };

  const handleDownload = () => {
    Alert.alert('Download Started 📥', 'Downloading official PDF report...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Card</Text>
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
          <Download size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PURPLE HERO BANNER */}
        <View style={styles.heroCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Term 1 Report Card</Text>
            <Text style={styles.heroSub}>2023 - 24</Text>
          </View>
          <View style={styles.heroIconCircle}>
            <Award size={30} color="#7c3aed" />
          </View>
        </View>

        {/* CLASS SELECTOR */}
        <Text style={styles.selectLabel}>Class</Text>
        <TouchableOpacity
          style={styles.dropdownSelector}
          onPress={() => Alert.alert('Class', 'Select Class...')}
        >
          <Text style={styles.dropdownVal}>{selectedClass}</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* STUDENT SELECTOR */}
        <Text style={styles.selectLabel}>Student</Text>
        <TouchableOpacity
          style={styles.dropdownSelector}
          onPress={() => Alert.alert('Student', 'Select Student...')}
        >
          <Text style={styles.dropdownVal}>{selectedStudent}</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* ACADEMIC PERFORMANCE */}
        <Text style={styles.sectionTitle}>Academic Performance</Text>
        <View style={styles.subjectsCard}>
          {subjects.map((sub, idx) => (
            <View
              key={idx}
              style={[
                styles.subjectRow,
                idx === subjects.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <Text style={styles.subjectName}>{sub.name}</Text>
              
              <View style={styles.subjectRight}>
                <View style={[styles.gradeBadge, { backgroundColor: sub.bg }]}>
                  <Text style={[styles.gradeText, { color: sub.color }]}>{sub.grade}</Text>
                </View>
                <Text style={styles.scoreText}>{sub.score}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ATTENDANCE SECTION */}
        <Text style={styles.sectionTitle}>Attendance</Text>
        <View style={styles.attendanceGrid}>
          <View style={styles.attendanceCard}>
            <Text style={styles.attLabel}>Total Days</Text>
            <Text style={styles.attVal}>90</Text>
            <Text style={styles.attSub}>Attendance %</Text>
          </View>
          <View style={styles.attendanceCard}>
            <Text style={styles.attLabel}>Present</Text>
            <Text style={[styles.attVal, { color: '#16a34a' }]}>78</Text>
            <Text style={styles.attSub}>Attendance %</Text>
          </View>
          <View style={styles.attendanceCard}>
            <Text style={styles.attLabel}>Absent</Text>
            <Text style={[styles.attVal, { color: '#dc2626' }]}>12</Text>
            <Text style={styles.attSub}>86.7%</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
          <Text style={styles.generateText}>Generate Report Card</Text>
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
  downloadBtn: {
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
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectLabel: { fontSize: 13, fontWeight: '800', color: '#475569', marginBottom: 8, marginTop: 10 },
  dropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12
  },
  dropdownVal: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 14, marginTop: 16 },
  subjectsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  subjectName: { fontSize: 14, fontWeight: '700', color: '#334155' },
  subjectRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  gradeText: { fontSize: 12, fontWeight: '950' },
  scoreText: { fontSize: 13, fontWeight: '800', color: '#475569', width: 60, textAlign: 'right' },
  attendanceGrid: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  attendanceCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  attLabel: { fontSize: 11, color: '#64748b', fontWeight: '800' },
  attVal: { fontSize: 18, fontWeight: '900', color: '#0f172a', marginTop: 4 },
  attSub: { fontSize: 10, color: '#94a3b8', fontWeight: '700', marginTop: 4 },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  generateBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  generateText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
