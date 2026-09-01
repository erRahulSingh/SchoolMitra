import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Bus, Gauge, Navigation, Clock, MapPin, Send } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createSocketConnection } from '../../lib/socketClient';

export default function LiveTripScreen({ navigation }: any) {
  const [driverUser, setDriverUser] = React.useState<any>({});

  useEffect(() => {
    import('@react-native-async-storage/async-storage').then(({ default: AsyncStorage }) => {
      AsyncStorage.getItem('driverUser').then(res => {
        if (res) {
          try {
            setDriverUser(JSON.parse(res));
          } catch (e) {}
        }
      });
    });
  }, []);

  useEffect(() => {
    let locationSubscription: any;
    const socket = createSocketConnection("http://localhost:5000");

    const startTracking = async () => {
      try {
        const { default: Location } = await import('expo-location');
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          console.warn('Permission to access location was denied');
          return;
        }

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 1,
          },
          (location) => {
            const payload = {
              busId: driverUser?.assignedBusId || "BUS-01",
              tripId: "TRIP-101",
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              speed: location.coords.speed ? Math.round(location.coords.speed * 3.6) : 0,
              heading: location.coords.heading ? Math.round(location.coords.heading) : 0,
              timestamp: new Date(location.timestamp).toISOString(),
              isStale: false
            };

            if (socket && typeof socket.emit === 'function') {
              socket.emit("bus:location_changed", payload);
            }
          }
        );
      } catch (err) {
        console.error("GPS Tracking failed:", err);
      }
    };

    startTracking();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      if (socket && typeof socket.disconnect === 'function') {
        socket.disconnect();
      }
    };
  }, [driverUser]);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Trip</Text>

        <TouchableOpacity 
          style={styles.sosBadge} 
          onPress={() => navigation.navigate('Sos')}
          activeOpacity={0.8}
        >
          <Text style={styles.sosBadgeText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Top Status Banner Card */}
        <LinearGradient
          colors={['#1e3a8a', '#2563eb', '#1d4ed8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statusBanner}
        >
          <View style={styles.bannerHeaderRow}>
            <View>
              <Text style={styles.bannerTitleText}>Route 01 - Morning</Text>
              <Text style={styles.bannerSubText}>Green Valley Route</Text>
            </View>
            <View style={styles.inProgressBadge}>
              <Text style={styles.inProgressText}>In Progress</Text>
            </View>
          </View>

          {/* Timeline Bar */}
          <View style={styles.timelineBarContainer}>
            <View style={styles.timelineTrack}>
              <View style={[styles.timelineFill, { width: '40%' }]} />
              <View style={[styles.timelineDot, { left: '40%' }]} />
            </View>

            <View style={styles.timelineLabelsRow}>
              <Text style={styles.timeLabel}>Started 07:00 AM</Text>
              <Text style={styles.timeLabelMid}>12 Stops Remaining</Text>
              <Text style={styles.timeLabelRight}>End 07:45 AM</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Interactive Live Map View Box */}
        <View style={styles.mapCard}>
          <LinearGradient
            colors={['#f8fafc', '#e2e8f0']}
            style={styles.mapBox}
          >
            {/* Blue Path Line */}
            <View style={styles.bluePathLine} />

            {/* Bus Location Pin */}
            <View style={[styles.busPinBox, { top: 70, left: 140 }]}>
              <View style={styles.busPinCircle}>
                <Bus size={18} color="#ffffff" />
              </View>
            </View>

            {/* GPS Re-center Floating Action Button */}
            <TouchableOpacity style={styles.reCenterBtn} activeOpacity={0.8}>
              <Navigation size={18} color="#2563eb" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Telemetry Stats Grid (2x2 Grid) */}
        <View style={styles.telemetryGrid}>
          <View style={styles.telemetryBox}>
            <View style={styles.iconCircleBlue}>
              <Gauge size={18} color="#2563eb" />
            </View>
            <View style={styles.telemetryTextCol}>
              <Text style={styles.telemetryLabel}>Current Speed</Text>
              <Text style={styles.telemetryVal}>35 <Text style={styles.unitText}>km/h</Text></Text>
            </View>
          </View>

          <View style={styles.telemetryBox}>
            <View style={styles.iconCircleGreen}>
              <Navigation size={18} color="#16a34a" />
            </View>
            <View style={styles.telemetryTextCol}>
              <Text style={styles.telemetryLabel}>Distance Covered</Text>
              <Text style={styles.telemetryVal}>6.8 <Text style={styles.unitText}>km</Text></Text>
            </View>
          </View>

          <View style={styles.telemetryBox}>
            <View style={styles.iconCircleOrange}>
              <Clock size={18} color="#ea580c" />
            </View>
            <View style={styles.telemetryTextCol}>
              <Text style={styles.telemetryLabel}>ETA Next Stop</Text>
              <Text style={styles.telemetryVal}>5 <Text style={styles.unitText}>min</Text></Text>
            </View>
          </View>

          <View style={styles.telemetryBox}>
            <View style={styles.iconCirclePurple}>
              <MapPin size={18} color="#7c3aed" />
            </View>
            <View style={styles.telemetryTextCol}>
              <Text style={styles.telemetryLabel}>Total Distance</Text>
              <Text style={styles.telemetryVal}>18.6 <Text style={styles.unitText}>km</Text></Text>
            </View>
          </View>
        </View>

        {/* Next Stop Card */}
        <TouchableOpacity 
          style={styles.nextStopCard}
          onPress={() => navigation.navigate('StudentPickup')}
          activeOpacity={0.85}
        >
          <View style={styles.nextStopTextCol}>
            <Text style={styles.nextStopLabelText}>Next Stop</Text>
            <Text style={styles.nextStopNameText}>Maple Park</Text>
          </View>

          <View style={styles.etaCol}>
            <Text style={styles.etaLabelText}>ETA</Text>
            <Text style={styles.etaValText}>07:12 AM</Text>
          </View>

          <View style={styles.navCircleBtn}>
            <Send size={18} color="#ffffff" />
          </View>
        </TouchableOpacity>

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
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  sosBadge: { backgroundColor: '#ef4444', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  sosBadgeText: { fontSize: 11, fontWeight: '900', color: '#ffffff' },

  scrollContent: { padding: 16, paddingBottom: 100 },

  // Status Banner
  statusBanner: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  bannerHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bannerTitleText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  bannerSubText: { fontSize: 12, color: '#bfdbfe', fontWeight: '600', marginTop: 2 },
  inProgressBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  inProgressText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },

  timelineBarContainer: { marginTop: 16 },
  timelineTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, position: 'relative' },
  timelineFill: { height: '100%', backgroundColor: '#4ade80', borderRadius: 3 },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ffffff', position: 'absolute', top: -3, marginLeft: -6 },
  timelineLabelsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  timeLabel: { fontSize: 10, color: '#bfdbfe', fontWeight: '600' },
  timeLabelMid: { fontSize: 10, color: '#ffffff', fontWeight: '800' },
  timeLabelRight: { fontSize: 10, color: '#bfdbfe', fontWeight: '600' },

  // Map Card
  mapCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  mapBox: { height: 200, position: 'relative' },
  bluePathLine: {
    position: 'absolute',
    top: 60,
    left: 30,
    right: 30,
    height: 4,
    backgroundColor: '#2563eb',
    borderRadius: 2,
    transform: [{ rotate: '-10deg' }],
  },
  busPinBox: { position: 'absolute' },
  busPinCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ffffff' },
  reCenterBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 12, right: 12, elevation: 3 },

  // Telemetry Grid
  telemetryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  telemetryBox: {
    width: '48.5%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconCircleBlue: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' },
  iconCircleGreen: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center' },
  iconCircleOrange: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#fffbeb', alignItems: 'center', justifyContent: 'center' },
  iconCirclePurple: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f3e8ff', alignItems: 'center', justifyContent: 'center' },

  telemetryTextCol: { flex: 1 },
  telemetryLabel: { fontSize: 10, color: '#64748b', fontWeight: '700' },
  telemetryVal: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  unitText: { fontSize: 10, color: '#64748b', fontWeight: '600' },

  // Next Stop Card
  nextStopCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  nextStopTextCol: { flex: 1 },
  nextStopLabelText: { fontSize: 11, color: '#64748b', fontWeight: '700' },
  nextStopNameText: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  etaCol: { alignItems: 'flex-end', paddingRight: 12 },
  etaLabelText: { fontSize: 11, color: '#64748b', fontWeight: '700' },
  etaValText: { fontSize: 13, fontWeight: '900', color: '#2563eb', marginTop: 2 },
  navCircleBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
});
