import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Megaphone, Calendar, ChevronRight } from 'lucide-react-native';

export default function NoticeBoardScreen({ navigation }: any) {
  const notices = [
    { id: 1, title: 'Holiday Notice - Independence Day', date: '15 Aug 2025', category: 'Holiday', color: '#ef4444', desc: 'School will remain closed on 15th August for Independence Day celebrations.' },
    { id: 2, title: 'Annual Sports Day', date: '25 Aug 2025', category: 'Event', color: '#2563eb', desc: 'Annual Sports Day competition. Students required to wear sports uniform.' },
    { id: 3, title: 'Parent Teacher Meeting (PTM)', date: '20 Aug 2025', category: 'PTM', color: '#9333ea', desc: 'Parents are requested to attend PTM on 20th August at 10:00 AM.' },
    { id: 4, title: 'Fee Payment Deadline', date: '15 Aug 2025', category: 'Fee', color: '#d97706', desc: 'Last date for Q2 fee payment is 15th August. Late fee applicable.' },
    { id: 5, title: 'Summer Vacation Homework', date: '01 Jun 2025', category: 'Academic', color: '#16a34a', desc: 'Summer vacation homework has been uploaded. Check assignments section.' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Notice Board</Text>
        <Megaphone size={20} color="#4f46e5" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notices.map((n) => (
          <TouchableOpacity key={n.id} style={styles.card} activeOpacity={0.7}>
            <View style={styles.cardTop}>
              <View style={[styles.categoryBadge, { backgroundColor: n.color + '15' }]}>
                <Text style={[styles.categoryText, { color: n.color }]}>{n.category}</Text>
              </View>
              <View style={styles.dateRow}><Calendar size={12} color="#94a3b8" /><Text style={styles.dateText}>{n.date}</Text></View>
            </View>
            <Text style={styles.noticeTitle}>{n.title}</Text>
            <Text style={styles.noticeDesc}>{n.desc}</Text>
          </TouchableOpacity>
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
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  categoryBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  categoryText: { fontSize: 11, fontWeight: '800' },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dateText: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
  noticeTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  noticeDesc: { fontSize: 12, color: '#64748b', marginTop: 6, lineHeight: 18 }
});
