import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Heart, Stethoscope, Droplets, Eye, AlertTriangle } from 'lucide-react-native';

export default function MedicalRecordsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Records</Text>
        <Heart size={20} color="#ef4444" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Summary</Text>
          {[
            { label: 'Blood Group', value: 'O+', icon: Droplets, color: '#ef4444' },
            { label: 'Height', value: '142 cm', icon: Stethoscope, color: '#2563eb' },
            { label: 'Weight', value: '35 kg', icon: Stethoscope, color: '#16a34a' },
            { label: 'Eyesight', value: '6/6 Normal', icon: Eye, color: '#9333ea' },
            { label: 'Known Allergies', value: 'None', icon: AlertTriangle, color: '#d97706' }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={styles.row}>
                <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}><IconComp size={16} color={item.color} /></View>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vaccination Records</Text>
          {['Hepatitis B — Completed', 'MMR — Completed', 'DPT Booster — Completed', 'Polio — Completed'].map((v, i) => (
            <View key={i} style={styles.vaccRow}>
              <View style={styles.checkDot} />
              <Text style={styles.vaccText}>{v}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconBox: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  label: { flex: 1, fontSize: 13, color: '#64748b', fontWeight: '700' },
  value: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  vaccRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  checkDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#16a34a' },
  vaccText: { fontSize: 13, color: '#334155', fontWeight: '700' }
});
