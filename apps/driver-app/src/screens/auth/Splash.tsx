import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShieldCheck } from 'lucide-react-native';
import AppLogo from '../../components/AppLogo';

const { width } = Dimensions.get('window');

export default function Splash({ navigation }: any) {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(20)).current;
  const badgeOpacity = useRef(new Animated.Value(0)).current;
  const spinnerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate in sequence
    Animated.sequence([
      // Logo bounces in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // Title slides up
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslate, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // Badge fades in
      Animated.timing(badgeOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Spinner appears
      Animated.timing(spinnerOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#0f172a', '#020617']} style={styles.container}>
      <View style={styles.content}>
        {/* 3D App Logo */}
        <Animated.View style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          }
        ]}>
          <AppLogo size="large" />
        </Animated.View>

        {/* App Name */}
        <Animated.View style={{
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslate }],
        }}>
          <Text style={styles.title}>SchoolMitra</Text>
          <Text style={styles.subtitle}>Driver App</Text>
          <Text style={styles.tagline}>Real-time Bus Tracking & Student Safety</Text>
        </Animated.View>

        {/* Verified Badge */}
        <Animated.View style={[styles.badgeRow, { opacity: badgeOpacity }]}>
          <ShieldCheck size={16} color="#34d399" />
          <Text style={styles.badgeText}>RTO & Fleet Managed</Text>
        </Animated.View>

        {/* Spinner */}
        <Animated.View style={{ opacity: spinnerOpacity }}>
          <ActivityIndicator size="large" color="#38bdf8" style={styles.spinner} />
        </Animated.View>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>© 2026 SchoolMitra Technologies</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 28,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#38bdf8',
    textAlign: 'center',
    marginTop: 2,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  tagline: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
    marginTop: 20,
    marginBottom: 32,
  },
  badgeText: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: '600',
  },
  spinner: {
    marginTop: 8,
  },
  footerText: {
    position: 'absolute',
    bottom: 40,
    color: '#334155',
    fontSize: 11,
  },
});
