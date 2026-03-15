"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { LanguageContext } from "@/app/[country]/providers/LanguageProvider";

const COUNTRIES = [
  { code: "us", label: "EN-US" },
  { code: "uk", label: "EN-GB" },
  { code: "ca", label: "EN-CA" },
  { code: "au", label: "EN-AU" },
  { code: "fr", label: "FR-FR" },
  { code: "de", label: "DE-DE" },
  { code: "in", label: "EN-IN" },
];

export default function LanguageSwitcher() {
  const { country, language, setCountry } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded-full border border-gray-300 dark:border-white/20
                   bg-white dark:bg-gray-800
                   text-sm font-medium text-gray-700 dark:text-gray-200
                   hover:bg-gray-100 dark:hover:bg-gray-700
                   transition flex items-center justify-between w-24"
        aria-label={`Language (${language})`}
      >
        {language}
        <span className="ml-2 text-xs">&#9662;</span> {/* down arrow */}
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-28 max-h-60 overflow-y-auto
                       bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/20
                       rounded-lg shadow-lg p-1 text-sm"
        >
          {COUNTRIES.map((c) => (
            <li
              key={c.code}
              className={`px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
                          ${c.code === country ? "font-semibold bg-gray-100 dark:bg-gray-700" : ""}`}
              onClick={() => {
                setCountry(c.code);
                setOpen(false);
              }}
            >
              {c.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
