import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Search, Wrench, Users, Headset } from 'lucide-react-native';

export default function MessagesScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Chats');

  const chats = [
    { name: 'School Admin', msg: 'Tomorrow there is a holiday on account of Republic Day.', time: '10:30 AM', unread: 2, avatar: 'SA' },
    { name: 'Transport Coordinator', msg: 'Please start from Stop 3 today.', time: '9:45 AM', unread: 1, avatar: 'TC' },
    { name: 'Maintenance Team', msg: 'Your bus service is scheduled on 18 May 2025.', time: 'Yesterday', icon: Wrench, color: '#16a34a', bg: '#dcfce7' },
    { name: 'Route Group – Morning', msg: 'New student added at Stop 5.', time: 'Yesterday', icon: Users, color: '#7c3aed', bg: '#f3e8ff' },
    { name: 'Driver Support Team', msg: 'Any issue? We are here to help.', time: '2 Days Ago', icon: Headset, color: '#2563eb', bg: '#eff6ff' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.menuBtn}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Search size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Filter Pills Row */}
        <View style={styles.pillsRow}>
          <TouchableOpacity
            style={[styles.pillBtn, activeTab === 'Chats' && styles.pillActive]}
            onPress={() => setActiveTab('Chats')}
            activeOpacity={0.8}
          >
            <Text style={[styles.pillText, activeTab === 'Chats' && styles.pillTextActive]}>Chats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pillBtn, activeTab === 'Channels' && styles.pillActive]}
            onPress={() => setActiveTab('Channels')}
            activeOpacity={0.8}
          >
            <Text style={[styles.pillText, activeTab === 'Channels' && styles.pillTextActive]}>Channels</Text>
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <View style={styles.listContainer}>
          {chats.map((chat, idx) => {
            const IconComp = chat.icon;
            return (
              <TouchableOpacity key={idx} style={styles.chatRow} activeOpacity={0.75}>
                {chat.avatar ? (
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{chat.avatar}</Text>
                  </View>
                ) : (
                  <View style={[styles.iconCircle, { backgroundColor: chat.bg }]}>
                    <IconComp size={18} color={chat.color} />
                  </View>
                )}

                <View style={styles.infoCol}>
                  <View style={styles.nameTimeRow}>
                    <Text style={styles.nameText}>{chat.name}</Text>
                    <Text style={styles.timeText}>{chat.time}</Text>
                  </View>

                  <View style={styles.msgBadgeRow}>
                    <Text style={styles.msgText} numberOfLines={1}>{chat.msg}</Text>
                    {chat.unread ? (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>{chat.unread}</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
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
  menuBtn: { gap: 3 },
  menuLine: { width: 18, height: 2, backgroundColor: '#0f172a', borderRadius: 1 },
  searchBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Pills
  pillsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  pillBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: { backgroundColor: '#2563eb' },
  pillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  pillTextActive: { color: '#ffffff', fontWeight: '900' },

  // List
  listContainer: { gap: 16 },
  chatRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 15, fontWeight: '900', color: '#ffffff' },
  iconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },

  infoCol: { flex: 1 },
  nameTimeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  nameText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  timeText: { fontSize: 11, color: '#94a3b8', fontWeight: '500' },

  msgBadgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  msgText: { fontSize: 12, color: '#64748b', fontWeight: '500', flex: 1, paddingRight: 8 },
  unreadBadge: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#16a34a', alignItems: 'center', justifyContent: 'center' },
  unreadBadgeText: { fontSize: 10, fontWeight: '900', color: '#ffffff' },
});
