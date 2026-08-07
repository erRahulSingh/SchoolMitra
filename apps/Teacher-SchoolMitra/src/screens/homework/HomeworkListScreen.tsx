import React, { useState } from 'react';
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
  Plus,
  ClipboardList,
  ChevronRight,
  Search,
  FileCheck,
  Users
} from 'lucide-react-native';

export default function HomeworkListScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Active', 'Submitted', 'Overdue'];

  const homeworkList = [
    {
      id: 'hw_1',
      title: 'Maths Homework',
      meta: 'Class 8 - A • Due: 25 May 2024',
      status: 'Active',
      statusColor: '#16a34a',
      statusBg: '#ecfdf5',
      desc: 'Solve questions 1 to 20 from Chapter 5 - Linear Equations.',
      submitted: 32,
      total: 42,
      iconColor: '#7c3aed',
      iconBg: '#f3e8ff'
    },
    {
      id: 'hw_2',
      title: 'Science Homework',
      meta: 'Class 8 - A • Due: 27 May 2024',
      status: 'Active',
      statusColor: '#16a34a',
      statusBg: '#ecfdf5',
      desc: 'Write short notes on the Human Digestive System.',
      submitted: 30,
      total: 42,
      iconColor: '#ea580c',
      iconBg: '#ffedd5'
    },
    {
      id: 'hw_3',
      title: 'English Homework',
      meta: 'Rolls 8 - A • Due: 18 May 2024',
      status: 'Overdue',
      statusColor: '#dc2626',
      statusBg: '#fef2f2',
      desc: "Write a paragraph on 'My Favourite Teacher'.",
      submitted: 28,
      total: 42,
      iconColor: '#ef4444',
      iconBg: '#fef2f2'
    }
  ];

  const filteredList = homeworkList.filter(hw =>
    activeTab === 'All' ? true : hw.status === activeTab || (activeTab === 'Submitted' && hw.submitted > 0)
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Homework List</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.actionIconBtn} onPress={() => Alert.alert('Search', 'Search homework...')}>
            <Search size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIconBtn} onPress={() => navigation.navigate('CreateHomework')}>
            <Plus size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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

        {/* HOMEWORK LIST CARDS */}
        <View style={styles.listContainer}>
          {filteredList.map((hw) => (
            <TouchableOpacity
              key={hw.id}
              style={styles.hwCard}
              onPress={() => navigation.navigate('HomeworkDetails', { hw })}
            >
              <View style={styles.topRow}>
                <View style={[styles.iconBox, { backgroundColor: hw.iconBg }]}>
                  <ClipboardList size={20} color={hw.iconColor} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.hwTitle}>{hw.title}</Text>
                  <Text style={styles.metaText}>{hw.meta}</Text>
                </View>

                <View style={[styles.statusBadge, { backgroundColor: hw.statusBg }]}>
                  <Text style={[styles.statusText, { color: hw.statusColor }]}>{hw.status}</Text>
                </View>
              </View>

              <Text style={styles.descText}>{hw.desc}</Text>

              {/* Bottom statistics block */}
              <View style={styles.bottomRow}>
                <View style={styles.metaStat}>
                  <FileCheck size={16} color="#94a3b8" style={{ marginRight: 6 }} />
                  <Text style={styles.metaStatText}>{hw.submitted} Submitted</Text>
                </View>

                <View style={styles.metaStat}>
                  <Users size={16} color="#94a3b8" style={{ marginRight: 6 }} />
                  <Text style={styles.metaStatText}>{hw.total} Total</Text>
                </View>

                <ChevronRight size={18} color="#cbd5e1" />
              </View>
            </TouchableOpacity>
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
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  tabPillActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  tabPillText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  tabPillTextActive: { color: '#ffffff' },
  listContainer: { gap: 12 },
  hwCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hwTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  metaText: { fontSize: 12, color: '#64748b', marginTop: 3, fontWeight: '600' },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  },
  statusText: { fontSize: 11, fontWeight: '800' },
  descText: { fontSize: 13, color: '#475569', lineHeight: 18, marginBottom: 16 },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12
  },
  metaStat: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  metaStatText: { fontSize: 12, fontWeight: '800', color: '#475569' }
});
