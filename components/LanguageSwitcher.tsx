"use client";

import { useLanguage } from "./LanguageProvider";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const langs = [
    { code: "en", name: "EN" },
    { code: "ar", name: "العربية" },
    { code: "it", name: "IT" }
  ];

  return (
    <div className="flex items-center gap-1 bg-surface-container rounded-full p-1 border border-outline-variant/10">
      <div className="p-1 px-2 text-on-surface-variant/40">
        <Globe size={14} />
      </div>
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code as any)}
          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
            language === l.code 
              ? "bg-primary text-on-primary shadow-sm" 
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          {l.name}
        </button>
      ))}
    </div>
  );
}
