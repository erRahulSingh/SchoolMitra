import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FileCheck, ShieldCheck, CheckCircle2 } from 'lucide-react-native';

export default function DriverDocumentsScreen() {
  const docs = [
    { title: 'Commercial Driving License (Heavy Vehicle)', validTill: '2028-12-31', status: 'VERIFIED RTO' },
    { title: 'Vehicle Registration Certificate (RC)', validTill: '2029-05-15', status: 'VERIFIED RTO' },
    { title: 'Commercial Passenger Bus Insurance', validTill: '2027-03-31', status: 'ACTIVE' },
    { title: 'Pollution Under Control (PUC) Certificate', validTill: '2026-11-20', status: 'ACTIVE' },
    { title: 'Driver Police Verification & Background Check', validTill: '2027-01-10', status: 'APPROVED' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>RTO Compliance & Driver Vault</Text>
        <Text style={styles.subTitle}>Verified digital compliance certificates</Text>
      </View>

      <View style={styles.list}>
        {docs.map((doc, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <FileCheck size={20} color="#38bdf8" />
              <Text style={styles.cardTitle}>{doc.title}</Text>
            </View>

            <View style={styles.badgeRow}>
              <CheckCircle2 size={14} color="#34d399" />
              <Text style={styles.statusText}>{doc.status}</Text>
              <Text style={styles.validText}>• Valid till: {doc.validTill}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subTitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#131b2e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: 'bold',
  },
  validText: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
