"use client";

import { useState } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useLang } from "@/app/providers/LanguageProvider";
import { useTheme } from "next-themes";

export default function Header() {
  const { lang, t, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <header className="bg-white dark:bg-black text-black dark:text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          PayUp
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:underline">
            {t("header.home")}
          </Link>
          <Link href="/about" className="hover:underline">
            {t("header.about")}
          </Link>
          <Link href="/contact" className="hover:underline">
            {t("header.contact")}
          </Link>

          {/* Language switch */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "es" | "bn")}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="bn">BN</option>
          </select>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Sign Up / Sign In */}
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            {t("header.signUp")}
          </Link>
          <Link
            href="/signin"
            className="bg-gray-200 dark:bg-gray-800 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            {t("header.signIn")}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMobile}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-black text-black dark:text-white p-4 space-y-4">
          <Link href="/" onClick={toggleMobile}>
            {t("header.home")}
          </Link>
          <Link href="/about" onClick={toggleMobile}>
            {t("header.about")}
          </Link>
          <Link href="/contact" onClick={toggleMobile}>
            {t("header.contact")}
          </Link>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "es" | "bn")}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white w-full"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="bn">BN</option>
          </select>

          <button
            onClick={toggleTheme}
            className="w-full p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? t("header.lightMode") : t("header.darkMode")}
          </button>

          <Link
            href="/signup"
            className="block w-full text-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            {t("header.signUp")}
          </Link>
          <Link
            href="/signin"
            className="block w-full text-center bg-gray-200 dark:bg-gray-800 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            {t("header.signIn")}
          </Link>
        </div>
      )}
    </header>
  );
}
