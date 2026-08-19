import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  IndianRupee, Bus, CalendarCheck, Image as ImageIcon, Calendar, Megaphone, 
  Download, FileEdit, CreditCard, BookOpen, Headphones, Settings, 
  Trophy, FileText, UserCheck, HelpCircle, Headset, Clock, Layers, Info
} from 'lucide-react-native';
import ParentHeader from '../../components/ParentHeader';

const { width } = Dimensions.get('window');
const cardWidth = (width - 32 - 36) / 4;

export default function MoreScreen({ navigation }: any) {
  const moreServices = [
    { label: 'Fee Payments', icon: IndianRupee, color: '#16a34a', bg: '#dcfce7', screen: 'Fees' },
    { label: 'Bus Tracking', icon: Bus, color: '#2563eb', bg: '#e0f2fe', screen: 'TransportTab' },
    { label: 'Attendance', icon: CalendarCheck, color: '#ea580c', bg: '#ffedd5', screen: 'Attendance' },
    { label: 'Homework', icon: FileEdit, color: '#7c3aed', bg: '#f3e8ff', screen: 'Homework' },

    { label: 'Assignments', icon: FileText, color: '#0d9488', bg: '#ccfbf1', screen: 'Assignments' },
    { label: 'Exams & Tests', icon: Trophy, color: '#ea580c', bg: '#ffedd5', screen: 'Exams' },
    { label: 'Report Card', icon: AwardIcon, color: '#16a34a', bg: '#dcfce7', screen: 'ReportCard' },
    { label: 'Study Materials', icon: Layers, color: '#0284c7', bg: '#e0f2fe', screen: 'StudyMaterials' },

    { label: 'Notice Board', icon: Megaphone, color: '#0d9488', bg: '#ccfbf1', screen: 'NoticeBoard' },
    { label: 'Events', icon: Calendar, color: '#db2777', bg: '#fce7f3', screen: 'Events' },
    { label: 'Gallery', icon: ImageIcon, color: '#9333ea', bg: '#f3e8ff', screen: 'Gallery' },
    { label: 'Time Table', icon: Clock, color: '#2563eb', bg: '#e0f2fe', screen: 'TimeTable' },

    { label: 'Digital ID', icon: CreditCard, color: '#2563eb', bg: '#e0f2fe', screen: 'DigitalIDCard' },
    { label: 'Teacher Profile', icon: UserCheck, color: '#4f46e5', bg: '#eef2ff', screen: 'TeacherProfile' },
    { label: 'Route Details', icon: Bus, color: '#7c3aed', bg: '#f3e8ff', screen: 'RouteDetails' },
    { label: 'Bus Stops', icon: Clock, color: '#0d9488', bg: '#ccfbf1', screen: 'BusStopDetails' },

    { label: 'Payment History', icon: IndianRupee, color: '#16a34a', bg: '#dcfce7', screen: 'FeeHistory' },
    { label: 'Fee Receipt', icon: FileText, color: '#0284c7', bg: '#e0f2fe', screen: 'FeeReceipt' },
    { label: 'Due Invoices', icon: IndianRupee, color: '#ef4444', bg: '#fee2e2', screen: 'DueInvoices' },
    { label: 'Performance', icon: Trophy, color: '#7c3aed', bg: '#f3e8ff', screen: 'AcademicPerformance' },

    { label: 'Trip History', icon: Calendar, color: '#ea580c', bg: '#ffedd5', screen: 'TripHistory' },
    { label: 'Bus Timeline', icon: Clock, color: '#16a34a', bg: '#dcfce7', screen: 'PickupDropTimeline' },
    { label: 'Attendance Chart', icon: CalendarCheck, color: '#2563eb', bg: '#e0f2fe', screen: 'AttendanceAnalytics' },
    { label: 'Health / Medical', icon: UserCheck, color: '#7c3aed', bg: '#f3e8ff', screen: 'MedicalDetails' },

    { label: 'Circulars', icon: FileText, color: '#7c3aed', bg: '#f3e8ff', screen: 'Circulars' },
    { label: 'About School', icon: Info, color: '#2563eb', bg: '#eff6ff', screen: 'AboutSchool' },
    { label: 'Help Topics', icon: Headphones, color: '#2563eb', bg: '#e0f2fe', screen: 'HelpSupport' },
    { label: 'Support & Help', icon: Headphones, color: '#e11d48', bg: '#ffe4e6', screen: 'Support' },
    { label: 'Settings', icon: Settings, color: '#475569', bg: '#f1f5f9', screen: 'NotificationSettings' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top SchoolMitra Header */}
      <ParentHeader 
        onBellPress={() => navigation.navigate('Notifications')}
        unreadCount={3}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Page Title */}
        <Text style={styles.pageTitle}>More</Text>

        {/* 4-Column Grid of 16 Services */}
        <View style={styles.servicesGrid}>
          {moreServices.map((service, idx) => {
            const IconComp = service.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={styles.serviceCard}
                onPress={() => navigation.navigate(service.screen)}
                activeOpacity={0.75}
              >
                <View style={[styles.iconBox, { backgroundColor: service.bg }]}>
                  <IconComp size={24} color={service.color} strokeWidth={2.2} />
                </View>
                <Text style={styles.serviceLabel} numberOfLines={2}>{service.label}</Text>
              </TouchableOpacity>
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
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpSub}>We are here to help you.</Text>
            <TouchableOpacity 
              style={styles.supportBtn} 
              onPress={() => navigation.navigate('Support')}
              activeOpacity={0.85}
            >
              <Text style={styles.supportBtnText}>Contact Support</Text>
            </TouchableOpacity>
          </View>

          {/* Support Agent Avatar Illustration */}
          <View style={styles.agentIllustrationBox}>
            <View style={styles.agentCircleBg} />
            <View style={styles.agentBadge}>
              <Headset size={38} color="#1d4ed8" strokeWidth={2} />
            </View>
          </View>
        </LinearGradient>

      </ScrollView>
    </View>
  );
}

function AwardIcon(props: any) {
  return <Trophy {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 16,
  },

  // 4-Column Grid
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  serviceCard: {
    width: cardWidth,
    alignItems: 'center',
    marginBottom: 6,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  serviceLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 14,
  },

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
  helpLeft: {
    flex: 1,
    paddingRight: 10,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 2,
  },
  helpSub: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
    marginBottom: 14,
  },
  supportBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    elevation: 2,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  supportBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },

  // Support Agent Illustration
  agentIllustrationBox: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  agentCircleBg: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#ffffff',
    opacity: 0.7,
  },
  agentBadge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
