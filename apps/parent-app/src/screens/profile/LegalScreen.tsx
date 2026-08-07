import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ChevronLeft, FileText } from 'lucide-react-native';

export default function LegalScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Privacy Policy</Text>
        <FileText size={20} color="#0284c7" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.text}>SchoolMitra respects your privacy. We collect student attendance, marks, homework, and fee payment data solely for school administration and parent notification purposes. No personal data is shared with third parties.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Terms of Service</Text>
          <Text style={styles.text}>By using the SchoolMitra Parent App, you agree to receive official school notices, attendance updates, and fee invoices issued by Green Valley Public School.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 56, paddingBottom: 14, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  scrollContent: { padding: 16, gap: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#e2e8f0' },
  title: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 8 },
  text: { fontSize: 13, color: '#64748b', lineHeight: 20 }
});
