"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import { SupportedLanguage, getLanguageForCountry } from "@/app/core/detector";

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
  // 🔄 UPDATE URL PATH BASED ON LANGUAGE (if needed)
  // ===============================
  const updateUrlForLanguage = (newLang: SupportedLanguage) => {
    // If your routes include language in the path (e.g., /en/about)
    // you might need to update the URL. This is optional based on your routing strategy.
    
    // Option 1: If you have language in path (e.g., /en, /fr)
    const pathSegments = pathname.split('/').filter(Boolean);
    
    // If first segment is a language code (and not a country code)
    if (pathSegments.length > 0 && LANGUAGE_OPTIONS.some(opt => opt.code === pathSegments[0])) {
      // Replace language in path
      pathSegments[0] = newLang;
      const newPath = `/${pathSegments.join('/')}`;
      router.push(newPath);
    }
    // Option 2: If language is determined by country or cookies only, just refresh
    else {
      router.refresh();
    }
  };

  // ===============================
  // 🔄 CHANGE LANGUAGE
  // ===============================
  const handleLanguageChange = async (lang: SupportedLanguage) => {
    if (lang === language) {
      setIsOpen(false);
      return;
    }

    // Update provider (handles cookie)
    setLanguage(lang);

    // Close dropdown
    setIsOpen(false);

    // Update URL if needed and refresh server components
    updateUrlForLanguage(lang);
  };

  // ===============================
  // 🎨 UI
  // ===============================
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 transition-colors"
        aria-label="Select language"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="uppercase text-sm font-medium">
          {currentLanguage.code}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white border rounded-md shadow-lg p-1 min-w-[140px] z-50">
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.code}
              onClick={() => handleLanguageChange(option.code)}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                option.code === language
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{option.flag}</span>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {option.label}
                </span>
                <span className="text-xs text-gray-500 uppercase">
                  {option.code}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
