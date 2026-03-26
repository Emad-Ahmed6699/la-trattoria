"use client";

import { useEffect, useState } from "react";

const HOURS = {
  0: { open: "11:30", close: "21:00" },
  1: { open: "12:00", close: "22:00" },
  2: { open: "12:00", close: "22:00" },
  3: { open: "12:00", close: "22:00" },
  4: { open: "12:00", close: "22:00" },
  5: { open: "12:00", close: "23:30" },
  6: { open: "12:00", close: "23:30" },
} as const;

export default function LiveStatus() {
  const [status, setStatus] = useState<{ isOpen: boolean; closeTime: string } | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      const romeTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Rome",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        weekday: "short",
      }).formatToParts(new Date());

      const parts = romeTime.reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
      }, {} as any);

      const weekdayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const adjustedDay = weekdayArr.indexOf(parts.weekday);
      const currentHour = parseInt(parts.hour);
      const currentMin = parseInt(parts.minute);
      const currentTimeInMins = currentHour * 60 + currentMin;

      const schedule = HOURS[adjustedDay as keyof typeof HOURS];
      const [openH, openM] = schedule.open.split(":").map(Number);
      const [closeH, closeM] = schedule.close.split(":").map(Number);
      const openTimeInMins = openH * 60 + openM;
      const closeTimeInMins = closeH * 60 + closeM;

      const isOpen = currentTimeInMins >= openTimeInMins && currentTimeInMins < closeTimeInMins;

      setStatus({ isOpen, closeTime: schedule.close });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  const { isOpen, closeTime } = status;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "6px 14px 6px 10px",
        borderRadius: "999px",
        border: isOpen
          ? "1px solid rgba(34,197,94,0.25)"
          : "1px solid rgba(156,163,175,0.2)",
        background: isOpen
          ? "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.06) 100%)"
          : "rgba(156,163,175,0.06)",
        backdropFilter: "blur(8px)",
        boxShadow: isOpen
          ? "0 2px 12px rgba(34,197,94,0.12), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Animated dot */}
      <span style={{ position: "relative", display: "flex", width: "8px", height: "8px", flexShrink: 0 }}>
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: isOpen ? "#22c55e" : "#9ca3af",
            opacity: 0.5,
            animation: isOpen ? "lsPing 1.5s ease-out infinite" : "none",
          }}
        />
        <span
          style={{
            position: "relative",
            display: "inline-flex",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: isOpen
              ? "radial-gradient(circle at 35% 35%, #4ade80, #16a34a)"
              : "#9ca3af",
            boxShadow: isOpen ? "0 0 6px rgba(34,197,94,0.6)" : "none",
          }}
        />
      </span>

      {/* Text */}
      <span style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: isOpen ? "#16a34a" : "#6b7280",
          }}
        >
          {isOpen ? "Open Now" : "Closed"}
        </span>
        <span
          style={{
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: isOpen ? "rgba(22,163,74,0.5)" : "rgba(107,114,128,0.5)",
            textTransform: "uppercase",
          }}
        >
          {isOpen ? `· Closes ${closeTime}` : "· Rome"}
        </span>
      </span>

      <style>{`
        @keyframes lsPing {
          0% { transform: scale(1); opacity: 0.6; }
          70%, 100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
