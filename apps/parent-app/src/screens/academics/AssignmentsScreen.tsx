import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, FileText, FlaskConical, Lightbulb, Monitor } from 'lucide-react-native';

export default function AssignmentsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Upcoming', 'Submitted', 'Graded'];

  const assignmentsList = [
    {
      subject: 'Mathematics Project',
      title: "Create a model on 'Types of Triangles'",
      dueDate: 'Due Date: 25 May 2025',
      status: 'Upcoming',
      icon: FileText,
      color: '#7c3aed',
      bg: '#f3e8ff',
      statusColor: '#7c3aed',
      statusBg: '#f3e8ff',
    },
    {
      subject: 'Science Activity',
      title: 'Prepare a working model of Volcano',
      dueDate: 'Due Date: 28 May 2025',
      status: 'Upcoming',
      icon: FlaskConical,
      color: '#0d9488',
      bg: '#ccfbf1',
      statusColor: '#0d9488',
      statusBg: '#ccfbf1',
    },
    {
      subject: 'English Presentation',
      title: "Prepare a presentation on 'The Nation Builders'",
      dueDate: 'Due Date: 30 May 2025',
      status: 'Upcoming',
      icon: Lightbulb,
      color: '#ea580c',
      bg: '#ffedd5',
      statusColor: '#ea580c',
      statusBg: '#ffedd5',
    },
    {
      subject: 'Computer',
      title: "Make a PPT on 'Uses of Internet'",
      dueDate: 'Due Date: 02 Jun 2025',
      status: 'Submitted',
      icon: Monitor,
      color: '#0284c7',
      bg: '#e0f2fe',
      statusColor: '#0284c7',
      statusBg: '#e0f2fe',
    },
  ];

  const filteredAssignments = activeTab === 'All'
    ? assignmentsList
    : assignmentsList.filter(a => a.status === activeTab);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assignments</Text>
        <TouchableOpacity style={styles.calBtn}>
          <CalendarIcon size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Category Pills Row */}
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

        {/* Assignments Cards List */}
        <View style={styles.listContainer}>
          {filteredAssignments.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View key={idx} style={styles.assignmentCard}>
                <View style={styles.cardMainRow}>
                  {/* Subject Icon Box */}
                  <View style={[styles.iconSquare, { backgroundColor: item.bg }]}>
                    <IconComp size={22} color={item.color} strokeWidth={2} />
                  </View>

                  {/* Title & Info */}
                  <View style={styles.infoCol}>
                    <Text style={styles.subjectNameText}>{item.subject}</Text>
                    <Text style={styles.taskTitleText}>{item.title}</Text>
                    <Text style={styles.dueDateText}>{item.dueDate}</Text>
                  </View>

                  {/* Status Badge */}
                  <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                    <Text style={[styles.statusBadgeText, { color: item.statusColor }]}>{item.status}</Text>
                  </View>
                </View>
              </View>
            );
          })}
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
  calBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
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
  listContainer: { gap: 12 },
  assignmentCard: {
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
  cardMainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconSquare: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: { flex: 1 },
  subjectNameText: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  taskTitleText: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginTop: 2 },
  dueDateText: { fontSize: 11, color: '#94a3b8', fontWeight: '500', marginTop: 6 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusBadgeText: { fontSize: 11, fontWeight: '800' },
});
