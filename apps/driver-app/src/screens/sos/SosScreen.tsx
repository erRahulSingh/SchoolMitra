import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import { ChevronLeft, Phone, Building, ShieldAlert, UserCheck, HeartPulse } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { createSocketConnection } from '../../lib/socketClient';

export default function SosScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  
  const contacts = [
    { title: 'School Control Room', phone: '+91 98765 43210', icon: Building, color: '#2563eb', bg: '#eff6ff' },
    { title: 'Police Control Room', phone: '100', icon: ShieldAlert, color: '#ea580c', bg: '#ffedd5' },
    { title: 'Driver Support Team', phone: '+91 87654 32109', icon: UserCheck, color: '#16a34a', bg: '#dcfce7' },
    { title: 'Ambulance', phone: '108', icon: HeartPulse, color: '#ef4444', bg: '#fee2e2' },
  ];

  const handleTriggerSOS = () => {
    const socket = createSocketConnection("http://localhost:5000");
    if (socket && typeof socket.emit === 'function') {
      socket.emit("driver:sos_alert", {
        schoolId: "650000000000000000000001",
        driverId: "DRV-101",
        busId: "BUS-01",
        tripId: "TRIP-101",
        latitude: 28.5833,
        longitude: 77.0667,
        timestamp: new Date().toISOString(),
        status: "CRITICAL"
      });
    }
    Alert.alert('SOS Emergency Alert Sent! 🚨', 'GPS location broadcasted to Control Room & Police.');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.card} />
      
      {/* Header Bar */}
      <View style={[styles.headerBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>SOS Emergency</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* SOS Emergency Panic Card */}
        <View style={[styles.sosCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity
            style={styles.sosCircleOuter}
            onLongPress={handleTriggerSOS}
            activeOpacity={0.8}
          >
            <View style={styles.sosCircleInner}>
              <Text style={styles.sosText}>SOS</Text>
            </View>
          </TouchableOpacity>

          <Text style={[styles.alertTitleText, { color: colors.text }]}>Emergency Alert</Text>
          <Text style={styles.alertSubText}>Press and hold to send alert</Text>
        </View>

        {/* Quick Contacts Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Contacts</Text>
        <View style={[styles.contactsCardList, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {contacts.map((contact, idx) => {
            const IconComp = contact.icon;
            return (
              <View key={idx} style={[styles.contactRow, idx < contacts.length - 1 && styles.rowBorder]}>
                <View style={[styles.iconSquare, { backgroundColor: contact.bg }]}>
                  <IconComp size={18} color={contact.color} />
                </View>

                <View style={styles.contactInfoCol}>
                   <Text style={[styles.contactTitleText, { color: colors.text }]}>{contact.title}</Text>
                   <Text style={[styles.contactPhoneText, { color: colors.textSecondary }]}>{contact.phone}</Text>
                </View>

                <TouchableOpacity style={styles.callCircleBtn} activeOpacity={0.8}>
                  <Phone size={16} color="#16a34a" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* How SOS Works? Info Banner */}
        <View style={[styles.howItWorksBanner, { backgroundColor: colors.accentSoft, borderColor: colors.border }]}>
          <Text style={[styles.howTitleText, { color: colors.accent }]}>How SOS Works?</Text>
          <Text style={[styles.howDescText, { color: colors.textSecondary }]}>
            Your location will be shared with selected contacts and school admin immediately.
          </Text>
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

  // SOS Card
  sosCard: {
    backgroundColor: '#fef2f2',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fee2e2',
    marginBottom: 20,
  },
  sosCircleOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fca5a5',
    marginBottom: 16,
  },
  sosCircleInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  sosText: { fontSize: 32, fontWeight: '900', color: '#ef4444' },

  alertTitleText: { fontSize: 18, fontWeight: '900', color: '#ef4444' },
  alertSubText: { fontSize: 12, color: '#991b1b', fontWeight: '600', marginTop: 4 },

  // Quick Contacts
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  contactsCardList: {
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
  contactRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconSquare: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  contactInfoCol: { flex: 1 },
  contactTitleText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  contactPhoneText: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 2 },
  callCircleBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center' },

  // How It Works
  howItWorksBanner: {
    backgroundColor: '#fff1f2',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ffe4e6',
  },
  howTitleText: { fontSize: 13, fontWeight: '900', color: '#be123c', marginBottom: 4 },
  howDescText: { fontSize: 12, color: '#9f1239', lineHeight: 17, fontWeight: '500' },
});
