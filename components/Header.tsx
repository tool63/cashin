"use client";

import Link from "next/link";
import DarkLightToggle from "@/components/switch/DarkLightToggle";

export default function Header() {
  return (
    <header className="bg-white dark:bg-[#070A14] shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Cashog
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/earn"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Earn
          </Link>
          <Link
            href="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Contact
          </Link>

          {/* Theme Toggle */}
          <DarkLightToggle />
        </nav>
      </div>
    </header>
  );
}
