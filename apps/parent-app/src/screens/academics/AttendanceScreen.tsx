import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, FileText } from 'lucide-react-native';

export default function AttendanceScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Dynamic fetch from backend
    fetch("http://10.0.2.2:5000/api/v1/attendance/reports/monthly?studentId=STU-1001")
      .then(res => res.json())
      .then(json => {
        if (json && json.success) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch attendance summary", e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#ea580c" />
      </View>
    );
  }

  const getStatusIconInfo = (status: string) => {
    switch(status) {
      case 'Present': return { icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7' };
      case 'Absent': return { icon: XCircle, color: '#dc2626', bg: '#fee2e2' };
      case 'Late': return { icon: Clock, color: '#d97706', bg: '#fef3c7' };
      case 'Leave': return { icon: FileText, color: '#2563eb', bg: '#dbeafe' };
      default: return { icon: CheckCircle2, color: '#94a3b8', bg: '#f1f5f9' };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance — {data?.month || 'Current Month'}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Calendar / Overall Rate Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <View style={styles.calendarIconBox}>
              <CalendarIcon size={24} color="#ea580c" />
            </View>
            <View>
              <Text style={styles.workingDaysText}>{data?.workingDays || 0} Working Days</Text>
              <Text style={styles.workingDaysSub}>Overall Rate: {data?.classAveragePercent || '0%'}</Text>
            </View>
          </View>
        </View>

        {/* Attendance Summary Grid */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Present</Text>
            <Text style={[styles.summaryCount, { color: '#16a34a' }]}>{data?.present || 0}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Absent</Text>
            <Text style={[styles.summaryCount, { color: '#dc2626' }]}>{data?.absent || 0}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Late</Text>
            <Text style={[styles.summaryCount, { color: '#d97706' }]}>{data?.late || 0}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Leave</Text>
            <Text style={[styles.summaryCount, { color: '#2563eb' }]}>{data?.leave || 0}</Text>
          </View>
        </View>

        {/* Daily Attendance History */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Daily Attendance History</Text>
        
        <View style={styles.historyCard}>
          {data?.history?.map((item: any, idx: number) => {
            const { icon: StatusIcon, color, bg } = getStatusIconInfo(item.status);
            return (
              <View key={idx} style={[styles.historyRow, idx < data.history.length - 1 && styles.rowBorder]}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateDay}>{new Date(item.date).getDate()}</Text>
                  <Text style={styles.dateMonth}>{new Date(item.date).toLocaleString('default', { month: 'short' })}</Text>
                </View>

                <View style={styles.historyInfo}>
                  <Text style={styles.historyStatusText}>{item.status}</Text>
                  {item.reason && <Text style={styles.historyReasonText}>{item.reason}</Text>}
                </View>

                <View style={[styles.statusIconBadge, { backgroundColor: bg }]}>
                  <StatusIcon size={20} color={color} />
                </View>
              </View>
            );
          })}

          {(!data?.history || data.history.length === 0) && (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#64748b' }}>No attendance records found.</Text>
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
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Hero Card
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  heroLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  calendarIconBox: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#fff7ed', alignItems: 'center', justifyContent: 'center' },
  workingDaysText: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  workingDaysSub: { fontSize: 13, color: '#64748b', fontWeight: '500', marginTop: 2 },

  // Summary Grid
  summaryGrid: { flexDirection: 'row', gap: 12, marginBottom: 20, flexWrap: 'wrap' },
  summaryBox: {
    flex: 1,
    minWidth: '40%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  summaryLabel: { fontSize: 12, color: '#64748b', fontWeight: '700', marginBottom: 4 },
  summaryCount: { fontSize: 24, fontWeight: '900' },

  // Section
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },

  // History Card
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  historyRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  dateBox: { width: 46, height: 50, borderRadius: 12, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#f1f5f9' },
  dateDay: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  dateMonth: { fontSize: 10, fontWeight: '700', color: '#64748b', textTransform: 'uppercase' },
  historyInfo: { flex: 1, marginLeft: 14 },
  historyStatusText: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  historyReasonText: { fontSize: 12, color: '#64748b', fontWeight: '500', marginTop: 2 },
  statusIconBadge: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
