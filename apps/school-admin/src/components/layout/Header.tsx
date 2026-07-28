"use client";

import { Search, Bell, Calendar, ChevronDown, User, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="top-header">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={16} />
        <input 
          type="text" 
          placeholder="Search students, roll no, teachers, buses..." 
          className="search-input"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Academic Year Switcher */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          padding: '0.4rem 0.8rem', 
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-color)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <Calendar size={14} className="text-primary" />
          <span>Session: <strong>2026 - 2027</strong></span>
          <ChevronDown size={14} />
        </div>

        {/* Quick Notification Bell */}
        <button style={{ 
          position: 'relative',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-color)',
          padding: '0.55rem',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-main)',
          cursor: 'pointer'
        }}>
          <Bell size={18} />
          <span style={{ 
            position: 'absolute', 
            top: '4px', 
            right: '4px', 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: 'var(--primary)' 
          }}></span>
        </button>

        {/* User Profile Pill */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          padding: '0.35rem 0.6rem 0.35rem 0.35rem',
          borderRadius: '99px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex',
            alignItems: 'center',
            justify-content: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            PA
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
              Principal Office
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Delhi Public School
            </span>
          </div>
          <ChevronDown size={14} style={{ color: 'var(--text-muted)', marginLeft: '0.2rem' }} />
        </div>
      </div>
    </header>
  );
}
