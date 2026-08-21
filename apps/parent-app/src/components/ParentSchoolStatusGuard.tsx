import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShieldAlert, RefreshCw, LogOut } from 'lucide-react-native';

export interface ParentSchoolBlockedState {
  isBlocked: boolean;
  schoolStatus: string;
  code: string;
  message: string;
  schoolName?: string;
}

// Global listener pattern
type ParentBlockListener = (state: ParentSchoolBlockedState) => void;
const parentBlockListeners: Set<ParentBlockListener> = new Set();

export const notifyParentSchoolBlocked = (state: ParentSchoolBlockedState) => {
  parentBlockListeners.forEach(cb => cb(state));
};

export const ParentSchoolStatusGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blockedState, setBlockedState] = useState<ParentSchoolBlockedState | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const listener: ParentBlockListener = (state) => {
      setBlockedState(state);
    };
    parentBlockListeners.add(listener);

    // Initial token & status probe
    const checkInitialStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const res = await fetch(`${apiUrl}/tenant/status`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => null);

        if (res && (res.status === 403 || res.status === 402)) {
          const json = await res.json().catch(() => ({}));
          if (
            json.code === 'SCHOOL_ACCESS_SUSPENDED' ||
            json.code === 'SCHOOL_ACCOUNT_EXPIRED' ||
            json.code === 'SCHOOL_ACCOUNT_DEACTIVATED' ||
            json.schoolStatus === 'SUSPENDED' ||
            json.schoolStatus === 'EXPIRED'
          ) {
            setBlockedState({
              isBlocked: true,
              schoolStatus: json.schoolStatus || 'SUSPENDED',
              code: json.code || 'SCHOOL_ACCESS_SUSPENDED',
              message: json.message || "Your school's account is currently inactive. Please contact the school administration.",
              schoolName: json.schoolName || 'Your School'
            });
          }
        }
      } catch {}
    };

    checkInitialStatus();

    return () => {
      parentBlockListeners.delete(listener);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'accessToken',
        'refreshToken',
        'user',
        'parentId',
        'schoolId',
        'schoolStatus'
      ]);
    } catch {}
    setBlockedState(null);
  };

  const handleCheckStatus = async () => {
    setIsVerifying(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        setIsVerifying(false);
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const res = await fetch(`${apiUrl}/tenant/status`, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => null);

      if (res && res.status === 403) {
        const json = await res.json().catch(() => ({}));
        if (json.code === 'SCHOOL_ACCESS_SUSPENDED' || json.schoolStatus === 'SUSPENDED') {
          setIsVerifying(false);
          return;
        }
      } else if (res && res.ok) {
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
            {/* Ambient Background Glow */}
            <View style={styles.glowRing} />

            <View style={styles.card}>
              {/* Shield Icon */}
              <View style={styles.iconCircle}>
                <ShieldAlert size={44} color="#f59e0b" />
              </View>

              {/* Title */}
              <Text style={styles.title}>School Account Temporarily Unavailable</Text>

              {/* Message */}
              <Text style={styles.message}>
                Your school&apos;s account is currently inactive.{'\n'}
                Please contact the school administration.
              </Text>

              {/* Status Badge */}
              <View style={styles.statusBadge}>
                <Text style={styles.statusLabel}>STATUS: </Text>
                <Text style={styles.statusValue}>{blockedState.schoolStatus || 'SUSPENDED'}</Text>
              </View>

              {/* Restrictions Summary */}
              <View style={styles.noticeBox}>
                <Text style={styles.noticeText}>
                  🔒 Attendance, Homework, Exams, Results, Fee Payments, Bus Tracking, and Communication records are temporarily paused.
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
    backgroundColor: '#0a0f1d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  glowRing: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#11192e',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 2,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
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
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
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
    color: '#fbbf24',
  },
  noticeBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
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
    backgroundColor: '#3b82f6',
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
