import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, User, Phone, Mail, Award, BookOpen } from 'lucide-react-native';

export default function TeacherProfileScreen({ navigation }: any) {
  const teacher = {
    name: 'Mrs. Priya Singh',
    role: 'Class Teacher (Class 5th-A)',
    subject: 'Science & EVS',
    experience: '8+ Years Experience',
    qualification: 'M.Sc. Physics, B.Ed.',
    email: 'priya.singh@greenvalley.edu.in',
    phone: '+91 98123 45678'
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Teacher Profile</Text>
        <User size={20} color="#4f46e5" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>PS</Text>
          </View>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.role}>{teacher.role}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Credentials & Contact</Text>
          <View style={styles.row}>
            <Award size={18} color="#4f46e5" />
            <Text style={styles.rowText}>{teacher.qualification} • {teacher.experience}</Text>
          </View>
          <View style={styles.row}>
            <Mail size={18} color="#2563eb" />
            <Text style={styles.rowText}>{teacher.email}</Text>
          </View>
          <View style={styles.row}>
            <Phone size={18} color="#16a34a" />
            <Text style={styles.rowText}>{teacher.phone}</Text>
          </View>
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
  scrollContent: { padding: 16, gap: 16 },
  profileCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  avatarCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontSize: 24, fontWeight: '900', color: '#ffffff' },
  name: { fontSize: 20, fontWeight: '900', color: '#0f172a' },
  role: { fontSize: 13, color: '#4f46e5', fontWeight: '700', marginTop: 4 },
  subject: { fontSize: 12, color: '#64748b', fontWeight: '600', marginTop: 2 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0', gap: 12 },
  cardTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowText: { fontSize: 13, color: '#334155', fontWeight: '600' }
});
