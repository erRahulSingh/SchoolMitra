import { FileText, Plus, Paperclip } from "lucide-react";

export default function HomeworkPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Homework & Daily Assignments</h1>
          <p>Assign daily homework with PDF/image attachments and track student submission status.</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> Create Homework</button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Physics Lab Experiment #4 - Reflection & Refraction</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Assigned for Class 10-A • Due Date: 2026-07-30</div>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <span className="badge badge-success">38 Submitted</span>
          <span className="badge badge-warning">4 Pending</span>
        </div>
      </div>
    </div>
  );
}
