import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Bell,
  Bus,
  Clock,
  ChevronRight
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TransportDutyScreen({ navigation }: any) {
  const upcomingDuties = [
    { id: '1', route: 'Route 4 (Evening)', date: '21 May 2024', status: 'Upcoming', color: '#2563eb', bg: '#eff6ff' },
    { id: '2', route: 'Route 1 (Morning)', date: '22 May 2024', status: 'Upcoming', color: '#2563eb', bg: '#eff6ff' },
    { id: '3', route: 'Route 3 (Evening)', date: '23 May 2024', status: 'Upcoming', color: '#2563eb', bg: '#eff6ff' }
  ];

  const dutyHistory = [
    { id: '4', route: 'Route 1 (Morning)', date: '20 May 2024', status: 'Completed', color: '#16a34a', bg: '#ecfdf5' },
    { id: '5', route: 'Route 3 (Evening)', date: '17 May 2024', status: 'Completed', color: '#16a34a', bg: '#ecfdf5' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transport Duty</Text>
        <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('Notifications')}>
          <Bell size={18} color="#0f172a" />
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
            <Text style={styles.heroTitle}>Ensure safe</Text>
            <Text style={styles.heroTitle}>journey for our</Text>
            <Text style={styles.heroTitleSub}>students.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Bus size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TODAY'S DUTY */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Today's Duty</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>Active</Text>
          </View>
        </View>

        <View style={styles.activeDutyCard}>
          <View style={styles.busIconBox}>
            <Bus size={24} color="#2563eb" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.routeTitle}>Route 2 (Morning)</Text>
            <Text style={styles.routeDetail}>Pick-up Point: City Center</Text>
            <Text style={styles.routeDetail}>Drop Point: School Campus</Text>

            <View style={styles.timeRow}>
              <Clock size={12} color="#94a3b8" style={{ marginRight: 6 }} />
              <Text style={styles.timeText}>07:15 AM - 08:00 AM</Text>
            </View>
          </View>
        </View>

        {/* UPCOMING DUTIES */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Upcoming Duties</Text>
          <TouchableOpacity onPress={() => Alert.alert('View All', 'Showing all upcoming duties...')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {upcomingDuties.map((item) => (
            <View key={item.id} style={styles.dutyRowCard}>
              <View style={[styles.miniBusIconBox, { backgroundColor: item.bg }]}>
                <Bus size={18} color={item.color} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.dutyRouteName}>{item.route}</Text>
                <Text style={styles.dutyDateText}>{item.date}</Text>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: item.bg }]}>
                <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* DUTY HISTORY */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Duty History</Text>
          <TouchableOpacity onPress={() => Alert.alert('View All', 'Showing complete duty logs...')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {dutyHistory.map((item) => (
            <View key={item.id} style={styles.dutyRowCard}>
              <View style={[styles.miniBusIconBox, { backgroundColor: item.bg }]}>
                <Bus size={18} color={item.color} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.dutyRouteName}>{item.route}</Text>
                <Text style={styles.dutyDateText}>{item.date}</Text>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: item.bg }]}>
                <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
              </View>
            </View>
          ))}
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
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: 64
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
  bellBtn: {
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
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  activeBadge: {
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12
  },
  activeBadgeText: { fontSize: 11, fontWeight: '900', color: '#7c3aed' },
  viewAllText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  activeDutyCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  busIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  routeTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 4 },
  routeDetail: { fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: '600' },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  timeText: { fontSize: 11, color: '#94a3b8', fontWeight: '700' },
  listContainer: { gap: 10, marginBottom: 16 },
  dutyRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  miniBusIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dutyRouteName: { fontSize: 13, fontWeight: '800', color: '#334155' },
  dutyDateText: { fontSize: 11, color: '#94a3b8', marginTop: 3, fontWeight: '600' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusText: { fontSize: 10, fontWeight: '900' }
});
