import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Search, User, ChevronLeft, Phone, Mail, ChevronRight } from 'lucide-react-native';

export default function StudentsScreen({ navigation }: any) {
  const [search, setSearch] = useState('');

  const students = [
    { id: 'st_1', roll: '01', name: 'Aarav Gupta', class: 'Class 8-A', parent: 'Rajesh Gupta', phone: '+91 98765 11111', attendance: '98%' },
    { id: 'st_2', roll: '02', name: 'Ananya Patel', class: 'Class 8-A', parent: 'Suresh Patel', phone: '+91 98765 22222', attendance: '95%' },
    { id: 'st_3', roll: '03', name: 'Devansh Verma', class: 'Class 8-A', parent: 'Vikram Verma', phone: '+91 98765 33333', attendance: '88%' },
    { id: 'st_4', roll: '04', name: 'Isha Sharma', class: 'Class 8-A', parent: 'Amit Sharma', phone: '+91 98765 44444', attendance: '100%' }
  ];

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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filtered.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{item.name.split(' ').map(n=>n[0]).join('')}</Text>
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
      </ScrollView>
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
