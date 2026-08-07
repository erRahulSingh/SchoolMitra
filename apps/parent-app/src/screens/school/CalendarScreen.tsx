import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar } from 'lucide-react-native';

export default function CalendarScreen({ navigation }: any) {
  const events = [
    { date: '10 Aug 2025', title: 'Unit Test - 1 Begins', category: 'Academic' },
    { date: '15 Aug 2025', title: 'Independence Day Celebration', category: 'Holiday' },
    { date: '20 Aug 2025', title: 'Parent Teacher Meeting (PTM)', category: 'Meeting' },
    { date: '25 Aug 2025', title: 'Annual Sports Day', category: 'Sports' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Academic Calendar</Text>
        <Calendar size={20} color="#4f46e5" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {events.map((e, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.dateBox}>
              <Calendar size={18} color="#4f46e5" />
              <Text style={styles.dateText}>{e.date}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{e.title}</Text>
              <Text style={styles.cat}>{e.category}</Text>
            </View>
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
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#ffffff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  dateBox: { alignItems: 'center', gap: 4, width: 90, backgroundColor: '#eef2ff', padding: 8, borderRadius: 12 },
  dateText: { fontSize: 11, fontWeight: '800', color: '#4f46e5', textAlign: 'center' },
  title: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  cat: { fontSize: 12, color: '#64748b', fontWeight: '600', marginTop: 2 }
});
