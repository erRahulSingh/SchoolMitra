import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, MoreVertical, Phone, Mail, BookOpen, Users, GraduationCap, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TeacherProfileScreen({ navigation }: any) {
  const teacher = {
    name: 'Mrs. Priya Singh',
    subject: 'Mathematics Teacher',
    experience: '10+ Years Experience',
    initials: 'PS',
    about: 'Mrs. Priya Singh is an experienced Mathematics teacher who is passionate about teaching and guiding students towards excellence.',
    subjects: 'Mathematics',
    classes: '5th – 8th',
    qualification: 'M.Sc, B.Ed',
    expText: '10+ Years',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />

      {/* Top Hero Header Card (Dark Blue Gradient) */}
      <LinearGradient
        colors={['#1e3a8a', '#2563eb', '#1d4ed8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.darkHeroHeader}
      >
        {/* Header Top Bar */}
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.backBtnWhite} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <ChevronLeft size={22} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitleWhite}>Teacher Profile</Text>
          <TouchableOpacity style={styles.moreBtnWhite}>
            <MoreVertical size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Avatar & Main Info */}
        <View style={styles.teacherMainInfoCol}>
          <View style={styles.largeAvatarCircle}>
            <Text style={styles.largeAvatarText}>{teacher.initials}</Text>
          </View>

          <Text style={styles.teacherNameText}>{teacher.name}</Text>
          <Text style={styles.teacherSubjectText}>{teacher.subject}</Text>
          <Text style={styles.teacherExpSubText}>{teacher.experience}</Text>

          {/* Call & Mail Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionCircleBtn} activeOpacity={0.8}>
              <Phone size={18} color="#2563eb" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCircleBtn} activeOpacity={0.8}>
              <Mail size={18} color="#2563eb" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* About Teacher Card */}
        <View style={styles.aboutCard}>
          <Text style={styles.cardSectionTitle}>About Teacher</Text>
          <Text style={styles.aboutText}>{teacher.about}</Text>
        </View>

        {/* Details Card List */}
        <View style={styles.detailsGroupCard}>
          <View style={[styles.detailRow, styles.rowBorder]}>
            <View style={styles.detailIconSquare}>
              <BookOpen size={18} color="#2563eb" />
            </View>
            <Text style={styles.detailLabelText}>Subjects</Text>
            <Text style={styles.detailValueText}>{teacher.subjects}</Text>
          </View>

          <View style={[styles.detailRow, styles.rowBorder]}>
            <View style={styles.detailIconSquare}>
              <Users size={18} color="#2563eb" />
            </View>
            <Text style={styles.detailLabelText}>Classes</Text>
            <Text style={styles.detailValueText}>{teacher.classes}</Text>
          </View>

          <View style={[styles.detailRow, styles.rowBorder]}>
            <View style={styles.detailIconSquare}>
              <GraduationCap size={18} color="#2563eb" />
            </View>
            <Text style={styles.detailLabelText}>Qualification</Text>
            <Text style={styles.detailValueText}>{teacher.qualification}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconSquare}>
              <Clock size={18} color="#2563eb" />
            </View>
            <Text style={styles.detailLabelText}>Experience</Text>
            <Text style={styles.detailValueText}>{teacher.expText}</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  darkHeroHeader: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backBtnWhite: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
  moreBtnWhite: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitleWhite: { fontSize: 17, fontWeight: '900', color: '#ffffff' },

  teacherMainInfoCol: { alignItems: 'center' },
  largeAvatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 12,
  },
  largeAvatarText: { fontSize: 28, fontWeight: '900', color: '#2563eb' },
  teacherNameText: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  teacherSubjectText: { fontSize: 13, color: '#93c5fd', fontWeight: '700', marginTop: 3 },
  teacherExpSubText: { fontSize: 12, color: '#bfdbfe', fontWeight: '500', marginTop: 2 },

  actionButtonsRow: { flexDirection: 'row', gap: 16, marginTop: 16 },
  actionCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  scrollContent: { padding: 16, paddingBottom: 100 },

  // About Card
  aboutCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardSectionTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', marginBottom: 8 },
  aboutText: { fontSize: 12, color: '#475569', lineHeight: 18, fontWeight: '500' },

  // Details Group Card
  detailsGroupCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  detailRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  detailIconSquare: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' },
  detailLabelText: { flex: 1, fontSize: 13, fontWeight: '800', color: '#0f172a' },
  detailValueText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
});
