import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, CreditCard, FileText, Bus, FileCode, Headset } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SupportScreen({ navigation }: any) {
  const requestsList = [
    {
      id: '#SR1234',
      title: 'ID Card Issue',
      status: 'Open',
      statusColor: '#16a34a',
      statusBg: '#dcfce7',
      icon: CreditCard,
      color: '#7c3aed',
      bg: '#f3e8ff',
    },
    {
      id: '#SR1233',
      title: 'Fee Receipt',
      status: 'In Progress',
      statusColor: '#ea580c',
      statusBg: '#ffedd5',
      icon: FileText,
      color: '#0284c7',
      bg: '#e0f2fe',
    },
    {
      id: '#SR1232',
      title: 'Bus Route Change',
      status: 'Resolved',
      statusColor: '#2563eb',
      statusBg: '#e0f2fe',
      icon: Bus,
      color: '#475569',
      bg: '#f1f5f9',
    },
    {
      id: '#SR1231',
      title: 'TC Request',
      status: 'Closed',
      statusColor: '#64748b',
      statusBg: '#f1f5f9',
      icon: FileCode,
      color: '#475569',
      bg: '#f1f5f9',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support & Requests</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Hero Banner Card (Purple Gradient) */}
        <LinearGradient
          colors={['#5b21b6', '#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.purpleBanner}
        >
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>We are here to help you!</Text>
            <Text style={styles.bannerSub}>Raise a request or track previous requests.</Text>
            
            <TouchableOpacity 
              style={styles.raiseBtn} 
              onPress={() => navigation.navigate('NewRequest')}
              activeOpacity={0.85}
            >
              <Text style={styles.raiseBtnText}>Raise New Request</Text>
            </TouchableOpacity>
          </View>

          {/* Support Agent Avatar Illustration Badge */}
          <View style={styles.agentGraphicBox}>
            <Headset size={36} color="#ffffff" strokeWidth={2} />
          </View>
        </LinearGradient>

        {/* My Requests Section */}
        <Text style={styles.sectionTitle}>My Requests</Text>
        <View style={styles.requestsCardList}>
          {requestsList.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.requestRow, idx < requestsList.length - 1 && styles.rowBorder]}
                onPress={() => navigation.navigate('RequestDetails', { requestId: item.id, title: item.title, status: item.status })}
                activeOpacity={0.75}
              >
                <View style={[styles.iconSquare, { backgroundColor: item.bg }]}>
                  <IconComp size={20} color={item.color} strokeWidth={2} />
                </View>

                <View style={styles.requestInfoCol}>
                  <Text style={styles.requestTitleText}>{item.title}</Text>
                  <Text style={styles.requestIdText}>Request ID: {item.id}</Text>
                </View>

                <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                  <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 48,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Purple Banner
  purpleBanner: {
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#6d28d9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  bannerLeft: { flex: 1, paddingRight: 10 },
  bannerTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  bannerSub: { fontSize: 11, color: '#ddd6fe', fontWeight: '500', marginTop: 4, marginBottom: 14 },
  raiseBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    alignSelf: 'flex-start',
    elevation: 2,
  },
  raiseBtnText: { fontSize: 12, fontWeight: '900', color: '#2563eb' },
  agentGraphicBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // My Requests List
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 12 },
  requestsCardList: {
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
  requestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconSquare: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  requestInfoCol: { flex: 1 },
  requestTitleText: { fontSize: 14, fontWeight: '900', color: '#0f172a' },
  requestIdText: { fontSize: 11, color: '#64748b', fontWeight: '600', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: '800' },
});
