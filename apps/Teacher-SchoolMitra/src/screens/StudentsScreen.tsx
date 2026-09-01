import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import { Search, User, ChevronLeft, Phone, Mail, ChevronRight } from 'lucide-react-native';

export default function StudentsScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoster();
  }, []);

  const fetchRoster = async () => {
    try {
      const res = await fetch(`http://10.0.2.2:5000/api/v1/attendance/student/class?classId=Class 8&sectionId=A`);
      const json = await res.json();
      if (json.success && json.data.logs) {
        setStudents(json.data.logs.map((log: any) => ({
          id: log.studentId,
          roll: log.rollNo || '00',
          name: log.studentName,
          class: 'Class 8-A',
          parent: 'Parent',
          phone: '+91 98XXXXXX',
          attendance: '95%'
        })));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Directory 360°</Text>
        <User size={22} color="#7c3aed" />
      </View>

      <View style={styles.searchBar}>
        <Search size={18} color="#94a3b8" />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search student by name or roll no..." 
          value={search} 
          onChangeText={setSearch} 
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#7c3aed" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {filtered.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{item.name.split(' ').map((n: string) => n[0]).join('')}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>Roll No. {item.roll} • {item.class}</Text>
                <Text style={styles.parentText}>Parent: {item.parent}</Text>
              </View>

              <View style={styles.rightCol}>
                <View style={styles.attendanceBadge}>
                  <Text style={styles.attendanceText}>{item.attendance}</Text>
                </View>
                <ChevronRight size={18} color="#94a3b8" style={{ marginTop: 6 }} />
              </View>
            </TouchableOpacity>
          ))}
          {filtered.length === 0 && (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Text style={{ color: '#64748b' }}>No students found.</Text>
            </View>
          )}
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
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 20, marginVertical: 12, backgroundColor: '#ffffff', borderWidth: 1.5, borderColor: '#e2e8f0', borderRadius: 14, paddingHorizontal: 14, height: 46 },
  searchInput: { flex: 1, fontSize: 14, color: '#0f172a' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#ffffff', fontWeight: '900', fontSize: 15 },
  name: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  meta: { fontSize: 12, color: '#64748b', marginTop: 2 },
  parentText: { fontSize: 12, color: '#7c3aed', fontWeight: '600', marginTop: 2 },
  rightCol: { alignItems: 'flex-end' },
  attendanceBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  attendanceText: { fontSize: 12, fontWeight: '800', color: '#166534' }
});
