import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Compass, CornerUpLeft, Volume2, VolumeX, Layers, Plus, Minus, Bus, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LiveNavigationScreen({ navigation }: any) {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Navigation Map</Text>
        <TouchableOpacity style={styles.compassBtn}>
          <Compass size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      {/* Top Turn Banner */}
      <View style={styles.turnBanner}>
        <CornerUpLeft size={36} color="#ffffff" strokeWidth={2.5} />
        <View style={styles.turnTextCol}>
          <Text style={styles.turnDistanceText}>350 m</Text>
          <Text style={styles.turnInstructionText}>Turn left onto Green Street</Text>
        </View>
      </View>

      {/* Turn-by-Turn GPS Map Area */}
      <View style={styles.mapArea}>
        <LinearGradient colors={['#f8fafc', '#e2e8f0']} style={styles.mapBox}>
          {/* Blue Path Line */}
          <View style={styles.bluePathLine} />

          {/* Bus Location Pin */}
          <View style={[styles.busPinBox, { top: 180, left: 160 }]}>
            <View style={styles.busPinCircle}>
              <Bus size={18} color="#ffffff" />
            </View>
          </View>

          {/* Destination Pin */}
          <View style={[styles.destPinBox, { top: 60, left: 240 }]}>
            <MapPin size={24} color="#ef4444" fill="#fee2e2" />
          </View>

          {/* Floating Controls */}
          <View style={styles.floatingControlsCol}>
            <TouchableOpacity style={styles.floatingBtn} onPress={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX size={18} color="#0f172a" /> : <Volume2 size={18} color="#0f172a" />}
            </TouchableOpacity>

            <TouchableOpacity style={styles.floatingBtn}>
              <Layers size={18} color="#0f172a" />
            </TouchableOpacity>

            <View style={styles.zoomBtnGroup}>
              <TouchableOpacity style={styles.zoomBtn}><Plus size={18} color="#0f172a" /></TouchableOpacity>
              <View style={styles.zoomDivider} />
              <TouchableOpacity style={styles.zoomBtn}><Minus size={18} color="#0f172a" /></TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Bottom Controls Card */}
      <View style={styles.bottomCard}>
        {/* Next Stop & ETA Row */}
        <View style={styles.nextStopRow}>
          <View style={styles.nextStopLeftCol}>
            <Text style={styles.nextStopLabel}>Next Stop</Text>
            <Text style={styles.nextStopName}>City Center</Text>
            <Text style={styles.nextStopDist}>450 m away</Text>
          </View>

          <View style={styles.etaRightCol}>
            <Text style={styles.etaLabel}>ETA</Text>
            <Text style={styles.etaValue}>07:08 AM</Text>
          </View>
        </View>

        {/* Speed & Distance Meter Row */}
        <View style={styles.meterRow}>
          <View style={styles.speedCol}>
            <Text style={styles.meterLabel}>Speed</Text>
            <Text style={styles.meterVal}>32 <Text style={styles.meterUnit}>km/h</Text></Text>
          </View>

          {/* Speed Limit Ring Gauge */}
          <View style={styles.speedGaugeCircle}>
            <Text style={styles.speedLimitVal}>40</Text>
            <Text style={styles.speedLimitUnit}>km/h</Text>
            <Text style={styles.speedLimitLabel}>Speed Limit</Text>
          </View>

          <View style={styles.distCol}>
            <Text style={styles.meterLabel}>Distance Left</Text>
            <Text style={styles.meterVal}>6.2 <Text style={styles.meterUnit}>km</Text></Text>
          </View>
        </View>

        {/* End Navigation Button */}
        <TouchableOpacity
          style={styles.endNavBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.endNavBtnText}>End Navigation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
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
  compassBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },

  // Turn Banner
  turnBanner: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  turnTextCol: { flex: 1 },
  turnDistanceText: { fontSize: 22, fontWeight: '900', color: '#ffffff' },
  turnInstructionText: { fontSize: 13, color: '#dcfce7', fontWeight: '600', marginTop: 2 },

  // Map Area
  mapArea: { flex: 1 },
  mapBox: { flex: 1, position: 'relative' },
  bluePathLine: { position: 'absolute', top: 70, left: 240, width: 4, height: 180, backgroundColor: '#2563eb', transform: [{ rotate: '-35deg' }] },
  busPinBox: { position: 'absolute' },
  busPinCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ffffff' },
  destPinBox: { position: 'absolute' },

  floatingControlsCol: { position: 'absolute', right: 16, top: 16, gap: 10 },
  floatingBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', elevation: 3 },
  zoomBtnGroup: { backgroundColor: '#ffffff', borderRadius: 20, elevation: 3, overflow: 'hidden' },
  zoomBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  zoomDivider: { height: 1, backgroundColor: '#f1f5f9' },

  // Bottom Card
  bottomCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 10,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  nextStopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  nextStopLeftCol: { flex: 1 },
  nextStopLabel: { fontSize: 11, color: '#64748b', fontWeight: '700' },
  nextStopName: { fontSize: 18, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  nextStopDist: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 1 },
  etaRightCol: { alignItems: 'flex-end' },
  etaLabel: { fontSize: 11, color: '#64748b', fontWeight: '700' },
  etaValue: { fontSize: 15, fontWeight: '900', color: '#2563eb', marginTop: 2 },

  // Meter Row
  meterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  speedCol: { alignItems: 'center', flex: 1 },
  distCol: { alignItems: 'center', flex: 1 },
  meterLabel: { fontSize: 11, color: '#64748b', fontWeight: '700' },
  meterVal: { fontSize: 18, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  meterUnit: { fontSize: 11, color: '#64748b', fontWeight: '600' },

  speedGaugeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdf4',
  },
  speedLimitVal: { fontSize: 18, fontWeight: '900', color: '#16a34a' },
  speedLimitUnit: { fontSize: 8, fontWeight: '800', color: '#16a34a', marginTop: -2 },
  speedLimitLabel: { fontSize: 7, color: '#64748b', fontWeight: '700', marginTop: 1 },

  // End Nav Btn
  endNavBtn: {
    borderWidth: 1.5,
    borderColor: '#ef4444',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endNavBtnText: { fontSize: 15, fontWeight: '900', color: '#ef4444' },
});
