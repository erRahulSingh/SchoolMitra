import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Key, Mail, Lock, ShieldCheck, ArrowRight, Globe, AlertTriangle, UserPlus } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLogo from '../../components/AppLogo';
import { useLanguage, LanguageCode } from '../../context/LanguageContext';
import { apiFetch } from '../../lib/api';

const { width } = Dimensions.get('window');

export default function Login({ navigation }: any) {
  const { language, setLanguage, t, languages } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorCode, setErrorCode] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    setErrorCode('');

    if (!email || !password) {
      setErrorMessage('Please enter both registered Email and Password.');
      return;
    }

    setLoading(true);
    try {
      const response = await apiFetch("/driver/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || 'Invalid Email or Password.');
        setErrorCode(data.code || 'AUTH_ERROR');
        return; // STRICT BLOCK: Stop execution
      }

      // Successful Database Authentication Only
      await AsyncStorage.setItem('driverUser', JSON.stringify(data.driver));
      await AsyncStorage.setItem('accessToken', data.token || 'driver-jwt-token');

      navigation.replace('MainApp');
    } catch (err: any) {
      setLoading(false);
      console.error("[Login Fetch Error]:", err);
      setErrorMessage("Could not connect to database server. Please check backend network at http://localhost:5000.");
      setErrorCode("NETWORK_ERROR");
      // STRICT BLOCK: Stop execution
    }
  };

  const handleGoogleLogin = async () => {
    // Simulated Google Authentication workflow
    const driverUser = {
      name: 'Google Driver Captain',
      role: 'Senior Fleet Driver',
      busNo: 'BUS-01',
      email: 'driver.google@schoolmitra.com',
    };
    await AsyncStorage.setItem('driverUser', JSON.stringify(driverUser));
    await AsyncStorage.setItem('accessToken', 'mock-google-jwt-token');

    Alert.alert('Google Authentication', 'Signed in successfully using Google Auth!', [
      { text: 'OK', onPress: () => navigation.replace('MainApp') }
    ]);
  };

  return (
    <LinearGradient colors={['#0f172a', '#020617']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Top Language Selector Bar */}
        <View style={styles.langSelectorBar}>
          <View style={styles.langHeaderTitle}>
            <Globe size={16} color="#38bdf8" />
            <Text style={styles.langLabelText}>{t.selectAppLanguage || 'Language'}:</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langPillsScroll}>
            {languages.map((item) => {
              const isActive = language === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  style={[styles.langPill, isActive && styles.langPillActive]}
                  onPress={() => setLanguage(item.code as LanguageCode)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.langFlag}>{item.flag}</Text>
                  <Text style={[styles.langPillText, isActive && styles.langPillTextActive]}>{item.nativeName}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.header}>
          {/* Logo Component */}
          <View style={styles.logoContainer}>
            <AppLogo size="medium" />
          </View>
          <Text style={styles.title}>{t.loginTitle || 'SchoolMitra Driver'}</Text>
          <Text style={styles.subtitle}>{t.loginSubtitle || 'Login to start your duty session'}</Text>
        </View>

        <View style={styles.card}>

          {/* Database Authentication Error Banner */}
          {errorMessage ? (
            <View style={styles.errorCardBox}>
              <View style={styles.errorHeaderRow}>
                <AlertTriangle size={18} color="#ef4444" />
                <Text style={styles.errorTitleText}>
                  {errorCode === 'USER_NOT_FOUND' 
                    ? 'Account Not Found' 
                    : errorCode === 'INVALID_PASSWORD' 
                    ? 'Incorrect Password' 
                    : 'Authentication Failed'}
                </Text>
              </View>
              <Text style={styles.errorDescText}>{errorMessage}</Text>

              {errorCode === 'USER_NOT_FOUND' && (
                <TouchableOpacity 
                  style={styles.errorRedirectBtn} 
                  onPress={() => navigation.navigate('SignUp')}
                  activeOpacity={0.85}
                >
                  <UserPlus size={16} color="#ffffff" />
                  <Text style={styles.errorRedirectBtnText}>Create New Account (Sign Up)</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}

          <Text style={styles.inputLabel}>{t.emailLabel || 'Email Address'}</Text>
          <View style={styles.inputBox}>
            <Mail size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t.emailPlaceholder || 'e.g. driver@schoolmitra.com'}
              placeholderTextColor="#64748b"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(val) => { setEmail(val); setErrorMessage(''); }}
            />
          </View>

          <Text style={styles.inputLabel}>{t.passwordLabel || 'Password'}</Text>
          <View style={styles.inputBox}>
            <Lock size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t.passwordPlaceholder || 'Enter your password'}
              placeholderTextColor="#64748b"
              secureTextEntry
              value={password}
              onChangeText={(val) => { setPassword(val); setErrorMessage(''); }}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading} activeOpacity={0.8}>
            <LinearGradient colors={['#0284c7', '#0369a1']} style={styles.btnGradient}>
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  <Text style={styles.loginBtnText}>{t.startDutyBtn || 'START DUTY SESSION'}</Text>
                  <ArrowRight size={20} color="#ffffff" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* OR Separator line */}
          <View style={styles.separatorRow}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>{t.orText || 'OR'}</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Google Auth Button */}
          <TouchableOpacity 
            style={styles.googleBtn} 
            onPress={handleGoogleLogin} 
            activeOpacity={0.85}
          >
            <Text style={styles.googleIconText}>G</Text>
            <Text style={styles.googleBtnText}>{t.continueWithGoogle || 'Continue with Google'}</Text>
          </TouchableOpacity>

          <View style={styles.linksRow}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} activeOpacity={0.7}>
              <Text style={styles.linkText}>{t.registerAccount || 'Register Account'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} activeOpacity={0.7}>
              <Text style={styles.linkText}>{t.forgotPassword || 'Forgot Password?'}</Text>
            </TouchableOpacity>
          </View>
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
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    justifyContent: 'center',
    minHeight: '100%',
  },
  langSelectorBar: {
    marginBottom: 20,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  langHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  langLabelText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
  langPillsScroll: {
    flexDirection: 'row',
    gap: 8,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
  },
  langPillActive: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  langFlag: {
    fontSize: 14,
  },
  langPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  langPillTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
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
  errorCardBox: {
    backgroundColor: '#450a0a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#991b1b',
  },
  errorHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  errorTitleText: {
    color: '#fca5a5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorDescText: {
    color: '#fecaca',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  errorRedirectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    gap: 8,
  },
  errorRedirectBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
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
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  separatorText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 10,
  },
  googleIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ea4335',
  },
  googleBtnText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  linkText: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '600',
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
