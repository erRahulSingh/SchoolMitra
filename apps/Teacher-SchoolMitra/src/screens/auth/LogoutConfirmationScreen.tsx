import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import {
  LogOut,
  Check,
  Building
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutConfirmationScreen({ navigation }: any) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('teacherToken');
      Alert.alert('Logged Out', 'You have been successfully logged out.', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
      ]);
    } catch (err) {
      navigation.replace('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* TOP SCHOOL VECTOR BADGE PLACEHOLDER */}
      <View style={styles.topIllustrationContainer}>
        <View style={styles.schoolIconCircle}>
          <Building size={32} color="#7c3aed" />
        </View>
        <Text style={styles.schoolLabel}>SCHOOL</Text>
      </View>

      {/* LOGOUT EXIT DOOR BADGE */}
      <View style={styles.exitCircleContainer}>
        <View style={styles.exitCircle}>
          <LogOut size={36} color="#ffffff" style={{ marginLeft: 4 }} />
        </View>
      </View>

      {/* PROMPT HEADINGS */}
      <Text style={styles.promptTitle}>Logout ?</Text>
      <Text style={styles.promptSub}>Are you sure you want to</Text>
      <Text style={styles.promptSub}>logout from Teacher App?</Text>

      {/* BULLET CHECKS LIST */}
      <View style={styles.bulletsContainer}>
        <View style={styles.bulletRow}>
          <Check size={16} color="#16a34a" style={{ marginRight: 10 }} />
          <Text style={styles.bulletText}>Your data is safe</Text>
        </View>

        <View style={styles.bulletRow}>
          <Check size={16} color="#16a34a" style={{ marginRight: 10 }} />
          <Text style={styles.bulletText}>You can login again anytime</Text>
        </View>

        <View style={styles.bulletRow}>
          <Check size={16} color="#16a34a" style={{ marginRight: 10 }} />
          <Text style={styles.bulletText}>Thank you for being part of our school community!</Text>
        </View>
      </View>

      {/* BOTTOM ACTIONS BUTTONS */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <LogOut size={16} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 24, justifyContent: 'center' },
  topIllustrationContainer: { alignItems: 'center', marginBottom: 20 },
  schoolIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  schoolLabel: { fontSize: 13, fontWeight: '950', color: '#7c3aed', marginTop: 8, letterSpacing: 2 },
  exitCircleContainer: { alignItems: 'center', marginBottom: 20 },
  exitCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  promptTitle: { fontSize: 24, fontWeight: '950', color: '#0f172a', textAlign: 'center', marginBottom: 10 },
  promptSub: { fontSize: 14, fontWeight: '750', color: '#64748b', textAlign: 'center', lineHeight: 20 },
  bulletsContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginVertical: 26,
    gap: 12
  },
  bulletRow: { flexDirection: 'row', alignItems: 'center' },
  bulletText: { fontSize: 12, fontWeight: '800', color: '#475569', flex: 1 },
  actionsContainer: { gap: 12 },
  logoutBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: { fontSize: 14, fontWeight: '850', color: '#ffffff' },
  cancelBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelText: { fontSize: 14, fontWeight: '850', color: '#475569' }
});
