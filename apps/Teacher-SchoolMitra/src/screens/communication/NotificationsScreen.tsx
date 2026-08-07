import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Bell,
  CheckCircle2,
  FileCheck,
  MessageSquare,
  Award,
  Trash2,
  ChevronRight,
  Sparkles
} from 'lucide-react-native';

export default function NotificationsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const [notifications, setNotifications] = useState([
    {
      id: 'notif_1',
      type: 'Submissions',
      title: 'New Assignment Submission',
      body: 'Aarav Gupta submitted "Term 1 Geometry 3D Model". Pending evaluation.',
      time: '10 mins ago',
      isUnread: true,
      icon: FileCheck,
      screen: 'AssignmentReview'
    },
    {
      id: 'notif_2',
      type: 'Parent Messages',
      title: 'New Message from Parent',
      body: 'Mr. Rajesh Gupta: "Thank you teacher, Aarav completed the project!"',
      time: '45 mins ago',
      isUnread: true,
      icon: MessageSquare,
      screen: 'ParentMessages'
    },
    {
      id: 'notif_3',
      type: 'System Alerts',
      title: 'Attendance Alert',
      body: 'Attendance for Class 9-B is still pending for today.',
      time: '2 hours ago',
      isUnread: false,
      icon: Bell,
      screen: 'MarkAttendance'
    },
    {
      id: 'notif_4',
      type: 'Submissions',
      title: 'Exam Marks Compilation',
      body: 'CBSE Mid-Term Mathematics marks 100% compiled. Ready for publication.',
      time: '1 day ago',
      isUnread: false,
      icon: Award,
      screen: 'PublishResult'
    }
  ]);

  const filteredNotifs = notifications.filter((n) => {
    if (activeTab === 'All') return true;
    return n.type === activeTab;
  });

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isUnread: false })));
    Alert.alert('Notifications Cleared ✅', 'All notifications marked as read.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.clearBtn} onPress={handleMarkAllRead}>
          <CheckCircle2 size={20} color="#7c3aed" />
        </TouchableOpacity>
      </View>

      {/* TABS */}
      <View style={styles.tabsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All', 'Submissions', 'Parent Messages', 'System Alerts'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* NOTIFICATIONS LIST */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredNotifs.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={48} color="#cbd5e1" />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySub}>You are all caught up!</Text>
          </View>
        ) : (
          filteredNotifs.map((item) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, item.isUnread && styles.unreadCard]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={styles.iconCircle}>
                  <IconComp size={20} color="#7c3aed" />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.cardTopRow}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    {item.isUnread && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.bodyText}>{item.body}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>

                <ChevronRight size={18} color="#cbd5e1" />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justify: 'center',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  clearBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3e8ff',
    justify: 'center',
    alignItems: 'center'
  },
  tabsRow: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#ffffff'
  },
  tabItem: { paddingVertical: 12, marginRight: 20, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabItemActive: { borderBottomColor: '#7c3aed' },
  tabText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  tabTextActive: { color: '#7c3aed' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 60, paddingHorizontal: 20 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginTop: 12 },
  emptySub: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 4 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  unreadCard: { backgroundColor: '#faf5ff', borderColor: '#ddd6fe' },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f3e8ff',
    justify: 'center',
    alignItems: 'center'
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  titleText: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#7c3aed' },
  bodyText: { fontSize: 12, color: '#475569', lineHeight: 17, marginBottom: 4 },
  timeText: { fontSize: 11, color: '#94a3b8', fontWeight: '600' }
});
