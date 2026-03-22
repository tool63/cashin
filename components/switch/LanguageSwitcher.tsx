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
      // 1️⃣ Update state + cookie
      setLanguage(lang);

      // 2️⃣ Load translations instantly
      const newTranslations = await loadTranslations(lang);
      setTranslations(newTranslations);

      // 3️⃣ Optional (only if you rely on server components)
      // router.refresh();
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
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3 py-2 border rounded-md hover:bg-gray-50 font-semibold"
      >
        {language.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white border rounded shadow p-1 min-w-[100px] z-50">
          {LANGUAGE_OPTIONS.map((code) => {
            const isActive = code === language;

            return (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                disabled={isActive || isLoading}
                className={`w-full text-left px-3 py-2 transition ${
                  isActive
                    ? "bg-blue-50 font-semibold cursor-default"
                    : "hover:bg-gray-100"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {code.toUpperCase()}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
