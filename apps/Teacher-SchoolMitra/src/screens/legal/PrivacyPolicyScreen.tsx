import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  ShieldCheck,
  Lock,
  Eye,
  Database,
  FileText,
  CheckCircle2,
  Share2,
  HelpCircle,
  ChevronRight,
  Download
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PrivacyPolicyScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  const privacySections = [
    {
      id: '1',
      title: '1. Information We Collect',
      icon: Database,
      iconColor: '#2563eb',
      iconBg: '#eff6ff',
      content:
        'We collect information necessary for academic management and teacher operations, including name, email address, employee ID, assigned classes, attendance logs, and marks entry data.'
    },
    {
      id: '2',
      title: '2. How We Use Educator Data',
      icon: Eye,
      iconColor: '#16a34a',
      iconBg: '#ecfdf5',
      content:
        'Educator data is strictly used to facilitate classroom activities, generate student performance reports, enable parent-teacher communications, and manage attendance and homework assignments.'
    },
    {
      id: '3',
      title: '3. Data Security & Storage',
      icon: Lock,
      iconColor: '#7c3aed',
      iconBg: '#f3e8ff',
      content:
        'All data transmitted through SchoolMitra is protected using 256-bit TLS encryption. Sensitive credentials and access tokens are securely stored on encrypted cloud databases complying with ISO/IEC 27001 standards.'
    },
    {
      id: '4',
      title: '4. Data Sharing & Third Parties',
      icon: Share2,
      iconColor: '#ea580c',
      iconBg: '#ffedd5',
      content:
        'We do NOT sell or monetize your personal or student data. Information is shared strictly with authorized school administrators and relevant parents/guardians.'
    }
  ];

  const termsSections = [
    {
      id: '1',
      title: '1. Acceptable Use Policy',
      icon: CheckCircle2,
      iconColor: '#16a34a',
      iconBg: '#ecfdf5',
      content:
        'Educators must maintain confidentiality regarding student records and marks. Account credentials must not be shared with unauthorized personnel.'
    },
    {
      id: '2',
      title: '2. Intellectual Property Rights',
      icon: FileText,
      iconColor: '#2563eb',
      iconBg: '#eff6ff',
      content:
        'All study materials, class notes, and weekly test content uploaded to SchoolMitra remain the property of the respective school or content author.'
    },
    {
      id: '3',
      title: '3. Account Termination & Responsibilities',
      icon: HelpCircle,
      iconColor: '#dc2626',
      iconBg: '#fef2f2',
      content:
        'SchoolMitra reserves the right to suspend accounts violating safety, privacy, or ethical standards established by school management.'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Legal & Privacy</Text>
        <TouchableOpacity
          style={styles.shareBtn}
          onPress={() => Alert.alert('Share', 'Share Privacy Policy link...')}
        >
          <Share2 size={18} color="#0f172a" />
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
            <View style={styles.versionBadge}>
              <ShieldCheck size={12} color="#ffffff" />
              <Text style={styles.versionBadgeText}>EFFECTIVE 2026 - 27</Text>
            </View>
            <Text style={styles.heroTitle}>Privacy Policy &</Text>
            <Text style={styles.heroTitleSub}>Terms of Service</Text>
            <Text style={styles.heroDesc}>Protecting educator and student data rights.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Lock size={32} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* SWITCH TABS PILL */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'privacy' && styles.tabBtnActive]}
            onPress={() => setActiveTab('privacy')}
          >
            <Text style={[styles.tabText, activeTab === 'privacy' && styles.tabTextActive]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'terms' && styles.tabBtnActive]}
            onPress={() => setActiveTab('terms')}
          >
            <Text style={[styles.tabText, activeTab === 'terms' && styles.tabTextActive]}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View>

        {/* POLICY CARDS LIST */}
        <View style={styles.listContainer}>
          {(activeTab === 'privacy' ? privacySections : termsSections).map((sec) => {
            const IconComp = sec.icon;
            return (
              <View key={sec.id} style={styles.sectionCard}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconBox, { backgroundColor: sec.iconBg }]}>
                    <IconComp size={20} color={sec.iconColor} />
                  </View>
                  <Text style={styles.cardTitle}>{sec.title}</Text>
                </View>

                <Text style={styles.cardContent}>{sec.content}</Text>
              </View>
            );
          })}
        </View>

        {/* DOWNLOAD PDF ACTION CARD */}
        <View style={styles.downloadCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.downloadTitle}>Need a Offline Copy?</Text>
            <Text style={styles.downloadSub}>Download official PDF terms document</Text>
          </View>
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={() => Alert.alert('Download', 'Downloading official Legal PDF...')}
          >
            <Download size={16} color="#ffffff" style={{ marginRight: 6 }} />
            <Text style={styles.downloadBtnText}>PDF</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER NOTICE */}
        <View style={styles.footerBox}>
          <ShieldCheck size={18} color="#16a34a" style={{ marginBottom: 6 }} />
          <Text style={styles.footerText}>
            By continuing to use SchoolMitra Teacher Portal, you acknowledge and agree to our Privacy Policy and Terms of Service.
          </Text>
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
  shareBtn: {
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
  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  versionBadgeText: { fontSize: 10, fontWeight: '900', color: '#ffffff', letterSpacing: 0.5 },
  heroTitle: { fontSize: 20, fontWeight: '950', color: '#ffffff' },
  heroTitleSub: { fontSize: 16, fontWeight: '900', color: 'rgba(255, 255, 255, 0.9)', marginTop: 2 },
  heroDesc: { fontSize: 12, color: 'rgba(255, 255, 255, 0.8)', marginTop: 6, fontWeight: '600' },
  heroIconBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20
  },
  tabBtn: { flex: 1, height: 42, borderRadius: 11, justifyContent: 'center', alignItems: 'center' },
  tabBtnActive: { backgroundColor: '#ffffff' },
  tabText: { fontSize: 13, fontWeight: '750', color: '#64748b' },
  tabTextActive: { color: '#7c3aed', fontWeight: '900' },
  listContainer: { gap: 14, marginBottom: 20 },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', flex: 1 },
  cardContent: { fontSize: 13, color: '#475569', fontWeight: '600', lineHeight: 20 },
  downloadCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
  },
  downloadTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  downloadSub: { fontSize: 12, color: '#64748b', fontWeight: '600', marginTop: 2 },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7c3aed',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12
  },
  downloadBtnText: { fontSize: 12, fontWeight: '900', color: '#ffffff' },
  footerBox: {
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    marginBottom: 20
  },
  footerText: { fontSize: 12, color: '#64748b', fontWeight: '600', textAlign: 'center', lineHeight: 18 }
});
