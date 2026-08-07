"use client";

import React, { useState, useEffect } from "react";
import { Wifi, Battery, Signal } from "lucide-react";

export default function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <span style={{ fontWeight: 800 }}>{time || "09:41"}</span>
      <div className="status-bar-icons">
        <Signal size={13} />
        <Wifi size={13} />
        <Battery size={15} />
      </div>
    </div>
  );
}
