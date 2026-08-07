import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import { User, Bell, ShieldCheck, FileText, HelpCircle, PhoneCall, LogOut, ChevronRight, Settings } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ParentProfileScreen({ navigation }: any) {
  const parent = {
    name: 'Anjali Sharma',
    email: 'anjali.sharma@gmail.com',
    phone: '+91 98765 43210',
    address: 'Lucknow, Uttar Pradesh'
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
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

  const menu = [
    { title: 'Notification Settings', icon: Bell, screen: 'NotificationSettings', color: '#4f46e5' },
    { title: 'Privacy & Security', icon: ShieldCheck, screen: 'PrivacySecurity', color: '#16a34a' },
    { title: 'Terms & Privacy Policy', icon: FileText, screen: 'Legal', color: '#0284c7' },
    { title: 'Help & FAQ', icon: HelpCircle, screen: 'Help', color: '#d97706' },
    { title: 'Support & Support Ticket', icon: PhoneCall, screen: 'Support', color: '#9333ea' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <Settings size={20} color="#4f46e5" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AS</Text>
          </View>
          <Text style={styles.name}>{parent.name}</Text>
          <Text style={styles.sub}>{parent.email}</Text>
          <Text style={styles.sub}>{parent.phone}</Text>
        </View>

        <View style={styles.menuCard}>
          {menu.map((m, idx) => {
            const IconComp = m.icon;
            return (
              <TouchableOpacity key={idx} style={styles.menuRow} onPress={() => navigation.navigate(m.screen)} activeOpacity={0.7}>
                <View style={[styles.menuIcon, { backgroundColor: m.color + '15' }]}>
                  <IconComp size={18} color={m.color} />
                </View>
                <Text style={styles.menuLabel}>{m.title}</Text>
                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <LogOut size={18} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 14 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 16 },
  profileCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { fontSize: 22, fontWeight: '900', color: '#ffffff' },
  name: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  sub: { fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: '600' },
  menuCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 6, borderWidth: 1, borderColor: '#e2e8f0' },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  menuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '800', color: '#0f172a' },
  logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fecaca', borderRadius: 16, padding: 14 },
  logoutText: { fontSize: 14, fontWeight: '800', color: '#ef4444' }
});
