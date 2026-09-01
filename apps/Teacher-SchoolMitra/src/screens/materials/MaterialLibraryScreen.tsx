import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Search,
  SlidersHorizontal,
  MoreVertical,
  FileText,
  Video,
  Link,
  Folder
} from 'lucide-react-native';

export default function MaterialLibraryScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Notes', 'PDF', 'Video', 'Links'];

  const [allMaterials, setAllMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:5000/api/v1/study-materials`);
        const data = await res.json();
        
        if (data.data && data.data.materials) {
          const formatted = data.data.materials.map((item: any) => {
            let iconComp = FileText;
            let iconColor = '#dc2626';
            let iconBg = '#fef2f2';
            
            const fileType = item.attachments[0]?.fileType || 'PDF';
            if (fileType === 'LINK') {
              iconComp = Link;
              iconColor = '#ea580c';
              iconBg = '#ffedd5';
            } else if (fileType === 'VIDEO') {
              iconComp = Video;
              iconColor = '#16a34a';
              iconBg = '#ecfdf5';
            }

            return {
              id: item._id,
              title: item.title,
              sub: `${item.subjectId?.subjectName || 'Subject'}  •  ${new Date(item.createdAt).toLocaleDateString()}`,
              details: `${fileType}  •  ${item.attachments[0]?.fileSize || 'Unknown Size'}`,
              icon: iconComp,
              iconColor: iconColor,
              iconBg: iconBg,
              type: fileType === 'LINK' ? 'Links' : fileType
            };
          });
          setAllMaterials(formatted);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const filteredMaterials = activeTab === 'All' 
    ? allMaterials 
    : allMaterials.filter(m => m.type === activeTab || (activeTab === 'Notes' && m.type === 'PDF'));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Material Library</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.actionIconBtn}>
            <Search size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIconBtn}>
            <SlidersHorizontal size={18} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* TABS PILLS */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabPill, activeTab === tab && styles.tabPillActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabPillText, activeTab === tab && styles.tabPillTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DROPDOWN SELECTORS ROW */}
        <View style={styles.dropdownRow}>
          <TouchableOpacity style={styles.dropdownField} onPress={() => Alert.alert('Class', 'Select Class...')}>
            <Text style={styles.dropdownLabel}>Class: 8 - A</Text>
            <ChevronLeft size={16} color="#64748b" style={{ transform: [{ rotate: '-90deg' }] }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.dropdownField} onPress={() => Alert.alert('Subject', 'Select Subject...')}>
            <Text style={styles.dropdownLabel}>Subject: All</Text>
            <ChevronLeft size={16} color="#64748b" style={{ transform: [{ rotate: '-90deg' }] }} />
          </TouchableOpacity>
        </View>

        {/* ALL MATERIALS */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>All Materials</Text>
        <View style={styles.listContainer}>
          {filteredMaterials.map((mat) => {
            const IconComp = mat.icon;
            return (
              <View key={mat.id} style={styles.materialCard}>
                <View style={[styles.iconBox, { backgroundColor: mat.iconBg }]}>
                  <IconComp size={20} color={mat.iconColor} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.materialTitle}>{mat.title}</Text>
                  <Text style={styles.materialSub}>{mat.sub}</Text>
                  <Text style={styles.materialDetails}>{mat.details}</Text>
                </View>

                <TouchableOpacity onPress={() => Alert.alert('Options', 'Action triggers...')}>
                  <MoreVertical size={18} color="#94a3b8" />
                </TouchableOpacity>
              </View>
            );
          })}
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
  headerRight: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    gap: 8
  },
  actionIconBtn: {
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
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  tabPillActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  tabPillText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  tabPillTextActive: { color: '#ffffff' },
  dropdownRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  dropdownField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  dropdownLabel: { fontSize: 13, fontWeight: '700', color: '#475569' },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 14 },
  listContainer: { gap: 12 },
  materialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  materialTitle: { fontSize: 14, fontWeight: '800', color: '#0f172a' },
  materialSub: { fontSize: 12, color: '#64748b', marginTop: 3, fontWeight: '600' },
  materialDetails: { fontSize: 11, color: '#94a3b8', marginTop: 4, fontWeight: '600' }
});
