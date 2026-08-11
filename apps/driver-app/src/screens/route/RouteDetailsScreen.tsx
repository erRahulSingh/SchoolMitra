import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Navigation, Clock, Users, MapPin, Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RouteDetailsScreen({ navigation }: any) {
  const routeStops = [
    { number: 1, name: 'Maple Park', details: '07:00 AM  •  3 Students' },
    { number: 2, name: 'City Center', details: '07:08 AM  •  4 Students' },
    { number: 3, name: 'Green Valley School', details: '07:15 AM  •  All Students' },
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
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero Banner Card */}
        <LinearGradient
          colors={['#1e3a8a', '#2563eb', '#1d4ed8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.routeTitleText}>Route 01 - Morning</Text>
              <Text style={styles.routeNameText}>Green Valley Route</Text>
            </View>
            <View style={styles.stopsBadge}>
              <Text style={styles.stopsBadgeText}>12 Stops</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Interactive Route Map View Box */}
        <View style={styles.mapCard}>
          <LinearGradient colors={['#f8fafc', '#e2e8f0']} style={styles.mapBox}>
            <View style={styles.bluePathLine} />
            <View style={[styles.mapPin, { top: 30, left: 50, backgroundColor: '#16a34a' }]}><Text style={styles.pinText}>1</Text></View>
            <View style={[styles.mapPin, { top: 70, left: 120, backgroundColor: '#16a34a' }]}><Text style={styles.pinText}>2</Text></View>
            <View style={[styles.mapPin, { top: 110, left: 190, backgroundColor: '#ef4444' }]}><Text style={styles.pinText}>3</Text></View>
          </LinearGradient>
        </View>

        {/* Route Information Table Card */}
        <Text style={styles.sectionTitle}>Route Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Navigation size={18} color="#2563eb" />
            <Text style={styles.infoLabel}>Total Distance</Text>
            <Text style={styles.infoVal}>18.6 km</Text>
          </View>

          <View style={styles.dividerLine} />

          <View style={styles.infoRow}>
            <Clock size={18} color="#2563eb" />
            <Text style={styles.infoLabel}>Estimated Duration</Text>
            <Text style={styles.infoVal}>45 min</Text>
          </View>

          <View style={styles.dividerLine} />

          <View style={styles.infoRow}>
            <Users size={18} color="#2563eb" />
            <Text style={styles.infoLabel}>Total Students</Text>
            <Text style={styles.infoVal}>42</Text>
          </View>

          <View style={styles.dividerLine} />

          <View style={styles.infoRow}>
            <MapPin size={18} color="#2563eb" />
            <Text style={styles.infoLabel}>Stops</Text>
            <Text style={styles.infoVal}>12</Text>
          </View>
        </View>

        {/* Route Stops Section */}
        <Text style={styles.sectionTitle}>Route Stops</Text>
        <View style={styles.stopsCard}>
          {routeStops.map((stop, idx) => (
            <View key={idx} style={styles.stopRow}>
              <View style={styles.stopNumCircle}>
                <Text style={styles.stopNumText}>{stop.number}</Text>
              </View>

              <View style={styles.stopTextCol}>
                <Text style={styles.stopNameText}>{stop.name}</Text>
                <Text style={styles.stopDetailsText}>{stop.details}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Start Navigation Button */}
        <TouchableOpacity
          style={styles.startNavBtn}
          onPress={() => navigation.navigate('LiveNavigation')}
          activeOpacity={0.85}
        >
          <Play size={18} color="#ffffff" fill="#ffffff" />
          <Text style={styles.startNavBtnText}>Start Navigation</Text>
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
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Hero Card
  heroCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  routeTitleText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  routeNameText: { fontSize: 12, color: '#bfdbfe', fontWeight: '600', marginTop: 2 },
  stopsBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  stopsBadgeText: { fontSize: 11, fontWeight: '800', color: '#ffffff' },

  // Map
  mapCard: { backgroundColor: '#ffffff', borderRadius: 20, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden', marginBottom: 20 },
  mapBox: { height: 160, position: 'relative' },
  bluePathLine: { position: 'absolute', top: 50, left: 30, right: 30, height: 4, backgroundColor: '#2563eb', transform: [{ rotate: '15deg' }] },
  mapPin: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', position: 'absolute' },
  pinText: { fontSize: 10, fontWeight: '900', color: '#ffffff' },

  // Info Card
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  infoCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  dividerLine: { height: 1, backgroundColor: '#f1f5f9' },
  infoLabel: { fontSize: 13, color: '#64748b', fontWeight: '600', flex: 1 },
  infoVal: { fontSize: 13, color: '#0f172a', fontWeight: '900' },

  // Stops Card
  stopsCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#e2e8f0', gap: 14, marginBottom: 24 },
  stopRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stopNumCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#16a34a', alignItems: 'center', justifyContent: 'center' },
  stopNumText: { fontSize: 11, fontWeight: '900', color: '#ffffff' },
  stopTextCol: { flex: 1 },
  stopNameText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  stopDetailsText: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 2 },

  // Start Nav Btn
  startNavBtn: {
    backgroundColor: '#1d4ed8',
    borderRadius: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
  },
  startNavBtnText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
});
