import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { GraduationCap, Users, BookOpen, ChevronRight, ChevronLeft, MapPin, Calendar } from 'lucide-react-native';

export default function ClassDetailsScreen({ navigation, route }: any) {
  const className = route.params?.className || 'Class 8-A';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{className} Details</Text>
        <GraduationCap size={22} color="#7c3aed" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HERO CARD */}
        <View style={styles.heroCard}>
          <Text style={styles.classNameTitle}>{className} Overview</Text>
          <Text style={styles.classSub}>Class Teacher: Rahul Sharma • Room 204</Text>
        </View>

        {/* QUICK MENU BUTTONS */}
        <TouchableOpacity 
          style={styles.menuCard} 
          onPress={() => navigation.navigate('StudentsList')}
        >
          <View style={styles.menuLeft}>
            <Users size={20} color="#7c3aed" />
            <Text style={styles.menuTitle}>View Enrolled Students (42)</Text>
          </View>
          <ChevronRight size={18} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuCard} 
          onPress={() => navigation.navigate('SubjectDetails')}
        >
          <View style={styles.menuLeft}>
            <BookOpen size={20} color="#3b82f6" />
            <Text style={styles.menuTitle}>Subject Curriculum & Syllabus</Text>
          </View>
          <ChevronRight size={18} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuCard} 
          onPress={() => navigation.navigate('Timetable')}
        >
          <View style={styles.menuLeft}>
            <Calendar size={20} color="#10b981" />
            <Text style={styles.menuTitle}>Class Timetable Schedule</Text>
          </View>
          <ChevronRight size={18} color="#94a3b8" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: { backgroundColor: '#1e293b', borderRadius: 20, padding: 20, marginBottom: 16 },
  classNameTitle: { fontSize: 22, fontWeight: '900', color: '#ffffff' },
  classSub: { fontSize: 13, color: '#cbd5e1', marginTop: 4 },
  menuCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a' }
});
