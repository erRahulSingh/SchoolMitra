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
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle2
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResetPassword({ navigation }: any) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill in both password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      Alert.alert('Success ✅', 'Password updated successfully!', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
      ]);
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

          {/* 3D VECTOR SHIELD PADLOCK */}
          <View style={styles.vectorIllustration}>
            <View style={styles.shieldCard}>
              <Shield size={48} color="#ffffff" />
              <View style={styles.badgeCheck}>
                <CheckCircle2 size={16} color="#16a34a" />
              </View>
            </View>
          </View>

          {/* HEADINGS */}
          <Text style={styles.resetTitle}>Create New Password</Text>
          <Text style={styles.subResetText}>
            Enter your new password and confirm it to update your account.
          </Text>

          {/* FORM */}
          <View style={styles.form}>
            {/* NEW PASSWORD */}
            <View style={styles.inputBox}>
              <Lock size={18} color="#94a3b8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="New Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} color="#94a3b8" /> : <Eye size={18} color="#94a3b8" />}
              </TouchableOpacity>
            </View>

            {/* PASSWORD STRENGTH */}
            <View style={styles.strengthRow}>
              <Text style={styles.strengthLabel}>Strong</Text>
              <View style={styles.strengthTrack}>
                <View style={[styles.strengthFill, { width: '50%' }]} />
              </View>
            </View>

            {/* CONFIRM NEW PASSWORD */}
            <View style={styles.inputBox}>
              <Lock size={18} color="#94a3b8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="Confirm New Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={18} color="#94a3b8" /> : <Eye size={18} color="#94a3b8" />}
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleResetPassword} activeOpacity={0.85} disabled={loading}>
              <LinearGradient
                colors={['#7c3aed', '#6d28d9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.resetBtn}
              >
                <Text style={styles.resetBtnText}>
                  {loading ? 'Updating...' : 'Reset Password'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* SUCCESS BANNER FOOTER */}
          {success && (
            <View style={styles.successBanner}>
              <CheckCircle2 size={18} color="#16a34a" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.successTitle}>Password updated successfully!</Text>
                <Text style={styles.successDesc}>You can now sign in with your new password.</Text>
              </View>
            </View>
          )}

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
  shieldCard: {
    width: 100,
    height: 100,
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
  badgeCheck: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#16a34a'
  },
  resetTitle: { fontSize: 24, fontWeight: '950', color: '#0f172a', textAlign: 'center' },
  subResetText: { fontSize: 13, color: '#64748b', fontWeight: '750', textAlign: 'center', marginTop: 10, paddingHorizontal: 15, lineHeight: 18, marginBottom: 24 },
  form: { gap: 14 },
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
  strengthRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 6, marginVertical: 2 },
  strengthLabel: { fontSize: 11, fontWeight: '900', color: '#16a34a' },
  strengthTrack: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#f1f5f9' },
  strengthFill: { height: 6, borderRadius: 3, backgroundColor: '#16a34a' },
  resetBtn: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  resetBtnText: { fontSize: 14, fontWeight: '850', color: '#ffffff' },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 16,
    padding: 14,
    marginTop: 24
  },
  successTitle: { fontSize: 12, fontWeight: '900', color: '#166534' },
  successDesc: { fontSize: 11, color: '#15803d', fontWeight: '700', marginTop: 2 }
});
