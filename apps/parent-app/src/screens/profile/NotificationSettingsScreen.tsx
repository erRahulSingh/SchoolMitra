import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Bell, GraduationCap, CreditCard, Bus, Calendar, Tag, ChevronRight, Info } from 'lucide-react-native';

export default function NotificationSettingsScreen({ navigation }: any) {
  const [generalAnnouncements, setGeneralAnnouncements] = useState(true);
  const [academicUpdates, setAcademicUpdates] = useState(true);
  const [feePayments, setFeePayments] = useState(true);
  const [transportUpdates, setTransportUpdates] = useState(true);
  const [eventsActivities, setEventsActivities] = useState(true);
  const [promotionsOffers, setPromotionsOffers] = useState(false);

  const notificationsOptions = [
    { title: 'General Announcements', sub: 'Receive general updates', val: generalAnnouncements, setVal: setGeneralAnnouncements, icon: Bell, color: '#7c3aed', bg: '#f3e8ff' },
    { title: 'Academic Updates', sub: 'Homework, assignments, exams', val: academicUpdates, setVal: setAcademicUpdates, icon: GraduationCap, color: '#2563eb', bg: '#e0f2fe' },
    { title: 'Fee & Payments', sub: 'Fee due, payments, receipts', val: feePayments, setVal: setFeePayments, icon: CreditCard, color: '#0d9488', bg: '#ccfbf1' },
    { title: 'Transport Updates', sub: 'Bus delay, route changes', val: transportUpdates, setVal: setTransportUpdates, icon: Bus, color: '#16a34a', bg: '#dcfce7' },
    { title: 'Events & Activities', sub: 'School events and activities', val: eventsActivities, setVal: setEventsActivities, icon: Calendar, color: '#ea580c', bg: '#ffedd5' },
    { title: 'Promotions & Offers', sub: 'Promotions and offers', val: promotionsOffers, setVal: setPromotionsOffers, icon: Tag, color: '#64748b', bg: '#f1f5f9' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Push Notifications Section */}
        <Text style={styles.sectionTitle}>Push Notifications</Text>
        <View style={styles.cardGroup}>
          {notificationsOptions.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={[styles.optionRow, idx < notificationsOptions.length - 1 && styles.rowBorder]}>
                <View style={[styles.iconSquare, { backgroundColor: item.bg }]}>
                  <IconComp size={18} color={item.color} />
                </View>

                <View style={styles.textCol}>
                  <Text style={styles.optionTitleText}>{item.title}</Text>
                  <Text style={styles.optionSubText}>{item.sub}</Text>
                </View>

                <Switch
                  value={item.val}
                  onValueChange={item.setVal}
                  trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
                  thumbColor={item.val ? '#1d4ed8' : '#f1f5f9'}
                />
              </View>
            );
          })}
        </View>

        {/* Quiet Hours Section */}
        <Text style={styles.sectionTitle}>Quiet Hours</Text>
        <View style={styles.quietHoursCard}>
          <View style={styles.timeInputsRow}>
            <TouchableOpacity style={styles.timeBox} activeOpacity={0.75}>
              <Text style={styles.timeBoxLabel}>From</Text>
              <Text style={styles.timeBoxValue}>10:00 PM</Text>
              <ChevronRight size={16} color="#94a3b8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.timeBox} activeOpacity={0.75}>
              <Text style={styles.timeBoxLabel}>To</Text>
              <Text style={styles.timeBoxValue}>06:00 AM</Text>
              <ChevronRight size={16} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Quiet Hours Info Box */}
          <View style={styles.quietInfoBox}>
            <Info size={16} color="#2563eb" />
            <Text style={styles.quietInfoText}>
              You will not receive non-urgent notifications during quiet hours.
            </Text>
          </View>
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
  optionRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconSquare: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  textCol: { flex: 1 },
  optionTitleText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  optionSubText: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 2 },

  // Quiet Hours
  quietHoursCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  timeInputsRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  timeBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  timeBoxLabel: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  timeBoxValue: { fontSize: 13, fontWeight: '900', color: '#0f172a' },

  quietInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#eff6ff',
    borderRadius: 14,
    padding: 12,
  },
  quietInfoText: { flex: 1, fontSize: 11, color: '#1d4ed8', fontWeight: '600', lineHeight: 16 },
});
