import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native';
import { Bus, MapPin, Clock, Phone, ChevronLeft, Navigation } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function LiveBusTrackingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Bus Tracking</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Bus Status Card */}
        <LinearGradient colors={['#2563eb', '#1d4ed8']} style={styles.busCard}>
          <View style={styles.busCardTop}><View style={styles.busIconBox}><Bus size={24} color="#2563eb" /></View><View style={{ flex: 1 }}><Text style={styles.busTitle}>School Bus #01</Text><Text style={styles.busPlate}>UP32 AT 1234</Text></View><View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveText}>LIVE</Text></View></View>
          <View style={styles.divider} />
          <View style={styles.busCardBottom}>
            <View style={styles.busInfoItem}><MapPin size={14} color="#93c5fd" /><Text style={styles.busInfoText}>Near Sector 12, Lucknow</Text></View>
            <View style={styles.busInfoItem}><Clock size={14} color="#93c5fd" /><Text style={styles.busInfoText}>ETA: 10 mins</Text></View>
            <View style={styles.busInfoItem}><Navigation size={14} color="#93c5fd" /><Text style={styles.busInfoText}>Speed: 35 km/h</Text></View>
          </View>
        </LinearGradient>

        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}><MapPin size={40} color="#94a3b8" /><Text style={styles.mapText}>Live GPS Map View</Text><Text style={styles.mapSub}>Bus location updates every 30 seconds</Text></View>

        {/* Driver Info */}
        <View style={styles.driverCard}>
          <Text style={styles.sectionTitle}>Driver Information</Text>
          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}><Text style={styles.driverInitials}>RK</Text></View>
            <View style={{ flex: 1 }}><Text style={styles.driverName}>Ramu Kumar</Text><Text style={styles.driverMeta}>License: UP32-DL-2020-12345</Text></View>
            <TouchableOpacity style={styles.callBtn}><Phone size={18} color="#2563eb" /></TouchableOpacity>
          </View>
        </View>

        {/* Route Stops */}
        <View style={styles.routeCard}>
          <Text style={styles.sectionTitle}>Route Stops</Text>
          {['Green Valley School (Start)', 'Sector 12 Gate', 'Main Market Crossing', 'Railway Station Road', 'Ashok Nagar Colony', 'Your Stop — Green Park'].map((stop, idx) => (
            <View key={idx} style={styles.stopRow}>
              <View style={[styles.stopDot, idx === 5 && { backgroundColor: '#4f46e5' }]} />
              <Text style={[styles.stopText, idx === 5 && { color: '#4f46e5', fontWeight: '900' }]}>{stop}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 14 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 16 },
  busCard: { borderRadius: 24, padding: 18, elevation: 4 },
  busCardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  busIconBox: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' },
  busTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  busPlate: { fontSize: 12, color: '#93c5fd', fontWeight: '700', marginTop: 2 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e' },
  liveText: { fontSize: 11, fontWeight: '900', color: '#22c55e' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 14 },
  busCardBottom: { gap: 8 },
  busInfoItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  busInfoText: { fontSize: 13, color: '#bfdbfe', fontWeight: '600' },
  mapPlaceholder: { height: 200, backgroundColor: '#e2e8f0', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  mapText: { fontSize: 16, fontWeight: '800', color: '#64748b', marginTop: 8 },
  mapSub: { fontSize: 12, color: '#94a3b8', fontWeight: '600', marginTop: 4 },
  driverCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0' },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  driverAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center' },
  driverInitials: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  driverName: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  driverMeta: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 2 },
  callBtn: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#eef2ff', justifyContent: 'center', alignItems: 'center' },
  routeCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0' },
  stopRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8, borderLeftWidth: 2, borderLeftColor: '#e2e8f0', paddingLeft: 16, marginLeft: 4 },
  stopDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#94a3b8', position: 'absolute', left: -6 },
  stopText: { fontSize: 13, color: '#334155', fontWeight: '700' }
});
