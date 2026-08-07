import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Trophy, Calendar, MapPin } from 'lucide-react-native';

export default function EventsScreen({ navigation }: any) {
  const events = [
    { id: 1, title: 'Annual Sports Day', date: '25 Aug 2025', venue: 'School Ground', category: 'Sports', color: '#2563eb' },
    { id: 2, title: 'Science Exhibition', date: '10 Sep 2025', venue: 'School Hall', category: 'Academic', color: '#16a34a' },
    { id: 3, title: 'Annual Day Celebrations', date: '15 Dec 2025', venue: 'Auditorium', category: 'Cultural', color: '#9333ea' },
    { id: 4, title: 'Inter-School Quiz Competition', date: '20 Sep 2025', venue: 'Conference Hall', category: 'Academic', color: '#d97706' }
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity><Text style={styles.headerTitle}>Events</Text><Trophy size={20} color="#4f46e5" /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {events.map((e) => (
          <View key={e.id} style={styles.card}>
            <View style={[styles.badge, { backgroundColor: e.color + '15' }]}><Text style={[styles.badgeText, { color: e.color }]}>{e.category}</Text></View>
            <Text style={styles.title}>{e.title}</Text>
            <View style={styles.metaRow}><Calendar size={12} color="#94a3b8" /><Text style={styles.meta}>{e.date}</Text><MapPin size={12} color="#94a3b8" /><Text style={styles.meta}>{e.venue}</Text></View>
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
  card: { backgroundColor: '#ffffff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
  badgeText: { fontSize: 11, fontWeight: '800' },
  title: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  meta: { fontSize: 12, color: '#64748b', fontWeight: '600', marginRight: 8 }
});
