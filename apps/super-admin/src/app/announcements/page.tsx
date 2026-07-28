import { Megaphone, Plus } from "lucide-react";

export default function AnnouncementsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Platform Announcements</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Broadcast global maintenance or new feature announcements to all school ERP dashboards.</p>
        </div>
        <button style={{ padding: '0.6rem 1.2rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
          New Announcement
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ fontWeight: 700, fontSize: '1rem' }}>System Upgrade Notice - Version 2.4 Release</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>Broadcasted to all 124 schools on 2026-07-20</div>
      </div>
    </div>
  );
}
