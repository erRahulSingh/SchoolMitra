import { MessageSquare, Send, AlertTriangle } from "lucide-react";

export default function CommunicationPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Multi-Channel Communication Center</h1>
          <p>Broadcast SMS, WhatsApp messages, FCM Push Notifications, Email alerts, and Emergency Warnings.</p>
        </div>
        <button className="btn btn-primary"><Send size={16} /> Broadcast Notification</button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Broadcast Channels Active</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: 700 }}>FCM Push Alerts</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Connected & Online</div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: 700 }}>WhatsApp Gateway</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Connected & Online</div>
          </div>
        </div>
      </div>
    </div>
  );
}
