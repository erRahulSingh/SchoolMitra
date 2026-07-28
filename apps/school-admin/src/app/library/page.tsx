import { Library, Plus, Barcode } from "lucide-react";

export default function LibraryPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Library Management & Barcode Catalog</h1>
          <p>Book cataloging, barcode scanning, book issues, returns, and overdue fine collection.</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> Add New Book</button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Barcode #</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>LIB-990142</td>
              <td style={{ fontWeight: 700 }}>Concepts of Physics (Vol 1)</td>
              <td>H.C. Verma</td>
              <td>Science & Physics</td>
              <td><span className="badge badge-success">Issued to Aarav Sharma</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
