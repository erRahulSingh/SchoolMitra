import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, StatusBar, Alert } from 'react-native';
import { ChevronLeft, ChevronDown, Camera, UploadCloud } from 'lucide-react-native';

export default function NewRequestScreen({ navigation }: any) {
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    Alert.alert('Request Submitted 🚀', 'Your request #SR1235 has been submitted successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Request</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Form Group */}
        <View style={styles.formCard}>
          
          {/* Request Category */}
          <Text style={styles.labelTitle}>Request Category</Text>
          <TouchableOpacity style={styles.dropdownInput} activeOpacity={0.8}>
            <Text style={styles.dropdownPlaceholder}>{category || 'Select Category'}</Text>
            <ChevronDown size={18} color="#64748b" />
          </TouchableOpacity>

          {/* Subject */}
          <Text style={styles.labelTitle}>Subject</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter subject"
            placeholderTextColor="#94a3b8"
            value={subject}
            onChangeText={setSubject}
          />

          {/* Description */}
          <Text style={styles.labelTitle}>Description</Text>
          <View style={styles.textareaWrapper}>
            <TextInput
              style={styles.textareaInput}
              placeholder="Enter detailed description..."
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
              maxLength={500}
            />
            <Text style={styles.charCounter}>{description.length}/500</Text>
          </View>

          {/* Attachments */}
          <Text style={styles.labelTitle}>Attachments (Optional)</Text>
          <View style={styles.attachmentsRow}>
            <TouchableOpacity style={styles.cameraSquareBtn} activeOpacity={0.75}>
              <Camera size={22} color="#2563eb" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.75}>
              <UploadCloud size={20} color="#2563eb" />
              <Text style={styles.uploadBtnText}>Upload File</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Submit Request Button */}
        <TouchableOpacity 
          style={styles.submitBtn} 
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Submit Request</Text>
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
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  labelTitle: { fontSize: 13, fontWeight: '900', color: '#0f172a', marginBottom: 8, marginTop: 6 },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  dropdownPlaceholder: { fontSize: 13, color: '#94a3b8', fontWeight: '600' },

  textInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 13,
    color: '#0f172a',
    fontWeight: '600',
    marginBottom: 16,
  },

  textareaWrapper: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  textareaInput: {
    height: 110,
    fontSize: 13,
    color: '#0f172a',
    fontWeight: '500',
  },
  charCounter: { fontSize: 11, color: '#cbd5e1', fontWeight: '600', textAlign: 'right', marginTop: 4 },

  attachmentsRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cameraSquareBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  uploadBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#eff6ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  uploadBtnText: { fontSize: 13, fontWeight: '800', color: '#2563eb' },

  submitBtn: {
    backgroundColor: '#1d4ed8',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  submitBtnText: { fontSize: 15, fontWeight: '900', color: '#ffffff' },
});
