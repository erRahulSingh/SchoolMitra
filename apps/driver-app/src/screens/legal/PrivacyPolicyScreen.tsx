import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Shield, Eye, MapPin, Share2, Database, Lock, UserCheck, Mail } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function PrivacyPolicyScreen() {
  const { colors, isDark } = useTheme();

  const sections = [
    {
      icon: Eye,
      title: 'Data Collection',
      iconColor: colors.accent,
      content: `SchoolMitra Driver App collects the following information to provide transport management services:\n\n• Personal Information: Name, mobile number, employee ID, driver license details\n• Vehicle Information: Bus registration number, route assignments\n• Location Data: Real-time GPS coordinates during active duty hours\n• Device Information: Device model, OS version, app version\n• Usage Data: Trip logs, pickup/drop timestamps, attendance records`,
    },
    {
      icon: MapPin,
      title: 'GPS & Location Tracking',
      iconColor: colors.warning,
      content: `This app uses continuous GPS tracking during active trip sessions to:\n\n• Provide real-time bus location to parents and school administration\n• Enable turn-by-turn navigation for route completion\n• Record trip telemetry for safety compliance\n• Generate speed alerts and geofencing notifications\n\nGPS tracking is only active during duty hours and trip sessions. You can see your tracking status via the "GPS Live" indicator in the app.`,
    },
    {
      icon: Share2,
      title: 'Data Sharing',
      iconColor: colors.purple,
      content: `Your data may be shared with:\n\n• School Administration: Trip data, attendance records, route compliance\n• Parents/Guardians: Bus location, estimated arrival times, pickup/drop confirmations\n• RTO & Government Authorities: Vehicle compliance data as required by law\n• Emergency Services: Location data during SOS emergencies\n\nWe do NOT sell your personal data to any third-party advertisers or marketing companies.`,
    },
    {
      icon: Database,
      title: 'Data Retention',
      iconColor: colors.success,
      content: `• Active Data: Your personal and trip data is retained while you are an active driver with SchoolMitra\n• Trip Logs: Historical trip data is retained for 3 academic years for audit purposes\n• GPS Data: Raw GPS coordinates are retained for 90 days, after which they are aggregated\n• Account Deletion: Upon termination of employment, personal data is deleted within 30 days upon request`,
    },
    {
      icon: Lock,
      title: 'Security Measures',
      iconColor: colors.danger,
      content: `We implement industry-standard security measures:\n\n• All data transmission uses TLS 1.3 encryption\n• Server-side data is encrypted at rest using AES-256\n• Access to driver data is role-restricted\n• Authentication uses secure JWT tokens with expiration\n• Regular security audits are performed quarterly`,
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      iconColor: '#8b5cf6',
      content: `As a driver user, you have the right to:\n\n• Access: Request a copy of all personal data we hold\n• Correction: Update or correct inaccurate information\n• Deletion: Request deletion of your data (subject to legal retention requirements)\n• Portability: Receive your data in a machine-readable format\n• Objection: Object to certain types of data processing\n\nTo exercise any of these rights, contact your School Transport Administrator or our support team.`,
    },
    {
      icon: Mail,
      title: 'Contact Information',
      iconColor: colors.accent,
      content: `For privacy-related inquiries:\n\n📧 Email: privacy@schoolmitra.com\n📞 Phone: +91 98765 00100\n🏢 Address: SchoolMitra Technologies Pvt. Ltd.\n     Lucknow, Uttar Pradesh, India\n\nData Protection Officer: Available upon request`,
    },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.headerCard, { backgroundColor: isDark ? '#0f172a' : colors.accent }]}>
        <View style={styles.headerIcon}>
          <Shield size={32} color="#ffffff" />
        </View>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <Text style={styles.headerSub}>
          How we collect, use, and protect your data
        </Text>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>Last Updated: August 2026</Text>
        </View>
      </View>

      {/* Intro */}
      <View style={[styles.introCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.introText, { color: colors.textSecondary }]}>
          SchoolMitra ("we", "our", "us") is committed to protecting the privacy and security of our driver users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the SchoolMitra Driver App.
        </Text>
      </View>

      {/* Sections */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <View 
            key={index} 
            style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBox, { backgroundColor: `${section.iconColor}20` }]}>
                <Icon size={18} color={section.iconColor} />
              </View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            </View>
            <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>
              {section.content}
            </Text>
          </View>
        );
      })}

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
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginBottom: 12,
  },
  dateBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    fontWeight: '600',
  },
  introCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  introText: {
    fontSize: 13,
    lineHeight: 20,
  },
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 13,
    lineHeight: 20,
  },
});
