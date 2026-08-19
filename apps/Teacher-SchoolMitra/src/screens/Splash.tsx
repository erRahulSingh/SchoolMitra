import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, Calendar, FileText, Award, FileBarChart2 } from 'lucide-react-native';
import Logo from '../components/Logo';

const { width } = Dimensions.get('window');

export default function Splash({ navigation }: any) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <LinearGradient colors={['#4f46e5', '#1e1b4b', '#0f172a']} style={styles.container}>
      <SafeAreaView style={styles.content}>
        
        {/* EMBLEM & SEAL */}
        <View style={styles.header}>
          <View style={styles.emblemBorder}>
            <View style={styles.iconCircle}>
              <Logo size={48} />
            </View>
            <Text style={styles.emblemTag}>TEACHER APP</Text>
          </View>

          <Text style={styles.title}>
            School<Text style={{ color: '#38bdf8' }}>Mitra</Text>
          </Text>
          <Text style={styles.subtitle}>Empowering Teachers, Enriching Students</Text>
        </View>

        {/* FEATURES GRID */}
        <View style={styles.grid}>
          {[
            { icon: Calendar, title: 'Attendance', subtitle: 'Instant Live Mark', color: '#38bdf8' },
            { icon: FileText, title: 'Homework', subtitle: 'Assign & Track', color: '#a855f7' },
            { icon: Award, title: 'Exams & Marks', subtitle: 'CBSE Scorecard', color: '#f43f5e' },
            { icon: FileBarChart2, title: 'Analytics', subtitle: 'Student 360°', color: '#10b981' }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={styles.card}>
                <View style={[styles.iconBox, { backgroundColor: `${item.color}25` }]}>
                  <IconComp size={20} color={item.color} />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.subtitle}</Text>
              </View>
            );
          })}
        </View>

        {/* PROGRESS & BUTTON */}
        <View style={styles.footer}>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>Initializing Mobile Session...</Text>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue to Sign In</Text>
            <ArrowRight size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 32 },
  header: { alignItems: 'center', marginTop: 16 },
  emblemBorder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#38bdf8',
    backgroundColor: 'rgba(30, 27, 75, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  emblemTag: { fontSize: 10, fontWeight: '800', color: '#38bdf8', letterSpacing: 1 },
  title: { fontSize: 32, fontWeight: '900', color: '#ffffff' },
  subtitle: { fontSize: 14, color: '#94a3b8', marginTop: 4, fontWeight: '500' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', marginVertical: 20 },
  card: {
    width: (width - 64) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)'
  },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#ffffff' },
  cardSub: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  footer: { width: '100%', gap: 12 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressText: { fontSize: 12, color: '#94a3b8', fontWeight: '600' },
  progressBarTrack: { width: '100%', height: 6, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.15)', overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#38bdf8' },
  button: {
    width: '100%',
    height: 54,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8
  },
  buttonText: { fontSize: 16, fontWeight: '800', color: '#ffffff' }
});
