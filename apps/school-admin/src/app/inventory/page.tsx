import { Package, Plus } from "lucide-react";

export default function InventoryPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Inventory & Asset Management</h1>
          <p>Track school assets, lab equipment, stationery, school uniforms, and purchase orders.</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> Record Purchase Order</button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity in Stock</th>
              <th>Unit Cost</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 700 }}>Dell OptiPlex Computers</td>
              <td>Computer Lab Asset</td>
              <td>45 Units</td>
              <td>₹ 42,000</td>
              <td><span className="badge badge-success">In Stock</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
