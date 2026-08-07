import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import {
  X,
  LayoutDashboard,
  GraduationCap,
  Calendar,
  UserCheck,
  BookOpen,
  FileText,
  Layers,
  HelpCircle,
  Award,
  FileCheck,
  MessageSquare,
  Megaphone,
  AlertCircle,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  navigation: any;
  currentRoute?: string;
}

export default function SidebarDrawer({ isVisible, onClose, navigation, currentRoute }: SidebarProps) {
  const navigateTo = (screenName: string) => {
    onClose();
    navigation.navigate(screenName);
  };

  const handleLogout = async () => {
    onClose();
    Alert.alert('Logout Confirmation', 'Are you sure you want to log out of SchoolMitra Teacher Portal?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('teacherToken');
          navigation.replace('Login');
        }
      }
    ]);
  };

  const menuSections = [
    {
      title: 'MAIN DASHBOARD',
      items: [
        { label: 'Dashboard Overview', icon: LayoutDashboard, screen: 'MainDashboard' },
        { label: 'My Classes & Students', icon: GraduationCap, screen: 'MyClasses' },
        { label: 'Today Schedule', icon: Calendar, screen: 'TodayClasses' }
      ]
    },
    {
      title: 'ACADEMICS & TEACHING',
      items: [
        { label: 'Mark Attendance', icon: UserCheck, screen: 'MarkAttendance' },
        { label: 'Homework Manager', icon: BookOpen, screen: 'HomeworkList' },
        { label: 'Project Assignments', icon: FileText, screen: 'AssignmentList' },
        { label: 'Study Material Library', icon: Layers, screen: 'MaterialLibrary' },
        { label: 'Weekly Tests & MCQs', icon: HelpCircle, screen: 'WeeklyTestList' },
        { label: 'Exams & Marks Entry', icon: Award, screen: 'ExamSchedule' },
        { label: 'Report Card Generator', icon: FileCheck, screen: 'ReportCardGenerator' }
      ]
    },
    {
      title: 'COMMUNICATION HUB',
      items: [
        { label: 'Parent Messages', icon: MessageSquare, screen: 'ParentMessages' },
        { label: 'Class Announcements', icon: Megaphone, screen: 'ClassAnnouncements' },
        { label: 'Complaints & Inquiries', icon: AlertCircle, screen: 'ComplaintReplies' },
        { label: 'Notification Center', icon: Bell, screen: 'Notifications' }
      ]
    },
    {
      title: 'ACCOUNT & SYSTEM',
      items: [
        { label: 'My Educator Profile', icon: User, screen: 'MyProfile' },
        { label: 'Leave Portal', icon: Calendar, screen: 'LeaveApplication' },
        { label: 'Privacy & Policy', icon: ShieldCheck, screen: 'PrivacyPolicy' },
        { label: 'App Settings', icon: Settings, screen: 'TeacherSettings' }
      ]
    }
  ];

  return (
    <Modal visible={isVisible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* SIDEBAR CONTAINER ANCHORED STRICTLY TO LEFT EDGE */}
        <View style={styles.sidebarContainer}>
          {/* HERO EDUCATOR HEADER - FULL BLEED AT TOP */}
          <LinearGradient
            colors={['#7c3aed', '#5b21b6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroHeader}
          >
            <View style={styles.topRow}>
              <View style={styles.schoolPill}>
                <Sparkles size={12} color="#ffffff" />
                <Text style={styles.schoolPillText}>SCHOOLMITRA EDUCATOR</Text>
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
                <X size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileRow}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>RS</Text>
                <View style={styles.onlineDot} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.teacherName}>Rahul Sharma</Text>
                <Text style={styles.teacherRole}>Senior Math Educator</Text>
                <View style={styles.idBadge}>
                  <ShieldCheck size={11} color="rgba(255,255,255,0.9)" />
                  <Text style={styles.teacherId}>ID: TCH-2024-125</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* MENU ITEMS LIST */}
          <ScrollView contentContainerStyle={styles.menuScroll} showsVerticalScrollIndicator={false}>
            {menuSections.map((section, sIdx) => (
              <View key={sIdx} style={styles.sectionBlock}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item, iIdx) => {
                  const IconComp = item.icon;
                  const screenName = typeof item.screen === 'string' ? item.screen : 'MainDashboard';
                  const isActive = currentRoute === screenName;
                  return (
                    <TouchableOpacity
                      key={iIdx}
                      style={[styles.menuItem, isActive && styles.menuItemActive]}
                      onPress={() => navigateTo(screenName)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.iconCircle, isActive && styles.iconCircleActive]}>
                        <IconComp size={18} color={isActive ? '#ffffff' : '#7c3aed'} />
                      </View>
                      <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                        {item.label}
                      </Text>
                      <ChevronRight size={16} color={isActive ? '#7c3aed' : '#cbd5e1'} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            {/* LOGOUT BUTTON */}
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
              <LogOut size={18} color="#ef4444" />
              <Text style={styles.logoutText}>Log Out Session</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* BACKDROP TOUCH CONTAINER ON RIGHT SIDE */}
        <TouchableOpacity style={styles.backdropTouch} activeOpacity={1} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(15, 23, 42, 0.65)' },
  backdropTouch: { flex: 1 },
  sidebarContainer: {
    width: Math.min(width * 0.82, 330),
    height: '100%',
    backgroundColor: '#ffffff',
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#0f172a',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12
  },
  heroHeader: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  schoolPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12
  },
  schoolPillText: { fontSize: 10, fontWeight: '900', color: '#ffffff', letterSpacing: 0.5 },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  avatarText: { fontSize: 19, fontWeight: '950', color: '#6d28d9' },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
    position: 'absolute',
    bottom: 1,
    right: 1
  },
  teacherName: { fontSize: 17, fontWeight: '950', color: '#ffffff' },
  teacherRole: { fontSize: 12, color: 'rgba(255, 255, 255, 0.85)', marginTop: 2, fontWeight: '700' },
  idBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  teacherId: { fontSize: 10, color: 'rgba(255, 255, 255, 0.8)', fontWeight: '800' },
  menuScroll: { paddingHorizontal: 16, paddingVertical: 18 },
  sectionBlock: { marginBottom: 18 },
  sectionTitle: { fontSize: 10, fontWeight: '900', color: '#94a3b8', letterSpacing: 0.8, marginBottom: 8, paddingLeft: 6 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 4,
    backgroundColor: '#ffffff'
  },
  menuItemActive: { backgroundColor: '#f3e8ff' },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconCircleActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  menuLabel: { flex: 1, fontSize: 13, fontWeight: '750', color: '#334155' },
  menuLabelActive: { color: '#7c3aed', fontWeight: '900' },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 14,
    height: 48,
    marginTop: 10,
    marginBottom: 20
  },
  logoutText: { fontSize: 13, fontWeight: '850', color: '#ef4444' }
});
