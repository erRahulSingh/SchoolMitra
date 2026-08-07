import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform
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

export default function ParentMessagesScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'School Admin', 'Teachers', 'Parents'];

  const threads = [
    {
      id: '1',
      name: 'School Admin',
      msg: 'Staff meeting tomorrow at 10 AM',
      time: '10:30 AM',
      unread: 2,
      icon: Building2,
      iconColor: '#2563eb',
      iconBg: '#eff6ff'
    },
    {
      id: '2',
      name: 'Class 8 - A (Parents)',
      msg: "Thank you ma'am for the notes 🙏",
      time: '09:15 AM',
      unread: 5,
      icon: Users,
      iconColor: '#ea580c',
      iconBg: '#ffedd5'
    },
    {
      id: '3',
      name: 'Diya Verma (Parent)',
      msg: "Ma'am, can you share homework?",
      time: 'Yesterday',
      unread: 1,
      icon: User,
      iconColor: '#7c3aed',
      iconBg: '#f3e8ff'
    },
    {
      id: '4',
      name: 'Mathematics Dept.',
      msg: 'New syllabus shared for July',
      time: 'Yesterday',
      unread: 0,
      icon: BookOpen,
      iconColor: '#16a34a',
      iconBg: '#ecfdf5'
    },
    {
      id: '5',
      name: 'Anil Kumar (Teacher)',
      msg: "Let's prepare for Science Exhibition",
      time: '19 May',
      unread: 0,
      icon: User,
      iconColor: '#64748b',
      iconBg: '#f1f5f9'
    },
    {
      id: '6',
      name: 'Rohan Singh (Parent)',
      msg: "Yes, thank you ma'am!",
      time: '18 May',
      unread: 0,
      icon: User,
      iconColor: '#64748b',
      iconBg: '#f1f5f9'
    },
    {
      id: '7',
      name: 'Principal Sir',
      msg: "Good work in last week's event",
      time: '17 May',
      unread: 0,
      icon: User,
      iconColor: '#64748b',
      iconBg: '#f1f5f9'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* UNIFIED HEADER */}
      <Header navigation={navigation} title="Messages" currentRoute="ParentMessages" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
          {threads.map((item) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.threadCard}
                onPress={() => Alert.alert('Chat Room', `Opening chat thread with ${item.name}...`)}
              >
                <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                  <IconComp size={20} color={item.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.threadHeaderRow}>
                    <Text style={styles.threadName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.threadTime}>{item.time}</Text>
                  </View>

                  <View style={styles.threadMsgRow}>
                    <Text style={styles.threadMsg} numberOfLines={1}>{item.msg}</Text>
                    {item.unread > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>{item.unread}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
