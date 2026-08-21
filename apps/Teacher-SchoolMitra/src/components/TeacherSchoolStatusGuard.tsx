import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShieldAlert, RefreshCw, LogOut, PhoneCall } from 'lucide-react-native';

export interface TeacherSchoolBlockedState {
  isBlocked: boolean;
  schoolStatus: string;
  code: string;
  message: string;
  schoolName?: string;
}

// Global listener pattern for React Native API events
type BlockListener = (state: TeacherSchoolBlockedState) => void;
const listeners: Set<BlockListener> = new Set();

export const notifyTeacherSchoolBlocked = (state: TeacherSchoolBlockedState) => {
  listeners.forEach(cb => cb(state));
};

export const TeacherSchoolStatusGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blockedState, setBlockedState] = useState<TeacherSchoolBlockedState | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const listener: BlockListener = (state) => {
      setBlockedState(state);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'teacherToken',
        'teacherUser',
        'teacherRole',
        'schoolId',
        'schoolStatus'
      ]);
    } catch {}
    setBlockedState(null);
  };

  const handleCheckStatus = async () => {
    setIsVerifying(true);
    try {
      const token = await AsyncStorage.getItem('teacherToken');
      if (!token) {
        setIsVerifying(false);
        return;
      }
      // Simple status verification probe
      const res = await fetch('http://10.0.2.2:5000/api/v1/teacher/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => fetch('http://localhost:5000/api/v1/teacher/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      }));

      if (res && res.status === 403) {
        const json = await res.json().catch(() => ({}));
        if (json.code === 'SCHOOL_ACCESS_SUSPENDED' || json.schoolStatus === 'SUSPENDED') {
          // Still suspended
          setIsVerifying(false);
          return;
        }
      } else if (res && res.ok) {
        // Reactivated!
        setBlockedState(null);
      }
    } catch {}
    setIsVerifying(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {children}

      {blockedState?.isBlocked && (
        <Modal visible={true} transparent={false} animationType="fade">
          <View style={styles.container}>
            {/* Background Glow Ring */}
            <View style={styles.glowRing} />

            <View style={styles.card}>
              {/* Shield Icon */}
              <View style={styles.iconCircle}>
                <ShieldAlert size={44} color="#ef4444" />
              </View>

              {/* Title */}
              <Text style={styles.title}>School Account Inactive</Text>

              {/* Message */}
              <Text style={styles.message}>
                Your school account is currently unavailable.{'\n'}
                Please contact your School Admin / Super Admin.
              </Text>

              {/* Status Badge */}
              <View style={styles.statusBadge}>
                <Text style={styles.statusLabel}>STATUS: </Text>
                <Text style={styles.statusValue}>{blockedState.schoolStatus || 'SUSPENDED'}</Text>
              </View>

              {/* Restriction Notice */}
              <View style={styles.noticeBox}>
                <Text style={styles.noticeText}>
                  🔒 Attendance, Homework, Marks, Exams, Leave, and all Student operations are temporarily locked.
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnVerify]}
                  onPress={handleCheckStatus}
                  disabled={isVerifying}
                  activeOpacity={0.8}
                >
                  {isVerifying ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <RefreshCw size={16} color="#fff" />
                      <Text style={styles.btnVerifyText}>Check Status</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, styles.btnLogout]}
                  onPress={handleLogout}
                  activeOpacity={0.8}
                >
                  <LogOut size={16} color="#f87171" />
                  <Text style={styles.btnLogoutText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  glowRing: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#111827',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 2,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9ca3af',
  },
  statusValue: {
    fontSize: 12,
    fontWeight: '900',
    color: '#f87171',
  },
  noticeBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    width: '100%',
  },
  noticeText: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  buttonGroup: {
    width: '100%',
    gap: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnVerify: {
    backgroundColor: '#4f46e5',
  },
  btnVerifyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  btnLogout: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
  },
  btnLogoutText: {
    color: '#f87171',
    fontSize: 14,
    fontWeight: '700',
  },
});
