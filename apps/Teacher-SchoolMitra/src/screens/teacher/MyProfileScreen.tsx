import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
import {
  ChevronLeft,
  Edit2,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  MapPin,
  BookOpen,
  Lock,
  Bell,
  Shield,
  ChevronRight,
  User
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/Header';

export default function MyProfileScreen({ navigation }: any) {
  const teacher = {
    name: 'Rajesh Sharma',
    empId: 'TCH-2024-125',
    role: 'Mathematics Teacher',
    joined: 'Joined on 15 Aug 2023',
    email: 'rajesh.sharma@school.com',
    phone: '+91 98765 43210',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    experience: '6 Years',
    address: '123, Green Park, New Delhi',
    subjects: 'Mathematics, Algebra, Trigonometry'
  };

  const handleLogout = async () => {
    navigation.navigate('LogoutConfirmation');
  };

  const infoItems = [
    { label: 'Email', val: teacher.email, icon: Mail },
    { label: 'Phone', val: teacher.phone, icon: Phone },
    { label: 'Qualification', val: teacher.qualification, icon: GraduationCap },
    { label: 'Experience', val: teacher.experience, icon: Briefcase },
    { label: 'Address', val: teacher.address, icon: MapPin },
    { label: 'Subjects', val: teacher.subjects, icon: BookOpen }
  ];

  const actions = [
    { label: 'Change Password', icon: Lock, screen: 'TeacherSettings' },
    { label: 'Notification Preferences', icon: Bell, screen: 'TeacherSettings' },
    { label: 'Privacy Settings', icon: Shield, screen: 'TeacherSettings' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* UNIFIED HEADER */}
      <Header navigation={navigation} title="My Profile" currentRoute="MyProfile" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* TEACHER INFO BLOCK CARD */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarCircle}>
            <User size={38} color="#7c3aed" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.teacherName}>{teacher.name}</Text>
            <Text style={styles.teacherId}>Teacher ID: {teacher.empId}</Text>
            <View style={styles.subjectBadge}>
              <Text style={styles.subjectBadgeText}>{teacher.role}</Text>
            </View>
            <Text style={styles.joinedText}>{teacher.joined}</Text>
          </View>
        </View>

        {/* INFO ITEMS LIST */}
        <View style={styles.infoListCard}>
          {infoItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View
                key={idx}
                style={[
                  styles.infoRow,
                  idx === infoItems.length - 1 && { borderBottomWidth: 0 }
                ]}
              >
                <View style={styles.iconBox}>
                  <IconComp size={16} color="#7c3aed" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoVal}>{item.val}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* ACTIONS CARD */}
        <View style={styles.actionsCard}>
          {actions.map((act, idx) => {
            const IconComp = act.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.actionRow,
                  idx === actions.length - 1 && { borderBottomWidth: 0 }
                ]}
                onPress={() => navigation.navigate(act.screen)}
              >
                <View style={styles.actionRowLeft}>
                  <IconComp size={18} color="#7c3aed" />
                  <Text style={styles.actionRowLabel}>{act.label}</Text>
                </View>
                <ChevronRight size={16} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: Platform.OS === 'android' ? 64 + (StatusBar.currentHeight || 0) : 64
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  backBtn: {
    position: 'absolute',
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editBtn: {
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
  profileHeaderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teacherName: { fontSize: 18, fontWeight: '950', color: '#0f172a' },
  teacherId: { fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: '700' },
  subjectBadge: {
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6
  },
  subjectBadgeText: { fontSize: 10, fontWeight: '900', color: '#7c3aed' },
  joinedText: { fontSize: 11, color: '#94a3b8', fontWeight: '700', marginTop: 8 },
  infoListCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '800' },
  infoVal: { fontSize: 13, fontWeight: '850', color: '#334155', marginTop: 2 },
  actionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  actionRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  actionRowLabel: { fontSize: 13, fontWeight: '800', color: '#334155' },
  logoutBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fca5a5',
    marginBottom: 30
  },
  logoutText: { fontSize: 14, fontWeight: '800', color: '#ef4444' }
});
