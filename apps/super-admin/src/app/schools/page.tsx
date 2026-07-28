import { Building2, Plus, Search } from "lucide-react";

export default function SchoolsPage() {
  const schools = [
    { id: "sch-101", name: "Delhi Public School", city: "New Delhi", plan: "Enterprise", status: "Active", mrr: 185000, students: 1420 },
    { id: "sch-102", name: "GD Goenka Public School", city: "Gurugram", plan: "Pro", status: "Active", mrr: 120000, students: 980 },
    { id: "sch-103", name: "Ryan International", city: "Noida", plan: "Pro", status: "Active", mrr: 145000, students: 1150 }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Onboarded Schools Directory</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage all registered school tenants across India.</p>
        </div>
        <button style={{ padding: '0.6rem 1.2rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> Onboard New School
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem' }}>School Name</th>
              <th style={{ padding: '0.75rem' }}>City</th>
              <th style={{ padding: '0.75rem' }}>Plan</th>
              <th style={{ padding: '0.75rem' }}>Students</th>
              <th style={{ padding: '0.75rem' }}>Monthly Billing</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {schools.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem', fontWeight: 700 }}>{s.name}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{s.city}</td>
                <td style={{ padding: '1rem' }}><span className="badge badge-warning">{s.plan}</span></td>
                <td style={{ padding: '1rem' }}>{s.students}</td>
                <td style={{ padding: '1rem', fontWeight: 700 }}>₹ {s.mrr.toLocaleString('en-IN')}</td>
                <td style={{ padding: '1rem' }}><span className="badge badge-success">{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
