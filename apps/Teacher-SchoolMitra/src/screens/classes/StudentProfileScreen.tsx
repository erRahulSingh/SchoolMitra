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
  Share2,
  MoreVertical,
  User,
  Calendar,
  Award,
  FileText,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react-native';

export default function StudentProfileScreen({ navigation, route }: any) {
  const student = route.params?.student || {
    name: 'Aarav Sharma',
    roll: 'Roll No. 1',
    class: 'Class 8 - A',
    status: 'Active'
  };

  const personalInfo = [
    { label: 'Date of Birth', val: '15 Aug 2010' },
    { label: "Father's Name", val: 'Rajesh Sharma' },
    { label: "Mother's Name", val: 'Neha Sharma' },
    { label: 'Phone', val: '+91 98765 43210' },
    { label: 'Address', val: '221B, Green Park,\nNew Delhi - 110016' }
  ];

  const academicInfo = [
    { label: 'Admission No.', val: 'ADM-2024-001' },
    { label: 'Session', val: '2024 - 25' },
    { label: 'Class', val: 'Class 8 - A' },
    { label: 'Section', val: 'A' },
    { label: 'Roll No.', val: '1' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Profile</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.actionIconBtn} onPress={() => Alert.alert('Share', 'Sharing student details...')}>
            <Share2 size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIconBtn} onPress={() => Alert.alert('Options', 'Options...')}>
            <MoreVertical size={18} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PROFILE HEADER CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <User size={36} color="#7c3aed" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.studentRoll}>{student.roll}</Text>
            <View style={styles.classRow}>
              <Text style={styles.studentClass}>{student.class}</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>{student.status}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* QUICK ACTION ICONS CARD */}
        <View style={styles.actionRowCard}>
          <TouchableOpacity style={[styles.actionItem, styles.actionItemActive]}>
            <User size={18} color="#ffffff" />
            <Text style={[styles.actionText, { color: '#ffffff' }]}>Overview</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('StudentAttendanceReport', { student })}
          >
            <Calendar size={18} color="#64748b" />
            <Text style={styles.actionText}>Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('StudentPerformance', { student })}
          >
            <Award size={18} color="#64748b" />
            <Text style={styles.actionText}>Marks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('ReportCardGenerator', { student })}
          >
            <FileText size={18} color="#64748b" />
            <Text style={styles.actionText}>Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={() => Alert.alert('More', 'More actions...')}>
            <MoreVertical size={18} color="#64748b" />
            <Text style={styles.actionText}>More</Text>
          </TouchableOpacity>
        </View>

        {/* PERSONAL INFORMATION */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoCard}>
          {personalInfo.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.infoRow,
                idx === personalInfo.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.val}</Text>
            </View>
          ))}
        </View>

        {/* ACADEMIC INFORMATION */}
        <Text style={styles.sectionTitle}>Academic Information</Text>
        <View style={styles.infoCard}>
          {academicInfo.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.infoRow,
                idx === academicInfo.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.val}</Text>
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
  headerRight: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    gap: 8
  },
  actionIconBtn: {
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
  profileCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16
  },
  avatarCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  studentName: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  studentRoll: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 2, fontWeight: '600' },
  classRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 },
  studentClass: { fontSize: 13, color: '#ffffff', fontWeight: '800' },
  activeBadge: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  activeBadgeText: { fontSize: 10, fontWeight: '900', color: '#ffffff' },
  actionRowCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  actionItem: {
    width: '18%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12
  },
  actionItemActive: { backgroundColor: '#7c3aed' },
  actionText: { fontSize: 9, fontWeight: '800', color: '#64748b', marginTop: 6, textAlign: 'center' },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  infoLabel: { fontSize: 13, color: '#64748b', fontWeight: '700' },
  infoValue: { fontSize: 13, fontWeight: '800', color: '#334155', textAlign: 'right' }
});
