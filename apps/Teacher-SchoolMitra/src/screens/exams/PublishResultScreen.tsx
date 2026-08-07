import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Send,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Lock,
  Smartphone,
  Sparkles,
  FileCheck
} from 'lucide-react-native';

export default function PublishResultScreen({ route, navigation }: any) {
  const exam = route?.params?.exam || {
    id: 'ex_1',
    title: 'CBSE Mid-Term Examination 2026',
    class: 'Class 8-A',
    subject: 'All Subjects'
  };

  const [sendPushNotification, setSendPushNotification] = useState(true);
  const [sendSMS, setSendSMS] = useState(true);
  const [publishReportPDF, setPublishReportPDF] = useState(true);
  const [lockMarksEntry, setLockMarksEntry] = useState(true);
  const [isPublished, setIsPublished] = useState(false);

  const handlePublishResults = () => {
    Alert.alert(
      'Publish Results Confirmation 🚀',
      `Are you sure you want to publish official results for ${exam.class} — ${exam.title}? This will notify parents and lock marks entry.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Publish Now',
          onPress: () => {
            setIsPublished(true);
            Alert.alert(
              'Results Published 🎉',
              `Results successfully published for ${exam.class}! Notifications sent to parents.`,
              [{ text: 'OK', onPress: () => navigation.navigate('ExamSchedule') }]
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Publish Results</Text>
        <Send size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HERO BANNER */}
        <View style={styles.heroCard}>
          <Text style={styles.heroClass}>{exam.class}</Text>
          <Text style={styles.heroTitle}>{exam.title}</Text>
          <Text style={styles.heroSub}>Official Declaration & Publication Control Room</Text>
        </View>

        {/* VERIFICATION CHECKLIST */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <ShieldCheck size={20} color="#16a34a" />
            <Text style={styles.cardTitle}>Pre-Publication Verification Checklist</Text>
          </View>

          <View style={styles.checkItem}>
            <CheckCircle2 size={16} color="#16a34a" />
            <Text style={styles.checkText}>All 42 Students Marks Evaluated (100% Complete)</Text>
          </View>

          <View style={styles.checkItem}>
            <CheckCircle2 size={16} color="#16a34a" />
            <Text style={styles.checkText}>Subject Grade Sheets Compiled & CGPA Calculated</Text>
          </View>

          <View style={styles.checkItem}>
            <CheckCircle2 size={16} color="#16a34a" />
            <Text style={styles.checkText}>Principal & Class Teacher Signatures Verified</Text>
          </View>
        </View>

        {/* NOTIFICATION & PUBLISHING SETTINGS */}
        <Text style={styles.sectionHeaderTitle}>Publication Settings</Text>

        <View style={styles.card}>
          {/* PUSH NOTIFICATIONS */}
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.settingLabelRow}>
                <Bell size={16} color="#7c3aed" />
                <Text style={styles.settingTitle}>Push Notification to Parent App</Text>
              </View>
              <Text style={styles.settingSub}>Instant push alert on SchoolMitra Parent App</Text>
            </View>
            <Switch
              value={sendPushNotification}
              onValueChange={setSendPushNotification}
              trackColor={{ false: '#cbd5e1', true: '#ddd6fe' }}
              thumbColor={sendPushNotification ? '#7c3aed' : '#f1f5f9'}
            />
          </View>

          {/* SMS ALERT */}
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.settingLabelRow}>
                <Smartphone size={16} color="#2563eb" />
                <Text style={styles.settingTitle}>SMS Notification to Parents</Text>
              </View>
              <Text style={styles.settingSub}>Send text message with total percentage & CGPA</Text>
            </View>
            <Switch
              value={sendSMS}
              onValueChange={setSendSMS}
              trackColor={{ false: '#cbd5e1', true: '#bfdbfe' }}
              thumbColor={sendSMS ? '#2563eb' : '#f1f5f9'}
            />
          </View>

          {/* REPORT CARD PDF */}
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.settingLabelRow}>
                <FileCheck size={16} color="#059669" />
                <Text style={styles.settingTitle}>Publish Marksheet PDF to Student Portal</Text>
              </View>
              <Text style={styles.settingSub}>Allow parents to view & download official PDF</Text>
            </View>
            <Switch
              value={publishReportPDF}
              onValueChange={setPublishReportPDF}
              trackColor={{ false: '#cbd5e1', true: '#a7f3d0' }}
              thumbColor={publishReportPDF ? '#059669' : '#f1f5f9'}
            />
          </View>

          {/* LOCK MARKS ENTRY */}
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={{ flex: 1 }}>
              <View style={styles.settingLabelRow}>
                <Lock size={16} color="#dc2626" />
                <Text style={styles.settingTitle}>Lock Marks Entry</Text>
              </View>
              <Text style={styles.settingSub}>Freeze marks sheet to prevent unapproved edits</Text>
            </View>
            <Switch
              value={lockMarksEntry}
              onValueChange={setLockMarksEntry}
              trackColor={{ false: '#cbd5e1', true: '#fecdd3' }}
              thumbColor={lockMarksEntry ? '#dc2626' : '#f1f5f9'}
            />
          </View>
        </View>

        {/* PUBLISH ACTION BUTTON */}
        <TouchableOpacity style={styles.publishBtn} onPress={handlePublishResults}>
          <Send size={20} color="#ffffff" />
          <Text style={styles.publishBtnText}>Publish Official Results Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justify: 'center',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: {
    backgroundColor: '#6d28d9',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16
  },
  heroClass: { fontSize: 12, fontWeight: '800', color: '#e9d5ff' },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff', marginTop: 2, marginBottom: 4 },
  heroSub: { fontSize: 12, color: 'rgba(255, 255, 255, 0.85)' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 6 },
  checkText: { fontSize: 13, color: '#334155', fontWeight: '700' },
  sectionHeaderTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 10 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  settingLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  settingTitle: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  settingSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
  publishBtn: {
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#7c3aed',
    height: 52,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 20
  },
  publishBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 15 }
});
