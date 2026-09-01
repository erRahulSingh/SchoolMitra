import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  ActivityIndicator
} from 'react-native';
import {
  ChevronLeft,
  Wallet,
  FileText,
  History,
  FileSpreadsheet,
  Building,
  Award
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { teacherApi } from '../services/apiService';

export default function PayrollScreen({ navigation }: any) {
  const [salary, setSalary] = useState<any>({
    month: 'May 2024',
    amount: '₹0',
    date: 'N/A'
  });
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch for HR Payroll (since backend mostly handles leaves right now)
    // We could fetch from /api/v1/leave/balance as a proxy if we wanted real data
    setTimeout(() => {
      setSalary({
        month: 'May 2024',
        amount: '₹48,000',
        date: '05 May 2024'
      });
      setRecentPayments([
        { id: '1', month: 'May 2024', date: '05 May 2024', amt: '₹48,000', status: 'Credited', color: '#16a34a', bg: '#ecfdf5' },
        { id: '2', month: 'April 2024', date: '05 Apr 2024', amt: '₹48,000', status: 'Credited', color: '#16a34a', bg: '#ecfdf5' },
        { id: '3', month: 'March 2024', date: '05 Mar 2024', amt: '₹47,000', status: 'Credited', color: '#16a34a', bg: '#ecfdf5' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const actions = [
    { label: 'Salary Slips', icon: FileText, color: '#7c3aed', bg: '#f3e8ff' },
    { label: 'Payment History', icon: History, color: '#ea580c', bg: '#ffedd5' },
    { label: 'Tax Documents', icon: FileSpreadsheet, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Bank Details', icon: Building, color: '#16a34a', bg: '#ecfdf5' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Salary & Payroll</Text>
        <TouchableOpacity style={styles.walletBtn}>
          <Wallet size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO CARD */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Manage your salary</Text>
            <Text style={styles.heroTitle}>and payment details</Text>
            <Text style={styles.heroTitleSub}>effortlessly.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Wallet size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* THIS MONTH SALARY CARD */}
        <View style={styles.salaryCard}>
          <View style={styles.salaryHeaderRow}>
            <Text style={styles.salaryLabel}>This Month Salary</Text>
            <Text style={styles.salaryMonth}>{salary.month}</Text>
          </View>

          <View style={styles.amountRow}>
            <Text style={styles.salaryAmount}>{salary.amount}</Text>
            <View style={styles.creditedBadge}>
              <Text style={styles.creditedBadgeText}>Credited</Text>
            </View>
          </View>

          <Text style={styles.creditedSubtext}>Credited on {salary.date}</Text>
        </View>

        {/* ACTIONS GRID (2x2) */}
        <View style={styles.grid}>
          {actions.map((act, idx) => {
            const IconComp = act.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={styles.gridItem}
                onPress={() => Alert.alert(act.label, `Open ${act.label} archive...`)}
              >
                <View style={[styles.iconBox, { backgroundColor: act.bg }]}>
                  <IconComp size={22} color={act.color} />
                </View>
                <Text style={styles.gridLabel}>{act.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* RECENT PAYMENTS */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Payments</Text>
          <TouchableOpacity onPress={() => Alert.alert('View All', 'Showing all payslips logs...')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* LIST CARDS */}
        <View style={styles.listContainer}>
          {loading ? (
             <ActivityIndicator size="small" color="#7c3aed" style={{ marginTop: 20 }} />
          ) : (
            recentPayments.map((p) => (
              <View key={p.id} style={styles.paymentCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.paymentMonth}>{p.month}</Text>
                  <Text style={styles.paymentDate}>{p.date}</Text>
                </View>

                <View style={{ alignItems: 'flex-end', gap: 6 }}>
                  <Text style={styles.paymentAmt}>{p.amt}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: p.bg }]}>
                    <Text style={[styles.statusText, { color: p.color }]}>{p.status}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: Platform.OS === 'android' ? 64 + (StatusBar.currentHeight || 0) : 64
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
  walletBtn: {
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
  heroCard: {
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroTitleSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  salaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  salaryHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  salaryLabel: { fontSize: 13, color: '#94a3b8', fontWeight: '800' },
  salaryMonth: { fontSize: 12, color: '#94a3b8', fontWeight: '800' },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
  salaryAmount: { fontSize: 32, fontWeight: '950', color: '#0f172a' },
  creditedBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  },
  creditedBadgeText: { fontSize: 11, fontWeight: '900', color: '#16a34a' },
  creditedSubtext: { fontSize: 11, color: '#94a3b8', fontWeight: '700', marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  gridItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
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
  gridLabel: { fontSize: 13, fontWeight: '800', color: '#475569' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  viewAllText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  listContainer: { gap: 10, marginBottom: 20 },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  paymentMonth: { fontSize: 14, fontWeight: '850', color: '#334155' },
  paymentDate: { fontSize: 11, color: '#94a3b8', fontWeight: '700', marginTop: 4 },
  paymentAmt: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: { fontSize: 10, fontWeight: '900' }
});
