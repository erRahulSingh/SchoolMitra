import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Mail, CreditCard, Key, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLogo from '../../components/AppLogo';
import { useLanguage } from '../../context/LanguageContext';
import { apiFetch } from '../../lib/api';

const { width } = Dimensions.get('window');

export default function SignUp({ navigation }: any) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [empId, setEmpId] = useState('');
  const [license, setLicense] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    setErrorMessage('');

    if (!name || !email || !empId || !license || !password) {
      setErrorMessage('Please fill in all details (Name, Email, Employee ID, License & Password).');
      return;
    }

    setLoading(true);
    try {
      const response = await apiFetch("/driver/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          empId: empId.trim(),
          license: license.trim(),
          password
        })
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || 'Failed to register account in database.');
        return; // STRICT BLOCK: Stop execution
      }

      // Save database created driver record
      await AsyncStorage.setItem('driverUser', JSON.stringify(data.driver));
      await AsyncStorage.setItem('accessToken', data.token);

      Alert.alert('Account Created 🎉', 'Your driver profile has been registered in the database.', [
        { text: 'Start Duty', onPress: () => navigation.replace('MainApp') }
      ]);
    } catch (err) {
      setLoading(false);
      console.error("[SignUp Fetch Error]:", err);
      setErrorMessage("Could not connect to database server. Please check backend network at http://localhost:5000.");
      // STRICT BLOCK: Stop execution
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#020617']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <AppLogo size="medium" />
          </View>
          <Text style={styles.title}>{t.registerTitle || 'Register Account'}</Text>
          <Text style={styles.subtitle}>{t.registerSubtitle || 'Create your SchoolMitra Driver profile'}</Text>
        </View>

        <View style={styles.card}>
          {errorMessage ? (
            <View style={styles.errorBox}>
              <AlertTriangle size={16} color="#ef4444" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <Text style={styles.inputLabel}>{t.fullName || 'Full Name'}</Text>
          <View style={styles.inputBox}>
            <User size={18} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Amit Kumar"
              placeholderTextColor="#64748b"
              value={name}
              onChangeText={(v) => { setName(v); setErrorMessage(''); }}
            />
          </View>

          <Text style={styles.inputLabel}>{t.emailLabel || 'Email Address'}</Text>
          <View style={styles.inputBox}>
            <Mail size={18} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t.emailPlaceholder || 'e.g. amit@schoolmitra.com'}
              placeholderTextColor="#64748b"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(v) => { setEmail(v); setErrorMessage(''); }}
            />
          </View>

          <Text style={styles.inputLabel}>{t.empIdLabel || 'Employee ID'}</Text>
          <View style={styles.inputBox}>
            <CreditCard size={18} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t.empIdPlaceholder || 'e.g. EMP-DRV-101'}
              placeholderTextColor="#64748b"
              value={empId}
              onChangeText={(v) => { setEmpId(v); setErrorMessage(''); }}
            />
          </View>

          <Text style={styles.inputLabel}>{t.licenseLabel || 'License Number'}</Text>
          <View style={styles.inputBox}>
            <CreditCard size={18} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t.licensePlaceholder || 'e.g. DL142021008765'}
              placeholderTextColor="#64748b"
              value={license}
              onChangeText={(v) => { setLicense(v); setErrorMessage(''); }}
            />
          </View>

          <Text style={styles.inputLabel}>{t.passwordLabel || 'Password'}</Text>
          <View style={styles.inputBox}>
            <Key size={18} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t.choosePasswordPlaceholder || 'Choose a strong password'}
              placeholderTextColor="#64748b"
              secureTextEntry
              value={password}
              onChangeText={(v) => { setPassword(v); setErrorMessage(''); }}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp} disabled={loading} activeOpacity={0.8}>
            <LinearGradient colors={['#0284c7', '#0369a1']} style={styles.btnGradient}>
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  <Text style={styles.loginBtnText}>{t.registerBtn || 'REGISTER & START DUTY'}</Text>
                  <ArrowRight size={20} color="#ffffff" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backLink} 
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.backLinkText}>{t.alreadyHaveAccount || 'Already have an account? Login'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerNote}>
          <ShieldCheck size={16} color="#34d399" />
          <Text style={styles.footerText}>{t.footerText || 'RTO Registered Fleet Device • GPS Live Telemetry'}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24, paddingVertical: 40, justifyContent: 'center', minHeight: '100%' },
  header: { alignItems: 'center', marginBottom: 20 },
  logoContainer: { marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#94a3b8', textAlign: 'center' },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#334155' },
  errorBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#450a0a', borderWidth: 1, borderColor: '#991b1b', borderRadius: 10, padding: 12, marginBottom: 14, gap: 8 },
  errorText: { color: '#fca5a5', fontSize: 12, fontWeight: '600', flex: 1 },
  inputLabel: { color: '#cbd5e1', fontSize: 12, fontWeight: '600', marginBottom: 6, marginTop: 4 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0f172a', borderRadius: 10, borderWidth: 1, borderColor: '#334155', paddingHorizontal: 12, marginBottom: 12 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#ffffff', paddingVertical: 10, fontSize: 14 },
  loginBtn: { marginTop: 10, borderRadius: 10, overflow: 'hidden' },
  btnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, gap: 8 },
  loginBtnText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  backLink: { alignItems: 'center', marginTop: 16 },
  backLinkText: { color: '#38bdf8', fontSize: 13, fontWeight: '600' },
  footerNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 24 },
  footerText: { fontSize: 11, color: '#64748b', fontWeight: '500' },
});
