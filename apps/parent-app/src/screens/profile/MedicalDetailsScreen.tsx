import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import { ChevronLeft, Shield, Droplet, Ruler, Scale, AlertCircle, Phone, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { studentRohan3DUri } from '../../assets/parent3dAssets';

export default function MedicalDetailsScreen({ navigation }: any) {
  const medicalDetails = [
    { label: 'Blood Group', value: 'B+', icon: Droplet },
    { label: 'Height', value: '142 cm', icon: Ruler },
    { label: 'Weight', value: '32 kg', icon: Scale },
    { label: 'Allergies', value: 'No Known Allergies', icon: AlertCircle },
    { label: 'Chronic Conditions', value: 'None', icon: Info },
    { label: 'Disabilities', value: 'None', icon: Shield },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health / Medical Details</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Student Purple Banner */}
        <LinearGradient
          colors={['#312e81', '#4338ca', '#3b82f6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.studentBanner}
        >
          <View style={styles.avatarBox}>
            <Image
              source={{ uri: studentRohan3DUri }}
              style={styles.avatarImg}
              resizeMode="cover"
            />
          </View>

          <View style={styles.studentInfoCol}>
            <Text style={styles.studentNameText}>Rohan Sharma</Text>
            <Text style={styles.studentSubText}>Class 5th – A</Text>
            <Text style={styles.studentSubText}>Roll No. 12</Text>
          </View>

          <View style={styles.shieldIconBox}>
            <Shield size={24} color="#ffffff" />
          </View>
        </LinearGradient>

        {/* Medical Information Card */}
        <View style={styles.infoCard}>
          <Text style={styles.cardSectionTitle}>Medical Information</Text>

          {medicalDetails.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={[styles.detailRow, idx < medicalDetails.length - 1 && styles.rowBorder]}>
                <View style={styles.iconSquare}>
                  <IconComp size={16} color="#4f46e5" />
                </View>

                <Text style={styles.detailLabelText}>{item.label}</Text>
                <Text style={styles.detailValText}>{item.value}</Text>
              </View>
            );
          })}
        </View>

        {/* Emergency Contact Card */}
        <View style={styles.infoCard}>
          <Text style={styles.cardSectionTitle}>Emergency Contact</Text>

          <View style={styles.contactRow}>
            <Text style={styles.detailLabelText}>Name</Text>
            <Text style={styles.detailValText}>Anjali Sharma (Mother)</Text>
          </View>

          <View style={styles.contactRow}>
            <Text style={styles.detailLabelText}>Phone</Text>
            <Text style={styles.phoneValText}>+91 98765 43210</Text>
          </View>
        </View>

        {/* Notice Banner */}
        <View style={styles.noticeBanner}>
          <Info size={18} color="#2563eb" />
          <Text style={styles.noticeText}>
            Please inform the school about any changes in your child's health.
          </Text>
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
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Banner
  studentBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#4338ca',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  avatarBox: { width: 56, height: 56, borderRadius: 28, overflow: 'hidden', borderWidth: 2, borderColor: '#ffffff' },
  avatarImg: { width: '100%', height: '100%' },
  studentInfoCol: { flex: 1 },
  studentNameText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  studentSubText: { fontSize: 12, color: '#c7d2fe', fontWeight: '600', marginTop: 2 },
  shieldIconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255, 255, 255, 0.15)', alignItems: 'center', justifyContent: 'center' },

  // Info Cards
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardSectionTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  contactRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconSquare: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#eef2ff', alignItems: 'center', justifyContent: 'center' },
  detailLabelText: { flex: 1, fontSize: 13, color: '#64748b', fontWeight: '600' },
  detailValText: { fontSize: 13, color: '#0f172a', fontWeight: '800' },
  phoneValText: { fontSize: 13, color: '#2563eb', fontWeight: '900' },

  // Notice Banner
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  noticeText: { flex: 1, fontSize: 12, color: '#1d4ed8', fontWeight: '600', lineHeight: 17 },
});
