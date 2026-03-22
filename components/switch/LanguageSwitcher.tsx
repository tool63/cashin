"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { loadTranslations } from "@/app/core/i18n/translations";

import type { SupportedLanguage } from "@/app/core/constants";

// ===============================
// 🌐 OPTIONS
// ===============================
const LANGUAGE_OPTIONS: SupportedLanguage[] = [
  "en",
  "fr",
  "de",
  "es",
  "pt",
];

// ===============================
// 🌐 COMPONENT
// ===============================
export default function LanguageSwitcher() {
  const router = useRouter();

  const {
    language,
    setLanguage,
    setTranslations,
  } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===============================
  // 🔄 CHANGE LANGUAGE
  // ===============================
  const handleLanguageChange = async (lang: SupportedLanguage) => {
    if (lang === language || isLoading) return;

    setIsLoading(true);

    try {
      setLanguage(lang);

      const newTranslations = await loadTranslations(lang);
      setTranslations(newTranslations);
    } catch (err) {
      console.error("Language switch failed:", err);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  // ===============================
  // 🎨 UI
  // ===============================
  return (
    <div className="relative" ref={dropdownRef}>
      {/* BUTTON */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-2 border rounded-md font-semibold
        bg-white text-gray-900 border-gray-300 hover:bg-gray-100
        dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <span>{language.toUpperCase()}</span>
        <span
          className={`text-xs transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className="absolute mt-1 rounded-md shadow z-50 p-1
          bg-white border border-gray-200
          dark:bg-gray-900 dark:border-gray-700"
        >
          {LANGUAGE_OPTIONS.map((code) => {
            const isActive = code === language;

            return (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                disabled={isActive || isLoading}
                className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded transition
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold dark:bg-blue-900/40 dark:text-blue-300"
                    : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                }
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
              `}
              >
                {/* Language Code */}
                <span>{code.toUpperCase()}</span>

                {/* ✅ Tick */}
                {isActive && <span className="text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
