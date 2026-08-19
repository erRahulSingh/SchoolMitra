import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import { 
  User, Lock, Bell, Link, HelpCircle, Info, LogOut, ChevronRight, Shield, Award
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ParentProfileScreen({ navigation }: any) {
  const parent = {
    name: 'Anjali Sharma',
    role: 'Mother of Rohan Sharma',
    phone: '+91 98765 43210',
    email: 'anjali.sharma@email.com',
    initials: 'AS',
  };

  const child = {
    name: 'Rohan Sharma',
    class: 'Class 5th – A',
    roll: 'Roll No. 12',
    initials: 'RS',
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout from Parent Portal?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('parentToken');
          navigation.replace('Login');
        }
      }
    ]);
  };

  const accountMenu = [
    { title: 'Personal Information', icon: User, screen: 'ChildProfile' },
    { title: 'Documents & Certificates', icon: Award, screen: 'ParentDocumentsCertificates' },
    { title: 'Change Password', icon: Lock, screen: 'PrivacySecurity' },
    { title: 'Notification Settings', icon: Bell, screen: 'NotificationSettings' },
    { title: 'Linked Accounts', icon: Link, screen: 'PrivacySecurity' },
  ];

  const helpMenu = [
    { title: 'About School & Social Handles', icon: Info, screen: 'AboutSchool' },
    { title: 'Help & Support', icon: HelpCircle, screen: 'Help' },
    { title: 'About SchoolMitra App', icon: Info, screen: 'Legal' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* 1. TOP PROFILE HERO BANNER (DARK NAVY) */}
        <TouchableOpacity 
          style={styles.profileHero} 
          onPress={() => navigation.navigate('ChildProfile')}
          activeOpacity={0.9}
        >
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{parent.initials}</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.parentName}>{parent.name}</Text>
            <Text style={styles.parentRole}>{parent.role}</Text>
            <Text style={styles.parentContact}>{parent.phone}</Text>
            <Text style={styles.parentContact}>{parent.email}</Text>
          </View>

          <ChevronRight size={22} color="#ffffff" />
        </TouchableOpacity>

        {/* 2. MY CHILDREN SECTION */}
        <Text style={styles.sectionTitle}>My Children</Text>
        <View style={styles.childrenCard}>
          <View style={styles.childLeft}>
            <View style={styles.childAvatar}>
              <Text style={styles.childAvatarText}>{child.initials}</Text>
            </View>
            <View>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childClass}>{child.class}</Text>
              <Text style={styles.childRoll}>{child.roll}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.viewChildBtn} 
            onPress={() => navigation.navigate('ChildProfile')}
            activeOpacity={0.8}
          >
            <Text style={styles.viewChildText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* 3. ACCOUNT SETTINGS LIST */}
        <View style={styles.menuGroupCard}>
          {accountMenu.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.menuRow, idx < accountMenu.length - 1 && styles.menuBorder]}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <IconComp size={20} color="#475569" strokeWidth={2} />
                <Text style={styles.menuTitle}>{item.title}</Text>
                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 4. HELP & ABOUT LIST */}
        <View style={styles.menuGroupCard}>
          {helpMenu.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.menuRow, idx < helpMenu.length - 1 && styles.menuBorder]}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <IconComp size={20} color="#475569" strokeWidth={2} />
                <Text style={styles.menuTitle}>{item.title}</Text>
                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 5. LOGOUT CARD */}
        <TouchableOpacity 
          style={styles.logoutCard} 
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={20} color="#ef4444" strokeWidth={2.2} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 110,
  },

  // 1. Top Profile Hero Banner (Dark Navy)
  profileHero: {
    backgroundColor: '#0f172a',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 16 : 56,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  avatarLarge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#ffffff',
  },
  avatarLargeText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    marginRight: 10,
  },
  parentName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 2,
  },
  parentRole: {
    fontSize: 13,
    color: '#38bdf8',
    fontWeight: '700',
    marginBottom: 6,
  },
  parentContact: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '500',
    lineHeight: 16,
  },

  // 2. My Children Section
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0f172a',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  childrenCard: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    marginBottom: 16,
  },
  childLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  childAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  childAvatarText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#2563eb',
  },
  childName: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0f172a',
  },
  childClass: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginTop: 2,
  },
  childRoll: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
    marginTop: 2,
  },
  viewChildBtn: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  viewChildText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563eb',
  },

  // 3 & 4. Menu Group Cards
  menuGroupCard: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#1e293b',
  },

  // 5. Logout Card
  logoutCard: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#fee2e2',
    elevation: 1,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#ef4444',
  },
});
