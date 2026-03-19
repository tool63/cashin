"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "@/app/[country]/providers/LanguageProvider";
import { SupportedLanguage, COOKIE_KEYS } from "@/app/core/detector";

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return <div className="w-16 h-10 bg-gray-200 rounded-lg animate-pulse" />;
  }

  const currentLanguage = LANGUAGE_OPTIONS.find(l => l.code === language) || LANGUAGE_OPTIONS[0];

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);

    document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=31536000; samesite=lax`;

    setIsOpen(false);

    // ✅ SPA refresh first
    router.refresh();

    // ✅ fallback reload (ONLY if needed)
    setTimeout(() => {
      const currentLang = document.documentElement.lang.split("-")[0];
      if (currentLang !== lang) {
        window.location.reload();
      }
    }, 800);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {currentLanguage.flag} {currentLanguage.code}
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white shadow rounded">
          {LANGUAGE_OPTIONS.map(option => (
            <button key={option.code} onClick={() => handleLanguageChange(option.code)}>
              {option.flag} {option.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
