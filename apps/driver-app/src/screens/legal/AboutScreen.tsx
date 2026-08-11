import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Bus, Shield, Code, Globe, Mail, Phone, Heart, ExternalLink } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import AppLogo from '../../components/AppLogo';

export default function AboutScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* App Logo & Info */}
      <View style={[styles.headerCard, { backgroundColor: isDark ? '#0f172a' : colors.accent }]}>
        <View style={{ marginBottom: 16 }}>
          <AppLogo size="medium" />
        </View>
        <Text style={styles.appName}>SchoolMitra Driver</Text>
        <Text style={styles.appTagline}>Real-time Vehicle GPS & Transport Management</Text>
        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>

      {/* About Card */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>About SchoolMitra</Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
          SchoolMitra is a comprehensive school transport management platform designed to ensure the safety 
          and efficiency of school bus operations. The Driver App provides real-time GPS tracking, route 
          management, student pickup/drop management, and emergency communication tools.
        </Text>
      </View>

      {/* Features */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Key Features</Text>
        {[
          { icon: Globe, label: 'Real-time GPS Tracking & Navigation', color: colors.accent },
          { icon: Shield, label: 'Student Safety & Attendance Management', color: colors.success },
          { icon: Bus, label: 'Route Optimization & Management', color: colors.warning },
          { icon: Phone, label: 'Emergency SOS & Communication', color: colors.danger },
          { icon: Code, label: 'Vehicle Health & Compliance Monitoring', color: colors.purple },
        ].map((feature, index) => {
          const Icon = feature.icon;
          return (
            <View key={index} style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                <Icon size={16} color={feature.color} />
              </View>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>{feature.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Links */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Legal</Text>
        <TouchableOpacity 
          style={[styles.linkRow, { borderBottomColor: colors.border }]} 
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Shield size={18} color={colors.accent} />
          <Text style={[styles.linkText, { color: colors.text }]}>Privacy Policy</Text>
          <ExternalLink size={16} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.linkRow} 
          onPress={() => navigation.navigate('TermsConditions')}
        >
          <Shield size={18} color={colors.accent} />
          <Text style={[styles.linkText, { color: colors.text }]}>Terms & Conditions</Text>
          <ExternalLink size={16} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Contact */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Contact & Support</Text>
        <View style={styles.contactRow}>
          <Mail size={16} color={colors.accent} />
          <Text style={[styles.contactText, { color: colors.textSecondary }]}>support@schoolmitra.com</Text>
        </View>
        <View style={styles.contactRow}>
          <Phone size={16} color={colors.accent} />
          <Text style={[styles.contactText, { color: colors.textSecondary }]}>+91 98765 00100</Text>
        </View>
        <View style={styles.contactRow}>
          <Globe size={16} color={colors.accent} />
          <Text style={[styles.contactText, { color: colors.textSecondary }]}>www.schoolmitra.com</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.madeWith}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>Made with </Text>
          <Heart size={14} color={colors.danger} />
          <Text style={[styles.footerText, { color: colors.textMuted }]}> in India</Text>
        </View>
        <Text style={[styles.copyright, { color: colors.textMuted }]}>
          © 2026 SchoolMitra Technologies Pvt. Ltd.
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  headerCard: {
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 14,
  },
  versionBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
  },
  versionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  featureIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 13,
    flex: 1,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    gap: 10,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 13,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4,
  },
  madeWith: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
  copyright: {
    fontSize: 11,
    marginTop: 4,
  },
});
