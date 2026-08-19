// SchoolMitra Parent Portal App Entry
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Auth Screens
import LoginScreen from './src/screens/auth/LoginScreen';

// Dashboard (Home Tab)
import ParentDashboard from './src/screens/dashboard/ParentDashboard';
import NotificationsScreen from './src/screens/dashboard/NotificationsScreen';
import NoticeBoardScreen from './src/screens/dashboard/NoticeBoardScreen';
import CircularsScreen from './src/screens/dashboard/CircularsScreen';

// Child Profile
import ChildProfileScreen from './src/screens/child/ChildProfileScreen';
import DigitalIDCardScreen from './src/screens/child/DigitalIDCardScreen';
import MedicalRecordsScreen from './src/screens/child/MedicalRecordsScreen';
import MedicalDetailsScreen from './src/screens/profile/MedicalDetailsScreen';

// Academics
import AcademicsHubScreen from './src/screens/academics/AcademicsHubScreen';
import AttendanceScreen from './src/screens/academics/AttendanceScreen';
import AttendanceAnalyticsScreen from './src/screens/academics/AttendanceAnalyticsScreen';
import HomeworkScreen from './src/screens/academics/HomeworkScreen';
import AssignmentsScreen from './src/screens/academics/AssignmentsScreen';
import ExamsScreen from './src/screens/academics/ExamsScreen';
import ReportCardScreen from './src/screens/academics/ReportCardScreen';
import StudyMaterialsScreen from './src/screens/academics/StudyMaterialsScreen';
import SubjectDetailsScreen from './src/screens/academics/SubjectDetailsScreen';
import TimeTableScreen from './src/screens/academics/TimeTableScreen';
import AcademicPerformanceScreen from './src/screens/academics/AcademicPerformanceScreen';

// Fees
import FeesScreen from './src/screens/fees/FeesScreen';
import FeeReceiptScreen from './src/screens/fees/FeeReceiptScreen';
import FeeHistoryScreen from './src/screens/fees/FeeHistoryScreen';
import DueInvoicesScreen from './src/screens/fees/DueInvoicesScreen';

// Transport
import LiveBusTrackingScreen from './src/screens/transport/LiveBusTrackingScreen';
import RouteDetailsScreen from './src/screens/transport/RouteDetailsScreen';
import BusStopDetailsScreen from './src/screens/transport/BusStopDetailsScreen';
import TripHistoryScreen from './src/screens/transport/TripHistoryScreen';
import PickupDropTimelineScreen from './src/screens/transport/PickupDropTimelineScreen';

// Communication
import ParentMessagesScreen from './src/screens/communication/ParentMessagesScreen';
import CommunicationHubScreen from './src/screens/communication/CommunicationHubScreen';

// School Info
import AboutSchoolScreen from './src/screens/school/AboutSchoolScreen';
import EventsScreen from './src/screens/school/EventsScreen';
import GalleryScreen from './src/screens/school/GalleryScreen';
import HolidaysScreen from './src/screens/school/HolidaysScreen';
import CalendarScreen from './src/screens/school/CalendarScreen';
import TeacherProfileScreen from './src/screens/school/TeacherProfileScreen';

// Profile & Settings
import ParentProfileScreen from './src/screens/profile/ParentProfileScreen';
import ParentDocumentsCertificatesScreen from './src/screens/profile/ParentDocumentsCertificatesScreen';
import NotificationSettingsScreen from './src/screens/profile/NotificationSettingsScreen';
import PrivacySecurityScreen from './src/screens/profile/PrivacySecurityScreen';
import LegalScreen from './src/screens/profile/LegalScreen';
import HelpScreen from './src/screens/profile/HelpScreen';
import HelpSupportScreen from './src/screens/profile/HelpSupportScreen';
import SupportScreen from './src/screens/profile/SupportScreen';
import MoreScreen from './src/screens/profile/MoreScreen';
import NewRequestScreen from './src/screens/profile/NewRequestScreen';
import RequestDetailsScreen from './src/screens/profile/RequestDetailsScreen';

// Components
import ParentCustomTabBar from './src/components/ParentCustomTabBar';
import ParentDrawerContent from './src/components/ParentDrawerContent';

import { ParentDrawerProvider } from './src/context/ParentDrawerContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.82;

function ParentTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <ParentCustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={ParentDashboard} />
      <Tab.Screen name="AcademicsTab" component={AcademicsHubScreen} />
      <Tab.Screen name="TransportTab" component={LiveBusTrackingScreen} />
      <Tab.Screen name="MoreTab" component={MoreScreen} />
      <Tab.Screen name="ProfileTab" component={ParentProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
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
    outputRange: [1, 0.93],
  });

  const mainTranslate = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, DRAWER_WIDTH * 0.7],
  });

  const drawerNavigation = {
    navigate: (screen: string, params?: any) => {
      closeDrawer();
      if (navigationRef.current) {
        navigationRef.current.navigate(screen, params);
      }
    },
    closeDrawer,
    reset: (options: any) => {
      closeDrawer();
      if (navigationRef.current) {
        navigationRef.current.reset(options);
      }
    },
  };

  return (
    <ParentDrawerProvider value={{ openDrawer, closeDrawer }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.rootContainer}>
          <StatusBar style="auto" />

          {/* Sidebar Drawer */}
          {drawerOpen && (
            <Animated.View style={[
              styles.drawerContainer,
              { 
                transform: [{ translateX: drawerTranslate }],
                width: DRAWER_WIDTH,
              }
            ]}>
              <ParentDrawerContent navigation={drawerNavigation} />
            </Animated.View>
          )}

          {/* Main Content App Container */}
          <Animated.View style={[
            styles.mainContainer,
            {
              transform: [
                { scale: mainScale },
                { translateX: mainTranslate },
              ],
              borderRadius: drawerOpen ? 20 : 0,
              overflow: 'hidden',
            }
          ]}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainTabs">
              {/* Auth */}
              <Stack.Screen name="Login" component={LoginScreen} />

              {/* Main Tabs */}
              <Stack.Screen name="MainTabs">
                {() => <ParentTabNavigator />}
              </Stack.Screen>

              {/* Dashboard Stack */}
              <Stack.Screen name="Notifications" component={NotificationsScreen} />
              <Stack.Screen name="NoticeBoard" component={NoticeBoardScreen} />
              <Stack.Screen name="Circulars" component={CircularsScreen} />
              <Stack.Screen name="Messages" component={ParentMessagesScreen} />

              {/* Child Profile Stack */}
              <Stack.Screen name="ChildProfile" component={ChildProfileScreen} />
              <Stack.Screen name="DigitalIDCard" component={DigitalIDCardScreen} />
              <Stack.Screen name="MedicalRecords" component={MedicalRecordsScreen} />
              <Stack.Screen name="MedicalDetails" component={MedicalDetailsScreen} />

              {/* Academics */}
              <Stack.Screen name="AcademicsHub" component={AcademicsHubScreen} />
              <Stack.Screen name="AcademicsTab" component={AcademicsHubScreen} />
              <Stack.Screen name="Attendance" component={AttendanceScreen} />
              <Stack.Screen name="AttendanceTab" component={AttendanceScreen} />
              <Stack.Screen name="AttendanceAnalytics" component={AttendanceAnalyticsScreen} />
              <Stack.Screen name="Homework" component={HomeworkScreen} />
              <Stack.Screen name="HomeworkTab" component={HomeworkScreen} />
              <Stack.Screen name="Assignments" component={AssignmentsScreen} />
              <Stack.Screen name="Exams" component={ExamsScreen} />
              <Stack.Screen name="ReportCard" component={ReportCardScreen} />
              <Stack.Screen name="StudyMaterials" component={StudyMaterialsScreen} />
              <Stack.Screen name="SubjectDetails" component={SubjectDetailsScreen} />
              <Stack.Screen name="TimeTable" component={TimeTableScreen} />

              {/* Fees */}
              <Stack.Screen name="Fees" component={FeesScreen} />
              <Stack.Screen name="FeeReceipt" component={FeeReceiptScreen} />
              <Stack.Screen name="FeeHistory" component={FeeHistoryScreen} />
              <Stack.Screen name="DueInvoices" component={DueInvoicesScreen} />
              <Stack.Screen name="AcademicPerformance" component={AcademicPerformanceScreen} />

              {/* Transport Stack */}
              <Stack.Screen name="LiveBusTracking" component={LiveBusTrackingScreen} />
              <Stack.Screen name="TransportTab" component={LiveBusTrackingScreen} />
              <Stack.Screen name="RouteDetails" component={RouteDetailsScreen} />
              <Stack.Screen name="BusStopDetails" component={BusStopDetailsScreen} />
              <Stack.Screen name="TripHistory" component={TripHistoryScreen} />
              <Stack.Screen name="PickupDropTimeline" component={PickupDropTimelineScreen} />

              {/* Communication */}
              <Stack.Screen name="CommunicationHub" component={CommunicationHubScreen} />

              {/* School Info */}
              <Stack.Screen name="AboutSchool" component={AboutSchoolScreen} />
              <Stack.Screen name="Events" component={EventsScreen} />
              <Stack.Screen name="Gallery" component={GalleryScreen} />
              <Stack.Screen name="Holidays" component={HolidaysScreen} />
              <Stack.Screen name="Calendar" component={CalendarScreen} />
              <Stack.Screen name="TeacherProfile" component={TeacherProfileScreen} />

              {/* Settings */}
              <Stack.Screen name="ParentDocumentsCertificates" component={ParentDocumentsCertificatesScreen} />
              <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
              <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
              <Stack.Screen name="Legal" component={LegalScreen} />
              <Stack.Screen name="Help" component={HelpScreen} />
              <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
              <Stack.Screen name="Support" component={SupportScreen} />
              <Stack.Screen name="NewRequest" component={NewRequestScreen} />
              <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
              <Stack.Screen name="More" component={MoreScreen} />
            </Stack.Navigator>
          </NavigationContainer>

          {/* Drawer Overlay backdrop */}
          {drawerOpen && (
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
              <TouchableOpacity 
                style={StyleSheet.absoluteFillObject} 
                onPress={closeDrawer}
                activeOpacity={1}
              />
            </Animated.View>
          )}
        </Animated.View>
        </View>
      </GestureHandlerRootView>
    </ParentDrawerProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
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
    backgroundColor: '#ffffff',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 50,
  },
});
