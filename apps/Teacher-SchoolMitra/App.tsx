import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, GraduationCap, BookOpen, MessageSquare, User, LayoutDashboard, UserCheck, Award, Calendar, DollarSign } from 'lucide-react-native';

// Module 1 — Authentication Screens
import Splash from './src/screens/auth/Splash';
import Login from './src/screens/auth/Login';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import ResetPassword from './src/screens/auth/ResetPassword';
import SignUp from './src/screens/SignUp';

// Module 2 — Dashboard Screens
import MainDashboard from './src/screens/dashboard/MainDashboard';
import WidgetsScreen from './src/screens/dashboard/WidgetsScreen';
import TodayClassesScreen from './src/screens/dashboard/TodayClassesScreen';

// Module 3 — My Classes Screens
import MyClassesScreen from './src/screens/classes/MyClassesScreen';
import StudentsListScreen from './src/screens/classes/StudentsListScreen';
import StudentProfileScreen from './src/screens/classes/StudentProfileScreen';
import ClassDetailsScreen from './src/screens/classes/ClassDetailsScreen';
import SubjectDetailsScreen from './src/screens/classes/SubjectDetailsScreen';

// Module 4 — Attendance Screens
import MarkAttendanceScreen from './src/screens/attendance/MarkAttendanceScreen';
import AttendanceHistoryScreen from './src/screens/attendance/AttendanceHistoryScreen';
import EditAttendanceScreen from './src/screens/attendance/EditAttendanceScreen';
import StudentAttendanceReportScreen from './src/screens/attendance/StudentAttendanceReportScreen';
import MonthlyAttendanceScreen from './src/screens/attendance/MonthlyAttendanceScreen';

// Module 5 — Homework Screens
import HomeworkListScreen from './src/screens/homework/HomeworkListScreen';
import CreateHomeworkScreen from './src/screens/homework/CreateHomeworkScreen';
import HomeworkDetailsScreen from './src/screens/homework/HomeworkDetailsScreen';
import HomeworkSubmissionsScreen from './src/screens/homework/HomeworkSubmissionsScreen';
import HomeworkAnalyticsScreen from './src/screens/homework/HomeworkAnalyticsScreen';

// Module 6 — Assignments Screens
import AssignmentListScreen from './src/screens/assignments/AssignmentListScreen';
import CreateAssignmentScreen from './src/screens/assignments/CreateAssignmentScreen';
import AssignmentReviewScreen from './src/screens/assignments/AssignmentReviewScreen';
import AssignmentReportScreen from './src/screens/assignments/AssignmentReportScreen';

// Module 7 — Study Materials Screens
import UploadMaterialScreen from './src/screens/materials/UploadMaterialScreen';
import MaterialLibraryScreen from './src/screens/materials/MaterialLibraryScreen';
import MaterialDetailsScreen from './src/screens/materials/MaterialDetailsScreen';
import AcademicsScreen from './src/screens/academics/AcademicsScreen';

// Module 8 — Weekly Test Screens
import WeeklyTestListScreen from './src/screens/weekly_tests/WeeklyTestListScreen';
import CreateWeeklyTestScreen from './src/screens/weekly_tests/CreateWeeklyTestScreen';
import QuestionManagerScreen from './src/screens/weekly_tests/QuestionManagerScreen';
import TestResultEntryScreen from './src/screens/weekly_tests/TestResultEntryScreen';
import WeeklyTestAnalyticsScreen from './src/screens/weekly_tests/WeeklyTestAnalyticsScreen';

// Module 9 — Exams Screens
import ExamScheduleScreen from './src/screens/exams/ExamScheduleScreen';
import ExamMarksEntryScreen from './src/screens/exams/ExamMarksEntryScreen';
import GradeSheetScreen from './src/screens/exams/GradeSheetScreen';
import PublishResultScreen from './src/screens/exams/PublishResultScreen';
import ExamReportScreen from './src/screens/exams/ExamReportScreen';

// Module 10 — Report Cards Screens
import ReportCardGeneratorScreen from './src/screens/report_cards/ReportCardGeneratorScreen';
import StudentPerformanceScreen from './src/screens/report_cards/StudentPerformanceScreen';
import ReportPreviewScreen from './src/screens/report_cards/ReportPreviewScreen';

