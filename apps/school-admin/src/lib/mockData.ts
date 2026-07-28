export interface Student {
  id: string;
  rollNo: string;
  name: string;
  class: string;
  section: string;
  parentName: string;
  phone: string;
  attendance: string;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  busAllocated: boolean;
  busRoute?: string;
  avatar: string;
}

export interface FeeRecord {
  id: string;
  studentName: string;
  rollNo: string;
  class: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  type: string;
}

export interface BusTracking {
  id: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  route: string;
  studentsCount: number;
  status: 'On Route' | 'At School' | 'Delayed' | 'Completed';
  currentStop: string;
  eta: string;
  speed: string;
}

export interface Activity {
  id: string;
  title: string;
  time: string;
  type: 'attendance' | 'fee' | 'transport' | 'exam' | 'admission';
  user: string;
}

export const MOCK_STATS = {
  totalStudents: 1420,
  studentAttendanceRate: "94.8%",
  totalTeachers: 86,
  teacherAttendanceRate: "98.5%",
  feeCollectionThisMonth: "₹ 24.8 Lakhs",
  feeCollectionPercentage: "91%",
  activeBusesOnRoute: 14,
  delayedBusesCount: 1,
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: "STU-1001",
    rollNo: "10-A-01",
    name: "Aarav Sharma",
    class: "10",
    section: "A",
    parentName: "Rajesh Sharma",
    phone: "+91 98765 43210",
    attendance: "96%",
    feeStatus: "Paid",
    busAllocated: true,
    busRoute: "Route 4 (Green Park)",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "STU-1002",
    rollNo: "10-A-02",
    name: "Ananya Patel",
    class: "10",
    section: "A",
    parentName: "Suresh Patel",
    phone: "+91 98123 45678",
    attendance: "92%",
    feeStatus: "Pending",
    busAllocated: true,
    busRoute: "Route 2 (Vasant Kunj)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "STU-1003",
    rollNo: "9-B-14",
    name: "Rohan Verma",
    class: "9",
    section: "B",
    parentName: "Vikram Verma",
    phone: "+91 99887 76655",
    attendance: "88%",
    feeStatus: "Overdue",
    busAllocated: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "STU-1004",
    rollNo: "12-C-05",
    name: "Diya Gupta",
    class: "12",
    section: "C",
    parentName: "Amit Gupta",
    phone: "+91 97654 32109",
    attendance: "98%",
    feeStatus: "Paid",
    busAllocated: true,
    busRoute: "Route 1 (Dwarka Sec 12)",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "STU-1005",
    rollNo: "8-A-21",
    name: "Kabir Singh",
    class: "8",
    section: "A",
    parentName: "Harpreet Singh",
    phone: "+91 98321 09876",
    attendance: "95%",
    feeStatus: "Paid",
    busAllocated: true,
    busRoute: "Route 4 (Green Park)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
];

export const MOCK_FEES: FeeRecord[] = [
  {
    id: "INV-2026-081",
    studentName: "Aarav Sharma",
    rollNo: "10-A-01",
    class: "10-A",
    amount: 18500,
    dueDate: "2026-08-10",
    status: "Paid",
    type: "Quarter 2 Tuition & Bus Fee",
  },
  {
    id: "INV-2026-082",
    studentName: "Ananya Patel",
    rollNo: "10-A-02",
    class: "10-A",
    amount: 18500,
    dueDate: "2026-08-10",
    status: "Pending",
    type: "Quarter 2 Tuition & Bus Fee",
  },
  {
    id: "INV-2026-083",
    studentName: "Rohan Verma",
    rollNo: "9-B-14",
    class: "9-B",
    amount: 14200,
    dueDate: "2026-07-25",
    status: "Overdue",
    type: "Quarter 2 Tuition Fee",
  },
  {
    id: "INV-2026-084",
    studentName: "Diya Gupta",
    rollNo: "12-C-05",
    class: "12-C",
    amount: 21000,
    dueDate: "2026-08-10",
    status: "Paid",
    type: "Quarter 2 Science Lab & Tuition",
  },
];

export const MOCK_BUSES: BusTracking[] = [
  {
    id: "BUS-01",
    busNumber: "DL 01 AB 4321",
    driverName: "Ram Singh",
    driverPhone: "+91 98111 22334",
    route: "Route 1 - Dwarka Sector 12 Express",
    studentsCount: 42,
    status: "On Route",
    currentStop: "Stop 4: Sector 10 Metro Gate",
    eta: "07:45 AM (8 mins away)",
    speed: "34 km/h",
  },
  {
    id: "BUS-02",
    busNumber: "DL 01 AB 8899",
    driverName: "Sukhwinder Kumar",
    driverPhone: "+91 98222 33445",
    route: "Route 2 - Vasant Kunj & Saket",
    studentsCount: 38,
    status: "On Route",
    currentStop: "Stop 2: Fortis Hospital Crossing",
    eta: "07:52 AM (15 mins away)",
    speed: "28 km/h",
  },
  {
    id: "BUS-03",
    busNumber: "DL 01 CD 5544",
    driverName: "Mahesh Yadav",
    driverPhone: "+91 98333 44556",
    route: "Route 3 - Janakpuri & Uttam Nagar",
    studentsCount: 45,
    status: "Delayed",
    currentStop: "Stop 3: District Centre Signal (Traffic Jam)",
    eta: "08:10 AM (Delayed by 12m)",
    speed: "8 km/h",
  },
  {
    id: "BUS-04",
    busNumber: "DL 01 EF 1122",
    driverName: "Gurpreet Singh",
    driverPhone: "+91 98444 55667",
    route: "Route 4 - Green Park & Hauz Khas",
    studentsCount: 36,
    status: "At School",
    currentStop: "Main School Gate 1 - Unloaded",
    eta: "Arrived at 07:35 AM",
    speed: "0 km/h",
  },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "ACT-1",
    title: "Bus #DL01AB4321 started Morning Trip",
    time: "12 mins ago",
    type: "transport",
    user: "Driver Ram Singh",
  },
  {
    id: "ACT-2",
    title: "Fee Payment ₹18,500 received via UPI for Aarav Sharma",
    time: "25 mins ago",
    type: "fee",
    user: "System / Razorpay",
  },
  {
    id: "ACT-3",
    title: "Class 10-A Morning Attendance marked (96% Present)",
    time: "40 mins ago",
    type: "attendance",
    user: "Teacher Sunita Mehta",
  },
  {
    id: "ACT-4",
    title: "New Admission Application submitted for Kabir Malhotra (Class 6)",
    time: "1 hour ago",
    type: "admission",
    user: "Parent Portal",
  },
];
