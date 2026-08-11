import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Download, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FeeReceiptScreen({ navigation }: any) {
  const receiptDetails = [
    { label: 'Student Name', value: 'Rohan Sharma' },
    { label: 'Class', value: '5th – A' },
    { label: 'Academic Year', value: '2024-25' },
    { label: 'Fee Type', value: 'Tuition Fee (May 2025)' },
    { label: 'Amount', value: '₹ 8,000', isBold: true },
    { label: 'Payment Mode', value: 'UPI' },
    { label: 'Transaction ID', value: 'UPI1234567890' },
    { label: 'Status', value: 'Paid', isBadge: true },
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
        <TouchableOpacity style={styles.downloadBtn}>
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
            <Text style={styles.receiptNoText}>Receipt No. #RCP12580</Text>
            <Text style={styles.dateText}>15 May 2025, 10:30 AM</Text>
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
        <TouchableOpacity style={styles.downloadReceiptBtn} activeOpacity={0.85}>
          <Text style={styles.downloadBtnText}>Download Receipt</Text>
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
