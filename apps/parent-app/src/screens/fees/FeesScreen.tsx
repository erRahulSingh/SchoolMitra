import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { ChevronLeft, FileText, CheckCircle2, Info, Bus, Wallet } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FeesScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [ledger, setLedger] = useState<any>(null);

  useEffect(() => {
    // Dynamic fetch from backend fees ledger
    const studentId = "647b0a7d903e1c001f3eabcd"; // Example ID
    fetch(`http://10.0.2.2:5000/api/v1/fees/ledger/${studentId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.data) {
          const apiData = data.data;
          
          // Construct feeComponents by flattening the unpaid/partial invoices components
          let components: any[] = [];
          if (apiData.allInvoices && apiData.allInvoices.length > 0) {
            components = apiData.allInvoices[0].components || [];
          }

          setLedger({
            due: apiData.totalDues,
            status: apiData.totalDues > 0 ? "PAYMENT REQUIRED" : "ALL DUES CLEARED",
            feeComponents: components,
            recentPayments: apiData.recentPayments
          });
        }
        setLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch fees ledger", e);
        setLoading(false);
      });
  }, []);

  const getIconForComponent = (name: string) => {
    const lName = name.toLowerCase();
    if (lName.includes('transport')) return Bus;
    if (lName.includes('tuition') || lName.includes('annual')) return FileText;
    return Wallet;
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1d4ed8" />
      </View>
    );
  }

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
              <Text style={styles.dueAmount}>₹{ledger?.due?.toLocaleString() || 0}</Text>
              <Info size={16} color="rgba(255,255,255,0.7)" />
            </View>
            <Text style={styles.dueDateText}>Status: {ledger?.status || 'UNKNOWN'}</Text>
          </View>

          {ledger?.due > 0 && (
            <TouchableOpacity style={styles.payNowBtn} activeOpacity={0.85}>
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>

        {/* Fee Summary Section */}
        <Text style={styles.sectionTitle}>Fee Breakdown (Annual)</Text>
        <View style={styles.summaryCard}>
          {ledger?.feeComponents?.map((item: any, idx: number) => {
            const IconComp = getIconForComponent(item.name);
            return (
              <View key={idx} style={[styles.summaryRow, idx < ledger.feeComponents.length - 1 && styles.rowBorder]}>
                <View style={styles.iconCircle}>
                  <IconComp size={16} color="#2563eb" />
                </View>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemAmount}>₹{item.amount.toLocaleString()}</Text>
                <View style={[styles.statusBadge, { backgroundColor: '#dcfce7' }]}>
                  <Text style={[styles.statusText, { color: '#16a34a' }]}>Billed</Text>
                </View>
              </View>
            );
          })}
          {(!ledger?.feeComponents || ledger.feeComponents.length === 0) && (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#64748b' }}>No fee structures assigned yet.</Text>
            </View>
          )}
        </View>

        {/* Payment History Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleNoMargin}>Recent Payments</Text>
        </View>

        <View style={styles.historyCard}>
          {ledger?.recentPayments?.map((item: any, idx: number) => (
            <TouchableOpacity 
              key={idx} 
              style={[styles.historyRow, idx < ledger.recentPayments.length - 1 && styles.rowBorder]}
              onPress={() => navigation.navigate('FeeReceipt', { receiptNo: item.receiptNo })}
              activeOpacity={0.6}
            >
              <View style={styles.checkIcon}>
                <CheckCircle2 size={20} color="#16a34a" fill="#dcfce7" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyDate}>
                  {item.date ? new Date(item.date).toLocaleDateString() : 'Paid recently'} • {item.method}
                </Text>
              </View>
              <Text style={styles.historyAmount}>₹{item.amount?.toLocaleString()}</Text>
            </TouchableOpacity>
          ))}
          {(!ledger?.recentPayments || ledger.recentPayments.length === 0) && (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#64748b' }}>No previous payments found.</Text>
            </View>
          )}
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
