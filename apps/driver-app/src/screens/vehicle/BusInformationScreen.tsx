import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Edit3, Bus, FileText, ChevronRight } from 'lucide-react-native';

export default function BusInformationScreen({ navigation }: any) {
  const details = [
    { label: 'Bus Type', val: 'School Bus (52 Seater)' },
    { label: 'Fuel Type', val: 'Diesel' },
    { label: 'Registration No.', val: 'UP32 AB 1234' },
    { label: 'Fitness Valid Upto', val: '15 Aug 2025' },
    { label: 'Insurance Valid Upto', val: '10 Dec 2025' },
    { label: 'Pollution Valid Upto', val: '05 Oct 2025' },
    { label: 'Owner', val: 'Green Valley School' },
    { label: 'Garage', val: 'Green Valley Transport' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bus Information</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Edit3 size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Bus Hero Graphic Card */}
        <View style={styles.busHeroCard}>
          <View style={styles.busCircle}>
            <Bus size={48} color="#f59e0b" fill="#fef08a" strokeWidth={1.8} />
          </View>

          <Text style={styles.plateText}>UP32 AB 1234</Text>
          <Text style={styles.busNameText}>Green Valley School Bus</Text>

          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>Active</Text>
          </View>
        </View>

        {/* Vehicle Details Table List */}
        <View style={styles.detailsCard}>
          {details.map((item, idx) => (
            <View key={idx} style={[styles.detailRow, idx < details.length - 1 && styles.rowBorder]}>
              <Text style={styles.labelText}>{item.label}</Text>
              <Text style={styles.valText}>{item.val}</Text>
            </View>
          ))}
        </View>

        {/* View Documents Button */}
        <TouchableOpacity
          style={styles.viewDocsBtn}
          onPress={() => navigation.navigate('DriverDocuments')}
          activeOpacity={0.8}
        >
          <FileText size={18} color="#2563eb" />
          <Text style={styles.viewDocsText}>View Documents</Text>
          <ChevronRight size={18} color="#94a3b8" />
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
  editBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Hero Card
  busHeroCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbeafe',
    marginBottom: 20,
  },
  busCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  plateText: { fontSize: 20, fontWeight: '900', color: '#0f172a' },
  busNameText: { fontSize: 13, color: '#64748b', fontWeight: '600', marginTop: 2 },
  activeBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, marginTop: 10 },
  activeText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },

  // Details Table
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  labelText: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  valText: { fontSize: 13, color: '#0f172a', fontWeight: '900' },

  // View Docs Btn
  viewDocsBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
  },
  viewDocsText: { flex: 1, fontSize: 14, fontWeight: '900', color: '#0f172a' },
});
