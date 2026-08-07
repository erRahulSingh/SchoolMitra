import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Building, Phone, Mail, MapPin, Globe, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutSchoolScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1e3a8a', '#2563eb']} style={styles.hero}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#ffffff" /></TouchableOpacity>
        <View style={styles.heroBody}>
          <View style={styles.logoCircle}><Building size={32} color="#1e3a8a" /></View>
          <Text style={styles.schoolName}>Green Valley Public School</Text>
          <Text style={styles.motto}>Empowering Minds, Shaping Futures</Text>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.desc}>Green Valley Public School is a CBSE-affiliated institution dedicated to providing quality education since 1995. We focus on holistic development of students through academics, sports, and cultural activities.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          {[{ label: 'Phone', value: '+91 522 234 5678', icon: Phone, color: '#16a34a' }, { label: 'Email', value: 'info@greenvalley.edu.in', icon: Mail, color: '#2563eb' }, { label: 'Address', value: '45, Green Park Colony, Lucknow - 226001', icon: MapPin, color: '#d97706' }, { label: 'Website', value: 'www.greenvalley.edu.in', icon: Globe, color: '#9333ea' }].map((i, idx) => { const IC = i.icon; return (<View key={idx} style={styles.infoRow}><View style={[styles.infoIcon, { backgroundColor: i.color + '15' }]}><IC size={16} color={i.color} /></View><View><Text style={styles.infoLabel}>{i.label}</Text><Text style={styles.infoVal}>{i.value}</Text></View></View>); })}
        </View>
        <View style={styles.statsRow}>
          {[{ val: '1200+', label: 'Students' }, { val: '85+', label: 'Teachers' }, { val: '30+', label: 'Years' }, { val: 'A+', label: 'CBSE Grade' }].map((s, i) => (<View key={i} style={styles.statCard}><Text style={styles.statVal}>{s.val}</Text><Text style={styles.statLabel}>{s.label}</Text></View>))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  hero: { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 30, paddingHorizontal: 16, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroBody: { alignItems: 'center' },
  logoCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  schoolName: { fontSize: 22, fontWeight: '900', color: '#ffffff' },
  motto: { fontSize: 13, color: '#bfdbfe', fontWeight: '600', marginTop: 4 },
  scrollContent: { padding: 16, gap: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0' },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  desc: { fontSize: 13, color: '#64748b', lineHeight: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  infoIcon: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  infoLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '700' },
  infoVal: { fontSize: 13, fontWeight: '800', color: '#0f172a', marginTop: 1 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  statVal: { fontSize: 18, fontWeight: '900', color: '#1e3a8a' },
  statLabel: { fontSize: 10, color: '#64748b', fontWeight: '700', marginTop: 4 }
});
