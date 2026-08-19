import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import { ChevronLeft, Bus, CheckCircle2, Circle, Info, Play, Users, UserCheck, UserX, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function StartTripScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState<'SCHEDULED' | 'STARTED' | 'IN_PROGRESS' | 'COMPLETED'>('SCHEDULED');

  const handleStartTrip = () => {
    setCurrentStep('STARTED');
    Alert.alert(
      'Trip Started 🚀',
      'Live GPS Tracking activated. Lifecycle: STARTED',
      [
        { 
          text: 'Proceed to Cockpit', 
          onPress: () => {
            setCurrentStep('IN_PROGRESS');
            navigation.navigate('LiveTrip');
          }
        }
      ]
    );
  };

  const steps = [
    { key: 'SCHEDULED', label: '1. Scheduled' },
    { key: 'STARTED', label: '2. Started' },
    { key: 'IN_PROGRESS', label: '3. In Progress' },
    { key: 'COMPLETED', label: '4. Completed' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Trip</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Today's Trip Details Hero */}
        <LinearGradient
          colors={['#0f172a', '#1e293b', '#334155']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.vehicleHeroCard}
        >
          <View style={styles.heroTopRow}>
            <View style={styles.vehicleTextCol}>
              <Text style={styles.plateText}>Bus: BUS-01</Text>
              <Text style={styles.busNameText}>Route: Route 01</Text>
            </View>

            <View style={styles.busGraphicCircle}>
              <Bus size={28} color="#eab308" strokeWidth={2} />
            </View>
          </View>

          <View style={styles.heroDivider} />

          {/* Lifecycle Stepper Badge */}
          <Text style={styles.stepperHeader}>TRIP LIFECYCLE PROGRESS</Text>
          <View style={styles.lifecycleStepper}>
            {steps.map((step) => {
              const isActive = currentStep === step.key;
              return (
                <View key={step.key} style={[styles.stepItem, isActive && styles.stepItemActive]}>
                  <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>
                    {step.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </LinearGradient>

        {/* Student Attendance Roster Details Card */}
        <Text style={styles.sectionTitle}>Attendance Roster Summary</Text>
        <View style={styles.attendanceCard}>
          <View style={styles.rosterRow}>
            <View style={styles.rosterStatCol}>
              <View style={[styles.rosterIconBg, { backgroundColor: '#eff6ff' }]}>
                <Users size={20} color="#2563eb" />
              </View>
              <Text style={styles.rosterLabel}>Total Students</Text>
              <Text style={[styles.rosterVal, { color: '#1e3a8a' }]}>42</Text>
            </View>

            <View style={styles.rosterStatCol}>
              <View style={[styles.rosterIconBg, { backgroundColor: '#f0fdf4' }]}>
                <UserCheck size={20} color="#16a34a" />
              </View>
              <Text style={styles.rosterLabel}>Present Expected</Text>
              <Text style={[styles.rosterVal, { color: '#14532d' }]}>39</Text>
            </View>

            <View style={styles.rosterStatCol}>
              <View style={[styles.rosterIconBg, { backgroundColor: '#fef2f2' }]}>
                <UserX size={20} color="#ef4444" />
              </View>
              <Text style={styles.rosterLabel}>Absent Today</Text>
              <Text style={[styles.rosterVal, { color: '#7f1d1d' }]}>3</Text>
            </View>
          </View>
        </View>

        {/* Duty Info Banner */}
        <View style={styles.noteBanner}>
          <Info size={18} color="#4f46e5" />
          <Text style={styles.noteText}>
            Starting this trip notifies parents and begins Socket.IO GPS telemetry broadcasting for Bus-01.
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
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vehicleTextCol: { flex: 1 },
  plateText: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  busNameText: { fontSize: 14, color: '#bfdbfe', fontWeight: '700', marginTop: 4 },
  busGraphicCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255, 255, 255, 0.1)', alignItems: 'center', justifyContent: 'center' },

  heroDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 16 },
  stepperHeader: { fontSize: 10, fontWeight: '900', color: '#94a3b8', letterSpacing: 1, marginBottom: 10 },
  lifecycleStepper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  stepItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  stepItemActive: {
    backgroundColor: '#22c55e',
  },
  stepLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '700',
  },
  stepLabelActive: {
    color: '#ffffff',
    fontWeight: '900',
  },

  // Attendance Card
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  attendanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  rosterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rosterStatCol: {
    flex: 1,
    alignItems: 'center',
    padding: 4,
  },
  rosterIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  rosterLabel: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '700',
    textAlign: 'center',
  },
  rosterVal: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },

  // Note Banner
  noteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f5f3ff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd6fe',
    marginBottom: 24,
  },
  noteText: { flex: 1, fontSize: 12, color: '#4f46e5', fontWeight: '600', lineHeight: 17 },

  // Start Trip Button
  startTripBtn: {
    backgroundColor: '#16a34a',
    borderRadius: 20,
    paddingVertical: 16,
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
  startTripBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
});
