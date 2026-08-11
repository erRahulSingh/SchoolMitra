import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, FileText, CheckCircle2, Clock, Info, Bus, Wallet, CreditCard } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FeesScreen({ navigation }: any) {
  const feeSummary = [
    { title: 'Annual Fee', amount: '₹12,000', status: 'Paid', color: '#16a34a', bg: '#dcfce7', icon: FileText },
    { title: 'Tuition Fee', amount: '₹8,000', status: 'Paid', color: '#16a34a', bg: '#dcfce7', icon: FileText },
    { title: 'Transport Fee', amount: '₹4,000', status: 'Paid', color: '#16a34a', bg: '#dcfce7', icon: Bus },
    { title: 'Miscellaneous', amount: '₹1,250', status: 'Pending', color: '#ea580c', bg: '#ffedd5', icon: Wallet },
  ];

  const paymentHistory = [
    { title: 'Tuition Fee', date: 'Paid on 15 Apr 2025', amount: '₹8,000' },
    { title: 'Transport Fee', date: 'Paid on 01 Apr 2025', amount: '₹4,000' },
    { title: 'Annual Fee', date: 'Paid on 01 Apr 2025', amount: '₹12,000' },
    { title: 'Miscellaneous', date: 'Paid on 10 Mar 2025', amount: '₹1,000' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fee Payments</Text>
        <TouchableOpacity style={styles.receiptBtn}>
          <FileText size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Total Due Banner (Vibrant Blue Card) */}
        <LinearGradient 
          colors={['#1d4ed8', '#1e40af', '#0f172a']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          style={styles.dueCard}
        >
          <View style={styles.dueLeft}>
            <Text style={styles.dueLabel}>Total Due</Text>
            <View style={styles.amountRow}>
              <Text style={styles.dueAmount}>₹1,250</Text>
              <Info size={16} color="rgba(255,255,255,0.7)" />
            </View>
            <Text style={styles.dueDateText}>Due Date: 15 May 2025</Text>
          </View>

          <TouchableOpacity style={styles.payNowBtn} activeOpacity={0.85}>
            <Text style={styles.payNowText}>Pay Now</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Fee Summary Section */}
        <Text style={styles.sectionTitle}>Fee Summary</Text>
        <View style={styles.summaryCard}>
          {feeSummary.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={[styles.summaryRow, idx < feeSummary.length - 1 && styles.rowBorder]}>
                <View style={styles.iconCircle}>
                  <IconComp size={16} color="#2563eb" />
                </View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemAmount}>{item.amount}</Text>
                <View style={[styles.statusBadge, { backgroundColor: item.bg }]}>
                  <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Payment History Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleNoMargin}>Payment History</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        </View>

        <View style={styles.historyCard}>
          {paymentHistory.map((item, idx) => (
            <View key={idx} style={[styles.historyRow, idx < paymentHistory.length - 1 && styles.rowBorder]}>
              <View style={styles.checkIcon}>
                <CheckCircle2 size={20} color="#16a34a" fill="#dcfce7" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <Text style={styles.historyAmount}>{item.amount}</Text>
            </View>
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
  receiptBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Total Due Banner
  dueCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  dueLeft: { flex: 1 },
  dueLabel: { fontSize: 12, color: '#93c5fd', fontWeight: '600' },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: 4 },
  dueAmount: { fontSize: 26, fontWeight: '900', color: '#ffffff' },
  dueDateText: { fontSize: 11, color: '#bfdbfe', fontWeight: '500' },
  payNowBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
  },
  payNowText: { color: '#1d4ed8', fontSize: 13, fontWeight: '900' },

  // Section Headers
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12 },
  sectionTitleNoMargin: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  viewAll: { fontSize: 12, color: '#2563eb', fontWeight: '700' },

  // Summary Card
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  summaryRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconCircle: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#eff6ff', justifyContent: 'center', alignItems: 'center' },
  itemTitle: { flex: 1, fontSize: 13, fontWeight: '800', color: '#0f172a' },
  itemAmount: { fontSize: 13, fontWeight: '900', color: '#0f172a', marginRight: 10 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: '800' },

  // History Card
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  historyRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  checkIcon: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center' },
  historyTitle: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  historyDate: { fontSize: 11, color: '#94a3b8', fontWeight: '500', marginTop: 2 },
  historyAmount: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
});
