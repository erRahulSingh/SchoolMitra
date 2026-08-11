import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Info, Smartphone, User, CreditCard, Wrench, ChevronRight, Headset } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HelpSupportScreen({ navigation }: any) {
  const helpTopics = [
    { title: 'Getting Started', sub: 'Learn how to use the app', icon: Info, color: '#2563eb', bg: '#eff6ff' },
    { title: 'Using Features', sub: 'Know more about features', icon: Smartphone, color: '#7c3aed', bg: '#f3e8ff' },
    { title: 'Account & Profile', sub: 'Manage your account and profile', icon: User, color: '#0d9488', bg: '#ccfbf1' },
    { title: 'Payments & Fees', sub: 'All your payment related queries', icon: CreditCard, color: '#ea580c', bg: '#ffedd5' },
    { title: 'Technical Issues', sub: 'Facing technical difficulties?', icon: Wrench, color: '#475569', bg: '#f1f5f9' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero Banner Card (Dark Blue Gradient) */}
        <LinearGradient
          colors={['#1e3a8a', '#2563eb', '#1d4ed8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroLeft}>
            <Text style={styles.heroTitleText}>How can we help you?</Text>
            <Text style={styles.heroSubText}>
              Find answers or contact our support team for assistance.
            </Text>
          </View>

          {/* Support Agent Graphic Badge */}
          <View style={styles.agentBadgeCircle}>
            <Headset size={36} color="#ffffff" strokeWidth={2} />
          </View>
        </LinearGradient>

        {/* Help Topics Section */}
        <Text style={styles.sectionTitle}>Help Topics</Text>
        <View style={styles.cardGroup}>
          {helpTopics.map((topic, idx) => {
            const IconComp = topic.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.topicRow, idx < helpTopics.length - 1 && styles.rowBorder]}
                onPress={() => navigation.navigate('Help')}
                activeOpacity={0.75}
              >
                <View style={[styles.iconSquare, { backgroundColor: topic.bg }]}>
                  <IconComp size={18} color={topic.color} />
                </View>

                <View style={styles.textCol}>
                  <Text style={styles.topicTitleText}>{topic.title}</Text>
                  <Text style={styles.topicSubText}>{topic.sub}</Text>
                </View>

                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Contact Support Button */}
        <TouchableOpacity
          style={styles.contactSupportBtn}
          onPress={() => navigation.navigate('Support')}
          activeOpacity={0.85}
        >
          <Text style={styles.contactBtnText}>Contact Support</Text>
        </TouchableOpacity>

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
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Hero Banner
  heroBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  heroLeft: { flex: 1, paddingRight: 10 },
  heroTitleText: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroSubText: { fontSize: 12, color: '#bfdbfe', fontWeight: '500', marginTop: 6, lineHeight: 17 },
  agentBadgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Help Topics
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  cardGroup: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  topicRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconSquare: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  textCol: { flex: 1 },
  topicTitleText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  topicSubText: { fontSize: 11, color: '#64748b', fontWeight: '500', marginTop: 2 },

  // Contact Support Button
  contactSupportBtn: {
    backgroundColor: '#1d4ed8',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  contactBtnText: { fontSize: 15, fontWeight: '900', color: '#ffffff' },
});
