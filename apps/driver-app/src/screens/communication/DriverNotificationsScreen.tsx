import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Bus, ClipboardCheck, Calendar, Users, PhoneCall, MessageSquare } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function DriverNotificationsScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Alerts', 'Messages'];

  const notifications = [
    { title: 'Route Change', desc: 'Your route has been updated for tomorrow.', time: '09:30 AM', category: 'Alerts', icon: Bus, color: '#ef4444', bg: '#fee2e2', unread: true },
    { title: 'Bus Inspection', desc: 'Please complete bus inspection before starting trip.', time: '08:15 AM', category: 'Alerts', icon: ClipboardCheck, color: '#ea580c', bg: '#ffedd5', unread: true },
    { title: 'School Announcement', desc: 'Annual day on 20 May 2025.', time: 'Yesterday', category: 'Alerts', icon: Calendar, color: '#2563eb', bg: '#e0f2fe', unread: false },
    { title: 'Emergency Drill', desc: 'Emergency drill scheduled on 18 May 2025.', time: '2 Days Ago', category: 'Alerts', icon: Users, color: '#7c3aed', bg: '#f3e8ff', unread: false },
    { title: 'Trip Completed', desc: 'You have completed Route 02 - Evening.', time: '2 Days Ago', category: 'Alerts', icon: PhoneCall, color: '#16a34a', bg: '#dcfce7', unread: false },
    { title: 'New Message', desc: 'You have a new message from school admin.', time: '3 Days Ago', category: 'Messages', icon: MessageSquare, color: '#2563eb', bg: '#eff6ff', unread: false },
  ];

  const filteredNotifications = activeFilter === 'All'
    ? notifications
    : notifications.filter(n => n.category === activeFilter);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.card} />
      
      {/* Header Bar */}
      <View style={[styles.headerBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.background }]} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Filter Pills */}
        <View style={styles.pillsRow}>
          {filters.map((filter, idx) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.pillBtn, 
                  { backgroundColor: colors.card, borderColor: colors.border },
                  isActive && styles.pillActive
                ]}
                onPress={() => setActiveFilter(filter)}
                activeOpacity={0.75}
              >
                <Text style={[
                  styles.pillText, 
                  { color: colors.textSecondary },
                  isActive && styles.pillTextActive
                ]}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notifications List */}
        <View style={[styles.listCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {filteredNotifications.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={[styles.notifRow, idx < filteredNotifications.length - 1 && styles.rowBorder, { borderBottomColor: colors.border }]}>
                <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
                  <IconComp size={18} color={item.color} />
                </View>

                <View style={styles.infoCol}>
                  <View style={styles.titleTimeRow}>
                    <Text style={[styles.notifTitleText, { color: colors.text }]}>{item.title}</Text>
                    <Text style={[styles.timeText, { color: colors.textMuted }]}>{item.time}</Text>
                  </View>
                  <Text style={[styles.notifDescText, { color: colors.textSecondary }]}>{item.desc}</Text>
                </View>

                {item.unread && <View style={styles.redDot} />}
              </View>
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
  markReadText: { fontSize: 11, fontWeight: '800', color: '#2563eb' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Pills
  pillsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  pillBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  pillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  pillTextActive: { color: '#ffffff', fontWeight: '900' },

  // List Card
  listCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  notifRow: { flexDirection: 'row', alignItems: 'flex-start', padding: 16, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  infoCol: { flex: 1 },
  titleTimeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  notifTitleText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  timeText: { fontSize: 10, color: '#94a3b8', fontWeight: '500' },
  notifDescText: { fontSize: 12, color: '#64748b', lineHeight: 17, fontWeight: '500' },
  redDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444', marginTop: 4 },
});
