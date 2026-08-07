import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, HelpCircle } from 'lucide-react-native';

export default function HelpScreen({ navigation }: any) {
  const faqs = [
    { q: 'How do I check my child\'s attendance?', a: 'Tap on "Attendance" from the home screen or Academics tab to see daily attendance analytics.' },
    { q: 'How to pay school fees online?', a: 'Go to Fee Payments, tap "Pay Now", and choose your preferred payment mode (UPI, Card, Net Banking).' },
    { q: 'How does live bus tracking work?', a: 'Go to Live Bus tab to view real-time location, speed, and estimated arrival time of your child\'s school bus.' },
    { q: 'Whom should I contact for app issues?', a: 'You can raise a support ticket under Support section or call the school admin helpline.' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & FAQ</Text>
        <HelpCircle size={20} color="#d97706" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {faqs.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.q}>{item.q}</Text>
            <Text style={styles.a}>{item.a}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 12 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0' },
  q: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 6 },
  a: { fontSize: 13, color: '#64748b', lineHeight: 20 }
});
