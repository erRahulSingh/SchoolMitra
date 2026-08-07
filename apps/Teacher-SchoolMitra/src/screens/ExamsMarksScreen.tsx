import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { Award, Save, ChevronLeft, ShieldCheck, CheckCircle2 } from 'lucide-react-native';

export default function ExamsMarksScreen({ navigation }: any) {
  const [studentsMarks, setStudentsMarks] = useState([
    { id: 'st_1', roll: '01', name: 'Aarav Gupta', theory: '78', practical: '18', total: '96' },
    { id: 'st_2', roll: '02', name: 'Ananya Patel', theory: '72', practical: '19', total: '91' },
    { id: 'st_3', roll: '03', name: 'Devansh Verma', theory: '65', practical: '15', total: '80' },
    { id: 'st_4', roll: '04', name: 'Isha Sharma', theory: '80', practical: '20', total: '100' },
    { id: 'st_5', roll: '05', name: 'Kavya Singh', theory: '70', practical: '17', total: '87' }
  ]);

  const updateMarks = (id: string, field: 'theory' | 'practical', value: string) => {
    setStudentsMarks(prev => prev.map(s => {
      if (s.id === id) {
        const theoryVal = field === 'theory' ? parseInt(value || '0') : parseInt(s.theory || '0');
        const pracVal = field === 'practical' ? parseInt(value || '0') : parseInt(s.practical || '0');
        return { ...s, [field]: value, total: (theoryVal + pracVal).toString() };
      }
      return s;
    }));
  };

  const handleSaveMarks = () => {
    Alert.alert('Marks Saved ✅', 'CBSE Mid-Term Examination marks saved and published to Parent App!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Mid-Term Marks Entry</Text>
          <Text style={styles.subtitle}>Class 8-A • Mathematics (Max: 100)</Text>
        </View>
        <Award size={24} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {studentsMarks.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.studentHeader}>
              <View style={styles.rollBadge}>
                <Text style={styles.rollText}>{item.roll}</Text>
              </View>
              <Text style={styles.studentName}>{item.name}</Text>
              <View style={styles.totalBadge}>
                <Text style={styles.totalText}>{item.total}/100</Text>
              </View>
            </View>

            <View style={styles.marksInputsRow}>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Theory (80)</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric" 
                  value={item.theory} 
                  onChangeText={(val) => updateMarks(item.id, 'theory', val)} 
                />
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Practical (20)</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric" 
                  value={item.practical} 
                  onChangeText={(val) => updateMarks(item.id, 'practical', val)} 
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveMarks} activeOpacity={0.8}>
          <Save size={20} color="#ffffff" />
          <Text style={styles.saveBtnText}>Publish Marks to Student Report Card</Text>
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
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  studentHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  rollBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center' },
  rollText: { fontSize: 13, fontWeight: '800', color: '#475569' },
  studentName: { flex: 1, fontSize: 15, fontWeight: '700', color: '#0f172a' },
  totalBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  totalText: { fontSize: 13, fontWeight: '800', color: '#166534' },
  marksInputsRow: { flexDirection: 'row', gap: 12 },
  inputBox: { flex: 1 },
  inputLabel: { fontSize: 12, color: '#64748b', fontWeight: '600', marginBottom: 4 },
  input: { backgroundColor: '#f8fafc', borderWidth: 1.5, borderColor: '#cbd5e1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, fontWeight: '700', color: '#0f172a', textAlign: 'center' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#ffffff', padding: 16, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  saveBtn: { height: 52, borderRadius: 14, backgroundColor: '#7c3aed', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  saveBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '800' }
});
