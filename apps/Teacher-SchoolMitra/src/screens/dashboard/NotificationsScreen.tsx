import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Bell, Clock, ChevronLeft, CheckCircle2, FileText, AlertTriangle } from 'lucide-react-native';

export default function NotificationsScreen({ navigation }: any) {
  const notificationsList = [
    { id: 'n1', type: 'Attendance', title: 'Mark Attendance Alert', message: 'Class 8-A morning period attendance is pending for submission.', time: '10 mins ago', icon: Clock, color: '#f59e0b', unread: true },
    { id: 'n2', type: 'Homework', title: 'Homework Submission Received', message: '38 out of 42 students submitted Chapter 8 Mathematics assignment.', time: '1 hour ago', icon: FileText, color: '#3b82f6', unread: true },
    { id: 'n3', type: 'System', title: 'CBSE Mid-Term Schedule Published', message: 'Admin published CBSE Mid-Term exam datesheet. Check exam module.', time: '3 hours ago', icon: CheckCircle2, color: '#10b981', unread: false }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Real-Time Notifications</Text>
        <Bell size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notificationsList.map((item) => {
          const IconComp = item.icon;
          return (
            <View key={item.id} style={[styles.card, item.unread && styles.unreadCard]}>
              <View style={[styles.iconBox, { backgroundColor: `${item.color}20` }]}>
                <IconComp size={20} color={item.color} />
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  card: { flexDirection: 'row', gap: 14, backgroundColor: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  unreadCard: { borderLeftWidth: 4, borderLeftColor: '#7c3aed', backgroundColor: '#faf5ff' },
  iconBox: { width: 42, height: 42, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a', flex: 1, marginRight: 8 },
  timeText: { fontSize: 11, color: '#94a3b8' },
  messageText: { fontSize: 13, color: '#64748b', lineHeight: 18 }
});
