"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "@/app/[country]/providers/LanguageProvider";
import { SUPPORTED_LANGUAGES, SupportedLanguage, COOKIE_KEYS } from "@/app/core/detector";

// ------------------------------
// Language options with proper flags
// ------------------------------
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

  // Debug: Log current language on mount and when it changes
  useEffect(() => {
    console.log('🔤 LanguageSwitcher mounted, current language:', language);
  }, []);

  useEffect(() => {
    console.log('🔄 Language changed to:', language);
  }, [language]);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="w-16 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    );
  }

  const currentLanguage = LANGUAGE_OPTIONS.find(l => l.code === language) || LANGUAGE_OPTIONS[0];

  const handleLanguageChange = (lang: SupportedLanguage) => {
    console.log('🎯 Language selected:', lang);
    console.log('📝 Current language before change:', language);
    
    // Update context
    setLanguage(lang);
    
    // Set cookie directly
    document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=31536000; samesite=lax`;
    console.log('🍪 Cookie set:', document.cookie);
    
    // Close dropdown
    setIsOpen(false);
    
    // Force server components to re-render with new language
    console.log('🔄 Refreshing router...');
    router.refresh();
    
    // Check if cookie was set
    setTimeout(() => {
      console.log('🍪 Cookies after change:', document.cookie);
      console.log('🔤 Language context after change:', language);
    }, 100);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg" aria-hidden="true">{currentLanguage.flag}</span>
        <span className="text-sm font-bold uppercase">{currentLanguage.code}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-0.5 z-50 min-w-[85px]"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          {LANGUAGE_OPTIONS.map(option => (
            <button
              key={option.code}
              onClick={() => handleLanguageChange(option.code)}
              className={`w-full px-1.5 py-1 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm ${
                language === option.code ? 'bg-gray-50 dark:bg-gray-800 font-medium' : ''
              }`}
              role="menuitem"
              aria-current={language === option.code}
            >
              <div className="flex items-center">
                <span className="text-base mr-0.5" aria-hidden="true">{option.flag}</span>
                <span className="font-medium uppercase">{option.code}</span>
              </div>
              {language === option.code && (
                <span className="text-green-600 text-xs ml-0.5" aria-label="Selected">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
