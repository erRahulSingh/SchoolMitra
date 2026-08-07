import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Layers, Download, FileText } from 'lucide-react-native';

export default function StudyMaterialsScreen({ navigation }: any) {
  const materials = [
    { id: 1, subject: 'Mathematics', title: 'Chapter 8: Algebraic Expressions', type: 'PDF', size: '2.4 MB', uploadedBy: 'Rahul Sharma' },
    { id: 2, subject: 'Science', title: 'Chapter 5: Light & Reflection', type: 'PDF', size: '3.1 MB', uploadedBy: 'Priya Singh' },
    { id: 3, subject: 'English', title: 'Grammar: Tenses Practice Sheet', type: 'PDF', size: '1.8 MB', uploadedBy: 'Neha Gupta' },
    { id: 4, subject: 'Hindi', title: 'Chapter 4: Poem Analysis', type: 'PDF', size: '1.2 MB', uploadedBy: 'Kavita Devi' },
    { id: 5, subject: 'Social Science', title: 'Chapter 3: Indian Constitution', type: 'PDF', size: '2.8 MB', uploadedBy: 'Anil Kumar' }
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity><Text style={styles.headerTitle}>Study Materials</Text><Layers size={20} color="#4f46e5" /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {materials.map((m) => (
          <View key={m.id} style={styles.card}>
            <View style={styles.iconBox}><FileText size={20} color="#4f46e5" /></View>
            <View style={{ flex: 1 }}><Text style={styles.subject}>{m.subject}</Text><Text style={styles.title}>{m.title}</Text><Text style={styles.meta}>{m.type} • {m.size} • By {m.uploadedBy}</Text></View>
            <TouchableOpacity style={styles.dlBtn}><Download size={18} color="#4f46e5" /></TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 10 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#ffffff', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  iconBox: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center' },
  subject: { fontSize: 12, fontWeight: '800', color: '#4f46e5' },
  title: { fontSize: 14, fontWeight: '800', color: '#0f172a', marginTop: 2 },
  meta: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 4 },
  dlBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center' }
});
