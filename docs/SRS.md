# Software Requirements Specification (SRS) & Technical Blueprint
## Project Name: SchoolMitra Unified Multi-Tenant SaaS Platform
**Version:** 1.0.0  
**Date:** July 2026  
**Architecture:** Node.js, Express, TypeScript, Next.js 14, MongoDB Atlas, Socket.IO, Razorpay, Nginx, Docker

---

## 1. System Overview & Architecture Scope

SchoolMitra is a enterprise-grade, multi-tenant Software-as-a-Service (SaaS) platform designed for educational institutions. The platform operates on a single-database multi-tenancy model using indexed `schoolId` scoping.

### Monorepo Architecture Layout
```
d:\SchoolMitra\
├── apps/
│   ├── website/          # Public Marketing & School Onboarding (Port 3005)
│   ├── school-admin/     # Comprehensive School ERP Portal (Port 3000)
│   ├── parent-app/       # Parent Mobile PWA & Bus Tracking (Port 3002)
│   ├── driver-app/       # Driver Cockpit Navigation & RFID Scanner (Port 3003)
│   └── super-admin/      # SaaS Master HQ Command Center (Port 3004)
├── packages/
│   ├── ui/               # Shared Design System (Buttons, Modals, Inputs, Tables)
│   ├── types/            # TypeScript Interface Definitions
│   ├── api-client/       # Axios/Fetch API Wrapper Libraries
│   └── utils/            # Common Formatting & Math Utilities
└── server/               # Unified Node.js / Express REST & Socket.IO Backend (Port 5000)
```

---

## 2. User Roles & Permission Matrix (RBAC)

### 2.1 System Roles
1. **SuperAdmin**: Complete SaaS HQ oversight, tenant provisioning, revenue analytics, global feature flags, and database snapshots.
2. **SchoolAdmin**: Full operational control over a specific school tenant's academics, admissions, fees, transport, staff, and exams.
3. **Teacher**: Subject gradebook management, class daily attendance, homework assignments, and student report card evaluation.
4. **Driver**: Turn-by-turn route navigation, live GPS telemetry broadcasting, RFID boarding scans, and Emergency SOS triggers.
5. **Parent**: Linked child 360° dossiers, real-time bus tracking with dynamic ETA countdowns, fee payments, and push notification inbox.

### 2.2 Granular Permission Matrix

| Module / Scope | SuperAdmin | SchoolAdmin | Teacher | Driver | Parent |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Tenant Provisioning & Status** | ✅ FULL | ❌ NONE | ❌ NONE | ❌ NONE | ❌ NONE |
| **SaaS Revenue & Invoices** | ✅ FULL | ❌ NONE | ❌ NONE | ❌ NONE | ❌ NONE |
| **School Settings & Branding** | ✅ VIEW | ✅ FULL | ❌ NONE | ❌ NONE | ❌ NONE |
| **Student Admissions & Directory** | ✅ VIEW | ✅ FULL | 👁️ VIEW | ❌ NONE | 👁️ CHILD ONLY |
| **Teacher & Staff HR** | ✅ VIEW | ✅ FULL | 👁️ SELF | ❌ NONE | ❌ NONE |
| **Daily Class Attendance** | 👁️ READ | ✅ FULL | ✅ MARK | ❌ NONE | 👁️ CHILD ONLY |
| **Homework & Assignments** | 👁️ READ | ✅ FULL | ✅ FULL | ❌ NONE | 👁️ CHILD ONLY |
| **Exam Schedules & Marks** | 👁️ READ | ✅ FULL | ✅ MARKS | ❌ NONE | 👁️ CHILD ONLY |
| **Fee Collection & Receipts** | ✅ REVENUE | ✅ FULL | ❌ NONE | ❌ NONE | ✅ PAY OWN DUES |
| **Fleet Buses & Routes** | 👁️ READ | ✅ FULL | ❌ NONE | 👁️ ROUTE ONLY | 👁️ CHILD BUS |
| **Live GPS Telemetry** | ✅ READ ALL | ✅ READ ALL | ❌ NONE | 📡 BROADCAST | 📡 CHILD BUS |
| **RFID Student Taps** | 👁️ READ | ✅ FULL | ❌ NONE | 📷 SCAN TAPS | 👁️ NOTIFICATIONS |
| **Emergency SOS Alerts** | 🚨 ALERT | 🚨 ALERT | ❌ NONE | 🚨 TRIGGER | 🚨 ALERT |

---

## 3. MongoDB Collections & Schema Definitions

### 1. `schools`
```typescript
interface ISchool {
  _id: ObjectId;
  code: string;           // Indexed & Unique (e.g., "DPS-DEL-101")
  name: string;
  city: string;
  plan: "Basic" | "Growth" | "Enterprise";
  status: "Active" | "Suspended" | "Trial" | "PendingEmailVerification";
  createdAt: Date;
  updatedAt: Date;
}
```

### 2. `users`
```typescript
interface IUser {
  _id: ObjectId;
  schoolId?: ObjectId;     // Ref: "schools"
  name: string;
  email: string;          // Indexed & Unique
  phone: string;
  password: string;       // PBKDF2 Hashed Salt:Hash
  role: "SuperAdmin" | "SchoolAdmin" | "Teacher" | "Parent" | "Driver";
  status: "Active" | "Suspended";
  createdAt: Date;
}
```

### 3. `students`
```typescript
interface IStudent {
  _id: ObjectId;
  schoolId: ObjectId;     // Compound Index: { schoolId: 1, class: 1, section: 1 }
  admissionNo: string;    // Unique
  rollNo: string;
  name: string;
  class: string;
  section: string;
  parentName: string;
  parentPhone: string;
  dob: Date;
  gender: "Male" | "Female";
  status: "Active" | "Archived";
}
```

