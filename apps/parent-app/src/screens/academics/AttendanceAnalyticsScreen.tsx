import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { ChevronLeft, BarChart2, TrendingUp, AlertCircle } from 'lucide-react-native';

export default function AttendanceAnalyticsScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://10.0.2.2:5000/api/v1/attendance/analytics/overview")
      .then(res => res.json())
      .then(json => {
        if (json && json.success) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch attendance analytics", e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance Analytics</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Top Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.iconCircle}>
              <BarChart2 size={24} color="#2563eb" />
            </View>
            <View style={styles.badgeLabel}>
              <Text style={styles.badgeText}>Term 1</Text>
            </View>
          </View>
          
          <Text style={styles.heroTitle}>Overall Attendance</Text>
          <View style={styles.heroPercentRow}>
            <Text style={styles.heroPercent}>{data?.overallAttendancePercent || '0%'}</Text>
            <View style={styles.trendPill}>
              <TrendingUp size={14} color="#16a34a" />
              <Text style={styles.trendText}>+2.4%</Text>
            </View>
          </View>

          {/* Simple Progress Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: data?.overallAttendancePercent || '0%' }]} />
          </View>
          <Text style={styles.thresholdText}>Minimum required: {data?.thresholdPercent || 75}%</Text>
        </View>

        {/* Monthly Trend Section */}
        <Text style={styles.sectionTitle}>Monthly Trend</Text>
        <View style={styles.trendCard}>
          {data?.monthlyTrend?.map((item: any, idx: number) => (
            <View key={idx} style={[styles.trendRow, idx < data.monthlyTrend.length - 1 && styles.rowBorder]}>
              <Text style={styles.trendMonth}>{item.month}</Text>
              <View style={styles.trendBarBg}>
                <View style={[styles.trendBarFill, { width: `${item.percent}%`, backgroundColor: item.percent < 75 ? '#ef4444' : '#2563eb' }]} />
              </View>
              <Text style={[styles.trendVal, { color: item.percent < 75 ? '#ef4444' : '#0f172a' }]}>{item.percent}%</Text>
            </View>
          ))}
          {(!data?.monthlyTrend || data.monthlyTrend.length === 0) && (
            <Text style={{ textAlign: 'center', color: '#64748b', marginVertical: 10 }}>No trend data available.</Text>
          )}
        </View>

        {/* Defaulter Alert Box */}
        {(parseFloat(data?.overallAttendancePercent) < (data?.thresholdPercent || 75)) && (
          <View style={styles.alertBox}>
            <AlertCircle size={20} color="#dc2626" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.alertTitle}>Attendance Warning</Text>
              <Text style={styles.alertSub}>Your ward's attendance is below the minimum required threshold of {data?.thresholdPercent}%.</Text>
            </View>
          </View>
        )}

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
    backgroundColor: '#f8fafc',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', elevation: 1 },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Hero Card
  heroCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 20, elevation: 4, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, marginBottom: 24 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  iconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#eff6ff', justifyContent: 'center', alignItems: 'center' },
  badgeLabel: { backgroundColor: '#f1f5f9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: '800', color: '#475569' },
  heroTitle: { fontSize: 14, fontWeight: '700', color: '#64748b' },
  heroPercentRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4, marginBottom: 16 },
  heroPercent: { fontSize: 36, fontWeight: '900', color: '#0f172a' },
  trendPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  trendText: { fontSize: 12, fontWeight: '800', color: '#16a34a' },
  progressBarBg: { height: 8, backgroundColor: '#f1f5f9', borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  progressBarFill: { height: '100%', backgroundColor: '#2563eb', borderRadius: 4 },
  thresholdText: { fontSize: 11, fontWeight: '600', color: '#94a3b8', textAlign: 'right' },

  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 12 },

  // Trend Card
  trendCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 16, elevation: 2, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, marginBottom: 20 },
  trendRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  trendMonth: { width: 80, fontSize: 13, fontWeight: '700', color: '#475569' },
  trendBarBg: { flex: 1, height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, marginHorizontal: 12, overflow: 'hidden' },
  trendBarFill: { height: '100%', borderRadius: 3 },
  trendVal: { width: 45, fontSize: 13, fontWeight: '900', textAlign: 'right' },

  // Alert Box
  alertBox: { flexDirection: 'row', backgroundColor: '#fef2f2', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#fecaca', alignItems: 'center' },
  alertTitle: { fontSize: 14, fontWeight: '800', color: '#dc2626' },
  alertSub: { fontSize: 12, fontWeight: '500', color: '#991b1b', marginTop: 2 },
});
