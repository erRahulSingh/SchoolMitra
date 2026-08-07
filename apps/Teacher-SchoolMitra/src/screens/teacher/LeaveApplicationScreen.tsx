import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
import {
  ChevronLeft,
  SlidersHorizontal,
  FileText,
  AlertTriangle,
  Calendar
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LeaveApplicationScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('My Requests');

  const history = [
    { id: '1', type: 'Sick Leave', date: '20 May 2024', status: 'Approved', statusColor: '#16a34a', statusBg: '#ecfdf5', days: '2 Days', applied: 'Applied on: 18 May 2024', icon: FileText, iconColor: '#ea580c', iconBg: '#ffedd5' },
    { id: '2', type: 'Personal Leave', date: '10 May 2024', status: 'Approved', statusColor: '#16a34a', statusBg: '#ecfdf5', days: '1 Day', applied: 'Applied on: 08 May 2024', icon: FileText, iconColor: '#7c3aed', iconBg: '#f3e8ff' },
    { id: '3', type: 'Casual Leave', date: '02 May 2024', status: 'Rejected', statusColor: '#dc2626', statusBg: '#fef2f2', days: '1 Day', applied: 'Applied on: 30 Apr 2024', icon: AlertTriangle, iconColor: '#ea580c', iconBg: '#ffedd5' },
    { id: '4', type: 'Sick Leave', date: '15 Apr 2024', status: 'Approved', statusColor: '#16a34a', statusBg: '#ecfdf5', days: '2 Days', applied: 'Applied on: 13 Apr 2024', icon: FileText, iconColor: '#16a34a', iconBg: '#ecfdf5' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leave Requests</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <SlidersHorizontal size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
          {['My Requests', 'Apply Leave'].map((tab) => (
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

        {/* SECTION TITLE */}
        <Text style={styles.sectionTitle}>My Requests</Text>

        {/* REQUESTS LIST */}
        <View style={styles.listContainer}>
          {history.map((item) => {
            const IconComp = item.icon;
            return (
              <View key={item.id} style={styles.requestCard}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                    <IconComp size={20} color={item.iconColor} />
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
            );
          })}
        </View>
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
