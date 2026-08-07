import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { Plus, BookOpen, Clock, FileText, CheckCircle2, ChevronLeft, Upload } from 'lucide-react-native';

export default function HomeworkScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [selectedClass, setSelectedClass] = useState('Class 8-A');
  const [dueDate, setDueDate] = useState('2026-08-10');
  const [instructions, setInstructions] = useState('');

  const assignments = [
    { id: 'hw_1', subject: 'Mathematics', class: 'Class 8-A', title: 'Chapter 8: Quadratic Equations', due: '10 Aug 2026', total: 42, submitted: 38, status: 'Active' },
    { id: 'hw_2', subject: 'Algebra', class: 'Class 9-B', title: 'Polynomial Theorem Worksheet', due: '12 Aug 2026', total: 38, submitted: 25, status: 'Active' },
    { id: 'hw_3', subject: 'Geometry', class: 'Class 10-A', title: 'Triangles & Proofs Exercise 4.2', due: '05 Aug 2026', total: 45, submitted: 45, status: 'Completed' }
  ];

  const handleCreateHomework = () => {
    if (!title || !instructions) {
      Alert.alert('Validation Error', 'Please enter title and instructions');
      return;
    }
    Alert.alert('Success ✅', 'Homework assigned and notification sent to parents!');
    setShowCreate(false);
    setTitle('');
    setInstructions('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Homework & Assignments</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowCreate(!showCreate)}>
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {showCreate ? (
        /* CREATE HOMEWORK FORM */
        <ScrollView contentContainerStyle={styles.formContent}>
          <Text style={styles.formHeading}>Assign New Homework</Text>

          <Text style={styles.label}>Assignment Title</Text>
          <TextInput style={styles.input} placeholder="e.g. Chapter 8 Worksheet" value={title} onChangeText={setTitle} />

          <Text style={styles.label}>Select Class & Subject</Text>
          <View style={styles.row}>
            <TextInput style={[styles.input, { flex: 1 }]} value={selectedClass} onChangeText={setSelectedClass} />
            <TextInput style={[styles.input, { flex: 1 }]} value={subject} onChangeText={setSubject} />
          </View>

          <Text style={styles.label}>Due Date</Text>
          <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} />

          <Text style={styles.label}>Detailed Instructions</Text>
          <TextInput 
            style={[styles.input, { height: 90, textAlignVertical: 'top' }]} 
            placeholder="Type instructions for students..." 
            multiline 
            value={instructions} 
            onChangeText={setInstructions} 
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleCreateHomework}>
            <Upload size={18} color="#ffffff" />
            <Text style={styles.submitBtnText}>Broadcast Assignment to Students</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        /* HOMEWORK FEED LIST */
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.tabRow}>
            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'active' && styles.activeTabBtn]} 
              onPress={() => setActiveTab('active')}
            >
              <Text style={[styles.tabBtnText, activeTab === 'active' && styles.activeTabBtnText]}>Active (2)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'completed' && styles.activeTabBtn]} 
              onPress={() => setActiveTab('completed')}
            >
              <Text style={[styles.tabBtnText, activeTab === 'completed' && styles.activeTabBtnText]}>Completed (1)</Text>
            </TouchableOpacity>
          </View>

          {assignments
            .filter(item => activeTab === 'active' ? item.status === 'Active' : item.status === 'Completed')
            .map((hw) => (
              <View key={hw.id} style={styles.hwCard}>
                <View style={styles.hwHeader}>
                  <View>
                    <Text style={styles.subjectTag}>{hw.subject} • {hw.class}</Text>
                    <Text style={styles.hwTitle}>{hw.title}</Text>
                  </View>
                  <View style={[styles.statusBadge, hw.status === 'Completed' ? styles.completedBadge : styles.activeBadge]}>
                    <Text style={[styles.statusText, hw.status === 'Completed' ? styles.completedText : styles.activeText]}>
                      {hw.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.hwFooter}>
                  <View style={styles.metaRow}>
                    <Clock size={14} color="#64748b" />
                    <Text style={styles.metaText}>Due: {hw.due}</Text>
                  </View>

                  <View style={styles.metaRow}>
                    <FileText size={14} color="#7c3aed" />
                    <Text style={styles.metaText}>{hw.submitted}/{hw.total} Submissions</Text>
                  </View>
                </View>
              </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#7c3aed', justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  formContent: { paddingHorizontal: 20, paddingVertical: 16 },
  formHeading: { fontSize: 18, fontWeight: '900', color: '#0f172a', marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#ffffff', borderWidth: 1.5, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: '#0f172a' },
  row: { flexDirection: 'row', gap: 10 },
  submitBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#7c3aed', borderRadius: 14, height: 50, marginTop: 24 },
  submitBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 15 },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: '#ffffff', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  activeTabBtn: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  tabBtnText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  activeTabBtnText: { color: '#ffffff' },
  hwCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  hwHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  subjectTag: { fontSize: 12, fontWeight: '800', color: '#7c3aed' },
  hwTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  activeBadge: { backgroundColor: '#dbeafe' },
  completedBadge: { backgroundColor: '#dcfce7' },
  statusText: { fontSize: 12, fontWeight: '800' },
  activeText: { color: '#1d4ed8' },
  completedText: { color: '#15803d' },
  hwFooter: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 13, color: '#64748b' }
});
