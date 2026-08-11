import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Menu } from 'lucide-react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// Components
import CustomTabBar from './src/components/CustomTabBar';
import DrawerContent from './src/components/DrawerContent';

// Auth Screens
import Splash from './src/screens/auth/Splash';
import Login from './src/screens/auth/Login';

// Main Dashboard & Navigation Screens
import MainDashboard from './src/screens/dashboard/MainDashboard';
import RouteScreen from './src/screens/route/RouteScreen';
import RouteDetailsScreen from './src/screens/route/RouteDetailsScreen';
import LiveNavigationScreen from './src/screens/route/LiveNavigationScreen';

// Trip Roster Screens
import StartTripScreen from './src/screens/trip/StartTripScreen';
import LiveTripScreen from './src/screens/trip/LiveTripScreen';
import StudentPickupScreen from './src/screens/trip/StudentPickupScreen';
import StudentDropScreen from './src/screens/trip/StudentDropScreen';
import ReturnTripScreen from './src/screens/trip/ReturnTripScreen';
import TripTimelineScreen from './src/screens/trip/TripTimelineScreen';
import EndTripSummaryScreen from './src/screens/trip/EndTripSummaryScreen';

// Safety & Vehicle Screens
import VehicleChecklistScreen from './src/screens/vehicle/VehicleChecklistScreen';
import DeviceStatusScreen from './src/screens/vehicle/DeviceStatusScreen';
import BusInformationScreen from './src/screens/vehicle/BusInformationScreen';
import SosScreen from './src/screens/sos/SosScreen';

// Duty & Driver Profile Screens
import DutyScheduleScreen from './src/screens/duty/DutyScheduleScreen';
import DriverDocumentsScreen from './src/screens/driver/DriverDocumentsScreen';
import DriverProfileScreen from './src/screens/driver/DriverProfileScreen';
import ProfileSettingsScreen from './src/screens/driver/ProfileSettingsScreen';

// Communication & Support Screens
import MessagesScreen from './src/screens/communication/MessagesScreen';
import DriverNotificationsScreen from './src/screens/communication/DriverNotificationsScreen';
import HelpSupportScreen from './src/screens/communication/HelpSupportScreen';

// Legal Screens
import PrivacyPolicyScreen from './src/screens/legal/PrivacyPolicyScreen';
import TermsConditionsScreen from './src/screens/legal/TermsConditionsScreen';
import AboutScreen from './src/screens/legal/AboutScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.82;

function BottomTabNavigator({ openDrawer }: { openDrawer: () => void }) {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: { 
          backgroundColor: colors.headerBg,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0.5,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerLeft: () => (
          <TouchableOpacity 
            onPress={openDrawer} 
            style={{ marginLeft: 16, padding: 4 }}
            activeOpacity={0.7}
          >
            <Menu size={22} color={colors.text} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={MainDashboard} 
        options={{ title: 'Driver Cockpit' }}
      />
      <Tab.Screen 
        name="Route" 
        component={RouteScreen} 
        options={{ title: 'Route Map' }}
      />
      <Tab.Screen 
        name="Sos" 
        component={SosScreen} 
        options={{ title: 'Emergency SOS' }}
      />
      <Tab.Screen 
        name="StudentPickup" 
        component={StudentPickupScreen} 
        options={{ title: 'Pickup Roster' }}
      />
      <Tab.Screen 
        name="DriverProfile" 
        component={DriverProfileScreen} 
        options={{ title: 'My Profile' }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { colors, isDark } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(0)).current;
  const navigationRef = useRef<any>(null);

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.spring(drawerAnim, {
      toValue: 1,
      friction: 8,
      tension: 65,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  const drawerTranslate = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });

  const overlayOpacity = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const mainScale = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.92],
  });

  const mainTranslate = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, DRAWER_WIDTH * 0.7],
  });

  const mainBorderRadius = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  // Drawer navigation handler
  const drawerNavigation = {
    navigate: (screen: string, params?: any) => {
      if (navigationRef.current) {
        navigationRef.current.navigate(screen, params);
      }
    },
    closeDrawer,
    reset: (options: any) => {
      if (navigationRef.current) {
        navigationRef.current.reset(options);
      }
    },
  };

  return (
    <View style={[styles.rootContainer, { backgroundColor: isDark ? '#050810' : '#e2e8f0' }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={colors.headerBg} />
      
      {/* Drawer */}
      {drawerOpen && (
        <Animated.View style={[
          styles.drawerContainer,
          { 
            transform: [{ translateX: drawerTranslate }],
            width: DRAWER_WIDTH,
          }
        ]}>
          <DrawerContent 
            navigation={drawerNavigation} 
            state={{ index: 0 }} 
          />
        </Animated.View>
      )}

      {/* Main Content */}
      <Animated.View style={[
        styles.mainContainer,
        {
          transform: [
            { scale: mainScale },
            { translateX: mainTranslate },
          ],
          borderRadius: mainBorderRadius,
          overflow: 'hidden',
        }
      ]}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerStyle: { 
                backgroundColor: colors.headerBg,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0.5,
                borderBottomColor: colors.border,
              },
              headerTintColor: colors.text,
              headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
              cardStyle: { backgroundColor: colors.background },
            }}
          >
            {/* Auth Flow */}
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

            {/* Main App Tabs */}
            <Stack.Screen name="MainApp" options={{ headerShown: false }}>
              {() => <BottomTabNavigator openDrawer={openDrawer} />}
            </Stack.Screen>

            {/* Sub Navigation Screens */}
            <Stack.Screen name="StartTrip" component={StartTripScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LiveTrip" component={LiveTripScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RouteDetails" component={RouteDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LiveNavigation" component={LiveNavigationScreen} options={{ title: 'Live GPS Navigation' }} />
            <Stack.Screen name="StudentPickup" component={StudentPickupScreen} options={{ title: 'Pickup Roster' }} />
            <Stack.Screen name="StudentDrop" component={StudentDropScreen} options={{ title: 'Drop Roster' }} />
            <Stack.Screen name="ReturnTrip" component={ReturnTripScreen} options={{ title: 'Return Trip' }} />
            <Stack.Screen name="TripTimeline" component={TripTimelineScreen} options={{ title: 'Trip Timeline' }} />
            <Stack.Screen name="EndTripSummary" component={EndTripSummaryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DriverNotifications" component={DriverNotificationsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VehicleChecklist" component={VehicleChecklistScreen} options={{ title: 'Vehicle Checklist' }} />
            <Stack.Screen name="DeviceStatus" component={DeviceStatusScreen} options={{ title: 'Device Status' }} />
            <Stack.Screen name="BusInformation" component={BusInformationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DutySchedule" component={DutyScheduleScreen} options={{ title: 'Duty Schedule' }} />
            <Stack.Screen name="DriverDocuments" component={DriverDocumentsScreen} options={{ title: 'RTO Documents' }} />
            <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} options={{ title: 'Settings & Language' }} />
            <Stack.Screen name="Messages" component={MessagesScreen} options={{ title: 'Messages' }} />
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ title: 'Help & Support' }} />
            
            {/* Legal Screens */}
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy' }} />
            <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} options={{ title: 'Terms & Conditions' }} />
            <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
          </Stack.Navigator>
        </NavigationContainer>

        {/* Overlay to close drawer */}
        {drawerOpen && (
          <Animated.View 
            style={[
              styles.overlay,
              { opacity: overlayOpacity }
            ]}
          >
            <TouchableOpacity 
              style={StyleSheet.absoluteFillObject} 
              onPress={closeDrawer}
              activeOpacity={1}
            />
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  mainContainer: {
    flex: 1,
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 50,
  },
});
