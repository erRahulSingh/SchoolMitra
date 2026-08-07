import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CalendarCheck, Bus, CreditCard, Award, Bell, BookOpen, FileText, Calendar, ChevronRight, User, Megaphone, CheckCircle2, Building, Wallet, MapPin, Clock, Trophy, Sparkles, GraduationCap, Image, HelpCircle, MessageSquare } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ParentDashboard({ navigation }: any) {
  const child = {
    name: 'Rohan Sharma',
    initials: 'RS',
    class: 'Class 5th – A',
    roll: '12',
    school: 'Green Valley Public School',
    session: '2024–25',
    teacher: 'Mrs. Priya',
    busNo: 'UP32-1234',
    attendanceRate: '96%',
    pendingTasks: 2,
    notifications: 1,
    dueFee: '₹1,250'
  };

  const quickActions = [
    { label: 'Attendance', icon: CalendarCheck, color: '#6b21a8', bg: '#faf5ff', screen: 'Attendance' },
    { label: 'Report Card', icon: FileText, color: '#16a34a', bg: '#f0fdf4', screen: 'ReportCard' },
    { label: 'Fee Payment', icon: Wallet, color: '#d97706', bg: '#fffbeb', screen: 'Fees' },
    { label: 'Bus Tracking', icon: Bus, color: '#2563eb', bg: '#eff6ff', screen: 'TransportTab' },
    { label: 'Time Table', icon: Calendar, color: '#9333ea', bg: '#faf5ff', screen: 'TimeTable' }
  ];

  const recentUpdates = [
    { title: 'Holiday Notice', desc: 'School will remain closed on 15th May 2025', icon: Megaphone, color: '#16a34a', bg: '#dcfce7', time: '2h ago' },
    { title: 'Annual Sports Day', desc: 'Annual Sports Day will be held on 25th May 2025', icon: Trophy, color: '#0284c7', bg: '#e0f2fe', time: '1d ago' },
    { title: 'PTM Schedule', desc: 'Parent Teacher Meeting on 20th May 2025', icon: FileText, color: '#9333ea', bg: '#f3e8ff', time: '2d ago' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* GREETING HERO BANNER */}
        <LinearGradient colors={['#4f46e5', '#6366f1', '#a855f7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroBanner}>
          <View>
            <Text style={styles.heroGreeting}>Good Morning,</Text>
            <Text style={styles.heroName}>Anjali Sharma 👋</Text>
            <Text style={styles.heroSub}>Stay updated with your child's activities</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('Notifications')}>
            <Bell size={20} color="#ffffff" />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </LinearGradient>

        {/* STUDENT PROFILE CARD */}
        <View style={styles.studentCard}>
          <View style={styles.studentTop}>
            <View style={styles.studentInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{child.initials}</Text>
              </View>
              <View>
                <Text style={styles.studentName}>{child.name}</Text>
                <Text style={styles.studentClass}>{child.class}</Text>
                <Text style={styles.studentSchool}>{child.school}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewProfileBtn} onPress={() => navigation.navigate('ChildProfile')}>
              <Text style={styles.viewProfileText}>View Profile</Text>
              <ChevronRight size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#ffe4e6' }]}><Calendar size={13} color="#e11d48" /></View>
              <View><Text style={styles.statLabel}>ROLL NO.</Text><Text style={styles.statVal}>{child.roll}</Text></View>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}><Building size={13} color="#16a34a" /></View>
              <View><Text style={styles.statLabel}>SESSION</Text><Text style={styles.statVal}>{child.session}</Text></View>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#f3e8ff' }]}><User size={13} color="#9333ea" /></View>
              <View><Text style={styles.statLabel}>TEACHER</Text><Text style={styles.statVal}>{child.teacher}</Text></View>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#fffbeb' }]}><Bus size={13} color="#d97706" /></View>
              <View><Text style={styles.statLabel}>BUS NO.</Text><Text style={styles.statVal}>{child.busNo}</Text></View>
            </View>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('More')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsGrid}>
          {quickActions.map((action, idx) => {
            const IconComp = action.icon;
            return (
              <TouchableOpacity key={idx} style={styles.actionCard} onPress={() => navigation.navigate(action.screen)} activeOpacity={0.7}>
                <View style={[styles.actionIconCircle, { backgroundColor: action.bg }]}>
                  <IconComp size={20} color={action.color} />
                </View>
                <Text style={styles.actionLabel} numberOfLines={1}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* TODAY'S OVERVIEW */}
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.overviewGrid}>
          <TouchableOpacity style={[styles.overviewCard, { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }]} onPress={() => navigation.navigate('Attendance')}>
            <View style={[styles.overviewIconCircle, { backgroundColor: '#dcfce7' }]}><CheckCircle2 size={19} color="#16a34a" /></View>
            <Text style={[styles.overviewVal, { color: '#16a34a' }]}>Present</Text>
            <Text style={styles.overviewLabel}>Attendance Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.overviewCard, { backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }]} onPress={() => navigation.navigate('Homework')}>
            <View style={[styles.overviewIconCircle, { backgroundColor: '#e0f2fe' }]}><Calendar size={19} color="#0284c7" /></View>
            <Text style={[styles.overviewVal, { color: '#0369a1' }]}>{child.pendingTasks}</Text>
            <Text style={styles.overviewLabel}>Pending Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.overviewCard, { backgroundColor: '#fefbeb', borderColor: '#fef08a' }]} onPress={() => navigation.navigate('Notifications')}>
            <View style={[styles.overviewIconCircle, { backgroundColor: '#fef3c7' }]}><Bell size={19} color="#d97706" /></View>
            <Text style={[styles.overviewVal, { color: '#b45309' }]}>{child.notifications}</Text>
            <Text style={styles.overviewLabel}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.overviewCard, { backgroundColor: '#faf5ff', borderColor: '#e9d5ff' }]} onPress={() => navigation.navigate('Fees')}>
            <View style={[styles.overviewIconCircle, { backgroundColor: '#f3e8ff' }]}><Wallet size={19} color="#9333ea" /></View>
            <Text style={[styles.overviewVal, { color: '#6b21a8' }]}>{child.dueFee}</Text>
            <Text style={styles.overviewLabel}>Due This Month</Text>
          </TouchableOpacity>
        </View>

        {/* RECENT UPDATES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.updatesCard}>
          {recentUpdates.map((update, idx) => {
            const IconComp = update.icon;
            return (
              <View key={idx} style={[styles.updateRow, idx < recentUpdates.length - 1 && styles.updateBorder]}>
                <View style={[styles.updateIcon, { backgroundColor: update.bg }]}>
                  <IconComp size={18} color={update.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.updateTitle}>{update.title}</Text>
                  <Text style={styles.updateDesc}>{update.desc}</Text>
                </View>
                <View style={styles.updateRight}>
                  <Text style={styles.updateTime}>{update.time}</Text>
                  <View style={styles.updateDot} />
                </View>
              </View>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { paddingBottom: 24 },
  heroBanner: { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 16 : 56, paddingBottom: 24, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroGreeting: { fontSize: 13, color: '#e0e7ff', fontWeight: '600' },
  heroName: { fontSize: 22, fontWeight: '900', color: '#ffffff', marginTop: 2 },
  heroSub: { fontSize: 12, color: '#e0e7ff', fontWeight: '500', marginTop: 6 },
  bellBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  bellDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444', position: 'absolute', top: 8, right: 10, borderWidth: 1.5, borderColor: '#ffffff' },
  studentCard: { marginHorizontal: 16, marginTop: -12, backgroundColor: '#ffffff', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#cbd5e1', elevation: 3, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
  studentTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  studentInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  studentName: { fontSize: 17, fontWeight: '900', color: '#1e3a8a' },
  studentClass: { fontSize: 13, color: '#2563eb', fontWeight: '700', marginTop: 1 },
  studentSchool: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 2 },
  viewProfileBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#1e3a8a', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, elevation: 2 },
  viewProfileText: { fontSize: 11, fontWeight: '800', color: '#ffffff' },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statIcon: { width: 24, height: 24, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  statLabel: { fontSize: 8, color: '#64748b', fontWeight: '700', letterSpacing: 0.3 },
  statVal: { fontSize: 11, fontWeight: '800', color: '#0f172a' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#1e3a8a', marginLeft: 16 },
  viewAll: { fontSize: 13, color: '#4f46e5', fontWeight: '700' },
  actionsGrid: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  actionCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 18, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#cbd5e1', elevation: 1 },
  actionIconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  actionLabel: { fontSize: 10, fontWeight: '800', color: '#334155', textAlign: 'center' },
  overviewGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8, marginTop: 12, marginBottom: 8 },
  overviewCard: { width: (width - 48) / 4, borderRadius: 16, padding: 10, alignItems: 'center', borderWidth: 1 },
  overviewIconCircle: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  overviewVal: { fontSize: 14, fontWeight: '900' },
  overviewLabel: { fontSize: 9, color: '#475569', fontWeight: '700', marginTop: 3, textAlign: 'center' },
  updatesCard: { marginHorizontal: 16, backgroundColor: '#ffffff', borderRadius: 20, borderWidth: 1, borderColor: '#cbd5e1', overflow: 'hidden', elevation: 2 },
  updateRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  updateBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  updateIcon: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  updateTitle: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  updateDesc: { fontSize: 12, color: '#64748b', fontWeight: '500', marginTop: 2 },
  updateRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  updateTime: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
  updateDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#ef4444' }
});
