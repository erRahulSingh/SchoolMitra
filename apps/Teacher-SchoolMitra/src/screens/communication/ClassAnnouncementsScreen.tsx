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
  Megaphone,
  ChevronRight,
  FileText,
  Calendar,
  Trophy,
  Users,
  Volume2
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ClassAnnouncementsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Academic', 'Event', 'Holiday', 'Urgent'];

  const circulars = [
    {
      id: '1',
      title: 'New Academic Calendar 2024-25',
      desc: 'The new academic schedule has been released...',
      date: '20 May 2024  •  By Admin',
      badge: 'Academic',
      badgeColor: '#2563eb',
      badgeBg: '#eff6ff',
      icon: FileText,
      iconColor: '#2563eb',
      iconBg: '#eff6ff'
    },
    {
      id: '2',
      title: 'Summer Vacation Notice',
      desc: 'Summer vacation will begin from 1st June to...',
      date: '18 May 2024  •  By Principal',
      badge: 'Holiday',
      badgeColor: '#db2777',
      badgeBg: '#fce7f3',
      icon: Calendar,
      iconColor: '#db2777',
      iconBg: '#fce7f3'
    },
    {
      id: '3',
      title: "Teachers' Workshop",
      desc: 'Professional Development Workshop for all...',
      date: '15 May 2024  •  By Admin',
      badge: 'Event',
      badgeColor: '#2563eb',
      badgeBg: '#eff6ff',
      icon: Trophy,
      iconColor: '#ea580c',
      iconBg: '#ffedd5'
    },
    {
      id: '4',
      title: 'Parent-Teacher Meeting',
      desc: 'PTM scheduled for all classes next week...',
      date: '12 May 2024  •  By Admin',
      badge: 'Meeting',
      badgeColor: '#7c3aed',
      badgeBg: '#f3e8ff',
      icon: Users,
      iconColor: '#7c3aed',
      iconBg: '#f3e8ff'
    },
    {
      id: '5',
      title: 'School Annual Function',
      desc: 'Annual function will be held on 5th July...',
      date: '10 May 2024  •  By Principal',
      badge: 'Event',
      badgeColor: '#2563eb',
      badgeBg: '#eff6ff',
      icon: Volume2,
      iconColor: '#2563eb',
      iconBg: '#eff6ff'
    }
  ];

  const filteredCirculars = circulars.filter(c =>
    activeTab === 'All' ? true : c.badge === activeTab
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>School Circulars</Text>
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
            <Text style={styles.heroTitle}>Stay updated with</Text>
            <Text style={styles.heroTitleSub}>latest school notifications</Text>
            <Text style={styles.heroTitleSub}>and circulars.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Megaphone size={30} color="#7c3aed" />
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

        {/* CIRCULAR LIST */}
        <View style={styles.listContainer}>
          {filteredCirculars.map((item) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.circularCard}
                onPress={() => Alert.alert(item.title, item.desc)}
              >
                <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                  <IconComp size={20} color={item.iconColor} />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text style={styles.circularTitle} numberOfLines={1}>{item.title}</Text>
                    <View style={[styles.badge, { backgroundColor: item.badgeBg }]}>
                      <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.badge}</Text>
                    </View>
                  </View>

                  <Text style={styles.circularDesc} numberOfLines={2}>{item.desc}</Text>
                  <Text style={styles.circularDate}>{item.date}</Text>
                </View>

                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
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
  listContainer: { gap: 12, marginBottom: 20 },
  circularCard: {
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
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  circularTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', flex: 1, marginRight: 8 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  badgeText: { fontSize: 9, fontWeight: '900' },
  circularDesc: { fontSize: 12, color: '#64748b', fontWeight: '600', marginBottom: 6 },
  circularDate: { fontSize: 11, color: '#94a3b8', fontWeight: '700' }
});
