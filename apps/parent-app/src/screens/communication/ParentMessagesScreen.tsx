import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Search, MoreVertical, Building2, Users, Bus, Gift, User } from 'lucide-react-native';

export default function ParentMessagesScreen({ navigation }: any) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'School', 'Teachers', 'Class', 'Groups'];

  const messagesList = [
    {
      sender: 'Mrs. Priya Singh',
      preview: 'Dear Parent, please remind Rohan to complete the maths homework.',
      time: '10:30 AM',
      unreadCount: 2,
      category: 'Teachers',
      isTeacher: true,
      initials: 'PS',
    },
    {
      sender: 'Class 5th – A',
      preview: 'Reminder: PTM will be held on 20th May 2025.',
      time: 'Yesterday',
      unreadCount: 0,
      category: 'Class',
      icon: Users,
      color: '#e11d48',
      bg: '#ffe4e6',
    },
    {
      sender: 'School Admin',
      preview: 'Holiday on 15th May 2025 on account of Buddha Purnima.',
      time: '2 May',
      unreadCount: 0,
      category: 'School',
      icon: Building2,
      color: '#0284c7',
      bg: '#e0f2fe',
    },
    {
      sender: 'Transport Dept.',
      preview: 'Bus route timing changed from 5th May. Please check.',
      time: '30 Apr',
      unreadCount: 0,
      category: 'School',
      icon: Bus,
      color: '#16a34a',
      bg: '#dcfce7',
    },
    {
      sender: 'Events & Activities',
      preview: 'Annual Sports Day on 25th May 2025. Join us!',
      time: '28 Apr',
      unreadCount: 0,
      category: 'Groups',
      icon: Gift,
      color: '#ea580c',
      bg: '#ffedd5',
    },
  ];

  const filteredMessages = activeFilter === 'All'
    ? messagesList
    : messagesList.filter(m => m.category === activeFilter);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.headerRightRow}>
          <TouchableOpacity style={styles.iconActionBtn}>
            <Search size={20} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconActionBtn}>
            <MoreVertical size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Filter Pills Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScrollView}>
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
        </ScrollView>

        {/* Chat Messages List Card */}
        <View style={styles.chatListCard}>
          {filteredMessages.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.chatRow, idx < filteredMessages.length - 1 && styles.rowBorder]}
                onPress={() => navigation.navigate('CommunicationHub')}
                activeOpacity={0.75}
              >
                {/* Avatar / Icon Circle */}
                {item.isTeacher ? (
                  <View style={styles.avatarTeacherCircle}>
                    <Text style={styles.avatarTeacherText}>{item.initials}</Text>
                  </View>
                ) : (
                  <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
                    <IconComp size={20} color={item.color} strokeWidth={2} />
                  </View>
                )}

                {/* Content */}
                <View style={styles.chatContentCol}>
                  <View style={styles.senderTimeRow}>
                    <Text style={styles.senderNameText}>{item.sender}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                  <Text style={styles.previewText} numberOfLines={2}>{item.preview}</Text>
                </View>

                {/* Unread Red Circle Badge */}
                {item.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
                  </View>
                )}
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
  headerRightRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  iconActionBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Category Pills
  pillsScrollView: { marginBottom: 16 },
  pillsRow: { flexDirection: 'row', gap: 8 },
  pillBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  pillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  pillTextActive: { color: '#ffffff', fontWeight: '900' },

  // Chat List Card
  chatListCard: {
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
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  avatarTeacherCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTeacherText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContentCol: { flex: 1 },
  senderTimeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  senderNameText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  timeText: { fontSize: 11, color: '#94a3b8', fontWeight: '500' },
  previewText: { fontSize: 12, color: '#64748b', lineHeight: 17, fontWeight: '500' },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadgeText: { fontSize: 10, fontWeight: '900', color: '#ffffff' },
});
