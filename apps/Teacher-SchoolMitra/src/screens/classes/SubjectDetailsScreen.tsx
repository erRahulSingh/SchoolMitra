import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { BookOpen, CheckCircle2, ChevronLeft, FileText } from 'lucide-react-native';

export default function SubjectDetailsScreen({ navigation }: any) {
  const chapters = [
    { title: 'Chapter 1: Real Numbers & Decimals', status: 'Completed', progress: '100%' },
    { title: 'Chapter 2: Polynomials & Factoring', status: 'Completed', progress: '100%' },
    { title: 'Chapter 3: Pair of Linear Equations', status: 'In Progress', progress: '65%' },
    { title: 'Chapter 4: Quadratic Equations', status: 'Upcoming', progress: '0%' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subject Syllabus & Curriculum</Text>
        <BookOpen size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HERO SYLLABUS CARD */}
        <View style={styles.heroCard}>
          <Text style={styles.subjectTitle}>Mathematics & Algebra</Text>
          <Text style={styles.subjectCode}>Class 8-A • CBSE Curriculum 2026-27</Text>
          
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Overall Syllabus Completion</Text>
            <Text style={styles.progressVal}>68%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: '68%' }]} />
          </View>
        </View>

        <Text style={styles.sectionHeading}>Chapter Breakdown</Text>

        {chapters.map((ch, idx) => (
          <View key={idx} style={styles.chCard}>
            <View style={styles.chHeader}>
              <Text style={styles.chTitle}>{ch.title}</Text>
              <View style={[styles.badge, ch.status === 'Completed' ? styles.compBadge : styles.progBadge]}>
                <Text style={[styles.badgeText, ch.status === 'Completed' ? styles.compText : styles.progText]}>{ch.status}</Text>
              </View>
            </View>

            <View style={styles.chFooter}>
              <FileText size={14} color="#64748b" />
              <Text style={styles.chProgress}>Progress: {ch.progress}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: { backgroundColor: '#6d28d9', borderRadius: 20, padding: 20, marginBottom: 20 },
  subjectTitle: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  subjectCode: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 2 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, marginBottom: 6 },
  progressLabel: { fontSize: 12, color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' },
  progressVal: { fontSize: 12, color: '#38bdf8', fontWeight: '900' },
  track: { width: '100%', height: 6, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)', overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#38bdf8' },
  sectionHeading: { fontSize: 17, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  chCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  chHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  chTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a', flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  compBadge: { backgroundColor: '#dcfce7' },
  progBadge: { backgroundColor: '#dbeafe' },
  badgeText: { fontSize: 11, fontWeight: '800' },
  compText: { color: '#166534' },
  progText: { color: '#1d4ed8' },
  chFooter: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  chProgress: { fontSize: 12, color: '#64748b' }
});
