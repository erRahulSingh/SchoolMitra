"use client";

import React, { useState, useEffect } from "react";
import { 
  UserCheck, BookOpen, DollarSign, CalendarCheck, Search, 
  Plus, X, Award, CheckCircle2, Clock, ShieldCheck, Mail, 
  Phone, Eye, Briefcase, ChevronRight, FileText, Check, AlertCircle,
  Users, UserPlus, Send, RefreshCw, BarChart2, Star, Calendar, Settings, Lock, Shield, Printer,
  Edit3, Trash2, Save, Filter, UserX, ToggleLeft, ToggleRight, KeyRound, Download, CheckSquare
} from "lucide-react";

interface TeacherRecord {
  id: string;
  name: string;
  department: string;
  subject: string;
  classTeacher: string;
  phone: string;
  email: string;
  qualification: string;
  salary: string;
  baseSalary?: number;
  allowance?: number;
  attendance: string;
  avatar: string;
  status: string;
  rating?: number;
  homeworkRate?: string;
  joiningTenure?: string;
}

interface LeaveRequest {
  id: string;
  teacherName: string;
  type: string;
  dates: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  comment: string;
}

interface TimetableSlot {
  id: string;
  teacherName: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  timeSlot: string;
  classSection: string;
  subject: string;
}

interface PerformanceMetric {
  id: string;
  teacherName: string;
  attendance: string;
  homework: string;
  rating: number;
  statusIndex: string;
  avatar: string;
}

