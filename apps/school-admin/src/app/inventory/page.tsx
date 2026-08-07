"use client";

import React, { useState, useEffect } from "react";
import { 
  Package, Plus, X, Search, Filter, AlertTriangle, 
  CheckCircle2, ShoppingCart, Truck, Tag, FileText, Download, Building2, Star, Trash2, Save, Edit3
} from "lucide-react";

interface AssetRecord {
  _id: string;
  name: string;
  serialNo: string;
  category: string;
  location: string;
  quantity: number;
  unitCost: number;
  condition: string;
  status: string;
}

interface StationeryRecord {
  _id: string;
  name: string;
  category: string;
  inStock: number;
  minAlert: number;
  unitCost: number;
  status: string;
}

interface VendorRecord {
  _id: string;
  name: string;
  gstin: string;
  category: string;
  phone: string;
  rating: string;
}

interface PORecord {
  _id: string;
  poCode: string;
  vendor: string;
  item: string;
  cost: number;
  date: string;
  status: string;
}

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<"assets" | "stationery" | "vendors" | "purchase_orders">("assets");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lists states
  const [assets, setAssets] = useState<AssetRecord[]>([]);
  const [stationery, setStationery] = useState<StationeryRecord[]>([]);
  const [vendors, setVendors] = useState<VendorRecord[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PORecord[]>([]);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [isAddStationeryOpen, setIsAddStationeryOpen] = useState(false);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isAddPOOpen, setIsAddPOOpen] = useState(false);

  // Edit trackers
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [editingStationeryId, setEditingStationeryId] = useState<string | null>(null);
  const [editingVendorId, setEditingVendorId] = useState<string | null>(null);
  const [editingPOId, setEditingPOId] = useState<string | null>(null);

  // Form states
  const [newAsset, setNewAsset] = useState({ name: "", category: "Computer Lab Asset", location: "", quantity: 1, unitCost: 42000, condition: "Good" });
  const [newStationery, setNewStationery] = useState({ name: "", category: "Exam Materials", inStock: 100, minAlert: 20, unitCost: 15 });
  const [newVendor, setNewVendor] = useState({ name: "", gstin: "", category: "Stationery & Exam Sheets", phone: "" });
  const [newPO, setNewPO] = useState({ vendor: "", item: "", cost: 50000, status: "ISSUED ⏳" });

  // Fetch Inventory database records
  const fetchInventoryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const assetsRes = await fetch("http://localhost:5000/api/v1/inventory/assets");
      const assetsJson = await assetsRes.json();
      if (assetsJson.success) setAssets(assetsJson.data.assets);

      const stationeryRes = await fetch("http://localhost:5000/api/v1/inventory/stationery");
      const stationeryJson = await stationeryRes.json();
      if (stationeryJson.success) setStationery(stationeryJson.data.stationery);

      const vendorsRes = await fetch("http://localhost:5000/api/v1/inventory/vendors");
      const vendorsJson = await vendorsRes.json();
      if (vendorsJson.success) {
        setVendors(vendorsJson.data.vendors);
        if (vendorsJson.data.vendors.length > 0 && !newPO.vendor) {
          setNewPO(prev => ({ ...prev, vendor: vendorsJson.data.vendors[0].name }));
        }
      }

      const poRes = await fetch("http://localhost:5000/api/v1/inventory/purchase_orders");
      const poJson = await poRes.json();
      if (poJson.success) setPurchaseOrders(poJson.data.purchaseOrders);
    } catch (err) {
      console.error(err);
      setError("Unable to sync files with inventory server database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  // Post / Put Asset
  const handleAddAssetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/inventory/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingAssetId,
          ...newAsset
        })
      });
      const json = await res.json();
      if (json.success) {
        alert(editingAssetId ? "Asset details updated!" : "Fixed asset registered!");
        setIsAddAssetOpen(false);
        fetchInventoryData();
      }
    } catch (err) {
      console.error(err);
      alert("Error saving asset.");
    } finally {
      setLoading(false);
    }
  };

  // Delete asset
  const handleDeleteAsset = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove '${name}' from DB?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/inventory/assets/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        alert("Asset removed successfully.");
        fetchInventoryData();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to remove asset.");
    } finally {
      setLoading(false);
    }
  };

  // Post / Put Stationery
  const handleAddStationerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStationery.name) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/inventory/stationery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingStationeryId,
          ...newStationery
        })
      });
      const json = await res.json();
      if (json.success) {
        alert(editingStationeryId ? "Stationery details updated!" : "Stationery stock added!");
        setIsAddStationeryOpen(false);
        fetchInventoryData();
      }
    } catch (err) {
      console.error(err);
      alert("Error saving stationery.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Stationery
  const handleDeleteStationery = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete '${name}' from stock?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/inventory/stationery/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        alert("Stationery item removed from database.");
        fetchInventoryData();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete stock item.");
    } finally {
      setLoading(false);
    }
  };

  // Post / Put Vendor
  const handleAddVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.name) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/inventory/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingVendorId,
          ...newVendor
        })
      });
      const json = await res.json();
      if (json.success) {
        alert(editingVendorId ? "Vendor directory profile updated!" : "Vendor registered!");
        setIsAddVendorOpen(false);
        fetchInventoryData();
      }
    } catch (err) {
      console.error(err);
      alert("Error saving vendor.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Vendor
  const handleDeleteVendor = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove '${name}' from approved directories?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/inventory/vendors/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        alert("Vendor removed from directory.");
        fetchInventoryData();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to remove vendor.");
    } finally {
      setLoading(false);
    }
  };

  // Post / Put Purchase Order
  const handleAddPOSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPO.item || !newPO.vendor) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/inventory/purchase_orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPOId,
          ...newPO
        })
      });
      const json = await res.json();
      if (json.success) {
        alert(editingPOId ? "Purchase order updated!" : "Vendor Purchase Order issued!");
        setIsAddPOOpen(false);
        fetchInventoryData();
      }
    } catch (err) {
      console.error(err);
      alert("Error compiling PO.");
    } finally {
      setLoading(false);
    }
  };

  // Delete PO
  const handleDeletePO = async (id: string, code: string) => {
    if (!confirm(`Are you sure you want to cancel purchase order '${code}'?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/inventory/purchase_orders/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        alert("Purchase order canceled successfully.");
        fetchInventoryData();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to cancel PO.");
    } finally {
      setLoading(false);
    }
  };

  // Edit Pre-fill wrappers
  const handleOpenEditAsset = (ast: AssetRecord) => {
    setEditingAssetId(ast._id);
    setNewAsset({
      name: ast.name,
      category: ast.category,
      location: ast.location,
      quantity: ast.quantity,
      unitCost: ast.unitCost,
      condition: ast.condition
    });
    setIsAddAssetOpen(true);
  };

  const handleOpenEditStationery = (stn: StationeryRecord) => {
    setEditingStationeryId(stn._id);
    setNewStationery({
      name: stn.name,
      category: stn.category,
      inStock: stn.inStock,
      minAlert: stn.minAlert,
      unitCost: stn.unitCost
    });
    setIsAddStationeryOpen(true);
  };

  const handleOpenEditVendor = (v: VendorRecord) => {
    setEditingVendorId(v._id);
    setNewVendor({
      name: v.name,
      gstin: v.gstin,
      category: v.category,
      phone: v.phone
    });
    setIsAddVendorOpen(true);
  };

  const handleOpenEditPO = (po: PORecord) => {
    setEditingPOId(po._id);
    setNewPO({
      vendor: po.vendor,
      item: po.item,
      cost: po.cost,
      status: po.status
    });
    setIsAddPOOpen(true);
  };

  // KPI calculations
  const totalAssetsValue = assets.reduce((acc, curr) => acc + (curr.unitCost * curr.quantity), 0);
  const lowStockAlertsCount = stationery.filter(s => s.inStock <= s.minAlert).length;
  const vendorsCount = vendors.length;
  const pendingPOCost = purchaseOrders.filter(po => po.status.includes("ISSUED")).reduce((acc, curr) => acc + curr.cost, 0);

  // Search filtering
  const filteredAssets = assets.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.serialNo.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredStationery = stationery.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredVendors = vendors.filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.gstin.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPOs = purchaseOrders.filter(po => po.vendor.toLowerCase().includes(searchQuery.toLowerCase()) || po.poCode.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* CSS Loader spinning */}
      <style>{`
        @keyframes rot-crud {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
            Inventory &amp; Assets Desk <Package size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem", margin: 0 }}>
            School asset catalog database, stationery reorder limits tracking, vendor details directory, and purchase order audits.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button 
            onClick={() => {
              if (activeTab === "assets") {
                setEditingAssetId(null);
                setNewAsset({ name: "", category: "Computer Lab Asset", location: "", quantity: 1, unitCost: 42000, condition: "Good" });
                setIsAddAssetOpen(true);
              } else if (activeTab === "stationery") {
                setEditingStationeryId(null);
                setNewStationery({ name: "", category: "Exam Materials", inStock: 100, minAlert: 20, unitCost: 15 });
                setIsAddStationeryOpen(true);
              } else if (activeTab === "vendors") {
                setEditingVendorId(null);
                setNewVendor({ name: "", gstin: "", category: "Stationery & Exam Sheets", phone: "" });
                setIsAddVendorOpen(true);
              } else if (activeTab === "purchase_orders") {
                setEditingPOId(null);
                setNewPO({ vendor: vendors[0]?.name || "", item: "", cost: 50000, status: "ISSUED ⏳" });
                setIsAddPOOpen(true);
              }
            }}
            className="btn btn-primary" 
            style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.4rem" }}
          >
            <Plus size={16} />
            <span>
              {activeTab === "assets" && "Add Asset"}
              {activeTab === "stationery" && "Add Stationery"}
              {activeTab === "vendors" && "Add Vendor"}
              {activeTab === "purchase_orders" && "Create PO"}
            </span>
          </button>
        </div>
      </div>

      {/* METRIC KPI WIDGETS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>TOTAL ASSET VALUE</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>
            ₹ {totalAssetsValue.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Valued at hardware purchase cost</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>LOW STOCK WARNINGS</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: lowStockAlertsCount > 0 ? "var(--danger)" : "var(--success)", marginTop: 4 }}>
            {lowStockAlertsCount} Alerts
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Reorder limits breached</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>APPROVED VENDORS</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#38bdf8", marginTop: 4 }}>
            {vendorsCount} Suppliers
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Registered GSTIN directory</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>PENDING PO COST</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f59e0b", marginTop: 4 }}>
            ₹ {pendingPOCost.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Unfulfilled vendor orders</div>
        </div>
      </div>

      {/* TABS CONTROLLER CONSOLE */}
      <div className="glass-card" style={{ 
        padding: "0.6rem", 
        display: "flex", 
        gap: "0.5rem", 
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
                padding: "0.55rem 0.95rem", 
                fontSize: "0.82rem", 
                gap: "0.4rem",
                borderRadius: 8,
                fontWeight: isActive ? 700 : 500
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SYNCHRONIZING BANNER */}
      {loading && (
        <div className="glass-card" style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "rgba(99,102,241,0.08)", border: "1px solid var(--primary-glow)" }}>
          <div style={{ width: 18, height: 18, border: "3px solid rgba(255,255,255,0.1)", borderLeft: "3px solid var(--primary)", borderRadius: "50%", animation: "rot-crud 1s linear infinite" }} />
          <span style={{ fontSize: "0.82rem", color: "var(--text-main)", fontWeight: 700 }}>Synchronizing inventory items database...</span>
        </div>
      )}

      {/* SEARCH TOOLBAR */}
      <div className="glass-card" style={{ padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Search size={16} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder={`Search ${activeTab === "assets" ? "asset name, serial code..." : activeTab === "stationery" ? "stationery items description..." : activeTab === "vendors" ? "vendor suppliers name, GSTIN..." : "PO codes or vendor names..."}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            color: "var(--text-main)",
            outline: "none",
            fontSize: "0.85rem"
          }}
        />
      </div>

      {/* ════════════ TAB CONTROLLERS ════════════ */}

      {/* TAB 1: FIXED ASSETS */}
      {activeTab === "assets" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Fixed Assets Registry</h3>
          
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Asset Item</th>
                  <th>Serial / Barcode</th>
                  <th>Asset Category</th>
                  <th>Location Room</th>
                  <th>Quantity</th>
                  <th>Unit Cost</th>
                  <th>Total Capital</th>
                  <th>Condition</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((ast) => (
                  <tr key={ast._id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{ast.name}</td>
                    <td><code style={{ fontSize: "0.825rem", color: "var(--primary)" }}>{ast.serialNo}</code></td>
                    <td><span className="badge badge-info">{ast.category}</span></td>
                    <td>{ast.location}</td>
                    <td style={{ fontWeight: 800 }}>{ast.quantity} Units</td>
                    <td>₹ {ast.unitCost.toLocaleString("en-IN")}</td>
                    <td style={{ fontWeight: 800, color: "var(--success)" }}>₹ {(ast.unitCost * ast.quantity).toLocaleString("en-IN")}</td>
                    <td>
                      <span className={`badge ${
                        ast.condition === "Requires Service" || ast.condition === "Damaged" ? "badge-danger" : "badge-success"
                      }`}>
                        {ast.condition}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button 
                          onClick={() => handleOpenEditAsset(ast)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.5rem" }}
                        >
                          <Edit3 size={13} />
                        </button>
                        <button 
                          onClick={() => handleDeleteAsset(ast._id, ast.name)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.5rem", color: "var(--danger)" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: STATIONERY */}
      {activeTab === "stationery" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Stationery &amp; Exam Materials Stock</h3>
          
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th>Category</th>
                  <th>Qty in Stock</th>
                  <th>Safety Threshold</th>
                  <th>Unit Price</th>
                  <th>Total Cost Valuation</th>
                  <th>Stock Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStationery.map((stn) => {
                  const isLow = stn.inStock <= stn.minAlert;
                  return (
                    <tr key={stn._id}>
                      <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{stn.name}</td>
                      <td><span className="badge badge-secondary">{stn.category}</span></td>
                      <td style={{ fontWeight: 800, color: isLow ? "var(--danger)" : "var(--success)" }}>{stn.inStock} Units</td>
                      <td>{stn.minAlert} Units</td>
                      <td>₹ {stn.unitCost}</td>
                      <td style={{ fontWeight: 800 }}>₹ {(stn.unitCost * stn.inStock).toLocaleString("en-IN")}</td>
                      <td>
                        <span className={`badge ${isLow ? "badge-danger" : "badge-success"}`}>
                          {isLow ? "LOW STOCK ALERT ⚠️" : "In Stock"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                          <button 
                            onClick={() => handleOpenEditStationery(stn)}
                            className="btn btn-secondary"
                            style={{ padding: "0.35rem 0.5rem" }}
                          >
                            <Edit3 size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeleteStationery(stn._id, stn.name)}
                            className="btn btn-secondary"
                            style={{ padding: "0.35rem 0.5rem", color: "var(--danger)" }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: VENDORS */}
      {activeTab === "vendors" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Approved Suppliers &amp; Vendors</h3>
          
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Vendor Supplier</th>
                  <th>GSTIN Identification</th>
                  <th>Supply Category</th>
                  <th>Contact Details</th>
                  <th>Vendor Rating</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((v) => (
                  <tr key={v._id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{v.name}</td>
                    <td><code style={{ fontSize: "0.825rem" }}>{v.gstin}</code></td>
                    <td><span className="badge badge-info">{v.category}</span></td>
                    <td style={{ fontFamily: "monospace" }}>{v.phone}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 800 }}>{v.rating}</td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button 
                          onClick={() => handleOpenEditVendor(v)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.5rem" }}
                        >
                          <Edit3 size={13} />
                        </button>
                        <button 
                          onClick={() => handleDeleteVendor(v._id, v.name)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.5rem", color: "var(--danger)" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PURCHASE ORDERS */}
      {activeTab === "purchase_orders" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Vendor Purchase Orders Ledger</h3>
          
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>PO Reference</th>
                  <th>Vendor Supplier</th>
                  <th>Ordered Items Description</th>
                  <th>Total Cost</th>
                  <th>Date Issued</th>
                  <th>Fulfillment Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPOs.map((po) => (
                  <tr key={po._id}>
                    <td style={{ fontFamily: "monospace", fontWeight: 800 }}>{po.poCode}</td>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{po.vendor}</td>
                    <td>{po.item}</td>
                    <td style={{ fontWeight: 800, color: "var(--success)" }}>₹ {po.cost.toLocaleString("en-IN")}</td>
                    <td>{po.date}</td>
                    <td>
                      <span className={`badge ${po.status.includes("RECEIVED") ? "badge-success" : "badge-warning"}`}>
                        {po.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button 
                          onClick={() => handleOpenEditPO(po)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.5rem" }}
                        >
                          <Edit3 size={13} />
                        </button>
                        <button 
                          onClick={() => handleDeletePO(po._id, po.poCode)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.5rem", color: "var(--danger)" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ ADD / EDIT FIXED ASSET MODAL ════════════ */}
      {isAddAssetOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "500px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Package size={20} color="var(--primary)" />
                <span>{editingAssetId ? "Edit Fixed Asset Details" : "Register Fixed Asset"}</span>
              </h3>
              <button onClick={() => setIsAddAssetOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddAssetSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSET ITEM NAME</label>
                <input 
                  type="text" 
                  value={newAsset.name} 
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })} 
                  placeholder="e.g. Dell OptiPlex Computer Workstation" 
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSET CATEGORY</label>
                <select
                  value={newAsset.category}
                  onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                >
                  <option value="Computer Lab Asset">Computer Lab Asset</option>
                  <option value="Classroom Technology">Classroom Technology</option>
                  <option value="Biology Lab">Biology Lab</option>
                  <option value="General Equipment">General Equipment</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LOCATION ROOM</label>
                <input 
                  type="text" 
                  value={newAsset.location} 
                  onChange={(e) => setNewAsset({ ...newAsset, location: e.target.value })} 
                  placeholder="e.g. Computer Lab #2 (2nd Floor)" 
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>QUANTITY</label>
                  <input 
                    type="number" 
                    value={newAsset.quantity} 
                    onChange={(e) => setNewAsset({ ...newAsset, quantity: Number(e.target.value) })} 
                    min={1} 
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>UNIT COST (₹)</label>
                  <input 
                    type="number" 
                    value={newAsset.unitCost} 
                    onChange={(e) => setNewAsset({ ...newAsset, unitCost: Number(e.target.value) })} 
                    min={0} 
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsAddAssetOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: "0.4rem" }}>
                  <Save size={16} /> <span>{editingAssetId ? "Update Asset" : "Register Asset"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD / EDIT STATIONERY MODAL ════════════ */}
      {isAddStationeryOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "500px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Tag size={20} color="var(--primary)" />
                <span>{editingStationeryId ? "Edit Stationery Item" : "Add Stationery Consumable"}</span>
              </h3>
              <button onClick={() => setIsAddStationeryOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddStationerySubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ITEM DESCRIPTION</label>
                <input 
                  type="text" 
                  value={newStationery.name} 
                  onChange={(e) => setNewStationery({ ...newStationery, name: e.target.value })} 
                  placeholder="e.g. CBSE Answer Booklets (32 Pages)" 
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CATEGORY</label>
                <select
                  value={newStationery.category}
                  onChange={(e) => setNewStationery({ ...newStationery, category: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                >
                  <option value="Exam Materials">Exam Materials</option>
                  <option value="Classroom Supplies">Classroom Supplies</option>
                  <option value="Office Stationery">Office Stationery</option>
                  <option value="Library Stock">Library Stock</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>IN STOCK</label>
                  <input 
                    type="number" 
                    value={newStationery.inStock} 
                    onChange={(e) => setNewStationery({ ...newStationery, inStock: Number(e.target.value) })} 
                    min={0} 
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MIN SAFETY QTY</label>
                  <input 
                    type="number" 
                    value={newStationery.minAlert} 
                    onChange={(e) => setNewStationery({ ...newStationery, minAlert: Number(e.target.value) })} 
                    min={0} 
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>UNIT COST (₹)</label>
                  <input 
                    type="number" 
                    value={newStationery.unitCost} 
                    onChange={(e) => setNewStationery({ ...newStationery, unitCost: Number(e.target.value) })} 
                    min={0} 
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsAddStationeryOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: "0.4rem" }}>
                  <Save size={16} /> <span>{editingStationeryId ? "Update Item" : "Save Item"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD / EDIT VENDOR MODAL ════════════ */}
      {isAddVendorOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "500px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Building2 size={20} color="var(--primary)" />
                <span>{editingVendorId ? "Edit Vendor Details" : "Add Approved Supplier Vendor"}</span>
              </h3>
              <button onClick={() => setIsAddVendorOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddVendorSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>VENDOR SUPPLIER NAME</label>
                <input 
                  type="text" 
                  value={newVendor.name} 
                  onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })} 
                  placeholder="e.g. Hindustan Office Supplies Ltd" 
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>GSTIN NUMBER</label>
                <input 
                  type="text" 
                  value={newVendor.gstin} 
                  onChange={(e) => setNewVendor({ ...newVendor, gstin: e.target.value })} 
                  placeholder="e.g. 07AAAAA0000A1Z5" 
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem", fontWeight: 700 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SUPPLY CATEGORY</label>
                  <select
                    value={newVendor.category}
                    onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  >
                    <option value="Stationery & Exam Sheets">Stationery &amp; Exam Sheets</option>
                    <option value="Computers & Smart Boards">Computers &amp; Smart Boards</option>
                    <option value="Laboratory Supplies">Laboratory Supplies</option>
                    <option value="General Maintenance">General Maintenance</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CONTACT PHONE</label>
                  <input 
                    type="text" 
                    value={newVendor.phone} 
                    onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })} 
                    placeholder="e.g. +91 98111 88776" 
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsAddVendorOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: "0.4rem" }}>
                  <Save size={16} /> <span>{editingVendorId ? "Update Profile" : "Register Supplier"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ CREATE / EDIT PURCHASE ORDER MODAL ════════════ */}
      {isAddPOOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "500px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShoppingCart size={20} color="var(--primary)" />
                <span>{editingPOId ? "Edit Purchase Order" : "Issue Purchase Order"}</span>
              </h3>
              <button onClick={() => setIsAddPOOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddPOSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT VENDOR SUPPLIER</label>
                <select
                  value={newPO.vendor}
                  onChange={(e) => setNewPO({ ...newPO, vendor: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem", outline: "none", fontWeight: 600 }}
                >
                  {vendors.map(v => (
                    <option key={v._id} value={v.name}>{v.name}</option>
                  ))}
                  {vendors.length === 0 && <option value="">No suppliers registered.</option>}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ORDERED ITEMS SUMMARY DESCRIPTION</label>
                <input 
                  type="text" 
                  value={newPO.item} 
                  onChange={(e) => setNewPO({ ...newPO, item: e.target.value })} 
                  placeholder="e.g. 500 Whiteboard Markers & 2000 answer books" 
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TOTAL PO AMOUNT (₹)</label>
                  <input 
                    type="number" 
                    value={newPO.cost} 
                    onChange={(e) => setNewPO({ ...newPO, cost: Number(e.target.value) })} 
                    min={1} 
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--success)", fontSize: "0.88rem", fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>FULFILLMENT STATUS</label>
                  <select
                    value={newPO.status}
                    onChange={(e) => setNewPO({ ...newPO, status: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem", fontWeight: 600 }}
                  >
                    <option value="ISSUED ⏳">ISSUED ⏳</option>
                    <option value="RECEIVED & PAID ✅">RECEIVED &amp; PAID ✅</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsAddPOOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: "0.4rem" }}>
                  <ShoppingCart size={16} /> <span>{editingPOId ? "Update PO Order" : "Issue Purchase Order"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
