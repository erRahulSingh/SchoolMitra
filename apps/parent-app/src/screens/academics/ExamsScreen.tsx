import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, ChevronDown, FileText, ChevronRight, CheckCircle2, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExamsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Schedule');

  const tabs = ['Schedule', 'Results', 'Syllabus'];

  const upcomingExams = [
    { title: 'Unit Test – 1', date: '20 May 2025 – 24 May 2025', subjects: '4 Subjects', icon: FileText, color: '#7c3aed', bg: '#f3e8ff' },
    { title: 'Half Yearly Exam', date: '15 Jun 2025 – 25 Jun 2025', subjects: 'All Subjects', icon: CalendarIcon, color: '#16a34a', bg: '#dcfce7' },
    { title: 'Unit Test – 2', date: '20 Jul 2025 – 24 Jul 2025', subjects: '4 Subjects', icon: Award, color: '#ea580c', bg: '#ffedd5' },
  ];

  const pastExams = [
    { title: 'Periodic Test – 2', date: '10 Mar 2025 – 14 Mar 2025', subjects: 'All Subjects', status: 'Completed', icon: FileText, color: '#2563eb', bg: '#e0f2fe' },
    { title: 'Periodic Test – 1', date: '20 Jan 2025 – 24 Jan 2025', subjects: 'All Subjects', status: 'Completed', icon: FileText, color: '#2563eb', bg: '#e0f2fe' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Examination</Text>
        <TouchableOpacity style={styles.calBtn}>
          <CalendarIcon size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Term Banner Card (Purple Gradient) */}
        <LinearGradient
          colors={['#5b21b6', '#6d28d9', '#7c3aed']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.purpleBanner}
        >
          <View style={styles.bannerIconCircle}>
            <FileText size={24} color="#ffffff" strokeWidth={2} />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={styles.termTitleText}>Term 1 (2024-25)</Text>
            <TouchableOpacity style={styles.classDropdownRow} activeOpacity={0.8}>
              <Text style={styles.classText}>Class 5th – A</Text>
              <ChevronDown size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Switch Tabs Bar */}
        <View style={styles.switchTabsBar}>
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.switchTabBtn, isActive && styles.switchTabActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text style={[styles.switchTabText, isActive && styles.switchTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Upcoming Exams Section */}
        <Text style={styles.sectionTitle}>Upcoming Exams</Text>
        <View style={styles.examsCardList}>
          {upcomingExams.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.examRow, idx < upcomingExams.length - 1 && styles.rowBorder]}
                onPress={() => {}}
                activeOpacity={0.7}
              >
                <View style={[styles.iconSquare, { backgroundColor: item.bg }]}>
                  <IconComp size={20} color={item.color} strokeWidth={2} />
                </View>

                <View style={styles.examInfoCol}>
                  <Text style={styles.examTitleText}>{item.title}</Text>
                  <Text style={styles.examDateText}>{item.date}</Text>
                  <Text style={styles.examSubjectsText}>{item.subjects}</Text>
                </View>

                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Past Exams Section */}
        <Text style={styles.sectionTitle}>Past Exams</Text>
        <View style={styles.examsCardList}>
          {pastExams.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.examRow, idx < pastExams.length - 1 && styles.rowBorder]}
                onPress={() => {}}
                activeOpacity={0.7}
              >
                <View style={[styles.iconSquare, { backgroundColor: item.bg }]}>
                  <IconComp size={20} color={item.color} strokeWidth={2} />
                </View>

                <View style={styles.examInfoCol}>
                  <Text style={styles.examTitleText}>{item.title}</Text>
                  <Text style={styles.examDateText}>{item.date}</Text>
                  <Text style={styles.examSubjectsText}>{item.subjects}</Text>
                </View>

                <Text style={styles.completedText}>Completed</Text>
              </TouchableOpacity>
            );
          })}
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
  calBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Purple Banner
  purpleBanner: {
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#6d28d9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  bannerIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTextCol: { flex: 1 },
  termTitleText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  classDropdownRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  classText: { fontSize: 13, color: '#ddd6fe', fontWeight: '600' },

  // Switch Tabs Bar
  switchTabsBar: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  switchTabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  switchTabActive: { backgroundColor: '#ffffff', elevation: 2 },
  switchTabText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  switchTextActive: { fontSize: 12, fontWeight: '900', color: '#2563eb' },

  // Section Headers & Card Lists
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  examsCardList: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  examRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconSquare: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  examInfoCol: { flex: 1 },
  examTitleText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  examDateText: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 2 },
  examSubjectsText: { fontSize: 11, color: '#94a3b8', fontWeight: '500', marginTop: 2 },
  completedText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },
});
