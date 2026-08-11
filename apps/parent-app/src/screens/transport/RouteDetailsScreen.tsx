import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Bell, Bus, MapPin, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RouteDetailsScreen({ navigation }: any) {
  const routeStops = [
    { number: '1', name: 'Maple Park', time: '7:05 AM', type: 'Pickup' },
    { number: '2', name: 'City Center', time: '7:15 AM', type: 'Pickup' },
    { number: '3', name: 'Sector 52', time: '7:30 AM', type: 'Pickup' },
    { number: '4', name: 'Green Valley School', time: '7:50 AM', type: 'Drop' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Route Details</Text>
        <TouchableOpacity style={styles.bellBtn}>
          <Bell size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Bus Info Banner Card */}
        <LinearGradient
          colors={['#1e1b4b', '#312e81', '#4338ca']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.busBanner}
        >
          <View style={styles.bannerLeft}>
            <Text style={styles.busNumberText}>Bus No. UP32 AB 1234</Text>
            <Text style={styles.routeNameText}>Green Valley Route</Text>
          </View>
          <View style={styles.busGraphicCircle}>
            <Bus size={32} color="#f59e0b" fill="#fef08a" strokeWidth={1.8} />
          </View>
        </LinearGradient>

        {/* Route Stats Card (3 Columns) */}
        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Total Stops</Text>
            <Text style={styles.statValue}>12</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>18.6 <Text style={styles.unitText}>km</Text></Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>45 <Text style={styles.unitText}>min</Text></Text>
          </View>
        </View>

        {/* Route Map Section */}
        <Text style={styles.sectionTitle}>Route Map</Text>
        <View style={styles.mapCard}>
          <LinearGradient
            colors={['#f8fafc', '#e2e8f0']}
            style={styles.mapBox}
          >
            {/* Blue Path Line */}
            <View style={styles.bluePathLine} />

            {/* Start Pin */}
            <View style={[styles.pinBox, { top: 80, left: 30 }]}>
              <MapPin size={22} color="#7c3aed" fill="#7c3aed" />
            </View>

            {/* Middle Pin */}
            <View style={[styles.pinBox, { top: 40, right: 90 }]}>
              <MapPin size={22} color="#ef4444" fill="#ef4444" />
            </View>

            {/* End Pin */}
            <View style={[styles.pinBox, { top: 20, right: 30 }]}>
              <MapPin size={22} color="#22c55e" fill="#22c55e" />
            </View>

            {/* Map Labels */}
            <View style={styles.startLabelBox}>
              <Text style={styles.mapLabelTitle}>Start</Text>
              <Text style={styles.mapLabelTime}>7:05 AM</Text>
              <Text style={styles.mapLabelSub}>Maple Park</Text>
            </View>

            <View style={styles.endLabelBox}>
              <Text style={styles.mapLabelTitle}>End</Text>
              <Text style={styles.mapLabelTime}>7:50 AM</Text>
              <Text style={styles.mapLabelSub}>Green Valley School</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Route Stops Section */}
        <Text style={styles.sectionTitle}>Route Stops</Text>
        <View style={styles.stopsCardList}>
          {routeStops.map((stop, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.stopRow, idx < routeStops.length - 1 && styles.rowBorder]}
              onPress={() => navigation.navigate('BusStopDetails')}
              activeOpacity={0.75}
            >
              <View style={styles.stopNumCircle}>
                <Text style={styles.stopNumText}>{stop.number}</Text>
              </View>

              <View style={styles.stopTextCol}>
                <Text style={styles.stopNameText}>{stop.name}</Text>
                <Text style={styles.stopTimeText}>{stop.time}</Text>
              </View>

              <View style={styles.pickupBadge}>
                <Text style={styles.pickupBadgeText}>{stop.type}</Text>
              </View>
            </TouchableOpacity>
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
  bellBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Bus Banner
  busBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#312e81',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  bannerLeft: { flex: 1 },
  busNumberText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  routeNameText: { fontSize: 12, color: '#c7d2fe', fontWeight: '600', marginTop: 4 },
  busGraphicCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Stats Card
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  statCol: { alignItems: 'center', flex: 1 },
  statLabel: { fontSize: 11, color: '#64748b', fontWeight: '700' },
  statValue: { fontSize: 18, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  unitText: { fontSize: 11, color: '#64748b', fontWeight: '600' },
  statDivider: { width: 1, height: 24, backgroundColor: '#f1f5f9' },

  // Map Section
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  mapCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  mapBox: { height: 180, position: 'relative' },
  bluePathLine: {
    position: 'absolute',
    top: 50,
    left: 40,
    right: 40,
    height: 4,
    backgroundColor: '#2563eb',
    borderRadius: 2,
    transform: [{ rotate: '-12deg' }],
  },
  pinBox: { position: 'absolute' },
  startLabelBox: { position: 'absolute', bottom: 12, left: 16 },
  endLabelBox: { position: 'absolute', bottom: 12, right: 16, alignItems: 'flex-end' },
  mapLabelTitle: { fontSize: 11, fontWeight: '900', color: '#0f172a' },
  mapLabelTime: { fontSize: 10, color: '#2563eb', fontWeight: '700' },
  mapLabelSub: { fontSize: 10, color: '#64748b', fontWeight: '500' },

  // Stops List
  stopsCardList: {
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
  stopRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  stopNumCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  stopNumText: { fontSize: 12, fontWeight: '900', color: '#475569' },
  stopTextCol: { flex: 1 },
  stopNameText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  stopTimeText: { fontSize: 11, color: '#94a3b8', fontWeight: '500', marginTop: 2 },
  pickupBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  pickupBadgeText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },
});
