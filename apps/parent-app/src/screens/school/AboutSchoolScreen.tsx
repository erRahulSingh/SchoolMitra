import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Linking } from 'react-native';
import { ChevronLeft, Building, Phone, Mail, MapPin, Globe, Share2, MessageCircle, Youtube, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ParentAppLogo from '../../components/ParentAppLogo';

export default function AboutSchoolScreen({ navigation }: any) {
  const socialLinks = [
    { name: 'Facebook', handle: '@GreenValleySchool', icon: Facebook, color: '#1877f2', bg: '#e7f1ff', url: 'https://facebook.com' },
    { name: 'Instagram', handle: '@greenvalley_official', icon: Instagram, color: '#e1306c', bg: '#fdebf1', url: 'https://instagram.com' },
    { name: 'YouTube', handle: 'Green Valley School TV', icon: Youtube, color: '#ff0000', bg: '#ffe6e6', url: 'https://youtube.com' },
    { name: 'Twitter / X', handle: '@GreenValleyEdu', icon: Twitter, color: '#0f172a', bg: '#f1f5f9', url: 'https://twitter.com' },
    { name: 'WhatsApp', handle: '+91 98765 43210 (Helpdesk)', icon: MessageCircle, color: '#25d366', bg: '#dcfeeb', url: 'https://whatsapp.com' },
    { name: 'LinkedIn', handle: 'Green Valley Educational Trust', icon: Linkedin, color: '#0a66c2', bg: '#e8f2fe', url: 'https://linkedin.com' },
  ];

  const [schoolInfo, setSchoolInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      try {
        // Fetching the first school or specific tenant ID
        const res = await fetch('http://10.0.2.2:5000/api/v1/schools');
        const data = await res.json();
        if (data.data?.schools?.length > 0) {
          setSchoolInfo(data.data.schools[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSchoolInfo();
  }, []);

  const handleOpenSocial = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  if (loading || !schoolInfo) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading School Info...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      {/* Hero Header */}
      <LinearGradient colors={['#1e3a8a', '#2563eb', '#1d4ed8']} style={styles.hero}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.heroBody}>
          <View style={styles.logoCircle}>
            <Building size={32} color="#1e3a8a" />
          </View>
          <Text style={styles.schoolName}>{schoolInfo.name}</Text>
          <Text style={styles.motto}>Empowering Minds, Shaping Futures</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* About Us Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.desc}>
            Green Valley Public School is a CBSE-affiliated institution dedicated to providing quality education since 1995. We focus on holistic development of students through academics, sports, and cultural activities.
          </Text>
        </View>


        {/* Quick Stats Grid */}
        <View style={styles.statsRow}>
          {[
            { val: '1200+', label: 'Students' },
            { val: '85+', label: 'Teachers' },
            { val: '30+', label: 'Years' },
            { val: 'A+', label: 'CBSE Grade' },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Contact Information Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          {[
            { label: 'Phone', value: schoolInfo.phone, icon: Phone, color: '#16a34a', bg: '#dcfce7' },
            { label: 'Email', value: schoolInfo.email, icon: Mail, color: '#2563eb', bg: '#e0f2fe' },
            { label: 'Address', value: schoolInfo.address || schoolInfo.city, icon: MapPin, color: '#d97706', bg: '#fef3c7' },
            { label: 'Website', value: `www.${schoolInfo.code}.edu.in`, icon: Globe, color: '#9333ea', bg: '#f3e8ff' },
          ].map((i, idx) => {
            const IconComp = i.icon;
            return (
              <View key={idx} style={styles.infoRow}>
                <View style={[styles.infoIcon, { backgroundColor: i.bg }]}>
                  <IconComp size={16} color={i.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>{i.label}</Text>
                  <Text style={styles.infoVal}>{i.value}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Official Social Media Handles Section */}
        <View style={styles.card}>
          <View style={styles.socialHeaderRow}>
            <Share2 size={18} color="#2563eb" />
            <Text style={styles.sectionTitleNoMargin}>Follow Us on Social Media</Text>
          </View>
          <Text style={styles.socialSubText}>
            Stay connected with latest school events, photos, and announcements.
          </Text>

          <View style={styles.socialGrid}>
            {socialLinks.map((social, idx) => {
              const IconComp = social.icon;
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.socialCard}
                  onPress={() => handleOpenSocial(social.url)}
                  activeOpacity={0.75}
                >
                  <View style={[styles.socialIconCircle, { backgroundColor: social.bg }]}>
                    <IconComp size={18} color={social.color} />
                  </View>

                  <View style={styles.socialTextCol}>
                    <Text style={styles.socialNameText}>{social.name}</Text>
                    <Text style={styles.socialHandleText} numberOfLines={1}>{social.handle}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Powered By SchoolMitra Card */}
        <View style={styles.poweredCard}>
          <ParentAppLogo size={42} showBorder={false} />
          <View style={{ flex: 1 }}>
            <Text style={styles.poweredTitle}>Powered by SchoolMitra</Text>
            <Text style={styles.poweredSub}>Smart ERP & Parent Communication System</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  hero: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56,
    paddingBottom: 28,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  heroBody: { alignItems: 'center' },
  logoCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginBottom: 10, elevation: 4 },
  schoolName: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  motto: { fontSize: 12, color: '#bfdbfe', fontWeight: '600', marginTop: 3 },

  scrollContent: { padding: 16, gap: 16, paddingBottom: 100 },

  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0', elevation: 2, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6 },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 10 },
  sectionTitleNoMargin: { fontSize: 15, fontWeight: '900', color: '#0f172a' },
  desc: { fontSize: 13, color: '#64748b', lineHeight: 20, fontWeight: '500' },

  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  infoIcon: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  infoLabel: { fontSize: 10, color: '#94a3b8', fontWeight: '700' },
  infoVal: { fontSize: 13, fontWeight: '800', color: '#0f172a', marginTop: 1 },

  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  statVal: { fontSize: 16, fontWeight: '900', color: '#1e3a8a' },
  statLabel: { fontSize: 10, color: '#64748b', fontWeight: '700', marginTop: 3 },

  // Social Media
  socialHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  socialSubText: { fontSize: 11, color: '#64748b', fontWeight: '500', marginBottom: 14 },
  socialGrid: { gap: 10 },
  socialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  socialIconCircle: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  socialTextCol: { flex: 1 },
  socialNameText: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  socialHandleText: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 1 },

  poweredCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 8,
  },
  poweredTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0f172a',
  },
  poweredSub: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },
});

