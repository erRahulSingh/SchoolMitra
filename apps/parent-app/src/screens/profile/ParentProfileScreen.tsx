import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Alert } from 'react-native';
import { 
  User, Lock, Bell, Link, HelpCircle, Info, LogOut, ChevronRight, Shield, Award, CheckCircle2
} from 'lucide-react-native';
import { useParentAuth } from '../../context/ParentAuthContext';

export default function ParentProfileScreen({ navigation }: any) {
  const { user, parent: parentData, currentChild, children, selectChild, logout } = useParentAuth();

  const parentName = parentData?.name || user?.name || 'Parent User';
  const relation = parentData?.relation || 'Parent';
  const childName = currentChild?.name || 'Student';
  const parentRole = `${relation} of ${childName}`;
  const parentPhone = parentData?.phone || user?.phone || 'Not available';
  const parentEmail = parentData?.email || user?.email || 'Not available';
  const parentInitials = parentName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'P';

  const displayChildren = children && children.length > 0 ? children : (currentChild ? [currentChild] : []);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout from Parent Portal?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }
    ]);
  };

  const accountMenu = [
    { title: 'Personal Information', icon: User, screen: 'ChildProfile' },
    { title: 'Documents & Certificates', icon: Award, screen: 'ParentDocumentsCertificates' },
    { title: 'Change Password', icon: Lock, screen: 'PrivacySecurity' },
    { title: 'Notification Settings', icon: Bell, screen: 'NotificationSettings' },
    { title: 'Linked Accounts', icon: Link, screen: 'PrivacySecurity' },
  ];

  const helpMenu = [
    { title: 'About School & Social Handles', icon: Info, screen: 'AboutSchool' },
    { title: 'Help & Support', icon: HelpCircle, screen: 'Help' },
    { title: 'About SchoolMitra App', icon: Info, screen: 'Legal' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* 1. TOP PROFILE HERO BANNER (DARK NAVY) */}
        <TouchableOpacity 
          style={styles.profileHero} 
          onPress={() => navigation.navigate('ChildProfile')}
          activeOpacity={0.9}
        >
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{parentInitials}</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.parentName}>{parentName}</Text>
            <Text style={styles.parentRole}>{parentRole}</Text>
            <Text style={styles.parentContact}>{parentPhone}</Text>
            <Text style={styles.parentContact}>{parentEmail}</Text>
          </View>

          <ChevronRight size={22} color="#ffffff" />
        </TouchableOpacity>

        {/* 2. MY CHILDREN SECTION */}
        <Text style={styles.sectionTitle}>
          My Children {displayChildren.length > 0 ? `(${displayChildren.length})` : ''}
        </Text>
        {displayChildren.length > 0 ? (
          displayChildren.map((ch, idx) => {
            const chInitials = ch.name
              ? ch.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
              : 'ST';
            const isSelected = ch.id === currentChild?.id;

            return (
              <View key={ch.id || idx} style={[styles.childrenCard, isSelected && styles.childrenCardActive]}>
                <View style={styles.childLeft}>
                  <View style={[styles.childAvatar, isSelected && styles.childAvatarActive]}>
                    <Text style={[styles.childAvatarText, isSelected && styles.childAvatarTextActive]}>
                      {chInitials}
                    </Text>
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={styles.childName}>{ch.name}</Text>
                      {isSelected && (
                        <View style={styles.activePill}>
                          <Text style={styles.activePillText}>Active</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.childClass}>{ch.class || 'Student'}</Text>
                    <Text style={styles.childRoll}>
                      {ch.rollNo ? `Roll No. ${ch.rollNo}` : (ch.admissionNo ? `Adm: ${ch.admissionNo}` : 'Roll: N/A')}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={[styles.viewChildBtn, isSelected && styles.viewChildBtnActive]} 
                  onPress={() => {
                    if (ch.id) selectChild(ch.id);
                    navigation.navigate('ChildProfile');
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.viewChildText, isSelected && styles.viewChildTextActive]}>
                    {isSelected ? 'View Profile' : 'Select'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={styles.childrenCard}>
            <Text style={{ fontSize: 13, color: '#64748b' }}>No linked students found.</Text>
          </View>
        )}

        {/* 3. ACCOUNT SETTINGS LIST */}
        <View style={styles.menuGroupCard}>
          {accountMenu.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.menuRow, idx < accountMenu.length - 1 && styles.menuBorder]}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <IconComp size={20} color="#475569" strokeWidth={2} />
                <Text style={styles.menuTitle}>{item.title}</Text>
                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 4. HELP & ABOUT LIST */}
        <View style={styles.menuGroupCard}>
          {helpMenu.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.menuRow, idx < helpMenu.length - 1 && styles.menuBorder]}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <IconComp size={20} color="#475569" strokeWidth={2} />
                <Text style={styles.menuTitle}>{item.title}</Text>
                <ChevronRight size={18} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 5. LOGOUT CARD */}
        <TouchableOpacity 
          style={styles.logoutCard} 
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={20} color="#ef4444" strokeWidth={2.2} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 110,
  },

  // 1. Top Profile Hero Banner (Dark Navy)
  profileHero: {
    backgroundColor: '#0f172a',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 16 : 56,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  avatarLarge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#ffffff',
  },
  avatarLargeText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    marginRight: 10,
  },
  parentName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 2,
  },
  parentRole: {
    fontSize: 13,
    color: '#38bdf8',
    fontWeight: '700',
    marginBottom: 6,
  },
  parentContact: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '500',
    lineHeight: 16,
  },

  // 2. My Children Section
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0f172a',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  childrenCard: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    marginBottom: 16,
  },
  childLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  childAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  childAvatarText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#2563eb',
  },
  childName: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0f172a',
  },
  childClass: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginTop: 2,
  },
  childRoll: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
    marginTop: 2,
  },
  viewChildBtn: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  viewChildText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563eb',
  },
  childrenCardActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#f8faff',
  },
  childAvatarActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#2563eb',
  },
  childAvatarTextActive: {
    color: '#ffffff',
  },
  activePill: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  activePillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#15803d',
  },
  viewChildBtnActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  viewChildTextActive: {
    color: '#ffffff',
  },

  // 3 & 4. Menu Group Cards
  menuGroupCard: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#1e293b',
  },

  // 5. Logout Card
  logoutCard: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#fee2e2',
    elevation: 1,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#ef4444',
  },
});
