import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Grid, CalendarCheck, FileText, Wallet, Bus, Calendar, Building, Trophy, Image, Layers, HelpCircle, PhoneCall } from 'lucide-react-native';

export default function MoreScreen({ navigation }: any) {
  const categories = [
    {
      title: 'ACADEMIC SERVICES',
      items: [
        { label: 'Attendance Analytics', icon: CalendarCheck, screen: 'Attendance', color: '#6b21a8', bg: '#faf5ff' },
        { label: 'Homework Manager', icon: FileText, screen: 'Homework', color: '#2563eb', bg: '#eff6ff' },
        { label: 'Assignments', icon: FileText, screen: 'Assignments', color: '#d97706', bg: '#fffbeb' },
        { label: 'Exams & Marks', icon: Trophy, screen: 'Exams', color: '#ef4444', bg: '#fef2f2' },
        { label: 'Report Cards', icon: FileText, screen: 'ReportCard', color: '#16a34a', bg: '#f0fdf4' },
        { label: 'Time Table', icon: Calendar, screen: 'TimeTable', color: '#9333ea', bg: '#f5f3ff' },
        { label: 'Study Materials', icon: Layers, screen: 'StudyMaterials', color: '#0284c7', bg: '#ecfeff' }
      ]
    },
    {
      title: 'SCHOOL & ACTIVITIES',
      items: [
        { label: 'Fee Payments', icon: Wallet, screen: 'Fees', color: '#d97706', bg: '#fffbeb' },
        { label: 'Live Bus Tracking', icon: Bus, screen: 'TransportTab', color: '#2563eb', bg: '#eff6ff' },
        { label: 'About School', icon: Building, screen: 'AboutSchool', color: '#16a34a', bg: '#f0fdf4' },
        { label: 'School Events', icon: Trophy, screen: 'Events', color: '#9333ea', bg: '#f5f3ff' },
        { label: 'Photo Gallery', icon: Image, screen: 'Gallery', color: '#e11d48', bg: '#fce7f3' },
        { label: 'Holiday Calendar', icon: Calendar, screen: 'Holidays', color: '#4f46e5', bg: '#eef2ff' }
      ]
    },
    {
      title: 'HELP & SUPPORT',
      items: [
        { label: 'FAQ & User Guide', icon: HelpCircle, screen: 'Help', color: '#d97706', bg: '#fffbeb' },
        { label: 'Support & Helpline', icon: PhoneCall, screen: 'Support', color: '#9333ea', bg: '#f5f3ff' }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All App Features</Text>
        <Grid size={20} color="#4f46e5" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {categories.map((cat, cIdx) => (
          <View key={cIdx} style={styles.section}>
            <Text style={styles.sectionTitle}>{cat.title}</Text>
            <View style={styles.card}>
              {cat.items.map((item, iIdx) => {
                const IconComp = item.icon;
                return (
                  <TouchableOpacity key={iIdx} style={[styles.row, iIdx < cat.items.length - 1 && styles.rowBorder]} onPress={() => navigation.navigate(item.screen)} activeOpacity={0.7}>
                    <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
                      <IconComp size={18} color={item.color} />
                    </View>
                    <Text style={styles.label}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
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
  scrollContent: { padding: 16, gap: 16 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '900', color: '#94a3b8', letterSpacing: 0.8 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconBox: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 14, fontWeight: '800', color: '#0f172a' }
});
