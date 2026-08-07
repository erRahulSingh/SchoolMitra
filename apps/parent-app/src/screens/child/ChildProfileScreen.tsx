import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, User, Calendar, Building, Bus, Phone, Mail, MapPin, Award, ChevronRight, CreditCard, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChildProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#4f46e5', '#6366f1']} style={styles.heroHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#ffffff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Child Profile</Text>
        <View style={{ width: 36 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}><Text style={styles.avatarText}>RS</Text></View>
          <Text style={styles.name}>Rohan Sharma</Text>
          <Text style={styles.classText}>Class 5th – Section A</Text>
          <Text style={styles.schoolText}>Green Valley Public School</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}><Text style={styles.badgeText}>Roll No: 12</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>Session: 2024–25</Text></View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          {[
            { label: 'Date of Birth', value: '15 March 2014', icon: Calendar, color: '#e11d48' },
            { label: 'Blood Group', value: 'O+', icon: Heart, color: '#ef4444' },
            { label: 'Father Name', value: 'Rajesh Sharma', icon: User, color: '#2563eb' },
            { label: 'Mother Name', value: 'Anjali Sharma', icon: User, color: '#9333ea' },
            { label: 'Phone', value: '+91 98765 43210', icon: Phone, color: '#16a34a' },
            { label: 'Email', value: 'rajesh.sharma@gmail.com', icon: Mail, color: '#d97706' },
            { label: 'Address', value: '45, Green Park Colony, Lucknow', icon: MapPin, color: '#0284c7' }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={styles.infoRow}>
                <View style={[styles.infoIcon, { backgroundColor: item.color + '15' }]}><IconComp size={16} color={item.color} /></View>
                <View style={{ flex: 1 }}><Text style={styles.infoLabel}>{item.label}</Text><Text style={styles.infoValue}>{item.value}</Text></View>
              </View>
            );
          })}
        </View>

        <View style={styles.quickLinks}>
          {[
            { label: 'Digital ID Card', screen: 'DigitalIDCard', icon: CreditCard, color: '#4f46e5' },
            { label: 'Medical Records', screen: 'MedicalRecords', icon: Heart, color: '#ef4444' },
            { label: 'Achievements', screen: 'ReportCard', icon: Award, color: '#d97706' }
          ].map((link, idx) => {
            const IconComp = link.icon;
            return (
              <TouchableOpacity key={idx} style={styles.linkRow} onPress={() => navigation.navigate(link.screen)}>
                <View style={[styles.linkIcon, { backgroundColor: link.color + '15' }]}><IconComp size={18} color={link.color} /></View>
                <Text style={styles.linkLabel}>{link.label}</Text>
                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  heroHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 16 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  scrollContent: { padding: 16, gap: 16 },
  profileCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', elevation: 3 },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontSize: 28, fontWeight: '900', color: '#ffffff' },
  name: { fontSize: 22, fontWeight: '900', color: '#1e3a8a' },
  classText: { fontSize: 14, color: '#2563eb', fontWeight: '700', marginTop: 4 },
  schoolText: { fontSize: 12, color: '#64748b', fontWeight: '600', marginTop: 2 },
  badgeRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  badge: { backgroundColor: '#eef2ff', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  badgeText: { fontSize: 11, fontWeight: '800', color: '#4f46e5' },
  infoSection: { backgroundColor: '#ffffff', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  infoIcon: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  infoLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '700' },
  infoValue: { fontSize: 14, fontWeight: '800', color: '#0f172a', marginTop: 1 },
  quickLinks: { backgroundColor: '#ffffff', borderRadius: 20, padding: 4, borderWidth: 1, borderColor: '#e2e8f0' },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  linkIcon: { width: 38, height: 38, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  linkLabel: { flex: 1, fontSize: 14, fontWeight: '800', color: '#0f172a' }
});
