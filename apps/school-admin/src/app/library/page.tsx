"use client";

import React, { useState, useEffect } from "react";
import { 
  Library, Plus, Barcode, BookOpen, User, Calendar, 
  Search, Filter, Trash2, CheckCircle, Clock, DollarSign, X, Save, AlertCircle, FileText
} from "lucide-react";

interface BookRecord {
  _id: string;
  title: string;
  author: string;
  barcode: string;
  isbn: string;
  category: string;
  shelfLocation: string;
  copiesAvailable: number;
  totalCopies: number;
  status: string;
}

interface IssueRecord {
  id: string;
  bookId: string;
  title: string;
  author: string;
  barcode: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
}

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"catalog" | "checkouts">("catalog");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lists states
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [issues, setIssues] = useState<IssueRecord[]>([]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  // Form states
  const [newBookForm, setNewBookForm] = useState({
    title: "",
    author: "",
    isbn: "",
    barcode: "",
    category: "Science & Physics",
    shelfLocation: "Shelf A-1",
    totalCopies: 1
  });

  const [issueForm, setIssueForm] = useState({
    bookId: "",
    studentName: "",
    dueDate: ""
  });

  const [returnForm, setReturnForm] = useState({
    bookBarcode: "",
    fineAmount: 0,
    condition: "Good"
  });

  // Fetch data from DB
  const fetchLibraryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const booksRes = await fetch("http://localhost:5000/api/v1/library/books");
      const booksJson = await booksRes.json();
      if (booksJson.success) {
        setBooks(booksJson.data.books);
      }

      const issuesRes = await fetch("http://localhost:5000/api/v1/library/issues");
      const issuesJson = await issuesRes.json();
      if (issuesJson.success) {
        setIssues(issuesJson.data.issues);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to sync with library catalog server database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryData();
  }, []);

  // Post new book
  const handleAddBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookForm.title || !newBookForm.author) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/library/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBookForm)
      });
      const json = await res.json();
      if (json.success) {
        alert(`Book cataloged: ${newBookForm.title}`);
        setIsAddModalOpen(false);
        fetchLibraryData();
      }
    } catch (err) {
      console.error(err);
      alert("Error adding book to catalog.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Book
  const handleDeleteBook = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove '${title}' from library catalog?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/library/books/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        alert("Book removed from database.");
        fetchLibraryData();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to remove book.");
    } finally {
      setLoading(false);
    }
  };

  // Issue Book
  const handleIssueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueForm.bookId || !issueForm.studentName) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/library/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(issueForm)
      });
      const json = await res.json();
      if (json.success) {
        alert("Book issued successfully!");
        setIsIssueModalOpen(false);
        fetchLibraryData();
      } else {
        alert(json.message || "Failed to issue book.");
      }
    } catch (err) {
      console.error(err);
      alert("Error processing checkout issue.");
    } finally {
      setLoading(false);
    }
  };

  // Return Book
  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnForm.bookBarcode) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/library/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(returnForm)
      });
      const json = await res.json();
      if (json.success) {
        alert("Book returned and inventory updated!");
        setIsReturnModalOpen(false);
        fetchLibraryData();
      } else {
        alert(json.message || "Error returning book.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to record return.");
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill fields for Issue Modal
  const openIssueModalForBook = (book: BookRecord) => {
    setIssueForm({
      bookId: book._id,
      studentName: "",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    });
    setIsIssueModalOpen(true);
  };

  // Pre-fill fields for Return Modal
  const openReturnModalForIssue = (issue: IssueRecord) => {
    const dueTime = new Date(issue.dueDate).getTime();
    const nowTime = Date.now();
    const daysLate = Math.max(0, Math.ceil((nowTime - dueTime) / (1000 * 60 * 60 * 24)));
    const fineCalculated = daysLate * 10; // Fine ₹10 per day late

    setReturnForm({
      bookBarcode: issue.barcode,
      fineAmount: fineCalculated,
      condition: "Good"
    });
    setIsReturnModalOpen(true);
  };

  // Filter book catalog list
  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.author.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.barcode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || b.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // KPI calculations
  const totalTitlesCount = books.length;
  const activeCheckoutsCount = issues.length;
  const totalAvailableCopies = books.reduce((acc, curr) => acc + curr.copiesAvailable, 0);
  const totalLibraryCopies = books.reduce((acc, curr) => acc + curr.totalCopies, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* CSS Spin Animation */}
      <style>{`
        @keyframes rot-lib {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* HEADER BAR */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
            Library Management &amp; Catalog <Library size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem", margin: 0 }}>
            Catalog books with barcodes, track checkouts, calculate overdue late fines, and manage shelf organization.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.4rem" }}>
            <Plus size={16} /> <span>Add New Book</span>
          </button>
          <button 
            onClick={() => {
              setReturnForm({ bookBarcode: "", fineAmount: 0, condition: "Good" });
              setIsReturnModalOpen(true);
            }} 
            className="btn btn-secondary" 
            style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.4rem" }}
          >
            <Barcode size={16} /> <span>Scan Book Return</span>
          </button>
        </div>
      </div>

      {/* METRIC KPI WIDGETS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>CATALOGED TITLES</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--primary)", marginTop: 4 }}>{totalTitlesCount} Books</div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Unique ISBN records registered</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>ACTIVE ISSUES OUT</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f59e0b", marginTop: 4 }}>{activeCheckoutsCount} Checked Out</div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Issued to students or faculty</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>TOTAL STACK INVENTORY</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--success)", marginTop: 4 }}>
            {totalAvailableCopies} / {totalLibraryCopies} Copies
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Physical books inside stacks</div>
        </div>

        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800 }}>SHELF LAYOUT ROOMS</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#38bdf8", marginTop: 4 }}>4 Stacks (A-D)</div>
          <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: 4 }}>Arranged by topic categories</div>
        </div>
      </div>

      {/* TAB SWAP CONSOLE */}
      <div className="glass-card" style={{ 
        padding: "0.6rem", 
        display: "flex", 
        gap: "0.5rem", 
        border: "1px solid var(--border-color)",
        background: "var(--bg-card)",
        borderRadius: "var(--radius-md)"
      }}>
        {[
          { id: "catalog", label: "Library Books Catalog", icon: BookOpen },
          { id: "checkouts", label: "Active Checkouts & Issues", icon: Clock }
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

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="glass-card" style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "rgba(99,102,241,0.08)", border: "1px solid var(--primary-glow)" }}>
          <div style={{ width: 18, height: 18, border: "3px solid rgba(255,255,255,0.1)", borderLeft: "3px solid var(--primary)", borderRadius: "50%", animation: "rot-lib 1s linear infinite" }} />
          <span style={{ fontSize: "0.82rem", color: "var(--text-main)", fontWeight: 700 }}>Synchronizing with database stacks...</span>
        </div>
      )}

      {/* ════════════ TAB MODULES ════════════ */}

      {/* TAB 1: BOOKS CATALOG */}
      {activeTab === "catalog" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {/* Filters Toolbar */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flex: 1, minWidth: "280px" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 2 }} />
                <input 
                  type="text"
                  placeholder="Search book title, author, barcode #..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem 0.6rem 2.2rem",
                    background: "var(--bg-input)",
                    color: "var(--text-main)",
                    borderRadius: 8,
                    fontSize: "0.85rem",
                    outline: "none"
                  }}
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  padding: "0.6rem 1rem",
                  background: "var(--bg-input)",
                  color: "var(--text-main)",
                  borderRadius: 8,
                  fontSize: "0.85rem",
                  border: "1px solid var(--border-color)",
                  fontWeight: 600
                }}
              >
                <option value="All">All Categories</option>
                <option value="Science & Physics">Science &amp; Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Astronomy">Astronomy</option>
                <option value="General">General Reference</option>
              </select>
            </div>
          </div>

          {/* Table list */}
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Barcode #</th>
                  <th>Book Title &amp; Details</th>
                  <th>Category</th>
                  <th>Shelf Location</th>
                  <th>Available / Total</th>
                  <th>Inventory Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((b) => (
                  <tr key={b._id}>
                    <td style={{ fontFamily: "monospace", fontWeight: 800, color: "var(--primary)" }}>{b.barcode}</td>
                    <td style={{ color: "var(--text-heading)" }}>
                      <strong style={{ display: "block" }}>{b.title}</strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>By {b.author} &bull; ISBN: {b.isbn || "N/A"}</span>
                    </td>
                    <td><span className="badge badge-info">{b.category}</span></td>
                    <td style={{ fontWeight: 700 }}>{b.shelfLocation}</td>
                    <td style={{ fontWeight: 800 }}>{b.copiesAvailable} / {b.totalCopies} Copies</td>
                    <td>
                      <span className={`badge ${b.copiesAvailable > 0 ? "badge-success" : "badge-danger"}`}>
                        {b.copiesAvailable > 0 ? "Available Stack" : "All Checked Out"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button 
                          onClick={() => openIssueModalForBook(b)}
                          className="btn btn-primary"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                          disabled={b.copiesAvailable <= 0}
                        >
                          <BookOpen size={13} /> Issue Checkout
                        </button>

                        <button 
                          onClick={() => handleDeleteBook(b._id, b.title)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.5rem", fontSize: "0.72rem", color: "var(--danger)" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBooks.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>No matching books registered in this stack.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE CHECKOUTS & ISSUES */}
      {activeTab === "checkouts" && (
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Active Issues Ledger</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Outstanding checkouts. Late returns calculate a fine of ₹10/day.</p>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Barcode #</th>
                  <th>Book Checkout Title</th>
                  <th>Issued To Student</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Due Warning</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((i) => {
                  const dueTime = new Date(i.dueDate).getTime();
                  const isOverdue = dueTime < Date.now();
                  return (
                    <tr key={i.id}>
                      <td style={{ fontFamily: "monospace", fontWeight: 800 }}>{i.barcode}</td>
                      <td>
                        <strong style={{ color: "var(--text-heading)" }}>{i.title}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>By {i.author}</div>
                      </td>
                      <td style={{ fontWeight: 800 }}><span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}><User size={13} color="var(--primary)" /> {i.studentName}</span></td>
                      <td>{i.issueDate}</td>
                      <td style={{ fontWeight: 700 }}>{i.dueDate}</td>
                      <td>
                        <span className={`badge ${isOverdue ? "badge-danger" : "badge-success"}`}>
                          {isOverdue ? "OVERDUE ⚠️" : "Active Check"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          onClick={() => openReturnModalForIssue(i)}
                          className="btn btn-secondary"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.72rem", gap: "0.25rem" }}
                        >
                          <CheckCircle size={13} color="var(--success)" /> Return Book
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {issues.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>No active checkouts currently outstanding.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ ADD BOOK MODAL ════════════ */}
      {isAddModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "540px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <BookOpen size={20} color="var(--primary)" />
                <span>Catalog New Book Stack</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddBookSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BOOK TITLE</label>
                <input 
                  type="text" 
                  value={newBookForm.title}
                  onChange={(e) => setNewBookForm({ ...newBookForm, title: e.target.value })}
                  placeholder="e.g. Fundamentals of Organic Chemistry" 
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>AUTHOR NAME</label>
                  <input 
                    type="text" 
                    value={newBookForm.author}
                    onChange={(e) => setNewBookForm({ ...newBookForm, author: e.target.value })}
                    placeholder="e.g. H.C. Verma" 
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ISBN ID</label>
                  <input 
                    type="text" 
                    value={newBookForm.isbn}
                    onChange={(e) => setNewBookForm({ ...newBookForm, isbn: e.target.value })}
                    placeholder="e.g. 978-8177" 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BARCODE ID (AUTO IF BLANK)</label>
                  <input 
                    type="text" 
                    value={newBookForm.barcode}
                    onChange={(e) => setNewBookForm({ ...newBookForm, barcode: e.target.value })}
                    placeholder="e.g. LIB-990146" 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>CATEGORY TOPIC</label>
                  <select
                    value={newBookForm.category}
                    onChange={(e) => setNewBookForm({ ...newBookForm, category: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  >
                    <option value="Science & Physics">Science &amp; Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Astronomy">Astronomy</option>
                    <option value="General">General Reference</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SHELF LOCATION</label>
                  <input 
                    type="text" 
                    value={newBookForm.shelfLocation}
                    onChange={(e) => setNewBookForm({ ...newBookForm, shelfLocation: e.target.value })}
                    placeholder="e.g. Shelf A-4" 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TOTAL COPIES INVENTORY</label>
                  <input 
                    type="number" 
                    value={newBookForm.totalCopies}
                    onChange={(e) => setNewBookForm({ ...newBookForm, totalCopies: Number(e.target.value) })}
                    min={1}
                    required 
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: "0.4rem" }}>
                  <Save size={16} /> <span>Save Book to Stacks</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ════════════ ISSUE BOOK MODAL ════════════ */}
      {isIssueModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "500px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Clock size={20} color="var(--primary)" />
                <span>Issue Book Checkout</span>
              </h3>
              <button onClick={() => setIsIssueModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleIssueSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>TARGET BOOK IDENTIFIER</label>
                <select
                  value={issueForm.bookId}
                  onChange={(e) => setIssueForm({ ...issueForm, bookId: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem", outline: "none", fontWeight: 600 }}
                >
                  <option value="">Select available book...</option>
                  {books.filter(b => b.copiesAvailable > 0).map(b => (
                    <option key={b._id} value={b._id}>{b.title} ({b.barcode})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STUDENT NAME</label>
                <input 
                  type="text" 
                  value={issueForm.studentName}
                  onChange={(e) => setIssueForm({ ...issueForm, studentName: e.target.value })}
                  placeholder="e.g. Aarav Sharma" 
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DUE DATE BACK</label>
                <input 
                  type="date" 
                  value={issueForm.dueDate}
                  onChange={(e) => setIssueForm({ ...issueForm, dueDate: e.target.value })}
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsIssueModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: "0.4rem" }}>
                  <CheckCircle size={16} /> <span>Issue Book</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ════════════ RETURN BOOK / SCAN MODAL ════════════ */}
      {isReturnModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "500px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Barcode size={20} color="var(--primary)" />
                <span>Return Book Receipt</span>
              </h3>
              <button onClick={() => setIsReturnModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleReturnSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BOOK BARCODE NUMBER</label>
                <input 
                  type="text" 
                  value={returnForm.bookBarcode}
                  onChange={(e) => setReturnForm({ ...returnForm, bookBarcode: e.target.value })}
                  placeholder="Scan or type e.g. LIB-990142" 
                  required 
                  style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem", fontWeight: 700 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LATE FINE AMOUNT (₹)</label>
                  <input 
                    type="number" 
                    value={returnForm.fineAmount}
                    onChange={(e) => setReturnForm({ ...returnForm, fineAmount: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: returnForm.fineAmount > 0 ? "var(--danger)" : "var(--text-main)", fontSize: "0.88rem", fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BOOK CONDITION</label>
                  <select
                    value={returnForm.condition}
                    onChange={(e) => setReturnForm({ ...returnForm, condition: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)", fontSize: "0.88rem" }}
                  >
                    <option value="Good">Good Condition</option>
                    <option value="Damaged">Damaged Stack</option>
                    <option value="Lost">Lost Stack</option>
                  </select>
                </div>
              </div>

              {/* Late Warning Warning */}
              {returnForm.fineAmount > 0 && (
                <div style={{ background: "rgba(239, 68, 68, 0.12)", padding: "0.85rem", borderRadius: 8, border: "1px solid rgba(239, 68, 68, 0.3)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <AlertCircle size={18} color="var(--danger)" />
                  <span style={{ fontSize: "0.8rem", color: "var(--danger)", fontWeight: 700 }}>Overdue checkouts detected! Collected fine: ₹ {returnForm.fineAmount}</span>
                </div>
              )}

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsReturnModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: "0.4rem" }}>
                  <CheckCircle size={16} /> <span>Submit Return</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
