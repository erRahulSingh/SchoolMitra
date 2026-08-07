import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { GraduationCap, Bus, Calendar, FileText, CreditCard, Bell, ChevronRight, User, CheckCircle2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function NativeParentHome({ navigation }: any) {
  const child = {
    name: 'Aarav Gupta',
    class: 'Class 8-A',
    roll: '01',
    school: 'Delhi Public School (Dwarka)',
    attendanceRate: '96%',
    pendingHomework: 2,
    busStatus: 'Bus #01 • On Route (ETA 10 mins)'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.childBadge}>
            <View style={styles.childAvatar}>
              <Text style={styles.avatarText}>AG</Text>
            </View>
            <View>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childMeta}>{child.class} • Roll No. {child.roll}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('Attendance')}>
            <Bell size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* HERO CHILD ATTENDANCE & ANNOUNCEMENT CARD */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.presentBadge}>
              <CheckCircle2 size={16} color="#166534" />
              <Text style={styles.presentText}>PRESENT TODAY</Text>
            </View>
            <Text style={styles.dateText}>07 Aug 2026</Text>
          </View>

          <Text style={styles.heroTitle}>Aarav is present in Class 8-A</Text>
          <Text style={styles.heroSub}>Marked by Rahul Sharma (Maths Teacher) at 08:35 AM</Text>
        </View>

        {/* BUS TRACKING BANNER */}
        <TouchableOpacity style={styles.busBanner} onPress={() => navigation.navigate('TransportTab')}>
          <View style={styles.busIconBox}>
            <Bus size={22} color="#ffffff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.busTitle}>School Bus Live Tracking</Text>
            <Text style={styles.busSub}>{child.busStatus}</Text>
          </View>
          <ChevronRight size={20} color="#64748b" />
        </TouchableOpacity>

        {/* QUICK METRICS GRID */}
        <View style={styles.metricsGrid}>
          <TouchableOpacity style={styles.metricCard} onPress={() => navigation.navigate('AttendanceTab')}>
            <Calendar size={22} color="#10b981" />
            <Text style={styles.metricVal}>{child.attendanceRate}</Text>
            <Text style={styles.metricLabel}>Attendance Rate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.metricCard} onPress={() => navigation.navigate('HomeworkTab')}>
            <FileText size={22} color="#6366f1" />
            <Text style={styles.metricVal}>{child.pendingHomework}</Text>
            <Text style={styles.metricLabel}>Pending Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.metricCard} onPress={() => navigation.navigate('ProfileTab')}>
            <CreditCard size={22} color="#f59e0b" />
            <Text style={styles.metricVal}>Paid</Text>
            <Text style={styles.metricLabel}>Q2 Fee Status</Text>
          </TouchableOpacity>
        </View>

        {/* RECENT HOMEWORK FEED */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Homework & Tasks</Text>
        </View>

        <View style={styles.feedCard}>
          <View style={styles.feedHeader}>
            <Text style={styles.subjectTag}>Mathematics</Text>
            <Text style={styles.dueTag}>Due Tomorrow</Text>
          </View>
          <Text style={styles.feedTitle}>Exercise 8.2: Algebraic Expressions & Equations</Text>
          <Text style={styles.feedDesc}>Complete Q1 to Q10 in homework notebook and submit PDF scan.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  childBadge: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  childAvatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#ffffff', fontWeight: '900', fontSize: 16 },
  childName: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  childMeta: { fontSize: 12, color: '#64748b', marginTop: 2 },
  bellBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  heroCard: { backgroundColor: '#1e293b', borderRadius: 20, padding: 18, marginBottom: 16, elevation: 4 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  presentBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  presentText: { fontSize: 11, fontWeight: '800', color: '#166534' },
  dateText: { fontSize: 12, color: '#94a3b8' },
  heroTitle: { fontSize: 17, fontWeight: '800', color: '#ffffff' },
  heroSub: { fontSize: 12, color: '#cbd5e1', marginTop: 4 },
  busBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#ffffff', borderRadius: 18, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#e2e8f0', elevation: 2 },
  busIconBox: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#f59e0b', justifyContent: 'center', alignItems: 'center' },
  busTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  busSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  metricsGrid: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  metricCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  metricVal: { fontSize: 18, fontWeight: '900', color: '#0f172a', marginTop: 6 },
  metricLabel: { fontSize: 11, color: '#64748b', marginTop: 2, textAlign: 'center' },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#0f172a' },
  feedCard: { backgroundColor: '#ffffff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  feedHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  subjectTag: { fontSize: 12, fontWeight: '800', color: '#6366f1' },
  dueTag: { fontSize: 12, fontWeight: '700', color: '#ef4444' },
  feedTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  feedDesc: { fontSize: 13, color: '#64748b', marginTop: 4 }
});
