import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Bell, Megaphone, BookOpen, Trophy, FileText, AlertCircle, CheckCircle2 } from 'lucide-react-native';

export default function NotificationsScreen({ navigation }: any) {
  const notifications = [
    { id: 1, title: 'Attendance Alert', desc: 'Rohan was marked Present today at 08:35 AM', icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7', time: '35 min ago', unread: true },
    { id: 2, title: 'Holiday Announcement', desc: 'School will remain closed on 15th Aug — Independence Day', icon: Megaphone, color: '#2563eb', bg: '#e0f2fe', time: '2h ago', unread: true },
    { id: 3, title: 'Homework Assigned', desc: 'Mathematics — Exercise 8.2 Algebraic Expressions due tomorrow', icon: BookOpen, color: '#9333ea', bg: '#f3e8ff', time: '4h ago', unread: false },
    { id: 4, title: 'Annual Sports Day', desc: 'Annual Sports Day will be held on 25th Aug 2025', icon: Trophy, color: '#d97706', bg: '#fef3c7', time: '1d ago', unread: false },
    { id: 5, title: 'Fee Payment Reminder', desc: 'Q2 Fee payment of ₹1,250 is due by 15th Aug', icon: AlertCircle, color: '#ef4444', bg: '#fef2f2', time: '1d ago', unread: false },
    { id: 6, title: 'PTM Schedule', desc: 'Parent Teacher Meeting on 20th Aug at 10:00 AM', icon: FileText, color: '#0284c7', bg: '#e0f2fe', time: '2d ago', unread: false }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Bell size={20} color="#4f46e5" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.map((n) => {
          const IconComp = n.icon;
          return (
            <View key={n.id} style={[styles.card, n.unread && styles.unreadCard]}>
              <View style={[styles.iconCircle, { backgroundColor: n.bg }]}><IconComp size={20} color={n.color} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{n.title}</Text>
                <Text style={styles.desc}>{n.desc}</Text>
                <Text style={styles.time}>{n.time}</Text>
              </View>
              {n.unread && <View style={styles.dot} />}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 10 },
  card: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: '#ffffff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  unreadCard: { borderColor: '#c7d2fe', backgroundColor: '#fefefe' },
  iconCircle: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  desc: { fontSize: 12, color: '#64748b', marginTop: 3, lineHeight: 18 },
  time: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4f46e5', marginTop: 4 }
});
