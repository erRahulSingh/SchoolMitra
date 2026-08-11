import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Key, Phone, ShieldCheck, ArrowRight } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLogo from '../../components/AppLogo';

const { width } = Dimensions.get('window');

export default function Login({ navigation }: any) {
  const [mobile, setMobile] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = async () => {
    if (!mobile || !pin) {
      Alert.alert('Required', 'Please enter Driver Registered Mobile & Access PIN.');
      return;
    }

    // Mock Login session
    const driverUser = {
      name: 'Rajesh Kumar',
      role: 'Senior Fleet Driver',
      busNo: 'UP-32-SM-9942',
      mobile: mobile,
    };
    await AsyncStorage.setItem('driverUser', JSON.stringify(driverUser));
    await AsyncStorage.setItem('accessToken', 'mock-driver-jwt-token');

    navigation.replace('MainApp');
  };

  return (
    <LinearGradient colors={['#0f172a', '#020617']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          {/* Logo Component */}
          <View style={styles.logoContainer}>
            <AppLogo size="medium" />
          </View>
          <Text style={styles.title}>SchoolMitra Driver</Text>
          <Text style={styles.subtitle}>Login to start your duty session</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.inputLabel}>Mobile Number / मोबाइल नंबर</Text>
          <View style={styles.inputBox}>
            <Phone size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. 9876543210"
              placeholderTextColor="#64748b"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          <Text style={styles.inputLabel}>Driver PIN / सिक्योरिटी पिन</Text>
          <View style={styles.inputBox}>
            <Key size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter 4-digit PIN"
              placeholderTextColor="#64748b"
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
              value={pin}
              onChangeText={setPin}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.8}>
            <LinearGradient colors={['#0284c7', '#0369a1']} style={styles.btnGradient}>
              <Text style={styles.loginBtnText}>START DUTY SESSION</Text>
              <ArrowRight size={20} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.footerNote}>
          <ShieldCheck size={16} color="#34d399" />
          <Text style={styles.footerText}>RTO Registered Fleet Device • GPS Live Telemetry</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  inputLabel: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    paddingVertical: 12,
    fontSize: 15,
  },
  loginBtn: {
    marginTop: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 6,
  },
  footerText: {
    color: '#64748b',
    fontSize: 12,
  },
});
