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
  Send
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ForgotPassword({ navigation }: any) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (!emailOrPhone) {
      Alert.alert('Validation Error', 'Please enter your registered Email or Phone number');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert('OTP Sent 📲', 'A 6-digit verification code has been sent to your device!');
      navigation.navigate('ResetPassword', { contact: emailOrPhone });
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* HEADER BACK BUTTON */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>

          {/* 3D VECTOR ILLUSTRATION */}
          <View style={styles.vectorIllustration}>
            <View style={styles.envelopeCard}>
              <Mail size={48} color="#ffffff" />
              <View style={styles.badgeLock}>
                <Lock size={14} color="#7c3aed" />
              </View>
            </View>
          </View>

          {/* HEADINGS */}
          <Text style={styles.forgotTitle}>Forgot Password?</Text>
          <Text style={styles.subForgotText}>
            Don't worry! Enter your registered email or phone number and we'll send you instructions to reset your password.
          </Text>

          {/* FORM */}
          <View style={styles.form}>
            <View style={styles.inputBox}>
              <Mail size={18} color="#94a3b8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="Email or Phone Number"
                placeholderTextColor="#94a3b8"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity onPress={handleSendOTP} activeOpacity={0.85} disabled={loading}>
              <LinearGradient
                colors={['#7c3aed', '#6d28d9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sendBtn}
              >
                <Text style={styles.sendBtnText}>
                  {loading ? 'Sending OTP...' : 'Send Reset Link'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* BACK TO SIGN IN */}
          <TouchableOpacity
            style={styles.backToSignInBtn}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.backToSignInText}>Back to Sign In</Text>
          </TouchableOpacity>

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
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  envelopeCard: {
    width: 110,
    height: 90,
    borderRadius: 20,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 4,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6
  },
  badgeLock: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#7c3aed'
  },
  forgotTitle: { fontSize: 24, fontWeight: '950', color: '#0f172a', textAlign: 'center' },
  subForgotText: { fontSize: 13, color: '#64748b', fontWeight: '750', textAlign: 'center', marginTop: 10, paddingHorizontal: 10, lineHeight: 18, marginBottom: 24 },
  form: { gap: 16 },
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
  sendBtn: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  sendBtnText: { fontSize: 14, fontWeight: '850', color: '#ffffff' },
  backToSignInBtn: { alignSelf: 'center', marginTop: 24 },
  backToSignInText: { fontSize: 14, fontWeight: '900', color: '#7c3aed' }
});
