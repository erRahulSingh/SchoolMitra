import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Check, X, Clock, Save, ChevronLeft, ShieldCheck } from 'lucide-react-native';

export default function Attendance({ navigation, route }: any) {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const classId = route?.params?.classId || 'Class 8';
  const sectionId = route?.params?.sectionId || 'A';

  useEffect(() => {
    fetchClassRoster();
  }, []);

  const fetchClassRoster = async () => {
    try {
      const res = await fetch(`http://10.0.2.2:5000/api/v1/attendance/student/class?classId=${classId}&sectionId=${sectionId}`);
      const json = await res.json();
      if (json.success && json.data.logs) {
        setStudents(json.data.logs.map((log: any) => ({
          id: log.studentId,
          roll: log.rollNo || '00',
          name: log.studentName,
          status: log.status || 'Present'
        })));
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch class roster');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = (id: string, newStatus: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    try {
      const records = students.map(s => ({
        studentId: s.id,
        status: s.status,
        className: classId,
        section: sectionId,
        date: new Date().toISOString().split('T')[0]
      }));

      const res = await fetch('http://10.0.2.2:5000/api/v1/attendance/student/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records })
      });
      const json = await res.json();
      
      if (json.success) {
        Alert.alert('Success ✅', 'Attendance saved & broadcasted live to Parent App!');
      } else {
        Alert.alert('Error', json.message || 'Failed to save attendance');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Network error while saving attendance');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Mark Attendance</Text>
          <Text style={styles.subtitle}>{classId}-{sectionId} • Live Update</Text>
        </View>
        <View style={styles.lockBadge}>
          <ShieldCheck size={16} color="#166534" />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={[styles.statVal, { color: '#10b981' }]}>
            {students.filter(s => s.status === 'Present').length}
          </Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statVal, { color: '#ef4444' }]}>
            {students.filter(s => s.status === 'Absent').length}
          </Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statVal, { color: '#f59e0b' }]}>
            {students.filter(s => s.status === 'Leave' || s.status === 'Late' || s.status === 'Half Day').length}
          </Text>
          <Text style={styles.statLabel}>Other</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {students.map((item) => (
          <View key={item.id} style={styles.studentCard}>
            <View style={styles.studentInfo}>
              <View style={styles.rollBadge}>
                <Text style={styles.rollText}>{item.roll}</Text>
              </View>
              <Text style={styles.studentName}>{item.name}</Text>
            </View>

            <View style={styles.toggleGroup}>
              <TouchableOpacity
                onPress={() => toggleStatus(item.id, 'Present')}
                style={[styles.toggleBtn, item.status === 'Present' && styles.presentBtn]}
              >
                <Text style={[styles.toggleText, item.status === 'Present' && styles.activeText]}>P</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => toggleStatus(item.id, 'Absent')}
                style={[styles.toggleBtn, item.status === 'Absent' && styles.absentBtn]}
              >
                <Text style={[styles.toggleText, item.status === 'Absent' && styles.activeText]}>A</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => toggleStatus(item.id, 'Leave')}
                style={[styles.toggleBtn, item.status === 'Leave' && styles.leaveBtn]}
              >
                <Text style={[styles.toggleText, item.status === 'Leave' && styles.activeText]}>L</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.saveFooter}>
        <TouchableOpacity onPress={handleSaveAttendance} style={styles.saveBtn} activeOpacity={0.8} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Save size={20} color="#ffffff" />}
          <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Submit & Broadcast Attendance'}</Text>
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
  lockBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#dcfce7', justifyContent: 'center', alignItems: 'center' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 14, gap: 12 },
  statBox: { flex: 1, backgroundColor: '#ffffff', borderRadius: 14, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  statVal: { fontSize: 20, fontWeight: '900' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 2 },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  studentCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  studentInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rollBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center' },
  rollText: { fontSize: 13, fontWeight: '800', color: '#475569' },
  studentName: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  toggleGroup: { flexDirection: 'row', gap: 6 },
  toggleBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center' },
  toggleText: { fontSize: 13, fontWeight: '800', color: '#64748b' },
  presentBtn: { backgroundColor: '#10b981' },
  absentBtn: { backgroundColor: '#ef4444' },
  leaveBtn: { backgroundColor: '#f59e0b' },
  activeText: { color: '#ffffff' },
  saveFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#ffffff', padding: 16, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  saveBtn: { height: 52, borderRadius: 14, backgroundColor: '#7c3aed', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  saveBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '800' }
});
