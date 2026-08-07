import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, CreditCard, GraduationCap, Phone, Calendar, Building } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DigitalIDCardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Digital ID Card</Text>
        <CreditCard size={20} color="#4f46e5" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={['#1e3a8a', '#2563eb', '#4f46e5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.idCard}>
          <View style={styles.cardHeader}>
            <GraduationCap size={24} color="#fbbf24" />
            <Text style={styles.schoolName}>Green Valley Public School</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.photoBox}><Text style={styles.photoText}>RS</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardName}>Rohan Sharma</Text>
              <Text style={styles.cardClass}>Class 5th – Section A</Text>
              <View style={styles.cardRow}><Calendar size={12} color="#93c5fd" /><Text style={styles.cardDetail}>DOB: 15 March 2014</Text></View>
              <View style={styles.cardRow}><Building size={12} color="#93c5fd" /><Text style={styles.cardDetail}>Roll No: 12</Text></View>
              <View style={styles.cardRow}><Phone size={12} color="#93c5fd" /><Text style={styles.cardDetail}>Parent: +91 98765 43210</Text></View>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.footerText}>Session: 2024-25 • Bus No: UP32-1234</Text>
            <Text style={styles.idNo}>ID: SM-2024-00512</Text>
          </View>
        </LinearGradient>
        <Text style={styles.note}>This is a digitally verified ID card. Show to school authorities when required.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 20 },
  idCard: { borderRadius: 24, padding: 24, elevation: 8, shadowColor: '#1e3a8a', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)', paddingBottom: 14 },
  schoolName: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
  cardBody: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  photoBox: { width: 72, height: 88, borderRadius: 12, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' },
  photoText: { fontSize: 24, fontWeight: '900', color: '#1e3a8a' },
  cardName: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  cardClass: { fontSize: 13, color: '#93c5fd', fontWeight: '700', marginTop: 2 },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  cardDetail: { fontSize: 12, color: '#bfdbfe', fontWeight: '600' },
  cardFooter: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 11, color: '#93c5fd', fontWeight: '600' },
  idNo: { fontSize: 11, color: '#fbbf24', fontWeight: '800' },
  note: { fontSize: 12, color: '#64748b', textAlign: 'center', marginTop: 20, lineHeight: 18 }
});
