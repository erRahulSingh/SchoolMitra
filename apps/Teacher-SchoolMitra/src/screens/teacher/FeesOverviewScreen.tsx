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
  SlidersHorizontal,
  User,
  CreditCard,
  TrendingUp
} from 'lucide-react-native';

export default function FeesOverviewScreen({ navigation }: any) {
  const transactions = [
    { id: '1', name: 'Rohan Singh', class: 'Class 8 - A', date: '18 May 2024', amt: '₹12,500', status: 'Paid', color: '#16a34a', bg: '#ecfdf5' },
    { id: '2', name: 'Diya Verma', class: 'Class 9 - B', date: '17 May 2024', amt: '₹12,500', status: 'Pending', color: '#ea580c', bg: '#fffbeb' },
    { id: '3', name: 'Aarav Sharma', class: 'Class 8 - A', date: '15 May 2024', amt: '₹12,500', status: 'Paid', color: '#16a34a', bg: '#ecfdf5' },
    { id: '4', name: 'Ananya Gupta', class: 'Class 10 - A', date: '14 May 2024', amt: '₹12,500', status: 'Overdue', color: '#dc2626', bg: '#fef2f2' }
  ];

  const handleGenerateReport = () => {
    Alert.alert('Success ✅', 'Fees collection report generated & saved to downloads!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fees Overview</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <SlidersHorizontal size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* TOTAL COLLECTION CARD */}
        <View style={styles.collectionHeroCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroLabel}>Total Fees Collection</Text>
            <Text style={styles.heroAmount}>₹2,45,500</Text>
            <Text style={styles.heroSub}>This Academic Year</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <CreditCard size={28} color="#7c3aed" />
          </View>
        </View>

        {/* 3 STATS CARDS */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#ecfdf5' }]}>
            <Text style={styles.statLabel}>Collected</Text>
            <Text style={[styles.statVal, { color: '#16a34a' }]}>₹1,85,500</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fffbeb' }]}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={[styles.statVal, { color: '#ea580c' }]}>₹50,000</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fef2f2' }]}>
            <Text style={styles.statLabel}>Overdue</Text>
            <Text style={[styles.statVal, { color: '#dc2626' }]}>₹10,000</Text>
          </View>
        </View>

        {/* RECENT TRANSACTIONS */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => Alert.alert('View All', 'Showing all transactions...')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* TRANSACTION LIST */}
        <View style={styles.listContainer}>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.txCard}>
              <View style={styles.avatarCircle}>
                <User size={18} color="#7c3aed" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.txStudentName}>{tx.name}</Text>
                <Text style={styles.txClassText}>{tx.class}</Text>
                <Text style={styles.txDateText}>{tx.date}</Text>
              </View>

              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                <Text style={styles.txAmountText}>{tx.amt}</Text>
                <View style={[styles.statusBadge, { backgroundColor: tx.bg }]}>
                  <Text style={[styles.statusText, { color: tx.color }]}>{tx.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.generateBtn} onPress={handleGenerateReport}>
          <TrendingUp size={16} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.generateText}>Generate Fees Report</Text>
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
  filterBtn: {
    position: 'absolute',
    right: 20,
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
  collectionHeroCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  heroLabel: { fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', fontWeight: '700' },
  heroAmount: { fontSize: 32, fontWeight: '950', color: '#ffffff', marginTop: 4 },
  heroSub: { fontSize: 12, color: 'rgba(255, 255, 255, 0.75)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  statBox: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  statLabel: { fontSize: 11, color: '#64748b', fontWeight: '800' },
  statVal: { fontSize: 14, fontWeight: '900', marginTop: 4 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  viewAllText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  listContainer: { gap: 12, marginBottom: 80 },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txStudentName: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  txClassText: { fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: '600' },
  txDateText: { fontSize: 11, color: '#94a3b8', marginTop: 4, fontWeight: '600' },
  txAmountText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: { fontSize: 10, fontWeight: '900' },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  generateBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  generateText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
