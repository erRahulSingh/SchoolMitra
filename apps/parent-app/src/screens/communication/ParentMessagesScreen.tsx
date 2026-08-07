import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { MessageSquare, Send, ChevronRight } from 'lucide-react-native';

export default function ParentMessagesScreen({ navigation }: any) {
  const chats = [
    { id: 1, teacher: 'Rahul Sharma', subject: 'Mathematics', lastMsg: 'Rohan is doing great in algebra. Keep encouraging him at home.', time: '10:30 AM', unread: 2, initials: 'RS', color: '#4f46e5' },
    { id: 2, teacher: 'Priya Singh', subject: 'Science', lastMsg: 'Please ensure Rohan brings his lab coat tomorrow.', time: 'Yesterday', unread: 0, initials: 'PS', color: '#16a34a' },
    { id: 3, teacher: 'Neha Gupta', subject: 'English', lastMsg: 'Essay has been submitted. Good work!', time: 'Yesterday', unread: 0, initials: 'NG', color: '#d97706' },
    { id: 4, teacher: 'Class Teacher', subject: 'General', lastMsg: 'PTM is scheduled for 20th Aug at 10 AM.', time: '2 days ago', unread: 1, initials: 'CT', color: '#9333ea' }
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}><Text style={styles.headerTitle}>Messages</Text></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {chats.map((c) => (
          <TouchableOpacity key={c.id} style={styles.chatCard} activeOpacity={0.7}>
            <View style={[styles.avatar, { backgroundColor: c.color }]}><Text style={styles.avatarText}>{c.initials}</Text></View>
            <View style={{ flex: 1 }}>
              <View style={styles.chatTop}><Text style={styles.teacherName}>{c.teacher}</Text><Text style={styles.time}>{c.time}</Text></View>
              <Text style={styles.subjectTag}>{c.subject}</Text>
              <Text style={styles.lastMsg} numberOfLines={1}>{c.lastMsg}</Text>
            </View>
            {c.unread > 0 && <View style={styles.unreadBadge}><Text style={styles.unreadText}>{c.unread}</Text></View>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 14 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 10 },
  chatCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#ffffff', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
  chatTop: { flexDirection: 'row', justifyContent: 'space-between' },
  teacherName: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  time: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
  subjectTag: { fontSize: 11, color: '#4f46e5', fontWeight: '700', marginTop: 2 },
  lastMsg: { fontSize: 12, color: '#64748b', marginTop: 4 },
  unreadBadge: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center' },
  unreadText: { fontSize: 11, fontWeight: '900', color: '#ffffff' }
});
