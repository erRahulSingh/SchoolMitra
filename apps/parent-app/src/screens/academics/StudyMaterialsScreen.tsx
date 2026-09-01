import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Search, Folder, ChevronRight } from 'lucide-react-native';

export default function StudyMaterialsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Subjects', 'Documents', 'Videos'];

  const [foldersList, setFoldersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const studentId = "647b0a7d903e1c001f3eabcd"; // Mock student
        const res = await fetch(`http://10.0.2.2:5000/api/v1/study-materials/student/${studentId}`);
        const data = await res.json();
        
        if (data.data && data.data.materials) {
          // Group by Subject
          const subjectMap: Record<string, number> = {};
          data.data.materials.forEach((mat: any) => {
            const subName = mat.subjectId?.subjectName || 'General';
            subjectMap[subName] = (subjectMap[subName] || 0) + 1;
          });

          const formatted = Object.keys(subjectMap).map((key, idx) => {
            const colors = [
              { color: '#7c3aed', bg: '#f3e8ff' },
              { color: '#16a34a', bg: '#dcfce7' },
              { color: '#ea580c', bg: '#ffedd5' },
              { color: '#0284c7', bg: '#e0f2fe' }
            ];
            const c = colors[idx % colors.length];
            return {
              subject: key,
              materialsCount: `${subjectMap[key]} Materials`,
              color: c.color,
              bg: c.bg
            };
          });

          setFoldersList(formatted);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Study Materials</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Search size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Category Pills Row */}
        <View style={styles.pillsRow}>
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.pillBtn, isActive && styles.pillActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.75}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Folder Cards List */}
        <View style={styles.listCard}>
          {foldersList.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.folderRow, idx < foldersList.length - 1 && styles.rowBorder]}
              onPress={() => navigation.navigate('SubjectDetails')}
              activeOpacity={0.7}
            >
              <View style={[styles.iconSquare, { backgroundColor: item.bg }]}>
                <Folder size={22} color={item.color} fill={item.color} />
              </View>

              <View style={styles.infoCol}>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <Text style={styles.countText}>{item.materialsCount}</Text>
              </View>

              <ChevronRight size={18} color="#94a3b8" />
            </TouchableOpacity>
          ))}
        </View>

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
  searchBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Category Pills
  pillsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  pillBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  pillText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  pillTextActive: { color: '#ffffff', fontWeight: '900' },

  // List Card
  listCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  folderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconSquare: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: { flex: 1 },
  subjectText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  countText: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 2 },
});
