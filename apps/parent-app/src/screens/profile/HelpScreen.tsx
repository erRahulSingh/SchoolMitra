import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Search, ChevronDown, ChevronUp, Headset } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HelpScreen({ navigation }: any) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { 
      q: "How can I check my child's attendance?", 
      a: "Tap on 'Attendance' from the home screen or Academics tab to see daily attendance analytics and monthly summary." 
    },
    { 
      q: "How can I make fee payment?", 
      a: "Go to Fee Payments under More tab, tap 'Pay Now', and choose your preferred payment mode (UPI, Card, Net Banking)." 
    },
    { 
      q: "How can I track the school bus?", 
      a: "Tap on 'Live Bus' tab in bottom navigation to view real-time location, speed, and estimated arrival time." 
    },
    { 
      q: "How can I apply for TC?", 
      a: "Go to Support & Requests section, tap 'Raise New Request', select Category as 'Transfer Certificate (TC)' and submit." 
    },
    { 
      q: "How can I contact the class teacher?", 
      a: "You can view Teacher Profile from Academics or More tab and use the direct Phone Call or Email button." 
    },
    { 
      q: "How can I update my profile?", 
      a: "Go to Profile tab, select 'Personal Information' to review and request profile updates." 
    },
    { 
      q: "What should I do if I forget password?", 
      a: "Go to Profile -> Change Password or tap 'Forgot Password' on the login screen to reset via OTP." 
    },
  ];

  const filteredFaqs = faqs.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Search Bar Input */}
        <View style={styles.searchBarWrapper}>
          <Search size={18} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search FAQs"
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Accordion FAQ Items List */}
        <View style={styles.faqListCard}>
          {filteredFaqs.map((item, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <View key={idx} style={[styles.faqRow, idx < filteredFaqs.length - 1 && styles.rowBorder]}>
                <TouchableOpacity 
                  style={styles.faqQuestionRow} 
                  onPress={() => setExpandedIdx(isExpanded ? null : idx)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.questionText}>{item.q}</Text>
                  {isExpanded ? (
                    <ChevronUp size={18} color="#2563eb" />
                  ) : (
                    <ChevronDown size={18} color="#64748b" />
                  )}
                </TouchableOpacity>

                {isExpanded && (
                  <Text style={styles.answerText}>{item.a}</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Bottom Help Banner */}
        <LinearGradient
          colors={['#e0f2fe', '#dbeafe', '#eff6ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.helpBanner}
        >
          <View style={styles.helpLeft}>
            <Text style={styles.helpTitle}>Still have questions?</Text>
            <Text style={styles.helpSub}>Contact our support team.</Text>
            
            <TouchableOpacity 
              style={styles.contactBtn} 
              onPress={() => navigation.navigate('Support')}
              activeOpacity={0.85}
            >
              <Text style={styles.contactBtnText}>Contact Support</Text>
            </TouchableOpacity>
          </View>

          {/* Support Agent Avatar Illustration */}
          <View style={styles.agentIllustrationBox}>
            <View style={styles.agentCircleBg} />
            <View style={styles.agentBadge}>
              <Headset size={36} color="#1d4ed8" strokeWidth={2} />
            </View>
          </View>
        </LinearGradient>

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

  // Search Bar
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
    marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 13, color: '#0f172a', fontWeight: '600' },

  // FAQ List Card
  faqListCard: {
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
  faqRow: { paddingHorizontal: 16, paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  faqQuestionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  questionText: { flex: 1, fontSize: 13, fontWeight: '800', color: '#0f172a', lineHeight: 18 },
  answerText: { fontSize: 12, color: '#64748b', lineHeight: 18, fontWeight: '500', marginTop: 10 },

  // Bottom Help Banner
  helpBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    elevation: 3,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  helpLeft: { flex: 1, paddingRight: 10 },
  helpTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  helpSub: { fontSize: 12, color: '#475569', fontWeight: '600', marginTop: 2, marginBottom: 14 },
  contactBtn: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    elevation: 2,
  },
  contactBtnText: { color: '#ffffff', fontSize: 12, fontWeight: '900' },

  agentIllustrationBox: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  agentCircleBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    opacity: 0.7,
  },
  agentBadge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
