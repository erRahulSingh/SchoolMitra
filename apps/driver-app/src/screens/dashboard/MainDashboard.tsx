import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Bus, Play, MapPin, AlertCircle, MessageSquare, 
  ShieldCheck, Bell, ChevronRight, Clock
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';

export default function MainDashboard({ navigation, route }: any) {
  const { colors, isDark } = useTheme();
  const openDrawer = route?.params?.openDrawer;
  const [driverUser, setDriverUser] = useState<any>({ name: 'Rajesh Kumar' });

  useEffect(() => {
    AsyncStorage.getItem('driverUser').then(res => {
      if (res) {
        try {
          setDriverUser(JSON.parse(res));
        } catch (e) {}
      }
    });
  }, []);

  const getInitials = (nameStr: string) => {
    if (!nameStr) return 'RK';
    const parts = nameStr.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return nameStr.substring(0, 2).toUpperCase();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.card} />

      {/* Top Header Bar */}
      <View style={[styles.headerBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeftRow}>
          <TouchableOpacity onPress={openDrawer} style={styles.menuBtn} activeOpacity={0.7}>
            <View style={[styles.menuLine, { backgroundColor: colors.text }]} />
            <View style={[styles.menuLine, { backgroundColor: colors.text }]} />
            <View style={[styles.menuLine, { backgroundColor: colors.text }]} />
          </TouchableOpacity>
          <Text style={[styles.headerLogoText, { color: colors.text }]}>SchoolMitra</Text>
          <Text style={[styles.headerSubBadge, { color: colors.textSecondary }]}>Driver</Text>
        </View>

        <TouchableOpacity style={[styles.bellBtn, { backgroundColor: colors.background }]} onPress={() => navigation.navigate('DriverNotifications')}>
          <Bell size={20} color={colors.text} />
          <View style={styles.bellBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Greeting Hero Banner Card */}
        <LinearGradient
          colors={['#0f172a', '#1e3a8a', '#1e1b4b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.greetingBanner}
        >
          <View style={styles.greetingLeft}>
            <Text style={styles.greetingText}>Good Morning,</Text>
            <Text style={styles.driverNameText}>{driverUser.name || 'Rajesh Kumar'} 👋</Text>
            <Text style={styles.greetingSubText}>
              Drive Safe, Students are waiting for you.
            </Text>
          </View>

          {/* Avatar Graphic Circle */}
          <View style={styles.avatarCircleBox}>
            <View style={styles.avatarInner}>
              <Text style={styles.avatarText}>{getInitials(driverUser.name)}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Assigned Vehicle Card */}
        <View style={[styles.assignedVehicleCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.busIconSquare}>
            <Bus size={22} color="#f59e0b" fill="#fef08a" strokeWidth={1.8} />
          </View>

          <View style={styles.vehicleInfoCol}>
            <Text style={[styles.busPlateText, { color: colors.text }]}>UP32 AB 1234</Text>
            <Text style={[styles.busModelText, { color: colors.textSecondary }]}>Green Valley School Bus</Text>
          </View>

          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeBadgeText}>Active</Text>
          </View>
        </View>

        {/* Today's Overview Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Overview</Text>
          <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
        </View>

        <View style={styles.overviewGrid}>
          <View style={[styles.overviewBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.overviewLabelText, { color: colors.textSecondary }]}>Today's Trips</Text>
            <Text style={[styles.overviewValText, { color: colors.text }]}>2 <Text style={[styles.unitText, { color: colors.textSecondary }]}>Trips</Text></Text>
          </View>

          <View style={[styles.overviewBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.overviewLabelText, { color: colors.textSecondary }]}>Total Students</Text>
            <Text style={[styles.overviewValText, { color: colors.text }]}>42 <Text style={[styles.unitText, { color: colors.textSecondary }]}>Students</Text></Text>
          </View>

          <View style={[styles.overviewBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.overviewLabelText, { color: colors.textSecondary }]}>Upcoming Stops</Text>
            <Text style={[styles.overviewValText, { color: colors.text }]}>12 <Text style={[styles.unitText, { color: colors.textSecondary }]}>Stops</Text></Text>
          </View>

          <View style={[styles.overviewBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.overviewLabelText, { color: colors.textSecondary }]}>Distance to Cover</Text>
            <Text style={[styles.overviewValText, { color: colors.text }]}>28.6 <Text style={[styles.unitText, { color: colors.textSecondary }]}>km</Text></Text>
          </View>
        </View>

        {/* Today's First Trip Card */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's First Trip</Text>
        <TouchableOpacity 
          style={[styles.firstTripCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => navigation.navigate('StartTrip')}
          activeOpacity={0.85}
        >
          <View style={styles.tripHeaderRow}>
            <View>
              <Text style={[styles.routeTitleText, { color: colors.text }]}>Route 01 - Morning</Text>
              <Text style={[styles.routeNameText, { color: colors.textSecondary }]}>Green Valley Route</Text>
            </View>
            <View style={styles.upcomingBadge}>
              <Text style={styles.upcomingBadgeText}>Upcoming</Text>
            </View>
          </View>

          <View style={[styles.tripDivider, { backgroundColor: colors.border }]} />

          <View style={styles.tripMetaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabelText}>Start Time</Text>
              <Text style={[styles.metaValText, { color: colors.text }]}>07:00 AM</Text>
            </View>

            <View style={styles.metaCol}>
              <Text style={styles.metaLabelText}>First Stop</Text>
              <Text style={[styles.metaValText, { color: colors.text }]}>Maple Park</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions Row */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity 
            style={[styles.actionSquare, { backgroundColor: colors.card, borderColor: colors.border }]} 
            onPress={() => navigation.navigate('StartTrip')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#dcfce7' }]}>
              <Play size={20} color="#16a34a" fill="#16a34a" />
            </View>
            <Text style={[styles.actionLabelText, { color: colors.text }]}>Start Trip</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionSquare, { backgroundColor: colors.card, borderColor: colors.border }]} 
            onPress={() => navigation.navigate('RouteDetails')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#e0f2fe' }]}>
              <MapPin size={20} color="#2563eb" />
            </View>
            <Text style={[styles.actionLabelText, { color: colors.text }]}>Route Details</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionSquare, { backgroundColor: colors.card, borderColor: colors.border }]} 
            onPress={() => navigation.navigate('Sos')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#fee2e2' }]}>
              <AlertCircle size={20} color="#ef4444" />
            </View>
            <Text style={[styles.actionLabelText, { color: colors.text }]}>SOS</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionSquare, { backgroundColor: colors.card, borderColor: colors.border }]} 
            onPress={() => navigation.navigate('Messages')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#f3e8ff' }]}>
              <MessageSquare size={20} color="#7c3aed" />
            </View>
            <Text style={[styles.actionLabelText, { color: colors.text }]}>Messages</Text>
          </TouchableOpacity>
        </View>

        {/* Safety First Banner */}
        <LinearGradient
          colors={['#1d4ed8', '#1e40af']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.safetyCard}
        >
          <View style={styles.safetyTextCol}>
            <Text style={styles.safetyTitleText}>Safety First</Text>
            <Text style={styles.safetySubText}>
              Always wear seat belt and follow traffic rules.
            </Text>
          </View>
          <ShieldCheck size={36} color="#ffffff" opacity={0.85} />
        </LinearGradient>

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
  headerLeftRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuBtn: { gap: 3 },
  menuLine: { width: 18, height: 2, backgroundColor: '#0f172a', borderRadius: 1 },
  headerLogoText: { fontSize: 18, fontWeight: '900', color: '#1d4ed8' },
  headerSubBadge: { fontSize: 11, fontWeight: '700', color: '#64748b', marginTop: 2 },
  bellBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  bellBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444', position: 'absolute', top: 8, right: 8 },

  scrollContent: { padding: 16, paddingBottom: 100 },

  // Greeting Banner
  greetingBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  greetingLeft: { flex: 1, paddingRight: 10 },
  greetingText: { fontSize: 13, color: '#93c5fd', fontWeight: '600' },
  driverNameText: { fontSize: 20, fontWeight: '900', color: '#ffffff', marginTop: 2 },
  greetingSubText: { fontSize: 11, color: '#cbd5e1', fontWeight: '500', marginTop: 6 },
  avatarCircleBox: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#3b82f6', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  avatarInner: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#1d4ed8', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },

  // Assigned Vehicle
  assignedVehicleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  busIconSquare: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#fef3c7', alignItems: 'center', justifyContent: 'center' },
  vehicleInfoCol: { flex: 1 },
  busPlateText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  busModelText: { fontSize: 12, color: '#64748b', fontWeight: '500', marginTop: 2 },
  activeBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#16a34a' },
  activeBadgeText: { fontSize: 11, fontWeight: '800', color: '#16a34a' },

  // Section Header
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  viewAllText: { fontSize: 12, color: '#2563eb', fontWeight: '800' },

  // Overview Grid
  overviewGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  overviewBox: {
    width: '48.5%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
  },
  overviewLabelText: { fontSize: 11, fontWeight: '700', color: '#64748b' },
  overviewValText: { fontSize: 20, fontWeight: '900', color: '#0f172a', marginTop: 4 },
  unitText: { fontSize: 11, color: '#64748b', fontWeight: '600' },

  // First Trip Card
  firstTripCard: {
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
  tripHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  routeTitleText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  routeNameText: { fontSize: 12, color: '#64748b', fontWeight: '500', marginTop: 2 },
  upcomingBadge: { backgroundColor: '#dbeafe', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  upcomingBadgeText: { fontSize: 11, fontWeight: '800', color: '#2563eb' },

  tripDivider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 12 },
  tripMetaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaCol: { flex: 1 },
  metaLabelText: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
  metaValText: { fontSize: 13, color: '#0f172a', fontWeight: '900', marginTop: 2 },

  // Quick Actions
  quickActionsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  actionSquare: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionIconCircle: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  actionLabelText: { fontSize: 11, fontWeight: '800', color: '#0f172a', textAlign: 'center' },

  // Safety Card
  safetyCard: {
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  safetyTextCol: { flex: 1, paddingRight: 10 },
  safetyTitleText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
  safetySubText: { fontSize: 12, color: '#bfdbfe', fontWeight: '500', marginTop: 3 },
});
