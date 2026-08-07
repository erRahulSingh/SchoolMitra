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
  Plus,
  Trophy,
  Activity,
  Users,
  MapPin,
  Calendar,
  MoreVertical,
  FlaskConical
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function EventManagementScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const tabs = ['Upcoming', 'Ongoing', 'Past'];

  const events = [
    {
      id: 'e_1',
      title: 'Annual Day Celebration',
      date: '25 May 2024',
      venue: 'School Auditorium',
      icon: Trophy,
      iconColor: '#ea580c',
      iconBg: '#ffedd5',
      status: 'Upcoming',
      statusColor: '#16a34a',
      statusBg: '#ecfdf5'
    },
    {
      id: 'e_2',
      title: 'Science Exhibition',
      date: '10 Jun 2024',
      venue: 'Science Lab',
      icon: FlaskConical,
      iconColor: '#7c3aed',
      iconBg: '#f3e8ff',
      status: 'Upcoming',
      statusColor: '#16a34a',
      statusBg: '#ecfdf5'
    },
    {
      id: 'e_3',
      title: 'Parent-Teacher Meeting',
      date: '22 Jun 2024',
      venue: 'Conference Hall',
      icon: Users,
      iconColor: '#16a34a',
      iconBg: '#ecfdf5',
      status: 'Upcoming',
      statusColor: '#16a34a',
      statusBg: '#ecfdf5'
    },
    {
      id: 'e_4',
      title: 'Sports Day',
      date: '05 Jul 2024',
      venue: 'School Ground',
      icon: Activity,
      iconColor: '#ef4444',
      iconBg: '#fef2f2',
      status: 'Upcoming',
      statusColor: '#16a34a',
      statusBg: '#ecfdf5'
    }
  ];

  const filteredEvents = events.filter(e =>
    activeTab === 'Upcoming' ? e.status === 'Upcoming' : e.status === activeTab
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Management</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => Alert.alert('Add Event', 'Create new school event...')}>
          <Plus size={20} color="#0f172a" />
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
            <Text style={styles.heroTitle}>Organize and</Text>
            <Text style={styles.heroTitle}>manage school</Text>
            <Text style={styles.heroTitleSub}>events easily.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Trophy size={30} color="#7c3aed" />
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

        {/* EVENTS LIST */}
        <View style={styles.listContainer}>
          {filteredEvents.map((item) => {
            const IconComp = item.icon;
            return (
              <View key={item.id} style={styles.eventCard}>
                <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                  <IconComp size={22} color={item.iconColor} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  
                  <View style={styles.detailRow}>
                    <Calendar size={12} color="#94a3b8" style={{ marginRight: 6 }} />
                    <Text style={styles.detailText}>{item.date}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <MapPin size={12} color="#94a3b8" style={{ marginRight: 6 }} />
                    <Text style={styles.detailText}>{item.venue}</Text>
                  </View>
                </View>

                <View style={styles.rightCol}>
                  <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                    <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                  </View>
                  <TouchableOpacity onPress={() => Alert.alert('Options', 'Action triggers...')}>
                    <MoreVertical size={18} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
              </View>
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
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: 64
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
  addBtn: {
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
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tabPill: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabPillActive: { backgroundColor: '#7c3aed' },
  tabPillText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  tabPillTextActive: { color: '#ffffff' },
  listContainer: { gap: 12, marginBottom: 20 },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginBottom: 6 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  detailText: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  rightCol: { alignItems: 'flex-end', gap: 10 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: { fontSize: 10, fontWeight: '900' }
});
