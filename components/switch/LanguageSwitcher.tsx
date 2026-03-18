"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { LanguageContext } from "@/app/[country]/providers/LanguageProvider";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/app/core/detector";

// ------------------------------
// Dynamic language options
// ------------------------------
const LANGUAGE_OPTIONS = SUPPORTED_LANGUAGES.map(code => ({
  code,
  label:
    code === "en" ? "English" :
    code === "fr" ? "Français" :
    code === "de" ? "Deutsch" :
    code === "es" ? "Español" :
    code === "pt" ? "Português" : code.toUpperCase(),
  flag:
    code === "en" ? "🇺🇸" :
    code === "fr" ? "🇫🇷" :
    code === "de" ? "🇩🇪" :
    code === "es" ? "🇪🇸" :
    code === "pt" ? "🇧🇷" : "🏳️",
}));

export default function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ------------------------------
  // Close dropdown when clicking outside
  // ------------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage = LANGUAGE_OPTIONS.find(l => l.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="Select language"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {LANGUAGE_OPTIONS.map(option => (
            <button
              key={option.code}
              onClick={() => {
                setLanguage(option.code as SupportedLanguage);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
                language === option.code ? "bg-gray-50 dark:bg-gray-800 font-medium" : ""
              }`}
            >
              <span className="text-lg">{option.flag}</span>
              <span>{option.label}</span>
              {language === option.code && (
                <span className="ml-auto text-green-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
