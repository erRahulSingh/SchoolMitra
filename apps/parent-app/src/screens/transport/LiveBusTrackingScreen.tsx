import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native';
import { ChevronLeft, Bell, Bus, MapPin, Clock, CheckCircle2, Navigation, ClipboardList } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ParentHeader from '../../components/ParentHeader';

const { width } = Dimensions.get('window');

export default function LiveBusTrackingScreen({ navigation }: any) {
  const routeStops = [
    { name: 'Maple Park', time: '07:50 AM', status: 'Completed', completed: true },
    { name: 'City Center', time: '07:58 AM', status: 'Completed', completed: true },
    { name: 'Sector 52', time: '08:03 AM', status: 'Upcoming', completed: false },
    { name: 'Green Valley School', time: '08:05 AM', status: 'Upcoming', completed: false, isFinal: true },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* SchoolMitra Branded Top Header (Same as Homepage) */}
      <ParentHeader 
        onBellPress={() => navigation.navigate('Notifications')}
        unreadCount={3}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Page Title */}
        <Text style={styles.pageTitle}>Live Bus Tracking</Text>

        {/* Bus Info Header Card (Purple) */}
        <LinearGradient
          colors={['#4c1d95', '#6d28d9', '#5b21b6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.purpleBusCard}
        >
          <View style={styles.busIconWhiteCircle}>
            <Bus size={24} color="#5b21b6" strokeWidth={2.2} />
          </View>
          <View style={styles.busInfoTextCol}>
            <Text style={styles.busNumberText}>Bus No. UP32 AB 1234</Text>
            <Text style={styles.busRouteText}>Route: Green Valley Route</Text>
          </View>
        </LinearGradient>

        {/* Live Location GPS Map Box */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitleNoMargin}>Live Location</Text>
          <View style={styles.livePill}>
            <View style={styles.liveGreenDot} />
            <Text style={styles.livePillText}>Live</Text>
          </View>
        </View>

        <View style={styles.mapCard}>
          {/* Mock Map Vector Graphic */}
          <LinearGradient
            colors={['#f1f5f9', '#e2e8f0']}
            style={styles.mapGraphicBox}
          >
            {/* Sector Labels */}
            <Text style={[styles.mapRoadText, { top: 20, left: 30 }]}>Sector 15</Text>
            <Text style={[styles.mapRoadText, { top: 20, right: 30 }]}>Sector 52</Text>
            <Text style={[styles.mapRoadText, { bottom: 50, left: 70 }]}>City Center</Text>
            <Text style={[styles.mapRoadText, { bottom: 20, right: 20 }]}>Green Valley School</Text>

            {/* Blue Route Route Path Line */}
            <View style={styles.routePathLine} />

            {/* Route Stop Dots */}
            <View style={[styles.mapDotCircle, { top: 70, left: 50 }]} />
            <View style={[styles.mapDotCircle, { top: 40, right: 80 }]} />

            {/* Floating Bus Marker Pin */}
            <View style={styles.busMarkerPin}>
              <Bus size={18} color="#ffffff" />
            </View>

            {/* Destination School Pin */}
            <View style={styles.destinationPin}>
              <MapPin size={18} color="#ffffff" />
            </View>
          </LinearGradient>

          {/* Bottom Info Cards (2 Columns) */}
          <View style={styles.mapBottomInfoRow}>
            <View style={styles.infoColLeft}>
              <Text style={styles.infoLabel}>Estimated Arrival</Text>
              <View style={styles.etaRow}>
                <Text style={styles.etaTimeText}>08:05 AM</Text>
                <Clock size={18} color="#ea580c" />
              </View>
              <Text style={styles.etaSubText}>5 min to school</Text>
            </View>

            <View style={styles.infoColRight}>
              <Text style={styles.infoLabel}>Current Stop</Text>
              <View style={styles.stopRowRight}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stopMainText}>Maple Park</Text>
                  <Text style={styles.stopSubText}>Next: School</Text>
                </View>
                <View style={styles.clipboardBadge}>
                  <ClipboardList size={16} color="#7c3aed" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Route Stops Timeline */}
        <Text style={styles.sectionTitle}>Route Stops</Text>
        <View style={styles.timelineCard}>
          {routeStops.map((stop, idx) => (
            <View key={idx} style={styles.timelineRow}>
              {/* Timeline Connector Line & Dot */}
              <View style={styles.timelineLeftCol}>
                <View style={[
                  styles.timelineDot,
                  stop.completed && styles.dotCompleted,
                  !stop.completed && !stop.isFinal && styles.dotUpcoming,
                  stop.isFinal && styles.dotFinal,
                ]}>
                  {stop.isFinal ? (
                    <MapPin size={12} color="#ffffff" />
                  ) : (
                    <View style={styles.innerDotWhite} />
                  )}
                </View>
                {idx < routeStops.length - 1 && (
                  <View style={[styles.timelineLine, stop.completed && styles.lineCompleted]} />
                )}
              </View>

              {/* Stop Info */}
              <View style={styles.timelineInfoCol}>
                <Text style={styles.stopNameText}>{stop.name}</Text>
                <Text style={styles.stopTimeText}>{stop.time}</Text>
              </View>

              {/* Status Badge */}
              <View style={[
                styles.stopBadge,
                stop.completed ? styles.badgeCompleted : styles.badgeUpcoming
              ]}>
                <Text style={[
                  styles.stopBadgeText,
                  stop.completed ? styles.textCompleted : styles.textUpcoming
                ]}>
                  {stop.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  pageTitle: { fontSize: 20, fontWeight: '900', color: '#0f172a', marginBottom: 16 },

  // Purple Bus Header Card
  purpleBusCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#5b21b6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  busIconWhiteCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  busInfoTextCol: { flex: 1 },
  busNumberText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
  busRouteText: { fontSize: 12, color: '#ddd6fe', fontWeight: '500', marginTop: 2 },

  // Live Section Row
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitleNoMargin: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginTop: 20, marginBottom: 12 },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  liveGreenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e' },
  livePillText: { fontSize: 11, fontWeight: '900', color: '#16a34a' },

  // Map Box Card
  mapCard: {
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
  mapGraphicBox: {
    height: 180,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapRoadText: { position: 'absolute', fontSize: 10, fontWeight: '700', color: '#94a3b8' },
  routePathLine: {
    width: '75%',
    height: 4,
    backgroundColor: '#2563eb',
    borderRadius: 2,
    transform: [{ rotate: '-15deg' }],
  },
  mapDotCircle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  busMarkerPin: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    elevation: 4,
  },
  destinationPin: {
    position: 'absolute',
    bottom: 25,
    right: 45,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9333ea',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#ffffff',
  },

  // Map Bottom Info Row (2 Columns)
  mapBottomInfoRow: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  infoColLeft: {
    flex: 1,
    backgroundColor: '#fffbeb',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#fef08a',
  },
  infoColRight: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e9d5ff',
  },
  infoLabel: { fontSize: 10, color: '#64748b', fontWeight: '700' },
  etaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  etaTimeText: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  etaSubText: { fontSize: 10, color: '#d97706', fontWeight: '700', marginTop: 2 },
  stopRowRight: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  stopMainText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  stopSubText: { fontSize: 10, color: '#7c3aed', fontWeight: '700', marginTop: 2 },
  clipboardBadge: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },

  // Route Stops Timeline Card
  timelineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
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
    paddingVertical: 10,
    position: 'relative',
  },
  timelineLeftCol: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  dotCompleted: { backgroundColor: '#16a34a' },
  dotUpcoming: { backgroundColor: '#2563eb' },
  dotFinal: { backgroundColor: '#9333ea' },
  innerDotWhite: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ffffff' },
  timelineLine: {
    position: 'absolute',
    top: 24,
    bottom: -10,
    width: 2,
    backgroundColor: '#cbd5e1',
    zIndex: 1,
  },
  lineCompleted: { backgroundColor: '#16a34a' },
  timelineInfoCol: { flex: 1, marginLeft: 10 },
  stopNameText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  stopTimeText: { fontSize: 11, color: '#94a3b8', fontWeight: '500', marginTop: 2 },
  stopBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeCompleted: { backgroundColor: '#dcfce7' },
  badgeUpcoming: { backgroundColor: '#f1f5f9' },
  stopBadgeText: { fontSize: 11, fontWeight: '800' },
  textCompleted: { color: '#16a34a' },
  textUpcoming: { color: '#64748b' },
});
