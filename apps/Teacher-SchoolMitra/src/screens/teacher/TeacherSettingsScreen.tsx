import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
  StatusBar
} from 'react-native';
import {
  ChevronLeft,
  Settings,
  Bell,
  Lock,
  Moon,
  Globe,
  Trash2,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
  Sparkles
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TeacherSettingsScreen({ navigation }: any) {
  const [notifAnnouncements, setNotifAnnouncements] = useState(true);
  const [notifSubmissions, setNotifSubmissions] = useState(true);
  const [notifParentMessages, setNotifParentMessages] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const handleClearCache = () => {
    Alert.alert('Cache Cleared 🧹', 'Local cache & temporary files cleared successfully!');
  };

  const handleLogout = async () => {
    Alert.alert('Logout Confirmation', 'Are you sure you want to log out of SchoolMitra?', [
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Settings</Text>
        <Settings size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* NOTIFICATION PREFERENCES */}
        <Text style={styles.sectionHeaderTitle}>Notification Preferences</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <Bell size={18} color="#7c3aed" />
              <View>
                <Text style={styles.settingTitle}>Class Notices & Alerts</Text>
                <Text style={styles.settingSub}>Push alerts for posted announcements</Text>
              </View>
            </View>
            <Switch
              value={notifAnnouncements}
              onValueChange={setNotifAnnouncements}
              trackColor={{ false: '#cbd5e1', true: '#ddd6fe' }}
              thumbColor={notifAnnouncements ? '#7c3aed' : '#f1f5f9'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <Bell size={18} color="#7c3aed" />
              <View>
                <Text style={styles.settingTitle}>Assignment Submissions</Text>
                <Text style={styles.settingSub}>Alerts when students submit homework</Text>
              </View>
            </View>
            <Switch
              value={notifSubmissions}
              onValueChange={setNotifSubmissions}
              trackColor={{ false: '#cbd5e1', true: '#ddd6fe' }}
              thumbColor={notifSubmissions ? '#7c3aed' : '#f1f5f9'}
            />
          </View>

          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={styles.rowLeft}>
              <Bell size={18} color="#7c3aed" />
              <View>
                <Text style={styles.settingTitle}>Parent Chat Messages</Text>
                <Text style={styles.settingSub}>Alerts for direct messages from parents</Text>
              </View>
            </View>
            <Switch
              value={notifParentMessages}
              onValueChange={setNotifParentMessages}
              trackColor={{ false: '#cbd5e1', true: '#ddd6fe' }}
              thumbColor={notifParentMessages ? '#7c3aed' : '#f1f5f9'}
            />
          </View>
        </View>

        {/* SECURITY & LOGIN */}
        <Text style={styles.sectionHeaderTitle}>Security & Account</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => Alert.alert('Change Password', 'Opening password reset dialog...')}
          >
            <View style={styles.rowLeft}>
              <Lock size={18} color="#7c3aed" />
              <Text style={styles.settingTitle}>Change Account Password</Text>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </TouchableOpacity>

          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={styles.rowLeft}>
              <Lock size={18} color="#7c3aed" />
              <View>
                <Text style={styles.settingTitle}>Biometric / Fingerprint Sign-in</Text>
                <Text style={styles.settingSub}>Use Touch ID / Face ID to unlock app</Text>
              </View>
            </View>
            <Switch
              value={biometricLogin}
              onValueChange={setBiometricLogin}
              trackColor={{ false: '#cbd5e1', true: '#ddd6fe' }}
              thumbColor={biometricLogin ? '#7c3aed' : '#f1f5f9'}
            />
          </View>
        </View>

        {/* SYSTEM & HELP */}
        <Text style={styles.sectionHeaderTitle}>System Preferences</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.settingRow} onPress={handleClearCache}>
            <View style={styles.rowLeft}>
              <Trash2 size={18} color="#64748b" />
              <Text style={styles.settingTitle}>Clear Local App Cache (12 MB)</Text>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <View style={styles.rowLeft}>
              <Shield size={18} color="#64748b" />
              <Text style={styles.settingTitle}>Privacy & Terms Policy</Text>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingRow, { borderBottomWidth: 0 }]}
            onPress={() => Alert.alert('Help & Manual', 'Educator User Guide & Support Helpline: 1800-123-SCHOOL')}
          >
            <View style={styles.rowLeft}>
              <HelpCircle size={18} color="#64748b" />
              <Text style={styles.settingTitle}>Help Center & Educator Manual</Text>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <LogOut size={18} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out from Mobile Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  sectionHeaderTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 8, marginTop: 10 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  settingTitle: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  settingSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 16,
    height: 52,
    marginTop: 10,
    marginBottom: 20
  },
  logoutText: { fontSize: 14, color: '#ef4444', fontWeight: '800' }
});
