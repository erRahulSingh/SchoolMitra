import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

export const getTeacherDashboard = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher Dashboard metrics & overview retrieved", {
    greeting: "Good Morning Rahul 👋",
    todayClasses: 5,
    students: 142,
    attendanceMarked: 4,
    pendingHomework: 2,
    pendingAssignments: 1,
    upcomingExams: 3,
    pendingMarks: 1,
    unreadMessages: 4,
    unreadNotifications: 3,
    todayAttendanceStats: {
      totalStudents: 142,
      presentCount: 136,
      absentCount: 6,
      attendanceRate: "95.7%"
    },
    todayClassesList: [
      { time: "08:00 AM", subject: "Maths", class: "Class 10-A", room: "Room 102", status: "Completed" },
      { time: "09:00 AM", subject: "Science", class: "Class 10-B", room: "Lab 2", status: "Ongoing" },
      { time: "10:30 AM", subject: "English", class: "Class 9-B", room: "Room 204", status: "Upcoming" },
      { time: "11:30 AM", subject: "Social Science", class: "Class 7-C", room: "Room 105", status: "Upcoming" },
      { time: "12:30 PM", subject: "Maths Lab", class: "Class 8-B", room: "Lab 1", status: "Upcoming" }
    ],
    recentNotifications: [
      { id: "n1", type: "Homework Pending", detail: "14 students pending in Class 10-A Math", time: "10 mins ago" },
      { id: "n2", type: "Exam Tomorrow", detail: "CBSE Mid-Term Science Practical at 09:00 AM", time: "1 hr ago" },
      { id: "n3", type: "Parent Message", detail: "New inquiry from Mr. Rajesh Kumar (Aarav's Father)", time: "2 hrs ago" }
    ]
  });
});
