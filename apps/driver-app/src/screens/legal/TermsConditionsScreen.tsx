import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FileText, CheckCircle, Truck, Shield, MapPin, AlertTriangle, Scale, Gavel } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function TermsConditionsScreen() {
  const { colors, isDark } = useTheme();

  const sections = [
    {
      icon: CheckCircle,
      title: '1. Acceptance of Terms',
      iconColor: colors.success,
      content: `By accessing and using the SchoolMitra Driver App, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must not use this application.\n\nThese terms constitute a legally binding agreement between you (the "Driver") and SchoolMitra Technologies Pvt. Ltd. (the "Company").`,
    },
    {
      icon: Truck,
      title: '2. Driver Responsibilities',
      iconColor: colors.accent,
      content: `As a registered driver on the SchoolMitra platform, you agree to:\n\n• Maintain a valid commercial driving license at all times\n• Complete the pre-trip vehicle safety checklist before every trip\n• Follow the assigned route and stop schedule\n• Mark student pickup and drop-off accurately in the app\n• Drive within prescribed speed limits (max 40 km/h in school zones)\n• Not use the mobile phone while driving (use voice navigation only)\n• Report any vehicle issues, delays, or incidents immediately\n• Maintain professional conduct with students, parents, and staff\n• Wear the prescribed uniform and ID badge during duty hours`,
    },
    {
      icon: Shield,
      title: '3. Safety & Compliance',
      iconColor: colors.warning,
      content: `Safety is our highest priority. You must:\n\n• Ensure all students are seated with seatbelts fastened before moving\n• Never exceed the vehicle's rated passenger capacity\n• Conduct daily vehicle inspections as per the checklist\n• Maintain valid vehicle insurance, PUC, and fitness certificates\n• Follow all traffic rules and RTO regulations\n• Not consume alcohol or any intoxicating substance during or before duty\n• Immediately use the SOS feature in case of any emergency\n• Cooperate fully with any safety audits or inspections`,
    },
    {
      icon: MapPin,
      title: '4. GPS & Tracking Consent',
      iconColor: colors.purple,
      content: `By using this app, you consent to:\n\n• Continuous GPS tracking during active duty hours and trip sessions\n• Real-time location sharing with school administration and parents\n• Speed monitoring and geofencing alerts\n• Trip recording including route taken, stops, and timing\n• Storage of location history for audit and compliance purposes\n\nGPS tracking is essential for the safety of students and is a mandatory requirement for all SchoolMitra drivers.`,
    },
    {
      icon: AlertTriangle,
      title: '5. Prohibited Activities',
      iconColor: colors.danger,
      content: `The following activities are strictly prohibited:\n\n• Tampering with or disabling GPS tracking devices\n• Sharing login credentials with any other person\n• Deviating from assigned routes without authorization\n• Using the vehicle for personal purposes during duty hours\n• Allowing unauthorized persons to board the vehicle\n• Making unauthorized stops not listed in the route\n• Providing false information in trip reports or checklists\n• Taking photos or videos of students without authorization`,
    },
    {
      icon: Scale,
      title: '6. Limitation of Liability',
      iconColor: '#8b5cf6',
      content: `• The app is provided "as-is" and SchoolMitra does not guarantee uninterrupted service\n• SchoolMitra is not liable for GPS inaccuracies due to device or network issues\n• The driver is solely responsible for safe vehicle operation\n• SchoolMitra is not liable for any traffic violations committed by the driver\n• In case of accidents, standard company insurance policies apply\n• Dispute resolution shall follow the company's grievance redressal mechanism`,
    },
    {
      icon: Gavel,
      title: '7. Termination & Governing Law',
      iconColor: colors.accent,
      content: `Termination:\n• Your access may be suspended or terminated for violation of these terms\n• Repeated safety violations will result in immediate termination\n• You may resign by providing notice as per your employment agreement\n\nGoverning Law:\n• These terms are governed by the laws of India\n• Any disputes shall be subject to the jurisdiction of courts in Lucknow, Uttar Pradesh\n• The Company reserves the right to modify these terms with prior notice`,
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
          <FileText size={32} color="#ffffff" />
        </View>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <Text style={styles.headerSub}>
          Rules and guidelines for using SchoolMitra Driver App
        </Text>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>Effective: August 2026</Text>
        </View>
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

      {/* Acknowledgement */}
      <View style={[styles.ackCard, { backgroundColor: colors.successSoft, borderColor: colors.success }]}>
        <CheckCircle size={20} color={colors.success} />
        <Text style={[styles.ackText, { color: colors.success }]}>
          By continuing to use this app, you acknowledge that you have read and agreed to these Terms & Conditions.
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
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  sectionContent: {
    fontSize: 13,
    lineHeight: 20,
  },
  ackCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    gap: 10,
    marginBottom: 12,
  },
  ackText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
  },
});
