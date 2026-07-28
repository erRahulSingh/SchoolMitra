"use client";

import React, { useState } from "react";
import { 
  HelpCircle, Phone, Mail, MessageSquare, ChevronDown, 
  ChevronUp, Sparkles, CheckCircle2, Headphones, Search
} from "lucide-react";

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "How do I track the school bus in real-time?", a: "Navigate to the Bus Live tab on your home screen. You can view the live GPS position, current vehicle speed, and estimated arrival time." },
    { q: "How can I download official fee receipts?", a: "Go to the Fees tab, click on Receipts sub-tab, and click the Download PDF button next to any paid transaction." },
    { q: "What should I do if my child loses their RFID ID card?", a: "Submit an emergency request via the Complaint / Support tab under Academic/ID Card category." }
  ];

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      color: "var(--text-main)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* ════════════ HEADER BANNER ════════════ */}
      <div className="banner-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 className="banner-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>Help & Support</h2>
            <span style={{ background: "rgba(16,185,129,0.2)", color: "#059669", padding: "0.15rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>
              24x7 Helpdesk
            </span>
          </div>
          <p className="banner-sub" style={{ fontSize: "0.75rem", marginTop: 2 }}>
            Frequently Asked Questions & Customer Support
          </p>
        </div>

        <HelpCircle size={24} color="var(--primary)" />
      </div>

      {/* ════════════ SCREEN 1: FAQ ════════════ */}
      {activeTab === "faq" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((f, i) => (
            <div key={i} className="card-ui" style={{ padding: "1rem 1.1rem" }}>
              <div
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              >
                <div className="text-title" style={{ fontSize: "0.88rem", fontWeight: 800 }}>{f.q}</div>
                {openFaq === i ? <ChevronUp size={18} color="var(--primary)" /> : <ChevronDown size={18} color="var(--card-subtext)" />}
              </div>

              {openFaq === i && (
                <div className="text-muted-custom" style={{ fontSize: "0.82rem", lineHeight: 1.5, marginTop: "0.65rem", paddingTop: "0.65rem", borderTop: "1px solid var(--border-card)" }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
