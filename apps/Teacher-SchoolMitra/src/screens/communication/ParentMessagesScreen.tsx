import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import {
  ChevronLeft,
  Search,
  Plus,
  Building2,
  Users,
  User,
  BookOpen,
  PenTool,
  Edit2
} from 'lucide-react-native';

import Header from '../../components/Header';
import { teacherApi } from '../../services/apiService';
import { useIsFocused } from '@react-navigation/native';

export default function ParentMessagesScreen({ navigation }: any) {
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState('All');
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const tabs = ['All', 'School Admin', 'Teachers', 'Parents'];

  const fetchMessages = useCallback(async () => {
    try {
      const res = await teacherApi.getMessages().catch(() => null);
      if (res && (Array.isArray(res.messages) || Array.isArray(res.threads) || Array.isArray(res))) {
        const raw = Array.isArray(res.messages) ? res.messages : (Array.isArray(res.threads) ? res.threads : res);
        const mapped = raw.map((item: any, idx: number) => ({
          id: item.id || item._id || String(idx + 1),
          name: item.senderName || item.recipientName || item.name || 'School Notice',
          msg: item.lastMessage || item.message || item.text || 'Tap to view conversation',
          time: item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today',
          unread: item.unreadCount || 0,
          category: item.category || (item.role === 'Admin' ? 'School Admin' : (item.role === 'Teacher' ? 'Teachers' : 'Parents')),
          iconColor: '#7c3aed',
          iconBg: '#f3e8ff'
        }));
        setThreads(mapped);
      } else {
        setThreads([]);
      }
    } catch (e) {
      console.warn('Messages fetch error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchMessages();
    }
  }, [isFocused, fetchMessages]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMessages();
  };

  const filteredThreads = threads.filter(t => {
    if (activeTab === 'All') return true;
    return t.category === activeTab || t.name.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* UNIFIED HEADER */}
      <Header navigation={navigation} title="Messages" currentRoute="MessagesTab" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#7c3aed']} />}
      >
        {/* TABS PILLS */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabPill, activeTab === tab && styles.tabPillActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabPillText, activeTab === tab && styles.tabPillTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* THREADS LIST */}
        <View style={styles.listContainer}>
          {loading ? (
            <View style={{ padding: 30, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#7c3aed" />
            </View>
          ) : filteredThreads.length === 0 ? (
            <View style={{ padding: 24, alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16 }}>
              <Text style={{ fontSize: 13, color: '#94a3b8', fontWeight: '600' }}>
                No active conversations in this category.
              </Text>
            </View>
          ) : (
            filteredThreads.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.threadCard}
                onPress={() => navigation.navigate('ParentCommunication', { thread: item })}
              >
                <View style={[styles.avatarCircle, { backgroundColor: item.iconBg }]}>
                  <User size={20} color={item.iconColor} />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.topRow}>
                    <Text style={styles.senderName}>{item.name}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                  <Text style={styles.lastMsg} numberOfLines={1}>{item.msg}</Text>
                </View>

                {item.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
      {/* FLOATING ACTION COMPOSE */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => Alert.alert('Compose', 'Compose new discussion topic...')}
      >
        <Edit2 size={22} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: Platform.OS === 'android' ? 64 + (StatusBar.currentHeight || 0) : 64
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  backBtn: {
    position: 'absolute',
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerRight: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    gap: 8
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  tabRow: { flexDirection: 'row', gap: 6, marginBottom: 20 },
  tabPill: {
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabPillActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  tabPillText: { fontSize: 13, fontWeight: '800', color: '#64748b' },
  tabPillTextActive: { color: '#ffffff' },
  listContainer: { gap: 12, marginBottom: 80 },
  threadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  threadHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  threadName: { fontSize: 14, fontWeight: '900', color: '#0f172a', flex: 1, marginRight: 10 },
  threadTime: { fontSize: 11, color: '#94a3b8', fontWeight: '700' },
  threadMsgRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  threadMsg: { fontSize: 12, color: '#64748b', fontWeight: '600', flex: 1, marginRight: 10 },
  unreadBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center'
  },
  unreadBadgeText: { fontSize: 10, fontWeight: '900', color: '#ffffff' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  }
});
