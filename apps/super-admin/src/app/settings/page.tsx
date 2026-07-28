import { Settings, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Company Platform Settings</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>System environment variables, Razorpay API keys, and FCM credentials.</p>

      <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Platform Name</label>
            <input type="text" defaultValue="SchoolMitra SaaS Inc." style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Support Helpline Email</label>
            <input type="email" defaultValue="support@schoolmitra.com" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }} />
          </div>

          <button type="button" className="btn btn-primary" style={{ padding: '0.75rem', justifyContent: 'center', marginTop: '0.5rem' }}>
            <Save size={16} /> Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
}
