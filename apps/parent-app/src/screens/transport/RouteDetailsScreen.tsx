import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Bell, Bus, MapPin, Clock, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UniversalMapView from '../../components/UniversalMapView';
import { useParentAuth } from '../../context/ParentAuthContext';
import { parentApi } from '../../lib/api';

export default function RouteDetailsScreen({ navigation }: any) {
  const { currentChild, user } = useParentAuth();

  const [routeName, setRouteName] = useState('Route 1 Dwarka Belt');
  const [busNo, setBusNo] = useState(currentChild?.busNo || 'Bus #01');
  const [distanceKm, setDistanceKm] = useState(18.5);
  const [durationMin, setDurationMin] = useState(45);
  const [mapConfig, setMapConfig] = useState<any>(null);

  const [routeStops, setRouteStops] = useState<any[]>([
    { number: '1', name: 'Sector 21 Metro', time: '7:05 AM', type: 'Pickup', latitude: 28.5520, longitude: 77.0580 },
    { number: '2', name: 'Main Market', time: '7:20 AM', type: 'Pickup', latitude: 28.5700, longitude: 77.0620 },
    { number: '3', name: 'Maple Park', time: '7:35 AM', type: 'Pickup', latitude: 28.5833, longitude: 77.0667 },
    { number: '4', name: 'Sector 52', time: '7:50 AM', type: 'Pickup', latitude: 28.5880, longitude: 77.0690 },
    { number: '5', name: currentChild?.schoolName || 'School Campus', time: '8:05 AM', type: 'Drop', latitude: 28.5900, longitude: 77.0700 },
  ]);

  useEffect(() => {
    // 1. Fetch map config
    parentApi.getMapConfig()
      .then(res => { if (res?.success) setMapConfig(res.data); })
      .catch(() => {});

    // 2. Fetch routes from backend
    parentApi.getRoutes()
      .then(res => {
        if (res?.success && res.data?.routes && res.data.routes.length > 0) {
          const r = res.data.routes[0];
          setRouteName(r.routeName || 'Dwarka Belt Route');
          if (r.distanceKm) setDistanceKm(r.distanceKm);
          if (r.stops && r.stops.length > 0) {
            setRouteStops(r.stops.map((s: any, idx: number) => ({
              number: String(idx + 1),
              name: s.stopName || s.name || `Stop ${idx + 1}`,
              time: s.pickupTime || s.scheduledTimeMorning || '7:15 AM',
              type: idx === r.stops.length - 1 ? 'Drop' : 'Pickup',
              latitude: s.latitude || (28.55 + (idx * 0.01)),
              longitude: s.longitude || (77.05 + (idx * 0.005))
            })));
          }
        }
      })
      .catch(() => {});
  }, [currentChild]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Route Details</Text>
        <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('Notifications')}>
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
            <Text style={styles.busNumberText}>🚌 {busNo}</Text>
            <Text style={styles.routeNameText}>{routeName}</Text>
          </View>
          <View style={styles.busGraphicCircle}>
            <Bus size={30} color="#f59e0b" strokeWidth={2.2} />
          </View>
        </LinearGradient>

        {/* Route Stats Card (3 Columns) */}
        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Total Stops</Text>
            <Text style={styles.statValue}>{routeStops.length}</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>{distanceKm} <Text style={styles.unitText}>km</Text></Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{durationMin} <Text style={styles.unitText}>min</Text></Text>
          </View>
        </View>

        {/* Interactive Dynamic Map Section */}
        <Text style={styles.sectionTitle}>Interactive Route Map</Text>
        <View style={styles.mapCard}>
          <UniversalMapView
            busLocation={{ latitude: 28.5833, longitude: 77.0667, speed: 40, heading: 90 }}
            schoolLocation={{ latitude: 28.5900, longitude: 77.0700, name: currentChild?.schoolName || 'School Campus' }}
            routeStops={routeStops}
            mapConfig={mapConfig}
            height={220}
          />
        </View>

        {/* Route Stops Section */}
        <Text style={styles.sectionTitle}>Route Stops ({routeStops.length})</Text>
        <View style={styles.stopsCardList}>
          {routeStops.map((stop, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.stopRow, idx < routeStops.length - 1 && styles.rowBorder]}
              onPress={() => navigation.navigate('BusStopDetails', { stop })}
              activeOpacity={0.75}
            >
              <View style={styles.stopNumCircle}>
                <Text style={styles.stopNumText}>{stop.number}</Text>
              </View>

              <View style={styles.stopTextCol}>
                <Text style={styles.stopNameText}>{stop.name}</Text>
                <Text style={styles.stopTimeText}>{stop.time}</Text>
              </View>

              <View style={[styles.pickupBadge, stop.type === 'Drop' && { backgroundColor: '#f3e8ff' }]}>
                <Text style={[styles.pickupBadgeText, stop.type === 'Drop' && { color: '#7c3aed' }]}>{stop.type}</Text>
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
    paddingTop: Platform.OS === 'ios' ? 52 : 38,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center' },
  bellBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Bus Banner
  busBanner: {
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#312e81',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  bannerLeft: { flex: 1 },
  busNumberText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  routeNameText: { fontSize: 12, color: '#c7d2fe', fontWeight: '600', marginTop: 3 },
  busGraphicCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Stats Card
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
  },
  statCol: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, height: 28, backgroundColor: '#e2e8f0' },
  statLabel: { fontSize: 11, color: '#64748b', fontWeight: '600', marginBottom: 2 },
  statValue: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  unitText: { fontSize: 11, color: '#64748b', fontWeight: '600' },

  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 10 },
  mapCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 22,
    backgroundColor: '#ffffff',
  },

  // Stops List Card
  stopsCardList: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  stopNumCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stopNumText: { fontSize: 12, fontWeight: '900', color: '#475569' },
  stopTextCol: { flex: 1 },
  stopNameText: { fontSize: 13.5, fontWeight: '800', color: '#0f172a' },
  stopTimeText: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 2 },
  pickupBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  pickupBadgeText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },
});
