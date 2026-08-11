import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, MoreVertical, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TripTimelineScreen({ navigation }: any) {
  const events = [
    { time: '07:00 AM', title: 'Trip Started', desc: 'Bus started from Maple Park' },
    { time: '07:05 AM', title: 'First Stop Reached', desc: 'Maple Park' },
    { time: '07:25 AM', title: 'Pickup Completed', desc: 'All students picked up' },
    { time: '07:40 AM', title: 'School Reached', desc: 'Green Valley School' },
    { time: '01:15 PM', title: 'School Left', desc: 'Starting drop route' },
    { time: '01:45 PM', title: 'Drop Completed', desc: 'All students dropped' },
    { time: '01:55 PM', title: 'Trip Ended', desc: 'Thank you for your service' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Timeline</Text>
        <TouchableOpacity style={styles.moreBtn}>
          <MoreVertical size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero Banner Card */}
        <LinearGradient
          colors={['#1e3a8a', '#2563eb', '#1d4ed8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.bannerHeaderRow}>
            <View>
              <Text style={styles.bannerTitleText}>Route 01 - Morning</Text>
              <Text style={styles.bannerSubText}>Green Valley Route</Text>
            </View>

            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          </View>

          <View style={styles.bannerDivider} />

          <View style={styles.bannerMetaRow}>
            <Text style={styles.metaTimeText}>07:00 AM – 07:55 AM</Text>
            <Text style={styles.metaDateText}>15 May 2025</Text>
          </View>
        </LinearGradient>

        {/* Vertical Timeline List Card */}
        <View style={styles.timelineCard}>
          {events.map((ev, idx) => (
            <View key={idx} style={styles.timelineRow}>
              {/* Connector Line & Dot */}
              <View style={styles.leftCol}>
                <View style={styles.iconCircleGreen}>
                  <View style={styles.innerDotWhite} />
                </View>
                {idx < events.length - 1 && <View style={styles.connectorLineGreen} />}
              </View>

              {/* Time Column */}
              <Text style={styles.timeText}>{ev.time}</Text>

              {/* Event Content */}
              <View style={styles.contentCol}>
                <Text style={styles.eventTitleText}>{ev.title}</Text>
                <Text style={styles.eventDescText}>{ev.desc}</Text>
              </View>

              {/* Right Checkmark */}
              <CheckCircle2 size={18} color="#16a34a" fill="#dcfce7" />
            </View>
          ))}
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
  moreBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Hero Banner
  heroBanner: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  bannerHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bannerTitleText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  bannerSubText: { fontSize: 12, color: '#bfdbfe', fontWeight: '600', marginTop: 2 },
  completedBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  completedText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },

  bannerDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 14 },
  bannerMetaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaTimeText: { fontSize: 12, color: '#ffffff', fontWeight: '800' },
  metaDateText: { fontSize: 12, color: '#93c5fd', fontWeight: '600' },

  // Timeline Card
  timelineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  leftCol: { width: 28, alignItems: 'center', justifyContent: 'center' },
  iconCircleGreen: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#22c55e', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  innerDotWhite: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ffffff' },

  connectorLineGreen: {
    position: 'absolute',
    top: 22,
    bottom: -16,
    width: 2,
    backgroundColor: '#22c55e',
    zIndex: 1,
  },

  timeText: { width: 70, fontSize: 11, fontWeight: '800', color: '#2563eb', marginLeft: 8 },
  contentCol: { flex: 1, marginLeft: 8 },
  eventTitleText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  eventDescText: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 2 },
});
