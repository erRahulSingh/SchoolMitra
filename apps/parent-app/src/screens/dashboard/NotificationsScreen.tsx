import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, MoreVertical, Bus, Wallet, Calendar, Users, BookOpen } from 'lucide-react-native';

export default function NotificationsScreen({ navigation }: any) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Alerts', 'Transport', 'Academics'];

  const notificationsList = [
    {
      title: 'Bus Delay Alert',
      desc: 'Bus No. UP32 AB 1234 is delayed by 10 minutes today.',
      time: '10:15 AM',
      category: 'Alerts',
      icon: Bus,
      color: '#ef4444',
      bg: '#fee2e2',
      unread: true,
    },
    {
      title: 'Fee Reminder',
      desc: 'Your May month fee is due. Please pay to avoid late fee.',
      time: 'Yesterday',
      category: 'Alerts',
      icon: Wallet,
      color: '#ea580c',
      bg: '#ffedd5',
      unread: true,
    },
    {
      title: 'Holiday Notice',
      desc: 'School will remain closed on 15th May 2025.',
      time: '2 May',
      category: 'Transport',
      icon: Calendar,
      color: '#16a34a',
      bg: '#dcfce7',
      unread: true,
    },
    {
      title: 'PTM Schedule',
      desc: 'PTM is scheduled on 20th May 2025.',
      time: '28 Apr',
      category: 'Academics',
      icon: Users,
      color: '#7c3aed',
      bg: '#f3e8ff',
      unread: true,
    },
    {
      title: 'New Assignment',
      desc: 'New Mathematics assignment has been posted.',
      time: '25 Apr',
      category: 'Academics',
      icon: BookOpen,
      color: '#0284c7',
      bg: '#e0f2fe',
      unread: true,
    },
  ];

  const filteredNotifications = activeFilter === 'All'
    ? notificationsList
    : notificationsList.filter(n => n.category === activeFilter);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.moreBtn}>
          <MoreVertical size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Filter Pills Row */}
        <View style={styles.pillsRow}>
          {filters.map((filter, idx) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.pillBtn, isActive && styles.pillActive]}
                onPress={() => setActiveFilter(filter)}
                activeOpacity={0.75}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notifications List Card */}
        <View style={styles.listCard}>
          {filteredNotifications.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View
                key={idx}
                style={[styles.notifRow, idx < filteredNotifications.length - 1 && styles.rowBorder]}
              >
                <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
                  <IconComp size={20} color={item.color} strokeWidth={2} />
                </View>

                <View style={styles.infoCol}>
                  <Text style={styles.notifTitleText}>{item.title}</Text>
                  <Text style={styles.notifDescText}>{item.desc}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
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
  moreBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Category Pills
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
  notifRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 14,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: { flex: 1 },
  notifTitleText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  notifDescText: { fontSize: 12, color: '#475569', lineHeight: 18, fontWeight: '500', marginTop: 3 },
  timeText: { fontSize: 11, color: '#94a3b8', fontWeight: '500', marginTop: 6 },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    marginTop: 6,
  },
});
