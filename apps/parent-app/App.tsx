import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BookOpen, Bus, MessageSquare, User } from 'lucide-react-native';

// Auth Screens
import LoginScreen from './src/screens/auth/LoginScreen';

// Dashboard (Home Tab)
import ParentDashboard from './src/screens/dashboard/ParentDashboard';
import NotificationsScreen from './src/screens/dashboard/NotificationsScreen';
import NoticeBoardScreen from './src/screens/dashboard/NoticeBoardScreen';

// Child Profile
import ChildProfileScreen from './src/screens/child/ChildProfileScreen';
import DigitalIDCardScreen from './src/screens/child/DigitalIDCardScreen';
import MedicalRecordsScreen from './src/screens/child/MedicalRecordsScreen';

// Academics
import AcademicsHubScreen from './src/screens/academics/AcademicsHubScreen';
import AttendanceScreen from './src/screens/academics/AttendanceScreen';
import HomeworkScreen from './src/screens/academics/HomeworkScreen';
import AssignmentsScreen from './src/screens/academics/AssignmentsScreen';
import ExamsScreen from './src/screens/academics/ExamsScreen';
import ReportCardScreen from './src/screens/academics/ReportCardScreen';
import StudyMaterialsScreen from './src/screens/academics/StudyMaterialsScreen';
import SubjectDetailsScreen from './src/screens/academics/SubjectDetailsScreen';
import TimeTableScreen from './src/screens/academics/TimeTableScreen';

// Fees
import FeesScreen from './src/screens/fees/FeesScreen';

// Transport
import LiveBusTrackingScreen from './src/screens/transport/LiveBusTrackingScreen';

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
import NotificationSettingsScreen from './src/screens/profile/NotificationSettingsScreen';
import PrivacySecurityScreen from './src/screens/profile/PrivacySecurityScreen';
import LegalScreen from './src/screens/profile/LegalScreen';
import HelpScreen from './src/screens/profile/HelpScreen';
import SupportScreen from './src/screens/profile/SupportScreen';
import MoreScreen from './src/screens/profile/MoreScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ParentTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '800', marginTop: 2 },
        tabBarStyle: {
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          elevation: 10,
          shadowColor: '#0f172a',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 8
        }
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={ParentDashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => <Home size={focused ? 24 : 22} color={color} />
        }}
      />
      <Tab.Screen
        name="AcademicsTab"
        component={AcademicsHubScreen}
        options={{
          tabBarLabel: 'Academics',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: focused ? '#4f46e5' : '#eef2ff',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -10,
                elevation: focused ? 6 : 2,
                shadowColor: '#4f46e5',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 5
              }}
            >
              <BookOpen size={26} color={focused ? '#ffffff' : '#4f46e5'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="TransportTab"
        component={LiveBusTrackingScreen}
        options={{
          tabBarLabel: 'Live Bus',
          tabBarIcon: ({ color, focused }) => <Bus size={focused ? 24 : 22} color={color} />
        }}
      />
      <Tab.Screen
        name="MessagesTab"
        component={ParentMessagesScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, focused }) => <MessageSquare size={focused ? 24 : 22} color={color} />
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ParentProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => <User size={focused ? 24 : 22} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainTabs">
          {/* Auth */}
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* Main Tabs */}
          <Stack.Screen name="MainTabs" component={ParentTabNavigator} />

          {/* Dashboard Stack */}
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="NoticeBoard" component={NoticeBoardScreen} />

          {/* Child Profile Stack */}
          <Stack.Screen name="ChildProfile" component={ChildProfileScreen} />
          <Stack.Screen name="DigitalIDCard" component={DigitalIDCardScreen} />
          <Stack.Screen name="MedicalRecords" component={MedicalRecordsScreen} />

          {/* Academics Stack */}
          <Stack.Screen name="Attendance" component={AttendanceScreen} />
          <Stack.Screen name="Homework" component={HomeworkScreen} />
          <Stack.Screen name="Assignments" component={AssignmentsScreen} />
          <Stack.Screen name="Exams" component={ExamsScreen} />
          <Stack.Screen name="ReportCard" component={ReportCardScreen} />
          <Stack.Screen name="StudyMaterials" component={StudyMaterialsScreen} />
          <Stack.Screen name="SubjectDetails" component={SubjectDetailsScreen} />
          <Stack.Screen name="TimeTable" component={TimeTableScreen} />

          {/* Fees */}
          <Stack.Screen name="Fees" component={FeesScreen} />

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
          <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
          <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
          <Stack.Screen name="Legal" component={LegalScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="More" component={MoreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
