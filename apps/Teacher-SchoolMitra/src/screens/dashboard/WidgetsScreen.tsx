import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { LayoutGrid, UserCheck, BookOpen, Award, Bell, Calendar, ChevronLeft, Sparkles } from 'lucide-react-native';

export default function WidgetsScreen({ navigation }: any) {
  const widgetsList = [
    { id: 'w1', title: 'Quick Attendance Widget', desc: 'Mark Class 8-A attendance directly from homepage', enabled: true, icon: UserCheck, color: '#2563eb' },
    { id: 'w2', title: 'Pending Homework Broadcast', desc: 'Broadcast homework reminders to parents', enabled: true, icon: BookOpen, color: '#7c3aed' },
    { id: 'w3', title: 'CBSE Mid-Term Marks Entry', desc: 'Rapid score entry widget for theory & practicals', enabled: true, icon: Award, color: '#dc2626' },
    { id: 'w4', title: 'Instant Circular Alert', desc: 'Post urgent announcements to parents & students', enabled: false, icon: Bell, color: '#f59e0b' },
    { id: 'w5', title: 'Weekly Timetable Shortcut', desc: 'View today period schedule', enabled: true, icon: Calendar, color: '#10b981' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Educator Dashboard Widgets</Text>
        <LayoutGrid size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroBox}>
          <Sparkles size={24} color="#7c3aed" />
          <Text style={styles.heroTitle}>Customize Your Educator Home Screen</Text>
          <Text style={styles.heroSub}>Enable or disable quick action widgets to tailor your daily teaching workflow.</Text>
        </View>

        {widgetsList.map((w) => {
          const IconComp = w.icon;
          return (
            <View key={w.id} style={styles.widgetCard}>
              <View style={[styles.iconBox, { backgroundColor: `${w.color}20` }]}>
                <IconComp size={22} color={w.color} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.widgetTitle}>{w.title}</Text>
                <Text style={styles.widgetDesc}>{w.desc}</Text>
              </View>

              <Switch value={w.enabled} trackColor={{ false: '#cbd5e1', true: '#7c3aed' }} />
            </View>
          );
        })}
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
  heroBox: { backgroundColor: '#f3e8ff', borderRadius: 18, padding: 18, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#7c3aed' },
  heroTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a', marginTop: 6 },
  heroSub: { fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 18 },
  widgetCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  iconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  widgetTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  widgetDesc: { fontSize: 12, color: '#64748b', marginTop: 2 }
});
