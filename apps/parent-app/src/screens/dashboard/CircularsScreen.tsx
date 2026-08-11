import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Filter, FileText, Shirt, Megaphone } from 'lucide-react-native';

export default function CircularsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'General', 'Academics', 'Transport'];

  const circularsList = [
    {
      title: 'Fee Submission Reminder',
      desc: 'Dear Parents, this is a reminder to submit the pending fee before 15th May 2025 to avoid late fee.',
      date: '12 May 2025',
      category: 'General',
      isNew: true,
      icon: FileText,
      color: '#7c3aed',
      bg: '#f3e8ff',
    },
    {
      title: 'Summer Camp Registration',
      desc: 'Registrations are open for the Summer Camp 2025. Last date to register is 20th May 2025.',
      date: '10 May 2025',
      category: 'Academics',
      isNew: false,
      icon: Megaphone,
      color: '#7c3aed',
      bg: '#f3e8ff',
    },
    {
      title: 'Uniform Update',
      desc: 'New summer uniform will be applicable from 1st June 2025.',
      date: '08 May 2025',
      category: 'General',
      isNew: false,
      icon: Shirt,
      color: '#2563eb',
      bg: '#e0f2fe',
    },
  ];

  const filteredCirculars = activeTab === 'All'
    ? circularsList
    : circularsList.filter(c => c.category === activeTab);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Circulars</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Filter Pills Row */}
        <View style={styles.pillsRow}>
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.pillBtn, isActive && styles.pillActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.75}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Circular Cards List */}
        <View style={styles.listContainer}>
          {filteredCirculars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={styles.circularCard}>
                <View style={styles.cardMainRow}>
                  <View style={[styles.iconSquare, { backgroundColor: item.bg }]}>
                    <IconComp size={22} color={item.color} strokeWidth={2} />
                  </View>

                  <View style={styles.infoCol}>
                    <View style={styles.titleBadgeRow}>
                      <Text style={styles.circularTitleText}>{item.title}</Text>
                      {item.isNew && (
                        <View style={styles.newBadge}>
                          <Text style={styles.newBadgeText}>New</Text>
                        </View>
                      )}
                    </View>

                    <Text style={styles.circularDescText}>{item.desc}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* View All Circulars Button */}
        <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.85}>
          <Text style={styles.viewAllBtnText}>View All Circulars</Text>
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
  filterBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Category Pills
  pillsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  pillBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  pillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  pillTextActive: { color: '#ffffff', fontWeight: '900' },

  // List Cards
  listContainer: { gap: 14, marginBottom: 20 },
  circularCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardMainRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  iconSquare: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  infoCol: { flex: 1 },
  titleBadgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  circularTitleText: { fontSize: 14, fontWeight: '900', color: '#0f172a', flex: 1, paddingRight: 6 },
  newBadge: { backgroundColor: '#16a34a', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  newBadgeText: { fontSize: 10, fontWeight: '900', color: '#ffffff' },
  circularDescText: { fontSize: 12, color: '#475569', lineHeight: 18, fontWeight: '500' },
  dateText: { fontSize: 11, color: '#94a3b8', fontWeight: '500', marginTop: 8 },

  // Bottom View All Btn
  viewAllBtn: {
    backgroundColor: '#eff6ff',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  viewAllBtnText: { fontSize: 14, fontWeight: '900', color: '#2563eb' },
});
