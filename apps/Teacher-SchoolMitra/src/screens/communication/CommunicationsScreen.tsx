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
  Bell,
  MessageSquare
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CommunicationsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Parents', 'Students', 'Teachers'];

  const conversations = [
    { id: '1', name: 'Parent - Priya Sharma', initials: 'PS', msg: "Ma'am, I wanted to discuss Aarav's progress.", time: '10:30 AM', unread: 2, bg: '#16a34a' },
    { id: '2', name: 'Rohan Singh (Parent)', initials: 'RS', msg: 'Thank you for the feedback on his test.', time: 'Yesterday', unread: 0, bg: '#ea580c' },
    { id: '3', name: 'Ananya Gupta (Parent)', initials: 'AS', msg: 'When will the next unit test be conducted?', time: 'Yesterday', unread: 1, bg: '#2563eb' },
    { id: '4', name: 'Diya Verma (Parent)', initials: 'PV', msg: 'Please share the science project details.', time: '22 May', unread: 0, bg: '#10b981' },
    { id: '5', name: 'Teaching Group', initials: 'TG', msg: 'Reminder: Meeting tomorrow at 3 PM in staff room.', time: '20 May', unread: 0, bg: '#7c3aed' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Communications</Text>
        <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('Notifications')}>
          <Bell size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO CARD */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Communicate</Text>
            <Text style={styles.heroTitle}>effectively with</Text>
            <Text style={styles.heroTitleSub}>students and parents.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <MessageSquare size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

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

        {/* RECENT CONVERSATIONS */}
        <Text style={styles.sectionTitle}>Recent Conversations</Text>
        <View style={styles.listContainer}>
          {conversations.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.chatCard}
              onPress={() => Alert.alert('Chat', `Open chat thread with ${item.name}...`)}
            >
              <View style={[styles.avatarCircle, { backgroundColor: item.bg }]}>
                <Text style={styles.avatarText}>{item.initials}</Text>
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
          ))}
        </View>
      </ScrollView>
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
  bellBtn: {
    position: 'absolute',
    right: 20,
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
  heroCard: {
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroTitleSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabRow: { flexDirection: 'row', gap: 6, marginBottom: 20 },
  tabPill: {
    flex: 1,
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
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12, marginTop: 10 },
  listContainer: { gap: 12, marginBottom: 20 },
  chatCard: {
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
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: { fontSize: 14, fontWeight: '950', color: '#ffffff' },
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
  unreadBadgeText: { fontSize: 10, fontWeight: '900', color: '#ffffff' }
});
