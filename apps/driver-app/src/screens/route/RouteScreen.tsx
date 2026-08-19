import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { MapPin, Clock, Users, Navigation, CheckCircle2, Menu } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function RouteScreen({ navigation, route }: any) {
  const { colors, isDark } = useTheme();
  const openDrawer = route?.params?.openDrawer;

  const stops = [
    { id: 1, name: 'Sector 14 Crossing', time: '07:15 AM', students: 6, status: 'completed' },
    { id: 2, name: 'Green Park Gate 2', time: '07:25 AM', students: 8, status: 'completed' },
    { id: 3, name: 'Mayur Vihar Phase 3', time: '07:35 AM', students: 5, status: 'active' },
    { id: 4, name: 'City Hospital Roundabout', time: '07:45 AM', students: 7, status: 'pending' },
    { id: 5, name: 'School Main Gate', time: '08:00 AM', students: 6, status: 'pending' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.card} />

      {/* Top Header Bar */}
      <View style={[styles.headerBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeftRow}>
          <TouchableOpacity onPress={openDrawer} style={styles.menuBtn} activeOpacity={0.7}>
            <Menu size={22} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerLogoText, { color: colors.text }]}>SchoolMitra</Text>
          <Text style={styles.headerSubBadge}>Route</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Today's Route #4 Schedule</Text>
          <Text style={[styles.subTitle, { color: colors.textSecondary }]}>Total 5 Stops • 32 Students Enroute</Text>
        </View>

      <TouchableOpacity 
        style={styles.navBanner} 
        onPress={() => navigation.navigate('LiveNavigation')}
        activeOpacity={0.85}
      >
        <View style={styles.navIconBox}>
          <Navigation size={24} color="#ffffff" />
        </View>
        <View style={styles.navTextContainer}>
          <Text style={styles.navTitle}>Open Turn-by-Turn GPS Navigation</Text>
          <Text style={styles.navSub}>Active destination: Mayur Vihar Phase 3</Text>
        </View>
      </TouchableOpacity>

      <Text style={[styles.sectionHeader, { color: colors.text }]}>Route Stop Checklist</Text>
      <View style={styles.timeline}>
        {stops.map((stop, index) => (
          <View key={stop.id} style={[styles.stopCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.stopHeader}>
              <View style={[
                styles.stopBadge,
                stop.status === 'completed' && { backgroundColor: colors.successSoft },
                stop.status === 'active' && { backgroundColor: colors.accentSoft },
                stop.status === 'pending' && { backgroundColor: isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.15)' },
              ]}>
                {stop.status === 'completed' ? (
                  <CheckCircle2 size={18} color={colors.success} />
                ) : (
                  <MapPin size={18} color={stop.status === 'active' ? colors.accent : colors.textMuted} />
                )}
                <Text style={[
                  styles.stopBadgeText,
                  stop.status === 'completed' && { color: colors.success },
                  stop.status === 'active' && { color: colors.accent },
                  stop.status === 'pending' && { color: colors.textMuted },
                ]}>
                  Stop #{stop.id} • {stop.status.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.stopTime, { color: colors.textSecondary }]}>{stop.time}</Text>
            </View>

            <Text style={[styles.stopName, { color: colors.text }]}>{stop.name}</Text>

            <View style={[styles.stopFooter, { borderTopColor: colors.border }]}>
              <View style={styles.studentInfo}>
                <Users size={16} color={colors.textSecondary} />
                <Text style={[styles.studentText, { color: colors.textSecondary }]}>{stop.students} Students Boarding</Text>
              </View>
              <TouchableOpacity 
                style={[styles.detailsBtn, { backgroundColor: colors.accentSoft }]} 
                onPress={() => navigation.navigate('StudentPickup')}
              >
                <Text style={[styles.detailsBtnText, { color: colors.accent }]}>Pickup Roster</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerLeftRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuBtn: { padding: 4 },
  headerLogoText: { fontSize: 18, fontWeight: '900', color: '#1d4ed8' },
  headerSubBadge: { fontSize: 11, fontWeight: '700', color: '#64748b', marginTop: 2 },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 13,
    marginTop: 2,
  },
  navBanner: {
    backgroundColor: '#0284c7',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 14,
  },
  navIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTextContainer: {
    flex: 1,
  },
  navTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  navSub: {
    color: '#bae6fd',
    fontSize: 12,
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  timeline: {
    gap: 12,
  },
  stopCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  stopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stopBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
  },
  stopBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  stopTime: {
    fontSize: 12,
    fontWeight: '600',
  },
  stopName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  stopFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  studentText: {
    fontSize: 12,
  },
  detailsBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  detailsBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
