import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { CalendarCheck, BookOpen, FileText, Award, ClipboardList, Calendar, Layers, HelpCircle, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const cardW = (width - 40 - 24) / 4;

export default function AcademicsHubScreen({ navigation }: any) {
  const tools = [
    { label: 'Attendance', icon: CalendarCheck, screen: 'Attendance', color: '#6b21a8', bg: '#faf5ff' },
    { label: 'Homework', icon: BookOpen, screen: 'Homework', color: '#2563eb', bg: '#eff6ff' },
    { label: 'Assignments', icon: FileText, screen: 'Assignments', color: '#d97706', bg: '#fffbeb' },
    { label: 'Exams', icon: Award, screen: 'Exams', color: '#ef4444', bg: '#fef2f2' },
    { label: 'Report Card', icon: ClipboardList, screen: 'ReportCard', color: '#16a34a', bg: '#f0fdf4' },
    { label: 'Time Table', icon: Calendar, screen: 'TimeTable', color: '#9333ea', bg: '#f5f3ff' },
    { label: 'Materials', icon: Layers, screen: 'StudyMaterials', color: '#0284c7', bg: '#ecfeff' },
    { label: 'Subjects', icon: HelpCircle, screen: 'SubjectDetails', color: '#e11d48', bg: '#fce7f3' }
  ];

  const recentActivity = [
    { title: 'Maths Homework Assigned', desc: 'Exercise 8.2 — Due Tomorrow', color: '#2563eb', bg: '#e0f2fe' },
    { title: 'Science Test Result', desc: 'Score: 48/50 — Grade A+', color: '#16a34a', bg: '#dcfce7' },
    { title: 'English Assignment', desc: 'Essay Writing — Submitted', color: '#9333ea', bg: '#f3e8ff' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Academics</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {tools.map((tool, idx) => {
            const IconComp = tool.icon;
            return (
              <TouchableOpacity key={idx} style={styles.toolCard} onPress={() => navigation.navigate(tool.screen)} activeOpacity={0.7}>
                <View style={[styles.toolIconBox, { backgroundColor: tool.bg }]}><IconComp size={22} color={tool.color} /></View>
                <Text style={styles.toolLabel} numberOfLines={1}>{tool.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        </View>

        {recentActivity.map((act, idx) => (
          <View key={idx} style={styles.actCard}>
            <View style={[styles.actDot, { backgroundColor: act.color }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.actTitle}>{act.title}</Text>
              <Text style={styles.actDesc}>{act.desc}</Text>
            </View>
            <ChevronRight size={16} color="#94a3b8" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 14 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  toolCard: { width: cardW, backgroundColor: '#ffffff', borderRadius: 16, paddingVertical: 14, paddingHorizontal: 4, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', elevation: 1 },
  toolIconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  toolLabel: { fontSize: 10, fontWeight: '800', color: '#475569', textAlign: 'center' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#1e3a8a' },
  viewAll: { fontSize: 13, color: '#4f46e5', fontWeight: '700' },
  actCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#ffffff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 8 },
  actDot: { width: 8, height: 8, borderRadius: 4 },
  actTitle: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  actDesc: { fontSize: 12, color: '#64748b', marginTop: 2 }
});
