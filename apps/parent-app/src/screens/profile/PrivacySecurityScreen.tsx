import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Lock, ShieldCheck, Clock, Smartphone, Shield, Users, Download, ChevronRight } from 'lucide-react-native';

export default function PrivacySecurityScreen({ navigation }: any) {
  const securityOptions = [
    { title: 'Change Password', icon: Lock },
    { title: 'Two-Factor Authentication', isEnabled: true, icon: ShieldCheck },
    { title: 'Login Activity', sub: 'View recent login activity', icon: Clock },
    { title: 'Active Sessions', sub: 'Manage your active sessions', icon: Smartphone },
  ];

  const privacyOptions = [
    { title: 'Data Privacy', sub: 'How your data is used', icon: Shield },
    { title: 'Manage Permissions', sub: 'Control app permissions', icon: Users },
    { title: 'Download My Data', sub: 'Request a copy of your data', icon: Download },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Security Section */}
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.cardGroup}>
          {securityOptions.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.row, idx < securityOptions.length - 1 && styles.rowBorder]}
                activeOpacity={0.75}
              >
                <View style={styles.iconSquare}>
                  <IconComp size={18} color="#2563eb" />
                </View>

                <View style={styles.textCol}>
                  <Text style={styles.optionTitleText}>{item.title}</Text>
                  {item.sub && <Text style={styles.optionSubText}>{item.sub}</Text>}
                </View>

                {item.isEnabled ? (
                  <View style={styles.enabledBadge}>
                    <Text style={styles.enabledText}>Enabled</Text>
                  </View>
                ) : null}

                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Privacy Section */}
        <Text style={styles.sectionTitle}>Privacy</Text>
        <View style={styles.cardGroup}>
          {privacyOptions.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.row, idx < privacyOptions.length - 1 && styles.rowBorder]}
                activeOpacity={0.75}
              >
                <View style={styles.iconSquare}>
                  <IconComp size={18} color="#2563eb" />
                </View>

                <View style={styles.textCol}>
                  <Text style={styles.optionTitleText}>{item.title}</Text>
                  {item.sub && <Text style={styles.optionSubText}>{item.sub}</Text>}
                </View>

                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  cardGroup: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconSquare: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' },
  textCol: { flex: 1 },
  optionTitleText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  optionSubText: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 2 },
  enabledBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginRight: 4 },
  enabledText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },
});
