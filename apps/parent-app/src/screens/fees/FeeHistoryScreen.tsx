import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Filter, ChevronRight } from 'lucide-react-native';

export default function FeeHistoryScreen({ navigation }: any) {
  const transactions = [
    { date: '15 May 2025', title: 'Tuition Fee (May)', receipt: 'Receipt #RCP12580', amount: '₹8,000', status: 'Paid' },
    { date: '15 Apr 2025', title: 'Tuition Fee (Apr)', receipt: 'Receipt #RCP12410', amount: '₹8,000', status: 'Paid' },
    { date: '15 Mar 2025', title: 'Tuition Fee (Mar)', receipt: 'Receipt #RCP12250', amount: '₹8,000', status: 'Paid' },
    { date: '15 Feb 2025', title: 'Tuition Fee (Feb)', receipt: 'Receipt #RCP12030', amount: '₹8,000', status: 'Paid' },
    { date: '15 Jan 2025', title: 'Tuition Fee (Jan)', receipt: 'Receipt #RCP11890', amount: '₹8,000', status: 'Paid' },
    { date: '15 Dec 2024', title: 'Tuition Fee (Dec)', receipt: 'Receipt #RCP11720', amount: '₹8,000', status: 'Paid' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment History</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Stats Card (2 Columns) */}
        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <Text style={styles.statLabelText}>Total Paid</Text>
            <Text style={styles.statValText}>₹48,000</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statLabelText}>Total Transactions</Text>
            <Text style={styles.statValText}>6</Text>
          </View>
        </View>

        {/* Transactions List */}
        <View style={styles.historyListCard}>
          {transactions.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.historyRow, idx < transactions.length - 1 && styles.rowBorder]}
              onPress={() => navigation.navigate('FeeReceipt')}
              activeOpacity={0.75}
            >
              <View style={styles.infoCol}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.receiptText}>{item.receipt}</Text>
              </View>

              <Text style={styles.amountText}>{item.amount}</Text>

              <View style={styles.paidBadge}>
                <Text style={styles.paidBadgeText}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  filterBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Stats Card
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 12,
  },
  statCol: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statLabelText: { fontSize: 11, fontWeight: '700', color: '#64748b' },
  statValText: { fontSize: 20, fontWeight: '900', color: '#0f172a', marginTop: 4 },
  statDivider: { width: 1, height: 24, backgroundColor: '#cbd5e1' },

  // Transactions List Card
  historyListCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  infoCol: { flex: 1 },
  dateText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  titleText: { fontSize: 12, color: '#475569', fontWeight: '600', marginTop: 2 },
  receiptText: { fontSize: 10, color: '#94a3b8', fontWeight: '500', marginTop: 2 },
  amountText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  paidBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  paidBadgeText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },
});
