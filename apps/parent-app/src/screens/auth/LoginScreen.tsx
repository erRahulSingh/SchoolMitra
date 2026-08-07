import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, Lock, Mail, GraduationCap } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    await AsyncStorage.setItem('parentToken', 'demo_token');
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#4f46e5', '#6366f1', '#a855f7']} style={styles.heroGradient}>
        <View style={styles.logoCircle}>
          <GraduationCap size={36} color="#4f46e5" />
        </View>
        <Text style={styles.appTitle}>SchoolMitra</Text>
        <Text style={styles.appSub}>Parent Portal</Text>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.formWrap}>
        <ScrollView contentContainerStyle={styles.formContent}>
          <Text style={styles.welcomeTitle}>Welcome Back 👋</Text>
          <Text style={styles.welcomeSub}>Sign in to track your child's progress</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputRow}>
              <Mail size={18} color="#94a3b8" />
              <TextInput style={styles.input} placeholder="Email or Phone" placeholderTextColor="#94a3b8" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </View>
            <View style={styles.inputRow}>
              <Lock size={18} color="#94a3b8" />
              <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#94a3b8" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} color="#94a3b8" /> : <Eye size={18} color="#94a3b8" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
            <LinearGradient colors={['#4f46e5', '#6366f1']} style={styles.loginGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.loginText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  heroGradient: { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 40 : 80, paddingBottom: 40, alignItems: 'center' },
  logoCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginBottom: 12, elevation: 6 },
  appTitle: { fontSize: 28, fontWeight: '900', color: '#ffffff' },
  appSub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: '700', marginTop: 4 },
  formWrap: { flex: 1, marginTop: -20, borderTopLeftRadius: 28, borderTopRightRadius: 28, backgroundColor: '#ffffff', elevation: 8 },
  formContent: { padding: 24, paddingTop: 32 },
  welcomeTitle: { fontSize: 22, fontWeight: '900', color: '#0f172a' },
  welcomeSub: { fontSize: 13, color: '#64748b', marginTop: 4, fontWeight: '600', marginBottom: 24 },
  inputGroup: { gap: 14 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f8fafc', borderRadius: 16, paddingHorizontal: 16, height: 54, borderWidth: 1, borderColor: '#e2e8f0' },
  input: { flex: 1, fontSize: 15, color: '#0f172a', fontWeight: '600' },
  loginBtn: { marginTop: 24, borderRadius: 16, overflow: 'hidden', elevation: 4 },
  loginGrad: { height: 54, justifyContent: 'center', alignItems: 'center', borderRadius: 16 },
  loginText: { fontSize: 16, fontWeight: '900', color: '#ffffff' },
  forgotBtn: { marginTop: 16, alignItems: 'center' },
  forgotText: { fontSize: 14, color: '#4f46e5', fontWeight: '700' }
});
