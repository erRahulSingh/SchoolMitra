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
  FileText,
  X,
  Plus,
  UploadCloud
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function UploadMaterialScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('File');
  const [selectedClass, setSelectedClass] = useState('Class 8 - A');
  const [subject, setSubject] = useState('Science');
  const [title, setTitle] = useState('Photosynthesis in Plants');
  const [desc, setDesc] = useState(
    'This chapter explains the process of photosynthesis with detailed diagrams and examples.'
  );
  const [attachments, setAttachments] = useState<any[]>([
    { name: 'Photosynthesis.pdf', size: '2.4 MB', type: 'PDF' }
  ]);

  const handleUpload = async () => {
    if (!title.trim() || !desc.trim()) {
      Alert.alert('Validation Error', 'Please complete title and description.');
      return;
    }

    try {
      // Mock class and subject IDs for demo
      const classId = '647b0a7d903e1c001f3eabc1'; 
      const subjectId = '647b0a7d903e1c001f3eabc4';
      
      // Determine file type from active tab or file extension
      const fileType = activeTab === 'File' ? 'PDF' : (activeTab === 'Video' ? 'LINK' : 'LINK');

      const res = await fetch('http://10.0.2.2:5000/api/v1/study-materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: desc,
          classId,
          subjectId,
          teacherId: '647b0a7d903e1c001f3eabc3', // Mock teacher ID
          attachments: attachments.map(a => ({
            fileName: a.name,
            fileUrl: 'mock-url.pdf', // Mock URL
            fileType: fileType,
            fileSize: a.size
          }))
        })
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Upload Successful 🎉', `Successfully uploaded "${title}" study material!`);
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to upload material');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Network Error', 'Could not connect to server.');
    }
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
        <Text style={styles.headerTitle}>Upload Study Material</Text>
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
            <Text style={styles.heroTitle}>Share knowledge and</Text>
            <Text style={styles.heroTitleSub}>resources with your class.</Text>
          </View>
          <View style={styles.heroIconCircle}>
            <UploadCloud size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TABS PILLS */}
        <View style={styles.tabRow}>
          {['File', 'Video', 'Link'].map((tab) => (
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
          placeholder="Enter material title..."
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

        {/* ATTACHMENT FILES */}
        <Text style={styles.label}>Upload File</Text>
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

        {/* UPLOAD ACTION BUTTON */}
        <TouchableOpacity style={styles.publishBtn} onPress={handleUpload}>
          <Text style={styles.publishText}>Upload Material</Text>
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
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroTitleSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  tabPill: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabPillActive: { backgroundColor: '#7c3aed' },
  tabPillText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  tabPillTextActive: { color: '#ffffff' },
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
