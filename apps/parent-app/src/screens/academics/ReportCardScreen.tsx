import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import { ChevronLeft, Download, ChevronDown, MessageSquare } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { studentRohan3DUri } from '../../assets/parent3dAssets';

export default function ReportCardScreen({ navigation }: any) {
  const [selectedTerm, setSelectedTerm] = useState('Term 1 (2024-25)');

  const student = {
    name: 'Rohan Sharma',
    class: 'Class 5th - A',
    roll: 'Roll No. 12',
  };

  const subjectPerformance = [
    { subject: 'English', grade: 'A', score: '85/100', progress: 0.85, color: '#22c55e', gradeColor: '#16a34a' },
    { subject: 'Mathematics', grade: 'A+', score: '82/100', progress: 0.82, color: '#16a34a', gradeColor: '#15803d' },
    { subject: 'Science', grade: 'A', score: '88/100', progress: 0.88, color: '#22c55e', gradeColor: '#16a34a' },
    { subject: 'Social Studies', grade: 'B+', score: '78/100', progress: 0.78, color: '#f97316', gradeColor: '#ea580c' },
    { subject: 'Hindi', grade: 'A', score: '84/100', progress: 0.84, color: '#22c55e', gradeColor: '#16a34a' },
    { subject: 'Computer', grade: 'A+', score: '90/100', progress: 0.90, color: '#16a34a', gradeColor: '#15803d' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Card</Text>
        <TouchableOpacity style={styles.downloadBtn}>
          <Download size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Term Selector Dropdown Card */}
        <TouchableOpacity style={styles.termDropdown} activeOpacity={0.8}>
          <Text style={styles.termText}>{selectedTerm}</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* Student Profile Banner (Purple) */}
        <LinearGradient
          colors={['#4338ca', '#6366f1', '#4f46e5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.purpleStudentCard}
        >
          <View style={styles.studentAvatarBox}>
            <Image
              source={{ uri: studentRohan3DUri }}
              style={styles.studentAvatarImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.studentDetailsCol}>
            <Text style={styles.studentNameText}>{student.name}</Text>
            <Text style={styles.studentClassText}>{student.class}</Text>
            <Text style={styles.studentRollText}>{student.roll}</Text>
          </View>
        </LinearGradient>

        {/* Overall Performance Card */}
        <Text style={styles.sectionTitle}>Overall Performance</Text>
        <View style={styles.overallCard}>
          <View style={styles.gradeCircleBadge}>
            <Text style={styles.gradeCircleText}>A</Text>
          </View>

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>CGPA</Text>
            <Text style={styles.cgpaVal}>8.6 <Text style={styles.cgpaSub}>/ 10</Text></Text>
          </View>

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Grade</Text>
            <Text style={styles.gradeVal}>A</Text>
            <Text style={styles.excellentText}>Excellent</Text>
          </View>
        </View>

        {/* Subject Wise Performance */}
        <Text style={styles.sectionTitle}>Subject Wise Performance</Text>
        <View style={styles.subjectsCard}>
          {subjectPerformance.map((item, idx) => (
            <View key={idx} style={[styles.subjectRow, idx < subjectPerformance.length - 1 && styles.rowBorder]}>
              <View style={styles.subjectTopLine}>
                <Text style={styles.subjectName}>{item.subject}</Text>
                <Text style={[styles.subjectGradeBadge, { color: item.gradeColor }]}>{item.grade}</Text>
                <Text style={styles.subjectScore}>{item.score}</Text>
              </View>

              {/* Custom Progress Bar */}
              <View style={styles.progressBarBg}>
                <View style={[
                  styles.progressBarFill, 
                  { width: `${item.progress * 100}%`, backgroundColor: item.color }
                ]} />
              </View>
            </View>
          ))}
        </View>

        {/* Teacher's Remarks Card */}
        <View style={styles.remarksCard}>
          <View style={styles.remarksHeaderRow}>
            <View style={styles.remarksIconBox}>
              <MessageSquare size={16} color="#16a34a" fill="#16a34a" />
            </View>
            <Text style={styles.remarksTitle}>Teacher's Remarks</Text>
          </View>
          <Text style={styles.remarksText}>
            Rohan is a bright student with excellent academic performance. Keep up the good work!
          </Text>
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
  downloadBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Term Dropdown
  termDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  termText: { fontSize: 13, fontWeight: '800', color: '#334155' },

  // Purple Student Card
  purpleStudentCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  studentAvatarBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  studentAvatarImage: { width: '100%', height: '100%' },
  studentDetailsCol: { flex: 1 },
  studentNameText: { fontSize: 17, fontWeight: '900', color: '#ffffff' },
  studentClassText: { fontSize: 12, color: '#c7d2fe', fontWeight: '600', marginTop: 2 },
  studentRollText: { fontSize: 11, color: '#e0e7ff', fontWeight: '500', marginTop: 2 },

  // Overall Performance Card
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  overallCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  gradeCircleBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#dcfce7',
    borderWidth: 2,
    borderColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeCircleText: { fontSize: 24, fontWeight: '900', color: '#16a34a' },
  statCol: { alignItems: 'center' },
  statLabel: { fontSize: 11, color: '#64748b', fontWeight: '700' },
  cgpaVal: { fontSize: 20, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  cgpaSub: { fontSize: 12, color: '#94a3b8', fontWeight: '600' },
  gradeVal: { fontSize: 18, fontWeight: '900', color: '#16a34a', marginTop: 2 },
  excellentText: { fontSize: 10, color: '#16a34a', fontWeight: '700' },

  // Subjects Card
  subjectsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  subjectRow: { paddingVertical: 10 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  subjectTopLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  subjectName: { flex: 1, fontSize: 13, fontWeight: '800', color: '#0f172a' },
  subjectGradeBadge: { fontSize: 13, fontWeight: '900', marginRight: 14 },
  subjectScore: { fontSize: 11, fontWeight: '700', color: '#64748b' },
  progressBarBg: { height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },

  // Teacher Remarks Card
  remarksCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  remarksHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  remarksIconBox: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#dcfce7', alignItems: 'center', justifyContent: 'center' },
  remarksTitle: { fontSize: 13, fontWeight: '900', color: '#15803d' },
  remarksText: { fontSize: 12, color: '#166534', lineHeight: 18, fontWeight: '600' },
});
