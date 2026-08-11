import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Bell, MapPin, Users, Navigation } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BusStopDetailsScreen({ navigation }: any) {
  const studentsList = [
    { name: 'Rohan Sharma', class: 'Class 5th – A', status: 'Picked', statusColor: '#16a34a', statusBg: '#dcfce7', initials: 'RS' },
    { name: 'Ananya Verma', class: 'Class 4th – B', status: 'Picked', statusColor: '#16a34a', statusBg: '#dcfce7', initials: 'AV' },
    { name: 'Krish Patel', class: 'Class 3rd – A', status: 'Not Picked', statusColor: '#ef4444', statusBg: '#fee2e2', initials: 'KP' },
    { name: 'Diya Singh', class: 'Class 2nd – A', status: 'Not Picked', statusColor: '#ef4444', statusBg: '#fee2e2', initials: 'DS' },
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
        <TouchableOpacity style={styles.bellBtn}>
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
            <Text style={styles.stopNameText}>Maple Park</Text>
            <Text style={styles.stopIdText}>Stop ID: STP001</Text>
          </View>
        </LinearGradient>

        {/* Stop Overview Stats Card (3 Columns) */}
        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Arrival</Text>
            <Text style={styles.statValue}>7:05 AM</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>1.2 <Text style={styles.unitText}>km</Text></Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Students</Text>
            <Text style={styles.statValue}>8</Text>
          </View>
        </View>

        {/* Students at this Stop Section */}
        <Text style={styles.sectionTitle}>Students at this Stop</Text>
        <View style={styles.studentsCardList}>
          {studentsList.map((student, idx) => (
            <View key={idx} style={[styles.studentRow, idx < studentsList.length - 1 && styles.rowBorder]}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{student.initials}</Text>
              </View>

              <View style={styles.studentInfoCol}>
                <Text style={styles.studentNameText}>{student.name}</Text>
                <Text style={styles.studentClassText}>{student.class}</Text>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: student.statusBg }]}>
                <Text style={[styles.statusText, { color: student.statusColor }]}>{student.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom View on Map Button */}
        <TouchableOpacity style={styles.viewMapBtn} activeOpacity={0.85}>
          <Navigation size={18} color="#2563eb" />
          <Text style={styles.viewMapBtnText}>View on Map</Text>
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
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  bellBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Purple Banner
  purpleBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#5b21b6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  whiteIconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
  bannerTextCol: { flex: 1 },
  stopNameText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  stopIdText: { fontSize: 12, color: '#ddd6fe', fontWeight: '500', marginTop: 2 },

  // Stats Card
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  statCol: { alignItems: 'center', flex: 1 },
  statLabel: { fontSize: 11, color: '#64748b', fontWeight: '700' },
  statValue: { fontSize: 18, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  unitText: { fontSize: 11, color: '#64748b', fontWeight: '600' },
  statDivider: { width: 1, height: 24, backgroundColor: '#f1f5f9' },

  // Students Section
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  studentsCardList: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  studentRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#3b82f6', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontWeight: '900', color: '#ffffff' },
  studentInfoCol: { flex: 1 },
  studentNameText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  studentClassText: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: '800' },

  // Bottom View Map Btn
  viewMapBtn: {
    backgroundColor: '#eff6ff',
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  viewMapBtnText: { fontSize: 14, fontWeight: '900', color: '#2563eb' },
});
