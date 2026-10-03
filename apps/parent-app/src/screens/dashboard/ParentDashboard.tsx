import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  CalendarCheck, Bus, CreditCard, Award, Bell, BookOpen, FileText, 
  Calendar, ChevronRight, User, Megaphone, CheckCircle2, Building, 
  Wallet, MapPin, Clock, Trophy, Sparkles, GraduationCap, Heart, Check
} from 'lucide-react-native';
import ParentHeader from '../../components/ParentHeader';
import { motherChild3DUri, studentRohan3DUri } from '../../assets/parent3dAssets';
import { useParentAuth } from '../../context/ParentAuthContext';

const { width } = Dimensions.get('window');

export default function ParentDashboard({ navigation }: any) {
  const { user, parent, currentChild, children, selectChild } = useParentAuth();
  const [heroImgUri, setHeroImgUri] = React.useState(motherChild3DUri);

  const parentDisplayName = parent?.name || user?.name || 'Parent';

  const child = {
    name: currentChild?.name || 'Your Child',
    initials: currentChild?.name ? currentChild.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'ST',
    class: currentChild?.class || 'Class 10th – A',
    roll: currentChild?.rollNo || currentChild?.admissionNo || 'N/A',
    school: currentChild?.schoolName || user?.schoolName || 'SchoolMitra Campus',
    session: '2025–26',
    teacher: currentChild?.teacherName || 'Mrs. Priya Singh',
    busNo: currentChild?.busNo || (currentChild?.status === 'Active' ? 'Bus #01' : 'Self'),
    attendanceRate: currentChild?.attendanceRate || '96%',
    pendingTasks: 2,
    notifications: 1,
    dueFee: currentChild?.dueFee || '₹0'
  };

  const quickActions = [
    { label: 'Attendance', icon: CalendarCheck, colors: ['#3b82f6', '#2563eb'], screen: 'Attendance' },
    { label: 'Report Card', icon: FileText, colors: ['#22c55e', '#16a34a'], screen: 'ReportCard' },
    { label: 'Fee Payments', icon: CreditCard, colors: ['#f97316', '#ea580c'], screen: 'Fees' },
    { label: 'Bus Tracking', icon: Bus, colors: ['#06b6d4', '#0891b2'], screen: 'LiveBusTracking' },
    { label: 'Time Table', icon: Calendar, colors: ['#a855f7', '#9333ea'], screen: 'TimeTable' }
  ];

  const recentUpdates = [
    { title: 'Holiday Notice', desc: 'School will remain closed on 15th May 2025', icon: Megaphone, color: '#16a34a', bg: '#dcfce7', time: '2h ago', isNew: true },
    { title: 'Annual Sports Day', desc: 'Annual Sports Day will be held on 25th May 2025', icon: Trophy, color: '#0284c7', bg: '#e0f2fe', time: '1d ago', isNew: true },
    { title: 'PTM Schedule', desc: 'Parent Teacher Meeting on 20th May 2025', icon: FileText, color: '#9333ea', bg: '#f3e8ff', time: '2d ago', isNew: true }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* SchoolMitra Branded Top Header */}
      <ParentHeader 
        onBellPress={() => navigation.navigate('Notifications')}
        unreadCount={3}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* 1. GOOD MORNING HERO BANNER */}
        <LinearGradient 
          colors={['#e0f2fe', '#dbeafe', '#f3e8ff']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          style={styles.heroBanner}
        >
          <View style={styles.heroLeft}>
            <Text style={styles.heroGreeting}>Good Morning,</Text>
            <Text style={styles.heroName}>{parentDisplayName} 👋</Text>
            <Text style={styles.heroSub}>
              {parent?.relation ? `${parent.relation} Portal` : 'Parent Portal'} • Stay updated with your child's activities
            </Text>
          </View>
          
          {/* 3D Mother & Child Illustration Image */}
          <View style={styles.hero3DImageBox}>
            <Image 
              source={{ uri: motherChild3DUri }} 
              style={styles.motherChild3DImage} 
              resizeMode="cover"
            />
          </View>
        </LinearGradient>

        {/* Child Switcher Tabs if multiple children linked */}
        {children && children.length > 1 && (
          <View style={styles.childSwitcherWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.childSwitcherScroll}>
              {children.map((c) => {
                const isActive = c.id === currentChild?.id;
                return (
                  <TouchableOpacity
                    key={c.id}
                    style={[styles.childSwitchChip, isActive && styles.childSwitchChipActive]}
                    onPress={() => selectChild(c.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.childSwitchDot, isActive && styles.childSwitchDotActive]} />
                    <Text style={[styles.childSwitchText, isActive && styles.childSwitchTextActive]}>
                      {c.name} {c.class ? `• ${c.class}` : ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* 2. STUDENT PROFILE CARD (DARK NAVY) */}
        <View style={styles.studentCard}>
          <View style={styles.studentTop}>
            <View style={styles.studentInfo}>
              {/* Dynamic Child Photo or 3D Avatar */}
              <View style={styles.avatar3DBox}>
                {currentChild?.photo ? (
                  <Image 
                    source={{ uri: currentChild.photo }} 
                    style={styles.avatar3DImage} 
                    resizeMode="cover"
                  />
                ) : (
                  <Image 
                    source={{ uri: studentRohan3DUri }} 
                    style={styles.avatar3DImage} 
                    resizeMode="cover"
                  />
                )}
              </View>
              <View>
                <Text style={styles.studentName}>{child.name}</Text>
                <Text style={styles.studentClass}>{child.class}</Text>
                <Text style={styles.studentSchool}>{child.school}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewProfileBtn} onPress={() => navigation.navigate('ChildProfile')}>
              <Text style={styles.viewProfileText}>View Profile</Text>
              <ChevronRight size={14} color="#0f172a" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardDivider} />

          {/* 4-Column Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Calendar size={13} color="#38bdf8" />
              <View>
                <Text style={styles.statLabel}>Roll No.</Text>
                <Text style={styles.statVal}>{child.roll}</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <GraduationCap size={13} color="#34d399" />
              <View>
                <Text style={styles.statLabel}>Academic Year</Text>
                <Text style={styles.statVal}>{child.session}</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <User size={13} color="#a855f7" />
              <View>
                <Text style={styles.statLabel}>Class Teacher</Text>
                <Text style={styles.statVal} numberOfLines={1}>{child.teacher}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={() => navigation.navigate('LiveBusTracking')}
              activeOpacity={0.7}
            >
              <Bus size={13} color="#fbbf24" />
              <View>
                <Text style={styles.statLabel}>Bus No.</Text>
                <Text style={styles.statVal}>{child.busNo}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. QUICK ACTIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('More')}>
            <View style={styles.viewAllRow}>
              <Text style={styles.viewAll}>View All</Text>
              <ChevronRight size={14} color="#2563eb" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsGrid}>
          {quickActions.map((action, idx) => {
            const IconComp = action.icon;
            return (
              <TouchableOpacity key={idx} style={styles.actionCard} onPress={() => navigation.navigate(action.screen)} activeOpacity={0.75}>
                <LinearGradient colors={action.colors as [string, string]} style={styles.actionIconCircle}>
                  <IconComp size={20} color="#ffffff" strokeWidth={2.2} />
                </LinearGradient>
                <Text style={styles.actionLabel} numberOfLines={1}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 4. RECENT UPDATES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <View style={styles.viewAllRow}>
              <Text style={styles.viewAll}>View All</Text>
              <ChevronRight size={14} color="#2563eb" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.updatesCard}>
          {recentUpdates.map((update, idx) => {
            const IconComp = update.icon;
            return (
              <View key={idx} style={[styles.updateRow, idx < recentUpdates.length - 1 && styles.updateBorder]}>
                <View style={[styles.updateIcon, { backgroundColor: update.bg }]}>
                  <IconComp size={18} color={update.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.updateTitle}>{update.title}</Text>
                  <Text style={styles.updateDesc}>{update.desc}</Text>
                </View>
                <View style={styles.updateRight}>
                  <Text style={styles.updateTime}>{update.time}</Text>
                  {update.isNew && <View style={styles.updateDot} />}
                </View>
              </View>
            );
          })}
        </View>

        {/* 5. TODAY'S OVERVIEW (SINGLE CLEAN ROW) */}
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.overviewGrid}>
          {/* Card 1: Attendance */}
          <TouchableOpacity style={[styles.overviewCard, { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }]} onPress={() => navigation.navigate('Attendance')}>
            <View style={[styles.overviewIconCircle, { backgroundColor: '#dcfce7' }]}>
              <CheckCircle2 size={18} color="#16a34a" />
            </View>
            <Text style={[styles.overviewVal, { color: '#16a34a' }]}>Present</Text>
            <Text style={styles.overviewLabel}>Attendance Today</Text>
          </TouchableOpacity>

          {/* Card 2: Assignments */}
          <TouchableOpacity style={[styles.overviewCard, { backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }]} onPress={() => navigation.navigate('Homework')}>
            <View style={[styles.overviewIconCircle, { backgroundColor: '#e0f2fe' }]}>
              <Calendar size={18} color="#0284c7" />
            </View>
            <Text style={[styles.overviewVal, { color: '#0369a1' }]}>{child.pendingTasks}</Text>
            <Text style={styles.overviewLabel}>Assignments Pending</Text>
          </TouchableOpacity>

          {/* Card 3: Notifications */}
          <TouchableOpacity style={[styles.overviewCard, { backgroundColor: '#fefbeb', borderColor: '#fef08a' }]} onPress={() => navigation.navigate('Notifications')}>
            <View style={[styles.overviewIconCircle, { backgroundColor: '#fef3c7' }]}>
              <Bell size={18} color="#d97706" />
            </View>
            <Text style={[styles.overviewVal, { color: '#b45309' }]}>{child.notifications}</Text>
            <Text style={styles.overviewLabel}>New Notification</Text>
          </TouchableOpacity>

          {/* Card 4: Fee Due */}
          <TouchableOpacity style={[styles.overviewCard, { backgroundColor: '#faf5ff', borderColor: '#e9d5ff' }]} onPress={() => navigation.navigate('Fees')}>
            <View style={[styles.overviewIconCircle, { backgroundColor: '#f3e8ff' }]}>
              <Wallet size={18} color="#9333ea" />
            </View>
            <Text style={[styles.overviewVal, { color: '#6b21a8' }]}>{child.dueFee}</Text>
            <Text style={styles.overviewLabel}>Due Fee This Month</Text>
          </TouchableOpacity>
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
    paddingBottom: 110 
  },
  
  // Hero Banner
  heroBanner: {
    paddingTop: 18,
    paddingBottom: 22,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLeft: {
    flex: 1,
    paddingRight: 10,
  },
  heroGreeting: { 
    fontSize: 13, 
    color: '#475569', 
    fontWeight: '600' 
  },
  heroName: { 
    fontSize: 22, 
    fontWeight: '900', 
    color: '#0f172a', 
    marginTop: 2 
  },
  heroSub: { 
    fontSize: 12, 
    color: '#64748b', 
    fontWeight: '500', 
    marginTop: 6,
    lineHeight: 17,
  },
  hero3DImageBox: {
    width: 105,
    height: 105,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: '#ffffff',
    backgroundColor: '#7c3aed',
    elevation: 6,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  motherChild3DImage: {
    width: '100%',
    height: '100%',
  },
  avatar3DBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ffffff',
    elevation: 3,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  avatar3DImage: {
    width: '100%',
    height: '100%',
  },

  // Child Switcher Tabs
  childSwitcherWrapper: {
    marginTop: 12,
    marginBottom: 4,
  },
  childSwitcherScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  childSwitchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  childSwitchChipActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  childSwitchDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94a3b8',
  },
  childSwitchDotActive: {
    backgroundColor: '#2563eb',
  },
  childSwitchText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  childSwitchTextActive: {
    color: '#1d4ed8',
    fontWeight: '800',
  },

  // Student Profile Card (Dark Navy)
  studentCard: { 
    marginHorizontal: 16, 
    marginTop: -10, 
    backgroundColor: '#0f172a', 
    borderRadius: 20, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: '#1e293b', 
    elevation: 6, 
    shadowColor: '#0f172a', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 10 
  },
  studentTop: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  studentInfo: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12 
  },
  avatar: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    backgroundColor: '#3b82f6', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  avatarText: { 
    fontSize: 16, 
    fontWeight: '900', 
    color: '#ffffff' 
  },
  studentName: { 
    fontSize: 16, 
    fontWeight: '900', 
    color: '#ffffff' 
  },
  studentClass: { 
    fontSize: 12, 
    color: '#38bdf8', 
    fontWeight: '700', 
    marginTop: 1 
  },
  studentSchool: { 
    fontSize: 11, 
    color: '#94a3b8', 
    fontWeight: '500', 
    marginTop: 2 
  },
  viewProfileBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 2, 
    backgroundColor: '#ffffff', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20, 
  },
  viewProfileText: { 
    fontSize: 11, 
    fontWeight: '800', 
    color: '#0f172a' 
  },
  cardDivider: { 
    height: 1, 
    backgroundColor: '#1e293b', 
    marginVertical: 12 
  },
  statsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5 
  },
  statLabel: { 
    fontSize: 8, 
    color: '#94a3b8', 
    fontWeight: '600',
  },
  statVal: { 
    fontSize: 10, 
    fontWeight: '800', 
    color: '#ffffff',
    marginTop: 1,
  },

  // Section Headers
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginHorizontal: 16, 
    marginTop: 20, 
    marginBottom: 12 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: '900', 
    color: '#0f172a', 
    marginLeft: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAll: { 
    fontSize: 13, 
    color: '#2563eb', 
    fontWeight: '700' 
  },

  // Quick Actions Grid
  actionsGrid: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    gap: 8, 
    marginBottom: 4 
  },
  actionCard: { 
    flex: 1, 
    alignItems: 'center', 
  },
  actionIconCircle: { 
    width: 48, 
    height: 48, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 6,
    elevation: 3,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  actionLabel: { 
    fontSize: 10, 
    fontWeight: '700', 
    color: '#334155', 
    textAlign: 'center' 
  },

  // Recent Updates Card
  updatesCard: { 
    marginHorizontal: 16, 
    backgroundColor: '#ffffff', 
    borderRadius: 18, 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    overflow: 'hidden', 
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  updateRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 14, 
    gap: 12 
  },
  updateBorder: { 
    borderBottomWidth: 1, 
    borderBottomColor: '#f1f5f9' 
  },
  updateIcon: { 
    width: 38, 
    height: 38, 
    borderRadius: 19, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  updateTitle: { 
    fontSize: 14, 
    fontWeight: '800', 
    color: '#0f172a' 
  },
  updateDesc: { 
    fontSize: 12, 
    color: '#64748b', 
    fontWeight: '500', 
    marginTop: 2 
  },
  updateRight: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 
  },
  updateTime: { 
    fontSize: 11, 
    color: '#94a3b8', 
    fontWeight: '600' 
  },
  updateDot: { 
    width: 7, 
    height: 7, 
    borderRadius: 3.5, 
    backgroundColor: '#ef4444' 
  },

  // Today's Overview Grid (Single Clean Row)
  overviewGrid: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    gap: 6, 
    marginTop: 4, 
    marginBottom: 8 
  },
  overviewCard: { 
    flex: 1, 
    minWidth: 0, 
    borderRadius: 16, 
    paddingVertical: 12, 
    paddingHorizontal: 2, 
    alignItems: 'center', 
    borderWidth: 1 
  },
  overviewIconCircle: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 6 
  },
  overviewVal: { 
    fontSize: 14, 
    fontWeight: '900' 
  },
  overviewLabel: { 
    fontSize: 8.5, 
    color: '#475569', 
    fontWeight: '700', 
    marginTop: 3, 
    textAlign: 'center' 
  },
});
