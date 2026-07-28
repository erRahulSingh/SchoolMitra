import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    { q: "How long does school onboarding take?", a: "SchoolMitra can be fully onboarded within 24 to 48 hours. Our team assists with student data import." },
    { q: "Is the Live Bus GPS hardware required?", a: "No! Drivers can simply use the SchoolMitra Driver Mobile App on a smartphone to stream live GPS location telemetry." },
    { q: "Can parents pay school fees via UPI?", a: "Yes. Integrated with Razorpay, parents can pay via Google Pay, PhonePe, Paytm, NetBanking, or Cards with instant PDF receipts." },
    { q: "Is data stored securely?", a: "Yes. All school data is encrypted at rest and in transit using MongoDB Atlas Enterprise Cloud Security." }
  ];

  return (
    <div style={{ padding: '160px 2rem 100px 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Frequently Asked Questions</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Everything you need to know about SchoolMitra ERP & GPS.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>{faq.q}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
