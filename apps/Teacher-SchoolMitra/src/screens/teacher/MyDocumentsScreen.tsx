import React from 'react';
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
  FileText,
  FolderOpen,
  Award,
  Download,
  Plus,
  Image as ImageIcon
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MyDocumentsScreen({ navigation }: any) {
  const categories = [
    { label: 'Personal', count: '12 Documents', icon: FileText, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Professional', count: '8 Documents', icon: FolderOpen, color: '#ea580c', bg: '#ffedd5' },
    { label: 'Certificates', count: '15 Documents', icon: Award, color: '#7c3aed', bg: '#f3e8ff' },
    { label: 'Others', count: '6 Documents', icon: FileText, color: '#2563eb', bg: '#eff6ff' }
  ];

  const recentDocs = [
    { id: '1', name: 'Experience Certificate.pdf', size: '2.4 MB', date: '18 May 2024', icon: FileText, iconColor: '#dc2626', iconBg: '#fef2f2' },
    { id: '2', name: 'Appointment Letter.pdf', size: '1.8 MB', date: '10 May 2024', icon: FileText, iconColor: '#dc2626', iconBg: '#fef2f2' },
    { id: '3', name: 'ID Proof.jpg', size: '1.2 MB', date: '05 May 2024', icon: ImageIcon, iconColor: '#16a34a', iconBg: '#ecfdf5' },
    { id: '4', name: 'Resume.pdf', size: '2.1 MB', date: '01 May 2024', icon: FileText, iconColor: '#dc2626', iconBg: '#fef2f2' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Documents</Text>
        <TouchableOpacity style={styles.searchBtn} onPress={() => Alert.alert('Search', 'Search documents...')}>
          <Search size={18} color="#0f172a" />
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
            <Text style={styles.heroTitle}>Access your</Text>
            <Text style={styles.heroTitle}>important</Text>
            <Text style={styles.heroTitleSub}>documents.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <FolderOpen size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* DOCUMENT CATEGORIES */}
        <Text style={styles.sectionTitle}>Document Categories</Text>
        <View style={styles.grid}>
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={styles.gridItem}
                onPress={() => Alert.alert(cat.label, `Opening category: ${cat.label}...`)}
              >
                <View style={[styles.iconBox, { backgroundColor: cat.bg }]}>
                  <IconComp size={22} color={cat.color} />
                </View>
                <Text style={styles.gridLabel}>{cat.label}</Text>
                <Text style={styles.gridCount}>{cat.count}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* RECENT DOCUMENTS */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Documents</Text>
          <TouchableOpacity onPress={() => Alert.alert('View All', 'Showing all documents list...')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* RECENT DOCUMENTS LIST */}
        <View style={styles.listContainer}>
          {recentDocs.map((doc) => {
            const IconComp = doc.icon;
            return (
              <View key={doc.id} style={styles.docRowCard}>
                <View style={[styles.docIconBox, { backgroundColor: doc.iconBg }]}>
                  <IconComp size={20} color={doc.iconColor} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
                  <Text style={styles.docMeta}>{doc.size}  •  {doc.date}</Text>
                </View>

                <TouchableOpacity
                  style={styles.downloadBtn}
                  onPress={() => Alert.alert('Download', `Downloading ${doc.name}...`)}
                >
                  <Download size={18} color="#64748b" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* FLOATING ACTION BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => Alert.alert('Upload Document', 'Select document source to upload...')}
      >
        <Plus size={24} color="#ffffff" />
      </TouchableOpacity>
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
  searchBtn: {
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
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12, marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  gridItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  gridLabel: { fontSize: 13, fontWeight: '800', color: '#334155' },
  gridCount: { fontSize: 11, color: '#94a3b8', fontWeight: '700', marginTop: 4 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  viewAllText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  listContainer: { gap: 10, marginBottom: 50 },
  docRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  docIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  docName: { fontSize: 13, fontWeight: '800', color: '#334155' },
  docMeta: { fontSize: 11, color: '#94a3b8', fontWeight: '700', marginTop: 3 },
  downloadBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  }
});
