"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, Download, CheckSquare, Square, ChevronLeft, ChevronRight, Edit3, Save, X, Trash2 } from "lucide-react";
import { Button } from "./Button";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  editable?: boolean;
}

interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: keyof T;
  searchPlaceholder?: string;
  pageSize?: number;
  onBulkDelete?: (selectedItems: T[]) => void;
  onEditRow?: (row: T) => void;
  onSaveRow?: (updatedRow: T) => void;
  exportTitle?: string;
}

export function DataGrid<T extends { id: string | number }>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search records...",
  pageSize = 5,
  onBulkDelete,
  onEditRow,
  onSaveRow,
  exportTitle = "Data Grid Export"
}: DataGridProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Inline Row Editing State
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editingRowData, setEditingRowData] = useState<any>({});

  // Search Filter
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) => {
      if (searchKey && item[searchKey]) {
        return String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase());
      }
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [data, searchTerm, searchKey]);

  // Sort Filter
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a: any, b: any) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedData.map((d) => d.id)));
    }
  };

  const toggleSelectRow = (id: string | number) => {
    const updated = new Set(selectedIds);
    if (updated.has(id)) updated.delete(id);
    else updated.add(id);
    setSelectedIds(updated);
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const startEditing = (row: T) => {
    if (onEditRow) {
      onEditRow(row);
    } else {
      setEditingId(row.id);
      setEditingRowData({ ...row });
    }
  };

  const saveEditing = () => {
    if (onSaveRow) {
      onSaveRow(editingRowData);
    }
    setEditingId(null);
    setEditingRowData({});
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingRowData({});
  };

  const selectedItems = useMemo(() => {
    return data.filter((d) => selectedIds.has(d.id));
  }, [data, selectedIds]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      
      {/* Top Search & Actions Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", minWidth: 280, flex: 1, maxWidth: 420 }}>
          <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "100%",
              padding: "0.6rem 1rem 0.6rem 2.4rem",
              background: "var(--bg-input)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-main)",
              fontSize: "0.85rem",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {selectedIds.size > 0 && onBulkDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                onBulkDelete(selectedItems);
                setSelectedIds(new Set());
              }}
            >
              Delete ({selectedIds.size})
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download size={14} />}
            onClick={() => alert(`Exporting ${sortedData.length} records to Excel...`)}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="table-container" style={{ border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: 40, textAlign: "center" }}>
                <button onClick={toggleSelectAll} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {selectedIds.size > 0 && selectedIds.size === paginatedData.length ? (
                    <CheckSquare size={16} color="var(--primary)" />
                  ) : (
                    <Square size={16} />
                  )}
                </button>
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  style={{ cursor: col.sortable !== false ? "pointer" : "default" }}
                >
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <span>{col.header}</span>
                    {sortKey === col.key && (
                      sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
              <th style={{ width: 90, textAlign: "center" }}>Quick Edit</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => {
                const isSelected = selectedIds.has(row.id);
                const isEditing = editingId === row.id;

                return (
                  <tr key={String(row.id)} style={{ background: isEditing ? "rgba(99, 102, 241, 0.12)" : isSelected ? "rgba(99, 102, 241, 0.06)" : undefined }}>
                    <td style={{ textAlign: "center" }}>
                      <button onClick={() => toggleSelectRow(row.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                        {isSelected ? <CheckSquare size={16} color="var(--primary)" /> : <Square size={16} />}
                      </button>
                    </td>

                    {columns.map((col) => {
                      if (isEditing && col.editable !== false && col.key !== "action") {
                        return (
                          <td key={col.key}>
                            <input
                              type="text"
                              value={editingRowData[col.key] ?? ""}
                              onChange={(e) => setEditingRowData({ ...editingRowData, [col.key]: e.target.value })}
                              style={{
                                width: "100%",
                                padding: "0.35rem 0.5rem",
                                background: "var(--bg-input)",
                                border: "1px solid var(--primary)",
                                borderRadius: 4,
                                color: "var(--text-main)",
                                fontSize: "0.8rem"
                              }}
                            />
                          </td>
                        );
                      }
                      return (
                        <td key={col.key}>
                          {col.render ? col.render(row) : String((row as any)[col.key] ?? "—")}
                        </td>
                      );
                    })}

                    <td style={{ textAlign: "center" }}>
                      {isEditing ? (
                        <div style={{ display: "inline-flex", gap: 4 }}>
                          <button onClick={saveEditing} title="Save Changes" style={{ background: "rgba(16, 185, 129, 0.2)", border: "none", color: "var(--success)", padding: "0.3rem", borderRadius: 4, cursor: "pointer" }}>
                            <Save size={14} />
                          </button>
                          <button onClick={cancelEditing} title="Cancel" style={{ background: "rgba(239, 68, 68, 0.2)", border: "none", color: "#ef4444", padding: "0.3rem", borderRadius: 4, cursor: "pointer" }}>
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => startEditing(row)} title="Edit Row" style={{ background: "var(--btn-secondary-bg)", border: "1px solid var(--border-color)", color: "var(--text-muted)", padding: "0.3rem 0.55rem", borderRadius: 4, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.72rem" }}>
                          <Edit3 size={12} /> Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + 2} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "var(--text-muted)" }}>
        <div>
          Showing {sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} records
        </div>

        <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="btn btn-secondary"
            style={{ padding: "0.35rem 0.6rem", fontSize: "0.75rem", opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            <ChevronLeft size={14} />
          </button>
          <span style={{ padding: "0 0.5rem", fontWeight: 700, color: "var(--text-heading)" }}>
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="btn btn-secondary"
            style={{ padding: "0.35rem 0.6rem", fontSize: "0.75rem", opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
