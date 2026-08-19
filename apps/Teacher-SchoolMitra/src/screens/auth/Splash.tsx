import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronRight,
  Zap,
  Smartphone,
  Shield,
  User
} from 'lucide-react-native';
import Logo from '../../components/Logo';

const { width } = Dimensions.get('window');

export default function Splash({ navigation }: any) {
  const features = [
    { title: 'Quick Recovery', desc: 'Reset your password\nin a few easy steps', icon: Zap, color: '#eab308', bg: '#fef9c3' },
    { title: 'Mobile Optimized', desc: 'Designed for a seamless\nmobile experience', icon: Smartphone, color: '#3b82f6', bg: '#dbeafe' },
    { title: 'Secure & Reliable', desc: 'Enterprise grade security\nto protect your data', icon: Shield, color: '#16a34a', bg: '#dcfce7' },
    { title: 'Easy Access', desc: 'Simple and quick\nauthentication flow', icon: User, color: '#7c3aed', bg: '#f3e8ff' }
  ];

  return (
    <LinearGradient
      colors={['#1e1b4b', '#0f172a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Logo size={56} />
          <Text style={styles.logoText}>SchoolMitra</Text>
          <Text style={styles.logoSubtext}>Teacher App</Text>
        </View>

        {/* HERO TITLE */}
        <View>
          <Text style={styles.heroTitle}>Empowering Teachers,</Text>
          <Text style={[styles.heroTitle, { color: '#a78bfa' }]}>Enriching Students</Text>
          <Text style={styles.heroDesc}>
            Manage classes, track progress, and build a brighter future.
          </Text>
        </View>

        {/* FEATURE CARDS GRID (From Screenshots 1 & 2) */}
        <View style={styles.featuresGrid}>
          {features.map((f, idx) => {
            const IconComp = f.icon;
            return (
              <View key={idx} style={styles.featureCard}>
                <View style={[styles.iconCircle, { backgroundColor: f.bg }]}>
                  <IconComp size={20} color={f.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>{f.title}</Text>
                  <Text style={styles.featureDesc}>{f.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* PAGINATION DOTS */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* GET STARTED BUTTON */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient
            colors={['#7c3aed', '#6d28d9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Get Started</Text>
            <ChevronRight size={18} color="#ffffff" style={{ marginLeft: 6 }} />
          </LinearGradient>
        </TouchableOpacity>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between', paddingVertical: 30 },
  logoContainer: { alignItems: 'center', marginTop: 10 },
  logoText: { fontSize: 18, fontWeight: '950', color: '#ffffff', marginTop: 8 },
  logoSubtext: { fontSize: 10, color: '#94a3b8', fontWeight: '800', marginTop: 2 },
  heroTitle: { fontSize: 22, fontWeight: '950', color: '#ffffff', textAlign: 'center', lineHeight: 28 },
  heroDesc: { fontSize: 12, color: '#94a3b8', fontWeight: '750', textAlign: 'center', marginTop: 8, paddingHorizontal: 20, lineHeight: 16 },
  featuresGrid: {
    marginVertical: 14,
    gap: 12
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  featureTitle: { fontSize: 13, fontWeight: '900', color: '#ffffff' },
  featureDesc: { fontSize: 11, color: '#94a3b8', fontWeight: '650', marginTop: 2, lineHeight: 14 },
  dotsRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginVertical: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { backgroundColor: '#7c3aed', width: 20 },
  btn: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  btnText: { fontSize: 14, fontWeight: '900', color: '#ffffff' }
});
