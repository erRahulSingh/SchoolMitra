"use client";

import { 
  Users, 
  CalendarCheck, 
  CreditCard, 
  Bus, 
  ArrowUpRight, 
  UserPlus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { MOCK_STATS, MOCK_BUSES, MOCK_ACTIVITIES, MOCK_STUDENTS } from "@/lib/mockData";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      {/* Dashboard Top Banner */}
      <div className="page-header">
        <div>
          <h1>Welcome back, School Admin 👋</h1>
          <p>Here is what is happening across Delhi Public School today.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/students" className="btn btn-secondary">
            <UserPlus size={16} />
            <span>Admit Student</span>
          </Link>
          <Link href="/fees" className="btn btn-primary">
            <CreditCard size={16} />
            <span>Record Fee Collection</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Stats Grid */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h4>Total Enrolled Students</h4>
            <div className="stat-value">{MOCK_STATS.totalStudents}</div>
            <div className="stat-trend" style={{ color: 'var(--success)' }}>
              <TrendingUp size={12} />
              <span>+42 new this term</span>
            </div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <CalendarCheck size={24} />
          </div>
          <div className="stat-info">
            <h4>Today's Attendance Rate</h4>
            <div className="stat-value">{MOCK_STATS.studentAttendanceRate}</div>
            <div className="stat-trend" style={{ color: 'var(--text-muted)' }}>
              <span>1,346 / 1,420 Present</span>
            </div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'var(--info-bg)', color: 'var(--info)' }}>
            <CreditCard size={24} />
          </div>
          <div className="stat-info">
            <h4>Fee Collected (Aug)</h4>
            <div className="stat-value">{MOCK_STATS.feeCollectionThisMonth}</div>
            <div className="stat-trend" style={{ color: 'var(--success)' }}>
              <span>{MOCK_STATS.feeCollectionPercentage} of target reached</span>
            </div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
            <Bus size={24} />
          </div>
          <div className="stat-info">
            <h4>Live School Buses</h4>
            <div className="stat-value">{MOCK_STATS.activeBusesOnRoute} Active</div>
            <div className="stat-trend" style={{ color: 'var(--warning)' }}>
              <AlertTriangle size={12} />
              <span>{MOCK_STATS.delayedBusesCount} route delayed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section: Live Bus Fleet & Recent Activity Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Live Transport Status */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Today's Bus Fleet & GPS Status</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time telemetry tracking from Driver App</p>
            </div>
            <Link href="/transport" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
              <span>View Live Map</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MOCK_BUSES.map((bus) => (
              <div 
                key={bus.id}
                style={{ 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justify-content: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '42px', 
                    height: '42px', 
                    borderRadius: 'var(--radius-sm)', 
                    background: bus.status === 'Delayed' ? 'var(--danger-bg)' : bus.status === 'At School' ? 'var(--success-bg)' : 'var(--primary-glow)',
                    color: bus.status === 'Delayed' ? 'var(--danger)' : bus.status === 'At School' ? 'var(--success)' : 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justify-content: 'center'
                  }}>
                    <Bus size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{bus.busNumber}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{bus.route}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>
                      Driver: {bus.driverName} ({bus.driverPhone})
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${
                    bus.status === 'Delayed' ? 'badge-danger' : bus.status === 'At School' ? 'badge-success' : 'badge-info'
                  }`}>
                    {bus.status}
                  </span>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, marginTop: '0.35rem' }}>
                    {bus.currentStop}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    ETA: {bus.eta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live School Activity Feed */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Live Activity Log</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Realtime Socket.IO</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
            {MOCK_ACTIVITIES.map((act) => (
              <div key={act.id} style={{ display: 'flex', gap: '0.85rem' }}>
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  background: 'var(--primary)',
                  marginTop: '0.35rem',
                  boxShadow: '0 0 8px var(--primary)'
                }} />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
                    {act.title}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Clock size={12} />
                    <span>{act.time}</span>
                    <span>•</span>
                    <span>{act.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-secondary" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
            <span>View All Activity Logs</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Recent Students Table Quick View */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Recent Student Enrolments</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class allocations and fee payment status</p>
          </div>
          <Link href="/students" className="btn btn-secondary">View Full Directory</Link>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Class & Sec</th>
                <th>Parent Contact</th>
                <th>Attendance</th>
                <th>Fee Status</th>
                <th>Transport</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STUDENTS.map((student) => (
                <tr key={student.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>{student.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.id}</div>
                    </div>
                  </td>
                  <td>{student.rollNo}</td>
                  <td>
                    <span className="badge badge-info">Class {student.class}-{student.section}</span>
                  </td>
                  <td>
                    <div>{student.parentName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.phone}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{student.attendance}</td>
                  <td>
                    <span className={`badge ${
                      student.feeStatus === 'Paid' ? 'badge-success' : student.feeStatus === 'Pending' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td>
                    {student.busAllocated ? (
                      <span className="badge badge-success">Bus Allocated</span>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Self Transport</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
