"use client";

import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  return (
    <button
      type="button"
      className="p-2 rounded-lg border border-gray-300 dark:border-white/20
                 bg-white dark:bg-gray-800
                 text-gray-700 dark:text-gray-200
                 hover:bg-gray-100 dark:hover:bg-gray-700
                 transition"
      title="Language (coming soon)"
      aria-label="Language switcher"
    >
      <Globe size={18} />
    </button>
  );
}
