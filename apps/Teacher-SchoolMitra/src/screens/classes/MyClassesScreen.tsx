import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import {
  Menu,
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../../components/Header';

export default function MyClassesScreen({ navigation }: any) {
  const classesList = [
    { id: '1', badge: '8A', name: 'Class 8 - A', subject: 'Mathematics', desc: 'Section A • 42 Students', color: '#7c3aed', bg: '#f3e8ff' },
    { id: '2', badge: '9B', name: 'Class 9 - B', subject: 'Science', desc: 'Section B • 38 Students', color: '#16a34a', bg: '#dcfce7' },
    { id: '3', badge: '10A', name: 'Class 10 - A', subject: 'English', desc: 'Section A • 40 Students', color: '#2563eb', bg: '#eff6ff' },
    { id: '4', badge: '7C', name: 'Class 7 - C', subject: 'Social Science', desc: 'Section C • 35 Students', color: '#ea580c', bg: '#ffedd5' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* UNIFIED HEADER */}
      <Header navigation={navigation} title="My Classes" currentRoute="MyClasses" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* TOTAL CLASSES GRADIENT CARD */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroLabel}>Total Classes</Text>
            <Text style={styles.heroVal}>4</Text>
            <Text style={styles.heroSub}>Assigned to you</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Sparkles size={28} color="#ffffff" />
          </View>
        </LinearGradient>

        {/* CLASS CARDS LIST */}
        <View style={styles.listContainer}>
          {classesList.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.classCard}
              onPress={() => navigation.navigate('StudentsList', { classId: item.id })}
            >
              <View style={[styles.avatarCircle, { backgroundColor: item.bg }]}>
                <Text style={[styles.avatarText, { color: item.color }]}>{item.badge}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.className}>{item.name}</Text>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <Text style={styles.descText}>{item.desc}</Text>
              </View>

              <ChevronRight size={18} color="#cbd5e1" />
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
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: 64
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  menuBtn: {
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
  filterBtn: {
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
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  heroLabel: { fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', fontWeight: '700' },
  heroVal: { fontSize: 34, fontWeight: '900', color: '#ffffff', marginTop: 4 },
  heroSub: { fontSize: 12, color: 'rgba(255, 255, 255, 0.75)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: { gap: 12 },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: { fontSize: 15, fontWeight: '900' },
  className: { fontSize: 16, fontWeight: '900', color: '#0f172a' },
  subjectText: { fontSize: 13, color: '#64748b', marginTop: 2, fontWeight: '600' },
  descText: { fontSize: 11, color: '#94a3b8', marginTop: 4, fontWeight: '700' }
});
