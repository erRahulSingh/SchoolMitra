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
  Alert,
  ActivityIndicator
} from 'react-native';
import {
  ChevronLeft,
  Mail,
  Sparkles,
  Send
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../components/Logo';

export default function ForgotPassword({ navigation }: any) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOTP = () => {
    const trimmed = emailOrPhone.trim();
    if (!trimmed) {
      setError('Please enter your registered email or phone number');
      return;
    }

    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert('OTP Sent 📲', 'A 6-digit verification code has been sent to your device!', [
        { text: 'Proceed', onPress: () => navigation.navigate('ResetPassword', { contact: emailOrPhone }) }
      ]);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* TOP NAV BAR */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <ChevronLeft size={22} color="#1e293b" />
            </TouchableOpacity>

            <View style={styles.portalPill}>
              <Sparkles size={13} color="#7c3aed" />
              <Text style={styles.portalPillText}>PASSWORD RECOVERY</Text>
            </View>

            <View style={{ width: 40 }} />
          </View>

          {/* HERO HEADER */}
          <View style={styles.heroSection}>
            <View style={styles.logoWrapper}>
              <View style={styles.logoGlow} />
              <Logo size={64} />
            </View>
            <Text style={styles.heroTitle}>Forgot Password?</Text>
            <Text style={styles.heroSubtitle}>
              Enter your registered work email or phone number to receive a secure recovery code.
            </Text>
          </View>

          {/* MAIN CARD */}
          <View style={styles.cardContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Registered Email or Phone</Text>
              <View
                style={[
                  styles.inputBox,
                  focusedInput && styles.inputBoxFocused,
                  error ? styles.inputBoxError : null
                ]}
              >
                <Mail
                  size={19}
                  color={error ? '#ef4444' : focusedInput ? '#7c3aed' : '#94a3b8'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="teacher@schoolmitra.com"
                  placeholderTextColor="#94a3b8"
                  value={emailOrPhone}
                  onChangeText={(val) => {
                    setEmailOrPhone(val);
                    if (error) setError(null);
                  }}
                  onFocus={() => setFocusedInput(true)}
                  onBlur={() => setFocusedInput(false)}
                  autoCapitalize="none"
                />
              </View>
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <TouchableOpacity
              onPress={handleSendOTP}
              activeOpacity={0.88}
              disabled={loading}
              style={styles.sendBtnWrapper}
            >
              <LinearGradient
                colors={['#7c3aed', '#6366f1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sendBtn}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <View style={styles.btnContent}>
                    <Text style={styles.sendBtnText}>Send Reset Code</Text>
                    <Send size={16} color="#ffffff" style={{ marginLeft: 8 }} />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToSignInBtn}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
            >
              <Text style={styles.backToSignInText}>← Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4
      },
      android: {
        elevation: 1.5
      }
    })
  },
  portalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    gap: 6
  },
  portalPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7c3aed',
    letterSpacing: 0.8
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  logoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14
  },
  logoGlow: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#c084fc',
    opacity: 0.25,
    transform: [{ scale: 1.2 }]
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0f172a',
    textAlign: 'center',
    letterSpacing: -0.5
  },
  heroSubtitle: {
    fontSize: 13.5,
    color: '#64748b',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 16,
    lineHeight: 20
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    gap: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 14
      },
      android: {
        elevation: 3
      }
    })
  },
  inputWrapper: {
    gap: 6
  },
  inputLabel: {
    fontSize: 12.5,
    fontWeight: '750',
    color: '#334155',
    marginLeft: 2
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14
  },
  inputBoxFocused: {
    borderColor: '#7c3aed',
    backgroundColor: '#ffffff'
  },
  inputBoxError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2'
  },
  inputIcon: {
    marginRight: 10
  },
  textInput: {
    flex: 1,
    fontSize: 14.5,
    color: '#0f172a',
    fontWeight: '600',
    height: '100%'
  },
  errorText: {
    color: '#ef4444',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    marginLeft: 4
  },
  sendBtnWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#7c3aed',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8
      },
      android: {
        elevation: 4
      }
    })
  },
  sendBtn: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendBtnText: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.3
  },
  backToSignInBtn: {
    alignSelf: 'center',
    paddingVertical: 6
  },
  backToSignInText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#7c3aed'
  }
});