### 4. `attendance`
```typescript
interface IStudentAttendance {
  _id: ObjectId;
  schoolId: ObjectId;     // Compound Unique: { studentId: 1, date: 1 }
  studentId: ObjectId;
  class: string;
  section: string;
  date: string;           // YYYY-MM-DD
  status: "Present" | "Absent" | "Leave";
  markedBy: ObjectId;
}
```

### 5. `fees` (Invoices)
```typescript
interface IStudentFeeInvoice {
  _id: ObjectId;
  invoiceNo: string;      // Unique
  schoolId: ObjectId;
  studentId: ObjectId;
  amount: number;
  dueDate: Date;
  status: "Paid" | "Pending" | "Overdue";
}
```

### 6. `payments` (Receipts)
```typescript
interface IFeePaymentReceipt {
  _id: ObjectId;
  receiptNo: string;      // Unique (e.g. REC-2026-99401)
  invoiceId: ObjectId;
  studentId: ObjectId;
  amountPaid: number;
  baseAmount: number;     // Excluding 18% GST
  gstAmount: number;      // 18% GST Tax
  paymentMethod: string;  // Razorpay UPI / Card
  transactionId: string;
  paidAt: Date;
}
```

### 7. `gpsLocations`
```typescript
interface IGPSLocation {
  _id: ObjectId;
  busId: ObjectId;        // Compound Index: { busId: 1, timestamp: -1 }
  routeId: ObjectId;
  latitude: number;
  longitude: number;
  speed: number;
  currentStop?: string;
  nextStop?: string;
  etaMinutes?: number;
  timestamp: Date;
}
```

---

## 4. REST API Endpoint Specifications (`/api/v1`)

### 4.1 Auth Module (`/api/v1/auth`)
- `POST /register`: Onboard school tenant and create admin account.
- `POST /login`: Authenticate email/password across 5 roles & return JWT Access + Refresh Tokens.
- `POST /refresh`: Exchange refresh token for new access token.
- `POST /forgot-password` & `POST /reset-password`: Password recovery flow.
- `POST /send-otp` & `POST /verify-otp`: Mobile OTP verification.
- `GET /me`: Retrieve authenticated user profile with permissions.

### 4.2 School Tenant Module (`/api/v1/schools`)
- `GET /`: Searchable list of school tenants with status filters.
- `POST /`: Provision new school tenant.
- `GET /:id`: Fetch 360° school tenant dossier.
- `PATCH /:id/status`: Toggle tenant status (`Active`, `Suspended`).

### 4.3 Student Module (`/api/v1/students`)
- `GET /`: List students with class/section filter & search.
- `POST /`: Admit new student.
- `GET /:id`: Fetch student 360° dossier (profile, parent details, attendance, transport, fee status).
- `PUT /:id` & `DELETE /:id`: Edit/archive student record.

### 4.4 Transport & Live GPS Module (`/api/v1/transport`)
- `GET /buses` & `POST /buses`: Fleet vehicle CRUD.
- `GET /drivers` & `POST /drivers`: Driver registry.
- `GET /routes` & `POST /routes`: Route & bus stop definitions.
- `POST /rfid-logs`: Log student RFID tap & emit Socket.IO event.

### 4.5 Payment & Razorpay Module (`/api/v1/payments`)
- `POST /create-order`: Create Razorpay Order ID.
- `POST /verify`: Verify HMAC SHA-256 signature & issue 18% GST Tax Receipt.
- `POST /subscription`: Process SaaS subscription billing.

---

## 5. Screen-to-API Mapping Matrix

| App Portal | Screen / Page | Backend API Endpoint | HTTP Method | Socket.IO Channel |
| :--- | :--- | :--- | :---: | :--- |
| **Website** | School Registration | `/api/v1/auth/register` | `POST` | N/A |
| **School Admin** | Dashboard | `/api/v1/attendance/report`, `/api/v1/fees/due-report` | `GET` | `admin:bus_location_update` |
| **School Admin** | Students Directory | `/api/v1/students` | `GET` / `POST` | N/A |
| **School Admin** | Fleet Monitor | `/api/v1/transport/buses` | `GET` | `alert:emergency_sos` |
| **Parent App** | Child Dossier | `/api/v1/parents/:id/children` | `GET` | N/A |
| **Parent App** | Live Bus Tracking | `/api/v1/transport/buses` | `GET` | `bus:location_changed` |
| **Parent App** | Fee Payment | `/api/v1/payments/create-order` | `POST` | N/A |
| **Driver App** | Live Navigation | N/A (Broadcasting) | N/A | `driver:location_update` |
| **Driver App** | Pickup RFID Scan | `/api/v1/transport/rfid-logs` | `POST` | `driver:student_status_changed` |
| **Driver App** | SOS Emergency | `/api/v1/notifications/dispatch` | `POST` | `driver:sos_alert` |
| **Super Admin** | Schools Directory | `/api/v1/schools` | `GET` / `PATCH` | N/A |
| **Super Admin** | Revenue Analytics | `/api/v1/fees/receipts` | `GET` | N/A |

---

## 6. Development Milestones & Release Strategy

- **Milestone 1 (Complete)**: UI Design & Design System (180+ Screens).
- **Milestone 2 (Complete)**: Express Architecture & 16 MongoDB Collections.
- **Milestone 3 (Complete)**: 5-Role Auth & Multi-Tenant Scoping.
- **Milestone 4 (Complete)**: 10 Core REST API Modules.
- **Milestone 5 (Complete)**: Socket.IO Live Telemetry & Dynamic ETA.
- **Milestone 6 (Complete)**: Razorpay Payment Gateway & 18% GST Invoices.
- **Milestone 7 (Complete)**: Docker Compose, Nginx SSL Gateway, & CI/CD Pipeline.
