import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import { Menu, Bell, Sparkles } from 'lucide-react-native';
import SidebarDrawer from './SidebarDrawer';

interface HeaderProps {
  navigation: any;
  title?: string;
  subtitle?: string;
  currentRoute?: string;
}

export default function Header({ navigation, title, subtitle, currentRoute }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <View style={styles.headerContainer}>
        {/* LEFT SECTION: SIDEBAR ICON & SCREEN NAME */}
        <View style={styles.leftSection}>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => setIsSidebarOpen(true)}
            activeOpacity={0.7}
          >
            <Menu size={22} color="#0f172a" />
          </TouchableOpacity>

          <View>
            <View style={styles.brandRow}>
              <Text style={styles.brandTitle}>{title || 'SchoolMitra'}</Text>
              <View style={styles.portalBadge}>
                <Sparkles size={10} color="#ffffff" />
                <Text style={styles.portalBadgeText}>TEACHER</Text>
              </View>
            </View>
            <Text style={styles.brandSub}>{subtitle || 'Academic Year 2026-27 • Class 8-A'}</Text>
          </View>
        </View>

        {/* RIGHT SECTION: NOTIFICATION & PROFILE ICONS SHIFTED TO RIGHT */}
        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.bellBtn}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Bell size={19} color="#0f172a" />
            <View style={styles.unreadDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avatarCircle}
            onPress={() => navigation.navigate('MyProfile')}
          >
            <Text style={styles.avatarText}>RS</Text>
            <View style={styles.activeDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SIDEBAR DRAWER MODAL */}
      <SidebarDrawer
        isVisible={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navigation={navigation}
        currentRoute={currentRoute}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 6 : 14,
    paddingBottom: 14,
    minHeight: Platform.OS === 'android' ? 74 + (StatusBar.currentHeight || 24) : 74,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    elevation: 3,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3
  },
  leftSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  portalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#7c3aed',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6
  },
  portalBadgeText: { fontSize: 9, fontWeight: '900', color: '#ffffff', letterSpacing: 0.5 },
  brandSub: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 1 },
  rightSection: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bellBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    position: 'absolute',
    top: 9,
    right: 9,
    borderWidth: 1.5,
    borderColor: '#ffffff'
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: { color: '#ffffff', fontWeight: '900', fontSize: 15 },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 1.5,
    borderColor: '#ffffff'
  }
});
