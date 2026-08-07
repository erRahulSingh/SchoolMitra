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
  Alert,
  Platform
} from 'react-native';
import {
  ChevronLeft,
  MoreVertical,
  SlidersHorizontal,
  Search,
  User,
  ChevronRight,
  FolderOpen
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function StudentPortfolioScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const portfolios = [
    { id: '1', name: 'Aarav Sharma', class: 'Class 8 - A', attendance: '92%', grade: '4.5', achievements: '12' },
    { id: '2', name: 'Diya Verma', class: 'Class 8 - A', attendance: '89%', grade: '4.2', achievements: '10' },
    { id: '3', name: 'Rohan Singh', class: 'Class 8 - A', attendance: '94%', grade: '4.7', achievements: '15' },
    { id: '4', name: 'Ananya Gupta', class: 'Class 8 - A', attendance: '90%', grade: '4.3', achievements: '11' }
  ];

  const filteredPortfolios = portfolios.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Portfolio</Text>
        <TouchableOpacity style={styles.moreBtn}>
          <MoreVertical size={18} color="#0f172a" />
        </TouchableOpacity>
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
            <Text style={styles.heroTitle}>Track each student's</Text>
            <Text style={styles.heroTitle}>growth and</Text>
            <Text style={styles.heroTitleSub}>achievements over time.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <FolderOpen size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* SEARCH BAR */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Search size={18} color="#94a3b8" style={styles.searchIcon} />
          <TouchableOpacity style={styles.filterBtn}>
            <SlidersHorizontal size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* PORTFOLIOS LIST */}
        <View style={styles.listContainer}>
          {filteredPortfolios.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.portfolioCard}
              onPress={() => navigation.navigate('StudentProfile', { student: item })}
            >
              <View style={styles.studentInfoRow}>
                <View style={styles.avatarCircle}>
                  <User size={18} color="#7c3aed" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.className}>{item.class}</Text>
                </View>

                <ChevronRight size={18} color="#94a3b8" />
              </View>

              <View style={styles.metricsRow}>
                <View style={styles.metricCol}>
                  <Text style={styles.metricVal}>{item.attendance}</Text>
                  <Text style={styles.metricLabel}>Attendance</Text>
                </View>
                <View style={styles.metricCol}>
                  <Text style={[styles.metricVal, { color: '#ea580c' }]}>{item.grade}</Text>
                  <Text style={styles.metricLabel}>Avg. Grade</Text>
                </View>
                <View style={[styles.metricCol, { borderRightWidth: 0 }]}>
                  <Text style={[styles.metricVal, { color: '#2563eb' }]}>{item.achievements}</Text>
                  <Text style={styles.metricLabel}>Achievements</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: Platform.OS === 'android' ? 64 + (StatusBar.currentHeight || 0) : 64
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
  moreBtn: {
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
  heroCard: {
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroTitleSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8
  },
  searchInput: {
    flex: 1,
    height: 46,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600'
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    top: 14
  },
  filterBtn: {
    width: 46,
    height: 46,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: { gap: 12, marginBottom: 20 },
  portfolioCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  studentInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  studentName: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  className: { fontSize: 11, color: '#64748b', fontWeight: '750', marginTop: 2 },
  metricsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginTop: 14,
    paddingTop: 14
  },
  metricCol: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f1f5f9'
  },
  metricVal: { fontSize: 14, fontWeight: '950', color: '#16a34a' },
  metricLabel: { fontSize: 10, color: '#94a3b8', fontWeight: '800', marginTop: 2 }
});
