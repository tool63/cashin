"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/[country]/providers/LanguageProvider";

const COUNTRIES = ["us", "uk", "ca", "au", "fr", "de", "in"];

export default function LanguageSwitcher() {
  const { country, language, setCountry } = useContext(LanguageContext);

  const switchCountry = () => {
    const currentIndex = COUNTRIES.indexOf(country);
    const nextIndex = (currentIndex + 1) % COUNTRIES.length;
    setCountry(COUNTRIES[nextIndex]);
  };

  return (
    <button
      type="button"
      onClick={switchCountry}
      className="px-3 py-1 rounded-full border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800
                 text-sm font-medium text-gray-700 dark:text-gray-200
                 hover:bg-gray-100 dark:hover:bg-gray-700
                 transition"
      aria-label={`Language (${language})`}
    >
      {language}
    </button>
  );
}