// Module 11 — Communication Screens
import ParentMessagesScreen from './src/screens/communication/ParentMessagesScreen';
import ClassAnnouncementsScreen from './src/screens/communication/ClassAnnouncementsScreen';
import ComplaintRepliesScreen from './src/screens/communication/ComplaintRepliesScreen';
import NotificationsScreen from './src/screens/communication/NotificationsScreen';

// Module 12 — Teacher Screens
import MyProfileScreen from './src/screens/teacher/MyProfileScreen';
import LeaveApplicationScreen from './src/screens/teacher/LeaveApplicationScreen';
import TeacherSettingsScreen from './src/screens/teacher/TeacherSettingsScreen';
import LiveClassScreen from './src/screens/academics/LiveClassScreen';
import FeesOverviewScreen from './src/screens/teacher/FeesOverviewScreen';
import HelpSupportScreen from './src/screens/teacher/HelpSupportScreen';
import TransportDutyScreen from './src/screens/teacher/TransportDutyScreen';
import HolidayCalendarScreen from './src/screens/teacher/HolidayCalendarScreen';
import EventManagementScreen from './src/screens/communication/EventManagementScreen';
import MyDocumentsScreen from './src/screens/teacher/MyDocumentsScreen';
import ParentCommunicationScreen from './src/screens/communication/ParentCommunicationScreen';
import LogoutConfirmationScreen from './src/screens/auth/LogoutConfirmationScreen';
import ClassNotesScreen from './src/screens/materials/ClassNotesScreen';
import StudentPortfolioScreen from './src/screens/classes/StudentPortfolioScreen';
import CommunicationsScreen from './src/screens/communication/CommunicationsScreen';
import CalendarScreen from './src/screens/teacher/CalendarScreen';

