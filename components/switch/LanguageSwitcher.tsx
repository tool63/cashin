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

      // router.refresh();
    } catch (err) {
      console.error("Language switch failed:", err);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  // ===============================
  // 🎨 SHARED STYLE (MATCH BUTTON + DROPDOWN)
  // ===============================
  const baseBoxStyle =
    "bg-white text-black border rounded-md shadow-sm " +
    "dark:bg-gray-900 dark:text-white dark:border-gray-700";

  // ===============================
  // 🎨 UI
  // ===============================
  return (
    <div className="relative" ref={dropdownRef}>
      {/* BUTTON */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1 px-3 py-2 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 ${baseBoxStyle}`}
      >
        {language.toUpperCase()}
        <span className="text-xs">▼</span>
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div className={`absolute mt-1 min-w-[110px] z-50 p-1 ${baseBoxStyle}`}>
          {LANGUAGE_OPTIONS.map((code) => {
            const isActive = code === language;

            return (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                disabled={isActive || isLoading}
                className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded transition
                ${
                  isActive
                    ? "bg-blue-50 dark:bg-gray-800 font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span>{code.toUpperCase()}</span>

                {/* RIGHT SIDE SYMBOL */}
                {isActive && <span className="text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
