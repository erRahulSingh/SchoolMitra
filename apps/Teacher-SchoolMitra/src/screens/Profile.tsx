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
  Settings,
  Mail,
  Phone,
  User,
  Lock,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera
} from 'lucide-react-native';

import Header from '../components/Header';

export default function Profile({ navigation }: any) {
  const teacher = {
    name: 'Neha Sharma',
    role: 'Mathematics Teacher',
    email: 'neha.sharma@schoolmitra.com',
    phone: '+91 98765 43210'
  };

  const handleLogout = () => {
    navigation.navigate('LogoutConfirmation');
  };

  const accountMenu = [
    { title: 'Personal Information', icon: User, screen: 'MyProfile' },
    { title: 'Change Password', icon: Lock, screen: 'TeacherSettings' },
    { title: 'Notification Settings', icon: Bell, screen: 'TeacherSettings' },
    { title: 'Privacy & Security Policy', icon: Shield, screen: 'PrivacyPolicy' }
  ];

  const appMenu = [
    { title: 'Help & Support', icon: HelpCircle, screen: 'HelpSupport' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* UNIFIED HEADER */}
      <Header navigation={navigation} title="Profile" currentRoute="Profile" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* AVATAR HERO CONTAINER */}
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircleContainer}>
            <View style={styles.avatarCircle}>
              <User size={48} color="#7c3aed" />
            </View>
            <TouchableOpacity style={styles.cameraBadge} onPress={() => Alert.alert('Camera', 'Upload new profile photo...')}>
              <Camera size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.teacherName}>{teacher.name}</Text>
          <Text style={styles.teacherRole}>{teacher.role}</Text>

          {/* CONTACT INFO */}
          <View style={styles.contactDetailsRow}>
            <View style={styles.contactItem}>
              <Mail size={14} color="#64748b" style={{ marginRight: 8 }} />
              <Text style={styles.contactText}>{teacher.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Phone size={14} color="#64748b" style={{ marginRight: 8 }} />
              <Text style={styles.contactText}>{teacher.phone}</Text>
            </View>
          </View>
        </View>

        {/* ACCOUNT SECTION */}
        <Text style={styles.sectionHeading}>Account</Text>
        <View style={styles.menuCard}>
          {accountMenu.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.menuRow,
                  idx === accountMenu.length - 1 && { borderBottomWidth: 0 }
                ]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={styles.menuRowLeft}>
                  <IconComp size={18} color="#475569" />
                  <Text style={styles.menuLabel}>{item.title}</Text>
                </View>
                <ChevronRight size={16} color="#cbd5e1" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* APP SECTION */}
        <Text style={styles.sectionHeading}>App</Text>
        <View style={styles.menuCard}>
          {appMenu.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={styles.menuRow}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={styles.menuRowLeft}>
                  <IconComp size={18} color="#475569" />
                  <Text style={styles.menuLabel}>{item.title}</Text>
                </View>
                <ChevronRight size={16} color="#cbd5e1" />
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[styles.menuRow, { borderBottomWidth: 0 }]}
            onPress={handleLogout}
          >
            <View style={styles.menuRowLeft}>
              <LogOut size={18} color="#ef4444" />
              <Text style={[styles.menuLabel, { color: '#ef4444' }]}>Logout</Text>
            </View>
            <ChevronRight size={16} color="#cbd5e1" />
          </TouchableOpacity>
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
  settingsBtn: {
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
  avatarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
  },
  avatarCircleContainer: {
    position: 'relative',
    marginBottom: 12
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#cbd5e1'
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff'
  },
  teacherName: { fontSize: 18, fontWeight: '950', color: '#0f172a' },
  teacherRole: { fontSize: 12, color: '#64748b', fontWeight: '800', marginTop: 3 },
  contactDetailsRow: {
    marginTop: 16,
    gap: 8,
    alignItems: 'center'
  },
  contactItem: { flexDirection: 'row', alignItems: 'center' },
  contactText: { fontSize: 12, color: '#475569', fontWeight: '800' },
  sectionHeading: { fontSize: 13, fontWeight: '900', color: '#64748b', textTransform: 'uppercase', marginBottom: 10, marginLeft: 6, marginTop: 8 },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  menuRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuLabel: { fontSize: 13, fontWeight: '850', color: '#334155' }
});
