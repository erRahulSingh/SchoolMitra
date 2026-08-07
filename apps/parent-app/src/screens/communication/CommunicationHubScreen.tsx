import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, MessageSquare, Megaphone, AlertCircle, Phone, ChevronRight } from 'lucide-react-native';

export default function CommunicationHubScreen({ navigation }: any) {
  const options = [
    { title: 'Teacher Messages', desc: 'Chat with your child\'s teachers', icon: MessageSquare, color: '#4f46e5', screen: 'MessagesTab' },
    { title: 'Announcements', desc: 'School-wide notices and updates', icon: Megaphone, color: '#16a34a', screen: 'NoticeBoard' },
    { title: 'Complaints', desc: 'Raise issues and track resolution', icon: AlertCircle, color: '#ef4444', screen: 'Support' },
    { title: 'Emergency Contact', desc: 'School helpline and principal office', icon: Phone, color: '#d97706', screen: 'Help' }
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ChevronLeft size={22} color="#0f172a" /></TouchableOpacity><Text style={styles.headerTitle}>Communication Hub</Text><MessageSquare size={20} color="#4f46e5" /></View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {options.map((o, idx) => {
          const IconComp = o.icon;
          return (
            <TouchableOpacity key={idx} style={styles.card} onPress={() => navigation.navigate(o.screen)} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: o.color + '15' }]}><IconComp size={22} color={o.color} /></View>
              <View style={{ flex: 1 }}><Text style={styles.title}>{o.title}</Text><Text style={styles.desc}>{o.desc}</Text></View>
              <ChevronRight size={18} color="#94a3b8" />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0' },
  iconBox: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  desc: { fontSize: 12, color: '#64748b', marginTop: 2 }
});
