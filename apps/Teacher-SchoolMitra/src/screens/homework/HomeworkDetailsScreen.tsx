import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Clock, FileText, ChevronLeft, CheckCircle2, ChevronRight } from 'lucide-react-native';

export default function HomeworkDetailsScreen({ navigation, route }: any) {
  const hw = route.params?.hw || {
    title: 'Chapter 8: Quadratic Equations Worksheet',
    subject: 'Mathematics',
    class: 'Class 8-A',
    due: '10 Aug 2026',
    total: 42,
    submitted: 38
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Homework Details</Text>
        <FileText size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <Text style={styles.subjectTag}>{hw.subject} • {hw.class}</Text>
          <Text style={styles.title}>{hw.title}</Text>
          
          <View style={styles.metaRow}>
            <Clock size={14} color="#38bdf8" />
            <Text style={styles.dueText}>Submission Deadline: {hw.due}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => navigation.navigate('HomeworkSubmissions', { hw })}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.actionTitle}>Submissions Roster ({hw.submitted}/{hw.total})</Text>
            <Text style={styles.actionSub}>Review student submitted PDF documents & assign grades</Text>
          </View>
          <ChevronRight size={20} color="#7c3aed" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => navigation.navigate('HomeworkAnalytics')}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.actionTitle}>Homework Performance Analytics</Text>
            <Text style={styles.actionSub}>View submission rates, on-time percentage & completion graph</Text>
          </View>
          <ChevronRight size={20} color="#7c3aed" />
        </TouchableOpacity>
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
  subjectTag: { fontSize: 12, fontWeight: '800', color: '#38bdf8' },
  title: { fontSize: 20, fontWeight: '900', color: '#ffffff', marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  dueText: { fontSize: 13, color: '#38bdf8', fontWeight: '700' },
  actionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  actionTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  actionSub: { fontSize: 12, color: '#64748b', marginTop: 2 }
});
