import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Bell, MapPin, Users, Navigation } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useParentAuth } from '../../context/ParentAuthContext';

export default function BusStopDetailsScreen({ route, navigation }: any) {
  const { currentChild } = useParentAuth();
  const passedStop = route?.params?.stop;

  const stopName = passedStop?.name || 'Main Market';
  const stopTime = passedStop?.time || '07:35 AM';

  const childName = currentChild?.name || 'Your Child';
  const childClass = currentChild?.class || 'Class 10th';
  const childInitials = childName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'ST';

  const studentsList = [
    { name: childName, class: childClass, status: 'Picked', statusColor: '#16a34a', statusBg: '#dcfce7', initials: childInitials, isMe: true },
    { name: 'Ananya Verma', class: 'Class 9th – B', status: 'Picked', statusColor: '#16a34a', statusBg: '#dcfce7', initials: 'AV' },
    { name: 'Krish Patel', class: 'Class 10th – A', status: 'Not Picked', statusColor: '#ef4444', statusBg: '#fee2e2', initials: 'KP' },
    { name: 'Diya Singh', class: 'Class 8th – A', status: 'Not Picked', statusColor: '#ef4444', statusBg: '#fee2e2', initials: 'DS' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bus Stop Details</Text>
        <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('Notifications')}>
          <Bell size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Purple Stop Banner Card */}
        <LinearGradient
          colors={['#4c1d95', '#6d28d9', '#5b21b6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.purpleBanner}
        >
          <View style={styles.whiteIconCircle}>
            <MapPin size={24} color="#5b21b6" strokeWidth={2.2} />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={styles.stopNameText}>{stopName}</Text>
            <Text style={styles.stopIdText}>Stop Sequence: #{passedStop?.number || '1'}</Text>
          </View>
        </LinearGradient>

        {/* Stop Overview Stats Card (3 Columns) */}
        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Arrival</Text>
            <Text style={styles.statValue}>{stopTime}</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>1.2 <Text style={styles.unitText}>km</Text></Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Students</Text>
            <Text style={styles.statValue}>{studentsList.length}</Text>
          </View>
        </View>

        {/* Students at this Stop Section */}
        <Text style={styles.sectionTitle}>Students at this Stop</Text>
        <View style={styles.studentsCardList}>
          {studentsList.map((student, idx) => (
            <View key={idx} style={[styles.studentRow, idx < studentsList.length - 1 && styles.rowBorder, student.isMe && styles.myChildRow]}>
              <View style={[styles.avatarCircle, student.isMe && { backgroundColor: '#4f46e5' }]}>
                <Text style={[styles.avatarText, student.isMe && { color: '#ffffff' }]}>{student.initials}</Text>
              </View>

              <View style={styles.studentInfoCol}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.studentNameText}>{student.name}</Text>
                  {student.isMe && <View style={styles.youBadge}><Text style={styles.youText}>Your Child</Text></View>}
                </View>
                <Text style={styles.studentClassText}>{student.class}</Text>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: student.statusBg }]}>
                <Text style={[styles.statusText, { color: student.statusColor }]}>{student.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom View on Map Button */}
        <TouchableOpacity 
          style={styles.viewMapBtn} 
          onPress={() => navigation.navigate('LiveBusTracking')}
          activeOpacity={0.85}
        >
          <Navigation size={18} color="#2563eb" />
          <Text style={styles.viewMapBtnText}>Track Live on Map</Text>
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
    paddingTop: Platform.OS === 'ios' ? 52 : 38,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  bellBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  purpleBanner: {
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#4c1d95',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    gap: 14,
  },
  whiteIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTextCol: { flex: 1 },
  stopNameText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  stopIdText: { fontSize: 12, color: '#e9d5ff', fontWeight: '600', marginTop: 3 },

  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 22,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
  },
  statCol: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, height: 28, backgroundColor: '#e2e8f0' },
  statLabel: { fontSize: 11, color: '#64748b', fontWeight: '600', marginBottom: 2 },
  statValue: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  unitText: { fontSize: 11, color: '#64748b', fontWeight: '600' },

  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  studentsCardList: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  myChildRow: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 8,
    marginVertical: 4,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { fontSize: 13, fontWeight: '800', color: '#475569' },
  studentInfoCol: { flex: 1 },
  studentNameText: { fontSize: 13.5, fontWeight: '800', color: '#0f172a' },
  studentClassText: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 2 },
  youBadge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  youText: { fontSize: 9.5, fontWeight: '800', color: '#4338ca' },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: { fontSize: 11, fontWeight: '800' },

  viewMapBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#bfdbfe',
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  viewMapBtnText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '800',
  },
});
