import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import { ChevronLeft, Calendar, Disc, Lightbulb, Volume2, Wind, Eye, CircleDot, ShieldCheck, Briefcase, Flame, Fuel, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function VehicleChecklistScreen({ navigation }: any) {
  const safetyItems = [
    { title: 'Brakes', status: 'Good', icon: Disc },
    { title: 'Lights (Head, Tail, Indicator)', status: 'Good', icon: Lightbulb },
    { title: 'Horn', status: 'Good', icon: Volume2 },
    { title: 'Wipers', status: 'Good', icon: Wind },
    { title: 'Mirrors', status: 'Good', icon: Eye },
    { title: 'Tyres', status: 'Good', icon: CircleDot },
    { title: 'Seat Belts', status: 'Good', icon: ShieldCheck },
  ];

  const otherItems = [
    { title: 'First Aid Box', status: 'Available', icon: Briefcase },
    { title: 'Fire Extinguisher', status: 'Available', icon: Flame },
    { title: 'Fuel Level', status: 'Sufficient', icon: Fuel },
  ];

  const handleSubmitChecklist = () => {
    Alert.alert('Checklist Completed ✅', 'Pre-trip vehicle inspection report submitted.', [
      { text: 'OK', onPress: () => navigation.goBack() }
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
        <Text style={styles.headerTitle}>Vehicle Checklist</Text>
        <TouchableOpacity style={styles.calBtn}>
          <Calendar size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Pre-Trip Header Banner */}
        <LinearGradient
          colors={['#1e3a8a', '#2563eb', '#1d4ed8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.bannerHeaderRow}>
            <View>
              <Text style={styles.bannerTitleText}>Pre-Trip Checklist</Text>
              <Text style={styles.bannerSubText}>Date: 15 May 2025  •  06:30 AM</Text>
            </View>
            <View style={styles.allGoodBadge}>
              <Text style={styles.allGoodText}>All Good</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Safety Items Section */}
        <Text style={styles.sectionTitle}>Safety Items</Text>
        <View style={styles.cardGroup}>
          {safetyItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={[styles.itemRow, idx < safetyItems.length - 1 && styles.rowBorder]}>
                <View style={styles.iconSquare}>
                  <IconComp size={18} color="#0f172a" />
                </View>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.statusText}>{item.status}</Text>
                <CheckCircle2 size={18} color="#16a34a" fill="#16a34a" />
              </View>
            );
          })}
        </View>

        {/* Other Items Section */}
        <Text style={styles.sectionTitle}>Other Items</Text>
        <View style={styles.cardGroup}>
          {otherItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={[styles.itemRow, idx < otherItems.length - 1 && styles.rowBorder]}>
                <View style={styles.iconSquarePurple}>
                  <IconComp size={18} color="#7c3aed" />
                </View>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.statusText}>{item.status}</Text>
                <CheckCircle2 size={18} color="#16a34a" fill="#16a34a" />
              </View>
            );
          })}
        </View>

        {/* Checklist Completed Button */}
        <TouchableOpacity
          style={styles.completedBtn}
          onPress={handleSubmitChecklist}
          activeOpacity={0.85}
        >
          <CheckCircle2 size={20} color="#ffffff" fill="#ffffff" />
          <Text style={styles.completedBtnText}>Checklist Completed</Text>
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
  calBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Hero Banner
  heroBanner: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  bannerHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bannerTitleText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  bannerSubText: { fontSize: 12, color: '#bfdbfe', fontWeight: '600', marginTop: 4 },
  allGoodBadge: { backgroundColor: '#16a34a', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  allGoodText: { fontSize: 11, fontWeight: '800', color: '#ffffff' },

  // Card Group
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  cardGroup: {
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
  itemRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconSquare: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  iconSquarePurple: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#f3e8ff', alignItems: 'center', justifyContent: 'center' },
  itemTitleText: { fontSize: 13, fontWeight: '900', color: '#0f172a', flex: 1 },
  statusText: { fontSize: 12, color: '#64748b', fontWeight: '600', marginRight: 4 },

  // Completed Button
  completedBtn: {
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
  completedBtnText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
});
