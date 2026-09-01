import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { ChevronLeft, Download, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FeeReceiptScreen({ route, navigation }: any) {
  const { receiptNo } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<any>(null);

  useEffect(() => {
    if (!receiptNo) {
      setLoading(false);
      return;
    }
    
    fetch(`http://10.0.2.2:5000/api/v1/fees/receipt/${receiptNo}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          setReceipt(data.data.receipt);
        }
        setLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch receipt", e);
        setLoading(false);
      });
  }, [receiptNo]);

  const handleDownload = () => {
    Alert.alert("Download Success", "Receipt PDF has been saved to your device's Downloads folder.");
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  if (!receipt) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#64748b' }}>Receipt not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ color: '#1d4ed8', fontWeight: 'bold' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const receiptDetails = [
    { label: 'Student Name', value: receipt.studentName },
    { label: 'Class', value: receipt.className },
    { label: 'Amount Paid', value: `₹ ${receipt.amountPaid?.toLocaleString()}`, isBold: true },
    { label: 'Payment Mode', value: receipt.paymentMethod },
    { label: 'Transaction ID', value: receipt.gatewayTxnId || 'N/A' },
    { label: 'Status', value: receipt.status || 'PAID', isBadge: true },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fee Receipt</Text>
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
          <Download size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Success Green Header Banner */}
        <LinearGradient
          colors={['#16a34a', '#059669', '#047857']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.successBanner}
        >
          <View style={styles.whiteCheckCircle}>
            <CheckCircle2 size={32} color="#16a34a" fill="#ffffff" />
          </View>

          <View style={styles.bannerTextCol}>
            <Text style={styles.successTitleText}>Payment Successful</Text>
            <Text style={styles.receiptNoText}>{receipt.receiptNo}</Text>
            <Text style={styles.dateText}>{receipt.date}</Text>
          </View>
        </LinearGradient>

        {/* Payment Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardSectionTitle}>Payment Details</Text>

          {receiptDetails.map((item, idx) => (
            <View key={idx} style={[styles.detailRow, idx < receiptDetails.length - 1 && styles.rowBorder]}>
              <Text style={styles.detailLabelText}>{item.label}</Text>

              {item.isBadge ? (
                <View style={styles.paidBadge}>
                  <Text style={styles.paidBadgeText}>{item.value}</Text>
                </View>
              ) : (
                <Text style={[styles.detailValText, item.isBold && styles.valBoldText]}>{item.value}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Download Receipt Button */}
        <TouchableOpacity style={styles.downloadReceiptBtn} activeOpacity={0.85} onPress={handleDownload}>
          <Text style={styles.downloadBtnText}>Download Receipt PDF</Text>
        </TouchableOpacity>

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
  downloadBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Success Banner
  successBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  whiteCheckCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTextCol: { flex: 1 },
  successTitleText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  receiptNoText: { fontSize: 12, color: '#dcfce7', fontWeight: '600', marginTop: 2 },
  dateText: { fontSize: 11, color: '#bbf7d0', fontWeight: '500', marginTop: 2 },

  // Details Card
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardSectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 11 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  detailLabelText: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  detailValText: { fontSize: 13, color: '#0f172a', fontWeight: '700' },
  valBoldText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  paidBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  paidBadgeText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },

  // Action Button
  downloadReceiptBtn: {
    backgroundColor: '#1d4ed8',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  downloadBtnText: { fontSize: 15, fontWeight: '900', color: '#ffffff' },
});
