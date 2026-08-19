import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react-native';
import AppLogo from '../../components/AppLogo';
import { useLanguage } from '../../context/LanguageContext';

export default function ForgotPassword({ navigation }: any) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Required', t.emailPlaceholder || 'Please enter your registered email address.');
      return;
    }

    Alert.alert('Reset Link Sent ✉️', `A password reset link has been dispatched to ${email}. Please check your inbox.`, [
      { text: t.backToLogin || 'Back to Login', onPress: () => navigation.navigate('Login') }
    ]);
  };

  return (
    <LinearGradient colors={['#0f172a', '#020617']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <AppLogo size="medium" />
          </View>
          <Text style={styles.title}>{t.recoverTitle || 'Recover Password'}</Text>
          <Text style={styles.subtitle}>{t.recoverSubtitle || 'Enter your email to request recovery link'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.inputLabel}>{t.emailLabel || 'Email Address'}</Text>
          <View style={styles.inputBox}>
            <Mail size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t.emailPlaceholder || 'e.g. amit@schoolmitra.com'}
              placeholderTextColor="#64748b"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleResetPassword} activeOpacity={0.8}>
            <LinearGradient colors={['#0284c7', '#0369a1']} style={styles.btnGradient}>
              <Text style={styles.loginBtnText}>{t.sendRecoveryBtn || 'SEND RECOVERY LINK'}</Text>
              <ArrowRight size={20} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backLink} 
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.backLinkText}>{t.backToLogin || 'Back to Login'}</Text>
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
  container: { flex: 1 },
  scrollContent: { padding: 24, justifyContent: 'center', minHeight: '100%' },
  header: { alignItems: 'center', marginBottom: 28 },
  logoContainer: { marginBottom: 16 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#ffffff', marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#94a3b8', textAlign: 'center' },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#334155' },
  inputLabel: { color: '#cbd5e1', fontSize: 13, fontWeight: '600', marginBottom: 8, marginTop: 8 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0f172a', borderRadius: 10, borderWidth: 1, borderColor: '#334155', paddingHorizontal: 12, marginBottom: 16 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#ffffff', paddingVertical: 12, fontSize: 15 },
  loginBtn: { marginTop: 10, borderRadius: 10, overflow: 'hidden' },
  btnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, gap: 8 },
  loginBtnText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  backLink: { alignItems: 'center', marginTop: 16 },
  backLinkText: { color: '#38bdf8', fontSize: 13, fontWeight: '600' },
  footerNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 32 },
  footerText: { fontSize: 11, color: '#64748b', fontWeight: '500' },
});
