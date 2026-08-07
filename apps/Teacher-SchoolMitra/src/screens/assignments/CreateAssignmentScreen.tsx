import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Switch
} from 'react-native';
import {
  ChevronLeft,
  Upload,
  Award,
  Calendar,
  FileText,
  CheckCircle2,
  Paperclip,
  Trash2,
  Sparkles,
  Plus
} from 'lucide-react-native';
import { socketService } from '../../services/socketService';

export default function CreateAssignmentScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [selectedClass, setSelectedClass] = useState('Class 8-A');
  const [maxMarks, setMaxMarks] = useState('50');
  const [dueDate, setDueDate] = useState('2026-08-25');
  const [dueTime, setDueTime] = useState('23:59 PM');
  const [description, setDescription] = useState('');
  const [enableRubric, setEnableRubric] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState([
    { name: 'Geometry_Model_Rubric_Guide.pdf', size: '1.4 MB' }
  ]);

  const classes = ['Class 8-A', 'Class 9-B', 'Class 10-C'];
  const subjects = ['Mathematics', 'Algebra', 'Geometry', 'Physics'];

  const handleAddAttachment = () => {
    const mockFiles = [
      { name: 'Assignment_Reference_Sheet.pdf', size: '2.1 MB' },
      { name: 'Project_Diagram_Sample.png', size: '850 KB' },
      { name: 'Grading_Criteria_V2.docx', size: '1.1 MB' }
    ];
    const randomFile = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    setAttachedFiles([...attachedFiles, randomFile]);
    Alert.alert('File Attached 📎', `Added ${randomFile.name} to assignment attachments.`);
  };

  const handleRemoveAttachment = (index: number) => {
    const updated = attachedFiles.filter((_, i) => i !== index);
    setAttachedFiles(updated);
  };

  const handlePublish = (isDraft = false) => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter an assignment title.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter assignment guidelines.');
      return;
    }

    if (isDraft) {
      Alert.alert('Draft Saved 💾', `Assignment "${title}" saved as draft.`);
    } else {
      socketService.syncAssignment(title, selectedClass, maxMarks);
      Alert.alert('Assignment Published 🎉', `Assignment successfully published & broadcasted live via Socket.IO to ${selectedClass} parents!`);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Assignment</Text>
        <Award size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* TARGET CLASS & SUBJECT */}
        <Text style={styles.sectionHeaderTitle}>Basic Details</Text>
        
        <Text style={styles.label}>Target Class</Text>
        <View style={styles.pillRow}>
          {classes.map((cls) => (
            <TouchableOpacity
              key={cls}
              style={[styles.selectorPill, selectedClass === cls && styles.selectorPillActive]}
              onPress={() => setSelectedClass(cls)}
            >
              <Text style={[styles.selectorPillText, selectedClass === cls && styles.selectorPillTextActive]}>
                {cls}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Subject</Text>
        <View style={styles.pillRow}>
          {subjects.map((sub) => (
            <TouchableOpacity
              key={sub}
              style={[styles.selectorPill, subject === sub && styles.selectorPillActive]}
              onPress={() => setSubject(sub)}
            >
              <Text style={[styles.selectorPillText, subject === sub && styles.selectorPillTextActive]}>
                {sub}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ASSIGNMENT TITLE */}
        <Text style={styles.label}>Assignment Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Term 1 Geometry 3D Proof Model"
          placeholderTextColor="#94a3b8"
          value={title}
          onChangeText={setTitle}
        />

        {/* MARKS & DEADLINE ROW */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Max Marks *</Text>
            <TextInput
              style={styles.input}
              value={maxMarks}
              onChangeText={setMaxMarks}
              keyboardType="numeric"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Due Date *</Text>
            <TextInput
              style={styles.input}
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="YYYY-MM-DD"
            />
          </View>
        </View>

        {/* GUIDELINES & INSTRUCTIONS */}
        <Text style={styles.label}>Guidelines & Instructions *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe assignment goals, submission format, requirements, and reference notes..."
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* GRADING RUBRIC TOGGLE */}
        <View style={styles.rubricCard}>
          <View style={styles.rubricHeader}>
            <View>
              <Text style={styles.rubricTitle}>Enable Detailed Grading Rubric</Text>
              <Text style={styles.rubricSub}>Break down marks into presentation, accuracy & originality</Text>
            </View>
            <Switch
              value={enableRubric}
              onValueChange={setEnableRubric}
              trackColor={{ false: '#cbd5e1', true: '#ddd6fe' }}
              thumbColor={enableRubric ? '#7c3aed' : '#f1f5f9'}
            />
          </View>

          {enableRubric && (
            <View style={styles.rubricItems}>
              <View style={styles.rubricItemRow}>
                <Text style={styles.rubricItemName}>Concept & Technical Accuracy</Text>
                <Text style={styles.rubricItemPts}>20 pts</Text>
              </View>
              <View style={styles.rubricItemRow}>
                <Text style={styles.rubricItemName}>3D Model Presentation & Neatness</Text>
                <Text style={styles.rubricItemPts}>15 pts</Text>
              </View>
              <View style={styles.rubricItemRow}>
                <Text style={styles.rubricItemName}>Timely Submission & Research</Text>
                <Text style={styles.rubricItemPts}>15 pts</Text>
              </View>
            </View>
          )}
        </View>

        {/* ATTACHMENTS SECTION */}
        <View style={styles.attachmentSection}>
          <View style={styles.attachmentHeader}>
            <Text style={styles.label}>Attachments & Reference Material</Text>
            <TouchableOpacity style={styles.addAttachBtn} onPress={handleAddAttachment}>
              <Plus size={14} color="#7c3aed" />
              <Text style={styles.addAttachText}>Attach File</Text>
            </TouchableOpacity>
          </View>

          {attachedFiles.map((file, idx) => (
            <View key={idx} style={styles.fileCard}>
              <Paperclip size={16} color="#7c3aed" />
              <View style={{ flex: 1 }}>
                <Text style={styles.fileName}>{file.name}</Text>
                <Text style={styles.fileSize}>{file.size}</Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveAttachment(idx)}>
                <Trash2 size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ACTIONS */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.draftBtn}
            onPress={() => handlePublish(true)}
          >
            <Text style={styles.draftBtnText}>Save Draft</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.publishBtn}
            onPress={() => handlePublish(false)}
          >
            <Upload size={18} color="#ffffff" />
            <Text style={styles.publishBtnText}>Publish Assignment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justify: 'center',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  sectionHeaderTitle: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 6, marginTop: 10 },
  pillRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 6 },
  selectorPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1'
  },
  selectorPillActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  selectorPillText: { fontSize: 13, fontWeight: '700', color: '#475569' },
  selectorPillTextActive: { color: '#ffffff' },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#0f172a'
  },
  row: { flexDirection: 'row', gap: 12 },
  textArea: { height: 100, textAlignVertical: 'top', paddingTop: 12 },
  rubricCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  rubricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rubricTitle: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  rubricSub: { fontSize: 11, color: '#64748b', marginTop: 2, maxWidth: 220 },
  rubricItems: { marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f1f5f9', gap: 6 },
  rubricItemRow: { flexDirection: 'row', justifyContent: 'space-between' },
  rubricItemName: { fontSize: 12, color: '#475569', fontWeight: '600' },
  rubricItemPts: { fontSize: 12, fontWeight: '800', color: '#7c3aed' },
  attachmentSection: { marginTop: 14 },
  attachmentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addAttachBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addAttachText: { fontSize: 12, fontWeight: '800', color: '#7c3aed' },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 8
  },
  fileName: { fontSize: 13, fontWeight: '700', color: '#0f172a' },
  fileSize: { fontSize: 11, color: '#94a3b8' },
  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 24, marginBottom: 20 },
  draftBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    justify: 'center',
    alignItems: 'center'
  },
  draftBtnText: { fontSize: 14, fontWeight: '800', color: '#475569' },
  publishBtn: {
    flex: 2,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
    gap: 8
  },
  publishBtnText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
