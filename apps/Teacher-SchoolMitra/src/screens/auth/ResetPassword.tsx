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
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  KeyRound
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../components/Logo';

export default function ResetPassword({ navigation }: any) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

  const validate = () => {
    const newErr: any = {};
    if (!newPassword) {
      newErr.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErr.newPassword = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErr.confirmPassword = 'Confirm your new password';
    } else if (newPassword !== confirmPassword) {
      newErr.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleResetPassword = () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      Alert.alert('Password Updated! ✅', 'Your password has been successfully reset. Please sign in.', [
        { text: 'Sign In Now', onPress: () => navigation.replace('Login') }
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
              <Text style={styles.portalPillText}>SET NEW PASSWORD</Text>
            </View>

            <View style={{ width: 40 }} />
          </View>

          {/* HERO HEADER */}
          <View style={styles.heroSection}>
            <View style={styles.logoWrapper}>
              <View style={styles.logoGlow} />
              <Logo size={64} />
            </View>
            <Text style={styles.heroTitle}>Create New Password</Text>
            <Text style={styles.heroSubtitle}>
              Please choose a strong password to protect your teacher account.
            </Text>
          </View>

          {/* MAIN CARD */}
          <View style={styles.cardContainer}>
            {/* NEW PASSWORD */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>New Password</Text>
              <View
                style={[
                  styles.inputBox,
                  focusedInput === 'newPassword' && styles.inputBoxFocused,
                  errors.newPassword ? styles.inputBoxError : null
                ]}
              >
                <Lock
                  size={19}
                  color={
                    errors.newPassword
                      ? '#ef4444'
                      : focusedInput === 'newPassword'
                      ? '#7c3aed'
                      : '#94a3b8'
                  }
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter new password (Min 6 chars)"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  value={newPassword}
                  onChangeText={(val) => {
                    setNewPassword(val);
                    if (errors.newPassword) setErrors(p => ({ ...p, newPassword: undefined }));
                  }}
                  onFocus={() => setFocusedInput('newPassword')}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  {showPassword ? <EyeOff size={19} color="#64748b" /> : <Eye size={19} color="#64748b" />}
                </TouchableOpacity>
              </View>
              {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
            </View>

            {/* CONFIRM NEW PASSWORD */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <View
                style={[
                  styles.inputBox,
                  focusedInput === 'confirmPassword' && styles.inputBoxFocused,
                  errors.confirmPassword ? styles.inputBoxError : null
                ]}
              >
                <Lock
                  size={19}
                  color={
                    errors.confirmPassword
                      ? '#ef4444'
                      : focusedInput === 'confirmPassword'
                      ? '#7c3aed'
                      : '#94a3b8'
                  }
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Re-enter new password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={(val) => {
                    setConfirmPassword(val);
                    if (errors.confirmPassword) setErrors(p => ({ ...p, confirmPassword: undefined }));
                  }}
                  onFocus={() => setFocusedInput('confirmPassword')}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.7}
                >
                  {showConfirmPassword ? <EyeOff size={19} color="#64748b" /> : <Eye size={19} color="#64748b" />}
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* PASSWORD CRITERIA HINT */}
            <View style={styles.hintBox}>
              <KeyRound size={15} color="#7c3aed" />
              <Text style={styles.hintText}>
                Use at least 6 characters including numbers or special symbols.
              </Text>
            </View>

            {/* SUBMIT BUTTON */}
            <TouchableOpacity
              onPress={handleResetPassword}
              activeOpacity={0.88}
              disabled={loading}
              style={styles.resetBtnWrapper}
            >
              <LinearGradient
                colors={['#7c3aed', '#6366f1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.resetBtn}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.resetBtnText}>Update Password</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* SUCCESS BANNER */}
            {success && (
              <View style={styles.successBanner}>
                <CheckCircle2 size={18} color="#16a34a" style={{ marginRight: 8 }} />
                <Text style={styles.successText}>Password updated successfully!</Text>
              </View>
            )}
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
    gap: 16,
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
  eyeBtn: {
    padding: 6
  },
  errorText: {
    color: '#ef4444',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    marginLeft: 4
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#faf5ff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#f3e8ff'
  },
  hintText: {
    flex: 1,
    fontSize: 12,
    color: '#6b21a8',
    fontWeight: '600',
    lineHeight: 16
  },
  resetBtnWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 6,
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
  resetBtn: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resetBtnText: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.3
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 12,
    padding: 12,
    marginTop: 8
  },
  successText: {
    fontSize: 13,
    fontWeight: '750',
    color: '#166534'
  }
});
