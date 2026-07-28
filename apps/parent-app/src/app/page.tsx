"use client";

import { useState } from "react";
import ParentHomePage from "./home/page";
import MyChildPage from "./child/page";
import TransportPage from "./transport/page";
import FeesPage from "./fees/page";
import CommunicationPage from "./communication/page";
import ProfilePage from "./profile/page";
import { 
  Home, 
  Bus, 
  User, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Calendar as CalendarIcon,
  ShieldCheck
} from "lucide-react";

export default function MobileAppShell() {
  const [activeTab, setActiveTab] = useState<"home" | "child" | "bus" | "fees" | "chat" | "profile">("home");

  return (
    <div className="mobile-frame">
      <div className="mobile-notch" />

      {/* Top Bar */}
      <div style={{ padding: '2.8rem 1.25rem 0.85rem 1.25rem', background: '#020617', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img 
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" 
            alt="Child Avatar" 
            style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--primary)', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>Aarav Sharma</div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Class 10-A • Delhi Public School</div>
          </div>
        </div>

        <button style={{ background: 'rgba(255,255,255,0.08)', border: 'none', padding: '0.5rem', borderRadius: '50%', color: '#fff', position: 'relative', cursor: 'pointer' }}>
          <Bell size={18} />
          <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
        </button>
      </div>

      {/* Screen Render */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '75px' }}>
        {activeTab === "home" && <ParentHomePage />}
        {activeTab === "child" && <MyChildPage />}
        {activeTab === "bus" && <TransportPage />}
        {activeTab === "fees" && <FeesPage />}
        {activeTab === "chat" && <CommunicationPage />}
        {activeTab === "profile" && <ProfilePage />}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="bottom-nav">
        <button onClick={() => setActiveTab("home")} className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}>
          <Home size={20} />
          <span>Home</span>
        </button>
        <button onClick={() => setActiveTab("child")} className={`nav-tab ${activeTab === 'child' ? 'active' : ''}`}>
          <User size={20} />
          <span>My Child</span>
        </button>
        <button onClick={() => setActiveTab("bus")} className={`nav-tab ${activeTab === 'bus' ? 'active' : ''}`}>
          <Bus size={20} />
          <span>Bus Live GPS</span>
        </button>
        <button onClick={() => setActiveTab("fees")} className={`nav-tab ${activeTab === 'fees' ? 'active' : ''}`}>
          <CreditCard size={20} />
          <span>Fees</span>
        </button>
        <button onClick={() => setActiveTab("chat")} className={`nav-tab ${activeTab === 'chat' ? 'active' : ''}`}>
          <MessageSquare size={20} />
          <span>Chat</span>
        </button>
        <button onClick={() => setActiveTab("profile")} className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}>
          <User size={20} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
