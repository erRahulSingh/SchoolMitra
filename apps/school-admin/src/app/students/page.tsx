"use client";

import { useState } from "react";
import { 
  GraduationCap, 
  Search, 
  Filter, 
  UserPlus, 
  X, 
  Phone, 
  Bus, 
  CheckCircle, 
  FileText, 
  AlertCircle,
  MoreVertical
} from "lucide-react";
import { MOCK_STUDENTS, Student } from "@/lib/mockData";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Form State
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "10",
    section: "A",
    parentName: "",
    phone: "",
    feeStatus: "Paid" as const,
    busAllocated: true,
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
                          s.id.toLowerCase().includes(search.toLowerCase());
    const matchesClass = selectedClass === "All" || s.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.parentName) return;

    const created: Student = {
      id: `STU-${1000 + students.length + 1}`,
      rollNo: `${newStudent.class}-${newStudent.section}-${String(students.length + 1).padStart(2, '0')}`,
      name: newStudent.name,
      class: newStudent.class,
      section: newStudent.section,
      parentName: newStudent.parentName,
      phone: newStudent.phone || "+91 98000 00000",
      attendance: "100%",
      feeStatus: newStudent.feeStatus,
      busAllocated: newStudent.busAllocated,
      busRoute: newStudent.busAllocated ? "Route 1 (Dwarka)" : undefined,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    };

    setStudents([created, ...students]);
    setIsModalOpen(false);
    setNewStudent({ name: "", class: "10", section: "A", parentName: "", phone: "", feeStatus: "Paid", busAllocated: true });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Student Directory & Admission</h1>
          <p>Manage student profiles, parent details, transport allocations, and academic records.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <UserPlus size={16} />
          <span>New Student Admission</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Search by student name, roll number, or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Class:</span>
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ 
              padding: '0.55rem 1rem', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              fontSize: '0.85rem'
            }}
          >
            <option value="All">All Classes</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="12">Class 12</option>
          </select>
        </div>
      </div>

      {/* Student List Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Admission ID</th>
                <th>Roll No</th>
                <th>Class & Sec</th>
                <th>Parent Name</th>
                <th>Contact</th>
                <th>Attendance</th>
                <th>Fee Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img 
                      src={s.avatar} 
                      alt={s.name} 
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <div style={{ fontWeight: 600 }}>{s.name}</div>
                  </td>
                  <td>{s.id}</td>
                  <td>{s.rollNo}</td>
                  <td>
                    <span className="badge badge-info">Class {s.class}-{s.section}</span>
                  </td>
                  <td>{s.parentName}</td>
                  <td>{s.phone}</td>
                  <td style={{ fontWeight: 600 }}>{s.attendance}</td>
                  <td>
                    <span className={`badge ${
                      s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Pending' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {s.feeStatus}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => setSelectedStudent(s)}
                      className="btn btn-secondary" 
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Admission */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>New Student Admission</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddStudent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                  Student Full Name
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="search-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Class</label>
                  <select 
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  >
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Section</label>
                  <select 
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                  Parent / Guardian Name
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={newStudent.parentName}
                  onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                  className="search-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                  Parent Phone Number
                </label>
                <input 
                  type="text" 
                  placeholder="+91 98765 00000"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  className="search-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Save Student Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Drawer / Modal: Student Profile Details */}
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Student Profile Details</h3>
              <button onClick={() => setSelectedStudent(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
              <img src={selectedStudent.avatar} alt={selectedStudent.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{selectedStudent.name}</h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ID: {selectedStudent.id} • Roll: {selectedStudent.rollNo}</div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                  <span className="badge badge-info">Class {selectedStudent.class}-{selectedStudent.section}</span>
                  <span className={`badge ${selectedStudent.feeStatus === 'Paid' ? 'badge-success' : 'badge-danger'}`}>
                    Fees: {selectedStudent.feeStatus}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Parent / Guardian</div>
                <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>{selectedStudent.parentName}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{selectedStudent.phone}</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Academic Attendance</div>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--success)', marginTop: '0.2rem' }}>
                  {selectedStudent.attendance}
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Transport & Route Allocation</div>
                <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>
                  {selectedStudent.busAllocated ? selectedStudent.busRoute : 'No Bus Service Allocated'}
                </div>
              </div>
            </div>

            <button onClick={() => setSelectedStudent(null)} className="btn btn-secondary" style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
