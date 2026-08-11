import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, ChevronDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AttendanceAnalyticsScreen({ navigation }: any) {
  const [selectedMonth, setSelectedMonth] = useState('This Month');

  const days = [1, 5, 10, 15, 20, 25, 30];
  const barHeights = [40, 75, 85, 90, 60, 80, 50];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance Analytics</Text>
        <TouchableOpacity style={styles.calBtn}>
          <CalendarIcon size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Dropdown Card */}
        <TouchableOpacity style={styles.dropdownCard} activeOpacity={0.8}>
          <Text style={styles.dropdownText}>{selectedMonth}</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* Top Dark Blue Hero Card */}
        <LinearGradient
          colors={['#0f172a', '#1e3a8a', '#1e1b4b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.heroTitle}>Overall Attendance</Text>

          <View style={styles.chartLegendRow}>
            {/* Circular Ring Progress Chart Mock */}
            <View style={styles.ringContainer}>
              <View style={styles.ringOuter}>
                <View style={styles.ringInner}>
                  <Text style={styles.percentageText}>92%</Text>
                </View>
              </View>
            </View>

            {/* Legend Col */}
            <View style={styles.legendCol}>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#16a34a' }]} />
                <Text style={styles.legendLabelText}>Present</Text>
                <Text style={styles.legendValText}>22 Days</Text>
              </View>

              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
                <Text style={styles.legendLabelText}>Absent</Text>
                <Text style={styles.legendValText}>2 Days</Text>
              </View>

              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#eab308' }]} />
                <Text style={styles.legendLabelText}>Leave</Text>
                <Text style={styles.legendValText}>1 Day</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Monthly Overview Chart Section */}
        <Text style={styles.sectionTitle}>Monthly Overview</Text>
        <View style={styles.chartCard}>
          <View style={styles.barsContainer}>
            {days.map((day, idx) => (
              <View key={idx} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${barHeights[idx]}%`, backgroundColor: idx === 1 ? '#ef4444' : idx === 4 ? '#eab308' : '#22c55e' }]} />
                </View>
                <Text style={styles.dayLabelText}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Attendance Summary Cards (3 Columns) */}
        <Text style={styles.sectionTitle}>Attendance Summary</Text>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryBox, { backgroundColor: '#f0fdf4' }]}>
            <Text style={[styles.summaryNumText, { color: '#16a34a' }]}>22</Text>
            <Text style={styles.summaryLabelText}>Present</Text>
          </View>

          <View style={[styles.summaryBox, { backgroundColor: '#fef2f2' }]}>
            <Text style={[styles.summaryNumText, { color: '#ef4444' }]}>2</Text>
            <Text style={styles.summaryLabelText}>Absent</Text>
          </View>

          <View style={[styles.summaryBox, { backgroundColor: '#fffbeb' }]}>
            <Text style={[styles.summaryNumText, { color: '#d97706' }]}>1</Text>
            <Text style={styles.summaryLabelText}>Leave</Text>
          </View>
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

  // Hero Card
  heroCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#1e1b4b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  heroTitle: { fontSize: 14, fontWeight: '800', color: '#ffffff', marginBottom: 16 },
  chartLegendRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  ringContainer: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center' },
  ringOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 8,
    borderColor: '#22c55e',
    borderRightColor: '#ef4444',
    borderBottomColor: '#eab308',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: { fontSize: 20, fontWeight: '900', color: '#ffffff' },

  legendCol: { flex: 1, gap: 10 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendLabelText: { flex: 1, fontSize: 12, fontWeight: '700', color: '#cbd5e1' },
  legendValText: { fontSize: 12, fontWeight: '900', color: '#ffffff' },

  // Chart Card
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  barsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  barCol: { alignItems: 'center', flex: 1 },
  barTrack: { width: 12, height: 95, backgroundColor: '#f1f5f9', borderRadius: 6, justifyContent: 'flex-end', overflow: 'hidden' },
  barFill: { width: '100%', borderRadius: 6 },
  dayLabelText: { fontSize: 11, color: '#64748b', fontWeight: '700', marginTop: 8 },

  // Summary Row
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryBox: { flex: 1, borderRadius: 18, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  summaryNumText: { fontSize: 22, fontWeight: '900' },
  summaryLabelText: { fontSize: 11, color: '#64748b', fontWeight: '700', marginTop: 2 },
});
