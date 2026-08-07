import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  FileText,
  Video,
  Download,
  Share2,
  Eye,
  BookOpen,
  Play,
  Maximize2,
  CheckCircle2,
  Trash2,
  Sparkles,
  Users
} from 'lucide-react-native';

export default function MaterialDetailsScreen({ route, navigation }: any) {
  const material = route?.params?.material || {
    id: 'mat_1',
    title: 'Chapter 4 — Geometry Axioms & Proofs Study Guide',
    subject: 'Mathematics',
    class: 'Class 8-A',
    category: 'Lecture Notes',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    uploadDate: '05 Aug 2026',
    downloads: 42,
    views: 120,
    description: 'Comprehensive formulas, 3D model steps, and solved practice questions for Chapter 4.'
  };

  const [activeTab, setActiveTab] = useState<'Preview' | 'Analytics'>('Preview');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const studentActivityLog = [
    { name: 'Aarav Gupta', roll: '01', action: 'Downloaded PDF', time: '05 Aug, 04:20 PM' },
    { name: 'Priya Nair', roll: '04', action: 'Viewed Document', time: '05 Aug, 05:15 PM' },
    { name: 'Kabir Mehta', roll: '12', action: 'Downloaded PDF', time: '06 Aug, 09:30 AM' },
    { name: 'Rohan Verma', roll: '03', action: 'Viewed Document', time: '06 Aug, 11:00 AM' }
  ];

  const handleDownload = () => {
    Alert.alert('Downloading 📥', `Downloading "${material.title}" (${material.fileSize})...`);
  };

  const handleShare = () => {
    Alert.alert('Share Link 🔗', 'Direct download link copied to clipboard & shared to Class WhatsApp group!');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Material',
      `Are you sure you want to remove "${material.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Deleted', 'Material removed from library.');
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Material Details</Text>
        <View style={styles.headerRightActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={handleShare}>
            <Share2 size={18} color="#64748b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={handleDelete}>
            <Trash2 size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HERO TITLE & METADATA */}
        <View style={styles.heroCard}>
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{material.category}</Text>
            </View>
            <View style={styles.classBadge}>
              <Text style={styles.classBadgeText}>{material.class}</Text>
            </View>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{material.fileType}</Text>
            </View>
          </View>

          <Text style={styles.materialTitle}>{material.title}</Text>
          <Text style={styles.subjectText}>{material.subject} • Uploaded {material.uploadDate}</Text>
        </View>

        {/* TAB NAVIGATION: PREVIEW vs ANALYTICS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'Preview' && styles.tabBtnActive]}
            onPress={() => setActiveTab('Preview')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'Preview' && styles.tabBtnTextActive]}>
              File Preview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'Analytics' && styles.tabBtnActive]}
            onPress={() => setActiveTab('Analytics')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'Analytics' && styles.tabBtnTextActive]}>
              Student Activity ({material.downloads})
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Preview' ? (
          <View>
            {/* FILE PREVIEW CONTAINER */}
            {material.fileType === 'MP4' ? (
              /* VIDEO PLAYER MOCKUP */
              <View style={styles.videoPlayerCard}>
                <View style={styles.videoFrame}>
                  <TouchableOpacity
                    style={styles.playCenterBtn}
                    onPress={() => setIsPlayingVideo(!isPlayingVideo)}
                  >
                    <Play size={28} color="#ffffff" fill="#ffffff" />
                  </TouchableOpacity>
                  <Text style={styles.videoTimeTag}>
                    {isPlayingVideo ? 'Playing... 04:15' : '18:30 min'}
                  </Text>
                  <TouchableOpacity style={styles.fullscreenBtn}>
                    <Maximize2 size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.videoControlsRow}>
                  <Text style={styles.videoStatusText}>
                    {isPlayingVideo ? '▶ Video Streaming Active' : 'Tap play to view lecture'}
                  </Text>
                </View>
              </View>
            ) : (
              /* DOCUMENT READER MOCKUP */
              <View style={styles.documentCard}>
                <View style={styles.docHeaderRow}>
                  <FileText size={18} color="#7c3aed" />
                  <Text style={styles.docHeaderTitle}>Document Preview</Text>
                  <Text style={styles.pageCounter}>Page {currentPage} of 12</Text>
                </View>

                <View style={styles.docPageMock}>
                  <Text style={styles.docHeadingText}>Chapter 4: Axioms of Geometry</Text>
                  <Text style={styles.docBodyText}>
                    Axiom 1: Things which are equal to the same thing are equal to one another.
                  </Text>
                  <Text style={styles.docBodyText}>
                    Axiom 2: If equals are added to equals, the wholes are equal.
                  </Text>
                  <Text style={styles.docBodyText}>
                    Axiom 3: If equals are subtracted from equals, the remainders are equal.
                  </Text>
                  <View style={styles.diagramBox}>
                    <Text style={styles.diagramText}>[ Interactive 3D Geometry Proof Diagram ]</Text>
                  </View>
                </View>

                <View style={styles.docFooterRow}>
                  <TouchableOpacity
                    style={styles.pageNavBtn}
                    disabled={currentPage <= 1}
                    onPress={() => setCurrentPage(currentPage - 1)}
                  >
                    <Text style={styles.pageNavText}>Previous Page</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pageNavBtn}
                    onPress={() => setCurrentPage(currentPage + 1)}
                  >
                    <Text style={styles.pageNavText}>Next Page</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* DESCRIPTION & NOTES */}
            <View style={styles.notesCard}>
              <Text style={styles.notesHeading}>Educator Overview & Notes</Text>
              <Text style={styles.notesText}>{material.description}</Text>
            </View>

            {/* ACTION BUTTONS */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
                <Download size={18} color="#ffffff" />
                <Text style={styles.downloadBtnText}>Download File ({material.fileSize})</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* ANALYTICS / STUDENT ACTIVITY TAB */
          <View>
            {/* STATS OVERVIEW ROW */}
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Eye size={20} color="#7c3aed" />
                <Text style={styles.statVal}>{material.views}</Text>
                <Text style={styles.statLabel}>Total Views</Text>
              </View>

              <View style={styles.statBox}>
                <Download size={20} color="#16a34a" />
                <Text style={[styles.statVal, { color: '#16a34a' }]}>{material.downloads}</Text>
                <Text style={styles.statLabel}>Downloads</Text>
              </View>
            </View>

            {/* LOG LIST */}
            <View style={styles.logCard}>
              <Text style={styles.logHeading}>Recent Student Downloads</Text>
              {studentActivityLog.map((log, i) => (
                <View key={i} style={styles.logItem}>
                  <View style={styles.logAvatar}>
                    <Text style={styles.logAvatarText}>{log.name.substring(0, 2)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.logName}>{log.name} (Roll {log.roll})</Text>
                    <Text style={styles.logTime}>{log.action} • {log.time}</Text>
                  </View>
                  <CheckCircle2 size={16} color="#16a34a" />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justify: 'center',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  headerRightActions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justify: 'center',
    alignItems: 'center'
  },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 14
  },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  categoryBadge: { backgroundColor: '#f3e8ff', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  categoryBadgeText: { fontSize: 11, fontWeight: '800', color: '#7c3aed' },
  classBadge: { backgroundColor: '#eff6ff', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  classBadgeText: { fontSize: 11, fontWeight: '800', color: '#2563eb' },
  typeBadge: { backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  typeBadgeText: { fontSize: 11, fontWeight: '800', color: '#475569' },
  materialTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a', marginBottom: 4 },
  subjectText: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 3,
    marginBottom: 16
  },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  tabBtnActive: { backgroundColor: '#ffffff' },
  tabBtnText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  tabBtnTextActive: { color: '#7c3aed' },
  videoPlayerCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16
  },
  videoFrame: {
    height: 180,
    backgroundColor: '#1e293b',
    justify: 'center',
    alignItems: 'center'
  },
  playCenterBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7c3aed',
    justify: 'center',
    alignItems: 'center'
  },
  videoTimeTag: { position: 'absolute', bottom: 10, left: 12, color: '#ffffff', fontSize: 11, fontWeight: '700' },
  fullscreenBtn: { position: 'absolute', bottom: 10, right: 12 },
  videoControlsRow: { padding: 12, backgroundColor: '#0f172a' },
  videoStatusText: { color: '#cbd5e1', fontSize: 12, fontWeight: '600' },
  documentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16
  },
  docHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  docHeaderTitle: { fontSize: 14, fontWeight: '800', color: '#0f172a', flex: 1 },
  pageCounter: { fontSize: 12, color: '#7c3aed', fontWeight: '700' },
  docPageMock: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  docHeadingText: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  docBodyText: { fontSize: 13, color: '#334155', lineHeight: 20, marginBottom: 6 },
  diagramBox: {
    backgroundColor: '#ede9fe',
    height: 70,
    borderRadius: 10,
    justify: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  diagramText: { fontSize: 12, fontWeight: '700', color: '#6d28d9' },
  docFooterRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  pageNavBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#f1f5f9', borderRadius: 8 },
  pageNavText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  notesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16
  },
  notesHeading: { fontSize: 14, fontWeight: '800', color: '#0f172a', marginBottom: 6 },
  notesText: { fontSize: 13, color: '#64748b', lineHeight: 20 },
  actionRow: { marginBottom: 20 },
  downloadBtn: {
    flexDirection: 'row',
    justify: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#7c3aed',
    height: 50,
    borderRadius: 14
  },
  downloadBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 14 },
  statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  statVal: { fontSize: 22, fontWeight: '900', color: '#0f172a', marginTop: 4 },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 2 },
  logCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  logHeading: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  logAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3e8ff',
    justify: 'center',
    alignItems: 'center'
  },
  logAvatarText: { fontSize: 13, fontWeight: '800', color: '#7c3aed' },
  logName: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  logTime: { fontSize: 11, color: '#94a3b8', marginTop: 2 }
});
