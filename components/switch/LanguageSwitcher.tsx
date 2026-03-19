"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "@/app/[country]/providers/LanguageProvider";
import { SupportedLanguage } from "@/app/core/detector";

const LANGUAGE_OPTIONS = [
  { code: "en" as SupportedLanguage, label: "English", flag: "🇺🇸" },
  { code: "fr" as SupportedLanguage, label: "Français", flag: "🇫🇷" },
  { code: "de" as SupportedLanguage, label: "Deutsch", flag: "🇩🇪" },
  { code: "es" as SupportedLanguage, label: "Español", flag: "🇪🇸" },
  { code: "pt" as SupportedLanguage, label: "Português", flag: "🇧🇷" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const { language, setLanguage } = useContext(LanguageContext);

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return <div className="w-16 h-10 bg-gray-200 rounded-lg animate-pulse" />;
  }

  const currentLanguage =
    LANGUAGE_OPTIONS.find((l) => l.code === language) ||
    LANGUAGE_OPTIONS[0];

  // ===============================
  // ✅ CLEAN LANGUAGE SWITCH
  // ===============================
  const handleLanguageChange = (lang: SupportedLanguage) => {
    // 1️⃣ Update context (this already handles cookie inside provider)
    setLanguage(lang);

    // 2️⃣ Close dropdown
    setIsOpen(false);

    // 3️⃣ Refresh server components (no reload needed)
    router.refresh();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border rounded"
      >
        <span>{currentLanguage.flag}</span>
        <span className="uppercase text-sm">{currentLanguage.code}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white shadow rounded p-2 min-w-[120px] z-50">
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.code}
              onClick={() => handleLanguageChange(option.code)}
              className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded flex items-center gap-2"
            >
              <span>{option.flag}</span>
              <span className="uppercase text-sm">{option.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
