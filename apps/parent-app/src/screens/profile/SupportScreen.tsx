import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, StatusBar, Alert } from 'react-native';
import { ChevronLeft, PhoneCall, Send } from 'lucide-react-native';

export default function SupportScreen({ navigation }: any) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!message) return;
    Alert.alert('Ticket Raised 🎫', 'Your support ticket has been submitted. School admin will respond shortly.');
    setSubject('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support & Helpline</Text>
        <PhoneCall size={20} color="#9333ea" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>School Helpline</Text>
          <Text style={styles.text}>Toll-Free: 1800-123-SCHOOL (7246)</Text>
          <Text style={styles.text}>Email: support@greenvalley.edu.in</Text>
          <Text style={styles.text}>Hours: Mon - Sat (8:00 AM - 4:00 PM)</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Raise a Support Ticket</Text>
          <TextInput style={styles.input} placeholder="Subject (e.g. Bus tracking issue)" placeholderTextColor="#94a3b8" value={subject} onChangeText={setSubject} />
          <TextInput style={[styles.input, { height: 100, textAlignVertical: 'top' }]} placeholder="Describe your issue..." placeholderTextColor="#94a3b8" multiline value={message} onChangeText={setMessage} />
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Send size={16} color="#ffffff" />
            <Text style={styles.submitText}>Submit Ticket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0', gap: 10 },
  title: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  text: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 14, padding: 14, fontSize: 14, color: '#0f172a', fontWeight: '600' },
  submitBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#4f46e5', padding: 14, borderRadius: 14, marginTop: 6 },
  submitText: { fontSize: 14, fontWeight: '900', color: '#ffffff' }
});
