"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Welcome to SchoolMitra 👋 How can I help you transform your school today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Thank you for reaching out! A SchoolMitra sales representative will connect with you shortly. You can also reach out at /contact." }
      ]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 300 }}>
      {isOpen ? (
        <div style={{ width: '340px', height: '440px', background: '#111827', border: '1px solid var(--border-color)', borderRadius: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
          <div style={{ background: 'var(--primary)', padding: '1rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
              <Bot size={20} />
              <span>SchoolMitra Support AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', background: m.sender === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.06)', padding: '0.65rem 0.85rem', borderRadius: '12px', maxWidth: '82%', color: '#fff' }}>
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} style={{ padding: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Ask a question..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, padding: '0.55rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }} 
            />
            <button type="submit" style={{ background: 'var(--primary)', border: 'none', padding: '0.55rem 0.85rem', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px var(--primary-glow)' }}
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
