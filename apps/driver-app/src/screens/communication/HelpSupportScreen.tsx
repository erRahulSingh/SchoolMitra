import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Headphones, PhoneCall, Mail } from 'lucide-react-native';

export default function HelpSupportScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>SchoolMitra Driver Help & Support</Text>
        <Text style={styles.subTitle}>Technical support for GPS OBD devices & app</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Calling Support', '+91 1800 123 4567')}>
          <PhoneCall size={20} color="#34d399" />
          <View style={styles.info}>
            <Text style={styles.itemTitle}>Toll-Free Fleet Helpline</Text>
            <Text style={styles.itemSub}>1800 123 4567 (24x7 Available)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Email Desk', 'transport-support@schoolmitra.com')}>
          <Mail size={20} color="#38bdf8" />
          <View style={styles.info}>
            <Text style={styles.itemTitle}>RTO Compliance Email</Text>
            <Text style={styles.itemSub}>transport-support@schoolmitra.com</Text>
          </View>
        </TouchableOpacity>
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
  card: {
    backgroundColor: '#131b2e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  info: {
    flex: 1,
  },
  itemTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemSub: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
});
