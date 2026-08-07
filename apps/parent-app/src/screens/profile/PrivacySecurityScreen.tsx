import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform, StatusBar } from 'react-native';
import { ChevronLeft, ShieldCheck, Lock } from 'lucide-react-native';

export default function PrivacySecurityScreen({ navigation }: any) {
  const [biometric, setBiometric] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <ShieldCheck size={20} color="#16a34a" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Biometric Lock (Fingerprint/FaceID)</Text>
              <Text style={styles.sub}>Require biometrics to open parent app</Text>
            </View>
            <Switch value={biometric} onValueChange={setBiometric} trackColor={{ false: '#cbd5e1', true: '#c7d2fe' }} thumbColor={biometric ? '#4f46e5' : '#f1f5f9'} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Protection Guarantee</Text>
          <Text style={styles.cardText}>SchoolMitra uses 256-bit SSL encryption to secure your child's educational records and personal information.</Text>
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
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  sub: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 2 },
  cardTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 8 },
  cardText: { fontSize: 13, color: '#64748b', lineHeight: 20 }
});
