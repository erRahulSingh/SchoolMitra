import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Calendar as CalendarIcon, FileText, FlaskConical, Lightbulb, Monitor } from 'lucide-react-native';

export default function AssignmentsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Upcoming', 'Submitted', 'Graded'];

  const [assignmentsList, setAssignmentsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const studentId = "647b0a7d903e1c001f3eabcd"; // Mock student
        const res = await fetch(`http://10.0.2.2:5000/api/v1/assignments/student/${studentId}`);
        const data = await res.json();
        
        if (data.data && data.data.assignments) {
          const formatted = data.data.assignments.map((item: any, idx: number) => ({
            id: item._id,
            subject: item.subjectId?.subjectName || 'Subject',
            title: item.title,
            dueDate: `Due Date: ${new Date(item.dueDate).toLocaleDateString()}`,
            status: item.submissions?.some((s:any) => s.studentId === studentId) ? 'Submitted' : 'Upcoming',
            icon: idx % 2 === 0 ? FileText : FlaskConical,
            color: idx % 2 === 0 ? '#7c3aed' : '#0d9488',
            bg: idx % 2 === 0 ? '#f3e8ff' : '#ccfbf1',
            statusColor: idx % 2 === 0 ? '#7c3aed' : '#0d9488',
            statusBg: idx % 2 === 0 ? '#f3e8ff' : '#ccfbf1',
          }));
          setAssignmentsList(formatted);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handleAction = (type: string, id: string) => {
    Alert.alert(`${type} Success`, `Action completed for assignment.`);
  };

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

                {/* Actions Row */}
                {item.status === 'Upcoming' && (
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionBtnOutline} onPress={() => handleAction('Upload', item.id)}>
                      <Text style={styles.actionBtnOutlineText}>Upload File</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtnSolid} onPress={() => handleAction('Mark Done', item.id)}>
                      <Text style={styles.actionBtnSolidText}>Mark as Done</Text>
                    </TouchableOpacity>
                  </View>
                )}
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
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 16,
  },
  actionBtnOutline: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnOutlineText: { fontSize: 13, fontWeight: '700', color: '#3b82f6' },
  actionBtnSolid: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnSolidText: { fontSize: 13, fontWeight: '700', color: '#ffffff' },
});
