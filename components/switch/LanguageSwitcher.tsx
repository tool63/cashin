"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";

// ===============================
// 🌍 TYPES (LOCAL - SAFE)
// ===============================
type SupportedLanguage = "en" | "fr" | "de" | "es" | "pt";

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
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { country } = useCountry();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ===============================
  // ❌ OUTSIDE CLICK
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

    // Update context (cookie/local storage)
    setLanguage(lang);

    // OPTIONAL: refresh page (safe for your routing system)
    router.refresh();

    setIsOpen(false);
  };

  // ===============================
  // 🎨 UI
  // ===============================
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50"
      >
        <span>{currentLanguage.flag}</span>
        <span className="uppercase">{currentLanguage.code}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white border rounded shadow p-1 min-w-[140px] z-50">
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.code}
              onClick={() => handleLanguageChange(option.code)}
              className={`w-full text-left px-3 py-2 flex gap-2 ${
                option.code === language
                  ? "bg-blue-50 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>{option.flag}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
