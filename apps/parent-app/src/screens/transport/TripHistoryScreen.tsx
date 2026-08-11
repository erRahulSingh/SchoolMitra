import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, ChevronDown, Bus, ChevronRight } from 'lucide-react-native';

export default function TripHistoryScreen({ navigation }: any) {
  const [selectedMonth, setSelectedMonth] = useState('This Month');

  const tripsList = [
    { date: '15 May 2025', busNo: 'UP32 AB 1234', route: 'Green Valley Route', time: '07:05 AM – 07:50 AM', status: 'Completed', statusColor: '#16a34a' },
    { date: '14 May 2025', busNo: 'UP32 AB 1234', route: 'Green Valley Route', time: '07:05 AM – 07:50 AM', status: 'Completed', statusColor: '#16a34a' },
    { date: '13 May 2025', busNo: 'UP32 AB 1234', route: 'Green Valley Route', time: '07:05 AM – 07:50 AM', status: 'Completed', statusColor: '#16a34a' },
    { date: '12 May 2025', busNo: 'UP32 AB 1234', route: 'Green Valley Route', time: 'Reason: Maintenance', status: 'Cancelled', statusColor: '#ef4444' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip History</Text>
        <TouchableOpacity style={styles.calBtn}>
          <CalendarIcon size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Dropdown Selector Card */}
        <TouchableOpacity style={styles.dropdownCard} activeOpacity={0.8}>
          <Text style={styles.dropdownText}>{selectedMonth}</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* Trip Summary Stats Card (3 Columns) */}
        <View style={styles.summaryCard}>
          <View style={[styles.summaryCol, { backgroundColor: '#f3e8ff' }]}>
            <Text style={styles.summaryLabel}>Total Trips</Text>
            <Text style={[styles.summaryNum, { color: '#7c3aed' }]}>22</Text>
          </View>

          <View style={[styles.summaryCol, { backgroundColor: '#f0fdf4' }]}>
            <Text style={styles.summaryLabel}>Completed</Text>
            <Text style={[styles.summaryNum, { color: '#16a34a' }]}>20</Text>
          </View>

          <View style={[styles.summaryCol, { backgroundColor: '#fef2f2' }]}>
            <Text style={styles.summaryLabel}>Cancelled</Text>
            <Text style={[styles.summaryNum, { color: '#ef4444' }]}>2</Text>
          </View>
        </View>

        {/* Trips List Cards */}
        <View style={styles.tripsListContainer}>
          {tripsList.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.tripCard}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <View style={styles.tripMainRow}>
                <View style={styles.iconCircle}>
                  <Bus size={20} color="#7c3aed" />
                </View>

                <View style={styles.tripInfoCol}>
                  <View style={styles.dateStatusRow}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                  </View>

                  <Text style={styles.busNoText}>{item.busNo}</Text>
                  <Text style={styles.routeText}>{item.route}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>

                <ChevronRight size={18} color="#94a3b8" />
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
  calBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Dropdown Card
  dropdownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  dropdownText: { fontSize: 13, fontWeight: '800', color: '#334155' },

  // Summary Card
  summaryCard: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  summaryCol: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: { fontSize: 10, fontWeight: '700', color: '#64748b' },
  summaryNum: { fontSize: 20, fontWeight: '900', marginTop: 2 },

  // Trips List
  tripsListContainer: { gap: 12 },
  tripCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  tripMainRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconCircle: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#f3e8ff', alignItems: 'center', justifyContent: 'center' },
  tripInfoCol: { flex: 1 },
  dateStatusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  statusText: { fontSize: 11, fontWeight: '800' },
  busNoText: { fontSize: 12, fontWeight: '800', color: '#2563eb', marginTop: 2 },
  routeText: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 1 },
  timeText: { fontSize: 10, color: '#94a3b8', fontWeight: '500', marginTop: 4 },
});
