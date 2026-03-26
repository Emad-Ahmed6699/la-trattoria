"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (animating) return;
    setAnimating(true);
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    setTimeout(() => setAnimating(false), 500);
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        position: "relative",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.08)",
        background: isDark
          ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)"
          : "linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)",
        boxShadow: isDark
          ? "0 0 12px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 0 12px rgba(251,191,36,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        overflow: "hidden",
      }}
    >
      {/* Ripple on click */}
      {animating && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)",
            animation: "pulseOut 0.5s ease-out forwards",
          }}
        />
      )}

      {/* Sun rays (light mode) */}
      <span
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          opacity: isDark ? 0 : 1,
          transform: isDark ? "scale(0.5) rotate(90deg)" : "scale(1) rotate(0deg)",
          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" fill="#fbbf24" stroke="#d97706" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
        </svg>
      </span>

      {/* Moon + stars (dark mode) */}
      <span
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          opacity: isDark ? 1 : 0,
          transform: isDark ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-90deg)",
          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#a5b4fc" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        {/* tiny star */}
        <span style={{
          position: "absolute", top: "7px", right: "8px",
          width: "3px", height: "3px", borderRadius: "50%",
          background: "#e0e7ff", boxShadow: "0 0 3px #a5b4fc",
        }} />
        <span style={{
          position: "absolute", top: "12px", right: "5px",
          width: "2px", height: "2px", borderRadius: "50%",
          background: "#e0e7ff", boxShadow: "0 0 2px #a5b4fc",
        }} />
      </span>

      <style>{`
        @keyframes pulseOut {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
