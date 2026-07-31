"use client";

import React, { useState } from "react";
import { 
  Package, Plus, X, Search, Filter, AlertTriangle, 
  CheckCircle2, ShoppingCart, Truck, Tag, FileText, Download, Building2, Star, Trash2
} from "lucide-react";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<"assets" | "stationery" | "vendors" | "purchase_orders">("assets");

  // ── 1. Assets State ──
  const [assets, setAssets] = useState([
    { id: "AST-101", name: "Dell OptiPlex Desktop Computers", serialNo: "DL-OPT-99120", category: "Computer Lab Asset", location: "Lab #2 (2nd Floor)", quantity: "45 Units", unitCost: "₹ 42,000", condition: "Excellent", status: "In Use" },
    { id: "AST-102", name: "BenQ 4K Smart Interactive Displays", serialNo: "BQ-DISP-4412", category: "Classroom Technology", location: "Class 10-A Room", quantity: "12 Units", unitCost: "₹ 1,15,000", condition: "Good", status: "In Use" },
    { id: "AST-103", name: "Olympus Binocular Science Microscopes", serialNo: "OLY-MIC-3312", category: "Biology Lab", location: "Biology Lab", quantity: "25 Units", unitCost: "₹ 18,500", condition: "Requires Service", status: "Maintenance" }
  ]);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: "", category: "Computer Lab Asset", location: "", quantity: "1", unitCost: "5000" });

  // ── 2. Stationery & Consumables Stock State ──
  const [stationery, setStationery] = useState([
    { id: "STN-01", name: "CBSE Official Answer Booklet (32 Pages)", category: "Exam Materials", inStock: 1200, minAlert: 500, unitCost: "₹ 18", status: "In Stock" },
    { id: "STN-02", name: "Dry Erase Whiteboard Markers (Black)", category: "Classroom Supplies", inStock: 45, minAlert: 100, unitCost: "₹ 35", status: "LOW STOCK ALERT ⚠️" },
    { id: "STN-03", name: "NCERT Mathematics Class 10 Textbooks", category: "Library Stock", inStock: 180, minAlert: 50, unitCost: "₹ 160", status: "In Stock" }
  ]);

  // ── 3. Vendor Directory State ──
  const [vendors] = useState([
    { id: "VND-501", name: "Hindustan Office Supplies Ltd", gstin: "07AAAAA0000A1Z5", category: "Stationery & Exam Sheets", phone: "+91 98111 88776", rating: "4.9 ★" },
    { id: "VND-502", name: "TechnoVision IT Systems", gstin: "07BBBBB1111B1Z2", category: "Computers & Smart Boards", phone: "+91 98222 99887", rating: "4.8 ★" }
  ]);

  // ── 4. Purchase Orders State ──
  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: "PO-9001", vendor: "Hindustan Office Supplies Ltd", item: "500 Dry Erase Markers & 2000 Answer Booklets", cost: "₹ 53,500", date: "26 July 2026", status: "RECEIVED & PAID ✅" },
    { id: "PO-9002", vendor: "TechnoVision IT Systems", item: "2 New Smart Interactive Displays", cost: "₹ 2,30,000", date: "29 July 2026", status: "ISSUED ⏳" }
  ]);
  const [isAddPOOpen, setIsAddPOOpen] = useState(false);
  const [newPO, setNewPO] = useState({ vendor: "Hindustan Office Supplies Ltd", item: "", cost: "10000" });

  const handleAddAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name) return;
    setAssets([...assets, {
      id: `AST-${String(assets.length + 101)}`,
      name: newAsset.name,
      serialNo: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      category: newAsset.category,
      location: newAsset.location || "Main Store",
      quantity: `${newAsset.quantity} Units`,
      unitCost: `₹ ${Number(newAsset.unitCost).toLocaleString("en-IN")}`,
      condition: "Good",
      status: "In Use"
    }]);
    setIsAddAssetOpen(false);
    setNewAsset({ name: "", category: "Computer Lab Asset", location: "", quantity: "1", unitCost: "5000" });
  };

  const handleAddPOSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPO.item) return;
    setPurchaseOrders([{
      id: `PO-${9000 + purchaseOrders.length + 1}`,
      vendor: newPO.vendor,
      item: newPO.item,
      cost: `₹ ${Number(newPO.cost).toLocaleString("en-IN")}`,
      date: "Just Now",
      status: "ISSUED ⏳"
    }, ...purchaseOrders]);
    setIsAddPOOpen(false);
    setNewPO({ vendor: "Hindustan Office Supplies Ltd", item: "", cost: "10000" });
    alert("Vendor Purchase Order issued successfully!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Inventory &amp; Asset Management <Package size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            School asset registry, classroom technology tracking, stationery stock levels, vendor directory, and purchase orders.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "assets") setIsAddAssetOpen(true);
            else if (activeTab === "purchase_orders") setIsAddPOOpen(true);
            else alert("Configuring inventory items...");
          }}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <Plus size={18} />
          <span>Quick Inventory Item</span>
        </button>
      </div>

      {/* ════════════ 4 TABS SWITCHER CONSOLE ════════════ */}
      <div className="glass-card" style={{ 
        padding: "0.6rem", 
        display: "flex", 
        gap: "0.5rem", 
        overflowX: "auto", 
        whiteSpace: "nowrap",
        border: "1px solid var(--border-color)",
        background: "var(--bg-card)",
        borderRadius: "var(--radius-md)"
      }}>
        {[
          { id: "assets", label: "Fixed Assets Tracking", icon: Package },
          { id: "stationery", label: "Stationery & Consumables", icon: Tag },
          { id: "vendors", label: "Vendor Directory", icon: Building2 },
          { id: "purchase_orders", label: "Vendor Purchase Orders", icon: ShoppingCart }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{ 
                padding: "0.6rem 1rem", 
                fontSize: "0.82rem", 
                gap: "0.45rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: isActive ? 700 : 500
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB VIEWS ════════════ */}

      {/* MODULE 1: FIXED ASSETS TRACKING */}
      {activeTab === "assets" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>School Fixed Assets Registry</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Serial Code</th>
                <th>Category</th>
                <th>Mapped Location</th>
                <th>Quantity</th>
                <th>Unit Cost</th>
                <th>Condition</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((ast) => (
                <tr key={ast.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{ast.name}</td>
                  <td><code style={{ fontSize: "0.825rem" }}>{ast.serialNo}</code></td>
                  <td><span className="badge badge-info">{ast.category}</span></td>
                  <td>{ast.location}</td>
                  <td><strong>{ast.quantity}</strong></td>
                  <td>{ast.unitCost}</td>
                  <td>
                    <span className={`badge ${ast.condition === "Requires Service" ? "badge-danger" : "badge-success"}`}>
                      {ast.condition}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => setAssets(assets.filter(a => a.id !== ast.id))}
                      style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "0.35rem 0.5rem", borderRadius: "var(--radius-sm)", cursor: "pointer" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 2: STATIONERY & CONSUMABLES */}
      {activeTab === "stationery" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Stationery &amp; Exam Paper Stock Levels</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Category</th>
                <th>Quantity in Stock</th>
                <th>Reorder Alert Threshold</th>
                <th>Unit Price</th>
                <th>Stock Status</th>
              </tr>
            </thead>
            <tbody>
              {stationery.map((stn) => (
                <tr key={stn.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{stn.name}</td>
                  <td><span className="badge badge-secondary">{stn.category}</span></td>
                  <td style={{ fontWeight: 800, color: stn.inStock <= stn.minAlert ? "#ef4444" : "var(--success)" }}>
                    {stn.inStock} Units
                  </td>
                  <td>{stn.minAlert} Units</td>
                  <td>{stn.unitCost}</td>
                  <td>
                    <span className={`badge ${stn.inStock <= stn.minAlert ? "badge-danger" : "badge-success"}`}>
                      {stn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 3: VENDOR DIRECTORY */}
      {activeTab === "vendors" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Approved School Suppliers &amp; Vendors</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Vendor Supplier Name</th>
                <th>GSTIN Number</th>
                <th>Supply Category</th>
                <th>Contact Phone</th>
                <th>Vendor Rating</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{v.name}</td>
                  <td><code>{v.gstin}</code></td>
                  <td><span className="badge badge-info">{v.category}</span></td>
                  <td>{v.phone}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{v.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 4: VENDOR PURCHASE ORDERS */}
      {activeTab === "purchase_orders" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Vendor Purchase Orders (PO)</h3>
            <button onClick={() => setIsAddPOOpen(true)} className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
              <ShoppingCart size={16} /> Record Purchase Order
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>PO Code</th>
                <th>Supplier Vendor</th>
                <th>Ordered Items Summary</th>
                <th>Total Cost</th>
                <th>Order Date</th>
                <th>Fulfillment Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po) => (
                <tr key={po.id}>
                  <td style={{ fontWeight: 700 }}>{po.id}</td>
                  <td style={{ color: "#fff", fontWeight: 700 }}>{po.vendor}</td>
                  <td>{po.item}</td>
                  <td style={{ fontWeight: 800, color: "var(--success)" }}>{po.cost}</td>
                  <td>{po.date}</td>
                  <td><span className="badge badge-success">{po.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ QUICK ADD ASSET MODAL ════════════ */}
      {isAddAssetOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 420 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add Fixed Asset</h3>
              <button onClick={() => setIsAddAssetOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddAssetSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ASSET ITEM NAME</label>
                <input type="text" value={newAsset.name} onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })} placeholder="e.g. Dell Computer Workstation" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>LOCATION ROOM</label>
                <input type="text" value={newAsset.location} onChange={(e) => setNewAsset({ ...newAsset, location: e.target.value })} placeholder="e.g. Computer Lab #1" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>QUANTITY</label>
                  <input type="number" value={newAsset.quantity} onChange={(e) => setNewAsset({ ...newAsset, quantity: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>UNIT COST (INR)</label>
                  <input type="number" value={newAsset.unitCost} onChange={(e) => setNewAsset({ ...newAsset, unitCost: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Register Asset</button>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ QUICK ADD PO MODAL ════════════ */}
      {isAddPOOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 450 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Record Purchase Order</h3>
              <button onClick={() => setIsAddPOOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddPOSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>VENDOR SUPPLIER</label>
                <select value={newPO.vendor} onChange={(e) => setNewPO({ ...newPO, vendor: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }}>
                  {vendors.map(v => <option key={v.id} value={v.name} style={{ background: "#0b0f19" }}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ORDERED ITEMS DESCRIPTION</label>
                <input type="text" value={newPO.item} onChange={(e) => setNewPO({ ...newPO, item: e.target.value })} placeholder="e.g. 100 Whiteboard Markers & 500 Exam Books" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>TOTAL PO AMOUNT (INR)</label>
                <input type="number" value={newPO.cost} onChange={(e) => setNewPO({ ...newPO, cost: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Issue Purchase Order</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
