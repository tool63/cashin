"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { SupportedLanguage } from "@/app/core/detector";

// ===============================
// 🌐 OPTIONS
// ===============================
const LANGUAGE_OPTIONS = [
  { code: "en" as SupportedLanguage, label: "English", flag: "🇺🇸" },
  { code: "fr" as SupportedLanguage, label: "Français", flag: "🇫🇷" },
  { code: "de" as SupportedLanguage, label: "Deutsch", flag: "🇩🇪" },
  { code: "es" as SupportedLanguage, label: "Español", flag: "🇪🇸" },
  { code: "pt" as SupportedLanguage, label: "Português", flag: "🇧🇷" },
];

// ===============================
// 🌐 COMPONENT
// ===============================
export default function LanguageSwitcher() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ===============================
  // ❌ CLOSE ON OUTSIDE CLICK
  // ===============================
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

  // ===============================
  // 🌍 CURRENT LANGUAGE
  // ===============================
  const currentLanguage =
    LANGUAGE_OPTIONS.find((l) => l.code === language) ||
    LANGUAGE_OPTIONS[0];

  // ===============================
  // 🔄 CHANGE LANGUAGE
  // ===============================
  const handleLanguageChange = (lang: SupportedLanguage) => {
    if (lang === language) {
      setIsOpen(false);
      return;
    }

    // update provider (handles cookie)
    setLanguage(lang);

    // close dropdown
    setIsOpen(false);

    // refresh server components (important for SSR updates)
    router.refresh();
  };

  // ===============================
  // 🎨 UI
  // ===============================
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 border rounded"
      >
        <span>{currentLanguage.flag}</span>
        <span className="uppercase text-sm">
          {currentLanguage.code}
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white shadow rounded p-2 min-w-[140px] z-50">
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.code}
              onClick={() => handleLanguageChange(option.code)}
              className={`w-full text-left px-2 py-1 rounded flex items-center gap-2 hover:bg-gray-100 ${
                option.code === language ? "font-semibold" : ""
              }`}
            >
              <span>{option.flag}</span>
              <span className="uppercase text-sm">
                {option.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
