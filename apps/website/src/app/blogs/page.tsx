import { BookOpen } from "lucide-react";

export default function BlogsPage() {
  const blogs = [
    { title: "How Live GPS Bus Telemetry Reduces Parent Anxiety by 90%", date: "July 24, 2026", category: "Transport Safety" },
    { title: "Automating School Fee Collection with UPI & Digital Invoicing", date: "July 18, 2026", category: "Fintech & ERP" },
    { title: "The Modern School ERP Checklist: What Administrators Need in 2026", date: "July 10, 2026", category: "EdTech Trends" }
  ];

  return (
    <div style={{ padding: '160px 2rem 100px 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>SchoolMitra Blogs & News</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Insights on school management, EdTech innovation, and student safety.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {blogs.map((b, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>{b.category}</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.75rem 0 0.5rem 0', color: '#fff' }}>{b.title}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
