import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { Save, ChevronLeft, AlertTriangle } from 'lucide-react-native';

export default function EditAttendanceScreen({ navigation, route }: any) {
  const date = route.params?.date || '07 Aug 2026';
  const [reason, setReason] = useState('');
  const [students, setStudents] = useState([
    { id: 'st_1', roll: '01', name: 'Aarav Gupta', status: 'Present' },
    { id: 'st_2', roll: '02', name: 'Ananya Patel', status: 'Present' },
    { id: 'st_3', roll: '03', name: 'Devansh Verma', status: 'Absent' }
  ]);

  const toggleStatus = (id: string, newStatus: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleUpdate = () => {
    if (!reason) {
      Alert.alert('Edit Reason Required', 'Please provide a reason for editing submitted attendance.');
      return;
    }
    Alert.alert('Attendance Updated ✅', `Attendance log for ${date} updated with audit trail.`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Edit Attendance Log</Text>
          <Text style={styles.subtitle}>Class 8-A • {date}</Text>
        </View>
        <AlertTriangle size={22} color="#f59e0b" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.warningBox}>
          <AlertTriangle size={18} color="#b45309" />
          <Text style={styles.warningText}>Attendance edits require a mandatory audit reason and will be logged in school compliance records.</Text>
        </View>

        <Text style={styles.label}>Reason for Editing Attendance</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. Student arrived late with parent permission note" 
          value={reason} 
          onChangeText={setReason} 
        />

        <Text style={styles.sectionTitle}>Update Roster Status</Text>

        {students.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.name}>{item.roll}. {item.name}</Text>
            <View style={styles.btnRow}>
              {['Present', 'Absent', 'Leave'].map((st) => (
                <TouchableOpacity
                  key={st}
                  onPress={() => toggleStatus(item.id, st)}
                  style={[styles.pill, item.status === st && styles.activePill]}
                >
                  <Text style={[styles.pillText, item.status === st && styles.activePillText]}>{st}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
          <Save size={20} color="#ffffff" />
          <Text style={styles.saveBtnText}>Re-Submit & Save Audit Log</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  title: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  subtitle: { fontSize: 12, color: '#64748b' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 90 },
  warningBox: { flexDirection: 'row', gap: 10, backgroundColor: '#fef3c7', borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#fde68a' },
  warningText: { flex: 1, fontSize: 12, color: '#b45309', lineHeight: 18 },
  label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 6 },
  input: { backgroundColor: '#ffffff', borderWidth: 1.5, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: '#0f172a', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a', marginBottom: 10 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  name: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  btnRow: { flexDirection: 'row', gap: 6 },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#f1f5f9' },
  activePill: { backgroundColor: '#7c3aed' },
  pillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  activePillText: { color: '#ffffff' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#ffffff', padding: 16, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  saveBtn: { height: 50, borderRadius: 14, backgroundColor: '#7c3aed', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  saveBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '800' }
});
