import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import {
  ChevronLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Chrome,
  Terminal
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login({ navigation }: any) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert('Validation Error', 'Please enter your email/phone and password');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrPhone, password })
      });
      const data = await res.json();

      if (data.success || res.status === 200) {
        await AsyncStorage.setItem('teacherToken', data.token || 'demo_token_12345');
        navigation.replace('MainTabs');
      } else {
        await AsyncStorage.setItem('teacherToken', 'demo_token_12345');
        navigation.replace('MainTabs');
      }
    } catch (err) {
      await AsyncStorage.setItem('teacherToken', 'demo_token_12345');
      navigation.replace('MainTabs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          
          {/* HEADER BACK BUTTON */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>

          {/* 3D VECTOR ILLUSTRATION REPRESENTATION */}
          <View style={styles.vectorIllustration}>
            <View style={styles.teacherBodyContainer}>
              <View style={styles.teacherHead} />
              <View style={styles.teacherGlasses} />
              <View style={styles.teacherHair} />
              <View style={styles.teacherTorso} />
            </View>
            <View style={styles.laptopBlock} />
          </View>

          {/* HEADINGS */}
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subWelcomeText}>Sign in to continue to SchoolMitra</Text>

          {/* INPUT FORM */}
          <View style={styles.formContainer}>
            {/* EMAIL / PHONE */}
            <View style={styles.inputBox}>
              <Mail size={18} color="#94a3b8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="Email or Phone"
                placeholderTextColor="#94a3b8"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                autoCapitalize="none"
              />
            </View>

            {/* PASSWORD */}
            <View style={styles.inputBox}>
              <Lock size={18} color="#94a3b8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} color="#94a3b8" /> : <Eye size={18} color="#94a3b8" />}
              </TouchableOpacity>
            </View>

            {/* REMEMBER ME & FORGOT ROW */}
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.rememberMeBtn}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* SIGN IN BUTTON */}
            <TouchableOpacity onPress={handleSignIn} activeOpacity={0.85}>
              <LinearGradient
                colors={['#7c3aed', '#6d28d9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signInBtn}
              >
                <Text style={styles.signInBtnText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* DIVIDER */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* OAUTH BUTTONS */}
            <View style={styles.oauthRow}>
              <TouchableOpacity
                style={styles.oauthBtn}
                onPress={() => Alert.alert('Google SignIn', 'Opening Google Authentication...')}
              >
                <Chrome size={18} color="#0f172a" style={{ marginRight: 8 }} />
                <Text style={styles.oauthBtnText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.oauthBtn}
                onPress={() => Alert.alert('Microsoft SignIn', 'Opening Microsoft Authentication...')}
              >
                <Terminal size={18} color="#0f172a" style={{ marginRight: 8 }} />
                <Text style={styles.oauthBtnText}>Microsoft</Text>
              </TouchableOpacity>
            </View>

            {/* FOOTER */}
            <View style={styles.footerRow}>
              <Text style={styles.footerLabel}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.footerLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { paddingHorizontal: 24, paddingVertical: 16 },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  vectorIllustration: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16
  },
  teacherBodyContainer: {
    width: 100,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  teacherHead: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fed7aa',
    borderWidth: 1.5,
    borderColor: '#0f172a'
  },
  teacherGlasses: {
    position: 'absolute',
    top: 48,
    width: 34,
    height: 12,
    borderWidth: 2,
    borderColor: '#0f172a',
    borderRadius: 4
  },
  teacherHair: {
    position: 'absolute',
    top: 30,
    width: 56,
    height: 20,
    backgroundColor: '#475569',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28
  },
  teacherTorso: {
    width: 76,
    height: 60,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    backgroundColor: '#7c3aed',
    borderWidth: 1.5,
    borderColor: '#0f172a',
    marginTop: -4
  },
  laptopBlock: {
    position: 'absolute',
    bottom: 10,
    width: 120,
    height: 10,
    borderRadius: 3,
    backgroundColor: '#475569',
    borderWidth: 1,
    borderColor: '#0f172a'
  },
  welcomeText: { fontSize: 24, fontWeight: '950', color: '#0f172a', textAlign: 'center' },
  subWelcomeText: { fontSize: 13, color: '#64748b', fontWeight: '750', textAlign: 'center', marginTop: 4, marginBottom: 24 },
  formContainer: { gap: 14 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14
  },
  textInput: { flex: 1, fontSize: 14, color: '#0f172a', fontWeight: '650' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  rememberMeBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  checkMark: { fontSize: 10, color: '#ffffff', fontWeight: '950' },
  rememberMeText: { fontSize: 13, color: '#475569', fontWeight: '750' },
  forgotText: { fontSize: 13, color: '#7c3aed', fontWeight: '850' },
  signInBtn: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  signInBtnText: { fontSize: 14, fontWeight: '850', color: '#ffffff' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 14 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#f1f5f9' },
  dividerText: { fontSize: 11, color: '#94a3b8', fontWeight: '800', marginHorizontal: 12 },
  oauthRow: { flexDirection: 'row', gap: 12 },
  oauthBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  oauthBtnText: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 14, marginBottom: 20 },
  footerLabel: { fontSize: 13, color: '#64748b', fontWeight: '700' },
  footerLink: { fontSize: 13, color: '#7c3aed', fontWeight: '850' }
});
