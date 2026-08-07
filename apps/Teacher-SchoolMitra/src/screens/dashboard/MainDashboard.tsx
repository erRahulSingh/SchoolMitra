import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import {
  Bell,
  BookOpen,
  UserCheck,
  Award,
  HelpCircle,
  Clock,
  ChevronRight,
  CheckCircle2,
  Users,
  Calendar,
  Layers,
  FlaskConical,
  GraduationCap,
  Sparkles
} from 'lucide-react-native';
import Header from '../../components/Header';

import { LinearGradient } from 'expo-linear-gradient';

export default function MainDashboard({ navigation }: any) {
  const todayClasses = [
    { id: 'c1', time: '08:00 AM', subject: 'Maths', class: 'Class 8 - A', icon: BookOpen, color: '#7c3aed', bg: '#f3e8ff' },
    { id: 'c2', time: '09:30 AM', subject: 'Science', class: 'Class 8 - A', icon: FlaskConical, color: '#16a34a', bg: '#dcfce7' },
    { id: 'c3', time: '11:00 AM', subject: 'English', class: 'Class 8 - A', icon: BookOpen, color: '#ea580c', bg: '#ffedd5' }
  ];

  const overviewStats = [
    { count: '142', label: 'Total Students', color: '#2563eb', bg: '#eff6ff', icon: Users },
    { count: '136', label: 'Present', color: '#16a34a', bg: '#dcfce7', icon: CheckCircle2 },
    { count: '6', label: 'Absent', color: '#dc2626', bg: '#fef2f2', icon: UserCheck },
    { count: '5', label: 'Leave', color: '#d97706', bg: '#fef3c7', icon: Calendar }
  ];

  const quickActions = [
    { label: 'Attendance', icon: UserCheck, screen: 'MarkAttendance', color: '#7c3aed', bg: '#f3e8ff' },
    { label: 'Homework', icon: BookOpen, screen: 'HomeworkList', color: '#7c3aed', bg: '#f3e8ff' },
    { label: 'Weekly Test', icon: HelpCircle, screen: 'WeeklyTestList', color: '#2563eb', bg: '#eff6ff' },
    { label: 'Marks Entry', icon: Award, screen: 'ExamSchedule', color: '#ea580c', bg: '#ffedd5' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* UNIFIED HEADER */}
      <Header navigation={navigation} title="SchoolMitra" currentRoute="MainDashboard" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PREMIUM GRADIENT HERO BANNER */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>You have 3 classes today</Text>
            <Text style={styles.heroSub}>Keep going, you're doing great!</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <GraduationCap size={32} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TODAY'S CLASSES SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Classes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TodayClasses')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.classList}>
          {todayClasses.map((cls) => {
            const IconComp = cls.icon;
            return (
              <TouchableOpacity
                key={cls.id}
                style={styles.classCard}
                onPress={() => navigation.navigate('Attendance', { classId: cls.id })}
              >
                <View style={[styles.classIconCircle, { backgroundColor: cls.bg }]}>
                  <IconComp size={20} color={cls.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.timeText}>{cls.time}</Text>
                  <Text style={styles.subjectText}>{cls.subject}</Text>
                </View>

                <Text style={styles.classNameText}>{cls.class}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* TODAY'S OVERVIEW SECTION */}
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.overviewGrid}>
          {overviewStats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <View key={idx} style={styles.statBox}>
                <View style={[styles.statBadgeCircle, { backgroundColor: stat.bg }]}>
                  <IconComp size={16} color={stat.color} />
                </View>
                <Text style={styles.statCount}>{stat.count}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        {/* QUICK ACTIONS SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Widgets')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, idx) => {
            const IconComp = action.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={styles.quickActionItem}
                onPress={() => navigation.navigate(action.screen)}
              >
                <View style={[styles.actionIconCircle, { backgroundColor: action.bg }]}>
                  <IconComp size={22} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  greetingSub: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  teacherName: { fontSize: 22, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  dateText: { fontSize: 12, color: '#94a3b8', fontWeight: '600', marginTop: 2 },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justify: 'center',
    alignItems: 'center'
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#ef4444',
    position: 'absolute',
    top: 10,
    right: 10,
    borderWidth: 1.5,
    borderColor: '#ffffff'
  },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 6 },
  sectionTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  viewAll: { fontSize: 13, color: '#7c3aed', fontWeight: '700' },
  classList: { gap: 10, marginBottom: 20 },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  classIconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  timeText: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  subjectText: { fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: '600' },
  classNameText: { fontSize: 12, fontWeight: '700', color: '#94a3b8' },
  overviewGrid: { flexDirection: 'row', gap: 10, marginBottom: 20, marginTop: 10 },
  statBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  statBadgeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  statCount: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  statLabel: { fontSize: 10, fontWeight: '700', color: '#64748b', marginTop: 2, textAlign: 'center' },
  quickActionsGrid: { flexDirection: 'row', gap: 10, justifyContent: 'space-between', marginTop: 10, marginBottom: 20 },
  quickActionItem: { flex: 1, alignItems: 'center' },
  actionIconCircle: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  actionLabel: { fontSize: 11, fontWeight: '700', color: '#334155', textAlign: 'center' }
});
