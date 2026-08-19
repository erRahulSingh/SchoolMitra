import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch, Platform } from 'react-native';
import { 
  User, Bus, Phone, ShieldCheck, Settings, Globe, LogOut, 
  ChevronRight, Moon, Sun, Bell, FileText, Shield, 
  HelpCircle, Info, Mail, Calendar, Hash, MapPin, Briefcase
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';

export default function DriverProfileScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const [driverUser, setDriverUser] = useState<any>({
    name: 'Rajesh Kumar',
    email: 'driver@schoolmitra.com',
    empId: 'EMP-DRV-101',
    licenseNo: 'DL142021008765',
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
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from your duty session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('driverUser');
            await AsyncStorage.removeItem('accessToken');
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const personalInfo = [
    { icon: User, label: 'Full Name', value: driverUser.name || 'Rajesh Kumar' },
    { icon: Phone, label: 'Mobile Number', value: driverUser.phone || '+91 98765 43210' },
    { icon: Mail, label: 'Email', value: driverUser.email || 'driver@schoolmitra.com' },
    { icon: Hash, label: 'Employee ID', value: driverUser.empId || 'EMP-DRV-101' },
    { icon: ShieldCheck, label: 'License Number', value: driverUser.licenseNo || 'DL142021008765' },
    { icon: Briefcase, label: 'Experience', value: '8+ Years Commercial' },
  ];

  const vehicleInfo = [
    { icon: Bus, label: 'Bus Number', value: driverUser.busNo || 'BUS-01' },
    { icon: MapPin, label: 'Assigned Route', value: 'Route #1 — Express' },
    { icon: User, label: 'Capacity', value: '42 Seats' },
    { icon: ShieldCheck, label: 'RTO Fitness', value: 'Valid till Dec 2026' },
  ];

  const menuItems = [
    { icon: FileText, label: 'RTO Documents & Compliance', screen: 'DriverDocuments', color: colors.accent },
    { icon: Settings, label: 'Settings & Preferences', screen: 'ProfileSettings', color: colors.textSecondary },
    { icon: Bell, label: 'Notification Settings', screen: 'ProfileSettings', color: colors.warning },
    { icon: Globe, label: 'Language / भाषा', screen: 'ProfileSettings', color: colors.purple },
    { icon: Shield, label: 'Privacy Policy', screen: 'PrivacyPolicy', color: colors.success },
    { icon: FileText, label: 'Terms & Conditions', screen: 'TermsConditions', color: colors.accent },
    { icon: Info, label: 'About App', screen: 'About', color: colors.textMuted },
    { icon: HelpCircle, label: 'Help & Support', screen: 'HelpSupport', color: colors.warning },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header Card */}
      <View style={[styles.profileCard, { backgroundColor: isDark ? '#0f172a' : colors.accent }]}>
        <View style={styles.avatarOuter}>
          <View style={[styles.avatar, { borderColor: isDark ? '#38bdf8' : '#ffffff' }]}>
            <User size={40} color={isDark ? '#38bdf8' : '#ffffff'} />
          </View>
          <View style={[styles.verifiedBadge, { backgroundColor: '#34d399' }]}>
            <ShieldCheck size={12} color="#ffffff" />
          </View>
        </View>
        <Text style={styles.name}>{driverUser.name || 'Rajesh Kumar'}</Text>
        <Text style={styles.role}>{driverUser.role || 'Senior School Bus Captain'}</Text>
        
        <View style={styles.profileBadges}>
          <View style={styles.profileBadge}>
            <ShieldCheck size={12} color="#34d399" />
            <Text style={styles.profileBadgeText}>RTO Verified</Text>
          </View>
          <View style={styles.profileBadge}>
            <Bus size={12} color="#38bdf8" />
            <Text style={[styles.profileBadgeText, { color: '#38bdf8' }]}>Route #4</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1,247</Text>
            <Text style={styles.statLabel}>Total Trips</Text>
          </View>
          <View style={[styles.statDivider]} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.9 ★</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={[styles.statDivider]} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3 Yrs</Text>
            <Text style={styles.statLabel}>With Us</Text>
          </View>
        </View>
      </View>

      {/* Personal Information */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {personalInfo.map((item, index) => {
          const Icon = item.icon;
          return (
            <View 
              key={index} 
              style={[
                styles.infoRow, 
                index < personalInfo.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: colors.border }
              ]}
            >
              <View style={[styles.infoIconBox, { backgroundColor: colors.accentSoft }]}>
                <Icon size={16} color={colors.accent} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>{item.label}</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{item.value}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Vehicle Information */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Vehicle Information</Text>
      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {vehicleInfo.map((item, index) => {
          const Icon = item.icon;
          return (
            <View 
              key={index} 
              style={[
                styles.infoRow, 
                index < vehicleInfo.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: colors.border }
              ]}
            >
              <View style={[styles.infoIconBox, { backgroundColor: colors.warningSoft }]}>
                <Icon size={16} color={colors.warning} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>{item.label}</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{item.value}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Dark Mode Toggle */}
      <View style={[styles.themeCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.themeRow}>
          <View style={styles.themeLeft}>
            <View style={[styles.infoIconBox, { backgroundColor: isDark ? colors.accentSoft : colors.warningSoft }]}>
              {isDark ? <Moon size={16} color={colors.accent} /> : <Sun size={16} color={colors.warning} />}
            </View>
            <View>
              <Text style={[styles.themeLabel, { color: colors.text }]}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
              <Text style={[styles.themeSub, { color: colors.textMuted }]}>
                {isDark ? 'Easier on eyes at night' : 'Better for daylight use'}
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#cbd5e1', true: '#0284c7' }}
            thumbColor={isDark ? '#38bdf8' : '#ffffff'}
          />
        </View>
      </View>

      {/* Menu Items */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings & Legal</Text>
      <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index < menuItems.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: colors.border }
              ]}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconBox, { backgroundColor: `${item.color}20` }]}>
                <Icon size={16} color={item.color} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
              <ChevronRight size={16} color={colors.textMuted} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Logout */}
      <TouchableOpacity 
        style={[styles.logoutBtn, { backgroundColor: colors.dangerSoft }]} 
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <LogOut size={18} color={colors.danger} />
        <Text style={[styles.logoutText, { color: colors.danger }]}>LOGOUT FROM DRIVER COCKPIT</Text>
      </TouchableOpacity>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  profileCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarOuter: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0f172a',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  role: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 12,
  },
  profileBadges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  profileBadgeText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 4,
  },
  infoCard: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  infoIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 1,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  themeCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 20,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  themeSub: {
    fontSize: 11,
    marginTop: 1,
  },
  menuCard: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
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
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    gap: 10,
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
