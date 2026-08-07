import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar } from 'lucide-react-native';

export default function HolidaysScreen({ navigation }: any) {
  const holidays = [
    { date: '15 Aug', day: 'Friday', name: 'Independence Day', type: 'National' },
    { date: '02 Oct', day: 'Thursday', name: 'Gandhi Jayanti', type: 'National' },
    { date: '24 Oct', day: 'Friday', name: 'Dussehra', type: 'Festival' },
    { date: '12 Nov', day: 'Wednesday', name: 'Diwali', type: 'Festival' },
    { date: '25 Dec', day: 'Thursday', name: 'Christmas', type: 'Festival' },
    { date: '26 Jan', day: 'Monday', name: 'Republic Day', type: 'National' },
    { date: '14 Mar', day: 'Friday', name: 'Holi', type: 'Festival' }
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity><Text style={styles.headerTitle}>Holidays</Text><Calendar size={20} color="#4f46e5" /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {holidays.map((h, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.dateBox}><Text style={styles.dateText}>{h.date}</Text><Text style={styles.dayText}>{h.day}</Text></View>
            <View style={{ flex: 1 }}><Text style={styles.name}>{h.name}</Text><View style={[styles.typeBadge, { backgroundColor: h.type === 'National' ? '#eef2ff' : '#fef3c7' }]}><Text style={[styles.typeText, { color: h.type === 'National' ? '#4f46e5' : '#d97706' }]}>{h.type}</Text></View></View>
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
  scrollContent: { padding: 16, gap: 10 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#ffffff', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  dateBox: { width: 56, alignItems: 'center', backgroundColor: '#eef2ff', borderRadius: 12, padding: 8 },
  dateText: { fontSize: 14, fontWeight: '900', color: '#4f46e5' },
  dayText: { fontSize: 10, color: '#64748b', fontWeight: '600', marginTop: 2 },
  name: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start', marginTop: 4 },
  typeText: { fontSize: 10, fontWeight: '800' }
});
