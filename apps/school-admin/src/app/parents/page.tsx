import { Users, Phone, CreditCard, MessageSquare } from "lucide-react";

export default function ParentsPage() {
  const parents = [
    { id: "PAR-101", name: "Rajesh Sharma", children: ["Aarav Sharma (10-A)", "Riya Sharma (6-B)"], phone: "+91 98765 43210", feeStatus: "Paid" },
    { id: "PAR-102", name: "Suresh Patel", children: ["Ananya Patel (10-A)"], phone: "+91 98123 45678", feeStatus: "Pending" }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Parents & Guardians Directory</h1>
          <p>Parent profile details, multiple children linkage, communication logs, and payment history.</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Parent Name</th>
              <th>Contact Phone</th>
              <th>Linked Children</th>
              <th>Fee Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parents.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 700 }}>{p.name}</td>
                <td>{p.phone}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {p.children.map((c, i) => <span key={i} className="badge badge-info">{c}</span>)}
                  </div>
                </td>
                <td><span className={`badge ${p.feeStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{p.feeStatus}</span></td>
                <td>
                  <button className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                    Message Parent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
