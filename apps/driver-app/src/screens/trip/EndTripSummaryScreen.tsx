import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, StatusBar, Alert } from 'react-native';
import { ChevronLeft, MoreVertical, Trophy, Navigation, Clock, Users, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function EndTripSummaryScreen({ navigation }: any) {
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    Alert.alert('Trip Submitted 🌟', 'Trip summary recorded successfully.', [
      { text: 'OK', onPress: () => navigation.navigate('MainApp') }
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>End Trip Summary</Text>
        <TouchableOpacity style={styles.moreBtn}>
          <MoreVertical size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Success Green Banner */}
        <LinearGradient
          colors={['#16a34a', '#059669', '#047857']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.successBanner}
        >
          <View style={styles.trophyBadgeCircle}>
            <Trophy size={36} color="#f59e0b" fill="#fef08a" strokeWidth={1.8} />
          </View>

          <Text style={styles.successTitleText}>Trip Completed!</Text>
          <Text style={styles.successSubText}>
            Great job! You completed the trip successfully.
          </Text>
        </LinearGradient>

        {/* Route Info Card */}
        <View style={styles.routeCard}>
          <Text style={styles.routeTitleText}>Route 01 - Morning</Text>
          <Text style={styles.routeNameText}>Green Valley Route</Text>
        </View>

        {/* Stats Grid (2x2) */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <View style={styles.iconCircleBlue}>
              <Navigation size={18} color="#2563eb" />
            </View>
            <View style={styles.statTextCol}>
              <Text style={styles.statLabel}>Total Distance</Text>
              <Text style={styles.statVal}>18.6 <Text style={styles.unitText}>km</Text></Text>
            </View>
          </View>

          <View style={styles.statBox}>
            <View style={styles.iconCircleGreen}>
              <Clock size={18} color="#16a34a" />
            </View>
            <View style={styles.statTextCol}>
              <Text style={styles.statLabel}>Total Duration</Text>
              <Text style={styles.statVal}>55 <Text style={styles.unitText}>min</Text></Text>
            </View>
          </View>

          <View style={styles.statBox}>
            <View style={styles.iconCircleGreen}>
              <Users size={18} color="#16a34a" />
            </View>
            <View style={styles.statTextCol}>
              <Text style={styles.statLabel}>Students Picked</Text>
              <Text style={styles.statVal}>42</Text>
            </View>
          </View>

          <View style={styles.statBox}>
            <View style={styles.iconCircleGreen}>
              <Users size={18} color="#16a34a" />
            </View>
            <View style={styles.statTextCol}>
              <Text style={styles.statLabel}>Students Dropped</Text>
              <Text style={styles.statVal}>42</Text>
            </View>
          </View>
        </View>

        {/* Performance Metrics Card */}
        <View style={styles.metricsCard}>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabelText}>Stops Covered</Text>
            <Text style={styles.metricValText}>12 / 12</Text>
          </View>

          <View style={styles.dividerLine} />

          <View style={styles.metricRow}>
            <Text style={styles.metricLabelText}>On Time Performance</Text>
            <Text style={[styles.metricValText, { color: '#16a34a' }]}>100%</Text>
          </View>

          <View style={styles.dividerLine} />

          <View style={styles.metricRow}>
            <Text style={styles.metricLabelText}>Average Speed</Text>
            <Text style={styles.metricValText}>28 km/h</Text>
          </View>
        </View>

        {/* Add Note Section */}
        <Text style={styles.sectionTitle}>Add Note (Optional)</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Write any note about the trip..."
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          value={note}
          onChangeText={setNote}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <CheckCircle2 size={20} color="#ffffff" fill="#ffffff" />
          <Text style={styles.submitBtnText}>End Trip & Submit</Text>
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
  moreBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Success Banner
  successBanner: {
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  trophyBadgeCircle: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  successTitleText: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  successSubText: { fontSize: 12, color: '#dcfce7', fontWeight: '500', marginTop: 4, textAlign: 'center' },

  // Route Card
  routeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  routeTitleText: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  routeNameText: { fontSize: 12, color: '#64748b', fontWeight: '500', marginTop: 2 },

  // Stats Grid
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  statBox: {
    width: '48.5%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconCircleBlue: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' },
  iconCircleGreen: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center' },
  statTextCol: { flex: 1 },
  statLabel: { fontSize: 10, color: '#64748b', fontWeight: '700' },
  statVal: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  unitText: { fontSize: 10, color: '#64748b', fontWeight: '600' },

  // Metrics Card
  metricsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  metricRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  dividerLine: { height: 1, backgroundColor: '#f1f5f9' },
  metricLabelText: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  metricValText: { fontSize: 13, color: '#0f172a', fontWeight: '900' },

  // Note Section
  sectionTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginBottom: 8 },
  noteInput: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    fontSize: 13,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    height: 80,
    marginBottom: 20,
  },

  // Submit Button
  submitBtn: {
    backgroundColor: '#1d4ed8',
    borderRadius: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  submitBtnText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
});
