"use client";

import React, { useState } from "react";
import { 
  Users, Phone, Mail, Search, Plus, X, CheckCircle2, 
  UserCheck, ShieldCheck, MapPin, Eye, Edit3, Trash2, 
  MessageSquare, Smartphone, HeartHandshake, ChevronRight, GraduationCap 
} from "lucide-react";

export default function ParentsPage() {
  const [parents, setParents] = useState([
    { 
      id: "PAR-99101", 
      name: "Vikram Sharma", 
      occupation: "Senior Software Engineer", 
      phone: "+91 98111 22334", 
      altPhone: "+91 98111 00099",
      email: "vikram.sharma@gmail.com", 
      address: "Flat 402, Sector 12, Dwarka, New Delhi",
      children: [
        { name: "Rahul Sharma", class: "Class 5-A", rollNo: "5-A-12", attendance: "96.4%", feeStatus: "Paid", bus: "Route 1 (Dwarka)" },
        { name: "Riya Sharma", class: "Class 2-B", rollNo: "2-B-08", attendance: "98.1%", feeStatus: "Paid", bus: "Route 1 (Dwarka)" }
      ],
      appLinked: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    { 
      id: "PAR-99102", 
      name: "Rajesh Patel", 
      occupation: "Business Owner", 
      phone: "+91 98222 33445", 
      altPhone: "+91 98222 11122",
      email: "rajesh.patel@gmail.com", 
      address: "House 18, Vasant Kunj, New Delhi",
      children: [
        { name: "Ananya Patel", class: "Class 4-B", rollNo: "4-B-04", attendance: "94.2%", feeStatus: "Pending", bus: "Route 2 (Vasant Kunj)" }
      ],
      appLinked: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    { 
      id: "PAR-99103", 
      name: "Sunil Gupta", 
      occupation: "Chartered Accountant", 
      phone: "+91 98333 44556", 
      altPhone: "+91 98333 22233",
      email: "sunil.gupta@ca.org", 
      address: "Sector 6, Dwarka, New Delhi",
      children: [
        { name: "Aarav Gupta", class: "Class 6-C", rollNo: "6-C-15", attendance: "99.0%", feeStatus: "Paid", bus: "Route 3 (Janakpuri)" }
      ],
      appLinked: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    }
  ]);

  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedParentDossier, setSelectedParentDossier] = useState<any>(null);

  // Form State
  const [newParent, setNewParent] = useState({
    name: "",
    occupation: "",
    phone: "",
    email: "",
    address: "",
    childName: "",
    childClass: "5-A"
  });

  const handleAddParent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParent.name || !newParent.phone) return;

    const created = {
      id: `PAR-${99100 + parents.length + 1}`,
      name: newParent.name,
      occupation: newParent.occupation || "Private Sector Service",
      phone: newParent.phone,
      altPhone: "+91 98000 00000",
      email: newParent.email || "parent@gmail.com",
      address: newParent.address || "New Delhi",
      children: [
        { name: newParent.childName || "New Student", class: newParent.childClass, rollNo: "AUTO-01", attendance: "100%", feeStatus: "Paid", bus: "Route 1" }
      ],
      appLinked: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    };

    setParents([created, ...parents]);
    setIsAddModalOpen(false);
    setNewParent({ name: "", occupation: "", phone: "", email: "", address: "", childName: "", childClass: "5-A" });
  };

  const filteredParents = parents.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)",
        border: "1px solid var(--border-glow)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem 1.75rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Parents & Guardians Directory (Phase 3) <Users size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Manage parent profiles, multiple child mappings, emergency contact channels, and Parent App linkages.
          </p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <Plus size={18} />
          <span>Link New Parent</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="glass-card" style={{ padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 500 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Parent Name, Phone Number, PAR-ID..."
            style={{ width: "100%", padding: "0.65rem 0.75rem 0.65rem 2.25rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
          />
        </div>

        <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 600 }}>
          Total <strong>{filteredParents.length}</strong> Registered Parents
        </span>
      </div>

      {/* ════════════ PARENT DIRECTORY TABLE ════════════ */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Parent & ID</th>
                <th>Occupation</th>
                <th>Contact Details</th>
                <th>Mapped Children</th>
                <th>Parent App Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParents.map((p) => (
                <tr key={p.id}>
                  <td style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <img 
                      src={p.avatar} 
                      alt={p.name} 
                      style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border-color)" }} 
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff" }}>{p.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600 }}>{p.id}</div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{p.occupation}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.phone}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{p.email}</div>
                  </td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      {p.children.map((c, idx) => (
                        <span key={idx} className="badge badge-info" style={{ width: "fit-content" }}>
                          🎓 {c.name} ({c.class})
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-success" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                      <Smartphone size={12} /> App Active
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => setSelectedParentDossier(p)}
                      className="btn btn-secondary"
                      style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem" }}
                    >
                      <Eye size={14} /> Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ════════════ MODAL: 360° PARENT PROFILE DOSSIER ════════════ */}
      {selectedParentDossier && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 640, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img 
                  src={selectedParentDossier.avatar} 
                  alt={selectedParentDossier.name} 
                  style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary)" }} 
                />
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>{selectedParentDossier.name}</h2>
                  <div style={{ fontSize: "0.825rem", color: "var(--primary)", fontWeight: 700, marginTop: 1 }}>
                    {selectedParentDossier.id} • {selectedParentDossier.occupation}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedParentDossier(null)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={22} />
              </button>
            </div>

            {/* MAPPED CHILDREN SECTION */}
            <div style={{ marginBottom: "1.25rem" }}>
              <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Mapped Children / Students ({selectedParentDossier.children.length})
              </h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {selectedParentDossier.children.map((c: any, idx: number) => (
                  <div key={idx} style={{ padding: "0.85rem 1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>{c.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--primary)", marginTop: 2 }}>{c.class} • Roll #{c.rollNo} • {c.bus}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="badge badge-success">{c.attendance} Attendance</span>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>Fee: {c.feeStatus}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT & ADDRESS SECTION */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>PRIMARY PHONE</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{selectedParentDossier.phone}</div>
              </div>

              <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>EMAIL ADDRESS</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#38bdf8", marginTop: 2 }}>{selectedParentDossier.email}</div>
              </div>

              <div style={{ gridColumn: "span 2", padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>RESIDENTIAL ADDRESS</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{selectedParentDossier.address}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ MODAL: LINK NEW PARENT ════════════ */}
      {isAddModalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Link & Register New Parent</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddParent} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PARENT FULL NAME</label>
                <input 
                  type="text" 
                  value={newParent.name}
                  onChange={(e) => setNewParent({ ...newParent, name: e.target.value })}
                  placeholder="e.g. Vikram Sharma"
                  required
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>OCCUPATION</label>
                <input 
                  type="text" 
                  value={newParent.occupation}
                  onChange={(e) => setNewParent({ ...newParent, occupation: e.target.value })}
                  placeholder="e.g. Software Engineer"
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PHONE (+91)</label>
                  <input 
                    type="text" 
                    value={newParent.phone}
                    onChange={(e) => setNewParent({ ...newParent, phone: e.target.value })}
                    placeholder="+91 98111 22334"
                    required
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EMAIL</label>
                  <input 
                    type="email" 
                    value={newParent.email}
                    onChange={(e) => setNewParent({ ...newParent, email: e.target.value })}
                    placeholder="parent@gmail.com"
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LINK CHILD / STUDENT NAME</label>
                <input 
                  type="text" 
                  value={newParent.childName}
                  onChange={(e) => setNewParent({ ...newParent, childName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Link Parent Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
