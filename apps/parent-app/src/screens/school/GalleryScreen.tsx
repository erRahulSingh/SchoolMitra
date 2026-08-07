import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Image } from 'lucide-react-native';

export default function GalleryScreen({ navigation }: any) {
  const albums = [
    { title: 'Annual Sports Day 2025', count: 24, color: '#4f46e5' },
    { title: 'Science Exhibition', count: 18, color: '#16a34a' },
    { title: 'Independence Day', count: 12, color: '#ef4444' },
    { title: 'Annual Day Celebrations', count: 30, color: '#9333ea' },
    { title: 'Classroom Activities', count: 15, color: '#d97706' },
    { title: 'School Infrastructure', count: 8, color: '#0284c7' }
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity><Text style={styles.headerTitle}>Gallery</Text><Image size={20} color="#4f46e5" /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {albums.map((a, idx) => (
            <TouchableOpacity key={idx} style={styles.albumCard} activeOpacity={0.7}>
              <View style={[styles.albumThumb, { backgroundColor: a.color + '15' }]}><Image size={28} color={a.color} /></View>
              <Text style={styles.albumTitle} numberOfLines={1}>{a.title}</Text>
              <Text style={styles.albumCount}>{a.count} Photos</Text>
            </TouchableOpacity>
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
  scrollContent: { padding: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  albumCard: { width: '47%', backgroundColor: '#ffffff', borderRadius: 18, padding: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  albumThumb: { height: 100, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  albumTitle: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  albumCount: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 2 }
});
