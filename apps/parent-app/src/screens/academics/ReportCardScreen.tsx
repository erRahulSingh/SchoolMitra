import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, FileCheck, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ReportCardScreen({ navigation }: any) {
  const subjects = [
    { name: 'Mathematics', marks: 48, total: 50, grade: 'A+' },
    { name: 'Science', marks: 45, total: 50, grade: 'A+' },
    { name: 'English', marks: 42, total: 50, grade: 'A' },
    { name: 'Hindi', marks: 44, total: 50, grade: 'A+' },
    { name: 'Social Science', marks: 40, total: 50, grade: 'A' },
    { name: 'Computer', marks: 46, total: 50, grade: 'A+' }
  ];
  const totalObtained = subjects.reduce((sum, s) => sum + s.marks, 0);
  const totalMax = subjects.reduce((sum, s) => sum + s.total, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#16a34a', '#22c55e']} style={styles.heroHeader}>
        <View style={styles.headerRow}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#ffffff" /></TouchableOpacity><Text style={styles.headerTitle}>Report Card</Text><FileCheck size={20} color="#ffffff" /></View>
        <View style={styles.heroBody}>
          <View style={styles.percCircle}><Text style={styles.percText}>{percentage}%</Text></View>
          <View><Text style={styles.heroLabel}>Mid-Term 2025-26</Text><Text style={styles.heroGrade}>Overall Grade: A+</Text><Text style={styles.heroResult}>Result: PASS</Text></View>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.tableHeader}><Text style={[styles.thText, { flex: 2 }]}>Subject</Text><Text style={styles.thText}>Marks</Text><Text style={styles.thText}>Grade</Text></View>
        {subjects.map((s, idx) => (
          <View key={idx} style={[styles.tableRow, idx % 2 === 0 && { backgroundColor: '#f8fafc' }]}>
            <Text style={[styles.tdText, { flex: 2, fontWeight: '800' }]}>{s.name}</Text>
            <Text style={styles.tdText}>{s.marks}/{s.total}</Text>
            <View style={styles.gradeBadge}><Text style={styles.gradeText}>{s.grade}</Text></View>
          </View>
        ))}
        <View style={styles.totalRow}><Text style={[styles.totalText, { flex: 2 }]}>TOTAL</Text><Text style={styles.totalText}>{totalObtained}/{totalMax}</Text><Text style={styles.totalText}>{percentage}%</Text></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  heroHeader: { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 24, paddingHorizontal: 16, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroBody: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  percCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#ffffff' },
  percText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroLabel: { fontSize: 14, color: '#bbf7d0', fontWeight: '700' },
  heroGrade: { fontSize: 18, fontWeight: '900', color: '#ffffff', marginTop: 4 },
  heroResult: { fontSize: 12, color: '#bbf7d0', fontWeight: '700', marginTop: 2 },
  scrollContent: { padding: 16 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#1e3a8a', borderRadius: 12, padding: 12, marginBottom: 4 },
  thText: { flex: 1, fontSize: 12, fontWeight: '800', color: '#ffffff', textAlign: 'center' },
  tableRow: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
  tdText: { flex: 1, fontSize: 13, color: '#0f172a', fontWeight: '600', textAlign: 'center' },
  gradeBadge: { flex: 1, alignItems: 'center' },
  gradeText: { fontSize: 12, fontWeight: '900', color: '#16a34a', backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  totalRow: { flexDirection: 'row', padding: 14, backgroundColor: '#eef2ff', borderRadius: 12, marginTop: 8 },
  totalText: { flex: 1, fontSize: 14, fontWeight: '900', color: '#1e3a8a', textAlign: 'center' }
});
