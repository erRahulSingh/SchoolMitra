import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  ChevronDown,
  Calendar,
  FileText,
  X,
  Plus,
  Check
} from 'lucide-react-native';
import { socketService } from '../../services/socketService';

export default function CreateHomeworkScreen({ navigation }: any) {
  const [selectedClass, setSelectedClass] = useState('Class 8 - A');
  const [subject, setSubject] = useState('Mathematics');
  const [title, setTitle] = useState('Linear Equations Practice');
  const [desc, setDesc] = useState(
    'Solve questions 21 to 40 from Chapter 5 - Linear Equations. Write neat and step-by-step solutions.'
  );
  const [dueDate, setDueDate] = useState('25 May 2024');
  const [attachments, setAttachments] = useState<any[]>([
    { name: 'Linear_Equations_Questions.pdf', size: '2.4 MB', type: 'PDF' }
  ]);

  const handlePublish = () => {
    if (!title.trim() || !desc.trim()) {
      Alert.alert('Validation Error', 'Please complete title and description.');
      return;
    }
    socketService.syncHomework(title, selectedClass, subject, dueDate);
    Alert.alert('Success ✅', 'Homework assigned & broadcasted live via Socket.IO!');
    navigation.goBack();
  };

  const removeAttachment = (idx: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Homework</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={handlePublish}>
          <Check size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* CLASS SELECTOR */}
        <Text style={styles.label}>Class</Text>
        <TouchableOpacity style={styles.dropdownField} onPress={() => Alert.alert('Class', 'Select Class...')}>
          <Text style={styles.dropdownVal}>{selectedClass}</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* SUBJECT SELECTOR */}
        <Text style={styles.label}>Subject</Text>
        <TouchableOpacity style={styles.dropdownField} onPress={() => Alert.alert('Subject', 'Select Subject...')}>
          <Text style={styles.dropdownVal}>{subject}</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* TITLE INPUT */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter homework title..."
          placeholderTextColor="#94a3b8"
          value={title}
          onChangeText={setTitle}
        />

        {/* DESCRIPTION INPUT */}
        <Text style={styles.label}>Description</Text>
        <View style={styles.descInputContainer}>
          <TextInput
            style={styles.descInput}
            placeholder="Type instructions here..."
            placeholderTextColor="#94a3b8"
            multiline
            maxLength={250}
            value={desc}
            onChangeText={setDesc}
          />
          <Text style={styles.counterText}>{desc.length}/250</Text>
        </View>

        {/* DUE DATE INPUT */}
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity style={styles.dateField} onPress={() => Alert.alert('Date', 'Select Due Date...')}>
          <Calendar size={18} color="#64748b" style={{ marginRight: 10 }} />
          <Text style={styles.dateVal}>{dueDate}</Text>
        </TouchableOpacity>

        {/* ATTACHMENT FILES */}
        <Text style={styles.label}>Attach File (Optional)</Text>
        <View style={styles.attachmentsContainer}>
          {attachments.map((file, idx) => (
            <View key={idx} style={styles.fileRow}>
              <View style={styles.fileIconBox}>
                <FileText size={20} color="#7c3aed" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                <Text style={styles.fileSize}>{file.type}  •  {file.size}</Text>
              </View>

              <TouchableOpacity onPress={() => removeAttachment(idx)}>
                <X size={18} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Add more files button */}
          <TouchableOpacity
            style={styles.addFilesBtn}
            onPress={() => Alert.alert('Attach File', 'Select files to attach...')}
          >
            <Plus size={16} color="#7c3aed" style={{ marginRight: 6 }} />
            <Text style={styles.addFilesText}>Add More Files</Text>
          </TouchableOpacity>
        </View>

        {/* PUBLISH ACTION BUTTON */}
        <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
          <Text style={styles.publishText}>Publish Homework</Text>
        </TouchableOpacity>
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
  saveBtn: {
    position: 'absolute',
    right: 20,
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
  label: { fontSize: 13, fontWeight: '800', color: '#475569', marginBottom: 8, marginTop: 14 },
  dropdownField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  dropdownVal: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '700'
  },
  descInputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    minHeight: 120
  },
  descInput: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600',
    textAlignVertical: 'top'
  },
  counterText: { fontSize: 11, color: '#94a3b8', fontWeight: '800', alignSelf: 'flex-end', marginTop: 4 },
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  dateVal: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  attachmentsContainer: { gap: 10, marginTop: 6 },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  fileIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fileName: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  fileSize: { fontSize: 11, color: '#94a3b8', fontWeight: '700', marginTop: 2 },
  addFilesBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    height: 46,
    borderWidth: 1.5,
    borderColor: '#7c3aed',
    borderStyle: 'dashed'
  },
  addFilesText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  publishBtn: {
    height: 50,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 40
  },
  publishText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
