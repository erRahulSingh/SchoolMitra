import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Platform } from 'react-native';
import { 
  Home, Map, Users, UserCheck, RotateCcw, ClipboardCheck, Cpu, Calendar,
  FileText, MessageSquare, HelpCircle, LogOut, Moon, Sun, Globe, X,
  Bus, ShieldCheck, ChevronRight
} from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DrawerContentProps {
  navigation: any;
  state: any;
}

export default function DrawerContent({ navigation, state }: DrawerContentProps) {
  const { colors, isDark, toggleTheme } = useTheme();
  const [driverUser, setDriverUser] = useState<any>({
    name: 'Rajesh Kumar',
    role: 'Senior School Bus Captain',
    busNo: 'BUS-01'
  });

  useEffect(() => {
    AsyncStorage.getItem('driverUser').then(res => {
      if (res) {
        try {
          setDriverUser(JSON.parse(res));
        } catch (e) {}
      }
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('driverUser');
    await AsyncStorage.removeItem('accessToken');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const menuSections = [
    {
      title: 'NAVIGATION',
      items: [
        { icon: Home, label: 'Dashboard', screen: 'MainApp', tab: 'Dashboard' },
        { icon: Map, label: 'Route Map', screen: 'MainApp', tab: 'Route' },
        { icon: Users, label: 'Pickup Roster', screen: 'StudentPickup' },
        { icon: UserCheck, label: 'Drop Roster', screen: 'StudentDrop' },
        { icon: RotateCcw, label: 'Return Trip', screen: 'ReturnTrip' },
      ],
    },
    {
      title: 'VEHICLE & DUTY',
      items: [
        { icon: ClipboardCheck, label: 'Vehicle Checklist', screen: 'VehicleChecklist' },
        { icon: Cpu, label: 'Device Status', screen: 'DeviceStatus' },
        { icon: Calendar, label: 'Duty Schedule', screen: 'DutySchedule' },
        { icon: FileText, label: 'Documents', screen: 'DriverDocuments' },
      ],
    },
    {
      title: 'COMMUNICATION',
      items: [
        { icon: MessageSquare, label: 'Messages', screen: 'Messages' },
        { icon: HelpCircle, label: 'Help & Support', screen: 'HelpSupport' },
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Driver Profile Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#0f172a' : '#0284c7' }]}>
        <TouchableOpacity 
          style={styles.closeBtn} 
          onPress={() => navigation.closeDrawer()}
        >
          <X size={20} color="#ffffff" />
        </TouchableOpacity>
        
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { borderColor: isDark ? '#38bdf8' : '#ffffff' }]}>
            <Bus size={28} color={isDark ? '#38bdf8' : '#ffffff'} />
          </View>
          <View style={styles.onlineDot} />
        </View>
        
        <Text style={styles.driverName}>{driverUser.name || 'Rajesh Kumar'}</Text>
        <Text style={styles.driverRole}>{driverUser.role || 'Senior School Bus Captain'}</Text>
        
        <View style={styles.busInfoRow}>
          <View style={styles.busBadge}>
            <Bus size={12} color="#ffffff" />
            <Text style={styles.busText}>{driverUser.busNo || 'BUS-01'}</Text>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.statusDotGreen} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView 
        style={styles.menuScroll} 
        contentContainerStyle={styles.menuContent}
        showsVerticalScrollIndicator={false}
      >
        {menuSections.map((section, sIdx) => (
          <View key={sIdx} style={styles.menuSection}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
              {section.title}
            </Text>
            {section.items.map((item, iIdx) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={iIdx}
                  style={[styles.menuItem, { borderBottomColor: colors.border }]}
                  onPress={() => navigateTo(item.screen, item.tab)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.menuIconBox, { backgroundColor: colors.accentSoft }]}>
                    <Icon size={18} color={colors.accent} />
                  </View>
                  <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                  <ChevronRight size={16} color={colors.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/* Theme Toggle */}
        <View style={[styles.themeSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.themeRow}>
            <View style={styles.themeLeft}>
              {isDark ? (
                <Moon size={18} color={colors.accent} />
              ) : (
                <Sun size={18} color={colors.warning} />
              )}
              <Text style={[styles.themeLabel, { color: colors.text }]}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#cbd5e1', true: '#0284c7' }}
              thumbColor={isDark ? '#38bdf8' : '#ffffff'}
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity 
          style={[styles.logoutBtn, { backgroundColor: colors.dangerSoft }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={18} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger }]}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
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
  avatarContainer: {
    marginBottom: 12,
    position: 'relative',
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#34d399',
    borderWidth: 2,
    borderColor: '#0f172a',
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  driverRole: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
  },
  busInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  busBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  busText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statusDotGreen: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34d399',
  },
  statusText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '600',
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
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
    paddingLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  themeSection: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
