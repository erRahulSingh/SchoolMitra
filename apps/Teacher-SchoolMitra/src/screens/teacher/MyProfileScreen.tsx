import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  Modal,
  TextInput
} from 'react-native';
import {
  ChevronLeft,
  Edit2,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  MapPin,
  BookOpen,
  Lock,
  Bell,
  Shield,
  ChevronRight,
  User,
  X,
  Check
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/Header';

export default function MyProfileScreen({ navigation }: any) {
  const [teacher, setTeacher] = React.useState({
    name: 'Rahul Kushwaha',
    empId: 'TCH-2026-101',
    role: 'Teacher / Educator',
    joined: 'Joined on 15 Aug 2024',
    email: 'rahul.kushwaha@example.com',
    phone: '7870391245',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    experience: '6 Years',
    address: '123, Green Park, New Delhi',
    subjects: 'Mathematics, Science, English'
  });

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    address: '',
    subjects: ''
  });

  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        // Try fetching live profile from backend
        const apiRes = await teacherApi.getProfile().catch(() => null) || await teacherApi.getMe().catch(() => null);
        const apiUser = apiRes?.teacher || apiRes?.user || apiRes;

        let userStr = await AsyncStorage.getItem('user');
        if (!userStr) {
          userStr = await AsyncStorage.getItem('lastRegisteredUser');
        }

        const u = userStr ? JSON.parse(userStr) : {};
        const merged = { ...u, ...(apiUser || {}) };

        if (merged) {
          setTeacher(prev => ({
            ...prev,
            name: merged.name || prev.name,
            email: merged.email || prev.email,
            phone: merged.phone || prev.phone,
            empId: merged.schoolCode ? `TCH-${merged.schoolCode}` : (merged.empId || prev.empId),
            role: merged.role ? `${merged.role} Educator` : prev.role,
            qualification: merged.qualification || prev.qualification,
            experience: merged.experience || prev.experience,
            address: merged.address || prev.address,
            subjects: merged.subjects || merged.subject || prev.subjects
          }));
        }
      } catch (e) {
        console.warn('Profile fetch error:', e);
      }
    };
    loadProfile();
  }, []);

  const handleOpenEdit = () => {
    setEditForm({
      name: teacher.name || '',
      email: teacher.email || '',
      phone: teacher.phone || '',
      qualification: teacher.qualification || '',
      experience: teacher.experience || '',
      address: teacher.address || '',
      subjects: teacher.subjects || ''
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async () => {
    const name = (editForm.name || '').trim();
    const email = (editForm.email || '').trim();
    const phone = (editForm.phone || '').trim();
    const qualification = (editForm.qualification || '').trim();
    const experience = (editForm.experience || '').trim();
    const address = (editForm.address || '').trim();
    const subjects = (editForm.subjects || '').trim();

    if (!name || !email || !phone) {
      Alert.alert('Validation Error', 'Full Name, Email, and Phone number are required.');
      return;
    }

    try {
      setIsSaving(true);
      const updatedObj = {
        ...teacher,
        name,
        email,
        phone,
        qualification: qualification || teacher.qualification,
        experience: experience || teacher.experience,
        address: address || teacher.address,
        subjects: subjects || teacher.subjects
      };

      setTeacher(updatedObj);
      await AsyncStorage.setItem('user', JSON.stringify(updatedObj));
      await AsyncStorage.setItem('lastRegisteredUser', JSON.stringify(updatedObj));

      // Save to backend via dynamic apiService
      await teacherApi.updateProfile({
        name,
        email,
        phone,
        qualification,
        experience,
        address,
        subject: subjects
      }).catch(() => null);

      setIsEditModalOpen(false);
      Alert.alert('Success ✅', 'Your teacher profile has been updated!');
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Could not save profile changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    navigation.navigate('LogoutConfirmation');
  };

  const infoItems = [
    { label: 'Email', val: teacher.email, icon: Mail },
    { label: 'Phone', val: teacher.phone, icon: Phone },
    { label: 'Qualification', val: teacher.qualification, icon: GraduationCap },
    { label: 'Experience', val: teacher.experience, icon: Briefcase },
    { label: 'Address', val: teacher.address, icon: MapPin },
    { label: 'Subjects', val: teacher.subjects, icon: BookOpen }
  ];

  const actions = [
    { label: 'Edit Educator Profile', icon: Edit2, action: handleOpenEdit },
    { label: 'Change Password', icon: Lock, screen: 'TeacherSettings' },
    { label: 'Notification Preferences', icon: Bell, screen: 'TeacherSettings' },
    { label: 'Privacy Settings', icon: Shield, screen: 'TeacherSettings' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* UNIFIED HEADER */}
      <Header navigation={navigation} title="My Profile" currentRoute="MyProfile" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* TEACHER INFO BLOCK CARD */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarCircle}>
            <User size={38} color="#7c3aed" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.teacherName}>{teacher.name}</Text>
              <TouchableOpacity style={styles.editBadgeBtn} onPress={handleOpenEdit}>
                <Edit2 size={14} color="#7c3aed" />
                <Text style={styles.editBadgeText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.teacherId}>Teacher ID: {teacher.empId}</Text>
            <View style={styles.subjectBadge}>
              <Text style={styles.subjectBadgeText}>{teacher.role}</Text>
            </View>
            <Text style={styles.joinedText}>{teacher.joined}</Text>
          </View>
        </View>

        {/* INFO ITEMS LIST */}
        <View style={styles.infoListCard}>
          {infoItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <View
                key={idx}
                style={[
                  styles.infoRow,
                  idx === infoItems.length - 1 && { borderBottomWidth: 0 }
                ]}
              >
                <View style={styles.iconBox}>
                  <IconComp size={16} color="#7c3aed" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoVal}>{item.val}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* ACTIONS CARD */}
        <View style={styles.actionsCard}>
          {actions.map((act, idx) => {
            const IconComp = act.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.actionRow,
                  idx === actions.length - 1 && { borderBottomWidth: 0 }
                ]}
                onPress={() => (act.action ? act.action() : navigation.navigate(act.screen))}
              >
                <View style={styles.actionRowLeft}>
                  <IconComp size={18} color="#7c3aed" />
                  <Text style={styles.actionRowLabel}>{act.label}</Text>
                </View>
                <ChevronRight size={16} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* EDIT PROFILE MODAL */}
      <Modal visible={isEditModalOpen} animationType="slide" transparent onRequestClose={() => setIsEditModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Educator Profile</Text>
              <TouchableOpacity onPress={() => setIsEditModalOpen(false)} style={styles.modalCloseBtn}>
                <X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalFieldLabel}>Full Name</Text>
              <TextInput style={styles.modalInput} value={editForm.name} onChangeText={(val) => setEditForm(p => ({ ...p, name: val }))} placeholder="Full Name" />

              <Text style={styles.modalFieldLabel}>Email Address</Text>
              <TextInput style={styles.modalInput} value={editForm.email} onChangeText={(val) => setEditForm(p => ({ ...p, email: val }))} keyboardType="email-address" autoCapitalize="none" placeholder="Email" />

              <Text style={styles.modalFieldLabel}>Phone Number</Text>
              <TextInput style={styles.modalInput} value={editForm.phone} onChangeText={(val) => setEditForm(p => ({ ...p, phone: val }))} keyboardType="phone-pad" placeholder="Phone" />

              <Text style={styles.modalFieldLabel}>Qualification</Text>
              <TextInput style={styles.modalInput} value={editForm.qualification} onChangeText={(val) => setEditForm(p => ({ ...p, qualification: val }))} placeholder="Qualification" />

              <Text style={styles.modalFieldLabel}>Teaching Experience</Text>
              <TextInput style={styles.modalInput} value={editForm.experience} onChangeText={(val) => setEditForm(p => ({ ...p, experience: val }))} placeholder="Experience" />

              <Text style={styles.modalFieldLabel}>Address</Text>
              <TextInput style={styles.modalInput} value={editForm.address} onChangeText={(val) => setEditForm(p => ({ ...p, address: val }))} placeholder="Address" />

              <Text style={styles.modalFieldLabel}>Subjects Taught</Text>
              <TextInput style={styles.modalInput} value={editForm.subjects} onChangeText={(val) => setEditForm(p => ({ ...p, subjects: val }))} placeholder="Subjects" />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setIsEditModalOpen(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSaveProfile} disabled={isSaving}>
                <Check size={18} color="#ffffff" style={{ marginRight: 6 }} />
                <Text style={styles.modalSaveText}>{isSaving ? 'Saving...' : 'Save Profile'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    position: 'relative',
    minHeight: Platform.OS === 'android' ? 64 + (StatusBar.currentHeight || 0) : 64
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  backBtn: {
    position: 'absolute',
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editBtn: {
    position: 'absolute',
    right: 20,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16 },
  profileHeaderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teacherName: { fontSize: 18, fontWeight: '950', color: '#0f172a' },
  teacherId: { fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: '700' },
  subjectBadge: {
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6
  },
  subjectBadgeText: { fontSize: 10, fontWeight: '900', color: '#7c3aed' },
  joinedText: { fontSize: 11, color: '#94a3b8', fontWeight: '700', marginTop: 8 },
  infoListCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '800' },
  infoVal: { fontSize: 13, fontWeight: '850', color: '#334155', marginTop: 2 },
  actionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  actionRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  actionRowLabel: { fontSize: 13, fontWeight: '800', color: '#334155' },
  logoutBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fca5a5',
    marginBottom: 30
  },
  logoutText: { fontSize: 14, fontWeight: '800', color: '#ef4444' },
  editBadgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#f3e8ff',
    borderWidth: 1,
    borderColor: '#ddd6fe'
  },
  editBadgeText: { fontSize: 11, fontWeight: '800', color: '#7c3aed' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    maxHeight: '85%',
    elevation: 10,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    marginBottom: 12
  },
  modalTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalFieldLabel: { fontSize: 12, fontWeight: '800', color: '#475569', marginTop: 10, marginBottom: 4 },
  modalInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
    color: '#0f172a'
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  modalCancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#f1f5f9'
  },
  modalCancelText: { fontSize: 13, fontWeight: '800', color: '#64748b' },
  modalSaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#7c3aed'
  },
  modalSaveText: { fontSize: 13, fontWeight: '800', color: '#ffffff' }
});
