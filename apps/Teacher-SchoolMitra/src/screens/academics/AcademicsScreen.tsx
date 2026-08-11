import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import {
  Search,
  UserCheck,
  BookOpen,
  FileText,
  Layers,
  HelpCircle,
  Award,
  FileCheck,
  BarChart3,
  ClipboardList,
  Video,
  DollarSign,
  Bus,
  Trophy,
  FolderOpen,
  Calendar,
  MessageSquare,
  Wallet,
  Megaphone,
  Users
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../../components/Header';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40 - 24) / 4; // Computed 4-column layout (1*4)

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function AcademicsScreen({ navigation }: any) {
  const isFocused = useIsFocused();
  const [permissions, setPermissions] = React.useState<string[]>([]);

  React.useEffect(() => {
    const loadPermissions = async () => {
      try {
        const storedPerms = await AsyncStorage.getItem('permissions');
        if (storedPerms) {
          setPermissions(JSON.parse(storedPerms));
        } else {
          setPermissions([
            "students.view",
            "attendance.view",
            "attendance.create",
            "attendance.update",
            "homework.view",
            "homework.create",
            "marks.view",
            "marks.create"
          ]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (isFocused) {
      loadPermissions();
    }
  }, [isFocused]);

  const tools = [
    { label: 'Attendance', icon: UserCheck, screen: 'MarkAttendance', color: '#10b981', bg: '#ecfdf5', permissions: ['attendance.view', 'attendance.create'] },
    { label: 'Homework', icon: BookOpen, screen: 'HomeworkList', color: '#3b82f6', bg: '#eff6ff', permissions: ['homework.view', 'homework.create'] },
    { label: 'Assignments', icon: FileText, screen: 'AssignmentList', color: '#f97316', bg: '#fff7ed', permissions: ['assignments.view', 'assignments.create'] },
    { label: 'Study Material', icon: Layers, screen: 'MaterialLibrary', color: '#8b5cf6', bg: '#f5f3ff', permissions: ['materials.view', 'materials.create'] },
    { label: 'Weekly Test', icon: HelpCircle, screen: 'WeeklyTestList', color: '#ef4444', bg: '#fef2f2', permissions: ['exams.view', 'exams.create'] },
    { label: 'Exams', icon: Award, screen: 'ExamSchedule', color: '#2563eb', bg: '#eff6ff', permissions: ['exams.view'] },
    { label: 'Marks Entry', icon: ClipboardList, screen: 'ExamMarksEntry', color: '#06b6d4', bg: '#ecfeff', permissions: ['marks.view', 'marks.create'] },
    { label: 'Report Cards', icon: FileCheck, screen: 'ReportCardGenerator', color: '#16a34a', bg: '#f0fdf4', permissions: ['reports.view', 'reports.create'] },
    { label: 'Live Class', icon: Video, screen: 'LiveClass', color: '#ec4899', bg: '#fce7f3' },
    { label: 'Fees Overview', icon: DollarSign, screen: 'FeesOverview', color: '#06b6d4', bg: '#ecfeff' },
    { label: 'Transport Duty', icon: Bus, screen: 'TransportDuty', color: '#10b981', bg: '#ecfdf5' },
    { label: 'Holiday Calendar', icon: Calendar, screen: 'HolidayCalendar', color: '#ea580c', bg: '#ffedd5' },
    { label: 'Event Management', icon: Trophy, screen: 'EventManagement', color: '#7c3aed', bg: '#f3e8ff' },
    { label: 'My Documents', icon: FolderOpen, screen: 'MyDocuments', color: '#2563eb', bg: '#eff6ff' },
    { label: 'Class Notes', icon: FileText, screen: 'ClassNotes', color: '#ea580c', bg: '#ffedd5', permissions: ['materials.view', 'materials.create'] },
    { label: 'Student Portfolio', icon: FolderOpen, screen: 'StudentPortfolio', color: '#7c3aed', bg: '#f3e8ff', permissions: ['students.view'] },
    { label: 'Communications', icon: MessageSquare, screen: 'Communications', color: '#2563eb', bg: '#eff6ff', permissions: ['messages.view', 'messages.create'] },
    { label: 'Calendar', icon: Calendar, screen: 'Calendar', color: '#10b981', bg: '#ecfdf5' },
    { label: 'Salary & Payroll', icon: Wallet, screen: 'Payroll', color: '#ea580c', bg: '#ffedd5' },
    { label: 'School Circulars', icon: Megaphone, screen: 'ClassAnnouncements', color: '#7c3aed', bg: '#f3e8ff', permissions: ['announcements.create'] },
    { label: 'Parent Communication', icon: Users, screen: 'ParentCommunication', color: '#2563eb', bg: '#eff6ff', permissions: ['messages.view', 'messages.create'] },
    { label: 'Analytics', icon: BarChart3, screen: 'HomeworkAnalytics', color: '#d946ef', bg: '#fdf4ff', permissions: ['homework.view', 'assignments.view'] }
  ];

  const filteredTools = tools.filter(tool => {
    if (!tool.permissions) return true;
    return tool.permissions.some(p => permissions.includes(p));
  });


  const recentActivities = [
    { id: '1', title: 'Homework uploaded', sub: 'Class 8 - A • Maths', time: '2h ago', color: '#8b5cf6', bg: '#f5f3ff', icon: BookOpen },
    { id: '2', title: 'Attendance marked', sub: 'Class 8 - B • Science', time: '4h ago', color: '#10b981', bg: '#ecfdf5', icon: UserCheck },
    { id: '3', title: 'Weekly test created', sub: 'Class 9 - A • Maths', time: '1d ago', color: '#ef4444', bg: '#fef2f2', icon: HelpCircle }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* UNIFIED HEADER */}
      <Header navigation={navigation} title="Academics" currentRoute="AcademicsTab" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PREMIUM GRADIENT HERO BANNER */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Manage your</Text>
            <Text style={styles.heroTitle}>classroom</Text>
            <Text style={styles.heroTitleSub}>activities efficiently</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <ClipboardList size={34} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* ACADEMIC TOOLS GRID */}
        <Text style={styles.sectionTitle}>Academic Tools</Text>

        <View style={styles.toolsGrid}>
          {filteredTools.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={styles.toolCard}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={[styles.toolIconBox, { backgroundColor: item.bg }]}>
                  <IconComp size={20} color={item.color} />
                </View>
                <Text style={styles.toolLabel} numberOfLines={1}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* RECENT ACTIVITIES SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activitiesList}>
          {recentActivities.map((act) => {
            const IconComp = act.icon;
            return (
              <View key={act.id} style={styles.activityCard}>
                <View style={[styles.actIconBox, { backgroundColor: act.bg }]}>
                  <IconComp size={18} color={act.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.actTitle}>{act.title}</Text>
                  <Text style={styles.actSub}>{act.sub}</Text>
                </View>

                <Text style={styles.actTime}>{act.time}</Text>
              </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: 64
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  searchBtn: {
    position: 'absolute',
    right: 20,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: {
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  heroTitle: { fontSize: 20, fontWeight: '900', color: '#ffffff', lineHeight: 26 },
  heroTitleSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 6, fontWeight: '600' },
  heroIconBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  viewAll: { fontSize: 13, color: '#7c3aed', fontWeight: '700' },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24
  },
  toolCard: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  toolIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6
  },
  toolLabel: { fontSize: 10, fontWeight: '800', color: '#475569', textAlign: 'center' },
  activitiesList: { gap: 10, marginBottom: 20 },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  actIconBox: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  actTitle: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  actSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
  actTime: { fontSize: 11, color: '#94a3b8', fontWeight: '600' }
});
