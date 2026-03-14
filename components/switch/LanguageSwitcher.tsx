"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/[country]/providers/LanguageProvider";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en"); // example: English ↔ Bangla
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-full border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800
                 text-sm font-medium text-gray-700 dark:text-gray-200
                 hover:bg-gray-100 dark:hover:bg-gray-700
                 transition"
      aria-label={`Language (${language.toUpperCase()})`}
    >
      {language.toUpperCase()}
    </button>
  );
}
