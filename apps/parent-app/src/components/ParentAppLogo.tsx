import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Users, Bus, Navigation, GraduationCap, Shield } from 'lucide-react-native';

interface ParentAppLogoProps {
  size?: 'small' | 'medium' | 'large';
  useImage?: boolean;
}

export default function ParentAppLogo({ size = 'medium', useImage = false }: ParentAppLogoProps) {
  const dimensions = {
    small: { container: 64, busIcon: 20, pinIcon: 16, pinTop: -8 },
    medium: { container: 110, busIcon: 36, pinIcon: 22, pinTop: -12 },
    large: { container: 150, busIcon: 52, pinIcon: 30, pinTop: -18 },
  }[size];

  return (
    <View style={[styles.outerWrapper, { width: dimensions.container, height: dimensions.container }]}>
      {/* 3D Glass Badge Container */}
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#0f766e']}
        style={[styles.badgeContainer, { borderRadius: dimensions.container * 0.28 }]}
      >
        {/* Inner Glow */}
        <LinearGradient
          colors={['rgba(56, 189, 248, 0.3)', 'transparent']}
          style={styles.innerGlow}
        />

        {/* Floating 3D GPS Pin */}
        <View style={[styles.gpsPinContainer, { top: dimensions.pinTop }]}>
          <LinearGradient
            colors={['#38bdf8', '#0284c7']}
            style={styles.gpsPinBadge}
          >
            <Navigation size={dimensions.pinIcon * 0.7} color="#ffffff" />
          </LinearGradient>
          <View style={styles.pinGlow} />
        </View>

        {/* Family & Student Card Icon */}
        <LinearGradient
          colors={['#fbbf24', '#f59e0b', '#d97706']}
          style={[styles.familyCard, { width: dimensions.container * 0.68, height: dimensions.container * 0.54 }]}
        >
          <View style={styles.cardHeader}>
            <GraduationCap size={14} color="#1e1b4b" strokeWidth={2.5} />
            <Text style={styles.cardTitle}>PARENT</Text>
          </View>
          <View style={styles.iconRow}>
            <Users size={dimensions.busIcon * 0.65} color="#1e1b4b" strokeWidth={2.2} />
            <Bus size={dimensions.busIcon * 0.55} color="#1e1b4b" strokeWidth={2} />
          </View>
        </LinearGradient>

        {/* Footer Pill */}
        <View style={styles.footerPill}>
          <Heart size={10} color="#f43f5e" fill="#f43f5e" />
          <Text style={styles.footerText}>SchoolMitra</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
  },
  badgeContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    position: 'relative',
    overflow: 'visible',
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
    width: 30,
    height: 30,
    borderRadius: 15,
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
  familyCard: {
    borderRadius: 12,
    padding: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardTitle: {
    fontSize: 9,
    fontWeight: '900',
    color: '#1e1b4b',
    letterSpacing: 0.5,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerPill: {
    position: 'absolute',
    bottom: -6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1b4b',
    borderColor: '#38bdf8',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
