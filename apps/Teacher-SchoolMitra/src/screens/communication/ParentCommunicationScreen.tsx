import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import {
  ChevronLeft,
  Users,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Phone,
  MessageSquare,
  Megaphone,
  User
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ParentCommunicationScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('My Classes');
  const [searchQuery, setSearchQuery] = useState('');

  const parents = [
    { id: '1', name: 'Aarav Sharma', parent: "Aarav's Parent", status: 'Active', color: '#16a34a', bg: '#ecfdf5' },
    { id: '2', name: 'Diya Verma', parent: "Diya's Parent", status: 'Active', color: '#16a34a', bg: '#ecfdf5' },
    { id: '3', name: 'Rohan Singh', parent: "Rohan's Parent", status: 'Active', color: '#16a34a', bg: '#ecfdf5' },
    { id: '4', name: 'Ananya Gupta', parent: "Ananya's Parent", status: 'Active', color: '#16a34a', bg: '#ecfdf5' },
    { id: '5', name: 'Kunal Patel', parent: "Kunal's Parent", status: 'Active', color: '#16a34a', bg: '#ecfdf5' }
  ];

  const filteredParents = parents.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Parent Communication</Text>
        <TouchableOpacity style={styles.usersBtn}>
          <Users size={18} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO CARD */}
        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Stay connected with</Text>
            <Text style={styles.heroTitle}>students' parents for</Text>
            <Text style={styles.heroTitleSub}>better learning.</Text>
          </View>
          <View style={styles.heroIconBadge}>
            <Users size={30} color="#7c3aed" />
          </View>
        </LinearGradient>

        {/* TABS SELECTORS */}
        <View style={styles.tabRow}>
          {['My Classes', 'All Parents'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabItemText, activeTab === tab && styles.tabItemTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CLASS SELECTOR DROPDOWN */}
        <TouchableOpacity style={styles.dropdownField} onPress={() => Alert.alert('Class', 'Select Class...')}>
          <Text style={styles.dropdownVal}>Class 8 - A</Text>
          <ChevronDown size={18} color="#64748b" />
        </TouchableOpacity>

        {/* 3 STATS BOXES */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={[styles.statVal, { color: '#7c3aed' }]}>36</Text>
            <Text style={styles.statLabel}>Total Parents</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statVal, { color: '#16a34a' }]}>34</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statVal, { color: '#dc2626' }]}>2</Text>
            <Text style={styles.statLabel}>Inactive</Text>
          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search parents..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Search size={18} color="#94a3b8" style={styles.searchIcon} />
          <TouchableOpacity style={styles.filterBtn} onPress={() => Alert.alert('Filter', 'Filter roster...')}>
            <SlidersHorizontal size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* PARENTS LIST */}
        <View style={styles.listContainer}>
          {filteredParents.map((item) => (
            <View key={item.id} style={styles.parentCard}>
              <View style={styles.avatarCircle}>
                <User size={18} color="#7c3aed" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.parentName}>{item.name}</Text>
                <Text style={styles.parentSubtitle}>{item.parent}</Text>
                
                <View style={[styles.statusBadge, { backgroundColor: item.bg }]}>
                  <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.actionIconsRow}>
                <TouchableOpacity
                  style={styles.actionIconBtn}
                  onPress={() => Alert.alert('Call', `Dialing ${item.parent} phone number...`)}
                >
                  <Phone size={16} color="#7c3aed" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionIconBtn}
                  onPress={() => Alert.alert('Message', `Opening direct parent chat with ${item.name}...`)}
                >
                  <MessageSquare size={16} color="#7c3aed" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.sendAnnouncementBtn}
          onPress={() => Alert.alert('Announcement', 'Compose announcement broadcast to all parents...')}
        >
          <Megaphone size={16} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.sendAnnouncementText}>Send Announcement</Text>
        </TouchableOpacity>
      </View>
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
  usersBtn: {
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
  heroCard: {
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  heroTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  heroTitleSub: { fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 4, fontWeight: '600' },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', marginBottom: 20 },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabItemActive: { borderBottomWidth: 2, borderBottomColor: '#7c3aed' },
  tabItemText: { fontSize: 13, fontWeight: '750', color: '#94a3b8' },
  tabItemTextActive: { color: '#7c3aed', fontWeight: '900' },
  dropdownField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20
  },
  dropdownVal: { fontSize: 14, fontWeight: '750', color: '#0f172a' },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statBox: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 12,
    alignItems: 'center'
  },
  statVal: { fontSize: 18, fontWeight: '950' },
  statLabel: { fontSize: 10, fontWeight: '800', color: '#94a3b8', marginTop: 2, textAlign: 'center' },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8
  },
  searchInput: {
    flex: 1,
    height: 46,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600'
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    top: 14
  },
  filterBtn: {
    width: 46,
    height: 46,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: { gap: 12, marginBottom: 80 },
  parentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  parentName: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  parentSubtitle: { fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: '650' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6
  },
  statusText: { fontSize: 9, fontWeight: '900' },
  actionIconsRow: { flexDirection: 'row', gap: 8 },
  actionIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  sendAnnouncementBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendAnnouncementText: { fontSize: 14, fontWeight: '800', color: '#ffffff' }
});