export default function TeachersPage() {
  // Navigation tabs for 10 Teacher & Staff modules
  const [activeTeacherTab, setActiveTeacherTab] = useState<
    "directory" | "add" | "profile" | "assignments" | "attendance" | 
    "leaves" | "payroll" | "timetable" | "performance" | "settings"
  >("directory");

  // Dossier sub-tabs
  const [dossierTab, setDossierTab] = useState<"overview" | "classes" | "attendance" | "leaves" | "salary" | "documents" | "activity">("overview");

  // Directory Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Initial Default Teachers Data
  const defaultTeachers: TeacherRecord[] = [
    {
      id: "EMP-101",
      name: "Sunita Rao",
      department: "Mathematics",
      subject: "Mathematics",
      classTeacher: "Class 10-A",
      phone: "+91 98765 43210",
      email: "sunita.rao@schoolmitra.edu.in",
      qualification: "M.Sc. Mathematics, B.Ed.",
      salary: "₹ 65,000 / month",
      baseSalary: 60000,
      allowance: 5000,
      attendance: "98.5%",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      status: "Active",
      rating: 4.9,
      homeworkRate: "98%",
      joiningTenure: "Since 12 July 2021"
    },
    {
      id: "EMP-102",
      name: "Vikram Malhotra",
      department: "Science",
      subject: "Physics",
      classTeacher: "Class 9-B",
      phone: "+91 98123 45678",
      email: "vikram.m@schoolmitra.edu.in",
      qualification: "M.Sc. Physics, M.Ed.",
      salary: "₹ 70,000 / month",
      baseSalary: 65000,
      allowance: 5000,
      attendance: "96.0%",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      status: "Active",
      rating: 4.7,
      homeworkRate: "92%",
      joiningTenure: "Since 05 Aug 2020"
    }
  ];

  // 1. Teachers Database State
  const [teachers, setTeachers] = useState<TeacherRecord[]>(defaultTeachers);
  const [selectedTeacherDossier, setSelectedTeacherDossier] = useState<TeacherRecord>(defaultTeachers[0]);

  // Edit Teacher Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTeacherForm, setEditTeacherForm] = useState<TeacherRecord | null>(null);

  const [teacherAnalytics, setTeacherAnalytics] = useState<any[]>([]);

  useEffect(() => {
    if (activeTeacherTab === "performance") {
      fetch("http://localhost:5000/api/v1/admin/analytics/teacher-performance")
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data?.teachers) {
            setTeacherAnalytics(json.data.teachers);
          }
        })
        .catch(err => console.warn("Teacher performance analytics fetch error:", err));
    }
  }, [activeTeacherTab]);

  // Fetch Teachers from Backend API / LocalStorage
  useEffect(() => {
    try {
      const cached = localStorage.getItem("sm_teachers_list");
      if (cached) {
        setTeachers(JSON.parse(cached));
      }

      fetch("http://localhost:5000/api/v1/teachers")
        .then(res => res.json())
        .then(data => {
          if (data.success && (data.teachers || data.data)) {
            const list = Array.isArray(data.teachers) ? data.teachers : (Array.isArray(data.data) ? data.data : []);
            if (list.length > 0) {
              const mapped: TeacherRecord[] = list.map((t: any) => ({
                id: t.id || t._id || `EMP-TCH-${Math.floor(100 + Math.random() * 900)}`,
                name: t.name || "Faculty Member",
                department: t.department || t.subject || "Mathematics",
                subject: t.subject || "Mathematics",
                classTeacher: t.classTeacher || (t.assignedClasses && t.assignedClasses[0]) || "Class 10-A",
                phone: t.phone || "+91 98765 43210",
                email: t.email || "teacher@schoolmitra.edu.in",
                qualification: t.qualification || "M.Sc., B.Ed. (10 Yrs Exp)",
                salary: t.salary || "₹ 65,000 / month",
                baseSalary: t.baseSalary || 60000,
                allowance: t.allowance || 5000,
                attendance: t.attendance || "98.5%",
                avatar: t.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
                status: t.status || "Active",
                rating: t.rating || 4.8,
                homeworkRate: t.homeworkRate || "95%",
                joiningTenure: t.joiningTenure || "Since 2021"
              }));
              setTeachers(mapped);
            }
          }
        })
        .catch(() => {});
    } catch (e) {}
  }, []);

  const saveTeachersList = (newList: TeacherRecord[]) => {
    setTeachers(newList);
    try {
      localStorage.setItem("sm_teachers_list", JSON.stringify(newList));
    } catch (e) {}
  };

  const handleOpenEdit = (t: TeacherRecord) => {
    setEditTeacherForm({ ...t });
    setIsEditModalOpen(true);
  };

  const handleSaveEditTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTeacherForm) return;

    const updated = teachers.map(t => t.id === editTeacherForm.id ? editTeacherForm : t);
    saveTeachersList(updated);

    if (selectedTeacherDossier?.id === editTeacherForm.id) {
      setSelectedTeacherDossier(editTeacherForm);
    }

    try {
      fetch(`http://localhost:5000/api/v1/teachers/${editTeacherForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTeacherForm)
      }).catch(() => {});
    } catch (err) {}

    setIsEditModalOpen(false);
    alert(`Teacher profile updated for ${editTeacherForm.name}!`);
  };

  const handleDeleteTeacher = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from faculty directory?`)) {
      const updated = teachers.filter(t => t.id !== id);
      saveTeachersList(updated);

      try {
        fetch(`http://localhost:5000/api/v1/teachers/${id}`, {
          method: "DELETE"
        }).catch(() => {});
      } catch (err) {}

      if (selectedTeacherDossier?.id === id && updated.length > 0) {
        setSelectedTeacherDossier(updated[0]);
      }
    }
  };

  // 2. Add Faculty Form State (Module 2)
  const [addStep, setAddStep] = useState(1);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    department: "Mathematics",
    subject: "Mathematics",
    classTeacher: "Class 10-A",
    phone: "",
    email: "",
    qualification: "M.Sc., B.Ed.",
    experience: "5 Years",
    joiningDate: "2026-08-01",
    salary: "65000",
    allowance: "5000"
  });

  const handleAddTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.email) return;

    const newId = `EMP-${Math.floor(100 + Math.random() * 900)}`;
    const createdRecord: TeacherRecord = {
      id: newId,
      name: newTeacher.name,
      department: newTeacher.department,
      subject: newTeacher.subject || newTeacher.department,
      classTeacher: newTeacher.classTeacher,
      phone: newTeacher.phone || "+91 98765 43210",
      email: newTeacher.email,
      qualification: newTeacher.qualification,
      salary: `₹ ${Number(newTeacher.salary).toLocaleString("en-IN")} / month`,
      baseSalary: Number(newTeacher.salary),
      allowance: Number(newTeacher.allowance),
      attendance: "100%",
      avatar: newTeacher.name.toLowerCase().includes("ka") 
        ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      status: "Active",
      rating: 5.0,
      homeworkRate: "100%",
      joiningTenure: "New Faculty (2026)"
    };

    const updated = [createdRecord, ...teachers];
    saveTeachersList(updated);
    setSelectedTeacherDossier(createdRecord);

    try {
      fetch("http://localhost:5000/api/v1/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createdRecord)
      }).catch(() => {});
    } catch (err) {}

    alert(`Faculty member ${createdRecord.name} onboarded successfully with Employee ID ${newId}!`);
    setActiveTeacherTab("directory");
  };

  // 3. Class Teacher Allocations & Mappings State (Module 4)
  const [classTeacherMatrix, setClassTeacherMatrix] = useState([
    { id: "ct-1", classSection: "Class 10-A", teacherName: "Sunita Rao" },
    { id: "ct-2", classSection: "Class 9-B", teacherName: "Vikram Malhotra" },
    { id: "ct-3", classSection: "Class 8-C", teacherName: "Ananya Deshmukh" }
  ]);

  const [subjectMappings, setSubjectMappings] = useState([
    { id: "sm-1", teacherName: "Sunita Rao", classSection: "Class 10-A", subject: "Mathematics" },
    { id: "sm-2", teacherName: "Vikram Malhotra", classSection: "Class 9-B", subject: "Physics" }
  ]);

  const [newMapping, setNewMapping] = useState({ teacherName: "Sunita Rao", classSection: "Class 10-A", subject: "Mathematics" });
  const [newClassTeacher, setNewClassTeacher] = useState({ classSection: "Class 10-A", teacherName: "Sunita Rao" });

  const handleAddSubjectMapping = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = { id: `sm-${Date.now()}`, ...newMapping };
    setSubjectMappings([...subjectMappings, newEntry]);
  };

  const handleLinkClassTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = classTeacherMatrix.map(c => {
      if (c.classSection === newClassTeacher.classSection) {
        return { ...c, teacherName: newClassTeacher.teacherName };
      }
      return c;
    });
    if (!updated.some(c => c.classSection === newClassTeacher.classSection)) {
      updated.push({ id: `ct-${Date.now()}`, classSection: newClassTeacher.classSection, teacherName: newClassTeacher.teacherName });
    }
    setClassTeacherMatrix(updated);
  };

  // 4. Daily Attendance Roster State (Module 5)
  const [attendanceRoster, setAttendanceRoster] = useState<Record<string, "PRESENT" | "ABSENT" | "LATE" | "HALF_DAY">>({
    "EMP-101": "PRESENT",
    "EMP-102": "PRESENT"
  });

  const handleMarkAttendance = (empId: string, status: "PRESENT" | "ABSENT" | "LATE" | "HALF_DAY") => {
    setAttendanceRoster(prev => ({ ...prev, [empId]: status }));
  };

  // 5. Leave Approvals State (Module 6 - Screenshot 1)
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: "lv-1", teacherName: "Sunita Rao", type: "Casual Leave", dates: "02 Aug - 03 Aug (2 Days)", reason: "Family Function", status: "PENDING", comment: "" },
    { id: "lv-2", teacherName: "Ananya Deshmukh", type: "Medical Leave", dates: "25 July (1 Day)", reason: "Doctor Appointment", status: "APPROVED", comment: "Approved against medical certificates" }
  ]);

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [newLeaveForm, setNewLeaveForm] = useState({
    teacherName: "Sunita Rao",
    type: "Casual Leave",
    dates: "10 Aug - 12 Aug (3 Days)",
    reason: "Personal Work"
  });

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeave: LeaveRequest = {
      id: `lv-${Date.now()}`,
      teacherName: newLeaveForm.teacherName,
      type: newLeaveForm.type,
      dates: newLeaveForm.dates,
      reason: newLeaveForm.reason,
      status: "PENDING",
      comment: ""
    };
    setLeaveRequests([newLeave, ...leaveRequests]);
    setIsLeaveModalOpen(false);
    alert(`Leave application submitted for ${newLeaveForm.teacherName}!`);
  };

  const handleProcessLeave = (id: string, status: "APPROVED" | "REJECTED") => {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleDeleteLeave = (id: string) => {
    if (confirm("Delete leave request?")) {
      setLeaveRequests(leaveRequests.filter(l => l.id !== id));
    }
  };

  // 6. Salary & Payroll State (Module 7 - Screenshot 5)
  const [selectedPayrollStaff, setSelectedPayrollStaff] = useState<string>("EMP-101");
  const currentPayrollTeacher = teachers.find(t => t.id === selectedPayrollStaff) || teachers[0] || defaultTeachers[0];

  // 7. Weekly Timetables State (Module 8 - Screenshot 4)
  const [selectedTimetableTeacher, setSelectedTimetableTeacher] = useState<string>("Sunita Rao");
  const [timetableSlots, setTimetableSlots] = useState<TimetableSlot[]>([
    { id: "tt-1", teacherName: "Sunita Rao", day: "Monday", timeSlot: "08:30 - 09:15", classSection: "Class 10-A", subject: "Math" },
    { id: "tt-2", teacherName: "Sunita Rao", day: "Monday", timeSlot: "10:00 - 10:45", classSection: "Class 9-B", subject: "Physics" },
    { id: "tt-3", teacherName: "Sunita Rao", day: "Tuesday", timeSlot: "08:30 - 09:15", classSection: "Class 10-A", subject: "Math" },
    { id: "tt-4", teacherName: "Sunita Rao", day: "Tuesday", timeSlot: "10:00 - 10:45", classSection: "Class 9-B", subject: "Physics" },
    { id: "tt-5", teacherName: "Sunita Rao", day: "Wednesday", timeSlot: "08:30 - 09:15", classSection: "Class 10-A", subject: "Math" },
    { id: "tt-6", teacherName: "Sunita Rao", day: "Thursday", timeSlot: "08:30 - 09:15", classSection: "Class 10-A", subject: "Math" }
  ]);

  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [newSlotForm, setNewSlotForm] = useState<{ day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"; timeSlot: string; classSection: string; subject: string }>({
    day: "Monday",
    timeSlot: "11:30 - 12:15",
    classSection: "Class 10-A",
    subject: "Math"
  });

  const handleOpenAddSlot = () => {
    setEditingSlotId(null);
    setNewSlotForm({
      day: "Monday",
      timeSlot: "11:30 - 12:15",
      classSection: "Class 10-A",
      subject: "Math"
    });
    setIsTimetableModalOpen(true);
  };

  const handleOpenEditSlot = (slot: TimetableSlot) => {
    setEditingSlotId(slot.id);
    setNewSlotForm({
      day: slot.day,
      timeSlot: slot.timeSlot,
      classSection: slot.classSection,
      subject: slot.subject
    });
    setIsTimetableModalOpen(true);
  };

  const handleSaveTimetableSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlotId) {
      // Edit existing slot
      setTimetableSlots(timetableSlots.map(s => {
        if (s.id === editingSlotId) {
          return {
            ...s,
            day: newSlotForm.day,
            timeSlot: newSlotForm.timeSlot,
            classSection: newSlotForm.classSection,
            subject: newSlotForm.subject
          };
        }
        return s;
      }));
      alert(`Timetable period slot updated!`);
    } else {
      // Add new slot
      const created: TimetableSlot = {
        id: `tt-${Date.now()}`,
        teacherName: selectedTimetableTeacher,
        day: newSlotForm.day,
        timeSlot: newSlotForm.timeSlot,
        classSection: newSlotForm.classSection,
        subject: newSlotForm.subject
      };
      setTimetableSlots([...timetableSlots, created]);
      alert(`New timetable period slot added for ${selectedTimetableTeacher}!`);
    }
    setIsTimetableModalOpen(false);
  };

  const handleDeleteTimetableSlot = (id: string) => {
    if (confirm("Are you sure you want to remove this timetable slot?")) {
      setTimetableSlots(timetableSlots.filter(t => t.id !== id));
    }
  };

  // 8. Performance Metrics State (Module 9 - Screenshot 3)
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([
    { id: "pm-1", teacherName: "Sunita Rao", attendance: "98.5% Present", homework: "98% Submissions", rating: 4.9, statusIndex: "EXCELLENT PERFORMANCE", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" },
    { id: "pm-2", teacherName: "Vikram Malhotra", attendance: "96.0% Present", homework: "92% Submissions", rating: 4.7, statusIndex: "EXCELLENT PERFORMANCE", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" }
  ]);

  const handleUpdateRating = (id: string, newRating: number) => {
    setPerformanceMetrics(performanceMetrics.map(p => p.id === id ? { ...p, rating: newRating } : p));
  };

  // 9. Access & Settings State (Module 10 - Screenshot 2)
  const [permissions, setPermissions] = useState({
    homework: true,
    grades: true,
    messaging: true,
    payrollLogs: false
  });
  const [selectedAccessFaculty, setSelectedAccessFaculty] = useState("Sunita Rao");
  const [erpAccessDisabled, setErpAccessDisabled] = useState(false);

  // Filtered Teachers
  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "all" || t.department.toLowerCase() === filterDept.toLowerCase();
    const matchesStatus = filterStatus === "all" || t.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesDept && matchesStatus;
  });

  const activeTeacher = selectedTeacherDossier || teachers[0] || defaultTeachers[0];

  const handleExportReport = (type: string, format: string) => {
    window.open(`http://localhost:5000/api/v1/admin/analytics/export?type=${type}&format=${format}`, '_blank');
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Teacher &amp; Staff Console <Users size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0, fontSize: "0.85rem" }}>
            Core administrative panel to manage faculty registers, academic assignments, leaves, class allocations, timetables, and payroll.
          </p>
        </div>

        <button onClick={() => setActiveTeacherTab("add")} className="btn btn-primary" style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}>
          <UserPlus size={16} /> Onboard New Teacher
        </button>
      </div>

      {/* ALL 10 TABS SWITCHER HEADER BAR */}
      <div className="glass-card" style={{ padding: "0.6rem", display: "flex", gap: "0.5rem", overflowX: "auto", whiteSpace: "nowrap" }}>
        {[
          { id: "directory", label: "Faculty Directory", icon: Users },
          { id: "add", label: "Add Faculty", icon: UserPlus },
          { id: "profile", label: "360° Profile Dossier", icon: Eye },
          { id: "assignments", label: "Academic Assignments", icon: BookOpen },
          { id: "attendance", label: "Daily Attendance", icon: CalendarCheck },
          { id: "leaves", label: "Leave Approvals", icon: Clock },
          { id: "payroll", label: "Salary & Payroll", icon: DollarSign },
          { id: "timetable", label: "Weekly Timetables", icon: Calendar },
          { id: "performance", label: "Performance Metrics", icon: BarChart2 },
          { id: "settings", label: "Access & Settings", icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTeacherTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTeacherTab(tab.id as any)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "0.55rem 0.95rem", fontSize: "0.82rem", gap: "0.4rem", borderRadius: 8, fontWeight: isActive ? 700 : 500 }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ════════════ MODULE 1: FACULTY DIRECTORY ════════════ */}
      {activeTeacherTab === "directory" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "1rem", flex: 1, maxWidth: 540, flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by faculty name or EMP-ID..."
                  style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem" }}
                />
              </div>

              <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} style={{ padding: "0.65rem 0.9rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", cursor: "pointer" }}>
                <option value="all">All Departments</option>
                <option value="mathematics">Mathematics</option>
                <option value="science">Science</option>
              </select>

              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: "0.65rem 0.9rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.85rem", cursor: "pointer" }}>
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
              </select>
            </div>

            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 700 }}>
              Faculty Members: <strong style={{ color: "var(--primary)" }}>{filteredTeachers.length} Active</strong>
            </span>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>TEACHER</th>
                    <th>DEPARTMENT</th>
                    <th>PRIMARY SUBJECTS</th>
                    <th>CONTACT INFO</th>
                    <th>CLASS TEACHER</th>
                    <th>DAILY PRESENCE</th>
                    <th>STATUS</th>
                    <th style={{ textAlign: "right" }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <img src={t.avatar} alt={t.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--primary)" }} />
                          <div>
                            <div style={{ fontWeight: 800, color: "var(--text-heading)" }}>{t.name}</div>
                            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{t.id}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-info">{t.department}</span></td>
                      <td style={{ fontWeight: 600 }}>{t.subject}</td>
                      <td style={{ fontSize: "0.8rem" }}>
                        <div style={{ fontWeight: 700 }}>{t.phone}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{t.email}</div>
                      </td>
                      <td style={{ fontWeight: 800, color: "var(--primary)" }}>{t.classTeacher}</td>
                      <td style={{ fontWeight: 700, color: "var(--success)" }}>{t.attendance}</td>
                      <td><span className="badge badge-success">{t.status.toUpperCase()} ✅</span></td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                          <button onClick={() => { setSelectedTeacherDossier(t); setActiveTeacherTab("profile"); }} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}><Eye size={13} /> Profile</button>
                          <button onClick={() => handleOpenEdit(t)} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}><Edit3 size={13} /> Edit</button>
                          <button onClick={() => handleDeleteTeacher(t.id, t.name)} className="btn btn-secondary" style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ MODULE 2: ADD FACULTY ════════════ */}
      {activeTeacherTab === "add" && (
        <div className="glass-card" style={{ padding: "2rem", maxWidth: "800px" }}>
          <form onSubmit={handleAddTeacherSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Stepped Faculty Onboarding Wizard</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FULL TEACHER NAME</label>
                <input type="text" value={newTeacher.name} onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })} placeholder="e.g. Sunita Rao" required style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DEPARTMENT</label>
                  <select value={newTeacher.department} onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })} style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EMAIL ADDRESS</label>
                  <input type="email" value={newTeacher.email} onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })} placeholder="teacher@schoolmitra.edu.in" required style={{ width: "100%", padding: "0.7rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.9rem" }} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", marginTop: "0.5rem" }}>Complete Faculty Onboarding</button>
            </div>
          </form>
        </div>
      )}

      {/* ════════════ MODULE 3: PROFILE DOSSIER ════════════ */}
      {activeTeacherTab === "profile" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <img src={activeTeacher.avatar} alt={activeTeacher.name} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary)" }} />
              <div>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>{activeTeacher.name}</h2>
                <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 700, marginTop: 4, display: "flex", gap: "0.75rem" }}>
                  <span>EMP ID: <strong>{activeTeacher.id}</strong></span> &bull; <span>Dept: <strong>{activeTeacher.department}</strong></span> &bull; <span>Class Teacher: <strong>{activeTeacher.classTeacher}</strong></span>
                </div>
              </div>
            </div>
            <button onClick={() => handleOpenEdit(activeTeacher)} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}><Edit3 size={15} /> Edit Credentials</button>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1rem 0" }}>Faculty Qualifications &amp; Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "var(--bg-input)", padding: "1rem", borderRadius: 10 }}><strong>QUALIFICATIONS:</strong> {activeTeacher.qualification}</div>
              <div style={{ background: "var(--bg-input)", padding: "1rem", borderRadius: 10 }}><strong>PRIMARY STREAM:</strong> {activeTeacher.subject}</div>
              <div style={{ background: "var(--bg-input)", padding: "1rem", borderRadius: 10 }}><strong>CONTACT PHONE:</strong> {activeTeacher.phone}</div>
              <div style={{ background: "var(--bg-input)", padding: "1rem", borderRadius: 10 }}><strong>CONTACT EMAIL:</strong> {activeTeacher.email}</div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ MODULE 4: ACADEMIC ASSIGNMENTS ════════════ */}
      {activeTeacherTab === "assignments" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem" }}>Assign Class Subject Teacher</h3>
            <form onSubmit={handleAddSubjectMapping} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <select value={newMapping.teacherName} onChange={(e) => setNewMapping({ ...newMapping, teacherName: e.target.value })} style={{ padding: "0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
              </select>
              <button type="submit" className="btn btn-primary">Add Subject Mapping</button>
            </form>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem" }}>Class Teacher Allocations</h3>
            <form onSubmit={handleLinkClassTeacher} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <select value={newClassTeacher.teacherName} onChange={(e) => setNewClassTeacher({ ...newClassTeacher, teacherName: e.target.value })} style={{ padding: "0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
              </select>
              <button type="submit" className="btn btn-primary">Establish Class Teacher Link</button>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ MODULE 5: DAILY ATTENDANCE ════════════ */}
      {activeTeacherTab === "attendance" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem" }}>Daily Faculty Attendance Roster</h3>
          <table className="custom-table">
            <thead>
              <tr><th>TEACHER</th><th>RFID STATUS</th><th>MARK PRESENCE</th></tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.name}</strong></td>
                  <td><span className="badge badge-success">RFID ACTIVE ✅</span></td>
                  <td>
                    {(["PRESENT", "ABSENT", "LATE", "HALF_DAY"] as const).map(st => (
                      <button key={st} onClick={() => handleMarkAttendance(t.id, st)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", fontSize: "0.7rem", margin: 2, background: attendanceRoster[t.id] === st ? "#22c55e" : "transparent", color: attendanceRoster[t.id] === st ? "#fff" : "var(--text-muted)" }}>
                        {st}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ MODULE 6: LEAVE APPROVALS (SCREENSHOT 1) ════════════ */}
      {activeTeacherTab === "leaves" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Faculty Leave Management &amp; Approvals</h3>
            <button onClick={() => setIsLeaveModalOpen(true)} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.78rem", gap: "0.35rem" }}>
              <Plus size={15} /> Apply Faculty Leave
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap" }}>TEACHER</th>
                  <th style={{ whiteSpace: "nowrap" }}>LEAVE TYPE</th>
                  <th style={{ whiteSpace: "nowrap" }}>REQUESTED DATES</th>
                  <th>REASON FOR ABSENCE</th>
                  <th>ACTION COMMENTS</th>
                  <th style={{ whiteSpace: "nowrap" }}>PROCESS REQUEST</th>
                  <th style={{ textAlign: "right", whiteSpace: "nowrap" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(lv => (
                  <tr key={lv.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)", whiteSpace: "nowrap" }}>{lv.teacherName}</td>
                    <td style={{ whiteSpace: "nowrap" }}><span className="badge badge-info">{lv.type}</span></td>
                    <td style={{ whiteSpace: "nowrap", fontSize: "0.82rem" }}>{lv.dates}</td>
                    <td style={{ fontSize: "0.82rem" }}>{lv.reason}</td>
                    <td>
                      <input 
                        type="text" 
                        placeholder="Add review comment..." 
                        value={lv.comment}
                        onChange={(e) => setLeaveRequests(leaveRequests.map(x => x.id === lv.id ? { ...x, comment: e.target.value } : x))}
                        style={{ width: "100%", padding: "0.4rem 0.65rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 6, fontSize: "0.78rem", color: "var(--text-main)" }}
                      />
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {lv.status === "PENDING" ? (
                        <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                          <button onClick={() => handleProcessLeave(lv.id, "APPROVED")} className="btn btn-primary" style={{ padding: "0.3rem 0.75rem", fontSize: "0.72rem", background: "#22c55e", border: "none" }}>
                            Approve
                          </button>
                          <button onClick={() => handleProcessLeave(lv.id, "REJECTED")} className="btn btn-secondary" style={{ padding: "0.3rem 0.75rem", fontSize: "0.72rem", color: "#ef4444" }}>
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className={`badge ${lv.status === "APPROVED" ? "badge-success" : "badge-danger"}`} style={{ fontSize: "0.75rem" }}>
                          {lv.status} ✅
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <button onClick={() => handleDeleteLeave(lv.id)} className="btn btn-secondary" style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "#ef4444" }}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ MODULE 7: SALARY & PAYROLL (SCREENSHOT 5) ════════════ */}
      {activeTeacherTab === "payroll" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Monthly Payroll &amp; Payslips</h3>
              <button onClick={() => alert("Downloading bulk payroll ledger...")} className="btn btn-secondary" style={{ padding: "0.4rem 0.85rem", fontSize: "0.78rem" }}>
                <Download size={14} /> Export Payroll
              </button>
            </div>

            <table className="custom-table">
              <thead>
                <tr>
                  <th>TEACHER</th>
                  <th>GROSS SALARY</th>
                  <th>DEDUCTIONS (PF/TDS)</th>
                  <th>NET PAYABLE</th>
                  <th style={{ textAlign: "right" }}>PAYSLIP</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(t => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <img src={t.avatar} alt={t.name} style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }} />
                        <strong style={{ color: "var(--text-heading)" }}>{t.name}</strong>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700 }}>₹ {(t.baseSalary || 60000).toLocaleString("en-IN")}</td>
                    <td style={{ color: "#ef4444", fontWeight: 700 }}>- ₹ {(t.allowance || 5000).toLocaleString("en-IN")}</td>
                    <td style={{ color: "var(--success)", fontWeight: 900 }}>₹ {((t.baseSalary || 60000) - (t.allowance || 5000)).toLocaleString("en-IN")}</td>
                    <td style={{ textAlign: "right" }}>
                      <button onClick={() => setSelectedPayrollStaff(t.id)} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.3rem" }}>
                        <Printer size={12} /> View Payslip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payslip Preview Ledger Panel */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              Payslip Preview Ledger
            </h3>

            <div style={{ fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div>FACULTY NAME: <strong style={{ color: "var(--text-heading)" }}>{currentPayrollTeacher?.name}</strong></div>
              <div>DESIGNATION: <strong>{currentPayrollTeacher?.department} Teacher</strong></div>
              <div>SALARY MONTH: <strong>July 2026</strong></div>
            </div>

            <div style={{ background: "var(--bg-input)", padding: "1rem", borderRadius: 10, border: "1px solid var(--border-color)", fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Base Scale Salary</span> <strong>₹ {(currentPayrollTeacher?.baseSalary || 60000).toLocaleString("en-IN")}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Transport Allowance</span> <strong>₹ 5,000</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#ef4444" }}><span>Provident Fund (PF) Deductions</span> <strong>- ₹ 4,800</strong></div>
            </div>

            <div style={{ background: "rgba(34, 197, 94, 0.12)", padding: "0.85rem", borderRadius: 8, border: "1px solid rgba(34, 197, 94, 0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--success)" }}>NET PAYABLE OUT</span>
              <strong style={{ fontSize: "1.1rem", color: "var(--success)", fontWeight: 900 }}>₹ {((currentPayrollTeacher?.baseSalary || 60000) + 5000 - 4800).toLocaleString("en-IN")}</strong>
            </div>

            <button onClick={() => window.print()} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.65rem" }}>
              Download PDF Invoice
            </button>
          </div>
        </div>
      )}

      {/* ════════════ MODULE 8: WEEKLY TIMETABLES (SCREENSHOT 4) ════════════ */}
      {activeTeacherTab === "timetable" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--text-heading)" }}>Faculty Weekly Timetable Slots:</span>
              <select value={selectedTimetableTeacher} onChange={(e) => setSelectedTimetableTeacher(e.target.value)} style={{ padding: "0.5rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontWeight: 700 }}>
                {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
              </select>
            </div>
            <button onClick={handleOpenAddSlot} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.78rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Timetable Slot
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            {(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const).map(day => {
              const daySlots = timetableSlots.filter(s => s.teacherName === selectedTimetableTeacher && s.day === day);
              return (
                <div key={day} className="glass-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 900, color: "var(--primary)", textTransform: "uppercase", margin: 0, borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>{day}</h4>
                  
                  {daySlots.map(slot => (
                    <div key={slot.id} style={{ background: "var(--bg-input)", padding: "0.65rem", borderRadius: 8, border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.25rem", position: "relative" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-heading)" }}>{slot.timeSlot}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--primary)" }}>{slot.classSection} ({slot.subject})</div>
                      
                      <div style={{ position: "absolute", top: 4, right: 4, display: "flex", gap: 4 }}>
                        <button onClick={() => handleOpenEditSlot(slot)} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }} title="Edit Slot">
                          <Edit3 size={12} />
                        </button>
                        <button onClick={() => handleDeleteTimetableSlot(slot.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }} title="Delete Slot">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ════════════ MODULE 9: PERFORMANCE METRICS (SCREENSHOT 3) ════════════ */}
      {activeTeacherTab === "performance" && (
        <div className="glass-card" style={{ padding: "1.50rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.85rem" }}>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Teacher Performance & Operations Monitoring</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>Operational logging for syllabus progression, homework assignments, and marks submission.</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button onClick={() => handleExportReport("teacher", "csv")} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.2rem" }}>
                Export CSV
              </button>
              <button onClick={() => handleExportReport("teacher", "excel")} className="btn btn-secondary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.2rem" }}>
                Export Excel
              </button>
              <button onClick={() => handleExportReport("teacher", "pdf")} className="btn btn-primary" style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.2rem" }}>
                Export PDF
              </button>
            </div>
          </div>

          {/* Operation Monitor Notice */}
          <div style={{ padding: "0.85rem 1.1rem", background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.2)", borderRadius: "10px", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
            <strong>💡 Operations Note:</strong> This monitoring suite compiles progress rate metrics of curriculum delivery and test cycles. It is designed to assist academic coordination and support teachers, not as a disciplinary measurement tool.
          </div>

          <table className="custom-table" style={{ marginTop: "0.5rem" }}>
            <thead>
              <tr>
                <th>TEACHER / SUBJECT</th>
                <th style={{ textAlign: "center" }}>CLASSES</th>
                <th style={{ textAlign: "center" }}>STUDENTS</th>
                <th style={{ textAlign: "center" }}>ATTENDANCE</th>
                <th style={{ textAlign: "center" }}>HOMEWORK</th>
                <th style={{ textAlign: "center" }}>TESTS CONDUCTED</th>
                <th style={{ textAlign: "center" }}>MARKS SUBMITTED</th>
                <th style={{ textAlign: "right" }}>PENDING ROSTERS</th>
              </tr>
            </thead>
            <tbody>
              {(teacherAnalytics.length > 0 ? teacherAnalytics : [
                { name: "Amit Kumar", subject: "Mathematics", classes: 4, students: 156, attendance: "96%", homework: "91%", testsConducted: 12, marksSubmitted: "100%", pending: 0 },
                { name: "Neha Sharma", subject: "Science", classes: 3, students: 110, attendance: "94%", homework: "88%", testsConducted: 10, marksSubmitted: "90%", pending: 1 },
                { name: "Ravi Singh", subject: "English", classes: 5, students: 185, attendance: "97%", homework: "95%", testsConducted: 15, marksSubmitted: "100%", pending: 0 }
              ]).map((t: any, idx: number) => (
                <tr key={idx}>
                  <td>
                    <div>
                      <strong style={{ color: "var(--text-heading)", display: "block" }}>{t.name}</strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.subject}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: "center", fontWeight: 700 }}>{t.classes}</td>
                  <td style={{ textAlign: "center", fontWeight: 700 }}>{t.students}</td>
                  <td style={{ textAlign: "center", fontWeight: 700, color: "var(--primary)" }}>{t.attendance}</td>
                  <td style={{ textAlign: "center", fontWeight: 700, color: "#8b5cf6" }}>{t.homework}</td>
                  <td style={{ textAlign: "center", fontWeight: 700 }}>{t.testsConducted}</td>
                  <td style={{ textAlign: "center" }}>
                    <span className={`badge ${t.marksSubmitted === "100%" ? "badge-success" : "badge-warning"}`}>
                      {t.marksSubmitted}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 800, color: t.pending > 0 ? "#f43f5e" : "var(--text-muted)" }}>
                    {t.pending}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ MODULE 10: ACCESS & SETTINGS (SCREENSHOT 2) ════════════ */}
      {activeTeacherTab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          
          {/* Left Panel: Permissions */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1rem 0", color: "var(--text-heading)" }}>Faculty ERP Roles &amp; Permissions</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
              {[
                { label: "Allow Homework uploads & assignment creation", key: "homework" as const },
                { label: "Allow student grade sheet edits & results entry", key: "grades" as const },
                { label: "Allow teacher-to-parent direct messaging access", key: "messaging" as const },
                { label: "Allow payroll/payslip billing overview logs access", key: "payrollLogs" as const }
              ].map(p => (
                <label key={p.key} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", color: "var(--text-main)", cursor: "pointer" }}>
                  <input 
                    type="checkbox" 
                    checked={permissions[p.key]}
                    onChange={(e) => setPermissions({ ...permissions, [p.key]: e.target.checked })}
                    style={{ width: 16, height: 16, accentColor: "var(--primary)", cursor: "pointer" }}
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>

            <button onClick={() => alert("Faculty Permission Matrix updated in database!")} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Update Permission Matrix
            </button>
          </div>

          {/* Right Panel: Login Credentials */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 1rem 0", color: "var(--text-heading)" }}>Faculty Portal Login &amp; Credentials</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT FACULTY MEMBER</label>
                <select value={selectedAccessFaculty} onChange={(e) => setSelectedAccessFaculty(e.target.value)} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => { setErpAccessDisabled(!erpAccessDisabled); alert(`ERP Access ${!erpAccessDisabled ? 'disabled' : 'enabled'} for ${selectedAccessFaculty}`); }} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center", color: erpAccessDisabled ? "var(--success)" : "#ef4444" }}>
                  {erpAccessDisabled ? "Enable ERP Access" : "Disable ERP Access"}
                </button>
                
                <button onClick={() => alert(`Password reset link dispatched to email of ${selectedAccessFaculty}!`)} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  Send Password Reset
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ════════════ EDIT TEACHER MODAL ════════════ */}
      {isEditModalOpen && editTeacherForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "560px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Edit3 size={20} color="var(--primary)" /> Edit Faculty Member Profile
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveEditTeacher} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FULL TEACHER NAME</label>
                <input type="text" value={editTeacherForm.name} onChange={(e) => setEditTeacherForm({ ...editTeacherForm, name: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DEPARTMENT</label>
                  <select value={editTeacherForm.department} onChange={(e) => setEditTeacherForm({ ...editTeacherForm, department: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PRIMARY SUBJECT STREAM</label>
                  <input type="text" value={editTeacherForm.subject} onChange={(e) => setEditTeacherForm({ ...editTeacherForm, subject: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: "0.4rem" }}><Save size={16} /> Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD LEAVE MODAL ════════════ */}
      {isLeaveModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "520px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Apply Faculty Leave Application</h3>
              <button onClick={() => setIsLeaveModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleApplyLeave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT FACULTY MEMBER</label>
                <select value={newLeaveForm.teacherName} onChange={(e) => setNewLeaveForm({ ...newLeaveForm, teacherName: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LEAVE TYPE</label>
                <select value={newLeaveForm.type} onChange={(e) => setNewLeaveForm({ ...newLeaveForm, type: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Medical Leave">Medical Leave</option>
                  <option value="Earned Leave">Earned Leave</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>REQUESTED DATES</label>
                <input type="text" value={newLeaveForm.dates} onChange={(e) => setNewLeaveForm({ ...newLeaveForm, dates: e.target.value })} placeholder="e.g. 10 Aug - 12 Aug (3 Days)" style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>REASON FOR ABSENCE</label>
                <textarea rows={2} value={newLeaveForm.reason} onChange={(e) => setNewLeaveForm({ ...newLeaveForm, reason: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsLeaveModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD / EDIT TIMETABLE SLOT MODAL ════════════ */}
      {isTimetableModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingSlotId ? "Edit Timetable Slot" : `Add Timetable Slot for ${selectedTimetableTeacher}`}
              </h3>
              <button onClick={() => setIsTimetableModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveTimetableSlot} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DAY OF WEEK</label>
                <select value={newSlotForm.day} onChange={(e) => setNewSlotForm({ ...newSlotForm, day: e.target.value as any })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PERIOD TIME SLOT</label>
                <input type="text" value={newSlotForm.timeSlot} onChange={(e) => setNewSlotForm({ ...newSlotForm, timeSlot: e.target.value })} placeholder="08:30 - 09:15" style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CLASS &amp; SECTION</label>
                  <input type="text" value={newSlotForm.classSection} onChange={(e) => setNewSlotForm({ ...newSlotForm, classSection: e.target.value })} placeholder="Class 10-A" style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUBJECT</label>
                  <input type="text" value={newSlotForm.subject} onChange={(e) => setNewSlotForm({ ...newSlotForm, subject: e.target.value })} placeholder="Math" style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsTimetableModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  {editingSlotId ? "Update Slot" : "Save Period Slot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
