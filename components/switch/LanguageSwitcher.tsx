"use client";

export default function LanguageSwitcher() {
  return (
    <button
      type="button"
      className="px-3 py-1 rounded-full border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800
                 text-sm font-medium text-gray-700 dark:text-gray-200
                 hover:bg-gray-100 dark:hover:bg-gray-700
                 transition"
      aria-label="Language (English)"
    >
      EN
    </button>
  );
}
