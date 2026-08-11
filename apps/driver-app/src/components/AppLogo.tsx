import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bus, MapPin, Users, Navigation } from 'lucide-react-native';

interface AppLogoProps {
  size?: 'small' | 'medium' | 'large';
}

export default function AppLogo({ size = 'medium' }: AppLogoProps) {
  const dimensions = {
    small: { container: 60, busIcon: 24, pinIcon: 16, pinTop: -8, kidsSize: 10 },
    medium: { container: 110, busIcon: 44, pinIcon: 24, pinTop: -14, kidsSize: 14 },
    large: { container: 150, busIcon: 60, pinIcon: 32, pinTop: -20, kidsSize: 18 },
  }[size];

  return (
    <View style={[styles.outerWrapper, { width: dimensions.container, height: dimensions.container }]}>
      {/* 3D Glass Badge Container */}
      <LinearGradient
        colors={['#1e293b', '#0f172a', '#020617']}
        style={[styles.badgeContainer, { borderRadius: dimensions.container * 0.28 }]}
      >
        {/* Inner Radial Glow */}
        <LinearGradient
          colors={['rgba(56, 189, 248, 0.25)', 'transparent']}
          style={styles.innerGlow}
        />

        {/* Floating 3D GPS Pin Marker */}
        <View style={[styles.gpsPinContainer, { top: dimensions.pinTop }]}>
          <LinearGradient
            colors={['#38bdf8', '#0284c7']}
            style={styles.gpsPinBadge}
          >
            <Navigation size={dimensions.pinIcon * 0.7} color="#ffffff" />
          </LinearGradient>
          <View style={styles.pinGlow} />
        </View>

        {/* 3D Bus Body */}
        <LinearGradient
          colors={['#fbbf24', '#f59e0b', '#d97706']}
          style={[styles.busCard, { width: dimensions.container * 0.65, height: dimensions.container * 0.52 }]}
        >
          <View style={styles.busGlassRow}>
            <View style={styles.busWindow} />
            <View style={styles.busWindow} />
            <View style={styles.busWindow} />
          </View>
          <View style={styles.busBodyRow}>
            <Bus size={dimensions.busIcon * 0.65} color="#1e293b" strokeWidth={2.2} />
            <Text style={styles.busLabel}>BUS</Text>
          </View>
        </LinearGradient>

        {/* Happy Kids & GPS Footer Badge */}
        <View style={styles.kidsBadgeRow}>
          <View style={styles.kidPill}>
            <Users size={12} color="#34d399" />
            <Text style={styles.kidText}>3D GPS</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 15,
  },
  badgeContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    overflow: 'visible',
    position: 'relative',
  },
  innerGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
  },
  gpsPinContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  gpsPinBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  pinGlow: {
    width: 8,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#38bdf8',
    marginTop: 2,
  },
  busCard: {
    borderRadius: 12,
    padding: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    marginTop: 8,
  },
  busGlassRow: {
    flexDirection: 'row',
    gap: 4,
    width: '100%',
    justifyContent: 'center',
  },
  busWindow: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 3,
  },
  busBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  busLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  kidsBadgeRow: {
    position: 'absolute',
    bottom: -6,
    alignItems: 'center',
  },
  kidPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderColor: '#34d399',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
  },
  kidText: {
    color: '#34d399',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
