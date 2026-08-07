"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Search, 
  X, 
  Download 
} from "lucide-react";

interface GalleryPageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function GalleryPage({ language = "en", onNavigate }: GalleryPageProps) {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);

  const albumsList = [
    {
      id: 1,
      title: "Annual Sports Day 2025",
      photosCount: "42 Photos",
      category: "Events",
      coverImg: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400",
      bgColor: "#fff5f5"
    },
    {
      id: 2,
      title: "Republic Day 2025",
      photosCount: "38 Photos",
      category: "Events",
      coverImg: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400",
      bgColor: "#eff6ff"
    },
    {
      id: 3,
      title: "Science Exhibition 2025",
      photosCount: "33 Photos",
      category: "Activities",
      coverImg: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
      bgColor: "#f5f3ff"
    },
    {
      id: 4,
      title: "Children's Day 2025",
      photosCount: "29 Photos",
      category: "Activities",
      coverImg: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400",
      bgColor: "#f0fdf4"
    },
    {
      id: 5,
      title: "Educational Trip 2025",
      photosCount: "27 Photos",
      category: "Trips",
      coverImg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      bgColor: "#fdf4ff"
    },
    {
      id: 6,
      title: "Art & Craft Activity 2025",
      photosCount: "31 Photos",
      category: "Activities",
      coverImg: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
      bgColor: "#fffbeb"
    }
  ];

  const filteredAlbums = activeTab === "All"
    ? albumsList
    : albumsList.filter(a => a.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%",
      width: "100%"
    }}>

      {/* ════════════ TOP HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem",
        borderBottom: "1px solid #f1f5f9"
      }}>
        {/* Left Side: Back Arrow + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("home") : window.history.back()}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0",
              color: "#0f172a"
            }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>

          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "'Outfit', sans-serif"
          }}>
            Photo Album
          </h1>
        </div>

        {/* Right Side: Search Icon */}
        <button
          type="button"
          onClick={() => alert("Search photo album requested...")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.2rem",
            color: "#0f172a"
          }}
        >
          <Search size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ FILTER PILLS ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        overflowX: "auto",
        scrollbarWidth: "none",
        paddingBottom: "2px"
      }}>
        {[
          { id: "All", label: "All Albums" },
          { id: "Events", label: "Events" },
          { id: "Activities", label: "Activities" },
          { id: "Trips", label: "Trips" }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.55rem 1.15rem",
              borderRadius: "99px",
              border: "none",
              background: activeTab === tab.id ? "#1d4ed8" : "#f1f5f9",
              color: activeTab === tab.id ? "#ffffff" : "#475569",
              fontSize: "0.85rem",
              fontWeight: 800,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ════════════ ALBUMS GRID ════════════ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.95rem"
      }}>
        {filteredAlbums.map(album => (
          <div
            key={album.id}
            onClick={() => setSelectedAlbum(album)}
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid #cbd5e1",
              boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s ease"
            }}
          >
            {/* Top Cover Image */}
            <div style={{ position: "relative", width: "100%", height: "115px", background: "#e2e8f0" }}>
              <img
                src={album.coverImg}
                alt={album.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Bottom Info Details */}
            <div style={{
              background: album.bgColor,
              padding: "0.85rem 0.85rem 0.95rem 0.85rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              flex: 1
            }}>
              <h3 style={{
                fontSize: "0.9rem",
                fontWeight: 800,
                color: "#1e3a8a",
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.25,
                margin: 0
              }}>
                {album.title}
              </h3>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b" }}>
                {album.photosCount}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════ ALBUM MODAL DRAWER ════════════ */}
      {selectedAlbum && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center"
        }}>
          <div style={{
            width: "100%", maxWidth: "440px", background: "#ffffff",
            borderTopLeftRadius: "24px", borderTopRightRadius: "24px",
            padding: "1.25rem 1.25rem 2rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  {selectedAlbum.title}
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>{selectedAlbum.photosCount}</span>
              </div>
              <button type="button" onClick={() => setSelectedAlbum(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer" }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Simple Grid Placeholder inside modal */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem", maxHeight: "250px", overflowY: "auto" }}>
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  style={{ position: "relative", width: "100%", height: "110px", borderRadius: "14px", overflow: "hidden" }}
                >
                  <img src={selectedAlbum.coverImg} alt="Album detail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => {
                  alert("Downloading all photos from " + selectedAlbum.title);
                  setSelectedAlbum(null);
                }}
                style={{
                  flex: 1, padding: "0.75rem", background: "#1d4ed8",
                  border: "none", borderRadius: "14px", color: "#fff", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem"
                }}
              >
                <Download size={18} />
                <span>Download Album</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedAlbum(null)}
                style={{ padding: "0.75rem 1rem", background: "#f1f5f9", border: "none", borderRadius: "14px", color: "#334155", fontWeight: 700, cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
