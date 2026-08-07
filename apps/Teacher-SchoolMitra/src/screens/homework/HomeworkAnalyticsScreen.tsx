import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { FileBarChart2, ChevronLeft } from 'lucide-react-native';

export default function HomeworkAnalyticsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Homework Analytics</Text>
        <FileBarChart2 size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>90.4% Overall Submission Rate</Text>
          <Text style={styles.heroSub}>Class 8-A Mathematics Assignments</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.box}>
            <Text style={styles.val}>12</Text>
            <Text style={styles.label}>Total Homeworks Assigned</Text>
          </View>
          <View style={[styles.box, { borderLeftColor: '#10b981' }]}>
            <Text style={[styles.val, { color: '#10b981' }]}>456</Text>
            <Text style={styles.label}>On-Time Submissions</Text>
          </View>
        </View>
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
  heroCard: { backgroundColor: '#6d28d9', borderRadius: 20, padding: 20, marginBottom: 16 },
  heroTitle: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  grid: { flexDirection: 'row', gap: 12 },
  box: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 16, borderLeftWidth: 4, borderLeftColor: '#7c3aed', borderWidth: 1, borderColor: '#e2e8f0' },
  val: { fontSize: 22, fontWeight: '900', color: '#0f172a' },
  label: { fontSize: 12, color: '#64748b', marginTop: 4 }
});
