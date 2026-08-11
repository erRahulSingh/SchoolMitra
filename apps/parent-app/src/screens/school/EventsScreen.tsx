import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Search, MapPin, Trophy, FlaskConical, Flag } from 'lucide-react-native';

export default function EventsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const tabs = ['Upcoming', 'Ongoing', 'Past'];

  const eventsList = [
    {
      title: 'Annual Sports Day 2025',
      date: '25 May 2025 • 09:00 AM',
      location: 'School Ground',
      icon: Trophy,
      cardBg: '#f3e8ff',
      iconBg: '#e9d5ff',
      color: '#7c3aed',
      btnBg: '#6d28d9',
    },
    {
      title: 'Science Exhibition 2025',
      date: '05 Jun 2025 • 11:00 AM',
      location: 'Science Lab',
      icon: FlaskConical,
      cardBg: '#f0f9ff',
      iconBg: '#e0f2fe',
      color: '#0284c7',
      btnBg: '#1d4ed8',
    },
    {
      title: 'Independence Day Celebration',
      date: '15 Aug 2025 • 08:00 AM',
      location: 'School Campus',
      icon: Flag,
      cardBg: '#f0fdf4',
      iconBg: '#dcfce7',
      color: '#16a34a',
      btnBg: '#15803d',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>School Events</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Search size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Switch Pills Row */}
        <View style={styles.pillsRow}>
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.pillBtn, isActive && styles.pillActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.75}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Events Cards List */}
        <View style={styles.listContainer}>
          {eventsList.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={[styles.eventCard, { backgroundColor: item.cardBg }]}>
                <View style={styles.cardTopRow}>
                  {/* Event Thumbnail Graphic Box */}
                  <View style={[styles.thumbnailBox, { backgroundColor: item.iconBg }]}>
                    <IconComp size={36} color={item.color} strokeWidth={1.8} />
                  </View>

                  {/* Title & Info */}
                  <View style={styles.infoCol}>
                    <Text style={styles.eventTitleText}>{item.title}</Text>
                    <Text style={styles.eventDateText}>{item.date}</Text>
                    <View style={styles.locationRow}>
                      <MapPin size={13} color="#64748b" />
                      <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                  </View>
                </View>

                {/* View Details Button */}
                <TouchableOpacity
                  style={[styles.viewDetailsBtn, { backgroundColor: item.btnBg }]}
                  activeOpacity={0.85}
                >
                  <Text style={styles.viewDetailsBtnText}>View Details</Text>
                </TouchableOpacity>
              </View>
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
  searchBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Pills Row
  pillsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  pillBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  pillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  pillTextActive: { color: '#ffffff', fontWeight: '900' },

  // Events List
  listContainer: { gap: 14 },
  eventCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cardTopRow: { flexDirection: 'row', gap: 14, marginBottom: 14 },
  thumbnailBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: { flex: 1 },
  eventTitleText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  eventDateText: { fontSize: 12, color: '#475569', fontWeight: '600', marginTop: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  locationText: { fontSize: 11, color: '#64748b', fontWeight: '600' },

  viewDetailsBtn: {
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsBtnText: { fontSize: 13, fontWeight: '900', color: '#ffffff' },
});
