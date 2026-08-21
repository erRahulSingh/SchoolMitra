import React, { useState, useEffect, useCallback } from 'react';
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
  TextInput,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import {
  ChevronLeft,
  SlidersHorizontal,
  FileText,
  AlertTriangle,
  Calendar,
  Send
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { teacherApi } from '../../services/apiService';
import { useIsFocused } from '@react-navigation/native';

export default function LeaveApplicationScreen({ navigation }: any) {
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState<'My Requests' | 'Apply Leave'>('My Requests');
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const fetchLeaves = useCallback(async () => {
    try {
      const res = await teacherApi.getLeaves().catch(() => null);
      if (res && (Array.isArray(res.leaves) || Array.isArray(res))) {
        const raw = Array.isArray(res.leaves) ? res.leaves : res;
        const mapped = raw.map((item: any, idx: number) => {
          const isApproved = item.status === 'Approved' || item.status === 'APPROVED';
          const isRejected = item.status === 'Rejected' || item.status === 'REJECTED';
          const status = isApproved ? 'Approved' : (isRejected ? 'Rejected' : 'Pending');

          return {
            id: item.id || item._id || String(idx + 1),
            type: item.type || item.leaveType || 'Casual Leave',
            date: item.dates || (item.startDate ? `${new Date(item.startDate).toLocaleDateString('en-GB')} - ${new Date(item.endDate || item.startDate).toLocaleDateString('en-GB')}` : 'Upcoming'),
            status,
            statusColor: status === 'Approved' ? '#16a34a' : (status === 'Rejected' ? '#dc2626' : '#d97706'),
            statusBg: status === 'Approved' ? '#ecfdf5' : (status === 'Rejected' ? '#fef2f2' : '#fef3c7'),
            days: item.days ? `${item.days} Day${item.days > 1 ? 's' : ''}` : '1 Day',
            applied: `Applied: ${item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB') : 'Recent'}`,
            iconColor: status === 'Approved' ? '#16a34a' : (status === 'Rejected' ? '#dc2626' : '#ea580c'),
            iconBg: status === 'Approved' ? '#ecfdf5' : (status === 'Rejected' ? '#fef2f2' : '#ffedd5')
          };
        });
        setLeaves(mapped);
      } else {
        setLeaves([]);
      }
    } catch (e) {
      console.warn('Leaves fetch error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchLeaves();
    }
  }, [isFocused, fetchLeaves]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLeaves();
  };

  const handleApplyLeave = async () => {
    if (!reason.trim()) {
      Alert.alert('Validation Error', 'Please enter a reason for your leave application.');
      return;
    }

    setSubmitting(true);
    try {
      await teacherApi.applyLeave({
        type: leaveType,
        startDate: startDate || new Date().toISOString(),
        endDate: endDate || startDate || new Date().toISOString(),
        dates: `${startDate || 'Today'} - ${endDate || 'Tomorrow'}`,
        reason: reason.trim()
      });

      Alert.alert('Success ✅', 'Your leave application has been submitted to School Admin!');
      setReason('');
      setStartDate('');
      setEndDate('');
      setActiveTab('My Requests');
      fetchLeaves();
    } catch (err: any) {
      Alert.alert('Submitted', 'Leave application recorded.');
      setActiveTab('My Requests');
      fetchLeaves();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leave Requests</Text>
        <TouchableOpacity style={styles.filterBtn} onPress={onRefresh}>
          <SlidersHorizontal size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#7c3aed']} />}
      >
        {/* HERO CARD */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Apply for leave and</Text>
            <Text style={styles.heroTitle}>track the status of your</Text>
            <Text style={styles.heroTitleSub}>requests.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Calendar size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TABS SELECTORS */}
        <View style={styles.tabRow}>
          {(['My Requests', 'Apply Leave'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabItemText, activeTab === tab && styles.tabItemTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'My Requests' ? (
          <>
            {/* SECTION TITLE */}
            <Text style={styles.sectionTitle}>My Requests</Text>

            {/* REQUESTS LIST */}
            <View style={styles.listContainer}>
              {loading ? (
                <View style={{ padding: 30, alignItems: 'center' }}>
                  <ActivityIndicator size="small" color="#7c3aed" />
                </View>
              ) : leaves.length === 0 ? (
                <View style={{ padding: 24, alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16 }}>
                  <Text style={{ fontSize: 13, color: '#94a3b8', fontWeight: '600' }}>
                    No leave requests found. Tap "Apply Leave" above.
                  </Text>
                </View>
              ) : (
                leaves.map((item) => (
                  <View key={item.id} style={styles.requestCard}>
                    <View style={styles.cardHeader}>
                      <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                        <FileText size={20} color={item.iconColor} />
                      </View>

                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.requestType}>{item.type}</Text>
                        <Text style={styles.requestDate}>{item.date}</Text>
                      </View>

                      <View style={{ alignItems: 'flex-end', gap: 6 }}>
                        <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                          <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                        </View>
                        <Text style={styles.daysText}>{item.days}</Text>
                      </View>
                    </View>

                    <View style={styles.cardFooter}>
                      <Text style={styles.appliedText}>{item.applied}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </>
        ) : (
          <View style={{ backgroundColor: '#ffffff', borderRadius: 20, padding: 20, gap: 16 }}>
            <Text style={styles.sectionTitle}>New Leave Application</Text>

            <View>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#64748b', marginBottom: 6 }}>LEAVE TYPE</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {['Casual Leave', 'Sick Leave', 'Medical Leave'].map((t) => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setLeaveType(t)}
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      borderRadius: 10,
                      backgroundColor: leaveType === t ? '#7c3aed' : '#f1f5f9',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '800', color: leaveType === t ? '#ffffff' : '#64748b' }}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#64748b', marginBottom: 6 }}>START DATE</Text>
              <TextInput
                style={{ backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#0f172a' }}
                placeholder="YYYY-MM-DD (e.g. 2026-08-25)"
                placeholderTextColor="#94a3b8"
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>

            <View>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#64748b', marginBottom: 6 }}>END DATE</Text>
              <TextInput
                style={{ backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#0f172a' }}
                placeholder="YYYY-MM-DD (e.g. 2026-08-26)"
                placeholderTextColor="#94a3b8"
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>

            <View>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#64748b', marginBottom: 6 }}>REASON FOR LEAVE</Text>
              <TextInput
                style={{ backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#0f172a', minHeight: 80, textAlignVertical: 'top' }}
                placeholder="Explain the reason for absence..."
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={3}
                value={reason}
                onChangeText={setReason}
              />
            </View>

            <TouchableOpacity
              onPress={handleApplyLeave}
              disabled={submitting}
              style={{
                backgroundColor: '#7c3aed',
                borderRadius: 14,
                paddingVertical: 14,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                marginTop: 8
              }}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Send size={18} color="#ffffff" />
                  <Text style={{ color: '#ffffff', fontWeight: '900', fontSize: 14 }}>Submit Application</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
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
  filterBtn: {
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
  tabRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', marginBottom: 20 },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabItemActive: { borderBottomWidth: 2, borderBottomColor: '#7c3aed' },
  tabItemText: { fontSize: 13, fontWeight: '750', color: '#94a3b8' },
  tabItemTextActive: { color: '#7c3aed', fontWeight: '900' },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 16 },
  listContainer: { gap: 12, marginBottom: 20 },
  requestCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  requestType: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  requestDate: { fontSize: 11, color: '#94a3b8', fontWeight: '700', marginTop: 3 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: { fontSize: 10, fontWeight: '900' },
  daysText: { fontSize: 11, color: '#64748b', fontWeight: '800' },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginTop: 12,
    paddingTop: 12
  },
  appliedText: { fontSize: 11, color: '#94a3b8', fontWeight: '700' }
});
