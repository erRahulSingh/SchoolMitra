import { Tag, Plus } from "lucide-react";

export default function PlansPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Subscription SaaS Tiers</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure pricing, student caps, and module permissions for SaaS tiers.</p>
        </div>
        <button style={{ padding: '0.6rem 1.2rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
          Create New Plan
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Starter Plan</h3>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0', color: 'var(--primary)' }}>₹ 9,999 / mo</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cap: 500 Students</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--primary)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Pro ERP + GPS</h3>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0', color: 'var(--primary)' }}>₹ 19,999 / mo</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cap: 1,500 Students</div>
        </div>
      </div>
    </div>
  );
}
