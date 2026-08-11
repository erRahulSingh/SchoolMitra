import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { Home, BookOpen, Bus, LayoutGrid, User, Radio } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export default function ParentCustomTabBar({ state, descriptors, navigation }: TabBarProps) {
  const tabs = [
    { name: 'HomeTab', label: 'Home', icon: Home },
    { name: 'AcademicsTab', label: 'Academics', icon: BookOpen },
    { name: 'TransportTab', label: 'Live Bus', icon: Bus, isLiveBus: true },
    { name: 'MoreTab', label: 'More', icon: LayoutGrid },
    { name: 'ProfileTab', label: 'Profile', icon: User },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          const isFocused = state.index === index;
          const IconComponent = tab.icon;

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

          if (tab.isLiveBus) {
            return (
              <LiveBusTabButton
                key={tab.name}
                isFocused={isFocused}
                onPress={onPress}
                label={tab.label}
              />
            );
          }

          return (
            <StandardTabButton
              key={tab.name}
              IconComponent={IconComponent}
              label={tab.label}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

// Standard Tab Button with Academics-inspired Badge Pill Background enclosing Icon & Text
function StandardTabButton({ IconComponent, label, isFocused, onPress }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isFocused ? 1.06 : 1,
      friction: 5,
      tension: 300,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress} activeOpacity={0.75}>
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
        <View style={[styles.tabContentWrapper, isFocused && styles.tabContentWrapperActive]}>
          <IconComponent
            size={24}
            color={isFocused ? '#4f46e5' : '#64748b'}
            strokeWidth={isFocused ? 2.5 : 1.9}
          />
          <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]} numberOfLines={1}>
            {label}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

// Unique Highlighted Center Live Bus Button with School Bus Yellow ICON & Gentle Animation
function LiveBusTabButton({ isFocused, onPress, label }: any) {
  const iconAnimScale = useRef(new Animated.Value(1)).current;
  const iconAnimTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const busAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(iconAnimScale, {
            toValue: 1.08,
            duration: 950,
            useNativeDriver: true,
          }),
          Animated.timing(iconAnimTranslateY, {
            toValue: -1.5,
            duration: 950,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(iconAnimScale, {
            toValue: 1,
            duration: 950,
            useNativeDriver: true,
          }),
          Animated.timing(iconAnimTranslateY, {
            toValue: 0,
            duration: 950,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    busAnimation.start();
    return () => busAnimation.stop();
  }, []);

  return (
    <TouchableOpacity style={styles.centerTabItem} onPress={onPress} activeOpacity={0.85}>
      {/* Main Raised 3D Floating Dark Indigo Button */}
      <View style={[styles.centerButton, isFocused && styles.centerButtonActive]}>
        {/* Live Indicator Dot */}
        <View style={styles.liveDotRow}>
          <View style={styles.liveDot} />
        </View>

        {/* Animated School Bus Yellow Icon */}
        <Animated.View
          style={{
            transform: [{ scale: iconAnimScale }, { translateY: iconAnimTranslateY }],
          }}
        >
          <Bus size={28} color="#f59e0b" strokeWidth={2.5} />
        </Animated.View>
      </View>

      <View style={[styles.centerLabelPill, isFocused && styles.centerLabelPillActive]}>
        <Text style={[styles.centerTabLabel, isFocused && styles.centerTabLabelActive]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 82,
    backgroundColor: '#f8fafc',
    borderTopWidth: 0,
    borderWidth: 0,
    paddingBottom: Platform.OS === 'ios' ? 16 : 6,
    elevation: 16,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContentWrapper: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    gap: 1,
  },
  tabContentWrapperActive: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  tabLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#64748b',
  },
  tabLabelActive: {
    color: '#4f46e5',
    fontWeight: '900',
  },
  // Center Raised Floating Button Styles
  centerTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
    zIndex: 100,
  },
  centerButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#1e1b4b',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3.5,
    borderColor: '#ffffff',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
  centerButtonActive: {
    backgroundColor: '#0f172a',
    borderColor: '#fef08a',
    transform: [{ scale: 1.05 }],
  },
  liveDotRow: {
    position: 'absolute',
    top: 4,
    right: 6,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#22c55e',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  centerLabelPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 2,
    borderWidth: 0,
  },
  centerLabelPillActive: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    shadowColor: '#d97706',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  centerTabLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#d97706',
  },
  centerTabLabelActive: {
    color: '#b45309',
    fontWeight: '900',
  },
});
