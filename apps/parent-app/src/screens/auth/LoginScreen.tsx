import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Sparkles,
  UserCheck,
} from 'lucide-react-native';
import ParentAppLogo from '../../components/ParentAppLogo';
import { useParentAuth } from '../../context/ParentAuthContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useParentAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    const cleanId = identifier.trim();

    if (!cleanId) {
      setErrorMsg('Please enter your registered Email or Mobile Number.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await login(cleanId, password);

      if (res.success) {
        navigation.replace('MainTabs');
      } else {
        setErrorMsg(res.message || 'Invalid credentials. Please verify and try again.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Unable to connect. Please check your internet connection.');
    } finally {
      setSubmitting(false);
    }
  };

  // Quick Demo Auto-fill Helper for instant testing
  const handleAutoFillDemo = () => {
    setIdentifier('rajesh.parent@test.com');
    setPassword('Password@123');
    setErrorMsg('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Hero Gradient */}
      <LinearGradient
        colors={['#4f46e5', '#6366f1', '#a855f7']}
        style={styles.heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ marginBottom: 12 }}>
          <ParentAppLogo size="medium" />
        </View>
        <Text style={styles.appTitle}>SchoolMitra</Text>
        <Text style={styles.appSub}>Parent Portal</Text>
      </LinearGradient>

      {/* Login Card Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.formWrap}
      >
        <ScrollView
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.welcomeTitle}>Welcome Back 👋</Text>
          <Text style={styles.welcomeSub}>
            Sign in with your registered phone or email to track your child's progress
          </Text>

          {/* Error Banner */}
          {errorMsg ? (
            <View style={styles.errorBox}>
              <AlertCircle size={18} color="#ef4444" />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            {/* Email or Phone */}
            <View style={styles.fieldLabelRow}>
              <Text style={styles.fieldLabel}>Email or Mobile Number</Text>
            </View>
            <View style={styles.inputRow}>
              <Mail size={18} color="#94a3b8" />
              <TextInput
                style={styles.input}
                placeholder="e.g. 9876543210 or parent@school.com"
                placeholderTextColor="#94a3b8"
                value={identifier}
                onChangeText={(t) => {
                  setIdentifier(t);
                  if (errorMsg) setErrorMsg('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.fieldLabelRow}>
              <Text style={styles.fieldLabel}>Password</Text>
            </View>
            <View style={styles.inputRow}>
              <Lock size={18} color="#94a3b8" />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={(p) => {
                  setPassword(p);
                  if (errorMsg) setErrorMsg('');
                }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} color="#94a3b8" /> : <Eye size={18} color="#94a3b8" />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            disabled={submitting}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#4f46e5', '#6366f1']}
              style={styles.loginGrad}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {submitting ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  <Text style={styles.loginText}>Sign In</Text>
                  <ArrowRight size={18} color="#ffffff" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Quick Demo Fill Badge */}
          <TouchableOpacity
            style={styles.demoFillBtn}
            onPress={handleAutoFillDemo}
            activeOpacity={0.8}
          >
            <Sparkles size={14} color="#6366f1" />
            <Text style={styles.demoFillText}>Auto-Fill Demo Parent (rajesh.parent)</Text>
          </TouchableOpacity>

          {/* Don't have an account? Sign Up Button */}
          <View style={styles.signupBox}>
            <Text style={styles.signupPrompt}>New to SchoolMitra?</Text>
            <TouchableOpacity
              style={styles.createAccountBtn}
              onPress={() => navigation.navigate('Signup')}
              activeOpacity={0.8}
            >
              <Text style={styles.createAccountText}>Create Parent Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  heroGradient: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 30 : 70,
    paddingBottom: 36,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
  },
  appSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '700',
    marginTop: 3,
  },
  formWrap: {
    flex: 1,
    marginTop: -18,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#ffffff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  formContent: {
    padding: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0f172a',
  },
  welcomeSub: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '600',
    marginBottom: 20,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    flex: 1,
    color: '#b91c1c',
    fontSize: 13,
    fontWeight: '600',
  },
  inputGroup: {
    gap: 12,
  },
  fieldLabelRow: {
    marginTop: 2,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1.2,
    borderColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '600',
  },
  loginBtn: {
    marginTop: 22,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  loginGrad: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 14,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#eef2ff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },
  demoFillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4f46e5',
  },
  signupBox: {
    marginTop: 28,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    alignItems: 'center',
    gap: 8,
  },
  signupPrompt: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  createAccountBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  createAccountText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4f46e5',
  },
});
