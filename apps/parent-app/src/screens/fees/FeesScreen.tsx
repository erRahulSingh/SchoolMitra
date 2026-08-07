import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, CreditCard, CheckCircle2, Clock, AlertCircle, Download } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FeesScreen({ navigation }: any) {
  const feeItems = [
    { id: 1, title: 'Tuition Fee - Q2', amount: '₹8,500', dueDate: '15 Aug 2025', status: 'Pending', color: '#ef4444' },
    { id: 2, title: 'Transport Fee - Q2', amount: '₹2,500', dueDate: '15 Aug 2025', status: 'Pending', color: '#d97706' },
    { id: 3, title: 'Tuition Fee - Q1', amount: '₹8,500', dueDate: '15 May 2025', status: 'Paid', color: '#16a34a' },
    { id: 4, title: 'Transport Fee - Q1', amount: '₹2,500', dueDate: '15 May 2025', status: 'Paid', color: '#16a34a' },
    { id: 5, title: 'Annual Fee', amount: '₹5,000', dueDate: '01 Apr 2025', status: 'Paid', color: '#16a34a' }
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#d97706', '#f59e0b']} style={styles.hero}>
        <View style={styles.headerRow}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#ffffff" /></TouchableOpacity><Text style={styles.headerTitle}>Fee Payments</Text><CreditCard size={20} color="#ffffff" /></View>
        <View style={styles.heroBody}>
          <View><Text style={styles.heroLabel}>Total Due</Text><Text style={styles.heroAmount}>₹11,000</Text></View>
          <TouchableOpacity style={styles.payBtn}><Text style={styles.payBtnText}>Pay Now</Text></TouchableOpacity>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {feeItems.map((f) => (
          <View key={f.id} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.feeTitle}>{f.title}</Text>
              <Text style={styles.feeAmount}>{f.amount}</Text>
              <Text style={styles.feeDue}>Due: {f.dueDate}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: f.color + '15' }]}>
              {f.status === 'Paid' ? <CheckCircle2 size={14} color={f.color} /> : <Clock size={14} color={f.color} />}
              <Text style={[styles.statusText, { color: f.color }]}>{f.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  hero: { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 24, paddingHorizontal: 16, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroLabel: { fontSize: 13, color: '#fef3c7', fontWeight: '700' },
  heroAmount: { fontSize: 28, fontWeight: '900', color: '#ffffff', marginTop: 4 },
  payBtn: { backgroundColor: '#ffffff', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14, elevation: 3 },
  payBtnText: { fontSize: 14, fontWeight: '900', color: '#d97706' },
  scrollContent: { padding: 16, gap: 10 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  feeTitle: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  feeAmount: { fontSize: 18, fontWeight: '900', color: '#1e3a8a', marginTop: 4 },
  feeDue: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  statusText: { fontSize: 12, fontWeight: '800' }
});
