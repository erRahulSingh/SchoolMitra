import { Users, Plus } from "lucide-react";

export default function UsersPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Super Admin Team & Roles</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Internal company staff with Super Admin console permissions.</p>
        </div>
        <button style={{ padding: '0.6rem 1.2rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
          Add Admin Member
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem' }}>User Name</th>
              <th style={{ padding: '0.75rem' }}>Email</th>
              <th style={{ padding: '0.75rem' }}>Role Permission</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontWeight: 700 }}>Rahul Sharma</td>
              <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>rahulengineer492@gmail.com</td>
              <td style={{ padding: '1rem' }}><span className="badge badge-warning">Super Admin (Owner)</span></td>
              <td style={{ padding: '1rem' }}><span className="badge badge-success">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
