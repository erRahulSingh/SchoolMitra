import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, CheckCircle2, Clock } from 'lucide-react-native';
import { studentRohan3DUri } from '../../assets/parent3dAssets';

export default function PickupDropTimelineScreen({ navigation }: any) {
  const timelineSteps = [
    { time: '07:05 AM', title: 'Picked Up', location: 'Maple Park', status: 'completed', isGreen: true },
    { time: '07:12 AM', title: 'Reached', location: 'City Center', status: 'completed', isGreen: true },
    { time: '07:25 AM', title: 'Reached', location: 'Sector 52', status: 'completed', isGreen: true },
    { time: '07:45 AM', title: 'Reached School', location: 'Green Valley Public School', status: 'completed', isGreen: true },
    { time: '03:15 PM', title: 'Departed School', location: 'On the way', status: 'active', isOrange: true },
    { time: '03:55 PM', title: 'Dropped', location: 'Maple Park', status: 'pending', isGrey: true },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pickup & Drop Timeline</Text>
        <TouchableOpacity style={styles.calBtn}>
          <CalendarIcon size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Student Profile Card */}
        <View style={styles.studentCard}>
          <View style={styles.avatarBox}>
            <Image
              source={{ uri: studentRohan3DUri }}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.studentInfoCol}>
            <Text style={styles.studentNameText}>Rohan Sharma</Text>
            <Text style={styles.studentClassText}>Class 5th – A</Text>
            <Text style={styles.studentBusText}>Bus No. UP32 AB 1234</Text>
          </View>

          <View style={styles.todayPill}>
            <Text style={styles.todayPillText}>Today</Text>
          </View>
        </View>

        {/* Vertical Progress Timeline Card */}
        <View style={styles.timelineCard}>
          {timelineSteps.map((step, idx) => (
            <View key={idx} style={styles.timelineRow}>
              {/* Connector Line & Dot */}
              <View style={styles.timelineLeftCol}>
                <View style={[
                  styles.timelineDotCircle,
                  step.isGreen && styles.bgGreenDot,
                  step.isOrange && styles.bgOrangeDot,
                  step.isGrey && styles.bgGreyDot,
                ]}>
                  <View style={styles.innerDotWhite} />
                </View>
                {idx < timelineSteps.length - 1 && (
                  <View style={[
                    styles.timelineConnectorLine,
                    step.isGreen && styles.lineGreen,
                    step.isOrange && styles.lineOrange,
                  ]} />
                )}
              </View>

              {/* Time Column */}
              <Text style={styles.timeText}>{step.time}</Text>

              {/* Step Info */}
              <View style={styles.stepInfoCol}>
                <Text style={styles.stepTitleText}>{step.title}</Text>
                <Text style={styles.stepLocationText}>{step.location}</Text>
              </View>

              {/* Status Indicator Icon */}
              <View style={styles.statusRightCol}>
                {step.isGreen && (
                  <CheckCircle2 size={18} color="#16a34a" fill="#dcfce7" />
                )}
                {step.isOrange && (
                  <View style={styles.orangeActiveDot} />
                )}
              </View>
            </View>
          ))}
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
  calBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Student Card
  studentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  avatarBox: { width: 50, height: 50, borderRadius: 25, overflow: 'hidden', borderWidth: 2, borderColor: '#3b82f6' },
  avatarImage: { width: '100%', height: '100%' },
  studentInfoCol: { flex: 1 },
  studentNameText: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  studentClassText: { fontSize: 12, color: '#475569', fontWeight: '600', marginTop: 2 },
  studentBusText: { fontSize: 11, color: '#2563eb', fontWeight: '600', marginTop: 2 },
  todayPill: { backgroundColor: '#7c3aed', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  todayPillText: { fontSize: 11, fontWeight: '900', color: '#ffffff' },

  // Timeline Card
  timelineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  timelineLeftCol: { width: 28, alignItems: 'center', justifyContent: 'center' },
  timelineDotCircle: { width: 14, height: 14, borderRadius: 7, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  bgGreenDot: { backgroundColor: '#16a34a' },
  bgOrangeDot: { backgroundColor: '#ea580c' },
  bgGreyDot: { backgroundColor: '#cbd5e1' },
  innerDotWhite: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#ffffff' },

  timelineConnectorLine: {
    position: 'absolute',
    top: 22,
    bottom: -16,
    width: 2,
    backgroundColor: '#cbd5e1',
    zIndex: 1,
  },
  lineGreen: { backgroundColor: '#16a34a' },
  lineOrange: { backgroundColor: '#ea580c' },

  timeText: { width: 70, fontSize: 11, fontWeight: '800', color: '#2563eb', marginLeft: 8 },
  stepInfoCol: { flex: 1, marginLeft: 8 },
  stepTitleText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  stepLocationText: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 2 },
  statusRightCol: { width: 28, alignItems: 'flex-end' },
  orangeActiveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ea580c' },
});
