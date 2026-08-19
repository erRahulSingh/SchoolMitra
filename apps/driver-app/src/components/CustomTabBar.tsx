import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { Home, Map, AlertTriangle, Users, User } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = (width - 32) / TAB_COUNT;

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export default function CustomTabBar({ state, descriptors, navigation }: TabBarProps) {
  const { colors, isDark } = useTheme();

  const tabs = [
    { name: 'Dashboard', icon: Home, label: 'Home' },
    { name: 'Route', icon: Map, label: 'Route' },
    { name: 'Sos', icon: AlertTriangle, label: 'SOS', isSos: true },
    { name: 'StudentPickup', icon: Users, label: 'Roster' },
    { name: 'DriverProfile', icon: User, label: 'Profile' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>  
      <View style={[
        styles.tabBar, 
        { 
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.94)' : 'rgba(255, 255, 255, 0.96)',
          borderColor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.15)',
          shadowColor: isDark ? '#38bdf8' : '#0284c7',
        }
      ]}>
        {tabs.map((tab, index) => {
          const isFocused = state.index === index;
          const Icon = tab.icon;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: state.routes[index].key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(state.routes[index].name);
            }
          };

          if (tab.isSos) {
            return (
              <SosTabButton
                key={tab.name}
                isFocused={isFocused}
                onPress={onPress}
                colors={colors}
                isDark={isDark}
                label={tab.label}
              />
            );
          }

          return (
            <TabButton
              key={tab.name}
              Icon={Icon}
              label={tab.label}
              isFocused={isFocused}
              onPress={onPress}
              colors={colors}
              isDark={isDark}
            />
          );
        })}
      </View>
    </View>
  );
}

interface TabButtonProps {
  Icon: any;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  colors: any;
  isDark: boolean;
}

function TabButton({ Icon, label, isFocused, onPress, colors, isDark }: TabButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isFocused ? 1.15 : 1,
      friction: 5,
      tension: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(dotAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const iconColor = isFocused ? colors.accent : colors.tabBarInactive;

  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.iconWrapper, { transform: [{ scale: scaleAnim }] }]}>
        {isFocused && (
          <View style={[styles.activeGlow, { backgroundColor: colors.accentSoft }]} />
        )}
        <Icon size={20} color={iconColor} strokeWidth={isFocused ? 2.5 : 1.8} />
      </Animated.View>
      <Text style={[styles.tabLabel, { color: iconColor, fontWeight: isFocused ? 'bold' : '500' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface SosTabButtonProps {
  isFocused: boolean;
  onPress: () => void;
  colors: any;
  isDark: boolean;
  label: string;
}

function SosTabButton({ isFocused, onPress, colors, isDark, label }: SosTabButtonProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  return (
    <TouchableOpacity
      style={styles.sosTabButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View style={[
        styles.sosOuter,
        { transform: [{ scale: pulseAnim }] }
      ]}>
        <View style={[
          styles.sosInner,
          { 
            backgroundColor: isFocused ? '#dc2626' : '#ef4444',
            shadowColor: '#ef4444',
          }
        ]}>
          <AlertTriangle size={22} color="#ffffff" strokeWidth={2.5} />
        </View>
      </Animated.View>
      <Text style={[styles.tabLabel, { color: isFocused ? '#ef4444' : colors.tabBarInactive, fontWeight: isFocused ? 'bold' : '500', marginTop: 4 }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingHorizontal: 16,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 78,
    borderRadius: 39,
    borderWidth: 1,
    paddingHorizontal: 8,
    width: '100%',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 78,
    gap: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  activeGlow: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  tabLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    marginTop: 0,
  },
  sosTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 78,
    marginTop: -24,
  },
  sosOuter: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
});
