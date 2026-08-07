import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
import {
  ChevronLeft,
  Search,
  SlidersHorizontal,
  MoreVertical,
  FileText,
  FileSpreadsheet,
  File
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ClassNotesScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Mathematics', 'Science', 'English', 'More'];

  const notes = [
    { id: '1', title: 'Linear Equations', subject: 'Class 10 - Mathematics', date: '20 May 2024', size: '2.4 MB', icon: FileText, color: '#2563eb', bg: '#eff6ff' },
    { id: '2', title: 'Photosynthesis Process', subject: 'Class 9 - Science', date: '18 May 2024', size: '3.1 MB', icon: FileSpreadsheet, color: '#ea580c', bg: '#ffedd5' },
    { id: '3', title: 'Essay Writing Tips', subject: 'Class 8 - English', date: '16 May 2024', size: '1.2 MB', icon: File, color: '#16a34a', bg: '#ecfdf5' },
    { id: '4', title: 'Triangles Theorem', subject: 'Class 9 - Mathematics', date: '14 May 2024', size: '1.8 MB', icon: FileText, color: '#dc2626', bg: '#fef2f2' },
    { id: '5', title: 'Electricity & Circuits', subject: 'Class 10 - Science', date: '12 May 2024', size: '2.7 MB', icon: FileSpreadsheet, color: '#2563eb', bg: '#eff6ff' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Class Notes</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.actionBtn}>
            <Search size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <SlidersHorizontal size={18} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO CARD */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>All your notes in</Text>
            <Text style={styles.heroTitle}>one place. Easy to</Text>
            <Text style={styles.heroTitleSub}>access and share.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <FileText size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TABS PILLS */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabPill, activeTab === tab && styles.tabPillActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabPillText, activeTab === tab && styles.tabPillTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* NOTES LIST */}
        <View style={styles.listContainer}>
          {notes.map((item) => {
            const IconComp = item.icon;
            return (
              <View key={item.id} style={styles.noteCard}>
                <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
                  <IconComp size={20} color={item.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.noteTitle}>{item.title}</Text>
                  <Text style={styles.noteSubject}>{item.subject}</Text>
                  <Text style={styles.noteMeta}>{item.date}  •  {item.size}</Text>
                </View>

                <TouchableOpacity onPress={() => Alert.alert('Options', 'Action triggers...')}>
                  <MoreVertical size={18} color="#94a3b8" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => Alert.alert('Upload', 'Select file to upload as Class Note...')}
        >
          <Text style={styles.uploadText}>+ Upload New Note</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: Platform.OS === 'android' ? 64 + (StatusBar.currentHeight || 0) : 64
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
  actionBtn: {
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
  heroCard: {
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroTitleSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabRow: { flexDirection: 'row', gap: 6, marginBottom: 20 },
  tabPill: {
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabPillActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  tabPillText: { fontSize: 13, fontWeight: '800', color: '#64748b' },
  tabPillTextActive: { color: '#ffffff' },
  listContainer: { gap: 12, marginBottom: 80 },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noteTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginBottom: 4 },
  noteSubject: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  noteMeta: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 4 },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  uploadBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
