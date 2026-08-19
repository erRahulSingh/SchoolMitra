import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Menu, Bell } from 'lucide-react-native';
import { useParentDrawer } from '../context/ParentDrawerContext';
import ParentAppLogo from './ParentAppLogo';

interface ParentHeaderProps {
  onMenuPress?: () => void;
  onBellPress?: () => void;
  unreadCount?: number;
}

export default function ParentHeader({ onMenuPress, onBellPress, unreadCount = 3 }: ParentHeaderProps) {
  const { openDrawer } = useParentDrawer();

  const handleMenuClick = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      openDrawer();
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* Menu Hamburger Icon */}
      <TouchableOpacity style={styles.iconBtn} onPress={handleMenuClick} activeOpacity={0.7}>
        <Menu size={24} color="#0f172a" strokeWidth={2.2} />
      </TouchableOpacity>

      {/* SchoolMitra Brand Logo Center */}
      <View style={styles.logoCenter}>
        <View style={styles.logoBadge}>
          <ParentAppLogo size={28} showBorder={false} />
          <View style={styles.brandTextRow}>
            <Text style={styles.brandName}>School<Text style={styles.brandAccent}>Mitra</Text></Text>
            <Text style={styles.brandTagline}>Parent Portal</Text>
          </View>
        </View>
      </View>

      {/* Notification Bell Icon with Badge */}
      <TouchableOpacity style={styles.iconBtn} onPress={onBellPress} activeOpacity={0.7}>
        <View style={styles.bellWrapper}>
          <Bell size={24} color="#0f172a" strokeWidth={2} />
          {unreadCount > 0 && (
            <View style={styles.badgeDot}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  logoCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTextRow: {
    alignItems: 'center',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: -0.5,
    lineHeight: 20,
  },
  brandAccent: {
    color: '#16a34a',
  },
  brandTagline: {
    fontSize: 7.5,
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: 0.2,
    marginTop: -1,
  },
  bellWrapper: {
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '900',
  },
});
