import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bus, ShieldAlert, RefreshCw, LogOut } from 'lucide-react-native';

export interface DriverSchoolBlockedState {
  isBlocked: boolean;
  schoolStatus: string;
  code: string;
  message: string;
  schoolName?: string;
}

type DriverBlockListener = (state: DriverSchoolBlockedState) => void;
const driverBlockListeners: Set<DriverBlockListener> = new Set();

export const notifyDriverSchoolBlocked = (state: DriverSchoolBlockedState) => {
  driverBlockListeners.forEach(cb => cb(state));
};

export const DriverSchoolStatusGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blockedState, setBlockedState] = useState<DriverSchoolBlockedState | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const listener: DriverBlockListener = (state) => {
      setBlockedState(state);
    };
    driverBlockListeners.add(listener);

    const checkInitialStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        const res = await fetch('http://localhost:5000/api/v1/tenant/status', {
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
              message: json.message || 'Transport services are currently unavailable. Please contact the School Administration.',
              schoolName: json.schoolName || 'Your School'
            });
          }
        }
      } catch {}
    };

    checkInitialStatus();

    return () => {
      driverBlockListeners.delete(listener);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'accessToken',
        'refreshToken',
        'user',
        'driverId',
        'busId',
        'schoolId'
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

      const res = await fetch('http://localhost:5000/api/v1/tenant/status', {
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
                <ShieldAlert size={44} color="#ef4444" />
              </View>

              {/* Title */}
              <Text style={styles.title}>School Account Inactive</Text>

              {/* Message */}
              <Text style={styles.message}>
                Transport services are currently unavailable.{'\n'}
                Please contact the School Administration.
              </Text>

              {/* Status Badge */}
              <View style={styles.statusBadge}>
                <Text style={styles.statusLabel}>STATUS: </Text>
                <Text style={styles.statusValue}>{blockedState.schoolStatus || 'SUSPENDED'}</Text>
              </View>

              {/* Restrictions Summary */}
              <View style={styles.noticeBox}>
                <Text style={styles.noticeText}>
                  🔒 Trip initiation, live GPS broadcast, student pickup/drop logging, and route navigation are suspended.
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
    backgroundColor: '#0a0d14',
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
    borderColor: 'rgba(239, 68, 68, 0.35)',
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
