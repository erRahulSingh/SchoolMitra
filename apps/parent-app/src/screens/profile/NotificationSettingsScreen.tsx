import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Bell } from 'lucide-react-native';

export default function NotificationSettingsScreen({ navigation }: any) {
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);
  const [homeworkAlerts, setHomeworkAlerts] = useState(true);
  const [feeReminders, setFeeReminders] = useState(true);
  const [noticeAlerts, setNoticeAlerts] = useState(true);
  const [busTrackingAlerts, setBusTrackingAlerts] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <Bell size={20} color="#4f46e5" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {[
            { title: 'Attendance Push Notifications', sub: 'Instant alert when marked Present/Absent', val: attendanceAlerts, setVal: setAttendanceAlerts },
            { title: 'Homework & Assignment Alerts', sub: 'Notify when new homework is assigned', val: homeworkAlerts, setVal: setHomeworkAlerts },
            { title: 'Fee Payment Reminders', sub: 'Dues and receipt alerts', val: feeReminders, setVal: setFeeReminders },
            { title: 'School Notice Board', sub: 'Important school announcements', val: noticeAlerts, setVal: setNoticeAlerts },
            { title: 'Live Bus Tracking Alerts', sub: 'Bus arrival & pickup alerts', val: busTrackingAlerts, setVal: setBusTrackingAlerts }
          ].map((item, idx) => (
            <View key={idx} style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.sub}>{item.sub}</Text>
              </View>
              <Switch value={item.val} onValueChange={item.setVal} trackColor={{ false: '#cbd5e1', true: '#c7d2fe' }} thumbColor={item.val ? '#4f46e5' : '#f1f5f9'} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#e2e8f0', gap: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  sub: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 2 }
});
