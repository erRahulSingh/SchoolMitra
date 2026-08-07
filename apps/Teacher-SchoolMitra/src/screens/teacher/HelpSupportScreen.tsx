import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Headphones,
  HelpCircle,
  BookOpen,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  ClipboardList
} from 'lucide-react-native';

export default function HelpSupportScreen({ navigation }: any) {
  const categories = [
    { label: 'FAQs', icon: HelpCircle, color: '#2563eb', bg: '#eff6ff' },
    { label: 'User Guide', icon: BookOpen, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Contact Support', icon: MessageSquare, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Report an Issue', icon: AlertTriangle, color: '#dc2626', bg: '#fef2f2' }
  ];

  const queries = [
    { id: '1', title: 'How to take attendance in live class?', date: '2 May 2024', status: 'Resolved', color: '#16a34a', bg: '#ecfdf5' },
    { id: '2', title: 'Unable to upload study material', date: '28 Apr 2024', status: 'In Progress', color: '#ea580c', bg: '#fffbeb' },
    { id: '3', title: 'How to generate report card?', date: '18 Apr 2024', status: 'Resolved', color: '#16a34a', bg: '#ecfdf5' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HELP HERO GRADIENT */}
        <View style={styles.heroCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>How can we help you?</Text>
            <Text style={styles.heroSub}>We are here to support you</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Headphones size={30} color="#7c3aed" />
          </View>
        </View>

        {/* QUICK HELP GRID */}
        <Text style={styles.sectionTitle}>Quick Help</Text>
        <View style={styles.grid}>
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={styles.gridItem}
                onPress={() => Alert.alert(cat.label, `Navigate to ${cat.label} documentation...`)}
              >
                <View style={[styles.iconBox, { backgroundColor: cat.bg }]}>
                  <IconComp size={22} color={cat.color} />
                </View>
                <Text style={styles.gridLabel}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* RECENT QUERIES */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Queries</Text>
          <TouchableOpacity onPress={() => Alert.alert('View All', 'Showing all raised support queries...')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* QUERY LIST */}
        <View style={styles.listContainer}>
          {queries.map((q) => (
            <View key={q.id} style={styles.queryRowCard}>
              <View style={styles.queryIconBox}>
                <ClipboardList size={18} color="#2563eb" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.queryTitle}>{q.title}</Text>
                <Text style={styles.queryDate}>{q.date}</Text>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: q.bg }]}>
                <Text style={[styles.statusText, { color: q.color }]}>{q.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.raiseBtn}
          onPress={() => Alert.alert('New Query', 'Submit a support query form...')}
        >
          <MessageSquare size={16} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.raiseText}>Raise a New Query</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: 64
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  backBtn: {
    position: 'absolute',
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12, marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  gridItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  gridLabel: { fontSize: 12, fontWeight: '800', color: '#475569' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  viewAllText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  listContainer: { gap: 10, marginBottom: 80 },
  queryRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  queryIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  queryTitle: { fontSize: 13, fontWeight: '800', color: '#334155' },
  queryDate: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 3 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8
  },
  statusText: { fontSize: 11, fontWeight: '900' },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  raiseBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  raiseText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
