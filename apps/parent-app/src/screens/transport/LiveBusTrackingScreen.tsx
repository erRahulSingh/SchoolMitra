import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native';
import { ChevronLeft, Bell, Bus, MapPin, Clock, CheckCircle2, Navigation, ClipboardList } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ParentHeader from '../../components/ParentHeader';
import { createSocketConnection } from '../../lib/socketClient';

const { width } = Dimensions.get('window');

export default function LiveBusTrackingScreen({ navigation }: any) {
  const [isTrackingActive, setIsTrackingActive] = useState(false);
  const [liveLocation, setLiveLocation] = useState<any>({
    latitude: 28.5833,
    longitude: 77.0667,
    speed: 0,
    heading: 90,
    timestamp: ""
  });

  const [lastUpdatedText, setLastUpdatedText] = useState("Just now");

  useEffect(() => {
    if (!isTrackingActive) return;

    const socket = createSocketConnection("http://localhost:5000");
    let lastReceiveTime = Date.now();

    if (socket) {
      if (typeof socket.emit === 'function') {
        socket.emit("bus:join_room", { busId: "BUS-01", parentId: "PARENT-9942" });
      }

      socket.on("bus:location_changed", (data: any) => {
        if (data && data.busId === "BUS-01") {
          setLiveLocation(data);
          lastReceiveTime = Date.now();
          setLastUpdatedText(data.isStale ? "Last updated 2 min ago" : "Just now");
        }
      });
    }

    const checker = setInterval(() => {
      const diff = Date.now() - lastReceiveTime;
      if (diff > 5000) {
        setLastUpdatedText("Last updated 2 min ago");
      }
    }, 2000);

    return () => {
      clearInterval(checker);
      if (socket && typeof socket.disconnect === 'function') {
        socket.disconnect();
      }
    };
  }, [isTrackingActive]);

  const routeStops = [
    { name: 'Main Market', time: '07:35 AM', status: 'Completed', completed: true },
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

        {/* My Child -> Transport Info Card */}
        <View style={styles.childTransportCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.busIconWhiteCircle}>
              <Bus size={22} color="#4f46e5" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardHeaderTitle}>My Child's Transport</Text>
              <Text style={styles.cardHeaderSubTitle}>Academic Year 2026-27</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabelText}>Assigned Bus:</Text>
              <Text style={styles.infoValueText}>🚌 BUS-01</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabelText}>Pilot Driver:</Text>
              <Text style={styles.infoValueText}>Amit Kumar</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabelText}>Bus Route Belt:</Text>
              <Text style={styles.infoValueText}>Route 01</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabelText}>Pickup Stop:</Text>
              <Text style={styles.infoValueText}>Main Market</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabelText}>Pickup Scheduled Time:</Text>
              <Text style={styles.infoValueText}>7:35 AM</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabelText}>Today's Status:</Text>
              <Text style={[styles.infoValueText, { color: '#16a34a', fontWeight: '900' }]}>🟢 Bus On Route</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.trackButton, isTrackingActive && styles.trackButtonActive]} 
            onPress={() => setIsTrackingActive(!isTrackingActive)}
          >
            <Text style={styles.trackButtonText}>
              {isTrackingActive ? 'Hide Live Map' : 'Track Bus'}
            </Text>
            <Navigation size={18} color="#ffffff" style={{ transform: [{ rotate: isTrackingActive ? '180deg' : '0deg' }] }} />
          </TouchableOpacity>
        </View>

        {isTrackingActive && (
          <>
            {/* Live Location GPS Map Box */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitleNoMargin}>Live Location</Text>
              <View style={[styles.livePill, lastUpdatedText.includes("2 min") && { backgroundColor: "#fee2e2" }]}>
                <View style={[styles.liveGreenDot, lastUpdatedText.includes("2 min") && { backgroundColor: "#ef4444" }]} />
                <Text style={[styles.livePillText, lastUpdatedText.includes("2 min") && { color: "#ef4444" }]}>
                  {lastUpdatedText}
                </Text>
              </View>
            </View>

            <View style={styles.mapCard}>
              {/* Mock Map Vector Graphic */}
              <LinearGradient
                colors={['#f1f5f9', '#e2e8f0']}
                style={styles.mapGraphicBox}
              >
                {/* Sector Labels */}
                <Text style={[styles.mapRoadText, { top: 20, left: 30 }]}>Main Road</Text>
                <Text style={[styles.mapRoadText, { top: 20, right: 30 }]}>Sector 52</Text>
                <Text style={[styles.mapRoadText, { bottom: 50, left: 70 }]}>Main Market</Text>
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
                  <Text style={styles.etaSubText}>{`Speed: ${liveLocation.speed} km/h • Heading: ${liveLocation.heading}°`}</Text>
                </View>

                <View style={styles.infoColRight}>
                  <Text style={styles.infoLabel}>Current Stop</Text>
                  <View style={styles.stopRowRight}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.stopMainText}>Main Market</Text>
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
          </>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  pageTitle: { fontSize: 20, fontWeight: '900', color: '#0f172a', marginBottom: 16 },

  // Child Transport Card Styles
  childTransportCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 3,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 12,
    marginBottom: 16,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1e293b',
  },
  cardHeaderSubTitle: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 1,
  },
  infoGrid: {
    gap: 10,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  infoLabelText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  infoValueText: {
    fontSize: 13,
    color: '#0f172a',
    fontWeight: '800',
  },
  trackButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 2,
  },
  trackButtonActive: {
    backgroundColor: '#3b82f6',
  },
  trackButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },

  busIconWhiteCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f5f3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

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
