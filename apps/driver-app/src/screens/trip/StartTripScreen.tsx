import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import { ChevronLeft, Bus, CheckCircle2, Circle, Info, Play } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function StartTripScreen({ navigation }: any) {
  const [selectedRoute, setSelectedRoute] = useState(1);
  const [selectedShift, setSelectedShift] = useState('morning');

  const routes = [
    { id: 1, title: 'Route 01 - Morning', sub: 'Green Valley Route', details: '12 Stops  •  18.6 km' },
    { id: 2, title: 'Route 02 - Evening', sub: 'City Center Route', details: '10 Stops  •  16.2 km' },
  ];

  const shifts = [
    { id: 'morning', title: 'Morning Shift', time: '06:30 AM - 11:30 AM' },
    { id: 'afternoon', title: 'Afternoon Shift', time: '12:00 PM - 04:30 PM' },
  ];

  const handleStartTrip = () => {
    Alert.alert('Trip Started 🚀', 'Live GPS Tracking & Parent notifications activated.', [
      { text: 'OK', onPress: () => navigation.navigate('LiveTrip') }
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Start Trip</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Vehicle Info Hero Banner */}
        <LinearGradient
          colors={['#1e3a8a', '#2563eb', '#1d4ed8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.vehicleHeroCard}
        >
          <View style={styles.heroTopRow}>
            <View style={styles.vehicleTextCol}>
              <Text style={styles.plateText}>UP32 AB 1234</Text>
              <Text style={styles.busNameText}>Green Valley School Bus</Text>
            </View>

            <View style={styles.busGraphicCircle}>
              <Bus size={32} color="#f59e0b" fill="#fef08a" strokeWidth={1.8} />
            </View>
          </View>

          <View style={styles.heroDivider} />

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCol}>
              <Text style={styles.heroStatLabel}>Capacity</Text>
              <Text style={styles.heroStatVal}>52 Seats</Text>
            </View>

            <View style={styles.heroStatCol}>
              <Text style={styles.heroStatLabel}>Driver</Text>
              <Text style={styles.heroStatVal}>Rajesh Kumar</Text>
            </View>

            <View style={styles.heroStatCol}>
              <Text style={styles.heroStatLabel}>Status</Text>
              <View style={styles.activeDotRow}>
                <View style={styles.greenDot} />
                <Text style={styles.activeStatusText}>Active</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Select Route Section */}
        <Text style={styles.sectionTitle}>Select Route</Text>
        <View style={styles.groupContainer}>
          {routes.map((route) => {
            const isSelected = selectedRoute === route.id;
            return (
              <TouchableOpacity
                key={route.id}
                style={[styles.selectableCard, isSelected && styles.cardSelected]}
                onPress={() => setSelectedRoute(route.id)}
                activeOpacity={0.8}
              >
                <View style={styles.cardTextCol}>
                  <Text style={styles.cardTitleText}>{route.title}</Text>
                  <Text style={styles.cardSubText}>{route.sub}</Text>
                  <Text style={styles.cardDetailsText}>{route.details}</Text>
                </View>

                {isSelected ? (
                  <CheckCircle2 size={22} color="#2563eb" fill="#2563eb" />
                ) : (
                  <Circle size={22} color="#cbd5e1" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Select Shift Section */}
        <Text style={styles.sectionTitle}>Select Shift</Text>
        <View style={styles.groupContainer}>
          {shifts.map((shift) => {
            const isSelected = selectedShift === shift.id;
            return (
              <TouchableOpacity
                key={shift.id}
                style={[styles.selectableCard, isSelected && styles.cardSelected]}
                onPress={() => setSelectedShift(shift.id)}
                activeOpacity={0.8}
              >
                <View style={styles.cardTextCol}>
                  <Text style={styles.cardTitleText}>{shift.title}</Text>
                  <Text style={styles.cardSubText}>{shift.time}</Text>
                </View>

                {isSelected ? (
                  <CheckCircle2 size={22} color="#2563eb" fill="#2563eb" />
                ) : (
                  <Circle size={22} color="#cbd5e1" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Note Banner */}
        <View style={styles.noteBanner}>
          <Info size={18} color="#2563eb" />
          <Text style={styles.noteText}>
            Please ensure all safety checklist items are checked before starting the trip.
          </Text>
        </View>

        {/* Green Start Trip Button */}
        <TouchableOpacity
          style={styles.startTripBtn}
          onPress={handleStartTrip}
          activeOpacity={0.85}
        >
          <Play size={20} color="#ffffff" fill="#ffffff" />
          <Text style={styles.startTripBtnText}>Start Trip</Text>
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

  // Vehicle Hero Card
  vehicleHeroCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vehicleTextCol: { flex: 1 },
  plateText: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  busNameText: { fontSize: 12, color: '#bfdbfe', fontWeight: '600', marginTop: 2 },
  busGraphicCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(255, 255, 255, 0.15)', alignItems: 'center', justifyContent: 'center' },

  heroDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 14 },
  heroStatsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  heroStatCol: { flex: 1 },
  heroStatLabel: { fontSize: 11, color: '#93c5fd', fontWeight: '600' },
  heroStatVal: { fontSize: 13, color: '#ffffff', fontWeight: '900', marginTop: 2 },
  activeDotRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e' },
  activeStatusText: { fontSize: 12, color: '#4ade80', fontWeight: '800' },

  // Group Containers
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  groupContainer: { gap: 10, marginBottom: 20 },
  selectableCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  cardSelected: { borderColor: '#2563eb', backgroundColor: '#f0f7ff' },
  cardTextCol: { flex: 1 },
  cardTitleText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  cardSubText: { fontSize: 12, color: '#64748b', fontWeight: '500', marginTop: 2 },
  cardDetailsText: { fontSize: 11, color: '#2563eb', fontWeight: '700', marginTop: 4 },

  // Note Banner
  noteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginBottom: 24,
  },
  noteText: { flex: 1, fontSize: 12, color: '#1d4ed8', fontWeight: '600', lineHeight: 17 },

  // Start Trip Button
  startTripBtn: {
    backgroundColor: '#16a34a',
    borderRadius: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  startTripBtnText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
});