// Core Feature Screens
import ExamsMarksScreen from './src/screens/ExamsMarksScreen';
import TimetableScreen from './src/screens/TimetableScreen';
import PayrollScreen from './src/screens/PayrollScreen';
import Profile from './src/screens/Profile';
import PrivacyPolicyScreen from './src/screens/legal/PrivacyPolicyScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7c3aed',
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
        component={MainDashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => <Home size={focused ? 24 : 22} color={color} />
        }}
      />
      <Tab.Screen
        name="ClassesTab"
        component={MyClassesScreen}
        options={{
          tabBarLabel: 'Classes',
          tabBarIcon: ({ color, focused }) => <GraduationCap size={focused ? 24 : 22} color={color} />
        }}
      />
      <Tab.Screen
        name="AcademicsTab"
        component={AcademicsScreen}
        options={{
          tabBarLabel: 'Academics',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: focused ? '#7c3aed' : '#f3e8ff',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -10,
                elevation: focused ? 6 : 2,
                shadowColor: '#7c3aed',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 5
              }}
            >
              <BookOpen size={26} color={focused ? '#ffffff' : '#7c3aed'} />
            </View>
          )
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
        component={MyProfileScreen}
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
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        {/* Module 1 — Authentication Routes */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        {/* Module 2 — Dashboard Routes */}
        <Stack.Screen name="MainDashboard" component={MainDashboard} />
        <Stack.Screen name="Widgets" component={WidgetsScreen} />
        <Stack.Screen name="TodayClasses" component={TodayClassesScreen} />

        {/* Module 3 — My Classes Routes */}
        <Stack.Screen name="MyClasses" component={MyClassesScreen} />
        <Stack.Screen name="StudentsList" component={StudentsListScreen} />
        <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
        <Stack.Screen name="ClassDetails" component={ClassDetailsScreen} />
        <Stack.Screen name="SubjectDetails" component={SubjectDetailsScreen} />

        {/* Module 4 — Attendance Routes */}
        <Stack.Screen name="MarkAttendance" component={MarkAttendanceScreen} />
        <Stack.Screen name="AttendanceHistory" component={AttendanceHistoryScreen} />
        <Stack.Screen name="EditAttendance" component={EditAttendanceScreen} />
        <Stack.Screen name="StudentAttendanceReport" component={StudentAttendanceReportScreen} />
        <Stack.Screen name="MonthlyAttendance" component={MonthlyAttendanceScreen} />

        {/* Module 5 — Homework Routes */}
        <Stack.Screen name="HomeworkList" component={HomeworkListScreen} />
        <Stack.Screen name="CreateHomework" component={CreateHomeworkScreen} />
        <Stack.Screen name="HomeworkDetails" component={HomeworkDetailsScreen} />
        <Stack.Screen name="HomeworkSubmissions" component={HomeworkSubmissionsScreen} />
        <Stack.Screen name="HomeworkAnalytics" component={HomeworkAnalyticsScreen} />

        {/* Module 6 — Assignments Routes */}
        <Stack.Screen name="AssignmentList" component={AssignmentListScreen} />
        <Stack.Screen name="CreateAssignment" component={CreateAssignmentScreen} />
        <Stack.Screen name="AssignmentReview" component={AssignmentReviewScreen} />
        <Stack.Screen name="AssignmentReport" component={AssignmentReportScreen} />

        {/* Module 7 — Study Materials Routes */}
        <Stack.Screen name="UploadMaterial" component={UploadMaterialScreen} />
        <Stack.Screen name="MaterialLibrary" component={MaterialLibraryScreen} />
        <Stack.Screen name="MaterialDetails" component={MaterialDetailsScreen} />

        {/* Module 8 — Weekly Test Routes */}
        <Stack.Screen name="WeeklyTestList" component={WeeklyTestListScreen} />
        <Stack.Screen name="CreateWeeklyTest" component={CreateWeeklyTestScreen} />
        <Stack.Screen name="QuestionManager" component={QuestionManagerScreen} />
        <Stack.Screen name="TestResultEntry" component={TestResultEntryScreen} />
        <Stack.Screen name="WeeklyTestAnalytics" component={WeeklyTestAnalyticsScreen} />

        {/* Module 9 — Exams Routes */}
        <Stack.Screen name="ExamSchedule" component={ExamScheduleScreen} />
        <Stack.Screen name="ExamMarksEntry" component={ExamMarksEntryScreen} />
        <Stack.Screen name="GradeSheet" component={GradeSheetScreen} />
        <Stack.Screen name="PublishResult" component={PublishResultScreen} />
        <Stack.Screen name="ExamReport" component={ExamReportScreen} />

        {/* Module 10 — Report Cards Routes */}
        <Stack.Screen name="ReportCardGenerator" component={ReportCardGeneratorScreen} />
        <Stack.Screen name="StudentPerformance" component={StudentPerformanceScreen} />
        <Stack.Screen name="ReportPreview" component={ReportPreviewScreen} />

        {/* Module 11 — Communication Routes */}
        <Stack.Screen name="ParentMessages" component={ParentMessagesScreen} />
        <Stack.Screen name="ClassAnnouncements" component={ClassAnnouncementsScreen} />
        <Stack.Screen name="ComplaintReplies" component={ComplaintRepliesScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />

        {/* Module 12 — Teacher Routes */}
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        <Stack.Screen name="LeaveApplication" component={LeaveApplicationScreen} />
        <Stack.Screen name="TeacherSettings" component={TeacherSettingsScreen} />
        <Stack.Screen name="LiveClass" component={LiveClassScreen} />
        <Stack.Screen name="FeesOverview" component={FeesOverviewScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        <Stack.Screen name="TransportDuty" component={TransportDutyScreen} />
        <Stack.Screen name="HolidayCalendar" component={HolidayCalendarScreen} />
        <Stack.Screen name="EventManagement" component={EventManagementScreen} />
        <Stack.Screen name="MyDocuments" component={MyDocumentsScreen} />
        <Stack.Screen name="ParentCommunication" component={ParentCommunicationScreen} />
        <Stack.Screen name="LogoutConfirmation" component={LogoutConfirmationScreen} />
        <Stack.Screen name="ClassNotes" component={ClassNotesScreen} />
        <Stack.Screen name="StudentPortfolio" component={StudentPortfolioScreen} />
        <Stack.Screen name="Communications" component={CommunicationsScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />

        {/* Main Application Routes */}
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Attendance" component={MarkAttendanceScreen} />
        <Stack.Screen name="Homework" component={HomeworkListScreen} />
        <Stack.Screen name="Marks" component={ExamsMarksScreen} />
        <Stack.Screen name="Timetable" component={TimetableScreen} />
        <Stack.Screen name="Payroll" component={PayrollScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
