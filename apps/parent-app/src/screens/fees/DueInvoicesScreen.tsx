import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { ChevronLeft, MoreVertical, AlertTriangle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DueInvoicesScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [totalDue, setTotalDue] = useState(0);

  useEffect(() => {
    const studentId = "647b0a7d903e1c001f3eabcd"; // Example ID
    fetch(`http://10.0.2.2:5000/api/v1/fees/ledger/${studentId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.data) {
          setInvoices(data.data.dueInvoices || []);
          setTotalDue(data.data.totalDues || 0);
        }
        setLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch due invoices", e);
        setLoading(false);
      });
  }, []);

  const handlePayNow = () => {
    Alert.alert('Redirecting to Payment Gateway 💳', 'Opening secure payment gateway...');
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#dc2626" />
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
        <Text style={styles.headerTitle}>Due Invoices</Text>
        <TouchableOpacity style={styles.moreBtn}>
          <MoreVertical size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Red Total Due Banner Card */}
        <LinearGradient
          colors={['#ef4444', '#dc2626', '#b91c1c']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.redBanner}
        >
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerLabelText}>Total Due</Text>
            <Text style={styles.bannerAmountText}>₹ {totalDue.toLocaleString()}</Text>
            <Text style={styles.bannerSubText}>{invoices.length} Invoice{invoices.length !== 1 ? 's' : ''} Pending</Text>
          </View>

          <TouchableOpacity style={styles.bannerPayBtn} onPress={handlePayNow} activeOpacity={0.85}>
            <Text style={styles.bannerPayBtnText}>Pay Now</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Invoice Cards */}
        {invoices.map((inv: any, idx: number) => (
          <View key={idx} style={styles.invoiceCard}>
            <Text style={styles.invoiceNoText}>Invoice #{inv.invoiceNo}</Text>

            <View style={styles.dividerLine} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabelText}>Due Date</Text>
              <Text style={styles.detailValText}>{new Date(inv.dueDate).toLocaleDateString('en-IN')}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabelText}>Fee Type</Text>
              <Text style={styles.detailValText}>{inv.components?.[0]?.name || 'Term Fee'} ({inv.month || 'Current'})</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabelText}>Amount</Text>
              <Text style={styles.detailValText}>₹ {inv.totalAmount?.toLocaleString()}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabelText}>Late Fee</Text>
              <Text style={styles.detailValText}>₹ {inv.lateFee || 0}</Text>
            </View>

            <View style={[styles.detailRow, { marginTop: 4 }]}>
              <Text style={[styles.detailLabelText, { fontWeight: '900', color: '#0f172a' }]}>Balance Amount</Text>
              <Text style={[styles.detailValText, { fontSize: 16, fontWeight: '900', color: '#0f172a' }]}>₹ {inv.balanceAmount?.toLocaleString()}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.viewInvoiceBtn} activeOpacity={0.75}>
                <Text style={styles.viewInvoiceBtnText}>View Invoice</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cardPayBtn} onPress={handlePayNow} activeOpacity={0.85}>
                <Text style={styles.cardPayBtnText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {invoices.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: '#64748b', fontSize: 15 }}>No due invoices found.</Text>
          </View>
        )}

        {/* Warning Alert Box */}
        <View style={styles.warningAlertBox}>
          <AlertTriangle size={18} color="#d97706" />
          <Text style={styles.warningAlertText}>Pay before due date to avoid late fee.</Text>
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
  moreBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Red Banner
  redBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  bannerLeft: { flex: 1 },
  bannerLabelText: { fontSize: 12, color: '#fecaca', fontWeight: '700' },
  bannerAmountText: { fontSize: 26, fontWeight: '900', color: '#ffffff', marginTop: 2 },
  bannerSubText: { fontSize: 11, color: '#fee2e2', fontWeight: '500', marginTop: 4 },
  bannerPayBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
  },
  bannerPayBtnText: { fontSize: 13, fontWeight: '900', color: '#dc2626' },

  // Invoice Card
  invoiceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  invoiceNoText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  dividerLine: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 14 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  detailLabelText: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  detailValText: { fontSize: 13, color: '#0f172a', fontWeight: '700' },

  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  viewInvoiceBtn: {
    flex: 1,
    backgroundColor: '#eff6ff',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewInvoiceBtnText: { fontSize: 13, fontWeight: '800', color: '#2563eb' },
  cardPayBtn: {
    flex: 1,
    backgroundColor: '#1d4ed8',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPayBtnText: { fontSize: 13, fontWeight: '900', color: '#ffffff' },

  // Warning Alert Box
  warningAlertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff7ed',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ffedd5',
  },
  warningAlertText: { fontSize: 12, color: '#c2410c', fontWeight: '700' },
});
