import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  FileText, BookOpen, Calendar, Layers, GraduationCap, ChevronRight, 
  Award, Clock, CheckCircle2, FlaskConical, Calculator, Languages, Globe
} from 'lucide-react-native';
import ParentHeader from '../../components/ParentHeader';

export default function AcademicsHubScreen({ navigation }: any) {
  const child = {
    name: 'Rohan Sharma',
    initials: 'RS',
    class: 'Class 5th – A',
    session: 'Academic Year 2024-25',
  };

  const academicGrid = [
    { 
      title: 'Report Card', 
      desc: 'View academic performance', 
      icon: FileText, 
      color: '#16a34a', 
      bg: '#dcfce7', 
      screen: 'ReportCard' 
    },
    { 
      title: 'Assignments', 
      desc: 'View and submit assignments', 
      icon: BookOpen, 
      color: '#9333ea', 
      bg: '#f3e8ff', 
      screen: 'Assignments' 
    },
    { 
      title: 'Time Table', 
      desc: 'Class routine and schedule', 
      icon: Calendar, 
      color: '#ea580c', 
      bg: '#ffedd5', 
      screen: 'TimeTable' 
    },
    { 
      title: 'Syllabus', 
      desc: 'Subject wise syllabus', 
      icon: Layers, 
      color: '#0d9488', 
      bg: '#ccfbf1', 
      screen: 'StudyMaterials' 
    },
  ];

  const subjects = [
    { name: 'Mathematics', teacher: 'Mrs. Neha Gupta', icon: Calculator, color: '#9333ea', bg: '#f3e8ff' },
    { name: 'Science', teacher: 'Mr. Rajesh Kumar', icon: FlaskConical, color: '#ea580c', bg: '#ffedd5' },
    { name: 'English', teacher: 'Mrs. Priya Singh', icon: Languages, color: '#2563eb', bg: '#e0f2fe' },
    { name: 'Social Studies', teacher: 'Mr. Amit Verma', icon: Globe, color: '#16a34a', bg: '#dcfce7' },
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

        {/* Academics Title */}
        <Text style={styles.pageTitle}>Academics</Text>

        {/* Child Academic Banner (Dark Navy) */}
        <View style={styles.childBanner}>
          <View style={styles.childBannerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{child.initials}</Text>
            </View>
            <View>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childClass}>{child.class}</Text>
              <Text style={styles.childSession}>{child.session}</Text>
            </View>
          </View>
          <GraduationCap size={48} color="#ffffff" opacity={0.15} style={styles.watermarkCap} />
        </View>

        {/* 2x2 Academic Tools Grid */}
        <View style={styles.grid2x2}>
          {academicGrid.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity 
                key={idx} 
                style={styles.gridCard} 
                onPress={() => navigation.navigate(item.screen)} 
                activeOpacity={0.8}
              >
                <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
                  <IconComp size={22} color={item.color} strokeWidth={2.2} />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Highlight Banner: Exam Schedule */}
        <TouchableOpacity 
          style={styles.examBanner} 
          onPress={() => navigation.navigate('Exams')}
          activeOpacity={0.85}
        >
          <View style={styles.examLeft}>
            <View style={[styles.iconBox, { backgroundColor: '#dbeafe' }]}>
              <Calendar size={22} color="#2563eb" strokeWidth={2.2} />
            </View>
            <View style={styles.examTextContainer}>
              <Text style={styles.examTitle}>Exam Schedule</Text>
              <Text style={styles.examDesc}>View upcoming exams</Text>
            </View>
          </View>
          
          <View style={styles.examRight}>
            <View style={styles.clockIllustration}>
              <Calendar size={28} color="#3b82f6" />
              <View style={styles.clockOverlay}>
                <Clock size={16} color="#1d4ed8" fill="#ffffff" />
              </View>
            </View>
            <ChevronRight size={20} color="#2563eb" />
          </View>
        </TouchableOpacity>

        {/* Subjects Section */}
        <Text style={styles.sectionTitle}>Subjects</Text>
        <View style={styles.subjectsCard}>
          {subjects.map((sub, idx) => {
            const IconComp = sub.icon;
            return (
              <TouchableOpacity 
                key={idx} 
                style={[styles.subjectRow, idx < subjects.length - 1 && styles.subjectBorder]}
                onPress={() => navigation.navigate('SubjectDetails')}
                activeOpacity={0.7}
              >
                <View style={[styles.subjectIcon, { backgroundColor: sub.bg }]}>
                  <IconComp size={18} color={sub.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subjectName}>{sub.name}</Text>
                  <Text style={styles.subjectTeacher}>{sub.teacher}</Text>
                </View>
                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  scrollContent: { 
    padding: 16, 
    paddingBottom: 110 
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 12,
  },
  
  // Child Banner
  childBanner: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
    elevation: 4,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  childBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  childName: {
    fontSize: 17,
    fontWeight: '900',
    color: '#ffffff',
  },
  childClass: {
    fontSize: 13,
    color: '#38bdf8',
    fontWeight: '700',
    marginTop: 2,
  },
  childSession: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
    marginTop: 2,
  },
  watermarkCap: {
    position: 'absolute',
    right: 12,
    top: 10,
  },

  // 2x2 Grid
  grid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },
  gridCard: {
    width: (Dimensions.get('window').width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
    lineHeight: 15,
  },

  // Exam Schedule Banner
  examBanner: {
    backgroundColor: '#eff6ff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  examLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  examTextContainer: {
    flex: 1,
  },
  examTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1d4ed8',
  },
  examDesc: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
    marginTop: 2,
  },
  examRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clockIllustration: {
    position: 'relative',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },

  // Subjects Section
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 12,
  },
  subjectsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  subjectBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  subjectIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  subjectTeacher: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 2,
  },
});
