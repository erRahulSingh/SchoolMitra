import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { 
  Home, BookOpen, Bus, MessageSquare, LayoutGrid, Users, CreditCard, 
  FileText, Calendar, Trophy, Image, Wallet, Megaphone, Bell, 
  ShieldCheck, HelpCircle, PhoneCall, LogOut, ChevronRight, X, Heart, Building
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ParentAppLogo from './ParentAppLogo';

interface DrawerProps {
  navigation: any;
}

export default function ParentDrawerContent({ navigation }: DrawerProps) {
  const parent = {
    name: 'Anjali Sharma',
    role: 'Parent Portal',
    child: 'Rohan Sharma (Class 5th-A)',
    initials: 'AS',
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('parentToken');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const menuSections = [
    {
      title: 'MAIN NAVIGATION',
      items: [
        { label: 'Home Dashboard', icon: Home, screen: 'MainTabs', tab: 'HomeTab' },
        { label: 'Academics Hub', icon: BookOpen, screen: 'MainTabs', tab: 'AcademicsTab' },
        { label: 'Live Bus Tracking', icon: Bus, screen: 'MainTabs', tab: 'TransportTab' },
        { label: 'All Services (More)', icon: LayoutGrid, screen: 'MainTabs', tab: 'MoreTab' },
        { label: 'Parent Messages', icon: MessageSquare, screen: 'Messages' },
      ],
    },
    {
      title: 'STUDENT & ACADEMICS',
      items: [
        { label: 'Child Profile', icon: Users, screen: 'ChildProfile' },
        { label: 'Digital ID Card', icon: CreditCard, screen: 'DigitalIDCard' },
        { label: 'Homework & Tasks', icon: FileText, screen: 'Homework' },
        { label: 'Exams & Marks', icon: Trophy, screen: 'Exams' },
        { label: 'Time Table', icon: Calendar, screen: 'TimeTable' },
        { label: 'Report Cards', icon: FileText, screen: 'ReportCard' },
      ],
    },
    {
      title: 'FEES & SCHOOL ACTIVITIES',
      items: [
        { label: 'Fee Payments', icon: Wallet, screen: 'Fees' },
        { label: 'Notice Board', icon: Megaphone, screen: 'NoticeBoard' },
        { label: 'School Events', icon: Trophy, screen: 'Events' },
        { label: 'Photo Gallery', icon: Image, screen: 'Gallery' },
        { label: 'Holiday Calendar', icon: Calendar, screen: 'Holidays' },
        { label: 'About School', icon: Building, screen: 'AboutSchool' },
      ],
    },
    {
      title: 'SETTINGS & SUPPORT',
      items: [
        { label: 'Notification Settings', icon: Bell, screen: 'NotificationSettings' },
        { label: 'Privacy & Security', icon: ShieldCheck, screen: 'PrivacySecurity' },
        { label: 'Help & FAQ', icon: HelpCircle, screen: 'Help' },
        { label: 'Support Helpline', icon: PhoneCall, screen: 'Support' },
      ],
    },
  ];

  const navigateTo = (screen: string, tab?: string) => {
    navigation.closeDrawer();
    if (tab) {
      navigation.navigate(screen, { screen: tab });
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Banner (Dark Navy) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.closeDrawer()}>
          <X size={20} color="#ffffff" />
        </TouchableOpacity>

        {/* Top App Brand Identity */}
        <View style={styles.brandRow}>
          <ParentAppLogo size={36} showBorder={false} />
          <View>
            <Text style={styles.brandTitle}>School<Text style={styles.brandHighlight}>Mitra</Text></Text>
            <Text style={styles.brandSubtitle}>Parent Companion</Text>
          </View>
        </View>

        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{parent.initials}</Text>
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.parentName}>{parent.name}</Text>
            <Text style={styles.parentRole}>{parent.role}</Text>
            <View style={styles.childBadge}>
              <Heart size={10} color="#ec4899" fill="#ec4899" />
              <Text style={styles.childBadgeText}>{parent.child}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Menu List */}
      <ScrollView 
        style={styles.menuScroll} 
        contentContainerStyle={styles.menuContent}
        showsVerticalScrollIndicator={false}
      >
        {menuSections.map((section, sIdx) => (
          <View key={sIdx} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, iIdx) => {
              const IconComp = item.icon;
              return (
                <TouchableOpacity
                  key={iIdx}
                  style={styles.menuItem}
                  onPress={() => navigateTo(item.screen, item.tab)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuIconBox}>
                    <IconComp size={18} color="#2563eb" />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <ChevronRight size={16} color="#94a3b8" />
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={18} color="#ef4444" />
          <Text style={styles.logoutText}>Logout Account</Text>
        </TouchableOpacity>

        {/* App Version & Logo Footer */}
        <View style={styles.drawerFooter}>
          <ParentAppLogo size={24} showBorder={false} />
          <Text style={styles.footerAppText}>SchoolMitra Parent Portal • v1.0.0</Text>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#0f172a',
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 20,
    paddingHorizontal: 18,
    borderBottomRightRadius: 24,
  },
  closeBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : 40,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
  },
  headerTextCol: {
    flex: 1,
  },
  parentName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  parentRole: {
    fontSize: 12,
    color: '#38bdf8',
    fontWeight: '600',
    marginTop: 1,
  },
  childBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  childBadgeText: {
    color: '#e2e8f0',
    fontSize: 10,
    fontWeight: '700',
  },
  menuScroll: {
    flex: 1,
  },
  menuContent: {
    padding: 16,
  },
  menuSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#94a3b8',
    letterSpacing: 1,
    marginBottom: 8,
    paddingLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f5f9',
    gap: 12,
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1e293b',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
    paddingRight: 36,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  brandHighlight: {
    color: '#38bdf8',
  },
  brandSubtitle: {
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  drawerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  footerAppText: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#fef2f2',
    gap: 8,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#ef4444',
  },
});

