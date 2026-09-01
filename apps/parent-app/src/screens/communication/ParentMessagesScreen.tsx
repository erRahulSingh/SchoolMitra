import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import { ChevronLeft, Search, MoreVertical, Building2, Users, Bus, Gift, MessageCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ParentMessagesScreen({ navigation }: any) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Teachers', 'School', 'Transport'];

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // Fetch Chat Conversations
        const chatRes = await fetch("http://10.0.2.2:5000/api/v1/chat/conversations?userId=parent_1");
        const chatJson = await chatRes.json();
        
        // Fetch Notices
        const noticeRes = await fetch("http://10.0.2.2:5000/api/v1/communication/notices");
        const noticeJson = await noticeRes.json();

        let combined: any[] = [];

        if (chatJson.success && chatJson.data.conversations) {
          const chats = chatJson.data.conversations.map((c: any) => ({
            id: c._id,
            isChat: true,
            sender: c.name,
            preview: c.lastMessage || 'No messages yet.',
            time: new Date(c.lastMessageAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
            unreadCount: 1, // Mock unread
            category: 'Teachers',
            isTeacher: true,
            initials: c.name.substring(0, 2).toUpperCase(),
          }));
          combined = [...combined, ...chats];
        }

        if (noticeJson.success && noticeJson.data.notices) {
          const notices = noticeJson.data.notices.map((n: any) => ({
            id: n._id,
            isChat: false,
            sender: n.title,
            preview: n.content,
            time: new Date(n.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
            unreadCount: 0,
            category: n.targetAudience === 'School' ? 'School' : n.targetAudience,
            icon: n.targetAudience === 'School' ? Building2 : Bus,
            color: n.targetAudience === 'School' ? '#0284c7' : '#16a34a',
            bg: n.targetAudience === 'School' ? '#e0f2fe' : '#dcfce7',
          }));
          combined = [...combined, ...notices];
        }

        setMessagesList(combined);
      } catch (err) {
        console.error("Error fetching inbox", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

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
        <Text style={styles.headerTitle}>Inbox & Notices</Text>
        <View style={styles.headerRightRow}>
          <TouchableOpacity style={styles.iconActionBtn}>
            <Search size={20} color="#0f172a" />
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
        {loading ? (
           <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.chatListCard}>
            {filteredMessages.map((item, idx) => {
              const IconComp = item.icon || MessageCircle;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.chatRow, idx < filteredMessages.length - 1 && styles.rowBorder]}
                  onPress={() => {
                    if (item.isChat) {
                      navigation.navigate('ChatDetail', { roomId: item.id, chatName: item.sender });
                    }
                  }}
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
                      <Text style={styles.senderNameText} numberOfLines={1}>{item.sender}</Text>
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

            {filteredMessages.length === 0 && (
              <View style={{ padding: 30, alignItems: 'center' }}>
                <Text style={{ color: '#64748b' }}>No messages found.</Text>
              </View>
            )}
          </View>
        )}

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
  senderNameText: { fontSize: 14, fontWeight: '900', color: '#0f172a', flex: 1, marginRight: 8 },
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
